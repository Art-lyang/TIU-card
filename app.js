// TERMINAL SESSION — app.js
// Utils, Save, SFX, App
var CARDS = CARDS_BASE.concat(CARDS_STORY);
var pick=function(a){return a[Math.floor(Math.random()*a.length)]};
var pickN=function(a,n){return[].concat(a).sort(function(){return Math.random()-0.5}).slice(0,Math.min(n,a.length))};
var clamp=function(v,lo,hi){return Math.max(lo||0,Math.min(hi||100,v))};
var applyFx=function(s,fx,m){m=m||5;return{c:clamp(s.c+(fx.c||0)*m),r:clamp(s.r+(fx.r||0)*m),t:clamp(s.t+(fx.t||0)*m),o:clamp(s.o+(fx.o||0)*m),day:s.day}};
var drawCard=function(stats,gi,logs,cooldowns,recent){
  var day=stats.day||1;var cd=cooldowns||{};var rec=recent||[];
  var valid=CARDS.filter(function(c){
    if(c.req&&!c.req(stats,gi,logs))return false;
    if(c.tag&&cd[c.tag]&&(day-cd[c.tag])<3)return false;
    if(rec.indexOf(c.id)>=0)return false;
    return true;
  });
  if(valid.length===0)valid=CARDS.filter(function(c){return!c.req&&rec.indexOf(c.id)<0});
  return pick(valid.length>0?valid:CARDS.filter(function(c){return!c.req}).slice(0,15));
};

