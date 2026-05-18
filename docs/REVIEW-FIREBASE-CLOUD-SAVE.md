# DESIGN-FIREBASE-CLOUD-SAVE.md 정밀 검토 보고서

> **검토일:** 2026-05-17
> **대상:** docs/DESIGN-FIREBASE-CLOUD-SAVE.md v1.0
> **대조 코드:** app-init.js, app.js (루트 디렉토리)

---

## 종합 결과 요약

| 카테고리 | PASS | ISSUE | MISSING |
|----------|------|-------|---------|
| 설계-코드 정합성 | 3 | 4 | 2 |
| 오프라인 시나리오 | 3 | 2 | 1 |
| 세이브 슬롯 연동 | 2 | 2 | 1 |
| 충돌 해결 로직 | 1 | 3 | 0 |
| Firestore 데이터 모델 | 2 | 2 | 1 |
| 누락/위험 요소 | — | 3 | 4 |
| **합계** | **11** | **16** | **9** |

---

## 1. 설계-코드 정합성 검증

### PASS

| # | 항목 | 근거 |
|---|------|------|
| P1 | `Save.set(k,v)` 시그니처 일치 | app-init.js:317 — `set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}` |
| P2 | `persistGame` 시그니처 일치 | app.js:109 — `var persistGame=function(s,g,a,af,tr,cd,rc,curCt,cq,fac,pb)` |
| P3 | `Save.saveSnapshot(slot,data)` 존재 | app-init.js:338 — 정확히 설계와 동일한 위치 |

### ISSUE

| # | 항목 | 설명 | 심각도 |
|---|------|------|--------|
| I1 | **`ts_game`에 `timestamp` 필드 없음** | 설계 §5.2의 `_fullSync`에서 `Save.get('ts_game', {}).timestamp`를 참조하지만, 실제 `Save.saveGame`(app-init.js:320-323)은 `{stats, gi, act, actFlags, transRoute, cooldowns, recentCards, ct, chainQueue, pendingBonus, sessionDeck}`만 저장. timestamp 필드가 없으므로 항상 0이 되어 충돌 감지가 작동하지 않음. | **Critical** |
| I2 | **변경 포인트 "3곳" 표현 오해의 소지** | §7 제목은 "기존 코드 변경 포인트"이며 실제로 §7.1~7.4까지 4개 파일(app-init.js, app.js, components-settings-2.js, index.html)에 걸쳐 5개 이상의 수정. "3줄 추가"(§7.1)와 전체 변경 포인트를 혼동할 수 있음. | Medium |
| I3 | **`loadSnapshot`에 대한 클라우드 다운로드 코드 누락** | §6.2 동작 매트릭스에서 온라인+로그인 시 `loadSnapshot()`은 "클라우드에서 다운로드"라고 명시하지만, §7.2에서 loadSnapshot에 대한 코드 변경이 제시되지 않음. 현재 코드(app.js:495-530)는 순수하게 localStorage에서만 읽음. | High |
| I4 | **`Save.set` 훅의 무한 루프 위험** | §7.1에서 `Save.set` 끝에 `CloudSync._notifyChange(k)`를 추가하는데, `_downloadToLocal()`이 Save.set을 호출하면 → notifyChange → scheduleUpload → 방금 다운받은 데이터를 다시 업로드하는 루프 발생 가능. | High |

### MISSING

| # | 항목 | 설명 |
|---|------|------|
| M1 | **`doGO` (게임오버) 경로 미커버** | app.js:216에서 `doGO`는 `Save.saveEnding(eid)`, `Save.incSession()`, `Save.clearGame()`을 연속 호출. 설계에서 이 시점의 `meta/progress` 업로드 + `saves/current` 삭제 트리거가 명시되지 않음. |
| M2 | **`fullReset` 경로 미커버** | app.js:463에서 `fullReset`은 24개 키를 직접 삭제 후 `window.location.reload()`. 클라우드의 모든 데이터도 삭제해야 하는지, 아니면 로컬만 초기화하는지 정의 없음. |

---

## 2. 오프라인 세이브 시나리오 검증

### PASS

