# 릴리즈 사전 점검

## 설명

릴리즈, 푸시, 패키징, 공개 QA 빌드 전에 사용하는 최종 Codex 체크리스트입니다.

## 사용할 때

사용자가 릴리즈 QA, 배포 준비, 최종 확인, 패키징, 푸시 준비를 요청할 때 사용합니다.

## 절차

1. `harness/CHECKLIST-release.md`를 읽습니다.
2. 실행합니다.

```bash
node tools/validator.js
```

3. 관련 시뮬레이션을 실행합니다.

```bash
python tools/simulator_v3.py 100 all
```

4. 언어 파일이 바뀌었으면 `node tools/i18n-smoke.js`를 실행합니다.
5. UI/런타임 파일이 바뀌었으면 브라우저 스모크 QA를 실행합니다.
6. 상태를 확인합니다.

```bash
git status --short
```

7. 관련 없는 변경을 정리, 리셋, 삭제하지 않습니다.

## 결과 보고

READY 또는 BLOCKED, 실행 명령, 이슈, 남은 수동 확인을 보고합니다.
