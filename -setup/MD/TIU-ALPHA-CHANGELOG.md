# TIU-CARD — Alpha 마일스톤 체인지로그

> 최신 스냅샷: **2026-04-24** (BUILD_VER=60)
> 이전 스냅샷: 2026-04-23 (BUILD_VER=54) / 2026-04-20 (2차, BUILD_VER=22) / 2026-04-20 (1차, BUILD_VER=21) / 2026-04-19
> 브랜치: `main` (origin/main 동기화 완료)
> 대상 빌드: **TIU-Alpha → v1.0 출시 준비**
> 대응 GDD: `-setup/GDD/TIU-GAME-GDD-v10.md`

---

## 2026-04-24 스냅샷 (BUILD_VER 54 → 60) — 필드 미니게임 프로덕션 통합 + 결과 서사 다국어화 + 아카이브 언락 교정

> 주 푸시 커밋: `cbead05` *"Add minigame prototypes and improve English i18n support"* (BUILD_VER 54 → 59)
> 후속 복구 커밋: ScenarioHub 한국어 리터럴 복구 (BUILD_VER 59 → 60, `components-game.js?v=23→24`)
> 보조 핫픽스 (2026-04-23 말): `7d67294` `1a89a4f` `04ae5b8` `eb6b94d` `b9a6a68` `f102261` `b17270b` `bcd00d7` `f985def` `25aed56`

### 🎮 필드 미션 미니게임 시스템 프로덕션 통합 (`cbead05`)

이전까지 `TEST/minigame-demo.js` 내 프로토타입이었던 3종 미니게임이 index.html 로드 경로에 진입하여 실제 미션 런타임과 연결됨. `TEST/` 디렉토리에는 984줄 데모 + 스크린샷 14장 + 정적 에셋 4종이 레퍼런스로 함께 커밋됨.

- **신규 `components-minigames.js` (429줄)**: 3종 React 미니게임 + `MiniPanel` 오버레이 + `mergeMissionBonus()` 보상 합성 + locale 분기 헬퍼
  - **`signal` — SPEC-011 음향 패턴 정렬**: 자동 왕복 커서를 황색 안정 구간에서 정지. 밴드 안쪽 0.03 범위는 great, 밴드 내는 success, 바깥은 partial/fail
  - **`sequence` — 격리 봉인 수동 시퀀스**: 패널 지시문 순서대로 봉인 버튼 입력. 자동 루틴의 빈틈을 메움
  - **`breach` — ORACLE 권한 흔적 추적**: 인접 노드만 따라 이동하며 KEY 수집 후 EXIT. 붉은 노드는 노출도 상승
- **신규 `data-minigame-rewards.js` (350줄)**: `FIELD_MINIGAME_CONFIGS` + `FIELD_MINIGAME_REWARDS` + `FIELD_MINIGAME_NARRATIVES` 전역 테이블
  - **M-002 쉘토커 작전**: `analyze` 노드에서 `signal_scan` (signal) 호출. great 보상 `{o:+1}` + 로그 `LOG-MG-011-AUDIO`/`LOG-MG-DLG-SEJIN-SIGNAL`, fail 패널티 `{t:-1}`
  - **MI-01 EV-Σ 봉쇄 시퀀스**: `shield`/`seal`/`oracle` 3 노드 공통 `seal_sequence` (sequence). great `{c:+1, o:+1}`, fail `{c:-1, r:-1}`
  - **MI-04 보안구역 인증 오류**: `remove`/`trap`/`oracle` 3 노드 공통 `authority_trace` (breach). great `{o:+1, t:+1}`, fail `{o:-1, t:-1}`
  - 결과 4랭크별(great/success/partial/fail) 전용 `textSuffix` 서사 + `endLabel` 종료 태그 — 엘리미네이트/캡처/어널라이즈 등 서브 선택지별로 세분화된 문구 저장
- **신규 `components-fieldmission-minigame-patch.js` (167줄)**: 기존 `FieldMission` 컴포넌트 패치 버전. `localizeMissionNode()`에서 `tc()` 언어팩 + `FIELD_MISSION_NODE_OVERRIDES` 정적 오버라이드 + 미니게임 결과 `missionNarrative` 3단 병합. 선택 시 `getFieldMiniGameConfig()` 조회 후 활성 미니게임 큐잉 → 결과 수신 시 `mergeMissionBonus()`로 원래 선택 보상에 합산
- **MI-04 본문 조정** (`data-missions-incident.js`): "두 가지 선택지가 있습니다" → "세 가지 선택지가 있습니다" — 실제 노드 수(remove/trap/oracle)와 본문 일치
- **로드 위치** (index.html BUILD_VER=60):
  - `data-minigame-rewards.js?v=1` — `data-archive.js` 바로 뒤
  - `components-minigames.js?v=1` — `components-game.js?v=24` 바로 뒤
  - `components-fieldmission-minigame-patch.js?v=1` — `components-escape.js?v=5` 뒤 (FieldMission 오버라이드)

