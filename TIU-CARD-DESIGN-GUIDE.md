# TERMINAL SESSION — 카드 설계 가이드 v3

> 최종 업데이트: 2026-04-08 (321장 반영)

## 카드 구조

```js
{
  id: "C-XXX",              // 고유 ID
  act: [1,2],               // Act 소속 (필수)
  priority: "상/중/하",      // 카드 상단 표시
  tag: "spec-011",          // 쿨다운 태그 (선택, 3일 간격)
  bg: "forest",             // 배경 이미지 키 (선택)
  transReq: "B",            // 전환 루트 전용 (선택)
  req: (s,g,logs) => ...,   // 출현 조건 (선택)
  msg: "카드 본문",          // \n으로 줄바꿈
  left: {
    label: "선택지",
    fx: { c:0, r:0, t:0, o:0 },
    g: 0,
    mission: "M-XXX",       // 미션 트리거 (선택)
    trust: 10               // 신뢰도 변동 (선택)
  },
  right: { label: "선택지", fx: { c:0, r:0, t:0, o:0 }, g: 0 },
}
```

## 필드 설명

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | `C-XXX`, `CE-XXX`, `CT-XXX`, `CS-XXX` |
| `act` | array | 활성 Act 목록 `[1]`, `[1,2]`, `[2,3]` 등 |
| `priority` | string | `"상"` / `"중"` / `"하"` — 카드 상단 표시 |
| `tag` | string | 쿨다운 태그. 같은 태그 카드는 3일 간격 |
| `bg` | string | 배경 이미지 키 (아래 목록 참조) |
| `transReq` | string | `"B"` / `"C"` / `"D"` — 해당 전환 루트에서만 등장 |
| `req` | function | `(stats, gi, logs) => boolean` — 출현 조건 |
| `msg` | string | 카드 본문 (`\n`으로 줄바꿈) |
| `fx` | object | `{ c, r, t, o }` — 스탯 변동 (×5 배율) |
| `g` | number | 유도지수 변동 (직접 적용) |
| `mission` | string | 미션 ID — 스와이프 시 미션 진입 |
| `trust` | number | 신뢰도 변동 (대화 이벤트에서 사용) |

## fx 값 가이드

- 각 값은 **×5 배율** 적용 (1 = 실제 +5)
- 권장 범위: **-3 ~ +3**
- `r: 3` 이상은 사용하지 않음 (r:2 상한)
- g(유도지수): ORACLE 따르면 +, 독립 행동 -

## 배경 이미지 키

| 키 | 이미지 | 용도 |
|----|--------|------|
| `base` | 연구소 복도 | 기지 내부, 인사, 시설 |
| `forest` | 외곽 산길 | 순찰, 봉쇄선, 야외 |
| `forest2` | 숲+기지 원경 | 원거리 외부 |
| `lab` | 분석장비/연구실 | 연구, 샘플, 의료 |
| `oracle` | ORACLE 연구실 | ORACLE 관련 |
| `comms` | 지휘시설 | 통신, 정보, 지휘 |
| `restricted` | 봉쇄구역 | 봉쇄, 제한 구역 |
| `supply` | — (미등록) | 보급 관련 |
| `weather` | — (미등록) | 날씨 관련 |
| `shield_off` | 차폐막 해제 | 특수 상황 |
| `shield_on` | 차폐막 작동 | 특수 상황 |

## 게이지 아이콘

상태 표시 아이콘은 `tiu_status_icons_symbol_only/` 폴더의 이미지를 사용합니다.

## ID 접두사 규칙

| 접두사 | 파일 | 용도 |
|--------|------|------|
| `C-001~088` | data-cards-1/2.js | 기존 카드 |
| `C-091~100` | data-cards-4.js | 이변체 연쇄 |
| `C-101~156` | data-cards-5/6.js | 자원/Act1 일상 |
| `C-133~152` | data-cards-7.js | Act2 일상 |
| `C-157~176` | data-cards-10.js | 추가 카드 |
| `C-177~178` | data-cards-4.js | 이변체 미조우 |
| `C-179~192` | data-cards-11.js | 연계 체인 이벤트 |
| `C-193~214` | data-cards-12.js | Act 1~2 신규 |
| `C-213~232` | data-cards-13.js | Act 2~3 신규 |
| `C-233~247` | data-cards-14.js | Act 3 보강 |
| `C-248~260` | data-cards-15.js | 외부 인물 |
| `CE-001~028` | data-cards-3.js | 엔딩 루트 |
| `CT-001~011` | data-cards-8.js | 전환 루트 |
| `CS-001~015` | data-cards-9.js | 서하은 분기 |
| `CH-XXX-N` | data-chains.js | 연쇄 카드 내부 |

## 카드 카테고리별 현황 (321장)

