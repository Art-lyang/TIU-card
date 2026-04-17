// data-cards-5.js — 자원 확보 + 일반 운영 카드
// 자원 순수익 카드 + 일상 기지 관리 카드

var CARDS_RESOURCE = [

  // ═══ 자원 확보 카드 ═══

  { id: "C-101", act: [2,3,4], priority: "하", bg: "supply", img: "card_supply_regular",
    msg: "ORACLE 정기 보급 알림.\n\n예정된 보급 물자가 도착했습니다. 식량, 의약품, 기본 장비.\n\n[ORACLE: 물자 배분은 지휘관 재량입니다.]",
    left: { label: "의료 물자 우선 배분", fx: { c: 0, r: 2, t: 1, o: 0 }, g: 0 },
    right: { label: "봉쇄 장비 우선 배분", fx: { c: 1, r: 1, t: 0, o: 1 }, g: 1 } },

  { id: "C-102", act: [2,3], priority: "하", bg: "supply",
    req: function(s,g,logs){ return !logs.includes("LOG-025") },
    msg: "기지 외곽 순찰 중 폐건물에서 군용 물자를 발견했습니다.\n\n강도윤: \"이전 부대가 남긴 것 같습니다. 상태가 양호합니다.\"\n\n식량 3상자, 의약품 1상자, 통신장비 부품.",
    left: { label: "전량 기지로 반입", fx: { c: 0, r: 2, t: -1, o: -1 }, g: -1 },
    right: { label: "ORACLE에 보고 후 반입", fx: { c: 0, r: 1, t: 0, o: 1 }, g: 1 } },

  { id: "C-103", act: [3,4], priority: "하", bg: "supply", req: function(s){ return s.day >= 5 },
    msg: "임재혁이 기지 에너지 효율화 작업을 완료했습니다.\n\n\"발전기 출력을 12% 개선했습니다. 잉여 전력을 물 정화에 돌릴 수 있습니다.\"\n\n[ORACLE: 효율적인 자원 관리입니다.]",
    left: { label: "물 정화 시스템 가동", fx: { c: 0, r: 1, t: 1, o: 1 }, g: 1 },
    right: { label: "잉여 전력을 비축", fx: { c: 0, r: 1, t: 0, o: 0 }, g: 0 } },

  { id: "C-104", act: [2,3,4], priority: "하", bg: "supply",
    msg: "강원도 내 협력 마을에서 농산물을 보내왔습니다.\n\n\"봉쇄 구역 덕분에 안전합니다. 감사의 표시입니다.\"\n\n기지 식량에 여유가 생겼습니다.",
    left: { label: "감사 인사 + 관계 유지", fx: { c: 0, r: 1, t: 1, o: 0 }, g: 0 },
    right: { label: "추가 물물교환 제안", fx: { c: -1, r: 2, t: 0, o: -1 }, g: -1 } },

  { id: "C-105", act: [3,4], priority: "하", bg: "supply", req: function(s){ return s.day >= 7 },
    msg: "ORACLE 본부에서 특별 자원 패키지가 도착했습니다.\n\n내용: 고급 분석 장비, 봉쇄 자재, 비상 의약품.\n\n[ORACLE: 한국 지부의 성과를 인정합니다.]",
    left: { label: "연구 장비 우선 배치", fx: { c: 0, r: 1, t: 0, o: 1 }, g: 2 },
    right: { label: "봉쇄 자재 우선 배치", fx: { c: 2, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "C-106", act: [2,3,4], priority: "하", bg: "supply",
    req: function(s,g,logs){ return !logs.includes("LOG-026") },
    msg: "윤세진이 기지 내 약초 재배 실험에 성공했습니다.\n\n\"기본 해열제와 소독제를 자체 생산할 수 있게 됐습니다.\"\n\n\"작지만 꾸준한 자원입니다.\"",
    left: { label: "재배 규모 확대", fx: { c: 0, r: 1, t: 1, o: 0 }, g: 0 },
    right: { label: "현 규모 유지", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // ═══ 일반 운영 카드 ═══

  { id: "C-107", act: [2,3,4], priority: "하",
    msg: "야간 경비 교대 시간이 다가옵니다.\n\n현재 교대 주기: 8시간. 요원들의 피로도가 누적되고 있습니다.\n\n강도윤: \"6시간 교대로 바꾸면 피로는 줄지만 인원이 부족해집니다.\"",
    left: { label: "6시간 교대로 변경", fx: { c: -1, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "8시간 유지", fx: { c: 1, r: 0, t: -1, o: 0 }, g: 0 } },

  { id: "C-108", act: [2,3,4], priority: "하",
    msg: "기지 통신 시스템 정기 점검 시간입니다.\n\n임재혁: \"4시간 동안 통신이 제한됩니다. 하지만 안 하면 언제 고장날지 모릅니다.\"\n\n[ORACLE: 점검을 권장합니다.]",
    left: { label: "점검 실시", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "다음으로 연기", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -1 } },

  { id: "C-109", act: [2,3], priority: "하",
    msg: "일반 요원들이 기지 내 체력 단련 시설 설치를 요청했습니다.\n\n\"장기 근무에 체력 유지가 필요합니다.\"\n\n자원이 소모되지만 사기에 도움이 됩니다.",
    left: { label: "간이 체력장 설치", fx: { c: 0, r: -1, t: 2, o: 0 }, g: 0 },
    right: { label: "자원 여유 생기면", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },

  { id: "C-110", act: [2,3,4], priority: "하",
    msg: "기지 근처에서 야생 사슴이 목격되었습니다.\n\n강도윤: \"EV-Σ 감염 징후는 없습니다. 그냥 사슴입니다.\"\n\n\"봉쇄 구역 내에 정상 생태계가 남아 있다는 뜻이기도 합니다.\"",
    left: { label: "관찰 기록만", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "생태 모니터링 추가", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 } },

  { id: "C-111", act: [2,3,4], priority: "하",
    msg: "기지 식수 탱크 정화 주기가 되었습니다.\n\n\"정기 작업입니다. 2명이 3시간 소요됩니다.\"\n\n건너뛰면 수질 저하 위험이 있습니다.",
    left: { label: "정화 실시", fx: { c: 0, r: 1, t: 0, o: 0 }, g: 0 },
    right: { label: "다음 주기에", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },

  { id: "C-112", act: [3,4], priority: "하", req: function(s){ return s.day >= 6 },
    msg: "일반 요원 중 한 명이 가족에게 편지를 보내고 싶어합니다.\n\n보안 규정상 외부 통신은 금지되어 있습니다.\n\n\"한 줄이면 됩니다. 살아 있다는 것만...\"",
    left: { label: "비공식으로 허용", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -1 },
    right: { label: "규정을 지켜야 한다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  // ═══ 후속 카드 (1회성 이벤트 이후) ═══
  { id: "C-153", act: [2,3], priority: "하", bg: "supply",
    req: function(s,g,logs){ return logs.includes("LOG-025") && s.day >= 5 },
    msg: "이전에 발견한 폐건물 인근에서 추가 물자 흔적이 보고되었습니다.\n\n강도윤: \"아직 수색하지 않은 구역이 남아 있습니다. 물자가 더 있을 가능성이 높습니다.\"",
    left: { label: "탐색팀 파견", fx: { c: 0, r: 2, t: 0, o: 0 }, g: 0 },
    right: { label: "위험 — 포기", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },
  { id: "C-154", act: [2,3,4], priority: "하", bg: "lab",
    req: function(s,g,logs){ return logs.includes("LOG-026") && s.day >= 8 },
    msg: "윤세진: \"약초 재배가 안정기에 접어들었습니다.\"\n\n\"이번 수확분으로 해열제 10일분을 추가 확보했습니다.\"",
    left: { label: "비축 처리", fx: { c: 0, r: 2, t: 0, o: 0 }, g: 0 },
    right: { label: "즉시 배분", fx: { c: 0, r: 1, t: 1, o: 0 }, g: 0 } }
];
