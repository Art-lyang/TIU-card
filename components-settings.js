// TERMINAL SESSION — components-settings.js (1/2)
// 설정 패널 — 공통 UI 헬퍼 + SOUND/DISPLAY 탭
var _settingsRow = function (label, content) {
  return h('div', {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderBottom: '1px solid rgba(var(--ui-rgb),0.08)' }
  }, h('span', { style: { fontSize: 13, color: 'var(--ui-text)' } }, label), content);
};

var _settingsToggle = function (on, onClick) {
  return h('button', {
    style: { width: 44, height: 24, borderRadius: 12, border: '1px solid rgba(var(--ui-rgb),0.3)',
      background: on ? 'rgba(var(--ui-rgb),0.2)' : 'rgba(0,0,0,0.3)',
      position: 'relative', cursor: 'pointer', transition: 'all 0.2s' },
    onClick: onClick
  }, h('div', {
    style: { width: 18, height: 18, borderRadius: '50%',
      background: on ? 'var(--ui)' : 'rgba(var(--ui-rgb),0.2)',
      position: 'absolute', top: 2, left: on ? 22 : 2,
      transition: 'all 0.2s', boxShadow: on ? '0 0 6px var(--ui-glow)' : 'none' }
  }));
};

var _settingsTabBtn = function (id, label, curTab, setTab) {
  var active = curTab === id;
  return h('button', { key: id, style: {
    background: active ? 'rgba(var(--ui-rgb),0.1)' : 'transparent',
    border: '1px solid ' + (active ? 'rgba(var(--ui-rgb),0.4)' : 'rgba(var(--ui-rgb),0.15)'),
    color: active ? 'var(--ui)' : 'rgba(var(--ui-rgb),0.4)',
    fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
    padding: '6px 12px', cursor: 'pointer', letterSpacing: 1, transition: 'all 0.2s'
  }, onClick: function () { setTab(id); } }, label);
};

function _volSlider(val, onChange) {
  return h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
    h('input', { type: 'range', min: 0, max: 100, value: val,
      style: { width: 100, accentColor: 'var(--ui)', touchAction: 'none' },
      onInput: function (e) { onChange(parseInt(e.target.value)); },
      onChange: function (e) { onChange(parseInt(e.target.value)); } }),
    h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11,
      color: 'var(--ui)', width: 30, textAlign: 'right' } }, val + '%'));
}

function SettingsSoundTab(p) {
  return h('div', null,
    _settingsRow('사운드', _settingsToggle(!p.muted, p.onToggleMute)),
    !p.muted && _settingsRow('배경음악', _volSlider(p.vol, p.onVolChange)),
    !p.muted && _settingsRow('효과음', _volSlider(p.sfxVol, p.onSfxVolChange)));
}

function SettingsDisplayTab(p) {
  var _fs = useState(function () { return Save.get('ts_fontSize', 'normal'); }),
      fontSize = _fs[0], setFS = _fs[1];
  var _fx = useState(function () { return Save.get('ts_fxMode', 'full'); }),
      fxMode = _fx[0], setFxM = _fx[1];
  var sizes = [{ id: 'small', l: '작게' }, { id: 'normal', l: '보통' }, { id: 'large', l: '크게' }];
  var fxModes = [{ id: 'full', l: '전체' }, { id: 'reduced', l: '축소' }, { id: 'off', l: '끔' }];
  var change = function (sz) {
    setFS(sz); Save.set('ts_fontSize', sz);
    var root = document.getElementById('root');
    if (root) { root.classList.remove('fs-small', 'fs-normal', 'fs-large');
      if (sz !== 'normal') root.classList.add('fs-' + sz); }
  };
  var changeFx = function (mode) {
    setFxM(mode); Save.set('ts_fxMode', mode);
    if (p && p.onFxModeChange) p.onFxModeChange(mode);
  };
  var segBtn = function (key, label, on, onClick) {
    return h('button', { key: key, style: {
      background: on ? 'rgba(var(--ui-rgb),0.15)' : 'transparent',
      border: '1px solid ' + (on ? 'rgba(var(--ui-rgb),0.4)' : 'rgba(var(--ui-rgb),0.12)'),
      color: on ? 'var(--ui)' : 'rgba(var(--ui-rgb),0.4)',
      fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
      padding: '4px 10px', cursor: 'pointer' }, onClick: onClick }, label);
  };
  return h('div', null,
    _settingsRow('글자 크기',
      h('div', { style: { display: 'flex', gap: 4 } },
        sizes.map(function (s) {
          return segBtn(s.id, s.l, fontSize === s.id, function () { change(s.id); });
        }))),
    _settingsRow('화면 효과',
      h('div', { style: { display: 'flex', gap: 4 } },
        fxModes.map(function (s) {
          return segBtn(s.id, s.l, fxMode === s.id, function () { changeFx(s.id); });
        }))),
    h('div', { style: { marginTop: 8, padding: '6px 10px', fontSize: 10,
      color: 'rgba(var(--ui-rgb),0.55)', lineHeight: 1.6, fontFamily: "'Share Tech Mono',monospace" } },
      '\u26A0 화면 깜박임·흔들림에 민감하시면 [축소] 또는 [끔]을 선택하세요.'),
    h('div', { style: { marginTop: 12, padding: 10, background: 'rgba(var(--ui-rgb),0.03)',
      border: '1px solid rgba(var(--ui-rgb),0.08)', fontSize: 12,
      color: 'var(--ui-text)', lineHeight: 1.7 } },
      '미리보기: ORACLE TERMINAL SESSION 텍스트입니다.'));
}
