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
    log: logs.length===0?null:(logs.length===1?logs[0]:logs),
    miniGame: add.miniGame||src.miniGame||null
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
      intro: '초록 커서를 황색 안정 구간에 맞춰 신호를 고정한다. 오차가 크면 현장 분석값이 무너진다.',
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
      action: '입력',
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
      intro: '인접한 노드만 따라 움직이며 KEY 흔적을 모은 뒤 EXIT로 빠져나온다. 붉은 노드는 노출도를 올린다.',
      action: '노드 선택',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Authority Trace',
      intro: 'Move only through adjacent nodes, collect KEY traces, then reach EXIT before exposure peaks.',
      action: 'Select Node',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  route: {
    id: 'route',
    kind: 'ROUTE EVADE',
    ko: {
      title: '수로 추적 우회 경로',
      intro: '제한 이동 횟수 안에 위험 타일을 피해 목표 지점까지 이동한다. 빨간 칸은 진입 즉시 실패다.',
      action: '이동',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Drainage Route Intercept',
      intro: 'Reach the target within limited moves while avoiding danger tiles. Red tiles fail on contact.',
      action: 'Move',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  sample: {
    id: 'sample',
    kind: 'SAMPLE RECOVERY',
    ko: {
      title: '활성 샘플 추적 회수',
      intro: '회수 탐침을 조작해 이동하는 활성 샘플을 회수장 안에 붙잡고 회수율을 채운다.',
      action: '회수 장비 작동',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Active Sample Tracking Recovery',
      intro: 'Operate the extractor probe, keep the active specimen inside the recovery field, and fill recovery progress.',
      action: 'Operate Extractor',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  scan: {
    id: 'scan',
    kind: 'SCAN SEARCH',
    ko: {
      title: '미등록 통로 생체 반응 스캔',
      intro: '스캐너를 움직여 이상 반응 중심을 붙잡는다. 가짜 반응 위에 오래 머물면 스캔이 흔들린다.',
      action: '스캔 유지',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Unregistered Passage Bio-Signal Scan',
      intro: 'Sweep the scanner across the sector and hold on the true anomaly. Decoys destabilize the lock.',
      action: 'Hold Scan',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  evidence: {
    id: 'evidence',
    kind: 'EVIDENCE SORT',
    ko: {
      title: '현장 단서 분류',
      intro: '제한된 판독 슬롯 안에 실제 단서만 골라 넣는다. 잡음 자료가 많을수록 다음 판단이 흐려진다.',
      action: '판독 확정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Evidence Triage',
      intro: 'Fill the limited review slots with real clues only. Noise data will blur the next call.',
      action: 'Lock Review',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  reconstruction: {
    id: 'reconstruction',
    kind: 'LOG RECONSTRUCTION',
    ko: {
      title: '로그 복원 시퀀스',
      intro: '깨진 기록 조각을 시간 순서대로 다시 이어 붙인다. 잘못 잇는 순간 추적선이 흐트러진다.',
      action: '조각 선택',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Log Reconstruction Sequence',
      intro: 'Restore broken record fragments in the right order before the trace collapses.',
      action: 'Select Fragment',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  statement: {
    id: 'statement',
    kind: 'STATEMENT VERIFY',
    ko: {
      title: '진술 교차 검증',
      intro: '증언과 기록을 대조해 모순되는 진술 하나를 가려낸다. 잘못 짚으면 조사선이 완전히 흔들린다.',
      action: '모순 지정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Statement Cross-Check',
      intro: 'Compare testimony against hard records and isolate the inconsistent line.',
      action: 'Flag Contradiction',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  screening: {
    id: 'screening',
    kind: 'LATENT SCREEN',
    ko: {
      title: '잠복 반응 스크리닝',
      intro: '대기 인원의 생체·신경 반응을 빠르게 훑어 잠복 노출자를 식별한다. 오판은 현장 불안을 키운다.',
      action: '판독 확정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Latent Response Screening',
      intro: 'Sweep waiting personnel and isolate hidden exposure signs before the room destabilizes.',
      action: 'Confirm Screening',
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
  var busy=useRef(false);
  busy.current=false;
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
    if(finished.current||busy.current)return;
    var curNode=layout.nodes[current];
    if(curNode.adj.indexOf(id)<0)return;
    busy.current=true;
    var target=layout.nodes[id];
    var isNewKey=target.type==='key'&&keys.indexOf(id)<0;
    var nextKeys=isNewKey?keys.concat([id]):keys;
    var nextExp=exp+(target.type==='trap'?2:1);
    var nextTrapHits=trapHits+(target.type==='trap'?1:0);
    setCurrent(id);
    setMoves(function(v){return v+1;});
    if(isNewKey)setKeys(function(prev){return prev.concat([id]);});
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
          var dx=b.x-a.x,dy=b.y-a.y;
          var len=Math.sqrt(dx*dx+dy*dy);
          var ang=Math.atan2(dy,dx)*180/Math.PI;
          return h('div',{key:edge.from+'-'+edge.to,style:{
            position:'absolute',
            left:a.x+'%',top:a.y+'%',
            width:len+'%',height:'2px',
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
          return h('button',{key:id,onClick:function(){moveTo(id);},disabled:(id!==current&&!isAdj)||(node.type==='exit'&&!unlocked),style:{
            position:'absolute',left:node.x+'%',top:node.y+'%',transform:'translate(-50%, -50%)',
            width:54,height:54,borderRadius:'50%',border:border,background:bg,color:baseColor,
            fontFamily:"'Share Tech Mono',monospace",fontSize:12,cursor:(id!==current&&isAdj)?'pointer':'default',
            opacity:opacity,boxShadow:id===current?'0 0 18px rgba(122,255,198,0.28)':'none'
          }},id===layout.start?'IN':id===layout.exit?'OUT':node.type==='key'?'KEY':node.type==='trap'?'ICE':'NODE');
        }))
    ));
}

function SampleMiniGame(p){
  var copy=p.copy;
  var _probe=useState(50),probe=_probe[0],setProbe=_probe[1];
  var _sample=useState(26+Math.random()*48),sample=_sample[0],setSample=_sample[1];
  var _sampleDir=useState(1),sampleDir=_sampleDir[0],setSampleDir=_sampleDir[1];
  var _capture=useState(0),capture=_capture[0],setCapture=_capture[1];
  var _overload=useState(12),overload=_overload[0],setOverload=_overload[1];
  var _hold=useState(false),hold=_hold[0],setHold=_hold[1];
  var _time=useState(18),time=_time[0],setTime=_time[1];
  var finished=useRef(false);

  function finishByProgress(nextCapture,nextOverload){
    if(finished.current)return;
    finished.current=true;
    if(nextCapture>=96&&nextOverload<45)p.onDone('great');
    else if(nextCapture>=96)p.onDone('success');
    else if(nextCapture>=55)p.onDone('partial');
    else p.onDone('fail');
  }

  useEffect(function(){
    if(finished.current)return;
    var motionTimer=setInterval(function(){
      setProbe(function(prev){ return Math.max(6,Math.min(94,prev+(hold?1.35:-0.95))); });
      setSample(function(prev){
        var next=prev+sampleDir*(0.55+Math.sin(Date.now()/280)*0.18);
        if(next<=18){ setSampleDir(1); return 18; }
        if(next>=84){ setSampleDir(-1); return 84; }
        return next;
      });
      setCapture(function(prev){
        var overlap=Math.abs(probe-sample)<=8;
        return Math.max(0,Math.min(100,prev+(overlap?1.8:-0.45)));
      });
      setOverload(function(prev){
        var overlap=Math.abs(probe-sample)<=8;
        var next=Math.max(0,Math.min(100,prev+(hold?0.9:-0.65)+(overlap?0.2:0)));
        if(next>=98)finishByProgress(0,100);
        return next;
      });
    },40);
    return function(){clearInterval(motionTimer);};
  },[hold,probe,sample,sampleDir]);

  useEffect(function(){
    if(finished.current)return;
    if(capture>=100){
      finishByProgress(capture,overload);
      return;
    }
    if(time<=0){
      finishByProgress(capture,overload);
      return;
    }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,capture,overload]);

  useEffect(function(){
    var onKey=function(e){
      if(e.key===' '||e.key==='Enter'){ e.preventDefault(); setHold(true); }
    };
    var onKeyUp=function(e){
      if(e.key===' '||e.key==='Enter'){ e.preventDefault(); setHold(false); }
    };
    window.addEventListener('keydown',onKey);
    window.addEventListener('keyup',onKeyUp);
    return function(){
      window.removeEventListener('keydown',onKey);
      window.removeEventListener('keyup',onKeyUp);
    };
  },[]);

  var overlap=Math.abs(probe-sample)<=8;

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'MI-03'),
      h('span',null,'SAMPLE RECOVERY')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:16}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:8}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'RECOVERY: '+Math.round(capture)+'%'),
      h('span',null,'OVERLOAD: '+Math.round(overload)+'%')),
    h('div',{style:{padding:'16px',border:'1px solid rgba(122,255,198,0.22)',borderRadius:'22px',background:'rgba(5,18,11,0.76)'}},
      h('div',{style:{position:'relative',height:180,borderRadius:'18px',overflow:'hidden',marginBottom:18,border:'1px solid rgba(122,255,198,0.16)',background:'linear-gradient(180deg, rgba(8,24,18,0.96), rgba(4,14,10,0.98))'}},
        h('div',{style:{position:'absolute',left:'0',right:'0',top:'50%',height:'1px',background:'rgba(122,255,198,0.08)'}}),
        h('div',{style:{position:'absolute',left:'12%',right:'12%',top:'32%',height:'36%',border:'1px solid rgba(72,232,255,0.18)',borderRadius:'999px',background:overlap?'rgba(72,232,255,0.08)':'transparent'}}),
        h('div',{style:{position:'absolute',left:sample+'%',top:'50%',transform:'translate(-50%,-50%)',width:30,height:30,borderRadius:'50%',background:'rgba(245,188,64,0.18)',border:'2px solid rgba(245,188,64,0.85)',boxShadow:'0 0 16px rgba(245,188,64,0.25)'}}),
        h('div',{style:{position:'absolute',left:probe+'%',top:'50%',transform:'translate(-50%,-50%)',width:10,height:120,borderRadius:'999px',background:'#78ffbe',boxShadow:'0 0 18px rgba(120,255,190,0.85), 0 0 36px rgba(120,255,190,0.22)'}})
      ),
      h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}},
        h('div',null,
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'rgba(210,235,220,0.65)',marginBottom:6}},'RECOVERY'),
          h('div',{style:{height:10,borderRadius:999,overflow:'hidden',background:'rgba(15,35,22,0.9)'}},
            h('div',{style:{height:'100%',width:Math.min(100,capture)+'%',background:'#78ffbe'}}))
        ),
        h('div',null,
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'rgba(210,235,220,0.65)',marginBottom:6}},'OVERLOAD'),
          h('div',{style:{height:10,borderRadius:999,overflow:'hidden',background:'rgba(15,35,22,0.9)'}},
            h('div',{style:{height:'100%',width:Math.min(100,overload)+'%',background:'#ff8f8f'}}))
        )
      ),
      h('div',{style:{display:'flex',justifyContent:'center'}},
        h('button',{
          className:'btn',
          onMouseDown:function(){setHold(true);},
          onMouseUp:function(){setHold(false);},
          onMouseLeave:function(){setHold(false);},
          onTouchStart:function(e){e.preventDefault();setHold(true);},
          onTouchEnd:function(e){e.preventDefault();setHold(false);},
          style:{minWidth:220,padding:'12px 18px',fontSize:17,borderRadius:'999px',background:hold?'rgba(120,255,190,0.18)':'rgba(5,18,11,0.96)'}
        },copy.action))
    ));
}

