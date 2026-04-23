# TERMINAL SESSION — Game Design Document v1.0

> **버전**: v1.0 (출시 준비 마일스톤) — *2026-04-24 증보*
> **최종 업데이트**: 2026-04-24 (필드 미니게임 프로덕션 통합 + 아카이브 언락 교정 + 결과 서사 다국어화 + ScenarioHub 한국어 리터럴 복구)
> **빌드**: BUILD_VER=60 (이전 스냅샷: 59 → 54 → 22)
> **브랜치**: `main`
> **이전 버전**: v0.9 (`TIU-GAME-GDD-v05.md`, 2026-04-17)
> **대응 체인지로그**: `-setup/MD/TIU-ALPHA-CHANGELOG.md` 2026-04-24 스냅샷

---

## 0. 변경 요약

### 0.1a 2026-04-24 증보 (BUILD_VER 54 → 60)

2026-04-23 증보 이후 단일 푸시 커밋 `cbead05` *"Add minigame prototypes and improve English i18n support"* 중심 변경. 보조 핫픽스 10건은 세 번째 컬럼에 묶음 표기.

| 분류 | 변경 | 근거 커밋 |
|---|---|---|
| **🎮 필드 미션 미니게임 시스템 통합** | `components-minigames.js` / `data-minigame-rewards.js` / `components-fieldmission-minigame-patch.js` 3파일 신규. 3종 미니게임 — `signal` (SPEC-011 음향 패턴 정렬), `sequence` (격리 봉인 수동 시퀀스), `breach` (ORACLE 권한 흔적 추적) — 을 **M-002 / MI-01 / MI-04** 3개 미션의 선택 노드에 연결. 4랭크(great/success/partial/fail) 평가 → 원래 선택 보상에 추가 보너스 합산(`mergeMissionBonus`) + 랭크별 textSuffix·endLabel 서사 주입 | `cbead05` |
| **MI-04 본문 교정** | "두 가지 선택지" → "세 가지 선택지" — 실제 노드 수(remove/trap/oracle) 일치 | `cbead05` |
| **📚 아카이브 언락 타이트닝** | 인물 4종(ARC-CHAR-DOYUN/HAEUN/SEJIN/JAEHYUK) 무조건 공개 → `LOG-INTRO-KD/SH/YS/IJ` 전제. ARC-EVS `LOG-001 → LOG-013`, ARC-ORG-ORACLE `LOG-001 → LOG-006 \|\| LOG-INTRO-SH`, ARC-ORG-BRANCH `LOG-001 → LOG-001 && LOG-INTRO-KD`, ARC-ORG-WHITESHIELD `LOG-001 → LOG-016`, ARC-FAC-SEAL `LOG-001 → LOG-070 \|\| LOG-073`, ARC-FAC-LAB `true → LOG-INTRO-YS` | `cbead05` |
| **💬 결과 토스트 다국어화** | `data-result-text.js` "자동 생성 폴백 함수" 방식 → `_rtLocale()`/`_rtPool()` 기반 한·영 이중 풀. 4스탯 × 긍/부 × 한/영 각 4문장 | `cbead05` |
| **🌐 MainMenu 평탄화** | `records` 서브뷰 제거 → 세션 선택/이어하기/아카이브/로그/SETTINGS 를 루트에 직접 노출. SettingsPanel에 `onMainMenu` 복귀 콜백. 토큰 `menu.startGame`/`menu.continue`/`boot.startGame` 추가 | `cbead05` |
| **🌐 ScenarioHub 한국어 복원** | 메인 뷰 하드코딩 영어 → `isKo` 분기로 교체. ⚠️ `cbead05`에서 ko 리터럴이 `?`로 저장 손상된 채 커밋 → 후속 복구 커밋에서 기획 원문으로 L57·L64~80 수동 복원(`components-game.js?v=23→24`, BUILD_VER 59→60). 브랜드/상태 라벨 7개(KOREAN BRANCH OPERATION / STABILIZATION / TERMINAL SESSION / ZONE / STATUS / THREAT INDEX / ACCESS)는 영문 고정으로 전환, 미션명·섹터명·메뉴 4종은 한국어 복구 | `cbead05` + 후속 복구 |
| **🌐 이브닝챗 영어 폴백** | `components-evening.js` `resolveEveningBucketEntry()` — responseKey 우선, 실패 시 영어 콘텐츠 풀에서 `{char}_{act}_` 접두어 + day 범위 best-match | `cbead05` |
| **🌐 일일 보고 토큰 보강** | `lang-ui-ko.js` `assess.high1~veryLow4` 16개 평가 라인, `archiveNew`/`dayReport`/섹션 라벨, `headlineWarn3` (GRANT EXPIRED) | `cbead05` |
| **🛠️ i18n 핫픽스 스택** | 설정 패널 닫힘/저장 시 `applyLocale()` 보장, 영어 레이아웃 핫픽스 CSS 2종, 게이지 컬럼 정렬 단순화(style.css 45→8줄), index.html 에셋 버전 bump | `7d67294` `eb6b94d` `f985def` `25aed56` `bcd00d7` `f102261` `b9a6a68` `b17270b` `04ae5b8` `1a89a4f` |
| **🖼️ 이미지 에셋 대량 추가** | backgrounds 14 / cards 10 / characters 10 / specs 7 / hub 3 (jpg). `getMissionImage()`에서 specs를 M-001/M-002/M-004/M-005/M-006/M-009/M-010 미션과 연결 | `cbead05` |
| **📦 TEST/ 프로토타입 동봉** | `TEST/minigame-demo.js` (984줄) + 스크린샷 14장 + 정적 에셋 4종. 레퍼런스 목적, 빌드 번들 포함 여부 후속 결정 | `cbead05` |

