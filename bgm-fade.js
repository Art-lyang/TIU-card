// TERMINAL SESSION — BGM Fade & Timer 내부 함수
// bgm.js에서 분리: _fadeIn, _fadeOut, timer 관리 메서드

// ═══ _fadeIn: 기존 timer 취소 후 새 timer 시작 ═══
BGM._fadeIn = function(audio, dur, targetVol, onDone) {
  dur = dur || 1500;
  this._clearTimer(audio);
  var self = this;
  var tv = targetVol !== undefined ? targetVol : self.vol;
  var step = 30;
  var inc = tv / (dur / step);
  var iv = setInterval(function() {
    if (self.muted) { clearInterval(iv); self._removeTimer(audio, iv); return; }
    var nv = Math.min(tv, audio.volume + inc);
    try { audio.volume = nv; } catch(e) { clearInterval(iv); self._removeTimer(audio, iv); return; }
    if (nv >= tv) {
      clearInterval(iv);
      self._removeTimer(audio, iv);
      if (onDone) onDone();
    }
  }, step);
  this._setTimer(audio, iv);
};

// ═══ _fadeOut: 기존 timer 취소 + 완료 시 pause (모바일 슬롯 반환) ═══
BGM._fadeOut = function(audio, dur, pauseOnDone) {
  dur = dur || 1200;
  this._clearTimer(audio);
  var startVol = audio.volume;
  if (startVol <= 0) {
    if (pauseOnDone) { try { audio.pause(); } catch(e) {} }
    return;
  }
  var step = 30;
  var dec = startVol / (dur / step);
  var self = this;
  var iv = setInterval(function() {
    var nv = Math.max(0, audio.volume - dec);
    try { audio.volume = nv; } catch(e) { clearInterval(iv); self._removeTimer(audio, iv); return; }
    if (nv <= 0) {
      clearInterval(iv);
      self._removeTimer(audio, iv);
      try { audio.pause(); } catch(e) {}
    }
  }, step);
  this._setTimer(audio, iv);
};

// ═══ Timer 관리 — 트랙별 setInterval ID 추적 ═══
BGM._timerKey = function(audio) {
  if (!audio._bgmKey) audio._bgmKey = 'bgm_' + (++BGM._keySeq);
  return audio._bgmKey;
};
BGM._keySeq = 0;

BGM._setTimer = function(audio, iv) {
  var k = this._timerKey(audio);
  this._timers[k] = iv;
};

BGM._clearTimer = function(audio) {
  var k = this._timerKey(audio);
  if (this._timers[k]) {
    clearInterval(this._timers[k]);
    delete this._timers[k];
  }
};

BGM._removeTimer = function(audio, iv) {
  var k = this._timerKey(audio);
  if (this._timers[k] === iv) delete this._timers[k];
};
