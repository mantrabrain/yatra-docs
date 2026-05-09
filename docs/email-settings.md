---
title: Email & notifications
description: Edit Yatra's transactional emails, configure deliverability, and unlock branded sequences and automation logs with Yatra Pro Email Automation.
---

# Email & notifications

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Sequences, automation, full delivery logs &amp; Mailchimp sync are Yatra Pro.</strong> The free plugin already sends every transactional email, you just edit subject, body, and HTML.</span>
  <a class="doc-pro-callout__cta" href="https://wpyatra.com/pricing/" target="_blank" rel="noopener">View pricing →</a>
</div>

Yatra sends transactional emails at every important moment — booking confirmation, admin notice, payment receipt, departure reminder, post-trip review request. This page is the practical guide for editing them, making them deliverable, and unlocking sequences with Pro Email Automation.

## The Email hub

Open <span class="screen-path">Yatra → Email</span>.

The hub has tabs across the top:

- **Delivery** — site-wide sender settings.
- **Templates** — every transactional email, listed individually.
- **Sequences** <span class="pro-pill">PRO</span> — multi-step automation sequences.
- **Email logs** <span class="pro-pill">PRO</span> — every send, every recipient, every status.

Sequences and Email logs only show when **Yatra Pro** is active **and** the **Email Automation** module is on.

## Delivery settings

The Delivery tab covers the **basics that decide whether your emails land in inboxes or spam**:

- **From email** — visible "From" address. Use a `noreply@yourdomain.com` on a domain you control.
- **From name** — usually your tour operator name.
- **Reply-to** — where replies go (default: site admin).
- **Admin email** — where admin notices go.

<div class="ui-tip"><strong>Important:</strong> WordPress's built-in <code>wp_mail()</code> is unreliable on most hosts. Connect a real ESP (SendGrid, Postmark, Mailgun, Amazon SES) using a transport plugin like <strong>WP Mail SMTP</strong>, <strong>FluentSMTP</strong>, or <strong>Post SMTP</strong>. Then configure SPF, DKIM, and DMARC for the From domain.</div>

## Templates

The Templates tab lists every email type in your store, with columns:

- **Name** — what the template does.
- **Audience** — admin or customer.
- **Trigger** — what fires it (event name).
- **Status** — Active or Inactive.

### Free transactional emails

These ship with the free plugin and are seeded on activation:

| Template                          | Audience  | Triggered by                              |
| ---                               | ---       | ---                                       |
| **Booking received**              | Customer  | New booking (pending)                     |
| **Booking confirmed**             | Customer  | Booking transitions to confirmed          |
| **New booking notice**            | Admin     | New booking                                |
| **Payment receipt**               | Customer  | Payment marked complete                   |
| **Booking cancelled**             | Customer  | Booking cancelled                          |
| **Enquiry received**              | Customer  | Enquiry submitted                          |
| **New enquiry notice**            | Admin     | Enquiry submitted                          |

### Pro templates <span class="pro-pill">PRO</span>

When the **Email Automation** Pro module is on, more templates appear here:

| Template                                      | Available with                          |
| ---                                           | ---                                     |
| **Departure reminder**                        | Email Automation                         |
| **Pre-trip welcome**                          | Email Automation                         |
| **Post-trip review request**                  | Email Automation                         |
| **Abandoned booking recovery (1h / 1d / 3d)** | Abandoned Booking Recovery               |

## Edit a template

Click any template name to open the editor:

### Top of the page

- **← Back to templates** — list view.
- **Preview** — opens a sample render in a new tab.
- **Save** — persists changes.
- **Status toggle** — Active / Inactive.

### Fields

- **Subject line** — supports merge tags (e.g. "Your {{trip_name}} booking is confirmed").
- **Email body (HTML)** — the full message. The right rail lists every variable you can use; click one to copy.

### Available merge tags

The most-used:

| Tag                         | Renders                              |
| ---                         | ---                                  |
| `{{site_name}}`             | Your site / company name             |
| `{{site_url}}`              | Site root URL                        |
| `{{customer_name}}`         | Customer's full name                  |
| `{{customer_first_name}}`   | First name (parsed)                  |
| `{{customer_email}}`        | Customer's email                      |
| `{{trip_name}}`             | Trip title                            |
| `{{trip_url}}`              | Permalink to the trip                 |
| `{{booking_number}}`        | Yatra booking number                  |
| `{{booking_date}}`          | When the booking was placed           |
| `{{travel_date}}`           | The departure date                    |
| `{{travelers_count}}`       | Number of travelers                  |
| `{{booking_total}}`         | Total in display currency             |
| `{{amount_paid}}`           | Total paid so far                     |
| `{{amount_due}}`            | Outstanding balance                   |
| `{{booking_url}}`           | Booking detail URL (customer-facing)  |
| `{{my_account_url}}`        | Customer account URL                  |
| `{{date}}` / `{{time}}`     | Now (site timezone)                   |

Whitespace inside braces is OK — `{{ trip_name }}` works the same as `{{trip_name}}`.

## Sequences <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Email Automation — multi-step sequences</span>
  </div>
  <p class="pro-callout__desc">Trigger a sequence on booking confirmed → wait 7 days → send "tips for your upcoming trip" → wait until 1 day before travel → send "weather + packing list" → wait until day after travel → send "leave a review" — all without a separate marketing tool.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock sequences →</a>
</div>

Each sequence has:

- **Trigger** — booking confirmed, departure tomorrow, post-trip, etc.
- **Steps** — 1 or more steps, each with a delay and a template.
- **Audience filters** — only customers from specific destinations / categories / countries.
- **Pause / activate** — turn the whole sequence on or off site-wide.

Stats per sequence: how many entered, how many completed, opens, clicks (when ESP sends webhooks back).

## Email logs <span class="pro-pill">PRO</span>

Every email send is recorded with timestamp, recipient, template, status, and ESP response code. Filters: by status (sent / failed / bounced / opened), by template, by date range. Click a row for the full payload.

Useful when a customer says "I didn't get an email" — the log shows whether it actually sent, and the ESP response.

## Test a template

The fastest test: book a trip yourself in a private window and watch the **Booking received** + **Booking confirmed** + **Receipt** emails land. Or:

- Click **Preview** on the template editor — opens a rendered preview without sending.
- Enable **debug mode** under <span class="screen-path">Settings → Advanced</span> to also write a copy to `wp-content/uploads/yatra/email-debug.log`.

## What's next

- [Pro modules](/third-party-integrations) — every Pro feature listed.
- [Troubleshooting](/troubleshooting) — fix bounced or missing email.
- [Hooks & filters](/hooks-filters) — extend email behavior in code.