### 📚 아카이브 공개 조건 타이트닝 (`data-archive.js`)

지나치게 이른 스포일러를 막기 위해 핵심 엔트리 언락 조건을 실제 인트로/사건 로그 기반으로 교체:

| 엔트리 | 이전 조건 | 변경 조건 | 의도 |
|---|---|---|---|
| `ARC-EVS` (EV-Σ 진화 가속 매개체) | `LOG-001` | `LOG-013` | 첫 사건 직후가 아닌 EV-Σ 존재가 드러난 시점 |
| `ARC-CHAR-DOYUN/HAEUN/SEJIN/JAEHYUK` (4 인물) | `true` (무조건) | `LOG-INTRO-KD/SH/YS/IJ` | 각 인물 인트로 대화 완료 후 공개 |
| `ARC-ORG-ORACLE` | `LOG-001` | `LOG-006` \|\| `LOG-INTRO-SH` | 서하은 인트로에서 ORACLE 이상 감지 시점 |
| `ARC-ORG-BRANCH` (KR-INIT-001) | `LOG-001` | `LOG-001` && `LOG-INTRO-KD` | 강도윤 인트로로 현장 시점 확보 후 |
| `ARC-ORG-WHITESHIELD` | `LOG-001` | `LOG-016` | 군 대응 체계 언급 로그 기준 |
| `ARC-FAC-SEAL` (봉쇄선) | `LOG-001` | `LOG-070` \|\| `LOG-073` | 봉쇄선 관련 실제 사건 로그 |
| `ARC-FAC-LAB` (연구실) | `true` | `LOG-INTRO-YS` | 윤세진 인트로 후 |

### 💬 결과 토스트 서사 재작성 (`data-result-text.js`, +252줄)

- 기존 "자동 생성 폴백 함수" 방식 → `_rtLocale()` / `_rtPool(ko, en)` 기반 한·영 이중 풀
- 4스탯(c/r/t/o) × 긍정/부정 방향 × 한/영 각 4문장 풀 구조. `RESULT_TEXT` 생성 시 로케일 즉시 반영
- 버전 `v=12 → v=13`

### 🌐 i18n 이월 수정 (`cbead05` + 보조 핫픽스)

- **MainMenu/ScenarioHub 하드코딩 영어 제거** (`components-game.js`):
  - ScenarioHub 메인 뷰에 `isKo` locale 분기 적용 — "MISSION: KOREAN BRANCH STABILIZATION" / "ORACLE KOREA BRANCH / GANGWON SECTOR" / "ACCESS: MAIN CAMPAIGN" 등 한국어 대응 확보
  - ⚠️ **`cbead05` 시점 한국어 리터럴 손상**: 편집 환경 인코딩 문제로 ko 쪽 문자열이 전부 `?`로 저장됨 (기본 locale인 ko 사용자에게 `?? ?? ??` 노출). 2026-04-24 후속 복구 커밋에서 기획 원문으로 L57·L64~80 수동 복원 — 브랜드 네임(KOREAN BRANCH OPERATION / STABILIZATION / TERMINAL SESSION / ZONE / STATUS / THREAT INDEX / ACCESS) 7개 라벨은 **영문 고정**으로 전환(`isKo` 분기 제거), 미션명 라벨은 ko="오라클 한국지부 안정화", 섹터 라벨은 ko="강원도 오라클 한국지부", 메뉴 4종(hub.continue/newGame/start/replayTutorial/backToSelect)은 `[이어하기] [새게임] [게임시작] [튜토리얼 다시하기] ← 뒤로가기`로 복원. 영어 쪽 `←` 화살표도 동일 인코딩 사고로 `?`였던 것 복원
  - MainMenu 구조 개편: `records` 서브뷰 제거 → **세션 선택 / 이어하기 / 아카이브 / 로그 / SETTINGS** 를 메인 메뉴에 직접 나열. SettingsPanel에 `onMainMenu` 콜백 추가
  - 토큰 추가: `menu.startGame`, `menu.continue`, `boot.startGame` (기존 `boot.startSession` 교체)
