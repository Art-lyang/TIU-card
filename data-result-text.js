// data-result-text.js — 카드 스와이프 결과 서사 텍스트 (자동 생성 폴백)
// 스토리/이벤트 카드 개별 텍스트는 data-result-story.js, data-result-ending.js에 정의

var RESULT_TEXT = {};

// ═══ 자동 생성 폴백 함수 ═══
// 카드에 개별 텍스트가 없을 때 fx 기반으로 상황 문구 생성
var _RT_POS = {
  c: ["봉쇄선 감시 체계가 보강되었습니다.", "외곽 방어선이 안정화되었습니다.", "봉쇄 구역 통제력이 강화되었습니다.", "경계 태세가 한 단계 격상되었습니다."],
  r: ["보급 물자가 추가 확보되었습니다.", "기지 비축량이 늘어났습니다.", "의약품과 식량이 보충되었습니다.", "자원 운용 효율이 개선되었습니다."],
  t: ["팀원들의 표정이 한결 밝아졌습니다.", "기지 내 분위기가 안정되었습니다.", "간부진이 신뢰를 표합니다.", "요원들 사이의 결속이 강해졌습니다."],
  o: ["ORACLE이 판단을 긍정적으로 평가합니다.", "지휘관 평가 지표가 상승했습니다.", "ORACLE: '효율적인 운영입니다.'", "시스템이 당신의 결정을 기록합니다."]
};
var _RT_NEG = {
  c: ["봉쇄선 일부 구간에 취약점이 생겼습니다.", "외곽 감시 공백이 발생했습니다.", "방어선 유지에 부담이 가중됩니다.", "경계 체계에 미세한 틈이 생겼습니다."],
  r: ["기지 비축 물자가 줄어들었습니다.", "보급 여유분이 감소했습니다.", "자원이 예상보다 빠르게 소모됩니다.", "물자 운용에 여유가 줄었습니다."],
  t: ["요원들 사이에 미묘한 긴장이 감돕니다.", "기지 분위기가 다소 가라앉았습니다.", "누군가의 시선이 무거워졌습니다.", "팀 내부에 불안이 번집니다."],
  o: ["ORACLE이 당신의 판단에 의문을 제기합니다.", "지휘관 평가 지표에 변동이 생겼습니다.", "ORACLE: '비표준 판단 패턴 감지.'", "시스템이 경고를 기록합니다."]
};

// 변화 없음 / 중립 카드용 폴백 — 상태 변동은 없지만 "처리되었다"는 느낌 유지
var _RT_NEUTRAL = [
  "지시가 기록되었습니다.",
  "명령이 처리되었습니다.",
  "다음 사안으로 넘어갑니다.",
  "보고가 접수되었습니다.",
  "처리가 완료되었습니다.",
  "기록만 남기고 다음으로 넘어갑니다.",
  "ORACLE이 결정을 기록합니다.",
  "일상적 결재가 처리되었습니다.",
  "결정이 문서화되었습니다.",
  "서류 처리가 완료되었습니다."
];

// GI(독립성 지수) 기반 톤 가산 — 거부/순응 성향 카드 강조용
var _RT_GI_POS = [
  "ORACLE이 조용히 고개를 끄덕입니다.",
  "표준 경로대로 처리됩니다.",
  "시스템이 안정적으로 반응합니다."
];
var _RT_GI_NEG = [
  "단말기 한쪽에 미세한 경고 표시가 스칩니다.",
  "ORACLE이 잠시 반응을 보류합니다.",
  "기록 로그에 별도 태그가 부여됩니다."
];

function getResultText(cardId, dir) {
  // 1. 개별 텍스트 우선
  var key = cardId + '_' + dir;
  if (RESULT_TEXT[key]) return RESULT_TEXT[key];
  // 2. 카드에서 fx 추출
  var card = null;
  for (var i = 0; i < CARDS.length; i++) {
    if (CARDS[i].id === cardId) { card = CARDS[i]; break; }
  }
  if (!card) return null;
  var ch = dir === 'left' ? card.left : card.right;
  if (!ch) return null;
  var fx = ch.fx || {};
  // 카드 ID 해시로 일관된 문구 선택
  var hash = 0;
  for (var ci = 0; ci < cardId.length; ci++) hash = ((hash << 5) - hash + cardId.charCodeAt(ci)) | 0;
  var seed = Math.abs(hash + (dir === 'left' ? 0 : 7));
  // 3. 가장 큰 변화를 찾아서 문구 선택
  var best = null, bestAbs = 0;
  var keys = ['c', 'r', 't', 'o'];
  for (var ki = 0; ki < keys.length; ki++) {
    var k = keys[ki];
    if (fx[k] && Math.abs(fx[k]) > bestAbs) { bestAbs = Math.abs(fx[k]); best = k; }
  }
  // 4. 변화 있음 → POS/NEG 풀에서 선택
  if (best) {
    var pool = fx[best] > 0 ? _RT_POS[best] : _RT_NEG[best];
    return pool[seed % pool.length];
  }
  // 5. 변화 없음(중립 카드) → 중립 풀 + GI 성향 혼합
  var g = ch.g || 0;
  if (g > 0) {
    return _RT_GI_POS[seed % _RT_GI_POS.length];
  } else if (g < 0) {
    return _RT_GI_NEG[seed % _RT_GI_NEG.length];
  }
  return _RT_NEUTRAL[seed % _RT_NEUTRAL.length];
}
