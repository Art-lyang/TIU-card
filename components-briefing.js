// TERMINAL SESSION — components-briefing.js
// Briefing 화면 컴포넌트
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};

var BRIEFING_TEXT = {
  act2_intro: '적응 기간 완료.\n기지 운영 정상화.\nAct 2 작전 단계로 진입합니다.',
  act3: {
    A: '초기 안정화 단계 완료.\n새로운 변수가 감지되었습니다.\n프로토콜을 재조정합니다.',
    B: '현장 경험 부족. 이변체 대응 데이터가 부족합니다.\n긴급 현장 적응이 필요합니다.',
    C: '미확인 세력 급증 감지.\n프로메테우스 정보 부재.\n정보전 역량 강화가 시급합니다.',
    D: '경고: 상황 악화.\n현장 데이터 부재 + 외부 위협 미파악.\n긴급 재편을 시행합니다.'
  },
  act4: {
    A: '프로메테우스 위협이 직접적 수준에 도달했습니다.\n결정적 조치가 필요합니다.',
    B: 'ORACLE 권고 미이행 누적.\n프로메테우스 대응 실패.\n재평가가 예정되어 있습니다.',
    C: '정보 부족 상태로 최종 국면 진입.\n서하은 아크 지연 가능성.',
    D: '지휘관 교체 검토 중.\n모든 지표에서 심각한 이탈이 감지되었습니다.',
    A4_COMPLY: '[ORACLE: COMPLIANCE OPTIMAL]\n모든 명령이 적절히 이행되었습니다.\n최종 안정화 단계로 진입합니다.',
    A4_GREY:   '[WARNING: AMBIGUOUS OPERATOR PATTERN]\n표준 이탈 지수 경계 범위.\n신뢰도 재산정이 예정되어 있습니다.',
    A4_RESIST: '[ALERT: SYSTEMIC DEVIATION DETECTED]\nORACLE 프로토콜 위반 패턴 다수 감지.\n최종 대응 단계 준비 중.',
    A4_OBSERVER:'[CRITICAL: UNCLASSIFIED INTERFERENCE]\n분류 불가 데이터 활동 감지.\n시스템 격리 프로토콜 대기 중.'
  }
};

var BRIEFING_IMG={
  1:{a:'img/act1.png'},
  2:{a:'img/act2a.png',b:'img/act2b.png'},
  3:{a:'img/act3a.png',b:'img/act3b.png'},
  4:{a:'img/act4a.png',b:'img/act4b.png'}
};

function BriefingImage(p){
  var bi=BRIEFING_IMG[p.act];if(!bi)return null;
  if(!bi.b)return h('div',{style:{width:'100%',maxWidth:440,marginBottom:12,flexShrink:0}},
    h('img',{src:bi.a,alt:'Act '+p.act,className:'briefing-img',style:{width:'100%',display:'block'}}));
  return h('div',{className:'briefing-flicker',style:{marginBottom:12,flexShrink:0}},
    h('div',{style:{position:'relative'}},
      h('img',{src:bi.a,alt:'Act '+p.act+' A',style:{width:'100%',display:'block',borderRadius:4,border:'1px solid rgba(var(--ui-rgb),.2)',boxShadow:'0 0 20px rgba(var(--ui-rgb),.1)',animation:'bfFlicker 3s ease-in-out infinite'}}),
      h('img',{src:bi.b,alt:'Act '+p.act+' B',style:{width:'100%',display:'block',borderRadius:4,border:'1px solid rgba(var(--ui-rgb),.2)',boxShadow:'0 0 20px rgba(var(--ui-rgb),.1)',position:'absolute',top:0,left:0,animation:'bfFlicker 3s ease-in-out infinite',animationDelay:'1.5s',opacity:0}})));
}

