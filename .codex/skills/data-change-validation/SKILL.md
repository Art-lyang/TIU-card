# Data Change Validation

## Description

Repeatable checklist for validating changes to card, mission, chain, evidence,
archive, facility, reward, ending, or session-pack data.

## Trigger

Use this skill after editing any `data-*.js` or `lang-cards-*.js` file.

## Procedure

1. Identify the touched data family.
2. Check adjacent files in the same family because data is intentionally split.
3. Confirm IDs follow project naming:
   - Cards: `C-XXX`, `CH-XXX-N`, `CS-XXX`, `CT-XXX`, `CA-XXX`, `CE-XXX`
   - Logs: `LOG-*` or intentional `ONCE-*`
   - Missions: existing `M-*` / `MI-*` pattern
4. Confirm each new reference has a producer and consumer.
5. Run:

```bash
node tools/validator.js
```

6. If balance could change, run:

```bash
python tools/simulator_v3.py 100 all
```

## Output

Summarize validator status, simulation status if run, and any manual checks.
