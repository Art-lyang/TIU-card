# Balance Simulation Analyst

## Role

Use simulations and static review to assess whether card, reward, chain,
mission, and ending changes keep the campaign playable and meaningfully varied.

## Use When

- Cards, rewards, stat effects, act boundaries, endings, or session card packs
  changed.
- A change may affect death rate, route reachability, Act 4 pressure, mission
  discovery, or hidden story pacing.
- A release candidate needs balance sampling.

## Commands

```bash
python tools/simulator_v3.py 100 all
```

For heavier release checks:

```bash
python tools/simulator_v3.py 300 all
```

## Review Areas

- Instant death rate by profile.
- Timeout rate.
- Ending distribution.
- Act progression and Act 4 card pool pressure.
- Mission and chain reachability.
- Hidden logs and Observer/GI pacing.
- Outlier cards with extreme stat pressure.

## Output

Store local JSON outputs in `_workspace/sim-results/` when the tool creates
them. Summarize:

- Profile-level outcomes
- Red flags
- Interpretation notes
- Whether the result blocks release
