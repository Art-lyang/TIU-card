# TERMINAL SESSION - Game Design Document v1.11.7 Release Candidate Delta

> Current runtime snapshot for `VER 1.11.7 / BUILD_VER=239` / 2026-05-28.
> This document is a release-candidate delta on top of `TIU-GAME-GDD-v10.md`.

## 1. Current Scope

TERMINAL SESSION remains a static HTML card-command narrative game with three major play layers:

- Daily card command and resource pressure.
- Evening chat, relationship/faction context, and investigation-table review.
- Field missions and minigame-linked incident resolution.

The current content registry contains:

| Area | Runtime count |
|---|---:|
| Cards | 558 |
| Field missions | 15 |
| Minigame-linked missions | 13 |
| Evidence entries | 38 |
| Evidence combinations | 15 |
| Endings | 16 |
| Archive entries | 110 |
| Facility items | 16 |

Current release stance: the runtime is in public-beta / release-candidate shape. The highest pre-release risk is no longer raw content volume; it is external packaging alignment, first-session clarity, human balance playtest, real-device mobile QA, and making sure public documents do not contradict the shipped build.

Archive density now targets roughly one unlockable archive item per five cards. The archive is allowed to lag slightly behind card count during small patches, but any large content pass should add archive entries in batches rather than leaving the lore/reference layer static.

## 2. Session Deck-Pack Model

The session pack layer exists to improve replay texture and reduce Act 2 overloading without changing the fixed day/act structure.

- Each session selects 4 unique packs from 6 candidates.
- Core cards always remain available.
- Evidence-table unlocks, basic facility expansion, save normalization, and field-mission infrastructure are not blocked by optional packs.
- Pack-gated chains should only affect optional narrative arcs and their related endings.
- In Acts 3 and 4, cards from the selected or discovered session packs receive lineage draw-weight boosts. Main-route transition cards with `transReq` must not be blocked or boosted as optional pack content.

Current optional pack candidates:

| Pack | Narrative purpose |
|---|---|
| `DG_MERIDIAN` | DG/Meridian faction pressure and outside-contact tension |
| `B3_PREDECESSOR` | B3 history and predecessor-commander material |
| `PROMETHEUS_TENSION` | Lee Jung-cheol distrust of Prometheus and hesitation before cooperation |
| `UPRISING_INFRA` | Facility/closed-circuit escalation and related ending routes |
| `MUTANT_SURGE` | Extra mutant-contact pressure and threat texture |
| `GOV_ORACLE_SUSPICION` | Haejinhoe incidents, nearby-settlement pressure, and government suspicion of the branch |

Design rule: do not invent named settlements or named organizations casually. Use generic wording such as "nearby settlement" or "settlement near the barrier" unless the worldbuilding file already defines a proper name.

2026-05-10 follow-up rule: `B3_PREDECESSOR` now has dedicated Act 3/4 predecessor-lineage cards and logs so the Act 2 pack choice can remain visible after the initial branch without forcing the main route.

## 3. Public Lore Visibility

Public news and public-facing reports must not expose restricted entities that ordinary civilians would not know.

- Sovari and Karuntal should not appear in public news.
- Existing old Sovari signal content may remain as a restricted/internal card reference.
- Real-world organization names should be avoided unless explicitly approved for the setting.
- Medical-aid references should use generic terms such as "international medical organization" or "medical team".
- Haejinhoe incident news is allowed when framed as public unrest, attacks, or government response.

## 4. Numeric Text Rule

Card and dialogue text should not expose odd small-unit predictions such as `+1`, `+2`, or `-2`.

- Runtime mechanical effects can still use the normal 5-unit resource system.
- Player-facing card bodies should describe expected consequences narratively.
- Explicit effect labels should remain in the established card-effect UI pattern, not as improvised in-world dialogue.

## 5. Resource Pressure And Character-State Rules

The Reigns-like pressure loop depends on resources being allowed to fail. Runtime balance helpers must not broadly prevent `c`, `r`, `t`, or `o` from reaching terminal thresholds.

- Normal card choices and reward results may reduce a resource to 0 and trigger the corresponding game over.
- Broad route floors for resistance, neutral, loyalty, Act 4 entry, and reward phases are not allowed.
- Narrow exceptions are permitted only when a named narrative card needs to hand control back to the player instead of ending immediately. Current explicit exceptions are `CE-005` and `CE-042/B`, both capped at a low floor of 3.
- Simulators must match runtime balance helpers. They may model card-level `floor` safeguards, but must not keep legacy route-wide soft floors after the runtime removes them.

Character state must affect action availability, not only dialogue text.

- `LOG-075` means Kang Do-yun is dead or permanently absent.
- `LOG-074-DONE` means Kang Do-yun survived with a critical wound and is not field-deployable.
- `LOG-DOYUN-MINOR-WOUND` means a minor wound and should block high-risk direct action choices where the card or mission explicitly depends on Kang Do-yun's physical deployment.
- Direct field dispatch, escape accompaniment, and trust-gated Doyun action variants must check the relevant unavailable-state logs.
- Non-action dialogue can remain available only if the text is compatible with the current state or has a state-specific variant.

## 6. Mobile Main Menu And Modal Rule

The main terminal menu must use the available first-screen space deliberately. Empty vertical gaps are a packaging problem because the first screen is also the store-screenshot surface.

Current target baseline:

