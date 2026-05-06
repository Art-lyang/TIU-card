# TERMINAL SESSION (TIU-CARD)

> Reigns-style card command, Suzerain-style pressure, and Korean SF surveillance fiction.
>
> **Genre**: hybrid card-swipe command sim + text adventure + field mission minigames
> **Current build**: `BUILD_VER=159`
> **Last verified**: 2026-05-06
> **Deployment**: https://art-lyang.github.io/TIU-card/

---

## Short Pitch

You are the first commander of ORACLE Korea Branch. Each day, ORACLE presents a controlled stream of decisions: stabilize containment, preserve supplies, manage trust, and keep evaluation high enough to survive. The real question is whether the player is commanding the branch, or being trained by the interface that offers the choices.

---

## Current Content Snapshot

| Area | Current state |
|---|---|
| Cards | **521** unique cards |
| Card chains | **18** main chains + **10** incident/follow-up chain groups |
| Field missions | **15** missions |
| Minigame-linked missions | **9** verified mission links |
| Evidence table | **38** evidence entries + **15** evidence combinations |
| Evening chat | **103** evening entries, one-chat-per-night flow |
| Endings | **12** ending definitions / **15** practical result branches including instant and escape outcomes |
| Archive | **46** entries |
| Facilities | **16** expansion/branch infrastructure items |
| BGM | **6** tracks |
| Save system | **3** independent local save slots + session state snapshots |
| Languages | Korean primary, English UI/content overlay in active QA |

Latest static integrity pass:

```text
cards 521 / unique 521
missions 15
evidence 38 + combos 15
archive 46
validator issues 0
```

---

## Player-Facing Systems

- **Daily card command**: swipe or keyboard-select cards to shift containment, resources, trust, evaluation, and hidden GI.
- **Act color identity**: Act 1 blue, Act 2 green, Act 3 yellow, Act 4 red across cards, briefings, rewards, dialogue, and evening surfaces.
- **Evening Chat 2.0**: one character per night, post-chat return to the evening hub, completed-state lockout, faction/relationship visualization, and investigation table access when unlocked.
- **Investigation table**: unlocked through the Act 2 Im Jaehyuk evening route (`LOG-EV-UNLOCK`), then used to review evidence and combinations.
- **Field missions**: triggered by linked cards and resolved through text adventure nodes, with selected missions branching into minigames.
- **Minigames**: signal, sequence, breach, sample, scan, evidence, reconstruction, route, statement, and screening configuration families.
- **Save/load**: three slots preserve stats, day/act, logs, used evening entries, active field specs, chain queue state, facilities, and evidence combinations.
- **Scenario hub**: first-time players enter the original tutorial directly; returning players can access route/session selection.
- **Meta progression**: hidden ORACLE/Observer/GI systems support replay-layer discoveries without exposing all mechanics in the first session.

---

## Technical Stack

- **Runtime**: static HTML + React 18 CDN + vanilla JS/CSS
- **Build system**: none; `index.html` is the single entry point
- **Storage**: `localStorage` snapshot model
- **i18n**: `i18n-runtime.js`, `lang-ui-ko.js`, `lang-ui-en.js`, `lang-content-en-all.js`, `lang-content-en-dialogues.js`
- **QA tools**: Node validator, Monte Carlo simulators, browser QA scripts, Playwright-assisted local checks
- **Hosting**: GitHub Pages or any static host

---

## Run Locally

```bash
python -m http.server 4173
```

Open:

```text
http://localhost:4173/index.html
```

The project is intentionally static. No package install is required for normal play. QA tools may require Node/Playwright depending on the script.

---

## Repository Map

```text
TIU_CARD/
├── index.html                         # entry point, BUILD_VER=159
├── app*.js                            # app state, save, logic, SFX/BGM hooks
├── components-*.js                    # card UI, evening, dialogue, briefing, archive, settings, minigames
├── data-*.js                          # cards, missions, evidence, endings, logs, rewards, facilities
├── i18n-runtime.js                    # locale runtime
├── lang-ui-ko.js / lang-ui-en.js       # UI language packs
├── lang-content-en-all.js             # English content overlay
├── assets/ and images*.js             # image registries and shipped visual assets
├── field-mission/                     # Act 4 escape/field mission runtime
├── tools/                             # validator and simulation tools
├── qa-report-2026-05-05.md            # last large multi-agent QA report
└── -setup/
    ├── GDD/TIU-GAME-GDD-v10.md        # authoritative current GDD
    ├── MD/TIU-ALPHA-CHANGELOG.md      # milestone changelog
    └── QA-Review/GAMEPLAY-REVIEW.md   # gameplay review notes
```

---

## Current QA Baseline

Verified on 2026-05-06:

- Static validator: **0 issues**
- Korean evening chat: no English UI/content leak found in the checked route
- Locked investigation table: hidden until `LOG-EV-UNLOCK`
- Act 2 Jaehyuk evening unlock: selects the investigation-table unlock event correctly
- Save slots 1-3: independent save/load verified
- Save/load state: logs, evening usage, chain queue, active field specs, facilities, and evidence combinations persist
- Field mission links: configured follow-up generation and minigame references resolve
- Invalid save normalization: impossible Day 1 + Act 4 state is normalized instead of freezing the game
- Browser runtime smoke: no console errors during the checked evening/evidence/save routes

---

## Release Readiness

The game is now in a late beta / release-candidate preparation stage. The strongest remaining work is not raw content volume, but packaging and polish:

| Priority | Work |
|---|---|
| P0 | Keep validator/Monte Carlo/browser QA clean after each content pass |
| P1 | Final Korean playthrough and English human QA pass |
| P1 | Trailer, GIFs, and official store screenshots |
| P1 | Steam/itch capsule art and page copy |
| P2 | More card/body illustrations where text density is highest |
| P2 | Final ending image and archive presentation audit |

---

## Key Documents

| Document | Purpose |
|---|---|
| [`-setup/GDD/TIU-GAME-GDD-v10.md`](-setup/GDD/TIU-GAME-GDD-v10.md) | Current authoritative GDD |
| [`-setup/MD/TIU-ALPHA-CHANGELOG.md`](-setup/MD/TIU-ALPHA-CHANGELOG.md) | Milestone changelog |
| [`qa-report-2026-05-05.md`](qa-report-2026-05-05.md) | Last broad QA issue report |
| [`-setup/QA-Review/GAMEPLAY-REVIEW.md`](-setup/QA-Review/GAMEPLAY-REVIEW.md) | Gameplay/system review notes |
| [`HANDOFF.md`](HANDOFF.md) | Working handoff notes |

---

## License

License and asset attribution policy are not finalized. Resolve before commercial distribution.

---

*Last updated: 2026-05-06 / BUILD_VER=159*
