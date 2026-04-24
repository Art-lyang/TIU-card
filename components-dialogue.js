// TERMINAL SESSION — components-dialogue.js
// Dialogue, LogViewer, EndingScreen, FieldMission
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
var getDialogueOverlay=function(d){
  if(!d||!window.TS_I18N||window.TS_I18N.getLocale()!=='en'||typeof tc!=='function')return null;
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
    var roleMap={'부지휘관':'Deputy Commander','현장요원':'Field Operative','연구원':'Researcher','기술관':'Technical Officer','분석관':'Analyst'};
    return roleMap[d.role]||d.role;
  }
  return d.role;
};
function Dialogue(p){
  var d=p.dialogue,portrait=CHAR_IMG[d.char]||null,overlay=getDialogueOverlay(d);
  var lines=(overlay&&overlay.lines)||d.lines;
  var choices=(overlay&&overlay.choices)||d.choices;
  var charName=getDialogueName(d,overlay);
  var charRole=getDialogueRole(d,overlay);
  var SN={c:{l:tt('stat.containment','봉쇄','봉쇄'),cls:'stat-icon-inline-c'},r:{l:tt('stat.resources','자원','자원'),cls:'stat-icon-inline-r'},t:{l:tt('stat.trust','신뢰','신뢰'),cls:'stat-icon-inline-t'},o:{l:tt('stat.evaluation','평가','평가'),cls:'stat-icon-inline-o'}};
  var s1=useState(0),li=s1[0],setLi=s1[1];var s2=useState(false),sc=s2[0],setSc=s2[1];
  var s3=useState(-1),picked=s3[0],setPicked=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(''),rTxt=s5[0],setRTxt=s5[1];var s6=useState(false),rDone=s6[0],setRDone=s6[1];
  useEffect(function(){setLi(0);setSc(false);setPicked(-1);setChosen(null);setRTxt('');setRDone(false)},[d]);
  useEffect(function(){if(li<lines.length){var t=setTimeout(function(){setLi(function(v){return v+1})},800);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setSc(true)},400);return function(){clearTimeout(t2)}}},[li,lines]);
  useEffect(function(){if(!chosen||!chosen.reply)return;var txt=chosen.reply;var i=0;var t=setInterval(function(){if(i<txt.length){i++;setRTxt(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setRDone(true)},800)}},30);return function(){clearInterval(t)}},[chosen]);
  useEffect(function(){if(rDone&&chosen){var t=setTimeout(function(){p.onChoice(chosen)},1400);return function(){clearTimeout(t)}}},[rDone,chosen,p]);
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
  var fxTags=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){if(fx[k]&&fx[k]!==0){tags.push({key:k,val:fx[k],name:SN[k].l,cls:SN[k].cls})}});if(!tags.length)return null;return h('div',{style:{display:'flex',gap:10,marginTop:8,flexWrap:'wrap',animation:'fadeIn 0.5s ease'}},tags.map(function(t){var pos=t.val>0;return h('span',{key:t.key,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:pos?'var(--ui)':'#ff4444',textShadow:'0 0 6px '+(pos?'rgba(var(--ui-rgb),0.4)':'rgba(255,68,68,0.4)'),letterSpacing:1,display:'inline-flex',alignItems:'center',gap:2}},h('span',{className:'stat-icon-inline '+t.cls}),t.name+(pos?'+':'')+t.val)}))};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // COMMUNICATION')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',alt:charName,style:{width:90,height:90}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold'}},charName),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)',marginTop:2}},charRole)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:100,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'hidden',marginBottom:0,userSelect:'none',WebkitUserSelect:'none',touchAction:'none'}},
      h('div',{className:'oracle-card__glow'}),
      h('div',{style:{flex:1}},
        lines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.85)',marginBottom:6,animation:'fadeIn 0.3s ease'}},String(l))}),
        chosen&&chosen.reply&&h('div',{style:{fontSize:14,lineHeight:1.7,color:'#f0a030',marginTop:8}},rTxt,!rDone&&h('span',{style:{animation:'blink 1s infinite',marginLeft:2}},'▌')),
        rDone&&chosen&&fxTags(chosen.fx)),
      !sc&&!chosen&&h('div',{style:{textAlign:'right',marginTop:4}},h('span',{style:{color:'rgba(var(--ui-rgb),.4)',animation:'blink 1s infinite',fontSize:12}},'▶'))),
    sc&&!chosen&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0'}},
      choices.map(function(c,i){var isMe=picked===i;var isOther=picked>=0&&picked!==i;var bdrCol=i===0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.35)';var bdrSel=i===0?'rgba(240,160,48,.8)':'rgba(var(--ui-rgb),.7)';var tc={'냉정':'#6699cc','공감':'#f0c060','분석':'#33cccc','강경':'#ff6644','Cold':'#6699cc','Empathy':'#f0c060','Analysis':'#33cccc','Hardline':'#ff6644'};var tagCol=c.tag&&tc[c.tag]||'#888';return h('button',{key:i,style:{background:isMe?'rgba(var(--ui-rgb),.04)':'rgba(10,18,10,.4)',border:'1px solid '+(isMe?bdrSel:bdrCol),color:i===0?'#f0a030':'var(--ui)',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',opacity:isOther?0.15:1,transform:isMe?'scale(1.02)':'scale(1)',boxShadow:isMe?'0 0 12px '+(i===0?'rgba(240,160,48,.15)':'rgba(var(--ui-rgb),.12)'):' none',transition:'all 0.3s ease',pointerEvents:picked>=0?'none':'auto',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2},onClick:function(){handlePick(c,i)}},
        h('span',null,c.label))}))
  );
}
function LogViewer(p){
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isEn=locale==='en';
  var s1=useState(null),sel=s1[0],setSel=s1[1];
  var ul=ORACLE_LOGS.filter(function(l){return p.unlockedIds.indexOf(l.id)>=0}),lk=ORACLE_LOGS.length-ul.length;
  var getLogText=function(log){
    var overlay=(isEn&&typeof tc==='function')?tc('oracleLogs',log.id,null):null;
    return {title:(overlay&&overlay.title)||log.title,content:(overlay&&overlay.content)||log.content};
  };
  if(sel){
    var log=ORACLE_LOGS.filter(function(l){return l.id===sel})[0];
    var text=getLogText(log);
    return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:16}},'ORACLE DATABASE - RECORD VIEW'),
      h('div',{style:{fontSize:14,color:'#f0a030',fontWeight:'bold',textAlign:'center',marginBottom:16}},text.title),
      h('div',{style:{background:'var(--ui-bg)',border:'1px solid var(--ui-border)',borderRadius:4,padding:16,fontFamily:"'Share Tech Mono',monospace",fontSize:12,lineHeight:2,color:'var(--ui)',whiteSpace:'pre-wrap'}},text.content),
      h('div',{style:{display:'flex',gap:10,justifyContent:'center',marginTop:20}},
        h('button',{className:'btn',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:function(){setSel(null)}},isEn?'← List':'← 목록'),
        h('button',{className:'btn btn-amber',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:p.onClose},isEn?'Close':'닫기')
      )
    ));
  }
  return h('div',{className:'screen'},IMG.bg_corridor&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_corridor+')',opacity:0.07}}),h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:6}},'ORACLE DATABASE'),
    h('div',{style:{fontSize:12,color:'#888',textAlign:'center',marginBottom:20}},isEn?(ul.length+'/'+ORACLE_LOGS.length+' records unlocked'):(ul.length+'/'+ORACLE_LOGS.length+' 기록 해금')),
    ul.map(function(l){var text=getLogText(l);return h('div',{key:l.id,onClick:function(){setSel(l.id)},style:{background:'var(--ui-bg)',border:'1px solid var(--ui-border)',borderRadius:4,padding:'12px 16px',marginBottom:8,cursor:'pointer'}},h('div',{style:{display:'flex',justifyContent:'space-between'}},h('span',{style:{fontSize:13,color:'var(--ui)'}},text.title),h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)'}},l.id)))}),
    lk>0&&h('div',{style:{fontSize:12,color:'#333',textAlign:'center',marginTop:12,fontStyle:'italic'}},isEn?(lk+' records remain locked'):(lk+'건의 기록이 잠겨 있습니다')),
    h('button',{className:'btn btn-amber',style:{display:'block',margin:'20px auto 0',fontSize:12,padding:'8px 20px'},onClick:p.onClose},isEn?'Close':'닫기')
  ));
}
// EndingScreen 은 components-endings.js로 분리 (갤러리 UI + 이미지 썸네일)
// FieldMission은 components.js에서 정의 (trustReq, 키보드, M-009/M-010 이미지 지원)
