---
title: Email & notifications
description: Edit Yatra's transactional emails, configure deliverability, and unlock branded sequences and automation logs with Yatra Pro Email Automation. Every template, every merge tag.
---

# Email & notifications

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Sequences, full delivery logs &amp; Mailchimp sync are Yatra Pro.</strong> The free plugin already sends every transactional email — you can edit subject, body, and HTML on all 25 templates without a Pro license.</span>
  <a class="doc-pro-callout__cta" href="https://wpyatra.com/pricing/" target="_blank" rel="noopener">View pricing →</a>
</div>

Yatra sends transactional emails at every important moment — booking confirmation, admin notice, payment receipt, departure reminder, post-trip review request. This page is the practical guide for editing them, making them deliverable, and unlocking multi-step sequences with Pro Email Automation.

## The Email hub

![Email hub — Delivery / Templates / Sequences / Logs tabs](/screenshots/email/email.webp)

Open <span class="screen-path">Yatra → Email</span>. The URL is `admin.php?page=yatra&subpage=email-automation`.

The hub has up to four tabs:

| Tab                  | Free                              | Pro                                                        |
| ---                  | ---                               | ---                                                        |
| **Delivery**         | ✅ Site-wide sender settings.    |                                                            |
| **Templates**        | ✅ All 25 transactional templates. |                                                            |
| **Sequences**        | —                                 | <span class="pro-pill">PRO</span> Multi-step sequences.   |
| **Email logs**       | —                                 | <span class="pro-pill">PRO</span> Per-send delivery log.  |

**Sequences** and **Email logs** only appear when **Yatra Pro** is active **and** the **Email Automation** module is on (toggle in <span class="screen-path">Yatra → Modules</span>).

---

## Delivery settings

The Delivery tab covers the **basics that decide whether your emails land in inboxes or spam**:

- **From email** — visible "From" address. Use a `noreply@yourdomain.com` on a domain you control.
- **From name** — usually your tour-operator name.
- **Reply-to** — where replies go (default: site admin).
- **Admin email** — where admin-targeted notices go (new booking, new enquiry, etc.).

<div class="ui-tip"><strong>Important:</strong> WordPress's built-in <code>wp_mail()</code> is unreliable on most hosts. Connect a real ESP (SendGrid, Postmark, Mailgun, Amazon SES) using a transport plugin like <strong>WP Mail SMTP</strong>, <strong>FluentSMTP</strong>, or <strong>Post SMTP</strong>. Then configure SPF, DKIM, and DMARC for the From domain.</div>

---

## Templates

The Templates tab lists every template with these columns:

- **Name** — what the template does.
- **Audience** — *Customer* or *Admin*.
- **Trigger** — the event key that fires it (e.g. `booking.created`, `payment.received`).
- **Status** — Active / Inactive toggle.

::: tip Module-gated templates stay listed
Templates that require a Pro module (Trip Consent, Scheduled Payments, Abandoned Booking Recovery) **still appear in the list** even without the module — you can read them and review their copy, but they're view-only until the module is enabled.
:::

### The 25 transactional templates

Every template's content is editable from the Templates tab; module-gated ones are read-only until the relevant Pro module is active.

#### Booking lifecycle (customer)

| Template key                  | Display name           | Trigger                | Notes                                          |
| ---                           | ---                    | ---                    | ---                                            |
| `booking_confirmation`        | Booking Confirmation   | `booking.created`      | The unified customer email — sent at checkout, manual admin bookings, and on confirmation. |
| `booking_cancelled`           | Booking Cancelled      | `booking.cancelled`    | Customer-facing cancellation notice.            |
| `booking_completed`           | Booking Completed      | `booking.completed`    | Sent when the trip-completion cron flips the booking after travel date. |
| `booking_expired_customer`    | Booking Expired        | `booking.expired`      | Sent when a pending booking is auto-cancelled by expiry cron. |
| `new_booking`                 | (Legacy) New Booking   | `booking.created`      | Older event-specific template kept for backwards compatibility. |
| `booking_payment`             | (Legacy) Payment Received | `payment.received`  | Older event-specific template kept for backwards compatibility. |
| `booking_confirmed`           | (Legacy) Booking Confirmed | `booking.confirmed` | Older event-specific template kept for backwards compatibility. |

#### Booking lifecycle (admin)

