const cols = [
  { title: "Watch", links: ["YouTube", "Latest Episode", "Episode Archive"] },
  { title: "Listen", links: ["Spotify", "Apple Podcasts", "Podcast RSS"] },
  { title: "Connect", links: ["Instagram", "Guest Suggestions", "Sponsorship"] },
  { title: "Roots", links: ["North Mississippi", "Western Lifestyle", "Agricultural Stories"] },
];

export const Footer = () => {
  return (
    <footer className="leather-bg relative text-cream pt-20 pb-10">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-cream/10">
          <div className="lg:col-span-5">
            <div className="font-display text-4xl md:text-5xl tracking-wide">THE STEWARD PODCAST</div>
            <p className="mt-5 max-w-md text-cream/70 leading-relaxed">
              Preserving the stories, lessons, and responsibility behind the western and agricultural way of life.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="w-8 h-px bg-accent" />
              <span className="label text-accent">North Mississippi</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="label text-accent mb-4">{c.title}</h4>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="font-body text-cream/80 hover:text-accent transition-colors text-sm">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-body italic text-cream/60 text-sm max-w-xl">
            Built for the people who still believe some things are worth preserving.
          </p>
          <p className="label text-cream/40">© 2026 The Steward Podcast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
