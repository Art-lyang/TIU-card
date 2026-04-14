# TIU-card — 시설도 게임 연동 설계 문서
## Facility-Game Integration Design Document

---

## 1. 개요 (Overview)

시설도(ORACLE Korea Branch Facility Schematic)를 카드 스와이프 게임 루프에 연동한다.
핵심 목표: **플레이어의 선택이 시설에 물리적으로 반영되는 것을 시각적으로 보여준다.**

### 연동 3대 축
1. **시설 확장 카드** — 게임 중 등장, 승인 시 리워드 풀에 추가
2. **데일리 리포트** — 뉴스 페이즈에서 시설 상태 변화 표시
3. **시설 상태 시각화** — 스탯에 따른 시설 손상/변화 + 순찰 루트 변경

---

## 2. 시설 확장 카드 시스템 (Facility Expansion Cards)

### 2.1 흐름

```
게임 중 확장 제안 카드 등장
  → 좌/우 스와이프 (승인/거절)
  → 승인: 해당 확장이 REWARDS 풀에 1회성 리워드로 추가
  → 리워드 페이즈에서 확장 리워드 선택 시:
      1) 시설도에 해당 구역 추가/업그레이드 반영
      2) 관련 자원 카드가 일반 카드 풀에 영구 추가
  → 거절: "대기 중 확장" 탭에 보관 (언제든 재선택 가능)
```

### 2.2 확장 카드 데이터 구조