**신규 추적 파일** (이 스냅샷에서 추가):
`components-minigames.js`, `data-minigame-rewards.js`, `components-fieldmission-minigame-patch.js`, `TEST/minigame-demo.js`, `TEST/index.html`, `TEST/styles.css`, 신규 이미지 에셋 44종 (`assets/images/{backgrounds,cards,characters,specs,hub}/*.jpg`)

### 0.1 2026-04-23 증보 (BUILD_VER 22 → 54)

이전 v1.0 작성 시점(BUILD_VER=22) 이후 원본 체인지로그 대응 변경:

| 분류 | 변경 | 근거 커밋 |
|---|---|---|
| **🌐 i18n 인프라** | `i18n-runtime.js` 런타임 코어 + `lang-ui-ko.js`/`lang-ui-en.js` UI 언어팩 + `lang-content-en-all.js` (207KB) / `lang-content-en-dialogues.js` 콘텐츠 영어 오버레이. 설정 > 디스플레이에 언어 토글 추가 | `0429de2` `0d571cd` `f46f19b` |
| **🎬 플로우 개편** | Boot → **MainMenu** → **ScenarioHub** → (진입) → Tutorial/Briefing/Game. 게임 시작 전 설정 접근, RECORDS 서브뷰(logs/archive/endings) | `8f50656` `11c5708` |
| **DLC 확장 슬롯** | ScenarioHub에 DLC 슬롯 2종 locked 등록: `dlc_green` (GREEN THRESHOLD — 아프리카 소바리 폐허 / EV-Σ 잔류), `dlc_north` (NORTHERN FRONT — 러시아 북극권 / SITE-7/13). 허브 카드 이미지 3종 추가 | `f931bd1` `0551058` |
| **Act2 restart 삭제** | GameOver 화면의 "Act2 재시작(2차 배치)" 옵션 제거 → 엔딩 직접 재시작 루트만 유지 | `313feb5` |
| **C-060 체인 버그 수정** | "두 번째 탈북자" 카드가 첫 탈북자 미경험 상태에서 등장하던 버그. `LOG-DEFECTOR-1` 신규 + CH-004-2가 `LOG-009`/`LOG-DEFECTOR-1` 양쪽 해금, C-060 조건을 체인 전용 `LOG-DEFECTOR-1`로 교체 | `d350ef4` |
| **CA-SEED-02 act 보정** | 전임지휘관 B3 메모 `act:[1]` → `act:[2,3]`, day 6~14. Act 1 노출 시 과도한 스포일러 | `a2167db` |
| **C-236 텍스트** | 실제 기지명 `KR-INIT-001 기지 주의` 본문 노출 제거 → 간접 정보 누출 묘사 | `b8de4b9` |
| **이브닝챗 응답 매칭** | 2a/2b/2c의 39개 엔트리 `responseKey` 전수 부여 + `data-evening-responses-3.js` 신규 (192줄) | `3f013f7` |
| **글리치 정리** | CA-014~017 프롤로그 시각 왜곡 제거, 용어 통일 "아베란트 → 변이체" | `6439d31` |
| **오디오 수정** | `_crossfade` 겹침 수정(타겟 외 트랙 즉시 pause), SFX 볼륨 슬라이더 실시간 반영 | `7c6c720` |
| **UI 정비** | 타이머 없는 카드에 `0` 렌더 버그, info-bar 태그 높이 통일, 간부진 인트로 연쇄 재생 제거, 텍스트 컬러 `var(--ui-text)` 전환 | `3c4ce93` `037780c` `42c0ced` `a2167db` |

