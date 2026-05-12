// Issue #23 follow-up audit.
// Run with: node tools/issue23_audit.js
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
    'lang-cards-c-en.js',
    'lang-cards-flow-en.js'
  ].forEach((rel) => vm.runInContext(read(rel), ctx, { filename: rel }));
  ctx.TS_I18N.setLocale('en');
  return ctx;
}

function checkEnglishText(errors, label, value) {
  if (!value) return fail(errors, `${label} missing`);
  if (HANGUL_RE.test(value)) fail(errors, `${label} contains Hangul`);
  if (MOJIBAKE_RE.test(value)) fail(errors, `${label} contains mojibake`);
}

function main() {
  const errors = [];

  const logs = read('data-logs-integrity.js');
  const kdLog = block(logs, 'LOG-INTRO-KD');
  if (!kdLog.includes('강도윤 전술지휘관')) fail(errors, 'LOG-INTRO-KD should use 전술지휘관');
  if (kdLog.includes('강도윤 현장지휘관')) fail(errors, 'LOG-INTRO-KD still uses 현장지휘관');

  const c202 = block(read('data-cards-12.js'), 'C-202');
  if (!c202.includes('EV-Σ 초기 노출 반응')) fail(errors, 'C-202 should describe early exposure response');
  if (c202.includes('EV-Σ 감염과 유사')) fail(errors, 'C-202 still uses direct infection wording');
  if (!/act:\s*\[2\]/.test(c202)) fail(errors, 'C-202 should be moved out of Act 1');

  const prologue = read('data-cards-prologue.js');
  ['CA-016', 'CA-017'].forEach((id) => {
    const card = block(prologue, id);
    if (!/act:\s*\[2\]/.test(card)) fail(errors, `${id} should not advertise unreachable Act 1 eligibility`);
  });
  const act1ContainmentCards = (prologue.match(/act:\s*\[1\][\s\S]{0,260}?fx:\s*\{[^}]*c:\s*[1-9]/g) || []).length;
  if (act1ContainmentCards < 3) fail(errors, 'Act 1 should retain several containment-positive choices');

  const c041 = block(read('data-cards-1.js'), 'C-041');
  if (!/right:[\s\S]*fx:\s*\{\s*c:\s*1,\s*r:\s*0,\s*t:\s*-1,\s*o:\s*0\s*\}/.test(c041)) {
    fail(errors, 'C-041 right branch should have visible containment/trust tradeoff');
  }

  const c2 = read('data-cards-2.js');
  const c056 = block(c2, 'C-056');
  if (!/left:[\s\S]*t:\s*-1,\s*o:\s*1/.test(c056) || !/right:[\s\S]*r:\s*-2,\s*t:\s*1,\s*o:\s*-2[\s\S]*g:\s*-3/.test(c056)) {
    fail(errors, 'C-056 should have strengthened visible Act 3/4 tradeoffs');
  }
  const c088 = block(c2, 'C-088');
  if (!/left:[\s\S]*t:\s*1,\s*o:\s*-3[\s\S]*g:\s*-4/.test(c088)) {
    fail(errors, 'C-088 refusal branch should carry stronger evaluation pressure');
  }

  const c128 = block(read('data-cards-6.js'), 'C-128');
  if (!/right:[\s\S]*t:\s*-1,\s*o:\s*1[\s\S]*g:\s*1/.test(c128)) {
    fail(errors, 'C-128 immediate sync should no longer be a no-op ORACLE approval pattern');
  }

  const ca4cr04 = block(read('data-cards-act4-ext.js'), 'CA4-CR-04');
  if (!ca4cr04 || !/left:[\s\S]*r:3,t:-2,o:2[\s\S]*g:3/.test(ca4cr04) || !/right:[\s\S]*c:-1,r:2,t:1,o:-3[\s\S]*g:-3/.test(ca4cr04)) {
    fail(errors, 'CA4-CR-04 should exist with stronger resource-crisis tradeoffs');
  }
  if (!/right:[\s\S]*t:1[\s\S]*g:-3/.test(ca4cr04)) {
    fail(errors, 'CA4-CR-04 self-procurement should give a visible Act 4 resist-trust reward');
  }

  const c177 = block(read('data-cards-4.js'), 'C-177');
  if (!/left:[\s\S]*g:\s*-2/.test(c177) || !/right:[\s\S]*g:\s*2/.test(c177)) {
    fail(errors, 'C-177 should have amplified narrative-weight GI movement');
  }

  const external = read('data-cards-15.js');
  ['C-254', 'C-255', 'C-256', 'C-257'].forEach((id) => {
    const card = block(external, id);
    if (/act:\s*\[[^\]]*[12]/.test(card)) fail(errors, `${id} should not appear before Act 3`);
  });
  if (!/id:\s*"C-254"[\s\S]*act:\s*\[3\][\s\S]*s\.day>=14/.test(external)) fail(errors, 'C-254 should start in Act 3 day 14+');
  if (!/id:\s*"C-259"[\s\S]*act:\s*\[4\]/.test(external)) fail(errors, 'C-259 should be Act 4 only');

  const appLogic = read('app-logic.js');
  if (!/cid==='C-078'[\s\S]*tryUnlock\('LOG-078'\)/.test(appLogic)) fail(errors, 'LOG-078 should be unlocked by C-078');
  if (!/cid==='C-080'[\s\S]*tryUnlock\('LOG-079'\)/.test(appLogic)) fail(errors, 'LOG-079 unlock should remain wired to C-080');
  if (!/tryUnlock\('LOG-006'\)/.test(appLogic) || !/id:\s*"C-071"[\s\S]*LOG-006/.test(c2) || !/id:\s*"C-072"[\s\S]*LOG-006/.test(c2)) {
    fail(errors, 'LOG-006 dependent cards should remain dynamically gated by unlock paths');
  }
  const ce005 = block(read('data-cards-3.js'), 'CE-005');
  if (!/timer:\s*5/.test(ce005) || !/CE-005/.test(read('balance-tuning.js'))) {
    fail(errors, 'CE-005 timer and balance cap should remain wired');
  }

  const hiddenStory = read('data-hidden-story.js');
  ['LOG-090', 'LOG-091', 'LOG-092', 'LOG-093'].forEach((id) => {
    if (!hiddenStory.includes(`id: "${id}"`)) fail(errors, `${id} hidden-story definition missing`);
    if (!hiddenStory.includes(`log: '${id}'`)) fail(errors, `${id} evening response unlock missing`);
  });

  const characterArcs = read('data-character-arcs.js');
  if (!/var\s+CARDS_CHARACTER_ARCS\s*=/.test(characterArcs) || !read('app-init.js').includes('CARDS_CHARACTER_ARCS')) {
    fail(errors, 'character arc cards should be defined and merged into the main card pool');
  }

  const facility = read('data-facility.js');
  [
    ['FE-011', 'C-FE011-A'],
    ['FE-014', 'C-FE014-A'],
    ['FE-015', 'C-FE015-A']
  ].forEach(([feId, cardId]) => {
    const feBlock = block(facility, feId);
    if (!feBlock.includes(`"${cardId}"`)) fail(errors, `${feId} should unlock ${cardId}`);
  });

  const facilityCards = read('data-facility-2.js');
  ['C-FE011-A', 'C-FE014-A', 'C-FE015-A'].forEach((id) => {
    if (!block(facilityCards, id)) fail(errors, `missing facility follow-up card ${id}`);
  });

  const imagePatch = read('images_p1.js');
  ['FP-FE-009', 'FP-FE-010', 'FP-FE-011', 'FP-FE-012', 'FP-FE-013', 'FP-FE-014', 'FP-FE-015', 'FP-FE-016',
   'C-FE009-A', 'C-FE010-A', 'C-FE011-A', 'C-FE012-A', 'C-FE013-A', 'C-FE014-A', 'C-FE015-A', 'C-FE016-A'].forEach((id) => {
    if (!imagePatch.includes(`'${id}'`)) fail(errors, `missing image patch for ${id}`);
  });
  ['logo_oracle_hq', 'logo_prometheus_hq', 'char_agent_kang_hq'].forEach((key) => {
    if (!imagePatch.includes(key)) fail(errors, `missing image strategy/mapping for ${key}`);
  });

  const manifest = read('assets/images/p1_asset_manifest.csv');
  if (/C:\\|Users|Administrator|TIU_CARD/.test(manifest)) fail(errors, 'p1 asset manifest should not contain personal absolute paths');

  [
    'assets/field-mission-ui/asset_manifest.json',
    'assets/field-mission-ui/frames/outer_terminal_frame_1080x1700.png',
    'assets/field-mission-ui/icons/clock.png',
    'assets/images/logos/logo_oracle_hq_v1.png',
    'assets/images/logos/logo_prometheus_hq_v1.png',
    'assets/images/characters/char_agent_kang_hq_v1.jpg'
  ].forEach((rel) => {
    if (!fs.existsSync(path.join(ROOT, rel))) fail(errors, `expected asset missing: ${rel}`);
  });

  const buildingApp = read('building/oracle-app.js');
  const buildingMobile = read('building/oracle-mobile.js');
  if (!buildingApp.includes('function htmlText') || /innerHTML\s*=\s*ui\(/.test(buildingApp + buildingMobile)) {
    fail(errors, 'building renderer should escape translated text before innerHTML insertion');
  }

  const ctx = bootI18n();
  const cardIds = [
    'CH-001-1', 'CH-001-2', 'CH-002-1', 'CH-002-2',
    'CH-003-1', 'CH-003-2', 'CH-004-1', 'CH-004-2',
    'CH-005-1', 'CH-005-2', 'CH-005-3', 'CH-006-1', 'CH-006-2',
    'CH-008-1', 'CH-008-1B', 'CH-008-2', 'CH-008-2B', 'CH-008-3', 'CH-008-3B',
    'CA-UPRISING-FAIL',
    'C-FE011-A', 'C-FE014-A', 'C-FE015-A'
  ];
  cardIds.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => checkEnglishText(errors, `cards.${id}.${prop}`, view && view[prop]));
  });

  const resultIds = cardIds.filter((id) => id.startsWith('CH-') || id === 'CA-UPRISING-FAIL');
  resultIds.forEach((id) => {
    ['left', 'right'].forEach((dir) => checkEnglishText(errors, `resultText.${id}_${dir}`, ctx.tc('resultText', `${id}_${dir}`, null)));
  });

  const kdEn = ctx.tc('oracleLogs', 'LOG-INTRO-KD', null);
  if (!kdEn || !String(kdEn.content || '').includes('Tactical Commander')) {
    fail(errors, 'LOG-INTRO-KD English overlay should use Tactical Commander');
  }
  const vossEn = ctx.tc('oracleLogs', 'LOG-VOSS-STANDBY', null);
  if (!vossEn || !String(vossEn.content || '').includes('Relay tag: VOSS') || !String(vossEn.content || '').includes('Markus Weber')) {
    fail(errors, 'LOG-VOSS-STANDBY English overlay should clarify VOSS relay and Markus Weber');
  }
  ['LOG-RH-NETWORK', 'LOG-CB-SUSTAINED', 'LOG-090', 'LOG-091', 'LOG-092', 'LOG-093'].forEach((id) => {
    const log = ctx.tc('oracleLogs', id, null);
    checkEnglishText(errors, `oracleLogs.${id}.title`, log && log.title);
    checkEnglishText(errors, `oracleLogs.${id}.content`, log && log.content);
  });

  if (errors.length) {
    console.error('issue23 audit failed:');
    errors.forEach((err) => console.error('  - ' + err));
    process.exit(1);
  }
  console.log('issue23 audit ok');
}

main();
