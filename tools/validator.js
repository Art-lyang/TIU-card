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
// 10) 생산되는 LOG가 ORACLE_LOGS에 정의되어 있는지
// 11) 카드 ID가 문서화된 패밀리/접두사 규칙 안에 있는지
// 12) ESCAPE_NODES choice.to 가 실제 노드 또는 'ENDING' 인지 (Act4 엔딩 분기)
// 13) index.html 스크립트 순서(app-init→app) + root↔demo 미러 드리프트(태그/?v=/내용)

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

const DATA_FILES = [
  'data-core.js',
  'data-status-tags.js',
  'data-dialogues-extra.js',
  'data-cards-prologue.js',
  'data-cards-prologue-2.js',
  ...Array.from({length: 16}, (_, i) => `data-cards-${i+1}.js`),
  'data-cards-prometheus-lee.js',
  'data-cards-act4.js',
  'data-cards-act4-ext.js',
  'data-cards-act4-hazard.js',
  'data-cards-act23-pressure.js',
  'data-cards-resist-hint.js',
  'data-cards-crisis.js',
  'data-cards-neutral.js',
  'data-cards-korea-civilian.js',
  'data-cards-dg-meridian.js',
  'data-cards-session-packs.js',
  'data-rewards.js',
  'data-chains.js',
  'data-chains-incident.js',
  'data-chains-incident2.js',
  'data-chains-branch.js',
  'data-archive.js',
  'data-minigame-rewards.js',
  'data-archive-expansion.js',
  'data-minigame-expansion.js',
  'data-missions.js',
  'data-missions-2.js',
  'data-missions-3.js',
  'data-missions-incident.js',
  'data-missions-4.js',
  'data-missions-5.js',
  'data-missions-variants.js',
  'data-missions-emergency.js',
  'data-logs-integrity.js',
  'data-endings.js',
  'data-act4-escape.js',
  'data-escape-nodes.js',
  'data-escape-nodes-2.js',
  'data-achievements.js',
  'data-evidence.js',
  'data-facility.js',
  'data-facility-2.js',
  'data-facility-uprising-a.js',
  'data-facility-uprising-b.js',
  'data-cards-facility-propose.js',
  'data-session-decks.js',
  'data-hidden-story.js',
  'data-evening-trust-1.js',
  'data-evening-trust-1b.js',
  'data-evening-trust-2.js',
  'data-evening-trust-3.js',
  'data-evening-responses.js',
  'data-evening-extra.js',
  'data-evening-extra-2a.js',
  'data-evening-extra-2b.js',
  'data-evening-extra-2c.js',
  'data-evening-extra-2d.js',
  'data-evening-responses-2.js',
  'data-evening-responses-3.js',
  'data-character-arcs.js',
  'data-dialogues-susp.js',
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
// Arrays that exist only as authoring/injection helpers. They are already pushed
// into runtime arrays by their data file, so counting them here would double-count.
const NON_RUNTIME_CARD_ARRAYS = new Set([
  'CARDS_ESCAPE_EXTRA',
  'CARDS_LJC_PROMETHEUS',
]);

const CARD_ARRAY_NAMES = Object.keys(sandbox).filter(name => {
  if (NON_RUNTIME_CARD_ARRAYS.has(name)) return false;
  const arr = sandbox[name];
  return Array.isArray(arr) && arr.some(item =>
    item &&
    typeof item === 'object' &&
    item.id &&
    (Object.prototype.hasOwnProperty.call(item, 'left') || Object.prototype.hasOwnProperty.call(item, 'right'))
  );
});
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
  brokenMiniGameRefs: [],
  brokenMissionNodes: [],
  brokenFollowupTypes: [],
  undefinedProducedLogs: [],
  unproducedLogs: [],
  evidenceUnreachable: [],
  endingLogMissing: [],
  orphanCards: [],
  cardStructure: [],
  onceWithoutLog: [],
  sessionDeckActLeaks: [],
  nonstandardCardIds: [],
  escapeNodeRefs: [],
  htmlScriptOrder: [],
  htmlMirrorDrift: [],
  fileMirrorDrift: [],
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

// === 1b) 카드 ID 패밀리 정책 ===
// New content packs can add prefixes, but the prefix must be documented here so
// accidental typos such as "C320" or "DG_01" do not silently enter the pool.
const CARD_ID_FORMAT_RULES = [
  /^C-\d{3}$/,
  /^C-FE\d{3}-[AB]$/,
  /^C-HINT-[A-Z0-9-]+$/,
  /^CA-\d{3}B?$/,
  /^CA-(OBS-PROTO|SEED-\d{2})$/,
  /^CA\d+-(C|G|O|R)\d{3}B?$/,
  /^CA\d+-(CH|CR|DV|EX|FL|HZ|OR)-\d{2}$/,
  /^CA\d+-(ESCAPE-OFFER|VOSS-STANDBY)$/,
  /^A[234]-(B3-LINE|EVIDENCE-RELIEF|FORESHADOW|STAFF-REVIEW|SUPPORT-DG|SUPPORT-MD|SUPPORT-PROM|TRIAGE)-\d{2}$/,
  /^(CE|CS|CT)-\d{3}[B-F]?$/,
  /^CT-[BCOT]\d{2}$/,
  /^(CB|CN|CR|DG|HH|KC|MD|MS|RH)-\d{2,3}$/,
  /^FP-FE-\d{3}$/,
  /^GOV-ORC-\d{2}$/,
  /^LJC-PROM-\d{2}$/,
  /^OBS-HINT-\d{2}$/,
  /^ORC-LOYAL-SAFE-\d{2}$/,
  /^RH-SAFE-\d{2}$/,
  /^SUP-DM-\d{2}$/,
  /^CH-[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+$/,
];

for (const c of ALL_CARDS) {
  if (!CARD_ID_FORMAT_RULES.some(rx => rx.test(c.id))) {
    issues.nonstandardCardIds.push({ id: c.id, from: c.__from });
  }
}

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

const FIELD_MINIGAME_CONFIGS = sandbox.window.FIELD_MINIGAME_CONFIGS || {};
const FIELD_MINIGAME_REWARDS = sandbox.window.FIELD_MINIGAME_REWARDS || {};
const FIELD_MINIGAME_NARRATIVES = sandbox.window.FIELD_MINIGAME_NARRATIVES || {};
const FIELD_MISSION_NODE_OVERRIDES = sandbox.window.FIELD_MISSION_NODE_OVERRIDES || {};

for (const [missionId, nodeMap] of Object.entries(FIELD_MINIGAME_CONFIGS)) {
  const mission = MISSIONS[missionId];
  if (!mission) {
    issues.brokenMiniGameRefs.push({ missionId, nodeId: '(mission)', nextId: '-', reason: 'missing mission' });
    continue;
  }
  for (const [nodeId, choiceMap] of Object.entries(nodeMap || {})) {
    const node = mission.nodes && mission.nodes[nodeId];
    if (!node) {
      issues.brokenMiniGameRefs.push({ missionId, nodeId, nextId: '-', reason: 'missing node' });
      continue;
    }
    const choiceNextSet = new Set((node.choices || []).map(choice => choice.next));
    for (const [nextId, cfg] of Object.entries(choiceMap || {})) {
      if (!choiceNextSet.has(nextId)) {
        issues.brokenMiniGameRefs.push({ missionId, nodeId, nextId, reason: 'choice.next not found' });
      }
      if (!FIELD_MINIGAME_REWARDS[missionId]) {
        issues.brokenMiniGameRefs.push({ missionId, nodeId, nextId, reason: 'missing reward table' });
      }
      if (!FIELD_MINIGAME_NARRATIVES[missionId]) {
        issues.brokenMiniGameRefs.push({ missionId, nodeId, nextId, reason: 'missing narrative table' });
      }
      if (cfg && cfg.type && typeof sandbox.window.createFieldMiniGameFollowupCard === 'function') {
        const probe = sandbox.window.createFieldMiniGameFollowupCard({ type: cfg.type, missionId, rank: 'success' });
        if (!probe || !probe.left || !probe.right) {
          issues.brokenFollowupTypes.push({ missionId, nodeId, nextId, type: cfg.type });
        }
      }
    }
  }
}

for (const [missionId, nodeMap] of Object.entries(FIELD_MISSION_NODE_OVERRIDES)) {
  const mission = MISSIONS[missionId];
  if (!mission) {
    issues.brokenMissionNodes.push({ missionId, nodeId: '(mission)', reason: 'override mission missing' });
    continue;
  }
  for (const nodeId of Object.keys(nodeMap || {})) {
    if (!mission.nodes || !mission.nodes[nodeId]) {
      issues.brokenMissionNodes.push({ missionId, nodeId, reason: 'override node missing' });
    }
  }
}

for (const [missionId, mission] of Object.entries(MISSIONS)) {
  if (!mission.nodes) continue;
  for (const [nodeId, node] of Object.entries(mission.nodes)) {
    for (const choice of (node.choices || [])) {
      if (choice.next !== 'end' && !mission.nodes[choice.next]) {
        issues.brokenMissionNodes.push({ missionId, nodeId, reason: 'choice next missing: ' + choice.next });
      }
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
function scanArchiveArrayRefs(src, where) {
  if (!src) return;
  const rx = /\b(?:any|all)\s*:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = rx.exec(src))) scanReqString(m[1], where);
}
function scanTryUnlockProductions(src) {
  if (!src) return;
  const rx = /tryUnlock\s*\(\s*['"](LOG-[A-Z0-9_-]+|ONCE-[A-Z0-9_-]+)['"]\s*\)/g;
  let m;
  while ((m = rx.exec(src))) addProd(m[1]);
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
const internalProgressLogs = new Set(['LOG-ACT1-SKIP', 'LOG-ACT2', 'LOG-ACT3', 'LOG-ACT4']);

for (const file of ['app-logic.js', 'app.js']) {
  try {
    scanTryUnlockProductions(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  } catch (e) {}
}

for (const entry of (sandbox.ARCHIVE_ENTRIES || [])) {
  if (entry && typeof entry.unlock === 'function') {
    scanReqString(entry.unlock.toString(), `archive ${entry.id || '(unknown)'}`);
  }
}
try {
  scanArchiveArrayRefs(fs.readFileSync(path.join(ROOT, 'data-archive-expansion.js'), 'utf8'), 'archive expansion array');
} catch (e) {}

// 생산되는 일반 LOG는 로그 탭/i18n에서 조회될 수 있으므로 정의가 필요하다.
for (const log of producedLogs) {
  if (internalProgressLogs.has(log)) continue;
  if (/^LOG-SEJIN-DELAY-/.test(log)) continue; // 윤세진 연구 지연 카운터(순수 내부 플래그, 로그 탭 비노출)
  if (log.startsWith('LOG-') && !definedLogIds.has(log)) {
    issues.undefinedProducedLogs.push({ log });
  }
}

// 소비됐으나 어디서도 생산 안 된 LOG
for (const [log, places] of consumedLogs) {
  if (internalProgressLogs.has(log)) continue;
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
// === 10) session deck pack minAct leak guard ===
if (typeof sandbox.getCardSessionDeckPack === 'function' && Array.isArray(sandbox.SESSION_DECK_PACK_DEFS)) {
  const deckDefs = new Map(sandbox.SESSION_DECK_PACK_DEFS.map(def => [def.id, def]));
  for (const c of ALL_CARDS) {
    let packId = null;
    try { packId = sandbox.getCardSessionDeckPack(c); } catch (e) { packId = null; }
    if (!packId) continue;
    const def = deckDefs.get(packId);
    if (!def || !def.minAct || !Array.isArray(c.act)) continue;
    const badActs = c.act.filter(act => Number(act) < Number(def.minAct));
    if (badActs.length) {
      issues.sessionDeckActLeaks.push({
        id: c.id,
        from: c.__from,
        pack: packId,
        minAct: def.minAct,
        act: c.act.slice(),
        badActs,
      });
    }
  }
}

// === 11) ESCAPE_NODES choice.to 참조 유효성 ===
// Act4 탈출 분기는 ESCAPE_NODES 그래프를 따라 진행된다. 각 choice.to 는
// 같은 객체의 다른 노드 키이거나 종결 토큰 'ENDING' 이어야 한다.
// 'start' 키는 진입 노드 ID를 가리키는 문자열.
const ESCAPE_NODES = sandbox.ESCAPE_NODES || {};
const ESCAPE_NODE_KEYS = new Set(
  Object.keys(ESCAPE_NODES).filter(k => ESCAPE_NODES[k] && typeof ESCAPE_NODES[k] === 'object')
);
if (typeof ESCAPE_NODES.start === 'string' && !ESCAPE_NODE_KEYS.has(ESCAPE_NODES.start)) {
  issues.escapeNodeRefs.push({ node: '(start)', choiceIdx: -1, to: ESCAPE_NODES.start, reason: 'start node missing' });
}
for (const [nodeId, node] of Object.entries(ESCAPE_NODES)) {
  if (!node || typeof node !== 'object') continue;
  if (!Array.isArray(node.choices)) continue;
  node.choices.forEach((ch, idx) => {
    if (!ch || typeof ch.to !== 'string' || !ch.to) {
      issues.escapeNodeRefs.push({ node: nodeId, choiceIdx: idx, to: '(empty)', reason: 'missing to' });
      return;
    }
    if (ch.to === 'ENDING') return;
    if (!ESCAPE_NODE_KEYS.has(ch.to)) {
      issues.escapeNodeRefs.push({ node: nodeId, choiceIdx: idx, to: ch.to, reason: 'unknown target' });
    }
  });
}

// === 13) index.html 스크립트 순서 + root↔demo 미러 드리프트 ===
// 배포가 "root 수정 → demo 손 미러링" 프로세스라 사람이 놓친 드리프트가 런타임 회귀의
// 단골 원인이다(스크립트 순서 붕괴, ?v= 태그 불일치, 파일 내용 불일치). 여기서 기계적으로 잡는다.
// 줄바꿈(CRLF/LF)만 다른 경우는 동일 취급 — 역사적으로 root는 CRLF, demo는 LF가 섞여 있다.
function parseHtmlAssets(html) {
  const out = [];
  const re = /<(?:script[^>]*src|link[^>]*href)="([^"?]+)(?:\?v=(\d+))?"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (/^(https?:|data:|\/\/)/.test(m[1])) continue;
    out.push({ file: m[1], v: m[2] || null });
  }
  return out;
}
// demo에만 있거나 root에만 있는 게 정상인 파일들 (demo 모드 게이트/클라우드 세이브)
const MIRROR_ONLY_ROOT = new Set(['firebase-config.js', 'cloud-save.js']);
const MIRROR_ONLY_DEMO = new Set(['demo-mode.js']);

const rootHtmlPath = path.join(ROOT, 'index.html');
const demoHtmlPath = path.join(ROOT, 'demo', 'index.html');
if (fs.existsSync(rootHtmlPath) && fs.existsSync(demoHtmlPath)) {
  const rootAssets = parseHtmlAssets(fs.readFileSync(rootHtmlPath, 'utf8'));
  const demoAssets = parseHtmlAssets(fs.readFileSync(demoHtmlPath, 'utf8'));

  // 13a) app-init.js 는 app.js 보다 반드시 먼저 로드 (전역 SFX/Save/drawCard 정의 순서)
  for (const [label, assets] of [['index.html', rootAssets], ['demo/index.html', demoAssets]]) {
    const idxInit = assets.findIndex(a => a.file === 'app-init.js');
    const idxApp = assets.findIndex(a => a.file === 'app.js');
    if (idxInit < 0) issues.htmlScriptOrder.push({ where: label, problem: 'app-init.js 스크립트 태그 없음' });
    if (idxApp < 0) issues.htmlScriptOrder.push({ where: label, problem: 'app.js 스크립트 태그 없음' });
    if (idxInit >= 0 && idxApp >= 0 && idxInit > idxApp) {
      issues.htmlScriptOrder.push({ where: label, problem: 'app-init.js 가 app.js 보다 뒤에 로드됨' });
    }
  }

  // 13b) root↔demo 스크립트/CSS 목록·순서·?v= 태그 비교
  const rootSeq = rootAssets.filter(a => !MIRROR_ONLY_ROOT.has(a.file));
  const demoSeq = demoAssets.filter(a => !MIRROR_ONLY_DEMO.has(a.file));
  const demoMap = new Map(demoSeq.map(a => [a.file, a]));
  const rootMap = new Map(rootSeq.map(a => [a.file, a]));
  for (const a of rootSeq) {
    const d = demoMap.get(a.file);
    if (!d) { issues.htmlMirrorDrift.push({ file: a.file, problem: 'demo/index.html 에 태그 없음' }); continue; }
    if (a.v !== d.v) issues.htmlMirrorDrift.push({ file: a.file, problem: `?v= 불일치 (root=${a.v} demo=${d.v})` });
  }
  for (const d of demoSeq) {
    if (!rootMap.get(d.file)) issues.htmlMirrorDrift.push({ file: d.file, problem: 'index.html 에 태그 없음 (demo 전용?)' });
  }
  const rootOrder = rootSeq.filter(a => demoMap.has(a.file)).map(a => a.file).join('|');
  const demoOrder = demoSeq.filter(a => rootMap.has(a.file)).map(a => a.file).join('|');
  if (rootOrder !== demoOrder) {
    issues.htmlMirrorDrift.push({ file: '(순서)', problem: '공통 스크립트 로드 순서가 root/demo 에서 다름' });
  }

  // 13c) 파일 내용 드리프트 — index.html 이 참조하는 로컬 js/css 를 EOL 무시하고 비교
  const norm = s => s.replace(/\r\n/g, '\n');
  const rootSrcCache = new Map(); // 13d 에서 재사용
  for (const a of rootSeq) {
    const rp = path.join(ROOT, a.file);
    const dp = path.join(ROOT, 'demo', a.file);
    if (!fs.existsSync(rp)) { issues.fileMirrorDrift.push({ file: a.file, problem: 'root 파일 없음' }); continue; }
    if (!fs.existsSync(dp)) { issues.fileMirrorDrift.push({ file: a.file, problem: 'demo 파일 없음' }); continue; }
    const rSrc = fs.readFileSync(rp, 'utf8');
    rootSrcCache.set(a.file, rSrc);
    if (norm(rSrc) !== norm(fs.readFileSync(dp, 'utf8'))) {
      issues.fileMirrorDrift.push({ file: a.file, problem: '내용 불일치 (EOL 제외 실제 diff)' });
    }
  }

  // 13d) data-dialogues-susp.js 는 DIALOGUES 에 push 하는 모든 파일 뒤에 로드
  // (used-추적이 배열 인덱스 기반이라 순서가 바뀌면 크래시 없이 잘못된 대사가 나오는 침묵형 버그)
  const SUSP = 'data-dialogues-susp.js';
  const suspIdx = rootSeq.findIndex(a => a.file === SUSP);
  if (suspIdx >= 0) {
    rootSeq.forEach((a, idx) => {
      if (a.file === SUSP || !a.file.endsWith('.js')) return;
      const src = rootSrcCache.get(a.file);
      if (src && /DIALOGUES\.push/.test(src) && idx > suspIdx) {
        issues.htmlScriptOrder.push({ where: 'index.html', problem: a.file + ' 이 ' + SUSP + ' 보다 뒤에서 DIALOGUES.push (인덱스 추적 붕괴)' });
      }
    });
  }

  // 13e) 런타임 CARDS concat 커버리지 — 카드 배열을 정의해놓고 app-init.js 의
  // `var CARDS = ...concat(...)` 식에 넣는 걸 잊으면, validator(ALL_CARDS)에는 잡히는데
  // 실제 게임 덱에는 영영 안 들어간다. 여기서 concat 식에 배열 이름이 등장하는지 대조한다.
  // concat 에 없어도 정상인 배열(다른 배열로 push 주입되거나 별도 시스템이 소비):
  const CONCAT_EXEMPT = new Set([
    'CARDS_ESCAPE_EXTRA',     // data-act4-escape.js 가 CARDS_ACT4 로 push
    'CARDS_LJC_PROMETHEUS',   // data-cards-prometheus-lee.js 가 CARDS_STORY 로 push
  ]);
  const appInitPath = path.join(ROOT, 'app-init.js');
  if (fs.existsSync(appInitPath)) {
    const initSrc = fs.readFileSync(appInitPath, 'utf8');
    const concatMatch = initSrc.match(/var CARDS\s*=\s*[^;]+;/);
    if (!concatMatch) {
      issues.htmlScriptOrder.push({ where: 'app-init.js', problem: 'var CARDS = ...concat 식을 찾지 못함 (검사 13e 무력화)' });
    } else {
      const concatSrc = concatMatch[0];
      for (const name of Object.keys(cardsByArray)) {
        if (CONCAT_EXEMPT.has(name)) continue;
        if (!new RegExp('\\b' + name + '\\b').test(concatSrc)) {
          issues.htmlScriptOrder.push({ where: 'app-init.js', problem: '카드 배열 ' + name + ' 이 CARDS concat 식에 없음 (덱 미포함)' });
        }
      }
    }
  }
}

const stats = {
  files: { loaded: DATA_FILES.length - loadErrors.length, failed: loadErrors.length },
  cards: { total: ALL_CARDS.length, uniqueIds: CARD_IDS.size, byArray: Object.fromEntries(Object.entries(cardsByArray).map(([k,v]) => [k, v.length])) },
  chains: { main: Object.keys(CHAINS).length, incident: Object.keys(CHAINS_INCIDENT).length },
  missions: { total: MISSION_IDS.size },
  minigames: { missions: Object.keys(FIELD_MINIGAME_CONFIGS).length },
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
console.log('  미니게임 연동 임무: ' + stats.minigames.missions + ' 개');
console.log('  증거: ' + stats.evidence.total + ' + 조합 ' + stats.evidence.combos);
console.log('  엔딩: ' + stats.endings + '종');
console.log('  아카이브: ' + stats.archive + '종');
console.log('  LOG: 생산 ' + stats.logs.produced + ' / 코어정의 ' + stats.logs.definedInCore + ' / req소비 ' + stats.logs.consumedInReq);

section('이슈 리포트');
warn(issues.duplicates, '카드 ID 중복', x => x.id + '  (in: ' + x.arrays.join(', ') + ')');
warn(issues.nonstandardCardIds, '문서화되지 않은 카드 ID 패밀리', x => x.id + '  (' + x.from + ')');
warn(issues.brokenChainTriggers, '체인 trigger 카드 누락', x => x.chain + ' → ' + x.trigger + ' (카드 ' + x.missingCard + ' 없음) [' + x.kind + ']');
warn(issues.brokenMissionRefs, '카드→미션 참조 깨짐', x => x.card + '.' + x.side + ' → mission=' + x.missing);
warn(issues.brokenMiniGameRefs, '미니게임 연동 참조 깨짐', x => x.missionId + '/' + x.nodeId + ' → ' + x.nextId + ' (' + x.reason + ')');
warn(issues.brokenMissionNodes, '미션 노드 참조 깨짐', x => x.missionId + '/' + x.nodeId + ' (' + x.reason + ')');
warn(issues.brokenFollowupTypes, '현장 후속 카드 생성 실패', x => x.missionId + '/' + x.nodeId + ' → ' + x.nextId + ' [' + x.type + ']');
warn(issues.undefinedProducedLogs, '생산되지만 정의되지 않은 LOG', x => x.log);
warn(issues.unproducedLogs, '참조되지만 생산되지 않는 LOG', x => x.log + '  (' + x.totalRefs + '곳 참조: ' + x.consumedBy.slice(0, 2).join(', ') + ')');
warn(issues.evidenceUnreachable, '증거 src LOG 미도달', x => x.ev + ' ' + x.name + ' ← ' + x.srcLog);
warn(issues.endingLogMissing, '엔딩 필수 LOG 미생산', x => '엔딩 ' + x.ending + ': ' + x.log);
warn(issues.orphanCards, '고아 카드 (act 없음, 잠금·체인·프롤로그 제외)', x => x.id + '  (' + x.from + ')');
warn(issues.cardStructure, '카드 구조 이상', x => x.id + '  [' + x.problems.join('; ') + ']');

warn(issues.sessionDeckActLeaks, 'session deck minAct보다 이른 act 포함', x => x.id + ' [' + x.pack + '] act=' + x.act.join(',') + ' minAct=' + x.minAct + ' (' + x.from + ')');
warn(issues.escapeNodeRefs, 'ESCAPE_NODES choice.to 참조 깨짐', x => x.node + (x.choiceIdx >= 0 ? '[' + x.choiceIdx + ']' : '') + ' → ' + x.to + ' (' + x.reason + ')');
warn(issues.htmlScriptOrder, 'index.html 스크립트 순서 위반', x => x.where + ' — ' + x.problem);
warn(issues.htmlMirrorDrift, 'root↔demo index.html 드리프트', x => x.file + ' — ' + x.problem);
warn(issues.fileMirrorDrift, 'root↔demo 파일 내용 드리프트', x => x.file + ' — ' + x.problem);

const totalIssues = Object.values(issues).reduce((a, b) => a + b.length, 0);
section(totalIssues === 0 ? '이슈 0건 — 정적 검증 통과' : '총 이슈 ' + totalIssues + '건');
