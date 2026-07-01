DO $$
DECLARE
  v_service_key text;
  v_url text := 'https://jdkxkpshkmzxfuenydit.supabase.co/functions/v1/send-transactional-email';
  v_headers jsonb;
  r record;
BEGIN
  SELECT decrypted_secret INTO v_service_key
  FROM vault.decrypted_secrets
  WHERE name = 'email_queue_service_role_key' LIMIT 1;

  IF v_service_key IS NULL THEN
    RAISE EXCEPTION 'email_queue_service_role_key not found in vault';
  END IF;

  v_headers := jsonb_build_object(
    'Content-Type','application/json',
    'Authorization','Bearer ' || v_service_key
  );

  SELECT id, name, email, topic, message INTO r
  FROM public.contact_submissions
  WHERE id = '2dca4e05-c97f-4594-943e-607f75e069bd';

  PERFORM net.http_post(
    url := v_url,
    headers := v_headers,
    body := jsonb_build_object(
      'templateName','contact-notification',
      'recipientEmail','nshaun@thestewardpod.com',
      'idempotencyKey','contact-notify-' || r.id::text || '-retry1',
      'templateData', jsonb_build_object('name',r.name,'email',r.email,'topic',r.topic,'message',r.message)
    )
  );

  PERFORM net.http_post(
    url := v_url,
    headers := v_headers,
    body := jsonb_build_object(
      'templateName','contact-confirmation',
      'recipientEmail',r.email,
      'idempotencyKey','contact-confirm-' || r.id::text || '-retry1',
      'templateData', jsonb_build_object('name',r.name,'topic',r.topic)
    )
  );
END $$;