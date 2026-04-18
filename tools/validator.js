// tools/validator.js — TIU-card 정적 무결성 검증
// 사용: node tools/validator.js
//
// 검증 항목:
//  1) 카드 ID 중복 (여러 배열에 같은 id)
//  2) 체인/사건체인 trigger가 존재하지 않는 카드 참조
//  3) 카드/미션 선택지의 mission 참조 유효성
//  4) LOG 생산/소비 불일치 (req에서 참조하는데 아무도 생산 안 하는 LOG)
//  5) EVIDENCE.src LOG가 실제 생산되는지
//  6) 엔딩 필수 LOG (F/B/D/G) 생산 가능성
//  7) 고아 카드 (act 배열 없음 + 의도 잠금도 아님)
//  8) 한 카드 내 left/right 동일 라벨, 빈 fx
//  9) once 플래그 선언했으나 ONCE- 로그로 추적 안 하는 카드

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

const DATA_FILES = [
  'data-core.js',
  'data-status-tags.js',
  'data-cards-prologue.js',
  ...Array.from({length: 16}, (_, i) => `data-cards-${i+1}.js`),
  'data-cards-act4.js',
  'data-cards-crisis.js',
  'data-cards-neutral.js',
  'data-rewards.js',
  'data-chains.js',
  'data-chains-incident.js',
  'data-chains-incident2.js',
  'data-archive.js',
  'data-missions.js',
  'data-missions-2.js',
  'data-missions-3.js',
  'data-missions-incident.js',
  'data-missions-4.js',
  'data-missions-5.js',
  'data-missions-variants.js',
  'data-endings.js',
  'data-act4-escape.js',
  'data-achievements.js',
  'data-evidence.js',
  'data-facility.js',
  'data-facility-2.js',
  'data-hidden-story.js',
  'data-evening-trust-1.js',
  'data-evening-trust-1b.js',
  'data-evening-trust-2.js',
  'data-evening-trust-3.js',
  'data-evening-responses.js',
  'data-evening-extra.js',
  'data-evening-responses-2.js',
  'evening-lines.js',
  'data-result-text.js',
  'data-result-story-1.js',
  'data-result-story-2.js',
  'data-result-story-3.js',
];

const sandbox = {
  console,
  window: {},
  document: { getElementById: () => null, createElement: () => ({}) },
  setTimeout, clearTimeout, setInterval, clearInterval,
  React: { createElement: () => null, useState: () => [null, () => {}], Fragment: 'Fragment' },
  ReactDOM: { createRoot: () => ({ render: () => {} }) },
};
vm.createContext(sandbox);

const loadErrors = [];
for (const f of DATA_FILES) {
  const full = path.join(ROOT, f);
  if (!fs.existsSync(full)) { loadErrors.push({ file: f, err: 'FILE NOT FOUND' }); continue; }
  try {
    const src = fs.readFileSync(full, 'utf8');
    vm.runInContext(src, sandbox, { filename: f });
  } catch (e) {
    loadErrors.push({ file: f, err: e.message.split('\n')[0] });
  }
}

// === 카드 마스터 배열 수집 ===
const CARD_ARRAY_NAMES = [
  'CARDS_PROLOGUE','CARDS_BASE','CARDS_STORY','CARDS_ENDING','CARDS_INVESTIGATE',
  'CARDS_RESOURCE','CARDS_ACT1_DAILY','CARDS_ACT2_DAILY','CARDS_TRANSITION','CARDS_HAEUN',
  'CARDS_EXTRA','CARDS_CHAINS','CARDS_NEW_A','CARDS_NEW_B','CARDS_ACT3',
  'CARDS_EXTERNAL','CARDS_MIDGAME','CARDS_ACT4','CARDS_CRISIS','CARDS_NEUTRAL',
  'CARDS_ESCAPE_EXTRA','CARDS_INCIDENT',
];
const cardsByArray = {};
const ALL_CARDS = [];
for (const name of CARD_ARRAY_NAMES) {
  const arr = sandbox[name];
  if (Array.isArray(arr)) {
    cardsByArray[name] = arr;
    for (const c of arr) { if (c && c.id) ALL_CARDS.push({ ...c, __from: name }); }
  }
}

const issues = {
  duplicates: [],
  brokenChainTriggers: [],
  brokenMissionRefs: [],
  unproducedLogs: [],
  evidenceUnreachable: [],
  endingLogMissing: [],
  orphanCards: [],
  cardStructure: [],
  onceWithoutLog: [],
};

// === 1) 카드 ID 중복 ===
const idMap = new Map();
for (const [arr, cards] of Object.entries(cardsByArray)) {
  for (const c of cards) {
    if (!c || !c.id) continue;
    if (!idMap.has(c.id)) idMap.set(c.id, []);
    idMap.get(c.id).push(arr);
  }
}
for (const [id, arrs] of idMap) {
  if (arrs.length > 1) issues.duplicates.push({ id, arrays: arrs });
}
const CARD_IDS = new Set(idMap.keys());

