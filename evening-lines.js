// TERMINAL SESSION — 이브닝 챗 대사 신뢰도 적용 함수
// data-evening-trust-2.js에서 분리

// 이브닝 챗 대사에 신뢰도 구간을 적용하는 함수
function getEveningLines(chat, trust, logs) {
  var charKeyMap = {'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk','마르쿠스 베버':'weber','닉 포스터':'foster','박소영':'soyoung'};
  var charKey = charKeyMap[chat.char];
  if (!charKey) return chat.lines;

  // 강도윤 부상 상태: LOG-074-DONE 있고 LOG-075 없으면 부상 대사
  if (charKey === 'doyun' && logs && logs.indexOf('LOG-074-DONE') >= 0 && logs.indexOf('LOG-075') < 0) {
    var tier = getTrustTier(trust, charKey);
    if (DOYUN_INJURED_LINES[tier]) return DOYUN_INJURED_LINES[tier];
    return DOYUN_INJURED_LINES.mid;
  }

  var tier = getTrustTier(trust, charKey);
  if (tier === 'mid') return chat.lines; // 기본 대사 유지

  // 키 생성: "charKey_act_dayMin-dayMax"
  var actNum = chat.act[0];
  var key = charKey + '_' + actNum + '_' + chat.dayMin + '-' + chat.dayMax;
  var variants = EVENING_TRUST_LINES[key];

  if (variants && variants[tier]) return variants[tier];
  // bond 구간인데 bond 전용이 없으면 high로 폴백
  if (tier === 'bond' && variants && variants.high) return variants.high;

  return chat.lines; // 변형 데이터 없으면 기본
}
