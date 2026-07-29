---
title: 앱인토스(Apps in Toss) 입점 설계
type: design
status: draft-v1
updated: 2026-07-28
---

# TERMINAL SESSION — 앱인토스 입점 설계

> 본편(정적 HTML+React, 외부 의존 0)을 앱인토스 WebView 미니앱으로 포장한다.
> 원칙: **루트 게임 코드는 수정 최소화, 토스 전용 코드는 전부 이 폴더(`appintoss/`)에 격리.**
> 익스포트는 `tools/export-itch.mjs` 패턴을 따르는 `tools/export-appintoss.mjs`(신규)로 산출한다.

## 0. 콘솔 등록값 제안

| 항목 | 값 | 비고 |
|---|---|---|
| 어떤 앱? | "카드를 좌우로 밀어 AI 관리 시스템의 명령을 수행하는 한국 SF 카드 지휘 내러티브 게임" | 심사 사전확인용 한 줄 |
| 앱 이름 (10자) | `터미널 세션` | 6자. 표시명, 추후 수정 가능 |
| appName (고유 ID) | `tiu-terminal-session` | **수정 불가** — 확정 후 등록 |
| 앱 유형 | 게임 | 게임 필수 SDK 5종 적용 대상 |

## 1. 전략

- **1차: 데모 입점** — 심사·저장소·Safe Area 파이프라인 검증 + 유저 반응 데이터 확보.
- **2차: 본편 전환** — 데모 앱 그대로 업데이트하고 **비소모성 IAP '본편 인가 코드'**로 해금.
  (검증됨: 앱인토스는 비실물 재화에 인앱결제 IAP — 소모성/비소모성 — 를 지원. 본편 해금은 비소모성 1종이면 충분. 광고 IAA는 톤 훼손 위험이 커서 도입하지 않는다.)
- 기존 채널과 관계: itch = 글로벌/EN, 앱인토스 = 국내/KO 주력. 가격은 채널 간 동일 원칙.

## 2. 아키텍처

```
appintoss/
├── APPINTOSS-DESIGN.md      ← 이 문서
├── toss-bridge.js           ← SDK 래퍼 (로그인·저장소·게임센터·분석·IAP 전부 여기만)
├── toss-save-adapter.js     ← cloud-save.js의 Firebase 브리지 대체
└── config.js                ← TIU_TOSS_BUILD 플래그·상품 ID·리더보드 ID

tools/export-appintoss.mjs   ← 루트 게임 + appintoss/ 주입 + 번들 병합 산출 (신규)
```

- 루트 `index.html`은 건드리지 않는다. 익스포트 스크립트가 산출본에서
  ① `appintoss/*.js` 주입, ② `cloud-save.js` 로드 제외, ③ `TIU_TOSS_BUILD=true` 플래그 설정,
  ④ `app-android` 때 검증한 **JS 번들 병합**을 수행한다 (171파일 → 소수 번들, 첫 화면 10초 요건 여유 확보).
- 게임 코드 분기는 전역 플래그 `window.TIU_TOSS_BUILD` 하나만 본다.

## 3. 게임 필수 SDK 5종 매핑

### 3.1 게임 로그인 — `getUserKeyForGame`
- 부트 시 유저키 취득 → `toss-bridge.js`가 보관.
- 세이브 키는 기존 이름 유지(로컬 캐시), **네이티브 저장소 미러 시에만 유저키 네임스페이스** 부여.
  기기 공유 계정 충돌은 토스 로그인 단에서 이미 격리되므로 추가 처리 없음.

### 3.2 네이티브 저장소 — `toss-save-adapter.js`
`cloud-save.js`가 이미 완성해 둔 구조를 그대로 재사용한다:
- **감시 키 목록**(CURRENT_KEYS / SNAP_KEYS / PROGRESS_KEYS / SETTINGS_KEYS / WATCH_PREFIXES)을 임포트 수준으로 복제.
- 쓰기: localStorage 변경 감지 → 디바운스 후 네이티브 저장소에 미러 (기존 41곳 호출부 무수정).
- 복원: 부트 시 네이티브 → localStorage 선복원 후 게임 초기화 (기존 클라우드 복원 시퀀스와 동일. `app-init.js:311` 클램프 방어 로직이 이미 로드 입력을 검증함).
- 충돌 정책: 네이티브 우선(재설치·기기변경 대응). 로컬이 더 최신 day면 로컬 유지 — day 점프 가드(`app.js:329`)와 일관.