| # | 항목 | 근거 |
|---|------|------|
| P4 | 오프라인 새 게임 → 세이브 → 종료 → 재시작 → 로드 | 기존 localStorage 경로가 100% 유지되므로 깨지지 않음. CloudSync는 항상 `typeof CloudSync !== 'undefined'` 가드를 통과해야만 동작. |
| P5 | Firebase SDK 로딩 실패 시 게임 정상 동작 | §7.1~7.2의 모든 훅이 `typeof CloudSync !== 'undefined'` 체크를 가지므로 SDK 미로딩 시 기존과 동일. |
| P6 | `_dirtyWhileOffline` 플래그 설계 적합 | §6.3의 접근법이 올바름 — 오프라인 중 변경 추적 후 online 이벤트에서 fullSync. |

### ISSUE

| # | 항목 | 설명 | 심각도 |
|---|------|------|--------|
| I5 | **세이브 도중 오프라인 전환 시 부분 쓰기** | Firestore `setDoc`은 atomic이므로 문서 단위로는 안전하나, `_uploadAll()`이 current + snap_1~3 + meta를 순차 업로드하는 경우 중간에 네트워크 끊기면 일부 슬롯만 업로드됨. 설계에 batch write 사용 여부가 명시되지 않음. | Medium |
| I6 | **Firestore 오프라인 캐시 미활용** | Firestore SDK 자체의 `enablePersistence()` 기능을 사용하면 SDK 레벨에서 오프라인 큐잉이 가능한데, 설계는 자체 `_dirtyWhileOffline` 플래그로만 처리. 중복 구현이 되거나, Firestore 내부 캐시와 충돌할 수 있음. | Low |

### MISSING

| # | 항목 | 설명 |
|---|------|------|
| M3 | **탭 닫기/브라우저 종료 시 미업로드 데이터** | 사용자가 카드 스와이프 후 5초 debounce 중 탭을 닫으면 클라우드에 미반영. `beforeunload` 이벤트에서 동기적으로 업로드하는 방안(또는 `navigator.sendBeacon`) 미언급. |

---

## 3. 세이브 슬롯 연동 검증

### PASS

| # | 항목 | 근거 |
|---|------|------|
| P7 | 슬롯별 독립 동기화 설계 | §3.1에서 `saves/snap_1`, `saves/snap_2`, `saves/snap_3`을 별도 문서로 분리. 슬롯 1 저장 시 해당 문서만 업로드. |
| P8 | 슬롯 저장 시 즉시 업로드 | §5.1에서 saveSnapshot은 debounce 없이 즉시 업로드 명시. |

### ISSUE

| # | 항목 | 설명 | 심각도 |
|---|------|------|--------|
| I7 | **스냅샷 로드 시 클라우드 반영 누락** | `loadSnapshot(slot)`은 localStorage의 15개+ 키를 덮어쓰는데(app-init.js:385-402), 이 시점에 `Save.set`이 대량 호출됨. §7.1의 `_notifyChange` 훅이 모든 키에 대해 발동하면 debounce 전에 수십 회의 불필요한 알림 발생. 또한 로드 후 `current`가 바뀌었으므로 즉시 `_uploadCurrent()`를 해야 하는데 이 경로가 설계에 없음. | High |
| I8 | **기기 A/B 독립 슬롯 저장 충돌** | 기기 A에서 슬롯 1에 저장, 기기 B에서 슬롯 1에 저장 → Last-Write-Wins로 하나가 소실. 슬롯 충돌 시 사용자 선택 다이얼로그가 current에만 적용되고 스냅샷에는 적용되지 않음. | Medium |

### MISSING

| # | 항목 | 설명 |
|---|------|------|
| M4 | **`deleteSnapshot(slot)` 클라우드 삭제 코드** | §5.1 테이블에 "즉시 해당 슬롯 삭제"라고 명시하지만, §7.2 코드 변경 예시에 deleteSnapshot 훅이 빠져 있음. 실제 코드(app-init.js:369)에서 `Save.del('ts_snap_'+slot)`만 호출. |

---

## 4. 충돌 해결 로직 검증

### PASS

| # | 항목 | 근거 |
|---|------|------|
| P9 | 진행도 비교의 `day` 변수가 코드와 매칭 | 설계의 `cloud.game.stats.day`는 실제 저장 구조 `{stats:{day:N}}`과 일치. |

### ISSUE

