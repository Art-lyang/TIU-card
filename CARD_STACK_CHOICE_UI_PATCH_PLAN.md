# Card Stack / Choice UI Patch Plan

## Goal

Improve the main gameplay card presentation without changing game rules:

- Add a subtle stacked-card visual behind the active card.
- Replace the current plain bottom choice text with two in-card choice boxes.
- Keep existing swipe, keyboard, timer, ORACLE block, preview, toast, and i18n behavior intact.

## Allowed Files

Only these files should be changed for this patch:

- `components-game.js`
- `style.css`
- `index.html`
- `assets/gameplay/choice_chevron_left.png`
- `assets/gameplay/choice_chevron_right.png`

## Do Not Edit

These files are out of scope for this patch:

- `app.js`
- `data-*.js`
- `lang-*.js`
- `components-minigames.js`
- `components-settings*.js`
- `components-evening.js`
- `components-dialogue.js`
- `components-archive.js`

## Current Integration Points

Work inside `CardC` in `components-game.js`.

Important existing logic that must be preserved:

- `performSwipe(kdir)`
- `hS`, `hM`, `hE`
- `curDir`
- `leftFx`, `rightFx`
- `card.oracleBlock`
- `blockCount`
- `timerTotal` / `remaining`
- `p.onPreview`
- `p.onOracleBlock`
- `p.onReply`

## Safe Implementation

1. Copy chevron PNG assets into `assets/gameplay/`.
2. Add scoped CSS classes only:
   - `.card-stack`
   - `.card-stack__bg`
   - `.choice-boxes`
   - `.choice-box`
   - `.choice-box__inner`
   - `.choice-box__chev`
   - `.choice-box__body`
   - `.choice-box__text`
   - `.choice-box__fx`
3. Wrap the existing `CardC` card panel with `card-stack` decorative layers.
4. Replace only the current lower effect/choice text render block with choice boxes.
5. Choice box click must call the same guarded choice path as keyboard/swipe.
6. Do not call `p.onSwipe()` directly from the new choice boxes.

## High-Risk Areas To Check Carefully

- ORACLE block cards must not be bypassed by clicking the new choice boxes.
- Clicking a choice box must not also start a drag gesture.
- Keyboard left/right must still work.
- Swipe left/right must still work.
- Timer cards must still auto-select correctly.
- `p.onPreview` must still clear after drag ends.
- Long Korean/English choice labels must not overflow on mobile.
- Mobile card bottom must not be clipped by the frame.

## Rollback Criteria

Revert the `CardC` part of this patch if any of these happen:

- A choice triggers twice from one click/tap.
- ORACLE block no longer blocks the intended direction.
- Dragging the card no longer works.
- Keyboard selection no longer works.
- Timer cards stop advancing.
- The card bottom choice area is clipped on mobile.

## Verification Checklist

Run after changes:

- `node --check components-game.js`
- `node tools\i18n-smoke.js`
- `git diff --check -- components-game.js style.css index.html assets\gameplay`

Manual/browser checks:

- Basic card renders.
- Left/right swipe selects correctly.
- Left/right keyboard selects correctly.
- Left/right choice box click selects correctly.
- Choice box highlights while dragging.
- ORACLE block still shows block toast and shake.
- Mobile width does not clip choice boxes.

## Final Result Note

The choice-box visual direction was tested and then rolled back because it did not match the current card tone and caused English label fit issues. The safer guarded choice routing in `CardC` remains useful, but the visible bottom choice area is restored to the previous lightweight text style.
