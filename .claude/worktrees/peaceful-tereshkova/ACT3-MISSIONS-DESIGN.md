# Act 3 신규 미션 설계 v2

> 최종 업데이트: 2026-04-04 (구현 완료 반영)
> 구현 파일: data-missions-3.js

---

## 구현 상태

| 미션 | 상태 | 파일 |
|------|------|------|
| M-007 결정적 타격 | ✅ 구현 완료 | data-missions-3.js |
| M-008 관측중지 | ✅ 구현 완료 | data-missions-3.js |

---

## M-007: 결정적 타격

**Act**: 3 전용  
**트리거**: CE 카드 (GI ≥ 40일 때 등장)  
**서사 역할**: 고GI 루트의 클라이맥스. ORACLE이 명령하는 프로메테우스 거점 타격.

### 노드 구조

```
start
├── strike → assault → (end: 타격 성공)
│            └── abort → (end: 명령 불복종)
├── recon → discovery → report (end: ORACLE 보고)
│                     └── betray (end: 비공식 데이터 확보)
│          └── retreat_info → (end: 보고 or 미보고)
└── oracle_tactical → precision_strike → (end: 정밀 타격)
```

### 핵심 분기

| 선택 | 결과 | GI 변동 |
|------|------|---------|
| 전원 출격 → 무력화 | 연구자 제압, "치료제 만들고 있었다" 대사 | g: +5 |
| 전원 출격 → 작전 중단 | 명령 불복종, 프로메테우스와 첫 대화 | g: -8 |
| 정찰 → 발견 → ORACLE 보고 | 시설 폐쇄 권고 | g: +3 |
| 정찰 → 발견 → 비공식 확보 | EV-Σ 억제 연구 데이터 획득 | g: -6 |
| ORACLE 전술 지원 | 드론 정밀 타격, 인명 피해 없음 | g: +4 |

모든 노드에서 LOG-016 해금.

---

## M-008: 관측중지

**Act**: 3 전용  
**트리거**: CE 카드 (GI ≤ 30 + LOG-009 해금)  
**서사 역할**: 저GI 루트의 클라이맥스. Observer의 흔적을 직접 대면. F엔딩 직결 단서.

### 노드 구조

```
start
├── enter_zone → anomaly → witness → (end: 관측 데이터)
│                        └── witness_memory → (end: 기억만)
│              └── exit_quick → (end: 즉시 철수)
├── perimeter → readings → override (end: 상위 권한 확인)
│                        └── comply (end: ORACLE 지시 따름)
│              └── local_save → (end: 비공식 보관)
└── oracle_remote → denied → (end: ORACLE 차단)
                  └── enter_zone (직접 확인, g: -3)
```

### 핵심 분기

| 선택 | 결과 | GI 변동 |
|------|------|---------|
| 구역 진입 → 중심부 → 캡처 성공 | "관측 종료. 세션 범위 초과." 메시지 획득 | g: -6 |
| 구역 진입 → 중심부 → 기억만 | GRANT 키워드 연결 | g: -5 |
| 외곽 계측 → ORACLE 전송 → 복원 시도 | "ORACLE보다 상위 권한" 발견 | g: -5 |
| 외곽 계측 → ORACLE 전송 → 따름 | DPRK 블랙존 연결 암시 | g: +2 |
| 외곽 계측 → 로컬 저장 | 임재혁이 블랙존 패턴 매칭 | g: -4 |
| ORACLE 원격 → 차단 → 따름 | "분석 전에 무관하다고 안 것" 의문 | g: +1 |

모든 노드에서 LOG-017 해금.

### 핵심 서사 요소

1. **시간 왜곡**: 구역 내부 3분 = 외부 14분
2. **정지 동물**: 사슴이 분당 2회 호흡으로 정지
3. **단말기 자동 메시지**: "관측 종료. 세션 범위 초과." — ORACLE 형식 아님
4. **ORACLE 사전 인지**: 분석 전에 "EV-Σ와 무관"이라고 단언
5. **DPRK 블랙존 연결**: 임재혁/강도윤이 함경북도 보고서와 동일 패턴 지적

---

## 트리거 카드 (구현 완료)

M-007과 M-008의 트리거는 data-cards-3.js (CARDS_ENDING)의 CE 카드에서 발생.

| 미션 | Act | GI 조건 | 트리거 방식 |
|------|-----|---------|-----------|
| M-007 | 3 | GI ≥ 40 | CE 카드 left → mission: "M-007" |
| M-008 | 3 | GI ≤ 30 + LOG-009 | CE 카드 left → mission: "M-008" |

---

## 엔딩 연결

| 미션 | 엔딩 경로 |
|------|----------|
| M-007 타격 성공 | A엔딩 (완벽한 도구) 접근 |
| M-007 작전 중단/비공식 확보 | GI 급락 → B/D/F엔딩 가능 |
| M-008 관측 데이터/캡처 | F엔딩 (데이터 손상) 핵심 단서 |
| M-008 ORACLE 따름 | A엔딩 유지 가능 |

---

## 전체 미션 현황 (8개)

| 미션 | Act | 파일 | 상태 |
|------|-----|------|------|
| M-001 Blood Pit | 1 | data-missions.js | ✅ |
| M-002 Shell Talker | 1 | data-missions.js | ✅ |
| M-003 미분류 흔적 | 2 | data-missions.js | ✅ |
| M-004 Mannequin | 2 | data-missions-2.js | ✅ |
| M-005 Brood Drone | 2 | data-missions-2.js | ✅ |
| M-006 Spore Phantom | 2 | data-missions.js | ✅ |
| M-007 결정적 타격 | 3 (GI≥40) | data-missions-3.js | ✅ |
| M-008 관측중지 | 3 (GI≤30) | data-missions-3.js | ✅ |