- **일일 보고/뉴스 토큰 보강** (`lang-ui-ko.js` +28): `archiveNew`, `header`, `dayReport`, `sectionStatus/Situation/Intel/Facility`, `assess.high1~veryLow4` 16개 평가 라인, `headlineWarn3` (GRANT EXPIRED 경고) 등
- **이브닝챗 영어 해석기** (`components-evening.js` +183): `resolveEveningBucketEntry()` — `responseKey` 우선, 없으면 `en.content[bucket]`에서 `{char}_{act}_` 접두어 + `day` 범위 best-match 스캔. 엄밀 매칭 실패 시에도 영어 풀에서 day 포함 최적 항목을 폴백 선택
- **설정 패널 핫픽스 확장** (`components-settings-hotfix.js` `7d67294`): 패널 닫힘(`eb6b94d`) + 저장(`f985def`) 양쪽 시점에 `applyLocale()` 보장, 저장 토스트 자체도 현재 로케일로 번역
- **스타일 핫픽스**: `style-i18n-hotfix.css` (`bcd00d7`, 게이지/모바일 선택지 버튼), `style-i18n-locale-hotfix.css` (`f102261`, `lang=en` 속성 한정 오버라이드). index.html에서 두 파일 모두 `b9a6a68`/`b17270b`로 로드 경로 추가
- **status gauge 컬럼 정렬 단순화** (`04ae5b8`, `style.css` 45 → 8줄): 영어 레이아웃에서 컬럼 과다 hack 제거

### 🖼️ 이미지 에셋 레지스트리 확장 (`cbead05`)

`assets/images/` 하위에 실제 jpg 대량 추가. 레지스트리 모듈 (`images.js` +48, `images_bg.js` +24, `images_cards.js` +20, `images_hub.js` +6)에 핸들 등록:

- **backgrounds 14종**: `bg_base`, `bg_command`, `bg_comms`, `bg_corridor`, `bg_forest`/`bg_forest2`, `bg_lab`, `bg_oracle`, `bg_restricted`, `bg_seoul_a`/`bg_seoul_b`, `bg_shield_off`/`bg_shield_on`, `bg_supply`, `bg_weather`, `title_screen`
- **cards 10종**: `card_admin_lock`, `card_flood`, `card_haeun_usb`, `card_oracle_error`, `card_shelltalker_lure`, `card_signal_overlap`, `card_supply_regular`, `card_village_elder`, `card_water_contaminate`, `card_water_damage`
- **characters 10종**: `char_doyun`, `char_foster`, `char_haeun`/`char_haeun_tense`, `char_jaehyuk`/`char_jaehyuk_sad`, `char_jungchul`, `char_sejin`, `char_soyoung`/`char_soyoung_shadow`, `char_weber`
- **specs 7종**: `spec_001_mannequin`, `spec_003_brood`, `spec_004_seedspreader`, `spec_008_spore`, `spec_011_shelltalker`, `spec_012_bloodpit`, `spec_015_brainseeker` — FieldMission `getMissionImage()`에서 M-001/M-002/M-004/M-005/M-006/M-009/M-010 미션과 연결
- **hub 3종**: `hub_main`, `hub_dlc_green`, `hub_dlc_north` (기존에도 등록되어 있었으나 이번에 이미지 본체 포함)

### 📁 신규 / 변경 파일 (추적 기준)

| 종류 | 파일 | 비고 |
|---|---|---|
| 신규 | `components-minigames.js` | 3종 필드 미니게임 컴포넌트 |
| 신규 | `data-minigame-rewards.js` | 미션 미니게임 설정/보상/서사 |
| 신규 | `components-fieldmission-minigame-patch.js` | FieldMission 오버라이드 |
| 신규 | `TEST/minigame-demo.js` / `TEST/index.html` / `TEST/styles.css` | 프로토타입 레퍼런스 |
| 수정 | `data-result-text.js` | 한·영 풀 재작성, `v12→v13` |
| 수정 | `data-archive.js` | 인물/시설/조직 11개 언락 조건 |
| 수정 | `data-missions-incident.js` | MI-04 본문 "세 가지 선택지" |
| 수정 | `components-game.js` (+397) | MainMenu 평탄화, ScenarioHub i18n, Boot 토큰 |
| 수정 | `components-evening.js` (+183) | `resolveEveningBucketEntry` day 기반 best-match |
| 수정 | `lang-ui-ko.js` / `lang-ui-en.js` | `menu.*`, `assess.*`, 섹션 라벨 |
| 수정 | `index.html` | BUILD_VER=**60**, 미니게임 3종 로드, `components-game.js?v=24` |
| 수정 | `style.css` | gauge 컬럼 정렬 단순화 |
| 수정 | `components-settings-2.js` / `components-settings-hotfix.js` | locale 지연 적용 로직 |
| 신규 | `style-i18n-hotfix.css` / `style-i18n-locale-hotfix.css` | 영어 전용 레이아웃 핫픽스 |

### ⚠️ 이월 과제 / 주의

