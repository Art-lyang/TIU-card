// TERMINAL SESSION — lang-ui-en.js
window.TS_I18N.mergeUI('en', {
  meta:{ title:'TERMINAL SESSION', titleBar:'ORACLE // TERMINAL SESSION' },
  boot:{
    startSession:'[ START SESSION {session} ]',
    startGame:'TAP TO ENTER TERMINAL',
    status:'BOOT SEQUENCE',
    console:'SYSTEM BOOT LOG',
    progress:'BOOT PROGRESS {progress}%',
    headerTitle:'ORACLE // KOREA BRANCH TERMINAL',
    sessionId:'SESSION ID: KR-B3-011',
    statusLabel:'STATUS:',
    statusUnstable:'UNSTABLE CONNECTION',
    feedTopLeft:'ORACLE KOREA BRANCH // INTERNAL USE ONLY',
    feedVersion:'TERMINAL SESSION v1.11',
    trace:'BOOT TRACE:',
    language:'Language',
    aria:'ORACLE terminal boot sequence',
    linesInitial:[
      'ORACLE REMOTE TERMINAL v4.7.2',
      'ESTABLISHING SECURE CONNECTION...',
      'ENCRYPTION: AES-256-GCM ✓',
      'AUTHENTICATION: BIOMETRIC + TOKEN ✓',
      'BRANCH: KR-INIT-001 [GANGWON]',
      'OPERATOR: PILEHEAD [LEE JUNG-CHEOL]',
      'CLEARANCE: LEVEL 4 — BRANCH COMMANDER',
      'GRANT: ACTIVE — TEMPORARY ACCESS',
      '─────────────────────────────',
      'TERMINAL SESSION — INITIATING...',
      '  ',
      'WELCOME, COMMANDER.',
      'YOUR DECISIONS SHAPE THE OUTCOME.'
    ],
    linesRepeat:[
      'ORACLE REMOTE TERMINAL v4.7.2',
      'ESTABLISHING SECURE CONNECTION...',
      'ENCRYPTION: AES-256-GCM ✓',
      'AUTHENTICATION: BIOMETRIC + TOKEN ✓',
      'BRANCH: KR-INIT-001 [GANGWON]',
      'OPERATOR: PILEHEAD [LEE JUNG-CHEOL]',
      'CLEARANCE: LEVEL 4 — BRANCH COMMANDER',
      'GRANT: ACTIVE — RENEWAL DETECTED',
      '─────────────────────────────',
      '[OBSERVER: SESSION RESUMED]',
      'PREVIOUS SESSION DATA: ARCHIVED',
      '  ',
      'WELCOME BACK, COMMANDER.',
      'THE OBSERVATION CONTINUES.'
    ]
  },
  menu:{
    startGame:'[ GAME START ]',
    continue:'[ CONTINUE ]',
    headerTitle:'ORACLE // KOREA BRANCH TERMINAL',
    sessionId:'SESSION ID: KR-B3-011',
    statusLabel:'STATUS:',
    statusUnstable:'UNSTABLE CONNECTION',
    timeLabel:'TIME: {time}',
    feedTopLeft:'ORACLE KOREA BRANCH // INTERNAL USE ONLY',
    securityLabel:'SECURITY LEVEL:',
    securityOrange:'ORANGE',
    feedLive:'FEED: LIVE',
    feedVersion:'TERMINAL SESSION v1.11',
    systemRestored:'SYSTEM RESTORED',
    operatorAuth:'OPERATOR AUTHENTICATION REQUIRED',
    selectRoute:'SELECT SESSION COMMAND',
    footerAuth:'AUTH: GUEST',
    footerVersion:'VER: 1.11.7',
    footerBuild:'BUILD: {build}',
    footerInternal:'ORACLE KOREA BRANCH - INTERNAL',
    savePicker:{
      title:'SAVE SLOT SELECT',
      help:'Manual save slots were detected. Select a session to resume.',
      slot:'SLOT {slot}',
      auto:'CONTINUE CURRENT AUTO SAVE',
      close:'CLOSE'
    },
    routes:{
      start:{title:'[ GAME START ]',sub:'FIELD COMMAND SIMULATION',action:'ENTER SESSION'},
      continue:{title:'[ CONTINUE ]',sub:'SAVED FIELD OPERATION',action:'RESUME SESSION'},
      new:{title:'[ NEW SESSION ]',sub:'FIELD COMMAND SIMULATION',action:'NEW SESSION'},
      archive:{title:'[ ARCHIVE ACCESS ]',sub:'ENTITY / INCIDENT / PERSONNEL DATA',action:'ACCESS ARCHIVE'},
      logs:{title:'[ LOGS ]',sub:'PREVIOUS SESSION LOGS',action:'VIEW LOGS'},
      miniguide:{title:'[ MINIGAME GUIDE ]',sub:'FIELD MODULE PRACTICE',action:'OPEN GUIDE'},
      endings:{title:'[ ENDINGS ]',sub:'SESSION OUTCOME RECORDS',action:'VIEW ENDINGS'},
      settings:{title:'[ SYSTEM SETTINGS ]',sub:'DISPLAY / AUDIO / LANGUAGE',action:'SYSTEM CONFIG'}
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
  objective:{
    label:'DAY OBJECTIVE',
    day1:'Complete Korea Branch initial stabilization.',
    act1:'Stabilize branch operations while preserving containment, resources, and trust.',
    act2:'Monitor external threats and balance ORACLE advisories with field judgment.',
    act3:'Trace nonstandard signals and secure critical evidence.',
    act4:'Prepare the final decision while preserving staff loyalty and branch survival.',
    critical:'Risk threshold detected. Stabilize the failing resource first.'
  },
  tutorial:{
    header:'ORACLE BRIEFING — {current}/{total}',
    skip:'[ SKIP TUTORIAL ]',
    steps:[
      { lines:['Initializing ORACLE greeting protocol.','','Welcome, PILEHEAD.','','You have been assigned as the first commander','of the ORACLE Proxy Network — Branch KR-INIT-001.','','Before [REDACTED], the unknown virus EV-Σ emerged.','The infected mutate into anomalies,','and major cities worldwide remain under lockdown.'], choices:[{label:'Continue',next:1}] },
      { lines:['[Mission Briefing]','','ORACLE classifies PROMETHEUS','as a hostile force.','','Your duties:','▸ Maintain quarantine zones and respond to anomalies','▸ Oversee base operations','▸ Execute ORACLE directives and monitor outside threats','','Four senior officers will support your command.'], choices:[{label:'Continue',next:2}] },
      { lines:['You must manage four core metrics.','','{{icon-c}} Containment — quarantine line integrity','{{icon-r}} Resources — food, medicine, equipment','{{icon-t}} Trust — confidence of branch personnel','{{icon-o}} Evaluation — ORACLE’s assessment of you','','If any metric reaches 0, the mission fails.','If Containment reaches 100, the operation also ends.','','← Left / Right →','Swipe the card to make your choice.','Tilt a card before committing to preview the projected stat changes.'], choices:[{label:'Start Session',next:-1}] }
    ],
    highlights:['PILEHEAD','ORACLE','EV-Σ','PROMETHEUS','[REDACTED]','Containment','Resources','Trust','Evaluation']
  },
  guide:{
    h1:'[ORACLE: Tilt the card to preview the projected outcome]',
    h2:'[ORACLE: {stat} approaching critical — recovery decisions advised]',
    h3:'[Night comms open: one conversation a day builds trust]',
    h4:'[Field modules can be practiced risk-free in Main Menu ▸ Minigame Guide]',
    h5:'[Warning: Containment 100 terminates the operation — overcontrol is also failure]'
  },
  guideProtocol:{
    s1:'[ CORE METRICS ]',
    c:'Containment — quarantine line integrity. Rises with control decisions, decays if neglected.',
    r:'Resources — food, medicine, equipment. Most operations consume them.',
    t:'Trust — confidence of branch personnel. Built through night comms and humane calls.',
    o:'Evaluation — ORACLE’s assessment of you. Reacts to directive compliance.',
    s2:'[ TERMINATION CONDITIONS ]',
    end1:'Any metric at 0 — the operation ends.',
    end2:'Containment at 100 — overcontrol is also recorded as failure.',
    s3:'[ DAILY STRUCTURE ]',
    day:'Decision cards → daily reward pick → night comms (one officer).',
    s4:'[ CONTROLS ]',
    op1:'Swipe a card fully left/right — commit the decision.',
    op2:'Tilt a card slightly — preview projected stat changes.',
    op3:'Keys 1–9 / Enter — quick select in menus and dialogue.',
    s5:'[ SUBSYSTEMS ]',
    sub1:'Investigation table — unlocks at night; combine evidence to restore hidden records.',
    sub2:'Facility expansion — approve proposal cards for permanent upgrades.',
    sub3:'Archive — browse unlocked records from the main menu.',
    sub4:'Manual snapshots — Settings ▸ SAVE keeps three slots.'
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
  mission:{ trustLabel:'TRUST' },
  briefing:{
    analysis:'Analyzed recent operational data.',
    enter:'[ ENTER ]'
  },
  missionDebug:{
    title:'FIELD TEST LAUNCHER',
    desc:'Temporary field-mission test menu. Choose a mission to launch its assigned minigame directly.',
    close:'Close',
    items:{
      m002:'M-002 / Signal Alignment / SPEC-011 Activity Zone Survey',
      mi01:'MI-01 / Quarantine Seal / Isolation Room Anomaly',
      mi04:'MI-04 / Authority Trace / Security Zone Auth Error',
      m010:'M-010 / Route Evade / SPEC-015 Track',
      mi05:'MI-05 / Scan Search / Missing Staff',
      mi03:'MI-03 / Sample Recovery / Lab Mutation',
      m003:'M-003 / Evidence Sort / Trace Review',
      mi02:'MI-02 / Log Reconstruction / CCTV Gap',
      m007:'M-007 / Latent Screen / Maximum Strike'
    }
  },
  facility:{
    mapTab:'Facility Map',
    manageTab:'Expansion Management',
    close:'[ Close ]',
    pending:'[PENDING APPROVAL]',
    approved:'[APPROVED - AWAITING REWARD PICK]',
    completed:'[COMPLETED]',
    uprisingTag:'INDEPENDENT INFRA',
    approve:'[ APPROVE ]',
    rewardPending:'Selectable during the next reward phase.',
    completedEffect:'Completed effect',
    rewardUnlocked:'Reward card added',
    empty:'No facility expansions are currently available.\nNew proposals will appear through operation cards.'
  },
  gameOver:{
    title:'─── SESSION #{session} TERMINATED ───',
    reportSection:'── ORACLE FINAL REPORT ──', duration:'Operation Duration: {days} days', resultDay:'Occurred on DAY {day}', stats:'Containment: {c} | Resources: {r} | Trust: {t} | Evaluation: {o}',
    restart:'[ RESTART SESSION — ACT 1 ]', ngPlus:'[ NEW GAME+ — ENHANCED START ]', logs:'Logs', archive:'Archive', endings:'Endings',
    grant:'GRANT: ACTIVE — RENEWAL AVAILABLE',
    msgHigh:'Thank you for your devoted service.', msgMid:'The session is now terminated. Results have been recorded.', msgLow:'Nonstandard operational patterns detected. Session data is under review...',
    reasons:{
      containmentLow:'Containment line collapse. Internal lockdown protocol activated — base disposal procedures have begun.',
      containmentHigh:'[GRANT EXPIRED — UPON_FULL_ESTABLISHMENT] Korean branch stabilization complete. Temporary authority has expired. Terminating session.',
      resourcesLow:'Resources depleted. Base functions have stalled.',
      trustLow:'Personnel trust collapsed. Branch staff have deserted.',
      evaluationLow:'ORACLE access revoked. Terminal connection has been terminated.'
    }
  },
  common:{
    cancel:'Cancel',
    confirm:'Confirm',
    next:'Next'
  },
  evening:{
    dayEnd:'END',
    selectChar:'You can speak with one senior officer.',
    factions:'FACTION RELATIONS',
    liveMatrix:'LIVE MATRIX',
    skip:'SKIP',
    skipConfirm:"Skip tonight's conversation?",
    noAvailableChat:'No additional conversation record is available tonight.',
    completedRole:'Conversation complete for today',
    lockedRole:'Unavailable for the rest of today',
    completeNote:"Today's conversation is complete. You can review the Evidence Table, then proceed to the next DAY.",
    completeNoteNoEvidence:"Today's conversation is complete. You can proceed to the next DAY.",
    proceedNextDay:'Proceed to Next DAY',
    returnToEvening:'Return to Evening Screen'
  },
  logs:{
    list:'← List',
    close:'Close',
    unlocked:'{current}/{total} records unlocked',
    locked:'{count} records remain locked'
  },
  endingGallery:{
    title:'SESSION ARCHIVE - ENDING GALLERY',
    summary:'Sessions: {sessions}  |  Endings: {unlocked} / {total}',
    back:'← Gallery',
    locked:'[Locked]',
    achieved:'Achieved',
    trophy:'TROPHY',
    hint:'HINT',
    trophyCard:'ENDING TROPHY',
    hintCard:'ENDING HINT CARD',
    hintCardShort:'HINT CARD',
    close:'Close'
  },
  settings:{
    title:'SETTINGS', close:'ESC', mainMenu:'MENU', tabs:{ sound:'SOUND', save:'SAVE', display:'DISPLAY', guide:'PROTOCOL', info:'INFO' },
    sound:'Sound', bgm:'Background Music', sfx:'Sound Effects', fontSize:'Text Size', visualFx:'Screen Effects', language:'Language',
    langKo:'한국어', langEn:'English', sizeSmall:'Small', sizeNormal:'Normal', sizeLarge:'Large', fxFull:'Full', fxReduced:'Reduced', fxOff:'Off',
    fxWarning:'⚠ If you are sensitive to flashes or screen shake, choose [Reduced] or [Off].', preview:'Preview: ORACLE TERMINAL SESSION sample text.',
    sessions:'Sessions', unlockedLogs:'Unlocked Logs', endingsFound:'Endings Found', snapshotSlots:'SNAPSHOT SLOTS', snapshotHelp:'Save at a desired day and reload later to compare different branching choices.',
    cloudTitle:'GOOGLE CLOUD SAVE',
    cloudUnavailable:'Google cloud save is not enabled yet. Local save remains active.',
    cloudDisconnected:'Google account not connected',
    cloudConnected:'Connected',
    cloudPending:'Sync pending...',
    cloudChecking:'Checking cloud save...',
    cloudConflict:'Save conflict',
    cloudSyncing:'Syncing...',
    cloudRestoring:'Restoring cloud save...',
    cloudError:'Cloud save error',
    cloudSignIn:'Connect Google',
    cloudSignOut:'Sign Out',
    cloudCheck:'Check Cloud Save',
    cloudUpload:'Upload Local Save',
    cloudRestore:'Restore Cloud Save',
    cloudDelete:'Delete Cloud Data',
    cloudLastSync:'Last sync',
    cloudAccount:'Account',
    cloudRestoreConfirm:'Cloud save will overwrite local progress and reload the session.',
    cloudDeleteConfirm:'Delete cloud save data for this Google account? Local save will remain on this device.',
    cloudWipeLocalOnly:'Cloud save is not deleted here. Use Delete Cloud Data first if you also want to clear the cloud record.',
    cloudLocalFirst:'Local save stays primary. When connected, current progress, logs, archive unlocks, endings, and snapshot slots can be synced.',
    cloudConfigHint:'Cloud sync will become available after account sync is enabled for this build.',
    cloudConflictTitle:'SAVE CONFLICT DETECTED',
    cloudConflictBody:'Cloud save and this device save are different. Choose which record to keep.',
    cloudLocalRecord:'This device',
    cloudRemoteRecord:'Cloud',
    cloudUseLocal:'Use This Device',
    cloudUseCloud:'Use Cloud Save',
    cloudNoRecord:'No saved record',
    cloudMetaOnly:'Meta only',
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
        doyunAlive:'Alive', doyunWounded:'Critical Wound', doyunMinorWound:'Minor Wound',
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
    fallbackCardMsg:'[ORACLE: Data stream temporarily suspended]\n\nWaiting for communication recovery...',
    fallbackCardLeft:'Wait',
    fallbackCardRight:'Retry connection',
    facilityAdded:'Facility expansion added to the reward pool', facilityPending:'Facility proposal moved to the pending list', facilityRegistered:'Facility expansion registered to the reward pool', facilityComplete:'[{title}] construction complete{suffix}', facilityDefault:'Facility', uprisingSuffix:' | internal record updated',
    observerError:'[ORACLE: System error — ERR:0x8F2A UNHANDLED EXCEPTION]', followupCardAdded:'[Follow-up card added] {id}',
    cStabilityAlert:'[ORACLE: KR-INIT-001 containment integrity {value}% — Korean branch stabilization is near]', snapshotSaved:'Slot {slot} saved (DAY {day})', snapshotEmpty:'Slot {slot} is empty', snapshotLoaded:'Slot {slot} loaded (DAY {day})', achievement:'[ Achievement ] {name}', companionsLost:'[Officers unable to join this operation: {names}]', companionsAll:'[All senior officers confirmed for deployment]', resourceReserveUsed:'[Emergency supplies found] Unregistered emergency stock was pulled from the rear storage bay. The task was completed, and resource depletion has been prevented once for this session.'
  }
});