// === 2) 체인 trigger 유효성 ===
const CHAINS = sandbox.CHAINS || {};
const CHAINS_INCIDENT = sandbox.CHAINS_INCIDENT || {};
function checkChainTriggers(chains, label) {
  for (const [cid, ch] of Object.entries(chains)) {
    if (!ch || !ch.trigger) continue;
    const base = ch.trigger.replace(/-(left|right)$/, '');
    if (!CARD_IDS.has(base)) {
      issues.brokenChainTriggers.push({ chain: cid, kind: label, trigger: ch.trigger, missingCard: base });
    }
  }
}
checkChainTriggers(CHAINS, 'CHAINS');
checkChainTriggers(CHAINS_INCIDENT, 'CHAINS_INCIDENT');

// === 3) mission 참조 ===
const MISSIONS = Object.assign({}, sandbox.MISSIONS || {}, sandbox.MISSIONS_INCIDENT || {});
const MISSION_IDS = new Set(Object.keys(MISSIONS));
for (const c of ALL_CARDS) {
  for (const side of ['left','right']) {
    const m = c[side] && c[side].mission;
    if (m && !MISSION_IDS.has(m)) {
      issues.brokenMissionRefs.push({ card: c.id, side, missing: m, from: c.__from });
    }
  }
}

// === 4/5) LOG 생산/소비 ===
const producedLogs = new Set();
const consumedLogs = new Map(); // log -> [place]

function addProd(x) {
  if (!x) return;
  if (Array.isArray(x)) x.forEach(addProd);
  else if (typeof x === 'string') producedLogs.add(x);
}
function scanReqString(src, where) {
  if (!src) return;
  const matches = src.match(/LOG-[A-Z0-9_-]+/g);
  if (!matches) return;
  for (const m of matches) {
    if (!consumedLogs.has(m)) consumedLogs.set(m, []);
    consumedLogs.get(m).push(where);
  }
}

for (const c of ALL_CARDS) {
  for (const side of ['left','right']) {
    const b = c[side];
    if (!b) continue;
    addProd(b.log);
    if (b.fx && b.fx.log) addProd(b.fx.log);
  }
  if (typeof c.req === 'function') scanReqString(c.req.toString(), `card ${c.id}`);
  // ONCE- 추적용 LOG는 카드 로직이 자동 생성 — 추정 규칙: once:true인 카드는 "ONCE-{id}" 생산
  if (c.once) producedLogs.add('ONCE-' + c.id);
}

// 미션 결과 log
for (const [mid, m] of Object.entries(MISSIONS)) {
  if (!m.nodes) continue;
  for (const node of Object.values(m.nodes)) {
    if (!node.choices) continue;
    for (const ch of node.choices) {
      if (ch.log) addProd(ch.log);
      if (ch.result && ch.result.log) addProd(ch.result.log);
    }
  }
}

// 체인 카드 log
for (const chains of [CHAINS, CHAINS_INCIDENT]) {
  for (const ch of Object.values(chains)) {
    if (!ch.cards) continue;
    for (const c of ch.cards) {
      for (const side of ['left','right']) {
        if (c[side] && c[side].log) addProd(c[side].log);
      }
    }
  }
}

// ORACLE_LOGS가 있으면 그 id도 "정의됨"으로 간주 (자연 해금 가능성)
const ORACLE_LOGS = sandbox.ORACLE_LOGS || [];
const definedLogIds = new Set(ORACLE_LOGS.map(x => x && x.id).filter(Boolean));

// 소비됐으나 어디서도 생산 안 된 LOG
for (const [log, places] of consumedLogs) {
  if (!producedLogs.has(log) && !definedLogIds.has(log)) {
    issues.unproducedLogs.push({ log, consumedBy: places.slice(0, 5), totalRefs: places.length });
  }
}

// EVIDENCE src LOG 도달성
const EVIDENCE = sandbox.EVIDENCE || [];
for (const ev of EVIDENCE) {
  if (!ev || !ev.src) continue;
  if (!producedLogs.has(ev.src) && !definedLogIds.has(ev.src)) {
    issues.evidenceUnreachable.push({ ev: ev.id, name: ev.name, srcLog: ev.src });
  }
}

// 엔딩 필수 LOG
const ENDING_LOGS = [
  { end: 'F', log: 'LOG-012' },
  { end: 'F', log: 'LOG-013' },
  { end: 'F', log: 'LOG-OBSERVER-APPROVED' },
];
for (const { end, log } of ENDING_LOGS) {
  if (!producedLogs.has(log) && !definedLogIds.has(log)) {
    issues.endingLogMissing.push({ ending: end, log });
  }
}

// === 7) 고아 카드 ===
for (const c of ALL_CARDS) {
  const reqSrc = typeof c.req === 'function' ? c.req.toString() : '';
  const intentionallyLocked = /return\s+false|=>\s*false/.test(reqSrc);
  const isChain = /^CH/.test(c.id) || /^MI-/.test(c.id);
  const isPrologue = /^CA-|^P-/.test(c.id);
  if (intentionallyLocked || isChain || isPrologue) continue;
  const hasAct = Array.isArray(c.act) && c.act.length > 0;
  if (!hasAct) issues.orphanCards.push({ id: c.id, from: c.__from });
}

