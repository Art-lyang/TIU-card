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

  window.applyChoiceBalanceTuning = function(beforeStats, beforeGi, nextStats, nextGi, card, choice, logs, act){
    var before = copyStats(beforeStats);
    var after = copyStats(nextStats);
    var day = before.day || 1;
    var currentAct = act || 1;
    var cardId = String(card && card.id || '');
    var changed = false;
    var kind = '';

    if (isResistanceChoice(card, choice, beforeGi || 0, nextGi || 0)) {
      // Early resistance should hurt ORACLE evaluation, but not collapse the
      // run before the player has seen the warning/evidence loop.
      if (currentAct <= 3 && day <= 18) {
        changed = liftBelow(after, 'o', 15) || changed;
        changed = liftBelow(after, 'r', 15) || changed;
        changed = liftBelow(after, 't', 15) || changed;
        kind = changed ? 'resistance-softener' : kind;
      } else if (currentAct <= 3 && day <= 24) {
        changed = liftBelow(after, 'o', 5) || changed;
        changed = liftBelow(after, 'r', 5) || changed;
        kind = changed ? 'resistance-late-floor' : kind;
      }
    }

    if (cardId === 'CE-005') {
      // The observer contact should feel dangerous, but a single hidden output
      // must not hard-delete an otherwise playable run through evaluation 0.
      if ((nextGi || 0) < (beforeGi || 0) - 6) {
        nextGi = (beforeGi || 0) - 6;
        changed = true;
        kind = 'observer-spike-cap';
      }
      if (after.o <= 0) {
        changed = liftBelow(after, 'o', 5) || changed;
        kind = changed ? 'observer-evaluation-floor' : kind;
      }
    }

    if (cardId === 'CE-042' || cardId === 'CE-042B') {
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

    if (isLoyalChoice(card, choice, beforeGi || 0, nextGi || 0, before, after)) {
      // Loyal ORACLE choices can still cost human trust/resources, but routine
      // compliance should not force the one-time safeguard every run.
      if (currentAct <= 3 && day <= 24 && (nextGi || 0) >= 8) {
        changed = liftBelow(after, 'r', 35) || changed;
        changed = liftBelow(after, 't', 35) || changed;
        changed = liftBelow(after, 'c', 32) || changed;
        kind = changed ? 'loyalty-buffer' : kind;
      }
      if (currentAct >= 4 && (nextGi || 0) >= 40) {
        changed = liftBelow(after, 'r', 30) || changed;
        changed = liftBelow(after, 't', 30) || changed;
        changed = liftBelow(after, 'c', 30) || changed;
        kind = changed ? 'act4-loyalty-buffer' : kind;
      }
    if (currentAct <= 3 && day <= 24 && raisesStat(before, after, 'c') && after.c >= 90) {
      changed = capAbove(after, 'c', 90) || changed;
      kind = changed ? 'loyalty-overcontainment-buffer' : kind;
    }
  }

    if (!changed) return null;
    return { stats: after, gi: nextGi, kind: kind };
  };
})();
