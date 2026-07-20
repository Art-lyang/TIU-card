// TERMINAL SESSION — components-dialogue.js
// Dialogue, LogViewer, EndingScreen, FieldMission
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
var getDialogueOverlay=function(d){
  if(!d||!window.TS_I18N||window.TS_I18N.getLocale()!=='en'||typeof tc!=='function')return null;
  // id 우선(한국어 첫 줄을 고쳐도 번역이 안 끊김), 구 합성키는 폴백으로 유지
  if(d.id){var byId=tc('dialogues',d.id,null);if(byId)return byId;}
  var key=(d.char||'')+'|'+((d.lines&&d.lines[0])||'');
  return tc('dialogues',key,null);
};
var getDialogueName=function(d,overlay){
  if(overlay&&overlay.name)return overlay.name;
  if(window.TS_I18N&&window.TS_I18N.getLocale()==='en'){
    var nameMap={'서하은':'Seo Hae-eun','강도윤':'Kang Do-yun','윤세진':'Yoon Se-jin','임재혁':'Lim Jae-hyeok','박소영':'Park So-young','마르쿠스 베버':'Markus Weber','닉 포스터':'Nick Foster'};
    return nameMap[d.char]||d.char;
  }
  return d.char;
};
var getDialogueRole=function(d,overlay){
  if(overlay&&overlay.role)return overlay.role;
  if(window.TS_I18N&&window.TS_I18N.getLocale()==='en'){
    var roleMap={'부지휘관':'Deputy Commander','현장요원':'Field Operative','연구원':'Researcher','기술관':'Technical Officer','분석관':'Analyst','전술지휘관':'Tactical Commander','연구원 / 의료관':'Researcher / Medical Officer','정보분석관 / 기술관':'Intelligence / Technical Officer','부지휘관 / 데이터분석관':'Deputy Commander / Data Analyst'};
    return roleMap[d.role]||d.role;
  }
  return d.role;
};
function CharacterCommPanel(p){
  var info=(typeof getCharacterPanelInfo==='function')?getCharacterPanelInfo(p.nameKey||p.name,p.charKey,p.role):{image:p.portrait||null,code:'KR-B3-UNREG',bars:'||| || | |||| |||',role:p.role||''};
  var image=p.portrait||info.image;
  return h('div',{className:'comm-panel'},
    h('div',{className:'comm-panel__portrait'},
      image?h('img',{src:image,alt:p.displayName||p.name||p.nameKey||''}):h('div',{className:'comm-panel__empty'})),
    h('div',{className:'comm-panel__meta'},
      h('div',{className:'comm-panel__name'},p.displayName||p.name||p.nameKey||'UNKNOWN'),
      p.role&&h('div',{className:'comm-panel__role'},p.role),
      h('div',{className:'comm-panel__identity','aria-hidden':'true'},
        h('div',{className:'comm-panel__code'},'ID: '+info.code),
        h('div',{className:'comm-panel__bars'},info.bars))))
}
// 연결 인터스티셜 — 대화/현장 진입 전 짧은 '신호 수신' 연출 (BUILD 428)
// 게이트가 떠 있는 동안 preload URL을 미리 당겨 이미지 로드 시간을 벌고,
// 무거운 자식 트리 마운트도 게이트 뒤로 미뤄 저사양 기기 프레임 드랍을 가린다.
function ConnectingGate(p){
  var _on=useState(true),on=_on[0],setOn=_on[1];
  useEffect(function(){
    (p.preload||[]).forEach(function(u){if(u){try{var im=new Image();im.src=u}catch(e){}}});
    var t=setTimeout(function(){setOn(false)},p.ms||850);
    return function(){clearTimeout(t)};
  },[]);
  if(!on)return p.children||null;
  return h('div',{className:'screen'},
    h('div',{className:'conn-gate'},
      h('span',{className:'conn-gate-txt'},p.label||'[ 신호 수신 중 ... ]'),
      h('span',{className:'conn-gate-bar','aria-hidden':true})));
}
function Dialogue(p){
  var d=p.dialogue,overlay=getDialogueOverlay(d);
  var lines=(overlay&&overlay.lines)||d.lines;
  var choices=d.choices;
  if(overlay&&Array.isArray(overlay.choices)){
    choices=d.choices.map(function(base,i){
      var en=overlay.choices[i]||{};
      // KO base wins for fx/log/g/trust; EN overlay supplies label/reply/tag only.
      return Object.assign({},base,{
        label:en.label||base.label,
        reply:en.reply||base.reply,
        tag:en.tag||base.tag
      });
    });
  }
  var charName=getDialogueName(d,overlay);
  var charRole=getDialogueRole(d,overlay);
  var s1=useState(0),li=s1[0],setLi=s1[1];var s2=useState(false),sc=s2[0],setSc=s2[1];
  var s3=useState(-1),picked=s3[0],setPicked=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(''),rTxt=s5[0],setRTxt=s5[1];var s6=useState(false),rDone=s6[0],setRDone=s6[1];
  var textRef=useRef(null);var skipRef=useRef(false);
  useEffect(function(){setLi(0);setSc(false);setPicked(-1);setChosen(null);setRTxt('');setRDone(false)},[d]);
  useEffect(function(){if(li<lines.length){var t=setTimeout(function(){setLi(function(v){return v+1})},800);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setSc(true)},400);return function(){clearTimeout(t2)}}},[li,lines]);
  useEffect(function(){if(!chosen||!chosen.reply)return;var txt=chosen.reply;var i=0;skipRef.current=false;var t=setInterval(function(){if(skipRef.current){clearInterval(t);setRTxt(txt);skipRef.current=false;setTimeout(function(){setRDone(true)},150);return}if(i<txt.length){i++;setRTxt(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setRDone(true)},800)}},30);return function(){clearInterval(t)}},[chosen]);
  useEffect(function(){if(rDone&&chosen){var t=setTimeout(function(){p.onChoice(chosen)},1400);return function(){clearTimeout(t)}}},[rDone,chosen,p]);
  useEffect(function(){var el=textRef.current;if(el)el.scrollTop=el.scrollHeight},[li,rTxt,rDone,chosen]);
  var handlePick=function(c,i){if(picked>=0)return;setPicked(i);setTimeout(function(){setChosen(c)},500)};var skipReveal=function(){if(li<lines.length){setLi(lines.length);setSc(true);return}if(chosen&&!rDone){skipRef.current=true}};
  useEffect(function(){
    var onKey=function(e){
      if(!sc||picked>=0||chosen)return;
      var idx=-1;
      if(e.key==='1'||e.code==='Numpad1'||e.key==='ArrowLeft')idx=0;
      else if(e.key==='2'||e.code==='Numpad2'||e.key==='ArrowRight')idx=1;
      if(idx>=0&&choices[idx]){e.preventDefault();handlePick(choices[idx],idx)}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[sc,picked,chosen,choices]);
  return h('div',{className:'screen dialogue-screen',onClick:skipReveal,style:(li<lines.length||(chosen&&!rDone))?{cursor:'pointer'}:null},
    h('div',{className:'dlg-head'},
      h('span',{className:'dlg-head-l'},'ORACLE // COMM LINK'),
      h('span',{className:'dlg-head-r'},h('span',{className:'dlg-live'}),tt('dialogue.live',null,'LIVE'))),
    h(CharacterCommPanel,{nameKey:d.char,displayName:charName,role:charRole}),
    h('div',{className:'bf-panel dlg-panel'},
      h('div',{className:'bf-panel-h'},'// INCOMING TRANSMISSION',!sc&&!chosen?h('span',{className:'dlg-rcue'},'▶'):null),
      h('div',{className:'dialogue-scroll',ref:textRef},
        lines.slice(0,li).map(function(l,i){return h('div',{key:i,className:'dialogue-line'},String(l))}),
        chosen&&chosen.reply&&h('div',{className:'dialogue-reply'},rTxt,!rDone&&h('span',{style:{animation:'blink 1s infinite',marginLeft:2}},'▐')))),
    sc&&!chosen&&h('div',{className:'dialogue-choices'},
      choices.map(function(c,i){var isMe=picked===i;var isOther=picked>=0&&picked!==i;return h('button',{key:i,className:'dialogue-choice-btn'+(isMe?' is-picked':'')+(isOther?' is-dimmed':''),onClick:function(){handlePick(c,i)}},
        h('span',null,c.label))}))
  );
}
function LogViewer(p){
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isEn=locale==='en';
  var s1=useState(null),sel=s1[0],setSel=s1[1];
  var s2=useState(0),page=s2[0],setPage=s2[1];
  var s3=useState('all'),topic=s3[0],setTopic=s3[1];
  var sm=useState('db'),vmode=sm[0],setVmode=sm[1]; // 'db'=ORACLE 공식 기록 | 'journal'=지휘관 사적 메모
  // 초회 온보딩 — 시설/연구 탭과 동일 패턴(초회 자동 표시, 닫으면 ts_journalHelpSeen, ? 재열람)
  var help=useRlabHelp('ts_journalHelpSeen',false);
  var LJ=function(ko,en){return isEn?en:ko};
  var helpRows=[
    [LJ('공식 기록','DATABASE'),LJ('ORACLE 데이터베이스에 동기화된 공식 기록입니다. 해금된 LOG를 열람합니다.','Official records synced to the ORACLE database. Browse unlocked logs here.')],
    [LJ('지휘관 메모','JOURNAL'),LJ('ORACLE에 동기화되지 않는 사적 일지입니다. 선택·기록 갱신·현장 대응이 DAY별로 쌓이고, 하루 끝에 짧은 소회가 남습니다.','A private journal never synced to ORACLE. Choices, record updates, and field responses stack by day, each closed with a short note.')],
    [LJ('방향','DIRECTION'),LJ('이번 임기의 기류(부임 메모)와 루트·사건에 따라 일지의 결이 달라집니다. 회차가 끝난 뒤에도 남아 지난 세션을 돌아볼 수 있습니다.','The posting note, your route, and events shift the journal\'s tone. It survives the run\'s end so you can look back.')]
  ];
  var vLogs=ORACLE_LOGS.filter(function(l){return !(l.hidden&&p.unlockedIds.indexOf(l.id)<0)});var ulAll=ORACLE_LOGS.filter(function(l){return p.unlockedIds.indexOf(l.id)>=0}),lk=vLogs.length-ulAll.length;
  var LOG_TOPICS=[{k:'all',ko:'전체',en:'ALL'},{k:'spec',ko:'이변체',en:'SPECIMENS'},{k:'prom',ko:'프로메테우스',en:'PROMETHEUS'},{k:'oracle',ko:'ORACLE',en:'ORACLE'},{k:'people',ko:'인물',en:'PERSONNEL'},{k:'etc',ko:'기타',en:'OTHER'}];
  var SPEC_K=['SPEC-','이변체','CODENAME','관측 기록','마네킹','군체','포자','Brood','Spore','Shell Talker','Blood Pit'];
  var PROM_K=['프로메테우스','Prometheus','COASTAL MIRROR'];
  var ORC_K=['Observer','OBSERVER','미등록 레이어','미등록 인터페이스','관측 레이어','은폐','불일치','감시','은닉','필터링'];
  var PPL_K=['서하은','윤세진','임재혁','강도윤'];
  var anyIn=function(s,arr){for(var i=0;i<arr.length;i++){if(s.indexOf(arr[i])>=0)return true;}return false;};
  var classifyLog=function(l){var s=(l.id||'')+' '+(l.title||'')+' '+(l.content||'');
    if(anyIn(s,SPEC_K))return 'spec'; if(anyIn(s,PROM_K))return 'prom'; if(anyIn(s,ORC_K))return 'oracle'; if(anyIn(s,PPL_K))return 'people'; return 'etc';};
  var topicCount=function(k){return k==='all'?ulAll.length:ulAll.filter(function(l){return classifyLog(l)===k}).length;};
  var ul=(topic==='all')?ulAll:ulAll.filter(function(l){return classifyLog(l)===topic});
  var pageSize=10,totalPages=Math.max(1,Math.ceil(ul.length/pageSize));
  var safePage=Math.max(0,Math.min(page,totalPages-1));
  var pageLogs=ul.slice(safePage*pageSize,safePage*pageSize+pageSize);
  var bgOverlay=IMG.bg_corridor?h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_corridor+')',opacity:0.06}}):null;
  var pager=function(){
    if(totalPages<=1)return null;
    var btn=function(label,disabled,nextPage){return h('button',{className:'btn',disabled:disabled,style:{fontSize:11,padding:'6px 14px',marginTop:0,minHeight:0,opacity:disabled?0.3:1,cursor:disabled?'default':'pointer'},onClick:function(){if(!disabled)setPage(nextPage)}},label)};
    return h('div',{className:'vw-pager'},
      btn(isEn?'PREV':'이전',safePage<=0,Math.max(0,safePage-1)),
      h('span',{className:'vw-pager-n'},(safePage+1)+' / '+totalPages),
      btn(isEn?'NEXT':'다음',safePage>=totalPages-1,Math.min(totalPages-1,safePage+1)));
  };
  var getLogText=function(log){
    var overlay=(isEn&&typeof tc==='function')?tc('oracleLogs',log.id,null):null;
    return {title:(overlay&&overlay.title)||log.title,content:(overlay&&overlay.content)||log.content};
  };
  if(sel){
    var log=ORACLE_LOGS.filter(function(l){return l.id===sel})[0];
    var text=getLogText(log);
    return h('div',{className:'screen vw-screen'},
      h('div',{className:'vw-wrap'},
        h('div',{className:'vw-panel'},
          h('div',{className:'vw-panel-h'},'// ORACLE DATABASE',h('span',null,isEn?'RECORD VIEW':'기록 열람')),
          h('div',{style:{marginBottom:8}},h('span',{className:'vw-cat-badge'},log.id)),
          h('div',{className:'vw-detail-title'},text.title),
          h('div',{className:'vw-detail-body'},text.content)),
        h('div',{className:'vw-buttons'},
          h('button',{className:'btn',onClick:function(){setSel(null)}},tt('logs.list',null,isEn?'← List':'← 목록')),
          h('button',{className:'btn bf-enter',onClick:p.onClose},tt('logs.close',null,isEn?'Close':'닫기')))
      ));
  }
  var isJr=vmode==='journal'&&typeof CommanderJournal==='function';
  var modeTabs=h('div',{className:'vw-tabs',style:{marginBottom:6,alignItems:'center'}},
    h('button',{className:'vw-tab'+(vmode==='db'?' active':''),onClick:function(){setVmode('db')}},isEn?'ORACLE DATABASE':'공식 기록'),
    h('button',{className:'vw-tab'+(vmode==='journal'?' active':''),onClick:function(){setVmode('journal')}},isEn?'COMMANDER\'S JOURNAL':'지휘관 메모'),
    h('span',{style:{marginLeft:'auto'}},h(RlabHelpButton,{onClick:help.show,title:LJ('기록 화면 안내','Records guide')})));
  return h('div',{className:'screen vw-screen'},
    bgOverlay,
    h(RlabHelpOverlay,{open:help.open,onClose:help.close,title:LJ('기록 — 공식 기록과 지휘관 메모','RECORDS — DATABASE & JOURNAL'),ok:LJ('확인','GOT IT'),rows:helpRows}),
    h('div',{className:'vw-wrap'},
      h('div',{className:'vw-panel'},
        h('div',{className:'vw-panel-h'},isJr?'// PRIVATE MEMO — L4 CLEARANCE':'// ORACLE DATABASE',h('span',null,isJr?(isEn?'NOT SYNCED TO ORACLE':'ORACLE 미동기화'):(ulAll.length+'/'+vLogs.length+(isEn?' UNLOCKED':' 해금')))),
        modeTabs,
        isJr?h(CommanderJournal,{}):h(React.Fragment,null,
          h('div',{className:'vw-tabs'},LOG_TOPICS.filter(function(tp){return tp.k==='all'||topicCount(tp.k)>0;}).map(function(tp){var c=topicCount(tp.k);return h('button',{key:tp.k,className:'vw-tab'+(topic===tp.k?' active':''),onClick:function(){setTopic(tp.k);setPage(0);}},(isEn?tp.en:tp.ko)+(c>0?(' '+c):''))})),
          pager(),
          pageLogs.map(function(l){var text=getLogText(l);return h('div',{key:l.id,className:'vw-row vw-row-entry',onClick:function(){setSel(l.id)}},
            h('span',{className:'vw-row-name'},text.title),
            h('span',{className:'vw-row-meta'},l.id))}),
          pager(),
          lk>0&&h('div',{className:'vw-note'},tt('logs.locked',{count:lk},isEn?(lk+' records remain locked'):(lk+'건의 기록이 잠겨 있습니다'))))),
      h('div',{className:'vw-buttons'},
        h('button',{className:'btn bf-enter',onClick:p.onClose},tt('logs.close',null,isEn?'Close':'닫기')))
    ));
}
// EndingScreen 은 components-endings.js로 분리 (갤러리 UI + 이미지 썸네일)
// FieldMission은 components.js에서 정의 (trustReq, 키보드, M-009/M-010 이미지 지원)
