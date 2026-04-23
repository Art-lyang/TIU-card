// TERMINAL SESSION — components-settings-2.js (2/2)
// 설정 패널 — SAVE/INFO 탭 + 메인 SettingsPanel 컴포넌트

function SettingsSaveTab(p) {
  var _cf = useState(null), cfm = _cf[0], setCfm = _cf[1];
  var _ci = useState(''), cfmInput = _ci[0], setCfmInput = _ci[1];
  var sessions = Save.getSessions();
  var endings = Save.getEndings();
  var logs = Save.getLogs();
  var mono = { fontFamily: "'Share Tech Mono',monospace", fontSize: 13, color: 'var(--ui)' };

  var cfmModal = function () {
    if (!cfm) return null;
    var needInput = !!cfm.inputKey;
    var inputOk = !needInput || cfmInput === cfm.inputKey;
    return h('div', { style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 310 } },
      h('div', { style: { background: '#0a120a', border: '1px solid rgba(255,68,68,0.4)',
        padding: '20px 24px', maxWidth: 300, textAlign: 'center' } },
        h('div', { style: { fontSize: 13, color: '#ff4444', marginBottom: 16,
          whiteSpace: 'pre-wrap', lineHeight: 1.7 } }, cfm.msg),
        needInput && h('div', { style: { marginBottom: 12 } },
          h('div', { style: { fontSize: 11, color: 'rgba(255,68,68,0.6)', marginBottom: 6 } },
            '"삭제"를 입력하세요'),
          h('input', { type: 'text', value: cfmInput, maxLength: 4,
            style: { width: '100%', background: 'rgba(255,68,68,0.08)',
              border: '1px solid rgba(255,68,68,0.3)', color: '#ff4444',
              fontFamily: "'Share Tech Mono',monospace", fontSize: 13,
              padding: '6px 10px', textAlign: 'center', outline: 'none' },
            onChange: function (e) { setCfmInput(e.target.value); } })),
        h('div', { style: { display: 'flex', gap: 10, justifyContent: 'center' } },
          h('button', { className: 'btn',
            style: { fontSize: 11, padding: '8px 16px', marginTop: 0 },
            onClick: function () { setCfm(null); setCfmInput(''); } }, '취소'),
          h('button', { className: 'btn btn-amber',
            disabled: !inputOk,
            style: { fontSize: 11, padding: '8px 16px', marginTop: 0,
              opacity: inputOk ? 1 : 0.3, cursor: inputOk ? 'pointer' : 'not-allowed' },
            onClick: function () { if (!inputOk) return; cfm.action(); setCfm(null); setCfmInput(''); } }, '확인'))));
  };

  var _snaps = useState(function(){return Save.listSnapshots()}), snaps = _snaps[0], setSnaps = _snaps[1];
  var fmtTime = function(ts){if(!ts)return '';var d=new Date(ts);return (d.getMonth()+1)+'/'+d.getDate()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
  var slotRow = function(s){
    var data = s.data;
    var label = data ? data.label : '빈 슬롯';
    var timeStr = data ? fmtTime(data.timestamp) : '';
    var sesStr = (data && data.sessions != null) ? ' · 세션 '+data.sessions+'회' : '';
    return h('div',{key:s.slot,style:{display:'flex',alignItems:'center',gap:6,padding:'8px 10px',marginBottom:6,background:data?'rgba(var(--ui-rgb),.05)':'rgba(255,255,255,.02)',border:'1px solid '+(data?'rgba(var(--ui-rgb),.2)':'rgba(255,255,255,.08)'),borderRadius:2}},
      h('div',{style:{flex:1,minWidth:0}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.5)',letterSpacing:1}},'SLOT '+s.slot),
        h('div',{style:{fontSize:12,color:data?'var(--ui)':'rgba(255,255,255,.3)',fontWeight:'bold',marginTop:2}},label),
        data&&h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.4)',marginTop:2,fontFamily:"'Share Tech Mono',monospace"}},timeStr+sesStr)
      ),
      h('button',{style:{background:'rgba(var(--ui-rgb),.1)',border:'1px solid rgba(var(--ui-rgb),.3)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){setCfm({msg:'슬롯 '+s.slot+'에 현재 상황을 저장합니다.\n'+(data?'기존 데이터를 덮어씁니다.':''),action:function(){if(p.onSaveSnap)p.onSaveSnap(s.slot);setSnaps(Save.listSnapshots());}})}},'저장'),
      data&&h('button',{style:{background:'rgba(240,160,48,.1)',border:'1px solid rgba(240,160,48,.3)',color:'#f0a030',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){setCfm({msg:'슬롯 '+s.slot+' 데이터를 불러옵니다.\n현재 진행 상황은 덮어써집니다.',action:function(){if(p.onLoadSnap)p.onLoadSnap(s.slot);p.onClose()}})}},'로드'),
      data&&h('button',{style:{background:'rgba(255,68,68,.08)',border:'1px solid rgba(255,68,68,.25)',color:'#ff6644',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){Save.deleteSnapshot(s.slot);setSnaps(Save.listSnapshots());}},'삭제')
    );
  };

  return h('div', null,
    _settingsRow('세션 횟수', h('span', { style: mono }, sessions + '회')),
    _settingsRow('해금된 LOG',
      h('span', { style: mono }, (logs ? logs.length : 0) + '/' + ORACLE_LOGS.length)),
    _settingsRow('발견 엔딩',
      h('span', { style: mono }, (endings ? endings.length : 0) + '/10')),
    h('div',{style:{marginTop:16,paddingTop:12,borderTop:'1px solid rgba(var(--ui-rgb),.15)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.6)',letterSpacing:2,marginBottom:8}},'SNAPSHOT SLOTS'),
      h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.4)',marginBottom:10,lineHeight:1.6}},'원하는 DAY에 저장했다가 분기 선택 비교 용도로 다시 불러올 수 있습니다.'),
      snaps.map(slotRow)),
    h('div', { style: { marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 } },
      h('button', { className: 'btn',
        style: { fontSize: 11, padding: '8px 16px', marginTop: 0, width: '100%' },
        onClick: function () {
          setCfm({ msg: '현재 진행 중인 세션을 초기화합니다.\nLOG와 엔딩 기록은 유지됩니다.',
            action: function () { if (p.onReset) p.onReset(); p.onClose(); } });
        } }, '현재 세션 초기화'),
      h('button', { className: 'btn',
        style: { fontSize: 11, padding: '8px 16px', marginTop: 0, width: '100%', color: '#ff4444' },
        onClick: function () {
          setCfm({ msg: '모든 데이터를 삭제합니다.\nLOG, 엔딩, 세션 기록이 모두 사라집니다.\n이 작업은 되돌릴 수 없습니다.',
            inputKey: '삭제',
            action: function () { if (p.onFullReset) p.onFullReset(); p.onClose(); } });
        } }, '전체 데이터 삭제')),
    cfmModal());
}

