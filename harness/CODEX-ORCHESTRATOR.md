# Codex Orchestrator

Use this routing guide to choose the lightest workflow that safely fits the
task.

## Routing Table

| Task Type | Use | Required Checks |
|---|---|---|
| Small code bug | `implementation-lead` | Targeted smoke or unit-like command |
| Card/data edit | `implementation-lead` + `data-change-validation` | `node tools/validator.js` |
| Mission/chain/evidence/archive edit | `data-integrity-auditor` | `node tools/validator.js` |
| Stat/reward/ending/session-pack change | `balance-simulation-analyst` | Validator + simulator |
| Korean story/canon/dialogue edit | `narrative-lore-editor` | Nearby canon/source review |
| English/i18n edit | `i18n-content-pass` | i18n smoke when relevant |
| UI/CSS/component change | `ui-runtime-debugger` | Browser smoke QA |
| `index.html` script order change | `ui-runtime-debugger` + `data-integrity-auditor` | Browser smoke + validator |
| Release/push/package prep | `release-qa-coordinator` | Release preflight |
| Regression investigation | `implementation-lead` first, then specific auditor | Reproduce before patch when possible |

## Default Loop

1. Classify task.
2. Read source-of-truth docs and nearby files.
3. Patch only the necessary files.
4. Run the checks in the table.
5. Save temporary artifacts only under `_workspace/`.
6. Report results and remaining risks.

## Mixed Tasks

For mixed requests, combine only the necessary roles. Example:

- New card pack: `narrative-lore-editor` + `data-integrity-auditor` +
  `balance-simulation-analyst`.
- New settings UI: `implementation-lead` + `ui-runtime-debugger` +
  `i18n-content-pass`.
- Release candidate: `release-qa-coordinator` only, following its checklist.

## Stop Conditions

Stop and ask the user before:

- adding a package/build system;
- changing the deployment model;
- rewriting major architecture;
- altering license or ownership text;
- deleting generated assets or backup folders;
- recording private local information in docs.
