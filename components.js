// TERMINAL SESSION — components.js (Dialogue, LogViewer, EndingScreen, FieldMission)
function Dialogue(p){
  var d=p.dialogue,portrait=CHAR_IMG[d.char]||null;
  var SN={c:{l:'봉쇄',cls:'stat-icon-inline-c'},r:{l:'자원',cls:'stat-icon-inline-r'},t:{l:'신뢰',cls:'stat-icon-inline-t'},o:{l:'평가',cls:'stat-icon-inline-o'}};
  var s1=useState(0),li=s1[0],setLi=s1[1];var s2=useState(false),sc=s2[0],setSc=s2[1];
  var s3=useState(-1),picked=s3[0],setPicked=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(''),rTxt=s5[0],setRTxt=s5[1];var s6=useState(false),rDone=s6[0],setRDone=s6[1];
  useEffect(function(){setLi(0);setSc(false);setPicked(-1);setChosen(null);setRTxt('');setRDone(false)},[d]);
  useEffect(function(){if(li<d.lines.length){var t=setTimeout(function(){setLi(function(v){return v+1})},800);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setSc(true)},400);return function(){clearTimeout(t2)}}},[li]);
  useEffect(function(){if(!chosen||!chosen.reply)return;var txt=chosen.reply;var i=0;var t=setInterval(function(){if(i<txt.length){i++;setRTxt(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setRDone(true)},800)}},30);return function(){clearInterval(t)}},[chosen]);
  useEffect(function(){if(rDone&&chosen){var t=setTimeout(function(){p.onChoice(chosen)},1400);return function(){clearTimeout(t)}}},[rDone]);
  var handlePick=function(c,i){if(picked>=0)return;setPicked(i);setTimeout(function(){setChosen(c)},500)};
  var fxTags=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){if(fx[k]&&fx[k]!==0){tags.push({key:k,val:fx[k],name:SN[k].l,cls:SN[k].cls})}});if(!tags.length)return null;return h('div',{style:{display:'flex',gap:10,marginTop:8,flexWrap:'wrap',animation:'fadeIn 0.5s ease'}},tags.map(function(t){var pos=t.val>0;return h('span',{key:t.key,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:pos?'var(--ui)':'#ff4444',textShadow:'0 0 6px '+(pos?'rgba(var(--ui-rgb),0.4)':'rgba(255,68,68,0.4)'),letterSpacing:1,display:'inline-flex',alignItems:'center',gap:2}},h('span',{className:'stat-icon-inline '+t.cls}),t.name+(pos?'+':'')+t.val)}))};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // COMMUNICATION')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',alt:d.char,style:{width:90,height:90}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold'}},d.char),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#1a8a1a',marginTop:2}},d.role)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:100,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'auto',marginBottom:0}},
      h('div',{className:'oracle-card__glow'}),
      h('div',{style:{flex:1}},
        d.lines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:6,animation:'fadeIn 0.3s ease'}},String(l))}),
        chosen&&chosen.reply&&h('div',{style:{fontSize:14,lineHeight:1.7,color:'#f0a030',marginTop:8}},rTxt,!rDone&&h('span',{style:{animation:'blink 1s infinite',marginLeft:2}},'▌')),
        rDone&&chosen&&fxTags(chosen.fx)),
      !sc&&!chosen&&h('div',{style:{textAlign:'right',marginTop:4}},h('span',{style:{color:'rgba(var(--ui-rgb),.4)',animation:'blink 1s infinite',fontSize:12}},'▶'))),
    sc&&!chosen&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0'}},
      d.choices.map(function(c,i){var isMe=picked===i;var isOther=picked>=0&&picked!==i;var bdrCol=i===0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.35)';var bdrSel=i===0?'rgba(240,160,48,.8)':'rgba(var(--ui-rgb),.7)';var tc={'\ub0c9\uc815':'#6699cc','\uacf5\uac10':'#f0c060','\ubd84\uc11d':'#33cccc','\uac15\uacbd':'#ff6644'};var tagCol=c.tag&&tc[c.tag]||'#888';return h('button',{key:i,style:{background:isMe?'rgba(var(--ui-rgb),.04)':'rgba(10,18,10,.4)',border:'1px solid '+(isMe?bdrSel:bdrCol),color:i===0?'#f0a030':'var(--ui)',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',opacity:isOther?0.15:1,transform:isMe?'scale(1.02)':'scale(1)',boxShadow:isMe?'0 0 12px '+(i===0?'rgba(240,160,48,.15)':'rgba(var(--ui-rgb),.12)'):' none',transition:'all 0.3s ease',pointerEvents:picked>=0?'none':'auto',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2},onClick:function(){handlePick(c,i)}},
        c.tag&&h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:tagCol,letterSpacing:2,opacity:0.85}},'[ '+c.tag+' ]'),
        h('span',null,c.label))}))
  );
}
function LogViewer(p){
  var s1=useState(null),sel=s1[0],setSel=s1[1];var ul=ORACLE_LOGS.filter(function(l){return p.unlockedIds.indexOf(l.id)>=0}),lk=ORACLE_LOGS.length-ul.length;
  if(sel){var log=ORACLE_LOGS.filter(function(l){return l.id===sel})[0];return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:16}},'ORACLE DATABASE — RECORD VIEW'),h('div',{style:{fontSize:14,color:'#f0a030',fontWeight:'bold',textAlign:'center',marginBottom:16}},log.title),h('div',{style:{background:'var(--ui-bg)',border:'1px solid var(--ui-border)',borderRadius:4,padding:16,fontFamily:"'Share Tech Mono',monospace",fontSize:12,lineHeight:2,color:'var(--ui)',whiteSpace:'pre-wrap'}},log.content),h('div',{style:{display:'flex',gap:10,justifyContent:'center',marginTop:20}},h('button',{className:'btn',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:function(){setSel(null)}},'← 목록'),h('button',{className:'btn btn-amber',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:p.onClose},'닫기'))));}
  return h('div',{className:'screen'},IMG.bg_corridor&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_corridor+')',opacity:0.07}}),h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:6}},'ORACLE DATABASE'),h('div',{style:{fontSize:12,color:'#888',textAlign:'center',marginBottom:20}},ul.length+'/'+ORACLE_LOGS.length+' 기록 해금'),ul.map(function(l){return h('div',{key:l.id,onClick:function(){setSel(l.id)},style:{background:'var(--ui-bg)',border:'1px solid var(--ui-border)',borderRadius:4,padding:'12px 16px',marginBottom:8,cursor:'pointer'}},h('div',{style:{display:'flex',justifyContent:'space-between'}},h('span',{style:{fontSize:13,color:'var(--ui)'}},l.title),h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)'}},l.id)))}),lk>0&&h('div',{style:{fontSize:12,color:'#333',textAlign:'center',marginTop:12,fontStyle:'italic'}},lk+'건의 기록이 잠겨 있습니다'),(p.sessions||0)>=1&&lk>0&&h('div',{style:{marginTop:16,padding:'10px 12px',background:'rgba(var(--ui-rgb),.03)',border:'1px solid rgba(var(--ui-rgb),.1)',borderRadius:3,fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.45)',lineHeight:1.8,letterSpacing:.5}},h('div',{style:{marginBottom:4,color:'rgba(var(--ui-rgb),.3)',fontSize:9}},'[이전 세션 분석]'),lk>=8?'다수의 미발견 기록 존재. 간부 신뢰도와 독자적 판단이 새로운 정보를 열 수 있습니다.':lk>=4?'일부 기록은 특정 조건 하에서만 접근 가능합니다. [편집됨] 조건을 충족하십시오.':'거의 모든 기록에 접근했습니다. 남은 기록은 극히 제한된 상황에서만 해금됩니다.'),h('button',{className:'btn btn-amber',style:{display:'block',margin:'20px auto 0',fontSize:12,padding:'8px 20px'},onClick:p.onClose},'닫기')));
}
function EndingScreen(p){
  var all=[{id:'A',name:'완벽한 도구',hint:'ORACLE의 최고 신임을 얻으라'},{id:'B',name:'각성',hint:'진실의 단편을 목격하라'},{id:'C_c',name:'봉쇄 붕괴',hint:'봉쇄선이 무너지다'},{id:'C_cs',name:'봉쇄 성공',hint:'완벽한 봉쇄를 달성하다'},{id:'C_cst',name:'자충수',hint:'소 잃고 외양간 고치다'},{id:'C_r',name:'자원 고갈',hint:'기지가 기능을 잃다'},{id:'C_t',name:'신뢰 상실',hint:'동료들이 떠나다'},{id:'C_o',name:'접속 차단',hint:'ORACLE이 당신을 버리다'},{id:'D',name:'조용한 자유',hint:'반란 속의 해방'},{id:'G',name:'관망자',hint:'어느 쪽도 선택하지 않다'},{id:'F',name:'[데이터 손상]',hint:'???'}];
  return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:6}},'SESSION ARCHIVE'),h('div',{style:{fontSize:12,color:'#888',textAlign:'center',marginBottom:20}},'총 세션: '+p.sessions+' | 엔딩: '+p.endings.length+'/'+all.length),all.map(function(e){var f=p.endings.indexOf(e.id)>=0;return h('div',{key:e.id,style:{background:f?'var(--ui-bg)':'#080808',border:'1px solid '+(f?'var(--ui-border)':'#111'),borderRadius:4,padding:'12px 16px',marginBottom:8}},h('div',{style:{fontSize:14,color:f?'var(--ui)':'#333',fontWeight:'bold'}},f?e.name:'[미발견]'),h('div',{style:{fontSize:11,color:f?'var(--ui-dim)':'#222',marginTop:4,fontStyle:'italic'}},f?'달성 완료':e.hint))}),h('button',{className:'btn btn-amber',style:{display:'block',margin:'20px auto 0',fontSize:12,padding:'8px 20px'},onClick:p.onClose},'닫기')));
}
function FieldMission(p){
  var mission=MISSIONS[p.missionId];var tr=p.trust||{};var s1=useState('start'),nodeId=s1[0],setNodeId=s1[1];var s2=useState(''),textShown=s2[0],setTextShown=s2[1];var s3=useState(false),showChoices=s3[0],setShowChoices=s3[1];
  var node=mission.nodes[nodeId];var mImg=p.missionId==='M-001'?IMG.spec_012_bloodpit:p.missionId==='M-002'?IMG.spec_011_shelltalker:p.missionId==='M-004'?IMG.spec_001_mannequin:p.missionId==='M-005'?IMG.spec_003_brood:p.missionId==='M-006'?IMG.spec_008_spore:null;
  useEffect(function(){setTextShown('');setShowChoices(false);var i=0;var txt=node.text;var t=setInterval(function(){if(i<txt.length){i++;setTextShown(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setShowChoices(true)},400)}},25);return function(){clearInterval(t)}},[nodeId]);
  var handleChoice=function(choice){if(choice.next==='end'){p.onComplete({result:choice.result||{},g:choice.g||0,log:choice.log||null})}else{setNodeId(choice.next)}};
  var visChoices=node.choices.filter(function(c){if(!c.trustReq)return true;for(var k in c.trustReq){if((tr[k]||0)<c.trustReq[k])return false}return true});
  useEffect(function(){
    var onKey=function(e){
      if(!showChoices)return;
      var idx=-1;
      if(/^[1-9]$/.test(e.key))idx=parseInt(e.key,10)-1;
      else if(e.code&&/^Numpad[1-9]$/.test(e.code))idx=parseInt(e.code.slice(6),10)-1;
      if(idx>=0&&idx<visChoices.length){e.preventDefault();handleChoice(visChoices[idx])}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[showChoices,visChoices]);
  return h('div',{className:'screen',style:{overflow:'hidden'}},
    IMG.bg_restricted&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_restricted+')',opacity:0.08}}),
    h('div',{style:{width:'100%',maxWidth:420,padding:'6px 0',flexShrink:0}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#f0a030',letterSpacing:2,textAlign:'center'}},'FIELD MISSION'),
      h('div',{style:{fontSize:13,color:'#ccddcc',textAlign:'center',marginTop:2}},mission.title),
      mImg&&nodeId==='start'&&h('img',{src:mImg,className:'mission-img',alt:mission.title})
    ),
    h('div',{style:{flex:1,width:'100%',maxWidth:420,overflowY:'auto',minHeight:0,padding:'4px 0',WebkitOverflowScrolling:'touch'}},
      h('div',{style:{fontSize:13,lineHeight:1.7,color:'var(--ui)',whiteSpace:'pre-wrap',borderLeft:'2px solid var(--ui-dim)',paddingLeft:12}},textShown,!showChoices&&h('span',{style:{animation:'blink 1s infinite'}},'▌'))
    ),
    showChoices&&h('div',{style:{width:'100%',maxWidth:420,flexShrink:0,display:'flex',flexDirection:'column',gap:6,padding:'6px 0'}},
      visChoices.map(function(c,i){var isTrust=!!c.trustReq;return h('button',{key:i,onClick:function(){handleChoice(c)},style:{background:isTrust?'rgba(240,160,48,.06)':'var(--ui-bg)',border:'1px solid '+(isTrust?'rgba(240,160,48,.4)':'var(--ui-border)'),borderRadius:4,padding:'10px 14px',cursor:'pointer',textAlign:'left',color:c.next==='end'?'#f0a030':isTrust?'#f0c060':'var(--ui)',fontSize:12,lineHeight:1.5,fontFamily:'inherit'}},h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.3)',marginRight:8,minWidth:14,display:'inline-block'}},(i+1)+''),isTrust&&h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#f0a030',letterSpacing:1,marginRight:6}},'[신뢰]'),h('span',{style:{marginRight:6,opacity:0.5}},'▸'),c.label)})
    ),
    h('div',{className:'footer',style:{flexShrink:0}},'ORACLE REMOTE TERMINAL — FIELD OPS')
  );
}
