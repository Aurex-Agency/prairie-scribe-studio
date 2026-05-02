## Goal

On the mobile sticky bottom bar, make the "Watch Latest" button text white so it's readable on the maroon brass gradient.

## Cause

`MobileBar.tsx` line 5 uses `text-cream` for the button label. We previously repurposed `--cream` to dark charcoal so it would read on the new white page backgrounds — that flipped this button's text dark on its dark-maroon brass background, making it unreadable.

## Change

**`src/components/steward/MobileBar.tsx`** line 5 — swap `text-cream` for `text-white` on the "Watch Latest" anchor only:

```tsx
className="py-4 text-center font-condensed uppercase tracking-[0.2em] text-xs font-semibold text-white"
```

The neighboring "Suggest Guest" link sits on the dark `bg-primary-dark/95` bar so its `text-cream` (now dark) is also wrong, but the user only asked about "Watch Latest". Leaving Suggest Guest alone unless they call it out.

No other files need to change.
