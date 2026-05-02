const heroImg = "/hero-cowboy-shadow.webp";
const heroImgMobile = "/hero-cowboy-shadow-mobile-sm.webp";
const logoLight = "/steward-logo-light-small.webp";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden text-cream">
      {/* BG */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroImgMobile} />
          <img
            src={heroImg}
            alt="Shadow of a cowboy on horseback cast across cracked desert ground"
            className="w-full h-full object-cover slow-zoom"
            style={{ objectPosition: "70% 15%" }}
            width={1400}
            height={1867}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {/* Darken for legibility against the bright sand */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grain" />
      </div>


      {/* Right rail vertical text */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 items-center gap-6">
        <div className="vline label text-cream/70">
          Western &amp; Agricultural Stories&nbsp;&nbsp;/&nbsp;&nbsp;Preserving What Matters
        </div>
        <div className="w-px h-32 bg-accent/60" />
      </div>

      {/* Top-left small rule */}
      <div className="absolute top-28 md:top-32 left-6 md:left-12 flex items-center gap-3">
        <span className="w-10 h-px bg-accent" />
        <span className="label text-accent">The Steward Podcast</span>
      </div>

      {/* Content lower-left */}
      <div className="container relative h-full">
        <div className="absolute bottom-16 md:bottom-24 left-0 right-0 max-w-[64rem] pr-6 md:pr-12">
          <img
            src={logoLight}
            alt="The Steward Podcast"
            className="h-16 md:h-24 w-auto object-contain mb-6 anim-fade drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]"
            width={256}
            height={128}
            fetchPriority="high"
            decoding="async"
          />
          <h1
            className="display text-[3.4rem] sm:text-7xl md:text-[7.5rem] lg:text-[9rem] text-cream anim-rise"
            style={{ animationDelay: "0.05s" }}
          >
            This life was never <br className="hidden sm:block" />
            meant to be <span className="text-accent italic font-body font-normal normal-case tracking-normal">performed.</span>
          </h1>
          <p
            className="mt-6 md:mt-8 max-w-xl text-base md:text-lg leading-relaxed text-cream/85 anim-fade"
            style={{ animationDelay: "0.4s" }}
          >
            Honest conversations with the people who live the western and agricultural way of life — ranchers,
            farmers, horsemen, rodeo athletes, stock contractors, and the ones still doing the work when nobody is
            watching.
          </p>
          <div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 anim-fade"
            style={{ animationDelay: "0.6s" }}
          >
            <a href="#episodes" className="btn-brass">Watch the Latest Episode</a>
            <a href="#mission" className="btn-ghost-light">
              Hear Why This Podcast Exists
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-6 hidden lg:flex items-center gap-3 text-cream/60">
        <span className="label">Scroll</span>
        <span className="w-12 h-px bg-cream/40" />
      </div>
    </section>
  );
};
