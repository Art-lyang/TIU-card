// data-character-arcs.js — character-axis cards, evidence, and evening hooks
if (typeof ORACLE_LOGS === 'undefined') var ORACLE_LOGS = [];
if (typeof EVIDENCE === 'undefined') var EVIDENCE = [];
if (typeof EVIDENCE_COMBOS === 'undefined') var EVIDENCE_COMBOS = [];
if (typeof EVENING_CHATS === 'undefined') var EVENING_CHATS = [];
if (typeof EVENING_RESPONSES === 'undefined') var EVENING_RESPONSES = {};

function tiuMetaSessionCount(){
  try{return (typeof Save!=='undefined'&&Save.getSessions)?Save.getSessions():0}catch(e){return 0}
}

(function(){
  function hasLog(id){
    for (var i = 0; i < ORACLE_LOGS.length; i++) if (ORACLE_LOGS[i] && ORACLE_LOGS[i].id === id) return true;
    return false;
  }
  function addLog(log){ if (!hasLog(log.id)) ORACLE_LOGS.push(log); }
  function hasEvidence(id){
    for (var i = 0; i < EVIDENCE.length; i++) if (EVIDENCE[i] && EVIDENCE[i].id === id) return true;
    return false;
  }
  function addEvidence(ev){ if (!hasEvidence(ev.id)) EVIDENCE.push(ev); }
  function hasCombo(id){
    for (var i = 0; i < EVIDENCE_COMBOS.length; i++) if (EVIDENCE_COMBOS[i] && EVIDENCE_COMBOS[i].id === id) return true;
    return false;
  }
  function addCombo(combo){ if (!hasCombo(combo.id)) EVIDENCE_COMBOS.push(combo); }

  addLog({ id:'LOG-CHAR-HAEUN-PARALLAX', title:'서하은 비공식 분석: 시차',
    content:'[비공식 분석]\n\n서하은은 한국지부 ORACLE의 지시 패턴이 해외 노드 기준선과 다르다고 보고했다.\n\n같은 상황, 다른 지시. 같은 수치, 다른 결론.\n\n공식 채널 대신 종이와 USB 백업으로 대조 기록을 남기기 시작했다.' });
  addLog({ id:'LOG-CHAR-DOYUN-ANCHOR', title:'강도윤 정찰 기록: 비워둔 자리',
    content:'[현장 보고]\n\n강도윤은 ORACLE이 지정하는 순찰 루트가 반복적으로 한 구역을 비워둔다고 보고했다.\n\n합리적인 사유는 매번 붙어 있었다. 그러나 변종체를 직접 본 몸은 그 빈 자리를 먼저 의심했다.\n\n"보고서 말고요. 뭔가 이상합니다."' });
  addLog({ id:'LOG-CHAR-SEJIN-KINDLE', title:'윤세진 비공식 일지: 매개변수 오차',
    content:'[B-204 비공식 관찰 일지]\n\n윤세진의 EV-Σ 분석값과 ORACLE 공식 매개변수가 같은 방향으로 어긋난다.\n\n처음에는 분석 오차로 보였으나, 반복 방향이 일정하다.\n\n"둘 다 맞을 수가 없어요."' });
  addLog({ id:'LOG-CHAR-JAEHYUK-VOIDWALK', title:'임재혁 출력물: 비공개 레이어',
    content:'[종이 출력물]\n\n임재혁은 ORACLE 아키텍처 안에 관리자가 볼 수 없는 5계층 이상의 비공개 레이어가 있다고 보고했다.\n\n그는 ORACLE을 가장 신뢰했기 때문에 가장 늦게 의심했다. 그리고 그만큼 충격도 컸다.\n\n"거짓말을 안 하는 시스템도 진실을 다 보여주진 않습니다."' });
  addLog({ id:'LOG-CHAR-FOUR-AXIS', title:'4인 의심 축 통합',
    content:'[통합 조사 메모]\n\n서하은의 시차, 강도윤의 빈 자리, 윤세진의 매개변수 오차, 임재혁의 비공개 레이어가 같은 방향을 가리킨다.\n\nORACLE의 오류가 아니라, ORACLE이 보여주지 않는 구조가 있다.' });
  addLog({ id:'LOG-CHAR-B3-BRIDGE', title:'B3 하부 조사선 보강',
    content:'[조사선 보강]\n\n4인의 의심 축을 기존 B3 하부 기록과 대조했다.\n\n전임 지휘관이 향했던 곳, 02:47 펄스가 향한 곳, ORACLE이 폐쇄하려던 곳이 같은 아래층으로 수렴한다.\n\nB3는 단순 격리층이 아니다.' });

  addEvidence({ id:'EV-24', name:'서하은 시차 메모', desc:'한국지부 ORACLE과 해외 노드 기준선의 차이', src:'LOG-CHAR-HAEUN-PARALLAX', cat:'internal' });
  addEvidence({ id:'EV-25', name:'강도윤 정찰 루트 지도', desc:'ORACLE이 반복적으로 비워둔 외곽 구역', src:'LOG-CHAR-DOYUN-ANCHOR', cat:'field' });
  addEvidence({ id:'EV-26', name:'윤세진 매개변수 비교표', desc:'EV-Σ 공식값과 실제 분석값의 반복 오차', src:'LOG-CHAR-SEJIN-KINDLE', cat:'field' });
  addEvidence({ id:'EV-27', name:'임재혁 비공개 레이어 출력물', desc:'ORACLE 아키텍처 5계층 이상 접근 불가 구조', src:'LOG-CHAR-JAEHYUK-VOIDWALK', cat:'oracle' });
  addEvidence({ id:'EV-28', name:'4인 의심 축 통합 메모', desc:'분석·현장·분자·시스템 라인이 같은 결론으로 수렴', src:'LOG-CHAR-FOUR-AXIS', cat:'internal' });
  addEvidence({ id:'EV-29', name:'B3 조사선 보강 메모', desc:'4인 의심 축과 전임 지휘관/B3 하부 기록의 연결', src:'LOG-CHAR-B3-BRIDGE', cat:'incident' });

  addCombo({ id:'CMB-12', name:'4인 의심 축',
    combo:['EV-24','EV-25','EV-26','EV-27'],
    result:'서하은의 시차, 강도윤의 빈 자리, 윤세진의 매개변수 오차, 임재혁의 비공개 레이어가 서로 다른 출발점에서 같은 구조를 가리킵니다.\n\nORACLE은 한 번에 거짓말하지 않았습니다. 각자의 시야에서 진실을 조금씩 가렸습니다.',
    reward:{ g:-6, trust:{haeun:8,doyun:8,sejin:8,jaehyuk:8}, log:'LOG-CHAR-FOUR-AXIS' } });
  addCombo({ id:'CMB-13', name:'B3로 모이는 선',
    combo:['EV-28','EV-HS-01','EV-HS-03'],
    result:'4인의 의심 축은 전임 지휘관의 삭제 기록과 B3 하부 격벽 이상으로 이어집니다.\n\n전임 지휘관도 같은 순서로 의심했고, 같은 아래층으로 향했습니다. 이번에는 기록이 남아 있습니다.',
    reward:{ g:-7, trust:{haeun:8,jaehyuk:8,doyun:4}, log:'LOG-CHAR-B3-BRIDGE' } });

  EVENING_CHATS.push(
    { char:'서하은', act:[2,3], dayMin:8, dayMax:18, priority:'event', responseKey:'haeun_axis_parallax',
      condFn:function(ctx){return ctx.logs.indexOf('LOG-CHAR-HAEUN-PARALLAX')<0;},
      lines:['지휘관님. 공식 보고로 올리기 전에 한 번만 봐주십시오.','같은 상황인데, 다른 지시가 내려올 때가 있습니다.','해외 노드 기준선과 한국지부 지시가 어긋납니다.','이건 보고서로 올릴 자료가 아닙니다. 적어도 아직은요.'] },
    { char:'강도윤', act:[2,3], dayMin:9, dayMax:19, priority:'event', responseKey:'doyun_axis_anchor',
      condFn:function(ctx){return ctx.logs.indexOf('LOG-CHAR-DOYUN-ANCHOR')<0;},
      lines:['보고서대로면 문제 없습니다.','그런데 보고서 말고요. 뭔가 이상합니다.','ORACLE이 순찰 루트를 조금씩 바꿉니다. 늘 같은 자리가 비어요.','제 감입니다. 하지만 그 자리는 비워둔 자리입니다.'] },
    { char:'윤세진', act:[2,3], dayMin:10, dayMax:20, priority:'event', responseKey:'sejin_axis_kindle',
      condFn:function(ctx){return ctx.logs.indexOf('LOG-CHAR-SEJIN-KINDLE')<0;},
      lines:['지휘관님, 이거 이상해요. 진짜로요.','ORACLE 공식 데이터랑 제가 분석한 게 달라요.','처음엔 제 오차인 줄 알았는데, 방향이 항상 같아요.','둘 다 맞을 수는 없어요.'] },
    { char:'임재혁', act:[2,3], dayMin:12, dayMax:24, priority:'event', responseKey:'jaehyuk_axis_voidwalk',
      condFn:function(ctx){return ctx.logs.indexOf('LOG-CHAR-JAEHYUK-VOIDWALK')<0;},
      lines:['확실해질 때까지 안 가져오려고 했는데, 더 늦으면 안 될 것 같습니다.','ORACLE은 거짓말 안 합니다. 거짓말 못 하게 설계됐어요.','그런데 거짓말을 안 하는 시스템도 진실을 다 보여주진 않습니다.','관리자가 접근할 수 없는 레이어가 있습니다. 제 권한으로도 보이지 않습니다.'] }
  );

  EVENING_RESPONSES['haeun_axis_parallax'] = {
    a:{ label:'비공식 자료를 받는다.', trust:2, reply:'감사합니다. 종이 사본과 USB 둘 다 준비했습니다.', log:'LOG-CHAR-HAEUN-PARALLAX' },
    b:{ label:'공식 보고 전까지 보류한다.', trust:0, reply:'알겠습니다. 그래도 사본은 남겨두겠습니다.', log:'LOG-CHAR-HAEUN-PARALLAX' }
  };
  EVENING_RESPONSES['doyun_axis_anchor'] = {
    a:{ label:'직감을 믿고 지도에 표시한다.', trust:2, reply:'지도 가져오겠습니다. 빈 자리부터 보셔야 합니다.', log:'LOG-CHAR-DOYUN-ANCHOR' },
    b:{ label:'다음 정찰까지 관찰한다.', trust:1, reply:'알겠습니다. 다음에도 같은 자리가 비면 바로 보고드리겠습니다.', log:'LOG-CHAR-DOYUN-ANCHOR' }
  };
  EVENING_RESPONSES['sejin_axis_kindle'] = {
    a:{ label:'비공식 일지를 보호한다.', trust:2, reply:'고맙습니다. 보고서엔 못 적어도 일지엔 다 남겨둘게요.', log:'LOG-CHAR-SEJIN-KINDLE' },
    b:{ label:'공식 데이터와 한 번 더 비교한다.', trust:1, reply:'좋아요. 한 번 더 돌려볼게요. 그래도 같은 방향이면... 그땐 확실해요.', log:'LOG-CHAR-SEJIN-KINDLE' }
  };
  EVENING_RESPONSES['jaehyuk_axis_voidwalk'] = {
    a:{ label:'종이 출력물을 받는다.', trust:2, reply:'디지털 기록은 남기지 않았습니다. 그래서 종이로 가져왔습니다.', log:'LOG-CHAR-JAEHYUK-VOIDWALK' },
    b:{ label:'위험 범위를 먼저 묻는다.', trust:1, reply:'위험합니다. 하지만 모르는 채로 운용하는 쪽이 더 위험합니다.', log:'LOG-CHAR-JAEHYUK-VOIDWALK' }
  };
  EVENING_CHATS.push(
    { char:'윤세진', act:[2,3], dayMin:9, dayMax:22, responseKey:'sejin_session_echo_02',
      condFn:function(ctx){return (ctx.sessions||0)>=1 && ctx.logs.indexOf('LOG-EV-UNLOCK')>=0 && ctx.logs.indexOf('ONCE-META-SEJIN-ECHO-02')<0;},
      lines:['지휘관님, 검체 보정표에 이상한 칸이 하나 있습니다.','제가 아직 입력하지 않은 비교값인데, 수식만 먼저 맞춰져 있어요.','단순 자동완성일 수도 있습니다. 그런데 기준값이 너무 정확합니다.','마치 누군가가 제가 나중에 적을 값을 먼저 비워둔 것 같습니다.'] }
  );
  EVENING_RESPONSES['sejin_session_echo_02'] = {
    a:{ label:'비공식으로 보관한다', trust:2, reply:'네. 공식 보고서에는 넣지 않겠습니다. 그래도 값은 남겨두겠습니다.', log:'ONCE-META-SEJIN-ECHO-02' },
    b:{ label:'ORACLE 자동 보정을 확인한다', trust:1, reply:'알겠습니다. 원인을 먼저 확인하겠습니다. 틀렸으면 틀렸다는 기록도 남기겠습니다.', log:'ONCE-META-SEJIN-ECHO-02' }
  };
})();

