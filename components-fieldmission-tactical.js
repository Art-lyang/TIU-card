// components-fieldmission-tactical.js — 현장임무 관제 피드 (VISUAL-LAYER-SPEC 1️⃣, 파일럿 M-007)
// 미션 노드에 선택 필드 scene 이 있으면 히어로 대신 이 뷰포트가 표시된다:
//   scene: { agents:[{x,y}], target:{x,y}, hostiles:[{x,y}], civs:[{x,y}], event:'approach|contact|combat|retreat|hold' }
// 배경(미션 히어로) 위 라이브 피드 프레임 — 핀 마커는 배경 가독성을 위해 미표시(scene.event/risk만 상태 스트립 구동).
// 표시 전용 — 게임 로직·판정에는 일절 관여하지 않는다. scene 없는 노드/미션은 기존 화면 그대로(하위호환).
function TacticalFeed(p){
  var sc=p.scene||{};
  var isEn=(typeof window!=='undefined'&&window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en');
  var evt=sc.event||'approach';
  var risk=p.risk||(evt==='combat'?'HIGH':evt==='contact'?'MEDIUM':'');
  var riskCls=/VERY/i.test(risk)?' is-vhigh':/HIGH/i.test(risk)?' is-high':'';
  var comms=evt==='combat'?(isEn?'NOISY':'교란'):(isEn?'OK':'양호');
  return h('div',{className:'tacfeed tacfeed--'+evt+(p.fxOff?' fm-no-anim':''),'aria-hidden':true},
    p.bg?h('div',{className:'tf-bg',style:{backgroundImage:'url('+p.bg+')'}}):null,
    h('div',{className:'tf-map'}),
    h('div',{className:'tf-scan'}),
    h('div',{className:'tf-head'},
      h('span',null,isEn?'TACTICAL FEED':'전술 피드'),
      h('span',{className:'tf-live'},'● LIVE')),
    h('div',{className:'tf-status'+riskCls},
      h('span',{className:'tf-vital'},'♥'),
      h('span',{className:'tf-comm'},(isEn?'COMMS ':'무전 ')+comms),
      risk?h('span',{className:'tf-risk'},(isEn?'RISK ':'위험도 ')+risk):null));
}
// 노드 choices의 risk 중 최고 등급 문자열 반환 (표시용)
function tacticalMaxRisk(node){
  try{
    var order={'VERY HIGH':4,'HIGH':3,'MEDIUM':2,'LOW':1};
    var best='';var bv=0;
    (node&&node.choices||[]).forEach(function(c){var v=order[(c.risk||'').toUpperCase()]||0;if(v>bv){bv=v;best=c.risk}});
    return best||'';
  }catch(e){return ''}
}