| Template key                  | Display name             | Trigger              |
| ---                           | ---                      | ---                  |
| `admin_new_booking`           | Admin: New Booking       | `booking.created`    |
| `admin_payment_received`      | Admin: Payment Received  | `payment.received`   |
| `admin_booking_cancelled`     | Admin: Booking Cancelled | `booking.cancelled`  |
| `admin_booking_expired`       | Admin: Booking Expired   | `booking.expired`    |

#### Payment

| Template key                       | Display name                       | Trigger                          | Module-gated by                    |
| ---                                | ---                                | ---                              | ---                                |
| `payment_received`                 | Payment Received (customer)        | `payment.received`               | —                                  |
| `payment_reminder`                 | Payment Reminder                   | `payment.reminder`               | —                                  |
| `scheduled_payment_reminder`       | Scheduled Payment Reminder         | `scheduled.payment.reminder`     | Scheduled Payments <span class="pro-pill">PRO</span> |
| `scheduled_payment_succeeded`      | Scheduled Payment Received         | `scheduled.payment.succeeded`    | Scheduled Payments <span class="pro-pill">PRO</span> |
| `scheduled_payment_failed`         | Scheduled Payment Failed (customer) | `scheduled.payment.failed`       | Scheduled Payments <span class="pro-pill">PRO</span> |
| `admin_scheduled_payment_failed`   | Admin: Scheduled Payment Failed    | `scheduled.payment.failed`       | Scheduled Payments <span class="pro-pill">PRO</span> |

#### Reminders & marketing

| Template key       | Display name           | Trigger                       |
| ---                | ---                    | ---                           |
| `trip_reminder`    | Trip Reminder          | `reminder.trip`               |
| `review_request`   | Review Request         | `marketing.review_request`    |

#### Enquiries

| Template key         | Display name             | Trigger                |
| ---                  | ---                      | ---                    |
| `enquiry_received`   | Enquiry Received         | `enquiry.created`      |
| `enquiry_admin`      | Admin: New Enquiry       | `enquiry.created`      |
| `enquiry_response`   | Enquiry Response         | `enquiry.responded`    |

#### Account & consent

| Template key                   | Display name                | Trigger                          | Module-gated by                       |
| ---                            | ---                         | ---                              | ---                                   |
| `customer_email_verification`  | Email Verification          | `account.email_verification`    | —                                     |
| `trip_consent_request`         | Trip Consent Request        | `consent.requested`             | Trip Consent <span class="pro-pill">PRO</span> |

#### Abandoned booking recovery <span class="pro-pill">PRO</span>

Module-gated by **Abandoned Booking Recovery** — listed in the catalog regardless, sends only when the module is active.

| Template key                            | Display name                       | Trigger                          |
| ---                                     | ---                                | ---                              |
| `abandoned_booking_recovery_first`      | Abandoned Recovery — 1h reminder   | `booking.abandoned_recovery`     |
| `abandoned_booking_recovery_second`     | Abandoned Recovery — 1d reminder   | `booking.abandoned_recovery`     |
| `abandoned_booking_recovery_final`      | Abandoned Recovery — 3d final      | `booking.abandoned_recovery`     |

::: tip "Free baseline" — 17 templates fire without Pro
Of the 25 templates in the catalog, **17** work in the free plugin out-of-the-box: every booking lifecycle email (customer + admin), payment received/reminder, enquiry triad, trip reminder, review request, and email verification. The other 8 require their corresponding Pro module to actually fire (the rows stay visible for content review).
:::

---

## Edit a template

Click a template name in the Templates tab to open the editor.

![Email template editor — settings, subject, body HTML, merge-tag sidebar](/screenshots/email/email-template-editor.webp)

### Top of the page

- **← Back to templates** — return to the list.
- **Preview** — opens a rendered preview in a new tab using the **Sample data service** so merge tags resolve to realistic values.
- **Save** — persists changes.
- **Status toggle** — Active / Inactive.

### Settings section

| Field           | Notes                                                                                                        |
| ---             | ---                                                                                                          |
| **Name**        | Internal label for the Templates list.                                                                       |
| **From name**   | Overrides the global *Delivery → From name* for this template only.                                          |
| **From email**  | Overrides the global *From email*.                                                                           |
| **Reply-to**    | Can use merge tags (e.g. `{{customer_email}}` so replies go directly to the customer).                      |
| **CC / BCC**    | Comma-separated addresses or merge tags.                                                                     |

### Subject & body

