# TIU-CARD Firebase 클라우드 세이브 설계서

> **Version:** 2.0
> **Date:** 2026-05-18
> **Status:** Draft — 구현 전 설계 검토용
> **변경:** v1.0 검토 보고서(REVIEW-FIREBASE-CLOUD-SAVE.md) 반영

---

## 1. 아키텍처 개요

```
┌─────────────────────────────────────────────────────────┐
│                    TIU-CARD Client                       │
│                                                         │
│  ┌───────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Game     │───▶│  SaveManager │───▶│  CloudSync   │  │
│  │  Logic    │    │  (기존 Save) │    │  (신규 모듈) │  │
│  └───────────┘    └──────┬───────┘    └──────┬───────┘  │
│                          │                    │          │
│                   ┌──────▼───────┐    ┌──────▼───────┐  │
│                   │ localStorage │    │ Firebase SDK │  │
│                   │ (오프라인    │    │ (CDN import) │  │
│                   │  캐시 유지)  │    └──────┬───────┘  │
│                   └──────────────┘           │          │
└──────────────────────────────────────────────┼──────────┘
                                               │
                              ┌─────────────────▼──────────┐
                              │      Firebase Backend      │
                              │                            │
                              │  ┌──────────┐ ┌─────────┐ │
                              │  │   Auth   │ │Firestore│ │
                              │  │ (Google) │ │  (save  │ │
                              │  └──────────┘ │   data) │ │
                              │               └─────────┘ │
                              └────────────────────────────┘
```

**핵심 원칙:**
- 기존 `Save` 객체는 그대로 유지 (localStorage 읽기/쓰기 담당)
- 새 `CloudSync` 모듈이 localStorage ↔ Firestore 간 동기화 전담
- 네트워크 없으면 기존과 동일하게 동작 (localStorage만 사용)
- 온라인 복귀 시 자동으로 diff → 업로드/다운로드
- **클라우드 실패는 절대 게임 진행을 막지 않는다**

---

## 2. Firebase 프로젝트 설정 가이드

### 2.1 Firebase 콘솔 설정

