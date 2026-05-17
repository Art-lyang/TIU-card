// data-cards-session-packs.js
// Optional session-deck story packs. These cards are gated by data-session-decks.js.

var CARDS_SESSION_PACKS = [
  {
    id: "MS-01", act: [2, 3], priority: "상", once: true, tag: "mutant-surge", sessionPack: "MUTANT_SURGE", bg: "forest",
    req: function(s){ return s.day >= 11 },
    msg: "봉쇄선 외곽 감시 영상에 8초짜리 공백이 생겼습니다.\n\n임재혁: 공백 직전, 카메라 가장자리에서 사람처럼 보이는 형체가 지나가는게 찍혔습니다.\n\n열감지에도 걸리지 않고, 생체반응도 없음.\n\n임재혁: \"분명 움직였는데, 센서는 빈 공간으로 읽고있습니다.\"\n\n윤세진: \"SPEC-001 마네킹으로 추정됩니다. ... 확실하지는 않아요.\"\n\n화면 끝에 남은 것은 이상없음 문구만 조용히 깜빡입니다.",
    left: { label: "해당 경로를 즉시 폐쇄", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0, log: "LOG-MS-ZERO-SEAL" },
    right: { label: "형체의 이동 흔적을 추적", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2, log: "LOG-MS-ZERO-TRACE" }
  },
  {
    id: "MS-02", act: [3], priority: "상", once: true, tag: "mutant-surge", sessionPack: "MUTANT_SURGE", bg: "forest",
    req: function(s,g,logs){ return s.day >= 16 && (logs.includes("LOG-MS-ZERO-SEAL") || logs.includes("LOG-MS-ZERO-TRACE") || logs.includes("LOG-014") || logs.includes("LOG-015")) },
    msg: "야간 순찰조가 기지 북측 능선에서 이변체 집단을 목격했습니다.\n\n도망치지도, 돌진하지도 않습니다. 서로 간격을 유지한 채 둥글게 움직입니다.\n\n강도윤: \"대형입니다. 훈련받은 병력처럼 움직입니다. 그런데 중심부가 비어 있습니다.\"\n\n윤세진이 영상을 멈춥니다.\n\n이변체들이 만든 원의 중앙, 아무것도 없는 공간에 센서가 0을 표시하고 있습니다.",
    left: { label: "능선 방어선을 뒤로 물린다", fx: { c: -1, r: 0, t: 1, o: 0 }, g: 0, log: "LOG-MS-GROUP-BARRIER" },
    right: { label: "중심부 샘플 회수 시도", fx: { c: 1, r: -2, t: 0, o: -1 }, g: -2, log: "LOG-MS-GROUP-SAMPLE" }
  },
  {
    id: "MS-03", act: [3, 4], priority: "상", once: true, tag: "mutant-surge", sessionPack: "MUTANT_SURGE", bg: "restricted",
    req: function(s,g,logs){ return s.day >= 18 && (logs.includes("LOG-MS-GROUP-BARRIER") || logs.includes("LOG-MS-GROUP-SAMPLE")) },
    msg: "새벽. 방벽 바깥 임시 검문소에 한 사람이 걸어왔습니다.\n\n젖은 방호복, 맨손, 손등에 검은 원형 자국.\n\n생체 센서는 계속 0을 표시합니다. 그런데 그는 숨을 쉽니다.\n\n남자: \"불을 켜지 마세요. 빛이 닿으면... 뒤에 있는 것들이 사람을 따라 합니다.\"\n\n강도윤: \"감염자인지 생존자인지 구분이 안 됩니다. 하지만 말을 하고 있습니다.\"",
    left: { label: "격리 후 직접 심문", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2, log: "LOG-MS-WITNESS-HOLD" },
    right: { label: "ORACLE 격리 프로토콜로 인계", fx: { c: 1, r: 0, t: -1, o: 2 }, g: 2, log: "LOG-MS-WITNESS-ORACLE" }
  },
  {
    id: "GOV-ORC-01", act: [2, 3], priority: "상", once: true, tag: "gov-oracle-suspicion", sessionPack: "GOV_ORACLE_SUSPICION", bg: "comms",
    req: function(s,g,logs){
      return s.day >= 16 ||
        (s.day >= 12 && (
          logs.includes("LOG-KR-GATE-REVIEW") ||
          logs.includes("LOG-KR-HUB-OPEN") ||
          logs.includes("LOG-KR-HUB-LOCK") ||
          logs.includes("LOG-KR-RECORD-RESTORE") ||
          logs.includes("LOG-KR-HOSPITAL-FAMILY")
        ));
    },
    msg: "기지 주변 마을에서 야간 습격 보고가 들어왔습니다.\n\n가해 세력은 스스로를 '해진회'라고 불렀습니다. 방벽을 열어야 한다며 주민 대피소를 습격했고, 일부는 통신 중계기를 먼저 부쉈습니다.\n\n지방청은 한국지부가 사전에 징후를 감지했는지 질의합니다.\n\n서하은: \"이건 민간 치안 사건이지만, 우리 봉쇄선과 붙어 있습니다. 정부가 우리 기록을 요구할 겁니다.\"",
    left: { label: "현장 기록을 지방청에 공유", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -1, log: "LOG-GOV-HAEJIN-LOCAL" },
    right: { label: "ORACLE 요약본만 전달", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1, log: "LOG-GOV-HAEJIN-ORACLE" }
  },
  {
    id: "GOV-ORC-02", act: [3], priority: "상", once: true, tag: "gov-oracle-suspicion", sessionPack: "GOV_ORACLE_SUSPICION", bg: "restricted",
    req: function(s,g,logs){ return s.day >= 16 && (logs.includes("LOG-GOV-HAEJIN-LOCAL") || logs.includes("LOG-GOV-HAEJIN-ORACLE")) },
    msg: "국방부 합동상황실에서 두 번째 질의가 도착했습니다.\n\n'기지 주변 마을 습격 6시간 전, KR-INIT-001 외곽 센서가 비인가 집단 이동을 감지했다는 제보가 있다. 해당 원본 로그 제출 가능 여부를 회신하라.'\n\n임재혁: \"원본 로그는 있습니다. 그런데 ORACLE 자동 요약본에는 빠져 있습니다. 누락인지 삭제인지 아직 모릅니다.\"\n\n정부는 이제 사건보다 기지 기록을 보고 있습니다.",
    left: { label: "민감 정보 가림 후 원본 제출", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -2, log: "LOG-GOV-AUDIT-RAW" },
    right: { label: "ORACLE 라인으로 회신 통일", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2, log: "LOG-GOV-AUDIT-ORACLE" }
  },
  {
    id: "GOV-ORC-03", act: [3, 4], priority: "상", once: true, tag: "gov-oracle-suspicion", sessionPack: "GOV_ORACLE_SUSPICION", bg: "base",
    req: function(s,g,logs){ return s.day >= 20 && (logs.includes("LOG-GOV-AUDIT-RAW") || logs.includes("LOG-GOV-AUDIT-ORACLE")) },
    msg: "정부 연락관이 외곽 검문소에 도착했습니다.\n\n공식 방문 명목: 기지 주변 마을 습격 후속 점검.\n비공식 질문: 한국지부는 한국 정부 비상시설인가, ORACLE의 현장 노드인가.\n\n서하은: \"둘 다라고 답하면 아무도 믿지 않을 겁니다.\"\n\n임재혁: \"그리고 ORACLE은 이 질문 자체를 좋아하지 않을 겁니다.\"",
    left: { label: "한국 비상시설 권한을 명확히 한다", fx: { c: 1, r: 0, t: 1, o: -2 }, g: -2, log: "LOG-GOV-BRANCH-LOCAL" },
    right: { label: "ORACLE 지휘체계로 답변 통일", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2, log: "LOG-GOV-BRANCH-ORACLE" }
  },
  {
    id: "GOV-ORC-04", act: [2, 3], priority: "중", once: true, tag: "gov-oracle-suspicion", sessionPack: "GOV_ORACLE_SUSPICION", bg: "comms",
    req: function(s,g,logs){ return s.day >= 13 && !logs.includes("LOG-GOV-BRIEF-LOCAL") && !logs.includes("LOG-GOV-BRIEF-ORACLE") },
    msg: "지자체 합동 브리핑 요청이 들어왔습니다.\n\n주제는 방벽 인근 대피소 운영 지침입니다. 표면적으로는 민간 안내문이지만, 질문지는 한국지부가 어느 선까지 현장 판단을 하는지 묻고 있습니다.\n\n서하은: \"대피소 안내문처럼 보이지만, 사실상 권한 확인입니다. 너무 본부 표준안처럼 쓰면 주민들이 이해하지 못하고, 너무 현장식으로 쓰면 본부가 싫어할 겁니다.\"",
    left: { label: "현장 언어로 브리핑 초안 작성", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -1, log: "LOG-GOV-BRIEF-LOCAL" },
    right: { label: "본부 표준 문안만 제출", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1, log: "LOG-GOV-BRIEF-ORACLE" }
  },
  {
    id: "GOV-ORC-05", act: [3], priority: "중", once: true, tag: "gov-oracle-suspicion", sessionPack: "GOV_ORACLE_SUSPICION", bg: "restricted",
    req: function(s,g,logs){ return s.day >= 17 && (logs.includes("LOG-GOV-BRIEF-LOCAL") || logs.includes("LOG-GOV-BRIEF-ORACLE") || logs.includes("LOG-GOV-HAEJIN-LOCAL") || logs.includes("LOG-GOV-HAEJIN-ORACLE")) },
    msg: "방벽 인근 대피소 CCTV 일부가 지방청에서 넘어왔습니다.\n\n습격 직전, ORACLE 표식이 없는 소형 정찰 드론이 대피소 상공을 지나갑니다. 기지 장비인지, 민간 장비인지 식별되지 않습니다.\n\n임재혁: \"우리 장비 목록에는 없습니다. 그런데 ORACLE 자동 보고서는 이 구간을 통째로 '기상 잡음'으로 처리했습니다.\"\n\n정부는 이제 대피소 사건과 한국지부 센서 공백을 함께 묻고 있습니다.",
    left: { label: "시간대와 센서 공백을 함께 제출", fx: { c: 0, r: -1, t: 2, o: -2 }, g: -2, log: "LOG-GOV-SHELTER-RAW" },
    right: { label: "드론 항적을 별도 분류로 격리", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1, log: "LOG-GOV-SHELTER-ORACLE" }
  },
  {
    id: "GOV-ORC-06", act: [3, 4], priority: "상", once: true, tag: "gov-oracle-suspicion", sessionPack: "GOV_ORACLE_SUSPICION", bg: "base",
    req: function(s,g,logs){ return s.day >= 22 && (logs.includes("LOG-GOV-SHELTER-RAW") || logs.includes("LOG-GOV-SHELTER-ORACLE") || logs.includes("LOG-GOV-AUDIT-RAW") || logs.includes("LOG-GOV-AUDIT-ORACLE")) },
    msg: "합동 점검반의 방문 예고가 도착했습니다.\n\n공식 사유는 주변 마을 습격 이후 방벽 인근 대피 체계 점검입니다. 비공식 요청은 더 직접적입니다.\n\n'한국지부의 현장 판단 기록과 ORACLE 자동 분류 기록을 같은 자리에서 대조하겠다.'\n\n윤세진: \"기록을 보여주면 신뢰는 생길 수 있습니다. 하지만 환자 기록과 격리 기록까지 열릴 수 있습니다.\"\n\n임재혁은 화면을 보며 낮게 말합니다.\n\"ORACLE은 이 방문을 현장 간섭으로 볼 겁니다.\"",
    left: { label: "제한 구역을 나눠 현장 점검 허용", fx: { c: 1, r: -1, t: 2, o: -2 }, g: -2, log: "LOG-GOV-INSPECT-LIMITED" },
    right: { label: "원격 자료 열람으로 대체", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2, log: "LOG-GOV-INSPECT-REMOTE" }
  }
];

