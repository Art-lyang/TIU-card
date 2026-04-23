# BreachMiniGame busy-lock — 설계 결정 기록

> **작성**: 2026-04-24
> **대상 파일**: `components-minigames.js` — `BreachMiniGame` (line 262~421)
> **관련 커밋**: `8103ecd` (Fix: trace minigame double-click race in moveTo)
> **목적**: 동일 이슈가 다시 제기될 때 재조사 시간을 줄이기 위한 결정 기록.

---

## 1. 해결된 버그

**증상**
- KEY 노드 빠른 연속 클릭 시 `keys=[X, X]` 처럼 같은 키가 중복 적재
- TRAP 노드 빠른 연속 클릭 시 `trapHits`/`exp`가 한 번에 +2
- 사용자 체감 1회 이동인데 `exp>=8` 실패 조건이 트리거되는 경우 발생

**원인**
- `moveTo`는 렌더 시점 클로저에서 `current`/`keys`/`exp`/`trapHits`를 읽고 함수형 setState 호출
- 첫 클릭 이후 React 리렌더가 버튼 `disabled`를 갱신하기 전에 두 번째 클릭이 도착
- `adjacency` 검사는 `current` 기준이라 여전히 통과
- `setKeys(prev => prev.concat([id]))`가 두 번 실행되어 배열이 중복 확장

---

## 2. 채택된 수정 (현재 main)

```js
var busy = useRef(false);
busy.current = false;           // 렌더 본문에서 매 렌더 리셋

function moveTo(id){
  if(finished.current || busy.current) return;
  ...
  busy.current = true;          // 유효 진입 시 락
  setCurrent(id); ...
}
```

- 같은 tick 내 동기적 재진입: `busy.current === true`로 차단
- 다음 렌더 본문에서 `busy.current = false` 복원 → 리렌더 후 정상 이동 허용

---

## 3. 대안 (미채택) — useEffect 클리어

```js
var busy = useRef(false);

useEffect(function(){
  busy.current = false;
}, [current, keys, exp, trapHits]);
```

**채택 안 한 이유**
- `element.click()` 같은 **synthetic click**이 commit 직후~useEffect 실행 전 윈도우에 진입할 경우, useEffect 방식은 락이 이미 풀린 상태라 차단 실패 가능성이 남음
- 렌더 본문 클리어는 그 윈도우에서도 `busy.current === true`가 유지되므로 한 층 더 촘촘

**대안이 더 나은 경우**
- Concurrent Mode / StrictMode를 프로젝트 전역에 적용 — 렌더 본문 side-effect가 예측 불가
- React 19+ 가 렌더 본문 mutation을 strict 검증하는 상황

---

## 4. 트레이드오프 요약

| 관점 | render-body 클리어 (현재) | useEffect 클리어 |
|---|---|---|
| 같은 tick 연속 클릭 차단 | ✅ | ✅ |
| React 권장 패턴 | ❌ | ✅ |
| Concurrent/StrictMode 안전성 | ⚠️ | ✅ |
| Synthetic click (`element.click()`) 방어 | ✅ | ⚠️ |
| 구현 단순성 | ✅ (2줄) | (effect 1개 추가) |

**주의**: 양쪽 모두 같은 tick 내 동기 중복은 막지만, **`finished.current`가 종료 락 역할을 이미 하고 있으므로** `onDone` 중복 호출은 이 락과 무관하게 방지됨.

---

## 5. 재조사 트리거 (이 문서를 다시 볼 순간)

다음 중 하나라도 해당되면 useEffect 방식으로 전환 검토:

1. 저장 데이터에 `keys` 배열 중복 항목이 다시 나타남
2. 단일 이동으로 `trapHits` 또는 `exp`가 +2 이상 증가
3. 프로젝트에 `<React.StrictMode>` 또는 Concurrent features 도입
4. React 19+ 업그레이드
5. 유사한 "복수 setState 묶음" 패턴의 미니게임이 추가되어 공통 락 헬퍼가 필요

---

## 6. 공통화 메모 (미래 작업)

Signal / Sequence / Breach 세 미니게임의 공통 중복:
- `finished = useRef(false)` + `onDone(rank)` 호출 패턴
- 1초 카운트다운 `useEffect` 블록
- 헤더 레이아웃 (`MI-XX` / 제목 / intro)

**미니게임이 2~3종 추가**되고 "락이 필요한 복합 state 전환"이 **2개 이상**이 되는 시점에 아래 순서로 리팩토링 판단:

1. `useMiniGameLifecycle(onDone)` — finished 락 + onDone 래퍼
2. `useCountdown(initial, onZero)` — 타이머 블록
3. 필요 시 `useReducer` 통합 (action-based)

**지금은 과설계**. 단일 케이스(Breach)에만 락이 필요하므로 현재 구조 유지.

---

## 7. 관련 코드 위치

| 라인 | 내용 |
|---|---|
| `components-minigames.js:313` | `finished = useRef(false)` — 종료 락 |
| `components-minigames.js:314` | `busy = useRef(false)` — 이동 락 선언 |
| `components-minigames.js:315` | `busy.current = false` — 렌더 본문 클리어 (핵심) |
| `components-minigames.js:346` | `moveTo(id)` 함수 시작 |
| `components-minigames.js:347` | 락 체크 `finished.current \|\| busy.current` |
| `components-minigames.js:350` | 락 설정 `busy.current = true` |
| `components-minigames.js:367` | 종료 판정 + `finished.current = true` |

---

## 8. 검증 방법 (회귀 확인)

1. Breach (Oracle Trace) 미니게임 진입
2. KEY 노드를 최대한 빠르게 연속 클릭 — 더블 탭, 터치 튐 재현
3. 종료 후 save 데이터에서 `keys` 배열 확인 — 중복 없어야 함
4. TRAP 노드에서 동일 테스트 — `trapHits` 1씩만 증가해야 함
5. 모바일/터치 환경에서 동일 시나리오 반복 (touchend→click 이중 발화 환경)