1. [Firebase Console](https://console.firebase.google.com) → 새 프로젝트 생성: `tiu-card-prod`
2. **Authentication** → Sign-in method → Google 활성화
3. **Firestore Database** → 프로덕션 모드로 생성 (보안 규칙은 §8에서 별도 설정)
4. **프로젝트 설정** → 웹 앱 등록 → Firebase 구성 객체 복사
5. **OAuth 동의 화면** 설정:
   - 앱 이름: `TIU-CARD`
   - 개인정보처리방침 URL: (배포 후 설정)
   - 이용약관 URL: (배포 후 설정)
   - 프로덕션 배포 시 "게시" 상태로 전환 필수 (미설정 시 "확인되지 않은 앱" 경고)

### 2.2 index.html에 SDK 추가

기존 `</body>` 직전, 게임 스크립트들보다 **앞에** 삽입:

```html
<!-- Firebase SDK (CDN, 빌드 불필요) -->
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="cloud-sync.js"></script>
```

> **번들 크기 참고:** compat SDK 합계 약 300KB (gzip ~90KB). 빌드 도구 없는 현 스택에서는 modular SDK 사용이 불가하므로 compat 사용. 초기 로드 영향은 있으나, 스크립트에 `defer` 속성 추가로 렌더 블로킹은 회피 가능.

### 2.3 firebase-config.js (신규 파일)

```javascript
// firebase-config.js — Firebase 초기화 (API 키는 클라이언트 공개 가능)
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "tiu-card-prod.firebaseapp.com",
  projectId: "tiu-card-prod",
  storageBucket: "tiu-card-prod.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxx"
};
firebase.initializeApp(firebaseConfig);

var fbAuth = firebase.auth();
var fbDb = firebase.firestore();

// Firestore 오프라인 캐시는 사용하지 않음 (자체 localStorage 기반 오프라인 전략 사용)
// enablePersistence()를 호출하면 SDK 내부 캐시와 우리 로직이 충돌할 수 있으므로 의도적으로 비활성화.
```

> **참고:** Firebase API 키는 공개해도 안전하다. Firestore Rules가 실제 보안 담당.

---

## 3. Firestore 데이터 모델

### 3.1 컬렉션 구조

```
firestore/
├── users/{uid}/
│   ├── profile (document)
│   │   ├── email: string
│   │   ├── displayName: string
│   │   ├── createdAt: timestamp
│   │   └── lastSyncAt: timestamp
│   │
│   ├── saves/current (document)  ← 현재 진행 중인 게임
│   │   ├── version: 2
│   │   ├── clientTs: number (Date.now() — 로컬 기기 시계)
│   │   ├── serverTs: serverTimestamp() (Firestore 서버 시계)
│   │   ├── checksum: string (무결성 검증)
│   │   ├── game: map (ts_game 전체, 내부에 timestamp 포함)
│   │   ├── logs: array<string>
│   │   ├── trust: map
│   │   ├── usedDlg: array<number>
│   │   ├── usedEvening: array<number>
│   │   ├── seenArchive: array<string>
│   │   ├── facility: map
│   │   ├── combos: array
│   │   ├── evidenceUsed: array
│   │   ├── resourceReserveUsed: boolean
│   │   ├── onceShown: array
│   │   ├── recentNews: array
│   │   ├── recentRewards: array
│   │   ├── activeSpecs: array
│   │   ├── sessionDeck: map|null
│   │   ├── act2Reached: boolean
│   │   └── observerProto: string|null
│   │
│   ├── saves/snap_1 (document)   ← 스냅샷 슬롯 1
│   │   ├── clientTs: number
│   │   ├── serverTs: serverTimestamp()
│   │   └── pack: map (snapshot pack 전체)
│   ├── saves/snap_2 (document)
│   ├── saves/snap_3 (document)
│   │
│   └── meta/progress (document)  ← 리셋 후에도 유지되는 데이터
│       ├── endings: array<string>
│       ├── sessions: number
│       ├── achievements: array<string>
│       └── serverTs: serverTimestamp()
```

### 3.2 설계 근거

- **`saves/current`**: 실시간 게임 상태. persistGame 호출마다 debounce 후 업로드.
- **`saves/snap_1~3`**: 기존 `ts_snap_*`과 1:1 대응. 슬롯별 독립 문서로 개별 동기화.
- **`meta/progress`**: `clearGame()` 시에도 보존되는 엔딩·세션·업적 데이터.
- **`clientTs` + `serverTs` 이중 타임스탬프**: 기기 시계 오차 방어. 충돌 판정 시 `serverTs`를 1차 기준으로 사용하고, 오프라인 업로드분은 `clientTs` 비교로 fallback.
- 문서 크기: 현재 세이브 최대 ~15KB. Firestore 문서 한도(1MB) 대비 여유 충분.

### 3.3 왜 단일 문서인가

29개 localStorage 키를 개별 문서로 분리하면 읽기/쓰기 비용이 29배. 현재 전체 세이브가 15KB 미만이므로 `saves/current` 한 문서에 병합하는 것이 비용·성능 모두 최적.

---

## 4. 인증 플로우

### 4.1 로그인

```javascript
// cloud-sync.js 내부
var CloudSync = {
  user: null,

  signIn: function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    if (window.Capacitor || window.__TWA__) {
      return fbAuth.signInWithRedirect(provider);
    }
    return fbAuth.signInWithPopup(provider).then(function(result) {
      CloudSync.user = result.user;
      CloudSync._onAuthSuccess();
    });
  },

  signOut: function() {
    return fbAuth.signOut().then(function() {
      CloudSync.user = null;
      CloudSync.status = 'disconnected';
    });
  }
};
```

### 4.2 세션 유지

```javascript
// 앱 시작 시 자동 복원 (팝업 + 리다이렉트 결과 모두 처리)
fbAuth.onAuthStateChanged(function(user) {
  if (user) {
    CloudSync.user = user;
    CloudSync._onAuthSuccess();  // 자동 동기화 시작
  } else {
    CloudSync.user = null;
    CloudSync.status = 'disconnected';
  }
});

// 리다이렉트 결과 에러 핸들링 (Capacitor/TWA 전용)
fbAuth.getRedirectResult().catch(function(err) {
  if (err.code !== 'auth/redirect-cancelled-by-user') {
    console.warn('[CloudSync] Redirect auth error:', err.code);
  }
});
```

### 4.3 연동 해제 및 계정 삭제 (GDPR 대응)

```javascript
// 연동 해제: 로컬 세이브는 유지, 클라우드 데이터 삭제 선택권 제공
unlinkAccount: function(deleteCloudData) {
  if (deleteCloudData) {
    return CloudSync._deleteAllUserData().then(function() {
      return fbAuth.signOut();
    });
  }
  return fbAuth.signOut();
},

// 전체 데이터 삭제 (GDPR 삭제 요청 대응)
_deleteAllUserData: function() {
  var uid = CloudSync.user.uid;
  var batch = fbDb.batch();
  batch.delete(fbDb.doc('users/' + uid + '/saves/current'));
  batch.delete(fbDb.doc('users/' + uid + '/saves/snap_1'));
  batch.delete(fbDb.doc('users/' + uid + '/saves/snap_2'));
  batch.delete(fbDb.doc('users/' + uid + '/saves/snap_3'));
  batch.delete(fbDb.doc('users/' + uid + '/meta/progress'));
  batch.delete(fbDb.doc('users/' + uid + '/profile'));
  return batch.commit();
}
```

> **GDPR 참고:** Firebase Auth에서 사용자 삭제 시 Firestore 데이터는 자동 삭제되지 않는다. `_deleteAllUserData`를 연동 해제 시 옵션으로 제공하고, Firebase Auth 삭제 이벤트에 대해서는 향후 Cloud Functions의 `auth.user().onDelete()` 트리거 추가를 권장한다.

---

## 5. 동기화 전략

### 5.1 동기화 타이밍

| 이벤트 | 동작 |
|--------|------|
| `persistGame()` 호출 | 5초 debounce 후 `current` 업로드 |
| `saveSnapshot(slot)` | 즉시 해당 슬롯 업로드 |
| `loadSnapshot(slot)` | 즉시 `current` 업로드 (로드된 상태 반영) |
| `deleteSnapshot(slot)` | 즉시 해당 슬롯 클라우드 삭제 |
| `doGO()` (게임오버) | `current` 삭제 + `meta/progress` 업데이트 |
| `fullReset()` (전체 초기화) | 충돌 다이얼로그 표시 후 확인 시 전체 클라우드 삭제 |
| 앱 시작 (로그인 상태) | 풀 동기화 실행 |
| 온라인 복귀 (`navigator.onLine`) | 풀 동기화 실행 |
| `clearGame()` 호출 (새 게임) | §5.5 새 게임 가드 로직 적용 |

### 5.2 충돌 해결 (Conflict Resolution)

**기본 정책: serverTimestamp 기준 Last-Write-Wins + 가드 조건 + 사용자 선택 다이얼로그**

```javascript
_fullSync: function() {
  var localGame = Save.get('ts_game', {});
  var localTs = localGame.timestamp || 0;
  var localDay = (localGame.stats || {}).day || 0;

  return CloudSync._fetchCloud().then(function(cloud) {
    if (!cloud) {
      // 클라우드 비어있음 → 로컬 업로드
      return CloudSync._uploadAll();
    }

    var cloudClientTs = cloud.clientTs || 0;
    var cloudServerTs = cloud.serverTs ? cloud.serverTs.toMillis() : 0;
    var cloudDay = (cloud.game && cloud.game.stats) ? cloud.game.stats.day : 0;

    // 동일 타임스탬프 → 동기화 불필요
    if (localTs === cloudClientTs) {
      return;
    }

    // ──── 가드 1: 새 게임이 기존 진행 덮어쓰기 방지 ────
    if (localDay <= 1 && cloudDay >= 2) {
      return CloudSync._showConflictDialog(localDay, localTs, cloudDay, cloudClientTs);
    }

    // ──── 가드 2: 진행도 차이가 크면 사용자 선택 ────
    if (Math.abs(localDay - cloudDay) >= 2) {
      return CloudSync._showConflictDialog(localDay, localTs, cloudDay, cloudClientTs);
    }

    // ──── 일반 케이스: serverTimestamp 기준 최신 우선 ────
    // 오프라인 업로드 시에는 serverTs가 없으므로 clientTs로 fallback
    var effectiveCloudTs = cloudServerTs || cloudClientTs;
    if (effectiveCloudTs > localTs) {
      return CloudSync._downloadToLocal(cloud);
    } else {
      return CloudSync._uploadAll();
    }
  });
}
```

### 5.3 충돌 다이얼로그 UI

```
┌─────────────────────────────────────────┐
│  ⚠ 세이브 충돌 감지                      │
│                                         │
│  [이 기기]          [클라우드]            │
│  DAY 12 · ACT 3    DAY 8 · ACT 2       │
│  5분 전 저장        2시간 전 저장         │
│                                         │
│  ┌─────────────┐  ┌─────────────┐       │
│  │ 이 기기 사용 │  │ 클라우드 사용│       │
│  └─────────────┘  └─────────────┘       │
└─────────────────────────────────────────┘
```

선택 후 반대쪽 데이터는 자동으로 덮어쓴다.

### 5.4 Debounce 업로드 + beforeunload 안전망

```javascript
var _uploadTimer = null;

_scheduleUpload: function() {
  if (!CloudSync.user) return;
  if (!_isOnline) { _dirtyWhileOffline = true; return; }
  if (_uploadTimer) clearTimeout(_uploadTimer);
  _uploadTimer = setTimeout(function() {
    CloudSync._uploadCurrent();
  }, 5000);  // 5초 debounce
}
```

**탭 닫기 시 미업로드 데이터 처리:**

```javascript
window.addEventListener('beforeunload', function() {
  if (CloudSync.user && _uploadTimer) {
    clearTimeout(_uploadTimer);
    // 동기적 Firestore 쓰기는 불가하므로,
    // 남은 변경사항은 다음 세션 시작 시 fullSync에서 처리
    // localStorage에 'ts_cloud_dirty' 플래그를 남겨둠
    try { localStorage.setItem('ts_cloud_dirty', 'true'); } catch(e) {}
  }
});

// 앱 시작 시 dirty 플래그 확인
_onAuthSuccess: function() {
  var wasDirty = false;
  try { wasDirty = localStorage.getItem('ts_cloud_dirty') === 'true'; } catch(e) {}
  if (wasDirty) {
    try { localStorage.removeItem('ts_cloud_dirty'); } catch(e) {}
  }
  CloudSync._fullSync();  // wasDirty 여부와 무관하게 항상 fullSync
}
```

> **설계 결정:** `navigator.sendBeacon`은 Firestore REST API 직접 호출이 필요하고, 인증 토큰 관리가 복잡해지므로 채택하지 않는다. 대신 다음 세션 시작 시 fullSync가 미업로드 데이터를 처리한다. 5초 debounce + 게임 이벤트(스냅샷, 게임오버 등)의 즉시 업로드로 대부분의 케이스를 커버.

### 5.5 새 게임 시작 시 클라우드 덮어쓰기 방지

`clearGame()` → 새 게임 시작 흐름에서 day=1 상태가 기존 클라우드 진행 데이터를 덮어쓰지 않도록 가드:

```javascript
// clearGame 훅 (Save.clearGame 호출 후 실행)
_onClearGame: function() {
  if (!CloudSync.user || !_isOnline) return;

  // 클라우드에 기존 진행이 있는지 확인
  return CloudSync._fetchCloud().then(function(cloud) {
    if (cloud && cloud.game && cloud.game.stats && cloud.game.stats.day >= 2) {
      // 기존 진행 있음 → current만 삭제 (meta는 유지)
      // 다음 fullSync 시 "새 게임 vs 기존 진행" 충돌 다이얼로그 발동
      return fbDb.doc('users/' + CloudSync.user.uid + '/saves/current').delete();
    } else {
      // 기존 진행 없거나 day=1 → 그냥 삭제
      return fbDb.doc('users/' + CloudSync.user.uid + '/saves/current').delete();
    }
  });
}
```

### 5.6 게임오버(doGO) 시 클라우드 동작

```javascript
// app.js doGO() 함수 끝에 추가
// doGO는 Save.saveEnding(eid) → Save.incSession() → Save.clearGame() 순서로 호출
_onGameOver: function() {
  if (!CloudSync.user) return;
  // 1. current 세이브 삭제 (게임 끝남)
  var uid = CloudSync.user.uid;
  return fbDb.doc('users/' + uid + '/saves/current').delete().then(function() {
    // 2. meta/progress 업데이트 (엔딩 + 세션 카운트 보존)
    return CloudSync._uploadMeta();
  });
}
```

### 5.7 전체 초기화(fullReset) 시 클라우드 동작

```javascript
// fullReset은 24개 키를 삭제 후 reload. 클라우드도 초기화할지 사용자에게 확인.
_onFullReset: function(callback) {
  if (!CloudSync.user) { callback(); return; }

  // 확인 다이얼로그
  CloudSync._showResetConfirmDialog({
    message: '클라우드 세이브 데이터도 삭제하시겠습니까?',
    onDeleteCloud: function() {
      CloudSync._deleteAllUserData().then(callback);
    },
    onKeepCloud: function() {
      // 로컬만 초기화, 클라우드는 유지
      // 다음 로그인 시 클라우드에서 복원 가능
      callback();
    }
  });
}
```

### 5.8 스냅샷 슬롯 크로스디바이스 동기화 전략

**원칙: 슬롯별 독립 동기화, Last-Write-Wins (서버 타임스탬프 기준)**

| 시나리오 | 동작 |
|----------|------|
| 기기 A: 슬롯 1 저장 → 기기 B: 앱 시작 | B의 fullSync 시 클라우드 snap_1 다운로드 → 로컬 snap_1 덮어쓰기 |
| 기기 A: 슬롯 1 저장 → 기기 B: 슬롯 1 저장 | B의 저장이 클라우드에 올라감 (Last-Write-Wins). A는 다음 fullSync 시 B의 데이터를 받음 |
| 기기 A: 슬롯 1 저장 → 기기 B: 슬롯 1 삭제 | B에서 클라우드 snap_1 삭제. A는 다음 fullSync 시 로컬 snap_1 삭제됨 |

**슬롯 동기화 구현:**

```javascript
_syncSnapshots: function() {
  var promises = [1, 2, 3].map(function(slot) {
    var localSnap = Save.getSnapshot(slot);
    var localTs = localSnap ? (localSnap.timestamp || 0) : 0;

    return CloudSync._fetchSnapshot(slot).then(function(cloudSnap) {
      if (!cloudSnap && !localSnap) return;  // 양쪽 빈 슬롯
      if (!cloudSnap && localSnap) return CloudSync._uploadSnapshot(slot);  // 로컬만 있음
      if (cloudSnap && !localSnap) {
        // 클라우드만 있음 → 다운로드
        _isCloudWrite = true;
        try { Save.set('ts_snap_' + slot, cloudSnap.pack); }
        finally { _isCloudWrite = false; }
        return;
      }
      // 양쪽 다 있음 → 서버 타임스탬프 비교
      var cloudTs = cloudSnap.serverTs ? cloudSnap.serverTs.toMillis() : (cloudSnap.clientTs || 0);
      if (cloudTs > localTs) {
        _isCloudWrite = true;
        try { Save.set('ts_snap_' + slot, cloudSnap.pack); }
        finally { _isCloudWrite = false; }
      } else if (localTs > cloudTs) {
        return CloudSync._uploadSnapshot(slot);
      }
      // 동일하면 무시
    });
  });
  return Promise.all(promises);
}
```

**슬롯 삭제 크로스디바이스 전파:**

삭제 시 문서를 `delete()`하는 대신, 삭제 마커를 설정하는 방식도 가능하지만, 단순성을 위해 **문서 삭제 + fullSync 시 "클라우드에 없으면 로컬도 삭제"** 방식 채택:

```javascript
// 단, 사용자가 의도적으로 기기 로컬에만 유지하고 싶은 케이스는 없다고 가정.
// fullSync 시:
if (cloudSnap === null && localSnap !== null) {
  // 클라우드에 없고 로컬에만 있음 → 두 가지 해석 가능:
  // (a) 이 기기에서 새로 만든 것 → 업로드해야 함
  // (b) 다른 기기에서 삭제된 것 → 로컬도 삭제해야 함
  // 판별: localSnap.timestamp vs 마지막 fullSync 시각 비교
  var lastSyncAt = CloudSync._getLastSyncTime();
  if (localTs > lastSyncAt) {
    // 마지막 동기화 이후에 로컬에서 생성됨 → 업로드
    return CloudSync._uploadSnapshot(slot);
  } else {
    // 마지막 동기화 이전에 존재했으나 클라우드에서 사라짐 → 다른 기기에서 삭제
    _isCloudWrite = true;
    try { Save.del('ts_snap_' + slot); }
    finally { _isCloudWrite = false; }
  }
}
```

---

## 6. 오프라인 폴백 로직

### 6.1 연결 상태 감지

```javascript
var _isOnline = navigator.onLine;

window.addEventListener('online', function() {
  _isOnline = true;
  if (CloudSync.user) {
    CloudSync._fullSync();
  }
});

window.addEventListener('offline', function() {
  _isOnline = false;
});
```

### 6.2 동작 매트릭스

| 상태 | persistGame() | saveSnapshot() | loadSnapshot() | deleteSnapshot() |
|------|---------------|----------------|----------------|------------------|
| 온라인 + 로그인 | localStorage + 클라우드(debounce) | localStorage + 즉시 클라우드 업로드 | localStorage에서 복원 + 즉시 current 업로드 | localStorage 삭제 + 클라우드 삭제 |
| 오프라인 + 로그인 | localStorage만 (dirty 플래그) | localStorage만 (dirty 플래그) | localStorage에서 복원 | localStorage 삭제만 |
| 미로그인 | localStorage만 | localStorage만 | localStorage에서 복원 | localStorage 삭제만 |

### 6.3 오프라인 중 변경 추적

```javascript
var _dirtyWhileOffline = false;

// persistGame/saveSnapshot/deleteSnapshot 래퍼에서:
if (!_isOnline && CloudSync.user) {
  _dirtyWhileOffline = true;
}

// online 이벤트에서:
if (_dirtyWhileOffline) {
  CloudSync._fullSync();
  _dirtyWhileOffline = false;
}
```

---

## 7. 기존 코드 변경 포인트

### 7.1 app-init.js 변경 — Save.saveGame에 timestamp 추가

**[Critical] `ts_game` payload에 `timestamp` 필드 추가:**

```javascript
saveGame: function(s, g, a, af, tr, cd, rc, ct, cq, pb) {
  var sessionDeck = (typeof getActiveSessionDeck === 'function') ? getActiveSessionDeck() : null;
  var payload = normalizeGameSave({
    stats: s, gi: g, act: a || 1, actFlags: af || {},
    transRoute: tr || '', cooldowns: cd || {}, recentCards: rc || [],
    ct: ct || 0, chainQueue: cq || [], pendingBonus: pb || null,
    sessionDeck: sessionDeck,
    timestamp: Date.now()  // ← [v2 추가] 충돌 감지 근본 의존성
  });
  Save.set('ts_game', cleanGameSaveMeta(payload));
}
```

> **주의:** `normalizeGameSave()`와 `cleanGameSaveMeta()`에서 `timestamp` 필드를 삭제하지 않도록 확인 필요. 알 수 없는 키를 strip하는 로직이 있다면 화이트리스트에 `timestamp` 추가.

### 7.2 app-init.js 변경 — Save.set 훅 (무한 루프 방지)

```javascript
var Save = {
  set: function(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)) } catch(e) {}
    // [추가] 클라우드 동기화 알림 — _isCloudWrite 중에는 발화하지 않음
    if (typeof CloudSync !== 'undefined' && CloudSync.user && !CloudSync._isCloudWrite) {
      CloudSync._notifyChange(k);
    }
  },
  // ... 나머지 동일
};
```

### 7.3 app.js 변경 — persistGame

```javascript
var persistGame = function(s,g,a,af,tr,cd,rc,curCt,cq,fac,pb) {
  Save.saveGame(s,g,a,af,tr,cd||cooldowns,rc||recentCards,
    typeof curCt==='number'?curCt:ct, cq||chainQueue,
    pb!==undefined?pb:pendingBonus);
  if(fac) Save.saveFacility(fac);
  // [추가] 클라우드 업로드 스케줄
  if (typeof CloudSync !== 'undefined') CloudSync._scheduleUpload();
};
```

### 7.4 app.js 변경 — saveSnapshot / loadSnapshot / deleteSnapshot

```javascript
var saveSnapshot = function(slot) {
  // ... 기존 로직 그대로 ...
  // [추가] 클라우드에 슬롯 업로드
  if (typeof CloudSync !== 'undefined' && CloudSync.user) {
    CloudSync._uploadSnapshot(slot);
  }
};

var loadSnapshot = function(slot) {
  var pack = Save.loadSnapshot(slot);
  if (!pack) { /* 에러 처리 */ return; }
  // ... 기존 state 복원 로직 (stats, gi, act, logs, trust 등) ...

  // [추가] 로드한 상태를 클라우드 current에 반영
  if (typeof CloudSync !== 'undefined' && CloudSync.user) {
    CloudSync._uploadCurrent();  // 즉시 업로드 (debounce 아님)
  }
};

// app-init.js의 Save.deleteSnapshot 수정:
deleteSnapshot: function(slot) {
  Save.del('ts_snap_' + slot);
  // [추가] 클라우드에서도 삭제
  if (typeof CloudSync !== 'undefined' && CloudSync.user) {
    CloudSync._deleteSnapshot(slot);
  }
}
```

### 7.5 app.js 변경 — doGO (게임오버)

```javascript
var doGO = function(eid) {
  // ... 기존 로직: Save.saveEnding(eid), Save.incSession(), 엔딩 화면 표시 ...
  Save.clearGame();
  // [추가] 클라우드 게임오버 처리
  if (typeof CloudSync !== 'undefined' && CloudSync.user) {
    CloudSync._onGameOver();
  }
};
```

### 7.6 app.js 변경 — fullReset (전체 초기화)

```javascript
var fullReset = function() {
  // [추가] 클라우드 초기화 확인
  if (typeof CloudSync !== 'undefined' && CloudSync.user) {
    CloudSync._onFullReset(function() {
      // 기존 로직: 24개 키 삭제 후 reload
      _doLocalFullReset();
    });
    return;  // 다이얼로그 응답 대기
  }
  _doLocalFullReset();
};

var _doLocalFullReset = function() {
  // 기존 fullReset 내부 로직 (24개 localStorage 키 삭제 + reload)
};
```

### 7.7 설정 UI 변경 (components-settings-2.js)

**"계정 연동" 섹션 추가 (SettingsPanel 컴포넌트 내부):**

```javascript
h('div', {className:'settings-cloud-section'}, [
  h('h3', null, '☁️ 클라우드 세이브'),
  CloudSync.user
    ? h('div', {className:'cloud-connected'}, [
        h('span', null, CloudSync.user.displayName + ' 연동됨'),
        h('div', {className:'sync-status'}, CloudSync.statusText()),
        h('button', {onClick: function() {
          // 연동 해제 시 클라우드 데이터 처리 선택
          CloudSync._showUnlinkDialog();
        }}, '연동 해제')
      ])
    : h('button', {
        className:'btn-cloud-connect',
        onClick: function() { CloudSync.signIn(); }
      }, '🔗 Google 계정 연동')
]);
```

### 7.8 index.html 변경

```html
<!-- 기존 136개 스크립트 태그 앞에 Firebase 5줄 추가 -->
<script defer src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script defer src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
<script defer src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
<script defer src="firebase-config.js"></script>
<script defer src="cloud-sync.js"></script>
```

### 7.9 신규 파일 목록

| 파일 | 역할 | 크기(예상) |
|------|------|-----------|
| `firebase-config.js` | Firebase 초기화 | ~25줄 |
| `cloud-sync.js` | 동기화 모듈 전체 | ~450줄 |
| `components-cloud-ui.js` | 계정 연동/충돌/초기화 UI 컴포넌트 | ~120줄 |

---

## 8. Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 기본: 모든 접근 차단
    match /{document=**} {
      allow read, write: if false;
    }

    // 사용자 프로필
    match /users/{userId}/profile {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // 세이브 데이터 (current, snap_1, snap_2, snap_3)
    match /users/{userId}/saves/{saveId} {
      allow read: if request.auth != null
                  && request.auth.uid == userId
                  && saveId in ['current', 'snap_1', 'snap_2', 'snap_3'];

      // 쓰기: 인증 + 본인 + 화이트리스트 + 크기제한을 단일 규칙으로 병합
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && saveId in ['current', 'snap_1', 'snap_2', 'snap_3']
                   && request.resource.data.keys().size() <= 30
                   && request.resource.size() < 100 * 1024;
    }

    // 세이브 삭제 (delete는 request.resource가 없으므로 별도 규칙)
    match /users/{userId}/saves/{saveId} {
      allow delete: if request.auth != null
                    && request.auth.uid == userId
                    && saveId in ['current', 'snap_1', 'snap_2', 'snap_3'];
    }

    // 메타 데이터 (엔딩, 업적)
    match /users/{userId}/meta/{metaId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId
                         && metaId == 'progress';
    }
  }
}
```

**보안 포인트:**
- 자기 UID 문서만 읽기/쓰기 가능
- 문서 ID 화이트리스트로 임의 문서 생성 방지
- **단일 `allow write` 규칙**으로 100KB/30키 제한이 확실히 적용됨 (v1의 이중 allow 버그 수정)
- `allow delete` 별도 분리 (delete 시 `request.resource`는 존재하지 않으므로 크기 검증 불가)
- API 키 노출되어도 타인 데이터 접근 불가

---

## 9. 에러 핸들링

### 9.1 에러 분류 및 대응

| 에러 | 원인 | 대응 |
|------|------|------|
| `auth/popup-closed-by-user` | 사용자가 로그인 팝업 닫음 | 무시, 상태 유지 |
| `auth/network-request-failed` | 네트워크 없음 | 오프라인 모드 전환 |
| `permission-denied` | Firestore 규칙 차단 | 재로그인 시도 → 실패 시 로컬 모드 |
| `unavailable` | Firestore 일시 장애 | 30초 후 재시도 (최대 3회) |
| `resource-exhausted` | 할당량 초과 | 업로드 간격 30초로 확대 |
| QuotaExceededError | localStorage 꽉 참 | 오래된 스냅샷 정리 안내 |

### 9.2 재시도 로직

```javascript
_withRetry: function(fn, maxRetries, delay) {
  var attempts = 0;
  var execute = function() {
    return fn().catch(function(err) {
      attempts++;
      if (attempts >= maxRetries) {
        console.warn('[CloudSync] 최대 재시도 초과:', err.code);
        CloudSync.status = 'error';
        return;  // 조용히 실패 → 로컬만 사용
      }
      return new Promise(function(resolve) {
        setTimeout(resolve, delay * attempts);
      }).then(execute);
    });
  };
  return execute();
}
```

### 9.3 사용자 알림 정책

- **성공:** 토스트 메시지 "☁️ 동기화 완료" (2초 표시)
- **실패(재시도 중):** 설정 패널 상태 아이콘만 변경 (🔄)
- **실패(최종):** 토스트 "⚠️ 클라우드 연결 불가 — 로컬에 저장됨"
- **충돌:** 모달 다이얼로그 (§5.3)

게임플레이를 방해하지 않는 것이 최우선. 클라우드 실패는 절대 게임 진행을 막지 않는다.

---

## 10. 구현 순서 (마일스톤)

### Phase 1: 기반 + timestamp 추가 (2~3일)

- [ ] **`Save.saveGame`에 `timestamp: Date.now()` 필드 추가** (Critical)
- [ ] `normalizeGameSave` / `cleanGameSaveMeta`에서 timestamp 보존 확인
- [ ] Firebase 프로젝트 생성 및 Google Auth 활성화
- [ ] OAuth 동의 화면 설정
- [ ] `firebase-config.js` 작성
- [ ] `cloud-sync.js` 스캐폴드 (signIn/signOut/onAuthStateChanged + `_isCloudWrite` 플래그)
- [ ] index.html에 스크립트 태그 추가
- [ ] 설정 UI에 "계정 연동" 버튼 추가
- [ ] 검증: 로그인/로그아웃 정상 동작, ts_game에 timestamp 확인

### Phase 2: 업로드 구현 (2~3일)

- [ ] `_uploadCurrent()` — `serverTimestamp()` 포함
- [ ] `_uploadSnapshot(slot)` — 슬롯 업로드
- [ ] `_uploadMeta()` — 엔딩/세션/업적 업로드
- [ ] `_deleteSnapshot(slot)` — 슬롯 클라우드 삭제
- [ ] app.js `persistGame`에 `_scheduleUpload` 훅 추가
- [ ] `_isCloudWrite` 플래그로 Save.set 루프 방지 확인
- [ ] debounce + beforeunload dirty 플래그 동작 확인
- [ ] Firestore Rules 배포 (단일 allow write 규칙)
- [ ] 검증: Firebase Console에서 데이터 + serverTs 확인

### Phase 3: 다운로드 + 동기화 (3~4일)

- [ ] `_fetchCloud()` — 클라우드 데이터 읽기
- [ ] `_downloadToLocal(cloud)` — `_isCloudWrite` 플래그 감싸서 복원
- [ ] `_fullSync()` — serverTs 기반 비교 + 새 게임 가드 + 진행도 차이 가드
- [ ] `_syncSnapshots()` — 슬롯별 독립 머지
- [ ] 슬롯 삭제 크로스디바이스 전파 (lastSyncTime 비교)
- [ ] 충돌 다이얼로그 UI 구현
- [ ] `loadSnapshot` 후 즉시 `_uploadCurrent()` 훅
- [ ] 검증: 두 브라우저 간 세이브/슬롯 동기화

### Phase 4: 게임 이벤트 경로 (2~3일)

- [ ] `doGO` (게임오버) → current 삭제 + meta 업로드
- [ ] `fullReset` → 클라우드 삭제 확인 다이얼로그
- [ ] `clearGame` (새 게임) → 덮어쓰기 방지 가드
- [ ] 연동 해제 → 클라우드 데이터 삭제 선택 다이얼로그
- [ ] GDPR `_deleteAllUserData` batch 삭제
- [ ] 검증: 각 경로별 클라우드 상태 확인

### Phase 5: 오프라인 + 에러 (1~2일)

- [ ] online/offline 이벤트 리스너
- [ ] `_dirtyWhileOffline` 플래그
- [ ] 재시도 로직 (`_withRetry`)
- [ ] 에러별 토스트/상태 표시
- [ ] 검증: 비행기 모드에서 플레이 → 온라인 복귀 후 동기화

### Phase 6: 폴리싱 (1~2일)

- [ ] 동기화 상태 아이콘 (설정 패널 + 헤더 작은 아이콘)
- [ ] "마지막 동기화: X분 전" 표시
- [ ] 체크섬 검증 (데이터 무결성)
- [ ] Capacitor/TWA 환경 signInWithRedirect + getRedirectResult 분기
- [ ] validator.js에 cloud-sync.js 존재 여부 체크 추가
- [ ] 문서화 및 코드 리뷰

**총 예상 소요:** 11~17일

---

## 부록 A: cloud-sync.js 전체 구조 (의사코드)

```javascript
var CloudSync = {
  user: null,
  status: 'disconnected',  // 'disconnected'|'syncing'|'synced'|'error'|'offline'
  _isCloudWrite: false,    // Save.set 무한루프 방지 플래그

  // ─── Auth ───
  signIn: function() { /* Google popup/redirect */ },
  signOut: function() { /* sign out + status reset */ },
  unlinkAccount: function(deleteData) { /* 연동 해제 + 선택적 데이터 삭제 */ },
  _onAuthSuccess: function() { /* dirty 체크 + fullSync */ },

  // ─── Upload ───
  _scheduleUpload: function() { /* 5s debounce, offline시 dirty 플래그 */ },
  _uploadCurrent: function() { /* ts_game + 15키 + serverTimestamp() → saves/current */ },
  _uploadSnapshot: function(slot) { /* ts_snap_N + serverTimestamp() → saves/snap_N */ },
  _uploadMeta: function() { /* endings/sessions/achievements + serverTs → meta/progress */ },
  _uploadAll: function() { /* current + snaps + meta 전체 업로드 */ },

  // ─── Download ───
  _fetchCloud: function() { /* saves/current 읽기 */ },
  _fetchSnapshot: function(slot) { /* saves/snap_N 읽기 */ },
  _downloadToLocal: function(data) { /* _isCloudWrite=true 감싸서 Firestore → localStorage */ },

  // ─── Delete ───
  _deleteCurrent: function() { /* saves/current 삭제 */ },
  _deleteSnapshot: function(slot) { /* saves/snap_N 삭제 */ },
  _deleteAllUserData: function() { /* batch로 전체 문서 삭제 (GDPR) */ },

  // ─── Sync ───
  _fullSync: function() { /* serverTs 비교 + 새게임 가드 + 진행도 가드 → 업/다운/충돌 */ },
  _syncSnapshots: function() { /* 슬롯별 독립 머지 (lastSyncTime 기반) */ },
  _getLastSyncTime: function() { /* localStorage에서 마지막 sync 시각 */ },

  // ─── Game Events ───
  _onGameOver: function() { /* current 삭제 + meta 업로드 */ },
  _onFullReset: function(cb) { /* 클라우드 삭제 확인 → callback */ },
  _onClearGame: function() { /* 새 게임 덮어쓰기 방지 */ },

  // ─── UI ───
  _showConflictDialog: function(ld, lt, cd, ct) { /* 충돌 선택 모달 */ },
  _showResetConfirmDialog: function(opts) { /* 초기화 확인 모달 */ },
  _showUnlinkDialog: function() { /* 연동 해제 + 데이터 삭제 선택 */ },
  _notifyChange: function(key) { /* Save.set 훅 — _isCloudWrite 시 무시 */ },

  // ─── Utility ───
  _withRetry: function(fn, max, delay) { /* 재시도 래퍼 */ },
  _checksum: function(obj) { /* JSON → hash for integrity */ },
  statusText: function() { /* UI용 상태 문자열 */ }
};