| # | 항목 | 설명 | 심각도 |
|---|------|------|--------|
| I9 | **timestamp 비교 불가 (I1과 연동)** | `ts_game`에 timestamp가 없으므로 `localTs`는 항상 0. 클라우드에 업로드할 때 별도로 timestamp를 추가한다면 코드에 그 로직이 필요하지만 설계에 명시 안 됨. 현재 설계대로라면 `localTs === cloudTs === 0`이 되어 "동기화 불필요"로 빠지거나, 클라우드에만 timestamp가 있으면 항상 클라우드 우선이 됨. | **Critical** |
| I10 | **시계 오차 문제** | `Date.now()` 기반 비교. 기기 A의 시계가 5분 빠르면, 기기 B에서 나중에 저장해도 timestamp가 더 작아 기기 A의 구 데이터가 "최신"으로 판정될 수 있음. 서버 타임스탬프(`firebase.firestore.FieldValue.serverTimestamp()`) 사용을 고려해야 함. | High |
| I11 | **"2일 차이" 기준의 엣지케이스** | DAY 1에서 새 게임 시작(기기 A) vs DAY 2까지 진행한 클라우드 데이터: `abs(1-2) = 1 < 2`이므로 타임스탬프 최신 우선. 새 게임의 timestamp가 더 크므로 새 게임이 클라우드를 덮어써 기존 진행이 소실됨. `startNewCampaign` 후 day=1인 상태가 기존 day=2 데이터를 무조건 덮는 시나리오. | High |

---

## 5. Firestore 데이터 모델 검증

### PASS

| # | 항목 | 근거 |
|---|------|------|
| P10 | 게임 세이브 15KB vs 1MB 한도 | 현재 세이브 데이터는 CARDS 참조 없이 상태만 저장하므로 15KB 내외. 1MB 한도 대비 충분. |
| P11 | 보안 규칙의 `request.auth.uid == userId` | 타 사용자 접근 차단 정상. |

### ISSUE

| # | 항목 | 설명 | 심각도 |
|---|------|------|--------|
| I12 | **localStorage 키 수 불일치: 27개가 아닌 29개** | 설계는 27키라고 하지만 실제 코드에는 `ts_act2_reached`(app.js:244), `ts_observer_proto`(app.js:463 fullReset에서 삭제)가 추가로 존재. 이 2개 키의 클라우드 동기화 여부가 미정의. | Medium |
| I13 | **Firestore 보안 규칙 중복 allow 문제** | §8의 `saves/{saveId}` match에 두 개의 `allow write` 블록이 있음. Firestore 규칙은 어느 하나라도 true면 허용(OR 로직)이므로, 첫 번째 `allow write`(크기 제한 없음)가 통과하면 두 번째의 100KB/25키 제한이 무의미해짐. 하나의 `allow write`로 병합해야 함. | High |

### MISSING

| # | 항목 | 설명 |
|---|------|------|
| M5 | **`saves/current` 문서에 `version`, `timestamp`, `checksum` 필드 생성 로직** | §3.1에서 이 필드들이 명시되지만, `_uploadCurrent()` 구현부에서 어떻게 현재 localStorage 데이터에 이 메타필드를 추가하는지 구체적 코드가 없음. 특히 checksum 계산 알고리즘 미정의. |

---

## 6. 누락/위험 요소 식별

### ISSUE

| # | 항목 | 설명 | 심각도 |
|---|------|------|--------|
| I14 | **Firebase 무료 티어 쓰기 한도 근접** | §부록C에서 DAU 1000 시 15K 쓰기/일 추정 vs 무료 한도 20K. 마진이 25%밖에 안 됨. 슬롯 저장/삭제, fullSync 재시도 등을 포함하면 쉽게 초과 가능. debounce 5초로도 헤비 유저(세션당 30분, 카드 당 10초 = 180 persistGame) 1명이 36회 쓰기 발생. | Medium |
| I15 | **Compat SDK 사용에 따른 번들 크기** | firebase-app-compat + auth-compat + firestore-compat CDN 합계 약 300KB+ (gzip 전). 현재 게임이 static HTML로 빌드 없이 로딩되므로 초기 로드 시간 영향 큼. modular SDK(`firebase/app` tree-shaking)는 빌드 툴이 필요하므로 현 스택과 비호환이긴 하나 언급은 필요. | Low |
| I16 | **`_notifyChange`가 `Save.saveGame` 내부의 단일 `Save.set('ts_game', payload)` 호출만 감지** | `Save.saveLogs`, `Save.saveUsedDlg` 등은 각각 `Save.set`을 호출. persistGame 1회 호출에 `Save.set`은 1~2번(game + facility)만 발동하지만, 다른 경로(예: `Save.saveSeenArchive`, 업적 저장 등)에서의 변경은 별도 `_scheduleUpload` 없이 `_notifyChange`로만 의존. 이게 의도인지 불분명. | Low |

