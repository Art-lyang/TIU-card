# TERMINAL SESSION — Android 앱 빌드 가이드 (Capacitor)

게임 전체가 **앱 안에 내장**된다. 공개 웹사이트·assetlinks·TWA 검증 전부 불필요.
앱 빌드에서는 클라우드 세이브가 자동 비활성(firebase-config 스텁) → **개인정보 수집 0**.

## 준비물 (최초 1회)
- [Android Studio](https://developer.android.com/studio) 설치 — 표준 설치면 SDK/JDK 자동 포함
- Node.js (이미 설치됨)

## 최초 빌드 절차
```bash
cd app-android
npm install            # Capacitor CLI/코어 설치
npm run sync:www       # 게임 파일 → www/ 구성 (스텁·트랩 적용)
npx cap add android    # android/ 네이티브 프로젝트 생성 (최초 1회만)
npx cap sync android   # www/ → 네이티브 프로젝트 반영
npx cap open android   # Android Studio로 열기
```

Android Studio에서:
1. 메뉴 **Build ▸ Generate Signed App Bundle / APK ▸ Android App Bundle**
2. **Create new keystore** — 파일은 리포 **밖** 안전한 곳에 저장, 비밀번호와 함께 **반드시 백업**
   (이후 모든 업데이트를 같은 키로 서명해야 함. 분실 시 앱 업데이트 불가)
3. release 선택 → 생성된 `app-release.aab`를 Play Console **내부 테스트** 트랙에 업로드

## 게임 업데이트 반영 (이후 매번)
```bash
cd app-android
npm run sync           # www 재구성 + cap sync
```
그다음 `android/app/build.gradle`의 `versionCode` +1 (versionName도 갱신 권장)
→ Android Studio에서 다시 Signed AAB 생성 → Play Console 업로드.

## 주의
- **경로 함정**: 리포 경로에 한글·공백이 있어 Gradle이 드물게 실패할 수 있음.
  그 경우 `app-android/` 폴더를 `C:\dev\tiu-app` 같은 단순 경로로 복사해 빌드하면 됨.
- `www/`·`node_modules/`·서명키는 gitignore 대상 — 커밋되지 않는 게 정상.
- 뒤로가기 제스처는 히스토리 트랩으로 즉시 종료를 막아둠(종료는 홈/최근앱으로).
- 웹 버전(GitHub Pages)과 앱은 저장소(localStorage) 원본이 달라 세이브가 공유되지 않음.
