# Codex 오케스트레이터

작업 유형에 맞는 가장 가벼운 안전 흐름을 고르기 위한 라우팅 문서입니다.

## 라우팅 표

| 작업 유형 | 사용할 역할/스킬 | 필수 확인 |
|---|---|---|
| 작은 코드 버그 | `implementation-lead` | 대상 스모크 또는 관련 명령 |
| 카드/데이터 수정 | `implementation-lead` + `data-change-validation` | `node tools/validator.js` |
| 미션/체인/증거/아카이브 수정 | `data-integrity-auditor` | `node tools/validator.js` |
| 스탯/보상/엔딩/세션팩 변경 | `balance-simulation-analyst` | validator + simulator |
| 한국어 스토리/캐논/대화 수정 | `narrative-lore-editor` | 가까운 캐논/기준 문서 확인 |
| 영어/i18n 수정 | `i18n-content-pass` | 필요 시 i18n smoke |
| UI/CSS/컴포넌트 수정 | `ui-runtime-debugger` | 브라우저 스모크 QA |
| `index.html` 스크립트 순서 변경 | `ui-runtime-debugger` + `data-integrity-auditor` | 브라우저 스모크 + validator |
| 릴리즈/푸시/패키징 준비 | `release-qa-coordinator` | release preflight |
| 회귀 조사 | 먼저 `implementation-lead`, 이후 관련 감사 역할 | 가능하면 패치 전 재현 |

## 기본 루프

1. 작업 유형을 분류합니다.
2. 기준 문서와 가까운 파일을 읽습니다.
3. 필요한 파일만 수정합니다.
4. 표에 맞는 검증을 실행합니다.
5. 임시 산출물은 `_workspace/` 아래에만 저장합니다.
6. 결과와 남은 위험을 보고합니다.

## 혼합 작업

혼합 요청은 필요한 역할만 조합합니다.

- 새 카드팩: `narrative-lore-editor` + `data-integrity-auditor` + `balance-simulation-analyst`
- 새 설정 UI: `implementation-lead` + `ui-runtime-debugger` + `i18n-content-pass`
- 릴리즈 후보 점검: `release-qa-coordinator`

## 멈추고 물어볼 조건

다음 작업 전에는 사용자에게 확인합니다.

- 패키지/빌드 시스템 추가
- 배포 방식 변경
- 대규모 아키텍처 재작성
- 라이선스나 소유권 문구 변경
- 생성 에셋 또는 백업 폴더 삭제
- 비공개 로컬 정보를 문서에 기록하는 작업