function SettingsInfoTab() {
  var mono = { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: 'var(--ui)' };
  return h('div', null,
    _settingsRow('버전', h('span', { style: mono }, 'v0.9.0')),
    _settingsRow('엔진', h('span', { style: mono }, 'React 18 (CDN)')),
    h('div', { style: { marginTop: 16, fontSize: 11, color: 'rgba(var(--ui-rgb),0.4)',
      fontFamily: "'Share Tech Mono',monospace", textAlign: 'center', lineHeight: 2 } },
      h('div', null, 'TERMINAL SESSION'),
      h('div', null, 'ORACLE Proxy Network — Branch KR-INIT-001'),
      h('div', { style: { marginTop: 8, fontSize: 10 } }, 'Developed by ArtRyangRyang')));
}

function SettingsDataTab(p) {
  var logs = Save.getLogs();
  var seenArchive = Save.getSeenArchive();
  var totalArchive = typeof ARCHIVE_ENTRIES !== 'undefined' ? ARCHIVE_ENTRIES.filter(function(a){return !a.req || logs.indexOf(a.req) >= 0}).length : 0;
  var newArchive = totalArchive - (seenArchive ? seenArchive.length : 0);
  if (newArchive < 0) newArchive = 0;
  var mono = { fontFamily: "'Share Tech Mono',monospace", fontSize: 13, color: 'var(--ui)' };
  return h('div', null,
    _settingsRow('해금된 LOG', h('span', { style: mono }, (logs ? logs.length : 0) + '/' + ORACLE_LOGS.length)),
    _settingsRow('아카이브', h('span', { style: mono }, newArchive > 0 ? newArchive + ' NEW' : '—')),
    h('div', { style: { marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 } },
      h('button', { className: 'btn', style: { fontSize: 11, padding: '8px 16px', width: '100%' },
        onClick: function () { if (p.onLogs) p.onLogs(); } }, 'LOG 열람'),
      h('button', { className: 'btn', style: { fontSize: 11, padding: '8px 16px', width: '100%' },
        onClick: function () { if (p.onArchive) p.onArchive(); } }, 'ARCHIVE 열람')));
}

