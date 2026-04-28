// components-evidence.js — 증거 테이블 UI 컴포넌트
// 이브닝 챗 하단에 표시, 증거 조합으로 결론 도출

function EvidenceTable(p) {
  var logs = p.logs || [];
  var collected = getCollectedEvidence(logs);
  var unlocked = getUnlockedCombos();
  var s1 = useState([]), selected = s1[0], setSelected = s1[1];
  var s2 = useState(null), result = s2[0], setResult = s2[1];
  var s3 = useState(!!p.forceOpen), show = s3[0], setShow = s3[1];

  if (!p.unlocked || collected.length < 2) return null;

  var toggle = function(evId) {
    if (result) return;
    setSelected(function(prev) {
      if (prev.indexOf(evId) >= 0) return prev.filter(function(id) { return id !== evId; });
      if (prev.length >= 3) return prev;
      return prev.concat([evId]);
    });
  };

  var submit = function() {
    var combo = checkEvidenceCombo(selected);
    if (combo) {
      if (unlocked.indexOf(combo.id) < 0) {
        saveUnlockedCombo(combo.id);
        if (combo.reward) {
          if (combo.reward.trust && p.onTrust) {
            for (var ck in combo.reward.trust) p.onTrust(ck, combo.reward.trust[ck]);
          }
          if (combo.reward.g && p.onGi) p.onGi(combo.reward.g);
          if (combo.reward.log && p.onLog) {
            if (Array.isArray(combo.reward.log)) combo.reward.log.forEach(function(id) { p.onLog(id); });
            else p.onLog(combo.reward.log);
          }
        }
      }
      if(typeof SFX!=='undefined')SFX.play('check');
      setResult({ success: true, combo: combo });
    } else {
      if(typeof SFX!=='undefined')SFX.play('btn_off');
      setResult({ success: false });
    }
  };

  var reset = function() { setSelected([]); setResult(null); };

  var catColor = { oracle: '#f0a030', field: 'var(--ui)', external: '#4ae', incident: '#ff6666', internal: '#c080ff' };
  var catName = { oracle: 'ORACLE', field: 'FIELD', external: 'EXTERNAL', incident: 'INCIDENT', internal: 'INTERNAL' };

  // 공통 외부 컨테이너 (고정 사이즈)
  var outerStyle = { margin: '12px auto 0', maxWidth: 440,
    border: '1px solid rgba(var(--ui-rgb),.12)', background: 'rgba(10,18,10,.8)',
    borderRadius: 3, padding: '10px 12px' };

  // 접힌 상태
  if (!show && !p.forceOpen) return h('div', { style: outerStyle },
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'rgba(var(--ui-rgb),.5)', letterSpacing: 2 } },
        'EVIDENCE TABLE (' + collected.length + ')'),
      h('div', { onClick: function() { setShow(true) }, style: { cursor: 'pointer',
        padding: '4px 12px', border: '1px solid rgba(var(--ui-rgb),.25)',
        borderRadius: 2, background: 'rgba(var(--ui-rgb),.04)',
        fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'var(--ui)', letterSpacing: 1 } }, '\u25BC OPEN')),
    h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8, opacity: 0.4 } },
      collected.slice(0, 4).map(function(ev) {
        return h('div', { key: ev.id, onClick: function() { setShow(true) },
          style: { flex: '0 0 calc(50% - 3px)', padding: '4px 6px', cursor: 'pointer',
            border: '1px solid rgba(var(--ui-rgb),.06)', borderRadius: 2 } },
          h('div', { style: { fontSize: 10, color: 'var(--ui-text)', lineHeight: 1.3 } }, ev.name));
      })),
    collected.length > 4 && h('div', { style: { fontSize: 9, color: 'rgba(var(--ui-rgb),.25)',
      textAlign: 'center', marginTop: 4, fontFamily: "'Share Tech Mono',monospace" } },
      '+ ' + (collected.length - 4) + ' more'));

  // 열린 상태: 같은 외부 사이즈, 내부 스크롤
  return h('div', { style: outerStyle },
    // 헤더
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
      h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'var(--ui)', letterSpacing: 2 } }, 'EVIDENCE TABLE'),
      h('div', { onClick: function() { setShow(false) }, style: { cursor: 'pointer',
        padding: '4px 12px', border: '1px solid rgba(var(--ui-rgb),.25)',
        borderRadius: 2, background: 'rgba(var(--ui-rgb),.04)',
        fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'rgba(var(--ui-rgb),.6)', letterSpacing: 1 } }, '\u25B2 CLOSE')),

    // 스크롤 영역 (증거 카드 + 결과)
    h('div', { style: { maxHeight: 340, overflowY: 'auto', paddingRight: 2 } },
      // 증거 카드 그리드
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 } },
        collected.map(function(ev) {
          var isSel = selected.indexOf(ev.id) >= 0;
          var cc = catColor[ev.cat] || 'var(--ui)';
          return h('div', { key: ev.id, onClick: function() { toggle(ev.id) },
            style: { flex: '0 0 calc(50% - 3px)', padding: '6px 8px', cursor: 'pointer',
              border: '1px solid ' + (isSel ? cc : 'rgba(var(--ui-rgb),.1)'),
              background: isSel ? 'rgba(var(--ui-rgb),.06)' : 'transparent',
              borderRadius: 2, transition: 'all 0.15s' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 } },
              h('span', { style: { width: 6, height: 6, borderRadius: '50%',
                background: isSel ? cc : 'rgba(var(--ui-rgb),.2)', flexShrink: 0 } }),
              h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 8,
                color: cc, letterSpacing: 0.5 } }, catName[ev.cat] || '')),
            h('div', { style: { fontSize: 11, color: isSel ? 'var(--ui)' : 'var(--ui-text)',
              lineHeight: 1.4 } }, ev.name),
            h('div', { style: { fontSize: 9, color: 'rgba(var(--ui-rgb),.3)',
              marginTop: 2, lineHeight: 1.3 } }, ev.desc));
        })),

      // 결과 표시
      result && result.success && h('div', { style: { marginTop: 4, padding: '10px 12px',
        borderLeft: '3px solid #f0a030', background: 'rgba(240,160,48,.04)' } },
        h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 9,
          color: '#f0a030', letterSpacing: 1, marginBottom: 4 } },
          '\u25B8 ' + result.combo.name),
        h('div', { style: { fontSize: 12, color: 'var(--ui-text)',
          lineHeight: 1.6 } }, result.combo.result),
        unlocked.indexOf(result.combo.id) < 0 &&
          h('div', { style: { fontSize: 9, color: 'var(--ui)', marginTop: 6,
            fontFamily: "'Share Tech Mono',monospace" } }, '+ NEW INSIGHT UNLOCKED'),
        h('div', { onClick: reset, style: { marginTop: 8, fontSize: 10,
          color: 'rgba(var(--ui-rgb),.4)', cursor: 'pointer',
          fontFamily: "'Share Tech Mono',monospace" } }, '[ RESET ]')),

      result && !result.success && h('div', { style: { marginTop: 4, padding: '8px 12px',
        borderLeft: '3px solid rgba(255,68,68,.4)', background: 'rgba(255,68,68,.03)' } },
        h('div', { style: { fontSize: 11, color: 'rgba(255,100,100,.7)',
          lineHeight: 1.5 } }, '연관성을 도출할 수 없습니다. 다른 조합을 시도하십시오.'),
        h('div', { onClick: reset, style: { marginTop: 6, fontSize: 10,
          color: 'rgba(var(--ui-rgb),.4)', cursor: 'pointer',
          fontFamily: "'Share Tech Mono',monospace" } }, '[ RESET ]')),

      // 해금된 조합 목록
      unlocked.length > 0 && h('div', { style: { marginTop: 10, paddingTop: 8,
        borderTop: '1px solid rgba(var(--ui-rgb),.06)' } },
        h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 9,
          color: 'rgba(var(--ui-rgb),.3)', letterSpacing: 1, marginBottom: 4 } },
          'INSIGHTS: ' + unlocked.length + '/' + EVIDENCE_COMBOS.length),
        unlocked.map(function(cid) {
          var c = EVIDENCE_COMBOS.filter(function(x) { return x.id === cid; })[0];
          if (!c) return null;
          return h('div', { key: cid, style: { fontSize: 9, color: 'rgba(240,160,48,.5)',
            marginBottom: 2 } }, '\u2713 ' + c.name);
        }))),

    // 선택 상태 + 제출 (스크롤 영역 밖, 하단 고정)
    !result && h('div', { style: { display: 'flex', gap: 8, alignItems: 'center',
      justifyContent: 'space-between', marginTop: 8, paddingTop: 6,
      borderTop: '1px solid rgba(var(--ui-rgb),.08)' } },
      h('span', { style: { fontSize: 10, color: 'rgba(var(--ui-rgb),.4)',
        fontFamily: "'Share Tech Mono',monospace" } },
        'SELECTED: ' + selected.length + '/3'),
      selected.length >= 2 && h('div', { onClick: submit,
        style: { padding: '6px 14px', cursor: 'pointer',
          border: '1px solid rgba(var(--ui-rgb),.3)', background: 'rgba(var(--ui-rgb),.05)',
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: 'var(--ui)', letterSpacing: 1 } }, 'ANALYZE'))
  );
}