function ScanMiniGame(p){
  var copy=p.copy;
  var layouts=[
    { target:{x:68,y:42}, decoys:[{x:24,y:32},{x:46,y:72},{x:82,y:70}] },
    { target:{x:34,y:66}, decoys:[{x:64,y:28},{x:76,y:54},{x:20,y:22}] },
    { target:{x:78,y:68}, decoys:[{x:32,y:38},{x:56,y:48},{x:18,y:74}] }
  ];
  var layoutRef=useRef(null);
  if(!layoutRef.current)layoutRef.current=layouts[Math.floor(Math.random()*layouts.length)];
  var target=layoutRef.current.target;
  var decoys=layoutRef.current.decoys;
  var _cursor=useState({x:50,y:50}),cursor=_cursor[0],setCursor=_cursor[1];
  var _lock=useState(0),lock=_lock[0],setLock=_lock[1];
  var _time=useState(18),time=_time[0],setTime=_time[1];
  var finished=useRef(false);

  function moveScanner(clientX,clientY,rect){
    var x=((clientX-rect.left)/rect.width)*100;
    var y=((clientY-rect.top)/rect.height)*100;
    setCursor({x:Math.max(0,Math.min(100,x)),y:Math.max(0,Math.min(100,y))});
  }

  useEffect(function(){
    if(finished.current)return;
    var tick=setInterval(function(){
      setLock(function(prev){
        var dist=Math.sqrt(Math.pow(cursor.x-target.x,2)+Math.pow(cursor.y-target.y,2));
        var decoyHit=decoys.some(function(d){
          return Math.sqrt(Math.pow(cursor.x-d.x,2)+Math.pow(cursor.y-d.y,2))<9;
        });
        var next=prev;
        if(dist<9)next=prev+1;
        else if(decoyHit)next=Math.max(0,prev-1);
        else next=Math.max(0,prev-0.35);
        if(next>=10&&!finished.current){
          finished.current=true;
          p.onDone(dist<4?'great':'success');
          return 10;
        }
        return next;
      });
    },100);
    return function(){clearInterval(tick);};
  },[cursor,p,target,decoys]);

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){
      finished.current=true;
      if(lock>=6)p.onDone('partial');
      else p.onDone('fail');
      return;
    }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,lock,p]);

  var percent=Math.min(100,Math.round(lock*10));
  var distNow=Math.sqrt(Math.pow(cursor.x-target.x,2)+Math.pow(cursor.y-target.y,2));
  var decoyNow=decoys.some(function(d){
    return Math.sqrt(Math.pow(cursor.x-d.x,2)+Math.pow(cursor.y-d.y,2))<9;
  });

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'MI-05'),
      h('span',null,'SCAN SEARCH')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:16}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:8}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'SIGNAL: '+percent+'%')),
    h('div',{style:{padding:'16px',border:'1px solid rgba(122,255,198,0.22)',borderRadius:'22px',background:'rgba(5,18,11,0.76)'}},
      h('div',{
        style:{position:'relative',height:280,border:'1px solid rgba(122,255,198,0.16)',borderRadius:'18px',overflow:'hidden',background:'radial-gradient(circle at 50% 50%, rgba(12,34,24,0.96), rgba(4,14,10,0.98))'},
        onMouseMove:function(e){moveScanner(e.clientX,e.clientY,e.currentTarget.getBoundingClientRect());},
        onTouchStart:function(e){var t=e.touches[0];moveScanner(t.clientX,t.clientY,e.currentTarget.getBoundingClientRect());e.preventDefault();},
        onTouchMove:function(e){var t=e.touches[0];moveScanner(t.clientX,t.clientY,e.currentTarget.getBoundingClientRect());e.preventDefault();}
      },
        h('div',{style:{position:'absolute',inset:0,backgroundImage:'linear-gradient(90deg, rgba(122,255,198,0.03) 1px, transparent 1px), linear-gradient(180deg, rgba(122,255,198,0.03) 1px, transparent 1px)',backgroundSize:'28px 28px'}}),
        decoys.map(function(d,idx){
          return h('div',{key:'d'+idx,style:{position:'absolute',left:d.x+'%',top:d.y+'%',width:24,height:24,transform:'translate(-50%,-50%)',borderRadius:'50%',background:'rgba(255,122,122,0.08)',border:'1px dashed rgba(255,122,122,0.38)'}});
        }),
        h('div',{style:{position:'absolute',left:target.x+'%',top:target.y+'%',width:28,height:28,transform:'translate(-50%,-50%)',borderRadius:'50%',background:'rgba(72,232,255,0.08)',border:'1px solid rgba(72,232,255,0.32)'}}),
        h('div',{style:{position:'absolute',left:cursor.x+'%',top:cursor.y+'%',width:90,height:90,transform:'translate(-50%,-50%)',borderRadius:'50%',border:'2px solid '+(decoyNow?'#ff8f8f':'#78ffbe'),boxShadow:(distNow<9?'0 0 18px rgba(120,255,190,0.32)':'none')}}),
        h('div',{style:{position:'absolute',left:cursor.x+'%',top:cursor.y+'%',width:14,height:14,transform:'translate(-50%,-50%)',borderRadius:'50%',background:decoyNow?'#ff8f8f':'#78ffbe'}}),
        h('div',{style:{position:'absolute',left:'50%',bottom:16,transform:'translateX(-50%)',padding:'8px 14px',borderRadius:'999px',border:'1px solid '+(percent>0?'rgba(120,255,190,0.45)':'rgba(122,255,198,0.16)'),fontFamily:"'Share Tech Mono',monospace",fontSize:14,color:percent>0?'#78ffbe':'rgba(210,235,220,0.55)',background:'rgba(5,18,11,0.84)'}},'SIGNAL '+percent+'%')
      )
    ));
}

