// TERMINAL SESSION — app.js
// Utils, Save, SFX, App
var CARDS = CARDS_PROLOGUE.concat(CARDS_BASE).concat(CARDS_STORY).concat(CARDS_ENDING).concat(CARDS_INVESTIGATE).concat(CARDS_RESOURCE).concat(CARDS_ACT1_DAILY).concat(CARDS_ACT2_DAILY).concat(CARDS_TRANSITION).concat(CARDS_HAEUN).concat(CARDS_EXTRA);
var pick=function(a){return a[Math.floor(Math.random()*a.length)]};
var pickN=function(a,n){return[].concat(a).sort(function(){return Math.random()-0.5}).slice(0,Math.min(n,a.length))};
var clamp=function(v,lo,hi){return Math.max(lo||0,Math.min(hi||100,v))};
var applyFx=function(s,fx,m){m=m||5;return{c:clamp(s.c+(fx.c||0)*m),r:clamp(s.r+(fx.r||0)*m),t:clamp(s.t+(fx.t||0)*m),o:clamp(s.o+(fx.o||0)*m),day:s.day}};
var INTRO_FILTER=[{name:'\uc11c\ud558\uc740',log:'LOG-INTRO-SH'},{name:'\uac15\ub3c4\uc724',log:'LOG-INTRO-KD'},{name:'\uc724\uc138\uc9c4',log:'LOG-INTRO-YS'},{name:'\uc784\uc7ac\ud601',log:'LOG-INTRO-IJ'}];
var introOk=function(c,logs){for(var fi=0;fi<INTRO_FILTER.length;fi++){var f=INTRO_FILTER[fi];if(logs.indexOf(f.log)<0&&c.msg&&c.msg.indexOf(f.name)>=0)return false}return true};
var drawCard=function(stats,gi,logs,cooldowns,recent,currentAct,tRoute){
  var day=stats.day||1;var cd=cooldowns||{};var rec=recent||[];var ca=currentAct||1;var tr=tRoute||'';
  var valid=CARDS.filter(function(c){
    if(c.act&&c.act.indexOf(ca)<0)return false;
    if(c.transReq&&c.transReq!==tr)return false;
    try{if(c.req&&!c.req(stats,gi,logs))return false}catch(e){return false}
    try{if(c.cond&&!c.cond(stats,gi,logs))return false}catch(e){return false}
    if(c.tag&&cd[c.tag]&&(day-cd[c.tag])<3)return false;
    if(rec.indexOf(c.id)>=0)return false;
    if(!introOk(c,logs))return false;
    return true;
  });
  if(valid.length===0)valid=CARDS.filter(function(c){try{return(!c.act||c.act.indexOf(ca)>=0)&&!c.req&&!c.transReq&&(!c.cond||c.cond(stats,gi,logs))&&rec.indexOf(c.id)<0&&introOk(c,logs)}catch(e){return false}});
  return pick(valid.length>0?valid:CARDS.filter(function(c){try{return!c.req&&!c.transReq&&(!c.cond||c.cond(stats,gi,logs))&&introOk(c,logs)}catch(e){return false}}).slice(0,15));
};

