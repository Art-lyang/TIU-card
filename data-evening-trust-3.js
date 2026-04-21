// data-evening-trust-3.js — 신뢰도 구간별 이브닝 챗 어투 변화 시스템
// Part 3/3: 마르쿠스 베버 + 닉 포스터 + 박소영 + DOYUN_INJURED + getEveningLines
Object.assign(EVENING_TRUST_LINES, {
  // ══════════════════════════════════════════
  // 마르쿠스 베버 — 프로메테우스 지휘관
  // low: 사무적, 정보만 전달
  // mid: 기본 (철학적 대화)
  // high: 진심 어린 경고와 연대
  // bond: 동맹으로서의 신뢰
  // ══════════════════════════════════════════
  // weber/foster/soyoung은 저녁챗이 전부 act:[4]에 배치됨 (data-core.js, data-evening-extra-2c.js).
  // 이전 버전의 _3_* 트러스트 변형 6개(weber_3_25-35/36-99, foster_3_27-35/36-99, soyoung_3_28-35/36-99)는
  // chat.act[0]==3과 매칭 가능한 저녁챗이 존재하지 않아 dead key였음 — 제거. 실제 변형은 _4_*에 존재.
});

// ══════════════════════════════════════════
// 강도윤 — 부상 상태 (LOG-074-DONE)
// 야간 습격 생존 후, 다리 중상으로 현장 복귀 불가
// ══════════════════════════════════════════
var DOYUN_INJURED_LINES = {
  low: ["...보고드립니다.", "현장 복귀는 불가합니다.", "이상입니다."],
  mid: ["...다리가 아직 안 움직입니다.", "현장 복귀가 안 되니까... 답답합니다.", "지휘관님, 업무 관련이면 말씀하십시오. 머리는 멀쩡합니다."],
  high: ["지휘관님.", "솔직히... 제가 못 나가니까 불안합니다. 밖에서 무슨 일이 생기면.", "업무 조언이라도 드리겠습니다. 그게 지금 제가 할 수 있는 전부니까.", "...터널이 있어서 살았습니다. 지휘관님 덕분입니다."],
  bond: ["지휘관님.", "...살아있어서 다행이라고 해야 하는데, 현장에 못 나가니까 미칠 것 같습니다.", "제 다리 대신 머리라도 쓰겠습니다. 작전이든 인원 배치든, 물어봐 주십시오.", "...그날 밤, 지휘관님이 터널을 만들어둔 덕에 살았습니다. 잊지 않겠습니다."]
};

// 이브닝 챗 대사에 신뢰도 구간을 적용하는 함수
function getEveningLines(chat, trust, logs) {
  var charKeyMap = {'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk'};
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
