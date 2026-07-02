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

// 본편 현장임무에서 마주친 미니게임 타입 기록 — 메인메뉴 연습 가이드 해금에 사용.
// 세션 간 유지(메타 진행), fullReset에서만 초기화.
var SEEN_MINIGAMES_KEY='ts_minigamesSeen';
function getSeenMinigames(){
  try{
    var raw=localStorage.getItem(SEEN_MINIGAMES_KEY);
    var arr=raw?JSON.parse(raw):[];
    return Array.isArray(arr)?arr.filter(function(t){return typeof t==='string'}):[];
  }catch(e){return []}
}
function markMinigameSeen(type){
  if(!type)return;
  try{
    var seen=getSeenMinigames();
    if(seen.indexOf(type)>=0)return;
    seen.push(type);
    localStorage.setItem(SEEN_MINIGAMES_KEY,JSON.stringify(seen));
  }catch(e){}
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
      intro: 'SPEC-011의 음향 패턴을 안정 구간에 고정해 분석 가능한 신호를 확보한다.',
      action: '판정 확정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'SPEC-011 Acoustic Pattern Alignment',
      intro: 'Lock SPEC-011\'s acoustic pattern into the stable band to secure a readable signal.',
      action: 'Confirm',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  sequence: {
    id: 'sequence',
    kind: 'QUARANTINE SEQUENCE',
    ko: {
      title: '격리 봉인 수동 시퀀스',
      intro: '자동 봉인 루틴이 놓친 단계를 수동으로 입력해 격리를 마무리한다.',
      action: '입력',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Manual Quarantine Seal Sequence',
      intro: 'Manually enter the steps the auto-seal routine missed to complete the quarantine.',
      action: 'Input',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  breach: {
    id: 'breach',
    kind: 'ORACLE TRACE',
    ko: {
      title: '권한 흔적 추적',
      intro: '노출을 억제한 채 권한 KEY 흔적 둘을 확보하고 흔적 없이 빠져나온다.',
      action: '노드 선택',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Authority Trace',
      intro: 'Keep exposure low, secure two authority KEY traces, and slip out clean.',
      action: 'Select Node',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  route: {
    id: 'route',
    kind: 'ROUTE EVADE',
    ko: {
      title: '수로 추적 우회 경로',
      intro: '정해진 이동 횟수 안에 위험 구역을 피해 목표 지점에 도달한다.',
      action: '이동',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Drainage Route Intercept',
      intro: 'Reach the target within the fixed move count while avoiding the danger zone.',
      action: 'Move',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  sample: {
    id: 'sample',
    kind: 'SAMPLE RECOVERY',
    ko: {
      title: '활성 샘플 추적 회수',
      intro: '움직이는 활성 샘플을 포집기 안에 붙든 채 과부하 전에 회수를 끝낸다.',
      action: '회수 장비 작동',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Active Sample Tracking Recovery',
      intro: 'Hold the moving active sample in the collector and finish recovery before overload.',
      action: 'Operate Extractor',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  scan: {
    id: 'scan',
    kind: 'SCAN SEARCH',
    ko: {
      title: '미등록 통로 생체 반응 스캔',
      intro: '미등록 통로를 훑어 진짜 생체 반응 하나를 특정한다.',
      action: '스캔 유지',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Unregistered Passage Bio-Signal Scan',
      intro: 'Sweep the unregistered passage and pin down the one real bio-signal.',
      action: 'Hold Scan',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  evidence: {
    id: 'evidence',
    kind: 'EVIDENCE SORT',
    ko: {
      title: '현장 단서 분류',
      intro: '잡음 속에서 사건과 직결된 단서만 추려 판독을 확정한다.',
      action: '판독 확정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Evidence Triage',
      intro: 'Sift out only the case-critical clues from the noise and lock the read.',
      action: 'Lock Review',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  reconstruction: {
    id: 'reconstruction',
    kind: 'LOG RECONSTRUCTION',
    ko: {
      title: '로그 복원 시퀀스',
      intro: '훼손된 기록 조각을 시간 순서로 이어 추적선을 되살린다.',
      action: '조각 선택',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Log Reconstruction Sequence',
      intro: 'Reconnect the damaged record fragments in time order to restore the trace.',
      action: 'Select Fragment',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  statement: {
    id: 'statement',
    kind: 'STATEMENT VERIFY',
    ko: {
      title: '진술 교차 검증',
      intro: '증언과 기록을 맞대어 사실과 어긋나는 진술을 짚어낸다.',
      action: '모순 지정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Statement Cross-Check',
      intro: 'Cross-check the testimony against the record and flag the statement that doesn\'t fit.',
      action: 'Flag Contradiction',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  strike: {
    id: 'strike',
    kind: 'STRIKE DESIGNATION',
    ko: {
      title: '타격 표적 지정',
      intro: '드론 판독으로 구획별 신호를 대조해 통신 장비 구획 두 곳을 표적으로 지정한다. 인체 열원 구획은 사격선에서 제외해야 한다.',
      action: '표적 확정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Strike Designation',
      intro: 'Cross-read drone returns and designate the two comms-equipment blocks. Blocks with human heat must stay off the firing line.',
      action: 'Confirm Targets',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  screening: {
    id: 'screening',
    kind: 'LATENT SCREEN',
    ko: {
      title: '잠복 반응 스크리닝',
      intro: '대기 인원의 생체·신경 반응을 훑어 잠복 노출자를 가려낸다.',
      action: '판독 확정',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Latent Response Screening',
      intro: 'Scan the waiting personnel\'s vital and neural readings to pick out latent exposure.',
      action: 'Confirm Screening',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  }
};

// 공용 필드미션 터미널 셸 — Sequence 미니게임 룩을 전 미니게임에 통일. props: code/kind/title/intro/status[{k,v,cls}]/footL/footR/progress + children(스테이지)
function FieldTerminalShell(p){
  var status=p.status||[];
  return h('div',{className:'fm-term-overlay'},
    h('div',{className:'fm-term-frame'},
      h('div',{className:'fm-term-scan'}),
      h('div',{className:'fm-term-topbar'},
        h('span',{className:'fm-term-signal'},h('i'),h('i'),h('i'),h('i')),
        h('span',{className:'fm-term-field'},'FIELD MISSION'),
        h('span',{className:'fm-term-menu'},'...')),
      h('div',{className:'fm-term-header'},
        h('div',{className:'fm-term-idline'},h('span',null,p.code||''),h('span',null,p.kind||'')),
        h('h1',null,p.title),
        p.intro?h('p',null,p.intro):null),
      status.length?h('div',{className:'fm-term-status'},
        status.map(function(s,i){return h('span',{key:i},(s.k?s.k+': ':''),h('b',{className:s.cls||''},s.v));})):null,
      h('div',{className:'fm-term-body'},p.children),
      (p.progress!=null||p.footL||p.footR)?h('div',{className:'fm-term-footer'},
        h('span',null,p.footL||''),
        (p.progress!=null)?h('div',{className:'fm-term-progress'},h('i',{style:{width:Math.max(0,Math.min(100,p.progress))+'%'}})):h('span',null,''),
        h('span',null,p.footR||'')):null
    )
  );
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

  var pct=Math.round((time/8)*100);
  return h(FieldTerminalShell,{
    code:'M-002',kind:'SIGNAL ALIGNMENT',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=3?'is-bad':''},{k:'PARTIAL',v:'\u00b11 CELL'}],
    footL:'SIGNAL LOCK',progress:pct,footR:pct+'%'
  },
    h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}},
      h('div',{style:{position:'relative',height:150,borderRadius:'10px',overflow:'hidden',background:'linear-gradient(180deg, rgba(9,36,28,0.95), rgba(4,18,13,0.95))'}},
        h('div',{style:{position:'absolute',inset:0,backgroundImage:'linear-gradient(90deg, rgba(91,255,122,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(91,255,122,0.04) 1px, transparent 1px)',backgroundSize:'22px 22px'}}),
        h('div',{style:{position:'absolute',left:'0',right:'0',top:'49%',height:'2px',background:'rgba(91,255,122,0.5)'}}),
        h('div',{style:{position:'absolute',top:'0',bottom:'0',left:(bandRef.current.start*100)+'%',width:((bandRef.current.end-bandRef.current.start)*100)+'%',background:'rgba(255,211,63,0.15)',borderLeft:'2px solid rgba(255,211,63,0.9)',borderRight:'2px solid rgba(255,211,63,0.9)'}}),
        h('div',{style:{position:'absolute',top:'0',bottom:'0',left:((bandRef.current.start-bandRef.current.partial)*100)+'%',width:(bandRef.current.partial*100)+'%',borderRight:'1px dashed rgba(255,211,63,0.6)'}}),
        h('div',{style:{position:'absolute',top:'0',bottom:'0',left:(bandRef.current.end*100)+'%',width:(bandRef.current.partial*100)+'%',borderLeft:'1px dashed rgba(255,211,63,0.6)'}}),
        h('div',{style:{position:'absolute',top:'10px',bottom:'10px',left:(cursor*100)+'%',width:'8px',transform:'translateX(-50%)',borderRadius:'999px',background:'#5bff7a',boxShadow:'0 0 16px rgba(91,255,122,0.95), 0 0 40px rgba(91,255,122,0.35)'}})
      )
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',onClick:confirmHit},copy.action))
  );
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
  var iconMap={RED:'warning',AUX:'aux_waveform',LOCK:'shield_lock',VENT:'vent_grille',SEAL:'seal_ring',PURGE:'purge_triangle'};
  var buttonLabels={RED:'RED OFF',AUX:'AUX ON',LOCK:'MAIN LOCK',VENT:'VENT CLOSE',SEAL:'SEAL',PURGE:'PURGE HOLD'};

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
        var rank;
        finished.current=true;
        setStep(nextStep);
        if(errors===0&&time>=6)rank='great';
        else if(errors<=1)rank='success';
        else rank='partial';
        setTimeout(function(){p.onDone(rank);},120);
        return;
      }
      setStep(nextStep);
      return;
    }
    setErrors(function(v){return v+1;});
  }

  var progress=Math.round((step/proto.sequence.length)*100);
  var displayStep=Math.min(step+1,proto.sequence.length);
  return h('div',{className:'fm-seq-overlay'},
    h('div',{className:'fm-seq-terminal'},
      h('div',{className:'fm-seq-scan'}),
      h('div',{className:'fm-seq-topbar'},
        h('span',{className:'fm-seq-signal'},h('i'),h('i'),h('i'),h('i')),
        h('span',{className:'fm-seq-field'},'FIELD MISSION'),
        h('span',{className:'fm-seq-menu'},'...')),
      h('section',{className:'fm-seq-header'},
        h('div',{className:'fm-seq-idline'},
          h('span',null,'MI-01'),
          h('span',null,'QUARANTINE SEQUENCE')),
        h('h1',null,copy.title),
        h('p',null,copy.intro)),
      h('div',{className:'fm-seq-status'},
        h('span',null,h('img',{src:'assets/field-mission-ui/icons/clock.png',alt:''}),'TIME: ',h('b',null,time+'s')),
        h('span',null,'ERROR: ',h('b',{className:errors>0?'is-warn':''},errors)),
        h('span',null,'STEP: ',h('b',null,displayStep+'/'+proto.sequence.length))),
      h('div',{className:'fm-seq-display'},
        h('span',null,proto.label)),
      h('div',{className:'fm-seq-track'},
        proto.sequence.map(function(id,idx){
          var state=idx<step?' is-done':idx===step?' is-current':'';
          var stepText=idx<step?id:(idx===step?'READY':'WAIT');
          return h('div',{key:id+'-'+idx,className:'fm-seq-step'+state},
            h('span',null,String(idx+1).padStart(2,'0')),
            h('strong',null,stepText));
        })),
      h('div',{className:'fm-seq-grid'},
        buttons.map(function(id){
          var isUsed=proto.sequence.slice(0,step).indexOf(id)>=0;
          var cls='fm-seq-button'+(isUsed?' is-used':'');
          return h('button',{key:id,className:cls,'aria-label':buttonLabels[id]||id,onClick:function(){pressButton(id);}},
            h('img',{src:'assets/field-mission-ui/icons/'+iconMap[id]+'.png',alt:''}),
            h('span',{className:'fm-seq-button-code'},id),
            h('strong',{className:'fm-seq-button-label'},buttonLabels[id]||id));
        })),
      h('div',{className:'fm-seq-footer'},
        h('span',null,'SEAL PROTOCOL'),
        h('div',{className:'fm-seq-progress'},h('i',{style:{width:progress+'%'}})),
        h('span',null,progress+'%'))));
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
  var boardNode=function(node){return{x:Math.max(10,Math.min(92,node.x)),y:Math.max(10,Math.min(90,node.y))}};

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

  return h(FieldTerminalShell,{
    code:'MI-04',kind:'ORACLE TRACE',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s'},{k:'EXPOSURE',v:exp+'/8',cls:exp>=6?'is-bad':''},{k:'KEY',v:keys.length+'/2'}]
  },
    h('div',{className:'fm-term-stage'},
      h('div',{style:{padding:'16px',border:'1px solid rgba(122,255,198,0.22)',borderRadius:'22px',background:'rgba(5,18,11,0.76)'}},
        h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'rgba(210,235,220,0.5)',letterSpacing:1.2}},
          h('span',null,'TRACE GRID: '+(layoutIndex+1)),
          h('span',null,'START -> 2 KEYS -> EXIT')),
        h('div',{style:{height:8,borderRadius:999,overflow:'hidden',background:'rgba(15,35,22,0.9)',marginBottom:16}},
          h('div',{style:{height:'100%',width:Math.min(100,exp/8*100)+'%',background:exp>=6?'#ff7a7a':'#78ffbe'}})),
        h('div',{key:'board-'+layoutIndex,style:{position:'relative',height:260,border:'1px solid rgba(122,255,198,0.16)',borderRadius:'18px',background:'radial-gradient(circle at 50% 50%, rgba(14,40,28,0.96), rgba(4,15,10,0.98))'}},
          h('svg',{viewBox:'0 0 100 100',preserveAspectRatio:'none','aria-hidden':'true',style:{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:1,pointerEvents:'none'}},
            edges.map(function(edge){
              var a=boardNode(layout.nodes[edge.from]),b=boardNode(layout.nodes[edge.to]);
              return h('line',{key:edge.from+'-'+edge.to,x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:'rgba(122,255,198,0.42)',strokeWidth:2,strokeLinecap:'round',vectorEffect:'non-scaling-stroke'});
            })),
          Object.keys(layout.nodes).map(function(id){
            var node=layout.nodes[id];
            var pos=boardNode(node);
            var unlocked=(id===layout.exit?keys.length>=2:true);
            var isAdj=layout.nodes[current].adj.indexOf(id)>=0;
            var baseColor=node.type==='trap'?'#ff8f8f':node.type==='key'?'#f3c35b':node.type==='exit'?'#8ad7ff':'#7affc6';
            var bg=id===current?'rgba(122,255,198,0.18)':'rgba(7,20,12,0.94)';
            var border=id===current?'2px solid #7affc6':'1px solid '+baseColor;
            var opacity=(id===current||isAdj||id===layout.start)?1:(node.type==='exit'&&keys.length<2?0.45:0.72);
            return h('button',{key:id,onClick:function(){moveTo(id);},disabled:(id!==current&&!isAdj)||(node.type==='exit'&&!unlocked),style:{
              position:'absolute',left:pos.x+'%',top:pos.y+'%',transform:'translate(-50%, -50%)',zIndex:2,
              width:'clamp(42px, 10vw, 54px)',height:'clamp(42px, 10vw, 54px)',borderRadius:'50%',border:border,background:bg,color:baseColor,
              fontFamily:"'Share Tech Mono',monospace",fontSize:'clamp(9px, 2.6vw, 12px)',cursor:(id!==current&&isAdj)?'pointer':'default',
              opacity:opacity,boxShadow:id===current?'0 0 18px rgba(122,255,198,0.28)':'none'
            }},id===layout.start?'IN':id===layout.exit?'OUT':node.type==='key'?'KEY':node.type==='trap'?'ICE':'NODE');
          })
        )
      )
    )
  );
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

  return h(FieldTerminalShell,{
    code:'MI-03',kind:'SAMPLE RECOVERY',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=3?'is-bad':''},{k:'RECOVERY',v:Math.round(capture)+'%',cls:''},{k:'OVERLOAD',v:Math.round(overload)+'%',cls:overload>=70?'is-bad':''}],
    footL:'SAMPLE PROBE',progress:Math.min(100,capture),footR:Math.round(capture)+'%'
  },
    h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}},
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
      )
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{
        className:'fm-term-btn is-amber'+(hold?' is-held':''),
        onMouseDown:function(){setHold(true);},
        onMouseUp:function(){setHold(false);},
        onMouseLeave:function(){setHold(false);},
        onTouchStart:function(e){e.preventDefault();setHold(true);},
        onTouchEnd:function(e){e.preventDefault();setHold(false);}
      },copy.action))
  );
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

  return h(FieldTerminalShell,{
  code:'MI-05',kind:'SCAN SEARCH',title:copy.title,intro:copy.intro,
  status:[{k:'TIME',v:time+'s',cls:time<=3?'is-bad':''},{k:'SIGNAL',v:percent+'%'}]
},
  h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}},
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
  )
);
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

  return h(FieldTerminalShell,{code:'M-010',kind:'ROUTE EVADE',title:copy.title,intro:copy.intro,status:[{k:'MOVES',v:moves+'',cls:moves<=2?'is-bad':''},{k:'RULE',v:'RED=FAIL / AMBER=-2'}]},h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 12px'}},h('div',{style:{display:'grid',gridTemplateColumns:'repeat(5, minmax(0, 1fr))',gap:8}},Array.from({length:25}).map(function(_,idx){var isPlayer=idx===pos;var isGoal=idx===sheet.goal;var isDanger=sheet.danger.indexOf(idx)>=0;var isBlock=sheet.block.indexOf(idx)>=0;var isJammer=sheet.jammer.indexOf(idx)>=0;var bg='rgba(6,18,11,0.96)';var border='1px solid rgba(122,255,198,0.16)';if(isDanger){bg='rgba(165,22,22,0.96)';border='1px solid rgba(255,120,120,0.9)';}if(isBlock){bg='rgba(55,55,60,0.95)';border='1px solid rgba(195,195,200,0.45)';}if(isJammer){bg='rgba(135,86,16,0.96)';border='1px solid rgba(252,200,88,0.85)';}if(isGoal){bg='rgba(14,76,100,0.96)';border='1px solid rgba(146,224,255,0.9)';}if(isPlayer){bg='rgba(18,86,48,0.97)';border='2px solid rgba(130,255,196,1)';}return h('button',{key:idx,className:'btn',disabled:isBlock||finished.current,onClick:function(){moveTo(idx);},style:{aspectRatio:'1 / 1',borderRadius:'8px',padding:0,background:bg,border:border,boxShadow:isPlayer?'0 0 14px rgba(120,255,190,0.45)':isDanger?'0 0 10px rgba(255,80,80,0.3)':isGoal?'0 0 10px rgba(120,210,255,0.3)':isJammer?'0 0 8px rgba(245,188,64,0.25)':'none',color:isGoal?'#b9e9ff':isDanger?'#ffd6d6':isJammer?'#ffe2a8':isBlock?'rgba(225,225,230,0.6)':isPlayer?'#eafff4':'rgba(210,235,220,0.5)',fontFamily:"'Share Tech Mono',monospace",fontSize:15,fontWeight:700,cursor:isBlock?'default':'pointer'}},isPlayer?'IN':isGoal?'OUT':isDanger?'X':isBlock?'■':isJammer?'~':'·');}))));
}