- `components-fieldmission-minigame-patch.js`는 **기존 `FieldMission`을 재정의하는 패치 파일**. 로드 순서가 바뀌면 패치가 먼저 덮이고 원본이 나중에 로드되어 복구되므로, index.html 로드 순서(현재 `components-escape.js` 뒤) 고정 필수
- 미니게임 통합은 현재 **M-002 / MI-01 / MI-04 3개 미션만** 대상. 나머지 미션은 `FIELD_MINIGAME_CONFIGS`에 엔트리가 없어 기존 플로우(선택 즉시 `end` 노드) 그대로
- `LOG-MG-011-AUDIO` / `LOG-MG-INC-01-SEAL` / `LOG-MG-INC-04-TRACE` / `LOG-MG-DLG-SEJIN-SIGNAL` / `LOG-MG-DLG-JAEHYUK-SEAL` / `LOG-MG-DLG-HAEUN-TRACE` 6종 미니게임 전용 로그가 `data-minigame-rewards.js`에서만 참조됨 — 아카이브/로그 뷰어에서의 노출 문구는 후속 작업 필요
- `TEST/` 디렉토리(스크린샷 포함 약 8MB)는 참조 목적 커밋. 최종 빌드 번들에서 제외 여부 판단 필요

---

## 2026-04-23 스냅샷 (BUILD_VER 22 → 54) — i18n 도입 + MainMenu/ScenarioHub 플로우 개편

### 🌐 i18n 시스템 본격 도입 (커밋 `0429de2` → `f46f19b` → `0d571cd` → `99091ad` → `b818119` → `82d7461` → `d163825` → `b189436` → `7d67294`)

- **런타임 코어 신규**: `i18n-runtime.js` — locale 변수 + `t()` / `tt()` / `tc()` 헬퍼 + `ts-locale-changed` broadcast 이벤트 (커밋 `82d7461`에서 refresh/broadcast 수정)
- **UI 언어팩 2종**: `lang-ui-ko.js` (한국어 기본), `lang-ui-en.js` (영어). 설정 > 디스플레이 탭에 언어 토글 추가
- **콘텐츠 영어 오버레이**: `lang-content-en-all.js` (207KB, 18개 phase overlay 통합) + `lang-content-en-dialogues.js` (통신 대화)
- **렌더러 통합 범위 (Phase 1~3)**:
  - Phase 1 (`0429de2`): `components-settings.js` 언어 토글, 런타임 인프라
  - Phase 2 (`0d571cd`): `CardC` (msg/leftLabel/rightLabel `tc()` 오버레이), Boot/Stats/GameOver/Tutorial/ScenarioHub `tt()` UI 문자열, App info bar (ACT/MIS/facility/evidence 태그)
  - Phase 3 (`f46f19b`): `components-evening.js`(챗 라인 + 응답), `components-dialogue.js`(스탯명/선택 태그/LOG 뷰어), `components-endings.js`(엔딩명/힌트/갤러리), `components-briefing.js`(브리핑 텍스트), `components.js`(미션 노드/선택, 신뢰도 라벨)
- **status tag / briefing 본문 현지화**: `data-status-tags.js` (241줄 → 구조 재편, `99091ad` + `b818119`)
- **영어 전용 레이아웃 핫픽스**: `style-i18n-hotfix.css` (게이지/모바일 선택지 버튼), `style-i18n-locale-hotfix.css` (영어 로케일 한정 오버라이드, `lang=en` 속성 기반)
- **설정 패널 언어 지연 적용**: `components-settings.js`에서 토글은 즉시 저장하되, 패널 닫힘(`eb6b94d`) 또는 저장(`f985def`, `7d67294`) 시점에 `applyLocale()` 호출 → 설정 중 UI 재렌더 혼선 방지
- **하드코딩 한국어 잔여 제거** (`b189436`):
  - Card header (`ORACLE 통신`, `시설 확장`), priority 라벨(상/중/하), 뉴스 스탯 바, 보상/경고 텍스트, News "다음 사이클" 버튼
  - gauge-label CSS `width:26px → min-width:26px max-width:80px` + ellipsis (영어 라벨 잘림 방지)
  - status gauge 컬럼 정렬 단순화 (`04ae5b8`, style.css 45줄 → 8줄)

### 🎬 플로우 개편: Boot → MainMenu → ScenarioHub (커밋 `8f50656`, `11c5708`, `313feb5`)

- **ScenarioHub 신규** (`8f50656`): Boot 완료 후 DLC 테마 선택기. 스와이프 + 화살표 + 숫자키. 3 슬롯:
  - `main` (TERMINAL SESSION, 한국 지부, active)
  - `dlc_green` (GREEN THRESHOLD, 아프리카 소바리 폐허 / EV-Σ 잔류, locked)
  - `dlc_north` (NORTHERN FRONT, 러시아 북극권 / SITE-7/13 신호 차단, locked)
