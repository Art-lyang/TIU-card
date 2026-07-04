// components-facility.js — 시설 확장 UI 컴포넌트
// FacilityPanel: 확장 관리 전용 패널
// FacilityStatusSection: 뉴스 페이즈 시설 상태 표시

function FacilityPanel(p) {
  var EN = (typeof getLocale === 'function' && getLocale() === 'en');
  var L = function(ko, en){ return EN ? en : ko; };
  var help = useRlabHelp('ts_facilityHelpSeen', p.devPreview);

  var fac = p.facility || { approved: [], pending: [], completed: [], proposed: [], rewardOff: [] };
  var pend = fac.pending || [], appr = fac.approved || [], comp = fac.completed || [];
  var rewardOff = fac.rewardOff || [];
  var FE = (typeof FACILITY_EXPANSIONS !== 'undefined') ? FACILITY_EXPANSIONS : [];
  var getExp = function(id){ var fe=FE.filter(function(f){return f.id===id;})[0]; return (typeof getFacilityExpansionView==='function')?getFacilityExpansionView(fe):fe; };
  var rewardView = function(fe){ if(!fe)return null; var bonus=((typeof REWARDS_FACILITY_BONUS!=='undefined')?REWARDS_FACILITY_BONUS:[]).filter(function(r){return r.feReq===fe.id;})[0]; if(!bonus)return null; var loc=(typeof tc==='function')?tc('rewards',bonus.id,null):null; return Object.assign({},bonus,loc||{}); };

  var pending = pend.map(getExp).filter(Boolean);
  var approved = appr.filter(function(id){ return comp.indexOf(id)<0; }).map(getExp).filter(Boolean);
  var completed = comp.map(getExp).filter(Boolean);

  var FDIR = 'assets/images/facility/';
  var FIMG = { 'FE-001':FDIR+'facility_fe001_cryo_storage.webp','FE-002':FDIR+'facility_fe002_training_ground.webp','FE-003':FDIR+'facility_fe003_sensor_array.webp','FE-004':FDIR+'facility_fe004_medical_bay.webp','FE-005':FDIR+'facility_fe005_supply_route.webp','FE-006':FDIR+'facility_fe006_cctv_control.webp','FE-007':FDIR+'facility_fe007_emergency_bunker.webp','FE-008':FDIR+'facility_fe008_north_patrol.webp' };
  var FALLBACK = FDIR + 'facility_hero.webp';
  var thumbOf = function(fe){ return (FIMG[fe.id] || FALLBACK) + '?v=2'; };

  var card = function(fe, kind){
    var isUp = !!fe.uprising;
    var pill = kind==='completed' ? h('span',{className:'rlab-pill rlab-pill--done'}, L('완료','DONE'))
      : (kind==='approved' ? h('span',{className:'rlab-pill rlab-pill--run'}, L('승인','APPROVED'))
        : h('span',{className:'rlab-pill rlab-pill--wait'}, L('결재','PENDING')));
    var rw = kind==='completed' ? rewardView(fe) : null;
    var rwIsOff = rewardOff.indexOf(fe.id) >= 0;
    return h('div', { key: fe.id, className:'rlab-card flab-card'+(isUp?' flab-up':'')+(kind==='completed'?' is-done':'') },
      h('div',{className:'rlab-thumb'}, h('div',{className:'rlab-thumb-img',style:{backgroundImage:'url('+thumbOf(fe)+')'}}), h('div',{className:'rlab-thumb-fx'})),
      h('div',{className:'rlab-info'},
        h('div',{className:'rlab-title-row'}, h('div',{className:'rlab-title'}, fe.name), pill),
        isUp && h('div',{className:'flab-uptag'}, L('독립 인프라','INDEPENDENT INFRA')),
        h('div',{className:'rlab-desc'}, fe.desc),
        kind==='pending' ? h(React.Fragment, null,
            fe.hint && h('div',{className:'flab-hint'}, fe.hint),
            h('button',{type:'button',className:'rlab-btn',onClick:function(){ if(p.onApprove)p.onApprove(fe.id); }}, L('[ 승인 ]','[ APPROVE ]')))
          : (kind==='approved' ? h('div',{className:'rlab-state rlab-state--run'}, L('다음 보상 단계에서 선택 가능','Selectable in the next reward phase'))
            : ((rw||fe.rewardBenefit) && h('div',{className:'flab-effect'+(rw&&rwIsOff?' is-rwoff':'')},
                h('div',{className:'flab-effect-h'}, L('완료 효과','EFFECT')),
                (fe.rewardBenefit||fe.rewardCost) && h('div',null, (fe.rewardBenefit||'') + (fe.rewardCost?' / '+fe.rewardCost:'')),
                rw && h('div',{className:'flab-effect-rw'}, L('보상카드','REWARD')+' · '+(rw.title||'')+' — '+(rw.benefit||'')+(rw.cost?' / '+rw.cost:'')),
                rw && h('button',{type:'button',className:'flab-rwtoggle'+(rwIsOff?' is-off':''),onClick:function(){ if(p.onToggleReward)p.onToggleReward(fe.id); }},
                  h('span',{className:'flab-rwdot'}),
                  rwIsOff ? L('보상 풀 제외됨 · 다시 포함','Excluded from reward pool · re-add')
                          : L('보상 풀 포함 중 · 제외하기','In reward pool · exclude'))))))
      );
  };

  var sectionLabel = function(t){ return h('div',{className:'flab-section'}, t); };
  var hasAny = pending.length || approved.length || completed.length;

  var helpRows = [
    [L('확장','BUILD'), L('시설 확장은 작전 카드로 제안됩니다. 승인하면 다음 보상 단계에서 골라 완공할 수 있습니다.','Expansions are proposed through operation cards. Approve one, then pick it during the next reward phase to complete it.')],
    [L('표식','MARK'), L('호박색 테두리와 ‘독립 인프라’ 표식이 붙은 시설은 기지를 외부 통제에서 자립시키는 기반 설비입니다. 충분히 갖추면 다른 길이 열릴 수 있습니다.','Facilities with an amber border and the ‘Independent Infra’ mark are the groundwork for running this base on its own. Gather enough of them and another path may open.')],
    [L('보상','REWARD'), L('완료한 시설은 보상카드를 보상 풀에 추가합니다. 선택지가 너무 많아지면 완료 시설의 토글로 보상카드를 개별 제외/포함할 수 있습니다.','Completed facilities add a reward card to the reward pool. If there are too many choices, use the toggle on a completed facility to exclude or re-add its reward card.')]
  ];

  return h('div', { className:'rlab-screen' },
    h('div', { className:'rlab-frame' },
      h('div', { className:'rlab-hero' },
        h('div',{className:'rlab-hero-img',style:{backgroundImage:'url(assets/images/facility/facility_hero.webp)'}}),
        h('div',{className:'rlab-hero-top'},
          h('div',{className:'rlab-kicker'}, h('span',{className:'rlab-live'}), L('시설 관리','FACILITY')),
          h('div',{className:'rlab-hero-ctrls'},
            h(RlabHelpButton,{onClick:help.show,title:L('탭 안내','Tab guide')}),
            h('button',{type:'button',className:'rlab-close','aria-label':L('닫기','Close'),onClick:function(){ if(p.onClose)p.onClose(); }}, '×'))),
        h('div',{className:'rlab-hero-id'},
          h('div',{className:'rlab-hero-name'}, L('기지 시설','Base Facilities')),
          h('div',{className:'rlab-hero-role'}, L('담당 전술지휘관 · ','Field commander · '), h('b',null,L('강도윤','Kang Do-yun'))))),
      h('div',{className:'rlab-res'},
        h('div',{className:'rlab-res-item'}, h('div',{className:'rlab-res-k'}, L('결재','PEND')), h('div',{className:'rlab-res-v'}, pending.length)),
        h('div',{className:'rlab-res-item'}, h('div',{className:'rlab-res-k'}, L('승인','APPR')), h('div',{className:'rlab-res-v'}, approved.length)),
        h('div',{className:'rlab-res-item'}, h('div',{className:'rlab-res-k'}, L('완료','DONE')), h('div',{className:'rlab-res-v'}, completed.length))),
      h('div',{className:'rlab-body'},
        !hasAny ? h('div',{className:'rlab-empty'}, L('현재 진행 중인 시설 확장이 없습니다.','No facility expansions available right now.'))
        : h(React.Fragment, null,
            pending.length>0 && h(React.Fragment,null, sectionLabel(L('결재 대기','PENDING APPROVAL')), pending.map(function(fe){return card(fe,'pending');})),
            approved.length>0 && h(React.Fragment,null, sectionLabel(L('승인됨 · 보상 대기','APPROVED · AWAITING REWARD')), approved.map(function(fe){return card(fe,'approved');})),
            completed.length>0 && h(React.Fragment,null, sectionLabel(L('완료','COMPLETED')), completed.map(function(fe){return card(fe,'completed');}))),
        h('div',{className:'rlab-foot'}, L('※ 시설 확장은 작전 카드를 통해 제안됩니다.','※ Expansions are proposed through operation cards.'))),
      h(RlabHelpOverlay,{open:help.open,onClose:help.close,title:L('시설 관리 안내','FACILITY MANAGEMENT'),ok:L('확인','GOT IT'),rows:helpRows})
    )
  );
}

