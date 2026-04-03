// TERMINAL SESSION — app.js
// Utils, Save, SFX, App
var CARDS = CARDS_BASE.concat(CARDS_STORY).concat(CARDS_ENDING).concat(CARDS_INVESTIGATE);
var pick=function(a){return a[Math.floor(Math.random()*a.length)]};
var pickN=function(a,n){return[].concat(a).sort(function(){return Math.random()-0.5}).slice(0,Math.min(n,a.length))};
var clamp=function(v,lo,hi){return Math.max(lo||0,Math.min(hi||100,v))};
var applyFx=function(s,fx,m){m=m||5;return{c:clamp(s.c+(fx.c||0)*m),r:clamp(s.r+(fx.r||0)*m),t:clamp(s.t+(fx.t||0)*m),o:clamp(s.o+(fx.o||0)*m),day:s.day}};
var drawCard=function(stats,gi,logs,cooldowns,recent,currentAct){
  var day=stats.day||1;var cd=cooldowns||{};var rec=recent||[];var ca=currentAct||1;
  var valid=CARDS.filter(function(c){
    if(c.act&&c.act.indexOf(ca)<0)return false;
    if(c.req&&!c.req(stats,gi,logs))return false;
    if(c.tag&&cd[c.tag]&&(day-cd[c.tag])<3)return false;
    if(rec.indexOf(c.id)>=0)return false;
    return true;
  });
  if(valid.length===0)valid=CARDS.filter(function(c){return(!c.act||c.act.indexOf(ca)>=0)&&!c.req&&rec.indexOf(c.id)<0});
  return pick(valid.length>0?valid:CARDS.filter(function(c){return!c.req}).slice(0,15));
};

var Save={
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  get:function(k,def){try{var d=localStorage.getItem(k);return d?JSON.parse(d):def}catch(e){return def}},
  del:function(k){try{localStorage.removeItem(k)}catch(e){}},
  saveGame:function(s,g,a,af){Save.set('ts_game',{stats:s,gi:g,act:a||1,actFlags:af||{}})},
  clearGame:function(){Save.del('ts_game')},
  saveLogs:function(ids){Save.set('ts_logs',ids)},
  getLogs:function(){return Save.get('ts_logs',['LOG-001'])},
  saveEnding:function(id){var e=Save.get('ts_endings',[]);if(e.indexOf(id)<0){e.push(id);Save.set('ts_endings',e)}},
  getEndings:function(){return Save.get('ts_endings',[])},
  getSessions:function(){return Save.get('ts_sessions',0)},
  incSession:function(){var c=Save.getSessions()+1;Save.set('ts_sessions',c);return c},
  saveUsedDlg:function(ids){Save.set('ts_usedDlg',ids)},getUsedDlg:function(){return Save.get('ts_usedDlg',[])}
};

