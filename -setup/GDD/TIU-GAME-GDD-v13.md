# TERMINAL SESSION - Game Design Document v1.13 Release Delta

> Current runtime snapshot for `BUILD_VER=483` / 2026-07-24.
> This document is a release delta on top of `TIU-GAME-GDD-v12.md` (BUILD 452 / 2026-07-20).
> All v11/v12 rules remain in force unless restated or amended here. Section 3 carries the load-bearing amendments (relief model + transition non-lethality).

## 1. Current Scope

Play layers are unchanged from v12 (daily card command + resource pressure; evening chat / relationship / investigation table; field missions + minigames).

Runtime registry (`node tools/validator.js`, 2026-07-24):

| Area | BUILD 483 | v12 (BUILD 452) |
|---|---:|---:|
| Cards | 592 | 590 |
| Chains (main + incident) | 24 + 10 | 24 + 10 |
| Field missions | 19 | 19 |
| Endings | 16 | 16 |
| Archive entries | 116 | 116 |
| ORACLE LOG (produced / core-defined) | 420 / 285 | 419 / 285 |

Two new cards since v12: `C-278` (SPEC-015 re-track) and `A3-SUPPLY-03` (transition bridge). Validator: 0 structural issues; `i18n-smoke ok`.

## 2. Changes Since v12 (BUILD 452 -> 483)

Narrative and content:

- Commander journal — choice retrospectives. `MEMO_BY_CHOICE` (in `components-journal.js`) expanded to 116 keyed `cardId|direction` entries spanning the whole Act 1-4 story spine, so the journal alone conveys "what story is unfolding now." Zero new save data — the card id + direction are already journaled, so existing saves benefit retroactively. Route/act mood pools were widened (each route 2 -> 3 lines) and route/act moods now cycle by first-appearance index (mirroring the bond-mood fix), removing adjacent-day repeats.
- `C-278` SPEC-015 (Brain Seeker) re-track card. Closes the `LOG-041-PARTIAL` dead state: the "부상만 입힘 / 재추적 필요" branch of M-010 previously promised a re-hunt that no card delivered (the trigger card is non-repeatable). `C-278` fires on `LOG-041-PARTIAL && !LOG-041`; both choices grant `LOG-041`, so the thread always resolves. `tag: spec-015` keeps investigation/ambush routes mutually exclusive.

Localization:

- EN audit + canonical romanization pass (see §3 for the locked table). The dialogue speaker chip source (`data-card-speakers.js`) — the single highest-visibility name surface — was the main offender and is now aligned. Zero Korean leakage remained in card/LOG/dialogue/evening/archive EN.
- Minigame result-narrative EN backfill. `FIELD_MINIGAME_NARRATIVES["M-002"]` and `["MI-01"]` (24 result blocks) had no `.en` overlay, so EN players saw Korean on two commonly-reached missions. Filled using the existing MI-04 `ko`/`en` pattern in `data-minigame-rewards.js`.

Systems and robustness (save / replay / journal):

- `_onceShown` bootstrap now has an `Array.isArray` guard (`app-utils.js`). A corrupted `ts_onceShown` value previously threw on every load, and the crash-guard's reload path re-hit the same corrupt key — an unrecoverable in-app crash loop. Fixed.
- `doGO` re-entry guard (`goingRef`, `app.js`). Non-card end paths (evening / dialogue / mission finish) were unguarded; a double-tap at a death threshold called `incSession()` twice, inflating the session counter and skipping a session-scaled content tier on the next run.
- `Journal.push` de-duplication (`t+id+day+d`) and cap raise (400 -> 1000). Blocks same-day duplicate bond/card lines and preserves early-Act journal entries in long campaigns.
- `Save` dual-definition hardened (the legacy `app-utils.js` copy was resynced to the authoritative `app-init.js` semantics) and `tools/validator.js` now asserts `app-utils.js` loads before `app-init.js`, so a script-order regression can't silently revert the save layer.
- Cloud sync now includes `ts_journal`; conflict-recommendation compares progress (day/act) before save-revision.

Balance (amends the relief model — see §3):

- Relief gating is now **state-based**. The 11 relief cards open on genuine resource/trust crisis (`r<=25` / `t<=25`) regardless of GI, closing the grey-zone (GI -34..-1) blind spot that excluded the median new player (GI ~ -3..-5). Outside crisis, the compliance gate is retained.
- New transition-bridge card `A3-SUPPLY-03` (forceFlow, tag-cooldown, crisis-triggered) produces `LOG-RELIEF-SUPPLY` to halt Act 3 `r`-decay.
- Act transition penalty is now **non-lethal**: `Math.max(5, clamp(s.x - penalty))` on each stat. The transition still damages but can no longer be the killing blow.
- GI-only dominant cards (11) given a resistance-side trade-off (+1 `t` = +5 trust): `C-051, C-057, C-059, C-061, C-077, CE-002, DG-04, C-248, C-256, C-276`, plus `MD-03` (its neutral side). The "always compliance" pick is no longer stat-free.

