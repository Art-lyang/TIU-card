// components-facility.js — 시설 확장 UI 컴포넌트
// FacilityPanel: 대기 중/진행 중/완료 확장 목록
// FacilityStatusSection: 뉴스 페이즈 시설 상태 표시

function FacilityPanel(p) {
  var fac = p.facility || { approved: [], pending: [], completed: [], proposed: [] };
  var FE = typeof FACILITY_EXPANSIONS !== 'undefined' ? FACILITY_EXPANSIONS : [];

  var getExpansion = function(feId) {
    return FE.filter(function(f) { return f.id === feId; })[0] || null;
  };

  var pendingItems = fac.pending.map(getExpansion).filter(Boolean);
  var approvedItems = fac.approved.filter(function(id) {
    return fac.completed.indexOf(id) < 0;
  }).map(getExpansion).filter(Boolean);
  var completedItems = fac.completed.map(getExpansion).filter(Boolean);

  var sectionStyle = {
    marginBottom: 16, padding: '10px 0',
    borderBottom: '1px solid rgba(145,255,106,.1)'
  };
  var labelStyle = {
    fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
    color: 'rgba(157,255,116,.55)', letterSpacing: 1, marginBottom: 8
  };
  var itemStyle = {
    background: 'rgba(145,255,106,.04)', border: '1px solid rgba(145,255,106,.12)',
    padding: '10px 12px', marginBottom: 8
  };
  var nameStyle = {
    fontFamily: "'Share Tech Mono',monospace", fontSize: 13,
    color: '#9dff74', marginBottom: 4
  };
  var descStyle = { fontSize: 11, color: 'rgba(220,255,220,.6)', lineHeight: 1.5 };

  return h('div', { className: 'screen' },
    h('div', { className: 'title-frame' },
      h('span', null, 'ORACLE // FACILITY EXPANSIONS')),
    h('div', {
      style: {
        width: '100%', maxWidth: 440, flex: 1, overflowY: 'auto',
        minHeight: 0, padding: '8px 16px'
      }
    },
      // 대기 중 (거절 → 나중에 승인 가능)
      pendingItems.length > 0 && h('div', { style: sectionStyle },
        h('div', { style: labelStyle }, '[대기 중 — 승인 가능]'),
        pendingItems.map(function(fe) {
          return h('div', { key: fe.id, style: itemStyle },
            h('div', { style: nameStyle }, fe.name),
            h('div', { style: descStyle }, fe.desc),
            h('div', { style: { fontSize: 10, color: '#4ae', marginTop: 4 } }, fe.hint),
            h('button', {
              className: 'btn',
              style: {
                marginTop: 8, padding: '6px 16px', fontSize: 10,
                background: 'rgba(74,170,238,.1)', border: '1px solid #4ae',
                color: '#4ae', cursor: 'pointer', letterSpacing: 1
              },
              onClick: function() { p.onApprove(fe.id); }
            }, '[ 승인하기 ]'));
        })
      ),

      // 진행 중 (승인됨, 리워드 대기)
      approvedItems.length > 0 && h('div', { style: sectionStyle },
        h('div', { style: labelStyle }, '[진행 중 — 리워드 선택 대기]'),
        approvedItems.map(function(fe) {
          return h('div', { key: fe.id, style: itemStyle },
            h('div', { style: nameStyle }, fe.name),
            h('div', { style: descStyle }, fe.desc),
            h('div', {
              style: { fontSize: 10, color: '#f0a030', marginTop: 4 }
            }, '다음 리워드에서 선택 가능'));
        })
      ),

      // 완료
      completedItems.length > 0 && h('div', { style: sectionStyle },
        h('div', { style: labelStyle }, '[완료]'),
        completedItems.map(function(fe) {
          return h('div', { key: fe.id, style: Object.assign({}, itemStyle, {
            borderColor: 'rgba(145,255,106,.25)'
          }) },
            h('div', { style: Object.assign({}, nameStyle, { color: '#6f6' }) },
              fe.name + ' ✓'),
            h('div', { style: descStyle }, fe.desc));
        })
      ),

      // 빈 상태
      pendingItems.length === 0 && approvedItems.length === 0 &&
        completedItems.length === 0 && h('div', {
        style: {
          textAlign: 'center', padding: '40px 0',
          fontFamily: "'Share Tech Mono',monospace", fontSize: 12,
          color: 'rgba(157,255,116,.4)', letterSpacing: 1
        }
      }, '확장 가능한 시설이 없습니다.\n게임 진행 중 제안 카드를 통해 추가됩니다.')
    ),
    h('button', {
      className: 'btn',
      style: {
        margin: '8px auto', padding: '10px 28px', flexShrink: 0,
        display: 'block'
      },
      onClick: p.onClose
    }, '[ 닫기 ]'),
    h('div', { className: 'footer-frame' },
      h('span', null, 'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'))
  );
}

// 뉴스 페이즈 시설 상태 섹션
function FacilityStatusSection(p) {
  if (typeof getFacilityStatusLines !== 'function') return null;
  var lines = getFacilityStatusLines(
    p.stats || {}, (p.facility || {}).completed, (p.facility || {}).approved
  );
  if (!lines || lines.length === 0) return null;

  var colorMap = {
    red: '#ff4444', orange: '#f0a030',
    green: '#9dff74', gray: 'rgba(157,255,116,.4)'
  };

  return h('div', {
    style: {
      marginBottom: 12, padding: '8px 0',
      borderBottom: '1px solid rgba(145,255,106,.08)'
    }
  },
    h('div', {
      style: {
        fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'rgba(157,255,116,.55)', letterSpacing: 1, marginBottom: 6
      }
    }, '[FACILITY STATUS]'),
    lines.map(function(line, i) {
      return h('div', {
        key: 'fac-' + i,
        style: {
          fontSize: 11, lineHeight: 1.6,
          color: colorMap[line.color] || 'rgba(220,255,220,.7)',
          fontFamily: "'Share Tech Mono',monospace",
          padding: '2px 0',
          animation: line.blink ? 'blink 1s infinite' : 'fadeIn 0.4s ease'
        }
      }, '▸ ' + line.text);
    })
  );
}
