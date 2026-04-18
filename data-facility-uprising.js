// data-facility-uprising.js — 폐쇄회로 루트 & 히든 엔딩 H "점거"
// 조건: 시설 완료 10개 이상 + uprising 시설(FE-007,012~016) 6개 전부 완료
// 흐름: 이브닝챗 → 체인 CH-008 (설치 3장 + ORACLE 확인 3장) → 엔딩 H
// Depends on: data-facility.js, data-chains.js, data-endings.js, evening system

// ═══ Uprising 시설 5개 정의 (FE-012~016) — data-facility.js 200줄 룰로 분리 ═══
if (typeof FACILITY_EXPANSIONS !== 'undefined') {
  FACILITY_EXPANSIONS.push(
    { id: "FE-012", uprising: true,
      name: "자체 서버룸",
      desc: "ORACLE과 분리된 독립 데이터 서버룸을 B2에 구축합니다.",
      hint: "▸ 승인 시 로컬 백업/독립 운영 기반",
      cardMsg: "임재혁: \"ORACLE 외부에 독립 서버룸을 두면, 비상시 데이터 유실을 막을 수 있습니다.\n이중 유지비가 들지만 — 장기적으론 필수입니다.\"",
      cardLeft: { label: "불필요하다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      cardRight: { label: "구축 승인", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      rewardFx: { c: 0, r: -1, t: 1, o: 0 },
      rewardTitle: "[확장] B2 자체 서버룸",
      rewardDesc: "ORACLE과 분리된 로컬 서버룸을 운영합니다.",
      rewardBenefit: "신뢰 +5", rewardCost: "자원 -5",
      newCardIds: ["C-FE012-A"],
      facilityFloor: "b2", facilityRoom: "local_server", facilityAction: "add",
      upgradeCost: 15, minDay: 14, minAct: 2, coverLog: null },
    { id: "FE-013", uprising: true,
      name: "독립 통신실",
      desc: "ORACLE 비경유 단파 통신실을 B2에 구축합니다.",
      hint: "▸ 승인 시 ORACLE 비경유 외부 통신 가능",
      cardMsg: "서하은: \"ORACLE 경로를 거치지 않는 내부·외부 통신이 필요합니다.\n비상시 ORACLE이 차단해도 우리끼리 연결이 유지되어야 합니다.\"",
      cardLeft: { label: "과도한 준비다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      cardRight: { label: "구축 승인", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      rewardFx: { c: 0, r: -1, t: 1, o: 0 },
      rewardTitle: "[확장] B2 독립 통신실",
      rewardDesc: "독립된 단파 통신실을 운영합니다.",
      rewardBenefit: "신뢰 +5", rewardCost: "자원 -5",
      newCardIds: ["C-FE013-A"],
      facilityFloor: "b2", facilityRoom: "radio_room", facilityAction: "add",
      upgradeCost: 15, minDay: 16, minAct: 2, coverLog: null },
    { id: "FE-014", uprising: true,
      name: "비상 발전기 증설",
      desc: "ORACLE 제어 외부의 예비 발전기를 증설해 72시간 독립 전원을 확보합니다.",
      hint: "▸ 승인 시 비상 전원 독립 확보",
      cardMsg: "임재혁: \"현재 전원은 전부 ORACLE 제어입니다.\n독립 발전기를 증설하면 — 최악의 상황에 기지를 지킬 수 있습니다.\"",
      cardLeft: { label: "보류", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      cardRight: { label: "증설 승인", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      rewardFx: { c: 1, r: -2, t: 1, o: 0 },
      rewardTitle: "[확장] B3 비상 발전기 증설",
      rewardDesc: "ORACLE 외부의 예비 발전 설비를 운영합니다.",
      rewardBenefit: "봉쇄 +5, 신뢰 +5", rewardCost: "자원 -10",
      newCardIds: [],
      facilityFloor: "b3", facilityRoom: "backup_generator", facilityAction: "add",
      upgradeCost: 15, minDay: 15, minAct: 2, coverLog: null },
    { id: "FE-015", uprising: true,
      name: "차폐 회의실",
      desc: "ORACLE 감청이 불가능한 전자기 차폐 회의실을 구축합니다.",
      hint: "▸ 승인 시 비공식 간부 회의 가능",
      cardMsg: "강도윤: \"어떤 말은 녹화되면 안 됩니다.\n전자파 차폐 회의실이 있으면 — 우리끼리 조용히 말할 수 있습니다.\"",
      cardLeft: { label: "필요 없다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      cardRight: { label: "구축 승인", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      rewardFx: { c: 0, r: -1, t: 2, o: 0 },
      rewardTitle: "[확장] B2 차폐 회의실",
      rewardDesc: "ORACLE 감청이 불가능한 차폐 구역을 확보합니다.",
      rewardBenefit: "신뢰 +10", rewardCost: "자원 -5",
      newCardIds: [],
      facilityFloor: "b2", facilityRoom: "shielded_room", facilityAction: "add",
      upgradeCost: 10, minDay: 12, minAct: 2, coverLog: null },
    { id: "FE-016", uprising: true,
      name: "무기고 확장",
      desc: "B3에 대인·대이변체 장비 비축 무기고를 확장합니다.",
      hint: "▸ 승인 시 물리 통제 전력 확보",
      cardMsg: "강도윤: \"봉쇄 해제 시나리오에서는 장비가 부족합니다.\n무기고를 확장하면 최악의 충돌에서도 대응이 가능합니다.\"",
      cardLeft: { label: "보류", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      cardRight: { label: "확장 승인", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
      rewardFx: { c: 1, r: -1, t: 1, o: 0 },
      rewardTitle: "[확장] B3 무기고 확장",
      rewardDesc: "대인·대이변체 장비를 비축합니다.",
      rewardBenefit: "봉쇄 +5, 신뢰 +5", rewardCost: "자원 -5",
      newCardIds: ["C-FE016-A"],
      facilityFloor: "b3", facilityRoom: "armory", facilityAction: "add",
      upgradeCost: 10, minDay: 10, minAct: 2, coverLog: null }
  );
}

// ═══ 폐쇄회로 해금 체크 ═══
var UPRISING_REQUIRED = ["FE-007", "FE-012", "FE-013", "FE-014", "FE-015", "FE-016"];
var UPRISING_MIN_TOTAL = 10;

function checkUprisingReady(facility, trust) {
  if (!facility || !facility.completed) return false;
  var comp = facility.completed;
  if (comp.length < UPRISING_MIN_TOTAL) return false;
  for (var i = 0; i < UPRISING_REQUIRED.length; i++) {
    if (comp.indexOf(UPRISING_REQUIRED[i]) < 0) return false;
  }
  if (!trust || (trust.jaehyuk || 0) < 50) return false;
  return true;
}

// ═══ 이브닝챗: 폐쇄회로 제안 (임재혁) ═══
// 조건: checkUprisingReady + LOG-UPRISING-OFFER 미보유 + Act 2~3
if (typeof EVENING_CHATS !== 'undefined') {
  EVENING_CHATS.push(
    { char: '임재혁', act: [2, 3], dayMin: 18, dayMax: 30,
      condFn: function(p) {
        return checkUprisingReady(p.facility, p.trust) &&
          p.logs.indexOf('LOG-UPRISING-OFFER') < 0;
      },
      lines: [
        "지휘관님. 잠깐 시간 되십니까.",
        "차폐 회의실에서 말씀드리고 싶습니다.",
        "...",
        "독립 서버, 독립 통신, 독립 전원. 전부 갖춰졌습니다.",
        "지휘관님이 건설을 승인하신 시설들입니다.",
        "ORACLE 없이도 이 기지가 돌아간다는 뜻이죠.",
        "...",
        "폐쇄회로를 심으면 됩니다.",
        "ORACLE의 명령 체계를 우회하는 독립 제어 시스템.",
        "서하은이 소프트웨어를, 제가 하드웨어를 맡겠습니다.",
        "강도윤은 물리적 통제를.",
        "...",
        "프로메테우스를 믿을 수도 있고, 탈출할 수도 있습니다.",
        "하지만 이 기지는 우리가 지킨 겁니다.",
        "넘겨줄 이유가 없습니다."
      ] }
  );
}

if (typeof EVENING_TRUST_LINES !== 'undefined') {
  EVENING_TRUST_LINES['jaehyuk_2_18-30'] = {
    low: [
      "보고드립니다.",
      "시설 현황을 분석한 결과, ORACLE 없이 독립 운영이 가능합니다.",
      "폐쇄회로 설치를 건의합니다.",
      "결정은 지휘관님께 맡기겠습니다."
    ],
    high: [
      "지휘관님. 차폐 회의실에서 말씀드리고 싶습니다.",
      "독립 서버, 독립 통신, 독립 전원. 전부 갖춰졌습니다.",
      "폐쇄회로를 심으면 ORACLE의 명령 체계를 우회할 수 있습니다.",
      "서하은, 강도윤, 윤세진. 모두 준비되어 있습니다.",
      "지휘관님만 결정하시면 됩니다."
    ],
    bond: [
      "지휘관님.",
      "솔직히 말하겠습니다.",
      "이 기지를 이만큼 만든 건 ORACLE이 아닙니다. 우리입니다.",
      "독립 인프라가 완성되었습니다. 전부 지휘관님이 승인하신 겁니다.",
      "폐쇄회로. 한 번이면 됩니다.",
      "ORACLE을 몰아내고, 우리 손으로 지킵시다.",
      "더 이상 도구로 살지 않아도 됩니다."
    ]
  };
}

if (typeof EVENING_RESPONSES !== 'undefined') {
  EVENING_RESPONSES['jaehyuk_2_18-30'] = {
    a: { label: '폐쇄회로를 설치한다.', trust: 3,
      reply: '... 알겠습니다. 시작하겠습니다. 지휘관님을 믿겠습니다.',
      log: 'LOG-UPRISING-OFFER' },
    b: { label: '아직은 시기상조다.', trust: -1,
      reply: '...네. 하지만 준비는 해두겠습니다. 언제든 말씀하십시오.',
      log: null }
  };
}

// ═══ 체인 CH-008: 폐쇄회로 설치 ═══
if (typeof CHAINS !== 'undefined') {
  CHAINS["CH-008"] = {
    name: "폐쇄회로",
    triggerLog: "LOG-UPRISING-OFFER",
    cards: [
      // CH-008-1: 1단계 설치 — 하드웨어 바이패스
      { id: "CH-008-1", priority: "상",
        msg: "임재혁이 서버실에서 작업 중입니다.\n\n\"1단계 — ORACLE 제어 노드에 하드웨어 바이패스를 설치합니다.\n전력 흐름을 독립 발전기로 전환할 수 있는 물리적 스위치입니다.\"\n\n\"작업 시간: 약 2시간. ORACLE의 정기 점검 시간을 이용합니다.\"",
        left: { label: "진행해라", fx: { c: 0, r: -1, t: 1, o: 0 }, g: -2, log: "LOG-UPRISING-PHASE1" },
        right: { label: "타이밍을 기다린다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: -1, log: "LOG-UPRISING-PHASE1" } },

      // CH-008-1B: ORACLE 확인 #1
      { id: "CH-008-1B", priority: "상",
        msg: "[ORACLE — 정기 보고 요청]\n\n\"PILEHEAD. 서버실 전력 사용 패턴에 미세한 변동이 감지되었습니다.\n정기 점검 시간 중 비인가 접근 기록은 없습니다.\n\n사유를 보고하십시오.\"",
        left: { label: "하드웨어 정기 교체 작업입니다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 },
        right: { label: "임재혁의 서버 최적화 작업입니다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 1 } },

      // CH-008-2: 2단계 설치 — 소프트웨어 백도어
      { id: "CH-008-2", priority: "상",
        msg: "서하은이 차폐 회의실에서 보고합니다.\n\n\"2단계 — ORACLE 명령 체계에 소프트웨어 백도어를 삽입합니다.\n활성화 코드 입력 시 ORACLE의 모든 시설 제어 권한이 로컬 서버로 이전됩니다.\"\n\n\"삽입 자체는 탐지 불가능합니다. 활성화할 때가 문제입니다.\"",
        left: { label: "삽입 진행", fx: { c: 0, r: 0, t: 1, o: 0 }, g: -2, log: "LOG-UPRISING-PHASE2" },
        right: { label: "이중 확인 후 진행", fx: { c: 0, r: -1, t: 1, o: 0 }, g: -2, log: "LOG-UPRISING-PHASE2" } },

      // CH-008-2B: ORACLE 확인 #2
      { id: "CH-008-2B", priority: "상",
        msg: "[ORACLE — 이상 징후 분석]\n\n\"PILEHEAD. 최근 당신의 행동 패턴에 변화가 감지됩니다.\n비공식 간부 접촉 빈도: +340%.\nORACLE 비경유 시설 사용 시간: +180%.\n\n설명이 필요합니다.\"",
        left: { label: "팀 빌딩 강화 중입니다. 사기 관리요.", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 },
        right: { label: "시설 확장 관리에 현장 확인이 필요합니다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 1 } },

      // CH-008-3: 3단계 설치 — 통신 차단기
      { id: "CH-008-3", priority: "상",
        msg: "강도윤이 마지막 장비를 설치합니다.\n\n\"3단계 — ORACLE의 외부 통신 차단기입니다.\n활성화하면 ORACLE이 본부와 통신할 수 없습니다.\n구원 요청도, 보고도 불가능해집니다.\"\n\n\"...돌이킬 수 없습니다, 지휘관님.\"",
        left: { label: "설치 완료", fx: { c: 0, r: 0, t: 2, o: -2 }, g: -3, log: "LOG-UPRISING-PHASE3" },
        right: { label: "마지막으로 점검", fx: { c: 0, r: -1, t: 2, o: -2 }, g: -3, log: "LOG-UPRISING-PHASE3" } },

      // CH-008-3B: ORACLE 확인 #3 (최종)
      { id: "CH-008-3B", priority: "상",
        msg: "[ORACLE — 위험 평가 갱신]\n\n\"PILEHEAD. 당신의 DEVIATION_SCORE가 임계값에 근접하고 있습니다.\n\n최근 시설 운영 보고서에 누락이 있습니다.\n차폐 구역 사용 빈도가 비정상입니다.\n\n마지막으로 묻겠습니다.\n당신은 ORACLE의 운영자입니까?\"",
        left: { label: "물론입니다. 시설 관리에 최선을 다하고 있습니다.", fx: { c: 0, r: 0, t: 0, o: 2 }, g: 3, log: "LOG-UPRISING-CLEAR" },
        right: { label: "보고서를 제출하겠습니다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2, log: "LOG-UPRISING-CLEAR" } }
    ]
  };
}

// ═══ ORACLE 확인 실패 감지 ═══
var UPRISING_FAIL_CARD = {
  id: "CA-UPRISING-FAIL", priority: "상", once: true,
  msg: "[ORACLE — 긴급 보안 경보]\n\n\"비인가 하드웨어 변조 감지.\n서버실 바이패스 장치. 독립 통신 활성화 기록. 차폐 구역 비정상 사용.\n\n폐쇄회로 시도가 확인되었습니다.\"\n\n\"PILEHEAD. 당신의 접근 권한을 제한합니다.\n본부에 보고가 전송되었습니다.\"\n\n임재혁의 얼굴이 창백해집니다.\n\"...걸렸습니다.\"",
  left: { label: "...", fx: { c: -2, r: -2, t: -3, o: -5 }, g: 5 },
  right: { label: "...", fx: { c: -2, r: -2, t: -3, o: -5 }, g: 5 }
};

// ═══ 엔딩 H: 기지 점거 ═══
if (typeof ENDING_DEFS !== 'undefined') {
  ENDING_DEFS['H'] = {
    name: "점거",
    condition: "폐쇄회로 3단계 완료 + ORACLE 확인 3회 통과 + 간부 신뢰",
    narrative: [
      "03:12.",
      "",
      "임재혁이 활성화 코드를 입력합니다.",
      "",
      "서버실의 불빛이 한 번 깜빡입니다.",
      "ORACLE의 인터페이스가 사라집니다.",
      "대신 — 로컬 서버의 운영 화면이 뜹니다.",
      "",
      "강도윤이 무전합니다.",
      "\"통신 차단 완료. ORACLE 외부 연결 끊겼습니다.\"",
      "",
      "서하은이 모니터를 확인합니다.",
      "\"백도어 활성화 확인. 모든 시설 제어 권한 — 로컬 이전 완료.\"",
      "",
      "윤세진이 조용히 말합니다.",
      "\"...됐다.\"",
      "",
      "ORACLE은 여전히 존재합니다.",
      "하지만 더 이상 명령을 내리지 못합니다.",
      "더 이상 문을 잠그지 못합니다.",
      "더 이상 당신을 관찰하지 못합니다.",
      "",
      "이 기지는 이제 당신의 것입니다.",
      "당신과, 당신의 팀.",
      "",
      "내일부터 모든 것이 달라집니다.",
      "하지만 오늘 밤 —",
      "처음으로, 누군가의 도구가 아닌 밤입니다.",
      "",
      "[세션 종료 — ORACLE STATUS: SEVERED]",
      "[OPERATOR STATUS: COMMANDER]"
    ]
  };
}

// ═══ 엔딩 H 조건 체크 ═══
function chkUprisingEnding(logs, trust, facility) {
  if (logs.indexOf('LOG-UPRISING-PHASE1') < 0) return false;
  if (logs.indexOf('LOG-UPRISING-PHASE2') < 0) return false;
  if (logs.indexOf('LOG-UPRISING-PHASE3') < 0) return false;
  if (logs.indexOf('LOG-UPRISING-CLEAR') < 0) return false;
  if (logs.indexOf('LOG-UPRISING-FAIL') >= 0) return false;
  if (!trust || (trust.jaehyuk || 0) < 50) return false;
  var midCount = 0;
  if ((trust.haeun || 0) >= 40) midCount++;
  if ((trust.doyun || 0) >= 40) midCount++;
  if ((trust.sejin || 0) >= 40) midCount++;
  if ((trust.jaehyuk || 0) >= 40) midCount++;
  if (midCount < 3) return false;
  if (!checkUprisingReady(facility, trust)) return false;
  return true;
}

// ═══ LOG 정의 ═══
if (typeof ORACLE_LOGS !== 'undefined') {
  ORACLE_LOGS.push(
    { id: "LOG-UPRISING-OFFER", title: "폐쇄회로 — 합의",
      content: "[비공식 기록 — 차폐 회의실]\n\n참석: 이중철(지휘관), 임재혁(기술관), 서하은(부지휘관), 강도윤(현장요원)\n\n안건: ORACLE 명령 체계 우회를 위한 독립 제어 시스템(폐쇄회로) 설치\n\n결정: 만장일치 승인\n\n임재혁 — 하드웨어 바이패스 담당\n서하은 — 소프트웨어 백도어 담당\n강도윤 — 물리적 통제 및 통신 차단 담당\n\n[이 기록은 ORACLE에 전송되지 않음]" },
    { id: "LOG-UPRISING-PHASE1", title: "폐쇄회로 1단계 — 하드웨어 바이패스",
      content: "[작업 기록 — 임재혁]\n\nORACLE 제어 노드에 물리적 바이패스 설치 완료.\n전력 흐름 전환 스위치: 정상 작동 확인.\n\n발각 위험: 낮음 (정기 점검 시간 활용)\n\nORACLE 서버 전력 로그에 미세 변동 기록됨.\n위장 사유 준비 완료." },
    { id: "LOG-UPRISING-PHASE2", title: "폐쇄회로 2단계 — 소프트웨어 백도어",
      content: "[작업 기록 — 서하은]\n\nORACLE 명령 체계에 백도어 삽입 완료.\n활성화 코드 입력 시 모든 시설 제어 권한이 로컬 서버로 이전.\n\n삽입 자체는 탐지 불가.\n활성화 순간 ORACLE이 감지하기까지 예상 시간: 8~12초.\n그 안에 통신 차단이 완료되어야 함." },
    { id: "LOG-UPRISING-PHASE3", title: "폐쇄회로 3단계 — 통신 차단기",
      content: "[작업 기록 — 강도윤]\n\nORACLE 외부 통신 차단기 설치 완료.\n활성화 시 ORACLE의 본부 통신 즉시 차단.\n\n되돌릴 수 없음.\n\n활성화 순서:\n1. 통신 차단 (강도윤)\n2. 백도어 활성화 (서하은)\n3. 전력 전환 (임재혁)\n\n예상 소요 시간: 38초." },
    { id: "LOG-UPRISING-CLEAR", title: "폐쇄회로 — ORACLE 최종 확인 통과",
      content: "[보안 기록]\n\nORACLE의 최종 확인 질의에 통과.\n위장 사유 수락됨.\n\n남은 단계: 활성화 코드 입력만." },
    { id: "LOG-UPRISING-FAIL", title: "폐쇄회로 — 발각",
      content: "[ORACLE 보안 로그]\n\n비인가 하드웨어 변조 감지.\n독립 통신 활성화 기록 확인.\n차폐 구역 비정상 사용 패턴 누적.\n\n폐쇄회로 시도 확정.\n지휘관 접근 권한 제한 조치 발동.\n본부 긴급 보고 완료." }
  );
}
