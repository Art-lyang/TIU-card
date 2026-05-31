// evening-lines.js - trust and state adjusted evening chat lines

function localizedTrustLines(key, tier) {
  try {
    var api = (typeof window !== 'undefined') ? window.TS_I18N : null;
    if (!api || !api.getLocale || api.getLocale() !== 'en' || typeof tc !== 'function') return null;
    var entry = tc('eveningTrustLines', key, null);
    if (!entry) return null;
    if (entry[tier]) return entry[tier];
    if (tier === 'bond' && entry.high) return entry.high;
    return entry.mid || null;
  } catch (e) {
    return null;
  }
}

function getEveningLines(chat, trust, logs) {
  if (!chat) return [];
  var charKeyMap = {
    '서하은': 'haeun',
    '강도윤': 'doyun',
    '윤세진': 'sejin',
    '임재혁': 'jaehyuk',
    '마르쿠스 베버': 'weber',
    '닉 포스터': 'foster',
    '박소영': 'soyoung'
  };
  var charKey = charKeyMap[chat.char];
  if (!charKey) return chat.lines || [];

  var tier = (typeof getTrustTier === 'function') ? getTrustTier(trust, charKey) : 'mid';

  // Kang Do-yun survived the night assault but cannot return to field duty.
  if (charKey === 'doyun' && logs && logs.indexOf('LOG-074-DONE') >= 0 && logs.indexOf('LOG-075') < 0) {
    var localized = localizedTrustLines('doyun_injured', tier);
    if (localized) return localized;
    if (DOYUN_INJURED_LINES[tier]) return DOYUN_INJURED_LINES[tier];
    return DOYUN_INJURED_LINES.mid;
  }

  if (charKey === 'doyun' && logs && logs.indexOf('LOG-DOYUN-MINOR-WOUND') >= 0 && logs.indexOf('LOG-075') < 0) {
    var localizedMinor = localizedTrustLines('doyun_minor_wound', tier);
    if (localizedMinor) return localizedMinor;
    if (typeof DOYUN_MINOR_WOUND_LINES !== 'undefined' && DOYUN_MINOR_WOUND_LINES[tier]) return DOYUN_MINOR_WOUND_LINES[tier];
    if (typeof DOYUN_MINOR_WOUND_LINES !== 'undefined') return DOYUN_MINOR_WOUND_LINES.mid;
  }

  if (tier === 'mid') return chat.lines || [];

  var actNum = chat.act[0];
  var key = charKey + '_' + actNum + '_' + chat.dayMin + '-' + chat.dayMax;
  var localizedVariant = localizedTrustLines(key, tier);
  if (localizedVariant) return localizedVariant;
  try {
    if (typeof window !== 'undefined' && window.TS_I18N && window.TS_I18N.getLocale && window.TS_I18N.getLocale() === 'en') {
      return chat.lines || [];
    }
  } catch (e) {}
  var variants = EVENING_TRUST_LINES[key];

  if (variants && variants[tier]) return variants[tier];
  if (tier === 'bond' && variants && variants.high) return variants.high;

  return chat.lines || [];
}
