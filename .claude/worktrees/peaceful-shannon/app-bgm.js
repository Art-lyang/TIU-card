// TERMINAL SESSION — app-bgm.js
// BGM 시스템 (인라인 Audio 기반)
var BGM = {
  main: null, crisis: null, current: null, target: null,
  volume: 0.3, fadeSpeed: 0.01, muted: false, started: false, fading: null,
  init: function(){
    if(this.main) return;
    this.main = new Audio('bgm_main.mp3');
    this.crisis = new Audio('bgm_crisis.mp3');
    this.main.loop = true;
    this.crisis.loop = true;
    this.main.volume = 0;
    this.crisis.volume = 0;
  },
  start: function(){
    if(this.started) return;
    this.init();
    this.started = true;
    this.play('main');
  },
  play: function(name){
    if(this.muted) return;
    var next = name === 'crisis' ? this.crisis : this.main;
    if(this.current === next) return;
    this.target = next;
    this._crossfade();
  },
  _crossfade: function(){
    var self = this;
    if(this.fading) cancelAnimationFrame(this.fading);
    var vol = this.volume;
    var old = this.current;
    var next = this.target;
    if(next){
      try{ next.play().catch(function(){}) }catch(e){}
    }
    var step = function(){
      var done = true;
      if(old && old !== next && old.volume > 0){
        old.volume = Math.max(0, old.volume - self.fadeSpeed);
        if(old.volume <= 0){ old.pause(); old.currentTime = 0; }
        else done = false;
      }
      if(next && next.volume < vol){
        next.volume = Math.min(vol, next.volume + self.fadeSpeed);
        if(next.volume < vol) done = false;
      }
      if(!done) self.fading = requestAnimationFrame(step);
      else self.fading = null;
    };
    this.fading = requestAnimationFrame(step);
    this.current = next;
  },
  setVolume: function(v){
    this.volume = v;
    if(this.current) this.current.volume = Math.min(v, this.current.volume);
  },
  toggle: function(){
    this.muted = !this.muted;
    if(this.muted){
      if(this.current){ this.current.pause(); }
    } else {
      if(this.current){ try{ this.current.play().catch(function(){}) }catch(e){} }
    }
    return this.muted;
  }
};