function RouteMiniGame(p){
  var copy=p.copy;
  var sheets=[
    { pos:20, goal:4, moves:9, danger:[7,12,17], block:[1,6,16], jammer:[13] },
    { pos:24, goal:0, moves:10, danger:[8,13,18], block:[3,4,14], jammer:[11,17] },
    { pos:22, goal:2, moves:8, danger:[6,7,18], block:[10,15,20], jammer:[12] }
  ];
  var sheetRef=useRef(null);
  if(!sheetRef.current)sheetRef.current=sheets[Math.floor(Math.random()*sheets.length)];
  var sheet=sheetRef.current;
  var _pos=useState(sheet.pos),pos=_pos[0],setPos=_pos[1];
  var _moves=useState(sheet.moves),moves=_moves[0],setMoves=_moves[1];
  var finished=useRef(false);

  function rankForSuccess(remaining){
    return remaining>=Math.ceil(sheet.moves/2)?'great':'success';
  }

  function moveTo(idx){
    if(finished.current)return;
    var px=pos%5,py=Math.floor(pos/5);
    var tx=idx%5,ty=Math.floor(idx/5);
    if(Math.abs(px-tx)+Math.abs(py-ty)!==1)return;
    if(sheet.block.indexOf(idx)>=0)return;
    if(sheet.danger.indexOf(idx)>=0){
      finished.current=true;
      setPos(idx);
      p.onDone('fail');
      return;
    }
    var cost=sheet.jammer.indexOf(idx)>=0?2:1;
    var nextMoves=moves-cost;
    setPos(idx);
    setMoves(nextMoves);
    if(idx===sheet.goal){
      finished.current=true;
      p.onDone(rankForSuccess(nextMoves));
      return;
    }
    if(nextMoves<=0){
      finished.current=true;
      var gx=sheet.goal%5,gy=Math.floor(sheet.goal/5);
      if(Math.abs(tx-gx)+Math.abs(ty-gy)===1)p.onDone('partial');
      else p.onDone('fail');
    }
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'M-010'),
      h('span',null,'ROUTE EVADE')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:16}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:8}},
      h('span',null,'MOVES: '+moves),
      h('span',null,'RED=FAIL / AMBER=-2')),
    h('div',{style:{padding:'16px',border:'1px solid rgba(122,255,198,0.22)',borderRadius:'22px',background:'rgba(5,18,11,0.76)'}},
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(5, minmax(0, 1fr))',gap:10}},
        Array.from({length:25}).map(function(_,idx){
          var isPlayer=idx===pos;
          var isGoal=idx===sheet.goal;
          var isDanger=sheet.danger.indexOf(idx)>=0;
          var isBlock=sheet.block.indexOf(idx)>=0;
          var isJammer=sheet.jammer.indexOf(idx)>=0;
          var bg='rgba(6,18,11,0.96)';
          var border='1px solid rgba(122,255,198,0.16)';
          if(isDanger){ bg='rgba(80,12,12,0.95)'; border='1px solid rgba(255,122,122,0.6)'; }
          if(isBlock){ bg='rgba(42,42,42,0.92)'; border='1px solid rgba(180,180,180,0.25)'; }
          if(isJammer){ bg='rgba(64,40,10,0.95)'; border='1px solid rgba(245,188,64,0.5)'; }
          if(isGoal){ bg='rgba(10,40,52,0.95)'; border='1px solid rgba(138,215,255,0.55)'; }
          if(isPlayer){ bg='rgba(18,64,38,0.96)'; border='2px solid rgba(120,255,190,0.95)'; }
          return h('button',{
            key:idx,
            className:'btn',
            disabled:isBlock||finished.current,
            onClick:function(){moveTo(idx);},
            style:{
              aspectRatio:'1 / 1',
              borderRadius:'12px',
              padding:0,
              background:bg,
              border:border,
              color:isGoal?'#8ad7ff':isDanger?'#ff8f8f':isJammer?'#f3c35b':isBlock?'rgba(200,200,200,0.38)':isPlayer?'#78ffbe':'rgba(210,235,220,0.55)',
              fontFamily:"'Share Tech Mono',monospace",
              fontSize:13,
              cursor:isBlock?'default':'pointer'
            }
          },isPlayer?'IN':isGoal?'OUT':isDanger?'X':isBlock?'■':isJammer?'~':'·');
        })
      )
    ));
}

