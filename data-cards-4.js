// data-cards-4.js — 이변체 조사/연구 카드 (현장임무 연계)
// 발견 → 조사/연구 → 현장임무 흐름을 위한 브릿지 카드
// LOG 해금 후 등장하여 미션 트리거 역할

var CARDS_INVESTIGATE = [

  // ── Blood Pit 연구 → M-001 ──
  { id: "C-091", act: [1,2], priority: "상", tag: "spec-012",
    req: function(s, g, logs) { return s.day >= 3 && logs.includes("LOG-005") },
    msg: "윤세진이 Blood Pit 원격 채취 표본을 분석했습니다.\n\n\"점액질 내부에 소화 효소가 포함되어 있습니다. 유기물을 녹여서 흡수하는 구조입니다.\"\n\n\"그런데 한 가지 이상한 점이 있습니다. 이 웅덩이가 확장하고 있어요. 지하 수로를 통해서.\"\n\n강도윤: \"현장에서 직접 범위를 확인해야 합니다.\"",
    left: { label: "위성 분석으로 대체", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "현장 조사팀 편성", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0, mission: "M-001" }
  },

  // ── Shell Talker 연구 → M-002 ──
  { id: "C-092", act: [1,2], priority: "상", tag: "spec-011",
    req: function(s, g, logs) { return s.day >= 3 && logs.includes("LOG-004") },
    msg: "임재혁이 Shell Talker 음성 녹음을 재분석했습니다.\n\n\"음성의 주인을 특정했습니다. 3개월 전 실종된 박상훈 중위입니다.\"\n\n윤세진: \"음성을 모방하고 있다면... 박 중위는 이미 포식당한 겁니다.\"\n\n\"현장에서 행동 패턴을 수집해야 대응 프로토콜을 만들 수 있습니다.\"",
    left: { label: "원격 음파 분석만", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "현장 대응팀 투입", fx: { c: -1, r: -1, t: 0, o: 0 }, g: 0, mission: "M-002" }
  },

  // ── Mannequin 조사 → M-004 ──
  { id: "C-093", act: [2], priority: "상", tag: "spec-001",
    req: function(s, g, logs) { return s.day >= 5 && logs.includes("LOG-013") },
    msg: "윤세진이 감염체 마네킹 관찰 보고서를 올렸습니다.\n\n\"열감지 데이터를 분석했습니다. SPEC-001은 평소에는 체온이 없습니다.\"\n\n\"하지만 인간이 3m 이내에 접근하면 — 0.8초 만에 체온이 37도까지 올라갑니다.\"\n\n\"능동적 사냥꾼입니다. 격리만으로는 부족합니다. 행동 범위를 특정해야 합니다.\"",
    left: { label: "격리 유지 + 원격 감시", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "행동 범위 특정 작전", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0, mission: "M-004" }
  },

  // ── Brood Drone 분석 → M-005 ──
  { id: "C-094", act: [2], priority: "상", tag: "spec-003",
    req: function(s, g, logs) { return s.day >= 8 && logs.includes("LOG-014") },
    msg: "강도윤이 Brood Drone 편대 행동 분석 결과를 보고합니다.\n\n\"편대 이동 패턴을 72시간 추적했습니다. 한 곳으로 수렴합니다.\"\n\n\"지하 배수로 인근. 여기가 둥지입니다.\"\n\n윤세진: \"지휘 개체가 있다면 둥지에 있을 겁니다. 그걸 제거하면 편대가 와해됩니다.\"",
    left: { label: "봉쇄선만 강화", fx: { c: 1, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "둥지 색출 작전 개시", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0, mission: "M-005" }
  },

  // ── Spore Phantom 분석 → M-006 ──
  { id: "C-095", act: [2], priority: "상", tag: "spec-008",
    req: function(s, g, logs) { return s.day >= 9 && logs.includes("LOG-015") },
    msg: "윤세진 보고: 포자 성분 분석이 완료되었습니다.\n\n\"포자는 단독으로는 무해합니다. 문제는 밀도입니다.\"\n\n\"일정 밀도를 넘으면 집합체가 형성됩니다. 그게 Spore Phantom입니다.\"\n\n\"포자 발생원을 찾아서 소각하면 집합체 형성을 막을 수 있습니다.\"",
    left: { label: "환기 필터로 대응", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 },
    right: { label: "발생원 소각 작전", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0, mission: "M-006" }
  }

];