| 카테고리 | 수 | 파일 |
|----------|----|----|
| 공통 운영 Core | 11 | cards-1 |
| Act 1 전용 | 7 | cards-1 |
| Act 1→2 공유 | 13 | cards-1 |
| Act 2 전용 | 29 | cards-1/2 |
| Act 2→3 공유 | 17 | cards-1/2 |
| Act 3 전용 | 10 | cards-2 |
| 엔딩 루트 | 28 | cards-3 |
| 이변체 연쇄 | 12 | cards-4 |
| 자원/일반 운영 | 14 | cards-5 |
| Act 1 일상 | 22 | cards-6 |
| Act 2 일상 | 20 | cards-7 |
| 전환 루트 | 11 | cards-8 |
| 서하은 분기 | 11 | cards-9 |
| 추가 카드 | 20 | cards-10 |
| 연계 체인 | 13 | cards-11 |
| Act 1~2 신규 | 20 | cards-12 |
| Act 2~3 신규 | 20 | cards-13 |
| Act 3 보강 | 15 | cards-14 |
| 외부 인물 | 12 | cards-15 |
| 체인 카드 | 13 | chains |

## 연쇄 카드 (CHAINS)

```js
CHAINS["CH-XXX"] = {
  name: "이름",
  trigger: "C-XXX-left/right",
  cards: [ { id:"CH-XXX-1", ... }, ... ]
}
```
현재 6개: CH-001~006

## 이변체 태그 (쿨다운 3일)

`spec-001`(마네킹), `spec-003`(브루드), `spec-008`(스포어), `spec-011`(쉘토커), `spec-012`(블러드핏)

## 날씨 태그

`tag: "weather"` — 같은 날 1장만 등장. C-025, C-126, C-127, C-149, C-150.

## 간부 자기소개 시스템 (INTRO_FILTER)

| 로그 | 해금 조건 |
|------|---------|
| `LOG-INTRO-SH` | 서하은 간부 자기소개 완료 |
| `LOG-INTRO-KD` | 강도윤 간부 자기소개 완료 |
| `LOG-INTRO-YS` | 윤세진 간부 자기소개 완료 |
| `LOG-INTRO-IJ` | 임재혁 간부 자기소개 완료 |
| `LOG-INTRO-SY` | 박소영 자기소개 완료 |

자기소개 완료 전에는 해당 간부 이름이 포함된 카드가 등장하지 않습니다.

## 미션 트리거

| 카드 | 미션 | 비고 |
|------|------|------|
| C-096 | M-001 (Blood Pit) | left/right 각각 다른 접근 |
| C-097 | M-002 (Shell Talker) | left/right 각각 |
| C-098 | M-004 (Mannequin) | left/right 각각 |
| C-099 | M-005 (Brood Drone) | left/right 각각 |
| C-100 | M-006 (Spore Phantom) | left/right 각각 |
| C-042 left | M-003 (미분류 흔적) | |
| CE 카드 | M-007 (결정적 타격, GI≥40) | |
| CE 카드 | M-008 (관측중지, GI≤30) | |

## 미션 3선택지 시스템 (v0.5)

M-001, M-002, M-004에 적용:

| 선택 | 결과 | 추가 LOG |
|------|------|---------|
| 제거 작전 | c+2, r-1, o+1 | 기본 LOG만 |
| 연구용 확보 | r-2, t+1, o-1 | LOG-RES-xxx 추가 |
| ORACLE 원격 (g+2) | c+1, t-1, o+2 | 기본 LOG만 |

포획 연구 LOG: LOG-RES-012(Blood Pit), LOG-RES-011(Shell Talker), LOG-RES-001(Mannequin)

## LOG 해금 매핑

### 카드 기반
| 카드 | LOG | 비고 |
|------|-----|------|
| C-006 | LOG-003 | 프로메테우스 첫 접촉 |
| C-003 | LOG-004 | Shell Talker |
| C-010 | LOG-005 | Blood Pit |
| C-042/043 | LOG-013 | SPEC-001 |
| C-044/045 | LOG-014 | SPEC-003 |
| C-046/047 | LOG-015 | SPEC-008 |

### 관찰 LOG (복합 조건, v0.5)
| 카드 | LOG | 조건 |
|------|-----|------|
| C-091 | LOG-020 | LOG-RES-012 + sejin ≥ 40 |
| C-092 | LOG-021 | LOG-RES-011 + jaehyuk ≥ 40 |
| C-093 | LOG-022 | LOG-RES-001 + sejin ≥ 50 |
| C-094 | LOG-023 | doyun ≥ 50 |
| C-095 | LOG-024 | sejin ≥ 55 |

### 진실 LOG (GI 상한 잠금, v0.5)
| 카드 | LOG | GI 상한 |
|------|-----|---------|
| CH-004-2 | LOG-009 | g ≤ 5 |
| C-053/CH-005-2 | LOG-016 | g ≤ 10 |
| C-067 | LOG-017 | g ≤ 5 |
| C-074/CH-006-2 | LOG-018 | g ≤ 0 |
| C-079/C-086 | LOG-019 | g ≤ -5 |

