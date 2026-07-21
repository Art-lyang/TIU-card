// data-evening-emotions.js — 이브닝챗 간부 감정 포트레잇 매핑 (BUILD 296)
// 간부 5인(서하은/강도윤/윤세진/임재혁/박소영)의 감정 표정 이미지를
// 신뢰도 tier(low/mid/high/bond) × Act(1~4) 기본값 + 피벗 챗 오버라이드로 선택한다.
// 캐논 근거: 캐릭터 바이블 + 각 간부 이브닝챗 정서 흐름(워크플로 5인 분석 + 정합성 검수).
// 베버/포스터(프로메테우스)는 감정 세트가 없어 기존 CHAR_IMG 포트레잇을 유지한다.
(function(){
  var E = 'assets/images/characters/emotions/';

  // charKey -> emotion -> 이미지 경로 (모두 흑백 512px, 감시 톤 일치)
  var EMO = {
    doyun:   { anger:E+'char_doyun_anger_v2.webp', focus:E+'char_doyun_focus_v2.webp', pain:E+'char_doyun_pain_v2.webp' },
    haeun:   { betrayal:E+'char_haeun_betrayal_v2.webp', resolve:E+'char_haeun_resolve_v2.webp', suspicion:E+'char_haeun_suspicion_v2.webp' },
    sejin:   { concern:E+'char_sejin_concern_v1.webp', dread:E+'char_sejin_dread_v1.webp', hope:E+'char_sejin_hope_v1.webp' },
    jaehyuk: { alarm:E+'char_jaehyuk_alarm_v1.webp', focus:E+'char_jaehyuk_focus_v1.webp', guilt:E+'char_jaehyuk_guilt_v1.webp' },
    soyoung: { exposed:E+'char_soyoung_exposed_v1.webp', loyalty:E+'char_soyoung_loyalty_v1.webp', neutral:E+'char_soyoung_neutral_v1.webp' }
  };

  // 신뢰도 tier × Act -> 기본 감정
  var MATRIX = {
    doyun: {
      low:  { '1':'focus','2':'focus','3':'anger','4':'anger' },
      mid:  { '1':'focus','2':'focus','3':'pain', '4':'anger' },
      high: { '1':'focus','2':'anger','3':'pain', '4':'anger' },
      bond: { '1':'focus','2':'pain', '3':'pain', '4':'pain'  }
    },
    haeun: {
      low:  { '1':'suspicion','2':'suspicion','3':'suspicion','4':'suspicion' },
      mid:  { '1':'suspicion','2':'suspicion','3':'suspicion','4':'resolve' },
      high: { '1':'resolve','2':'resolve','3':'resolve','4':'resolve' },
      bond: { '1':'resolve','2':'resolve','3':'resolve','4':'resolve' }
    },
    sejin: {
      low:  { '1':'concern','2':'concern','3':'dread','4':'dread' },
      mid:  { '1':'concern','2':'concern','3':'concern','4':'hope' },
      high: { '1':'hope','2':'hope','3':'hope','4':'hope' },
      bond: { '1':'hope','2':'hope','3':'hope','4':'hope' }
    },
    jaehyuk: {
      low:  { '1':'focus','2':'focus','3':'alarm','4':'alarm' },
      mid:  { '1':'focus','2':'focus','3':'guilt','4':'alarm' },
      high: { '1':'focus','2':'focus','3':'guilt','4':'guilt' },
      bond: { '1':'focus','2':'focus','3':'guilt','4':'guilt' }
    },
    soyoung: {
      low:  { '1':'neutral','2':'neutral','3':'neutral','4':'neutral' },
      mid:  { '1':'neutral','2':'neutral','3':'neutral','4':'loyalty' },
      high: { '1':'neutral','2':'neutral','3':'neutral','4':'loyalty' },
      bond: { '1':'neutral','2':'neutral','3':'neutral','4':'loyalty' }
    }
  };

  // 피벗 챗 오버라이드: i18nKey(responseKey 또는 charKey_act_dayMin-dayMax) -> 감정
  // 실제 EVENING_CHATS 키와 대조 검증 완료(무효 키 제거).
  var OVERRIDE = {
    'doyun_axis_anchor':'anger','doyun_2_11-14':'focus','doyun_3_22-28':'pain','doyun_4_29-99':'pain','doyun_3_15-21':'focus',
    'haeun_1_1-4':'suspicion','haeun_2_11-14':'suspicion','haeun_3_15-21':'suspicion','haeun_4_34-35':'betrayal','haeun_g4_3':'resolve',
    'sejin_anxiety_1':'dread','sejin_anxiety_2':'dread','sejin_anxiety_3':'dread','sejin_1_2-4':'concern','sejin_2_5-7':'dread','sejin_3_22-28':'dread','sejin_3b_17-23':'dread','sejin_4b_33':'concern','sejin_g4_3':'hope',
    'jaehyuk_2_5-99':'focus','jaehyuk_2a_8-12':'focus','jaehyuk_3a_14-17':'alarm','jaehyuk_3a_18-23':'guilt','jaehyuk_4a_29-30':'guilt','jaehyuk_g3_1':'alarm','jaehyuk_g4_1':'alarm','ij_break_1':'guilt','ij_break_2':'guilt','ij_break_3':'alarm',
    'soyoung_4c_29-30':'loyalty','soyoung_4c_31-33':'exposed','soyoung_4c_34-35':'loyalty'
  };

  window.EVENING_EMOTION_IMG = EMO;
  window.EVENING_EMOTION_MATRIX = MATRIX;
  window.EVENING_EMOTION_OVERRIDES = OVERRIDE;

  // 해석기: charKey + {tier, act, chatKey} -> 이미지 경로(없으면 null -> 기존 포트레잇 유지)
  window.resolveEveningEmotionImg = function(charKey, ctx){
    if(!charKey || !EMO[charKey] || !ctx) return null;
    var emo = (ctx.chatKey && OVERRIDE[ctx.chatKey]) || null;
    if(!emo){
      var tierMap = MATRIX[charKey] && MATRIX[charKey][ctx.tier || 'mid'];
      emo = tierMap ? tierMap[String(ctx.act)] : null;
    }
    return (emo && EMO[charKey][emo]) ? EMO[charKey][emo] : null;
  };
})();
