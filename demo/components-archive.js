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
  // ── 카테고리 대표 아트 (IMG 키). 키가 없으면 조용히 무이미지 폴백 ──
  var CAT_ART = {
    '이변체':'spec_001_mannequin',
    '인물':'card_core_officers_command_room',
    '조직':'logo_oracle_hq',
    '시설':'facility_fe006_cctv_control',
    '과학':'card_core_lab_corridor',
    '시스템':'card_core_oracle_firmware',
    '지역':'bg_seoul_a',
    '사건기록':'card_breach_horde',
    '인물심화':'char_soyoung_shadow',
    '작전가이드':'mission_m001',
    '시설기록':'facility_fe003_sensor_array',
    '보안감사':'card_feed_gap',
    '프로토콜':'card_core_oracle_loyalty',
    '현장분석':'mission_m007'
  };
  var artUrl = function(key){ return (key && typeof IMG !== 'undefined' && IMG[key]) ? IMG[key] : null; };
  // 엔트리 전용 아트: 이변체(ARC-SPEC-###)는 스펙 아트, 인물 계열은 초상. 없으면 카테고리 아트.
  var entryArt = function(entry){
    var id = (entry && entry.id) || '';
    var m = id.match(/SPEC[-_]?0*(\d+)/i);
    if (m && typeof IMG !== 'undefined') {
      var pfx = 'spec_' + ('00' + m[1]).slice(-3) + '_';
      for (var k in IMG) { if (k.indexOf(pfx) === 0) return IMG[k]; }
    }
    var chars = [['DOYUN','char_doyun'],['HAEUN','char_haeun'],['SEJIN','char_sejin'],['JAEHYUK','char_jaehyuk'],['SOYOUNG','char_soyoung_shadow'],['WEBER','char_weber'],['FOSTER','char_foster'],['JUNGCHUL','char_jungchul']];
    for (var i = 0; i < chars.length; i++) { if (id.indexOf(chars[i][0]) >= 0) return artUrl(chars[i][1]); }
    return artUrl(CAT_ART[entry && entry.cat]);
  };
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
          (function(){ var a = entryArt(entry); return a ? h('div', { className: 'vw-banner vw-banner--detail', 'aria-hidden': true }, h('div', { className: 'vw-banner-img', style: { backgroundImage: 'url(' + a + ')' } })) : null; })(),
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
          (function(){ var a = artUrl(CAT_ART[selCat]); return a ? h('div', { className: 'vw-banner', 'aria-hidden': true }, h('div', { className: 'vw-banner-img', style: { backgroundImage: 'url(' + a + ')' } }), h('span', { className: 'vw-banner-t' }, catLabel(selCat))) : null; })(),
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
            var art = artUrl(CAT_ART[cat]);
            return h('div', { key: cat, className: 'vw-cat-cell' + (isEmpty ? ' is-empty' : '') + (catNew > 0 ? ' is-new' : ''), onClick: isEmpty ? null : function() { setSelCat(cat) } },
              art && h('div', { className: 'vw-cat-cell-art', style: { backgroundImage: 'url(' + art + ')' }, 'aria-hidden': true }),
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
