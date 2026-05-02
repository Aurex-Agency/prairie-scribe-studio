# Add The Steward Podcast Logo Across the Site

The user uploaded the official wordmark logo. I've already prepped two transparent variants for crisp display on dark backgrounds:

- `src/assets/steward-logo.png` — original colors (red "STEWARD", dark brown "THE" / "PODCAST"), white background removed.
- `src/assets/steward-logo-light.png` — red "STEWARD" preserved, the previously dark-brown "THE" / "PODCAST" recolored to cream so they read clearly on dark surfaces.

## Where the logo will appear

### 1. Top nav — `src/components/steward/Nav.tsx`
Replace the current text wordmark ("THE STEWARD PODCAST" + tagline) with the cream-variant logo.
- Height: `h-10` mobile, `h-12` desktop, auto width, object-contain.
- Subtle `drop-shadow` so it floats over the hero image when the nav is transparent at the top.
- Tiny scale-up on hover for polish.
- Keep the existing scroll-to-solid behavior.

### 2. Mobile drawer header — `src/components/steward/Nav.tsx`
Replace the "THE STEWARD" text with the same cream logo at `h-9`.

### 3. Hero — `src/components/steward/Hero.tsx`
Add the logo as a refined badge above the hero headline (replaces the small "— The Steward Podcast" eyebrow on mobile, keeps eyebrow on desktop where space allows). Sized `h-16 md:h-20` to feel premium without overpowering the cinematic photo.

### 4. Browser tab — `index.html`
Use a small square crop of the logo as the favicon (`/favicon.png`) and remove the existing `favicon.ico` so the new one takes over.

## Why this approach
- Using the cream-text variant guarantees legibility on every dark surface across the site (nav, drawer, hero overlay, leather-bg sections).
- One transparent PNG file means consistent brand presentation; no recoloring hacks per location.
- Drop shadows on the nav handle the rare case where the logo sits over a brighter sky portion of the hero image.

## Out of scope
- No changes to footer wordmark text (it's a stylized footer brand line, not a logo slot).
- No animation beyond the existing scroll-reveals + hover scale.

## Files to touch
- `src/components/steward/Nav.tsx` (logo in header + drawer)
- `src/components/steward/Hero.tsx` (logo above headline)
- `index.html` (favicon link)
- Delete `public/favicon.ico` if present, add `public/favicon.png`
