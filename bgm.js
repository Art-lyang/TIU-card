// TERMINAL SESSION — BGM Module
// Behind The Blast Door (메인 루프), Hydraulic Breach (긴장), Boot Sequence (부팅)
// 사용: BGM.play('main') / BGM.play('tension') / BGM.playBoot() / BGM.stop() / BGM.setDanger(true/false)

var BGM = {
  tracks: {},       // { main: Audio, tension: Audio }
  current: null,    // 'main' | 'tension' | null
  target: null,     // fade 목표
  vol: 0.10,        // 기본 볼륨 (낮게 깔리는 배경음)
  muted: false,
  started: false,   // 유저 인터랙션 후 true

  init: function() {
    if (this.tracks.main) return;
    try {
      var main = new Audio(BGM_MAIN);
      main.loop = true;
      main.volume = 0;
      main.preload = 'auto';
      this.tracks.main = main;

      var tension = new Audio(BGM_TENSION);
      tension.loop = true;
      tension.volume = 0;
      tension.preload = 'auto';
      this.tracks.tension = tension;
    } catch(e) {
      console.warn('BGM init failed:', e);
    }
  },

  bootAudio: null,
  bootShadow: null,

  // 부팅 시퀀스 사운드 루프 — 듀얼 트랙 체인
  startBootLoop: function() {
    this.init();
    if (this.muted) return;
    try {
      this._stopBootTracks();
      var a = new Audio(BGM_BOOT);
      a.loop = false;
      a.volume = 0.2;
      a.play().catch(function(e) { console.warn('Boot SFX blocked:', e); });
      this.bootAudio = a;
      this._bootChain(a);
    } catch(e) {}
  },

  _bootChain: function(current) {
    var self = this;
    var fired = false;
    var onTime = function() {
      if (fired || !current.duration) return;
      var rem = current.duration - current.currentTime;
      if (rem <= 1.5) {
        fired = true;
        current.removeEventListener('timeupdate', onTime);
        if (!self.bootAudio && !self.bootShadow) return;
        var next = new Audio(BGM_BOOT);
        next.loop = false;
        next.volume = 0;
        next.play().catch(function(){});
        self.bootShadow = next;
        self._fadeOut(current, 1400);
        self._fadeIn(next, 1400, 0.2);
        setTimeout(function() {
          self.bootAudio = next;
          self.bootShadow = null;
          self._bootChain(next);
        }, 1500);
      }
    };
    var onEnd = function() {
      if (fired) return;
      fired = true;
      current.removeEventListener('timeupdate', onTime);
      current.removeEventListener('ended', onEnd);
      if (!self.bootAudio && !self.bootShadow) return;
      var next = new Audio(BGM_BOOT);
      next.loop = false;
      next.volume = 0.2;
      next.play().catch(function(){});
      self.bootAudio = next;
      self._bootChain(next);
    };
    current.addEventListener('timeupdate', onTime);
    current.addEventListener('ended', onEnd);
  },

  _stopBootTracks: function() {
    if (this.bootAudio) { try { this.bootAudio.pause(); } catch(e){} this.bootAudio = null; }
    if (this.bootShadow) { try { this.bootShadow.pause(); } catch(e){} this.bootShadow = null; }
  },

  stopBootLoop: function() {
    if (this.bootAudio) this._fadeOut(this.bootAudio, 800);
    if (this.bootShadow) this._fadeOut(this.bootShadow, 800);
    var self = this;
    setTimeout(function() { self._stopBootTracks(); }, 900);
  },

  playBoot: function() {
    this.init();
    if (this.muted) return;
    try {
      var boot = new Audio(BGM_BOOT);
      boot.loop = false;
      boot.volume = 0.25;
      boot.play().catch(function(){});
    } catch(e) {}
  },

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

  setDanger: function(isDanger) {
    if (!this.started) return;
    this.play(isDanger ? 'tension' : 'main');
  },

  // 볼륨 임시 조절 (이브닝 챗 등)
  setTempVolume: function(v) {
    if (this.current && this.tracks[this.current]) {
      this.tracks[this.current].volume = Math.min(v, this.vol);
    }
  },

  restoreVolume: function() {
    if (this.current && this.tracks[this.current] && !this.muted) {
      this.tracks[this.current].volume = this.vol;
    }
  },

  toggleMute: function() {
    this.muted = !this.muted;
    var self = this;
    if (this.muted) {
      Object.keys(this.tracks).forEach(function(k) {
        self.tracks[k].volume = 0;
        self.tracks[k].pause();
      });
      if (this.bootAudio) { this.bootAudio.volume = 0; this.bootAudio.pause(); }
      if (this.bootShadow) { this.bootShadow.volume = 0; this.bootShadow.pause(); }
    } else {
      if (this.bootAudio) {
        this.bootAudio.volume = 0.2;
        try { this.bootAudio.play().catch(function(){}); } catch(e){}
      }
      if (this.target && this.tracks[this.target]) {
        this.current = null;
        this.play(this.target);
      }
    }
    return this.muted;
  },

  // ─── 내부 함수 ───

  _crossfade: function(toName) {
    var toTrack = this.tracks[toName];
    if (!toTrack) return;

    // 현재 트랙 느린 페이드아웃
    if (this.current && this.tracks[this.current]) {
      this._fadeOut(this.tracks[this.current], 2500);
    }

    // 새 트랙 느린 페이드인
    toTrack.volume = 0;
    try { toTrack.play().catch(function(){}); } catch(e){}
    this._fadeIn(toTrack, 3000);
    this.current = toName;
  },

  _fadeIn: function(audio, dur, targetVol) {
    dur = dur || 1500;
    var self = this;
    var tv = targetVol !== undefined ? targetVol : self.vol;
    var step = 30;
    var inc = tv / (dur / step);
    var iv = setInterval(function() {
      if (self.muted) { clearInterval(iv); return; }
      var nv = Math.min(tv, audio.volume + inc);
      try { audio.volume = nv; } catch(e) { clearInterval(iv); return; }
      if (nv >= tv) clearInterval(iv);
    }, step);
  },

  _fadeOut: function(audio, dur) {
    dur = dur || 1200;
    var step = 30;
    var startVol = audio.volume;
    if (startVol <= 0) return;
    var dec = startVol / (dur / step);
    var iv = setInterval(function() {
      var nv = Math.max(0, audio.volume - dec);
      try { audio.volume = nv; } catch(e) { clearInterval(iv); return; }
      if (nv <= 0) {
        clearInterval(iv);
        // loop=true 트랙은 pause하지 않음 (볼륨 0으로 유지)
        if (!audio.loop) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    }, step);
  }
};
