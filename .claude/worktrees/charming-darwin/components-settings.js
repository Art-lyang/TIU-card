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

function SettingsSoundTab(p) {
  return h('div', null,
    _settingsRow('사운드', _settingsToggle(!p.muted, p.onToggleMute)),
    !p.muted && _settingsRow('볼륨',
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        h('input', { type: 'range', min: 0, max: 100, value: p.vol,
          style: { width: 100, accentColor: 'var(--ui)' },
          onChange: function (e) { p.onVolChange(parseInt(e.target.value)); } }),
        h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11,
          color: 'var(--ui)', width: 30, textAlign: 'right' } }, p.vol + '%'))));
}

function SettingsDisplayTab() {
  var _fs = useState(function () { return Save.get('ts_fontSize', 'normal'); }),
      fontSize = _fs[0], setFS = _fs[1];
  var sizes = [{ id: 'small', l: '작게' }, { id: 'normal', l: '보통' }, { id: 'large', l: '크게' }];
  var change = function (sz) {
    setFS(sz); Save.set('ts_fontSize', sz);
    var root = document.getElementById('root');
    if (root) { root.classList.remove('fs-small', 'fs-normal', 'fs-large');
      if (sz !== 'normal') root.classList.add('fs-' + sz); }
  };
  return h('div', null,
    _settingsRow('글자 크기',
      h('div', { style: { display: 'flex', gap: 4 } },
        sizes.map(function (s) {
          var on = fontSize === s.id;
          return h('button', { key: s.id, style: {
            background: on ? 'rgba(var(--ui-rgb),0.15)' : 'transparent',
            border: '1px solid ' + (on ? 'rgba(var(--ui-rgb),0.4)' : 'rgba(var(--ui-rgb),0.12)'),
            color: on ? 'var(--ui)' : 'rgba(var(--ui-rgb),0.4)',
            fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
            padding: '4px 10px', cursor: 'pointer' },
            onClick: function () { change(s.id); } }, s.l);
        }))),
    h('div', { style: { marginTop: 12, padding: 10, background: 'rgba(var(--ui-rgb),0.03)',
      border: '1px solid rgba(var(--ui-rgb),0.08)', fontSize: 12,
      color: 'var(--ui-text)', lineHeight: 1.7 } },
      '미리보기: ORACLE TERMINAL SESSION 텍스트입니다.'));
}
