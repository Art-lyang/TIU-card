# TIU_CARD Alpha Changelog - 2026-05-08

## Build

- Updated runtime reference to `BUILD_VER=178`.
- Current validated registry: 541 unique cards.

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
