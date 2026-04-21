// data-cards-resist-hint.js
// Phase 4 — 저항 루트(B/D/F) 밸런싱 카드 5장
//   목적: 시뮬레이터 resist 전략 실행 시 C_o(ORACLE 차단) 100% → GI↓과 o↓의 과도한 결합 완화
//   설계: "GI는 낮추되 o 스탯은 유지/상승"하는 선택지 제공 (지휘 능숙 + 정보 장악)
// Phase 5 — 엔딩 H "점거" 디스커버러빌리티 힌트 2장
//   목적: 플레이어가 자연스럽게 uprising 경로를 알 수 있게 Act 2 중반 임재혁 힌트

var CARDS_RESIST_HINT = [

  // ════════════════════════════════
  //  Phase 4 — 저항 루트 밸런싱 5장
  // ════════════════════════════════

  // RH-01: ORACLE 데이터 요약 (o 유지 + GI 약간 감소)
  { id: "RH-01", act: [2,3], priority: "중", tag: "resist-balance",
    req: function(s,g,logs){ return s.day >= 8 },
    msg: "서하은이 일일 브리핑 중 덧붙입니다.\n\n\"ORACLE에 올리는 보고서를 제가 먼저 검수할 수 있습니다.\n형식은 완벽하게 유지하면서 — 일부 정보의 우선순위를 낮출 수 있어요.\"\n\n\"ORACLE은 형식만 보면 아무 문제도 못 느낍니다.\"",
    left:  { label: "공식 형식만 유지하라", fx: { c: 0, r: 0, t: 1, o: 0 }, g: -2 },
    right: { label: "본부 보고대로 올려라", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  // RH-02: 강도윤 비공식 파견 (GI 감소 + t·o 동시 유지)
  { id: "RH-02", act: [2,3], priority: "중", tag: "resist-balance",
    req: function(s,g,logs){ return s.day >= 10 },
    msg: "강도윤이 비공식 루트로 보고합니다.\n\n\"외곽 순찰 중에 — ORACLE 카메라가 닿지 않는 구역을 발견했습니다.\n보고서에는 정상 코스로 넣겠습니다.\"\n\n\"그렇게 해두면, 필요할 때 블라인드 포인트로 쓸 수 있습니다.\"",
    left:  { label: "그렇게 기록해 둬라", fx: { c: 1, r: 0, t: 1, o: 0 }, g: -3 },
    right: { label: "ORACLE 지침대로 전체 기록", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },

  // RH-03: 윤세진 의료 기록 이중화 (t 상승 + o 유지)
  { id: "RH-03", act: [2,3], priority: "중", tag: "resist-balance",
    req: function(s,g,logs){ return s.day >= 9 },
    msg: "윤세진이 진료 기록을 정리하며 말합니다.\n\n\"공식 기록 외에 — 제가 개인적으로 보관하는 케이스가 있어요.\n ORACLE은 '정상 범위'라고 분류했지만, 저는 패턴이 보입니다.\"\n\n\"정식 보고와 별개로 남겨둘까요?\"",
    left:  { label: "보관해라. 형식은 정식대로", fx: { c: 0, r: 0, t: 2, o: 0 }, g: -2 },
    right: { label: "ORACLE 분류를 따른다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  // RH-04: 임재혁 시스템 모니터링 (o 상승 + GI 감소 — 지식형 저항)
  { id: "RH-04", act: [2,3], priority: "중", tag: "resist-balance",
    req: function(s,g,logs){ return s.day >= 12 },
    msg: "임재혁이 콘솔에서 고개를 듭니다.\n\n\"ORACLE 쿼리 패턴을 역분석해두고 있습니다.\n\n당국에 걸릴 걸 최소화하면서 — 시스템 내부를 더 볼 수 있어요.\"\n\n\"이건 운영자로서 해야 할 일이기도 합니다.\"",
    left:  { label: "분석 계속", fx: { c: 0, r: -1, t: 1, o: 1 }, g: -3 },
    right: { label: "정식 승인 후에 해라", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // RH-05: ORACLE 자체 오류 보고 (o 대폭 상승 + GI 감소)
  { id: "RH-05", act: [3], priority: "상", tag: "resist-balance",
    req: function(s,g,logs){ return s.day >= 15 },
    msg: "[ORACLE: 자체 진단 결과 통보]\n\n\"PILEHEAD. 분석 모듈에 일시적 이상이 감지되었습니다. 재동기화가 필요합니다.\"\n\n서하은이 조용히 말합니다.\n\"...지금이 우리 판단 기록을 남길 기회입니다.\n ORACLE이 어떻게 판단했는지 기록하면서, 우리가 왜 다르게 생각하는지도 남길 수 있어요.\"",
    left:  { label: "우리 판단 함께 기록", fx: { c: 0, r: 0, t: 1, o: 2 }, g: -4 },
    right: { label: "ORACLE 판단만 통과", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 3 } },

  // ════════════════════════════════
  //  Phase 5 — 엔딩 H 디스커버러빌리티 힌트
  // ════════════════════════════════

  // HH-01: 임재혁 초기 암시 (Act 2~3, day 12+) — "독립 인프라"라는 단어 노출
  // v1.1: Act2가 5-12로 축소됨에 따라 act:[2,3]으로 확장 (day 12 한정 Act2, 13+ Act3)
  { id: "HH-01", act: [2,3], priority: "중", tag: "uprising-hint", once: true,
    req: function(s,g,logs){ return s.day >= 12 },
    msg: "임재혁이 혼잣말처럼 말합니다.\n\n\"지휘관님. 이상한 생각인데 —\n이 기지의 전원, 통신, 서버. 전부 ORACLE 제어입니다.\"\n\"만약 ORACLE이 — 하루만 꺼진다면, 우리는 아무것도 못 합니다.\"\n\n\"언젠가 **독립 인프라**를 하나씩 갖춰두면 좋을 것 같습니다.\"",
    left:  { label: "검토해둬라", fx: { c: 0, r: 0, t: 1, o: 0 }, g: -1, trust: 3 },
    right: { label: "그건 본부 방침에 어긋난다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2, trust: -3 } },

  // HH-02: 서하은 동조 (Act 2 후반 / Act 3 초반) — uprising 시설 이름 노출
  { id: "HH-02", act: [2,3], priority: "중", tag: "uprising-hint", once: true,
    req: function(s,g,logs){ return s.day >= 16 && logs.indexOf('ONCE-HH-01') >= 0 },
    msg: "서하은이 임재혁의 제안서를 건넵니다.\n\n\"임재혁 기술관이 정리한 — 독립 인프라 후보 목록입니다.\n자체 서버룸, 독립 통신실, 비상 발전기, 차폐 회의실, 무기고.\"\n\n\"5개가 있으면, ORACLE 없이도 이 기지가 자립할 수 있어요.\"\n\"비상 대피 벙커까지 합치면 — 완성입니다.\"",
    left:  { label: "검토 명단에 올려둬라", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2, trust: 5 },
    right: { label: "아직 단계가 아니다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2, trust: -3 } }

];

// CARDS 배열에 주입
if (typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_RESIST_HINT);
