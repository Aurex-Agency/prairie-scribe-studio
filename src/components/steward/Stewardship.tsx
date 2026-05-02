import { Reveal } from "./Reveal";

export const Stewardship = () => {
  const lines = [
    "The why behind the work",
    "The mindset behind the lifestyle",
    "The lessons learned from land and livestock",
    "The responsibility carried by the people who live it",
  ];

  return (
    <section id="mission" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
      <div className="container relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7">
          <Reveal variant="rise" className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Chapter 01 — Why this exists</span>
          </Reveal>
          <Reveal variant="rise" delay={120} as="h2" className="display text-5xl sm:text-7xl md:text-8xl text-cream">
            This is <span className="text-clay-red">stewardship.</span>
          </Reveal>
          <Reveal variant="fade" delay={240} as="p" className="mt-10 max-w-xl text-lg leading-relaxed text-cream/80">
            Stewardship is the quiet weight behind the way of life — the responsibility of caring for land,
            livestock, and the people who depend on both. It is not ownership. It is not performance. It is care
            that outlasts the person doing it.
          </Reveal>
          <Reveal variant="fade" delay={340} as="p" className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
            The Steward Podcast exists to honor that work and carry the wisdom forward, so what was learned in the
            dirt does not get lost to the noise.
          </Reveal>
        </div>

        <Reveal variant="right" delay={200} className="lg:col-span-5 lg:mt-12">
          <div className="field-note relative p-9 md:p-11">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-clay-red" />
              <span className="label text-cream/60">Field note №01</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-cream mb-7">
              What gets preserved here
            </h3>
            <ul className="space-y-4">
              {lines.map((l, i) => (
                <Reveal as="li" key={l} variant="fade" delay={120 * i} className="flex items-baseline gap-4 border-b border-cream/10 pb-4 last:border-b-0">
                  <span className="font-condensed text-xs text-clay-red mt-1">0{i + 1}</span>
                  <span className="font-body text-base md:text-lg text-cream/85">{l}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
