// data-result-text.js
// Generic post-choice toast lines for cards without hand-authored result text.

var RESULT_TEXT = {};

function _rtLocale() {
  try {
    return (window.TS_I18N && window.TS_I18N.getLocale && window.TS_I18N.getLocale()) || 'ko';
  } catch (e) {
    return 'ko';
  }
}

function _rtPool(ko, en) {
  return _rtLocale() === 'en' ? en : ko;
}

function _rtBadEnglishText(v) {
  return /[\uac00-\ud7a3]/.test(String(v || '')) || /\ufffd|[?]{2,}/.test(String(v || ''));
}

var _RT_POS_EN = {
  c: [
    'Containment monitoring has been reinforced.',
    'Perimeter defenses have stabilized.',
    'Control over the containment zone has strengthened.',
    'The alert posture has been raised one step.'
  ],
  r: [
    'Additional supplies have been secured.',
    'Branch reserves have increased.',
    'Medicine and rations have been preserved.',
    'Resource efficiency has improved.'
  ],
  t: [
    'Personnel accepted the directive more readily.',
    'The branch atmosphere has stabilized.',
    'Senior staff showed renewed trust.',
    'Team cohesion has grown stronger.'
  ],
  o: [
    'ORACLE evaluates the decision positively.',
    'The commander evaluation index has risen.',
    "ORACLE: 'Operational efficiency confirmed.'",
    'The system records your decision.'
  ]
};

var _RT_NEG_EN = {
  c: [
    'A weak point has opened in the containment line.',
    'A monitoring gap has appeared on the perimeter.',
    'The burden of maintaining defenses has increased.',
    'A small crack has formed in the alert network.'
  ],
  r: [
    'Branch reserve stock has dropped.',
    'Supply margin has decreased.',
    'Resources are being consumed faster than expected.',
    'Material flexibility has narrowed.'
  ],
  t: [
    'A subtle tension lingers among the personnel.',
    'The branch mood has dimmed slightly.',
    'The commander feels harder to trust.',
    'Unease is spreading inside the base.'
  ],
  o: [
    'ORACLE questions your judgment.',
    'The commander evaluation index has shifted.',
    "ORACLE: 'Nonstandard decision pattern detected.'",
    'The system records a warning.'
  ]
};

var _RT_NEUTRAL_EN = [
  'The directive has been logged.',
  'The order has been processed.',
  'Proceeding to the next matter.',
  'The report has been received.',
  'Processing is complete.',
  'The record has been updated and filed.',
  'ORACLE records the decision.',
  'Routine approval has been processed.',
  'The decision has been documented.',
  'Paperwork is complete.'
];

var _RT_GI_POS_EN = [
  'ORACLE responds with quiet approval.',
  'The matter proceeds along the expected route.',
  'The system responds without incident.'
];

var _RT_GI_NEG_EN = [
  'A small warning appears at the edge of the terminal.',
  "ORACLE's immediate response is withheld.",
  'A separate tag is attached to the record log.'
];

var _RT_POS = {
  c: _rtPool(
    [
      '봉쇄 감시 체계가 보강되었습니다.',
      '외곽 방어선이 안정화되었습니다.',
      '봉쇄 구역 통제가 강화되었습니다.',
      '경계 태세가 한 단계 격상되었습니다.'
    ],
    [
      'Containment monitoring has been reinforced.',
      'Perimeter defenses have stabilized.',
      'Control over the containment zone has strengthened.',
      'The alert posture has been raised one step.'
    ]
  ),
  r: _rtPool(
    [
      '보급 물자가 추가 확보되었습니다.',
      '기지 비축분이 늘어났습니다.',
      '의약품과 식량이 보전되었습니다.',
      '자원 운용 효율이 개선되었습니다.'
    ],
    [
      'Additional supplies have been secured.',
      'Branch reserves have increased.',
      'Medicine and rations have been preserved.',
      'Resource efficiency has improved.'
    ]
  ),
  t: _rtPool(
    [
      '요원들이 지시를 더 쉽게 받아들입니다.',
      '기지 내 분위기가 안정되었습니다.',
      '간부진이 신뢰를 보였습니다.',
      '요원들 사이의 결속이 강해졌습니다.'
    ],
    [
      'Personnel accepted the directive more readily.',
      'The branch atmosphere has stabilized.',
      'Senior staff showed renewed trust.',
      'Team cohesion has grown stronger.'
    ]
  ),
  o: _rtPool(
    [
      'ORACLE이 판단을 긍정적으로 평가합니다.',
      '지휘관 평가 지수가 상승했습니다.',
      "ORACLE: '효율적인 운영입니다.'",
      '시스템이 당신의 결정을 기록합니다.'
    ],
    [
      'ORACLE evaluates the decision positively.',
      'The commander evaluation index has risen.',
      "ORACLE: 'Operational efficiency confirmed.'",
      'The system records your decision.'
    ]
  )
};