**신규 추적 파일** (이 스냅샷에서 추가):
`i18n-runtime.js`, `lang-ui-ko.js`, `lang-ui-en.js`, `lang-content-en-all.js`, `lang-content-en-dialogues.js`, `style-i18n-hotfix.css`, `style-i18n-locale-hotfix.css`, `components-settings-hotfix.js`, `data-evening-responses-3.js`, `images_hub.js`

### 0.2 v0.9 → v1.0 (BUILD_VER 22 시점)

| 분류 | 변경 |
|---|---|
| **🚨 Critical 복구 (2차)** | Act4 탈출 미니게임 외부 URL(`art-lyang.github.io/tiu-field-mission/`) **HTTP 404** 상태 → `field-mission/` 저장소 내부 인라인 배포로 전환. CH-007-5 진입 시 영구 정지 버그 해결 |
| **버그 수정** | Day 1 CA-001 카드 5장 중 3장 중복 출현 — React closure stale 회피 (`Save.getLogs` 직접 조회) |
| **콘텐츠** | 카드 486장 → 카드 풀 안정화, 엔딩 15종 (서사 8 + 즉사 4 + escape 3) 모두 활성 |
| **신규 시스템** | 시설 점거 루트 (CH-008 6장 체인 + 엔딩 H "점거"), 폐쇄회로 루트 |
| **콘텐츠 확장** | Act 4 +20장 (`data-cards-act4-ext.js`), 저항 힌트 카드 5장(`data-cards-resist-hint.js`), 엔딩 H 힌트 2장 |
| **시설 시스템** | FE-009/010/011 신규 + FE-012~016 uprising 시설 5개 재정의 |
| **UI/UX** | 시설 설계도 한국어 기본화 + 한영 토글 버튼 깨짐 수정 |
| **파일 구조** | 200줄 룰 강제: `data-evening-extra-2.js`(486) → 4분할, `data-facility-uprising.js`(293) → 2분할, `data-cards-prologue.js`(202) → 본체 + 보충 풀 / `mutants-patched.js`(209, 데드코드) 삭제 |
| **Act4 미니게임 (2차)** | `field-mission/` 45파일 7.1MB 인라인. postMessage 스키마: `tiu-escape-init` / `tiu-escape-result` (outcome, companionsFinal, casualtiesFinal, flags.logs, accuracy, hp). `components-escape.js`에 6초 전역 미검출 폴백 가드 + `app.js onEscapeResult`에 flags.logs 언팩 처리 |
| **QA 인프라** | 5개 Python 도구 (`tools/validator.py`, `simulator.py/v2`, `diagnose_act4.py`, `check_buttons.py`) |
| **상업 준비** | 29개 업적 Steam steamId 매핑, 다중 저장 슬롯 3개, NG+ 시스템 |

---

## 1. 핵심 컨셉

### 한 줄 요약
> ORACLE이 배정한 임무를 수행하는 Proxy Network 요원으로서, 카드 스와이프로 기지 운영 판단을 내리고, 텍스트 어드벤처로 현장 임무를 수행한다. **당신의 모든 선택은 자유의지인가, 유도된 복종인가.**

### 디자인 필라

1. **자발적 복종의 게임화** — 플레이어는 ORACLE의 지시를 "합리적 판단"으로 받아들이며 게임을 진행. Observer가 선택지 자체를 조율함을 인지하는 순간이 게임의 진짜 클라이맥스
2. **두 겹의 플레이** — 기지(카드 스와이프) ↔ 현장(텍스트 어드벤처) 교차 리듬. 기지 판단이 현장 미션 조건을 바꾸고, 현장 정보가 기지 카드 풀을 변화시킴
3. **ORACLE의 목소리** — UI 전체가 ORACLE의 인터페이스. 플레이어는 "게임을 하는 것"이 아니라 "ORACLE 단말기를 조작하는 것"

---

## 2. 게임 구조

### 2.0 진입 플로우 (2026-04-23 개편 → 2026-04-24 평탄화)

```
Boot (타이틀 + 로그 스크롤)
 ↓
MainMenu (게임 시작 / 이어하기 / 아카이브 / 로그 / SETTINGS)
 ↓  ※ "게임 시작" 선택 시
ScenarioHub (스와이프로 시나리오 선택: main / dlc_green / dlc_north)
 ↓ (active 시나리오 "진입" 선택)
메인 스토리 서브메뉴 (이어서 플레이 / 새로 시작 / 튜토리얼 다시 보기)
 ↓
Tutorial → Briefing → Game
```

