# Android Google Login And Cloud Save Prep

> Target: TERMINAL SESSION / TIU-CARD full version  
> Date: 2026-05-28  
> Status: first-pass implementation added, Firebase project config pending  
> Scope: Android publishing preparation, Google login, cloud save continuity

## 1. Recommendation

Use Firebase Authentication with the Google provider plus Cloud Firestore for cloud saves.

This is the best fit for the current static HTML architecture because:

- The game already runs as a web app with React CDN and global scripts.
- The existing save layer is centralized enough around `Save.set/get/del`.
- The same cloud save can work on GitHub Pages, itch/demo if enabled, Android TWA, and any future web build.
- Android Play Games Saved Games is viable only for a native Android implementation or a WebView/TWA bridge, which adds more moving parts than this project currently needs.

Recommended Android wrapper:

- First choice: Trusted Web Activity (TWA) if the full game is hosted as a PWA-quality HTTPS web app.
- Second choice: native WebView shell only if offline bundled assets are required or if Play policy/product needs a fully packaged binary.

Confirmed product decision:

- Cloud save is for the full version only.
- The standalone demo does not load Firebase, does not expose Google login, and keeps its isolated local demo save behavior.
- The user-facing entry point is the existing Settings panel, inside the `SAVE` tab.
- Login is optional. The game remains playable and locally saveable without Google login.

Current implementation status:

- Root full version only: `index.html` loads `firebase-config.js` and `cloud-save.js` before `app-init.js`.
- `demo/` is intentionally untouched and does not load Google login or cloud save.
- `firebase-config.js` is a safe placeholder. Actual Firebase project values must be filled only for the full-version release package.
- `cloud-save.js` loads Firebase SDK from the official CDN only after valid config exists.
- Settings > SAVE now exposes Google connection, local upload, cloud restore, sign out, and cloud data deletion controls.
- `Save.set` / `Save.del` notify `CloudSave`, and `ts_game` now carries `timestamp` and `saveRevision`.
- Google sign-in now checks local/cloud save summaries and pauses on a conflict instead of silently overwriting either side.
- `tools/critical-audit.js` now verifies cloud-save load order, placeholder config safety, required CloudSave methods, i18n keys, and demo isolation.

Official references:

- Firebase Google sign-in for web: https://firebase.google.com/docs/auth/web/google-signin
- Firebase Auth web start: https://firebase.google.com/docs/auth/web/start
- Firestore per-user security rule pattern: https://firebase.google.com/docs/firestore/security/rules-conditions
- Android Trusted Web Activity overview: https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities
- Play Games Saved Games, native alternative: https://developer.android.com/games/pgs/android/saved-games

## 2. Current Local Save Surface

Primary save wrapper:

- `app-init.js`: `Save.set`, `Save.get`, `Save.del`
- `app-init.js`: `Save.saveGame`, `Save.clearGame`, `Save.saveLogs`, `Save.saveSnapshot`, `Save.loadSnapshot`
- `app.js`: `persistGame`, `saveSnapshot`, `loadSnapshot`, `doGO`, `fullReset`

Current important localStorage keys:

- Runtime current save: `ts_game`
- Logs/progression: `ts_logs`
- Ending/meta progression: `ts_endings`, `ts_sessions`, `ts_achievements`
- Relationship/UI state: `ts_trust`, `ts_usedDlg`, `ts_usedEvening`, `ts_seenArchive`
- Facilities/progression subsystems: `ts_facility`, `ts_combos`, `ts_evidence_used`, `ts_resourceReserveUsed`
- Replay/session systems: `ts_onceShown`, `ts_activeSpecs`, `ts_sessionDeck`, `ts_recentNews`, `ts_recentRewards`
- Resume checkpoints: `ts_activeMission`, `ts_resumePhase`, `ts_pendingBriefing`, `ts_resumeHeadlines`, `ts_resumeRewards`, `ts_resumeDialogueIndex`
- Manual slots: `ts_snap_1`, `ts_snap_2`, `ts_snap_3`
- Settings: `ts_muted`, `ts_volume`, `ts_fontSize`, `ts_fxMode`, `ts_locale`
- Special flags/prefixes: `ts_act2_reached`, `ts_observer_proto`, `ts_observer_proto_roll_*`

Important caveat:

- `ts_game` currently has no durable `timestamp` field. Manual snapshots have `timestamp`, but the current autosave does not. Cloud sync needs a save revision/timestamp added to `ts_game` or to a cloud wrapper document.

## 3. Cloud Data Model

Use one user document subtree:

```text
users/{uid}
  profile/meta
  saves/current
  saves/snap_1
  saves/snap_2
  saves/snap_3
  meta/progress
```

Suggested `saves/current` shape:

