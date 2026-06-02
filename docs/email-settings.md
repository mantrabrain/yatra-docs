---
title: Email & notifications
description: Edit Yatra's transactional emails, configure deliverability, and unlock branded sequences and automation logs with Yatra Pro Email Automation. Every template, every merge tag.
---

# Email & notifications

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Sequences, full delivery logs &amp; Mailchimp sync are Yatra Pro.</strong> The free plugin already sends every transactional email — you can edit subject, body, and HTML on all 25 templates without a Pro license.</span>
  <a class="doc-pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs" target="_blank" rel="noopener">View pricing →</a>
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

<span v-pre>Merge tags use `{{…}}` syntax. Whitespace inside the braces is OK — `{{ trip_name }}` is the same as `{{trip_name}}`.</span>

Tags below come from one place: the **central merge-tag registry** (`Yatra\Services\EmailMergeTagRegistry`). The renderer and the in-editor "Available Variables" sidebar both read from it, so any tag listed here is guaranteed to resolve at send time on the events shown — no drift between the docs, the sidebar, and the actual email.

::: tip See which tags apply to a specific template
Open any template in the editor — the **merge-tag sidebar** on the right shows you exactly which tags resolve for that event, with click-to-copy. The list narrows automatically when you change the template's trigger.
:::

<div v-pre>

### Universal tags (every template)

These are merged in by `parseTemplate()` so every event has them.

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{site_name}}</code></td><td>WordPress Site Title.</td></tr>
    <tr><td><code>{{site_url}}</code></td><td>Site root URL.</td></tr>
    <tr><td><code>{{admin_email}}</code></td><td>Site administrator email.</td></tr>
    <tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
    <tr><td><code>{{current_date}}</code></td><td>Today's date formatted per the site's date format.</td></tr>
    <tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
  </tbody>
</table>

### Customer tags

Available on booking, enquiry, account, and consent / abandoned-recovery emails (`customer_last_name` / `customer_phone` are on booking + enquiry contexts only).

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{customer_name}}</code></td><td>Full name (first + last).</td></tr>
    <tr><td><code>{{customer_first_name}}</code></td><td>First name only.</td></tr>
    <tr><td><code>{{customer_last_name}}</code></td><td>Last name only (booking events).</td></tr>
    <tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
    <tr><td><code>{{customer_phone}}</code></td><td>Customer phone (booking + enquiry).</td></tr>
  </tbody>
</table>

### Booking tags

Available on every booking-context event (`booking.*`, `payment.*`, `reminder.trip`, `marketing.review_request`, `scheduled.payment.*`).

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. <code>YTR-2024-001234</code>).</td></tr>
    <tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
    <tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
    <tr><td><code>{{booking_status}}</code></td><td><code>pending</code> / <code>confirmed</code> / <code>cancelled</code> / <code>completed</code>.</td></tr>
    <tr><td><code>{{payment_status}}</code></td><td><code>unpaid</code> / <code>partial</code> / <code>paid</code> / <code>refunded</code>.</td></tr>
    <tr><td><code>{{trip_name}}</code></td><td>Title of the trip.</td></tr>
    <tr><td><code>{{trip_url}}</code></td><td>Public link to the trip page.</td></tr>
    <tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
    <tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
    <tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
    <tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
    <tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
    <tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
    <tr><td><code>{{special_requests}}</code></td><td>Customer-entered special-requests text.</td></tr>
    <tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
    <tr><td><code>{{cancellation_reason}}</code></td><td>Reason recorded when the booking was cancelled. <em>(<code>booking.cancelled</code> only)</em></td></tr>
    <tr><td><code>{{completion_date}}</code></td><td>Date the trip was marked completed. <em>(<code>booking.completed</code>, <code>marketing.review_request</code>)</em></td></tr>
    <tr><td><code>{{expiry_policy_note}}</code></td><td>Message shown when a pending booking auto-expires. <em>(<code>booking.expired</code> only)</em></td></tr>
  </tbody>
</table>

### Money tags

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{total_amount_formatted}}</code></td><td>Booking total with currency symbol — preferred over raw totals.</td></tr>
    <tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
    <tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. <code>USD</code>).</td></tr>
    <tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug (<code>stripe</code> / <code>paypal</code> / …).</td></tr>
    <tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name (Stripe, PayPal …).</td></tr>
    <tr><td><code>{{payment_schedule}}</code></td><td><code>full</code> / <code>deposit</code> / <code>partial</code>.</td></tr>
    <tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. "Deposit", "Full Payment").</td></tr>
  </tbody>
</table>

### Payment-event tags

<table>
  <thead><tr><th>Tag</th><th>Renders</th><th>Resolves on</th></tr></thead>
  <tbody>
    <tr><td><code>{{payment_amount_formatted}}</code></td><td>Amount of the specific payment with currency.</td><td><code>payment.received</code>, <code>payment.reminder</code></td></tr>
    <tr><td><code>{{payment_method}}</code></td><td>Instrument label ("Card", "Bank Transfer", …).</td><td><code>payment.received</code>, <code>payment.reminder</code></td></tr>
    <tr><td><code>{{transaction_id}}</code></td><td>Gateway transaction reference for the payment.</td><td><code>payment.received</code></td></tr>
    <tr><td><code>{{due_date}}</code></td><td>Payment due date for reminders.</td><td><code>payment.reminder</code></td></tr>
  </tbody>
</table>

### Scheduled-payment tags <span class="pro-pill">PRO</span>

Resolve on `scheduled.payment.reminder` / `scheduled.payment.succeeded` / `scheduled.payment.failed` (Scheduled Payments module).