- **MainMenu** (2026-04-24 `cbead05` 평탄화): `records` 서브뷰 제거 → 아카이브/로그/이어하기를 루트에 직접 버튼으로 노출. 게임 시작 전에도 언어/디스플레이/사운드 설정 접근. SettingsPanel에는 메인 메뉴 복귀 콜백 `onMainMenu` 노출
- **ScenarioHub** (2026-04-24 i18n 복원): 스와이프(60px 임계) + 화살표 키 + 숫자키 1/2/3 지원. `Escape`/`Backspace`로 상위 이동. 메인 뷰 하드코딩 영어 문구는 `isKo` locale 분기로 한/영 전환
- DLC 슬롯(`dlc_green`, `dlc_north`)은 locked. 현재는 허브 UI/이미지만 존재 (콘텐츠 본체 미제작)

### 2.1 사이클 (1일 = 1 사이클)

```
① 카드 스와이프 (Act별 4/5/6/7장)
② 이브닝 챗 (신뢰도 4구간 × 4인 × Act별 변형)
③ 현장 미션 (카드 선택에 의해 트리거, Act 2부터)
④ 일일 정보 수신 (뉴스 헤드라인)
⑤ 보상 선택 (3개 중 택1)
⑥ 일일 감쇠 → 다음 날
```

### 2.2 4-Act 구조

| Act | 서사 | 일수 | 하루 카드 | 감쇠 |
|---|---|---|---|---|
| **Act 1: 프롤로그/일상** | 기지 도착, ORACLE 첫 접속, 간부 자기소개, 현장임무 없음 | ~5일 | 4장 | 없음 |
| **Act 2: 의혹** | 이변체 첫 조우, 프로메테우스 감지, ORACLE 의심 시작 | ~14일 | 5장 | 없음 |
| **Act 3: 진실** | 프로메테우스 대면, 서하은 분기, ORACLE 실체 접근 | ~29일 | 6장 | c-1, r-1 |
| **Act 4: 최종** | GI 기반 분기, 엔딩 수렴, 최종 프로토콜 | Day 30+ | 7장 | c-2, r-2, t-1 |

### 2.3 4-스탯 + GI

| 스탯 | 시작값 | 0이면 | 100이면 |
|---|---|---|---|
| **봉쇄 (c)** | 50 | C_c (붕괴) | C_cs (성공) / C_cst (자충수) |
| **자원 (r)** | 65 | C_r (고갈) | — |
| **신뢰 (t)** | 50 | C_t (상실) | — |
| **평가 (o)** | 40 | C_o (접속 차단) | — |

- **GI (Ground Index)**: 숨겨진 변수. 음수→저항 루트, 양수→복종 루트. UI 비노출 (3회차+ 일부 노출)

---

## 3. 콘텐츠 카탈로그 (BUILD_VER=21 기준)

### 3.1 정량 현황

| 항목 | 수치 |
|---|---|
| **총 카드** | **486장** (prologue 34 + 일반 350+ + 위기/특수 + Act4 확장 20 + 저항 힌트 5 + H 힌트 2) |
| **체인** | 6 기본 (CH-001~006) + 사건 체인 (CH-007 등) + **CH-008 폐쇄회로 6장** |
| **엔딩** | **15종** (아래 카탈로그 참조) |
| **현장 미션** | 15개 (M-001~010 + MI-01~05) |
| **시설 확장** | 16개 (기본 11 + uprising 5: FE-012~016) |
| **증거** | 20조각 + 8조합 |
| **이브닝 챗** | 약 120~150 씬 |
| **다이얼로그** | 약 50개 |
| **ORACLE 로그** | 60~70개 |
| **아카이브** | 43종 |
| **업적** | 29개 (Steam steamId 매핑 완료) |
| **이변체** | 5종 직접 + 6종 아카이브 전용 |
| **BGM** | 6 트랙 (main / tension / boot / act / fade) |
| **이미지** | 34 PNG UI 자산 + base64 카드/배경/캐릭터 |

### 3.2 엔딩 카탈로그 (15종)

