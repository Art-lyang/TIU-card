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

  function isNeutralRoute(gi){
    gi = gi || 0;
    return gi > -35 && gi < 8;
  }

  window.applyChoiceBalanceTuning = function(beforeStats, beforeGi, nextStats, nextGi, card, choice, logs, act){
    var before = copyStats(beforeStats);
    var after = copyStats(nextStats);
    var day = before.day || 1;
    var currentAct = act || 1;
    var cardId = String(card && card.id || '');
    var changed = false;
    var kind = '';

    if (cardId === 'CE-005') {
      // The observer contact should feel dangerous, but a single hidden output
      // must not hard-delete an otherwise playable run through evaluation 0.
      if ((nextGi || 0) < (beforeGi || 0) - 5) {
        nextGi = (beforeGi || 0) - 5;
        changed = true;
        kind = 'observer-spike-cap';
      }
      if (after.o <= 0) {
        changed = liftBelow(after, 'o', 3) || changed;
        kind = changed ? 'observer-evaluation-floor' : kind;
      }
    }

    if (cardId === 'CE-042' || cardId === 'CE-042B') {
      // Final-route commitment can still be costly, but the decision should
      // hand control back to the player instead of ending on a single click.
      if (after.o <= 0) {
        changed = liftBelow(after, 'o', 3) || changed;
        kind = changed ? 'final-commitment-floor' : kind;
      }
      if (after.r <= 0) {
        changed = liftBelow(after, 'r', 3) || changed;
        kind = changed ? 'final-commitment-floor' : kind;
      }
    }

    if (!changed) return null;
    return { stats: after, gi: nextGi, kind: kind };
  };

  window.applyRewardBalanceTuning = function(beforeStats, nextStats, gi, reward, act){
    var before = copyStats(beforeStats);
    var after = copyStats(nextStats);
    var currentAct = act || 1;
    var changed = false;
    var kind = '';

    if (currentAct === 1 && before.c < 100 && after.c >= 100) {
      changed = capAbove(after, 'c', 95) || changed;
      kind = changed ? 'act1-reward-overcontainment-buffer' : kind;
    }

    if (!changed) return null;
    return { stats: after, gi: gi, kind: kind };
  };
})();
