// components-facility.js — 시설 확장 UI 컴포넌트
// FacilityPanel: 확장 관리 전용 패널
// FacilityStatusSection: 뉴스 페이즈 시설 상태 표시

function FacilityPanel(p) {
  var EN = (typeof getLocale === 'function' && getLocale() === 'en');
  var L = function(ko, en){ return EN ? en : ko; };
  var fac = p.facility || { approved: [], pending: [], completed: [], proposed: [] };
  var pend = fac.pending || [], appr = fac.approved || [], comp = fac.completed || [];
  var FE = (typeof FACILITY_EXPANSIONS !== 'undefined') ? FACILITY_EXPANSIONS : [];
  var getExp = function(id){ var fe=FE.filter(function(f){return f.id===id;})[0]; return (typeof getFacilityExpansionView==='function')?getFacilityExpansionView(fe):fe; };
  var rewardView = function(fe){ if(!fe)return null; var bonus=((typeof REWARDS_FACILITY_BONUS!=='undefined')?REWARDS_FACILITY_BONUS:[]).filter(function(r){return r.feReq===fe.id;})[0]; if(!bonus)return null; var loc=(typeof tc==='function')?tc('rewards',bonus.id,null):null; return Object.assign({},bonus,loc||{}); };

  var pending = pend.map(getExp).filter(Boolean);
  var approved = appr.filter(function(id){ return comp.indexOf(id)<0; }).map(getExp).filter(Boolean);
  var completed = comp.map(getExp).filter(Boolean);

  var FDIR = 'assets/images/facility/';
  var FIMG = { 'FE-001':FDIR+'facility_fe001_cryo_storage.jpg','FE-002':FDIR+'facility_fe002_training_ground.jpg','FE-003':FDIR+'facility_fe003_sensor_array.jpg','FE-004':FDIR+'facility_fe004_medical_bay.jpg','FE-005':FDIR+'facility_fe005_supply_route.jpg','FE-006':FDIR+'facility_fe006_cctv_control.jpg','FE-007':FDIR+'facility_fe007_emergency_bunker.jpg','FE-008':FDIR+'facility_fe008_north_patrol.jpg' };
  var FALLBACK = FDIR + 'facility_hero.jpg';
  var thumbOf = function(fe){ return FIMG[fe.id] || FALLBACK; };

  var card = function(fe, kind){
    var isUp = !!fe.uprising;
    var pill = kind==='completed' ? h('span',{className:'rlab-pill rlab-pill--done'}, L('완료','DONE'))
      : (kind==='approved' ? h('span',{className:'rlab-pill rlab-pill--run'}, L('승인','APPROVED'))
        : h('span',{className:'rlab-pill rlab-pill--wait'}, L('결재','PENDING')));
    var rw = kind==='completed' ? rewardView(fe) : null;
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
            : ((rw||fe.rewardBenefit) && h('div',{className:'flab-effect'},
                h('div',{className:'flab-effect-h'}, L('완료 효과','EFFECT')),
                (fe.rewardBenefit||fe.rewardCost) && h('div',null, (fe.rewardBenefit||'') + (fe.rewardCost?' / '+fe.rewardCost:'')),
                rw && h('div',{className:'flab-effect-rw'}, L('보상카드','REWARD')+' · '+(rw.title||'')+' — '+(rw.benefit||'')+(rw.cost?' / '+rw.cost:''))))))
      );
  };

  var sectionLabel = function(t){ return h('div',{className:'flab-section'}, t); };
  var hasAny = pending.length || approved.length || completed.length;

  return h('div', { className:'rlab-screen' },
    h('div', { className:'rlab-frame' },
      h('div', { className:'rlab-hero' },
        h('div',{className:'rlab-hero-img',style:{backgroundImage:'url(assets/images/facility/facility_hero.jpg)'}}),
        h('div',{className:'rlab-hero-top'},
          h('div',{className:'rlab-kicker'}, h('span',{className:'rlab-live'}), L('시설 관리','FACILITY')),
          h('span',{className:'rlab-close',onClick:function(){ if(p.onClose)p.onClose(); }}, '×')),
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
        h('div',{className:'rlab-foot'}, L('※ 시설 확장은 작전 카드를 통해 제안됩니다.','※ Expansions are proposed through operation cards.')))
    )
  );
}

