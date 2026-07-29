// appintoss/toss-save-adapter.js — localStorage ↔ 토스 네이티브 저장소 미러
// cloud-save.js의 감시 키 아키텍처를 그대로 따른다: 게임 코드의 localStorage 호출부
// 41곳은 일절 수정하지 않고, 여기서 setItem/removeItem을 래핑해 감시 키만 미러한다.
//
// 복원 정책 (M2 범위 — 안전 우선):
//   · 신규 설치(감시 대상 CURRENT 키가 로컬에 전무)일 때만 네이티브 팩을 복원하고 1회 reload.
//     (cloud-save.js restoreCloud와 동일한 apply→reload 패턴, app-init.js의 로드 클램프가 입력 검증)
//   · 로컬 세이브가 이미 있으면 로컬을 신뢰하고 미러-아웃만 한다.
//   · 양방향 병합/day 비교 정책은 M3에서 실기기 검증 후 확장. (app.js day 점프 가드와 일관 유지)
(function(){
  var root = window;
  if (!root.TossBridge) return;
  var CFG = root.TIU_TOSS_CONFIG || {};

  // ── 감시 키 (cloud-save.js와 동일 목록 — 변경 시 두 파일을 함께 본다) ──
  var CURRENT_KEYS=[
    'ts_game','ts_logs','ts_trust','ts_usedDlg','ts_usedEvening','ts_seenArchive','ts_facility',
    'ts_research','ts_combos','ts_evidence_used','ts_resourceReserveUsed','ts_onceShown','ts_activeSpecs',
    'ts_sessionDeck','ts_recentNews','ts_recentRewards','ts_activeMission','ts_resumePhase',
    'ts_pendingBriefing','ts_resumeHeadlines','ts_resumeRewards','ts_resumeDialogueIndex','ts_eveningLineState',
    'ts_act2_reached','ts_observer_proto','ts_curCard','ts_journal'
  ];
  var SNAP_KEYS=['ts_snap_1','ts_snap_2','ts_snap_3'];
  var PROGRESS_KEYS=['ts_endings','ts_sessions','ts_achievements','ts_minigamesSeen','ts_lastEnding'];
  var SETTINGS_KEYS=['ts_locale','ts_muted','ts_volume','ts_sfxVol','ts_fontSize','ts_fxMode'];
  var WATCH_PREFIXES=['ts_observer_proto_roll_'];
  var ALL_KEYS = CURRENT_KEYS.concat(SNAP_KEYS, PROGRESS_KEYS, SETTINGS_KEYS);
  var WATCH = {};
  ALL_KEYS.forEach(function(k){ WATCH[k] = true; });
  function isWatchKey(key){
    if (WATCH[key]) return true;
    key = String(key || '');
    for (var i = 0; i < WATCH_PREFIXES.length; i++) if (key.indexOf(WATCH_PREFIXES[i]) === 0) return true;
    return false;
  }

  function packKey(hash){ return (CFG.storagePrefix || 'tiu-save/') + (hash || 'anonymous'); }

  function buildPack(){
    var data = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (isWatchKey(k)) data[k] = localStorage.getItem(k);
      }
    } catch(e){}
    return JSON.stringify({ v: 1, data: data });
  }
  function applyPack(json){
    var pack; try { pack = JSON.parse(json); } catch(e){ return false; }
    if (!pack || pack.v !== 1 || !pack.data) return false;
    try {
      Object.keys(pack.data).forEach(function(k){
        if (isWatchKey(k) && typeof pack.data[k] === 'string') localStorage.setItem(k, pack.data[k]);
      });
      return true;
    } catch(e){ return false; }
  }
  function hasLocalSave(){
    try {
      for (var i = 0; i < CURRENT_KEYS.length; i++)
        if (localStorage.getItem(CURRENT_KEYS[i]) !== null) return true;
    } catch(e){}
    return false;
  }

  // ── 미러-아웃: localStorage 쓰기 래핑 + 디바운스 일괄 저장 ──
  var timer = null, hash = null;
  function scheduleMirror(){
    if (timer) clearTimeout(timer);
    timer = setTimeout(function(){
      timer = null;
      root.TossBridge.storageSet(packKey(hash), buildPack());
    }, 1200);
  }
  var _set = localStorage.setItem.bind(localStorage);
  var _rm  = localStorage.removeItem.bind(localStorage);
  try {
    localStorage.setItem = function(k, v){ _set(k, v); if (isWatchKey(k)) scheduleMirror(); };
    localStorage.removeItem = function(k){ _rm(k); if (isWatchKey(k)) scheduleMirror(); };
  } catch(e){}
  // 탭/미니앱 종료 직전 플러시
  addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'hidden' && timer) {
      clearTimeout(timer); timer = null;
      root.TossBridge.storageSet(packKey(hash), buildPack());
    }
  });

  // ── 부트 복원: 로그인 완료 후 1회 ──
  var RELOAD_GUARD = 'ts_toss_restore_done'; // sessionStorage — reload 루프 방지
  root.__TOSS_READY__.then(function(userHash){
    hash = userHash;
    if (!root.TossBridge.available()) return;
    var guarded = false;
    try { guarded = sessionStorage.getItem(RELOAD_GUARD) === '1'; } catch(e){}
    if (guarded || hasLocalSave()) { scheduleMirror(); return; }
    root.TossBridge.storageGet(packKey(hash)).then(function(json){
      if (!json) return;
      if (applyPack(json)) {
        try { sessionStorage.setItem(RELOAD_GUARD, '1'); } catch(e){}
        root.TossBridge.log('save_restored', {});
        setTimeout(function(){ try { location.reload(); } catch(e){} }, 150);
      }
    });
  });
})();