- **MainMenu 삽입** (`11c5708`): Boot → **MainMenu** → ScenarioHub. 타이틀 이미지 + 세션 선택 / SETTINGS / RECORDS(logs/archive/endings) 3버튼. 게임 시작 전에도 설정(언어/디스플레이/사운드) 접근 가능
- **ScenarioHub back-to-menu 링크** (`11c5708`): 허브에서 MainMenu로 복귀
- **허브 카드 이미지 3종** (`f931bd1`, `0551058`): `images_hub.js` (`hub_main`, `hub_dlc_green`, `hub_dlc_north`)
  - `e68226e`: full-width 이미지 + 스크롤 + 메인 카드 그라디언트 오버레이
  - `fe3261f`: DLC 카드 이미지도 dimming/grayscale 필터 없이 표시
- **메인 스토리 진입 연출** (`6437d78`): 진입 시 어두운 이미지 + 미션 브리핑 텍스트 오버레이
- **Act2 restart 제거** (`313feb5`): GameOver 화면에서 "Act2 재시작(2차 배치)" 옵션 제거 → 게임 루프 단순화
- **Act2 restart 시 자동 부여** (`3c0b0e7`, 제거 이전 패치): Act1 core LOG 자동 부여 + 내부 신뢰도 55로 bump (현재는 해당 진입점 제거)

### 🐛 카드/체인 로직 수정 (커밋 `d350ef4`, `b8de4b9`, `a2167db`, `3f013f7`, `6439d31`)

- **C-060 "두 번째 탈북자" 등장 버그 수정** (`d350ef4`):
  - **증상**: 첫 번째 탈북자 이벤트 미경험 상태에서도 C-060이 GI 임계 조건만으로 등장
  - **원인**: C-060 `req`가 `LOG-009` (GI 임계 기반) 의존
  - **수정**: `LOG-DEFECTOR-1` 신규 로그 (data-core.js), CH-004-2가 `LOG-009`와 `LOG-DEFECTOR-1` 둘 다 해금하도록 변경, C-060 조건을 `LOG-DEFECTOR-1` (체인 전용)로 교체 (data-cards-2.js)
- **C-236 카드 텍스트 수정** (`b8de4b9`): 본문의 실제 기지명 `KR-INIT-001 기지 주의` 삭제 → 간접 정보 누출 묘사로 치환. 좌/우 선택 라벨 단축 (모바일 2줄 랩 방지)
- **CA-SEED-02 전임지휘관 메모 Act 조건 교정** (`a2167db`): `act:[1]` → `act:[2,3]`, `day:6~14` — Act 1 등장 시 너무 이른 복선으로 스포일러. B3 제한구역 힌트이므로 Act 2~3로 이동
- **글리치 제거 (CA-014~017)** (`6439d31`): 프롤로그 단계 시각 왜곡 제거, 용어 통일 "아베란트 → 변이체"
- **이브닝챗 응답 불일치 해결** (`3f013f7`):
  - `data-evening-extra-2a/2b/2c.js` 39개 엔트리 전수 `responseKey` 부여
  - `data-evening-responses-3.js` 신규 192줄 — 대화별 매칭 응답 192개 배정
  - 증거 테이블 스크롤 영역 200 → 340px
  - 설정 디스플레이 프리뷰가 폰트/효과 변경을 실시간 반영하도록 수정

### 🔊 오디오 / UI 정비 (커밋 `7c6c720`, `037780c`, `3c4ce93`, `42c0ced`, `a2167db`)

- **크로스페이드 겹침 수정** (`7c6c720`): `_crossfade` 전환 시 타겟 외 모든 트랙 즉시 pause. SFX에 `vol`/`muted` 속성 + tone/noise에 `vol` 곱셈 반영. `_fadeIn`이 매 스텝 `BGM.vol` 참조 → 슬라이더 실시간 반영
- **info-bar 태그 높이 통일** (`037780c`): `min-height + inline-flex` / 인라인 padding 제거
- **타이머 없는 카드 '0' 렌더링 버그** (`3c4ce93`): React의 `0 && h(...)` 가 숫자 0을 렌더 → `timerTotal > 0 && ...`로 교체
- **간부진 인트로 연쇄 재생 제거** (`42c0ced`): 인트로 대화 후 다음 인트로를 즉시 연쇄 호출하던 로직 삭제. 카드 1장 → 인트로 1명 → 카드 1장 → 인트로 1명 순으로 분산
- **텍스트 컬러 테마 적응** (`a2167db`): 하드코딩 녹색 `rgba(220,255,220,...)` → `var(--ui-text)` 전환 (뉴스 헤드라인, 시설, 증거, 상황보고 등 전역)

### 📁 신규 / 변경 파일 (추적 기준)