function EvidenceMiniGame(p){
  var copy=p.copy;
  var cases=[
    { leadKo:'각인된 해안 좌표와 장비 흔적을 검토한다.', leadEn:'Review the engraved coastline coordinates and equipment traces.', correct:['coord','salt','boot'],
      hintKo:'판독 기준: 장소를 특정하는 좌표, 해안 접근 흔적, 비규격 이동 흔적처럼 “어디서 들어왔고 어떻게 움직였는지”를 증명하는 단서를 고르세요.',
      hintEn:'Sorting rule: choose evidence that proves where the subject entered and how they moved, such as location marks, coastal residue, and non-standard tracks.',
      items:[
      {id:'coord',ko:'해안 좌표 각인',en:'Coastline coordinates'},
      {id:'salt',ko:'염분 묻은 통신 케이블',en:'Salt-stained comm cable'},
      {id:'cup',ko:'뒤집힌 금속 컵',en:'Overturned metal cup'},
      {id:'boot',ko:'비규격 전술화 자국',en:'Non-standard boot marks'},
      {id:'dust',ko:'먼지 낀 램프 파편',en:'Dusty lamp shard'},
      {id:'ash',ko:'식은 화로 재',en:'Cold brazier ash'}
    ]},
    { leadKo:'CCTV 공백 구간과 내부 로그를 대조한다.', leadEn:'Compare the CCTV blackout against internal logs.', correct:['time','route','patch'],
      hintKo:'판독 기준: 영상 공백을 만든 시간 반복, 층간 이동 패턴, 승인 없는 시스템 변경처럼 기록 조작과 직접 이어지는 단서를 고르세요.',
      hintEn:'Sorting rule: choose traces directly tied to log manipulation: repeated time, cross-floor movement, and unauthorized system changes.',
      items:[
      {id:'time',ko:'02:47 반복 타임코드',en:'02:47 repeating timestamp'},
      {id:'route',ko:'B1-B2 이동 흔적',en:'B1-B2 transit pattern'},
      {id:'food',ko:'식당 출입 기록',en:'Cafeteria access log'},
      {id:'patch',ko:'비인가 패치 해시',en:'Unauthorized patch hash'},
      {id:'light',ko:'형광등 점멸 기록',en:'Fluorescent flicker log'},
      {id:'temp',ko:'서버실 온도 편차',en:'Server room heat drift'}
    ]},
    { leadKo:'현장 샘플 보고와 오염 흔적을 추린다.', leadEn:'Sift the field sample report for contamination traces.', correct:['spike','resin','tag'],
      hintKo:'판독 기준: 검체 상태 변화, 응고/잔류 물질, 오염 표식 이상처럼 샘플 오염을 직접 설명하는 단서를 고르세요.',
      hintEn:'Sorting rule: choose clues that directly explain sample contamination: specimen-state change, residue/coagulation, and missing contamination markings.',
      items:[
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

  return h(FieldTerminalShell,{
    code:'M-003',kind:'EVIDENCE SORT',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=3?'is-bad':''},{k:'PICKS',v:selected.length+'/3'}]
  },
    h('div',{className:'fm-term-stage'},
      h('div',{style:{padding:'10px 13px',marginBottom:9,border:'1px solid rgba(245,188,64,0.35)',borderRadius:'16px',background:'rgba(32,24,8,0.35)',color:'#f3c35b',fontSize:14,lineHeight:1.6}},
        locale==='en'?active.leadEn:active.leadKo),
      h('div',{style:{padding:'8px 12px',marginBottom:9,border:'1px solid rgba(122,255,198,0.22)',borderRadius:'12px',background:'rgba(5,18,11,0.74)',color:'rgba(210,235,220,0.84)',fontSize:13,lineHeight:1.65}},
        h('b',{style:{display:'block',fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:1.4,color:'#7affc6',marginBottom:4}},locale==='en'?'SORTING RULE':'판독 기준'),
        locale==='en'?active.hintEn:active.hintKo),
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(0,1fr))',gap:8,marginBottom:11}},
        active.items.map(function(item){
          var isOn=selected.indexOf(item.id)>=0;
          return h('button',{
            key:item.id,className:'btn',onClick:function(){toggle(item.id);},
            style:{minHeight:64,borderRadius:'14px',padding:'9px 12px',textAlign:'left',background:isOn?'rgba(120,255,190,0.14)':'rgba(5,18,11,0.9)',border:'1px solid '+(isOn?'rgba(120,255,190,0.55)':'rgba(122,255,198,0.18)'),color:isOn?'#ecfff4':'rgba(210,235,220,0.82)',fontSize:14,lineHeight:1.5}
          },locale==='en'?item.en:item.ko);
        })
      )
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',disabled:selected.length!==3,onClick:function(){if(!finished.current){finished.current=true;finalize(selected);}}},copy.action))
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

  return h(FieldTerminalShell,{
    code:'MI-02',kind:'LOG RECONSTRUCTION',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=3?'is-bad':''},{k:'RESTORED',v:step+'/4'},{k:'ERROR',v:errors+'',cls:errors>0?'is-warn':''}],
    progress:Math.round((step/4)*100)
  },
    h('div',{className:'fm-term-stage'},
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

  return h(FieldTerminalShell,{
  code:'MI-05',kind:'STATEMENT VERIFY',title:copy.title,intro:copy.intro,
  status:[{k:'TIME',v:time+'s'},{k:'',v:locale==='en'?'FLAG CONTRADICTION':'모순 지정'}]
},
  h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}},
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
  var labels=locale==='en'
    ? { kind:'LATENT SCREEN', time:'TIME', mark:'MARK', pulse:'PULSE', pupil:'PUPIL', tremor:'TREMOR' }
    : { kind:'잠복 반응 선별', time:'시간', mark:'표시', pulse:'맥박', pupil:'동공', tremor:'떨림' };
  var valueKo={ stable:'안정', dilated:'확대', lagged:'지연', micro:'미세', none:'없음' };
  function readingValue(value){
    return locale==='en'?String(value).toUpperCase():(valueKo[value]||value);
  }
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

  return h(FieldTerminalShell,{
    code:'M-007',kind:labels.kind,title:copy.title,intro:copy.intro,
    status:[{k:labels.time,v:time+'s',cls:time<=2?'is-bad':''},{k:labels.mark,v:selected.length+'/2'}]
  },
    h('div',{className:'fm-term-stage',style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(0,1fr))',gap:12,padding:'16px',alignContent:'start'}},
      suite.people.map(function(person){
        var active=selected.indexOf(person.id)>=0;
        return h('button',{
          key:person.id,className:'btn',onClick:function(){toggle(person.id);},
          style:{minHeight:110,borderRadius:'16px',padding:'12px 14px',textAlign:'left',background:active?'rgba(120,255,190,0.14)':'rgba(5,18,11,0.92)',border:'1px solid '+(active?'rgba(120,255,190,0.5)':'rgba(122,255,198,0.18)'),color:'rgba(210,235,220,0.86)',fontSize:13,lineHeight:1.55}
        },
          h('div',{style:{fontSize:15,fontWeight:'700',marginBottom:6,color:active?'#ecfff4':'#78ffbe'}},locale==='en'?person.nameEn:person.nameKo),
          h('div',null,labels.pulse+': '+person.pulse),
          h('div',null,labels.pupil+': '+readingValue(person.pupil)),
          h('div',null,labels.tremor+': '+readingValue(person.tremor))
        );
      })
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',disabled:selected.length===0,onClick:function(){if(!finished.current){finished.current=true;finalize(selected);}}},copy.action))
  );
}

// 미니게임 시작 게이트 — 플레이 방법 안내 후 [시작]을 눌러야 타이머/모션 작동(게임은 START 후 마운트되므로 타이머 자동 정지)
var MINI_CONTROLS = {
  signal:{ko:'초록 커서가 황색 안정 띠 안에 들어온 순간 [판정 확정]을 누른다.',en:'Press [Confirm] the moment the green cursor is inside the amber band.'},
  sequence:{ko:'패널에 표시된 순서 그대로 봉인 버튼을 누른다.',en:'Press the seal buttons in the exact order shown on the panel.'},
  breach:{ko:'이웃한 노드로만 이동해 KEY 2개를 모은 뒤 EXIT로 나온다. 붉은 노드는 노출을 올린다.',en:'Move only to adjacent nodes, collect 2 KEYs, then reach EXIT. Red nodes raise exposure.'},
  route:{ko:'상하좌우 한 칸씩 이동한다. 붉은 칸은 즉시 실패, 황색 칸은 이동력을 2 소모한다.',en:'Move one tile up, down, left, or right. Red tiles fail instantly; amber tiles cost 2 moves.'},
  sample:{ko:'버튼을 길게 눌러 탐침을 올리고, 샘플에 겹친 상태를 유지해 회수율을 채운다.',en:'Press and hold to raise the probe, and stay overlapped with the sample to fill recovery.'},
  scan:{ko:'화면을 문질러 스캐너를 옮기고 진짜 반응 위에 머문다. 가짜 반응은 신호를 깎는다.',en:'Drag to move the scanner and hold over the true signal. Decoys drain the lock.'},
  evidence:{ko:'실제 단서 세 개를 슬롯에 채운 뒤 [판독 확정]을 누른다.',en:'Fill the slots with the three real clues, then press [Confirm Read].'},
  reconstruction:{ko:'가장 이른 시각의 조각부터 차례로 고른다.',en:'Pick the fragments in order, starting from the earliest timestamp.'},
  statement:{ko:'기록과 모순되는 진술 하나를 고른다.',en:'Select the one statement that contradicts the record.'},
  screening:{ko:'이상 반응을 보이는 인원 두 명을 표시한 뒤 [판독 확정]을 누른다.',en:'Mark the two personnel with abnormal readings, then press [Confirm Read].'},
  strike:{ko:'전파 반응이 강한 통신 장비 구획 두 곳을 표시한 뒤 [표적 확정]을 누른다. 열원이 인체인 구획은 피할 것.',en:'Mark the two blocks with strong RF returns, then press [Confirm Targets]. Avoid blocks with human heat.'}
};
function MinigameOnboarding(p){
  var en=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en');
  var L=function(ko,e){return en?e:ko;};
  var ctl=MINI_CONTROLS[p.type]||{};
  useEffect(function(){
    var onKey=function(e){ if(e.key===' '||e.key==='Enter'){e.preventDefault();if(p.onStart)p.onStart();} };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey);};
  },[p]);
  return h(FieldTerminalShell,{
    code:'MODULE',kind:p.game.kind,title:p.copy.title,
    status:[{k:'STATUS',v:L('\ub300\uae30','STANDBY'),cls:'is-warn'},{k:'TIMER',v:L('\uc2dc\uc791 \uc2dc \uc791\ub3d9','STARTS ON GO')}]
  },
    h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:11}},
      h('div',{className:'mg-ob-card'},
        h('div',{className:'mg-ob-h'},L('\u25a4 \uc784\ubb34 \ubaa9\ud45c','\u25a4 OBJECTIVE')),
        h('div',{className:'mg-ob-txt'},p.copy.intro)),
      (ctl.ko||ctl.en)?h('div',{className:'mg-ob-card mg-ob-card--ctl'},
        h('div',{className:'mg-ob-h'},L('\u25b8 \uc870\uc791','\u25b8 CONTROLS')),
        h('div',{className:'mg-ob-txt'},L(ctl.ko,ctl.en))):null,
      h('div',{className:'mg-ob-note'},L('\uc2dc\uc791\uc744 \ub204\ub974\uba74 \uc81c\ud55c \uc2dc\uac04\uc774 \uc791\ub3d9\ud569\ub2c8\ub2e4.','The timer starts only after you press start.'))
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',onClick:p.onStart},L('\u25b6 \uc2dc\uc791','\u25b6 START')))
  );
}