// 확장 관리 탭 (기존 FacilityPanel 내용)
// FacilityManageTab 제거됨 — 어디에서도 렌더되지 않는 데드 컴포넌트였음 (관리 UI는 FacilityStatusSection 계열이 담당)

function FacilityStatusSection(p) {
  if (typeof getFacilityStatusLines !== 'function') return null;
  var lines = getFacilityStatusLines(
    p.stats || {}, (p.facility || {}).completed, (p.facility || {}).approved
  );
  if (!lines || lines.length === 0) return null;
  var cm = { red: '#ff4444', orange: '#f0a030', green: 'var(--ui)', gray: 'rgba(var(--ui-rgb),.4)' };
  return h('div', { style: { marginBottom: 12, padding: '8px 0', borderBottom: '1px solid rgba(var(--ui-rgb),.08)' } },
    h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'rgba(var(--ui-rgb),.55)', letterSpacing: 1, marginBottom: 6 } }, '[FACILITY STATUS]'),
    lines.map(function(line, i) {
      return h('div', { key: 'fac-' + i, style: { fontSize: 11, lineHeight: 1.6, color: cm[line.color] || 'var(--ui-text)', fontFamily: "'Share Tech Mono',monospace", padding: '2px 0', animation: line.blink ? 'blink 1s infinite' : 'fadeIn 0.4s ease' } }, '▸ ' + line.text);
    }));
}
