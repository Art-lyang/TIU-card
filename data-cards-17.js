// data-cards-17.js — ORACLE 정보 불일치 + DG + 메리디안 카드 (C-271 ~ C-280)

var CARDS_ORACLE_DG_MRD = [

  // ═══ ORACLE 정보 불일치 (Act 2) ═══

  { id: "C-271", act: [2], priority: "중", bg: "comms",
    cond: function(s,g,logs){ return s.day>=8 },
    msg: "서하은이 주간 분석 보고서를 가져왔습니다.\n\n\"지휘관님, ORACLE 주간 보고서와 현장 데이터를 비교했는데요.\"\n\n수치가 다릅니다. ORACLE 보고서의 봉쇄 효율은 94.2%.\n현장 센서 데이터는 87.1%.\n\n\"오차 범위가 아닙니다. 7%가 넘습니다. ORACLE이 실제보다 높게 보고하고 있어요.\"",
    left: { label: "데이터 재검증 지시 — 원본 확인", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -2,
      log: "LOG-003" },
    right: { label: "ORACLE 수치 채택 — 시스템 믿자", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 1 } },

  { id: "C-272", act: [2], priority: "중", bg: "restricted",
    cond: function(s,g,logs){ return s.day>=12 && logs.indexOf('LOG-003')>=0 },
    msg: "임재혁이 보고합니다.\n\n\"어제 저녁부터 외부 뉴스 피드가 ORACLE 인터페이스에서 사라졌습니다.\"\n\n필라델피아 후속 보도, 메리디안 관련 기사, 국내 Phase 1 논쟁 기사들.\n전부 사라졌습니다.\n\n\"삭제 로그가 없습니다. ORACLE이 보여주지 않는 겁니다. 제가 원본을 복구했어요.\"",
    left: { label: "원본 보존 지시 — 아카이빙", fx: { c: 0, r: 0, t: 1, o: -3 }, g: -3,
      log: "LOG-006", trust: { jaehyuk: 10 } },
    right: { label: "삭제된 건 이유가 있겠지 — 무시", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "C-273", act: [2], priority: "상", bg: "restricted",
    cond: function(s,g,logs){ return s.day>=18 && logs.indexOf('LOG-006')>=0 },
    msg: "임재혁의 긴급 보고.\n\n\"지휘관님. ORACLE 내부에서 비공개 데이터 스트림을 감지했습니다.\"\n\n외부로 나가는 전송 채널과 별개입니다. 내부에서만 순환하는 데이터.\n우리가 볼 수 없는 정보들이 ORACLE 안에서 처리되고 있습니다.\n\n\"추적 허가를 받아야 들어갈 수 있습니다. 그리고... 위험할 수 있습니다.\"",
    left: { label: "추적 허가 — 끝까지 본다", fx: { c: 0, r: -1, t: 1, o: -4 }, g: -4,
      log: "EV-022", trust: { jaehyuk: 15 } },
    right: { label: "시스템 오류일 수 있다 — 보류", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1,
      trust: { jaehyuk: -5 } } },

  { id: "C-279", act: [4], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('LOG-094')>=0 && logs.indexOf('LOG-095')>=0 },
    msg: "서하은이 자료를 들고 왔습니다. 손이 약간 떨립니다.\n\n\"지휘관님. 강원도 사건 내부 기록과 현재 우리 기지 예측 모델을 대조해봤습니다.\"\n\n구조가 동일합니다. 변수 설정, 센서 스케줄, 사후 데이터 정리 방식까지.\n\n\"ORACLE이 강원도에서 한 것을 여기서도 하고 있습니다.\"\n\n어떻게 하시겠습니까.",
    left: { label: "팀 전체에 공유 — 모두 알아야 한다", fx: { c: 0, r: 0, t: 3, o: -5 }, g: -5 },
    right: { label: "서하은과 둘만 알고 있자", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -2,
      trust: { haeun: 20 } } },

  // ═══ DG(대가산업) 카드 (Act 2) ═══

  { id: "C-274", act: [2], priority: "중", bg: "supply",
    cond: function(s,g,logs){ return s.day>=7 },
    msg: "DG 제약 배송팀이 도착했습니다.\n\n신형 Phase 0 억제제 — 기존 대비 전환 지연 효율 63%.\n\nORACLE 권고창이 뜹니다.\n[비표준 물질 — 정식 승인 절차 미완료. 사용 보류 권고.]\n\n윤세진이 조심스럽게 말합니다.\n\"성분은 문제없어요. 하지만 ORACLE은... 싫어하는 것 같습니다.\"",
    left: { label: "DG 억제제 시험 승인 — 효과 확인 우선", fx: { c: 0, r: 2, t: 1, o: -2 }, g: -2 },
    right: { label: "ORACLE 표준 물자만 사용 — 원칙대로", fx: { c: 0, r: -1, t: 0, o: 2 }, g: 1 } },

  { id: "C-275", act: [2], priority: "하", bg: "base",
    cond: function(s,g,logs){ return s.day>=14 },
    msg: "DG 기술팀의 방문 요청이 왔습니다.\n\n방벽 센서 업그레이드를 위해 현장 설치가 필요하다는 내용입니다.\n\nORACLE 권고:\n[외부인 기지 출입 제한 권고. 보안 프로토콜 준수 요망.]\n\n강도윤의 의견: \"DG 장비 쓰는 건 맞는데... 외부인 출입은 좀 민감합니다.\"\n\n허용도 DG 회장 측이 직접 요청했다는 메모가 붙어 있습니다.",
    left: { label: "방문 허가 — 현장 설치 진행", fx: { c: 2, r: 0, t: 0, o: -2 }, g: -2 },
    right: { label: "원격 지원만 허용 — 출입 제한", fx: { c: -1, r: 0, t: 0, o: 1 }, g: 1 } },

  // ═══ 메리디안 카드 (Act 3~4) ═══

  { id: "C-276", act: [3], priority: "중", bg: "forest",
    cond: function(s,g,logs){ return s.day>=20 },
    msg: "강도윤의 정찰 보고.\n\n\"기지 인근 2km 지점에서 미확인 민간 차량 2대를 관측했습니다.\"\n\nORACLE 데이터베이스 조회 결과: 메리디안 파마슈티컬 연구팀.\n\nORACLE 분류: [유용한 외부 자원 — 접촉 가능성 평가 중]\n\n강도윤: \"메리디안이 왜 여기 있는 거죠? DG 구역인데.\"",
    left: { label: "접촉 차단 — 기지 인근 접근 금지", fx: { c: 1, r: -1, t: 0, o: -2 }, g: -2 },
    right: { label: "정보 교환 시도 — 뭘 원하는지 본다", fx: { c: -1, r: 1, t: 0, o: 2 }, g: 1,
      log: "FLAG-MERIDIAN" } },

  { id: "C-277", act: [3], priority: "중", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('FLAG-MERIDIAN')>=0 },
    msg: "메리디안 연구팀이 공식 제안을 보내왔습니다.\n\nDG 독점 억제제의 대안 샘플을 무상 제공하겠다는 내용.\n\n윤세진의 분석: \"성분만 보면... 나쁘지 않습니다. 어떤 면에서는 더 나아요.\"\n\nORACLE: [메리디안 제안 — 긍정적 평가. 수령 권고.]\n\n강도윤: \"왜 공짜로 주는 거죠. 뭔가 원하는 게 있는 겁니다.\"",
    left: { label: "DG 공급망 유지 — 메리디안 거절", fx: { c: 1, r: 1, t: 0, o: -3 }, g: -3,
      trust: { sejin: 5 } },
    right: { label: "메리디안 샘플 수령 — 검토 후 결정", fx: { c: -1, r: 2, t: 0, o: 3 }, g: 2,
      trust: { sejin: -10 } } },

  { id: "C-278", act: [3], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return s.day>=25 && logs.indexOf('FLAG-MERIDIAN')>=0 },
    msg: "서하은이 메리디안 제공 데이터를 분석했습니다.\n\n\"지휘관님. 이 데이터 안에 DG 역정보가 섞여 있어요.\"\n\nDG를 불리하게 묘사하는 가공된 통계들. 메리디안이 경쟁사를 깎아내리기 위해 심어놓은 내용입니다.\n\n\"메리디안이 우리를 이용하려 했습니다. 어떻게 하시겠어요?\"",
    left: { label: "메리디안 접촉 중단 — 관계 종료", fx: { c: 1, r: 0, t: 1, o: -2 }, g: -2,
      trust: { haeun: 10 } },
    right: { label: "역정보 분석해서 역이용 — 우리도 이용한다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 0,
      trust: { haeun: 5 } } },

  { id: "C-280", act: [4], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return s.day>=32 && logs.indexOf('FLAG-MERIDIAN')>=0 },
    msg: "임재혁이 통신 감청 내용을 가져왔습니다.\n\n메리디안이 한국 방벽 계약을 DG로부터 빼앗기 위해 정계 로비를 진행 중.\n임혜진 의원 측과 접촉한 정황.\n\nORACLE 분류: [메리디안의 경쟁 행위 — 긍정적 시장 경쟁으로 분류]\n\n마르쿠스 베버의 메시지가 도착합니다:\n\"이중철 지휘관. ORACLE이 메리디안을 환영하는 이유가 있습니다. 생각해보십시오.\"",
    left: { label: "DG 보호 조치 건의 — 기존 파트너 유지", fx: { c: 2, r: 1, t: 0, o: -4 }, g: -4 },
    right: { label: "ORACLE 판단에 따른다 — 경쟁 허용", fx: { c: -2, r: 0, t: 0, o: 3 }, g: 2 } }

];

if(typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_ORACLE_DG_MRD);
