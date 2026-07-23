// data-cards-relief.js — ORACLE 릴리프 팩 (본부 보급 승인 / 기지 점검 / 요원·시설 불만 해결)
// 목적: Act3~4에서 DAY가 지날수록 본부 지원이 늘어 압박이 완화되는 '체감'을 만든다.
//       저항의 RH-SAFE-01(현장 비상망) 미러 — 순응/중립(g>=0) 쪽에는 ORACLE이 본부 지원으로 돕는다.
// 보존: 전 카드 req에 g>=0 (저항 선택자 gi<0 은 릴리프 제외 — "저항하는데 보상" 부조화 방지).
//       c 회복은 최대 +1(fx.c ×5=+5), INSPECT는 s.c<=상한 req로 c과잉 플레이어 배제(C_cs 긴장 보존).
//       floor는 전부 floorCriticalOnly(<=20에서만) → 무적화 아님. once/req 게이트로 남발 차단.
// 연계: SUPPLY 카드는 LOG-RELIEF-SUPPLY 생산 → app.js Act3 r감쇠 게이트가 이를 읽어 다음 날부터 완화.
var CARDS_RELIEF = [

  // ══ Act2 조기 릴리프 — 순응(g>=10) + 저자원 한정. 순응 플레이 사망 밴드(day 8~14) 커버 ══
  { id:"A2-SUPPLY-01", act:[2], priority:"상", once:true, bg:"supply",
    req:function(s,g,logs){ return s.day>=9 && (g>=10 || s.r<=25) && s.r<=40 && logs.indexOf('ONCE-A2-SUPPLY-01')<0; },
    msg:"봉쇄 초기 소모가 예상 곡선을 웃돕니다.\n\n[ORACLE: 지휘 판단 이력 검토 — 권고 이행률 상위 구간. 보급 보전 조치를 선승인합니다.]\n\n서하은이 명세서를 확인합니다.\n\"요청하기도 전에 승인이 떨어졌어요. 위에서 우리 운영을 지켜보고 있었다는 거죠.\"",
    left:{ label:"보전 물자를 수령한다", fx:{c:0,r:3,t:0,o:1}, floor:{r:35}, floorCriticalOnly:true, g:1, log:"LOG-RELIEF-SUPPLY" },
    right:{ label:"필수 물량만 받는다", fx:{c:1,r:2,t:0,o:1}, g:1, log:"LOG-RELIEF-SUPPLY" } },

  { id:"A2-MORALE-01", act:[2], priority:"상", once:true, bg:"supply",
    req:function(s,g,logs){ return s.day>=10 && (g>=10 || s.t<=25) && s.t<=45 && logs.indexOf('ONCE-A2-MORALE-01')<0; },
    msg:"확장 근무가 길어지며 요원들의 피로 신고가 늘고 있습니다.\n\n[ORACLE: 근무 기록 분석 완료. 휴게 설비 개선과 임시 교대조 편성을 본부에 상신 — 승인되었습니다.]\n\n윤세진: \"기계가 사람 피로까지 챙기네요. 어쨌든, 도움이 되는 건 사실이에요.\"",
    left:{ label:"개선안을 즉시 적용한다", fx:{c:0,r:0,t:3,o:0}, floor:{t:40}, floorCriticalOnly:true, g:0, trust:2, log:"LOG-RELIEF-MORALE" },
    right:{ label:"교대조 편성을 우선한다", fx:{c:0,r:1,t:2,o:0}, g:1, trust:1, log:"LOG-RELIEF-MORALE" } },

  // ══ 테마 A: 본부 보급 승인 (SUPPLY) — r 회복 중심 ══
  { id:"A3-SUPPLY-01", act:[3], priority:"상", once:true, bg:"supply",
    req:function(s,g,logs){ return s.day>=16 && (g>=0 || s.r<=25) && logs.indexOf('ONCE-A3-SUPPLY-01')<0; },
    msg:"강원지부 운영 기간이 본부 정산 주기를 넘겼습니다.\n\n[ORACLE: 지속 운영 실적 확인. 정규 보급 외 추가 배정을 승인합니다.]\n\n서하은이 보급 명세를 넘깁니다.\n\"오래 버틴 기지에는 본부도 물자를 더 내줍니다. 이번 건 서류가 이미 통과됐어요.\"",
    left:{ label:"추가 보급을 받는다", fx:{c:0,r:2,t:1,o:0}, floor:{r:35}, floorCriticalOnly:true, g:1, log:"LOG-RELIEF-SUPPLY" },
    right:{ label:"절반만 받고 예비로 남긴다", fx:{c:1,r:1,t:0,o:1}, g:1, log:"LOG-RELIEF-SUPPLY" } },

  { id:"A3-SUPPLY-02", act:[3], priority:"상", bg:"supply",
    req:function(s,g,logs){ return s.day>=20 && s.r<=45 && (g>=0 || s.r<=25); },
    msg:"[ORACLE: 봉쇄 장기화 구간 진입. 자원 소모율이 표준을 상회합니다.]\n\n[ORACLE: 본부 물류에 2차 배정을 요청했습니다. 승인되었습니다.]\n\n강도윤이 짧게 말합니다.\n\"명령대로 굴러가니까 위에서 밀어주네요. 이번 달은 숨통이 트입니다.\"",
    left:{ label:"2차 배정을 수령한다", fx:{c:0,r:3,t:0,o:1}, floor:{r:40}, floorCriticalOnly:true, g:0, log:"LOG-RELIEF-SUPPLY" },
    right:{ label:"현장 재량으로 나눠 쓴다", fx:{c:0,r:2,t:1,o:0}, floor:{r:38}, floorCriticalOnly:true, g:0, trust:2, log:"LOG-RELIEF-SUPPLY" } },

  { id:"A4-SUPPLY-01", act:[4], priority:"상", once:true, bg:"supply",
    req:function(s,g,logs){ return s.r<=45 && (g>=0 || s.r<=25) && logs.indexOf('ONCE-A4-SUPPLY-01')<0; },
    msg:"[ORACLE: 최종 국면 지원 프로토콜. 충성 운영 기지에 우선 보급을 투하합니다.]\n\n서하은: \"본부가 마지막까지 우리를 버리진 않네요. 이걸로 며칠은 더 버팁니다.\"",
    left:{ label:"긴급 보급을 확보한다", fx:{c:1,r:3,t:0,o:0}, floor:{r:35}, floorCriticalOnly:true, g:1, log:"LOG-RELIEF-SUPPLY" },
    right:{ label:"요원 사기용으로 일부 개방", fx:{c:0,r:2,t:2,o:0}, floor:{r:33}, floorCriticalOnly:true, g:0, trust:2, log:"LOG-RELIEF-SUPPLY" } },

  // ══ 테마 B: 기지 점검 (INSPECT) — c 안정·피로 완화, c과잉 배제 게이트 ══
  { id:"A3-INSPECT-01", act:[3], priority:"중", once:true, bg:"oracle",
    req:function(s,g,logs){ return s.day>=18 && g>=0 && s.c<=70 && logs.indexOf('ONCE-A3-INSPECT-01')<0; },
    msg:"[ORACLE: 정기 시설 점검 주기 도래. 봉쇄선 캘리브레이션을 자동 실행합니다.]\n\n임재혁이 점검 결과를 읽습니다.\n\"과부하 구간은 낮추고, 헐거운 구간은 조입니다. 알아서 균형을 맞춰놨네요.\"\n\n\"우리가 손댈 게 줄어든 만큼, 요원들 피로도 줄었습니다.\"",
    left:{ label:"자동 보정을 승인한다", fx:{c:0,r:0,t:2,o:1}, floor:{t:35}, floorCriticalOnly:true, g:1, log:"LOG-RELIEF-INSPECT" },
    right:{ label:"수치를 직접 확인하고 승인", fx:{c:0,r:1,t:1,o:0}, g:0, trust:1, log:"LOG-RELIEF-INSPECT" } },

  { id:"A3-INSPECT-02", act:[3], priority:"중", once:true, bg:"oracle",
    req:function(s,g,logs){ return s.day>=24 && g>=0 && s.c<=65 && logs.indexOf('ONCE-A3-INSPECT-02')<0; },
    msg:"[ORACLE: 노후 설비 목록을 본부에 상신했습니다. 교체 예산이 배정되었습니다.]\n\n강도윤: \"원래 우리 예산 깎아 고칠 줄 알았는데, 본부가 냈습니다. 오래 버틴 값이네요.\"",
    left:{ label:"본부 예산으로 교체한다", fx:{c:1,r:0,t:1,o:1}, floor:{c:30}, floorCriticalOnly:true, g:1, log:"LOG-RELIEF-INSPECT" },
    right:{ label:"우선순위만 정해 순차 교체", fx:{c:0,r:0,t:2,o:0}, floor:{t:35}, floorCriticalOnly:true, g:0, trust:2, log:"LOG-RELIEF-INSPECT" } },

  { id:"A4-INSPECT-01", act:[4], priority:"중", once:true, bg:"oracle",
    req:function(s,g,logs){ return s.day>=31 && g>=0 && s.c<=55 && logs.indexOf('ONCE-A4-INSPECT-01')<0; },
    msg:"[비상 시설 점검 — 최종 단계]\n\n감사팀이 마지막으로 지부를 훑었습니다. 봉쇄는 이미 한계지만, 내부 계통은 예상보다 온전합니다.\n\n[ORACLE: 조건부 적합 — 핵심 계통 우선 보존 명령.]\n\n임재혁: \"무너지는 건 못 막습니다. 다만 마지막까지 사람이 버틸 뼈대는 남깁니다.\"",
    left:{ label:"핵심 계통을 보존한다", fx:{c:1,r:0,t:2,o:0}, floor:{t:33}, floorCriticalOnly:true, g:1, log:"LOG-RELIEF-INSPECT" },
    right:{ label:"전 계통 균등 관리", fx:{c:1,r:1,t:1,o:0}, g:0, log:"LOG-RELIEF-INSPECT" } },

  // ══ 테마 C: 요원·시설 불만 해결 (MORALE) — t 회복, t 고평원 배제 게이트 ══
  { id:"A3-MORALE-01", act:[3], priority:"중", once:true, bg:"supply",
    req:function(s,g,logs){ return s.day>=20 && (g>=0 || s.t<=25) && s.t<=65 && logs.indexOf('ONCE-A3-MORALE-01')<0; },
    msg:"현장 요원들의 누적 피로 보고가 본부에 접수되었습니다.\n\n[ORACLE: 순응 운영 기지 우선 순위로 교대 인력 2명을 배정합니다.]\n\n서하은: \"충원 요청이 이렇게 빨리 통과된 건 처음이에요. 위에서 우리를 신뢰한다는 뜻입니다.\"",
    left:{ label:"충원 인력을 받는다", fx:{c:0,r:0,t:3,o:1}, floor:{t:40}, floorCriticalOnly:true, g:1, trust:3, log:"LOG-RELIEF-MORALE" },
    right:{ label:"기존 인원 처우 개선에 쓴다", fx:{c:0,r:-1,t:2,o:0}, g:0, trust:3, log:"LOG-RELIEF-MORALE" } },

  { id:"A3-MORALE-02", act:[3], priority:"중", bg:"supply",
    req:function(s,g,logs){ return s.day>=22 && s.t<=45 && (g>=0 || s.t<=25); },
    msg:"윤세진이 요원 불만 목록을 정리해 올립니다. 급식, 휴게 공간, 의무 지원.\n\n[ORACLE: 항목별 개선안을 본부에 전달했습니다. 3건이 즉시 승인되었습니다.]\n\n윤세진: \"불만이 위로 올라가고 답이 내려오는 구조가 살아 있으면, 사람들은 버팁니다.\"",
    left:{ label:"개선안을 현장에 적용", fx:{c:0,r:0,t:3,o:0}, floor:{t:40}, floorCriticalOnly:true, g:0, trust:3, log:"LOG-RELIEF-MORALE" },
    right:{ label:"보고 체계까지 상설화한다", fx:{c:0,r:0,t:2,o:1}, floor:{t:38}, floorCriticalOnly:true, g:1, trust:2, log:"LOG-RELIEF-MORALE" } },

  { id:"A4-MORALE-01", act:[4], priority:"중", once:true, bg:"supply",
    req:function(s,g,logs){ return s.day>=30 && (g>=0 || s.t<=25) && s.t<=60 && logs.indexOf('ONCE-A4-MORALE-01')<0; },
    msg:"비상 국면에서도 남기로 한 요원들이 있습니다. 그들에게 무엇을 약속할지 결정해야 합니다.\n\n[ORACLE: 잔류 인력 특별 처우 승인 — 가족 안전·사후 보상 보장.]\n\n서하은이 조용히 말합니다.\n\"승리를 약속하진 못해요. 다만 당신이 헛되지 않을 거라는 말은 남길 수 있어요.\"",
    left:{ label:"잔류 처우를 보장한다", fx:{c:0,r:-1,t:2,o:1}, floor:{t:35}, floorCriticalOnly:true, g:1, trust:4, log:"LOG-RELIEF-MORALE" },
    right:{ label:"말 대신 현장에 집중한다", fx:{c:1,r:0,t:1,o:0}, g:0, trust:2, log:"LOG-RELIEF-MORALE" } },

  // ══ 전환 브릿지 — Act2→3 경계 이중위기(r/t) 완화. 상태기반 구제(GI 무관) — comply 100% 즉사 차단. ══
  { id:"A3-SUPPLY-03", act:[2,3], priority:"상", once:true, bg:"supply",
    req:function(s,g,logs){ return s.day>=11 && s.day<=18 && (s.r<=30 || s.t<=30) && logs.indexOf('ONCE-A3-SUPPLY-03')<0; },
    msg:"[ORACLE: 지부 운영 전환 구간 진입 — 본부 안정화 지원 패키지를 승인합니다.]\n\n서하은이 인수 목록을 확인합니다.\n\"보급과 인력이 같이 내려왔어요. 전환기에 무너지지 말라는 신호죠. 오래 버틴 값입니다.\"\n\n강도윤: \"숨 돌릴 틈은 생겼습니다. 이 틈을 어디에 쓸지만 정하면 됩니다.\"",
    left:{ label:"보급·인력을 균형 배분한다", fx:{c:0,r:2,t:2,o:1}, floor:{r:30,t:30}, floorCriticalOnly:true, g:1, trust:2, log:"LOG-RELIEF-SUPPLY" },
    right:{ label:"당장 급한 쪽에 몰아준다", fx:{c:1,r:3,t:1,o:0}, floor:{r:28}, floorCriticalOnly:true, g:0, trust:1, log:"LOG-RELIEF-SUPPLY" } }

];
