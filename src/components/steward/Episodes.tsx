import { Play, Youtube } from "lucide-react";

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
    <section id="episodes" className="paper-bg relative py-24 md:py-32 overflow-hidden">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-secondary" />
            <span className="label text-secondary">Chapter 04 — Listen in</span>
          </div>
          <h2 className="display text-5xl md:text-7xl text-primary-dark leading-[0.95]">
            Latest episodes from <span className="text-clay-red">The Steward.</span>
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-foreground/75 max-w-2xl">
            Start with a conversation that gets past the surface. These are stories about work, discipline, faith,
            pressure, family, animals, land, and the responsibility that comes with the life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Featured */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video bg-primary-dark overflow-hidden shadow-leather group">
              <div className="absolute inset-0 grain" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-5">
                <button
                  aria-label="Play featured episode"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{ background: "var(--gradient-brass)", boxShadow: "var(--shadow-brass)" }}
                >
                  <Play className="text-primary-dark ml-1.5" size={36} fill="currentColor" />
                </button>
                <span className="label text-cream/70">Replace with the latest YouTube embed</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <span className="label text-clay-red">Featured Episode</span>
                <h3 className="font-display text-3xl md:text-4xl text-primary-dark mt-2">
                  A Conversation Worth Sitting With
                </h3>
              </div>
              <a href="#" className="btn-brass shrink-0">
                <Youtube size={18} /> Watch on YouTube
              </a>
            </div>
          </div>

          {/* Recent list */}
          <aside className="lg:col-span-4">
            <span className="label text-muted-foreground">Recent</span>
            <ul className="mt-5 divide-y divide-foreground/10">
              {recent.map((e) => (
                <li key={e.n}>
                  <a href="#" className="block py-5 group">
                    <div className="flex items-baseline gap-4">
                      <span className="font-condensed text-secondary text-sm">EP {e.n}</span>
                      <span className="label text-muted-foreground ml-auto">{e.len}</span>
                    </div>
                    <h4 className="font-display text-2xl text-primary-dark mt-1.5 group-hover:text-clay-red transition-colors">
                      {e.title}
                    </h4>
                    <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{e.desc}</p>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-foreground/10">
              <span className="label text-muted-foreground">Find it on</span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    className="flex items-center justify-between border border-foreground/15 hover:border-clay-red hover:text-clay-red transition-colors px-4 py-3 font-condensed uppercase tracking-[0.18em] text-xs"
                  >
                    {p.name}
                    <span aria-hidden>→</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
