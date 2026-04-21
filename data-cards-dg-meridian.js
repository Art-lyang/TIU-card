// data-cards-dg-meridian.js — 대가 인더스트리(DG) + 메리디안 카드 (v1.3 / 2026-04-21)
// 한국 캐논(TIU-KOREA-DAEGA.md, TIU-KOREA-DAEGA-HISTORY.md) 반영
//
// 설계 원칙:
//   - DG(대가 인더스트리): 2000년 역사 한국 왕실 직속 상단 출신 메가코퍼. 친국가파.
//     국가 초월 지속성으로 프로메테우스와도 독자 파트너 관계. ORACLE 관측망에서
//     구조적 누락 → 플레이어가 접촉하면 ORACLE 평가 하락(o↓) + 신뢰 상승(t↑) 기조
//   - Meridian: 외국 PMC + 글로벌 바이오. 한국 시장 진입을 DG에게 막힌 상태.
//     플레이어에게 DG 견제 위한 정보/물자 제공 제안 → ORACLE 평가는 중립~상승(o+)
//     but GI(본부 평가)는 외세 협력이라 감소(g↓). DG와 양자 택일 긴장 구조
//
// v1.3 추가: 메리디안 vs DG 물자 택일 카드 3장 (SUP-DM-01~03)
//   - 메리디안: o(평가)↑ — 공식 루트, ORACLE 승인 기반
//   - 대가:     t(신뢰)↑ + r(자원)↑ — 현장 직공급, 비공식 호의
//
// LOG 네트워크:
//   LOG-DG-CONTACT   : DG와 첫 접촉 (DG-01 left 선택)
//   LOG-DG-DEAL      : DG 공식 협력 수락 (DG-02/03)
//   LOG-DG-HISTORY   : DG의 2000년 역사 발견 (DG-04)
//   LOG-MD-CONTACT   : 메리디안과 첫 접촉 (MD-01 left)
//   LOG-MD-INTEL     : 메리디안 정보 수용 (MD-02)
//   LOG-MD-REJECT    : 메리디안 명시적 거절 (MD-03 right)
//   LOG-DG-VS-MD     : DG·메리디안 충돌 중재 (MD-04 분기)
//   LOG-SUPPLY-MD    : 메리디안 보급 수령 (SUP-DM-01/02/03 left)
//   LOG-SUPPLY-DG    : 대가 보급 수령 (SUP-DM-01/02/03 right)

