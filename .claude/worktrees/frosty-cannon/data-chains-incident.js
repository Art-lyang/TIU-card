// data-chains-incident.js — 기지 내부 사건 체인 (조사/추론 해결)
// 시설도 구역과 연결되는 내부 위기 이벤트

// ═══ 트리거 카드 — 일반 카드풀에 등장, 체인 시작점 ═══
var CARDS_INCIDENT = [

  // ── 격리실 이상 반응 (연구동 B → 격리 구역) ──
  { id: "C-301", act: [2,3], priority: "상", bg: "lab",
    cond: function(s,g,logs){ return s.day>=18 && logs.indexOf('LOG-INC-01')<0 },
    msg: "야간 순찰 중 — 연구동 B 격리실에서 비정상 열 반응.\n\n센서 기록: 실내 온도 37.2°C → 4.1°C. 6분 만에.\n\n격리 대상은 움직이지 않고 있습니다.\n하지만 벽면 유리에 성에가 끼고 있습니다. 안쪽에서.",
    hint: "▸ 조사를 시작하면 후속 카드가 이어집니다",
    left: { label: "격리실 진입 조사", fx: { c: -1, r: 0, t: 1, o: -1 }, g: -2, log: "LOG-INC-01" },
    right: { label: "원격 모니터링 강화", fx: { c: 1, r: -1, t: 0, o: 1 }, g: 1, log: "LOG-INC-01" } },

  // ── CCTV 사각지대 발생 (보안실 → CCTV 통제실) ──
  { id: "C-302", act: [2,3], priority: "중", bg: "base",
    cond: function(s,g,logs){ return s.day>=14 && logs.indexOf('LOG-INC-02')<0 },
    msg: "임재혁이 보안실로 뛰어옵니다.\n\n\"지휘관님, CCTV 3번, 7번, 12번 카메라가 동시에 오프라인됩니다.\"\n\"패턴이 이상해요. 고장이 아니라 — 누군가 순서대로 끄고 있습니다.\"\n\n사각지대가 B1 복도 전체를 덮고 있습니다.",
    hint: "▸ 조사를 시작하면 후속 카드가 이어집니다",
    left: { label: "임재혁과 로그 추적", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2, log: "LOG-INC-02" },
    right: { label: "전 구역 수동 순찰 전환", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0, log: "LOG-INC-02" } },

  // ── 연구동 샘플 오염 (연구동 A → 의무실) ──
  { id: "C-303", act: [2,3], priority: "상", bg: "lab",
    cond: function(s,g,logs){ return s.day>=20 && logs.indexOf('LOG-INC-03')<0 },
    msg: "윤세진이 창백한 얼굴로 보고합니다.\n\n\"3번 샘플 배양기가 오염됐습니다.\"\n\"문제는 — 오염원이 외부가 아니에요. 배양기 내부에서 자체 변이한 겁니다.\"\n\n배양기 유리 안쪽에 검은 실 같은 것이 퍼지고 있습니다.",
    hint: "▸ 조사를 시작하면 후속 카드가 이어집니다",
    left: { label: "샘플 긴급 격리 + 분석", fx: { c: 0, r: -1, t: 1, o: 0 }, g: -1, log: "LOG-INC-03" },
    right: { label: "배양기 전체 소각 처리", fx: { c: 1, r: -2, t: 0, o: 1 }, g: 1, log: "LOG-INC-03" } },

  // ── 보안구역 인증 오류 (제한 통행 홀 → 서버실) ──
  { id: "C-304", act: [3], priority: "중", bg: "restricted",
    cond: function(s,g,logs){ return s.day>=26 && logs.indexOf('LOG-INC-04')<0 },
    msg: "[ORACLE 보안 알림]\n\n제한 통행 홀 생체 인증 시스템에서 '인증 성공' 기록이 발견되었습니다.\n\n문제: 해당 시각에 등록된 인원이 출입한 기록이 없습니다.\n\n누군가가 — 혹은 무언가가 — 인증을 통과했습니다.",
    hint: "▸ 조사를 시작하면 후속 카드가 이어집니다",
    left: { label: "서버실 접근 로그 분석", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2, log: "LOG-INC-04" },
    right: { label: "인증 시스템 초기화", fx: { c: 1, r: -1, t: 0, o: 1 }, g: 1, log: "LOG-INC-04" } },

  // ── 직원 실종 (휴게실 → 비상 계단) ──
  { id: "C-305", act: [3], priority: "상", bg: "base",
    cond: function(s,g,logs){ return s.day>=28 && logs.indexOf('LOG-INC-05')<0 },
    msg: "아침 점호. 인원 1명 미확인.\n\n보급 담당 이수현 요원. 어젯밤 22:00 휴게실 퇴실 기록 이후 동선 없음.\n\n강도윤: \"숙소에 없습니다. 침구가 펼쳐진 상태인데, 사용 흔적이 없어요.\"\n\n기지 내 수색이 필요합니다.",
    hint: "▸ 조사를 시작하면 후속 카드가 이어집니다",
    left: { label: "동선 역추적 수색", fx: { c: -1, r: 0, t: 1, o: 0 }, g: -1, log: "LOG-INC-05" },
    right: { label: "ORACLE에 위치 추적 요청", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1, log: "LOG-INC-05" } }
];
