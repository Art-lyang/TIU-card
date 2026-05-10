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
    msg: "운영 후반. 조사테이블에 쌓인 단서가 서로 다른 방향을 가리킵니다.\n\n서하은: \"지금 결론을 붙이면 ORACLE 요약에 삼켜집니다. 외부 경유, 내부 기록, 현장 이상을 나눠서 후속 교차검증 목록으로 넘기겠습니다.\"\n\n답을 미루는 것도 운영 판단입니다.",
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
    left: { label: "DG 긴급 물류를 받는다", fx: { c:1,r:4,t:0,o:-2 }, g:-3, log:"LOG-A4-DG-SUPPORT" },
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
  }
];

if (typeof ORACLE_LOGS !== "undefined") {
  [
    { id:"LOG-A2-FORESHADOW-01", title:"외부 경유 흔적", content:"임재혁이 ORACLE 기록에도 없는 외부 경유 흔적을 분리 기록했다. 아직 특정 세력으로 단정하지 않고 패턴만 남겼다." },
    { id:"LOG-A2-FORESHADOW-02", title:"조사테이블 분류 기준", content:"조사테이블이 외부 경유, 내부 기록, 현장 이상을 분리해 보관하기 시작했다. 결론은 후속 교차 검증에 맡겨졌다." },
    { id:"LOG-A2-TRIAGE-01", title:"교차검증 목록", content:"운영 후반의 단서를 결론으로 고정하지 않고 외부 경유, 내부 기록, 현장 이상으로 나눠 후속 교차검증 목록에 넘겼다." },
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
