// Critical release audit for TIU-CARD.
// Run with: node tools/critical-audit.js
//
// Focuses on issues that pass normal data validation but can break the shipped
// experience: ending localization fallbacks, ending image mapping/reuse,
// runtime cache-busting, and hidden resource-preview drift paths.

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const HANGUL_RE = /[\uac00-\ud7a3]/;
const MOJIBAKE_RE = /\ufffd|[?]{2,}|[誇댿]/;

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function deepMerge(target, source) {
  Object.keys(source || {}).forEach((key) => {
    const value = source[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  });
  return target;
}

function createSandbox() {
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    window: {},
    globalThis: {},
    document: { documentElement: { lang: '', setAttribute() {} } },
    localStorage: {
      getItem(key) { return key === 'ts_locale' ? 'en' : null; },
      setItem() {}
    },
    CustomEvent: function CustomEvent(type, init) { return { type, detail: init && init.detail }; }
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.global = sandbox;
  return vm.createContext(sandbox);
}

function runFile(ctx, rel, suffix) {
  vm.runInContext(read(rel) + (suffix || ''), ctx, { filename: rel });
}

function flatten(value, prefix, out) {
  if (typeof value === 'string') {
    out.push({ key: prefix, value });
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}[${index}]`, out));
    return out;
  }
  if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => flatten(value[key], prefix ? `${prefix}.${key}` : key, out));
  }
  return out;
}

function bootEndingContext() {
  const ctx = createSandbox();
  [
    'i18n-runtime.js',
    'lang-ui-ko.js',
    'lang-ui-en.js',
    'lang-content-en-all.js',
    'data-core.js',
    'data-cards-act4.js',
    'data-endings.js',
    'data-act4-escape.js',
    'data-facility-uprising-a.js',
    'data-facility-uprising-b.js',
    'components-endings.js'
  ].forEach((rel) => runFile(ctx, rel));
  runFile(ctx, 'images.js', '\n;globalThis.__IMG = IMG;');
  runFile(ctx, 'images_p1.js');
  ctx.TS_I18N.setLocale('en');
  return ctx;
}

function gitChangedFiles() {
  try {
    const out = execFileSync('git', ['diff', '--name-only', 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
    return out.split(/\r?\n/).filter(Boolean).map((p) => p.replace(/\\/g, '/'));
  } catch (_) {
    return [];
  }
}

function indexDiff() {
  try {
    return execFileSync('git', ['diff', 'HEAD', '--', 'index.html'], { cwd: ROOT, encoding: 'utf8' });
  } catch (_) {
    return '';
  }
}

function checkEndingCoverage(errors, warnings) {
  const ctx = bootEndingContext();
  const endings = ctx.TS_I18N._content.en.endings || {};
  const defs = ctx.ENDING_DEFS || {};
  const catalog = ctx.ENDING_CATALOG || [];
  const img = ctx.__IMG || ctx.IMG || {};
  const catalogIds = catalog.map((e) => e.id);
  const dispatchOnly = new Set(['TIME_UP']);

  catalogIds.forEach((id) => {
    const en = endings[id] || {};
    const def = defs[id] || {};
    const imgPath = img[`ending_${id}`];
    if (!defs[id]) errors.push(`ending ${id} exists in gallery but not ENDING_DEFS`);
    if (!en.name) errors.push(`ending ${id} missing English name`);
    if (!en.hint) errors.push(`ending ${id} missing English hint`);
    if (!Array.isArray(en.narrative) || en.narrative.length === 0) errors.push(`ending ${id} missing English narrative`);
    if (!Array.isArray(def.narrative) || def.narrative.length === 0) errors.push(`ending ${id} missing base narrative`);
    if (!imgPath) errors.push(`ending ${id} missing IMG.ending_${id}`);
    else if (!exists(imgPath)) errors.push(`ending ${id} image path does not exist: ${imgPath}`);
  });

  Object.keys(defs).forEach((id) => {
    if (!catalogIds.includes(id) && !dispatchOnly.has(id)) errors.push(`ENDING_DEFS.${id} is not in ENDING_CATALOG`);
  });

  Object.keys(endings).forEach((id) => {
    const strings = flatten(endings[id], `endings.${id}`, []);
    strings.forEach(({ key, value }) => {
      if (HANGUL_RE.test(value)) errors.push(`Hangul leaked in English ${key}`);
      if (MOJIBAKE_RE.test(value) && key !== 'endings.F.hint') errors.push(`possible mojibake in English ${key}: ${value.slice(0, 80)}`);
    });
  });

  const imageOwners = new Map();
  catalogIds.forEach((id) => {
    const imgPath = img[`ending_${id}`];
    if (!imgPath) return;
    if (!imageOwners.has(imgPath)) imageOwners.set(imgPath, []);
    imageOwners.get(imgPath).push(id);
  });
  imageOwners.forEach((owners, imgPath) => {
    if (owners.length > 1) errors.push(`ending image is reused by ${owners.join(', ')}: ${imgPath}`);
  });

  if (img.ending_C_cst !== 'assets/images/endings/ending_C_cst.png') {
    errors.push('ending_C_cst should use dedicated assets/images/endings/ending_C_cst.png');
  }

  if (!catalogIds.includes('TIME_UP')) {
    warnings.push('TIME_UP is dispatch-only and not listed in ending gallery');
  }
}

function checkCacheBusting(errors) {
  const changed = new Set(gitChangedFiles());
  const runtimeFiles = [
    'app.js',
    'app-init.js',
    'components-game.js',
    'images.js',
    'images_p1.js',
    'lang-content-en-all.js'
  ];
  const changedRuntime = runtimeFiles.filter((file) => changed.has(file));
  if (!changedRuntime.length) return;

  if (!changed.has('index.html')) {
    errors.push(`runtime files changed without index.html cache bump: ${changedRuntime.join(', ')}`);
    return;
  }

  const diff = indexDiff();
  if (!/BUILD_VER=\d+/.test(read('index.html'))) errors.push('index.html missing BUILD_VER');
  changedRuntime.forEach((file) => {
    const escaped = file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`\\+.*${escaped}\\?v=\\d+`).test(diff)) {
      errors.push(`index.html cache version was not bumped for ${file}`);
    }
  });
  if (!/\+<script>var BUILD_VER=\d+;<\/script>/.test(diff)) {
    errors.push('BUILD_VER was not bumped in index.html');
  }
}

function checkResourcePreviewDrift(errors) {
  const app = read('app.js');
  const init = read('app-init.js');
  const game = read('components-game.js');

  [
    'getChoicePreviewDelta',
    'getRewardPreviewDelta',
    'previewDelta',
    'getPreviewDelta'
  ].forEach((needle) => {
    if (!app.includes(needle) && !game.includes(needle)) errors.push(`resource preview hook missing: ${needle}`);
  });

  if (/riskFired|RISK_MSG|bg===['"]supply['"]/.test(app + init)) {
    errors.push('hidden random supply-risk path still exists and can desync preview from actual stats');
  }
  if (!game.includes('pv.__delta')) errors.push('Stats gauge does not consume actual preview delta objects');
  if (!game.includes('previewValue')) errors.push('Reward screen does not consume actual preview delta values');
}

function checkLogParameterSignatures(errors) {
  fs.readdirSync(ROOT)
    .filter((name) => /^data-.*\.js$/.test(name))
    .forEach((rel) => {
      read(rel).split(/\r?\n/).forEach((line, index) => {
        if (!/(cond|req)\s*:/.test(line)) return;
        if (!/function\s*\(/.test(line)) return;
        if (!/\blogs\b/.test(line)) return;
        const match = line.match(/function\s*\(([^)]*)\)/);
        if (!match) return;
        const params = match[1].split(',').map((part) => part.trim()).filter(Boolean);
        if (!params.includes('logs')) {
          errors.push(`${rel}:${index + 1} uses logs in a condition without receiving the logs parameter`);
        }
      });
    });
}

function collectFunctionPaths(value, prefix, out) {
  if (typeof value === 'function') {
    out.push(prefix);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectFunctionPaths(item, `${prefix}[${index}]`, out));
    return out;
  }
  if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => collectFunctionPaths(value[key], `${prefix}.${key}`, out));
  }
  return out;
}

function checkChainQueueSerialization(errors) {
  const ctx = createSandbox();
  ['data-chains.js', 'data-chains-incident2.js', 'data-chains-branch.js'].forEach((rel) => runFile(ctx, rel));
  const chains = ctx.CHAINS || {};
  Object.entries(chains).forEach(([id, chain]) => {
    (chain.cards || []).forEach((card, index) => {
      const where = `${id}.cards[${index}]`;
      if (!card || !card.id || !card.left || !card.right) {
        errors.push(`${where} is not a complete queue card`);
        return;
      }
      const functionFields = collectFunctionPaths(card, where, []);
      if (functionFields.length) {
        errors.push(`${where} is not JSON-safe for chainQueue save/load: ${functionFields.join(', ')}`);
      }
      try {
        JSON.stringify(card);
      } catch (e) {
        errors.push(`${where} cannot be serialized for chainQueue save/load: ${e.message}`);
      }
    });
  });
}

function checkSensitiveReleaseGuards(errors) {
  const app = read('app.js');
  const init = read('app-init.js');
  const bgm = read('bgm.js');
  const balance = read('balance-tuning.js');
  const cards13 = read('data-cards-13.js');
  const fieldMission = read('components-fieldmission-minigame-patch.js');
  const missions5 = read('data-missions-5.js');
  const missionVariants = read('data-missions-variants.js');
  const miniExpansion = read('data-minigame-expansion.js');
  const eveningLines = read('evening-lines.js');
  const eveningTrust3 = read('data-evening-trust-3.js');
  const koSide = read('data-cards-session-packs.js');
  const enSide = read('lang-cards-side-en.js');
  const evening = read('components-evening.js');
  const css = read('style.css');

  if (!cards13.includes("CARDS_NEW_B.filter(function(c){return c.id!=='C-231'}")) {
    errors.push('C-231 orphan shutdown card is not filtered out of the runtime deck');
  }
  if (read('lang-content-en-all.js').includes('"C-231"')) {
    errors.push('C-231 English overlay still exists after card removal');
  }

  [
    'resistance-softener',
    'resistance-late-floor',
    'resistance-route-floor',
    'early-evaluation-floor',
    'neutral-resource-floor',
    'act4-neutral-resource-floor',
    'act4-entry-floor',
    'loyalty-buffer',
    'act4-loyalty-buffer',
    'act1-overcontainment-buffer'
  ].forEach((kind) => {
    if (balance.includes(kind)) errors.push(`choice-stage soft floor still present: ${kind}`);
  });
  if (!/cardId === 'CE-005'[\s\S]*liftBelow\(after, 'o', 3\)/.test(balance)) {
    errors.push('CE-005 observer exception should floor o at 3 only');
  }
  if (!/cardId === 'CE-042' \|\| cardId === 'CE-042B'[\s\S]*liftBelow\(after, 'o', 3\)[\s\S]*liftBelow\(after, 'r', 3\)/.test(balance)) {
    errors.push('CE-042 final commitment exception should floor o/r at 3 only');
  }

  if (!app.includes('isPersistentSessionLog') || app.includes("id.indexOf('LOG-INTRO-')===0||id.indexOf('ONCE-')===0")) {
    errors.push('resetSessionLogs should use explicit persistent-log allowlist');
  }
  ['LOG-INTRO-SH', 'LOG-INTRO-KD', 'LOG-INTRO-YS', 'LOG-INTRO-IJ'].forEach((id) => {
    if (!app.includes(id)) errors.push(`Act 1 skip does not inject ${id}`);
  });

  if (/trust route|trust-route|신뢰 루트|follow-up rewards|후속 보상/.test(miniExpansion)) {
    errors.push('field mission follow-up text still exposes meta route/reward terms');
  }
  ['setChainQueue([])', 'setPendingBonus(null)', 'setCurMission(null)', 'setCurDlg(null)'].forEach((needle) => {
    if (!app.includes(needle)) errors.push(`new campaign does not reset volatile session state: ${needle}`);
  });
  ['Save.set(\'ts_activeMission\'', 'Save.del(\'ts_activeMission\')'].forEach((needle) => {
    if (!app.includes(needle) && !init.includes(needle)) errors.push(`active field mission save/load guard missing: ${needle}`);
  });

  if (!eveningLines.includes('LOG-DOYUN-MINOR-WOUND') || !eveningTrust3.includes('DOYUN_MINOR_WOUND_LINES')) {
    errors.push('Doyun minor wound is not reflected in evening chat');
  }
  if (!fieldMission.includes('blockLog') || !missions5.includes('LOG-DOYUN-MINOR-WOUND') || !missionVariants.includes('LOG-DOYUN-MINOR-WOUND')) {
    errors.push('Doyun minor wound is not reflected in field mission availability');
  }

  if (koSide.includes('ORACLE 장비') || enSide.includes('ORACLE equipment')) {
    errors.push('Haejinhoe text still implies they know ORACLE');
  }

  ['_dangerTs = 0', 'currentAct = 1', 'started = false'].forEach((needle) => {
    if (!bgm.includes(needle)) errors.push(`BGM.stop missing reset: ${needle}`);
  });

  if (!evening.includes('order:20')) {
    errors.push('Evening skip/proceed button is not ordered to the bottom');
  }
  if (!/oracle-link-h\) \+ 2[08]px/.test(css)) {
    errors.push('Oracle link bottom padding was not increased for evening/evidence overlap');
  }
}

function sourceBlock(rel, id) {
  const text = read(rel);
  const quoted = text.indexOf(`id: "${id}"`);
  const compact = text.indexOf(`id:"${id}"`);
  const start = quoted >= 0 ? quoted : compact;
  if (start < 0) return '';
  const rest = text.slice(start + 1);
  const match = rest.match(/\n\s*\{\s*id\s*:/);
  const end = match ? start + 1 + match.index : text.length;
  return text.slice(start, end);
}

function checkIssue33ReleaseGuards(errors) {
  const app = read('app.js');
  const balance = read('balance-tuning.js');
  const simulator = read('tools/simulator_v3.py');

  const ce014 = sourceBlock('data-cards-3.js', 'CE-014');
  const ce026 = sourceBlock('data-cards-3.js', 'CE-026');
  const ce031 = sourceBlock('data-cards-3.js', 'CE-031');
  const cr005 = sourceBlock('data-cards-crisis.js', 'CR-005');
  const caSeed04 = sourceBlock('data-cards-crisis.js', 'CA-SEED-04');
  const c253 = sourceBlock('data-cards-15.js', 'C-253');
  const r002 = sourceBlock('data-cards-act4.js', 'CA4-R002');
  const r002b = sourceBlock('data-cards-act4.js', 'CA4-R002B');
  const r005 = sourceBlock('data-cards-act4.js', 'CA4-R005');
  const r005b = sourceBlock('data-cards-act4.js', 'CA4-R005B');
  const cr01 = sourceBlock('data-cards-act4-ext.js', 'CA4-CR-01');
  const cr03 = sourceBlock('data-cards-act4-ext.js', 'CA4-CR-03');

  if (!/left:\s*\{[^}]*fx:\s*\{\s*c:\s*1,\s*r:\s*-1,\s*t:\s*1,\s*o:\s*-4\s*\}/.test(ce014)) {
    errors.push('CE-014 left choice should no longer be a t-only buffer');
  }
  if (!ce014.includes('}, g: 3 }')) {
    errors.push('CE-014 right choice should cap compliance GI gain at 3');
  }
  if (!ce026.includes('LOG-074-DONE')) {
    errors.push('CE-026 should not send critically wounded Doyun into the field');
  }
  if (/fx:\s*\{\s*c:\s*0,\s*r:\s*0,\s*t:\s*0,\s*o:\s*0\s*\}\s*,\s*g:\s*0/.test(cr005)) {
    errors.push('CR-005 still has a zero-impact crisis choice');
  }
  if (!/left:\s*\{[^}]*fx:\s*\{\s*c:\s*0,\s*r:\s*-1,\s*t:\s*1,\s*o:\s*0\s*\}/.test(ce031)) {
    errors.push('CE-031 temporary repair should spend resources instead of doing nothing');
  }
  if (/right:\s*\{[^}]*fx:\s*\{\s*c:\s*0,\s*r:\s*0,\s*t:\s*0,\s*o:\s*0\s*\}\s*,\s*g:\s*0/.test(caSeed04)) {
    errors.push('CA-SEED-04 still has a zero-impact dismissal choice');
  }
  if (!c253.includes('s.day>=30') || c253.includes('s.day>=32')) {
    errors.push('C-253 reveal window should open by day 30');
  }
  [
    ['CA4-R002', r002],
    ['CA4-R005', r005],
    ['CA4-CR-01', cr01],
    ['CA4-CR-03', cr03]
  ].forEach(([id, block]) => {
    if (!block.includes('LOG-074-DONE')) errors.push(`${id} should block critically wounded Doyun`);
  });
  [
    ['CA4-R002B', r002b],
    ['CA4-R005B', r005b]
  ].forEach(([id, block]) => {
    if (!block.includes('LOG-074-DONE')) errors.push(`${id} should accept wounded/death absence fallback`);
  });
  if (!read('data-missions-5.js').includes('blockLogs: ["LOG-DOYUN-MINOR-WOUND","LOG-074-DONE","LOG-075"]')) {
    errors.push('SPEC-015 direct dive should block minor wound, critical wound, and death');
  }
  if (!read('data-missions-variants.js').includes("blockLogs: ['LOG-DOYUN-MINOR-WOUND','LOG-074-DONE','LOG-075']")) {
    errors.push('Doyun trust mission variant should block all unavailable Doyun states');
  }
  if (/shouldUseResourceReserve|markResourceReserveUsed|reserveApplied/.test(app)) {
    errors.push('hidden resource reserve still prevents resource depletion');
  }
  [
    'resistance-reward-floor',
    'neutral-reward-resource-floor',
    'act4-neutral-reward-resource-floor',
    'act4-entry-reward-floor'
  ].forEach((kind) => {
    if (balance.includes(kind)) errors.push(`reward-stage soft floor still present: ${kind}`);
  });
  if (/ng\s*>=\s*8[\s\S]*_lift_below\(ns, 'r', 35\)/.test(simulator) || /act\s*==\s*4[\s\S]*ns\[key\]\s*=\s*max\(ns\[key\], floor\)/.test(simulator)) {
    errors.push('simulator_v3 still has legacy broad resource floors');
  }
  if (!read('tools/issue22_audit.js').includes('ending_C_cst dedicated-art mapping missing')) {
    errors.push('issue22 audit still expects old ending_C_cst shared-art state');
  }
}

function main() {
  const errors = [];
  const warnings = [];

  checkEndingCoverage(errors, warnings);
  checkCacheBusting(errors);
  checkResourcePreviewDrift(errors);
  checkLogParameterSignatures(errors);
  checkChainQueueSerialization(errors);
  checkSensitiveReleaseGuards(errors);
  checkIssue33ReleaseGuards(errors);

  if (warnings.length) {
    console.log('[critical-audit] warnings');
    warnings.forEach((w) => console.log(' - ' + w));
  }

  if (errors.length) {
    console.error('[critical-audit] FAIL');
    errors.forEach((e) => console.error(' - ' + e));
    process.exit(1);
  }

  console.log('[critical-audit] OK');
}

main();
