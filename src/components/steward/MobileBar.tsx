export const MobileBar = () => (
  <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-primary-dark/95 backdrop-blur border-t border-cream/10 grid grid-cols-2 shadow-leather">
    <a
      href="#episodes"
      className="py-4 text-center font-condensed uppercase tracking-[0.2em] text-xs font-semibold text-white"
      style={{ background: "var(--gradient-brass)" }}
    >
      Watch Latest
    </a>
    <a
      href="#community"
      className="py-4 text-center font-condensed uppercase tracking-[0.2em] text-xs text-cream border-l border-cream/10"
    >
      Join the Community
    </a>
  </div>
);
