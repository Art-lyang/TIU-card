// TERMINAL SESSION — components-briefing.js
// Briefing 화면 컴포넌트

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

function BriefingScreen(p){
  var act=p.act,stats=p.stats,transRoute=p.transRoute,onEnter=p.onEnter;
  var nm={c:'봉쇄 안정성',r:'자원 잔량',t:'인원 신뢰도',o:'ORACLE 평가'};
  var prioColor=act===3?'#ff4444':'rgba(157,255,116,.6)';
  var prioLabel=act===2?'INITIAL':act===3?'ELEVATED':'CR\u2588TICAL';
  var routeColor=transRoute==='A4_COMPLY'?'#9dff74':transRoute==='A4_GREY'?'#f0a030':transRoute==='A4_RESIST'?'#ff6644':transRoute==='A4_OBSERVER'?'#ff4444':transRoute==='D'?'#ff4444':transRoute==='A'?'#9dff74':'#f0a030';
  var borderColor=transRoute==='A4_RESIST'||transRoute==='A4_OBSERVER'||transRoute==='D'?'rgba(255,68,68,.4)':'rgba(240,160,48,.3)';
  var msg=act===2?BRIEFING_TEXT.act2_intro:act===3?(BRIEFING_TEXT.act3[transRoute]||''):(BRIEFING_TEXT.act4[transRoute]||'');
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // BRIEFING')),
    h('div',{style:{width:'100%',maxWidth:440,background:'url(panel_frame_medium.png) center/100% 100% no-repeat',padding:'28px 30px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',minHeight:0}},
      h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:12}},
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#f0a030',letterSpacing:2}},'ACT '+act+' BRIEFING'),
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:prioColor,letterSpacing:1}},'PRIORITY: '+prioLabel)),
      h('div',{style:{fontSize:13,color:'#9dff74',lineHeight:2,borderLeft:'2px solid rgba(145,255,106,.3)',paddingLeft:14,marginBottom:16}},
        '지난 '+(stats.day-1)+'일간의 운영 데이터를 분석했습니다.'),
      h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:16}},
        ['c','r','t','o'].map(function(k){var v=stats[k];var d=v<=25;return h('div',{key:k,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:d?'#ff4444':'#33ff33',padding:'4px 0'}},nm[k]+': '+v+'%')})),
      h('div',{style:{fontSize:12,color:routeColor,lineHeight:2,borderLeft:'2px solid '+borderColor,paddingLeft:14,marginBottom:16,whiteSpace:'pre-wrap'}},msg)),
    h('button',{className:'btn btn-amber',style:{margin:'8px auto',padding:'12px 32px',flexShrink:0},onClick:onEnter},'[ ENTER ]'));
}
