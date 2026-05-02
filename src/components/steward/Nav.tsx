import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#episodes", label: "Episodes" },
  { href: "#mission", label: "The Mission" },
  { href: "#guests", label: "Guests" },
  { href: "#host", label: "Host" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
        <div className="container flex items-center justify-between py-4 md:py-5">
          <a href="#top" className="block leading-none text-cream">
            <div className="font-display text-2xl md:text-[26px] tracking-wide">THE STEWARD PODCAST</div>
            <div className="label text-cream/60 mt-0.5 hidden sm:block">
              Stories from the land, livestock, and people who live it
            </div>
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
            className="lg:hidden text-cream p-2"
          >
            <Menu size={26} />
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
            <span className="font-display text-xl tracking-wide">THE STEWARD</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
              <X size={24} />
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
