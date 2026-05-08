# Browser Smoke QA

## Description

Minimal runtime QA for the static browser game after UI, CSS, script loading, or
runtime logic changes.

## Trigger

Use this skill after touching `index.html`, `style*.css`, `components-*.js`,
`app*.js`, `i18n-runtime.js`, or minigame wrapper files.

## Procedure

1. Start a local static server:

```bash
python -m http.server 4173
```

2. Open:

```text
http://localhost:4173/index.html
```

3. Check boot, main menu, new game, one card choice, settings, language toggle,
   and any feature touched by the patch.
4. Check the console for errors.
5. Check at least one mobile-like viewport when layout changed.

## Output

Report tested URL, smoke path, console status, viewport notes, and blockers.
