import { Play, Youtube } from "lucide-react";
import { Reveal } from "./Reveal";

const recent = [
  { n: "01", title: "The Why Behind The Work", desc: "A conversation about responsibility, discipline, and learning the hard way.", len: "58 min" },
  { n: "02", title: "Lessons From Land And Livestock", desc: "What animals, seasons, and long days can teach a person.", len: "1h 12 min" },
  { n: "03", title: "The Cost Behind The Lifestyle", desc: "A deeper look at sacrifice, identity, and doing work that does not always get seen.", len: "47 min" },
];

const platforms = [
  { name: "YouTube", url: "#" },
  { name: "Spotify", url: "#" },
  { name: "Apple Podcasts", url: "#" },
  { name: "Instagram", url: "#" },
];

export const Episodes = () => {
  return (
    <section id="episodes" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <Reveal variant="rise" className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Chapter 04 — Listen in</span>
          </Reveal>
          <Reveal variant="rise" delay={120} as="h2" className="display text-5xl md:text-7xl text-cream leading-[0.95]">
            Latest episodes from <span className="text-clay-red">The Steward.</span>
          </Reveal>
          <Reveal variant="fade" delay={240} as="p" className="mt-7 text-lg leading-relaxed text-cream/75 max-w-2xl">
            Start with a conversation that gets past the surface. These are stories about work, discipline, faith,
            pressure, family, animals, land, and the responsibility that comes with the life.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Featured */}
          <Reveal variant="left" className="lg:col-span-8">
            <div className="relative aspect-video bg-dark overflow-hidden shadow-leather group ring-1 ring-cream/10">
              <div className="absolute inset-0 grain" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-5">
                <button
                  aria-label="Play featured episode"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{ background: "var(--gradient-brass)", boxShadow: "var(--shadow-brass)" }}
                >
                  <Play className="text-cream ml-1.5" size={36} fill="currentColor" />
                </button>
                <span className="label text-cream/70">Replace with the latest YouTube embed</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <span className="label text-clay-red">Featured Episode</span>
                <h3 className="font-display text-3xl md:text-4xl text-cream mt-2">
                  A Conversation Worth Sitting With
                </h3>
              </div>
              <a href="#" className="btn-brass shrink-0">
                <Youtube size={18} /> Watch on YouTube
              </a>
            </div>
          </Reveal>

          {/* Recent list */}
          <Reveal as="aside" variant="right" delay={150} className="lg:col-span-4">
            <span className="label text-cream/50">Recent</span>
            <ul className="mt-5 divide-y divide-cream/10">
              {recent.map((e, i) => (
                <Reveal as="li" key={e.n} variant="fade" delay={150 + i * 100}>
                  <a href="#" className="block py-5 group">
                    <div className="flex items-baseline gap-4">
                      <span className="font-condensed text-clay-red text-sm">EP {e.n}</span>
                      <span className="label text-cream/50 ml-auto">{e.len}</span>
                    </div>
                    <h4 className="font-display text-2xl text-cream mt-1.5 group-hover:text-clay-red transition-colors">
                      {e.title}
                    </h4>
                    <p className="text-sm text-cream/65 mt-2 leading-relaxed">{e.desc}</p>
                  </a>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-cream/10">
              <span className="label text-cream/50">Find it on</span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {platforms.map((p, i) => (
                  <Reveal as="a" key={p.name} variant="fade" delay={i * 80}
                    {...({ href: p.url } as object)}
                    className="flex items-center justify-between border border-cream/15 text-cream/85 hover:border-clay-red hover:text-clay-red transition-colors px-4 py-3 font-condensed uppercase tracking-[0.18em] text-xs"
                  >
                    {p.name}
                    <span aria-hidden>→</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