<table>
  <thead><tr><th>Tag</th><th>Renders</th><th>Resolves on</th></tr></thead>
  <tbody>
    <tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td><td>all three</td></tr>
    <tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td><td>all three</td></tr>
    <tr><td><code>{{payment_type_label}}</code></td><td>"Deposit", "Final", "Installment 2 of 4", …</td><td>all three</td></tr>
    <tr><td><code>{{balance_after_formatted}}</code></td><td>Balance remaining after this charge succeeds.</td><td><code>scheduled.payment.succeeded</code></td></tr>
    <tr><td><code>{{failure_reason}}</code></td><td>Gateway-supplied reason a scheduled charge failed.</td><td><code>scheduled.payment.failed</code></td></tr>
    <tr><td><code>{{failure_intro_html}}</code></td><td>Intro block for the payment-failure email body.</td><td><code>scheduled.payment.failed</code></td></tr>
    <tr><td><code>{{failure_followup_html}}</code></td><td>Closing block prompting the customer to update payment.</td><td><code>scheduled.payment.failed</code></td></tr>
  </tbody>
</table>

### Reminder & review tags

Resolve on `reminder.trip` and `marketing.review_request`.

<table>
  <thead><tr><th>Tag</th><th>Renders</th><th>Resolves on</th></tr></thead>
  <tbody>
    <tr><td><code>{{days_until_trip}}</code></td><td>Days remaining until departure.</td><td><code>reminder.trip</code></td></tr>
    <tr><td><code>{{reminder_days}}</code></td><td>Configured number of days before the trip when the reminder fires.</td><td><code>reminder.trip</code></td></tr>
    <tr><td><code>{{reminder_extra_html}}</code></td><td>Optional extra block (packing list, etc.).</td><td><code>reminder.trip</code></td></tr>
    <tr><td><code>{{review_url}}</code></td><td>Public link the customer opens to leave a review.</td><td><code>marketing.review_request</code></td></tr>
  </tbody>
</table>

### Enquiry tags

Resolve on `enquiry.created` and `enquiry.responded`. The response-only fields are injected solely on the response email — they don't appear in `enquiry.created`.

<table>
  <thead><tr><th>Tag</th><th>Renders</th><th>Resolves on</th></tr></thead>
  <tbody>
    <tr><td><code>{{enquiry_id}}</code></td><td>Internal numeric enquiry identifier.</td><td>both</td></tr>
    <tr><td><code>{{enquiry_date}}</code></td><td>When the enquiry was submitted.</td><td>both</td></tr>
    <tr><td><code>{{subject}}</code></td><td>Subject line the customer provided.</td><td>both</td></tr>
    <tr><td><code>{{message}}</code></td><td>Customer message body (sanitised, line breaks preserved).</td><td>both</td></tr>
    <tr><td><code>{{original_message}}</code></td><td>First message in the enquiry thread (no line-break escaping).</td><td>both</td></tr>
    <tr><td><code>{{response}}</code></td><td>Operator's typed reply.</td><td><code>enquiry.responded</code></td></tr>
    <tr><td><code>{{response_message}}</code></td><td>Same as <code>response</code>.</td><td><code>enquiry.responded</code></td></tr>
    <tr><td><code>{{response_date}}</code></td><td>When the reply was sent.</td><td><code>enquiry.responded</code></td></tr>
  </tbody>
</table>

### Trip consent tags <span class="pro-pill">PRO</span>

Resolve on `consent.requested` (Trip Consent module).

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{recipient_name}}</code></td><td>Traveler receiving the consent email.</td></tr>
    <tr><td><code>{{form_name}}</code></td><td>Title of the consent form.</td></tr>
    <tr><td><code>{{consent_link}}</code></td><td>URL to open and sign the form.</td></tr>
    <tr><td><code>{{expiry_notice_html}}</code></td><td>Optional expiry-message block.</td></tr>
    <tr><td><code>{{consent_test_notice_html}}</code></td><td>Shown only on admin test sends.</td></tr>
  </tbody>
</table>

### Account / verification tags

Resolve on `account.email_verification`.

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{verification_link}}</code></td><td>Magic link the customer opens to verify their email.</td></tr>
    <tr><td><code>{{intro_paragraph}}</code></td><td>Opening sentence (registration / resend variant).</td></tr>
    <tr><td><code>{{footer_note}}</code></td><td>Disclaimer for unintended recipients.</td></tr>
    <tr><td><code>{{expiry_notice_html}}</code></td><td>Link-expiry messaging block (also used by consent emails).</td></tr>
  </tbody>
</table>

### Abandoned-recovery tags <span class="pro-pill">PRO</span>

Resolve on `booking.abandoned_recovery` (Abandoned Booking Recovery module).

<table>
  <thead><tr><th>Tag</th><th>Renders</th></tr></thead>
  <tbody>
    <tr><td><code>{{recovery_link}}</code></td><td>Resume the abandoned checkout from the customer email.</td></tr>
    <tr><td><code>{{recovery_reminder_label}}</code></td><td>Sequence-stage label ("First reminder", "Final reminder", …).</td></tr>
    <tr><td><code>{{recovery_intro_html}}</code></td><td>Lead paragraph specific to each recovery email.</td></tr>
  </tbody>
</table>

</div>

### Extending the registry

Modules can append their own tags without forking core:

```php
add_filter( 'yatra_email_merge_tag_definitions', function ( array $catalog ) {
    $catalog['airline_pnr'] = [
        'key' => 'airline_pnr',
        'label' => 'Airline PNR',
        'description' => 'Six-character GDS reservation code.',
        'category' => 'booking',
        'sample' => 'ABC123',
        'events' => [ 'booking.confirmed', 'booking.created' ],
    ];
    return $catalog;
} );
```

