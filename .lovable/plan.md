## Goal

Make the Chapter 02 (Guests) marquee look polished and ensure all card text is clearly readable.

## Problems with current section

- Card title + copy use `text-cream`, which we repurposed to **dark charcoal** for the light theme. Sitting on a dark image gradient at the bottom of the card, dark text disappears.
- "Conversation" tag uses `text-accent` over `bg-dark/40` — low contrast on the now light theme.
- Cards are pure image with overlaid text; the new site is white/cream so floating dark images with overlays feel disconnected from the page.
- `from-dark/85` references a token that no longer reads dark consistently.

## Redesign (single file: `src/components/steward/Guests.tsx`)

Switch from "image-with-overlay-caption" to a **two-pane editorial card**: image on top, white info panel underneath. This both restores readability and looks more premium.

### Card layout
- Wrapper: `w-[19rem] sm:w-[21rem]` (drop fixed `h-[28rem]`), `bg-white`, `shadow-leather`, `ring-1 ring-black/5`, subtle hover lift `group-hover:-translate-y-1`.
- **Image pane**: fixed `h-72 sm:h-80`, full-cover image with longer zoom on hover (`duration-[1400ms]`, `scale-110`).
- Image overlay: lighter `from-black/55 via-black/10 to-transparent` (just for the tag chip contrast, not for text).
- **Tag chip** ("Conversation"): white pill `bg-white/90 backdrop-blur-sm`, clay-red text, condensed uppercase tracking — reads on any image.
- **Info panel** (below image, white): 
  - Title: `font-display text-2xl md:text-3xl` in dark charcoal `hsl(4 11% 12%)`.
  - 10px clay-red rule.
  - Copy: `text-sm` in muted charcoal `hsl(4 11% 30%)` for proper hierarchy.

Inline `style={{ color: ... }}` is used on the title/copy/tag so we don't fight the section-level `text-cream` (which is now dark). This guarantees correct contrast regardless of token reuse.

### Marquee polish
- Increase gap from `gap-6` to `gap-7`.
- Add `py-2` to the masked container and `px-2` to the track so the cards' shadows aren't clipped against the mask edge.

### Header / CTA
- Untouched — already light-theme correct.

## Result

- Image stays the hero of the card.
- Title and description are now dark text on a clean white panel — fully readable in any browser/lighting.
- The white card with leather shadow looks intentional against the warm `paper-bg`.
- Marquee retains its motion but feels less crowded.

No other files touched. Token system unchanged.
