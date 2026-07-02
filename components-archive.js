// components-archive.js - ORACLE ARCHIVE viewer (dossier)
// 구조: 카테고리 2열 그리드(페이저 없음) → 항목 스크롤 리스트 → 상세.
// 화면 자체가 overflow-y:auto 라 목록은 스크롤로 소화한다 — 페이저 금지.
var getLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};

function ArchiveViewer(p) {
  var s1 = useState(null), selCat = s1[0], setSelCat = s1[1];
  var s2 = useState(null), selEntry = s2[0], setSelEntry = s2[1];
  var s3 = useState(null), newUnlock = s3[0], setNewUnlock = s3[1];
  var locale = getLocale();
  var isKo = locale === 'ko';
  var catLabelMapEn = {
    '이변체': 'Anomalies',
    '인물': 'Personnel',
    '조직': 'Organizations',
    '시설': 'Facilities',
    '과학': 'Science',
    '시스템': 'Systems',
    '지역': 'Regions',
    '사건기록': 'Incident Records',
    '인물심화': 'Personnel Dossiers',
    '작전가이드': 'Operation Guides',
    '시설기록': 'Facility Records',
    '보안감사': 'Security Audits',
    '프로토콜': 'Protocols',
    '현장분석': 'Field Analysis'
  };
  var catLabel = function(cat){ return isKo ? cat : (catLabelMapEn[cat] || cat); };
  var entryView = function(entry){
    if(!entry)return entry;
    var loc = (!isKo && typeof tc === 'function') ? tc('archiveEntries', entry.id, null) : null;
    if(!loc)return entry;
    var out = {};
    for(var k in entry){ if(entry.hasOwnProperty(k)) out[k] = entry[k]; }
    if(loc.title) out.title = loc.title;
    if(loc.content) out.content = loc.content;
    if(loc.cat) out.cat = loc.cat;
    return out;
  };
  var unlocked = ARCHIVE_ENTRIES.filter(function(e) { return e.unlock(p.logs) });
  var vEntries = ARCHIVE_ENTRIES.filter(function(e) { return !(e.hidden && !e.unlock(p.logs)) });
  var locked = vEntries.length - unlocked.length;
  var prevUnlocked = p.seenArchive || [];
  useEffect(function() {
    var newOnes = unlocked.filter(function(e) { return prevUnlocked.indexOf(e.id) < 0 });
    if (newOnes.length > 0) setNewUnlock(newOnes.length);
    if (p.onMarkSeen) {
      unlocked.forEach(function(e) { if (prevUnlocked.indexOf(e.id) < 0) p.onMarkSeen(e.id); });
    }
  }, []);
  var bgOverlay = IMG.bg_corridor ? h('div', { className: 'bg-overlay', style: { backgroundImage: 'url(' + IMG.bg_corridor + ')', opacity: 0.06 } }) : null;

  // ── 항목 상세 ──
  if (selEntry) {
    var entry = ARCHIVE_ENTRIES.filter(function(e) { return e.id === selEntry })[0];
    if (!entry) { setSelEntry(null); return null; }
    var eView = entryView(entry);
    if (p.onMarkSeen && prevUnlocked.indexOf(entry.id) < 0) p.onMarkSeen(entry.id);
    return h('div', { className: 'screen vw-screen' },
      h('div', { className: 'vw-wrap' },
        h('div', { className: 'vw-panel' },
          h('div', { className: 'vw-panel-h' }, '// ORACLE ARCHIVE', h('span', null, isKo ? '항목 열람' : 'ENTRY VIEW')),
          h('div', { style: { marginBottom: 10 } }, h('span', { className: 'vw-cat-badge' }, catLabel(entry.cat))),
          h('div', { className: 'vw-detail-title' }, eView.title),
          h('div', { className: 'vw-detail-body' }, eView.content)
        ),
        h('div', { className: 'vw-buttons' },
          h('button', { className: 'btn', onClick: function() { setSelEntry(null) } }, isKo ? '← 목록' : '← List'),
          h('button', { className: 'btn bf-enter', onClick: p.onClose }, isKo ? '닫기' : 'Close')
        )
      )
    );
  }

  // ── 카테고리 내 항목 목록 (스크롤 — 페이저 없음) ──
  if (selCat) {
    var catEntries = unlocked.filter(function(e) { return e.cat === selCat });
    var catLocked = vEntries.filter(function(e) { return e.cat === selCat && !e.unlock(p.logs) }).length;
    return h('div', { className: 'screen vw-screen' },
      bgOverlay,
      h('div', { className: 'vw-wrap' },
        h('div', { className: 'vw-panel' },
          h('div', { className: 'vw-panel-h' }, '// ' + catLabel(selCat).toUpperCase(), h('span', null, isKo ? (catEntries.length + ' 해금' + (catLocked > 0 ? ' · ' + catLocked + ' 미발견' : '')) : (catEntries.length + ' UNLOCKED' + (catLocked > 0 ? ' · ' + catLocked + ' LOCKED' : '')))),
          catEntries.map(function(e) {
            var isNew = prevUnlocked.indexOf(e.id) < 0;
            var eView = entryView(e);
            return h('div', { key: e.id, className: 'vw-row vw-row-entry' + (isNew ? ' is-new' : ''), onClick: function() { setSelEntry(e.id) } },
              h('span', { className: 'vw-row-name' }, eView.title),
              isNew && h('span', { className: 'vw-new-badge' }, 'NEW')
            );
          }),
          catLocked > 0 && h('div', { className: 'vw-note' }, isKo ? (catLocked + '건의 항목이 잠겨 있습니다') : (catLocked + ' entries still locked'))
        ),
        h('div', { className: 'vw-buttons' },
          h('button', { className: 'btn', onClick: function() { setSelCat(null) } }, isKo ? '← 카테고리' : '← Categories'),
          h('button', { className: 'btn bf-enter', onClick: p.onClose }, isKo ? '닫기' : 'Close')
        )
      )
    );
  }

  // ── 카테고리 그리드 (2열, 전체 한 화면) ──
  var pct = vEntries.length > 0 ? Math.round(unlocked.length / vEntries.length * 100) : 0;
  return h('div', { className: 'screen vw-screen' },
    bgOverlay,
    h('div', { className: 'vw-wrap' },
      h('div', { className: 'vw-panel' },
        h('div', { className: 'vw-panel-h' }, '// ORACLE ARCHIVE', h('span', null, unlocked.length + '/' + vEntries.length + (isKo ? ' 해금' : ' UNLOCKED'))),
        h('div', { className: 'vw-prog', 'aria-hidden': true }, h('div', { className: 'vw-prog-fill', style: { width: pct + '%' } })),
        h('div', { className: 'vw-cat-grid' },
          ARCHIVE_CATEGORIES.map(function(cat) {
            var catUnlocked = unlocked.filter(function(e) { return e.cat === cat }).length;
            var catTotal = vEntries.filter(function(e) { return e.cat === cat }).length;
            var catNew = unlocked.filter(function(e) { return e.cat === cat && prevUnlocked.indexOf(e.id) < 0 }).length;
            var isEmpty = catUnlocked === 0;
            return h('div', { key: cat, className: 'vw-cat-cell' + (isEmpty ? ' is-empty' : '') + (catNew > 0 ? ' is-new' : ''), onClick: isEmpty ? null : function() { setSelCat(cat) } },
              h('span', { className: 'vw-cat-cell-name' }, catLabel(cat)),
              h('div', { className: 'vw-cat-cell-meta' },
                catNew > 0 && h('span', { className: 'vw-new-badge' }, 'NEW ' + catNew),
                h('span', null, catUnlocked + '/' + catTotal)
              )
            );
          })
        ),
        locked > 0 && h('div', { className: 'vw-note' }, isKo ? (locked + '건의 항목이 잠겨 있습니다') : (locked + ' entries still locked'))
      ),
      h('div', { className: 'vw-buttons' },
        h('button', { className: 'btn bf-enter', onClick: p.onClose }, isKo ? '닫기' : 'Close')
      )
    )
  );
}
