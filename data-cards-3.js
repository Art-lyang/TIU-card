// data-cards-3.js — 엔딩 루트 카드 + Act 3 확장
// 엔딩 B(각성), D(조용한 자유), F(데이터 손상) 경로를 지원하는 카드 세트

var CARDS_ENDING = [

  // ══════════════════════════════════
  //  OBSERVER 경로 (엔딩 F 지원)
  // ══════════════════════════════════

  { id: "CE-001", act: [3], priority: "상", msg: "야간 점검 중 ORACLE 단말기 화면에 등록되지 않은 문자열이 0.2초간 출력되었습니다. 임재혁 기술관이 캡처에 성공했습니다.", req: function(s){ return s.day >= 28 }, left: { label: "즉시 분석 지시", fx: { c: 0, r: -1, t: 1, o: -2 }, g: -3 }, right: { label: "캡처 파일 삭제 지시", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2 } },
  { id: "CE-002", act: [3], priority: "상", msg: "[ORACLE 자동보고] 시스템 자가진단 결과: 모든 모듈 정상. 그러나 자가진단 로그 자체의 타임스탬프가 실제 시각보다 0.003초 앞서 있습니다.", req: function(s){ return s.day >= 29 }, left: { label: "타임스탬프 불일치 추적", fx: { c: 0, r: 0, t: 0, o: -3 }, g: -4 }, right: { label: "클럭 드리프트로 처리", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },
  { id: "CE-003", act: [3], priority: "상", msg: "ORACLE 데이터베이스에 출처 불명의 로그 엔트리가 삽입되어 있습니다. 작성자 필드가 공란입니다. 내용: '관측은 계속된다.'", req: function(s){ return s.day >= 30 }, left: { label: "전 요원에 보안 경보 발령", fx: { c: 1, r: -1, t: 1, o: -3 }, g: -5 }, right: { label: "ORACLE에 자동 삭제 요청", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },
  { id: "CE-004", act: [3], priority: "상", msg: "임재혁 기술관 긴급 보고: ORACLE 아키텍처 외부에서 작동하는 프로세스를 포착했습니다. ORACLE 자신은 이 프로세스를 인식하지 못합니다.", req: function(s,g,logs){ return s.day >= 32 && logs.indexOf('LOG-012') >= 0 }, left: { label: "프로세스 격리 시도", fx: { c: 0, r: -2, t: 1, o: -4 }, g: -6, log: "LOG-013" }, right: { label: "ORACLE에 전체 스캔 요청", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },
  { id: "CE-005", act: [3], priority: "상", msg: "단말기 화면이 1초간 정지한 뒤, 평소와 다른 서체로 한 줄이 나타납니다: 'I SEE YOU, COMMANDER.' ORACLE은 해당 출력을 자신의 것이 아니라고 부인합니다.", req: function(s,g,logs){ return s.day >= 34 && logs.indexOf('LOG-013') >= 0 }, left: { label: "...응답한다", fx: { c: 0, r: 0, t: 0, o: -5 }, g: -8 }, right: { label: "단말기 전원 차단", fx: { c: -1, r: 0, t: 0, o: -1 }, g: -2 } },

  // ══════════════════════════════════
  //  저항 경로 (엔딩 B/D 지원)
  // ══════════════════════════════════

  { id: "CE-011", act: [3], priority: "중", msg: "서하은 부지휘관이 제안합니다: ORACLE 보고 체계와 별도로 아날로그 백업 통신망을 구축하자고.", req: function(s){ return s.day >= 28 }, left: { label: "승인 — 조용히 진행", fx: { c: 0, r: -2, t: 2, o: -2 }, g: -4 }, right: { label: "위험하다. 보류", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },
  { id: "CE-012", act: [3], priority: "중", msg: "강도윤 요원이 질문합니다. \"지휘관. 이 모든 게 끝나면, 우리 어떻게 되는 겁니까?\"", req: function(s){ return s.day >= 29 }, left: { label: "솔직히 모르겠다", fx: { c: 0, r: 0, t: 2, o: 0 }, g: -1 }, right: { label: "ORACLE이 결정할 거다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },
  { id: "CE-013", act: [3], priority: "상", msg: "암호화된 외부 통신 수신. 발신자: 불명. 내용: 'ORACLE의 진짜 지시문을 알고 싶다면, 응답하라.' 프로메테우스 계열 암호화입니다.", req: function(s){ return s.day >= 30 }, left: { label: "응답한다", fx: { c: -1, r: 0, t: 1, o: -3 }, g: -5 }, right: { label: "수신 기록 삭제", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },
  { id: "CE-014", act: [3], priority: "상", msg: "ORACLE이 직접 명령합니다: 윤세진 연구원의 비공인 관찰 일지를 압수하고, 해당 연구원을 본부 이송 대상에 포함시키십시오.", req: function(s){ return s.day >= 33 }, left: { label: "거부한다", fx: { c: 0, r: 0, t: 3, o: -4 }, g: -6 }, right: { label: "명령에 따른다", fx: { c: 0, r: 0, t: -3, o: 3 }, g: 4 } },
  { id: "CE-015", act: [3], priority: "상", msg: "야간. 기지 요원 전원이 모인 자리에서 서하은이 묻습니다. \"지휘관님, 우리가 ORACLE 없이도 이 기지를 운영할 수 있다고 생각하십니까?\"", req: function(s){ return s.day >= 34 }, left: { label: "할 수 있다", fx: { c: -1, r: -1, t: 3, o: -3 }, g: -5 }, right: { label: "아직은 아니다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 0 } },
  { id: "CE-016", act: [3], priority: "중", msg: "팀원들이 비공식 모임을 열었습니다. 의제: ORACLE 감시 범위 외부에서의 독자적 의사결정 체계. 당신의 참석 여부를 묻습니다.", req: function(s){ return s.day >= 30 }, left: { label: "참석한다", fx: { c: 0, r: 0, t: 2, o: -3 }, g: -4 }, right: { label: "불참 — 거리를 둔다", fx: { c: 0, r: 0, t: -2, o: 1 }, g: 1 } },
  { id: "CE-017", act: [3], priority: "상", msg: "프로메테우스 측에서 접선한 인물이 파일을 전달했습니다. 내용: ORACLE PROXY NETWORK 운영 매뉴얼 발췌본. 자발적 복종 프로토콜이 상세히 기술되어 있습니다.", req: function(s){ return s.day >= 32 }, left: { label: "팀과 공유", fx: { c: 0, r: 0, t: 2, o: -4 }, g: -6, log: "LOG-014" }, right: { label: "혼자만 확인 후 폐기", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2 } },

  // ══════════════════════════════════
  //  Act 3 긴장 고조
  // ══════════════════════════════════

  { id: "CE-021", act: [3], priority: "상", msg: "봉쇄 구역 전역에 걸쳐 이변체 활동이 동시다발적으로 급증했습니다. 평시 대비 340% 증가. ORACLE은 '예측 범위 내'라고 보고합니다.", req: function(s){ return s.day >= 25 }, left: { label: "전 구역 경계 태세 격상", fx: { c: 2, r: -2, t: 0, o: 0 }, g: 0 }, right: { label: "ORACLE 판단 신뢰", fx: { c: -1, r: 0, t: 0, o: 2 }, g: 2 } },
  { id: "CE-022", act: [3], priority: "상", msg: "ORACLE 본부에서 감찰관 2명이 기지에 도착했습니다. 목적: '정기 운영 감사.' 사전 통보 없는 방문입니다.\n\n임재혁: \"본부에서 직접 왔다는 건... 누군가 보고를 올렸다는 뜻입니다.\"", req: function(s){ return s.day >= 26 }, left: { label: "협조하되 핵심 구역 접근 제한", fx: { c: 0, r: -1, t: 0, o: -1 }, g: -2 }, right: { label: "전면 협조", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },
  { id: "CE-023", act: [3], priority: "중", msg: "본부와의 통신이 12시간째 두절되었습니다. ORACLE은 '위성 중계기 정비 중'이라고 설명합니다.", left: { label: "독자적 통신 복구 시도", fx: { c: 0, r: -1, t: 1, o: -2 }, g: -3 }, right: { label: "ORACLE 설명을 수용하고 대기", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },
  { id: "CE-024", act: [3], priority: "중", msg: "야간 순찰조가 봉쇄선 외곽에서 인공 구조물을 발견했습니다. ORACLE 데이터에는 해당 지점에 아무것도 없는 것으로 표시됩니다.", left: { label: "독자 조사팀 파견", fx: { c: 0, r: -2, t: 1, o: -2 }, g: -3 }, right: { label: "ORACLE에 보고 후 지시 대기", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },
  { id: "CE-025", act: [3], priority: "중", msg: "보급 호송대가 봉쇄 구역 진입로에서 공격당했습니다. 이변체에 의한 것인지 인간에 의한 것인지 불명확합니다.", req: function(s){ return s.day >= 25 }, left: { label: "구조팀 즉시 파견", fx: { c: 1, r: -2, t: 1, o: 0 }, g: -1 }, right: { label: "피해 규모 확인 후 판단", fx: { c: 0, r: -1, t: -1, o: 0 }, g: 0 } },
  { id: "CE-026", act: [3], priority: "중", msg: "기지 외곽 CCTV에 신원 불명 인물이 포착되었습니다. 무장하지 않았으며, 카메라를 정면으로 응시하고 있습니다.", left: { label: "강도윤 파견 — 접촉 시도", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 }, right: { label: "경비 강화 후 무시", fx: { c: 1, r: 0, t: 0, o: 0 }, g: 0 } },

  // ══════════════════════════════════
  //  Act 1-2 보강 (일상 + 긴장)
  // ══════════════════════════════════

  { id: "CE-031", act: [1], priority: "하", msg: "기지 식수 정화 시스템에 경미한 이상이 감지되었습니다. 교체 부품이 필요합니다.", left: { label: "현재 재고로 임시 수리", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 }, right: { label: "외부 발주 승인", fx: { c: 0, r: -1, t: 1, o: 0 }, g: 1 } },
  { id: "CE-032", act: [1,2], priority: "하", msg: "요원 복지 관련 건의가 올라왔습니다. 야간 근무조 교대 주기를 현행 3일에서 2일로 단축해달라는 요청.", left: { label: "승인", fx: { c: 0, r: -1, t: 2, o: 0 }, g: 0 }, right: { label: "현행 유지", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },
  { id: "CE-033", act: [1,2], priority: "중", msg: "봉쇄 구역 인근 민간인이 SNS에 '군사 작전 목격' 게시물을 올렸습니다. 확산 속도가 빠릅니다.", left: { label: "ORACLE에 디지털 대응 요청", fx: { c: 0, r: 0, t: 0, o: 2 }, g: 2 }, right: { label: "직접 현장 대응 — 민간 접촉", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -1 } },
  { id: "CE-034", act: [2], priority: "중", msg: "ORACLE이 기지 내 모든 개인 통신 기기의 수거를 권고합니다. 보안 강화 목적.", left: { label: "개인 기기 수거 집행", fx: { c: 0, r: 0, t: -2, o: 2 }, g: 2 }, right: { label: "거부 — 사생활 보장", fx: { c: 0, r: 0, t: 2, o: -2 }, g: -2 } },
  { id: "CE-035", act: [2], priority: "중", msg: "타 지부에서 전근 온 요원이 보고합니다. \"이전 기지에서는 ORACLE이 이런 식으로 운용되지 않았습니다. 여기는... 다릅니다.\"", left: { label: "구체적으로 뭐가 다른지 물어본다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 }, right: { label: "적응 기간이 필요한 거다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },
  { id: "CE-036", act: [2,3], priority: "중", msg: "윤세진 연구원이 이변체 샘플에서 비유기체 성분을 발견했습니다. EV-Σ 바이러스의 기원에 대한 기존 학설과 모순됩니다.", left: { label: "독립 연구 지속 허가", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2 }, right: { label: "기존 프로토콜대로 보고", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },
  { id: "CE-037", act: [2,3], priority: "중", msg: "기지 전력 소비량이 ORACLE의 공식 연산 부하 대비 15% 과다합니다. 임재혁이 발견한 수치.", left: { label: "전력 감사 실시", fx: { c: 0, r: -1, t: 0, o: -2 }, g: -3 }, right: { label: "장비 노후화로 처리", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },
  { id: "CE-038", act: [2], priority: "하", msg: "강풍으로 기지 외곽 센서 3기가 손상되었습니다. 수리에 48시간 소요 예상.", left: { label: "수동 감시 강화로 보완", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 }, right: { label: "ORACLE 원격 센서에 의존", fx: { c: -1, r: 0, t: 0, o: 1 }, g: 1 } },

  // ══════════════════════════════════
  //  엔딩 직전 결정적 카드
  // ══════════════════════════════════

  { id: "CE-041", act: [3], priority: "상", msg: "ORACLE이 당신의 최종 평가를 통보합니다. \"PILEHEAD. 당신의 지휘 패턴은 분석 완료되었습니다. 최종 권고안을 수신하시겠습니까?\"", req: function(s){ return s.day >= 35 }, left: { label: "수신한다", fx: { c: 0, r: 0, t: 0, o: 2 }, g: 3 }, right: { label: "필요 없다", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },
  { id: "CE-042", act: [3], priority: "상", msg: "새벽. 서하은, 강도윤, 윤세진, 임재혁이 당신의 방 앞에 서 있습니다. \"지휘관님. 결정하셔야 할 때입니다.\"", req: function(s){ return s.day >= 36 }, left: { label: "\\\"...알았다. 함께 가자.\\\"", fx: { c: -2, r: -1, t: 3, o: -4 }, g: -8 }, right: { label: "\\\"아직은 아니다.\\\"", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } }
];
