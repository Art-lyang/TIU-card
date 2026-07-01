// TERMINAL SESSION — app-init.js
// 글로벌 유틸리티, CARDS 배열, drawCard, Save, SFX
var CARDS = CARDS_PROLOGUE.concat(CARDS_BASE).concat(CARDS_STORY).concat(CARDS_ENDING).concat(CARDS_INVESTIGATE).concat(CARDS_RESOURCE).concat(typeof CARDS_ACT2_DAILY!=='undefined'?CARDS_ACT2_DAILY:[]).concat(typeof CARDS_ACT3_DAILY!=='undefined'?CARDS_ACT3_DAILY:[]).concat(CARDS_TRANSITION).concat(CARDS_HAEUN).concat(CARDS_EXTRA).concat(typeof CARDS_CHAINS!=='undefined'?CARDS_CHAINS:[]).concat(CARDS_NEW_A||[]).concat(CARDS_NEW_B||[]).concat(CARDS_ACT3||[]).concat(CARDS_EXTERNAL||[]).concat(CARDS_MIDGAME||[]).concat(typeof CARDS_ACT4!=='undefined'?CARDS_ACT4:[]).concat(typeof CARDS_ACT4_EXT!=='undefined'?CARDS_ACT4_EXT:[]).concat(typeof CARDS_ACT4_HAZARD!=='undefined'?CARDS_ACT4_HAZARD:[]).concat(typeof CARDS_ACT23_PRESSURE!=='undefined'?CARDS_ACT23_PRESSURE:[]).concat(typeof CARDS_CHARACTER_ARCS!=='undefined'?CARDS_CHARACTER_ARCS:[]).concat(typeof CARDS_KOREA_CIVILIAN!=='undefined'?CARDS_KOREA_CIVILIAN:[]).concat(typeof CARDS_DG_MERIDIAN!=='undefined'?CARDS_DG_MERIDIAN:[]).concat(typeof CARDS_SESSION_PACKS!=='undefined'?CARDS_SESSION_PACKS:[]).concat(typeof CARDS_INCIDENT!=='undefined'?CARDS_INCIDENT:[]).concat(typeof CARDS_RESIST_HINT!=='undefined'?CARDS_RESIST_HINT:[]).concat(typeof CARDS_FACILITY!=='undefined'?CARDS_FACILITY:[]).concat(typeof CARDS_FACILITY_PROPOSALS!=='undefined'?CARDS_FACILITY_PROPOSALS:[]).concat(typeof CARDS_CRISIS!=='undefined'?CARDS_CRISIS:[]).concat(typeof CARDS_NEUTRAL!=='undefined'?CARDS_NEUTRAL:[]).concat(typeof CARDS_YS_ARC!=='undefined'?CARDS_YS_ARC:[]);
var CARD_BY_ID={};for(var _ci=0;_ci<CARDS.length;_ci++){if(CARDS[_ci]&&CARDS[_ci].id)CARD_BY_ID[CARDS[_ci].id]=CARDS[_ci]}
var pick=function(a){return a[Math.floor(Math.random()*a.length)]};
var pickWeighted=function(a){if(!a||a.length===0)return null;var total=0;for(var i=0;i<a.length;i++){total+=cardWeight(a[i])}var roll=Math.random()*total;for(var j=0;j<a.length;j++){roll-=cardWeight(a[j]);if(roll<=0)return a[j]}return a[a.length-1]};
var pickN=function(a,n){return[].concat(a).sort(function(){return Math.random()-0.5}).slice(0,Math.min(n,a.length))};
var clamp=function(v,lo,hi){return Math.max(lo||0,Math.min(hi||100,v))};
var applyFx=function(s,fx,m){m=m||5;return{c:clamp(s.c+(fx.c||0)*m),r:clamp(s.r+(fx.r||0)*m),t:clamp(s.t+(fx.t||0)*m),o:clamp(s.o+(fx.o||0)*m),day:s.day}};
var INTRO_FILTER=[{name:'서하은',log:'LOG-INTRO-SH'},{name:'강도윤',log:'LOG-INTRO-KD'},{name:'윤세진',log:'LOG-INTRO-YS'},{name:'임재혁',log:'LOG-INTRO-IJ'}];
var _introMsgText=function(c,stats,gi,logs){
  try{
    if(!c||c.msg===undefined||c.msg===null)return '';
    if(typeof c.msg==='string')return c.msg;
    if(typeof c.msg==='function')return String(c.msg(stats||{c:50,r:50,t:50,o:50,day:1},gi||0,logs||[])||'');
    if(Array.isArray(c.msg))return c.msg.join(' ');
    return String(c.msg);
  }catch(e){return ''}
};
var introOk=function(c,logs,stats,gi){var txt=_introMsgText(c,stats,gi,logs);for(var fi=0;fi<INTRO_FILTER.length;fi++){var f=INTRO_FILTER[fi];if(logs.indexOf(f.log)<0&&txt.indexOf(f.name)>=0)return false}return true};
// ═══ 세션별 변이체 체인 제한 (2종 고정) ═══
var ALL_SPEC_TAGS=['spec-001','spec-003','spec-004','spec-008','spec-011','spec-012','spec-015'];
var ACTIVE_SPECS=[];
var ACTIVE_SPEC_COUNT=3;
var normalizeActiveSpecs=function(list){var seen={},out=[];if(!Array.isArray(list))return out;for(var i=0;i<list.length;i++){var id=String(list[i]||'');if(ALL_SPEC_TAGS.indexOf(id)>=0&&!seen[id]){out.push(id);seen[id]=true}if(out.length>=ACTIVE_SPEC_COUNT)break}return out};
var initActiveSpecs=function(){ACTIVE_SPECS=normalizeActiveSpecs(pickN(ALL_SPEC_TAGS,ACTIVE_SPEC_COUNT));try{localStorage.setItem('ts_activeSpecs',JSON.stringify(ACTIVE_SPECS))}catch(e){}};
var loadActiveSpecs=function(){try{var d=localStorage.getItem('ts_activeSpecs');if(d){var parsed=JSON.parse(d);var normalized=normalizeActiveSpecs(parsed);if(normalized.length===ACTIVE_SPEC_COUNT){ACTIVE_SPECS=normalized;localStorage.setItem('ts_activeSpecs',JSON.stringify(ACTIVE_SPECS))}else{initActiveSpecs()}}else{initActiveSpecs()}}catch(e){initActiveSpecs()}};
var specOk=function(c){if(!c.tag||c.tag.indexOf('spec-')!==0)return true;if(ACTIVE_SPECS.length===0)return true;return ACTIVE_SPECS.indexOf(c.tag)>=0};
// 돌발 긴급 기습(CT-30x/M-E0x) 공용 게이트 — 트리거 카드 req와 미니맵 사전경보가 동일 로직 공유
// [다회차 의도] CT-30x의 once 플래그와 done LOG(LOG-041/014/013)는 resetSessionLogs에서 회차마다 리셋된다.
//   즉 새 캠페인마다 조건(휴면 종 + 봉쇄위기/방치) 충족 시 기습이 다시 발생할 수 있다 — 의도된 동작(M-010 체인과 동일).
var EMERGENCY_AMBUSHES=[
  {spec:'spec-015',mission:'M-E02',done:'LOG-041'}, // BRAIN SEEKER 하수도 침입
  {spec:'spec-003',mission:'M-E03',done:'LOG-014'}, // BROOD DRONE 환기구 군체 침입
  {spec:'spec-001',mission:'M-E04',done:'LOG-013'}, // MANNEQUIN 정지 위장 잠입
  {spec:'spec-011',mission:'M-E01',done:'LOG-004'}  // SHELL TALKER 봉쇄선 음성 돌파
];
var ambushPending=function(specTag,doneLog,s,logs){
  logs=logs||[];
  if(typeof ACTIVE_SPECS==='undefined'||!Array.isArray(ACTIVE_SPECS)||ACTIVE_SPECS.length===0)return false;
  if(ACTIVE_SPECS.indexOf(specTag)>=0)return false;        // 활성 종은 조사루트로 다룸(상호배타)
  if(doneLog&&logs.indexOf(doneLog)>=0)return false;        // 이미 처리됨
  return (s.day>=8)&&(s.c<=30||s.day>=13);                  // 봉쇄위기 또는 방치
};
var anyAmbushPending=function(s,logs){for(var i=0;i<EMERGENCY_AMBUSHES.length;i++){var a=EMERGENCY_AMBUSHES[i];if(ambushPending(a.spec,a.done,s,logs))return true;}return false;};
var _cardFullText=function(c,stats,gi,logs){var txt=_introMsgText(c,stats,gi,logs);try{if(c&&c.left)txt+=' '+(c.left.label||'');if(c&&c.right)txt+=' '+(c.right.label||'')}catch(e){}return txt};
var cardHasMission=function(c){return !!(c&&((c.left&&c.left.mission)||(c.right&&c.right.mission)||c.mission))};
var cardFeProposeIds=function(c){var ids=[];if(c&&c.left&&c.left.fePropose)ids.push(c.left.fePropose);if(c&&c.right&&c.right.fePropose)ids.push(c.right.fePropose);return ids};
var cardFlowType=function(c,stats,gi,logs){
  if(!c)return 'ops';
  if(c.flow){return typeof c.flow==='string'?c.flow:(c.flow.type||'ops')}
  if(c.isFacilityProposal||c.feReq||String(c.id||'').indexOf('FE-')===0)return 'facility';
  if(String(c.id||'').indexOf('KC-')===0)return 'civilian';
  if(String(c.id||'').indexOf('DG-')===0||String(c.id||'').indexOf('MD-')===0)return 'faction';
  var txt=_cardFullText(c,stats,gi,logs);
  if(/최종|최후|전면\s*붕괴|카운트다운|셧다운|지휘관 교체|한국 전역 통합|엔딩/.test(txt))return 'climax';
  if(/보급|휴식|점검|수리|생일|수면|의무실|분배|훈련|정기|식량|근무/.test(txt))return 'daily';
  if(/SPEC|이변체|감염|포자|봉쇄선|개체|부상|공격|돌파|경보|대규모/.test(txt))return 'threat';
  if(/ORACLE|프로메테우스|메리디안|White Shield|DG|감청|삭제|비인가|외부 노드|B-3|B3|접근 불가|충성도/.test(txt))return 'conspiracy';
  if(c.priority==='상'||/긴급|대규모|붕괴|공격|감염|격리|위협|돌파|경보|부상|폐쇄|확산|파손|포자/.test(txt))return 'threat';
  return 'ops';
};
var actFlowPhase=function(day,act){
  if(act<=1)return day<=2?'early':(day>=4?'late':'mid');
  if(act===2)return day<=7?'early':(day>=11?'late':'mid');
  if(act===3)return day<=18?'early':(day>=23?'late':'mid');
  return day<=30?'early':'late';
};
var recentFlowCounts=function(rec,stats,gi,logs){
  var out={daily:0,civilian:0,ops:0,threat:0,conspiracy:0,climax:0,facility:0,faction:0};
  var ids=(rec||[]).slice(-4);
  for(var i=0;i<ids.length;i++){
    var id=ids[i],found=CARD_BY_ID[id]||null;
    var t=cardFlowType(found,stats,gi,logs);out[t]=(out[t]||0)+1;
  }
  return out;
};
var cardFlowOk=function(c,stats,gi,logs,currentAct,recent){
  if(!c)return false;
  if(c.forceFlow)return true;
  var day=(stats&&stats.day)||1,act=currentAct||1,phase=actFlowPhase(day,act),type=cardFlowType(c,stats,gi,logs);
  var txt=_cardFullText(c,stats,gi,logs);
  var flow=typeof c.flow==='object'?c.flow:null;
  if(flow){
    if(flow.minDay&&day<flow.minDay)return false;
    if(flow.maxDay&&day>flow.maxDay)return false;
    if(flow.minAct&&act<flow.minAct)return false;
    if(flow.maxAct&&act>flow.maxAct)return false;
  }
  var critical=stats&&(stats.c<=35||stats.r<=25||stats.t<=25||stats.o<=25);
  var hasMission=cardHasMission(c);
  var explicit=!!(c.req||c.cond||c.transReq||c.mission||hasMission||c.oracleBlock);
  var mustRun=!!(c.transReq||c.mission||hasMission||c.oracleBlock);
  if(type==='climax'){
    if(act<3)return false;
    if(act===3&&day<23)return false;
  }
  if(!critical&&!explicit){
    if(act<=1&&phase==='early'&&type==='threat'&&c.priority==='상')return false;
    if(act===2&&phase==='early'&&type==='threat'&&c.priority==='상')return false;
    if(act===3&&phase==='early'&&type==='threat'&&/대규모|전 구역|붕괴|최후/.test(txt))return false;
  }
  var rc=recentFlowCounts(recent,stats,gi,logs);
  if(!critical&&!mustRun&&(type==='threat'||type==='climax')&&(rc.threat+rc.climax)>=2)return false;
  if((type==='daily'||type==='civilian')&&(rc.daily+rc.civilian)>=3)return false;
  return true;
};
var cardWeight=function(c){var w=1;if(!c)return w;if(c.priority==='상')w+=5;else if(c.priority==='중')w+=2;else if(c.priority==='event')w+=6;if(c.once)w+=2;if(c.transReq)w+=4;if(c.glitch)w+=1;return w};
// 위기 구조 가중치: 위험대 스탯을 회복할 수 있는 카드가 더 자주 등장하도록
// 덱 자체를 회복 쪽으로 기울인다. 무작위에 가까운 첫 회차 플레이도 살아날
// 길이 자연스럽게 열리고, 안정 운영 중에는 발동하지 않아 긴장은 유지된다.
var rescueFlowWeight=function(c,stats){
  if(!stats||!c)return 1;
  var mult=1;
  ['c','r','t','o'].forEach(function(k){
    var v=stats[k];
    if(typeof v!=='number'||v>35)return;
    var heals=(c.left&&c.left.fx&&(c.left.fx[k]||0)>0)||(c.right&&c.right.fx&&(c.right.fx[k]||0)>0);
    if(!heals)return;
    var m=v<=20?4:(v<=30?3:2);
    if(m>mult)mult=m;
  });
  return mult;
};
var cardFlowWeight=function(c,stats,gi,logs,currentAct,recent,tRoute){
  var w=cardWeight(c),type=cardFlowType(c,stats,gi,logs),day=(stats&&stats.day)||1,act=currentAct||1,phase=actFlowPhase(day,act);
  var critical=stats&&(stats.c<=35||stats.r<=25||stats.t<=25||stats.o<=25);
  if(act<=1){
    if(type==='daily'||type==='ops')w*=1.25;
    if(type==='conspiracy')w*=0.75;
    if(type==='threat'&&!critical)w*=0.75;
  }else if(act===2){
    if(phase==='early'){
      if(type==='daily'||type==='ops'||type==='civilian')w*=1.22;
      if(type==='conspiracy')w*=0.72;
      if(type==='faction')w*=0.85;
      if(type==='threat'&&!critical)w*=0.82;
    }else if(phase==='mid'){
      if(type==='daily'||type==='civilian')w*=1.08;
      if(type==='conspiracy')w*=0.9;
      if(type==='threat'&&!critical)w*=0.95;
    }else{
      if(type==='conspiracy'||type==='faction')w*=1.05;
      if(type==='daily')w*=0.95;
    }
  }else if(act===3){
    if(phase==='early'){
      if(type==='daily'||type==='ops'||type==='civilian')w*=1.18;
      if(type==='conspiracy')w*=0.82;
      if(type==='threat'&&!critical)w*=0.85;
    }else if(phase==='late'){
      if(type==='threat'||type==='climax')w*=1.18;
      if(type==='daily')w*=0.88;
    }
  }else if(act>=4){
    if(type==='threat'||type==='conspiracy'||type==='climax')w*=1.08;
    if(type==='daily')w*=0.9;
  }
  var rc=recentFlowCounts(recent,stats,gi,logs);
  if(type!=='facility'&&type!=='faction'){
    if((rc[type]||0)>=2)w*=0.35;
    else if((rc[type]||0)>=1)w*=0.65;
  }
  // 미션 트리거 카드 가중치 부스트 — 미션 경험 보장
  if(cardHasMission(c))w*=1.6;
  if(typeof sessionDeckLineageWeight==='function'){
    try{w*=sessionDeckLineageWeight(c,stats,gi,logs,act,tRoute||'')}catch(e){}
  }
  w*=rescueFlowWeight(c,stats);
  return Math.max(0.2,w);
};
var pickWeightedFlow=function(a,stats,gi,logs,currentAct,recent,tRoute){
  if(!a||a.length===0)return null;
  var total=0;
  for(var i=0;i<a.length;i++){total+=cardFlowWeight(a[i],stats,gi,logs,currentAct,recent,tRoute)}
  var roll=Math.random()*total;
  for(var j=0;j<a.length;j++){roll-=cardFlowWeight(a[j],stats,gi,logs,currentAct,recent,tRoute);if(roll<=0)return a[j]}
  return a[a.length-1];
};
var oracleSafeguardEligible=function(stats,gi,logs,tRoute){
  var s=stats||{},lg=logs||[];
  if(lg.indexOf('ONCE-ORC-LOYAL-SAFE-01')>=0)return false;
  if(!s||s.c<=0||s.r<=0||s.t<=0||s.o<=0||s.c>=100)return false;
  var loyalty=(gi||0)>=10 || tRoute==='A4_COMPLY';
  if(!loyalty)return false;
  return s.c<=20||s.r<=20||s.t<=20;
};
var getOracleSafeguardCard=function(stats,gi,logs,tRoute){
  if(!oracleSafeguardEligible(stats,gi,logs,tRoute))return null;
  for(var i=0;i<CARDS.length;i++)if(CARDS[i]&&CARDS[i].id==='ORC-LOYAL-SAFE-01')return CARDS[i];
  return null;
};
var resistanceSafeguardEligible=function(stats,gi,logs,tRoute){
  var s=stats||{},lg=logs||[];
  if(lg.indexOf('ONCE-RH-SAFE-01')>=0||lg.indexOf('LOG-RH-SAFEGUARD')>=0)return false;
  if(!s||s.day<8)return false;
  if(s.c<=0||s.r<=0||s.t<=0||s.o<=0||s.c>=100)return false;
  var resistance=(gi||0)<=-35||tRoute==='A4_RESIST'||tRoute==='A4_OBSERVER';
  if(!resistance){
    for(var i=0;i<lg.length;i++){
      var id=String(lg[i]||'');
      if(id.indexOf('LOG-RH-')===0||id.indexOf('LOG-LJC-PROM-')===0||id.indexOf('LOG-UPRISING-')===0){resistance=true;break}
    }
  }
  if(!resistance)return false;
  return s.c<=25||s.r<=25||s.t<=20||s.o<=20;
};
var getResistanceSafeguardCard=function(stats,gi,logs,tRoute){
  if(!resistanceSafeguardEligible(stats,gi,logs,tRoute))return null;
  for(var i=0;i<CARDS.length;i++)if(CARDS[i]&&CARDS[i].id==='RH-SAFE-01')return CARDS[i];
  return null;
};
var getRouteSafeguardCard=function(stats,gi,logs,tRoute){
  var rs=getResistanceSafeguardCard(stats,gi,logs,tRoute);
  if(rs)return rs;
  return getOracleSafeguardCard(stats,gi,logs,tRoute);
};
var drawCard=function(stats,gi,logs,cooldowns,recent,currentAct,tRoute,facility){
  var day=stats.day||1;var cd=cooldowns||{};var rec=recent||[];var ca=currentAct||1;var tr=tRoute||'';
  var facComp=(facility&&facility.completed)||[];
  var facAll=[].concat((facility&&facility.approved)||[],(facility&&facility.pending)||[],facComp,(facility&&facility.proposed)||[]);
  var feProposeAvailable=function(c){var ids=cardFeProposeIds(c);for(var i=0;i<ids.length;i++)if(facAll.indexOf(ids[i])>=0)return false;return true};
  var facilityProposalAvailable=function(c){return !(c&&c.isFacilityProposal&&c.feId&&facAll.indexOf(c.feId)>=0)};
  var deckAvailable=function(c){return (typeof sessionDeckOk!=='function')?true:sessionDeckOk(c,stats,gi,logs,ca,facility)};
  // 첫날 첫 카드 강제: 1회차=CA-001, 2회차+=CA-001B
  // (localStorage를 직접 조회 — React closure stale logs 회피)
  if(day===1){
    var sess=(typeof Save!=='undefined'?Save.getSessions():0);
    var firstId=sess>=1?'CA-001B':'CA-001';
    var liveLogs=(typeof Save!=='undefined'?(Save.getLogs()||logs):logs)||[];
    var alreadyShown=liveLogs.indexOf('ONCE-'+firstId)>=0 || logs.indexOf('ONCE-'+firstId)>=0;
    if(!alreadyShown){var firstCard=CARDS.filter(function(c){return c.id===firstId})[0];if(firstCard)return firstCard;}
  }
  var safeguard=getRouteSafeguardCard(stats,gi,logs,tr);
  if(safeguard)return safeguard;
  var valid=CARDS.filter(function(c){
    if((c.id==='CA-001'||c.id==='CA-001B')&&day>1)return false;
    if(c.act&&c.act.indexOf(ca)<0)return false;
    if(c.once&&logs.indexOf('ONCE-'+c.id)>=0)return false;
    if(c.transReq&&c.transReq!==tr)return false;
    if(c.feReq&&facComp.indexOf(c.feReq)<0)return false;
    if(!feProposeAvailable(c))return false;
    if(!facilityProposalAvailable(c))return false;
    try{if(c.req&&!c.req(stats,gi,logs))return false}catch(e){return false}
    try{if(c.cond&&!c.cond(stats,gi,logs))return false}catch(e){return false}
    if(c.id&&cd[c.id]&&!c.repeatable)return false;
    if(c.tag&&cd[c.tag]&&(day-cd[c.tag])<3)return false;
    // 범용 데일리(태그 없고 act 전체 포함) = 한 판 1회만. 그 외 무태그 = 15일 쿨다운
    if(!c.tag&&c.repeatable&&cd[c.id]&&(day-cd[c.id])<15)return false;
    if(rec.indexOf(c.id)>=0)return false;
    if(!introOk(c,logs,stats,gi))return false;
    if(!specOk(c))return false;
    if(!deckAvailable(c))return false;
    if(!cardFlowOk(c,stats,gi,logs,ca,rec))return false;
    return true;
  });
  // valid 풀 고갈 시: flow 제한(cardFlowOk)만 완화하되, req가 '통과하는' 미션/체인/긴급 카드는
  // 영구 제외하지 않고 다시 후보에 포함 (저자원 Act3 등에서 현장임무/연계/긴급이 사라지던 문제 방지)
  var reqPass=function(c){try{return !!c.req&&c.req(stats,gi,logs)}catch(e){return false}};
  if(valid.length===0)valid=CARDS.filter(function(c){try{return c.id!=='CA-001'&&c.id!=='CA-001B'&&(!c.act||c.act.indexOf(ca)>=0)&&(!c.once||logs.indexOf('ONCE-'+c.id)<0)&&(!c.req||reqPass(c))&&(!c.transReq||c.transReq===tr)&&(!c.feReq||facComp.indexOf(c.feReq)>=0)&&feProposeAvailable(c)&&facilityProposalAvailable(c)&&deckAvailable(c)&&(!c.cond||c.cond(stats,gi,logs))&&(!c.id||!cd[c.id]||c.repeatable)&&rec.indexOf(c.id)<0&&introOk(c,logs,stats,gi)&&specOk(c)}catch(e){return false}});
  var fallback=CARDS.filter(function(c){try{return c.id!=='CA-001'&&c.id!=='CA-001B'&&(!c.act||c.act.indexOf(ca)>=0)&&(!c.once||logs.indexOf('ONCE-'+c.id)<0)&&!c.req&&!c.transReq&&(!c.feReq||facComp.indexOf(c.feReq)>=0)&&feProposeAvailable(c)&&facilityProposalAvailable(c)&&deckAvailable(c)&&(!c.cond||c.cond(stats,gi,logs))&&(!c.id||!cd[c.id]||c.repeatable)&&introOk(c,logs,stats,gi)&&specOk(c)}catch(e){return false}});
  var emergencyFresh=CARDS.filter(function(c){try{return c.id!=='CA-001'&&c.id!=='CA-001B'&&(!c.act||c.act.indexOf(ca)>=0)&&(!c.once||logs.indexOf('ONCE-'+c.id)<0)&&!(c.id&&cd[c.id]&&cardHasMission(c))&&!c.req&&!c.transReq&&(!c.feReq||facComp.indexOf(c.feReq)>=0)&&feProposeAvailable(c)&&facilityProposalAvailable(c)&&deckAvailable(c)&&(!c.cond||c.cond(stats,gi,logs))&&rec.indexOf(c.id)<0&&introOk(c,logs,stats,gi)&&specOk(c)}catch(e){return false}});
  var emergency=CARDS.filter(function(c){try{return c.id!=='CA-001'&&c.id!=='CA-001B'&&(!c.act||c.act.indexOf(ca)>=0)&&(!c.once||logs.indexOf('ONCE-'+c.id)<0)&&!(c.id&&cd[c.id]&&cardHasMission(c))&&!c.req&&!c.transReq&&(!c.feReq||facComp.indexOf(c.feReq)>=0)&&feProposeAvailable(c)&&facilityProposalAvailable(c)&&deckAvailable(c)&&(!c.cond||c.cond(stats,gi,logs))&&introOk(c,logs,stats,gi)&&specOk(c)}catch(e){return false}});
  // 상위 풀이 전부 비어 중복이 불가피해지는 경우(특히 인트로 미완료 구간의 좁은 풀 고갈)에는
  // introOk만 완화해 '최근에 안 나온' 신선 카드를 우선 확보 → act1 중복 카드 방지.
  // specOk(휴면 종 차단)·deckOk·recent 제외는 유지하므로 부작용 최소.
  var introRelaxFresh=CARDS.filter(function(c){try{return c.id!=='CA-001'&&c.id!=='CA-001B'&&(!c.act||c.act.indexOf(ca)>=0)&&(!c.once||logs.indexOf('ONCE-'+c.id)<0)&&!(c.id&&cd[c.id]&&cardHasMission(c))&&!c.req&&!c.transReq&&(!c.feReq||facComp.indexOf(c.feReq)>=0)&&feProposeAvailable(c)&&facilityProposalAvailable(c)&&deckAvailable(c)&&(!c.cond||c.cond(stats,gi,logs))&&rec.indexOf(c.id)<0&&specOk(c)}catch(e){return false}});
  var chosenPool=valid.length>0?valid:(fallback.length>0?fallback:(emergencyFresh.length>0?emergencyFresh:(introRelaxFresh.length>0?introRelaxFresh:emergency)));
  // 그래도 emergency(진짜 중복 불가피)에 도달하면 '가장 오래전에 나온' 카드를 골라 체감 중복 최소화
  if(chosenPool===emergency&&emergency.length>0){
    var lru=emergency.slice().sort(function(a,b){var ia=rec.indexOf(a.id),ib=rec.indexOf(b.id);return (ia<0?-1:ia)-(ib<0?-1:ib)});
    return lru[0];
  }
  return pickWeightedFlow(chosenPool,stats,gi,logs,ca,rec,tr);
};

