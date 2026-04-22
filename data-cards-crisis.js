// data-cards-crisis.js — 자원 위기 조건 카드 + Act 1 미스터리 씨앗
// 개선안 #1: r < 30 위기 카드 / #2A: 프롤로그 복선 이벤트

var CARDS_CRISIS = [

  // ═══ 자원 위기 카드 (r < 30일 때만 등장) ═══

  { id: "CR-001", act: [2,3,4], priority: "상",
    req: function(s){ return s.r < 30; },
    msg: "배급량 삭감 소식이 퍼졌습니다.\n\n기지 인원 일부가 식량 저장소 앞에 모여 있습니다.\n\"우리가 왜 굶어야 합니까?\"\n\n상황이 악화되기 전에 대응이 필요합니다.",
    left: { label: "직접 나가 설명", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -1 },
    right: { label: "보안팀 배치", fx: { c: 0, r: 0, t: -2, o: 1 }, g: 1 } },

  { id: "CR-002", act: [2,3,4], priority: "상",
    req: function(s){ return s.r < 25; },
    msg: "의무실 긴급 보고: 의약품 재고가 3일치밖에 남지 않았습니다.\n\n윤세진: \"부상자가 나오면 치료할 수단이 없습니다.\"\n\n외부 조달은 보급로 상태에 따라 위험할 수 있습니다.",
    left: { label: "위험 감수하고 외부 조달", fx: { c: -1, r: 2, t: 1, o: 0 }, g: 0 },
    right: { label: "기존 재고로 배분 최적화", fx: { c: 0, r: 1, t: -1, o: 1 }, g: 1 } },

  { id: "CR-003", act: [2,3], priority: "상",
    req: function(s){ return s.r < 30 && s.t < 40; },
    msg: "야간 순찰 중 식량 저장고 자물쇠가 파손된 채 발견되었습니다.\n\n재고 점검 결과 — 3일치 비상 식량이 사라졌습니다.\n\n강도윤: \"내부 소행입니다. 누군가 한계에 다다른 겁니다.\"",
    left: { label: "전원 조사 (엄격)", fx: { c: 0, r: 0, t: -2, o: 2 }, g: 2 },
    right: { label: "조용히 수습 (관용)", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -1 } },

  { id: "CR-004", act: [3,4], priority: "상",
    req: function(s){ return s.r < 20; },
    msg: "[긴급] 발전기 연료 잔량 위험 수준.\n\n4시간 내 보조 전력으로 전환하지 않으면 ORACLE 단말기 포함 전 시스템 셧다운.\n\n임재혁: \"비필수 구역 전력부터 차단해야 합니다.\"",
    left: { label: "비필수 구역 차단", fx: { c: 0, r: 1, t: -1, o: 0 }, g: 0 },
    right: { label: "ORACLE 우선 전력 배분", fx: { c: -1, r: 1, t: -2, o: 2 }, g: 3 } },

  { id: "CR-005", act: [2,3,4], priority: "중",
    req: function(s){ return s.r < 30; },
    msg: "기지 정수 시설 필터 교체 시기가 지났으나 교체품이 없습니다.\n\n\"물에서 냄새가 납니다.\"\n\n사기가 눈에 띄게 떨어지고 있습니다.",
    left: { label: "임시 정수법 지시", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "봉쇄 물자에서 전용", fx: { c: -1, r: 1, t: 1, o: -1 }, g: -1 } },

  { id: "CR-006", act: [3,4], priority: "상",
    req: function(s){ return s.r < 25 && s.c < 40; },
    msg: "보급 부족과 봉쇄선 약화가 동시에 발생했습니다.\n\nORACLE: \"자원 배분 우선순위 결정이 필요합니다.\"\n\n봉쇄 강화에 쓰면 기지 생활이 더 악화됩니다.",
    left: { label: "기지 생활 우선", fx: { c: -2, r: 2, t: 2, o: -2 }, g: -2 },
    right: { label: "봉쇄 강화 우선", fx: { c: 2, r: -1, t: -2, o: 2 }, g: 2 } },

  // ═══ Act 1 미스터리 씨앗 (개선안 #2A) ═══

  { id: "CA-SEED-01", act: [1], priority: "중", once: true,
    req: function(s){ return s.day >= 4 && s.day <= 7; },
    msg: "야간 당직 보고서에 이상한 항목이 있습니다.\n\n\"02:47 — 시스템 자가 진단 기록. 담당자 없음.\"\n\n02:47에 예약된 자가 진단은 운영 매뉴얼에 없습니다.",
    left: { label: "오류로 처리", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "기록 보관", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1 } },

  { id: "CA-SEED-02", act: [2,3], priority: "중", once: true,
    req: function(s){ return s.day >= 6 && s.day <= 14; },
    msg: "사무실 책상 서랍 깊숙이에서 메모지가 발견되었습니다.\n\n작성자 불명. 날짜도 없습니다. 글씨가 급하게 쓴 듯 흐릿합니다.\n\n이상하네? 전임 지휘관이 없을 텐데...\n\n마지막 줄만 또렷합니다:\n\n\"B3 — 내부에 도면에 없는 구역이 있다. 제한구역 안쪽. 확인 필요.\"",
    left: { label: "그냥 넘긴다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "B3 제한구역을 확인해보겠다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1 } },

  { id: "CA-SEED-03", act: [1], priority: "하", once: true,
    req: function(s){ return s.day >= 3 && s.day <= 6; },
    msg: "임재혁이 단말기 점검 중 잠깐 멈칫합니다.\n\n\"... 아, 아닙니다. 펌웨어 버전 번호가 좀 이상해서요.\"\n\n\"공식 릴리즈 기록에 없는 빌드입니다. 보통 이런 건 없는데.\"",
    left: { label: "네가 판단해라", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "ORACLE에 문의", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-SEED-04", act: [1], priority: "하", once: true,
    req: function(s){ return s.day >= 3 && s.day <= 7; },
    msg: "서하은이 일일 보고서를 제출하면서 한마디 덧붙입니다.\n\n\"데이터 정리하다 보니... ORACLE 로그 타임스탬프에 간헐적 불연속이 있어요.\"\n\"밀리초 단위라 운영엔 영향 없지만, 좀 신경 쓰이네요.\"",
    left: { label: "참고하겠다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "공식 보고할 필요 없다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } }
];
