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
  runFile(ctx, 'lang-archive-en.js');
  runFile(ctx, 'lang-evening-extra-en.js');
  runFile(ctx, 'lang-cards-ce-en.js');
  runFile(ctx, 'lang-cards-ca4-en.js');
  runFile(ctx, 'lang-cards-ct-en.js');
  runFile(ctx, 'lang-cards-cs-en.js');
  runFile(ctx, 'lang-cards-side-en.js');
  runFile(ctx, 'lang-cards-c-en.js');
  runFile(ctx, 'data-result-text.js');
  runFile(ctx, 'data-result-story-1.js');
  runFile(ctx, 'data-minigame-rewards.js');
  runFile(ctx, 'data-achievements.js');
  runFile(ctx, 'data-facility.js');
  runFile(ctx, 'data-facility-2.js');
  runFile(ctx, 'data-cards-facility-propose.js');
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
    'RH-01', 'RH-02', 'RH-03', 'RH-04', 'RH-05',
    'HH-01', 'HH-02',
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
    'C-FE012-A', 'C-FE013-A', 'C-FE016-A'
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

function checkArchiveOverlays(ctx, errors) {
  const ids = [
    'ARC-SPEC-001',
    'ARC-SPEC-003',
    'ARC-SPEC-008',
    'ARC-SPEC-011',
    'ARC-SPEC-012',
    'ARC-EVS',
    'ARC-SPEC-002',
    'ARC-SPEC-004',
    'ARC-SPEC-005',
    'ARC-SPEC-007',
    'ARC-SPEC-009',
    'ARC-SPEC-010',
    'ARC-CHAR-DOYUN',
    'ARC-CHAR-HAEUN',
    'ARC-CHAR-SEJIN',
    'ARC-CHAR-JAEHYUK',
    'ARC-CHAR-NICK',
    'ARC-CHAR-WEBER',
    'ARC-CHAR-SOYOUNG',
    'ARC-CHAR-KANG',
    'ARC-ORG-ORACLE',
    'ARC-ORG-PROM',
    'ARC-ORG-BRANCH',
    'ARC-ORG-WHITESHIELD',
    'ARC-FAC-SEAL',
    'ARC-FAC-TUNNEL',
    'ARC-FAC-LAB',
    'ARC-FAC-SENSOR',
    'ARC-SCI-PHASE',
    'ARC-SCI-PRION',
    'ARC-SCI-SUPPRESS',
    'ARC-SCI-EVOLVE',
    'ARC-SCI-TEMP',
    'ARC-SCI-4STAGE',
    'ARC-SYS-PROXY',
    'ARC-SYS-FINAL',
    'ARC-SYS-COASTAL',
    'ARC-SYS-GENESIS',
    'ARC-LOC-PHILA',
    'ARC-LOC-DPRK',
    'ARC-LOC-KOREA',
    'ARC-LOC-ASHFALL',
    'ARC-LOC-SILENT'
  ];
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
  checkCoreCardOverlays(en, errors);
  checkMiniGameNarrativeOverlays(en, errors);
  checkResultTextOverlays(en, errors);
  checkEveningExtraOverlays(en, errors);
  checkArchiveOverlays(en, errors);

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