// 게임 화면용 증거 패널 오버레이 (열람 전용, 조합 불가)
function EvidencePanel(p) {
  var collected = getCollectedEvidence(p.logs || []);
  var unlocked = getUnlockedCombos();
  var catColor = { oracle: '#f0a030', field: 'var(--ui)', external: '#4ae', incident: '#ff6666', internal: '#c080ff' };
  var catName = { oracle: 'ORACLE', field: 'FIELD', external: 'EXTERNAL', incident: 'INCIDENT', internal: 'INTERNAL' };
  return h('div', { style: { position: 'fixed', inset: 0, zIndex: 100,
    background: 'rgba(5,10,5,.95)', overflowY: 'auto', padding: '20px 16px' } },
    h('div', { style: { maxWidth: 440, margin: '0 auto' } },
      h('div', { style: { display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16, paddingBottom: 8,
        borderBottom: '1px solid rgba(var(--ui-rgb),.15)' } },
        h('span', { style: { fontFamily: "'Share Tech Mono',monospace",
          fontSize: 13, color: 'var(--ui)', letterSpacing: 2 } }, 'EVIDENCE TABLE'),
        h('span', { onClick: p.onClose, style: { cursor: 'pointer',
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: 'rgba(var(--ui-rgb),.5)', padding: '4px 8px',
          border: '1px solid rgba(var(--ui-rgb),.2)' } }, '[ CLOSE ]')),
      h('div', { style: { fontSize: 10, color: 'rgba(var(--ui-rgb),.4)',
        fontFamily: "'Share Tech Mono',monospace", marginBottom: 10 } },
        'COLLECTED: ' + collected.length + ' / ' + EVIDENCE.length),
      collected.length === 0 && h('div', { style: { fontSize: 12, color: 'rgba(var(--ui-rgb),.3)',
        textAlign: 'center', padding: '20px 0' } }, '수집된 증거가 없습니다.'),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
        collected.map(function(ev) {
          var cc = catColor[ev.cat] || 'var(--ui)';
          return h('div', { key: ev.id, style: { flex: '0 0 calc(50% - 3px)', padding: '8px 10px',
            border: '1px solid rgba(var(--ui-rgb),.1)', borderRadius: 2 } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 } },
              h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: cc, flexShrink: 0 } }),
              h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: cc } }, catName[ev.cat])),
            h('div', { style: { fontSize: 11, color: 'var(--ui)', lineHeight: 1.4 } }, ev.name),
            h('div', { style: { fontSize: 9, color: 'rgba(var(--ui-rgb),.3)', marginTop: 2 } }, ev.desc));
        })),
      unlocked.length > 0 && h('div', { style: { marginTop: 14, paddingTop: 10,
        borderTop: '1px solid rgba(var(--ui-rgb),.08)' } },
        h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: 'rgba(var(--ui-rgb),.4)', letterSpacing: 1, marginBottom: 6 } },
          'INSIGHTS: ' + unlocked.length + '/' + EVIDENCE_COMBOS.length),
        unlocked.map(function(cid) {
          var c = EVIDENCE_COMBOS.filter(function(x) { return x.id === cid; })[0];
          return c ? h('div', { key: cid, style: { fontSize: 10, color: 'rgba(240,160,48,.6)',
            marginBottom: 3 } }, '\u2713 ' + c.name) : null;
        })),
      h('div', { style: { fontSize: 9, color: 'rgba(var(--ui-rgb),.25)', textAlign: 'center',
        marginTop: 16, fontFamily: "'Share Tech Mono',monospace" } },
        '증거 조합은 이브닝 챗에서 가능합니다.')));
}
