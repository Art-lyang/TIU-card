// data-cards-4.js — 이변체 연쇄: 관찰/연구 + 제거/확보 결정
// 첫 조우(1회성) → 관찰(LOG해금) → 결정(미션트리거)

var CARDS_INVESTIGATE = [

  // ═══ 관찰 / 연구 (미션 없음) ═══

  { id: "C-091", act: [2,3], priority: "상", tag: "spec-012",
    req: function(s,g,logs){ return s.day >= 3 && logs.includes("LOG-005") && !logs.includes("LOG-020") },
    msg: "윤세진이 Blood Pit 원격 채취 표본을 분석했습니다.\n\n\"점액질 내부에 소화 효소가 포함되어 있습니다. 유기물을 녹여서 흡수합니다.\"\n\n\"웅덩이가 지하 수로를 통해 확장 중입니다. 범위 특정이 필요합니다.\"",
    left: { label: "위성 데이터로 추적", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "현장 계측 장비 설치", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0 } },

  { id: "C-092", act: [2,3], priority: "상", tag: "spec-011",
    req: function(s,g,logs){ return s.day >= 3 && logs.includes("LOG-004") && !logs.includes("LOG-021") },
    msg: "임재혁이 Shell Talker 음성 녹음을 재분석했습니다.\n\n\"음성의 주인을 특정했습니다. 3개월 전 실종된 박상훈 중위입니다.\"\n\n윤세진: \"음성을 모방한다면, 박 중위는 이미 포식당한 겁니다.\"\n\n\"행동 패턴을 더 수집해야 대응책을 만들 수 있습니다.\"",
    left: { label: "원격 음파 센서 배치", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 },
    right: { label: "감시 드론 투입", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 } },

  { id: "C-093", act: [3], priority: "상", tag: "spec-001",
    req: function(s,g,logs){ return s.day >= 5 && logs.includes("LOG-013") && !logs.includes("LOG-022") },
    msg: "윤세진이 감염체 마네킹 열감지 데이터를 분석했습니다.\n\n\"평소 체온 없음. 인간 3m 이내 접근 시 0.8초 만에 37도 도달.\"\n\n\"능동적 사냥꾼입니다. 행동 범위와 이동 패턴 파악이 시급합니다.\"",
    left: { label: "원격 카메라 추가 설치", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 },
    right: { label: "미끼 실험 (인형 투입)", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 } },

  { id: "C-094", act: [3], priority: "상", tag: "spec-003",
    req: function(s,g,logs){ return s.day >= 8 && logs.includes("LOG-014") && !logs.includes("LOG-023") },
    msg: "강도윤이 Brood Drone 편대를 72시간 추적했습니다.\n\n\"이동 패턴이 한 곳으로 수렴합니다. 지하 배수로 인근.\"\n\n윤세진: \"지휘 개체가 있다면 둥지에 있을 겁니다. 더 조사해봐야 합니다.\"",
    left: { label: "항공 열감지 스캔", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 },
    right: { label: "외곽 잠복 관찰조", fx: { c: 0, r: -1, t: 1, o: 0 }, g: 0 } },

  { id: "C-095", act: [3], priority: "상", tag: "spec-008",
    req: function(s,g,logs){ return s.day >= 9 && logs.includes("LOG-015") && !logs.includes("LOG-024") },
    msg: "윤세진 보고: 포자 성분 분석 완료.\n\n\"포자는 단독으로 무해합니다. 밀도가 임계치를 넘으면 집합체 — Spore Phantom이 형성됩니다.\"\n\n\"발생원을 찾아야 합니다. 바람 패턴으로 위치 추정이 가능합니다.\"",
    left: { label: "공기 샘플링 확대", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 },
    right: { label: "바람 패턴 역추적", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 } },

  // ═══ 제거 / 확보 결정 (미션 트리거) ═══

  { id: "C-096", act: [2,3], priority: "상", tag: "spec-012",
    req: function(s,g,logs){ return s.day >= 6 && logs.includes("LOG-020") },
    msg: "Blood Pit 범위 특정 완료. 지하 수로 3개 지점에 분포.\n\n윤세진: \"소각하면 제거됩니다. 하지만 살아 있는 표본은 연구에 가치가 있습니다.\"\n\n강도윤: \"남겨두면 계속 확장합니다. 결정하십시오.\"",
    left: { label: "소각 제거 작전", fx: { c: 2, r: -1, t: 0, o: 1 }, g: 1, mission: "M-001" },
    right: { label: "격리 후 표본 확보", fx: { c: 0, r: -2, t: 1, o: -1 }, g: -1, mission: "M-001" } },

  { id: "C-097", act: [2,3], priority: "상", tag: "spec-011",
    req: function(s,g,logs){ return s.day >= 6 && logs.includes("LOG-021") },
    msg: "Shell Talker 행동 패턴 분석 완료.\n\n윤세진: \"음성 감별 알고리즘이 준비됐습니다. 미끼에 더 이상 속지 않습니다.\"\n\n강도윤: \"제거하거나 포획해서 연구할 수 있습니다. 팀을 보내야 합니다.\"",
    left: { label: "무력화 + 제거", fx: { c: 2, r: -1, t: 0, o: 1 }, g: 1, mission: "M-002" },
    right: { label: "생포 + 연구 이송", fx: { c: 0, r: -2, t: 1, o: -1 }, g: -1, mission: "M-002" } },

  { id: "C-098", act: [3], priority: "상", tag: "spec-001",
    req: function(s,g,logs){ return s.day >= 8 && logs.includes("LOG-022") },
    msg: "감염체 마네킹 행동 범위 특정 완료. 반경 200m.\n\n윤세진: \"Phase 1 상태라 제어 가능성이 있습니다.\"\n\n강도윤: \"접촉 순간 반응합니다. 원거리 대응이 안전합니다.\"",
    left: { label: "원거리 무력화", fx: { c: 2, r: -1, t: 0, o: 1 }, g: 1, mission: "M-004" },
    right: { label: "비접촉 격리 포획", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -1, mission: "M-004" } },

  { id: "C-099", act: [3], priority: "상", tag: "spec-003",
    req: function(s,g,logs){ return s.day >= 11 && logs.includes("LOG-023") },
    msg: "Brood Drone 둥지 위치 확인.\n\n윤세진: \"지휘 개체를 제거하면 편대가 와해됩니다. 하지만 통신 메커니즘은 연구 가치가 높습니다.\"\n\n강도윤: \"40체 이상. 소수 정예로 가야 합니다.\"",
    left: { label: "둥지 소각 + 제거", fx: { c: 2, r: -2, t: 0, o: 1 }, g: 1, mission: "M-005" },
    right: { label: "지휘 개체 포획", fx: { c: 0, r: -2, t: 1, o: -1 }, g: -1, mission: "M-005" } },

  { id: "C-100", act: [3], priority: "상", tag: "spec-008",
    req: function(s,g,logs){ return s.day >= 12 && logs.includes("LOG-024") },
    msg: "Spore Phantom 발생원 위치 추정 완료.\n\n윤세진: \"발생원 소각으로 집합체 형성을 차단할 수 있습니다. 포자 샘플을 더 확보하면 해독제 개발도 가능합니다.\"\n\n강도윤: \"방독면 필수. 어느 쪽이든.\"",
    left: { label: "발생원 소각", fx: { c: 2, r: -1, t: 0, o: 1 }, g: 1, mission: "M-006" },
    right: { label: "포자 채취 후 소각", fx: { c: 1, r: -2, t: 1, o: 0 }, g: 0, mission: "M-006" } },

  // ═══ 변이체 미조우 ACT 2 진입 카드 (1회성) ═══
  // 이변체를 한 번도 만나지 않고 ACT 2에 돌입한 경우 트리거

  { id: "C-177", act: [3], priority: "상", bg: "forest",
    req: function(s,g,logs){
      return !logs.includes("LOG-004") && !logs.includes("LOG-005") &&
             !logs.includes("LOG-013") && !logs.includes("LOG-014") &&
             !logs.includes("LOG-015") && !logs.includes("LOG-060") },
    msg: "야간 경보.\n\n봉쇄선 4구역에서 미확인 생체 반응 다수 감지. 기지 외벽에 충격.\n\n강도윤: \"이변체입니다! 최소 3개체 이상 — 기지에 접근하고 있습니다!\"\n\n윤세진: \"이런 규모의 접촉은 처음입니다. 데이터가 전무합니다.\"",
    left: { label: "전투 요원 투입", fx: { c: -1, r: -1, t: 1, o: 0 }, g: -1 },
    right: { label: "봉쇄선 전력 차단벽 가동", fx: { c: 1, r: -2, t: 0, o: 0 }, g: 0 } },

  { id: "C-178", act: [3], priority: "상", bg: "lab",
    req: function(s,g,logs){
      return logs.includes("LOG-060") && !logs.includes("LOG-061") },
    msg: "윤세진이 야간 습격 잔해를 분석했습니다.\n\n\"두 종류의 시그니처가 확인됩니다.\"\n\"하나는 음파 기반 — 인간 음성을 모방합니다.\"\n\"다른 하나는 점액질 — 유기물 용해 능력 보유.\"\n\n\"어느 쪽을 먼저 추적하시겠습니까?\"",
    left: { label: "음파 개체 추적 (Shell Talker)", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 },
    right: { label: "점액질 개체 추적 (Blood Pit)", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 } },

  // ═══ SPEC-004 Seed Spreader 연쇄 ═══

  { id: "C-179", act: [3], priority: "상", tag: "spec-004",
    req: function(s,g,logs){ return s.day >= 10 && logs.includes("LOG-015") && !logs.includes("LOG-025") },
    msg: "윤세진 긴급 보고.\n\n\"포자 지대 조사 데이터를 분석했습니다.\"\n\"포자의 원천 — SPEC-004, Seed Spreader를 식별했습니다.\"\n\n\"이건 단순한 이변체가 아닙니다. EV-Σ 바이러스를 퍼뜨리는 산포체예요.\"\n\"다른 이변체를 만드는 근원입니다.\"\n\n\"봉쇄선 안쪽에서 발견됐다는 건... 이미 침투했다는 뜻입니다.\"",
    left: { label: "즉시 위치 특정", fx: { c: 1, r: -1, t: 0, o: 0 }, g: -1, log: "LOG-025" },
    right: { label: "ORACLE에 분석 요청", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1, log: "LOG-025" } },

  { id: "C-180", act: [3,4], priority: "상", tag: "spec-004",
    req: function(s,g,logs){ return s.day >= 12 && logs.includes("LOG-025") && !logs.includes("LOG-026") },
    msg: "Seed Spreader 좌표 확정. 봉쇄선 북동 2.4km.\n\n위성 관측: 반경 500m 내 모든 생명 반응 소멸. 토양 회색 변색.\n\n강도윤: \"확보도 연구도 의미 없습니다. 이건 제거 대상입니다.\"\n\"이것이 계속 포자를 뿌리면, 봉쇄선 안쪽에 새로운 이변체가 생깁니다.\"\n\n윤세진: \"소각 시 2차 포자 폭발이 일어납니다. 신중해야 해요.\"\n\n강도윤의 말이 맞습니다. 이것은 확보할 대상이 아닙니다.",
    left: { label: "제거 작전 개시", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0, mission: "M-009" },
    right: { label: "ORACLE 원격 타격 요청", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2, mission: "M-009" } }
];
