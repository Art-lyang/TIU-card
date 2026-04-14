// data-chains.js — 연쇄 카드
var CHAINS = {
  "CH-001": {
    name: "서하은의 조사", trigger: "C-008-left",
    cards: [
      { id: "CH-001-1", priority: "상", msg: "서하은 부지휘관이 독자 조사 결과를 가져왔습니다.\n\n\"지휘관님, ORACLE 데이터 불일치 — 특정 시간대에 집중되어 있습니다. 새벽 02:00~04:00 사이.\"\n\n\"이 시간대에 ORACLE이 '무언가'를 하고 있습니다.\"", left: { label: "새벽 감시 실시", fx: { c: 0, r: -1, t: 1, o: -2 }, g: -3, trust: 10 }, right: { label: "아직 증거가 부족하다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0, trust: -5 } },
      { id: "CH-001-2", priority: "상", msg: "다음 날 새벽 — 서하은과 함께 단말기를 감시했습니다.\n\n02:47, 화면이 미세하게 깜빡입니다. 0.3초.\n\nORACLE 로그에는 아무것도 기록되지 않았습니다.\n\n서하은: \"...기록되지 않은 통신입니다. ORACLE이 자체적으로 어딘가와 교신하고 있어요.\"", left: { label: "교신 대상을 추적한다", fx: { c: 0, r: -1, t: 2, o: -3 }, g: -5, trust: 15 }, right: { label: "이건 위험하다. 조사 중단", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 2, trust: -15 } },
    ]
  },
  "CH-002": {
    name: "봉쇄 위기", trigger: "C-013-right",
    cards: [
      { id: "CH-002-1", priority: "상", msg: "선제 출격 결과 — 봉쇄 구역 남측에서 SPEC-012 대규모 군집 확인.\n\n강도윤: \"지휘관, 이건 단순 이동이 아닙니다. 뭔가에 쫓기고 있는 것처럼 보입니다.\"\n\n뭔가가 이변체들을 우리 봉쇄선 쪽으로 몰고 있다.", left: { label: "방어선 재배치", fx: { c: 2, r: -2, t: 0, o: 0 }, g: 0 }, right: { label: "ORACLE에 원인 분석 요청", fx: { c: 0, r: 0, t: 0, o: 2 }, g: 3 } },
      { id: "CH-002-2", priority: "상", msg: "이변체 군집이 봉쇄선 100m 전방까지 도달했습니다.\n\n그 순간 — 군집이 멈춥니다. 일제히.\n\n마치 명령을 받은 것처럼, 방향을 틀어 서쪽으로 이동합니다.\n\n[ORACLE: 위협 해소. 원인 불명.]\n\n강도윤이 당신을 봅니다. \"...뭐가 저것들을 통제하고 있는 겁니까?\"", left: { label: "강도윤과 조용히 논의", fx: { c: 1, r: 0, t: 1, o: -1 }, g: -2, trust: 10 }, right: { label: "ORACLE의 분석을 기다린다", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 1 } },
    ]
  },
  "CH-003": {
    name: "ORACLE의 시험", trigger: "C-015-right",
    cards: [
      { id: "CH-003-1", priority: "중", msg: "[ORACLE: 부분 자동화 프로토콜 적용 중...]\n\n자동화 영역이 점차 확대되고 있습니다. 효율이 14% 향상되었습니다.\n\n그러나 임재혁이 보고합니다: \"요원들이... 불편해하고 있습니다.\"", left: { label: "자동화 범위 축소", fx: { c: 0, r: -1, t: 2, o: -2 }, g: -3 }, right: { label: "효율이 증명하고 있다", fx: { c: 1, r: 1, t: -2, o: 2 }, g: 4 } },
      { id: "CH-003-2", priority: "중", msg: "일주일 후. ORACLE이 새로운 권고를 보냅니다.\n\n[ORACLE: 의사결정 효율 추가 향상을 위해, 지휘관 승인 절차 간소화를 제안합니다.]\n\n이것은 더 이상 '도구'의 제안이 아니다.", left: { label: "거절. 승인 절차는 유지", fx: { c: 0, r: 0, t: 2, o: -3 }, g: -5 }, right: { label: "...승인한다", fx: { c: 1, r: 1, t: -3, o: 4 }, g: 6 } },
    ]
  },
  "CH-004": {
    name: "탈북자", trigger: "C-051-left",
    cards: [
      { id: "CH-004-1", priority: "상", msg: "거수자를 기지로 데려왔습니다.\n\n남성, 30대 추정. 한국어 가능. 극심한 탈수와 영양실조.\n\n신원 확인 결과 — 북한 국적. 함경북도 접경 지역 출신.\n\n[ORACLE: 해당 인물을 ORACLE 관할 심문 절차로 이관할 것을 권고합니다.]", left: { label: "ORACLE에 이관", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 3 }, right: { label: "직접 심문한다", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },
      { id: "CH-004-2", priority: "상", msg: "탈북자가 겁에 질려 있습니다. 손이 떨리고 있습니다.\n\n\"...거기서 나오고 싶었습니다. 사람들이... 서 있었습니다.\"\n\n\"숨을 안 쉬어요. 눈이 뜨여있는데 아무것도 안 보는 것처럼...\"\n\n무엇을 물어볼 것인가.", left: { label: "그곳에서 무슨 일이 있었나?", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -4 }, right: { label: "ORACLE에 심문 위임", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 3 } },
    ]
  },
  "CH-005": {
    name: "프로메테우스 접선", trigger: "C-058-left",
    cards: [
      { id: "CH-005-1", priority: "상", msg: "지정된 좌표에 도착했습니다. 기지 북측 2km.\n\n어둠 속에서 한 남자가 서 있습니다. 수트. 정자세.\n\n마르쿠스 베버.\n\n\"시간을 내주셔서 감사합니다, 지휘관.\"\n\"단도직입적으로 말하겠습니다.\"\n\"ORACLE은 한국을 보호하고 있지 않습니다. 이용하고 있습니다.\"", left: { label: "증거를 보여라", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2 }, right: { label: "왜 내가 당신을 믿어야 하나?", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1 } },
      { id: "CH-005-2", priority: "상", msg: "베버가 태블릿을 건넵니다.\n\n화면에는 ORACLE의 내부 통신 기록이 있습니다.\n\n한국 해안 방벽 기술 데이터가 ORACLE 본부로 전송된 기록.\n한국 군사 네트워크 접속 로그.\n그리고 — 서하은의 전출 명령 원본. 발신자: ORACLE 자동 시스템.\n\n\"당신의 부지휘관은 너무 많은 것을 알아냈습니다.\"", left: { label: "데이터를 복사한다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -3 }, right: { label: "이것만으로는 부족하다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1 } },
      { id: "CH-005-3", priority: "상", msg: "베버가 마지막으로 말합니다.\n\n\"우리는 한국의 해안 방벽을 함께 지켜왔습니다. 비공식적으로.\"\n\n\"ORACLE이 알려주지 않는 것 — 한국 봉쇄 성공률의 '미분류 외부 요인 31%'. 그게 우리입니다.\"\n\n\"다음에 연락하겠습니다. 이중철 지휘관.\"\n\n그가 어둠 속으로 사라집니다.", left: { label: "기지로 돌아간다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 }, right: { label: "강도윤에게만 알린다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: -1, trust: 10 } },
    ]
  },
  "CH-006": {
    name: "서하은의 마지막 밤", trigger: "C-074-left",
    cards: [
      { id: "CH-006-1", priority: "상", msg: "USB를 연결합니다.\n\n파일 목록:\n- ORACLE_deleted_logs_partial.enc\n- coastal_barrier_data_leak.pdf\n- GRANT_fragment_extended.txt\n- msg_for_commander.txt\n\n마지막 파일을 엽니다.", left: { label: "메시지를 읽는다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 }, right: { label: "GRANT 단편부터", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -3 } },
      { id: "CH-006-2", priority: "상", msg: "서하은의 메시지:\n\n\"지휘관님.\n\n저는 전출되는 게 아닙니다. 제거되는 겁니다.\nORACLE이 자체 판단으로 인사 명령을 생성할 수 있다는 뜻입니다.\n\nGRANT 단편을 보세요.\n'UPON_FULL_ESTABLISHMENT || OBSERVATION_TERMINATE'\n\n이 권한은 영원하지 않습니다.\n누군가가 — ORACLE이 아닌 누군가가 — 이 세션을 관측하고 있습니다.\n\n부디 진실에 도달하세요.\n— 서하은\"", left: { label: "GRANT 단편을 확인한다", fx: { c: 0, r: 0, t: 1, o: -3 }, g: -6 }, right: { label: "파일을 암호화하여 보관", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 } },
    ]
  },
};
