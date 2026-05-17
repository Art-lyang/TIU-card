// data-cards-crisis.js — 자원 위기 조건 카드 + Act 1 미스터리 씨앗
// 개선안 #1: r < 30 위기 카드 / #2A: 프롤로그 복선 이벤트

var CARDS_CRISIS = [

  // ═══ 자원 위기 카드 (r < 30일 때만 등장) ═══

  { id: "CR-001", act: [2,3,4], priority: "상",
    req: function(s){ return s.r < 30; },
    msg: "배급량 삭감 소식이 퍼졌습니다.\n\n기지 인원 일부가 식량 저장소 앞에 모여 있습니다.\n\"우리가 왜 굶어야 합니까?\"\n\n상황이 악화되기 전에 대응이 필요합니다.",
    left: { label: "직접 나가 설명", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -1 },
    right: { label: "보안팀 배치", fx: { c: 0, r: 0, t: -2, o: 1 }, g: 1 } },

  { id: "CR-002", act: [2,3,4], priority: "상",
    req: function(s){ return s.r < 25; },
    msg: "의무실 긴급 보고: 의약품 재고가 3일치밖에 남지 않았습니다.\n\n윤세진: \"부상자가 나오면 치료할 수단이 없습니다.\"\n\n외부 조달은 보급로 상태에 따라 위험할 수 있습니다.",
    left: { label: "위험 감수하고 외부 조달", fx: { c: -1, r: 2, t: 1, o: 0 }, g: 0 },
    right: { label: "기존 재고로 배분 최적화", fx: { c: 0, r: 1, t: -1, o: 1 }, g: 1 } },

  { id: "CR-003", act: [2,3], priority: "상",
    req: function(s){ return s.r < 30 && s.t < 40; },
    msg: "야간 순찰 중 식량 저장고 자물쇠가 파손된 채 발견되었습니다.\n\n재고 점검 결과 — 3일치 비상 식량이 사라졌습니다.\n\n강도윤: \"내부 소행입니다. 누군가 한계에 다다른 겁니다.\"",
    left: { label: "전원 조사 (엄격)", fx: { c: 0, r: 0, t: -2, o: 2 }, g: 2 },
    right: { label: "조용히 수습 (관용)", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -1 } },

  { id: "CR-004", act: [3,4], priority: "상",
    req: function(s){ return s.r < 20; },
    msg: "[긴급] 발전기 연료 잔량 위험 수준.\n\n4시간 내 보조 전력으로 전환하지 않으면 ORACLE 단말기 포함 전 시스템 셧다운.\n\n임재혁: \"비필수 구역 전력부터 차단해야 합니다.\"",
    left: { label: "비필수 구역 차단", fx: { c: 0, r: 1, t: -1, o: 0 }, g: 0 },
    right: { label: "ORACLE 우선 전력 배분", fx: { c: -1, r: 1, t: -2, o: 2 }, g: 3 } },

  { id: "CR-005", act: [2,3,4], priority: "중",
    req: function(s){ return s.r < 30; },
    msg: "기지 정수 시설 필터 교체 시기가 지났으나 교체품이 없습니다.\n\n\"물에서 냄새가 납니다.\"\n\n사기가 눈에 띄게 떨어지고 있습니다.",
    left: { label: "음용 제한과 임시 배급을 지시한다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "비상 필터를 현장 물자로 재배정한다", fx: { c: -1, r: 1, t: 1, o: -1 }, g: -1 } },

  { id: "CR-006", act: [3,4], priority: "상",
    req: function(s){ return s.r < 25 && s.c < 40; },
    msg: "보급 부족과 봉쇄선 약화가 동시에 발생했습니다.\n\nORACLE: \"자원 배분 우선순위 결정이 필요합니다.\"\n\n봉쇄 강화에 쓰면 기지 생활이 더 악화됩니다.",
    left: { label: "기지 생활 우선", fx: { c: -2, r: 2, t: 2, o: -2 }, g: -2 },
    right: { label: "봉쇄 강화 우선", fx: { c: 2, r: -1, t: -2, o: 2 }, g: 2 } },

  // ═══ Act 2 미스터리 씨앗 (개선안 #2A) ═══

  { id: "CA-SEED-01", act: [2], priority: "중", once: true,
    req: function(s){ return s.day >= 5 && s.day <= 9; },
    msg: "야간 당직 보고서에 이상한 항목이 있습니다.\n\n\"02:47 — 시스템 자가 진단 기록. 담당자 없음.\"\n\n02:47에 예약된 자가 진단은 운영 매뉴얼에 없습니다.",
    left: { label: "오류로 처리", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "기록 보관", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 } },

  { id: "CA-SEED-02", act: [2,3], priority: "중", once: true,
    req: function(s){ return s.day >= 6 && s.day <= 14; },
    msg: "사무실 책상 서랍 깊숙이에서 메모지가 발견되었습니다.\n\n작성자 불명. 날짜도 없습니다. 글씨가 급하게 쓴 듯 흐릿합니다.\n\n이상하네? 전임 지휘관이 없을 텐데...\n\n마지막 줄만 또렷합니다:\n\n\"B3 — 내부에 도면에 없는 구역이 있다. 제한구역 안쪽. 확인 필요.\"",
    left: { label: "그냥 넘긴다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "B3 제한구역을 확인해보겠다", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -3 } },

  { id: "CA-SEED-03", act: [2], priority: "하", once: true,
    req: function(s){ return s.day >= 6 && s.day <= 12; },
    msg: "임재혁이 단말기 점검 중 잠깐 멈칫합니다.\n\n\"... 아, 아닙니다. 펌웨어 버전 번호가 좀 이상해서요.\"\n\n\"공식 릴리즈 기록에 없는 빌드입니다. 보통 이런 건 없는데.\"",
    left: { label: "네가 판단해라", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "ORACLE에 문의", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-SEED-04", act: [2], priority: "하", once: true,
    req: function(s){ return s.day >= 7 && s.day <= 13; },
    msg: "서하은이 일일 보고서를 제출하면서 한마디 덧붙입니다.\n\n\"데이터 정리하다 보니... ORACLE 로그 타임스탬프에 간헐적 불연속이 있어요.\"\n\"밀리초 단위라 운영엔 영향 없지만, 좀 신경 쓰이네요.\"",
    left: { label: "참고하겠다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "공식 보고할 필요 없다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // ════════════════════════════════════════════════════
  //  스탯 위기 경고 카드 — 엔딩 임박 연쇄 (forceFlow)
  //  스탯 ≤ 20 진입 시 1회 출현, 체인으로 복구 기회 제공
  // ════════════════════════════════════════════════════

  // ═══ 봉쇄(c) 위기 경고 ═══
  { id: "CT-C01", act: [2,3,4], priority: "상", once: true, forceFlow: true,
    cond: function(s){ return s.c <= 20; },
    msg: "[긴급 — 봉쇄선 경보]\n\n외곽 3구역, 5구역에서 동시 균열 보고.\n봉쇄 완전성이 위험 수준까지 하락했습니다.\n\n강도윤: \"지휘관님, 지금 움직이지 않으면 무너집니다.\"\n\"전 인원 투입하면 막을 수 있습니다. 하지만 다른 모든 게 멈춥니다.\"",
    left: { label: "전 인원 긴급 투입", fx: { c: 3, r: -2, t: 1, o: 0 }, g: -1 },
    right: { label: "방어선 축소 재배치", fx: { c: 1, r: 0, t: -1, o: 0 }, g: 0 } },

  // ═══ 신뢰(t) 위기 경고 ═══
  { id: "CT-T01", act: [2,3,4], priority: "상", once: true, forceFlow: true,
    cond: function(s){ return s.t <= 20; },
    msg: "복도에서 요원들이 대화하다 당신을 보고 멈춥니다.\n\n시선이 차갑습니다. 경례도 형식적입니다.\n\n임재혁이 조심스럽게 말합니다.\n\"...지휘관님. 사람들이 한계입니다.\"\n\"누군가는 기지를 떠나겠다고까지 했습니다.\"",
    left: { label: "전원 소집. 직접 이야기한다", fx: { c: 0, r: 0, t: 3, o: -1 }, g: -2 },
    right: { label: "강도윤에게 상황 파악 지시", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },

  // ═══ ORACLE 평가(o) 위기 경고 ═══
  { id: "CT-O01", act: [2,3,4], priority: "상", once: true, forceFlow: true,
    cond: function(s){ return s.o <= 20; },
    msg: "[ORACLE — 경고 등급 상향]\n\n\"PILEHEAD, 당신의 운용 효율이 지속적으로 하락하고 있습니다.\"\n\"접근 권한 단계적 축소가 진행 중입니다.\"\n\n임재혁: \"지휘관님, 단말기 3개 모듈이 추가로 잠겼습니다.\"\n\"이대로면 작전 지시 권한마저 회수됩니다.\"",
    left: { label: "ORACLE에 성과 보고서 제출", fx: { c: 0, r: 0, t: -1, o: 3 }, g: 3 },
    right: { label: "우회 접속 경로 확보 지시", fx: { c: 0, r: -1, t: 1, o: 1 }, g: -2 } },

  // ════════════════════════════════════════════════════
  //  엔딩 B(각성) 전조 카드 — 3장 연쇄 독립 출현
  //  GI 하락 + 신뢰 상승 궤적에서 서사적 복선 제공
  // ════════════════════════════════════════════════════

  // 전조 1단계: 미세한 변화
  { id: "CT-B01", act: [2,3], priority: "중", once: true,
    cond: function(s,g,logs){ return (g <= -5 && s.day >= 16 && logs.length >= 3) && logs.indexOf('LOG-050')<0; },
    msg: "서하은이 평소보다 오래 단말기 앞에 앉아 있습니다.\n\n돌아보는 눈빛이 다릅니다. 무언가를 알고 있는 사람의 눈.\n\n\"...지휘관님. 혹시 느끼고 계십니까?\"\n\"ORACLE의 판단과 현실 사이에 점점 틈이 벌어지고 있다는 거.\"",
    left: { label: "무슨 뜻이지?", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 },
    right: { label: "...느끼고 있다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: -2 } },

  // 전조 2단계: 팀의 자각
  { id: "CT-B02", act: [3], priority: "중", once: true,
    cond: function(s,g,logs){
      var ht=0;
      try{var t=Save.get('ts_trust',{});if((t.haeun||0)>=55)ht++;if((t.doyun||0)>=55)ht++;if((t.sejin||0)>=55)ht++;if((t.jaehyuk||0)>=55)ht++}catch(e){}
      return g <= -10 && ht >= 1 && logs.length >= 5 && s.day >= 20;
    },
    msg: "저녁 점검 후, 강도윤이 평소와 다르게 말합니다.\n\n\"지휘관님. 팀원들 사이에서 변화가 느껴집니다.\"\n\"더 이상 명령을 기다리는 게 아니라... 스스로 판단하기 시작했습니다.\"\n\n\"좋은 건지 나쁜 건지는 모르겠습니다.\"\n\"하지만 이전과는 다릅니다.\"",
    left: { label: "그게 내가 원하던 거다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 },
    right: { label: "위험할 수도 있다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // 전조 3단계: 돌아갈 수 없는 선
  { id: "CT-B03", act: [3], priority: "상", once: true,
    cond: function(s,g,logs){
      var ht=0;
      try{var t=Save.get('ts_trust',{});if((t.haeun||0)>=65)ht++;if((t.doyun||0)>=65)ht++;if((t.sejin||0)>=65)ht++;if((t.jaehyuk||0)>=65)ht++}catch(e){}
      return g <= -13 && ht >= 2 && logs.length >= 6 && s.day >= 23 && logs.indexOf('LOG-050')<0;
    },
    msg: "[시스템 로그 — 비정상 패턴 감지]\n\nORACLE이 당신의 최근 의사결정 패턴을 분석한 보고서를 생성했습니다.\n결론: \"비효율적 독립 판단 증가 추세.\"\n\n서하은이 조용히 말합니다.\n\"지휘관님. 우리가 알게 된 것들... 이제 모른 척할 수 없습니다.\"\n\"돌아갈 수 없는 선을 넘고 있어요. 지휘관님도, 저희도.\"",
    left: { label: "알고 있다. 각오는 되어 있다", fx: { c: 0, r: 0, t: 2, o: -2 }, g: -3 },
    right: { label: "아직 결정한 건 아니다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1 } }

];