```js
var FACILITY_EXPANSIONS = [
  {
    id: "FE-001",
    name: { en: "Cryogenic Storage Unit", ko: "저온 냉동고 확장" },
    desc: { en: "Expand basement cold storage for EV-Σ sample preservation.",
            ko: "EV-Σ 샘플 보존을 위한 지하 저온 보관 시설 확장." },
    // 카드에 표시될 안내문
    hint: { en: "▸ Approving adds 'Cryo Expansion' to reward pool",
            ko: "▸ 승인 시 보상 카드에 '냉동고 확장' 추가" },
    // 리워드로 선택 시 적용되는 fx
    rewardFx: { c: 0, r: -2, t: 0, o: 1 },
    // 확장 완료 후 카드 풀에 추가되는 새 자원 카드들
    newCards: ["C-FE001-A", "C-FE001-B"],
    // 시설도 변경사항
    facilityChange: {
      floor: "b2",
      roomId: "cryo_storage",  // 새로 추가되거나 업그레이드할 방 ID
      action: "add"            // "add" | "upgrade"
    },
    // 등장 조건
    condition: { minDay: 5, minAct: 1 },
    // 제안 카드 bg 타입
    cardBg: "facility"
  },
  {
    id: "FE-002",
    name: { en: "Outdoor Training Ground", ko: "간이 체육시설 확장" },
    desc: { en: "Build a temporary outdoor training area near the perimeter.",
            ko: "봉쇄 구역 인근에 임시 야외 훈련장 설치." },
    hint: { en: "▸ Approving adds 'Training Ground' to reward pool",
            ko: "▸ 승인 시 보상 카드에 '훈련장 확장' 추가" },
    rewardFx: { c: 1, r: -1, t: 1, o: 0 },
    newCards: ["C-FE002-A"],
    facilityChange: {
      floor: "exterior",
      roomId: "training_ground",
      action: "add"
    },
    condition: { minDay: 3, minAct: 1 },
    cardBg: "facility"
  },
  {
    id: "FE-003",
    name: { en: "Advanced Sensor Array", ko: "고급 센서 어레이" },
    desc: { en: "Install next-gen surveillance sensors along the perimeter.",
            ko: "봉쇄선 외곽에 차세대 감시 센서 설치." },
    hint: { en: "▸ Approving adds 'Sensor Upgrade' to reward pool",
            ko: "▸ 승인 시 보상 카드에 '센서 업그레이드' 추가" },
    rewardFx: { c: 2, r: -2, t: 0, o: 1 },
    newCards: ["C-FE003-A"],
    facilityChange: {
      floor: "exterior",
      roomId: "sensor_array",
      action: "add"
    },
    condition: { minDay: 8, minAct: 1 },
    cardBg: "facility"
  },
  {
    id: "FE-004",
    name: { en: "Medical Wing Upgrade", ko: "의무실 확장" },
    desc: { en: "Expand medical bay with isolation ward and advanced equipment.",
            ko: "격리 병동 및 고급 장비로 의무실 확장." },
    hint: { en: "▸ Approving adds 'Medical Upgrade' to reward pool",
            ko: "▸ 승인 시 보상 카드에 '의무실 확장' 추가" },
    rewardFx: { c: 0, r: -1, t: 2, o: 0 },
    newCards: ["C-FE004-A"],
    facilityChange: {
      floor: "level1",
      roomId: "medical_bay",
      action: "upgrade"
    },
    condition: { minDay: 6, minAct: 1 },
    cardBg: "facility"
  },
  {
    id: "FE-005",
    name: { en: "Supply Route Expansion", ko: "보급로 확장" },
    desc: { en: "Establish secondary supply corridor through mountain pass.",
            ko: "산악 통로를 통한 2차 보급로 개설." },
    hint: { en: "▸ Approving adds 'Supply Route' to reward pool",
            ko: "▸ 승인 시 보상 카드에 '보급로 확장' 추가" },
    rewardFx: { c: -1, r: 3, t: 0, o: 0 },
    newCards: ["C-FE005-A", "C-FE005-B"],
    facilityChange: {
      floor: "exterior",
      roomId: "supply_route_b",
      action: "add"
    },
    condition: { minDay: 10, minAct: 2 },
    cardBg: "facility"
  },
  {
    id: "FE-006",
    name: { en: "CCTV System Overhaul", ko: "CCTV 시스템 전면 교체" },
    desc: { en: "Replace aging CCTV infrastructure with AI-enhanced system.",
            ko: "노후 CCTV 인프라를 AI 강화 시스템으로 전면 교체." },
    hint: { en: "▸ Approving adds 'CCTV Overhaul' to reward pool",
            ko: "▸ 승인 시 보상 카드에 'CCTV 교체' 추가" },
    rewardFx: { c: 2, r: -1, t: 0, o: 1 },
    newCards: ["C-FE006-A"],
    facilityChange: {
      floor: "level1",
      roomId: "cctv_control",
      action: "upgrade"
    },
    condition: { minDay: 12, minAct: 2 },
    cardBg: "facility"
  },
  {
    id: "FE-007",
    name: { en: "Emergency Bunker", ko: "비상 대피 벙커" },
    desc: { en: "Construct underground emergency shelter for critical situations.",
            ko: "긴급 상황 대비 지하 비상 대피소 건설." },
    hint: { en: "▸ Approving adds 'Emergency Bunker' to reward pool",
            ko: "▸ 승인 시 보상 카드에 '비상 벙커' 추가" },
    rewardFx: { c: 1, r: -2, t: 1, o: 0 },
    newCards: ["C-FE007-A"],
    facilityChange: {
      floor: "b3",
      roomId: "emergency_bunker",
      action: "add"
    },
    condition: { minDay: 15, minAct: 2 },
    cardBg: "facility"
  },
  {
    id: "FE-008",
    name: { en: "Patrol Route Extension", ko: "순찰 경로 확장" },
    desc: { en: "Extend patrol coverage to northern mountain ridge.",
            ko: "북측 산악 능선까지 순찰 범위 확장." },
    hint: { en: "▸ Approving adds 'Patrol Extension' to reward pool",
            ko: "▸ 승인 시 보상 카드에 '순찰 확장' 추가" },
    rewardFx: { c: 2, r: -1, t: 0, o: 0 },
    newCards: ["C-FE008-A"],
    facilityChange: {
      floor: "exterior",
      roomId: "north_patrol",
      action: "add"
    },
    condition: { minDay: 7, minAct: 1 },
    cardBg: "facility"
  }
];
```

### 2.3 제안 카드 등장 규칙

- **빈도**: 하루(cpd 카드) 중 최대 1장, 확률 30%
- **조건**: `condition.minDay <= stats.day && condition.minAct <= act`
- **중복 방지**: 이미 승인되었거나 대기 중인 확장은 다시 제안하지 않음
- **카드 UI**: 기존 카드와 동일 스와이프, 하단에 `hint` 텍스트 표시 (연두색)
- **bg**: `"facility"` — 새로운 배경 스타일 (청록색 톤, 시설 아이콘)

### 2.4 승인/거절 처리

**승인 (→ 방향)**
```
1. approvedExpansions 배열에 추가
2. 해당 확장의 리워드가 다음 리워드 페이즈부터 REWARDS 풀에 포함
3. 리워드 타이틀에 "🔧" 또는 "[확장]" 접두사 표시
```

**거절 (← 방향)**
```
1. pendingExpansions 배열에 추가
2. 메뉴에서 "대기 중 확장" 탭으로 접근 가능
3. 탭에서 선택 시 즉시 approvedExpansions로 이동
```

### 2.5 리워드 선택 후 처리