function getMaxActForDay(day){
  day=parseInt(day||1,10)||1;
  if(day>=29)return 4;
  if(day>=14)return 3;
  if(day>=5)return 2;
  return 1;
}
// ts_game payload schema version.
var TS_GAME_SCHEMA_VERSION=1;
function getAct3RouteFromFlags(af){
  af=af||{};
  return af.prom_met&&af.mission_done?'A':af.prom_met?'B':af.mission_done?'C':'D';
}
function getAct4RouteFromState(game){
  var g=(game&&typeof game.gi==='number')?game.gi:0;
  return g>=10?'A4_COMPLY':g>=-15?'A4_GREY':g>=-30?'A4_RESIST':'A4_OBSERVER';
}
function normalizeGameSave(game){
  if(!game||!game.stats)return game;
  // 구버전/외부 세이브 호환: actFlags 누락 시 기본값 주입.
  // (없으면 Act3 경계 승격이 undefined를 받아 이후 필드 추가 때마다 깨진다)
  var af=game.actFlags&&typeof game.actFlags==='object'?game.actFlags:{};
  game.actFlags={
    prom_met:!!af.prom_met,
    mission_done:!!af.mission_done,
    chain_done:!!af.chain_done,
    prom_mission:!!af.prom_mission
  };
  if(af.act1_skipped)game.actFlags.act1_skipped=true;
  // 로드/클라우드 복원 입력 방어: 스탯·GI를 유효 범위로 클램프.
  // (외부 편집·전송 손상 값이 그대로 들어오면 Day 1 즉시 게임오버 등 비정상 시작)
  var st=game.stats;
  var cl=function(v,def){v=parseInt(v,10);if(isNaN(v))v=def;return Math.max(0,Math.min(100,v))};
  game.stats={c:cl(st.c,50),r:cl(st.r,65),t:cl(st.t,50),o:cl(st.o,40),day:parseInt(st.day||1,10)||1};
  if(typeof game.gi!=='undefined'){var giV=parseInt(game.gi,10);if(isNaN(giV))giV=0;game.gi=Math.max(-100,Math.min(100,giV))}
  // schemaVersion 체크: 현재는 1만 지원. 미래 버전 세이브가 들어오면 로깅만 하고 그대로 진행.
  if(typeof game.schemaVersion==='number'&&game.schemaVersion>TS_GAME_SCHEMA_VERSION){
    try{if(typeof console!=='undefined'&&console.warn)console.warn('[ts_game] unknown schemaVersion',game.schemaVersion,'> supported',TS_GAME_SCHEMA_VERSION)}catch(e){}
  }
  // 버전 필드 없는 구버전 세이브는 현행 버전을 부여 — 다음 saveGame에서 그대로 영속되어
  // 이후 스키마 변경 시 구/신 판별이 가능해진다.
  if(typeof game.schemaVersion!=='number')game.schemaVersion=TS_GAME_SCHEMA_VERSION;
  var day=parseInt(game.stats.day||1,10)||1;
  var act=parseInt(game.act||1,10)||1;
  if(act===2&&day<5){
    var skip=false;
    try{
      var raw=localStorage.getItem('ts_logs');
      var lg=raw?JSON.parse(raw):[];
      skip=Array.isArray(lg)&&lg.indexOf('LOG-ACT1-SKIP')>=0;
    }catch(e){}
    if(skip||(game.actFlags&&game.actFlags.act1_skipped)){
      var skipped={};
      for(var sk in game)skipped[sk]=game[sk];
      skipped.stats={c:game.stats.c,r:game.stats.r,t:game.stats.t,o:game.stats.o,day:5};
      skipped.act=2;
      skipped.__normalized='act1-skip-day';
      return skipped;
    }
  }
  var maxAct=getMaxActForDay(day);
  if(act<maxAct){
    var promoted={};
    for(var pk in game)promoted[pk]=game[pk];
    promoted.stats={c:game.stats.c,r:game.stats.r,t:game.stats.t,o:game.stats.o,day:day};
    promoted.act=maxAct;
    promoted.ct=0;
    promoted.chainQueue=Array.isArray(game.chainQueue)?game.chainQueue:[]; // act 경계 자동승급 시 진행 중 연계카드 큐 보존(BUG #7) — 큐 비움은 실제 전환점 doBriefing이 담당
    if(maxAct===2)promoted.transRoute='A';
    else if(maxAct===3)promoted.transRoute=getAct3RouteFromFlags(promoted.actFlags);
    else if(maxAct===4)promoted.transRoute=getAct4RouteFromState(promoted);
    promoted.__normalized='act-boundary';
    return promoted;
  }
  if(act<=maxAct)return game;
  var fixed={};
  for(var k in game)fixed[k]=game[k];
  fixed.stats={c:game.stats.c,r:game.stats.r,t:game.stats.t,o:game.stats.o,day:day};
  fixed.act=maxAct;
  fixed.ct=0;
  fixed.chainQueue=Array.isArray(game.chainQueue)?game.chainQueue:[]; // 진행 중 연계카드 큐 보존(BUG #7)
  if(maxAct===1)fixed.transRoute='';
  fixed.__normalized=true;
  return fixed;
}
function cleanGameSaveMeta(game){
  if(!game)return game;
  var clean={};
  for(var k in game){if(k!=='__normalized')clean[k]=game[k]}
  return clean;
}