function EvidenceMiniGame(p){
  var copy=p.copy;
  var cases=[
    { leadKo:'벽면 좌표와 장비 흔적을 검토한다.', leadEn:'Review the wall coordinates and equipment traces.', correct:['coord','salt','boot'], items:[
      {id:'coord',ko:'해안 좌표 각인',en:'Coastline coordinates'},
      {id:'salt',ko:'염분 묻은 통신 케이블',en:'Salt-stained comm cable'},
      {id:'cup',ko:'뒤집힌 금속 컵',en:'Overturned metal cup'},
      {id:'boot',ko:'비규격 전술화 자국',en:'Non-standard boot marks'},
      {id:'dust',ko:'먼지 낀 램프 파편',en:'Dusty lamp shard'},
      {id:'ash',ko:'식은 화로 재',en:'Cold brazier ash'}
    ]},
    { leadKo:'CCTV 공백 구간과 내부 로그를 대조한다.', leadEn:'Compare the CCTV blackout against internal logs.', correct:['time','route','patch'], items:[
      {id:'time',ko:'02:47 반복 타임코드',en:'02:47 repeating timestamp'},
      {id:'route',ko:'B1-B2 이동 흔적',en:'B1-B2 transit pattern'},
      {id:'food',ko:'식당 출입 기록',en:'Cafeteria access log'},
      {id:'patch',ko:'비인가 패치 해시',en:'Unauthorized patch hash'},
      {id:'light',ko:'형광등 점멸 기록',en:'Fluorescent flicker log'},
      {id:'temp',ko:'서버실 온도 편차',en:'Server room heat drift'}
    ]},
    { leadKo:'현장 샘플 보고와 오염 흔적을 추린다.', leadEn:'Sort the live sample report from contamination noise.', correct:['spike','resin','tag'], items:[
      {id:'spike',ko:'급상승 포자 밀도',en:'Spore density spike'},
      {id:'resin',ko:'응고 수지 흔적',en:'Coagulated resin trace'},
      {id:'glass',ko:'깨진 슬라이드 파편',en:'Broken slide fragments'},
      {id:'tag',ko:'오염 표식 누락 구간',en:'Missing contamination tag'},
      {id:'glove',ko:'찢어진 장갑 조각',en:'Torn glove scrap'},
      {id:'cart',ko:'빈 운반 카트',en:'Empty transport cart'}
    ]}
  ];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var caseRef=useRef(null);
  if(!caseRef.current)caseRef.current=cases[Math.floor(Math.random()*cases.length)];
  var active=caseRef.current;
  var _selected=useState([]),selected=_selected[0],setSelected=_selected[1];
  var _time=useState(18),time=_time[0],setTime=_time[1];
  var finished=useRef(false);

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){ finished.current=true; finalize(selected); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,selected]);

  function toggle(id){
    if(finished.current)return;
    setSelected(function(prev){
      if(prev.indexOf(id)>=0)return prev.filter(function(v){return v!==id;});
      if(prev.length>=3)return prev;
      return prev.concat([id]);
    });
  }

  function finalize(picks){
    var chosen=(picks||selected).slice();
    var hit=chosen.filter(function(id){return active.correct.indexOf(id)>=0;}).length;
    if(hit===3)p.onDone(time>=9?'great':'success');
    else if(hit===2)p.onDone('partial');
    else p.onDone('fail');
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'M-003'),
      h('span',null,'EVIDENCE SORT')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:14}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:10}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'PICKS: '+selected.length+'/3')),
    h('div',{style:{padding:'14px 16px',marginBottom:14,border:'1px solid rgba(245,188,64,0.35)',borderRadius:'16px',background:'rgba(32,24,8,0.35)',color:'#f3c35b',fontSize:14,lineHeight:1.6}},
      locale==='en'?active.leadEn:active.leadKo),
    h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(0,1fr))',gap:12,marginBottom:16}},
      active.items.map(function(item){
        var isOn=selected.indexOf(item.id)>=0;
        return h('button',{
          key:item.id,className:'btn',onClick:function(){toggle(item.id);},
          style:{minHeight:86,borderRadius:'16px',padding:'12px 14px',textAlign:'left',background:isOn?'rgba(120,255,190,0.14)':'rgba(5,18,11,0.9)',border:'1px solid '+(isOn?'rgba(120,255,190,0.55)':'rgba(122,255,198,0.18)'),color:isOn?'#ecfff4':'rgba(210,235,220,0.82)',fontSize:14,lineHeight:1.5}
        },locale==='en'?item.en:item.ko);
      })
    ),
    h('div',{style:{display:'flex',justifyContent:'center'}},
      h('button',{className:'btn',disabled:selected.length!==3,onClick:function(){if(!finished.current){finished.current=true;finalize(selected);}},style:{minWidth:220,padding:'12px 18px',fontSize:17,borderRadius:'999px',opacity:selected.length===3?1:0.45}},copy.action))
  );
}

