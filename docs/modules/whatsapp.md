---
title: WhatsApp Notifications
description: Step-by-step setup for the Yatra Pro WhatsApp Notifications module — send booking confirmations, payment receipts, departure reminders, and review requests via the WhatsApp Cloud API. Bring your own Meta credentials, no per-message markup.
prev:
  text: AI Assistant
  link: /modules/ai-assistant
next:
  text: Channel Manager
  link: /modules/channel-manager
---

# WhatsApp Notifications <span class="pro-pill">PRO</span>

![Yatra → WhatsApp — Delivery / Templates / Widget / Logs tabs unlocked by this module](/screenshots/modules/whatsapp-delivery.webp)

WhatsApp drives 90%+ open rates and a fraction of the spam complaints email gets — for tour operators that means customers actually **see** their booking confirmation, payment reminder, and "your trip starts tomorrow" message. The **WhatsApp Notifications** module sends transactional messages via Meta's official **WhatsApp Business Cloud API**, routes inbound replies into the Enquiries inbox, and ships a public click-to-WhatsApp widget for your site.

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Growth** or **Agency** tier | <span class="screen-path">Yatra → License</span> |
| WhatsApp Notifications module enabled | <span class="screen-path">Yatra → Modules → WhatsApp</span> |
| Meta for Developers account | [developers.facebook.com](https://developers.facebook.com/) (free, requires a Facebook account) |
| Meta Business Manager account | [business.facebook.com](https://business.facebook.com/) — owns your WhatsApp Business Account (WABA) |
| Verified phone number | A real phone that isn't already on WhatsApp consumer / Business app |
| Permanent access token | Generated in Business Settings → System Users |
| Webhook verify secret | Your app's App Secret (Settings → Basic) |

> **Meta bills you directly per conversation.** Yatra never proxies messages. As of 2026, Meta charges $0.005–$0.05 per conversation depending on category + country — usually a fraction of SMS cost.

## What it unlocks

| Surface | What it does |
| --- | --- |
| **Delivery tab** | Cloud API credentials + business identifiers + sender display name + admin notification phone. |
| **Templates tab** | All your message templates (bundled system templates + custom). Inline editor + test-send button per template. |
| **Widget tab** | Floating "Chat on WhatsApp" button + single-trip CTA + the `[yatra_whatsapp_button]` shortcode. |
| **Logs tab** | Per-message delivery log — who, when, template, Meta's response, conversation cost. |
| **Inbound replies** | Customer replies route into <span class="screen-path">Yatra → Enquiries</span> alongside web enquiries. |
| **Event-driven sends** | Bookings, payments, departures, reviews — each Yatra event maps to a template. |

## Step 1 — Get WhatsApp Cloud API access

1. Sign in to [Meta for Developers](https://developers.facebook.com/) and **Create app** → choose **Business**.
2. Add the **WhatsApp** product to the app.
3. The setup screen gives you:
    - A **temporary access token** (24h validity — fine for testing, not for production).
    - A **test phone number** Meta provisions for free.
    - Your **Phone Number ID** and **WhatsApp Business Account (WABA) ID**.
4. In <span class="screen-path">Business Manager → Settings → Users → System Users</span>, create a System User → assign your WABA → **Generate token** with `whatsapp_business_messaging` + `whatsapp_business_management` scopes → **never expires**. This is the production token.

Full Meta walkthrough: [Cloud API: Get started](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).

## Step 2 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **WhatsApp Notifications** → toggle on.
3. A new menu entry **WhatsApp** appears in the sidebar.

## Step 3 — Save credentials

Open <span class="screen-path">Yatra → WhatsApp → Delivery</span>.

![Delivery tab — encrypted credentials with masked last-4 hints + business identifiers](/screenshots/modules/whatsapp-credentials.webp)

| Field | Notes |
| --- | --- |
| **Permanent access token** | The token from the System User above. Stored encrypted via libsodium AEAD (XChaCha20-Poly1305) — the browser only ever sees a masked last-4 hint after save. |
| **Webhook verify secret** | Your app's **App Secret** (Settings → Basic → App Secret). Optional — only required when you want to receive inbound replies. |
| **Phone Number ID** | Numeric ID from the WhatsApp → API Setup screen in Meta for Developers. |
| **Business Account ID (WABA ID)** | Numeric ID for your WhatsApp Business Account. |
| **Sender display name** | Friendly name shown to recipients above messages. |
| **Default country code** | Used to canonicalise phone numbers stored without `+CC` prefix (e.g. `+1` for US). |
| **Admin notification phone** | Where operator-recipient templates (new booking, payment received) get delivered. |

Click **Test connection** to verify the token works against the `/v17.0/{phone_number_id}` endpoint.

## Step 4 — Configure the webhook (optional)

Inbound replies route into the Enquiries inbox so you can carry the conversation through your normal CRM. To enable:

1. Copy the webhook URL displayed under <span class="screen-path">Yatra → WhatsApp → Delivery → Webhook URL</span>.
2. In <span class="screen-path">Meta for Developers → your app → WhatsApp → Configuration</span>, paste the URL and set the verify token to the **Webhook verify secret** you saved in Step 3.
3. Subscribe to the `messages` field.
4. Send yourself a test message from a personal WhatsApp → it should appear in <span class="screen-path">Yatra → Enquiries</span> within ~3 seconds.

Without a webhook, you can still **send** transactional messages — you just won't receive replies back into Yatra.

## Step 5 — Review and edit templates

Open <span class="screen-path">Yatra → WhatsApp → Templates</span>.

![Templates tab — system templates (lock icon) + custom templates with inline edit](/screenshots/modules/whatsapp-templates.webp)

The module ships with **system templates** — pre-baked for the common Yatra events. You can edit the message body / disable / re-enable them, but identity fields (event_key, recipient_type, template_key) are locked because Meta approves templates by content and changing the key would orphan the approval.

::: warning Templates need Meta's approval before they send
Every message template (the wording customers actually receive) must be approved by Meta before WhatsApp will deliver it. Approval is usually **fast (a few minutes to a couple of hours) for clearly transactional content** like booking confirmations and reminders. **Marketing-flavoured templates can take up to 24 hours and have a higher rejection rate** — Meta is strict about anything that reads like a promotion.

If a template gets rejected, Meta returns a short reason (e.g. "promotional content in utility category"). Common fixes:
- Re-categorise as *Marketing* if the message promotes anything.
- Remove emoji that suggest urgency or sales (🔥, 💸, ⏰).
- Plain-language the variables — `{{1}}` is fine but the surrounding text must read naturally without placeholders.

Submit corrected templates the same way you submitted the first one — they go to the back of the queue, not a priority lane.
:::

### Bundled system templates

| template_key | Event | Recipient |
| --- | --- | --- |
| `booking_confirmed` | `booking.created` | Customer |
| `payment_received` | `payment.received` | Customer |
| `payment_reminder` | `payment.reminder` | Customer |
| `departure_reminder_t_minus_1` | T-1 day departure cron | Customer |
| `booking_cancelled_customer` | `booking.cancelled` | Customer |
| `review_request` | T+1 day after trip end | Customer |
| `admin_new_booking` | `booking.created` | Admin |
| `admin_payment_received` | `payment.received` | Admin |

### Field reference

| Field | Notes |
| --- | --- |
| **Name** | Internal label shown only in the admin. |
| **Event key** | One of the trigger events above (system rows: locked). |
| **Recipient type** | `customer` or `admin` (system rows: locked). |
| **Meta template name** | Must match the template name approved by Meta in WhatsApp Manager. Yatra calls Meta's `/messages` endpoint with this name. |
| **Language code** | BCP-47 language tag matching the approved Meta template. Default: `en_US`. |
| **Body** | The message body with merge tags. See merge-tag list below. |
| **Status** | Active / Paused. Paused templates skip without erroring. |

### Merge tags

All Yatra merge tags from the email system are honored — full list under [Email & notifications → merge tags](/email-settings#merge-tags). Most-used in WhatsApp templates:

```
{{customer_name}}        {{trip_name}}           {{booking_id}}
{{departure_date}}        {{travelers_count}}     {{booking_total}}
{{amount_paid}}           {{amount_due}}          {{payment_link}}
{{customer_email}}        {{customer_phone}}      {{currency_symbol}}
```

### Test send

Each template has a **Test send** button → enter a phone number → Yatra sends the template populated with realistic synthetic merge-tag data. Useful for proofreading + verifying Meta's approval covers your body content.

### Version history (undo a bad edit)

Every save of a template is recorded as a snapshot. Click the **History** button next to Edit on any template row to see the full timeline newest-first.

Each row shows:

- The version number (v1, v2, v3, …) and when it was saved.
- A short summary of what changed (e.g. "edited: body, is_active").
- The user ID of whoever made the edit (or empty for system-triggered changes like the defaults seed).
- Click the row to expand it — you'll see the snapshot's name, event, recipient, active flag, and body so you can compare against the current template.

The **Restore this version** button rewrites the live template with the snapshot's contents. Before the restore happens, the current state is captured as a new version, so the chain stays linear — you can always restore back to where you were 30 seconds ago.

System templates have a restriction: only the Active toggle restores from history. Body, event binding, and recipient type are managed by the plugin (so a future plugin update can refresh them) and can't be reverted from this UI. Custom templates restore every field.

There's no auto-prune on history rows — templates with a long edit history keep every snapshot. Template edits are infrequent (a handful per template per month at most) so the row count stays small.

## Step 6 — Public WhatsApp widget (optional)

Open <span class="screen-path">Yatra → WhatsApp → Widget</span>.

| Field | Notes |
| --- | --- |
| **Enabled** | Master toggle. When off the widget doesn't render anywhere. |
| **Contact phone** | The number customers tap-to-message. Include country code (`+`). |
| **Default message** | Pre-filled message body that opens in the user's WhatsApp app. Supports the trip merge tags on single-trip pages. |
| **Floating button** | Toggle the bottom-right floating button + position (left/right) + colour. |
| **Single-trip CTA** | Toggle a "Chat on WhatsApp" button on every trip's sticky sidebar. |
| **Shortcode** | `[yatra_whatsapp_button]` for use anywhere on your site (page builders, sidebar widgets, etc.). |

## Customer opt-in

Meta requires that customers **opt in** before they receive non-template messages from your business. The module surfaces an opt-in flag on every customer record + a `Required` toggle on the Widget tab. When the toggle is on:

- Booking forms add a "Yes, send me WhatsApp updates" checkbox (default off).
- The checkbox value is recorded against the customer's `opt_in` flag.
- Sends to non-opted-in customers are skipped + logged.

Opt-in state is stored in a dedicated `wp_yatra_whatsapp_opt_in` table with a unique index on the phone number, so lookups are O(1) even at scale. STOP / UNSUBSCRIBE keywords in inbound replies flip the row to opted-out; subsequent inbound replies flip it back to opted-in (which is the implicit consent for the next 24-hour conversation window).

## Step 7 — Verify it works

After a real booking:

1. Open <span class="screen-path">Yatra → WhatsApp → Logs</span>.
2. The latest row should show `booking.created` → `template: booking_confirmed` → `status: sent` → Meta `message_id` in the response column.
3. Click the row for the full payload: rendered body, headers, Meta's response, opt-in state at send time, retry attempts.

## Reminders cron

A twice-daily WP cron tick handles every time-based send (anything that's not action-triggered):

- **Trip reminders** — sent N hours before departure (default 24h, configurable per template).
- **Review requests** — sent N hours after departure for completed bookings.
- **Payment reminders** — when an outstanding balance is due soon (Flexible Payments / Scheduled Payments integration).
- **Abandoned-checkout recovery** — when a booking sat unfinished past a configurable threshold.

Each tick is split into background-job chunks of 10 bookings each, with 500 ms between sends inside a chunk and 6 seconds between chunks. This keeps you well under Meta's 1,000-messages-per-second tier limit and means the twice-daily tick itself stays fast even when 200 bookings are due for a reminder (it just schedules 20 background events).

Idempotency: each dispatch query joins against the message log filtered by template + booking ID. A booking never receives the same template twice even if the cron runs twice or a worker crashes mid-batch.

Cron lifecycle is owned by the module — disable WhatsApp Notifications and the cron is unscheduled automatically, no orphan events.

## Message log retention

The `wp_yatra_whatsapp_messages` log keeps every outbound + inbound message for forensic review. A daily retention cron deletes rows older than the configured cut-off — **90 days by default**, capped at 730 days (~2 years).

Operators with longer compliance retention needs can extend the window:

```php
add_filter('yatra_whatsapp_retention_days', fn() => 365);  // 1 year
```

The sweep is hardened against exceptions — a cron failure here writes to the WordPress `error_log` but never cascades. The log itself isn't load-bearing for sends; it's forensic.

After each successful sweep, the `yatra_whatsapp_retention_swept` action fires with the row count + the retention window, useful for hooking into compliance dashboards.

## REST API

| Endpoint | Verb | Purpose |
| --- | --- | --- |
| `/yatra/v1/whatsapp/meta` | GET | Module eligibility + bundled events + capabilities. |
| `/yatra/v1/whatsapp/settings` | GET / PUT | Read or update delivery + widget settings. |
| `/yatra/v1/whatsapp/credentials` | PUT | Set or clear a single credential field (`access_token`, `webhook_secret`). |
| `/yatra/v1/whatsapp/templates` | GET / POST | List templates / create a new custom template. |
| `/yatra/v1/whatsapp/templates/{id}` | GET / PUT / DELETE | Read / update / delete one template. |
| `/yatra/v1/whatsapp/templates/{id}/test-send` | POST | Send the template populated with synthetic data. |
| `/yatra/v1/whatsapp/templates/restore-defaults` | POST | Re-insert any deleted system templates. |
| `/yatra/v1/whatsapp/templates/{id}/versions` | GET | List the template's version snapshots, newest first. |
| `/yatra/v1/whatsapp/templates/{id}/versions/{versionId}/restore` | POST | Restore the template from a snapshot. Captures the current state first so the restore itself can be undone. |

All write endpoints require `manage_options` + Growth/Agency-active license. See [REST API reference](/api-reference#whatsapp) for the full schema.

## Hooks & filters

| Hook | Purpose |
| --- | --- |
| `yatra_whatsapp_should_send` (filter) | Last gate before the API call. Return `false` to skip the send. Useful for per-customer opt-out logic. |
| `yatra_whatsapp_template_body` (filter) | Edit the rendered body after merge-tag substitution but before the API call. |
| `yatra_whatsapp_provider` (filter) | Swap the WhatsApp transport — defaults to Meta Cloud API, but you can route through Twilio or 360Dialog by registering a custom provider. |
| `yatra_whatsapp_message_sent` (action) | Fires on each successful send with the Meta `message_id` + cost data. |
| `yatra_whatsapp_message_failed` (action) | Fires on API error — useful for alerting / fallback to SMS. |
| `yatra_whatsapp_inbound_message` (action) | Fires when a webhook delivers an inbound reply, before it's routed to Enquiries. |
| `yatra_whatsapp_retention_days` (filter) | Override the 90-day default for message-log retention. Capped at 730 days. |
| `yatra_whatsapp_retention_swept` (action) | Fires after each successful retention sweep with the row count + the window in days. |

## Troubleshooting

**"WhatsApp" doesn't appear in the sidebar** — verify (1) your license is Growth or Agency on the License page, (2) the module is toggled on under Modules.

**Test connection returns `401 OAuthException`** — token expired (you're using the temporary 24h token) or revoked. Generate a **permanent** System User token with the right scopes — see Step 1.

**Test connection returns `100 Invalid parameter`** — Phone Number ID is wrong. Open <span class="screen-path">Meta for Developers → WhatsApp → API Setup</span> and copy the numeric ID under your test number (not the WABA ID).

**Sends queue but never arrive** — Meta requires templates to be **approved** before they can be sent to phones outside your test allowlist. Open <span class="screen-path">WhatsApp Manager → Account tools → Message templates</span> and submit each template. Approval typically takes minutes for simple body-only templates and 24h for media templates.

**Customer receives "Hi `{{customer_name}}`" with the literal merge tag** — the *Meta template name* under Yatra and the approved Meta template don't share parameter shapes. Meta-approved templates use positional placeholders (`{{1}}`, `{{2}}`); the module maps merge tags onto those positions. Re-submit your template body without literal merge-tag names.

**Inbound replies don't appear in Enquiries** — webhook setup incomplete. Re-check Step 4 + look at <span class="screen-path">Yatra → WhatsApp → Logs</span> filtered by `inbound` direction. Common failure: webhook URL points at HTTP instead of HTTPS; Meta requires TLS.

**Conversation cost higher than expected** — Meta bills *per 24-hour conversation*, not per message. A back-and-forth thread in the same day is one conversation; the next day's reply starts a new one. Use <span class="screen-path">Yatra → WhatsApp → Logs</span> to see the conversation cost Meta charged on each send.

## Useful links

- [Email & notifications](/email-settings) — the merge-tag catalog WhatsApp templates share with email.
- [Settings → Advanced → Debug mode](/settings#_13-advanced) — captures Meta request/response pairs.
- [Hooks & filters](/hooks-filters#whatsapp) — full filter signatures.
- [REST API](/api-reference#whatsapp) — endpoint schemas.
- [Meta WhatsApp Cloud API docs](https://developers.facebook.com/docs/whatsapp/cloud-api) — provider reference.

## Where to read more

- [All modules](/modules#whatsapp-notifications) — module catalog.
- [AI Assistant](/modules/ai-assistant) — the other Growth-tier module that ships with the same license.
- [Channel Manager](/modules/channel-manager) — Agency-only OTA distribution hub.
