import portrait from "@/assets/host-portrait.webp";
import { Reveal } from "./Reveal";

export const Host = () => {
  return (
    <section id="host" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
      <div className="container relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <Reveal variant="left" className="lg:col-span-5 lg:-mt-32 relative">
          <div className="relative shadow-leather">
            <img
              src={portrait}
              alt="N'shaun Cameron, host of The Steward Podcast, in north Mississippi"
              loading="lazy"
              className="w-full h-auto object-cover"
              width={1100}
              height={1400}
            />
            <div className="absolute inset-0 ring-1 ring-cream/10" />
          </div>
          <p className="font-body italic text-sm text-cream/55 mt-4 max-w-xs">
            Host and steward of the conversation — N'shaun Cameron.
          </p>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-12">
          <Reveal variant="rise" className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Chapter 05 — The host</span>
          </Reveal>
          <Reveal variant="rise" delay={120} as="h2" className="display text-4xl sm:text-6xl md:text-7xl text-cream leading-[1]">
            N'shaun Cameron is not chasing a trend. He is preserving a{" "}
            <span className="text-clay-red italic font-body normal-case tracking-normal">way of life.</span>
          </Reveal>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-cream/80 max-w-2xl">
            <Reveal variant="fade" delay={240} as="p">
              Raised from north Mississippi with a heart for the lifestyle, N'shaun built The Steward Podcast to
              create space for deeper conversations around the agricultural and western industries. He wants to
              understand why people do what they do, how they learned it, what keeps them in it, and what wisdom should be carried forward.
            </Reveal>
            <Reveal variant="fade" delay={340} as="p">
              The podcast is built on respect. Respect for the land. Respect for livestock. Respect for the people
              who commit their lives to the work. And respect for knowledge that deserves more than a few seconds on
              a screen.
            </Reveal>
          </div>
          <Reveal variant="rise" delay={420} className="mt-10">
            <a href="#mission" className="inline-flex items-center gap-3 font-condensed uppercase tracking-[0.22em] text-sm text-clay-red border-b border-clay-red/50 hover:border-clay-red pb-1 transition-colors">
              Learn The Mission <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
