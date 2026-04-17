// components-archive.js — ORACLE ARCHIVE 뷰어 컴포넌트

function ArchiveViewer(p) {
  var s1 = useState(null), selCat = s1[0], setSelCat = s1[1];
  var s2 = useState(null), selEntry = s2[0], setSelEntry = s2[1];
  var s3 = useState(null), newUnlock = s3[0], setNewUnlock = s3[1];

  var unlocked = ARCHIVE_ENTRIES.filter(function(e) { return e.unlock(p.logs) });
  var locked = ARCHIVE_ENTRIES.length - unlocked.length;

  // 신규 해금 알림 체크
  var prevUnlocked = p.seenArchive || [];
  useEffect(function() {
    var newOnes = unlocked.filter(function(e) { return prevUnlocked.indexOf(e.id) < 0 });
    if (newOnes.length > 0) setNewUnlock(newOnes.length);
    // 아카이브 진입 시 모든 해금 항목을 읽음 처리
    if (p.onMarkSeen) {
      unlocked.forEach(function(e) {
        if (prevUnlocked.indexOf(e.id) < 0) p.onMarkSeen(e.id);
      });
    }
  }, []);

  // 개별 항목 상세 보기
  if (selEntry) {
    var entry = ARCHIVE_ENTRIES.filter(function(e) { return e.id === selEntry })[0];
    if (!entry) { setSelEntry(null); return null; }
    // 읽음 마킹
    if (p.onMarkSeen && prevUnlocked.indexOf(entry.id) < 0) p.onMarkSeen(entry.id);
    return h('div', { className: 'screen' },
      h('div', { style: { width: '100%', maxWidth: 420, padding: '20px 0', flex: 1, overflowY: 'auto' } },
        h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: 'var(--ui-dim)', letterSpacing: 2, textAlign: 'center', marginBottom: 8 } }, 'ORACLE ARCHIVE — ENTRY VIEW'),
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 } },
          h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'var(--ui-dim)', background: 'var(--ui-bg)', border: '1px solid var(--ui-border)', borderRadius: 3, padding: '2px 8px' } }, entry.cat),
          h('span', { style: { fontSize: 14, color: '#f0a030', fontWeight: 'bold' } }, entry.title)
        ),
        h('div', { style: { background: 'var(--ui-bg)', border: '1px solid var(--ui-border)', borderRadius: 4, padding: 16, fontFamily: "'Share Tech Mono',monospace", fontSize: 12, lineHeight: 2, color: 'var(--ui)', whiteSpace: 'pre-wrap' } }, entry.content),
        h('div', { style: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 } },
          h('button', { className: 'btn', style: { fontSize: 12, padding: '8px 20px', marginTop: 0 }, onClick: function() { setSelEntry(null) } }, '← 목록'),
          h('button', { className: 'btn btn-amber', style: { fontSize: 12, padding: '8px 20px', marginTop: 0 }, onClick: p.onClose }, '닫기')
        )
      )
    );
  }

  // 카테고리 내 항목 목록
  if (selCat) {
    var catEntries = unlocked.filter(function(e) { return e.cat === selCat });
    var catLocked = ARCHIVE_ENTRIES.filter(function(e) { return e.cat === selCat && !e.unlock(p.logs) }).length;
    return h('div', { className: 'screen' },
      IMG.bg_corridor && h('div', { className: 'bg-overlay', style: { backgroundImage: 'url(' + IMG.bg_corridor + ')', opacity: 0.07 } }),
      h('div', { style: { width: '100%', maxWidth: 420, padding: '20px 0', flex: 1, overflowY: 'auto' } },
        h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: 'var(--ui-dim)', letterSpacing: 2, textAlign: 'center', marginBottom: 6 } }, 'ORACLE ARCHIVE — ' + selCat.toUpperCase()),
        h('div', { style: { fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 20 } }, catEntries.length + '건 해금' + (catLocked > 0 ? ' / ' + catLocked + '건 미발견' : '')),
        catEntries.map(function(e) {
          var isNew = prevUnlocked.indexOf(e.id) < 0;
          return h('div', { key: e.id, onClick: function() { setSelEntry(e.id) }, style: { background: 'var(--ui-bg)', border: '1px solid ' + (isNew ? 'var(--ui-dim)' : 'var(--ui-border)'), borderRadius: 4, padding: '12px 16px', marginBottom: 8, cursor: 'pointer', position: 'relative' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('span', { style: { fontSize: 13, color: 'var(--ui)' } }, e.title),
              isNew && h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: '#f0a030', background: 'rgba(240,160,48,0.1)', border: '1px solid rgba(240,160,48,0.3)', borderRadius: 3, padding: '1px 6px' } }, 'NEW')
            )
          );
        }),
        catLocked > 0 && h('div', { style: { fontSize: 12, color: '#333', textAlign: 'center', marginTop: 12, fontStyle: 'italic' } }, catLocked + '건의 항목이 잠겨 있습니다'),
        h('div', { style: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 } },
          h('button', { className: 'btn', style: { fontSize: 12, padding: '8px 20px', marginTop: 0 }, onClick: function() { setSelCat(null) } }, '← 카테고리'),
          h('button', { className: 'btn btn-amber', style: { fontSize: 12, padding: '8px 20px', marginTop: 0 }, onClick: p.onClose }, '닫기')
        )
      )
    );
  }

  // 카테고리 목록 (메인)
  return h('div', { className: 'screen' },
    IMG.bg_corridor && h('div', { className: 'bg-overlay', style: { backgroundImage: 'url(' + IMG.bg_corridor + ')', opacity: 0.07 } }),
    h('div', { style: { width: '100%', maxWidth: 420, padding: '20px 0', flex: 1, overflowY: 'auto' } },
      h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: 'var(--ui-dim)', letterSpacing: 2, textAlign: 'center', marginBottom: 6 } }, 'ORACLE ARCHIVE'),
      h('div', { style: { fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 20 } }, unlocked.length + '/' + ARCHIVE_ENTRIES.length + ' 항목 해금'),
      ARCHIVE_CATEGORIES.map(function(cat) {
        var catUnlocked = unlocked.filter(function(e) { return e.cat === cat }).length;
        var catTotal = ARCHIVE_ENTRIES.filter(function(e) { return e.cat === cat }).length;
        var catNew = unlocked.filter(function(e) { return e.cat === cat && prevUnlocked.indexOf(e.id) < 0 }).length;
        var isEmpty = catUnlocked === 0;
        return h('div', { key: cat, onClick: isEmpty ? null : function() { setSelCat(cat) }, style: { background: isEmpty ? '#080808' : 'var(--ui-bg)', border: '1px solid ' + (isEmpty ? '#111' : catNew > 0 ? 'var(--ui-dim)' : 'var(--ui-border)'), borderRadius: 4, padding: '14px 16px', marginBottom: 8, cursor: isEmpty ? 'default' : 'pointer', opacity: isEmpty ? 0.5 : 1 } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: 14, color: isEmpty ? '#333' : 'var(--ui)', fontWeight: 'bold' } }, cat),
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              catNew > 0 && h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: '#f0a030', background: 'rgba(240,160,48,0.1)', border: '1px solid rgba(240,160,48,0.3)', borderRadius: 3, padding: '1px 6px' } }, 'NEW ' + catNew),
              h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: isEmpty ? '#222' : 'var(--ui-dim)' } }, catUnlocked + '/' + catTotal)
            )
          )
        );
      }),
      locked > 0 && h('div', { style: { fontSize: 12, color: '#333', textAlign: 'center', marginTop: 12, fontStyle: 'italic' } }, locked + '건의 항목이 잠겨 있습니다'),
      h('button', { className: 'btn btn-amber', style: { display: 'block', margin: '20px auto 0', fontSize: 12, padding: '8px 20px' }, onClick: p.onClose }, '닫기')
    )
  );
}
