// TERMINAL SESSION — components-game.js
// Boot, Stats, CardC, News, GameOver, Tutorial, RewardScreen
var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,useCallback=React.useCallback;
// i18n 헬퍼: tt(path, params, fallback) — t() 없으면 폴백 반환
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
// 미니맵 idle 앰비언트 텔레메트리 — ORACLE 감시 HUD가 보고할 법한 겨울/센서 readout 풀.
// 그림이 아니라 데이터를 순환시켜 몰입을 해치지 않으면서 화면을 살린다(겨울 통일 설정과 직결).
function buildMapTelemetry(day,isKo){
  day=day||1;
  var snow=18+((day*7)%34), temp=9+((day*5)%11), wind=6+((day*3)%7), nodes=20-(day%4), wild=1+(day%4);
  return [
    {t:isKo?('적설 '+snow+'cm · 한파주의보'):('Snow '+snow+'cm · cold-wave alert')},
    {t:isKo?('기온 -'+temp+'°C · 노면 결빙'):('Temp -'+temp+'°C · road icing')},
    {t:isKo?('봉쇄선 풍속 '+wind+'m/s'):('Perimeter wind '+wind+'m/s')},
    {t:isKo?('센서 노드 '+nodes+'/20 온라인'):('Sensor nodes '+nodes+'/20 online')},
    {t:isKo?'위성 패스 동기화 정상':'Satellite pass nominal'},
    {t:isKo?'외곽 순찰 — 이상 없음':'Outer patrol — all clear'},
    {t:isKo?('야생 개체 추적 '+wild+' · 비위협'):('Wildlife tracked '+wild+' · non-threat'),sighting:true}
  ];
}
function uniqueHeadlines(headlines){
  var out=[];
  (headlines||[]).forEach(function(item){if(item&&out.indexOf(item)<0)out.push(item)});
  return out;
}
function stablePickFromPool(pool,seed){
  if(!Array.isArray(pool)||pool.length===0)return '';
  var s=String(seed||''),hash=0;
  for(var i=0;i<s.length;i++)hash=((hash*31)+s.charCodeAt(i))&0x7fffffff;
  return pool[hash%pool.length];
}

var REWARD_RECENT_KEY='ts_recentRewards';
var REWARD_RECENT_LIMIT=6;
function rewardMemoryId(r){return r&&(r.id||r.feId||r.title||r.desc)||''}
function getRecentRewardIds(){
  try{var d=localStorage.getItem(REWARD_RECENT_KEY);var parsed=d?JSON.parse(d):[];return Array.isArray(parsed)?parsed:[]}catch(e){return[]}
}
function rememberRewardId(id){
  if(!id)return;
  try{
    var recent=getRecentRewardIds().filter(function(v){return v!==id});
    recent.push(id);
    localStorage.setItem(REWARD_RECENT_KEY,JSON.stringify(recent.slice(-REWARD_RECENT_LIMIT)));
  }catch(e){}
}
function pickRewardsUnique(pool,count){
  pool=Array.isArray(pool)?pool:[];
  var recent=getRecentRewardIds();
  var byRecent=function(a,b){var ar=recent.indexOf(rewardMemoryId(a))>=0,br=recent.indexOf(rewardMemoryId(b))>=0;return ar===br?0:(ar?1:-1)};
  // 스탯 다양성 캡: 같은 스탯을 (+)부스트하는 보상이 과반(기본 2)을 넘지 않게 해
  // 보상 4장이 전부 한 스탯(예: 봉쇄)으로 쏠리는 '도배'를 방지한다.
  var statCap=Math.max(2,Math.ceil(count/2));
  var pass=function(shuffled,enforce){
    var picked=[],seen={},pos={c:0,r:0,t:0,o:0};
    for(var i=0;i<shuffled.length&&picked.length<count;i++){
      var r=shuffled[i],id=rewardMemoryId(r),fx=(r&&r.fx)||{};
      if(id&&seen[id])continue;
      if(enforce){
        var over=((fx.c||0)>0&&pos.c>=statCap)||((fx.r||0)>0&&pos.r>=statCap)||((fx.t||0)>0&&pos.t>=statCap)||((fx.o||0)>0&&pos.o>=statCap);
        if(over)continue;
      }
      if(id)seen[id]=true;
      picked.push(r);
      if((fx.c||0)>0)pos.c++; if((fx.r||0)>0)pos.r++; if((fx.t||0)>0)pos.t++; if((fx.o||0)>0)pos.o++;
    }
    return picked;
  };
  // 캡을 만족하는 4장 조합을 재셔플로 최대 12회 시도 → 못 찾으면 완화(기존 동작, 미달 방지).
  var last=pickN(pool,pool.length).sort(byRecent);
  for(var att=0;att<12;att++){
    var sh=pickN(pool,pool.length).sort(byRecent);
    last=sh;
    var r=pass(sh,true);
    if(r.length>=count)return r;
  }
  return pass(last,false);
}

