// data-facility-uprising-a.js — Part A (해금 체크 + 이브닝 + 응답)
// 분리 원본: data-facility-uprising.js
// 흐름 전체: A(이브닝 트리거) → B(체인 CH-008 + 엔딩 H + 로그)
// Depends on: data-facility.js, data-chains.js, data-endings.js, evening system

// ═══ Uprising 시설 5개 정의 (FE-012~016) — data-facility.js 에 통합됨 (main 머지 후)
// 아래 블록은 중복이므로 비활성화. data-facility.js 에서 직접 정의
if (false && typeof FACILITY_EXPANSIONS !== 'undefined') {
  FACILITY_EXPANSIONS.push(
    { id: "FE-012-DISABLED", uprising: true,
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
      upgradeCost: 15, minDay: 14, minAct: 2, coverLog: null }
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
