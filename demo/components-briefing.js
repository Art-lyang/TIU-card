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
  1:{a:'img/act1.png', show:'img/act1.png'},
  2:{a:'img/act2a.png',b:'img/act2b.png', show:'img/act2b.png'},
  3:{a:'img/act3a.png',b:'img/act3b.png', show:'img/act3b.png'},
  4:{a:'img/act4a.png',b:'img/act4b.png', show:'img/act4a.png'}
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

// DAY 전환 컷 — 하루가 넘어갈 때 게임 화면 위에 1회 표시. 수명은 app.js가 관리(표시 전용), 탭=스킵.
// v5: 지도 줌 → '업무 종료' 일일 보고 패널로 교체. 헤더/야간 보고 2줄/지표/상태 → 'DAY N 개시' 스탬프.
//     야간 보고는 day 기반 결정적 로테이션(평시 풀 + 상태 라인 + Act3+ 불온 징후), 관측 채널 라벨 로테이션 유지.
// v6: 3단계 시퀀스 — ① '업무 종료' 단독 → ② 리포트 생성 로딩(메시지 로테이션+진행 바) → ③ 일일 리포트+개시 스탬프.
//     fx 축소 모드는 로딩 연출 없이 곧장 리포트. 총 홀드 ~5.2s(app.js), 탭 스킵 유지.
function DayCutOverlay(p){
  var st=p.stats||{},day=p.day||st.day||1,logs=p.logs||[],act=p.act||1;
  var isEn=(typeof window!=='undefined'&&window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en');
  var fxMode='full';try{fxMode=JSON.parse(localStorage.getItem('ts_fxMode'))||'full'}catch(e){}
  var reduced=fxMode==='reduced';
  var _stage=useState(reduced?2:0),stage=_stage[0],setStage=_stage[1];
  var _mi=useState(0),mi=_mi[0],setMi=_mi[1];
  var stageTimersRef=useRef([]);
  useEffect(function(){
    if(reduced)return;
    var t1=setTimeout(function(){setStage(1)},850);
    var t2=setTimeout(function(){setStage(2)},2500);
    stageTimersRef.current=[t1,t2];
    return function(){clearTimeout(t1);clearTimeout(t2)};
  },[]);
  // 탭 동작: 리포트 전(0·1단계)에는 리포트로 즉시 건너뛰기 — 일일 리포트는 항상 표시. 리포트에서 탭하면 닫기.
  var handleTap=function(){
    if(stage<2){
      stageTimersRef.current.forEach(function(t){clearTimeout(t)});
      setStage(2);
      return;
    }
    if(p.onSkip)p.onSkip();
  };
  useEffect(function(){
    if(stage!==1)return;
    var iv=setInterval(function(){setMi(function(v){return v+1})},520);
    return function(){clearInterval(iv)};
  },[stage]);
  var ev='idle';try{if(typeof computeMapEvent==='function')ev=computeMapEvent(st,logs)}catch(e){}
  var c=st.c||0;var panelCls=c<=25?' is-danger':c<=45?' is-warn':'';
  if(ev==='lockdown')panelCls=' is-lock';else if(ev==='attack')panelCls=' is-danger';else if(ev==='warn'&&!panelCls)panelCls=' is-warn';
  var resOn=logs.indexOf('LOG-RES-OPEN')>=0;
  var sync=(90+Math.round(c/12))+'.'+(day%10);
  var sub=ev==='lockdown'?(isEn?'LOCKDOWN ACTIVE':'봉쇄선 가동'):ev==='attack'?(isEn?'⚠ ABERRANT ACTIVITY':'⚠ 변이체 활동 감지'):ev==='warn'?(isEn?'ABERRANT ACTIVITY RISING':'변이체 활동 증가'):(isEn?'SECTOR SYNC STABLE':'구역 동기화 안정');
  var subCls=ev==='attack'?' is-hot':ev==='warn'?' is-warn':ev==='lockdown'?' is-lock':'';
  var sm=[[isEn?'CNT':'봉쇄',st.c],[isEn?'RES':'자원',st.r],[isEn?'TRS':'신뢰',st.t],[isEn?'EVL':'평가',st.o]];
  // ── 야간 보고 라인 (day 기반 결정적 로테이션 — 같은 날은 항상 같은 보고) ──
  var hsh=function(a,b){var x=(a*2654435761+b*97+13)>>>0;x=(x^(x>>>13))*1274126177>>>0;return (x^(x>>>16))>>>0};
  var pool=[
    ['해안선 순찰 — 이상 무','Coastline patrol — all clear'],
    ['국경선 침범 징후 없음','No border incursion detected'],
    ['북부 능선 초소 교대 완료','North ridge post rotation complete'],
    ['야간 열원 스캔 — 신규 반응 0건','Night thermal scan — 0 new signatures'],
    ['위성 링크 재동기화 완료','Satellite link resynchronized'],
    ['B1 발전기 출력 정상','B1 generator output nominal'],
    ['적설 관측 — 새벽 제설조 배치','Snowfall logged — dawn crew assigned'],
    ['연안 어선 식별 신호 3건 — 전 건 등록 선박','3 vessel pings — all registered']
  ];
  var late=[
    ['미상 열원 1건 — 기록 직후 소실','1 unknown heat source — lost after logging'],
    ['통신 잡음 구간 반복 — 원인 미상','Recurring comm static — cause unknown'],
    ['감시 §4 카메라 프레임 결손 12초','CCTV §4 frame gap: 12s'],
    ['외곽 초소 무전 응답 지연','Outer post radio response delayed']
  ];
  var lines=[];
  if(ev==='attack')lines.push(['봉쇄선 외곽 다중 열원 — 대응반 출동','Multiple heat sources at perimeter — team deployed']);
  else if(ev==='lockdown')lines.push(['봉쇄 프로토콜 유지 — 민간 통행 통제','Lockdown held — civilian transit restricted']);
  else if(ev==='warn')lines.push(['동부 감시망 이상 신호 — 추적 중','East grid anomaly signal — tracking']);
  if(lines.length<2&&typeof st.r==='number'&&st.r<=40)lines.push(['보급 재고 감소 — 배급 조정 검토','Supply reserves low — ration review']);
  if(lines.length<2&&typeof st.t==='number'&&st.t<=40)lines.push(['야간 점호 결원 발생 — 동요 징후','Absences at night muster — unrest signs']);
  if(lines.length<2&&resOn&&day%3===0)lines.push(['연구동 야간 가동 — 전력 우선 배분','Research wing night ops — power prioritized']);
  var tries=0;
  while(lines.length<2&&tries<12){
    var src=(act>=3&&hsh(day,tries)%4===0)?late:pool;
    var cand=src[hsh(day,tries*31+5)%src.length];
    var dup=false;for(var q=0;q<lines.length;q++)if(lines[q][0]===cand[0])dup=true;
    if(!dup)lines.push(cand);
    tries++;
  }
  var cams=[['위성 // 강원 동해안','SAT // GANGWON COAST'],['드론 R-2 // 봉쇄선 북측','DRONE R-2 // PERIMETER N'],['초소 CCTV // 해안 §7','POST CCTV // COAST §7'],['위성 // 태백 능선 감시대','SAT // TAEBAEK RIDGE']];
  var cam=day<=2?cams[0]:cams[hsh(day,3)%cams.length];
  // 리포트 생성 로딩 메시지 — day 기반으로 3개 선별, 0.52s 간격 로테이션
  var loadPool=[
    ['리포트 작성 중…','Compiling report…'],
    ['수치 계산 중…','Calculating metrics…'],
    ['데이터 모델 정리 중…','Organizing data model…'],
    ['야간 관측 로그 취합 중…','Collecting night logs…'],
    ['지표 편차 검증 중…','Verifying metric variance…'],
    ['보안 채널 암호화 중…','Encrypting secure channel…']
  ];
  var loadMsgs=[];
  for(var lm=0;lm<6&&loadMsgs.length<3;lm++){
    var lc=loadPool[hsh(day,lm*17+3)%loadPool.length];
    var ldup=false;for(var lq=0;lq<loadMsgs.length;lq++)if(loadMsgs[lq][0]===lc[0])ldup=true;
    if(!ldup)loadMsgs.push(lc);
  }
  var loadMsg=loadMsgs[mi%loadMsgs.length];
  var row=function(i,cls,children){return h('div',{className:'dc-row '+cls,style:{animationDelay:(0.2+i*0.18)+'s'}},children)};
  // ── 1단계: 업무 종료 + 2단계: 리포트 생성 로딩 ──
  if(stage<2)return h('div',{className:'daycut',onClick:handleTap},
    h('div',{className:'daycut-pre'},
      h('div',{className:'daycut-pre-t'},isEn?'END OF DUTY':'업무 종료'),
      h('div',{className:'daycut-pre-d'},'DAY '+(day-1)),
      stage===1?h('div',{className:'daycut-load'},
        h('div',{className:'daycut-load-bar'},h('i')),
        h('div',{key:mi,className:'daycut-load-msg'},(isEn?loadMsg[1]:loadMsg[0]))):null),
    h('div',{className:'daycut-skip'},isEn?'TAP TO VIEW REPORT':'탭하여 리포트 표시'));
  // ── 3단계: 일일 리포트 + DAY 개시 스탬프 ──
  return h('div',{className:'daycut daycut-s2',onClick:handleTap},
    h('div',{className:'daycut-panel'+panelCls},
      h('span',{className:'dc-br dc-br-tl'}),h('span',{className:'dc-br dc-br-tr'}),h('span',{className:'dc-br dc-br-bl'}),h('span',{className:'dc-br dc-br-br'}),
      h('div',{className:'daycut-panel-h'},
        h('span',null,'// ORACLE — '+(isEn?'DAILY REPORT':'일일 보고')),
        h('span',{className:'daycut-rec'},'● LIVE')),
      row(0,'',h('div',{className:'daycut-eod'},(isEn?'END OF DUTY — DAY ':'업무 종료 — DAY ')+(day-1))),
      row(1,'',h('div',{className:'daycut-meta'},'23:00 KST — 37.52N 129.11E — '+(isEn?'SYNC ':'동기화 ')+sync+'%')),
      h('div',{className:'daycut-div'}),
      row(2,'',h('div',{className:'daycut-sec'},(isEn?'NIGHT REPORT — ':'야간 보고 — ')+(isEn?cam[1]:cam[0]))),
      h('div',{className:'daycut-report'},lines.map(function(l,i){
        return h('div',{key:i,className:'daycut-rep',style:{animationDelay:(0.62+i*0.28)+'s'}},'▸ '+(isEn?l[1]:l[0]));
      })),
      h('div',{className:'daycut-div'}),
      row(5,'',h('div',{className:'daycut-stats'},sm.map(function(s2){var low=(s2[1]||0)<=25;return h('span',{key:s2[0],className:'daycut-st'+(low?' is-low':'')},s2[0]+' '+(s2[1]||0))}))),
      row(6,'',h('div',{className:'daycut-sub'+subCls},sub))),
    h('div',{className:'daycut-day'},'DAY '+day,h('span',{className:'daycut-day-suf'},isEn?'START':'개시')),
    h('div',{className:'daycut-skip'},isEn?'TAP TO SKIP':'탭하여 건너뛰기'));
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
  // A/B 교차 깜빡임 제거 → 단일 정지 이미지. 완전 흑백 변형(act2a/act3a)은 표시 안 함(컬러 변형만 show)
  var heroSrc=bi.show||bi.a||null;
  var heroImg=heroSrc?h('img',{src:heroSrc,alt:'Act '+act,className:'bf-hero-img'}):null;
  return h('div',{className:'screen bf-screen'},
    (typeof IMG!=='undefined'&&IMG.bg_base_coast)?h('div',{className:'bg-overlay','aria-hidden':true,style:{backgroundImage:'url('+IMG.bg_base_coast+')',opacity:0.14}}):null,
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