| 종류 | 파일 | 비고 |
|---|---|---|
| 신규 | `i18n-runtime.js` | i18n 런타임 코어 |
| 신규 | `lang-ui-ko.js` / `lang-ui-en.js` | UI 언어팩 |
| 신규 | `lang-content-en-all.js` | 콘텐츠 영어 오버레이 (207KB) |
| 신규 | `lang-content-en-dialogues.js` | 통신 대화 영어 |
| 신규 | `style-i18n-hotfix.css` / `style-i18n-locale-hotfix.css` | 영어 레이아웃 핫픽스 |
| 신규 | `components-settings-hotfix.js` | 언어 지연 적용 + 저장 번역 |
| 신규 | `data-evening-responses-3.js` | 39개 이브닝챗 응답 매칭 |
| 신규 | `images_hub.js` | 허브 카드 이미지 3종 |
| 수정 | `data-core.js` | `LOG-DEFECTOR-1` 추가 |
| 수정 | `data-cards-2.js` | C-060 체인 조건 교체 |
| 수정 | `data-cards-14.js` | C-236 텍스트/라벨 |
| 수정 | `data-cards-crisis.js` | CA-SEED-02 act/day |
| 수정 | `data-status-tags.js` | 상태 태그 i18n 재편 |
| 수정 | `app.js` | 플로우 `boot → menu → hub` |
| 수정 | `components-game.js` | `MainMenu` + `ScenarioHub` 컴포넌트 |

### ⚠️ 이월 과제

- GDD v10 문서는 본 스냅샷 시점(BUILD_VER=54) 기준 갱신 필요 (별도 작업)
- DLC 슬롯 2종 (`dlc_green`, `dlc_north`) locked 상태. 콘텐츠 본체 미제작 — 허브 UI/이미지만 존재
- `data-cards-16.js` 포함 후속 Act4 확장 여지
- Act2 restart가 UI에서 제거됐으므로 Act1 core LOG 자동 부여 로직(`3c0b0e7`)은 현재 사용되지 않음 — 잔재 코드 정리 여부 판단 필요

---

## 2026-04-20 (2차) 패치 (BUILD_VER 21→22) — Act4 탈출 미니게임 인라인 배포

### 🚨 Critical 수정
- **Act4 탈출 미니게임 복구**: 기존 외부 URL `https://art-lyang.github.io/tiu-field-mission/`가 **HTTP 404 (저장소 자체 미존재)** — CH-007-5 도달 시 플레이어가 GitHub 404 화면에서 영구 정지, 엔딩 E/E_c/E_bad 도달 불가 문제 해결
  - iframe `onload`가 404 HTML에 대해서도 발화해 `setErr` 분기 차단 → 10초 폴백도 무력화됐던 것이 근본 원인
- **조치 (B안: 저장소 내부 인라인)**
  - `field-mission/` 신규 폴더로 미니게임 본체 45개 파일 인라인 (7.1MB)
    - `index.html` + `css/style.css` + `js/` 17개 + `assets/` (배경 1 + 라이플 3 + 바리케이드 2 + bound_shellwalker 스프라이트 12프레임)
  - `components-escape.js`: `ESCAPE_GAME_URL='field-mission/index.html'` + 6초 내 iframe 전역 미검출 시 폴백 UI 노출 가드
  - `app.js` `onEscapeResult`: `flags.logs` 언팩 → `tryUnlock` 루프 추가 (미니게임 내부 축적 LOG 카드게임 반영)
  - `mutants-patched.js` (209줄) 삭제 — field-mission/js/mutants.js와 중복된 옛 복사본
  - BUILD_VER 21→22, `components-escape.js?v=1→v=2`

### 🐛 postMessage 스키마 검증 (로컬 Preview)
- `tiu-escape-init` 송신 → iframe `escapeState` 초기화 확인 (동행자 4명, trust 값 전달)
- sectorId='ACT4-ESCAPE', isNodeMapSector=true, ACT4_NODEMAP 전역 존재
- 작전 개시 → `commander_office` intro 노드 진입 + 선택지 2개 표시

### ⚠️ 이월 과제 (미니게임 내부 미완)
- **노드 배경 6장 미제작**: commander_office / base_interior / base_exterior / b3_descent / emergency_corridor / coast — onerror만 로그, 배경이 sector07로 유지됨 (플레이는 가능)
- **dmz 섹터 배경** (Act3 사용 시)
- **임시 엔딩 화면**: `field-mission/js/flow.js:102` "CCTV 엔딩 엔진은 다음 세션 작업" — 미니게임 내부 end 오버레이 placeholder (카드게임 결과 postMessage는 정상)
- **뮤턴트 스프라이트 제한**: bound_shellwalker만 PNG, drone/runner는 procedural canvas
- **루트 선택 UX 중복**: 카드 CH-007이 이미 LOG-GENERAL-ROUTE / LOG-B3-ROUTE 부여하는데 미니게임 `commander_office`가 동일 선택 재질문. init payload에 preselectedRoute 주입 → commander_office 스킵 패치 권장