var _RT_NEG = {
  c: _rtPool(
    [
      '봉쇄선에 일시적 취약점이 생겼습니다.',
      '외곽 감시에 공백이 발생했습니다.',
      '방어 유지 부담이 증가했습니다.',
      '경계 체계에 미세한 균열이 생겼습니다.'
    ],
    [
      'A weak point has opened in the containment line.',
      'A monitoring gap has appeared on the perimeter.',
      'The burden of maintaining defenses has increased.',
      'A small crack has formed in the alert network.'
    ]
  ),
  r: _rtPool(
    [
      '기지 비축 물자가 줄어들었습니다.',
      '보급 여유분이 감소했습니다.',
      '자원이 예상보다 빠르게 소모됩니다.',
      '물자 운용 여유가 줄었습니다.'
    ],
    [
      'Branch reserve stock has dropped.',
      'Supply margin has decreased.',
      'Resources are being consumed faster than expected.',
      'Material flexibility has narrowed.'
    ]
  ),
  t: _rtPool(
    [
      '요원들 사이에 미묘한 긴장이 감돕니다.',
      '기지 분위기가 다소 가라앉았습니다.',
      '지휘관을 보는 시선이 무거워집니다.',
      '내부에 불안이 번집니다.'
    ],
    [
      'A subtle tension lingers among the personnel.',
      'The branch mood has dimmed slightly.',
      'The commander feels harder to trust.',
      'Unease is spreading inside the base.'
    ]
  ),
  o: _rtPool(
    [
      'ORACLE이 당신의 판단에 의문을 제기합니다.',
      '지휘관 평가 지수에 변동이 생겼습니다.',
      "ORACLE: '비표준 판단 패턴 감지.'",
      '시스템이 경고를 기록합니다.'
    ],
    [
      'ORACLE questions your judgment.',
      'The commander evaluation index has shifted.',
      "ORACLE: 'Nonstandard decision pattern detected.'",
      'The system records a warning.'
    ]
  )
};

var _RT_NEUTRAL = _rtPool(
  [
    '지시가 기록되었습니다.',
    '명령이 처리되었습니다.',
    '다음 사안으로 넘어갑니다.',
    '보고가 접수되었습니다.',
    '처리가 완료되었습니다.',
    '기록만 남기고 다음으로 넘어갑니다.',
    'ORACLE이 결정을 기록합니다.',
    '일상적 결재가 처리되었습니다.',
    '결정이 문서화되었습니다.',
    '서류 처리가 완료되었습니다.'
  ],
  [
    'The directive has been logged.',
    'The order has been processed.',
    'Proceeding to the next matter.',
    'The report has been received.',
    'Processing is complete.',
    'The record has been updated and filed.',
    'ORACLE records the decision.',
    'Routine approval has been processed.',
    'The decision has been documented.',
    'Paperwork is complete.'
  ]
);

var _RT_GI_POS = _rtPool(
  [
    'ORACLE이 조용히 반응을 따릅니다.',
    '예정 경로대로 처리됩니다.',
    '시스템이 안정적으로 반응합니다.'
  ],
  [
    'ORACLE responds with quiet approval.',
    'The matter proceeds along the expected route.',
    'The system responds without incident.'
  ]
);

var _RT_GI_NEG = _rtPool(
  [
    '터미널 구석에 미세한 경고 표시가 떠오릅니다.',
    'ORACLE의 즉시 반응이 보류됩니다.',
    '기록 로그에 별도 태그가 붙습니다.'
  ],
  [
    'A small warning appears at the edge of the terminal.',
    'ORACLE’s immediate response is withheld.',
    'A separate tag is attached to the record log.'
  ]
);

function getResultText(cardId, dir) {
  var key = cardId + '_' + dir;
  if (_rtLocale() === 'en' && typeof tc === 'function') {
    var loc = tc('resultText', key, null);
    if (loc && loc.text) return loc.text;
    if (typeof loc === 'string') return loc;
  }
  if (RESULT_TEXT[key]) {
    if (_rtLocale() !== 'en' || !_rtBadEnglishText(RESULT_TEXT[key])) return RESULT_TEXT[key];
  }

  var card = null;
  for (var i = 0; i < CARDS.length; i++) {
    if (CARDS[i].id === cardId) {
      card = CARDS[i];
      break;
    }
  }
  if (!card) return null;

  var ch = dir === 'left' ? card.left : card.right;
  if (!ch) return null;

  var fx = ch.fx || {};
  var hash = 0;
  for (var ci = 0; ci < cardId.length; ci++) {
    hash = ((hash << 5) - hash + cardId.charCodeAt(ci)) | 0;
  }
  var seed = Math.abs(hash + (dir === 'left' ? 0 : 7));

  var best = null;
  var bestAbs = 0;
  var keys = ['c', 'r', 't', 'o'];
  for (var ki = 0; ki < keys.length; ki++) {
    var statKey = keys[ki];
    if (fx[statKey] && Math.abs(fx[statKey]) > bestAbs) {
      bestAbs = Math.abs(fx[statKey]);
      best = statKey;
    }
  }

  if (best) {
    var pool = _rtLocale() === 'en'
      ? (fx[best] > 0 ? _RT_POS_EN[best] : _RT_NEG_EN[best])
      : (fx[best] > 0 ? _RT_POS[best] : _RT_NEG[best]);
    return pool[seed % pool.length];
  }

  var g = ch.g || 0;
  if (_rtLocale() === 'en') {
    if (g > 0) return _RT_GI_POS_EN[seed % _RT_GI_POS_EN.length];
    if (g < 0) return _RT_GI_NEG_EN[seed % _RT_GI_NEG_EN.length];
    return _RT_NEUTRAL_EN[seed % _RT_NEUTRAL_EN.length];
  }
  if (g > 0) return _RT_GI_POS[seed % _RT_GI_POS.length];
  if (g < 0) return _RT_GI_NEG[seed % _RT_GI_NEG.length];
  return _RT_NEUTRAL[seed % _RT_NEUTRAL.length];
}