| ID | 이름 | 카테고리 | 트리거 조건 |
|---|---|---|---|
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
| **F** | [데이터 손상] | observer | LOG-012 + LOG-013 + OBSERVER-APPROVED + day≥30 |
| **G** | 관망자 | neutral | Act 3+, GI 0~20, 신뢰 55+ 1명, 로그 7+, day≥30 |
| **H** | 점거 | uprising | 시설 10+ (uprising 6 포함) + 임재혁 65+ + CH-008 완수 |

### 3.3 등장 인물

**Proxy Network 한국 지부 (5명)**
- **이중철 (Pilehead)** — 지휘관/플레이어, 전직 육군 특수부대, 불명예전역
- **서하은** — 부지휘관/데이터 분석. Act 2부터 ORACLE 데이터 불일치 감지. Act 3 전출 분기
- **강도윤** — 현장요원, 전직 해병대 부사관
- **윤세진** — 연구원/의료관, EV-Σ 억제제 개발
- **임재혁** — 정보분석관/기술관, ORACLE 의존도 최고. 엔딩 H 핵심 인물

**프로메테우스 한국 작전팀 (3명)**
- **마르쿠스 베버** — 지휘관, 독일 출신
- **닉 포스터** — 이중철 불명예전역 사건 당사자
- **박소영** — 분석관, 서하은 전출 시 후임

**제3자**
- **에이전트 강 (강지현)** — 정체 미공개. Act 2부터 흔적

---

## 4. 핵심 시스템

### 4.1 카드 시스템

- **once 카드**: 1회성 카드는 `once: true` + `ONCE-{cardId}` 로그 추적으로 중복 방지
- **CA-001 강제**: Day 1 첫 카드는 `CA-001` (1회차) 또는 `CA-001B` (2회차+ 메타 분기)
- **중복 방지**: 최근 60장 버퍼 + 태그 쿨다운 + 무태그 카드 15일 쿨다운
- **자원 리스크**: r ≥ 2 획득 시 20% 실패 → 화면 중앙 빨간 토스트 2.5초

### 4.2 신뢰도 시스템

4인 개별 (서하은/강도윤/윤세진/임재혁), 0~100, 시작 50
- low (0~39) / mid (40~64) / high (65~84) / bond (85~100)
- 65+ 심층 대화 해금, 70+ 비밀 대화, 85+ bond 라인

### 4.3 이브닝 챗

신뢰도 4구간 × 4인 × Act별 대사 완전 변형 (52세트)
- 38개 응답 선택지 (a/b 분기)
- INTRO_LOG_MAP으로 Act 1 자기소개 1회 표시 후 반복 방지
- **임재혁 조사테이블 해금 이벤트** (LOG-EV-UNLOCK)

### 4.4 시설 시스템

16개 확장 (FE-001~FE-016)
- 기본 11개: 격리실, 백업실, 환기, 의무실, 봉쇄선 강화 등
- **Uprising 5개 (FE-012~016)**: 자체 서버룸 / 독립 통신실 / 비상 발전기 / 차폐 회의실 / 무기고
- Uprising 시설 증축 시 GI -2 페널티 + 토스트 알림
- 시설 10개 + uprising 6개 + 임재혁 65+ → 엔딩 H 루트 해금

### 4.5 폐쇄회로 (CH-008) — 신규

조건: 시설 10+ 완료 + uprising 6 전부 + 임재혁 신뢰 50+
- 6장 체인: 1단계 하드웨어 → ORACLE 확인 #1 → 2단계 백도어 → ORACLE 확인 #2 → 3단계 통신차단 → 최종 ORACLE 확인
- 발각 시 `CA-UPRISING-FAIL` 트리거 (스탯 -2~-5, GI +5)
- 통과 시 엔딩 H "점거"

### 4.6 글리치 시스템

OBSERVER 글리치 연출 (`style-glitch.css` + `components-glitch.js`)
- L0~L3 강도. Act 진행 + GI에 따라 자동 상승
- 시각/텍스트 왜곡, 카드 배경 일그러짐, ORACLE 단말기 깜박임

### 4.7 저장/로드

- 다중 저장 슬롯 3개 (`ts_snap_1/2/3`)
- 스냅샷: 게임 진행 + LOG + 신뢰도 + 시설 전체
- NG+ 시스템: `ngPlus` 플래그, HIDDEN_REWIND 업적, 회차 영속 데이터
- 회차 카운터 `Save.getSessions()` — CA-001B 메타 분기에 사용

---

## 5. 파일 구조

