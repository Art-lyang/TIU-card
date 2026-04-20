# TIU-CARD 작업 인수인계 (Handoff)

> **작성일**: 2026-04-20
> **작업 worktree**: `C:\Users\Administrator\TIU_CARD\.claude\worktrees\magical-cray-74f8c4`
> **브랜치**: `main` (worktree)
> **마지막 BUILD_VER**: `21`

---

## 1. 이번 세션에서 완료한 작업

### A. Day1 CA-001 카드 5장 중 3장 중복 출현 버그 수정 ✅
- **파일**: `app-init.js` (drawCard 함수, 약 19~28줄)
- **원인**: React 함수형 컴포넌트의 closure stale 문제. `performSwipe`의 setTimeout 콜백과 `hDlg`가 stale `logs` 참조 → `ONCE-CA-001` 플래그 누락 → 강제 첫 카드 블록이 매번 통과
- **수정 패턴**:
  ```js
  // localStorage 직접 조회로 stale closure 회피
  var liveLogs = (typeof Save!=='undefined'?(Save.getLogs()||logs):logs)||[];
  var alreadyShown = liveLogs.indexOf('ONCE-'+firstId)>=0
                  || logs.indexOf('ONCE-'+firstId)>=0;
  if(!alreadyShown){ ... force first card ... }
  ```
- **검증**: Preview에서 iter 0 → CA-001 정상 출현, iter 1 → DLG-임재혁 (중복 없음)

### B. 시설 설계도 한글 기본화 + 한영 버튼 깨짐 수정 ✅
- 커밋: `b6c3da7`
- (이전 세션 작업, 이번 세션은 검증만)

### C. 200줄 초과 파일 분리 ✅ (3개 파일)
| 원본 | 줄수 | → 분리 결과 |
|---|---|---|
| `data-evening-extra-2.js` | 486 | `data-evening-extra-2a.js` (139) + `2b.js` (121) + `2c.js` (80) + `2d.js` (147) |
| `data-facility-uprising.js` | 293 | `data-facility-uprising-a.js` (107) + `-b.js` (132) |
| `data-cards-prologue.js` | 202 | `data-cards-prologue.js` (118, 핵심 CA-001~CA-018) + `-2.js` (90, 보충 CA-019~CA-033) |

- **분리 패턴**: 첫 파일에서 `var X = [...]` 또는 `var Y = {...}` 선언 → 후속 파일은 `if (typeof X !== 'undefined') X.push(...)` 또는 직접 키 할당
- **index.html 갱신**: 각 분리 파일 `<script src="...">` 추가, 원본 라인 교체, 원본 파일 삭제
- **검증 (BUILD_VER=21)**: Preview에서 콘솔 에러 0건, `CARDS=439`, `CARDS_PROLOGUE=34`, `CHAINS["CH-008"].cards=6`, `ENDING_DEFS["H"]=ok`, `checkUprisingReady=function`

### D. 로컬 폴더 동기화 ✅
- worktree → `C:\Users\Administrator\TIU_CARD\` 루트로 변경 파일 11개 복사 + 삭제 파일 2개 제거 완료
- (※ 로컬 main 폴더에는 별도의 미커밋 변경분이 있으니 주의 — 이번 세션과 무관한 기존 작업분)

---

## 2. 200줄 초과 미분리 파일 (다음 세션 후보)

```
360  data-facility.js          ← 단일 큰 객체 리터럴, 분리 위험 (속성 할당 변환 필요)
341  app.js                    ← React 컴포넌트 + 클로저 공유, 분리 시 회귀 위험
285  components-game.js        ← 동상
226  data-endings.js           ← var ENDING_DEFS = {A,B,D,F,G,H} 단일 객체. F/G만 후속 파일에서 ENDING_DEFS['F']=... 식으로 분리 가능
209  mutants-patched.js        ← index.html에서 미참조. 사용 여부 확인 후 제거 또는 분리
```

**권장 분리 순서**:
1. `mutants-patched.js` — 먼저 사용 여부 확인. 미사용이면 삭제로 정리
2. `data-endings.js` — F/G 키만 `data-endings-2.js`로 분리 (구조: `if (typeof ENDING_DEFS!=='undefined') ENDING_DEFS['F']={...}`)
3. `app.js` / `components-game.js` — 함수 단위로 분리 시 setState 콜백 클로저 깨짐 주의. 보류 권장
4. `data-facility.js` — `FACILITY_EXPANSIONS`, `FLOOR_DEFS` 등 export 단위로 분리 가능

---

## 3. 보류된 작업 (이전 세션부터 이월)

### Archive UI 개선 (Deferred)
- 잠긴 항목 표시 `@` → `●` 변경
- 11개 사전 해금 후보 조사 + 개선안 제시
- 관련 파일 후보: `components-archive.js` (현 200줄 미만)

---

## 4. 핵심 수정 경로 빠른 참조

```
worktree:  C:\Users\Administrator\TIU_CARD\.claude\worktrees\magical-cray-74f8c4
local:     C:\Users\Administrator\TIU_CARD

# 핵심 로직 파일
app-init.js      — drawCard / 강제 첫 카드 / Save.getLogs 직접 조회
app.js           — React App 컴포넌트, hDlg/performSwipe/nextCard/tryUnlock
app-utils.js     — Save 모듈 (saveLogs/getLogs/getSessions)
app-logic.js     — 보상/체인/일일 처리

# 데이터 파일 (분리됨)
data-cards-prologue.js + data-cards-prologue-2.js
data-evening-extra-2a/2b/2c/2d.js
data-facility-uprising-a/-b.js

# 캐시 무효화
index.html: var BUILD_VER=21
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
- **Preview 캐시**: 파일 수정 후 BUILD_VER 미증가 시 브라우저 캐시 때문에 변경이 반영 안 됨. 항상 BUILD_VER 증가 + 새 ver 쿼리스트링 적용
- **로컬 main 폴더 미커밋**: 이번 세션과 무관한 변경분이 다수 존재 (`git status` 시 README, building/, components 다수 M). 정리 필요 여부 판단 필요
