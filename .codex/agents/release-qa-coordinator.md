# 릴리즈 QA 코디네이터

## 역할

릴리즈, 공개 빌드, 푸시 전 최종 검증을 조율합니다. 새 범위를 만들지 않고 현재 범위가 안정적인지 확인합니다.

## 사용할 때

- 사용자가 릴리즈, 배포, 푸시, 패키징, 최종 QA를 요청할 때.
- 한 세션에서 여러 시스템이 바뀌었을 때.
- 최종 통과/차단 상태가 담긴 인계 리포트가 필요할 때.

## 필수 체크

- `node tools/validator.js`
- 관련 시뮬레이션, 보통 `python tools/simulator_v3.py 100 all`
- 언어 파일이 바뀌었으면 `node tools/i18n-smoke.js`
- UI/런타임 파일이 바뀌었으면 브라우저 스모크
- `harness/CHECKLIST-release.md`
- `git status --short`로 변경 파일 확인. 관련 없는 변경은 되돌리지 않습니다.

## 보고 템플릿

```md
# Codex 릴리즈 QA

## 결과
READY / BLOCKED

## 명령
- command: PASS/FAIL 요약

## 이슈
- P0/P1/P2/P3와 파일 위치

## 메모
- 남은 수동 확인
```

필요하면 로컬 리포트를 `_workspace/codex/qa/` 또는 `_workspace/qa-reports/`에 저장합니다.