### MISSING

| # | 항목 | 설명 |
|---|------|------|
| M6 | **계정 삭제/연동 해제 시 Firestore 데이터 처리** | GDPR/개인정보보호법에 따라 사용자가 계정 삭제를 요청하면 Firestore의 `users/{uid}` 전체를 삭제해야 함. Firebase Auth 삭제 시 자동 삭제 안 됨 — Cloud Functions 또는 수동 삭제 프로세스 필요. |
| M7 | **Google 로그인 동의 화면 정보** | OAuth consent screen 설정(앱 이름, 개인정보처리방침 URL, 이용약관 URL) 미언급. Google은 프로덕션 배포 시 이를 요구하며, 없으면 "확인되지 않은 앱" 경고가 표시됨. |
| M8 | **`signInWithRedirect` 후 리다이렉트 결과 처리** | §4.3에서 Capacitor/TWA 분기를 언급하지만, `fbAuth.getRedirectResult()` 호출 코드가 없음. 리다이렉트 후 돌아왔을 때 결과를 수신하는 로직이 필요. (onAuthStateChanged가 커버하긴 하지만 에러 핸들링이 누락) |
| M9 | **멀티탭 동시 접근** | 같은 기기에서 여러 탭으로 게임을 열면 각 탭이 독립적으로 `_scheduleUpload`를 호출. 탭 간 localStorage는 공유되지만 CloudSync 상태는 비공유. `storage` 이벤트 또는 BroadcastChannel 기반 탭 간 조율 미고려. |

---

## 수정 제안

### Critical (즉시 수정 필요)

**1. `ts_game`에 timestamp 추가 (I1, I9)**

```javascript
// app-init.js — Save.saveGame 수정
saveGame: function(s, g, a, af, tr, cd, rc, ct, cq, pb) {
  var sessionDeck = (typeof getActiveSessionDeck === 'function') ? getActiveSessionDeck() : null;
  var payload = normalizeGameSave({
    stats: s, gi: g, act: a || 1, actFlags: af || {},
    transRoute: tr || '', cooldowns: cd || {}, recentCards: rc || [],
    ct: ct || 0, chainQueue: cq || [], pendingBonus: pb || null,
    sessionDeck: sessionDeck,
    timestamp: Date.now()  // ← 추가
  });
  Save.set('ts_game', cleanGameSaveMeta(payload));
}
```

그리고 `normalizeGameSave`, `cleanGameSaveMeta`에서 `timestamp` 필드를 보존하도록 확인 필요.

**2. 서버 타임스탬프 병용 (I10)**

```javascript
// cloud-sync.js — 업로드 시 서버 타임스탬프도 기록
_uploadCurrent: function() {
  var data = CloudSync._buildCurrentDoc();
  data.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
  data.clientTimestamp = Date.now();
  return fbDb.doc('users/' + CloudSync.user.uid + '/saves/current').set(data);
}
```

충돌 비교 시에는 `serverTimestamp`를 우선 사용하되, 오프라인 업로드분은 `clientTimestamp` 기반으로 fallback.

### High (구현 전 해결 필요)

**3. `_downloadToLocal` 시 Save.set 루프 방지 (I4)**

```javascript
// cloud-sync.js 내부에 플래그 추가
var _isDownloading = false;

_downloadToLocal: function(cloud) {
  _isDownloading = true;
  try {
    Save.set('ts_game', cloud.game);
    Save.set('ts_logs', cloud.logs);
    // ... 나머지 키들
  } finally {
    _isDownloading = false;
  }
}

// Save.set 훅 수정
_notifyChange: function(k) {
  if (_isDownloading) return;  // ← 다운로드 중 무시
  CloudSync._scheduleUpload();
}
```

