// Issue #21 P0-P3 closure audit.
// Runs without external packages: `node tools/issue21_audit.js`
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HANGUL_RE = /[\uac00-\ud7a3]/;

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function createI18nContext() {
  const sandbox = {
    console,
    window: {},
    document: { documentElement: { lang: '', setAttribute() {} } },
    localStorage: { getItem() { return 'en'; }, setItem() {} },
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
    'lang-cards-flow-en.js',
    'lang-cards-side-en.js',
    'lang-cards-c-en.js'
  ].forEach((rel) => vm.runInContext(read(rel), ctx, { filename: rel }));
  ctx.TS_I18N.setLocale('en');
  return ctx;
}

function checkOverlay(ctx, bucket, id, props) {
  const view = ctx.tc(bucket, id, null);
  assert(view, `missing ${bucket} overlay: ${id}`);
  props.forEach((prop) => {
    assert(view[prop], `missing ${bucket}.${id}.${prop}`);
    if (typeof view[prop] === 'string') {
      assert(!HANGUL_RE.test(view[prop]), `Hangul leaked in ${bucket}.${id}.${prop}`);
    }
  });
}

function main() {
  const checks = [];
  const ok = (name, fn) => {
    fn();
    checks.push(name);
  };

  ok('P0 EV-01 uses LOG-006', () => {
    assert(/id:\s*"EV-01"[\s\S]*src:\s*"LOG-006"/.test(read('data-evidence.js')), 'EV-01 src must be LOG-006');
  });

  ok('P1/P3 balance and route guards are present', () => {
    const c12 = read('data-cards-12.js');
    assert(/id:\s*"C-332"[\s\S]*left:\s*\{[^}]*t:\s*1[\s\S]*right:\s*\{[^}]*t:\s*2/.test(c12), 'C-332 branch values were not differentiated');
    assert(/id:\s*"C-021"[\s\S]*LOG-006[\s\S]*LOG-EV-UNLOCK/.test(read('data-cards-1.js')), 'C-021 must require LOG-006 and LOG-EV-UNLOCK');
    assert(!read('data-cards-1.js').includes('지난주 대비'), 'C-031 should not use relative "last week" wording');
    assert(!read('lang-content-en-all.js').includes('from last week'), 'C-031 English overlay should not use relative "last week" wording');
    assert(/id:\s*"CA4-OR-02"[\s\S]*right:\s*\{[^}]*c:\s*1,\s*r:\s*0,\s*t:\s*-3,\s*o:\s*1/.test(read('data-cards-act4-ext.js')), 'CA4-OR-02 right branch should use softened non-dominant stats');
    assert(/id:\s*"C-188"[\s\S]*doyunUnavailable/.test(read('data-cards-11.js')), 'Kang Do-yun injury route guard is missing');
    assert(/if \(cardId === 'CE-005'\)/.test(read('balance-tuning.js')), 'CE-005 route cap is missing');
    assert(/if \(cardId === 'CE-042' \|\| cardId === 'CE-042B' \|\| cardId === 'CE-042C' \|\| cardId === 'CE-042D'\)/.test(read('balance-tuning.js')), 'CE-042 extreme penalty guard is missing');
  });

  ok('P1/P2 i18n overlays are present', () => {
    const ctx = createI18nContext();
    [
      'LJC-PROM-01', 'LJC-PROM-02', 'LJC-PROM-03', 'LJC-PROM-04', 'LJC-PROM-05', 'LJC-PROM-06', 'LJC-PROM-07',
      'CN-001', 'CN-002', 'CN-003', 'CN-004', 'CN-005',
      'CR-001', 'CR-002', 'CR-003', 'CR-004', 'CR-005', 'CR-006',
      'KC-01', 'KC-02', 'KC-03', 'KC-04', 'KC-05', 'KC-06', 'KC-07', 'KC-08',
      'A2-FORESHADOW-01', 'A2-FORESHADOW-02', 'A2-TRIAGE-01',
      'A4-SUPPORT-DG-01', 'A4-SUPPORT-MD-01', 'A4-SUPPORT-PROM-01',
      'A4-EVIDENCE-RELIEF-01', 'A4-STAFF-REVIEW-01',
      'A3-B3-LINE-01', 'A3-B3-LINE-02', 'A4-B3-LINE-01'
    ].forEach((id) => checkOverlay(ctx, 'cards', id, ['msg', 'leftLabel', 'rightLabel']));
    [
      'LOG-KR-CIV-REPORT', 'LOG-KR-CIV-QUIET', 'LOG-KR-GATE-STRICT', 'LOG-KR-GATE-REVIEW',
      'LOG-KR-HOSPITAL-CENTRAL', 'LOG-KR-HOSPITAL-FAMILY', 'LOG-KR-MARKET-DG', 'LOG-KR-MARKET-LOCAL',
      'LOG-KR-SCHOOL-CLOSE', 'LOG-KR-SCHOOL-CONTINUE', 'LOG-KR-RECORD-PRESERVE', 'LOG-KR-RECORD-RESTORE',
      'LOG-KR-HUB-LOCK', 'LOG-KR-HUB-OPEN', 'LOG-KR-REGISTRY-SEAL', 'LOG-KR-REGISTRY-SHARE',
      'LOG-LJC-PROM-01', 'LOG-LJC-PROM-02', 'LOG-LJC-PROM-03', 'LOG-LJC-PROM-04',
      'LOG-LJC-PROM-05', 'LOG-LJC-PROM-06', 'LOG-LJC-PROM-07',
      'LOG-A2-FORESHADOW-01', 'LOG-A2-FORESHADOW-02', 'LOG-A2-TRIAGE-01',
      'LOG-A4-DG-SUPPORT', 'LOG-A4-MD-SUPPORT', 'LOG-A4-PROM-SUPPORT',
      'LOG-A4-EVIDENCE-RELIEF', 'LOG-A4-STAFF-REVIEW',
      'LOG-B3-LINEAGE-01', 'LOG-B3-LINEAGE-02', 'LOG-A4-B3-LINEAGE',
      'LOG-INTRO-SH', 'LOG-INTRO-KD', 'LOG-INTRO-YS', 'LOG-INTRO-IJ',
      'LOG-ACT2', 'LOG-ACT3', 'LOG-ACT4'
    ].forEach((id) => checkOverlay(ctx, 'oracleLogs', id, ['title', 'content']));
  });

  ok('P2/P3 release hygiene is wired', () => {
    const ignore = read('.gitignore');
    assert(ignore.includes('TEST/'), 'TEST/ should be ignored');
    assert(ignore.includes('advance_button.png'), 'advance_button.png should be ignored');
    assert(!fs.existsSync(path.join(ROOT, 'TEST')), 'TEST/ should not remain in release root');
    assert(!fs.existsSync(path.join(ROOT, 'advance_button.png')), 'advance_button.png should not remain in release root');
    assert(fs.existsSync(path.join(ROOT, 'assets/images/characters/char_agent_kang_hq_v1.jpg')), 'char_agent_kang_hq asset is missing');
    assert(read('images_p1.js').includes('char_agent_kang_hq'), 'char_agent_kang_hq mapping is missing');
  });

  ok('P2/P3 ending image paths are deployment-safe', () => {
    const imageText = read('images.js');
    [
      'ending_A.png', 'ending_B.png', 'ending_C_c.png', 'ending_C_cs.png', 'ending_C_o.png',
      'ending_C_r.png', 'ending_C_t.png', 'ending_D.png', 'ending_E.png', 'ending_E_bad.png',
      'ending_E_c.png', 'ending_F.png', 'ending_G.png', 'ending_H.png'
    ].forEach((file) => {
      assert(imageText.includes(`assets/images/endings/${file}`), `images.js should point ${file} into assets/images/endings`);
      assert(fs.existsSync(path.join(ROOT, 'assets/images/endings', file)), `missing copied ending asset: ${file}`);
    });
  });

  ok('P2/P3 log definitions and KC-06 prerequisites are closed', () => {
    const integrity = read('data-logs-integrity.js');
    ['LOG-INTRO-SH', 'LOG-INTRO-KD', 'LOG-INTRO-YS', 'LOG-INTRO-IJ', 'LOG-ACT2', 'LOG-ACT3', 'LOG-ACT4'].forEach((id) => {
      assert(integrity.includes(id), `missing ORACLE_LOGS definition for ${id}`);
    });
    const kc = read('data-cards-korea-civilian.js');
    assert(!kc.includes('LOG-KR-GATE-OPEN'), 'KC-06 still references non-produced LOG-KR-GATE-OPEN');
    assert(!kc.includes('LOG-KR-HOSPITAL-ISOLATE'), 'KC-06 still references non-produced LOG-KR-HOSPITAL-ISOLATE');
    assert(kc.includes('LOG-KR-GATE-REVIEW') && kc.includes('LOG-KR-HOSPITAL-CENTRAL'), 'KC-06 should include produced gate/hospital logs');
    assert(!/priority:\s*["']event["']/.test(read('data-cards-resist-hint.js')), 'card priority event should not remain in resist-hint cards');
  });

  console.log(`issue21 audit ok (${checks.length} groups)`);
  checks.forEach((name) => console.log(`  - ${name}`));
}

main();
