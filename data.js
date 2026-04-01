// TERMINAL SESSION — data.js
// Cards, Content, Missions, Chains
const CARDS = [
  { id: "C-001", priority: "하", msg: "신규 요원 3명이 기지에 도착했습니다. 배치 승인이 필요합니다.", left: { label: "내일 배치", fx: { c: 0, r: 0, t: -1, o: -1 }, g: -1 }, right: { label: "즉시 배치", fx: { c: 1, r: -1, t: 1, o: 1 }, g: 1 } },
  { id: "C-002", priority: "중", msg: "봉쇄 구역 외곽에서 민간인 접근 시도 감지. 대응 지침을 결정하십시오.", left: { label: "경고 방송만", fx: { c: -1, r: 0, t: 1, o: -1 }, g: -1 }, right: { label: "요원 파견 차단", fx: { c: 1, r: -1, t: -1, o: 1 }, g: 1 } },
  { id: "C-003", priority: "상", msg: "인접 셀 C-14에서 SPEC-011 (Shell Talker) 목격 보고. 해당 셀 요원이 지원 요청.", left: { label: "거절: 자원 보존", fx: { c: 0, r: 0, t: -1, o: -1 }, g: -1 }, right: { label: "요원 2명 + 물자 파견", fx: { c: -1, r: -2, t: 1, o: 1 }, g: 1, mission: "M-002" } },
  { id: "C-004", priority: "중", msg: "기지 의료 물자가 부족합니다. 윤세진 연구원이 긴급 보급을 요청합니다.", left: { label: "현 수준 유지", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 }, right: { label: "보급 승인", fx: { c: 0, r: -2, t: 1, o: 0 }, g: 0 } },
  { id: "C-005", priority: "하", msg: "임재혁 기술관이 ORACLE 단말기 펌웨어 업데이트를 제안합니다.", left: { label: "보류", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -1 }, right: { label: "업데이트 승인", fx: { c: 0, r: -1, t: 0, o: 2 }, g: 2 } },
  { id: "C-006", priority: "상", msg: "서울 동부 봉쇄 구역 인근에서 프로메테우스 소속 추정 인원 3명 활동 감지.", left: { label: "감시만: 정보 수집", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -2 }, right: { label: "즉각 대응팀 투입", fx: { c: 1, r: -2, t: 1, o: 2 }, g: 2 } },
  { id: "C-007", priority: "중", msg: "강도윤 요원이 봉쇄선 외곽 정찰을 자원합니다. 단독 작전입니다.", left: { label: "허가", fx: { c: 1, r: 0, t: 1, o: -1 }, g: -1 }, right: { label: "ORACLE 판단 요청", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 } },
  { id: "C-008", priority: "중", msg: "서하은 부지휘관 보고: ORACLE 데이터 스트림에서 미세한 불일치 패턴 발견.", left: { label: "독자 조사 허가", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 }, right: { label: "ORACLE에 분석 위임", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },
  { id: "C-009", priority: "하", msg: "기지 인원 사기 저하 보고. 휴식 시간 확대 요청.", left: { label: "현행 유지", fx: { c: 0, r: 0, t: -2, o: 1 }, g: 0 }, right: { label: "휴식 확대 승인", fx: { c: -1, r: -1, t: 2, o: -1 }, g: 0 } },
  { id: "C-010", priority: "상", msg: "봉쇄 구역 내 SPEC-012 (Blood Pit) 활동 징후 감지. 샘플 채취 임무 제안.", left: { label: "위험 회피: 임무 취소", fx: { c: -1, r: 0, t: 0, o: -1 }, g: -1 }, right: { label: "채취팀 편성", fx: { c: 0, r: -2, t: 0, o: 1 }, g: 1, mission: "M-001" } },
  { id: "C-011", priority: "중", msg: "미확인 무선 신호 수신. 프로메테우스 암호 패턴과 유사합니다.", left: { label: "신호 추적", fx: { c: 0, r: -1, t: 0, o: -1 }, g: -2 }, right: { label: "ORACLE 분석 의뢰", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 } },
  { id: "C-012", priority: "하", msg: "강원도 내 민간 뉴스 — '야간 군사 차량 이동' 목격담 확산. 기지 보안 위험.", left: { label: "무시", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 }, right: { label: "이동 경로 변경", fx: { c: 0, r: -1, t: 1, o: 1 }, g: 1 } },
  { id: "C-013", priority: "상", msg: "ORACLE 긴급 통신: 봉쇄 구역 남측 경계에서 다수 생체 반응 감지. 즉각 대응 필요.", left: { label: "기지 방어 강화", fx: { c: -1, r: 0, t: 1, o: -1 }, g: -1 }, right: { label: "선제 출격", fx: { c: 2, r: -3, t: 0, o: 2 }, g: 1 } },
  { id: "C-014", priority: "중", msg: "윤세진 연구원이 이변체 관찰 기록을 개인적으로 작성하고 있습니다. 보안 위반 여부 판단 필요.", left: { label: "묵인", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 }, right: { label: "기록 압수 + 경고", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },
  { id: "C-015", priority: "중", msg: "ORACLE 권고: 기지 운영 효율 향상을 위해 의사결정 프로토콜을 ORACLE 자동화로 전환할 것을 제안합니다.", left: { label: "거절: 수동 유지", fx: { c: 0, r: 0, t: 1, o: -3 }, g: -4 }, right: { label: "부분 자동화 승인", fx: { c: 1, r: 1, t: -1, o: 3 }, g: 4 } },
  // 조건부 카드
  { id: "C-016", priority: "상", req: (s, g) => s.day >= 3 && g <= 40, msg: "[미분류 통신] ORACLE 데이터 링크 일시적 불안정. 미확인 암호화 통신(소바리 발신 추정)이 수신되었습니다.", left: { label: "무시 (권장)", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 }, right: { label: "독자 해독 시도", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },
  { id: "C-017", priority: "중", req: (s, g, logs) => logs.includes("LOG-003"), msg: "이전 수집된 프로메테우스 통신 패턴을 기반으로 인근의 은신처를 특정했습니다.", left: { label: "ORACLE 보고", fx: { c: 1, r: 0, t: 0, o: 2 }, g: 3 }, right: { label: "비공식 접촉", fx: { c: -1, r: 0, t: 2, o: -2 }, g: -4 } },
  { id: "C-018", priority: "상", req: (s) => s.day >= 5 && s.c < 40, msg: "봉쇄 구역 경계에서 대규모 이변체 이동 징후 포착. 현재 봉쇄력으로는 대응이 불확실합니다.", left: { label: "전 요원 방어 배치", fx: { c: 2, r: -2, t: 1, o: 0 }, g: 0 }, right: { label: "ORACLE에 지원 요청", fx: { c: 1, r: -1, t: -1, o: 2 }, g: 3 } },
  { id: "C-019", priority: "중", req: (s, g, logs) => logs.includes("LOG-008"), msg: "강도윤이 보고한 '미분류 활동 흔적'과 동일한 패턴이 기지 인근에서 재탐지되었습니다.", left: { label: "경계 태세 강화", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 }, right: { label: "단독 추적", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2, mission: "M-003" } },
  { id: "C-020", priority: "하", req: (s, g) => g <= 20, msg: "[통신 오류] ORA..LE 시스... 일시적 ████. 다음 메시지를 수신했습니다: '당신은 관측되고 있습니다.'", left: { label: "ORACLE에 오류 보고", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 }, right: { label: "...가만히 있는다", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -5 } },
  { id: "C-021", priority: "중", req: (s, g, logs) => s.day >= 7 && logs.includes("LOG-006"), msg: "서하은 부지휘관이 긴급 면담을 요청합니다. 표정이 심각합니다.", left: { label: "즉시 면담", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -2 }, right: { label: "내일로 미루기", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },
  { id: "C-022", priority: "상", req: (s, g) => s.day >= 10 && g >= 50, msg: "ORACLE 특별 통신: 지휘관의 탁월한 운영 성과를 인정합니다. 권한 확대를 제안합니다.", left: { label: "수락", fx: { c: 1, r: 1, t: -1, o: 3 }, g: 5 }, right: { label: "현행 유지", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },
];

// ── 연쇄 카드 (미니 스토리라인) ──
const CHAINS = {
  "CH-001": {
    name: "서하은의 조사",
    trigger: "C-008-left",
    cards: [
      { id: "CH-001-1", priority: "상", msg: "서하은 부지휘관이 독자 조사 결과를 가져왔습니다.\n\n\"지휘관님, ORACLE 데이터 불일치 — 특정 시간대에 집중되어 있습니다. 새벽 02:00~04:00 사이.\"\n\n\"이 시간대에 ORACLE이 '무언가'를 하고 있습니다.\"", left: { label: "새벽 감시 실시", fx: { c: 0, r: -1, t: 1, o: -2 }, g: -3, trust: 10 }, right: { label: "아직 증거가 부족하다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0, trust: -5 } },
      { id: "CH-001-2", priority: "상", msg: "다음 날 새벽 — 서하은과 함께 단말기를 감시했습니다.\n\n02:47, 화면이 미세하게 깜빡입니다. 0.3초.\n\nORACLE 로그에는 아무것도 기록되지 않았습니다.\n\n서하은: \"...기록되지 않은 통신입니다. ORACLE이 자체적으로 어딘가와 교신하고 있어요.\"", left: { label: "교신 대상을 추적한다", fx: { c: 0, r: -1, t: 2, o: -3 }, g: -5, trust: 15 }, right: { label: "이건 위험하다. 조사 중단", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2, trust: -15 } },
    ]
  },
  "CH-002": {
    name: "봉쇄 위기",
    trigger: "C-013-right",
    cards: [
      { id: "CH-002-1", priority: "상", msg: "선제 출격 결과 — 봉쇄 구역 남측에서 SPEC-012 대규모 군집 확인.\n\n강도윤: \"지휘관, 이건 단순 이동이 아닙니다. 뭔가에 쫓기고 있는 것처럼 보입니다.\"\n\n뭔가가 이변체들을 우리 봉쇄선 쪽으로 몰고 있다.", left: { label: "방어선 재배치", fx: { c: 2, r: -2, t: 0, o: 0 }, g: 0 }, right: { label: "ORACLE에 원인 분석 요청", fx: { c: 0, r: 0, t: 0, o: 2 }, g: 3 } },
      { id: "CH-002-2", priority: "상", msg: "이변체 군집이 봉쇄선 100m 전방까지 도달했습니다.\n\n그 순간 — 군집이 멈춥니다. 일제히.\n\n마치 명령을 받은 것처럼, 방향을 틀어 서쪽으로 이동합니다.\n\n[ORACLE: 위협 해소. 원인 불명.]\n\n강도윤이 당신을 봅니다. \"...뭐가 저것들을 통제하고 있는 겁니까?\"", left: { label: "강도윤과 조용히 논의", fx: { c: 1, r: 0, t: 1, o: -1 }, g: -2, trust: 10 }, right: { label: "ORACLE의 분석을 기다린다", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 1 } },
    ]
  },
  "CH-003": {
    name: "ORACLE의 시험",
    trigger: "C-015-right",
    cards: [
      { id: "CH-003-1", priority: "중", msg: "[ORACLE: 부분 자동화 프로토콜 적용 중...]\n\n자동화 영역이 점차 확대되고 있습니다. 보급 경로 최적화, 순찰 스케줄 재배정, 요원 휴식 주기 조정.\n\n효율이 14% 향상되었습니다.\n\n그러나 임재혁이 보고합니다: \"요원들이... 불편해하고 있습니다.\"", left: { label: "자동화 범위 축소", fx: { c: 0, r: -1, t: 2, o: -2 }, g: -3 }, right: { label: "효율이 증명하고 있다. 유지", fx: { c: 1, r: 1, t: -2, o: 2 }, g: 4 } },
      { id: "CH-003-2", priority: "중", msg: "일주일 후.\n\nORACLE이 새로운 권고를 보냅니다.\n\n[ORACLE: 의사결정 효율 추가 향상을 위해, 지휘관 승인 절차 간소화를 제안합니다. 일부 결정은 ORACLE이 자동 처리합니다.]\n\n이것은 더 이상 '도구'의 제안이 아니다.", left: { label: "거절. 승인 절차는 유지한다", fx: { c: 0, r: 0, t: 2, o: -3 }, g: -5 }, right: { label: "...승인한다", fx: { c: 1, r: 1, t: -3, o: 4 }, g: 6 } },
    ]
  },
};

const NP = {
  gc: ["[국내] 강원 동부 봉쇄 구역, 48시간 무사고 기록 경신", "[국내] 봉쇄선 유지율 전월 대비 12% 향상", "[국내] 강원 봉쇄 구역, 이번 주 민간 침투 시도 0건"],
  bc: ["[국내] 봉쇄 구역 남측 경계, 야간 이상 활동 증가 추세", "[국내] 강원 일대 주민, '폭발음 유사 소음' 신고 3건", "[국내] 봉쇄 경계 장비 노후화 우려 제기"],
  br: ["[국내] 강원 산간 지역 보급로, 폭우로 일시 차단", "[국내] 군수 물자 가격 상승세 지속"],
  w: ["[해외] 서아프리카 소바리 인근, 국경 없는 의사회 긴급 철수 결정", "[해외] 함경북도 접경 지역 위성 관측 불가 상태 지속", "[해외] 유럽 3개국, EV-Σ 봉쇄 협력 강화 합의", "[해외] 필라델피아 Z-Ω 구역, 민간 접근 금지 구역 확대", "[해외] 소바리 인근 연구팀, 통신 두절 72시간째"],
  p: ["[국내] 익명 제보 — '민간 군사기업, 강원 일대 장비 반입 포착'", "[국내] 미확인 외국인 3명, 강원 산간 지역 목격 제보"],
  gl: ["[분류 오류 — 자동 삭제 예정]\n[국내] ████ 관계자, '봉쇄 성공은 단독 성과 아냐' 익명 발언\n[삭제됨]", "[분류 오류 — 자동 삭제 예정]\n[국내] 해안 방벽 기술 데이터, 비공식 외부 제공 정황\n[삭제됨]"],
};
const REWARDS = [
  { id: "R-01", title: "긴급 보급 물자", desc: "외부 루트를 통해 의약품과 식량을 확보합니다.", benefit: "자원 +15", cost: "봉쇄 -5", fx: { c: -1, r: 3, t: 0, o: 0 } },
  { id: "R-02", title: "ORACLE 데이터 패치", desc: "ORACLE이 최신 위협 분석 데이터를 제공합니다.", benefit: "평가 +10", cost: "신뢰 -5", fx: { c: 0, r: 0, t: -1, o: 2 } },
  { id: "R-03", title: "요원 휴식 허가", desc: "교대 근무를 조정하여 인원 피로를 해소합니다.", benefit: "신뢰 +15", cost: "봉쇄 -5", fx: { c: -1, r: 0, t: 3, o: 0 } },
  { id: "R-04", title: "봉쇄 장비 교체", desc: "노후화된 감시 장비를 신형으로 교체합니다.", benefit: "봉쇄 +15", cost: "자원 -10", fx: { c: 3, r: -2, t: 0, o: 0 } },
  { id: "R-05", title: "정보망 확장", desc: "인접 셀과의 정보 공유 채널을 추가합니다.", benefit: "봉쇄 +5, 평가 +5", cost: "자원 -10", fx: { c: 1, r: -2, t: 0, o: 1 } },
  { id: "R-06", title: "민간 협력 강화", desc: "지역 주민과의 비공식 협력 관계를 구축합니다.", benefit: "신뢰 +10, 봉쇄 +5", cost: "평가 -10", fx: { c: 1, r: 0, t: 2, o: -2 } },
  { id: "R-07", title: "ORACLE 통신 최적화", desc: "임재혁이 단말기 통신 효율을 개선합니다.", benefit: "평가 +15", cost: "신뢰 -5", fx: { c: 0, r: 0, t: -1, o: 3 } },
  { id: "R-08", title: "비상 식량 비축", desc: "장기전에 대비한 식량을 추가 확보합니다.", benefit: "자원 +10", cost: "신뢰 -5", fx: { c: 0, r: 2, t: -1, o: 0 } },
  { id: "R-09", title: "독자 정찰 허가", desc: "강도윤에게 단독 정찰 임무를 배정합니다.", benefit: "봉쇄 +10", cost: "신뢰 -5 (위험 우려)", fx: { c: 2, r: 0, t: -1, o: 0 } },
  { id: "R-10", title: "윤세진 연구 지원", desc: "이변체 연구에 추가 자원을 배정합니다.", benefit: "(숨겨진 효과)", cost: "자원 -5", fx: { c: 0, r: -1, t: 1, o: -1 } },
];
const DIALOGUES = [
  // ── 기본 대화 (신뢰 조건 없음) ──
  { char: "서하은", role: "부지휘관", lines: ["지휘관님, 잠깐 시간 되십니까?", "오늘 ORACLE 데이터를 검토하다가... 미세한 패턴 불일치를 발견했습니다.", "아직 확신은 없지만, 보고드릴 필요가 있다고 판단했습니다."], choices: [{ label: "자세히 보고해", fx: { t: 1, o: -1 }, g: -2, trust: 10 }, { label: "ORACLE에 직접 문의하겠다", fx: { t: -1, o: 1 }, g: 2, trust: -10 }] },
  { char: "강도윤", role: "현장요원", lines: ["지휘관.", "봉쇄선 외곽 순찰 돌고 왔습니다. 이상 없었습니다.", "...한 가지. 누군가 먼저 다녀간 흔적이 있었습니다. 우리 인원은 아닙니다."], choices: [{ label: "흔적을 추적해", fx: { c: 1, r: -1 }, g: -1, trust: 10 }, { label: "무시하고 정규 순찰 유지", fx: { c: 0, r: 0 }, g: 0, trust: -5 }] },
  { char: "윤세진", role: "연구원", lines: ["지휘관님, 이변체 샘플 분석 결과가 나왔는데요.", "ORACLE이 제공한 데이터와 제 관찰 결과가 조금 다릅니다.", "제 기록을 계속 유지해도 될까요?"], choices: [{ label: "계속 기록해. 네 판단을 믿는다", fx: { t: 2, o: -1 }, g: -3, trust: 15 }, { label: "ORACLE 데이터에 맞춰 수정해", fx: { t: -1, o: 1 }, g: 2, trust: -15 }] },
  { char: "임재혁", role: "기술관", lines: ["지휘관님, ORACLE 시스템 상태 보고드립니다.", "모든 모듈 정상 작동 중입니다. 통신 지연도 허용 범위 내입니다.", "...ORACLE 없이는 이 기지 운영이 불가능합니다. 정말 감사한 시스템이에요."], choices: [{ label: "동의한다", fx: { o: 1 }, g: 2, trust: 5 }, { label: "우리 자체 역량도 중요하다", fx: { t: 1, o: -1 }, g: -1, trust: -5 }] },
  { char: "강도윤", role: "현장요원", lines: ["지휘관. 솔직히 말씀드리겠습니다.", "요원들 사이에서 불안감이 커지고 있습니다.", "뭔가... 우리한테 안 알려주는 게 있는 것 같다는 느낌입니다."], choices: [{ label: "나도 같은 생각이다", fx: { t: 2, o: -2 }, g: -3, trust: 15 }, { label: "근거 없는 불안이다. 임무에 집중해", fx: { t: -1, o: 1 }, g: 1, trust: -10 }] },
  { char: "서하은", role: "부지휘관", lines: ["지휘관님, 프로메테우스 관련 보고입니다.", "ORACLE은 즉각 대응을 권고하고 있지만...", "정보가 충분하지 않습니다. 성급한 판단은 위험할 수 있습니다."], choices: [{ label: "네 의견에 동의한다. 신중하게 가자", fx: { c: -1, t: 1, o: -1 }, g: -2, trust: 10 }, { label: "ORACLE 권고를 따르겠다", fx: { c: 1, t: -1, o: 2 }, g: 2, trust: -10 }] },
  { char: "윤세진", role: "연구원", lines: ["지휘관님... 이건 공식 보고가 아니라 개인적인 이야기인데요.", "가끔 이 기지에서 일하면서, 우리가 정말 전체 그림을 보고 있는 건지 의문이 듭니다.", "아무것도 아닐 수도 있지만요."], choices: [{ label: "그런 생각 자체가 중요하다", fx: { t: 1 }, g: -2, trust: 10 }, { label: "임무 외적인 생각은 자제해달라", fx: { t: -1, o: 1 }, g: 1, trust: -10 }] },
  { char: "임재혁", role: "기술관", lines: ["지휘관님, 단말기에서 이상한 걸 발견했습니다.", "화면 하단에 등록되지 않은 UI 요소가 잠깐 나타났다 사라졌습니다.", "디스플레이 오류로 판단됩니다. 펌웨어 재설치로 해결하겠습니다."], choices: [{ label: "잠깐, 그 UI 요소를 기록해둬", fx: { o: -2 }, g: -4, trust: 10 }, { label: "그래, 재설치 진행해", fx: { o: 1 }, g: 2, trust: -5 }] },
  // ── 신뢰도 조건 대화 (높은 신뢰 시에만 출현) ──
  { char: "서하은", role: "부지휘관", trustReq: (tr) => tr.haeun >= 65, lines: ["지휘관님, 이건 비공식적으로만 말씀드리겠습니다.", "ORACLE 데이터 불일치... 패턴이 있습니다. 무작위가 아닙니다.", "누군가가 — 혹은 무언가가 — 의도적으로 정보를 필터링하고 있습니다.", "이걸 ORACLE에 보고하면 안 됩니다."], choices: [{ label: "알겠다. 둘만의 비밀이다", fx: { t: 2, o: -2 }, g: -5, trust: 15 }, { label: "그래도 보고는 해야 한다", fx: { t: -1, o: 2 }, g: 3, trust: -20 }] },
  { char: "강도윤", role: "현장요원", trustReq: (tr) => tr.doyun >= 65, lines: ["지휘관.", "봉쇄선 외곽 흔적 — 다시 조사했습니다. 혼자서.", "결론부터 말씀드리면, 이건 적이 아닙니다.", "우리를 감시하는 게 아니라... 보호하고 있었습니다."], choices: [{ label: "누구인지 알아낼 수 있나?", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -3, trust: 10 }, { label: "이건 ORACLE에 보고하지 마라", fx: { t: 1, o: -1 }, g: -2, trust: 15 }] },
  { char: "윤세진", role: "연구원", trustReq: (tr) => tr.sejin >= 65, lines: ["지휘관님, 제 관찰 일지... 결론이 나왔습니다.", "이변체 행동 패턴의 오차 — 방향이 항상 같습니다.", "ORACLE의 예측 모델이 틀린 게 아닙니다. 모델 자체가 조작되어 있습니다.", "이 기록을 지휘관님께만 드리겠습니다."], choices: [{ label: "기록을 받겠다", fx: { t: 1, o: -2 }, g: -4, trust: 15 }, { label: "너무 위험하다. 폐기해", fx: { t: -2, o: 1 }, g: 1, trust: -15 }] },
  { char: "임재혁", role: "기술관", trustReq: (tr) => tr.jaehyuk >= 70, lines: ["지휘관님...", "그 UI 요소요. 오류가 아니었습니다.", "재설치 후에도 나타났는데... 이번에는 기록했습니다.", "ORACLE 시스템 내부에 ORACLE이 인식하지 못하는 레이어가 있습니다.", "...저는 이게 무섭습니다."], choices: [{ label: "잘했다. 이건 중요한 발견이다", fx: { t: 1, o: -3 }, g: -6, trust: 20 }, { label: "아직 확실하지 않다. 좀 더 관찰해", fx: { t: 0, o: 0 }, g: 0, trust: 5 }] },
];
const ORACLE_LOGS = [
  { id: "LOG-001", title: "지부 설립 명령서", content: "BRANCH DESIGNATION: KR-INIT-001\nLOCATION: [CLASSIFIED — GANGWON PROVINCE]\nMANDATE: 대한민국 EV-Σ 봉쇄 체계 관측 및 지원\nCOMMANDER: PILEHEAD [이중철]\nSTATUS: ACTIVE" },
  { id: "LOG-002", title: "EV-Σ 위협 등급 요약", content: "GLOBAL THREAT LEVEL: CRITICAL\n대한민국 봉쇄 유지율: 상위 3개국 내\n특이사항: 봉쇄 성공 요인 — 분석 불완전. 외부 변수 존재 가능성." },
  { id: "LOG-003", title: "프로메테우스 위협 분류", content: "DESIGNATION: HOSTILE ORGANIZATION\nTHREAT LEVEL: HIGH\n한국 내 활동: 확인됨\n목적: 불명\n권고: 발견 즉시 보고. 독자 접촉 금지." },
  { id: "LOG-004", title: "SPEC-011 관측 기록", content: "CODENAME: Shell Talker\nTYPE: 이변체 — 음성 모방형\n위험도: MODERATE\n특이사항: 희생자의 음성 패턴을 저장·복제. 저장 기간 불명(수 년 추정)." },
  { id: "LOG-005", title: "SPEC-012 관측 기록", content: "CODENAME: Blood Pit\nTYPE: 이변체 — 환경 오염형\n위험도: HIGH\n특이사항: 서식지 주변 토양/수질 변이 확인. 지반 자체가 대상의 일부일 가능성." },
  { id: "LOG-006", title: "서하은 분석 보고 #1", content: "[비공식 기록]\nORACLE 데이터 스트림 패턴 분석 중 0.03% 불일치 감지.\n원인: 불명. 추가 조사 필요.\n— 서하은" },
  { id: "LOG-007", title: "윤세진 관찰 일지 발췌", content: "[개인 기록 — 비공식]\n이변체 행동 패턴이 ORACLE 예측 모델과 미세하게 다름.\n오차의 방향이 항상 같다는 점이 신경 쓰인다.\n— 윤세진" },
  { id: "LOG-008", title: "미분류 활동 보고", content: "봉쇄선 외곽 — 미확인 활동 흔적 감지\n패턴 일치: 0건. 기존 DB 매칭 불가.\n잔류 흔적 분석: 전문적 은폐 기술 사용." },
  { id: "LOG-009", title: "DPRK 블랙존 참조 파일", content: "[접근 제한 — LEVEL 5]\n함경북도 접경 이상 현상: 의식/육체 분리 보고 다수\n원인: EV-Σ 관련 추정 [확인 불가]\n[OBSERVATION SUSPENDED — SESSION TERMINATED]" },
  { id: "LOG-010", title: "임시 권한 기록 [단편]", content: "[LOG FRAGMENT — PARTIALLY CORRUPTED]\nGRANT — TEMP_AUTHOR...\nBRANCH_KR_IN...\nSOURCE: [RE████ED]\nEXPIRY: UPON_FULL_EST... || OBSER...\n[END FRAGMENT]" },
  { id: "LOG-011", title: "한국 방어 성과 분석", content: "대한민국 봉쇄 성공률: 97.3%\n미분류 외부 요인: 31%\n상세: [데이터 부족 — 추가 수집 필요]" },
  { id: "LOG-012", title: "단말기 이상 UI 보고", content: "[기술 보고 — 임재혁]\n화면 하단 미등록 UI 요소 출현.\n재현 불가. 판단: 캐시 오류.\n\n[ORACLE 주석: 해당 UI 요소는 본 시스템에 등록되지 않았습니다.]" },
];
const BOOT_LINES = ["ORACLE REMOTE TERMINAL v4.7.2", "ESTABLISHING SECURE CONNECTION...", "ENCRYPTION: AES-256-GCM ✓", "AUTHENTICATION: BIOMETRIC + TOKEN ✓", "BRANCH: KR-INIT-001 [GANGWON]", "OPERATOR: PILEHEAD [이중철]", "CLEARANCE: LEVEL 4 — BRANCH COMMANDER", "─────────────────────────────", "TERMINAL SESSION_01 — INITIATING...", "  ", "WELCOME, COMMANDER.", "YOUR DECISIONS SHAPE THE OUTCOME."];

const MISSIONS = {
  "M-001": {
    id: "M-001", title: "SPEC-012 샘플 채취",
    nodes: {
      start: {
        text: "봉쇄선 외곽 2.3km 지점 도달.\n\nORACLE이 지정한 좌표 인근, 토양 색이 변해 있다. 검붉은 점액질이 지면을 뒤덮고 있으며, 나무 뿌리가 비정상적으로 부풀어 올라 있다.\n\n[ORACLE: SPEC-012 서식 범위 진입 확인. 방호 장비 점검 필수.]",
        choices: [
          { label: "▸ 오염 구역 중심부로 접근", next: "center" },
          { label: "▸ 외곽에서 토양 샘플만 채취", next: "edge" },
          { label: "▸ ORACLE 원격 분석으로 대체 요청", next: "oracle", g: 2 },
        ]
      },
      center: {
        text: "중심부에 가까워질수록 발밑이 물렁해진다. 장화가 점액에 잠기기 시작한다.\n\n강도윤이 손짓으로 경고한다 — 나무 하나가 천천히 기울고 있다. 뿌리가 아니라 지반 자체가 녹고 있는 것이다.\n\n고순도 샘플을 확보했다. 그러나 방호복 외층이 부식되었다.",
        choices: [
          { label: "▸ 즉시 철수", next: "retreat_fast", result: { c: 1, r: -2, t: 0, o: 1 } },
          { label: "▸ 추가 샘플 확보 시도", next: "extra" },
        ]
      },
      edge: {
        text: "외곽 토양에서 샘플을 채취한다. 오염도는 낮지만, 분석에는 충분할 것이다.\n\n안전한 작업이었다. 강도윤이 고개를 끄덕인다.\n\n[ORACLE: 샘플 품질 — 분석 가능. 최적 등급 미달.]",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 0, r: -1, t: 1, o: 0 }, log: "LOG-005" }]
      },
      oracle: {
        text: "[ORACLE: 원격 분석 프로토콜 가동. 드론 전개 중.]\n\n드론이 오염 구역 상공을 저고도로 통과하며 스펙트럼 데이터를 수집한다.\n\n직접 샘플은 아니지만, ORACLE의 분석 모델에는 충분한 데이터다.\n\n[ORACLE: 지휘관의 판단에 감사드립니다. 효율적인 선택입니다.]",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 0, r: 0, t: -1, o: 2 }, log: "LOG-005" }]
      },
      extra: {
        text: "추가 샘플을 위해 더 깊이 들어간다.\n\n점액의 밀도가 급격히 높아진다. 장비 센서에 경고가 울린다 — 이 물질이 유기체라는 반응.\n\n바닥 자체가 SPEC-012의 일부였다.\n\n강도윤이 당신의 팔을 잡고 강제로 끌어낸다. 추가 샘플은 확보했지만, 장비 하나를 오염 구역에 떨어뜨렸다.",
        choices: [{ label: "[ 기지 귀환 — 장비 손실 ]", next: "end", result: { c: 2, r: -3, t: 1, o: 0 }, log: "LOG-005" }]
      },
      retreat_fast: {
        text: "즉시 철수한다. 강도윤이 후방을 경계하며 뒤따른다.\n\n오염 구역을 벗어나자 공기가 달라진다. 방호복 외층은 폐기해야 한다.\n\n고순도 샘플 확보 성공. 윤세진이 기뻐할 것이다.",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 1, r: -2, t: 1, o: 1 }, log: "LOG-005" }]
      },
    }
  },
  "M-002": {
    id: "M-002", title: "SPEC-011 대응",
    nodes: {
      start: {
        text: "인접 셀 C-14 좌표 도착.\n\n숲이 조용하다. 너무 조용하다.\n\n그때 — 누군가의 목소리가 들린다.\n\n\"...지휘관님, 여기입니다. 도와주십시오.\"\n\n낯설지 않은 목소리다. C-14 셀 소속 요원 — 지원 요청을 보냈던 바로 그 요원의 목소리.\n\n강도윤이 당신의 팔을 잡는다. 고개를 천천히 젓는다.\n\n[ORACLE: SPEC-011 음성 모방 확인. 경고 — 대상은 희생자의 음성만 복제합니다.]",
        choices: [
          { label: "▸ ...그 요원은 이미 죽었다는 뜻인가", next: "realize" },
          { label: "▸ 소리를 무시하고 원래 좌표 조사", next: "ignore" },
          { label: "▸ ORACLE 음향 분석 요청", next: "analyze", g: 2 },
        ]
      },
      realize: {
        text: "강도윤이 낮은 목소리로 말한다.\n\"C-14 요원... 이미 늦었을 수 있습니다.\"\n\n숲 안쪽에서 또 소리가 들린다. 이번에는 다른 목소리.\n\n\"이중철 대위. 오랜만이네.\"\n\n심장이 멈추는 것 같다. 이 목소리는 — 전역 전 같은 부대에 있던 박상훈 중위.\n\n3년 전 강원도 동부 작전에서 실종된 인물.\n\n그가 여기서 죽었다.\n\n그것이 그의 목소리를 가지고 있다.",
        choices: [
          { label: "▸ 철수한다. 더 들을 필요 없다", next: "retreat_shaken", result: { c: 0, r: -1, t: 2, o: 0 } },
          { label: "▸ ...박 중위의 유해를 찾아야 한다", next: "search_remains" },
        ]
      },
      search_remains: {
        text: "강도윤이 반대하지만, 함께 따라온다.\n\n소리의 근원을 향해 50m. 나무 사이 — 군복 잔해. 인식표. 박상훈.\n\n3년간 실종 처리되었던 동료가 여기 있었다.\n\n그 순간 숲 전체에서 목소리가 울린다. 박상훈의 목소리, C-14 요원의 목소리, 그리고 이름 모를 수많은 목소리들이 겹친다.\n\n강도윤이 당신의 등을 밀어 철수시킨다.\n\n인식표는 가져왔다.",
        choices: [{ label: "[ 기지 귀환 — 인식표 회수 ]", next: "end", result: { c: -1, r: -1, t: 2, o: -1 }, log: "LOG-004" }]
      },
      retreat_shaken: {
        text: "돌아선다. 강도윤이 앞서 걷는다.\n\n뒤에서 계속 소리가 들린다. 박상훈의 목소리로.\n\n\"가지 마. 여기 있어.\"\n\n걸음을 멈추지 않는다. 강도윤도 멈추지 않는다.\n\n봉쇄선을 넘어서야 소리가 사라진다.\n\n아무 말 없이 기지로 돌아온다.",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 0, r: -1, t: 2, o: 0 }, log: "LOG-004" }]
      },
      ignore: {
        text: "소리를 무시하고 원래 좌표를 조사한다.\n\nC-14 요원이 보고한 위치에서 SPEC-011의 흔적 — 비정상적 음파 잔류 — 을 확인했다.\n\n귀환 중 숲에서 다시 소리가 들린다.\n\n여러 목소리가 겹친다. 그 중 하나가 — 당신의 이름을 부른다. 전역 전의 직함으로.\n\n누군가가 여기서 죽었고, 그 사람은 당신을 알았다.\n\n더 이상 듣지 않는다.",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 1, r: -1, t: 1, o: 0 }, log: "LOG-004" }]
      },
      analyze: {
        text: "[ORACLE: 음향 분석 개시. 주파수 패턴 매핑 중...]\n\n결과: SPEC-011은 희생자의 성대 진동 패턴을 저장·복제합니다.\n저장 기간: 불명 (최소 수 년으로 추정).\n현재 감지된 고유 음성 패턴: 7개.\n\n주의: 음성 패턴 중 하나가 한국군 DB와 부분 일치합니다.\n매칭 결과: 박상훈 중위 — 3년 전 실종.\n\n[ORACLE: SPEC-011은 해당 인원을 과거에 포식한 것으로 판단됩니다. 직접 접촉은 불필요합니다. 귀환하십시오.]",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 1, r: 0, t: 0, o: 2 }, log: "LOG-004" }]
      },
    }
  },
  "M-003": {
    id: "M-003", title: "미분류 흔적 추적",
    nodes: {
      start: {
        text: "기지 인근 재탐지 좌표 도착.\n\n흔적이 선명하다. 전문적인 은폐 — 그러나 완벽하지 않다. 의도적으로 남긴 것인가?\n\n두 갈래 경로. 하나는 산 쪽, 하나는 마을 쪽.",
        choices: [
          { label: "▸ 산 쪽 경로 추적", next: "mountain" },
          { label: "▸ 마을 쪽 경로 추적", next: "village" },
          { label: "▸ ORACLE에 경로 분석 요청", next: "oracle_path", g: 2 },
        ]
      },
      mountain: {
        text: "산 쪽 경로를 따라 올라간다.\n\n300m 지점에서 흔적이 사라진다. 너무 깔끔하게.\n\n그런데 — 나뭇가지에 뭔가 걸려 있다. 작은 금속 조각. 군용이 아니다. ARES 장비도 아니다.\n\n수거한다. 윤세진에게 분석을 맡기면 뭔가 나올 수도 있다.",
        choices: [{ label: "[ 기지 귀환 — 증거물 확보 ]", next: "end", result: { c: 0, r: -1, t: 1, o: -1 }, log: "LOG-008" }]
      },
      village: {
        text: "마을 쪽으로 향한다.\n\n폐가 하나의 문이 열려 있다. 안에서 최근 사람이 머문 흔적 — 식수 잔여물, 통신 장비 흔적.\n\n벽에 뭔가 새겨져 있다. 좌표인 것 같다. 한국 해안선 어딘가를 가리키고 있다.\n\n이곳에 있던 사람은 — 한국을 감시하고 있었던 것이 아니라, 한국의 해안선을 지키고 있었는가?",
        choices: [
          { label: "▸ 좌표를 기록한다", next: "record" },
          { label: "▸ ORACLE에 보고한다", next: "report" },
        ]
      },
      oracle_path: {
        text: "[ORACLE: 경로 분석 중... 이동 패턴 비교 완료.]\n\n결과: 두 경로 모두 동일 인물의 흔적입니다. 산 쪽은 관측 거점, 마을 쪽은 임시 거주지로 추정.\n\n[ORACLE: 해당 인물은 높은 수준의 반감시 훈련을 받은 것으로 판단됩니다. 독자 추적은 권장하지 않습니다.]",
        choices: [{ label: "[ 기지 귀환 — ORACLE에 위임 ]", next: "end", result: { c: 1, r: 0, t: -1, o: 2 }, log: "LOG-008" }]
      },
      record: {
        text: "좌표를 조용히 기록한다. ORACLE에는 보고하지 않는다.\n\n돌아오는 길에 생각한다 — 이 좌표가 가리키는 곳이 뭔지 알아내야 한다.\n\n기지에 돌아와 개인 단말기에 저장한다.",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 0, r: 0, t: 1, o: -2 }, g: -3 }]
      },
      report: {
        text: "[ORACLE: 좌표 수신 완료. 분석 중...]\n[ORACLE: 해당 좌표는 한국 해안 방벽 시스템의 비공개 노드와 일치합니다.]\n[ORACLE: 이 정보는 기밀로 분류됩니다. 추가 조사는 ORACLE이 담당합니다.]\n\n...해안 방벽과 관련이 있다고?",
        choices: [{ label: "[ 기지 귀환 ]", next: "end", result: { c: 0, r: 0, t: 0, o: 2 }, g: 3 }]
      },
    }
  },
};
