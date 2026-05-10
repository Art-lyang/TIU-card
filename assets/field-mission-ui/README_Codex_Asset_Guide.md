# TIU Field Mission UI PNG Assets

This folder contains transparent PNG layers for the Field Mission terminal UI.
Runtime text should stay in HTML/CSS so localization and layout checks remain manageable.

## Folders

- `frames/`: outer terminal frames, header panels, status bars, button grids, dividers, and corner brackets.
- `buttons/`: square, wide, and step pill button states.
- `badges/`: empty hex badge frames.
- `icons/`: terminal icons used by mission controls and status lines.
- `fx/`: scanline, grid, glow, and neon line overlays.
- `preview/`: reference blank layout image from the source package.

## Usage Notes

- Keep asset paths relative, for GitHub Pages compatibility.
- Use PNG frames as presentation layers and render game text as DOM text.
- Pair `*_yellow` assets with the current expected action.
- Pair `*_active` assets with completed or confirmed actions.
- Keep temporary screenshots and experiments under `_workspace/`, not in this asset folder.
