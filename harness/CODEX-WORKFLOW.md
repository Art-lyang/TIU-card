# Codex 작업 흐름

## 접수

작업 유형을 먼저 구분합니다.

- 데이터/콘텐츠
- UI/런타임
- i18n
- 밸런스
- 서사/세계관
- 릴리즈/패키징
- 조사/리뷰

그다음 `harness/CODEX-ORCHESTRATOR.md`에서 맞는 경로를 고릅니다.

## 수정 전 읽기

항상 읽을 것:

- `AGENTS.md`
- 관련 가까운 파일
- 동작에 영향을 주는 작업이면 현재 인계 문서 또는 QA 리포트

필요할 때만 읽을 것:

- `README.md`: 현재 프로젝트 구조
- `HANDOFF.md`: 최근 작업 상태
- `-setup/GDD/TIU-GAME-GDD-v11.md`: 최신 설계 델타
- `-setup/MD/`: 캐논이 중요한 작업

## 수정

- 변경 범위를 좁게 유지합니다.
- 기존 코딩 스타일을 따릅니다.
- 일반 작업에 JSX, 모듈, 번들러, 패키지 설치를 도입하지 않습니다.
- 런타임 JS 파일을 추가하면 `index.html`의 스크립트 태그를 업데이트합니다.
- 사용자에게 보이는 문구가 바뀌면 i18n 오버레이를 확인합니다.
- workflow 자체가 바뀔 때만 검증 문서를 수정합니다.

## 검증

위험도에 따라 선택합니다.

```bash
node tools/validator.js
node tools/check_ending_routes.js
python tools/simulator_v3.py 100 all
node tools/i18n-smoke.js
python -m http.server 4173
```

로컬 서버 명령은 브라우저 스모크 테스트용입니다. 세션 상황에 맞게 종료하거나 재사용합니다.

## 작업 산출물

Codex 로컬 메모는 `_workspace/codex/`, 시뮬레이션 JSON은 `_workspace/sim-results/`에 둡니다. 기준 문서는 `_workspace/` 밖에 둡니다.

권장 로컬 전용 경로:

```text
_workspace/codex/drafts/
_workspace/codex/qa/
_workspace/codex/screenshots/
_workspace/sim-results/
```

## 인계

최종 보고에는 다음을 포함합니다.

- 무엇을 바꿨는지
- 왜 바꿨는지
- 실행한 검증 명령과 결과
- 검증하지 못한 항목 또는 남은 수동 확인
