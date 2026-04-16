// TERMINAL SESSION — app.js (App 컴포넌트, 글로벌 유틸은 app-init.js)
function App(){
  var _p=useState('boot'),phase=_p[0],setPhase=_p[1];
  var _s=useState({c:50,r:65,t:50,o:40,day:1}),stats=_s[0],setStats=_s[1];
  var _g=useState(0),gi=_g[0],setGi=_g[1];
  var _ct=useState(0),ct=_ct[0],setCt=_ct[1];
  var _nh=useState([]),nh=_nh[0],setNh=_nh[1];
  var _gor=useState(''),gor=_gor[0],setGor=_gor[1];
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
  var _act=useState(1),act=_act[0],setAct=_act[1];
  var _af=useState({prom_met:false,mission_done:false,chain_done:false,prom_mission:false}),actFlags=_af[0],setActFlags=_af[1];
  var _tr2=useState(''),transRoute=_tr2[0],setTransRoute=_tr2[1];
  var _fac=useState({approved:[],pending:[],completed:[],proposed:[]}),facility=_fac[0],setFacility=_fac[1];
  var _fot=useState(false),facOfferedToday=_fot[0],setFacOfferedToday=_fot[1];
  var _pb=useState(null),pendingBonus=_pb[0],setPendingBonus=_pb[1];
  var _cal=useState(-1),cAlertDay=_cal[0],setCAlertDay=_cal[1];
  var _a2r=useState(Save.get('ts_act2_reached',false)),act2Reached=_a2r[0];
  // 신뢰도 변화는 플레이어에게 표시하지 않음 (GI처럼 숨김)
  var _ps=useState(null),prevStats=_ps[0],setPrevStats=_ps[1];
  var cpd=act===1?5:act===2?5:act===3?6:7;
  useEffect(function(){
    var root=document.getElementById('root');
    if(root){root.className=phase==='go'?'act-1':'act-'+act}
  },[act,phase]);
  useEffect(function(){
    var sl=Save.getLogs();if(sl)setLogs(sl);
    var se=Save.getEndings();if(se)setEndings(se);
    setSessions(Save.getSessions());
    var st=Save.get('ts_trust',null);if(st)setTrust(st);
    var sud=Save.getUsedDlg();if(sud&&sud.length)setUsedDlg(sud);
    var sue=Save.getUsedEvening();if(sue&&sue.length)setUsedEvening(sue);
    var ssa=Save.getSeenArchive();if(ssa&&ssa.length)setSeenArchive(ssa);
    var sf=Save.getFacility();if(sf)setFacility(sf);
    var sg=Save.get('ts_game',null);
    // 기존 세이브 마이그레이션: once 카드 ONCE 플래그 추가
    if(sg&&sg.stats&&sg.stats.day>1&&sl){var onceMig=false;['CA-001','CA-002','CA-003','CA-004','CA-005','CA-006'].forEach(function(cid){if(sl.indexOf('ONCE-'+cid)<0){sl.push('ONCE-'+cid);onceMig=true}});if(onceMig){Save.saveLogs(sl);setLogs(sl)}}
    if(sg&&sg.act){setAct(sg.act);if(sg.actFlags)setActFlags(sg.actFlags);if(sg.transRoute)setTransRoute(sg.transRoute)}
    else{sl=(sl||['LOG-001']).filter(function(id){return id.indexOf('LOG-INTRO-')!==0});Save.saveLogs(sl);setLogs(sl);setUsedDlg([]);Save.saveUsedDlg([]);setUsedEvening([]);Save.saveUsedEvening([])}
    var initAct=(sg&&sg.act)||1;
    setCurCard(drawCard({c:50,r:65,t:50,o:40,day:1},0,sl||['LOG-001'],{},[], initAct));
  },[]);
  var _bgmMuted=useState(false),bgmMuted=_bgmMuted[0],setBgmMuted=_bgmMuted[1];
  var _showSettings=useState(false),showSettings=_showSettings[0],setShowSettings=_showSettings[1];
  useEffect(function(){var sv=Save.get('ts_volume',null);if(sv!==null&&typeof BGM!=='undefined')BGM.vol=sv/100;var sm=Save.get('ts_muted',null);if(sm===true&&typeof BGM!=='undefined'){BGM.muted=true;setBgmMuted(true)};if(sm===true&&typeof SFX!=='undefined')SFX.muted=true;var sfv=Save.get('ts_sfxVol',null);if(sfv!==null&&typeof SFX!=='undefined')SFX.vol=sfv/100;var fs=Save.get('ts_fontSize','normal');if(fs!=='normal'){var r=document.getElementById('root');if(r)r.classList.add('fs-'+fs)}},[]);
  useEffect(function(){var h2=function(e){if(e.key==='Escape'&&phase==='game'&&!showSettings)setShowSettings(true)};window.addEventListener('keydown',h2);return function(){window.removeEventListener('keydown',h2)}},[phase,showSettings]);
  var tryUnlock=function(id){setLogs(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveLogs(n);return n})};
  var modTrust=function(char,delta){setTrust(function(prev){var key={"\uc11c\ud558\uc740":"haeun","\uac15\ub3c4\uc724":"doyun","\uc724\uc138\uc9c4":"sejin","\uc784\uc7ac\ud601":"jaehyuk","\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84":"weber","\ub2c9 \ud3ec\uc2a4\ud130":"foster","\ubc15\uc18c\uc601":"soyoung"}[char];if(!key)return prev;var next={};for(var k in prev)next[k]=prev[k];next[key]=Math.max(0,Math.min(100,prev[key]+delta));Save.set('ts_trust',next);
    return next})};
  // checkLogs 래퍼: app-logic.js의 checkLogsAll 호출
  var checkLogs=function(s,g,cid,dc,di,dir){checkLogsAll(s,g,cid,dc,di,dir,logs,trust,tryUnlock)};
  var doGO=function(reason,ns,ng,specialId){BGM.stop();setGor(reason);var eid=specialId||null;if(!eid){if(ns.c<=0)eid='C_c';else if(ns.c>=100)eid=(logs.indexOf('LOG-050')>=0&&logs.indexOf('LOG-082')>=0)?'C_cst':'C_cs';else if(ns.r<=0)eid='C_r';else if(ns.t<=0)eid='C_t';else if(ns.o<=0)eid='C_o';if(ng>=60)eid='A'}if(eid&&ENDING_DEFS[eid])setEndNarr(ENDING_DEFS[eid]);else setEndNarr(null);setEndId(eid);if(eid)Save.saveEnding(eid);setEndings(Save.getEndings());setSessions(Save.incSession());Save.clearGame();setTimeout(function(){setPhase('go')},500)};
  var tryDlg=function(){var av=DIALOGUES.filter(function(d,i){if(usedDlg.indexOf(i)>=0)return false;if(d.char==='\uc11c\ud558\uc740'&&logs.indexOf('LOG-050')>=0)return false;if(d.logReq&&logs.indexOf(d.logReq)<0)return false;if(d.actReq&&act<d.actReq)return false;if(d.trustReq&&!d.trustReq(trust))return false;var earlier=false;DIALOGUES.forEach(function(d2,j){if(j<i&&d2.char===d.char&&usedDlg.indexOf(j)<0&&(!d2.trustReq||d2.trustReq(trust))&&(!d2.logReq||logs.indexOf(d2.logReq)>=0))earlier=true});return!earlier});if(!isIntrosDone(logs)){var introAv=av.filter(function(d){return isIntroDlgCheck(d,DIALOGUES.indexOf(d))});if(introAv.length>0){var d=pick(introAv);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false}
    // 박소영 합류 후 첫 대화 보장
    if(logs.indexOf('LOG-082')>=0&&logs.indexOf('LOG-INTRO-SY')<0){var syAv=av.filter(function(d){return d.char==='\ubc15\uc18c\uc601'});if(syAv.length>0){var d=syAv[0];setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}}var prob=0.35;if(av.length>0&&Math.random()<prob){var d=pick(av);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false};
  var nextCard=function(s,g,lg,cq,curAct){var a=curAct||act;if(cq&&cq.length>0){setCurCard(cq[0]);setChainQueue(cq.slice(1))}else{var c=drawCard(s,g,lg,cooldowns,recentCards,a,transRoute);setCurCard(c);setRecentCards(function(p){var n=p.concat([c.id]);return n.length>30?n.slice(n.length-30):n})}};
  // Act 전환 체크 — 4액트 구조: 5일/14일/29일 경과 시 전환
  var checkActTransition=function(s,g,lg,af,curAct){
    if(curAct===1&&s.day>=5){
      return{act:2,route:'A'};
    }
    if(curAct===2&&s.day>=14){
      var route=af.prom_met&&af.mission_done?'A':af.prom_met?'B':af.mission_done?'C':'D';
      return{act:3,route:route};
    }
    if(curAct===3&&s.day>=29){
      var route=af.chain_done&&af.prom_mission?'A':af.chain_done?'B':af.prom_mission?'C':'D';
      return{act:4,route:route};
    }
    return null;
  };
  var updateActFlags=function(cardId,missionId,chainDone){
    setActFlags(function(prev){
      var next={prom_met:prev.prom_met,mission_done:prev.mission_done,chain_done:prev.chain_done,prom_mission:prev.prom_mission};
      if(cardId==='C-006'||cardId==='C-011')next.prom_met=true;
      if(missionId)next.mission_done=true;
      if(missionId==='M-003'||missionId==='M-007')next.prom_mission=true;
      if(chainDone)next.chain_done=true;
      return next;
    });
  };
  var doBriefing=function(newAct,s,route){
    setAct(newAct);setTransRoute(route);
    if(newAct===2){tryUnlock('LOG-ACT2');Save.set('ts_act2_reached',true);}
    if(newAct===3)tryUnlock('LOG-ACT3');
    if(newAct===4)tryUnlock('LOG-ACT4');
    var penalty=newAct===4
      ?(route==='A4_COMPLY'?0:route==='A4_GREY'?3:route==='A4_RESIST'?5:7)
      :(route==='A'?0:route==='B'||route==='C'?2:4)+(newAct===3?3:0);
    if(penalty>0){var ns={c:clamp(s.c-penalty),r:clamp(s.r-penalty),t:clamp(s.t-penalty),o:clamp(s.o-penalty),day:s.day};setStats(ns)}
    setPhase('briefing');
  };
  var swipe=function(dir){
    SFX.play('swipe');setToast('');
    if(curCard.isFacilityProposal){
      var feId=curCard.feId;
      setFacility(function(prev){
        var next={approved:prev.approved.slice(),pending:prev.pending.slice(),completed:prev.completed.slice(),proposed:prev.proposed.concat([feId])};
        if(dir==='right'){next.approved.push(feId);setToastType('');setToast('시설 확장이 보상 풀에 추가되었습니다');setTimeout(function(){setToast('')},2200)}
        else{next.pending.push(feId);setToastType('');setToast('확장 제안이 대기 목록에 추가되었습니다');setTimeout(function(){setToast('')},2200)}
        Save.saveFacility(next);return next});
      var nct=ct+1;setCt(nct);
      if(nct>=cpd){SFX.play('news');setNh(genNewsHeadlines(stats,gi));setTimeout(function(){setPhase('news')},400)}
      else{nextCard(stats,gi,logs,chainQueue)}
      return;
    }
    var ch=dir==='left'?curCard.left:curCard.right;
    var fx=ch.fx;
    var riskFired=false;
    if(curCard.bg==='supply'&&fx&&fx.r>=2&&Math.random()<0.2){fx={};for(var k in ch.fx)fx[k]=ch.fx[k];fx.r=0;riskFired=RISK_MSG[Math.floor(Math.random()*RISK_MSG.length)]}
    var ns=applyFx(stats,fx),ng=gi+(ch.g||0);
    if(pendingBonus){var pb=pendingBonus;ns.c=clamp(ns.c+(pb.c||0)*5);ns.r=clamp(ns.r+(pb.r||0)*5);ns.t=clamp(ns.t+(pb.t||0)*5);ns.o=clamp(ns.o+(pb.o||0)*5);var pbMsg=pb.msg;setPendingBonus(null);setTimeout(function(){setToastType('');setToast(pbMsg);setTimeout(function(){setToast('')},2400)},600)}
    setStats(ns);setGi(ng);
    if(curCard.tag){var ncd={};for(var k in cooldowns)ncd[k]=cooldowns[k];ncd[curCard.tag]=stats.day;setCooldowns(ncd)}
    checkLogs(ns,ng,curCard.id,null,null,dir);
    if(curCard.once)tryUnlock('ONCE-'+curCard.id);
    var nextLogs=curCard.once&&logs.indexOf('ONCE-'+curCard.id)<0?logs.concat(['ONCE-'+curCard.id]):logs;
    var rwdKey=curCard.id+'-'+dir;if(typeof RECON_TRIGGERS!=='undefined'&&RECON_TRIGGERS[rwdKey])tryUnlock(RECON_TRIGGERS[rwdKey]);if(typeof REFUSAL_BONUSES!=='undefined'&&REFUSAL_BONUSES[rwdKey])setPendingBonus(REFUSAL_BONUSES[rwdKey]);
    var isChainDone=curCard.id.indexOf('CH-')===0&&chainQueue.length===0;
    updateActFlags(curCard.id,ch.mission?ch.mission:null,isChainDone);
    Save.saveGame(ns,ng,act,actFlags,transRoute);
    if(ch.fePropose){var fpId=ch.fePropose;setFacility(function(prev){if(prev.proposed.indexOf(fpId)>=0||prev.approved.indexOf(fpId)>=0)return prev;var next={approved:prev.approved.concat([fpId]),pending:prev.pending.slice(),completed:prev.completed.slice(),proposed:prev.proposed.concat([fpId])};Save.saveFacility(next);return next});setToastType('');setToast('시설 확장이 보상 풀에 등록되었습니다');setTimeout(function(){setToast('')},2200)}
    var isDanger=ns.c<=25||ns.r<=25||ns.t<=25||ns.o<=25;BGM.setDanger(isDanger);
    var nct=ct+1;setCt(nct);
    // endTrigger: 루트 클라이맥스 카드 → 해당 엔딩 강제 발동 (게임오버 체크 우선)
    var et=ch.endTrigger||curCard.endTrigger;
    if(et&&ENDING_DEFS&&ENDING_DEFS[et]){SFX.play('gameover');doGO(ENDING_DEFS[et].name,ns,ng,et);return}
    var go=chkGameOver(ns);
    if(go){SFX.play('gameover');doGO(go,ns,ng);return}
    if(ch.mission&&MISSIONS[ch.mission]){SFX.play('mission');setCurMission(ch.mission);setTimeout(function(){setPhase('mission')},400);return}
    var triggerKey=curCard.id+'-'+dir;var chain=null;
    Object.keys(CHAINS).forEach(function(k){if(CHAINS[k].trigger===triggerKey)chain=CHAINS[k]});
    var cq=chainQueue;if(chain){SFX.play('glitch');cq=chain.cards;setChainQueue(cq)}
    if(nct>=cpd){SFX.play('news');setNh(genNewsHeadlines(ns,ng));setTimeout(function(){setPhase('news')},400)}
    else if(!isIntrosDone(nextLogs)){setTimeout(function(){if(!tryDlg())nextCard(ns,ng,nextLogs,cq)},300)}
    else if(nct===2||nct===3){setTimeout(function(){if(!tryDlg())nextCard(ns,ng,nextLogs,cq)},300)}
    else{nextCard(ns,ng,nextLogs,cq)}
    // 결과 서사 텍스트 or 자원 리스크 토스트
    if(riskFired){setTimeout(function(){setToastType('risk');setToast(riskFired);setTimeout(function(){setToast('')},2800)},600)}
    else if(typeof getResultText==='function'){var rt=getResultText(curCard.id,dir);if(rt){setTimeout(function(){setToastType('result');setToast(rt);setTimeout(function(){setToast('')},2400)},400)}}
  };
  var hMission=function(o){if(o.gOnly){setGi(function(g){return g+(o.g||0)});return}SFX.play('reward');var ns=applyFx(stats,o.result||{}),ng=gi+(o.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(o.log){if(Array.isArray(o.log)){o.log.forEach(function(l){tryUnlock(l)})}else{tryUnlock(o.log)}}updateActFlags(null,curMission,false);Save.saveGame(ns,ng,act,actFlags,transRoute);setCurMission(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var hReward=function(r){SFX.play('reward');var ns=applyFx(stats,r.fx);ns.c=Math.max(5,ns.c);ns.r=Math.max(5,ns.r);ns.t=Math.max(5,ns.t);ns.o=Math.max(5,ns.o);
    // Act별 일일 감쇠
    if(act===3){ns.c=Math.max(5,ns.c-1);ns.r=Math.max(5,ns.r-1)}
    if(act===4){ns.c=Math.max(5,ns.c-2);ns.r=Math.max(5,ns.r-2);ns.t=Math.max(5,ns.t-1)}
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1};setStats(next);Save.saveGame(next,gi,act,actFlags,transRoute);setCt(0);
    // 보상 적용 후 즉시 게임오버 체크 (봉쇄 100 / 자원 0 등)
    var goR=chkGameOver(next);if(goR){SFX.play('gameover');doGO(goR,next,gi);return}
    setPhase('evening')};
  var hEvening=function(){var go=chkGameOver(stats);if(go){SFX.play('gameover');doGO(go,stats,gi);return}var trans=checkActTransitionLogic(stats,gi,logs,actFlags,act);if(trans){doBriefing(trans.act,stats,trans.route);return}var se=chkSpecialEnding(stats,gi,act,trust,logs,actFlags);if(se){var def=ENDING_DEFS[se];doGO(def?def.name:'\uc138\uc158 \uc885\ub8cc',stats,gi,se);return}if(stats.c>=85&&stats.day!==cAlertDay){setCAlertDay(stats.day);setTimeout(function(){setToastType('oracle');setToast('[ORACLE: KR-INIT-001 봉쇄 완전성 '+stats.c+'% — 한국지부 안정화 임박]');setTimeout(function(){setToast('')},3800)},700)}
  nextCard(stats,gi,logs,chainQueue);setPhase('game')};
  var hDlg=function(c){SFX.play('dialogue');var ns=applyFx(stats,c.fx||{}),ng=gi+(c.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(curDlg&&c.trust!==undefined)modTrust(curDlg.char,c.trust);var di=curDlg?DIALOGUES.indexOf(curDlg):-1;var csi=curDlg?DIALOGUES.filter(function(d,i){return d.char===curDlg.char&&i<=di}).length-1:0;checkLogs(ns,ng,null,curDlg?curDlg.char:null,csi);Save.saveGame(ns,ng,act,actFlags,transRoute);setCurDlg(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var fullReset=function(){BGM.stop();BGM.started=false;['ts_game','ts_logs','ts_endings','ts_sessions','ts_trust','ts_usedDlg','ts_usedEvening','ts_seenArchive','ts_facility','ts_muted','ts_volume','ts_fontSize','ts_act2_reached'].forEach(function(k){Save.del(k)});window.location.reload()};
  var restart=function(){BGM.stop();BGM.started=false;var ns={c:50,r:65,t:50,o:40,day:1};setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setUsedEvening([]);setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40});setCooldowns({});setRecentCards([]);setAct(1);setTransRoute('');setActFlags({prom_met:false,mission_done:false,chain_done:false,prom_mission:false});setFacility({approved:[],pending:[],completed:[],proposed:[]});setFacOfferedToday(false);Save.clearGame();Save.del('ts_trust');Save.del('ts_usedDlg');Save.del('ts_usedEvening');Save.del('ts_facility');var rl=logs.filter(function(id){return id.indexOf('LOG-INTRO-')!==0&&id!=='ONCE-CA-001'});setLogs(rl);Save.saveLogs(rl);setCurCard(drawCard(ns,0,rl,{},[], 1));setPhase('boot')};
  var restartAct2=function(){BGM.stop();BGM.started=false;var ns={c:50,r:65,t:50,o:40,day:11};var af2={prom_met:false,mission_done:false,chain_done:false,prom_mission:false};setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setUsedEvening([]);setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40});setCooldowns({});setRecentCards([]);setAct(2);setTransRoute('A');setActFlags(af2);setFacility({approved:[],pending:[],completed:[],proposed:[]});setFacOfferedToday(false);Save.clearGame();Save.del('ts_trust');Save.del('ts_usedDlg');Save.del('ts_usedEvening');Save.del('ts_facility');var rl=logs.filter(function(id){return id.indexOf('LOG-INTRO-')!==0&&id!=='ONCE-CA-001'});if(rl.indexOf('LOG-ACT2')<0)rl=rl.concat(['LOG-ACT2']);setLogs(rl);Save.saveLogs(rl);Save.saveGame(ns,0,2,af2,'A');setPhase('briefing')};
  // 대기 중 확장 승인 함수
  var approvePending=function(feId){setFacility(function(prev){
    var next={approved:prev.approved.concat([feId]),pending:prev.pending.filter(function(id){return id!==feId}),completed:prev.completed.slice(),proposed:prev.proposed.slice()};
    Save.saveFacility(next);return next});setToastType('');setToast('시설 확장이 보상 풀에 추가되었습니다');setTimeout(function(){setToast('')},2200)};



  // ═══ 렌더링 (phase 라우팅) ═══
  if(phase==='boot')return h(Boot,{sessions:sessions,onBoot:function(){BGM.startBootLoop()},onDone:function(){BGM.stopBootLoop();BGM.start();if(fp){setPhase('tutorial')}else{setPhase('game')}}});
  if(phase==='tutorial')return h(Tutorial,{canSkip:sessions>0,onSkip:function(){setFp(false);setPhase('game')},onDone:function(){setFp(false);setPhase('game')}});
  if(phase==='briefing')return h(BriefingScreen,{act:act,stats:stats,transRoute:transRoute,onEnter:function(){Save.saveGame(stats,gi,act,actFlags,transRoute);nextCard(stats,gi,logs,chainQueue);setPhase('game')}});
  if(phase==='go')return h(GameOver,{stats:stats,reason:gor,gi:gi,sessions:sessions,endNarr:endNarr,endId:endId,onRestart:restart,onRestartAct2:restartAct2,canSkipToAct2:act2Reached&&sessions>0,onLogs:function(){setRet('go');setPhase('logs')},onArchive:function(){setRet('go');setPhase('archive')},onEndings:function(){setRet('go');setPhase('endings')}});
  if(phase==='news')return h('div',{className:'screen'},h(News,{headlines:nh,day:stats.day,stats:stats,prevStats:prevStats,gi:gi,act:act,facility:facility,onContinue:function(){setPhase('reward')}}));
  if(phase==='reward')return h(RewardScreen,{stats:stats,onPick:hReward,facility:facility});
  if(phase==='evening'){BGM.setTempVolume(0.04);return h(React.Fragment,null,h(EveningChat,{day:stats.day,act:act,logs:logs,trust:trust,usedEvening:usedEvening,onMarkEvening:function(key){setUsedEvening(function(p){if(p.indexOf(key)>=0)return p;var n=p.concat([key]);Save.saveUsedEvening(n);return n})},onChat:function(cn){modTrust(cn,1)},onResponse:function(cn,delta){modTrust(cn,delta)},onDone:function(){BGM.restoreVolume();hEvening()},onTrustMod:function(ck,v){modTrust(ck,v)},onGiMod:function(v){setGi(function(g){return g+v})},onLog:function(id){tryUnlock(id)}}))};
  if(phase==='dialogue'&&curDlg)return h(Dialogue,{dialogue:curDlg,onChoice:hDlg});
  if(phase==='mission'&&curMission)return h(FieldMission,{missionId:curMission,onComplete:hMission});
  if(phase==='logs')return h(LogViewer,{unlockedIds:logs,onClose:function(){setPhase(ret)}});
  if(phase==='archive')return h(ArchiveViewer,{logs:logs,seenArchive:seenArchive,onMarkSeen:function(id){setSeenArchive(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveSeenArchive(n);return n})},onClose:function(){setPhase(ret)}});
  if(phase==='endings')return h(EndingScreen,{endings:endings,sessions:sessions,onClose:function(){setPhase(ret)}});
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // TERMINAL SESSION')),
    h(Stats,{stats:stats,preview:preview}),
    h('div',{className:'info-bar'},
      h('span',{className:'info-tag'},'ACT '+act),
      h('span',{className:'info-tag'},'카드 '+(ct+1)+' / '+cpd),
      h('span',{className:'info-tag',style:{cursor:'pointer',marginLeft:'auto',padding:'6px 10px'},onClick:function(){setShowSettings(true)}},'☰')),
    h(CardC,{card:curCard,onSwipe:swipe,onPreview:setPreview,gi:gi,day:stats.day,onOracleBlock:function(msg){setToastType('oracle');setToast(msg);setTimeout(function(){setToast('')},2600)}}),
    toast&&h('div',{style:(function(){var isGreen=toastType==='result'||toastType==='oracle';return{position:'fixed',top:isGreen?'auto':'50%',bottom:isGreen?60:'auto',left:'50%',transform:isGreen?'translateX(-50%)':'translate(-50%,-50%)',background:isGreen?'rgba(10,18,10,.88)':'rgba(255,68,68,0.15)',border:'1px solid '+(isGreen?'rgba(145,255,106,.3)':'rgba(255,68,68,0.4)'),borderRadius:4,padding:'8px 16px',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:isGreen?'rgba(157,255,116,.8)':'#ff6644',letterSpacing:1,zIndex:50,animation:'fadeIn 0.3s ease',textAlign:'center',maxWidth:320}})()},toast),
    showSettings&&h(SettingsPanel,{onClose:function(){setShowSettings(false)},onReset:restart,onFullReset:fullReset,onLogs:function(){setShowSettings(false);setRet('game');setPhase('logs')},onArchive:function(){setShowSettings(false);setRet('game');setPhase('archive')}}));
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
