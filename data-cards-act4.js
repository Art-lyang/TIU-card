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
    right:{ label:"눈을 피한다", fx:{c:0,r:0,t:0,o:-3}, g:-5 } },

  // ══════════════════════════════════════════════════════
  //  Act 4 일반 카드 (모든 루트 공통, 데일리 필러/인물/위기/외부/ORACLE)
  //  태그 기반 — 3일 쿨다운. once 없음 → 반복 출현 가능
  // ══════════════════════════════════════════════════════

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
    right:{ label:"일부 정보만 기록 — 서하은/강도윤에게 사본", fx:{c:0,r:0,t:2,o:-2}, g:-3, trust:5 } },

];
