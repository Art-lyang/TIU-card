// data-cards-act23-pressure.js — Act 2/3 4대 자원 압박 카드 (v1.0 / 2026-04-21)
// 목적: 현행 Act 2/3 "양쪽 다 -r" 카드 0장 → 자원 관리 너무 쉬움 문제 해결
// 구성 23장 (전부 once:true):
//   A. 강제 자원 소모   (CA23-PR-01~05) : 양쪽 모두 r-
//   B. 봉쇄 균열        (CA23-FR-01~05) : 양쪽 모두 c-
//   C. 내부분열         (CA23-DV-01~04) : 좌=중재(LOG획득) / 우=편들기
//   D. 분열 해결 체인   (CA23-RS-01~03) : 중재 LOG 2/3/4개 누적 시 회복
//   E. 평가 압박        (CA23-AS-01~03) : 양쪽 모두 o- 또는 g-
//   F. 크로스 희생      (CA23-XS-01~03) : 한 스탯 보전 = 다른 스탯 치명타

var CARDS_ACT23_PRESSURE = [

  // ═══ A. 강제 자원 소모 (CA23-PR-01~05) ═══
  { id:"CA23-PR-01", act:[2,3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=6; },
    msg:"전력 차단 30분 — 냉장 식량 팔레트 하나가 해동됐습니다.\n\n강도윤: \"오늘 안에 다 먹어치우면 괜찮은데, 남기면 전량 폐기입니다.\"\n\n사기는 오르지만 위장에 부담. 어떻게 처리할지.",
    left:{ label:"전원 야식 소모", fx:{c:0,r:-2,t:2,o:0}, g:0 },
    right:{ label:"전량 폐기", fx:{c:0,r:-3,t:-1,o:0}, g:0 } },

  { id:"CA23-PR-02", act:[2,3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=8; },
    msg:"수리 부품 창고 — 고가 부품 3점 분실.\n\n임재혁: \"내부자 소행 가능성이 높습니다. 감시 기록에는 공백이 있고요.\"\n\n조사할지, 조용히 메꿀지.",
    left:{ label:"전 요원 대상 조사", fx:{c:0,r:-1,t:-2,o:1}, g:0 },
    right:{ label:"기록상 소모 처리", fx:{c:0,r:-2,t:0,o:-1}, g:-1 } },

  { id:"CA23-PR-03", act:[2,3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=10; },
    msg:"주 연료탱크 하부 미세 누출.\n\n임재혁: \"지금 뜯으면 완전 교체 — 연료 3주치 증발합니다. 봉합만 하면 덜 새지만, 봉쇄 벽 가열기에 간헐 공급이 됩니다.\"",
    left:{ label:"완전 교체", fx:{c:1,r:-3,t:0,o:0}, g:0 },
    right:{ label:"임시 봉합", fx:{c:-2,r:-1,t:0,o:0}, g:0 } },

  { id:"CA23-PR-04", act:[3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=14; },
    msg:"의약품 유통기한 검토 — 진통제·항생제 상당량이 2주 이내 만료.\n\n윤세진: \"지금 분배해 쓸지, 만료 후 소각할지. 어느 쪽이든 손실은 있습니다.\"",
    left:{ label:"예방적 분배", fx:{c:0,r:-2,t:2,o:-1}, g:0 },
    right:{ label:"비축 유지 — 자연 만료", fx:{c:0,r:-3,t:-1,o:0}, g:0 } },

  { id:"CA23-PR-05", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=17; },
    msg:"외곽 순찰 차량 1호 — 변속기 파손.\n\n강도윤: \"부품 맞춰 수리하면 자원이 비고, 폐차 처리하면 순찰 범위가 줄어 봉쇄에 구멍이 납니다.\"",
    left:{ label:"수리 강행", fx:{c:0,r:-3,t:1,o:0}, g:0 },
    right:{ label:"폐차 — 순찰 범위 축소", fx:{c:-2,r:-1,t:-1,o:0}, g:0 } },

  // ═══ B. 봉쇄 균열 (CA23-FR-01~05) ═══
  { id:"CA23-FR-01", act:[2,3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=7; },
    msg:"방벽 북측 8m 구간 — 모르타르 균열 확인.\n\n\"전면 보강은 자재 소모가 큽니다. 우회 방어선만 세우면 자재는 적지만 벽 자체는 계속 약해져요.\" — 임재혁",
    left:{ label:"임시 보강", fx:{c:-1,r:-2,t:0,o:0}, g:0 },
    right:{ label:"우회 방어선", fx:{c:-2,r:0,t:1,o:0}, g:0 } },

  { id:"CA23-FR-02", act:[2,3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=9; },
    msg:"폭우 — 동측 철조망 구간 일부 도괴.\n\n강도윤: \"밤샘 복구 가능합니다. 요원들 피곤해할 겁니다. 아니면 대체 경계선 한 겹 더 세우는 방안이 있는데, 자재만 많이 듭니다.\"",
    left:{ label:"밤샘 복구", fx:{c:-1,r:-1,t:-1,o:0}, g:0 },
    right:{ label:"대체 경계선", fx:{c:-2,r:-1,t:0,o:0}, g:0 } },

  { id:"CA23-FR-03", act:[2,3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=11; },
    msg:"센서 네트워크 자가진단 — 노후 모듈 12기.\n\n임재혁: \"단계적 교체는 느리지만 자원이 덜 들고, 중요 지점만 먼저 교체하면 사각이 생깁니다.\"",
    left:{ label:"단계적 전면 교체", fx:{c:-1,r:-2,t:0,o:0}, g:0 },
    right:{ label:"핵심 지점 우선", fx:{c:-2,r:-1,t:0,o:-1}, g:-1 } },

  { id:"CA23-FR-04", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=13; },
    msg:"순찰조 2명 부상 이탈 — 교대 로테이션 공백.\n\n강도윤: \"남은 인원 압박해서 커버할 수 있습니다. 단, 번아웃 위험. 아니면 경계 공백을 감수하셔야 해요.\"",
    left:{ label:"교대 압박 유지", fx:{c:-1,r:0,t:-2,o:0}, g:0 },
    right:{ label:"일시적 경계 공백", fx:{c:-2,r:-1,t:0,o:0}, g:0 } },

  { id:"CA23-FR-05", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=16; },
    msg:"폐기물 처리장 — 시체 더미에서 이상 반응.\n\n윤세진: \"전면 소각하면 연료 대량 소모, 매연으로 드론에 노출됩니다. 국지 차단만 하면 소각은 나중에, 하지만 그동안 오염이 번집니다.\"",
    left:{ label:"전면 소각", fx:{c:-1,r:-2,t:0,o:0}, g:0 },
    right:{ label:"국지 차단", fx:{c:-2,r:0,t:-1,o:0}, g:0 } },

  // ═══ C. 내부분열 (CA23-DV-01~04) — 좌=중재(LOG획득) / 우=편들기 ═══
  { id:"CA23-DV-01", act:[2,3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=6; },
    msg:"식당에서 언쟁. 강도윤이 윤세진의 현장 판단을 비판합니다.\n\n강도윤: \"감정으로 결정하면 안 됩니다. 그 친구 살리려다 셋이 죽을 뻔했어요.\"\n윤세진: \"...제 판단이 틀렸다고 생각 안 합니다.\"\n\n양쪽 다 눈이 시뻘겋습니다.",
    left:{ label:"양측 개별 면담 — 중재", fx:{c:0,r:-1,t:-1,o:0}, g:0 },
    right:{ label:"강도윤 판단에 손 들어줌", fx:{c:0,r:0,t:-2,o:0}, g:0 } },

  { id:"CA23-DV-02", act:[2,3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=9; },
    msg:"서하은이 보고를 들고 옵니다.\n\n\"임재혁이 또 승인 없이 외부망 접속했습니다. 이번엔 메리디안 쪽 서버예요. 규정 위반입니다.\"\n임재혁: \"...정보 우위 없으면 우리 다 죽어요. 규정만 붙들고 있을 때가 아닙니다.\"",
    left:{ label:"양쪽 논리 들여다본 뒤 절충", fx:{c:0,r:0,t:-1,o:0}, g:-1 },
    right:{ label:"서하은 — 규정 준수 명령", fx:{c:0,r:0,t:-2,o:1}, g:1 } },

  { id:"CA23-DV-03", act:[3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=13; },
    msg:"신입 요원 한 명이 기존 팀과 충돌합니다.\n\n\"저희 때는 이렇게 안 했다\" 대 \"그건 지금 기준으로 비효율이다\".\n\n서하은: \"지휘관님이 교통정리 해주셔야 할 것 같습니다. 둘 중 한 명 마음이 상하게 돼 있어요.\"",
    left:{ label:"전원 회의 — 절차 공동 재정의", fx:{c:0,r:-1,t:-1,o:0}, g:0 },
    right:{ label:"기존 팀 절차 확정", fx:{c:0,r:0,t:-2,o:0}, g:0 } },

  { id:"CA23-DV-04", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=16; },
    msg:"요원 몇 명이 — 위험 임무 자주 나가는 사람들에게 배급을 더 주자고 건의합니다.\n\n\"형평이 중요합니다.\" vs \"성과에 따른 배분이 당연합니다.\"\n\n강도윤: \"...지휘관님 결정이 내려와야 더 안 번집니다.\"",
    left:{ label:"공개 토론 — 합의된 절충안", fx:{c:0,r:-1,t:-1,o:0}, g:0 },
    right:{ label:"성과 차등 배급 확정", fx:{c:1,r:0,t:-2,o:0}, g:0 } },

  // ═══ D. 분열 해결 체인 (CA23-RS-01~03) — 중재 LOG 누적 시 회복 ═══
  { id:"CA23-RS-01", act:[3], once:true, priority:"상",
    req:function(s,g,logs){
      var n=['LOG-DV-01-MED','LOG-DV-02-MED','LOG-DV-03-MED','LOG-DV-04-MED'].filter(function(l){return logs.indexOf(l)>=0}).length;
      return s.day>=16 && n>=2;
    },
    msg:"최근 몇 건의 갈등을 당신이 정면으로 중재한 결과 — 팀 분위기가 조금씩 부드러워집니다.\n\n서하은: \"지휘관님, 요원들 말수가 늘었어요. 회의에서 농담도 오갑니다.\"\n\n작은 회복. 하지만 느껴집니다.",
    left:{ label:"분위기 유지 — 평소대로", fx:{c:0,r:1,t:2,o:0}, g:0 },
    right:{ label:"공동 훈련 한 회 추가", fx:{c:1,r:0,t:3,o:0}, g:0 } },

  { id:"CA23-RS-02", act:[3], once:true, priority:"상",
    req:function(s,g,logs){
      var n=['LOG-DV-01-MED','LOG-DV-02-MED','LOG-DV-03-MED','LOG-DV-04-MED'].filter(function(l){return logs.indexOf(l)>=0}).length;
      return s.day>=19 && n>=3;
    },
    msg:"강도윤과 윤세진이 — 커피 한 잔씩 들고 같이 들어옵니다.\n\n강도윤: \"지휘관님. 저희 둘이 의무실 프로토콜 같이 검토해봤습니다.\"\n윤세진: \"교전 상황 판단 기준을 서로 맞췄어요. 다음엔 더 빠를 겁니다.\"\n\n팀이 자체적으로 움직이기 시작합니다.",
    left:{ label:"두 사람 신뢰 — 재량 확대", fx:{c:1,r:2,t:3,o:0}, g:0 },
    right:{ label:"공식 프로토콜화", fx:{c:2,r:1,t:2,o:1}, g:1 } },

  { id:"CA23-RS-03", act:[3], once:true, priority:"상",
    req:function(s,g,logs){
      var n=['LOG-DV-01-MED','LOG-DV-02-MED','LOG-DV-03-MED','LOG-DV-04-MED'].filter(function(l){return logs.indexOf(l)>=0}).length;
      return s.day>=22 && n>=4;
    },
    msg:"저녁 식당에서 — 요원 전원이 모였습니다. 불만 회의가 아니라, 그냥 같이 식사하는 자리입니다.\n\n서하은: \"이런 거 — 처음이에요. 기지 들어오고 나서.\"\n임재혁: \"...지휘관님이 중재 제대로 한 결과죠. 이건 수치로는 안 남는 건데.\"\n\n어쩌면 이게 — 진짜 한국방벽일지도.",
    left:{ label:"함께 식사를 한다", fx:{c:1,r:3,t:4,o:0}, g:0 },
    right:{ label:"조용히 지켜본다", fx:{c:1,r:2,t:3,o:1}, g:1 } },

  // ═══ E. 평가 압박 (CA23-AS-01~03) ═══
  { id:"CA23-AS-01", act:[3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=14; },
    msg:"[ORACLE 중간 평가: 기지 운영 효율 — 타 지부 평균 대비 하회.]\n\n서하은: \"수치 기반 지적이에요. 해명하면 변명처럼 비치고, 침묵하면 묵인처럼 비칩니다.\"",
    left:{ label:"정식 해명 보고서 작성", fx:{c:0,r:-1,t:0,o:-1}, g:-1 },
    right:{ label:"침묵 — 다음 분기로", fx:{c:0,r:0,t:0,o:-2}, g:0 } },

  { id:"CA23-AS-02", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=17; },
    msg:"본부가 '위험 평가 보고서'를 요구합니다.\n\n임재혁: \"솔직하게 쓰면 본부 눈엔 무능력으로 보이고, 축소하면 나중에 사고 나면 덮어쓴 책임만 남습니다.\"",
    left:{ label:"솔직 서술", fx:{c:0,r:0,t:1,o:-1}, g:-2 },
    right:{ label:"적절히 축소", fx:{c:0,r:0,t:-1,o:-2}, g:0 } },

  { id:"CA23-AS-03", act:[3], once:true, priority:"중",
    req:function(s,g,logs){ return s.day>=20; },
    msg:"인접 지부 2곳이 — 비교 통계 공개를 요청했습니다.\n\n서하은: \"공유하면 약점이 노출되고, 거절하면 '비협조' 딱지가 붙습니다. 양쪽 다 평가에 불리해요.\"",
    left:{ label:"공유 — 신뢰 구축", fx:{c:0,r:0,t:-1,o:-1}, g:0 },
    right:{ label:"거절 — 기밀 유지", fx:{c:0,r:0,t:0,o:-2}, g:-1 } },

  // ═══ F. 크로스 희생 (CA23-XS-01~03) ═══
  { id:"CA23-XS-01", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=16; },
    msg:"창고 공간 부족 — 다음 보급분을 받으려면 하나를 비워야 합니다.\n\n윤세진: \"의약품을 우선하면 탄약 부족, 탄약을 우선하면 의료 마진이 끊깁니다.\"\n\n양자택일입니다.",
    left:{ label:"의약품 우선 — 탄약 비움", fx:{c:-3,r:1,t:2,o:0}, g:0 },
    right:{ label:"탄약 우선 — 의약품 비움", fx:{c:2,r:0,t:-2,o:0}, g:0 } },

  { id:"CA23-XS-02", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=18; },
    msg:"야간 교대 — 한 명만 가능합니다. 수리공이 나가면 방벽 보강, 군의관이 나가면 의무실 야근.\n\n두 인력 모두 중요. 한쪽을 쉬게 하면 그 쪽 업무가 밀립니다.",
    left:{ label:"수리공 배치 — 의무실 휴무", fx:{c:2,r:0,t:-2,o:0}, g:0 },
    right:{ label:"군의관 배치 — 방벽 대기", fx:{c:-2,r:-1,t:2,o:0}, g:0 } },

  { id:"CA23-XS-03", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=20; },
    msg:"비공식 정보원 한 명 — 본부가 그 존재를 의심하고 있습니다.\n\n임재혁: \"보호하려면 ORACLE 로그를 지워야 하는데, 그러면 본부는 눈치챕니다. 보고해버리면 — 그 친구 끝납니다.\"",
    left:{ label:"정보원 보호 — 로그 삭제", fx:{c:0,r:0,t:2,o:-3}, g:-2 },
    right:{ label:"ORACLE에 보고 — 관계 정리", fx:{c:0,r:0,t:-3,o:2}, g:1 } }

];

// CARDS 배열에 주입
if (typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_ACT23_PRESSURE);