function SettingsPanel(p) {
  var _tab = useState('sound'), tab = _tab[0], setTab = _tab[1];
  var _muted = useState(typeof BGM !== 'undefined' ? BGM.muted : false), muted = _muted[0], setMuted = _muted[1];
  var _vol = useState(function () { return Save.get('ts_volume', 10); }), vol = _vol[0], setVol = _vol[1];
  var _sfxVol = useState(function () { return Save.get('ts_sfxVol', 50); }), sfxVol = _sfxVol[0], setSfxVol = _sfxVol[1];
  var _pendingLang = useState(function(){ return (window.TS_I18N && window.TS_I18N.getLocale()) || 'ko'; }), pendingLang = _pendingLang[0], setPendingLang = _pendingLang[1];

  var closePanel = function(){
    var currentLang = (window.TS_I18N && window.TS_I18N.getLocale && window.TS_I18N.getLocale()) || 'ko';
    if (pendingLang !== currentLang && window.TS_I18N && window.TS_I18N.setLocale) {
      window.TS_I18N.setLocale(pendingLang);
      if (typeof window !== 'undefined' && window.location && typeof window.location.reload === 'function') {
        window.location.reload();
        return;
      }
    }
    p.onClose();
  };

  useEffect(function () {
    var handler = function (e) { if (e.key === 'Escape') closePanel(); };
    window.addEventListener('keydown', handler);
    return function () { window.removeEventListener('keydown', handler); };
  }, [pendingLang]);

  var toggleMute = function () {
    if (typeof BGM !== 'undefined') {
      var m = BGM.toggleMute(); setMuted(m); Save.set('ts_muted', m);
      if (typeof SFX !== 'undefined') SFX.muted = m;
    }
  };
  var changeVol = function (v) {
    var nv = Math.max(0, Math.min(100, v)); setVol(nv);
    if (typeof BGM !== 'undefined') {
      BGM.vol = nv / 100;
      if (BGM.current && BGM.tracks[BGM.current] && !BGM.muted) BGM.tracks[BGM.current].volume = nv / 100;
      Save.set('ts_volume', nv);
    }
  };
  var changeSfxVol = function (v) {
    var nv = Math.max(0, Math.min(100, v)); setSfxVol(nv);
    if (typeof SFX !== 'undefined') { SFX.vol = nv / 100; Save.set('ts_sfxVol', nv); }
  };

  var content = null;
  if (tab === 'sound') content = h(SettingsSoundTab, { muted: muted, vol: vol, sfxVol: sfxVol, onToggleMute: toggleMute, onVolChange: changeVol, onSfxVolChange: changeSfxVol });
  if (tab === 'save') content = h(SettingsSaveTab, { onReset: p.onReset, onFullReset: p.onFullReset, onClose: closePanel, onSaveSnap: p.onSaveSnap, onLoadSnap: p.onLoadSnap });
  if (tab === 'display') content = h(SettingsDisplayTab, { onFxModeChange: p.onFxModeChange, currentLang: (window.TS_I18N && window.TS_I18N.getLocale && window.TS_I18N.getLocale()) || 'ko', pendingLang: pendingLang, onLanguageSelect: setPendingLang });
  if (tab === 'info') content = h(SettingsInfoTab);

  return h('div', {
    style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    onClick: function (e) { if (e.target === e.currentTarget) closePanel(); }
  },
    h('div', { style: { width: '100%', maxWidth: 400, maxHeight: '80vh', background: '#0a120a', border: '1px solid rgba(var(--ui-rgb),0.25)', padding: '16px 20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 8px rgba(var(--ui-rgb),0.05)' } },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(var(--ui-rgb),0.15)' } },
        h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 12, color: 'var(--ui)', letterSpacing: 2 } }, 'SETTINGS'),
        h('button', { style: { background: 'none', border: '1px solid rgba(var(--ui-rgb),0.2)', color: 'var(--ui)', fontFamily: "'Share Tech Mono',monospace", fontSize: 10, padding: '3px 8px', cursor: 'pointer' }, onClick: closePanel }, 'ESC')),
      h('div', { style: { display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' } },
        _settingsTabBtn('sound', 'SOUND', tab, setTab),
        _settingsTabBtn('save', 'SAVE', tab, setTab),
        _settingsTabBtn('display', 'DISPLAY', tab, setTab),
        _settingsTabBtn('info', 'INFO', tab, setTab)),
      h('div', { style: { flex: 1, overflowY: 'auto', minHeight: 0 } }, content)));
}
