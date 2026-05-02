import rancher from "@/assets/guest-rancher.jpg";
import farmer from "@/assets/guest-farmer.jpg";
import horseman from "@/assets/guest-horseman.jpg";
import rodeo from "@/assets/guest-rodeo.jpg";
import stock from "@/assets/guest-stock.jpg";
import ag from "@/assets/guest-ag.jpg";

const guests = [
  { title: "Ranchers", copy: "Land, livestock, patience, pressure, and the daily choices nobody sees.", img: rancher, h: "h-[26rem]", offset: "lg:mt-0" },
  { title: "Farmers", copy: "The discipline of seasons, soil, equipment, uncertainty, and staying with it.", img: farmer, h: "h-[32rem]", offset: "lg:mt-16" },
  { title: "Horsemen", copy: "Feel, timing, trust, humility, and what horses teach better than people can.", img: horseman, h: "h-[28rem]", offset: "lg:mt-4" },
  { title: "Rodeo Athletes", copy: "Preparation, pain, travel, faith, and the cost behind eight seconds.", img: rodeo, h: "h-[34rem]", offset: "lg:mt-20" },
  { title: "Stock Contractors", copy: "Breeding, hauling, caring, judging, and respecting the animal side of the arena.", img: stock, h: "h-[28rem]", offset: "lg:mt-2" },
  { title: "Ag Professionals", copy: "The modern pressure, business decisions, and knowledge that keep rural life moving.", img: ag, h: "h-[32rem]", offset: "lg:mt-14" },
];

export const Guests = () => {
  return (
    <section id="guests" className="bg-light relative py-24 md:py-32 overflow-hidden">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-secondary" />
            <span className="label text-secondary">Chapter 02 — Who sits at the table</span>
          </div>
          <h2 className="display text-5xl md:text-7xl text-primary-dark leading-[0.95]">
            Conversations with people who have <span className="text-clay-red">dirt on their boots.</span>
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-foreground/75 max-w-2xl">
            Every episode brings in someone shaped by the western and agricultural way of life — not to perform
            expertise, but to pass down what experience taught them.
          </p>
        </div>
      </div>

      {/* Horizontal scroll on mobile, staggered grid on desktop */}
      <div className="lg:hidden overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
        <div className="flex gap-5 w-max">
          {guests.map((g) => (
            <GuestCard key={g.title} g={g} className="w-[78vw] max-w-[20rem] snap-start" />
          ))}
        </div>
      </div>

      <div className="hidden lg:block container">
        <div className="grid grid-cols-3 gap-8">
          {guests.map((g) => (
            <GuestCard key={g.title} g={g} className={g.offset} />
          ))}
        </div>
      </div>

      <div className="container mt-16 flex justify-center">
        <a href="#episodes" className="btn-brass">Start With an Episode</a>
      </div>
    </section>
  );
};

const GuestCard = ({ g, className = "" }: { g: typeof guests[number]; className?: string }) => (
  <article className={`group ${className}`}>
    <div className={`relative overflow-hidden ${g.h} shadow-card`}>
      <img
        src={g.img}
        alt={`${g.title} — documentary portrait for The Steward Podcast`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent" />
      <div className="absolute top-4 left-4">
        <span className="label text-accent bg-dark/40 backdrop-blur-sm px-2 py-1">Conversation</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-3xl md:text-4xl text-cream tracking-wide">{g.title}</h3>
        <div className="w-10 h-px bg-accent my-3" />
        <p className="font-body text-sm text-cream/85 leading-relaxed">{g.copy}</p>
      </div>
    </div>
  </article>
);
