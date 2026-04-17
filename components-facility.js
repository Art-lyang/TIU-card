// components-facility.js — 시설 확장 UI 컴포넌트
// FacilityPanel: 탭 전환 (시설도 iframe + 확장 관리)
// FacilityStatusSection: 뉴스 페이즈 시설 상태 표시

function FacilityPanel(p) {
  var s1 = useState('map'), tab = s1[0], setTab = s1[1];
  var fac = p.facility || { approved: [], pending: [], completed: [], proposed: [] };

  // 탭 스타일
  var tabBtn = function(key, label) {
    var active = tab === key;
    return h('span', {
      style: {
        fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        letterSpacing: 1, padding: '6px 14px', cursor: 'pointer',
        color: active ? '#33ff66' : '#1a6a2a',
        borderBottom: active ? '2px solid #33ff66' : '2px solid transparent',
        transition: 'all 0.2s'
      },
      onClick: function() { setTab(key); }
    }, label);
  };

  return h('div', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#0a0f0a', zIndex: 100,
      display: 'flex', flexDirection: 'column'
    }
  },
    // 헤더
    h('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', borderBottom: '1px solid #1a3a1a',
        background: '#0c120c', flexShrink: 0
      }
    },
      h('div', { style: { display: 'flex', gap: 4 } },
        tabBtn('map', '시설도'),
        tabBtn('manage', '확장 관리')),
      h('span', {
        style: {
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: '#1a6a2a', cursor: 'pointer', padding: '4px 10px',
          border: '1px solid #1a3a1a', letterSpacing: 1
        },
        onClick: p.onClose
      }, '[ 닫기 ]')),

    // 컨텐츠
    tab === 'map' ? h('iframe', {
      src: 'building/oracle-base.html',
      style: {
        flex: 1, border: 'none', width: '100%',
        background: '#0a0f0a'
      }
    }) : h(FacilityManageTab, {
      facility: fac, onApprove: p.onApprove
    })
  );
}

// 확장 관리 탭 (기존 FacilityPanel 내용)
function FacilityManageTab(p) {
  var fac = p.facility;
  var FE = typeof FACILITY_EXPANSIONS !== 'undefined' ? FACILITY_EXPANSIONS : [];
  var getExp = function(id) { return FE.filter(function(f) { return f.id === id; })[0]; };

  var pending = fac.pending.map(getExp).filter(Boolean);
  var approved = fac.approved.filter(function(id) {
    return fac.completed.indexOf(id) < 0;
  }).map(getExp).filter(Boolean);
  var completed = fac.completed.map(getExp).filter(Boolean);

  var sec = { marginBottom: 16, padding: '10px 0', borderBottom: '1px solid rgba(var(--ui-rgb),.1)' };
  var lbl = { fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'rgba(var(--ui-rgb),.55)', letterSpacing: 1, marginBottom: 8 };
  var itm = { background: 'rgba(var(--ui-rgb),.04)', border: '1px solid rgba(var(--ui-rgb),.12)', padding: '10px 12px', marginBottom: 8 };
  var nm = { fontFamily: "'Share Tech Mono',monospace", fontSize: 13, color: 'var(--ui)', marginBottom: 4 };
  var ds = { fontSize: 11, color: 'rgba(220,255,220,.6)', lineHeight: 1.5 };

  return h('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 16px' } },
    pending.length > 0 && h('div', { style: sec },
      h('div', { style: lbl }, '[대기 중 — 승인 가능]'),
      pending.map(function(fe) {
        return h('div', { key: fe.id, style: itm },
          h('div', { style: nm }, fe.name),
          h('div', { style: ds }, fe.desc),
          h('div', { style: { fontSize: 10, color: '#4ae', marginTop: 4 } }, fe.hint),
          h('button', {
            className: 'btn', onClick: function() { p.onApprove(fe.id); },
            style: { marginTop: 8, padding: '6px 16px', fontSize: 10, background: 'rgba(74,170,238,.1)', border: '1px solid #4ae', color: '#4ae', cursor: 'pointer', letterSpacing: 1 }
          }, '[ 승인하기 ]'));
      })),
    approved.length > 0 && h('div', { style: sec },
      h('div', { style: lbl }, '[진행 중 — 리워드 선택 대기]'),
      approved.map(function(fe) {
        return h('div', { key: fe.id, style: itm },
          h('div', { style: nm }, fe.name),
          h('div', { style: ds }, fe.desc),
          h('div', { style: { fontSize: 10, color: '#f0a030', marginTop: 4 } }, '다음 리워드에서 선택 가능'));
      })),
    completed.length > 0 && h('div', { style: sec },
      h('div', { style: lbl }, '[완료]'),
      completed.map(function(fe) {
        return h('div', { key: fe.id, style: Object.assign({}, itm, { borderColor: 'rgba(var(--ui-rgb),.25)' }) },
          h('div', { style: Object.assign({}, nm, { color: '#6f6' }) }, fe.name + ' ✓'),
          h('div', { style: ds }, fe.desc));
      })),
    pending.length === 0 && approved.length === 0 && completed.length === 0 &&
      h('div', { style: { textAlign: 'center', padding: '40px 0', fontFamily: "'Share Tech Mono',monospace", fontSize: 12, color: 'rgba(var(--ui-rgb),.4)', letterSpacing: 1 } },
        '확장 가능한 시설이 없습니다.\n게임 진행 중 제안 카드를 통해 추가됩니다.')
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
      return h('div', { key: 'fac-' + i, style: { fontSize: 11, lineHeight: 1.6, color: cm[line.color] || 'rgba(220,255,220,.7)', fontFamily: "'Share Tech Mono',monospace", padding: '2px 0', animation: line.blink ? 'blink 1s infinite' : 'fadeIn 0.4s ease' } }, '▸ ' + line.text);
    }));
}