function sanitizeSnapshotLogsForGame(logs,game,normalized){
  if(!Array.isArray(logs))return logs;
  var act=parseInt(game&&game.act||1,10)||1;
  var hasEarlyEvidenceUnlock=act<2&&logs.indexOf('LOG-EV-UNLOCK')>=0;
  var seen={},out=[];
  logs.forEach(function(id){
    if(!id)return;
    if((normalized||hasEarlyEvidenceUnlock)&&id.indexOf('ONCE-')===0)return;
    if(act<2&&id==='LOG-EV-UNLOCK')return;
    if(!seen[id]){seen[id]=true;out.push(id)}
  });
  if(out.indexOf('LOG-001')<0)out.unshift('LOG-001');
  return out;
}
function ensureProgressLogsForGame(logs,game){
  var seen={},out=[];
  (Array.isArray(logs)?logs:['LOG-001']).forEach(function(id){
    if(id&&!seen[id]){seen[id]=true;out.push(id)}
  });
  var add=function(id){if(id&&!seen[id]){seen[id]=true;out.push(id)}};
  var day=parseInt(game&&game.stats&&game.stats.day||1,10)||1;
  var act=parseInt(game&&game.act||1,10)||1;
  if(act>=2||day>=5){
    add('LOG-ACT2');
    ['LOG-INTRO-SH','LOG-INTRO-KD','LOG-INTRO-YS','LOG-INTRO-IJ'].forEach(add);
  }
  if(act>=3||day>=14)add('LOG-ACT3');
  if(act>=4||day>=29)add('LOG-ACT4');
  if(game&&game.actFlags&&game.actFlags.act1_skipped)add('LOG-ACT1-SKIP');
  if(out.indexOf('LOG-001')<0)out.unshift('LOG-001');
  return out;
}
function migrateOnceShownLogs(logs,onceShown){
  var out=Array.isArray(logs)?logs.slice():['LOG-001'];
  var seen={};
  out.forEach(function(id){if(id)seen[id]=true});
  var validOnce={};
  if(typeof CARDS!=='undefined'&&Array.isArray(CARDS)){
    CARDS.forEach(function(c){if(c&&c.once&&c.id)validOnce[c.id]=true});
  }
  (Array.isArray(onceShown)?onceShown:[]).forEach(function(id){
    id=String(id||'').replace(/^ONCE-/,'');
    if(!id)return;
    if(Object.keys(validOnce).length>0&&!validOnce[id])return;
    var flag='ONCE-'+id;
    if(!seen[flag]){seen[flag]=true;out.push(flag)}
  });
  if(out.indexOf('LOG-001')<0)out.unshift('LOG-001');
  return out;
}

