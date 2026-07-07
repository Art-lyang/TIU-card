# TERMINAL SESSION — Android 앱 빌드 가이드 (Capacitor)

게임 전체가 **앱 안에 내장**된다. 공개 웹사이트·assetlinks·TWA 검증 전부 불필요.
앱 빌드에서는 클라우드 세이브가 자동 비활성(firebase-config 스텁) → **개인정보 수집 0**.

## 검증된 요구사항 (2026-07-07 실빌드 확인)
- **JDK 21** — Capacitor 7 네이티브 모듈이 source release 21 요구 (17로는 실패).
  `C:\dev\jdk-21` 에 두면 빌드 스크립트가 자동 사용.
- Android SDK — `%LOCALAPPDATA%\Android\Sdk` (라이선스 동의돼 있으면 부족분 자동 다운로드)
- Node.js
- ⚠️ **이 리포 경로(한글·공백)에서는 Gradle 직접 실행 불가** — AGP가 non-ASCII 경로 거부.
  반드시 아래 `build-win.ps1`(자동 미러) 경유로 빌드할 것.

## 빌드 (검증된 원커맨드)
```powershell
cd app-android
npm install          # 최초 1회
npm run sync:www     # 게임 파일 → www/ (루트 게임 수정 시마다)
npx cap sync android # www/ → 네이티브 assets 반영
.\build-win.ps1                  # 디버그 APK (기기 테스트용)
.\build-win.ps1 bundleRelease    # 릴리즈 AAB (서명 설정 후)
```
`build-win.ps1` 은 `C:\dev\tiu-app` 으로 미러링한 뒤 그곳에서 Gradle을 돌린다.
산출물: `C:\dev\tiu-app\android\app\build\outputs\` (apk\debug / bundle\release)

## 릴리즈 서명 (Play 업로드 전 1회 설정)
방법 A — Android Studio(최신판) GUI: 프로젝트 열고 **Build ▸ Generate Signed App Bundle**
방법 B — 커맨드라인: `keytool` 로 keystore 생성 후 `android/app/build.gradle` 에 signingConfig 연결
어느 쪽이든 keystore 는 **리포 밖 안전한 곳 + 백업 필수** (분실 시 앱 업데이트 영구 불가).

## 게임 업데이트 반영 (이후 매번)
1. 루트에서 게임 수정 (validator/stamp-cache 통과)
2. `npm run sync:www && npx cap sync android`
3. `android/app/build.gradle` 의 `versionCode` +1 (versionName 도 갱신 권장)
4. `.\build-win.ps1 bundleRelease` → Play Console 업로드

## 빌드 중 겪은 함정 기록 (재발 방지)
| 증상 | 원인 | 해결 |
|---|---|---|
| "non-ASCII characters" 거부 | 리포 한글 경로 | build-win.ps1 미러 빌드 |
| IOException 잘못된 볼륨 레이블 | local.properties 백슬래시 이스케이프 | `sdk.dir=C:/...` 슬래시 표기 |
| capacitor-android 변형 없음 | 미러에서 node_modules 제외했었음 | node_modules 포함 미러 |
| invalid source release: 21 | JDK 17 사용 | JDK 21 (`C:\dev\jdk-21`) |
| ic_launcher_background not found | @capacitor/assets 어댑티브 아이콘 quirk | 배경을 `@color/` 참조로 수정 |

## 기타
- `www/`·`node_modules/`·`local.properties`·서명키는 gitignore 대상.
- 뒤로가기 제스처는 히스토리 트랩으로 즉시 종료를 막아둠(종료는 홈/최근앱).
- 웹 버전(GitHub Pages)과 앱은 저장소 원본이 달라 세이브가 공유되지 않음.
