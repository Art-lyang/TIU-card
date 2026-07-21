// data-card-speakers.js — 카드 화자 배지(speaker chip) 매핑/추론 (BUILD 453)
// 우선순위: card.speaker 명시 > SPEAKER_ID_OVERRIDES[card.id] > msg 이름 추론 > 진영 키워드 > oracle 기본값.
// 간부 포트레잇은 resolveEveningEmotionImg(신뢰도 tier × Act)를 재사용하고, 없으면 CHAR_IMG 기본으로 폴백한다.
// 히든/옵저버 계열은 해금 전 노출 금지 — glitch 배지로 은닉한다(스포일러 규칙).
(function(){
  var F = 'assets/images/factions/';

  // 간부/인물 화자: charKey -> 표시명/직책/기본 포트레잇 이름(CHAR_IMG 키)
  var PERSONS = {
    doyun:    { name:'강도윤',        nameEn:'Kang Do-yun',  role:'야전지휘', roleEn:'FIELD',   charName:'강도윤' },
    haeun:    { name:'서하은',        nameEn:'Seo Ha-eun',   role:'분석',     roleEn:'ANALYST', charName:'서하은' },
    sejin:    { name:'윤세진',        nameEn:'Yoon Se-jin',  role:'생물연구', roleEn:'BIO',     charName:'윤세진' },
    jaehyuk:  { name:'임재혁',        nameEn:'Lim Jae-hyuk', role:'시스템',   roleEn:'SYS',     charName:'임재혁' },
    soyoung:  { name:'박소영',        nameEn:'Park So-young',role:'데이터',   roleEn:'DATA',    charName:'박소영' },
    weber:    { name:'마르쿠스 베버', nameEn:'Marcus Weber', role:'프로메테우스', roleEn:'PROMETHEUS', charName:'마르쿠스 베버' },
    foster:   { name:'닉 포스터',     nameEn:'Nick Foster',  role:'프로메테우스', roleEn:'PROMETHEUS', charName:'닉 포스터' },
    jungchul: { name:'이중철',        nameEn:'Lee Jung-chul',role:'지휘관',   roleEn:'CMD',     charName:'이중철' }
  };

  // 진영/시스템 화자: key -> 표시명/이미지
  var FACTIONS = {
    oracle:     { name:'ORACLE',      nameEn:'ORACLE',        role:'시스템',   roleEn:'SYSTEM',  img:'assets/images/logos/logo_oracle_hq_v1.webp' },
    gov:        { name:'정부 연락선', nameEn:'Gov. Liaison',  role:'상부',     roleEn:'COMMAND', img:F+'spk_gov_v1.webp' },
    prometheus: { name:'프로메테우스', nameEn:'Prometheus',   role:'외부',     roleEn:'EXTERNAL',img:'assets/images/logos/logo_prometheus_hq_v1.webp' },
    civilian:   { name:'격벽 인근',   nameEn:'Barrier Zone',  role:'민간',     roleEn:'CIVILIAN',img:F+'spk_civilian_v1.webp' },
    haejin:     { name:'해진회',      nameEn:'Haejinhoe',     role:'감시대상', roleEn:'WATCHED', img:F+'spk_haejin_v1.webp' },
    glitch:     { name:'████', nameEn:'████', role:'UNREGISTERED', roleEn:'UNREGISTERED', img:F+'spk_glitch_v1.webp' }
  };

  function isEn(){ return !!(window.TS_I18N && TS_I18N.getLocale && TS_I18N.getLocale()==='en'); }
  function pickName(o){ return isEn() && o.nameEn ? o.nameEn : o.name; }
  function pickRole(o){ return isEn() && o.roleEn ? o.roleEn : o.role; }

  // 카드 ID 단위 수동 교정. 추론이 틀리는 카드만 여기에 얇게 얹는다.
  var SPEAKER_ID_OVERRIDES = {
    'CA-OBS-PROTO': 'glitch'
  };

  // msg 안의 인물 첫 언급 탐지용 (전체 이름 우선, 좁은 별칭은 오탐 위험으로 제외)
  var PERSON_PATTERNS = [
    ['doyun',   /강도윤/],
    ['haeun',   /서하은/],
    ['sejin',   /윤세진/],
    ['jaehyuk', /임재혁/],
    ['soyoung', /박소영/],
    ['weber',   /베버/],
    ['foster',  /포스터/],
    ['jungchul',/이중철/]
  ];

  var FACTION_PATTERNS = [
    ['haejin',     /해진회/],
    ['prometheus', /프로메테우스/],
    ['gov',        /정부|국방부|방첩|상부 지시|중앙(?:정부|위원회)/],
    ['civilian',   /민간인|정착지|주민|피난민|생존자 무리/]
  ];

  function inferKeyFromText(text){
    if(!text) return null;
    var best = null, bestIdx = Infinity, i, m;
    for(i=0;i<PERSON_PATTERNS.length;i++){
      m = text.search(PERSON_PATTERNS[i][1]);
      if(m >= 0 && m < bestIdx){ best = PERSON_PATTERNS[i][0]; bestIdx = m; }
    }
    if(best) return best;
    for(i=0;i<FACTION_PATTERNS.length;i++){
      if(FACTION_PATTERNS[i][1].test(text)) return FACTION_PATTERNS[i][0];
    }
    return null;
  }

  // 히든/옵저버 계열 은닉: 해금 전 화자를 드러내지 않는다
  function isConcealedId(id){
    return /^(CA-OBS|OBS-HINT)/.test(id||'');
  }

  // card + ctx({trust, act, glitch}) -> {key, name, role, img} | null
  window.resolveCardSpeaker = function(card, ctx){
    if(!card) return null;
    ctx = ctx || {};
    var key = card.speaker || SPEAKER_ID_OVERRIDES[card.id] || null;
    if(!key && (ctx.glitch || isConcealedId(card.id))) key = 'glitch';
    if(!key) key = inferKeyFromText(card.msg);
    if(!key) key = 'oracle';

    if(PERSONS[key]){
      var p = PERSONS[key], img = null;
      if(typeof resolveEveningEmotionImg === 'function'){
        var tier = (typeof getTrustTier === 'function' && ctx.trust) ? getTrustTier(ctx.trust, key) : 'mid';
        img = resolveEveningEmotionImg(key, { tier: tier, act: ctx.act || 1 });
      }
      if(!img && typeof CHAR_IMG !== 'undefined') img = CHAR_IMG[p.charName] || null;
      if(!img){ var o = FACTIONS.oracle; return { key:'oracle', name:pickName(o), role:pickRole(o), img:o.img }; }
      return { key:key, name:pickName(p), role:pickRole(p), img:img };
    }
    var f = FACTIONS[key] || FACTIONS.oracle;
    return { key:key, name:pickName(f), role:pickRole(f), img:f.img };
  };

  window.CARD_SPEAKER_FACTIONS = FACTIONS;
  window.CARD_SPEAKER_OVERRIDES = SPEAKER_ID_OVERRIDES;
})();
