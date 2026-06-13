# TIU-CARD Agent Orchestrator

작업 유형별 어떤 에이전트를 어떤 순서로 사용하는지 안내.

## 라우팅 표

| 상황 | 에이전트 순서 |
|------|-------------|
| 커밋 전 빠른 체크 | `integrity-verifier` (내부에서 validator 실행) |
| 푸시 전 QA | `release-qa-runner` (validator → i18n-smoke → ending-routes → sim 스모크 → asset → demo 동기화) |
| 카드 수정 후 | `card-balance-checker` → `narrative-consistency-checker` → `integrity-verifier` |
| 세션 팩/덱 작업 후 | `card-balance-checker`(팩별 집계) → `narrative-consistency-checker`(팩 격리) → `integrity-verifier` |
| 이브닝/대화 수정 후 | `tone-style-reviewer` → `narrative-consistency-checker` |
| 세계관 콘텐츠 추가 후 | `lore-checker` → `narrative-consistency-checker` |
| 아카이브 엔트리 작성 | `archive-writer` → `lore-checker` |
| Act 로직 변경 후 | `act-bug-scout` → `ending-pathfinder` |
| 미니게임/보상 변경 후 | `integrity-verifier`(FIELD_MINIGAME 참조) → `regression-bug-hunter` |
| 에셋 추가/이동 후 | `asset-reference-checker` |
| i18n 번역 작업 후 | `i18n-text-auditor` |
| 세이브 스키마/클라우드 세이브 변경 후 | `save-state-validator` |
| UI 페이지 추가/수정 | `page-builder` → `regression-bug-hunter` |
| 밸런스 대규모 조정 후 | `monte-carlo-simulator` → `difficulty-curve-profiler` → `resource-economy-analyzer` |
| 릴리즈 빌드 전 | `release-qa-runner` → `harness/CHECKLIST-release.md` 순서대로 |
| 회귀 버그 의심 | `regression-bug-hunter` |

## 검증 도구 (에이전트가 내부에서 실행)

| 도구 | 용도 |
|------|------|
| `node tools/validator.js` | 정적 무결성 12항목 (모든 데이터 변경 후 필수) |
| `node tools/i18n-smoke.js` | i18n 키 스모크 |
| `node tools/check_ending_routes.js` | 엔딩 루트 정적 점검 |
| `python tools/simulator_v3.py [N] [profile]` | 성격 프로필 시뮬 (all/comply/rebel/careful/explorer/newbie), 결과 `_workspace/sim-results/` |

## 원칙

- 진단 에이전트는 수정하지 않는다. 리포트를 읽고 사람이 판단한다.
- 리포트는 `_workspace/qa-reports/`에 저장한다.
- 에이전트 체인이 3개 이상이면 `release-qa-runner`로 묶어 돌린다.
- 루트 `data-*.js`/`lang-*.js` 변경 시 `demo/` 미러 동기화 여부를 항상 함께 확인한다.
- 게임 룰 기준값은 코드가 정답: Act 전환 day 5/14/29 (Act4 종료 day>35), 엔딩 GI ≥10/≥-15/≥-30/그 외, 자원 c/r/t/o 0~100 시작 50 (c는 0·100 양방향 게임오버).