---

## 2026-04-20 (1차) 패치 (커밋 `9fb54a8`, BUILD_VER 20→21)

### 🐛 버그 수정 (Critical)
- **Day 1 CA-001 카드 5장 중 3장 중복 출현** 수정
  - 원인: React 함수형 컴포넌트의 closure stale (`performSwipe` setTimeout / `hDlg`가 stale `logs` 참조 → `ONCE-CA-001` 플래그 누락)
  - 수정: `app-init.js` drawCard 강제 첫 카드 블록에서 `Save.getLogs()` localStorage 직접 조회로 closure 우회
- **시설 설계도 한국어 기본화 + 한영 토글 버튼 깨짐** 수정 (커밋 `b6c3da7`)

### 🔨 파일 분리 (200줄 룰)
| 원본 | 줄수 | → 분리 결과 |
|---|---|---|
| `data-evening-extra-2.js` | 486 | `2a` (139) + `2b` (121) + `2c` (80) + `2d` (147) |
| `data-facility-uprising.js` | 293 | `-a` (107) + `-b` (132) |
| `data-cards-prologue.js` | 202 | 본체 (118, CA-001~018) + `-2` (90, CA-019~033) |

### 📚 문서
- **HANDOFF.md** 신규 (worktree + 로컬 루트 양쪽)
- **TIU-GAME-GDD-v10.md** 신규 (v0.9 → v1.0 출시 준비 마일스톤)
- **README.md** 신규 (루트, 프로젝트 개요)

### 잔여 200줄 초과 파일 (기술 부채 — 2차 후 갱신)
- `data-facility.js` (360), `app.js` (341), `components-game.js` (285), `data-endings.js` (226)
- (~~`mutants-patched.js` (209)~~ — 2차에서 삭제됨)
- 권장 우선순위: `data-endings.js` F/G 분리 → 나머지 보류

---

## 2026-04-19 스냅샷

## 핵심 수치

| 항목 | 수치 |
|------|------|
| 총 카드 수 | **486장** (기본 + Act4 + RH/HH 7장 등) |
| 엔딩 수 | **15종** (서사 8 + 즉사 4 + C/E 계열) |
| 엔딩 이미지 | **14장 완비** |
| 시설 | **16개** (기본 11 + uprising 5) |
| 증거 조각 | **20종** + 조합 **8개** |
| 미션 | **15개** (현장 M-001~010 + 사건 MI-01~05) |
| 이브닝 챗 | 40종 + 신뢰도 변형 52세트 + 선택지 38+ |
| 정적 무결성 | **이슈 0건** (라벨 2건은 의도적) |
| QA 도구 | 5개 Python 스크립트 (`tools/`) |

---

## 엔딩 카탈로그 (15종)

| ID | 이름 | 카테고리 | 트리거 조건 요약 |
|----|------|----------|------------------|
| **A** | 완벽한 도구 | compliance | GI ≥ 60 (Act 4 종료) |
| **B** | 각성 | resistance | Act 3+, GI ≤ -15, 신뢰 65+ 2명, 로그 6+ |
| **C_cs** | 봉쇄 성공 | containment | 봉쇄 ≥ 100 |
| **C_cst** | 자충수 | containment | 봉쇄 100 + 서하은 전출 + 박소영 합류 |
| **C_c** | 봉쇄 붕괴 | failure | 봉쇄 ≤ 0 |
| **C_r** | 자원 고갈 | failure | 자원 ≤ 0 |
| **C_t** | 신뢰 상실 | failure | 신뢰 ≤ 0 |
| **C_o** | 접속 차단 | failure | ORACLE 평가 ≤ 0 |
| **D** | 조용한 자유 | resistance | Act 3+, GI ≤ -30, 신뢰 60+ 3명, 로그 8+ |
| **E** | 탈출 | escape | Act 4 탈출 체인 성공 |
| **E_c** | SIGNAL ACQUIRED | escape | 탈출 중 피탄 |
| **E_bad** | LOST IN TRANSIT | escape | Shell Talker 유인 |
| **F** | [데이터 손상] | observer | LOG-012/013/OBSERVER-APPROVED + day≥30 |
| **G** | 관망자 | neutral | Act 3+, GI 0~20, 신뢰 55+ 1명, 로그 7+, day ≥ 30 |
| **H** | 점거 | uprising | 시설 10+ (uprising 6 포함) + 임재혁 65+ + CH-008 체인 완수 |

---

## 본 마일스톤 주요 변경사항 (커밋 `e3f22f7` ~ 현재)

