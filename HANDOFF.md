# TIU-CARD 작업 인수인계 (Handoff)

> **작성일**: 2026-04-20 (2차 업데이트)
> **작업 worktree**: `C:\Users\Administrator\TIU_CARD\.claude\worktrees\magical-cray-74f8c4`
> **브랜치**: `claude/magical-cray-74f8c4` (worktree) — 로컬 본체는 `main`
> **마지막 BUILD_VER**: `22`

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
worktree:  C:\Users\Administrator\TIU_CARD\.claude\worktrees\magical-cray-74f8c4
local:     C:\Users\Administrator\TIU_CARD

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
index.html: var BUILD_VER=22
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
# 1) worktree 위치 이동
cd "C:/Users/Administrator/TIU_CARD/.claude/worktrees/magical-cray-74f8c4"

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
