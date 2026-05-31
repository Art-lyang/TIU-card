// components-facility.js — 시설 확장 UI 컴포넌트
// FacilityPanel: 확장 관리 전용 패널
// FacilityStatusSection: 뉴스 페이즈 시설 상태 표시

function FacilityPanel(p) {
  var tab = 'manage';
  var fac = p.facility || { approved: [], pending: [], completed: [], proposed: [] };

  // 탭 스타일
  var tabBtn = function(key, label) {
    var active = tab === key;
    return h('span', {
      style: {
        fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        letterSpacing: 1, padding: '6px 14px', cursor: 'pointer',
        color: active ? 'var(--ui)' : 'rgba(var(--ui-rgb),.38)',
        borderBottom: active ? '2px solid var(--ui)' : '2px solid transparent',
        transition: 'all 0.2s'
      },
      onClick: function() {}
    }, label);
  };

  return h('div', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(3,7,8,.98)', zIndex: 100,
      display: 'flex', flexDirection: 'column'
    }
  },
    // 헤더
    h('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', borderBottom: '1px solid rgba(var(--ui-rgb),.22)',
        background: 'rgba(var(--ui-rgb),.045)', flexShrink: 0
      }
    },
      h('div', { style: { display: 'flex', gap: 4 } },
        tabBtn('manage', tt('facility.manageTab',null,'Expansion Management'))),
      h('span', {
        style: {
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: 'rgba(var(--ui-rgb),.55)', cursor: 'pointer', padding: '4px 10px',
          border: '1px solid rgba(var(--ui-rgb),.24)', letterSpacing: 1
        },
        onClick: p.onClose
      }, tt('facility.close',null,'[ Close ]'))),

    // 컨텐츠
    h(FacilityManageTab, {
      facility: fac, onApprove: p.onApprove
    })
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
