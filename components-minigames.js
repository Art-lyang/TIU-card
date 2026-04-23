var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef;

function getMiniLocaleCopy(game){
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  return game[locale]||game.ko;
}

function mergeMissionBonus(base, bonus){
  var src=base||{};
  var add=bonus||{};
  var result={c:0,r:0,t:0,o:0};
  var fromBase=src.result||{};
  var fromBonus=add.result||{};
  ['c','r','t','o'].forEach(function(k){ result[k]=(fromBase[k]||0)+(fromBonus[k]||0); });
  var logs=[];
  var pushLog=function(v){
    if(!v)return;
    if(Array.isArray(v))v.forEach(pushLog);
    else if(logs.indexOf(v)<0)logs.push(v);
  };
  pushLog(src.log||null);
  pushLog(add.log||null);
  return {
    result: result,
    g: (src.g||0)+(add.g||0),
    log: logs.length===0?null:(logs.length===1?logs[0]:logs)
  };
}

function getFieldMiniGameConfig(missionId,nodeId,nextId){
  var map=window.FIELD_MINIGAME_CONFIGS||{};
  var mission=map[missionId];
  if(!mission||!mission[nodeId])return null;
  return mission[nodeId][nextId]||null;
}

function getFieldMiniGameReward(missionId,rank){
  var table=window.FIELD_MINIGAME_REWARDS||{};
  if(!table[missionId])return null;
  return table[missionId][rank]||null;
}

function getFieldMiniGameNarrative(missionId,nodeId,rank){
  var table=window.FIELD_MINIGAME_NARRATIVES||{};
  if(!table[missionId]||!table[missionId][nodeId])return null;
  return table[missionId][nodeId][rank]||null;
}

