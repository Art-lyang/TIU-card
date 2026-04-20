// components-escape.js — B안 Suzerain식 텍스트 어드벤처 탈출 모드
// 기존 iframe 기반 슈팅 대체. 카드 스와이프와 시각/상호작용 완전 차별화.
// 듀얼 타이머: 글로벌 06:00 카운트다운 + 노드별 결정 타이머 15~40s.
// app.js onEscapeResult 스키마 호환 유지.

function EscapeGameScreen(p){
  var stats=p.stats, gi=p.gi, logs=p.logs, trust=p.trust, onResult=p.onResult;
  var resultSent = useRef(false);
  var stateRef = useRef(null);

  // 초기 state 세팅
  var _state = useState(function(){
    return {
      nodeId: ESCAPE_NODES.start,
      hp: 100,
      ammo: 12,
      detection: 0,
      globalTimer: ESCAPE_GLOBAL_TIMER_START,
      companions: window.buildEscapeCompanions(trust, logs),
      casualties: [],
      routeHistory: [],
      markUnlucky: false,
      logs: []
    };
  });
  var state = _state[0], setState = _state[1];
  stateRef.current = state;

  // phase: 'reading' 타이핑 / 'choices' 선택 / 'rolling' 롤 / 'resolving' 결과 서사
  var _phase = useState('reading');
  var phase = _phase[0], setPhase = _phase[1];
  var _typed = useState(0); var typedLines = _typed[0], setTypedLines = _typed[1];
  var _rollRes = useState(null); var rollResult = _rollRes[0], setRollResult = _rollRes[1];
  var _resolveTxt = useState([]); var resolveTxt = _resolveTxt[0], setResolveTxt = _resolveTxt[1];
  var _decSec = useState(30); var decSec = _decSec[0], setDecSec = _decSec[1];
  var _pickedIdx = useState(-1); var pickedIdx = _pickedIdx[0], setPickedIdx = _pickedIdx[1];

  var node = ESCAPE_NODES[state.nodeId];

  // 노드 진입 — globalCost 차감 + companion drop + 타이핑 리셋
  useEffect(function(){
    if (!node) return;
    setState(function(s){
      var ns = Object.assign({}, s);
      ns.globalTimer = s.globalTimer - (node.globalCost || 0);
      ns.routeHistory = s.routeHistory.concat([state.nodeId]);
      // companion drop
      var difficulty = node.type === 'check' ? 1.2 : 0.6;
      window.rollEscapeCompanionDrop(ns, difficulty);
      return ns;
    });
    setTypedLines(0);
    setPhase('reading');
    setDecSec(node.decisionSec || 30);
    setPickedIdx(-1);
    setResolveTxt([]);
    setRollResult(null);
  }, [state.nodeId]);

  // 타이핑 효과 — 0.8초 간격으로 body[] 한 줄씩 노출
  useEffect(function(){
    if (phase !== 'reading' || !node) return;
    if (typedLines >= node.body.length) {
      var t = setTimeout(function(){ setPhase('choices'); }, 400);
      return function(){ clearTimeout(t); };
    }
    var t = setTimeout(function(){ setTypedLines(function(n){ return n+1; }); }, 700);
    return function(){ clearTimeout(t); };
  }, [phase, typedLines, state.nodeId]);

  // 글로벌 타이머 — 1초마다 감소, 항상 동작
  useEffect(function(){
    if (resultSent.current) return;
    var t = setInterval(function(){
      setState(function(s){ return Object.assign({}, s, { globalTimer: s.globalTimer - 1 }); });
    }, 1000);
    return function(){ clearInterval(t); };
  }, []);

  // 노드 결정 타이머 — choices phase 에만 카운트
  useEffect(function(){
    if (phase !== 'choices') return;
    if (decSec <= 0) {
      // 시간초과 — 첫 선택지 자동 선택
      pickChoice(0, true);
      return;
    }
    var t = setTimeout(function(){ setDecSec(function(n){ return n-1; }); }, 1000);
    return function(){ clearTimeout(t); };
  }, [phase, decSec]);

  // 종료 조건 감시 — hp/detection/timer
  useEffect(function(){
    if (resultSent.current) return;
    if (state.hp <= 0 || state.detection >= ESCAPE_DETECTION_LIMIT || state.globalTimer <= ESCAPE_OVERTIME_LIMIT) {
      finalizeEnding();
    }
  }, [state.hp, state.detection, state.globalTimer]);

  // 선택 처리
  function pickChoice(idx, timeout){
    if (phase !== 'choices') return;
    if (!node.choices || !node.choices[idx]) { finalizeEnding(); return; }
    var ch = node.choices[idx];
    setPickedIdx(idx);
    // 롤 없으면 바로 resolve
    if (!ch.roll) { applyChoice(ch, null, true); return; }
    // 롤 수행
    var ctx = { stats: stats, trust: trust, logs: logs, detection: state.detection };
    var r = window.performEscapeRoll(ch.roll, ctx);
    setRollResult(r);
    setPhase('rolling');
  }

  // 롤 애니 끝난 뒤 결과 적용
  function onRollDone(){
    var ch = node.choices[pickedIdx];
    var pass = rollResult.outcome === 'critical' || rollResult.outcome === 'success';
    applyChoice(ch, rollResult, pass);
  }

  function applyChoice(ch, roll, pass){
    setState(function(s){
      var ns = Object.assign({}, s);
      var eff = ch.effect || {};
      Object.keys(eff).forEach(function(k){
        if (k === 'hp') ns.hp = Math.max(0, Math.min(100, ns.hp + eff[k]));
        else if (k === 'ammo') ns.ammo = Math.max(0, ns.ammo + eff[k]);
        else if (k === 'detection') ns.detection = Math.max(0, Math.min(100, ns.detection + eff[k]));
      });
      if (!pass && ch.failEffect) {
        var fe = ch.failEffect;
        if (fe.hp) ns.hp = Math.max(0, Math.min(100, ns.hp + fe.hp));
        if (fe.ammo) ns.ammo = Math.max(0, ns.ammo + fe.ammo);
        if (fe.detection) ns.detection = Math.max(0, Math.min(100, ns.detection + fe.detection));
        if (fe.markUnlucky && !(logs.indexOf('LOG-SHELLTALKER-CAP') >= 0) && roll && roll.outcome === 'fail') {
          ns.markUnlucky = true;
        }
        ns.globalTimer -= ESCAPE_FAIL_PENALTY_SEC;
      }
      if (ch.extraGlobalCost) ns.globalTimer -= ch.extraGlobalCost;
      if (ch.log && ns.logs.indexOf(ch.log) < 0) ns.logs.push(ch.log);
      return ns;
    });
    setResolveTxt(pass ? (ch.onSuccess || []) : (ch.onFail || ch.onSuccess || []));
    setPhase('resolving');
    // 3초 후 다음 노드로
    setTimeout(function(){
      if (resultSent.current) return;
      if (ch.to === 'ENDING') { finalizeEnding(); return; }
      setState(function(s){ return Object.assign({}, s, { nodeId: ch.to }); });
    }, 2800);
  }

  function finalizeEnding(){
    if (resultSent.current) return;
    resultSent.current = true;
    // 항상 최신 state 사용 — setTimeout 콜백에서 closure stale state 방지
    var s = stateRef.current || state;
    var es = {
      hp: s.hp, detection: s.detection, globalTimer: s.globalTimer,
      markUnlucky: s.markUnlucky, companions: s.companions,
      casualties: s.casualties, currentRoute: s.routeHistory
    };
    var ending = window.computeEscapeEnding(es);
    var allLogs = (s.logs || []).concat(ending.logs || []);
    onResult({
      outcome: ending.outcome, route: s.routeHistory[1] || null,
      companionsFinal: (s.companions || []).map(function(c){return c.id;}),
      casualtiesFinal: (s.casualties || []).map(function(c){return c.id;}),
      detection: s.detection, hp: s.hp,
      flags: { logs: allLogs }, kills: 0, accuracy: 0
    });
  }

  if (!node) return h('div',{className:'escape-text-wrap'}, 'NODE ERROR: '+state.nodeId);

  // 시간 포맷
  function fmt(sec){
    if (sec < 0) return '-' + fmt(-sec);
    var m = Math.floor(sec/60), s = sec%60;
    return (m<10?'0':'')+m + ':' + (s<10?'0':'')+s;
  }
  var timerWarn = state.globalTimer < 60;
  var detWarn = state.detection >= ESCAPE_DETECTION_WARNING;

  return h('div',{className:'escape-text-wrap'},
    // 상단 HUD
    h('div',{className:'escape-hud'},
      h('div',{className:'escape-hud-cctv'}, '● REC ' + (node.simTime || '--:--')),
      h('div',{className:'escape-hud-timer' + (timerWarn?' warn':'')},
        'T-' + fmt(Math.max(state.globalTimer, -99))),
      h('div',{className:'escape-hud-stats'},
        h('span',{className:'hud-hp'}, 'HP ' + state.hp),
        h('span',{className:'hud-ammo'}, 'AMMO ' + state.ammo),
        h('span',{className:'hud-det' + (detWarn?' warn':'')}, 'DET ' + state.detection + '%')
      )
    ),
    // 타이틀
    h('div',{className:'escape-title'}, node.title),
    // 본문
    h('div',{className:'escape-body'},
      (node.body||[]).slice(0, typedLines).map(function(line,i){
        return h('div',{key:i,className:'escape-line'}, line || '\u00A0');
      })
    ),
    // 결과 서사
    phase==='resolving' && h('div',{className:'escape-resolve'},
      resolveTxt.map(function(line,i){
        return h('div',{key:i,className:'escape-line resolve'}, line);
      })
    ),
    // 선택지
    phase==='choices' && h('div',{className:'escape-choices'},
      h('div',{className:'escape-dec-timer' + (decSec<=5?' warn':'')},
        '결정 ' + decSec + 's'),
      node.choices.map(function(ch, i){
        return h('button',{
          key:i, className:'escape-choice-btn',
          onClick: function(){ pickChoice(i, false); }
        },
          h('div',{className:'choice-label'}, ch.label),
          ch.hint && h('div',{className:'choice-hint'}, ch.hint)
        );
      })
    ),
    // 동행자 바
    h('div',{className:'escape-companions'},
      state.companions.map(function(c){
        return h('span',{
          key:c.id,
          className:'comp-chip '+(c.status==='at_risk'?'risk':'')
        }, c.name);
      })
    ),
    // 롤 오버레이
    phase==='rolling' && h(EscapeRollDisplay,{result: rollResult, onDone: onRollDone})
  );
}
