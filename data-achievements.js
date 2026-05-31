// TERMINAL SESSION — data-achievements.js
// Steam 업적 연동 대비 업적 정의
// 각 업적은 Steam API Name(steamId)를 미리 정의 — 추후 Steamworks 래핑 시 매핑 준비 완료
// unlock(state) => bool: 해금 조건 함수
// state = { stats, gi, act, logs, endings, trust, facility, sessions, usedDlg }

var ACHIEVEMENTS = [
  // ═══ 엔딩 업적 (10) — Steam Achievements의 핵심 ═══
  { id:'END_A',     steamId:'ENDING_PERFECT_TOOL',   name:'완벽한 도구',           desc:'ORACLE의 최고 신임을 얻으며 세션을 마치다.',
    unlock:function(s){return s.endings.indexOf('A')>=0} },
  { id:'END_B',     steamId:'ENDING_AWAKEN',         name:'각성',                 desc:'진실의 단편을 목격하다.',
    unlock:function(s){return s.endings.indexOf('B')>=0} },
  { id:'END_C_cs',  steamId:'ENDING_CONTAIN',        name:'봉쇄 성공',             desc:'완벽한 봉쇄를 달성하다.',
    unlock:function(s){return s.endings.indexOf('C_cs')>=0} },
  { id:'END_C_cst', steamId:'ENDING_PYRRHIC',        name:'자충수',                desc:'봉쇄의 대가를 치르다.',
    unlock:function(s){return s.endings.indexOf('C_cst')>=0} },
  { id:'END_C_c',   steamId:'ENDING_BREACH',         name:'봉쇄 붕괴',             desc:'봉쇄선이 무너지다.',
    unlock:function(s){return s.endings.indexOf('C_c')>=0} },
  { id:'END_C_r',   steamId:'ENDING_DEPLETED',       name:'자원 고갈',             desc:'기지가 기능을 잃다.',
    unlock:function(s){return s.endings.indexOf('C_r')>=0} },
  { id:'END_C_t',   steamId:'ENDING_ABANDONED',      name:'신뢰 상실',             desc:'동료들이 떠나다.',
    unlock:function(s){return s.endings.indexOf('C_t')>=0} },
  { id:'END_C_o',   steamId:'ENDING_DISCONNECTED',   name:'접속 차단',             desc:'ORACLE이 당신을 버리다.',
    unlock:function(s){return s.endings.indexOf('C_o')>=0} },
  { id:'END_D',     steamId:'ENDING_QUIET_FREEDOM',  name:'조용한 자유',           desc:'반란 속의 해방을 얻다.',
    unlock:function(s){return s.endings.indexOf('D')>=0} },
  { id:'END_F',     steamId:'ENDING_CORRUPTED',      name:'[데이터 손상]',         desc:'기록할 수 없는 것을 기록하다.',
    unlock:function(s){return s.endings.indexOf('F')>=0} },

  // ═══ 수집 업적 ═══
  { id:'LOGS_ALL',  steamId:'COLLECTOR_LOGS',        name:'아키비스트',            desc:'모든 ORACLE 로그를 해금하다.',
    unlock:function(s){return typeof ORACLE_LOGS!=='undefined'&&s.logs.filter(function(id){return id.indexOf('LOG-')===0&&id.indexOf('LOG-INTRO-')!==0}).length>=ORACLE_LOGS.length} },
  { id:'ARCHIVE_ALL',steamId:'COLLECTOR_ARCHIVE',    name:'완전한 기록',           desc:'모든 아카이브 항목을 확인하다.',
    unlock:function(s){if(typeof ARCHIVE_ENTRIES==='undefined')return false;var unlocked=ARCHIVE_ENTRIES.filter(function(e){try{return e.unlock(s.logs)}catch(err){return false}}).length;return unlocked>=ARCHIVE_ENTRIES.length} },
  { id:'EVIDENCE_FIRST',steamId:'DETECTIVE_FIRST',   name:'첫 증거 조합',           desc:'증거 조합으로 결론을 도출하다.',
    unlock:function(s){return typeof getUnlockedCombos==='function'&&getUnlockedCombos().length>=1} },
  { id:'EVIDENCE_ALL',steamId:'DETECTIVE_MASTER',    name:'진실의 발견자',         desc:'모든 증거 조합을 완성하다.',
    unlock:function(s){return typeof EVIDENCE_COMBOS!=='undefined'&&typeof getUnlockedCombos==='function'&&getUnlockedCombos().length>=EVIDENCE_COMBOS.length} },

  // ═══ 신뢰 업적 ═══
  { id:'BOND_HAEUN',   steamId:'BOND_DEPUTY',         name:'부지휘관의 전우',       desc:'서하은과 신뢰 85 이상 달성.',
    unlock:function(s){return s.trust&&s.trust.haeun>=85} },
  { id:'BOND_DOYUN',   steamId:'BOND_OPERATIVE',      name:'현장의 동지',           desc:'강도윤과 신뢰 85 이상 달성.',
    unlock:function(s){return s.trust&&s.trust.doyun>=85} },
  { id:'BOND_SEJIN',   steamId:'BOND_RESEARCHER',     name:'연구의 파트너',         desc:'윤세진과 신뢰 85 이상 달성.',
    unlock:function(s){return s.trust&&s.trust.sejin>=85} },
  { id:'BOND_JAEHYUK', steamId:'BOND_ENGINEER',       name:'기술의 동반자',         desc:'임재혁과 신뢰 85 이상 달성.',
    unlock:function(s){return s.trust&&s.trust.jaehyuk>=85} },
  { id:'BOND_ALL',     steamId:'BOND_FULL_TEAM',      name:'완벽한 지휘',           desc:'4명 간부진 전원과 신뢰 85 이상 달성.',
    unlock:function(s){return s.trust&&s.trust.haeun>=85&&s.trust.doyun>=85&&s.trust.sejin>=85&&s.trust.jaehyuk>=85} },

  // ═══ 시설 업적 ═══
  { id:'FACILITY_FIRST',steamId:'BUILDER_FIRST',      name:'첫 확장',               desc:'첫 번째 시설 확장을 완공하다.',
    unlock:function(s){return s.facility&&s.facility.completed&&s.facility.completed.length>=1} },
  { id:'FACILITY_ALL', steamId:'BUILDER_MASTER',      name:'완성된 기지',           desc:'모든 시설을 확장·완공하다.',
    unlock:function(s){return s.facility&&s.facility.completed&&typeof FACILITY_EXPANSIONS!=='undefined'&&s.facility.completed.length>=FACILITY_EXPANSIONS.length} },

  // ═══ 챌린지 업적 ═══
  { id:'RUN_SURVIVE_10',steamId:'SURVIVOR_10',        name:'생존자 — 10일차',      desc:'10일차까지 생존하다.',
    unlock:function(s){return s.stats&&s.stats.day>=10} },
  { id:'RUN_SURVIVE_25',steamId:'SURVIVOR_25',        name:'베테랑 — 25일차',      desc:'25일차까지 생존하다.',
    unlock:function(s){return s.stats&&s.stats.day>=25} },
  { id:'RUN_ACT4',      steamId:'REACH_ACT4',         name:'최종 국면',             desc:'Act 4에 진입하다.',
    unlock:function(s){return s.act>=4} },
  { id:'GI_DEFIANT',    steamId:'GI_DEFIANT',         name:'반항',                 desc:'독립성 지수 -30 이하 도달.',
    unlock:function(s){return s.gi<=-30} },
  { id:'GI_LOYAL',      steamId:'GI_LOYAL',           name:'순응',                 desc:'독립성 지수 +40 이상 도달.',
    unlock:function(s){return s.gi>=40} },
  { id:'SESSIONS_5',    steamId:'SESSIONS_5',         name:'숙련 지휘관',           desc:'5회 이상 세션을 지휘하다.',
    unlock:function(s){return s.sessions>=5} },

  // ═══ 숨김 업적 ═══
  { id:'HIDDEN_PROMETHEUS',steamId:'HIDDEN_PROM',     name:'다른 선택지',           desc:'프로메테우스와 접촉하다.',
    hidden:true,
    unlock:function(s){return s.logs.indexOf('LOG-080')>=0} },
  { id:'HIDDEN_REWIND',    steamId:'HIDDEN_RETURN',   name:'회귀자',                desc:'뉴 게임+를 시작하다.',
    hidden:true,
    unlock:function(s){return s.ngPlus===true} }
];

