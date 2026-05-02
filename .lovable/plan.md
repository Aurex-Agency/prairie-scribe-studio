# Make Chapter Headers More Readable

The thin red "Chapter 0X — …" eyebrows across sections are hard to read because they use `.label` (`font-condensed`, `uppercase`, `text-xs`, light tracking) in a fairly dark crimson (`--clay-red: 353 75% 45%`) on the dark cream-on-charcoal background.

## Changes

### 1. `src/index.css`
- Brighten `--clay-red` from `353 75% 45%` → `353 80% 58%` so the accent reads clearly on dark backgrounds (still warm/clay, just more luminous).
- Beef up the `.label` utility: bump from `text-xs` → `text-sm`, add `font-semibold`, and tighten tracking slightly (`tracking-[0.28em]`) so the uppercase reads as a deliberate eyebrow rather than fine print.
- Add a small text-shadow / drop in opacity contrast helper class `.chapter-eyebrow` (optional) — or simply rely on the strengthened `.label`. We'll go with strengthened `.label` only to keep changes minimal and consistent everywhere it's used.

### 2. Verify usage stays clean
`.label` is used for chapter eyebrows in Stewardship, Guests, Episodes (×2), Host, Questions. Strengthening the shared utility upgrades all of them in one shot — no per-component edits required.

### 3. Out of scope
- No layout changes.
- No copy changes.
- The brighter `--clay-red` will also subtly lift inline accent words (e.g. "stewardship.", "dirt on their boots.") which is desirable for the same legibility reason.

## Technical notes
- File touched: `src/index.css` only.
- Tailwind picks up the updated CSS variable automatically; no config changes.
