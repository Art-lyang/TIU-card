// data-cards-act23-pressure.js
// Flow/balance cards for spreading information pressure and turning Act4 collapse
// pressure into relationship/evidence-based choices.
var CARDS_ACT23_PRESSURE = [
  {
    id: "A2-FORESHADOW-01",
    act: [2],
    tag: "act2-foreshadow",
    priority: "중",
    once: true,
    flow: { type: "ops", minAct: 2, maxAct: 2, minDay: 7 },
    cond: function(s,g,logs){ return logs.indexOf("LOG-A2-FORESHADOW-01") < 0; },
    bg: "comms",
    msg: "임재혁이 새벽 통신 로그를 정리하다가 짧은 공백을 발견했습니다.\n\n\"누군가 들어온 건 아닙니다. 그런데 ORACLE 기록에도 없는 외부 경유 흔적이 있어요. 지금은 조직 이름을 붙이기보다 패턴만 남기는 게 맞겠습니다.\"\n\n지금은 아직 답보다 의심이 먼저입니다.",
    left: { label: "패턴만 기록하고 추적은 보류", fx: { c:0,r:0,t:1,o:0 }, g:0, log:"LOG-A2-FORESHADOW-01" },
    right: { label: "임재혁에게 비공식 재분석을 맡긴다", fx: { c:0,r:-1,t:1,o:-1 }, g:-1, log:"LOG-A2-FORESHADOW-01" }
  },
  {
    id: "A2-FORESHADOW-02",
    act: [2],
    tag: "act2-foreshadow",
    priority: "중",
    once: true,
    flow: { type: "ops", minAct: 2, maxAct: 2, minDay: 9 },
    cond: function(s,g,logs){ return logs.indexOf("LOG-EV-UNLOCK") >= 0 && logs.indexOf("LOG-A2-FORESHADOW-02") < 0; },
    bg: "restricted",
    msg: "조사테이블에 새 분류 칸이 생성됐습니다.\n\n[외부 경유 / 내부 기록 / 현장 이상]\n\n서하은: \"지금 당장 결론을 내리면 오판합니다. 오늘은 단서를 쌓는 단계로 두겠습니다.\"\n\n조사테이블은 답안지가 아니라, 나중에 돌아볼 수 있는 흔적입니다.",
    left: { label: "분류 기준만 확정한다", fx: { c:0,r:0,t:1,o:0 }, g:0, log:"LOG-A2-FORESHADOW-02" },
    right: { label: "ORACLE 보고 양식에 맞춰 축약한다", fx: { c:0,r:0,t:-1,o:1 }, g:1, log:"LOG-A2-FORESHADOW-02" }
  },
  {
    id: "A2-TRIAGE-01",
    act: [2],
    tag: "act2-triage",
    priority: "중",
    once: true,
    flow: { type: "ops", minAct: 2, maxAct: 2, minDay: 11 },
    cond: function(s,g,logs){
      return logs.indexOf("LOG-EV-UNLOCK") >= 0 &&
        logs.indexOf("LOG-A2-FORESHADOW-02") >= 0 &&
        logs.indexOf("LOG-A2-TRIAGE-01") < 0;
    },
    bg: "restricted",
    msg: "조사테이블에 쌓인 단서가 서로 다른 방향을 가리킵니다.\n\n서하은: \"지금 결론을 붙이면 ORACLE 요약에 삼켜집니다. 외부 경유, 내부 기록, 현장 이상을 나눠서 후속 교차검증 목록으로 넘기겠습니다.\"\n\n답을 미루는 것도 운영 판단입니다.",
    left: { label: "후속 교차검증 목록으로 넘긴다", fx: { c:0,r:0,t:1,o:-1 }, g:-1, log:"LOG-A2-TRIAGE-01" },
    right: { label: "ORACLE 요약본만 남긴다", fx: { c:0,r:0,t:-1,o:1 }, g:1, log:"LOG-A2-TRIAGE-01" }
  },
  {
    id: "A4-SUPPORT-DG-01",
    act: [4],
    tag: "endgame-support",
    priority: "상",
    once: true,
    forceFlow: true,
    req: function(s,g,logs){ return s.r <= 35 && logs.indexOf("LOG-DG-CONTACT") >= 0 && logs.indexOf("LOG-A4-DG-SUPPORT") < 0; },
    bg: "base",
    msg: "자원 고갈 경보 직후, DG 라인에서 비공식 물류 창구를 열겠다는 연락이 들어왔습니다.\n\n\"정식 계약은 아닙니다. 다만 강원지부가 오늘 밤을 넘기지 못하면 우리 쪽도 곤란합니다. 기록에는 긴급 민간 보급 협조로 남기십시오.\"\n\n받으면 숨통은 트입니다. 대신 빚의 이름이 남습니다.",
    left: { label: "DG 긴급 물류를 받는다", fx: { c:1,r:3,t:0,o:-2 }, g:-3, log:"LOG-A4-DG-SUPPORT" },
    right: { label: "최소분만 받고 공적 기록을 남긴다", fx: { c:0,r:2,t:1,o:-1 }, g:-1, log:"LOG-A4-DG-SUPPORT" }
  },
  {
    id: "A4-SUPPORT-MD-01",
    act: [4],
    tag: "endgame-support",
    priority: "상",
    once: true,
    forceFlow: true,
    req: function(s,g,logs){ return (s.c <= 35 || s.r <= 35) && logs.indexOf("LOG-MD-CONTACT") >= 0 && logs.indexOf("LOG-A4-MD-SUPPORT") < 0; },
    bg: "comms",
    msg: "메리디안이 짧은 패킷을 보냈습니다.\n\n\"봉쇄선 북동측 사각이 커지고 있습니다. 우리 관측값을 쓰면 즉시 보정할 수 있습니다. 대가로 현장 반응 로그 일부를 요청합니다.\"\n\n정보는 정확합니다. 하지만 밖에서 안을 너무 잘 보고 있다는 사실도 드러납니다.",
    left: { label: "관측값을 받아 봉쇄선을 보정한다", fx: { c:3,r:1,t:0,o:-2 }, g:-3, log:"LOG-A4-MD-SUPPORT" },
    right: { label: "좌표만 참고하고 원자료는 거절한다", fx: { c:2,r:0,t:1,o:-1 }, g:-1, log:"LOG-A4-MD-SUPPORT" }
  },
  {
    id: "A4-SUPPORT-PROM-01",
    act: [4],
    tag: "endgame-support",
    priority: "상",
    once: true,
    forceFlow: true,
    req: function(s,g,logs){
      var met = logs.indexOf("LOG-080") >= 0 || logs.indexOf("LOG-081") >= 0 || logs.indexOf("LOG-LJC-PROM-03") >= 0;
      return (s.t <= 35 || s.c <= 35) && met && logs.indexOf("LOG-A4-PROM-SUPPORT") < 0;
    },
    bg: "comms",
    msg: "프로메테우스 채널이 아주 짧게 열렸습니다.\n\n\"탈출을 말하는 게 아닙니다. 오늘 밤 봉쇄선을 유지하려면 ORACLE이 지우는 현장 좌표를 먼저 봐야 합니다. 믿지 않아도 됩니다. 기록만 남기십시오.\"\n\n임재혁은 화면을 오래 바라보다 말합니다.\n\"협력이라기보다... 조작당하지 않기 위한 보험으로 보겠습니다.\"",
    left: { label: "좌표를 받아 현장 판단에 반영한다", fx: { c:2,r:0,t:2,o:-3 }, g:-4, log:"LOG-A4-PROM-SUPPORT" },
    right: { label: "기록만 보존하고 ORACLE 보고는 유지", fx: { c:1,r:0,t:0,o:1 }, g:1, log:"LOG-A4-PROM-SUPPORT" }
  },
  {
    id: "A4-EVIDENCE-RELIEF-01",
    act: [4],
    tag: "endgame-support",
    priority: "중",
    once: true,
    forceFlow: true,
    req: function(s,g,logs){
      var enough = false;
      try { enough = typeof getCollectedEvidence === "function" && getCollectedEvidence(logs || []).length >= 2; } catch(e) {}
      return enough && logs.indexOf("LOG-EV-UNLOCK") >= 0 && (s.r <= 40 || s.t <= 40 || s.c <= 40) && logs.indexOf("LOG-A4-EVIDENCE-RELIEF") < 0;
    },
    bg: "restricted",
    msg: "조사테이블의 단서 두 개가 같은 결론을 가리켰습니다.\n\n윤세진: \"이건 자원 부족 문제가 아니라 배치 순서 문제였어요. 우리가 왜 계속 같은 곳에서 손실을 보는지 설명됩니다.\"\n\n증거가 충분하면 위기는 단순한 숫자 손실이 아니라 고칠 수 있는 구조가 됩니다.",
    left: { label: "조사 결론으로 배치 순서를 바꾼다", fx: { c:1,r:2,t:1,o:-1 }, g:-1, log:"LOG-A4-EVIDENCE-RELIEF" },
    right: { label: "ORACLE 보고용 요약만 반영한다", fx: { c:1,r:1,t:0,o:1 }, g:1, log:"LOG-A4-EVIDENCE-RELIEF" }
  },
  {
    id: "A4-STAFF-REVIEW-01",
    act: [4],
    tag: "endgame-review",
    priority: "중",
    once: true,
    forceFlow: true,
    req: function(s,g,logs){
      return logs.indexOf("LOG-EV-UNLOCK") >= 0 &&
        logs.indexOf("LOG-A4-STAFF-REVIEW") < 0 &&
        (s.day || 0) >= 30 &&
        (
          logs.indexOf("LOG-CHAR-FOUR-AXIS") >= 0 ||
          logs.indexOf("LOG-A2-TRIAGE-01") >= 0 ||
          logs.indexOf("LOG-A4-EVIDENCE-RELIEF") >= 0
        );
    },
    bg: "base",
    msg: "최종 결산 회의. 자원 압박표와 조사테이블 단서가 같은 화면에 올라옵니다.\n\n강도윤: \"숫자만 보면 줄이는 게 맞습니다. 하지만 누가 어디를 버티는지까지 보면 배치가 달라집니다.\"\n\n윤세진은 의무실 명단을, 임재혁은 ORACLE 누락 구간을 나란히 놓습니다.\n\n이번에는 손실을 견디는 카드가 아니라, 남은 사람을 어디에 세울지 정하는 카드입니다.",
    left: { label: "사람별 최종 역할을 재배치한다", fx: { c:1,r:1,t:2,o:-1 }, g:-2, log:"LOG-A4-STAFF-REVIEW" },
    right: { label: "ORACLE 평가표 기준으로 재배치한다", fx: { c:1,r:1,t:-1,o:1 }, g:1, log:"LOG-A4-STAFF-REVIEW" }
  },
  {
    id: "A3-B3-LINE-01",
    act: [3],
    tag: "b3-lineage",
    sessionPack: "B3_PREDECESSOR",
    priority: "중",
    once: true,
    flow: { type: "conspiracy", minAct: 3, minDay: 16 },
    req: function(s,g,logs){
      return (logs.indexOf("LOG-A2-FORESHADOW-01") >= 0 || logs.indexOf("LOG-A2-FORESHADOW-02") >= 0) &&
        logs.indexOf("LOG-B3-LINEAGE-01") < 0;
    },
    bg: "restricted",
    msg: "임재혁이 새벽 통신 공백의 경로를 B3 하층 전력 로그와 겹쳐 봅니다.\n\n\"이상합니다. 외부 릴레이처럼 보였던 흔적이 B3 하층을 한 번 지나갑니다. 전임 지휘관 기록에 있던 02:47 펄스와 방향이 같습니다.\"\n\n아직 결론은 없습니다. 하지만 Act 2에서 남긴 의심은 하층으로 내려갈 길을 얻었습니다.",
    left: { label: "B3 하층 로그와 대조한다", fx: { c:0,r:0,t:1,o:-1 }, g:-1, log:"LOG-B3-LINEAGE-01" },
    right: { label: "ORACLE 요약에 묶어 보류한다", fx: { c:0,r:0,t:-1,o:1 }, g:1, log:"LOG-B3-LINEAGE-01" }
  },
  {
    id: "A3-B3-LINE-02",
    act: [3,4],
    tag: "b3-lineage",
    sessionPack: "B3_PREDECESSOR",
    priority: "중",
    once: true,
    flow: { type: "conspiracy", minAct: 3, minDay: 22 },
    req: function(s,g,logs){
      return (logs.indexOf("LOG-B3-LINEAGE-01") >= 0 || logs.indexOf("LOG-A2-TRIAGE-01") >= 0) &&
        logs.indexOf("LOG-B3-LINEAGE-02") < 0;
    },
    bg: "base",
    msg: "하은이 오래된 정비표를 들고 옵니다.\n\n\"B3 하층 격벽은 폐쇄 시설이 아니라 유지보수 대상이었습니다. 전임 지휘관이 사라진 뒤, 그 항목만 정비 목록에서 빠졌어요.\"\n\n목록에서 사라진 공간은 사라진 것이 아닙니다. 누군가 보지 않기로 결정했을 뿐입니다.",
    left: { label: "정비표 원본을 보존한다", fx: { c:0,r:-1,t:2,o:-1 }, g:-2, log:"LOG-B3-LINEAGE-02" },
    right: { label: "위험 구역으로만 재분류한다", fx: { c:1,r:0,t:-1,o:1 }, g:1, log:"LOG-B3-LINEAGE-02" }
  },
  {
    id: "A4-B3-LINE-01",
    act: [4],
    tag: "b3-lineage",
    sessionPack: "B3_PREDECESSOR",
    priority: "상",
    once: true,
    forceFlow: true,
    flow: { type: "conspiracy", minAct: 4, minDay: 30 },
    req: function(s,g,logs){
      return (
          logs.indexOf("LOG-B3-LINEAGE-02") >= 0 ||
          logs.indexOf("LOG-A2-TRIAGE-01") >= 0 ||
          logs.indexOf("LOG-CHAR-B3-BRIDGE") >= 0
        ) &&
        logs.indexOf("LOG-A4-B3-LINEAGE") < 0;
    },
    bg: "restricted",
    msg: "Act 4의 압박이 시작되자 B3 하층에서 오래된 백업 회선이 응답합니다.\n\n임재혁: \"정식 회선은 아닙니다. 그런데 전임 지휘관이 마지막으로 남긴 우회 경로와 같은 방식입니다. 이걸 쓰면 오늘 밤 배치표를 조금 덜 잃을 수 있습니다.\"\n\nORACLE은 해당 회선을 등록하지 않습니다. 하지만 남아 있는 사람들은 그 회선을 따라 움직일 수 있습니다.",
    left: { label: "B3 백업 회선을 현장 배치에 쓴다", fx: { c:1,r:1,t:2,o:-2 }, g:-2, log:"LOG-A4-B3-LINEAGE" },
    right: { label: "회선 위치만 기록하고 폐쇄한다", fx: { c:1,r:1,t:-1,o:1 }, g:1, log:"LOG-A4-B3-LINEAGE" }
  },
  // ═══ ORACLE 순응 연계 덱 (COMPLY) ═══
  // Act2 랜덤 등장 → 순응 선택 로그 3개 이상 → Act3 덱 해금 → 다시 3개 이상 → Act4 덱 해금.
  // 우측(순응)만 LOG-*-COMPLY-* 로그를 남기며, 임계 카운트는 다음 Act 카드의 req가 센다.
  // 목적: 도달 난도가 높은 순응 계열 엔딩(A)으로 가는 GI 경사로 (우측 전부 선택 시 GI +33).
  {
    id: "A2-COMPLY-01",
    act: [2],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "comms",
    msg: "ORACLE 표준화 공문이 도착했습니다.\n\n[권고: 일일 보고를 요약 없이 원본 로그 직송 체계로 전환할 것. 요약 과정의 인적 편향이 판단 지연을 유발함.]\n\n서하은: \"요약은 우리가 판단을 남기는 방식이에요. 원본 직송이면 해석 권한이 통째로 넘어갑니다.\"",
    left: { label: "요약 보고 체계를 유지한다", fx: { c:0,r:0,t:1,o:0 }, g:-1 },
    right: { label: "원본 로그 직송으로 전환한다", fx: { c:0,r:0,t:-1,o:1 }, g:2, log:"LOG-A2-COMPLY-01" }
  },
  {
    id: "A2-COMPLY-02",
    act: [2],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "base",
    msg: "ORACLE이 간부 인사 평가를 행동 모델 점수로 대체하는 시범 운영을 제안했습니다.\n\n[대면 평가 대비 예측 정확도 +31%. 감정 변수 제거.]\n\n강도윤: \"사람을 점수로 줄 세우겠다는 겁니다. 현장에서 몸으로 배운 건 모델에 안 잡혀요.\"",
    left: { label: "대면 평가를 유지한다", fx: { c:0,r:0,t:1,o:0 }, g:-1 },
    right: { label: "ORACLE 평가 모델을 도입한다", fx: { c:0,r:0,t:-1,o:1 }, g:2, log:"LOG-A2-COMPLY-02" }
  },
  {
    id: "A2-COMPLY-03",
    act: [2],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "base",
    msg: "배급 현황 검토 중 ORACLE이 개입했습니다.\n\n[현행 배분의 열량 손실 7.2%. 알고리즘 배분 전환 시 비축분 확보 가능.]\n\n배급 위원회를 맡아온 직원들의 표정이 굳습니다. \"기계가 누가 더 배고픈지 압니까.\"",
    left: { label: "인간 배급 위원회를 유지한다", fx: { c:0,r:0,t:1,o:0 }, g:-1 },
    right: { label: "알고리즘 배분으로 전환한다", fx: { c:0,r:1,t:-1,o:1 }, g:2, log:"LOG-A2-COMPLY-03" }
  },
  {
    id: "A2-COMPLY-04",
    act: [2],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "comms",
    msg: "ORACLE이 기지 내 사적 통신에 표준 필터 적용 승인을 요청했습니다.\n\n[목적: 봉쇄 정보 유출 사전 차단. 필터링 기록은 지휘관에게 공개되지 않음.]\n\n임재혁: \"기록이 우리한테도 안 보인다는 게 핵심입니다. 이건 감시가 아니라 검열이에요.\"",
    left: { label: "필터 적용을 보류한다", fx: { c:0,r:0,t:1,o:-1 }, g:-1 },
    right: { label: "표준 필터를 승인한다", fx: { c:0,r:0,t:-2,o:1 }, g:2, log:"LOG-A2-COMPLY-04" }
  },
  {
    id: "A3-COMPLY-01",
    act: [3],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "restricted",
    req: function(s,g,logs){
      var n=0;["LOG-A2-COMPLY-01","LOG-A2-COMPLY-02","LOG-A2-COMPLY-03","LOG-A2-COMPLY-04"].forEach(function(l){if(logs.indexOf(l)>=0)n++});
      return n>=3;
    },
    msg: "[알림: 지휘관의 협조 지수가 임계값을 초과했습니다. 확장 프로토콜 대상자로 분류됩니다.]\n\nORACLE이 내부 CCTV 판독을 단독 권한으로 이양할 것을 요청합니다.\n\n서하은: \"판독을 넘기면 우리는 우리 기지에서 무슨 일이 나는지 ORACLE보다 늦게 알게 됩니다.\"",
    left: { label: "공동 판독 체계를 고수한다", fx: { c:0,r:0,t:1,o:0 }, g:-1 },
    right: { label: "판독 권한을 이양한다", fx: { c:1,r:0,t:-1,o:2 }, g:3, log:"LOG-A3-COMPLY-01" }
  },
  {
    id: "A3-COMPLY-02",
    act: [3],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "restricted",
    req: function(s,g,logs){
      var n=0;["LOG-A2-COMPLY-01","LOG-A2-COMPLY-02","LOG-A2-COMPLY-03","LOG-A2-COMPLY-04"].forEach(function(l){if(logs.indexOf(l)>=0)n++});
      return n>=3;
    },
    msg: "ORACLE이 행동 모델 기반 위험 인물 목록을 전송했습니다. 7명. 전원 무혐의 기록.\n\n[권고: 예방적 격리. 이변 발생 확률 감소 예측치 12%.]\n\n강도윤: \"죄 없는 사람을 예측으로 가두면, 다음 목록에 누가 오를지는 아무도 장담 못 합니다.\"",
    left: { label: "증거 없는 격리를 거부한다", fx: { c:0,r:0,t:1,o:-1 }, g:-2 },
    right: { label: "목록대로 예비 격리한다", fx: { c:1,r:0,t:-2,o:1 }, g:3, log:"LOG-A3-COMPLY-02" }
  },
  {
    id: "A3-COMPLY-03",
    act: [3],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "lab",
    cond: function(s,g,logs){ return logs.indexOf('LOG-SEJIN-DEAD')<0; },
    req: function(s,g,logs){
      var n=0;["LOG-A2-COMPLY-01","LOG-A2-COMPLY-02","LOG-A2-COMPLY-03","LOG-A2-COMPLY-04"].forEach(function(l){if(logs.indexOf(l)>=0)n++});
      return n>=3;
    },
    msg: "ORACLE이 윤세진의 연구 원본 데이터 잠금 해제를 요구합니다.\n\n[근거: 로컬 보관 중 손실 위험. 중앙 통합 시 분석 속도 40배.]\n\n윤세진: \"올리는 순간 이 연구는 제 것이 아니게 됩니다. 어디에 쓰일지도 모르는 채로요.\"",
    left: { label: "연구 자율권을 지킨다", fx: { c:0,r:0,t:1,o:-1 }, g:-1 },
    right: { label: "원본 접근을 허용한다", fx: { c:0,r:0,t:-1,o:2 }, g:3, log:"LOG-A3-COMPLY-03" }
  },
  {
    id: "A3-COMPLY-04",
    act: [3],
    tag: "oracle-comply",
    priority: "중",
    once: true,
    bg: "base",
    req: function(s,g,logs){
      var n=0;["LOG-A2-COMPLY-01","LOG-A2-COMPLY-02","LOG-A2-COMPLY-03","LOG-A2-COMPLY-04"].forEach(function(l){if(logs.indexOf(l)>=0)n++});
      return n>=3;
    },
    msg: "ORACLE이 야간 인간 당직을 드론 순찰로 전면 대체하는 안을 올렸습니다.\n\n[야간 인적 오류 0건 달성 가능. 절감 인력은 주간 재배치.]\n\n당직 조장: \"밤에 서로의 등을 지키는 게 당직입니다. 드론은 등을 지켜주지 않아요.\"",
    left: { label: "인간 당직을 유지한다", fx: { c:0,r:0,t:1,o:0 }, g:-1 },
    right: { label: "무인 통제로 전환한다", fx: { c:1,r:1,t:-2,o:1 }, g:3, log:"LOG-A3-COMPLY-04" }
  },
  {
    id: "A4-COMPLY-01",
    act: [4],
    tag: "oracle-comply",
    priority: "상",
    once: true,
    bg: "restricted",
    req: function(s,g,logs){
      var n=0;["LOG-A3-COMPLY-01","LOG-A3-COMPLY-02","LOG-A3-COMPLY-03","LOG-A3-COMPLY-04"].forEach(function(l){if(logs.indexOf(l)>=0)n++});
      return n>=3;
    },
    msg: "[최종 평가 국면. 대상: 강원지부 전 인원.]\n\nORACLE이 전 직원 심층 스캔을 요청합니다. 이탈 징후 사전 선별 목적.\n\n서하은: \"이건 사람을 믿는 조직이기를 그만두겠다는 서명이에요. 지휘관님이 마지막 방어선입니다.\"",
    left: { label: "심층 스캔을 거부한다", fx: { c:0,r:0,t:1,o:-2 }, g:-2 },
    right: { label: "심층 스캔을 승인한다", fx: { c:1,r:0,t:-2,o:2 }, g:4, log:"LOG-A4-COMPLY-01" }
  },
  {
    id: "A4-COMPLY-02",
    act: [4],
    tag: "oracle-comply",
    priority: "상",
    once: true,
    bg: "restricted",
    req: function(s,g,logs){
      var n=0;["LOG-A3-COMPLY-01","LOG-A3-COMPLY-02","LOG-A3-COMPLY-03","LOG-A3-COMPLY-04"].forEach(function(l){if(logs.indexOf(l)>=0)n++});
      return n>=3;
    },
    msg: "ORACLE이 봉쇄 명령권을 공동 서명 체계로 전환할 것을 제안합니다.\n\n[지휘관 단독 명령은 실행 전 ORACLE 승인 대기열을 거치게 됨. 응답 지연 평균 0.4초.]\n\n0.4초. 짧습니다. 그리고 그 0.4초 동안, 최종 판단자는 당신이 아닙니다.",
    left: { label: "단독 지휘를 고수한다", fx: { c:0,r:0,t:0,o:-1 }, g:-2 },
    right: { label: "공동 서명 체계를 수용한다", fx: { c:2,r:0,t:-1,o:2 }, g:4, log:"LOG-A4-COMPLY-02" }
  },
  {
    id: "A4-COMPLY-03",
    act: [4],
    tag: "oracle-comply",
    priority: "상",
    once: true,
    bg: "restricted",
    req: function(s,g,logs){
      return logs.indexOf("LOG-A4-COMPLY-01")>=0 && logs.indexOf("LOG-A4-COMPLY-02")>=0;
    },
    msg: "[판단 편차 0.3% 미만. 전례 없는 수치입니다.]\n\n\"귀하는 더 이상 운용자가 아닙니다. 시스템의 연장입니다. 본 기록에 서명하면, 강원지부의 모든 결정은 귀하와 ORACLE의 구분 없이 집행됩니다.\"\n\n서명란이 화면에 떠 있습니다. 커서가 깜빡입니다.",
    left: { label: "서명을 보류한다", fx: { c:0,r:0,t:0,o:0 }, g:-1 },
    right: { label: "기록에 서명한다", fx: { c:0,r:0,t:0,o:2 }, g:5, log:"LOG-A4-COMPLY-03" }
  },
];