// ─── 초기화 ───
fbAuth.onAuthStateChanged(function(user) { /* ... */ });
fbAuth.getRedirectResult().catch(function(err) { /* ... */ });
window.addEventListener('online', function() { /* ... */ });
window.addEventListener('offline', function() { /* ... */ });
window.addEventListener('beforeunload', function() { /* ... */ });
```

---

## 부록 B: localStorage 키 → Firestore 필드 매핑

| localStorage 키 | Firestore 위치 | 동기화 시점 |
|-----------------|----------------|-------------|
| `ts_game` | `saves/current.game` | persistGame (debounce) |
| `ts_game.timestamp` | `saves/current.clientTs` (복사) | persistGame |
| — | `saves/current.serverTs` | 업로드 시 자동 (서버) |
| `ts_logs` | `saves/current.logs` | persistGame |
| `ts_trust` | `saves/current.trust` | persistGame |
| `ts_usedDlg` | `saves/current.usedDlg` | persistGame |
| `ts_usedEvening` | `saves/current.usedEvening` | persistGame |
| `ts_seenArchive` | `saves/current.seenArchive` | persistGame |
| `ts_facility` | `saves/current.facility` | persistGame |
| `ts_combos` | `saves/current.combos` | persistGame |
| `ts_evidence_used` | `saves/current.evidenceUsed` | persistGame |
| `ts_resourceReserveUsed` | `saves/current.resourceReserveUsed` | persistGame |
| `ts_onceShown` | `saves/current.onceShown` | persistGame |
| `ts_recentNews` | `saves/current.recentNews` | persistGame |
| `ts_recentRewards` | `saves/current.recentRewards` | persistGame |
| `ts_activeSpecs` | `saves/current.activeSpecs` | persistGame |
| `ts_sessionDeck` | `saves/current.sessionDeck` | persistGame |
| `ts_act2_reached` | `saves/current.act2Reached` | persistGame |
| `ts_observer_proto` | `saves/current.observerProto` | persistGame |
| `ts_snap_1` | `saves/snap_1.pack` | saveSnapshot / syncSnapshots |
| `ts_snap_2` | `saves/snap_2.pack` | saveSnapshot / syncSnapshots |
| `ts_snap_3` | `saves/snap_3.pack` | saveSnapshot / syncSnapshots |
| `ts_endings` | `meta/progress.endings` | saveEnding / doGO |
| `ts_sessions` | `meta/progress.sessions` | incSession / doGO |
| `ts_achievements` | `meta/progress.achievements` | saveAchievements |
| `ts_cloud_dirty` | — (CloudSync 내부용) | beforeunload / 앱 시작 |
| `ts_cloud_lastSync` | — (CloudSync 내부용) | fullSync 완료 시 |
| `ts_volume` | 동기화 안 함 | — (기기별 설정) |
| `ts_sfxVol` | 동기화 안 함 | — |
| `ts_muted` | 동기화 안 함 | — |
| `ts_fxMode` | 동기화 안 함 | — |
| `ts_fontSize` | 동기화 안 함 | — |
| `ts_locale` | 동기화 안 함 | — |

> 볼륨/FX/폰트/언어는 기기별 선호 설정이므로 동기화하지 않는다.

---

## 부록 C: 비용 추정 (Firebase Spark → Blaze)

| 항목 | 무료 한도 (Spark) | 예상 사용량 (DAU 1000) |
|------|-------------------|----------------------|
| Auth | 무제한 | 1000 MAU |
| Firestore 읽기 | 50K/일 | ~8K/일 (앱 시작 1회 + 슬롯 3회) |
| Firestore 쓰기 | 20K/일 | ~18K/일 (유저당 ~18회/세션) |
| Firestore 저장 | 1GB | ~15MB (1000유저 × 15KB) |

> **참고:** v1 추정보다 쓰기 횟수가 증가함 (슬롯 동기화, doGO, fullReset 경로 추가). DAU 800 이상에서는 Blaze 전환 권장. Blaze 종량제 비용은 월 $1~2 수준.

---

## 부록 D: `_isCloudWrite` 플래그 상세 동작

Save.set → CloudSync._notifyChange 무한 루프를 방지하는 핵심 메커니즘:

```
[일반 게임플레이]
  persistGame() → Save.saveGame() → Save.set('ts_game', payload)
    → _isCloudWrite === false → _notifyChange 발동 → _scheduleUpload ✓

