// balance-tuning.js
// Small runtime balance guards for route-leaning choices.
// The goal is to soften abrupt early collapses without changing card identity,
// logs, once flags, mission queues, or save/load shape.

(function(){
  function copyStats(s){
    return {
      c: s && typeof s.c === 'number' ? s.c : 50,
      r: s && typeof s.r === 'number' ? s.r : 50,
      t: s && typeof s.t === 'number' ? s.t : 50,
      o: s && typeof s.o === 'number' ? s.o : 50,
      day: s && typeof s.day === 'number' ? s.day : 1
    };
  }

  function clamp100(v){
    return Math.max(0, Math.min(100, v));
  }

  function asLogText(log){
    if (!log) return '';
    if (Array.isArray(log)) return log.join(' ');
    return String(log);
  }

  function hasPrefix(text, prefixes){
    for (var i = 0; i < prefixes.length; i++) {
      if (text.indexOf(prefixes[i]) >= 0) return true;
    }
    return false;
  }

  function raisesStat(before, after, key){
    return after[key] > before[key];
  }

  function lowersStat(before, after, key){
    return after[key] < before[key];
  }

  function softFloorCrossing(before, after, key, floor, step){
    if (before[key] > floor && after[key] <= floor) {
      after[key] = clamp100(Math.min(floor + step, after[key] + step));
      return true;
    }
    return false;
  }

  function liftBelow(after, key, target){
    if (after[key] < target) {
      after[key] = clamp100(target);
      return true;
    }
    return false;
  }

  function capAbove(after, key, target){
    if (after[key] > target) {
      after[key] = clamp100(target);
      return true;
    }
    return false;
  }

  function setRewardDelta(before, after, deltas){
    var changed = false;
    ['c','r','t','o'].forEach(function(k){
      if (typeof deltas[k] !== 'number') return;
      var next = clamp100(before[k] + deltas[k]);
      if (after[k] !== next) {
        after[k] = next;
        changed = true;
      }
    });
    return changed;
  }

  function isResistanceChoice(card, choice, beforeGi, afterGi){
    var id = String(card && card.id || '');
    var logText = asLogText(choice && choice.log);
    var g = choice && typeof choice.g === 'number' ? choice.g : 0;
    if (g < 0) return true;
    if (id.indexOf('RH-') === 0) return true;
    if (id.indexOf('LJC-PROM-') === 0 && g <= 0) return true;
    return hasPrefix(logText, [
      'LOG-RH-',
      'LOG-CHAR-',
      'LOG-RECON-',
      'LOG-LJC-PROM-',
      'LOG-UPRISING-'
    ]);
  }

  function isLoyalChoice(card, choice, beforeGi, afterGi, before, after){
    var id = String(card && card.id || '');
    var g = choice && typeof choice.g === 'number' ? choice.g : 0;
    if (g > 0 || afterGi > beforeGi) return true;
    if (id.indexOf('CB-') === 0 || id.indexOf('ORC-LOYAL-') === 0) return true;
    return raisesStat(before, after, 'o') && !raisesStat(before, after, 't');
  }

  function isNeutralRoute(gi){
    gi = gi || 0;
    return gi > -35 && gi < 8;
  }

  // Critical-band drain dampener — CHOICE cards only. Once a stat already
  // sits in the danger band, a multi-step choice loss is halved and snapped
  // UP to the 5-unit stat grid (applyFx m=5): -5 stays -5, -10 -> -5,
  // -15 -> -10, -20 -> -10. Single-step losses keep their full bite.
  // Reward cards and act 3/4 daily decay are NOT dampened: their penalties
  // apply at face value — running out of resources and losing the run is
  // part of the narrative, not a failure state to tune away.
  var CRITICAL_BAND = 25;
  var STAT_STEP = 5;
  function dampenCriticalBandLoss(before, after){
    var hit = false;
    ['c','r','t','o'].forEach(function(k){
      if (before[k] <= CRITICAL_BAND && after[k] < before[k]) {
        var loss = before[k] - after[k];
        var soft = Math.ceil(loss / 2 / STAT_STEP) * STAT_STEP;
        if (soft < loss) {
          after[k] = clamp100(before[k] - soft);
          hit = true;
        }
      }
    });
    return hit;
  }

  window.applyChoiceBalanceTuning = function(beforeStats, beforeGi, nextStats, nextGi, card, choice, logs, act){
    var before = copyStats(beforeStats);
    var after = copyStats(nextStats);
    var day = before.day || 1;
    var currentAct = act || 1;
    var cardId = String(card && card.id || '');
    var changed = false;
    var kind = '';

    if (dampenCriticalBandLoss(before, after)) {
      changed = true;
      kind = 'critical-band-drain-damp';
    }

    if (cardId === 'CE-005') {
      // The observer contact should feel dangerous, but a single hidden output
      // must not hard-delete an otherwise playable run through evaluation 0.
      if ((nextGi || 0) < (beforeGi || 0) - 5) {
        nextGi = (beforeGi || 0) - 5;
        changed = true;
        kind = 'observer-spike-cap';
      }
      if (after.o <= 0) {
        changed = liftBelow(after, 'o', 5) || changed;
        kind = changed ? 'observer-evaluation-floor' : kind;
      }
    }

    if (cardId === 'CE-015') {
      if (after.o <= 0) {
        changed = liftBelow(after, 'o', 5) || changed;
        kind = changed ? 'independence-declaration-floor' : kind;
      }
      if (after.r <= 0) {
        changed = liftBelow(after, 'r', 5) || changed;
        kind = changed ? 'independence-declaration-floor' : kind;
      }
    }

    if (cardId === 'CE-042' || cardId === 'CE-042B' || cardId === 'CE-042C' || cardId === 'CE-042D') {
      // Final-route commitment can still be costly, but the decision should
      // hand control back to the player instead of ending on a single click.
      if (after.o <= 0) {
        changed = liftBelow(after, 'o', 5) || changed;
        kind = changed ? 'final-commitment-floor' : kind;
      }
      if (after.r <= 0) {
        changed = liftBelow(after, 'r', 5) || changed;
        kind = changed ? 'final-commitment-floor' : kind;
      }
    }

    if (cardId === 'CA4-EX-02') {
      if (after.o <= 0) {
        changed = liftBelow(after, 'o', 5) || changed;
        kind = changed ? 'external-signal-floor' : kind;
      }
      if (after.r <= 0) {
        changed = liftBelow(after, 'r', 5) || changed;
        kind = changed ? 'external-signal-floor' : kind;
      }
    }

    if (cardId === 'CA4-OR-03' && after.o <= 0) {
      changed = liftBelow(after, 'o', 5) || changed;
      kind = changed ? 'oracle-handover-floor' : kind;
    }

    if (currentAct <= 2 && isResistanceChoice(card, choice, beforeGi || 0, nextGi || 0) && before.o > 0 && after.o <= 0) {
      changed = liftBelow(after, 'o', 5) || changed;
      kind = changed ? 'early-resistance-evaluation-floor' : kind;
    }

    if (!changed) return null;
    return { stats: after, gi: nextGi, kind: kind };
  };

  window.applyRewardBalanceTuning = function(beforeStats, nextStats, gi, reward, act){
    var before = copyStats(beforeStats);
    var after = copyStats(nextStats);
    var currentAct = act || 1;
    var rewardId = String(reward && reward.id || '');
    var changed = false;
    var kind = '';

    if (currentAct <= 2) {
      if (rewardId === 'R-06') {
        changed = setRewardDelta(before, after, { r: 5, t: 10, o: -5 }) || changed;
        kind = changed ? 'early-civil-coop-evaluation-buffer' : kind;
      } else if (rewardId === 'R-07') {
        changed = setRewardDelta(before, after, { r: -5, t: 0, o: 10 }) || changed;
        kind = changed ? 'early-oracle-comms-trust-buffer' : kind;
      } else if (rewardId === 'R-08') {
        changed = setRewardDelta(before, after, { c: 5, r: -5, t: 5 }) || changed;
        kind = changed ? 'early-drill-resource-buffer' : kind;
      }
    }

    if (currentAct === 1 && before.c < 100 && after.c >= 100) {
      changed = capAbove(after, 'c', 95) || changed;
      kind = changed ? 'act1-reward-overcontainment-buffer' : kind;
    }

    // Reward penalties and act 3/4 daily pressure apply at face value —
    // no critical-band softening here. Game over is part of the narrative.

    if (!changed) return null;
    return { stats: after, gi: gi, kind: kind };
  };
})();