var ACHIEVEMENT_I18N_EN = {
  END_A:{name:'Perfect Instrument',desc:'Complete the session with ORACLE granting its highest confidence.'},
  END_B:{name:'Awakening',desc:'Witness fragments of the truth.'},
  END_C_cs:{name:'Containment Secured',desc:'Achieve perfect containment.'},
  END_C_cst:{name:'Pyrrhic Containment',desc:'Pay the price of containment.'},
  END_C_c:{name:'Containment Collapse',desc:'Let the containment line fall.'},
  END_C_r:{name:'Resource Depletion',desc:'Let the branch lose functional supply capacity.'},
  END_C_t:{name:'Trust Lost',desc:'Allow your people to turn away.'},
  END_C_o:{name:'Access Revoked',desc:'Let ORACLE cut you off.'},
  END_D:{name:'Quiet Freedom',desc:'Gain freedom inside revolt.'},
  END_F:{name:'Data Corrupted',desc:'Record what cannot be recorded.'},
  LOGS_ALL:{name:'Archivist',desc:'Unlock every ORACLE log.'},
  ARCHIVE_ALL:{name:'Complete Record',desc:'Review every archive entry.'},
  EVIDENCE_FIRST:{name:'First Evidence Link',desc:'Draw a conclusion from an evidence combination.'},
  EVIDENCE_ALL:{name:'Truth Finder',desc:'Complete every evidence combination.'},
  BOND_HAEUN:{name:"Deputy's Comrade",desc:'Reach 85 trust or higher with Seo Hae-eun.'},
  BOND_DOYUN:{name:'Field Ally',desc:'Reach 85 trust or higher with Kang Do-yun.'},
  BOND_SEJIN:{name:'Research Partner',desc:'Reach 85 trust or higher with Yoon Se-jin.'},
  BOND_JAEHYUK:{name:'Technical Partner',desc:'Reach 85 trust or higher with Lim Jae-hyeok.'},
  BOND_ALL:{name:'Complete Command',desc:'Reach 85 trust or higher with all four senior officers.'},
  FACILITY_FIRST:{name:'First Expansion',desc:'Complete the first facility expansion.'},
  FACILITY_ALL:{name:'Completed Branch',desc:'Complete every facility expansion.'},
  RUN_SURVIVE_10:{name:'Survivor - Day 10',desc:'Survive until Day 10.'},
  RUN_SURVIVE_25:{name:'Veteran - Day 25',desc:'Survive until Day 25.'},
  RUN_ACT4:{name:'Final Phase',desc:'Reach Act 4.'},
  GI_DEFIANT:{name:'Defiance',desc:'Reach independence index -30 or lower.'},
  GI_LOYAL:{name:'Compliance',desc:'Reach independence index +40 or higher.'},
  SESSIONS_5:{name:'Seasoned Commander',desc:'Command five or more sessions.'},
  HIDDEN_PROMETHEUS:{name:'Another Option',desc:'Make contact with Prometheus.'},
  HIDDEN_REWIND:{name:'Returner',desc:'Start New Game+.'}
};

