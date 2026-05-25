import { useEffect, useState } from "react";
const logoLight = "/steward-logo-light-small.webp";
const logoDark = "/steward-logo-small.webp";

const links = [
  { href: "#episodes", label: "Episodes" },
  { href: "#mission", label: "The Mission" },
  { href: "#guests", label: "Guests" },
  { href: "#host", label: "Host" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setPastHero(window.scrollY > window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-primary-dark/95 backdrop-blur-sm shadow-leather" : "bg-transparent"
        }`}
        style={scrolled ? { backgroundImage: "var(--grain)" } : undefined}
      >
        <div className="container flex items-center justify-between py-3 md:py-4">
          <a href="#top" className="relative flex items-center leading-none text-cream group h-16 md:h-20">
            <img
              src={logoLight}
              alt="The Steward Podcast"
              className={`h-16 md:h-20 w-auto object-contain transition-opacity duration-500 ease-out group-hover:scale-[1.03] ${pastHero ? "opacity-0" : "opacity-100"}`}
              width={256}
              height={128}
              fetchPriority="high"
              decoding="async"
            />
            <img
              src={logoDark}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-16 md:h-20 w-auto object-contain transition-opacity duration-500 ease-out group-hover:scale-[1.03] ${pastHero ? "opacity-100" : "opacity-0"}`}
              width={256}
              height={128}
              loading="lazy"
              decoding="async"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-condensed uppercase tracking-[0.2em] text-sm text-cream/85 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="#episodes" className="btn-brass !px-5 !py-2.5 !text-xs">
              Watch Now
            </a>
          </nav>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden text-cream p-2 flex items-center"
          >
            <span className="block w-8 h-6 relative" aria-hidden="true">
              <span className="absolute left-0 top-0 h-0.5 w-8 bg-current" />
              <span className="absolute left-0 top-1/2 h-0.5 w-8 -translate-y-1/2 bg-current" />
              <span className="absolute left-0 bottom-0 h-0.5 w-8 bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-dark/70" onClick={() => setOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm leather-bg text-cream shadow-leather flex flex-col transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-6 border-b border-cream/10">
            <img src={logoLight} alt="The Steward Podcast" className="h-9 w-auto object-contain" width={256} height={128} loading="lazy" decoding="async" />
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
              <span className="block w-6 h-6 relative rotate-45" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-6 w-0.5 -translate-x-1/2 bg-current" />
              </span>
            </button>
          </div>
          <nav className="flex-1 flex flex-col gap-2 p-6">
            {[...links, { href: "#contact", label: "Contact" }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl tracking-wide py-3 border-b border-cream/10 text-cream hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#episodes" onClick={() => setOpen(false)} className="btn-brass m-6 mt-0">
            Watch the Latest Episode
          </a>
        </aside>
      </div>
    </>
  );
};