var SAVE_SNAPSHOT_KEYS=['ts_snap_1','ts_snap_2','ts_snap_3'];
var preserveSnapshotSlots=function(fn){
  var saved={};
  SAVE_SNAPSHOT_KEYS.forEach(function(k){try{saved[k]=localStorage.getItem(k)}catch(e){saved[k]=null}});
  if(typeof fn==='function')fn();
  SAVE_SNAPSHOT_KEYS.forEach(function(k){try{if(saved[k]!==null&&localStorage.getItem(k)===null)localStorage.setItem(k,saved[k])}catch(e){}});
};
var clearLocalStoragePrefix=function(prefix){
  try{
    for(var i=localStorage.length-1;i>=0;i--){
      var k=localStorage.key(i);
      if(k&&k.indexOf(prefix)===0)localStorage.removeItem(k);
    }
  }catch(e){}
};

var Save={
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v));if(typeof CloudSave!=='undefined'&&CloudSave&&typeof CloudSave.markDirty==='function')CloudSave.markDirty(k)}catch(e){}},
  get:function(k,def){try{var d=localStorage.getItem(k);if(!d)return def;var parsed=JSON.parse(d);if(k==='ts_game'){var fixed=normalizeGameSave(parsed);if(fixed&&fixed.__normalized){var hardNormalized=fixed.__normalized===true;fixed=cleanGameSaveMeta(fixed);Save.set(k,fixed);try{var fixedLogs=sanitizeSnapshotLogsForGame(Save.get('ts_logs',['LOG-001']),fixed,hardNormalized);Save.saveLogs(ensureProgressLogsForGame(fixedLogs,fixed))}catch(e){}}return fixed}return parsed}catch(e){return def}},
  del:function(k){try{localStorage.removeItem(k);if(typeof CloudSave!=='undefined'&&CloudSave&&typeof CloudSave.markDirty==='function')CloudSave.markDirty(k)}catch(e){}},
  saveGame:function(s,g,a,af,tr,cd,rc,ct,cq,pb,cm,ph){
    var sessionDeck=(typeof getActiveSessionDeck==='function')?getActiveSessionDeck():null;
    // 정적 카드는 id 문자열로, 런타임 생성 카드(FMF 후속 등 CARD_BY_ID에 없는 순수 데이터)는 객체 그대로 직렬화해 복원 유실을 막는다
    var serializedCq=(cq||[]).map(function(c){
      if(typeof c==='string')return c;
      if(!c||!c.id)return null;
      return (typeof CARD_BY_ID!=='undefined'&&CARD_BY_ID[c.id])?c.id:c;
    }).filter(Boolean);
    var payload=normalizeGameSave({schemaVersion:TS_GAME_SCHEMA_VERSION,stats:s,gi:g,act:a||1,actFlags:af||{},transRoute:tr||'',cooldowns:cd||{},recentCards:rc||[],ct:ct||0,chainQueue:serializedCq,pendingBonus:pb||null,sessionDeck:sessionDeck,curMission:cm||null,phase:ph||null});
    var prev=Save.get('ts_game',null)||{};
    payload.timestamp=Date.now();
    payload.saveRevision=((prev&&parseInt(prev.saveRevision,10))||0)+1;
    Save.set('ts_game',cleanGameSaveMeta(payload))
  },
  clearGame:function(){preserveSnapshotSlots(function(){Save.del('ts_game');Save.del('ts_onceShown');Save.del('ts_recentNews');Save.del('ts_recentRewards');Save.del('ts_combos');Save.del('ts_evidence_used');Save.del('ts_sessionDeck');Save.del('ts_resourceReserveUsed');Save.del('ts_activeMission');Save.del('ts_resumePhase');Save.del('ts_pendingBriefing');Save.del('ts_resumeHeadlines');Save.del('ts_resumeRewards');Save.del('ts_resumeDialogueIndex');Save.del('ts_eveningLineState');Save.del('ts_trust');Save.del('ts_usedDlg');Save.del('ts_usedEvening');Save.del('ts_facility');clearLocalStoragePrefix('ts_observer_proto_roll_');if(typeof clearSessionDeck==='function')clearSessionDeck()})},
  saveLogs:function(ids){Save.set('ts_logs',ids)},
  getLogs:function(){return Save.get('ts_logs',['LOG-001'])},
  saveEnding:function(id){var e=Save.get('ts_endings',[]);if(e.indexOf(id)<0){e.push(id);Save.set('ts_endings',e)}},
  getEndings:function(){return Save.get('ts_endings',[])},
  getSessions:function(){return Save.get('ts_sessions',0)},
  incSession:function(){var c=Save.getSessions()+1;Save.set('ts_sessions',c);return c},
  saveUsedDlg:function(ids){Save.set('ts_usedDlg',ids)},getUsedDlg:function(){return Save.get('ts_usedDlg',[])},
  saveUsedEvening:function(ids){Save.set('ts_usedEvening',ids)},getUsedEvening:function(){return Save.get('ts_usedEvening',[])},
  saveSeenArchive:function(ids){Save.set('ts_seenArchive',ids)},getSeenArchive:function(){return Save.get('ts_seenArchive',[])},
  getFacility:function(){return Save.get('ts_facility',null)},
  saveFacility:function(data){Save.set('ts_facility',data)},
  getResearch:function(){return Save.get('ts_research',null)},
  saveResearch:function(data){Save.set('ts_research',data)},
  // ═══ 스냅샷 슬롯 (1~3) — 분기 선택 도움용 수동 저장 ═══
  saveSnapshot:function(slot,data){
    var curCard=data&&data.currentCard||null;
    var curCardId=curCard&&curCard.id||null;
    var staticCard=curCardId&&typeof CARD_BY_ID!=='undefined'&&CARD_BY_ID[curCardId];
    var pack={
      version:1,
      timestamp:Date.now(),
      sessions:Save.getSessions(),
      game:Save.get('ts_game',null),
      logs:Save.get('ts_logs',['LOG-001']),
      trust:Save.get('ts_trust',null),
      usedDlg:Save.get('ts_usedDlg',[]),
      usedEvening:Save.get('ts_usedEvening',[]),
      seenArchive:Save.get('ts_seenArchive',[]),
      facility:Save.get('ts_facility',null),
      research:Save.get('ts_research',null),
      combos:Save.get('ts_combos',[]),
      evidenceUsed:Save.get('ts_evidence_used',[]),
      resourceReserveUsed:Save.get('ts_resourceReserveUsed',false)===true,
      onceShown:Save.get('ts_onceShown',[]),
      recentNews:Save.get('ts_recentNews',[]),
      recentRewards:Save.get('ts_recentRewards',[]),
      activeSpecs:(typeof normalizeActiveSpecs==='function'?normalizeActiveSpecs(Save.get('ts_activeSpecs',ACTIVE_SPECS||[])):Save.get('ts_activeSpecs',null)),
      sessionDeck:Save.get('ts_sessionDeck',null)||((typeof getActiveSessionDeck==='function')?getActiveSessionDeck():null),
      currentCardId:curCardId,
      currentCard:staticCard?null:curCard,
      label:data&&data.label||('DAY '+((data&&data.day)||'?')+' · ACT '+((data&&data.act)||'?'))
    };
    Save.set('ts_snap_'+slot,pack);
    return pack;
  },
  getSnapshot:function(slot){return Save.get('ts_snap_'+slot,null)},
  deleteSnapshot:function(slot){Save.del('ts_snap_'+slot)},
  listSnapshots:function(){return[1,2,3].map(function(n){return{slot:n,data:Save.get('ts_snap_'+n,null)}})},
  loadSnapshot:function(slot){
    var pack=Save.get('ts_snap_'+slot,null);if(!pack)return null;
    Save.del('ts_activeMission');['ts_resumePhase','ts_pendingBriefing','ts_resumeHeadlines','ts_resumeRewards','ts_resumeDialogueIndex','ts_eveningLineState'].forEach(function(k){Save.del(k)});
    if(pack.game){
      var fixedGame=normalizeGameSave(pack.game);
      var normalized=!!(fixedGame&&fixedGame.__normalized===true);
      pack.game=cleanGameSaveMeta(fixedGame);
      if(normalized){pack.currentCardId=null;pack.currentCard=null}
      var packAct=pack.game&&pack.game.act||1;
      if(pack.currentCardId&&typeof CARD_BY_ID!=='undefined'){
        var savedCard=CARD_BY_ID[pack.currentCardId];
        if(savedCard&&savedCard.act&&savedCard.act.indexOf(packAct)<0){pack.currentCardId=null;pack.currentCard=null}
      }else if(pack.currentCard&&pack.currentCard.act&&pack.currentCard.act.indexOf(packAct)<0){
        pack.currentCard=null;
      }
      Save.set('ts_game',pack.game)
    }else Save.del('ts_game');
    if(pack.logs){pack.logs=sanitizeSnapshotLogsForGame(pack.logs,pack.game,normalized);pack.logs=migrateOnceShownLogs(pack.logs,pack.onceShown||[]);pack.logs=ensureProgressLogsForGame(pack.logs,pack.game);Save.set('ts_logs',pack.logs)}
    if(pack.trust)Save.set('ts_trust',pack.trust);else Save.del('ts_trust');
    Save.set('ts_usedDlg',pack.usedDlg||[]);
    Save.set('ts_usedEvening',pack.usedEvening||[]);
    Save.set('ts_seenArchive',pack.seenArchive||[]);
    if(pack.facility)Save.set('ts_facility',pack.facility);else Save.del('ts_facility');
    if(pack.research)Save.set('ts_research',pack.research);else Save.del('ts_research');
    if(pack.combos)Save.set('ts_combos',pack.combos);else Save.del('ts_combos');
    if(pack.evidenceUsed)Save.set('ts_evidence_used',pack.evidenceUsed);else Save.del('ts_evidence_used');
    if(Object.prototype.hasOwnProperty.call(pack,'resourceReserveUsed')){if(pack.resourceReserveUsed===true)Save.set('ts_resourceReserveUsed',true);else Save.del('ts_resourceReserveUsed')}else Save.del('ts_resourceReserveUsed');
    Save.set('ts_onceShown',pack.onceShown||[]);
    Save.set('ts_recentNews',pack.recentNews||[]);
    Save.set('ts_recentRewards',pack.recentRewards||[]);
    if(pack.activeSpecs){ACTIVE_SPECS=typeof normalizeActiveSpecs==='function'?normalizeActiveSpecs(pack.activeSpecs):pack.activeSpecs;if(ACTIVE_SPECS.length>=2)Save.set('ts_activeSpecs',ACTIVE_SPECS);else{Save.del('ts_activeSpecs');if(typeof initActiveSpecs==='function')initActiveSpecs()}}else{Save.del('ts_activeSpecs');if(typeof initActiveSpecs==='function')initActiveSpecs();else ACTIVE_SPECS=[]}
    var restoredDeck=pack.sessionDeck||(pack.game&&pack.game.sessionDeck)||null;
    if(restoredDeck){Save.set('ts_sessionDeck',restoredDeck);if(typeof setActiveSessionDeck==='function')setActiveSessionDeck(restoredDeck)}
    else{Save.del('ts_sessionDeck');if(typeof clearSessionDeck==='function')clearSessionDeck()}
    return pack;
  },
  // ═══ 업적 ═══
  getAchievements:function(){return Save.get('ts_achievements',[])},
  saveAchievements:function(ids){Save.set('ts_achievements',ids)}
};