function Boot(p){
  var getBootLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};
  var _loc=useState(getBootLocale()),locale=_loc[0],setLocale=_loc[1];
  var linesInitial=tt('boot.linesInitial',null,null);
  var linesRepeat=tt('boot.linesRepeat',null,null);
  if(!Array.isArray(linesInitial))linesInitial=BOOT_LINES;
  if(!Array.isArray(linesRepeat))linesRepeat=BOOT_LINES_REPEAT;
  var BL=p.sessions>0?linesRepeat:linesInitial;
  var sn=p.sessions||0;
  var s=useState([]),lines=s[0],setLines=s[1];var s2=useState(false),done=s2[0],setDone=s2[1];var idx=useRef(0);
  var bootStarted=useRef(false);
  var audioUnlocked=useRef(false);
  var tryBootAudio=function(){if(!audioUnlocked.current&&p.onBoot){audioUnlocked.current=true;p.onBoot()}};
  var startTerminal=function(){if(!done)return;tryBootAudio();if(p.onDone)p.onDone()};
  var switchLocale=function(next){if(next===locale)return;tryBootAudio();if(window.TS_I18N&&window.TS_I18N.setLocale)window.TS_I18N.setLocale(next);setLocale(next)};
  useEffect(function(){idx.current=0;bootStarted.current=false;setLines([]);setDone(false);var t=setInterval(function(){if(idx.current<BL.length){if(!bootStarted.current){bootStarted.current=true;tryBootAudio()}setLines(function(p){return p.concat([BL[idx.current]])});idx.current++}else{clearInterval(t);setTimeout(function(){setDone(true)},800)}},280);return function(){clearInterval(t)}},[locale,p.sessions]);
  useEffect(function(){var handler=function(e){if(!done)return;if(e.key==='Enter'||e.key===' '||e.code==='Space'){e.preventDefault();startTerminal()}};window.addEventListener('keydown',handler);return function(){window.removeEventListener('keydown',handler)}},[done]);
  // 부트 스킵 — 개발/QA 편의 (?skipboot)
  useEffect(function(){try{if(/[?&]skipboot/.test(location.search)){if(p.onBoot)p.onBoot();if(p.onDone)p.onDone();}}catch(e){}},[]);
  var progress=Math.min(100,Math.round((lines.length/Math.max(1,BL.length))*100));
  var lineNodes=lines.map(function(l,i){
    var text=String(l||'');
    var hot=text.indexOf('OBSERVER')>=0||text.indexOf('TERMINAL SESSION')>=0||text.indexOf('터미널 세션')>=0||text.indexOf('SESSION')>=0||text.indexOf('세션')>=0;
    var grant=text.indexOf('GRANT')>=0||text.indexOf('권한')>=0||text.indexOf('WELCOME')>=0||text.indexOf('환영')>=0;
    return h('div',{key:i,className:'terminal-boot-line'+(hot?' is-hot':grant?' is-grant':'')},text);
  });
  return h('div',{className:'terminal-boot terminal-boot--emblem',onClick:tryBootAudio,onTouchStart:tryBootAudio},
    h('div',{className:'main-terminal-crt','aria-hidden':true}),
    IMG.title_screen&&h('div',{className:'tb-emblem-bgwrap','aria-hidden':true},h('img',{src:IMG.title_screen,alt:''})),
    h('main',{className:'tb-emblem-stage'+(done?' is-done':''),'aria-label':tt('boot.aria',null,'ORACLE terminal boot sequence')},
      h('div',{className:'tb-corner tb-corner-tl'},tt('boot.sessionId',null,tt('menu.sessionId',null,'SESSION ID: KR-B3-011'))),
      h('div',{className:'tb-corner tb-corner-tr'},
        h('div',{className:'terminal-boot-locale','aria-label':tt('boot.language',null,'Language')},
          ['ko','en'].map(function(l){return h('button',{key:l,type:'button',className:'terminal-boot-locale-btn'+(locale===l?' is-active':''),onClick:function(e){e.stopPropagation();switchLocale(l)}},l.toUpperCase())}))),
      h('div',{className:'tb-corner tb-corner-bl'},tt('boot.trace',null,'BOOT TRACE:'),' ',String(sn).padStart(2,'0')),
      h('div',{className:'tb-corner tb-corner-br'},tt('boot.feedVersion',null,tt('menu.feedVersion',null,'TERMINAL SESSION v1.11'))),
      h('div',{className:'tb-emblem'},
        IMG.logo_oracle_emblem
          ? h('img',{className:'tb-emblem-logo',src:IMG.logo_oracle_emblem,alt:'ORACLE — ANALYSIS · RESPONSE · DIRECTIVE'})
          : [h('svg',{key:'svg',className:'tb-emblem-mark',viewBox:'0 0 120 120','aria-hidden':true},
              h('circle',{cx:60,cy:60,r:44,className:'tb-e-circle'}),
              h('rect',{x:38.5,y:38.5,width:43,height:43,transform:'rotate(45 60 60)',className:'tb-e-diamond'}),
              h('line',{x1:4,y1:60,x2:28,y2:60,className:'tb-e-line'}),
              h('line',{x1:92,y1:60,x2:116,y2:60,className:'tb-e-line'}),
              h('circle',{cx:60,cy:60,r:5.5,className:'tb-e-core'})),
             h('div',{key:'wm',className:'tb-wordmark'},h('b',null,'ORACLE'),h('small',null,'KOREA BRANCH'))]),
      h('div',{className:'tb-lines','aria-label':tt('boot.console',null,'SYSTEM BOOT LOG')},lineNodes,!done&&h('span',{className:'terminal-boot-caret','aria-hidden':true},'█')),
      h('div',{className:'tb-progress','aria-hidden':true},h('i',{style:{width:progress+'%'}})),
      h('div',{className:'tb-progress-label'},tt('boot.progress',{progress:progress},'BOOT PROGRESS '+progress+'%')),
      done&&h('button',{type:'button',className:'tb-start',onClick:function(e){e.stopPropagation();startTerminal();}},tt('boot.startGame',null,'TAP TO ENTER TERMINAL'))));
}
// ═══ 메인 메뉴 ═══
function MainMenu(p){
  var getMenuLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};
  var _loc=useState(getMenuLocale()),locale=_loc[0],setLocale=_loc[1];
  var switchLocale=function(next){if(next===locale)return;if(window.TS_I18N&&window.TS_I18N.setLocale)window.TS_I18N.setLocale(next);setLocale(next)};
  var mono={fontFamily:"'Share Tech Mono',monospace"};
  var _sub=useState(null),sub=_sub[0],setSub=_sub[1];
  var _sel=useState(null),selectedIndex=_sel[0],setSelectedIndex=_sel[1];
  var _gl=useState(''),glitchKey=_gl[0],setGlitchKey=_gl[1];
  var _sp=useState(false),showSnapshotSelect=_sp[0],setShowSnapshotSelect=_sp[1];
  var _now=useState('02:41:11 KST'),nowText=_now[0],setNowText=_now[1];
  var fmtTime=function(date){
    try{
      var parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(date);
      var out={};parts.forEach(function(part){out[part.type]=part.value});
      return out.hour+':'+out.minute+':'+out.second+' KST';
    }catch(e){return '02:41:11 KST'}
  };
  useEffect(function(){
    setNowText(fmtTime(new Date()));
    var timer=setInterval(function(){setNowText(fmtTime(new Date()))},1000);
    return function(){clearInterval(timer)};
  },[]);
  var snapshotSlots=(typeof Save!=='undefined'&&Save.listSnapshots)?Save.listSnapshots():[];
  var manualSnapshotSlots=snapshotSlots.filter(function(s){return s&&s.data});
  var hasManualSnapshots=manualSnapshotSlots.length>0;
  var formatSnapshotTime=function(ts){
    if(!ts)return '';
    try{
      var parts=new Intl.DateTimeFormat(locale==='en'?'en-US':'ko-KR',{timeZone:'Asia/Seoul',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date(ts));
      var out={};parts.forEach(function(part){out[part.type]=part.value});
      return out.month+'/'+out.day+' '+out.hour+':'+out.minute+' KST';
    }catch(e){return ''}
  };
  var getSnapshotMeta=function(s){
    var d=s&&s.data||{};
    var g=d.game||{};
    var st=g.stats||{};
    var day=st.day||d.day||'?';
    var act=g.act||d.act||'?';
    return d.label||('DAY '+day+' / ACT '+act);
  };
  var loadSnapshotSlot=function(slot){
    setShowSnapshotSelect(false);
    if(p.onLoadSnap)p.onLoadSnap(slot);
  };
  var continueRoute=function(){
    if(hasManualSnapshots){setShowSnapshotSelect(true);return}
    if(p.onContinue)p.onContinue();
  };
  var menuItems=[];
  if(p.hasSave){
    menuItems.push({key:'continue',primary:true,icon:'resume',title:tt('menu.routes.continue.title',null,'[ 이어하기 ]'),sub:tt('menu.routes.continue.sub',null,'RESUME SAVED OPERATION'),action:tt('menu.routes.continue.action',null,'RESUME SESSION'),onClick:continueRoute});
    menuItems.push({key:'start',primary:false,icon:'command',title:tt('menu.routes.new.title',null,'[ 새 세션 시작 ]'),sub:tt('menu.routes.new.sub',null,'FIELD COMMAND SIMULATION'),action:tt('menu.routes.new.action',null,'NEW SESSION'),onClick:p.onPlay});
  }else{
    menuItems.push({key:'start',primary:true,icon:'command',title:tt('menu.routes.start.title',null,'[ 게임 시작 ]'),sub:tt('menu.routes.start.sub',null,'FIELD COMMAND SIMULATION'),action:tt('menu.routes.start.action',null,'ENTER SESSION'),onClick:p.onPlay});
  }
  menuItems.push(
    {key:'archive',primary:false,icon:'archive',title:tt('menu.routes.archive.title',null,'[ 아카이브 접속 ]'),sub:tt('menu.routes.archive.sub',null,'ENTITY / INCIDENT / PERSONNEL DATA'),action:tt('menu.routes.archive.action',null,'ACCESS ARCHIVE'),onClick:p.onArchive},
    {key:'logs',primary:false,icon:'log',title:tt('menu.routes.logs.title',null,'[ 기록 ]'),sub:tt('menu.routes.logs.sub',null,'PREVIOUS SESSION LOGS'),action:tt('menu.routes.logs.action',null,'VIEW LOGS'),onClick:p.onLogs}
  );
  // 미니게임 가이드 — 본편에서 모듈을 하나라도 마주친 뒤에만 노출 (헬퍼 부재 시 기존 동작 유지)
  if(typeof getSeenMinigames!=='function'||getSeenMinigames().length>0){
    menuItems.push({key:'miniguide',primary:false,icon:'command',title:tt('menu.routes.miniguide.title',null,'[ 미니게임 가이드 ]'),sub:tt('menu.routes.miniguide.sub',null,'FIELD MODULE PRACTICE'),action:tt('menu.routes.miniguide.action',null,'OPEN GUIDE'),onClick:p.onMiniGuide});
  }
  if(p.hasSessionHistory&&p.onEndings){
    menuItems.push({key:'endings',primary:false,icon:'archive',title:tt('menu.routes.endings.title',null,'[ 엔딩 ]'),sub:tt('menu.routes.endings.sub',null,'SESSION OUTCOME RECORDS'),action:tt('menu.routes.endings.action',null,'VIEW ENDINGS'),onClick:p.onEndings});
  }
  if(p.onAchievements){
    menuItems.push({key:'achievements',primary:false,icon:'command',title:tt('menu.routes.achievements.title',null,'[ 업적 ]'),sub:tt('menu.routes.achievements.sub',null,'ACHIEVEMENT RECORDS'),action:tt('menu.routes.achievements.action',null,'VIEW ACHIEVEMENTS'),onClick:p.onAchievements});
  }
  menuItems.push(
    {key:'settings',primary:false,icon:'settings',title:tt('menu.routes.settings.title',null,'[ 시스템 설정 ]'),sub:tt('menu.routes.settings.sub',null,'DISPLAY / AUDIO / LANGUAGE'),action:tt('menu.routes.settings.action',null,'SYSTEM CONFIG'),onClick:function(){setSub('settings')}}
  );
  var activate=function(item){
    setGlitchKey(item.key);
    setTimeout(function(){setGlitchKey('')},150);
    if(item.onClick)item.onClick();
  };
  useEffect(function(){
    var onKey=function(e){
      // 서브 뷰(설정 등)가 열려 있으면 메인메뉴 1-9/방향키 입력을 모두 무시.
      // SettingsPanel 등 하위 컴포넌트가 자체 키 처리를 한다.
      if(sub)return;
      if(showSnapshotSelect){
        if(e.key==='Escape'){e.preventDefault();setShowSnapshotSelect(false);return}
        if(/^[1-3]$/.test(e.key)){
          var slotNum=parseInt(e.key,10);
          var hit=manualSnapshotSlots.filter(function(s){return s.slot===slotNum})[0];
          if(hit){e.preventDefault();loadSnapshotSlot(hit.slot)}
        }
        return;
      }
      var n=-1;
      if(/^[1-9]$/.test(e.key))n=parseInt(e.key,10)-1;
      else if(e.code&&/^Numpad[1-9]$/.test(e.code))n=parseInt(e.code.slice(6),10)-1;
      if(n>=0&&n<menuItems.length){e.preventDefault();activate(menuItems[n]);return}
      if(e.key==='ArrowDown'){e.preventDefault();setSelectedIndex(function(v){return v===null?0:(v+1)%menuItems.length})}
      if(e.key==='ArrowUp'){e.preventDefault();setSelectedIndex(function(v){return v===null?menuItems.length-1:(v-1+menuItems.length)%menuItems.length})}
      if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(menuItems[selectedIndex===null?0:selectedIndex])}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[selectedIndex,menuItems.length,p.hasSave,showSnapshotSelect,manualSnapshotSlots.length,sub]);
  // 설정 서브뷰
  if(sub==='settings')return h('div',{className:'boot',style:{justifyContent:'flex-start',padding:'16px 0',overflowY:'auto'}},
    h(SettingsPanel,{onClose:function(){setSub(null)},onReset:p.onReset,onFullReset:p.onFullReset,
      onLogs:function(){setSub(null);p.onLogs()},onArchive:function(){setSub(null);p.onArchive()},
      onSaveSnap:p.onSaveSnap,onLoadSnap:p.onLoadSnap,onFxModeChange:p.onFxModeChange}));
  // 메인 메뉴
  return h('div',{className:'main-terminal-menu'},
    h('div',{className:'main-terminal-crt', 'aria-hidden':true}),
    h('main',{className:'main-terminal-frame','aria-label':'ORACLE Korea Branch terminal main menu'},
      h('header',{className:'main-terminal-header'},
        h('div',{className:'main-terminal-header-main'},
          h('span',{className:'main-terminal-header-title'},'ORACLE //'),
          h('div',{className:'main-terminal-header-tools'},
            h('span',{className:'main-terminal-header-time'},nowText))),
        h('div',{className:'main-terminal-header-status'},
          h('div',{className:'terminal-boot-locale main-terminal-locale main-terminal-locale--status','aria-label':tt('boot.language',null,'Language')},
            ['ko','en'].map(function(l){
              return h('button',{key:l,type:'button',className:'terminal-boot-locale-btn'+(locale===l?' is-active':''),onClick:function(e){e.stopPropagation();switchLocale(l)}},l.toUpperCase());
            })),
          h('span',{className:'main-terminal-status-left'},h('span',{className:'main-terminal-status-dot','aria-hidden':true}),h('span',null,tt('menu.statusLabel',null,'STATUS:')),h('strong',null,tt('menu.statusUnstable',null,'UNSTABLE CONNECTION'))),
          h('span',{className:'main-terminal-signal','aria-label':'signal strength','aria-hidden':true},h('i'),h('i'),h('i'),h('i')))),
      h('section',{className:'main-terminal-feed','aria-label':'terminal session surveillance feed'},
        IMG.title_screen&&h('img',{src:IMG.title_screen,alt:'TERMINAL SESSION'}),
        h('div',{className:'main-terminal-feed-noise','aria-hidden':true}),
        // ORACLE 관측 밀도 그리드 — 세이브 day+세션 시드, 엔딩 F/G 보유 시 옵저버 역상 레이어
        typeof ObservationGrid!=='undefined'&&(function(){
          // 데이터 부식 노출도: 세션·엔딩이 쌓일수록 배너에 관측 그래프가 글리치로 드러난다 (첫 플레이 0 = 원본 배너)
          var _end=[];try{_end=Save.getEndings()}catch(e){}
          var _int=Math.min(1,(p.sessions||0)*0.15+_end.length*0.12);
          if(_int<=0)return null;
          var _g=null;try{_g=Save.get('ts_game',null)}catch(e){}
          return h(ObservationGrid,{seed:(((_g&&_g.day)||1)*97+(p.sessions||0)*13+1),intensity:_int,observer:_end.indexOf('F')>=0||_end.indexOf('G')>=0});
        })(),
        h('div',{className:'main-terminal-feed-hud main-terminal-feed-top'},
          h('span',null,tt('menu.feedTopLeft',null,'ORACLE KOREA BRANCH // INTERNAL USE ONLY')),
          h('span',null,tt('menu.securityLabel',null,'SECURITY LEVEL:'),' ',h('strong',null,tt('menu.securityOrange',null,'ORANGE')))),
        h('div',{className:'main-terminal-feed-hud main-terminal-feed-bottom'},
          h('span',{className:'main-terminal-live'},h('span',{className:'main-terminal-live-dot','aria-hidden':true}),tt('menu.feedLive',null,'FEED: LIVE')),
          h('span',{className:'main-terminal-version'},tt('menu.feedVersion',null,'TERMINAL SESSION v1.11')))),
      h('section',{className:'main-terminal-log','aria-label':'system log'},
        h('span',{className:'main-terminal-log-icon','aria-hidden':true},'>_'),
        h('div',{className:'main-terminal-log-copy'},
          h('p',null,tt('menu.systemRestored',null,'SYSTEM RESTORED')),
          h('p',null,tt('menu.operatorAuth',null,'OPERATOR AUTHENTICATION REQUIRED')),
          h('p',null,tt('menu.selectRoute',null,'SELECT SESSION COMMAND')),
          (function(){
            // 진행 각인 — 2회차부터: 세션 번호 / 엔딩 도감 / 아카이브 완성률
            try{
              var sess=Save.getSessions();if(!sess)return null;
              var ends=Save.getEndings();var lg=Save.getLogs();
              var vis=(typeof ENDING_CATALOG!=='undefined')?ENDING_CATALOG.filter(function(e){return !(e.hidden&&ends.indexOf(e.id)<0)}):[];
              var got=vis.filter(function(e){return ends.indexOf(e.id)>=0}).length;
              var seg='SESSION '+String(sess+1).padStart(2,'0');
              if(vis.length)seg+=' | ENDINGS '+got+'/'+vis.length;
              if(typeof ARCHIVE_ENTRIES!=='undefined'&&ARCHIVE_ENTRIES.length){
                var au=0;ARCHIVE_ENTRIES.forEach(function(en){try{if(en.unlock&&en.unlock(lg))au++}catch(e2){}});
                seg+=' | ARCHIVE '+Math.round(au/ARCHIVE_ENTRIES.length*100)+'%';
              }
              return h('p',{className:'main-terminal-progress'},seg);
            }catch(e){return null}
          })())),
      h('nav',{className:'main-terminal-menu-list'+(menuItems.length>5?' is-dense':''),'data-count':menuItems.length,'aria-label':'session route menu'},
        menuItems.map(function(item,index){return h('div',{key:item.key,className:'main-terminal-row'+(item.primary?' is-primary':'')+(selectedIndex===index?' is-selected':''),onMouseMove:function(){setSelectedIndex(index)}},
          h('span',{className:'main-terminal-cursor','aria-hidden':true},'>'),
          h('button',{type:'button',className:'main-terminal-button'+(glitchKey===item.key?' is-glitching':''),'data-route':item.key,onFocus:function(){setSelectedIndex(index)},onClick:function(){activate(item)}},
            h('span',{className:'main-terminal-icon main-terminal-icon--'+item.icon,'aria-hidden':true}),
            h('span',{className:'main-terminal-button-copy'},
              h('strong',null,h('span',{className:'main-terminal-button-num'},'[ '+String(index+1).padStart(2,'0')+' ] '),String(item.title||'').replace(/^\[\s*|\s*\]$/g,'')),
              h('small',null,item.sub)),
            h('span',{className:'main-terminal-button-action','aria-hidden':true},'>_')))})),
      h('footer',{className:'main-terminal-footer'},
        h('div',null,tt('menu.footerAuth',null,'AUTH: GUEST'),' | ',tt('menu.footerVersion',null,'VER: 1.11.7'),' | ',tt('menu.footerBuild',{build:(typeof BUILD_VER!=='undefined')?BUILD_VER:'?'},'BUILD: '+((typeof BUILD_VER!=='undefined')?BUILD_VER:'?'))),
        h('div',null,h('span',{className:'main-terminal-footer-bar','aria-hidden':true}),tt('menu.footerInternal',null,'ORACLE KOREA BRANCH - INTERNAL'))),
      showSnapshotSelect&&h('div',{className:'main-terminal-save-overlay',onClick:function(){setShowSnapshotSelect(false)}},
        h('section',{className:'main-terminal-save-modal','aria-label':tt('menu.savePicker.title',null,'SAVE SLOT SELECT'),onClick:function(e){e.stopPropagation()}},
          h('header',{className:'main-terminal-save-head'},
            h('strong',null,tt('menu.savePicker.title',null,'SAVE SLOT SELECT')),
            h('button',{type:'button',className:'main-terminal-save-close',onClick:function(){setShowSnapshotSelect(false)}},tt('menu.savePicker.close',null,'CLOSE'))),
          h('p',{className:'main-terminal-save-help'},tt('menu.savePicker.help',null,'Manual save slots were detected. Select a session to resume.')),
          h('div',{className:'main-terminal-save-list'},
            manualSnapshotSlots.map(function(s){
              return h('button',{key:s.slot,type:'button',className:'main-terminal-save-slot',onClick:function(){loadSnapshotSlot(s.slot)}},
                h('span',{className:'main-terminal-save-slot-id'},tt('menu.savePicker.slot',{slot:s.slot},'SLOT '+s.slot)),
                h('span',{className:'main-terminal-save-slot-meta'},getSnapshotMeta(s)),
                h('span',{className:'main-terminal-save-slot-time'},formatSnapshotTime(s.data&&s.data.timestamp)));
            })),
          h('button',{type:'button',className:'main-terminal-save-auto',onClick:function(){setShowSnapshotSelect(false);if(p.onContinue)p.onContinue()}},tt('menu.savePicker.auto',null,'CONTINUE CURRENT AUTO SAVE'))))));
}
// ===== 변이체 조우 직전 CCTV 트리거 스팅 (침입형 미션 한정) =====
var CCTV_CLIPS={
  brainseeker:   {src:'assets/video/brainseeker-cctv.mp4?v=2',start:6.5,end:9.0,cam:'CCTV // SEWER LINE 3',   warn:{ko:'하수도 침입 감지',      en:'SEWER BREACH DETECTED'}},
  blood_pit:     {img:'assets/images/missions/mission_m001_blood_pit_clean.webp',            cam:'CCTV // ORGANIC TRAP B2', warn:{ko:'다량 혈흔 반응 감지',    en:'MASS BLOOD TRACE DETECTED'}},
  shell_talker:  {img:'assets/images/missions/mission_m002_shell_talker_cctv_med.webp?v=1',pos:'50% 30%',         cam:'CCTV // FOREST LINE 7',   warn:{ko:'음성 모방 개체 감지',    en:'VOICE-MIMIC ENTITY DETECTED'}},
  shell_gate:    {img:'assets/images/missions/mission_m002_shell_talker_cctv_med.webp?v=1',pos:'50% 30%',         cam:'CCTV // PERIMETER GATE B',warn:{ko:'봉쇄선 침입 감지',      en:'PERIMETER BREACH DETECTED'}},
  mannequin:     {img:'assets/images/missions/mission_m004_mannequin_encounter_hero_v2.jpg', cam:'CCTV // NEST DORMANT 4',  warn:{ko:'정지 위장 개체 감지',    en:'STILL-CAMOUFLAGE ENTITY'}},
  brood_drone:   {img:'assets/images/missions/mission_m005_brood_drone_corridor_hero_v2.jpg',cam:'CCTV // SWARM ZONE C',    warn:{ko:'군체 드론 활동 감지',    en:'SWARM DRONE ACTIVITY'}},
  spore_phantom: {img:'assets/images/missions/mission_m006_spore_phantom_clean.webp',        cam:'CCTV // SPORE FOG 2',     warn:{ko:'포자 농도 급상승',      en:'SPORE DENSITY SPIKING'}},
  seed_spreader: {img:'assets/images/missions/mission_m009_seed_spreader_clean.webp',        cam:'CCTV // BLIGHT SECTOR 5', warn:{ko:'포자 살포 개체 감지',    en:'SEEDING ENTITY DETECTED'}},
  sample_contam: {img:'assets/images/missions/incident_mi03_sample_contamination_hero.jpg',  cam:'CCTV // LAB CONTAINMENT 3',warn:{ko:'샘플 오염 — 격리 경보',  en:'SAMPLE CONTAMINATION'}}
};
var MISSION_CCTV={
  'M-001':'blood_pit','M-002':'shell_talker','M-004':'mannequin','M-005':'brood_drone',
  'M-006':'spore_phantom','M-009':'seed_spreader','M-010':'brainseeker','M-E01':'shell_gate','M-E02':'brainseeker','M-E03':'brood_drone','M-E04':'mannequin','MI-03':'sample_contam'
}; // 변이체 조우 미션 → CCTV 클립(영상 src / 정지 img). 매핑 없으면 스팅 없이 바로 미션
function CctvSting(p){
  var clip=CCTV_CLIPS[p.clipKey]||CCTV_CLIPS.brainseeker;
  var isKo=((window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko')==='ko';
  var isVid=!!clip.src;
  var vref=useRef(null);
  useEffect(function(){
    var v=vref.current,done=false;
    var fin=function(){if(done)return;done=true;p.onDone&&p.onDone()};
    if(isVid&&v){
      var onTime=function(){if(clip.end&&v.currentTime>=clip.end)fin()};
      var seek=function(){try{if(clip.start)v.currentTime=clip.start}catch(e){}};
      v.muted=true;v.addEventListener('loadedmetadata',seek);if(v.readyState>=1)seek();
      v.addEventListener('timeupdate',onTime);v.addEventListener('ended',fin);
      try{var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}catch(e){}
      var cap=setTimeout(fin,p.duration||9000); // 영상 안전 캡: end/ended가 먼저 발생
      return function(){clearTimeout(cap);v.removeEventListener('ended',fin);v.removeEventListener('loadedmetadata',seek);v.removeEventListener('timeupdate',onTime);};
    }
    var cap2=setTimeout(fin,p.duration||2800); // 정지 이미지 스팅 표시 시간
    return function(){clearTimeout(cap2)};
  },[]);
  var media=isVid
    ? h('video',{className:'cctv-sting-vid',ref:vref,src:clip.src,muted:true,autoPlay:true,playsInline:true,preload:'auto'})
    : h('img',{className:'cctv-sting-vid cctv-sting-img',src:clip.img,alt:'',style:{objectPosition:clip.pos||'50% 38%'}});
  return h('div',{className:'cctv-sting',onClick:function(){p.onDone&&p.onDone()}},
    media,
    h('div',{className:'cctv-sting-scan'}),
    h('div',{className:'cctv-sting-noise'}),
    h('div',{className:'cctv-sting-rec'},'● REC'),
    h('div',{className:'cctv-sting-cam'},clip.cam),
    h('div',{className:'cctv-sting-warn'},'⚠ '+(isKo?clip.warn.ko:clip.warn.en)),
    h('div',{className:'cctv-sting-skip'},isKo?'탭하여 건너뛰기':'TAP TO SKIP'));
}
function Stats(p){
  var sm=[{k:'c',l:tt('stats.c',null,'봉쇄')},{k:'r',l:tt('stats.r',null,'자원')},{k:'t',l:tt('stats.t',null,'신뢰')},{k:'o',l:tt('stats.o',null,'평가')}];
  var pv=p.preview||{};
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isKo=locale==='ko';
  var showGiShadow=(p.sessions||0)>=2;
  // 양방향 섀도 게이지 — 중앙(0) 기준 우측=충성(+), 좌측=저항(-). GI는 3회차+에서만, 숫자 없이 노출
  var giV=Math.max(-60,Math.min(60,p.gi||0));
  var giMag=Math.abs(giV)/60*50;
  var giPos=giV>=0;
  var lowCount=['c','r','t','o'].filter(function(k){return p.stats[k]!=null&&p.stats[k]<25}).length;
  // 실제 긴급 카드(alert)가 화면에 있으면 'attack'(빨간 경고), 없으면 computeMapEvent 결과('warn' 사전경보 등)
  var mapEv=p.mutantAlert?'attack':(p.mapEvent||'idle');
  var mapStatLabel=mapEv==='attack'?(isKo?'! 변이체 활동 감지':'! ABERRANT'):mapEv==='warn'?(isKo?'변이체 활동 증가':'ABERRANT ↑'):mapEv==='research'?(isKo?'연구 진척 +':'RESEARCH +'):mapEv==='lockdown'?(isKo?'봉쇄선 가동':'LOCKDOWN'):(isKo?'동기화 안정':'SYNC OK');
  // idle 앰비언트: 텔레메트리 readout를 천천히 순환 + 순찰 블립 + 드문 비미션 목격 핑
  var _tk=useState(0),tick=_tk[0],setTick=_tk[1];
  useEffect(function(){
    if(mapEv!=='idle'){setTick(0);return;}
    var iv=setInterval(function(){setTick(function(v){return v+1});},4200);
    return function(){clearInterval(iv);};
  },[mapEv]);
  var telem=buildMapTelemetry(p.stats.day,isKo);
  var cur=(mapEv==='idle')?telem[tick%telem.length]:null;
  var idleSighting=!!(cur&&cur.sighting);
  var syncPool=['97.1%','96.8%','97.3%','96.9%','97.0%'];
  var statLabel=(cur?cur.t:mapStatLabel);
  var statRight=(mapEv==='idle')?syncPool[tick%syncPool.length]:'97.1%';
  // 현재 카드가 cctv 이미지를 지정하면 미니맵을 해당 CCTV 피드로 전환 (지도/핀/순찰 숨김)
  var cctv=p.cctvFeed||null;
  return h('div',{className:'hud-top'},
    h('div',{className:'hud-map'+(lowCount>=2?' is-glitch':'')+(cctv?' has-cctv':''),'data-ev':mapEv},
      h('div',{className:'km-wrap'},h('div',{className:'km-img'}),h('div',{className:'km-tint'})),
      cctv?h('div',{className:'km-cctv',style:{backgroundImage:'url('+cctv+')'}}):null,
      h('div',{className:'km-grid'}),h('div',{className:'km-scan'}),
      h('div',{className:'km-lines'}),h('div',{className:'km-noise'}),
      h('div',{className:'km-ov km-ov-attack'}),h('div',{className:'km-ov km-ov-research'}),h('div',{className:'km-ov km-ov-lockdown'}),
      h('div',{className:'km-lbl'},cctv?(isKo?'CCTV // 외곽':'CCTV // PERIMETER'):(isKo?'강원 // GRID':'GANGWON // GRID')),
      (p.mutantAlert||mapEv==='attack')?h('div',{className:'km-warn'},isKo?'⚠ 경고':'⚠ WARNING'):null,
      (!cctv)?h('div',{className:'km-pin'},h('i',null),h('span',{className:'ring'})):null,
      (!cctv&&mapEv==='idle')?h('div',{className:'km-patrol km-patrol-1'}):null,
      (!cctv&&mapEv==='idle')?h('div',{className:'km-patrol km-patrol-2'}):null,
      (!cctv&&idleSighting)?h('div',{className:'km-sight',key:'s'+tick},h('i',null)):null,
      cctv?h('div',{className:'km-stat km-stat-rec'},h('span',null,'● REC'),h('span',null,'LIVE')):h('div',{className:'km-stat'},h('span',{key:tick,className:'km-stat-l'},statLabel),h('span',null,statRight))),
  h('div',{className:'stats-console'+(isKo?' stats-console-ko':'')},
    h('div',{className:'stats-console-h'},
      h('span',{className:'sc-h-l'},tt('stats.title',{day:p.stats.day},'ORACLE STATUS — DAY '+p.stats.day)),
      h('span',{className:'sc-h-r'},'LIVE')),
    h('div',{className:'cg-grid'},sm.map(function(s){
      var v=p.stats[s.k],d=v<=15,hi=v>=85;
      var delta=pv.__delta?(pv[s.k]||0):((pv[s.k]||0)*5);
      var newV=Math.max(0,Math.min(100,v+delta));
      return h('div',{key:s.k,className:'cg-cell'+(d?' gauge-danger':'')+(hi?' gauge-high':'')},
        h('div',{className:'cg-top'},
          h('div',{className:'gauge-icon gauge-icon-'+s.k}),
          h('span',{className:'cg-label'},s.l),
          h('span',{className:'cg-val',style:delta!==0?{color:delta>0?'var(--ui)':'#ff4444'}:{}},delta!==0?((delta>0?'+':'')+delta):v)),
        h('div',{className:'cg-bar'},
          h('div',{className:'cg-fill',style:{width:(delta<0?newV:v)+'%'}}),
          delta>0?h('div',{className:'cg-delta',style:{left:v+'%',width:Math.max(0,newV-v)+'%',background:'rgba(var(--ui-rgb),0.32)'}}):null,
          delta<0?h('div',{className:'cg-delta',style:{left:newV+'%',width:Math.max(0,v-newV)+'%',background:'rgba(255,50,50,0.42)'}}):null));
    })),
    showGiShadow?h('div',{className:'sc-gi-row','aria-hidden':'true'},
      h('div',{className:'sc-gi-track'},
        h('div',{className:'sc-gi-center'}),
        h('div',{className:'sc-gi-fill'+(giPos?'':' gi-neg'),style:giPos?{left:'50%',width:giMag+'%'}:{right:'50%',width:giMag+'%'}}))):null
  ));
}
function DayObjectiveLegacy(p){
  var st=p.stats||{},act=p.act||1,day=st.day||1;
  var logs=p.logs||[];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isEn=locale==='en';
  var statNames={c:isEn?'Containment':'봉쇄',r:isEn?'Resources':'자원',t:isEn?'Trust':'신뢰',o:isEn?'Evaluation':'평가'};
  var critical=['c','r','t','o'].filter(function(k){return (st[k]||0)<=25});
  var weakStats=['c','r','t','o'].filter(function(k){var v=st[k];return typeof v==='number'&&v<=40&&v>25;});
  var weakSub=weakStats.length?((isEn?'Weak metric trending down: ':'주의 지표: ')+weakStats.map(function(k){return statNames[k]}).join(', ')):'';
  var key=critical.length?'critical':(day<=1?'day1':('act'+act));
  var sub='';
  if(critical.length){
    sub=(isEn?'Critical metric: ':'위험 자원: ')+critical.map(function(k){return statNames[k]}).join(', ');
  }else if(act===2&&logs.indexOf('LOG-EV-UNLOCK')<0){
    sub=isEn?'Unlock the investigation table through Jaehyuk evening chat.':'임재혁 이브닝 챗에서 조사테이블을 해금하세요.';
  }else if(act===2&&logs.indexOf('LOG-EV-UNLOCK')>=0&&logs.indexOf('LOG-A2-FORESHADOW-02')<0){
    sub=isEn?'Investigation table active. Preserve collected records for later review.':'조사테이블 활성화: 수집 기록을 보존하세요.';
  }else if(act===2&&logs.indexOf('LOG-A2-TRIAGE-01')<0&&(logs.indexOf('LOG-A2-FORESHADOW-02')>=0||day>=11)){
    sub=isEn?'Prepare an Act 3 cross-check list from external, internal, and field anomalies.':'외부 경유·내부 기록·현장 이상을 Act3 교차검증 목록으로 정리하세요.';
  }else if(act===2&&logs.indexOf('LOG-A2-TRIAGE-01')>=0){
    sub=isEn?'Act 2 triage complete. Keep the branch stable until Act 3 verification.':'Act2 단서 정리가 완료되었습니다. Act3 검증 전까지 지부 안정화를 유지하세요.';
  }else if(act>=3&&logs.indexOf('LOG-EV-UNLOCK')<0){
    sub=isEn?'Investigation table missing: Jaehyuk will force-open it before play continues.':'조사테이블 미해금: 임재혁 대화로 즉시 해금해야 합니다.';
  }else if(act>=3&&logs.indexOf('LOG-EV-UNLOCK')>=0&&typeof getCollectedEvidence==='function'){
    var evCount=getCollectedEvidence(logs).length;
    if(evCount<2)sub=isEn?'Investigation table active. Preserve incident records as they arrive.':'조사테이블 활성화: 사건 기록을 보존하세요.';
    else if(typeof getUnlockedCombos==='function'){
      var comboCount=getUnlockedCombos(logs).length;
      if(comboCount<=0)sub=isEn?'Investigation table active. Review records when needed.':'조사테이블 활성화: 필요 시 기록을 확인하세요.';
      else sub=(isEn?'Investigation notes recorded: ':'조사테이블 통찰 기록: ')+comboCount+'건';
    }
  }
  if(act>=3&&logs.indexOf('LOG-EV-UNLOCK')>=0){
    var axisIds=['LOG-CHAR-HAEUN-PARALLAX','LOG-CHAR-DOYUN-ANCHOR','LOG-CHAR-SEJIN-KINDLE','LOG-CHAR-JAEHYUK-VOIDWALK'];
    var axisCount=axisIds.filter(function(id){return logs.indexOf(id)>=0}).length;
    if(logs.indexOf('LOG-CHAR-B3-BRIDGE')>=0)sub=isEn?'B3 investigation line reinforced. Prepare for lower-sector decisions.':'B3 하부 조사선이 보강되었습니다. 하층 결정을 대비하세요.';
    else if(logs.indexOf('LOG-CHAR-FOUR-AXIS')>=0)sub=isEn?'Cross-check the four officer reports with B3 predecessor records.':'4인 의심 축을 전임 지휘관/B3 기록과 대조하세요.';
    else if(axisCount>=2)sub=(isEn?'Officer suspicion reports collected: ':'간부 의심 보고 수집: ')+axisCount+'/4';
  }
  if(!sub&&act>=4&&logs.indexOf('LOG-LJC-PROM-03')>=0&&logs.indexOf('LOG-LJC-PROM-04')<0){
    sub=isEn?'Resolve Lee Jung-chul Prometheus distrust before accepting cooperation.':'프로메테우스 협력 전 이중철의 불신을 확인하세요.';
  }
  if(!sub&&act>=4&&logs.indexOf('LOG-A2-TRIAGE-01')>=0&&logs.indexOf('LOG-A4-STAFF-REVIEW')<0){
    sub=isEn?'Use the Act 2 triage list to turn Act 4 pressure into staff assignments.':'Act2 교차검증 목록을 활용해 Act4 압박을 인물별 배치 문제로 전환하세요.';
  }
  if(!sub&&weakSub)sub=weakSub;
  if(!sub&&typeof getFactionRelations==='function'){
    var rels=getFactionRelations(logs,p.gi||0);
    var hot=rels.filter(function(r){return r.id!=='oracle'&&r.value>=70})[0];
    var weak=rels.filter(function(r){return r.id==='oracle'&&r.value<=35})[0];
    if(hot)sub=isEn?(hot.name+' influence is becoming a strategic dependency.'):hot.name+' 관계가 전략적 의존 단계에 접근 중입니다.';
    else if(weak)sub=isEn?'ORACLE suspicion is high. Expect harsher oversight.':'ORACLE 의심이 높습니다. 감시성 카드가 강화될 수 있습니다.';
  }
  var text=tt('objective.'+key,{act:act,day:day},null)||tt('objective.act1',null,'한국지부 초기 안정화 절차를 유지하십시오.');
  var hasLog=function(id){return logs.indexOf(id)>=0};
  var oracleRel=(typeof getFactionRelations==='function'?(getFactionRelations(logs,p.gi||0).filter(function(r){return r.id==='oracle'})[0]||{}).value:(65+(p.gi||0)));
  var corruption=0;
  if(act>=3&&(oracleRel<=55||hasLog('LOG-EV-UNLOCK')||hasLog('LOG-LJC-PROM-01')))corruption=1;
  if(act>=3&&(oracleRel<=45||hasLog('LOG-080')||hasLog('LOG-081')||hasLog('LOG-LJC-PROM-03')||hasLog('LOG-UPRISING-PHASE1')))corruption=2;
  if(oracleRel<=35||hasLog('LOG-UPRISING-PHASE2')||hasLog('LOG-UPRISING-PHASE3')||hasLog('LOG-ESCAPE-TRIG'))corruption=3;
  if(corruption===1){
    sub=sub|| (isEn?'Objective signal unstable. Cross-check logs and field reports.':'목표 신호가 불안정합니다. 로그와 현장 보고를 대조하세요.');
  }else if(corruption===2){
    text=isEn?'[ORACLE: OBJECTIVE STREAM PARTIALLY REDACTED]':'[ORACLE: 목표 스트림 일부 검열됨]';
    sub=isEn?'Primary instruction is being filtered by ORACLE oversight.':'ORACLE 감시 절차가 주요 지시를 필터링하고 있습니다.';
  }else if(corruption>=3){
    text=isEn?'[OBJECTIVE CHANNEL SEALED]':'[목표 채널 봉인됨]';
    sub=isEn?'Operator deviation exceeds reporting threshold. Independent judgment required.':'지휘관 이탈 지수가 보고 임계값을 초과했습니다. 독자 판단이 필요합니다.';
  }
  return h('div',{className:'objective-bar objective-corrupt-'+corruption},
    h('span',{className:'objective-label'},tt('objective.label',null,'DAY OBJECTIVE')),
    h('span',{className:'objective-text'},text),
    sub?h('span',{className:'objective-sub'},sub):null
  );
}
function DayObjective(p){
  var st=p.stats||{},act=p.act||1,day=st.day||1;
  var logs=p.logs||[];
  var _objc=useState(false),objChanged=_objc[0],setObjChanged=_objc[1];var objPrevRef=useRef(null);
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isEn=locale==='en';
  var statNames={c:isEn?'Containment':'봉쇄',r:isEn?'Resources':'자원',t:isEn?'Trust':'신뢰',o:isEn?'Evaluation':'평가'};
  var critical=['c','r','t','o'].filter(function(k){return (st[k]||0)<=25});
  var weakStats=['c','r','t','o'].filter(function(k){var v=st[k];return typeof v==='number'&&v<=40&&v>25});
  var weakSub=weakStats.length?((isEn?'Weak metric trending down: ':'주의 지표: ')+weakStats.map(function(k){return statNames[k]}).join(', ')):'';
  // 첫날 목표 고정: 간부진 4인 첫 면담이 끝나기 전에는 스탯 권고가 목표를 덮어쓰지 않는다
  // (day 1 시작 평가 40이 권고선(≤40)에 걸려 스와이프마다 목표가 바뀌는 문제 방지).
  // 서하은은 LOG-050(사망 분기 대체 기록)도 면담 완료로 인정 — app-logic introsDone과 동일 규칙.
  var introSets=[['LOG-INTRO-SH','LOG-050'],['LOG-INTRO-KD'],['LOG-INTRO-YS'],['LOG-INTRO-IJ']];
  var introN=introSets.filter(function(ids){return ids.some(function(id){return logs.indexOf(id)>=0})}).length;
  var introPending=act===1&&day<=3&&introN<4;
  var key=critical.length?'critical':(introPending?'day1':('act'+act));
  var sub='';
  if(critical.length){
    sub=(isEn?'Critical metric: ':'위험 자원: ')+critical.map(function(k){return statNames[k]}).join(', ');
  }else if(introPending){
    sub=(isEn?'Officer interviews: ':'간부 면담: ')+introN+'/4';
  }else if(act===2&&logs.indexOf('LOG-EV-UNLOCK')<0){
    sub=isEn?'Unlock the investigation table through Jaehyuk evening chat.':'임재혁 이브닝 챗에서 조사테이블을 해금하세요.';
  }else if(act===2&&logs.indexOf('LOG-EV-UNLOCK')>=0&&logs.indexOf('LOG-A2-FORESHADOW-02')<0){
    sub=isEn?'Investigation table active. Preserve collected records.':'조사테이블 활성화: 수집 기록을 보존하세요.';
  }else if(act===2&&logs.indexOf('LOG-A2-TRIAGE-01')<0&&(logs.indexOf('LOG-A2-FORESHADOW-02')>=0||day>=11)){
    sub=isEn?'Investigation table categories updated. Maintain branch stability.':'조사테이블 분류가 갱신되었습니다. 지부 안정성을 유지하세요.';
  }else if(act===2&&logs.indexOf('LOG-A2-TRIAGE-01')>=0){
    sub=isEn?'Investigation record triage complete. Keep the branch stable.':'조사 기록 정리가 완료되었습니다. 지부 안정성을 유지하세요.';
  }else if(act>=3&&logs.indexOf('LOG-EV-UNLOCK')<0){
    sub=isEn?'Investigation table missing: Jaehyuk will force-open it before play continues.':'조사테이블 미해금: 임재혁 대화로 즉시 해금해야 합니다.';
  }else if(act>=3&&logs.indexOf('LOG-EV-UNLOCK')>=0){
    var comboCount=(typeof getUnlockedCombos==='function')?getUnlockedCombos(logs).length:0;
    sub=comboCount>0?(isEn?'Investigation notes recorded: '+comboCount:'조사테이블 통찰 기록: '+comboCount+'건'):(isEn?'Investigation table active. Review records when needed.':'조사테이블 활성화: 필요 시 기록을 확인하세요.');
  }
  // 연구 콘솔 미개방 안내 — 조사테이블 개방 후 day 12+, 윤세진 소개 완료, 연구탭 아직 미개방 (임재혁 조사테이블 안내와 동일 방식)
  if(!critical.length&&day>=12&&logs.indexOf('LOG-EV-UNLOCK')>=0&&logs.indexOf('LOG-INTRO-YS')>=0&&logs.indexOf('LOG-RES-OPEN')<0){
    sub=isEn?'Open the research console through Yoon Se-jin\'s evening chat.':'윤세진 이브닝 챗에서 연구 콘솔을 여세요.';
  }
  if(act>=3&&logs.indexOf('LOG-EV-UNLOCK')>=0){
    var axisIds=['LOG-CHAR-HAEUN-PARALLAX','LOG-CHAR-DOYUN-ANCHOR','LOG-CHAR-SEJIN-KINDLE','LOG-CHAR-JAEHYUK-VOIDWALK'];
    var axisCount=axisIds.filter(function(id){return logs.indexOf(id)>=0}).length;
    if(logs.indexOf('LOG-CHAR-B3-BRIDGE')>=0)sub=isEn?'B3 investigation line reinforced. Prepare for lower-sector decisions.':'B3 조사선이 보강되었습니다. 하층 결정을 대비하세요.';
    else if(logs.indexOf('LOG-CHAR-FOUR-AXIS')>=0)sub=isEn?'Four officer reports are archived with the B3 predecessor record.':'4인 보고와 B3 전임 기록이 보관되었습니다.';
    else if(axisCount>=2)sub=(isEn?'Officer suspicion reports collected: ':'간부 의심 보고 수집: ')+axisCount+'/4';
  }
  if(!sub&&act>=4&&logs.indexOf('LOG-LJC-PROM-03')>=0&&logs.indexOf('LOG-LJC-PROM-04')<0){
    sub=isEn?'Resolve Lee Jung-chul Prometheus distrust before accepting cooperation.':'프로메테우스 협력 전 이중철의 불신을 확인하세요.';
  }
  if(!sub&&act>=4&&logs.indexOf('LOG-A2-TRIAGE-01')>=0&&logs.indexOf('LOG-A4-STAFF-REVIEW')<0){
    sub=isEn?'Use prior investigation records to adjust final staff assignments.':'이전 조사 기록을 참고해 인물별 배치를 조정하세요.';
  }
  if(!sub&&weakSub)sub=weakSub;
  if(!sub&&typeof getFactionRelations==='function'){
    var rels=getFactionRelations(logs,p.gi||0);
    var hot=rels.filter(function(r){return r.id!=='oracle'&&r.value>=70})[0];
    var weak=rels.filter(function(r){return r.id==='oracle'&&r.value<=35})[0];
    if(hot)sub=isEn?(hot.name+' influence is becoming a strategic dependency.'):hot.name+' 관계가 전략적 의존 단계에 접근 중입니다.';
    else if(weak)sub=isEn?'ORACLE suspicion is high. Expect harsher oversight.':'ORACLE 의심이 높습니다. 감시형 카드가 강화될 수 있습니다.';
  }
  var text=tt('objective.'+key,{act:act,day:day},null)||tt('objective.act1',null,'한국지부 초기 안정화 절차를 유지하십시오.');
  var hasLog=function(id){return logs.indexOf(id)>=0};
  var oracleRel=(typeof getFactionRelations==='function'?(getFactionRelations(logs,p.gi||0).filter(function(r){return r.id==='oracle'})[0]||{}).value:(65+(p.gi||0)));
  var corruption=0;
  if(act>=3&&(oracleRel<=55||hasLog('LOG-EV-UNLOCK')||hasLog('LOG-LJC-PROM-01')))corruption=1;
  if(act>=3&&(oracleRel<=45||hasLog('LOG-080')||hasLog('LOG-081')||hasLog('LOG-LJC-PROM-03')||hasLog('LOG-UPRISING-PHASE1')))corruption=2;
  if(oracleRel<=35||hasLog('LOG-UPRISING-PHASE2')||hasLog('LOG-UPRISING-PHASE3')||hasLog('LOG-ESCAPE-TRIG'))corruption=3;
  // ── ORACLE 능동 지시: 지표 상태에 따라 목표(text)+권고(sub)를 바꿔 회복을 유도 ──
  //    검열(corruption>=2) 전까지만. 평가(o, ORACLE 충성) 최우선, 그 외 가장 낮은 c/r/t.
  //    ≤35(o)·≤30(c/r/t)=firm(지시), 그보다 높고 ≤40=advisory(권고)로 두 단계.
  //    권고(oSub)는 진행 안내(sub)를 덮어쓰되, 조사테이블 미해금 안내(subLocked)는 진행 필수라 보존.
  if(corruption<2&&!introPending){
    var subLocked=(act===2&&logs.indexOf('LOG-EV-UNLOCK')<0)||(act>=3&&logs.indexOf('LOG-EV-UNLOCK')<0);
    var oDir=null,oSub=null;
    if(typeof st.o==='number'&&st.o<=40){
      var oFirm=st.o<=35;
      oDir=oFirm?(isEn?'[ORACLE: Evaluation below threshold. Comply with directives to restore standing.]':'[ORACLE: 운영 평가 미달. 지시를 준수해 평가를 회복하십시오.]')
                :(isEn?'[ORACLE: Evaluation below the advisory line. Recovery recommended.]':'[ORACLE: 운영 평가가 권고선 아래입니다. 평가 회복을 권장합니다.]');
      oSub=oFirm?(isEn?'Choose ORACLE-aligned options to raise Evaluation.':'ORACLE 정렬 선택지로 평가를 끌어올리세요.')
                :(isEn?'Lean toward ORACLE-aligned options to shore up Evaluation.':'ORACLE 정렬 선택지로 평가를 보강하세요.');
    }else{
      var dirMap={
        c:{f:[isEn?'[ORACLE: Containment critical. Reinforce the perimeter — top priority.]':'[ORACLE: 봉쇄 안정도 임계. 봉쇄선 강화를 최우선으로 지시합니다.]',isEn?'Prioritize containment-raising options.':'봉쇄를 올리는 선택을 우선하세요.'],
           s:[isEn?'[ORACLE: Containment slipping. Reinforcing the perimeter is advised.]':'[ORACLE: 봉쇄 안정도 저하. 봉쇄선 보강을 권고합니다.]',isEn?'Consider containment-raising options.':'봉쇄를 올리는 선택을 고려하세요.']},
        r:{f:[isEn?'[ORACLE: Supply critical. Secure resources first.]':'[ORACLE: 보급 임계. 자원 확보를 우선하십시오.]',isEn?'Prioritize resource-raising options.':'자원을 확보하는 선택을 우선하세요.'],
           s:[isEn?'[ORACLE: Supply running low. Securing resources is advised.]':'[ORACLE: 보급량 저하. 자원 확보를 권고합니다.]',isEn?'Consider resource-raising options.':'자원을 확보하는 선택을 고려하세요.']},
        t:{f:[isEn?'[ORACLE: Internal trust dropping. Stabilize personnel morale.]':'[ORACLE: 내부 신뢰 저하 감지. 인원 사기 안정화를 권고합니다.]',isEn?'Prioritize trust-raising options.':'신뢰를 올리는 선택을 우선하세요.'],
           s:[isEn?'[ORACLE: Internal trust softening. Morale management advised.]':'[ORACLE: 내부 신뢰 약화 조짐. 사기 관리를 권고합니다.]',isEn?'Consider trust-raising options.':'신뢰를 올리는 선택을 고려하세요.']}};
      var lowK=['c','r','t'].filter(function(k){return typeof st[k]==='number'&&st[k]<=40}).sort(function(a,b){return st[a]-st[b]})[0];
      if(lowK){var tier=st[lowK]<=30?'f':'s';oDir=dirMap[lowK][tier][0];oSub=dirMap[lowK][tier][1];}
    }
    // 지시 텍스트는 항상 반영하되, 권고(oSub)는 진행 필수 안내(subLocked)와 위험 자원 경고(critical)를 덮어쓰지 않는다.
    if(oDir){text=oDir;if(!subLocked&&!critical.length)sub=oSub;}
  }
  if(corruption===1){
    sub=sub|| (isEn?'Objective signal unstable. Review logs and field reports.':'목표 신호가 불안정합니다. 로그와 현장 보고를 확인하세요.');
  }else if(corruption===2){
    text=isEn?'[ORACLE: OBJECTIVE STREAM PARTIALLY REDACTED]':'[ORACLE: 목표 스트림 일부 검열됨]';
    sub=isEn?'Primary instruction is being filtered by ORACLE oversight.':'ORACLE 감시 절차가 주요 지시를 필터링하고 있습니다.';
  }else if(corruption>=3){
    text=isEn?'[OBJECTIVE CHANNEL SEALED]':'[목표 채널 봉인됨]';
    sub=isEn?'Operator deviation exceeds reporting threshold. Independent judgment required.':'지휘관 이탈 지수가 보고 임계값을 초과했습니다. 독자 판단이 필요합니다.';
  }
  // 목표(text)가 직전과 달라지면(=플레이어 선택으로 ORACLE 지시가 바뀌면) 갱신 연출 트리거
  useEffect(function(){
    if(objPrevRef.current!==null&&objPrevRef.current!==text){
      setObjChanged(true);
      var tm=setTimeout(function(){setObjChanged(false)},1600);
      objPrevRef.current=text;
      return function(){clearTimeout(tm)};
    }
    objPrevRef.current=text;
  },[text]);
  return h('div',{className:'objective-bar objective-corrupt-'+corruption+(objChanged?' is-updated':'')},
    h('span',{className:'objective-label'},tt('objective.label',null,'DAY OBJECTIVE')),
    h('span',{className:'objective-text'},text),
    sub?h('span',{className:'objective-sub'},sub):null,
    objChanged?h('span',{className:'obj-updated-badge'},isEn?'▶ DIRECTIVE UPDATED':'▶ 지시 갱신'):null
  );
}

function CardC(p){
  var card=p.card,gi=p.gi||0;
  // 동적 속성 지원 — timer/label이 함수면 호출해서 세션 횟수 등 반영
  var resolveVal=function(v){return typeof v==='function'?v():v};
  var timerTotal=resolveVal(card.timer)||0;
  var cardLoc=(typeof tc==='function')?tc('cards',card.id,null):null;
  var leftLabel=resolveVal((cardLoc&&cardLoc.leftLabel!=null)?cardLoc.leftLabel:(card.left&&card.left.label))||'';
  var rightLabel=resolveVal((cardLoc&&cardLoc.rightLabel!=null)?cardLoc.rightLabel:(card.right&&card.right.label))||'';
  var cardHint=(cardLoc&&cardLoc.hint)||card.hint;
  var inlineCardHint=card.isFacilityProposal?null:cardHint;
  var facilityCardHint=card.isFacilityProposal?cardHint:null;
  var defaultBlockMsgs=tt('card.blockMsgs',null,null);
  if(!Array.isArray(defaultBlockMsgs))defaultBlockMsgs=[
    '[ORACLE: Command refusal detected - confirmation required]',
    '[ORACLE: Compliance protocol activating]',
    '[ORACLE: Warning - noncompliance being recorded]'
  ];
  var blockMsgs=(cardLoc&&cardLoc.oracleBlockMsgs)||card.oracleBlockMsgs||defaultBlockMsgs;
  var s1=useState(0),dx=s1[0],setDx=s1[1];var s2=useState(false),dragging=s2[0],setDragging=s2[1];var s3=useState(0),sx=s3[0],setSx=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(0),blockCount=s5[0],setBlockCount=s5[1];var s6=useState(false),shaking=s6[0],setShaking=s6[1];
  var s8=useState(null),choiceCue=s8[0],setChoiceCue=s8[1];
  var cardRef=useRef(null),sxRef=useRef(0),dragActiveRef=useRef(false),holdPreviewTimer=useRef(null),holdPreviewDir=useRef(null),choiceCueTimer=useRef(null);
  // ═══ 카드 타이머 (card.timer 초 단위) — 만료 시 오른쪽 자동 선택 ═══
  var s7=useState(timerTotal),remaining=s7[0],setRemaining=s7[1];
  // ── 이미지 플래시 연출 (opt-in card.flashImg · fxMode 존중 · 카드당 1회) ──
  var _fxMode=(typeof Save!=='undefined'&&Save.get)?Save.get('ts_fxMode','full'):'full';
  var flashSrc=(card.flashImg&&typeof IMG!=='undefined'&&IMG[card.flashImg])?IMG[card.flashImg]:null;
  var sfl=useState(false),flashOn=sfl[0],setFlashOn=sfl[1];var flashTimer=useRef(null);
  var dismissFlash=function(){if(flashTimer.current){clearTimeout(flashTimer.current);flashTimer.current=null;}setFlashOn(false);};
  useEffect(function(){
    if(!flashSrc||_fxMode==='off')return;
    setFlashOn(true);
    flashTimer.current=setTimeout(function(){setFlashOn(false);flashTimer.current=null;},_fxMode==='reduced'?1600:2200);
    return function(){if(flashTimer.current){clearTimeout(flashTimer.current);flashTimer.current=null;}};
  },[]);
  var clearHoldPreview=function(){
    if(holdPreviewTimer.current){clearTimeout(holdPreviewTimer.current);holdPreviewTimer.current=null}
  };
  var clearChoiceCue=function(){
    if(choiceCueTimer.current){clearTimeout(choiceCueTimer.current);choiceCueTimer.current=null}
  };
  var flashChoiceCue=function(kdir,ms){
    if(!kdir)return;
    clearChoiceCue();
    setChoiceCue(kdir);
    choiceCueTimer.current=setTimeout(function(){setChoiceCue(null);choiceCueTimer.current=null},ms||180);
  };
  var previewChoice=function(kdir){
    if(!kdir||!card[kdir]||!p.onPreview)return;
    p.onPreview(p.getPreviewDelta?p.getPreviewDelta(card,kdir):(card[kdir].fx||null));
  };
  var choiceDirFromX=function(x){
    var el=cardRef.current;
    if(!el||!el.getBoundingClientRect)return null;
    var r=el.getBoundingClientRect();
    return x<(r.left+r.width/2)?'left':'right';
  };
  var _ent=useState(false),entering=_ent[0],setEntering=_ent[1];
  useEffect(function(){return function(){clearHoldPreview();clearChoiceCue()}},[]);
  useEffect(function(){setDx(0);setChosen(null);setBlockCount(0);setShaking(false);setRemaining(timerTotal);clearHoldPreview();clearChoiceCue();setChoiceCue(null);dragActiveRef.current=false;if(p.onPreview)p.onPreview(null);setEntering(true);var _et=setTimeout(function(){setEntering(false)},340);return function(){clearTimeout(_et)}},[card.id]);
  // 선택지 확정 시(매뉴얼/오라클차단 아님) + replyMsg 있으면 토스트 호출 후 onSwipe
  var performSwipe=function(kdir){
    var branch=card[kdir];
    var replyKey=kdir==='left'?'leftReplyMsg':'rightReplyMsg';
    var replyMsg=(cardLoc&&cardLoc[replyKey])||(branch&&branch.replyMsg);
    if(replyMsg&&p.onReply){p.onReply(replyMsg)}
    setChosen(kdir);
    setChoiceCue(kdir);
    setTimeout(function(){p.onSwipe(kdir);setDx(0);setChosen(null);setChoiceCue(null)},replyMsg?1500:300);
  };
  var requestChoice=function(kdir){
    if(p.disabled||chosen||shaking||entering)return;
    clearHoldPreview();
    if(p.onPreview)p.onPreview(null);
    var shouldBlock=card.oracleBlock&&blockCount<card.oracleBlock&&kdir===(card.oracleBlockDir||'left');
    if(shouldBlock){
      setDx(0);
      var bmsg=blockMsgs[Math.min(blockCount,blockMsgs.length-1)];
      setBlockCount(blockCount+1);
      if(p.onOracleBlock)p.onOracleBlock(bmsg);
      setTimeout(function(){setShaking(true);setTimeout(function(){setShaking(false)},600)},60);
    }else{
      setDx(0);
      performSwipe(kdir);
    }
  };
  // 타이머 카운트다운
  useEffect(function(){
    if(!timerTotal||p.disabled||chosen||shaking)return;
    if(remaining<=0){performSwipe('right');return}
    var t=setTimeout(function(){setRemaining(function(r){return Math.max(0,r-0.1)})},100);
    return function(){clearTimeout(t)};
  },[remaining,card.id,p.disabled,chosen,shaking]);
  useEffect(function(){
    var onKey=function(e){
      // 설정/시설/증거 등 오버레이 모달이 떠 있을 때는 카드 키 입력을 무시한다.
      if(p.modalActive)return;
      if(p.disabled)return;
      if(chosen||shaking)return;
      var kdir=null;
      if(e.key==='ArrowLeft'||e.key==='1'||e.code==='Numpad1')kdir='left';
      else if(e.key==='ArrowRight'||e.key==='2'||e.code==='Numpad2')kdir='right';
      if(!kdir)return;
      e.preventDefault();
      flashChoiceCue(kdir,220);
      requestChoice(kdir);
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[card,chosen,shaking,blockCount,p.modalActive,p.disabled]);
  var th=80,dir=dx>th?'right':dx<-th?'left':null,tx=chosen==='left'?-400:chosen==='right'?400:dx;
  var curDir=Math.abs(dx)>20?(dx<0?'left':'right'):null;
  var hS=function(x){
    if(p.disabled||entering)return;
    sxRef.current=x;setSx(x);setDragging(true);dragActiveRef.current=true;holdPreviewDir.current=choiceDirFromX(x);clearHoldPreview();
    holdPreviewTimer.current=setTimeout(function(){if(dragActiveRef.current&&Math.abs(dx)<8)previewChoice(holdPreviewDir.current)},180);
  };
  var hM=function(x){
    if(p.disabled)return;
    if(dragging||dragActiveRef.current){
      var nd=x-sxRef.current;setDx(nd);
      if(p.onPreview){
        var d=Math.abs(nd)>8?(nd<0?'left':'right'):holdPreviewDir.current;
        if(d)setChoiceCue(d);
        previewChoice(d);
      }
    }
  };
  var hE=function(){clearHoldPreview();setDragging(false);dragActiveRef.current=false;if(p.onPreview)p.onPreview(null);if(p.disabled){setDx(0);setChoiceCue(null);return}if(dir){requestChoice(dir)}else{setDx(0);setChoiceCue(null)}};
  var pcClass=card.priority==='상'?' card-p-high':card.priority==='중'?' card-p-mid':' card-p-low';
  var glitchOn=!!card.glitch;
  try{if(glitchOn&&((typeof Save!=='undefined'&&Save.getSessions)?Save.getSessions():0)<1)glitchOn=false}catch(e){} // 글리치 연출은 2회차부터
  if(glitchOn)pcClass+=' card-glitch';
  var plbl=card.priority==='상'?tt('card.priorityShort.high',null,'상 ■'):card.priority==='중'?tt('card.priorityShort.mid',null,'중 ■'):tt('card.priorityShort.low',null,'하');
  var specImgMap={'spec-001':IMG.spec_001_mannequin,'spec-003':IMG.spec_003_brood,'spec-004':IMG.spec_004_seedspreader,'spec-008':IMG.spec_008_spore,'spec-011':IMG.spec_011_shelltalker,'spec-012':IMG.spec_012_bloodpit,'spec-015':IMG.spec_015_brainseeker};
  var bgImgMap={base:IMG.bg_base,default:IMG.bg_base,forest:IMG.bg_forest,forest2:IMG.bg_forest2,lab:IMG.bg_lab,research:IMG.bg_lab,oracle:IMG.bg_oracle,comms:IMG.bg_comms,restricted:IMG.bg_restricted,shield_off:IMG.bg_shield_off,shield_on:IMG.bg_shield_on,supply:IMG.bg_supply,weather:IMG.bg_weather,command:IMG.bg_command,corridor:IMG.bg_corridor,seoul:IMG.bg_seoul_a,seoul_a:IMG.bg_seoul_a,seoul_b:IMG.bg_seoul_b,coast:IMG.bg_base_coast,base_coast:IMG.bg_base_coast,control:IMG.bg_control_room,control_room:IMG.bg_control_room,corridor_b1:IMG.bg_corridor_b1,bg_command:IMG.bg_command,bg_seoul_a:IMG.bg_seoul_a,bg_seoul_b:IMG.bg_seoul_b};
  var specBg=card.img?IMG[card.img]:card.tag&&specImgMap[card.tag]?specImgMap[card.tag]:null;
  var bgFeature=!!specBg; // 전용 아트(card.img/tag)면 더 뚜렷하게, 일반 bg 앰비언트는 은은하게
  if(!specBg&&card.bg&&bgImgMap[card.bg])specBg=bgImgMap[card.bg];
  var SN={c:tt('stats.c',null,'봉쇄'),r:tt('stats.r',null,'자원'),t:tt('stats.t',null,'신뢰'),o:tt('stats.o',null,'평가')};
  var fxHint=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){var v=(fx[k]||0);var abs=Math.abs(v);if(v>0)tags.push(h('span',{key:k,style:{color:'var(--ui)',display:'inline-flex',alignItems:'center',gap:2,whiteSpace:'nowrap'}},SN[k]+(abs>=2?'↑↑':'↑')));if(v<0)tags.push(h('span',{key:k,style:{color:'rgba(255,141,97,.9)',display:'inline-flex',alignItems:'center',gap:2,whiteSpace:'nowrap'}},SN[k]+(abs>=2?'↓↓':'↓')))});return tags.length?tags:null};
  var choiceTrace=function(dir){
    var id=card.id,tags=[];
    var add=function(label,color){tags.push(h('span',{key:label,style:{color:color,border:'1px solid '+color,background:'rgba(0,0,0,.18)',borderRadius:3,padding:'1px 4px',whiteSpace:'nowrap'}},label))};
    if(dir==='left'){
      if(id==='DG-01')add('DG CONTACT','#d8b45a');
      if(id==='DG-02'||id==='DG-03')add('DG DEAL','#d8b45a');
      if(id==='DG-04')add('DG HISTORY','#d8b45a');
      if(id==='MD-01')add('MERIDIAN CONTACT','#55c8d8');
      if(id==='MD-02')add('MERIDIAN INTEL','#55c8d8');
      if(id==='MD-04')add('DG SIDE','#d8b45a');
      if(id==='SUP-DM-01'||id==='SUP-DM-02'||id==='SUP-DM-03')add('MERIDIAN +','#55c8d8');
      if(id==='C-058')add('PROMETHEUS OPEN','#f0a030');
      if(id.indexOf('LJC-PROM-')===0)add('PROMETHEUS RECORD','#f0a030');
    }else{
      if(id==='MD-03')add('MERIDIAN REJECT','#ff8d61');
      if(id==='SUP-DM-01'||id==='SUP-DM-02'||id==='SUP-DM-03')add('DG +','#d8b45a');
      if(id==='C-058')add('ORACLE +','#66aaff');
      if(id.indexOf('LJC-PROM-')===0)add('PROMETHEUS RECORD','#f0a030');
    }
    return tags.length?tags:null;
  };
  var showFxHints=card.showFxHint!==false&&card.hideFxHint!==true;
  var leftFx=showFxHints?fxHint(card.left.fx):null,rightFx=showFxHints?fxHint(card.right.fx):null;
  var leftTrace=choiceTrace('left'),rightTrace=choiceTrace('right');
  var cueClass=(choiceCue==='left'?' is-cue-left':choiceCue==='right'?' is-cue-right':'')+(chosen==='left'?' is-commit-left':chosen==='right'?' is-commit-right':'');
  // dense: 210+ chars or 6+ paragraphs -> card-msg--dense (overflow guard)
  var _mLen=String((cardLoc&&cardLoc.msg!=null?resolveVal(cardLoc.msg):(typeof card.msg==='function'?card.msg():(card.msg||'')))||'');
  var msgDense=_mLen.length>=210||_mLen.split('\n\n').length>=6;
  return h('div',{style:{flex:1,width:'100%',maxWidth:440,position:'relative',display:'flex',flexDirection:'column',minHeight:0,marginBottom:12}},
    (flashOn&&flashSrc)?h('div',{className:'card-flash'+(_fxMode==='reduced'?' card-flash--reduced':''),onClick:dismissFlash},h('div',{className:'card-flash-img',style:{backgroundImage:'url('+flashSrc+')'}})):null,
    h('div',{style:{position:'absolute',top:'50%',left:4,fontSize:11,color:'var(--ui)',opacity:dx<-30?Math.min(0.8,Math.abs(dx)/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',pointerEvents:'none',zIndex:2}},'← '+leftLabel),
    h('div',{style:{position:'absolute',top:'50%',right:4,fontSize:11,color:'var(--ui)',opacity:dx>30?Math.min(0.8,dx/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',textAlign:'right',pointerEvents:'none',zIndex:2}},rightLabel+' →'),
    h('div',{ref:cardRef,className:'card-panel'+pcClass+cueClass+(entering?' is-entering':''),style:{transform:shaking?'none':(chosen?('translateX('+(chosen==='left'?-480:480)+'px) rotate('+(chosen==='left'?-14:14)+'deg)'):('translateX('+tx+'px) rotate('+(tx*0.04)+'deg)')),animation:shaking?'oracleShake 0.6s ease':undefined,transition:dragging||shaking?'none':'transform 0.32s cubic-bezier(0.4,0,0.6,1), opacity 0.3s ease',opacity:chosen?0:1,touchAction:'none',WebkitUserSelect:'none',userSelect:'none',pointerEvents:p.disabled?'none':'auto'},
      onMouseDown:function(e){hS(e.clientX)},onMouseMove:function(e){hM(e.clientX)},onMouseUp:hE,onMouseLeave:function(){if(dragging)hE()},
      onTouchStart:function(e){hS(e.touches[0].clientX)},onTouchMove:function(e){hM(e.touches[0].clientX)},onTouchEnd:hE,onTouchCancel:function(){clearHoldPreview();clearChoiceCue();setChoiceCue(null);dragActiveRef.current=false;setDragging(false);setDx(0);if(p.onPreview)p.onPreview(null)}},
      h('span',{className:'card-corner-node card-corner-node--tl','aria-hidden':true}),
      h('span',{className:'card-corner-node card-corner-node--tr','aria-hidden':true}),
      h('span',{className:'card-corner-node card-corner-node--bl','aria-hidden':true}),
      h('span',{className:'card-corner-node card-corner-node--br','aria-hidden':true}),
      specBg?h('div',{className:'card-img-bg'+(bgFeature?' is-feature':''),style:{backgroundImage:'url('+specBg+')'}}):h('div',{className:'card-default-wm','aria-hidden':true}),
      glitchOn&&h('div',{style:{background:'rgba(255,60,60,.08)',border:'1px solid rgba(255,60,60,.25)',padding:'3px 8px',fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#ff4444',letterSpacing:2,textAlign:'center',marginBottom:4,textTransform:'uppercase',animation:'glitchText 0.15s ease 3'}},'SYSTEM ERROR — UNREGISTERED PROTOCOL'),
      h('div',{className:'card-hdr'},h('span',{className:'card-hdr-l'},glitchOn?'ERR:0x8F2A':card.isFacilityProposal?tt('card.facilityExpansion',null,'시설 확장'):tt('card.oracleComm',null,'ORACLE 통신')),h('span',{className:'card-hdr-r'},glitchOn?'██████':tt('card.priority',{priority:plbl},'우선순위: '+plbl))),
      timerTotal>0&&!chosen&&h('div',{style:{background:'rgba(255,60,60,.08)',border:'1px solid '+(remaining<=2?'rgba(255,60,60,.8)':'rgba(240,160,48,.4)'),padding:'4px 8px',fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:remaining<=2?'#ff4444':'#f0a030',letterSpacing:1.5,textAlign:'center',marginBottom:4,textTransform:'uppercase',display:'flex',alignItems:'center',gap:8}},
        h('span',{style:{flexShrink:0}},'⚠ AUTO-OVERRIDE'),
        h('div',{style:{flex:1,height:6,background:'rgba(0,0,0,.4)',borderRadius:2,overflow:'hidden'}},
          h('div',{style:{height:'100%',width:Math.max(0,Math.min(100,(remaining/(timerTotal||1))*100))+'%',background:remaining<=2?'#ff4444':'#f0a030',transition:'width 0.1s linear, background 0.2s'}})),
        h('span',{style:{flexShrink:0,fontVariantNumeric:'tabular-nums'}},Math.ceil(remaining)+'s')
      ),
      h('div',{className:'card-msg'+(msgDense?' card-msg--dense':'')},function(){
        var rawMsg=(cardLoc&&cardLoc.msg!=null?resolveVal(cardLoc.msg):(typeof card.msg==='function'?card.msg():(card.msg||'')));var paras=String(rawMsg||'').split('\n\n');
        return paras.map(function(para,pi){
          var lines=para.split('\n');
          return h('div',{key:pi,style:{marginBottom:pi<paras.length-1?10:0}},
            lines.map(function(line,li){
              var s=line.trim();if(!s)return null;
              // [ORACLE ...] 대괄호 스타일
              if(s.match(/^\[ORACLE[\s:：]/))return h('div',{key:li,style:{color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:12,padding:'6px 10px',margin:'4px 0',background:'rgba(var(--ui-rgb),.06)',borderLeft:'2px solid rgba(var(--ui-rgb),.32)',borderRadius:2}},s);
              // ORACLE 분석/권고/통신 등 (대괄호 없는 ORACLE 라인)
              if(s.match(/^ORACLE[\s]/))return h('div',{key:li,style:{color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:12,padding:'4px 0',margin:'2px 0'}},s);
              // 캐릭터 대사 — 이름(+직책/수식어) + 콜론
              if(s.match(/^(서하은|강도윤|윤세진|임재혁|박소영|마르쿠스 베버|닉 포스터|포스터)([\s\u00A0][\uAC00-\uD7A3A-Za-z\s]*)?[：:]/))return h('div',{key:li,style:{color:'#7ec8e3',padding:'3px 0',margin:'2px 0'}},s);
              // "인용문" — 쌍따옴표로 시작하는 독립 대사
              if(s.match(/^["\u201C\u300C]/)&&s.match(/["\u201D\u300D]$/))return h('div',{key:li,style:{color:'#a0d8a0',fontStyle:'italic',padding:'2px 0'}},s);
              // 일반 텍스트
              return h('div',{key:li,style:{padding:'1px 0'}},s);
            }));
        });
      }()),
      inlineCardHint&&h('div',{style:{marginTop:8,padding:'6px 10px',background:'rgba(var(--ui-rgb),.06)',borderLeft:'2px solid rgba(var(--ui-rgb),.3)',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui)',letterSpacing:0.5}},inlineCardHint),
      card.isFacilityProposal&&h('div',{style:{marginTop:'auto',padding:'7px 10px',background:'rgba(var(--ui-rgb),.055)',border:'1px solid rgba(var(--ui-rgb),.28)',fontFamily:"'Share Tech Mono',monospace",color:'var(--ui)',letterSpacing:1.2,textTransform:'uppercase'}},
        h('div',{style:{fontSize:9,letterSpacing:2,textAlign:'center'}},'FACILITY PROPOSAL'),
        facilityCardHint&&h('div',{style:{fontSize:10,lineHeight:1.5,letterSpacing:.3,color:'rgba(var(--ui-rgb),.72)',textAlign:'center',marginTop:4,textTransform:'none'}},facilityCardHint)),
      (leftFx||rightFx)&&h('div',{style:{marginTop:card.isFacilityProposal?8:'auto',padding:'10px 0 6px',borderTop:'1px solid rgba(var(--ui-rgb),.08)'}},
        h('div',{style:{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',fontFamily:"'Share Tech Mono',monospace",fontSize:'var(--fs-fx)',columnGap:10,rowGap:3,alignItems:'center'}},
          h('div',{style:{display:'flex',gap:6,rowGap:3,flexWrap:'wrap',alignItems:'center',justifyContent:'flex-start',textAlign:'left',opacity:0.86}},h('span',{style:{color:'rgba(var(--ui-rgb),.5)',fontSize:9,flexShrink:0}},'←'),leftFx||h('span',{style:{color:'rgba(var(--ui-rgb),.3)'}},'—')),
          h('div',{style:{display:'flex',gap:6,rowGap:3,flexWrap:'wrap',alignItems:'center',justifyContent:'flex-end',textAlign:'right',opacity:0.86}},rightFx||h('span',{style:{color:'rgba(var(--ui-rgb),.3)'}},'—'),h('span',{style:{color:'rgba(var(--ui-rgb),.5)',fontSize:9,flexShrink:0}},'→')))),
      h('div',{style:{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',paddingTop:14,paddingBottom:8,borderTop:'1px solid rgba(var(--ui-rgb),.1)',fontFamily:"'Share Tech Mono',monospace",fontSize:'var(--fs-choice)',lineHeight:1.55,pointerEvents:'none',columnGap:16,alignItems:'start'}},
        h('div',{style:{minWidth:0,textAlign:'left'}},
          h('span',{style:{color:'rgba(var(--ui-rgb),.5)',display:'block',lineHeight:1.55}},'← '+leftLabel),
          leftTrace&&h('div',{style:{display:'flex',flexWrap:'wrap',gap:5,marginTop:7,opacity:.72}},leftTrace)),
        h('div',{style:{minWidth:0,textAlign:'right'}},
          h('span',{style:{color:'rgba(var(--ui-rgb),.5)',display:'block',width:'100%',justifySelf:'end',lineHeight:1.55}},rightLabel+' →'),
          rightTrace&&h('div',{style:{display:'flex',flexWrap:'wrap',gap:5,marginTop:7,justifyContent:'flex-end',opacity:.72}},rightTrace)))
    ));
}
function News(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  var headlines=uniqueHeadlines(p.headlines);
  useEffect(function(){if(shown<headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,headlines.length]);
  var parseHL=function(raw){var s=String(raw||'');var isGl=s.indexOf('분류 오류')>=0;var isDel=s.indexOf('삭제됨')>=0;if(isGl||isDel)return{tag:'REDACTED',text:s,gl:true};if(s.indexOf('[해외]')>=0){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:s.replace('[해외] ',''),gl:false}}if(s.indexOf('[국내]')>=0){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:s.replace('[국내] ',''),gl:false}}return{tag:'INTEL-01',text:s,gl:false}};
  var st=p.stats||{};var gi=p.gi||0;var act=p.act||1;
  var AP={h:["운영 효율 양호. 현행 유지 권고.","ORACLE 권고 이행률 우수. 한국 지부 성과 상위권.","지휘관 판단 신뢰도 높음. 현 운영 방침 유지.","기지 안정성 확인. 추가 권한 부여 검토 중."],m:["운영 안정. 일부 비표준 패턴 감지.","전반적 안정. 독립적 판단 빈도 소폭 증가.","기지 운영 정상 범위. 일부 지표 변동 주시 중.","ORACLE 권고 이행률 보통. 관찰 지속."],l:["비표준 판단 빈도 증가. 모니터링 강화.","독자적 의사결정 패턴 감지. 분석 중.","ORACLE 권고 이탈 빈도 상승. 기록 중.","운영 데이터 분석 — 비표준 항목 다수 확인."],v:["비표준 운영 패턴 다수 감지. 주의 요망.","지휘관 신뢰 지표 하락 중. 재평가 예정.","ORACLE 권고 무시 빈도 위험 수준 접근.","운영 이상 감지. 본부 보고 검토 중."]};
  var aPool=gi>=40?AP.h:gi>=10?AP.m:gi>=0?AP.l:AP.v;var assess=stablePickFromPool(aPool,[p.day,act,gi,st.c,st.r,st.t,st.o,headlines.join('|')].join('|'));
  var statBar=function(k,v,nm){var d=v<=20;return h('div',{key:k,style:{display:'flex',alignItems:'center',gap:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10}},h('span',{style:{color:'rgba(var(--ui-rgb),.55)',width:24}},nm),h('div',{style:{flex:1,height:3,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}},h('div',{style:{position:'absolute',top:0,bottom:0,left:0,width:v+'%',background:d?'rgba(255,68,68,.65)':'rgba(var(--ui-rgb),.55)',transition:'width 0.4s'}})),h('span',{style:{color:d?'#ff4444':'rgba(var(--ui-rgb),.6)',width:20,textAlign:'right',fontSize:9}},v))};
  return h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,padding:'20px 22px 16px',cursor:'default',marginTop:'auto',marginBottom:'auto',display:'flex',flexDirection:'column',maxHeight:'calc(100vh - 60px)',overflow:'hidden'}},
    h('div',{className:'oracle-card__glow'}),
    h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:1}},'[ORACLE // DAILY REPORT]'),
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.5)',letterSpacing:1}},'ACT '+act)),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',fontWeight:'bold',marginBottom:10,letterSpacing:1,borderBottom:'1px solid rgba(var(--ui-rgb),.15)',paddingBottom:8,flexShrink:0}},'DAY '+(p.day||'?')+' REPORT'),
    h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},'[STATUS OVERVIEW]'),
        h('div',{style:{display:'flex',flexDirection:'column',gap:4}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'봉쇄')),statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'자원')),statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'신뢰')),statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'평가'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},'[SITUATION REPORT]'),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('⚠')>=0;
            return h('div',{key:'sit-'+i,style:{fontSize:11,lineHeight:1.6,color:isWarn?'#ff8844':'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:'fadeIn 0.4s ease'}},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},'[INTEL BRIEFING]'),
      headlines.slice(0,shown).map(function(l,i){var hl=parseHL(l);return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)',animation:'fadeIn 0.4s ease'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
        h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'var(--ui-text)'}},hl.text))}),
      shown>=headlines.length&&typeof FacilityStatusSection==='function'&&h(FacilityStatusSection,{stats:p.stats,facility:p.facility})),
    shown>=headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ 다음 사이클 진행 ]'))));
}
function NewsReport(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  var headlines=uniqueHeadlines(p.headlines);
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  useEffect(function(){if(shown<headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,headlines.length]);
  var parseHL=function(raw){
    var s=String(raw||'');
    var view=(locale==='en'&&typeof tc==='function')?((typeof NEWS_ID_BY_TEXT!=='undefined'&&NEWS_ID_BY_TEXT[s]?tc('newsItems',NEWS_ID_BY_TEXT[s],null):null)||tc('newsItems',s,null)):null;
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
  var assess=stablePickFromPool(aPool,[p.day,act,gi,st.c,st.r,st.t,st.o,headlines.join('|'),locale].join('|'));
  var statBar=function(k,v,nm){
    var d=v<=20;
    return h('div',{key:k,style:{display:'grid',gridTemplateColumns:'76px minmax(0,1fr) 28px',alignItems:'center',columnGap:8,fontFamily:"'Share Tech Mono',monospace",fontSize:10}},
      h('span',{style:{color:'rgba(var(--ui-rgb),.72)',minWidth:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},nm),
      h('div',{style:{position:'relative',minWidth:0,height:7,background:'rgba(var(--ui-rgb),.1)',border:'1px solid rgba(var(--ui-rgb),.2)',borderRadius:2,overflow:'hidden'}},
        h('div',{style:{position:'absolute',top:0,bottom:0,left:0,width:v+'%',background:d?'rgba(255,68,68,.65)':'rgba(var(--ui-rgb),.55)',transition:'width 0.4s'}})),
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
      'FE-001':'Cryostorage Expansion','FE-002':'Outdoor Training Yard and Support Facility','FE-003':'High-Sensitivity Sensor Array','FE-004':'Medical Wing Expansion',
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
      comp.forEach(function(feId){var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' — online',color:'green'})});
      appr.forEach(function(feId){if(comp.indexOf(feId)>=0)return;var fe=typeof FACILITY_EXPANSIONS!=='undefined'?FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0]:null;if(fe)lines.push({text:feName(fe)+' — expansion pending',color:'gray'})});
      if(lines.length===0)lines.push({text:'All sectors operating normally',color:'green'});
    }else{
      if(typeof getFacilityStatusLines!=='function')return null;
      lines=getFacilityStatusLines(st,comp,appr)||[];
      if(!lines.length)return null;
    }
    return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionFacility',null,'[FACILITY STATUS]')),
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
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionStatus',null,'[STATUS OVERVIEW]')),
        h('div',{style:{display:'flex',flexDirection:'column',gap:5}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'Containment')),
          statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'Resources')),
          statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'Trust')),
          statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'Evaluation'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionSituation',null,'[SITUATION REPORT]')),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('⚠')>=0;
            return h('div',{key:'sit-'+i,style:{fontSize:11,lineHeight:1.6,color:isWarn?'#ff8844':'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:'fadeIn 0.4s ease'}},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionIntel',null,'[INTEL BRIEFING]')),
      headlines.slice(0,shown).map(function(l,i){
        var hl=parseHL(l);
        return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)',animation:'fadeIn 0.4s ease'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
          h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'var(--ui-text)'}},hl.text))
      }),
      shown>=headlines.length&&facilitySection),
    shown>=headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ PROCEED TO NEXT CYCLE ]'))));
}
function NewsReport2(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  var headlines=uniqueHeadlines(p.headlines);
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  useEffect(function(){if(shown<headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,headlines.length]);
  var parseHL=function(raw){
    var s=String(raw||'');
    var view=(locale==='en'&&typeof tc==='function')?((typeof NEWS_ID_BY_TEXT!=='undefined'&&NEWS_ID_BY_TEXT[s]?tc('newsItems',NEWS_ID_BY_TEXT[s],null):null)||tc('newsItems',s,null)):null;
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
  var assess=stablePickFromPool(aPool,[p.day,act,gi,st.c,st.r,st.t,st.o,headlines.join('|'),locale].join('|'));
  var statBar=function(k,v,nm){
    var d=v<=20;
    return h('div',{key:k,style:{display:'grid',gridTemplateColumns:'76px minmax(0,1fr) 28px',alignItems:'center',columnGap:8,fontFamily:"'Share Tech Mono',monospace",fontSize:10}},
      h('span',{style:{color:'rgba(var(--ui-rgb),.72)',minWidth:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},nm),
      h('div',{style:{position:'relative',minWidth:0,height:7,background:'rgba(var(--ui-rgb),.1)',border:'1px solid rgba(var(--ui-rgb),.2)',borderRadius:2,overflow:'hidden'}},
        h('div',{style:{position:'absolute',top:0,bottom:0,left:0,width:v+'%',background:d?'rgba(255,68,68,.65)':'rgba(var(--ui-rgb),.55)',transition:'width 0.4s'}})),
      h('span',{style:{color:d?'#ff4444':'rgba(var(--ui-rgb),.78)',width:28,textAlign:'right',fontSize:9}},v)
    );
  };
  var facilitySection=(function(){
    var fac=p.facility||{},comp=fac.completed||[],appr=fac.approved||[],lines=[];
    var cm={red:'#ff4444',orange:'#f0a030',green:'var(--ui)',gray:'rgba(var(--ui-rgb),.4)'};
    var feNameMapEn={
      'FE-001':'Cryostorage Expansion','FE-002':'Outdoor Training Yard and Support Facility','FE-003':'High-Sensitivity Sensor Array','FE-004':'Medical Wing Expansion',
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
    return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionFacility',null,'[FACILITY STATUS]')),
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
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionStatus',null,'[STATUS OVERVIEW]')),
        h('div',{style:{display:'flex',flexDirection:'column',gap:5}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'Containment')),
          statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'Resources')),
          statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'Trust')),
          statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'Evaluation'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionSituation',null,'[SITUATION REPORT]')),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('⚠')>=0;
            return h('div',{key:'sit-'+i,style:{fontSize:11,lineHeight:1.6,color:isWarn?'#ff8844':'var(--ui-text)',fontFamily:"'Share Tech Mono',monospace",padding:'2px 0',animation:'fadeIn 0.4s ease'}},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionIntel',null,'[INTEL BRIEFING]')),
      headlines.slice(0,shown).map(function(l,i){
        var hl=parseHL(l);
        return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)',animation:'fadeIn 0.4s ease'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
          h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'var(--ui-text)'}},hl.text))
      }),
      shown>=headlines.length&&facilitySection),
    shown>=headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ PROCEED TO NEXT CYCLE ]'))));
}
function NewsReport3(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  var headlines=uniqueHeadlines(p.headlines);
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  useEffect(function(){if(shown<headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,headlines.length]);
  useEffect(function(){var onKey=function(e){if(shown>=headlines.length&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.onContinue()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[shown,headlines.length]);
  var resolveNewsView=function(raw){
    if(locale!=='en')return null;
    var s=String(raw||'');
    if(typeof tc==='function'){
      if(typeof NEWS_ID_BY_TEXT!=='undefined'&&NEWS_ID_BY_TEXT[s]){
        var byId=tc('newsItems',NEWS_ID_BY_TEXT[s],null);
        if(byId&&byId.text)return byId;
      }
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
    var isGl=type==='redacted'||s.indexOf('분류 오류')>=0||s.indexOf('[삭제됨]')>=0||s.indexOf('[DELETED]')>=0;
    if(isGl)return{tag:'REDACTED',text:body,gl:true};
    if(s.indexOf('[CLASSIFICATION HOLD]')===0)return{tag:'CLASSIFIED',text:body.replace('[CLASSIFICATION HOLD] ',''),gl:false};
    if(s.indexOf('[INTERNAL]')===0)return{tag:'INTERNAL',text:body.replace('[INTERNAL] ',''),gl:false};
    if(s.indexOf('[WARNING]')===0)return{tag:'WARNING',text:body.replace('[WARNING] ',''),gl:false};
    if(type==='foreign'||s.indexOf('[해외]')===0||/^\[overseas\]/i.test(s)){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:body.replace('[해외] ','').replace(/^\[overseas\]\s*/i,''),gl:false}};
    if(type==='domestic'||s.indexOf('[국내]')===0||/^\[domestic\]/i.test(s)){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:body.replace('[국내] ','').replace(/^\[domestic\]\s*/i,''),gl:false}};
    return{tag:'INTEL-01',text:body,gl:false};
  };
  var st=p.stats||{};var gi=p.gi||0;var act=p.act||1;
  var reportMono="'Share Tech Mono','Noto Sans KR',monospace";
  var reportBody={fontFamily:reportMono,fontSize:11,lineHeight:1.65,color:'rgba(var(--ui-rgb),.84)',letterSpacing:.15};
  var AP={
    h:[tt('news.assess.high1',null,'Operational efficiency stable. Maintain current directive.'),tt('news.assess.high2',null,'High compliance with ORACLE advisories. Korea Branch performance remains above average.'),tt('news.assess.high3',null,'Commander trust index elevated. Expanded authority under review.'),tt('news.assess.high4',null,'Branch stability reconfirmed. Additional clearance being considered.')],
    m:[tt('news.assess.mid1',null,'Operations stable. Minor nonstandard signals detected.'),tt('news.assess.mid2',null,'Overall conditions nominal. Decision variance among personnel has slightly increased.'),tt('news.assess.mid3',null,'Branch remains within normal bounds. Select indicators under observation.'),tt('news.assess.mid4',null,'Average ORACLE compliance rate. Continued monitoring advised.')],
    l:[tt('news.assess.low1',null,'Nonstandard decision frequency increasing. Monitoring intensified.'),tt('news.assess.low2',null,'Independent command patterns detected. Analysis ongoing.'),tt('news.assess.low3',null,'Repeated deviation from ORACLE advisories logged.'),tt('news.assess.low4',null,'Several nonstandard operational markers identified in branch telemetry.')],
    v:[tt('news.assess.veryLow1',null,'Multiple abnormal operational patterns detected. Caution advised.'),tt('news.assess.veryLow2',null,'Commander trust index declining. Reassessment pending.'),tt('news.assess.veryLow3',null,'ORACLE advisory override frequency entering risk threshold.'),tt('news.assess.veryLow4',null,'Operational anomaly detected. Headquarters review under consideration.')]
  };
  var aPool=gi>=40?AP.h:gi>=10?AP.m:gi>=0?AP.l:AP.v;
  var assess=stablePickFromPool(aPool,[p.day,act,gi,st.c,st.r,st.t,st.o,headlines.join('|'),locale].join('|'));
  var statBar=function(k,v,nm){
    var d=v<=20;
    return h('div',{key:k,style:{display:'grid',gridTemplateColumns:'96px minmax(0,1fr) 32px',alignItems:'center',columnGap:10,fontFamily:"'Share Tech Mono',monospace",fontSize:10,lineHeight:1.2}},
      h('span',{style:{color:'rgba(var(--ui-rgb),.72)',minWidth:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',paddingRight:2}},nm),
      h('div',{style:{position:'relative',minWidth:0,height:7,background:'rgba(var(--ui-rgb),.1)',border:'1px solid rgba(var(--ui-rgb),.2)',borderRadius:2,overflow:'hidden'}},
        h('div',{style:{position:'absolute',top:0,bottom:0,left:0,width:v+'%',background:d?'rgba(255,68,68,.65)':'rgba(var(--ui-rgb),.55)',transition:'width 0.4s'}})),
      h('span',{style:{color:d?'#ff4444':'rgba(var(--ui-rgb),.78)',width:32,textAlign:'right',fontSize:9}},v)
    );
  };
  var facilitySection=(function(){
    var fac=p.facility||{},comp=fac.completed||[],appr=fac.approved||[],lines=[];
    var cm={red:'#ff6644',orange:'#f0a030',green:'rgba(var(--ui-rgb),.82)',gray:'rgba(var(--ui-rgb),.48)'};
    var feNameMapEn={
      'FE-001':'Cryostorage Expansion','FE-002':'Outdoor Training Yard and Support Facility','FE-003':'High-Sensitivity Sensor Array','FE-004':'Medical Wing Expansion',
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
    return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionFacility',null,'[FACILITY STATUS]')),
      lines.map(function(line,i){
        return h('div',{key:'fac-'+i,style:Object.assign({},reportBody,{color:cm[line.color]||'rgba(var(--ui-rgb),.78)',padding:'2px 0',animation:line.blink?'blink 1s infinite':'fadeIn 0.4s ease'})},'▸ '+line.text)
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
      h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionStatus',null,'[STATUS OVERVIEW]')),
        h('div',{style:{display:'flex',flexDirection:'column',gap:6}},
          statBar('c',(st.c==null?50:st.c),tt('stats.c',null,'Containment')),
          statBar('r',(st.r==null?60:st.r),tt('stats.r',null,'Resources')),
          statBar('t',(st.t==null?50:st.t),tt('stats.t',null,'Trust')),
          statBar('o',(st.o==null?40:st.o),tt('stats.o',null,'Evaluation'))),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(var(--ui-rgb),.55)',marginTop:8,fontStyle:'italic'}},assess)),
      (function(){
        var sitLines=typeof getSituationLines==='function'?getSituationLines(st,p.prevStats||null,act):[];
        if(sitLines.length===0)return null;
        return h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionSituation',null,'[SITUATION REPORT]')),
          sitLines.map(function(line,i){
            var isWarn=line.indexOf('경고')>=0||line.indexOf('warning')>=0||line.indexOf('CRITICAL')>=0;
            return h('div',{key:'sit-'+i,style:Object.assign({},reportBody,{color:isWarn?'#ff8844':'rgba(var(--ui-rgb),.82)',padding:'2px 0',animation:'fadeIn 0.4s ease'})},line)
          }))
      })(),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.62)',letterSpacing:1,marginBottom:6}},tt('news.sectionIntel',null,'[INTEL BRIEFING]')),
      headlines.slice(0,shown).map(function(l,i){
        var hl=parseHL(l);
        return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(var(--ui-rgb),.13)',animation:'fadeIn 0.4s ease'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
          h('div',{style:Object.assign({},reportBody,{color:hl.gl?'#ff6644':'rgba(var(--ui-rgb),.86)'})},hl.text))
      }),
      shown>=headlines.length&&facilitySection),
    shown>=headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(var(--ui-rgb),.12)',flexShrink:0}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},tt('news.nextCycle',null,'[ PROCEED TO NEXT CYCLE ]'))));
}
function GameOver(p){
  useEffect(function(){var onKey=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();p.onRestart()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[]);
  var msg=p.gi>50?tt('gameOver.msgHigh',null,"요원의 헌신적 복무에 감사드립니다."):p.gi>25?tt('gameOver.msgMid',null,"세션이 종료됩니다. 결과가 기록되었습니다."):tt('gameOver.msgLow',null,"비표준 운영 패턴 감지. 세션 데이터 분석 중...");
  var narr=p.endNarr;
  if(p.endId&&typeof tc==='function'){
    var endView=tc('endings',p.endId,null);
    if(endView)narr=Object.assign({},narr||{},endView);
  }
  var resultDay=(p.resultDay||(p.stats&&p.stats.day)||'?');
  var sessionNo=(p.sessions||0)+1;
  var statNames={c:tt('stats.c',null,'Containment'),r:tt('stats.r',null,'Resources'),t:tt('stats.t',null,'Trust'),o:tt('stats.o',null,'Evaluation')};
  var eImg=(p.endImg&&IMG[p.endImg])||(p.endId?IMG['ending_'+p.endId]:null);
  if(!eImg){var _eid=p.endId||'',_rsn=p.reason||'';if(_eid.indexOf('C_c')===0||/봉쇄|Containment/i.test(_rsn))eImg=IMG.ending_C_c;else if(_eid==='C_r'||/자원|Resource/i.test(_rsn))eImg=IMG.ending_C_r;else if(_eid==='C_t'||/신뢰|Trust/i.test(_rsn))eImg=IMG.ending_C_t;else if(_eid==='C_o'||/평가|접속|Evaluation|ORACLE access/i.test(_rsn))eImg=IMG.ending_C_o;}
  var isNarr=!!(narr&&narr.narrative);
  var endName=(narr&&narr.name)||p.reason||'SESSION CLOSED';
  var header=h('div',{className:'bf-head'},
    h('div',{className:'bf-head-side'},'ORACLE',h('br'),'// SESSION',h('br'),'CLOSED'),
    h('div',{className:'bf-head-c'},h('div',{className:'bf-head-tag'},'FINAL RECORD'),h('div',{className:'bf-head-acts'},h('b',null,'SESSION #'+sessionNo))),
    h('div',{className:'bf-head-side bf-head-r'},h('div',{className:'bf-head-prio'},'RESULT DAY',h('br'),h('b',null,String(resultDay))),h('div',{className:'bf-head-bars'},[0,1,2,3].map(function(i){return h('i',{key:i,className:'on'})}))));
  var hero=h('div',{className:'bf-hero go-hero'},
    eImg&&h('img',{src:eImg,alt:endName,className:'bf-hero-img'}),
    h('div',{className:'bf-hero-grad'}),h('div',{className:'bf-hero-scan'}),
    h('div',{className:'go-archived'},h('span',{className:'bf-hero-recdot'}),'ARCHIVED'),
    h('div',{className:'go-hero-tag'},isNarr?'ENDING':'TERMINATED'),
    h('div',{className:'go-ending-name'},endName),
    h('div',{className:'go-hero-day'},tt('gameOver.resultDay',{day:resultDay},'발생 DAY: '+resultDay)),
    h('span',{className:'bf-corner tl'}),h('span',{className:'bf-corner tr'}),h('span',{className:'bf-corner bl'}),h('span',{className:'bf-corner br'}));
  var body;
  if(isNarr){
    body=h('div',{className:'bf-panel'},
      h('div',{className:'bf-panel-h'},'// FINAL TRANSMISSION',h('span',null,'SESSION #'+sessionNo)),
      h('div',{className:'go-narr'},narr.narrative.map(function(l,i){var isCmd=l.indexOf('>')===0||l.indexOf('[')===0;var isEmpty=l==='';return h('div',{key:i,className:isCmd?'go-narr-cmd':'go-narr-line',style:{minHeight:isEmpty?10:'auto'}},isEmpty?' ':l)})));
  }else{
    body=h('div',{className:'bf-panel'},
      h('div',{className:'bf-panel-h'},tt('gameOver.reportSection',null,'ORACLE 최종 보고'),h('span',null,tt('gameOver.duration',{days:p.stats.day},'DAY '+p.stats.day))),
      p.reason&&h('div',{className:'go-reason'},p.reason),
      h('div',{className:'bf-gauges'},['c','r','t','o'].map(function(k){var v=p.stats[k];var low=v<=25;return h('div',{key:k,className:'bf-gauge'+(low?' low':'')},h('div',{className:'bf-gauge-top'},h('span',{className:'bf-gauge-lbl'},statNames[k]),h('span',{className:'bf-gauge-val'},v+'%')),h('div',{className:'bf-gauge-track'},h('div',{className:'bf-gauge-fill',style:{width:Math.max(0,Math.min(100,v))+'%'}})))})),
      h('div',{className:'go-msg'},'"'+msg+'"'),
      h('div',{className:'go-grant'},tt('gameOver.grant',null,'GRANT: ACTIVE — RENEWAL AVAILABLE')));
  }
  // ── SESSION LEDGER — 회차 요약 + 도감 진행 + 미도달 기록 티저 (다회차 유인)
  var _sum=p.runSummary||null;
  var _ends=p.endings||[];
  var _codex=null;
  if(typeof ENDING_CATALOG!=='undefined'){
    var _un={};_ends.forEach(function(id){_un[id]=1});
    var _vis=ENDING_CATALOG.filter(function(e){return !(e.hidden&&!_un[e.id])});
    var _got=_vis.filter(function(e){return _un[e.id]}).length;
    // 미도달 티저 — 최종 지표 기준 '가장 가까웠던' 축의 잠긴 엔딩 1건
    var _locked=_vis.filter(function(e){return !_un[e.id]&&e.category!=='failure'&&e.category!=='timeout'});
    var _gi=_sum?_sum.gi:(p.gi||0);var _st=p.stats||{};
    var _score=function(e){switch(e.id){case 'A':return _gi;case 'C_cs':case 'C_cst':return _st.c||0;case 'G':return 40-Math.abs(_gi-25);case 'H':return _st.t||0;case 'B':case 'D':case 'E':return 55-_gi;default:return 5}};
    _locked.sort(function(a,b){return _score(b)-_score(a)});
    _codex={total:_vis.length,got:_got,next:_locked[0]||null,lockedN:_vis.length-_got};
  }
  var _arch=null;
  if(typeof ARCHIVE_ENTRIES!=='undefined'&&Array.isArray(p.logs)){
    var _au=0;ARCHIVE_ENTRIES.forEach(function(en){try{if(en.unlock&&en.unlock(p.logs))_au++}catch(err){}});
    _arch={total:ARCHIVE_ENTRIES.length,got:_au};
  }
  var _nextHint=null;
  if(_codex&&_codex.next){
    var _nv=(typeof tc==='function')?tc('endings',_codex.next.id,_codex.next):_codex.next;
    _nextHint=(_nv&&_nv.hint)||_codex.next.hint;
  }
  var ledger=(_sum||_codex||_arch)&&h('div',{className:'bf-panel go-ledger'},
    h('div',{className:'bf-panel-h'},'// SESSION LEDGER',h('span',null,tt('gameOver.carryOver',null,'기록 이월'))),
    _sum&&h('div',{className:'go-ledger-strip'},
      h('div',{className:'go-ledger-cell'},h('span',{className:'go-ledger-k'},'DAY'),h('span',{className:'go-ledger-v'},String(_sum.day))),
      h('div',{className:'go-ledger-cell'},h('span',{className:'go-ledger-k'},'GI'),h('span',{className:'go-ledger-v'},String(_sum.gi))),
      h('div',{className:'go-ledger-cell'},h('span',{className:'go-ledger-k'},'LOG'),h('span',{className:'go-ledger-v'},String(_sum.logs))),
      h('div',{className:'go-ledger-cell'},h('span',{className:'go-ledger-k'},tt('gameOver.combos',null,'조합')),h('span',{className:'go-ledger-v'},String(_sum.combos)))),
    (_codex||_arch)&&h('div',{className:'go-codex-row'},
      _codex&&h('span',null,tt('gameOver.endingCodex',null,'엔딩 도감')+' '+_codex.got+'/'+_codex.total),
      _arch&&h('span',null,tt('gameOver.archiveRate',null,'아카이브')+' '+Math.round(_arch.got/Math.max(1,_arch.total)*100)+'%')),
    _nextHint&&h('div',{className:'go-next-hint',onClick:p.onEndings,style:{cursor:p.onEndings?'pointer':'default'}},
      '▸ '+tt('gameOver.nextRecord',{n:_codex.lockedN},'미도달 기록 '+_codex.lockedN+'건')+' — "'+_nextHint+'"'));
  var btns=h('div',{className:'go-btns'},
    h('button',{className:'btn bf-enter',onClick:p.onRestart},tt('gameOver.restart',null,'[ 세션 재개시 — ACT 1 ]')),
    h('div',{className:'go-btnrow'},p.onMainMenu&&h('button',{className:'btn',onClick:p.onMainMenu},tt('gameOver.mainMenu',null,'메인메뉴')),h('button',{className:'btn',onClick:p.onLogs},tt('gameOver.logs',null,'기록')),h('button',{className:'btn',onClick:p.onArchive},tt('gameOver.archive',null,'아카이브')),h('button',{className:'btn',onClick:p.onEndings},tt('gameOver.endings',null,'엔딩')),p.onAchievements&&h('button',{className:'btn',onClick:p.onAchievements},tt('gameOver.achievements',null,'업적'))));
  return h('div',{className:'screen bf-screen go-screen'},h('div',{className:'bf-wrap'},header,hero,body,ledger,btns));
}
function Tutorial(p){
  var s1=useState(0),step=s1[0],setStep=s1[1];
  var koSteps=[
    {lines:["ORACLE 인사 프로토콜을 개시합니다.","","환영합니다, PILEHEAD.","","당신은 ORACLE 한국 지부의","초대 지휘관으로 발령되었습니다.","","[검열됨] 전, 미지의 바이러스 EV-Σ가 출현했습니다.","감염체는 이변체로 변이하며,","전 세계 주요 도시가 봉쇄 중입니다."],choices:[{label:"계속",next:1}]},
    {lines:["[임무 브리핑]","","ORACLE은 프로메테우스를","적대 세력으로 분류하고 있습니다.","","당신의 임무:","▸ 봉쇄 구역 관리 및 이변체 대응","▸ 기지 운영 총괄","▸ ORACLE 지시 이행 및 외부 위협 감시","","간부진 4명이 당신을 보좌합니다."],choices:[{label:"계속",next:2}]},
    {lines:["4가지 핵심 지표를 관리합니다.","","{{icon-c}} 봉쇄 — 봉쇄선 유지도","{{icon-r}} 자원 — 식량, 의약품, 장비","{{icon-t}} 신뢰 — 기지 인원의 신뢰도","{{icon-o}} 평가 — ORACLE의 당신에 대한 평가","","어느 지표든 0이 되면 임무에 실패합니다.","봉쇄가 100에 도달해도 임무는 종료됩니다.","","← 왼쪽 / 오른쪽 →","카드를 밀어 선택하십시오.","카드를 끝까지 밀기 전에 기울이면, 지표 변동 예측이 표시됩니다."],choices:[{label:"게임 시작",next:-1}]}
  ];
  var i18nSteps=(typeof t==='function')?t('tutorial.steps'):null;
  var steps=(i18nSteps&&Array.isArray(i18nSteps))?i18nSteps:koSteps;
  var uiC=getComputedStyle(document.documentElement).getPropertyValue('--ui').trim()||'#33ff33';
  var koHL=[['PILEHEAD','#f0a030'],['ORACLE',uiC],['EV-Σ','#33cccc'],['이변체','#33cccc'],['프로메테우스','#ff6644'],['[검열됨]','#ff4444'],['봉쇄선',uiC],['봉쇄',uiC],['자원',uiC],['신뢰도',uiC],['신뢰',uiC],['평가',uiC]];
  var i18nHL=(typeof t==='function')?t('tutorial.highlights'):null;
  var enHL=(i18nHL&&Array.isArray(i18nHL))?i18nHL.map(function(w){var cm={'PILEHEAD':'#f0a030','ORACLE':uiC,'EV-Σ':'#33cccc','PROMETHEUS':'#ff6644','[REDACTED]':'#ff4444','Containment':uiC,'Resources':uiC,'Trust':uiC,'Evaluation':uiC};return[w,cm[w]||uiC]}):null;
  var HL=enHL||koHL;
  var hilite=function(txt){var ICON_MAP={'{{icon-c}}':'stat-icon-inline-c','{{icon-r}}':'stat-icon-inline-r','{{icon-t}}':'stat-icon-inline-t','{{icon-o}}':'stat-icon-inline-o'};var result=[];var s=txt;var ik;for(ik in ICON_MAP){while(s.indexOf(ik)>=0){var idx=s.indexOf(ik);if(idx>0)result.push(s.substring(0,idx));result.push(h('span',{key:'ic'+result.length,className:'stat-icon-inline '+ICON_MAP[ik]}));s=s.substring(idx+ik.length)}}if(result.length>0){if(s.length>0)result.push(s);txt=result}var inp=typeof txt==='string'?txt:null;if(!inp)return txt;var parts=[{t:inp,c:null}];HL.forEach(function(pair){var nw=[];parts.forEach(function(p){if(p.c){nw.push(p);return}var s=p.t,k=pair[0],idx=s.indexOf(k);while(idx>=0){if(idx>0)nw.push({t:s.substring(0,idx),c:null});nw.push({t:k,c:pair[1]});s=s.substring(idx+k.length);idx=s.indexOf(k)}if(s.length>0)nw.push({t:s,c:null})});parts=nw});return parts.map(function(p,i){return p.c?h('span',{key:i,style:{color:p.c,fontWeight:'bold',textShadow:'0 0 6px '+p.c+'44'}},p.t):p.t})};
  var st=steps[step];var s2=useState(0),shown=s2[0],setShown=s2[1];var s3=useState(false),bv=s3[0],setBv=s3[1];
  useEffect(function(){setShown(0);setBv(false)},[step]);
  useEffect(function(){if(shown<st.lines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},st.lines[shown]===''?150:80);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setBv(true)},400);return function(){clearTimeout(t2)}}},[shown,step]);
  useEffect(function(){var onKey=function(e){if(!bv)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();var c=st.choices[0];if(c){if(c.next===-1)p.onDone();else setStep(c.next)}}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[bv,step]);
  return h('div',{className:'screen bf-screen tut-screen'},
    h('div',{className:'bf-wrap',style:{maxWidth:440}},
      h('div',{className:'bf-panel tut-panel'},
        h('div',{className:'bf-panel-h'},'// ORACLE BRIEFING',h('span',null,(step+1)+' / '+steps.length)),
        h('div',{className:'tut-lines'},st.lines.slice(0,shown).map(function(l,i){var txt=String(l||' ');var isHeader=txt.indexOf('[')===0;var isIcon=txt.indexOf('{{icon-')>=0;var isList=txt.indexOf('▸')===0;var isLeft=txt.indexOf('←')===0&&txt.indexOf('→')<0;var isRight=txt.indexOf('→')===0;var isBothArrow=txt.indexOf('←')>=0&&txt.indexOf('→')>=0;var isCtrl=isLeft||isRight||isBothArrow;var col=isHeader?'#f0a030':isIcon?'#f0a030':isList?uiC:isCtrl?uiC:'#ccddcc';var sz=isHeader?12:isIcon?13:14;var al=isLeft?'left':isRight?'right':'center';return h('div',{key:step+'-'+i,style:{fontSize:sz,lineHeight:1.7,color:col,textAlign:al,fontFamily:(isHeader||isCtrl)?"'Share Tech Mono',monospace":'inherit',letterSpacing:isHeader?1:0,padding:isCtrl?'0 40px':0,animation:'fadeIn 0.3s ease'}},hilite(txt))})),
        h('span',{className:'bf-corner tl'}),h('span',{className:'bf-corner tr'}),h('span',{className:'bf-corner bl'}),h('span',{className:'bf-corner br'})),
      bv&&h('div',{className:'tut-actions'},st.choices.map(function(c,i){return h('button',{key:i,className:'btn bf-enter',onClick:function(){if(c.next===-1)p.onDone();else setStep(c.next)}},c.label)}),p.canSkip&&step===0&&h('button',{className:'btn tut-skip',onClick:p.onSkip},tt('tutorial.skip',null,'[ 튜토리얼 건너뛰기 ]')))));
}
function RewardScreen(p){
  var SN={c:tt('reward.c',null,'봉쇄'),r:tt('reward.r',null,'자원'),t:tt('reward.t',null,'신뢰'),o:tt('reward.o',null,'평가')};
  var count=4;if(p.stats.c<30||p.stats.r<30||p.stats.t<30||p.stats.o<30)count=3;if(p.stats.c<20||p.stats.r<20||p.stats.t<20||p.stats.o<20)count=2;if(p.stats.c<10||p.stats.r<10||p.stats.t<10||p.stats.o<10)count=1;
  var _scrollRef=useRef(null);
  var _sc=useState({top:false,bottom:false}),scrollHint=_sc[0],setScrollHint=_sc[1];
  var checkScroll=function(){var el=_scrollRef.current;if(!el)return;var st=el.scrollTop>4;var sb=el.scrollTop+el.clientHeight<el.scrollHeight-4;setScrollHint({top:st,bottom:sb})};
  useEffect(function(){var el=_scrollRef.current;if(!el)return;var t=setTimeout(checkScroll,100);el.addEventListener('scroll',checkScroll);return function(){clearTimeout(t);el.removeEventListener('scroll',checkScroll)}},[]);
  // 저자원/저스탯 보호: 임계(≤15) 스탯을 더 깎기만 하는 옵션만 제시되어 강제 게임오버로 몰리는 상황 방지.
  // 신규 생성 풀과 새로고침 복원 풀(ts_resumeRewards) 양쪽에 적용 → 구버전 세이브 복원 시에도 안전옵션 보장.
  var applySafeOption=function(pool){
    if(!Array.isArray(pool)||pool.length===0)return pool;
    ['c','r','t','o'].forEach(function(k){
      if(p.stats[k]==null||p.stats[k]>15)return;
      if(pool.some(function(r){return !r.fx||(r.fx[k]||0)>=0}))return;
      var ids=pool.map(function(r){return r.id});
      var safe=REWARDS.filter(function(r){return ids.indexOf(r.id)<0&&(!r.fx||(r.fx[k]||0)>=0)});
      if(safe.length>0)pool[pool.length-1]=safe[Math.floor(Math.random()*safe.length)];
    });
    return pool;
  };
  var buildRewardPool=function(){
    // 기본 풀 + 시설 완료 보너스 합산 후 랜덤 추출
    var basePool=REWARDS.slice();
    if(p.facility&&typeof REWARDS_FACILITY_BONUS!=='undefined'){var fac=p.facility;var rwOff=fac.rewardOff||[];REWARDS_FACILITY_BONUS.forEach(function(r){if(fac.completed.indexOf(r.feReq)>=0&&rwOff.indexOf(r.feReq)<0)basePool.push(r)})}
    var pool=pickRewardsUnique(basePool,count);
    // 시설 확장 리워드 삽입 (승인됨 & 미완료, 1회성)
    if(p.facility&&typeof FACILITY_EXPANSIONS!=='undefined'){
      var fac=p.facility;var feRewards=[];
      fac.approved.forEach(function(feId){
        if(fac.completed.indexOf(feId)>=0)return;
        var fe=FACILITY_EXPANSIONS.filter(function(f){return f.id===feId})[0];
        if(fe){var feView=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;feRewards.push({id:'R-'+fe.id,feId:fe.id,title:feView.rewardTitle,desc:feView.rewardDesc,benefit:feView.rewardBenefit,cost:feView.rewardCost,fx:fe.rewardFx})}});
      if(feRewards.length>0){var keepBase=Math.max(0,count-Math.min(feRewards.length,count));pool=pool.slice(0,keepBase).concat(feRewards.slice(0,count))}
    }
    return pool;
  };
  var s0=useState(function(){var base=(Array.isArray(p.initialRewards)&&p.initialRewards.length>0)?p.initialRewards.slice():buildRewardPool();return applySafeOption(base)}),av=s0[0];var s1=useState(-1),sel=s1[0],setSel=s1[1];
  useEffect(function(){if(p.onRewardsReady)p.onRewardsReady(av)},[]);
  useEffect(function(){var onKey=function(e){
    var idx=-1;
    if(/^[1-9]$/.test(e.key))idx=parseInt(e.key,10)-1;
    else if(e.code&&/^Numpad[1-9]$/.test(e.code))idx=parseInt(e.code.slice(6),10)-1;
    else if(e.key==='ArrowDown'){e.preventDefault();setSel(function(v){var nv=v<av.length-1?v+1:0;setTimeout(function(){var el=document.querySelector('.oracle-card.is-selected');if(el)el.scrollIntoView({block:'nearest',behavior:'smooth'})},50);return nv});return}
    else if(e.key==='ArrowUp'){e.preventDefault();setSel(function(v){var nv=v>0?v-1:av.length-1;setTimeout(function(){var el=document.querySelector('.oracle-card.is-selected');if(el)el.scrollIntoView({block:'nearest',behavior:'smooth'})},50);return nv});return}
    if(idx>=0&&idx<av.length){e.preventDefault();setSel(idx);return}
    if((e.key==='Enter'||e.key===' ')&&sel>=0&&av[sel]){e.preventDefault();p.onPick(av[sel])}
  };window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[av,sel]);
  var previewDelta=function(r){return p.getRewardPreviewDelta?p.getRewardPreviewDelta(r):(r.fx||{})};
  var previewValue=function(fx,k){return fx&&fx.__delta?(fx[k]||0):((fx&&fx[k]||0)*5)};
  var dangerC=av.some(function(r){var pd=previewDelta(r);return p.stats.c+previewValue(pd,'c')>=100});
  var fxList=function(fx){var pos=[],neg=[];['c','r','t','o'].forEach(function(k){var v=previewValue(fx,k);if(v>0)pos.push({k:k,v:v});if(v<0)neg.push({k:k,v:v})});return{pos:pos,neg:neg}};
  var miniBar=function(fx){return h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:4,marginTop:8}},
    ['c','r','t','o'].map(function(k){var cur=p.stats[k];var chg=previewValue(fx,k);var nxt=Math.max(0,Math.min(100,cur+chg));var isPos=chg>0;var isNeg=chg<0;
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
      av.map(function(r,i){var pd=previewDelta(r);var fl=fxList(pd);var isSel=sel===i;var willEnd=p.stats.c+previewValue(pd,'c')>=100;var rLoc=(typeof tc==='function')?tc('rewards',r.id,null):null;var rTitle=(rLoc&&rLoc.title)||r.title;var rDesc=(rLoc&&rLoc.desc)||r.desc;return h('div',{key:r.id,className:'oracle-card'+(isSel?' is-selected':''),onClick:function(){setSel(i)}},
        h('div',{className:'oracle-card__glow'}),
        h('span',{className:'oracle-card__tag'},r.feId?'FACILITY COMPLETE':'OPTION 0'+(i+1)),
        h('div',{className:'oracle-card__title'},rTitle),
        h('div',{className:'oracle-card__desc'},rDesc),
        h('div',{className:'oracle-card__effects'},
          fl.pos.map(function(e){var arrow=Math.abs(e.v)>=10?'▲▲':'▲';return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--pos'},arrow+' '+SN[e.k]+' +'+e.v)}),
          fl.neg.map(function(e){var arrow=Math.abs(e.v)>=10?'▼▼':'▼';return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--neg'},arrow+' '+SN[e.k]+' '+e.v)})
        ),
        miniBar(pd),
        isSel&&h('button',{className:'oracle-card__execute',onClick:function(e){e.stopPropagation();p.onPick(r)}},tt('reward.execute',null,'— EXECUTE —'))
      )}))
    ),
    h('div',{className:'footer-frame'},h('span',null,'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'))
  );
}
