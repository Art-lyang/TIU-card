// components-endings.js - SESSION ARCHIVE / ending trophy gallery
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
var getLocale=function(){return (window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko'};

var ENDING_CATALOG = [
  { id:'A', name:'완벽한 도구', hint:'ORACLE의 최고 운용자가 되어 임시 권한을 끝까지 수행한다.', category:'compliance' },
  { id:'B', name:'각성', hint:'진실의 편린을 목격하고 ORACLE의 구조를 의심한다.', category:'resistance' },
  { id:'C_cs', name:'봉쇄 성공', hint:'한국지부 안정화를 지나치게 완성한다.', category:'containment' },
  { id:'C_cst', name:'자충수', hint:'봉쇄 성공이 스스로의 권한 종료로 되돌아오게 만든다.', category:'containment' },
  { id:'C_c', name:'봉쇄 붕괴', hint:'봉쇄선이 무너질 만큼 containment를 잃는다.', category:'failure' },
  { id:'C_r', name:'자원 고갈', hint:'기지가 움직일 물자를 모두 잃는다.', category:'failure' },
  { id:'C_t', name:'신뢰 상실', hint:'동료들이 더는 지휘관을 따르지 않는다.', category:'failure' },
  { id:'C_o', name:'접속 차단', hint:'ORACLE이 지휘관의 접속 권한을 회수한다.', category:'failure' },
  { id:'D', name:'조용한 자유', hint:'반대편의 도움 없이 낮은 소리로 빠져나간다.', category:'resistance' },
  { id:'E', name:'탈출', hint:'비밀통로를 통해 기지 밖으로 살아나간다.', category:'escape' },
  { id:'E_c', name:'SIGNAL ACQUIRED', hint:'탈출 도중 신호가 먼저 붙잡힌다.', category:'escape' },
  { id:'E_bad', name:'LOST IN TRANSIT', hint:'통신과 목소리 사이에서 길을 잃는다.', category:'escape' },
  { id:'F', name:'[데이터 손상]', hint:'OBSERVER 레이어의 승인을 따라 데이터가 깨지는 지점까지 간다.', category:'observer' },
  { id:'G', name:'관망자', hint:'어느 쪽도 완전히 선택하지 않은 채 마지막까지 남는다.', category:'neutral' },
  { id:'H', name:'기지 점거', hint:'독립 인프라와 간부 신뢰를 모아 기지를 스스로의 손에 둔다.', category:'uprising' },
  { id:'TIME_UP', name:'세션 만료', hint:'35일 임시 파견 기간을 넘겨 세션 종료 판정을 받는다.', category:'timeout' }
];

var ENDING_CATEGORY_META = {
  compliance:  { label:'ORACLE 복종', labelEn:'ORACLE Compliance', color:'#4aaeee' },
  resistance:  { label:'저항', labelEn:'Resistance', color:'#f0a030' },
  containment: { label:'봉쇄', labelEn:'Containment', color:'#cc7722' },
  escape:      { label:'탈출', labelEn:'Escape', color:'#77cc99' },
  observer:    { label:'Observer', labelEn:'Observer', color:'#cc55cc' },
  neutral:     { label:'중립', labelEn:'Neutral', color:'#888888' },
  failure:     { label:'실패', labelEn:'Failure', color:'#aa4444' },
  uprising:    { label:'점거', labelEn:'Occupation', color:'#dd8800' },
  timeout:     { label:'만료', labelEn:'Timeout', color:'#6f8f9a' }
};

function EndingScreen(p) {
  var h = React.createElement;
  var ss = React.useState(null);
  var sel = ss[0], setSel = ss[1];
  var locale = getLocale();
  var isKo = locale === 'ko';
  var total = ENDING_CATALOG.length;
  var unlocked = p.endings || [];
  var unlockedIds = {};
  unlocked.forEach(function(id){ unlockedIds[id] = true; });
  var unlockedCount = ENDING_CATALOG.filter(function(e){ return unlockedIds[e.id]; }).length;
  var progress = Math.round((unlockedCount / Math.max(1,total)) * 100);
  var getEndingView = function(id,fallback){ return (typeof tc === 'function') ? tc('endings',id,fallback||{}) : (fallback||{}); };
  var getMeta = function(cat){ return ENDING_CATEGORY_META[cat] || { label:cat, labelEn:cat, color:'#888' }; };
  var endingNo = function(id){ var i = ENDING_CATALOG.map(function(x){return x.id;}).indexOf(id); return i>=0 ? ('#'+('0'+(i+1)).slice(-2)) : ''; };

  function renderNarrative(lines){
    return h('div', { style: { fontSize:12, lineHeight:2, padding:'0 16px', maxWidth:460, margin:'0 auto', whiteSpace:'pre-wrap' } },
      (lines || []).map(function(line, i) {
        var text = String(line || '');
        var isCmd = text.indexOf('>') === 0 || text.indexOf('[') === 0;
        var isEmpty = text === '';
        return h('div', { key:i, style: { color:isCmd ? '#f0a030' : 'var(--ui)', fontFamily:isCmd ? "'Share Tech Mono',monospace" : 'inherit', fontWeight:isCmd ? 'bold' : 'normal', minHeight:isEmpty ? 10 : 'auto' } }, isEmpty ? ' ' : text);
      })
    );
  }

  if (sel) {
    var lockedDetail = !unlockedIds[sel.id];
    var def = (typeof ENDING_DEFS !== 'undefined') ? ENDING_DEFS[sel.id] : null;
    var img = (!lockedDetail && typeof IMG !== 'undefined') ? IMG['ending_' + sel.id] : null;
    var narr = def && def.narrative ? def.narrative : null;
    var selView = getEndingView(sel.id,{name:sel.name,hint:sel.hint,narrative:narr});
    var viewNarr = selView.narrative || narr;
    var meta = getMeta(sel.category);
    return h('div', { className:'screen' },
      h('div', { style: { width:'100%', maxWidth:500, padding:'20px 0', flex:1, overflowY:'auto' } },
        h('div', { style: { fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'var(--ui-dim)', letterSpacing:2, textAlign:'center', marginBottom:8 } },
          (lockedDetail ? tt('endingGallery.hintCard', null, isKo ? 'ENDING HINT CARD' : 'ENDING HINT CARD') : tt('endingGallery.trophyCard', null, isKo ? 'ENDING TROPHY' : 'ENDING TROPHY')) + ' · ' + endingNo(sel.id)),
        h('div', { style: { textAlign:'center', marginBottom:12 } },
          h('span', { style: { display:'inline-block', fontFamily:"'Share Tech Mono',monospace", fontSize:10, letterSpacing:1.5, color:meta.color, border:'1px solid '+meta.color, borderRadius:3, padding:'3px 8px', background:'rgba(0,0,0,.35)' } }, isKo ? meta.label : meta.labelEn)),
        lockedDetail ? h('div', { style: { margin:'0 auto 16px', maxWidth:460, minHeight:190, border:'1px solid rgba(240,160,48,.28)', borderRadius:4, background:'linear-gradient(180deg, rgba(20,14,4,.72), rgba(4,4,4,.92))', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:22, textAlign:'center' } },
          h('div', { style: { fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'#f0a030', letterSpacing:2, marginBottom:10 } }, tt('endingGallery.locked', null, isKo ? '[미도달]' : '[Locked]')),
          h('div', { style: { fontSize:20, fontWeight:700, color:'#555', marginBottom:12 } }, selView.name || sel.name),
          h('div', { style: { fontSize:13, color:'#b8924a', lineHeight:1.7, maxWidth:360 } }, selView.hint || sel.hint)
        ) : null,
        img && h('img', { src:img, alt:selView.name, style: { width:'100%', maxWidth:460, display:'block', margin:'0 auto 14px', borderRadius:4, border:'1px solid rgba(var(--ui-rgb),.2)' } }),
        !lockedDetail && viewNarr && renderNarrative(viewNarr),
        h('div', { style: { display:'flex', gap:10, justifyContent:'center', marginTop:24 } },
          h('button', { className:'btn', style: { fontSize:12, padding:'8px 20px', marginTop:0 }, onClick:function(){ setSel(null); } }, tt('endingGallery.back', null, isKo ? '< 갤러리' : '< Gallery')),
          h('button', { className:'btn btn-amber', style: { fontSize:12, padding:'8px 20px', marginTop:0 }, onClick:p.onClose }, tt('endingGallery.close', null, isKo ? '닫기' : 'Close'))
        )
      )
    );
  }

  var rows = ENDING_CATALOG.map(function(e) {
    var meta = getMeta(e.category);
    var locked = !unlockedIds[e.id];
    var img = (!locked && typeof IMG !== 'undefined') ? IMG['ending_' + e.id] : null;
    var eView = getEndingView(e.id,{name:e.name,hint:e.hint});
    return h('button', { key:e.id, type:'button', onClick:function(){ setSel(e); }, style: { position:'relative', background:locked ? '#080808' : 'var(--ui-bg)', border:'1px solid ' + (locked ? 'rgba(240,160,48,.18)' : meta.color), borderRadius:4, overflow:'hidden', cursor:'pointer', opacity:locked ? 0.68 : 1, padding:0, textAlign:'left', minHeight:208 } },
      h('div', { style: { height:118, background:img ? ('url(' + img + ') center/cover no-repeat') : 'linear-gradient(135deg,#050505,#15100a)', position:'relative', borderBottom:'1px solid rgba(var(--ui-rgb),.15)' } },
        locked && h('div', { style: { position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', fontFamily:"'Share Tech Mono',monospace", color:'#3a2a12', letterSpacing:3 } },
          h('span', { style: { fontSize:25, lineHeight:1 } }, '?'),
          h('span', { style: { fontSize:9, marginTop:8 } }, tt('endingGallery.hint', null, 'HINT'))),
        !locked && h('div', { style: { position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.58))' } }),
        h('div', { style: { position:'absolute', top:6, left:8, fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:1, color:locked ? '#f0a030' : meta.color, background:'rgba(0,0,0,.58)', padding:'2px 6px', borderRadius:2 } }, endingNo(e.id)),
        h('div', { style: { position:'absolute', right:8, bottom:7, fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:1.5, color:locked ? '#9a6c28' : '#7affc6' } }, locked ? tt('endingGallery.hintCardShort', null, 'HINT CARD') : tt('endingGallery.trophy', null, 'TROPHY'))
      ),
      h('div', { style: { padding:'10px 12px 12px' } },
        h('div', { style: { fontSize:13, fontWeight:'bold', color:locked ? '#8a6936' : 'var(--ui)', marginBottom:5 } }, locked ? tt('endingGallery.locked', null, isKo ? '[미도달]' : '[Locked]') : eView.name),
        h('div', { style: { fontSize:10, fontStyle:locked ? 'normal' : 'italic', color:locked ? '#9d7d45' : 'var(--ui-dim)', letterSpacing:0.2, lineHeight:1.55 } },
          locked ? (eView.hint || e.hint) : (tt('endingGallery.achieved', null, isKo ? '달성 완료' : 'Achieved') + ' - ' + (isKo ? meta.label : meta.labelEn)))
      )
    );
  });

  return h('div', { className:'screen' },
    h('div', { style: { width:'100%', maxWidth:520, padding:'20px 12px', flex:1, overflowY:'auto' } },
      h('div', { style: { fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'var(--ui-dim)', letterSpacing:2, textAlign:'center', marginBottom:6 } }, tt('endingGallery.title', null, isKo ? 'SESSION ARCHIVE - 엔딩 갤러리' : 'SESSION ARCHIVE - ENDING GALLERY')),
      h('div', { style: { fontSize:12, color:'#888', textAlign:'center', marginBottom:12 } }, tt('endingGallery.summary', { sessions:p.sessions || 0, unlocked:unlockedCount, total:total }, isKo ? ('총 세션: ' + (p.sessions || 0) + '  |  엔딩 해금: ' + unlockedCount + ' / ' + total) : ('Sessions: ' + (p.sessions || 0) + '  |  Endings: ' + unlockedCount + ' / ' + total))),
      h('div', { style: { height:6, border:'1px solid rgba(var(--ui-rgb),.2)', background:'#050505', margin:'0 auto 18px', maxWidth:360, borderRadius:99, overflow:'hidden' } },
        h('div', { style: { width:progress + '%', height:'100%', background:'linear-gradient(90deg,#f0a030,#7affc6)' } })),
      h('div', { style: { display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:10 } }, rows),
      h('button', { className:'btn btn-amber', style: { display:'block', margin:'24px auto 8px', fontSize:12, padding:'8px 20px' }, onClick:p.onClose }, tt('endingGallery.close', null, isKo ? '닫기' : 'Close'))
    )
  );
}

if (typeof window !== 'undefined') {
  window.EndingScreen = EndingScreen;
  window.ENDING_CATALOG = ENDING_CATALOG;
}
