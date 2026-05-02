## Goal

Make Chapter 02 (Guests) and Chapter 05 (Host) sections match the new light theme — they currently use `bg-dark` so they still render as dark slabs with hard-to-read text.

## Cause

Both sections hardcode `className="bg-dark ..."`, which maps to the still-dark `--dark` token (kept dark intentionally for image overlays). The other sections use `paper-bg` / `leather-bg` which were already converted to light surfaces, so they look correct.

## Changes

**`src/components/steward/Guests.tsx`** (line 20–21)
- Replace `bg-dark` with `paper-bg`.
- Remove the now-unneeded `<div className="absolute inset-0 grain pointer-events-none" />` (grain reads as dark spots on white).

```tsx
<section id="guests" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
  <div className="container relative">
```

**`src/components/steward/Host.tsx`** (line 6–7)
- Same swap: `bg-dark` → `paper-bg`, remove the grain overlay div.

```tsx
<section id="host" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
  <div className="container relative grid ...">
```

The `text-cream` class already resolves to dark charcoal (we repurposed `--cream` in the theme switch), so all body copy and headings inside will automatically render dark on the new light backgrounds. Maroon `clay-red` accents remain.

The Guest cards themselves keep their internal dark image overlays (`from-dark/85`) — those are intentional for image legibility and don't need changing.