var FIELD_MINIGAME_LIBRARY = {
  signal: {
    id: 'signal',
    kind: 'SIGNAL ALIGNMENT',
    ko: {
      title: 'SPEC-011 음향 패턴 정렬',
      intro: '초록 커서를 황색 안정 구간에 맞춰 신호를 고정한다. 너무 이르면 잡음, 너무 늦으면 신호가 무너진다.',
      action: '판정 확정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'SPEC-011 Acoustic Pattern Alignment',
      intro: 'Lock the signal by stopping the green cursor inside the amber stability band.',
      action: 'Confirm',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  sequence: {
    id: 'sequence',
    kind: 'QUARANTINE SEQUENCE',
    ko: {
      title: '격리 봉인 수동 시퀀스',
      intro: '패널 지시문 순서대로 봉인 버튼을 눌러 자동 루틴의 빈틈을 메운다.',
      action: '입력 진행',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Manual Quarantine Seal Sequence',
      intro: 'Press panel controls in protocol order to close the gap left by the automatic routine.',
      action: 'Input',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  breach: {
    id: 'breach',
    kind: 'ORACLE TRACE',
    ko: {
      title: '권한 흔적 추적',
      intro: '인접한 노드만 따라 움직이며 KEY 흔적을 모은 뒤 EXIT로 빠져나온다. 붉은 노드는 노출도를 더 올린다.',
      action: '노드 선택',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Authority Trace',
      intro: 'Move only through adjacent nodes, collect KEY traces, then reach EXIT before exposure peaks.',
      action: 'Select Node',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  }
};

function MiniPanel(p){
  return h('div',{
    style:{
      position:'absolute',inset:0,zIndex:40,
      background:'rgba(2,8,4,0.96)',
      display:'flex',alignItems:'center',justifyContent:'center',
      padding:'18px'
    }
  }, h('div',{
      style:{
        width:'100%',maxWidth:720,
        border:'1px solid rgba(122,255,198,0.28)',
        borderRadius:'18px',
        background:'linear-gradient(180deg, rgba(6,20,12,0.98), rgba(3,10,7,0.98))',
        boxShadow:'0 0 30px rgba(62,255,167,0.08)',
        padding:'18px 18px 16px'
      }
    }, p.children));
}

function SignalMiniGame(p){
  var copy=p.copy;
  var startBand=0.45+Math.random()*0.1;
  var bandWidth=0.08;
  var partialWidth=0.03;
  var _cursor=useState(0.18+Math.random()*0.12),cursor=_cursor[0],setCursor=_cursor[1];
  var _dir=useState(1),dir=_dir[0],setDir=_dir[1];
  var _time=useState(8),time=_time[0],setTime=_time[1];
  var finished=useRef(false);
  var bandRef=useRef({start:startBand,end:startBand+bandWidth,partial:partialWidth});

  useEffect(function(){
    var moveTimer=setInterval(function(){
      setCursor(function(prev){
        var next=prev+(dir*0.025);
        if(next>=0.95){setDir(-1);return 0.95;}
        if(next<=0.05){setDir(1);return 0.05;}
        return next;
      });
    },40);
    return function(){clearInterval(moveTimer);};
  },[dir]);

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){
      finished.current=true;
      p.onDone('fail');
      return;
    }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,p]);

  useEffect(function(){
    var onKey=function(e){
      if(e.key===' '||e.key==='Enter'){e.preventDefault();confirmHit();}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey);};
  });

  function confirmHit(){
    if(finished.current)return;
    finished.current=true;
    var band=bandRef.current;
    var rank='fail';
    if(cursor>=band.start&&cursor<=band.end)rank=(time>=5?'great':'success');
    else if(cursor>=band.start-band.partial&&cursor<=band.end+band.partial)rank='partial';
    p.onDone(rank);
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'M-002'),
      h('span',null,'SIGNAL ALIGNMENT')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:18}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:8}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'PARTIAL ±1 CELL')),
    h('div',{style:{padding:'18px 14px 22px',border:'1px solid rgba(122,255,198,0.22)',borderRadius:'22px',background:'rgba(5,18,11,0.76)'}},
      h('div',{style:{position:'relative',height:138,borderRadius:'16px',overflow:'hidden',background:'linear-gradient(180deg, rgba(9,36,28,0.95), rgba(4,18,13,0.95))'}},
        h('div',{style:{position:'absolute',inset:0,backgroundImage:'linear-gradient(90deg, rgba(122,255,198,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(122,255,198,0.04) 1px, transparent 1px)',backgroundSize:'22px 22px'}}),
        h('div',{style:{position:'absolute',left:'0',right:'0',top:'49%',height:'2px',background:'rgba(72,232,255,0.8)',boxShadow:'0 0 8px rgba(72,232,255,0.35)'}}),
        h('div',{style:{position:'absolute',top:'0',bottom:'0',left:(bandRef.current.start*100)+'%',width:((bandRef.current.end-bandRef.current.start)*100)+'%',background:'rgba(245,188,64,0.16)',borderLeft:'2px solid rgba(245,188,64,0.9)',borderRight:'2px solid rgba(245,188,64,0.9)'}}),
        h('div',{style:{position:'absolute',top:'0',bottom:'0',left:((bandRef.current.start-bandRef.current.partial)*100)+'%',width:(bandRef.current.partial*100)+'%',borderRight:'1px dashed rgba(245,188,64,0.7)'}}),
        h('div',{style:{position:'absolute',top:'0',bottom:'0',left:(bandRef.current.end*100)+'%',width:(bandRef.current.partial*100)+'%',borderLeft:'1px dashed rgba(245,188,64,0.7)'}}),
        h('div',{style:{position:'absolute',top:'10px',bottom:'10px',left:(cursor*100)+'%',width:'9px',transform:'translateX(-50%)',borderRadius:'999px',background:'#78ffbe',boxShadow:'0 0 18px rgba(120,255,190,0.95), 0 0 44px rgba(120,255,190,0.35)'}})
      ),
      h('div',{style:{display:'flex',justifyContent:'center',marginTop:18}},
        h('button',{className:'btn',onClick:confirmHit,style:{minWidth:180,padding:'12px 18px',fontSize:18,borderRadius:'999px'}},copy.action))
    ));
}