Tooling:

- `tools/simulator.py` (`parse_side`) now parses `floor` / `floorCriticalOnly`. The simulator's v3 apply path already read `side['floor']`, but the loader never populated it — so the game's primary death-prevention mechanism (relief + safeguard floors) was invisible to the sim, inflating every measured death rate. All balance numbers in §4 are floor-faithful; earlier headline figures (e.g. "81% / 100%") were partly this artifact.

## 3. Rule Amendments

- **Relief model (amends v12 §2/§3 and v11 §5).** Relief is no longer purely `g>=0`-gated. It is state-based: an actual resource/trust crisis opens relief to any route so a non-committed (grey-zone) player is not excluded, while non-crisis relief keeps the compliance gate (resistance-no-reward preserved for *healthy* play). This does not reintroduce broad always-on route floors — relief still requires a real crisis threshold and the once/cooldown gates still bound frequency.
- **Transition non-lethality (new, narrow floor).** The Act-boundary penalty is clamped to a per-stat minimum of 5 so it cannot instantly game-over a player. This is a deliberate anti-cheap-death floor at the transition moment only. It is NOT a daily-decay floor: daily Act 3/4 decay and card/reward penalties still apply at face value, and terminal thresholds (stat <= 0 outside the transition) stay reachable. The v11 §5 resource-failure model is otherwise intact.
- **Canonical EN romanization (locked).** New EN text must use these forms; `data-card-speakers.js` is the display-name source of truth.
  - 서하은 = **Seo Hae-eun**, 임재혁 = **Lim Jae-hyeok**, 윤세진 = **Yoon Se-jin**, 강도윤 = **Kang Do-yun**, 박소영 = **Park So-young**, 이중철 = **Lee Jung-cheol**, 마르쿠스 베버 = **Markus Weber**, 닉 포스터 = **Nick Foster**, 이수현 = **Lee Su-hyeon**; 함경 = **Hamgyeong**.
- **New-content i18n pairing (unchanged, restated).** New cards/missions/LOGs ship their EN overlay in the same commit; minigame result narratives ship `ko`/`en` block pairs (M-002/MI-01 were the regression that motivated this restatement).

## 4. QA Baseline (BUILD 483 / 2026-07-24)

```text
node tools/validator.js
  files 83 / failed 0
  cards 592 (unique 592)
  chains 24 main + 10 incident
  missions 19
  endings 16
  archive 116
  LOG produced 420 / core-defined 285
  reference/structure issues: 0

node tools/i18n-smoke.js
  i18n smoke ok
```

Balance readout — `simulator_v3` (floor-faithful), N=400-500 per profile:

| Profile | Before | After | Note |
|---|---|---|---|
| newbie (casual) | 79.5% resource-death | **30.0%** | target ~30% met; narrative-ending reach ~2% -> ~15%+ |
| careful (resource-aware) | 0% death | **0%** | relief is a crisis-only safety net; skilled play unchanged |
| comply (pure GI-max) | 100% death | ~100% | pathological single-axis profile; unbreakable by relief |

The `comply` profile picks the resource-destroying option every turn to maximize GI; no safety net can offset a strategy that actively discards resources each card. A resource-aware compliance player is `careful` (0% death). **This is a settled non-issue, not an open balance item** (design decision, 2026-07-24): mindless-skip / single-axis-suicide play is not part of any ending's reach condition, so it is not a difficulty metric. The game already makes defeat legible, so a resource death is a learning signal the player corrects next run — (1) the intro tutorial states "any stat reaching 0 fails the mission" and teaches the tilt-to-preview stat delta (`components-game.js` tutorial); (2) live `*Low` critical warnings fire as a stat approaches the threshold (`lang-ui`); (3) the game-over screen names the exact cause (`go-reason`, e.g. "자원 고갈"). No repeatable-safeguard change is warranted.

## 5. Remaining Watch Items

- Human balance playtest is still the missing calibration (carried from v11 §9 / v12 §5). The simulator floor fix corrects the automated numbers but does not replace real first-session readings.
- `comply` ~100% is **resolved as intended** (see §4), not a watch item: suicide/mindless-skip play is outside ending-reach conditions, and defeat is fully communicated (tutorial + live `*Low` warnings + named game-over cause). No repeatable safeguard will be added — it would only erase crisis tension for legitimate play. The genuine survival concern (casual/newbie) is addressed by the state-based relief pass above.
- `firebase-config.js` is git-tracked with live web keys (public-by-design per `firestore.rules`, but a project-policy exception). Resolve `.gitignore` + deploy handling before any wider public / Steam distribution.
- Store packaging (screenshots, copy, version labels) must be re-cut against BUILD 483+.
- Discoverability remains the dominant commercial risk (unchanged from v12).