function ReconstructionMiniGame(p){
  var copy=p.copy;
  var sequences=[
    { leadKo:'CCTV 공백 4조각을 시간 순서대로 이어 붙인다.', leadEn:'Rebuild the CCTV blackout in chronological order.', steps:[
      {id:'a',ko:'02:47 / B1 서버실 출입',en:'02:47 / B1 server entry'},
      {id:'b',ko:'02:49 / 통로 센서 비활성',en:'02:49 / transit sensor disabled'},
      {id:'c',ko:'02:51 / B2 접근 로그 공백',en:'02:51 / B2 access gap'},
      {id:'d',ko:'02:53 / 복귀 흔적 소실',en:'02:53 / return trace erased'}
    ]},
    { leadKo:'오염 보고 로그를 초기 발생부터 정렬한다.', leadEn:'Order the contamination report from first trigger onward.', steps:[
      {id:'a',ko:'배양기 내부 열 상승',en:'Internal chamber heat rise'},
      {id:'b',ko:'표본 격벽 점액화',en:'Sample partition liquefaction'},
      {id:'c',ko:'변이 구조 자가 형성',en:'Self-mutating structure formed'},
      {id:'d',ko:'관찰실 경보 기록',en:'Observation room alert logged'}
    ]},
    { leadKo:'보안구역 출입 위조 흔적을 복원한다.', leadEn:'Restore the forged security-access sequence.', steps:[
      {id:'a',ko:'허위 권한 요청 생성',en:'Spoofed authority request created'},
      {id:'b',ko:'출입 로그 해시 변조',en:'Access-log hash altered'},
      {id:'c',ko:'백도어 경로 삽입',en:'Backdoor route inserted'},
      {id:'d',ko:'감시 태그 자동 삭제',en:'Surveillance tag auto-purged'}
    ]}
  ];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var seqRef=useRef(null);
  if(!seqRef.current)seqRef.current=sequences[Math.floor(Math.random()*sequences.length)];
  var seq=seqRef.current;
  var shuffledRef=useRef(null);
  if(!shuffledRef.current)shuffledRef.current=seq.steps.slice().sort(function(){return Math.random()-0.5;});
  var items=shuffledRef.current;
  var _step=useState(0),step=_step[0],setStep=_step[1];
  var _errors=useState(0),errors=_errors[0],setErrors=_errors[1];
  var _time=useState(16),time=_time[0],setTime=_time[1];
  var finished=useRef(false);

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){ finished.current=true; p.onDone(step>=3?'partial':'fail'); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,step,p]);

  function selectItem(item){
    if(finished.current)return;
    var expected=seq.steps[step];
    if(item.id===expected.id){
      var nextStep=step+1;
      setStep(nextStep);
      if(nextStep>=seq.steps.length){ finished.current=true; p.onDone(errors===0&&time>=7?'great':(errors<=1?'success':'partial')); }
      return;
    }
    setErrors(function(v){return v+1;});
    if(errors+1>=3){ finished.current=true; p.onDone(step>=2?'partial':'fail'); }
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'MI-02'),
      h('span',null,'LOG RECONSTRUCTION')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:14}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:10}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'RESTORED: '+step+'/4'),
      h('span',null,'ERROR: '+errors)),
    h('div',{style:{padding:'14px 16px',marginBottom:14,border:'1px solid rgba(74,170,238,0.35)',borderRadius:'16px',background:'rgba(7,18,26,0.45)',color:'#8ad7ff',fontSize:14,lineHeight:1.6}},
      locale==='en'?seq.leadEn:seq.leadKo),
    h('div',{style:{display:'grid',gap:10}},
      items.map(function(item){
        var done=seq.steps.slice(0,step).some(function(s){return s.id===item.id;});
        return h('button',{
          key:item.id,className:'btn',disabled:done,onClick:function(){selectItem(item);},
          style:{minHeight:58,borderRadius:'14px',padding:'12px 14px',textAlign:'left',background:done?'rgba(120,255,190,0.12)':'rgba(5,18,11,0.92)',border:'1px solid '+(done?'rgba(120,255,190,0.45)':'rgba(122,255,198,0.18)'),color:done?'#78ffbe':'rgba(210,235,220,0.84)',fontSize:14}
        },(done?'[OK] ':'')+(locale==='en'?item.en:item.ko));
      })
    )
  );
}

