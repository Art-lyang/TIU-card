// data-cards-9.js — 서하은 루트 (전출 저지 / 부재 대체 / 잔류 후속)
// LOG-050: 서하은 전출 확정
// LOG-051: 전출 저지 시도 중
// LOG-052: 서하은 잔류 확정

var CARDS_HAEUN = [

  // ════════════════════════════════════
  //  전출 저지 루트 (3장 연쇄)
  // ════════════════════════════════════

  { id: "CS-001", act: [4], priority: "상",
    req: function(s,g,logs){ return logs.includes("LOG-051") && !logs.includes("LOG-050") && !logs.includes("LOG-052") && !logs.includes("LOG-053") },
    msg: "ORACLE에 공식 이의를 제출했습니다.\n\n[ORACLE: 인사 결정은 본부 관할입니다. 이의 사유를 제출하십시오.]\n\n서하은: \"지휘관님, 제가 발견한 데이터 불일치... 그걸 사유로 쓸 수 있습니다.\"\n\"하지만 ORACLE에 보여주는 순간, 제가 뭘 추적하고 있었는지 알게 됩니다.\"",
    left: { label: "데이터 불일치를 사유로 제출", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "다른 사유를 만든다", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -1 } },

  { id: "CS-002", act: [4], priority: "상",
    req: function(s,g,logs){ return logs.includes("LOG-053") && !logs.includes("LOG-050") && !logs.includes("LOG-052") && !logs.includes("LOG-054") },
    msg: "[ORACLE 응답 — 인사 이의 검토 중]\n\n\"제출된 사유를 분석하고 있습니다.\"\n\n강도윤이 찾아옵니다.\n\"지휘관님. 서하은을 지키려는 거 맞습니까?\"\n\"...저도 돕겠습니다. 현장 인력 부족을 근거로 추가 이의를 넣을 수 있습니다.\"",
    left: { label: "강도윤의 추가 이의 수락", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -2 },
    right: { label: "이 이상 위험하다. 내 선에서", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "CS-003", act: [4], priority: "상",
    req: function(s,g,logs){ return logs.includes("LOG-054") && !logs.includes("LOG-050") && !logs.includes("LOG-052") },
    msg: "[ORACLE 인사 통신 — 최종 결정]\n\n3초간 침묵.\n\n[ORACLE: 한국 지부의 이의를 검토했습니다.]\n[ORACLE: 서하은 부지휘관의 전출을 ——]\n\n화면이 깜빡입니다.",
    left: { label: "...", fx: { c: 0, r: 0, t: 3, o: -2 }, g: -4 },
    right: { label: "...", fx: { c: 0, r: 0, t: 3, o: -2 }, g: -4 } },

  // ════════════════════════════════════
  //  서하은 잔류 후속 카드
  // ════════════════════════════════════

  { id: "CS-004", act: [4], priority: "상",
    req: function(s,g,logs){ return logs.includes("LOG-052") && !logs.includes("LOG-055") },
    msg: "서하은이 기지에 남았습니다.\n\n\"...감사합니다, 지휘관님.\"\n\"저를 지켜주셨으니, 저도 지휘관님을 지키겠습니다.\"\n\n\"ORACLE이 삭제한 데이터. 전부 복구하겠습니다.\"",
    left: { label: "부탁한다", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -2 },
    right: { label: "무리하지 마라", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },

  { id: "CS-005", act: [4], priority: "상",
    req: function(s,g,logs){ return logs.includes("LOG-055") && s.day >= 13 },
    msg: "서하은이 ORACLE 삭제 데이터 복구에 성공했습니다.\n\n\"지휘관님. 이건 보셔야 합니다.\"\n\"ORACLE이 프로메테우스를 적으로 분류한 진짜 이유가 여기 있습니다.\"\n\n\"그들은 치료제를 만들고 있었습니다.\"",
    left: { label: "전문을 확인한다", fx: { c: 0, r: 0, t: 1, o: -3 }, g: -6 },
    right: { label: "이 정보를 어떻게 쓸지 고민한다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 } },

  // ════════════════════════════════════
  //  서하은 부재 대체 카드 (LOG-050 이후 등장)
  // ════════════════════════════════════

  // 데이터 분석 역할 → 임재혁 겸임
  { id: "CS-010", act: [4], priority: "중", bg: "comms",
    req: function(s,g,logs){ return logs.includes("LOG-050") && !logs.includes("LOG-056") },
    msg: "서하은이 떠난 자리.\n\n임재혁이 데이터 분석 업무를 인수했습니다.\n\"...서하은 씨가 쓰던 분석 프레임워크를 따라하고 있는데, 절반도 못 따라갑니다.\"\n\n분석 보고 속도가 눈에 띄게 느려졌습니다.",
    left: { label: "시간을 줄 테니 적응해라", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "핵심만 추려서 보고해", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // 프로메테우스 정보 분석 → 불완전
  { id: "CS-011", act: [4], priority: "중", bg: "comms",
    req: function(s,g,logs){ return logs.includes("LOG-050") && logs.includes("LOG-056") && s.day >= 12 },
    msg: "프로메테우스 관련 통신이 수신되었습니다.\n\n임재혁: \"해독을 시도했는데... 서하은 씨였으면 30분이면 됐을 겁니다.\"\n\"제가 하면 이틀은 걸립니다.\"\n\n핵심 정보에 접근하는 속도가 현저히 느려졌습니다.",
    left: { label: "할 수 있는 만큼 해", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "ORACLE 자동 해독 요청", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2 } },

  // ORACLE 이상 감지 → 놓침
  { id: "CS-012", act: [4], priority: "중", bg: "comms",
    req: function(s,g,logs){ return logs.includes("LOG-050") && s.day >= 13 },
    msg: "[시스템 알림] 비정상 데이터 패턴 감지.\n\n서하은이 있었다면 즉시 분석했을 항목입니다.\n\n임재혁: \"감지는 했는데 무슨 의미인지 모르겠습니다.\"\n\"...분석 인력이 필요합니다.\"",
    left: { label: "윤세진에게도 협조 요청", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0 },
    right: { label: "무시하고 진행", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // 강도윤 반응
  { id: "CS-013", act: [4], priority: "중", bg: "base",
    req: function(s,g,logs){ return logs.includes("LOG-050") && !logs.includes("LOG-057") && s.day >= 12 },
    msg: "강도윤이 복도에서 말합니다.\n\n\"서하은이 없으니 데이터 분석이 2배 걸립니다.\"\n\"현장에서 판단할 정보가 부족합니다.\"\n\n\"...지키지 못한 건 지휘관님 탓이 아닙니다.\"",
    left: { label: "내 탓이다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: -1 },
    right: { label: "앞으로를 보자", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },

  // 윤세진 반응
  { id: "CS-014", act: [4], priority: "중", bg: "lab",
    req: function(s,g,logs){ return logs.includes("LOG-050") && !logs.includes("LOG-058") && s.day >= 12 },
    msg: "윤세진이 연구실에서 서하은의 분석 노트를 읽고 있습니다.\n\n\"서하은 씨가 남긴 프레임워크를 쓰고 있습니다.\"\n\"...부족하지만, 이것이라도 없었으면 아무것도 못 했을 거예요.\"",
    left: { label: "서하은의 기여를 기록해두자", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "네 역할에 집중해", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // 임재혁 반응
  { id: "CS-015", act: [4], priority: "중", bg: "comms",
    req: function(s,g,logs){ return logs.includes("LOG-050") && !logs.includes("LOG-059") && s.day >= 13 },
    msg: "임재혁이 야근 중입니다.\n\n\"서하은이 추적하던 ORACLE 삭제 흔적... 제가 이어받겠습니다.\"\n\"시간은 걸리겠지만, 포기하지 않겠습니다.\"",
    left: { label: "고맙다, 임재혁", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 },
    right: { label: "무리하지 마라", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } }

];
