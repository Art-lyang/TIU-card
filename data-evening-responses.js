// data-evening-responses.js — 이브닝 챗 플레이어 응답 선택지
// key: EVENING_TRUST_LINES key와 동일, tier별 2개 응답
// trust: 선택 시 해당 캐릭터 호감도 변화량
// reply: 선택 후 캐릭터 짧은 반응 (1줄)

var EVENING_RESPONSES = {
  'doyun_1_1-2': {
    a: { label: '잘 부탁한다. 믿고 맡기겠다.', trust: 2, reply: '...감사합니다. 기대에 부응하겠습니다.' },
    b: { label: '현장 상황 보고 부탁한다.', trust: 1, reply: '알겠습니다. 내일까지 정리해서 올리겠습니다.' }
  },
  'doyun_1_2-4': {
    a: { label: '좋은 판단이었다.', trust: 2, reply: '...감사합니다, 지휘관님.' },
    b: { label: '다음엔 보고 먼저.', trust: -1, reply: '...알겠습니다.' }
  },
  'haeun_1_1-2': {
    a: { label: '잘 부탁한다.', trust: 2, reply: '네, 최선을 다하겠습니다.' },
    b: { label: '현황 보고 준비해둬.', trust: 1, reply: '이미 정리해뒀습니다. 확인해주세요.' }
  },
  'haeun_1_2-4': {
    a: { label: '무리하지 마. 쉴 때 쉬어야지.', trust: 2, reply: '...감사합니다. 가끔 이런 말이 필요한 것 같아요.' },
    b: { label: '컨디션 관리 잘 해.', trust: 0, reply: '네, 알겠습니다.' }
  },
  'haeun_1_4-5': {
    a: { label: '조심히 분석해. 돕겠다.', trust: 2, reply: '...감사합니다. 안심이 됩니다.' },
    b: { label: '증거 없으면 보류.', trust: -1, reply: '...네, 좀더 지켜보겠습니다.' }
  },
  'sejin_1_1-2': {
    a: { label: '잘 부탁한다. 앞으로 잘 지내봅시다.', trust: 2, reply: '네! 잘 부탁드려요, 지휘관님.' },
    b: { label: '연구 현황을 알려줘.', trust: 1, reply: '네, 정리해서 보고드리겠습니다.' }
  },
  'sejin_1_2-4': {
    a: { label: '무리하지 마.', trust: 2, reply: '...감사합니다. 그런 말 처음 들어요.' },
    b: { label: '결과가 나오면 보고해.', trust: 0, reply: '네, 알겠습니다.' }
  },
  'jaehyuk_1_1-2': {
    a: { label: '잘 부탁한다. 시스템은 맡기겠다.', trust: 2, reply: '감사합니다. 책임지겠습니다.' },
    b: { label: '시스템 현황 보고 부탁한다.', trust: 1, reply: '알겠습니다. 정리해서 올리겠습니다.' }
  },
  'jaehyuk_1_2-4': {
    a: { label: '점검 수고했다.', trust: 2, reply: '감사합니다. 계속 관리하겠습니다.' },
    b: { label: '이상 있으면 바로 보고해.', trust: 1, reply: '네, 알겠습니다.' }
  },
  'jaehyuk_1_3-5': {
    a: { label: '좋다. 유지보수 계획 진행해.', trust: 2, reply: '감사합니다. 단말기에 시스템 진단 모듈을 올리겠습니다.', log: 'LOG-EV-UNLOCK' },
    b: { label: '허가한다. 단, 보안에 주의해.', trust: 1, reply: '물론입니다. 접근 권한은 지휘관님 전용으로 설정하겠습니다.', log: 'LOG-EV-UNLOCK' }
  },
  'jaehyuk_1_4-5': {
    a: { label: '보고서 기대한다.', trust: 2, reply: '감사합니다. 꼼꼼하게 정리하겠습니다.' },
    b: { label: '일정에 맞춰 진행해.', trust: 1, reply: '네, 알겠습니다.' }
  },
  'doyun_2_7-13': {
    a: { label: '함께 지킨다.', trust: 2, reply: '...네. 함께라면.' },
    b: { label: '전략을 세우자.', trust: 1, reply: '알겠습니다. 작전안 준비하겠습니다.' }
  },
  'doyun_2_14-20': {
    a: { label: '네 판단을 믿는다.', trust: 2, reply: '...감사합니다, 지휘관님.' },
    b: { label: '좀더 신중하게.', trust: 0, reply: '...알겠습니다.' }
  },
  'haeun_2_7-13': {
    a: { label: '함께 확인하자.', trust: 2, reply: '네... 지휘관님이 함께라면 용기가 납니다.' },
    b: { label: '증거를 더 모아.', trust: 0, reply: '알겠습니다. 더 조사해보겠습니다.' }
  },
  'haeun_2_14-20': {
    a: { label: '진실을 알아야 한다.', trust: 2, reply: '...맞아요. 무서워도.' },
    b: { label: '안전이 우선이다.', trust: 1, reply: '네, 조심하겠습니다.' }
  },
  'sejin_2_7-13': {
    a: { label: '연구를 계속해.', trust: 2, reply: '감사합니다. 결과가 나오면 바로 알려드릴게요.' },
    b: { label: '건강 먼저 챙겨.', trust: 2, reply: '...감사합니다. 그런 걱정... 오랜만이에요.' }
  },
  'sejin_2_14-20': {
    a: { label: '윤세진을 믿는다.', trust: 2, reply: '...감사합니다. 실망시키지 않겠습니다.' },
    b: { label: '보고서로 정리해줘.', trust: 0, reply: '네, 정리하겠습니다.' }
  },
  'jaehyuk_2_7-13': {
    a: { label: '좋은 발견이다.', trust: 2, reply: '감사합니다. 더 파보겠습니다.' },
    b: { label: 'ORACLE에 들키면 안 된다.', trust: 1, reply: '네, 조심하겠습니다.' }
  },
  'jaehyuk_2_14-20': {
    a: { label: '함께 해결하자.', trust: 2, reply: '네, 지휘관님이 계시니까 할 수 있습니다.' },
    b: { label: '단계적으로 접근해.', trust: 1, reply: '알겠습니다. 순서대로 진행하겠습니다.' }
  }
};

// 현재 챗에 맞는 응답 찾기
function getEveningResponse(chat, trust) {
  if (!chat || !EVENING_RESPONSES) return null;
  var charKeyMap = {'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk','마르쿠스 베버':'weber','닉 포스터':'foster','박소영':'soyoung'};
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
