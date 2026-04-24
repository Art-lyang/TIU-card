// TERMINAL SESSION — lang-ui-en.js
window.TS_I18N.mergeUI('en', {
  meta:{ title:'TERMINAL SESSION', titleBar:'ORACLE // TERMINAL SESSION' },
  boot:{
    startSession:'[ START SESSION {session} ]',
    startGame:'[ Start Game ]'
  },
  menu:{
    startGame:'[ GAME START ]',
    continue:'[ CONTINUE ]'
  },
  hub:{
    title:'SCENARIO SELECT',
    progress:'{current} / {total}',
    backToSelect:'← Back to scenario select',
    exploreSwipe:'← Swipe to browse scenarios →',
    enter:'[ ENTER ]',
    continue:'[ CONTINUE ]',
    newGame:'[ NEW SESSION ]',
    start:'[ START ]',
    replayTutorial:'[ REPLAY TUTORIAL ]',
    scenarioDesc:{
      main:'Korean branch quarantine management scenario',
      dlc_green:'Sovari ruins, Africa — EV-Σ residual zone expedition',
      dlc_north:'Russian Arctic sector — signal blackout infiltration'
    }
  },
  stats:{
    title:'ORACLE STATUS — DAY {day}',
    c:'Containment', r:'Resources', t:'Trust', o:'Evaluation'
  },
  card:{
    facilityExpansion:'Facility Upgrade',
    oracleComm:'ORACLE Uplink',
    priority:'Priority: {priority}',
    priorityShort:{ high:'HIGH ■', mid:'MID ■', low:'LOW' },
    autoOverride:'⚠ AUTO-OVERRIDE',
    systemError:'⚠ SYSTEM ERROR — UNREGISTERED PROTOCOL',
    blockMsgs:[
      '[ORACLE: Command refusal detected — confirmation required]',
      '[ORACLE: Compliance protocol initializing]',
      '[ORACLE: Warning — noncompliance is being recorded]'
    ],
    none:'—'
  },
  scenario:{
    act:'ACT {act}',
    mission:'MIS {current}/{total}',
    log:'LOG {current}/{total}',
    archive:'ARC',
    archiveNew:'ARC {count} ●',
    facility:'FAC {done}/{total}',
    evidence:'EVD {count}',
    menu:'☰'
  },
  tutorial:{
    header:'ORACLE BRIEFING — {current}/{total}',
    skip:'[ SKIP TUTORIAL ]',
    steps:[
      { lines:['Initializing ORACLE greeting protocol.','','Welcome, PILEHEAD.','','You have been assigned as the first commander','of the ORACLE Proxy Network — Branch KR-INIT-001.','','Before [REDACTED], the unknown virus EV-Σ emerged.','The infected mutate into anomalies,','and major cities worldwide remain under lockdown.'], choices:[{label:'Continue',next:1}] },
      { lines:['[Mission Briefing]','','ORACLE classifies PROMETHEUS','as a hostile force.','','Your duties:','▸ Maintain quarantine zones and respond to anomalies','▸ Oversee base operations','▸ Execute ORACLE directives and monitor outside threats','','Four senior officers will support your command.'], choices:[{label:'Continue',next:2}] },
      { lines:['You must manage four core metrics.','','{{icon-c}} Containment — quarantine line integrity','{{icon-r}} Resources — food, medicine, equipment','{{icon-t}} Trust — confidence of branch personnel','{{icon-o}} Evaluation — ORACLE’s assessment of you','','If any metric reaches 0, the mission fails.','','← Left / Right →','Swipe the card to make your choice.'], choices:[{label:'Start Session',next:-1}] }
    ],
    highlights:['PILEHEAD','ORACLE','EV-Σ','PROMETHEUS','[REDACTED]','Containment','Resources','Trust','Evaluation']
  },
  news:{
    header:'[ORACLE // DAILY REPORT]',
    dayReport:'DAY {day} REPORT',
    sectionStatus:'[STATUS OVERVIEW]',
    sectionSituation:'[SITUATION REPORT]',
    sectionIntel:'[INTEL BRIEFING]',
    sectionFacility:'[FACILITY STATUS]',
    nextCycle:'[ PROCEED TO NEXT CYCLE ]',
    headlineAlert:'[ ORACLE // OPERATIONAL ALERT ]',
    headlineWarn1:'KR-INIT-001 containment integrity approaching threshold.',
    headlineWarn2:'Korean branch stabilization projected at 100% — temporary command privileges nearing expiration.',
    headlineWarn3:'Preparing GRANT EXPIRED sequence. Exercise caution in your choice.',
    assess:{
      high1:'Operational efficiency stable. Maintain current directive.',
      high2:'High compliance with ORACLE advisories. Korea Branch performance remains above average.',
      high3:'Commander trust index elevated. Expanded authority under review.',
      high4:'Branch stability reconfirmed. Additional clearance being considered.',
      mid1:'Operations stable. Minor nonstandard signals detected.',
      mid2:'Overall conditions nominal. Decision variance among personnel has slightly increased.',
      mid3:'Branch remains within normal bounds. Select indicators under observation.',
      mid4:'Average ORACLE compliance rate. Continued monitoring advised.',
      low1:'Nonstandard decision frequency increasing. Monitoring intensified.',
      low2:'Independent command patterns detected. Analysis ongoing.',
      low3:'Repeated deviation from ORACLE advisories logged.',
      low4:'Several nonstandard operational markers identified in branch telemetry.',
      veryLow1:'Multiple abnormal operational patterns detected. Caution advised.',
      veryLow2:'Commander trust index declining. Reassessment pending.',
      veryLow3:'ORACLE advisory override frequency entering risk threshold.',
      veryLow4:'Operational anomaly detected. Headquarters review under consideration.'
    }
  },
  reward:{ c:'Containment', r:'Resources', t:'Trust', o:'Evaluation', pickCount:'Choose 1 of {count}', footer:'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001' },
  fieldMission:{ title:'FIELD MISSION', trustTag:'[TRUST]', footer:'ORACLE REMOTE TERMINAL — FIELD OPS' },
  gameOver:{
    reportSection:'── ORACLE FINAL REPORT ──', duration:'Operation Duration: {days} days', stats:'Containment: {c} | Resources: {r} | Trust: {t} | Evaluation: {o}',
    restart:'[ RESTART SESSION — ACT 1 ]', ngPlus:'[ NEW GAME+ — ENHANCED START ]', logs:'Logs', archive:'Archive', endings:'Endings',
    msgHigh:'Thank you for your devoted service.', msgMid:'The session is now terminated. Results have been recorded.', msgLow:'Nonstandard operational patterns detected. Session data is under review...'
  },
  settings:{
    title:'SETTINGS', close:'ESC', tabs:{ sound:'SOUND', save:'SAVE', display:'DISPLAY', info:'INFO' },
    sound:'Sound', bgm:'Background Music', sfx:'Sound Effects', fontSize:'Text Size', visualFx:'Screen Effects', language:'Language',
    langKo:'한국어', langEn:'English', sizeSmall:'Small', sizeNormal:'Normal', sizeLarge:'Large', fxFull:'Full', fxReduced:'Reduced', fxOff:'Off',
    fxWarning:'⚠ If you are sensitive to flashes or screen shake, choose [Reduced] or [Off].', preview:'Preview: ORACLE TERMINAL SESSION sample text.',
    sessions:'Sessions', unlockedLogs:'Unlocked Logs', endingsFound:'Endings Found', snapshotSlots:'SNAPSHOT SLOTS', snapshotHelp:'Save at a desired day and reload later to compare different branching choices.',
    slotEmpty:'Empty Slot', slotSave:'Save', slotLoad:'Load', slotDelete:'Delete', resetCurrent:'Reset Current Session', wipeAll:'Delete All Data', cancel:'Cancel', confirm:'Confirm',
    overwriteHint:'Existing data will be overwritten.', deleteKey:'DELETE',
    typeDelete:'Type "DELETE" to continue', resetConfirm:'This resets the current active session.\nLogs and endings will be preserved.', wipeConfirm:'This deletes all data.\nLogs, endings, and session records will be lost.\nThis cannot be undone.',
    version:'Version', engine:'Engine', logsOpen:'Open LOG', archiveOpen:'Open ARCHIVE', archive:'Archive'
  },
  statusTags:{
    facility:{
      c:{ safe:'Containment Line Stable', warn:'Containment Line On Alert', danger:'Containment Line Fractured', critical:'Containment Collapse Imminent' },
      r:{ safe:'Supplies Sufficient', warn:'Supplies Stable', danger:'Supplies Unstable', critical:'Supply Depletion Imminent' },
      t:{ safe:'Unit Cohesion', warn:'Trust Maintained', danger:'Unrest Spreading', critical:'Desertion Risk' },
      o:{ safe:'ORACLE Confidence', warn:'Under Observation', danger:'Suspicion Rising', critical:'Replacement Under Review' }
    },
    character:{
      trust:{ low:'Guarded', mid:'Normal', high:'Cooperative', bond:'Trusted' },
      special:{
        haeunStay:'Staying Behind', haeunRecover:'Data Recovery In Progress',
        doyunAlive:'Alive', doyunWounded:'Wounded',
        sejinResearch:'Research Active', sejinAnalysis:'Analyzing',
        jaehyeokTech:'Technical Analysis', weberContact:'Contact Established', fosterInfo:'Intel Provided',
        soyoungExposed:'Identity Exposed', soyoungJoined:'Joined'
      }
    },
    situation:{
      cDrop:'Large-scale desertions reported along the containment line.', rDrop:'Supply volume is dropping rapidly.', tDrop:'Discontent is spreading rapidly among branch personnel.', oDrop:'ORACLE evaluation has fallen sharply. Caution advised.',
      cRise:'Containment reinforcement completed successfully.', rRise:'Major supplies have arrived. Resource conditions are stable.', tRise:'Personnel morale has risen significantly.',
      cLow:'⚠ The containment line has reached a critical threshold.', rLow:'⚠ Resource reserves are at a critical level.', tLow:'⚠ Desertion risk detected.', oLow:'⚠ ORACLE is reviewing command replacement.',
      cCritical:'Containment-line fractures persist. Immediate action required.', rCritical:'Supply depletion continues.',
      actStable:'Branch operations remain stable. Maintain current policy.', actCrisis:'A compound crisis is underway. Cross-department cooperation is required.'
    }
  },
  app:{
    facilityAdded:'Facility expansion added to the reward pool', facilityPending:'Facility proposal moved to the pending list', facilityRegistered:'Facility expansion registered to the reward pool', facilityComplete:'[{title}] construction complete{suffix}', facilityDefault:'Facility', uprisingSuffix:' | GI -2',
    cStabilityAlert:'[ORACLE: KR-INIT-001 containment integrity {value}% — Korean branch stabilization is near]', snapshotSaved:'Slot {slot} saved (DAY {day})', snapshotEmpty:'Slot {slot} is empty', snapshotLoaded:'Slot {slot} loaded (DAY {day})', achievement:'[ Achievement ] {name}', companionsLost:'[Officers unable to join this operation: {names}]', companionsAll:'[All senior officers confirmed for deployment]'
  }
});
