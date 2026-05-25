import { Reveal } from "./Reveal";

const guests = [
  { title: "Ranchers", copy: "Land, livestock, patience, pressure, and the daily choices nobody sees." },
  { title: "Farmers", copy: "The discipline of seasons, soil, equipment, uncertainty, and staying with it." },
  { title: "Horsemen", copy: "Feel, timing, trust, humility, and what horses teach better than people can." },
  { title: "Rodeo Athletes", copy: "Preparation, pain, travel, faith, and the cost behind eight seconds." },
  { title: "Stock Contractors", copy: "Breeding, hauling, caring, judging, and respecting the animal side of the arena." },
  { title: "Ag Professionals", copy: "The modern pressure, business decisions, and knowledge that keep rural life moving." },
];

export const Guests = () => {
  return (
    <section id="guests" className="paper-bg section-seam relative py-20 md:py-32 overflow-hidden text-cream">
      <div className="container relative">
        <div className="max-w-3xl mb-14">
          <Reveal variant="rise" className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Chapter 02 — Who sits at the table</span>
          </Reveal>
          <Reveal variant="rise" delay={120} as="h2" className="display text-5xl md:text-7xl text-cream leading-[0.95]">
            Conversations with people who <span className="text-clay-red">actually live it.</span>
          </Reveal>
          <Reveal variant="fade" delay={240} as="p" className="mt-7 text-lg leading-relaxed text-cream/75 max-w-2xl">
            Every episode brings in someone shaped by the western and agricultural way of life — not to perform
            expertise, but to pass down what experience taught them.
          </Reveal>
        </div>

        <Reveal variant="fade" delay={120}>
          <ul className="border-t border-border/60">
            {guests.map((g) => (
              <li
                key={g.title}
                className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline border-b border-border/60 py-7 md:py-9 px-2 md:px-4 transition-colors duration-300 hover:bg-[hsl(30_35%_94%)]"
              >
                <div className="md:col-span-5 transition-transform duration-300 group-hover:translate-x-1">
                  <h3
                    className="font-display uppercase tracking-wide text-3xl md:text-4xl leading-none inline-block border-b border-transparent pb-1 transition-colors duration-300 group-hover:border-clay-red"
                    style={{ color: "hsl(4 11% 12%)" }}
                  >
                    {g.title}
                  </h3>
                </div>
                <p
                  className="md:col-span-7 font-body text-base md:text-lg leading-relaxed"
                  style={{ color: "hsl(4 11% 30%)" }}
                >
                  {g.copy}
                </p>

              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 flex justify-center">
          <Reveal variant="rise" delay={120}>
            <a href="#episodes" className="btn-brass">Start With an Episode</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