var SFX={
  ctx:null,masterGain:null,vol:0.5,muted:false,_cache:{},
  init:function(){if(!this.ctx)try{this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.masterGain=this.ctx.createGain();this.masterGain.connect(this.ctx.destination);var sv=Save.get('ts_sfxVol',null);if(sv!==null)this.vol=sv/100}catch(e){}},
  _out:function(){return this.masterGain||this.ctx.destination},
  tone:function(freq,dur,type,vol){this.init();if(!this.ctx||this.muted)return;var o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type||'sine';o.frequency.value=freq;var v=(vol||0.15)*this.vol;g.gain.setValueAtTime(v,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+dur);o.connect(g);g.connect(this._out());o.start();o.stop(this.ctx.currentTime+dur)},
  noise:function(dur,vol){this.init();if(!this.ctx||this.muted)return;var buf=this.ctx.createBuffer(1,this.ctx.sampleRate*dur,this.ctx.sampleRate),d=buf.getChannelData(0);var v=(vol||0.08)*this.vol;for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*v;var s=this.ctx.createBufferSource();s.buffer=buf;var g=this.ctx.createGain();g.gain.setValueAtTime(v,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+dur);s.connect(g);g.connect(this._out());s.start()},
  playFile:function(name,vol,maxDur){try{if(this.muted)return;if(typeof SFX_PATHS==='undefined'||!SFX_PATHS[name])return;var a=this._cache[name];if(!a){a=new Audio(SFX_PATHS[name]);a.preload='auto';this._cache[name]=a;}a.volume=Math.min(1,(vol||0.6)*this.vol);try{a.pause();a.currentTime=0;}catch(e){}if(maxDur){var _a=a;setTimeout(function(){try{_a.pause();_a.currentTime=0;}catch(e){}},maxDur*1000);}a.play().catch(function(){});}catch(e){}},
  play:function(name){try{var self=this;switch(name){
    case'swipe':self.playFile('swipe',0.7);break;
    case'alarm':self.playFile('alarm',0.8);break;
    case'btn_on':self.playFile('btn_on',0.6);break;
    case'btn_off':self.playFile('btn_off',0.6);break;
    case'check':self.playFile('check',0.8);break;
    case'radio':self.playFile('radio',0.5);break;
    case'reload':self.playFile('reload',0.7,3);break;
    case'rifle':self.playFile('rifle',0.7);break;
    case'news':self.playFile('radio',0.4);break;
    case'mission':self.playFile('reload',0.7,3);break;
    case'gameover':self.playFile('rifle',0.8);setTimeout(function(){self.tone(150,0.5,'sawtooth',0.08)},400);break;
    case'dialogue':self.tone(500,0.1,'sine',0.08);setTimeout(function(){self.tone(700,0.12,'sine',0.06)},80);break;
    case'reward':self.tone(400,0.1,'sine',0.1);setTimeout(function(){self.tone(600,0.1,'sine',0.08)},100);setTimeout(function(){self.tone(800,0.15,'sine',0.06)},200);break;
    case'glitch':self.noise(0.15,0.1);self.tone(60,0.1,'square',0.08);break;
  }}catch(e){}}
};
