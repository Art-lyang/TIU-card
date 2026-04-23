// TERMINAL SESSION — data-status-tags.js
// 시설 상태 태그 + 캐릭터 상태 태그 + 일일 브리핑 상황 문장
var tsTag=function(path,fallback){if(typeof t==='function'){var v=t(path);return(v&&v!==path)?v:fallback}return fallback};

var FACILITY_TAGS={
  c:[
    {min:70,key:'statusTags.facility.c.safe',label:'봉쇄선 안정',cls:'ftag-safe'},
    {min:40,key:'statusTags.facility.c.warn',label:'봉쇄선 경계',cls:'ftag-warn'},
    {min:20,key:'statusTags.facility.c.danger',label:'봉쇄선 균열',cls:'ftag-danger'},
    {min:0,key:'statusTags.facility.c.critical',label:'봉쇄선 붕괴 임박',cls:'ftag-critical'}
  ],
  r:[
    {min:70,key:'statusTags.facility.r.safe',label:'보급 충분',cls:'ftag-safe'},
    {min:40,key:'statusTags.facility.r.warn',label:'보급 정상',cls:'ftag-warn'},
    {min:20,key:'statusTags.facility.r.danger',label:'보급 불안정',cls:'ftag-danger'},
    {min:0,key:'statusTags.facility.r.critical',label:'보급 고갈 임박',cls:'ftag-critical'}
  ],
  t:[
    {min:70,key:'statusTags.facility.t.safe',label:'부대 결속',cls:'ftag-safe'},
    {min:40,key:'statusTags.facility.t.warn',label:'신뢰 유지',cls:'ftag-warn'},
    {min:20,key:'statusTags.facility.t.danger',label:'불만 확산',cls:'ftag-danger'},
    {min:0,key:'statusTags.facility.t.critical',label:'이탈 위험',cls:'ftag-critical'}
  ],
  o:[
    {min:70,key:'statusTags.facility.o.safe',label:'ORACLE 신뢰',cls:'ftag-safe'},
    {min:40,key:'statusTags.facility.o.warn',label:'관찰 중',cls:'ftag-warn'},
    {min:20,key:'statusTags.facility.o.danger',label:'의심 증가',cls:'ftag-danger'},
    {min:0,key:'statusTags.facility.o.critical',label:'교체 검토',cls:'ftag-critical'}
  ]
};

var getFacilityTag=function(key,val){
  var tags=FACILITY_TAGS[key];
  if(!tags)return null;
  for(var i=0;i<tags.length;i++){
    if(val>=tags[i].min)return {label:tsTag(tags[i].key,tags[i].label),cls:tags[i].cls};
  }
  var last=tags[tags.length-1];
  return {label:tsTag(last.key,last.label),cls:last.cls};
};

var CHAR_STATUS_TAGS={
  trust:{
    low:{key:'statusTags.character.trust.low',label:'경계',cls:'ctag-low'},
    mid:{key:'statusTags.character.trust.mid',label:'보통',cls:'ctag-mid'},
    high:{key:'statusTags.character.trust.high',label:'협조',cls:'ctag-high'},
    bond:{key:'statusTags.character.trust.bond',label:'신뢰',cls:'ctag-bond'}
  },
  special:[
    {char:'서하은',log:'LOG-051',key:'statusTags.character.special.haeunStay',label:'잔류 결정',cls:'ctag-special'},
    {char:'서하은',log:'LOG-052',key:'statusTags.character.special.haeunRecover',label:'데이터 복구 중',cls:'ctag-special'},
    {char:'강도윤',log:'LOG-073',key:'statusTags.character.special.doyunAlive',label:'생존',cls:'ctag-warn'},
    {char:'강도윤',log:'LOG-072',key:'statusTags.character.special.doyunWounded',label:'부상',cls:'ctag-danger'},
    {char:'윤세진',log:'LOG-RES-012',key:'statusTags.character.special.sejinResearch',label:'연구 진행',cls:'ctag-special'},
    {char:'윤세진',log:'LOG-RES-011',key:'statusTags.character.special.sejinAnalysis',label:'분석 중',cls:'ctag-special'},
    {char:'임재혁',log:'LOG-RES-001',key:'statusTags.character.special.jaehyeokTech',label:'기술 분석',cls:'ctag-special'},
    {char:'마르쿠스 베버',log:'LOG-080',key:'statusTags.character.special.weberContact',label:'접촉 성공',cls:'ctag-special'},
    {char:'닉 포스터',log:'LOG-081',key:'statusTags.character.special.fosterInfo',label:'정보 제공',cls:'ctag-special'},
    {char:'박소영',log:'LOG-083',key:'statusTags.character.special.soyoungExposed',label:'정체 발각',cls:'ctag-danger'},
    {char:'박소영',log:'LOG-082',key:'statusTags.character.special.soyoungJoined',label:'합류',cls:'ctag-special'}
  ]
};

