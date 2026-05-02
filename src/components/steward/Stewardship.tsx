export const Stewardship = () => {
  const lines = [
    "The why behind the work",
    "The mindset behind the lifestyle",
    "The lessons learned from land and livestock",
    "The responsibility carried by the people who live it",
  ];

  return (
    <section id="mission" className="paper-bg relative py-24 md:py-36 overflow-hidden">
      <div className="container relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Chapter 01 — Why this exists</span>
          </div>
          <h2 className="display text-5xl sm:text-7xl md:text-8xl text-primary-dark">
            Not cowboy content. <br />
            <span className="text-clay-red">Stewardship.</span>
          </h2>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-foreground/80">
            Social media shows the hat, the horse, and the highlight. The Steward Podcast goes behind the image and
            asks what it really takes to live this way.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/80">
            The goal is not to make people chase a look. The goal is to help them respect the life.
          </p>
        </div>

        <div className="lg:col-span-5 lg:mt-12">
          <div className="field-note relative p-9 md:p-11">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              <span className="label text-muted-foreground">Field note №01</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-primary-dark mb-7">
              What gets preserved here
            </h3>
            <ul className="space-y-4">
              {lines.map((l, i) => (
                <li key={l} className="flex items-baseline gap-4 border-b border-foreground/10 pb-4 last:border-b-0">
                  <span className="font-condensed text-xs text-clay-red mt-1">0{i + 1}</span>
                  <span className="font-body text-base md:text-lg text-foreground/85">{l}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 italic font-body text-sm text-muted-foreground">
              — recorded from north Mississippi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