// 확장 관리 탭 (기존 FacilityPanel 내용)
function FacilityManageTab(p) {
  var fac = p.facility;
  var FE = typeof FACILITY_EXPANSIONS !== 'undefined' ? FACILITY_EXPANSIONS : [];
  var getExp = function(id) { var fe=FE.filter(function(f) { return f.id === id; })[0]; return typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe; };

  var pending = fac.pending.map(getExp).filter(Boolean);
  var approved = fac.approved.filter(function(id) {
    return fac.completed.indexOf(id) < 0;
  }).map(getExp).filter(Boolean);
  var completed = fac.completed.map(getExp).filter(Boolean);
  var rewardView = function(fe) {
    if (!fe) return null;
    var bonus = (typeof REWARDS_FACILITY_BONUS !== 'undefined' ? REWARDS_FACILITY_BONUS : []).filter(function(r) { return r.feReq === fe.id; })[0];
    if (!bonus) return null;
    var loc = (typeof tc === 'function') ? tc('rewards', bonus.id, null) : null;
    return Object.assign({}, bonus, loc || {});
  };

  var sec = { marginBottom: 16, padding: '10px 0', borderBottom: '1px solid rgba(var(--ui-rgb),.1)' };
  var lbl = { fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'rgba(var(--ui-rgb),.55)', letterSpacing: 1, marginBottom: 8 };
  var itm = { background: 'rgba(var(--ui-rgb),.04)', border: '1px solid rgba(var(--ui-rgb),.12)', padding: '10px 12px', marginBottom: 8 };
  var nm = { fontFamily: "'Share Tech Mono',monospace", fontSize: 13, color: 'var(--ui)', marginBottom: 4 };
  var ds = { fontSize: 11, color: 'var(--ui-text)', lineHeight: 1.5 };

  return h('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 16px' } },
    pending.length > 0 && h('div', { style: sec },
      h('div', { style: lbl }, tt('facility.pending',null,'[PENDING APPROVAL]')),
      pending.map(function(fe) {
        var isUp = !!fe.uprising;
        var upStyle = isUp ? { borderColor: 'rgba(240,160,48,.2)' } : {};
        return h('div', { key: fe.id, style: Object.assign({}, itm, upStyle) },
          h('div', { style: nm }, fe.name),
          isUp && h('div', { style: { fontSize: 9, color: '#f0a030', letterSpacing: 0.5, marginBottom: 4, fontFamily: "'Share Tech Mono',monospace" } }, tt('facility.uprisingTag',null,'INDEPENDENT INFRA')),
          h('div', { style: ds }, fe.desc),
          h('div', { style: { fontSize: 10, color: 'rgba(var(--ui-rgb),.72)', marginTop: 4 } }, fe.hint),
          h('button', {
            className: 'btn', onClick: function() { p.onApprove(fe.id); },
            style: { marginTop: 8, padding: '6px 16px', fontSize: 10, background: 'rgba(var(--ui-rgb),.08)', border: '1px solid rgba(var(--ui-rgb),.4)', color: 'var(--ui)', cursor: 'pointer', letterSpacing: 1 }
          }, tt('facility.approve',null,'[ APPROVE ]')));
      })),
    approved.length > 0 && h('div', { style: sec },
      h('div', { style: lbl }, tt('facility.approved',null,'[APPROVED - AWAITING REWARD PICK]')),
      approved.map(function(fe) {
        var isUp = !!fe.uprising;
        var upStyle = isUp ? { borderColor: 'rgba(240,160,48,.2)' } : {};
        return h('div', { key: fe.id, style: Object.assign({}, itm, upStyle) },
          h('div', { style: nm }, fe.name),
          isUp && h('div', { style: { fontSize: 9, color: '#f0a030', letterSpacing: 0.5, marginBottom: 4, fontFamily: "'Share Tech Mono',monospace" } }, tt('facility.uprisingTag',null,'INDEPENDENT INFRA')),
          h('div', { style: ds }, fe.desc),
          h('div', { style: { fontSize: 10, color: '#f0a030', marginTop: 4 } }, tt('facility.rewardPending',null,'Selectable during the next reward phase.')));
      })),
    completed.length > 0 && h('div', { style: sec },
      h('div', { style: lbl }, tt('facility.completed',null,'[COMPLETED]')),
      completed.map(function(fe) {
        var rw = rewardView(fe);
        return h('div', { key: fe.id, style: Object.assign({}, itm, { borderColor: 'rgba(var(--ui-rgb),.25)' }) },
          h('div', { style: Object.assign({}, nm, { color: 'var(--ui)' }) }, fe.name + ' OK'),
          h('div', { style: ds }, fe.desc),
          h('div', { style: { marginTop: 8, padding: '7px 9px', border: '1px solid rgba(var(--ui-rgb),.18)', background: 'rgba(var(--ui-rgb),.035)', fontSize: 10, color: 'rgba(var(--ui-rgb),.78)', lineHeight: 1.55 } },
            h('div', { style: { color: 'var(--ui)', fontFamily: "'Share Tech Mono',monospace", letterSpacing: 1, marginBottom: 2 } }, tt('facility.completedEffect',null,'완료 효과')),
            h('div', null, (fe.rewardBenefit || '') + (fe.rewardCost ? ' / ' + fe.rewardCost : '')),
            rw && h('div', { style: { marginTop: 4, color: '#f0a030' } },
              tt('facility.rewardUnlocked',null,'보상카드 추가') + ': ' + (rw.title || '') + ' — ' + (rw.benefit || '') + (rw.cost ? ' / ' + rw.cost : ''))));
      })),
    pending.length === 0 && approved.length === 0 && completed.length === 0 &&
      h('div', { style: { textAlign: 'center', padding: '40px 0', fontFamily: "'Share Tech Mono',monospace", fontSize: 12, color: 'rgba(var(--ui-rgb),.4)', letterSpacing: 1 } },
        tt('facility.empty',null,'No facility expansions are currently available.\nNew proposals will appear through operation cards.'))
  );
}

// 뉴스 페이즈 시설 상태 섹션
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
