---
title: Email Automation
description: Step-by-step setup for the Yatra Pro Email Automation module — multi-step sequences, audience filters, and per-send delivery logs that pair with the always-free transactional templates.
prev:
  text: Trip Consent
  link: /modules/trip-consent
next:
  text: Dynamic Form Field
  link: /modules/dynamic-form-field
---

# Email Automation <span class="pro-pill">PRO</span>

![Yatra → Email — Sequences and Email Logs tabs unlocked by this module](/screenshots/email/email-sequences.webp)

Yatra's free plugin already sends all 17 baseline transactional emails (see [Email & notifications](/email-settings)). The **Email Automation** module adds two power-user tools on top:

1. **Sequences** — multi-step drip campaigns triggered by booking events (welcome series, pre-trip tips, post-trip review request).
2. **Email logs** — a per-send delivery log so you can prove "we sent it" when a customer says "I didn't get it."

## What you'll need

| Thing                          | Where to get it                                                              |
| ---                            | ---                                                                          |
| Yatra Pro license              | <span class="screen-path">Yatra → License</span>                            |
| Email Automation module enabled | <span class="screen-path">Yatra → Modules → Email Automation</span>         |
| Working transactional email    | See [Email → Delivery](/email-settings#delivery-settings) — connect a real ESP through WP Mail SMTP / FluentSMTP / Post SMTP before enabling sequences. |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Email Automation** → toggle on.
3. Two new tabs appear in the Email hub: **Sequences** and **Email logs**.

## Step 2 — Create your first sequence

Open <span class="screen-path">Yatra → Email → Sequences → + Add Sequence</span>.

![Sequence editor — trigger, audience filters, steps with per-step delay and template](/screenshots/modules/email-sequence-form.webp)

### Sequence basics

| Field                   | Notes                                                                                       |
| ---                     | ---                                                                                         |
| **Name**                | Internal label.                                                                              |
| **Trigger event**       | One of: `booking.created`, `booking.confirmed`, `booking.cancelled`, `booking.completed`, `payment.received`, `payment.reminder`, `enquiry.created`. |
| **Status**              | Active / Paused. *Paused* halts new entries; existing in-flight steps still complete.       |

### Audience filters (optional)

Limit the sequence so it only runs for customers matching:

- **Destinations** — multi-select
- **Trip categories** — multi-select
- **Customer country** — multi-select
- **Trip type** — Single day / Multi day / Flexible

Leave them all empty to apply to every customer matching the trigger event.

### Steps

A sequence is a list of one or more **steps**, run in order. Click **+ Add Step** for each:

| Step field          | Notes                                                                              |
| ---                 | ---                                                                                |
| **Delay**           | When to send relative to the trigger. Options: *Immediately* / *N minutes* / *N hours* / *N days* / *Until X days before travel_date* / *X days after travel_date*. |
| **Template**        | Pick any template from the [Email Templates list](/email-settings#templates) — including the legacy / system templates and any custom templates you've created. |
| **Skip if customer has** | Optional. E.g. *Skip if customer has already received this template in the last 7 days* — prevents over-mailing. |

Example sequence — **Pre-trip welcome series**:

```
Trigger: booking.confirmed
Audience: Destination = Bali

Step 1 — Immediately → Welcome to your Bali adventure (template: custom_welcome)
Step 2 — 7 days before travel_date → Packing & weather tips (template: custom_packing_tips)
Step 3 — 1 day before travel_date → Final reminder + arrival info (template: custom_final_reminder)
Step 4 — 1 day after travel_date → Hope you loved it — leave a review (template: review_request)
```

Save → set status to **Active**.

## Step 3 — Send a test entry

On the sequence's detail page, click **Send test** → enter a customer email → Yatra runs the sequence against a synthetic test booking with realistic merge-tag data so you can verify the entire flow without making a real booking.

## Step 4 — Verify in Email Logs

Open <span class="screen-path">Yatra → Email → Email logs</span> after running a test or live booking.

| Column            | Notes                                                                  |
| ---               | ---                                                                    |
| **Timestamp**     | When the send was attempted.                                           |
| **Recipient**     | Email address the message went to.                                     |
| **Template**      | The template key used.                                                |
| **Sequence**      | If from a sequence, links back to it.                                  |
| **Status**        | `sent` / `failed` / `bounced` / `opened` (when ESP webhooks are wired). |
| **ESP response**  | Raw response code from your transport plugin.                          |
| **Open / Click**  | When your ESP posts opens/clicks back via webhook.                    |

Click a row for the **full payload** — rendered HTML, headers, merge-tag values, ESP response body.

## Sequence statistics

Each sequence carries running stats:

- **Entered** — total customers who matched the trigger + filters.
- **In progress** — currently between steps.
- **Completed** — finished all steps.
- **Opens / Clicks** — when your ESP delivers those events.
- **Unsubscribes** — customers who clicked the unsubscribe link.

## Common patterns

| Goal                                                  | Trigger              | Steps                                                              |
| ---                                                   | ---                  | ---                                                                |
| Welcome new bookings                                  | `booking.confirmed`  | 1 step immediately                                                 |
| Pre-trip tips for adventure travelers                 | `booking.confirmed` + audience = Adventure category | 7d / 3d / 1d before travel                       |
| Pre-payment reminder for unpaid bookings              | `payment.reminder`   | 1 step immediately                                                 |
| Post-trip review nurture                              | `booking.completed`  | 1d after, 14d after (if no review yet)                            |
| Enquiry-to-booking nurture                            | `enquiry.created`    | Immediately + 2d + 5d                                              |

## Troubleshooting

**Sequence entered but no email sent** — open the Email logs tab and filter by recipient. A `failed` row with an ESP error tells you exactly what went wrong (usually authentication / DNS / spam-filter related).

**Sequence runs but emails arrive in spam** — set up SPF, DKIM, and DMARC on the *From* domain. WordPress's built-in `wp_mail()` doesn't authenticate properly with most receivers.

**Wrong template used** — sequences and the underlying transactional emails read from the same template list. If you edited the wrong template, your sequence will use the edited version.

**Customer unsubscribed from one sequence but still receiving another** — unsubscribes are per-customer-per-list, not per-sequence by default. Set the customer's `email_subscribed = 0` to stop everything (or extend with custom code via the `yatra_email_should_send` filter).

**Step delay didn't fire** — Yatra uses WordPress cron. Confirm `wp-cron` is running (or use a real system cron — recommended). Visit `/wp-cron.php?doing_wp_cron` once to manually flush the queue.

## Useful links

- [Email & notifications](/email-settings) — the full template catalog and merge-tag reference.
- [Settings → Advanced → Debug mode](/settings#_13-advanced) — writes a copy of every send to `wp-content/uploads/yatra/email-debug.log`.
- [Hooks & filters](/hooks-filters) — `yatra_email_sequence_entered`, `yatra_email_should_send`, `yatra_email_step_processed`.

## Where to read more

- [All modules](/modules#email-automation) — module catalog.
- [Mailchimp Integration](/modules/mailchimp) — sync customers to Mailchimp for external sequences (alternative to native sequences).