Whatever you append flows into the sidebar AND must be injected by the relevant dispatcher (filter `yatra_booking_email_variables` for booking events, `yatra_send_transactional_email` for any send). Otherwise the tag renders empty in the email.

---

## Per-event reference

Every email Yatra sends is fired from one of 17 events. Each entry below explains **when** the event fires, **which dispatcher** assembles the variables, **which templates** subscribe to it, and the **full variable list** with explanations. Generated from the central registry.

<!-- AUTO-GENERATED:per-event-reference:START -->

### `booking.created` — Booking Created

**When it fires.** A new booking is inserted into the database. Triggered by checkout (`POST /yatra/v1/bookings/place`) and by the admin "Create Booking" flow. The Email Automation hook fans the event out to every active template keyed to this event.

**Dispatcher.** `yatra_booking_created` action → `EmailAutomationHooks::onBookingCreatedEventTemplates` → `EmailAutomationService::mergeBookingVariablesForTemplates()`

**Templates listening to this event:**

- `booking_confirmation` — Booking Confirmation (Customer)
- `new_booking` — Legacy: New Booking (Customer)
- `admin_new_booking` — Admin: New Booking (Admin)

**Variables available** (33 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking.confirmed` — Booking Confirmed

**When it fires.** Booking status flips to `confirmed` — typically after a deposit / full payment lands, or when an operator manually confirms a pending booking in admin.

**Dispatcher.** `BookingService::sendStatusEmail()` (status_confirmed branch) → free renderer → Pro override via `maybeSendTransactional`

**Templates listening to this event:**

- `booking_confirmed` — Legacy: Booking Confirmed (Customer)

**Variables available** (33 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking.cancelled` — Booking Cancelled

**When it fires.** Booking status flips to `cancelled`. Either the customer cancels through My Account or an operator cancels in admin; the cancellation reason is stored on the booking row and exposed to the template.

**Dispatcher.** `BookingService::sendStatusEmail()` (cancelled branch) → free renderer → Pro override

**Templates listening to this event:**

- `booking_cancelled` — Booking Cancelled (Customer)
- `admin_booking_cancelled` — Admin: Booking Cancelled (Admin)

**Variables available** (34 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (16)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{cancellation_reason}}</code></td><td>Reason recorded when the booking was cancelled.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking.completed` — Trip Completed

**When it fires.** Booking is marked `completed` — usually by the `yatra_booking_completion_cron` after the travel date passes, or by an operator manually flipping the status.

**Dispatcher.** `BookingService::sendStatusEmail()` (completed branch) and `EmailAutomationHooks::maybeSendCompletedTemplate`

**Templates listening to this event:**

- `booking_completed` — Booking Completed (Customer)

**Variables available** (34 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (16)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{completion_date}}</code></td><td>Date the trip / booking was marked completed.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking.expired` — Booking Expired (Non-payment)

**When it fires.** The booking-expiry cron auto-cancels a pending booking that wasn't paid within the configured window. Sends both customer and admin variants.

**Dispatcher.** `BookingCronService::expireBookings()` → `TYPE_BOOKING_EXPIRED_CUSTOMER` / `TYPE_ADMIN_BOOKING_EXPIRED`

**Templates listening to this event:**

- `booking_expired_customer` — Booking Expired (Customer)
- `admin_booking_expired` — Admin: Booking Expired (Admin)

**Variables available** (34 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (16)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{expiry_policy_note}}</code></td><td>Message shown when a booking auto-expires for non-payment.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `payment.received` — Payment Received

**When it fires.** A payment (full, deposit, or partial) is captured. Fired from every gateway (Stripe, PayPal, Razorpay, Paystack, Mollie, COD) via `yatra_payment_completed`. Sends both customer receipt and admin notification.

**Dispatcher.** `NotificationService::sendPaymentReceived()` → `TYPE_PAYMENT_CONFIRMATION` / `TYPE_ADMIN_PAYMENT_RECEIVED`

**Templates listening to this event:**

- `booking_payment` — Legacy: Payment Received (Customer)
- `admin_payment_received` — Admin: Payment Received (Admin)
- `payment_received` — Payment Received (customer) (Customer)

**Variables available** (36 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (10)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_amount_formatted}}</code></td><td>Amount of the specific payment with currency.</td></tr>
<tr><td><code>{{payment_method}}</code></td><td>Instrument label (e.g. Card, Bank Transfer).</td></tr>
<tr><td><code>{{transaction_id}}</code></td><td>Gateway transaction reference for the payment.</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `payment.reminder` — Payment Reminder

**When it fires.** A balance is outstanding past its due date. Currently no built-in cron dispatcher — operators trigger sends from the booking detail page, or wire one via the `yatra_send_transactional_email` filter. Tag list reflects what `variablesFromBooking()` + payment context provide when fired.

**Dispatcher.** Operator-triggered or custom cron → `TYPE_PAYMENT_REMINDER`

**Templates listening to this event:**

- `payment_reminder` — Payment Reminder (Customer)

**Variables available** (36 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (10)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_amount_formatted}}</code></td><td>Amount of the specific payment with currency.</td></tr>
<tr><td><code>{{payment_method}}</code></td><td>Instrument label (e.g. Card, Bank Transfer).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
<tr><td><code>{{due_date}}</code></td><td>Payment due date for reminders.</td></tr>
</tbody></table>

</details>

---

### `reminder.trip` — Trip Reminder

**When it fires.** The trip-reminder cron fires `reminder_days` before travel date (default 3 days, configurable in Settings → Bookings). Sends a "your trip is coming up" email with packing-list / weather extras.

**Dispatcher.** `BookingCronService::sendReminders()` → `TYPE_BOOKING_REMINDER`