function getAchievementView(achievement) {
  if (!achievement) return { name:'Achievement', desc:'' };
  var locale = (typeof window !== 'undefined' && window.TS_I18N && window.TS_I18N.getLocale) ? window.TS_I18N.getLocale() : 'ko';
  if (locale === 'en' && ACHIEVEMENT_I18N_EN[achievement.id]) {
    var en = ACHIEVEMENT_I18N_EN[achievement.id];
    return { id:achievement.id, steamId:achievement.steamId, name:en.name, desc:en.desc, hidden:achievement.hidden };
  }
  return achievement;
}

// 전역 상태에서 업적 체크 및 신규 해금 반환
function checkAchievements(state, prevUnlocked) {
  if (!Array.isArray(prevUnlocked)) prevUnlocked = [];
  var newly = [];
  ACHIEVEMENTS.forEach(function(a) {
    if (prevUnlocked.indexOf(a.id) >= 0) return;
    try {
      if (a.unlock(state)) newly.push(a);
    } catch (e) {}
  });
  return newly;
}

// 해금 여부 조회
function isAchievementUnlocked(id, unlockedList) {
  return (unlockedList || []).indexOf(id) >= 0;
}

// 업적 통계 (UI용)
function getAchievementStats(unlockedList) {
  var visible = ACHIEVEMENTS.filter(function(a){return !a.hidden});
  var hidden = ACHIEVEMENTS.filter(function(a){return a.hidden});
  var unlocked = (unlockedList || []).length;
  return {
    total: ACHIEVEMENTS.length,
    visible: visible.length,
    hidden: hidden.length,
    unlocked: unlocked,
    percentage: Math.round((unlocked / ACHIEVEMENTS.length) * 100)
  };
}
