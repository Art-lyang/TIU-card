# Codex Workflow

## Intake

Identify the task class:

- data/content
- UI/runtime
- i18n
- balance
- narrative/lore
- release/packaging
- investigation/review

Then pick the matching route from `harness/CODEX-ORCHESTRATOR.md`.

## Read Before Editing

Always read:

- `AGENTS.md`
- the relevant nearby files
- the current handoff or QA report when the task touches behavior

Read source-of-truth docs only as needed:

- `README.md` for current project shape
- `HANDOFF.md` for recent state
- `-setup/GDD/TIU-GAME-GDD-v11.md` for current design deltas
- `-setup/MD/` for canon-heavy work

## Patch

- Keep edits scoped.
- Preserve existing coding style.
- Do not introduce JSX, modules, bundlers, or package installs for normal work.
- Update `index.html` script tags when adding runtime JS files.
- Update i18n overlays when user-facing text changes.
- Update verification docs only when the workflow itself changes.

## Validate

Choose checks by risk:

```bash
node tools/validator.js
python tools/simulator_v3.py 100 all
node tools/i18n-smoke.js
python -m http.server 4173
```

The local server command is for browser smoke testing; stop or reuse it
appropriately in the current session.

## Workspace Artifacts

Use `_workspace/codex/` for Codex-local notes and `_workspace/sim-results/` for
simulation JSON. Keep canonical docs outside `_workspace/`.

Suggested local-only paths:

```text
_workspace/codex/drafts/
_workspace/codex/qa/
_workspace/codex/screenshots/
_workspace/sim-results/
```

## Handoff

Final reports should include:

- what changed;
- why it changed;
- verification commands and results;
- unverified items or manual checks still needed.