**Templates listening to this event:**

- `trip_reminder` — Trip Reminder (Customer)

**Variables available** (36 across 5 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

<details><summary><strong>Reminder & review</strong> (3)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{days_until_trip}}</code></td><td>Days remaining until departure.</td></tr>
<tr><td><code>{{reminder_days}}</code></td><td>Configured number of days before the trip when the reminder fires.</td></tr>
<tr><td><code>{{reminder_extra_html}}</code></td><td>Optional extra block appended to reminder emails (packing list, etc.).</td></tr>
</tbody></table>

</details>

---

### `marketing.review_request` — Review Request

**When it fires.** After a booking is marked `completed`, the `ReviewReminderService` schedules an email some configurable number of days later inviting the customer to leave a review.

**Dispatcher.** `ReviewReminderService::sendReminder()` → `TYPE_REVIEW_REQUEST`

**Templates listening to this event:**

- `review_request` — Review Request (Customer)

**Variables available** (35 across 5 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (16)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{completion_date}}</code></td><td>Date the trip / booking was marked completed.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

<details><summary><strong>Reminder & review</strong> (1)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{review_url}}</code></td><td>Public link the customer opens to leave a review.</td></tr>
</tbody></table>

</details>

---

### `enquiry.created` — Enquiry Received

**When it fires.** A visitor submits the enquiry form on a trip page (`POST /yatra/v1/enquiries`). Sends a confirmation to the visitor AND a notification to the configured admin address.

**Dispatcher.** `EnquiryService::createEnquiry()` → `TYPE_ENQUIRY_CUSTOMER_RECEIVED` + `TYPE_ENQUIRY_ADMIN`

**Templates listening to this event:**

- `enquiry_received` — Enquiry Received (Customer)
- `enquiry_admin` — Admin: New Enquiry (Admin)

**Variables available** (16 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (3)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (2)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Enquiry</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{enquiry_id}}</code></td><td>Internal numeric enquiry identifier.</td></tr>
<tr><td><code>{{enquiry_date}}</code></td><td>When the enquiry was submitted.</td></tr>
<tr><td><code>{{subject}}</code></td><td>Subject line the customer provided.</td></tr>
<tr><td><code>{{message}}</code></td><td>Customer message body (sanitised, line breaks preserved).</td></tr>
<tr><td><code>{{original_message}}</code></td><td>First message in the enquiry thread (no line-break escaping).</td></tr>
</tbody></table>

</details>

---

### `enquiry.responded` — Enquiry Response

**When it fires.** An operator types a reply in the admin enquiry detail panel and clicks Send. The response is recorded on the thread and emailed back to the customer.

**Dispatcher.** `EnquiryService::respondToEnquiry()` → `TYPE_ENQUIRY_CUSTOMER_RESPONSE`

**Templates listening to this event:**

- `enquiry_response` — Enquiry Response (Customer)

**Variables available** (19 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (3)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (2)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Enquiry</strong> (8)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{enquiry_id}}</code></td><td>Internal numeric enquiry identifier.</td></tr>
<tr><td><code>{{enquiry_date}}</code></td><td>When the enquiry was submitted.</td></tr>
<tr><td><code>{{subject}}</code></td><td>Subject line the customer provided.</td></tr>
<tr><td><code>{{message}}</code></td><td>Customer message body (sanitised, line breaks preserved).</td></tr>
<tr><td><code>{{original_message}}</code></td><td>First message in the enquiry thread (no line-break escaping).</td></tr>
<tr><td><code>{{response}}</code></td><td>Operator&#039;s typed reply (alias of response_message).</td></tr>
<tr><td><code>{{response_message}}</code></td><td>Operator&#039;s typed reply.</td></tr>
<tr><td><code>{{response_date}}</code></td><td>When the reply was sent.</td></tr>
</tbody></table>

</details>

---

### `consent.requested` — Trip Consent Requested

**When it fires.** An operator (or auto-trigger) sends a consent form to a booking traveler. Each traveler receives a unique signing URL.

**Dispatcher.** `TripConsentService::sendConsentRequest()` → `TYPE_TRIP_CONSENT_REQUEST`

**Templates listening to this event:**

- `trip_consent_request` — Trip Consent Request (Customer)

**Variables available** (14 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (3)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Trip consent</strong> (4)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{recipient_name}}</code></td><td>Traveler receiving the consent email.</td></tr>
<tr><td><code>{{form_name}}</code></td><td>Title of the consent form.</td></tr>
<tr><td><code>{{consent_link}}</code></td><td>URL to open and sign the form.</td></tr>
<tr><td><code>{{consent_test_notice_html}}</code></td><td>Shown only on admin test sends.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Account / verification</strong> (1)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{expiry_notice_html}}</code></td><td>Link-expiry messaging block (consent / verification emails).</td></tr>
</tbody></table>

</details>

---

### `account.email_verification` — Customer Email Verification

**When it fires.** A new customer registers OR requests a fresh verification link. The email contains a magic link that, when opened, flips the `yatra_email_verified` user meta to `1` and lets the customer complete checkout.

**Dispatcher.** `AuthController::sendVerificationEmail()` → `TYPE_CUSTOMER_EMAIL_VERIFICATION`

**Templates listening to this event:**

- `customer_email_verification` — Email Verification (Customer)

**Variables available** (13 across 3 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (3)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Account / verification</strong> (4)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{verification_link}}</code></td><td>Magic link the customer opens to verify their email.</td></tr>
<tr><td><code>{{intro_paragraph}}</code></td><td>Opening sentence (registration / resend variant).</td></tr>
<tr><td><code>{{footer_note}}</code></td><td>Disclaimer for unintended recipients.</td></tr>
<tr><td><code>{{expiry_notice_html}}</code></td><td>Link-expiry messaging block (consent / verification emails).</td></tr>
</tbody></table>