function SequenceMiniGame(p){
  var copy=p.copy;
  var protocols=[
    { label:'RED OFF > AUX ON > MAIN LOCK', sequence:['RED','AUX','LOCK'] },
    { label:'VENT CLOSE > AUX ON > SEAL', sequence:['VENT','AUX','SEAL'] },
    { label:'AUX ON > LOCK > PURGE HOLD', sequence:['AUX','LOCK','PURGE'] }
  ];
  var protoRef=useRef(null);
  if(!protoRef.current)protoRef.current=protocols[Math.floor(Math.random()*protocols.length)];
  var proto=protoRef.current;
  var _step=useState(0),step=_step[0],setStep=_step[1];
  var _errors=useState(0),errors=_errors[0],setErrors=_errors[1];
  var _time=useState(11),time=_time[0],setTime=_time[1];
  var finished=useRef(false);
  var buttons=['RED','AUX','LOCK','VENT','SEAL','PURGE'];

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){
      finished.current=true;
      if(step>=proto.sequence.length-1&&step>0)p.onDone('partial');
      else p.onDone('fail');
      return;
    }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,step,p,proto.sequence.length]);

  function pressButton(id){
    if(finished.current)return;
    if(proto.sequence[step]===id){
      var nextStep=step+1;
      if(nextStep>=proto.sequence.length){
        finished.current=true;
        if(errors===0&&time>=6)p.onDone('great');
        else if(errors<=1)p.onDone('success');
        else p.onDone('partial');
        return;
      }
      setStep(nextStep);
      return;
    }
    setErrors(function(v){return v+1;});
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'MI-01'),
      h('span',null,'QUARANTINE SEQUENCE')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:16}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:8}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'ERROR: '+errors)),
    h('div',{style:{padding:'16px',border:'1px solid rgba(122,255,198,0.22)',borderRadius:'22px',background:'rgba(5,18,11,0.76)'}},
      h('div',{style:{padding:'14px 16px',marginBottom:14,border:'1px solid rgba(240,176,70,0.35)',borderRadius:'14px',background:'rgba(30,18,5,0.38)',fontFamily:"'Share Tech Mono',monospace",fontSize:15,color:'#f3c35b'}},proto.label),
      h('div',{style:{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}},
        proto.sequence.map(function(id,idx){
          return h('div',{key:id+'-'+idx,style:{padding:'8px 10px',minWidth:84,textAlign:'center',borderRadius:'999px',border:'1px solid '+(idx<step?'rgba(122,255,198,0.65)':idx===step?'rgba(245,188,64,0.8)':'rgba(122,255,198,0.18)'),color:idx<step?'#7affc6':idx===step?'#f3c35b':'rgba(210,235,220,0.45)',fontFamily:"'Share Tech Mono',monospace",fontSize:12}},id);
        })),
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(0, 1fr))',gap:12}},
        buttons.map(function(id){
          return h('button',{key:id,className:'btn',onClick:function(){pressButton(id);},style:{padding:'14px 12px',fontFamily:"'Share Tech Mono',monospace",fontSize:16,borderRadius:'14px'}},id);
        }))
    ));
}

