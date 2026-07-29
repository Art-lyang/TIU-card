// appintoss/toss-bridge.js — 앱인토스 SDK 래퍼 (@apps-in-toss/web-framework 2.x 표면 기준)
// 원칙: 게임 코드는 이 파일의 TossBridge만 호출한다. SDK 미탑재 환경(일반 브라우저,
// 콘솔 샌드박스 외부)에서는 전부 안전한 no-op으로 동작해 게임이 그대로 돌아간다.
//
// 확인된 실제 API (web-bridge 2.10.8 타입 정의 기준):
//   getAnonymousKey() -> {hash, type:'HASH'}          — 게임 로그인 (getUserKeyForGame은 deprecated)
//   Storage.getItem/setItem/removeItem/clearItems     — 네이티브 저장소 (async, string)
//   submitGameCenterLeaderBoardScore({score})         — 점수는 숫자 "문자열"
//   openGameCenterLeaderboard(), getGameCenterGameProfile()
//   eventLog({log_name, log_type, params})            — 행동 분석
//   setDeviceOrientation(), getOperationalEnvironment(), closeView(), openURL()
//   createOneTimePurchaseOrder(...)                   — IAP (M4에서 연결)
(function(){
  var root = window;
  var CFG = root.TIU_TOSS_CONFIG || {};

  // SDK 전역 탐색: 프레임워크 번들 방식에 따라 노출 위치가 다를 수 있어 후보를 순서대로 본다.
  // 콘솔 샌드박스 실기기 확인 후 확정 위치 하나만 남긴다. (M3 체크 항목)
  function sdk(){
    return root.AppsInToss || root.appsInToss || root.__APPS_IN_TOSS__ || null;
  }
  function fn(name){
    var s = sdk();
    if (s && typeof s[name] === 'function') return s[name];
    if (typeof root[name] === 'function') return root[name];
    return null;
  }
  function storageApi(){
    var s = sdk();
    if (s && s.Storage) return s.Storage;
    if (root.Storage && typeof root.Storage.setItem === 'function' && root.Storage !== root.localStorage) return root.Storage;
    return null;
  }

  function iapApi(){
    var s = sdk();
    if (s && s.IAP) return s.IAP;
    if (root.IAP && typeof root.IAP.createOneTimePurchaseOrder === 'function') return root.IAP;
    return null;
  }

  var UNLOCK_KEY = 'ts_toss_full_unlock'; // 데모 게이트 해제 플래그 (demo-flag.js appintoss 변형이 읽음)
  var userHash = null;

  var TossBridge = {
    available: function(){ return !!(sdk() || fn('getAnonymousKey')); },

    // ── 게임 로그인 ──
    // 성공 시 hash 보관(저장소 네임스페이스에 사용). 실패/미지원이면 null — 로컬 저장만으로 동작.
    login: function(){
      var f = fn('getAnonymousKey') || fn('getUserKeyForGame');
      if (!f) return Promise.resolve(null);
      return f().then(function(res){
        if (res && res.hash) { userHash = String(res.hash).slice(0, 16); return userHash; }
        return null;
      }).catch(function(){ return null; });
    },
    userKey: function(){ return userHash; },

    // ── 네이티브 저장소 (전부 async · string) ──
    storageGet: function(key){
      var st = storageApi();
      if (!st) return Promise.resolve(null);
      return st.getItem(key).catch(function(){ return null; });
    },
    storageSet: function(key, value){
      var st = storageApi();
      if (!st) return Promise.resolve(false);
      return st.setItem(key, value).then(function(){ return true; }).catch(function(){ return false; });
    },
    storageRemove: function(key){
      var st = storageApi();
      if (!st) return Promise.resolve(false);
      return st.removeItem(key).then(function(){ return true; }).catch(function(){ return false; });
    },

    // ── 게임센터 (ORACLE 평가 — 누적 관리 일수) ──
    submitScore: function(days){
      var f = fn('submitGameCenterLeaderBoardScore');
      if (!f) return Promise.resolve(null);
      return f({ score: String(Math.max(0, Math.floor(days))) }).catch(function(){ return null; });
    },
    openLeaderboard: function(){
      var f = fn('openGameCenterLeaderboard');
      if (f) try { f(); } catch(e){}
    },

    // ── IAP: 본편 인가 코드 (비소모성 full_version_unlock) ──
    // 결제창·검증은 토스가 처리. processProductGrant에서 해금 플래그만 기록한다.
    isFullUnlocked: function(){
      try { return localStorage.getItem(UNLOCK_KEY) === '1'; } catch(e){ return false; }
    },
    purchaseFullUnlock: function(onDone){
      var iap = iapApi();
      var done = function(ok, code){ if (onDone) { var f = onDone; onDone = null; f(ok, code || null); } };
      if (!iap) { done(false, 'NO_SDK'); return; }
      var grant = function(){ try { localStorage.setItem(UNLOCK_KEY, '1'); } catch(e){} };
      var cleanup = null;
      var fin = function(){ if (cleanup) { try { cleanup(); } catch(e){} cleanup = null; } };
      try {
        cleanup = iap.createOneTimePurchaseOrder({
          options: {
            sku: CFG.productFullUnlock || 'full_version_unlock',
            processProductGrant: function(){ grant(); return true; }
          },
          onEvent: function(){
            fin();
            TossBridge.log('iap_unlock_done', {});
            done(TossBridge.isFullUnlocked());
          },
          onError: function(err){
            fin();
            var code = err && err.code;
            if (code === 'ITEM_ALREADY_OWNED') { grant(); done(true, code); return; }
            TossBridge.log('iap_unlock_error', { code: String(code || '') });
            done(false, code);
          }
        });
      } catch(e){ fin(); done(false, 'EXCEPTION'); }
    },
    // 부트 복원/회수: 주문 이력이 신뢰 원천. COMPLETED → 해금, 최신 상태 REFUNDED → 회수.
    // (상품 1종이라 페이지네이션(hasNext)은 생략 — 상품 추가 시 nextKey 순회 구현)
    syncPurchaseState: function(){
      var iap = iapApi();
      if (!iap || typeof iap.getCompletedOrRefundedOrders !== 'function') return Promise.resolve(false);
      var sku = CFG.productFullUnlock || 'full_version_unlock';
      return iap.getCompletedOrRefundedOrders().then(function(res){
        var orders = (res && res.orders) || [];
        var latest = null;
        for (var i = 0; i < orders.length; i++) {
          var o = orders[i];
          if (o.sku !== sku) continue;
          if (!latest || String(o.date) > String(latest.date)) latest = o;
        }
        var owned = !!(latest && latest.status === 'COMPLETED');
        var cur = TossBridge.isFullUnlocked();
        if (owned === cur) return false;
        try { owned ? localStorage.setItem(UNLOCK_KEY, '1') : localStorage.removeItem(UNLOCK_KEY); } catch(e){}
        TossBridge.log(owned ? 'iap_unlock_restored' : 'iap_unlock_revoked', {});
        return true;
      }).catch(function(){ return false; });
    },

    // ── 행동 분석 ──
    log: function(name, params){
      var f = fn('eventLog');
      if (!f) return;
      try {
        f({ log_name: (CFG.logPrefix || 'ts') + '_' + name, log_type: 'event', params: params || {} });
      } catch(e){}
    },

    // ── 화면/환경 ──
    lockPortrait: function(){
      var f = fn('setDeviceOrientation');
      if (f) try { f({ orientation: 'portrait' }); } catch(e){}
    },
    openExternal: function(url){
      var f = fn('openURL');
      if (f) { try { f({ url: url }); return true; } catch(e){} }
      return false;
    }
  };

  root.TossBridge = TossBridge;

  // 부트 시퀀스: 로그인 → 세로 고정 → 구매 상태 동기화(해금 복원/회수) → 어댑터에 준비 신호.
  // (어댑터는 toss-save-adapter.js — 이 파일보다 뒤에 로드된다)
  var SYNC_GUARD = 'ts_toss_iap_synced'; // sessionStorage — 동기화 reload 루프 방지
  root.__TOSS_READY__ = TossBridge.login().then(function(hash){
    TossBridge.lockPortrait();
    TossBridge.log('session_start', { toss: TossBridge.available() ? 1 : 0 });
    var guarded = false;
    try { guarded = sessionStorage.getItem(SYNC_GUARD) === '1'; } catch(e){}
    if (guarded) return hash;
    return TossBridge.syncPurchaseState().then(function(changed){
      if (changed) {
        try { sessionStorage.setItem(SYNC_GUARD, '1'); } catch(e){}
        setTimeout(function(){ try { location.reload(); } catch(e){} }, 100);
      }
      return hash;
    });
  });
})();
