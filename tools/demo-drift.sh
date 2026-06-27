#!/usr/bin/env bash
# demo-drift.sh — 데모(demo/)와 본편(루트) 사이의 "실제 내용" 드리프트 리포트.
#
# 목적: demo는 나중에 별도 앱으로 분리할 자립형 복제본이라, 너무 벌어지기 전에
#       중간중간 동기화한다. 단, 데모 전용 코드(TIU_DEMO 등)는 덮으면 안 되므로
#       blind copy 대신 이 리포트로 안전하게 분류해서 처리한다.
#
# 분류:
#   [stale·동기화가능]   루트가 더 최신이고 데모 전용 마커 없음 → root→demo 반영 안전
#   [데모전용·수동병합]  TIU_DEMO / META-SESSION-RESET / demoEarly 포함 → 수동 머지
#   (줄바꿈만 다름)       CRLF/LF 차이뿐 → 무시 (집계만)
#
# 사용: bash tools/demo-drift.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

stale=0; special=0; crlf=0; missing=0
echo "=== demo ↔ 본편 드리프트 ==="
for f in *.js; do
  [ -f "$f" ] || continue
  if [ ! -f "demo/$f" ]; then
    echo "  [demo 없음]        $f"; missing=$((missing+1)); continue
  fi
  # 공백/줄바꿈 무시한 실제 내용 차이 줄 수
  n=$(diff -w "$f" "demo/$f" 2>/dev/null | grep -c '^[<>]')
  if [ "$n" -eq 0 ]; then
    diff -q "$f" "demo/$f" >/dev/null 2>&1 || crlf=$((crlf+1))
    continue
  fi
  if grep -qE 'TIU_DEMO|META-SESSION-RESET|demoEarly' "demo/$f"; then
    echo "  [데모전용·수동병합] $f  (${n}줄)"; special=$((special+1))
  else
    echo "  [stale·동기화가능]  $f  (${n}줄)"; stale=$((stale+1))
  fi
done
echo "---"
echo "stale(동기화 가능): ${stale} | 데모전용(수동병합): ${special} | 줄바꿈만 다름: ${crlf} | demo누락: ${missing}"
[ "$stale" -eq 0 ] && echo "✅ 안전하게 동기화할 stale 파일 없음" || echo "↑ stale 파일은 root→demo 반영 검토"
