const qs = [
  { q: "Why do you live this way?", a: "Not the surface answer. The honest one.", off: "lg:ml-0" },
  { q: "How did you learn what you know?", a: "From family, failure, pressure, animals, land, and years of repetition.", off: "lg:ml-24" },
  { q: "What should the next generation understand?", a: "The part that cannot be captured in a highlight reel.", off: "lg:ml-12" },
  { q: "What responsibility comes with the lifestyle?", a: "Because stewardship is not ownership. It is care.", off: "lg:ml-40" },
];

const Wave = () => (
  <div className="flex items-end gap-1 h-8" aria-hidden>
    {[3, 6, 4, 8, 5, 7, 4, 9, 5, 6, 3].map((h, i) => (
      <span
        key={i}
        className="block w-[3px] bg-clay-red/60 wave-bar"
        style={{ height: `${h * 4}px`, animationDelay: `${i * 0.12}s` }}
      />
    ))}
  </div>
);

export const Questions = () => {
  return (
    <section className="bg-cream relative py-24 md:py-36 overflow-hidden">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-px bg-clay-red" />
          <span className="label text-clay-red">Chapter 06 — A pause</span>
        </div>
        <h2 className="display text-5xl md:text-7xl lg:text-8xl text-primary-dark leading-[0.95] max-w-4xl">
          What this podcast is really asking.
        </h2>

        <Wave />

        <div className="mt-16 md:mt-24 space-y-14 md:space-y-20">
          {qs.map((item, i) => (
            <div key={item.q} className={`max-w-3xl ${item.off}`}>
              <span className="font-condensed text-clay-red text-sm tracking-[0.2em]">Q.0{i + 1}</span>
              <h3 className="display text-3xl sm:text-5xl md:text-6xl text-primary-dark mt-3 leading-[1]">
                {item.q}
              </h3>
              <p className="mt-5 text-lg italic font-body text-muted-foreground max-w-xl">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28 max-w-3xl">
          <Wave />
          <p className="mt-6 font-display text-3xl md:text-5xl text-primary-dark leading-tight">
            The Steward Podcast is where those answers have{" "}
            <span className="text-clay-red italic font-body normal-case tracking-normal">room to breathe.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
