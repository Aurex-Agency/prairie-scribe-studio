# Resend Jeremy Clark's contact emails

## What happened

Jeremy Clark submitted the contact form on **2026-06-29 15:06 UTC**. The DB trigger fired and enqueued both emails correctly, but the queue processor got a **403 `domain_not_verified`** from the email API when it tried to send them. Both landed in the DLQ:

- `contact-notification` → `nshaun@thestewardpod.com` — **DLQ**
- `contact-confirmation` → `jeremy@ecpal.biz` — **DLQ**

That's why the owner notification never arrived.

At the time of that submission, `notify.team.thestewardpod.com` was not yet verified with the email provider (verification likely finished after the submit). Earlier May submissions sent successfully, and re-checking now shows the domain is **✅ Verified**, so new submissions will deliver. The two June 29 messages just need to be re-sent — DLQ messages are not automatically retried.

## Fix

Re-invoke `send-transactional-email` once for each of the two failed messages, using Jeremy's submission data pulled from `contact_submissions`. New idempotency keys (suffixed `-retry1`) so the sender doesn't short-circuit on the previous DLQ message_ids.

1. **Owner notification** → `nshaun@thestewardpod.com`
   - template: `contact-notification`
   - templateData: name/email/topic/message from Jeremy's row
   - idempotencyKey: `contact-notify-2dca4e05-…-retry1`

2. **Submitter confirmation** → `jeremy@ecpal.biz`
   - template: `contact-confirmation`
   - templateData: name + topic
   - idempotencyKey: `contact-confirm-2dca4e05-…-retry1`

Both calls go through the same authenticated path the DB trigger uses (service-role JWT from `vault.email_queue_service_role_key`), so no code changes are required. I'll invoke them from a one-off SQL block via `net.http_post`, then verify `email_send_log` shows `sent` for both.

## No code changes needed

- Domain is verified now, so future submissions will work with the existing trigger + edge function.
- Nothing to change in `Contact.tsx`, the DB trigger, or `send-transactional-email`.

## Verification

After re-sending:
- Query `email_send_log` for the two new `message_id`s and confirm `status = 'sent'`.
- Confirm with you that `nshaun@thestewardpod.com` received Jeremy's notification.

## Optional follow-up (ask before doing)

If you want protection against this class of failure (domain temporarily unverified, provider 5xx after retries, etc.), I can add a lightweight DLQ monitor — either a scheduled function that auto-retries DLQ items when the domain is verified, or a simple admin view that lists failed sends so you can retry with one click. Not doing this unless you ask.
