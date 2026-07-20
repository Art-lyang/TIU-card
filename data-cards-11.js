// data-cards-11.js — 연계 체인 카드 (C-179~C-192)
// 신규요원 훈련 체인, 식수 오염 체인, 야간 습격+강도윤 생존/사망 체인

var CARDS_CHAINS = [

  // ═══ 체인 1: 신규요원 훈련 ═══
  // C-001 즉시배치(right) → LOG-062 → C-179 훈련 기준미달
  { id: "C-179", act: [2,3], priority: "중", bg: "base",
    cond: function(s,g,logs){ return logs.includes("LOG-062") && !logs.includes("LOG-063") && !logs.includes("LOG-064") },
    msg: "신규 요원 훈련 결과가 보고되었습니다.\n\n강도윤: \"실전 대응 기준 미달. 사격 정확도, 통신 절차 모두 부족합니다.\"\n\n\"이대로 현장에 내보내면 위험합니다.\"",
    left: { label: "엄격한 재훈련 실시", fx: { c: 0, r: -1, t: -1, o: 1 }, g: 1 },
    right: { label: "실전이 최고의 훈련이다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 } },

  // 엄격교육 성공 루트: LOG-063 → C-180
  { id: "C-180", act: [2,3], priority: "중", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-063") && !logs.includes("LOG-063-DONE") },
    msg: "재훈련을 마친 신규 요원이 현장 임무에 투입되었습니다.\n\n강도윤: \"훈련 성과가 나왔습니다. 보고드리겠습니다.\"\n\n봉쇄선 3구역 순찰 중 이변체 접촉 — 신규 요원이 침착하게 대응했습니다.\n\n\"훈련대로 움직였습니다. 훈륭한 임무 수행이었습니다.\"",
    left: { label: "잘했다고 전해라", fx: { c: 1, r: 0, t: 2, o: 1 }, g: 1 },
    right: { label: "기록만 남겨두어라", fx: { c: 1, r: 0, t: 1, o: -1 }, g: -1 } },

  // 안일한 대처 실패 루트: LOG-064 → C-181
  { id: "C-181", act: [2,3], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-064") && !logs.includes("LOG-065") },
    msg: "긴급 보고.\n\n신규 요원이 현장 임무 중 이변체와 조우했습니다. 훈련 부족으로 대응이 늦었고, 강도윤이 구출에 나서면서 부상을 입었습니다.\n\n윤세진: \"신규 요원은 경상. 강도윤은... 오른쪽 다리에 열상입니다. 2주 이상 현장 복귀 불가.\"\n\n강도윤: \"...제 탓이 아닙니다. 지휘관.\"",
    left: { label: "책임은 나에게 있다", fx: { c: -1, r: -1, t: 1, o: -2 }, g: -2 },
    right: { label: "보고서 작성해라", fx: { c: -1, r: 0, t: -1, o: 0 }, g: 0 } },

  // 실패 후 이변체 습격: LOG-065 → C-182
  { id: "C-182", act: [2,3], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-065") && !logs.includes("LOG-065-ATK") },
    msg: "야간 경보.\n\n이전 임무 실패 지점 반경 500m에서 이변체 반응 감지. 피냄새를 따라온 것으로 추정.\n\n강도윤 부상으로 현장 지휘 불가. 대체 요원 부족.\n\n\"봉쇄선 2구역 이상 진동 감지!\"",
    left: { label: "잔여 요원 총동원", fx: { c: -2, r: -2, t: 0, o: 0 }, g: 0 },
    right: { label: "방어 진지 고수", fx: { c: -1, r: -1, t: -1, o: 0 }, g: 0 } },

  // ORACLE 신입교육 강경대응 권고: LOG-065-ATK → C-183
  { id: "C-183", act: [2,3], priority: "중", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-065-ATK") && !logs.includes("LOG-065-END") },
    msg: "[ORACLE 권고사항]\n\n\"신규 요원 훈련 부족으로 인한 연쇄 사고가 발생했습니다.\n향후 신규 요원 배치 시 ORACLE 강화 교육 프로토콜을 적용할 것을 권고합니다.\"\n\n\"이행률 100%를 보장합니다. 승인하시겠습니까?\"",
    left: { label: "승인한다", fx: { c: 1, r: 0, t: -2, o: 2 }, g: 3 },
    right: { label: "인간이 교육한다", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2 } },

  // ═══ 체인 2: 식수 오염 연쇄 ═══
  // 조건: LOG-066(정화 지연), LOG-067(수질 감시), LOG-068(식수 탱크 정화 보류) 중 2개 이상 → C-184 집단 식중독
  // C-184 itself unlocks LOG-069, so the same contamination chain cannot re-open after it fires.
  { id: "C-184", act: [2,3], priority: "상", bg: "base",
    cond: function(s,g,logs){
      var cnt = 0;
      if(logs.includes("LOG-066")) cnt++;
      if(logs.includes("LOG-067")) cnt++;
      if(logs.includes("LOG-068")) cnt++;
      return cnt >= 2 && !logs.includes("LOG-069") },
    msg: "긴급 보고.\n\n기지 요원 12명이 집단 식중독 증상을 보이고 있습니다.\n\n윤세진: \"수질 오염이 누적된 결과입니다. 정화 시스템이 제대로 작동하지 않았습니다.\"\n\n\"즉시 수리와 정화가 필요합니다. 둘 다 자원이 들지만... 선택해야 합니다.\"",
    left: { label: "전체 정화 시스템 교체", fx: { c: 0, r: -3, t: 1, o: 0 }, g: 0 },
    right: { label: "응급 수리 + 의약품 투입", fx: { c: 0, r: -2, t: 0, o: 0 }, g: 0 } },

  // 식중독 후속: 현장임무 요원 감소 — LOG-069 → C-185
  { id: "C-185", act: [2,3], priority: "중", bg: "base",
    cond: function(s,g,logs){ return logs.includes("LOG-069") && !logs.includes("LOG-069-CREW") },
    msg: "식중독 후유증으로 현장 투입 가능 요원이 감소했습니다.\n\n강도윤: \"순찰 인원이 절반으로 줄었습니다. 봉쇄선 사각지대가 늘었습니다.\"\n\n\"최소 5일은 감축 운영이 불가피합니다.\"",
    left: { label: "순찰 주기 조정", fx: { c: -2, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "경상자도 근무 복귀", fx: { c: -1, r: 0, t: -2, o: 0 }, g: 0 } },

  // ORACLE 경고: LOG-069-CREW → C-186
  { id: "C-186", act: [2,3], priority: "중", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-069-CREW") && !logs.includes("LOG-069-END") },
    msg: "[ORACLE 경고]\n\n\"기지 위생 관리 실패로 인한 전력 저하가 감지되었습니다.\n지휘관의 인프라 관리 역량에 대해 재평가가 예정되어 있습니다.\"\n\n\"향후 유사 사태 발생 시 ORACLE 자동 관리 시스템으로 전환됩니다.\"",
    left: { label: "개선 계획서 제출", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "현장 판단을 존중해라", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },

  // ═══ 체인 3: 야간 이변체 습격 + 강도윤 생존/사망 ═══
  // 조건: LOG-070(미휴식) + LOG-071(미개편) + LOG-072(ORACLE 의존) 중 2개 이상
  // C-187 is intentionally unused; the night-assault route starts at C-188 after earlier gap-preserving content moves.
  // C-188: 야간 습격 전조
  { id: "C-188", act: [3], priority: "상", bg: "forest",
    cond: function(s,g,logs){
      var cnt = 0;
      if(logs.includes("LOG-070")) cnt++;
      if(logs.includes("LOG-071")) cnt++;
      if(logs.includes("LOG-072")) cnt++;
      var doyunUnavailable = logs.includes("LOG-065") && !logs.includes("LOG-065-END");
      return cnt >= 2 && !doyunUnavailable && !logs.includes("LOG-074") && !logs.includes("LOG-075") && s.day >= 21 },
    msg: "지난 며칠간 미뤄 둔 위험 신호들이 한밤중에 한꺼번에 되돌아왔습니다.\n\n야간 순찰표에 남겨둔 작은 공백, 피로한 현장 판단, ORACLE에 맡긴 경계선 보정이 같은 방향으로 겹칩니다.\n\n야간 경보 발령.\n\n봉쇄선 전 구역에서 동시다발 생체 반응 감지. 이전 경험과는 규모가 다릅니다.\n\n강도윤: \"전 방위입니다! 숫자가 너무 많습니다 — 사각지대로 몰려들고 있습니다!\"\n\n그때 지도에 찍혔던 빈 지점들이 정확히 습격 경로가 되었습니다.",
    left: { label: "전원 전투 배치", fx: { c: -2, r: -2, t: 0, o: 0 }, g: 0 },
    right: { label: "방어 거점 집중", fx: { c: -1, r: -1, t: -1, o: 0 }, g: 0 } },

  // C-189: 비상터널 있음 (LOG-073) → 강도윤 생존
  { id: "C-189", act: [3], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-074") && logs.includes("LOG-073") && !logs.includes("LOG-074-DONE") },
    msg: "습격이 계속됩니다. 기지 동쪽 벽이 무너졌습니다.\n\n강도윤: \"동쪽 무너졌다! 전원 대피 —\"\n\n비상 터널을 통해 요원들이 대피합니다.\n\n강도윤이 후미를 맡아 마지막으로 터널에 진입. 왼쪽 어깨와 옆구리에 파편상을 입었지만 살았습니다.\n\n윤세진: \"출혈은 잡았습니다. 현장 복귀는 불가능합니다. 하지만 살았습니다.\"",
    left: { label: "장비 확인 및 대응", fx: { c: -1, r: -2, t: 2, o: 0 }, g: 0 },
    right: { label: "부상자 치료 우선", fx: { c: -2, r: -1, t: 2, o: 0 }, g: 0 } },

  // C-190: 비상터널 없음 (!LOG-073) → 강도윤 행방불명/사망
  { id: "C-190", act: [3], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-074") && !logs.includes("LOG-073") && !logs.includes("LOG-075") },
    msg: "습격이 계속됩니다. 기지 동쪽 벽이 무너졌습니다.\n\n강도윤: \"동쪽 무너졌다! 전원 대피 — 제가 막겠습니다!\"\n\n대피 경로가 하나뿐입니다. 요원들이 빠져나가는 동안 강도윤이 홀로 입구를 막습니다.\n\n통신이 끊겼습니다.\n\n수색 결과 — 강도윤 행방불명. 막아낸 것으로 보이나, 대피하지 못한 것으로 추정.\n\n\"강도윤 현장요원의 상태를 확인할 수 없습니다.\"",
    left: { label: "...군인의 예우를 갖춘다", fx: { c: -2, r: -1, t: -3, o: 0 }, g: -2 },
    right: { label: "수색을 계속한다", fx: { c: -2, r: -2, t: -1, o: 0 }, g: -1 } },

  // C-191: 강도윤 생존 후 ORACLE 경고
  { id: "C-191", act: [3,4], priority: "중", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-074-DONE") && !logs.includes("LOG-074-ORC") },
    msg: "[ORACLE 상황 보고]\n\n\"야간 습격으로 인해 기지 동쪽 방어벽 손상. 관리 체계 미비 사항 다수 발견.\"\n\n\"야간 순찰 루트의 사각지대가 습격 경로로 이용되었습니다.\"\n\n\"향후 ORACLE 권고 기반 운영을 강력히 권고합니다.\"",
    left: { label: "개선 계획 수립", fx: { c: 1, r: -1, t: 0, o: 1 }, g: 1 },
    right: { label: "현장 판단이 우선이다", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },

  // C-192: 강도윤 사망 후 ORACLE 경고
  { id: "C-192", act: [3,4], priority: "상", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-075") && !logs.includes("LOG-075-ORC") },
    msg: "[ORACLE 긴급 보고]\n\n\"현장요원 강도윤의 상태를 확인할 수 없습니다. 사실상 임무 수행 불가.\"\n\n\"비상 대피 경로가 부재한 상황에서 요원을 잃었습니다.\"\n\n\"지휘관의 인프라 관리 역량에 대해 심각한 재평가가 예정되어 있습니다.\"\n\n[ORACLE: 평가 지표 하향 조정]",
    left: { label: "...책임을 진다", fx: { c: -1, r: 0, t: -1, o: -2 }, g: -3 },
    right: { label: "수색을 멈추지 않는다", fx: { c: -1, r: -1, t: 1, o: -1 }, g: -1 } },

];

// CARDS 배열에 합류
if(typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_CHAINS);
