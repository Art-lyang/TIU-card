// TERMINAL SESSION — components-game.js
// Boot, Stats, CardC, News, GameOver, Tutorial, RewardScreen
var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,useCallback=React.useCallback;
// i18n 헬퍼: tt(path, params, fallback) — t() 없으면 폴백 반환
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};

function Boot(p){
  var BL=p.sessions>0?BOOT_LINES_REPEAT:BOOT_LINES;
  var sn=p.sessions||0;
  var s=useState([]),lines=s[0],setLines=s[1];var s2=useState(false),done=s2[0],setDone=s2[1];var idx=useRef(0);
  var bootStarted=useRef(false);
  var audioUnlocked=useRef(false);
  var tryBootAudio=function(){if(!audioUnlocked.current&&p.onBoot){audioUnlocked.current=true;p.onBoot()}};
  useEffect(function(){var t=setInterval(function(){if(idx.current<BL.length){if(!bootStarted.current){bootStarted.current=true;tryBootAudio()}setLines(function(p){return p.concat([BL[idx.current]])});idx.current++}else{clearInterval(t);setTimeout(function(){setDone(true)},800)}},280);return function(){clearInterval(t)}},[]);
  return h('div',{className:'boot',onClick:tryBootAudio,onTouchStart:tryBootAudio},
    IMG.title_screen&&h('div',{style:{width:'100%',maxWidth:420,marginBottom:12,flexShrink:0,position:'relative',overflow:'hidden',borderRadius:4,border:'1px solid var(--ui-dim)',boxShadow:'0 0 30px rgba(var(--ui-rgb),0.04)'}},h('img',{src:IMG.title_screen,alt:'TERMINAL SESSION',style:{width:'100%',display:'block',filter:'brightness(0.8) contrast(1.1)',opacity:done?1:0.6+Math.min(0.4,lines.length*0.04),transition:'opacity 0.5s ease'}})),h('div',{className:'boot-text',style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,lineHeight:1.7,maxWidth:420,width:'100%',overflowY:'auto',flex:1,minHeight:0}},lines.map(function(l,i){var s=String(l||'');var isObs=s.indexOf('OBSERVER')>=0;var isGrant=s.indexOf('GRANT')>=0;var isTerm=s.indexOf('TERMINAL SESSION')>=0||s.indexOf('SESSION')>=0;var isWel=s.indexOf('WELCOME')>=0;return h('div',{key:i,style:{color:isObs?'#f0a030':isGrant?'#33cccc':isTerm?'#f0a030':isWel?'var(--ui)':'var(--ui)',fontWeight:isTerm||isWel||isObs||isGrant?'bold':'normal',whiteSpace:'pre-wrap',animation:'slideUp 0.3s ease'}},s)}),!done&&h('span',{style:{animation:'blink 1s infinite'}},'█')),done&&h('button',{className:'btn',onClick:p.onDone},tt('boot.startGame',null,'[ 게임 시작 ]')));
}
// ═══ 시나리오 허브 — DLC 확장용 ═══
function ScenarioHub(p){
  var _m=useState('select'),mode=_m[0],setMode=_m[1]; // 'select' | 'main'
  var _dx=useState(0),dx=_dx[0],setDx=_dx[1];
  var _drag=useState(false),dragging=_drag[0],setDrag=_drag[1];
  var _sx=useState(0),sx=_sx[0],setSx=_sx[1];
  var _anim=useState(null),anim=_anim[0],setAnim=_anim[1];
  var scenarios=[
    {id:'main',title:'TERMINAL SESSION',sub:'MISSION: KOREAN BRANCH STABILIZATION',desc:'한국 지부 봉쇄 구역 관리 시나리오',active:true,img:IMG.hub_main},
    {id:'dlc_green',title:'GREEN THRESHOLD',sub:'MISSION: SOVARI BLIND ZONE',desc:'아프리카 소바리 폐허 — EV-Σ 잔류 구역 탐사',active:false,img:IMG.hub_dlc_green},
    {id:'dlc_north',title:'NORTHERN FRONT',sub:'MISSION: SITE-7/13',desc:'러시아 북극권 — 신호 차단 구역 침투',active:false,img:IMG.hub_dlc_north}
  ];
  var _idx=useState(0),idx=_idx[0],setIdx=_idx[1];
  // 스와이프 핸들링
  var onStart=function(x){setSx(x);setDrag(true)};
  var onMove=function(x){if(dragging)setDx(x-sx)};
  var onEnd=function(){
    setDrag(false);
    if(dx<-60&&idx<scenarios.length-1){setAnim('left');setIdx(idx+1)}
    else if(dx>60&&idx>0){setAnim('right');setIdx(idx-1)}
    setDx(0);
    setTimeout(function(){setAnim(null)},300);
  };
  // 키보드
  useEffect(function(){var onKey=function(e){
    if(mode==='main'){
      if(e.key==='Escape'||e.key==='Backspace'){e.preventDefault();setMode('select');return}
      if(e.key==='1'){e.preventDefault();if(p.hasSave)p.onContinue();else p.onTutorial();return}
      if(e.key==='2'){e.preventDefault();if(p.hasSave)p.onNew();return}
      if(e.key==='3'){e.preventDefault();p.onTutorial();return}
      return;
    }
    if(e.key==='ArrowRight'&&idx<scenarios.length-1){e.preventDefault();setAnim('left');setIdx(function(v){return v+1});setTimeout(function(){setAnim(null)},300)}
    if(e.key==='ArrowLeft'&&idx>0){e.preventDefault();setAnim('right');setIdx(function(v){return v-1});setTimeout(function(){setAnim(null)},300)}
    if(e.key==='Enter'||e.key===' '){e.preventDefault();if(scenarios[idx].active)setMode('main')}
  };window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[mode,idx,p.hasSave]);
  var mono={fontFamily:"'Share Tech Mono',monospace"};
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isKo=locale==='ko';
  // 메인 스토리 진입 하위 메뉴
  var entryImg=IMG.hub_main;
  if(mode==='main') return h('div',{className:'boot',style:{justifyContent:'flex-start',padding:'8px 0',gap:0,overflowY:'auto'}},
    entryImg&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,position:'relative',borderRadius:4,overflow:'hidden'}},
      h('img',{src:entryImg,alt:'TERMINAL SESSION',style:{width:'100%',display:'block',filter:'brightness(0.35)'}}),
      h('div',{style:{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px 24px',gap:6}},
        h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.4)',letterSpacing:3})},'ORACLE PROTOCOL // EYES ONLY'),
        h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.3)',letterSpacing:1,marginTop:4})},'KOREAN BRANCH OPERATION'),
        h('div',{style:Object.assign({},mono,{fontSize:15,color:'#f0a030',letterSpacing:2,marginTop:4,textAlign:'center'})},isKo?'오라클 한국지부 안정화':'MISSION: KOREAN BRANCH'),
        h('div',{style:Object.assign({},mono,{fontSize:15,color:'#f0a030',letterSpacing:2,textAlign:'center'})},'STABILIZATION'),
        h('div',{style:{width:40,height:1,background:'rgba(var(--ui-rgb),.2)',margin:'8px 0'}}),
        h('div',{style:Object.assign({},mono,{fontSize:10,color:'var(--ui)',letterSpacing:1})},'TERMINAL SESSION'),
        h('div',{style:{marginTop:6,textAlign:'center',lineHeight:1.8}},
          h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.35)'})},isKo?'강원도 오라클 한국지부':'ORACLE KOREA BRANCH / GANGWON SECTOR'),
          h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.3)'})},'ZONE: PRIMARY COMMAND'),
          h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.3)'})},'STATUS: ACTIVE WATCH'),
          h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(255,100,68,.4)'})},'THREAT INDEX: ELEVATED'),
          h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.3)'})},'ACCESS: MAIN CAMPAIGN'))),
      h('div',{style:{position:'absolute',bottom:0,left:0,right:0,height:'30%',background:'linear-gradient(transparent,rgba(5,10,5,.95))'}})),
    h('div',{style:{display:'flex',flexDirection:'column',gap:10,alignItems:'center',marginTop:4,flexShrink:0,paddingBottom:20}},
      p.hasSave&&h('button',{className:'btn btn-amber',style:{minWidth:220},onClick:p.onContinue},tt('hub.continue',null,isKo?'[ 이어하기 ]':'[ Continue ]')),
      h('button',{className:'btn',style:{minWidth:220,borderColor:p.hasSave?'rgba(var(--ui-rgb),.4)':'#f0a030',color:p.hasSave?'var(--ui)':'#f0a030'},onClick:p.hasSave?p.onNew:p.onTutorial},p.hasSave?tt('hub.newGame',null,isKo?'[ 새게임 ]':'[ New Game ]'):tt('hub.start',null,isKo?'[ 게임시작 ]':'[ Start ]')),
      p.hasSave&&h('button',{className:'btn',style:{minWidth:220,fontSize:11,opacity:0.5},onClick:p.onTutorial},tt('hub.replayTutorial',null,isKo?'[ 튜토리얼 다시하기 ]':'[ Replay Tutorial ]')),
      h('div',{onClick:function(){setMode('select')},style:Object.assign({},mono,{fontSize:10,color:'rgba(var(--ui-rgb),.3)',cursor:'pointer',marginTop:6})},tt('hub.backToSelect',null,isKo?'← 뒤로가기':'← Back to Scenario Select'))));
  var sc=scenarios[idx];
  var cardStyle={width:'100%',maxWidth:440,overflow:'hidden',
    transform:'translateX('+(dragging?dx:0)+'px)',
    transition:dragging?'none':'transform 0.3s ease',cursor:'grab',userSelect:'none'};
  return h('div',{className:'boot',style:{justifyContent:'flex-start',padding:'8px 0',gap:0,overflowY:'auto'}},
    h('div',{style:Object.assign({},mono,{fontSize:10,color:'var(--ui-dim)',letterSpacing:3,textAlign:'center',marginBottom:2,flexShrink:0})},'SCENARIO SELECT'),
    h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.3)',textAlign:'center',marginBottom:4,flexShrink:0})},
      (idx+1)+' / '+scenarios.length),
    h('div',{style:cardStyle,
      onMouseDown:function(e){onStart(e.clientX)},onMouseMove:function(e){onMove(e.clientX)},onMouseUp:onEnd,onMouseLeave:function(){if(dragging)onEnd()},
      onTouchStart:function(e){onStart(e.touches[0].clientX)},onTouchMove:function(e){onMove(e.touches[0].clientX)},onTouchEnd:onEnd},
      sc.img&&h('img',{src:sc.img,alt:sc.title,style:{width:'100%',display:'block',borderRadius:4,filter:'brightness(0.9)',transition:'filter 0.3s'}})),
    h('div',{style:{display:'flex',gap:6,justifyContent:'center',margin:'8px 0',flexShrink:0}},
      scenarios.map(function(s,i){return h('div',{key:s.id,style:{width:i===idx?16:6,height:6,borderRadius:3,
        background:i===idx?'var(--ui)':'rgba(var(--ui-rgb),.2)',transition:'all 0.3s'}})})),
    sc.active&&h('button',{className:'btn btn-amber',style:{flexShrink:0},onClick:function(){setMode('main')}},tt('hub.enter',null,'[ 진입 ]')),
    !sc.active&&h('div',{style:Object.assign({},mono,{fontSize:10,color:'rgba(var(--ui-rgb),.2)',textAlign:'center',flexShrink:0})},tt('hub.exploreSwipe',null,'← 스와이프하여 시나리오 탐색 →')),
    p.onBack&&h('div',{onClick:p.onBack,style:Object.assign({},mono,{fontSize:10,color:'rgba(var(--ui-rgb),.25)',cursor:'pointer',marginTop:8,textAlign:'center',flexShrink:0})},'← MAIN MENU'));
}
// ═══ 메인 메뉴 ═══
function MainMenu(p){
  var mono={fontFamily:"'Share Tech Mono',monospace"};
  var _sub=useState(null),sub=_sub[0],setSub=_sub[1];
  // 설정 서브뷰
  if(sub==='settings')return h('div',{className:'boot',style:{justifyContent:'flex-start',padding:'16px 0',overflowY:'auto'}},
    h(SettingsPanel,{onClose:function(){setSub(null)},onReset:p.onReset,onFullReset:p.onFullReset,
      onLogs:function(){setSub(null);p.onLogs()},onArchive:function(){setSub(null);p.onArchive()},
      onSaveSnap:p.onSaveSnap,onLoadSnap:p.onLoadSnap,onFxModeChange:p.onFxModeChange,
      onMainMenu:function(){setSub(null);if(p.onMainMenu)p.onMainMenu();}}));
  // 메인 메뉴
  return h('div',{className:'boot',style:{justifyContent:'center',gap:0}},
    IMG.title_screen&&h('div',{style:{width:'100%',maxWidth:360,marginBottom:20,flexShrink:0}},
      h('img',{src:IMG.title_screen,alt:'TERMINAL SESSION',style:{width:'100%',display:'block',borderRadius:4,filter:'brightness(0.8) contrast(1.1)',opacity:0.9}})),
    h('div',{style:Object.assign({},mono,{fontSize:10,color:'var(--ui-dim)',letterSpacing:3,textAlign:'center',marginBottom:16})},'MAIN MENU'),
    h('div',{style:{display:'flex',flexDirection:'column',gap:10,alignItems:'center'}},
      h('button',{className:'btn btn-amber',style:{minWidth:240,fontSize:13},onClick:p.onPlay},tt('menu.startGame',null,'[ 게임 시작 ]')),
      p.hasSave&&h('button',{className:'btn',style:{minWidth:240},onClick:p.onContinue},tt('menu.continue',null,'[ 이어하기 ]')),
      h('button',{className:'btn',style:{minWidth:240},onClick:p.onArchive},tt('settings.archive',null,'아카이브')),
      h('button',{className:'btn',style:{minWidth:240},onClick:p.onLogs},tt('gameOver.logs',null,'로그')),
      h('button',{className:'btn',style:{minWidth:240},onClick:function(){setSub('settings')}},tt('settings.title',null,'SETTINGS')),
      h('div',{style:Object.assign({},mono,{fontSize:9,color:'rgba(var(--ui-rgb),.2)',marginTop:16,textAlign:'center'})},'TERMINAL SESSION v'+((typeof BUILD_VER!=='undefined')?BUILD_VER:'?'))));
}
function Stats(p){
  var sm=[{k:'c',l:tt('stats.c',null,'봉쇄')},{k:'r',l:tt('stats.r',null,'자원')},{k:'t',l:tt('stats.t',null,'신뢰')},{k:'o',l:tt('stats.o',null,'평가')}];
  var pv=p.preview||{};
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isKo=locale==='ko';
  return h('div',{className:isKo?'stats-pane stats-pane-ko':'stats-pane',style:{width:'100%',maxWidth:440,flexShrink:0}},
    h('div',{className:'section-hdr'},h('span',null,tt('stats.title',{day:p.stats.day},'ORACLE STATUS — DAY '+p.stats.day))),
    sm.map(function(s){var v=p.stats[s.k],d=v<=15,hi=v>=85;var delta=(pv[s.k]||0)*5;var newV=Math.max(0,Math.min(100,v+delta));return h('div',{key:s.k,className:'gauge-row'+(d?' gauge-danger':'')+(hi?' gauge-high':'')},
      h('div',{className:'gauge-icon gauge-icon-'+s.k}),
      h('span',{className:'gauge-label'},s.l),
      h('div',{className:'gauge-bar'},
        h('div',{className:'gauge-bar-inner'},
          delta>0?h('div',{style:{position:'absolute',left:0,top:0,width:newV+'%',height:'100%',background:'rgba(var(--ui-rgb),0.15)',zIndex:1,transition:'width 0.15s'}}):null,
          h('div',{className:'gauge-fill',style:{width:(delta<0?newV:v)+'%',transition:'width 0.15s'}}),
          delta<0?h('div',{style:{position:'absolute',left:newV+'%',top:0,width:Math.max(0,v-newV)+'%',height:'100%',background:'rgba(255,50,50,0.3)',zIndex:1,transition:'all 0.15s'}}):null)),
      h('span',{className:'gauge-val',style:delta!==0?{color:delta>0?'var(--ui)':'#ff4444',fontSize:12}:{}},delta!==0?(delta>0?'+':'')+delta:v))})
  );
}
function CardC(p){
  var card=p.card,gi=p.gi||0;
  // 동적 속성 지원 — timer/label이 함수면 호출해서 세션 횟수 등 반영
  var resolveVal=function(v){return typeof v==='function'?v():v};
  var timerTotal=resolveVal(card.timer)||0;
  var cardLoc=(typeof tc==='function')?tc('cards',card.id,null):null;
  var leftLabel=(cardLoc&&cardLoc.leftLabel)||resolveVal(card.left&&card.left.label)||'';
  var rightLabel=(cardLoc&&cardLoc.rightLabel)||resolveVal(card.right&&card.right.label)||'';
  var defaultBlockMsgs=tt('card.blockMsgs',null,null);
  if(!Array.isArray(defaultBlockMsgs))defaultBlockMsgs=[
    '[ORACLE: Command refusal detected - confirmation required]',
    '[ORACLE: Compliance protocol activating]',
    '[ORACLE: Warning - noncompliance being recorded]'
  ];
  var blockMsgs=(cardLoc&&cardLoc.oracleBlockMsgs)||card.oracleBlockMsgs||defaultBlockMsgs;
  var s1=useState(0),dx=s1[0],setDx=s1[1];var s2=useState(false),dragging=s2[0],setDragging=s2[1];var s3=useState(0),sx=s3[0],setSx=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(0),blockCount=s5[0],setBlockCount=s5[1];var s6=useState(false),shaking=s6[0],setShaking=s6[1];
  // ═══ 카드 타이머 (card.timer 초 단위) — 만료 시 오른쪽 자동 선택 ═══
  var s7=useState(timerTotal),remaining=s7[0],setRemaining=s7[1];
  useEffect(function(){setBlockCount(0);setShaking(false);setRemaining(timerTotal)},[card.id]);
  // 선택지 확정 시(매뉴얼/오라클차단 아님) + replyMsg 있으면 토스트 호출 후 onSwipe
  var performSwipe=function(kdir){
    var branch=card[kdir];
    var replyKey=kdir==='left'?'leftReplyMsg':'rightReplyMsg';
    var replyMsg=(cardLoc&&cardLoc[replyKey])||(branch&&branch.replyMsg);
    if(replyMsg&&p.onReply){p.onReply(replyMsg)}
    setChosen(kdir);
    setTimeout(function(){p.onSwipe(kdir);setDx(0);setChosen(null)},replyMsg?1500:300);
  };
  // 타이머 카운트다운
  useEffect(function(){
    if(!timerTotal||chosen||shaking)return;
    if(remaining<=0){performSwipe('right');return}
    var t=setTimeout(function(){setRemaining(function(r){return Math.max(0,r-0.1)})},100);
    return function(){clearTimeout(t)};
  },[remaining,card.id,chosen,shaking]);
  useEffect(function(){
    var onKey=function(e){
      if(chosen||shaking)return;
      var kdir=null;
      if(e.key==='ArrowLeft'||e.key==='1'||e.code==='Numpad1')kdir='left';
      else if(e.key==='ArrowRight'||e.key==='2'||e.code==='Numpad2')kdir='right';
      if(!kdir)return;
      e.preventDefault();
      var shouldBlock=card.oracleBlock&&blockCount<card.oracleBlock&&kdir===(card.oracleBlockDir||'left');
      if(shouldBlock){
        var bmsg=blockMsgs[Math.min(blockCount,blockMsgs.length-1)];
        setBlockCount(blockCount+1);
        if(p.onOracleBlock)p.onOracleBlock(bmsg);
        setTimeout(function(){setShaking(true);setTimeout(function(){setShaking(false)},600)},60);
      }else{
        performSwipe(kdir);
      }
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[card,chosen,shaking,blockCount]);
  var th=80,dir=dx>th?'right':dx<-th?'left':null,tx=chosen==='left'?-400:chosen==='right'?400:dx;
  var curDir=Math.abs(dx)>20?(dx<0?'left':'right'):null;
  var hS=function(x){setSx(x);setDragging(true)},hM=function(x){if(dragging){var nd=x-sx;setDx(nd);if(p.onPreview){var d=Math.abs(nd)>20?(nd<0?'left':'right'):null;p.onPreview(d?card[d].fx:null)}}};
  var hE=function(){setDragging(false);if(p.onPreview)p.onPreview(null);if(dir){var shouldBlock=card.oracleBlock&&blockCount<card.oracleBlock&&dir===(card.oracleBlockDir||'left');if(shouldBlock){setDx(0);var bmsg=blockMsgs[Math.min(blockCount,blockMsgs.length-1)];setBlockCount(blockCount+1);if(p.onOracleBlock)p.onOracleBlock(bmsg);setTimeout(function(){setShaking(true);setTimeout(function(){setShaking(false)},600)},60);}else{setDx(0);performSwipe(dir)}}else setDx(0)};
  var pcClass=card.priority==='상'?' card-p-high':card.priority==='중'?' card-p-mid':' card-p-low';
  if(card.glitch)pcClass+=' card-glitch';
  var plbl=card.priority==='상'?tt('card.priorityShort.high',null,'상 ■'):card.priority==='중'?tt('card.priorityShort.mid',null,'중 ■'):tt('card.priorityShort.low',null,'하');
  var specImgMap={'spec-001':IMG.spec_001_mannequin,'spec-003':IMG.spec_003_brood,'spec-004':IMG.spec_004_seedspreader,'spec-008':IMG.spec_008_spore,'spec-011':IMG.spec_011_shelltalker,'spec-012':IMG.spec_012_bloodpit,'spec-015':IMG.spec_015_brainseeker};
  var bgImgMap={base:IMG.bg_base,forest:IMG.bg_forest,forest2:IMG.bg_forest2,lab:IMG.bg_lab,oracle:IMG.bg_oracle,comms:IMG.bg_comms,restricted:IMG.bg_restricted,shield_off:IMG.bg_shield_off,shield_on:IMG.bg_shield_on,supply:IMG.bg_supply,weather:IMG.bg_weather};
  var specBg=card.img?IMG[card.img]:card.tag&&specImgMap[card.tag]?specImgMap[card.tag]:null;
  if(!specBg&&card.bg&&bgImgMap[card.bg])specBg=bgImgMap[card.bg];
  var SN={c:tt('stats.c',null,'봉쇄'),r:tt('stats.r',null,'자원'),t:tt('stats.t',null,'신뢰'),o:tt('stats.o',null,'평가')};
  var fxHint=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){var v=(fx[k]||0);var abs=Math.abs(v);if(v>0)tags.push(h('span',{key:k,style:{color:'var(--ui)'}},SN[k]+(abs>=2?'↑↑':'↑')));if(v<0)tags.push(h('span',{key:k,style:{color:'rgba(255,141,97,.9)'}},SN[k]+(abs>=2?'↓↓':'↓')))});return tags.length?tags:null};
  var leftFx=fxHint(card.left.fx),rightFx=fxHint(card.right.fx);
  return h('div',{style:{flex:1,width:'100%',maxWidth:440,position:'relative',display:'flex',flexDirection:'column',minHeight:0}},
    h('div',{style:{position:'absolute',top:'50%',left:4,fontSize:11,color:'var(--ui)',opacity:dx<-30?Math.min(0.8,Math.abs(dx)/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',pointerEvents:'none',zIndex:2}},'← '+leftLabel),
    h('div',{style:{position:'absolute',top:'50%',right:4,fontSize:11,color:'var(--ui)',opacity:dx>30?Math.min(0.8,dx/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',textAlign:'right',pointerEvents:'none',zIndex:2}},rightLabel+' →'),
    h('div',{className:'card-panel'+pcClass,style:{transform:shaking?'none':'translateX('+tx+'px) rotate('+(tx*0.04)+'deg)',animation:shaking?'oracleShake 0.6s ease':'none',transition:dragging||shaking?'none':'transform 0.3s ease',opacity:chosen?0:1,touchAction:'none',WebkitUserSelect:'none',userSelect:'none'},
      onMouseDown:function(e){hS(e.clientX)},onMouseMove:function(e){hM(e.clientX)},onMouseUp:hE,onMouseLeave:function(){if(dragging)hE()},
      onTouchStart:function(e){hS(e.touches[0].clientX)},onTouchMove:function(e){e.preventDefault();hM(e.touches[0].clientX)},onTouchEnd:hE,onTouchCancel:function(){setDragging(false);setDx(0);if(p.onPreview)p.onPreview(null)}},
      specBg&&h('div',{className:'card-img-bg',style:{backgroundImage:'url('+specBg+')'}}),
      card.isFacilityProposal&&h('div',{style:{background:'rgba(74,170,238,.1)',border:'1px solid rgba(74,170,238,.3)',padding:'3px 8px',fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#4ae',letterSpacing:2,textAlign:'center',marginBottom:4,textTransform:'uppercase'}},'FACILITY PROPOSAL'),
      card.glitch&&h('div',{style:{background:'rgba(255,60,60,.08)',border:'1px solid rgba(255,60,60,.25)',padding:'3px 8px',fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#ff4444',letterSpacing:2,textAlign:'center',marginBottom:4,textTransform:'uppercase',animation:'glitchText 0.15s ease infinite'}},'⚠ SYSTEM ERROR — UNREGISTERED PROTOCOL'),
      h('div',{className:'card-hdr'},h('span',{className:'card-hdr-l'},card.glitch?'ERR:0x8F2A':card.isFacilityProposal?tt('card.facilityExpansion',null,'시설 확장'):tt('card.oracleComm',null,'ORACLE 통신')),h('span',{className:'card-hdr-r'},card.glitch?'██████':tt('card.priority',{priority:plbl},'우선순위: '+plbl))),
      timerTotal>0&&!chosen&&h('div',{style:{background:'rgba(255,60,60,.08)',border:'1px solid '+(remaining<=2?'rgba(255,60,60,.8)':'rgba(240,160,48,.4)'),padding:'4px 8px',fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:remaining<=2?'#ff4444':'#f0a030',letterSpacing:1.5,textAlign:'center',marginBottom:4,textTransform:'uppercase',display:'flex',alignItems:'center',gap:8}},
        h('span',{style:{flexShrink:0}},'⚠ AUTO-OVERRIDE'),
        h('div',{style:{flex:1,height:6,background:'rgba(0,0,0,.4)',borderRadius:2,overflow:'hidden'}},
          h('div',{style:{height:'100%',width:Math.max(0,Math.min(100,(remaining/(timerTotal||1))*100))+'%',background:remaining<=2?'#ff4444':'#f0a030',transition:'width 0.1s linear, background 0.2s'}})),
        h('span',{style:{flexShrink:0,fontVariantNumeric:'tabular-nums'}},Math.ceil(remaining)+'s')
      ),
      h('div',{className:'card-msg'},function(){
        var rawMsg=(cardLoc&&cardLoc.msg!=null?resolveVal(cardLoc.msg):(typeof card.msg==='function'?card.msg():(card.msg||'')));var paras=String(rawMsg||'').split('\n\n');
        return paras.map(function(para,pi){
          var lines=para.split('\n');
          return h('div',{key:pi,style:{marginBottom:pi<paras.length-1?10:0}},
            lines.map(function(line,li){
              var s=line.trim();if(!s)return null;
              // [ORACLE ...] 대괄호 스타일
              if(s.match(/^\[ORACLE[\s:：]/))return h('div',{key:li,style:{color:'#f0a030',fontFamily:"'Share Tech Mono',monospace",fontSize:12,padding:'6px 10px',margin:'4px 0',background:'rgba(240,160,48,.06)',borderLeft:'2px solid rgba(240,160,48,.3)',borderRadius:2}},s);
              // ORACLE 분석/권고/통신 등 (대괄호 없는 ORACLE 라인)
              if(s.match(/^ORACLE[\s]/))return h('div',{key:li,style:{color:'#f0a030',fontFamily:"'Share Tech Mono',monospace",fontSize:12,padding:'4px 0',margin:'2px 0'}},s);
              // 캐릭터 대사 — 이름(+직책/수식어) + 콜론
              if(s.match(/^(서하은|강도윤|윤세진|임재혁|박소영|마르쿠스 베버|닉 포스터|포스터)([\s\u00A0][\uAC00-\uD7A3A-Za-z\s]*)?[：:]/))return h('div',{key:li,style:{color:'#7ec8e3',padding:'3px 0',margin:'2px 0'}},s);
              // "인용문" — 쌍따옴표로 시작하는 독립 대사
              if(s.match(/^["\u201C\u300C]/)&&s.match(/["\u201D\u300D]$/))return h('div',{key:li,style:{color:'#a0d8a0',fontStyle:'italic',padding:'2px 0'}},s);
              // 일반 텍스트
              return h('div',{key:li,style:{padding:'1px 0'}},s);
            }));
        });
      }()),
      card.hint&&h('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(74,170,238,.06)',borderLeft:'2px solid rgba(74,170,238,.3)',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#4ae',letterSpacing:0.5}},card.hint),
      (leftFx||rightFx)&&h('div',{style:{marginTop:'auto',padding:'10px 0 6px',borderTop:'1px solid rgba(var(--ui-rgb),.08)'}},
        h('div',{style:{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',fontFamily:"'Share Tech Mono',monospace",fontSize:9,columnGap:10,rowGap:3,alignItems:'center'}},
          h('div',{style:{display:'flex',gap:6,alignItems:'center',justifyContent:'flex-start',textAlign:'left',opacity:0.7}},h('span',{style:{color:'rgba(var(--ui-rgb),.5)',fontSize:9,flexShrink:0}},'←'),leftFx||h('span',{style:{color:'rgba(var(--ui-rgb),.3)'}},'—')),
          h('div',{style:{display:'flex',gap:6,alignItems:'center',justifyContent:'flex-end',textAlign:'right',opacity:0.7}},rightFx||h('span',{style:{color:'rgba(var(--ui-rgb),.3)'}},'—'),h('span',{style:{color:'rgba(var(--ui-rgb),.5)',fontSize:9,flexShrink:0}},'→')))),
      h('div',{style:{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',paddingTop:8,borderTop:'1px solid rgba(var(--ui-rgb),.1)',fontFamily:"'Share Tech Mono',monospace",fontSize:9,pointerEvents:'none',columnGap:10,alignItems:'center'}},
        h('span',{style:{color:'rgba(var(--ui-rgb),.45)',display:'block',textAlign:'left'}},'← '+leftLabel),
        h('span',{style:{color:'rgba(var(--ui-rgb),.45)',display:'block',width:'100%',justifySelf:'end',textAlign:'right'}},rightLabel+' →'))
    ));
}
function News(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  useEffect(function(){if(shown<p.headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,p.headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=p.headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,p.headlines.length]);
  var parseHL=function(raw){var s=String(raw||'');var isGl=s.indexOf('분류 오류')>=0;var isDel=s.indexOf('삭제됨')>=0;if(isGl||isDel)return{tag:'REDACTED',text:s,gl:true};if(s.indexOf('[해외]')>=0){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:s.replace('[해외] ',''),gl:false}}if(s.indexOf('[국내]')>=0){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:s.replace('[국내] ',''),gl:false}}return{tag:'INTEL-01',text:s,gl:false}};
  var st=p.stats||{};var gi=p.gi||0;var act=p.act||1;
  var AP={h:["운영 효율 양호. 현행 유지 권고.","ORACLE 권고 이행률 우수. 한국 지부 성과 상위권.","지휘관 판단 신뢰도 높음. 현 운영 방침 유지.","기지 안정성 확인. 추가 권한 부여 검토 중."],m:["운영 안정. 일부 비표준 패턴 감지.","전반적 안정. 독립적 판단 빈도 소폭 증가.","기지 운영 정상 범위. 일부 지표 변동 주시 중.","ORACLE 권고 이행률 보통. 관찰 지속."],l:["비표준 판단 빈도 증가. 모니터링 강화.","독자적 의사결정 패턴 감지. 분석 중.","ORACLE 권고 이탈 빈도 상승. 기록 중.","운영 데이터 분석 — 비표준 항목 다수 확인."],v:["비표준 운영 패턴 다수 감지. 주의 요망.","지휘관 신뢰 지표 하락 중. 재평가 예정.","ORACLE 권고 무시 빈도 위험 수준 접근.","운영 이상 감지. 본부 보고 검토 중."]};
  var aPool=gi>=40?AP.h:gi>=10?AP.m:gi>=0?AP.l:AP.v;var assess=aPool[Math.floor(Math.random()*aPool.length)];
  var statBar=function(k,v,nm){var d=v<=20;return h('div',{key:k,style:{display:'flex',alignItems:'center',gap:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10}},h('span',{style:{color:'rgba(var(--ui-rgb),.55)',width:24}},nm),h('div',{style:{flex:1,height:3,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}},h('div',{style:{height:'100%',width:v+'%',background:d?'rgba(255,68,68,.6)':'rgba(var(--ui-rgb),.4)',borderRadius:2,transition:'width 0.4s'}})),h('span',{style:{color:d?'#ff4444':'rgba(var(--ui-rgb),.6)',width:20,textAlign:'right',fontSize:9}},v))};
  return h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,padding:'20px 22px 16px',cursor:'default',marginTop:'auto',marginBottom:'auto',display:'flex',flexDirection:'column',maxHeight:'calc(100vh - 60px)',overflow:'hidden'}},
    h('div',{className:'oracle-card__glow'}),
    h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:1}},'[ORACLE // DAILY REPORT]'),
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.5)',letterSpacing:1}},'ACT '+act)),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',fontWeight:'bold',marginBottom:10,letterSpacing:1,borderBottom:'1px solid rgba(var(--ui-rgb),.15)',paddingBottom:8,flexShrink:0}},'DAY '+(p.day||'?')+' REPORT'),
    h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},'[STATUS OVERVIEW]'),
        h('div',{style:{display:'flex',flexDirection:'column',gap:4}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'봉쇄')),statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'자원')),statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'신뢰')),statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'평가'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},'[SITUATION REPORT]'),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('⚠')>=0;
            return h('div',{key:'sit-'+i,style:{fontSize:11,lineHeight:1.6,color:isWarn?'#ff8844':'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:'fadeIn 0.4s ease'}},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},'[INTEL BRIEFING]'),
      p.headlines.slice(0,shown).map(function(l,i){var hl=parseHL(l);return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)',animation:'fadeIn 0.4s ease'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
        h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'var(--ui-text)'}},hl.text))}),
      shown>=p.headlines.length&&typeof FacilityStatusSection==='function'&&h(FacilityStatusSection,{stats:p.stats,facility:p.facility})),
    shown>=p.headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ 다음 사이클 진행 ]'))));
}
function NewsReport(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  useEffect(function(){if(shown<p.headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,p.headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=p.headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,p.headlines.length]);
  var parseHL=function(raw){
    var s=String(raw||'');
    var view=(locale==='en'&&typeof tc==='function')?tc('newsItems',s,null):null;
    var body=view&&view.text?view.text:s;
    var type=view&&view.type?view.type:null;
    var isGl=s.indexOf('분류 오류')>=0;
    var isDel=s.indexOf('삭제됨')>=0;
    if(isGl||isDel||type==='redacted')return{tag:'REDACTED',text:body,gl:true};
    if(type==='foreign'||s.indexOf('[해외]')>=0){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:body.replace('[해외] ','').replace('[OVERSEAS] ',''),gl:false}}
    if(type==='domestic'||s.indexOf('[국내]')>=0){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:body.replace('[국내] ','').replace('[DOMESTIC] ',''),gl:false}}
    return{tag:'INTEL-01',text:body,gl:false}
  };
  var st=p.stats||{};var gi=p.gi||0;var act=p.act||1;
  var AP={
    h:[tt('news.assess.high1',null,'Operational efficiency stable. Maintain current directive.'),tt('news.assess.high2',null,'High compliance with ORACLE advisories. Korea Branch performance remains above average.'),tt('news.assess.high3',null,'Commander trust index elevated. Expanded authority under review.'),tt('news.assess.high4',null,'Branch stability reconfirmed. Additional clearance being considered.')],
    m:[tt('news.assess.mid1',null,'Operations stable. Minor nonstandard signals detected.'),tt('news.assess.mid2',null,'Overall conditions nominal. Decision variance among personnel has slightly increased.'),tt('news.assess.mid3',null,'Branch remains within normal bounds. Select indicators under observation.'),tt('news.assess.mid4',null,'Average ORACLE compliance rate. Continued monitoring advised.')],
    l:[tt('news.assess.low1',null,'Nonstandard decision frequency increasing. Monitoring intensified.'),tt('news.assess.low2',null,'Independent command patterns detected. Analysis ongoing.'),tt('news.assess.low3',null,'Repeated deviation from ORACLE advisories logged.'),tt('news.assess.low4',null,'Several nonstandard operational markers identified in branch telemetry.')],
    v:[tt('news.assess.veryLow1',null,'Multiple abnormal operational patterns detected. Caution advised.'),tt('news.assess.veryLow2',null,'Commander trust index declining. Reassessment pending.'),tt('news.assess.veryLow3',null,'ORACLE advisory override frequency entering risk threshold.'),tt('news.assess.veryLow4',null,'Operational anomaly detected. Headquarters review under consideration.')]
  };
  var aPool=gi>=40?AP.h:gi>=10?AP.m:gi>=0?AP.l:AP.v;
  var assess=aPool[Math.floor(Math.random()*aPool.length)];
  var statBar=function(k,v,nm){
    var d=v<=20;
    return h('div',{key:k,style:{display:'grid',gridTemplateColumns:'76px minmax(0,1fr) 28px',alignItems:'center',columnGap:8,fontFamily:"'Share Tech Mono',monospace",fontSize:10}},
      h('span',{style:{color:'rgba(var(--ui-rgb),.72)',minWidth:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},nm),
      h('div',{style:{minWidth:0,height:4,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}},
        h('div',{style:{height:'100%',width:v+'%',background:d?'rgba(255,68,68,.6)':'rgba(var(--ui-rgb),.4)',borderRadius:2,transition:'width 0.4s'}})),
      h('span',{style:{color:d?'#ff4444':'rgba(var(--ui-rgb),.78)',width:28,textAlign:'right',fontSize:9}},v)
    )
  };
  var facilitySection=(function(){
    var fac=p.facility||{};
    var comp=fac.completed||[];
    var appr=fac.approved||[];
    var lines=[];
    var cm={red:'#ff4444',orange:'#f0a030',green:'var(--ui)',gray:'rgba(var(--ui-rgb),.4)'};
    var feNameMapEn={
      'FE-001':'Cryostorage Expansion','FE-002':'Outdoor Training Yard','FE-003':'High-Sensitivity Sensor Array','FE-004':'Medical Wing Expansion',
      'FE-005':'Secondary Supply Route','FE-006':'CCTV Grid Replacement','FE-007':'Emergency Shelter Bunker','FE-008':'Forward Observation Route',
      'FE-009':'Quarantine Response Lab','FE-010':'Research Data Backup Array','FE-011':'B3 Lower Systems Upgrade','FE-012':'Independent Server Room',
      'FE-013':'Independent Communications Room','FE-014':'Emergency Generator Wing','FE-015':'Shielded Briefing Room','FE-016':'Armory Expansion'
    };
    var feName=function(fe){var view=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;return view?(view.name||fe.name):'';};
    if(locale==='en'){
      if(st.c<=15)lines.push({text:'Security Sector — breach risk [CRITICAL]',color:'red',blink:true});
      else if(st.c<=25)lines.push({text:'Security Sector — containment instability warning',color:'orange'});
      if(st.r<=15)lines.push({text:'Supply Depot — reserves depleted [CRITICAL]',color:'red',blink:true});
      else if(st.r<=30)lines.push({text:'Supply Depot — resource shortage warning',color:'orange'});
      if(st.t<=15)lines.push({text:'Personnel Cohesion — desertion risk',color:'red'});
      else if(st.t<=25)lines.push({text:'Personnel Cohesion — morale decline detected',color:'orange'});
      if(st.o<=30)lines.push({text:'Comms Layer — ORACLE relay unstable',color:'orange'});
      comp.forEach(function(feId){var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' — online ✓',color:'green'})});
      appr.forEach(function(feId){if(comp.indexOf(feId)>=0)return;var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' — expansion pending',color:'gray'})});
      if(lines.length===0)lines.push({text:'All sectors operating normally',color:'green'});
    }else{
      if(typeof getFacilityStatusLines!=='function')return null;
      lines=getFacilityStatusLines(st,comp,appr)||[];
      if(!lines.length)return null;
    }
    return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionFacility',null,'[FACILITY STATUS]')),
      lines.map(function(line,i){
        return h('div',{key:'fac-'+i,style:{fontSize:11,lineHeight:1.6,color:cm[line.color]||'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:line.blink?'blink 1s infinite':'fadeIn 0.4s ease'}},'▸ '+line.text)
      })
    );
  })();
  return h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,padding:'20px 22px 16px',cursor:'default',marginTop:'auto',marginBottom:'auto',display:'flex',flexDirection:'column',maxHeight:'calc(100vh - 60px)',overflow:'hidden'}},
    h('div',{className:'oracle-card__glow'}),
    h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:1}},tt('news.header',null,'[ORACLE // DAILY REPORT]')),
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.5)',letterSpacing:1}},'ACT '+act)),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',fontWeight:'bold',marginBottom:10,letterSpacing:1,borderBottom:'1px solid rgba(var(--ui-rgb),.15)',paddingBottom:8,flexShrink:0}},tt('news.dayReport',{day:(p.day||'?')},'DAY '+(p.day||'?')+' REPORT')),
    h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionStatus',null,'[STATUS OVERVIEW]')),
        h('div',{style:{display:'flex',flexDirection:'column',gap:5}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'Containment')),
          statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'Resources')),
          statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'Trust')),
          statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'Evaluation'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionSituation',null,'[SITUATION REPORT]')),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('⚠')>=0;
            return h('div',{key:'sit-'+i,style:{fontSize:11,lineHeight:1.6,color:isWarn?'#ff8844':'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:'fadeIn 0.4s ease'}},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionIntel',null,'[INTEL BRIEFING]')),
      p.headlines.slice(0,shown).map(function(l,i){
        var hl=parseHL(l);
        return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)',animation:'fadeIn 0.4s ease'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
          h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'var(--ui-text)'}},hl.text))
      }),
      shown>=p.headlines.length&&facilitySection),
    shown>=p.headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ PROCEED TO NEXT CYCLE ]'))));
}
function NewsReport2(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  useEffect(function(){if(shown<p.headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,p.headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=p.headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,p.headlines.length]);
  var parseHL=function(raw){
    var s=String(raw||'');
    var view=(locale==='en'&&typeof tc==='function')?tc('newsItems',s,null):null;
    var body=view&&view.text?view.text:s;
    var type=view&&view.type?view.type:null;
    var isGl=s.indexOf('분류 오류')>=0;
    var isDel=s.indexOf('삭제됨')>=0;
    if(isGl||isDel||type==='redacted')return{tag:'REDACTED',text:body,gl:true};
    if(type==='foreign'||s.indexOf('[해외]')>=0){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:body.replace('[해외] ','').replace('[OVERSEAS] ',''),gl:false}};
    if(type==='domestic'||s.indexOf('[국내]')>=0){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:body.replace('[국내] ','').replace('[DOMESTIC] ',''),gl:false}};
    return{tag:'INTEL-01',text:body,gl:false};
  };
  var st=p.stats||{};var gi=p.gi||0;var act=p.act||1;
  var AP={
    h:[tt('news.assess.high1',null,'Operational efficiency stable. Maintain current directive.'),tt('news.assess.high2',null,'High compliance with ORACLE advisories. Korea Branch performance remains above average.'),tt('news.assess.high3',null,'Commander trust index elevated. Expanded authority under review.'),tt('news.assess.high4',null,'Branch stability reconfirmed. Additional clearance being considered.')],
    m:[tt('news.assess.mid1',null,'Operations stable. Minor nonstandard signals detected.'),tt('news.assess.mid2',null,'Overall conditions nominal. Decision variance among personnel has slightly increased.'),tt('news.assess.mid3',null,'Branch remains within normal bounds. Select indicators under observation.'),tt('news.assess.mid4',null,'Average ORACLE compliance rate. Continued monitoring advised.')],
    l:[tt('news.assess.low1',null,'Nonstandard decision frequency increasing. Monitoring intensified.'),tt('news.assess.low2',null,'Independent command patterns detected. Analysis ongoing.'),tt('news.assess.low3',null,'Repeated deviation from ORACLE advisories logged.'),tt('news.assess.low4',null,'Several nonstandard operational markers identified in branch telemetry.')],
    v:[tt('news.assess.veryLow1',null,'Multiple abnormal operational patterns detected. Caution advised.'),tt('news.assess.veryLow2',null,'Commander trust index declining. Reassessment pending.'),tt('news.assess.veryLow3',null,'ORACLE advisory override frequency entering risk threshold.'),tt('news.assess.veryLow4',null,'Operational anomaly detected. Headquarters review under consideration.')]
  };
  var aPool=gi>=40?AP.h:gi>=10?AP.m:gi>=0?AP.l:AP.v;
  var assess=aPool[Math.floor(Math.random()*aPool.length)];
  var statBar=function(k,v,nm){
    var d=v<=20;
    return h('div',{key:k,style:{display:'grid',gridTemplateColumns:'76px minmax(0,1fr) 28px',alignItems:'center',columnGap:8,fontFamily:"'Share Tech Mono',monospace",fontSize:10}},
      h('span',{style:{color:'rgba(var(--ui-rgb),.72)',minWidth:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},nm),
      h('div',{style:{minWidth:0,height:4,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}},
        h('div',{style:{height:'100%',width:v+'%',background:d?'rgba(255,68,68,.6)':'rgba(var(--ui-rgb),.4)',borderRadius:2,transition:'width 0.4s'}})),
      h('span',{style:{color:d?'#ff4444':'rgba(var(--ui-rgb),.78)',width:28,textAlign:'right',fontSize:9}},v)
    );
  };
  var facilitySection=(function(){
    var fac=p.facility||{},comp=fac.completed||[],appr=fac.approved||[],lines=[];
    var cm={red:'#ff4444',orange:'#f0a030',green:'var(--ui)',gray:'rgba(var(--ui-rgb),.4)'};
    var feNameMapEn={
      'FE-001':'Cryostorage Expansion','FE-002':'Outdoor Training Yard','FE-003':'High-Sensitivity Sensor Array','FE-004':'Medical Wing Expansion',
      'FE-005':'Secondary Supply Route','FE-006':'CCTV Grid Replacement','FE-007':'Emergency Shelter Bunker','FE-008':'Forward Observation Route',
      'FE-009':'Quarantine Response Lab','FE-010':'Research Data Backup Array','FE-011':'B3 Lower Systems Upgrade','FE-012':'Independent Server Room',
      'FE-013':'Independent Communications Room','FE-014':'Emergency Generator Wing','FE-015':'Shielded Briefing Room','FE-016':'Armory Expansion'
    };
    var feName=function(fe){var view=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;return view?(view.name||fe.name):'';};
    if(locale==='en'){
      if(st.c<=15)lines.push({text:'Security Sector - breach risk [CRITICAL]',color:'red',blink:true});
      else if(st.c<=25)lines.push({text:'Security Sector - containment instability warning',color:'orange'});
      if(st.r<=15)lines.push({text:'Supply Depot - reserves depleted [CRITICAL]',color:'red',blink:true});
      else if(st.r<=30)lines.push({text:'Supply Depot - resource shortage warning',color:'orange'});
      if(st.t<=15)lines.push({text:'Personnel Cohesion - desertion risk',color:'red'});
      else if(st.t<=25)lines.push({text:'Personnel Cohesion - morale decline detected',color:'orange'});
      if(st.o<=30)lines.push({text:'Comms Layer - ORACLE relay unstable',color:'orange'});
      comp.forEach(function(feId){var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' - online',color:'green'})});
      appr.forEach(function(feId){if(comp.indexOf(feId)>=0)return;var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' - expansion pending',color:'gray'})});
      if(lines.length===0)lines.push({text:'All sectors operating normally',color:'green'});
    }else{
      if(typeof getFacilityStatusLines!=='function')return null;
      lines=getFacilityStatusLines(st,comp,appr)||[];
      if(!lines.length)return null;
    }
    return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionFacility',null,'[FACILITY STATUS]')),
      lines.map(function(line,i){
        return h('div',{key:'fac-'+i,style:{fontSize:11,lineHeight:1.6,color:cm[line.color]||'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:line.blink?'blink 1s infinite':'fadeIn 0.4s ease'}},'▸ '+line.text)
      })
    );
  })();
  return h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,padding:'20px 22px 16px',cursor:'default',marginTop:'auto',marginBottom:'auto',display:'flex',flexDirection:'column',maxHeight:'calc(100vh - 60px)',overflow:'hidden'}},
    h('div',{className:'oracle-card__glow'}),
    h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:1}},tt('news.header',null,'[ORACLE // DAILY REPORT]')),
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.5)',letterSpacing:1}},'ACT '+act)),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',fontWeight:'bold',marginBottom:10,letterSpacing:1,borderBottom:'1px solid rgba(var(--ui-rgb),.15)',paddingBottom:8,flexShrink:0}},tt('news.dayReport',{day:(p.day||'?')},'DAY '+(p.day||'?')+' REPORT')),
    h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionStatus',null,'[STATUS OVERVIEW]')),
        h('div',{style:{display:'flex',flexDirection:'column',gap:5}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'Containment')),
          statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'Resources')),
          statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'Trust')),
          statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'Evaluation'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionSituation',null,'[SITUATION REPORT]')),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('⚠')>=0;
            return h('div',{key:'sit-'+i,style:{fontSize:11,lineHeight:1.6,color:isWarn?'#ff8844':'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:'fadeIn 0.4s ease'}},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionIntel',null,'[INTEL BRIEFING]')),
      p.headlines.slice(0,shown).map(function(l,i){
        var hl=parseHL(l);
        return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)',animation:'fadeIn 0.4s ease'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
          h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'var(--ui-text)'}},hl.text))
      }),
      shown>=p.headlines.length&&facilitySection),
    shown>=p.headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ PROCEED TO NEXT CYCLE ]'))));
}
function NewsReport3(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  useEffect(function(){if(shown<p.headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,p.headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=p.headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,p.headlines.length]);
  var resolveNewsView=function(raw){
    if(locale!=='en')return null;
    var s=String(raw||'');
    if(typeof tc==='function'){
      var direct=tc('newsItems',s,null);
      if(direct&&direct.text)return direct;
    }
    var bucket=window.TS_I18N&&window.TS_I18N.content&&window.TS_I18N.content.en&&window.TS_I18N.content.en.newsItems;
    if(!bucket||typeof NP==='undefined')return null;
    var sourceList=[];
    ['gc','bc','br','w','p','gl','dg','md'].forEach(function(key){
      if(Array.isArray(NP[key]))sourceList=sourceList.concat(NP[key]);
    });
    var translatedList=Object.keys(bucket).map(function(key){return bucket[key]});
    var mapIdx=sourceList.indexOf(s);
    return mapIdx>=0?translatedList[mapIdx]||null:null;
  };
  var parseHL=function(raw){
    var s=String(raw||'');
    var view=resolveNewsView(s);
    var body=view&&view.text?view.text:s;
    var type=view&&view.type?view.type:null;
    var isGl=type==='redacted'||s.indexOf('분류 오류')>=0||s.indexOf('[삭제됨]')>=0;
    if(isGl)return{tag:'REDACTED',text:body,gl:true};
    if(type==='foreign'||s.indexOf('[해외]')===0||s.indexOf('[OVERSEAS]')===0){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:body.replace('[해외] ','').replace('[OVERSEAS] ',''),gl:false}};
    if(type==='domestic'||s.indexOf('[국내]')===0||s.indexOf('[DOMESTIC]')===0){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:body.replace('[국내] ','').replace('[DOMESTIC] ',''),gl:false}};
    return{tag:'INTEL-01',text:body,gl:false};
  };
  var st=p.stats||{};var gi=p.gi||0;var act=p.act||1;
  var AP={
    h:[tt('news.assess.high1',null,'Operational efficiency stable. Maintain current directive.'),tt('news.assess.high2',null,'High compliance with ORACLE advisories. Korea Branch performance remains above average.'),tt('news.assess.high3',null,'Commander trust index elevated. Expanded authority under review.'),tt('news.assess.high4',null,'Branch stability reconfirmed. Additional clearance being considered.')],
    m:[tt('news.assess.mid1',null,'Operations stable. Minor nonstandard signals detected.'),tt('news.assess.mid2',null,'Overall conditions nominal. Decision variance among personnel has slightly increased.'),tt('news.assess.mid3',null,'Branch remains within normal bounds. Select indicators under observation.'),tt('news.assess.mid4',null,'Average ORACLE compliance rate. Continued monitoring advised.')],
    l:[tt('news.assess.low1',null,'Nonstandard decision frequency increasing. Monitoring intensified.'),tt('news.assess.low2',null,'Independent command patterns detected. Analysis ongoing.'),tt('news.assess.low3',null,'Repeated deviation from ORACLE advisories logged.'),tt('news.assess.low4',null,'Several nonstandard operational markers identified in branch telemetry.')],
    v:[tt('news.assess.veryLow1',null,'Multiple abnormal operational patterns detected. Caution advised.'),tt('news.assess.veryLow2',null,'Commander trust index declining. Reassessment pending.'),tt('news.assess.veryLow3',null,'ORACLE advisory override frequency entering risk threshold.'),tt('news.assess.veryLow4',null,'Operational anomaly detected. Headquarters review under consideration.')]
  };
  var aPool=gi>=40?AP.h:gi>=10?AP.m:gi>=0?AP.l:AP.v;
  var assess=aPool[Math.floor(Math.random()*aPool.length)];
  var statBar=function(k,v,nm){
    var d=v<=20;
    return h('div',{key:k,style:{display:'grid',gridTemplateColumns:'96px minmax(0,1fr) 32px',alignItems:'center',columnGap:10,fontFamily:"'Share Tech Mono',monospace",fontSize:10,lineHeight:1.2}},
      h('span',{style:{color:'rgba(var(--ui-rgb),.72)',minWidth:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',paddingRight:2}},nm),
      h('div',{style:{minWidth:0,height:4,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}},
        h('div',{style:{height:'100%',width:v+'%',background:d?'rgba(255,68,68,.6)':'rgba(var(--ui-rgb),.4)',borderRadius:2,transition:'width 0.4s'}})),
      h('span',{style:{color:d?'#ff4444':'rgba(var(--ui-rgb),.78)',width:32,textAlign:'right',fontSize:9}},v)
    );
  };
  var facilitySection=(function(){
    var fac=p.facility||{},comp=fac.completed||[],appr=fac.approved||[],lines=[];
    var cm={red:'#ff4444',orange:'#f0a030',green:'var(--ui)',gray:'rgba(var(--ui-rgb),.4)'};
    var feNameMapEn={
      'FE-001':'Cryostorage Expansion','FE-002':'Outdoor Training Yard','FE-003':'High-Sensitivity Sensor Array','FE-004':'Medical Wing Expansion',
      'FE-005':'Secondary Supply Route','FE-006':'CCTV Grid Replacement','FE-007':'Emergency Shelter Bunker','FE-008':'Forward Observation Route',
      'FE-009':'Quarantine Response Lab','FE-010':'Research Data Backup Array','FE-011':'B3 Lower Systems Upgrade','FE-012':'Independent Server Room',
      'FE-013':'Independent Communications Room','FE-014':'Emergency Generator Wing','FE-015':'Shielded Briefing Room','FE-016':'Armory Expansion'
    };
    var feName=function(fe){var view=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;return view?(view.name||fe.name):'';};
    if(locale==='en'){
      if(st.c<=15)lines.push({text:'Security Sector - breach risk [CRITICAL]',color:'red',blink:true});
      else if(st.c<=25)lines.push({text:'Security Sector - containment instability warning',color:'orange'});
      if(st.r<=15)lines.push({text:'Supply Depot - reserves depleted [CRITICAL]',color:'red',blink:true});
      else if(st.r<=30)lines.push({text:'Supply Depot - resource shortage warning',color:'orange'});
      if(st.t<=15)lines.push({text:'Personnel Cohesion - desertion risk',color:'red'});
      else if(st.t<=25)lines.push({text:'Personnel Cohesion - morale decline detected',color:'orange'});
      if(st.o<=30)lines.push({text:'Comms Layer - ORACLE relay unstable',color:'orange'});
      comp.forEach(function(feId){var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' - online',color:'green'})});
      appr.forEach(function(feId){if(comp.indexOf(feId)>=0)return;var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' - expansion pending',color:'gray'})});
      if(lines.length===0)lines.push({text:'All sectors operating normally',color:'green'});
    }else{
      if(typeof getFacilityStatusLines!=='function')return null;
      lines=getFacilityStatusLines(st,comp,appr)||[];
      if(!lines.length)return null;
    }
    return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionFacility',null,'[FACILITY STATUS]')),
      lines.map(function(line,i){
        return h('div',{key:'fac-'+i,style:{fontSize:11,lineHeight:1.6,color:cm[line.color]||'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:line.blink?'blink 1s infinite':'fadeIn 0.4s ease'}},'• '+line.text)
      })
    );
  })();
  return h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,padding:'20px 22px 16px',cursor:'default',marginTop:'auto',marginBottom:'auto',display:'flex',flexDirection:'column',maxHeight:'calc(100vh - 60px)',overflow:'hidden'}},
    h('div',{className:'oracle-card__glow'}),
    h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:1}},tt('news.header',null,'[ORACLE // DAILY REPORT]')),
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.5)',letterSpacing:1}},'ACT '+act)),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',fontWeight:'bold',marginBottom:10,letterSpacing:1,borderBottom:'1px solid rgba(var(--ui-rgb),.15)',paddingBottom:8,flexShrink:0}},tt('news.dayReport',{day:(p.day||'?')},'DAY '+(p.day||'?')+' REPORT')),
    h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionStatus',null,'[STATUS OVERVIEW]')),
        h('div',{style:{display:'flex',flexDirection:'column',gap:6}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'Containment')),
          statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'Resources')),
          statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'Trust')),
          statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'Evaluation'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionSituation',null,'[SITUATION REPORT]')),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('경고')>=0||line.indexOf('warning')>=0||line.indexOf('CRITICAL')>=0;
            return h('div',{key:'sit-'+i,style:{fontSize:11,lineHeight:1.6,color:isWarn?'#ff8844':'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:'fadeIn 0.4s ease'}},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:6}},tt('news.sectionIntel',null,'[INTEL BRIEFING]')),
      p.headlines.slice(0,shown).map(function(l,i){
        var hl=parseHL(l);
        return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.08)',animation:'fadeIn 0.4s ease'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
          h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'var(--ui-text)'}},hl.text))
      }),
      shown>=p.headlines.length&&facilitySection),
    shown>=p.headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ PROCEED TO NEXT CYCLE ]'))));
}
function GameOver(p){
  useEffect(function(){var onKey=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();p.onRestart()}else if(e.key==='2'||e.code==='Numpad2'){if(p.canNgPlus){e.preventDefault();p.onNewGamePlus()}}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[]);
  var msg=p.gi>50?tt('gameOver.msgHigh',null,"요원의 헌신적 복무에 감사드립니다."):p.gi>25?tt('gameOver.msgMid',null,"세션이 종료됩니다. 결과가 기록되었습니다."):tt('gameOver.msgLow',null,"비표준 운영 패턴 감지. 세션 데이터 분석 중...");
  var narr=p.endNarr;
  var imgStyle={width:'100%',maxWidth:420,borderRadius:8,marginBottom:16,opacity:0.9};
  var btns=h('div',{style:{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'center',gap:10,paddingBottom:20}},
    h('button',{className:'btn btn-amber',onClick:p.onRestart},tt('gameOver.restart',null,'[ 세션 재개시 — ACT 1 ]')),
    p.canNgPlus&&h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0,borderColor:'#c080ff',color:'#c080ff'},onClick:p.onNewGamePlus},tt('gameOver.ngPlus',null,'[ NEW GAME+ — 강화 시작 ]')),
    h('div',{style:{display:'flex',gap:10}},h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onLogs},tt('gameOver.logs',null,'기록')),h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onArchive},tt('gameOver.archive',null,'아카이브')),h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onEndings},tt('gameOver.endings',null,'엔딩'))));
  if(narr&&narr.narrative){var eImg=p.endId?IMG['ending_'+p.endId]:null;return h('div',{className:'boot',style:{justifyContent:'flex-start',paddingTop:20,overflowY:'auto'}},eImg&&h('img',{src:eImg,alt:narr.name,style:imgStyle}),h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:12,flexShrink:0}},'ENDING: '+narr.name),h('div',{style:{fontSize:13,lineHeight:2,maxWidth:420,width:'100%',padding:'0 8px'}},narr.narrative.map(function(l,i){var isCmd=l.indexOf('>')===0||l.indexOf('[')===0;var isEmpty=l==='';return h('div',{key:i,style:{color:isCmd?'#f0a030':isEmpty?'transparent':'var(--ui)',fontFamily:isCmd?"'Share Tech Mono',monospace":'inherit',fontWeight:isCmd?'bold':'normal',minHeight:isEmpty?10:'auto',whiteSpace:'pre-wrap',textAlign:'left'}},isEmpty?'\u00A0':l)})),btns)}
  var eid=p.endId||'',rsn=p.reason||'',goImg=null;
  if(eid.indexOf('C_c')===0||/봉쇄|Containment/i.test(rsn))goImg=IMG.ending_C_c;
  else if(eid==='C_r'||/자원|Resource/i.test(rsn))goImg=IMG.ending_C_r;
  else if(eid==='C_t'||/신뢰|Trust/i.test(rsn))goImg=IMG.ending_C_t;
  else if(eid==='C_o'||/평가|접속|Evaluation|ORACLE access/i.test(rsn))goImg=IMG.ending_C_o;
  return h('div',{className:'boot',style:{overflowY:'auto'}},goImg&&h('img',{src:goImg,alt:'Game Over',style:imgStyle}),h('div',{style:{fontSize:13,lineHeight:1.9,maxWidth:420,width:'100%',textAlign:'center'}},h('div',{className:'go-title'},tt('gameOver.title',{session:p.sessions+1},'─── SESSION #'+(p.sessions+1)+' TERMINATED ───')),h('div',{className:'go-reason'},p.reason),h('div',{className:'go-section'},tt('gameOver.reportSection',null,'── ORACLE 최종 보고 ──')),h('div',{className:'go-stat'},tt('gameOver.duration',{days:p.stats.day},'운영 기간: '+p.stats.day+'일')),h('div',{className:'go-stat'},tt('gameOver.stats',{c:p.stats.c,r:p.stats.r,t:p.stats.t,o:p.stats.o},'봉쇄: '+p.stats.c+' | 자원: '+p.stats.r+' | 신뢰: '+p.stats.t+' | 평가: '+p.stats.o)),h('div',{className:'go-msg'},'"'+msg+'"'),h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#33cccc',marginTop:12,letterSpacing:1}},tt('gameOver.grant',null,'GRANT: ACTIVE — RENEWAL AVAILABLE'))),btns);
}
function Tutorial(p){
  var s1=useState(0),step=s1[0],setStep=s1[1];
  var koSteps=[
    {lines:["ORACLE 인사 프로토콜을 개시합니다.","","환영합니다, PILEHEAD.","","당신은 ORACLE Proxy Network","한국 지부의 초대 지휘관으로 발령되었습니다.","","[검열됨] 전, 미지의 바이러스 EV-Σ가 출현했습니다.","감염체는 이변체로 변이하며,","전 세계 주요 도시가 봉쇄 중입니다."],choices:[{label:"계속",next:1}]},
    {lines:["[임무 브리핑]","","ORACLE은 프로메테우스를","적대 세력으로 분류하고 있습니다.","","당신의 임무:","▸ 봉쇄 구역 관리 및 이변체 대응","▸ 기지 운영 총괄","▸ ORACLE 지시 이행 및 외부 위협 감시","","간부진 4명이 당신을 보좌합니다."],choices:[{label:"계속",next:2}]},
    {lines:["4가지 핵심 지표를 관리합니다.","","{{icon-c}} 봉쇄 — 봉쇄선 유지도","{{icon-r}} 자원 — 식량, 의약품, 장비","{{icon-t}} 신뢰 — 기지 인원의 신뢰도","{{icon-o}} 평가 — ORACLE의 당신에 대한 평가","","어느 지표든 0이 되면 임무에 실패합니다.","","← 왼쪽 / 오른쪽 →","카드를 밀어 선택하십시오."],choices:[{label:"게임 시작",next:-1}]}
  ];
  var i18nSteps=(typeof t==='function')?t('tutorial.steps'):null;
  var steps=(i18nSteps&&Array.isArray(i18nSteps))?i18nSteps:koSteps;
  var uiC=getComputedStyle(document.documentElement).getPropertyValue('--ui').trim()||'#33ff33';
  var koHL=[['PILEHEAD','#f0a030'],['ORACLE',uiC],['EV-\u03A3','#33cccc'],['이변체','#33cccc'],['프로메테우스','#ff6644'],['[검열됨]','#ff4444'],['봉쇄선',uiC],['봉쇄',uiC],['자원',uiC],['신뢰도',uiC],['신뢰',uiC],['평가',uiC]];
  var i18nHL=(typeof t==='function')?t('tutorial.highlights'):null;
  var enHL=(i18nHL&&Array.isArray(i18nHL))?i18nHL.map(function(w){var cm={'PILEHEAD':'#f0a030','ORACLE':uiC,'EV-Σ':'#33cccc','PROMETHEUS':'#ff6644','[REDACTED]':'#ff4444','Containment':uiC,'Resources':uiC,'Trust':uiC,'Evaluation':uiC};return[w,cm[w]||uiC]}):null;
  var HL=enHL||koHL;
  var hilite=function(txt){var ICON_MAP={'{{icon-c}}':'stat-icon-inline-c','{{icon-r}}':'stat-icon-inline-r','{{icon-t}}':'stat-icon-inline-t','{{icon-o}}':'stat-icon-inline-o'};var result=[];var s=txt;var ik;for(ik in ICON_MAP){while(s.indexOf(ik)>=0){var idx=s.indexOf(ik);if(idx>0)result.push(s.substring(0,idx));result.push(h('span',{key:'ic'+result.length,className:'stat-icon-inline '+ICON_MAP[ik]}));s=s.substring(idx+ik.length)}}if(result.length>0){if(s.length>0)result.push(s);txt=result}var inp=typeof txt==='string'?txt:null;if(!inp)return txt;var parts=[{t:inp,c:null}];HL.forEach(function(pair){var nw=[];parts.forEach(function(p){if(p.c){nw.push(p);return}var s=p.t,k=pair[0],idx=s.indexOf(k);while(idx>=0){if(idx>0)nw.push({t:s.substring(0,idx),c:null});nw.push({t:k,c:pair[1]});s=s.substring(idx+k.length);idx=s.indexOf(k)}if(s.length>0)nw.push({t:s,c:null})});parts=nw});return parts.map(function(p,i){return p.c?h('span',{key:i,style:{color:p.c,fontWeight:'bold',textShadow:'0 0 6px '+p.c+'44'}},p.t):p.t})};
  var st=steps[step];var s2=useState(0),shown=s2[0],setShown=s2[1];var s3=useState(false),bv=s3[0],setBv=s3[1];
  useEffect(function(){setShown(0);setBv(false)},[step]);
  useEffect(function(){if(shown<st.lines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},st.lines[shown]===''?150:80);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setBv(true)},400);return function(){clearTimeout(t2)}}},[shown,step]);
  useEffect(function(){var onKey=function(e){if(!bv)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();var c=st.choices[0];if(c){if(c.next===-1)p.onDone();else setStep(c.next)}}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[bv,step]);
  return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'24px 0',flex:1,display:'flex',flexDirection:'column'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',textAlign:'center',marginBottom:12,letterSpacing:2}},'ORACLE BRIEFING — '+(step+1)+'/'+steps.length),h('div',{style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',overflowY:'auto',minHeight:0}},st.lines.slice(0,shown).map(function(l,i){var txt=String(l||' ');var isHeader=txt.indexOf('[')===0;var isIcon=txt.indexOf('{{icon-')>=0;var isList=txt.indexOf('▸')===0;var isLeft=txt.indexOf('←')===0&&txt.indexOf('→')<0;var isRight=txt.indexOf('→')===0;var isBothArrow=txt.indexOf('←')>=0&&txt.indexOf('→')>=0;var isCtrl=isLeft||isRight||isBothArrow;var col=isHeader?'#f0a030':isIcon?'#f0a030':isList?uiC:isCtrl?uiC:'#ccddcc';var sz=isHeader?12:isIcon?13:14;var al=isLeft?'left':isRight?'right':'center';return h('div',{key:step+'-'+i,style:{fontSize:sz,lineHeight:1.7,color:col,textAlign:al,fontFamily:(isHeader||isCtrl)?"'Share Tech Mono',monospace":'inherit',letterSpacing:isHeader?1:0,padding:isCtrl?'0 40px':0,animation:'fadeIn 0.3s ease'}},hilite(txt))})),bv&&h('div',{style:{display:'flex',flexDirection:'column',gap:10,alignItems:'center',paddingBottom:20,flexShrink:0}},st.choices.map(function(c,i){return h('button',{key:i,className:'btn btn-amber',onClick:function(){if(c.next===-1)p.onDone();else setStep(c.next)}},c.label)}),p.canSkip&&step===0&&h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0,opacity:0.5},onClick:p.onSkip},tt('tutorial.skip',null,'[ 튜토리얼 건너뛰기 ]')))));
}
function RewardScreen(p){
  var SN={c:tt('reward.c',null,'봉쇄'),r:tt('reward.r',null,'자원'),t:tt('reward.t',null,'신뢰'),o:tt('reward.o',null,'평가')};
  var count=4;if(p.stats.c<30||p.stats.r<30||p.stats.t<30||p.stats.o<30)count=3;if(p.stats.c<20||p.stats.r<20||p.stats.t<20||p.stats.o<20)count=2;if(p.stats.c<10||p.stats.r<10||p.stats.t<10||p.stats.o<10)count=1;
  var _scrollRef=useRef(null);
  var _sc=useState({top:false,bottom:false}),scrollHint=_sc[0],setScrollHint=_sc[1];
  var checkScroll=function(){var el=_scrollRef.current;if(!el)return;var st=el.scrollTop>4;var sb=el.scrollTop+el.clientHeight<el.scrollHeight-4;setScrollHint({top:st,bottom:sb})};
  useEffect(function(){var el=_scrollRef.current;if(!el)return;var t=setTimeout(checkScroll,100);el.addEventListener('scroll',checkScroll);return function(){clearTimeout(t);el.removeEventListener('scroll',checkScroll)}},[]);
  var s0=useState(function(){
    // 기본 풀 + 시설 완료 보너스 합산 후 랜덤 추출
    var basePool=REWARDS.slice();
    if(p.facility&&typeof REWARDS_FACILITY_BONUS!=='undefined'){var fac=p.facility;REWARDS_FACILITY_BONUS.forEach(function(r){if(fac.completed.indexOf(r.feReq)>=0)basePool.push(r)})}
    var pool=pickN(basePool,count);
    // 시설 확장 리워드 삽입 (승인됨 & 미완료, 1회성)
    if(p.facility&&typeof FACILITY_EXPANSIONS!=='undefined'){
      var fac=p.facility;var feRewards=[];
      fac.approved.forEach(function(feId){
        if(fac.completed.indexOf(feId)>=0)return;
        var fe=FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0];
        if(fe){var feView=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;feRewards.push({id:'R-'+fe.id,feId:fe.id,title:feView.rewardTitle,desc:feView.rewardDesc,benefit:feView.rewardBenefit,cost:feView.rewardCost,fx:fe.rewardFx})}});
      if(feRewards.length>0){pool=pool.slice(0,Math.max(1,count-feRewards.length)).concat(feRewards.slice(0,count))}
    }
    return pool;
  }),av=s0[0];var s1=useState(-1),sel=s1[0],setSel=s1[1];
  useEffect(function(){var onKey=function(e){
    var idx=-1;
    if(/^[1-9]$/.test(e.key))idx=parseInt(e.key,10)-1;
    else if(e.code&&/^Numpad[1-9]$/.test(e.code))idx=parseInt(e.code.slice(6),10)-1;
    else if(e.key==='ArrowDown'){e.preventDefault();setSel(function(v){var nv=v<av.length-1?v+1:0;setTimeout(function(){var el=document.querySelector('.oracle-card.is-selected');if(el)el.scrollIntoView({block:'nearest',behavior:'smooth'})},50);return nv});return}
    else if(e.key==='ArrowUp'){e.preventDefault();setSel(function(v){var nv=v>0?v-1:av.length-1;setTimeout(function(){var el=document.querySelector('.oracle-card.is-selected');if(el)el.scrollIntoView({block:'nearest',behavior:'smooth'})},50);return nv});return}
    if(idx>=0&&idx<av.length){e.preventDefault();setSel(idx);return}
    if((e.key==='Enter'||e.key===' ')&&sel>=0&&av[sel]){e.preventDefault();p.onPick(av[sel])}
  };window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[av,sel]);
  var dangerC=av.some(function(r){return p.stats.c+(r.fx.c||0)*5>=100});
  var fxList=function(fx){var pos=[],neg=[];['c','r','t','o'].forEach(function(k){var v=(fx[k]||0)*5;if(v>0)pos.push({k:k,v:v});if(v<0)neg.push({k:k,v:v})});return{pos:pos,neg:neg}};
  var miniBar=function(fx){return h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:4,marginTop:8}},
    ['c','r','t','o'].map(function(k){var cur=p.stats[k];var chg=(fx[k]||0)*5;var nxt=Math.max(0,Math.min(100,cur+chg));var isPos=chg>0;var isNeg=chg<0;
      return h('div',{key:k,style:{fontSize:9,fontFamily:"'Share Tech Mono',monospace"}},
        h('div',{style:{color:'rgba(var(--ui-rgb),.5)',marginBottom:2,textAlign:'center'}},SN[k]),
        h('div',{style:{height:4,background:'rgba(255,255,255,.06)',position:'relative',overflow:'hidden'}},
          h('div',{style:{position:'absolute',left:0,top:0,height:'100%',width:cur+'%',background:'rgba(var(--ui-rgb),.15)'}}),
          isPos&&h('div',{style:{position:'absolute',left:cur+'%',top:0,height:'100%',width:chg+'%',background:'rgba(var(--ui-rgb),.6)',boxShadow:'0 0 4px rgba(var(--ui-rgb),.4)'}}),
          isNeg&&h('div',{style:{position:'absolute',left:nxt+'%',top:0,height:'100%',width:Math.abs(chg)+'%',background:'rgba(255,100,68,.6)',boxShadow:'0 0 4px rgba(255,100,68,.4)'}})),
        h('div',{style:{textAlign:'center',marginTop:1,color:isPos?'var(--ui)':isNeg?'rgba(255,141,97,.9)':'rgba(var(--ui-rgb),.3)',fontSize:8}},chg!==0?(isPos?'+':'')+chg:'·')
      )}))};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // RESOURCE DIRECTIVE')),
    h('div',{style:{width:'100%',maxWidth:440,display:'flex',justifyContent:'center',gap:12,margin:'4px 0',flexShrink:0,flexWrap:'wrap'}},
      ['c','r','t','o'].map(function(k){var v=p.stats[k];var nm={c:tt('stats.c',null,'봉쇄'),r:tt('stats.r',null,'자원'),t:tt('stats.t',null,'신뢰'),o:tt('stats.o',null,'평가')};var d=v<=20;return h('span',{key:k,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:d?'#ff4444':'rgba(var(--ui-rgb),.7)',letterSpacing:1}},nm[k]+':'+v)})),
    h('div',{style:{fontSize:13,color:'var(--ui-text)',textAlign:'center',margin:'4px 0 8px'}},tt('reward.pickCount',{count:count},count+'개 중 선택')),
    dangerC&&h('div',{style:{background:'rgba(var(--ui-rgb),.05)',border:'1px solid rgba(var(--ui-rgb),.22)',borderRadius:3,padding:'8px 12px',margin:'0 0 8px',maxWidth:440,width:'100%',fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.8)',letterSpacing:.5,lineHeight:1.7,boxSizing:'border-box'}},
      h('div',{style:{color:'rgba(var(--ui-rgb),.4)',fontSize:9,marginBottom:4,letterSpacing:1}},tt('news.headlineAlert',null,'[ ORACLE // 운영 상태 경보 ]')),
      h('div',null,tt('news.headlineWarn1',null,'KR-INIT-001 봉쇄 완전성 임계 도달 예측.')),
      h('div',null,tt('news.headlineWarn2',null,'한국지부 안정화 100% — 임시 운영 권한 자동 만료 절차 개시.')),
      h('div',{style:{marginTop:5,color:'rgba(var(--ui-rgb),.4)',fontSize:9}},tt('news.headlineWarn3',null,'GRANT EXPIRED 절차 준비 중. 선택에 유의하십시오.'))
    ),
    h('div',{style:{flex:1,width:'100%',maxWidth:440,position:'relative',minHeight:0}},
      scrollHint.top&&h('div',{style:{position:'absolute',top:0,left:0,right:0,zIndex:3,textAlign:'center',pointerEvents:'none',animation:'scrollArrowBlink 1.2s ease-in-out infinite'}},
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'var(--ui)',textShadow:'0 0 8px var(--ui)',letterSpacing:4}},'▲  ▲  ▲')),
      scrollHint.bottom&&h('div',{style:{position:'absolute',bottom:0,left:0,right:0,zIndex:3,textAlign:'center',pointerEvents:'none',animation:'scrollArrowBlink 1.2s ease-in-out infinite'}},
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'var(--ui)',textShadow:'0 0 8px var(--ui)',letterSpacing:4}},'▼  ▼  ▼')),
      h('div',{ref:_scrollRef,style:{height:'100%',overflowY:'auto',padding:'0 2px'}},
      av.map(function(r,i){var fl=fxList(r.fx);var isSel=sel===i;var willEnd=p.stats.c+(r.fx.c||0)*5>=100;var rLoc=(typeof tc==='function')?tc('rewards',r.id,null):null;var rTitle=(rLoc&&rLoc.title)||r.title;var rDesc=(rLoc&&rLoc.desc)||r.desc;return h('div',{key:r.id,className:'oracle-card'+(isSel?' is-selected':''),onClick:function(){setSel(i)}},
        h('div',{className:'oracle-card__glow'}),
        h('span',{className:'oracle-card__tag'},'OPTION 0'+(i+1)),
        h('div',{className:'oracle-card__title'},rTitle),
        h('div',{className:'oracle-card__desc'},rDesc),
        h('div',{className:'oracle-card__effects'},
          fl.pos.map(function(e){var arrow=Math.abs(e.v)>=10?'▲▲':'▲';return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--pos'},arrow+' '+SN[e.k]+' +'+e.v)}),
          fl.neg.map(function(e){var arrow=Math.abs(e.v)>=10?'▼▼':'▼';return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--neg'},arrow+' '+SN[e.k]+' '+e.v)})
        ),
        miniBar(r.fx),
        isSel&&h('button',{className:'oracle-card__execute',onClick:function(e){e.stopPropagation();p.onPick(r)}},'— EXECUTE —')
      )}))
    ),
    h('div',{className:'footer-frame'},h('span',null,'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'))
  );
}
