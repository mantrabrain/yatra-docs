---
title: Email Automation
description: Step-by-step setup for the Yatra Pro Email Automation module — multi-step sequences, your own templates on booking and payment events, per-trip and per-payment-method overrides, templates in the customer's language, and per-send delivery logs.
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

1. **Sequences** — multi-step emails started by a booking, payment, enquiry or reminder event, with a wait of minutes, hours, days or weeks between steps.
2. **Email logs** — a per-send log so you can see what was sent, to whom and when.

It also lets you add **your own templates** on booking and payment events, **override** a template for some trips or payment methods, and (with WPML or Polylang) send your templates **in the customer's language**.

Available on every Yatra Pro plan (Starter, Growth and Scale).

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

![Sequence editor — trigger, steps with a wait and a template](/screenshots/modules/email-sequence-form.webp)

### Sequence basics

| Field                   | Notes                                                                                       |
| ---                     | ---                                                                                         |
| **Sequence Name**       | Internal label.                                                                              |
| **Trigger**             | The event that starts the sequence — see the list below.                                    |
| **Status**              | Active / Paused / Draft. Only *Active* sequences start for new events.                       |

**The 10 events that can start a sequence:**

| Event key | When it fires |
| --- | --- |
| `booking.created` | A booking is made. |
| `booking.confirmed` | A booking is confirmed. |
| `booking.cancelled` | A booking is cancelled. |
| `booking.completed` | A booking is marked completed (after travel). |
| `payment.received` | A payment is received. |
| `payment.partial_received` | A deposit or part payment is received. |
| `enquiry.created` | An enquiry is submitted. |
| `scheduled.payment.succeeded` | A scheduled (balance / installment) charge succeeded. |
| `scheduled.payment.failed` | A scheduled charge failed. |
| `reminder.trip` | The pre-trip reminder is due. |

A sequence runs for every booking (or enquiry) that matches its trigger — there are no per-sequence or per-step audience filters.

::: tip Per-trip wording without a sequence
If what you need is different **wording** of a transactional email for some trips (confirmation, reminder, payment…), use a trip-specific **override template** instead — see [Email → Global & Override templates](/email-settings#global-override-templates-pro). Overrides target trips, categories and trip types.
:::

### Steps

A sequence is a list of one or more **steps**, run in order. Click **Add Step** for each:

| Step field          | Notes                                                                              |
| ---                 | ---                                                                                |
| **Wait before sending** | *Immediately*, or a number of **minutes, hours, days or weeks**. Each step's wait counts from the **previous step** (the first step's from the trigger). There is no "days before travel" option — for a pre-trip email, start a sequence on `reminder.trip`. |
| **Email Template**  | Pick any template from the [Email Templates list](/email-settings#templates). |

Example sequence — **Post-booking welcome series**:

```
Trigger: booking.confirmed

Step 1 — Immediately        → Welcome aboard (template: custom_welcome)
Step 2 — 2 days later       → What to pack (template: custom_packing_tips)
Step 3 — 1 week after that  → Meet your guides (template: custom_guides)
```

Save → set status to **Active**.

## Step 3 — Test your templates

Sequences have no test run. To check the content, open each template under <span class="screen-path">Yatra → Email → Templates</span> and use its **test email** action, then make a real test booking that matches the trigger.

## Step 4 — Verify in Email Logs

Open <span class="screen-path">Yatra → Email → Email Logs</span> after a test or live booking. Each row shows the **Recipient**, **Subject**, **Template**, **Sequence** (when sent by one), **Status** and when it was **Sent**. A failed row tells you the send didn't go through — usually an SMTP / authentication problem.

## Your own templates on booking and payment events

Besides sequences, you can create a template of your own and attach it to an event. Open <span class="screen-path">Yatra → Email → Templates</span>, create a template, and pick the event under **Select an event to trigger this email automatically**. It is sent **in addition to** Yatra's standard email for that event.

| Event | When your template is sent |
| --- | --- |
| **Booking Created** | When a booking is made. |
| **Payment Received** | When a payment settles the booking in full (nothing left to pay). |
| **Partial Payment Received** | When a payment is recorded but a balance is still due — a deposit or a part payment. |

::: info Changed in Yatra Pro 3.2
Before Yatra Pro 3.2, only your own **Booking Created** templates were actually sent. Templates you created on **Payment Received** or **Partial Payment Received** are now sent too. A payment recorded in the admin with its emails switched off doesn't send them.
:::

The recipient follows the template's **To** address: leave it empty for the customer, or put your own address (or `{{admin_email}}`) for a note to your team. Payment templates can use the payment tags `{{payment_amount}}`, `{{payment_amount_formatted}}`, `{{payment_method}}` and `{{transaction_id}}` besides the usual booking tags (see [merge tags](/email-settings#payment-event-tags)).

### An admin email for deposits

Yatra normally sends you its standard **Admin: Payment Received** email for every payment, including a deposit. If you'd rather get a different email while a balance is still due, create an **admin** template on **Partial Payment Received** (Recipient: Admin, or the To address is your store's notification address). For a deposit or part payment, that template is sent **instead of** the standard admin "Payment received" email — so you get one email, not two. Payments that settle the booking still send the standard admin email.

