import rancher from "@/assets/guest-rancher.webp";
import rancherSmall from "@/assets/guest-rancher-sm.webp";
import farmer from "@/assets/guest-farmer.webp";
import farmerSmall from "@/assets/guest-farmer-sm.webp";
import horseman from "@/assets/guest-horseman.webp";
import horsemanSmall from "@/assets/guest-horseman-sm.webp";
import rodeo from "@/assets/guest-rodeo.webp";
import rodeoSmall from "@/assets/guest-rodeo-sm.webp";
import stock from "@/assets/guest-stock.webp";
import stockSmall from "@/assets/guest-stock-sm.webp";
import ag from "@/assets/guest-ag.webp";
import agSmall from "@/assets/guest-ag-sm.webp";
import { Reveal } from "./Reveal";

const guests = [
  { title: "Ranchers", copy: "Land, livestock, patience, pressure, and the daily choices nobody sees.", img: rancher, imgSmall: rancherSmall },
  { title: "Farmers", copy: "The discipline of seasons, soil, equipment, uncertainty, and staying with it.", img: farmer, imgSmall: farmerSmall },
  { title: "Horsemen", copy: "Feel, timing, trust, humility, and what horses teach better than people can.", img: horseman, imgSmall: horsemanSmall },
  { title: "Rodeo Athletes", copy: "Preparation, pain, travel, faith, and the cost behind eight seconds.", img: rodeo, imgSmall: rodeoSmall },
  { title: "Stock Contractors", copy: "Breeding, hauling, caring, judging, and respecting the animal side of the arena.", img: stock, imgSmall: stockSmall },
  { title: "Ag Professionals", copy: "The modern pressure, business decisions, and knowledge that keep rural life moving.", img: ag, imgSmall: agSmall },
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
      </div>

      <Reveal variant="fade" className="marquee-mask overflow-hidden py-2">
        <div className="marquee-track flex gap-7 w-max px-2">
          {guests.map((g) => (
            <GuestCard key={`a-${g.title}`} g={g} />
          ))}
          {guests.map((g) => (
            <GuestCard key={`b-${g.title}`} g={g} ariaHidden />
          ))}
        </div>
      </Reveal>

      <div className="container mt-16 flex justify-center">
        <Reveal variant="rise" delay={120}>
          <a href="#episodes" className="btn-brass">Start With an Episode</a>
        </Reveal>
      </div>
    </section>
  );
};

const GuestCard = ({ g, ariaHidden = false }: { g: typeof guests[number]; ariaHidden?: boolean }) => (
  <article
    aria-hidden={ariaHidden || undefined}
    className="group shrink-0 w-[19rem] sm:w-[21rem]"
  >
    <div className="relative overflow-hidden bg-white shadow-leather ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet={g.imgSmall} />
          <img
            src={g.img}
            alt={ariaHidden ? "" : `${g.title} — documentary portrait for The Steward Podcast`}
            loading="lazy"
            width={420}
            height={578}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4">
          <span
            className="font-condensed font-semibold uppercase tracking-[0.22em] text-[0.65rem] px-2.5 py-1 bg-white/90 backdrop-blur-sm"
            style={{ color: "hsl(var(--clay-red))" }}
          >
            Conversation
          </span>
        </div>
      </div>
      <div className="p-6 bg-white">
        <h3 className="font-display text-2xl md:text-3xl tracking-wide" style={{ color: "hsl(4 11% 12%)" }}>
          {g.title}
        </h3>
        <div className="w-10 h-px bg-clay-red my-3" />
        <p className="font-body text-sm leading-relaxed" style={{ color: "hsl(4 11% 30%)" }}>
          {g.copy}
        </p>
      </div>
    </div>
  </article>
);