### 5.1 코어
- `index.html` — HTML 셸 + 스크립트 로드 (**BUILD_VER=60** 캐시 버스트)
- `style.css` + `style-glitch.css` + `style-escape.css` — 기본 스타일
- `style-i18n-hotfix.css` + `style-i18n-locale-hotfix.css` — 영어 레이아웃 핫픽스 (게이지/모바일 선택지 버튼, `lang=en` 속성 기반 오버라이드)
- `field-mission/` — Act4 탈출 미니게임 인라인 (index.html + css/ + js/ 17개 + assets/ 45파일 / 7.1MB). postMessage로 카드게임과 상태 교환

### 5.1a i18n 런타임 (2026-04-23 신규)
- `i18n-runtime.js` — `locale` 변수, `t()`/`tt()`/`tc()` 헬퍼, `ts-locale-changed` broadcast 이벤트
- `lang-ui-ko.js` / `lang-ui-en.js` — UI 문자열 (메뉴/버튼/라벨/상태 태그). 2026-04-24에 `menu.*` / `assess.high1~veryLow4` / `boot.startGame` / 섹션 라벨 추가
- `lang-content-en-all.js` (207KB) — 카드 msg/leftLabel/rightLabel, 뉴스 헤드라인, 다이얼로그 등 콘텐츠 영어 오버레이 (18개 phase 통합)
- `lang-content-en-dialogues.js` — 초기 통신 대화 영어
- `components-settings-hotfix.js` — 설정 패널 닫힘/저장 시 locale 지연 적용 및 저장 번역

### 5.1b 필드 미션 미니게임 (2026-04-24 신규, `cbead05`)
- `components-minigames.js` (429줄) — 3종 React 미니게임 컴포넌트 + `MiniPanel` 오버레이 + `mergeMissionBonus()` 보상 합성
  - `signal` (SPEC-011 음향 패턴 정렬) — 왕복 커서를 안정 밴드에 정지
  - `sequence` (격리 봉인 수동 시퀀스) — 패널 지시문대로 버튼 입력
  - `breach` (ORACLE 권한 흔적 추적) — 인접 노드 이동 + KEY 수집 → EXIT
- `data-minigame-rewards.js` (350줄) — `FIELD_MINIGAME_CONFIGS` (미션→노드→미니게임 매핑) + `FIELD_MINIGAME_REWARDS` (4랭크 보너스) + `FIELD_MINIGAME_NARRATIVES` (랭크별 textSuffix/endLabel)
  - **통합 미션**: M-002(`analyze`→signal_scan), MI-01(`shield`/`seal`/`oracle`→seal_sequence), MI-04(`remove`/`trap`/`oracle`→authority_trace)
  - **전용 로그**: `LOG-MG-011-AUDIO`, `LOG-MG-INC-01-SEAL`, `LOG-MG-INC-04-TRACE`, `LOG-MG-DLG-SEJIN-SIGNAL`, `LOG-MG-DLG-JAEHYUK-SEAL`, `LOG-MG-DLG-HAEUN-TRACE`
- `components-fieldmission-minigame-patch.js` (167줄) — 기존 `FieldMission` 재정의 패치. `localizeMissionNode()`에서 `tc()` 언어팩 + 정적 오버라이드 + 미니게임 결과 서사 3단 병합. **로드 순서 민감**: 반드시 `components-escape.js` 이후 로드

### 5.2 앱 로직
- `app.js` — React App 메인 컴포넌트 (33개 useState)
- `app-init.js` — 글로벌 유틸, drawCard, Save, SFX, **CA-001 강제 첫 카드 (Save.getLogs 직접 조회)**
- `app-utils.js` — pick, drawCard helpers, INTRO_FILTER
- `app-logic.js` — Act 전환, 엔딩 체크, 게임 로직
- `app-bgm.js` — BGM 연동

### 5.3 컴포넌트 (16개)
`components.js`, `components-game.js`, `components-dialogue.js`, `components-evening.js`, `components-briefing.js`, `components-archive.js`, `components-evidence.js`, `components-facility.js`, `components-settings.js`, `components-settings-2.js`, `components-settings-hotfix.js`, `components-endings.js`, `components-glitch.js`, `components-escape.js`, `components-escape-roll.js`, `components-minigames.js`, `components-fieldmission-minigame-patch.js`

### 5.4 데이터 (분리됨, 200줄 룰)

**카드** (24개 파일):
- `data-cards-prologue.js` (118줄, CA-001~018) + `data-cards-prologue-2.js` (90줄, CA-019~033)
- `data-cards-1.js` ~ `data-cards-16.js`
- `data-cards-act4.js` + `data-cards-act4-ext.js` + `data-cards-resist-hint.js` + `data-cards-crisis.js` + `data-cards-neutral.js`

