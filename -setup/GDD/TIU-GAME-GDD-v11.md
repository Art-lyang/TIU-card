# TERMINAL SESSION - Game Design Document v1.1.1

> Current runtime snapshot for `BUILD_VER=178` / 2026-05-09.
> This document is a release-candidate delta on top of `TIU-GAME-GDD-v10.md`.

## 1. Current Scope

TERMINAL SESSION remains a static HTML card-command narrative game with three major play layers:

- Daily card command and resource pressure.
- Evening chat, relationship/faction context, and investigation-table review.
- Field missions and minigame-linked incident resolution.

The current content registry contains:

| Area | Runtime count |
|---|---:|
| Cards | 541 |
| Field missions | 15 |
| Minigame-linked missions | 9 |
| Evidence entries | 38 |
| Evidence combinations | 15 |
| Endings | 16 |
| Archive entries | 46 |
| Facility items | 16 |

## 2. Session Deck-Pack Model

The session pack layer exists to improve replay texture and reduce Act 2 overloading without changing the fixed day/act structure.

- Each session selects 4 unique packs from 6 candidates.
- Core cards always remain available.
- Evidence-table unlocks, basic facility expansion, save normalization, and field-mission infrastructure are not blocked by optional packs.
- Pack-gated chains should only affect optional narrative arcs and their related endings.

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

## 5. Mobile Main Menu Rule

The main terminal menu must fit a common mobile viewport without hiding the footer below the first screen.

Verified baseline:

- Viewport: 390x844.
- Menu row gaps: 6px.
- Footer visible without vertical sliding.
- No DLC route-selection surface in the current PC build.

## 6. QA Baseline

Latest checks:

```text
node tools/validator.js
  cards 541 / unique 541
  issues 0

node tools/i18n-smoke.js
  i18n smoke ok

node tools/check_ending_routes.js
  ending route check passed: 11/11
  A/B/D/F/G special routes verified, including Ending F approved/unapproved observer routes

python tools/simulator_v3.py 20 all
  careful/newbie profiles reached narrative endings reliably
  comply/rebel automated profiles remain intentionally high-pressure
  timeouts only appeared in the careful sample, 3/20
```

Browser QA also confirmed:

- Session deck packs restore exactly from save snapshots.
- Act 1 save normalization does not carry investigation-table unlocks from previous sessions.
- Act 2+ snapshots preserve investigation-table unlocks correctly.
- Active field mission specs remain capped at 2 in the checked runtime path.
- New pack cards and pack-linked logs have English overlays.

## 7. Remaining Watch Items

- Resistance-route resource pressure remains high in automated simulations and needs human playtest tuning.
- `check_buttons.py` still reports special transition cards with no direct stat effect.
- Act 4 card-pool lower tails should continue to be watched after additional pack tuning.
