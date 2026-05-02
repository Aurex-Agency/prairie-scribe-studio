## Goal

The current crimson is bleeding into the cream background and feels muddy. Two problems to solve:

1. **Crimson visibility** — `#860114` is dark and low-saturation, so on cream it reads brown/dim and on the existing leather sections it disappears entirely. Brighten the working accent crimson to `#C8112A` (a more luminous version of the brand red) used wherever crimson sits on dark or near-cream surfaces. The original `#860114` stays preserved as the deep brand mark color.
2. **Overall ambiance** — flip the site from cream-dominant to **charcoal-dominant**, with cream used as text and as a secondary section break. Imagery becomes bolder, darker, and more cinematic.

Hero, rancher, horseman, and rodeo guest images have already been regenerated with darker, more dramatic, cinematic compositions (deep shadows, single warm crimson light source, charcoal blacks dominant). Those will be picked up automatically.

## What changes

### `src/index.css` — design system

- Flip semantic tokens to a dark default:
  - `--background` → charcoal `4 11% 11%`
  - `--foreground` → cream `30 100% 99%`
  - `--card`, `--popover`, `--muted` → charcoal variants
  - `--border` → `4 11% 26%`
- Add a brighter working crimson:
  - `--accent` and `--clay-red` → `353 75% 45%` (≈ `#C8112A`) — the screen-legible crimson
  - `--primary` keeps the deep brand `#860114` for solid brand fills
- Strengthen depth:
  - `--gradient-hero` darker (drops to ~96% black at the bottom)
  - `--gradient-brass` re-tuned as a brighter-to-deep crimson gradient so CTAs pop
  - `--shadow-leather` and `--shadow-card` deepened
- `.paper-bg` becomes a **dark charcoal section** (was cream). It now reads as a softer charcoal panel between full-black sections, not a cream break. Text inside switches to cream.
- `.leather-bg` keeps charcoal but with a stronger crimson glow at top-left for warmth.

### Section components — contrast cleanup

The sections that currently assume a cream background need their text colors flipped to cream and their accents updated to the brighter crimson:

- `Stewardship.tsx` — was on `.paper-bg`. Headline, body, and field-note card need to render cleanly on charcoal: text → cream, supporting copy → `cream/80`, field-note card stays as a slightly lifted charcoal panel with a crimson rule.
- `Episodes.tsx` — same treatment: headline cream, recent-episode list rendered on charcoal with cream titles and `cream/70` descriptions, platform link borders → `cream/15`.
- `Host.tsx` — section background switches to a deeper charcoal block; copy → cream / `cream/80`; "Learn The Mission" link → brighter crimson.
- `Questions.tsx` — was on `bg-cream`; switch to `bg-dark`; question headlines → cream, supporting italic lines → `cream/60`; waveform bars → brighter crimson.
- `Guests.tsx` — section was `bg-light` (warm cream); switch to a charcoal section so the marquee cards float against darkness. Heading + body copy → cream / `cream/75`.
- `Nav.tsx` — scrolled-state stays charcoal; the Watch Now button uses the new brighter crimson gradient automatically via `.btn-brass`.
- `MobileBar.tsx` — already uses the brass gradient; will auto-pick up the brighter crimson.
- `Footer.tsx` — stays on `.leather-bg` (charcoal with crimson glow); link hover → brighter crimson.
- `Contact.tsx` — already dark; just verify accent label color picks up the brighter crimson.
- `Hero.tsx` — image is already darker; small overlay color adjust to deepen the bottom fade so the headline reads stronger.

### Imagery

Already regenerated with bolder, darker direction:
- `hero-ranch.jpg` — twilight, lone silhouette, crimson light shaft through storm sky
- `guest-rancher.jpg` — chiaroscuro hands on rope, single warm side light
- `guest-horseman.jpg` — silhouette in barn doorway, deep blacks
- `guest-rodeo.jpg` — chute at night, single warm arena light

The 3 remaining guest images (farmer, stock, ag) stay as-is for now — they already lean warm/dark and will read fine against a charcoal section.

## Technical details

- All color changes are scoped to `:root` tokens in `src/index.css` plus class swaps in the listed component files. No structural / layout changes.
- No changes to `tailwind.config.ts` — semantic tokens already map through CSS vars.
- Accessibility: cream-on-charcoal (`#FFFCF9` on `~#1F1B1B`) clears WCAG AA large text and AAA body text. Brighter crimson `#C8112A` on charcoal also clears AA.

## Out of scope

- No copy changes
- No new sections, no layout restructure
- Brand crimson `#860114` is preserved as the deep brand identity color; the new `#C8112A` is the working on-screen accent
