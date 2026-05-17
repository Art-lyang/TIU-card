# TERMINAL SESSION - Game Design Document v1.1.1

> Current runtime snapshot for `BUILD_VER=203` / 2026-05-18.
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
| Archive entries | 47 |
| Facility items | 16 |

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

## 6. Mobile Main Menu Rule

The main terminal menu must fit a common mobile viewport without hiding the footer below the first screen.

Verified baseline:

- Viewport: 390x844.
- Menu row gaps: 6px.
- Footer visible without vertical sliding.
- No DLC route-selection surface in the current PC build.

## 7. QA Baseline

Latest checks:

```text
node tools/validator.js
  cards 558 / unique 558
  issues 0

node tools/i18n-smoke.js
  i18n smoke ok

node tools/issue22_audit.js
  issue22 audit ok

node tools/critical-audit.js
  critical-audit OK
  warning: TIME_UP is dispatch-only and not listed in ending gallery

resource zero regression smoke
  normal choice zero: not tuned
  normal reward zero: not tuned
  CE-042/B exception: o/r floored to 3 only

python tools/simulator_v3.py 20 all
  comply   instant 100.0% / avg survival 9.1 days
  rebel    instant 100.0% / avg survival 4.6 days
  careful  narrative 100.0% / avg survival 28.8 days
  explorer narrative 50.0% / instant 50.0% / avg survival 25.6 days
  newbie   instant 100.0% / avg survival 17.1 days
```

Browser QA also confirmed:

- Local `http://localhost:4173/index.html` loads at 1366x768 with no console errors.
- English locale switch reaches the boot screen with no console errors.
- `ending_C_cst` now maps to its dedicated ending image.
- Issue #33 state/balance guards are covered by `tools/critical-audit.js`.

## 8. Remaining Watch Items

- Automated comply/rebel/newbie profiles now die much faster because hidden broad floors were removed. This is a correction to the failure model, but release balance still needs human playtest calibration.
- `data-cards-resist-hint.js` has a local `t` reward concentration. It is not a global 5x imbalance, but the RH/HH/CB card group remains a future balance pass candidate.
- Doyun critical-wound gating is now applied to the known direct field/action routes. Future new cards that physically deploy him must follow the same state rule.
