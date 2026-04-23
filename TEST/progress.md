# TEST mini-game prototype progress

Original request: create an isolated `TEST` folder that shows how short field-mission mini-games could play before touching production code.

## Progress

- Kept all prototype work inside `TEST/`.
- Added `index.html`, `styles.css`, and `minigame-demo.js`.
- Added Korean/English copy structure inside the prototype so production i18n can follow the same shape later.
- Implemented eight playable examples:
  - Signal alignment
  - Evidence sorting
  - Quarantine sequence
  - Sample recovery timing
  - Scan search
  - Log restoration
  - Route evasion
  - Testimony cross-check
- Updated signal alignment so the cursor moves automatically and the player confirms timing with Space / Enter / the confirm button.
- Reverted signal alignment back to a CSS-built terminal style because the image assets made the prototype feel visually noisy.
- Centered the signal confirm button for mobile-friendly play.
- Added hash entry points such as `index.html#sample` and `index.html#route` so each prototype can be opened directly.
- Verified the prototype with Edge headless. Playwright skill client could not run because the bundled `node.exe` is blocked by Windows with `Access is denied`, so Edge headless DOM/screenshot checks were used instead.

## Notes

- The current files are a prototype only. Production integration should use a new mini-game component/module file rather than merging this directly into existing core files.
- Mission-specific text should be stored in a dedicated `miniGames` i18n bucket when moved into the real game.
- The fixed signal PNGs were sampled and include transparent pixels. The old temporary `*_clean.png` files were removed to avoid confusion.
- Route evasion now uses one random sheet from three solvable layouts. Red cells fail immediately, gray cells are blocked, and amber jammer cells cost extra movement.
- Quarantine sequence now uses one random protocol from three variants. Each variant changes both the instruction order and the button layout.
- Reworked ORACLE TRACE away from a Cyberpunk-like matrix/buffer design into a TIU-specific authority network. The player now moves through connected nodes, collects KEY traces, manages EXPOSURE, and exits before ORACLE blocks the session.
- ORACLE TRACE randomizes across three node-network scenarios, and timeout with no meaningful progress correctly fails instead of granting partial success.
- Scan search now follows mouse/touch movement, has decoy reactions, and completes when the scanner is held over the anomaly.
- Scan search no longer treats click/tap as an immediate confirm/fail action. Pointer/touch input only moves the scanner, and SIGNAL percent decays gradually instead of snapping back to 0.
- Sample recovery was changed away from signal-style timing. It now uses a fishing-like hold/release interaction where the extractor probe must track a moving specimen while capture and stress gauges change.
- Sample recovery UI wording was shifted away from fishing language: `CAPTURE/STRESS` became `RECOVERY/OVERLOAD`, and Korean result copy now emphasizes equipment overload and spread risk.
- Added the 10th prototype mini-game: latent reaction screening. It asks the player to read biometric, behavioral, and neural signs across six waiting personnel and flag up to three latent exposed subjects.
