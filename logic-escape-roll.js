// logic-escape-roll.js — fallback escape roll + ending logic
window.buildEscapeCompanions = function(trust, logs){
  var base = [
    {id:'haeun', name:'서하은'},
    {id:'doyun', name:'강도윤'},
    {id:'sejin', name:'윤세진'},
    {id:'jaehyuk', name:'임재혁'}
  ];
  var hasAcc = function(id){ return logs.indexOf('ACCOMP-' + id.toUpperCase()) >= 0; };
  var rows = base.filter(function(c){
    if (hasAcc(c.id)) return true;
    var t = trust && trust[c.id];
    return typeof t === 'number' && t >= 65;
  }).map(function(c){ return { id:c.id, name:c.name, status:'ok' }; });
  return rows;
};

window.rollEscapeCompanionDrop = function(state, difficulty){
  if (!state || !state.companions || state.companions.length === 0) return;
  state.companions.forEach(function(c){ c.status = 'ok'; });
  var riskChance = Math.max(0, Math.min(0.45, ((state.detection || 0) / 100) * 0.3 + (difficulty || 0) * 0.05));
  if (Math.random() < riskChance) {
    var idx = Math.floor(Math.random() * state.companions.length);
    state.companions[idx].status = 'at_risk';
  }
  var dropChance = Math.max(0, Math.min(0.22, ((state.detection || 0) / 100) * 0.12 + ((difficulty || 0) - 0.5) * 0.06));
  if (state.companions.length > 1 && Math.random() < dropChance) {
    var dropIdx = Math.floor(Math.random() * state.companions.length);
    var lost = state.companions.splice(dropIdx, 1)[0];
    if (lost) state.casualties.push(lost);
  }
};

window.performEscapeRoll = function(spec, ctx){
  ctx = ctx || {};
  spec = spec || {};
  var stats = ctx.stats || {};
  var primary = typeof stats[spec.stat] === 'number' ? stats[spec.stat] : 50;
  var bonus = 0;
  if (spec.bonusStat && typeof stats[spec.bonusStat] === 'number') {
    bonus += Math.round((stats[spec.bonusStat] - 50) * (spec.bonusScale || 0.1));
  }
  var trust = ctx.trust || {};
  var highTrust = ['haeun','doyun','sejin','jaehyuk'].reduce(function(n,k){ return n + ((trust[k] || 0) >= 65 ? 1 : 0); }, 0);
  bonus += highTrust;
  if ((ctx.logs || []).indexOf('LOG-SHELLTALKER-CAP') >= 0) bonus += 4;
  bonus -= Math.floor((ctx.detection || 0) / 15);
  var target = Math.max(10, Math.min(92, (spec.base || 50) + Math.round((primary - 50) * 0.35) + bonus));
  var roll = Math.floor(Math.random() * 100) + 1;
  var outcome = roll <= 5 ? 'critical' : (roll <= target ? 'success' : (roll >= 96 ? 'critical_fail' : 'fail'));
  return { roll: roll, target: target, outcome: outcome };
};

window.computeEscapeEnding = function(es){
  if (!es) return { outcome:'fail_normal', logs:[] };
  if (es.markUnlucky) return { outcome:'fail_unlucky', logs:['LOG-ESCAPE-UNLUCKY'] };
  if (es.hp <= 0 || es.detection >= ESCAPE_DETECTION_LIMIT || es.globalTimer <= ESCAPE_OVERTIME_LIMIT) {
    return { outcome:'fail_normal', logs:['LOG-ESCAPE-FAIL'] };
  }
  return { outcome:'success', logs:['LOG-ESCAPE-CLEAR'] };
};