function StrikeMiniGame(p){
  var copy=p.copy;
  var suites=[
    { answer:['b2','b4'], blocks:[
      {id:'b1',nameKo:'구획 A',nameEn:'Block A',rf:'none',heat:'human',vib:'none'},
      {id:'b2',nameKo:'구획 B',nameEn:'Block B',rf:'strong',heat:'machine',vib:'steady'},
      {id:'b3',nameKo:'구획 C',nameEn:'Block C',rf:'weak',heat:'none',vib:'none'},
      {id:'b4',nameKo:'구획 D',nameEn:'Block D',rf:'strong',heat:'machine',vib:'steady'},
      {id:'b5',nameKo:'구획 E',nameEn:'Block E',rf:'none',heat:'human',vib:'none'}
    ]},
    { answer:['b1','b3'], blocks:[
      {id:'b1',nameKo:'구획 A',nameEn:'Block A',rf:'strong',heat:'machine',vib:'steady'},
      {id:'b2',nameKo:'구획 B',nameEn:'Block B',rf:'none',heat:'human',vib:'none'},
      {id:'b3',nameKo:'구획 C',nameEn:'Block C',rf:'strong',heat:'machine',vib:'steady'},
      {id:'b4',nameKo:'구획 D',nameEn:'Block D',rf:'weak',heat:'none',vib:'none'},
      {id:'b5',nameKo:'구획 E',nameEn:'Block E',rf:'none',heat:'human',vib:'none'}
    ]}
  ];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var labels=locale==='en'
    ? { kind:'STRIKE DESIGNATION', time:'TIME', mark:'TARGET', rf:'RF', heat:'HEAT', vib:'VIB' }
    : { kind:'타격 표적 지정', time:'시간', mark:'표적', rf:'전파', heat:'열원', vib:'진동' };
  var valueKo={ strong:'강', weak:'약', none:'없음', human:'인체', machine:'기계', steady:'규칙' };
  function readingValue(value){
    return locale==='en'?String(value).toUpperCase():(valueKo[value]||value);
  }
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
    // 인체 열원 구획을 표적으로 지정 = 즉시 실패 (사격선에 민간인)
    var humanPick=chosen.some(function(id){var b=null;for(var i=0;i<suite.blocks.length;i++){if(suite.blocks[i].id===id){b=suite.blocks[i];break}}return b&&b.heat==='human';});
    if(humanPick){ p.onDone('fail'); return; }
    var hit=chosen.filter(function(id){return suite.answer.indexOf(id)>=0;}).length;
    if(hit===2&&chosen.length===2)p.onDone(time>=8?'great':'success');
    else if(hit===1)p.onDone('partial');
    else p.onDone('fail');
  }

  return h(FieldTerminalShell,{
    code:'M-007',kind:labels.kind,title:copy.title,intro:copy.intro,
    status:[{k:labels.time,v:time+'s',cls:time<=2?'is-bad':''},{k:labels.mark,v:selected.length+'/2'}]
  },
    h('div',{className:'fm-term-stage',style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(0,1fr))',gap:12,padding:'16px',alignContent:'start'}},
      suite.blocks.map(function(block){
        var active=selected.indexOf(block.id)>=0;
        return h('button',{
          key:block.id,className:'btn',onClick:function(){toggle(block.id);},
          style:{minHeight:110,borderRadius:'16px',padding:'12px 14px',textAlign:'left',background:active?'rgba(120,255,190,0.14)':'rgba(5,18,11,0.92)',border:'1px solid '+(active?'rgba(120,255,190,0.5)':'rgba(122,255,198,0.18)'),color:'rgba(210,235,220,0.86)',fontSize:13,lineHeight:1.55}
        },
          h('div',{style:{fontSize:15,fontWeight:'700',marginBottom:6,color:active?'#ecfff4':'#78ffbe'}},locale==='en'?block.nameEn:block.nameKo),
          h('div',null,labels.rf+': '+readingValue(block.rf)),
          h('div',null,labels.heat+': '+readingValue(block.heat)),
          h('div',null,labels.vib+': '+readingValue(block.vib))
        );
      })
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',disabled:selected.length===0,onClick:function(){if(!finished.current){finished.current=true;finalize(selected);}}},copy.action))
  );
}

