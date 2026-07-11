import { useState } from "react";
import { Reveal } from "./Reveal";
import { supabase } from "@/integrations/supabase/client";

const platforms = [
  { name: "YouTube", url: "https://youtube.com/@thestewardpodcast", handle: "Watch" },
  { name: "Spotify", url: "https://open.spotify.com/show/7p2tCM7qRNsOmjox4cNhVE", handle: "Listen" },
  { name: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/the-steward-podcast/id1883864172", handle: "Listen" },
  { name: "Instagram", url: "https://www.instagram.com/thestewardpodcast", handle: "Follow" },
  { name: "TikTok", url: "https://www.tiktok.com/@thestewardpodcast", handle: "Follow" },
  { name: "Facebook", url: "http://facebook.com/thestewardpodcast", handle: "Follow" },
];

const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export const Community = () => {
  // Newsletter
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [subError, setSubError] = useState<string | null>(null);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subState === "sending") return;
    if (!emailOk(email)) {
      setSubState("error");
      setSubError("Enter a valid email address.");
      return;
    }
    setSubState("sending");
    setSubError(null);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .upsert({ email: email.trim(), source: "website" }, { onConflict: "email", ignoreDuplicates: true });
      if (error) throw error;
      setSubState("done");
    } catch (err) {
      setSubState("error");
      setSubError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  // Guest suggestion
  const [form, setForm] = useState({ name: "", email: "", topic: "Guest Suggestion", message: "" });
  const [guestState, setGuestState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [guestError, setGuestError] = useState<string | null>(null);

  const suggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guestState === "sending") return;
    setGuestState("sending");
    setGuestError(null);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase
        .from("contact_submissions")
        .insert({ id, name: form.name, email: form.email, topic: form.topic, message: form.message });
      if (error) throw error;
      setGuestState("done");
    } catch (err) {
      setGuestState("error");
      setGuestError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="community" className="paper-bg section-seam relative py-20 md:py-32 text-cream overflow-hidden">
      <div className="container relative">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <Reveal variant="rise" className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-clay-red" />
            <span className="label text-clay-red">Join the community</span>
          </Reveal>
          <Reveal variant="rise" delay={120} as="h2" className="display text-5xl md:text-7xl text-cream leading-[0.95]">
            Don't just watch. <span className="text-clay-red italic font-body normal-case tracking-normal">Ride with us.</span>
          </Reveal>
          <Reveal variant="fade" delay={240} as="p" className="mt-6 text-lg leading-relaxed text-cream/75 max-w-2xl">
            New conversations drop regularly. Get them first, and join the folks keeping the western and
            agricultural way of life alive.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Email capture — primary */}
          <Reveal variant="left" className="lg:col-span-7">
            <div className="bg-white shadow-card border border-border p-8 md:p-10">
              <span className="label text-clay-red text-xs">Get new episodes in your inbox</span>
              {subState === "done" ? (
                <p className="mt-6 font-display text-3xl md:text-4xl text-cream leading-snug">
                  You're in. Welcome to the table — check your inbox.
                </p>
              ) : (
                <form onSubmit={subscribe} className="mt-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (subState === "error") setSubState("idle"); }}
                      placeholder="you@email.com"
                      aria-label="Email address"
                      className="input-paper flex-1"
                    />
                    <button
                      type="submit"
                      disabled={subState === "sending"}
                      className="btn-brass shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {subState === "sending" ? "Joining…" : "Join the Community"}
                    </button>
                  </div>
                  {subError && <p className="mt-3 font-body text-sm text-clay-red">{subError}</p>}
                  <p className="mt-4 font-body italic text-sm text-cream/55">
                    No spam. No noise. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>

            {/* Follow the show */}
            <div className="mt-10">
              <span className="label text-cream/50 text-xs">Follow the show</span>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {platforms.map((p, i) => (
                  <Reveal
                    as="a" key={p.name} variant="fade" delay={i * 60}
                    href={p.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-border hover:border-clay-red bg-white/60 px-4 py-3.5 transition-colors"
                  >
                    <span className="font-condensed uppercase tracking-[0.16em] text-xs text-cream/90 group-hover:text-clay-red transition-colors">
                      {p.name}
                    </span>
                    <span className="font-condensed uppercase tracking-[0.16em] text-[0.65rem] text-cream/40 group-hover:text-clay-red/70 transition-colors">
                      {p.handle} →
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Guest suggestion — secondary */}
          <Reveal variant="right" delay={150} className="lg:col-span-5" id="contact">
            <div className="bg-white shadow-card border border-border p-8 md:p-10">
              <span className="label text-clay-red text-xs">Know a story worth preserving?</span>
              <h3 className="font-display text-2xl md:text-3xl text-cream mt-3 leading-snug">
                Suggest a guest or send a note.
              </h3>
              {guestState === "done" ? (
                <p className="mt-6 font-body text-lg text-cream/80 leading-relaxed">
                  Message received. If the story belongs at the table, we'll be in touch.
                </p>
              ) : (
                <form onSubmit={suggest} className="mt-5 space-y-4">
                  <input
                    required type="text" placeholder="Your name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-paper w-full" aria-label="Your name"
                  />
                  <input
                    required type="email" placeholder="Your email"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-paper w-full" aria-label="Your email"
                  />
                  <select
                    value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="input-paper w-full" aria-label="Topic"
                  >
                    <option>Guest Suggestion</option>
                    <option>Sponsorship</option>
                    <option>General Message</option>
                    <option>Media Inquiry</option>
                  </select>
                  <textarea
                    required rows={3} placeholder="Tell us about the story or the person…"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-paper w-full resize-none" aria-label="Message"
                  />
                  {guestError && <p className="font-body text-sm text-clay-red">{guestError}</p>}
                  <button
                    type="submit" disabled={guestState === "sending"}
                    className="btn-brass w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {guestState === "sending" ? "Sending…" : "Send It To The Steward"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
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