```javascript
{
  schemaVersion: 1,
  buildVersion: 240,
  saveRevision: 123,
  clientUpdatedAt: 1770000000000,
  serverUpdatedAt: serverTimestamp(),
  checksum: "sha256...",
  data: {
    ts_game: {},
    ts_logs: [],
    ts_trust: {},
    ts_usedDlg: [],
    ts_usedEvening: [],
    ts_seenArchive: [],
    ts_facility: {},
    ts_combos: [],
    ts_evidence_used: [],
    ts_resourceReserveUsed: false,
    ts_onceShown: [],
    ts_activeSpecs: [],
    ts_sessionDeck: null,
    ts_recentNews: [],
    ts_recentRewards: [],
    ts_activeMission: null,
    ts_resumePhase: "",
    ts_pendingBriefing: null,
    ts_resumeHeadlines: [],
    ts_resumeRewards: [],
    ts_resumeDialogueIndex: -1,
    ts_act2_reached: false,
    ts_observer_proto: null
  }
}
```

Suggested `meta/progress` shape:

```javascript
{
  schemaVersion: 1,
  buildVersion: 240,
  endings: [],
  sessions: 0,
  achievements: [],
  seenArchive: [],
  clientUpdatedAt: 1770000000000,
  serverUpdatedAt: serverTimestamp()
}
```

Current sync scope includes settings:

- Progress/game data: current run, logs, archive unlocks, endings, session count, trust, facilities, evidence, session decks, resume checkpoints, manual snapshot slots.
- User settings: `ts_locale`, `ts_volume`, `ts_sfxVol`, `ts_muted`, `ts_fontSize`, `ts_fxMode`.
- Reason: Android continuity should feel like the same terminal session after login. This can be narrowed later if settings sync feels intrusive.

## 4. Security Rules Baseline

Firestore rule principle: users may only read/write their own documents.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Before public launch, tighten writes:

- Limit document size by validating known fields.
- Require `schemaVersion` and `buildVersion`.
- Reject unexpected top-level fields.
- Consider Cloud Functions later for account deletion cleanup and save migration.

## 5. Implementation Files

Added:

- `firebase-config.js`
- `firebase-config.example.js`
- `cloud-save.js`

Updated:

- `index.html`: load config and cloud-save scripts before `app-init.js`.
- `app-init.js`: add timestamp/revision support and cloud sync hooks to `Save.set/del`.
- `components-settings-hotfix.js`: add a SAVE/CLOUD section for Google login, sync state, upload/download, sign out, and cloud deletion.
- `lang-ui-ko.js`, `lang-ui-en.js`: add cloud save UI strings.

Still recommended later:

- Live Firebase two-profile test after the production/staging project exists.
- Optional account deletion/legal flow polish after Android packaging decisions are final.

Full-version-only rule:

- Apply these file changes only to the root full-version build.
- Do not copy cloud-save scripts or Firebase SDK tags into `demo/index.html`.
- Do not sync demo localStorage keys into Firestore.

Do not put real private credentials in committed files. Firebase web config contains public project identifiers, but use `firebase-config.example.js` until the production project is created and the owner approves committing the actual config.

## 6. Script Load Order

Recommended order:

```html
<!-- Project config and cloud adapter -->
<script src="firebase-config.js?v=1"></script>
<script src="cloud-save.js?v=2"></script>

<!-- Existing app init must come after cloud-save -->
<script src="app-init.js?v=..."></script>
<script src="app.js?v=..."></script>
```

Reason:

- `CloudSave` must exist before `Save.set/get/del` hooks attempt to notify it.
- Firebase SDK files are dynamically loaded by `cloud-save.js` only when `firebase-config.js` contains a valid Firebase web app config.
- The game must still run if Firebase config is missing.

## 7. Sync Policy

Use local-first behavior:

- Local play must continue offline.
- Cloud upload is best-effort.
- Cloud failure must never block card play, evening progression, mission progression, or game over.

Events:

- On Google sign-in: compare local and cloud save.
- On `Save.set`: mark dirty and debounce upload.
- On manual snapshot save/delete: upload that slot immediately.
- On snapshot load: update local state, then upload current save immediately.
- On game over: upload `meta/progress`, delete or clear `saves/current`, preserve manual slots.
- On full reset: ask whether to clear local only or local plus cloud.

Conflict rule:

- If cloud is empty: upload local.
- If local is empty and cloud exists: offer restore from cloud.
- If both exist:
  - If one save has a higher `saveRevision`, prefer it.
  - If revisions are equal, prefer later `serverUpdatedAt`.
  - If uncertain, show a two-choice dialog: local save vs cloud save.

Minimum conflict dialog copy:

- KO: `클라우드 저장 데이터와 이 기기의 저장 데이터가 다릅니다. 이어갈 기록을 선택하십시오.`
- EN: `Cloud save and this device save are different. Select which record to continue.`

## 7.1 Settings SAVE Tab UX

Location:

- `components-settings-hotfix.js` is currently the effective settings override loaded after `components-settings-2.js`.
- Implement the first cloud-save UI inside `SettingsSaveTab` in `components-settings-hotfix.js`.
- Keep the top-level settings tabs unchanged: `SOUND / SAVE / DISPLAY / INFO`.

