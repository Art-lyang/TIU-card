// components-escape.js — B안 Suzerain식 텍스트 어드벤처 탈출 모드
// 기존 iframe 기반 슈팅 대체. 카드 스와이프와 시각/상호작용 완전 차별화.
// 듀얼 타이머: 글로벌 06:00 카운트다운 + 노드별 결정 타이머 15~40s.
// app.js onEscapeResult 스키마 호환 유지.

// 노드 관측 프레임 — 비주얼이 준비된 노드만 등록 (IMG 키 + 피드 태그)
// B3 격리실 시퀀스: 보관된 SPEC-011과 돌파 조우 컷
var ESCAPE_NODE_IMG = {
  b3_quarantine: { img: 'card_story_shelltalker_lab_containment', tag: 'CAM B3-ISO — FEED' },
  b3_final: { img: 'card_story_shelltalker_breach_escape', tag: 'CAM B3-EXIT — SIGNAL LOST' }
};

function EscapeGameScreen(p){
  var stats=p.stats, gi=p.gi, logs=p.logs, trust=p.trust, onResult=p.onResult;
  var resultSent = useRef(false);
  var stateRef = useRef(null);

  // 초기 state 세팅
  var _state = useState(function(){
    var initialNodeId = (logs.indexOf('LOG-B3-ROUTE') >= 0 && ESCAPE_NODES.b3_entry) ? 'b3_entry'
      : (logs.indexOf('LOG-GENERAL-ROUTE') >= 0 && ESCAPE_NODES.general_entry) ? 'general_entry'
      : ESCAPE_NODES.start;
    return {
      nodeId: initialNodeId,
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

  var locale = (window.TS_I18N && window.TS_I18N.getLocale && window.TS_I18N.getLocale() === 'en') ? 'en' : 'ko';
  function localizeEscapeNode(nodeId){
    var base = ESCAPE_NODES[nodeId];
    if (!base || locale !== 'en' || typeof ESCAPE_NODES_EN === 'undefined' || !ESCAPE_NODES_EN[nodeId]) return base;
    var copy = Object.assign({}, base, ESCAPE_NODES_EN[nodeId]);
    if (Array.isArray(base.choices)) {
      var enChoices = ESCAPE_NODES_EN[nodeId].choices || [];
      copy.choices = base.choices.map(function(ch, i){
        return Object.assign({}, ch, enChoices[i] || {});
      });
    }
    return copy;
  }
  var node = localizeEscapeNode(state.nodeId);

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
    // 쉘 토커 조우 미니게임 — 주사위 대신 플레이로 판정 (침묵 통과)
    if (ch.shellbreak) {
      if (typeof markMinigameSeen === 'function') markMinigameSeen('shellbreak');
      setPhase('minigame');
      return;
    }
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

  // 쉘 토커 미니게임 결과 → 탈출 상태 반영
  // fail = 기습: markUnlucky+detection 100 → 종료 감시 effect가 fail_unlucky(E_bad)로 처리
  function onShellbreakDone(rank){
    if (resultSent.current) return;
    if (rank === 'fail') {
      // 기존 주사위 설계와 동일: 쉘 토커를 사전 인지(CAP)한 회차는 '경고 누락' 기습(E_bad)에
      // 도달할 수 없다 — 인지 회차의 실패는 피탄/포획(fail_normal, E_c)으로 처리.
      var unlucky = logs.indexOf('LOG-SHELLTALKER-CAP') < 0;
      setState(function(s){ return Object.assign({}, s, { markUnlucky: unlucky, detection: 100 }); });
      return;
    }
    var eff = rank === 'great' ? { detection: -8 } : rank === 'success' ? { detection: 6 } : { hp: -14, detection: 18 };
    setState(function(s){
      var ns = Object.assign({}, s);
      if (eff.hp) ns.hp = Math.max(1, Math.min(100, ns.hp + eff.hp)); // 미니게임 부분 성공이 단독 사인이 되지 않게 hp 하한 1
      if (eff.detection) ns.detection = Math.max(0, Math.min(99, ns.detection + eff.detection));
      return ns;
    });
    var lines = locale === 'en'
      ? (rank === 'great' ? ['You made no sound at all.', 'The voice recedes behind you, still calling someone else\'s name.']
        : rank === 'success' ? ['You are through. Your back is soaked.']
        : ['Your last step caught a pipe.', 'The voice snapped toward you — you threw yourself over the threshold.'])
      : (rank === 'great' ? ['숨소리 하나 내지 않았다.', '목소리가 등 뒤에서 멀어진다. 아직도 다른 이름을 부르면서.']
        : rank === 'success' ? ['통과했다. 등줄기가 젖어 있다.']
        : ['마지막 걸음에서 파이프를 건드렸다.', '목소리가 홱 돌아섰다 — 몸을 던져 문턱을 넘었다.']);
    setResolveTxt(lines);
    setPhase('resolving');
    setTimeout(function(){
      if (resultSent.current) return;
      setState(function(s){ return Object.assign({}, s, { nodeId: 'b3_final' }); });
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

  // 쉘 토커 조우 미니게임 국면 — 탈출 화면을 대체 렌더 (글로벌 타이머는 계속 흐른다)
  if (phase === 'minigame' && typeof ShellBreakMiniGame === 'function') {
    var sbLib = (typeof FIELD_MINIGAME_LIBRARY !== 'undefined' && FIELD_MINIGAME_LIBRARY.shellbreak) || null;
    var sbCopy = sbLib ? (locale === 'en' ? sbLib.en : sbLib.ko) : { title: '침묵 통과', intro: '', action: '전진' };
    return h(ShellBreakMiniGame, { copy: sbCopy, known: logs.indexOf('LOG-SHELLTALKER-CAP') >= 0, allies: (state.companions||[]).map(function(c){return c.id;}), onDone: onShellbreakDone });
  }

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
    // 노드 관측 프레임 (보유 노드만)
    (function(){
      var vis=ESCAPE_NODE_IMG[state.nodeId];
      var src=vis&&typeof IMG!=='undefined'?IMG[vis.img]:null;
      if(!src)return null;
      return h('div',{className:'escape-node-visual'},
        h('img',{src:src,alt:'',className:'escape-node-visual-img'}),
        h('div',{className:'escape-node-visual-tag'},vis.tag||'● CAM FEED'));
    })(),
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
        (locale==='en'?'DECISION ':'결정 ') + decSec + 's'),
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
