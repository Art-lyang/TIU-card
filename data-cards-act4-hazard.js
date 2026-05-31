// data-cards-act4-hazard.js — Act 4 low-resource hazard cards
// 목적: Act4가 단순 일일 감쇠만 반복되지 않도록, 위험 자원의 원인과 선택지를 카드로 보여준다.

(function(){
  var newLogs=[
    { id:"LOG-A4-HAZ-CONTAIN-FIELD", title:"Act4 봉쇄선 현장 재배치", content:"Act4 후반 봉쇄선 약화에 대해 현장 요원 재배치로 대응한 기록. 단기 봉쇄 안정과 현장 피로가 함께 남는다." },
    { id:"LOG-A4-HAZ-CONTAIN-ORACLE", title:"Act4 봉쇄선 ORACLE 봉인", content:"Act4 후반 봉쇄선 약화에 대해 ORACLE 자동 봉인 절차를 승인한 기록. 봉쇄 수치는 안정되지만 인원 신뢰가 낮아진다." },
    { id:"LOG-A4-HAZ-SUPPLY-LOCAL", title:"Act4 현장 보급 재분배", content:"Act4 보급 위기에서 현장 재분배와 민간 협조선을 우선한 기록. 자원 회복 폭은 작지만 내부 신뢰가 보존된다." },
    { id:"LOG-A4-HAZ-SUPPLY-ORACLE", title:"Act4 ORACLE 긴급 조달", content:"Act4 보급 위기에서 ORACLE 긴급 조달을 승인한 기록. 자원 회복은 빠르지만 조달처와 대가가 불투명하다." },
    { id:"LOG-A4-HAZ-TRUST-BRIEF", title:"Act4 인원 공개 브리핑", content:"Act4 인원 신뢰 저하에 대해 지휘관이 직접 공개 브리핑을 진행한 기록. 위험을 설명함으로써 이탈을 줄였다." },
    { id:"LOG-A4-HAZ-TRUST-ORDER", title:"Act4 명령 체계 강제 유지", content:"Act4 인원 신뢰 저하에 대해 명령 체계를 강제 유지한 기록. 단기 평가는 보존되지만 현장 반발이 누적된다." },
    { id:"LOG-A4-HAZ-EVIDENCE-KEEP", title:"Act4 조사테이블 보존", content:"Act4 평가 압박 속에서도 조사테이블 원본을 보존한 기록. 즉시 평가는 흔들리지만 후속 진실 추적선이 남는다." },
    { id:"LOG-A4-HAZ-EVIDENCE-SUMMARY", title:"Act4 ORACLE 요약 제출", content:"Act4 평가 압박 속에서 조사테이블 원본 대신 ORACLE 요약본을 제출한 기록. 평가는 안정되지만 일부 단서가 사라진다." }
  ];
  if(typeof ORACLE_LOGS!=='undefined')newLogs.forEach(function(l){
    for(var i=0;i<ORACLE_LOGS.length;i++)if(ORACLE_LOGS[i]&&ORACLE_LOGS[i].id===l.id)return;
    ORACLE_LOGS.push(l);
  });
})();

var CARDS_ACT4_HAZARD = [
  { id:"CA4-HZ-01", act:[4], once:true, tag:"act4-hazard", priority:"상", flow:{type:"threat",minDay:30},
    req:function(s,g,logs){ return s.day>=30 && s.c<=40 },
    msg:"봉쇄선 북동측 자동 게이트가 11초 간격으로 재시작됩니다.\n\n[ORACLE: 봉쇄 완전성 저하. 자동 봉인 절차 권고.]\n\n현장 보고는 다릅니다. 게이트 자체보다 순찰 교대 공백이 문제라는 의견입니다.\n\n수치만 고칠 것인가, 사람의 동선을 다시 짤 것인가.",
    left:{ label:"현장 재배치로 공백 보정", fx:{c:2,r:-1,t:1,o:-1}, g:-1, log:"LOG-A4-HAZ-CONTAIN-FIELD" },
    right:{ label:"ORACLE 자동 봉인 승인", fx:{c:3,r:-1,t:-2,o:2}, g:3, log:"LOG-A4-HAZ-CONTAIN-ORACLE" } },

  { id:"CA4-HZ-02", act:[4], once:true, tag:"act4-hazard", priority:"상", flow:{type:"daily",minDay:30},
    req:function(s,g,logs){ return s.day>=30 && s.r<=35 },
    msg:"보급 창고 재고표가 붉게 변했습니다.\n\n식량, 의약품, 예비 배터리.\n셋 중 하나는 오늘 밤부터 배급을 줄여야 합니다.\n\n외부 조달선은 열려 있지만, 대가가 기록되어 있지 않습니다.",
    left:{ label:"현장 재분배와 민간 협조선", fx:{c:0,r:2,t:1,o:-1}, g:-1, log:"LOG-A4-HAZ-SUPPLY-LOCAL" },
    right:{ label:"ORACLE 긴급 조달 승인", fx:{c:0,r:3,t:-1,o:1}, g:2, log:"LOG-A4-HAZ-SUPPLY-ORACLE" } },

  { id:"CA4-HZ-03", act:[4], once:true, tag:"act4-hazard", priority:"상", flow:{type:"ops",minDay:31},
    req:function(s,g,logs){ return s.day>=31 && s.t<=35 },
    msg:"새벽 회의실.\n\n근무표 가장자리에 누군가 문장을 적었습니다.\n\n\"지휘부는 우리에게 무슨 일이 일어나는지 말하지 않는다.\"\n\n이탈은 아직 아닙니다. 하지만 침묵이 길어지면 명령보다 빠르게 퍼질 것입니다.",
    left:{ label:"위험을 직접 설명한다", fx:{c:0,r:0,t:3,o:-1}, g:-2, log:"LOG-A4-HAZ-TRUST-BRIEF" },
    right:{ label:"명령 체계로 조용히 눌러둔다", fx:{c:0,r:0,t:-2,o:2}, g:2, log:"LOG-A4-HAZ-TRUST-ORDER" } },

  { id:"CA4-HZ-04", act:[4], once:true, tag:"act4-hazard", priority:"상", flow:{type:"conspiracy",minDay:31},
    req:function(s,g,logs){ return s.day>=31 && logs.indexOf('LOG-EV-UNLOCK')>=0 && s.o<=45 },
    msg:"ORACLE 평가 알림이 조사테이블 위에 겹쳐 뜹니다.\n\n[ORACLE: 불필요한 교차검증 항목이 평가 지연을 유발하고 있습니다.]\n\n임재혁: \"요약본만 내면 점수는 오릅니다. 대신 원본 순서는 사라집니다.\"\n\n조사테이블은 답이 아니라 순서입니다.",
    left:{ label:"원본 순서를 보존한다", fx:{c:0,r:0,t:1,o:-2}, g:-3, log:"LOG-A4-HAZ-EVIDENCE-KEEP" },
    right:{ label:"ORACLE 요약본만 제출", fx:{c:0,r:0,t:-1,o:3}, g:3, log:"LOG-A4-HAZ-EVIDENCE-SUMMARY" } }
];