- **Subject line** — supports merge tags (e.g. `Your {{trip_name}} booking is confirmed · {{booking_reference}}`).
- **Email body (HTML)** — the full message. WYSIWYG-style with raw HTML support.
- **Merge-tag sidebar** — every available tag for this template, with click-to-copy.

---

## Available merge tags

Merge tags use `{{…}}` syntax. Whitespace inside the braces is OK — `{{ trip_name }}` is the same as `{{trip_name}}`.

<div v-pre>

### Universal tags (every template)

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{site_name}}</code></td><td>Your site / company name.</td></tr>
    <tr><td><code>{{site_url}}</code></td><td>Site root URL.</td></tr>
    <tr><td><code>{{date}}</code></td><td>Current date in the site time zone.</td></tr>
    <tr><td><code>{{time}}</code></td><td>Current time in the site time zone.</td></tr>
  </tbody>
</table>

### Customer tags

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{customer_name}}</code></td><td>Full name.</td></tr>
    <tr><td><code>{{customer_first_name}}</code></td><td>First name (parsed).</td></tr>
    <tr><td><code>{{customer_email}}</code></td><td>Customer's email.</td></tr>
  </tbody>
</table>

### Trip tags

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{trip_name}}</code></td><td>Trip title.</td></tr>
    <tr><td><code>{{trip_url}}</code></td><td>Permalink to the trip page.</td></tr>
  </tbody>
</table>

### Booking tags

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{booking_reference}}</code></td><td>Human-readable booking code (e.g. <code>YT-2026-00123</code>).</td></tr>
    <tr><td><code>{{booking_id}}</code></td><td>Numeric booking ID.</td></tr>
    <tr><td><code>{{booking_date}}</code></td><td>When the booking was placed.</td></tr>
    <tr><td><code>{{travel_date}}</code></td><td>Departure date.</td></tr>
    <tr><td><code>{{travelers_count}}</code></td><td>Number of travelers.</td></tr>
    <tr><td><code>{{booking_url}}</code></td><td>Customer-facing booking detail URL.</td></tr>
    <tr><td><code>{{my_account_url}}</code></td><td>Customer account URL.</td></tr>
  </tbody>
</table>

### Money tags

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{currency}}</code></td><td>Currency code (USD, EUR, …).</td></tr>
    <tr><td><code>{{total_amount_formatted}}</code></td><td>Booking total with currency symbol.</td></tr>
    <tr><td><code>{{amount_due_formatted}}</code></td><td>Outstanding balance with currency.</td></tr>
    <tr><td><code>{{booking_total}}</code></td><td>Raw total number.</td></tr>
    <tr><td><code>{{amount_paid}}</code></td><td>Total paid so far (raw number).</td></tr>
    <tr><td><code>{{amount_due}}</code></td><td>Outstanding balance (raw number).</td></tr>
  </tbody>
</table>

### Rich booking tags

