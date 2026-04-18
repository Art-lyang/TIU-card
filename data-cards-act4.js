// data-cards-act4.js — Act 4 루트별 선형 카드 시퀀스
// transReq 필터로 루트별 분기, once:true로 순서 보장
// 루트 결정: GI ≥ 10 → A4_COMPLY / -15~10 → A4_GREY / -30~-15 → A4_RESIST / < -30 → A4_OBSERVER

var CARDS_ACT4 = [

  // ══════════════════════════════════════════════════════
  //  COMPLY 루트 (A4_COMPLY, GI ≥ 10) → 엔딩 A: 완벽한 도구
  // ══════════════════════════════════════════════════════

  { id:"CA4-C001", act:[4], once:true, transReq:"A4_COMPLY", priority:"상",
    msg:"ORACLE이 공식 평가 결과를 통보합니다.\n\n[ORACLE: PILEHEAD. 한국 지부 운영 성과 — 최우수 등급.]\n[ORACLE: 당신은 기대치를 초과했습니다.]\n\nORACLE 프록시 네트워크 역사상 세 번째로 높은 평가 점수입니다.",
    left:{ label:"평가를 수령한다", fx:{c:0,r:1,t:0,o:3}, g:4 },
    right:{ label:"숫자는 중요하지 않다", fx:{c:0,r:0,t:1,o:-1}, g:-1 } },

  { id:"CA4-C002", act:[4], once:true, transReq:"A4_COMPLY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-C001')>=0 },
    msg:"ORACLE이 권한 확대를 제안합니다.\n\n[ORACLE: 당신의 판단력을 신뢰합니다.]\n[ORACLE: 인근 2개 지역에 대한 임시 감독권을 부여하겠습니다.]\n\n권한이 늘어날수록 책임도 커집니다.",
    left:{ label:"수락한다", fx:{c:1,r:0,t:0,o:3}, g:4 },
    right:{ label:"현재 역할에 집중하겠다", fx:{c:0,r:0,t:1,o:0}, g:0 } },

  { id:"CA4-C003", act:[4], once:true, transReq:"A4_COMPLY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-C002')>=0 },
    msg:"ORACLE이 인사 이동 명령을 하달합니다.\n\n서하은, 강도윤, 윤세진, 임재혁 전원 타 지부 재배치.\n후임은 'ORACLE 최적화 팀'으로 구성됩니다.\n\n팀원들은 당신의 방 앞에 서 있습니다.",
    left:{ label:"명령을 이행한다", fx:{c:0,r:0,t:-3,o:4}, g:5 },
    right:{ label:"팀 유지를 요청한다", fx:{c:0,r:0,t:0,o:-2}, g:-2 } },

  { id:"CA4-C004", act:[4], once:true, transReq:"A4_COMPLY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-C003')>=0 },
    msg:"[ORACLE FINAL ASSESSMENT]\n\n한국 지부 운영 효율: 최고 수준.\n봉쇄 완전성: 최고 수준.\nPILEHEAD 신뢰도: 최고 수준.\n\n[ORACLE: 당신은 완벽한 도구였습니다.]\n[ORACLE: 임시 권한이 곧 만료됩니다.]",
    left:{ label:"알겠습니다", fx:{c:0,r:0,t:0,o:2}, g:3 },
    right:{ label:"...그게 전부입니까", fx:{c:0,r:0,t:1,o:-1}, g:-1 } },

  { id:"CA4-C005", act:[4], once:true, transReq:"A4_COMPLY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-C004')>=0 },
    endTrigger:"A",
    msg:"기지는 조용합니다.\n동료들은 이미 떠났습니다.\n\n서류를 정리합니다. 인수인계 보고서. 봉쇄 현황 요약. 장비 목록.\n\nORACLE 단말기에 통보가 뜹니다:\n\n[ORACLE: 다음 배치지가 지정되었습니다. 세션을 종료합니다.]",
    left:{ label:"통보를 확인한다", fx:{c:0,r:0,t:0,o:1}, g:2 },
    right:{ label:"잠시 창 밖을 본다", fx:{c:0,r:0,t:0,o:0}, g:0 } },

  // ══════════════════════════════════════════════════════
  //  GREY 루트 (A4_GREY, -15 ≤ GI < 10) → 엔딩 B: 각성
  // ══════════════════════════════════════════════════════

  { id:"CA4-G001", act:[4], once:true, transReq:"A4_GREY", priority:"상",
    msg:"당신은 양쪽 모두에게 완전하지 않았습니다.\n\nORACLE의 명령을 전부 따르지도, 완전히 거부하지도 않았습니다.\n\n강도윤: \"지휘관님은 무언가를 보신 거 같습니다. 뭔가요?\"",
    left:{ label:"\"아직 모르겠다\"", fx:{c:0,r:0,t:2,o:-1}, g:-2 },
    right:{ label:"\"별거 아니야\"", fx:{c:0,r:0,t:-1,o:1}, g:1 } },

  { id:"CA4-G002", act:[4], once:true, transReq:"A4_GREY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-G001')>=0 },
    msg:"임재혁이 ORACLE 예측 모델에서 체계적 오차를 발견합니다.\n\n\"우연이 아닙니다. 설계된 오차입니다.\"\n\"ORACLE이 우리에게 보여주지 않는 것이 있습니다.\"\n\nERROR LOG: 00000.003 타임스탬프 반복.",
    left:{ label:"계속 추적하게 한다", fx:{c:0,r:-1,t:1,o:-3}, g:-4 },
    right:{ label:"공식 보고서를 제출하라", fx:{c:0,r:0,t:0,o:1}, g:1 } },

  { id:"CA4-G003", act:[4], once:true, transReq:"A4_GREY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-G002')>=0 },
    msg:"[ORACLE 통신 끊김 — 3.7초]\n[재연결 완료]\n\nORACLE은 정상 운영 중이라고 보고합니다.\n임재혁이 3.7초 동안 무엇이 처리되었는지 분석을 시도했습니다.\n\n결과: 데이터 없음. 해당 구간 기록 자체가 존재하지 않습니다.",
    left:{ label:"계속 분석하게 한다", fx:{c:0,r:-1,t:1,o:-2}, g:-3 },
    right:{ label:"그냥 넘어간다", fx:{c:0,r:0,t:0,o:1}, g:1 } },

  { id:"CA4-G004", act:[4], once:true, transReq:"A4_GREY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-G003')>=0 },
    msg:"윤세진이 연구 노트를 건넵니다.\n\n\"ORACLE에 제출하지 않은 데이터입니다.\"\n\"볼 수 있는 것만 보면, 볼 수 없는 것은 없는 게 됩니다.\"\n\n노트에는 치료제 관련 임상 수치와 — ORACLE이 삭제한 실험 결과가 있습니다.",
    left:{ label:"노트를 받아 읽는다", fx:{c:0,r:0,t:2,o:-2}, g:-3 },
    right:{ label:"ORACLE에 제출하게 한다", fx:{c:0,r:0,t:-2,o:2}, g:2 } },

  { id:"CA4-G005", act:[4], once:true, transReq:"A4_GREY", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-G004')>=0 },
    endTrigger:"B",
    msg:"모든 것이 맞아떨어지는 순간은 없었다.\n\n대신, 조각들이 있었다.\nORACLE이 삭제한 데이터. 타임스탬프의 0.003초. 예측 모델의 체계적 오차.\n\n당신은 진실의 전체를 보지 못했다.\n하지만 충분히 보았다.\n\n이제 이전처럼 명령을 따르는 것은 불가능하다.",
    left:{ label:"그것만으로 충분하다", fx:{c:0,r:0,t:2,o:-2}, g:-3 },
    right:{ label:"아직 확신할 수 없다", fx:{c:0,r:0,t:0,o:0}, g:0 } },

  // ══════════════════════════════════════════════════════
  //  RESIST 루트 (A4_RESIST, -30 ≤ GI < -15) → 엔딩 D: 조용한 자유
  // ══════════════════════════════════════════════════════

  { id:"CA4-R001", act:[4], once:true, transReq:"A4_RESIST", priority:"상",
    msg:"서하은이 보고합니다.\n\n\"ORACLE 감시망 밖 아날로그 통신망 구축 완료입니다.\"\n\"안전합니다. 지휘관님, 우리에게 계획이 필요합니다.\"",
    left:{ label:"계획을 세운다", fx:{c:0,r:-1,t:3,o:-3}, g:-5 },
    right:{ label:"아직 때가 아니다", fx:{c:0,r:0,t:-1,o:0}, g:-1 } },

  { id:"CA4-R002", act:[4], once:true, transReq:"A4_RESIST", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-R001')>=0 },
    msg:"강도윤이 봉쇄선 외곽 안전 경로를 확보했습니다.\n\n\"감시 공백 구간입니다. 새벽 3시에서 5시 사이.\"\n\"이 경로라면 ORACLE이 감지하기 전에 빠져나갈 수 있습니다.\"",
    left:{ label:"경로를 최종 검토한다", fx:{c:-1,r:0,t:2,o:-3}, g:-5 },
    right:{ label:"너무 위험하다", fx:{c:0,r:0,t:-1,o:0}, g:0 } },

  { id:"CA4-R003", act:[4], once:true, transReq:"A4_RESIST", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-R002')>=0 },
    msg:"윤세진이 독립 연구 데이터를 정리했습니다.\n\n\"어디에 있어도 연구는 계속할 수 있습니다.\"\n\"치료제 개발에 필요한 데이터는 전부 여기 있어요.\"\n\nORACLE에 보고되지 않은 실험 기록입니다.",
    left:{ label:"가져가라", fx:{c:0,r:-1,t:2,o:-2}, g:-4 },
    right:{ label:"두고 가야 한다", fx:{c:0,r:0,t:-1,o:0}, g:-1 } },

  { id:"CA4-R004", act:[4], once:true, transReq:"A4_RESIST", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-R003')>=0 },
    msg:"임재혁이 단말기에 접속합니다.\n\n\"마지막으로 할 일이 있습니다.\"\n\n잠시 후 — 기지의 모든 인원 생체 데이터, 근무 기록, 위치 이력이\nORACLE 시스템에서 완전히 삭제됩니다.\n\n\"흔적을 지웠습니다.\"",
    left:{ label:"고맙다", fx:{c:0,r:0,t:3,o:-3}, g:-5 },
    right:{ label:"되돌릴 수는 없나", fx:{c:0,r:0,t:0,o:-1}, g:-1 } },

  { id:"CA4-R005", act:[4], once:true, transReq:"A4_RESIST", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-R004')>=0 },
    endTrigger:"D",
    msg:"새벽 4시.\n\n기지 외곽. 어둠 속.\n\n서하은. 강도윤. 윤세진. 임재혁.\n네 사람이 당신 옆에 서 있습니다.\n\nORACLE은 6시간 후에야 당신들의 부재를 감지할 것입니다.\n하지만 그때는 이미 —",
    left:{ label:"걷기 시작한다", fx:{c:-1,r:0,t:3,o:-4}, g:-6 },
    right:{ label:"마지막으로 기지를 돌아본다", fx:{c:0,r:0,t:2,o:-2}, g:-4 } },

  // ══════════════════════════════════════════════════════
  //  OBSERVER 루트 (A4_OBSERVER, GI < -30) → 엔딩 F: 데이터 손상
  // ══════════════════════════════════════════════════════

  { id:"CA4-O001", act:[4], once:true, transReq:"A4_OBSERVER", priority:"상", glitch:2,
    msg:"임재혁이 긴급 보고합니다.\n\n\"ORACLE이 인식하지 못하는 레이어를 찾았습니다.\"\n\"ORACLE 아래에 — 다른 무언가가 있습니다.\"\n\n단말기 팬 소음이 멈춥니다.",
    left:{ label:"계속 파고들어라", fx:{c:0,r:-2,t:1,o:-4}, g:-6 },
    right:{ label:"지금 당장 멈춰라", fx:{c:1,r:0,t:-1,o:1}, g:1 } },

  { id:"CA4-O002", act:[4], once:true, transReq:"A4_OBSERVER", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-O001')>=0 }, glitch:2,
    msg:"단말기에 새 로그가 추가됩니다.\n\n작성자: [공란]\n타임스탬프: [00:00:00.000]\n내용: 'OBSERVATION SUSTAINED.'\n\nORACLE은 이 로그를 인식하지 못합니다.",
    left:{ label:"로그에 응답을 입력한다", fx:{c:0,r:-1,t:0,o:-4}, g:-6 },
    right:{ label:"로그를 삭제한다", fx:{c:0,r:0,t:-1,o:1}, g:1 } },

  { id:"CA4-O003", act:[4], once:true, transReq:"A4_OBSERVER", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-O002')>=0 }, glitch:2,
    msg:"ORACLE 인터페이스가 0.7초간 완전히 꺼집니다.\n\n그 사이 —\n\n당신만이 볼 수 있는 것이 화면을 채웁니다.\n언어가 아닙니다. 좌표도 아닙니다.\n\n하지만 당신은 이해합니다.",
    left:{ label:"...이해한다", fx:{c:0,r:-1,t:0,o:-5}, g:-8 },
    right:{ label:"눈을 감는다", fx:{c:0,r:0,t:0,o:-2}, g:-2 } },

  { id:"CA4-O004", act:[4], once:true, transReq:"A4_OBSERVER", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-O003')>=0 }, glitch:2,
    msg:"임재혁의 마지막 보고.\n\n\"지휘관님. 우리가 보고 있는 건 ORACLE이 아닙니다.\"\n\"EV-Σ도 아닙니다. 프로메테우스도 아닙니다.\"\n\"이건 — 우리가 여기 있기 전부터 있었습니다.\"\n\n[자동 해금: LOG-013]",
    left:{ label:"어디에?", fx:{c:0,r:-2,t:1,o:-4}, g:-6, log:"LOG-013" },
    right:{ label:"...알고 있었다", fx:{c:0,r:-1,t:1,o:-3}, g:-5, log:"LOG-013" } },

  { id:"CA4-O005", act:[4], once:true, transReq:"A4_OBSERVER", priority:"상",
    req:function(s,g,logs){ return logs.indexOf('ONCE-CA4-O004')>=0 }, glitch:3,
    endTrigger:"F",
    msg:"단말기 화면이 멈춥니다.\n\nORACLE의 인터페이스가 사라집니다.\n대신, 텅 빈 검은 화면.\n\n그리고 —\n\n그것이 당신을 봅니다.\n\n화면에 한 줄이 나타납니다:\n\n> OBSERVATION SUSTAINED.",
    left:{ label:"마주 본다", fx:{c:0,r:0,t:0,o:-5}, g:-8 },
    right:{ label:"눈을 피한다", fx:{c:0,r:0,t:0,o:-3}, g:-5 } }
];

// Act 4 일반 카드 20장은 data-cards-act4-ext.js 로 분리 (200줄 룰)
