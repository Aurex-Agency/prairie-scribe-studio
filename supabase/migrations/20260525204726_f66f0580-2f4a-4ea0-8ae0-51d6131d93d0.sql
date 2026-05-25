CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL,
  message TEXT NOT NULL
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit the contact form.
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public SELECT/UPDATE/DELETE. The site owner reads submissions via email.