### 전환 루트 카드
| 카드 | LOG |
|------|-----|
| CT-001~011 | LOG-030~040 |

### 서하은 루트
| 카드/방향 | LOG | 의미 |
|----------|-----|------|
| C-073 left | LOG-051 | 전출 저지 시도 |
| C-073 right | LOG-050 | 전출 확정 |
| CS-001 | LOG-053 | 이의 제출 |
| CS-002 | LOG-054 | 추가 이의 |
| CS-003 | LOG-052 | 잔류 확정 |
| CS-004 | LOG-055 | 서하은 감사 |
| CS-010 | LOG-056 | 임재혁 인수 |
| CS-013~015 | LOG-057~059 | 간부 반응 |

### 외부 인물 LOG (v0.5)
| 카드 | LOG | 인물 |
|------|-----|------|
| CH-005-3 | LOG-080 | 베버 접선 완료 |
| C-248 left | LOG-081 | 포스터 대면 |
| C-249 left | LOG-081-DATA | 포스터 데이터 수령 |
| C-250 | LOG-081-INTEL | 포스터 인텔 공유 |
| C-081 left | LOG-082 | 박소영 합류 |
| C-252 | LOG-082-REPORT | 박소영 첫 보고 |
| C-253 | LOG-083 | 박소영 정체 발각 |

### 연계 체인 LOG (v0.5)
| 카드 | LOG | 체인 |
|------|-----|------|
| C-001 right | LOG-062 | 신규요원 트리거 |
| C-109/C-159 | LOG-GYM | 체력단련 |
| C-174/C-140 | LOG-FREEZER | 냉장실 |
| C-179 left | LOG-063 | 엄격 재훈련 |
| C-179 right | LOG-064 | 실전 투입 |
| C-180 | LOG-063-DONE | 성공 |
| C-181 | LOG-065 | 부상 |
| C-182 | LOG-065-ATK | 습격 |
| C-183 | LOG-065-END | ORACLE 종료 |
| C-023 right | LOG-066 | 식수 오염 트리거 |
| C-145 right | LOG-067 | 식수 오염 2 |
| C-111 right | LOG-068 | 식수 오염 3 |
| C-184 | LOG-069 | 식중독 |
| C-185 | LOG-069-CREW | 요원 감소 |
| C-186 | LOG-069-END | ORACLE 경고 |
| C-041 right | LOG-070 | 야간 습격 트리거 |
| C-163 right | LOG-071 | 야간 습격 2 |
| C-018 right | LOG-072 | 야간 습격 3 |
| C-084 left | LOG-073 | 야간 습격 4 |
| C-188 | LOG-074 | 야간 습격 발생 |
| C-189 | LOG-074-DONE | 강도윤 생존 |
| C-190 | LOG-075 | 강도윤 사망 |
| C-191 | LOG-074-ORC | 생존 후 ORACLE |
| C-192 | LOG-075-ORC | 사망 후 ORACLE |

### 기타
| 조건 | LOG |
|------|-----|
| day≥1 | LOG-001 |
| day≥3 | LOG-002 |
| day≥7 | LOG-011 |
| GI≤-15 | LOG-009 |
| GI≤-30 | LOG-010 |
| 서하은 신뢰 ≥70 | LOG-006 |
| 윤세진 신뢰 ≥70 | LOG-007 |
| 강도윤 신뢰 ≥65 | LOG-008 |
| 임재혁 대화 2단계 | LOG-012 |

## 카드 중복 방지 시스템

| 메카닉 | 설명 |
|--------|------|
| recentCards | 최근 20장 버퍼 — 이 안의 카드는 재등장 불가 |
| 태그 쿨다운 | 같은 tag 카드는 3일 간격 |
| LOG 1회성 | `req: !logs.includes("LOG-XXX")` — LOG 해금 후 퇴장 |

## 자원 리스크 시스템

`r >= 2` 획득 시 20% 확률로 실패. 해당 카드의 r만 0으로, 다른 스탯 정상 적용. 빨간 토스트 2.5초.

## 새 카드 추가 규칙

1. 적절한 data-cards-N.js 파일에 추가
2. 해당 배열 변수에 포함
3. app-utils.js의 CARDS 병합에 해당 변수 포함 확인
4. `act` 필드 필수
5. 1회성 이벤트는 `req`에 LOG 조건 + app.js checkLogs에 해금 추가
6. 연쇄는 data-chains.js에 추가
7. 파일이 200줄 초과 시 새 파일 분리 → index.html에 스크립트 추가
8. 미션 log 필드: 단일 문자열 또는 배열 가능 (v0.5, 포획 경로 등)
