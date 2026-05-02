## Goal

Keep `--clay-red` exactly at the logo color `hsl(354 100% 31%)` (rgb 157,0,17), and instead lighten the dark backgrounds so the maroon accents (chapter labels, EP numbers, links, headings highlight) become easily readable.

## Approach

The maroon is dark, so we need lighter, warmer backgrounds behind it. We'll lift the global dark surfaces a few steps without losing the moody leather feel. White outlines on the text were considered as the alternative but would clash with the editorial typography — lightening the background is cleaner and applies everywhere automatically.

## Changes (single file: `src/index.css`)

1. **Global dark surfaces** (root tokens) — bump lightness so maroon text has contrast:
   - `--background: 4 11% 11%` → `4 11% 22%`
   - `--card: 4 11% 16%` → `4 11% 26%`
   - `--popover: 4 11% 16%` → `4 11% 26%`
   - `--muted: 4 11% 20%` → `4 11% 30%`
   - `--border: 4 11% 26%` → `4 11% 36%`
   - `--input: 4 11% 22%` → `4 11% 32%`
   - `--primary-dark: 4 11% 14%` → `4 11% 24%`

2. **`.leather-bg`** (Hero, Contact) — lighter base + warmer top glow:
   - base `hsl(var(--primary-dark))` becomes the new lighter `--primary-dark` automatically
   - top radial: `hsl(353 80% 35% / 0.32)` → `hsl(30 25% 55% / 0.28)` (warm tan glow instead of red-on-red, so red text pops)
   - bottom radial alpha lowered: `hsl(4 11% 5% / 0.9)` → `hsl(4 11% 10% / 0.7)`

3. **`.paper-bg`** (Episodes, etc.):
   - base `hsl(4 11% 13%)` → `hsl(30 12% 26%)` (warm taupe)
   - top radial `hsl(4 11% 22%)` → `hsl(30 14% 36%)`

4. **Hero gradient overlay** — soften so background lift isn't crushed:
   - `--gradient-hero` end stop `hsl(4 11% 5% / 0.96)` → `hsl(4 11% 10% / 0.85)`

No component files need editing — every `text-clay-red`, `border-clay-red`, etc. immediately reads better against the lighter, warmer surfaces while the maroon stays exactly the logo color.

## Technical detail

All edits are in `src/index.css` lines 10–50 and 101–115. `--clay-red` (line 24) is unchanged. Token format remains raw HSL triplets used via `hsl(var(--token))`.