[클라우드 다운로드]
  _downloadToLocal(cloud)
    → _isCloudWrite = true
    → Save.set('ts_game', cloud.game)
      → _isCloudWrite === true → _notifyChange 무시 ✓
    → Save.set('ts_logs', cloud.logs)
      → _isCloudWrite === true → _notifyChange 무시 ✓
    → ... (나머지 키들)
    → _isCloudWrite = false

[loadSnapshot 후]
  Save.loadSnapshot(slot) 내부에서 Save.set 다수 호출
    → _isCloudWrite === false → _notifyChange 발동
    → 하지만 loadSnapshot 끝에서 _uploadCurrent()를 명시적으로 호출하므로,
      _notifyChange의 debounce upload는 자연스럽게 병합됨 (5초 내 중복 호출은 clearTimeout됨)
```

---

## §12. 게임 로직 안전장치 (Game Logic Safeguards)

> **Date:** 2026-05-18
> **Scope:** 클라우드 동기화가 게임플레이를 깨뜨릴 수 있는 시나리오 전수 조사 + 권장 해결책

---

### 12.1 발견된 문제 목록 (심각도 분류)

---

#### [Critical-1] logs 배열 Last-Write-Wins → ONCE 마커 소실로 카드 중복 출현

**시나리오:** 기기 A에서 once 카드 CA-003을 보고 logs에 `ONCE-CA-003`이 추가됨. persistGame → 5초 debounce 도중 탭 닫힘(beforeunload). dirty 플래그만 남음. 기기 B에서 앱 시작 → fullSync → 클라우드 데이터(ONCE-CA-003 없음) 다운로드. 기기 B에서 CA-003이 다시 출현.

**영향:** once 카드는 서사적으로 1회만 보여야 하는 중요 분기 카드(CA-001~006, 프로메테우스 접선, 서하은 조사 등). 재출현 시 서사 일관성 파괴. 특히 `ONCE-ORC-LOYAL-SAFE-01`, `ONCE-RH-SAFE-01` 같은 세이프가드 카드가 재발동되면 밸런스 붕괴.

**재현 조건:** debounce 5초 이내에 탭 닫기 + 다른 기기에서 앱 시작.

**권장 해결책:**
```javascript
// _downloadToLocal 시 logs 머지 전략을 "Last-Write-Wins 전체 교체"에서
// "append-only union"으로 변경. logs는 축적 전용 데이터이므로 삭제 없는 합집합이 안전.
_mergeLogsStrategy: function(localLogs, cloudLogs) {
  var seen = {}, merged = [];
  var all = (localLogs || []).concat(cloudLogs || []);
  all.forEach(function(id) {
    if (id && !seen[id]) { seen[id] = true; merged.push(id); }
  });
  return merged;
}
```

---

#### [Critical-2] chainQueue 중간 동기화 → 체인 단절 또는 중복 재생

**시나리오:** 기기 A에서 CH-005(프로메테우스 접선) 체인 시작. chainQueue=[CH-005-2, CH-005-3]. CH-005-1을 스와이프하여 chainQueue=[CH-005-3]으로 변경 + persistGame. 이때 fullSync가 온라인 복귀로 트리거되어, 클라우드의 이전 상태(chainQueue=[CH-005-2, CH-005-3])를 수신. serverTs가 더 최신이면 cloudQueue로 덮어쓰기 → CH-005-2가 다시 나타남.

**영향:** 23개 체인(CH-001~008, CH-CRISIS-*, CH-INC-*)의 서사 흐름 파괴. 이미 본 체인 카드가 다시 나타나거나, 건너뛴 체인 카드가 소실.

**재현 조건:** 체인 진행 중 + 다른 기기에서 동시에 같은 세이브 플레이.

**권장 해결책:**
```javascript
// 체인 진행 중에는 fullSync 다운로드를 차단하는 가드 추가
_fullSync: function() {
  var localGame = Save.get('ts_game', {});
  var localQueue = localGame.chainQueue || [];

  // ──── 가드 3: 체인 진행 중 클라우드 덮어쓰기 방지 ────
  if (localQueue.length > 0) {
    // 로컬이 체인 중이면 → 로컬 우선 업로드 (체인 연속성 보장)
    return CloudSync._uploadAll();
  }
  // ... 기존 fullSync 로직
}
```

---

#### [Critical-3] persistGame과 _uploadCurrent 사이 앱 종료 시 데이터 유실 범위가 logs를 포함

**시나리오:** 스와이프 → persistGame(stats, gi 등 업데이트) → 직후 tryUnlock('LOG-051') → Save.saveLogs() 호출 → 5초 debounce 대기 중 앱 강제 종료. localStorage에는 LOG-051이 있지만 클라우드에는 없음. 다음 세션에서 fullSync 시 클라우드 ts가 더 최신이면 LOG-051 소실.

**영향:** LOG-051(ORACLE 자체 교신 발견) 같은 핵심 스토리 로그 소실 → 프로메테우스 루트 차단, 엔딩 F 접근 불가.

**재현 조건:** swipe 직후 + tryUnlock 발동 카드 + 즉시 앱 종료.

**권장 해결책:**
- persistGame 내부에서 logs도 함께 저장하도록 _uploadCurrent에 logs 포함 확인 (현재 설계상 saves/current.logs로 포함됨 — OK)
- fullSync에서 logs 비교 시 단순 timestamp가 아닌 **logs 길이**도 고려: 클라우드 logs가 더 짧으면 로컬이 더 진행된 것
```javascript
// 가드 추가: logs 길이가 로컬 > 클라우드면 로컬 우선
var localLogsLen = (Save.get('ts_logs', []) || []).length;
var cloudLogsLen = (cloud.logs || []).length;
if (localLogsLen > cloudLogsLen + 3) {
  // 로컬이 현저히 더 진행됨 → 충돌 다이얼로그 또는 로컬 우선
  return CloudSync._showConflictDialog(...);
}
```

---

#### [High-1] usedEvening/usedDlg 인덱스 기반 배열 LWW → 같은 이브닝 챗/대화 재노출

**시나리오:** 기기 A에서 이브닝 챗 3개 소비 → usedEvening=[0,4,7]. 기기 B에서 앱 시작(이전 동기화 시점에는 usedEvening=[0,4]). fullSync에서 클라우드가 더 최신 → 기기 A의 [0,4,7]이 클라우드에 올라감. 정상. 그러나 역방향: 기기 B가 자체적으로 [0,4,9]를 만든 후 동기화 → 클라우드 [0,4,7] vs 로컬 [0,4,9]. LWW 적용 → 하나가 소실 → 해당 이브닝 챗 재출현.

**영향:** 이브닝 챗은 캐릭터 관계 구축 + trust 변화에 핵심. 재노출 시 신뢰도 이중 적용 가능.

**재현 조건:** 두 기기에서 독립적으로 이브닝 챗을 소비한 후 동기화.

**권장 해결책:**
```javascript
// usedEvening도 logs와 마찬가지로 append-only union 머지
_mergeUsedEvening: function(local, cloud) {
  var seen = {}, merged = [];
  (local || []).concat(cloud || []).forEach(function(idx) {
    if (!seen[idx]) { seen[idx] = true; merged.push(idx); }
  });
  return merged.sort(function(a,b){return a-b});
}
// usedDlg에도 동일 적용
```

---

#### [High-2] trust 수치 동기화 시 부분 갱신 → 캐릭터별 불일치

**시나리오:** modTrust('haeun', +10) 호출 → 즉시 Save.set('ts_trust', next) 실행. 이 시점에서 CloudSync._notifyChange가 발동하여 scheduleUpload(5초 debounce). 동시에 다른 기기에서 online 복귀 → fullSync → 구 trust 데이터 다운로드. modTrust가 Save.set을 직접 호출하므로 _isCloudWrite 체크는 정상 통과하지만, 다운로드가 이 직후에 실행되면 haeun 신뢰도 +10이 덮어써짐.

**영향:** 엔딩 판정(resolveTimeUp: `trust.haeun>=65` 체크), 미니게임 동행자 판정(CH-007-3), 대화 조건에 영향.

**재현 조건:** 대화/스와이프 중 동시에 online 이벤트 발생.

**권장 해결책:**
- `_fullSync` 실행 시 현재 phase가 'game'이고 사용자 인터랙션 진행 중이면 동기화를 연기
```javascript
_fullSync: function() {
  // 게임플레이 중에는 동기화를 연기 (다음 DAY 전환 시점까지)
  if (CloudSync._isGameplayActive()) {
    CloudSync._deferredSync = true;
    return Promise.resolve();
  }
  // ... 기존 로직
},
_isGameplayActive: function() {
  // App의 phase가 'game', 'mission', 'dialogue' 등 인터랙션 중이면 true
  var phase = window.__ts_currentPhase;
  return phase && phase !== 'menu' && phase !== 'go' && phase !== 'boot';
}
```

---

#### [High-3] facility 상태 LWW → 완료된 시설 확장 소실

**시나리오:** 기기 A에서 보상 단계에서 시설 확장 완료(approved→completed 이동). 기기 B에 아직 동기화 안 됨. 기기 B에서 다른 시설을 approved로 추가. B가 동기화 → B의 facility가 업로드됨. A가 다음 동기화 시 B의 데이터를 수신 → 완료된 시설이 사라짐.

**영향:** 시설 확장은 보상 풀에 영향을 미치고, uprising 시설은 GI에 영향. 완료 시설 소실 = 보상 누락 + 게임 밸런스 변경.

**재현 조건:** 두 기기에서 다른 시설을 각각 진행 후 동기화.

**권장 해결책:**
```javascript
// facility 머지: completed는 절대 삭제 불가 (축적 전용)
_mergeFacility: function(local, cloud) {
  var merged = {
    completed: _arrayUnion(local.completed, cloud.completed),
    approved: _arrayUnion(local.approved, cloud.approved),
    pending: _arrayUnion(local.pending, cloud.pending),
    proposed: _arrayUnion(local.proposed, cloud.proposed)
  };
  // 정규화: completed에 있으면 approved/pending에서 제거
  return normalizeFacilityState(merged);
}
```

---

#### [High-4] Act 전환 도중 동기화 → act/day/transRoute 불일치

**시나리오:** 기기 A에서 day=14 도달 → checkActTransition → act=3, route='A' 설정 + persistGame(act=3). debounce 업로드 전에 기기 B에서 fullSync → 클라우드에는 아직 act=2 상태. B가 "더 최신"으로 판정되어 act=2가 다운로드됨. A에서 다음 세션 시작 시 act=2로 되돌아감.

**영향:** Act 전환은 비가역적 서사 진행. 되돌리면 브리핑 재출현, 스탯 패널티 이중 적용, 트랜지션 카드 재출현.

**재현 조건:** day 경계(5, 14, 29) 도달 직후 + debounce 미완료 + 다른 기기 동기화.

**권장 해결책:**
```javascript
// fullSync에서 act 비교 가드 추가
// 클라우드 act < 로컬 act 이면 → 로컬 우선 (Act 회귀 방지)
if (localAct > cloudAct) {
  return CloudSync._uploadAll(); // 로컬이 더 진행됨
}
```

---

#### [High-5] 미션 진행 중 동기화 → curMission 상태 혼란

**시나리오:** 기기 A에서 미션 M-003 진입(phase='mission'). 미션은 React state(curMission)에만 존재하고 localStorage에 별도 저장되지 않음. 미션 결과 적용 전에 online 이벤트로 fullSync 트리거 → 클라우드 데이터로 stats 덮어쓰기. 미션 결과 적용 시 이미 다른 stats 기반으로 계산됨.

**영향:** 미션 보상이 의도와 다른 상태에 적용되거나, 미션 완료 후 stats가 다시 덮어써져서 보상 무효화.

**재현 조건:** 미션 진행 중 + online 이벤트.

**권장 해결책:**
- `_isGameplayActive()` 가드로 미션 중 동기화 차단 (High-2와 동일 해결책)
- 추가로 미션 시작 시 `CloudSync._lockSync = true`, 미션 결과 적용 후 `_lockSync = false` + 즉시 업로드

---

#### [High-6] sessionDeck 이중 저장소 불일치

**시나리오:** sessionDeck은 (1) `ts_game.sessionDeck`과 (2) `ts_sessionDeck` 두 곳에 저장됨. _downloadToLocal이 saves/current.sessionDeck을 `ts_sessionDeck`에 쓰지만, ts_game 내부의 sessionDeck 필드를 별도로 동기화하지 않으면, 다음 drawCard에서 `sessionDeckOk()`가 다른 데이터를 참조.

**영향:** sessionDeck은 세션별 카드 풀 제한 메커니즘. 불일치 시 이미 제외된 카드가 다시 등장하거나, 등장해야 할 카드가 차단됨.

**재현 조건:** 클라우드 다운로드 후 drawCard 호출.

**권장 해결책:**
```javascript
// _downloadToLocal에서 sessionDeck 양쪽 동기화 보장
_downloadToLocal: function(cloud) {
  _isCloudWrite = true;
  try {
    // ... 기존 키 복원 ...
    if (cloud.sessionDeck !== undefined) {
      Save.set('ts_sessionDeck', cloud.sessionDeck);
      if (typeof setActiveSessionDeck === 'function') {
        setActiveSessionDeck(cloud.sessionDeck);
      }
    }
    // ts_game 내부에도 sessionDeck이 포함되어 있으므로 일관성 확인
  } finally { _isCloudWrite = false; }
}
```

---

#### [Medium-1] seenArchive/endings/achievements 머지 — 데이터 소실 가능

**시나리오:** meta/progress의 endings 배열이 LWW로 덮어쓰기될 경우, 기기 A에서 달성한 엔딩이 사라질 수 있음.

**영향:** 엔딩 컬렉션은 리셋 후에도 유지되는 영구 데이터. 소실 시 플레이어 동기 저하.

**재현 조건:** 두 기기에서 각각 다른 엔딩 달성 후 meta/progress 동기화.

**권장 해결책:**
```javascript
// meta/progress 필드들은 모두 append-only union 머지
_mergeMeta: function(local, cloud) {
  return {
    endings: _arrayUnion(local.endings, cloud.endings),
    sessions: Math.max(local.sessions || 0, cloud.sessions || 0),
    achievements: _arrayUnion(local.achievements, cloud.achievements)
  };
}
```

---

#### [Medium-2] normalizeGameSave 마이그레이션이 클라우드 데이터에 적용되지 않을 수 있음

**시나리오:** 클라우드에 act=3, day=10인 비정상 데이터가 저장됨(버그 또는 이전 버전에서 저장). _downloadToLocal이 Save.set('ts_game', cloud.game)을 호출하면, 다음 Save.get 시 normalizeGameSave가 실행되지만, React state에는 이미 비정상 값이 로드된 상태.

**영향:** act/day 불일치로 인해 잘못된 카드 풀 접근, 전이 카드 누락.

**재현 조건:** 클라우드 데이터가 이전 버전 클라이언트에서 저장된 경우.

**권장 해결책:**
```javascript
// _downloadToLocal에서 명시적으로 normalizeGameSave 적용
var fixedGame = normalizeGameSave(cloud.game);
fixedGame = cleanGameSaveMeta(fixedGame);
Save.set('ts_game', fixedGame);
// React state 복원도 fixedGame 기준으로
```

---

#### [Medium-3] cooldowns/recentCards LWW → 같은 카드 연속 출현

**시나리오:** 기기 A에서 C-013을 보고 cooldowns['C-013']=day7, recentCards에 추가. 기기 B가 동기화 → 기기 A의 업데이트가 아직 업로드 안 됨 → B에서 C-013이 다시 등장.

**영향:** 게임플레이 반복감 증가, 특히 cooldown이 있는 카드가 연속 출현하면 부자연스러움. 하지만 서사적 파괴는 아님(once 카드가 아닌 경우).

**재현 조건:** 두 기기에서 비슷한 시점에 플레이.

**권장 해결책:**
```javascript
// cooldowns는 max-day 머지 (각 카드별로 더 최근 day 유지)
_mergeCooldowns: function(local, cloud) {
  var merged = {};
  var all = Object.assign({}, cloud, local);
  Object.keys(all).forEach(function(k) {
    merged[k] = Math.max(local[k] || 0, cloud[k] || 0);
  });
  return merged;
}
// recentCards는 union (최근 60개 유지)
_mergeRecentCards: function(local, cloud) {
  var seen = {}, merged = [];
  (cloud || []).concat(local || []).forEach(function(id) {
    if (id && !seen[id]) { seen[id] = true; merged.push(id); }
  });
  return merged.slice(-60);
}
```

---

#### [Medium-4] activeSpecs 세션 랜덤 선택이 동기화로 오염

**시나리오:** activeSpecs는 세션 시작 시 랜덤으로 3개 선택됨(ALL_SPEC_TAGS에서). 기기 A: [spec-001, spec-003, spec-008]. 기기 B: [spec-004, spec-011, spec-012]. 클라우드 동기화로 B의 값이 A에 덮어쓰기되면 A에서 이미 진행 중이던 spec-001 카드들이 갑자기 차단됨.

**영향:** 세션 중 변이체 체인이 갑자기 출현 안 함 → 서사 단절감.

**재현 조건:** 두 기기에서 새 게임 시작 후 동기화.

**권장 해결책:**
- activeSpecs는 세션 초기에 한 번 결정되면 해당 세션 동안 변경 불가로 설계
- `_downloadToLocal` 시 activeSpecs는 현재 게임 진행 중이면 로컬 값 유지
```javascript
// 진행 중인 게임이 있으면 activeSpecs는 다운로드에서 제외
if (localGame && localGame.stats && localGame.stats.day > 1) {
  // activeSpecs는 로컬 유지
} else {
  Save.set('ts_activeSpecs', cloud.activeSpecs);
}
```

---

#### [Medium-5] 미션 완료 보상 이중 지급

**시나리오:** 기기 A에서 미션 M-003 완료 → stats에 보상 적용 + tryUnlock('LOG-008'). persistGame 호출됨. 기기 B에서 동일 세이브 로드 후 M-003 진입 카드가 아직 once가 아닌 경우(진입 카드와 미션 완료는 별개), 다시 미션 수행 가능.

**영향:** stats 보상(c/r/t/o 변화) 이중 적용으로 밸런스 깨짐.

**재현 조건:** 미션 완료 → 동기화 전 → 다른 기기에서 같은 미션 진입 가능 상태.

**권장 해결책:**
- 미션 완료 시 해당 미션 트리거 카드의 ONCE 마커를 logs에 추가 (대부분의 미션 진입 카드는 이미 once:true)
- logs union 머지(Critical-1 해결책)가 적용되면 자동으로 방어됨

---

#### [Low-1] recentNews/recentRewards 중복

**시나리오:** 뉴스 풀에서 이미 표시한 항목 추적용 배열. LWW로 인해 일부 항목이 소실되면 같은 뉴스가 다시 표시됨.

**영향:** 미관/몰입도 소폭 저하. 게임 메커니즘에는 영향 없음.

**권장 해결책:** union 머지 적용 (Low priority이므로 구현 우선순위 낮음).

---

#### [Low-2] seenArchive 머지

**시나리오:** 아카이브 열람 기록. LWW로 일부 소실 가능.

**영향:** 이미 읽은 아카이브에 "NEW" 뱃지가 다시 표시됨. 게임 진행 영향 없음.

**권장 해결책:** union 머지.

---

### 12.2 핵심 설계 원칙 (추가 제안)

위 문제들을 종합하면, 현재 설계의 "전체 문서 Last-Write-Wins" 정책이 TIU-CARD의 게임 데이터 특성과 맞지 않는 부분이 있다. 게임 데이터는 크게 두 종류로 나뉜다:

| 데이터 유형 | 특성 | 적합한 머지 전략 |
|---|---|---|
| **축적형** (logs, endings, achievements, usedDlg, usedEvening, facility.completed, seenArchive, cooldowns) | 한번 추가되면 삭제 안 됨 | **Union 머지** (합집합) |
| **상태형** (stats, gi, act, ct, transRoute, actFlags, chainQueue, pendingBonus) | 현재 순간의 스냅샷 | **Last-Write-Wins** (단, 가드 조건 강화) |
| **설정형** (activeSpecs, sessionDeck) | 세션 시작 시 결정, 중간 변경 위험 | **진행 중이면 로컬 유지** |

**권장: Hybrid Merge Strategy**

```javascript
_downloadToLocal: function(cloud) {
  _isCloudWrite = true;
  try {
    // ═══ 축적형: Union 머지 ═══
    var localLogs = Save.get('ts_logs', []);
    Save.set('ts_logs', CloudSync._arrayUnion(localLogs, cloud.logs));

    Save.set('ts_usedDlg', CloudSync._arrayUnion(
      Save.get('ts_usedDlg', []), cloud.usedDlg));
    Save.set('ts_usedEvening', CloudSync._arrayUnion(
      Save.get('ts_usedEvening', []), cloud.usedEvening));
    Save.set('ts_seenArchive', CloudSync._arrayUnion(
      Save.get('ts_seenArchive', []), cloud.seenArchive));

    // facility: completed는 union, 나머지는 normalizeFacilityState로 정리
    var localFac = Save.get('ts_facility', {});
    var mergedFac = CloudSync._mergeFacility(localFac, cloud.facility);
    Save.set('ts_facility', mergedFac);

    // ═══ 상태형: LWW (이미 충돌 판정 통과 후 여기 도달) ═══
    Save.set('ts_game', normalizeGameSave(cloud.game));
    Save.set('ts_trust', cloud.trust);  // trust는 상태형으로 분류

    // ═══ 설정형: 진행 중이면 로컬 유지 ═══
    var localGame = Save.get('ts_game', {});
    if (!localGame || !localGame.stats || localGame.stats.day <= 1) {
      if (cloud.activeSpecs) Save.set('ts_activeSpecs', cloud.activeSpecs);
      if (cloud.sessionDeck !== undefined) Save.set('ts_sessionDeck', cloud.sessionDeck);
    }
  } finally { _isCloudWrite = false; }
}