Section title:

- KO: `GOOGLE CLOUD SAVE`
- EN: `GOOGLE CLOUD SAVE`

Suggested rows:

- Status: disconnected / connected / sync pending / synced / error.
- Account: Google display name or email when signed in.
- Last sync: local formatted timestamp, if available.

Suggested buttons:

- `Google 로그인` / `Sign in with Google`
- `로그아웃` / `Sign out`
- `현재 기록 업로드` / `Upload this device save`
- `클라우드 기록 불러오기` / `Restore cloud save`
- `연동 해제` / `Unlink account`

Button behavior:

- Sign in: starts Firebase Google sign-in and then runs conflict detection.
- Upload: writes current local full-version save to Firestore.
- Restore: downloads cloud data and applies it through guarded local `Save.set` calls.
- Sign out: stops cloud sync, keeps local save.
- Unlink: asks whether to delete cloud data. Local save is preserved unless the player separately uses Delete All Data.

Display rules:

- If Firebase config is missing, show a muted line: `클라우드 세이브 설정이 아직 연결되지 않았습니다.`
- If offline, keep buttons visible but show pending/offline status.
- Do not show cloud controls in the demo build.
- Do not require login before starting or continuing a session.

## 8. Android Packaging Notes

TWA path:

- Requires HTTPS hosted game.
- Requires web manifest and service worker/PWA readiness.
- Requires Digital Asset Links between Android package and domain.
- TWA renders web content using the browser; it does not directly read app localStorage. Therefore Firebase web login/save is the right place for persistence.

WebView path:

- Easier to bundle assets offline.
- More custom native code.
- Google login inside WebView can be more fragile and may require native auth bridge depending on policy and UX.

Play Games Saved Games path:

- Native snapshots API is good for native Android games.
- For this static web game, it requires a Java/Kotlin bridge and a JS interface.
- Not recommended for first Android release unless achievements/leaderboards from Play Games are also a core requirement.

## 9. Firebase Console Checklist

Before implementation:

1. Create Firebase project, e.g. `tiu-card-prod`.
2. Add Web app.
3. Enable Authentication > Google provider.
4. Add authorized domains:
   - production web domain
   - GitHub Pages domain if used
   - localhost for development
5. Create Firestore database in production mode.
6. Apply owner-only user document rules.
7. Prepare privacy policy URL and terms URL before Play release.
8. Configure OAuth consent screen with app name, support email, privacy policy, terms.
9. Decide whether Firebase Analytics is enabled. For minimum privacy risk, cloud save can launch without Analytics.

## 10. First Implementation Pass

First implementation pass completed:

1. Add `firebase-config.example.js`.
2. Add `cloud-save.js` with no-op fallback if Firebase is unavailable.
3. Add `Save` hooks:
   - `Save.set` calls `CloudSave.markDirty(k)` after localStorage write.
   - `Save.del` calls `CloudSave.markDirty(k)` after localStorage delete.
   - Guard `CloudSave.isApplyingRemote` to prevent download/upload loops.
4. Add `ts_game.timestamp` and `ts_game.saveRevision`.
5. Add settings UI:
   - Google login
   - sync status
   - upload current device save
   - restore cloud save
   - sign out
   - delete cloud data

Still pending after Firebase project creation:

1. Validate with two browsers/profiles:
   - profile A plays and uploads
   - profile B signs in and restores
   - profile B advances one day
   - profile A returns and sees conflict/restore behavior
2. Confirm Play Console policy copy, privacy policy, and support/account deletion path.

## 11. Test Matrix

Core:

- No Firebase config: game still boots and saves locally.
- Offline: game saves locally, marks pending cloud sync.
- Sign-in popup/redirect succeeds on desktop Chrome.
- Mobile/Android path uses redirect, not popup.
- Cloud restore does not duplicate logs, archive unlocks, rewards, or session deck state.
- Manual slots 1-3 upload, download, overwrite, and delete correctly.
- Game over preserves ending/session meta but clears current run.
- Full reset can clear local-only or local+cloud.

Regression:

- `node tools/validator.js`
- `node tools/i18n-smoke.js`
- Save/load smoke: start game, play several cards, reload, continue.
- Snapshot smoke: save slot, change day/state, load slot, reload.
- Multi-session smoke: play after one game over, ensure endings/session count remain.

## 12. Open Decisions

Need owner decision before Android release:

- Firebase project name and account owner.
- Hosted full-game domain for Android/TWA.
- Whether Android uses TWA or WebView.
- Whether settings sync should remain included. Current implementation syncs settings.
- Whether account deletion is manual support flow for first release or automated with Cloud Functions.

Default recommendation:

- Full version only for first pass. Confirmed.
- Firebase Auth + Firestore.
- TWA for Android if hosted domain is stable.
- Local-first saves with explicit Google login, not mandatory login.
