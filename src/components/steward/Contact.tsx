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
    <section id="contact" className="paper-bg section-seam relative overflow-hidden text-cream">
      <div className="relative py-20 md:py-28 px-6 md:px-16 lg:px-20">
        <Reveal variant="right" delay={120} className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Chapter 07 — Pull up a chair</span>
          </div>
          <h2 className="display text-4xl sm:text-6xl md:text-7xl text-cream leading-[1]">
            Know somebody with a story{" "}
            <span className="text-clay-red italic font-body normal-case tracking-normal">worth preserving?</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/80">
            Suggest a guest, ask about sponsorship, or send a note to the show. If the story carries wisdom from
            the western or agricultural way of life, it belongs at the table.
          </p>

          {submitted ? (
            <div className="mt-10 border border-clay-red/40 p-8 bg-white shadow-card">
              <span className="label text-clay-red">Received</span>
              <p className="mt-4 font-display text-2xl md:text-3xl text-cream leading-snug">
                Message received. If the story belongs at the table, we will be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 bg-white shadow-card p-7 md:p-9 space-y-6 border border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-paper"
                    type="text"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-paper"
                    type="email"
                  />
                </Field>
              </div>
              <Field label="I am reaching out about">
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="input-paper"
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
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-paper resize-none"
                  placeholder="Tell us about the story, the person, or the idea..."
                />
              </Field>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <p className="font-body italic text-sm text-cream/60 order-2 sm:order-1">
                  Real stories only. No spam. No gimmicks.
                </p>
                <button type="submit" className="btn-brass w-full sm:w-auto order-1 sm:order-2">
                  Send It To The Steward
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>

      <style>{`
        .input-paper {
          width: 100%;
          background: hsl(30 30% 97%);
          border: 1px solid hsl(30 15% 82%);
          border-radius: 2px;
          color: hsl(4 11% 12%);
          padding: 0.85rem 1rem;
          font-family: 'Lora', serif;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background-color 0.25s;
        }
        .input-paper::placeholder { color: hsl(4 11% 45%); font-style: italic; }
        .input-paper:hover { border-color: hsl(30 15% 70%); }
        .input-paper:focus {
          border-color: hsl(var(--clay-red));
          background: hsl(0 0% 100%);
          box-shadow: 0 0 0 3px hsl(var(--clay-red) / 0.12);
        }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="label text-clay-red block mb-2 text-xs">{label}</span>
    {children}
  </label>
);