### 엔진 (drawCard / 엔딩 조건)
- **카드 중복 방지 강화**: 최근 버퍼 30→60 + 범용 데일리(무태그·act≥3) **한 판 1회** + 그 외 무태그 **15일 쿨다운**
- **엔딩 G 조건 강화**: `day≥26·log≥4·trust50+` → `day≥30·log≥7·trust55+` → Act 4 진입률 42% → **99.6%**
- **엔딩 H 신규**: `data-facility-uprising.js`로 폐쇄회로 루트 전체 구현 (이브닝챗 + CH-008 6장 체인 + 발각 감지 + 엔딩 정의)
- **시설 uprising 페널티**: uprising 시설 증축 시 `GI -2` 하락 + 토스트 표기

### 콘텐츠
- **Act 4 +20장 추가**: `data-cards-act4-ext.js` (endgame-daily 6 / char 4 / crisis 4 / external 3 / oracle 3)
- **시설 FE-009/010/011 신규**: 격리실 이중 차폐 / 연구 백업실 / B3 환기
- **시설 FE-012~016 재정의**: 자체 서버룸 / 독립 통신실 / 비상 발전기 / 차폐 회의실 / 무기고
- **시설 카드 5장 + 보상 8개**: C-FE009/010/012/013/016 + RF-009~016
- **저항 루트 밸런싱 5장**: `data-cards-resist-hint.js` RH-01~05 (GI↓ + o 유지 경로)
- **엔딩 H 힌트 2장**: HH-01/02 (Act 2 임재혁 → 서하은 동조)
- **엔딩 이미지 5장 추가**: ending_E / E_c / E_bad / G / H

### UI / UX
- **엔딩 탭 갤러리 리디자인**: `components-endings.js` 분리, 15엔딩 전부 등재 (이전 11개만)
- **해금 엔딩 이미지 썸네일 + 상세 뷰 + 카테고리 컬러**
- **uprising 시설 UI**: `▸ 독립 인프라` 라벨 + 주황 테두리

### 버그 수정
- **중복 카드 ID 6건 해결**: C-179~183 (data-cards-4.js → C-271~275) + C-260 (data-cards-15.js → C-276)
- **CE-042 라벨 이중 이스케이프 수정**: `\\\"` → `\"` (화면 백슬래시 노출 버그)

### QA 인프라 (tools/)
| 스크립트 | 용도 |
|----------|------|
| `validator.py` | 카드 ID 중복 / 체인 참조 / LOG 생산-소비 / 엔딩 필수 LOG |
| `simulator.py` | 몬테카를로 v1 (랜덤 스와이프) |
| `simulator_v2.py` | 몬테카를로 v2 (이브닝 챗 trust 시뮬 + random/neutral/resist 전략) |
| `diagnose_act4.py` | Act별 카드 pool 분류 + 부족 구간 진단 |
| `check_buttons.py` | 카드 좌/우 버튼 작동성 검사 (이중 이스케이프, 빈 라벨 등) |

### 파일 분리 (200줄 룰)
| 파일 | 이전 → 현재 |
|------|-------------|
| data-cards-act4.js | 262 → **144** (일반 카드를 `-ext.js`로 분리) |
| data-facility.js | 355 → **245** (uprising 5개를 `-uprising.js`로 이관) |
| components-dialogue.js (EndingScreen) | → `components-endings.js` 175줄 분리 |

---

## 시뮬레이터 최종 결과 (v2 neutral 300판)

```
A  (완벽한 도구)     8.0%
G  (관망자)         55.3%
C_r (자원 고갈)     10.0%
C_c (봉쇄 붕괴)      1.3%
TIMEOUT             25.3%   (특정 엔딩 조건 미충족)

Act1~3 진입률       100%
Act4 진입률         ~99%
평균 생존           40+일
Trust 65+ 달성률    99%
```

> **resist 전략 C_o 100%**: 시뮬레이터가 greedy로 GI↓만 고르고 o 방어 안 함. 실제 플레이어는 B/D/F 도달 가능 (RH-01~05 카드가 o 유지 경로 제공).

---

## 알려진 제한

1. **브라우저 프리뷰로 엔딩 테스트 불가**: 엔딩 대부분 30+일 플레이 필요. 배포 후 다회 플레이로 검증.
2. **resist 전략 시뮬 한계**: 실제 도달률은 시뮬 수치보다 높을 것.
3. **라벨 동일 2건**: CS-003 `"..."`, CH-007-5 `"확인한다"` — 각각 강제 진행 카드 / app.js 특수 처리용 (의도적).

---

## 다음 작업 후보 (우선순위 낮음)

- Act 1 데모 분리 (런치 2~3주 전 진행)
- UI 라벨 영문화 (itch 해외 유저 유입용)
- 엔딩 H discoverability 추가 힌트 (현재 HH-01/02만)
- 기존 카드의 GI↔o 상관관계 완화 (resist 루트 전반 강화)
