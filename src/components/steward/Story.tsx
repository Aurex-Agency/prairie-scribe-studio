import portrait from "@/assets/host-portrait.webp";
import portraitMobile from "@/assets/host-portrait-mobile.webp";
import { Reveal } from "./Reveal";

export const Story = () => {
  return (
    <section id="story" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
      <div className="container relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Portrait */}
        <Reveal variant="left" className="lg:col-span-5 relative">
          <div className="relative shadow-leather">
            <picture>
              <source media="(max-width: 767px)" srcSet={portraitMobile} />
              <img
                src={portrait}
                alt="N'shaun Cameron, host of The Steward Podcast, in north Mississippi"
                loading="lazy"
                className="w-full h-auto object-cover"
                width={1100}
                height={1400}
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 ring-1 ring-cream/10" />
          </div>
          <p className="font-body italic text-sm text-cream/55 mt-4 max-w-xs">
            N'shaun Cameron — host and steward of the conversation.
          </p>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal variant="rise" className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Why this exists</span>
          </Reveal>
          <Reveal variant="rise" delay={120} as="h2" className="display text-4xl sm:text-6xl md:text-7xl text-cream leading-[1]">
            Not chasing a trend. Preserving a{" "}
            <span className="text-clay-red italic font-body normal-case tracking-normal">way of life.</span>
          </Reveal>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-cream/80 max-w-2xl">
            <Reveal variant="fade" delay={240} as="p">
              Stewardship is the quiet weight behind the western and agricultural way of life — the responsibility
              of caring for land, livestock, and the people who depend on both. It isn't ownership. It isn't
              performance. It's care that outlasts the person doing it.
            </Reveal>
            <Reveal variant="fade" delay={340} as="p">
              Raised in north Mississippi with a heart for the lifestyle, N'shaun Cameron built The Steward Podcast
              to give that care room to breathe — honest conversations about why people do the work, how they
              learned it, and what wisdom should be carried forward.
            </Reveal>
          </div>
          <Reveal variant="rise" delay={420} className="mt-10 flex flex-col sm:flex-row gap-5 sm:items-center">
            <a href="#episodes" className="btn-brass">Watch an Episode</a>
            <a href="#community" className="btn-ghost-light !text-clay-red" style={{ borderColor: "hsl(var(--clay-red) / 0.4)" }}>
              Join the Community <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