</details>

---

### `scheduled.payment.reminder` — Scheduled Payment Reminder

**When it fires.** The Scheduled Payments cron runs before each installment is charged, sending a heads-up email with the upcoming amount and date.

**Dispatcher.** `ScheduledPaymentService::sendUpcomingReminder()` → `TYPE_SCHEDULED_PAYMENT_REMINDER`

**Templates listening to this event:**

- `scheduled_payment_reminder` — Scheduled Payment Reminder (Customer)

**Variables available** (36 across 5 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

<details><summary><strong>Scheduled payment</strong> (3)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td></tr>
<tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td></tr>
<tr><td><code>{{payment_type_label}}</code></td><td>Humanised type (Deposit, Final, Installment 2 of 4 ...).</td></tr>
</tbody></table>

</details>

---

### `scheduled.payment.succeeded` — Scheduled Payment Succeeded

**When it fires.** A scheduled installment is successfully captured by the gateway. The email confirms the charge and shows the remaining balance.

**Dispatcher.** `ScheduledPaymentService::handleSuccess()` → `TYPE_SCHEDULED_PAYMENT_SUCCEEDED`

**Templates listening to this event:**

- `scheduled_payment_succeeded` — Scheduled Payment Received (Customer)

**Variables available** (37 across 5 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

<details><summary><strong>Scheduled payment</strong> (4)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td></tr>
<tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td></tr>
<tr><td><code>{{payment_type_label}}</code></td><td>Humanised type (Deposit, Final, Installment 2 of 4 ...).</td></tr>
<tr><td><code>{{balance_after_formatted}}</code></td><td>Balance remaining after this charge succeeds.</td></tr>
</tbody></table>

</details>

---

### `scheduled.payment.failed` — Scheduled Payment Failed

**When it fires.** A scheduled installment fails — card declined, insufficient funds, etc. Sends both a customer notice (with a "fix payment method" CTA) and an admin alert.

**Dispatcher.** `ScheduledPaymentService::handleFailure()` → `TYPE_SCHEDULED_PAYMENT_FAILED` + `TYPE_ADMIN_SCHEDULED_PAYMENT_FAILED`

**Templates listening to this event:**

- `scheduled_payment_failed` — Scheduled Payment Failed (Customer)
- `admin_scheduled_payment_failed` — Admin: Scheduled Payment Failed (Admin)

**Variables available** (39 across 5 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (5)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (15)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Payment</strong> (7)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

<details><summary><strong>Scheduled payment</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td></tr>
<tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td></tr>
<tr><td><code>{{payment_type_label}}</code></td><td>Humanised type (Deposit, Final, Installment 2 of 4 ...).</td></tr>
<tr><td><code>{{failure_reason}}</code></td><td>Provided by the gateway when a scheduled charge fails.</td></tr>
<tr><td><code>{{failure_intro_html}}</code></td><td>Intro block for the payment-failure email body.</td></tr>
<tr><td><code>{{failure_followup_html}}</code></td><td>Closing block prompting the customer to update payment.</td></tr>
</tbody></table>

</details>

---

### `booking.abandoned_recovery` — Abandoned Checkout Recovery

**When it fires.** A customer started checkout but didn't complete payment. The abandoned-recovery cron sends a sequence of reminders (1h, 1d, 3d by default) each containing a resume-checkout link.

**Dispatcher.** `AbandonedBookingService::sendRecoveryEmail()` → `TYPE_ABANDONED_BOOKING_RECOVERY_FIRST/SECOND/FINAL`

**Templates listening to this event:**

- `abandoned_booking_recovery_first` — Abandoned Recovery — 1h (Customer)
- `abandoned_booking_recovery_second` — Abandoned Recovery — 1d (Customer)
- `abandoned_booking_recovery_final` — Abandoned Recovery — 3d (Customer)

**Variables available** (13 across 4 groups):

<details><summary><strong>Universal</strong> (6)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Customer</strong> (2)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Booking</strong> (2)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
</tbody></table>

</details>

<details><summary><strong>Abandoned recovery</strong> (3)</summary>

<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>
<tr><td><code>{{recovery_link}}</code></td><td>Resume the abandoned checkout from the customer email.</td></tr>
<tr><td><code>{{recovery_reminder_label}}</code></td><td>Sequence-stage label (First, Second, Final).</td></tr>
<tr><td><code>{{recovery_intro_html}}</code></td><td>Lead paragraph specific to each recovery email.</td></tr>
</tbody></table>

</details>

---

<!-- AUTO-GENERATED:per-event-reference:END -->

---

## Per-template merge-tag reference

This section enumerates every template and the exact tags that resolve when it sends. Generated from the central registry — when a new tag is added there, this table is the canonical place to update.

<!-- AUTO-GENERATED:per-template-tags:START -->

### `booking_confirmation` — Booking Confirmation

- **Trigger event** — `booking.created`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (33 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `new_booking` — Legacy: New Booking

- **Trigger event** — `booking.created`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (33 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking_confirmed` — Legacy: Booking Confirmed

- **Trigger event** — `booking.confirmed`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (33 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking_cancelled` — Booking Cancelled

- **Trigger event** — `booking.cancelled`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (34 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{cancellation_reason}}</code></td><td>Reason recorded when the booking was cancelled.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking_completed` — Booking Completed

- **Trigger event** — `booking.completed`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (34 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{completion_date}}</code></td><td>Date the trip / booking was marked completed.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking_expired_customer` — Booking Expired

- **Trigger event** — `booking.expired`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (34 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{expiry_policy_note}}</code></td><td>Message shown when a booking auto-expires for non-payment.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `booking_payment` — Legacy: Payment Received

- **Trigger event** — `payment.received`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (36 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_amount_formatted}}</code></td><td>Amount of the specific payment with currency.</td></tr>
<tr><td><code>{{payment_method}}</code></td><td>Instrument label (e.g. Card, Bank Transfer).</td></tr>
<tr><td><code>{{transaction_id}}</code></td><td>Gateway transaction reference for the payment.</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `admin_new_booking` — Admin: New Booking

- **Trigger event** — `booking.created`
- **Audience** — Admin

<details><summary><strong>Available merge tags</strong> (33 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `admin_payment_received` — Admin: Payment Received

- **Trigger event** — `payment.received`
- **Audience** — Admin

<details><summary><strong>Available merge tags</strong> (36 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_amount_formatted}}</code></td><td>Amount of the specific payment with currency.</td></tr>
<tr><td><code>{{payment_method}}</code></td><td>Instrument label (e.g. Card, Bank Transfer).</td></tr>
<tr><td><code>{{transaction_id}}</code></td><td>Gateway transaction reference for the payment.</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `admin_booking_cancelled` — Admin: Booking Cancelled

- **Trigger event** — `booking.cancelled`
- **Audience** — Admin

<details><summary><strong>Available merge tags</strong> (34 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{cancellation_reason}}</code></td><td>Reason recorded when the booking was cancelled.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `admin_booking_expired` — Admin: Booking Expired

- **Trigger event** — `booking.expired`
- **Audience** — Admin

<details><summary><strong>Available merge tags</strong> (34 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{expiry_policy_note}}</code></td><td>Message shown when a booking auto-expires for non-payment.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `payment_received` — Payment Received (customer)

- **Trigger event** — `payment.received`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (36 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_amount_formatted}}</code></td><td>Amount of the specific payment with currency.</td></tr>
<tr><td><code>{{payment_method}}</code></td><td>Instrument label (e.g. Card, Bank Transfer).</td></tr>
<tr><td><code>{{transaction_id}}</code></td><td>Gateway transaction reference for the payment.</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

</details>

---

### `payment_reminder` — Payment Reminder

- **Trigger event** — `payment.reminder`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (36 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_amount_formatted}}</code></td><td>Amount of the specific payment with currency.</td></tr>
<tr><td><code>{{payment_method}}</code></td><td>Instrument label (e.g. Card, Bank Transfer).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
<tr><td><code>{{due_date}}</code></td><td>Payment due date for reminders.</td></tr>
</tbody></table>

</details>

---

### `scheduled_payment_reminder` — Scheduled Payment Reminder

- **Trigger event** — `scheduled.payment.reminder`
- **Audience** — Customer
- **Module gate** — Scheduled Payments (Pro)

<details><summary><strong>Available merge tags</strong> (36 tags across 5 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

**Scheduled payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td></tr>
<tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td></tr>
<tr><td><code>{{payment_type_label}}</code></td><td>Humanised type (Deposit, Final, Installment 2 of 4 ...).</td></tr>
</tbody></table>

</details>

---

### `scheduled_payment_succeeded` — Scheduled Payment Received

- **Trigger event** — `scheduled.payment.succeeded`
- **Audience** — Customer
- **Module gate** — Scheduled Payments (Pro)

<details><summary><strong>Available merge tags</strong> (37 tags across 5 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

**Scheduled payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td></tr>
<tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td></tr>
<tr><td><code>{{payment_type_label}}</code></td><td>Humanised type (Deposit, Final, Installment 2 of 4 ...).</td></tr>
<tr><td><code>{{balance_after_formatted}}</code></td><td>Balance remaining after this charge succeeds.</td></tr>
</tbody></table>

</details>

---

### `scheduled_payment_failed` — Scheduled Payment Failed

- **Trigger event** — `scheduled.payment.failed`
- **Audience** — Customer
- **Module gate** — Scheduled Payments (Pro)

<details><summary><strong>Available merge tags</strong> (39 tags across 5 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

**Scheduled payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td></tr>
<tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td></tr>
<tr><td><code>{{payment_type_label}}</code></td><td>Humanised type (Deposit, Final, Installment 2 of 4 ...).</td></tr>
<tr><td><code>{{failure_reason}}</code></td><td>Provided by the gateway when a scheduled charge fails.</td></tr>
<tr><td><code>{{failure_intro_html}}</code></td><td>Intro block for the payment-failure email body.</td></tr>
<tr><td><code>{{failure_followup_html}}</code></td><td>Closing block prompting the customer to update payment.</td></tr>
</tbody></table>

</details>

---

### `admin_scheduled_payment_failed` — Admin: Scheduled Payment Failed

- **Trigger event** — `scheduled.payment.failed`
- **Audience** — Admin
- **Module gate** — Scheduled Payments (Pro)

<details><summary><strong>Available merge tags</strong> (39 tags across 5 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

**Scheduled payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{scheduled_amount_formatted}}</code></td><td>Amount of the upcoming scheduled charge with currency.</td></tr>
<tr><td><code>{{scheduled_date_formatted}}</code></td><td>When the next scheduled charge will run.</td></tr>
<tr><td><code>{{payment_type_label}}</code></td><td>Humanised type (Deposit, Final, Installment 2 of 4 ...).</td></tr>
<tr><td><code>{{failure_reason}}</code></td><td>Provided by the gateway when a scheduled charge fails.</td></tr>
<tr><td><code>{{failure_intro_html}}</code></td><td>Intro block for the payment-failure email body.</td></tr>
<tr><td><code>{{failure_followup_html}}</code></td><td>Closing block prompting the customer to update payment.</td></tr>
</tbody></table>

</details>

---

### `trip_reminder` — Trip Reminder

- **Trigger event** — `reminder.trip`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (36 tags across 5 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

**Reminder & review**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{days_until_trip}}</code></td><td>Days remaining until departure.</td></tr>
<tr><td><code>{{reminder_days}}</code></td><td>Configured number of days before the trip when the reminder fires.</td></tr>
<tr><td><code>{{reminder_extra_html}}</code></td><td>Optional extra block appended to reminder emails (packing list, etc.).</td></tr>
</tbody></table>

</details>

---

### `review_request` — Review Request

- **Trigger event** — `marketing.review_request`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (35 tags across 5 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_last_name}}</code></td><td>Customer last name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{booking_id}}</code></td><td>Internal numeric booking identifier.</td></tr>
<tr><td><code>{{booking_url}}</code></td><td>Link to view the booking in My Account.</td></tr>
<tr><td><code>{{booking_status}}</code></td><td>pending / confirmed / cancelled / completed.</td></tr>
<tr><td><code>{{payment_status}}</code></td><td>unpaid / partial / paid / refunded.</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
<tr><td><code>{{travelers_count}}</code></td><td>Number of travelers on the booking.</td></tr>
<tr><td><code>{{travelers_list}}</code></td><td>Plain-text list of traveler names.</td></tr>
<tr><td><code>{{travelers_list_html}}</code></td><td>HTML-formatted list of traveler names.</td></tr>
<tr><td><code>{{traveler_custom_fields_html}}</code></td><td>Dynamic Form Field answers per traveler, rendered as HTML.</td></tr>
<tr><td><code>{{booking_custom_fields_html}}</code></td><td>Booking-level Dynamic Form Field answers as HTML.</td></tr>
<tr><td><code>{{special_requests}}</code></td><td>Customer-entered special requests text.</td></tr>
<tr><td><code>{{special_requests_html}}</code></td><td>Special requests with line breaks preserved.</td></tr>
<tr><td><code>{{completion_date}}</code></td><td>Date the trip / booking was marked completed.</td></tr>
</tbody></table>

**Payment**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{total_amount_formatted}}</code></td><td>Total cost with currency symbol — preferred over total_amount.</td></tr>
<tr><td><code>{{amount_due_formatted}}</code></td><td>Remaining balance with currency symbol.</td></tr>
<tr><td><code>{{currency}}</code></td><td>ISO 4217 currency code (e.g. USD).</td></tr>
<tr><td><code>{{payment_gateway}}</code></td><td>Internal gateway slug — stripe / paypal / razorpay etc.</td></tr>
<tr><td><code>{{payment_gateway_label}}</code></td><td>Human-readable gateway name — Stripe, PayPal etc.</td></tr>
<tr><td><code>{{payment_schedule}}</code></td><td>full / deposit / partial — raw value.</td></tr>
<tr><td><code>{{payment_schedule_label}}</code></td><td>Humanised schedule (e.g. Deposit, Full Payment).</td></tr>
</tbody></table>

**Reminder & review**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{review_url}}</code></td><td>Public link the customer opens to leave a review.</td></tr>
</tbody></table>

</details>

---

### `enquiry_received` — Enquiry Received

- **Trigger event** — `enquiry.created`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (16 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
</tbody></table>

**Enquiry**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{enquiry_id}}</code></td><td>Internal numeric enquiry identifier.</td></tr>
<tr><td><code>{{enquiry_date}}</code></td><td>When the enquiry was submitted.</td></tr>
<tr><td><code>{{subject}}</code></td><td>Subject line the customer provided.</td></tr>
<tr><td><code>{{message}}</code></td><td>Customer message body (sanitised, line breaks preserved).</td></tr>
<tr><td><code>{{original_message}}</code></td><td>First message in the enquiry thread (no line-break escaping).</td></tr>
</tbody></table>

</details>

---

### `enquiry_admin` — Admin: New Enquiry

- **Trigger event** — `enquiry.created`
- **Audience** — Admin

<details><summary><strong>Available merge tags</strong> (16 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
</tbody></table>

**Enquiry**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{enquiry_id}}</code></td><td>Internal numeric enquiry identifier.</td></tr>
<tr><td><code>{{enquiry_date}}</code></td><td>When the enquiry was submitted.</td></tr>
<tr><td><code>{{subject}}</code></td><td>Subject line the customer provided.</td></tr>
<tr><td><code>{{message}}</code></td><td>Customer message body (sanitised, line breaks preserved).</td></tr>
<tr><td><code>{{original_message}}</code></td><td>First message in the enquiry thread (no line-break escaping).</td></tr>
</tbody></table>

</details>

---

### `enquiry_response` — Enquiry Response

- **Trigger event** — `enquiry.responded`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (19 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
<tr><td><code>{{customer_phone}}</code></td><td>Customer phone number.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{trip_url}}</code></td><td>Public link to the trip detail page.</td></tr>
</tbody></table>

**Enquiry**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{enquiry_id}}</code></td><td>Internal numeric enquiry identifier.</td></tr>
<tr><td><code>{{enquiry_date}}</code></td><td>When the enquiry was submitted.</td></tr>
<tr><td><code>{{subject}}</code></td><td>Subject line the customer provided.</td></tr>
<tr><td><code>{{message}}</code></td><td>Customer message body (sanitised, line breaks preserved).</td></tr>
<tr><td><code>{{original_message}}</code></td><td>First message in the enquiry thread (no line-break escaping).</td></tr>
<tr><td><code>{{response}}</code></td><td>Operator&#039;s typed reply (alias of response_message).</td></tr>
<tr><td><code>{{response_message}}</code></td><td>Operator&#039;s typed reply.</td></tr>
<tr><td><code>{{response_date}}</code></td><td>When the reply was sent.</td></tr>
</tbody></table>

