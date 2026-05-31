// i18n-runtime.js — TIU multilingual runtime core
// Korean-first source with English overlay fallback.
(function(){
  var locale = 'ko';
  var ui = { ko:{}, en:{} };
  var content = { ko:{}, en:{} };

  try {
    var saved = localStorage.getItem('ts_locale');
    if (saved) locale = saved;
  } catch(e) {}

  function deepMerge(target, source) {
    for (var key in source) {
      if (!source.hasOwnProperty(key)) continue;
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

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

  function normalizeLocale(l) {
    l = String(l || 'ko').toLowerCase();
    return (l.indexOf('en') === 0) ? 'en' : 'ko';
  }

  function applyLocaleToDocument() {
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = locale;
        document.documentElement.setAttribute('data-ts-locale', locale);
      }
    } catch(e) {}
  }

  function notifyLocaleChanged() {
    try {
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        var ev;
        if (typeof CustomEvent === 'function') {
          ev = new CustomEvent('tiu:locale-changed', { detail: { locale: locale } });
        } else {
          ev = document.createEvent('CustomEvent');
          ev.initCustomEvent('tiu:locale-changed', false, false, { locale: locale });
        }
        window.dispatchEvent(ev);
      }
    } catch(e) {}
  }

  locale = normalizeLocale(locale);
  applyLocaleToDocument();

  window.TS_I18N = {
    getLocale: function() { return locale; },
    setLocale: function(l) {
      var next = normalizeLocale(l);
      if (next === locale) {
        applyLocaleToDocument();
        notifyLocaleChanged();
        return locale;
      }
      locale = next;
      try { localStorage.setItem('ts_locale', locale); } catch(e) {}
      applyLocaleToDocument();
      notifyLocaleChanged();
      return locale;
    },
    mergeUI: function(lang, data) {
      if (!ui[lang]) ui[lang] = {};
      deepMerge(ui[lang], data);
    },
    mergeContent: function(lang, data) {
      if (!content[lang]) content[lang] = {};
      deepMerge(content[lang], data);
    },
    t: function(path, params) {
      var val = resolve(ui[locale], path);
      if (val === undefined || val === null) val = resolve(ui.ko, path);
      if (val === undefined || val === null) return path;
      if (typeof val !== 'string') return val;
      if (params) {
        for (var k in params) {
          if (params.hasOwnProperty(k)) {
            val = val.split('{' + k + '}').join(String(params[k]));
          }
        }
      }
      return val;
    },
    tc: function(bucket, id, fallback) {
      var c = content[locale];
      if (c && c[bucket] && c[bucket][id]) return c[bucket][id];
      if (locale !== 'ko') {
        var k = content.ko;
        if (k && k[bucket] && k[bucket][id]) return k[bucket][id];
      }
      return fallback || null;
    },
    _ui: ui,
    _content: content
  };

  window.t = function(path, params) { return window.TS_I18N.t(path, params); };
  window.tc = function(bucket, id, fallback) { return window.TS_I18N.tc(bucket, id, fallback); };
})();
