# TIU-CARD 작업 인수인계 (Handoff)

> **작성일**: 2026-05-11 (Issue #22 P0~P3 보완 작업 기준 갱신)
> **작업 브랜치**: `main` (로컬 미커밋 검증분 존재)
> **마지막 BUILD_VER**: `187`
> **대응 체인지로그**: GitHub Issue #22 P0~P3 보완 및 2026-05-11 검증 스냅샷

---

## 0-0. 2026-05-11 현재 기준 — Issue #22 P0~P3 보완

### 이번 세션 완료

- P0: `LOG-OBSERVER-APPROVED`, `LOG-ACT1-SKIP`, `LOG-C106-HERB`, `LOG-C159-GYM` 정의와 영어 오버레이를 보강.
- P0: `LOG-026`을 SPEC-004/M-009 전용으로 유지하고, `C-106` 약초 재배 후속은 `LOG-C106-HERB`로 분리.
- P1: `C-159` Act 1 체력 단련 공간 로그를 중기 운영 기록 `LOG-078`에서 `LOG-C159-GYM`으로 분리.
- P1: 서하은 전출(`LOG-050`) 이후 `C-200`, `C-201`이 등장하지 않도록 조건을 보강.
- P1: `C-189` 영어 부상 묘사를 한국어 원문과 같은 왼쪽 어깨/옆구리 파편상으로 수정.
- P2/P3: `CA-SEED-01/02`, `CA-OBS-PROTO`, `C-034`의 선택지 수치 차이를 명확히 하고 과도한 초반 페널티를 완화.
- P2/P3: CH-I01~CH-I05 후속 연계 카드와 추가 이브닝챗 영어 오버레이를 보강.
- P2/P3: 루트 중복 엔딩 PNG를 제거하고 `assets/images/endings/` 경로를 단일 기준으로 유지.
- 검증 보강: `tools/issue22_audit.js`를 추가하고 `tools/i18n-smoke.js`가 NP 뉴스풀, Issue #22 연계카드/이브닝/로그 오버레이를 점검하도록 확장.

### 검증 결과

- `node tools/validator.js`: 카드 548 / 고유 ID 548 / 이슈 0건.
- `node tools/i18n-smoke.js`: 통과.
- `node tools/issue22_audit.js`: 통과.
- `node tools/check_ending_routes.js`: 13/13 통과.
- `python tools/simulator_v3.py 20 all`: comply 즉사 0%, rebel 15%, careful 0%, explorer 0%, newbie 20%.
- Playwright CLI 스크린샷 스모크: `http://localhost:4173/index.html` desktop 1366x768 / mobile 390x844, BUILD_VER 187 부팅 화면 렌더 확인.

---

## 0-0. 2026-05-11 현재 기준 — Issue #21 P0~P3 보완 및 QA 재검증

### 현재 기준 수치

| 항목 | 수치 |
|---|---|
| 카드 | 548장 / 고유 ID 548 |
| 체인 | 메인 18 + 사건/후속 10 |
| 미션 | 15개 |
| 미니게임 연동 | 13개 임무 |
| 증거 | 38조각 + 15조합 |
| 이브닝챗 | 103엔트리, 하루 1명 대화 |
| 엔딩 | 16종 |
| 아카이브 | 47종 |
| 세이브 | 3슬롯 독립 저장/로드 구조 유지 |

### 이번 세션 완료

- Issue #21 P0: `EV-01` 출처를 `LOG-006` 기준으로 확인하고, `EV-02`는 실제 새벽 통신 로그인 `LOG-019`로 분리.
- Issue #21 P1: `C-332`, `CH-003-2`, `CA4-OR-02`, `CE-005`의 과도한 수치/ORACLE 편중을 완화.
- Issue #21 P1/P2: `C-015` 영어 함수형 선택지 라벨 렌더, `C-021` 조기 등장, `KC-06` 선행조건, 서하은 Act4 이브닝 조건을 보완.
- Issue #21 P2/P3: `TEST/`와 루트 `advance_button.png`를 릴리즈 추적 대상에서 제거하고 알파 ZIP 패키징 제외를 검증.
- README 기준 수치와 BUILD_VER를 2026-05-11 검증값으로 갱신.

### 검증 결과

- `node tools/validator.js`: 카드 548 / 고유 ID 548 / 이슈 0건.
- `node tools/i18n-smoke.js`: 통과.
- `node tools/check_ending_routes.js`: 13/13 통과.
- `node _workspace/codex/route-integrity-audit.js`: 대상 루트 무결성 통과.
- `node _workspace/codex/session-deck-affinity-audit.js`: 약한 세션팩 0, 메인 루트 카드 세션팩 누수 0.
- `python tools/simulator_v3.py 50 all`: comply 서사 98%, rebel 서사 72%, careful 서사 100%, explorer 서사 94%, newbie 서사 88%.
- Playwright 모바일 390x844 부팅/메뉴 스모크: BUILD_VER 184, 콘솔 오류 0건.

### 남은 관찰 지점

1. explorer/newbie 자동 전략은 Act 4 압박 엔딩 비중이 여전히 높으므로 인간 플레이테스트에서 체감 난도를 확인해야 함.
2. 이번 작업의 `_workspace/codex/*audit*` 산출물과 백업은 로컬 QA 자료이므로 릴리즈 패키지 기준 파일로 쓰지 않음.

아래 2026-05-06 기록은 변경 이력 보존용이다. 현재 판단 기준은 `README.md`, `-setup/GDD/TIU-GAME-GDD-v11.md`, `qa-report-2026-05-08.md`, `-setup/MD/TIU-ALPHA-CHANGELOG-2026-05-08.md`를 우선한다.

---

## 0-0. 2026-05-06 현재 기준 — late beta / release-candidate 준비 ✅

### 현재 기준 수치

| 항목 | 수치 |
|---|---|
| 카드 | 521장 / 고유 ID 521 |
| 체인 | 메인 18 + 사건/후속 10 |
| 미션 | 15개 |
| 미니게임 연동 | 9개 임무 |
| 증거 | 38조각 + 15조합 |
| 이브닝챗 | 103엔트리, 하루 1명 대화 |
| 엔딩 | 12정의 / 15실질 분기 |
| 아카이브 | 46종 |
| 세이브 | 3슬롯 독립 저장/로드 QA 통과 |

### 최근 안정화 완료

- `node tools/validator.js` 기준 정적 이슈 0건.
- 한국어 이브닝챗에서 영어 content bucket이 섞이던 문제 수정.
- 조사테이블은 `LOG-EV-UNLOCK` 이전에 진입/안내가 노출되지 않도록 교정.
- Act 2 임재혁 이브닝챗으로 조사테이블 해금 루트 확인.
- 세이브 슬롯 1~3 독립 저장/로드, logs/usedEvening/facilities/evidence combos/activeSpecs/chainQueue 보존 확인.
- 현장임무 후속 카드 생성, 미니게임 참조, 미션 노드 참조 정상 확인.
- 요청하지 않은 버튼/게이지/선택지 UI 변경은 원래 기준으로 복구하고, 향후 UI 변경은 명시 요청 범위만 적용.
- 2026-05-06 후속 결정: DLC 선택 허브와 허브 탭 이미지는 현재 본편 범위에서 제거. `새 세션 시작`은 바로 본편 새 세션으로 진입하며, DLC는 추후 별도 작업으로 분리.

### 다음 작업 우선순위

1. 한국어 완주 QA: Act 1~4, 엔딩 루트, 세이브/로드 분기, 이브닝챗/조사테이블 재점검.
2. 영어 인간 감수: 장문 카드, 이브닝챗, 조사테이블 로그 우선.
3. 스토어 자산: Steam/itch 스크린샷, GIF, 60초 트레일러, 캡슐 그래픽.
4. 베타 피드백 채널: Discord 또는 폼/이슈 템플릿 준비.

아래 2026-04-23 이전 기록은 변경 이력 보존용이다. 현재 판단 기준은 `README.md`, `-setup/GDD/TIU-GAME-GDD-v10.md`, `qa-report-2026-05-06.md`를 우선한다.

---

## 0-1. 2026-04-23 세션 — i18n 도입 + 플로우 개편 ✅

### 핵심 결과 (BUILD_VER 22 → 54)
- **i18n 인프라 본격 도입**: `i18n-runtime.js` 런타임 코어 + UI 언어팩(`lang-ui-ko/en.js`) + 콘텐츠 영어 오버레이 (`lang-content-en-all.js` 207KB, `lang-content-en-dialogues.js`). 설정 > 디스플레이에 언어 토글
- **렌더러 `t()`/`tt()`/`tc()` 통합 범위**:
  - Phase 1 (`0429de2`): 런타임 + Settings 토글
  - Phase 2 (`0d571cd`): CardC 본문/라벨, Boot/Stats/GameOver/Tutorial/ScenarioHub
  - Phase 3 (`f46f19b`): 이브닝챗, 다이얼로그, 엔딩, 브리핑, 미션 노드
- **플로우 개편**: Boot → **MainMenu** → **ScenarioHub** → 메인 스토리 서브메뉴 → Tutorial/Briefing/Game
  - ScenarioHub 슬롯 3종: `main` (active) / `dlc_green` (GREEN THRESHOLD — 소바리, locked) / `dlc_north` (NORTHERN FRONT — 러시아 북극권, locked)
  - MainMenu: 세션 선택 / SETTINGS / RECORDS(logs/archive/endings). 게임 시작 전 설정 접근 가능
  - GameOver 화면에서 Act2 restart 옵션 제거 (`313feb5`)
- **영어 레이아웃 핫픽스**: `style-i18n-hotfix.css` (게이지/모바일 선택지 버튼), `style-i18n-locale-hotfix.css` (영어 로케일 전용, `lang=en` 기반)
- **설정 저장 타이밍**: 언어 토글은 즉시 저장, locale 실제 적용은 패널 닫힘/저장 시점 (`eb6b94d`, `f985def`, `7d67294`)

### 카드/체인 버그 수정
- **C-060 "두 번째 탈북자"**: `LOG-DEFECTOR-1` 신규(`data-core.js`) → CH-004-2가 `LOG-009` + `LOG-DEFECTOR-1` 양쪽 해금 → C-060 조건을 체인 전용 `LOG-DEFECTOR-1`로 교체 (`data-cards-2.js`). 첫 탈북자 미경험 상태에서 두 번째 카드 등장하던 버그 해결 (`d350ef4`)
- **CA-SEED-02 전임지휘관 메모** (`a2167db`): `act:[1]` → `act:[2,3]`, day 6~14. Act 1 노출 시 B3 스포일러 — Act 2~3 복선으로 이동
- **C-236 텍스트** (`b8de4b9`): 본문 기지명 `KR-INIT-001 기지 주의` 삭제 → 간접 누출 묘사, 좌/우 선택 라벨 축약
- **이브닝챗 응답 매칭** (`3f013f7`): 2a/2b/2c 39개 엔트리 `responseKey` 전수 부여 + `data-evening-responses-3.js` 신규 (192줄)
- **글리치 정리** (`6439d31`): CA-014~017 시각 왜곡 제거, 용어 "아베란트 → 변이체" 통일

### 오디오 / UI 정비
- **크로스페이드 겹침** (`7c6c720`): `_crossfade` 시 타겟 외 트랙 즉시 pause, SFX `vol`/`muted` 반영, `_fadeIn` 매 스텝 `BGM.vol` 참조 → 슬라이더 실시간 반영
- **타이머 없는 카드 `0` 렌더** (`3c4ce93`): `timerTotal && ...` → `timerTotal > 0 && ...`
- **info-bar 태그 높이 통일** (`037780c`): `min-height + inline-flex` + 인라인 padding 제거
- **간부진 인트로 연쇄 재생 제거** (`42c0ced`): 카드 1장 → 인트로 1명 분산
- **텍스트 컬러 테마 적응** (`a2167db`): 하드코딩 녹색 `rgba(220,255,220,..)` → `var(--ui-text)`

### 미해결 / 이월
- DLC 슬롯 2종 (`dlc_green`, `dlc_north`) 콘텐츠 본체 미제작 — 허브 UI/이미지만 존재
- Act2 restart UI 제거 이후 `3c0b0e7`에서 추가한 Act1 core LOG 자동 부여 로직 잔재 정리 여부 판단 필요
- 영어 오버레이 207KB 자동 생성분 QA (번역 품질 감수)
- Act4 미니게임 노드 배경 6장 여전히 미제작 (BUILD_VER=22 이월 항목 유지)

---

## 0. 2026-04-20 (2차) — Act4 탈출 미니게임 인라인 배포 ✅

### 배경
- 기존 `components-escape.js`는 외부 GitHub Pages `https://art-lyang.github.io/tiu-field-mission/` iframe 로드
- **실측 상태**: 해당 URL 및 소스 저장소 모두 **HTTP 404** — 미니게임 완전 작동 불가
- iframe `onload`는 GitHub 404 HTML이 valid이라 발화 → `setErr` 분기 차단 → 10초 폴백도 미작동 → 사용자는 404 화면에서 영구 정지
- 사용자가 `tiu-field-mission.zip`(6.8MB, 45 파일) 제공 — 진짜 미니게임 본체

### 조치 (B안: 저장소 내부 인라인)
1. **`field-mission/`** 신규 폴더로 zip 해제 (7.1MB)
   - `index.html` + `css/` + `js/` 17개 + `assets/` (배경, 라이플, bound_shellwalker 스프라이트)
2. **`components-escape.js`** 수정:
   ```js
   // before: return 'https://art-lyang.github.io/tiu-field-mission/';
   return 'field-mission/index.html';
   ```
   - 6초 내 iframe 전역 `currentSector`/`SECTORS` 미발견 시 폴백 UI 노출 (404 방어)
3. **`app.js` onEscapeResult** — `flags.logs` 언팩 처리 추가:
   ```js
   if(r.flags && Array.isArray(r.flags.logs)){
     r.flags.logs.forEach(function(lid){if(typeof lid==='string')tryUnlock(lid)});
   }
   ```
4. **`mutants-patched.js` (209줄) 삭제** — field-mission/js/mutants.js와 중복된 옛 복사본 (index.html 미참조 확인 완료)
5. **BUILD_VER 21→22**, `components-escape.js?v=1→v=2` 캐시 버스팅

### 검증 (로컬 Preview 8080)
- field-mission/index.html → HTTP 200, title "TIU // FIELD MISSION — CONTAINMENT LINE"
- postMessage `tiu-escape-init` 송신 → iframe 내 `escapeState` 초기화 (동행자 4명, trust 값 전달 확인)
- 작전 개시 클릭 → `commander_office` intro 노드 진입, 선택지 2개 표시 (일반 출구 / B3)
- `sectorId='ACT4-ESCAPE'`, `isNodeMapSector=true`, `ACT4_NODEMAP` 전역 존재

### 미니게임 내부 알려진 미완 항목 (다음 세션 후보)
| 항목 | 영향 | 위치 |
|---|---|---|
| **배경 이미지 6장 누락** | 노드 전환 시 배경 미변화 (onerror 로그만, 플레이 가능) | `field-mission/act4-nodemap.js` 참조, `bg-commander-office.png` / `bg-base-interior.png` / `bg-base-exterior.png` / `bg-b3-descent.png` / `bg-emergency-corridor.png` / `bg-coast.png` 신규 필요 |
| **dmz 섹터 배경 누락** | Act3 사용 시 동일 문제 | `bg-dmz-gangwon.png` 신규 필요 |
| **임시 엔딩 화면** | 미니게임 내부 end 오버레이 placeholder 수준 (결과 postMessage는 정상) | `field-mission/js/flow.js:102` — `// 임시 엔딩 화면 (CCTV 엔딩 엔진은 다음 세션 작업)` |
| **뮤턴트 스프라이트 제한** | `bound_shellwalker`만 PNG, drone/runner는 procedural canvas | `field-mission/js/mutants.js` drawProceduralMutant |
| **루트 선택 UX 중복** | 카드 CH-007에서 이미 LOG-GENERAL-ROUTE / LOG-B3-ROUTE 부여됐는데 미니게임 `commander_office`가 동일 선택 재질문 | `field-mission/js/act4-nodemap.js:11` commander_office 노드 / `data-act4-escape.js:143-144` |

### 루트 선택 중복 해결 옵션 (권장 패치)
- **A안**: `components-escape.js`의 `sendInit` payload에 `logs`를 주입 → 미니게임 `config.js` postmessage 핸들러가 `escapeState.flags.preselectedRoute`를 세팅 → `flow.js startGame`에서 `LOG-GENERAL-ROUTE` 발견 시 `enterNode('base_gate')` 또는 `LOG-B3-ROUTE`일 때 `enterNode('b3_descent')`로 `commander_office` 건너뛰기
- **B안**: 카드 CH-007을 루트 미결정으로 변경하고 미니게임 commander_office가 유일한 선택 지점이 되도록
- A안이 구조 변화 최소

---

## 1. 2026-04-20 (1차) 이전 작업 이력

### A. Day1 CA-001 카드 5장 중 3장 중복 출현 버그 수정 ✅
- **파일**: `app-init.js` (drawCard 함수, 약 19~28줄)
- **원인**: React 함수형 컴포넌트의 closure stale. `performSwipe`의 setTimeout 콜백과 `hDlg`가 stale `logs` 참조 → `ONCE-CA-001` 플래그 누락
- **수정 패턴**:
  ```js
  var liveLogs = (typeof Save!=='undefined'?(Save.getLogs()||logs):logs)||[];
  var alreadyShown = liveLogs.indexOf('ONCE-'+firstId)>=0
                  || logs.indexOf('ONCE-'+firstId)>=0;
  if(!alreadyShown){ ... force first card ... }
  ```

### B. 시설 설계도 한글 기본화 + 한영 버튼 깨짐 수정 ✅ (커밋 `b6c3da7`)

### C. 200줄 초과 파일 분리 ✅ (3개 파일)
| 원본 | 줄수 | → 분리 결과 |
|---|---|---|
| `data-evening-extra-2.js` | 486 | `2a` (139) + `2b` (121) + `2c` (80) + `2d` (147) |
| `data-facility-uprising.js` | 293 | `-a` (107) + `-b` (132) |
| `data-cards-prologue.js` | 202 | 본체 (118, CA-001~018) + `-2` (90, CA-019~033) |

### D. 로컬 폴더 동기화 ✅

---

## 2. 200줄 초과 미분리 파일 (현행 기준)

```
360  data-facility.js          ← 단일 큰 객체 리터럴, 분리 위험 (속성 할당 변환 필요)
341  app.js                    ← React 컴포넌트 + 클로저 공유, 분리 시 회귀 위험
285  components-game.js        ← 동상
226  data-endings.js           ← ENDING_DEFS 단일 객체. F/G만 후속 파일에서 키 할당 분리 가능
```

**변경점**: 이전 목록의 `209 mutants-patched.js` 항목 제거 (2026-04-20 2차에서 삭제)

**권장 분리 순서**:
1. `data-endings.js` — F/G 키만 `data-endings-2.js`로 분리 (`if (typeof ENDING_DEFS!=='undefined') ENDING_DEFS['F']={...}`)
2. `app.js` / `components-game.js` — 함수 단위로 분리 시 setState 콜백 클로저 깨짐 주의. 보류 권장
3. `data-facility.js` — `FACILITY_EXPANSIONS`, `FLOOR_DEFS` 등 export 단위로 분리 가능

---

## 3. 보류된 작업 (이전 세션부터 이월)

### Archive UI 개선 (Deferred)
- 잠긴 항목 표시 `@` → `●` 변경
- 11개 사전 해금 후보 조사 + 개선안 제시
- 관련 파일: `components-archive.js` (현 200줄 미만)

---

## 4. 핵심 수정 경로 빠른 참조

```
worktree:  `.claude/worktrees/magical-cray-74f8c4`
local:     repository root

# 카드게임 핵심 로직
app-init.js      — drawCard / 강제 첫 카드 / Save.getLogs 직접 조회
app.js           — React App 컴포넌트, hDlg/performSwipe/nextCard/tryUnlock/onEscapeResult
app-utils.js     — Save 모듈 (saveLogs/getLogs/getSessions)
app-logic.js     — 보상/체인/일일 처리

# Act4 탈출 미니게임
components-escape.js           — iframe 래퍼 (URL='field-mission/index.html')
logic-act4-escape.js           — 확률 판정 폴백 (resolveEscape)
data-act4-escape.js            — 탈출 서사 데이터 + LOG-B3-ROUTE / LOG-GENERAL-ROUTE 부여
field-mission/index.html       — iframe 진입점
field-mission/js/flow.js       — startGame / reportEscapeResult (postMessage 송신)
field-mission/js/config.js     — postMessage 수신 + URL 파라미터 파싱
field-mission/js/escape-state.js — Act4 전용 state
field-mission/js/act4-nodemap.js — 노드 맵 정의 (commander_office→...→coast)
field-mission/js/node-map.js   — 노드 진입/전환 엔진
field-mission/js/mutants.js    — 뮤턴트 로직 (옛 mutants-patched.js의 올바른 판본)

# 데이터 파일 (분리됨)
data-cards-prologue.js + data-cards-prologue-2.js
data-evening-extra-2a/2b/2c/2d.js
data-facility-uprising-a/-b.js

# 캐시 무효화
index.html: var BUILD_VER=54

# i18n (2026-04-23 신규)
i18n-runtime.js              — locale / t() / tt() / tc() / ts-locale-changed 이벤트
lang-ui-ko.js, lang-ui-en.js — UI 언어팩
lang-content-en-all.js       — 콘텐츠 영어 오버레이 (207KB, 18 phase 통합)
lang-content-en-dialogues.js — 통신 대화 영어
components-settings-hotfix.js — locale 지연 적용

# 플로우 (2026-04-23 신규)
components-game.js Boot / MainMenu / ScenarioHub / Stats / ...
app.js phase 라우팅: boot → menu → hub → tutorial → briefing → game
```

### postMessage 스키마 (카드 ↔ 미니게임)

```
카드 → iframe:
  {type:'tiu-escape-init', gi, day, ammo, hp,
   survivors:{haeun,doyun,sejin,jaehyuk:{alive,trust,departed/injured}},
   flags:{promMet, haeunStayed, shellTalkerKnown}}

iframe → 카드:
  {type:'tiu-escape-result', outcome, route,
   companionsFinal:[id...], casualtiesFinal:[id...],
   detection, flags:{logs:[...], ...}, kills, accuracy, hp}
```

### React closure 함정 패턴 (재발 방지 메모)
- setState 콜백 안에서 `Save.saveLogs(n)` 동기 호출됨 → localStorage는 즉시 갱신
- 그러나 같은 setState로 setLogs는 비동기 → 다음 리렌더 전까지 컴포넌트 closure의 `logs`는 stale
- setTimeout/event handler closure에서 logs 의존 분기를 할 때는 **반드시 `Save.getLogs()` 직접 조회** 또는 setState 콜백 인자 사용

---

## 5. 다음 세션 시작 시 권장 명령

```bash
# 1) 저장소 루트 또는 필요한 로컬 worktree로 이동
cd <repository-root>

# 2) 상태 확인
git status
git log --oneline -10

# 3) Preview 실행 (Claude Preview MCP)
#    .claude/launch.json: name="game" (python3 -m http.server 8080)

# 4) 작업 후 BUILD_VER 반드시 +1 (index.html 20번째 줄)
```

---

## 6. 알려진 이슈 / 주의사항

- **Windows 환경**: PowerShell `Get-ChildItem` 이슈로 줄 수 카운트는 Python 사용 권장 (`python -c "..."`)
- **Python 인코딩**: `set PYTHONIOENCODING=utf-8` + `sys.stdout.reconfigure(encoding='utf-8')`
- **Preview 캐시**: BUILD_VER + 개별 `?v=N` 둘 다 갱신 필요한 경우가 있음. 수정한 파일의 ?v를 올리는 습관
- **미니게임 배경 누락**: 현재 bg-sector07.png만 존재. Act4 탈출 6개 노드 배경 미제작 (노드 전환시 배경 유지됨)
- **로컬 main 폴더 미커밋**: 이번 세션과 무관한 변경분이 다수 존재. 정리 필요 여부 판단 필요