**4. `loadSnapshot` 후 즉시 current 업로드 (I3, I7)**

```javascript
// app.js — loadSnapshot 끝에 추가
var loadSnapshot = function(slot) {
  var pack = Save.loadSnapshot(slot);
  if (!pack) { /* ... */ return; }
  // ... 기존 state 복원 로직 ...
  // [추가] 로드한 상태를 클라우드에 반영
  if (typeof CloudSync !== 'undefined' && CloudSync.user) {
    CloudSync._uploadCurrent();
  }
};
```

**5. 보안 규칙 병합 (I13)**

```javascript
match /users/{userId}/saves/{saveId} {
  allow read: if request.auth != null && request.auth.uid == userId
              && saveId in ['current', 'snap_1', 'snap_2', 'snap_3'];
  allow write: if request.auth != null
               && request.auth.uid == userId
               && saveId in ['current', 'snap_1', 'snap_2', 'snap_3']
               && request.resource.data.keys().size() <= 25
               && request.resource.size() < 100 * 1024;
}
```

**6. 새 게임 시작 시 클라우드 덮어쓰기 방지 (I11)**

```javascript
// startNewCampaign 내부 또는 clearGame 훅
if (typeof CloudSync !== 'undefined' && CloudSync.user) {
  // 새 게임 시작 시 current만 삭제하고 meta는 업데이트
  CloudSync._deleteCurrent();
  CloudSync._uploadMeta();  // endings, sessions 보존
}
```

그리고 `_fullSync`에서 로컬이 day=1이고 클라우드가 day>=2이면 무조건 충돌 다이얼로그를 표시하도록 추가 조건:

```javascript
if (localDay <= 1 && cloudDay >= 2) {
  return CloudSync._showConflictDialog(localDay, localTs, cloudDay, cloudTs);
}
```

### Medium (구현 중 해결)

**7. `doGO` 경로에 클라우드 훅 추가 (M1)**

```javascript
// app.js doGO 끝부분 (Save.clearGame() 이후)
if (typeof CloudSync !== 'undefined' && CloudSync.user) {
  CloudSync._deleteCurrent();
  CloudSync._uploadMeta();  // endings + sessions 업데이트
}
```

**8. `deleteSnapshot` 훅 추가 (M4)**

```javascript
// app-init.js Save.deleteSnapshot 수정
deleteSnapshot: function(slot) {
  Save.del('ts_snap_' + slot);
  if (typeof CloudSync !== 'undefined' && CloudSync.user) {
    CloudSync._deleteSnapshot(slot);
  }
}
```

**9. 누락된 localStorage 키 추가 (I12)**

부록 B에 다음 추가:

| localStorage 키 | Firestore 위치 | 동기화 시점 |
|---|---|---|
| `ts_act2_reached` | `saves/current.act2Reached` | persistGame |
| `ts_observer_proto` | `saves/current.observerProto` | persistGame |

또는 이들이 `ts_game.actFlags`에 통합 가능하면 리팩토링 권장.

**10. beforeunload 업로드 (M3)**

```javascript
window.addEventListener('beforeunload', function() {
  if (CloudSync.user && _uploadTimer) {
    clearTimeout(_uploadTimer);
    // sendBeacon으로 최소한의 데이터 전송 시도
    navigator.sendBeacon('/api/sync-beacon', JSON.stringify({
      uid: CloudSync.user.uid,
      game: Save.get('ts_game', null)
    }));
  }
});
```

단, GitHub Pages 정적 호스팅이므로 beacon 엔드포인트가 없음 → Firestore REST API 직접 호출 또는 이 제약을 문서화.

---

## 결론

설계의 전체 아키텍처와 "기존 코드 최소 변경" 원칙은 건전하나, **timestamp 부재(I1/I9)** 라는 치명적 전제 오류가 충돌 해결 로직 전체를 무력화합니다. 이 한 가지만 해결해도 나머지 이슈들은 순차적으로 대응 가능합니다.

구현 착수 전 필수 선행 조치:
1. `Save.saveGame`에 `timestamp: Date.now()` 필드 추가
2. 보안 규칙 OR 로직 수정
3. `_downloadToLocal` 루프 방지 설계 확정
4. `doGO` / `fullReset` 경로의 클라우드 동작 정의