**체인 / 미션 / 엔딩**:
- `data-chains.js` + `-incident.js` + `-incident2.js`
- `data-missions.js` + `-2.js` + `-3.js` + `-4.js` + `-5.js` + `-incident.js` + `-variants.js`
- `data-endings.js` + `data-act4-escape.js` + `logic-act4-escape.js`

**시설**:
- `data-facility.js` (245줄) + `-2.js` + `-uprising-a.js` + `-uprising-b.js`

**이브닝 챗**:
- `data-evening-trust-1/1b/2/3.js` (캐릭터별 신뢰도 변형)
- `data-evening-responses.js` + `-2.js` + **`-3.js`** (2026-04-23 신규, 2a/2b/2c 39개 responseKey 매칭 응답 192개)
- `data-evening-extra.js` + `-extra-2a/2b/2c/2d.js` (분리됨, 각 ≤200줄)
- `evening-lines.js` — getEveningLines

**기타**:
- `data-core.js`, `data-status-tags.js`, `data-rewards.js`, `data-archive.js` (2026-04-24 언락 조건 교정, 인물 4종·시설 2종·조직 3종·EV-Σ 1종)
- `data-evidence.js`, `data-hidden-story.js`, `data-achievements.js`
- `data-result-text.js` (2026-04-24 한·영 풀 재작성, `_rtLocale()`/`_rtPool()` 기반) + `-story-1/2/3.js`
- `data-minigame-rewards.js` (2026-04-24 신규) — 필드 미션 미니게임 설정/보상/서사

### 5.5 자산
- 이미지: `images.js`, `images_bg.js`, `images_cards.js` (base64) + `img/` 34장 PNG
- BGM: `bgm.js`, `bgm-fade.js`, `bgm-act.js`, `bgm_main.js`, `bgm_tension.js`, `bgm_boot.js` + MP3 3개
- SFX: `sfx-sources.js`

### 5.6 QA 도구 (`tools/`)
| 스크립트 | 용도 |
|---|---|
| `validator.py` | 카드 ID 중복 / 체인 참조 / LOG 생산-소비 / 엔딩 필수 LOG 검증 |
| `simulator.py` | 몬테카를로 v1 (랜덤 스와이프) |
| `simulator_v2.py` | 몬테카를로 v2 (이브닝 챗 trust 시뮬 + random/neutral/resist 전략) |
| `diagnose_act4.py` | Act별 카드 pool 분류 + 부족 구간 진단 |
| `check_buttons.py` | 카드 좌/우 버튼 작동성 검사 |

---

## 6. 알려진 이슈 & 기술 부채

### 잔여 200줄 초과 파일
- `data-facility.js` (360) — 단일 큰 객체 리터럴, 분리 위험
- `app.js` (341) — React closure 공유, 분리 시 회귀 위험
- `components-game.js` (285) — 동상
- `data-endings.js` (226) — `ENDING_DEFS` 단일 객체. F/G만 후속 파일 분리 가능
- ~~`mutants-patched.js` (209)~~ — **2026-04-20 (2차)에서 삭제** (field-mission/js/mutants.js와 중복된 옛 복사본)

### Act4 미니게임 이월 과제 (BUILD_VER=22 시점 미완)
- **노드 배경 6장 미제작**: `commander_office` / `base_interior` / `base_exterior` / `b3_descent` / `emergency_corridor` / `coast` — `field-mission/assets/`에 미존재. `swapBackground` onerror만 로그, 배경 유지되어 플레이는 가능
- **dmz 섹터 배경** (Act3 사용 시 동일 문제)
- **미니게임 내부 엔딩 화면**: `field-mission/js/flow.js:102` "CCTV 엔딩 엔진은 다음 세션 작업" placeholder. 카드게임 결과 postMessage는 정상 전송
- **뮤턴트 스프라이트 제한**: `bound_shellwalker`만 PNG (approach 5 / attack 4 / hurt 2 / death 2 프레임), drone/runner는 procedural canvas 그리기
- **루트 선택 UX 중복**: 카드 CH-007 좌/우로 이미 LOG-GENERAL-ROUTE / LOG-B3-ROUTE 부여되는데 미니게임 `commander_office`가 동일 선택 재질문. init payload에 preselectedRoute 주입 → commander_office 스킵 패치 권장

### React Closure 함정 (재발 방지 메모)
setState 콜백 안에서 `Save.saveLogs(n)` 동기 호출됨 → localStorage 즉시 갱신.
그러나 setState는 비동기 → 다음 리렌더 전까지 컴포넌트 closure의 `logs`는 stale.
setTimeout/event handler closure에서 logs 의존 분기 시 **반드시 `Save.getLogs()` 직접 조회** 또는 setState 콜백 인자 사용.

