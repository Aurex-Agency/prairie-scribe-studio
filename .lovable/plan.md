## Goal

Redesign the Chapter 07 contact form so it actually fits the new light theme — currently the inputs render dark-on-dark (invisible text), the section uses removed leather styling, and the layout is a plain stack of underlined fields.

## Problems with current form

- Wrapper uses `bg-primary-dark` + `leather-bg` (now both white) so the section is just blank cream.
- `.input-leather` uses `bg-dark/50` with `color: hsl(var(--cream))` — but `--cream` is now dark charcoal. So you get dark text on dark inputs = unreadable.
- Accents reference `text-accent` which is the bright web-red, not the maroon `clay-red` used everywhere else.
- No card/container — fields float on the page.
- Name and Email stack on every breakpoint, wasting space.

## Redesign (single file: `src/components/steward/Contact.tsx`)

1. **Section shell**: replace `bg-primary-dark` + inner `leather-bg` + grain overlay with the standard `paper-bg` we use for other chapters. Drop the duplicate inner `<div className="absolute inset-0 grain" />`.

2. **Form container**: wrap the form in a clean white card — `bg-white shadow-card border border-border p-7 md:p-9 space-y-6` — so it reads as "a note on the table" instead of floating fields.

3. **Layout**: put Name + Email side-by-side via `grid grid-cols-1 sm:grid-cols-2 gap-6`. Topic and Message stay full-width.

4. **Accent swap**: `text-accent` → `text-clay-red` and `bg-accent` → `bg-clay-red` for the chapter label, the italic emphasis ("worth preserving?"), and field labels — consistent with the rest of the site.

5. **Inputs** — replace `.input-leather` with a new `.input-paper` style:
   - Background: cream `hsl(30 30% 97%)` → on focus white
   - Border: `1px solid hsl(30 15% 82%)` → focus ring `hsl(var(--clay-red))` with `0 0 0 3px hsl(var(--clay-red) / 0.12)` glow
   - Text color: dark charcoal `hsl(4 11% 12%)`
   - Placeholder: italic muted gray
   - Padding bumped to `0.85rem 1rem`, radius 2px
   - Hover state darkens border slightly

6. **Field labels**: smaller (`text-xs`) and clay-red, sitting above the input.

7. **Submit row**: button + the "Real stories only" italic note share one flex row on `sm+`, with the button on the right and reorder so the button comes first on mobile (`order-1 sm:order-2`).

8. **Submitted state**: change card from `bg-dark/40` to `bg-white shadow-card` with `border-clay-red/40` so it remains visible.

9. **Textarea**: bump rows from 4 → 5, add a useful placeholder ("Tell us about the story, the person, or the idea...").

`text-cream` is kept on body copy/heading inside the section because we repurposed the token to dark — it renders correctly as charcoal on the new white card/paper background.
