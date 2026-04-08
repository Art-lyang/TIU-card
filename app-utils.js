// TERMINAL SESSION — app-utils.js
// CARDS 배열, drawCard, Save, SFX 유틸리티
var CARDS = CARDS_BASE.concat(CARDS_STORY).concat(CARDS_ENDING).concat(CARDS_INVESTIGATE).concat(CARDS_RESOURCE).concat(CARDS_ACT1_DAILY).concat(CARDS_ACT2_DAILY).concat(CARDS_TRANSITION).concat(CARDS_HAEUN).concat(CARDS_EXTRA).concat(CARDS_CHAINS).concat(CARDS_NEW_A).concat(CARDS_NEW_B).concat(CARDS_ACT3).concat(CARDS_EXTERNAL).concat(typeof CARDS_FACILITY!=='undefined'?CARDS_FACILITY:[]).concat(typeof CARDS_MIDGAME!=='undefined'?CARDS_MIDGAME:[]).concat(typeof CARDS_INCIDENT!=='undefined'?CARDS_INCIDENT:[]);
var pick=function(a){return a[Math.floor(Math.random()*a.length)]};
var pickN=function(a,n){return[].concat(a).sort(function(){return Math.random()-0.5}).slice(0,Math.min(n,a.length))};
var clamp=function(v,lo,hi){return Math.max(lo||0,Math.min(hi||100,v))};
var applyFx=function(s,fx,m){m=m||5;return{c:clamp(s.c+(fx.c||0)*m),r:clamp(s.r+(fx.r||0)*m),t:clamp(s.t+(fx.t||0)*m),o:clamp(s.o+(fx.o||0)*m),day:s.day}};
var INTRO_FILTER=[{name:'\uc11c\ud558\uc740',log:'LOG-INTRO-SH'},{name:'\uac15\ub3c4\uc724',log:'LOG-INTRO-KD'},{name:'\uc724\uc138\uc9c4',log:'LOG-INTRO-YS'},{name:'\uc784\uc7ac\ud601',log:'LOG-INTRO-IJ'}];
var introOk=function(c,logs){for(var fi=0;fi<INTRO_FILTER.length;fi++){var f=INTRO_FILTER[fi];if(logs.indexOf(f.log)<0&&c.msg&&c.msg.indexOf(f.name)>=0)return false}return true};
// 시설 확장 제안 카드 생성 (30% 확률, 하루 1장)
var tryFacilityProposal=function(stats,currentAct,facilityData){
  if(typeof FACILITY_EXPANSIONS==='undefined')return null;
  var fd=facilityData||{approved:[],pending:[],completed:[],proposed:[]};
  var day=stats.day||1;var ca=currentAct||1;
  var available=FACILITY_EXPANSIONS.filter(function(fe){
    if(fd.approved.indexOf(fe.id)>=0)return false;
    if(fd.pending.indexOf(fe.id)>=0)return false;
    if(fd.completed.indexOf(fe.id)>=0)return false;
    if(fd.proposed.indexOf(fe.id)>=0)return false;
    if(day<fe.minDay)return false;
    if(ca<fe.minAct)return false;
    return true;
  });
  if(available.length===0)return null;
  if(Math.random()>0.30)return null;
  var fe=pick(available);
  return{id:'FP-'+fe.id,feId:fe.id,isFacilityProposal:true,msg:fe.cardMsg,bg:'facility',
    left:{label:fe.cardLeft.label,fx:fe.cardLeft.fx,g:fe.cardLeft.g||0},
    right:{label:fe.cardRight.label,fx:fe.cardRight.fx,g:fe.cardRight.g||0},
    hint:fe.hint};
};
var drawCard=function(stats,gi,logs,cooldowns,recent,currentAct,tRoute,completedFE){
  var day=stats.day||1;var cd=cooldowns||{};var rec=recent||[];var ca=currentAct||1;var tr=tRoute||'';var cfe=completedFE||[];
  var valid=CARDS.filter(function(c){
    if(c.feReq&&cfe.indexOf(c.feReq)<0)return false;
    if(c.act&&c.act.indexOf(ca)<0)return false;
    if(c.transReq&&c.transReq!==tr)return false;
    try{if(c.req&&!c.req(stats,gi,logs))return false}catch(e){return false}
    try{if(c.cond&&!c.cond(stats,gi,logs))return false}catch(e){return false}
    if(c.tag&&cd[c.tag]){var _cd_map={'spec-011':5,'spec-012':5,'spec-001':5,'spec-003':5,'spec-008':5,'weather':2,'aftermath':5};var _cd_days=_cd_map[c.tag]||3;if(c.feReq)_cd_days=999;if((day-cd[c.tag])<_cd_days)return false;}
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
  saveSeenArchive:function(ids){Save.set('ts_seenArchive',ids)},getSeenArchive:function(){return Save.get('ts_seenArchive',[])},
  saveFacility:function(data){Save.set('ts_facility',data);
    // 시설도 페이지와 데이터 공유
    try{localStorage.setItem('tiu_facility_state',JSON.stringify(data))}catch(e){}},
  getFacility:function(){return Save.get('ts_facility',{approved:[],pending:[],completed:[],proposed:[]});}
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
