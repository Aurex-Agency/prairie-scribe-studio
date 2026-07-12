import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { supabase } from "@/integrations/supabase/client";

type Video = { id: string; title: string; description?: string };

// Fallback content shown while the live feed loads, or if it can't be reached.
// Keeps the section populated no matter what.
const FALLBACK_FEATURED: Video = {
  id: "bz7ZNZIsDnA",
  title: "Latest from The Steward",
};
const FALLBACK_RECENT: Video[] = [
  { id: "kM0ES9TBHZw", title: "Life's Short — Do What You Love", description: "30 Years in Rodeo with Lane Fugitt." },
  { id: "Au-HbSJEPTM", title: "Pressure Makes Diamonds", description: "Cowboy Wisdom with Ryan Burl." },
];

const platforms = [
  { name: "YouTube", url: "https://youtube.com/@thestewardpodcast" },
  { name: "Spotify", url: "https://open.spotify.com/show/7p2tCM7qRNsOmjox4cNhVE" },
  { name: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/the-steward-podcast/id1883864172" },
  { name: "Instagram", url: "https://www.instagram.com/thestewardpodcast" },
  { name: "Facebook", url: "http://facebook.com/thestewardpodcast" },
  { name: "TikTok", url: "https://www.tiktok.com/@thestewardpodcast" },
];

export const Episodes = () => {
  const [featured, setFeatured] = useState<Video>(FALLBACK_FEATURED);
  const [recent, setRecent] = useState<Video[]>(FALLBACK_RECENT);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("youtube-latest");
        if (error || !active || !data?.featured?.id) return;
        setFeatured(data.featured);
        if (Array.isArray(data.recent) && data.recent.length) setRecent(data.recent.slice(0, 4));
      } catch {
        /* keep fallback */
      }
    })();
    return () => { active = false; };
  }, []);

  // Mark up the newest episode as a PodcastEpisode for search engines.
  useEffect(() => {
    if (!featured?.id || !featured.title) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "PodcastEpisode",
      name: featured.title,
      url: `https://www.youtube.com/watch?v=${featured.id}`,
      ...(featured.description ? { description: featured.description } : {}),
      partOfSeries: {
        "@type": "PodcastSeries",
        name: "The Steward Podcast",
        url: "https://thestewardpod.com/",
      },
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: `https://www.youtube.com/watch?v=${featured.id}`,
      },
    });
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [featured]);

  return (
    <section id="episodes" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <Reveal variant="rise" className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Watch &amp; listen</span>
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
          {/* Featured — always the newest episode */}
          <Reveal variant="left" className="lg:col-span-8">
            <div className="relative aspect-video bg-dark overflow-hidden shadow-leather ring-1 ring-cream/10">
              <iframe
                key={featured.id}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${featured.id}?rel=0`}
                title={featured.title || "The Steward Podcast — latest episode"}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <span className="label text-clay-red">Latest Episode</span>
                <h3 className="font-display text-3xl md:text-4xl text-cream mt-2 leading-tight max-w-xl">
                  {featured.title || "Latest from The Steward"}
                </h3>
              </div>
              <a
                href="https://www.youtube.com/@thestewardpodcast"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brass shrink-0"
              >
                <span aria-hidden>▶</span> Watch on YouTube
              </a>
            </div>
          </Reveal>

          {/* Recent list */}
          <Reveal as="aside" variant="right" delay={150} className="lg:col-span-4">
            <span className="label text-cream/50">More episodes</span>
            <ul className="mt-5 divide-y divide-cream/10">
              {recent.map((e, i) => (
                <Reveal as="li" key={e.id} variant="fade" delay={150 + i * 100}>
                  <a
                    href={`https://youtu.be/${e.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-5 group"
                  >
                    <h4 className="font-display text-2xl text-cream group-hover:text-clay-red transition-colors leading-tight">
                      {e.title}
                    </h4>
                    {e.description ? (
                      <p className="text-sm text-cream/65 mt-2 leading-relaxed line-clamp-2">{e.description}</p>
                    ) : null}
                  </a>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-cream/10">
              <span className="label text-cream/50">Find it on</span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {platforms.map((p, i) => (
                  <Reveal as="a" key={p.name} variant="fade" delay={i * 80}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
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