function StatementMiniGame(p){
  var copy=p.copy;
  var files=[
    { recordKo:'현장 기록: 해당 인원은 “두 번의 기계음” 이후에만 이동을 시작했다.', recordEn:'Record: the subject only started moving after the second mechanical tone.', answer:'b', statements:[
      {id:'a',ko:'"처음엔 그대로 서 있었고, 두 번째 경고음 뒤에야 움직였어요."',en:'"He stood still at first and only moved after the second alert tone."'},
      {id:'b',ko:'"첫 번째 경고음이 들리자마자 바로 통로로 뛰어들었습니다."',en:'"The moment the first alert sounded, he ran into the corridor."'},
      {id:'c',ko:'"움직임은 짧았고, 바로 감시구역을 벗어났습니다."',en:'"The movement was brief, then he left the monitored area."'}
    ]},
    { recordKo:'감시 로그: 출입 태그는 02:47에 한 번만 인식됐다.', recordEn:'Security log: the access tag was recognized only once at 02:47.', answer:'c', statements:[
      {id:'a',ko:'"같은 태그가 계속 찍히진 않았습니다."',en:'"The same tag did not keep reappearing."'},
      {id:'b',ko:'"시간은 02:47이 맞습니다."',en:'"The timestamp really was 02:47."'},
      {id:'c',ko:'"그 태그는 복도 끝에서 세 번 연속으로 잡혔습니다."',en:'"That tag was picked up three times in a row at the corridor end."'}
    ]},
    { recordKo:'격리 보고: 의료팀은 손 떨림과 동공 확장을 동시에 기록했다.', recordEn:'Containment report: medics logged tremor and pupil dilation at the same time.', answer:'a', statements:[
      {id:'a',ko:'"동공은 정상이었고, 손 떨림만 있었어요."',en:'"The pupils were normal. There was only hand tremor."'},
      {id:'b',ko:'"의료 기록엔 손 떨림이 분명히 남아 있습니다."',en:'"The medical record clearly shows tremor."'},
      {id:'c',ko:'"눈 반응도 이상했다고 다들 말했습니다."',en:'"Everyone also mentioned abnormal eye response."'}
    ]}
  ];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var fileRef=useRef(null);
  if(!fileRef.current)fileRef.current=files[Math.floor(Math.random()*files.length)];
  var file=fileRef.current;
  var _time=useState(14),time=_time[0],setTime=_time[1];
  var finished=useRef(false);

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){ finished.current=true; p.onDone('fail'); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,p]);

  function choose(id){
    if(finished.current)return;
    finished.current=true;
    if(id===file.answer)p.onDone(time>=8?'great':'success');
    else p.onDone('fail');
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'MI-05'),
      h('span',null,'STATEMENT VERIFY')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:14}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:10}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'PICK THE CONTRADICTION')),
    h('div',{style:{padding:'14px 16px',marginBottom:14,border:'1px solid rgba(74,170,238,0.35)',borderRadius:'16px',background:'rgba(7,18,26,0.45)',color:'#8ad7ff',fontSize:14,lineHeight:1.6}},
      locale==='en'?file.recordEn:file.recordKo),
    h('div',{style:{display:'grid',gap:10}},
      file.statements.map(function(stmt){
        return h('button',{
          key:stmt.id,className:'btn',onClick:function(){choose(stmt.id);},
          style:{minHeight:72,borderRadius:'14px',padding:'12px 14px',textAlign:'left',background:'rgba(5,18,11,0.92)',border:'1px solid rgba(122,255,198,0.18)',color:'rgba(210,235,220,0.84)',fontSize:14,lineHeight:1.6}
        },locale==='en'?stmt.en:stmt.ko);
      })
    )
  );
}