This needs **Yatra 3.2** or later alongside Yatra Pro 3.2 (it uses Yatra's `yatra_send_admin_payment_received_email` filter).

## Overrides per trip or payment method

An **override** is a different version of a standard template — for example a confirmation with packing notes for your trekking trips. Overrides are described in [Email → Global & Override templates](/email-settings#global-override-templates-pro). Each one can target trips, whole categories, trip types and **payment methods** (Yatra Pro 3.1.3 or later, with Yatra 3.1.3 or later — with an older Yatra the picker isn't shown).

To make an email that only goes to customers who paid a certain way:

1. Open <span class="screen-path">Yatra → Email → Templates</span> and click **Add override…** on the standard template (for example *Payment Received* or *Scheduled Payment Reminder*).
2. Under **Only for bookings paid with**, pick one or more payment methods — for example *Bank Transfer* to include your bank details, or *Charged automatically to a saved card* for a reminder that says the card will be charged.
3. Optionally pick trips, categories or a trip type as well; then the override is used only when **both** the trip and the payment method match.
4. Save and switch the override on.

How it is chosen:

- An override with payment methods is used **only** for bookings paid with one of them; a booking paid another way (or whose payment method isn't known) gets the next best match or the standard template.
- When it matches, it wins over overrides that only name trips, categories or trip types.
- *Charged automatically to a saved card* matches only scheduled payment emails that Yatra will charge by itself. A payment reminder sent from such an override doesn't show Yatra's "Pay your balance now" button.
- An override replaces its standard template; it is never sent in addition to it.

## Templates in the customer's language (WPML / Polylang)

With **WPML** or **Polylang** active and **Yatra 3.2** or later, your active customer templates can be translated, and each customer gets them in the language they booked in.

1. Open WPML's **String Translation** screen, or Polylang's <span class="screen-path">Languages → Translations</span>, and filter by the **Yatra** group.
2. Each active customer template's subject and body is listed (shown as *Pro email {template key} subject / body*). Translate them there.
3. When the email goes out, Yatra switches to the language the booking was made in and uses your translation. A text you haven't translated goes out in the original.

Templates sent to you (Recipient: Admin) are not translated — they stay in the site language. Without WPML or Polylang nothing changes.

## Common patterns

| Goal                                                  | Trigger                     | Steps                                         |
| ---                                                   | ---                         | ---                                           |
| Welcome new bookings                                  | `booking.confirmed`         | 1 step immediately                            |
| Pre-trip tips                                         | `reminder.trip`             | Immediately, then 1 day later                 |
| Deposit follow-up                                     | `payment.partial_received`  | 1 step after 3 days                           |
| Post-trip review nurture                              | `booking.completed`         | 1 day after, then 2 weeks after that          |
| Enquiry-to-booking nurture                            | `enquiry.created`           | Immediately, + 2 days, + 3 days               |
| Rescue a failed balance charge                        | `scheduled.payment.failed`  | 1 step immediately                            |

## Troubleshooting

**Sequence started but no email sent** — open the Email Logs tab and look for the recipient. A `failed` row means the send didn't go through (usually SMTP authentication / DNS / spam-filter related).

**Sequence runs but emails arrive in spam** — set up SPF, DKIM, and DMARC on the *From* domain. WordPress's built-in `wp_mail()` doesn't authenticate properly with most receivers.

**Wrong template used** — sequences and the underlying transactional emails read from the same template list. If you edited the wrong template, your sequence will use the edited version.

**Step delay didn't fire** — Yatra uses WordPress cron. Confirm `wp-cron` is running (or use a real system cron — recommended). Visit `/wp-cron.php?doing_wp_cron` once to manually flush the queue.

## Useful links

- [Email & notifications](/email-settings) — the full template catalog and merge-tag reference.
- [Settings → Advanced → Debug mode](/settings#_13-advanced) — writes a copy of every send to `wp-content/uploads/yatra/email-debug.log`.
- [Hooks & filters](/hooks-filters) — `yatra_send_transactional_email`, `yatra_pro_email_transactional_type_map`, `yatra_send_admin_payment_received_email`.

## Where to read more

- [All modules](/modules#email-automation) — module catalog.
- [Mailchimp Integration](/modules/mailchimp) — sync customers to Mailchimp for external sequences (alternative to native sequences).
