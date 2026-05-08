# Codex Harness Design

## 1. Project Purpose Estimate

TIU-CARD is a late-beta/release-candidate static browser game. It combines
card-swipe command decisions, branching text adventure, evidence/archive
systems, evening character conversations, facilities, local save slots, and
field mission minigames in a Korean SF surveillance setting.

The project is content-heavy and data-driven. The biggest risks are not build
complexity but broken references, script order regressions, i18n drift,
balance/ending reachability changes, and tone/canon inconsistency.

## 2. Needed Codex Agents

- `implementation-lead`: scoped edits and integration.
- `data-integrity-auditor`: IDs, LOGs, missions, archive, evidence, i18n, and
  validator checks.
- `narrative-lore-editor`: tone, canon, spoiler boundaries, Korean/English copy.
- `ui-runtime-debugger`: browser runtime, console errors, mobile layout, static
  React CDN constraints.
- `balance-simulation-analyst`: simulator runs, ending distribution, route
  reachability, stat pressure.
- `release-qa-coordinator`: final multi-step QA and release checklist.

## 3. Needed Codex Skills

- `data-change-validation`: validate `data-*.js` and linked references.
- `browser-smoke-qa`: local static server and browser smoke path.
- `simulation-balance-pass`: profile-based Monte Carlo checks.
- `i18n-content-pass`: Korean/English key and layout checks.
- `release-preflight`: final release/push/package readiness.

## 4. Recommended Workflow

1. Intake: classify the request as data, runtime, UI, i18n, balance, narrative,
   release, or mixed.
2. Read: open `AGENTS.md`, the relevant source-of-truth docs, and nearby code.
3. Patch: make the smallest coherent change.
4. Validate: run the commands required by the verification matrix.
5. Record: put temporary QA outputs under `_workspace/` only.
6. Handoff: summarize changed files, behavior, commands, and remaining risks.

## 5. Rules For `AGENTS.md`

`AGENTS.md` should keep Codex focused on:

- static HTML + React CDN architecture;
- no personal paths, account details, tokens, API keys, or local secrets;
- no unrelated rewrites or user-change reverts;
- `node tools/validator.js` after data changes;
- local browser smoke after runtime/UI changes;
- simulator passes after balance-sensitive changes;
- `_workspace/` as non-canonical scratch space.

## 6. `_workspace` Use Standard

Use `_workspace/` for:

- temporary QA reports;
- simulation JSON outputs;
- draft text before applying to canonical data files;
- screenshots or browser notes;
- release packaging outputs.

Do not use `_workspace/` for:

- source-of-truth design docs;
- production code;
- committed release state;
- secrets, credentials, account information, or local machine details.

## 7. Potential Overengineering

- Too many role files can slow small edits. Use the agent docs as routing
  prompts, not mandatory ceremony.
- Do not duplicate all Claude agents one-for-one. Codex needs implementation and
  verification flow more than a second diagnostic hierarchy.
- Do not create a build system just to make the harness feel formal.
- Do not force every content edit through full release QA; pick checks based on
  risk.
- Do not preserve every scratch note forever. `_workspace/` should stay useful,
  not become a second archive.
