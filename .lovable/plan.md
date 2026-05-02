## Goal

Turn the "Conversations with people who have dirt on their boots" section into a continuously scrolling marquee of guest category cards — same on desktop and mobile — with a smooth, never-stopping animation.

## What changes

**File:** `src/components/steward/Guests.tsx`

1. Remove the current mobile horizontal snap-scroll and the desktop staggered 3-column grid.
2. Replace both with a single full-bleed marquee strip:
   - One horizontal track containing the 6 guest cards rendered twice back-to-back (so the loop is seamless).
   - Track animates with a CSS `translateX(0 → -50%)` keyframe on an infinite linear loop (~40s desktop, ~30s mobile feel via duration).
   - Cards keep their existing styling (image, gradient, title, copy) but use a uniform fixed width (e.g. ~22rem) and uniform height so the row reads as one clean ribbon. Drop the staggered offset/varying heights since they don't make sense in a moving row.
   - Soft fade masks on the left and right edges (CSS `mask-image` linear gradient) so cards fade in/out at the boundaries rather than hard-cutting.
   - On hover, pause the animation (`animation-play-state: paused`) for readability.
   - Respect `prefers-reduced-motion`: disable the animation and allow native horizontal scroll instead.

3. Keep the section heading, supporting copy, and the "Start With an Episode" CTA exactly as they are.

## Technical details

- Add a `marquee` keyframe and `.marquee-track` utility inside `src/index.css` (`from { transform: translateX(0) } to { transform: translateX(-50%) }`), plus a `.marquee-mask` helper using `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`.
- In `Guests.tsx`, render `[...guests, ...guests]` inside the track with `aria-hidden="true"` on the duplicate set for accessibility.
- Use `flex gap-6 w-max` on the track; each card gets `w-[22rem] shrink-0 h-[28rem]`.
- Wrap track in an outer `overflow-hidden` container with the fade mask.
- Add `@media (prefers-reduced-motion: reduce)` rule to drop the animation.

## Out of scope

- No copy changes, no new images, no changes to other sections.
