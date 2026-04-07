// TERMINAL SESSION — BGM Module
// Behind The Blast Door (메인 루프), Hydraulic Breach (긴장), Boot Sequence (부팅)
// 사용: BGM.play('main') / BGM.play('tension') / BGM.playBoot() / BGM.stop() / BGM.setDanger(true/false)

var BGM = {
  tracks: {},       // { main: Audio, tension: Audio }
  shadows: {},      // 크로스페이드 루프용 섀도 트랙
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

      // 크로스페이드 루프 설정
      this._setupCrossfadeLoop('main', BGM_MAIN);
      this._setupCrossfadeLoop('tension', BGM_TENSION);
    } catch(e) {
      console.warn('BGM init failed:', e);
    }
  },

  bootAudio: null,
  bootShadow: null,

  // 부팅 시퀀스 사운드 루프 재생 (크로스페이드 루프)
  startBootLoop: function() {
    this.init();
    if (this.muted) return;
    try {
      if (this.bootAudio) { this.bootAudio.pause(); this.bootAudio = null; }
      if (this.bootShadow) { this.bootShadow.pause(); this.bootShadow = null; }
      var boot = new Audio(BGM_BOOT);
      boot.loop = false;
      boot.volume = 0.2;
      var self = this;
      // 끝나기 2초 전에 새 인스턴스를 겹쳐 재생
      boot.addEventListener('timeupdate', function() {
        if (!boot.duration) return;
        var remaining = boot.duration - boot.currentTime;
        if (remaining <= 2 && !self.bootShadow && !self.muted) {
          var shadow = new Audio(BGM_BOOT);
          shadow.loop = false;
          shadow.volume = 0;
          shadow.play().catch(function(){});
          self.bootShadow = shadow;
          self._fadeIn(shadow, 1800, 0.2);
          self._fadeOut(boot, 1800);
          // 섀도가 메인이 되고 다시 루프
          setTimeout(function() {
            self.bootAudio = shadow;
            self.bootShadow = null;
            self._setupBootCrossfade();
          }, 2000);
        }
      });
      boot.play().catch(function(e) {
        console.warn('Boot SFX blocked:', e);
      });
      this.bootAudio = boot;
    } catch(e) {}
  },

  _setupBootCrossfade: function() {
    var self = this;
    if (!this.bootAudio) return;
    var audio = this.bootAudio;
    var handler = function() {
      if (!audio.duration) return;
      var remaining = audio.duration - audio.currentTime;
      if (remaining <= 2 && !self.bootShadow && !self.muted) {
        var shadow = new Audio(BGM_BOOT);
        shadow.loop = false;
        shadow.volume = 0;
        shadow.play().catch(function(){});
        self.bootShadow = shadow;
        self._fadeIn(shadow, 1800, 0.2);
        self._fadeOut(audio, 1800);
        setTimeout(function() {
          self.bootAudio = shadow;
          self.bootShadow = null;
          self._setupBootCrossfade();
        }, 2000);
        audio.removeEventListener('timeupdate', handler);
      }
    };
    audio.addEventListener('timeupdate', handler);
  },

  // 부팅 사운드 페이드아웃 정지
  stopBootLoop: function() {
    if (this.bootAudio) {
      this._fadeOut(this.bootAudio, 800);
      this.bootAudio = null;
    }
    if (this.bootShadow) {
      this._fadeOut(this.bootShadow, 800);
      this.bootShadow = null;
    }
  },

  // 부팅 시퀀스 사운드 1회 재생 (하위 호환)
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

  // 음소거 토글 — 부트 오디오 포함
  toggleMute: function() {
    this.muted = !this.muted;
    var self = this;
    if (this.muted) {
      Object.keys(this.tracks).forEach(function(k) {
        self.tracks[k].volume = 0;
      });
      if (this.bootAudio) this.bootAudio.volume = 0;
      if (this.bootShadow) this.bootShadow.volume = 0;
    } else {
      // 부트 오디오 복구
      if (this.bootAudio) {
        this.bootAudio.volume = 0.2;
        try { this.bootAudio.play().catch(function(){}); } catch(e){}
      }
      // 메인/텐션 트랙 복구
      if (this.target && this.tracks[this.target]) {
        this.current = null;
        this.play(this.target);
      }
    }
    return this.muted;
  },

  // ─── 내부 함수 ───

  // 크로스페이드 루프 설정 — 트랙 끝 2초 전에 섀도 트랙으로 전환
  _setupCrossfadeLoop: function(name, src) {
    var self = this;
    var track = this.tracks[name];
    if (!track) return;
    track.loop = false; // 자체 루프 끄고 크로스페이드로 대체
    track.addEventListener('timeupdate', function() {
      if (!track.duration || self.current !== name || self.muted) return;
      var remaining = track.duration - track.currentTime;
      if (remaining <= 2.5 && !self.shadows[name]) {
        var shadow = new Audio(src);
        shadow.loop = false;
        shadow.volume = 0;
        shadow.play().catch(function(){});
        self.shadows[name] = shadow;
        self._fadeIn(shadow, 2000);
        self._fadeOut(track, 2000);
        setTimeout(function() {
          self.tracks[name] = shadow;
          self.shadows[name] = null;
          self._setupCrossfadeLoop(name, src);
        }, 2500);
      }
    });
  },

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
        console.warn('BGM autoplay blocked, will retry on interaction');
      });
    }
    this._fadeIn(toTrack);
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
      audio.volume = nv;
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
      audio.volume = nv;
      if (nv <= 0) {
        clearInterval(iv);
        audio.pause();
        audio.currentTime = 0;
      }
    }, step);
  }
};