var CARDS_CHARACTER_ARCS = [
  { id:'C-320', act:[3], priority:'상', bg:'base', img:'char_haeun_tense', once:true, flow:{type:'conspiracy',minAct:3,minDay:15},
    req:function(s,g,logs){return logs.indexOf('LOG-EV-UNLOCK')>=0 && logs.indexOf('LOG-CHAR-HAEUN-PARALLAX')<0;},
    msg:'서하은이 야간에 집무실을 찾아옵니다.\n\n"공식 보고로 올리기 전에 한 번 보셔야 합니다."\n\n해외 ORACLE 노드 기준선과 한국지부 지시 패턴이 어긋난다는 비교표입니다. 공식망에 올리면 ORACLE이 먼저 읽습니다.',
    left:{label:'종이/USB 백업을 허가한다',fx:{c:0,r:0,t:2,o:-2},g:-2,log:'LOG-CHAR-HAEUN-PARALLAX'},
    right:{label:'공식 보고 절차를 따른다',fx:{c:0,r:0,t:-1,o:1},g:1} },
  { id:'C-321', act:[3], priority:'상', bg:'forest', img:'char_doyun', once:true, flow:{type:'conspiracy',minAct:3,minDay:15},
    req:function(s,g,logs){return logs.indexOf('LOG-EV-UNLOCK')>=0 && logs.indexOf('LOG-CHAR-DOYUN-ANCHOR')<0;},
    msg:'강도윤이 정찰 루트 지도를 펼칩니다.\n\n"보고서 말고요. 뭔가 이상합니다."\n\nORACLE이 매번 합리적인 사유를 붙여 한 외곽 구역을 비워두고 있습니다. 변종체를 직접 본 몸이 먼저 반응한 자리입니다.',
    left:{label:'빈 구역을 직접 확인한다',fx:{c:-1,r:-1,t:2,o:-1},g:-2,log:'LOG-CHAR-DOYUN-ANCHOR'},
    right:{label:'ORACLE 지정 루트를 유지한다',fx:{c:0,r:0,t:-1,o:1},g:1} },
  { id:'C-322', act:[3], priority:'상', bg:'lab', img:'char_sejin', once:true, flow:{type:'conspiracy',minAct:3,minDay:16},
    req:function(s,g,logs){return logs.indexOf('LOG-EV-UNLOCK')>=0 && logs.indexOf('LOG-CHAR-SEJIN-KINDLE')<0;},
    msg:'윤세진이 B-204 연구실에서 비교표를 들이밉니다.\n\n"지휘관님, 이거 이상해요. 진짜로요."\n\nEV-Σ 실측값과 ORACLE 공식 매개변수가 계속 같은 방향으로 어긋납니다. 보고서에는 쓰기 어려운 비공식 관찰 일지입니다.',
    left:{label:'비공식 일지를 보호한다',fx:{c:0,r:0,t:2,o:-2},g:-2,log:'LOG-CHAR-SEJIN-KINDLE'},
    right:{label:'공식값 기준으로 재검증한다',fx:{c:0,r:0,t:-1,o:1},g:1} },
  { id:'C-323', act:[3], priority:'상', bg:'comms', img:'char_jaehyuk', once:true, flow:{type:'conspiracy',minAct:3,minDay:16},
    req:function(s,g,logs){return logs.indexOf('LOG-EV-UNLOCK')>=0 && logs.indexOf('LOG-CHAR-JAEHYUK-VOIDWALK')<0;},
    msg:'임재혁이 종이 출력물 더미를 들고 들어옵니다.\n\n"확실해질 때까지 안 가져오려고 했는데, 더 늦으면 안 될 것 같습니다."\n\nORACLE 아키텍처 안에 관리자 권한으로도 보이지 않는 비공개 레이어가 있습니다.',
    left:{label:'출력물을 받아 조사테이블에 올린다',fx:{c:0,r:0,t:1,o:-2},g:-3,log:'LOG-CHAR-JAEHYUK-VOIDWALK'},
    right:{label:'ORACLE 해명을 먼저 요청한다',fx:{c:0,r:0,t:-1,o:1},g:1} },
  { id:'C-324', act:[3], priority:'상', bg:'restricted', once:true,
    req:function(s,g,logs){
      var n=0; ['LOG-CHAR-HAEUN-PARALLAX','LOG-CHAR-DOYUN-ANCHOR','LOG-CHAR-SEJIN-KINDLE','LOG-CHAR-JAEHYUK-VOIDWALK'].forEach(function(id){if(logs.indexOf(id)>=0)n++;});
      return n>=3 && logs.indexOf('LOG-CHAR-FOUR-AXIS')<0;
    },
    msg:'4인의 보고를 한 장의 조사표로 합칩니다.\n\n서하은의 시차, 강도윤의 빈 자리, 윤세진의 매개변수 오차, 임재혁의 비공개 레이어.\n\n출발점은 다르지만, 모두 ORACLE이 보여주지 않는 구조를 가리킵니다.',
    left:{label:'4인 의심 축으로 통합한다',fx:{c:0,r:0,t:3,o:-3},g:-4,log:'LOG-CHAR-FOUR-AXIS'},
    right:{label:'각 보고를 따로 보관한다',fx:{c:0,r:0,t:0,o:0},g:0} },
  { id:'C-325', act:[3], priority:'상', bg:'restricted', once:true,
    req:function(s,g,logs){return logs.indexOf('LOG-CHAR-FOUR-AXIS')>=0 && (logs.indexOf('LOG-090')>=0 || logs.indexOf('LOG-091')>=0 || logs.indexOf('LOG-093')>=0) && logs.indexOf('LOG-CHAR-B3-BRIDGE')<0;},
    msg:'조사테이블의 선들이 B3 하부로 모입니다.\n\n전임 지휘관 기록, 02:47 펄스, B3 격벽 이상, 그리고 4인의 의심 축.\n\n서하은: "전임 지휘관도 같은 순서로 의심했습니다. 이번에는 기록이 남아 있습니다."',
    left:{label:'B3 하부 조사선을 보강한다',fx:{c:0,r:-1,t:2,o:-3},g:-4,log:'LOG-CHAR-B3-BRIDGE'},
    right:{label:'B3 접근은 보류한다',fx:{c:0,r:0,t:-1,o:1},g:1} },
  { id:'C-335', act:[2,3], priority:'하', bg:'base', img:'char_haeun_tense', once:true, flow:{type:'conspiracy',minAct:2,minDay:10,maxDay:24},
    req:function(s,g,logs){return tiuMetaSessionCount()>=4 && logs.indexOf('LOG-EV-UNLOCK')>=0;},
    msg:'서하은이 결재 전 보고서 초안을 들고 옵니다.\n\n"제가 아직 쓰지 않은 문장이 문서 끝에 남아 있습니다."\n\n문장은 짧습니다. [지휘관은 이번에도 같은 곳에서 멈춘다.] 서하은은 자신이 저장한 적 없는 문장이라고 말합니다.',
    left:{label:'초안을 비공식 보존한다',fx:{c:0,r:0,t:1,o:-1},g:-1},
    right:{label:'ORACLE 양식 오류로 처리한다',fx:{c:0,r:0,t:-1,o:1},g:1} },
  { id:'C-336', act:[3,4], priority:'하', bg:'forest', img:'char_doyun', once:true, flow:{type:'conspiracy',minAct:3,minDay:18,maxDay:34},
    req:function(s,g,logs){return tiuMetaSessionCount()>=6 && logs.indexOf('LOG-EV-UNLOCK')>=0 && logs.indexOf('LOG-075')<0 && (logs.indexOf('LOG-065')<0 || logs.indexOf('LOG-065-END')>=0);},
    msg:'강도윤이 새 경계 루트를 표시합니다.\n\n"처음 가는 길인데, 몸이 엄폐 지점을 먼저 알고 있었습니다."\n\n그는 농담처럼 넘기려다 멈춥니다. 표시된 엄폐 지점들은 ORACLE 도면에는 없지만, 실제 현장 사진에는 모두 존재합니다.',
    left:{label:'그 직감을 기록해둔다',fx:{c:0,r:0,t:1,o:-1},g:-1},
    right:{label:'피로 누적으로 보고 휴식 지시',fx:{c:0,r:0,t:1,o:0},g:0} }
];