function FieldMiniGameOverlay(p){
  var _ob=useState(false),started=_ob[0],setStarted=_ob[1];
  if(!p.game)return null;
  var game=FIELD_MINIGAME_LIBRARY[p.game.type];
  if(!game)return null;
  var copy=getMiniLocaleCopy(game);
  if(!started)return h(MinigameOnboarding,{game:game,copy:copy,type:p.game.type,onStart:function(){setStarted(true);}});
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
  if(p.game.type==='strike')return h(StrikeMiniGame,{copy:copy,onDone:p.onDone});
  return null;
}

function MiniGameGuide(p){
  var allIds=Object.keys(FIELD_MINIGAME_LIBRARY||{});
  var seenList=(typeof getSeenMinigames==='function')?getSeenMinigames():allIds;
  var ids=allIds.filter(function(id){return seenList.indexOf(id)>=0});
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var isEn=locale==='en';
  var _sel=useState(ids[0]||''),selected=_sel[0],setSelected=_sel[1];
  var _active=useState(null),active=_active[0],setActive=_active[1];
  var _last=useState(null),last=_last[0],setLast=_last[1];
  var GUIDE_PER=5;
  var _gp=useState(0); var gpage=_gp[0]; var setGpage=_gp[1];
  var gpCount=Math.max(1,Math.ceil(allIds.length/GUIDE_PER));
  var curGp=Math.min(gpage,gpCount-1);
  var guideScrollRef=useRef(null);
  var guideActionRef=useRef(null);
  var game=FIELD_MINIGAME_LIBRARY[selected]||FIELD_MINIGAME_LIBRARY[ids[0]];
  var copy=game?getMiniLocaleCopy(game):null;
  var labels=isEn?{
    title:'FIELD MINIGAME GUIDE',
    subtitle:'Modules encountered on field missions unlock here for reward-free practice.',
    list:'MODULE LIST',
    locked:'[ UNIDENTIFIED MODULE ]',
    lockedSub:'FIELD ENCOUNTER REQUIRED',
    objective:'OBJECTIVE',
    practice:'START PRACTICE',
    noReward:'Practice mode only. No mission reward, log, resource, or ending state is written.',
    result:'LAST PRACTICE RESULT',
    close:'Close'
  }:{
    title:'FIELD MINIGAME GUIDE',
    subtitle:'본편 현장임무에서 마주친 모듈이 이곳에 해금됩니다. 무보상 연습 전용.',
    list:'모듈 목록',
    locked:'[ 미확인 모듈 ]',
    lockedSub:'현장 조우 시 해금',
    objective:'목표',
    practice:'연습 시작',
    noReward:'연습 모드입니다. 임무 보상, LOG, 자원, 엔딩 상태는 저장되지 않습니다.',
    result:'최근 연습 결과',
    close:'닫기'
  };
  var resultName=function(rank){
    if(!rank)return '';
    var resultLabel=copy&&copy.resultLabel?copy.resultLabel:{};
    return resultLabel[rank]||rank;
  };
  var jumpToPractice=function(){
    if(typeof window==='undefined'||window.innerWidth>640)return;
    setTimeout(function(){
      var target=guideActionRef.current;
      if(!target)return;
      var scroller=guideScrollRef.current;
      if(scroller&&typeof scroller.scrollTo==='function'){
        var sr=scroller.getBoundingClientRect();
        var tr=target.getBoundingClientRect();
        var top=scroller.scrollTop+(tr.top-sr.top)-28;
        scroller.scrollTo({top:Math.max(0,top),behavior:'smooth'});
        return;
      }
      if(target.scrollIntoView)target.scrollIntoView({behavior:'smooth',block:'center'});
    },60);
  };

  return h('div',{className:'screen',style:{position:'relative'}},
    h('div',{ref:guideScrollRef,style:{width:'100%',maxWidth:560,padding:'20px 12px',flex:1,overflowY:'auto'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:6}},labels.title),
      h('div',{style:{fontSize:12,color:'#888',textAlign:'center',lineHeight:1.6,marginBottom:18}},labels.subtitle+' ('+ids.length+'/'+allIds.length+')'),
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',gap:12,alignItems:'start'}},
        h('section',{style:{border:'1px solid rgba(var(--ui-rgb),.18)',borderRadius:4,background:'rgba(0,0,0,.22)',padding:10}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#f0a030',letterSpacing:1.5,marginBottom:8}},labels.list),
          allIds.map(function(id,idx){
            if(idx<curGp*GUIDE_PER||idx>=curGp*GUIDE_PER+GUIDE_PER)return null;
            var item=FIELD_MINIGAME_LIBRARY[id];
            var unlocked=ids.indexOf(id)>=0;
            if(!unlocked){
              return h('div',{key:id,'data-locked-module':true,style:{width:'100%',minHeight:44,margin:'0 0 7px',padding:'8px 10px',fontSize:11,textAlign:'left',borderRadius:4,color:'rgba(var(--ui-rgb),.34)',background:'rgba(0,0,0,.3)',border:'1px dashed rgba(var(--ui-rgb),.14)',boxSizing:'border-box'}},
                h('span',{style:{display:'block',fontFamily:"'Share Tech Mono',monospace",fontSize:9,opacity:.6,marginBottom:2}},String(idx+1).padStart(2,'0')+' / '+labels.lockedSub),
                h('span',{style:{letterSpacing:1}},labels.locked)
              );
            }
            var itemCopy=getMiniLocaleCopy(item);
            var on=id===selected;
            return h('button',{key:id,type:'button',className:'btn',onClick:function(){setSelected(id);jumpToPractice();},style:{width:'100%',minHeight:44,margin:'0 0 7px',padding:'8px 10px',fontSize:11,textAlign:'left',borderRadius:4,color:on?'#07130d':'var(--ui)',background:on?'#7affc6':'rgba(5,18,11,.82)',border:'1px solid '+(on?'#7affc6':'rgba(var(--ui-rgb),.18)')}},
              h('span',{style:{display:'block',fontFamily:"'Share Tech Mono',monospace",fontSize:9,opacity:.72,marginBottom:2}},String(idx+1).padStart(2,'0')+' / '+item.kind),
              h('span',null,itemCopy.title)
            );
          }),
          gpCount>1?h('div',{style:{display:'flex',justifyContent:'center',alignItems:'center',gap:12,marginTop:8}},h('button',{type:'button',onClick:function(){if(curGp>0)setGpage(curGp-1);},style:{background:'none',border:'1px solid rgba(var(--ui-rgb),.3)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:13,width:26,height:24,cursor:curGp===0?'default':'pointer',opacity:curGp===0?0.3:1,borderRadius:3}},'‹'),h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:1,color:'var(--ui-dim)',minWidth:46,textAlign:'center'}},(curGp+1)+' / '+gpCount),h('button',{type:'button',onClick:function(){if(curGp<gpCount-1)setGpage(curGp+1);},style:{background:'none',border:'1px solid rgba(var(--ui-rgb),.3)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:13,width:26,height:24,cursor:curGp===gpCount-1?'default':'pointer',opacity:curGp===gpCount-1?0.3:1,borderRadius:3}},'›')):null
        ),
        game&&h('section',{style:{border:'1px solid rgba(var(--ui-rgb),.22)',borderRadius:4,background:'var(--ui-bg)',padding:14,minHeight:310}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#f0a030',letterSpacing:1.5,marginBottom:8}},game.kind),
          h('h2',{style:{fontSize:20,lineHeight:1.25,color:'var(--ui)',margin:'0 0 12px'}},copy.title),
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)',letterSpacing:1.5,marginBottom:6}},labels.objective),
          h('p',{style:{fontSize:13,lineHeight:1.75,color:'#cfe6d8',margin:'0 0 14px'}},copy.intro),
          h('div',{style:{fontSize:11,lineHeight:1.65,color:'#9d8f71',border:'1px solid rgba(240,160,48,.18)',background:'rgba(240,160,48,.06)',borderRadius:4,padding:'9px 10px',marginBottom:14}},labels.noReward),
          last&&last.type===selected&&h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#7affc6',letterSpacing:1,marginBottom:12}},labels.result+': '+resultName(last.rank)),
          h('div',{ref:guideActionRef,style:{display:'flex',gap:10,flexWrap:'wrap'}},
            h('button',{className:'btn btn-amber',style:{fontSize:12,padding:'9px 18px',marginTop:0},onClick:function(){setActive(selected);}},labels.practice),
            h('button',{className:'btn',style:{fontSize:12,padding:'9px 18px',marginTop:0},onClick:p.onClose},labels.close)
          )
        )
      )
    ),
    active&&h(FieldMiniGameOverlay,{game:{type:active},onDone:function(rank){setLast({type:active,rank:rank});setActive(null);}})
  );
}

if(typeof window!=='undefined'){
  window.MiniGameGuide = MiniGameGuide;
}