### 3.3 게임센터(리더보드) — "ORACLE 평가"
게임에 랭킹 요소가 없으므로 세계관 톤으로 신설:
- 점수 1종: **누적 관리 일수**(전 회차 생존 day 합산, `ts_sessions` 기반) — 단순·조작 저항·회차 플레이 촉진.
- 표기: "ORACLE 평가 — 관측 지속 일수". 엔딩 스포일러 없는 지표라 안전.
- 제출 시점: 회차 종료(엔딩/게임오버) 1회.

### 3.4 Safe Area
- 기반 있음(`viewport-fit=cover`, `safe-area-inset` 13곳). 스윕 대상 전 화면:
  메인 메뉴 / 카드 화면 / 브리핑 / 이브닝 챗 / 현장임무·미니게임 / CCTV 스팅 / 엔딩 시네마틱(모바일 BUILD 484) / 아카이브·로그 뷰어 / 설정.
- 기준: 상단 노치·하단 제스처바에 **터치 타겟과 텍스트가 겹치지 않을 것** (심사 반려 1순위).

### 3.5 행동 분석
최소 이벤트 셋(추후 확장):
`session_start`, `day_reached(act, day)`, `mission_enter(id)`, `ending_reached(type)`,
`demo_gate_shown`, `iap_unlock_shown`, `iap_unlock_done`.

## 4. 결제 설계 (본편 전환 시)

- 상품: 비소모성 1종 `full_version_unlock` ("본편 인가 코드").
- 게이트: 기존 **itch 데모 게이트**(BUILD 429) 로직 재사용 — 도달 지점 동일, 결제 성공 시 게이트 해제 플래그를 네이티브 저장소에 기록(복원 대상).
- **itch 유도 버튼 분기 필수**: `components-briefing.js:243`의 `window.open(itch)` 버튼은
  `TIU_TOSS_BUILD`에서 IAP 해금 버튼으로 교체한다. (타 플랫폼 결제 유도는 심사 리스크)
- 수수료율은 공개 문서에서 미확인 — 콘솔 계약 단계에서 확인 후 가격 확정.

## 5. 심사 체크리스트

- [ ] 첫 화면 10초 이내 (번들 병합 + 에셋 지연 로드 유지, 초기 페이로드 3.2MB 기준)
- [ ] Safe Area 전 화면 스윕 (§3.4 목록)
- [ ] 외부 링크/타 플랫폼 결제 유도 제거 (`TIU_TOSS_BUILD` 분기 확인)
- [ ] BGM 자동재생 정책 — 사용자 제스처 후 재생 확인 (토스 WebView 실기기)
- [ ] 세로 고정 (가로모드 CSS 없음 — 콘솔 orientation 설정으로 잠금)
- [ ] cloud-save.js(Firebase·gstatic 외부 로드) 산출본에서 제외 확인
- [ ] 콘텐츠 수위: 공포·유혈 텍스트 등급 기준 확인 (RF-Ω 등 호러 콘텐츠 포함 여부 결정)
- [ ] 필수 5종 SDK 동작 (로그인/저장소/게임센터/Safe Area/분석)

## 6. 마일스톤

1. **M1 — 스캐폴드**: `toss-bridge.js`(SDK 래퍼) + `config.js` + `tools/export-appintoss.mjs` 골격, 콘솔 앱 등록(appName 확정).
2. **M2 — 저장소/로그인**: `toss-save-adapter.js` 구현 + 복원 시퀀스 실기기 검증.
3. **M3 — 심사 대비**: Safe Area 스윕, itch 버튼 분기, 분석 이벤트, 데모 심사 제출.
4. **M4 — 본편**: IAP `full_version_unlock` + 게임센터 연동, 본편 심사.

## 7. QA 연동

- 산출본은 `node tools/validator.js` 통과 상태의 루트를 입력으로만 사용 (데이터 무수정 원칙).
- 익스포트 후 스모크: `regression-bug-hunter` 패턴으로 산출본 dev 서버 구동 → 부트·카드 루프·세이브 복원 확인.
- 커밋 전 `integrity-verifier` 통과 (기존 규칙 동일).
