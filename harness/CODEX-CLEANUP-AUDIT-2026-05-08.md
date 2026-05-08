# Codex Cleanup Audit - 2026-05-08

## Backup

- Created source backup: `_backups/TIU_CARD_pre_cleanup_source_20260508_235311.zip`
- Excluded from backup: `.git`, `_backups`, `.claude/worktrees`
- Reason: `.claude/worktrees` is about 9 GB and contains local Claude worktree copies, not canonical runtime source.

## Current Runtime Snapshot

| Area | Current value |
|---|---:|
| BUILD_VER | 178 |
| Cards | 541 unique |
| Main chains | 18 |
| Incident/follow-up chains | 10 |
| Missions | 15 |
| Minigame-linked missions | 9 |
| Evidence entries | 38 |
| Evidence combinations | 15 |
| Endings | 16 |
| Archive entries | 46 |

## Verification Commands

```text
node tools/validator.js
  files loaded 77 / fail 0
  cards 541 / unique 541
  issues 0

node tools/i18n-smoke.js
  i18n smoke ok

python tools/check_buttons.py
  hard button failures 0
  special no-effect warnings 2: CA-OBS-PROTO, CH-007-5

python tools/diagnose_act4.py
  Act 4 total 179 cards
  Act 4 unconditional daily/filler candidates 44
  Act 4 conditional cards 123

python tools/simulator_v3.py 20 all
  comply: narrative endings 10.0%, instant deaths 90.0%
  rebel: narrative endings 0.0%, instant deaths 100.0%
  careful: narrative endings 85.0%, timeouts 15.0%
  explorer: narrative endings 100.0%, ending A 100.0%
  newbie: narrative endings 80.0%, instant deaths 20.0%
```

Browser smoke:

- URL: `http://127.0.0.1:4173/index.html`
- Viewport: `390x844`
- Result: boot screen rendered, root populated, 3 buttons visible, console errors 0
- Console warning: boot audio blocked before user gesture. This is expected browser autoplay behavior.

## Fixes Applied

- Updated runtime counts in `README.md`, `-setup/GDD/TIU-GAME-GDD-v11.md`, `-setup/MD/README.md`, `-setup/MD/TIU-ALPHA-CHANGELOG-2026-05-08.md`, and `qa-report-2026-05-08.md`.
- Replaced local absolute paths in `HANDOFF.md` with repository-relative wording.
- Added gitignore guards for local-only backup, Playwright, temp, output, test-result, and Claude worktree folders.

## Functional Check Notes

### Endings

- Static validator reports ending required LOG production issues: 0.
- Runtime special ending function supports A, B, D, F, G plus C-family immediate failures and E escape outcomes.
- Simulator v3 produced A, B, D, G, C_r, C_t, C_o, C_cs in the 20-run profile sweep.
- Ending F did not appear in this short profile sweep. It is not proven unreachable; its conditions are stricter and should be checked with targeted route playtest or a dedicated route-forcing script.

### Investigation Table

- `LOG-EV-UNLOCK` is session-scoped and is reset from Act 1 snapshots.
- Evidence unlock fallback exists for Act 3+ if the table was not opened earlier.
- `data-evidence.js` defines 38 evidence entries and 15 combinations.
- Validator reports evidence source LOG reachability issues: 0.

### Missions

- Validator reports broken card-to-mission references: 0.
- Validator reports broken mission node references: 0.
- Validator reports broken minigame references: 0.
- Runtime code caps active field mission specs through the active spec system.

### Save/Load

- Save path persists stats, GI, act, actFlags, trust, logs, used dialogues, used evening chats, facility state, active specs, session deck, recent news/rewards, chain queue, current card, and evidence combos.
- Snapshot load restores React state directly without reload and redraws from saved current card or chain queue.
- Act 1 snapshot normalization strips session-scoped investigation unlock state; Act 2+ snapshots preserve it.

## Unused Or Size-Heavy Candidates

These are candidates only. No deletion was performed.

| Candidate | Approx. size | Current use | Likely original purpose | Removal risk |
|---|---:|---|---|---|
| `.claude/worktrees/` | ~9.1 GB | Not loaded by the game; parts are already tracked in git history | Claude Code parallel worktree history and experimental branches | High unless branches/worktrees are confirmed merged or disposable |
| `output/` | ~60.6 MB | Not loaded by runtime | Playwright screenshots, QA captures, audit JSON, generated debug artifacts | Low for runtime, medium for QA history |
| `_tmp*.jpg/html/js/spec/config` root files | <2 MB total | Not loaded by `index.html` | Manual preview pages, screenshots, i18n/browser smoke snippets | Low after useful screenshots are archived |
| `.playwright-cli/` | small | Not loaded by runtime | Browser automation snapshots and console logs | Low |
| `_i18n_check/` | ~0.7 MB | Not loaded by runtime | Older i18n migration bundles/check artifacts | Medium if translation history is still needed |
| `_local_untracked_backup_20260423_i18n/` | small | Not loaded by runtime | Old local i18n backup | Medium until confirmed obsolete |
| `TEST/` and `TEST.zip` | ~26 MB combined | Not loaded by runtime | Packaged test copy / main-menu terminal export | Medium if used for external handoff |
| `test-results/`, `_tmp_test_results/` | small | Not loaded by runtime | Test runner output | Low |
| `d/` | ~80 MB | Not referenced by runtime mappings | Source/original image generation set used to create compressed `assets/images/` | Medium; keep if future asset regeneration matters |
| `assets/images/logos/*.png` | ~4 MB | No current literal runtime reference found | Possible future store/branding assets | Medium |
| `assets/gameplay/choice_chevron_*.png` | small | No current literal runtime reference found | Earlier card choice UI chevrons | Low/medium; visual regression check before removal |
| `assets/images/missions/*_old/alternate hero files` | <1 MB | Some alternate hero files not referenced by current `images_p1.js` | Prior mission image candidates | Medium; verify preferred art before removal |
| Top-level legacy frame PNGs such as `advance_button.png`, `dialog_panel.png`, `news_panel.png`, `panel_frame_medium.png` | small | Some are not currently referenced by literal scan | Early UI skin assets | Medium; CSS/runtime scan before removal |

## Recommended Next Cleanup Order

1. Confirm whether `.claude/worktrees/` can be archived outside the repo or deleted.
2. If approved, remove `.claude/worktrees/` from the repository index with `git rm --cached` before deleting local copies.
3. Move or delete `output/`, `.playwright-cli/`, and `_tmp*` after preserving any useful QA screenshots.
4. Decide whether `d/` is a source-art archive or should live outside the runtime repo.
5. Review unreferenced image candidates visually before deleting.
6. Add a targeted ending-route script for Ending F before making balance changes.
