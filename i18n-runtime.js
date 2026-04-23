// i18n-runtime.js — TIU 다국어 런타임 코어
// 한국어 기본, 영어 오버레이 방식. 기존 코드 무변경 폴백 보장.
(function(){
  var locale = 'ko'; // 기본 언어
  var ui = { ko:{}, en:{} };
  var content = { ko:{}, en:{} };

  // 저장된 언어 설정 복원
  try { var saved = localStorage.getItem('ts_locale'); if(saved) locale = saved; } catch(e){}

  // 딥 머지 유틸
  function deepMerge(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key] || typeof target[key] !== 'object') target[key] = {};
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  window.TS_I18N = {
    // 현재 로케일
    getLocale: function() { return locale; },
    setLocale: function(l) {
      locale = l;
      try { localStorage.setItem('ts_locale', l); } catch(e){}
    },

    // UI 문자열 머지 (lang-ui-ko.js, lang-ui-en.js 에서 호출)
    mergeUI: function(lang, data) {
      if (!ui[lang]) ui[lang] = {};
      deepMerge(ui[lang], data);
    },

    // 콘텐츠 오버레이 머지 (lang-content-en.phase*.js 에서 호출)
    mergeContent: function(lang, data) {
      if (!content[lang]) content[lang] = {};
      deepMerge(content[lang], data);
    },

    // UI 문자열 조회: t('stats.title') → 현재 로케일 → ko 폴백
    t: function(path, params) {
      var val = resolve(ui[locale], path) || resolve(ui['ko'], path);
      if (val === undefined || val === null) return path;
      if (typeof val !== 'string') return val;
      if (params) {
        for (var k in params) {
          val = val.split('{' + k + '}').join(String(params[k]));
        }
      }
      return val;
    },

    // 콘텐츠 조회: tc('cards', 'C-001') → 영어 오버레이 객체 또는 null
    tc: function(bucket, id, fallback) {
      var c = content[locale];
      if (c && c[bucket] && c[bucket][id]) return c[bucket][id];
      if (locale !== 'ko') {
        var k = content['ko'];
        if (k && k[bucket] && k[bucket][id]) return k[bucket][id];
      }
      return fallback || null;
    },

    // 디버그용
    _ui: ui,
    _content: content
  };

  // 경로 해석 헬퍼: resolve(obj, 'stats.title')
  function resolve(obj, path) {
    if (!obj || !path) return undefined;
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur === undefined || cur === null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  // 전역 단축 함수
  window.t = function(path, params) { return window.TS_I18N.t(path, params); };
  window.tc = function(bucket, id, fallback) { return window.TS_I18N.tc(bucket, id, fallback); };
})();
