## Goal

Replace the existing blockquote in the Timeline section with an inspirational line that speaks to the heart of The Steward Podcast — preserving knowledge, wisdom, and the western/agricultural way of life across generations.

## Current quote

> "Without preserving what matters outside the digital world, we eventually become a product of the system."

Located in `src/components/steward/Timeline.tsx` (lines 55–58).

## Proposed replacement

> "What is preserved with intention becomes the **inheritance of the next generation.**"

This ties directly to the site's themes already present elsewhere:
- Stewardship section: "care that outlasts the person doing it"
- Mission line: "carried forward across generations"
- Field note items: "What gets passed down"

The italic accent fragment ("inheritance of the next generation.") keeps the same visual rhythm as the current quote — a serif italic phrase styled with `text-accent` closing out a display-font sentence.

## Change

Single edit in `src/components/steward/Timeline.tsx`:

```tsx
<blockquote className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.05] text-cream">
  "What is preserved with intention becomes the{" "}
  <span className="text-accent italic font-body normal-case tracking-normal">
    inheritance of the next generation.
  </span>"
</blockquote>
```

No styling, layout, or surrounding rules change.

## Alternatives (let me know if you'd prefer one)

1. "The story is only finished when **someone is left to carry it.**"
2. "Wisdom does not survive by accident — it survives because **someone refused to let it go.**"
3. "Every generation either passes it forward, or **lets it disappear quietly.**"