</details>

---

### `customer_email_verification` — Email Verification

- **Trigger event** — `account.email_verification`
- **Audience** — Customer

<details><summary><strong>Available merge tags</strong> (13 tags across 3 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_first_name}}</code></td><td>Customer first name only.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
</tbody></table>

**Account / verification**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{verification_link}}</code></td><td>Magic link the customer opens to verify their email.</td></tr>
<tr><td><code>{{intro_paragraph}}</code></td><td>Opening sentence (registration / resend variant).</td></tr>
<tr><td><code>{{footer_note}}</code></td><td>Disclaimer for unintended recipients.</td></tr>
<tr><td><code>{{expiry_notice_html}}</code></td><td>Link-expiry messaging block (consent / verification emails).</td></tr>
</tbody></table>

</details>

---

### `trip_consent_request` — Trip Consent Request

- **Trigger event** — `consent.requested`
- **Audience** — Customer
- **Module gate** — Trip Consent (Pro)

<details><summary><strong>Available merge tags</strong> (14 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
<tr><td><code>{{travel_date}}</code></td><td>Departure date formatted per site settings.</td></tr>
</tbody></table>

**Trip consent**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{recipient_name}}</code></td><td>Traveler receiving the consent email.</td></tr>
<tr><td><code>{{form_name}}</code></td><td>Title of the consent form.</td></tr>
<tr><td><code>{{consent_link}}</code></td><td>URL to open and sign the form.</td></tr>
<tr><td><code>{{consent_test_notice_html}}</code></td><td>Shown only on admin test sends.</td></tr>
</tbody></table>

