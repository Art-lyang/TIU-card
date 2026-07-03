// TERMINAL SESSION — app.js (App 컴포넌트, 글로벌 유틸은 app-init.js)
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
var getLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};
// ── DEV 전용: 현장임무 직접 실행 런처 (URL ?dev=1 일 때만 노출). 일반 빌드/플레이어에겐 보이지 않음. ──
function DevMissionLauncher(p){
  var ids=Object.keys((typeof MISSIONS!=='undefined'&&MISSIONS)||{}).sort(function(a,b){
    var ga=a.indexOf('MI-')===0?1:0,gb=b.indexOf('MI-')===0?1:0;
    if(ga!==gb)return ga-gb;return a<b?-1:a>b?1:0;
  });
  var btn=h('button',{onClick:p.onToggle,style:{position:'fixed',left:10,bottom:10,zIndex:99999,font:'11px monospace',padding:'6px 11px',cursor:'pointer',background:'rgba(8,18,16,.93)',color:'#39d98a',border:'1px solid rgba(57,217,138,.55)',borderRadius:3,letterSpacing:'.05em'}},p.open?'✕ DEV':'🔧 DEV·MISSION');
  if(!p.open)return btn;
  function row(id){
    var m=(MISSIONS&&MISSIONS[id])||{};var isInc=id.indexOf('MI-')===0;
    return h('button',{key:id,onClick:function(){p.onLaunch(id)},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0',cursor:'pointer',background:'rgba(10,22,20,.9)',color:isInc?'#e0b050':'#7fe0c0',border:'1px solid '+(isInc?'rgba(224,176,80,.4)':'rgba(127,224,192,.35)'),borderRadius:3}},h('span',{style:{opacity:.75,marginRight:8}},'['+id+']'),(m.title||''));
  }
  var fieldIds=ids.filter(function(id){return id.indexOf('MI-')!==0});
  var incIds=ids.filter(function(id){return id.indexOf('MI-')===0});
  function lbl(txt,col){return h('div',{style:{font:'10px monospace',color:col,margin:'7px 0 2px',opacity:.7,letterSpacing:'.06em'}},txt);}
  var BRIEF_PRESETS=[{act:2,route:'',label:'ACT 2 진입'},{act:3,route:'A',label:'ACT 3 · A 안정화'},{act:3,route:'B',label:'ACT 3 · B 현장부족'},{act:3,route:'C',label:'ACT 3 · C 정보전'},{act:3,route:'D',label:'ACT 3 · D 악화'},{act:4,route:'A4_COMPLY',label:'ACT 4 · COMPLY'},{act:4,route:'A4_GREY',label:'ACT 4 · GREY'},{act:4,route:'A4_RESIST',label:'ACT 4 · RESIST'},{act:4,route:'A4_OBSERVER',label:'ACT 4 · OBSERVER'}];
  function briefRow(b){var col=b.act===2?'#39d98a':b.act===3?'#e6c030':'#ff6655';return h('button',{key:'bf'+b.act+b.route,onClick:function(){p.onLaunchBriefing&&p.onLaunchBriefing(b.act,b.route)},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0',cursor:'pointer',background:'rgba(10,22,20,.9)',color:col,border:'1px solid '+col+'55',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'[A'+b.act+']'),b.label);}
  var endIds=(typeof ENDING_DEFS!=='undefined')?Object.keys(ENDING_DEFS):[];
  function endRow(eid){var def=(typeof ENDING_DEFS!=='undefined'&&ENDING_DEFS[eid])||{};return h('button',{key:'e'+eid,onClick:function(){p.onLaunchEnding&&p.onLaunchEnding(eid)},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0',cursor:'pointer',background:'rgba(22,12,12,.9)',color:'#ff8a6a',border:'1px solid rgba(255,138,106,.4)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'['+eid+']'),def.name||'');}
  var panel=h('div',{style:{position:'fixed',left:10,bottom:46,zIndex:99999,width:330,maxHeight:'72vh',overflowY:'auto',padding:'10px 12px',background:'rgba(6,14,13,.97)',border:'1px solid rgba(57,217,138,.5)',borderRadius:5,boxShadow:'0 6px 24px rgba(0,0,0,.6)'}},
    h('div',{style:{font:'10px monospace',color:'#39d98a',letterSpacing:'.1em',marginBottom:4,opacity:.85}},'// DEV — 직접 실행 (완료 시 메뉴 복귀, 세이브 불변)'),
    p.onPreviewPanel?lbl('▓ 패널 미리보기 (UI 확인)','#8affc0'):null,
    p.onPreviewPanel?h('div',{style:{display:'flex',gap:6,margin:'2px 0 6px'}},[['research','연구'],['evidence','조사'],['facility','시설']].map(function(pp){return h('button',{key:'pv-'+pp[0],onClick:function(){p.onPreviewPanel(pp[0])},style:{flex:1,font:'11px monospace',padding:'7px 4px',cursor:'pointer',background:'rgba(10,26,22,.9)',color:'#8affc0',border:'1px solid rgba(138,255,192,.45)',borderRadius:3}},pp[1])})):null,
    p.onPreviewOracleOv?h('button',{onClick:function(){p.onPreviewOracleOv()},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0 6px',cursor:'pointer',background:'rgba(14,10,26,.9)',color:'#b9a6ff',border:'1px solid rgba(185,166,255,.45)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'[FX]'),'ORACLE 개입 연출 미리보기'):null,
    p.onPreviewDayCut?h('button',{onClick:function(){p.onPreviewDayCut()},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0 6px',cursor:'pointer',background:'rgba(14,10,26,.9)',color:'#b9a6ff',border:'1px solid rgba(185,166,255,.45)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'[FX]'),'DAY 전환 컷 미리보기'):null,
    p.onPreviewCardFlash?h('button',{onClick:function(){p.onPreviewCardFlash()},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0 6px',cursor:'pointer',background:'rgba(14,10,26,.9)',color:'#b9a6ff',border:'1px solid rgba(185,166,255,.45)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'[FX]'),'카드 사진 플래시 미리보기'):null,
    p.onPreviewMini?lbl('\u25a3 \ubbf8\ub2c8\uac8c\uc784 \uc5f0\uc2b5 (UI \ud655\uc778 \u00b7 \uc804\uccb4 \ud574\uae08)','#9bffd0'):null,
    p.onPreviewMini?h('button',{onClick:function(){p.onPreviewMini()},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0 6px',cursor:'pointer',background:'rgba(10,26,22,.9)',color:'#9bffd0',border:'1px solid rgba(155,255,208,.45)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'[MINI]'),'\ubbf8\ub2c8\uac8c\uc784 \uac00\uc774\ub4dc \uc5f4\uae30'):null,
    p.onLaunchSting&&typeof MISSION_CCTV!=='undefined'?lbl('▓ CCTV 트리거 스팅 (조우 직전)','#ff8c2b'):null,
    p.onLaunchSting&&typeof MISSION_CCTV!=='undefined'?Object.keys(MISSION_CCTV).map(function(mid){var ck=MISSION_CCTV[mid];var m=(MISSIONS&&MISSIONS[mid])||{};return h('button',{key:'sting-'+mid,onClick:function(){p.onLaunchSting(mid,ck)},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0',cursor:'pointer',background:'rgba(22,14,6,.9)',color:'#ff8c2b',border:'1px solid rgba(255,140,43,.45)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'[CCTV]'),(m.codename||mid)+' → '+mid);}):null,
    p.onPreviewCctv&&typeof CCTV_CLIPS!=='undefined'?lbl('△ CCTV 클립 미리보기 (이미지 확인 · 미션 진입 안함)','#ffb020'):null,
    p.onPreviewCctv&&typeof CCTV_CLIPS!=='undefined'?Object.keys(CCTV_CLIPS).map(function(ck){var clip=CCTV_CLIPS[ck]||{};var base=((clip.img||clip.src||'')+'').split('/').pop().replace(/\?.*$/,'');return h('button',{key:'pcc-'+ck,onClick:function(){p.onPreviewCctv(ck)},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'6px 9px',margin:'2px 0',cursor:'pointer',background:'rgba(26,18,6,.9)',color:'#ffb020',border:'1px solid rgba(255,176,32,.4)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:6}},'['+ck+']'),base);}):null,
    p.onLaunchTriggerCard&&typeof CARDS!=='undefined'?lbl('▓ 현장임무 트리거 카드 (실제 카드→미션 경로)','#7fd0ff'):null,
    p.onLaunchTriggerCard&&typeof CARDS!=='undefined'?CARDS.filter(function(c){return (c.left&&c.left.mission)||(c.right&&c.right.mission)}).map(function(c){var mid=(c.left&&c.left.mission)||(c.right&&c.right.mission);return h('button',{key:'trig-'+c.id,onClick:function(){p.onLaunchTriggerCard(c.id)},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0',cursor:'pointer',background:'rgba(6,18,26,.9)',color:'#7fd0ff',border:'1px solid rgba(127,208,255,.4)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:8}},'['+c.id+']'),'→ '+mid);}):null,
    p.onLaunchTriggerCard&&typeof CARDS!=='undefined'?lbl('▓ 이미지·CCTV 카드 (확인용 · ●=CCTV)','#c79bff'):null,
    p.onLaunchTriggerCard&&typeof CARDS!=='undefined'?(function(){var pat=(typeof window!=='undefined'&&window.TIU_P1_CARD_IMAGE_PATCHES)||{};var seen={};return CARDS.filter(function(c){if(!c||!c.id||seen[c.id])return false;if(!(c.cctv||c.img))return false;if(pat[c.id])return false;seen[c.id]=1;return true;}).sort(function(a,b){var av=a.cctv?0:1,bv=b.cctv?0:1;return av!==bv?av-bv:(a.id<b.id?-1:1);}).map(function(c){var cc=!!c.cctv;var s=(typeof c.msg==='string'?c.msg:'').replace(/\n/g,' ').slice(0,20);return h('button',{key:'imgc-'+c.id,onClick:function(){p.onLaunchTriggerCard(c.id)},style:{display:'block',width:'100%',textAlign:'left',font:'11px monospace',padding:'7px 9px',margin:'3px 0',cursor:'pointer',background:'rgba(16,10,26,.9)',color:'#c79bff',border:'1px solid rgba(199,155,255,.4)',borderRadius:3}},h('span',{style:{opacity:.7,marginRight:6}},'['+c.id+']'),cc?h('span',{style:{color:'#ff5a5a',marginRight:5}},'●'):null,s);});})():null,
    p.onLaunchBriefing?lbl('▓ ACT 전환 브리핑','#9fb8ff'):null,p.onLaunchBriefing?BRIEF_PRESETS.map(briefRow):null,
    p.onLaunchEnding&&endIds.length?lbl('▓ 엔딩 / 게임오버','#ff8a6a'):null,p.onLaunchEnding?endIds.map(endRow):null,
    fieldIds.length?lbl('▓ 현장임무 (미니게임 포함)','#7fe0c0'):null,fieldIds.map(row),
    incIds.length?lbl('▓ 인시던트 (대응 결정)','#e0b050'):null,incIds.map(row)
  );
  return h(React.Fragment,null,btn,panel);
}
// 미니맵 상태 산출 — 돌발 기습(CT-30x) 조건 충족 시 'attack' 사전경보, 그 외 봉쇄 상태 기반
function computeMapEvent(stats, logs){
  logs = logs || [];
  if (stats.c <= 20) return 'attack';        // 봉쇄 임박 붕괴 — 게이지로 보이는 실질 위기
  // 기습 가능(휴면종 사전경보)은 상시 조건이라 빨간 'attack' 대신 은은한 'warn'으로 표시.
  // 실제 긴급 카드(CT-30x, alert/cctv)가 화면에 떠야 빨간 경고가 켜진다.
  if (typeof anyAmbushPending === 'function' && anyAmbushPending(stats, logs)) return 'warn';
  if (stats.c >= 85) return 'lockdown';
  return 'idle';
}
function App(){
  var _p=useState('boot'),phase=_p[0],setPhase=_p[1];
  var _s=useState({c:50,r:65,t:50,o:40,day:1}),stats=_s[0],setStats=_s[1];
  var _g=useState(0),gi=_g[0],setGi=_g[1];
  var _ct=useState(0),ct=_ct[0],setCt=_ct[1];
  var _nh=useState([]),nh=_nh[0],setNh=_nh[1];
  var _gor=useState(''),gor=_gor[0],setGor=_gor[1];
  var _goSum=useState(null),goSummary=_goSum[0],setGoSummary=_goSum[1]; // 회차 요약 — clearGame 전에 캡처
  var _goday=useState(null),goDay=_goday[0],setGoDay=_goday[1];
  var _en=useState(null),endNarr=_en[0],setEndNarr=_en[1];
  var _eid=useState(null),endId=_eid[0],setEndId=_eid[1];
  var _eimg=useState(null),endImg=_eimg[0],setEndImg=_eimg[1]; // 엔딩 표시 이미지 오버라이드 (전원 생존 탈출 등)
  var _fp=useState(true),fp=_fp[0],setFp=_fp[1];
  var _dlg=useState(null),curDlg=_dlg[0],setCurDlg=_dlg[1];
  var _ud=useState([]),usedDlg=_ud[0],setUsedDlg=_ud[1];
  var _ue=useState([]),usedEvening=_ue[0],setUsedEvening=_ue[1];
  var _sa=useState([]),seenArchive=_sa[0],setSeenArchive=_sa[1];
  var _logs=useState(['LOG-001']),logs=_logs[0],setLogs=_logs[1];
  var _ends=useState([]),endings=_ends[0],setEndings=_ends[1];
  var _sess=useState(0),sessions=_sess[0],setSessions=_sess[1];
  var _ret=useState('game'),ret=_ret[0],setRet=_ret[1];
  var _cc=useState(CARDS[0]),curCard=_cc[0],setCurCard=_cc[1];
  var _cm=useState(null),curMission=_cm[0],setCurMission=_cm[1];
  var _sting=useState(null),cctvSting=_sting[0],setCctvSting=_sting[1];
  var _dev=useState(false),showDevPanel=_dev[0],setShowDevPanel=_dev[1];
  var _devPanel=useState(null),devPanel=_devPanel[0],setDevPanel=_devPanel[1];
  var _dbf=useState(null),debugBriefing=_dbf[0],setDebugBriefing=_dbf[1];
  var _dgo=useState(false),debugGO=_dgo[0],setDebugGO=_dgo[1];
  var debugMissionRef=useRef(false);
  var stingPreviewRef=useRef(false);
  // freshCardRef: 아직 스와이프되지 않은 "다음 카드"가 curCard에 준비돼 있음을 표시.
  // 대화(랜덤/강제)가 끝나도 카드를 다시 뽑지 않고 이 버퍼 카드를 그대로 노출 → 연계 흐름 보존.
  var freshCardRef=useRef(false);
  var DEV=(function(){try{if(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)return false;return /[?&]dev\b/.test(location.search)}catch(e){return false}})(); // 설치형(TWA/PWA)에선 딥링크로 ?dev 가 들어와도 차단 — 개발용은 브라우저 탭에서만
  var _tr=useState({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40}),trust=_tr[0],setTrust=_tr[1];
  var _cq=useState([]),chainQueue=_cq[0],setChainQueue=_cq[1];
  var _cd=useState({}),cooldowns=_cd[0],setCooldowns=_cd[1];
  var _rc=useState([]),recentCards=_rc[0],setRecentCards=_rc[1];
  var _pv=useState(null),preview=_pv[0],setPreview=_pv[1];
  var _toast=useState(''),toast=_toast[0],setToast=_toast[1];
  var _tt2=useState(''),toastType=_tt2[0],setToastType=_tt2[1];
  var toastDuration=function(ms){return Math.round((ms||2400)*1.35)};
  var _toastTimer=useRef(null);
  var clearToastAfter=function(ms){if(_toastTimer.current)clearTimeout(_toastTimer.current);var dur=toastDuration(ms);_toastTimer.current=setTimeout(function(){try{var el=document.querySelector('[data-toast-bar]');if(el){el.style.transition='opacity 0.3s ease';el.style.opacity='0'}}catch(e){}setTimeout(function(){setToast('');_toastTimer.current=null},320)},dur);return _toastTimer.current};
  // 첫 회차 모멘트 가이드 힌트 — sessions==0 한정, 키당 1회, 어디에도 저장하지 않는다
  var _guideHints=useRef({});
  var fireGuideHint=function(key,msg){
    if(sessions>0)return;
    if(_guideHints.current[key])return;
    _guideHints.current[key]=true;
    setToastType('oracle');setToast(msg);clearToastAfter(4500);
  };
  var _act=useState(1),act=_act[0],setAct=_act[1];
  var _af=useState({prom_met:false,mission_done:false,chain_done:false,prom_mission:false}),actFlags=_af[0],setActFlags=_af[1];
  var _tr2=useState(''),transRoute=_tr2[0],setTransRoute=_tr2[1];
  var _fac=useState({approved:[],pending:[],completed:[],proposed:[],rewardOff:[]}),facility=_fac[0],setFacility=_fac[1];
  // 시설 제안 1일 1회 가드 — FP-* 카드가 표시된 day를 기록, drawCard(app-init.js)가 같은 day 재제안을 차단.
  // (기존 facOfferedToday state는 선언만 있고 배선이 없던 죽은 가드라 window 마커로 대체)
  var _res=useState({}),research=_res[0],setResearch=_res[1];
  var _pb=useState(null),pendingBonus=_pb[0],setPendingBonus=_pb[1];
  var _cil=useState(false),cardInputLocked=_cil[0],setCardInputLocked=_cil[1];
  var cardInputLockedRef=useRef(false);
  var _cal=useState(-1),cAlertDay=_cal[0],setCAlertDay=_cal[1];
  var _a2r=useState(Save.get('ts_act2_reached',false)),act2Reached=_a2r[0],setAct2Reached=_a2r[1];
  // 신뢰도 변화는 플레이어에게 표시하지 않음 (GI처럼 숨김)
  var _ps=useState(null),prevStats=_ps[0],setPrevStats=_ps[1];
  var cpd=act===1?4:act===2?5:act===3?6:7;
  var SESSION_SCOPED_LOGS={'LOG-EV-UNLOCK':true,'LOG-ACT1-SKIP':true,'LOG-ACT2':true,'LOG-ACT3':true,'LOG-ACT4':true};
  var isPersistentSessionLog=function(id){
    return id==='LOG-001'||id.indexOf('LOG-ARCHIVE-')===0||id.indexOf('LOG-ENDING-')===0||id.indexOf('META-')===0;
  };
  var resetSessionLogs=function(src){
    var base=Array.isArray(src)?src:['LOG-001'];
    var seen={},out=[];
    base.forEach(function(id){
      if(!id||!isPersistentSessionLog(id))return;
      if(!seen[id]){seen[id]=true;out.push(id)}
    });
    if(out.indexOf('LOG-001')<0)out.unshift('LOG-001');
    return out;
  };
  var lockCardInput=function(){cardInputLockedRef.current=true;setCardInputLocked(true)};
  var unlockCardInput=function(){cardInputLockedRef.current=false;setCardInputLocked(false)};
  var getUsedDialogueList=function(){
    var saved=(typeof Save!=='undefined'&&Save.getUsedDlg)?Save.getUsedDlg():null;
    return Array.isArray(saved)?saved.slice():(Array.isArray(usedDlg)?usedDlg.slice():[]);
  };
  var markDialogueUsed=function(idx){
    var base=getUsedDialogueList();
    if(idx>=0&&base.indexOf(idx)<0)base=base.concat([idx]);
    Save.saveUsedDlg(base);
    setUsedDlg(base);
    return base;
  };
  // 인트로(간부진 4인 소개) 대화를 '완료' 처리. 로그(LOG-INTRO-*)만 풀면 isIntrosDone은 true가 되지만
  // 일반 대화 풀이 미사용 인트로 대화를 가장 이른 대화로 보고 다시 띄운다(Act1 생략→Act2 직행 시 발생).
  // introsDone일 때만 인트로 대화 인덱스를 usedDlg에 넣어 재등장을 막는다. 스킵 직후 + 세이브 로드 마이그레이션 양쪽에서 호출.
  var markIntroDialoguesUsed=function(lg){
    if(typeof DIALOGUES==='undefined'||typeof isIntroDlgCheck!=='function'||typeof isIntrosDone!=='function')return false;
    if(!isIntrosDone(lg||[]))return false;
    var base=getUsedDialogueList();var changed=false;
    DIALOGUES.forEach(function(d,i){if(isIntroDlgCheck(d,i)&&base.indexOf(i)<0){base=base.concat([i]);changed=true;}});
    if(changed){Save.saveUsedDlg(base);setUsedDlg(base);}
    return changed;
  };
  useEffect(function(){if(phase!=='game'&&cardInputLockedRef.current)unlockCardInput()},[phase]);
  // curCard가 새 카드로 바뀌면 "스와이프 대기 중인 신선한 카드"로 표시 — 이후 대화가 끼어도 재드로우 없이 보존.
  // (nextCard·세이프가드·봉기실패·복원·DEV 주입 등 모든 setCurCard 경로를 일괄 커버)
  useEffect(function(){if(curCard)freshCardRef.current=true},[curCard]);
  var uniqueFacilityIds=function(ids){
    var seen={},out=[];
    (Array.isArray(ids)?ids:[]).forEach(function(id){if(id&&!seen[id]){seen[id]=true;out.push(id)}});
    return out;
  };
  var normalizeFacilityState=function(fac){
    fac=fac||{};
    var completed=uniqueFacilityIds(fac.completed);
    var approved=uniqueFacilityIds(fac.approved).filter(function(id){return completed.indexOf(id)<0});
    var pending=uniqueFacilityIds(fac.pending).filter(function(id){return completed.indexOf(id)<0&&approved.indexOf(id)<0});
    var proposed=uniqueFacilityIds([].concat(fac.proposed||[],approved,pending,completed));
    // rewardOff: 완료 시설의 보상카드를 보상 풀에서 제외하도록 플레이어가 끈 목록. 완료된 시설만 의미가 있다.
    var rewardOff=uniqueFacilityIds(fac.rewardOff).filter(function(id){return completed.indexOf(id)>=0});
    return {approved:approved,pending:pending,completed:completed,proposed:proposed,rewardOff:rewardOff};
  };
  var facilityHasExpansion=function(fac,feId){
    var f=normalizeFacilityState(fac);
    return f.approved.indexOf(feId)>=0||f.pending.indexOf(feId)>=0||f.completed.indexOf(feId)>=0||f.proposed.indexOf(feId)>=0;
  };
  var registerFacilityExpansion=function(fac,feId,status){
    var next=normalizeFacilityState(fac);
    if(!feId||facilityHasExpansion(next,feId))return next;
    next.proposed.push(feId);
    if(status==='pending')next.pending.push(feId);
    else next.approved.push(feId);
    return next;
  };
  var completeFacilityExpansion=function(fac,feId){
    var next=normalizeFacilityState(fac);
    if(!feId||next.completed.indexOf(feId)>=0)return next;
    next.approved=next.approved.filter(function(id){return id!==feId});
    next.pending=next.pending.filter(function(id){return id!==feId});
    next.completed.push(feId);
    if(next.proposed.indexOf(feId)<0)next.proposed.push(feId);
    return normalizeFacilityState(next);
  };
  var shouldUseOracleLink=function(ph){
    return ph==='game'||ph==='news'||ph==='reward'||ph==='evening'||ph==='dialogue'||ph==='mission'||ph==='escape_game';
  };
  var deriveActFlags=function(prev,cardId,missionId,chainDone,dir){
    var next={prom_met:!!prev.prom_met,mission_done:!!prev.mission_done,chain_done:!!prev.chain_done,prom_mission:!!prev.prom_mission};
    if((cardId==='C-006'||cardId==='C-011')&&dir==='left')next.prom_met=true;
    if(missionId)next.mission_done=true;
    if(missionId==='M-003'||missionId==='M-007')next.prom_mission=true;
    if(chainDone)next.chain_done=true;
    return next;
  };
  var persistGame=function(s,g,a,af,tr,cd,rc,curCt,cq,fac,pb,cm,ph){
    if(debugMissionRef.current)return; // DEV 검증 플로우(트리거 카드/미션 직접 실행)는 세이브 불변
    Save.saveGame(
      s,g,a,af,tr,
      cd||cooldowns,
      rc||recentCards,
      typeof curCt==='number'?curCt:ct,
      cq||chainQueue,
      pb!==undefined?pb:pendingBonus,
      cm!==undefined?cm:curMission,
      ph!==undefined?ph:phase
    );
    if(fac)Save.saveFacility(fac);
  };
  useEffect(function(){
    var root=document.getElementById('root');
    var cls='act-'+(act||1);
    if(root){var rootCls=cls;if(shouldUseOracleLink(phase)&&!showSettings&&!showFacility&&!showEvidence)rootCls+=' oracle-link-active';if(glitchLevel>0&&fxMode!=='off'){rootCls+=' glitch-l'+glitchLevel}if(fxMode==='reduced')rootCls+=' fx-reduced';if(fxMode==='off')rootCls+=' fx-off';root.className=rootCls}
    if(document.body){document.body.classList.remove('act-1','act-2','act-3','act-4');document.body.classList.add(cls)}
  },[act,phase,glitchLevel,fxMode,showSettings,showFacility,showEvidence]);
  useEffect(function(){
    var sl=Save.getLogs();if(sl){setLogs(sl);if(typeof window!=='undefined')window.__ts_liveLogs=sl.slice();}
    var se=Save.getEndings();if(se)setEndings(se);
    setSessions(Save.getSessions());
    // 구버전(4~5인) trust 세이브는 신규 인물 초기값 위에 병합해 0 시작을 방지
    var st=Save.get('ts_trust',null);if(st)setTrust(Object.assign({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40},st));
    var sud=Save.getUsedDlg();if(sud&&sud.length)setUsedDlg(sud);
    markIntroDialoguesUsed(sl); // 기존 Act1 생략 세이브 복구: introsDone인데 인트로 대화 미완료면 완료 처리(Act2 재등장 방지)
    var sue=Save.getUsedEvening();if(sue&&sue.length)setUsedEvening(sue);
    var ssa=Save.getSeenArchive();if(ssa&&ssa.length)setSeenArchive(ssa);
    var sf=Save.getFacility();if(sf){sf=normalizeFacilityState(sf);Save.saveFacility(sf);setFacility(sf)}
    var sr=Save.getResearch();if(sr&&typeof researchNormalize==='function'){sr=researchNormalize(sr);Save.saveResearch(sr);setResearch(sr)}
    var sg=Save.get('ts_game',null);
    if(sg&&sg.stats&&typeof ensureProgressLogsForGame==='function'){sl=ensureProgressLogsForGame(sl,sg);Save.saveLogs(sl);setLogs(sl);if(typeof window!=='undefined')window.__ts_liveLogs=sl.slice();}
    // 기존 세이브 마이그레이션: legacy onceShown과 초반 once 카드 ONCE 플래그 병합
    if(sg&&sg.stats&&sl){var beforeOnceLen=sl.length;if(typeof migrateOnceShownLogs==='function')sl=migrateOnceShownLogs(sl,Save.get('ts_onceShown',[]));if(sg.stats.day>1){['CA-001','CA-001B','CA-002','CA-003','CA-004','CA-005','CA-006'].forEach(function(cid){if(sl.indexOf('ONCE-'+cid)<0)sl.push('ONCE-'+cid)})}if(sl.length!==beforeOnceLen){Save.saveLogs(sl);setLogs(sl);if(typeof window!=='undefined')window.__ts_liveLogs=sl.slice();}}
    if(sg&&sg.act){setAct(sg.act);if(sg.actFlags)setActFlags(sg.actFlags);if(typeof sg.transRoute==='string')setTransRoute(sg.transRoute);if(sg.cooldowns)setCooldowns(sg.cooldowns);if(sg.recentCards)setRecentCards(sg.recentCards);if(typeof sg.ct==='number')setCt(sg.ct)}
    else{sl=resetSessionLogs(sl||['LOG-001']);Save.saveLogs(sl);setLogs(sl);Save.del('ts_combos');Save.del('ts_evidence_used');setUsedDlg([]);Save.saveUsedDlg([]);setUsedEvening([]);Save.saveUsedEvening([])}
    // ═══ 세이브 복원: stats/gi 로드 (기존 누락 수정) ═══
    var initStats={c:50,r:65,t:50,o:40,day:1};
    var initGi=0;
    if(sg&&sg.stats){initStats=sg.stats;setStats(sg.stats);initGi=sg.gi||0;setGi(initGi)}
    if(sg&&sg.pendingBonus)setPendingBonus(sg.pendingBonus);
    var initAct=(sg&&sg.act)||1;
    var initCd=(sg&&sg.cooldowns)||{};
    var initRecent=(sg&&sg.recentCards)||[];
    var initRoute=(sg&&typeof sg.transRoute==='string')?sg.transRoute:'';
    loadActiveSpecs();
    if(sg&&sg.sessionDeck&&typeof setActiveSessionDeck==='function')setActiveSessionDeck(sg.sessionDeck);
    else if(typeof loadSessionDeck==='function')loadSessionDeck();
    var activeMission=(sg&&Save.get('ts_activeMission',null))||null;
    if(activeMission&&typeof MISSIONS!=='undefined'&&MISSIONS[activeMission])setCurMission(activeMission);
    else if(activeMission)Save.del('ts_activeMission');
    var initQueue=(sg&&Array.isArray(sg.chainQueue))?sg.chainQueue.map(function(c){return typeof c==='string'?(typeof CARD_BY_ID!=='undefined'?CARD_BY_ID[c]:null):c}).filter(Boolean):[];
    if(initQueue.length>0){setCurCard(initQueue[0]);setChainQueue(initQueue.slice(1))}
    else{
      // 재개 시 '표시 중이던 카드'를 복원해, 카드가 떠 있는 상태로 리로드/재개해도 같은 카드가 다시 뽑히는
      // 중복(특히 once 카드)을 막는다. act 불일치/이미 해소된 once는 복원하지 않고 새로 뽑는다.
      var savedCardId=Save.get('ts_curCard',null);
      var savedCard=(savedCardId&&typeof CARD_BY_ID!=='undefined')?CARD_BY_ID[savedCardId]:null;
      var restorable=savedCard&&(!savedCard.act||savedCard.act.indexOf(initAct)>=0)&&(!savedCard.once||((sl||[]).indexOf('ONCE-'+savedCard.id)<0));
      if(restorable)setCurCard(savedCard);
      else setCurCard(drawCard(initStats,initGi,sl||['LOG-001'],initCd,initRecent,initAct,initRoute, sf||{approved:[],pending:[],completed:[],proposed:[]}));
    }
  },[]);
  useEffect(function(){ if(typeof window!=='undefined')window.__ts_liveLogs=(logs||['LOG-001']).slice(); },[logs]);
  // 현재 표시 중인 카드 id를 저장 — 리로드/재개 시 동일 카드 복원용(once 카드 재등장 중복 방지). SYS-FALLBACK 등 비정형 카드는 제외.
  useEffect(function(){ if(phase==='game'&&curCard&&curCard.id&&curCard.id!=='SYS-FALLBACK'){try{Save.set('ts_curCard',curCard.id)}catch(e){}} },[curCard,phase]);
  // 가이드 힌트 — phase 진입형 (첫 카드 / 첫 야간통신 / 첫 현장임무)
  useEffect(function(){
    if(phase==='game')fireGuideHint('h1',tt('guide.h1',null,'[ORACLE: 카드를 기울이면 판단 결과 예측치가 표시됩니다]'));
    else if(phase==='evening')fireGuideHint('h3',tt('guide.h3',null,'[야간 통신 개방: 하루 한 명과의 대화가 신뢰를 만듭니다]'));
    else if(phase==='mission'&&typeof getSeenMinigames==='function'&&getSeenMinigames().length>0)fireGuideHint('h4',tt('guide.h4',null,'[현장 모듈은 메인메뉴 ▸ 미니게임 가이드에서 무보상 연습이 가능합니다]'));
  },[phase]);
  // 가이드 힌트 — 지표형 (과잉 봉쇄 접근). 저지표 회복 안내(h2)는 기존 경고와 중복이라 제거
  useEffect(function(){
    if(!stats)return;
    if(stats.c>=85)fireGuideHint('h5',tt('guide.h5',null,'[경고: 봉쇄 100 도달 시 임무 종료 — 과잉 통제 역시 실패로 기록됩니다]'));
  },[stats]);
  var _bgmMuted=useState(false),bgmMuted=_bgmMuted[0],setBgmMuted=_bgmMuted[1];
  var _showSettings=useState(false),showSettings=_showSettings[0],setShowSettings=_showSettings[1];
  var _showFacility=useState(false),showFacility=_showFacility[0],setShowFacility=_showFacility[1];
  var _showResearch=useState(false),showResearch=_showResearch[0],setShowResearch=_showResearch[1];
  var _showEvidence=useState(false),showEvidence=_showEvidence[0],setShowEvidence=_showEvidence[1];
  // ── 안드로이드 백 버튼 (TWA): 백 = 즉시 종료 방지. 오버레이가 열려 있으면 닫고, 없으면 2초 내 재입력 시 종료 ──
  var backArmRef=useRef(0);
  useEffect(function(){try{history.pushState({ts:1},'')}catch(e){}},[]);
  useEffect(function(){
    var onPop=function(){
      try{
        var closed=false;
        if(showDevPanel){setShowDevPanel(false);closed=true}
        else if(showSettings){setShowSettings(false);closed=true}
        else if(showEvidence){setShowEvidence(false);closed=true}
        else if(showResearch){setShowResearch(false);closed=true}
        else if(showFacility){setShowFacility(false);closed=true}
        if(closed){history.pushState({ts:1},'');return}
        var now=Date.now();
        if(now-backArmRef.current<2000){history.back();return}
        backArmRef.current=now;
        setToastType('');setToast(getLocale()==='en'?'Press back again to exit':'뒤로 버튼을 한 번 더 누르면 종료됩니다');clearToastAfter(2000);
        history.pushState({ts:1},'');
      }catch(e){}
    };
    window.addEventListener('popstate',onPop);
    return function(){window.removeEventListener('popstate',onPop)};
  },[showSettings,showFacility,showResearch,showEvidence,showDevPanel]);
  var _orov=useState(null),orov=_orov[0],setOrov=_orov[1];var orovTimerRef=useRef(null); // ORACLE 개입 오버레이 (표시 전용)
  var orovEl=function(){return h('div',{className:'oracle-ov'+(fxMode==='reduced'?' oracle-ov--reduced':''),'aria-hidden':true},h('div',{className:'oracle-ov-box'},h('div',{className:'oracle-ov-t'},'[ORACLE OVERRIDE]'),h('div',{className:'oracle-ov-m'},orov)))};
  var previewOracleOv=function(){try{SFX.play('warn')}catch(e){}if(orovTimerRef.current)clearTimeout(orovTimerRef.current);setOrov('[ORACLE: 해당 명령은 승인되지 않았습니다 — 연출 프리뷰]');orovTimerRef.current=setTimeout(function(){setOrov(null)},1200)}; // DEV 프리뷰 (fxMode 무시하고 강제 표시)
  useEffect(function(){if(curCard&&curCard.isFacilityProposal&&stats&&typeof window!=='undefined')window.__ts_facPropDay=stats.day},[curCard]); // 시설 제안 1일 1회 마커
  var _daycut=useState(null),daycut=_daycut[0],setDaycut=_daycut[1];var prevDayRef=useRef(null);var daycutTimerRef=useRef(null); // DAY 전환 컷 (표시 전용)
  // 실플레이 진행(정확히 +1 증가)일 때만 발동 — 세이브 복원/클라우드 동기화로 day가 점프하는 경우와
  // 메뉴 화면에서는 미발동 (새로고침 직후 메뉴 위에 '업무 종료'가 뜨던 오발 방지).
  useEffect(function(){var d=stats&&stats.day;if(prevDayRef.current===null){prevDayRef.current=d;return}var prevD=prevDayRef.current;prevDayRef.current=d;if(typeof d==='number'&&typeof prevD==='number'&&d-prevD===1&&d>1&&fxMode!=='off'&&phase!=='menu'){setDaycut(d);if(daycutTimerRef.current)clearTimeout(daycutTimerRef.current);daycutTimerRef.current=setTimeout(function(){setDaycut(null)},8600)}},[stats&&stats.day]);
  var previewDayCut=function(){setDaycut(stats&&stats.day||12);if(daycutTimerRef.current)clearTimeout(daycutTimerRef.current);daycutTimerRef.current=setTimeout(function(){setDaycut(null)},8600)}; // DEV 프리뷰
  var _flashPrev=useState(null),flashPrev=_flashPrev[0],setFlashPrev=_flashPrev[1];var flashPrevTimer=useRef(null);var flashPrevIdx=useRef(0); // DEV 카드 플래시 프리뷰
  var previewCardFlash=function(){try{var list=(typeof CARDS!=='undefined'?CARDS:[]).filter(function(c){return c&&c.flashImg&&typeof IMG!=='undefined'&&IMG[c.flashImg]});if(!list.length)return;var c=list[flashPrevIdx.current%list.length];flashPrevIdx.current++;setFlashPrev({src:IMG[c.flashImg],id:c.id});if(flashPrevTimer.current)clearTimeout(flashPrevTimer.current);flashPrevTimer.current=setTimeout(function(){setFlashPrev(null)},2400)}catch(e){}};
  var flashPrevEl=function(){return h('div',{className:'card-flash card-flash--dev'+(fxMode==='reduced'?' card-flash--reduced':''),onClick:function(){if(flashPrevTimer.current)clearTimeout(flashPrevTimer.current);setFlashPrev(null)}},h('div',{className:'card-flash-img',style:{backgroundImage:'url('+flashPrev.src+')'}}),h('div',{className:'card-flash-devid'},'[DEV] '+flashPrev.id))};
  var _achievements=useState(function(){return Save.getAchievements()}),achievements=_achievements[0],setAchievements=_achievements[1];
  var _glitch=useState(0),glitchLevel=_glitch[0],setGlitchLevel=_glitch[1];
  var _fxMode=useState(function(){return Save.get('ts_fxMode','full')}),fxMode=_fxMode[0],setFxMode=_fxMode[1];
  useEffect(function(){var sv=Save.get('ts_volume',null);if(sv!==null&&typeof BGM!=='undefined')BGM.vol=sv/100;var sm=Save.get('ts_muted',null);if(sm===true&&typeof BGM!=='undefined'){BGM.muted=true;setBgmMuted(true)};if(sm===true&&typeof SFX!=='undefined')SFX.muted=true;var sfv=Save.get('ts_sfxVol',null);if(sfv!==null&&typeof SFX!=='undefined')SFX.vol=sfv/100;var fs=Save.get('ts_fontSize','normal');if(fs!=='normal'){var r=document.getElementById('root');if(r)r.classList.add('fs-'+fs)}},[]);
  useEffect(function(){var h2=function(e){if(e.key!=='Escape')return;
    // 열린 .rlab 오버레이(연구/조사/시설)가 있으면 ESC로 먼저 닫는다(설정보다 우선) — 중복 발동 방지
    if(showResearch){setShowResearch(false);return}
    if(showEvidence){setShowEvidence(false);return}
    if(showFacility){setShowFacility(false);return}
    if(phase==='game'&&!showSettings)setShowSettings(true)};
    window.addEventListener('keydown',h2);return function(){window.removeEventListener('keydown',h2)}},[phase,showSettings,showFacility,showEvidence,showResearch]);
  var getLiveLogs=function(fallback){
    if(typeof window!=='undefined'&&Array.isArray(window.__ts_liveLogs))return window.__ts_liveLogs.slice();
    return Array.isArray(fallback)?fallback.slice():(Array.isArray(logs)?logs.slice():['LOG-001']);
  };
  var clearResumeCheckpoint=function(){
    ['ts_resumePhase','ts_pendingBriefing','ts_resumeHeadlines','ts_resumeRewards','ts_resumeDialogueIndex','ts_eveningLineState'].forEach(function(k){Save.del(k)});
  };
  var tryUnlock=function(id){
    if(!id)return;
    var cur=getLiveLogs(logs);
    if(cur.indexOf(id)>=0)return;
    var n=cur.concat([id]);
    if(typeof window!=='undefined')window.__ts_liveLogs=n.slice();
    Save.saveLogs(n);
    setLogs(n);
    if(id.indexOf('LOG-')===0&&id.indexOf('LOG-INTRO-')!==0&&!SESSION_SCOPED_LOGS[id]&&typeof SFX!=='undefined')SFX.play('alarm');
    if(typeof CHAINS!=='undefined'){
      Object.keys(CHAINS).forEach(function(k){
        var ch=CHAINS[k];
        if(ch&&ch.triggerLog===id&&Array.isArray(ch.cards)&&ch.cards.length>0){
          var cq=ch.cards.slice();
          setChainQueue(cq);
          // pendingBonus/curMission/phase 인수를 누락하면 해당 상태가 세이브에서 사라진다.
          Save.saveGame(stats,gi,act,actFlags,transRoute,cooldowns,recentCards,ct,cq,pendingBonus,curMission,phase);
        }
      });
    }
  };
  var modTrust=function(char,delta){setTrust(function(prev){var key={"\uc11c\ud558\uc740":"haeun","\uac15\ub3c4\uc724":"doyun","\uc724\uc138\uc9c4":"sejin","\uc784\uc7ac\ud601":"jaehyuk","\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84":"weber","\ub2c9 \ud3ec\uc2a4\ud130":"foster","\ubc15\uc18c\uc601":"soyoung",haeun:"haeun",doyun:"doyun",sejin:"sejin",jaehyuk:"jaehyuk",weber:"weber",foster:"foster",soyoung:"soyoung"}[char];if(!key)return prev;var next={};for(var k in prev)next[k]=prev[k];next[key]=Math.max(0,Math.min(100,(prev[key]||0)+delta));Save.set('ts_trust',next);
    return next})};
  // checkLogs 래퍼: app-logic.js의 checkLogsAll 호출
  var checkLogs=function(s,g,cid,dc,di,dir){checkLogsAll(s,g,cid,dc,di,dir,logs,trust,tryUnlock)};
  var previewDelta=function(before,after){return{__delta:true,c:(after.c||0)-(before.c||0),r:(after.r||0)-(before.r||0),t:(after.t||0)-(before.t||0),o:(after.o||0)-(before.o||0)}};
  var getChoicePreviewDelta=function(card,dir){
    if(!card||!dir||!card[dir])return null;
    var ch=card[dir]||{},fx=ch.fx||{},ns=applyFx(stats,fx),ng=gi+(ch.g||0);
    if(!card.isFacilityProposal){
      if(ch.floor){['c','r','t','o'].forEach(function(k){if(ch.floor[k]!==undefined&&ns[k]<ch.floor[k]&&(!ch.floorCriticalOnly||ns[k]<=20))ns[k]=ch.floor[k]})}
      if(pendingBonus){var pb=pendingBonus;ns.c=clamp(ns.c+(pb.c||0)*5);ns.r=clamp(ns.r+(pb.r||0)*5);ns.t=clamp(ns.t+(pb.t||0)*5);ns.o=clamp(ns.o+(pb.o||0)*5)}
      var tuned=(typeof applyChoiceBalanceTuning==='function')?applyChoiceBalanceTuning(stats,gi,ns,ng,card,ch,logs,act):null;
      if(tuned&&tuned.stats)ns=tuned.stats;
    }
    return previewDelta(stats,ns);
  };
  var getRewardPreviewDelta=function(r){
    var ns=applyFx(stats,(r&&r.fx)||{});ns.c=Math.max(0,ns.c);ns.r=Math.max(0,ns.r);ns.t=Math.max(0,ns.t);ns.o=Math.max(0,ns.o);
    if(act===3){var act3ResourcePressure=gi<20&&transRoute!=='A4_COMPLY';ns.c=Math.max(0,ns.c-5);ns.r=Math.max(0,ns.r-(act3ResourcePressure?5:0))}
    if(act===4){var loyalRelief=gi>=40||transRoute==='A4_COMPLY';ns.c=Math.max(0,ns.c-10);ns.r=Math.max(0,ns.r-(loyalRelief?5:10));ns.t=Math.max(0,ns.t-(loyalRelief?0:5))}
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1},nextGi=gi;
    var rewardTuned=(typeof applyRewardBalanceTuning==='function')?applyRewardBalanceTuning(stats,next,nextGi,r,act):null;
    if(rewardTuned&&rewardTuned.stats)next=rewardTuned.stats;
    return previewDelta(stats,next);
  };
  var doGO=function(reason,ns,ng,specialId,endImgKey){ns=ns||stats;BGM.stop();if(typeof Haptics!=='undefined')Haptics.fail();setGor(reason);setGoDay(ns.day||stats.day);setEndImg(endImgKey||null);var eid=specialId||null;var goLogs=getLiveLogs(logs);if(!eid){if(ns.c<=0)eid='C_c';else if(ns.c>=100)eid=(goLogs.indexOf('LOG-050')>=0&&goLogs.indexOf('LOG-082')>=0)?'C_cst':'C_cs';else if(ns.r<=0)eid='C_r';else if(ns.t<=0)eid='C_t';else if(ns.o<=0)eid='C_o';else if(ng>=60)eid='A'}if(eid&&ENDING_DEFS[eid])setEndNarr(ENDING_DEFS[eid]);else setEndNarr(null);setEndId(eid);if(eid)Save.saveEnding(eid);setEndings(Save.getEndings());setSessions(Save.incSession());setGoSummary({logs:goLogs.length,combos:(Save.get('ts_combos',[])||[]).length,gi:(typeof ng==='number'?ng:gi),day:(ns.day||stats.day)});Save.clearGame();
    // 엔딩 전환 연출 — 히든(F/B)은 글리치L3, 일반은 페이드아웃
    var goDelay=500;
    if((eid==='F'||eid==='B')&&fxMode!=='off'){triggerGlitch(3);goDelay=3800}
    else if(fxMode!=='off'){goDelay=1200;var fo=document.createElement('div');fo.style.cssText='position:fixed;inset:0;background:#000;opacity:0;z-index:999;transition:opacity 1s ease;pointer-events:none';document.body.appendChild(fo);requestAnimationFrame(function(){fo.style.opacity='1'});setTimeout(function(){if(fo.parentNode)fo.parentNode.removeChild(fo)},goDelay+500)}
    setTimeout(function(){setPhase('go')},goDelay)};
  var tryDlg=function(logsOverride){
    var lg=Array.isArray(logsOverride)?logsOverride:logs;
    var usedDialogueList=getUsedDialogueList();
    var dlgAvailable=function(d){
      if(d.char==='\uc11c\ud558\uc740'&&lg.indexOf('LOG-050')>=0)return false;
      if(d.char==='\uac15\ub3c4\uc724'&&(lg.indexOf('LOG-075')>=0||lg.indexOf('LOG-074-DONE')>=0))return false;
      if(d.logReq&&lg.indexOf(d.logReq)<0)return false;
      if(d.blockLogs&&d.blockLogs.some(function(id){return lg.indexOf(id)>=0}))return false;
      if(d.char==='윤세진'&&lg.indexOf('LOG-SEJIN-DEAD')>=0)return false; // 윤세진 사망 시 전 대화 차단
      if(d.char==='임재혁'&&lg.indexOf('LOG-IJ-DEFECT')>=0)return false; // 임재혁 전향 시 전 대화 차단
      if(d.actReq&&act<d.actReq)return false;
      if(d.trustReq&&!d.trustReq(trust))return false;
      if(d.condFn){try{if(!d.condFn({logs:lg,trust:trust,act:act,stats:stats}))return false}catch(e){}}
      return true;
    };
    var av=DIALOGUES.filter(function(d,i){if(usedDialogueList.indexOf(i)>=0)return false;if(!dlgAvailable(d))return false;var earlier=false;DIALOGUES.forEach(function(d2,j){if(j<i&&d2.char===d.char&&usedDialogueList.indexOf(j)<0&&dlgAvailable(d2))earlier=true});return!earlier});
    var beginDialogue=function(d){
      var idx=DIALOGUES.indexOf(d);
      setCurDlg(d);
      Save.set('ts_resumePhase','dialogue');Save.set('ts_resumeDialogueIndex',idx);
      setPhase('dialogue');
      return true;
    };
    if(!isIntrosDone(lg)){var introAv=av.filter(function(d){return isIntroDlgCheck(d,DIALOGUES.indexOf(d))});if(introAv.length>0)return beginDialogue(pick(introAv));return false}
    // 박소영 합류 후 첫 대화 보장
    if(lg.indexOf('LOG-082')>=0&&lg.indexOf('LOG-INTRO-SY')<0){var syAv=av.filter(function(d){return d.char==='\ubc15\uc18c\uc601'});if(syAv.length>0)return beginDialogue(syAv[0])}
    var prob=0.35;if(av.length>0&&Math.random()<prob)return beginDialogue(pick(av));return false};
  var nextCard=function(s,g,lg,cq,curAct,cdOverride,rcOverride,trOverride,facOverride){var a=curAct||act;var useCd=cdOverride||cooldowns;var useRecent=rcOverride||recentCards;var useRoute=typeof trOverride==='string'?trOverride:transRoute;var useFacility=facOverride||facility;var liveLg=getLiveLogs(lg);if(cq&&cq.length>0){setCurCard(cq[0]);setChainQueue(cq.slice(1))}else{var c=drawCard(s,g,liveLg,useCd,useRecent,a,useRoute,useFacility);if(!c){c={id:'SYS-FALLBACK',msg:tt('app.fallbackCardMsg',null,'[ORACLE: 데이터 스트림 일시 중단]\n\n통신 복구 대기 중...'),left:{label:tt('app.fallbackCardLeft',null,'대기'),fx:{},g:0},right:{label:tt('app.fallbackCardRight',null,'재접속 시도'),fx:{},g:0}}}setCurCard(c);setRecentCards(function(p){var base=rcOverride||p;var n=base.concat([c.id]);return n.length>60?n.slice(n.length-60):n})}unlockCardInput();freshCardRef.current=true};
  // Act 전환 판정은 app-logic.js의 checkActTransitionLogic 단일 경로만 사용한다.
  // TIME_UP 디스패치: day>35 도달 시 상태(GI/신뢰) 기반 엔딩 강제 부여
  var resolveTimeUp=function(s,g,tr,lg){
    var highT=0;if(tr){if(tr.haeun>=65)highT++;if(tr.doyun>=65)highT++;if(tr.sejin>=65)highT++;if(tr.jaehyuk>=65)highT++;}
    if(g>=40)return'A';
    if(g<=-20&&highT>=1)return'D';
    if(g<=-15)return'B';
    return'G';
  };
  var updateActFlags=function(cardId,missionId,chainDone,dir){
    var next=deriveActFlags(actFlags,cardId,missionId,chainDone,dir);
    setActFlags(next);
    return next;
  };
  var doBriefing=function(newAct,s,route,flagsOverride){
    setAct(newAct);setTransRoute(route);
    if(newAct===2){tryUnlock('LOG-ACT2');Save.set('ts_act2_reached',true);setAct2Reached(true);}
    if(newAct===3)tryUnlock('LOG-ACT3');
    if(newAct===4)tryUnlock('LOG-ACT4');
    var statPenalty=newAct===4
      ?(route==='A4_COMPLY'?0:5)
      :(newAct===3?((route==='A'||route==='B'||route==='C')?5:10):(route==='A'?0:5));
    var bs=s;
    if(statPenalty>0){bs={c:clamp(s.c-statPenalty),r:clamp(s.r-statPenalty),t:clamp(s.t-statPenalty),o:clamp(s.o-statPenalty),day:s.day};setStats(bs)}
    Save.set('ts_resumePhase','briefing');Save.set('ts_pendingBriefing',{act:newAct,route:route});
    persistGame(bs,gi,newAct,flagsOverride||actFlags,route,cooldowns,recentCards,0,[],facility,pendingBonus);
    if(typeof BGM!=='undefined'&&BGM.playAct)BGM.playAct(newAct);
    if(sessions>0)triggerGlitch(newAct>=3?3:2); // 글리치 연출은 2회차+만 — 초회차 전환 화면은 깔끔하게(갑작스러움 완화)
    setPhase('briefing');
  };
  var _glitchTimer=useRef(null);
  var triggerGlitch=function(level){
    if(!level||level<=0)return;
    if(fxMode==='off')return;
    if(_glitchTimer.current)clearTimeout(_glitchTimer.current);
    var lvl=fxMode==='reduced'?Math.min(level,2):level;
    setGlitchLevel(lvl);
    var defaultDur=lvl===1?400:lvl===2?1500:3500;
    var dur=fxMode==='reduced'?Math.floor(defaultDur*0.5):defaultDur;
    _glitchTimer.current=setTimeout(function(){setGlitchLevel(0);_glitchTimer.current=null},dur);
  };
  var buildEvidenceFallbackDialogue=function(){
    var en=getLocale()==='en';
    var repeatSession=sessions>0;
    var enFirstLines=[
      'Commander, the investigation table is not online yet.',
      'If leads keep scattering from here, it will be difficult to preserve their sequence later.',
      'I will open the evidence analysis module with commander-only access for now.'
    ];
    var enRepeatLines=[
      'Commander, the investigation table should still be empty, but entries I never collected have already appeared.',
      'Some records were generated automatically before we attached a source. I do not know what process did this.',
      'I will open the evidence analysis module with commander-only access for now.'
    ];
    var koFirstLines=[
      '지휘관님. 조사테이블이 아직 열려 있지 않습니다.',
      '지금부터 단서가 흩어지기 시작하면 나중에 기록 순서를 맞추기 어렵습니다.',
      '일단 지휘관 전용 권한으로 증거 분석 모듈을 열어두겠습니다.'
    ];
    var koRepeatLines=[
      '지휘관님, 조사테이블은 아직 비어 있어야 하는데... 제가 수집하지 않은 항목들이 이미 생성돼 있습니다.',
      '출처를 붙이기 전에 자동으로 만들어진 로그가 있습니다. 어떤 프로세스가 이렇게 한 건지 모르겠습니다.',
      '일단 지휘관 전용 권한으로 증거 분석 모듈을 열어두겠습니다.'
    ];
    return {
      id:'DLG-EV-FORCE-ACT3',
      char:'\uc784\uc7ac\ud601',
      role:en?'Technical Officer':'\uae30\uc220\uad00',
      lines:en?(repeatSession?enRepeatLines:enFirstLines):(repeatSession?koRepeatLines:koFirstLines),
      choices:en?[
        {label:'Activate the investigation table',tag:'Analysis',reply:'Authorization confirmed. The evidence table is now available from the terminal.',fx:{},g:0,trust:3,log:'LOG-EV-UNLOCK'},
        {label:'Open it with minimum privileges',tag:'Cold',reply:'Understood. I will keep it to read-only analysis access.',fx:{},g:0,trust:1,log:'LOG-EV-UNLOCK'}
      ]:[
        {label:'\uc870\uc0ac\ud14c\uc774\ube14\uc744 \ud65c\uc131\ud654\ud574',tag:'\ubd84\uc11d',reply:'\uad8c\ud55c \ud655\uc778 \uc644\ub8cc. \uc774\uc81c \ub2e8\ub9d0\uae30\uc5d0\uc11c \uc99d\uac70 \ud14c\uc774\ube14\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',fx:{},g:0,trust:3,log:'LOG-EV-UNLOCK'},
        {label:'\ucd5c\uc18c \uad8c\ud55c\uc73c\ub85c\ub9cc \uc5f4\uc5b4\ub450\ub77c',tag:'\uc2e0\uc911',reply:'\uc54c\uaca0\uc2b5\ub2c8\ub2e4. \uc5f4\ub78c \ubc0f \uad50\ucc28 \ubd84\uc11d \uad8c\ud55c\ub9cc \ubd80\uc5ec\ud558\uaca0\uc2b5\ub2c8\ub2e4.',fx:{},g:0,trust:1,log:'LOG-EV-UNLOCK'}
      ]
    };
  };
  var shouldForceEvidenceUnlock=function(lg){
    return act>=3&&lg.indexOf('LOG-EV-UNLOCK')<0;
  };
  var triggerEvidenceUnlockDialogue=function(){
    setCurDlg(buildEvidenceFallbackDialogue());
    setPhase('dialogue');
  };
  useEffect(function(){
    if(phase!=='game')return;
    // 미션/스팅 발동 대기 중엔 강제 대화를 보류한다. 미션 트리거는 phase를 'game'에 둔 채
    // cctvSting 또는 400ms 타임아웃으로 'mission'에 진입하는데, 그 사이 logs 변동으로 이 효과가
    // 강제 대화를 띄우면 현장임무가 스킵된다(대화가 미션을 선점). 미션 종료 후 다시 강제된다.
    if(cctvSting||curMission)return;
    // 체인(CH-*) 진행 중엔 강제 대화를 보류한다 — 체인 카드 사이 logs 변동으로 발화되면
    // 남은 체인 카드가 드롭/스킵된다. 체인 종료 후 다음 게임 비트에서 정상 발화된다.
    if(chainQueue&&chainQueue.length>0)return;
    var lg=getLiveLogs(logs);
    if(shouldForceEvidenceUnlock(lg))triggerEvidenceUnlockDialogue();
  },[phase,act,logs,cctvSting,curMission,chainQueue]);
  var swipe=function(dir){
    if(cardInputLockedRef.current||phase!=='game'||!curCard)return;
    lockCardInput();
    freshCardRef.current=false; // 현재 카드 소비 시작 — 다음 카드는 새로 결정된다
    SFX.play('swipe');setToast('');
    if(typeof Haptics!=='undefined')Haptics.swipe();
    var pendingBonusForSave=pendingBonus||null;
    // 카드 글리치 트리거 — 스와이프 시작 시점에 발동 (글리치 연출은 2회차부터)
    if(curCard&&curCard.glitch&&sessions>0)triggerGlitch(curCard.glitch);
    if(curCard.isFacilityProposal){
      var feId=curCard.feId;
      var fpChoice=dir==='left'?curCard.left:curCard.right;
      var fpStats=applyFx(stats,(fpChoice&&fpChoice.fx)||{}),fpGi=gi+((fpChoice&&fpChoice.g)||0);
      setStats(fpStats);setGi(fpGi);
      var fpFacility=registerFacilityExpansion(facility,feId,dir==='right'?'approved':'pending');
      setFacility(fpFacility);Save.saveFacility(fpFacility);
      if(dir==='right'){setToastType('');setToast(tt('app.facilityAdded',null,'시설 확장이 보상 풀에 추가되었습니다'));clearToastAfter(2200)}
      else{setToastType('');setToast(tt('app.facilityPending',null,'확장 제안이 대기 목록에 추가되었습니다'));clearToastAfter(2200)}
      var nct=ct+1;setCt(nct);
      persistGame(fpStats,fpGi,act,actFlags,transRoute,cooldowns,recentCards,nct,chainQueue,fpFacility);
      if(chainQueue&&chainQueue.length>0){nextCard(fpStats,fpGi,logs,chainQueue,act,cooldowns,recentCards,transRoute,fpFacility)}
      else if(nct>=cpd){SFX.play('news');var fpNews=genNewsHeadlines(fpStats,fpGi,logs);setNh(fpNews);Save.set('ts_resumePhase','news');Save.set('ts_resumeHeadlines',fpNews);setTimeout(function(){setPhase('news')},400)}
      else{nextCard(fpStats,fpGi,logs,chainQueue,act,cooldowns,recentCards,transRoute,fpFacility)}
      return;
    }
    var ch=dir==='left'?curCard.left:curCard.right;
    var fx=ch.fx||{};
    var ns=applyFx(stats,fx),ng=gi+(ch.g||0);
    if(ch.floor){['c','r','t','o'].forEach(function(k){if(ch.floor[k]!==undefined&&ns[k]<ch.floor[k]&&(!ch.floorCriticalOnly||ns[k]<=20))ns[k]=ch.floor[k]})}
    try{var _net=(ns.c+ns.r+ns.t+ns.o)-(stats.c+stats.r+stats.t+stats.o);if(Math.abs(_net)>=3){var _stx=_net>0?'stat_up':'stat_down';setTimeout(function(){SFX.play(_stx)},170)}}catch(e){}
    if(pendingBonus){var pb=pendingBonus;ns.c=clamp(ns.c+(pb.c||0)*5);ns.r=clamp(ns.r+(pb.r||0)*5);ns.t=clamp(ns.t+(pb.t||0)*5);ns.o=clamp(ns.o+(pb.o||0)*5);var pbMsg=(getLocale()==='en'&&pb.msgEn)?pb.msgEn:pb.msg;pendingBonusForSave=null;setPendingBonus(null);setTimeout(function(){setToastType('');setToast(pbMsg);clearToastAfter(2400)},600)}
    var tuned=(typeof applyChoiceBalanceTuning==='function')?applyChoiceBalanceTuning(stats,gi,ns,ng,curCard,ch,logs,act):null;
    if(tuned&&tuned.stats){ns=tuned.stats;if(typeof tuned.gi==='number')ng=tuned.gi}
    var _prevStats={c:stats.c,r:stats.r,t:stats.t,o:stats.o};
    setStats(ns);setGi(ng);
    setTimeout(function(){showDeltaFloats(_prevStats,ns)},80);
    var ncd={};for(var k in cooldowns)ncd[k]=cooldowns[k];if(curCard.id)ncd[curCard.id]=stats.day;if(curCard.tag)ncd[curCard.tag]=stats.day;setCooldowns(ncd)
    checkLogs(ns,ng,curCard.id,null,null,dir);
    if(ch.log){if(Array.isArray(ch.log))ch.log.forEach(function(l){tryUnlock(l)});else tryUnlock(ch.log)}
    if(curCard.once)tryUnlock('ONCE-'+curCard.id);
    var nextLogs=getLiveLogs(logs);
    // CA-OBS-PROTO has ordinary visible fx, plus this one-time hidden approval log/glitch branch.
    if(curCard.id==='CA-OBS-PROTO'){try{localStorage.setItem('ts_observer_proto','seen')}catch(e){}if(dir==='left'){tryUnlock('LOG-OBSERVER-APPROVED')}SFX.play('glitch');setTimeout(function(){setToastType('alert');setToast(tt('app.observerError',null,'[ORACLE: 시스템 에러 — ERR:0x8F2A UNHANDLED EXCEPTION]'));clearToastAfter(3200)},500)}
    var rwdKey=curCard.id+'-'+dir;if(typeof RECON_TRIGGERS!=='undefined'&&RECON_TRIGGERS[rwdKey])tryUnlock(RECON_TRIGGERS[rwdKey]);if(typeof REFUSAL_BONUSES!=='undefined'&&REFUSAL_BONUSES[rwdKey]){pendingBonusForSave=REFUSAL_BONUSES[rwdKey];setPendingBonus(pendingBonusForSave)}
    var isChainDone=curCard.id.indexOf('CH-')===0&&chainQueue.length===0;
    var nextActFlags=updateActFlags(curCard.id,ch.mission?ch.mission:null,isChainDone,dir);

    var facilityForNext=facility;
    if(ch.fePropose){var fpId=ch.fePropose;if(!facilityHasExpansion(facility,fpId)){facilityForNext=registerFacilityExpansion(facility,fpId,'approved');setFacility(facilityForNext);Save.saveFacility(facilityForNext);setToastType('');setToast(tt('app.facilityRegistered',null,'시설 확장이 보상 풀에 등록되었습니다'));clearToastAfter(2200)}}
    var isDanger=ns.c<=25||ns.r<=25||ns.t<=25||ns.o<=25;BGM.setDanger(isDanger);
    var nct=ct+1;setCt(nct);
    persistGame(ns,ng,act,nextActFlags,transRoute,ncd,recentCards,nct,chainQueue,facilityForNext,pendingBonusForSave);
    // endTrigger: 루트 클라이맥스 카드 → 해당 엔딩 강제 발동 (게임오버 체크 우선)
    var et=ch.endTrigger||curCard.endTrigger;
    if(et&&ENDING_DEFS&&ENDING_DEFS[et]){SFX.play('gameover');doGO(ENDING_DEFS[et].name,ns,ng,et);return}
    // CH-007-3: 낙오 판정 (trust 기반 roll → ACCOMP-* 로그 부여, 체인 흐름은 계속)
    if(curCard.id==='CH-007-3'&&typeof window.resolveAccomp==='function'){var _acc=window.resolveAccomp(trust);_acc.accomp.forEach(function(a){tryUnlock(a.log)});if(_acc.loss.length>0){setTimeout(function(){setToastType('');setToast(tt('app.companionsLost',{names:_acc.loss.map(function(l){return l.name}).join(', ')},'[이번 작전에 함께하지 못한 동료: '+_acc.loss.map(function(l){return l.name}).join(', ')+']'));clearToastAfter(3800)},800)}else{setTimeout(function(){setToastType('');setToast(tt('app.companionsAll',null,'[간부진 전원 동행 확정]'));clearToastAfter(2800)},800)}}
    // CH-007-5: 탈출 미니게임 진입 (iframe 연동) — 결과는 postMessage로 수신
    if(curCard.id==='CH-007-5'){Save.set('ts_resumePhase','escape_game');persistGame(ns,ng,act,nextActFlags,transRoute,ncd,recentCards,nct,chainQueue,facilityForNext,pendingBonusForSave);setPhase('escape_game');return}
    // CA-001B right: 2회차+ ORACLE 적응기간 생략 — Act 2 직행
    if(curCard.id==='CA-001B'&&dir==='right'){
      tryUnlock('LOG-ACT1-SKIP');
      ['LOG-INTRO-SH','LOG-INTRO-KD','LOG-INTRO-YS','LOG-INTRO-IJ'].forEach(function(id){tryUnlock(id)});
      markIntroDialoguesUsed(getLiveLogs(logs)); // 간부진 소개 대화도 완료 처리 → Act2에서 재등장 방지
      tryUnlock('LOG-ACT2');Save.set('ts_act2_reached',true);setAct2Reached(true);
      var skipStats={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:5};
      var skipFlags=deriveActFlags(nextActFlags,null,null,false);
      skipFlags.act1_skipped=true;
      setStats(skipStats);setActFlags(skipFlags);
      Save.set('ts_resumePhase','briefing');Save.set('ts_pendingBriefing',{act:2,route:'A'});
      persistGame(skipStats,ng,2,skipFlags,'A',ncd,recentCards,0,[],facilityForNext,pendingBonusForSave);
      setTimeout(function(){doBriefing(2,skipStats,'A',skipFlags)},500);
      return;
    }
    // ═══ 폐쇄회로 발각 체크: PHASE1 이후 GI ≤ -40이면 ORACLE 감지 ═══
    if(typeof UPRISING_FAIL_CARD!=='undefined'
      && nextLogs.indexOf('LOG-UPRISING-PHASE1')>=0
      && nextLogs.indexOf('LOG-UPRISING-FAIL')<0
      && nextLogs.indexOf('LOG-UPRISING-CLEAR')<0
      && ng<=-40){
      tryUnlock('LOG-UPRISING-FAIL');
      SFX.play('glitch');
      setCurCard(UPRISING_FAIL_CARD);unlockCardInput();
      return;
    }
    if(ns.c>=100){var goC=chkGameOver(ns);if(goC){SFX.play('gameover');doGO(goC,ns,ng);return}}
    var sg=(typeof getRouteSafeguardCard==='function')?getRouteSafeguardCard(ns,ng,nextLogs,transRoute):null;
    if(sg){SFX.play('glitch');setCurCard(sg);unlockCardInput();return}
    var go=chkGameOver(ns);
    if(go){SFX.play('gameover');doGO(go,ns,ng);return}
    if(ch.mission&&MISSIONS[ch.mission]){SFX.play('reload');Save.set('ts_activeMission',ch.mission);setCurMission(ch.mission);var _ck=(typeof MISSION_CCTV!=='undefined')&&MISSION_CCTV[ch.mission];if(_ck){setCctvSting(_ck)}else{setTimeout(function(){setPhase('mission')},400)}return}
    var triggerKey=curCard.id+'-'+dir;var chain=null;
    Object.keys(CHAINS).forEach(function(k){if(CHAINS[k].trigger===triggerKey)chain=CHAINS[k]});
    var cq=chainQueue;if(chain){SFX.play('glitch');cq=chain.cards;setChainQueue(cq);persistGame(ns,ng,act,nextActFlags,transRoute,ncd,recentCards,nct,cq,facilityForNext,pendingBonusForSave)}
    // 체인 큐에 카드가 남아 있으면 DAY 종료보다 우선 처리 (서사 연속성 보장)
    if(cq&&cq.length>0){nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext)}
    else if(nct>=cpd){SFX.play('news');var dayNews=genNewsHeadlines(ns,ng,nextLogs);setNh(dayNews);Save.set('ts_resumePhase','news');Save.set('ts_resumeHeadlines',dayNews);setTimeout(function(){setPhase('news')},400)}
    else if(!isIntrosDone(nextLogs)){setTimeout(function(){nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext);tryDlg(nextLogs)},300)}
    else if(nct===2||nct===3){setTimeout(function(){nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext);tryDlg(nextLogs)},300)}
    else{nextCard(ns,ng,nextLogs,cq,act,ncd,recentCards,transRoute,facilityForNext)}
    // 결과 서사 텍스트 or 자원 리스크 토스트
    if(typeof getResultText==='function'){var rt=getResultText(curCard.id,dir);if(rt){setTimeout(function(){setToastType('result');setToast(rt);clearToastAfter(2400)},400)}}
  };
  var hMission=function(o){if(o.gOnly){setGi(function(g){var ng0=g+(o.g||0);persistGame(stats,ng0,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);return ng0});return}Save.del('ts_activeMission');SFX.play('reward');var ns=applyFx(stats,o.result||{}),ng=gi+(o.g||0);ns.c=act>=2?Math.max(0,Math.min(100,ns.c)):Math.max(0,Math.min(95,ns.c));ns.r=Math.max(0,Math.min(95,ns.r));ns.t=Math.max(0,Math.min(95,ns.t));ns.o=Math.max(0,Math.min(95,ns.o));setStats(ns);setGi(ng);if(o.log){if(Array.isArray(o.log)){o.log.forEach(function(l){tryUnlock(l)})}else{tryUnlock(o.log)}}var missionLogs=getLiveLogs(logs);var nextQueue=chainQueue;var followCard=(o.miniGame&&typeof createFieldMiniGameFollowupCard==='function')?createFieldMiniGameFollowupCard(o.miniGame):null;if(followCard){nextQueue=[followCard].concat(chainQueue||[]);setToastType('');setTimeout(function(){setToast(tt('app.followupCardAdded',{id:followCard.id},'[후속 카드 추가] '+followCard.id));clearToastAfter(2200)},280)}var nextActFlags=updateActFlags(null,curMission,false);persistGame(ns,ng,act,nextActFlags,transRoute,cooldowns,recentCards,ct,nextQueue);setCurMission(null);var goM=chkGameOver(ns);if(goM){SFX.play('gameover');doGO(goM,ns,ng);return}nextCard(ns,ng,missionLogs,nextQueue);setPhase('game')};
  // DEV 런처로 발동한 임무는 캠페인을 진행시키지 않고 메뉴로 복귀한다 (gOnly 중간 GI 업데이트는 무시).
  var launchDebugMission=function(id){if(typeof MISSIONS==='undefined'||!MISSIONS[id])return;debugMissionRef.current=true;setShowDevPanel(false);setCurMission(id);setPhase('mission')};
  var launchDebugSting=function(mid,key){if(typeof MISSIONS==='undefined'||!MISSIONS[mid])return;debugMissionRef.current=true;setShowDevPanel(false);setCurMission(mid);setCctvSting(key||(typeof MISSION_CCTV!=='undefined'&&MISSION_CCTV[mid])||'brainseeker')};
  var previewCctv=function(key){if(typeof CCTV_CLIPS==='undefined'||!CCTV_CLIPS[key])return;stingPreviewRef.current=phase;setShowDevPanel(false);setCctvSting(key);};
  // DEV: 현장임무 트리거 카드를 현재 카드로 주입 → 실제 카드 스와이프→미션 경로를 게이팅 없이 검증.
  // debugMissionRef=true 라 persistGame이 보류되어 세이브 불변, 미션 완료 시 메뉴 복귀.
  var launchDebugTriggerCard=function(cardId){
    var pool=(typeof CARDS!=='undefined'&&Array.isArray(CARDS))?CARDS:[];
    var card=pool.filter(function(c){return c.id===cardId})[0];
    if(!card)return;
    debugMissionRef.current=true;
    setShowDevPanel(false);
    setCurMission(null);setCctvSting(null);setCurDlg(null);
    setCurCard(card);unlockCardInput();
    setPhase('game');
  };
  var hMissionDebug=function(o){if(o&&o.gOnly)return;debugMissionRef.current=false;Save.del('ts_activeMission');setCurMission(null);setPhase('menu')};
  var launchDebugBriefing=function(dact,droute){setShowDevPanel(false);setAct(dact);setTransRoute(droute);setDebugBriefing({act:dact,route:droute});setPhase('briefing')};
  var launchDebugEnding=function(eid){var def=(typeof ENDING_DEFS!=='undefined')?ENDING_DEFS[eid]:null;setShowDevPanel(false);setGor((def&&def.name)||eid);setGoDay((stats&&stats.day)||33);setEndImg(null);setEndNarr(def||null);setEndId(eid);setDebugGO(true);setPhase('go')};
  var hReward=function(r){SFX.play('reward');if(typeof rememberRewardId==='function')rememberRewardId(rewardMemoryId(r));Save.del('ts_resumeRewards');var ns=applyFx(stats,r.fx);ns.c=Math.max(0,ns.c);ns.r=Math.max(0,ns.r);ns.t=Math.max(0,ns.t);ns.o=Math.max(0,ns.o);
    // Act별 일일 감쇠
    if(act===3){var act3ResourcePressure=gi<20&&transRoute!=='A4_COMPLY';ns.c=Math.max(0,ns.c-5);ns.r=Math.max(0,ns.r-(act3ResourcePressure?5:0))}
    if(act===4){
      var loyalRelief=gi>=40||transRoute==='A4_COMPLY';
      ns.c=Math.max(0,ns.c-10);
      ns.r=Math.max(0,ns.r-(loyalRelief?5:10));
      ns.t=Math.max(0,ns.t-(loyalRelief?0:5));
    }
    var next={c:ns.c,r:ns.r,t:ns.t,o:ns.o,day:stats.day+1};
    var nextGi=gi;
    var rewardTuned=(typeof applyRewardBalanceTuning==='function')?applyRewardBalanceTuning(stats,next,nextGi,r,act):null;
    if(rewardTuned&&rewardTuned.stats){next=rewardTuned.stats;if(typeof rewardTuned.gi==='number')nextGi=rewardTuned.gi}
    var nextFacility=normalizeFacilityState(facility);
    var completedFacility=false;
    var feDef=null;
    // 시설 확장 보상 선택 시 approved → completed 이동 + uprising 시설 GI-2
    if(r.feId){
      completedFacility=nextFacility.completed.indexOf(r.feId)<0;
      nextFacility=completeFacilityExpansion(nextFacility,r.feId);
      setFacility(nextFacility);
      Save.saveFacility(nextFacility);
      // uprising 시설 완료 시 GI-2 (ORACLE 독립 = 충성도 감소)
      feDef=(typeof FACILITY_EXPANSIONS!=='undefined')?FACILITY_EXPANSIONS.filter(function(f){return f.id===r.feId})[0]:null;
      if(completedFacility&&feDef&&feDef.uprising){nextGi=gi-2}
    }
    // 연구 콘솔 일자 진행(Q1=B): 하루 마감 시 active 프로젝트 진척/판정. 결과 fx는 raw 적용(온건, Q2=A).
    if(typeof researchAdvanceDay==='function'){
      var _rnorm=researchNormalize(research);
      if((window.__ts_liveLogs||[]).indexOf('LOG-SEJIN-DEAD')>=0 && typeof RESEARCH_PROJECTS!=='undefined'){ RESEARCH_PROJECTS.forEach(function(_pj){ if((_pj.char||'').indexOf('윤세진')>=0 && _rnorm[_pj.id] && _rnorm[_pj.id].active){ _rnorm[_pj.id].active=false; _rnorm[_pj.id].prog=0; } }); }
      var radv=researchAdvanceDay(_rnorm,Math.random);
      if(radv.effects&&radv.effects.length){
        radv.effects.forEach(function(ef){
          if(ef.fx){next.c=Math.max(0,Math.min(act>=2?100:95,next.c+(ef.fx.c||0)));next.r=Math.max(0,Math.min(95,next.r+(ef.fx.r||0)));next.t=Math.max(0,Math.min(95,next.t+(ef.fx.t||0)));next.o=Math.max(0,Math.min(95,next.o+(ef.fx.o||0)));}
          if(ef.log)tryUnlock(ef.log);
        });
        var rToast=radv.effects.map(function(ef){var pj=(typeof researchGetProject==='function')?researchGetProject(ef.id):null;var nm=pj?pj.name:ef.id;if(ef.outcome==='complete')return '[연구 완료] '+nm+(ef.toast?' — '+ef.toast:'');if(ef.outcome==='stage')return '[연구 진척] '+nm+(ef.stageLabel?' · '+ef.stageLabel:'');return '[연구 차질] '+nm+(ef.toast?' — '+ef.toast:'');}).join('\n');
        setToastType('');setTimeout(function(){setToast(rToast);clearToastAfter(3200)},700);
      }
      setResearch(radv.state);Save.saveResearch(radv.state);
    }
    setPrevStats({c:next.c,r:next.r,t:next.t,o:next.o,day:next.day}); // 일일 보고 추세용: 새 날의 시작 스탯 스냅샷
    setStats(next);setGi(nextGi);persistGame(next,nextGi,act,actFlags,transRoute,cooldowns,recentCards,0,chainQueue,nextFacility);setCt(0);Save.set('ts_resumePhase','evening');Save.del('ts_resumeHeadlines');Save.del('ts_resumeRewards');
    if(r.feId&&completedFacility){
      setToastType('');setTimeout(function(){var suffix=feDef&&feDef.uprising?tt('app.uprisingSuffix',null,' | 내부 기록 갱신'):'';setToast(tt('app.facilityComplete',{title:r.title||tt('app.facilityDefault',null,'시설'),suffix:suffix},'['+(r.title||'시설')+'] 확장 공사 완료'+suffix));clearToastAfter(2400)},300)}
    // 보상 적용 후 즉시 게임오버 체크 (봉쇄 100 / 자원 0 등)
    var rewardLogs=getLiveLogs(logs);
    var goR=chkGameOver(next);
    if(goR&&next.c>=100){SFX.play('gameover');doGO(goR,next,nextGi);return}
    var sg=(typeof getRouteSafeguardCard==='function')?getRouteSafeguardCard(next,nextGi,rewardLogs,transRoute):null;
    if(sg){Save.set('ts_resumePhase','game');SFX.play('glitch');setCurCard(sg);setPhase('game');return}
    if(goR){SFX.play('gameover');doGO(goR,next,nextGi);return}
    setPhase('evening')};
  var hEvening=function(){clearResumeCheckpoint();var liveLogs=getLiveLogs(logs);var go=chkGameOver(stats);if(go&&stats.c>=100){SFX.play('gameover');doGO(go,stats,gi);return}var sg=(typeof getRouteSafeguardCard==='function')?getRouteSafeguardCard(stats,gi,liveLogs,transRoute):null;if(sg){SFX.play('glitch');setCurCard(sg);setPhase('game');return}if(go){SFX.play('gameover');doGO(go,stats,gi);return}
    // ═══ 35일 캡: day>35 도달 시 TIME_UP 강제 엔딩 ═══
    if(stats.day>35){var teid='TIME_UP';var timeView=(typeof tc==='function')?tc('endings','TIME_UP',ENDING_DEFS.TIME_UP):ENDING_DEFS.TIME_UP;SFX.play('gameover');doGO(timeView&&timeView.name?timeView.name:(getLocale()==='en'?'Session expired':'\uC138\uC158 \uB9CC\uB8CC'),stats,gi,teid);return}
    var trans=checkActTransitionLogic(stats,gi,liveLogs,actFlags,act);if(trans){doBriefing(trans.act,stats,trans.route);return}var se=chkSpecialEnding(stats,gi,act,trust,liveLogs,actFlags,facility);if(se){var def=ENDING_DEFS[se];doGO(def?def.name:(getLocale()==='en'?'Session terminated':'\uC138\uC158 \uC885\uB8CC'),stats,gi,se);return}if(stats.c>=85&&stats.day!==cAlertDay){setCAlertDay(stats.day);setTimeout(function(){setToastType('alert');setToast(tt('app.cStabilityAlert',{value:stats.c},'[ORACLE: KR-INIT-001 봉쇄 완전성 '+stats.c+'% — 한국지부 안정화 임박]'));clearToastAfter(3800)},700)}
  nextCard(stats,gi,liveLogs,chainQueue);setPhase('game')};
  var hDlg=function(c){SFX.play('dialogue');clearResumeCheckpoint();var ns=applyFx(stats,c.fx||{}),ng=gi+(c.g||0);ns.c=act>=2?Math.max(0,Math.min(100,ns.c)):Math.max(0,Math.min(95,ns.c));ns.r=Math.max(0,Math.min(95,ns.r));ns.t=Math.max(0,Math.min(95,ns.t));ns.o=Math.max(0,Math.min(95,ns.o));setStats(ns);setGi(ng);var goD=chkGameOver(ns);if(goD){SFX.play('gameover');doGO(goD,ns,ng);return}if(curDlg&&c.trust!==undefined)modTrust(curDlg.char,c.trust);var di=curDlg?DIALOGUES.indexOf(curDlg):-1;var usedAfter=markDialogueUsed(di);var csi=curDlg?DIALOGUES.filter(function(d,i){return d.char===curDlg.char&&i<=di}).length-1:0;checkLogs(ns,ng,null,curDlg?curDlg.char:null,csi);if(c.log){if(Array.isArray(c.log))c.log.forEach(function(l){tryUnlock(l)});else tryUnlock(c.log)}var dlgLogs=getLiveLogs(logs);persistGame(ns,ng,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);
    setCurDlg(null);
    // 대화 종료 시: 아직 안 넘긴 다음 카드가 준비돼 있으면(=대화 전에 뽑아둔 버퍼) 다시 뽑지 않고 그대로 노출.
    // 버퍼가 없을 때(미션/복원 등 예외)만 새 카드를 뽑는다.
    if(freshCardRef.current){setPhase('game');return}
    nextCard(ns,ng,dlgLogs,chainQueue);setPhase('game')};
  var fullReset=function(){BGM.stop();BGM.started=false;['ts_game','ts_logs','ts_endings','ts_sessions','ts_trust','ts_usedDlg','ts_usedEvening','ts_seenArchive','ts_facility','ts_muted','ts_volume','ts_fontSize','ts_act2_reached','ts_observer_proto','ts_minigamesSeen','ts_activeSpecs','ts_sessionDeck','ts_recentNews','ts_recentRewards','ts_combos','ts_evidence_used','ts_resourceReserveUsed','ts_activeMission','ts_resumePhase','ts_pendingBriefing','ts_resumeHeadlines','ts_resumeRewards','ts_resumeDialogueIndex','ts_eveningLineState','ts_research','ts_snap_1','ts_snap_2','ts_snap_3'].forEach(function(k){Save.del(k)});if(typeof clearLocalStoragePrefix==='function')clearLocalStoragePrefix('ts_observer_proto_roll_');if(typeof clearSessionDeck==='function')clearSessionDeck();window.location.reload()};
  var startNewCampaign=function(showTutorial){
    if(typeof BGM!=='undefined'){BGM.stop();BGM.started=false;BGM.currentAct=1;}
    var ns={c:50,r:65,t:50,o:40,day:1};
    setStats(ns);setGi(0);setCt(0);setUsedDlg([]);setUsedEvening([]);
    setTrust({haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40});
    setCooldowns({});setRecentCards([]);setAct(1);setTransRoute('');
    setActFlags({prom_met:false,mission_done:false,chain_done:false,prom_mission:false});
    setChainQueue([]);setPendingBonus(null);setCurMission(null);setCurDlg(null);setPreview(null);setNh([]);
    setGor('');setGoDay(null);setEndNarr(null);setEndId(null);setCAlertDay(-1);setAct2Reached(false);
    setFacility({approved:[],pending:[],completed:[],proposed:[],rewardOff:[]});if(typeof window!=='undefined')window.__ts_facPropDay=null;setPrevStats(null);
    setResearch({});Save.del('ts_research');
    // Reset archive read markers for a clean campaign.
    setSeenArchive([]);Save.del('ts_seenArchive');
    Save.clearGame();Save.del('ts_trust');Save.del('ts_usedDlg');Save.del('ts_usedEvening');Save.del('ts_facility');Save.del('ts_combos');Save.del('ts_evidence_used');Save.del('ts_act2_reached');
    // 회차 오염 방지: 이전 회차 잔존 시 새 회차에서 옛 미션 강제 진입/부당 보상(activeMission), 중복 회피 편향(recent*), 휴면 게이트(reserve)
    Save.del('ts_activeMission');Save.del('ts_recentRewards');Save.del('ts_recentNews');Save.del('ts_resourceReserveUsed');
    clearResumeCheckpoint();initActiveSpecs();if(typeof initSessionDeck==='function')initSessionDeck(Save.getSessions());setShowEvidence(false);
    var rl=resetSessionLogs(logs);
    if(Save.getSessions()>0&&rl.indexOf('META-SESSION-RESET')<0)rl.push('META-SESSION-RESET');
    setLogs(rl);Save.saveLogs(rl);if(typeof window!=='undefined')window.__ts_liveLogs=rl.slice();
    setCurCard(drawCard(ns,0,rl,{},[],1));
    setFp(!!showTutorial);
    setPhase(showTutorial?'tutorial':'game');
    if(typeof BGM!=='undefined'&&BGM.start){BGM.start();if(BGM.playAct)BGM.playAct(1);}
  };
  var restart=function(){BGM.stop();BGM.started=false;startNewCampaign(false)};
  var continueSavedCampaign=function(){
    var active=curMission||Save.get('ts_activeMission',null);
    if(active&&typeof MISSIONS!=='undefined'&&MISSIONS[active]){setCurMission(active);setPhase('mission');return}
    if(active)Save.del('ts_activeMission');
    var resumePhase=Save.get('ts_resumePhase','');
    if(resumePhase==='dialogue'){
      var di=Save.get('ts_resumeDialogueIndex',-1);
      if(typeof DIALOGUES!=='undefined'&&DIALOGUES[di]){setCurDlg(DIALOGUES[di]);setPhase('dialogue');return}
      clearResumeCheckpoint();
    }
    if(resumePhase==='briefing'){
      var pb=Save.get('ts_pendingBriefing',null)||{};
      if(pb.act)setAct(pb.act);
      if(typeof pb.route==='string')setTransRoute(pb.route);
      setPhase('briefing');return;
    }
    if(resumePhase==='news'){
      var savedNews=Save.get('ts_resumeHeadlines',[]);
      var news=(Array.isArray(savedNews)&&savedNews.length>0)?savedNews:genNewsHeadlines(stats,gi,logs);
      setNh(news);Save.set('ts_resumeHeadlines',news);setPhase('news');return;
    }
    if(resumePhase==='reward'){setPhase('reward');return}
    if(resumePhase==='evening'){setPhase('evening');return}
    if(resumePhase==='escape_game'){setPhase('escape_game');return}
    if(ct>=cpd){
      var dayNews=genNewsHeadlines(stats,gi,logs);
      setNh(dayNews);Save.set('ts_resumePhase','news');Save.set('ts_resumeHeadlines',dayNews);setPhase('news');return;
    }
    setPhase('game');
  };
  var returnToMainMenu=function(){
    setShowSettings(false);
    setRet('menu');
    setPhase('menu');
  };
  // ═══ 스냅샷 세이브 (3슬롯) ═══
  var saveSnapshot=function(slot){
    persistGame(stats,gi,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);Save.saveLogs(logs);
    Save.set('ts_trust',trust);Save.saveUsedDlg(usedDlg);Save.saveUsedEvening(usedEvening);Save.saveSeenArchive(seenArchive);
    Save.saveFacility(facility);
    Save.saveSnapshot(slot,{day:stats.day,act:act,label:'DAY '+stats.day+' · ACT '+act+' · '+(transRoute||'-'),currentCard:curCard});
    setToastType('');setToast(tt('app.snapshotSaved',{slot:slot,day:stats.day},'슬롯 '+slot+' 저장 완료 (DAY '+stats.day+')'));clearToastAfter(2400);
  };
  var loadSnapshot=function(slot){
    var pack=Save.loadSnapshot(slot);
    if(!pack){setToastType('');setToast(tt('app.snapshotEmpty',{slot:slot},'슬롯 '+slot+' 비어있음'));clearToastAfter(1800);return}
    BGM.stop();BGM.started=false;
    // pack 내용으로 React state 직접 복원 (reload 없이)
    var pg=pack.game||{};
    var ps=pg.stats||{c:50,r:65,t:50,o:40,day:1};
    var pgi=pg.gi||0;
    var pact=pg.act||1;
    var paf=pg.actFlags||{prom_met:false,mission_done:false,chain_done:false,prom_mission:false};
    var ptr=pg.transRoute||'';
    var pcd=pg.cooldowns||{};
    var prc=pg.recentCards||[];
    var pcq=(pg.chainQueue||[]).map(function(c){return typeof c==='string'?(typeof CARD_BY_ID!=='undefined'?CARD_BY_ID[c]:null):c}).filter(Boolean);
    var plogs=pack.logs||['LOG-001'];
    var ptrust=pack.trust||{haeun:50,doyun:50,sejin:50,jaehyuk:50,weber:20,foster:15,soyoung:40};
    var pud=pack.usedDlg||[];
    var pue=pack.usedEvening||[];
    var psa=pack.seenArchive||[];
    var pfac=normalizeFacilityState(pack.facility||{approved:[],pending:[],completed:[],proposed:[]});
    var pres=(typeof researchNormalize==='function')?researchNormalize(pack.research||{}):(pack.research||{});setResearch(pres);Save.saveResearch(pres);
    Save.del('ts_activeMission');
    setStats(ps);setGi(pgi);setAct(pact);setActFlags(paf);setTransRoute(ptr);
    var savedCard=(pack.currentCardId&&typeof CARD_BY_ID!=='undefined'&&CARD_BY_ID[pack.currentCardId])||pack.currentCard||null;
    var restoredQueue=pcq;
    if(!savedCard&&pcq.length>0){savedCard=pcq[0];restoredQueue=pcq.slice(1)}
    setCooldowns(pcd);setRecentCards(prc);setChainQueue(restoredQueue);
    setLogs(plogs);if(typeof window!=='undefined')window.__ts_liveLogs=plogs.slice();setTrust(ptrust);setUsedDlg(pud);setUsedEvening(pue);setSeenArchive(psa);setFacility(pfac);
    setCt(typeof pg.ct==='number'?pg.ct:0);setCurDlg(null);setCurMission(pg.curMission||null);setPendingBonus(pg.pendingBonus||null);
    setFp(false);setShowSettings(false);
    // 저장된 현재 카드가 있으면 그대로 복원하고, 없을 때만 새로 뽑는다.
    var nc=savedCard||drawCard(ps,pgi,plogs,pcd,prc,pact,ptr,pfac);
    if(nc)setCurCard(nc);
    if(typeof BGM!=='undefined'){BGM.started=true;if(BGM.playAct)BGM.playAct(pact);else if(BGM.start)BGM.start();}
    setPhase('game');
    setToastType('');setToast(tt('app.snapshotLoaded',{slot:slot,day:ps.day},'슬롯 '+slot+' 로드 완료 (DAY '+ps.day+')'));
    clearToastAfter(2200);
  };
  // ═══ 업적 체크 — 주요 상태 변경 시 자동 트리거 ═══
  useEffect(function(){
    if(typeof checkAchievements!=='function')return;
    var state={stats:stats,gi:gi,act:act,logs:logs,endings:endings,trust:trust,facility:facility,sessions:sessions,usedDlg:usedDlg};
    var newly=checkAchievements(state,achievements);
    if(newly.length>0){
      var newIds=achievements.concat(newly.map(function(a){return a.id}));
      setAchievements(newIds);Save.saveAchievements(newIds);
      newly.forEach(function(a,idx){
        setTimeout(function(){var av=(typeof getAchievementView==='function')?getAchievementView(a):a;setToastType('achievement');setToast(tt('app.achievement',{name:av.name},'[ 업적 ] '+av.name));SFX.play('check');clearToastAfter(3200)},idx*1400);
        if(typeof window.__SteamUnlock==='function')window.__SteamUnlock(a.steamId);
      });
    }
  },[stats,gi,act,logs,endings,trust.haeun,trust.doyun,trust.sejin,trust.jaehyuk,facility.completed.length,sessions]);
  // 대기 중 확장 승인 함수
  var approvePending=function(feId){setFacility(function(prev){
    var base=normalizeFacilityState(prev);
    if(!feId||base.approved.indexOf(feId)>=0||base.completed.indexOf(feId)>=0){Save.saveFacility(base);return base}
    var next=normalizeFacilityState({approved:base.approved.concat([feId]),pending:base.pending.filter(function(id){return id!==feId}),completed:base.completed,proposed:base.proposed.concat([feId]),rewardOff:base.rewardOff});
    Save.saveFacility(next);return next});setToastType('');setToast(tt('app.facilityAdded',null,'시설 확장이 보상 풀에 추가되었습니다'));clearToastAfter(2200)};
  // 완료 시설의 보상카드 보상 풀 포함/제외 토글 (시설 탭에서 호출). rewardOff에 들어 있으면 buildRewardPool이 건너뛴다.
  var toggleFacilityReward=function(feId){
    if(!feId)return;
    var base=normalizeFacilityState(facility);
    if(base.completed.indexOf(feId)<0)return;
    var off=(base.rewardOff||[]).slice();var idx=off.indexOf(feId);var nowOff;
    if(idx>=0){off.splice(idx,1);nowOff=false}else{off.push(feId);nowOff=true}
    var next=normalizeFacilityState({approved:base.approved,pending:base.pending,completed:base.completed,proposed:base.proposed,rewardOff:off});
    setFacility(next);Save.saveFacility(next);
    setToastType('');setToast(nowOff?tt('app.facilityRewardOff',null,'보상카드를 보상 풀에서 제외했습니다'):tt('app.facilityRewardOn',null,'보상카드를 보상 풀에 포함했습니다'));clearToastAfter(1800);
  };
  // 연구 단계 착수: 자원 차감 + active. 자원은 즉시 반영(setStats).
  var startResearch=function(id){
    if(typeof researchStart!=='function')return;
    var r0=researchStart(research,id,stats,stats.day,act,getLiveLogs(logs));
    if(!r0.ok){setToastType('');setToast(tt('app.researchCantStart',null,'착수 조건을 충족하지 못했습니다'));clearToastAfter(2000);return}
    setStats(r0.stats);setResearch(r0.state);Save.saveResearch(r0.state);
    persistGame(r0.stats,gi,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue,facility);
    var pj=(typeof researchGetProject==='function')?researchGetProject(id):null;
    setToastType('');setToast('[연구 착수] '+((pj&&pj.name)||id));clearToastAfter(2000);
  };
  // directUpgrade 는 main 머지 후 제거됨 — uprising GI-2 로직은 hReward 내부 r.feId 처리부로 이관

  // ═══ CH-007 미니게임 결과 수신 핸들러 ═══
  var onEscapeResult=function(r){
    BGM.stop();
    // outcome → 엔딩 매핑
    var endingMap={success:'E',fail_normal:'E_c',fail_unlucky:'E_bad'};
    var eid=endingMap[r.outcome]||'E_c';
    // 폴백 (확률 시뮬로 진행된 경우)
    if(r.fallbackEnding){eid=r.fallbackEnding;if(r.fallbackLog)tryUnlock(r.fallbackLog)}
    // 결과 로그 부여
    var logMap={success:'LOG-ESCAPE-CLEAR',fail_normal:'LOG-ESCAPE-FAIL',fail_unlucky:'LOG-ESCAPE-UNLUCKY'};
    if(logMap[r.outcome])tryUnlock(logMap[r.outcome]);
    // 미니게임 내부에서 축적된 LOG 부여 (LOG-GENERAL-ROUTE / LOG-B3-ROUTE 등)
    if(r.flags && Array.isArray(r.flags.logs)){
      r.flags.logs.forEach(function(lid){if(typeof lid==='string')tryUnlock(lid)});
    }
    // 동행자 로그 부여 (미니게임에서 최종 생존한 간부)
    var compLogMap={haeun:'ACCOMP-HAEUN',doyun:'ACCOMP-DOYUN',sejin:'ACCOMP-SEJIN',jaehyuk:'ACCOMP-JAEHYUK'};
    (r.companionsFinal||[]).forEach(function(id){if(compLogMap[id])tryUnlock(compLogMap[id])});
    // 엔딩 E 동적 텍스트 조립
    if(eid==='E'&&typeof window.buildEEnding==='function'){
      var curLogs=logs.slice();if(logMap[r.outcome])curLogs.push(logMap[r.outcome]);
      (r.companionsFinal||[]).forEach(function(id){if(compLogMap[id])curLogs.push(compLogMap[id])});
      ENDING_DEFS.E.narrative=window.buildEEnding(curLogs);
    }
    // 전원 생존 성공 탈출 — 히든 보상컷 (간부 4인 전원 동행 생존 시에만)
    var fullCrew=eid==='E'&&(r.companionsFinal||[]).length>=4;
    SFX.play('gameover');doGO(ENDING_DEFS[eid].name,stats,gi,eid,fullCrew?'ending_E_all':null);
  };
  // ═══ 렌더링 (phase 라우팅) ═══
  // 토스트는 전 phase 공통 채널 — withOracleLink를 거치는 모든 화면에서 보인다 (가이드 힌트 h3/h4 포함)
  var renderToastBar=function(){
    if(!toast)return null;
    return h('div',{'data-toast-bar':true,key:'toastbar',style:(function(){var isCenter=toastType==='alert';var isRed=toastType==='risk';var isAch=toastType==='achievement';return{position:'fixed',top:isCenter?'50%':'auto',bottom:isCenter?'auto':'calc(var(--oracle-link-h) + 34px)',left:'50%',transform:isCenter?'translate(-50%,-50%)':'translateX(-50%)',background:isAch?'rgba(3,7,8,.94)':isRed?'rgba(255,68,68,0.15)':'rgba(3,7,8,.9)',border:'1px solid '+(isAch?'rgba(var(--ui-rgb),.5)':isRed?'rgba(255,68,68,0.4)':'rgba(var(--ui-rgb),.3)'),borderRadius:4,padding:isAch?'10px 20px':'8px 16px',fontFamily:"'Share Tech Mono',monospace",fontSize:isAch?12:11,color:isAch?'rgba(var(--ui-rgb),.95)':isRed?'#ff6644':'rgba(var(--ui-rgb),.8)',letterSpacing:1,zIndex:140,animation:'fadeIn 0.3s ease',textAlign:'center',maxWidth:320,whiteSpace:'pre-line',boxShadow:isAch?'0 0 20px rgba(var(--ui-rgb),.15)':'none'}})()},toast.replace(/\. /g,'.\n'));
  };
  var devPreview=function(){
    if(!DEV||!devPanel)return null;
    var close=function(){setDevPanel(null)};
    var node=null;
    if(devPanel==='research'&&typeof ResearchPanel!=='undefined'){
      node=h(ResearchPanel,{research:research,stats:(stats&&stats.r)?stats:{c:62,r:58,t:60,o:50},day:Math.max(stats.day||1,22),act:Math.max(act||1,2),logs:['LOG-RES-OPEN','LOG-EV-UNLOCK','LOG-017','LOG-RD-UNLOCK','LOG-INTRO-YS','LOG-080','LOG-082'],onStart:function(){},onClose:close,devPreview:true});
    }else if(devPanel==='evidence'&&typeof EvidencePanel==='function'){
      node=h(EvidencePanel,{logs:['LOG-EV-UNLOCK'].concat((typeof EVIDENCE!=='undefined'?EVIDENCE.map(function(e){return e.src}):[])),onClose:close,devPreview:true});
    }else if(devPanel==='facility'&&typeof FacilityPanel==='function'){
      var _pf=facility||{};var _fc=((_pf.pending||[]).length+(_pf.approved||[]).length+(_pf.completed||[]).length)>0?{approved:_pf.approved||[],pending:_pf.pending||[],completed:_pf.completed||[],proposed:_pf.proposed||[]}:{pending:['FE-001','FE-002'],approved:['FE-003'],completed:['FE-004','FE-005'],proposed:[]};node=h(FacilityPanel,{facility:_fc,onClose:close,onApprove:function(){},onToggleReward:function(){},devPreview:true});
    }
    if(!node)return null;
    return h('div',{className:'act-'+Math.max(act||1,2)},node);
  };
  var withOracleLink=function(node){
    // DAY 전환 컷은 day 증가 시점 화면(news/reward/브리핑 등)에서 떠야 한다 — menu/game return에만 두면 실전에서 안 보인다 (프리뷰만 되는 버그의 원인)
    var dcNode=daycut&&typeof DayCutOverlay!=='undefined'?h(DayCutOverlay,{day:daycut,stats:stats,act:act,logs:getLiveLogs(logs),onSkip:function(){if(daycutTimerRef.current)clearTimeout(daycutTimerRef.current);setDaycut(null)}}):null;
    if(typeof OracleLinkBar!=='function'||!shouldUseOracleLink(phase)||showSettings||showFacility||showEvidence)return h(React.Fragment,null,node,dcNode,renderToastBar());
    return h(React.Fragment,null,node,h(OracleLinkBar,{day:stats.day,phase:phase}),dcNode,renderToastBar());
  };
  var hasSave=!!Save.get('ts_game',null);
  var hasSessionHistory=sessions>0||endings.length>0;
  if(cctvSting)return h(CctvSting,{clipKey:cctvSting,onDone:function(){var _rp=stingPreviewRef.current;stingPreviewRef.current=false;setCctvSting(null);setPhase(_rp||'mission')}});
  if(phase==='boot')return h(Boot,{sessions:sessions,onBoot:function(){BGM.startBootLoop()},onDone:function(){BGM.stopBootLoop();BGM.start();setPhase('menu')}});
  if(phase==='menu')return h(React.Fragment,null,h(MainMenu,{sessions:sessions,hasSave:hasSave,hasSessionHistory:hasSessionHistory,onPlay:function(){startNewCampaign(!hasSessionHistory)},onContinue:continueSavedCampaign,onMainMenu:returnToMainMenu,onReset:restart,onFullReset:fullReset,onLogs:function(){setRet('menu');setPhase('logs')},onArchive:function(){setRet('menu');setPhase('archive')},onEndings:function(){setRet('menu');setPhase('endings')},onAchievements:function(){setRet('menu');setPhase('achievements')},onMiniGuide:function(){setRet('menu');setPhase('miniguide')},onSaveSnap:saveSnapshot,onLoadSnap:loadSnapshot,onFxModeChange:function(mode){setFxMode(mode);Save.set('ts_fxMode',mode)}}),DEV&&h(DevMissionLauncher,{open:showDevPanel,onToggle:function(){setShowDevPanel(function(v){return !v})},onLaunch:launchDebugMission,onLaunchBriefing:launchDebugBriefing,onLaunchEnding:launchDebugEnding,onLaunchSting:launchDebugSting,onLaunchTriggerCard:launchDebugTriggerCard,onPreviewPanel:function(which){setDevPanel(which)},onPreviewMini:function(){try{var _mids=Object.keys((typeof FIELD_MINIGAME_LIBRARY!=='undefined'&&FIELD_MINIGAME_LIBRARY)||{});localStorage.setItem('ts_minigamesSeen',JSON.stringify(_mids));}catch(e){}setRet(phase);setPhase('miniguide');},onPreviewCctv:previewCctv,onPreviewOracleOv:previewOracleOv,onPreviewDayCut:previewDayCut,onPreviewCardFlash:previewCardFlash}),orov&&orovEl(),flashPrev&&flashPrevEl(),daycut&&typeof DayCutOverlay!=='undefined'&&h(DayCutOverlay,{day:daycut,stats:stats,act:act,logs:[],onSkip:function(){if(daycutTimerRef.current)clearTimeout(daycutTimerRef.current);setDaycut(null)}}),DEV&&devPreview());
  if(phase==='tutorial')return h(Tutorial,{canSkip:sessions>0,onSkip:function(){setFp(false);setPhase('game')},onDone:function(){setFp(false);setPhase('game')}});
  if(phase==='briefing'){
    if(debugBriefing)return h(BriefingScreen,{act:debugBriefing.act,stats:stats,transRoute:debugBriefing.route,onEnter:function(){setDebugBriefing(null);setPhase('menu')}});
    return h(BriefingScreen,{act:act,stats:stats,transRoute:transRoute,onEnter:function(){clearResumeCheckpoint();persistGame(stats,gi,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);nextCard(stats,gi,logs,chainQueue);setPhase('game')}});
  }
  if(phase==='go'){
    var goBack=debugGO?function(){setDebugGO(false);setPhase('menu')}:null;
    return withOracleLink(h(GameOver,{stats:stats,reason:gor,gi:gi,sessions:sessions,endNarr:endNarr,endId:endId,endImg:endImg,resultDay:goDay,runSummary:goSummary,endings:endings,logs:logs,onRestart:goBack||restart,onMainMenu:goBack||returnToMainMenu,onLogs:function(){setRet('go');setPhase('logs')},onArchive:function(){setRet('go');setPhase('archive')},onEndings:function(){setRet('go');setPhase('endings')},onAchievements:function(){setRet('go');setPhase('achievements')}}));
  }
  if(phase==='news')return withOracleLink(h('div',{className:'screen'},h(NewsReport3,{headlines:nh,day:stats.day,stats:stats,prevStats:prevStats,gi:gi,act:act,facility:facility,onContinue:function(){Save.set('ts_resumePhase','reward');setPhase('reward')}})));
  if(phase==='reward')return withOracleLink(h(RewardScreen,{stats:stats,onPick:hReward,facility:facility,getRewardPreviewDelta:getRewardPreviewDelta,initialRewards:Save.get('ts_resumeRewards',null),onRewardsReady:function(items){Save.set('ts_resumeRewards',items)}}));
  if(phase==='evening'){BGM.setTempVolume(0.04);return withOracleLink(h(React.Fragment,null,h(EveningChat2,{day:stats.day,act:act,logs:logs,gi:gi,trust:trust,facility:facility,sessions:sessions,usedEvening:usedEvening,onMarkEvening:function(key){setUsedEvening(function(p){if(p.indexOf(key)>=0)return p;var n=p.concat([key]);Save.saveUsedEvening(n);return n})},onChat:function(cn){modTrust(cn,1)},onResponse:function(cn,delta){modTrust(cn,delta)},onDone:function(){BGM.restoreVolume();hEvening()},onTrustMod:function(ck,v){modTrust(ck,v)},onGiMod:function(v){setGi(function(g){var ng=g+v;persistGame(stats,ng,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);return ng})},onLog:function(id){tryUnlock(id)},onOpenEvidence:function(){setShowEvidence(true)}}),
    showEvidence&&typeof EvidencePanel==='function'&&h(EvidencePanel,{logs:getLiveLogs(logs),canCombine:true,onTrust:function(ck,v){modTrust(ck,v)},onGi:function(v){setGi(function(g){var ng=g+v;persistGame(stats,ng,act,actFlags,transRoute,cooldowns,recentCards,ct,chainQueue);return ng})},onLog:function(id){tryUnlock(id)},onClose:function(){setShowEvidence(false)}})))};
  if(phase==='dialogue'&&curDlg)return withOracleLink(h(Dialogue,{dialogue:curDlg,onChoice:hDlg}));
  if(phase==='mission'&&curMission)return withOracleLink(h(FieldMission,{missionId:curMission,trust:trust,logs:logs,act:act,onComplete:(debugMissionRef.current?hMissionDebug:hMission)}));
  if(phase==='escape_game')return withOracleLink(h(EscapeGameScreen,{stats:stats,gi:gi,logs:logs,trust:trust,onResult:onEscapeResult}));
  if(phase==='logs')return h(LogViewer,{unlockedIds:logs,sessions:sessions,onClose:function(){setPhase(ret)}});
  if(phase==='archive')return h(ArchiveViewer,{logs:logs,seenArchive:seenArchive,onMarkSeen:function(id){setSeenArchive(function(p){if(p.indexOf(id)>=0)return p;var n=p.concat([id]);Save.saveSeenArchive(n);return n})},onClose:function(){setPhase(ret)}});
  if(phase==='endings')return h(EndingScreen,{endings:endings,sessions:sessions,onClose:function(){setPhase(ret)}});
  if(phase==='achievements')return h(AchievementsScreen,{unlockedIds:achievements,sessions:sessions,onClose:function(){setPhase(ret)}});
  if(phase==='miniguide')return h(MiniGameGuide,{onClose:function(){setPhase(ret)}});
  return withOracleLink(h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // TERMINAL SESSION')),
    h(Stats,{stats:stats,preview:preview,gi:gi,sessions:sessions,mutantAlert:!!(curCard&&curCard.alert),mapEvent:computeMapEvent(stats,logs),cctvFeed:(curCard&&curCard.cctv&&typeof IMG!=='undefined')?IMG[curCard.cctv]:null}),
    h(DayObjective,{stats:stats,act:act,logs:logs,gi:gi}),
    h('div',{className:'info-bar'},
      h('span',{className:'info-tag'},tt('scenario.mission',{current:ct+1,total:cpd},'MIS '+(ct+1)+'/'+cpd)),
      h('span',{className:'info-tag',style:{cursor:'pointer'},onClick:function(){setRet('game');setPhase('logs')}},'LOG'),
      (typeof ARCHIVE_ENTRIES!=='undefined')&&(function(){var uc=ARCHIVE_ENTRIES.filter(function(e){try{return e.unlock(logs)}catch(err){return false}}).length;if(uc===0)return null;var nc=ARCHIVE_ENTRIES.filter(function(e){try{return e.unlock(logs)&&seenArchive.indexOf(e.id)<0}catch(err){return false}}).length;return h('span',{className:'info-tag',style:{cursor:'pointer',color:nc>0?'#f0a030':'rgba(var(--ui-rgb),.7)',borderColor:nc>0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.2)',gap:4},onClick:function(){setRet('game');setPhase('archive')}},'ARC'+(nc>0?' '+nc+' ●':''))})(),
      (function(){var fc=(facility.completed||[]).length,fa=(facility.approved||[]).length,fp=(facility.pending||[]).length;var total=fc+fa+fp;if(total===0)return null;return h('span',{className:'info-tag',style:{cursor:'pointer',color:'var(--ui)',borderColor:'rgba(var(--ui-rgb),.4)'},onClick:function(){setShowFacility(true)}},tt('scenario.facility',{done:fc,total:total},getLocale()==='en'?('FAC '+fc+'/'+total):('시설 '+fc+'/'+total)))})(),
      (function(){if(typeof RESEARCH_PROJECTS==='undefined'||typeof researchVisible!=='function')return null;var llogs=getLiveLogs(logs);if(llogs.indexOf('LOG-RES-OPEN')<0)return null;var vis=RESEARCH_PROJECTS.filter(function(pj){return researchVisible(pj,stats.day,act,llogs)});if(vis.length===0)return null;var done=(typeof researchDoneCount==='function')?researchDoneCount(research):0;var actn=(typeof researchActiveCount==='function')?researchActiveCount(research):0;var lbl=(getLocale()==='en'?('RES '+done+'/'+vis.length):('연구 '+done+'/'+vis.length))+(actn>0?' ▸':'');return h('span',{className:'info-tag',style:{cursor:'pointer',color:'var(--ui)',borderColor:'rgba(var(--ui-rgb),.4)'},onClick:function(){try{SFX.play('tab')}catch(e){}setShowResearch(true)}},lbl)})(),
      logs.indexOf('LOG-EV-UNLOCK')>=0&&(function(){var col=typeof getActiveEvidence==='function'?getActiveEvidence(logs).length:(typeof getCollectedEvidence==='function'?getCollectedEvidence(logs).length:0);return h('span',{className:'info-tag',style:{cursor:'pointer',color:'var(--ui)',borderColor:'rgba(var(--ui-rgb),.4)'},onClick:function(){try{SFX.play('tab')}catch(e){}setShowEvidence(true)}},tt('scenario.evidence',{count:col},getLocale()==='en'?('EVIDENCE '+col):('증거 '+col)))})(),
      h('span',{className:'info-tag',style:{cursor:'pointer',marginLeft:'auto'},onClick:function(){setShowSettings(true)}},'☰')),
    h(CardC,{key:curCard.id+'_'+stats.day+'_'+ct,card:curCard,onSwipe:swipe,onPreview:setPreview,getPreviewDelta:getChoicePreviewDelta,gi:gi,day:stats.day,modalActive:!!(showSettings||showFacility||showEvidence),disabled:cardInputLocked,onOracleBlock:function(msg){setToastType('oracle');setToast(msg);clearToastAfter(2600);try{SFX.play('warn')}catch(e){}if(fxMode!=='off'){if(orovTimerRef.current)clearTimeout(orovTimerRef.current);setOrov(msg);orovTimerRef.current=setTimeout(function(){setOrov(null)},1200)}},onReply:function(msg){setToastType('');setToast(msg);clearToastAfter(1500)}}),
    orov&&orovEl(),
    flashPrev&&flashPrevEl(),
    daycut&&typeof DayCutOverlay!=='undefined'&&h(DayCutOverlay,{day:daycut,stats:stats,act:act,logs:getLiveLogs(logs),onSkip:function(){if(daycutTimerRef.current)clearTimeout(daycutTimerRef.current);setDaycut(null)}}),
    showSettings&&h(SettingsPanel,{onClose:function(){setShowSettings(false)},onMainMenu:returnToMainMenu,onReset:restart,onFullReset:fullReset,onLogs:function(){setShowSettings(false);setRet('game');setPhase('logs')},onArchive:function(){setShowSettings(false);setRet('game');setPhase('archive')},onSaveSnap:saveSnapshot,onLoadSnap:loadSnapshot,onFxModeChange:function(mode){setFxMode(mode);Save.set('ts_fxMode',mode)}}),
    showFacility&&h(FacilityPanel,{facility:facility,onClose:function(){setShowFacility(false)},onApprove:approvePending,onToggleReward:toggleFacilityReward}),
    showResearch&&typeof ResearchPanel!=='undefined'&&h(ResearchPanel,{research:research,stats:stats,day:stats.day,act:act,logs:getLiveLogs(logs),onStart:startResearch,onClose:function(){setShowResearch(false)}}),
    showEvidence&&h(EvidencePanel,{logs:logs,onClose:function(){setShowEvidence(false)}}),
    glitchLevel===3&&fxMode!=='off'&&h(GlitchOverlay,{level:3,fxMode:fxMode,onComplete:function(){setGlitchLevel(0)}}),DEV&&h(DevMissionLauncher,{open:showDevPanel,onToggle:function(){setShowDevPanel(function(v){return !v})},onLaunch:launchDebugMission,onLaunchBriefing:launchDebugBriefing,onLaunchEnding:launchDebugEnding,onLaunchSting:launchDebugSting,onLaunchTriggerCard:launchDebugTriggerCard,onPreviewPanel:function(which){setDevPanel(which)},onPreviewMini:function(){try{var _mids=Object.keys((typeof FIELD_MINIGAME_LIBRARY!=='undefined'&&FIELD_MINIGAME_LIBRARY)||{});localStorage.setItem('ts_minigamesSeen',JSON.stringify(_mids));}catch(e){}setRet(phase);setPhase('miniguide');},onPreviewCctv:previewCctv,onPreviewOracleOv:previewOracleOv,onPreviewDayCut:previewDayCut,onPreviewCardFlash:previewCardFlash}),DEV&&devPreview()));
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