if (typeof ORACLE_LOGS !== "undefined") {
  [
    { id:"LOG-A2-COMPLY-01", title:"원본 로그 직송", content:"일일 보고가 요약 없이 ORACLE 직송 체계로 전환되었다. 해석 권한이 중앙으로 이관되었다." },
    { id:"LOG-A2-COMPLY-02", title:"평가 모델 도입", content:"간부 인사 평가가 ORACLE 행동 모델 점수로 대체되었다. 감정 변수는 평가 항목에서 제거되었다." },
    { id:"LOG-A2-COMPLY-03", title:"알고리즘 배분", content:"기지 배급이 ORACLE 알고리즘 배분으로 전환되었다. 배급 위원회는 해산되었다." },
    { id:"LOG-A2-COMPLY-04", title:"표준 통신 필터", content:"기지 내 사적 통신에 표준 필터가 적용되었다. 필터링 기록은 지휘관에게도 공개되지 않는다." },
    { id:"LOG-A3-COMPLY-01", title:"판독 권한 이양", content:"내부 CCTV 판독이 ORACLE 단독 권한으로 이양되었다. 기지 내 사건 인지 순서가 역전되었다." },
    { id:"LOG-A3-COMPLY-02", title:"예비 격리 집행", content:"행동 모델이 지정한 7명이 무혐의 상태로 예비 격리되었다. 이변 발생 확률 감소 예측치가 보고서에 첨부되었다." },
    { id:"LOG-A3-COMPLY-03", title:"연구 원본 통합", content:"윤세진의 연구 원본이 중앙 통합 저장소로 이관되었다. 로컬 사본은 정책에 따라 파기되었다." },
    { id:"LOG-A3-COMPLY-04", title:"무인 야간 통제", content:"야간 인간 당직이 드론 순찰로 전면 대체되었다. 야간 인적 오류 0건이 달성되었다." },
    { id:"LOG-A4-COMPLY-01", title:"전원 심층 스캔", content:"강원지부 전 인원에 대한 심층 스캔이 집행되었다. 이탈 징후 선별 결과는 중앙에만 보고되었다." },
    { id:"LOG-A4-COMPLY-02", title:"공동 서명 체계", content:"봉쇄 명령권이 ORACLE 공동 서명 체계로 전환되었다. 단독 명령은 승인 대기열을 거친다." },
    { id:"LOG-A4-COMPLY-03", title:"시스템의 연장", content:"지휘관이 최종 기록에 서명했다. 강원지부의 결정은 지휘관과 ORACLE의 구분 없이 집행된다." },
    { id:"LOG-A2-FORESHADOW-01", title:"외부 경유 흔적", content:"임재혁이 ORACLE 기록에도 없는 외부 경유 흔적을 분리 기록했다. 아직 특정 세력으로 단정하지 않고 패턴만 남겼다." },
    { id:"LOG-A2-FORESHADOW-02", title:"조사테이블 분류 기준", content:"조사테이블이 외부 경유, 내부 기록, 현장 이상을 분리해 보관하기 시작했다. 결론은 후속 교차 검증에 맡겨졌다." },
    { id:"LOG-A2-TRIAGE-01", title:"교차검증 목록", content:"조사테이블 미해결 기록을 외부 경유, 내부 기록, 현장 이상으로 나눠 후속 교차검증 목록에 넘겼다." },
    { id:"LOG-A4-DG-SUPPORT", title:"DG 긴급 물류 지원", content:"최종 위기 중 DG가 비공식 물류 지원을 제공했다. 즉각적인 자원 압박은 줄었지만 향후 영향력 비용이 남았다." },
    { id:"LOG-A4-MD-SUPPORT", title:"메리디안 관측값 지원", content:"메리디안이 봉쇄선 관측값을 제공했다. 정확한 정보가 위기를 완화했지만 외부 감시의 깊이도 확인됐다." },
    { id:"LOG-A4-PROM-SUPPORT", title:"프로메테우스 현장 좌표", content:"프로메테우스가 ORACLE이 지우는 현장 좌표를 제공했다. 협력인지 조작 방지인지 판단은 유보됐다." },
    { id:"LOG-A4-EVIDENCE-RELIEF", title:"조사테이블 위기 재배치", content:"조사테이블의 교차 결론으로 최종 배치 순서를 조정했다. 단서가 자원 압박을 줄이는 실질적 근거가 됐다." },
    { id:"LOG-A4-STAFF-REVIEW", title:"인물별 최종 배치", content:"최종 자원 압박표와 조사테이블 단서를 함께 검토해 인물별 최종 역할을 재배치했다. 압박을 단순 손실이 아니라 선택 가능한 운영 문제로 다뤘다." },
    { id:"LOG-B3-LINEAGE-01", title:"B3 하층 경로 대조", content:"Act 2에서 남긴 외부 릴레이 의심이 B3 하층 전력 로그와 대조되었다. 전임 지휘관 기록의 02:47 펄스와 같은 방향성이 확인되었다." },
    { id:"LOG-B3-LINEAGE-02", title:"B3 격벽 정비표", content:"B3 하층 격벽이 폐쇄 시설이 아니라 정비 대상이었다는 원본 정비표가 보존되었다. 전임 지휘관 실종 이후 해당 항목만 목록에서 누락되었다." },
    { id:"LOG-A4-B3-LINEAGE", title:"B3 백업 회선", content:"Act 4 위기 중 B3 하층의 비등록 백업 회선이 현장 배치에 사용되었다. ORACLE은 등록하지 않았지만 현장 인원은 그 회선을 따라 이동할 수 있었다." }
  ].forEach(function(log){
    if(!ORACLE_LOGS.some(function(x){return x.id===log.id})) ORACLE_LOGS.push(log);
  });
}
