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
      intro: '봉인 프로토콜을 암기한 뒤, 기억만으로 순서를 입력해 격리를 마무리한다.',
      action: '입력',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Manual Quarantine Seal Sequence',
      intro: 'Memorize the seal protocol, then enter the sequence from memory to complete the quarantine.',
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
      intro: '침수된 지하 수로를 따라 이동한다. 위험구역을 피해 배수구(OUT)까지 물길을 뚫어라.',
      action: '이동',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Drainage Route Intercept',
      intro: 'Navigate the flooded underground channel. Avoid the danger zones to reach the outlet (OUT).',
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
      intro: '보이지 않는 생체 반응을 신호 강도만으로 추적해 특정한다.',
      action: '스캔 유지',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Unregistered Passage Bio-Signal Scan',
      intro: 'Track down the invisible bio-signal using signal strength alone.',
      action: 'Hold Scan',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  shellbreak: {
    id: 'shellbreak',
    kind: 'SILENT PASSAGE',
    ko: {
      title: '침묵 통과 — 격리동 돌파',
      intro: '쉘 토커가 듣고 있다. 청음 중에는 멈추고, 들려오는 목소리는 콜사인으로 가려내며 출구까지 전진한다.',
      action: '숨죽여 전진',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Silent Passage — Quarantine Breakout',
      intro: 'The Shell Talker is listening. Freeze during its listening phase, verify voices by callsign, and advance to the exit.',
      action: 'Advance Quietly',
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
      title: '정밀 타격 통제',
      intro: '해안 강풍에 표류하는 조준경을 읽는다. 조준경이 통신 장비 구획(◆) 위에 오는 순간 사격한다. 민간인(□) 근처에서는 절대 사격하지 않는다.',
      action: '사격',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Precision Strike Control',
      intro: 'The reticle drifts in the coastal wind. Fire the moment it crosses a comms block (\u25c6). Never fire near a civilian (\u25a1).',
      action: 'FIRE',
      resultLabel: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' }
    }
  },
  crawler: {
    id: 'crawler',
    kind: 'INFILTRATION WORM',
    ko: {
      title: '침투 웜 주입',
      intro: '백도어 채널에 역침투 웜을 주입한다. 데이터 그리드를 기동하며 인증 패킷(녹색)을 수집하고, 감시 프로세스(적색)에 닿지 않는다. 그리드 가장자리는 순환한다.',
      action: '방향 전환',
      resultLabel: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' }
    },
    en: {
      title: 'Infiltration Worm',
      intro: 'Inject a counter-worm into the backdoor channel. Steer through the data grid, collect auth packets (green), avoid watchdog processes (red). Edges wrap around.',
      action: 'TURN',
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
  // v2: 단발 타이밍 → 3채널 주파수 정렬. LOW/MID/HIGH 커서가 서로 다른 속도로
  // 왕복하고, 위에서부터 차례로 [정렬 고정]. 아래 채널일수록 빠르고 띠가 좁으며
  // HIGH 채널은 띠 중심이 흔들리는 이동 표적. 오조준 3회 실패, 총 14초.
  var copy=p.copy;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var L=function(ko,en){return locale==='en'?en:ko};
  var chRef=useRef(null);
  if(!chRef.current){
    chRef.current=[
      {name:'LOW', speed:0.38, phase:Math.random()*2, bandC:0.35+Math.random()*0.3, bandW:0.11, drift:0},
      {name:'MID', speed:0.55, phase:Math.random()*2, bandC:0.35+Math.random()*0.3, bandW:0.085, drift:0},
      {name:'HIGH',speed:0.78, phase:Math.random()*2, bandC:0.4+Math.random()*0.2,  bandW:0.07, drift:0.07}
    ];
  }
  var CH=chRef.current;
  var PARTIAL=0.035;
  var _locked=useState([]),locked=_locked[0],setLocked=_locked[1];   // [{pos,perfect}]
  var _errors=useState(0),errors=_errors[0],setErrors=_errors[1];
  var _time=useState(14),time=_time[0],setTime=_time[1];
  var finished=useRef(false);
  var lockedRef=useRef(locked);lockedRef.current=locked;
  var errRef=useRef(errors);errRef.current=errors;
  var t0Ref=useRef(performance.now());
  var cursorRefs=useRef({});
  var bandRefs=useRef({});

  function tri(x){x=x%2;return x<1?x:2-x;}                            // 0..1 삼각파
  function cursorPos(i,tSec){return 0.06+tri(tSec*CH[i].speed+CH[i].phase)*0.88;}
  function bandCenter(i,tSec){return CH[i].bandC+(CH[i].drift?Math.sin(tSec*0.9+i)*CH[i].drift:0);}

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){
      finished.current=true;
      p.onDone(lockedRef.current.length>=2?'partial':'fail');
      return;
    }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,p]);

  // 커서/이동 띠 렌더 루프 — DOM 직접 갱신
  useEffect(function(){
    var raf=0,killed=false;
    function drive(now){
      if(killed)return;
      var tSec=(now-t0Ref.current)/1000;
      for(var i=0;i<3;i++){
        var lk=lockedRef.current[i];
        var cEl=cursorRefs.current[i];
        if(cEl){
          var pos=lk?lk.pos:cursorPos(i,tSec);
          cEl.style.left=(pos*100)+'%';
        }
        var bEl=bandRefs.current[i];
        if(bEl){
          var bc=bandCenter(i,tSec);
          bEl.style.left=((bc-CH[i].bandW/2)*100)+'%';
          bEl.style.width=(CH[i].bandW*100)+'%';
        }
      }
      raf=requestAnimationFrame(drive);
    }
    raf=requestAnimationFrame(drive);
    return function(){killed=true;cancelAnimationFrame(raf);};
  },[]);

  function confirmHit(){
    if(finished.current)return;
    var i=lockedRef.current.length;
    if(i>=3)return;
    var tSec=(performance.now()-t0Ref.current)/1000;
    var pos=cursorPos(i,tSec);
    var bc=bandCenter(i,tSec);
    var half=CH[i].bandW/2;
    var inCore=Math.abs(pos-bc)<=half;
    var inPartial=Math.abs(pos-bc)<=half+PARTIAL;
    if(inCore||inPartial){
      if(typeof SFX!=='undefined')SFX.play('tab');
      var nl=lockedRef.current.concat([{pos:pos,perfect:inCore}]);
      setLocked(nl);
      if(nl.length>=3){
        finished.current=true;
        var perfects=nl.filter(function(x){return x.perfect;}).length;
        if(perfects===3&&time>=5)p.onDone('great');
        else if(perfects>=2)p.onDone('success');
        else p.onDone('partial');
      }
      return;
    }
    if(typeof SFX!=='undefined')SFX.play('warn');
    setErrors(function(v){return v+1;});
    if(errRef.current+1>=3){finished.current=true;p.onDone(lockedRef.current.length>=2?'partial':'fail');}
  }

  useEffect(function(){
    var onKey=function(e){
      if(e.key===' '||e.key==='Enter'){e.preventDefault();confirmHit();}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey);};
  });

  var pct=Math.round((locked.length/3)*100);
  return h(FieldTerminalShell,{
    code:'M-002',kind:'SIGNAL ALIGNMENT',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=4?'is-bad':''},{k:L('고정','LOCK'),v:locked.length+'/3'},{k:L('오차','ERR'),v:errors+'',cls:errors>0?'is-warn':''}],
    footL:'SIGNAL LOCK',progress:pct,footR:pct+'%'
  },
    h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:10,padding:'0 12px'}},
      CH.map(function(ch,i){
        var isLocked=!!locked[i];
        var isActive=locked.length===i&&!finished.current;
        return h('div',{key:ch.name,style:{opacity:isLocked?0.9:(isActive?1:0.4),transition:'opacity .2s'}},
          h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:1.5,marginBottom:4,
            color:isLocked?'#78ffbe':(isActive?'#f3c35b':'rgba(122,255,198,0.4)')}},
            h('span',null,ch.name+(ch.drift?' ~':'')),
            h('span',null,isLocked?(locked[i].perfect?L('고정 — 정밀','LOCKED — CLEAN'):L('고정 — 근사','LOCKED — DRIFT')):(isActive?L('정렬 중','ALIGNING'):L('대기','STANDBY')))),
          h('div',{style:{position:'relative',height:44,borderRadius:9,overflow:'hidden',
            background:'linear-gradient(180deg, rgba(9,36,28,0.95), rgba(4,18,13,0.95))',
            border:'1px solid '+(isActive?'rgba(245,188,64,0.4)':(isLocked?'rgba(120,255,190,0.35)':'rgba(122,255,198,0.12)'))}},
            h('div',{style:{position:'absolute',inset:0,backgroundImage:'linear-gradient(90deg, rgba(91,255,122,0.06) 1px, transparent 1px)',backgroundSize:'18px 18px'}}),
            // 안정 띠 (HIGH는 흔들림)
            h('div',{ref:function(el){if(el)bandRefs.current[i]=el;},
              style:{position:'absolute',top:0,bottom:0,background:isLocked?'rgba(120,255,190,0.18)':'rgba(245,188,64,0.22)',
                borderLeft:'1px solid rgba(245,188,64,0.6)',borderRight:'1px solid rgba(245,188,64,0.6)'}}),
            // 커서
            h('div',{ref:function(el){if(el)cursorRefs.current[i]=el;},
              style:{position:'absolute',top:0,bottom:0,width:3,marginLeft:-1.5,
                background:isLocked?'#78ffbe':'#5bff7a',boxShadow:'0 0 8px '+(isLocked?'rgba(120,255,190,0.8)':'rgba(91,255,122,0.7)')}})));
      })
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',disabled:finished.current,onClick:confirmHit},L('정렬 고정','LOCK')))
  );
}

