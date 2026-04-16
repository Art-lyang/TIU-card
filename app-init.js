// TERMINAL SESSION — app-init.js
// 글로벌 유틸리티, CARDS 배열, drawCard, Save, SFX
var RISK_MSG=["물자 상태 불량 — 자원 확보 실패","운송 중 파손 — 사용 불가 판정","유통기한 초과 — 폐기 처리","오염 감지 — 안전 기준 미달"];
var CARDS = CARDS_PROLOGUE.concat(CARDS_BASE).concat(CARDS_STORY).concat(CARDS_ENDING).concat(CARDS_INVESTIGATE).concat(CARDS_RESOURCE).concat(CARDS_ACT1_DAILY).concat(CARDS_ACT2_DAILY).concat(CARDS_TRANSITION).concat(CARDS_HAEUN).concat(CARDS_EXTRA).concat(CARDS_CHAINS||[]).concat(CARDS_NEW_A||[]).concat(CARDS_NEW_B||[]).concat(CARDS_ACT3||[]).concat(CARDS_EXTERNAL||[]).concat(CARDS_MIDGAME||[]).concat(CARDS_ACT4||[]).concat(typeof CARDS_FACILITY!=='undefined'?CARDS_FACILITY:[]);
var pick=function(a){return a[Math.floor(Math.random()*a.length)]};
var pickN=function(a,n){return[].concat(a).sort(function(){return Math.random()-0.5}).slice(0,Math.min(n,a.length))};
var clamp=function(v,lo,hi){return Math.max(lo||0,Math.min(hi||100,v))};
var applyFx=function(s,fx,m){m=m||5;return{c:clamp(s.c+(fx.c||0)*m),r:clamp(s.r+(fx.r||0)*m),t:clamp(s.t+(fx.t||0)*m),o:clamp(s.o+(fx.o||0)*m),day:s.day}};
var INTRO_FILTER=[{name:'서하은',log:'LOG-INTRO-SH'},{name:'강도윤',log:'LOG-INTRO-KD'},{name:'윤세진',log:'LOG-INTRO-YS'},{name:'임재혁',log:'LOG-INTRO-IJ'}];
var introOk=function(c,logs){for(var fi=0;fi<INTRO_FILTER.length;fi++){var f=INTRO_FILTER[fi];if(logs.indexOf(f.log)<0&&c.msg&&c.msg.indexOf(f.name)>=0)return false}return true};
var drawCard=function(stats,gi,logs,cooldowns,recent,currentAct,tRoute,facility){
  var day=stats.day||1;var cd=cooldowns||{};var rec=recent||[];var ca=currentAct||1;var tr=tRoute||'';
  var facComp=(facility&&facility.completed)||[];
  if(day===1&&logs.indexOf('ONCE-CA-001')<0){var ca001=CARDS.filter(function(c){return c.id==='CA-001'})[0];if(ca001)return ca001;}
  var valid=CARDS.filter(function(c){
    if(c.act&&c.act.indexOf(ca)<0)return false;
    if(c.once&&logs.indexOf('ONCE-'+c.id)>=0)return false;
    if(c.transReq&&c.transReq!==tr)return false;
    if(c.feReq&&facComp.indexOf(c.feReq)<0)return false;
    try{if(c.req&&!c.req(stats,gi,logs))return false}catch(e){return false}
    try{if(c.cond&&!c.cond(stats,gi,logs))return false}catch(e){return false}
    if(c.tag&&cd[c.tag]&&(day-cd[c.tag])<3)return false;
    if(rec.indexOf(c.id)>=0)return false;
    if(!introOk(c,logs))return false;
    return true;
  });
  if(valid.length===0)valid=CARDS.filter(function(c){try{return(!c.act||c.act.indexOf(ca)>=0)&&(!c.once||logs.indexOf('ONCE-'+c.id)<0)&&!c.req&&!c.transReq&&(!c.feReq||facComp.indexOf(c.feReq)>=0)&&(!c.cond||c.cond(stats,gi,logs))&&rec.indexOf(c.id)<0&&introOk(c,logs)}catch(e){return false}});
  return pick(valid.length>0?valid:CARDS.filter(function(c){try{return(!c.once||logs.indexOf('ONCE-'+c.id)<0)&&!c.req&&!c.transReq&&(!c.feReq||facComp.indexOf(c.feReq)>=0)&&(!c.cond||c.cond(stats,gi,logs))&&introOk(c,logs)}catch(e){return false}}).slice(0,15));
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
  saveSeenArchive:function(ids){Save.set('ts_seenArchive',ids)},getSeenArchive:function(){return Save.get('ts_seenArchive',[])},
  getFacility:function(){return Save.get('ts_facility',null)},
  saveFacility:function(data){Save.set('ts_facility',data)},
  // ═══ 스냅샷 슬롯 (1~3) — 분기 선택 도움용 수동 저장 ═══
  saveSnapshot:function(slot,data){
    var pack={
      version:1,
      timestamp:Date.now(),
      game:Save.get('ts_game',null),
      logs:Save.get('ts_logs',['LOG-001']),
      trust:Save.get('ts_trust',null),
      usedDlg:Save.get('ts_usedDlg',[]),
      usedEvening:Save.get('ts_usedEvening',[]),
      facility:Save.get('ts_facility',null),
      onceShown:Save.get('ts_onceShown',[]),
      label:data&&data.label||('DAY '+((data&&data.day)||'?')+' · ACT '+((data&&data.act)||'?'))
    };
    Save.set('ts_snap_'+slot,pack);
    return pack;
  },
  getSnapshot:function(slot){return Save.get('ts_snap_'+slot,null)},
  deleteSnapshot:function(slot){Save.del('ts_snap_'+slot)},
  listSnapshots:function(){return[1,2,3].map(function(n){return{slot:n,data:Save.get('ts_snap_'+n,null)}})},
  loadSnapshot:function(slot){
    var pack=Save.get('ts_snap_'+slot,null);if(!pack)return null;
    if(pack.game)Save.set('ts_game',pack.game);else Save.del('ts_game');
    if(pack.logs)Save.set('ts_logs',pack.logs);
    if(pack.trust)Save.set('ts_trust',pack.trust);else Save.del('ts_trust');
    if(pack.usedDlg)Save.set('ts_usedDlg',pack.usedDlg);
    if(pack.usedEvening)Save.set('ts_usedEvening',pack.usedEvening);
    if(pack.facility)Save.set('ts_facility',pack.facility);else Save.del('ts_facility');
    if(pack.onceShown)Save.set('ts_onceShown',pack.onceShown);
    return pack;
  },
  // ═══ 업적 ═══
  getAchievements:function(){return Save.get('ts_achievements',[])},
  saveAchievements:function(ids){Save.set('ts_achievements',ids)}
};

var SFX={
  ctx:null,masterGain:null,vol:0.5,muted:false,
  init:function(){if(!this.ctx)try{this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.masterGain=this.ctx.createGain();this.masterGain.connect(this.ctx.destination);var sv=Save.get('ts_sfxVol',null);if(sv!==null)this.vol=sv/100}catch(e){}},
  _out:function(){return this.masterGain||this.ctx.destination},
  tone:function(freq,dur,type,vol){this.init();if(!this.ctx||this.muted)return;var o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type||'sine';o.frequency.value=freq;var v=(vol||0.15)*this.vol;g.gain.setValueAtTime(v,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+dur);o.connect(g);g.connect(this._out());o.start();o.stop(this.ctx.currentTime+dur)},
  noise:function(dur,vol){this.init();if(!this.ctx||this.muted)return;var buf=this.ctx.createBuffer(1,this.ctx.sampleRate*dur,this.ctx.sampleRate),d=buf.getChannelData(0);var v=(vol||0.08)*this.vol;for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*v;var s=this.ctx.createBufferSource();s.buffer=buf;var g=this.ctx.createGain();g.gain.setValueAtTime(v,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+dur);s.connect(g);g.connect(this._out());s.start()},
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
