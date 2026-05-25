# Contact Form Email Delivery

Wire the contact form so submissions are stored, the show owner (`nshaun@thestewardpod.com`) receives a notification, and the submitter receives a branded confirmation email.

## Prerequisites (one-time setup)

1. **Enable Lovable Cloud** — required for database + serverless email sending.
2. **Set up a sender email domain** — needed so emails come from the show's brand. The user will be prompted to set up a domain (e.g. `notify.thestewardpod.com`).
3. **Provision email infrastructure** (queue, suppression list, unsubscribe handler, etc.).
4. **Scaffold transactional email** Edge Functions and templates.

## Database

- Table `contact_submissions` with: `id`, `created_at`, `name`, `email`, `topic`, `message`.
- RLS enabled. Public `INSERT` allowed (anonymous form submissions). No public `SELECT`.

## Email templates (React Email, branded to The Steward)

1. **`contact-form-confirmation`** — sent to the submitter.
   - Warm "Message received" note, signed from The Steward.
   - Echoes back their topic so they know which message landed.
2. **`contact-form-notification`** — sent to `nshaun@thestewardpod.com`.
   - Subject like "New contact: {topic} — {name}".
   - Body shows name, email, topic, full message.

Styling pulled from the site's palette (cream/clay-red accents, Lora/display fonts), white email background per email rules.

## Form wiring (`src/components/steward/Contact.tsx`)

- On submit:
  1. Generate a UUID, insert the submission into `contact_submissions`.
  2. Invoke `send-transactional-email` twice with stable idempotency keys:
     - submitter confirmation (`contact-confirm-{id}`)
     - owner notification (`contact-notify-{id}`)
  3. Show success state on success; show inline error message on failure (don't silently swallow).
- Disable the submit button while in-flight; basic email validation already handled by `type="email" required`.

## Unsubscribe page

Required by the email system. A simple branded `/unsubscribe` route that validates the token and confirms the opt-out, styled to match the site.

## Notes for the user

- The notification recipient is hard-coded to `nshaun@thestewardpod.com` in the Edge Function call.
- Emails will only start delivering after the sender domain's DNS verification completes; status is visible in Cloud → Emails.
