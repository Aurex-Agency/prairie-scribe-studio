import { Reveal } from "./Reveal";

const steps = [
  { kicker: "01 / Before daylight", title: "Before daylight",
    body: "The day starts before the world sees it. Feed, check, haul, fix, plan, and keep moving." },
  { kicker: "02 / Under pressure", title: "When things go wrong",
    body: "Weather changes. Animals test you. Equipment breaks. The lifestyle is built in response to pressure." },
  { kicker: "03 / Inheritance", title: "What gets passed down",
    body: "Knowledge lives in stories, habits, corrections, and quiet observations from people who have done it longer." },
  { kicker: "04 / Posture", title: "The mindset",
    body: "Respect first. Learn before speaking. Work before claiming. Stewardship before performance." },
  { kicker: "05 / Off camera", title: "After the camera is off",
    body: "The real life continues when the clip ends, when the gate shuts, and when nobody is applauding." },
];

export const Timeline = () => {
  return (
    <section className="leather-bg section-seam relative py-24 md:py-36 text-cream overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="container relative">
        <div className="max-w-3xl mb-20 md:mb-28">
          <Reveal variant="rise" className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-accent" />
            <span className="label text-accent">Chapter 03 — A signature feature</span>
          </Reveal>
          <Reveal variant="rise" delay={120} as="h2" className="display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95]">
            The work behind <br />the way of life.
          </Reveal>
        </div>

        <ol className="relative max-w-5xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-accent/30" aria-hidden />
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-16 md:mb-24 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <Reveal variant={i % 2 === 0 ? "left" : "right"} className="pl-12 md:pl-0 md:pr-12 md:text-right">
                <span className="label text-accent">{s.kicker}</span>
                <h3 className="display text-4xl md:text-6xl text-cream mt-3">{s.title}</h3>
              </Reveal>
              <Reveal variant={i % 2 === 0 ? "right" : "left"} delay={120} className="pl-12 md:pl-12 relative">
                <span className="absolute left-2 md:left-[-9px] top-2 w-4 h-4 rounded-full bg-accent ring-4 ring-primary-dark" />
                <p className="text-lg leading-relaxed text-cream/80 max-w-md">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal variant="rise" className="mt-16 md:mt-24 max-w-4xl mx-auto text-center px-4">
          <div className="accent-rule mb-10" />
          <blockquote className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.05] text-cream">
            "What is preserved with intention becomes the{" "}
            <span className="text-accent italic font-body normal-case tracking-normal">inheritance of the next generation.</span>"
          </blockquote>
          <div className="accent-rule mt-10" />
        </Reveal>
      </div>
    </section>
  );
};
