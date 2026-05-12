// Issue #24 follow-up audit.
// Run with: node tools/issue24_audit.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HANGUL_RE = /[\uac00-\ud7a3]/;
const MOJIBAKE_RE = /\ufffd|[?]{2,}/;

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function fail(errors, message) {
  errors.push(message);
}

function block(text, id) {
  const patterns = [
    `id: "${id}"`,
    `id:"${id}"`,
    `id: '${id}'`,
    `id:'${id}'`
  ];
  let start = -1;
  for (const pattern of patterns) {
    start = text.indexOf(pattern);
    if (start >= 0) break;
  }
  if (start < 0) return '';
  const rest = text.slice(start + 1);
  const match = rest.match(/\n\s*\{\s*id\s*:/);
  const end = match ? start + 1 + match.index : text.length;
  return text.slice(start, end);
}

function checkEnglishText(errors, label, value) {
  if (!value) return fail(errors, `${label} missing`);
  if (HANGUL_RE.test(String(value))) fail(errors, `${label} contains Hangul`);
  if (MOJIBAKE_RE.test(String(value))) fail(errors, `${label} contains mojibake`);
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
    'lang-cards-c-en.js',
    'lang-cards-flow-en.js'
  ].forEach((rel) => vm.runInContext(read(rel), ctx, { filename: rel }));
  ctx.TS_I18N.setLocale('en');
  return ctx;
}

function bootEvening(locale) {
  const sandbox = {
    console,
    EVENING_TRUST_LINES: {},
    window: {},
    document: { documentElement: { lang: '', setAttribute() {} } },
    localStorage: { getItem(key) { return key === 'ts_locale' ? locale : null; }, setItem() {} },
    CustomEvent: function CustomEvent(type, init) { return { type, detail: init && init.detail }; },
    getTrustTier() { return 'high'; }
  };
  sandbox.window = sandbox;
  sandbox.global = sandbox;
  const ctx = vm.createContext(sandbox);
  [
    'i18n-runtime.js',
    'lang-evening-extra-en.js',
    'data-evening-trust-3.js',
    'evening-lines.js'
  ].forEach((rel) => vm.runInContext(read(rel), ctx, { filename: rel }));
  ctx.TS_I18N.setLocale(locale);
  return ctx;
}

