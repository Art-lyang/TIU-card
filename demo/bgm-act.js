// TERMINAL SESSION — bgm-act.js
// BGM Act별 확장: act1~4 트랙 + playAct()
// bgm.js 이후, sfx-sources.js 이후 로드 필요

// preload: 현재 Act 트랙만 'auto', 나머지는 'none' — 게임 시작 시 4트랙(12.8MB) 전량
// 즉시 다운로드하던 것을 currentAct 1개로 축소. 다른 Act 트랙은 playAct() 전환 시점에
// _warmed 플래그로 1회만 preload='auto'+load()로 승격해 지연 로드한다.
BGM.initActs = function() {
  if (this.tracks.act1) return;
  var srcs = [BGM_ACT1, BGM_ACT2, BGM_ACT3, BGM_ACT4];
  var keys = ['act1', 'act2', 'act3', 'act4'];
  var active = this.currentAct || 1;
  try {
    for (var i = 0; i < 4; i++) {
      var a = new Audio(srcs[i]);
      a.loop = true;
      a.volume = 0;
      var isActive = (i + 1 === active);
      a.preload = isActive ? 'auto' : 'none';
      a._warmed = isActive;
      this.tracks[keys[i]] = a;
    }
  } catch(e) { console.warn('BGM act init failed:', e); }
};

BGM.playAct = function(n) {
  this.init();
  this.currentAct = n || 1;
  this.initActs();
  var key = 'act' + this.currentAct;
  var tr = this.tracks[key];
  if (tr && !tr._warmed) {
    tr._warmed = true;
    tr.preload = 'auto';
    try { tr.load(); } catch(e) {}
  }
  // 위기 상태(tension 재생 중)이면 target만 갱신, 실제 전환은 setDanger에서
  if (this.current === 'tension') {
    this.target = key;
    return;
  }
  if (!this.muted) {
    this.play(key);
  } else {
    this.target = key;
  }
};
