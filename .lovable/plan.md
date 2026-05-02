## Goal

Make "The Steward" and "& Podcast" wordmarks dark on the header logo so they're readable against the new white background. The "Steward" lockup graphic stays maroon.

## Cause

`Nav.tsx` imports `steward-logo-light.png`, which has the wordmark text in cream — invisible/blown out on white. The repo already contains `steward-logo.png` with the same artwork but with the wordmark in **dark charcoal** (verified: 23k near-black pixels vs the light version's 30k near-white pixels; the maroon "Steward" lockup is identical in both).

## Change

**`src/components/steward/Nav.tsx`**

1. Line 3 — swap the import to the dark-wordmark variant:
   ```tsx
   import logoLight from "@/assets/steward-logo.png";
   ```
   (Variable name kept the same to avoid touching every JSX usage.)

2. Line 36 — drop the heavy black drop-shadow that was only there to lift the white wordmark off transparent backgrounds; on white it just produces a smudge:
   ```tsx
   className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
   ```

The mobile drawer (`leather-bg`, which is now also light) will pick up the dark wordmark too — that's correct.

No other files need to change.