function SequenceMiniGame(p){
  // v2: 정답 상시 노출 → 암기 실행. 브리핑 4초 동안만 프로토콜이 표시되고 실행 중엔 마스킹.
  // 주기적 INTERLOCK(적색 잠금) 중 입력은 오류 — '기억'과 '절제'를 함께 시험한다.
  var copy=p.copy;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var L=function(ko,en){return locale==='en'?en:ko};
  var protocols=[
    { label:'RED OFF > AUX ON > MAIN LOCK > VENT CLOSE > SEAL', sequence:['RED','AUX','LOCK','VENT','SEAL'] },
    { label:'VENT CLOSE > RED OFF > AUX ON > SEAL > PURGE HOLD', sequence:['VENT','RED','AUX','SEAL','PURGE'] },
    { label:'AUX ON > VENT CLOSE > MAIN LOCK > PURGE HOLD > SEAL', sequence:['AUX','VENT','LOCK','PURGE','SEAL'] }
  ];
  var protoRef=useRef(null);
  if(!protoRef.current)protoRef.current=protocols[Math.floor(Math.random()*protocols.length)];
  var proto=protoRef.current;
  var _phase=useState('brief'),phase=_phase[0],setPhase=_phase[1];
  var _briefT=useState(4),briefT=_briefT[0],setBriefT=_briefT[1];
  var _step=useState(0),step=_step[0],setStep=_step[1];
  var _errors=useState(0),errors=_errors[0],setErrors=_errors[1];
  var _time=useState(20),time=_time[0],setTime=_time[1];
  var _ilk=useState('idle'),interlock=_ilk[0],setInterlock=_ilk[1]; // idle|warn|active
  var finished=useRef(false);
  var phaseRef=useRef('brief');phaseRef.current=phase;
  var ilkRef=useRef('idle');ilkRef.current=interlock;
  var stepRef=useRef(0);stepRef.current=step;
  var errRef=useRef(0);errRef.current=errors;
  var timeRef=useRef(20);timeRef.current=time;
  var buttons=['RED','AUX','LOCK','VENT','SEAL','PURGE'];
  var iconMap={RED:'warning',AUX:'aux_waveform',LOCK:'shield_lock',VENT:'vent_grille',SEAL:'seal_ring',PURGE:'purge_triangle'};
  var buttonLabels={RED:'RED OFF',AUX:'AUX ON',LOCK:'MAIN LOCK',VENT:'VENT CLOSE',SEAL:'SEAL',PURGE:'PURGE HOLD'};

  // 브리핑 카운트다운 → 실행 전환
  useEffect(function(){
    if(phase!=='brief')return;
    if(briefT<=0){setPhase('exec');return;}
    var t=setTimeout(function(){setBriefT(function(v){return v-1;});},1000);
    return function(){clearTimeout(t);};
  },[phase,briefT]);

  // 실행 제한시간
  useEffect(function(){
    if(phase!=='exec'||finished.current)return;
    if(time<=0){
      finished.current=true;
      if(step>=proto.sequence.length-1&&step>0)p.onDone('partial');
      else p.onDone('fail');
      return;
    }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[phase,time,step]);

  // INTERLOCK 사이클: 2.6s 대기 → 0.8s 경고(황) → 1.2s 잠금(적) 반복
  useEffect(function(){
    if(phase!=='exec')return;
    var killed=false,t1,t2,t3;
    function cycle(){
      if(killed||finished.current)return;
      t1=setTimeout(function(){ if(killed||finished.current)return; setInterlock('warn');
        t2=setTimeout(function(){ if(killed||finished.current)return; setInterlock('active'); if(typeof SFX!=='undefined')SFX.play('btn_off');
          t3=setTimeout(function(){ if(killed||finished.current)return; setInterlock('idle'); cycle(); },1200);
        },800);
      },2600);
    }
    cycle();
    return function(){killed=true;clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[phase]);

  function addError(){
    if(typeof SFX!=='undefined')SFX.play('warn');
    if(typeof Haptics!=='undefined')Haptics.warn();
    var nv=errRef.current+1;
    setErrors(nv);
    if(nv>=3){
      finished.current=true;
      p.onDone(stepRef.current>=3?'partial':'fail');
    }
  }

  function pressButton(id){
    if(finished.current||phaseRef.current!=='exec')return;
    if(ilkRef.current==='active'){ addError(); return; } // 잠금 중 입력 = 오류
    if(proto.sequence[stepRef.current]===id){
      if(typeof SFX!=='undefined')SFX.play('tab');
      var nextStep=stepRef.current+1;
      setStep(nextStep);
      if(nextStep>=proto.sequence.length){
        finished.current=true;
        var rank;
        if(errRef.current===0&&timeRef.current>=8)rank='great';
        else if(errRef.current<=1)rank='success';
        else rank='partial';
        setTimeout(function(){p.onDone(rank);},120);
      }
      return;
    }
    addError();
  }

  var progress=Math.round((step/proto.sequence.length)*100);
  var displayStep=Math.min(step+1,proto.sequence.length);
  var isBrief=phase==='brief';
  var dispLabel=isBrief?proto.label:'▒▒▒ '+L('프로토콜 암기됨 — 순서대로 입력','PROTOCOL MEMORIZED — ENTER IN ORDER')+' ▒▒▒';
  var ilkStyle=interlock==='active'
    ?{background:'rgba(120,10,10,0.92)',border:'1px solid rgba(255,90,72,0.9)',color:'#ffd6d6'}
    :interlock==='warn'
    ?{background:'rgba(120,78,14,0.9)',border:'1px solid rgba(252,200,88,0.85)',color:'#ffe2a8'}
    :null;
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
        isBrief
          ?h('span',null,h('img',{src:'assets/field-mission-ui/icons/clock.png',alt:''}),L('암기: ','MEMORIZE: '),h('b',null,briefT+'s'))
          :h('span',null,h('img',{src:'assets/field-mission-ui/icons/clock.png',alt:''}),'TIME: ',h('b',null,time+'s')),
        h('span',null,'ERROR: ',h('b',{className:errors>0?'is-warn':''},errors)),
        h('span',null,'STEP: ',h('b',null,displayStep+'/'+proto.sequence.length))),
      h('div',{className:'fm-seq-display',style:isBrief?{borderColor:'rgba(252,200,88,0.6)'}:null},
        h('span',{style:isBrief?{color:'#ffe2a8'}:{opacity:0.75}},dispLabel)),
      ilkStyle&&h('div',{style:Object.assign({borderRadius:8,padding:'7px 10px',margin:'6px 0',textAlign:'center',fontFamily:"'Share Tech Mono',monospace",fontSize:12,letterSpacing:1},ilkStyle)},
        interlock==='active'?L('■ SYSTEM INTERLOCK — 입력 금지','■ SYSTEM INTERLOCK — DO NOT INPUT'):L('▲ INTERLOCK 임박','▲ INTERLOCK IMMINENT')),
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
          return h('button',{key:id,className:cls,'aria-label':buttonLabels[id]||id,disabled:isBrief,style:isBrief?{opacity:0.45,cursor:'default'}:null,onClick:function(){pressButton(id);}},
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
  // v2: 회수율이 오를수록 샘플이 빨라지고 방향을 예측 불가하게 튼다.
  // 주기적 CONTAINMENT SURGE(황색 경고 → 적색 서지) 중 홀드는 과부하가 3배 —
  // '언제 잡을지'만이 아니라 '언제 놓을지'를 시험한다.
  var copy=p.copy;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var L=function(ko,en){return locale==='en'?en:ko};
  var _probe=useState(50),probe=_probe[0],setProbe=_probe[1];
  var _sample=useState(26+Math.random()*48),sample=_sample[0],setSample=_sample[1];
  var _sampleDir=useState(1),sampleDir=_sampleDir[0],setSampleDir=_sampleDir[1];
  var _capture=useState(0),capture=_capture[0],setCapture=_capture[1];
  var _overload=useState(12),overload=_overload[0],setOverload=_overload[1];
  var _hold=useState(false),hold=_hold[0],setHold=_hold[1];
  var _time=useState(18),time=_time[0],setTime=_time[1];
  var _surge=useState('idle'),surge=_surge[0],setSurge=_surge[1]; // idle|warn|active
  var surgeRef=useRef('idle');surgeRef.current=surge;
  var capRef=useRef(0);capRef.current=capture;
  var finished=useRef(false);

  function finishByProgress(nextCapture,nextOverload){
    if(finished.current)return;
    finished.current=true;
    if(nextCapture>=96&&nextOverload<45)p.onDone('great');
    else if(nextCapture>=96)p.onDone('success');
    else if(nextCapture>=55)p.onDone('partial');
    else p.onDone('fail');
  }

  // SURGE 사이클: 3.2s 안정 → 0.6s 경고 → 1.1s 서지 반복
  useEffect(function(){
    var killed=false,t1,t2,t3;
    function cycle(){
      if(killed||finished.current)return;
      t1=setTimeout(function(){ if(killed||finished.current)return; setSurge('warn');
        t2=setTimeout(function(){ if(killed||finished.current)return; setSurge('active'); if(typeof SFX!=='undefined')SFX.play('btn_off');
          t3=setTimeout(function(){ if(killed||finished.current)return; setSurge('idle'); cycle(); },1100);
        },600);
      },3200);
    }
    cycle();
    return function(){killed=true;clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);

  useEffect(function(){
    if(finished.current)return;
    var motionTimer=setInterval(function(){
      setProbe(function(prev){ return Math.max(6,Math.min(94,prev+(hold?1.35:-0.95))); });
      setSample(function(prev){
        // 회수율 비례 가속 + 중반 이후 무작위 방향 전환
        var speed=(0.5+capRef.current/100*0.55)+Math.sin(Date.now()/280)*0.18;
        if(capRef.current>40&&Math.random()<0.012)setSampleDir(function(d){return -d;});
        var next=prev+sampleDir*speed;
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
        var holdCost=hold?(surgeRef.current==='active'?2.7:0.9):-0.65; // 서지 중 홀드 3배
        var next=Math.max(0,Math.min(100,prev+holdCost+(overlap?0.2:0)));
        if(next>=98)finishByProgress(0,100);
        return next;
      });
    },40);
    return function(){clearInterval(motionTimer);};
  },[hold,probe,sample,sampleDir]);

  useEffect(function(){
    if(finished.current)return;
    if(capture>=100){ finishByProgress(capture,overload); return; }
    if(time<=0){ finishByProgress(capture,overload); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,capture,overload]);

  useEffect(function(){
    var onKey=function(e){ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); setHold(true); } };
    var onKeyUp=function(e){ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); setHold(false); } };
    window.addEventListener('keydown',onKey);
    window.addEventListener('keyup',onKeyUp);
    return function(){ window.removeEventListener('keydown',onKey); window.removeEventListener('keyup',onKeyUp); };
  },[]);

  var overlap=Math.abs(probe-sample)<=8;
  var surgeBanner=surge==='active'
    ?{text:L('■ CONTAINMENT SURGE — 홀드 위험','■ CONTAINMENT SURGE — HOLD DANGEROUS'),bg:'rgba(120,10,10,0.92)',bd:'rgba(255,90,72,0.9)',fg:'#ffd6d6'}
    :surge==='warn'
    ?{text:L('▲ 서지 임박 — 놓을 준비','▲ SURGE IMMINENT — PREPARE TO RELEASE'),bg:'rgba(120,78,14,0.9)',bd:'rgba(252,200,88,0.85)',fg:'#ffe2a8'}
    :null;

  return h(FieldTerminalShell,{
    code:'MI-03',kind:'SAMPLE RECOVERY',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=3?'is-bad':''},{k:'RECOVERY',v:Math.round(capture)+'%',cls:''},{k:'OVERLOAD',v:Math.round(overload)+'%',cls:overload>=70?'is-bad':''}],
    footL:'SAMPLE PROBE',progress:Math.min(100,capture),footR:Math.round(capture)+'%'
  },
    h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}},
      surgeBanner&&h('div',{style:{borderRadius:8,padding:'7px 10px',marginBottom:10,textAlign:'center',fontFamily:"'Share Tech Mono',monospace",fontSize:12,letterSpacing:1,background:surgeBanner.bg,border:'1px solid '+surgeBanner.bd,color:surgeBanner.fg}},surgeBanner.text),
      h('div',{style:{position:'relative',height:170,borderRadius:'18px',overflow:'hidden',marginBottom:14,border:'1px solid '+(surge==='active'?'rgba(255,90,72,0.5)':'rgba(122,255,198,0.16)'),background:'linear-gradient(180deg, rgba(8,24,18,0.96), rgba(4,14,10,0.98))'}},
        h('div',{style:{position:'absolute',left:'0',right:'0',top:'50%',height:'1px',background:'rgba(122,255,198,0.08)'}}),
        h('div',{style:{position:'absolute',left:'12%',right:'12%',top:'32%',height:'36%',border:'1px solid rgba(72,232,255,0.18)',borderRadius:'999px',background:overlap?'rgba(72,232,255,0.08)':'transparent'}}),
        h('div',{style:{position:'absolute',left:sample+'%',top:'50%',transform:'translate(-50%,-50%)',width:30,height:30,borderRadius:'50%',background:'rgba(245,188,64,0.18)',border:'2px solid rgba(245,188,64,0.85)',boxShadow:'0 0 16px rgba(245,188,64,0.25)'}}),
        h('div',{style:{position:'absolute',left:probe+'%',top:'50%',transform:'translate(-50%,-50%)',width:10,height:120,borderRadius:'999px',background:surge==='active'&&hold?'#ff8f8f':'#78ffbe',boxShadow:'0 0 18px rgba(120,255,190,0.85), 0 0 36px rgba(120,255,190,0.22)'}})
      ),
      h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}},
        h('div',null,
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'rgba(210,235,220,0.65)',marginBottom:6}},'RECOVERY'),
          h('div',{style:{height:10,borderRadius:999,overflow:'hidden',background:'rgba(15,35,22,0.9)'}},
            h('div',{style:{height:'100%',width:Math.min(100,capture)+'%',background:'#78ffbe'}}))
        ),
        h('div',null,
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'rgba(210,235,220,0.65)',marginBottom:6}},'OVERLOAD'),
          h('div',{style:{height:10,borderRadius:999,overflow:'hidden',background:'rgba(15,35,22,0.9)'}},
            h('div',{style:{height:'100%',width:Math.min(100,overload)+'%',background:surge==='active'?'#ff5a48':'#ff8f8f'}}))
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
  // v2: 표적·기만 반응 완전 은닉 — 신호 강도(%)만으로 위치를 좁힌다.
  // 기만 반응은 58%에서 정체하다가 머물면 FALSE ECHO로 판명(잠금 차감).
  // 간섭 스윕이 지나가는 동안 판독 불가(▒▒%) — 스윕을 피해 읽어야 한다.
  var copy=p.copy;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var L=function(ko,en){return locale==='en'?en:ko};
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
  var _time=useState(20),time=_time[0],setTime=_time[1];
  var _pings=useState([]),pings=_pings[0],setPings=_pings[1];       // 신호 판독 흔적
  var _echo=useState(false),echoFlash=_echo[0],setEchoFlash=_echo[1]; // FALSE ECHO 플래시
  var finished=useRef(false);
  var decoyDwell=useRef(0);   // 기만 반응 위 체류 틱
  var sweepRef=useRef(null);  // 간섭 스윕 DOM
  var sweepPos=useRef(-20);
  var pingSeq=useRef(0);

  function moveScanner(clientX,clientY,rect){
    var x=((clientX-rect.left)/rect.width)*100;
    var y=((clientY-rect.top)/rect.height)*100;
    setCursor({x:Math.max(0,Math.min(100,x)),y:Math.max(0,Math.min(100,y))});
  }

  // 신호 강도: 표적은 100까지, 기만은 58에서 정체
  function signalAt(x,y){
    var dt=Math.sqrt(Math.pow(x-target.x,2)+Math.pow(y-target.y,2));
    var sig=Math.max(0,Math.round(100-dt*2.6));
    decoys.forEach(function(d){
      var dd=Math.sqrt(Math.pow(x-d.x,2)+Math.pow(y-d.y,2));
      var ds=Math.min(58,Math.max(0,Math.round(72-dd*2.6)));
      if(ds>sig)sig=ds;
    });
    return sig;
  }
  function inSweep(x){ return Math.abs(x-sweepPos.current)<8; }

  // 간섭 스윕 — rAF로 좌→우 순환 (5.5s 주기)
  useEffect(function(){
    var raf=0,killed=false,t0=performance.now();
    function drive(now){
      if(killed)return;
      var t=((now-t0)/5500)%1;
      sweepPos.current=t*130-15; // -15 ~ 115
      var el=sweepRef.current;
      if(el)el.style.left=sweepPos.current+'%';
      raf=requestAnimationFrame(drive);
    }
    raf=requestAnimationFrame(drive);
    return function(){killed=true;cancelAnimationFrame(raf);};
  },[]);

  // 잠금/기만 판정 틱
  useEffect(function(){
    if(finished.current)return;
    var tick=setInterval(function(){
      var dist=Math.sqrt(Math.pow(cursor.x-target.x,2)+Math.pow(cursor.y-target.y,2));
      var onDecoy=decoys.some(function(d){
        return Math.sqrt(Math.pow(cursor.x-d.x,2)+Math.pow(cursor.y-d.y,2))<9;
      });
      var jammed=inSweep(cursor.x);
      if(onDecoy&&!jammed){
        decoyDwell.current+=1;
        if(decoyDwell.current>=12){ // 1.2s 체류 → FALSE ECHO 판명
          decoyDwell.current=0;
          if(typeof SFX!=='undefined')SFX.play('warn');
          setEchoFlash(true);setTimeout(function(){setEchoFlash(false);},420);
          setLock(function(v){return Math.max(0,v-2);});
        }
      }else{
        decoyDwell.current=0;
      }
      setLock(function(prev){
        if(jammed)return prev;                 // 간섭 중엔 잠금 정지(차감도 없음)
        var next=prev;
        if(dist<9)next=prev+1;
        else if(onDecoy)next=Math.max(0,prev-0.5);
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

  // 판독 흔적(핑) — 0.7s마다 현재 지점의 신호%를 남긴다 (최대 8개)
  useEffect(function(){
    if(finished.current)return;
    var iv=setInterval(function(){
      var jam=inSweep(cursor.x);
      var pct=jam?null:signalAt(cursor.x,cursor.y);
      setPings(function(prev){
        var next=prev.concat([{id:pingSeq.current++,x:cursor.x,y:cursor.y,pct:pct}]);
        return next.slice(-8);
      });
    },700);
    return function(){clearInterval(iv);};
  },[cursor]);

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
  var jammedNow=inSweep(cursor.x);
  var sigNow=jammedNow?null:signalAt(cursor.x,cursor.y);
  var hotNow=sigNow!==null&&sigNow>=77;   // 표적 근접에서만 가능한 수치
  var ringColor=echoFlash?'#ff8f8f':hotNow?'#78ffbe':'rgba(120,255,190,0.55)';

  return h(FieldTerminalShell,{
  code:'MI-05',kind:'SCAN SEARCH',title:copy.title,intro:copy.intro,
  status:[{k:'TIME',v:time+'s',cls:time<=3?'is-bad':''},{k:'LOCK',v:percent+'%'},{k:'SIGNAL',v:jammedNow?'▒▒':(sigNow+'%'),cls:echoFlash?'is-bad':''}]
},
  h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}},
    h('div',{
      style:{position:'relative',height:280,border:'1px solid '+(echoFlash?'rgba(255,90,72,0.7)':'rgba(122,255,198,0.16)'),borderRadius:'18px',overflow:'hidden',background:'radial-gradient(circle at 50% 50%, rgba(12,34,24,0.96), rgba(4,14,10,0.98))',transition:'border-color .12s'},
      onMouseMove:function(e){moveScanner(e.clientX,e.clientY,e.currentTarget.getBoundingClientRect());},
      onTouchStart:function(e){var t=e.touches[0];moveScanner(t.clientX,t.clientY,e.currentTarget.getBoundingClientRect());e.preventDefault();},
      onTouchMove:function(e){var t=e.touches[0];moveScanner(t.clientX,t.clientY,e.currentTarget.getBoundingClientRect());e.preventDefault();}
    },
      h('div',{style:{position:'absolute',inset:0,backgroundImage:'linear-gradient(90deg, rgba(122,255,198,0.03) 1px, transparent 1px), linear-gradient(180deg, rgba(122,255,198,0.03) 1px, transparent 1px)',backgroundSize:'28px 28px'}}),
      // 간섭 스윕 — 이 선이 지나는 동안 판독 불가
      h('div',{ref:function(el){if(el)sweepRef.current=el;},style:{position:'absolute',top:0,bottom:0,left:'-20%',width:'14%',background:'linear-gradient(90deg, transparent, rgba(122,200,255,0.13), transparent)',borderLeft:'1px solid rgba(122,200,255,0.22)',borderRight:'1px solid rgba(122,200,255,0.22)',pointerEvents:'none'}}),
      // 판독 흔적 — 지나온 지점의 신호%가 잠시 남는다
      pings.map(function(pg){
        return h('div',{key:pg.id,style:{position:'absolute',left:pg.x+'%',top:pg.y+'%',transform:'translate(-50%,-50%)',pointerEvents:'none',fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:pg.pct===null?'rgba(122,200,255,0.5)':pg.pct>=77?'rgba(120,255,190,0.85)':pg.pct>=45?'rgba(245,188,64,0.7)':'rgba(210,235,220,0.35)'}},pg.pct===null?'▒▒':pg.pct+'')
      }),
      // 스캐너 링 — 신호가 강할수록 밝고 좁게 수렴
      h('div',{style:{position:'absolute',left:cursor.x+'%',top:cursor.y+'%',width:hotNow?64:90,height:hotNow?64:90,transform:'translate(-50%,-50%)',borderRadius:'50%',border:'2px solid '+ringColor,boxShadow:hotNow?'0 0 22px rgba(120,255,190,0.4)':'none',transition:'width .18s,height .18s'}}),
      h('div',{style:{position:'absolute',left:cursor.x+'%',top:cursor.y+'%',width:14,height:14,transform:'translate(-50%,-50%)',borderRadius:'50%',background:ringColor}}),
      echoFlash&&h('div',{style:{position:'absolute',left:'50%',top:14,transform:'translateX(-50%)',padding:'5px 12px',borderRadius:8,background:'rgba(120,10,10,0.92)',border:'1px solid rgba(255,90,72,0.9)',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#ffd6d6',letterSpacing:1}},L('FALSE ECHO — 기만 반응','FALSE ECHO — DECOY SIGNAL')),
      h('div',{style:{position:'absolute',left:'50%',bottom:16,transform:'translateX(-50%)',padding:'8px 14px',borderRadius:'999px',border:'1px solid '+(percent>0?'rgba(120,255,190,0.45)':'rgba(122,255,198,0.16)'),fontFamily:"'Share Tech Mono',monospace",fontSize:14,color:percent>0?'#78ffbe':'rgba(210,235,220,0.55)',background:'rgba(5,18,11,0.84)'}},
        jammedNow?L('간섭 — 판독 불가','JAMMED'):('SIGNAL '+sigNow+'% · LOCK '+percent+'%'))
    )
  )
);
}

function RouteMiniGame(p){
  var copy=p.copy;
  // 6x7 격자 (idx = y*6+x). 각 시트는 다익스트라(자머=2)로 풀이 가능성 검증됨 — 최단비용 12~13.
  // 붉은 X는 전부 배회 순찰이며 danger는 초기 배치. moves는 최단+5(순찰 우회 여유분).
  var GC=6,GR=7;
  var sheets=[
    { pos:36, goal:1, moves:18, danger:[5,34,40,17,37,0], block:[23,12,7,22,25,8], jammer:[16,15,9] },
    { pos:38, goal:4, moves:17, danger:[1,40,6,19,10,3], block:[33,7,20,9,14,12], jammer:[31,27,17] },
    { pos:41, goal:0, moves:17, danger:[26,23,9,15,5,31], block:[29,17,39,2,37,12], jammer:[10,30,21] }
  ];
  var sheetRef=useRef(null);
  if(!sheetRef.current)sheetRef.current=sheets[Math.floor(Math.random()*sheets.length)];
  var sheet=sheetRef.current;
  var _pos=useState(sheet.pos),pos=_pos[0],setPos=_pos[1];
  var _moves=useState(sheet.moves),moves=_moves[0],setMoves=_moves[1];
  var finished=useRef(false);
  // 순찰 X: 붉은 상자 전원이 무작위 배회. 단, 플레이어 칸으로는 절대 이동하지 않는다
  // (플레이어가 '밟아서' 죽는 것만 허용 — 순찰이 걸어와 죽이는 억울한 실패 방지).
  var _hz=useState(sheet.danger.slice()),hazards=_hz[0],setHazards=_hz[1];
  var posRef=useRef(pos);posRef.current=pos;
  var hazardsRef=useRef(hazards);hazardsRef.current=hazards;
  // 항적(지나온 물길) — 지나간 물 셀은 밝은 물살로 남아 경로를 보여준다
  var trailRef=useRef(null);
  if(!trailRef.current){trailRef.current={};trailRef.current[sheet.pos]=1;}
  useEffect(function(){
    var iv=setInterval(function(){
      if(finished.current)return;
      var next=hazardsRef.current.slice();
      var occupied={};next.forEach(function(i){occupied[i]=1;});
      var movedAny=false;
      for(var k=0;k<next.length;k++){
        if(Math.random()<0.4)continue; // 매 틱 일부만 움직여 읽기 쉬운 순찰 리듬 유지
        var hp=next[k],hx=hp%GC,hy=Math.floor(hp/GC);
        var opts=[[hx+1,hy],[hx-1,hy],[hx,hy+1],[hx,hy-1]].map(function(c){return c[0]<0||c[0]>=GC||c[1]<0||c[1]>=GR?-1:c[1]*GC+c[0]})
          .filter(function(i){
            if(i<0)return false;
            if(i===posRef.current)return false;             // 플레이어 칸 금지
            if(i===sheet.goal||i===sheet.pos)return false;  // 입구/출구 점거 금지
            if(occupied[i])return false;                    // 순찰끼리 겹침 금지
            if(sheet.block.indexOf(i)>=0)return false;
            if(sheet.jammer.indexOf(i)>=0)return false;     // 역류 칸 가림 금지
            return true;
          });
        if(opts.length){var np=opts[Math.floor(Math.random()*opts.length)];delete occupied[hp];occupied[np]=1;next[k]=np;movedAny=true;}
      }
      if(movedAny)setHazards(next);
    },1250);
    return function(){clearInterval(iv);};
  },[]);

  // 스테이지 실측 기반 타일 크기 — 어떤 화면에서도 그리드가 스크롤 없이 들어간다
  var stageRef=useRef(null);
  var _tile=useState(0),tile=_tile[0],setTile=_tile[1];
  useEffect(function(){
    function fit(){
      var el=stageRef.current;if(!el)return;
      var tw=Math.floor((el.clientWidth-24-16-5*(GC-1))/GC);
      var th=Math.floor((el.clientHeight-12-16-5*(GR-1))/GR);
      var t=Math.min(tw,th,60);if(t<26)t=26;
      setTile(t);
    }
    fit();
    window.addEventListener('resize',fit);
    return function(){window.removeEventListener('resize',fit)};
  },[]);

  function rankForSuccess(remaining){
    return remaining>=Math.ceil(sheet.moves/2)?'great':'success';
  }

  function moveTo(idx){
    if(finished.current)return;
    var px=pos%GC,py=Math.floor(pos/GC);
    var tx=idx%GC,ty=Math.floor(idx/GC);
    if(Math.abs(px-tx)+Math.abs(py-ty)!==1)return;
    if(sheet.block.indexOf(idx)>=0)return;
    if(hazardsRef.current.indexOf(idx)>=0){
      finished.current=true;
      setPos(idx);
      if(typeof SFX!=='undefined')SFX.play('warn');
      p.onDone('fail');
      return;
    }
    var cost=sheet.jammer.indexOf(idx)>=0?2:1;
    var nextMoves=moves-cost;
    trailRef.current[idx]=1;
    setPos(idx);
    setMoves(nextMoves);
    if(idx===sheet.goal){
      finished.current=true;
      p.onDone(rankForSuccess(nextMoves));
      return;
    }
    if(nextMoves<=0){
      finished.current=true;
      var gx=sheet.goal%GC,gy=Math.floor(sheet.goal/GC);
      if(Math.abs(tx-gx)+Math.abs(ty-gy)===1)p.onDone('partial');
      else p.onDone('fail');
    }
  }

  // 물결 셀 글리프 지연(결정적 의사난수) — 셀마다 위상이 어긋난 수면 흔들림
  function waveDelay(idx){return (((idx*7)%10)/10*2.8).toFixed(2)+'s';}

  var T=tile||40;
  var gfs=Math.max(9,Math.round(T*0.26));
  return h(FieldTerminalShell,{code:'M-010',kind:'ROUTE EVADE',title:copy.title,intro:copy.intro,status:[{k:'MOVES',v:moves+'',cls:moves<=2?'is-bad':''},{k:'RULE',v:'X=FAIL / ≋=-2'}]},h('div',{className:'fm-term-stage',ref:stageRef,style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'6px 12px',minHeight:0,overflow:'hidden'}},h('div',{className:'route-channel',style:{width:(GC*T+5*(GC-1)+16)+'px',margin:'0 auto',boxSizing:'border-box',visibility:tile?'visible':'hidden'}},h('div',{style:{display:'grid',gridTemplateColumns:'repeat('+GC+', '+T+'px)',gap:5}},Array.from({length:GC*GR}).map(function(_,idx){var isPlayer=idx===pos;var isGoal=idx===sheet.goal;var isHazard=hazards.indexOf(idx)>=0&&!isPlayer;var isBlock=sheet.block.indexOf(idx)>=0;var isJammer=sheet.jammer.indexOf(idx)>=0;var isWake=!!trailRef.current[idx]&&!isPlayer&&!isGoal&&!isHazard&&!isBlock&&!isJammer;var cls='btn';var bg='rgba(4,18,30,0.95)';var border='1px solid rgba(110,200,240,0.16)';if(isWake){bg='rgba(9,32,48,0.95)';border='1px solid rgba(140,225,255,0.3)';}if(isHazard){bg='rgba(150,16,16,0.96)';border='1px solid rgba(255,110,96,0.9)';}if(isBlock){cls+=' route-cell-wall';bg='rgba(52,54,60,0.95)';border='1px solid rgba(195,195,200,0.45)';}if(isJammer){bg='rgba(120,78,14,0.95)';border='1px solid rgba(252,200,88,0.85)';}if(isGoal){bg='rgba(14,76,100,0.96)';border='1px solid rgba(146,224,255,0.9)';}if(isPlayer){bg='rgba(18,86,48,0.97)';border='2px solid rgba(130,255,196,1)';}var glyph;if(isPlayer)glyph='IN';else if(isGoal)glyph='OUT';else if(isHazard)glyph='X';else if(isBlock)glyph='▦';else if(isJammer)glyph=h('span',{className:'route-surge'},'≋');else if(isWake)glyph='·';else glyph=h('span',{className:'route-wave',style:{animationDelay:waveDelay(idx)}},'≈');return h('button',{key:idx,className:cls,disabled:isBlock||finished.current,onClick:function(){moveTo(idx);},style:{width:T+'px',height:T+'px',borderRadius:'7px',padding:0,margin:0,minHeight:0,backgroundColor:bg,backgroundImage:isBlock?undefined:'none',border:border,transition:'background-color .25s ease, border-color .25s ease, box-shadow .25s ease',boxShadow:isPlayer?'0 0 14px rgba(120,255,190,0.45)':isHazard?'0 0 13px rgba(255,70,52,0.55)':isGoal?'0 0 10px rgba(120,210,255,0.3)':isJammer?'0 0 8px rgba(245,188,64,0.25)':'none',color:isGoal?'#b9e9ff':isHazard?'#ffd6d6':isJammer?'#ffe2a8':isBlock?'rgba(225,225,230,0.6)':isPlayer?'#eafff4':isWake?'rgba(175,230,255,0.6)':'rgba(150,210,240,0.5)',fontFamily:"'Share Tech Mono',monospace",fontSize:gfs,fontWeight:700,cursor:isBlock?'default':'pointer'}},glyph);})))));
}

function EvidenceMiniGame(p){
  // v2: 정지 목록 3택 → 컨베이어 신속 분류. 단서가 한 장씩 들어오고
  // 상단 고정 '판독 기준'을 근거로 제한시간 내 [채증]/[폐기] 즉결 판정.
  // 판정 직후 정답/오답 + 이유 피드백. 미판정은 자동 폐기 처리.
  var copy=p.copy;
  var cases=[
    { briefKo:'판독 기준: 침입 경로·이동·장비 흔적만 채증한다. 생활 집기와 낡은 잔해는 폐기.',
      briefEn:'Rule: collect only entry-route, movement, and equipment traces. Discard household items and old debris.',
      items:[
        {ko:'해안 좌표 각인',en:'Coastline coordinates',rel:true,whyKo:'침입 지점 특정',whyEn:'pins the entry point'},
        {ko:'뒤집힌 금속 컵',en:'Overturned metal cup',rel:false,whyKo:'생활 집기 — 무관',whyEn:'household item'},
        {ko:'염분 묻은 통신 케이블',en:'Salt-stained comm cable',rel:true,whyKo:'해안 반입 장비',whyEn:'sea-carried equipment'},
        {ko:'식은 화로 재',en:'Cold brazier ash',rel:false,whyKo:'오래된 생활 흔적',whyEn:'old living trace'},
        {ko:'비규격 전술화 자국',en:'Non-standard boot marks',rel:true,whyKo:'외부 인원 이동 흔적',whyEn:'outsider movement'},
        {ko:'먼지 낀 램프 파편',en:'Dusty lamp shard',rel:false,whyKo:'낡은 잔해 — 무관',whyEn:'old debris'},
        {ko:'방수 포장 절단 파편',en:'Cut waterproof wrap',rel:true,whyKo:'장비 반입 포장재',whyEn:'gear delivery wrap'},
        {ko:'오래된 순찰 낙서',en:'Old patrol graffiti',rel:false,whyKo:'과거 기록 — 무관',whyEn:'past-era mark'},
        {ko:'갯벌 흙 전이 흔적',en:'Tidal-mud transfer',rel:true,whyKo:'해안→내부 이동 증거',whyEn:'coast-to-site movement'}
      ]},
    { briefKo:'판독 기준: 기록 조작과 직결된 흔적만 채증한다. 일상 로그와 설비 잡음은 폐기.',
      briefEn:'Rule: collect only traces tied to log manipulation. Discard routine logs and facility noise.',
      items:[
        {ko:'02:47 반복 타임코드',en:'02:47 repeating timestamp',rel:true,whyKo:'영상 공백 조작 흔적',whyEn:'blackout manipulation'},
        {ko:'식당 출입 기록',en:'Cafeteria access log',rel:false,whyKo:'일상 로그 — 무관',whyEn:'routine log'},
        {ko:'B1-B2 이동 흔적',en:'B1-B2 transit pattern',rel:true,whyKo:'공백 시간대 동선',whyEn:'movement in the gap'},
        {ko:'형광등 점멸 기록',en:'Fluorescent flicker log',rel:false,whyKo:'설비 잡음 — 무관',whyEn:'facility noise'},
        {ko:'비인가 패치 해시',en:'Unauthorized patch hash',rel:true,whyKo:'승인 없는 시스템 변경',whyEn:'unapproved change'},
        {ko:'서버실 온도 편차',en:'Server room heat drift',rel:false,whyKo:'환경 수치 — 무관',whyEn:'environment metric'},
        {ko:'삭제된 세션 토큰',en:'Deleted session token',rel:true,whyKo:'접속 흔적 인멸',whyEn:'erased access trace'},
        {ko:'정기 백업 완료 로그',en:'Scheduled backup log',rel:false,whyKo:'정상 운영 기록',whyEn:'normal operations'},
        {ko:'우회 프록시 설정 잔재',en:'Bypass proxy residue',rel:true,whyKo:'경유 조작 흔적',whyEn:'relay manipulation'}
      ]},
    { briefKo:'판독 기준: 샘플 오염을 직접 설명하는 흔적만 채증한다. 단순 파손물·소모품은 폐기.',
      briefEn:'Rule: collect only traces that directly explain contamination. Discard mere breakage and consumables.',
      items:[
        {ko:'급상승 포자 밀도',en:'Spore density spike',rel:true,whyKo:'오염 진행 수치',whyEn:'contamination metric'},
        {ko:'깨진 슬라이드 파편',en:'Broken slide fragments',rel:false,whyKo:'단순 파손 — 무관',whyEn:'mere breakage'},
        {ko:'응고 수지 흔적',en:'Coagulated resin trace',rel:true,whyKo:'검체 상태 변화',whyEn:'specimen change'},
        {ko:'찢어진 장갑 조각',en:'Torn glove scrap',rel:false,whyKo:'소모품 잔재',whyEn:'consumable scrap'},
        {ko:'오염 표식 누락 구간',en:'Missing contamination tag',rel:true,whyKo:'표식 관리 이상',whyEn:'tagging anomaly'},
        {ko:'빈 운반 카트',en:'Empty transport cart',rel:false,whyKo:'집기 — 무관',whyEn:'equipment item'},
        {ko:'밀봉 파손 검체 용기',en:'Breached sample vial',rel:true,whyKo:'직접 오염 경로',whyEn:'direct exposure path'},
        {ko:'야간 조명 오류 보고',en:'Night lighting fault',rel:false,whyKo:'설비 보고 — 무관',whyEn:'facility report'},
        {ko:'여과 필터 변색',en:'Discolored filter',rel:true,whyKo:'오염 물질 통과 흔적',whyEn:'contaminant passage'}
      ]}
  ];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var L=function(ko,en){return locale==='en'?en:ko};
  var ITEM_SEC=4.5;
  var caseRef=useRef(null);
  if(!caseRef.current){
    var c=cases[Math.floor(Math.random()*cases.length)];
    caseRef.current={brief:locale==='en'?c.briefEn:c.briefKo,items:c.items.slice().sort(function(){return Math.random()-0.5;})};
  }
  var active=caseRef.current;
  var _idx=useState(0),idx=_idx[0],setIdx=_idx[1];
  var _errors=useState(0),errors=_errors[0],setErrors=_errors[1];
  var _fb=useState(null),feedback=_fb[0],setFeedback=_fb[1];   // {ok,text}
  var _pct=useState(0),pct=_pct[0],setPct=_pct[1];             // 아이템 제한시간 진행률
  var finished=useRef(false);
  var judgedRef=useRef(false);
  var errRef=useRef(0);errRef.current=errors;

  // 아이템 제한시간 — 만료 시 자동 폐기 판정
  useEffect(function(){
    if(finished.current||idx>=active.items.length)return;
    judgedRef.current=false;
    setPct(0);
    var t0=performance.now();
    var iv=setInterval(function(){
      var el=(performance.now()-t0)/1000;
      setPct(Math.min(1,el/ITEM_SEC));
      if(el>=ITEM_SEC&&!judgedRef.current){clearInterval(iv);judge(false,true);}
    },80);
    return function(){clearInterval(iv);};
  },[idx]);

  function judge(collect,auto){
    if(finished.current||judgedRef.current)return;
    judgedRef.current=true;
    var item=active.items[idx];
    var correct=(collect===item.rel);
    var why=locale==='en'?item.whyEn:item.whyKo;
    if(correct){
      if(typeof SFX!=='undefined')SFX.play('tab');
      setFeedback({ok:true,text:(item.rel?L('채증 완료 — ','COLLECTED — '):L('폐기 적절 — ','DISCARDED — '))+why});
    }else{
      if(typeof SFX!=='undefined')SFX.play('warn');
      setErrors(function(v){return v+1;});
      var reason=item.rel?(auto?L('핵심 단서 유실 — ','KEY CLUE LOST — '):L('핵심 단서 폐기 — ','KEY CLUE DISCARDED — ')):L('무관물 채증 — ','JUNK COLLECTED — ');
      setFeedback({ok:false,text:reason+why});
    }
    setTimeout(function(){
      setFeedback(null);
      var next=idx+1;
      if(next>=active.items.length){
        finished.current=true;
        var finalErr=correct?errRef.current:errRef.current+1; // errRef는 setErrors 반영 전 값이라 이번 판정 보정

        if(finalErr===0)p.onDone('great');
        else if(finalErr<=1)p.onDone('success');
        else if(finalErr<=3)p.onDone('partial');
        else p.onDone('fail');
        return;
      }
      setIdx(next);
    },820);
  }

  var item=active.items[idx];
  var timeLeft=Math.ceil(ITEM_SEC*(1-pct));
  return h(FieldTerminalShell,{
    code:'M-003',kind:'EVIDENCE SORT',title:copy.title,intro:copy.intro,
    status:[{k:L('단서','ITEM'),v:(Math.min(idx+1,active.items.length))+'/'+active.items.length},{k:L('오류','ERR'),v:errors+'',cls:errors>0?'is-warn':''}],
    progress:Math.round((idx/active.items.length)*100)
  },
    h('div',{className:'fm-term-stage',style:{display:'flex',flexDirection:'column',gap:10,padding:'12px 14px'}},
      // 고정 판독 기준
      h('div',{style:{padding:'9px 12px',border:'1px solid rgba(245,188,64,0.4)',borderRadius:12,background:'rgba(32,24,8,0.4)',color:'#f3c35b',fontSize:12.5,lineHeight:1.6}},
        active.brief),
      // 컨베이어 카드
      item&&h('div',{key:idx,style:{position:'relative',padding:'22px 16px 18px',borderRadius:14,textAlign:'center',
        border:'1px solid '+(feedback?(feedback.ok?'rgba(120,255,190,0.6)':'rgba(255,90,72,0.65)'):'rgba(122,255,198,0.3)'),
        background:'rgba(5,18,11,0.92)',animation:'fadeIn .18s ease',transition:'border-color .12s'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:2,color:'rgba(122,255,198,0.45)',marginBottom:8}},
          L('수거물 #','ITEM #')+(idx+1)),
        h('div',{style:{fontSize:17,fontWeight:'700',color:'#ecfff4',lineHeight:1.5,minHeight:44}},L(item.ko,item.en)),
        // 제한시간 바
        h('div',{style:{height:4,borderRadius:2,background:'rgba(122,255,198,0.12)',marginTop:14,overflow:'hidden'}},
          h('div',{style:{height:'100%',width:Math.round((1-pct)*100)+'%',borderRadius:2,transition:'width .09s linear',
            background:pct>0.72?'#ff5a48':(pct>0.5?'#f0a030':'#78ffbe')}})),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:1.5,marginTop:5,color:pct>0.72?'#ff8d78':'rgba(122,255,198,0.5)'}},timeLeft+'s'),
        // 판정 피드백 오버레이
        feedback&&h('div',{style:{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 12px',
          borderRadius:14,background:'rgba(3,8,5,0.82)'}},
          h('div',{style:{fontSize:13,lineHeight:1.5,fontFamily:"'Share Tech Mono',monospace",letterSpacing:0.5,
            color:feedback.ok?'#78ffbe':'#ff8d78'}},(feedback.ok?'✓ ':'✕ ')+feedback.text))
      )
    ),
    h('div',{className:'fm-term-actions',style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}},
      h('button',{className:'fm-term-btn',disabled:!!feedback||!item,onClick:function(){judge(false,false);},
        style:{opacity:feedback?0.5:1}},L('폐기','DISCARD')),
      h('button',{className:'fm-term-btn is-amber',disabled:!!feedback||!item,onClick:function(){judge(true,false);}},L('채증','COLLECT')))
  );
}

