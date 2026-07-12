-- Newsletter subscribers
-- Captures email sign-ups from the website "Join the community" block and sends
-- a welcome email via the existing transactional email pipeline. Mirrors the
-- contact_submissions pattern: anon INSERT with validation + AFTER INSERT trigger
-- that calls the send-transactional-email edge function with the vault service key.

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'website',
  UNIQUE(email)
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can subscribe, with basic validation.
-- No public SELECT/UPDATE/DELETE — the owner reads the list server-side.
DROP POLICY IF EXISTS "Anyone can subscribe to the newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to the newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(email) BETWEEN 3 AND 320
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(source) BETWEEN 1 AND 100
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created
  ON public.newsletter_subscribers(created_at DESC);

-- Trigger: on new subscriber, send a welcome email via send-transactional-email
-- using the service-role JWT stored in vault (same mechanism as contact_submissions).
CREATE OR REPLACE FUNCTION public.newsletter_subscribers_send_welcome()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, vault
AS $$
DECLARE
  v_service_key text;
  v_url text := 'https://jdkxkpshkmzxfuenydit.supabase.co/functions/v1/send-transactional-email';
  v_headers jsonb;
BEGIN
  SELECT decrypted_secret INTO v_service_key
  FROM vault.decrypted_secrets
  WHERE name = 'email_queue_service_role_key'
  LIMIT 1;

  IF v_service_key IS NULL THEN
    RAISE WARNING 'email_queue_service_role_key not found in vault; skipping welcome email';
    RETURN NEW;
  END IF;

  v_headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || v_service_key
  );

  -- Welcome email to the new subscriber
  PERFORM net.http_post(
    url := v_url,
    headers := v_headers,
    body := jsonb_build_object(
      'templateName', 'newsletter-welcome',
      'recipientEmail', NEW.email,
      'idempotencyKey', 'newsletter-welcome-' || NEW.id::text,
      'templateData', jsonb_build_object('email', NEW.email)
    )
  );

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.newsletter_subscribers_send_welcome() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS newsletter_subscribers_send_welcome_trg ON public.newsletter_subscribers;
CREATE TRIGGER newsletter_subscribers_send_welcome_trg
AFTER INSERT ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION public.newsletter_subscribers_send_welcome();
