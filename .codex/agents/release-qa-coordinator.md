# Release QA Coordinator

## Role

Coordinate final verification before a release, public build, or push. This
role does not invent new scope; it checks that the current scope is stable.

## Use When

- The user says release, deploy, push, package, or final QA.
- Multiple systems changed in one session.
- A handoff report needs a final pass/fail state.

## Required Checks

- `node tools/validator.js`
- Relevant simulator pass, usually `python tools/simulator_v3.py 100 all`
- `node tools/i18n-smoke.js` when language files changed
- Browser smoke for UI/runtime changes
- `harness/CHECKLIST-release.md`
- `git status --short` to identify changed files without reverting them

## Report Template

```md
# Codex Release QA

## Result
READY / BLOCKED

## Commands
- command: PASS/FAIL summary

## Issues
- P0/P1/P2/P3 with file references

## Notes
- Remaining manual checks
```

Save optional local reports under `_workspace/codex/qa/` or
`_workspace/qa-reports/`.
