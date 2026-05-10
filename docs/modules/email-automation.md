---
title: Email Automation
description: Multi-step email sequences (drip campaigns) and full delivery logs for every transactional send.
prev:
  text: Trip Consent
  link: /modules/trip-consent
next:
  text: Dynamic Form Field
  link: /modules/dynamic-form-field
---

# Email Automation <span class="pro-pill">PRO</span>

![Email Automation admin — sequences with steps, triggers, and delivery logs](/screenshots/modules/email-automation.webp)

Multi-step **email sequences** (drip campaigns) on top of Yatra's transactional emails, plus a full **delivery log** of every send for audit and retry.

## What problem it solves

The free plugin sends one email per booking event. Real lifecycle emails — pre-trip prep series, post-trip review-request follow-up, abandoned-cart sequences — need multi-step automation. Email Automation also gives you visibility into deliverability that the WordPress `wp_mail()` log doesn't.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Email Automation</span>.
2. The **Yatra → Email** hub gains two new tabs: **Sequences** and **Email logs**.

## Build a sequence

1. Open <span class="screen-path">Yatra → Email → Sequences → + New Sequence</span>.
2. Pick a **trigger**:
   - Booking confirmed
   - Trip starts in N days
   - Trip ended N days ago
   - Booking abandoned (when used with [Abandoned Booking Recovery](/modules/abandoned-booking-recovery))
   - Custom (fired by your own `do_action('yatra_email_sequence_trigger')` call)
3. Add **steps** — each is one email. Per step you set:
   - Delay relative to the trigger (`+0h`, `+1d`, `+3d`, `+7d`, etc.).
   - Subject + body — same WYSIWYG + merge-tag support as transactional templates.
   - Optional **stop condition** (e.g. "stop if booking is cancelled").
4. **Activate** the sequence.

## Email logs

Open <span class="screen-path">Yatra → Email → Email logs</span>. Every send is logged with:

- Recipient, subject, template / sequence + step name.
- Status (Sent / Failed / Bounced).
- Timestamp + duration.
- Click **View** for the full HTML body that was sent.
- Click **Resend** on failed deliveries.

## Hooks

| Hook                                                  | Type    | Purpose                                                  |
| ---                                                   | ---     | ---                                                      |
| `yatra_pro_email_automation_owns_transactional_type`  | filter  | Let Email Automation take over a specific transactional template type from the free plugin. |
| `yatra_email_sequence_step_should_send`               | filter  | Per-step gate; return `false` to skip this step for this booking. |
| `yatra_email_sequence_step_sent`                      | action  | Fires after each step is sent; receives `($sequence_id, $step_id, $recipient, $booking_id)`. |
