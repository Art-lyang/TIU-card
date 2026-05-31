# TIU-CARD Agent Orchestrator

작업 유형별 어떤 에이전트를 어떤 순서로 사용하는지 안내.

## 라우팅 표

| 상황 | 에이전트 순서 |
|------|-------------|
| 커밋 전 빠른 체크 | `integrity-verifier` |
| 푸시 전 QA | `release-qa-runner` (validator → integrity → i18n → asset) |
| 카드 수정 후 | `card-balance-checker` → `narrative-consistency-checker` → `integrity-verifier` |
| 이브닝/대화 수정 후 | `tone-style-reviewer` → `narrative-consistency-checker` |
| 세계관 콘텐츠 추가 후 | `lore-checker` → `narrative-consistency-checker` |
| 아카이브 엔트리 작성 | `archive-writer` → `lore-checker` |
| Act 로직 변경 후 | `act-bug-scout` → `ending-pathfinder` |
| 에셋 추가/이동 후 | `asset-reference-checker` |
| i18n 번역 작업 후 | `i18n-text-auditor` |
| 세이브 스키마 변경 후 | `save-state-validator` |
| 밸런스 대규모 조정 후 | `monte-carlo-simulator` → `difficulty-curve-profiler` → `resource-economy-analyzer` |
| 릴리즈 빌드 전 | `release-qa-runner` → `harness/CHECKLIST-release.md` 순서대로 |
| 회귀 버그 의심 | `regression-bug-hunter` |

## 원칙

- 진단 에이전트는 수정하지 않는다. 리포트를 읽고 사람이 판단한다.
- 리포트는 `_workspace/qa-reports/`에 저장한다.
- 에이전트 체인이 3개 이상이면 `release-qa-runner`로 묶어 돌린다.
