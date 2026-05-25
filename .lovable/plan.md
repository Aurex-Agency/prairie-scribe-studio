# Guests Section — Ledger / Field-Notes Redesign

Replace the image-based marquee card layout with a typographic, image-free ledger that matches the existing field-notes aesthetic.

## Layout

Two-column ledger rows on desktop, stacked on mobile. Hairline dividers between rows. Subtle hover state lifts the accent rule and shifts the title slightly.

```text
─────────────────────────────────────────────────────────────
CHAPTER · 01    RANCHERS              Land, livestock, patience,
                                      pressure, and the daily
                                      choices nobody sees.
─────────────────────────────────────────────────────────────
CHAPTER · 02    FARMERS               The discipline of seasons…
─────────────────────────────────────────────────────────────
…
```

- Left column (~30%): condensed uppercase chapter index (`CHAPTER · 01`) in clay-red, tracked-out.
- Middle column (~25%): display-font guest title (Ranchers, Farmers, …) in dark charcoal.
- Right column (~45%): body copy in muted foreground.
- Top + bottom hairlines on the whole table; thin divider between each row.
- On hover: row gets a faint cream background tint, left chapter index nudges right ~4px, a 1px clay-red rule appears under the title.

## Section frame

- Keep existing `paper-bg section-seam` wrapper, heading, eyebrow, and intro copy untouched.
- Remove the marquee track, `GuestCard`, and all `guest-*.webp` imports.
- Keep the closing "Start With an Episode" CTA.

## Files to change

- `src/components/steward/Guests.tsx` — rewrite the list portion as a semantic `<dl>` or `<ul>` ledger; drop all image imports; keep `guests` data array (title + copy only).

## Technical details

- Use existing tokens: `text-clay-red`, `text-cream` (dark text token), `border-border`, `font-condensed`, `font-display`, `font-body`.
- Grid: `grid grid-cols-1 md:grid-cols-12` per row; `md:col-span-3 / 3 / 6`.
- Dividers via `border-t border-border/60`; last row also gets `border-b`.
- Hover handled with Tailwind `group` + `transition` utilities, no JS.
- Remove now-unused asset imports and (optionally) the `-sm` webp files only if no other component references them — leave assets in place for this plan; do not delete files.
- No new dependencies; no changes to other sections.
