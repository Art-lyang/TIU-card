// TERMINAL SESSION — components-escape.js
// CH-007 탈출 미니게임 iframe 연동 컴포넌트
// postMessage 스키마:
//   카드게임 → iframe: { type:'tiu-escape-init', gi, day, survivors, flags, ammo, hp }
//   iframe → 카드게임: { type:'tiu-escape-result', outcome, route, companionsFinal, casualtiesFinal, ... }
//   또는 WAVE모드: { type:'tiu-field-mission-result', victory, kills, wave, ... }

// 미니게임 배포 URL — GitHub Pages 기준 (로컬 테스트 시 오버라이드 가능)
var ESCAPE_GAME_URL = (function(){
  try{ var u=new URLSearchParams(window.location.search).get('escapeUrl');if(u)return u; }catch(e){}
  return 'https://art-lyang.github.io/tiu-field-mission/';
})();

function EscapeGameScreen(p){
  var stats=p.stats,gi=p.gi,logs=p.logs,trust=p.trust,onResult=p.onResult;
  var iframeRef=useRef(null);
  var _ready=useState(false),ready=_ready[0],setReady=_ready[1];
  var _err=useState(false),hasErr=_err[0],setErr=_err[1];
  var resultHandled=useRef(false);

  // shellTalkerKnown 판정
  var shellTalkerKnown=logs.indexOf('LOG-SHELLTALKER-CAP')>=0;
  // B3 루트 판정
  var isB3=logs.indexOf('LOG-B3-ROUTE')>=0;

  // iframe URL 조립
  var sectorParam='act4_escape';
  var iframeUrl=ESCAPE_GAME_URL
    +'?sector='+sectorParam
    +'&shellTalkerKnown='+(shellTalkerKnown?'1':'0');

  // 간부진 상태 조립 (trust 기반)
  var buildSurvivors=function(){
    return {
      haeun:  {alive:true, trust:trust.haeun||50, departed:logs.indexOf('LOG-050')>=0},
      doyun:  {alive:true, trust:trust.doyun||50, injured:false},
      sejin:  {alive:true, trust:trust.sejin||50},
      jaehyuk:{alive:true, trust:trust.jaehyuk||50}
    };
  };

  // iframe 로드 완료 시 초기 데이터 전송
  var sendInit=function(){
    if(!iframeRef.current)return;
    var payload={
      type:'tiu-escape-init',
      gi:gi,
      day:stats.day,
      survivors:buildSurvivors(),
      flags:{
        promMet:logs.indexOf('ONCE-CH-005-3')>=0,
        haeunStayed:logs.indexOf('LOG-052')>=0,
        shellTalkerKnown:shellTalkerKnown
      },
      ammo:12,
      hp:100
    };
    try{
      iframeRef.current.contentWindow.postMessage(payload,'*');
    }catch(e){console.warn('escape init postMessage fail',e)}
  };

  // postMessage 수신 핸들러
  useEffect(function(){
    var handler=function(e){
      var d=e.data;if(!d)return;
      // Act4 탈출 결과 수신
      if(d.type==='tiu-escape-result'&&!resultHandled.current){
        resultHandled.current=true;
        onResult({
          outcome:d.outcome,
          route:d.route,
          companionsFinal:d.companionsFinal||[],
          casualtiesFinal:d.casualtiesFinal||[],
          detection:d.detection||0,
          flags:d.flags||{},
          kills:d.kills||0,
          accuracy:d.accuracy||0,
          hp:d.hp||0
        });
      }
      // WAVE 모드 폴백 결과 (sector07 등으로 잘못 로드된 경우)
      if(d.type==='tiu-field-mission-result'&&!resultHandled.current){
        resultHandled.current=true;
        var outcome=d.victory?'success':'fail_normal';
        onResult({outcome:outcome,route:null,companionsFinal:[],
          casualtiesFinal:[],detection:0,flags:{},
          kills:d.kills||0,accuracy:d.accuracy||0,hp:d.hp||0});
      }
    };
    window.addEventListener('message',handler);
    return function(){window.removeEventListener('message',handler)};
  },[]);

  // iframe 로드 타임아웃 (10초)
  useEffect(function(){
    var t=setTimeout(function(){if(!ready)setErr(true)},10000);
    return function(){clearTimeout(t)};
  },[]);

  var onLoad=function(){
    setReady(true);
    // 약간 딜레이 후 init 전송 (iframe 내부 초기화 대기)
    setTimeout(sendInit,500);
  };

  // 폴백: 미니게임 로드 실패 시 기존 확률 시뮬로 대체
  var fallbackResolve=function(){
    if(resultHandled.current)return;
    resultHandled.current=true;
    if(typeof window.resolveEscape==='function'){
      var esc=window.resolveEscape(logs);
      onResult({outcome:esc.ending==='E'?'success':
        esc.ending==='E_bad'?'fail_unlucky':'fail_normal',
        route:isB3?'emergency':'general',
        companionsFinal:[],casualtiesFinal:[],
        detection:0,flags:{},kills:0,accuracy:0,hp:0,
        fallbackLog:esc.log,fallbackEnding:esc.ending});
    }
  };

  return h('div',{className:'escape-game-wrap'},
    // 로딩 오버레이
    !ready&&h('div',{className:'escape-loading'},
      h('div',{className:'escape-loading-text'},
        hasErr?'미니게임 로드 실패':'작전 준비 중...'),
      hasErr&&h('button',{className:'btn btn-amber',
        style:{marginTop:16,padding:'10px 24px'},
        onClick:fallbackResolve},'[ 확률 판정으로 진행 ]')),
    // iframe
    h('iframe',{
      ref:iframeRef,
      src:iframeUrl,
      className:'escape-iframe'+(ready?' loaded':''),
      onLoad:onLoad,
      allow:'autoplay',
      sandbox:'allow-scripts allow-same-origin'
    }));
}
