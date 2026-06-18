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
  var textRef=useRef(null);
  useEffect(function(){setLi(0);setSc(false);setPicked(-1);setChosen(null);setRTxt('');setRDone(false)},[d]);
  useEffect(function(){if(li<lines.length){var t=setTimeout(function(){setLi(function(v){return v+1})},800);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setSc(true)},400);return function(){clearTimeout(t2)}}},[li,lines]);
  useEffect(function(){if(!chosen||!chosen.reply)return;var txt=chosen.reply;var i=0;var t=setInterval(function(){if(i<txt.length){i++;setRTxt(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setRDone(true)},800)}},30);return function(){clearInterval(t)}},[chosen]);
  useEffect(function(){if(rDone&&chosen){var t=setTimeout(function(){p.onChoice(chosen)},1400);return function(){clearTimeout(t)}}},[rDone,chosen,p]);
  useEffect(function(){var el=textRef.current;if(el)el.scrollTop=el.scrollHeight},[li,rTxt,rDone,chosen]);
  var handlePick=function(c,i){if(picked>=0)return;setPicked(i);setTimeout(function(){setChosen(c)},500)};
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
  return h('div',{className:'screen dialogue-screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // COMMUNICATION')),
    h(CharacterCommPanel,{nameKey:d.char,displayName:charName,role:charRole}),
    h('div',{className:'oracle-card dialogue-card'},
      h('div',{className:'oracle-card__glow'}),
      h('div',{className:'dialogue-scroll',ref:textRef},
        lines.slice(0,li).map(function(l,i){return h('div',{key:i,className:'dialogue-line'},String(l))}),
        chosen&&chosen.reply&&h('div',{className:'dialogue-reply'},rTxt,!rDone&&h('span',{style:{animation:'blink 1s infinite',marginLeft:2}},'▌'))),
      !sc&&!chosen&&h('div',{style:{textAlign:'right',marginTop:4}},h('span',{style:{color:'rgba(var(--ui-rgb),.4)',animation:'blink 1s infinite',fontSize:12}},'▶'))),
    sc&&!chosen&&h('div',{className:'dialogue-choices'},
      choices.map(function(c,i){var isMe=picked===i;var isOther=picked>=0&&picked!==i;var bdrCol=i===0?'rgba(var(--ui-rgb),.55)':'rgba(var(--ui-rgb),.35)';var bdrSel=i===0?'rgba(var(--ui-rgb),.8)':'rgba(var(--ui-rgb),.7)';var tc={'냉정':'#6699cc','공감':'#f0c060','분석':'#33cccc','강경':'#ff6644','Cold':'#6699cc','Empathy':'#f0c060','Analysis':'#33cccc','Hardline':'#ff6644'};var tagCol=c.tag&&tc[c.tag]||'#888';return h('button',{key:i,className:'dialogue-choice-btn',style:{background:isMe?'rgba(var(--ui-rgb),.08)':'rgba(var(--ui-rgb),.045)',border:'1px solid '+(isMe?bdrSel:bdrCol),opacity:isOther?0.15:1,transform:isMe?'scale(1.02)':'scale(1)',boxShadow:isMe?'0 0 12px rgba(var(--ui-rgb),.16)':'none',pointerEvents:picked>=0?'none':'auto'},onClick:function(){handlePick(c,i)}},
        h('span',null,c.label))}))
  );
}
function LogViewer(p){
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isEn=locale==='en';
  var s1=useState(null),sel=s1[0],setSel=s1[1];
  var s2=useState(0),page=s2[0],setPage=s2[1];
  var ul=ORACLE_LOGS.filter(function(l){return p.unlockedIds.indexOf(l.id)>=0}),lk=ORACLE_LOGS.length-ul.length;
  var pageSize=12,totalPages=Math.max(1,Math.ceil(ul.length/pageSize));
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
  return h('div',{className:'screen vw-screen'},
    bgOverlay,
    h('div',{className:'vw-wrap'},
      h('div',{className:'vw-panel'},
        h('div',{className:'vw-panel-h'},'// ORACLE DATABASE',h('span',null,ul.length+'/'+ORACLE_LOGS.length+(isEn?' UNLOCKED':' 해금'))),
        pager(),
        pageLogs.map(function(l){var text=getLogText(l);return h('div',{key:l.id,className:'vw-row vw-row-entry',onClick:function(){setSel(l.id)}},
          h('span',{className:'vw-row-name'},text.title),
          h('span',{className:'vw-row-meta'},l.id))}),
        pager(),
        lk>0&&h('div',{className:'vw-note'},tt('logs.locked',{count:lk},isEn?(lk+' records remain locked'):(lk+'건의 기록이 잠겨 있습니다')))),
      h('div',{className:'vw-buttons'},
        h('button',{className:'btn bf-enter',onClick:p.onClose},tt('logs.close',null,isEn?'Close':'닫기')))
    ));
}
// EndingScreen 은 components-endings.js로 분리 (갤러리 UI + 이미지 썸네일)
// FieldMission은 components.js에서 정의 (trustReq, 키보드, M-009/M-010 이미지 지원)