// 유틸리티
_arrayUnion: function(a, b) {
  var seen = {}, out = [];
  (a || []).concat(b || []).forEach(function(v) {
    var key = typeof v === 'object' ? JSON.stringify(v) : String(v);
    if (!seen[key]) { seen[key] = true; out.push(v); }
  });
  return out;
}
```

---

### 12.3 동기화 타이밍 안전장치

```javascript
// 게임플레이 중 동기화 차단 메커니즘
var _syncLocked = false;

// App 컴포넌트에서 phase 변경 시 알림
window.__ts_currentPhase = phase;  // useEffect에서 갱신

CloudSync._isGameplayActive = function() {
  var p = window.__ts_currentPhase;
  return p === 'game' || p === 'mission' || p === 'dialogue'
      || p === 'evening' || p === 'reward' || p === 'escape_game';
};

// fullSync 수정
_fullSync: function() {
  // 가드: 체인 진행 중
  var localGame = Save.get('ts_game', {});
  if ((localGame.chainQueue || []).length > 0) {
    return CloudSync._uploadAll();
  }
  // 가드: 게임플레이 인터랙션 중
  if (CloudSync._isGameplayActive()) {
    CloudSync._deferredSync = true;
    return Promise.resolve();
  }
  // ... 기존 충돌 판정 로직 ...
}