var Save={
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  get:function(k,def){try{var d=localStorage.getItem(k);return d?JSON.parse(d):def}catch(e){return def}},
  del:function(k){try{localStorage.removeItem(k)}catch(e){}},
  saveGame:function(s,g){Save.set('ts_game',{stats:s,gi:g})},
  clearGame:function(){Save.del('ts_game')},
  saveLogs:function(ids){Save.set('ts_logs',ids)},
  getLogs:function(){return Save.get('ts_logs',['LOG-001'])},
  saveEnding:function(id){var e=Save.get('ts_endings',[]);if(e.indexOf(id)<0){e.push(id);Save.set('ts_endings',e)}},
  getEndings:function(){return Save.get('ts_endings',[])},
  getSessions:function(){return Save.get('ts_sessions',0)},
  incSession:function(){var c=Save.getSessions()+1;Save.set('ts_sessions',c);return c}
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
  var _s=useState({c:50,r:60,t:50,o:40,day:1}),stats=_s[0],setStats=_s[1];
  var _g=useState(0),gi=_g[0],setGi=_g[1];
  var _ct=useState(0),ct=_ct[0],setCt=_ct[1];var cpd=5;
  var _nh=useState([]),nh=_nh[0],setNh=_nh[1];
  var _gor=useState(''),gor=_gor[0],setGor=_gor[1];
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

  useEffect(function(){
    var sl=Save.getLogs();if(sl)setLogs(sl);
    var se=Save.getEndings();if(se)setEndings(se);
    setSessions(Save.getSessions());
    var st=Save.get('ts_trust',null);if(st)setTrust(st);
    setCurCard(drawCard({c:50,r:60,t:50,o:40,day:1},0,sl||['LOG-001']));
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
    if(g<=20)tryUnlock('LOG-009');if(g<=10)tryUnlock('LOG-010');
    if(trust.haeun>=70)tryUnlock('LOG-006');if(trust.sejin>=70)tryUnlock('LOG-007');if(trust.doyun>=65)tryUnlock('LOG-008');
  };
  var chk=function(s){if(s.c<=0)return'\ubd09\uc1c4\uc120 \ubd95\uad34. \uc2dc\uc124 \uc790\uccb4 \ubd09\uc1c4 \ud504\ub85c\ud1a0\ucf5c \ubc1c\ub3d9 — \uae30\uc9c0 \ud3d0\uae30 \uc808\ucc28\uac00 \uac1c\uc2dc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.c>=100)return'[GRANT EXPIRED — UPON_FULL_ESTABLISHMENT] \ud55c\uad6d \uc9c0\ubd80 \uc548\uc815\ud654 \uc644\ub8cc. \uc784\uc2dc \uad8c\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc138\uc158\uc744 \uc885\ub8cc\ud569\ub2c8\ub2e4.';if(s.r<=0)return'\uc790\uc6d0 \uace0\uac08. \uae30\uc9c0 \uae30\ub2a5\uc774 \ub9c8\ube44\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.t<=0)return'\uc778\uc6d0 \uc2e0\ub8b0 \ubd95\uad34. \uae30\uc9c0 \uc694\uc6d0\ub4e4\uc774 \uc774\ud0c8\ud588\uc2b5\ub2c8\ub2e4.';if(s.o<=0)return'ORACLE \uc811\uc18d \ucc28\ub2e8. \ub2e8\ub9d0\uae30 \uc5f0\uacb0\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';return null};
  var genNews=function(s,g){var l=[];if(s.c>60)l.push(pick(NP.gc));else if(s.c<40)l.push(pick(NP.bc));if(s.r<30)l.push(pick(NP.br));if(Math.random()<0.4)l.push(pick(NP.w));if(s.day>3&&Math.random()<0.3)l.push(pick(NP.p));if(g<=30&&s.day>5&&Math.random()<0.4)l.push(pick(NP.gl));if(!l.length)l.push(pick(NP.w));return l};
  var doGO=function(reason,ns,ng){setGor(reason);var eid=null;if(ns.c<=0)eid='C_c';else if(ns.c>=100)eid='C_c';else if(ns.r<=0)eid='C_r';else if(ns.t<=0)eid='C_t';else if(ns.o<=0)eid='C_o';if(ng>=60)eid='A';if(eid)Save.saveEnding(eid);setEndings(Save.getEndings());setSessions(Save.incSession());Save.clearGame();setTimeout(function(){setPhase('go')},500)};
  var tryDlg=function(){var av=DIALOGUES.filter(function(d,i){return usedDlg.indexOf(i)<0&&(!d.trustReq||d.trustReq(trust))});if(av.length>0&&Math.random()<0.35){var d=pick(av);setCurDlg(d);setUsedDlg(function(p){return p.concat([DIALOGUES.indexOf(d)])});setPhase('dialogue');return true}return false};
  var nextCard=function(s,g,lg,cq){if(cq&&cq.length>0){setCurCard(cq[0]);setChainQueue(cq.slice(1))}else{var c=drawCard(s,g,lg,cooldowns,recentCards);setCurCard(c);setRecentCards(function(p){var n=p.concat([c.id]);return n.length>8?n.slice(n.length-8):n})}};

  var swipe=function(dir){
    SFX.play('swipe');var ch=dir==='left'?curCard.left:curCard.right;
    var ns=applyFx(stats,ch.fx),ng=gi+(ch.g||0);setStats(ns);setGi(ng);
    if(curCard.tag){var ncd={};for(var k in cooldowns)ncd[k]=cooldowns[k];ncd[curCard.tag]=stats.day;setCooldowns(ncd)}
    checkLogs(ns,ng,curCard.id,null,null);Save.saveGame(ns,ng);
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
  var hMission=function(o){if(o.gOnly){setGi(function(g){return g+(o.g||0)});return}SFX.play('reward');var ns=applyFx(stats,o.result||{}),ng=gi+(o.g||0);setStats(ns);setGi(ng);if(o.log)tryUnlock(o.log);Save.saveGame(ns,ng);var go=chk(ns);if(go){SFX.play('gameover');doGO(go,ns,ng);return}setCurMission(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var hReward=function(r){SFX.play('reward');var ns=applyFx(stats,r.fx);ns.c=Math.max(5,ns.c);ns.r=Math.max(5,ns.r);ns.t=Math.max(5,ns.t);ns.o=Math.max(5,ns.o);var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1};setStats(next);Save.saveGame(next,gi);setCt(0);nextCard(next,gi,logs,chainQueue);setPhase('game')};
  var hDlg=function(c){SFX.play('dialogue');var ns=applyFx(stats,c.fx||{}),ng=gi+(c.g||0);setStats(ns);setGi(ng);if(curDlg&&c.trust!==undefined)modTrust(curDlg.char,c.trust);var di=curDlg?DIALOGUES.indexOf(curDlg):-1;var csi=curDlg?DIALOGUES.filter(function(d,i){return d.char===curDlg.char&&i<=di}).length-1:0;checkLogs(ns,ng,null,curDlg?curDlg.char:null,csi);Save.saveGame(ns,ng);var go=chk(ns);if(go){SFX.play('gameover');doGO(go,ns,ng);return}setCurDlg(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var restart=function(){var ns={c:50,r:60,t:50,o:40,day:1};setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50});setCooldowns({});setRecentCards([]);Save.clearGame();Save.del('ts_trust');setCurCard(drawCard(ns,0,logs));setPhase('boot')};

  if(phase==='boot')return h(Boot,{onDone:function(){if(fp){setPhase('tutorial')}else{setPhase('game')}}});
  if(phase==='tutorial')return h(Tutorial,{onDone:function(){setFp(false);setPhase('game')}});
  if(phase==='go')return h(GameOver,{stats:stats,reason:gor,gi:gi,onRestart:restart,onLogs:function(){setRet('go');setPhase('logs')},onEndings:function(){setRet('go');setPhase('endings')}});
  if(phase==='news')return h('div',{className:'screen'},h(Stats,{stats:stats}),h(News,{headlines:nh,onContinue:function(){setPhase('reward')}}));
  if(phase==='reward')return h(RewardScreen,{stats:stats,onPick:hReward});
  if(phase==='dialogue'&&curDlg)return h(Dialogue,{dialogue:curDlg,onChoice:hDlg});
  if(phase==='mission'&&curMission)return h(FieldMission,{missionId:curMission,onComplete:hMission});
  if(phase==='logs')return h(LogViewer,{unlockedIds:logs,onClose:function(){setPhase(ret)}});
  if(phase==='endings')return h(EndingScreen,{endings:endings,sessions:sessions,onClose:function(){setPhase(ret)}});

  return h('div',{className:'screen'+(gi<=25&&stats.day>=5?' screen-glitch':'')},
    IMG.bg_command&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_command+')',opacity:0.06}}),
    h(Stats,{stats:stats}),
    sessions>=3?h('div',{className:'unnamed-gauge'},h('div',{className:'unnamed-gauge-fill',style:{width:Math.min(100,Math.max(0,gi))+'%'}})):null,
    h('div',{style:{display:'flex',alignItems:'center',gap:12,marginTop:8,flexShrink:0}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',letterSpacing:1}},'카드 '+(ct+1)+' / '+cpd),
      h('button',{onClick:function(){setRet('game');setPhase('logs')},style:{background:'none',border:'1px solid #1a3a1a',color:'#1a6a1a',fontFamily:"'Share Tech Mono',monospace",fontSize:11,padding:'8px 14px',cursor:'pointer',borderRadius:3,minHeight:36}},'LOG '+logs.length+'/'+ORACLE_LOGS.length)),
    h(CardC,{card:curCard,onSwipe:swipe,gi:gi,day:stats.day}),
    h('div',{className:'footer'},'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'));
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
