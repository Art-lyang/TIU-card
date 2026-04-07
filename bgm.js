// TERMINAL SESSION — BGM Module
// Behind The Blast Door (메인 루프), Hydraulic Breach (긴장), Boot Sequence (부팅)
// 사용: BGM.play('main') / BGM.play('tension') / BGM.playBoot() / BGM.stop() / BGM.setDanger(true/false)

var BGM = {
  tracks: {},       // { main: Audio, tension: Audio }
  current: null,    // 'main' | 'tension' | null
  target: null,     // fade 목표
  vol: 0.18,        // 기본 볼륨
  fadeInterval: null,
  muted: false,
  started: false,   // 유저 인터랙션 후 true

  init: function() {
    if (this.tracks.main) return;
    try {
      // Behind The Blast Door — 메인 루프
      var main = new Audio(BGM_MAIN);
      main.loop = true;
      main.volume = 0;
      main.preload = 'auto';
      this.tracks.main = main;

      // Hydraulic Breach — 긴장 루프
      var tension = new Audio(BGM_TENSION);
      tension.loop = true;
      tension.volume = 0;
      tension.preload = 'auto';
      this.tracks.tension = tension;
    } catch(e) {
      console.warn('BGM init failed:', e);
    }
  },

  // 부팅 시퀀스 사운드 재생 (1회, 루프 아님)
  playBoot: function() {
    this.init();
    if (this.muted) return;
    try {
      var boot = new Audio(BGM_BOOT);
      boot.loop = false;
      boot.volume = 0.25;
      boot.play().catch(function(e) {
        console.warn('Boot SFX blocked:', e);
      });
    } catch(e) {}
  },

  // 유저 인터랙션 후 첫 재생 시작 (autoplay policy 대응)
  start: function() {
    if (this.started) return;
    this.init();
    this.started = true;
    this.play('main');
  },

  play: function(name) {
    this.init();
    if (this.muted) { this.target = name; return; }
    if (this.current === name) return;
    this.target = name;
    this._crossfade(name);
  },

  stop: function() {
    this.target = null;
    var self = this;
    Object.keys(this.tracks).forEach(function(k) {
      self._fadeOut(self.tracks[k]);
    });
    this.current = null;
  },

  // 위험 상태 전환 (스탯 기반)
  setDanger: function(isDanger) {
    if (!this.started) return;
    this.play(isDanger ? 'tension' : 'main');
  },

  // 음소거 토글
  toggleMute: function() {
    this.muted = !this.muted;
    var self = this;
    if (this.muted) {
      Object.keys(this.tracks).forEach(function(k) {
        self.tracks[k].volume = 0;
      });
    } else if (this.target && this.tracks[this.target]) {
      this.current = null; // force re-crossfade
      this.play(this.target);
    }
    return this.muted;
  },

  // ─── 내부 함수 ───

  _crossfade: function(toName) {
    var self = this;
    var toTrack = this.tracks[toName];
    if (!toTrack) return;

    // 현재 트랙 페이드아웃
    if (this.current && this.tracks[this.current]) {
      this._fadeOut(this.tracks[this.current]);
    }

    // 새 트랙 시작 + 페이드인
    toTrack.volume = 0;
    var playPromise = toTrack.play();
    if (playPromise) {
      playPromise.catch(function(e) {
        // autoplay blocked — 다음 인터랙션에서 재시도
        console.warn('BGM autoplay blocked, will retry on interaction');
      });
    }
    this._fadeIn(toTrack);
    this.current = toName;
  },

  _fadeIn: function(audio, dur) {
    dur = dur || 1500;
    var self = this;
    var step = 30;
    var inc = self.vol / (dur / step);
    var iv = setInterval(function() {
      if (self.muted) { clearInterval(iv); return; }
      var nv = Math.min(self.vol, audio.volume + inc);
      audio.volume = nv;
      if (nv >= self.vol) clearInterval(iv);
    }, step);
  },

  _fadeOut: function(audio, dur) {
    dur = dur || 1200;
    var step = 30;
    var dec = audio.volume / (dur / step);
    var iv = setInterval(function() {
      var nv = Math.max(0, audio.volume - dec);
      audio.volume = nv;
      if (nv <= 0) {
        clearInterval(iv);
        audio.pause();
        audio.currentTime = 0;
      }
    }, step);
  }
};
