# TIU-CARD — Alpha 마일스톤 체인지로그

> 최신 스냅샷: **2026-04-20 (2차)** (BUILD_VER=22)
> 이전 스냅샷: 2026-04-20 (1차, BUILD_VER=21) / 2026-04-19
> 브랜치: `claude/magical-cray-74f8c4`
> 대상 빌드: **TIU-Alpha → v1.0 출시 준비**
> 대응 GDD: `-setup/GDD/TIU-GAME-GDD-v10.md`

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
