// TERMINAL SESSION — components.js
// FieldMission만 여기서 정의 (trustReq + 키보드 + M-009/M-010 이미지 지원)
// Dialogue, LogViewer, EndingScreen은 components-dialogue.js에서 정의 (키보드 단축키 포함)

function FieldMission(p){
  var mission=MISSIONS[p.missionId];var tr=p.trust||{};var s1=useState('start'),nodeId=s1[0],setNodeId=s1[1];var s2=useState(''),textShown=s2[0],setTextShown=s2[1];var s3=useState(false),showChoices=s3[0],setShowChoices=s3[1];
  var node=mission.nodes[nodeId];var mImg=p.missionId==='M-001'?IMG.spec_012_bloodpit:p.missionId==='M-002'?IMG.spec_011_shelltalker:p.missionId==='M-004'?IMG.spec_001_mannequin:p.missionId==='M-005'?IMG.spec_003_brood:p.missionId==='M-006'?IMG.spec_008_spore:p.missionId==='M-009'?IMG.spec_004_seedspreader:p.missionId==='M-010'?IMG.spec_015_brainseeker:null;
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