var Save={
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  get:function(k,def){try{var d=localStorage.getItem(k);return d?JSON.parse(d):def}catch(e){return def}},
  del:function(k){try{localStorage.removeItem(k)}catch(e){}},
  saveGame:function(s,g,a,af,tr){Save.set('ts_game',{stats:s,gi:g,act:a||1,actFlags:af||{},transRoute:tr||''})},
  clearGame:function(){Save.del('ts_game')},
  saveLogs:function(ids){Save.set('ts_logs',ids)},
  getLogs:function(){return Save.get('ts_logs',['LOG-001'])},
  saveEnding:function(id){var e=Save.get('ts_endings',[]);if(e.indexOf(id)<0){e.push(id);Save.set('ts_endings',e)}},
  getEndings:function(){return Save.get('ts_endings',[])},
  getSessions:function(){return Save.get('ts_sessions',0)},
  incSession:function(){var c=Save.getSessions()+1;Save.set('ts_sessions',c);return c},
  saveUsedDlg:function(ids){Save.set('ts_usedDlg',ids)},getUsedDlg:function(){return Save.get('ts_usedDlg',[])},
  saveUsedEvening:function(ids){Save.set('ts_usedEvening',ids)},getUsedEvening:function(){return Save.get('ts_usedEvening',[])},
  saveSeenArchive:function(ids){Save.set('ts_seenArchive',ids)},getSeenArchive:function(){return Save.get('ts_seenArchive',[])}
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

// ═══ BGM 시스템 ═══
var BGM = {
  main: null, crisis: null, current: null, target: null,
  volume: 0.3, fadeSpeed: 0.01, muted: false, started: false, fading: null,
  init: function(){
    if(this.main) return;
    this.main = new Audio('bgm_main.mp3');
    this.crisis = new Audio('bgm_crisis.mp3');
    this.main.loop = true;
    this.crisis.loop = true;
    this.main.volume = 0;
    this.crisis.volume = 0;
  },
  start: function(){
    if(this.started) return;
    this.init();
    this.started = true;
    this.play('main');
  },
  play: function(name){
    if(this.muted) return;
    var next = name === 'crisis' ? this.crisis : this.main;
    if(this.current === next) return;
    this.target = next;
    this._crossfade();
  },
  _crossfade: function(){
    var self = this;
    if(this.fading) cancelAnimationFrame(this.fading);
    var vol = this.volume;
    var old = this.current;
    var next = this.target;
    if(next){
      try{ next.play().catch(function(){}) }catch(e){}
    }
    var step = function(){
      var done = true;
      if(old && old !== next && old.volume > 0){
        old.volume = Math.max(0, old.volume - self.fadeSpeed);
        if(old.volume <= 0){ old.pause(); old.currentTime = 0; }
        else done = false;
      }
      if(next && next.volume < vol){
        next.volume = Math.min(vol, next.volume + self.fadeSpeed);
        if(next.volume < vol) done = false;
      }
      if(!done) self.fading = requestAnimationFrame(step);
      else self.fading = null;
    };
    this.fading = requestAnimationFrame(step);
    this.current = next;
  },
  setVolume: function(v){
    this.volume = v;
    if(this.current) this.current.volume = Math.min(v, this.current.volume);
  },
  toggle: function(){
    this.muted = !this.muted;
    if(this.muted){
      if(this.current){ this.current.pause(); }
    } else {
      if(this.current){ try{ this.current.play().catch(function(){}) }catch(e){} }
    }
    return this.muted;
  }
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
  var cpd=act===1?5:act===2?5:act===3?6:7;

  useEffect(function(){
    var sl=Save.getLogs();if(sl)setLogs(sl);
    var se=Save.getEndings();if(se)setEndings(se);
    setSessions(Save.getSessions());
    var st=Save.get('ts_trust',null);if(st)setTrust(st);
    var sud=Save.getUsedDlg();if(sud&&sud.length)setUsedDlg(sud);
    var sue=Save.getUsedEvening();if(sue&&sue.length)setUsedEvening(sue);
    var ssa=Save.getSeenArchive();if(ssa&&ssa.length)setSeenArchive(ssa);
    var sg=Save.get('ts_game',null);
    if(sg&&sg.act){setAct(sg.act);if(sg.actFlags)setActFlags(sg.actFlags);if(sg.transRoute)setTransRoute(sg.transRoute)}
    else{sl=(sl||['LOG-001']).filter(function(id){return id.indexOf('LOG-INTRO-')!==0});Save.saveLogs(sl);setLogs(sl);setUsedDlg([]);Save.saveUsedDlg([]);setUsedEvening([]);Save.saveUsedEvening([])}
    var initAct=(sg&&sg.act)||1;
    setCurCard(drawCard({c:50,r:65,t:50,o:40,day:1},0,sl||['LOG-001'],{},[], initAct));
  },[]);

  // BGM 상태 관리 — 위기 감지 및 전환
  var _bgmMuted=useState(false),bgmMuted=_bgmMuted[0],setBgmMuted=_bgmMuted[1];
  useEffect(function(){
    if(!BGM.started||BGM.muted) return;
    var isCrisis = stats.c <= 20 || stats.r <= 15 || stats.t <= 15 || stats.o <= 15 || phase === 'go';
    BGM.play(isCrisis ? 'crisis' : 'main');
  },[stats.c, stats.r, stats.t, stats.o, phase]);

  var tryUnlock=function(id){setLogs(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveLogs(n);return n})};
  var modTrust=function(char,delta){setTrust(function(prev){var key={"\uc11c\ud558\uc740":"haeun","\uac15\ub3c4\uc724":"doyun","\uc724\uc138\uc9c4":"sejin","\uc784\uc7ac\ud601":"jaehyuk","\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84":"weber","\ub2c9 \ud3ec\uc2a4\ud130":"foster","\ubc15\uc18c\uc601":"soyoung"}[char];if(!key)return prev;var next={};for(var k in prev)next[k]=prev[k];next[key]=Math.max(0,Math.min(100,prev[key]+delta));Save.set('ts_trust',next);return next})};
  var checkLogs=function(s,g,cid,dc,di,dir){
    if(s.day>=1)tryUnlock('LOG-001');if(s.day>=3)tryUnlock('LOG-002');if(s.day>=7)tryUnlock('LOG-011');
    if(cid==='C-006')tryUnlock('LOG-003');if(cid==='C-003')tryUnlock('LOG-004');if(cid==='C-010')tryUnlock('LOG-005');
    if(cid==='C-042'||cid==='C-043')tryUnlock('LOG-013');
    if(cid==='C-044'||cid==='C-045')tryUnlock('LOG-014');
    if(cid==='C-046'||cid==='C-047')tryUnlock('LOG-015');
    if(cid==='C-091')tryUnlock('LOG-020');if(cid==='C-092')tryUnlock('LOG-021');
    if(cid==='C-093')tryUnlock('LOG-022');if(cid==='C-094')tryUnlock('LOG-023');if(cid==='C-095')tryUnlock('LOG-024');
    if(cid==='C-102')tryUnlock('LOG-025');if(cid==='C-106')tryUnlock('LOG-026');
    if(cid==='C-114')tryUnlock('LOG-027');if(cid==='C-124')tryUnlock('LOG-028');
    if(cid==='CT-001')tryUnlock('LOG-030');if(cid==='CT-002')tryUnlock('LOG-031');
    if(cid==='CT-003')tryUnlock('LOG-032');if(cid==='CT-004')tryUnlock('LOG-033');
    if(cid==='CT-005')tryUnlock('LOG-034');if(cid==='CT-006')tryUnlock('LOG-035');
    if(cid==='CT-007')tryUnlock('LOG-036');if(cid==='CT-008')tryUnlock('LOG-037');
    if(cid==='CT-009')tryUnlock('LOG-038');if(cid==='CT-010')tryUnlock('LOG-039');
    if(cid==='CT-011')tryUnlock('LOG-040');
    if(cid==='C-177')tryUnlock('LOG-060');if(cid==='C-178'){tryUnlock('LOG-061');if(dir==='left')tryUnlock('LOG-004');if(dir==='right')tryUnlock('LOG-005')}
    if(cid==='C-073'&&dir==='left')tryUnlock('LOG-051');if(cid==='C-073'&&dir==='right')tryUnlock('LOG-050');
    if(cid==='CS-001')tryUnlock('LOG-053');if(cid==='CS-002')tryUnlock('LOG-054');if(cid==='CS-003')tryUnlock('LOG-052');
    if(cid==='CS-004')tryUnlock('LOG-055');if(cid==='CS-010')tryUnlock('LOG-056');
    if(cid==='CS-013')tryUnlock('LOG-057');if(cid==='CS-014')tryUnlock('LOG-058');if(cid==='CS-015')tryUnlock('LOG-059');
    if(cid==='CH-004-2')tryUnlock('LOG-009');
    if(cid==='C-053'||cid==='CH-005-2')tryUnlock('LOG-016');
    if(cid==='C-067')tryUnlock('LOG-017');
    if(cid==='C-074'||cid==='CH-006-2')tryUnlock('LOG-018');
    if(cid==='C-079'||cid==='C-086')tryUnlock('LOG-019');
    if(dc==='\uc11c\ud558\uc740'&&di===0){tryUnlock('LOG-006');tryUnlock('LOG-INTRO-SH')}if(dc==='\uc724\uc138\uc9c4'&&di===0){tryUnlock('LOG-007');tryUnlock('LOG-INTRO-YS')}
    if(dc==='\uac15\ub3c4\uc724'&&di===0){tryUnlock('LOG-008');tryUnlock('LOG-INTRO-KD')}if(dc==='\uc784\uc7ac\ud601'&&di===0)tryUnlock('LOG-INTRO-IJ');if(dc==='\uc784\uc7ac\ud601'&&di===1)tryUnlock('LOG-012');
    if(dc==='\ubc15\uc18c\uc601'&&di===0)tryUnlock('LOG-INTRO-SY');
    if(g<=-15)tryUnlock('LOG-009');if(g<=-30)tryUnlock('LOG-010');
    if(trust.haeun>=70)tryUnlock('LOG-006');if(trust.sejin>=70)tryUnlock('LOG-007');if(trust.doyun>=65)tryUnlock('LOG-008');
    // ═══ 체인 카드 LOG 트리거 (data-cards-11.js 연동) ═══
    // 체인1 신규요원: 기존 카드 → 새 체인
    if(cid==='C-001'&&dir==='right')tryUnlock('LOG-062');
    // C-179: left=엄격 재훈련→LOG-063, right=실전 투입→LOG-064
    if(cid==='C-179'&&dir==='left')tryUnlock('LOG-063');
    if(cid==='C-179'&&dir==='right')tryUnlock('LOG-064');
    // C-180: 성공 루트 종료
    if(cid==='C-180')tryUnlock('LOG-063-DONE');
    // C-181: 실패→부상→LOG-065
    if(cid==='C-181')tryUnlock('LOG-065');
    // C-182: 습격 발생→LOG-065-ATK
    if(cid==='C-182')tryUnlock('LOG-065-ATK');
    // C-183: ORACLE 권고 종료→LOG-065-END
    if(cid==='C-183')tryUnlock('LOG-065-END');
    // 체인2 식수오염: 기존 카드 → 트리거 플래그
    if(cid==='C-023'&&dir==='right')tryUnlock('LOG-066');
    if(cid==='C-145'&&dir==='right')tryUnlock('LOG-067');
    if(cid==='C-111'&&dir==='right')tryUnlock('LOG-068');
    // C-184: 식중독→LOG-069
    if(cid==='C-184')tryUnlock('LOG-069');
    // C-185: 요원 감소→LOG-069-CREW
    if(cid==='C-185')tryUnlock('LOG-069-CREW');
    // C-186: ORACLE 경고 종료→LOG-069-END
    if(cid==='C-186')tryUnlock('LOG-069-END');
    // 체인3 야간습격: 기존 카드 → 트리거 플래그
    if(cid==='C-041'&&dir==='right')tryUnlock('LOG-070');
    if(cid==='C-163'&&dir==='right')tryUnlock('LOG-071');
    if(cid==='C-018'&&dir==='right')tryUnlock('LOG-072');
    if(cid==='C-084'&&dir==='left')tryUnlock('LOG-073');
    // C-188: 야간 습격→LOG-074
    if(cid==='C-188')tryUnlock('LOG-074');
    // C-189: 강도윤 생존→LOG-074-DONE
    if(cid==='C-189')tryUnlock('LOG-074-DONE');
    // C-190: 강도윤 사망→LOG-075
    if(cid==='C-190')tryUnlock('LOG-075');
    // C-191: 생존 후 ORACLE→LOG-074-ORC
    if(cid==='C-191')tryUnlock('LOG-074-ORC');
    // C-192: 사망 후 ORACLE→LOG-075-ORC
    if(cid==='C-192')tryUnlock('LOG-075-ORC');
    // 1회성 시설/이벤트 카드
    if(cid==='C-159')tryUnlock('LOG-078');
    if(cid==='C-080')tryUnlock('LOG-079');
    if(cid==='C-201')tryUnlock('LOG-076');
    if(cid==='C-215')tryUnlock('LOG-077');
    // ═══ 외부 인물 + 에이전트 강 (data-cards-15.js) ═══
    // 마르쿠스 베버 접선 완료 (CH-005 체인 마지막 카드)
    if(cid==='CH-005-3')tryUnlock('LOG-080');
    // 닉 포스터: C-248 left=대면→LOG-081
    if(cid==='C-248'&&dir==='left')tryUnlock('LOG-081');
    // 닉 포스터 데이터 수령: C-249 left→LOG-081-DATA
    if(cid==='C-249'&&dir==='left')tryUnlock('LOG-081-DATA');
    // 닉 포스터 인텔 공유: C-250→LOG-081-INTEL
    if(cid==='C-250')tryUnlock('LOG-081-INTEL');
    // 박소영 합류: C-081 left(후보A 선택)→LOG-082
    if(cid==='C-081'&&dir==='left')tryUnlock('LOG-082');
    // 박소영 첫 보고: C-252→LOG-082-REPORT
    if(cid==='C-252')tryUnlock('LOG-082-REPORT');
    // 박소영 정체 발각: C-253→LOG-083
    if(cid==='C-253')tryUnlock('LOG-083');
  };
  var chk=function(s){if(s.c<=0)return'\ubd09\uc1c4\uc120 \ubd95\uad34. \uc2dc\uc124 \uc790\uccb4 \ubd09\uc1c4 \ud504\ub85c\ud1a0\ucf5c \ubc1c\ub3d9 — \uae30\uc9c0 \ud3d0\uae30 \uc808\ucc28\uac00 \uac1c\uc2dc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.c>=100)return'[GRANT EXPIRED — UPON_FULL_ESTABLISHMENT] \ud55c\uad6d \uc9c0\ubd80 \uc548\uc815\ud654 \uc644\ub8cc. \uc784\uc2dc \uad8c\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc138\uc158\uc744 \uc885\ub8cc\ud569\ub2c8\ub2e4.';if(s.r<=0)return'\uc790\uc6d0 \uace0\uac08. \uae30\uc9c0 \uae30\ub2a5\uc774 \ub9c8\ube44\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.t<=0)return'\uc778\uc6d0 \uc2e0\ub8b0 \ubd95\uad34. \uae30\uc9c0 \uc694\uc6d0\ub4e4\uc774 \uc774\ud0c8\ud588\uc2b5\ub2c8\ub2e4.';if(s.o<=0)return'ORACLE \uc811\uc18d \ucc28\ub2e8. \ub2e8\ub9d0\uae30 \uc5f0\uacb0\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';return null};
  var genNews=function(s,g){var l=[];if(s.c>60)l.push(pick(NP.gc));else if(s.c<40)l.push(pick(NP.bc));if(s.r<30)l.push(pick(NP.br));if(Math.random()<0.4)l.push(pick(NP.w));if(s.day>3&&Math.random()<0.3)l.push(pick(NP.p));if(g<=-10&&s.day>5&&Math.random()<0.4)l.push(pick(NP.gl));if(!l.length)l.push(pick(NP.w));return l};
  var doGO=function(reason,ns,ng,specialId){BGM.stop();setGor(reason);var eid=specialId||null;if(!eid){if(ns.c<=0)eid='C_c';else if(ns.c>=100)eid='C_c';else if(ns.r<=0)eid='C_r';else if(ns.t<=0)eid='C_t';else if(ns.o<=0)eid='C_o';if(ng>=60)eid='A'}if(eid&&ENDING_DEFS[eid])setEndNarr(ENDING_DEFS[eid]);else setEndNarr(null);if(eid)Save.saveEnding(eid);setEndings(Save.getEndings());setSessions(Save.incSession());Save.clearGame();setTimeout(function(){setPhase('go')},500)};
  var introsDone=function(){return logs.indexOf('LOG-INTRO-SH')>=0&&logs.indexOf('LOG-INTRO-KD')>=0&&logs.indexOf('LOG-INTRO-YS')>=0&&logs.indexOf('LOG-INTRO-IJ')>=0};
  var isIntroDlg=function(d,i){var chars=['\uc11c\ud558\uc740','\uac15\ub3c4\uc724','\uc724\uc138\uc9c4','\uc784\uc7ac\ud601'];var ci=chars.indexOf(d.char);if(ci<0)return false;return i===ci};
  var tryDlg=function(){var av=DIALOGUES.filter(function(d,i){if(usedDlg.indexOf(i)>=0)return false;if(d.char==='\uc11c\ud558\uc740'&&logs.indexOf('LOG-050')>=0)return false;if(d.logReq&&logs.indexOf(d.logReq)<0)return false;if(d.trustReq&&!d.trustReq(trust))return false;var earlier=false;DIALOGUES.forEach(function(d2,j){if(j<i&&d2.char===d.char&&usedDlg.indexOf(j)<0&&(!d2.trustReq||d2.trustReq(trust))&&(!d2.logReq||logs.indexOf(d2.logReq)>=0))earlier=true});return!earlier});if(!introsDone()){var introAv=av.filter(function(d,idx){return isIntroDlg(d,DIALOGUES.indexOf(d))});if(introAv.length>0){var d=pick(introAv);setCurDlg(d);setUsedDlg(function(p){var n=p.concat([DIALOGUES.indexOf(d)]);Save.saveUsedDlg(n);return n});setPhase('dialogue');return true}return false}
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
    if(newAct===2)tryUnlock('LOG-ACT2');
    if(newAct===3)tryUnlock('LOG-ACT3');
    if(newAct===4)tryUnlock('LOG-ACT4');
    var penalty=route==='A'?0:route==='B'||route==='C'?2:4;
    if(newAct===3)penalty+=3;
    if(newAct===4)penalty+=5;
    if(penalty>0){var ns={c:clamp(s.c-penalty),r:clamp(s.r-penalty),t:clamp(s.t-penalty),o:clamp(s.o-penalty),day:s.day};setStats(ns)}
    setPhase('briefing');
  };
  var RISK_MSG=["물자 상태 불량 — 자원 확보 실패","운송 중 파손 — 사용 불가 판정","유통기한 초과 — 폐기 처리","오염 감지 — 안전 기준 미달"];
  var swipe=function(dir){
    SFX.play('swipe');setToast('');var ch=dir==='left'?curCard.left:curCard.right;
    var fx=ch.fx;
    // 자원 리스크: r>=2일 때 20% 확률로 실패
    if(fx&&fx.r>=2&&Math.random()<0.2){fx={};for(var k in ch.fx)fx[k]=ch.fx[k];fx.r=0;var rm=RISK_MSG[Math.floor(Math.random()*RISK_MSG.length)];setToast(rm);setTimeout(function(){setToast('')},2500)}
    var ns=applyFx(stats,fx),ng=gi+(ch.g||0);setStats(ns);setGi(ng);
    if(curCard.tag){var ncd={};for(var k in cooldowns)ncd[k]=cooldowns[k];ncd[curCard.tag]=stats.day;setCooldowns(ncd)}
    checkLogs(ns,ng,curCard.id,null,null,dir);
    // Track act flags
    var isChainDone=curCard.id.indexOf('CH-')===0&&chainQueue.length===0;
    updateActFlags(curCard.id,ch.mission?ch.mission:null,isChainDone);
    Save.saveGame(ns,ng,act,actFlags,transRoute);
    var isDanger=ns.c<=25||ns.r<=25||ns.t<=25||ns.o<=25;BGM.setDanger(isDanger);
    var nct=ct+1;setCt(nct);var go=chk(ns);
    if(go){SFX.play('gameover');doGO(go,ns,ng);return}
    if(ch.mission&&MISSIONS[ch.mission]){SFX.play('mission');setCurMission(ch.mission);setTimeout(function(){setPhase('mission')},400);return}
    var triggerKey=curCard.id+'-'+dir;var chain=null;
    Object.keys(CHAINS).forEach(function(k){if(CHAINS[k].trigger===triggerKey)chain=CHAINS[k]});
    var cq=chainQueue;if(chain){SFX.play('glitch');cq=chain.cards;setChainQueue(cq)}
    if(nct>=cpd){SFX.play('news');setNh(genNews(ns,ng));setTimeout(function(){setPhase('news')},400)}
    else if(!introsDone()){setTimeout(function(){if(!tryDlg())nextCard(ns,ng,logs,cq)},300)}
    else if(nct===2||nct===3){setTimeout(function(){if(!tryDlg())nextCard(ns,ng,logs,cq)},300)}
    else{nextCard(ns,ng,logs,cq)}
  };
  var hMission=function(o){if(o.gOnly){setGi(function(g){return g+(o.g||0)});return}SFX.play('reward');var ns=applyFx(stats,o.result||{}),ng=gi+(o.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(o.log)tryUnlock(o.log);updateActFlags(null,curMission,false);Save.saveGame(ns,ng,act,actFlags,transRoute);setCurMission(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var hReward=function(r){SFX.play('reward');var ns=applyFx(stats,r.fx);ns.c=Math.max(5,ns.c);ns.r=Math.max(5,ns.r);ns.t=Math.max(5,ns.t);ns.o=Math.max(5,ns.o);
    // Act별 일일 감쇠
    if(act===3){ns.c=Math.max(5,ns.c-1);ns.r=Math.max(5,ns.r-1)}
    if(act===4){ns.c=Math.max(5,ns.c-2);ns.r=Math.max(5,ns.r-2);ns.t=Math.max(5,ns.t-1)}
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1};setStats(next);Save.saveGame(next,gi,act,actFlags,transRoute);setCt(0);
    // Act 전환 체크
    setPhase('evening')};
  var hEvening=function(){var trans=checkActTransition(stats,gi,logs,actFlags,act);if(trans){doBriefing(trans.act,stats,trans.route);return}var se=chkSpecialEnding(stats,gi,act,trust,logs,actFlags);if(se){var def=ENDING_DEFS[se];doGO(def?def.name:'\uc138\uc158 \uc885\ub8cc',stats,gi,se);return}nextCard(stats,gi,logs,chainQueue);setPhase('game')};
  var hDlg=function(c){SFX.play('dialogue');var ns=applyFx(stats,c.fx||{}),ng=gi+(c.g||0);ns.c=Math.max(5,Math.min(95,ns.c));ns.r=Math.max(5,Math.min(95,ns.r));ns.t=Math.max(5,Math.min(95,ns.t));ns.o=Math.max(5,Math.min(95,ns.o));setStats(ns);setGi(ng);if(curDlg&&c.trust!==undefined)modTrust(curDlg.char,c.trust);var di=curDlg?DIALOGUES.indexOf(curDlg):-1;var csi=curDlg?DIALOGUES.filter(function(d,i){return d.char===curDlg.char&&i<=di}).length-1:0;checkLogs(ns,ng,null,curDlg?curDlg.char:null,csi);Save.saveGame(ns,ng,act,actFlags,transRoute);setCurDlg(null);nextCard(ns,ng,logs,chainQueue);setPhase('game')};
  var restart=function(){BGM.stop();BGM.started=false;var ns={c:50,r:65,t:50,o:40,day:1};setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setUsedEvening([]);setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40});setCooldowns({});setRecentCards([]);setAct(1);setTransRoute('');setActFlags({prom_met:false,mission_done:false,chain_done:false,prom_mission:false});Save.clearGame();Save.del('ts_trust');Save.del('ts_usedDlg');Save.del('ts_usedEvening');var rl=logs.filter(function(id){return id.indexOf('LOG-INTRO-')!==0});setLogs(rl);Save.saveLogs(rl);setCurCard(drawCard(ns,0,rl,{},[], 1));setPhase('boot')};
  if(phase==='boot')return h(Boot,{sessions:sessions,onDone:function(){BGM.playBoot();BGM.start();if(fp){setPhase('tutorial')}else{setPhase('game')}}});
  if(phase==='tutorial')return h(Tutorial,{canSkip:sessions>0,onSkip:function(){setFp(false);setPhase('game')},onDone:function(){setFp(false);setPhase('game')}});
  if(phase==='briefing')return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // BRIEFING')),
    h('div',{style:{width:'100%',maxWidth:440,background:'url(panel_frame_medium.png) center/100% 100% no-repeat',padding:'28px 30px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',minHeight:0}},
      h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:12}},
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#f0a030',letterSpacing:2}},'ACT '+act+' BRIEFING'),
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:act===3?'#ff4444':'rgba(157,255,116,.6)',letterSpacing:1}},'PRIORITY: '+(act===2?'INITIAL':act===3?'ELEVATED':'CR\u2588TICAL'))),
      h('div',{style:{fontSize:13,color:'#9dff74',lineHeight:2,borderLeft:'2px solid rgba(145,255,106,.3)',paddingLeft:14,marginBottom:16}},
        '\uc9c0\ub09c '+(stats.day-1)+'\uc77c\uac04\uc758 \uc6b4\uc601 \ub370\uc774\ud130\ub97c \ubd84\uc11d\ud588\uc2b5\ub2c8\ub2e4.'),
      h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:16}},
        ['c','r','t','o'].map(function(k){var nm={c:'\ubd09\uc1c4 \uc548\uc815\uc131',r:'\uc790\uc6d0 \uc794\ub7c9',t:'\uc778\uc6d0 \uc2e0\ub8b0\ub3c4',o:'ORACLE \ud3c9\uac00'};var v=stats[k];var d=v<=25;return h('div',{key:k,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:d?'#ff4444':'#33ff33',padding:'4px 0'}},nm[k]+': '+v+'%')})),
      h('div',{style:{fontSize:12,color:transRoute==='D'?'#ff4444':transRoute==='A'?'#9dff74':'#f0a030',lineHeight:2,borderLeft:'2px solid '+(transRoute==='D'?'rgba(255,68,68,.4)':'rgba(240,160,48,.3)'),paddingLeft:14,marginBottom:16,whiteSpace:'pre-wrap'}},
        act===2?'적응 기간 완료.
기지 운영 정상화.
Act 2 작전 단계로 진입합니다.':act===3?(transRoute==='A'?'\ucd08\uae30 \uc548\uc815\ud654 \ub2e8\uacc4 \uc644\ub8cc.\n\uc0c8\ub85c\uc6b4 \ubcc0\uc218\uac00 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\ud504\ub85c\ud1a0\ucf5c\uc744 \uc7ac\uc870\uc815\ud569\ub2c8\ub2e4.':transRoute==='B'?'\ud604\uc7a5 \uacbd\ud5d8 \ubd80\uc871. \uc774\ubcc0\uccb4 \ub300\uc751 \ub370\uc774\ud130\uac00 \ubd80\uc871\ud569\ub2c8\ub2e4.\n\uae34\uae09 \ud604\uc7a5 \uc801\uc751\uc774 \ud544\uc694\ud569\ub2c8\ub2e4.':transRoute==='C'?'\ubbf8\ud655\uc778 \uc138\ub825 \uae09\uc99d \uac10\uc9c0.\n\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4 \uc815\ubcf4 \ubd80\uc7ac.\n\uc815\ubcf4\uc804 \uc5ed\ub7c9 \uac15\ud654\uac00 \uc2dc\uae09\ud569\ub2c8\ub2e4.':'\uacbd\uace0: \uc0c1\ud669 \uc545\ud654.\n\ud604\uc7a5 \ub370\uc774\ud130 \ubd80\uc7ac + \uc678\ubd80 \uc704\ud611 \ubbf8\ud30c\uc545.\n\uae34\uae09 \uc7ac\ud3b8\uc744 \uc2dc\ud589\ud569\ub2c8\ub2e4.'):(transRoute==='A'?'\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4 \uc704\ud611\uc774 \uc9c1\uc811\uc801 \uc218\uc900\uc5d0 \ub3c4\ub2ec\ud588\uc2b5\ub2c8\ub2e4.\n\uacb0\uc815\uc801 \uc870\uce58\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.':transRoute==='B'?'ORACLE \uad8c\uace0 \ubbf8\uc774\ud589 \ub204\uc801.\n\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4 \ub300\uc751 \uc2e4\ud328.\n\uc7ac\ud3c9\uac00\uac00 \uc608\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.':transRoute==='C'?'\uc815\ubcf4 \ubd80\uc871 \uc0c1\ud0dc\ub85c \ucd5c\uc885 \uad6d\uba74 \uc9c4\uc785.\n\uc11c\ud558\uc740 \uc544\ud06c \uc9c0\uc5f0 \uac00\ub2a5\uc131.':'\uc9c0\ud718\uad00 \uad50\uccb4 \uac80\ud1a0 \uc911.\n\ubaa8\ub4e0 \uc9c0\ud45c\uc5d0\uc11c \uc2ec\uac01\ud55c \uc774\ud0c8\uc774 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.'))),
    h('button',{className:'btn btn-amber',style:{margin:'8px auto',padding:'12px 32px',flexShrink:0},onClick:function(){
      Save.saveGame(stats,gi,act,actFlags,transRoute);nextCard(stats,gi,logs,chainQueue);setPhase('game');
    }},'[ ENTER ]'));
  if(phase==='go')return h(GameOver,{stats:stats,reason:gor,gi:gi,sessions:sessions,endNarr:endNarr,onRestart:restart,onLogs:function(){setRet('go');setPhase('logs')},onArchive:function(){setRet('go');setPhase('archive')},onEndings:function(){setRet('go');setPhase('endings')}});
  if(phase==='news')return h('div',{className:'screen',style:{justifyContent:'center'}},h(News,{headlines:nh,day:stats.day,stats:stats,gi:gi,act:act,onContinue:function(){setPhase('reward')}}));
  if(phase==='reward')return h(RewardScreen,{stats:stats,onPick:hReward});
  if(phase==='evening'){if(BGM.current&&BGM.tracks[BGM.current])BGM.tracks[BGM.current].volume=0.06;return h(EveningChat,{day:stats.day,act:act,logs:logs,trust:trust,usedEvening:usedEvening,onMarkEvening:function(key){setUsedEvening(function(p){if(p.indexOf(key)>=0)return p;var n=p.concat([key]);Save.saveUsedEvening(n);return n})},onChat:function(cn){modTrust(cn,3)},onDone:function(){if(BGM.current&&BGM.tracks[BGM.current])BGM.tracks[BGM.current].volume=BGM.vol;hEvening()}});}
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
      h('span',{className:'info-tag info-tag-log',onClick:function(){setRet('game');setPhase('logs')}},'LOG '+ORACLE_LOGS.filter(function(l){return logs.indexOf(l.id)>=0}).length+'/'+ORACLE_LOGS.length),
      h('span',{className:'info-tag info-tag-archive',onClick:function(){setRet('game');setPhase('archive')}},(function(){var uc=typeof ARCHIVE_ENTRIES!=='undefined'?ARCHIVE_ENTRIES.filter(function(e){return e.unlock(logs)}).length:0;var nc=typeof ARCHIVE_ENTRIES!=='undefined'?ARCHIVE_ENTRIES.filter(function(e){return e.unlock(logs)&&seenArchive.indexOf(e.id)<0}).length:0;return 'ARCHIVE '+uc+(nc>0?' ●':'')})()),
      h('span',{className:'info-tag',style:{cursor:'pointer',opacity:bgmMuted?0.4:1},onClick:function(){var m=BGM.toggle();setBgmMuted(m)}},bgmMuted?'♪ OFF':'♪ ON')),
    h(CardC,{card:curCard,onSwipe:swipe,onPreview:setPreview,gi:gi,day:stats.day}),
    toast&&h('div',{style:{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'rgba(255,68,68,0.15)',border:'1px solid rgba(255,68,68,0.4)',borderRadius:4,padding:'8px 16px',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#ff6644',letterSpacing:1,zIndex:50,animation:'fadeIn 0.3s ease',textAlign:'center',maxWidth:300}},toast),
    h('div',{className:'footer-frame',style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},h('span',null,'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'),h('span',{style:{cursor:'pointer',fontSize:10,opacity:0.5,letterSpacing:1,fontFamily:"'Share Tech Mono',monospace"},onClick:function(){BGM.toggleMute();setToast(BGM.muted?'AUDIO: OFF':'AUDIO: ON');setTimeout(function(){setToast('')},1200)}},BGM.muted?'[MUTE]':'[SND]')));
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
