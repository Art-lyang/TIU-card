// TERMINAL SESSION — BGM Module (v2 — 오디오 안정화)
// Behind The Blast Door (메인 루프), Hydraulic Breach (긴장), Boot Sequence (부팅)
// 수정: 부팅음 loop=true 단일트랙, fadeTimer 중복방지, setDanger 디바운스, 모바일 pause 안정화

var BGM = {
  tracks: {},       // { main, tension, act1~4 }
  current: null,
  target: null,
  vol: 0.10,
  muted: false,
  started: false,
  currentAct: 1,   // 현재 Act (playAct()로 관리)
  _timers: {},      // 트랙별 fade timer ID — 중복 방지
  _dangerTs: 0,     // setDanger 디바운스 타임스탬프
  _transitioning: false, // 크로스페이드 진행 중 플래그

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

  // ═══ 부팅 사운드: loop=true 단일 트랙 (Audio 객체 재생성 제거) ═══
  startBootLoop: function() {
    this.init();
    if (this.muted) return;
    try {
      this._stopBootTrack();
      var a = new Audio(BGM_BOOT);
      a.loop = true;
      a.volume = 0;
      this.bootAudio = a;
      a.play().catch(function(e) { if (console && console.debug) console.debug('Boot SFX blocked:', e); });
      this._fadeIn(a, 800, 0.2);
    } catch(e) {}
  },

  _stopBootTrack: function() {
    if (this.bootAudio) {
      this._clearTimer(this.bootAudio);
      try { this.bootAudio.pause(); this.bootAudio.currentTime = 0; } catch(e) {}
      this.bootAudio = null;
    }
  },

  stopBootLoop: function() {
    if (this.bootAudio) {
      var self = this;
      this._fadeOut(this.bootAudio, 800);
      setTimeout(function() { self._stopBootTrack(); }, 900);
    }
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
    if (typeof BGM_ACT1 !== 'undefined' && this.playAct) {
      this.playAct(this.currentAct);
    } else {
      this.play('main');
    }
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
    this._transitioning = false;
    this._dangerTs = 0;
    this.currentAct = 1;
    this.started = false;
    this.current = null;
    var self = this;
    Object.keys(this.tracks).forEach(function(k) {
      self._stopOther(self.tracks[k]);
      try { self.tracks[k].currentTime = 0; } catch(e) {}
    });
    this._stopBootTrack();
  },

  // ═══ setDanger: 800ms 디바운스로 빈번한 전환 방지 ═══
  setDanger: function(isDanger) {
    if (!this.started) return;
    var now = Date.now();
    if (now - this._dangerTs < 800) return;
    this._dangerTs = now;
    if (isDanger) {
      this.play('tension');
    } else {
      var safeTrack = (typeof BGM_ACT1 !== 'undefined' && this.tracks['act' + this.currentAct])
        ? ('act' + this.currentAct) : 'main';
      this.play(safeTrack);
    }
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
      // 모든 트랙 즉시 정지
      Object.keys(this.tracks).forEach(function(k) {
        self._clearTimer(self.tracks[k]);
        self.tracks[k].volume = 0;
        self.tracks[k].pause();
      });
      if (this.bootAudio) {
        this._clearTimer(this.bootAudio);
        this.bootAudio.volume = 0;
        this.bootAudio.pause();
      }
    } else {
      // 부팅음 복구
      if (this.bootAudio) {
        this.bootAudio.volume = 0.2;
        try { this.bootAudio.play().catch(function(){}); } catch(e) {}
      }
      // BGM 복구
      if (this.target && this.tracks[this.target]) {
        this.current = null;
        this.play(this.target);
      }
    }
    return this.muted;
  },

  // ─── 내부 함수 ───

  // ═══ 크로스페이드: transitioning 플래그로 중복 방지 ═══
  _crossfade: function(toName) {
    var toTrack = this.tracks[toName];
    if (!toTrack) return;
    var self = this;
    this.current = toName; // 먼저 확정 — _stopOther의 "현재 트랙" 판정 기준
    // 진행 중이든 아니든, 타겟 외 모든 트랙 정지 (모바일 play/pause 레이스까지 방어)
    Object.keys(this.tracks).forEach(function(k) {
      if (k === toName) { self._clearTimer(self.tracks[k]); return; }
      self._stopOther(self.tracks[k]);
    });
    this._transitioning = true;
    toTrack.volume = 0;
    try {
      var pp = toTrack.play();
      if (pp && pp.then) { toTrack._pp = pp; pp.catch(function(){}); }
    } catch(e) {}
    this._fadeIn(toTrack, 3000, undefined, function() {
      self._transitioning = false;
    });
  },

  // 이전 트랙 확실 정지. iOS 등 모바일은 audio.volume 을 무시하므로 volume=0 만으로는
  // 이전 BGM 이 안 꺼진다 → 오직 pause() 로만 정지. 그런데 play() 약속이 미해소인 상태에서
  // pause() 를 부르면 씹혀서 이전 트랙이 풀볼륨으로 계속 재생 → 두 BGM 겹침.
  // 재생 약속이 남아 있으면 해소 시점에 (여전히 현재 트랙이 아니면) 다시 pause 해 단일 트랙 보장.
  _stopOther: function(track) {
    this._clearTimer(track);
    var self = this;
    try { track.pause(); } catch(e) {}
    try { track.volume = 0; } catch(e) {}
    if (track._pp && track._pp.then) {
      track._pp.then(function() {
        try { if (self.tracks[self.current] !== track) { track.pause(); track.volume = 0; } } catch(e) {}
      }).catch(function(){});
    }
  },
  // _fadeIn, _fadeOut, timer 관리 → bgm-fade.js

  // toggle: toggleMute alias (app.js 호환)
  toggle: function() { return this.toggleMute(); }
};
