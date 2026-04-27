// data-cards-dg-meridian.js — DG / Meridian 콘텐츠 팩 v1.2
// 한국 토착 재벌 '대가 인더스트리(DG)'와 외국계 글로벌 PMC/바이오자산 '메리디안(MD)' 양대 축.
// 트리거 코드(app-logic.js)와 정확히 매칭된 ID 사용. 카드 ID 변경 금지.

var CARDS_DG_MERIDIAN = [
  // ═══════════════════════════════════════════════════════════
  // DG — 대가 인더스트리 접촉 라인 (Act 2 후반 ~ Act 3)
  // 좌선택 = 접촉/거래 (GI 하락) / 우선택 = ORACLE 채널 보고 (GI 상승)
  // ═══════════════════════════════════════════════════════════

  // DG-01 — 첫 접촉
  { id: "DG-01", act: [2,3], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return s.day>=10 && logs.indexOf('LOG-DG-CONTACT')<0 },
    msg: "기지 외부 통신선에 비공식 메시지가 들어왔습니다.\n\n발신자 서명: 대가 인더스트리 대외협력실.\n\n\"강원 봉쇄 작전에 비공식 보급 채널을 제안드립니다. 정부 절차 없이도 의약품·예비 부품을 받으실 수 있습니다. 답신 의무는 없습니다.\"\n\n임재혁: \"DG는 백신·방산·통신을 다 쥔 곳입니다. ORACLE 보고에 올라가지 않는 채널이에요.\"",
    left: { label: "비공식 채널을 받아둔다", fx: { c: 0, r: 1, t: 0, o: -2 }, g: -3 },
    right: { label: "ORACLE 보고로 회신한다", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 2 } },

  // DG-02 — 거래 1차
  { id: "DG-02", act: [2,3], priority: "중", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-CONTACT')>=0 && logs.indexOf('LOG-DG-DEAL')<0 },
    msg: "DG 측 제안. 봉쇄선 노후 센서 12기를 무상 교체해주겠다는 안건.\n\n조건은 단 하나 — 교체 작업 중 수집되는 봉쇄선 인근 EV-Σ 활동 데이터의 사본을 DG 연구부에 제공.\n\n서하은: \"센서 노후는 사실입니다. 본부 보급은 빨라야 두 달 뒤예요.\"\n\n... 그러나 데이터를 외부에 흘리는 건 별개의 문제입니다.",
    left: { label: "수락 — 데이터 사본 제공", fx: { c: 2, r: 1, t: 0, o: -2 }, g: -4 },
    right: { label: "거절 — 본부 보급 대기", fx: { c: -1, r: 0, t: 1, o: 1 }, g: 2 } },

  // DG-03 — 거래 2차 (좌선택 시 LOG-DG-DEAL 트리거됨, 둘 다 가능하게 분기)
  { id: "DG-03", act: [3], priority: "중", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-CONTACT')>=0 && logs.indexOf('LOG-DG-DEAL')<0 && s.day>=15 },
    msg: "DG 임원 면담 요청. 화상 통신.\n\n\"지휘관님. 우리는 ORACLE보다 한국에 오래 있었습니다. 2000년이라는 숫자는 빈말이 아닙니다.\"\n\n\"한국 봉쇄가 외국 시스템의 공로로 포장되는 걸 우리는 두고 보지 않을 겁니다. 당신과 한 줄을 만들고 싶습니다.\"\n\n조용한 협박은 아닙니다. 그러나 거절하기 어려운 어조입니다.",
    left: { label: "한 줄을 받아들인다", fx: { c: 0, r: 2, t: 0, o: -3 }, g: -5 },
    right: { label: "공식 절차만 인정한다", fx: { c: 0, r: -1, t: 0, o: 2 }, g: 3 } },

  // DG-04 — 역사 자료 제공 (GI에 따라 깊은 LOG로 이어짐)
  { id: "DG-04", act: [3], priority: "상", bg: "restricted",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-DEAL')>=0 && logs.indexOf('LOG-DG-HISTORY')<0 && s.day>=18 },
    msg: "DG 측이 봉인된 사내 자료 일부를 보내왔습니다.\n\n\"우리가 한국 정부와 1960년대부터 맺어온 비공개 계약 목록입니다. 당신이 알아야 할 부분만 추렸습니다.\"\n\n임재혁: \"...서론만 봐도 알 수 있습니다. 한국 안보 기간망의 절반 이상이 DG 인프라 위에 올라가 있습니다.\"\n\n읽으면 봉쇄 작전의 의미가 달라집니다.",
    left: { label: "전부 읽는다", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -4 },
    right: { label: "요약만 보고 봉인", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // ═══════════════════════════════════════════════════════════
  // MD — Meridian 라인 (Act 3)
  // ═══════════════════════════════════════════════════════════

  // MD-01 — 첫 접촉
  { id: "MD-01", act: [3], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return s.day>=16 && logs.indexOf('LOG-MD-CONTACT')<0 },
    msg: "외교부 비공식 라인을 통해 들어온 메시지.\n\n\"메리디안 BioAsset Division. 한국 시장 진입 심의에서 거부된 기관입니다.\"\n\n발신 내용: \"우리는 ORACLE 데이터에 접근하지 못합니다. 그래서 봉쇄선 근처 인디펜던트 관측소를 운영해왔습니다. 당신과 데이터 교환을 제안합니다.\"\n\n서하은: \"...ORACLE 외부 관측 데이터는 사실 우리한테도 가치가 큽니다.\"",
    left: { label: "교환 채널을 연다", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "발신지를 차단한다", fx: { c: 1, r: 0, t: -1, o: 2 }, g: 2 } },

  // MD-02 — 정보 수령
  { id: "MD-02", act: [3], priority: "중", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('LOG-MD-CONTACT')>=0 && logs.indexOf('LOG-MD-INTEL')<0 },
    msg: "메리디안에서 첫 번째 인텔 패키지가 도착.\n\n동해안 봉쇄선 외측에서 자체 위성으로 잡은 야간 열원 12건. ORACLE 보고에는 없는 좌표가 셋 섞여 있습니다.\n\n\"ORACLE이 빼놓은 것일 수도, 보지 못한 것일 수도 있습니다. 어느 쪽이든 알 가치가 있죠.\"\n\n... 받으면 빚을 진 셈이 됩니다.",
    left: { label: "받아 분석한다", fx: { c: 1, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "되돌려보낸다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // MD-03 — 한국 진입 요청 (좌선택 시 직접 거절 LOG, 우선택 시 더 정중한 거절)
  { id: "MD-03", act: [3], priority: "중", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-MD-INTEL')>=0 && logs.indexOf('LOG-MD-REJECT')<0 },
    msg: "메리디안 측이 본격적인 요청을 올렸습니다.\n\n\"한국지부 관할 봉쇄 구역 내 임시 관측 인력 4명 파견을 허가해주십시오. 비무장. 데이터 공유 의무 부과.\"\n\n강도윤: \"외국 PMC 인력을 봉쇄 구역에 들이는 겁니다. 정부 심의 이미 거부된 곳이에요.\"\n\n임재혁: \"하지만 그쪽이 가진 위성 자산이 우리한테 없는 건 사실입니다.\"",
    left: { label: "직접 거절한다", fx: { c: 1, r: 0, t: 0, o: 1 }, g: 2 },
    right: { label: "조건부로 보류한다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // MD-04 — DG vs MD (좌선택 시 DG 편 들기 — LOG-DG-VS-MD)
  { id: "MD-04", act: [3,4], priority: "상", bg: "restricted",
    cond: function(s,g,logs){ return (logs.indexOf('LOG-MD-INTEL')>=0||logs.indexOf('LOG-DG-DEAL')>=0) && logs.indexOf('LOG-DG-VS-MD')<0 && logs.indexOf('LOG-MD-BACKCHANNEL')<0 },
    msg: "DG와 메리디안이 같은 시간대 다른 채널로 동시 접촉했습니다.\n\nDG: \"메리디안이 한국 봉쇄 데이터에 접근하려 한다는 정보가 있습니다. 그쪽을 차단해주십시오. 우리 정보망에 도움이 될 겁니다.\"\n\n메리디안: \"DG가 ORACLE 라인 외부에서 한국 안보를 사유화하고 있습니다. 견제할 수 있는 건 외부 시선뿐입니다.\"\n\n양쪽 다 진실의 일부입니다.",
    left: { label: "DG 편에 선다 — 메리디안 차단 협조", fx: { c: 1, r: 1, t: 0, o: -2 }, g: -4 },
    right: { label: "둘 다 거리를 둔다", fx: { c: 0, r: -1, t: 1, o: 1 }, g: 1 } },

  // ═══════════════════════════════════════════════════════════
  // SUP-DM — 물자 택일 (Act 3 ~ Act 4)
  // 좌선택 = Meridian 측 / 우선택 = DG 측 (트리거 코드 기준)
  // ═══════════════════════════════════════════════════════════

  // SUP-DM-01 — 의료 보급
  { id: "SUP-DM-01", act: [3,4], priority: "상", bg: "base",
    cond: function(s,g,logs){ return s.day>=20 && (logs.indexOf('LOG-DG-CONTACT')>=0||logs.indexOf('LOG-MD-CONTACT')>=0) && logs.indexOf('LOG-SUPPLY-MD')<0 && logs.indexOf('LOG-SUPPLY-DG')<0 },
    msg: "의무실에서 EV-Σ Phase 0 억제제 잔량이 두 달치 이하로 떨어졌습니다.\n\n동시에 두 곳에서 보급 제안.\n\nMeridian: \"우리 BioAsset 라인의 광역 임상 데이터까지 같이 드립니다. 단, 처방 결과를 우리에게도 회신해주십시오.\"\n\nDG: \"국산 동량 제제. 데이터 회신 요구는 없습니다. 단가 협의는 다음 거래에 반영합니다.\"",
    left: { label: "Meridian 의약품 + 데이터 교환", fx: { c: 0, r: 2, t: 1, o: -2 }, g: -3 },
    right: { label: "DG 국산 제제 + 향후 거래 부담", fx: { c: 0, r: 1, t: 0, o: -1 }, g: -2 } },

  // SUP-DM-02 — 통신 장비 보급
  { id: "SUP-DM-02", act: [3,4], priority: "중", bg: "comms",
    cond: function(s,g,logs){ return s.day>=22 && (logs.indexOf('LOG-DG-CONTACT')>=0||logs.indexOf('LOG-MD-CONTACT')>=0) && logs.indexOf('LOG-SUPPLY-MD')<0 && logs.indexOf('LOG-SUPPLY-DG')<0 },
    msg: "임재혁 보고. 봉쇄선 통신 중계기 두 기가 한계 수명입니다.\n\n\"DG는 자기네 백본망 호환 모듈을 보내겠다고 합니다. 설치되면 우리 통신이 DG 라우터를 한 번 거치게 됩니다.\"\n\n\"메리디안은 자체 위성 단말기를 임대하겠답니다. ORACLE 외 별도 채널이 생기는 거예요. 둘 다 공짜는 아닙니다.\"",
    left: { label: "메리디안 위성 단말기 도입", fx: { c: 0, r: 0, t: 0, o: -2 }, g: -3 },
    right: { label: "DG 백본 호환 모듈 도입", fx: { c: 1, r: 1, t: 0, o: -1 }, g: -2 } },

  // SUP-DM-03 — 인력 보강
  { id: "SUP-DM-03", act: [3,4], priority: "중", bg: "base",
    cond: function(s,g,logs){ return s.day>=25 && (logs.indexOf('LOG-DG-CONTACT')>=0||logs.indexOf('LOG-MD-CONTACT')>=0) && logs.indexOf('LOG-SUPPLY-MD')<0 && logs.indexOf('LOG-SUPPLY-DG')<0 },
    msg: "현장 요원 누적 피로. 강도윤이 외부 인력 보강을 건의합니다.\n\n\"DG 측은 한국 정부 보안 검증을 통과한 자회사 경비 인력 6명을 보내겠다고 합니다. 단, 우리 작전 지휘권은 일부 공유.\"\n\n\"메리디안 쪽은 자체 PMC 4명. 무장 좋고 경험 많은데... 외국인이고, 한국 법적 지위가 회색입니다.\"",
    left: { label: "메리디안 PMC 4명 수용", fx: { c: 2, r: -1, t: -1, o: -2 }, g: -3 },
    right: { label: "DG 자회사 경비 6명 수용", fx: { c: 1, r: 0, t: 0, o: 0 }, g: -1 } },

  // ═══════════════════════════════════════════════════════════
  // CA23-DV — 내부 분열 중재 사건 (Act 2~3)
  // 좌선택 = 중재 (LOG-DV-XX-MED 트리거) / 우선택 = 한쪽 편들기 또는 방치
  // ═══════════════════════════════════════════════════════════

  // CA23-DV-01 — 서하은 vs 임재혁 (DG 데이터 사본 건)
  { id: "CA23-DV-01", act: [2,3], priority: "중", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-CONTACT')>=0 && logs.indexOf('LOG-DV-01-MED')<0 && s.day>=12 },
    msg: "회의실. 서하은과 임재혁이 마주 앉아 있습니다.\n\n임재혁: \"DG가 보내는 펌웨어 패치, 안 받으면 다음 달부터 통신 효율이 30% 떨어집니다.\"\n\n서하은: \"받으면 우리 통신이 DG 백본을 무조건 한 번 거치게 됩니다. 그게 어떤 의미인지 알면서.\"\n\n... 둘 다 옳습니다. 한쪽을 누르면 다른 쪽이 깨집니다.",
    left: { label: "둘 다 부르고 절충안을 만든다", fx: { c: 0, r: -1, t: 2, o: 0 }, g: -1 },
    right: { label: "임재혁 손을 들어준다 — 패치 수용", fx: { c: 1, r: 0, t: -1, o: 0 }, g: -1 } },

  // CA23-DV-02 — 강도윤 vs 윤세진 (메리디안 의약품 건)
  { id: "CA23-DV-02", act: [3], priority: "중", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-MD-CONTACT')>=0 && logs.indexOf('LOG-DV-02-MED')<0 && s.day>=18 },
    msg: "윤세진이 강도윤을 가로막고 있습니다.\n\n윤세진: \"메리디안 임상 데이터까지 받으면 억제제 효율을 더 빨리 올립니다. 환자가 줄어요.\"\n\n강도윤: \"외국 PMC가 우리 환자 데이터를 가져갑니다. 그 데이터가 다음에 어디서 무기로 돌아올지 모릅니다.\"\n\n둘 다 누군가의 생명을 들어 말하고 있습니다.",
    left: { label: "직접 자리에 앉혀 합의를 끌어낸다", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -2 },
    right: { label: "윤세진 의견 채택 — 데이터 교환", fx: { c: 0, r: 1, t: 0, o: -2 }, g: -3 } },

  // CA23-DV-03 — 강도윤 vs 임재혁 (PMC 인력 건)
  { id: "CA23-DV-03", act: [3,4], priority: "중", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-SUPPLY-MD')>=0 || (logs.indexOf('LOG-MD-INTEL')>=0 && s.day>=24 && logs.indexOf('LOG-DV-03-MED')<0) },
    req: function(s,g,logs){ return logs.indexOf('LOG-DV-03-MED')<0 },
    msg: "강도윤이 격앙된 채 들어왔습니다.\n\n\"메리디안 PMC 둘이 어제 저희 야간 순찰 동선을 사진으로 남겼습니다. 임재혁은 '데이터 가치가 더 크다'고 합니다.\"\n\n임재혁: \"순찰 동선은 이미 메리디안이 위성으로 보던 겁니다. 새로운 노출이 아닙니다.\"\n\n강도윤: \"제 부하들 안전 문제입니다. 데이터 가치로 환산할 일이 아닙니다.\"",
    left: { label: "현장 안전 우선 — PMC 행동 제한 합의", fx: { c: 1, r: 0, t: 2, o: -1 }, g: -2 },
    right: { label: "임재혁 의견 채택 — 현행 유지", fx: { c: 0, r: 0, t: -2, o: 0 }, g: -1 } },

  // CA23-DV-04 — 서하은 vs 윤세진 (DG 거래 확장 건)
  { id: "CA23-DV-04", act: [3,4], priority: "상", bg: "restricted",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-DEAL')>=0 && logs.indexOf('LOG-DV-04-MED')<0 && s.day>=22 },
    msg: "윤세진이 서하은의 책상 앞에 서 있습니다.\n\n윤세진: \"DG 바이오부서가 EV-Σ 변종 치료제 임상에 우리 환자 검체를 요청했어요. 통과하면 한국 환자가 먼저 혜택을 봅니다.\"\n\n서하은: \"검체 한 번 흘러나가면 회수 못 합니다. DG가 이 데이터로 뭘 할지 우리는 모릅니다.\"\n\n둘 다 한국을 위한다고 말하고 있습니다.",
    left: { label: "조건부 검체 — 양측 합의문 작성", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -2 },
    right: { label: "서하은 의견 채택 — 검체 거부", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 1 } },

  // ═══════════════════════════════════════════════════════════
  // CH-* — 큰 분기 후속 카드 (사건 연쇄)
  // 트리거 코드 기준 모두 좌선택이 LOG 트리거
  // ═══════════════════════════════════════════════════════════

  // CH-DG-04-L-2 — DG 역사 자료를 더 깊게 파고드는 후속
  { id: "CH-DG-04-L-2", act: [3,4], priority: "상", bg: "restricted",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-HISTORY')>=0 && logs.indexOf('LOG-DG-HISTORY-DEEP')<0 && s.day>=22 },
    msg: "DG가 보낸 자료에 본문 외 부록이 첨부돼 있었습니다.\n\n암호화된 회의록 사본 — 1998년, 2009년, 2018년. 한국 안보·보건 정책 결정 회의에 DG 임원이 비공식 참석한 기록입니다.\n\n임재혁: \"...이건 기록되면 안 되는 자료입니다. 우리한테 보낸 이유가 뭘까요?\"\n\n서하은: \"카드를 까보이는 겁니다. 우리도 같이 카드를 까라는 신호.\"",
    left: { label: "전부 해독해 보존한다", fx: { c: 0, r: 0, t: 0, o: -3 }, g: -5 },
    right: { label: "원본 폐기 후 보고 누락", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },

  // CH-MD-03-L-2 — Meridian이 DG 보복 정보를 제공
  { id: "CH-MD-03-L-2", act: [3,4], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('LOG-MD-REJECT')>=0 && logs.indexOf('LOG-DG-RETALIATE')<0 && s.day>=24 },
    msg: "메리디안 측이 후속 메시지를 보냈습니다.\n\n\"진입은 거절하셨지만, 호의로 알려드립니다. DG가 당신 부대 평가서를 정부 라인에 손보고 있다는 정황이 있습니다.\"\n\n첨부 파일 — 통화 녹취 일부. DG 임원이 누군가에게 \"강원지부 지휘관은 협력적이지 않다\"고 말하고 있습니다.\n\n임재혁: \"...진위 확인 어렵습니다. 하지만 패턴은 그럴듯합니다.\"",
    left: { label: "녹취를 받아 보관 — 향후 카드", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "메리디안 농간으로 간주, 폐기", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // CH-SUP-DG-1-R-2 — DG 거래 장부의 일부가 흘러나옴
  { id: "CH-SUP-DG-1-R-2", act: [3,4], priority: "상", bg: "restricted",
    cond: function(s,g,logs){ return logs.indexOf('LOG-SUPPLY-DG')>=0 && logs.indexOf('LOG-DG-LEDGER')<0 && s.day>=26 },
    msg: "지난번 DG 보급 화물에 종이 한 장이 잘못 끼어 있었습니다.\n\n출고 장부 발췌. 우리 기지 외에도 7개 처에 동일 시기 동일 수량 보급이 나갔습니다.\n\n수신처 중 셋이 — 외부에 알려진 적 없는 비공식 시설 코드입니다.\n\n서하은: \"DG는 한국 안에서 우리가 모르는 시설들에 같이 물자를 대고 있어요.\"",
    left: { label: "장부를 본격 분석한다", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "단순 실수로 처리, 폐기", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  // CH-MD-04-R-2 — DG 측 암호 통신을 메리디안이 해독
  { id: "CH-MD-04-R-2", act: [4], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-VS-MD')<0 && (logs.indexOf('LOG-MD-INTEL')>=0||logs.indexOf('LOG-MD-BACKCHANNEL')>=0) && logs.indexOf('LOG-DG-DECRYPT')<0 && s.day>=28 },
    msg: "메리디안이 보낸 마지막 카드.\n\n\"DG가 한국 정부 모르게 운영하는 사설 통신망이 있습니다. 우리는 6개월간 일부를 해독했습니다. 당신만이라면 공유합니다.\"\n\n해독본 발췌 — DG 내부 코드네임 'KEEPER'. 한국 봉쇄 작전 외부 노출을 통제하는 부서로 추정.\n\n받으면 다음 카드는 없습니다.",
    left: { label: "해독본을 받는다", fx: { c: 0, r: 0, t: 1, o: -3 }, g: -5 },
    right: { label: "거절하고 채널을 닫는다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 2 } },

  // CH-DG-WARN-R-1 — DG가 ORACLE 감사를 빌미로 압박
  { id: "CH-DG-WARN-R-1", act: [3,4], priority: "상", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-DEAL')>=0 && logs.indexOf('LOG-AUDIT-COMPLY')<0 && s.day>=24 },
    msg: "DG 대외협력실로부터 정중한 통보.\n\n\"본사가 강원지부 운영 자료에 대한 자체 감사를 진행할 예정입니다. 일부 자료 열람을 협조해주십시오. 거부하셔도 됩니다 — 다만 다음 거래 단가에 반영됩니다.\"\n\n서하은: \"...자체 감사? 우리 기지에 대한? 권한 어디서 나온 겁니까.\"\n\n임재혁: \"근거는 없습니다. 그러나 거부하면 다음 보급이 끊깁니다.\"",
    left: { label: "감사에 협조한다 — 자료 일부 제공", fx: { c: 0, r: 1, t: -1, o: -2 }, g: -3 },
    right: { label: "감사를 거부한다", fx: { c: 0, r: -2, t: 1, o: 1 }, g: 2 } },

  // CH-MD-04-R-1 — 메리디안의 비공식 무상 보류 제안 (MD-04 우 선택 후)
  { id: "CH-MD-04-R-1", act: [3,4], priority: "상", bg: "comms",
    cond: function(s,g,logs){ return logs.indexOf('LOG-MD-INTEL')>=0 && logs.indexOf('LOG-MD-BACKCHANNEL')<0 && logs.indexOf('LOG-DG-VS-MD')<0 && s.day>=24 && s.day<=27 },
    msg: "메리디안 측에서 비공식 채널로 짧은 메시지가 왔습니다.\n\n\"DG가 본부에 자체 감사 명목으로 압박을 시작했다는 정보를 받았습니다. 강요받지 마십시오.\n\n저희는 지금 거래를 요구하지 않습니다. 다만 — 필요할 때 우리 위성 자산을 한 차례 무상으로 사용하실 수 있도록 비축해두겠습니다. 회신은 자유입니다.\"\n\n임재혁: \"무상이라니요. 그럴 리가 없을 텐데요.\"\n\n서하은: \"...정말 무상은 아닐 겁니다. 채권을 빌려두는 거예요. 받는 순간부터.\"",
    left: { label: "보류 라인을 받아둔다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 },
    right: { label: "응답하지 않는다", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // CH-DG-WARN-R-2 — DG 보복 본격화, 외부 동맹 제안 (CH-DG-WARN-R-1 우 선택 후)
  { id: "CH-DG-WARN-R-2", act: [4], priority: "상", bg: "base",
    cond: function(s,g,logs){ return logs.indexOf('LOG-DG-DEAL')>=0 && logs.indexOf('LOG-AUDIT-COMPLY')<0 && logs.indexOf('LOG-AUDIT-ALLY')<0 && s.day>=28 },
    msg: "DG의 다음 보복이 시작됐습니다.\n\n월간 보급 송출이 \"공정 점검\" 명목으로 18일 지연. 동시에 익명 언론에 강원지부 운영 의혹 풍문 노출. 출처는 명확합니다.\n\n그때 — 본부 외부 채널로 짧은 연락. 정부 시설관리국 산하 감사독립위원회. 비공식 동맹 제안.\n\n\"DG의 자체 감사 권한은 법적 근거가 없습니다. 저희가 공식 감사 요청을 발의하면 DG는 즉시 물러납니다. 다만 — 동맹이 형성된 이후로는 저희도 강원지부 운영 일부를 정기 검토합니다.\"\n\n서하은: \"...DG에서 정부 감사로 종속이 옮겨가는 것뿐입니다.\"\n\n강도윤: \"적어도 정부는 봉쇄 임무를 인정하고 있는 쪽입니다.\"",
    left: { label: "감사독립위와 동맹을 공식화", fx: { c: 1, r: 1, t: 0, o: -1 }, g: -2 },
    right: { label: "단독으로 버틴다", fx: { c: -1, r: -2, t: 1, o: 1 }, g: 1 } },

];

if(typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_DG_MERIDIAN);
