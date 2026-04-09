// TERMINAL SESSION — components-settings-2.js (2/2)
// 설정 패널 — SAVE/INFO 탭 + 메인 SettingsPanel 컴포넌트

function SettingsSaveTab(p) {
  var _cf = useState(null), cfm = _cf[0], setCfm = _cf[1];
  var sessions = Save.getSessions();
  var endings = Save.getEndings();
  var logs = Save.getLogs();
  var mono = { fontFamily: "'Share Tech Mono',monospace", fontSize: 13, color: 'var(--ui)' };

  var cfmModal = function () {
    if (!cfm) return null;
    return h('div', { style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 310 } },
      h('div', { style: { background: '#0a120a', border: '1px solid rgba(255,68,68,0.4)',
        padding: '20px 24px', maxWidth: 300, textAlign: 'center' } },
        h('div', { style: { fontSize: 13, color: '#ff4444', marginBottom: 16,
          whiteSpace: 'pre-wrap', lineHeight: 1.7 } }, cfm.msg),
        h('div', { style: { display: 'flex', gap: 10, justifyContent: 'center' } },
          h('button', { className: 'btn',
            style: { fontSize: 11, padding: '8px 16px', marginTop: 0 },
            onClick: function () { setCfm(null); } }, '취소'),
          h('button', { className: 'btn btn-amber',
            style: { fontSize: 11, padding: '8px 16px', marginTop: 0 },
            onClick: function () { cfm.action(); setCfm(null); } }, '확인'))));
  };

  return h('div', null,
    _settingsRow('세션 횟수', h('span', { style: mono }, sessions + '회')),
    _settingsRow('해금된 LOG',
      h('span', { style: mono }, (logs ? logs.length : 0) + '/' + ORACLE_LOGS.length)),
    _settingsRow('발견 엔딩',
      h('span', { style: mono }, (endings ? endings.length : 0) + '/10')),
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

// ═══ 메인 패널 ═══
function SettingsPanel(p) {
  var _tab = useState('sound'), tab = _tab[0], setTab = _tab[1];
  var _muted = useState(typeof BGM !== 'undefined' ? BGM.muted : false),
      muted = _muted[0], setMuted = _muted[1];
  var _vol = useState(function () { return Save.get('ts_volume', 10); }),
      vol = _vol[0], setVol = _vol[1];

  // ESC 키로 닫기
  useEffect(function () {
    var handler = function (e) { if (e.key === 'Escape') p.onClose(); };
    window.addEventListener('keydown', handler);
    return function () { window.removeEventListener('keydown', handler); };
  }, []);

  var toggleMute = function () {
    if (typeof BGM !== 'undefined') {
      var m = BGM.toggleMute(); setMuted(m); Save.set('ts_muted', m);
    }
  };
  var changeVol = function (v) {
    var nv = Math.max(0, Math.min(100, v)); setVol(nv);
    if (typeof BGM !== 'undefined') {
      BGM.vol = nv / 100;
      if (BGM.current && BGM.tracks[BGM.current] && !BGM.muted)
        BGM.tracks[BGM.current].volume = nv / 100;
      Save.set('ts_volume', nv);
    }
  };

  var content = null;
  if (tab === 'sound') content = h(SettingsSoundTab,
    { muted: muted, vol: vol, onToggleMute: toggleMute, onVolChange: changeVol });
  if (tab === 'save') content = h(SettingsSaveTab,
    { onReset: p.onReset, onFullReset: p.onFullReset, onClose: p.onClose });
  if (tab === 'display') content = h(SettingsDisplayTab);
  if (tab === 'info') content = h(SettingsInfoTab);

  return h('div', {
    style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    onClick: function (e) { if (e.target === e.currentTarget) p.onClose(); }
  },
    h('div', { style: { width: '100%', maxWidth: 400, maxHeight: '80vh',
      background: '#0a120a', border: '1px solid rgba(var(--ui-rgb),0.25)',
      padding: '16px 20px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 8px rgba(var(--ui-rgb),0.05)' } },
      // 헤더
      h('div', { style: { display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12, paddingBottom: 8,
        borderBottom: '1px solid rgba(var(--ui-rgb),0.15)' } },
        h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 12,
          color: 'var(--ui)', letterSpacing: 2 } }, 'SETTINGS'),
        h('button', { style: { background: 'none',
          border: '1px solid rgba(var(--ui-rgb),0.2)', color: 'var(--ui)',
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          padding: '3px 8px', cursor: 'pointer' },
          onClick: p.onClose }, 'ESC')),
      // 탭
      h('div', { style: { display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' } },
        _settingsTabBtn('sound', 'SOUND', tab, setTab),
        _settingsTabBtn('save', 'SAVE', tab, setTab),
        _settingsTabBtn('display', 'DISPLAY', tab, setTab),
        _settingsTabBtn('info', 'INFO', tab, setTab)),
      // 컨텐츠
      h('div', { style: { flex: 1, overflowY: 'auto', minHeight: 0 } }, content)));
}