---

## 7. 출시 준비 상태

### 7.1 완료
- [x] 콘텐츠 90% (15엔딩 활성, 486 카드, 시설 16개)
- [x] 업적 29개 + Steam steamId 매핑
- [x] 다중 저장 슬롯 + NG+
- [x] 글리치 연출 시스템
- [x] BGM 6트랙 + 모바일 볼륨 슬라이더
- [x] QA 도구 5종

### 7.2 출시 전 필수 (P0)
- [x] **i18n 인프라 구축** (2026-04-23, `i18n-runtime.js` + UI 언어팩 + 콘텐츠 영어 오버레이)
- [ ] 영어 번역 품질 감수 (콘텐츠 오버레이 207KB 자동 생성분 QA)
- [ ] Steam 캡슐 그래픽 4종 (Header/Capsule/Library/Page Bg)
- [ ] 스크린샷 5장 + GIF 2개
- [ ] 트레일러 60초
- [ ] 정식 로고

### 7.3 출시 전 권장 (P1)
- [ ] 카드 일러스트 30~50장 (AI + 큐레이션)
- [ ] 튜토리얼 카드 3~5장
- [ ] 엔딩 갤러리 클리어 보상
- [ ] 자원 효과음 풀 확장

### 7.4 출시 후 (P2)
- [ ] 일/중 번역
- [ ] 신규 엔딩 1~2개 (DLC 또는 무료 패치)
- [ ] 모바일 출시 (이미 viewport 대응)

---

## 8. 시뮬레이터 결과 참조

**neutral 전략 300판 (v2)**:
```
A  (완벽한 도구)     8.0%
G  (관망자)         55.3%
C_r (자원 고갈)     10.0%
C_c (봉쇄 붕괴)      1.3%
TIMEOUT             25.3%

Act4 진입률         ~99%
Trust 65+ 달성률    99%
```

> resist 전략 시뮬은 greedy하게 GI↓만 고르고 o 방어 안 함. 실제 플레이어는 RH-01~05 카드로 B/D/F 도달 가능.

---

## 9. 가격/출시 권장 (요약)

| 시나리오 | itch.io | Steam | 비고 |
|---|---|---|---|
| **A안: 한국어만** | ₩3,000 (PWYW) | $4.99 / ₩7,500 | Reigns 라인 |
| **B안: 한·영, 일러스트 30장** ★권장 | ₩5,000 | **$7.99 / ₩11,500** | Yes Your Grace 절반 |
| **C안: 한·영·일, 풀 폴리시** | ₩7,000 | $12.99 / ₩18,000 | Suzerain 권 |

목표 위시리스트: **7,000+** (Steam 알고리즘 노출 임계점)

---

## 10. 부록: 확정 로어

- **프로메테우스**: 한국 비공식 지원. ORACLE은 적대 분류
- **다회차**: Observer→ORACLE 임시 능력. 만료: `UPON_FULL_ESTABLISHMENT || OBSERVATION_TERMINATE`
- **Shell Talker**: 희생자 목소리만 모방. 박상훈 중위 = 이미 포식당함
- **봉쇄 100**: C_cs(성공) 또는 C_cst(자충수, LOG-050+LOG-082 조건)
- **DPRK 블랙존**: 의식/육체 분리. EV-Σ 무관. Observer 능력 불완전 작용

---

*v0.7 → v0.9 → **v1.0 (출시 준비 마일스톤)** → v1.0 증보 (2026-04-23) → v1.0 증보 (2026-04-24)*
*본 문서는 **BUILD_VER=60** 시점의 게임 상태를 반영하며, TIU 마스터 로어와의 정합성 검증 완료.*
*2026-04-23 증보분: i18n 인프라 구축, MainMenu/ScenarioHub 플로우 개편, 카드 체인 버그 수정 (C-060/CA-SEED-02/C-236), 이브닝챗 응답 매칭, 오디오/UI 정비.*
*2026-04-24 증보분: 필드 미션 미니게임(signal/sequence/breach) 프로덕션 통합 (M-002/MI-01/MI-04), 아카이브 언락 타이트닝, 결과 토스트 서사 한·영 풀 재작성, MainMenu 평탄화, ScenarioHub 한국어 복원.*
*변경 이력 상세: `-setup/MD/TIU-ALPHA-CHANGELOG.md` 2026-04-24 스냅샷*
