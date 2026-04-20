// logic-escape-roll.js — B안 탈출 모드 순수 로직
// 롤 판정 / DC 계산 / detection 관리 / companion drop / 엔딩 매핑.
// 로드 순서: data-escape-nodes-2.js 다음, components-escape.js 이전

// ═══════════════ 롤 판정 ═══════════════
// 입력: rollDef = { type, dc, stat, shellTalkerKnownBonus }
//        ctx    = { stats, trust, logs, detection }
// 반환: { roll, total, dc, outcome:'critical'|'success'|'partial'|'fail' }
window.performEscapeRoll = function(rollDef, ctx){
  if (!rollDef) {
    // 롤 없는 선택지 (자동 성공)
    return { roll: 0, total: 0, dc: 0, bonus: 0, outcome: 'success' };
  }

  // 기반 스탯 → 보정치 (stat ÷ 2, 반올림)
  var statValue = getStatValue(rollDef.stat, ctx);
  var bonus = Math.round(statValue / 2);

  // shellTalkerKnown 인지 보너스
  if (rollDef.shellTalkerKnownBonus && ctx.logs && ctx.logs.indexOf('LOG-SHELLTALKER-CAP') >= 0) {
    bonus += rollDef.shellTalkerKnownBonus;
  }

  // LOG-VOSS-STANDBY 저장 시 +5 (통신 여유)
  if (ctx.logs && ctx.logs.indexOf('LOG-VOSS-STANDBY') >= 0) {
    bonus += 5;
  }

  // detection > 70 패널티
  if (ctx.detection > 70) {
    bonus -= 10;
  }

  var roll = 1 + Math.floor(Math.random() * 100);
  var total = roll + bonus;
  var dc = rollDef.dc;

  var outcome;
  if (total >= dc + 20) outcome = 'critical';
  else if (total >= dc) outcome = 'success';
  else if (total >= dc - 15) outcome = 'partial';
  else outcome = 'fail';

  return { roll: roll, total: total, dc: dc, bonus: bonus, outcome: outcome };
};

// 스탯 키 → 실제 값 (카드게임 stats/trust 매핑)
function getStatValue(statKey, ctx){
  var s = ctx.stats || {};
  var t = ctx.trust || {};
  switch (statKey) {
    case 'control':        return s.control || 50;
    case 'resistance':     return s.resistance || 50;
    case 'observation_inv': return 100 - (s.observation || 50);  // 은폐 = 감시 역수
    case 'trust_haeun':    return t.haeun || 50;
    case 'trust_doyun':    return t.doyun || 50;
    case 'trust_sejin':    return t.sejin || 50;
    case 'trust_jaehyuk':  return t.jaehyuk || 50;
    case 'companion_avg':
      var trusts = [t.haeun||0, t.doyun||0, t.sejin||0, t.jaehyuk||0];
      var sum = trusts.reduce(function(a,b){return a+b;}, 0);
      return Math.round(sum / 4);
    default: return 50;
  }
}

// ═══════════════ 타이머 관리 ═══════════════
// 글로벌 타이머: 06:00 (360초) 시작 카운트다운
window.ESCAPE_GLOBAL_TIMER_START = 360;

// 글로벌 타이머 패널티 (실패 시 추가 차감)
window.ESCAPE_FAIL_PENALTY_SEC = 15;

// detection 임계값
window.ESCAPE_DETECTION_WARNING = 70;
window.ESCAPE_DETECTION_LIMIT = 100;

// 글로벌 오버타임 허용 (초) — 이 이상 음수 도달 시 강제 E_c
window.ESCAPE_OVERTIME_LIMIT = -30;

// ═══════════════ Companion Drop ═══════════════
// 각 노드 진입 시 at_risk 간부 낙오 판정
// 기존 rollCompanionDrop (field-mission/escape-state.js) 로직 이식
window.rollEscapeCompanionDrop = function(escapeState, nodeDifficulty){
  if (!escapeState || !escapeState.companions) return [];
  if (nodeDifficulty == null) nodeDifficulty = 1;

  var dropped = [];
  var progressBonus = (escapeState.routeHistory || []).length * 0.06;

  for (var i = escapeState.companions.length - 1; i >= 0; i--) {
    var c = escapeState.companions[i];
    if (c.status !== 'at_risk') continue;

    var gap = 65 - (c.trust || 0);
    var baseChance = (gap / 100) * (nodeDifficulty * 0.22);
    var finalChance = baseChance + progressBonus;

    if (Math.random() < finalChance) {
      escapeState.companions.splice(i, 1);
      escapeState.casualties = escapeState.casualties || [];
      escapeState.casualties.push(c);
      dropped.push(c);
    }
  }
  return dropped;
};

// ═══════════════ 동행자 리스트 빌드 (trust 기반) ═══════════════
window.buildEscapeCompanions = function(trust, logs){
  var companions = [];
  var defs = [
    { id:'haeun',   name:'서하은', cond: function(){ return (logs||[]).indexOf('LOG-050') < 0; } },
    { id:'doyun',   name:'강도윤', cond: function(){ return true; } },
    { id:'sejin',   name:'윤세진', cond: function(){ return true; } },
    { id:'jaehyuk', name:'임재혁', cond: function(){ return true; } },
  ];
  defs.forEach(function(d){
    if (!d.cond()) return;
    var t = (trust && trust[d.id]) || 0;
    var status = t >= 65 ? 'following' : 'at_risk';
    companions.push({ id:d.id, name:d.name, status:status, trust:t });
  });
  return companions;
};

// ═══════════════ 엔딩 매핑 ═══════════════
// 입력: escapeState = { hp, detection, globalTimer, markUnlucky, companions, casualties, currentRoute }
// 반환: { outcome, ending, log, logs:[...] }
window.computeEscapeEnding = function(escapeState){
  var out = {
    outcome: 'success',
    ending: 'E',
    log: 'LOG-ESCAPE-CLEAR',
    logs: ['LOG-ESCAPE-CLEAR']
  };

  // HP 0 또는 detection 100 도달 → E_c (일반 실패)
  if (escapeState.hp <= 0 || escapeState.detection >= ESCAPE_DETECTION_LIMIT) {
    out.outcome = 'fail_normal';
    out.ending = 'E_c';
    out.log = 'LOG-ESCAPE-FAIL';
    out.logs = ['LOG-ESCAPE-FAIL'];
    return out;
  }

  // 글로벌 타이머 오버타임 → E_c
  if (escapeState.globalTimer <= ESCAPE_OVERTIME_LIMIT) {
    out.outcome = 'fail_normal';
    out.ending = 'E_c';
    out.log = 'LOG-ESCAPE-FAIL';
    out.logs = ['LOG-ESCAPE-FAIL'];
    return out;
  }

  // markUnlucky (쉘토커 미인지 + 크리티컬 실패) → E_bad
  if (escapeState.markUnlucky) {
    out.outcome = 'fail_unlucky';
    out.ending = 'E_bad';
    out.log = 'LOG-ESCAPE-UNLUCKY';
    out.logs = ['LOG-ESCAPE-UNLUCKY'];
    return out;
  }

  // 성공: 동행자별 ACCOMP-* 로그 부여
  var logs = ['LOG-ESCAPE-CLEAR'];
  (escapeState.companions || []).forEach(function(c){
    logs.push('ACCOMP-' + c.id.toUpperCase());
  });
  out.logs = logs;
  return out;
};
