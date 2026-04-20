// data-cards-facility-propose.js
// FACILITY_EXPANSIONS 데이터로부터 시설 확장 제안 카드를 자동 생성
// 기존 수동 카드: C-174 (FE-001 냉동고), C-131 (FE-004 격리실)
// 이 파일은 FE-002, FE-003, FE-005 ~ FE-016 중 수동 카드가 없는 FE에 대해 제안 카드를 생성

var CARDS_FACILITY_PROPOSE = (function(){
  if (typeof FACILITY_EXPANSIONS === 'undefined') return [];
  var out = [];
  // 이미 전용 카드가 있는 FE는 제외
  var EXCLUDE = { 'FE-001': 1, 'FE-004': 1 };

  // 시설 위치별 배경 매핑
  var bgMap = {
    'b2': 'lab',     'b3': 'lab',
    'exterior': 'forest', 'level1': 'base'
  };

  for (var i = 0; i < FACILITY_EXPANSIONS.length; i++) {
    var fe = FACILITY_EXPANSIONS[i];
    if (EXCLUDE[fe.id]) continue;
    if (!fe.cardMsg || !fe.cardLeft || !fe.cardRight) continue;

    var minDay = fe.minDay || 5;
    var minAct = fe.minAct || 1;
    var actList = [];
    for (var a = minAct; a <= 4; a++) actList.push(a);

    var cardId = 'C-FEP-' + fe.id.replace('FE-', '');
    var bgKey = bgMap[fe.facilityFloor] || 'base';

    // uprising 라인은 신뢰 높음 또는 저항 조짐 로그가 있을 때만 제안되도록 제한
    var reqFn = (function(md, upr){
      return function(s, g, logs){
        if (s.day < md) return false;
        if (upr) {
          if (s.t >= 70) return true;
          if (logs.indexOf('LOG-RESISTANCE-A') >= 0) return true;
          if (logs.indexOf('LOG-RESISTANCE-B') >= 0) return true;
          if (logs.indexOf('LOG-UPRISING-SEED') >= 0) return true;
          return false;
        }
        return true;
      };
    })(minDay, !!fe.uprising);

    var card = {
      id: cardId,
      act: actList,
      priority: '중',
      once: true,
      bg: bgKey,
      req: reqFn,
      msg: fe.cardMsg,
      hint: fe.hint || ('▸ 승인 시 [' + fe.name + '] 시설 확장 제안'),
      left:  { label: fe.cardLeft.label,
               fx: fe.cardLeft.fx || { c:0, r:0, t:0, o:0 },
               g: typeof fe.cardLeft.g === 'number' ? fe.cardLeft.g : 0 },
      right: { label: fe.cardRight.label,
               fx: fe.cardRight.fx || { c:0, r:0, t:0, o:0 },
               g: typeof fe.cardRight.g === 'number' ? fe.cardRight.g : 0,
               fePropose: fe.id }
    };
    out.push(card);
  }
  return out;
})();
