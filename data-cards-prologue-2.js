// data-cards-prologue-2.js — Act 1 일상 운영 보충 풀 (CA-019~CA-033)
// 분리 원본: data-cards-prologue.js
// 컨셉: ORACLE 언급 없음. 카드 소진 시 순환용.
// 의존: data-cards-prologue.js (CARDS_PROLOGUE 선언)

if (typeof CARDS_PROLOGUE !== 'undefined') {
  CARDS_PROLOGUE.push(

    // ── 기지 보수 (tag: "repair") ──
    { id: "CA-019", act: [1], priority: "하", bg: "base", tag: "repair",
      msg: "정비팀이 기지 내 급수관에서 소규모 누수를 발견했습니다.\n\n\"수압에는 지장 없습니다. 빠르게 고치면 이틀이면 됩니다.\"\n\n임재혁이 교체 부품 목록을 들고 대기 중입니다.",
      left: { label: "즉시 수리 지시", fx: { c: 1, r: -1, t: 1, o: 0 }, g: 0 },
      right: { label: "방수 테이프로 임시 처리", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1 } },

    { id: "CA-020", act: [1], priority: "하", bg: "base", tag: "repair",
      msg: "기지 동측 외벽에서 동파로 인한 균열이 발견됐습니다.\n\n\"지금 당장 위험한 수준은 아닙니다.\"\n\n강도윤: \"보수 자재는 충분합니다. 언제 할까요?\"",
      left: { label: "즉시 보수 작업", fx: { c: 1, r: -1, t: 1, o: 0 }, g: 0 },
      right: { label: "다음 보급 때까지 대기", fx: { c: 0, r: 0, t: -1, o: 0 }, g: -1 } },

    { id: "CA-021", act: [1], priority: "하", bg: "supply",
      msg: "보급 담당이 창고 재고 전수 조사를 건의합니다.\n\n\"3개월째 손을 못 댔습니다. 없어진 물자가 있는지도 파악이 안 됩니다.\"\n\n하루를 투자하면 전체 파악이 가능합니다.",
      left: { label: "전수 조사 실시", fx: { c: 0, r: 1, t: 1, o: 0 }, g: 0 },
      right: { label: "현행 유지 — 나중에", fx: { c: 0, r: 0, t: -1, o: 0 }, g: -1 } },

    { id: "CA-022", act: [1], priority: "하", bg: "base", tag: "repair",
      msg: "정기 안전 점검 결과, 비상구 두 곳의 잠금장치가 녹슬어 작동 불량 판정이 났습니다.\n\n강도윤: \"비상 시에 열 수 없으면 의미가 없습니다.\"",
      left: { label: "즉시 교체", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 },
      right: { label: "다음 정기 점검 때 처리", fx: { c: -1, r: 0, t: -1, o: 0 }, g: -1 } },

    // ── 날씨 (tag: "weather") ──
    { id: "CA-023", act: [1], priority: "하", bg: "weather", tag: "weather",
      msg: "예보에 없던 소나기가 내리기 시작했습니다.\n\n봉쇄선 외곽에서 작업 중인 팀이 있습니다.\n\n강도윤: \"우비는 충분합니다. 어떻게 할까요?\"",
      left: { label: "즉시 복귀 명령", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      right: { label: "우비 지급 후 작업 계속", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 } },

    { id: "CA-024", act: [1], priority: "하", bg: "weather", tag: "weather",
      msg: "오전부터 짙은 안개가 봉쇄선 일대를 뒤덮었습니다.\n\n\"시야가 30미터도 안 됩니다. 순찰 주기를 어떻게 할까요?\"\n\n강도윤이 기다리고 있습니다.",
      left: { label: "순찰 빈도 2배 증가", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 },
      right: { label: "시야 확보 시까지 대기", fx: { c: -1, r: 0, t: 0, o: 0 }, g: -1 } },

    { id: "CA-025", act: [1], priority: "하", bg: "weather", tag: "weather",
      msg: "내일 새벽까지 초속 18m 이상의 강풍이 예상됩니다.\n\n\"외부 장비들 수납하거나 고정해야 합니다.\"\n\n임재혁이 우선순위 목록을 정리해 왔습니다.",
      left: { label: "전면 수납 작업 지시", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
      right: { label: "야외 장비만 고정", fx: { c: -1, r: 0, t: 0, o: 0 }, g: -1 } },

    { id: "CA-026", act: [1], priority: "하", bg: "weather", tag: "weather",
      msg: "기상청 특보 — 오늘 밤 첫서리 예상.\n\n\"작년에 배관 동결 파열이 있었습니다. 보온 처리가 필요합니다.\"\n\n임재혁: \"지금 나가면 두 시간이면 됩니다.\"",
      left: { label: "보온 작업 즉시 실시", fx: { c: 1, r: -1, t: 1, o: 0 }, g: 0 },
      right: { label: "올해는 괜찮겠지", fx: { c: 0, r: 0, t: -1, o: 0 }, g: -1 } },

    // ── 자원 보급 (tag: "supply_ops") ──
    { id: "CA-027", act: [1], priority: "하", bg: "supply", tag: "supply_ops",
      msg: "이번 달 연료 소비량이 예상보다 35% 많습니다.\n\n\"이대로면 다음 보급 전에 바닥납니다.\"\n\n강도윤: \"어느 정도 절약하면 버틸 수 있습니다.\"",
      left: { label: "소비 절감 지침 시행", fx: { c: -1, r: 1, t: 0, o: 0 }, g: 0 },
      right: { label: "긴급 추가 보급 요청", fx: { c: 0, r: -2, t: 0, o: 0 }, g: -1 } },

    { id: "CA-028", act: [1], priority: "하", bg: "supply", tag: "supply_ops",
      msg: "냉동 창고 점검 중 유통기한 2주 내 만료 식량이 다량 발견됐습니다.\n\n\"지금 배식하거나, 폐기하거나 선택해야 합니다.\"",
      left: { label: "즉시 추가 배식 실시", fx: { c: 0, r: 1, t: 1, o: 0 }, g: 0 },
      right: { label: "기준 준수 — 폐기 처리", fx: { c: 0, r: -2, t: 0, o: 0 }, g: -1 } },

    { id: "CA-029", act: [1], priority: "하", bg: "base", tag: "supply_ops",
      msg: "의무실 재고 점검 결과, 소독제와 항생제가 기준치의 40% 수준입니다.\n\n\"부상자 발생 시 대응이 어렵습니다.\"\n\n의무 담당이 긴급 보충을 요청합니다.",
      left: { label: "긴급 보충 요청 승인", fx: { c: 0, r: -1, t: 1, o: 0 }, g: 0 },
      right: { label: "현 보유분 철저히 관리", fx: { c: 0, r: 0, t: -1, o: 0 }, g: -1 } },

    { id: "CA-030", act: [1], priority: "하", bg: "supply", tag: "supply_ops",
      msg: "이번 주 보급 차량이 도로 공사로 3일 지연된다는 통보가 들어왔습니다.\n\n\"현재 재고로 버텨야 합니다.\"\n\n서하은: \"어떻게 대응할까요?\"",
      left: { label: "배급 제한 시행", fx: { c: 0, r: 0, t: -1, o: 0 }, g: -1 },
      right: { label: "비상 예비량 선투입", fx: { c: 0, r: -2, t: 1, o: 0 }, g: 0 } },

    // ── 인원 / 일상 운영 ──
    { id: "CA-031", act: [1], priority: "하", bg: "base",
      msg: "야간 당직자 피로 누적이 심각해졌습니다. 강도윤이 편성 조정을 요청합니다.\n\n\"2인 1조로 바꾸면 피로는 줄지만 주간 인력이 줄어듭니다.\"",
      left: { label: "2인 1조로 조정", fx: { c: 1, r: -1, t: 2, o: 0 }, g: 0 },
      right: { label: "현행 유지", fx: { c: 0, r: 0, t: -2, o: 0 }, g: -1 } },

    { id: "CA-032", act: [1], priority: "하", bg: "base",
      msg: "서하은이 요원들의 피로도 지표를 보고합니다.\n\n\"평균 수면이 5.2시간입니다. 이 추세면 실수가 납니다.\"\n\n교대 휴식 일정 도입을 제안합니다.",
      left: { label: "교대 휴식 일정 시행", fx: { c: -1, r: 0, t: 2, o: 0 }, g: 0 },
      right: { label: "임무 우선 — 일정 유지", fx: { c: 0, r: 0, t: -2, o: 0 }, g: -1 } },

    { id: "CA-033", act: [1], priority: "하", bg: "base",
      msg: "기지 내 훈련장 장비 일부가 노후화로 사용 불가 판정을 받았습니다.\n\n강도윤: \"낡은 장비로 훈련하다간 부상이 납니다. 교체하고 싶습니다.\"",
      left: { label: "교체 승인", fx: { c: 1, r: -1, t: 1, o: 0 }, g: 0 },
      right: { label: "보수 후 계속 사용", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } }

  );
}
