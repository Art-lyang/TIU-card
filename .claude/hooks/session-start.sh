#!/bin/bash
# SessionStart 스모크 체크 (Claude Code on the web 전용).
# 이 프로젝트는 설치할 의존성이 없는 정적 사이트(node+python 기본 모듈만 사용)라
# 의존성 설치 대신, 세션 시작 시 데이터 무결성(validator)을 즉시 확인해 깨진 상태를 노출한다.
# 동기 실행 / 비대화 / 멱등. 무결성 이슈가 있어도 세션은 시작되며(비차단), 요약만 보고한다.
set -uo pipefail

# 웹(원격) 세션에서만 실행 — 로컬에선 건너뜀
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}" 2>/dev/null || exit 0

if [ -f tools/validator.js ]; then
  OUT="$(node tools/validator.js 2>&1)"
  SUMMARY="$(printf '%s\n' "$OUT" | grep -E '정적 검증 통과|총 이슈' | tail -1)"
  if printf '%s' "$OUT" | grep -q '총 이슈'; then
    echo "‼️ TIU-CARD validator — 데이터 무결성 이슈 감지: ${SUMMARY}"
    printf '%s\n' "$OUT" | grep -A30 '이슈 리포트' | head -30
  else
    echo "✅ TIU-CARD validator — ${SUMMARY:-정적 검증 통과}"
  fi
fi

exit 0