<p>These are pre-rendered HTML blocks — drop them anywhere in the email body for a polished render.</p>

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{intro_paragraph}}</code></td><td>Sample intro paragraph from the layout service.</td></tr>
    <tr><td><code>{{details_html}}</code></td><td>The full booking-details card (booking #, dates, travelers, total).</td></tr>
    <tr><td><code>{{footer_note}}</code></td><td>The standard footer note.</td></tr>
    <tr><td><code>{{payment_gateway}}</code></td><td>Gateway slug (e.g. <code>stripe</code>).</td></tr>
    <tr><td><code>{{payment_gateway_label}}</code></td><td>Friendly gateway name (e.g. "Stripe (Card)").</td></tr>
    <tr><td><code>{{payment_schedule}}</code></td><td>Raw schedule key.</td></tr>
    <tr><td><code>{{payment_schedule_label}}</code></td><td>Friendly schedule label.</td></tr>
    <tr><td><code>{{travelers_list}}</code></td><td>Plain-text traveler list.</td></tr>
    <tr><td><code>{{travelers_list_html}}</code></td><td>HTML traveler list block.</td></tr>
    <tr><td><code>{{traveler_custom_fields_html}}</code></td><td>HTML block of every custom traveler field collected at checkout.</td></tr>
    <tr><td><code>{{booking_custom_fields_html}}</code></td><td>HTML block of booking-form custom fields.</td></tr>
    <tr><td><code>{{special_requests}}</code></td><td>Plain text from the customer's <em>Notes</em> field.</td></tr>
    <tr><td><code>{{special_requests_html}}</code></td><td>HTML-wrapped version.</td></tr>
  </tbody>
</table>

</div>

::: tip See which tags apply to a specific template
Open any template in the editor — the **merge-tag sidebar** on the right shows you exactly which tags are available for that template, with click-to-copy.
:::

---

## Sequences <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Email Automation — multi-step sequences</span>
  </div>
  <p class="pro-callout__desc">Trigger a sequence on booking confirmed → wait 7 days → send "tips for your upcoming trip" → wait until 1 day before travel → send "weather + packing list" → wait until day after travel → send "leave a review" — all without a separate marketing tool.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock sequences →</a>
</div>

![Sequences tab — multi-step automation list with stats](/screenshots/email/email-sequences.webp)

Open the **Sequences** tab (visible only with the Email Automation module on).

Each sequence has:

| Field                     | Notes                                                                                                                                  |
| ---                       | ---                                                                                                                                    |
| **Name**                  | Internal label.                                                                                                                        |
| **Trigger event**         | One of `booking.created`, `booking.confirmed`, `booking.cancelled`, `booking.completed`, `payment.received`, `payment.reminder`, etc. |
| **Audience filters**      | Limit to customers from specific destinations / categories / countries / trip types.                                                   |
| **Steps**                 | 1 or more steps; each has a **delay** (minutes / hours / days, relative to the trigger or to the previous step) and a **template**.   |
| **Active toggle**         | Pause or activate the whole sequence site-wide without deleting it.                                                                    |

### Sequence stats

Per-sequence: number of customers entered, number completed, opens, clicks, unsubscribes — populated from ESP webhooks (when your transport plugin posts opens/clicks back to Yatra).

---

## Email logs <span class="pro-pill">PRO</span>

![Email logs tab — every send, with status, recipient, template](/screenshots/email/email-logs.webp)

Every email send is recorded with:

- **Timestamp**
- **Recipient**
- **Template key**
- **Status** — sent / failed / bounced / opened (when ESP webhooks are wired up)
- **ESP response code** — for debugging delivery failures
- **Subject** — final rendered subject after merge tags

Filter by status, by template, or by date range. Click a row for the full payload (rendered HTML, headers, merge-tag values).

Useful when a customer says *"I didn't get an email"* — the log shows whether it actually sent and the ESP response.

---

## Test a template

Three ways, in order of fidelity:

1. **Preview button** in the template editor — renders against the *Sample Data Service* (realistic booking, customer, trip data without sending).
2. **Send a test email** — most templates expose a *Send test to admin email* button.
3. **End-to-end** — book a trip yourself in a private window and watch the **Booking Confirmation** + **Payment Received** + **Admin: New Booking** emails actually land in the configured inboxes.

::: tip Email debug log
Enable **Debug mode** under [Settings → Advanced](/settings#_13-advanced). With it on, Yatra also writes a copy of every send to `wp-content/uploads/yatra/email-debug.log`.
:::

---

## Where templates are stored

| Item                                | Location in WP-options                                                              |
| ---                                 | ---                                                                                 |
| Per-template ON/OFF flag            | `yatra_email_template_<slug>` (e.g. `yatra_email_template_booking`)                |
| Per-template subject                | `yatra_email_tpl_<slug>_subject` (e.g. `yatra_email_tpl_booking_subject`)          |
| Per-template body HTML              | `yatra_email_tpl_<slug>_body`                                                       |
| Global delivery settings            | `yatra_email_from_name`, `yatra_email_from_email`, `yatra_email_reply_to`, `yatra_admin_email` |
| Sequences (Pro)                     | Database table `wp_yatra_email_sequences`                                           |
| Email logs (Pro)                    | Database table `wp_yatra_email_logs`                                                |

You can read/write these from code via `SettingsService::get()` / `update_option()`. Default content lives in `app/Services/EmailTemplateDefaults.php`; the runtime renderer is `EmailService` and `TransactionalEmailTemplateService`.

---

## What's next

- [Pro modules](/modules) — toggle Email Automation, Trip Consent, Scheduled Payments, Abandoned Booking Recovery.
- [Settings → Advanced](/settings#_13-advanced) — debug mode, logging toggles.
- [Hooks & filters](/hooks-filters) — every action / filter the email pipeline fires.
- [Troubleshooting](/troubleshooting) — fixing bounced or missing email.
