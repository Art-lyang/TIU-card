// Session deck packs keep optional story clusters varied between replays.
// Core progression, evidence unlock, normal facility expansion, rewards, and missions stay outside this filter.
var SESSION_DECK_PACK_DEFS = [
  { id: "DG_MERIDIAN", label: "DG / Meridian external faction", weight: 2 },
  { id: "B3_PREDECESSOR", label: "B3 / predecessor commander line", weight: 2 },
  { id: "PROMETHEUS_TENSION", label: "Prometheus contact tension", weight: 2 },
  { id: "UPRISING_INFRA", label: "closed-circuit facility route", weight: 1 },
  { id: "MUTANT_SURGE", label: "variant over-encounter pressure", weight: 2 },
  { id: "GOV_ORACLE_SUSPICION", label: "government / ORACLE branch suspicion", weight: 2 }
];
var SESSION_DECK_EXPANSION_CANDIDATES = [];
var SESSION_DECK_VERSION = 2;
var SESSION_DECK_PICK_COUNT = 4;
var ACTIVE_SESSION_DECK = null;

var SESSION_DECK_MUTANT_SURGE_IDS = {
  "C-030": true, "C-031": true, "C-045": true, "C-047": true, "C-066": true,
  "C-175": true, "CE-021": true, "CE-025": true, "CE-036": true,
  "C-271": true, "C-272": true, "C-273": true, "C-274": true, "C-275": true
};
var SESSION_DECK_GOV_ORACLE_IDS = {};

