# TERMINAL SESSION — Game Design Document v1.0

> **버전**: v1.0 (출시 준비 마일스톤)
> **최종 업데이트**: 2026-04-20 (2차)
> **빌드**: BUILD_VER=22
> **브랜치**: `claude/magical-cray-74f8c4`
> **이전 버전**: v0.9 (`TIU-GAME-GDD-v05.md`, 2026-04-17)

---

## 0. 변경 요약 (v0.9 → v1.0)

이전 버전 대비 추가/수정된 핵심 사항:

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
- `index.html` — HTML 셸 + 스크립트 로드 (BUILD_VER=22 캐시 버스트)
- `style.css` + `style-glitch.css` — 전체 스타일
- `field-mission/` — Act4 탈출 미니게임 인라인 (index.html + css/ + js/ 17개 + assets/ 45파일 / 7.1MB). postMessage로 카드게임과 상태 교환

### 5.2 앱 로직
- `app.js` — React App 메인 컴포넌트 (33개 useState)
- `app-init.js` — 글로벌 유틸, drawCard, Save, SFX, **CA-001 강제 첫 카드 (Save.getLogs 직접 조회)**
- `app-utils.js` — pick, drawCard helpers, INTRO_FILTER
- `app-logic.js` — Act 전환, 엔딩 체크, 게임 로직
- `app-bgm.js` — BGM 연동

### 5.3 컴포넌트 (13개)
`components.js`, `components-game.js`, `components-dialogue.js`, `components-evening.js`, `components-briefing.js`, `components-archive.js`, `components-evidence.js`, `components-facility.js`, `components-settings.js`, `components-settings-2.js`, `components-endings.js`, `components-glitch.js`, `components-escape.js`

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
- `data-evening-responses.js` + `-2.js`
- `data-evening-extra.js` + `-extra-2a/2b/2c/2d.js` (분리됨, 각 ≤200줄)
- `evening-lines.js` — getEveningLines

**기타**:
- `data-core.js`, `data-status-tags.js`, `data-rewards.js`, `data-archive.js`
- `data-evidence.js`, `data-hidden-story.js`, `data-achievements.js`
- `data-result-text.js` + `-story-1/2/3.js`

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
- [ ] **영어 로컬라이제이션** (i18n 시스템 + 번역) — 최우선
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

*v0.7 → v0.9 → **v1.0 (출시 준비 마일스톤)***
*본 문서는 BUILD_VER=22 시점의 게임 상태를 반영하며, TIU 마스터 로어와의 정합성 검증 완료.*
*문의/수정: claude/magical-cray-74f8c4 브랜치 HANDOFF.md 참조*
