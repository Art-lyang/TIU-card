var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef;

function FieldMission(p){
  var mission=MISSIONS[p.missionId];
  var tr=p.trust||{};
  var s1=useState('start'),nodeId=s1[0],setNodeId=s1[1];
  var s2=useState(''),textShown=s2[0],setTextShown=s2[1];
  var s3=useState(false),showChoices=s3[0],setShowChoices=s3[1];
  var s4=useState(null),activeMiniGame=s4[0],setActiveMiniGame=s4[1];
  var s5=useState(null),pendingChoice=s5[0],setPendingChoice=s5[1];
  var s6=useState(null),missionBonus=s6[0],setMissionBonus=s6[1];
  var s7=useState(null),missionNarrative=s7[0],setMissionNarrative=s7[1];

  function getMissionI18nKey(missionId,nodeId){
    return missionId+'_'+nodeId;
  }
  function resolveLocalePatch(patch){
    if(!patch)return null;
    var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
    if(patch[locale])return Object.assign({},patch,patch[locale]);
    return patch;
  }
  function localizeMissionNode(mission,node,nodeId){
    var missionKey=mission.id||p.missionId;
    var key=getMissionI18nKey(mission.id||p.missionId,nodeId);
    var missionLoc=(typeof tc==='function')?tc('missions',missionKey,null):null;
    var loc=(typeof tc==='function')?tc('missions',key,null):null;
    if(!loc&&missionLoc&&missionLoc.nodes)loc=missionLoc.nodes[nodeId]||null;
    var out=Object.assign({},node);
    var staticMission=(typeof FIELD_MISSION_NODE_OVERRIDES!=='undefined'&&FIELD_MISSION_NODE_OVERRIDES)?FIELD_MISSION_NODE_OVERRIDES[missionKey]:null;
    var staticOverride=resolveLocalePatch(staticMission?staticMission[nodeId]:null);
    if(loc&&loc.text)out.text=loc.text;
    if(loc&&loc.choices&&Array.isArray(node.choices)){
      out.choices=node.choices.map(function(choice,idx){
        var patch=loc.choices[idx]||{};
        if(typeof patch==='string')patch={label:patch};
        return Object.assign({},choice,patch);
      });
    }
    if(staticOverride){
      if(staticOverride.text)out.text=staticOverride.text;
      else if(staticOverride.textSuffix)out.text=(out.text||'')+'\n\n'+staticOverride.textSuffix;
      if(staticOverride.endLabel&&out.choices&&out.choices.length){
        out.choices=out.choices.map(function(choice,idx){
          if(idx!==0||choice.next!=='end')return choice;
          return Object.assign({},choice,{label:staticOverride.endLabel});
        });
      }
    }
    var localizedNarrative=resolveLocalePatch(missionNarrative);
    if(localizedNarrative&&localizedNarrative.nodeId===nodeId){
      if(localizedNarrative.text)out.text=localizedNarrative.text;
      else if(localizedNarrative.textSuffix)out.text=(out.text||'')+'\n\n'+localizedNarrative.textSuffix;
      if(localizedNarrative.endLabel&&out.choices&&out.choices.length){
        out.choices=out.choices.map(function(choice,idx){
          if(idx!==0||choice.next!=='end')return choice;
          return Object.assign({},choice,{label:localizedNarrative.endLabel});
        });
      }
    }
    return out;
  }
  function localizeMissionTitle(mission){
    var missionKey=mission.id||p.missionId;
    var missionLoc=(typeof tc==='function')?tc('missions',missionKey,null):null;
    return missionLoc&&missionLoc.title?missionLoc.title:mission.title;
  }
  function getMissionImage(mid){
    return mid==='M-001'?IMG.spec_012_bloodpit:
      mid==='M-002'?IMG.spec_011_shelltalker:
      mid==='M-004'?IMG.spec_001_mannequin:
      mid==='M-005'?IMG.spec_003_brood:
      mid==='M-006'?IMG.spec_008_spore:
      mid==='M-009'?IMG.spec_004_seedspreader:
      mid==='M-010'?IMG.spec_015_brainseeker:null;
  }
  var node=localizeMissionNode(mission,mission.nodes[nodeId],nodeId);
  var missionTitle=localizeMissionTitle(mission);
  var mImg=getMissionImage(p.missionId);

  useEffect(function(){
    setNodeId('start');
    setActiveMiniGame(null);
    setPendingChoice(null);
    setMissionBonus(null);
    setMissionNarrative(null);
  },[p.missionId]);

  var choiceLabelSignature=(node.choices||[]).map(function(c){ return c.label||''; }).join('||');

  useEffect(function(){
    setTextShown('');
    setShowChoices(false);
    var i=0;
    var txt=node.text;
    var t=setInterval(function(){
      if(i<txt.length){i++;setTextShown(txt.substring(0,i));}
      else{clearInterval(t);setTimeout(function(){setShowChoices(true);},400);}
    },25);
    return function(){clearInterval(t);};
  },[nodeId,node.text,choiceLabelSignature]);

  function finalizeChoice(choice,extraBonus){
    if(choice.next==='end'){
      var bonus=(extraBonus!==undefined)?extraBonus:missionBonus;
      p.onComplete(mergeMissionBonus(choice,bonus));
      return;
    }
    setNodeId(choice.next);
  }

  function handleChoice(choice){
    var miniConfig=getFieldMiniGameConfig(mission.id||p.missionId,nodeId,choice.next);
    if(miniConfig&&!missionBonus){
      setPendingChoice(choice);
      setActiveMiniGame(miniConfig);
      return;
    }
    finalizeChoice(choice);
  }

  function handleMiniGameDone(rank){
    var baseReward=getFieldMiniGameReward(mission.id||p.missionId,rank)||null;
    var nextNodeId=pendingChoice?pendingChoice.next:null;
    var narrative=nextNodeId?getFieldMiniGameNarrative(mission.id||p.missionId,nextNodeId,rank):null;
    var reward=Object.assign({},baseReward||{},{ miniGame:{
      missionId: mission.id||p.missionId,
      nodeId: nextNodeId,
      rank: rank,
      type: activeMiniGame?activeMiniGame.type:null,
      key: activeMiniGame?activeMiniGame.key:null
    }});
    if(reward)setMissionBonus(reward);
    setMissionNarrative(narrative?Object.assign({nodeId:nextNodeId},narrative):null);
    setActiveMiniGame(null);
    if(pendingChoice){
      var nextChoice=pendingChoice;
      setPendingChoice(null);
      finalizeChoice(nextChoice,reward);
    }
  }

  var visChoices=node.choices.filter(function(c){
    if(!c.trustReq)return true;
    for(var k in c.trustReq){if((tr[k]||0)<c.trustReq[k])return false;}
    return true;
  });

  useEffect(function(){
    var onKey=function(e){
      if(activeMiniGame||!showChoices)return;
      var idx=-1;
      if(/^[1-9]$/.test(e.key))idx=parseInt(e.key,10)-1;
      else if(e.code&&/^Numpad[1-9]$/.test(e.code))idx=parseInt(e.code.slice(6),10)-1;
      if(idx>=0&&idx<visChoices.length){e.preventDefault();handleChoice(visChoices[idx]);}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey);};
  },[showChoices,visChoices,activeMiniGame,missionBonus]);

  return h('div',{className:'screen',style:{overflow:'hidden'}},
    IMG.bg_restricted&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_restricted+')',opacity:0.08}}),
    h('div',{style:{width:'100%',maxWidth:420,padding:'6px 0',flexShrink:0}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#f0a030',letterSpacing:2,textAlign:'center'}},tt('fieldMission.title',null,'FIELD MISSION')),
      h('div',{style:{fontSize:13,color:'#ccddcc',textAlign:'center',marginTop:2}},missionTitle),
      mImg&&nodeId==='start'&&h('img',{src:mImg,className:'mission-img',alt:missionTitle})
    ),
    h('div',{style:{flex:1,width:'100%',maxWidth:420,overflowY:'auto',minHeight:0,padding:'4px 0',WebkitOverflowScrolling:'touch'}},
      h('div',{style:{fontSize:13,lineHeight:1.7,color:'var(--ui)',whiteSpace:'pre-wrap',borderLeft:'2px solid var(--ui-dim)',paddingLeft:12}},textShown,!showChoices&&h('span',{style:{animation:'blink 1s infinite'}},'..'))
    ),
    showChoices&&h('div',{style:{width:'100%',maxWidth:420,flexShrink:0,display:'flex',flexDirection:'column',gap:6,padding:'6px 0'}},
      visChoices.map(function(c,i){
        var isTrust=!!c.trustReq;
        return h('button',{
          key:i,
          onClick:function(){handleChoice(c);},
          style:{
            background:isTrust?'rgba(240,160,48,.06)':'var(--ui-bg)',
            border:'1px solid '+(isTrust?'rgba(240,160,48,.4)':'var(--ui-border)'),
            borderRadius:4,padding:'10px 14px',cursor:'pointer',textAlign:'left',
            color:c.next==='end'?'#f0a030':isTrust?'#f0c060':'var(--ui)',fontSize:12,lineHeight:1.5,fontFamily:'inherit'
          }
        },
          h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.3)',marginRight:8,minWidth:14,display:'inline-block'}},(i+1)+''),
          isTrust&&h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#f0a030',letterSpacing:1,marginRight:6}},tt('fieldMission.trustTag',null,'[신뢰]')),
          h('span',{style:{marginRight:6,opacity:0.5}},'>'),
          c.label
        );
      })
    ),
    h('div',{className:'footer',style:{flexShrink:0}},tt('fieldMission.footer',null,'ORACLE REMOTE TERMINAL — FIELD OPS')),
    activeMiniGame&&h(FieldMiniGameOverlay,{game:activeMiniGame,onDone:handleMiniGameDone})
  );
}
