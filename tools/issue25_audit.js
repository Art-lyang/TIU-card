// Issue #25 follow-up audit.
// Run with: node tools/issue25_audit.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function fail(errors, message) {
  errors.push(message);
}

function ids(file) {
  const src = read(file);
  const out = [];
  const re = /^[ \t]*["']([^"']+)["'][ \t]*:\s*\{/gm;
  let m;
  while ((m = re.exec(src))) out.push(m[1]);
  return out;
}

const errors = [];
const cards6 = read('data-cards-6.js');
const cards7 = read('data-cards-7.js');
const init = read('app-init.js');
const sideEn = read('lang-cards-side-en.js');
const flowEn = read('lang-cards-flow-en.js');
const app = read('app.js');
const missions = read('data-missions.js');

if (!cards6.includes('Act 2 일상 카드') || !cards6.includes('var CARDS_ACT2_DAILY')) {
  fail(errors, 'data-cards-6.js should be labeled and exported as Act 2 daily cards');
}
if (!cards7.includes('Act 3 일상 카드') || !cards7.includes('var CARDS_ACT3_DAILY')) {
  fail(errors, 'data-cards-7.js should be labeled and exported as Act 3 daily cards');
}
if (!init.includes('CARDS_ACT2_DAILY') || !init.includes('CARDS_ACT3_DAILY') || init.includes('CARDS_ACT1_DAILY')) {
  fail(errors, 'app-init.js should load Act 2/3 daily arrays by their actual act ownership');
}
if (!read('data-cards-11.js').includes('C-187 is intentionally unused')) {
  fail(errors, 'C-187 intentional gap comment missing');
}

const dup = ids('lang-cards-side-en.js').filter((id) => ids('lang-cards-flow-en.js').includes(id));
if (dup.length) fail(errors, `lang-cards-side-en.js duplicates flow overlays: ${dup.join(', ')}`);

['bg_command', 'bg_seoul_a', 'bg_seoul_b', 'corridor'].forEach((key) => {
  if (!read('components-game.js').includes(key)) fail(errors, `bg image map missing ${key}`);
});

if (!read('data-escape-nodes-2.js').includes('ESCAPE_NODES_EN')) {
  fail(errors, 'escape nodes should define English overlays');
}
if (!read('components-escape.js').includes('localizeEscapeNode') || !read('components-escape.js').includes('DECISION ')) {
  fail(errors, 'escape component should localize node copy and decision timer');
}

if (/oracle:\s*\{[\s\S]*?log:\s*["']LOG-005["']/.test(missions)) {
  fail(errors, 'M-001 ORACLE remote-analysis branch should not unlock full SPEC-012 observation LOG-005');
}
if (!missions.includes('LOG-M001-REMOTE') || !read('data-logs-integrity.js').includes('LOG-M001-REMOTE') || !sideEn.includes('LOG-M001-REMOTE')) {
  fail(errors, 'LOG-M001-REMOTE should be produced, defined, and translated');
}

['ch.log', 'o.log', 'c.log'].forEach((needle) => {
  const pattern = new RegExp(`${needle.replace('.', '\\\\.')}\\)\\)`);
  if (!app.includes(`Array.isArray(${needle})`)) {
    fail(errors, `app.js should handle array logs for ${needle}`);
  }
});

if (/dayMax:\s*39/.test(read('data-core.js'))) {
  fail(errors, 'Act 4 evening chats should not retain unreachable dayMax 39 ranges');
}

if (errors.length) {
  console.error('[issue25_audit] FAIL');
  errors.forEach((e) => console.error(' - ' + e));
  process.exit(1);
}

console.log('[issue25_audit] OK');
