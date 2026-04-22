// data-cards-8.js — 전환 루트 전용 카드 + 대화
// transRoute: A(정상), B(경험부족/연쇄미완), C(정보부재/미션미완), D(강제)

var CARDS_TRANSITION = [

  // ════════════════════════════════════
  //  Act 1→2 루트 B: 경험 부족 (프로메테우스만 접촉, 미션 0)
  // ════════════════════════════════════

  { id: "CT-001", act: [2], priority: "상", bg: "forest",
    req: function(s,g,logs){ return s.day <= 13 && !logs.includes("LOG-030") },
    transReq: "B",
    msg: "봉쇄선 외곽에서 미분류 생체 반응 급증.\n\n대응 프로토콜이 없습니다. 현장 데이터가 부족합니다.\n\n강도윤: \"이전에 샘플이라도 채취했으면...\"",
    left: { label: "즉각 대응 출격", fx: { c: -1, r: -1, t: 1, o: 0 }, g: 0 },
    right: { label: "관측 후 판단", fx: { c: -1, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CT-002", act: [2], priority: "상", bg: "lab",
    req: function(s,g,logs){ return s.day <= 14 && logs.includes("LOG-030") && !logs.includes("LOG-031") },
    transReq: "B",
    msg: "윤세진이 급조한 이변체 대응 프로토콜을 올렸습니다.\n\n\"현장 데이터 없이 만들었습니다. 정확도는 보장 못 합니다.\"\n\n\"하지만 아무것도 없는 것보단 낫습니다.\"",
    left: { label: "채택한다", fx: { c: 1, r: 0, t: 1, o: -1 }, g: -1 },
    right: { label: "ORACLE 프로토콜 사용", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  // ════════════════════════════════════
  //  Act 1→2 루트 C: 정보 부재 (미션만 완료, 프로메테우스 미접촉)
  // ════════════════════════════════════

  { id: "CT-003", act: [2], priority: "상", bg: "restricted",
    req: function(s,g,logs){ return s.day <= 13 && !logs.includes("LOG-032") },
    transReq: "C",
    msg: "봉쇄선 3구역이 외부에서 절단되었습니다.\n\n이변체가 아닙니다. 도구를 사용한 흔적.\n\n서하은: \"이건 누가 한 겁니다. 우리가 모르는 누군가.\"",
    left: { label: "주변 수색", fx: { c: 1, r: -1, t: 0, o: 0 }, g: -1 },
    right: { label: "ORACLE에 보고", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CT-004", act: [2], priority: "상", bg: "comms",
    req: function(s,g,logs){ return s.day <= 14 && logs.includes("LOG-032") && !logs.includes("LOG-033") },
    transReq: "C",
    msg: "서하은이 긴급 보고합니다.\n\n\"침입 흔적에서 기술 시그니처를 추출했습니다.\"\n\"프로메테우스라는 조직의 것으로 추정됩니다.\"\n\n\"...우리가 모르고 있었습니다.\"",
    left: { label: "추적 조사 개시", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2 },
    right: { label: "방어 강화에 집중", fx: { c: 1, r: -1, t: 0, o: 1 }, g: 1 } },

  // ════════════════════════════════════
  //  Act 1→2 루트 D: 강제 전환 (둘 다 안 함)
  // ════════════════════════════════════

  { id: "CT-005", act: [2], priority: "상", bg: "restricted",
    req: function(s,g,logs){ return s.day <= 12 && !logs.includes("LOG-034") },
    transReq: "D",
    msg: "동시다발 상황.\n\n봉쇄선 2개 구간에서 이변체 활동 감지.\n동시에 기지 동쪽에서 미확인 차량 접근.\n\n[ORACLE: 복수 위협 동시 감지. 우선순위를 결정하십시오.]",
    left: { label: "이변체 대응 우선", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 },
    right: { label: "미확인 차량 우선", fx: { c: -1, r: 0, t: 0, o: 0 }, g: -1 } },

  { id: "CT-006", act: [2], priority: "상", bg: "base",
    req: function(s,g,logs){ return s.day <= 13 && logs.includes("LOG-034") && !logs.includes("LOG-035") },
    transReq: "D",
    msg: "강도윤이 복도에서 당신을 세웁니다.\n\n\"지휘관님. 솔직히 묻겠습니다.\"\n\"지난 열흘간 왜 아무 조치도 안 하셨습니까?\"\n\n\"요원들도 같은 생각입니다.\"",
    left: { label: "판단이 부족했다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 },
    right: { label: "상황을 관망한 것이다", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },

  { id: "CT-007", act: [2], priority: "상", bg: "comms",
    req: function(s,g,logs){ return s.day <= 14 && logs.includes("LOG-035") && !logs.includes("LOG-036") },
    transReq: "D",
    msg: "[ORACLE 특별 통신]\n\n\"한국 지부의 운영 효율이 기준 이하입니다.\"\n\"일부 결정 권한을 본부로 이관합니다.\"\n\n임재혁: \"...ORACLE이 직접 움직이기 시작했습니다.\"",
    left: { label: "이의 제기", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "수용한다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2 } },

  // ════════════════════════════════════
  //  Act 2→3 루트 B: 연쇄만 완료 (프로메테우스 미션 미완)
  // ════════════════════════════════════

  { id: "CT-008", act: [3], priority: "상", bg: "comms",
    req: function(s,g,logs){ return s.day <= 28 && !logs.includes("LOG-037") && !logs.includes("LOG-050") },
    transReq: "B",
    msg: "[ORACLE 문책 통신]\n\n\"프로메테우스 대응 실적이 부진합니다.\"\n\"한국 지부의 존재 의의가 의문시되고 있습니다.\"\n\n서하은: \"압박이 시작됐습니다.\"",
    left: { label: "성과를 내겠다", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2 },
    right: { label: "본부가 틀렸다", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -4 } },

  // ════════════════════════════════════
  //  Act 2→3 루트 C: 미션만 완료 (연쇄 미완)
  // ════════════════════════════════════

  { id: "CT-009", act: [3], priority: "상", bg: "base",
    req: function(s,g,logs){ return s.day <= 28 && !logs.includes("LOG-038") && !logs.includes("LOG-050") },
    transReq: "C",
    msg: "서하은의 조사가 중단된 채로 최종 국면에 진입했습니다.\n\n핵심 정보가 부족합니다.\n\n서하은: \"시간이 부족했습니다. 알아낸 것만으로 가야 합니다.\"",
    left: { label: "지금이라도 조사 재개", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2 },
    right: { label: "있는 정보로 간다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // ════════════════════════════════════
  //  Act 2→3 루트 D: 둘 다 안 함
  // ════════════════════════════════════

  { id: "CT-010", act: [3], priority: "상", bg: "comms",
    req: function(s,g,logs){ return s.day <= 27 && !logs.includes("LOG-039") },
    transReq: "D",
    msg: "[ORACLE 긴급 통신 — 기밀등급: MAXIMUM]\n\n\"지휘관 교체가 검토되고 있습니다.\"\n\"현 운영 상태가 지속되면 48시간 내 결정됩니다.\"\n\n임재혁이 화면을 바라보며 아무 말도 하지 않습니다.",
    left: { label: "성과로 증명하겠다", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "교체 당해도 상관없다", fx: { c: 0, r: 0, t: 2, o: -3 }, g: -5 } },

  { id: "CT-011", act: [3], priority: "상", bg: "base",
    req: function(s,g,logs){ return s.day <= 28 && logs.includes("LOG-039") && !logs.includes("LOG-040") },
    transReq: "D",
    msg: "강도윤이 기지 전체를 소집했습니다.\n\n\"지휘관님. 저희가 결정했습니다.\"\n\"교체가 오든 안 오든, 끝까지 함께 하겠습니다.\"\n\n윤세진, 임재혁이 고개를 끄덕입니다.",
    left: { label: "...고맙다", fx: { c: 0, r: 0, t: 3, o: 0 }, g: -2 },
    right: { label: "각자 판단해라", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } }

];
