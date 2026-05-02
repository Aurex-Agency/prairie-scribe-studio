## Goal

Fix the ugly fading bands on the left/right edges of the Chapter 02 marquee.

## Cause

`.marquee-mask` (in `src/index.css` lines 213–216) uses CSS `mask-image: linear-gradient(transparent → #000 → transparent)`. That fades the cards' alpha to 0 at the edges. On the new white `paper-bg` background it looks like a dirty grey wash because the white cards are fading to nothing against a slightly warmer page.

## Fix

Replace the alpha mask with two solid-color gradient overlays that match the section's `paper-bg` color (`hsl(30 30% 97%)`). The cards stay fully opaque; the overlay simply covers the card edges with the same color as the page, producing a clean "cards slide out under the page" effect.

### Change in `src/index.css` lines 213–216

```css
.marquee-mask {
  position: relative;
}
.marquee-mask::before,
.marquee-mask::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(48px, 8vw, 140px);
  pointer-events: none;
  z-index: 2;
}
.marquee-mask::before {
  left: 0;
  background: linear-gradient(90deg, hsl(30 30% 97%) 0%, hsl(30 30% 97% / 0) 100%);
}
.marquee-mask::after {
  right: 0;
  background: linear-gradient(270deg, hsl(30 30% 97%) 0%, hsl(30 30% 97% / 0) 100%);
}
```

Width uses `clamp` so the overlay shrinks on mobile (48px min) and grows on wide screens (up to 140px) without ever dominating the cards.

This keeps the smooth-edge effect, makes it color-correct against the warm white paper background, and removes the trash-looking transparent fade entirely.
