# i18n Content Pass

## Description

Checklist for Korean/English UI and content overlay changes.

## Trigger

Use this skill after touching `lang-*.js`, user-facing UI text, card text,
archive entries, evidence text, or evening dialogue.

## Procedure

1. Identify whether the change is source Korean, English overlay, or UI label.
2. Keep keys stable unless a rename is necessary.
3. Confirm both Korean and English UI maps contain the needed keys.
4. Confirm card overlay IDs match real card IDs.
5. Run when relevant:

```bash
node tools/i18n-smoke.js
```

6. For layout-sensitive English changes, run browser smoke QA.

## Output

Report missing keys, long-string layout risk, untranslated text, and commands
run.
