# TWA 릴리즈 가이드 — 플레이스토어 (안드로이드)

> 이 리포는 이제 TWA(Trusted Web Activity) 준비물이 갖춰진 상태다.
> 남은 것은 PC에서 앱 패키징(Bubblewrap)과 Play Console 등록뿐이다.

## 이미 갖춰진 것 (이 리포)

| 항목 | 파일 | 비고 |
|---|---|---|
| React 로컬 번들 | `vendor/react*.js` | cdnjs 의존 제거 — CDN 장애/오프라인에도 부팅 |
| 폰트 셀프호스트 | `fonts/fonts.css` + `fonts/files/` | Google Fonts 의존 제거 (woff2 249개) |
| 웹 앱 매니페스트 | `manifest.json` | 이름/아이콘/세로 고정/테마색 |
| 런처 아이콘 | `icons/icon-{192,512}.png`, maskable | ORACLE 엠블럼 크롭. 마음에 안 들면 교체만 |
| 서비스워커 | `sw.js` (root 전용, demo 미등록) | 오프라인 부팅 + 캐시. BUILD_VER 로 자동 무효화 |
| Digital Asset Links | `.well-known/assetlinks.json` | **플레이스홀더 — 아래 3단계에서 채울 것** |

## PC 에서 할 일

### 1. Bubblewrap 으로 패키징

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://art-lyang.github.io/TIU-card/manifest.json
# 물어보는 것들:
#   Application ID → 예: io.github.artlyang.tiu  (한번 정하면 영구 고정, 신중히)
#   서명 키 → 새로 생성 (키스토어 파일과 비밀번호를 안전한 곳에 백업. 분실 = 업데이트 불가)
bubblewrap build   # → app-release-signed.apk / .aab 생성
```

### 2. Play Console 등록

1. 개발자 계정($25, 1회) → 앱 만들기 → `.aab` 업로드 (내부 테스트 트랙부터 권장)
2. **Play App Signing 사용** (기본값) — Google 이 서명을 관리
3. 콘텐츠 등급 설문(IARC) 작성 → 한국 GRAC 등급도 이걸로 자동 부여됨. **게임위 별도 심의 불필요**
   - 단, 설문 결과가 "청소년이용불가" 급이면 그때만 게임위 직접 심의 대상 (이 게임은 해당 없을 것)
4. 데이터 안전 섹션: Firebase 로그인/클라우드 세이브 쓰므로 "계정 정보 수집" 항목 정직하게 체크

### 3. assetlinks.json 채우기 (주소창 없애는 핵심)

Play Console → 설정 → 앱 무결성 → **앱 서명 키 인증서의 SHA-256** 복사 →
`.well-known/assetlinks.json` 의 두 플레이스홀더 교체:

```json
"package_name": "io.github.artlyang.tiu",
"sha256_cert_fingerprints": ["AA:BB:CC:...실제 지문..."]
```

푸시 → GitHub Pages 반영 후 https://art-lyang.github.io/TIU-card/.well-known/assetlinks.json 접속 확인.
지문이 맞으면 앱 상단 주소창(커스텀 탭 UI)이 사라지고 풀스크린 앱이 된다.

> 주의: Play App Signing 을 쓰면 **Google 의 서명 키 지문**(업로드 키 아님)을 넣어야 한다.
> 내부 테스트에서 주소창이 보이면 십중팔구 지문 불일치.

## 캐시/배포 주의

- 서비스워커 캐시는 `sw.js?v=N` 의 N(BUILD_VER)으로 키가 잡힌다.
  **배포 전 `node tools/stamp-cache.js` 실행이 곧 캐시 무효화**다 (기존 규칙 그대로).
- demo/ 에는 SW 를 등록하지 않는다 (데모는 항상 최신 상태 확인용).

## 한국 심의 요약 (플랫폼별)

| 플랫폼 | 심의 | 비고 |
|---|---|---|
| Google Play | **별도 심의 불필요** | 자체등급분류사업자 — IARC 설문으로 GRAC 등급 자동 부여 (청불 제외) |
| Steam | **등급분류 필요** | 자체등급분류사업자 아님. 게임콘텐츠등급분류위원회(GCRB) 신청 (PC게임, 청불 아니면 GCRB 관할) |
| itch.io (유료) | **법적으로는 필요** | 자체등급분류사업자 아님. 한국어 게임을 한국 유저에게 유료 판매 시 등급분류 의무 대상. 집행이 느슨했으나 차단 사례 존재 — 출시 시점에 최신 동향 확인 권장 |