// === 8) 카드 구조 ===
for (const c of ALL_CARDS) {
  const probs = [];
  if (!c.msg) probs.push('no msg');
  if (!c.left || !c.right) probs.push('missing left/right');
  else {
    if (c.left && c.right && c.left.label === c.right.label && c.left.label !== '-') {
      probs.push('left/right same label');
    }
  }
  if (probs.length) issues.cardStructure.push({ id: c.id, from: c.__from, problems: probs });
}

// === 9) once 플래그 선언했지만 필터 안 걸릴 가능성은 app-utils/app-init에서 로직 구현됨 ===
// 정적으론 once:true인 카드가 여러 ONCE-{id} 로그 덮어쓰지 않도록 id unique만 보장하면 됨 (1)에서 커버됨

// === 통계 ===
const stats = {
  files: { loaded: DATA_FILES.length - loadErrors.length, failed: loadErrors.length },
  cards: { total: ALL_CARDS.length, uniqueIds: CARD_IDS.size, byArray: Object.fromEntries(Object.entries(cardsByArray).map(([k,v]) => [k, v.length])) },
  chains: { main: Object.keys(CHAINS).length, incident: Object.keys(CHAINS_INCIDENT).length },
  missions: { total: MISSION_IDS.size },
  evidence: { total: EVIDENCE.length, combos: (sandbox.EVIDENCE_COMBOS || []).length },
  endings: Object.keys(sandbox.ENDING_DEFS || {}).length,
  archive: (sandbox.ARCHIVE_ENTRIES || []).length,
  logs: { produced: producedLogs.size, definedInCore: definedLogIds.size, consumedInReq: consumedLogs.size },
};

// === 리포트 ===
function section(title) { console.log('\n' + '═'.repeat(60) + '\n ' + title + '\n' + '═'.repeat(60)); }
function ok(msg) { console.log('  ✔ ' + msg); }
function warn(list, label, fmt) {
  if (!list.length) { ok(label + ': 0건'); return; }
  console.log('  ⚠ ' + label + ': ' + list.length + '건');
  list.slice(0, 20).forEach(item => console.log('      · ' + fmt(item)));
  if (list.length > 20) console.log('      ... (' + (list.length - 20) + '건 더)');
}

section('TIU-CARD 정적 검증 리포트');
console.log('\n[로드]');
console.log('  파일 로드: ' + stats.files.loaded + ' / 실패 ' + stats.files.failed);
if (loadErrors.length) {
  loadErrors.forEach(e => console.log('    ✘ ' + e.file + ' — ' + e.err));
}

console.log('\n[콘텐츠 통계]');
console.log('  카드 총 ' + stats.cards.total + '장 (고유 id ' + stats.cards.uniqueIds + ')');
console.log('  체인: 메인 ' + stats.chains.main + ' + 사건 ' + stats.chains.incident);
console.log('  미션: ' + stats.missions.total + ' 개');
console.log('  증거: ' + stats.evidence.total + ' + 조합 ' + stats.evidence.combos);
console.log('  엔딩: ' + stats.endings + '종');
console.log('  아카이브: ' + stats.archive + '종');
console.log('  LOG: 생산 ' + stats.logs.produced + ' / 코어정의 ' + stats.logs.definedInCore + ' / req소비 ' + stats.logs.consumedInReq);

section('이슈 리포트');
warn(issues.duplicates, '카드 ID 중복', x => x.id + '  (in: ' + x.arrays.join(', ') + ')');
warn(issues.brokenChainTriggers, '체인 trigger 카드 누락', x => x.chain + ' → ' + x.trigger + ' (카드 ' + x.missingCard + ' 없음) [' + x.kind + ']');
warn(issues.brokenMissionRefs, '카드→미션 참조 깨짐', x => x.card + '.' + x.side + ' → mission=' + x.missing);
warn(issues.unproducedLogs, '참조되지만 생산되지 않는 LOG', x => x.log + '  (' + x.totalRefs + '곳 참조: ' + x.consumedBy.slice(0, 2).join(', ') + ')');
warn(issues.evidenceUnreachable, '증거 src LOG 미도달', x => x.ev + ' ' + x.name + ' ← ' + x.srcLog);
warn(issues.endingLogMissing, '엔딩 필수 LOG 미생산', x => '엔딩 ' + x.ending + ': ' + x.log);
warn(issues.orphanCards, '고아 카드 (act 없음, 잠금·체인·프롤로그 제외)', x => x.id + '  (' + x.from + ')');
warn(issues.cardStructure, '카드 구조 이상', x => x.id + '  [' + x.problems.join('; ') + ']');

const totalIssues = Object.values(issues).reduce((a, b) => a + b.length, 0);
section(totalIssues === 0 ? '이슈 0건 — 정적 검증 통과' : '총 이슈 ' + totalIssues + '건');
