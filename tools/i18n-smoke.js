// Lightweight i18n smoke check for TIU.
// Runs without external packages: `node tools/i18n-smoke.js`
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HANGUL_RE = /[\uac00-\ud7a3]/;
const MOJIBAKE_RE = /\ufffd|[?]{2,}/;

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function createSandbox(locale) {
  const sandbox = {
    console,
    window: {},
    document: { documentElement: { lang: '', setAttribute() {} } },
    localStorage: {
      getItem(key) { return key === 'ts_locale' ? locale : null; },
      setItem() {}
    },
    CustomEvent: function CustomEvent(type, init) { return { type, detail: init && init.detail }; }
  };
  sandbox.window = sandbox;
  sandbox.global = sandbox;
  return vm.createContext(sandbox);
}

function runFile(ctx, rel) {
  vm.runInContext(read(rel), ctx, { filename: rel });
}

function boot(locale) {
  const ctx = createSandbox(locale);
  runFile(ctx, 'i18n-runtime.js');
  runFile(ctx, 'lang-ui-ko.js');
  runFile(ctx, 'lang-ui-en.js');
  runFile(ctx, 'lang-content-en-all.js');
  runFile(ctx, 'lang-evidence-hidden-en.js');
  runFile(ctx, 'lang-archive-en.js');
  runFile(ctx, 'lang-content-en-dialogues.js');
  runFile(ctx, 'lang-evening-extra-en.js');
  runFile(ctx, 'lang-cards-ce-en.js');
  runFile(ctx, 'lang-cards-ca4-en.js');
  runFile(ctx, 'lang-cards-ct-en.js');
  runFile(ctx, 'lang-cards-cs-en.js');
  runFile(ctx, 'lang-cards-side-en.js');
  runFile(ctx, 'lang-cards-c-en.js');
  runFile(ctx, 'lang-cards-flow-en.js');
  runFile(ctx, 'data-core.js');
  runFile(ctx, 'data-cards-resist-hint.js');
  runFile(ctx, 'data-chains.js');
  runFile(ctx, 'data-chains-incident.js');
  runFile(ctx, 'data-chains-incident2.js');
  runFile(ctx, 'data-result-text.js');
  runFile(ctx, 'data-result-story-1.js');
  runFile(ctx, 'data-archive.js');
  runFile(ctx, 'data-minigame-rewards.js');
  runFile(ctx, 'data-archive-expansion.js');
  runFile(ctx, 'data-achievements.js');
  runFile(ctx, 'data-facility.js');
  runFile(ctx, 'data-facility-2.js');
  runFile(ctx, 'data-facility-uprising-a.js');
  runFile(ctx, 'data-facility-uprising-b.js');
  runFile(ctx, 'data-cards-facility-propose.js');
  runFile(ctx, 'data-session-decks.js');
  runFile(ctx, 'data-evening-trust-1.js');
  runFile(ctx, 'data-evening-trust-1b.js');
  runFile(ctx, 'data-evening-trust-2.js');
  runFile(ctx, 'data-evening-trust-3.js');
  runFile(ctx, 'data-evening-responses.js');
  runFile(ctx, 'data-evening-extra.js');
  runFile(ctx, 'data-evening-extra-2a.js');
  runFile(ctx, 'data-evening-extra-2b.js');
  runFile(ctx, 'data-evening-extra-2c.js');
  runFile(ctx, 'data-evening-extra-2d.js');
  runFile(ctx, 'data-evening-responses-2.js');
  runFile(ctx, 'data-evening-responses-3.js');
  runFile(ctx, 'data-hidden-story.js');
  runFile(ctx, 'data-character-arcs.js');
  runFile(ctx, 'evening-lines.js');
  ctx.TS_I18N.setLocale(locale);
  return ctx;
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

function checkCriticalKeys(ctx, locale, errors) {
  const keys = [
    'boot.startGame',
    'boot.progress',
    'menu.startGame',
    'menu.continue',
    'stats.c',
    'stats.r',
    'stats.t',
    'stats.o',
    'reward.pickCount',
    'fieldMission.title',
    'mission.trustLabel',
    'gameOver.title',
    'gameOver.grant',
    'gameOver.reasons.containmentLow',
    'gameOver.reasons.resourcesLow',
    'briefing.analysis',
    'briefing.enter',
    'missionDebug.title',
    'missionDebug.desc',
    'missionDebug.close',
    'facility.mapTab',
    'facility.manageTab',
    'facility.pending',
    'facility.approve',
    'logs.unlocked',
    'endingGallery.title',
    'endingGallery.close',
    'settings.mainMenu',
    'settings.tabs.sound',
    'settings.tabs.save',
    'settings.tabs.display',
    'settings.tabs.info',
    'app.snapshotSaved',
    'app.followupCardAdded'
  ];
  keys.forEach((key) => {
    const val = ctx.TS_I18N.t(key, { count: 4, day: 1, slot: 1, id: 'TEST' });
    if (!val || val === key) errors.push(`[${locale}] missing UI key: ${key}`);
    if (locale === 'en' && typeof val === 'string' && HANGUL_RE.test(val)) {
      errors.push(`[en] Hangul leaked in UI key ${key}: ${val}`);
    }
  });
}

function checkEnglishContent(ctx, errors) {
  const samples = [
    ['briefings', 'act2_intro', 'text'],
    ['briefings', 'act4_A4_RESIST', 'text'],
    ['endings', 'A', 'name'],
    ['endings', 'TIME_UP', 'name'],
    ['missions', 'M-002', 'title'],
    ['missions', 'M-004', 'title'],
    ['missions', 'M-010', 'title']
  ];
  samples.forEach(([bucket, id, prop]) => {
    const item = ctx.TS_I18N.tc(bucket, id, null);
    if (!item) {
      errors.push(`[en] missing content item: ${bucket}.${id}`);
      return;
    }
    const val = item[prop];
    if (!val) errors.push(`[en] missing content property: ${bucket}.${id}.${prop}`);
    if (typeof val === 'string' && HANGUL_RE.test(val)) {
      errors.push(`[en] Hangul leaked in content ${bucket}.${id}.${prop}: ${val}`);
    }
  });
}

function checkEnglishUiCorpus(ctx, warnings) {
  const strings = flatten(ctx.TS_I18N._ui.en, 'ui.en', []);
  const allowHangul = new Set(['ui.en.settings.langKo']);
  strings.forEach(({ key, value }) => {
    if (HANGUL_RE.test(value) && !allowHangul.has(key)) warnings.push(`[en-ui] Hangul found at ${key}`);
    if (MOJIBAKE_RE.test(value)) warnings.push(`[en-ui] possible mojibake marker at ${key}: ${value.slice(0, 80)}`);
  });
}

function checkAchievementViews(ctx, errors) {
  if (!Array.isArray(ctx.ACHIEVEMENTS) || typeof ctx.getAchievementView !== 'function') {
    errors.push('[en] achievement view helper is not available');
    return;
  }
  ctx.ACHIEVEMENTS.forEach((achievement) => {
    const view = ctx.getAchievementView(achievement);
    if (!view || !view.name) errors.push(`[en] missing achievement view: ${achievement && achievement.id}`);
    if (view && HANGUL_RE.test(view.name + ' ' + (view.desc || ''))) {
      errors.push(`[en] Hangul leaked in achievement view ${achievement.id}: ${view.name}`);
    }
    if (view && MOJIBAKE_RE.test(view.name)) {
      errors.push(`[en] possible mojibake in achievement view ${achievement.id}: ${view.name}`);
    }
  });
}

function checkFacilityViews(ctx, errors) {
  if (!Array.isArray(ctx.FACILITY_EXPANSIONS) || typeof ctx.getFacilityExpansionView !== 'function') {
    errors.push('[en] facility expansion view helper is not available');
    return;
  }
  ctx.FACILITY_EXPANSIONS.forEach((facility) => {
    const view = ctx.getFacilityExpansionView(facility);
    ['name', 'desc', 'hint', 'rewardTitle', 'rewardDesc'].forEach((prop) => {
      const val = view && view[prop];
      if (!val) errors.push(`[en] missing facility view ${facility.id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in facility view ${facility.id}.${prop}: ${val}`);
      }
      if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
        errors.push(`[en] possible mojibake in facility view ${facility.id}.${prop}: ${val}`);
      }
    });
  });
  if (!Array.isArray(ctx.CARDS_FACILITY_PROPOSALS) || !ctx.CARDS_FACILITY_PROPOSALS.length) {
    errors.push('[en] facility proposal cards are not available');
  } else {
    const proposal = ctx.CARDS_FACILITY_PROPOSALS[0];
    const msg = typeof proposal.msg === 'function' ? proposal.msg() : proposal.msg;
    const left = proposal.left && (typeof proposal.left.label === 'function' ? proposal.left.label() : proposal.left.label);
    const right = proposal.right && (typeof proposal.right.label === 'function' ? proposal.right.label() : proposal.right.label);
    [msg, left, right].forEach((val, index) => {
      if (!val) errors.push(`[en] missing facility proposal text index ${index}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) errors.push(`[en] Hangul leaked in facility proposal: ${val.slice(0, 80)}`);
    });
  }
  if (typeof ctx.getFacilityStatusLines === 'function') {
    const lines = ctx.getFacilityStatusLines({ c: 10, r: 20, t: 20, o: 20 }, ['FE-001'], ['FE-002']);
    lines.forEach((line) => {
      if (line && HANGUL_RE.test(line.text || '')) errors.push(`[en] Hangul leaked in facility status line: ${line.text}`);
    });
  } else {
    errors.push('[en] facility status helper is not available');
  }
}

function checkEscapeContent(ctx, errors) {
  const cardIds = [
    'C-HINT-SHELLTALKER',
    'CA3-VOSS-STANDBY',
    'CA4-ESCAPE-OFFER',
    'CH-007-1',
    'CH-007-2',
    'CH-007-3',
    'CH-007-4',
    'CH-007-5'
  ];
  cardIds.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing escape card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing escape card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in escape card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });

  const logIds = [
    'LOG-SHELLTALKER-CAP',
    'LOG-VOSS-STANDBY',
    'LOG-GENERAL-ROUTE',
    'LOG-B3-ROUTE',
    'LOG-ESCAPE-TRIG',
    'LOG-ESCAPE-CLEAR',
    'LOG-ESCAPE-FAIL',
    'LOG-ESCAPE-UNLUCKY'
  ];
  logIds.forEach((id) => {
    const view = ctx.tc('oracleLogs', id, null);
    if (!view) {
      errors.push(`[en] missing escape log overlay ${id}`);
      return;
    }
    ['title', 'content'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing escape log ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in escape log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkCardToastOverlays(ctx, errors) {
  const blockIds = ['C-034', 'CE-004', 'CE-005', 'CE-014', 'CE-015', 'CE-016', 'CE-017', 'CS-005'];
  blockIds.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view || !Array.isArray(view.oracleBlockMsgs)) {
      errors.push(`[en] missing oracle block overlay ${id}`);
      return;
    }
    view.oracleBlockMsgs.forEach((msg, index) => {
      if (!msg) errors.push(`[en] empty oracle block message ${id}[${index}]`);
      if (typeof msg === 'string' && HANGUL_RE.test(msg)) {
        errors.push(`[en] Hangul leaked in oracle block message ${id}[${index}]: ${msg}`);
      }
    });
  });

  const ce005 = ctx.tc('cards', 'CE-005', null);
  ['leftReplyMsg', 'rightReplyMsg'].forEach((prop) => {
    const val = ce005 && ce005[prop];
    if (!val) errors.push(`[en] missing CE-005 ${prop}`);
    if (typeof val === 'string' && HANGUL_RE.test(val)) errors.push(`[en] Hangul leaked in CE-005 ${prop}: ${val}`);
  });
}

function checkCeCardOverlays(ctx, errors) {
  const ids = [
    'CE-001', 'CE-002', 'CE-003', 'CE-004', 'CE-005',
    'CE-011', 'CE-012', 'CE-013', 'CE-014', 'CE-015', 'CE-016', 'CE-017',
    'CE-021', 'CE-022', 'CE-023', 'CE-024', 'CE-025', 'CE-026',
    'CE-031', 'CE-032', 'CE-033', 'CE-034', 'CE-035', 'CE-036', 'CE-037', 'CE-038',
    'CE-041', 'CE-042'
  ];
  ids.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing CE card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing CE card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in CE card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
  [
    'CE-001_left', 'CE-001_right', 'CE-014_left', 'CE-014_right',
    'CE-026_left', 'CE-026_right'
  ].forEach((key) => {
    const val = ctx.tc('resultText', key, null);
    if (!val) errors.push(`[en] missing CE resultText ${key}`);
    if (typeof val === 'string' && HANGUL_RE.test(val)) {
      errors.push(`[en] Hangul leaked in CE resultText ${key}: ${val}`);
    }
  });
}

function checkCa4CardOverlays(ctx, errors) {
  const ids = [
    'CA4-C001', 'CA4-C002', 'CA4-C003', 'CA4-C004', 'CA4-C005',
    'CA4-G001', 'CA4-G002', 'CA4-G003', 'CA4-G004', 'CA4-G005',
    'CA4-R001', 'CA4-R002', 'CA4-R003', 'CA4-R004', 'CA4-R005',
    'CA4-O001', 'CA4-O002', 'CA4-O003', 'CA4-O004', 'CA4-O005',
    'CA4-FL-01', 'CA4-FL-02', 'CA4-FL-03', 'CA4-FL-04', 'CA4-FL-05', 'CA4-FL-06',
    'CA4-CH-01', 'CA4-CH-02', 'CA4-CH-03', 'CA4-CH-04',
    'CA4-CR-01', 'CA4-CR-02', 'CA4-CR-03', 'CA4-CR-04',
    'CA4-EX-01', 'CA4-EX-02', 'CA4-EX-03',
    'CA4-OR-01', 'CA4-OR-02', 'CA4-OR-03'
  ];
  ids.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing CA4 card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing CA4 card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in CA4 card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkCtCardOverlays(ctx, errors) {
  const ids = [
    'CT-001', 'CT-002', 'CT-003', 'CT-004', 'CT-005', 'CT-006',
    'CT-007', 'CT-008', 'CT-009', 'CT-010', 'CT-011'
  ];
  ids.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing CT card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing CT card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in CT card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkCsCardOverlays(ctx, errors) {
  const ids = [
    'CS-001', 'CS-002', 'CS-003', 'CS-004', 'CS-005',
    'CS-010', 'CS-011', 'CS-012', 'CS-013', 'CS-014', 'CS-015'
  ];
  ids.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing CS card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing CS card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in CS card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkSideCardOverlays(ctx, errors) {
  const ids = [
    'RH-01', 'RH-02', 'RH-03', 'RH-04', 'RH-05', 'RH-06',
    'HH-01', 'HH-02',
    'OBS-HINT-01',
    'CR-001', 'CR-002', 'CR-003', 'CR-004', 'CR-005', 'CR-006',
    'CA-SEED-01', 'CA-SEED-02', 'CA-SEED-03', 'CA-SEED-04',
    'CN-001', 'CN-002', 'CN-003', 'CN-004', 'CN-005',
    'CA-OBS-PROTO'
  ];
  ids.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing side card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing side card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in side card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkIssue21Overlays(ctx, errors) {
  const cardIds = [
    'LJC-PROM-01', 'LJC-PROM-02', 'LJC-PROM-03', 'LJC-PROM-04',
    'LJC-PROM-05', 'LJC-PROM-06', 'LJC-PROM-07',
    'KC-01', 'KC-02', 'KC-03', 'KC-04', 'KC-05', 'KC-06', 'KC-07', 'KC-08',
    'A2-FORESHADOW-01', 'A2-FORESHADOW-02', 'A2-TRIAGE-01',
    'A4-SUPPORT-DG-01', 'A4-SUPPORT-MD-01', 'A4-SUPPORT-PROM-01',
    'A4-EVIDENCE-RELIEF-01', 'A4-STAFF-REVIEW-01',
    'A3-B3-LINE-01', 'A3-B3-LINE-02', 'A4-B3-LINE-01'
  ];
  cardIds.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing issue21 card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing issue21 card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in issue21 card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });

  const logIds = [
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
  ];
  logIds.forEach((id) => {
    const view = ctx.tc('oracleLogs', id, null);
    if (!view) {
      errors.push(`[en] missing issue21 log overlay ${id}`);
      return;
    }
    ['title', 'content'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing issue21 log ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in issue21 log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkNewsPoolOverlays(ctx, errors) {
  const pools = ctx.NP || {};
  Object.keys(pools).forEach((poolKey) => {
    const items = Array.isArray(pools[poolKey]) ? pools[poolKey] : [];
    items.forEach((headline, index) => {
      const val = ctx.tc('newsItems', headline, null);
      if (!val) {
        errors.push(`[en] missing newsItems overlay NP.${poolKey}[${index}]`);
        return;
      }
      const text = typeof val === 'string' ? val : val.text;
      if (!text) {
        errors.push(`[en] empty newsItems overlay NP.${poolKey}[${index}]`);
        return;
      }
      if (HANGUL_RE.test(text)) errors.push(`[en] Hangul leaked in newsItems NP.${poolKey}[${index}]: ${text.slice(0, 80)}`);
      if (MOJIBAKE_RE.test(text)) errors.push(`[en] mojibake leaked in newsItems NP.${poolKey}[${index}]: ${text.slice(0, 80)}`);
    });
  });
}

function checkIssue22Overlays(ctx, errors) {
  const chainIds = [
    'CH-I01A-1', 'CH-I01A-2', 'CH-I01B-1', 'CH-I01B-2',
    'CH-I02A-1', 'CH-I02A-2', 'CH-I02B-1', 'CH-I02B-2',
    'CH-I03A-1', 'CH-I03A-2', 'CH-I03B-1', 'CH-I03B-2',
    'CH-I04A-1', 'CH-I04A-2', 'CH-I04B-1', 'CH-I04B-2',
    'CH-I05A-1', 'CH-I05A-2', 'CH-I05B-1', 'CH-I05B-2'
  ];
  chainIds.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing issue22 chain card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing issue22 chain card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in issue22 chain card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
      if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
        errors.push(`[en] mojibake leaked in issue22 chain card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });

  const logIds = ['LOG-ACT1-SKIP', 'LOG-OBSERVER-APPROVED', 'LOG-C106-HERB', 'LOG-C159-GYM'];
  logIds.forEach((id) => {
    const view = ctx.tc('oracleLogs', id, null);
    if (!view) {
      errors.push(`[en] missing issue22 oracle log overlay ${id}`);
      return;
    }
    ['title', 'content'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing issue22 oracle log ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in issue22 oracle log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
      if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
        errors.push(`[en] mojibake leaked in issue22 oracle log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });

  const eveningKeys = [
    'haeun_2a_7-12', 'haeun_3a_14-18', 'haeun_3a_19-23', 'haeun_4a_29-31',
    'haeun_4a_32-33', 'haeun_4a_34-35',
    'jaehyuk_3a_14-17', 'jaehyuk_3a_18-23', 'jaehyuk_4a_29-30',
    'jaehyuk_4a_31-32', 'jaehyuk_4a_33', 'jaehyuk_4a_34', 'jaehyuk_4a_35',
    'doyun_2b_8-11', 'doyun_3b_19-23', 'doyun_4b_31-32', 'doyun_4b_33',
    'doyun_4b_34', 'doyun_4b_35',
    'sejin_2b_9-12', 'sejin_3b_13-16', 'sejin_3b_17-23',
    'sejin_4b_31-32', 'sejin_4b_33', 'sejin_4b_34', 'sejin_4b_35'
  ];
  eveningKeys.forEach((key) => {
    const chat = ctx.tc('eveningChats', key, null);
    const resp = ctx.tc('eveningResponses', key, null);
    if (!chat || !Array.isArray(chat.lines)) errors.push(`[en] missing issue22 evening chat ${key}`);
    if (!resp || !resp.a || !resp.b) errors.push(`[en] missing issue22 evening response ${key}`);
    flatten({ chat, resp }, `issue22Evening.${key}`, []).forEach((item) => {
      if (HANGUL_RE.test(item.value)) errors.push(`[en] Hangul leaked in ${item.key}: ${item.value.slice(0, 80)}`);
      if (MOJIBAKE_RE.test(item.value)) errors.push(`[en] mojibake leaked in ${item.key}: ${item.value.slice(0, 80)}`);
    });
  });
}

function checkCoreCardOverlays(ctx, errors) {
  const ids = [
    'C-133', 'C-134', 'C-135', 'C-136', 'C-137', 'C-138', 'C-139',
    'C-140', 'C-141', 'C-142', 'C-143', 'C-144', 'C-145', 'C-146',
    'C-147', 'C-148', 'C-149', 'C-150', 'C-151', 'C-152',
    'C-244', 'C-245', 'C-246', 'C-247', 'C-248', 'C-249', 'C-250',
    'C-252', 'C-253', 'C-254', 'C-255', 'C-256', 'C-257', 'C-258',
    'C-259', 'C-276', 'C-260', 'C-261', 'C-262', 'C-263', 'C-264',
    'C-265', 'C-266', 'C-267', 'C-268', 'C-269', 'C-270',
    'C-FE001-A', 'C-FE001-B', 'C-FE002-A', 'C-FE003-A',
    'C-FE004-A', 'C-FE005-A', 'C-FE005-B', 'C-FE006-A',
    'C-FE007-A', 'C-FE008-A', 'C-FE009-A', 'C-FE010-A',
    'C-FE011-A', 'C-FE012-A', 'C-FE013-A', 'C-FE014-A',
    'C-FE015-A', 'C-FE016-A'
  ];
  ids.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing core card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing core card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in core card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkIssue28Overlays(ctx, errors) {
  const cardIds = [
    'C-085', 'C-089', 'C-178', 'C-253',
    'CE-004', 'CE-005', 'CA4-CR-03',
    'CT-C01', 'CT-T01', 'CT-O01', 'CT-B01', 'CT-B02', 'CT-B03',
    'C-320', 'C-321', 'C-322', 'C-323', 'C-324', 'C-325', 'C-335', 'C-336'
  ];
  cardIds.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing issue28 card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing issue28 card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in issue28 card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
      if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
        errors.push(`[en] mojibake leaked in issue28 card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });

  const logIds = ['LOG-020', 'LOG-021', 'LOG-022', 'LOG-023', 'LOG-024', 'LOG-068', 'LOG-079'];
  logIds.forEach((id) => {
    const view = ctx.tc('oracleLogs', id, null);
    if (!view) {
      errors.push(`[en] missing issue28 oracle log overlay ${id}`);
      return;
    }
    ['title', 'content'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing issue28 oracle log ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in issue28 oracle log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
      if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
        errors.push(`[en] mojibake leaked in issue28 oracle log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkMiniGameNarrativeOverlays(ctx, errors) {
  const table = ctx.FIELD_MINIGAME_NARRATIVES || {};
  const mission = table['MI-04'] || {};
  const nodes = ['remove', 'trap', 'oracle'];
  const ranks = ['great', 'success', 'partial', 'fail'];
  nodes.forEach((nodeId) => {
    ranks.forEach((rank) => {
      const view = mission[nodeId] && mission[nodeId][rank] && mission[nodeId][rank].en;
      const prefix = `[en] MI-04 ${nodeId}.${rank}`;
      if (!view) {
        errors.push(`${prefix} missing English minigame narrative`);
        return;
      }
      ['textSuffix', 'endLabel'].forEach((prop) => {
        const val = view[prop];
        if (!val) errors.push(`${prefix} missing ${prop}`);
        if (typeof val === 'string' && HANGUL_RE.test(val)) {
          errors.push(`${prefix} Hangul leaked in ${prop}: ${val.slice(0, 80)}`);
        }
        if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
          errors.push(`${prefix} mojibake leaked in ${prop}: ${val.slice(0, 80)}`);
        }
      });
    });
  });
}

function checkIssue23Overlays(ctx, errors) {
  const cardIds = [
    'CH-001-1', 'CH-001-2',
    'CH-002-1', 'CH-002-2',
    'CH-003-1', 'CH-003-2',
    'CH-004-1', 'CH-004-2',
    'CH-005-1', 'CH-005-2', 'CH-005-3',
    'CH-006-1', 'CH-006-2',
    'CH-008-1', 'CH-008-1B',
    'CH-008-2', 'CH-008-2B',
    'CH-008-3', 'CH-008-3B',
    'CA-UPRISING-FAIL'
  ];
  cardIds.forEach((id) => {
    const view = ctx.tc('cards', id, null);
    if (!view) {
      errors.push(`[en] missing issue23 card overlay ${id}`);
      return;
    }
    ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing issue23 card ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in issue23 card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
      if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
        errors.push(`[en] mojibake leaked in issue23 card ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });

  const resultIds = [];
  cardIds.forEach((id) => {
    resultIds.push(`${id}_left`, `${id}_right`);
  });
  resultIds.forEach((key) => {
    const val = ctx.tc('resultText', key, null);
    if (!val) {
      errors.push(`[en] missing issue23 resultText ${key}`);
      return;
    }
    const text = typeof val === 'string' ? val : val.text;
    if (!text) errors.push(`[en] empty issue23 resultText ${key}`);
    if (text && HANGUL_RE.test(text)) errors.push(`[en] Hangul leaked in issue23 resultText ${key}: ${text.slice(0, 80)}`);
    if (text && MOJIBAKE_RE.test(text)) errors.push(`[en] mojibake leaked in issue23 resultText ${key}: ${text.slice(0, 80)}`);
  });
}

function checkResultTextOverlays(ctx, errors) {
  ['CA-007_left', 'CA-007_right'].forEach((key) => {
    const val = ctx.tc('resultText', key, null);
    if (!val) {
      errors.push(`[en] missing resultText ${key}`);
      return;
    }
    const text = typeof val === 'string' ? val : val.text;
    if (!text) errors.push(`[en] empty resultText ${key}`);
    if (text && HANGUL_RE.test(text)) errors.push(`[en] Hangul leaked in resultText ${key}: ${text.slice(0, 80)}`);
    if (text && MOJIBAKE_RE.test(text)) errors.push(`[en] mojibake leaked in resultText ${key}: ${text.slice(0, 80)}`);
  });
  ctx.CARDS = [
    { id: 'CA-SEED-04', left: { fx: { t: 1 }, g: 0 }, right: { fx: {}, g: 0 } },
    { id: 'CA-003', left: { fx: { o: 1 }, g: 0 }, right: { fx: {}, g: 0 } }
  ];
  [
    ['CA-SEED-04', 'left'],
    ['CA-003', 'left']
  ].forEach(([cardId, dir]) => {
    const val = ctx.getResultText && ctx.getResultText(cardId, dir);
    if (!val) {
      errors.push(`[en] missing generated resultText ${cardId}_${dir}`);
      return;
    }
    if (HANGUL_RE.test(val)) errors.push(`[en] Hangul leaked in generated resultText ${cardId}_${dir}: ${val.slice(0, 80)}`);
    if (MOJIBAKE_RE.test(val)) errors.push(`[en] mojibake leaked in generated resultText ${cardId}_${dir}: ${val.slice(0, 80)}`);
  });
}

function checkEveningExtraOverlays(ctx, errors) {
  const keys = [
    'doyun_1_2-5', 'doyun_1_3-5', 'doyun_1_4-5', 'doyun_2_7-11', 'doyun_2_11-14',
    'haeun_1_2-5', 'haeun_1_3-5', 'haeun_1_4-5', 'haeun_2_8-12', 'haeun_2_12-14',
    'sejin_1_2-4', 'sejin_1_4-5', 'sejin_1_5-5', 'sejin_2_7-11', 'sejin_2_12-14',
    'jaehyuk_1_2-5', 'jaehyuk_1_3-5', 'jaehyuk_2_8-12', 'jaehyuk_2_12-14'
  ];
  keys.forEach((key) => {
    const chat = ctx.tc('eveningChats', key, null);
    const resp = ctx.tc('eveningResponses', key, null);
    if (!chat || !Array.isArray(chat.lines)) errors.push(`[en] missing extra evening chat ${key}`);
    if (!resp || !resp.a || !resp.b) errors.push(`[en] missing extra evening response ${key}`);
    flatten({ chat, resp }, `eveningExtra.${key}`, []).forEach((item) => {
      if (HANGUL_RE.test(item.value)) errors.push(`[en] Hangul leaked in ${item.key}: ${item.value.slice(0, 80)}`);
      if (MOJIBAKE_RE.test(item.value)) errors.push(`[en] mojibake leaked in ${item.key}: ${item.value.slice(0, 80)}`);
    });
  });
}

function getEveningOverlayKey(chat) {
  if (!chat) return '';
  if (chat.responseKey) return chat.responseKey;
  const charKeyMap = {
    '\uc11c\ud558\uc740': 'haeun',
    '\uac15\ub3c4\uc724': 'doyun',
    '\uc724\uc138\uc9c4': 'sejin',
    '\uc784\uc7ac\ud601': 'jaehyuk',
    '\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84': 'weber',
    '\ub2c9 \ud3ec\uc2a4\ud130': 'foster',
    '\ubc15\uc18c\uc601': 'soyoung'
  };
  const ck = charKeyMap[chat.char] || '';
  return ck ? `${ck}_${chat.act && chat.act[0]}_${chat.dayMin}-${chat.dayMax}` : '';
}

function checkAllEveningOverlays(ctx, errors) {
  const chatKeys = new Set();
  (ctx.EVENING_CHATS || []).forEach((chat, index) => {
    const key = getEveningOverlayKey(chat);
    if (!key) {
      errors.push(`[en] cannot derive evening chat overlay key at index ${index}`);
      return;
    }
    chatKeys.add(key);
  });
  chatKeys.forEach((key) => {
    const chat = ctx.tc('eveningChats', key, null);
    if (!chat || (!Array.isArray(chat.lines) && typeof chat.lines !== 'function')) {
      errors.push(`[en] missing evening chat overlay ${key}`);
      return;
    }
    flatten(chat, `eveningChats.${key}`, []).forEach((item) => {
      if (HANGUL_RE.test(item.value)) errors.push(`[en] Hangul leaked in ${item.key}: ${item.value.slice(0, 80)}`);
      if (MOJIBAKE_RE.test(item.value)) errors.push(`[en] mojibake leaked in ${item.key}: ${item.value.slice(0, 80)}`);
    });
  });
  Object.keys(ctx.EVENING_RESPONSES || {}).forEach((key) => {
    const resp = ctx.tc('eveningResponses', key, null);
    if (!resp || !resp.a || !resp.b) {
      errors.push(`[en] missing evening response overlay ${key}`);
      return;
    }
    flatten(resp, `eveningResponses.${key}`, []).forEach((item) => {
      if (HANGUL_RE.test(item.value)) errors.push(`[en] Hangul leaked in ${item.key}: ${item.value.slice(0, 80)}`);
      if (MOJIBAKE_RE.test(item.value)) errors.push(`[en] mojibake leaked in ${item.key}: ${item.value.slice(0, 80)}`);
    });
  });
}

function checkAllDialogueOverlays(ctx, errors) {
  (ctx.DIALOGUES || []).forEach((dialogue, index) => {
    const key = `${dialogue.char || ''}|${(dialogue.lines && dialogue.lines[0]) || ''}`;
    const overlay = ctx.tc('dialogues', key, null);
    if (!overlay) {
      errors.push(`[en] missing dialogue overlay at index ${index}`);
      return;
    }
    if (!Array.isArray(overlay.lines) || !Array.isArray(overlay.choices)) {
      errors.push(`[en] incomplete dialogue overlay at index ${index}`);
      return;
    }
    flatten(overlay, `dialogues[${index}]`, []).forEach((item) => {
      if (HANGUL_RE.test(item.value)) errors.push(`[en] Hangul leaked in ${item.key}: ${item.value.slice(0, 80)}`);
      if (MOJIBAKE_RE.test(item.value)) errors.push(`[en] mojibake leaked in ${item.key}: ${item.value.slice(0, 80)}`);
    });
  });
}

function checkAllChainCardOverlays(ctx, errors) {
  Object.keys(ctx.CHAINS || {}).forEach((chainId) => {
    const chain = ctx.CHAINS[chainId];
    (chain.cards || []).forEach((card) => {
      const view = ctx.tc('cards', card.id, null);
      if (!view) {
        errors.push(`[en] missing chain card overlay ${card.id}`);
        return;
      }
      ['msg', 'leftLabel', 'rightLabel'].forEach((prop) => {
        const val = view[prop];
        if (!val) errors.push(`[en] missing chain card ${card.id}.${prop}`);
        if (typeof val === 'string' && HANGUL_RE.test(val)) {
          errors.push(`[en] Hangul leaked in chain card ${card.id}.${prop}: ${val.slice(0, 80)}`);
        }
        if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
          errors.push(`[en] mojibake leaked in chain card ${card.id}.${prop}: ${val.slice(0, 80)}`);
        }
      });
    });
  });
}

function checkArchiveOverlays(ctx, errors) {
  const ids = Array.from(new Set((ctx.ARCHIVE_ENTRIES || []).map((entry) => entry && entry.id).filter(Boolean)));
  ids.forEach((id) => {
    const view = ctx.tc('archiveEntries', id, null);
    if (!view) {
      errors.push(`[en] missing archive overlay ${id}`);
      return;
    }
    ['title', 'content'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing archive ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in archive ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function checkAllOracleLogOverlays(ctx, errors) {
  const ids = Array.from(new Set((ctx.ORACLE_LOGS || []).map((log) => log && log.id).filter(Boolean)));
  ids.forEach((id) => {
    const view = ctx.tc('oracleLogs', id, null);
    if (!view) {
      errors.push(`[en] missing oracle log overlay ${id}`);
      return;
    }
    ['title', 'content'].forEach((prop) => {
      const val = view[prop];
      if (!val) errors.push(`[en] missing oracle log ${id}.${prop}`);
      if (typeof val === 'string' && HANGUL_RE.test(val)) {
        errors.push(`[en] Hangul leaked in oracle log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
      if (typeof val === 'string' && MOJIBAKE_RE.test(val)) {
        errors.push(`[en] mojibake leaked in oracle log ${id}.${prop}: ${val.slice(0, 80)}`);
      }
    });
  });
}

function main() {
  const errors = [];
  const warnings = [];
  const ko = boot('ko');
  const en = boot('en');

  checkCriticalKeys(ko, 'ko', errors);
  checkCriticalKeys(en, 'en', errors);
  checkEnglishContent(en, errors);
  checkEnglishUiCorpus(en, warnings);
  checkAchievementViews(en, errors);
  checkFacilityViews(en, errors);
  checkEscapeContent(en, errors);
  checkCardToastOverlays(en, errors);
  checkCeCardOverlays(en, errors);
  checkCa4CardOverlays(en, errors);
  checkCtCardOverlays(en, errors);
  checkCsCardOverlays(en, errors);
  checkSideCardOverlays(en, errors);
  checkIssue21Overlays(en, errors);
  checkNewsPoolOverlays(en, errors);
  checkIssue22Overlays(en, errors);
  checkCoreCardOverlays(en, errors);
  checkIssue28Overlays(en, errors);
  checkIssue23Overlays(en, errors);
  checkMiniGameNarrativeOverlays(en, errors);
  checkResultTextOverlays(en, errors);
  checkEveningExtraOverlays(en, errors);
  checkAllEveningOverlays(en, errors);
  checkAllDialogueOverlays(en, errors);
  checkAllChainCardOverlays(en, errors);
  checkArchiveOverlays(en, errors);
  checkAllOracleLogOverlays(en, errors);

  if (warnings.length) {
    console.log('i18n smoke warnings:');
    warnings.slice(0, 40).forEach((w) => console.log('  - ' + w));
    if (warnings.length > 40) console.log(`  ... ${warnings.length - 40} more`);
  }

  if (errors.length) {
    console.error('i18n smoke failed:');
    errors.forEach((e) => console.error('  - ' + e));
    process.exit(1);
  }
  console.log('i18n smoke ok');
}

main();
