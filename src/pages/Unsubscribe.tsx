import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Status = "validating" | "ready" | "submitting" | "done" | "already" | "invalid" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("validating");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Unsubscribe — The Steward Podcast";
    if (!token) {
      setStatus("invalid");
      return;
    }
    const run = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } }
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus("invalid");
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
          return;
        }
        if (data.valid === true) {
          setStatus("ready");
          return;
        }
        setStatus("invalid");
      } catch {
        setStatus("error");
      }
    };
    run();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setStatus("submitting");
    setError(null);
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    if (data?.success) {
      setStatus("done");
      return;
    }
    if (data?.reason === "already_unsubscribed") {
      setStatus("already");
      return;
    }
    setStatus("error");
    setError("Something went wrong. Please try again.");
  };

  return (
    <main className="min-h-screen paper-bg flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full bg-white shadow-card border border-border p-8 md:p-12">
        <span className="label text-clay-red">The Steward Podcast</span>
        <h1 className="display text-4xl md:text-5xl text-cream mt-4 leading-[1.05]">
          {status === "done" || status === "already" ? "You're unsubscribed." : "Unsubscribe"}
        </h1>
        <div className="w-12 h-px bg-clay-red my-6" />

        {status === "validating" && (
          <p className="font-body text-base text-cream/80">Checking your link…</p>
        )}

        {status === "ready" && (
          <>
            <p className="font-body text-base text-cream/80 leading-relaxed">
              Click below to confirm you no longer want to receive emails from The Steward Podcast.
            </p>
            <button onClick={confirm} className="btn-brass mt-8">
              Confirm Unsubscribe
            </button>
          </>
        )}

        {status === "submitting" && (
          <p className="font-body text-base text-cream/80">Processing…</p>
        )}

        {status === "done" && (
          <p className="font-body text-base text-cream/80 leading-relaxed">
            Your email has been removed. You won't hear from us again.
          </p>
        )}

        {status === "already" && (
          <p className="font-body text-base text-cream/80 leading-relaxed">
            This address has already been unsubscribed.
          </p>
        )}

        {status === "invalid" && (
          <p className="font-body text-base text-cream/80 leading-relaxed">
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {status === "error" && (
          <p className="font-body text-base text-cream/80 leading-relaxed">
            {error || "Something went wrong. Please try again."}
          </p>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
