// data-evening-responses.js — 이브닝 챗 플레이어 응답 선택지
// key: EVENING_TRUST_LINES key와 동일, tier별 2개 응답
// trust: 선택 시 해당 캐릭터 호감도 변화량
// reply: 선택 후 캐릭터 짧은 반응 (1줄)

var EVENING_RESPONSES = {
  'doyun_1_1-3': {
    a: { label: '봉쇄선은 반드시 지킨다.', trust: 2, reply: '...그 말씀, 믿겠습니다.' },
    b: { label: '필라델피아 보고서를 보여줘.', trust: 1, reply: '알겠습니다. 준비해두겠습니다.' }
  },
  'doyun_1_4-6': {
    a: { label: '좋은 판단이었다.', trust: 2, reply: '...감사합니다, 지휘관님.' },
    b: { label: '다음엔 보고 먼저.', trust: -1, reply: '...알겠습니다.' }
  },
  'haeun_1_1-3': {
    a: { label: '같이 알아보자.', trust: 2, reply: '네, 지휘관님과 함께라면.' },
    b: { label: '일단 맡은 일에 집중해.', trust: 0, reply: '...알겠습니다.' }
  },
  'haeun_1_4-6': {
    a: { label: 'ORACLE을 의심하는 건가?', trust: 2, reply: '...아직은 확신이 없어요. 하지만 이상합니다.' },
    b: { label: '보고서로 정리해줘.', trust: 0, reply: '네, 정리해서 올리겠습니다.' }
  },
  'haeun_1_7-10': {
    a: { label: '조심히 분석해. 돕겠다.', trust: 2, reply: '...감사합니다. 안심이 됩니다.' },
    b: { label: '증거 없으면 보류.', trust: -1, reply: '...네, 좀더 지켜보겠습니다.' }
  },
  'sejin_1_1-3': {
    a: { label: '위험하지 않나?', trust: 2, reply: '위험은 있어요. 하지만 가치도 있습니다.' },
    b: { label: '연구 성과를 기대한다.', trust: 1, reply: '최선을 다하겠습니다.' }
  },
  'sejin_1_4-6': {
    a: { label: '무리하지 마.', trust: 2, reply: '...감사합니다. 그런 말 처음 들어요.' },
    b: { label: '결과가 나오면 보고해.', trust: 0, reply: '네, 알겠습니다.' }
  },
  'jaehyuk_1_1-3': {
    a: { label: '체계적으로 복구하자.', trust: 2, reply: '네, 계획 세워서 보고드리겠습니다.' },
    b: { label: '급한 것부터 처리해.', trust: 1, reply: '알겠습니다. 우선순위 정리하겠습니다.' }
  },
  'jaehyuk_1_4-6': {
    a: { label: '나도 같은 의문이 있다.', trust: 2, reply: '...역시. 지휘관님도 느끼신 거군요.' },
    b: { label: '시스템 점검에 집중해.', trust: 0, reply: '알겠습니다.' }
  },
  'jaehyuk_1_7-10': {
    a: { label: '같이 찾아보자.', trust: 2, reply: '감사합니다. 기술자로서... 꼭 알고 싶습니다.' },
    b: { label: '위험할 수 있다. 조심해.', trust: 1, reply: '네, 조심하겠습니다.' }
  },
  'doyun_2_11-17': {
    a: { label: '함께 지킨다.', trust: 2, reply: '...네. 함께라면.' },
    b: { label: '전략을 세우자.', trust: 1, reply: '알겠습니다. 작전안 준비하겠습니다.' }
  },
  'doyun_2_18-24': {
    a: { label: '네 판단을 믿는다.', trust: 2, reply: '...감사합니다, 지휘관님.' },
    b: { label: '좀더 신중하게.', trust: 0, reply: '...알겠습니다.' }
  },
  'haeun_2_11-17': {
    a: { label: '함께 확인하자.', trust: 2, reply: '네... 지휘관님이 함께라면 용기가 납니다.' },
    b: { label: '증거를 더 모아.', trust: 0, reply: '알겠습니다. 더 조사해보겠습니다.' }
  },
  'haeun_2_18-24': {
    a: { label: '진실을 알아야 한다.', trust: 2, reply: '...맞아요. 무서워도.' },
    b: { label: '안전이 우선이다.', trust: 1, reply: '네, 조심하겠습니다.' }
  },
  'sejin_2_11-17': {
    a: { label: '연구를 계속해.', trust: 2, reply: '감사합니다. 결과가 나오면 바로 알려드릴게요.' },
    b: { label: '건강 먼저 챙겨.', trust: 2, reply: '...감사합니다. 그런 걱정... 오랜만이에요.' }
  },
  'sejin_2_18-24': {
    a: { label: '윤세진을 믿는다.', trust: 2, reply: '...감사합니다. 실망시키지 않겠습니다.' },
    b: { label: '보고서로 정리해줘.', trust: 0, reply: '네, 정리하겠습니다.' }
  },
  'jaehyuk_2_11-17': {
    a: { label: '좋은 발견이다.', trust: 2, reply: '감사합니다. 더 파보겠습니다.' },
    b: { label: 'ORACLE에 들키면 안 된다.', trust: 1, reply: '네, 조심하겠습니다.' }
  },
  'jaehyuk_2_18-24': {
    a: { label: '함께 해결하자.', trust: 2, reply: '네, 지휘관님이 계시니까 할 수 있습니다.' },
    b: { label: '단계적으로 접근해.', trust: 1, reply: '알겠습니다. 순서대로 진행하겠습니다.' }
  }
};

// 현재 챗에 맞는 응답 찾기
function getEveningResponse(chat, trust) {
  if (!chat || !EVENING_RESPONSES) return null;
  var charKeyMap = {'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk'};
  var ck = charKeyMap[chat.char];
  if (!ck) return null;
  // key 매칭: "charKey_act_dayRange"
  var keys = Object.keys(EVENING_RESPONSES);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (k.indexOf(ck + '_') !== 0) continue;
    var parts = k.split('_');
    var actPart = parseInt(parts[1]);
    var rangePart = parts[2].split('-');
    var dMin = parseInt(rangePart[0]);
    var dMax = parseInt(rangePart[1] || rangePart[0]);
    if (chat.act.indexOf(actPart) >= 0 && chat.dayMin >= dMin && chat.dayMin <= dMax) {
      return EVENING_RESPONSES[k];
    }
  }
  return null;
}
