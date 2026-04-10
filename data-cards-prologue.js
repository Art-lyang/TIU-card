// data-cards-prologue.js — 새 Act 1: 프롤로그 & 일상 (CA-001~CA-018)
// 컨셉: 기지 소개 + 일상 운영 + ORACLE 유능함 → 미세 이상 징후
// 주의: 임재혁 조사 테이블 없음. introOk 필터 고려해 초반 카드는 직책 표기 우선.

var CARDS_PROLOGUE = [

  // ═══ 기지 적응 / 도착 (CA-001~CA-006) ═══
  { id: "CA-001", act: [1], priority: "중", bg: "base",
    msg: "기지 도착 첫날.\n\n[ORACLE: 지휘관 이중철 취임을 기록합니다. KR-INIT-001 운영 정상화 절차를 개시합니다. 초기화 완료율 97.1%.]\n\n간부진이 사무실 앞에 정렬해 있습니다.",
    left: { label: "즉시 현황 보고 받기", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "먼저 기지를 직접 둘러보겠다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },

  { id: "CA-002", act: [1], priority: "하", bg: "base",
    msg: "부지휘관이 3개월간의 공백 기간 운영 개요를 설명합니다.\n\n\"ORACLE 지시만으로 운영했습니다. 기지 기능은 유지됐지만, 판단이 필요한 부분들은 보류 상태입니다.\"\n\n[ORACLE: 보류 항목 12건. 우선순위 자동 분류 완료. 지휘관 결재를 요청합니다.]",
    left: { label: "ORACLE 분류 그대로 처리", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "부지휘관과 함께 직접 검토", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 } },

  { id: "CA-003", act: [1], priority: "하", bg: "comms",
    msg: "기술관이 ORACLE 단말기 앞에 서 있습니다.\n\n\"지휘관님, ORACLE 시스템 소개드릴까요? 솔직히 이 규모의 기지에 이 수준의 AI는 과분합니다. 어떤 질문이든 물어보시면 됩니다.\"\n\n[ORACLE: 초기 적응 지원 모드를 활성화합니다.]",
    left: { label: "소개받겠다", fx: { c: 0, r: 0, t: 1, o: 1 }, g: 1 },
    right: { label: "나중에. 현장부터 확인한다", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -1 } },

  { id: "CA-004", act: [1], priority: "하", bg: "forest",
    msg: "현장요원이 봉쇄선 외부를 안내합니다.\n\n\"동측 순찰 루트입니다. 이변체 활동 징후 없음.\"\n\n[ORACLE: 봉쇄선 안정도 93%. 현재 위협도 LOW. 특이사항 없습니다.]\n\n거울처럼 잔잔한 숲입니다.",
    left: { label: "루트 점검 승인", fx: { c: 1, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "ORACLE 감시망으로 보완", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-005", act: [1], priority: "하", bg: "lab",
    msg: "연구원이 연구실을 소개합니다.\n\n\"현재 활성 샘플은 없고요. ORACLE이 위협도를 낮게 평가해서 그런지, 요즘은 조용합니다.\"\n\n[ORACLE: 이변체 활동 지수 0.7. 역대 최저 수준입니다.]",
    left: { label: "연구 현황 보고 받기", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 },
    right: { label: "ORACLE 평가 기준 열람", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-006", act: [1], priority: "하", bg: "supply",
    msg: "[ORACLE: 오늘의 작전 권고 — 봉쇄선 동측 경량 감시 강화, 보급 예비량 재고 확인.]\n\n모든 항목이 우선순위별로 정렬되어 있습니다.\n\n[ORACLE: 위협도 LOW. 예측 신뢰도 97.1%. 권고 이행 시 기지 안정성 +2 예상.]",
    left: { label: "권고대로 진행", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 2 },
    right: { label: "직접 판단하겠다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 } },

  // ═══ 일상 운영 (CA-007~CA-013) ═══
  { id: "CA-007", act: [1], priority: "하", bg: "supply",
    msg: "보급 트럭이 예정 시간보다 20분 일찍 도착했습니다.\n\n[ORACLE: 보급 내역 자동 검증 완료. 식량 11일분, 연료 정상, 의약품 D+등급. 권고 배분 방식을 선택하십시오.]\n\n강도윤: \"이번엔 딱 맞게 왔네요.\"",
    left: { label: "의약품 우선 배분", fx: { c: 0, r: 2, t: 1, o: 0 }, g: 0 },
    right: { label: "ORACLE 권고 배분 방식", fx: { c: 0, r: 2, t: 0, o: 1 }, g: 1 } },

  { id: "CA-008", act: [1], priority: "하", bg: "base",
    msg: "임재혁이 기지 전력 시스템 업그레이드를 제안합니다.\n\n\"비상 발전기 회로가 노후화됐습니다. ORACLE이 교체 우선순위 목록도 뽑아줬는데요. 꽤 정확합니다.\"\n\n[ORACLE: 교체 비용 추정 — 자원 -2. 완료 시 기지 안정성 향상 예상.]",
    left: { label: "업그레이드 승인", fx: { c: 1, r: -2, t: 0, o: 1 }, g: 1 },
    right: { label: "현재 수준 유지", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "CA-009", act: [1], priority: "하", bg: "base",
    msg: "요원들이 첫 정규 훈련을 실시합니다.\n\n강도윤: \"이변체 대응 기초 훈련입니다. 실전 기준으로 가겠습니다.\"\n\n[ORACLE: 훈련 프로토콜 A-3 권고. 부상 위험도 최소화 구성입니다.]",
    left: { label: "강도윤 방식대로", fx: { c: 0, r: 0, t: 2, o: 0 }, g: 0 },
    right: { label: "ORACLE 프로토콜 적용", fx: { c: 1, r: -1, t: 0, o: 2 }, g: 2 } },

  { id: "CA-010", act: [1], priority: "하", bg: "weather", tag: "weather",
    msg: "기상 예보: 이틀간 맑음.\n\n[ORACLE: 최적 외부 작업 기간. 봉쇄선 점검 및 정비를 권고합니다. 현재 창문은 2일입니다.]\n\n서하은: \"기상도 예측이 ORACLE이 뽑은 것과 거의 같았습니다. 역시 정확하네요.\"",
    left: { label: "봉쇄선 전면 점검", fx: { c: 2, r: -1, t: 1, o: 1 }, g: 1 },
    right: { label: "내부 정비 우선", fx: { c: 1, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "CA-011", act: [1], priority: "중", bg: "forest",
    msg: "봉쇄선 서측에서 야생동물 이동 패턴이 감지되었습니다.\n\n[ORACLE: 이변체 활동과 무관합니다. 계절 이동으로 분류. 대응 불필요.]\n\n강도윤: \"현장에서 봐도 그냥 고라니 떼였습니다.\"",
    left: { label: "현장 기록은 남기겠다", fx: { c: 1, r: 0, t: 0, o: 0 }, g: -1 },
    right: { label: "ORACLE 분류 그대로 처리", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-012", act: [1], priority: "하", bg: "lab",
    msg: "윤세진이 이번 주 EV-Σ 관찰 데이터를 정리했습니다.\n\n\"위협도는 낮은데... 활동 반경이 평소보다 좁은 게 좀 이상하다는 생각은 들어요.\"\n\n[ORACLE: 계절 요인으로 정상 범주. 추가 조치 불필요.]",
    left: { label: "추가 관찰 기간 부여", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -1 },
    right: { label: "ORACLE 판단 따르기", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 } },

  { id: "CA-013", act: [1], priority: "중", bg: "forest",
    msg: "봉쇄선 북측 외곽에서 낙뢰로 인한 감시 카메라 손상이 보고됐습니다.\n\n[ORACLE: 현장 점검 및 임시 수리를 권고합니다. 위협도 LOW.]\n\n강도윤: \"제가 나가겠습니다.\"",
    left: { label: "강도윤 파견", fx: { c: 1, r: -1, t: 1, o: 0 }, g: 0, mission: "M-001" },
    right: { label: "원격 임시 조치만", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // ═══ ORACLE 이상 징후 — Act 1 후반 (CA-014~CA-018) ═══
  { id: "CA-014", act: [1], priority: "하", bg: "comms",
    req: function(s){ return s.day >= 2 },
    msg: "임재혁이 시스템 로그를 확인하다 잠시 멈췄습니다.\n\n\"지휘관님, 어제 02:17분에 ORACLE 응답이 0.8초 지연됐습니다. 기록상 처음이에요.\"\n\n잠깐 침묵이 흘렀습니다.\n\n\"...아마 서버 부하겠죠. 별거 아닐 겁니다.\"",
    left: { label: "기록해두라고 한다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 },
    right: { label: "정상 범주로 처리", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 1 } },

  { id: "CA-015", act: [1], priority: "하", bg: "comms",
    req: function(s){ return s.day >= 2 },
    msg: "[ORACLE: 봉쇄선 서측 이상 반응 감지.]\n\n강도윤이 확인하고 돌아왔습니다.\n\n\"이상 없습니다. 아까 제가 직접 점검하고 온 구역이에요.\"\n\n잠시 후 단말기가 자동 업데이트됩니다.\n\n[ORACLE: 경보 취소. 오감지로 분류 완료.]",
    left: { label: "기록은 남겨두겠다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 },
    right: { label: "오감지로 처리", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-016", act: [1], priority: "중", bg: "base",
    req: function(s){ return s.day >= 3 },
    msg: "서하은이 ORACLE 데이터 요약본을 검토하다 화면을 응시했습니다.\n\n\"이상하다고 할 정도는 아닌데요. 같은 시간대 데이터인데 요약본이랑 원본이 수치가 살짝 다릅니다.\"\n\n\"...제가 잘못 읽은 거겠죠.\"",
    left: { label: "같이 다시 확인해보자", fx: { c: 0, r: 0, t: 2, o: -2 }, g: -3 },
    right: { label: "재확인은 불필요하다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-017", act: [1], priority: "중", bg: "base",
    req: function(s){ return s.day >= 3 },
    msg: "야간 점검 중 기지 내부 온도 센서가 잠깐 이상값을 표시했습니다.\n\n[ORACLE: 센서 캘리브레이션 오류. 자동 보정 완료.]\n\n임재혁: \"뭐... ORACLE이 알아서 처리하긴 했는데요.\"\n\n그가 조금 오래 화면을 바라봅니다.",
    left: { label: "센서 수동 점검 지시", fx: { c: 0, r: -1, t: 0, o: -1 }, g: -2 },
    right: { label: "ORACLE이 처리했으니 넘어가자", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "CA-018", act: [1], priority: "상", bg: "comms",
    req: function(s){ return s.day >= 4 },
    msg: "[ORACLE: 주간 운영 요약. 모든 지표 정상. 지휘관 적응도 평가: 상.]\n\n화면 하단에 짧은 문구가 깜박입니다.\n\n[OBSERVER NOTE: 편차 0.4% — 분류 보류]\n\n0.3초 후 문구가 사라졌습니다.\n\n단말기가 평소처럼 돌아갑니다.",
    left: { label: "...지금 뭔가 봤다. 기록한다", fx: { c: 0, r: 0, t: 0, o: -3 }, g: -5 },
    right: { label: "화면 잔상으로 처리한다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

];