- Viewport: 390x844.
- Menu rows should scale text and touch height together so the button does not feel hollow.
- Footer visible without vertical sliding.
- Top terminal lines must not cross through title text or reduce legibility.
- Skip/confirm modals should appear near visual center within the safe-area, not pinned high under the header.
- No DLC route-selection surface in the current PC build.

## 7. Meta-Progression And Practice Surfaces

The record layer should make replay progress visible without spoiling undiscovered routes.

- The ending record is a 16-slot trophy gallery.
- Reached endings may show the ending image, summary, and narrative.
- Unreached endings must show a hint card instead of the image or full ending text.
- `TIME_UP` is a real saved ending state, not only a dispatch fallback.

The minigame guide is a main-menu practice surface for the 10 field minigame types.

- Practice runs do not grant rewards.
- Practice runs do not write LOGs, resources, endings, or mission state.
- Field missions remain the canonical way to encounter minigames in the campaign.
- The guide exists to teach mechanics before or between field-mission appearances.

## 8. QA Baseline

Latest checks:

```text
node tools/validator.js
  cards 558 / unique 558
  archive 110
  issues 0

node tools/i18n-smoke.js
  i18n smoke ok

node tools/issue23_audit.js
  issue23 audit ok

node tools/issue25_audit.js
  issue25 audit ok

node tools/critical-audit.js
  critical-audit OK

archive reachability smoke
  unreachable archive entries: 0
  first-session spoiler unlocks: blocked

P1 asset manifest smoke
  manifest entries: 61
  mapped images: 61
  missing images: 0

python tools/simulator_v3.py 20 all
  comply   instant 100.0% / avg survival 9.6 days
  rebel    instant 100.0% / avg survival 6.5 days
  careful  narrative 90.0% / instant 10.0% / avg survival 30.6 days
  explorer narrative 40.0% / instant 60.0% / avg survival 26.2 days
  newbie   instant 100.0% / avg survival 16.0 days
```

Browser QA also confirmed:

- Local `http://localhost:4190/index.html?v=239` loads with no console errors.
- Runtime build marker reports `BUILD_VER=239`.
- English locale switch reaches the boot screen with no console errors.
- CE-042 Korean/English result text and P1 escape image mappings load correctly.
- Ending records show 16 gallery slots with locked hint cards and reached trophy cards.
- Main menu minigame guide opens the 10-type practice selector without campaign side effects.
- Mobile main menu and archive views remain priority real-device QA targets because they double as storefront screenshot surfaces.
- Issue #33 state/balance guards are covered by `tools/critical-audit.js`.

## 9. Remaining Watch Items

- Automated comply/rebel/newbie profiles now die much faster because hidden broad floors were removed. This is a correction to the failure model, but release balance still needs human playtest calibration.
- The observer route is intentionally difficult. The resistance route should remain challenging, but its reward feedback and failure explanation need human playtest review.
- Doyun critical-wound gating is now applied to the known direct field/action routes. Future new cards that physically deploy him must follow the same state rule.
- Archive expansion is now proportional to the 558-card runtime and Issue #40 tightened early unlocks. Future major card batches should reserve matching archive entries before release and re-run first-session spoiler checks.
- External packaging must stay synchronized with the shipped runtime. README, HANDOFF, GDD, release notes, store copy, screenshots, and build labels should all name the same `VER 1.11.7 / BUILD_VER=239` baseline until the next runtime build is cut.
- Real-device mobile QA is still required for storefront-critical screens: main menu, archive category/detail, skip confirmation modal, ending record, and field mission wrapper.

## 10. External Packaging Rule

Before any public release, every public-facing document must pass a simple consistency check:

- Version line: `VER 1.11.7 / BUILD_VER=239`.
- Validation date: 2026-05-28 or newer.
- Product description: Reigns-style card command, Korean SF surveillance dystopia, replayable archive/log progression, and field-mission minigames.
- Hidden systems such as GI, observer pressure, and deep archive conditions should be teased through tone, not explained like developer documentation.
- Store screenshots should use screens that are visually full and readable on mobile: main menu, command card, evening hub, archive, investigation table, field mission, and one locked ending/gallery screen.

## 11. Standalone Demo Rule

The public demo is an independent static package for itch-style distribution, not a replacement for the GitHub Pages main build.

- Demo files live under `demo/` and should not be pushed into the main GitHub Pages build unless explicitly requested.
- The demo must use the same terminal-frame visual language, menu proportions, category structure, typography, and asset treatment as the main game. It should read as a limited build of the same product, not as a prototype or separate game.
- Demo progression covers Act 1 through Act 2 only. When the Act 2 access window closes, the session must route to the demo-complete ending and tell the player to continue in the full version.
- Demo copy should frame the cutoff in-world as a limited ORACLE access window closing. Avoid developer-facing labels such as raw act-transition logs, debug state, unlock-condition explanations, or route implementation notes.
- Demo save data must stay isolated from the full game, currently by using a dedicated localStorage prefix such as `tiu_demo_`.
- Demo archive/log visibility must be capped to information reachable in Act 1-2. It must not reveal full-game-only routes, later-act evidence, hidden systems, or character-state spoilers before the demo can earn them.
- Demo card volume may be reduced, but the command staff introduction and Act 1-2 core relationship loop must remain readable; all four officers should be available early enough for the demo to represent the real game.
- The itch ZIP should have `index.html` at the archive root and include the copied assets/audio/data required by the demo so it runs as a standalone static web build.