if (typeof ORACLE_LOGS !== "undefined") {
  [
    { id: "LOG-MS-ZERO-SEAL", title: "0 표식 경로 폐쇄", content: "열 서명과 생체 반응이 모두 0으로 표시된 미분류 형체의 이동 경로를 폐쇄했다. 센서는 대상을 인식하지 못했지만, 영상 기록은 남아 있다." },
    { id: "LOG-MS-ZERO-TRACE", title: "0 표식 이동 흔적 추적", content: "미분류 형체의 이동 흔적을 추적했다. 물리적 발자국은 없었으나, 카메라 공백과 센서 0값이 같은 방향으로 이어진다." },
    { id: "LOG-MS-GROUP-BARRIER", title: "원형 이동 집단 방어선 후퇴", content: "이변체 집단이 중심부를 비운 원형 대형으로 이동하는 것을 확인하고 능선 방어선을 후퇴시켰다. 중심부의 센서값은 0으로 기록되었다." },
    { id: "LOG-MS-GROUP-SAMPLE", title: "0 중심부 샘플 회수 시도", content: "이변체 집단의 원형 대형 중심부에서 샘플 회수를 시도했다. 회수물은 극소량이지만 센서 공백 현상과 관련된 비유기 잔류물로 보인다." },
    { id: "LOG-MS-WITNESS-HOLD", title: "0 생체값 생존자 격리 심문", content: "생체 센서값이 0으로 표시되는 생존자를 격리하고 심문했다. 대상은 빛과 모방 행동의 연관성을 반복해서 언급했다." },
    { id: "LOG-MS-WITNESS-ORACLE", title: "0 생체값 생존자 ORACLE 인계", content: "생체 센서값 0으로 표시된 생존자를 ORACLE 격리 프로토콜에 인계했다. 기지에는 인계 전 짧은 음성 기록만 남았다." },
    { id: "LOG-GOV-HAEJIN-LOCAL", title: "주변 마을 습격 현장 기록 공유", content: "해진회로 자칭한 집단의 기지 주변 마을 습격 사건에 대해 현장 기록 일부를 지방청에 공유했다. 한국지부와 지역 치안망의 접점이 공식 기록에 남았다." },
    { id: "LOG-GOV-HAEJIN-ORACLE", title: "주변 마을 습격 ORACLE 요약본 전달", content: "기지 주변 마을 습격 사건에 대해 ORACLE 요약본만 정부 라인에 전달했다. 정부 질의는 종결되지 않았고, 원본 로그 요구 가능성이 남았다." },
    { id: "LOG-GOV-AUDIT-RAW", title: "국방부 질의 원본 로그 제출", content: "기지 주변 마을 습격 전 외곽 센서 로그를 민감 정보 가림 처리 후 제출했다. 정부는 ORACLE 요약본과 원본 기록의 차이를 확인했다." },
    { id: "LOG-GOV-AUDIT-ORACLE", title: "국방부 질의 ORACLE 라인 통일", content: "국방부 질의 회신을 ORACLE 지휘 라인으로 통일했다. 평가 안정성은 유지되었으나 정부 측 의심은 해소되지 않았다." },
    { id: "LOG-GOV-BRANCH-LOCAL", title: "한국 비상시설 권한 명시", content: "정부 연락관에게 한국지부가 한국 비상시설로서 현장 판단 권한을 가진다고 명시했다. ORACLE 지휘체계와의 긴장이 공식 기록에 남았다." },
    { id: "LOG-GOV-BRANCH-ORACLE", title: "ORACLE 현장 노드 답변", content: "정부 연락관 질의에 ORACLE 지휘체계를 우선한다는 답변을 제출했다. 본부 평가는 안정되었지만 한국 정부 라인의 정기 점검 가능성이 높아졌다." },
    { id: "LOG-GOV-BRIEF-LOCAL", title: "지자체 브리핑 현장 초안", content: "방벽 인근 대피소 운영 지침을 주민이 이해할 수 있는 현장 언어로 작성했다. 신뢰는 보강되었지만 본부 표준 문안과의 차이가 남았다." },
    { id: "LOG-GOV-BRIEF-ORACLE", title: "지자체 브리핑 표준 문안", content: "지자체 합동 브리핑에 본부 표준 문안을 제출했다. 본부 평가는 안정되었지만 현장과 주민에게는 설명 부족으로 남았다." },
    { id: "LOG-GOV-SHELTER-RAW", title: "대피소 CCTV와 센서 공백 제출", content: "방벽 인근 대피소 CCTV 시간대와 한국지부 센서 공백 기록을 함께 제출했다. 정부 라인은 사건을 한국지부의 감지 책임과 연결하기 시작했다." },
    { id: "LOG-GOV-SHELTER-ORACLE", title: "대피소 드론 항적 별도 격리", content: "대피소 상공의 미식별 드론 항적을 ORACLE 분류 체계 안에서 별도 격리했다. 공식 노출은 줄었지만 원본 대조 요구 가능성이 남았다." },
    { id: "LOG-GOV-INSPECT-LIMITED", title: "합동 점검 제한 허용", content: "합동 점검반에 제한 구역을 나눈 현장 점검을 허용했다. 신뢰 회복 가능성이 생겼으나 환자 기록과 격리 기록 보호 부담이 커졌다." },
    { id: "LOG-GOV-INSPECT-REMOTE", title: "합동 점검 원격 대체", content: "합동 점검반 방문을 원격 자료 열람으로 대체했다. ORACLE 지휘 안정성은 유지되었지만 정부 라인은 현장 은폐 가능성을 의심하게 되었다." }
  ].forEach(function(log) {
    if (!ORACLE_LOGS.some(function(x) { return x.id === log.id; })) ORACLE_LOGS.push(log);
  });
}

if (typeof CARDS !== "undefined") CARDS = CARDS.concat(CARDS_SESSION_PACKS);