function BreachMiniGame(p){
  var copy=p.copy;
  var layouts=[
    {
      start:'S', exit:'X',
      nodes:{
        S:{x:8,y:56,adj:['A'],type:'start'},
        A:{x:25,y:30,adj:['S','B','C'],type:'normal'},
        B:{x:42,y:18,adj:['A','D'],type:'key'},
        C:{x:40,y:58,adj:['A','D','E'],type:'trap'},
        D:{x:58,y:35,adj:['B','C','F'],type:'normal'},
        E:{x:58,y:72,adj:['C','F'],type:'key'},
        F:{x:77,y:50,adj:['D','E','X'],type:'normal'},
        X:{x:92,y:34,adj:['F'],type:'exit'}
      }
    },
    {
      start:'S', exit:'X',
      nodes:{
        S:{x:8,y:30,adj:['A'],type:'start'},
        A:{x:24,y:30,adj:['S','B','C'],type:'normal'},
        B:{x:42,y:16,adj:['A','D'],type:'trap'},
        C:{x:42,y:48,adj:['A','D','E'],type:'key'},
        D:{x:60,y:30,adj:['B','C','F'],type:'normal'},
        E:{x:60,y:66,adj:['C','F'],type:'normal'},
        F:{x:78,y:48,adj:['D','E','X'],type:'key'},
        X:{x:92,y:26,adj:['F'],type:'exit'}
      }
    },
    {
      start:'S', exit:'X',
      nodes:{
        S:{x:9,y:44,adj:['A'],type:'start'},
        A:{x:26,y:44,adj:['S','B','C'],type:'normal'},
        B:{x:42,y:22,adj:['A','D'],type:'key'},
        C:{x:42,y:66,adj:['A','E'],type:'normal'},
        D:{x:60,y:22,adj:['B','F'],type:'trap'},
        E:{x:60,y:66,adj:['C','F'],type:'key'},
        F:{x:78,y:44,adj:['D','E','X'],type:'normal'},
        X:{x:92,y:44,adj:['F'],type:'exit'}
      }
    }
  ];
  var _layoutIndex=useState(function(){ return Math.floor(Math.random()*layouts.length); }),layoutIndex=_layoutIndex[0];
  var layout=layouts[layoutIndex];
  var _current=useState(layout.start),current=_current[0],setCurrent=_current[1];
  var _keys=useState([]),keys=_keys[0],setKeys=_keys[1];
  var _exp=useState(0),exp=_exp[0],setExp=_exp[1];
  var _time=useState(16),time=_time[0],setTime=_time[1];
  var _moves=useState(0),moves=_moves[0],setMoves=_moves[1];
  var _trapHits=useState(0),trapHits=_trapHits[0],setTrapHits=_trapHits[1];
  var finished=useRef(false);
  var edgeSeen={};
  var edges=[];

  Object.keys(layout.nodes).forEach(function(id){
    var node=layout.nodes[id];
    node.adj.forEach(function(adj){
      var edgeKey=[id,adj].sort().join('-');
      if(edgeSeen[edgeKey])return;
      edgeSeen[edgeKey]=true;
      edges.push({from:id,to:adj});
    });
  });

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){
      finished.current=true;
      if(moves>0&&keys.length>0)p.onDone('partial');
      else p.onDone('fail');
      return;
    }
    if(exp>=8){
      finished.current=true;
      p.onDone('fail');
      return;
    }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,exp,moves,keys,p]);

  function moveTo(id){
    if(finished.current)return;
    var curNode=layout.nodes[current];
    if(curNode.adj.indexOf(id)<0)return;
    var target=layout.nodes[id];
    var isNewKey=target.type==='key'&&keys.indexOf(id)<0;
    var nextKeys=isNewKey?keys.concat([id]):keys;
    var nextExp=exp+(target.type==='trap'?2:1);
    var nextTrapHits=trapHits+(target.type==='trap'?1:0);
    setCurrent(id);
    setMoves(function(v){return v+1;});
    if(isNewKey){
      setKeys(function(prev){return prev.concat([id]);});
    }
    if(target.type==='trap'){
      setTrapHits(function(v){return v+1;});
      setExp(function(v){return v+2;});
    } else {
      setExp(function(v){return v+1;});
    }
    if(id===layout.exit&&nextKeys.length>=2){
      finished.current=true;
      if(nextTrapHits===0&&nextExp<=4&&time>=8)p.onDone('great');
      else p.onDone('success');
    }
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'MI-04'),
      h('span',null,'ORACLE TRACE')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:16}},copy.intro),
      h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:8}},
        h('span',null,'TIME: '+time+'s'),
        h('span',null,'EXPOSURE: '+exp+'/8'),
        h('span',null,'KEY: '+keys.length+'/2')),
      h('div',{style:{padding:'16px',border:'1px solid rgba(122,255,198,0.22)',borderRadius:'22px',background:'rgba(5,18,11,0.76)'}},
        h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'rgba(210,235,220,0.5)',letterSpacing:1.2}},
          h('span',null,'TRACE GRID: '+(layoutIndex+1)),
          h('span',null,'START -> 2 KEYS -> EXIT')),
        h('div',{style:{height:8,borderRadius:999,overflow:'hidden',background:'rgba(15,35,22,0.9)',marginBottom:16}},
          h('div',{style:{height:'100%',width:Math.min(100,exp/8*100)+'%',background:exp>=6?'#ff7a7a':'#78ffbe'}})),
        h('div',{key:'board-'+layoutIndex,style:{position:'relative',height:260,border:'1px solid rgba(122,255,198,0.16)',borderRadius:'18px',background:'radial-gradient(circle at 50% 50%, rgba(14,40,28,0.96), rgba(4,15,10,0.98))'}},
          edges.map(function(edge){
              var a=layout.nodes[edge.from],b=layout.nodes[edge.to];
              var dx=b.x-a.x, dy=b.y-a.y;
              var len=Math.sqrt(dx*dx+dy*dy);
              var ang=Math.atan2(dy,dx)*180/Math.PI;
              return h('div',{key:edge.from+'-'+edge.to,style:{
                position:'absolute',
                left:a.x+'%', top:a.y+'%',
                width:len+'%', height:'2px',
                transform:'translateY(-50%) rotate('+ang+'deg)',
                transformOrigin:'0 50%',
                background:'rgba(122,255,198,0.18)'
              }});
          }),
          Object.keys(layout.nodes).map(function(id){
          var node=layout.nodes[id];
          var unlocked=(id===layout.exit?keys.length>=2:true);
          var isAdj=layout.nodes[current].adj.indexOf(id)>=0;
          var baseColor=node.type==='trap'?'#ff8f8f':node.type==='key'?'#f3c35b':node.type==='exit'?'#8ad7ff':'#7affc6';
          var bg=id===current?'rgba(122,255,198,0.18)':'rgba(7,20,12,0.94)';
          var border=id===current?'2px solid #7affc6':'1px solid '+baseColor;
          var opacity=(id===current||isAdj||id===layout.start)?1:(node.type==='exit'&&keys.length<2?0.45:0.72);
          return h('button',{key:id,onClick:function(){moveTo(id);},disabled:id!==current&&!isAdj||node.type==='exit'&&!unlocked,style:{
            position:'absolute',left:node.x+'%',top:node.y+'%',transform:'translate(-50%, -50%)',
            width:54,height:54,borderRadius:'50%',border:border,background:bg,color:baseColor,
            fontFamily:"'Share Tech Mono',monospace",fontSize:12,cursor:(id!==current&&isAdj)?'pointer':'default',
            opacity:opacity,boxShadow:id===current?'0 0 18px rgba(122,255,198,0.28)':'none'
          }},id===layout.start?'IN':id===layout.exit?'OUT':node.type==='key'?'KEY':node.type==='trap'?'ICE':'NODE');
        }))
    ));
}

function FieldMiniGameOverlay(p){
  if(!p.game)return null;
  var game=FIELD_MINIGAME_LIBRARY[p.game.type];
  if(!game)return null;
  var copy=getMiniLocaleCopy(game);
  if(p.game.type==='signal')return h(SignalMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='sequence')return h(SequenceMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='breach')return h(BreachMiniGame,{copy:copy,onDone:p.onDone});
  return null;
}
