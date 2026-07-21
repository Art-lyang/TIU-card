# TERMINAL SESSION - Game Design Document v1.12 Release Delta

> Current runtime snapshot for `BUILD_VER=452` / 2026-07-20.
> This document is a release delta on top of `TIU-GAME-GDD-v11.md` (BUILD 239 / 2026-05-28).
> All v11 rules remain in force unless restated or amended here.

## 1. Current Scope

TERMINAL SESSION is a static HTML card-command narrative game with three major play layers:

- Daily card command and resource pressure.
- Evening chat, relationship/faction context, and investigation-table review.
- Field missions and minigame-linked incident resolution.

Current content registry (`node tools/validator.js`, 2026-07-20):

| Area | Runtime count | v11 (BUILD 239) |
|---|---:|---:|
| Cards | 590 | 558 |
| Chains (main + incident) | 24 + 10 | — |
| Field missions | 19 | 15 |
| Minigame-linked missions | 13 | 13 |
| Minigame types | 13 | 10 |
| Evidence entries / combinations | 38 / 15 | 38 / 15 |
| Endings | 16 | 16 |
| Archive entries | 116 | 110 |
| ORACLE LOG (produced / core-defined) | 419 / 285 | — |
| Facility items (base + expansion) | 16 + 37 | 16 |
| Evening chat entries | ~135 | — |
| English i18n layer | full coverage, 16 files / ~675KB | — |

Release stance: the runtime is on the shipped track. Distribution surfaces exist for itch (paid + standalone demo), Android (Capacitor), and GitHub Pages. The highest remaining risks are discoverability/marketing, human balance playtest, and keeping store packaging synchronized with the shipped build — raw content volume is no longer a limiting factor.

## 2. Changes Since v11 (BUILD 239 → 452)

Narrative and content:

- Hidden observer-series concealment: locked hidden endings/archive/logs are excluded from album counts and totals until unlocked (BUILD 340).
- Kang Do-yun memorial/aftermath content and ORACLE research-check cards (BUILD 340).
- Lim Jae-hyuk collapse-to-defection arc with `execLost` officer-loss cascade and Act 4 route-card survivor consistency (BUILD 341-342).
- Ending-image reuse removed from gameplay surfaces; dedicated generated imagery pipeline for cards/endings (BUILD 346-347).
- Story surfacing batches 1+2: four forced-exposure narrative surfaces plus related bug fixes (BUILD 441).
- Commander journal: a private retrospective layer with mood tiers, direction refinement, and onboarding (BUILD 449, header simplified in 452).
- Card speaker chip (BUILD 459): every command card shows a speaker badge (portrait + name/role). Resolution order: explicit `speaker` field > `SPEAKER_ID_OVERRIDES` > name inference from card text > faction keywords > ORACLE default (`data-card-speakers.js`). Officer portraits reuse the evening emotion matrix (trust tier × act); factions use dedicated monochrome chips; hidden/observer cards are concealed behind a glitch badge. Character sheets for the commander and four officers are archived under `_workspace/asset-archive/character-sheets/`; the Do-yun and Ha-eun emotion sets were regenerated against those sheets (`*_v2.webp`).

Systems and balance:

- ORACLE relief card set (11 cards, BUILD 424): a narrow, sanctioned pressure-relief layer gated on `g>=0`, including Act 3 `r`-decay release. This is an amendment to v11 §5, not a repeal — broad route floors remain forbidden, terminal thresholds must stay reachable, and `C_cs` behavior is preserved.
- Card flash imagery (opt-in `flashImg`) and long-body readability (`dense` class) (BUILD 343-345).
- CCTV sting / ambush system: `EMERGENCY_AMBUSHES` registry plus `ambushPending()` helpers in `app-init.js` are the single source for trigger cards and minimap pre-warning. Sting videos must be H.264 (avc1) + faststart only (BUILD 430).

Packaging and distribution:

- Android packaging via Capacitor (`app-android/`, BUILD 425): embedded build, not TWA; no public site dependency; zero data collection in the app build; `versionCode` bumped manually per release. Safe-area insets and tap-highlight fixes for Android devices.
- itch release model (BUILD 429): paid full version ($4.99) plus a free standalone demo cut at the Act 2 boundary. The demo gate is a single choke point (`TS_DEMO` at `doBriefing`); `tools/export-itch.mjs` produces both zips. The v11 §11 standalone-demo rules remain binding.
- Asset optimization pass: APK payload reduced from ~70MB to ~32MB; mobile performance improvements (BUILD 439).

## 3. Rule Amendments

- Minigame guide (v11 §7) now covers 13 minigame types, not 10. Practice runs still grant no rewards and write no state.
- The relief layer is the only permitted systemic exception to the resource-failure model of v11 §5. New cards must not add hidden floors; any new relief-class card must go through the same `g`-gated set.
- New-content i18n pairing is mandatory: new missions ship narrative EN and dossier EN together; new LOGs ship their EN overlay in the same commit as the card EN (viewer surfaces fall back silently to KO otherwise).
- New card data files must be registered in `tools/validator.js` and simulator `CARD_FILES` in the same change, or they are silently excluded from validation and balance measurement.

## 4. QA Baseline (BUILD 452 / 2026-07-20)

```text
node tools/validator.js
  files 83 / failed 0
  cards 590 (unique 590)
  chains 24 main + 10 incident
  missions 19 / minigame-linked 13
  evidence 38 + combos 15
  endings 16
  archive 116
  LOG produced 419 / core-defined 285
  reference/structure issues: 0

node tools/i18n-smoke.js
  i18n smoke ok
```

Snapshot note: at validation time the working tree contained in-flight uncommitted edits (`app.js`, `style.css`, `components-briefing.js`, `data-archive.js`), producing a transient root↔demo drift warning on 3 files. Re-run the validator and `tools/demo-drift.sh` after that work lands and before any release export.

## 5. Remaining Watch Items

- Human balance playtest calibration is still outstanding (carried from v11 §9) — automated profiles are not a substitute for real first-session readings.
- Store packaging (screenshots, copy, version labels) must be re-cut against BUILD 452+; v11 §10 consistency checks apply with the current build number.
- English text quality on store-facing and first-session surfaces deserves a dedicated pass before wider English-market promotion.
- Discoverability is now the dominant commercial risk. Distribution-channel decisions (e.g., a Steam page with demo/wishlist funnel) are out of scope for this document but gate the value of further content expansion.
