// Issue #22 targeted integrity audit.
// Run with: node tools/issue22_audit.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HANGUL_RE = /[\uac00-\ud7a3]/;

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function fail(errors, message) {
  errors.push(message);
}

function assertContains(errors, rel, needle, label) {
  const text = read(rel);
  if (!text.includes(needle)) fail(errors, `${label}: missing ${needle} in ${rel}`);
}

function block(text, id) {
  const start = text.indexOf(`id: "${id}"`) >= 0 ? text.indexOf(`id: "${id}"`) : text.indexOf(`id:"${id}"`);
  if (start < 0) return '';
  const rest = text.slice(start + 1);
  const match = rest.match(/\n\s*\{\s*id\s*:/);
  const end = match ? start + 1 + match.index : text.length;
  return text.slice(start, end);
}

function bootI18n() {
  const sandbox = {
    console,
    window: {},
    document: { documentElement: { lang: '', setAttribute() {} } },
    localStorage: { getItem(key) { return key === 'ts_locale' ? 'en' : null; }, setItem() {} },
    CustomEvent: function CustomEvent(type, init) { return { type, detail: init && init.detail }; }
  };
  sandbox.window = sandbox;
  sandbox.global = sandbox;
  const ctx = vm.createContext(sandbox);
  [
    'i18n-runtime.js',
    'lang-ui-ko.js',
    'lang-ui-en.js',
    'lang-content-en-all.js',
    'lang-archive-en.js',
    'lang-evening-extra-en.js',
    'lang-cards-ce-en.js',
    'lang-cards-ca4-en.js',
    'lang-cards-ct-en.js',
    'lang-cards-cs-en.js',
    'lang-cards-side-en.js',
    'lang-cards-flow-en.js',
    'lang-cards-c-en.js',
    'data-core.js',
    'data-facility.js',
    'data-facility-2.js',
    'data-cards-facility-propose.js'
  ].forEach((rel) => vm.runInContext(read(rel), ctx, { filename: rel }));
  ctx.TS_I18N.setLocale('en');
  return ctx;
}

function checkTranslations(errors) {
  const ctx = bootI18n();
  Object.keys(ctx.NP || {}).forEach((poolKey) => {
    (ctx.NP[poolKey] || []).forEach((headline, index) => {
      const nid = ctx.NEWS_ID_BY_TEXT && ctx.NEWS_ID_BY_TEXT[headline];
      const translated = (nid ? ctx.tc('newsItems', nid, null) : null) || ctx.tc('newsItems', headline, null);
      if (!translated) fail(errors, `missing newsItems overlay for NP.${poolKey}[${index}]`);
      if (translated && HANGUL_RE.test(translated)) fail(errors, `Hangul leaked in newsItems NP.${poolKey}[${index}]`);
    });
  });

  [
    'CH-I01A-1', 'CH-I01A-2', 'CH-I01B-1', 'CH-I01B-2',
    'CH-I02A-1', 'CH-I02A-2', 'CH-I02B-1', 'CH-I02B-2',
    'CH-I03A-1', 'CH-I03A-2', 'CH-I03B-1', 'CH-I03B-2',
    'CH-I04A-1', 'CH-I04A-2', 'CH-I04B-1', 'CH-I04B-2',
    'CH-I05A-1', 'CH-I05A-2', 'CH-I05B-1', 'CH-I05B-2'
  ].forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) return fail(errors, `missing CH-I overlay ${id}`);
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      if (!view[prop]) fail(errors, `missing CH-I overlay ${id}.${prop}`);
      if (view[prop] && HANGUL_RE.test(view[prop])) fail(errors, `Hangul leaked in CH-I overlay ${id}.${prop}`);
    });
  });

  [
    'haeun_2a_7-12', 'haeun_3a_14-18', 'haeun_3a_19-23', 'haeun_4a_29-31',
    'haeun_4a_32-33', 'haeun_4a_34-35',
    'jaehyuk_3a_14-17', 'jaehyuk_3a_18-23', 'jaehyuk_4a_29-30',
    'jaehyuk_4a_31-32', 'jaehyuk_4a_33', 'jaehyuk_4a_34', 'jaehyuk_4a_35',
    'doyun_2b_8-11', 'doyun_3b_19-23', 'doyun_4b_31-32', 'doyun_4b_33',
    'doyun_4b_34', 'doyun_4b_35',
    'sejin_2b_9-12', 'sejin_3b_13-16', 'sejin_3b_17-23',
    'sejin_4b_31-32', 'sejin_4b_33', 'sejin_4b_34', 'sejin_4b_35'
  ].forEach((key) => {
    const chat = ctx.tc('eveningChats', key, null);
    const resp = ctx.tc('eveningResponses', key, null);
    if (!chat || !Array.isArray(chat.lines)) fail(errors, `missing evening chat overlay ${key}`);
    if (!resp || !resp.a || !resp.b) fail(errors, `missing evening response overlay ${key}`);
  });

  ['LOG-OBSERVER-APPROVED', 'LOG-C106-HERB', 'LOG-C159-GYM'].forEach((id) => {
    const view = ctx.tc('oracleLogs', id, null);
    if (!view || !view.title || !view.content) fail(errors, `missing oracle log EN overlay ${id}`);
  });
}

