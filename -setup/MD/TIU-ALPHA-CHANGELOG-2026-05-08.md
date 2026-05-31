# TIU_CARD Alpha Changelog - 2026-05-08

## Build

- Updated runtime reference to `BUILD_VER=178`.
- Current validated registry: 544 unique cards.

## 2026-05-10 후속 정리

- Current validated registry: 544 unique cards.
- Act 2에서 선택되었거나 관련 로그를 발견한 세션팩이 Act 3~4 후속 카드 가중치에 반영되도록 `sessionDeckLineageWeight`를 추가했습니다.
- 메인 루트 전환 카드(`transReq`)는 세션팩 보정 대상에서 제외해 필수 루트 잠김을 방지했습니다.
- 실제 사용 중인 이브닝챗 경로에 `sessionDeckEveningOk` 필터를 적용해 세션팩 대화 노출 기준을 통일했습니다.
- `B3_PREDECESSOR` 전용 Act 3~4 후속 카드 3장과 대응 LOG/영어 오버레이를 추가했습니다.
- Act 4 초반 중립 루트의 자동 전략 자원 탈락을 줄이기 위해 런타임/시뮬레이터 보정을 day 34까지 확장했습니다.

검증:

```text
node tools/validator.js
  cards 544 / unique 544
  issues 0

node tools/i18n-smoke.js
  i18n smoke ok

node tools/check_ending_routes.js
  ending route check passed: 11/11

node _workspace/codex/session-deck-affinity-audit.js
  weak packs 0
  route deck leaks 0

python tools/simulator_v3.py 100 all
  comply narrative 98.0% / instant 2.0%
  rebel narrative 86.0% / instant 14.0%
  careful narrative 88.0% / timeout 12.0%
  explorer narrative 98.0% / instant 2.0%
  newbie narrative 69.0% / instant 31.0%
```

## 2026-05-09 후속 정리

- `.claude/worktrees/`는 git 추적에서만 제거했습니다. 로컬 파일은 보존했습니다.
- A/B/D/F/G 특수 엔딩 조건을 직접 확인하는 `tools/check_ending_routes.js`를 추가했습니다.
- 엔딩 F가 Observer 승인 루트와 미승인 루트 양쪽에서 발생 가능함을 확인했습니다.

## Session Deck Packs

- Added the session deck-pack layer.
- Current rule: select 4 unique optional packs from 6 candidates per session.
- Core evidence, facility, field-mission, and save-normalization systems remain available outside optional pack selection.

Current pack candidates:

- `DG_MERIDIAN`
- `B3_PREDECESSOR`
- `PROMETHEUS_TENSION`
- `UPRISING_INFRA`
- `MUTANT_SURGE`
- `GOV_ORACLE_SUSPICION`

## New Cards

Added Prometheus tension follow-ups:

- `LJC-PROM-05`
- `LJC-PROM-06`
- `LJC-PROM-07`

Added government/ORACLE suspicion follow-ups:

- `GOV-ORC-04`
- `GOV-ORC-05`
- `GOV-ORC-06`

All new cards include matching logs and English overlay entries.

## Worldbuilding Cleanup

- Removed public-facing Sovari/Karuntal references from news and dialogue.
- Preserved the old restricted/internal Sovari signal card.
- Replaced the real-world medical-organization wording with generic international medical wording.
- Kept Haejinhoe-related public incident news as usable external world texture.

## UI / UX

- Reduced mobile main-menu vertical spacing.
- Verified the footer remains visible on a 390x844 viewport.
- Removed visible odd small-unit predictions such as `+2` from ORACLE-facing card text.

## QA

```text
node tools/validator.js
  issues 0

node tools/i18n-smoke.js
  i18n smoke ok

node tools/check_ending_routes.js
  ending route check passed: 11/11

python tools/simulator_v2.py 500 random
  narrative endings 392/500
  instant deaths 108/500
  timeouts 0

python tools/simulator_v3.py 20 all
  profile sweep completed
  careful/newbie reached narrative endings in most runs
  comply/rebel remain high-pressure automated profiles
```

See `../../qa-report-2026-05-08.md` for the full QA note.
