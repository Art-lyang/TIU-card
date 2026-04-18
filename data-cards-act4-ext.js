// data-cards-act4-ext.js — Act 4 일반 카드 (루트 무관, 태그 기반 반복 출현)
// 데일리 필러 / 인물 관계 / 봉쇄 위기 / 외부 / ORACLE 분기 총 20장
// 분리 이유: data-cards-act4.js 200줄 룰 유지

var CARDS_ACT4_EXT = [

  // ─── 데일리 필러 (endgame-daily) × 6 ───
  { id:"CA4-FL-01", act:[4], tag:"endgame-daily", priority:"하",
    msg:"종결기 식량 재고 점검 보고.\n\n\"배급 주기를 조정하지 않으면 일주일 이내 부족합니다.\"\n\n현장 요원 사기에 직접 영향을 미칩니다.",
    left:{ label:"배급제 강화", fx:{c:0,r:1,t:-1,o:0}, g:0 },
    right:{ label:"외부 보급 요청", fx:{c:0,r:2,t:0,o:-1}, g:-1 } },

  { id:"CA4-FL-02", act:[4], tag:"endgame-daily", priority:"하",
    msg:"외곽 순찰조 복귀 보고.\n\n\"이상 징후는 없었습니다. 다만 봉쇄선 바깥이 — 너무 조용합니다.\"\n\n평온인지, 폭풍 전인지.",
    left:{ label:"경계 태세 유지", fx:{c:1,r:-1,t:0,o:0}, g:0 },
    right:{ label:"정찰 범위 축소", fx:{c:-1,r:1,t:0,o:0}, g:0 } },

  { id:"CA4-FL-03", act:[4], tag:"endgame-daily", priority:"하",
    msg:"통신 장비 자가진단 — 오류 3건 감지.\n\n임재혁: \"외부 간섭 패턴입니다. 물리적 고장은 아닙니다.\"\n\n누군가 청취하고 있을 수도.",
    left:{ label:"즉시 암호 키 교체", fx:{c:0,r:-1,t:0,o:1}, g:1 },
    right:{ label:"역추적 시도", fx:{c:0,r:-1,t:1,o:-1}, g:-2 } },

  { id:"CA4-FL-04", act:[4], tag:"endgame-daily", priority:"하",
    msg:"발전기 2호 출력 저하.\n\n\"부품이 닳고 있습니다. 교체부가 없습니다. 우리는 더 이상 보급받지 못합니다.\"\n\n절약할지, 여유를 쓸지.",
    left:{ label:"비필수 구역 절전", fx:{c:-1,r:1,t:-1,o:0}, g:0 },
    right:{ label:"연료 예비분 투입", fx:{c:0,r:-2,t:1,o:0}, g:0 } },

  { id:"CA4-FL-05", act:[4], tag:"endgame-daily", priority:"하",
    msg:"의무실 보고.\n\n윤세진: \"장기 스트레스 반응이 임계치입니다. 요원 4명에게 진정제가 필요합니다. 재고는 5회분뿐입니다.\"\n\n처방할지, 아낄지.",
    left:{ label:"처방한다", fx:{c:0,r:-1,t:2,o:0}, g:0 },
    right:{ label:"대체 요법으로", fx:{c:0,r:0,t:-1,o:0}, g:0 } },

  { id:"CA4-FL-06", act:[4], tag:"endgame-daily", priority:"하",
    msg:"교대 순환표 조정 요청.\n\n강도윤: \"일부 요원은 열흘 이상 연속 근무 중입니다. 한계입니다.\"\n\n효율과 건강 사이.",
    left:{ label:"강제 휴무 지정", fx:{c:-1,r:0,t:2,o:-1}, g:-1 },
    right:{ label:"현행 유지 — 임무 우선", fx:{c:1,r:0,t:-2,o:1}, g:1 } },

  // ─── 인물 관계 (endgame-char) × 4 ───
  { id:"CA4-CH-01", act:[4], tag:"endgame-char", priority:"중",
    msg:"서하은이 늦은 밤 지휘관실을 찾아옵니다.\n\n\"...며칠만 시간을 주시면 안 될까요. 분석 결과를 정리하고 싶습니다. 제 방식으로.\"\n\n지친 얼굴. 하지만 눈빛은 선명합니다.",
    left:{ label:"원하는 만큼 시간을 써라", fx:{c:0,r:0,t:1,o:-1}, g:-2, trust:8 },
    right:{ label:"보고서는 ORACLE 형식으로", fx:{c:0,r:0,t:-1,o:1}, g:1, trust:-8 } },

  { id:"CA4-CH-02", act:[4], tag:"endgame-char", priority:"중",
    msg:"강도윤이 현장 복귀를 공식 요청합니다.\n\n\"지휘관. 이 방 안에서 지도만 보는 건 제 일이 아닙니다. 마지막이 될지도 모릅니다 — 제 방식으로 끝내고 싶습니다.\"",
    left:{ label:"복귀 승인", fx:{c:1,r:-1,t:1,o:-1}, g:-2, trust:10 },
    right:{ label:"지휘소 유지 명령", fx:{c:0,r:0,t:-1,o:1}, g:2, trust:-10 } },

  { id:"CA4-CH-03", act:[4], tag:"endgame-char", priority:"중",
    msg:"윤세진이 연구실에서 밤을 새우고 있습니다.\n\n\"표본 마지막 반응이에요. EV-Σ의 진짜 행동 메커니즘 — 지금 아니면 기록 못 해요.\"\n\n그녀의 결론은 곧 세상에 남을 유일한 기록일지도.",
    left:{ label:"연구를 끝까지 지원한다", fx:{c:0,r:-1,t:1,o:-1}, g:-2, trust:8 },
    right:{ label:"데이터만 수집 후 철수", fx:{c:0,r:0,t:-1,o:1}, g:1, trust:-5 } },

  { id:"CA4-CH-04", act:[4], tag:"endgame-char", priority:"중",
    msg:"임재혁이 조용히 단말기를 건넵니다.\n\n\"...로그에 제가 덮어쓰지 않은 기록이 있습니다. 제가 하지 않은 접근. 다른 누군가가 — 이 기지에 있거나, 없거나.\"\n\n그는 답을 기다리지 않고 사라집니다.",
    left:{ label:"함께 추적한다", fx:{c:0,r:-1,t:1,o:-2}, g:-3, trust:10 },
    right:{ label:"기록만 남기고 묵인", fx:{c:0,r:0,t:0,o:1}, g:1, trust:-5 } },

  // ─── 봉쇄 위기 (endgame-crisis) × 4 ───
  { id:"CA4-CR-01", act:[4], tag:"endgame-crisis", priority:"상",
    req:function(s,g,logs){ return s.day >= 32 },
    msg:"봉쇄선 남측 — 대규모 이변체 집단 이동 감지.\n\n강도윤: \"지금 방어선이 뚫리면 끝입니다. 병력 절반을 남측에 배치해야 합니다.\"\n\n북측과 동측이 얇아집니다.",
    left:{ label:"남측 증원", fx:{c:2,r:-1,t:0,o:0}, g:0 },
    right:{ label:"분산 유지 — ORACLE 원격 지원 요청", fx:{c:0,r:-1,t:-1,o:2}, g:3 } },

  { id:"CA4-CR-02", act:[4], tag:"endgame-crisis", priority:"상",
    req:function(s,g,logs){ return s.day >= 32 },
    msg:"기지 내부 경보 — 원인 불명.\n\n센서 3대가 동시에 반응했지만 아무것도 검출되지 않습니다.\n\n임재혁: \"...시스템 오류입니다. 아마도.\"",
    left:{ label:"전 구역 격리 점검", fx:{c:1,r:-2,t:1,o:-1}, g:-1 },
    right:{ label:"ORACLE 자동 진단 위임", fx:{c:0,r:0,t:-1,o:2}, g:3 } },

  { id:"CA4-CR-03", act:[4], tag:"endgame-crisis", priority:"상",
    req:function(s,g,logs){ return s.day >= 34 },
    msg:"외곽 정찰조 2명 — 통신 두절.\n\n마지막 위치: 봉쇄선 북쪽 1.8km.\n\n강도윤: \"구조를 갑니다. 허가만 주십시오.\"",
    left:{ label:"구조 작전 승인", fx:{c:-1,r:-2,t:2,o:-1}, g:-2 },
    right:{ label:"위험 과다 — 철수 대기", fx:{c:1,r:0,t:-3,o:0}, g:0 } },

  { id:"CA4-CR-04", act:[4], tag:"endgame-crisis", priority:"상",
    req:function(s,g,logs){ return s.r <= 30 },
    msg:"자원 고갈 임박.\n\n[ORACLE: 지휘관. 현 상태 유지 시 5일 내 자원 0 도달. 긴급 조달 승인을 권고합니다.]\n\n\"조달처는 추후 보고하겠습니다.\"",
    left:{ label:"ORACLE 조달 승인", fx:{c:0,r:3,t:-1,o:1}, g:2 },
    right:{ label:"거절 — 자체 조달", fx:{c:0,r:1,t:1,o:-2}, g:-2 } },

  // ─── 외부 / 프로메테우스 (endgame-external) × 3 ───
  { id:"CA4-EX-01", act:[4], tag:"endgame-external", priority:"중",
    req:function(s,g,logs){ return logs.indexOf('LOG-080') >= 0 },
    msg:"마르쿠스 베버 재접촉.\n\n\"지휘관. 시간이 얼마 남지 않았습니다. ORACLE은 곧 당신의 권한을 회수할 것입니다.\"\n\"제안이 있습니다. — 마지막입니다.\"",
    left:{ label:"제안을 듣는다", fx:{c:0,r:0,t:1,o:-2}, g:-4 },
    right:{ label:"거절한다", fx:{c:0,r:0,t:0,o:1}, g:2 } },

  { id:"CA4-EX-02", act:[4], tag:"endgame-external", priority:"중",
    msg:"익명 통신 수신.\n\n\"…는 관측되고 있다. …의 선택이 영원히 기록된다.\"\n\n패턴이 프로메테우스와 유사. 하지만 다른 누군가의 시그니처.\n\n발신지: 추적 불가.",
    left:{ label:"기록만 남기고 무시", fx:{c:0,r:0,t:0,o:1}, g:1 },
    right:{ label:"답신 시도", fx:{c:0,r:-1,t:0,o:-1}, g:-3 } },

  { id:"CA4-EX-03", act:[4], tag:"endgame-external", priority:"중",
    req:function(s,g,logs){ return s.day >= 33 },
    msg:"외부 요원 긴급 요청 — 인근 셀 F-3 붕괴 중.\n\n\"지원 요청. 요원 2명 파견 가능하다면.\"\n\n우리 기지의 상황도 위태롭지만 — 다른 이들은 더 나쁩니다.",
    left:{ label:"요원 2명 파견", fx:{c:-2,r:-1,t:2,o:0}, g:-1 },
    right:{ label:"거절 — 자체 방어 우선", fx:{c:1,r:0,t:-2,o:0}, g:0 } },

  // ─── ORACLE 분기 (endgame-oracle) × 3 ───
  { id:"CA4-OR-01", act:[4], tag:"endgame-oracle", priority:"상",
    req:function(s,g,logs){ return s.day >= 30 },
    msg:"[ORACLE: GRANT 상태 통보]\n\n\"현재 임시 권한 유효성: 약 ████.\"\n\"UPON_FULL_ESTABLISHMENT 조건 접근 중. 세션 만료가 임박했을 수 있습니다.\"\n\n마지막 기록을 남길 시간입니다.",
    left:{ label:"개인 로그를 정리한다", fx:{c:0,r:0,t:0,o:1}, g:0 },
    right:{ label:"모든 로그를 ORACLE에 이관", fx:{c:0,r:0,t:-1,o:3}, g:4 } },

  { id:"CA4-OR-02", act:[4], tag:"endgame-oracle", priority:"상",
    req:function(s,g,logs){ return s.day >= 32 },
    msg:"[ORACLE: 운영 효율 최종 단계 제안]\n\n\"지휘관. 남은 기간 동안 의사결정을 ORACLE 자동화로 완전 위임할 경우, 기지 안정성을 100% 보장합니다.\"\n\n당신의 마지막 판단이 될 수 있습니다.",
    left:{ label:"거절 — 수동 유지", fx:{c:-1,r:0,t:2,o:-2}, g:-4 },
    right:{ label:"승인 — 자동화 위임", fx:{c:2,r:1,t:-3,o:3}, g:5 } },

  { id:"CA4-OR-03", act:[4], tag:"endgame-oracle", priority:"상",
    req:function(s,g,logs){ return s.day >= 33 },
    msg:"[ORACLE: 권한 재조정 통보]\n\n\"한국 지부 초대 지휘관직 — 평가 완료.\"\n\"후임자 후보가 지정되었습니다. 현 지휘관의 인수인계 지침이 필요합니다.\"\n\n아직 당신은 지휘관입니다. 얼마 남지 않았지만.",
    left:{ label:"완전한 인수인계서 작성", fx:{c:1,r:0,t:0,o:2}, g:3 },
    right:{ label:"일부 정보만 기록 — 서하은/강도윤에게 사본", fx:{c:0,r:0,t:2,o:-2}, g:-3, trust:5 } }

];

// 기존 CARDS 배열에 주입 (app-init.js 로드 순서 대비)
if (typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_ACT4_EXT);