**Account / verification**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{expiry_notice_html}}</code></td><td>Link-expiry messaging block (consent / verification emails).</td></tr>
</tbody></table>

</details>

---

### `abandoned_booking_recovery_first` — Abandoned Recovery — 1h

- **Trigger event** — `booking.abandoned_recovery`
- **Audience** — Customer
- **Module gate** — Abandoned Booking Recovery (Pro)

<details><summary><strong>Available merge tags</strong> (13 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
</tbody></table>

**Abandoned recovery**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{recovery_link}}</code></td><td>Resume the abandoned checkout from the customer email.</td></tr>
<tr><td><code>{{recovery_reminder_label}}</code></td><td>Sequence-stage label (First, Second, Final).</td></tr>
<tr><td><code>{{recovery_intro_html}}</code></td><td>Lead paragraph specific to each recovery email.</td></tr>
</tbody></table>

</details>

---

### `abandoned_booking_recovery_second` — Abandoned Recovery — 1d

- **Trigger event** — `booking.abandoned_recovery`
- **Audience** — Customer
- **Module gate** — Abandoned Booking Recovery (Pro)

<details><summary><strong>Available merge tags</strong> (13 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
</tbody></table>

**Abandoned recovery**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{recovery_link}}</code></td><td>Resume the abandoned checkout from the customer email.</td></tr>
<tr><td><code>{{recovery_reminder_label}}</code></td><td>Sequence-stage label (First, Second, Final).</td></tr>
<tr><td><code>{{recovery_intro_html}}</code></td><td>Lead paragraph specific to each recovery email.</td></tr>
</tbody></table>

