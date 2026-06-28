// components-archive.js - ORACLE ARCHIVE viewer (dossier)
var getLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};

function ArchiveViewer(p) {
  var s1 = useState(null), selCat = s1[0], setSelCat = s1[1];
  var s2 = useState(null), selEntry = s2[0], setSelEntry = s2[1];
  var s3 = useState(null), newUnlock = s3[0], setNewUnlock = s3[1];
  var sp = useState(0), catPage = sp[0], setCatPage = sp[1];
  var se = useState(0), entryPage = se[0], setEntryPage = se[1];
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
  var locked = ARCHIVE_ENTRIES.length - unlocked.length;
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

  // ── 카테고리 내 항목 목록 ──
  if (selCat) {
    var catEntries = unlocked.filter(function(e) { return e.cat === selCat });
    var catLocked = ARCHIVE_ENTRIES.filter(function(e) { return e.cat === selCat && !e.unlock(p.logs) }).length;
    var ENTRY_PER = 5;
    var entryPages = Math.max(1, Math.ceil(catEntries.length / ENTRY_PER));
    var safeEntryPage = Math.max(0, Math.min(entryPage, entryPages - 1));
    var entryPageList = catEntries.slice(safeEntryPage * ENTRY_PER, safeEntryPage * ENTRY_PER + ENTRY_PER);
    var entryPager = function(){
      if(entryPages<=1)return null;
      var btn=function(label,disabled,np){return h('button',{className:'btn',disabled:disabled,style:{fontSize:11,padding:'6px 14px',marginTop:0,minHeight:0,opacity:disabled?0.3:1,cursor:disabled?'default':'pointer'},onClick:function(){if(!disabled)setEntryPage(np)}},label)};
      return h('div',{className:'vw-pager'},
        btn(isKo?'이전':'PREV',safeEntryPage<=0,Math.max(0,safeEntryPage-1)),
        h('span',{className:'vw-pager-n'},(safeEntryPage+1)+' / '+entryPages),
        btn(isKo?'다음':'NEXT',safeEntryPage>=entryPages-1,Math.min(entryPages-1,safeEntryPage+1)));
    };
    return h('div', { className: 'screen vw-screen' },
      bgOverlay,
      h('div', { className: 'vw-wrap' },
        h('div', { className: 'vw-panel' },
          h('div', { className: 'vw-panel-h' }, '// ' + catLabel(selCat).toUpperCase(), h('span', null, isKo ? (catEntries.length + '해금' + (catLocked > 0 ? ' / ' + catLocked + '미발견' : '')) : (catEntries.length + ' / ' + catLocked + ' LOCKED'))),
          entryPager(),
          entryPageList.map(function(e) {
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

  // ── 카테고리 목록 ──
  var CAT_PER = 5;
  var catPages = Math.max(1, Math.ceil(ARCHIVE_CATEGORIES.length / CAT_PER));
  var safeCatPage = Math.max(0, Math.min(catPage, catPages - 1));
  var catPager = function(){
      if(catPages<=1)return null;
      var btn=function(label,disabled,np){return h('button',{className:'btn',disabled:disabled,style:{fontSize:11,padding:'6px 14px',marginTop:0,minHeight:0,opacity:disabled?0.3:1,cursor:disabled?'default':'pointer'},onClick:function(){if(!disabled)setCatPage(np)}},label)};
      return h('div',{className:'vw-pager'},
        btn(isKo?'이전':'PREV',safeCatPage<=0,Math.max(0,safeCatPage-1)),
        h('span',{className:'vw-pager-n'},(safeCatPage+1)+' / '+catPages),
        btn(isKo?'다음':'NEXT',safeCatPage>=catPages-1,Math.min(catPages-1,safeCatPage+1)));
    };
  return h('div', { className: 'screen vw-screen' },
    bgOverlay,
    h('div', { className: 'vw-wrap' },
      h('div', { className: 'vw-panel' },
        h('div', { className: 'vw-panel-h' }, '// ORACLE ARCHIVE', h('span', null, unlocked.length + '/' + ARCHIVE_ENTRIES.length + (isKo ? ' 해금' : ' UNLOCKED'))),
        catPager(),
        ARCHIVE_CATEGORIES.slice(safeCatPage * CAT_PER, safeCatPage * CAT_PER + CAT_PER).map(function(cat) {
          var catUnlocked = unlocked.filter(function(e) { return e.cat === cat }).length;
          var catTotal = ARCHIVE_ENTRIES.filter(function(e) { return e.cat === cat }).length;
          var catNew = unlocked.filter(function(e) { return e.cat === cat && prevUnlocked.indexOf(e.id) < 0 }).length;
          var isEmpty = catUnlocked === 0;
          return h('div', { key: cat, className: 'vw-row' + (isEmpty ? ' is-empty' : '') + (catNew > 0 ? ' is-new' : ''), onClick: isEmpty ? null : function() { setEntryPage(0); setSelCat(cat) } },
            h('span', { className: 'vw-row-name' }, catLabel(cat)),
            h('div', { className: 'vw-row-meta' },
              catNew > 0 && h('span', { className: 'vw-new-badge' }, 'NEW ' + catNew),
              h('span', null, catUnlocked + '/' + catTotal)
            )
          );
        }),
        locked > 0 && h('div', { className: 'vw-note' }, isKo ? (locked + '건의 항목이 잠겨 있습니다') : (locked + ' entries still locked'))
      ),
      h('div', { className: 'vw-buttons' },
        h('button', { className: 'btn bf-enter', onClick: p.onClose }, isKo ? '닫기' : 'Close')
      )
    )
  );
}
