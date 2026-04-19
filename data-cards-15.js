// data-cards-15.js — 외부 인물 카드 + 에이전트 강 흔적 (C-248 ~ C-260)
// 닉 포스터 접촉, 박소영 합류/정체, 에이전트 강 관찰 흔적

var CARDS_EXTERNAL = [

  // ═══ 닉 포스터 — 굴욕을 삼키고 정보를 얻다 ═══

  { id: "C-248", act: [3], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return s.day>=27 && logs.indexOf('LOG-016')>=0 && logs.indexOf('LOG-080')>=0 && logs.indexOf('LOG-081')<0 },
    msg: "기지 외곽 감시 카메라. 닉 포스터가 다시 잡혔습니다.\n\n이번엔 담배도 없습니다. 손을 들어 보이고 있습니다.\n\n임재혁: \"접근 의사를 표시하는 겁니다. 비무장이에요.\"\n\n... 그 얼굴을 보면 옛 기억이 떠오릅니다.",
    left: { label: "만난다 — 과거는 묻는다", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -4 },
    right: { label: "무시한다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "C-249", act: [3], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return logs.indexOf('LOG-081')>=0 && logs.indexOf('LOG-081-DATA')<0 },
    msg: "포스터가 입을 엽니다.\n\n\"당신 부대원한테 했던 일... 사과할 생각은 없습니다.\"\n\n\"하지만 내가 가진 건 줄 수 있어요.\"\n\n태블릿을 꺼냅니다. ORACLE이 각 지부에서 추출하는 데이터의 흐름도.\n\n\"한국 봉쇄 성공 데이터가 어디로 가는지 알고 싶지 않습니까?\"",
    left: { label: "데이터를 받는다", fx: { c: 0, r: 0, t: 1, o: -3 }, g: -5 },
    right: { label: "믿을 수 없다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "C-250", act: [3], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('LOG-081-DATA')>=0 && logs.indexOf('LOG-081-INTEL')<0 },
    msg: "포스터의 데이터를 임재혁이 검증했습니다.\n\n\"진짜입니다. ORACLE 내부 라우팅 구조예요.\"\n\n한국 해안 방벽 기술 사양, 봉쇄 전술 데이터, 이변체 반응 패턴.\n모두 ORACLE 중앙 노드로 전송되고 있었습니다.\n\n\"한국은 실험장이에요.\" 포스터의 말이 떠오릅니다.\n\"당신들이 성공할수록 ORACLE에겐 더 좋은 데이터입니다.\"",
    left: { label: "팀 전체에 공유한다", fx: { c: 0, r: 0, t: 2, o: -3 }, g: -6 },
    right: { label: "지휘관만 알고 있는다", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2 } },

  // ═══ 박소영 — C-081에서 후보 A 선택 시 합류 (LOG-082) ═══

  { id: "C-252", act: [3], priority: "상", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-082')>=0 && logs.indexOf('LOG-082-REPORT')<0 },
    msg: "박소영이 합류한 지 이틀째.\n\n첫 보고가 올라왔습니다.\n\n\"ORACLE 데이터 스트림 구조를 파악했습니다. 서하은 선배의 분석 로그가 큰 도움이 됐어요.\"\n\n임재혁: \"솔직히 놀랐습니다. 외부인이 이렇게 빨리 적응하는 건 처음 봅니다.\"\n\n... 유능합니다. 의심할 이유가 없습니다.",
    left: { label: "핵심 데이터 접근 허가", fx: { c: 0, r: 0, t: 1, o: 0 }, g: -2 },
    right: { label: "제한된 접근만 허용", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "C-253", act: [3,4], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return logs.indexOf('LOG-082')>=0 && logs.indexOf('LOG-081')>=0 && logs.indexOf('LOG-083')<0 && s.day>=32 },
    msg: "포스터와의 대화 중.\n\n\"아, 새 분석관이 왔다면서요?\"\n\n무심하게 말합니다.\n\n\"소영이... 잘 적응하던가요?\"\n\n이름을 알고 있습니다.\n\n\"... 아. 몰랐어요? 우리 쪽 사람인데.\"\n\n웃습니다.\n\n\"서하은이 추천했다고요? 맞아요. 소영이가 그렇게 부탁한 거니까.\"",
    left: { label: "박소영을 추궁한다", fx: { c: 0, r: 0, t: -2, o: -1 }, g: -3 },
    right: { label: "모른 척한다 — 감시한다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1 } },

  // ═══ 에이전트 강 — 흔적만 남기는 관찰자 ═══

  // Act 1: 미세한 이상 징후
  { id: "C-254", act: [1], priority: "하", bg: "forest",
    cond: function(s,g,logs){ return s.day>=3 },
    msg: "강도윤의 순찰 보고.\n\n\"봉쇄선 동측 500m 지점. 흙에 찍힌 발자국입니다.\"\n\n군화도 아니고 민간 등산화도 아닙니다. 패턴이 의도적으로 지워진 것처럼 불규칙합니다.\n\n\"누군가 여길 지나갔는데, 우리한테 보이지 않으려고 했습니다.\"",
    left: { label: "정밀 수색 — 3시간", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 },
    right: { label: "기록만 남긴다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "C-255", act: [1], priority: "하", bg: "comms",
    cond: function(s,g,logs){ return s.day>=6 },
    msg: "임재혁이 야간 통신 로그를 분석하던 중.\n\n\"03:14에 0.7초간 외부 전파 교란이 있었습니다.\"\n\n자연 현상으로 보기엔 너무 깨끗한 파형입니다.\n\n\"누군가 우리 통신 주파수를 스캔한 겁니다. 단, 감청까지는 아닙니다.\"\n\n[ORACLE: 해당 시간대 이상 기록 없음.]",
    left: { label: "통신 암호 교체", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 0 },
    right: { label: "모니터링 강화만", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // Act 2: 관찰이 구체화
  { id: "C-256", act: [2], priority: "하", bg: "restricted",
    cond: function(s,g,logs){ return s.day>=13 },
    msg: "서버실 접근 로그에 이상 기록.\n\n임재혁: \"02:41. 인식 불가 세션이 0.3초 접속했습니다.\"\n\n인증 토큰이 없습니다. 하지만 차단되지도 않았습니다.\n\n\"마치... 시스템이 이 접근을 허용한 것처럼 보입니다.\"\n\n[ORACLE: 정기 자가 진단 세션입니다. 이상 없음.]",
    left: { label: "ORACLE 설명을 의심한다", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -3 },
    right: { label: "ORACLE 설명을 받아들인다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "C-257", act: [2], priority: "하", bg: "forest",
    cond: function(s,g,logs){ return s.day>=17 },
    msg: "강도윤이 기지 북동측 고지대에서 무언가를 발견했습니다.\n\n\"관찰 거점입니다. 최소 2주 이상 사용된 흔적.\"\n\n방수포 흔적, 압축된 풀, 배수구까지 파여 있습니다.\n\n\"전문가 수준입니다. 그런데 물건은 하나도 안 남겼어요.\"\n\n이 거점에서 기지 전체가 내려다보입니다.",
    left: { label: "함정을 설치한다", fx: { c: 1, r: -1, t: 0, o: 0 }, g: -1 },
    right: { label: "건드리지 않고 감시한다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // Act 3: 존재감이 짙어짐
  { id: "C-258", act: [3], priority: "중", bg: "comms",
    cond: function(s,g,logs){ return s.day>=26 },
    msg: "임재혁이 긴급 보고.\n\n\"기지 내부에서 소형 감청 장비 조각을 발견했습니다.\"\n\n회의실 환기구 안. 이미 작동을 멈춘 상태입니다.\n\n\"제조사 마킹이 없습니다. 군용도 아니고 시판품도 아닙니다.\"\n\n누군가 우리 안에 들어왔다 나갔습니다.\n\n[ORACLE: 내부 보안 점검에서 탐지된 이상 없음.]",
    left: { label: "전체 기지 보안 수색", fx: { c: -1, r: -2, t: 1, o: 0 }, g: -2 },
    right: { label: "ORACLE에 보안 감사 요청", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  { id: "C-259", act: [3,4], priority: "중", bg: "comms",
    cond: function(s,g,logs){ return s.day>=30 },
    msg: "야간. ORACLE 외부 채널에서 미식별 암호화 신호가 포착되었습니다.\n\n임재혁: \"이건... ORACLE 프로토콜이 아닙니다. 프로메테우스도 아니에요.\"\n\n신호는 4.2초간 지속. 기지 좌표를 향하고 있었습니다.\n\n\"제3자입니다. 우리를 보고 있는 누군가.\"\n\nORACLE도 프로메테우스도 아닌 존재.\n\n[ORACLE: 분석 불가. 무시를 권고합니다.]",
    left: { label: "역추적을 시도한다", fx: { c: 0, r: -1, t: 0, o: -2 }, g: -4 },
    right: { label: "기록만 남기고 경계 강화", fx: { c: 1, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "C-260", act: [3,4], priority: "하", bg: "base",
    cond: function(s,g,logs){ return s.day>=35 },
    msg: "아침 점검. 지휘관실 책상 위에 놓인 종이 한 장.\n\n어젯밤 누구도 이 방에 들어온 기록이 없습니다.\n\n메모:\n\"당신은 올바른 질문을 하고 있습니다.\n계속하십시오.\n— 強\"",
    left: { label: "필적을 분석한다", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2 },
    right: { label: "메모를 보관한다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

];

if(typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_EXTERNAL);