</details>

---

### `abandoned_booking_recovery_final` — Abandoned Recovery — 3d

- **Trigger event** — `booking.abandoned_recovery`
- **Audience** — Customer
- **Module gate** — Abandoned Booking Recovery (Pro)

<details><summary><strong>Available merge tags</strong> (13 tags across 4 groups)</summary>

**Universal**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{site_name}}</code></td><td>Your website name (from WordPress Site Title).</td></tr>
<tr><td><code>{{site_url}}</code></td><td>Your website home URL.</td></tr>
<tr><td><code>{{admin_email}}</code></td><td>Site administrator email address.</td></tr>
<tr><td><code>{{admin_url}}</code></td><td>Link to the Yatra admin dashboard.</td></tr>
<tr><td><code>{{current_date}}</code></td><td>Today&#039;s date formatted per the site&#039;s date format.</td></tr>
<tr><td><code>{{current_year}}</code></td><td>Current four-digit year.</td></tr>
</tbody></table>

**Customer**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{customer_name}}</code></td><td>Full name (first + last) of the customer / enquirer.</td></tr>
<tr><td><code>{{customer_email}}</code></td><td>Customer email address.</td></tr>
</tbody></table>

**Booking**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{booking_reference}}</code></td><td>Customer-visible booking code (e.g. YTR-12345).</td></tr>
<tr><td><code>{{trip_name}}</code></td><td>Title of the trip the booking / enquiry is for.</td></tr>
</tbody></table>

**Abandoned recovery**

<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>
<tr><td><code>{{recovery_link}}</code></td><td>Resume the abandoned checkout from the customer email.</td></tr>
<tr><td><code>{{recovery_reminder_label}}</code></td><td>Sequence-stage label (First, Second, Final).</td></tr>
<tr><td><code>{{recovery_intro_html}}</code></td><td>Lead paragraph specific to each recovery email.</td></tr>
</tbody></table>

</details>

---

<!-- AUTO-GENERATED:per-template-tags:END -->

---

## Sequences <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Email Automation — multi-step sequences</span>
  </div>
  <p class="pro-callout__desc">Trigger a sequence on booking confirmed → wait 7 days → send "tips for your upcoming trip" → wait until 1 day before travel → send "weather + packing list" → wait until day after travel → send "leave a review" — all without a separate marketing tool.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock sequences →</a>
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