확장 리워드를 선택하면:
```
1. rewardFx 적용 (일반 리워드와 동일 방식)
2. completedExpansions 배열에 추가
3. facilityChange에 따라 시설도 데이터 업데이트
4. newCards의 카드 ID들이 일반 카드 풀(CARDS)에 영구 추가
5. 시설도 접근 시 변경된 구역 하이라이트 (3일간 "NEW" 뱃지)
```

---

## 3. 데일리 리포트 (Daily Report in News Phase)

### 3.1 위치

현재 뉴스 페이즈 (`phase === 'news'`) 하단에 시설 상태 섹션 추가.

### 3.2 표시 내용

```
┌──────────────────────────────────┐
│  ORACLE DAILY REPORT  DAY XX    │
│                                  │
│  [기존 뉴스 헤드라인들]           │
│                                  │
│  ── FACILITY STATUS ──           │
│  ▸ 의무실: 정상 가동              │
│  ▸ 보급 창고: 자원 부족 경고 ⚠    │  ← r <= 30이면
│  ▸ CCTV 통제실: 업그레이드 완료 ✓ │  ← 최근 확장 완료 시
│  ▸ 저온 냉동고: 확장 대기 중       │  ← approved but not yet picked
│  ▸ 순찰 경로: 정상 운영            │
│                                  │
│  [CONTINUE]                      │
└──────────────────────────────────┘
```

### 3.3 상태 판정 로직

| 스탯 조건 | 시설 표시 |
|-----------|----------|
| c <= 25 | 보안실 — "경고: 봉쇄 불안정" (빨간색) |
| c <= 15 | 봉쇄 외곽 구역 — "침투 위험" (빨간 깜빡임) |
| r <= 30 | 보급 창고 — "자원 부족 경고" (주황색) |
| r <= 15 | 보급 창고 — "긴급: 비축량 고갈" (빨간색) |
| t <= 25 | 휴게실 — "사기 저하" (주황색) |
| t <= 15 | 체력단련실 — "인원 이탈 위험" (빨간색) |
| o <= 30 | 통신실 — "ORACLE 통신 불안정" (주황색) |

### 3.4 최근 확장 표시

- 이번 턴에 확장 리워드를 선택했으면: `"[구역명] 확장 완료 ✓"` (연두색)
- 승인했지만 아직 리워드 미선택: `"[구역명] 확장 대기 중"` (회색)

---

## 4. 시설 상태 시각화 (Facility Map Visual Feedback)

### 4.1 스탯 기반 시설 컬러 변화

시설도를 열었을 때, 현재 게임 스탯에 따라 방 색상이 변화:

| 스탯 범위 | 관련 방 변화 |
|-----------|-------------|
| c <= 25 | 보안실, CCTV실 → 빨간 테두리 + "ALERT" 뱃지 |
| r <= 25 | 보급 창고 → 빨간 테두리 + "CRITICAL" 뱃지 |
| t <= 25 | 휴게실, 체력단련실 → 어두운 톤 + "LOW MORALE" |
| o <= 25 | 통신실, 브리핑실 → 깜빡이는 테두리 |

### 4.2 확장 완료 방 표시

- 새로 추가된 방: 밝은 연두색 테두리 + "NEW" 뱃지 (3일간)
- 업그레이드된 방: 기존 방의 `desc`가 업데이트 + "UPGRADED" 뱃지

### 4.3 순찰 루트 변동

- 기본 루트: 항상 표시 (오렌지)
- 확장 루트 (FE-008 완료 시): 추가 루트 표시 (파란색)
- c <= 20일 때: 순찰 루트 일부 노드가 빨간색으로 변경 ("취약 구간")

---

## 5. 대기 중 확장 탭 (Pending Expansions Tab)

### 5.1 접근 방법

게임 화면 info-bar에 새 태그 추가:
```
[ACT 1] [카드 3/5] [LOG 8/19] [아카이브] [시설 ▸]
```

### 5.2 UI 구조

```
┌──────────────────────────────────┐
│  FACILITY EXPANSIONS             │
│                                  │
│  ── 대기 중 ──                    │
│  ┌─ 저온 냉동고 확장 ───────────┐ │
│  │ EV-Σ 샘플 보존 시설 확장     │ │
│  │           [승인하기]          │ │
│  └────────────────────────────┘ │
│                                  │
│  ── 진행 중 (리워드 대기) ──      │
│  ┌─ 간이 체육시설 ─────────────┐ │
│  │ 다음 리워드에서 선택 가능     │ │
│  └────────────────────────────┘ │
│                                  │
│  ── 완료 ──                      │
│  ┌─ 고급 센서 어레이 ✓ ────────┐ │
│  │ Day 12에 설치 완료           │ │
│  └────────────────────────────┘ │
│                                  │
│  [닫기]                          │
└──────────────────────────────────┘
```

