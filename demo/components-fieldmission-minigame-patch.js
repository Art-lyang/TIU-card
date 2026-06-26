var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef;

function FieldMission(p){
  var mission=MISSIONS[p.missionId];
  var tr=p.trust||{};
  var s1=useState('start'),nodeId=s1[0],setNodeId=s1[1];
  var s2=useState(''),textShown=s2[0],setTextShown=s2[1];
  var s3=useState(false),showChoices=s3[0],setShowChoices=s3[1];
  var s4=useState(null),activeMiniGame=s4[0],setActiveMiniGame=s4[1];
  var s5=useState(null),pendingChoice=s5[0],setPendingChoice=s5[1];
  var s6=useState(null),missionBonus=s6[0],setMissionBonus=s6[1];
  var s7=useState(null),missionNarrative=s7[0],setMissionNarrative=s7[1];
  var s8=useState(true),briefOpen=s8[0],setBriefOpen=s8[1];
  var s9=useState(false),reportOpen=s9[0],setReportOpen=s9[1]; // ANALYSIS REPORT 기본 접힘
  var briefRef=useRef(null);
  var rootRef=useRef(null);
  var completedRef=useRef(false); // 미션 종료 onComplete 중복 호출 가드(더블클릭/더블탭 시 result 이중 적용 방지)
  var riskBonusRef=useRef(null); // 비미니게임 위험 선택 d100 판정 보너스(접근→종료까지 보관)
  var sRoll=useState(null),lastRoll=sRoll[0],setLastRoll=sRoll[1]; // 직전 판정 결과 배너용
  // 미니게임 진입 시 화면을 상단으로 스냅 — 절대배치 오버레이가 직전 스크롤 위치에 가려지지 않게(몰입도)
  useEffect(function(){ if(activeMiniGame&&rootRef.current){ rootRef.current.scrollTop=0; } },[activeMiniGame]);

  function getMissionI18nKey(missionId,nodeId){
    return missionId+'_'+nodeId;
  }
  function resolveLocalePatch(patch){
    if(!patch)return null;
    var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
    if(patch[locale])return Object.assign({},patch,patch[locale]);
    return patch;
  }
  function localizeMissionNode(mission,node,nodeId){
    var missionKey=mission.id||p.missionId;
    var key=getMissionI18nKey(mission.id||p.missionId,nodeId);
    var missionLoc=(typeof tc==='function')?tc('missions',missionKey,null):null;
    var loc=(typeof tc==='function')?tc('missions',key,null):null;
    if(!loc&&missionLoc&&missionLoc.nodes)loc=missionLoc.nodes[nodeId]||null;
    var out=Object.assign({},node);
    var staticMission=(typeof FIELD_MISSION_NODE_OVERRIDES!=='undefined'&&FIELD_MISSION_NODE_OVERRIDES)?FIELD_MISSION_NODE_OVERRIDES[missionKey]:null;
    var staticOverride=resolveLocalePatch(staticMission?staticMission[nodeId]:null);
    if(loc&&loc.text)out.text=loc.text;
    if(loc&&loc.choices&&Array.isArray(node.choices)){
      out.choices=node.choices.map(function(choice,idx){
        var patch=loc.choices[idx]||{};
        if(typeof patch==='string')patch={label:patch};
        return Object.assign({},choice,patch);
      });
    }
    if(staticOverride){
      if(staticOverride.text)out.text=staticOverride.text;
      else if(staticOverride.textSuffix)out.text=(out.text||'')+'\n\n'+staticOverride.textSuffix;
      if(staticOverride.endLabel&&out.choices&&out.choices.length){
        out.choices=out.choices.map(function(choice,idx){
          if(idx!==0||choice.next!=='end')return choice;
          return Object.assign({},choice,{label:staticOverride.endLabel});
        });
      }
    }
    var localizedNarrative=resolveLocalePatch(missionNarrative);
    if(localizedNarrative&&localizedNarrative.nodeId===nodeId){
      if(localizedNarrative.text)out.text=localizedNarrative.text;
      else if(localizedNarrative.textSuffix)out.text=(out.text||'')+'\n\n'+localizedNarrative.textSuffix;
      if(localizedNarrative.endLabel&&out.choices&&out.choices.length){
        out.choices=out.choices.map(function(choice,idx){
          if(idx!==0||choice.next!=='end')return choice;
          return Object.assign({},choice,{label:localizedNarrative.endLabel});
        });
      }
    }
    return out;
  }
  function localizeMissionTitle(mission){
    var missionKey=mission.id||p.missionId;
    var missionLoc=(typeof tc==='function')?tc('missions',missionKey,null):null;
    return missionLoc&&missionLoc.title?missionLoc.title:mission.title;
  }
  function getMissionImage(mid){
    var heroMap={
      'M-001':IMG.mission_m001,
      'M-002':IMG.mission_m002,
      'M-003':IMG.mission_m003,
      'M-004':IMG.mission_m004,
      'M-005':IMG.mission_m005,
      'M-006':IMG.mission_m006,
      'M-007':IMG.mission_m007,
      'M-008':IMG.mission_m008,
      'M-009':IMG.mission_m009,
      'M-010':IMG.mission_m010,
      'MI-01':IMG.incident_mi01,
      'MI-02':IMG.incident_mi02,
      'MI-03':IMG.incident_mi03,
      'MI-04':IMG.incident_mi04,
      'MI-05':IMG.incident_mi05
    };
    if(heroMap[mid])return heroMap[mid];
    return mid==='M-001'?IMG.spec_012_bloodpit:
      mid==='M-002'?IMG.spec_011_shelltalker:
      mid==='M-004'?IMG.spec_001_mannequin:
      mid==='M-005'?IMG.spec_003_brood:
      mid==='M-006'?IMG.spec_008_spore:
      mid==='M-009'?IMG.spec_004_seedspreader:
      mid==='M-010'?IMG.spec_015_brainseeker:null;
  }
  var node=localizeMissionNode(mission,mission.nodes[nodeId],nodeId);
  var missionTitle=localizeMissionTitle(mission);
  var mImg=getMissionImage(p.missionId);

  useEffect(function(){
    setNodeId('start');
    setActiveMiniGame(null);
    setPendingChoice(null);
    setMissionBonus(null);
    setMissionNarrative(null);
    completedRef.current=false;
  },[p.missionId]);

  var choiceLabelSignature=(node.choices||[]).map(function(c){ return c.label||''; }).join('||');

  useEffect(function(){
    setTextShown('');
    setShowChoices(false);
    var i=0;
    var txt=node.text;
    var t=setInterval(function(){
      if(i<txt.length){i++;setTextShown(txt.substring(0,i));}
      else{clearInterval(t);setTimeout(function(){setShowChoices(true);},400);}
    },25);
    return function(){clearInterval(t);};
  },[nodeId,node.text,choiceLabelSignature]);

  // BRIEFING 박스 내부 스크롤: 타이핑 중엔 최신 줄을 따라가고, 완료되면 상단으로 리셋해 처음부터 읽히게 한다.
  useEffect(function(){ if(!briefRef.current)return; briefRef.current.scrollTop=showChoices?0:briefRef.current.scrollHeight; },[textShown,briefOpen,showChoices]);

  function finalizeChoice(choice,extraBonus){
    if(choice.next==='end'){
      if(completedRef.current)return; // 이미 완료 처리됨 — 중복 호출(더블클릭) 차단
      completedRef.current=true;
      var bonus=(extraBonus!==undefined)?extraBonus:missionBonus;
      if(riskBonusRef.current){bonus=mergeMissionBonus(bonus||{},riskBonusRef.current);riskBonusRef.current=null;}
      p.onComplete(mergeMissionBonus(choice,bonus));
      return;
    }
    setNodeId(choice.next);
  }

  function handleChoice(choice){
    var miniConfig=getFieldMiniGameConfig(mission.id||p.missionId,nodeId,choice.next);
    if(miniConfig&&!missionBonus){
      setPendingChoice(choice);
      if(typeof markMinigameSeen==='function')markMinigameSeen(miniConfig.type);
      setActiveMiniGame(miniConfig);
      return;
    }
    // 미니게임이 없는 위험 선택 → d100 판정으로 결과 변동(접근 선택에서 굴리고 종료 시 결과에 병합)
    if(choice.risk&&!missionBonus){var rr=rollRiskOutcome(choice);if(rr){riskBonusRef.current=rr.bonus;setLastRoll(rr);}}
    finalizeChoice(choice);
  }

  function getTrustAssist(choice){
    if(!choice||!choice.trustReq)return null;
    var keys=Object.keys(choice.trustReq);
    if(!keys.length)return null;
    return { char:keys[0], source:'trust_route', rankBoost:1 };
  }

  function boostRank(rank,assist){
    if(!assist||!assist.rankBoost)return rank;
    if(rank==='partial')return 'success';
    if(rank==='success')return 'great';
    return rank;
  }
  // 비미니게임 위험 선택 d100 판정 — risk를 실제 성공률로(신뢰 보정), 결과에 변동(보너스/페널티)을 준다.
  function rollRiskOutcome(choice){
    var risk=(choice&&choice.risk||'').toUpperCase();
    if(risk!=='LOW'&&risk!=='MEDIUM'&&risk!=='HIGH')return null; // 위험도 없는 선택은 결정론적 유지
    var target=risk==='LOW'?85:risk==='MEDIUM'?70:55;
    if(choice.trustReq){var ck=Object.keys(choice.trustReq)[0];var tv=(p.trust&&p.trust[ck])||0;target+=tv>=65?10:tv>=50?5:0;}
    target=Math.max(40,Math.min(95,target));
    var roll=Math.floor(Math.random()*100)+1;
    var tier=roll<=5?'great':(roll<=target?'success':(roll>=96?'critfail':'partial'));
    var delta=tier==='great'?{r:1,t:1}:tier==='partial'?{r:-1}:tier==='critfail'?{c:-1,r:-1,t:-1}:{};
    return {tier:tier,roll:roll,risk:risk,bonus:{result:delta}};
  }
  function rollBanner(rr){
    var isEn=locale==='en';
    var label=rr.tier==='great'?(isEn?'CRITICAL SUCCESS':'대성공'):rr.tier==='success'?(isEn?'SUCCESS':'성공'):rr.tier==='partial'?(isEn?'PARTIAL':'부분 성공'):(isEn?'SETBACK':'차질 발생');
    var note=rr.tier==='great'?(isEn?'bonus secured':'추가 성과'):rr.tier==='partial'?(isEn?'extra cost':'자원 추가 소모'):rr.tier==='critfail'?(isEn?'losses incurred':'손실 발생'):'';
    var cls=rr.tier==='great'?'fm-roll--great':rr.tier==='critfail'?'fm-roll--fail':rr.tier==='partial'?'fm-roll--partial':'fm-roll--ok';
    return h('div',{className:'fm-roll-banner '+cls},
      h('span',{className:'fm-roll-tag'},isEn?'JUDGMENT':'판정'),
      h('b',{className:'fm-roll-tier'},label),
      h('span',{className:'fm-roll-d'},'d100 '+rr.roll),
      note&&h('span',{className:'fm-roll-note'},'· '+note));
  }

  function handleMiniGameDone(rank){
    var assist=getTrustAssist(pendingChoice);
    var finalRank=boostRank(rank,assist);
    var baseReward=getFieldMiniGameReward(mission.id||p.missionId,finalRank)||null;
    var nextNodeId=pendingChoice?pendingChoice.next:null;
    var narrative=nextNodeId?getFieldMiniGameNarrative(mission.id||p.missionId,nextNodeId,finalRank):null;
    var reward=Object.assign({},baseReward||{},{ miniGame:{
      missionId: mission.id||p.missionId,
      nodeId: nextNodeId,
      rank: finalRank,
      originalRank: rank,
      type: activeMiniGame?(activeMiniGame.followupType||activeMiniGame.type):null,
      key: activeMiniGame?(activeMiniGame.followupKey||activeMiniGame.key):null,
      trustAssist: assist
    }});
    if(reward)setMissionBonus(reward);
    setMissionNarrative(narrative?Object.assign({nodeId:nextNodeId},narrative):null);
    setActiveMiniGame(null);
    if(pendingChoice){
      var nextChoice=pendingChoice;
      setPendingChoice(null);
      finalizeChoice(nextChoice,reward);
    }
  }

  var missionLogs=Array.isArray(p.logs)?p.logs:[];
  var visChoices=node.choices.filter(function(c){
    if(c.blockLog&&missionLogs.indexOf(c.blockLog)>=0)return false;
    if(Array.isArray(c.blockLogs)){
      for(var bi=0;bi<c.blockLogs.length;bi++){if(missionLogs.indexOf(c.blockLogs[bi])>=0)return false;}
    }
    if(!c.trustReq)return true;
    for(var k in c.trustReq){if((tr[k]||0)<c.trustReq[k])return false;}
    return true;
  });

  useEffect(function(){
    var onKey=function(e){
      if(activeMiniGame||!showChoices)return;
      var idx=-1;
      if(/^[1-9]$/.test(e.key))idx=parseInt(e.key,10)-1;
      else if(e.code&&/^Numpad[1-9]$/.test(e.code))idx=parseInt(e.code.slice(6),10)-1;
      if(idx>=0&&idx<visChoices.length){e.preventDefault();handleChoice(visChoices[idx]);}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey);};
  },[showChoices,visChoices,activeMiniGame,missionBonus]);

  // ── HUD dossier 렌더 (시안 기반). 데이터 필드(codename/threat/intel/report, 선택지 sub/crew/risk/icon)는 전부 optional·폴백. ──
  var act=p.act||1;
  var fxOff=(function(){try{return (typeof Save!=='undefined'&&Save.get&&Save.get('ts_fxMode',null)==='off')}catch(e){return false}})();
  var isStart=nodeId==='start';
  var codename=mission.codename||'';
  var specTag=mission.spec||'';
  var threat=mission.threat||'ACTIVE';
  // i18n: EN 로케일이면 tc('missions',id)에서 dossier(report/intel/subs)를 가져와 한국어 노출 방지. 없으면 base(KO) 폴백.
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var mLoc=(typeof tc==='function')?tc('missions',mission.id||p.missionId,null):null;
  var intel=(mLoc&&mLoc.intel)?Object.assign({},mission.intel||{},mLoc.intel):mission.intel;
  var report=(mLoc&&mLoc.report)||mission.report;
  // 헤더 중앙=코드네임(BLOOD PIT), 위협 스트립=SPEC — 중복 제거
  var headBig=codename||missionTitle;
  var headName='';
  if(codename){headName=missionTitle;if(specTag&&headName.indexOf(specTag)===0){headName=headName.slice(specTag.length).replace(/^[\s\-:]+/,'');}}
  var threatCode=specTag||'';
  function actAccent(a){return '#f0a030';} // 필드미션 색 통일(앰버/레드) — Act 틴트 미사용
  function fmIcon(name){
    var st={viewBox:'0 0 24 24',width:22,height:22,fill:'none',stroke:'currentColor',strokeWidth:1.6,strokeLinecap:'round',strokeLinejoin:'round',className:'fm-ic fm-ic--'+name};
    var stf=Object.assign({},st,{fill:'currentColor',stroke:'none'});
    if(name==='fire')return h('svg',stf,h('path',{d:'M12 21a6 6 0 0 0 6-6c0-4-4-6-4-10 0 0-3 2-3 6 0 0-2-1-2-3-2 2-3 4-3 7a6 6 0 0 0 6 6z'}));
    if(name==='flask')return h('svg',st,h('path',{d:'M9 2h6'}),h('path',{d:'M10 2v7l-4.3 8.6A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.3-2.4L14 9V2'}),h('path',{d:'M7.5 15h9'}));
    if(name==='dish')return h('svg',st,h('path',{d:'M3 21l5-5'}),h('path',{d:'M5 14a10 10 0 0 1 10-10'}),h('path',{d:'M8 14a6 6 0 0 1 6-6'}),h('circle',{cx:16.5,cy:7.5,r:1.3,fill:'currentColor',stroke:'none'}));
    if(name==='shield')return h('svg',st,h('path',{d:'M12 3l7 2.5v5.5c0 4.2-2.9 7.3-7 8.5-4.1-1.2-7-4.3-7-8.5V5.5z'}));
    if(name==='seal')return h('svg',st,h('rect',{x:5,y:11,width:14,height:9,rx:1.5}),h('path',{d:'M8 11V8a4 4 0 0 1 8 0v3'}),h('circle',{cx:12,cy:15,r:1.1,fill:'currentColor',stroke:'none'}));
    if(name==='water')return h('svg',st,h('path',{d:'M3 9c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 3.8-1.6 5-1.5'}),h('path',{d:'M3 15c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 3.8-1.6 5-1.5'}));
    if(name==='exit')return h('svg',st,h('path',{d:'M13 4h6v16h-6'}),h('path',{d:'M3 12h11'}),h('path',{d:'M8.5 7l5 5-5 5'}));
    if(name==='light')return h('svg',st,h('circle',{cx:12,cy:12,r:3.4}),h('path',{d:'M12 2v2.4 M12 19.6V22 M2 12h2.4 M19.6 12H22 M5 5l1.7 1.7 M17.3 17.3 19 19 M19 5l-1.7 1.7 M6.7 17.3 5 19'}));
    if(name==='person')return h('svg',st,h('circle',{cx:12,cy:8,r:3.5}),h('path',{d:'M5.5 20a6.5 6.5 0 0 1 13 0'}));
    if(name==='wave')return h('svg',st,h('circle',{cx:5,cy:12,r:1.4,fill:'currentColor',stroke:'none'}),h('path',{d:'M9 9a5 5 0 0 1 0 6'}),h('path',{d:'M12.5 6a9 9 0 0 1 0 12'}),h('path',{d:'M16 3.5a13 13 0 0 1 0 17'}));
    if(name==='sensor')return h('svg',st,h('path',{d:'M4 17a8 8 0 0 1 16 0'}),h('path',{d:'M12 17l5-4.5'}),h('circle',{cx:12,cy:17,r:1.3,fill:'currentColor',stroke:'none'}));
    if(name==='eye')return h('svg',st,h('path',{d:'M2 12s3.5-6.5 10-6.5 10 6.5 10 6.5-3.5 6.5-10 6.5S2 12 2 12z'}),h('circle',{cx:12,cy:12,r:2.5}));
    if(name==='tool')return h('svg',st,h('circle',{cx:12,cy:12,r:3}),h('path',{d:'M12 4.5v2 M12 17.5v2 M4.5 12h2 M17.5 12h2 M6.7 6.7l1.4 1.4 M15.9 15.9l1.4 1.4 M17.3 6.7l-1.4 1.4 M8.1 15.9l-1.4 1.4'}));
    if(name==='track')return h('svg',stf,h('ellipse',{cx:9,cy:8.5,rx:2,ry:3,transform:'rotate(-18 9 8.5)'}),h('ellipse',{cx:14.5,cy:15,rx:2,ry:3,transform:'rotate(-18 14.5 15)'}));
    return h('svg',st,h('circle',{cx:12,cy:12,r:7}),h('path',{d:'M12 2v3 M12 19v3 M2 12h3 M19 12h3'})); // crosshair = 사격/무력화/제거(기본)
  }
  // 선택지 텍스트(부제+라벨) 키워드로 아이콘 자동 매핑 — 내용 정합. c.icon은 더 이상 사용하지 않음.
  function pickIcon(c){
    var s=((c&&c.sub)||'')+' '+((c&&c.label)||'');
    if(/ORACLE|원격|위임|전술 지원|보안 패치|정비/.test(s))return 'dish';
    if(/소각|화염|소독/.test(s))return 'fire';
    if(/봉인|봉쇄|차단/.test(s))return 'seal';
    if(/차폐|방호|검역|방어/.test(s))return 'shield';
    if(/배수|수중|침수/.test(s))return 'water';
    if(/후퇴|철수/.test(s))return 'exit';
    if(/조명|섬광/.test(s))return 'light';
    if(/면담|심문|인터뷰/.test(s))return 'person';
    if(/교란|음향|음원|신호|주파수/.test(s))return 'wave';
    if(/계측|장비 설치|센서/.test(s))return 'sensor';
    if(/감시|관측|트랩|감시망|정찰/.test(s))return 'eye';
    if(/물리 제거|하드웨어|추출/.test(s))return 'tool';
    if(/표본|포획|생포|확보|연구|배양|샘플/.test(s))return 'flask';
    if(/추적|수색|동선|경로|조사/.test(s))return 'track';
    return 'crosshair';
  }
  function opTitle(c){var s=(c.label||'').replace(/^[▸\s]+/,'');var i=s.indexOf('—');return i>=0?s.slice(0,i).trim():s.trim();}
  function opSub(c){var lbl=(c.label||'');var i=lbl.indexOf('—');if(i>=0)return lbl.slice(i+1).trim();if(mLoc&&mLoc.subs&&mLoc.subs[c.next])return mLoc.subs[c.next];return c.sub||'';}
  function riskFill(r){r=(r||'').toUpperCase();return r.indexOf('VERY')>=0?9:r==='HIGH'?6:r==='MEDIUM'?4:r==='LOW'?2:5;}
  function riskCls(r){r=(r||'').toUpperCase();return r.indexOf('VERY')>=0?'fm-rk--danger':r==='HIGH'?'fm-rk--warn':'fm-rk--info';}
  function bars(n,total){var a=[];for(var k=0;k<total;k++){a.push(h('i',{key:k,className:k<n?'on':''}));}return a;}
  function metaRow(k,v){if(!v)return null;return h('div',{className:'fm-hero-metarow'},h('span',{className:'fm-hero-metak'},k),h('span',{className:'fm-hero-metav'},v));}
  function paras(cls){return (textShown||'').split('\n\n').map(function(t,i){return h('div',{key:i,className:cls+(/^\[ORACLE/.test(t)?' fm-p--oracle':'')},t);});}
  var cursor=!showChoices&&h('span',{className:'fm-cursor'},'..');

  function fmHeader(){
    return h('div',{className:'fm-head'},
      h('div',{className:'fm-head-side fm-head-l'},h('div',{className:'fm-head-proto'},'ORACLE PROTOCOL'),h('div',{className:'fm-head-line'},'FIELD SESSION')),
      h('div',{className:'fm-head-c'},
        h('div',{className:'fm-head-tag'},tt('fieldMission.title',null,'FIELD MISSION')),
        h('div',{className:'fm-head-spec'},headBig),
        headName&&h('div',{className:'fm-head-name'},headName)
      ),
      h('div',{className:'fm-head-side fm-head-r'},
        h('div',{className:'fm-head-stlbl'},'MISSION STATUS'),
        h('div',{className:'fm-head-st'+(isStart?'':' is-active')},isStart?'STANDBY':'ACTIVE'),
        h('div',{className:'fm-head-bars'},bars(isStart?2:4,6))
      )
    );
  }
  function fmThreat(){
    return h('div',{className:'fm-threat'},
      h('div',{className:'fm-threat-code'},threatCode),
      h('div',{className:'fm-threat-r'},
        h('span',{className:'fm-threat-lbl'},'THREAT LEVEL'),
        h('span',{className:'fm-threat-badge fm-threat--'+String(threat).toLowerCase().replace(/\s+/g,'')},'☢ '+threat)
      )
    );
  }
  var heroSrc=mission.hero||mImg;
  function fmHero(){
    if(!heroSrc)return null;
    return h('div',{className:'fm-hero'+(fxOff?' fm-no-anim':'')},
      h('img',{src:heroSrc,className:'fm-hero-img',alt:missionTitle}),
      h('div',{className:'fm-hero-grad'}),
      h('div',{className:'fm-hero-radar'},h('span',{className:'fm-hero-sweep'})),
      h('div',{className:'fm-hero-gauge'},bars(0,0)),
      intel&&h('div',{className:'fm-hero-meta'},metaRow('GRID',intel.grid),metaRow('DEPTH',intel.depth),metaRow('ENVIRONMENT',intel.env)),
      h('div',{className:'fm-hero-rec'},h('span',{className:'fm-hero-recdot'}),'REC')
    );
  }
  function reportCard(r,i){
    return h('div',{key:i,className:'fm-rcard fm-rcard--'+(r.level||'info')},h('div',{className:'fm-rcard-lbl'},r.label),h('div',{className:'fm-rcard-val'},r.value));
  }
  function opCard(c,i){
    var isTrust=!!c.trustReq,sub=opSub(c);
    return h('button',{key:i,className:'fm-op'+(isTrust?' fm-op--trust':''),onClick:function(){handleChoice(c);}},
      h('div',{className:'fm-op-ico'},fmIcon(pickIcon(c))),
      h('div',{className:'fm-op-body'},
        h('div',{className:'fm-op-top'},
          h('span',{className:'fm-op-num'},(i<9?'0':'')+(i+1)),
          h('span',{className:'fm-op-title'},opTitle(c)),
          isTrust&&h('span',{className:'fm-op-trusttag'},tt('fieldMission.trustTag',null,'[신뢰]'))
        ),
        sub&&h('div',{className:'fm-op-sub'},sub),
        c.risk&&h('div',{className:'fm-op-meta'},
          h('span',{className:'fm-op-riskwrap'},(locale==='en'?'RISK ':'위험도 '),h('b',{className:riskCls(c.risk)},c.risk),h('span',{className:'fm-rk '+riskCls(c.risk)},bars(riskFill(c.risk),10)))
        )
      )
    );
  }
  function nodeChoice(c,i){
    var isTrust=!!c.trustReq,isEnd=c.next==='end';
    return h('button',{key:i,className:'fm-nchoice'+(isEnd?' is-end':'')+(isTrust?' is-trust':''),onClick:function(){handleChoice(c);}},
      h('span',{className:'fm-nchoice-num'},(i+1)+''),
      isTrust&&h('span',{className:'fm-nchoice-trust'},tt('fieldMission.trustTag',null,'[신뢰]')),
      h('span',{className:'fm-nchoice-label'},c.label)
    );
  }

  var body=isStart
    ? h('div',{className:'fm-brief-wrap'},
        fmHero(),
        h('div',{className:'fm-panels'},
          h('div',{className:'fm-panel fm-panel--brief'+(briefOpen?'':' is-collapsed')},
            h('button',{className:'fm-panel-h fm-panel-toggle',onClick:function(){setBriefOpen(function(v){return !v})}},h('span',{className:'fm-panel-chev'},briefOpen?'▾':'▸'),'▤ BRIEFING'),
            briefOpen&&h('div',{className:'fm-brief-body',ref:briefRef},paras('fm-p'),cursor)
          ),
          report&&h('div',{className:'fm-panel fm-panel--report'+(reportOpen?'':' is-collapsed')},
            h('button',{className:'fm-panel-h fm-panel-toggle',onClick:function(){setReportOpen(function(v){return !v})}},h('span',{className:'fm-panel-chev'},reportOpen?'▾':'▸'),'ANALYSIS REPORT',h('span',{className:'fm-panel-count'},'('+report.length+')')),
            reportOpen&&h('div',{className:'fm-report'},report.map(reportCard))
          )
        ),
        showChoices&&h('div',{className:'fm-ops-wrap'},h('div',{className:'fm-ops-h'},'SELECT OPERATION'),h('div',{className:'fm-ops'},visChoices.map(opCard)))
      )
    : h('div',{className:'fm-node-wrap'},
        h('div',{className:'fm-panel fm-panel--report'},h('div',{className:'fm-panel-h'},'▣ FIELD REPORT'),h('div',{className:'fm-node-body'},paras('fm-np'),cursor)),
        showChoices&&lastRoll&&rollBanner(lastRoll),
        showChoices&&h('div',{className:'fm-nchoices'},visChoices.map(nodeChoice))
      );

  return h('div',{ref:rootRef,className:'screen fm-screen'+(isStart?' fm-screen--brief':' fm-screen--node')+(fxOff?' fm-no-anim':''),style:{'--fm-accent':actAccent(act)}},
    IMG.bg_restricted&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_restricted+')',opacity:0.04}}),
    h('div',{className:'fm-wrap'},
      fmHeader(),
      fmThreat(),
      body,
      h('div',{className:'fm-foot'},tt('fieldMission.footer',null,'ORACLE REMOTE TERMINAL — FIELD OPS'))
    ),
    activeMiniGame&&h(FieldMiniGameOverlay,{game:activeMiniGame,onDone:handleMiniGameDone})
  );
}
