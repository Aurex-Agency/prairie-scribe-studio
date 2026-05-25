# Remove Episode Durations

Remove the `{e.len}` time labels ("1h 12 min", "47 min") from the Recent list in `src/components/steward/Episodes.tsx`.

- Delete the `<span className="label text-cream/50 ml-auto">{e.len}</span>` line.
- Remove the now-empty flex wrapper (or keep it for the EP number alone).
- Optionally drop the `len` field from each `recent` entry since it's unused.

No other changes.
