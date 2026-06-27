#!/usr/bin/env bash
# 푸시 전 자동 검증 훅 (PreToolUse / Bash git push).
# 1) node tools/validator.js — 데이터 무결성 (validator는 항상 exit 0 → 출력으로 판정)
# 2) node --check — root + demo 의 JS 구문 검사
# 실패 시 exit 2 로 git push 를 차단하고 사유를 stderr 로 모델에 전달한다.
set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO" 2>/dev/null || exit 0   # 레포를 못 찾으면 게이트 미적용(차단하지 않음)

# 1) 데이터 무결성
if [ -f tools/validator.js ]; then
  VOUT="$(node tools/validator.js 2>&1)"
  if printf '%s' "$VOUT" | grep -q '총 이슈'; then
    echo "❌ 푸시 차단 — validator 무결성 실패:" >&2
    printf '%s\n' "$VOUT" | grep -A40 '이슈 리포트' | head -40 >&2
    exit 2
  fi
fi

# 2) JS 구문 검사 (앱/로직 코드)
SYNTAX_FAIL=""
for f in *.js demo/*.js; do
  [ -e "$f" ] || continue
  if ! ERR="$(node --check "$f" 2>&1)"; then
    SYNTAX_FAIL="${SYNTAX_FAIL}
${f}: ${ERR}"
  fi
done
if [ -n "$SYNTAX_FAIL" ]; then
  echo "❌ 푸시 차단 — JS 구문 오류:" >&2
  printf '%s\n' "$SYNTAX_FAIL" >&2
  exit 2
fi

exit 0