function ScreeningMiniGame(p){
  var copy=p.copy;
  var suites=[
    { answer:['p2','p4'], people:[
      {id:'p1',nameKo:'근무자 A',nameEn:'Operator A',pulse:44,pupil:'stable',tremor:'none'},
      {id:'p2',nameKo:'근무자 B',nameEn:'Operator B',pulse:91,pupil:'dilated',tremor:'micro'},
      {id:'p3',nameKo:'연구원 C',nameEn:'Researcher C',pulse:58,pupil:'stable',tremor:'none'},
      {id:'p4',nameKo:'보안요원 D',nameEn:'Security D',pulse:97,pupil:'lagged',tremor:'micro'},
      {id:'p5',nameKo:'의무요원 E',nameEn:'Medic E',pulse:61,pupil:'stable',tremor:'none'}
    ]},
    { answer:['p1','p5'], people:[
      {id:'p1',nameKo:'기술관 A',nameEn:'Technician A',pulse:88,pupil:'lagged',tremor:'micro'},
      {id:'p2',nameKo:'근무자 B',nameEn:'Operator B',pulse:55,pupil:'stable',tremor:'none'},
      {id:'p3',nameKo:'연구원 C',nameEn:'Researcher C',pulse:63,pupil:'stable',tremor:'none'},
      {id:'p4',nameKo:'보안요원 D',nameEn:'Security D',pulse:52,pupil:'stable',tremor:'none'},
      {id:'p5',nameKo:'의무요원 E',nameEn:'Medic E',pulse:93,pupil:'dilated',tremor:'micro'}
    ]}
  ];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var suiteRef=useRef(null);
  if(!suiteRef.current)suiteRef.current=suites[Math.floor(Math.random()*suites.length)];
  var suite=suiteRef.current;
  var _selected=useState([]),selected=_selected[0],setSelected=_selected[1];
  var _time=useState(16),time=_time[0],setTime=_time[1];
  var finished=useRef(false);

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){ finished.current=true; finalize(selected); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,selected]);

  function toggle(id){
    if(finished.current)return;
    setSelected(function(prev){
      if(prev.indexOf(id)>=0)return prev.filter(function(v){return v!==id;});
      if(prev.length>=2)return prev;
      return prev.concat([id]);
    });
  }

  function finalize(picks){
    var chosen=(picks||selected).slice();
    var hit=chosen.filter(function(id){return suite.answer.indexOf(id)>=0;}).length;
    if(hit===2&&chosen.length===2)p.onDone(time>=8?'great':'success');
    else if(hit===1)p.onDone('partial');
    else p.onDone('fail');
  }

  return h(MiniPanel,null,
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#7affc6',letterSpacing:1.5,marginBottom:12}},
      h('span',null,'M-007'),
      h('span',null,'LATENT SCREEN')),
    h('div',{style:{fontSize:32,fontWeight:'700',color:'#ecfff4',marginBottom:10}},copy.title),
    h('div',{style:{fontSize:15,lineHeight:1.7,color:'rgba(210,235,220,0.82)',marginBottom:14}},copy.intro),
    h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'rgba(210,235,220,0.62)',marginBottom:10}},
      h('span',null,'TIME: '+time+'s'),
      h('span',null,'MARK: '+selected.length+'/2')),
    h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(0,1fr))',gap:12,marginBottom:16}},
      suite.people.map(function(person){
        var active=selected.indexOf(person.id)>=0;
        return h('button',{
          key:person.id,className:'btn',onClick:function(){toggle(person.id);},
          style:{minHeight:110,borderRadius:'16px',padding:'12px 14px',textAlign:'left',background:active?'rgba(120,255,190,0.14)':'rgba(5,18,11,0.92)',border:'1px solid '+(active?'rgba(120,255,190,0.5)':'rgba(122,255,198,0.18)'),color:'rgba(210,235,220,0.86)',fontSize:13,lineHeight:1.55}
        },
          h('div',{style:{fontSize:15,fontWeight:'700',marginBottom:6,color:active?'#ecfff4':'#78ffbe'}},locale==='en'?person.nameEn:person.nameKo),
          h('div',null,'PULSE: '+person.pulse),
          h('div',null,'PUPIL: '+person.pupil.toUpperCase()),
          h('div',null,'TREMOR: '+person.tremor.toUpperCase())
        );
      })
    ),
    h('div',{style:{display:'flex',justifyContent:'center'}},
      h('button',{className:'btn',disabled:selected.length===0,onClick:function(){if(!finished.current){finished.current=true;finalize(selected);}},style:{minWidth:220,padding:'12px 18px',fontSize:17,borderRadius:'999px',opacity:selected.length?1:0.45}},copy.action))
  );
}

function FieldMiniGameOverlay(p){
  if(!p.game)return null;
  var game=FIELD_MINIGAME_LIBRARY[p.game.type];
  if(!game)return null;
  var copy=getMiniLocaleCopy(game);
  if(p.game.type==='signal')return h(SignalMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='sequence')return h(SequenceMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='breach')return h(BreachMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='sample')return h(SampleMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='scan')return h(ScanMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='route')return h(RouteMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='evidence')return h(EvidenceMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='reconstruction')return h(ReconstructionMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='statement')return h(StatementMiniGame,{copy:copy,onDone:p.onDone});
  if(p.game.type==='screening')return h(ScreeningMiniGame,{copy:copy,onDone:p.onDone});
  return null;
}