function main() {
  const errors = [];

  const c1 = read('data-cards-1.js');
  const c2 = read('data-cards-2.js');
  const c3 = read('data-cards-3.js');
  const c11 = read('data-cards-11.js');
  const act4 = read('data-cards-act4.js');
  const act4Ext = read('data-cards-act4-ext.js');
  const prologue = read('data-cards-prologue.js');
  const appLogic = read('app-logic.js');
  const componentsEvening = read('components-evening.js');
  const eveningLines = read('evening-lines.js');
  const logs = read('data-logs-integrity.js');
  const resistHint = read('data-cards-resist-hint.js');

  const c074 = block(c2, 'C-074');
  if (!/left:[\s\S]*o:\s*-2[\s\S]*g:\s*-5/.test(c074) || /g:\s*-6/.test(c074)) {
    fail(errors, 'C-074 should keep left GI at -5 and avoid the previous -6 spike');
  }
  if (!/right:[\s\S]*t:\s*-1,\s*o:\s*2[\s\S]*g:\s*3/.test(c074)) {
    fail(errors, 'C-074 right branch should be softened from the previous Act 4 pressure');
  }

  const ce003 = block(c3, 'CE-003');
  if (!/left:[\s\S]*c:\s*1,\s*r:\s*-1,\s*t:\s*1,\s*o:\s*-2[\s\S]*g:\s*-3/.test(ce003)) {
    fail(errors, 'CE-003 left branch should have a real but bounded tradeoff');
  }
  if (!/right:[\s\S]*t:\s*-1,\s*o:\s*1[\s\S]*g:\s*1/.test(ce003)) {
    fail(errors, 'CE-003 right branch should no longer be a dominant high-reward option');
  }

  const ca4o003 = block(act4, 'CA4-O003');
  const ca4o005 = block(act4, 'CA4-O005');
  if (/g:\s*-8/.test(ca4o003 + ca4o005) || /o:\s*-5/.test(ca4o003 + ca4o005)) {
    fail(errors, 'CA4-O003/O005 should not retain repeated -8 GI or -5 evaluation spikes');
  }
  if (!/left:[\s\S]*o:\s*-3[\s\S]*g:\s*-5/.test(ca4o003) || !/left:[\s\S]*o:\s*-3[\s\S]*g:\s*-5/.test(ca4o005)) {
    fail(errors, 'CA4-O003/O005 left branches should be curve-smoothed to -5 GI');
  }

  const c192 = block(c11, 'C-192');
  if (/t:\s*-2,\s*o:\s*-3/.test(c192) || /g:\s*-4/.test(c192)) {
    fail(errors, 'C-192 should no longer be double-punitive on both trust and evaluation');
  }
  if (!/right:[\s\S]*t:\s*1,\s*o:\s*-1[\s\S]*g:\s*-1/.test(c192)) {
    fail(errors, 'C-192 search branch should preserve a small trust-driven choice identity');
  }

  const c028 = block(c1, 'C-028');
  if (/left:[\s\S]*c:\s*0,\s*r:\s*0,\s*t:\s*0,\s*o:\s*0[\s\S]*g:\s*0/.test(c028)) {
    fail(errors, 'C-028 left branch should not be a no-op branch');
  }
  const c035 = block(c1, 'C-035');
  if (!/priority:\s*"중"/.test(c035)) fail(errors, 'C-035 should be priority 중 after timer/GI review');
  const c12 = read('data-cards-12.js');
  const c200 = block(c12, 'C-200');
  const c327 = block(c12, 'C-327');
  if (/right:[\s\S]*c:\s*0,\s*r:\s*0,\s*t:\s*0,\s*o:\s*0[\s\S]*g:\s*0/.test(c200)) {
    fail(errors, 'C-200 right branch should not remain an Act 2 no-op');
  }
  if (/right:[\s\S]*c:\s*0,\s*r:\s*0,\s*t:\s*0,\s*o:\s*0[\s\S]*g:\s*0/.test(c327)) {
    fail(errors, 'C-327 right branch should not remain an Act 2 no-op');
  }

  ['CA-014', 'CA-015'].forEach((id) => {
    const card = block(prologue, id);
    if (!/act:\s*\[2\]/.test(card)) fail(errors, `${id} should be Act 2 only`);
  });

  const ca4ch02 = block(act4Ext, 'CA4-CH-02');
  if (!/LOG-074-DONE/.test(ca4ch02) || !/LOG-075/.test(ca4ch02)) {
    fail(errors, 'CA4-CH-02 should exclude both severe injury survival and death states');
  }

  if (!/function genNews\(s,g,logs\)\{var l=\[\],recent=getRecentNewsItems\(\),lg=logs\|\|\[\]/.test(appLogic)) {
    fail(errors, 'genNews should prepare logs before route-specific deleted-news checks');
  }
  if (!/var glReady=/.test(appLogic) || !/LOG-016/.test(appLogic) || !/31%/.test(appLogic)) {
    fail(errors, 'NP.gl deleted-news pool should be route/log-gated and hide the 31% item before LOG-016');
  }

  if (!/trustAdjustedChatLines/.test(componentsEvening) || !/getEveningLines\(ec,p\.trust,p\.logs\|\|\[\]\)/.test(componentsEvening)) {
    fail(errors, 'EveningChat2 should call getEveningLines through trustAdjustedChatLines');
  }
  ['서하은', '강도윤', '윤세진', '임재혁', '마르쿠스 베버', '닉 포스터', '박소영'].forEach((name) => {
    if (!eveningLines.includes(`'${name}'`)) fail(errors, `evening-lines char map missing ${name}`);
  });
  if (!/localizedTrustLines\('doyun_injured'/.test(eveningLines)) {
    fail(errors, 'Do-yun injury lines should have an English i18n hook');
  }

  const vossBase = block(logs, 'LOG-VOSS-STANDBY');
  if (/Weber standby channel/.test(vossBase) || !/VOSS 릴레이 대기 채널/.test(vossBase)) {
    fail(errors, 'LOG-VOSS-STANDBY base Korean log should no longer be English');
  }
  const log067 = block(logs, 'LOG-067');
  if (/중기 위기 대응 기록/.test(log067) || !/정수 시설 오염 방치 기록/.test(log067)) {
    fail(errors, 'LOG-067 should identify the water-purification contamination context');
  }

  if (/id:\s*["']ONCE-/.test(resistHint)) {
    fail(errors, 'No card id should itself start with ONCE-');
  }
  ['ORC-LOYAL-SAFE-01', 'HH-01', 'RH-SAFE-01'].forEach((id) => {
    if (!block(resistHint, id)) fail(errors, `${id} original once card should exist`);
    if (!resistHint.includes(`ONCE-${id}`)) fail(errors, `${id} should still be tracked by ONCE-${id}`);
  });
  const rhSafe = block(resistHint, 'RH-SAFE-01');
  if ((rhSafe.match(/floorCriticalOnly:\s*true/g) || []).length < 2) {
    fail(errors, 'RH-SAFE-01 should use floorCriticalOnly on both branches like the ORACLE safeguard');
  }

  const c5 = read('data-cards-5.js');
  if (!block(c5, 'C-102').includes('LOG-SUPPLY-102') || !logs.includes('LOG-SUPPLY-102')) {
    fail(errors, 'LOG-SUPPLY-102 should have both a card source and a log definition');
  }
  if (read('app.js').indexOf("'LOG-EV-UNLOCK'") < 0 || !block(read('data-cards-act4-hazard.js'), 'CA4-HZ-04').includes('LOG-EV-UNLOCK')) {
    fail(errors, 'LOG-EV-UNLOCK session scope and Act 4 hazard reference should remain explicit');
  }

  const allJs = fs.readdirSync(ROOT).filter((name) => name.endsWith('.js')).map(read).join('\n');
  if (/assets\/field-mission\//.test(allJs)) fail(errors, 'No runtime JS should reference missing assets/field-mission/ paths');
  if (/CE-042B/.test(allJs) && !read('lang-cards-ce-en.js').includes('"CE-042B"')) {
    fail(errors, 'CE-042B references should have English overlay coverage');
  }

  const ctx = bootI18n();
  ['C-216', 'C-247'].forEach((id) => {
    const card = ctx.tc('cards', id, null);
    checkEnglishText(errors, `cards.${id}.msg`, card && card.msg);
    checkEnglishText(errors, `cards.${id}.leftLabel`, card && card.leftLabel);
    checkEnglishText(errors, `cards.${id}.rightLabel`, card && card.rightLabel);
  });
  ['LOG-025', 'LOG-029', 'LOG-052', 'LOG-067', 'LOG-VOSS-STANDBY'].forEach((id) => {
    const log = ctx.tc('oracleLogs', id, null);
    checkEnglishText(errors, `oracleLogs.${id}.title`, log && log.title);
    checkEnglishText(errors, `oracleLogs.${id}.content`, log && log.content);
  });
  const injury = ctx.tc('eveningTrustLines', 'doyun_injured', null);
  ['low', 'mid', 'high', 'bond'].forEach((tier) => {
    const lines = injury && injury[tier];
    if (!Array.isArray(lines) || !lines.length) fail(errors, `eveningTrustLines.doyun_injured.${tier} missing`);
    else lines.forEach((line, index) => checkEnglishText(errors, `eveningTrustLines.doyun_injured.${tier}[${index}]`, line));
  });

  const koEvening = bootEvening('ko');
  const enEvening = bootEvening('en');
  const injuryChat = { char: '강도윤', act: [3], dayMin: 14, dayMax: 28, lines: ['normal line'] };
  const koLines = koEvening.getEveningLines(injuryChat, { doyun: 80 }, ['LOG-074-DONE']);
  const enLines = enEvening.getEveningLines(injuryChat, { doyun: 80 }, ['LOG-074-DONE']);
  if (!Array.isArray(koLines) || !koLines.join('\n').includes('지휘관님')) {
    fail(errors, 'Korean Do-yun injury evening lines should be selected by getEveningLines');
  }
  if (!Array.isArray(enLines) || !enLines.join('\n').includes('Commander')) {
    fail(errors, 'English Do-yun injury evening lines should be selected by getEveningLines');
  }

  if (errors.length) {
    console.error('issue24 audit failed:');
    errors.forEach((err) => console.error('  - ' + err));
    process.exit(1);
  }
  console.log('issue24 audit ok');
}

main();
