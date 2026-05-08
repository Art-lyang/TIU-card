# Release Preflight

## Description

Final Codex checklist before a release, push, package, or public QA build.

## Trigger

Use this skill when the user asks for release QA, deployment readiness, final
check, packaging, or push preparation.

## Procedure

1. Read `harness/CHECKLIST-release.md`.
2. Run:

```bash
node tools/validator.js
```

3. Run a relevant simulation sweep:

```bash
python tools/simulator_v3.py 100 all
```

4. Run `node tools/i18n-smoke.js` if language files changed.
5. Run browser smoke QA if UI/runtime files changed.
6. Check:

```bash
git status --short
```

7. Do not clean, reset, or delete unrelated changes.

## Output

Report READY or BLOCKED, with commands, issues, and remaining manual checks.
