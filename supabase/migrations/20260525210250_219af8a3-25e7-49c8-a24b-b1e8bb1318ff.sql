
-- Trigger function: on new contact_submissions row, call send-transactional-email
-- twice (confirmation + notification) using service-role JWT via pg_net.
-- This replaces the previous client-side invocation, which exposed the email
-- sender to anonymous abuse.

CREATE OR REPLACE FUNCTION public.contact_submissions_send_emails()
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
    RAISE WARNING 'email_queue_service_role_key not found in vault; skipping email send';
    RETURN NEW;
  END IF;

  v_headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || v_service_key
  );

  -- Confirmation email to submitter
  PERFORM net.http_post(
    url := v_url,
    headers := v_headers,
    body := jsonb_build_object(
      'templateName', 'contact-confirmation',
      'recipientEmail', NEW.email,
      'idempotencyKey', 'contact-confirm-' || NEW.id::text,
      'templateData', jsonb_build_object('name', NEW.name, 'topic', NEW.topic)
    )
  );

  -- Notification email to site owner
  PERFORM net.http_post(
    url := v_url,
    headers := v_headers,
    body := jsonb_build_object(
      'templateName', 'contact-notification',
      'recipientEmail', 'nshaun@thestewardpod.com',
      'idempotencyKey', 'contact-notify-' || NEW.id::text,
      'templateData', jsonb_build_object(
        'name', NEW.name,
        'email', NEW.email,
        'topic', NEW.topic,
        'message', NEW.message
      )
    )
  );

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.contact_submissions_send_emails() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS contact_submissions_send_emails_trg ON public.contact_submissions;
CREATE TRIGGER contact_submissions_send_emails_trg
AFTER INSERT ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.contact_submissions_send_emails();
