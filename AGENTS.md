# Codex Project Guide: TIU-CARD

This file is the Codex-facing project guide. It complements the existing
Claude harness in `CLAUDE.md` and `.claude/`; do not replace or rewrite that
harness unless the user asks for it.

## Project Purpose

TIU-CARD is a static HTML card-command game mixing Reigns-style swipes,
text-adventure branches, Korean SF surveillance fiction, and field mission
minigames. The player acts as the first commander of ORACLE Korea and manages
containment, resources, trust, evaluation, hidden GI pressure, session card
packs, evidence, facilities, archive unlocks, and endings.

## Source Of Truth

- Current game overview: `README.md`
- Working handoff and recent status: `HANDOFF.md`
- World/tone rules: `-setup/GDD/TIU-GAME-GDD-v11.md`
- Prior full GDD snapshot: `-setup/GDD/TIU-GAME-GDD-v10.md`
- Canon/storyline references: `-setup/MD/storyline/`
- Character/world references: `-setup/MD/`
- Latest QA reports: `qa-report-*.md`
- Claude-specific role harness: `CLAUDE.md`, `.claude/agents/`
- Codex workflow harness: `harness/CODEX-ORCHESTRATOR.md`

## Non-Negotiable Rules

- Never record personal absolute paths, account names, access tokens, API keys,
  private URLs, or local machine details in project files.
- Treat `_workspace/` as scratch space. It is ignored by git and must not be
  used for canonical project state.
- Preserve user changes. Do not revert unrelated edits or generated files.
- Keep changes scoped to the requested feature, bug, content pass, or QA task.
- Use UTF-8 for Korean content and avoid mojibake.
- Do not change `.claude/settings.local.json` or other local settings files.
- Do not modify `.claude/worktrees/` unless the user explicitly asks.
- Respect the license: game text, art, music, code, and generated content are
  project assets and should not be copied into unrelated deliverables.

## Technical Shape

- Runtime: static `index.html` with React 18 CDN and vanilla JavaScript/CSS.
- There is no bundler, package build, or module system.
- Script order in `index.html` is part of runtime behavior.
- Most data is global `var` data spread across `data-*.js`.
- UI is written with `React.createElement`; do not introduce JSX or a build
  step without explicit approval.
- Save/load uses `localStorage`.
- Deployment target is static hosting/GitHub Pages.

## Common File Areas

- `app*.js`: application state, save/load, card draw, unlocks, rewards.
- `components-*.js`: UI pages, game view, settings, archive, evidence,
  evening chat, briefing, minigames, escape wrappers.
- `data-cards*.js`: card data and card-pack data.
- `data-missions*.js`: mission definitions and variants.
- `data-chains*.js`: card chains and follow-up sequences.
- `data-evidence.js`, `data-archive.js`, `data-facility*.js`: unlockable
  systems and world entries.
- `lang-*.js`: Korean/English UI and content overlays.
- `tools/validator.js`: primary static integrity gate.
- `tools/simulator_v3.py`: player-profile balance simulation.

## Verification Matrix

- Any `data-*.js` change: run `node tools/validator.js`.
- Card, mission, chain, ending, or economy changes: also run a simulation pass,
  normally `python tools/simulator_v3.py 100 all`.
- i18n changes: run `node tools/i18n-smoke.js` when relevant.
- UI/runtime changes: serve locally with `python -m http.server 4173` and smoke
  test `http://localhost:4173/index.html`.
- Release-facing changes: follow `harness/CODEX-ORCHESTRATOR.md` and
  `harness/CHECKLIST-release.md`.

## Codex Operating Style

- First read nearby code and docs before editing.
- Prefer the existing global-variable and `React.createElement` patterns.
- Make narrow patches. Avoid broad refactors during content or QA work.
- When adding data, update all linked references in the same pass: card IDs,
  LOG IDs, mission IDs, i18n keys, archive unlocks, and script loading order.
- When reporting results, include what changed and which verification commands
  passed or could not be run.
- Store temporary notes, drafts, and local QA outputs under `_workspace/codex/`
  or the existing `_workspace/*` subfolders.

## Role Routing

Use the role files in `.codex/agents/` as reusable working prompts:

- `implementation-lead.md`: scoped implementation and integration.
- `data-integrity-auditor.md`: static data/reference validation.
- `narrative-lore-editor.md`: story, tone, archive, dialogue, canon checks.
- `ui-runtime-debugger.md`: browser/UI/runtime debugging.
- `balance-simulation-analyst.md`: Monte Carlo and progression balance review.
- `release-qa-coordinator.md`: pre-release verification and packaging checks.

Use the skills in `.codex/skills/` for repeatable task recipes.
