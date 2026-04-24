// components-endings.js - SESSION ARCHIVE / ending gallery
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
var getLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};

var ENDING_CATALOG = [
  { id: 'A',     name: '완벽한 도구', hint: 'ORACLE의 최고 신임을 얻으라', category: 'compliance' },
  { id: 'B',     name: '각성', hint: '진실의 단편을 목격하라', category: 'resistance' },
  { id: 'C_cs',  name: '봉쇄 성공', hint: '완벽한 봉쇄를 달성하라', category: 'containment' },
  { id: 'C_cst', name: '자충수', hint: '봉쇄의 대가를 치르다', category: 'containment' },
  { id: 'C_c',   name: '봉쇄 붕괴', hint: '봉쇄선이 무너지다', category: 'failure' },
  { id: 'C_r',   name: '자원 고갈', hint: '기지가 기능을 잃다', category: 'failure' },
  { id: 'C_t',   name: '신뢰 상실', hint: '동료들이 떠나다', category: 'failure' },
  { id: 'C_o',   name: '접속 차단', hint: 'ORACLE이 당신을 버리다', category: 'failure' },
  { id: 'D',     name: '조용한 자유', hint: '반란 속의 해방', category: 'resistance' },
  { id: 'E',     name: '탈출', hint: '해안으로 빠져나가라', category: 'escape' },
  { id: 'E_c',   name: 'SIGNAL ACQUIRED', hint: '탈출이 무너질 때', category: 'escape' },
  { id: 'E_bad', name: 'LOST IN TRANSIT', hint: '익숙한 목소리의 유인', category: 'escape' },
  { id: 'F',     name: '[데이터 손상]', hint: '???', category: 'observer' },
  { id: 'G',     name: '관망자', hint: '어느 쪽도 선택하지 않다', category: 'neutral' },
  { id: 'H',     name: '점거', hint: '기지를 우리 손에 두다', category: 'uprising' }
];

var ENDING_CATEGORY_META = {
  compliance:  { label: 'ORACLE 복종', color: '#4ae', labelEn: 'ORACLE Compliance' },
  resistance:  { label: '저항', color: '#f0a030', labelEn: 'Resistance' },
  containment: { label: '봉쇄', color: '#c72', labelEn: 'Containment' },
  escape:      { label: '탈출', color: '#7c9', labelEn: 'Escape' },
  observer:    { label: 'Observer', color: '#c5c', labelEn: 'Observer' },
  neutral:     { label: '중립', color: '#888', labelEn: 'Neutral' },
  failure:     { label: '실패', color: '#a44', labelEn: 'Failure' },
  uprising:    { label: '점거', color: '#d80', labelEn: 'Occupation' }
};

