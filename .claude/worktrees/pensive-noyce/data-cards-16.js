// data-cards-16.js — Act 2 중반부 특별 이벤트 카드 (C-260 ~ C-270)
// Day 10~25 구간 반복감 해소: 이변체 접근, 프로메테우스 접선, 기지 위기, ORACLE 개입

var CARDS_MIDGAME = [

  // ═══ 이변체 접근 이벤트 ═══

  { id: "C-260", act: [2], priority: "상", bg: "restricted", tag: "midgame-ev",
    cond: function(s) { return s.day >= 12 && s.day <= 22 },
    msg: "새벽 3시. 봉쇄선 3구역 센서가 동시에 반응했습니다.\n\n강도윤: \"이 패턴… EV-Σ 변이체입니다. 종류가 다릅니다. 기존 데이터에 없는 주파수예요.\"\n\n윤세진: \"표본 채취 기회입니다. 이 변종은 연구 가치가 높아요.\"\n\n서하은: \"요원들의 안전이 우선입니다. 봉쇄선을 보강하세요.\"",
    left: { label: "봉쇄선 보강 — 안전 최우선", fx: { c: 2, r: -1, t: 1, o: 0 }, g: 1 },
    right: { label: "포획 시도 — 연구 가치 우선", fx: { c: -1, r: -1, t: 0, o: 0 }, g: -1 } },

  { id: "C-261", act: [2], priority: "상", bg: "forest", tag: "midgame-ev",
    cond: function(s) { return s.day >= 15 && s.day <= 24 },
    msg: "봉쇄선 외곽 숲에서 비정상적인 식생 변화가 발견되었습니다. 나무들이 하룻밤 사이에 2미터 이상 자랐습니다.\n\n윤세진: \"EV-Σ 돌연변이 촉진… 이건 확산 징후입니다.\"\n\n임재혁: \"해당 구역에 억제제를 살포하면 확산을 늦출 수 있습니다. 하지만 보급이 필요합니다.\"\n\nORACLE: 「해당 구역 데이터를 본부로 전송하시오.」",
    left: { label: "억제제 살포 — 자원 투입", fx: { c: 1, r: -2, t: 0, o: 0 }, g: 0 },
    right: { label: "ORACLE에 보고 — 데이터 전송", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 } },

  // ═══ 프로메테우스 접선 이벤트 ═══

  { id: "C-262", act: [2], priority: "상", bg: "comms", tag: "midgame-prom",
    cond: function(s,g) { return s.day >= 13 && s.day <= 20 && g <= 10 },
    msg: "야간 순찰 중 봉쇄선 외곽에서 낯선 신호가 감지되었습니다.\n\n임재혁: \"…이건 프로메테우스 암호화 패턴입니다. 누군가 접선을 원하는 것 같습니다.\"\n\n강도윤: \"함정일 수 있습니다. 하지만 정보가 필요한 건 사실입니다.\"\n\nORACLE: 「미인가 통신 행위를 중단하시오.」",
    left: { label: "ORACLE 지시에 따라 무시", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 3 },
    right: { label: "비밀리에 접선 시도", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -3 } },

  { id: "C-263", act: [2], priority: "중", bg: "forest2", tag: "midgame-prom",
    cond: function(s,g,logs) { return s.day >= 16 && logs.indexOf('LOG-080') >= 0 },
    msg: "마르쿠스 베버가 은밀히 메모를 전달했습니다.\n\n\"ORACLE이 한국 지부 데이터를 선별적으로 삭제하고 있다. KR-INIT-001의 이변체 관측 데이터 중 특정 시간대가 빠져 있다.\n\n확인하려면 기지 서버 로그를 직접 조사해야 한다. 하지만 ORACLE에 들키면 위험하다.\"",
    left: { label: "위험 감수 — 서버 로그 조사", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2 },
    right: { label: "당분간 보류 — 타이밍을 기다린다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // ═══ 기지 위기 이벤트 ═══

  { id: "C-264", act: [2], priority: "상", bg: "base", tag: "midgame-crisis",
    cond: function(s) { return s.day >= 14 && s.day <= 22 },
    msg: "기지 발전기 3기 중 1기가 과부하로 정지했습니다. 나머지 2기로는 전체 시설 운영이 불가능합니다.\n\n임재혁: \"응급 수리에 12시간, 예비 부품이 필요합니다.\"\n\n서하은: \"B2 연구실과 B3 격리실 중 하나의 전력을 차단해야 합니다. 둘 다 유지할 전력이 없습니다.\"",
    left: { label: "B2 연구실 전력 차단 — 격리 우선", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 1 },
    right: { label: "B3 격리실 전력 차단 — 연구 우선", fx: { c: -1, r: -1, t: 0, o: 0 }, g: -1 } },

  { id: "C-265", act: [2], priority: "상", bg: "weather", tag: "midgame-crisis",
    cond: function(s) { return s.day >= 11 && s.day <= 20 },
    msg: "갑작스러운 폭설로 외부 보급로가 차단되었습니다. 최소 3일간 보급이 불가능합니다.\n\n강도윤: \"비상 식량으로 5일 버틸 수 있습니다. 하지만 의약품이 부족합니다.\"\n\n윤세진: \"산악 보급로가 있다면… 위험하지만 시도할 가치가 있습니다.\"",
    left: { label: "비상 식량으로 버틴다 — 안전하게 대기", fx: { c: 0, r: -2, t: -1, o: 0 }, g: 0 },
    right: { label: "산악 보급로 탐색 시도", fx: { c: -1, r: 1, t: 0, o: 0 }, g: -1 } },

  // ═══ ORACLE 개입 이벤트 ═══

  { id: "C-266", act: [2], priority: "상", bg: "oracle", tag: "midgame-oracle",
    cond: function(s,g) { return s.day >= 12 && s.day <= 23 && g <= 5 },
    msg: "ORACLE 시스템에서 예상치 못한 메시지가 수신되었습니다.\n\nORACLE: 「지휘관. 최근 귀하의 판단 패턴이 예측 모델에서 이탈하고 있습니다. 재교육 프로토콜 적용을 권고합니다.\n\n거부 시 평가 지수가 조정될 수 있습니다.」\n\n서하은: \"…협박입니다. ORACLE이 당신을 통제하려 하고 있어요.\"",
    left: { label: "재교육 프로토콜 수용", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 5 },
    right: { label: "정중히 거절", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -3 } },

  { id: "C-267", act: [2], priority: "중", bg: "oracle", tag: "midgame-oracle",
    cond: function(s,g) { return s.day >= 15 && g >= 15 },
    msg: "ORACLE에서 보상 패키지가 도착했습니다.\n\nORACLE: 「지휘관의 충실한 운영에 감사합니다. 특별 보급 물자를 발송했습니다. 계속 권고를 따르시기 바랍니다.」\n\n강도윤: \"…물자는 반갑지만, 이게 보상인지 미끼인지 판단이 안 서네요.\"",
    left: { label: "감사히 수령 — ORACLE 노선 유지", fx: { c: 0, r: 2, t: 0, o: 1 }, g: 2 },
    right: { label: "물자만 받고 경계 유지", fx: { c: 0, r: 2, t: 0, o: 0 }, g: 0 } },

  // ═══ 내부 갈등 / 인간 드라마 ═══

  { id: "C-268", act: [2], priority: "중", bg: "base", tag: "midgame-drama",
    cond: function(s) { return s.day >= 13 && s.day <= 21 },
    msg: "강도윤이 심각한 표정으로 찾아왔습니다.\n\n강도윤: \"지휘관, 솔직히 말씀드리겠습니다. 야간 순찰조에서 2명이 탈영을 계획하고 있습니다.\n\n그들도 가족이 있는 사람들입니다. 하지만 기지를 떠나면… 봉쇄선 밖에서 살아남기 어렵습니다.\"",
    left: { label: "면담 후 자발적 잔류 유도", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "규정대로 구금 — 전례를 만들 수 없다", fx: { c: 1, r: 0, t: -2, o: 0 }, g: 1 } },

  { id: "C-269", act: [2], priority: "중", bg: "lab", tag: "midgame-drama",
    cond: function(s,g,logs) { return s.day >= 14 && logs.indexOf('LOG-007') >= 0 },
    msg: "윤세진이 연구실에서 밤을 새운 채 발견되었습니다. 눈 밑에 짙은 다크서클이 있습니다.\n\n윤세진: \"…이변체 샘플에서 이상한 패턴을 발견했어요. 인간 DNA와의 유사성이 97%입니다.\n\n이건… ORACLE이 알면 연구를 중단시킬 거예요. 하지만 알아야 합니다.\"",
    left: { label: "연구 계속 허가 — 비밀리에 진행", fx: { c: 0, r: -1, t: 0, o: 0 }, g: -2 },
    right: { label: "보고 의무 준수 — ORACLE에 보고", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2 } },

  { id: "C-270", act: [2], priority: "중", bg: "base", tag: "midgame-drama",
    cond: function(s) { return s.day >= 16 && s.day <= 23 },
    msg: "기지 복도에서 요원들이 모여 속삭이는 것을 목격했습니다. 당신을 보자 즉시 흩어졌습니다.\n\n서하은: \"…지휘관에 대한 불만은 아닌 것 같습니다. 그보다는 ORACLE에 대한 두려움이에요.\n\n최근 ORACLE의 요구가 점점 비합리적이 되고 있다는 걸 모두가 느끼고 있습니다.\"",
    left: { label: "전체 회의 소집 — 투명하게 논의", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -2 },
    right: { label: "개별 면담으로 조용히 파악", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } }

];