var getCharTags=function(charName,charKey,trust,logs){
  var result=[];
  var specials=CHAR_STATUS_TAGS.special;
  for(var i=0;i<specials.length;i++){
    if(specials[i].char===charName&&logs.indexOf(specials[i].log)>=0){
      result.push({label:tsTag(specials[i].key,specials[i].label),cls:specials[i].cls});
      break;
    }
  }
  var tier=(typeof getTrustTier==='function'&&charKey)?getTrustTier(trust,charKey):'mid';
  var tag=CHAR_STATUS_TAGS.trust[tier];
  if(tag)result.push({label:tsTag(tag.key,tag.label),cls:tag.cls});
  return result;
};

var SITUATION_RULES=[
  {check:function(s,ps){return ps&&(ps.c-s.c)>=10},key:'statusTags.situation.cDrop',text:'봉쇄선 구간에서 대규모 이탈이 보고되었습니다.'},
  {check:function(s,ps){return ps&&(ps.r-s.r)>=10},key:'statusTags.situation.rDrop',text:'보급 물자가 급격히 감소하고 있습니다.'},
  {check:function(s,ps){return ps&&(ps.t-s.t)>=10},key:'statusTags.situation.tDrop',text:'요원들 사이에서 불만이 급속히 확산되고 있습니다.'},
  {check:function(s,ps){return ps&&(ps.o-s.o)>=10},key:'statusTags.situation.oDrop',text:'ORACLE 평가 지수가 급락했습니다. 주의가 필요합니다.'},
  {check:function(s,ps){return ps&&(s.c-ps.c)>=10},key:'statusTags.situation.cRise',text:'봉쇄선 보강 작업이 성공적으로 완료되었습니다.'},
  {check:function(s,ps){return ps&&(s.r-ps.r)>=10},key:'statusTags.situation.rRise',text:'대규모 보급이 도착했습니다. 자원 상태 양호.'},
  {check:function(s,ps){return ps&&(s.t-ps.t)>=10},key:'statusTags.situation.tRise',text:'요원들의 사기가 크게 올랐습니다.'},
  {check:function(s,ps){return s.c<=20&&(!ps||ps.c>20)},key:'statusTags.situation.cLow',text:'⚠ 봉쇄선이 위험 수준에 도달했습니다.'},
  {check:function(s,ps){return s.r<=20&&(!ps||ps.r>20)},key:'statusTags.situation.rLow',text:'⚠ 자원 비축량이 위험 수준입니다.'},
  {check:function(s,ps){return s.t<=20&&(!ps||ps.t>20)},key:'statusTags.situation.tLow',text:'⚠ 부대 이탈 위험이 감지되었습니다.'},
  {check:function(s,ps){return s.o<=20&&(!ps||ps.o>20)},key:'statusTags.situation.oLow',text:'⚠ ORACLE이 지휘관 교체를 검토하고 있습니다.'},
  {check:function(s,ps){return s.c<=15&&ps&&ps.c<=15},key:'statusTags.situation.cCritical',text:'봉쇄선 균열이 지속되고 있습니다. 즉각 대응이 필요합니다.'},
  {check:function(s,ps){return s.r<=15&&ps&&ps.r<=15},key:'statusTags.situation.rCritical',text:'보급 고갈 상태가 계속되고 있습니다.'},
  {check:function(s,ps,a){return a>=2&&s.day>=12&&s.c>=60&&s.r>=60},key:'statusTags.situation.actStable',text:'기지 운영이 안정적입니다. 현행 방침을 유지하십시오.'},
  {check:function(s,ps,a){return a>=3&&s.c<=40&&s.r<=40},key:'statusTags.situation.actCrisis',text:'복합 위기 상황입니다. 모든 부서의 협력이 필요합니다.'}
];

var getSituationLines=function(stats,prevStats,act){
  var lines=[];
  for(var i=0;i<SITUATION_RULES.length;i++){
    try{
      if(SITUATION_RULES[i].check(stats,prevStats,act)) lines.push(tsTag(SITUATION_RULES[i].key,SITUATION_RULES[i].text));
    }catch(e){}
    if(lines.length>=3)break;
  }
  return lines;
};