function EndingScreen(p) {
  var h = React.createElement;
  var ss = React.useState(null);
  var sel = ss[0], setSel = ss[1];
  var locale = getLocale();
  var isKo = locale === 'ko';
  var total = ENDING_CATALOG.length;
  var unlocked = p.endings || [];
  var unlockedCount = ENDING_CATALOG.filter(function(e){ return unlocked.indexOf(e.id) >= 0; }).length;
  var unlockedIds = {};
  unlocked.forEach(function(id){ unlockedIds[id] = true; });
  var getEndingView=function(id,fallback){return (typeof tc==='function')?tc('endings',id,fallback||{}):(fallback||{})};
  if (sel) {
    var def = (typeof ENDING_DEFS !== 'undefined') ? ENDING_DEFS[sel.id] : null;
    var img = (typeof IMG !== 'undefined') ? IMG['ending_' + sel.id] : null;
    var narr = def && def.narrative ? def.narrative : null;
    var selView=getEndingView(sel.id,{name:sel.name,hint:sel.hint,narrative:narr});
    var viewNarr=selView.narrative||narr;
    return h('div', { className: 'screen' },
      h('div', { style: { width: '100%', maxWidth: 500, padding: '20px 0', flex: 1, overflowY: 'auto' } },
        h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: 'var(--ui-dim)', letterSpacing: 2, textAlign: 'center', marginBottom: 10 } }, 'ENDING ' + sel.id + ' - ' + selView.name),
        img && h('img', { src: img, alt: selView.name, style: { width: '100%', maxWidth: 460, display: 'block', margin: '0 auto 14px', borderRadius: 4, border: '1px solid rgba(var(--ui-rgb),.2)' } }),
        viewNarr && h('div', { style: { fontSize: 12, lineHeight: 2, padding: '0 16px', maxWidth: 460, margin: '0 auto', whiteSpace: 'pre-wrap' } }, viewNarr.map(function(l, i) {
          var isCmd = l.indexOf('>') === 0 || l.indexOf('[') === 0;
          var isEmpty = l === '';
          return h('div', { key: i, style: { color: isCmd ? '#f0a030' : 'var(--ui)', fontFamily: isCmd ? "'Share Tech Mono',monospace" : 'inherit', fontWeight: isCmd ? 'bold' : 'normal', minHeight: isEmpty ? 10 : 'auto' } }, isEmpty ? ' ' : l);
        })),
        h('div', { style: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24 } }, h('button', { className: 'btn', style: { fontSize: 12, padding: '8px 20px', marginTop: 0 }, onClick: function(){ setSel(null); } }, isKo ? '← 갤러리' : '← Gallery'))
      )
    );
  }
  var rows = [];
  ENDING_CATALOG.forEach(function(e) {
    var meta = ENDING_CATEGORY_META[e.category] || { label: e.category, labelEn: e.category, color: '#888' };
    var locked = !unlockedIds[e.id];
    var img = (!locked && typeof IMG !== 'undefined') ? IMG['ending_' + e.id] : null;
    var eView=getEndingView(e.id,{name:e.name,hint:e.hint});
    rows.push(h('div', { key: e.id, onClick: locked ? null : function(){ setSel(e); }, style: { position: 'relative', background: locked ? '#080808' : 'var(--ui-bg)', border: '1px solid ' + (locked ? '#111' : meta.color), borderRadius: 4, overflow: 'hidden', cursor: locked ? 'default' : 'pointer', opacity: locked ? 0.55 : 1, transition: 'transform .15s' } },
      h('div', { style: { height: 120, background: img ? ('url(' + img + ') center/cover no-repeat') : '#050505', position: 'relative', borderBottom: '1px solid rgba(var(--ui-rgb),.15)' } },
        locked && h('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Share Tech Mono',monospace", fontSize: 28, color: '#222', letterSpacing: 4 } }, '?'),
        !locked && h('div', { style: { position: 'absolute', top: 6, left: 8, fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 1, color: meta.color, background: 'rgba(0,0,0,.5)', padding: '2px 6px', borderRadius: 2 } }, '[' + e.id + ']')
      ),
      h('div', { style: { padding: '10px 12px' } },
        h('div', { style: { fontSize: 13, fontWeight: 'bold', color: locked ? '#333' : 'var(--ui)', marginBottom: 4 } }, locked ? (isKo ? '[미발견]' : '[Locked]') : eView.name),
        h('div', { style: { fontSize: 10, fontStyle: 'italic', color: locked ? '#222' : 'var(--ui-dim)', letterSpacing: 0.3 } }, locked ? eView.hint : ((isKo ? '달성 완료' : 'Achieved') + ' - ' + (isKo ? meta.label : meta.labelEn)))
      )
    ));
  });
  return h('div', { className: 'screen' },
    h('div', { style: { width: '100%', maxWidth: 500, padding: '20px 12px', flex: 1, overflowY: 'auto' } },
      h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: 'var(--ui-dim)', letterSpacing: 2, textAlign: 'center', marginBottom: 6 } }, isKo ? 'SESSION ARCHIVE - 엔딩 갤러리' : 'SESSION ARCHIVE - ENDING GALLERY'),
      h('div', { style: { fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 18 } }, isKo ? ('총 세션: ' + (p.sessions || 0) + '  |  엔딩 해금: ' + unlockedCount + ' / ' + total) : ('Sessions: ' + (p.sessions || 0) + '  |  Endings: ' + unlockedCount + ' / ' + total)),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 } }, rows),
      h('button', { className: 'btn btn-amber', style: { display: 'block', margin: '24px auto 8px', fontSize: 12, padding: '8px 20px' }, onClick: p.onClose }, isKo ? '닫기' : 'Close')
    )
  );
}

if (typeof window !== 'undefined') {
  window.EndingScreen = EndingScreen;
  window.ENDING_CATALOG = ENDING_CATALOG;
}
