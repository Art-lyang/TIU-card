// TERMINAL SESSION — bgm-act.js
// BGM Act별 확장: act1~4 트랙 + playAct()
// bgm.js 이후, sfx-sources.js 이후 로드 필요

BGM.initActs = function() {
  if (this.tracks.act1) return;
  var srcs = [BGM_ACT1, BGM_ACT2, BGM_ACT3, BGM_ACT4];
  var keys = ['act1', 'act2', 'act3', 'act4'];
  try {
    for (var i = 0; i < 4; i++) {
      var a = new Audio(srcs[i]);
      a.loop = true;
      a.volume = 0;
      a.preload = 'auto';
      this.tracks[keys[i]] = a;
    }
  } catch(e) { console.warn('BGM act init failed:', e); }
};

BGM.playAct = function(n) {
  this.init();
  this.initActs();
  this.currentAct = n || 1;
  // 위기 상태(tension 재생 중)이면 target만 갱신, 실제 전환은 setDanger에서
  if (this.current === 'tension') {
    this.target = 'act' + this.currentAct;
    return;
  }
  if (!this.muted) {
    this.play('act' + this.currentAct);
  } else {
    this.target = 'act' + this.currentAct;
  }
};
