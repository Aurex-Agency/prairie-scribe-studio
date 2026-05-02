# Add Scroll Animations + Smooth Site Flow

Right now sections snap into view abruptly and the rhythm between them feels uneven on mobile (paper-bg → bg-dark → paper-bg with hard seams). We'll add tasteful scroll-reveal animations and tune the vertical flow so the whole site reads as one continuous story.

## 1. New `Reveal` component — `src/components/steward/Reveal.tsx`

A lightweight IntersectionObserver wrapper (no framer-motion needed; uses existing `rise` / `fadeUp` keyframes in `index.css`).

- Props: `as` (default `div`), `delay` (ms), `variant` (`rise` | `fade` | `slide-left` | `slide-right`), `className`, `children`.
- Behavior: starts hidden (opacity 0, translated 20–28px), adds `is-visible` class when ≥15% in view, animates once.
- Respects `prefers-reduced-motion` — renders content immediately with no transform.
- Uses CSS transitions (cheap on mobile) instead of JS animation loops.

## 2. CSS additions — `src/index.css`

- Add `.reveal`, `.reveal.is-visible`, plus `.reveal-rise`, `.reveal-fade`, `.reveal-left`, `.reveal-right` variants.
- Use `transition: opacity .9s, transform .9s cubic-bezier(0.22, 1, 0.36, 1)` with a CSS variable for `--reveal-delay` to support staggering.
- Add `@media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none; } }`.
- Improve flow: add `.section-seam` helper (a faint top gradient hairline) and apply via component edits below for soft transitions between paper-bg and bg-dark sections.
- Tighten mobile section rhythm: `section { scroll-margin-top: 80px }` so anchor jumps clear the nav.

## 3. Wrap content with Reveal in each section

For these files, wrap heading-blocks, body paragraphs, image blocks, and grid items with `<Reveal>` and stagger using `delay` (0, 120, 240 ms patterns):

- `Hero.tsx` — keep hero as-is (already animated via slow-zoom); add `Reveal` to the right-rail/badge if needed.
- `Stewardship.tsx` — eyebrow + heading + paragraphs; numbered list staggered.
- `Guests.tsx` — heading block, then each guest card with stagger.
- `Timeline.tsx` — each step staggered (slide-left/slide-right alternation if layout supports).
- `Episodes.tsx` — heading, featured episode, then platform list.
- `Host.tsx` — portrait (slide-left) + bio block (slide-right).
- `Questions.tsx` — each question staggered with offset matching `off`.
- `Contact.tsx` — image side + form side both reveal.
- `Footer.tsx` — single fade.

## 4. Smooth flow tweaks

- Standardize mobile section padding to `py-20 md:py-32` where it currently swings between 24 and 36 — cleaner cadence.
- Add a 1px gradient seam (clay-red → transparent) at the top of `Guests`, `Episodes`, `Host`, `Questions`, `Contact` so the alternating dark/paper backgrounds blend instead of butting up.
- `html { scroll-behavior: smooth }` already set; add `overscroll-behavior-y: none` on `body` to kill iOS rubberband flicker between sections.

## Out of scope
- No framer-motion dependency (keeps bundle small, mobile-fast).
- No copy or color changes.
- No layout restructuring beyond padding standardization.

## Technical notes
- Files touched: `src/index.css`, `src/components/steward/Reveal.tsx` (new), and each section component listed above.
- Animation runs on mobile and desktop equally; the user said "on mobile" but limiting to mobile-only would feel inconsistent when resizing — applying universally is the better UX call.
