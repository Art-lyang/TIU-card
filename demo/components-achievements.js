// components-achievements.js — 업적 뷰어 페이지 (메뉴/게임오버에서 진입)
// 데이터: data-achievements.js의 ACHIEVEMENTS + getAchievementView(i18n). 해금 상태는 unlockedIds(해금된 id 배열).
(function(){
  var h = React.createElement;
  function AchievementsScreen(p){
    var locale = (window.TS_I18N && window.TS_I18N.getLocale) ? window.TS_I18N.getLocale() : 'ko';
    var isKo = locale === 'ko';
    var T = function(k,f){ return (typeof tt === 'function') ? tt(k,null,f) : f; };
    var list = (typeof ACHIEVEMENTS !== 'undefined') ? ACHIEVEMENTS : [];
    var unlocked = {};
    (p.unlockedIds || []).forEach(function(id){ unlocked[id] = true; });
    var total = list.length;
    var uc = list.filter(function(a){ return unlocked[a.id]; }).length;
    var progress = Math.round((uc / Math.max(1,total)) * 100);

    var rows = list.map(function(a,i){
      var has = !!unlocked[a.id];
      var v = (typeof getAchievementView === 'function') ? getAchievementView(a) : a;
      var secret = a.hidden && !has;
      var name = secret ? (isKo ? '??? · 히든 업적' : '??? · Hidden') : (v.name || a.name);
      var desc = secret ? (isKo ? '조건을 달성하면 공개됩니다.' : 'Revealed when unlocked.') : (v.desc || a.desc || '');
      return h('div', { key:a.id, style:{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 12px',
          border:'1px solid ' + (has ? 'rgba(var(--ui-rgb),.4)' : 'rgba(var(--ui-rgb),.13)'), borderRadius:4,
          background: has ? 'rgba(var(--ui-rgb),.05)' : 'rgba(3,7,8,.6)', opacity: has ? 1 : 0.72 } },
        h('div', { style:{ flexShrink:0, width:26, height:26, borderRadius:'50%', display:'flex', alignItems:'center',
          justifyContent:'center', fontFamily:"'Share Tech Mono',monospace", fontSize:12,
          color: has ? '#7affc6' : 'rgba(var(--ui-rgb),.4)', border:'1px solid ' + (has ? '#7affc6' : 'rgba(var(--ui-rgb),.25)') } }, has ? '✓' : '🔒'),
        h('div', { style:{ flex:1, minWidth:0 } },
          h('div', { style:{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'baseline' } },
            h('span', { style:{ fontSize:13, fontWeight:'bold', color: has ? 'var(--ui)' : 'rgba(var(--ui-rgb),.55)' } }, name),
            h('span', { style:{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:1, color:'rgba(var(--ui-rgb),.4)' } }, '#' + ('0' + (i+1)).slice(-2))),
          h('div', { style:{ fontSize:11, lineHeight:1.5, color: has ? 'var(--ui-dim)' : 'rgba(var(--ui-rgb),.4)', marginTop:3 } }, desc),
          h('div', { style:{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:1.5, marginTop:5,
            color: has ? '#7affc6' : 'rgba(var(--ui-rgb),.35)' } }, has ? (isKo ? '달성' : 'UNLOCKED') : (isKo ? '미달성' : 'LOCKED')))
      );
    });

    return h('div', { className:'screen' },
      h('div', { style:{ width:'100%', maxWidth:520, padding:'20px 12px', flex:1, overflowY:'auto' } },
        h('div', { style:{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:'var(--ui-dim)', letterSpacing:2, textAlign:'center', marginBottom:6 } },
          T('achievements.title', isKo ? '업적 — ACHIEVEMENTS' : 'ACHIEVEMENTS')),
        h('div', { style:{ fontSize:12, color:'#888', textAlign:'center', marginBottom:12 } },
          (isKo ? '해금: ' : 'Unlocked: ') + uc + ' / ' + total + ' (' + progress + '%)'),
        h('div', { style:{ height:6, border:'1px solid rgba(var(--ui-rgb),.2)', background:'#050505', margin:'0 auto 18px', maxWidth:360, borderRadius:99, overflow:'hidden' } },
          h('div', { style:{ width:progress + '%', height:'100%', background:'linear-gradient(90deg,#f0a030,#7affc6)' } })),
        h('div', { style:{ display:'flex', flexDirection:'column', gap:8 } }, rows),
        h('button', { className:'btn btn-amber', style:{ display:'block', margin:'24px auto 8px', fontSize:12, padding:'8px 20px' }, onClick:p.onClose },
          isKo ? '닫기' : 'Close')
      )
    );
  }
  if (typeof window !== 'undefined') window.AchievementsScreen = AchievementsScreen;
})();
