# Simulation Balance Pass

## Description

Use Monte Carlo profiles to catch route reachability, death-rate, and Act
pressure regressions after gameplay data changes.

## Trigger

Use this skill after changing cards, stat effects, endings, act flow,
session-packs, mission triggers, or reward tuning.

## Procedure

1. Run a quick profile sweep:

```bash
python tools/simulator_v3.py 100 all
```

2. For release or major balance changes, run:

```bash
python tools/simulator_v3.py 300 all
```

3. Inspect output for death spikes, timeouts, missing endings, mission
   reachability collapse, or hidden route overexposure.
4. Keep generated JSON in `_workspace/sim-results/`.

## Output

Summarize profile differences, outliers, suspected cause, and release impact.
