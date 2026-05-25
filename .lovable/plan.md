# Guests Ledger — Remove Row Labels

Remove the "Chapter · 0X" label (and its accent rule) from each row in the Guests ledger. Keep everything else as-is.

## Change

In `src/components/steward/Guests.tsx`:
- Delete the left-column `<div>` containing the `w-6 h-px bg-clay-red` rule and the "Chapter · 0X" span.
- Rebalance the grid so the title and copy fill the row cleanly:
  - Title: `md:col-span-5`
  - Copy: `md:col-span-7`
- Leave the hover lift, dividers, heading, intro copy, and CTA untouched.

No other files affected.