function _sessionDeckStoreGet() {
  try {
    var raw = localStorage.getItem("ts_sessionDeck");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function _sessionDeckStoreSet(deck) {
  try {
    if (deck) localStorage.setItem("ts_sessionDeck", JSON.stringify(deck));
    else localStorage.removeItem("ts_sessionDeck");
  } catch (e) {}
}

function _sessionDeckDefMap() {
  var map = {};
  for (var i = 0; i < SESSION_DECK_PACK_DEFS.length; i++) {
    map[SESSION_DECK_PACK_DEFS[i].id] = SESSION_DECK_PACK_DEFS[i];
  }
  return map;
}

function _sessionDeckTargetCount(deck) {
  var desired = Math.max(1, Math.min(SESSION_DECK_PICK_COUNT, SESSION_DECK_PACK_DEFS.length));
  if (deck && deck.version && deck.version < 2 && Array.isArray(deck.packs) && deck.packs.length >= 3) return Math.min(3, desired);
  if (deck && deck.pickCount) return Math.max(1, Math.min(Number(deck.pickCount) || desired, desired, SESSION_DECK_PACK_DEFS.length));
  return desired;
}

function normalizeSessionDeck(deck) {
  if (!deck || !Array.isArray(deck.packs)) return null;
  var defs = _sessionDeckDefMap();
  var targetCount = _sessionDeckTargetCount(deck);
  var seen = {};
  var packs = [];
  for (var i = 0; i < deck.packs.length; i++) {
    var id = String(deck.packs[i] || "");
    if (defs[id] && !seen[id]) {
      packs.push(id);
      seen[id] = true;
    }
  }
  for (var j = 0; packs.length < targetCount && j < SESSION_DECK_PACK_DEFS.length; j++) {
    var fillId = SESSION_DECK_PACK_DEFS[j].id;
    if (!seen[fillId]) {
      packs.push(fillId);
      seen[fillId] = true;
    }
  }
  if (packs.length > targetCount) packs = packs.slice(0, targetCount);
  if (packs.length === 0) return null;
  return {
    version: SESSION_DECK_VERSION,
    seed: deck.seed || Date.now(),
    pickCount: targetCount,
    packs: packs,
    labels: packs.map(function(id) { return defs[id].label; }),
    createdAt: deck.createdAt || Date.now()
  };
}

function setActiveSessionDeck(deck) {
  ACTIVE_SESSION_DECK = normalizeSessionDeck(deck);
  _sessionDeckStoreSet(ACTIVE_SESSION_DECK);
  if (typeof window !== "undefined") window.ACTIVE_SESSION_DECK = ACTIVE_SESSION_DECK;
  return ACTIVE_SESSION_DECK;
}

function clearSessionDeck() {
  ACTIVE_SESSION_DECK = null;
  _sessionDeckStoreSet(null);
  if (typeof window !== "undefined") window.ACTIVE_SESSION_DECK = null;
}

function loadSessionDeck() {
  if (ACTIVE_SESSION_DECK) return ACTIVE_SESSION_DECK;
  return setActiveSessionDeck(_sessionDeckStoreGet());
}

function _sessionDeckNextSeed(seed) {
  return (seed * 1664525 + 1013904223) >>> 0;
}

function _sessionDeckPickWeighted(seed, count) {
  var pool = SESSION_DECK_PACK_DEFS.map(function(def) {
    return { id: def.id, weight: def.weight || 1 };
  });
  var packs = [];
  var cursor = seed >>> 0;
  while (pool.length > 0 && packs.length < count) {
    cursor = _sessionDeckNextSeed(cursor);
    var total = 0;
    for (var i = 0; i < pool.length; i++) total += pool[i].weight;
    var roll = (cursor / 4294967296) * total;
    var acc = 0;
    for (var j = 0; j < pool.length; j++) {
      acc += pool[j].weight;
      if (roll <= acc) {
        packs.push(pool[j].id);
        pool.splice(j, 1);
        break;
      }
    }
  }
  return packs;
}

function initSessionDeck(sessionCount) {
  var count = _sessionDeckTargetCount();
  var seed = (Date.now() + Math.floor(Math.random() * 1000000) + ((sessionCount || 0) * 1009)) >>> 0;
  return setActiveSessionDeck({
    version: SESSION_DECK_VERSION,
    seed: seed,
    pickCount: count,
    packs: _sessionDeckPickWeighted(seed, count),
    createdAt: Date.now()
  });
}

function getActiveSessionDeck() {
  return ACTIVE_SESSION_DECK || loadSessionDeck();
}

function hasSessionDeckPack(packId) {
  var deck = getActiveSessionDeck();
  return !!(deck && deck.packs && deck.packs.indexOf(packId) >= 0);
}

function _sessionDeckIsUprisingFacility(feId) {
  if (!feId || typeof FACILITY_EXPANSIONS === "undefined") return false;
  for (var i = 0; i < FACILITY_EXPANSIONS.length; i++) {
    if (FACILITY_EXPANSIONS[i] && FACILITY_EXPANSIONS[i].id === feId) {
      return !!FACILITY_EXPANSIONS[i].uprising;
    }
  }
  return false;
}

function getCardSessionDeckPack(card) {
  if (!card) return null;
  if (card.sessionPack) return card.sessionPack;
  if (card.deckPack) return card.deckPack;
  var id = String(card.id || "");
  var tag = String(card.tag || "").toLowerCase();

  if (SESSION_DECK_MUTANT_SURGE_IDS[id] || tag === "mutant-surge") return "MUTANT_SURGE";
  if (SESSION_DECK_GOV_ORACLE_IDS[id] || tag === "gov-oracle-suspicion") return "GOV_ORACLE_SUSPICION";

  if (card.isFacilityProposal && _sessionDeckIsUprisingFacility(card.feId)) return "UPRISING_INFRA";
  if (card.feReq && _sessionDeckIsUprisingFacility(card.feReq)) return "UPRISING_INFRA";
  if (tag === "uprising-hint" || id.indexOf("HH-") === 0) return "UPRISING_INFRA";

  if (
    id === "A2-FORESHADOW-01" ||
    id === "A2-FORESHADOW-02" ||
    id === "A2-TRIAGE-01" ||
    id.indexOf("CA-SEED-") === 0 ||
    /^C-32[0-5]$/.test(id) ||
    tag.indexOf("b3") >= 0 ||
    tag.indexOf("predecessor") >= 0
  ) return "B3_PREDECESSOR";

  if (
    id.indexOf("DG-") === 0 ||
    id.indexOf("MD-") === 0 ||
    id.indexOf("SUP-DM-") === 0 ||
    id.indexOf("CA23-DV-") === 0 ||
    id.indexOf("CH-DG-") === 0 ||
    id.indexOf("CH-MD-") === 0 ||
    id.indexOf("CH-SUP-") === 0 ||
    tag.indexOf("dg") >= 0 ||
    tag.indexOf("meridian") >= 0
  ) return "DG_MERIDIAN";

  if (id.indexOf("LJC-PROM-") === 0 || tag === "prometheus-lee" || tag === "midgame-prom") return "PROMETHEUS_TENSION";

  return null;
}

function _sessionDeckHasAnyLog(logs, prefixes) {
  if (!Array.isArray(logs)) return false;
  for (var i = 0; i < logs.length; i++) {
    var logId = String(logs[i] || "");
    for (var j = 0; j < prefixes.length; j++) {
      if (logId.indexOf(prefixes[j]) === 0) return true;
    }
  }
  return false;
}

function _sessionDeckLogFallback(packId, logs) {
  if (packId === "DG_MERIDIAN") return _sessionDeckHasAnyLog(logs, ["LOG-DG", "LOG-MD", "LOG-DV", "LOG-SUPPLY-DG", "LOG-SUPPLY-MD"]);
  if (packId === "B3_PREDECESSOR") return _sessionDeckHasAnyLog(logs, ["LOG-090", "LOG-091", "LOG-092", "LOG-093", "LOG-CHAR-", "LOG-A2-FORESHADOW", "LOG-A2-TRIAGE"]);
  if (packId === "PROMETHEUS_TENSION") return _sessionDeckHasAnyLog(logs, ["LOG-LJC-PROM", "LOG-PROM"]);
  if (packId === "UPRISING_INFRA") return _sessionDeckHasAnyLog(logs, ["LOG-UPRISING"]);
  if (packId === "MUTANT_SURGE") return _sessionDeckHasAnyLog(logs, ["LOG-MS-"]);
  if (packId === "GOV_ORACLE_SUSPICION") return _sessionDeckHasAnyLog(logs, ["LOG-GOV-"]);
  return false;
}

function getEveningSessionDeckPack(chat) {
  if (!chat) return null;
  if (chat.sessionPack) return chat.sessionPack;
  var key = String(chat.responseKey || "");
  var ch = String(chat.char || "");
  if (
    key === "haeun_3_20-24" ||
    key === "jaehyuk_3_19-23" ||
    key.indexOf("_axis_") >= 0
  ) return "B3_PREDECESSOR";
  if (key === "jaehyuk_2_18-30") return "UPRISING_INFRA";
  if (
    key.indexOf("weber_") === 0 ||
    key.indexOf("foster_") === 0 ||
    ch.indexOf("베버") >= 0 ||
    ch.indexOf("포스터") >= 0 ||
    ch.toLowerCase().indexOf("weber") >= 0 ||
    ch.toLowerCase().indexOf("foster") >= 0
  ) return "PROMETHEUS_TENSION";
  return null;
}

function sessionDeckEveningOk(chat, ctx) {
  var packId = getEveningSessionDeckPack(chat);
  if (!packId) return true;
  var deck = getActiveSessionDeck();
  if (!deck || !deck.packs || deck.packs.length === 0) return true;
  if (deck.packs.indexOf(packId) >= 0) return true;
  return _sessionDeckLogFallback(packId, ctx && ctx.logs);
}

function sessionDeckOk(card, stats, gi, logs, act, facility) {
  var packId = getCardSessionDeckPack(card);
  if (!packId) return true;
  var deck = getActiveSessionDeck();
  if (!deck || !deck.packs || deck.packs.length === 0) return true;
  if (deck.packs.indexOf(packId) >= 0) return true;
  return _sessionDeckLogFallback(packId, logs);
}