### 5.3 동작

- **대기 중** 항목의 "승인하기" 클릭 → approvedExpansions로 이동, 리워드 풀에 추가
- **진행 중** 항목은 정보만 표시 (리워드 페이즈에서 선택해야 완료)
- **완료** 항목은 완료 일자와 함께 표시

---

## 6. 새 자원 카드 (Expansion Resource Cards)

확장 완료 시 추가되는 카드 예시:

```js
// FE-001 (저온 냉동고) 완료 후 추가
{ id:"C-FE001-A", who:"윤세진", text:"냉동고 샘플 분석 결과가 나왔습니다. 흥미로운 발견이에요.",
  bg:"research",
  left:{ label:"상세 보고 요청", fx:{c:0,r:-1,t:0,o:1}, g:-1 },
  right:{ label:"계속 관찰해", fx:{c:0,r:0,t:1,o:0}, g:0 }
},
{ id:"C-FE001-B", who:"임재혁", text:"냉동고 냉각 시스템 점검 완료. 전력 소모가 예상보다 높습니다.",
  bg:"supply",
  left:{ label:"전력 절약 모드", fx:{c:0,r:1,t:0,o:0}, g:0 },
  right:{ label:"최대 냉각 유지", fx:{c:0,r:-1,t:0,o:1}, g:-1 }
}
```

이 카드들은 `drawCard()` 에서 일반 카드와 동일하게 취급되나, `completedExpansions`에 해당 FE-ID가 있을 때만 풀에 포함.

---

## 7. 구현 순서 (Implementation Plan)

### Phase 1: 데이터 레이어
1. `data-facility.js` 생성 — FACILITY_EXPANSIONS + 새 자원 카드 정의
2. `app.js`에 상태 추가: `approvedExpansions`, `pendingExpansions`, `completedExpansions`
3. Save/Load 연동

### Phase 2: 카드 시스템 연동
4. `drawCard()`에 시설 제안 카드 등장 로직 추가
5. `swipe()`에서 facility 카드 승인/거절 분기 처리
6. 리워드 페이즈에 확장 리워드 동적 삽입

### Phase 3: UI
7. 카드 UI에 `hint` 텍스트 + facility 배경 스타일 추가
8. 대기 중 확장 탭 컴포넌트 구현
9. 뉴스 페이즈에 데일리 리포트 시설 상태 섹션 추가

### Phase 4: 시설도 연동
10. `oracle-floors.js`에 동적 방 추가/업그레이드 로직
11. 스탯 기반 시설 시각 피드백 (색상 변화, 뱃지)
12. 순찰 루트 동적 변경

### Phase 5: 저장 & 테스트
13. localStorage 저장/로드 전체 검증
14. 밸런스 테스트 — 확장 카드 등장 빈도, 자원 소모/획득 비율

---

## 8. 기술 고려사항

### 8.1 시설도 ↔ 게임 데이터 통신

시설도는 별도 HTML이므로, 게임 데이터를 `localStorage`를 통해 공유:
```js
// 게임 → 시설도
localStorage.setItem('tiu_facility_state', JSON.stringify({
  completed: completedExpansions,
  stats: { c, r, t, o },
  patrolExtended: completedExpansions.indexOf('FE-008') >= 0
}));

// 시설도에서 읽기
var state = JSON.parse(localStorage.getItem('tiu_facility_state') || '{}');
```

### 8.2 시설도 인라인 모드 (향후)

현재는 별도 페이지지만, 향후 게임 내 `phase === 'facility'`로 인라인 표시 가능.
iframe 또는 컴포넌트 통합 방식 모두 가능.

### 8.3 확장 카드 밸런스 가이드라인

- 확장 리워드 fx는 일반 리워드와 비슷한 수준 유지
- 새 자원 카드는 기존 카드 밸런스 범위 내 (fx 값 절대값 ≤ 2)
- Act 1에서 3~4개, Act 2에서 2~3개, Act 3에서 1~2개 등장 목표

---

## 9. 민간 위장 LOG 연계 (Cover Story Logs)

시설 확장 시 관련 민간 위장 LOG도 자동 해금:
- FE-001 (냉동고) → LOG-COVER-001: "강원 산간 냉동 창고 업체, 시설 증축 허가"
- FE-002 (훈련장) → LOG-COVER-002: "국유림 관리소, 산악 훈련장 조성 공사"
- FE-005 (보급로) → LOG-COVER-003: "강원도, 임도(林道) 정비 사업 착수"

이 LOG들은 별도 "민간 위장" 카테고리로 분류.

---

*문서 작성일: 2026-04-08*
*다음 단계: Phase 1 — data-facility.js 구현*