function ReconstructionMiniGame(p){
  // v2: 정지 버튼 4개 → 흐르는 데이터 스트림 캐치.
  // 손상 로그 조각들이 잡음 라인과 함께 콘솔처럼 위로 흘러가고,
  // 시간 순서대로 탭해 상단 복원 슬롯에 잠근다. 놓치면 다음 순환을 기다려야 한다.
  var copy=p.copy;
  var sequences=[
    { leadKo:'CCTV 공백 기록을 시각 순서대로 잡아낸다. 무관한 기록은 무시.', leadEn:'Catch the CCTV blackout records in time order. Ignore unrelated entries.', steps:[
      {id:'a',ko:'02:47 / B1 서버실 출입',en:'02:47 / B1 server entry'},
      {id:'b',ko:'02:49 / 통로 센서 비활성',en:'02:49 / transit sensor disabled'},
      {id:'c',ko:'02:51 / B2 접근 로그 공백',en:'02:51 / B2 access gap'},
      {id:'d',ko:'02:53 / 복귀 흔적 소실',en:'02:53 / return trace erased'}
    ], decoys:[
      {id:'x1',ko:'02:41 / 식당 구역 조명 점검',en:'02:41 / cafeteria light check'},
      {id:'x2',ko:'02:5▒ / ██ 데이터 손상',en:'02:5▒ / ██ data corrupted'}
    ]},
    { leadKo:'오염 보고 기록을 시각 순서대로 잡아낸다. 무관한 기록은 무시.', leadEn:'Catch the contamination records in time order. Ignore unrelated entries.', steps:[
      {id:'a',ko:'03:02 / 배양기 내부 열 상승',en:'03:02 / chamber heat rise'},
      {id:'b',ko:'03:05 / 표본 격벽 점액화',en:'03:05 / partition liquefaction'},
      {id:'c',ko:'03:08 / 변이 구조 자가 형성',en:'03:08 / mutation self-formed'},
      {id:'d',ko:'03:11 / 관찰실 경보 기록',en:'03:11 / observation alert'}
    ], decoys:[
      {id:'x1',ko:'02:58 / 야간 환기 팬 정지',en:'02:58 / night vent fan stop'},
      {id:'x2',ko:'03:0▒ / ▒▒▒ 판독 불가',en:'03:0▒ / ▒▒▒ unreadable'}
    ]},
    { leadKo:'출입 위조 흔적을 시각 순서대로 잡아낸다. 무관한 기록은 무시.', leadEn:'Catch the forged-access traces in time order. Ignore unrelated entries.', steps:[
      {id:'a',ko:'23:14 / 허위 권한 요청 생성',en:'23:14 / spoofed authority request'},
      {id:'b',ko:'23:18 / 출입 로그 해시 변조',en:'23:18 / access-log hash altered'},
      {id:'c',ko:'23:22 / 백도어 경로 삽입',en:'23:22 / backdoor route inserted'},
      {id:'d',ko:'23:26 / 감시 태그 자동 삭제',en:'23:26 / surveillance tag purged'}
    ], decoys:[
      {id:'x1',ko:'23:10 / 정기 백업 완료',en:'23:10 / scheduled backup done'},
      {id:'x2',ko:'23:2▒ / ██ 해시 파손',en:'23:2▒ / ██ hash broken'}
    ]}
  ];
  var JUNK=['0x3F8A ▒▒ CRC FAIL','SEG //-- NULL 0x00','▒ 74 6B 09 FE ▒▒','TRACE LOST ······','0xB2C4 ██ REDACTED','SYNC DRIFT +0.4s'];
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var seqRef=useRef(null);
  if(!seqRef.current){
    var sq=sequences[Math.floor(Math.random()*sequences.length)];
    // 스트림 등장 순서는 셔플 + 개별 사이클 오프셋
    // 첫 조각은 이미 복원된 상태로 시작 — 시간축 기준점을 제공해 난이도를 낮춘다
    var pool=sq.steps.slice(1).map(function(st){return {step:st,decoy:false};})
      .concat((sq.decoys||[]).map(function(st){return {step:st,decoy:true};}));
    var lanes=pool.sort(function(){return Math.random()-0.5;}).map(function(en,i){
      return {step:en.step,decoy:en.decoy,off:i*1.15+Math.random()*0.5,x:8+Math.random()*32};
    });
    seqRef.current={seq:sq,lanes:lanes};
  }
  var seq=seqRef.current.seq,lanes=seqRef.current.lanes;
  var _step=useState(1),step=_step[0],setStep=_step[1]; // 슬롯 1은 선복원
  var _errors=useState(0),errors=_errors[0],setErrors=_errors[1];
  var _time=useState(22),time=_time[0],setTime=_time[1];
  var _flash=useState(false),errFlash=_flash[0],setErrFlash=_flash[1];
  var finished=useRef(false);
  var stepRef=useRef(1);stepRef.current=step;
  var errRef=useRef(0);errRef.current=errors;
  var fragRefs=useRef({});
  var junkRefs=useRef({});

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){ finished.current=true; p.onDone(step>=3?'partial':'fail'); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time,step,p]);

  // 스트림 루프 — 조각/잡음 라인을 아래→위로 순환 (DOM transform 직접 갱신)
  useEffect(function(){
    var raf=0,killed=false,t0=performance.now();
    var CYCLE=6.2,TRAVEL=4.6; // 등장 후 4.6s 동안 통과, 나머지는 대기
    function drive(now){
      if(killed)return;
      var tSec=(now-t0)/1000;
      lanes.forEach(function(ln){
        var el=fragRefs.current[ln.step.id];if(!el)return;
        if(el.__locked){el.style.display='none';return;}
        var local=(tSec+ln.off)%CYCLE;
        if(local>TRAVEL){el.style.display='none';return;}
        var prog=local/TRAVEL;
        var stage=el.parentNode;var Hs=stage?stage.clientHeight:240;
        el.style.display='block';
        el.style.transform='translate(0,'+Math.round(Hs*(1.02-prog*1.14))+'px)';
        el.style.opacity=prog<0.06?String(prog/0.06):(prog>0.94?String((1-prog)/0.06):'1');
      });
      JUNK.forEach(function(_,i){
        var el=junkRefs.current[i];if(!el)return;
        var local=(tSec*1.15+i*1.05)%4.4;
        var stage=el.parentNode;var Hs=stage?stage.clientHeight:240;
        el.style.transform='translate(0,'+Math.round(Hs*(1.02-(local/4.4)*1.14))+'px)';
      });
      raf=requestAnimationFrame(drive);
    }
    raf=requestAnimationFrame(drive);
    return function(){killed=true;cancelAnimationFrame(raf);};
  },[]);

  function grab(item,isDecoy){
    if(finished.current)return;
    var expected=seq.steps[stepRef.current];
    if(!isDecoy&&item.id===expected.id){
      if(typeof SFX!=='undefined')SFX.play('tab');
      var el=fragRefs.current[item.id];if(el)el.__locked=true;
      var nextStep=stepRef.current+1;
      setStep(nextStep);
      if(nextStep>=seq.steps.length){ finished.current=true; p.onDone(errRef.current===0&&time>=8?'great':(errRef.current<=1?'success':'partial')); }
      return;
    }
    if(typeof SFX!=='undefined')SFX.play('warn');
    setErrFlash(true);setTimeout(function(){setErrFlash(false);},350);
    setErrors(function(v){return v+1;});
    if(errRef.current+1>=3){ finished.current=true; p.onDone(stepRef.current>=2?'partial':'fail'); }
  }

  return h(FieldTerminalShell,{
    code:'MI-02',kind:'LOG RECONSTRUCTION',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=4?'is-bad':''},{k:'RESTORED',v:step+'/4'},{k:'ERROR',v:errors+'',cls:errors>0?'is-warn':''}],
    progress:Math.round((step/4)*100)
  },
    h('div',{className:'fm-term-stage',style:{display:'flex',flexDirection:'column',gap:8,padding:'10px 12px'}},
      h('div',{style:{padding:'8px 12px',border:'1px solid rgba(74,170,238,0.35)',borderRadius:12,background:'rgba(7,18,26,0.45)',color:'#8ad7ff',fontSize:12,lineHeight:1.5}},
        locale==='en'?seq.leadEn:seq.leadKo),
      // 복원 슬롯 — 잠긴 조각이 순서대로 채워진다
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:5}},
        seq.steps.map(function(st,i){
          var filled=i<step;
          return h('div',{key:st.id,style:{minHeight:34,borderRadius:8,padding:'4px 6px',fontSize:8.5,lineHeight:1.35,overflow:'hidden',
            border:'1px '+(filled?'solid rgba(120,255,190,0.5)':'dashed rgba(122,255,198,0.2)'),
            background:filled?'rgba(120,255,190,0.1)':'rgba(3,10,6,0.5)',
            color:filled?'#78ffbe':'rgba(122,255,198,0.3)',fontFamily:"'Share Tech Mono',monospace"}},
            filled?(locale==='en'?st.en:st.ko):('SLOT '+(i+1)));
        })),
      // 데이터 스트림 — 조각이 잡음과 함께 위로 흐른다
      h('div',{style:{position:'relative',flex:1,minHeight:230,overflow:'hidden',borderRadius:12,
        border:'1px solid '+(errFlash?'rgba(255,90,72,0.7)':'rgba(122,255,198,0.16)'),
        background:'linear-gradient(180deg,rgba(3,10,6,0.9),rgba(5,16,10,0.95))',transition:'border-color .1s'}},
        JUNK.map(function(j,i){
          return h('div',{key:'junk'+i,ref:function(el){if(el)junkRefs.current[i]=el;},
            style:{position:'absolute',left:(6+((i*23)%55))+'%',top:0,willChange:'transform',pointerEvents:'none',
              fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:1,color:'rgba(122,255,198,0.18)',whiteSpace:'nowrap'}},j);
        }),
        lanes.map(function(ln){
          return h('button',{key:ln.step.id,ref:function(el){if(el)fragRefs.current[ln.step.id]=el;},
            onClick:function(){grab(ln.step,ln.decoy);},
            style:{position:'absolute',left:ln.x+'%',top:0,display:'none',willChange:'transform',cursor:'pointer',
              maxWidth:'72%',textAlign:'left',padding:'7px 10px',borderRadius:9,fontSize:11.5,lineHeight:1.35,
              background:'rgba(10,26,32,0.94)',border:'1px solid rgba(138,215,255,0.55)',color:'#bfe9ff',
              boxShadow:'0 0 10px rgba(74,170,238,0.25)',fontFamily:"'Share Tech Mono',monospace"}},
            locale==='en'?ln.step.en:ln.step.ko);
        }))
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
  // v2: 정적 수치 읽기 → 라이브 생체 모니터 관찰 게임.
  // 5인의 심전도 파형이 실시간으로 흐르고, 잠복 반응자 2명은 3~5초 주기로
  // 파형이 불규칙하게 터진다(부정맥 스파이크 + BPM 급등). 버스트 순간을 포착해 표시.
  var copy=p.copy;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var labels=locale==='en'
    ? { kind:'LATENT SCREEN', time:'TIME', mark:'MARK', bpm:'BPM' }
    : { kind:'잠복 반응 선별', time:'시간', mark:'표시', bpm:'BPM' };
  var NAMES=[['근무자 A','Operator A'],['근무자 B','Operator B'],['연구원 C','Researcher C'],['보안요원 D','Security D'],['의무요원 E','Medic E'],['기술관 F','Technician F']];
  var setupRef=useRef(null);
  if(!setupRef.current){
    var order=[0,1,2,3,4,5].sort(function(){return Math.random()-0.5});
    var anomSet={};anomSet[order[0]]=true;anomSet[order[1]]=true;
    var people=NAMES.map(function(n,i){
      return { id:'p'+(i+1), ko:n[0], en:n[1], anom:!!anomSet[i],
        phase:Math.random()*6.28, rate:0.9+Math.random()*0.25,          // 개인별 기본 심박 주기
        burstCycle:4.2+Math.random()*2.3, burstOff:1.5+Math.random()*2.5, // 버스트 주기/최초 지연 (드물고 짧게)
        decoyCycle:5+Math.random()*3, decoyOff:2+Math.random()*3,        // 정상 인원 잔떨림(페이크) 스케줄
        baseBpm:54+Math.floor(Math.random()*12) };
    });
    setupRef.current={ people:people, answer:people.filter(function(pp){return pp.anom}).map(function(pp){return pp.id}) };
  }
  var setup=setupRef.current;
  var _selected=useState([]),selected=_selected[0],setSelected=_selected[1];
  var _time=useState(24),time=_time[0],setTime=_time[1];
  var finished=useRef(false);
  var canvasRefs=useRef({});
  var bpmRefs=useRef({});
  var selRef=useRef(selected);selRef.current=selected;

  useEffect(function(){
    if(finished.current)return;
    if(time<=0){ finished.current=true; finalize(selRef.current); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time]);

  // 파형 렌더 루프 — 캔버스 직접 드로잉(React 상태 미경유)
  useEffect(function(){
    var raf=0,killed=false,t0=performance.now();
    var W=0,H=0;
    function wave(person,tSec,burstK){
      // 기본 ECG: 완만한 기저 + 주기적 스파이크. 버스트 시 주기 요동 + 잡음 + 이중 스파이크.
      var period=person.rate*(burstK>0?(0.55+0.25*Math.sin(tSec*7+person.phase)):1);
      var ph=((tSec+person.phase)%period)/period;
      var spike=Math.exp(-Math.pow((ph-0.5)*14,2));
      var second=burstK>0?0.7*Math.exp(-Math.pow((ph-0.72)*16,2)):0;
      var noise=burstK>0?(Math.sin(tSec*53+person.phase*9)*0.16+Math.sin(tSec*91)*0.08)*burstK:0;
      var base=Math.sin(tSec*2.2+person.phase)*0.05;
      return base+spike*(0.85+(burstK>0?0.35*Math.sin(tSec*23):0))+second+noise;
    }
    function burstFactor(person,tSec){
      if(!person.anom)return 0;
      var local=(tSec-person.burstOff)%person.burstCycle;
      if(local<0)return 0;
      return (local<0.7)?Math.sin((local/0.7)*Math.PI):0; // 0→1→0 엔벨로프 (짧게)
    }
    function decoyFactor(person,tSec){
      // 정상 인원의 무해한 잔떨림 — 진짜 버스트보다 약하고 짧다. 색은 초록 유지.
      if(person.anom)return 0;
      var local=(tSec-person.decoyOff)%person.decoyCycle;
      if(local<0)return 0;
      return (local<0.35)?Math.sin((local/0.35)*Math.PI)*0.4:0;
    }
    function draw(now){
      if(killed)return;
      var tSec=(now-t0)/1000;
      setup.people.forEach(function(person){
        var cv=canvasRefs.current[person.id];if(!cv)return;
        var ctx=cv.getContext('2d');
        if(!W){var r=cv.getBoundingClientRect();W=Math.max(80,Math.floor(r.width));H=Math.max(30,Math.floor(r.height));}
        if(cv.width!==W){cv.width=W;cv.height=H;}
        ctx.clearRect(0,0,W,H);
        var bk=burstFactor(person,tSec);
        // 스크롤 파형: 오른쪽이 현재. 황색 변색은 버스트 정점에서만 — 색만 보고 못 맞히게.
        ctx.beginPath();
        ctx.strokeStyle=bk>0.45?'rgba(255,176,72,'+(0.7+bk*0.3)+')':'rgba(122,255,198,0.8)';
        ctx.lineWidth=1.4;
        var span=2.6; // 화면에 보이는 시간 폭(초)
        for(var x=0;x<W;x++){
          var tt=tSec-(W-x)*(span/W);
          var bb=Math.max(burstFactor(person,tt),decoyFactor(person,tt));
          var v=wave(person,tt,bb);
          var y=H*0.72-v*H*0.5;
          if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
        }
        ctx.stroke();
        // BPM 숫자 갱신 (DOM 텍스트 — 0.25s 간격 정도로만)
        var bpmEl=bpmRefs.current[person.id];
        if(bpmEl&&(now-(bpmEl.__t||0))>250){
          bpmEl.__t=now;
          var dk=decoyFactor(person,tSec);
          var bpm=person.baseBpm+Math.round(Math.sin(tSec*1.3+person.phase)*4)+(bk>0?Math.round(18+12*bk):0)+(dk>0?Math.round(9*dk):0);
          bpmEl.textContent=bpm;
          bpmEl.style.color=bk>0.45?'#ffb048':'rgba(122,255,198,0.85)';
        }
      });
      raf=requestAnimationFrame(draw);
    }
    raf=requestAnimationFrame(draw);
    return function(){killed=true;cancelAnimationFrame(raf);};
  },[]);

  function toggle(id){
    if(finished.current)return;
    if(typeof SFX!=='undefined')SFX.play('tab');
    setSelected(function(prev){
      if(prev.indexOf(id)>=0)return prev.filter(function(v){return v!==id;});
      if(prev.length>=2)return prev;
      return prev.concat([id]);
    });
  }

  function finalize(picks){
    var chosen=(picks||selRef.current).slice();
    var hit=chosen.filter(function(id){return setup.answer.indexOf(id)>=0;}).length;
    if(hit===2&&chosen.length===2)p.onDone(time>=8?'great':'success');
    else if(hit===1)p.onDone('partial');
    else p.onDone('fail');
  }

  return h(FieldTerminalShell,{
    code:'M-007',kind:labels.kind,title:copy.title,intro:copy.intro,
    status:[{k:labels.time,v:time+'s',cls:time<=4?'is-bad':''},{k:labels.mark,v:selected.length+'/2'}]
  },
    h('div',{className:'fm-term-stage',style:{display:'flex',flexDirection:'column',gap:8,padding:'12px 14px',alignContent:'start'}},
      setup.people.map(function(person){
        var active=selected.indexOf(person.id)>=0;
        return h('div',{
          key:person.id,onClick:function(){toggle(person.id);},
          style:{display:'flex',alignItems:'center',gap:10,padding:'6px 10px',cursor:'pointer',borderRadius:10,
            background:active?'rgba(120,255,190,0.12)':'rgba(5,18,11,0.92)',
            border:'1px solid '+(active?'rgba(120,255,190,0.55)':'rgba(122,255,198,0.16)'),
            transition:'border-color .15s, background .15s'}
        },
          h('div',{style:{width:86,flexShrink:0}},
            h('div',{style:{fontSize:12,fontWeight:'700',color:active?'#ecfff4':'#78ffbe',lineHeight:1.3}},locale==='en'?person.en:person.ko),
            h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'rgba(122,255,198,0.5)',letterSpacing:1,marginTop:2}},
              labels.bpm+' ',h('span',{ref:function(el){if(el)bpmRefs.current[person.id]=el;},style:{fontSize:11}},person.baseBpm))),
          h('canvas',{ref:function(el){if(el)canvasRefs.current[person.id]=el;},
            style:{flex:1,height:38,minWidth:0,display:'block',background:'rgba(3,10,6,0.6)',borderRadius:6}}),
          h('div',{style:{width:18,flexShrink:0,textAlign:'center',fontSize:14,color:active?'#78ffbe':'rgba(122,255,198,0.25)'}},active?'\u25C9':'\u25CB')
        );
      })
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',disabled:selected.length===0,onClick:function(){if(!finished.current){finished.current=true;finalize(selRef.current);}}},copy.action))
  );
}

