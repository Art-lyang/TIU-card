// data-cards-prometheus-lee.js
// 이중철 개인 서사 보강: 과거 사건 때문에 프로메테우스를 기피하는 감정선

var CARDS_LJC_PROMETHEUS = [
  {
    id: "LJC-PROM-01",
    act: [2, 3],
    priority: "상",
    bg: "comms",
    tag: "prometheus-lee",
    once: true,
    cond: function(s, g, logs) {
      return s.day >= 9 && logs.indexOf("LOG-LJC-PROM-01") < 0;
    },
    msg: "프로메테우스 관련 녹취 파일이 도착했습니다.\n\n파일명: GANGWON-OLD / COASTAL-MIRROR / VOICELOSS\n\n이중철은 확인 버튼 위에서 손을 멈춥니다.\n\n강원도 동부 작전. 통신 두절. 박상훈 중위. 구조 요청처럼 들렸던 마지막 음성.\n\nORACLE은 그 사건을 '비협조 민간 세력 개입 가능성'으로 정리했지만, 이중철은 다른 이름을 기억합니다.\n\n프로메테우스.",
    left: {
      label: "자료 열람을 미룬다",
      fx: { c: 0, r: 0, t: -1, o: 1 },
      g: 1,
      log: "LOG-LJC-PROM-01",
      replyMsg: "[기록 보류: 지휘관 개인 판단 개입]"
    },
    right: {
      label: "불편해도 직접 연다",
      fx: { c: 0, r: 0, t: 1, o: -1 },
      g: -2,
      log: "LOG-LJC-PROM-01",
      replyMsg: "[기록 열람: 과거 작전 파일 대조 시작]"
    }
  },
  {
    id: "LJC-PROM-02",
    act: [2, 3, 4],
    priority: "상",
    bg: "base",
    tag: "prometheus-lee",
    once: true,
    cond: function(s, g, logs) {
      return s.day >= 16 && logs.indexOf("LOG-LJC-PROM-01") >= 0 && logs.indexOf("LOG-LJC-PROM-02") < 0;
    },
    msg: "프로메테우스 측에서 비공식 대면 요청을 보냈습니다.\n\n요청 문구는 짧습니다.\n\n\"그날의 통신 기록을 가지고 있다. 지휘관이 직접 듣는 편이 좋다.\"\n\n서하은이 조심스럽게 말합니다.\n\"지휘관님, 직접 나가실 필요는 없습니다.\"\n\n이중철은 화면을 보지 않은 채 대답합니다.\n\"필요가 없는 게 아니라... 내가 나가고 싶지 않은 겁니다.\"",
    left: {
      label: "대리인을 보낸다",
      fx: { c: 0, r: 0, t: 1, o: 0 },
      g: 1,
      log: "LOG-LJC-PROM-02",
      replyMsg: "[대면 회피: 대리 접촉 프로토콜 가동]"
    },
    right: {
      label: "지휘관이 직접 접촉한다",
      fx: { c: 0, r: -1, t: 1, o: -1 },
      g: -3,
      log: "LOG-LJC-PROM-02",
      replyMsg: "[직접 접촉: 지휘관 심박 상승 기록]"
    }
  },
  {
    id: "LJC-PROM-03",
    act: [3, 4],
    priority: "중",
    bg: "restricted",
    tag: "prometheus-lee",
    once: true,
    cond: function(s, g, logs) {
      return s.day >= 24 && (logs.indexOf("LOG-LJC-PROM-02") >= 0 || logs.indexOf("LOG-081") >= 0) && logs.indexOf("LOG-LJC-PROM-03") < 0;
    },
    msg: "프로메테우스가 보낸 짧은 증언 파일이 복원됐습니다.\n\n\"그날 구조 요청을 막은 건 우리가 아니다. 우리는 늦었다. 그래서 살아남은 사람을 찾고 있었다.\"\n\n방 안이 조용해집니다.\n\n이중철은 한동안 아무 말도 하지 않습니다.\n\n그가 프로메테우스를 싫어하는 이유가 조금 흐려집니다. 증오가 사라진 것은 아닙니다. 다만, 그 증오가 어디를 향해야 하는지 흔들리기 시작합니다.",
    left: {
      label: "증언을 봉인한다",
      fx: { c: 0, r: 0, t: -1, o: 1 },
      g: 1,
      log: "LOG-LJC-PROM-03",
      replyMsg: "[증언 봉인: 공식 보고 제외]"
    },
    right: {
      label: "상충 증언으로 보존한다",
      fx: { c: 0, r: 0, t: 2, o: -1 },
      g: -2,
      log: "LOG-LJC-PROM-03",
      replyMsg: "[증언 보존: 과거 작전 재검토 단서 추가]"
    }
  },
  {
    id: "LJC-PROM-04",
    act: [4],
    priority: "상",
    bg: "comms",
    tag: "prometheus-lee",
    once: true,
    cond: function(s, g, logs) {
      return s.day >= 29 && logs.indexOf("LOG-LJC-PROM-03") >= 0 && logs.indexOf("LOG-LJC-PROM-04") < 0;
    },
    msg: "프로메테우스 직접 채널이 다시 열렸습니다.\n\n마르쿠스 베버의 이름이 화면에 뜨자, 이중철은 곧바로 응답하지 않습니다.\n\n박상훈 중위의 마지막 음성. ORACLE이 정리한 보고서. 뒤늦게 도착했다는 프로메테우스의 증언.\n\n모든 것이 같은 자리에 겹칩니다.\n\n임재혁이 낮은 목소리로 묻습니다.\n\"지휘관님. 저쪽과 협력하려면, 적어도 우리가 왜 불편한지까지 기록해야 합니다. 그래야 나중에 누가 우리 판단을 조작하지 못합니다.\"\n\n프로메테우스는 답을 기다리고 있습니다.",
    left: {
      label: "불신까지 기록하고 협력 조건을 검토한다",
      fx: { c: 0, r: 0, t: 1, o: -1 },
      g: -2,
      log: "LOG-LJC-PROM-04",
      replyMsg: "[협력 전제 기록: 개인적 적대감과 작전상 필요를 분리]"
    },
    right: {
      label: "아직 협력할 수 없다. 채널을 보류한다",
      fx: { c: 0, r: 0, t: -1, o: 1 },
      g: 2,
      log: "LOG-LJC-PROM-04",
      replyMsg: "[협력 보류: 지휘관 개인 판단에 따라 접촉 지연]"
    }
  }
];

if (typeof CARDS_EXTERNAL !== "undefined") {
  CARDS_EXTERNAL = CARDS_EXTERNAL.concat(CARDS_LJC_PROMETHEUS);
}
