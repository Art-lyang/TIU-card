// data-cards-neutral.js — 중립 루트 이벤트 + 중간 GI(0~20) 전용 카드
// 개선안 #4: 중립 엔딩 + 중간값 운영의 묘미

var CARDS_NEUTRAL = [

  // ═══ 중간 GI (0~20) 전용 카드 — "관망자의 길" ═══

  { id: "CN-001", act: [2,3], priority: "중",
    req: function(s,g){ return g >= 0 && g <= 20 && s.day >= 5; },
    msg: "ORACLE 일일 분석에 당신에 대한 평가가 포함되어 있습니다.\n\n\"지휘관 이중철: 권고 이행률 47%. 분류 — 비확정적.\"\n\n\"추가 관찰이 필요합니다. 판단을 보류합니다.\"",
    left: { label: "이행률을 올리겠다", fx: { c: 0, r: 0, t: -1, o: 2 }, g: 3 },
    right: { label: "내 방식대로 하겠다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 } },

  { id: "CN-002", act: [3], priority: "중",
    req: function(s,g){ return g >= -5 && g <= 15 && s.day >= 8; },
    msg: "서하은이 조심스럽게 물어봅니다.\n\n\"지휘관님은... ORACLE을 어떻게 생각하세요?\"\n\"순종도 반항도 아닌 것 같아서. 솔직히 읽기가 어렵습니다.\"",
    left: { label: "나도 아직 판단 중이다", fx: { c: 0, r: 0, t: 2, o: 0 }, g: 0 },
    right: { label: "판단은 내가 한다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 } },

  { id: "CN-003", act: [3,4], priority: "중",
    req: function(s,g){ return g >= -10 && g <= 20 && s.day >= 10; },
    msg: "ORACLE이 이례적인 통신을 보냈습니다.\n\n\"지휘관의 의사결정 패턴이 기존 모델에 부합하지 않습니다.\"\n\"예측 불가능성 — 이것이 위험인지 자산인지 분석 중입니다.\"\n\n[통신 종료]",
    left: { label: "그것도 ORACLE이 판단하겠지", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "예측 불가능하게 유지하겠다", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -2 } },

  { id: "CN-004", act: [3], priority: "중",
    req: function(s,g){ return g >= 0 && g <= 20 && s.day >= 12; },
    msg: "임재혁이 저녁 식사 자리에서 말합니다.\n\n\"지휘관님 스타일이 재밌어요.\"\n\"ORACLE한테 전적으로 따르지도 않고, 대놓고 거부하지도 않고.\"\n\"줄타기? 아니면 진짜 모르는 건가.\"",
    left: { label: "둘 다일 수도 있지", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "알아서 잘 하고 있다", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "CN-005", act: [3,4], priority: "상",
    req: function(s,g,logs){ return g >= -5 && g <= 15 && s.day >= 15 && logs.length >= 4; },
    msg: "강도윤이 단독 보고를 요청합니다.\n\n\"지휘관님. 솔직히 여쭐게요.\"\n\"ORACLE 쪽도 프로메테우스 쪽도 아닌 거... 의도적인 겁니까?\"\n\"아니면 아직 결정을 못 내린 겁니까?\"",
    left: { label: "의도적이다. 양쪽을 본다", fx: { c: 0, r: 0, t: 2, o: 0 }, g: 0 },
    right: { label: "... 모르겠다, 솔직히", fx: { c: 0, r: 0, t: 3, o: -1 }, g: -1 } },

  // ═══ OBSERVER 접속승인 — 히든 카드 (전 액트, 전 세션 1회, fullReset만 초기화) ═══
  { id: "CA-OBS-PROTO", act: [1,2,3,4], priority: "하", once: true,
    glitch: true,
    req: function(s,g,logs){
      try{ if(localStorage.getItem('ts_observer_proto')) return false }catch(e){}
      return Math.random() < 0.05;
    },
    msg: "[ERR:0x8F2A — UNREGISTERED PROTOCOL DETECTED]\n\nPROTOCOL: OBSERVER\n접속 승인 요청\n\n출처: ████████\n프로토콜: 미등록\n보안 등급: ████\n인증 상태: BYPASSED\n\nORACLE 승인 없이\n외부 접속이 시도되고 있습니다.\n\n승인하시겠습니까?",
    left: { label: "승인 허가", fx: {c:0,r:0,t:0,o:0}, g: 0 },
    right: { label: "거절", fx: {c:0,r:0,t:0,o:0}, g: 0 } }
];
