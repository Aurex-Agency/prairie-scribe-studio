import { Youtube, Instagram, Facebook, Music2 } from "lucide-react";

type SocialLink = { name: string; url: string };

const cols: { title: string; links: SocialLink[] }[] = [
  {
    title: "Watch",
    links: [
      { name: "YouTube", url: "https://youtube.com/@thestewardpodcast" },
      { name: "TikTok", url: "https://www.tiktok.com/@thestewardpodcast" },
    ],
  },
  {
    title: "Listen",
    links: [
      { name: "Spotify", url: "https://open.spotify.com/show/7p2tCM7qRNsOmjox4cNhVE" },
      { name: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/the-steward-podcast/id1883864172" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/thestewardpodcast" },
      { name: "Facebook", url: "http://facebook.com/thestewardpodcast" },
    ],
  },
];

const socialIcons = [
  { name: "YouTube", url: "https://youtube.com/@thestewardpodcast", Icon: Youtube },
  { name: "Instagram", url: "https://www.instagram.com/thestewardpodcast", Icon: Instagram },
  { name: "Facebook", url: "http://facebook.com/thestewardpodcast", Icon: Facebook },
  { name: "TikTok", url: "https://www.tiktok.com/@thestewardpodcast", Icon: Music2 },
  { name: "Spotify", url: "https://open.spotify.com/show/7p2tCM7qRNsOmjox4cNhVE", Icon: Music2 },
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
              <span className="label text-accent">Stories worth preserving</span>
            </div>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              {socialIcons.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 flex items-center justify-center border border-cream/20 text-cream/80 hover:text-clay-red hover:border-clay-red transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="label text-accent mb-4">{c.title}</h4>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l.name}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-cream/80 hover:text-accent transition-colors text-sm"
                      >
                        {l.name}
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