function main() {
  const errors = [];
  const cards5 = read('data-cards-5.js');
  const cards10 = read('data-cards-10.js');
  const cards11 = read('data-cards-11.js');
  const cards12 = read('data-cards-12.js');
  const cardsCrisis = read('data-cards-crisis.js');
  const cardsNeutral = read('data-cards-neutral.js');
  const cards1 = read('data-cards-1.js');
  const langAll = read('lang-content-en-all.js');

  ['LOG-OBSERVER-APPROVED', 'LOG-C106-HERB', 'LOG-C159-GYM'].forEach((id) => {
    assertContains(errors, 'data-logs-integrity.js', `id: "${id}"`, 'log definition');
  });
  assertContains(errors, 'app-logic.js', "if(cid==='C-106')tryUnlock('LOG-C106-HERB');", 'C-106 unlock');
  assertContains(errors, 'app-logic.js', "if(cid==='C-159')tryUnlock('LOG-C159-GYM');", 'C-159 unlock');

  const c106 = block(cards5, 'C-106');
  const c154 = block(cards5, 'C-154');
  if (!c106.includes('LOG-C106-HERB') || c106.includes('LOG-026')) fail(errors, 'C-106 should use LOG-C106-HERB and not LOG-026');
  if (!c154.includes('LOG-C106-HERB') || c154.includes('LOG-026')) fail(errors, 'C-154 should use LOG-C106-HERB and not LOG-026');
  assertContains(errors, 'data-missions-4.js', 'log: "LOG-026"', 'M-009 SPEC-004 log');
  assertContains(errors, 'data-cards-4.js', 'logs.includes("LOG-026")', 'SPEC-004 follow-up');

  if (!block(cards10, 'C-159').includes('LOG-C159-GYM')) fail(errors, 'C-159 should use LOG-C159-GYM');
  if (!block(cards12, 'C-200').includes('LOG-050')) fail(errors, 'C-200 should be blocked after Seo Hae-eun transfer');
  if (!block(cards12, 'C-201').includes('LOG-050')) fail(errors, 'C-201 should be blocked after Seo Hae-eun transfer');

  if (!langAll.includes('left shoulder and side') || /right leg|Thermal injury/i.test(block(langAll, 'C-189'))) {
    fail(errors, 'C-189 EN should match left shoulder/side shrapnel wound route');
  }
  if (!cards11.includes('C-187 is intentionally unused')) fail(errors, 'C-187 intentional gap comment missing');
  if (!read('data-cards-15.js').includes('C-251 is intentionally unused')) fail(errors, 'C-251 intentional gap comment missing');
  if (!read('images.js').includes('ending_C_cst: "assets/images/endings/ending_C_cst.png"')) fail(errors, 'ending_C_cst dedicated-art mapping missing');

  if (!block(cardsCrisis, 'CA-SEED-01').includes('o: 1') || !block(cardsCrisis, 'CA-SEED-01').includes('g: -2')) fail(errors, 'CA-SEED-01 should have visible differentiated fx');
  if (!block(cardsCrisis, 'CA-SEED-02').includes('r: -1') || !block(cardsCrisis, 'CA-SEED-02').includes('g: -3')) fail(errors, 'CA-SEED-02 should have visible differentiated fx');
  if (!block(cardsNeutral, 'CA-OBS-PROTO').includes('t:-1') || !block(cardsNeutral, 'CA-OBS-PROTO').includes('g: -2')) fail(errors, 'CA-OBS-PROTO approval should leave visible trace');
  if (!block(cards1, 'C-034').includes('o: -2') || !block(cards1, 'C-034').includes('g: -4')) fail(errors, 'C-034 penalty should be softened to o:-2/g:-4');

  assertContains(errors, 'data-cards-2.js', 'mission: "M-007"', 'C-089 M-007 trigger');
  assertContains(errors, 'data-missions-3.js', 'id: "M-007"', 'M-007 definition');
  ['CA4-C001', 'CA4-C002', 'CA4-C003', 'CA4-C004'].forEach((id) => {
    const b = block(read('data-cards-act4.js'), id);
    if (!b.includes('once:true')) fail(errors, `${id} should remain once:true`);
  });
  assertContains(errors, 'data-core.js', 'id: "LOG-OBSERVER-INTRO"', 'LOG-OBSERVER-INTRO definition');
  assertContains(errors, 'data-logs-integrity.js', 'id: "LOG-FOSTER-CASE"', 'LOG-FOSTER-CASE definition');

  checkTranslations(errors);

  if (errors.length) {
    console.error('issue22 audit failed:');
    errors.forEach((err) => console.error('  - ' + err));
    process.exit(1);
  }
  console.log('issue22 audit ok');
}

main();
