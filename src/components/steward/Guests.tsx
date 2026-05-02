import rancher from "@/assets/guest-rancher.jpg";
import farmer from "@/assets/guest-farmer.jpg";
import horseman from "@/assets/guest-horseman.jpg";
import rodeo from "@/assets/guest-rodeo.jpg";
import stock from "@/assets/guest-stock.jpg";
import ag from "@/assets/guest-ag.jpg";

const guests = [
  { title: "Ranchers", copy: "Land, livestock, patience, pressure, and the daily choices nobody sees.", img: rancher },
  { title: "Farmers", copy: "The discipline of seasons, soil, equipment, uncertainty, and staying with it.", img: farmer },
  { title: "Horsemen", copy: "Feel, timing, trust, humility, and what horses teach better than people can.", img: horseman },
  { title: "Rodeo Athletes", copy: "Preparation, pain, travel, faith, and the cost behind eight seconds.", img: rodeo },
  { title: "Stock Contractors", copy: "Breeding, hauling, caring, judging, and respecting the animal side of the arena.", img: stock },
  { title: "Ag Professionals", copy: "The modern pressure, business decisions, and knowledge that keep rural life moving.", img: ag },
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

      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex gap-6 w-max">
          {guests.map((g) => (
            <GuestCard key={`a-${g.title}`} g={g} />
          ))}
          {guests.map((g) => (
            <GuestCard key={`b-${g.title}`} g={g} ariaHidden />
          ))}
        </div>
      </div>

      <div className="container mt-16 flex justify-center">
        <a href="#episodes" className="btn-brass">Start With an Episode</a>
      </div>
    </section>
  );
};

const GuestCard = ({ g, ariaHidden = false }: { g: typeof guests[number]; ariaHidden?: boolean }) => (
  <article
    aria-hidden={ariaHidden || undefined}
    className="group shrink-0 w-[20rem] sm:w-[22rem] h-[28rem]"
  >
    <div className="relative overflow-hidden h-full shadow-card">
      <img
        src={g.img}
        alt={ariaHidden ? "" : `${g.title} — documentary portrait for The Steward Podcast`}
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