// DAY 전환 시점(hReward 완료 후)에 deferred sync 실행
_checkDeferredSync: function() {
  if (CloudSync._deferredSync && CloudSync.user) {
    CloudSync._deferredSync = false;
    CloudSync._fullSync();
  }
}
```

**안전한 동기화 시점:**
- 앱 최초 시작 (메뉴 화면)
- DAY 전환 직후 (hReward → hEvening 사이)
- 게임오버 후
- 설정 화면 진입 시

**위험한 동기화 시점 (차단 필요):**
- 카드 스와이프 중
- 체인 진행 중 (chainQueue.length > 0)
- 미션 진행 중
- 대화 진행 중
- 이브닝 챗 선택 중

---

### 12.4 meta/progress 안전장치

meta/progress는 게임 리셋 후에도 보존되는 영구 데이터이므로 특별 취급:

```javascript
// meta/progress 업로드 시 기존 값과 합집합
_uploadMeta: function() {
  var uid = CloudSync.user.uid;
  var docRef = fbDb.doc('users/' + uid + '/meta/progress');

  return docRef.get().then(function(doc) {
    var existing = doc.exists ? doc.data() : {};
    var local = {
      endings: Save.getEndings(),
      sessions: Save.getSessions(),
      achievements: Save.getAchievements()
    };

    // 합집합 머지
    var merged = {
      endings: CloudSync._arrayUnion(existing.endings, local.endings),
      sessions: Math.max(existing.sessions || 0, local.sessions || 0),
      achievements: CloudSync._arrayUnion(existing.achievements, local.achievements),
      serverTs: firebase.firestore.FieldValue.serverTimestamp()
    };

    return docRef.set(merged);
  });
}
```

---

### 12.5 체크섬 + 무결성 검증

```javascript
// 업로드 전 / 다운로드 후 무결성 검증
_validateGameState: function(game) {
  if (!game || !game.stats) return { valid: false, reason: 'no_stats' };
  var s = game.stats;

  // 기본 범위 체크
  if (s.c < 0 || s.c > 100) return { valid: false, reason: 'c_range' };
  if (s.r < 0 || s.r > 100) return { valid: false, reason: 'r_range' };
  if (s.t < 0 || s.t > 100) return { valid: false, reason: 't_range' };
  if (s.o < 0 || s.o > 100) return { valid: false, reason: 'o_range' };
  if (s.day < 1 || s.day > 40) return { valid: false, reason: 'day_range' };

  // act/day 일관성 (normalizeGameSave 로직과 동일)
  var maxAct = getMaxActForDay(s.day);
  if ((game.act || 1) > maxAct) return { valid: false, reason: 'act_day_mismatch' };

  // chainQueue의 카드가 실제 존재하는지
  if (game.chainQueue) {
    for (var i = 0; i < game.chainQueue.length; i++) {
      var cid = game.chainQueue[i].id || game.chainQueue[i];
      // 체인 카드는 CARD_BY_ID에 없을 수 있음 (인라인 정의)
      // → 이 검증은 스킵하거나 loose하게
    }
  }

  return { valid: true };
}
```

---

### 12.6 구현 시 테스트 시나리오 체크리스트

| # | 시나리오 | 검증 포인트 |
|---|---|---|
| T1 | 체인 CH-005 2/3번째 카드 진행 중 탭 닫기 → 다른 기기 시작 | chainQueue 보존, CH-005-2 중복 없음 |
| T2 | once 카드 CA-003 스와이프 직후 탭 닫기 → 다른 기기 시작 | ONCE-CA-003 logs에 존재, CA-003 재출현 안 함 |
| T3 | 미션 M-003 진행 중 online 이벤트 발생 | 미션 결과가 정상 적용, stats 덮어쓰기 안 됨 |
| T4 | 기기 A: 이브닝 챗 5개 소비 / 기기 B: 이브닝 챗 3개 소비 → 동기화 | usedEvening에 8개 모두 포함 |
| T5 | 기기 A: Act 3 도달 / 기기 B: 아직 Act 2 → B에서 fullSync | 충돌 다이얼로그 표시, Act 회귀 안 됨 |
| T6 | 기기 A: 엔딩 E 달성 / 기기 B: 엔딩 A 달성 → meta 동기화 | endings = ['E', 'A'] (합집합) |
| T7 | 기기 A: 시설 FE-003 완료 / 기기 B: 시설 FE-005 승인 → 동기화 | 양쪽 모두 보존 |
| T8 | Day 14 Act 전환 직후 5초 이내 다른 기기에서 fullSync | 로컬 act=3 유지, 클라우드에 업로드 |
| T9 | 35일 Time-up 엔딩 직전 동기화로 day 변경 | 엔딩 판정 정상 수행 |
| T10 | 새 게임 시작 → clearGame → 다른 기기에서 기존 진행 있음 | 충돌 다이얼로그 표시, 기존 진행 보호 |

---

### 12.7 요약: 설계 문서 변경 사항

| 우선순위 | 변경 항목 | 영향 범위 |
|---|---|---|
| **Critical** | logs/usedDlg/usedEvening/endings/achievements를 union 머지로 변경 | _downloadToLocal, _fullSync |
| **Critical** | chainQueue > 0일 때 fullSync 다운로드 차단 | _fullSync |
| **Critical** | fullSync에 logs 길이 + act 비교 가드 추가 | _fullSync |
| **High** | 게임플레이 중 동기화 연기 (deferred sync) | CloudSync 전체 |
| **High** | facility.completed union 머지 | _downloadToLocal |
| **High** | meta/progress read-then-merge-then-write | _uploadMeta |
| **High** | sessionDeck 양쪽 저장소 동기화 보장 | _downloadToLocal |
| **Medium** | cooldowns max-day 머지 | _downloadToLocal |
| **Medium** | normalizeGameSave를 다운로드 시 명시 적용 | _downloadToLocal |
| **Medium** | activeSpecs 진행 중 덮어쓰기 방지 | _downloadToLocal |
| **Low** | recentNews/seenArchive union 머지 | _downloadToLocal |

---

## 변경 이력

| 버전 | 날짜 | 변경 사항 |
|------|------|-----------|
| 1.0 | 2026-05-17 | 초안 작성 |
| 2.0 | 2026-05-18 | 검토 보고서(REVIEW-FIREBASE-CLOUD-SAVE.md) 반영. 주요 변경: |
| | | **[Critical]** ts_game에 `timestamp: Date.now()` 필드 추가 — 충돌 감지 근본 의존성 해결 |
| | | **[Critical]** Firestore `serverTimestamp()` 병행 저장 — 기기 시계 오차 방어 |
| | | **[High]** loadSnapshot 클라우드 경로 추가 — 로드 후 즉시 current 업로드 |
| | | **[High]** `_isCloudWrite` 플래그 — Save.set 무한 루프 방지 |
| | | **[High]** Firestore 보안 규칙 — 이중 allow write를 단일 규칙으로 병합 + delete 분리 |
| | | **[High]** 새 게임 시작 시 클라우드 덮어쓰기 방지 가드 로직 |
| | | doGO(게임오버) / fullReset(전체 초기화) 클라우드 동작 정의 |
| | | deleteSnapshot 클라우드 삭제 훅 추가 |
| | | 계정 삭제/연동 해제/GDPR 데이터 삭제 섹션 추가 |
| | | 슬롯별 독립 머지 전략 + 크로스디바이스 삭제 전파 방식 명시 |
| | | `ts_act2_reached`, `ts_observer_proto` 누락 키 매핑 추가 |
| | | beforeunload dirty 플래그 + 다음 세션 복구 전략 |
| | | OAuth 동의 화면 / getRedirectResult 에러 핸들링 추가 |
| | | 부록 D: _isCloudWrite 플래그 상세 동작 추가 |
| 2.1 | 2026-05-18 | §12 게임 로직 안전장치 섹션 추가. 주요 내용: |
| | | **[Critical]** logs/usedDlg/usedEvening union 머지 전략 제안 — ONCE 마커 소실 방지 |
| | | **[Critical]** chainQueue 진행 중 fullSync 다운로드 차단 가드 |
| | | **[Critical]** logs 길이 + act 비교 가드로 진행도 회귀 방지 |
| | | **[High]** 게임플레이 중 동기화 연기(deferred sync) 메커니즘 |
| | | **[High]** facility.completed / meta/progress union 머지 |
| | | **[High]** sessionDeck 이중 저장소 정합성 보장 |
| | | Hybrid Merge Strategy 제안 (축적형 vs 상태형 vs 설정형 분류) |
| | | 테스트 시나리오 체크리스트 10종 추가 |