var CARDS_DG_MERIDIAN = [

  // ═══════════════════════════════════════════════════════════
  //  DG — 대가 인더스트리 (5장)
  // ═══════════════════════════════════════════════════════════

  // DG-01 : 첫 언급 (Act 2 초반) — 서하은이 비공식 접촉 가능성 보고
  { id: "DG-01", act: [2,3], priority: "중", bg: "comms", once: true,
    req: function(s,g,logs){ return s.day >= 8; },
    msg: "서하은이 조용히 보고합니다.\n\n\"지휘관님. '대가 인더스트리'라는 기업에서 — 비공식 루트로 접촉 요청이 들어왔습니다.\"\n\n\"방산·바이오·테크 전부 하는 국내 최대 재벌입니다. 한국방벽 장비도 거의 대부분 저쪽에서 납품하고 있어요.\"\n\n[ORACLE: 대가 인더스트리 조회 — 일반 민간 기업입니다. 특이사항 없음.]",
    left:  { label: "접촉을 허가한다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2, logMsg: "LOG-DG-CONTACT" },
    right: { label: "민간 기업과는 거리를 둔다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  // DG-02 : DG 방산부문 접선 (Act 2 후반) — EV-Σ 백신 샘플 제안
  { id: "DG-02", act: [2,3], priority: "상", bg: "restricted", once: true,
    req: function(s,g,logs){ return s.day >= 11 && logs.indexOf('LOG-DG-CONTACT') >= 0; },
    msg: "대가 방산부문 사장이 기지를 비공식 방문했습니다.\n\n50대 남성. 양복 차림이지만 등이 곧습니다. 군 출신으로 보입니다.\n\n\"지휘관님. 저희가 개발한 Phase 0 백신 2세대 샘플을 — 기지에 제공하고 싶습니다.\"\n\n\"조건은 단 하나. 투여 후 데이터를 저희에게도 공유해주시면 됩니다. ORACLE 보고와 별개로.\"",
    left:  { label: "샘플을 받는다 — 데이터 공유", fx: { c: 0, r: 2, t: 1, o: -2 }, g: -3, logMsg: "LOG-DG-DEAL" },
    right: { label: "정식 절차만 따른다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // DG-03 : DG CEO 공식 서한 (Act 3) — 한국방벽 기술 데이터 요청
  { id: "DG-03", act: [3], priority: "상", bg: "comms", once: true,
    req: function(s,g,logs){ return s.day >= 15 && logs.indexOf('LOG-DG-CONTACT') >= 0; },
    msg: "대가 인더스트리 CEO 명의의 공식 서한이 도착했습니다.\n\n\"KR-INIT-001 기지의 운영 데이터 일부를 — 한국방벽 차세대 설계에 반영하고자 합니다. 협조를 요청드립니다.\"\n\n임재혁: \"이건 ORACLE 프로토콜 외부 전송입니다. 본부 허가 없이는 위험합니다.\"\n\n서하은: \"...하지만 한국방벽이 튼튼해지면, 우리가 지키는 선도 함께 튼튼해집니다.\"",
    left:  { label: "데이터 일부 제공", fx: { c: 1, r: 1, t: 1, o: -3 }, g: -4, logMsg: "LOG-DG-DEAL" },
    right: { label: "ORACLE 프로토콜 준수", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },

  // DG-04 : DG의 숨겨진 역사 발견 (Act 3) — 임재혁 조사
  { id: "DG-04", act: [3], priority: "상", bg: "lab", once: true,
    req: function(s,g,logs){ return s.day >= 18 && logs.indexOf('LOG-DG-DEAL') >= 0; },
    msg: "임재혁이 눈을 비비며 서버실에서 나옵니다.\n\n\"지휘관님. 이상한 걸 찾았습니다.\"\n\n\"대가 인더스트리의 등록 연도를 역추적하다가 — ORACLE 아카이브에 기록이 없습니다. 1945년 이전은 전부 공백이에요.\"\n\n\"그런데 국립중앙도서관 고문서에는 '대가(大家) 상단 — 가야 수로왕 시대 창설'이라고 적혀 있습니다. 2000년입니다.\"\n\n\"ORACLE이 — 일부러 지운 걸까요?\"",
    left:  { label: "조사를 계속하게 한다", fx: { c: 0, r: 0, t: 2, o: -3 }, g: -5, logMsg: "LOG-DG-HISTORY" },
    right: { label: "민감 정보다 — 덮어둔다", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },

  // DG-05 : DG 회장 직접 호출 (Act 3 후반 / Act 4) — 여의도 본사 초대
  { id: "DG-05", act: [3,4], priority: "상", bg: "base", once: true,
    req: function(s,g,logs){ return s.day >= 22 && logs.indexOf('LOG-DG-HISTORY') >= 0; },
    msg: "봉인된 서한이 전달되었습니다. ORACLE 통신망을 거치지 않은 실물 편지.\n\n「지휘관께.\n\n우리는 2000년 동안 이 나라를 지켜왔습니다.\n당신들 ORACLE보다 오래, 프로메테우스보다 앞서.\n\n여의도 본사로 한 번 오시지요. 차는 보내드리겠습니다.\n\n— 김해 허씨 종가, 대가 회장 배상」\n\n서하은: \"...국가 초월 조직입니다. 이 수준이면.\"",
    left:  { label: "초대를 수락 — 본사 방문", fx: { c: 0, r: 2, t: 2, o: -4 }, g: -6 },
    right: { label: "정중히 사양 — 기지에서 대응", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 0 } },

  // ═══════════════════════════════════════════════════════════
  //  Meridian — 외국 PMC + 바이오 (5장)
  // ═══════════════════════════════════════════════════════════

  // MD-01 : 메리디안 BioAsset 한국지사장 접촉 (Act 2 후반 / Act 3 초반)
  { id: "MD-01", act: [2,3], priority: "중", bg: "forest2", once: true,
    req: function(s,g,logs){ return s.day >= 12; },
    msg: "봉쇄선 외곽. 강도윤이 외국인 방문자를 데리고 왔습니다.\n\n40대 서양 여성. 명함에는 「Meridian Global — BioAsset Division Korea」라고 적혀 있습니다.\n\n\"안녕하세요. Dr. Elena Park입니다. 한국계 미국인이고요.\"\n\n\"저희는 한국 시장에 진입하려고 5년째 시도 중인데 — 대가 인더스트리 때문에 막혀 있어요. 지휘관님께서 도와주실 수 있을 것 같아서요.\"\n\n[ORACLE: Meridian — 해외 등록 PMC·바이오 복합 기업. 접촉 시 보고 필수.]",
    left:  { label: "짧게만 이야기를 듣는다", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -3, logMsg: "LOG-MD-CONTACT" },
    right: { label: "즉시 본부에 보고", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },

  // MD-02 : 메리디안 정보 제공 (Act 3) — DG vs 메리디안 첩보전 자료
  { id: "MD-02", act: [3], priority: "상", bg: "comms", once: true,
    req: function(s,g,logs){ return s.day >= 16 && logs.indexOf('LOG-MD-CONTACT') >= 0; },
    msg: "Dr. Park이 암호화된 USB를 건넵니다.\n\n\"대가 인더스트리가 — 변종 EV-Σ 샘플을 비공식 거래하고 있다는 증거입니다.\"\n\n\"저희는 그 거래를 깨고 싶어요. 그러려면 ORACLE이 움직여야 하고요.\"\n\n임재혁이 USB를 검토한 뒤 고개를 젓습니다.\n\n\"...데이터는 진짜입니다. 하지만 편집된 흔적이 있어요. 메리디안에게 유리하게.\"",
    left:  { label: "정보를 수용한다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: -3, logMsg: "LOG-MD-INTEL" },
    right: { label: "편집 의혹을 이유로 거절", fx: { c: 0, r: 0, t: 1, o: -1 }, g: 1 } },

  // MD-03 : 메리디안의 한국 변종 EV-Σ 샘플 요청 (Act 3)
  { id: "MD-03", act: [3], priority: "상", bg: "lab", once: true,
    req: function(s,g,logs){ return s.day >= 19 && logs.indexOf('LOG-MD-CONTACT') >= 0; },
    msg: "Dr. Park이 세 번째로 찾아왔습니다. 이번엔 윤세진과 직접 이야기하고 싶다고 합니다.\n\n\"한국 변종 EV-Σ 샘플. 단 하나면 됩니다.\"\n\n\"저희 글로벌 연구팀이 치료제 개발 속도를 3배 당길 수 있어요. 다른 나라 사람들도 살릴 수 있습니다.\"\n\n윤세진: \"...논리적으로는 맞아요. 그런데 이 샘플이 메리디안 무기 개발에 쓰일 가능성도 배제 못 합니다.\"\n\n[ORACLE: 국가급 생물자원 유출 — 중대한 위반 사항.]",
    left:  { label: "샘플 한 개만 — 인도적 명분", fx: { c: -1, r: 1, t: 1, o: -4 }, g: -6 },
    right: { label: "명시적으로 거절", fx: { c: 0, r: 0, t: 0, o: 2 }, g: 2, logMsg: "LOG-MD-REJECT" } },

  // MD-04 : DG vs 메리디안 정면 충돌 (Act 3 후반) — 플레이어에게 중재 요청
  { id: "MD-04", act: [3,4], priority: "상", bg: "base", once: true,
    req: function(s,g,logs){ return s.day >= 23 && logs.indexOf('LOG-MD-CONTACT') >= 0 && logs.indexOf('LOG-DG-CONTACT') >= 0; },
    msg: "같은 날 오전·오후에 두 세력이 동시에 접촉을 요청했습니다.\n\n대가 방산부문 사장: \"메리디안을 한국에서 완전히 몰아낼 마지막 기회입니다. 지휘관님의 보고서 한 줄이면 됩니다.\"\n\nDr. Park: \"대가가 저희 공급망을 차단하려 하고 있어요. 지휘관님만이 중립 중재자가 될 수 있습니다.\"\n\n서하은: \"...양쪽 다 우리를 이용하려는 거예요.\"",
    left:  { label: "DG 편을 든다 — 국내 기업 우선", fx: { c: 1, r: 2, t: 0, o: -2 }, g: -3, logMsg: "LOG-DG-VS-MD" },
    right: { label: "중립 유지 — 본부에 판단 이관", fx: { c: 0, r: -1, t: 1, o: 1 }, g: 1 } },

  // MD-05 : 메리디안 탈출 지원 제안 (Act 4) — 엔딩 분기 힌트
  { id: "MD-05", act: [4], priority: "상", bg: "comms", once: true,
    req: function(s,g,logs){ return s.day >= 27 && logs.indexOf('LOG-MD-INTEL') >= 0 && logs.indexOf('LOG-MD-REJECT') < 0; },
    msg: "암호화된 외부 통신. Dr. Park의 목소리입니다.\n\n\"지휘관님. 상황이 나빠진 거 알아요. ORACLE 평가가 바닥이라는 것도.\"\n\n\"저희가 — 공식적으로 말씀드릴게요. 한국 외부로 나오시면, 메리디안이 신원을 보장합니다. 요원들도 포함해서요.\"\n\n\"결정은 지휘관님 몫이에요. 하지만 문은 열려 있어요. 48시간.\"\n\n[ORACLE: ...분석 데이터 불충분. 권고 생성 실패.]",
    left:  { label: "제안을 숙고 — 문을 열어둔다", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -4 },
    right: { label: "제안을 즉각 거절", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // ═══════════════════════════════════════════════════════════
  //  Supply Choice — 메리디안 vs DG 물자 택일 (3장)
  //  설계: 양측 동시 접촉 성립 후, 동일 타이밍에 보급을 제안.
  //        플레이어가 축(o vs t·r)을 선택하도록 강제하는 순간.
  // ═══════════════════════════════════════════════════════════

  // SUP-DM-01 : 기초 보급 택일 (Act 2 후반)
  { id: "SUP-DM-01", act: [2,3], priority: "중", bg: "base", once: true,
    req: function(s,g,logs){ return s.day >= 13 && logs.indexOf('LOG-DG-CONTACT') >= 0 && logs.indexOf('LOG-MD-CONTACT') >= 0; },
    msg: "보급품 재고가 임박했습니다. 같은 날, 두 세력에서 동시에 물자 제안이 들어왔습니다.\n\nDr. Park(메리디안): \"의료 키트 500셋에 기본 의료물자 패키지 얹어서요. 서류는 제가 다 처리해놨어요 — 이런 거 다른 지부에서도 많이 해봐서. 지휘관님은 싸인만.\"\n\n대가 방산부문: \"전투 식량 1톤, 탄약, 정비 부품. 오늘 밤 안에 도착 가능합니다. ...그런데 실례지만, 기지 현 인원수랑 소모 패턴을 한번만 짚어주시겠습니까? 적정량 맞춰 다시 실으려고요.\"\n\n강도윤: \"지휘관님. 고를 수 있는 건 한쪽입니다.\"",
    left:  { label: "메리디안 — 공식 의료 보급", fx: { c: 0, r: 1, t: 0, o: 3 }, g: 1, logMsg: "LOG-SUPPLY-MD" },
    right: { label: "대가 — 현장 즉시 보급", fx: { c: 0, r: 2, t: 3, o: -1 }, g: -1, logMsg: "LOG-SUPPLY-DG" } },

  // SUP-DM-02 : 중장기 장비 택일 (Act 3)
  { id: "SUP-DM-02", act: [3], priority: "상", bg: "comms", once: true,
    req: function(s,g,logs){ return s.day >= 18 && logs.indexOf('LOG-DG-CONTACT') >= 0 && logs.indexOf('LOG-MD-CONTACT') >= 0; },
    msg: "기지 방어선 보강 장비가 필요한 시점. 양측이 또 경쟁적으로 제안합니다.\n\nDr. Park: \"전술 드론 12기. 유럽 공장 재고요 — 아, ORACLE 프로토콜 승인은 방금 아시아 총괄 본부랑 통화해서 받아놨어요. 파일 그냥 넘기시면 돼요. 쉽죠?\"\n\n대가 CEO 서한: \"차세대 자동포탑 4기 — 무상 대여입니다. 다만 한 가지만. 현재 귀 기지가 ORACLE과 어떤 데이터 공유 범위로 묶여 있는지, 한번만 정리해주시면 저희 기술팀이 호환 작업을 서두르겠습니다.\"\n\n임재혁: \"...둘 다 뭔가를 캐려고 하고 있는데, 방식이 너무 달라요.\"",
    left:  { label: "메리디안 드론 — 통신 투명성", fx: { c: 1, r: 1, t: -1, o: 4 }, g: 2, logMsg: "LOG-SUPPLY-MD" },
    right: { label: "대가 자동포탑 — 데이터 대가", fx: { c: 2, r: 3, t: 2, o: -2 }, g: -2, logMsg: "LOG-SUPPLY-DG" } },

  // SUP-DM-03 : 긴급 물자 택일 (Act 3 후반 / Act 4)
  { id: "SUP-DM-03", act: [3,4], priority: "상", bg: "restricted", once: true,
    req: function(s,g,logs){ return s.day >= 24 && (logs.indexOf('LOG-DG-DEAL') >= 0 || logs.indexOf('LOG-MD-INTEL') >= 0); },
    msg: "자원 고갈 경보. 선택의 여유가 없습니다.\n\nDr. Park 암호 통신: \"긴급 수송기 한 대 준비됐어요. 의료·식량 통합 패키지고요. 착륙 승인? 이미 ORACLE 관제랑 얘기 끝났어요 — 지휘관님 서명 한 번이면 깔끔합니다.\"\n\n대가 방산부문(회장 명의): \"수송헬기 세 대를 오늘 밤 띄우겠습니다. 수리 부품부터 치료제까지요. 다만 — 기지의 요원 명단을, 성함만이라도 전달받을 수 있다면 감사 표시를 따로 드리고 싶습니다.\"\n\n서하은: \"...양쪽 다 대가가 있어요. 방식이 다를 뿐.\"",
    left:  { label: "메리디안 수송기 — 공식 루트", fx: { c: 1, r: 2, t: -1, o: 5 }, g: 2, logMsg: "LOG-SUPPLY-MD" },
    right: { label: "대가 수송헬기 — 조건부 호의", fx: { c: 2, r: 4, t: 4, o: -3 }, g: -3, logMsg: "LOG-SUPPLY-DG" } }

];

// CARDS 배열에 주입
if (typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_DG_MERIDIAN);
