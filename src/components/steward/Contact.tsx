import { useState } from "react";
import { Reveal } from "./Reveal";

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "Guest Suggestion", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-primary-dark section-seam relative overflow-hidden text-cream">
      <div className="leather-bg relative py-20 md:py-28 px-6 md:px-16 lg:px-20">
        <div className="absolute inset-0 grain" />
        <Reveal variant="right" delay={120} className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-accent" />
            <span className="label text-accent">Chapter 07 — Pull up a chair</span>
          </div>
            <h2 className="display text-4xl sm:text-6xl md:text-7xl text-cream leading-[1]">
              Know somebody with a story{" "}
              <span className="text-accent italic font-body normal-case tracking-normal">worth preserving?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80">
              Suggest a guest, ask about sponsorship, or send a note to the show. If the story carries wisdom from
              the western or agricultural way of life, it belongs at the table.
            </p>

            {submitted ? (
              <div className="mt-10 border border-accent/40 p-8 bg-dark/40">
                <span className="label text-accent">Received</span>
                <p className="mt-4 font-display text-2xl md:text-3xl text-cream leading-snug">
                  Message received. If the story belongs at the table, we will be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-leather"
                    type="text"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-leather"
                    type="email"
                  />
                </Field>
                <Field label="I am reaching out about">
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="input-leather"
                  >
                    <option>Guest Suggestion</option>
                    <option>Sponsorship</option>
                    <option>General Message</option>
                    <option>Media Inquiry</option>
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-leather resize-none"
                  />
                </Field>

                <button type="submit" className="btn-brass w-full sm:w-auto">
                  Send It To The Steward
                </button>
                <p className="font-body italic text-sm text-cream/60">
                  Real stories only. No spam. No gimmicks.
                </p>
              </form>
            )}
          </Reveal>
        </div>

      <style>{`
        .input-leather {
          width: 100%;
          background: hsl(var(--dark) / 0.5);
          border: none;
          border-bottom: 1px solid hsl(var(--accent) / 0.4);
          color: hsl(var(--cream));
          padding: 0.75rem 0.25rem;
          font-family: 'Lora', serif;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .input-leather:focus { border-color: hsl(var(--accent)); }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="label text-accent block mb-2">{label}</span>
    {children}
  </label>
);