// 미니게임 시작 게이트 — 플레이 방법 안내 후 [시작]을 눌러야 타이머/모션 작동(게임은 START 후 마운트되므로 타이머 자동 정지)
var MINI_CONTROLS = {
  signal:{ko:'세 주파수 채널을 위에서부터 차례로 고정한다. 커서가 황색 띠 안일 때 [정렬 고정] — 아래 채널일수록 빠르고 좁으며, HIGH 띠는 흔들린다. 오조준 3회면 실패.',en:'Lock the three channels top to bottom. Press [LOCK] while the cursor is inside the amber band — lower channels are faster and narrower, and the HIGH band drifts. Three misses fail the run.'},
  sequence:{ko:'브리핑 4초 동안 표시되는 프로토콜을 암기하고, 마스킹된 뒤 순서대로 입력한다. 적색 INTERLOCK 중 입력은 오류 — 잠금이 풀릴 때까지 기다려라. 오류 3회면 실패.',en:'Memorize the protocol shown for 4 seconds, then enter it from memory once masked. Input during the red INTERLOCK counts as an error — wait for it to clear. Three errors fail the run.'},
  breach:{ko:'이웃한 노드로만 이동해 KEY 2개를 모은 뒤 EXIT로 나온다. 붉은 노드는 노출을 올린다.',en:'Move only to adjacent nodes, collect 2 KEYs, then reach EXIT. Red nodes raise exposure.'},
  shellbreak:{ko:'[전진]을 홀드하면 나아가지만 소음이 쌓인다. ■ 청음(적색) 중 이동은 치명적 — 놓고 기다려라. 목소리가 들리면 콜사인이 포함된 진짜에만 응답하라. 모방 음성에 응답하면 위치가 노출된다.',en:'Hold [ADVANCE] to move — it builds noise. Moving during the red LISTENING phase is fatal; release and wait. When a voice calls, reply only if it carries the callsign. Answering a mimic reveals your position.'},
  route:{ko:'물길(≈)을 따라 상하좌우 한 칸씩 이동한다. 붉은 X 순찰은 수로를 배회한다 — 밟으면 즉시 실패, 길이 열릴 때를 기다려라. 황색 ≋ 역류는 이동력 2 소모, ▦ 격벽은 통과 불가.',en:'Follow the water (≈) one tile at a time. Red X patrols roam the channel — stepping on one fails instantly; wait for an opening. Amber ≋ backflow costs 2 moves; ▦ bulkheads are impassable.'},
  sample:{ko:'버튼을 길게 눌러 탐침을 올리고 샘플에 겹쳐 회수율을 채운다. 회수율이 오를수록 샘플이 빨라지고, 적색 SURGE 중 홀드는 과부하 3배 — 경고가 뜨면 놓아라.',en:'Hold to raise the probe and overlap the sample to fill recovery. The sample speeds up as recovery rises, and holding during a red SURGE triples overload — release when warned.'},
  scan:{ko:'표적은 보이지 않는다 — 신호 강도(%)로 위치를 좁혀라. 기만 반응은 58%에서 정체하다 FALSE ECHO로 판명되어 잠금을 깎는다. 간섭 스윕이 지나는 동안은 판독 불가.',en:'The target is invisible — narrow it down by signal strength (%). Decoys plateau at 58% and resolve as FALSE ECHO, draining your lock. Readings are jammed while the interference sweep passes.'},
  evidence:{ko:'수거물이 한 점씩 들어온다. 상단 판독 기준에 맞으면 [채증], 아니면 [폐기] — 제한시간 안에 판정한다. 미판정은 자동 폐기.',en:'Items arrive one at a time. [COLLECT] if it matches the rule, [DISCARD] if not — decide before the timer runs out. No decision = auto-discard.'},
  reconstruction:{ko:'스트림의 기록을 시각이 이른 것부터 순서대로 탭한다. 사건과 무관한 기록·깨진 기록이 섞여 있다 — 탭하면 오류. 놓치면 다시 흘러올 때까지 기다린다.',en:'Tap records earliest-first by timestamp. Unrelated and corrupted entries are mixed in — tapping them counts as an error. Missed one? Wait for it to cycle back.'},
  statement:{ko:'기록과 모순되는 진술 하나를 고른다.',en:'Select the one statement that contradicts the record.'},
  screening:{ko:'생체 파형을 관찰한다. 정상 인원도 가끔 잔떨림을 보인다 — 파형이 황색으로 변하며 BPM이 크게 튀는 쪽이 진짜다. 두 명을 표시한 뒤 [판독 확정].',en:'Watch the vitals. Normal staff also show minor stutters — the real carriers flash amber with a sharp BPM spike. Mark two, then press [Confirm Read].'},
  strike:{ko:'조준경이 ◆ 구획 위에 온 순간 화면을 탭(또는 [사격])한다. 탄은 3발. 민간인 □ 근처 사격은 즉시 실패.',en:'Tap the screen (or [FIRE]) the moment the reticle crosses a \u25c6 block. 3 rounds. Firing near a civilian \u25a1 fails instantly.'},
  crawler:{ko:'화면을 스와이프(또는 방향 버튼)해 웜의 진행 방향을 바꾼다. 녹색 패킷을 모두 수집하면 성공, 적색 감시 프로세스에 닿으면 즉시 실패.',en:'Swipe (or use the arrows) to steer the worm. Collect every green packet to succeed; touching a red watchdog fails instantly.'}
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
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var labels=locale==='en'
    ? { kind:'PRECISION STRIKE', time:'TIME', shots:'ROUNDS', hit:'HIT' }
    : { kind:'정밀 타격', time:'시간', shots:'탄', hit:'명중' };
  var targetsRef=useRef([{x:27,y:40,hit:false},{x:73,y:52,hit:false}]);
  var _tick=useState(0),tick=_tick[0],setTick=_tick[1];
  var _shots=useState(3),shots=_shots[0],setShots=_shots[1];
  var _flash=useState(null),flash=_flash[0],setFlash=_flash[1];
  var finished=useRef(false);
  var t0Ref=useRef(null);
  var DUR=20;
  function retPos(el){
    return { x:50+34*Math.sin(el*0.9)+8*Math.sin(el*2.3), y:45+24*Math.sin(el*1.25+1.7)+6*Math.cos(el*2.9) };
  }
  function civPos(el,i){
    var t=targetsRef.current[i%2];
    return { x:t.x+16*Math.sin(el*0.65+i*2.1), y:t.y+11*Math.cos(el*0.8+i*1.3) };
  }
  function dist(a,b){var dx=a.x-b.x,dy=a.y-b.y;return Math.sqrt(dx*dx+dy*dy);}
  function finalize(civFail,elNow){
    var hits=targetsRef.current.filter(function(t){return t.hit}).length;
    if(civFail){p.onDone('fail');return;}
    if(hits===2)p.onDone((DUR-elNow)>=8?'great':'success');
    else if(hits===1)p.onDone('partial');
    else p.onDone('fail');
  }
  useEffect(function(){
    t0Ref.current=performance.now();
    var raf;var loop=function(now){
      if(finished.current)return;
      var el=(now-t0Ref.current)/1000;
      if(el>=DUR){finished.current=true;finalize(false,el);return;}
      setTick(el);
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    // 백그라운드 전환 시 벽시계가 계속 흘러 복귀 즉시 시간초과되는 것을 방지 — 숨김 시간만큼 t0 를 뒤로 민다
    var hidAt=0;var onVis=function(){if(document.visibilityState==='hidden'){hidAt=performance.now()}else if(hidAt){t0Ref.current+=performance.now()-hidAt;hidAt=0}};
    document.addEventListener('visibilitychange',onVis);
    return function(){cancelAnimationFrame(raf);document.removeEventListener('visibilitychange',onVis)};
  },[]);
  function fire(){
    if(finished.current||shots<=0)return;
    var elNow=(performance.now()-t0Ref.current)/1000;
    var r=retPos(elNow);
    setFlash({x:r.x,y:r.y,k:elNow});
    var civHit=[civPos(elNow,0),civPos(elNow,1)].some(function(c){return dist(c,r)<10;});
    if(civHit){finished.current=true;setTimeout(function(){finalize(true,elNow);},380);return;}
    targetsRef.current=targetsRef.current.map(function(t){
      if(!t.hit&&dist(t,r)<9)return {x:t.x,y:t.y,hit:true};
      return t;
    });
    var ns=shots-1;setShots(ns);
    var hits=targetsRef.current.filter(function(t){return t.hit}).length;
    if(hits===2){finished.current=true;setTimeout(function(){finalize(false,elNow);},420);return;}
    if(ns<=0){finished.current=true;setTimeout(function(){finalize(false,elNow);},420);}
  }
  var el=tick,remain=Math.max(0,Math.ceil(DUR-el));
  var ret=retPos(el);
  var civs=[civPos(el,0),civPos(el,1)];
  var targets=targetsRef.current;
  var bg=(typeof MISSIONS!=='undefined'&&MISSIONS['M-007']&&MISSIONS['M-007'].hero)||null;
  return h(FieldTerminalShell,{
    code:'M-007',kind:labels.kind,title:copy.title,intro:copy.intro,
    status:[{k:labels.time,v:remain+'s',cls:remain<=3?'is-bad':''},{k:labels.shots,v:String(shots)},{k:labels.hit,v:targets.filter(function(t){return t.hit}).length+'/2'}]
  },
    h('div',{className:'fm-term-stage',style:{position:'relative',height:260,overflow:'hidden',cursor:'crosshair'},onClick:fire},
      bg?h('div',{style:{position:'absolute',inset:0,backgroundImage:'url('+bg+')',backgroundSize:'cover',backgroundPosition:'center',filter:'grayscale(1) brightness(.45)',opacity:.55,pointerEvents:'none'}}):null,
      h('div',{style:{position:'absolute',inset:0,pointerEvents:'none',background:'repeating-linear-gradient(0deg,transparent 0 23px,rgba(122,255,198,.08) 23px 24px),repeating-linear-gradient(90deg,transparent 0 23px,rgba(122,255,198,.08) 23px 24px)'}}),
      targets.map(function(t,i){return h('div',{key:'t'+i,style:{position:'absolute',left:t.x+'%',top:t.y+'%',width:56,height:56,margin:'-28px 0 0 -28px',pointerEvents:'none',border:'1px dashed '+(t.hit?'rgba(255,90,72,.9)':'rgba(122,255,198,.55)'),borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:t.hit?'#ff5a48':'rgba(122,255,198,.85)',fontSize:12,fontFamily:"'Share Tech Mono',monospace"}},t.hit?'✕':'◆');}),
      civs.map(function(c,i){return h('div',{key:'c'+i,style:{position:'absolute',left:c.x+'%',top:c.y+'%',width:8,height:8,margin:'-4px 0 0 -4px',pointerEvents:'none',background:'rgba(255,255,255,.88)',borderRadius:2,boxShadow:'0 0 6px rgba(255,255,255,.5)'}});}),
      h('div',{style:{position:'absolute',left:ret.x+'%',top:ret.y+'%',width:34,height:34,margin:'-17px 0 0 -17px',pointerEvents:'none'}},
        h('div',{style:{position:'absolute',inset:0,border:'1px solid rgba(255,196,90,.95)',borderRadius:'50%',boxShadow:'0 0 10px rgba(255,196,90,.4)'}}),
        h('div',{style:{position:'absolute',left:'50%',top:-6,bottom:-6,width:1,background:'rgba(255,196,90,.8)'}}),
        h('div',{style:{position:'absolute',top:'50%',left:-6,right:-6,height:1,background:'rgba(255,196,90,.8)'}})),
      flash?h('div',{key:'f'+flash.k,style:{position:'absolute',left:flash.x+'%',top:flash.y+'%',width:14,height:14,margin:'-7px 0 0 -7px',pointerEvents:'none',borderRadius:'50%',background:'rgba(255,196,90,.9)',boxShadow:'0 0 20px rgba(255,196,90,.85)'}}):null,
      h('div',{style:{position:'absolute',left:8,bottom:6,pointerEvents:'none',fontFamily:"'Share Tech Mono',monospace",fontSize:9,letterSpacing:1,color:'rgba(255,255,255,.6)'}},locale==='en'?'\u25a1 CIVILIAN — DO NOT FIRE NEAR':'\u25a1 민간인 — 근처 사격 금지')
    ),
    h('div',{className:'fm-term-actions'},
      h('button',{className:'fm-term-btn is-amber',onClick:function(e){e.stopPropagation();fire();}},copy.action))
  );
}

function ShellBreakMiniGame(p){
  // 탈출 클라이맥스 전용(ESC-B3): 쉘 토커 격리실 앞 침묵 통과.
  // 3중 판단 — 홀드 전진(소음), 배회→경청→청음 사이클(타이밍), 목소리 콜사인 판별(진위).
  // p.known(사전 격리 회차)이면 모방 음성에 ▒ 글리치가 섞여 판별이 쉽다 — 기존 확률표의 '인지 보너스'를 플레이 감각으로 번역.
  var copy=p.copy;
  var known=!!p.known;
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
  var L=function(ko,en){return locale==='en'?en:ko};
  var CALLSIGN=L('남십자','SOUTHERN CROSS');
  var REAL=[
    {ko:'[서하은] 남십자. 동쪽 셔터 열려 있어요.',en:'[HAEUN] Southern Cross. East shutter is open.'},
    {ko:'[강도윤] 남십자 확인. 통로 이상 없습니다.',en:'[DOYUN] Southern Cross confirmed. Corridor clear.'},
    {ko:'[임재혁] 남십자! 카메라 30초 죽였습니다.',en:'[JAEHYUK] Southern Cross! Cameras are down for thirty seconds.'}
  ];
  var FAKE=[
    {ko:'[서하은?] 이쪽이에요, 지휘관님. 빨리요.',en:'[HAEUN?] This way, Commander. Hurry.'},
    {ko:'[강도윤?] 괜찮습니다. 나오셔도 됩니다.',en:'[DOYUN?] It is safe. You can come out now.'},
    {ko:'[윤세진?] 지휘관님… 도와주세요…',en:'[SEJIN?] Commander… please help me…'}
  ];
  var _prog=useState(0),prog=_prog[0],setProg=_prog[1];
  var _det=useState(0),det=_det[0],setDet=_det[1];
  var _hold=useState(false),hold=_hold[0],setHold=_hold[1];
  var _cp=useState('roam'),cphase=_cp[0],setCphase=_cp[1];   // roam|alert|listen
  var _voice=useState(null),voice=_voice[0],setVoice=_voice[1]; // {real,ko,en}
  var _fx=useState(null),fx=_fx[0],setFx=_fx[1];               // 판정 피드백
  var _time=useState(38),time=_time[0],setTime=_time[1];
  var finished=useRef(false);
  var holdRef=useRef(false);holdRef.current=hold;
  var cpRef=useRef('roam');cpRef.current=cphase;
  var detRef=useRef(0);detRef.current=det;
  var progRef=useRef(0);progRef.current=prog;
  var voiceRef=useRef(null);voiceRef.current=voice;
  var timeRef=useRef(38);timeRef.current=time;
  var mistakes=useRef(0);

  function done(rank){ if(finished.current)return; finished.current=true; p.onDone(rank); }

  // 크리처 사이클: 배회 2.2~3.4s → 경청 0.8s → 청음 1.3~1.7s
  useEffect(function(){
    var killed=false,t;
    function roam(){ if(killed||finished.current)return; setCphase('roam');
      t=setTimeout(function(){ if(killed||finished.current)return; setCphase('alert'); if(typeof SFX!=='undefined')SFX.play('btn_off');
        t=setTimeout(function(){ if(killed||finished.current)return; setCphase('listen');
          t=setTimeout(roam,1300+Math.random()*400);
        },800);
      },2200+Math.random()*1200);
    }
    roam();
    return function(){killed=true;clearTimeout(t);};
  },[]);

  // 메인 틱(80ms): 전진/소음/탐지
  useEffect(function(){
    var iv=setInterval(function(){
      if(finished.current)return;
      if(holdRef.current){
        var np=Math.min(100,progRef.current+1.15);
        setProg(np);
        var dd=cpRef.current==='listen'?4.2:cpRef.current==='alert'?1.1:0.32;
        setDet(function(v){return Math.min(100,v+dd);});
        if(np>=100){
          var d=detRef.current;
          done(d<35&&mistakes.current===0&&timeRef.current>=8?'great':(d<75&&mistakes.current<=1?'success':'partial'));
          return;
        }
      }else{
        setDet(function(v){return Math.max(0,v-0.38);});
      }
      if(detRef.current>=100)done('fail'); // 기습
    },80);
    return function(){clearInterval(iv);};
  },[]);

  // 목소리 스케줄: 3.8~5.3s 간격, 3.6s 응답 창
  useEffect(function(){
    var killed=false,t1,t2;
    function schedule(){
      if(killed||finished.current)return;
      t1=setTimeout(function(){
        if(killed||finished.current)return;
        var real=Math.random()<0.5;
        var pool=real?REAL:FAKE;
        var v=Object.assign({real:real},pool[Math.floor(Math.random()*pool.length)]);
        setVoice(v);
        if(typeof SFX!=='undefined')SFX.play('dialogue');
        t2=setTimeout(function(){ if(killed||finished.current)return; setVoice(null); schedule(); },3600);
      },3800+Math.random()*1500);
    }
    schedule();
    return function(){killed=true;clearTimeout(t1);clearTimeout(t2);};
  },[]);

  function respond(reply){
    var v=voiceRef.current;if(!v||finished.current)return;
    setVoice(null);
    if(v.real&&reply){ setDet(function(x){return Math.max(0,x-14);}); setFx({ok:true,t:L('응답 확인 — 경로 정보 수신','Reply confirmed — route intel received')}); if(typeof SFX!=='undefined')SFX.play('check'); }
    else if(v.real&&!reply){ setFx({ok:true,t:L('…진짜 목소리였다. 정보를 놓쳤다.','…That one was real. Intel missed.')}); }
    else if(!v.real&&reply){ mistakes.current++; setDet(function(x){return Math.min(100,x+24);}); setFx({ok:false,t:L('모방 음성 — 위치 노출!','MIMIC VOICE — position revealed!')}); if(typeof SFX!=='undefined')SFX.play('warn'); if(typeof Haptics!=='undefined')Haptics.warn(); }
    else { setDet(function(x){return Math.max(0,x-3);}); setFx({ok:true,t:L('침묵 유지 — 옳은 판단','Silence held — the right call')}); }
    setTimeout(function(){setFx(null);},1400);
  }

  // 제한시간
  useEffect(function(){
    if(finished.current)return;
    if(time<=0){ done(progRef.current>=60?'partial':'fail'); return; }
    var t=setTimeout(function(){setTime(function(v){return Math.max(0,v-1);});},1000);
    return function(){clearTimeout(t);};
  },[time]);

  // 키보드: Space 홀드, 1 응답, 2 침묵
  useEffect(function(){
    var kd=function(e){
      if(e.key===' '||e.key==='Enter'){e.preventDefault();setHold(true);}
      if(e.key==='1'&&voiceRef.current){e.preventDefault();respond(true);}
      if(e.key==='2'&&voiceRef.current){e.preventDefault();respond(false);}
    };
    var ku=function(e){ if(e.key===' '||e.key==='Enter'){e.preventDefault();setHold(false);} };
    window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
    return function(){window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);};
  },[]);

  function glitchText(s){
    if(!known)return s;
    var out='';for(var i=0;i<s.length;i++){out+=(i%7===3)?'▒':s[i];}
    return out;
  }
  var cpView=cphase==='listen'
    ?{t:L('■ 청음 — 이동 금지','■ LISTENING — DO NOT MOVE'),bg:'rgba(120,10,10,0.92)',bd:'rgba(255,90,72,0.9)',fg:'#ffd6d6'}
    :cphase==='alert'
    ?{t:L('▲ 경청 — 정지 준비','▲ ATTENTIVE — PREPARE TO FREEZE'),bg:'rgba(120,78,14,0.9)',bd:'rgba(252,200,88,0.85)',fg:'#ffe2a8'}
    :{t:L('… 배회음 — 이동 가능','… ROAMING — SAFE TO MOVE'),bg:'rgba(6,24,14,0.85)',bd:'rgba(122,255,198,0.3)',fg:'rgba(170,240,205,0.8)'};

  return h(FieldTerminalShell,{
    code:'ESC-B3',kind:'SILENT PASSAGE',title:copy.title,intro:copy.intro,
    status:[{k:'TIME',v:time+'s',cls:time<=5?'is-bad':''},{k:'DETECT',v:Math.round(det)+'%',cls:det>=70?'is-bad':''},{k:'CALLSIGN',v:CALLSIGN}],
    footL:'B3 QUARANTINE',progress:prog,footR:Math.round(prog)+'%'
  },
    h('div',{className:'fm-term-stage',style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-start',gap:10,padding:'8px 12px'}},
      h('div',{style:{borderRadius:8,padding:'8px 10px',textAlign:'center',fontFamily:"'Share Tech Mono',monospace",fontSize:12,letterSpacing:1,background:cpView.bg,border:'1px solid '+cpView.bd,color:cpView.fg}},cpView.t),
      // 복도 트랙 — 출구까지의 전진
      h('div',{style:{position:'relative',height:64,borderRadius:12,overflow:'hidden',border:'1px solid rgba(122,255,198,0.18)',background:'linear-gradient(90deg, rgba(8,22,16,0.95), rgba(4,12,9,0.98))'}},
        h('div',{style:{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(90deg, rgba(122,255,198,0.05) 0 1px, transparent 1px 24px)'}}),
        h('div',{style:{position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#8ad7ff',border:'1px solid rgba(122,200,255,0.5)',borderRadius:5,padding:'3px 6px'}},'EXIT'),
        h('div',{style:{position:'absolute',left:'calc('+Math.min(92,prog*0.9)+'% )',top:'50%',transform:'translateY(-50%)',width:14,height:26,borderRadius:4,background:hold?(cphase==='listen'?'#ff8f8f':'#78ffbe'):'rgba(120,255,190,0.55)',boxShadow:hold?'0 0 14px rgba(120,255,190,0.5)':'none',transition:'background .1s'}})),
      // 탐지 게이지
      h('div',null,
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(255,160,150,0.75)',marginBottom:4,letterSpacing:1}},'DETECTION'),
        h('div',{style:{height:10,borderRadius:999,overflow:'hidden',background:'rgba(35,15,15,0.9)'}},
          h('div',{style:{height:'100%',width:Math.min(100,det)+'%',background:det>=70?'#ff5a48':'#ff8f8f',transition:'width .12s'}}))),
      // 목소리 카드
      voice?h('div',{style:{borderRadius:10,padding:'10px 12px',border:'1px dashed rgba(138,215,255,0.5)',background:'rgba(7,18,26,0.75)'}},
        h('div',{style:{fontSize:12.5,lineHeight:1.5,color:'#bfe6ff',marginBottom:8,fontStyle:'italic'}},'"'+glitchText(L(voice.ko,voice.en))+'"'),
        h('div',{style:{display:'flex',gap:8}},
          h('button',{className:'btn',style:{flex:1,fontSize:11,padding:'8px 6px',marginTop:0,minHeight:0},onClick:function(){respond(true);}},L('[1] 응답한다','[1] REPLY')),
          h('button',{className:'btn',style:{flex:1,fontSize:11,padding:'8px 6px',marginTop:0,minHeight:0},onClick:function(){respond(false);}},L('[2] 침묵한다','[2] STAY SILENT'))))
      :fx?h('div',{style:{borderRadius:10,padding:'9px 12px',textAlign:'center',fontFamily:"'Share Tech Mono',monospace",fontSize:11,letterSpacing:0.5,border:'1px solid '+(fx.ok?'rgba(120,255,190,0.45)':'rgba(255,90,72,0.7)'),color:fx.ok?'#9df5c8':'#ffd6d6',background:fx.ok?'rgba(10,30,20,0.6)':'rgba(60,10,10,0.6)'}},fx.t)
      :h('div',{style:{borderRadius:10,padding:'9px 12px',textAlign:'center',fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(170,220,195,0.4)',border:'1px dashed rgba(122,255,198,0.14)'}},L('… 통로가 조용하다 …','… the corridor is quiet …'))),
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

function FieldMiniGameOverlay(p){
  var _ob=useState(false),started=_ob[0],setStarted=_ob[1];
  if(!p.game)return null;
  var game=FIELD_MINIGAME_LIBRARY[p.game.type];
  if(!game)return null;
  var copy=getMiniLocaleCopy(game);
  // 결과 랭크별 진동 피드백 — 전 미니게임 공통 지점
  var onDone=function(rank){
    if(typeof Haptics!=='undefined'){
      if(rank==='fail')Haptics.fail();
      else if(rank==='partial')Haptics.warn();
      else if(rank==='great')Haptics.great();
      else Haptics.success();
    }
    p.onDone(rank);
  };
  if(!started)return h(MinigameOnboarding,{game:game,copy:copy,type:p.game.type,onStart:function(){setStarted(true);}});
  if(p.game.type==='signal')return h(SignalMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='sequence')return h(SequenceMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='breach')return h(BreachMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='sample')return h(SampleMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='scan')return h(ScanMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='route')return h(RouteMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='evidence')return h(EvidenceMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='reconstruction')return h(ReconstructionMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='statement')return h(StatementMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='screening')return h(ScreeningMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='strike')return h(StrikeMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='crawler')return h(CrawlerMiniGame,{copy:copy,onDone:onDone});
  if(p.game.type==='shellbreak')return h(ShellBreakMiniGame,{copy:copy,known:!!p.game.known,onDone:onDone});
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

// ── INFILTRATION WORM — 그리드 크롤러 (역침투 웜 주입, MI-04 trap) ──
// 실시간 스텝 이동(0.24s/칸). 스와이프/방향버튼/화살표키로 조향. 가장자리 순환.
// 패킷 6개 전부 수집: 잔여 9s+ great / 성공. 시간초과: 5+ success, 3+ partial. 감시 접촉 즉시 fail.
function CrawlerMiniGame(p){
  var wrapRef=useRef(null),cvRef=useRef(null);
  var doneRef=useRef(false);
  var s1=useState(0),tick=s1[0],setTick=s1[1];
  var stateRef=useRef(null);
  var DUR=26,STEP=0.24;
  function initState(w,h){
    var cols=Math.max(12,Math.floor(w/20)),rows=Math.max(9,Math.floor(h/20));
    var cells={};
    function freeCell(){var c,r,k,guard=0;do{c=2+Math.floor(Math.random()*(cols-4));r=1+Math.floor(Math.random()*(rows-2));k=c+':'+r;guard++}while(cells[k]&&guard<200);cells[k]=1;return{c:c,r:r}}
    var worm=[];var wc=Math.floor(cols/2),wr=Math.floor(rows/2);
    for(var i=0;i<5;i++){worm.push({c:wc-i,r:wr});cells[(wc-i)+':'+wr]=1}
    var packets=[];for(var pn=0;pn<6;pn++)packets.push(freeCell());
    var sensors=[];
    for(var sn=0;sn<3;sn++){var sc=freeCell();sensors.push({c:sc.c,r:sc.r,patrol:sn===2,dir:1})}
    return{cols:cols,rows:rows,worm:worm,dir:{x:1,y:0},nextDir:null,packets:packets,sensors:sensors,eaten:0,t0:performance.now(),last:0,sensStep:0};
  }
  function finish(rank){if(doneRef.current)return;doneRef.current=true;setTimeout(function(){p.onDone(rank)},420)}
  useEffect(function(){
    var cv=cvRef.current,wrap=wrapRef.current;if(!cv||!wrap)return;
    var ctx=cv.getContext('2d');var DPR=Math.min(2,window.devicePixelRatio||1);
    var W=wrap.clientWidth,H=Math.min(320,Math.max(220,Math.floor(window.innerHeight*0.34)));
    cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);
    var st=stateRef.current=initState(W,H);
    var cw=W/st.cols,chh=H/st.rows;
    var raf,hidAt=0;
    var onVis=function(){if(document.visibilityState==='hidden'){hidAt=performance.now()}else if(hidAt){st.t0+=performance.now()-hidAt;hidAt=0}};
    document.addEventListener('visibilitychange',onVis);
    function loop(now){
      if(doneRef.current)return;
      var el=(now-st.t0)/1000;
      if(el>=DUR){finish(st.eaten>=5?'success':st.eaten>=3?'partial':'fail');return}
      // 스텝 이동
      if(el-st.last>=STEP){
        st.last=el;
        if(st.nextDir){st.dir=st.nextDir;st.nextDir=null}
        var hd=st.worm[0];
        var nc=(hd.c+st.dir.x+st.cols)%st.cols,nr=(hd.r+st.dir.y+st.rows)%st.rows;
        st.worm.unshift({c:nc,r:nr});
        // 패킷 섭취
        var ate=-1;
        for(var i=0;i<st.packets.length;i++){if(st.packets[i].c===nc&&st.packets[i].r===nr){ate=i;break}}
        if(ate>=0){st.packets.splice(ate,1);st.eaten++;if(typeof SFX!=='undefined')SFX.play('tab');
          if(st.eaten>=6){finish((DUR-el)>=9?'great':'success');return}}
        else if(st.worm.length>5+st.eaten)st.worm.pop();
        // 센서 순찰 (2스텝마다)
        st.sensStep++;
        if(st.sensStep%2===0)st.sensors.forEach(function(sn){if(!sn.patrol)return;sn.c+=sn.dir;if(sn.c<=1||sn.c>=st.cols-2)sn.dir*=-1});
        // 감시 접촉 (머리 기준)
        for(var j=0;j<st.sensors.length;j++){if(st.sensors[j].c===nc&&st.sensors[j].r===nr){if(typeof SFX!=='undefined')SFX.play('warn');finish('fail');return}}
      }
      // ── 렌더 ──
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='rgba(3,8,8,0.92)';ctx.fillRect(0,0,W,H);
      for(var r=0;r<st.rows;r++)for(var c=0;c<st.cols;c++){
        ctx.fillStyle='rgba(80,255,150,0.05)';
        ctx.fillRect(c*cw+1.5,r*chh+1.5,cw-3,chh-3);
      }
      var pulse=(Math.sin(now/240)+1)/2;
      st.packets.forEach(function(pk){
        ctx.fillStyle='rgba(110,255,170,'+(0.6+pulse*0.4)+')';
        ctx.fillRect(pk.c*cw+2.5,pk.r*chh+2.5,cw-5,chh-5);
      });
      st.sensors.forEach(function(sn){
        var blink=sn.patrol?1:(Math.sin(now/300+sn.c)>-0.3?1:0.25);
        ctx.fillStyle='rgba(255,84,64,'+(0.75*blink)+')';
        ctx.fillRect(sn.c*cw+2,sn.r*chh+2,cw-4,chh-4);
      });
      st.worm.forEach(function(seg,i){
        var a=i===0?1:Math.max(0.25,1-i*0.11);
        ctx.fillStyle=i===0?'rgba(214,196,255,'+a+')':'rgba(165,140,255,'+a+')';
        ctx.fillRect(seg.c*cw+2,seg.r*chh+2,cw-4,chh-4);
      });
      // HUD: 시간바 + 패킷 카운트
      var tk=1-el/DUR;
      ctx.fillStyle='rgba(80,255,150,0.25)';ctx.fillRect(0,H-3,W,3);
      ctx.fillStyle=tk>0.3?'rgba(80,255,150,0.85)':'rgba(255,150,60,0.9)';ctx.fillRect(0,H-3,W*tk,3);
      ctx.font='10px "Share Tech Mono",monospace';ctx.fillStyle='rgba(110,255,170,0.9)';
      ctx.fillText('PKT '+st.eaten+'/6',8,14);
      raf=requestAnimationFrame(loop);
      setTick(function(t){return t+1});
    }
    raf=requestAnimationFrame(loop);
    // 입력: 스와이프
    var ts=null;
    var onTS=function(e){var t=e.touches[0];ts={x:t.clientX,y:t.clientY}};
    var onTE=function(e){if(!ts)return;var t=e.changedTouches[0];var dx=t.clientX-ts.x,dy=t.clientY-ts.y;ts=null;
      if(Math.abs(dx)<18&&Math.abs(dy)<18)return;
      steer(Math.abs(dx)>Math.abs(dy)?{x:dx>0?1:-1,y:0}:{x:0,y:dy>0?1:-1});};
    var onKey=function(e){var m={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}}[e.key];if(m){e.preventDefault();steer(m)}};
    wrap.addEventListener('touchstart',onTS,{passive:true});
    wrap.addEventListener('touchend',onTE,{passive:true});
    window.addEventListener('keydown',onKey);
    return function(){doneRef.current=true;cancelAnimationFrame(raf);document.removeEventListener('visibilitychange',onVis);
      wrap.removeEventListener('touchstart',onTS);wrap.removeEventListener('touchend',onTE);window.removeEventListener('keydown',onKey)};
  },[]);
  function steer(d){var st=stateRef.current;if(!st)return;
    if(d.x===-st.dir.x&&d.y===-st.dir.y)return; // 역방향 금지
    st.nextDir=d;}
  var btn=function(label,d){return h('button',{type:'button',onClick:function(){steer(d)},
    style:{flex:1,minHeight:40,font:'14px monospace',color:'#b9a6ff',background:'rgba(30,20,50,.5)',border:'1px solid rgba(185,166,255,.4)',borderRadius:3,cursor:'pointer'}},label)};
  return h('div',{ref:wrapRef,style:{userSelect:'none',WebkitUserSelect:'none',touchAction:'none'}},
    h('canvas',{ref:cvRef,style:{display:'block',width:'100%',borderRadius:3,border:'1px solid rgba(185,166,255,.25)'}}),
    h('div',{style:{display:'flex',gap:6,marginTop:8}},
      btn('◀',{x:-1,y:0}),btn('▲',{x:0,y:-1}),btn('▼',{x:0,y:1}),btn('▶',{x:1,y:0})),
    h('div',{style:{marginTop:6,font:'9px "Share Tech Mono",monospace',color:'rgba(110,255,170,.55)',letterSpacing:1,textAlign:'center'}},
      (typeof window!=='undefined'&&window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'SWIPE OR ARROWS TO STEER — EDGES WRAP':'스와이프 또는 버튼으로 조향 — 가장자리는 순환'));
}