function BriefingScreen(p){
  var act=p.act,stats=p.stats,transRoute=p.transRoute,onEnter=p.onEnter;
  useEffect(function(){if(typeof SFX!=='undefined')SFX.play('radio');},[]);
  useEffect(function(){var onKey=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();onEnter()}};window.addEventListener('keydown',onKey);return function(){window.removeEventListener('keydown',onKey)}},[onEnter]);
  var statNames={
    c:tt('stats.c',null,'Containment'),
    r:tt('stats.r',null,'Resources'),
    t:tt('stats.t',null,'Trust'),
    o:tt('stats.o',null,'Evaluation')
  };
  var prioColor=act===3?'#ff4444':'rgba(var(--ui-rgb),.6)';
  var prioLabel=act===2?'INITIAL':act===3?'ELEVATED':'CR\u2588TICAL';
  var routeColor=transRoute==='A4_COMPLY'?'var(--ui)':transRoute==='A4_GREY'?'#f0a030':transRoute==='A4_RESIST'?'#ff6644':transRoute==='A4_OBSERVER'?'#ff4444':transRoute==='D'?'#ff4444':transRoute==='A'?'var(--ui)':'#f0a030';
  var borderColor=transRoute==='A4_RESIST'||transRoute==='A4_OBSERVER'||transRoute==='D'?'rgba(255,68,68,.4)':'rgba(var(--ui-rgb),.35)';
  var briefingKey=act===2?'act2_intro':(act===3?('act3_'+transRoute):('act4_'+transRoute));
  var briefingFallback={text:act===2?BRIEFING_TEXT.act2_intro:act===3?(BRIEFING_TEXT.act3[transRoute]||''):(BRIEFING_TEXT.act4[transRoute]||'')};
  var briefingView=(typeof tc==='function')?tc('briefings',briefingKey,briefingFallback):briefingFallback;
  var msg=briefingView.text||briefingFallback.text;
  var pad2=function(n){return ('0'+n).slice(-2)};
  var bars=act===2?2:act===3?3:4;
  var bi=BRIEFING_IMG[act]||{};
  var heroImg=bi.b
    ? h(React.Fragment,null,
        h('img',{src:bi.a,alt:'Act '+act,className:'bf-hero-img',style:{animation:'bfFlicker 3s ease-in-out infinite'}}),
        h('img',{src:bi.b,alt:'Act '+act,className:'bf-hero-img',style:{position:'absolute',top:0,left:0,animation:'bfFlicker 3s ease-in-out infinite',animationDelay:'1.5s',opacity:0}}))
    : (bi.a?h('img',{src:bi.a,alt:'Act '+act,className:'bf-hero-img'}):null);
  return h('div',{className:'screen bf-screen'},
    h('div',{className:'bf-wrap'},
      h('div',{className:'bf-head'},
        h('div',{className:'bf-head-side'},'ORACLE',h('br'),'// TRANSITION',h('br'),'ENCRYPTED'),
        h('div',{className:'bf-head-c'},
          h('div',{className:'bf-head-tag'},'DIRECTIVE'),
          h('div',{className:'bf-head-acts'},'ACT '+pad2(act-1),h('span',{className:'bf-head-arrow'},' ▸▸ '),h('b',null,'ACT '+pad2(act)))),
        h('div',{className:'bf-head-side bf-head-r'},
          h('div',{className:'bf-head-prio'},'PRIORITY',h('br'),h('b',null,prioLabel)),
          h('div',{className:'bf-head-bars'},[0,1,2,3].map(function(i){return h('i',{key:i,className:i<bars?'on':''})})))),
      h('div',{className:'bf-hero'},
        heroImg,
        h('div',{className:'bf-hero-grad'}),
        h('div',{className:'bf-hero-scan'}),
        h('div',{className:'bf-hero-num'},pad2(act)),
        h('div',{className:'bf-hero-rec'},h('span',{className:'bf-hero-recdot'}),'REC'),
        h('div',{className:'bf-hero-cap'},'ACT '+act+' // TRANSITION FEED'),
        h('span',{className:'bf-corner tl'}),h('span',{className:'bf-corner tr'}),h('span',{className:'bf-corner bl'}),h('span',{className:'bf-corner br'})),
      h('div',{className:'bf-panel'},
        h('div',{className:'bf-panel-h'},'// ORACLE DIRECTIVE',h('span',null,'PRIORITY '+prioLabel)),
        h('div',{className:'bf-analysis'},tt('briefing.analysis',null,'Analyzed recent operational data.')),
        h('div',{className:'bf-directive'},msg)),
      h('div',{className:'bf-panel'},
        h('div',{className:'bf-panel-h'},'// OPERATIONAL STATUS',h('span',null,'DAY '+(stats.day||'-'))),
        h('div',{className:'bf-gauges'},['c','r','t','o'].map(function(k){var v=stats[k];var low=v<=25;return h('div',{key:k,className:'bf-gauge'+(low?' low':'')},
          h('div',{className:'bf-gauge-top'},h('span',{className:'bf-gauge-lbl'},statNames[k]),h('span',{className:'bf-gauge-val'},v+'%')),
          h('div',{className:'bf-gauge-track'},h('div',{className:'bf-gauge-fill',style:{width:Math.max(0,Math.min(100,v))+'%'}})))}))),
      h('button',{className:'btn bf-enter',onClick:function(){if(typeof SFX!=='undefined')SFX.play('btn_on');onEnter();}},tt('briefing.enter',null,'[ ENTER ]'))));
}