var SFX={
  ctx:null,
  init:function(){if(!this.ctx)try{this.ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}},
  tone:function(freq,dur,type,vol){this.init();if(!this.ctx)return;var o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type||'sine';o.frequency.value=freq;g.gain.setValueAtTime(vol||0.15,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+dur);o.connect(g);g.connect(this.ctx.destination);o.start();o.stop(this.ctx.currentTime+dur)},
  noise:function(dur,vol){this.init();if(!this.ctx)return;var buf=this.ctx.createBuffer(1,this.ctx.sampleRate*dur,this.ctx.sampleRate),d=buf.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(vol||0.08);var s=this.ctx.createBufferSource();s.buffer=buf;var g=this.ctx.createGain();g.gain.setValueAtTime(vol||0.08,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+dur);s.connect(g);g.connect(this.ctx.destination);s.start()},
  play:function(name){try{var self=this;switch(name){
    case'swipe':self.tone(200,0.08,'square',0.06);setTimeout(function(){self.tone(300,0.06,'square',0.04)},40);break;
    case'news':self.tone(800,0.03,'square',0.04);break;
    case'dialogue':self.tone(500,0.1,'sine',0.08);setTimeout(function(){self.tone(700,0.12,'sine',0.06)},80);break;
    case'reward':self.tone(400,0.1,'sine',0.1);setTimeout(function(){self.tone(600,0.1,'sine',0.08)},100);setTimeout(function(){self.tone(800,0.15,'sine',0.06)},200);break;
    case'gameover':self.tone(300,0.3,'sawtooth',0.1);setTimeout(function(){self.tone(150,0.5,'sawtooth',0.08)},200);setTimeout(function(){self.noise(0.3,0.06)},500);break;
    case'glitch':self.noise(0.15,0.1);self.tone(60,0.1,'square',0.08);break;
    case'mission':self.tone(100,0.4,'sine',0.08);self.tone(150,0.3,'sine',0.06);break;
  }}catch(e){}}
};

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
  var _logs=useState(['LOG-001']),logs=_logs[0],setLogs=_logs[1];
  var _ends=useState([]),endings=_ends[0],setEndings=_ends[1];
  var _sess=useState(0),sessions=_sess[0],setSessions=_sess[1];
  var _ret=useState('game'),ret=_ret[0],setRet=_ret[1];
  var _cc=useState(CARDS[0]),curCard=_cc[0],setCurCard=_cc[1];
  var _cm=useState(null),curMission=_cm[0],setCurMission=_cm[1];
  var _tr=useState({haeun:50,doyun:50,sejin:50,jaehyuk:50}),trust=_tr[0],setTrust=_tr[1];
  var _cq=useState([]),chainQueue=_cq[0],setChainQueue=_cq[1];
  var _cd=useState({}),cooldowns=_cd[0],setCooldowns=_cd[1];
  var _rc=useState([]),recentCards=_rc[0],setRecentCards=_rc[1];
  var _act=useState(1),act=_act[0],setAct=_act[1];
  var _af=useState({prom_met:false,mission_done:false,chain_done:false,prom_mission:false}),actFlags=_af[0],setActFlags=_af[1];
  var cpd=act===1?5:act===2?6:7;

  useEffect(function(){
    var sl=Save.getLogs();if(sl)setLogs(sl);
    var se=Save.getEndings();if(se)setEndings(se);
    setSessions(Save.getSessions());
    var st=Save.get('ts_trust',null);if(st)setTrust(st);
    var sud=Save.getUsedDlg();if(sud&&sud.length)setUsedDlg(sud);
    var sg=Save.get('ts_game',null);
    if(sg&&sg.act){setAct(sg.act);if(sg.actFlags)setActFlags(sg.actFlags)}
    var initAct=(sg&&sg.act)||1;
    setCurCard(drawCard({c:50,r:65,t:50,o:40,day:1},0,sl||['LOG-001'],{},[], initAct));
  },[]);

  var tryUnlock=function(id){setLogs(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveLogs(n);return n})};
  var modTrust=function(char,delta){setTrust(function(prev){var key={"\uc11c\ud558\uc740":"haeun","\uac15\ub3c4\uc724":"doyun","\uc724\uc138\uc9c4":"sejin","\uc784\uc7ac\ud601":"jaehyuk"}[char];if(!key)return prev;var next={};for(var k in prev)next[k]=prev[k];next[key]=Math.max(0,Math.min(100,prev[key]+delta));Save.set('ts_trust',next);return next})};
  var checkLogs=function(s,g,cid,dc,di){
    if(s.day>=3)tryUnlock('LOG-002');if(s.day>=7)tryUnlock('LOG-011');
    if(cid==='C-006')tryUnlock('LOG-003');if(cid==='C-003')tryUnlock('LOG-004');if(cid==='C-010')tryUnlock('LOG-005');
    if(cid==='C-042'||cid==='C-043')tryUnlock('LOG-013');
    if(cid==='C-044'||cid==='C-045')tryUnlock('LOG-014');
    if(cid==='C-046'||cid==='C-047')tryUnlock('LOG-015');
    if(cid==='CH-004-2')tryUnlock('LOG-009');
    if(cid==='C-053'||cid==='CH-005-2')tryUnlock('LOG-016');
    if(cid==='C-067')tryUnlock('LOG-017');
    if(cid==='C-074'||cid==='CH-006-2')tryUnlock('LOG-018');
    if(cid==='C-079'||cid==='C-086')tryUnlock('LOG-019');
    if(dc==='\uc11c\ud558\uc740'&&di===0)tryUnlock('LOG-006');if(dc==='\uc724\uc138\uc9c4'&&di===0)tryUnlock('LOG-007');
    if(dc==='\uac15\ub3c4\uc724'&&di===0)tryUnlock('LOG-008');if(dc==='\uc784\uc7ac\ud601'&&di===1)tryUnlock('LOG-012');
    if(g<=-15)tryUnlock('LOG-009');if(g<=-30)tryUnlock('LOG-010');
    if(trust.haeun>=70)tryUnlock('LOG-006');if(trust.sejin>=70)tryUnlock('LOG-007');if(trust.doyun>=65)tryUnlock('LOG-008');
  };
  var chk=function(s){if(s.c<=0)return'\ubd09\uc1c4\uc120 \ubd95\uad34. \uc2dc\uc124 \uc790\uccb4 \ubd09\uc1c4 \ud504\ub85c\ud1a0\ucf5c \ubc1c\ub3d9 — \uae30\uc9c0 \ud3d0\uae30 \uc808\ucc28\uac00 \uac1c\uc2dc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.c>=100)return'[GRANT EXPIRED — UPON_FULL_ESTABLISHMENT] \ud55c\uad6d \uc9c0\ubd80 \uc548\uc815\ud654 \uc644\ub8cc. \uc784\uc2dc \uad8c\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc138\uc158\uc744 \uc885\ub8cc\ud569\ub2c8\ub2e4.';if(s.r<=0)return'\uc790\uc6d0 \uace0\uac08. \uae30\uc9c0 \uae30\ub2a5\uc774 \ub9c8\ube44\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.t<=0)return'\uc778\uc6d0 \uc2e0\ub8b0 \ubd95\uad34. \uae30\uc9c0 \uc694\uc6d0\ub4e4\uc774 \uc774\ud0c8\ud588\uc2b5\ub2c8\ub2e4.';if(s.o<=0)return'ORACLE \uc811\uc18d \ucc28\ub2e8. \ub2e8\ub9d0\uae30 \uc5f0\uacb0\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';return null};
  var genNews=function(s,g){var l=[];if(s.c>60)l.push(pick(NP.gc));else if(s.c<40)l.push(pick(NP.bc));if(s.r<30)l.push(pick(NP.br));if(Math.random()<0.4)l.push(pick(NP.w));if(s.day>3&&Math.random()<0.3)l.push(pick(NP.p));if(g<=-10&&s.day>5&&Math.random()<0.4)l.push(pick(NP.gl));if(!l.length)l.push(pick(NP.w));return l};
  var doGO=function(reason,ns,ng,specialId){setGor(reason);var eid=specialId||null;if(!eid){if(ns.c<=0)eid='C_c';else if(ns.c>=100)eid='C_c';else if(ns.r<=0)eid='C_r';else if(ns.t<=0)eid='C_t';else if(ns.o<=0)eid='C_o';if(ng>=60)eid='A'}if(eid&&ENDING_DEFS[eid])setEndNarr(ENDING_DEFS[eid]);else setEndNarr(null);if(eid)Save.saveEnding(eid);setEndings(Save.getEndings());setSessions(Save.incSession());Save.clearGame();setTimeout(function(){setPhase('go')},500)};
  var tryDlg=function(){var av=DIALOGUES.filter(function(d,i){return usedDlg.indexOf(i)<0&&(!d.trustReq||d.trustReq(trust))});if(av.length>0&&Math.random()<0.35){var d=pick(av);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false};
  var nextCard=function(s,g,lg,cq,curAct){var a=curAct||act;if(cq&&cq.length>0){setCurCard(cq[0]);setChainQueue(cq.slice(1))}else{var c=drawCard(s,g,lg,cooldowns,recentCards,a);setCurCard(c);setRecentCards(function(p){var n=p.concat([c.id]);return n.length>8?n.slice(n.length-8):n})}};
  // Act 전환 체크
  var checkActTransition=function(s,g,lg,af,curAct){
    if(curAct===1&&s.day>=10&&af.prom_met&&af.mission_done){return 2}
    if(curAct===2&&s.day>=25&&af.chain_done&&af.prom_mission){return 3}
    return 0;
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
  var doBriefing=function(newAct,s){
    setAct(newAct);
    if(newAct===3){var ns={c:clamp(s.c-5),r:clamp(s.r-5),t:clamp(s.t-5),o:clamp(s.o-5),day:s.day};setStats(ns)}
    setPhase('briefing');
  };
  var swipe=function(dir){
    SFX.play('swipe');var ch=dir==='left'?curCard.left:curCard.right;
    var ns=applyFx(stats,ch.fx),ng=gi+(ch.g||0);setStats(ns);setGi(ng);
    if(curCard.tag){var ncd={};for(var k in cooldowns)ncd[k]=cooldowns[k];ncd[curCard.tag]=stats.day;setCooldowns(ncd)}
    checkLogs(ns,ng,curCard.id,null,null);
    // Track act flags
    var isChainDone=curCard.id.indexOf('CH-')===0&&chainQueue.length===0;
    updateActFlags(curCard.id,ch.mission?ch.mission:null,isChainDone);
    Save.saveGame(ns,ng,act,actFlags);
    var nct=ct+1;setCt(nct);var go=chk(ns);
    if(go){SFX.play('gameover');doGO(go,ns,ng);return}
    if(ch.mission&&MISSIONS[ch.mission]){SFX.play('mission');setCurMission(ch.mission);setTimeout(function(){setPhase('mission')},400);return}
    var triggerKey=curCard.id+'-'+dir;var chain=null;
    Object.keys(CHAINS).forEach(function(k){if(CHAINS[k].trigger===triggerKey)chain=CHAINS[k]});
    var cq=chainQueue;if(chain){SFX.play('glitch');cq=chain.cards;setChainQueue(cq)}
    if(nct>=cpd){SFX.play('news');setNh(genNews(ns,ng));setTimeout(function(){setPhase('news')},400)}
    else if(nct===2||nct===3){setTimeout(function(){if(!tryDlg())nextCard(ns,ng,logs,cq)},300)}
    else{nextCard(ns,ng,logs,cq)}
  };
  var hMission=function(o){if(o.gOnly){setGi(function(g){return g+(o.g||0)});return}SFX.play('reward');var ns=applyFx(stats,o.result||{}),ng=gi+(o.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(o.log)tryUnlock(o.log);updateActFlags(null,curMission,false);Save.saveGame(ns,ng,act,actFlags);setCurMission(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var hReward=function(r){SFX.play('reward');var ns=applyFx(stats,r.fx);ns.c=Math.max(5,ns.c);ns.r=Math.max(5,ns.r);ns.t=Math.max(5,ns.t);ns.o=Math.max(5,ns.o);
    // Act별 일일 감쇠
    if(act===2){ns.c=Math.max(5,ns.c-2);ns.r=Math.max(5,ns.r-2)}
    if(act===3){ns.c=Math.max(5,ns.c-3);ns.r=Math.max(5,ns.r-3);ns.t=Math.max(5,ns.t-1)}
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1};setStats(next);Save.saveGame(next,gi,act,actFlags);setCt(0);
    // Act 전환 체크
    var newAct=checkActTransition(next,gi,logs,actFlags,act);
    if(newAct>0){doBriefing(newAct,next);return}
    // 특수 엔딩 체크 (B/D/F)
    var se=chkSpecialEnding(next,gi,act,trust,logs,actFlags);
    if(se){var def=ENDING_DEFS[se];doGO(def?def.name:'세션 종료',next,gi,se);return}
    nextCard(next,gi,logs,chainQueue);setPhase('game')};
  var hDlg=function(c){SFX.play('dialogue');var ns=applyFx(stats,c.fx||{}),ng=gi+(c.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(curDlg&&c.trust!==undefined)modTrust(curDlg.char,c.trust);var di=curDlg?DIALOGUES.indexOf(curDlg):-1;var csi=curDlg?DIALOGUES.filter(function(d,i){return d.char===curDlg.char&&i<=di}).length-1:0;checkLogs(ns,ng,null,curDlg?curDlg.char:null,csi);Save.saveGame(ns,ng,act,actFlags);setCurDlg(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var restart=function(){var ns={c:50,r:65,t:50,o:40,day:1};setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50});setCooldowns({});setRecentCards([]);setAct(1);setActFlags({prom_met:false,mission_done:false,chain_done:false,prom_mission:false});Save.clearGame();Save.del('ts_trust');Save.del('ts_usedDlg');setCurCard(drawCard(ns,0,logs,{},[], 1));setPhase('boot')};
  if(phase==='boot')return h(Boot,{onDone:function(){if(fp){setPhase('tutorial')}else{setPhase('game')}}});
  if(phase==='tutorial')return h(Tutorial,{onDone:function(){setFp(false);setPhase('game')}});
  if(phase==='briefing')return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // BRIEFING')),
    h('div',{style:{width:'100%',maxWidth:440,background:'url(panel_frame_medium.png) center/100% 100% no-repeat',padding:'28px 30px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',minHeight:0}},
      h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:12}},
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#f0a030',letterSpacing:2}},'ACT '+act+' BRIEFING'),
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:act===3?'#ff4444':'rgba(157,255,116,.6)',letterSpacing:1}},'PRIORITY: '+(act===2?'ELEVATED':'CR\u2588TICAL'))),
      h('div',{style:{fontSize:13,color:'#9dff74',lineHeight:2,borderLeft:'2px solid rgba(145,255,106,.3)',paddingLeft:14,marginBottom:16}},
        '\uc9c0\ub09c '+(stats.day-1)+'\uc77c\uac04\uc758 \uc6b4\uc601 \ub370\uc774\ud130\ub97c \ubd84\uc11d\ud588\uc2b5\ub2c8\ub2e4.'),
      h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:16}},
        ['c','r','t','o'].map(function(k){var nm={c:'\ubd09\uc1c4 \uc548\uc815\uc131',r:'\uc790\uc6d0 \uc794\ub7c9',t:'\uc778\uc6d0 \uc2e0\ub8b0\ub3c4',o:'ORACLE \ud3c9\uac00'};var v=stats[k];var d=v<=25;return h('div',{key:k,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:d?'#ff4444':'#33ff33',padding:'4px 0'}},nm[k]+': '+v+'%')})),
      h('div',{style:{fontSize:13,color:'#f0a030',lineHeight:2,borderLeft:'2px solid rgba(240,160,48,.3)',paddingLeft:14,marginBottom:16}},
        act===2?'\uadf8\ub7ec\ub098 \u2014 \uc0c8\ub85c\uc6b4 \ubcc0\uc218\uac00 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4 \ud65c\ub3d9 \uc9d5\ud6c4\uac00 \ud55c\uad6d \ub0b4\uc5d0\uc11c \uc99d\uac00\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4.\n\uae30\uc874 \uc6b4\uc601 \ud504\ub85c\ud1a0\ucf5c\uc744 \uc7ac\uc870\uc815\ud569\ub2c8\ub2e4.':'\uacbd\uace0: \ud504\ub85c\uba54\ud14c\uc6b0\uc2a4 \uc138\ub825\uc758 \ud65c\ub3d9\uc774 \uc9c1\uc811\uc801 \uc704\ud611 \uc218\uc900\uc5d0 \ub3c4\ub2ec\ud588\uc2b5\ub2c8\ub2e4.\n\uc9c0\ubd80 \uc874\uc18d\uc744 \uc704\ud55c \uacb0\uc815\uc801 \uc870\uce58\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.')),
    h('button',{className:'btn btn-amber',style:{margin:'8px auto',padding:'12px 32px',flexShrink:0},onClick:function(){
      Save.saveGame(stats,gi,act,actFlags);nextCard(stats,gi,logs,chainQueue);setPhase('game');
    }},'[ ENTER ]'));
  if(phase==='go')return h(GameOver,{stats:stats,reason:gor,gi:gi,endNarr:endNarr,onRestart:restart,onLogs:function(){setRet('go');setPhase('logs')},onEndings:function(){setRet('go');setPhase('endings')}});
  if(phase==='news')return h('div',{className:'screen',style:{justifyContent:'center'}},h(News,{headlines:nh,day:stats.day,stats:stats,gi:gi,act:act,onContinue:function(){setPhase('reward')}}));
  if(phase==='reward')return h(RewardScreen,{stats:stats,onPick:hReward});
  if(phase==='dialogue'&&curDlg)return h(Dialogue,{dialogue:curDlg,onChoice:hDlg});
  if(phase==='mission'&&curMission)return h(FieldMission,{missionId:curMission,onComplete:hMission});
  if(phase==='logs')return h(LogViewer,{unlockedIds:logs,onClose:function(){setPhase(ret)}});
  if(phase==='endings')return h(EndingScreen,{endings:endings,sessions:sessions,onClose:function(){setPhase(ret)}});
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // TERMINAL SESSION')),
    h(Stats,{stats:stats}),
    h('div',{className:'info-bar'},
      h('span',{className:'info-tag'},'ACT '+act),
      h('span',{className:'info-tag'},'카드 '+(ct+1)+' / '+cpd),
      h('span',{className:'info-tag info-tag-log',onClick:function(){setRet('game');setPhase('logs')}},'LOG '+logs.length+'/'+ORACLE_LOGS.length)),
    h(CardC,{card:curCard,onSwipe:swipe,gi:gi,day:stats.day}),
    h('div',{className:'footer-frame'},h('span',null,'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001')));
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
