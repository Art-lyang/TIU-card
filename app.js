// TERMINAL SESSION — app.js (App Component) — 로직: app-logic.js, 유틸: app-utils.js
function App(){
  var _p=useState('boot'),phase=_p[0],setPhase=_p[1];
  var _s=useState({c:50,r:65,t:50,o:40,day:1}),stats=_s[0],setStats=_s[1];
  var _g=useState(0),gi=_g[0],setGi=_g[1];
  var _ct=useState(0),ct=_ct[0],setCt=_ct[1];
  var _nh=useState([]),nh=_nh[0],setNh=_nh[1];
  var _gor=useState(''),gor=_gor[0],setGor=_gor[1];
  var _en=useState(null),endNarr=_en[0],setEndNarr=_en[1];
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
  var _act=useState(1),act=_act[0],setAct=_act[1];
  var _af=useState({prom_met:false,mission_done:false,chain_done:false,prom_mission:false}),actFlags=_af[0],setActFlags=_af[1];
  var _tr2=useState(''),transRoute=_tr2[0],setTransRoute=_tr2[1];
  var _ps=useState(null),prevStats=_ps[0],setPrevStats=_ps[1];
  var _fac=useState({approved:[],pending:[],completed:[],proposed:[]}),facility=_fac[0],setFacility=_fac[1];
  var _facOffer=useState(false),facOfferedToday=_facOffer[0],setFacOfferedToday=_facOffer[1];
  var _trustToast=useState(null),trustToast=_trustToast[0],setTrustToast=_trustToast[1];
  var cpd=act===1?5:act===2?6:7;

  // Act별 UI 컬러 적용
  useEffect(function(){
    var root=document.getElementById('root');
    if(root){root.className='act-'+act}
  },[act]);

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
    if(sg&&sg.act){setAct(sg.act);if(sg.actFlags)setActFlags(sg.actFlags);if(sg.transRoute)setTransRoute(sg.transRoute)}
    else{sl=(sl||['LOG-001']).filter(function(id){return id.indexOf('LOG-INTRO-')!==0});Save.saveLogs(sl);setLogs(sl);setUsedDlg([]);Save.saveUsedDlg([]);setUsedEvening([]);Save.saveUsedEvening([])}
    var initAct=(sg&&sg.act)||1;
    setCurCard(drawCard({c:50,r:65,t:50,o:40,day:1},0,sl||['LOG-001'],{},[], initAct));
  },[]);

  var _bgmMuted=useState(false),bgmMuted=_bgmMuted[0],setBgmMuted=_bgmMuted[1];

  var tryUnlock=function(id){setLogs(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveLogs(n);return n})};
  var modTrust=function(char,delta){setTrust(function(prev){var key={"\uc11c\ud558\uc740":"haeun","\uac15\ub3c4\uc724":"doyun","\uc724\uc138\uc9c4":"sejin","\uc784\uc7ac\ud601":"jaehyuk","\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84":"weber","\ub2c9 \ud3ec\uc2a4\ud130":"foster","\ubc15\uc18c\uc601":"soyoung"}[char];if(!key)return prev;var next={};for(var k in prev)next[k]=prev[k];next[key]=Math.max(0,Math.min(100,prev[key]+delta));Save.set('ts_trust',next);
    // trust 변화 토스트 피드백
    var arrow=delta>0?'▲':'▼';var color=delta>0?'#9dff74':'#ff6644';
    setTrustToast({char:char,delta:delta,arrow:arrow,color:color});
    setTimeout(function(){setTrustToast(null)},1800);
    return next})};
  // checkLogs 래퍼: app-logic.js의 checkLogsAll 호출
  var checkLogs=function(s,g,cid,dc,di,dir){checkLogsAll(s,g,cid,dc,di,dir,logs,trust,tryUnlock)};
  var doGO=function(reason,ns,ng,specialId){BGM.stop();setGor(reason);var eid=specialId||null;if(!eid){if(ns.c<=0)eid='C_c';else if(ns.c>=100)eid=(logs.indexOf('LOG-050')>=0&&logs.indexOf('LOG-082')>=0)?'C_cst':'C_cs';else if(ns.r<=0)eid='C_r';else if(ns.t<=0)eid='C_t';else if(ns.o<=0)eid='C_o';if(ng>=60)eid='A'}if(eid&&ENDING_DEFS[eid])setEndNarr(ENDING_DEFS[eid]);else setEndNarr(null);if(eid)Save.saveEnding(eid);setEndings(Save.getEndings());setSessions(Save.incSession());Save.clearGame();setTimeout(function(){setPhase('go')},500)};
  var tryDlg=function(){var av=DIALOGUES.filter(function(d,i){if(usedDlg.indexOf(i)>=0)return false;if(d.char==='\uc11c\ud558\uc740'&&logs.indexOf('LOG-050')>=0)return false;if(d.logReq&&logs.indexOf(d.logReq)<0)return false;if(d.trustReq&&!d.trustReq(trust))return false;var earlier=false;DIALOGUES.forEach(function(d2,j){if(j<i&&d2.char===d.char&&usedDlg.indexOf(j)<0&&(!d2.trustReq||d2.trustReq(trust))&&(!d2.logReq||logs.indexOf(d2.logReq)>=0))earlier=true});return!earlier});if(!isIntrosDone(logs)){var introAv=av.filter(function(d){return isIntroDlgCheck(d,DIALOGUES.indexOf(d))});if(introAv.length>0){var d=pick(introAv);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false}
    // 박소영 합류 후 첫 대화 보장
    if(logs.indexOf('LOG-082')>=0&&logs.indexOf('LOG-INTRO-SY')<0){var syAv=av.filter(function(d){return d.char==='\ubc15\uc18c\uc601'});if(syAv.length>0){var d=syAv[0];setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}}var prob=0.35;if(av.length>0&&Math.random()<prob){var d=pick(av);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false};
  var nextCard=function(s,g,lg,cq,curAct){var a=curAct||act;if(cq&&cq.length>0){setCurCard(cq[0]);setChainQueue(cq.slice(1))}else{
    // 시설 확장 제안 카드 체크 (하루 1회, 30%)
    if(!facOfferedToday&&typeof tryFacilityProposal==='function'){var fp2=tryFacilityProposal(s,a,facility);if(fp2){setCurCard(fp2);setFacOfferedToday(true);return}}
    var c=drawCard(s,g,lg,cooldowns,recentCards,a,transRoute,facility.completed);setCurCard(c);setRecentCards(function(p){var n=p.concat([c.id]);return n.length>30?n.slice(n.length-30):n})}};
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
    if(newAct===2)tryUnlock('LOG-ACT2');
    if(newAct===3)tryUnlock('LOG-ACT3');
    var penalty=route==='A'?0:route==='B'||route==='C'?2:4;
    if(newAct===3)penalty+=3;
    if(penalty>0){var ns={c:clamp(s.c-penalty),r:clamp(s.r-penalty),t:clamp(s.t-penalty),o:clamp(s.o-penalty),day:s.day};setStats(ns)}
    setPhase('briefing');
  };
  var swipe=function(dir){
    SFX.play('swipe');setToast('');
    if(curCard.isFacilityProposal){
      var feId=curCard.feId;
      setFacility(function(prev){
        var next={approved:prev.approved.slice(),pending:prev.pending.slice(),completed:prev.completed.slice(),proposed:prev.proposed.concat([feId])};
        if(dir==='right'){next.approved.push(feId);setToast('시설 확장이 보상 풀에 추가되었습니다');setTimeout(function(){setToast('')},2200)}
        else{next.pending.push(feId);setToast('확장 제안이 대기 목록에 추가되었습니다');setTimeout(function(){setToast('')},2200)}
        Save.saveFacility(next);return next});
      var nct=ct+1;setCt(nct);
      if(nct>=cpd){SFX.play('news');setNh(genNewsHeadlines(stats,gi));setTimeout(function(){setPhase('news')},400)}
      else{nextCard(stats,gi,logs,chainQueue)}
      return;
    }
    var ch=dir==='left'?curCard.left:curCard.right;
    var fx=ch.fx;
    // 자원 리스크: 보급 카드(bg=supply)에서만, r>=2일 때 20% 확률로 실패
    var riskFired=false;
    if(curCard.bg==='supply'&&fx&&fx.r>=2&&Math.random()<0.2){fx={};for(var k in ch.fx)fx[k]=ch.fx[k];fx.r=0;riskFired=RISK_MSG[Math.floor(Math.random()*RISK_MSG.length)]}
    var ns=applyFx(stats,fx),ng=gi+(ch.g||0);setStats(ns);setGi(ng);
    if(curCard.tag){var ncd={};for(var k in cooldowns)ncd[k]=cooldowns[k];ncd[curCard.tag]=stats.day;setCooldowns(ncd)}
    checkLogs(ns,ng,curCard.id,null,null,dir);
    var isChainDone=curCard.id.indexOf('CH-')===0&&chainQueue.length===0;
    updateActFlags(curCard.id,ch.mission?ch.mission:null,isChainDone);
    Save.saveGame(ns,ng,act,actFlags,transRoute);
    // fePropose: 카드 선택지가 시설 확장 제안을 포함하는 경우
    if(ch.fePropose){var fpId=ch.fePropose;setFacility(function(prev){if(prev.proposed.indexOf(fpId)>=0||prev.approved.indexOf(fpId)>=0)return prev;var next={approved:prev.approved.concat([fpId]),pending:prev.pending.slice(),completed:prev.completed.slice(),proposed:prev.proposed.concat([fpId])};Save.saveFacility(next);return next});setToast('시설 확장이 보상 풀에 등록되었습니다');setTimeout(function(){setToast('')},2200)}
    var isDanger=ns.c<=25||ns.r<=25||ns.t<=25||ns.o<=25;BGM.setDanger(isDanger);
    var nct=ct+1;setCt(nct);var go=chkGameOver(ns);
    if(go){SFX.play('gameover');doGO(go,ns,ng);return}
    if(ch.mission&&MISSIONS[ch.mission]){SFX.play('mission');setCurMission(ch.mission);setTimeout(function(){setPhase('mission')},400);return}
    var triggerKey=curCard.id+'-'+dir;var chain=null;
    Object.keys(CHAINS).forEach(function(k){if(CHAINS[k].trigger===triggerKey)chain=CHAINS[k]});
    var cq=chainQueue;if(chain){SFX.play('glitch');cq=chain.cards;setChainQueue(cq)}
    if(nct>=cpd){SFX.play('news');setNh(genNewsHeadlines(ns,ng));setTimeout(function(){setPhase('news')},400)}
    else if(!isIntrosDone(logs)){setTimeout(function(){if(!tryDlg())nextCard(ns,ng,logs,cq)},300)}
    else if(nct===2||nct===3){setTimeout(function(){if(!tryDlg())nextCard(ns,ng,logs,cq)},300)}
    else{nextCard(ns,ng,logs,cq)}
    // 자원 리스크 토스트: 카드 전환 후 표시 (스포일러 방지)
    if(riskFired){setTimeout(function(){setToast(riskFired);setTimeout(function(){setToast('')},2800)},600)}
  };
  var hMission=function(o){if(o.gOnly){setGi(function(g){return g+(o.g||0)});return}SFX.play('reward');var ns=applyFx(stats,o.result||{}),ng=gi+(o.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(o.log){if(Array.isArray(o.log)){o.log.forEach(function(l){tryUnlock(l)})}else{tryUnlock(o.log)}}updateActFlags(null,curMission,false);Save.saveGame(ns,ng,act,actFlags,transRoute);setCurMission(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var hReward=function(r){SFX.play('reward');var ns=applyFx(stats,r.fx);ns.c=Math.max(5,ns.c);ns.r=Math.max(5,ns.r);ns.t=Math.max(5,ns.t);ns.o=Math.max(5,ns.o);
    if(act===2){ns.c=Math.max(5,ns.c-1);ns.r=Math.max(5,ns.r-1)}
    if(act===3){ns.c=Math.max(5,ns.c-2);ns.r=Math.max(5,ns.r-2);ns.t=Math.max(5,ns.t-1)}
    // 시설 확장 리워드 완료 처리
    if(r.feId){setFacility(function(prev){
      var next={approved:prev.approved.slice(),pending:prev.pending.slice(),completed:prev.completed.concat([r.feId]),proposed:prev.proposed.slice()};
      Save.saveFacility(next);
      // 커버 스토리 LOG 해금
      var fe=FACILITY_EXPANSIONS.filter(function(f){return f.id===r.feId})[0];
      if(fe&&fe.coverLog)tryUnlock(fe.coverLog);
      return next})}
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1};setPrevStats({c:stats.c,r:stats.r,t:stats.t,o:stats.o});setStats(next);Save.saveGame(next,gi,act,actFlags,transRoute);setCt(0);setFacOfferedToday(false);
    setPhase('evening')};
  var hEvening=function(){var trans=checkActTransitionLogic(stats,gi,logs,actFlags,act);if(trans){doBriefing(trans.act,stats,trans.route);return}var se=chkSpecialEnding(stats,gi,act,trust,logs,actFlags);if(se){var def=ENDING_DEFS[se];doGO(def?def.name:'\uc138\uc158 \uc885\ub8cc',stats,gi,se);return}nextCard(stats,gi,logs,chainQueue);setPhase('game')};
  var hDlg=function(c){SFX.play('dialogue');var ns=applyFx(stats,c.fx||{}),ng=gi+(c.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(curDlg&&c.trust!==undefined)modTrust(curDlg.char,c.trust);var di=curDlg?DIALOGUES.indexOf(curDlg):-1;var csi=curDlg?DIALOGUES.filter(function(d,i){return d.char===curDlg.char&&i<=di}).length-1:0;checkLogs(ns,ng,null,curDlg?curDlg.char:null,csi);Save.saveGame(ns,ng,act,actFlags,transRoute);setCurDlg(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var restart=function(){BGM.stop();BGM.started=false;var ns={c:50,r:65,t:50,o:40,day:1};setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setUsedEvening([]);setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40});setCooldowns({});setRecentCards([]);setAct(1);setTransRoute('');setActFlags({prom_met:false,mission_done:false,chain_done:false,prom_mission:false});setFacility({approved:[],pending:[],completed:[],proposed:[]});setFacOfferedToday(false);Save.clearGame();Save.del('ts_trust');Save.del('ts_usedDlg');Save.del('ts_usedEvening');Save.del('ts_facility');var rl=logs.filter(function(id){return id.indexOf('LOG-INTRO-')!==0});setLogs(rl);Save.saveLogs(rl);setCurCard(drawCard(ns,0,rl,{},[], 1));setPhase('boot')};
  // 대기 중 확장 승인 함수
  var approvePending=function(feId){setFacility(function(prev){
    var next={approved:prev.approved.concat([feId]),pending:prev.pending.filter(function(id){return id!==feId}),completed:prev.completed.slice(),proposed:prev.proposed.slice()};
    Save.saveFacility(next);return next});setToast('시설 확장이 보상 풀에 추가되었습니다');setTimeout(function(){setToast('')},2200)};

  var renderTrustToast=function(){if(!trustToast)return null;var tt=trustToast;
    return h('div',{style:{position:'fixed',bottom:100,left:'50%',transform:'translateX(-50%)',background:'rgba(10,18,10,.85)',border:'1px solid '+tt.color,borderRadius:4,padding:'6px 16px',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:tt.color,letterSpacing:1,zIndex:200,animation:'fadeIn 0.3s ease',textAlign:'center',boxShadow:'0 0 12px '+(tt.delta>0?'rgba(157,255,116,.2)':'rgba(255,102,68,.2)')}},tt.char+' '+tt.arrow+(tt.delta>0?'+':'')+tt.delta)};

  // ═══ 렌더링 (phase 라우팅) ═══
  if(phase==='boot')return h(Boot,{sessions:sessions,onBoot:function(){BGM.startBootLoop()},onDone:function(){BGM.stopBootLoop();BGM.start();if(fp){setPhase('tutorial')}else{setPhase('game')}}});
  if(phase==='tutorial')return h(Tutorial,{canSkip:sessions>0,onSkip:function(){setFp(false);setPhase('game')},onDone:function(){setFp(false);setPhase('game')}});
  if(phase==='briefing')return h(BriefingScreen,{act:act,stats:stats,transRoute:transRoute,onEnter:function(){
      Save.saveGame(stats,gi,act,actFlags,transRoute);nextCard(stats,gi,logs,chainQueue);setPhase('game')}});
  if(phase==='go')return h(GameOver,{stats:stats,reason:gor,gi:gi,sessions:sessions,endNarr:endNarr,onRestart:restart,onLogs:function(){setRet('go');setPhase('logs')},onArchive:function(){setRet('go');setPhase('archive')},onEndings:function(){setRet('go');setPhase('endings')}});
  if(phase==='news')return h('div',{className:'screen'},h(News,{headlines:nh,day:stats.day,stats:stats,prevStats:prevStats,gi:gi,act:act,facility:facility,onContinue:function(){setPhase('reward')}}));
  if(phase==='reward')return h(RewardScreen,{stats:stats,onPick:hReward,facility:facility});
  if(phase==='evening'){BGM.setTempVolume(0.04);return h(React.Fragment,null,h(EveningChat,{day:stats.day,act:act,logs:logs,trust:trust,usedEvening:usedEvening,onMarkEvening:function(key){setUsedEvening(function(p){if(p.indexOf(key)>=0)return p;var n=p.concat([key]);Save.saveUsedEvening(n);return n})},onChat:function(cn){modTrust(cn,1)},onResponse:function(cn,delta){modTrust(cn,delta)},onDone:function(){BGM.restoreVolume();hEvening()},onTrustMod:function(ck,v){modTrust(ck,v)},onGiMod:function(v){setGi(function(g){return g+v})}}),renderTrustToast());}
  if(phase==='dialogue'&&curDlg)return h(React.Fragment,null,h(Dialogue,{dialogue:curDlg,onChoice:hDlg}),renderTrustToast());
  if(phase==='mission'&&curMission)return h(FieldMission,{missionId:curMission,onComplete:hMission});
  if(phase==='logs')return h(LogViewer,{unlockedIds:logs,onClose:function(){setPhase(ret)}});
  if(phase==='archive')return h(ArchiveViewer,{logs:logs,seenArchive:seenArchive,onMarkSeen:function(id){setSeenArchive(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveSeenArchive(n);return n})},onClose:function(){setPhase(ret)}});
  if(phase==='endings')return h(EndingScreen,{endings:endings,sessions:sessions,onClose:function(){setPhase(ret)}});
  // facility는 오버레이로 게임 위에 표시 (아래 게임 return에서 렌더링)
  return h(React.Fragment,null,
    h('div',{className:'screen'},
      h('div',{className:'title-frame'},h('span',null,'ORACLE // TERMINAL SESSION')),
      h(Stats,{stats:stats,preview:preview}),
      h('div',{className:'info-bar'},
        h('span',{className:'info-tag'},'ACT '+act),
        h('span',{className:'info-tag'},'카드 '+(ct+1)+'/'+cpd),
        h('span',{className:'info-tag info-tag-log',onClick:function(){setRet('game');setPhase('logs')}},'LOG '+ORACLE_LOGS.filter(function(l){return logs.indexOf(l.id)>=0}).length+'/'+ORACLE_LOGS.length),
        h('span',{className:'info-tag info-tag-archive',onClick:function(){setRet('game');setPhase('archive')}},(function(){var uc=typeof ARCHIVE_ENTRIES!=='undefined'?ARCHIVE_ENTRIES.filter(function(e){return e.unlock(logs)}).length:0;var nc=typeof ARCHIVE_ENTRIES!=='undefined'?ARCHIVE_ENTRIES.filter(function(e){return e.unlock(logs)&&seenArchive.indexOf(e.id)<0}).length:0;return '\uc544\uce74\uc774\ube0c '+(nc>0?'\u25CF':'')})()),
        facility.proposed.length>0&&h('span',{className:'info-tag',style:{color:'#4ae',cursor:'pointer'},onClick:function(){setPhase(phase==='facility'?'game':'facility')}},'시설'+(facility.pending.length>0?' ●':'')),
        usedEvening.some(function(k){return k.indexOf('\uc784\uc7ac\ud601')===0})&&h('span',{className:'info-tag',style:{color:'#f0a030',cursor:'pointer'},onClick:function(){setPhase(phase==='evidence'?'game':'evidence')}},'자료수집')),
      h(CardC,{card:curCard,onSwipe:swipe,onPreview:setPreview,gi:gi,day:stats.day}),
      toast&&h('div',{style:{position:'fixed',bottom:80,left:'50%',transform:'translateX(-50%)',background:'rgba(255,68,68,0.15)',border:'1px solid rgba(255,68,68,0.4)',borderRadius:4,padding:'8px 16px',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#ff6644',letterSpacing:1,zIndex:50,animation:'fadeIn 0.3s ease',textAlign:'center',maxWidth:300}},toast),
      h('div',{className:'footer-frame',style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},h('span',null,'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'),h('span',{style:{cursor:'pointer',fontSize:10,opacity:0.5,letterSpacing:1,fontFamily:"'Share Tech Mono',monospace"},onClick:function(){BGM.toggleMute();setToast(BGM.muted?'AUDIO: OFF':'AUDIO: ON');setTimeout(function(){setToast('')},1200)}},BGM.muted?'[MUTE]':'[SND]'))),
    phase==='facility'&&h(FacilityPanel,{facility:facility,onApprove:approvePending,onClose:function(){setPhase('game')}}),
    phase==='evidence'&&typeof EvidencePanel==='function'&&h(EvidencePanel,{logs:logs,onTrust:function(ck,v){modTrust(ck,v)},onGi:function(v){setGi(function(g){return g+v})},onClose:function(){setPhase('game')}}));
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
