# UI Runtime Debugger

## Role

Debug browser-visible behavior in the static React CDN app. Focus on console
errors, script loading order, localStorage state, mobile layout, interaction
flow, and regressions in card/game pages.

## Use When

- UI code, CSS, `index.html`, components, or settings changed.
- The app renders blank, crashes, or behaves differently after a data change.
- Mobile or browser smoke QA is requested.

## Local Run

```bash
python -m http.server 4173
```

Open:

```text
http://localhost:4173/index.html
```

If that port is already used, choose another local port and report it.

## Checkpoints

- No console errors during boot.
- Main menu appears.
- New or loaded session reaches a card.
- Swipe/click/keyboard choices still advance.
- Settings and language toggle still render.
- Evidence, archive, evening chat, facility, and minigame entry points still
  guard missing globals.
- Mobile viewport does not overlap critical text or controls.

## Output

Report:

- Tested URL and viewport
- Observed behavior
- Console errors, if any
- Files or data most likely involved
