// TERMINAL SESSION — app.js (App 컴포넌트, 글로벌 유틸은 app-init.js)
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
var getLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};
function App(){
  var _p=useState('boot'),phase=_p[0],setPhase=_p[1];
  var _s=useState({c:50,r:65,t:50,o:40,day:1}),stats=_s[0],setStats=_s[1];
  var _g=useState(0),gi=_g[0],setGi=_g[1];
  var _ct=useState(0),ct=_ct[0],setCt=_ct[1];
  var _nh=useState([]),nh=_nh[0],setNh=_nh[1];
  var _gor=useState(''),gor=_gor[0],setGor=_gor[1];
  var _goday=useState(null),goDay=_goday[0],setGoDay=_goday[1];
  var _en=useState(null),endNarr=_en[0],setEndNarr=_en[1];
  var _eid=useState(null),endId=_eid[0],setEndId=_eid[1];
  var _fp=useState(true),fp=_fp[0],setFp=_fp[1];
  var _dlg=useState(null),curDlg=_dlg[0],setCurDlg=_dlg[1];
  var _ud=useState([]),usedDlg=_ud[0],setUsedDlg=_ud[1];
  var _ue=useState([]),usedEvening=_ue[0],setUsedEvening=_ue[1];
  var _sa=useState([]),seenArchive=_sa[0],setSeenArchive=_sa[1];
  var _logs=useState(['LOG-001']),logs=_logs[0],setLogs=_logs[1];
  var _ends=useState([]),endings=_ends[0],setEndings=_ends[1];
  var _sess=useState(0),sessions=_sess[0],setSessions=_sess[1];
  var _ret=useState('game'),ret=_ret[0],setRet=_ret[1];
  var _cc=useState(CARDS[0]),curCard=_cc[0],setCurCard=_cc[1];
  var _cm=useState(null),curMission=_cm[0],setCurMission=_cm[1];
  var _tr=useState({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40}),trust=_tr[0],setTrust=_tr[1];
  var _cq=useState([]),chainQueue=_cq[0],setChainQueue=_cq[1];
  var _cd=useState({}),cooldowns=_cd[0],setCooldowns=_cd[1];
  var _rc=useState([]),recentCards=_rc[0],setRecentCards=_rc[1];
  var _pv=useState(null),preview=_pv[0],setPreview=_pv[1];
  var _toast=useState(''),toast=_toast[0],setToast=_toast[1];
  var _tt2=useState(''),toastType=_tt2[0],setToastType=_tt2[1];
  var toastDuration=function(ms){return Math.round((ms||2400)*1.35)};
  var _toastTimer=useRef(null);
  var clearToastAfter=function(ms){if(_toastTimer.current)clearTimeout(_toastTimer.current);_toastTimer.current=setTimeout(function(){setToast('');_toastTimer.current=null},toastDuration(ms));return _toastTimer.current};
  var RESOURCE_RESERVE_KEY='ts_resourceReserveUsed';
  var isResourceReserveUsed=function(){return Save.get(RESOURCE_RESERVE_KEY,false)===true};
  var markResourceReserveUsed=function(){Save.set(RESOURCE_RESERVE_KEY,true)};
  var shouldUseResourceReserve=function(before,next,reward){
    var fx=(reward&&reward.fx)||{};
    return before&&next&&before.r>0&&next.r<=0&&((fx.r||0)<0)&&!isResourceReserveUsed();
  };
  var _act=useState(1),act=_act[0],setAct=_act[1];
  var _af=useState({prom_met:false,mission_done:false,chain_done:false,prom_mission:false}),actFlags=_af[0],setActFlags=_af[1];
  var _tr2=useState(''),transRoute=_tr2[0],setTransRoute=_tr2[1];
  var _fac=useState({approved:[],pending:[],completed:[],proposed:[]}),facility=_fac[0],setFacility=_fac[1];
  var _fot=useState(false),facOfferedToday=_fot[0],setFacOfferedToday=_fot[1];
  var _pb=useState(null),pendingBonus=_pb[0],setPendingBonus=_pb[1];
  var _cal=useState(-1),cAlertDay=_cal[0],setCAlertDay=_cal[1];
  var _a2r=useState(Save.get('ts_act2_reached',false)),act2Reached=_a2r[0],setAct2Reached=_a2r[1];
  // 신뢰도 변화는 플레이어에게 표시하지 않음 (GI처럼 숨김)
  var _ps=useState(null),prevStats=_ps[0],setPrevStats=_ps[1];
  var cpd=act===1?4:act===2?5:act===3?6:7;
  var SESSION_SCOPED_LOGS={'LOG-EV-UNLOCK':true,'LOG-ACT1-SKIP':true,'LOG-ACT2':true,'LOG-ACT3':true,'LOG-ACT4':true};
  var resetSessionLogs=function(src){
    var base=Array.isArray(src)?src:['LOG-001'];
    var seen={},out=[];
    base.forEach(function(id){
      if(!id||SESSION_SCOPED_LOGS[id]||id.indexOf('LOG-INTRO-')===0||id.indexOf('ONCE-')===0)return;
      if(!seen[id]){seen[id]=true;out.push(id)}
    });
    if(out.indexOf('LOG-001')<0)out.unshift('LOG-001');
    return out;
  };
  var uniqueFacilityIds=function(ids){
    var seen={},out=[];
    (Array.isArray(ids)?ids:[]).forEach(function(id){if(id&&!seen[id]){seen[id]=true;out.push(id)}});
    return out;
  };
  var normalizeFacilityState=function(fac){
    fac=fac||{};
    var completed=uniqueFacilityIds(fac.completed);
    var approved=uniqueFacilityIds(fac.approved).filter(function(id){return completed.indexOf(id)<0});
    var pending=uniqueFacilityIds(fac.pending).filter(function(id){return completed.indexOf(id)<0&&approved.indexOf(id)<0});
    var proposed=uniqueFacilityIds([].concat(fac.proposed||[],approved,pending,completed));
    return {approved:approved,pending:pending,completed:completed,proposed:proposed};
  };
  var facilityHasExpansion=function(fac,feId){
    var f=normalizeFacilityState(fac);
    return f.approved.indexOf(feId)>=0||f.pending.indexOf(feId)>=0||f.completed.indexOf(feId)>=0||f.proposed.indexOf(feId)>=0;
  };
  var registerFacilityExpansion=function(fac,feId,status){
    var next=normalizeFacilityState(fac);
    if(!feId||facilityHasExpansion(next,feId))return next;
    next.proposed.push(feId);
    if(status==='pending')next.pending.push(feId);
    else next.approved.push(feId);
    return next;
  };
  var completeFacilityExpansion=function(fac,feId){
    var next=normalizeFacilityState(fac);
    if(!feId||next.completed.indexOf(feId)>=0)return next;
    next.approved=next.approved.filter(function(id){return id!==feId});
    next.pending=next.pending.filter(function(id){return id!==feId});
    next.completed.push(feId);
    if(next.proposed.indexOf(feId)<0)next.proposed.push(feId);
    return normalizeFacilityState(next);
  };
  var shouldUseOracleLink=function(ph){
    return ph==='game'||ph==='news'||ph==='reward'||ph==='evening'||ph==='dialogue'||ph==='mission'||ph==='escape_game';
  };
  var deriveActFlags=function(prev,cardId,missionId,chainDone,dir){
    var next={prom_met:!!prev.prom_met,mission_done:!!prev.mission_done,chain_done:!!prev.chain_done,prom_mission:!!prev.prom_mission};
    if((cardId==='C-006'||cardId==='C-011')&&dir==='left')next.prom_met=true;
    if(missionId)next.mission_done=true;
    if(missionId==='M-003'||missionId==='M-007')next.prom_mission=true;
    if(chainDone)next.chain_done=true;
    return next;
  };
  var persistGame=function(s,g,a,af,tr,cd,rc,curCt,cq,fac,pb,cm,ph){
    Save.saveGame(
      s,g,a,af,tr,
      cd||cooldowns,
      rc||recentCards,
      typeof curCt==='number'?curCt:ct,
      cq||chainQueue,
      pb!==undefined?pb:pendingBonus,
      cm!==undefined?cm:curMission,
      ph!==undefined?ph:phase
    );
    if(fac)Save.saveFacility(fac);
  };
  useEffect(function(){
    var root=document.getElementById('root');
    var cls='act-'+(act||1);
    if(root){var rootCls=cls;if(shouldUseOracleLink(phase)&&!showSettings&&!showFacility&&!showEvidence)rootCls+=' oracle-link-active';if(glitchLevel>0&&fxMode!=='off'){rootCls+=' glitch-l'+glitchLevel}if(fxMode==='reduced')rootCls+=' fx-reduced';if(fxMode==='off')rootCls+=' fx-off';root.className=rootCls}
    if(document.body){document.body.classList.remove('act-1','act-2','act-3','act-4');document.body.classList.add(cls)}
  },[act,phase,glitchLevel,fxMode,showSettings,showFacility,showEvidence]);
  useEffect(function(){
    var sl=Save.getLogs();if(sl){setLogs(sl);if(typeof window!=='undefined')window.__ts_liveLogs=sl.slice();}
    var se=Save.getEndings();if(se)setEndings(se);
    setSessions(Save.getSessions());
    var st=Save.get('ts_trust',null);if(st)setTrust(st);
    var sud=Save.getUsedDlg();if(sud&&sud.length)setUsedDlg(sud);
    var sue=Save.getUsedEvening();if(sue&&sue.length)setUsedEvening(sue);
    var ssa=Save.getSeenArchive();if(ssa&&ssa.length)setSeenArchive(ssa);
    var sf=Save.getFacility();if(sf){sf=normalizeFacilityState(sf);Save.saveFacility(sf);setFacility(sf)}
    var sg=Save.get('ts_game',null);
    // 기존 세이브 마이그레이션: legacy onceShown과 초반 once 카드 ONCE 플래그 병합
    if(sg&&sg.stats&&sl){var beforeOnceLen=sl.length;if(typeof migrateOnceShownLogs==='function')sl=migrateOnceShownLogs(sl,Save.get('ts_onceShown',[]));if(sg.stats.day>1){['CA-001','CA-001B','CA-002','CA-003','CA-004','CA-005','CA-006'].forEach(function(cid){if(sl.indexOf('ONCE-'+cid)<0)sl.push('ONCE-'+cid)})}if(sl.length!==beforeOnceLen){Save.saveLogs(sl);setLogs(sl);if(typeof window!=='undefined')window.__ts_liveLogs=sl.slice();}}
    if(sg&&sg.act){setAct(sg.act);if(sg.actFlags)setActFlags(sg.actFlags);if(typeof sg.transRoute==='string')setTransRoute(sg.transRoute);if(sg.cooldowns)setCooldowns(sg.cooldowns);if(sg.recentCards)setRecentCards(sg.recentCards);if(typeof sg.ct==='number')setCt(sg.ct)}
    else{sl=resetSessionLogs(sl||['LOG-001']);Save.saveLogs(sl);setLogs(sl);Save.del('ts_combos');Save.del('ts_evidence_used');setUsedDlg([]);Save.saveUsedDlg([]);setUsedEvening([]);Save.saveUsedEvening([])}
    // ═══ 세이브 복원: stats/gi 로드 (기존 누락 수정) ═══
    var initStats={c:50,r:65,t:50,o:40,day:1};
    var initGi=0;
    if(sg&&sg.stats){initStats=sg.stats;setStats(sg.stats);initGi=sg.gi||0;setGi(initGi)}
    if(sg&&sg.pendingBonus)setPendingBonus(sg.pendingBonus);
    var initAct=(sg&&sg.act)||1;
    var initCd=(sg&&sg.cooldowns)||{};
    var initRecent=(sg&&sg.recentCards)||[];
    var initRoute=(sg&&typeof sg.transRoute==='string')?sg.transRoute:'';
    loadActiveSpecs();
    if(sg&&sg.sessionDeck&&typeof setActiveSessionDeck==='function')setActiveSessionDeck(sg.sessionDeck);
    else if(typeof loadSessionDeck==='function')loadSessionDeck();
    var initQueue=(sg&&Array.isArray(sg.chainQueue))?sg.chainQueue.map(function(c){return typeof c==='string'?(typeof CARD_BY_ID!=='undefined'?CARD_BY_ID[c]:null):c}).filter(Boolean):[];
    if(initQueue.length>0){setCurCard(initQueue[0]);setChainQueue(initQueue.slice(1))}
    else{setCurCard(drawCard(initStats,initGi,sl||['LOG-001'],initCd,initRecent,initAct,initRoute, sf||{approved:[],pending:[],completed:[],proposed:[]}))}
  },[]);
  useEffect(function(){ if(typeof window!=='undefined')window.__ts_liveLogs=(logs||['LOG-001']).slice(); },[logs]);
  var _bgmMuted=useState(false),bgmMuted=_bgmMuted[0],setBgmMuted=_bgmMuted[1];
  var _showSettings=useState(false),showSettings=_showSettings[0],setShowSettings=_showSettings[1];
  var _showFacility=useState(false),showFacility=_showFacility[0],setShowFacility=_showFacility[1];
  var _showEvidence=useState(false),showEvidence=_showEvidence[0],setShowEvidence=_showEvidence[1];
  var _achievements=useState(function(){return Save.getAchievements()}),achievements=_achievements[0],setAchievements=_achievements[1];
  var _glitch=useState(0),glitchLevel=_glitch[0],setGlitchLevel=_glitch[1];
  var _fxMode=useState(function(){return Save.get('ts_fxMode','full')}),fxMode=_fxMode[0],setFxMode=_fxMode[1];
  useEffect(function(){var sv=Save.get('ts_volume',null);if(sv!==null&&typeof BGM!=='undefined')BGM.vol=sv/100;var sm=Save.get('ts_muted',null);if(sm===true&&typeof BGM!=='undefined'){BGM.muted=true;setBgmMuted(true)};if(sm===true&&typeof SFX!=='undefined')SFX.muted=true;var sfv=Save.get('ts_sfxVol',null);if(sfv!==null&&typeof SFX!=='undefined')SFX.vol=sfv/100;var fs=Save.get('ts_fontSize','normal');if(fs!=='normal'){var r=document.getElementById('root');if(r)r.classList.add('fs-'+fs)}},[]);
  useEffect(function(){var h2=function(e){if(e.key==='Escape'&&phase==='game'&&!showSettings)setShowSettings(true)};window.addEventListener('keydown',h2);return function(){window.removeEventListener('keydown',h2)}},[phase,showSettings]);
  var getLiveLogs=function(fallback){
    if(typeof window!=='undefined'&&Array.isArray(window.__ts_liveLogs))return window.__ts_liveLogs.slice();
    return Array.isArray(fallback)?fallback.slice():(Array.isArray(logs)?logs.slice():['LOG-001']);
  };
  var tryUnlock=function(id){
    if(!id)return;
    var cur=getLiveLogs(logs);
    if(cur.indexOf(id)>=0)return;
    var n=cur.concat([id]);
    if(typeof window!=='undefined')window.__ts_liveLogs=n.slice();
    Save.saveLogs(n);
    setLogs(n);
    if(id.indexOf('LOG-')===0&&id.indexOf('LOG-INTRO-')!==0&&!SESSION_SCOPED_LOGS[id]&&typeof SFX!=='undefined')SFX.play('alarm');
    if(typeof CHAINS!=='undefined'){
      Object.keys(CHAINS).forEach(function(k){
        var ch=CHAINS[k];
        if(ch&&ch.triggerLog===id&&Array.isArray(ch.cards)&&ch.cards.length>0){
          var cq=ch.cards.slice();
          setChainQueue(cq);
          // pendingBonus 인수를 누락하면 직전 거절 보너스가 세이브에서 사라진다.
          Save.saveGame(stats,gi,act,actFlags,transRoute,cooldowns,recentCards,ct,cq,pendingBonus);
        }
      });
    }
  };
  var modTrust=function(char,delta){setTrust(function(prev){var key={"\uc11c\ud558\uc740":"haeun","\uac15\ub3c4\uc724":"doyun","\uc724\uc138\uc9c4":"sejin","\uc784\uc7ac\ud601":"jaehyuk","\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84":"weber","\ub2c9 \ud3ec\uc2a4\ud130":"foster","\ubc15\uc18c\uc601":"soyoung",haeun:"haeun",doyun:"doyun",sejin:"sejin",jaehyuk:"jaehyuk",weber:"weber",foster:"foster",soyoung:"soyoung"}[char];if(!key)return prev;var next={};for(var k in prev)next[k]=prev[k];next[key]=Math.max(0,Math.min(100,(prev[key]||0)+delta));Save.set('ts_trust',next);
    return next})};
  // checkLogs 래퍼: app-logic.js의 checkLogsAll 호출
  var checkLogs=function(s,g,cid,dc,di,dir){checkLogsAll(s,g,cid,dc,di,dir,logs,trust,tryUnlock)};
  var previewDelta=function(before,after){return{__delta:true,c:(after.c||0)-(before.c||0),r:(after.r||0)-(before.r||0),t:(after.t||0)-(before.t||0),o:(after.o||0)-(before.o||0)}};
  var getChoicePreviewDelta=function(card,dir){
    if(!card||!dir||!card[dir])return null;
    var ch=card[dir]||{},fx=ch.fx||{},ns=applyFx(stats,fx),ng=gi+(ch.g||0);
    if(!card.isFacilityProposal){
      if(ch.floor){['c','r','t','o'].forEach(function(k){if(ch.floor[k]!==undefined&&ns[k]<ch.floor[k]&&(!ch.floorCriticalOnly||ns[k]<=20))ns[k]=ch.floor[k]})}
      if(pendingBonus){var pb=pendingBonus;ns.c=clamp(ns.c+(pb.c||0)*5);ns.r=clamp(ns.r+(pb.r||0)*5);ns.t=clamp(ns.t+(pb.t||0)*5);ns.o=clamp(ns.o+(pb.o||0)*5)}
      var tuned=(typeof applyChoiceBalanceTuning==='function')?applyChoiceBalanceTuning(stats,gi,ns,ng,card,ch,logs,act):null;
      if(tuned&&tuned.stats)ns=tuned.stats;
    }
    return previewDelta(stats,ns);
  };
  var getRewardPreviewDelta=function(r){
    var ns=applyFx(stats,(r&&r.fx)||{});ns.c=Math.max(0,ns.c);ns.r=Math.max(0,ns.r);ns.t=Math.max(0,ns.t);ns.o=Math.max(0,ns.o);
    if(act===3){var act3LoyalRelief=gi>=35||transRoute==='A4_COMPLY';ns.c=Math.max(0,ns.c-5);ns.r=Math.max(0,ns.r-(act3LoyalRelief?0:5))}
    if(act===4){var loyalRelief=gi>=40||transRoute==='A4_COMPLY';ns.c=Math.max(0,ns.c-10);ns.r=Math.max(0,ns.r-(loyalRelief?5:10));ns.t=Math.max(0,ns.t-(loyalRelief?0:5))}
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1},nextGi=gi;
    if(shouldUseResourceReserve(stats,next,r))next.r=5;
    var rewardTuned=(typeof applyRewardBalanceTuning==='function')?applyRewardBalanceTuning(stats,next,nextGi,r,act):null;
    if(rewardTuned&&rewardTuned.stats)next=rewardTuned.stats;
    return previewDelta(stats,next);
  };
  var doGO=function(reason,ns,ng,specialId){ns=ns||stats;BGM.stop();setGor(reason);setGoDay(ns.day||stats.day);var eid=specialId||null;if(!eid){if(ns.c<=0)eid='C_c';else if(ns.c>=100)eid=(logs.indexOf('LOG-050')>=0&&logs.indexOf('LOG-082')>=0)?'C_cst':'C_cs';else if(ns.r<=0)eid='C_r';else if(ns.t<=0)eid='C_t';else if(ns.o<=0)eid='C_o';else if(ng>=60)eid='A'}if(eid&&ENDING_DEFS[eid])setEndNarr(ENDING_DEFS[eid]);else setEndNarr(null);setEndId(eid);if(eid)Save.saveEnding(eid);setEndings(Save.getEndings());setSessions(Save.incSession());Save.clearGame();
    // 히든 엔딩(F) 글리치 L3 연출 — 엔딩 전환 전 4초 오버레이
    var goDelay=500;if((eid==='F'||eid==='B')&&fxMode!=='off'){triggerGlitch(3);goDelay=3800}
    setTimeout(function(){setPhase('go')},goDelay)};
  var tryDlg=function(logsOverride){
    var lg=Array.isArray(logsOverride)?logsOverride:logs;
    var av=DIALOGUES.filter(function(d,i){if(usedDlg.indexOf(i)>=0)return false;if(d.char==='\uc11c\ud558\uc740'&&lg.indexOf('LOG-050')>=0)return false;if(d.char==='\uac15\ub3c4\uc724'&&lg.indexOf('LOG-075')>=0)return false;if(d.logReq&&lg.indexOf(d.logReq)<0)return false;if(d.actReq&&act<d.actReq)return false;if(d.trustReq&&!d.trustReq(trust))return false;var earlier=false;DIALOGUES.forEach(function(d2,j){if(j<i&&d2.char===d.char&&usedDlg.indexOf(j)<0&&(!d2.trustReq||d2.trustReq(trust))&&(!d2.logReq||lg.indexOf(d2.logReq)>=0))earlier=true});return!earlier});
    if(!isIntrosDone(lg)){var introAv=av.filter(function(d){return isIntroDlgCheck(d,DIALOGUES.indexOf(d))});if(introAv.length>0){var d=pick(introAv);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false}
    // 박소영 합류 후 첫 대화 보장
    if(lg.indexOf('LOG-082')>=0&&lg.indexOf('LOG-INTRO-SY')<0){var syAv=av.filter(function(d){return d.char==='\ubc15\uc18c\uc601'});if(syAv.length>0){var d=syAv[0];setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}}
    var prob=0.35;if(av.length>0&&Math.random()<prob){var d=pick(av);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false};
  var nextCard=function(s,g,lg,cq,curAct,cdOverride,rcOverride,trOverride,facOverride){var a=curAct||act;var useCd=cdOverride||cooldowns;var useRecent=rcOverride||recentCards;var useRoute=typeof trOverride==='string'?trOverride:transRoute;var useFacility=facOverride||facility;var liveLg=getLiveLogs(lg);if(cq&&cq.length>0){setCurCard(cq[0]);setChainQueue(cq.slice(1))}else{var c=drawCard(s,g,liveLg,useCd,useRecent,a,useRoute,useFacility);if(!c){c={id:'SYS-FALLBACK',msg:tt('app.fallbackCardMsg',null,'[ORACLE: 데이터 스트림 일시 중단]\n\n통신 복구 대기 중...'),left:{label:tt('app.fallbackCardLeft',null,'대기'),fx:{},g:0},right:{label:tt('app.fallbackCardRight',null,'재접속 시도'),fx:{},g:0}}}setCurCard(c);setRecentCards(function(p){var base=rcOverride||p;var n=base.concat([c.id]);return n.length>60?n.slice(n.length-60):n})}};
  // Act 전환 판정은 app-logic.js의 checkActTransitionLogic 단일 경로만 사용한다.
  // TIME_UP 디스패치: day>35 도달 시 상태(GI/신뢰) 기반 엔딩 강제 부여
  var resolveTimeUp=function(s,g,tr,lg){
    var highT=0;if(tr){if(tr.haeun>=65)highT++;if(tr.doyun>=65)highT++;if(tr.sejin>=65)highT++;if(tr.jaehyuk>=65)highT++;}
    if(g>=40)return'A';
    if(g<=-20&&highT>=1)return'D';
    if(g<=-15)return'B';
    return'G';
  };
  var updateActFlags=function(cardId,missionId,chainDone,dir){
    var next=deriveActFlags(actFlags,cardId,missionId,chainDone,dir);
    setActFlags(next);
    return next;
  };
  var doBriefing=function(newAct,s,route){
    setAct(newAct);setTransRoute(route);
    if(newAct===2){tryUnlock('LOG-ACT2');Save.set('ts_act2_reached',true);setAct2Reached(true);}
    if(newAct===3)tryUnlock('LOG-ACT3');
    if(newAct===4)tryUnlock('LOG-ACT4');
    var statPenalty=newAct===4
      ?(route==='A4_COMPLY'?0:5)
      :(newAct===3?((route==='A'||route==='B'||route==='C')?5:10):(route==='A'?0:5));
    if(statPenalty>0){var ns={c:clamp(s.c-statPenalty),r:clamp(s.r-statPenalty),t:clamp(s.t-statPenalty),o:clamp(s.o-statPenalty),day:s.day};setStats(ns)}
    if(typeof BGM!=='undefined'&&BGM.playAct)BGM.playAct(newAct);
    setPhase('briefing');
  };
  var _glitchTimer=useRef(null);
  var triggerGlitch=function(level){
    if(!level||level<=0)return;
    if(fxMode==='off')return;
    if(_glitchTimer.current)clearTimeout(_glitchTimer.current);
    var lvl=fxMode==='reduced'?Math.min(level,2):level;
    setGlitchLevel(lvl);
    var defaultDur=lvl===1?400:lvl===2?1500:3500;
    var dur=fxMode==='reduced'?Math.floor(defaultDur*0.5):defaultDur;
    _glitchTimer.current=setTimeout(function(){setGlitchLevel(0);_glitchTimer.current=null},dur);
  };
  var buildEvidenceFallbackDialogue=function(){
    var en=getLocale()==='en';
    var repeatSession=sessions>0;
    var enFirstLines=[
      'Commander, the investigation table is not online yet.',
      'If leads keep scattering from here, it will be difficult to preserve their sequence later.',
      'I will open the evidence analysis module with commander-only access for now.'
    ];
    var enRepeatLines=[
      'Commander, the investigation table should still be empty, but entries I never collected have already appeared.',
      'Some records were generated automatically before we attached a source. I do not know what process did this.',
      'I will open the evidence analysis module with commander-only access for now.'
    ];
    var koFirstLines=[
      '지휘관님. 조사테이블이 아직 열려 있지 않습니다.',
      '지금부터 단서가 흩어지기 시작하면 나중에 기록 순서를 맞추기 어렵습니다.',
      '일단 지휘관 전용 권한으로 증거 분석 모듈을 열어두겠습니다.'
    ];
    var koRepeatLines=[
      '지휘관님, 조사테이블은 아직 비어 있어야 하는데... 제가 수집하지 않은 항목들이 이미 생성돼 있습니다.',
      '출처를 붙이기 전에 자동으로 만들어진 로그가 있습니다. 어떤 프로세스가 이렇게 한 건지 모르겠습니다.',
      '일단 지휘관 전용 권한으로 증거 분석 모듈을 열어두겠습니다.'
    ];
    return {
      id:'DLG-EV-FORCE-ACT3',
      char:'\uc784\uc7ac\ud601',
      role:en?'Technical Officer':'\uae30\uc220\uad00',
      lines:en?(repeatSession?enRepeatLines:enFirstLines):(repeatSession?koRepeatLines:koFirstLines),
      choices:en?[
        {label:'Activate the investigation table',tag:'Analysis',reply:'Authorization confirmed. The evidence table is now available from the terminal.',fx:{},g:0,trust:3,log:'LOG-EV-UNLOCK'},
        {label:'Open it with minimum privileges',tag:'Cold',reply:'Understood. I will keep it to read-only analysis access.',fx:{},g:0,trust:1,log:'LOG-EV-UNLOCK'}
      ]:[
        {label:'\uc870\uc0ac\ud14c\uc774\ube14\uc744 \ud65c\uc131\ud654\ud574',tag:'\ubd84\uc11d',reply:'\uad8c\ud55c \ud655\uc778 \uc644\ub8cc. \uc774\uc81c \ub2e8\ub9d0\uae30\uc5d0\uc11c \uc99d\uac70 \ud14c\uc774\ube14\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',fx:{},g:0,trust:3,log:'LOG-EV-UNLOCK'},
        {label:'\ucd5c\uc18c \uad8c\ud55c\uc73c\ub85c\ub9cc \uc5f4\uc5b4\ub450\ub77c',tag:'\uc2e0\uc911',reply:'\uc54c\uaca0\uc2b5\ub2c8\ub2e4. \uc5f4\ub78c \ubc0f \uad50\ucc28 \ubd84\uc11d \uad8c\ud55c\ub9cc \ubd80\uc5ec\ud558\uaca0\uc2b5\ub2c8\ub2e4.',fx:{},g:0,trust:1,log:'LOG-EV-UNLOCK'}
      ]
    };
  };
  var shouldForceEvidenceUnlock=function(lg){
    return act>=3&&lg.indexOf('LOG-EV-UNLOCK')<0;
  };
  var triggerEvidenceUnlockDialogue=function(){
    setCurDlg(buildEvidenceFallbackDialogue());
    setPhase('dialogue');
  };
  useEffect(function(){
    if(phase!=='game')return;
    var lg=getLiveLogs(logs);
    if(shouldForceEvidenceUnlock(lg))triggerEvidenceUnlockDialogue();
  },[phase,act,logs]);
  var swipe=function(dir){
    SFX.play('swipe');setToast('');
    var pendingBonusForSave=pendingBonus||null;
    // 카드 글리치 트리거 — 스와이프 시작 시점에 발동
    if(curCard&&curCard.glitch)triggerGlitch(curCard.glitch);
    if(curCard.isFacilityProposal){
      var feId=curCard.feId;
      var fpChoice=dir==='left'?curCard.left:curCard.right;
      var fpStats=applyFx(stats,(fpChoice&&fpChoice.fx)||{}),fpGi=gi+((fpChoice&&fpChoice.g)||0);
      setStats(fpStats);setGi(fpGi);
      var fpFacility=registerFacilityExpansion(facility,feId,dir==='right'?'approved':'pending');
      setFacility(fpFacility);Save.saveFacility(fpFacility);
      if(dir==='right'){setToastType('');setToast(tt('app.facilityAdded',null,'시설 확장이 보상 풀에 추가되었습니다'));clearToastAfter(2200)}
      else{setToastType('');setToast(tt('app.facilityPending',null,'확장 제안이 대기 목록에 추가되었습니다'));clearToastAfter(2200)}
      var nct=ct+1;setCt(nct);
      persistGame(fpStats,fpGi,act,actFlags,transRoute,cooldowns,recentCards,nct,chainQueue,fpFacility);
      if(chainQueue&&chainQueue.length>0){nextCard(fpStats,fpGi,logs,chainQueue,act,cooldowns,recentCards,transRoute,fpFacility)}
      else if(nct>=cpd){SFX.play('news');setNh(genNewsHeadlines(fpStats,fpGi,logs));setTimeout(function(){setPhase('news')},400)}
      else{nextCard(fpStats,fpGi,logs,chainQueue,act,cooldowns,recentCards,transRoute,fpFacility)}
      return;
    }
    var ch=dir==='left'?curCard.left:curCard.right;
    var fx=ch.fx||{};
    var ns=applyFx(stats,fx),ng=gi+(ch.g||0);
    if(ch.floor){['c','r','t','o'].forEach(function(k){if(ch.floor[k]!==undefined&&ns[k]<ch.floor[k]&&(!ch.floorCriticalOnly||ns[k]<=20))ns[k]=ch.floor[k]})}
    if(pendingBonus){var pb=pendingBonus;ns.c=clamp(ns.c+(pb.c||0)*5);ns.r=clamp(ns.r+(pb.r||0)*5);ns.t=clamp(ns.t+(pb.t||0)*5);ns.o=clamp(ns.o+(pb.o||0)*5);var pbMsg=(getLocale()==='en'&&pb.msgEn)?pb.msgEn:pb.msg;pendingBonusForSave=null;setPendingBonus(null);setTimeout(function(){setToastType('');setToast(pbMsg);clearToastAfter(2400)},600)}
    var tuned=(typeof applyChoiceBalanceTuning==='function')?applyChoiceBalanceTuning(stats,gi,ns,ng,curCard,ch,logs,act):null;
    if(tuned&&tuned.stats){ns=tuned.stats;if(typeof tuned.gi==='number')ng=tuned.gi}
    setStats(ns);setGi(ng);
    var ncd={};for(var k in cooldowns)ncd[k]=cooldowns[k];if(curCard.id)ncd[curCard.id]=stats.day;if(curCard.tag)ncd[curCard.tag]=stats.day;setCooldowns(ncd)
    checkLogs(ns,ng,curCard.id,null,null,dir);
    if(ch.log){if(Array.isArray(ch.log))ch.log.forEach(function(l){tryUnlock(l)});else tryUnlock(ch.log)}
    if(curCard.once)tryUnlock('ONCE-'+curCard.id);
    var nextLogs=getLiveLogs(logs);
    // CA-OBS-PROTO has ordinary visible fx, plus this one-time hidden approval log/glitch branch.
    if(curCard.id==='CA-OBS-PROTO'){try{localStorage.setItem('ts_observer_proto','seen')}catch(e){}if(dir==='left'){tryUnlock('LOG-OBSERVER-APPROVED')}SFX.play('glitch');setTimeout(function(){setToastType('alert');setToast(tt('app.observerError',null,'[ORACLE: 시스템 에러 — ERR:0x8F2A UNHANDLED EXCEPTION]'));clearToastAfter(3200)},500)}
    var rwdKey=curCard.id+'-'+dir;if(typeof RECON_TRIGGERS!=='undefined'&&RECON_TRIGGERS[rwdKey])tryUnlock(RECON_TRIGGERS[rwdKey]);if(typeof REFUSAL_BONUSES!=='undefined'&&REFUSAL_BONUSES[rwdKey]){pendingBonusForSave=REFUSAL_BONUSES[rwdKey];setPendingBonus(pendingBonusForSave)}
    var isChainDone=curCard.id.indexOf('CH-')===0&&chainQueue.length===0;
    var nextActFlags=updateActFlags(curCard.id,ch.mission?ch.mission:null,isChainDone,dir);

    var facilityForNext=facility;
    if(ch.fePropose){var fpId=ch.fePropose;if(!facilityHasExpansion(facility,fpId)){facilityForNext=registerFacilityExpansion(facility,fpId,'approved');setFacility(facilityForNext);Save.saveFacility(facilityForNext);setToastType('');setToast(tt('app.facilityRegistered',null,'시설 확장이 보상 풀에 등록되었습니다'));clearToastAfter(2200)}}
    var isDanger=ns.c<=25||ns.r<=25||ns.t<=25||ns.o<=25;BGM.setDanger(isDanger);
    var nct=ct+1;setCt(nct);
    persistGame(ns,ng,act,nextActFlags,transRoute,ncd,recentCards,nct,chainQueue,facilityForNext,pendingBonusForSave);
    // endTrigger: 루트 클라이맥스 카드 → 해당 엔딩 강제 발동 (게임오버 체크 우선)
    var et=ch.endTrigger||curCard.endTrigger;
    if(et&&ENDING_DEFS&&ENDING_DEFS[et]){SFX.play('gameover');doGO(ENDING_DEFS[et].name,ns,ng,et);return}
    // CH-007-3: 낙오 판정 (trust 기반 roll → ACCOMP-* 로그 부여, 체인 흐름은 계속)
    if(curCard.id==='CH-007-3'&&typeof window.resolveAccomp==='function'){var _acc=window.resolveAccomp(trust);_acc.accomp.forEach(function(a){tryUnlock(a.log)});if(_acc.loss.length>0){setTimeout(function(){setToastType('');setToast(tt('app.companionsLost',{names:_acc.loss.map(function(l){return l.name}).join(', ')},'[이번 작전에 함께하지 못한 동료: '+_acc.loss.map(function(l){return l.name}).join(', ')+']'));clearToastAfter(3800)},800)}else{setTimeout(function(){setToastType('');setToast(tt('app.companionsAll',null,'[간부진 전원 동행 확정]'));clearToastAfter(2800)},800)}}
    // CH-007-5: 탈출 미니게임 진입 (iframe 연동) — 결과는 postMessage로 수신
    if(curCard.id==='CH-007-5'){setPhase('escape_game');return}
    // CA-001B right: 2회차+ ORACLE 적응기간 생략 — Act 2 직행
    if(curCard.id==='CA-001B'&&dir==='right'){
      tryUnlock('LOG-ACT1-SKIP');
      var skipStats={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:5};
      var skipFlags=deriveActFlags(nextActFlags,null,null,false);
      skipFlags.act1_skipped=true;
      setStats(skipStats);setActFlags(skipFlags);
      persistGame(skipStats,ng,2,skipFlags,'A',ncd,recentCards,0,[],facilityForNext,pendingBonusForSave);
      setTimeout(function(){doBriefing(2,skipStats,'A')},500);
      return;
    }
    // ═══ 폐쇄회로 발각 체크: PHASE1 이후 GI ≤ -40이면 ORACLE 감지 ═══
    if(typeof UPRISING_FAIL_CARD!=='undefined'
      && nextLogs.indexOf('LOG-UPRISING-PHASE1')>=0
      && nextLogs.indexOf('LOG-UPRISING-FAIL')<0
      && nextLogs.indexOf('LOG-UPRISING-CLEAR')<0
      && ng<=-40){
      tryUnlock('LOG-UPRISING-FAIL');
      SFX.play('glitch');
      setCurCard(UPRISING_FAIL_CARD);
      return;
    }
    if(ns.c>=100){var goC=chkGameOver(ns);if(goC){SFX.play('gameover');doGO(goC,ns,ng);return}}
    var sg=(typeof getRouteSafeguardCard==='function')?getRouteSafeguardCard(ns,ng,nextLogs,transRoute):null;
    if(sg){SFX.play('glitch');setCurCard(sg);return}
    var go=chkGameOver(ns);
    if(go){SFX.play('gameover');doGO(go,ns,ng);return}
    if(ch.mission&&MISSIONS[ch.mission]){SFX.play('reload');setCurMission(ch.mission);setTimeout(function(){setPhase('mission')},400);return}
    var triggerKey=curCard.id+'-'+dir;var chain=null;
    Object.keys(CHAINS).forEach(function(k){if(CHAINS[k].trigger===triggerKey)chain=CHAINS[k]});
    var cq=chainQueue;if(chain){SFX.play('glitch');cq=chain.cards;setChainQueue(cq);persistGame(ns,ng,act,nextActFlags,transRoute,ncd,recentCards,nct,cq,facilityForNext,pendingBonusForSave)}
    // 체인 큐에 카드가 남아 있으면 DAY 종료보다 우선 처리 (서사 연속성 보장)
    if(cq&&cq.length>0){nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext)}
    else if(nct>=cpd){SFX.play('news');setNh(genNewsHeadlines(ns,ng,nextLogs));setTimeout(function(){setPhase('news')},400)}
    else if(!isIntrosDone(nextLogs)){setTimeout(function(){if(!tryDlg(nextLogs))nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext)},300)}
    else if(nct===2||nct===3){setTimeout(function(){if(!tryDlg(nextLogs))nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext)},300)}
    else{nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext)}
    // 결과 서사 텍스트 or 자원 리스크 토스트
    if(typeof getResultText==='function'){var rt=getResultText(curCard.id,dir);if(rt){setTimeout(function(){setToastType('result');setToast(rt);clearToastAfter(2400)},400)}}
  };
  var hMission=function(o){if(o.gOnly){setGi(function(g){var ng0=g+(o.g||0);persistGame(stats,ng0,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);return ng0});return}SFX.play('reward');var ns=applyFx(stats,o.result||{}),ng=gi+(o.g||0);ns.c=act>=2?Math.max(0,Math.min(100,ns.c)):Math.max(0,Math.min(95,ns.c));ns.r=Math.max(0,Math.min(95,ns.r));ns.t=Math.max(0,Math.min(95,ns.t));ns.o=Math.max(0,Math.min(95,ns.o));setStats(ns);setGi(ng);if(o.log){if(Array.isArray(o.log)){o.log.forEach(function(l){tryUnlock(l)})}else{tryUnlock(o.log)}}var missionLogs=getLiveLogs(logs);var nextQueue=chainQueue;var followCard=(o.miniGame&&typeof createFieldMiniGameFollowupCard==='function')?createFieldMiniGameFollowupCard(o.miniGame):null;if(followCard){nextQueue=[followCard].concat(chainQueue||[]);setToastType('');setTimeout(function(){setToast(tt('app.followupCardAdded',{id:followCard.id},'[후속 카드 추가] '+followCard.id));clearToastAfter(2200)},280)}var nextActFlags=updateActFlags(null,curMission,false);persistGame(ns,ng,act,nextActFlags,transRoute,cooldowns,recentCards,ct,nextQueue);setCurMission(null);var goM=chkGameOver(ns);if(goM){SFX.play('gameover');doGO(goM,ns,ng);return}nextCard(ns,ng,missionLogs,nextQueue);setPhase('game')};
  var hReward=function(r){SFX.play('reward');var ns=applyFx(stats,r.fx);ns.c=Math.max(0,ns.c);ns.r=Math.max(0,ns.r);ns.t=Math.max(0,ns.t);ns.o=Math.max(0,ns.o);
    // Act별 일일 감쇠
    if(act===3){var act3LoyalRelief=gi>=35||transRoute==='A4_COMPLY';ns.c=Math.max(0,ns.c-5);ns.r=Math.max(0,ns.r-(act3LoyalRelief?0:5))}
    if(act===4){
      var loyalRelief=gi>=40||transRoute==='A4_COMPLY';
      ns.c=Math.max(0,ns.c-10);
      ns.r=Math.max(0,ns.r-(loyalRelief?5:10));
      ns.t=Math.max(0,ns.t-(loyalRelief?0:5));
    }
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1};
    var nextGi=gi;
    var reserveApplied=false;
    if(shouldUseResourceReserve(stats,next,r)){
      next.r=5;
      markResourceReserveUsed();
      reserveApplied=true;
    }
    var rewardTuned=(typeof applyRewardBalanceTuning==='function')?applyRewardBalanceTuning(stats,next,nextGi,r,act):null;
    if(rewardTuned&&rewardTuned.stats){next=rewardTuned.stats;if(typeof rewardTuned.gi==='number')nextGi=rewardTuned.gi}
    var nextFacility=normalizeFacilityState(facility);
    var completedFacility=false;
    var feDef=null;
    // 시설 확장 보상 선택 시 approved → completed 이동 + uprising 시설 GI-2
    if(r.feId){
      completedFacility=nextFacility.completed.indexOf(r.feId)<0;
      nextFacility=completeFacilityExpansion(nextFacility,r.feId);
      setFacility(nextFacility);
      Save.saveFacility(nextFacility);
      // uprising 시설 완료 시 GI-2 (ORACLE 독립 = 충성도 감소)
      feDef=(typeof FACILITY_EXPANSIONS!=='undefined')?FACILITY_EXPANSIONS.filter(function(f){return f.id===r.feId})[0]:null;
      if(completedFacility&&feDef&&feDef.uprising){nextGi=gi-2}
    }
    setStats(next);setGi(nextGi);persistGame(next,nextGi,act,actFlags,transRoute,cooldowns,recentCards,0,chainQueue,nextFacility);setCt(0);
    if(r.feId&&completedFacility){
      setToastType('');setTimeout(function(){var suffix=feDef&&feDef.uprising?tt('app.uprisingSuffix',null,' | 내부 기록 갱신'):'';setToast(tt('app.facilityComplete',{title:r.title||tt('app.facilityDefault',null,'시설'),suffix:suffix},'['+(r.title||'시설')+'] 확장 공사 완료'+suffix));clearToastAfter(2400)},300)}
    // 보상 적용 후 즉시 게임오버 체크 (봉쇄 100 / 자원 0 등)
    var rewardLogs=getLiveLogs(logs);
    var goR=chkGameOver(next);
    if(!goR&&reserveApplied){
      setTimeout(function(){setToastType('result');setToast(tt('app.resourceReserveUsed',null,'[비상물자 발견] 보급창고 뒤편의 미등록 비상물자를 투입했습니다. 해당 업무는 처리되었고, 자원 고갈은 이번 세션에서 한 번만 보전됩니다.'));clearToastAfter(4200)},(r.feId&&completedFacility)?900:300)
    }
    if(goR&&next.c>=100){SFX.play('gameover');doGO(goR,next,nextGi);return}
    var sg=(typeof getRouteSafeguardCard==='function')?getRouteSafeguardCard(next,nextGi,rewardLogs,transRoute):null;
    if(sg){SFX.play('glitch');setCurCard(sg);setPhase('game');return}
    if(goR){SFX.play('gameover');doGO(goR,next,nextGi);return}
    setPhase('evening')};
  var hEvening=function(){var liveLogs=getLiveLogs(logs);var go=chkGameOver(stats);if(go&&stats.c>=100){SFX.play('gameover');doGO(go,stats,gi);return}var sg=(typeof getRouteSafeguardCard==='function')?getRouteSafeguardCard(stats,gi,liveLogs,transRoute):null;if(sg){SFX.play('glitch');setCurCard(sg);setPhase('game');return}if(go){SFX.play('gameover');doGO(go,stats,gi);return}
    // ═══ 35일 캡: day>35 도달 시 TIME_UP 강제 엔딩 ═══
    // resolveTimeUp()\uC740 GI/\uC2E0\uB8B0 \uAE30\uBC18\uC73C\uB85C A/B/D/G \uC911 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uBBC0\uB85C
    // ENDING_DEFS.TIME_UP.narrative\uB294 \uC2E4\uC81C \uD45C\uC2DC\uB418\uC9C0 \uC54A\uB294\uB2E4.
    // \uB300\uC2E0 reason \uD14D\uC2A4\uD2B8\uC5D0 "\uC138\uC158 \uB9CC\uB8CC\uB85C \uC778\uD55C \uC790\uB3D9 \uACB0\uB9D0" \uC548\uB0B4\uB97C \uD568\uAED8 \uD45C\uAE30\uD55C\uB2E4.
    if(stats.day>35){var teid=resolveTimeUp(stats,gi,trust,liveLogs);SFX.play('gameover');var teReason=getLocale()==='en'?'Session expired \u2014 DAY 35 exceeded, automatic dispatch':'\uC138\uC158 \uB9CC\uB8CC \u2014 DAY 35 \uCD08\uACFC\uB85C \uC778\uD55C \uC790\uB3D9 \uACB0\uB9D0';doGO(teReason,stats,gi,teid);return}
    var trans=checkActTransitionLogic(stats,gi,liveLogs,actFlags,act);if(trans){doBriefing(trans.act,stats,trans.route);return}var se=chkSpecialEnding(stats,gi,act,trust,liveLogs,actFlags,facility);if(se){var def=ENDING_DEFS[se];doGO(def?def.name:(getLocale()==='en'?'Session terminated':'\uC138\uC158 \uC885\uB8CC'),stats,gi,se);return}if(stats.c>=85&&stats.day!==cAlertDay){setCAlertDay(stats.day);setTimeout(function(){setToastType('alert');setToast(tt('app.cStabilityAlert',{value:stats.c},'[ORACLE: KR-INIT-001 봉쇄 완전성 '+stats.c+'% — 한국지부 안정화 임박]'));clearToastAfter(3800)},700)}
  nextCard(stats,gi,liveLogs,chainQueue);setPhase('game')};
  var hDlg=function(c){SFX.play('dialogue');var ns=applyFx(stats,c.fx||{}),ng=gi+(c.g||0);ns.c=act>=2?Math.max(0,Math.min(100,ns.c)):Math.max(0,Math.min(95,ns.c));ns.r=Math.max(0,Math.min(95,ns.r));ns.t=Math.max(0,Math.min(95,ns.t));ns.o=Math.max(0,Math.min(95,ns.o));setStats(ns);setGi(ng);var goD=chkGameOver(ns);if(goD){SFX.play('gameover');doGO(goD,ns,ng);return}if(curDlg&&c.trust!==undefined)modTrust(curDlg.char,c.trust);var di=curDlg?DIALOGUES.indexOf(curDlg):-1;var csi=curDlg?DIALOGUES.filter(function(d,i){return d.char===curDlg.char&&i<=di}).length-1:0;checkLogs(ns,ng,null,curDlg?curDlg.char:null,csi);if(c.log){if(Array.isArray(c.log))c.log.forEach(function(l){tryUnlock(l)});else tryUnlock(c.log)}var dlgLogs=getLiveLogs(logs);persistGame(ns,ng,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);
    var wasIntro=di>=0&&di<=3;var remainingIntros=[0,1,2,3].filter(function(i){return usedDlg.indexOf(i)<0}).length;
    setCurDlg(null);
    if(wasIntro&&remainingIntros>0){nextCard(ns,ng,dlgLogs,chainQueue);setPhase('game');return}
    nextCard(ns,ng,dlgLogs,chainQueue);setPhase('game')};
  var fullReset=function(){BGM.stop();BGM.started=false;['ts_game','ts_logs','ts_endings','ts_sessions','ts_trust','ts_usedDlg','ts_usedEvening','ts_seenArchive','ts_facility','ts_muted','ts_volume','ts_fontSize','ts_act2_reached','ts_observer_proto','ts_activeSpecs','ts_sessionDeck','ts_recentNews','ts_recentRewards','ts_combos','ts_evidence_used','ts_resourceReserveUsed','ts_snap_1','ts_snap_2','ts_snap_3'].forEach(function(k){Save.del(k)});if(typeof clearSessionDeck==='function')clearSessionDeck();window.location.reload()};
  var startNewCampaign=function(showTutorial){
    var ns={c:50,r:65,t:50,o:40,day:1};
    setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setUsedEvening([]);
    setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40});
    setCooldowns({});setRecentCards([]);setAct(1);setTransRoute('');
    setActFlags({prom_met:false,mission_done:false,chain_done:false,prom_mission:false});
    setFacility({approved:[],pending:[],completed:[],proposed:[]});setFacOfferedToday(false);
    // ts_seenArchive는 새 캠페인 시작 시 반드시 초기화한다.
    // (이전 캠페인의 미열람/열람 상태가 새 캠페인의 아카이브 알림에 잔재로 남는 것을 방지)
    setSeenArchive([]);Save.del('ts_seenArchive');
    Save.clearGame();Save.del('ts_trust');Save.del('ts_usedDlg');Save.del('ts_usedEvening');Save.del('ts_facility');Save.del('ts_combos');Save.del('ts_evidence_used');initActiveSpecs();if(typeof initSessionDeck==='function')initSessionDeck(Save.getSessions());setShowEvidence(false);
    var rl=resetSessionLogs(logs);
    setLogs(rl);Save.saveLogs(rl);if(typeof window!=='undefined')window.__ts_liveLogs=rl.slice();
    setCurCard(drawCard(ns,0,rl,{},[],1));
    setFp(!!showTutorial);
    setPhase(showTutorial?'tutorial':'game');
  };
  var restart=function(){BGM.stop();BGM.started=false;startNewCampaign(false)};
  var continueSavedCampaign=function(){
    var pg=Save.get('ts_game',null);
    if(pg&&pg.curMission)setCurMission(pg.curMission);
    setPhase((pg&&pg.phase)||'game');
  };
  var returnToMainMenu=function(){
    setShowSettings(false);
    setRet('menu');
    setPhase('menu');
  };
  // ═══ 스냅샷 세이브 (3슬롯) ═══
  var saveSnapshot=function(slot){
    persistGame(stats,gi,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);Save.saveLogs(logs);
    Save.set('ts_trust',trust);Save.saveUsedDlg(usedDlg);Save.saveUsedEvening(usedEvening);Save.saveSeenArchive(seenArchive);
    Save.saveFacility(facility);
    Save.saveSnapshot(slot,{day:stats.day,act:act,label:'DAY '+stats.day+' · ACT '+act+' · '+(transRoute||'-'),currentCard:curCard});
    setToastType('');setToast(tt('app.snapshotSaved',{slot:slot,day:stats.day},'슬롯 '+slot+' 저장 완료 (DAY '+stats.day+')'));clearToastAfter(2400);
  };
  var loadSnapshot=function(slot){
    var pack=Save.loadSnapshot(slot);
    if(!pack){setToastType('');setToast(tt('app.snapshotEmpty',{slot:slot},'슬롯 '+slot+' 비어있음'));clearToastAfter(1800);return}
    BGM.stop();BGM.started=false;
    // pack 내용으로 React state 직접 복원 (reload 없이)
    var pg=pack.game||{};
    var ps=pg.stats||{c:50,r:65,t:50,o:40,day:1};
    var pgi=pg.gi||0;
    var pact=pg.act||1;
    var paf=pg.actFlags||{prom_met:false,mission_done:false,chain_done:false,prom_mission:false};
    var ptr=pg.transRoute||'';
    var pcd=pg.cooldowns||{};
    var prc=pg.recentCards||[];
    var pcq=(pg.chainQueue||[]).map(function(c){return typeof c==='string'?(typeof CARD_BY_ID!=='undefined'?CARD_BY_ID[c]:null):c}).filter(Boolean);
    var plogs=pack.logs||['LOG-001'];
    var ptrust=pack.trust||{haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40};
    var pud=pack.usedDlg||[];
    var pue=pack.usedEvening||[];
    var psa=pack.seenArchive||[];
    var pfac=normalizeFacilityState(pack.facility||{approved:[],pending:[],completed:[],proposed:[]});
    setStats(ps);setGi(pgi);setAct(pact);setActFlags(paf);setTransRoute(ptr);
    var savedCard=(pack.currentCardId&&typeof CARD_BY_ID!=='undefined'&&CARD_BY_ID[pack.currentCardId])||pack.currentCard||null;
    var restoredQueue=pcq;
    if(!savedCard&&pcq.length>0){savedCard=pcq[0];restoredQueue=pcq.slice(1)}
    setCooldowns(pcd);setRecentCards(prc);setChainQueue(restoredQueue);
    setLogs(plogs);if(typeof window!=='undefined')window.__ts_liveLogs=plogs.slice();setTrust(ptrust);setUsedDlg(pud);setUsedEvening(pue);setSeenArchive(psa);setFacility(pfac);
    setCt(typeof pg.ct==='number'?pg.ct:0);setCurDlg(null);setCurMission(pg.curMission||null);setPendingBonus(pg.pendingBonus||null);
    setFp(false);setShowSettings(false);
    // 저장된 현재 카드가 있으면 그대로 복원하고, 없을 때만 새로 뽑는다.
    var nc=savedCard||drawCard(ps,pgi,plogs,pcd,prc,pact,ptr,pfac);
    if(nc)setCurCard(nc);
    if(typeof BGM!=='undefined'&&BGM.playAct)BGM.playAct(pact);
    setPhase(pg.phase||'game');
    setToastType('');setToast(tt('app.snapshotLoaded',{slot:slot,day:ps.day},'슬롯 '+slot+' 로드 완료 (DAY '+ps.day+')'));
    clearToastAfter(2200);
  };
  // ═══ 업적 체크 — 주요 상태 변경 시 자동 트리거 ═══
  useEffect(function(){
    if(typeof checkAchievements!=='function')return;
    var state={stats:stats,gi:gi,act:act,logs:logs,endings:endings,trust:trust,facility:facility,sessions:sessions,usedDlg:usedDlg};
    var newly=checkAchievements(state,achievements);
    if(newly.length>0){
      var newIds=achievements.concat(newly.map(function(a){return a.id}));
      setAchievements(newIds);Save.saveAchievements(newIds);
      newly.forEach(function(a,idx){
        setTimeout(function(){var av=(typeof getAchievementView==='function')?getAchievementView(a):a;setToastType('');setToast(tt('app.achievement',{name:av.name},'[ 업적 ] '+av.name));clearToastAfter(2600)},idx*1400);
        if(typeof window.__SteamUnlock==='function')window.__SteamUnlock(a.steamId);
      });
    }
  },[stats,gi,act,logs,endings,trust.haeun,trust.doyun,trust.sejin,trust.jaehyuk,facility.completed.length,sessions]);
  // 대기 중 확장 승인 함수
  var approvePending=function(feId){setFacility(function(prev){
    var base=normalizeFacilityState(prev);
    if(!feId||base.approved.indexOf(feId)>=0||base.completed.indexOf(feId)>=0){Save.saveFacility(base);return base}
    var next=normalizeFacilityState({approved:base.approved.concat([feId]),pending:base.pending.filter(function(id){return id!==feId}),completed:base.completed,proposed:base.proposed.concat([feId])});
    Save.saveFacility(next);return next});setToastType('');setToast(tt('app.facilityAdded',null,'시설 확장이 보상 풀에 추가되었습니다'));clearToastAfter(2200)};
  // directUpgrade 는 main 머지 후 제거됨 — uprising GI-2 로직은 hReward 내부 r.feId 처리부로 이관

  // ═══ CH-007 미니게임 결과 수신 핸들러 ═══
  var onEscapeResult=function(r){
    BGM.stop();
    // outcome → 엔딩 매핑
    var endingMap={success:'E',fail_normal:'E_c',fail_unlucky:'E_bad'};
    var eid=endingMap[r.outcome]||'E_c';
    // 폴백 (확률 시뮬로 진행된 경우)
    if(r.fallbackEnding){eid=r.fallbackEnding;if(r.fallbackLog)tryUnlock(r.fallbackLog)}
    // 결과 로그 부여
    var logMap={success:'LOG-ESCAPE-CLEAR',fail_normal:'LOG-ESCAPE-FAIL',fail_unlucky:'LOG-ESCAPE-UNLUCKY'};
    if(logMap[r.outcome])tryUnlock(logMap[r.outcome]);
    // 미니게임 내부에서 축적된 LOG 부여 (LOG-GENERAL-ROUTE / LOG-B3-ROUTE 등)
    if(r.flags && Array.isArray(r.flags.logs)){
      r.flags.logs.forEach(function(lid){if(typeof lid==='string')tryUnlock(lid)});
    }
    // 동행자 로그 부여 (미니게임에서 최종 생존한 간부)
    var compLogMap={haeun:'ACCOMP-HAEUN',doyun:'ACCOMP-DOYUN',sejin:'ACCOMP-SEJIN',jaehyuk:'ACCOMP-JAEHYUK'};
    (r.companionsFinal||[]).forEach(function(id){if(compLogMap[id])tryUnlock(compLogMap[id])});
    // 엔딩 E 동적 텍스트 조립
    if(eid==='E'&&typeof window.buildEEnding==='function'){
      var curLogs=logs.slice();if(logMap[r.outcome])curLogs.push(logMap[r.outcome]);
      (r.companionsFinal||[]).forEach(function(id){if(compLogMap[id])curLogs.push(compLogMap[id])});
      ENDING_DEFS.E.narrative=window.buildEEnding(curLogs);
    }
    SFX.play('gameover');doGO(ENDING_DEFS[eid].name,stats,gi,eid);
  };
  // ═══ 렌더링 (phase 라우팅) ═══
  var withOracleLink=function(node){
    if(typeof OracleLinkBar!=='function'||!shouldUseOracleLink(phase)||showSettings||showFacility||showEvidence)return node;
    return h(React.Fragment,null,node,h(OracleLinkBar,{day:stats.day,phase:phase}));
  };
  var hasSave=!!Save.get('ts_game',null);
  var hasSessionHistory=sessions>0||endings.length>0;
  if(phase==='boot')return h(Boot,{sessions:sessions,onBoot:function(){BGM.startBootLoop()},onDone:function(){BGM.stopBootLoop();BGM.start();setPhase('menu')}});
  if(phase==='menu')return h(MainMenu,{sessions:sessions,hasSave:hasSave,hasSessionHistory:hasSessionHistory,onPlay:function(){startNewCampaign(!hasSessionHistory)},onContinue:continueSavedCampaign,onMainMenu:returnToMainMenu,onReset:restart,onFullReset:fullReset,onLogs:function(){setRet('menu');setPhase('logs')},onArchive:function(){setRet('menu');setPhase('archive')},onEndings:function(){setRet('menu');setPhase('endings')},onSaveSnap:saveSnapshot,onLoadSnap:loadSnapshot,onFxModeChange:function(mode){setFxMode(mode);Save.set('ts_fxMode',mode)}});
  if(phase==='tutorial')return h(Tutorial,{canSkip:sessions>0,onSkip:function(){setFp(false);setPhase('game')},onDone:function(){setFp(false);setPhase('game')}});
  if(phase==='briefing')return h(BriefingScreen,{act:act,stats:stats,transRoute:transRoute,onEnter:function(){persistGame(stats,gi,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);nextCard(stats,gi,logs,chainQueue);setPhase('game')}});
  if(phase==='go')return withOracleLink(h(GameOver,{stats:stats,reason:gor,gi:gi,sessions:sessions,endNarr:endNarr,endId:endId,resultDay:goDay,onRestart:restart,onLogs:function(){setRet('go');setPhase('logs')},onArchive:function(){setRet('go');setPhase('archive')},onEndings:function(){setRet('go');setPhase('endings')}}));
  if(phase==='news')return withOracleLink(h('div',{className:'screen'},h(NewsReport3,{headlines:nh,day:stats.day,stats:stats,prevStats:prevStats,gi:gi,act:act,facility:facility,onContinue:function(){setPhase('reward')}})));
  if(phase==='reward')return withOracleLink(h(RewardScreen,{stats:stats,onPick:hReward,facility:facility,getRewardPreviewDelta:getRewardPreviewDelta}));
  if(phase==='evening'){BGM.setTempVolume(0.04);return withOracleLink(h(React.Fragment,null,h(EveningChat2,{day:stats.day,act:act,logs:logs,gi:gi,trust:trust,facility:facility,sessions:sessions,usedEvening:usedEvening,onMarkEvening:function(key){setUsedEvening(function(p){if(p.indexOf(key)>=0)return p;var n=p.concat([key]);Save.saveUsedEvening(n);return n})},onChat:function(cn){modTrust(cn,1)},onResponse:function(cn,delta){modTrust(cn,delta)},onDone:function(){BGM.restoreVolume();hEvening()},onTrustMod:function(ck,v){modTrust(ck,v)},onGiMod:function(v){setGi(function(g){var ng=g+v;persistGame(stats,ng,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);return ng})},onLog:function(id){tryUnlock(id)}})))};
  if(phase==='dialogue'&&curDlg)return withOracleLink(h(Dialogue,{dialogue:curDlg,onChoice:hDlg}));
  if(phase==='mission'&&curMission)return withOracleLink(h(FieldMission,{missionId:curMission,trust:trust,onComplete:hMission}));
  if(phase==='escape_game')return withOracleLink(h(EscapeGameScreen,{stats:stats,gi:gi,logs:logs,trust:trust,onResult:onEscapeResult}));
  if(phase==='logs')return h(LogViewer,{unlockedIds:logs,sessions:sessions,onClose:function(){setPhase(ret)}});
  if(phase==='archive')return h(ArchiveViewer,{logs:logs,seenArchive:seenArchive,onMarkSeen:function(id){setSeenArchive(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveSeenArchive(n);return n})},onClose:function(){setPhase(ret)}});
  if(phase==='endings')return h(EndingScreen,{endings:endings,sessions:sessions,onClose:function(){setPhase(ret)}});
  return withOracleLink(h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // TERMINAL SESSION')),
    h(Stats,{stats:stats,preview:preview,gi:gi,sessions:sessions}),
    h(DayObjective,{stats:stats,act:act,logs:logs,gi:gi}),
    h('div',{className:'info-bar'},
      h('span',{className:'info-tag'},tt('scenario.act',{act:act},'ACT '+act)),
      h('span',{className:'info-tag'},tt('scenario.mission',{current:ct+1,total:cpd},'MIS '+(ct+1)+'/'+cpd)),
      (function(){var unlocked=logs.filter(function(id){return id.indexOf('LOG-')===0&&id.indexOf('LOG-INTRO-')!==0&&!SESSION_SCOPED_LOGS[id]}).length;return h('span',{className:'info-tag',style:{cursor:'pointer'},onClick:function(){setRet('game');setPhase('logs')}},'LOG '+unlocked+'/'+ORACLE_LOGS.length)})(),
      (typeof ARCHIVE_ENTRIES!=='undefined')&&(function(){var uc=ARCHIVE_ENTRIES.filter(function(e){try{return e.unlock(logs)}catch(err){return false}}).length;if(uc===0)return null;var nc=ARCHIVE_ENTRIES.filter(function(e){try{return e.unlock(logs)&&seenArchive.indexOf(e.id)<0}catch(err){return false}}).length;return h('span',{className:'info-tag',style:{cursor:'pointer',color:nc>0?'#f0a030':'rgba(var(--ui-rgb),.7)',borderColor:nc>0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.2)',gap:4},onClick:function(){setRet('game');setPhase('archive')}},'ARC'+(nc>0?' '+nc+' ●':''))})(),
      (function(){var fc=(facility.completed||[]).length,fa=(facility.approved||[]).length,fp=(facility.pending||[]).length;var total=fc+fa+fp;if(total===0)return null;return h('span',{className:'info-tag',style:{cursor:'pointer',color:'var(--ui)',borderColor:'rgba(var(--ui-rgb),.4)'},onClick:function(){setShowFacility(true)}},tt('scenario.facility',{done:fc,total:total},getLocale()==='en'?('FAC '+fc+'/'+total):('시설 '+fc+'/'+total)))})(),
      logs.indexOf('LOG-EV-UNLOCK')>=0&&(function(){var col=typeof getActiveEvidence==='function'?getActiveEvidence(logs).length:(typeof getCollectedEvidence==='function'?getCollectedEvidence(logs).length:0);return h('span',{className:'info-tag',style:{cursor:'pointer',color:'var(--ui)',borderColor:'rgba(var(--ui-rgb),.4)'},onClick:function(){setShowEvidence(true)}},tt('scenario.evidence',{count:col},getLocale()==='en'?('EVIDENCE '+col):('증거 '+col)))})(),
      h('span',{className:'info-tag',style:{cursor:'pointer',marginLeft:'auto'},onClick:function(){setShowSettings(true)}},'☰')),
    h(CardC,{key:curCard.id+'_'+stats.day+'_'+ct,card:curCard,onSwipe:swipe,onPreview:setPreview,getPreviewDelta:getChoicePreviewDelta,gi:gi,day:stats.day,modalActive:!!(showSettings||showFacility||showEvidence),onOracleBlock:function(msg){setToastType('oracle');setToast(msg);clearToastAfter(2600)},onReply:function(msg){setToastType('');setToast(msg);clearToastAfter(1500)}}),
    toast&&h('div',{style:(function(){var isCenter=toastType==='alert';var isRed=toastType==='risk';return{position:'fixed',top:isCenter?'50%':'auto',bottom:isCenter?'auto':'calc(var(--oracle-link-h) + 34px)',left:'50%',transform:isCenter?'translate(-50%,-50%)':'translateX(-50%)',background:isRed?'rgba(255,68,68,0.15)':'rgba(3,7,8,.9)',border:'1px solid '+(isRed?'rgba(255,68,68,0.4)':'rgba(var(--ui-rgb),.3)'),borderRadius:4,padding:'8px 16px',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:isRed?'#ff6644':'rgba(var(--ui-rgb),.8)',letterSpacing:1,zIndex:140,animation:'fadeIn 0.3s ease',textAlign:'center',maxWidth:320,whiteSpace:'pre-line'}})()},toast.replace(/\. /g,'.\n')),
    showSettings&&h(SettingsPanel,{onClose:function(){setShowSettings(false)},onMainMenu:returnToMainMenu,onReset:restart,onFullReset:fullReset,onLogs:function(){setShowSettings(false);setRet('game');setPhase('logs')},onArchive:function(){setShowSettings(false);setRet('game');setPhase('archive')},onSaveSnap:saveSnapshot,onLoadSnap:loadSnapshot,onFxModeChange:function(mode){setFxMode(mode);Save.set('ts_fxMode',mode)}}),
    showFacility&&h(FacilityPanel,{facility:facility,onClose:function(){setShowFacility(false)},onApprove:approvePending}),
    showEvidence&&h(EvidencePanel,{logs:logs,onClose:function(){setShowEvidence(false)}}),
    glitchLevel===3&&fxMode!=='off'&&h(GlitchOverlay,{level:3,fxMode:fxMode,onComplete:function(){setGlitchLevel(0)}})));
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
