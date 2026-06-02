---
title: Webhooks
description: Step-by-step setup for the Yatra Pro Webhooks module — push every Yatra event to your CRM, Zapier, Make, Slack, or any HTTPS receiver. HMAC-signed payloads, real-time event capture for field selection, automatic retry with exponential backoff, full delivery log with replay.
prev:
  text: Channel Manager
  link: /modules/channel-manager
next:
  text: White Label
  link: /modules/white-label
---

# Webhooks <span class="pro-pill">PRO</span>

> **Scale tier.** Enterprise-grade outbound webhooks for tour operators wiring Yatra into a custom tech stack — sync bookings to a CRM, post revenue events to accounting, trigger Zapier workflows, ping Slack on VIP bookings.

If you've ever wished Yatra could *tell* your other tools when something happens — a booking gets paid, an enquiry comes in, a trip gets cancelled — that's what webhooks are for. Yatra fires a signed HTTPS POST to whatever URL you configure, the receiving system reads the JSON, does something useful with it. Stripe-style. GitHub-style. Same shape, same security guarantees.

This module is **Scale-only** because it's how agencies integrate Yatra into bigger systems. The Personal and Growth tiers don't need it — Email Automation, WhatsApp, and the built-in modules cover most operators.

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Scale** tier (Yearly or Lifetime) | <span class="screen-path">Yatra → License</span> |
| Webhooks module enabled | <span class="screen-path">Yatra → Modules → Webhooks</span> |
| A receiver URL — Zapier catch-hook, Make scenario, n8n workflow, custom endpoint, anything that speaks HTTPS | The receiving system gives you this URL |
| HTTPS — receivers without TLS are rejected (except on local dev with `WP_DEBUG`) | Your receiver must serve a valid TLS cert |

> **No proxying. No vendor markup.** Yatra POSTs directly from your WordPress to your receiver. We don't see the payloads, don't sit in the middle, don't bill per call.

## What it unlocks

| Surface | What it does |
| --- | --- |
| **Endpoints tab** | One row per receiver. Each endpoint is bound to exactly one Yatra event (booking.created, payment.received, enquiry.created, etc.). Encrypted per-endpoint signing secret, custom HTTP headers, additional payload fields, field selection. |
| **Listen for sample** | Pabbly-style "capture a real event firing" flow. Arm the listener, perform the action in Yatra (create a booking, etc.), and the form shows you the actual JSON payload your receiver will get. No skeleton data, no guesswork. |
| **Field selector** | Pick exactly which fields to forward — perfect for stripping PII or fields a downstream system bills you per. Original key nesting preserved (`customer.email` stays nested, never flattened). |
| **Output preview** | Side-by-side tabs showing the raw captured payload vs the filtered output your receiver gets. Updates live as you tick / untick fields. |
| **Deliveries tab** | Every outbound POST attempt with status, response, attempts, duration. Click any row to inspect the full JSON. Paginated, filterable by endpoint / event / status. |
| **Buried tab** | Every delivery that exhausted its retries. Pre-aggregated breakdown by endpoint, event, and error pattern so you can see what's broken at a glance and bulk-replay once the downstream issue is fixed. Details below. |
| **Replay** | Re-queue any failed delivery from the inspector. Attempt counter preserved for audit. |
| **Bulk replay** | Replay many deliveries at once — either an explicit list of row IDs you tick in the Buried tab, or a filter ("everything that failed for endpoint X in the last 24h"). Caps at 200 IDs or 500 filtered rows per request. |
| **HTTP method selector** | Choose POST (default), PUT, PATCH, DELETE, or GET per endpoint. GET moves the payload to a query parameter — see "HTTP method" below. |
| **Client certificate (mTLS)** | Optional. Some receivers require Yatra to present a TLS client certificate during the handshake on top of the HMAC signature. Upload a PEM cert + key pair per endpoint and Yatra presents them on every delivery. |
| **Ping** | One-click synthetic `webhook.ping` event. Opens the inspector live so you see queued → delivering → delivered without leaving the tab. |
| **Receiver verification snippets** | Copy-paste PHP, Node.js, and Python code in the secret-reveal dialog. Includes timestamp replay protection + timing-safe compare out of the box. |

## How it works

Three things happen, in order, every time a Yatra event fires.

1. **Build the message.** Yatra wraps every event in the same standard shape — an `id`, the event `type`, an `api_version`, when it happened (`occurred_at`), and a `data` block containing the actual record (the booking, payment, trip, enquiry, or departure). The shape never changes from event to event, so whoever's receiving can write a single parser that handles all of them.
2. **Trim the data (optional).** If you've ticked specific fields in the endpoint's field selector, Yatra removes everything else from the `data` block before sending. The outer envelope (id/type/timestamp/version) is always kept — your receiver needs it to verify the message.
3. **Sign and send.** Yatra computes a security signature using your endpoint's secret key (a cryptographic technique called HMAC-SHA256 — your receiver re-computes the same signature with the same secret to confirm the message really came from you and wasn't tampered with). The signature ships in a `X-Yatra-Signature` header. The actual HTTP request runs *in the background* (queued, not blocking) so the original action that triggered the event — say, a customer paying for a booking — doesn't get slowed down waiting for your receiver to respond.

If your receiver replies with a 2xx status (success), the delivery is marked **delivered**.

If it replies with a 4xx error (except 429 "rate limited"), Yatra treats it as a permanent failure — your receiver explicitly rejected the message, retrying wouldn't help.

If it replies with 5xx (server error), 429 (rate-limited), or there's a network problem, Yatra retries automatically with growing waits between attempts: **first retry at 1 minute, then 5 minutes, then 30 minutes, then 1 hour, then a final 6-hour attempt**. If all 5 retries fail, the delivery is buried in the "Buried" tab where you can inspect and replay it later. After 10 consecutive permanent failures on the same endpoint, Yatra auto-disables it and emails the site admin so a broken receiver doesn't silently rot.

## Step-by-step: your first endpoint

### 1. Enable the module

Open <span class="screen-path">Yatra → Modules</span>, scroll to **Webhooks**, flip it on. A new <span class="screen-path">Yatra → Webhooks</span> entry appears in the sidebar.

If you don't see Webhooks in the module list, check your license tier — it's Scale-only. The module shows an upgrade card to non-Scale operators so you know it exists.

### 2. Add an endpoint

Click **Add endpoint** in the top-right of the Endpoints tab. The form has six cards, top to bottom.

#### Destination

| Field | What to put |
| --- | --- |
| **Name** | A human label — "Zapier — booking sync", "CRM ingest — sales team". Shows in the table and the delivery log. |
| **URL** | The full HTTPS URL of your receiver. Must start with `https://` in production. `http://` is only accepted when WordPress is running with `WP_DEBUG` (local dev). Private / loopback IPs (127.0.0.1, 10.x.x.x, link-local) are blocked unless `WP_DEBUG` is on. |
| **Description** | Optional. Helps future-you remember why this endpoint exists. |
| **Active** | Switch. When off, the endpoint stops receiving events. Already-queued deliveries are **parked** (not failed) and resume automatically when you re-enable. |
| **Log delivery payloads** | Switch, default on. When on, every POST body + response body is stored in the delivery log for 90 days. Turn off for high-volume endpoints to save disk — status, attempts, and duration are still recorded so health metrics work, but the inspector won't show the payload or response. |

#### Trigger event

A single-select dropdown listing every event Yatra can fire — bookings, payments, enquiries, trips, departures, plus the synthetic `webhook.ping`. One endpoint = one event. That's deliberate: it makes field selection unambiguous (the field paths depend on the event's payload shape) and matches how the rest of Yatra (e.g. Email Automation) wires events to actions.

Pick the event. The form expands with the field selector.

#### Payload fields to send

This card is the "Pabbly experience" — see exactly what your receiver will get before saving anything.

Two modes:

- **Send the full payload** (default). The entire envelope + data block ships in the POST body. Recommended when your receiver picks what it needs.
- **Send only selected fields.** Pick from a checklist. Each row is a dot-path inside `data{}` — e.g. `contact_email`, `total_amount`, `booking.id`. Original nesting is preserved (selecting `customer.email` ships as `data.customer.email`, never flattened to `customer_email`). The envelope (`id`, `type`, `api_version`, `occurred_at`) is always sent regardless — receivers route on those.

The field checklist needs a sample payload to populate. Two ways to get one:

1. **Listen for sample (recommended).** Click the button. The blue Alert switches to "Listening for booking.created…" with a 15-minute countdown. Now go and *trigger* the event — open a new tab, create a booking through your normal flow, or use the WP CLI / REST API. As soon as Yatra fires the event, the form polls every 3s, picks up the captured payload, and populates the field list with the real fields and real values.
2. **From a previous delivery.** If this event has fired at least once on this site, the most recent successful delivery's payload is used. No listen needed.

Once you have a sample, the **Preview payload** button shows two tabs side-by-side:

- **Output** — the exact JSON bytes your receiver will get, computed live from the sample + your current field selection.
- **Input** — the full captured event data, for reference.

#### Custom HTTP headers (optional)

Key-value pairs sent alongside Yatra's signed headers. Useful for:

- `Authorization: Bearer <your-token>` when your receiver requires its own auth on top of HMAC.
- `X-Tenant-Id: prod` to tag requests for multi-tenant ingest routers.

Reserved header names (`X-Yatra-*`, `Content-Length`, `Host`, `Cookie`, `Transfer-Encoding`) are blocked server-side — they'd clobber the signed envelope.

#### Additional payload fields (optional)

Static key/value pairs merged into every payload's `data` block. Lets you tag every event with operator-specific metadata (`tenant_id`, `environment`, `region`, `source_app`) without writing a server-side payload filter. Operator extras never overwrite Yatra's canonical entity fields — if your tag collides with `contact_email`, Yatra's value wins.

#### Signing secret

By default Yatra generates a strong random 32-byte secret. If your receiver already has a secret configured (you're migrating from another system, or the receiver issues its own), toggle **Use my own signing secret** and paste it — minimum 24 characters.

### 3. Save → secret reveal dialog

Click **Create endpoint**. The signing secret is shown **once** in a copy-only modal — Stripe / GitHub pattern. After this dialog closes, the secret is never displayed again. You can regenerate it from the endpoint list (the receiver will need to update too).

The dialog includes ready-to-paste verification snippets in **PHP**, **Node.js**, and **Python**. Pick your language, copy, drop it into your receiver. Every snippet includes:

- The header parse (extract `t=` and `v1=` from `X-Yatra-Signature`)
- A timestamp freshness check (reject if more than ±5 minutes off — defeats replay attacks)
- The HMAC recompute over `<ts>.<raw_body>`
- A timing-safe compare against the received signature

If verification fails, reject the request with 401. If timestamp is stale, reject with 400. Yatra retries automatically if you return any 5xx / 429.

### 4. Send a test ping

In the endpoint list, click the 3-dot menu on your new row → **Send test ping**. Yatra queues a synthetic `webhook.ping` event and pops the delivery inspector live. The inspector polls every 2 seconds, so you see `queued → delivering → delivered` (or `failed` with the error) in real time without switching tabs.

If the ping shows delivered, your receiver is wired up correctly. If it shows `failed (HTTP 401)`, your signature verification has a bug — recheck the snippet vs your code.

### 5. Watch real events flow

That's it. The next time the event fires (a real booking is created, a payment posts, etc.), Yatra POSTs to your receiver. Watch the Deliveries tab — every attempt is logged with status, attempts, duration, and the full payload + response. Click any row's name to inspect.

## The Deliveries tab — your debugging surface

| Column | What it tells you |
| --- | --- |
| **Event** | The event key + endpoint name. Click the event key to open the inspector. |
| **Status** | `queued` / `delivering` / `delivered` / `failed (retrying)` / `permanent_failure`. Failed shows the HTTP code in the badge. |
| **Attempts** | How many tries so far. Failed deliveries auto-retry up to 5 times with backoff. |
| **Duration** | Wall-clock milliseconds for the POST. Useful for spotting receivers that are slow → retry storms. |
| **Created** | When Yatra first queued the delivery. |

Filters at the top: by **endpoint**, **event**, **status**. The list refetches every 10s so you watch deliveries flow live.

### Inspector

Click any delivery name to open the inspector. You see:

- Event key + delivery ID (the same UUID your receiver got in the `X-Yatra-Delivery-Id` header — use it for idempotency keys on your side).
- Status, attempts, created / delivered timestamps, duration.
- The full **Payload sent** (exact JSON bytes — sign-the-same to verify).
- The **Response body** + headers from your receiver.
- An **Error** banner if the attempt failed, with the transport / HTTP error message.

For failed / permanent-failure rows, a **Replay delivery** button appears in the footer. Replay resets status to `queued`, clears the error, and re-enqueues. The attempts counter is *not* reset — preserves the audit trail.

### Replaying after a receiver outage

If your receiver was down for a few hours, you'll have a stack of permanent-failure rows. Three options:

1. **One-by-one.** Click each → Replay. Fine for a handful.
2. **The Buried tab — bulk replay.** Open the Buried tab. The "By endpoint" card has a Replay-all button for each receiver, so one click re-queues every buried delivery for that endpoint. You can also tick rows in the recent-buried list and use Replay selected, capped at 200 per click.
3. **Let Yatra do it for you for new events.** When your endpoint is re-enabled (or was never disabled and the receiver came back), the next time *any* event fires it'll deliver normally — no special action needed. The *already-failed* deliveries don't auto-replay; that requires intentional operator action so you don't accidentally re-send week-old events to your CRM.

## The Buried tab

Open <span class="screen-path">Yatra → Webhooks → Buried</span> when something's wrong. The view skips the row-by-row delivery log and shows you a summary of every delivery currently in permanent failure.

Three grouping cards:

- **By endpoint** — which receivers are accumulating failures. Usually points at a single misconfigured integration. Each card has a "Replay all" button that re-queues everything buried for that endpoint.
- **By event** — which event types fail most. Often points at a payload shape change or a downstream filter.
- **By error** — error messages grouped by the first ~80 characters. Clusters "HTTP 503 Service Unavailable" rows together so you see the pattern instead of 1,000 individual rows.

Plus a list of the 25 most-recent buried deliveries with checkboxes — pick the rows you want and click Replay selected.

Rows whose endpoint is currently disabled or deleted are skipped during bulk replay (you'd just loop them back into failure otherwise). The response toast tells you how many were re-queued and how many were skipped, broken down by reason.

## HTTP method

Each endpoint has an **HTTP method** dropdown in the edit form. POST is the default and matches the universal webhook convention (Stripe, GitHub, Zapier — everyone POSTs). Use one of the others only when your receiver explicitly requires it:

| Method | When to use it |
| --- | --- |
| **POST** (default) | The standard webhook convention. JSON body, HMAC over the body. Pick this unless your receiver tells you otherwise. |
| **PUT** | Upsert-style receivers — usually a REST endpoint that treats the payload as the "new state of the resource". |
| **PATCH** | Partial-update receivers — some healthcare / B2B EDI integrations expect PATCH semantics. |
| **DELETE** | Object-removed mirror endpoints — rare, but some receivers want a different verb when an entity is removed. |
| **GET** | Legacy "polling-callback" patterns. The payload moves to a `?payload=<json>` query parameter (URL-encoded). The body becomes empty, so the HMAC signature is then computed over `timestamp + '.' + ''` (timestamp followed by a dot and an empty body). Receivers verifying a GET delivery should reconstruct that exact signed string. Avoid GET unless the receiver explicitly requires it — typical URL-length limits cap the payload around 8 KB. |

Every delivery also includes an `X-Yatra-Method` header echoing the chosen verb. Useful when an API gateway in front of your receiver rewrites the method (some collapse PATCH → POST) — the original intent is preserved in that header.

## Client certificate (mTLS)

Some receivers — typically in regulated industries like finance, healthcare, or B2B EDI — require Yatra to authenticate at the TLS handshake with a client certificate, on top of the HMAC signature. The endpoint actions menu has a **Client certificate (mTLS)** entry that opens a dialog with three states:

- **Not configured.** Default. Paste the certificate and the private key (PEM format), plus an optional passphrase if the key is encrypted. Yatra validates that the certificate and key match (using OpenSSL's `x509_check_private_key`) before saving — a mismatched pair is rejected up-front instead of failing at delivery time.
- **Configured.** Shows the certificate's SHA-256 fingerprint and the expiry date pulled from the cert itself. From here you can replace the pair or remove it entirely.
- **Replace.** Same form as the empty state but pre-positioned over the existing configuration.

The cert + key are stored encrypted at rest using the same envelope scheme as the signing secret (libsodium AEAD by default, OpenSSL AES-256-GCM fallback). They're written to short-lived temp files only during the outbound request and the files are deleted in a `finally` block so they never outlive the delivery. The HKDF context for mTLS is distinct from the HMAC secret store, so a leak of one ciphertext doesn't compromise the other.

If your hosting restricts `/tmp` via `open_basedir`, Yatra uses `wp_tempnam()` which respects the WordPress upload directory — works in restricted environments without configuration.

## Payload size cap

A safety belt on outbound payloads. Default cap is **1 MB** per delivery (serialized JSON). If a payload exceeds the cap — usually because a custom `yatra_webhook_payload` filter inflated the data with attached records or a CRM lookup — the delivery is recorded as a permanent failure with a clear error message instead of silently dispatching a multi-megabyte body that most receivers would reject anyway.

Operators who legitimately need larger payloads can raise the cap:

```php
add_filter('yatra_webhook_max_payload_bytes', fn() => 4 * 1024 * 1024);  // 4MB
```

Set to `0` to disable the check entirely (not recommended). The `yatra_webhook_payload_too_large` action fires whenever a payload trips the cap, so you can hook into it for alerting.

## Signing-secret rotation grace window

When you regenerate an endpoint's signing secret, Yatra signs every outbound payload with BOTH the new secret AND the old secret for 24 hours. The signature header carries the dual signature as `t=<unix>,v1=<new_hash>,v1_prev=<old_hash>`.

Receivers that have already updated to the new secret verify `v1` and ignore `v1_prev`. Receivers that haven't updated yet verify `v1_prev` and ignore `v1`. Either way the delivery passes. After 24 hours the previous-secret transient expires and only `v1` is sent.

This means you can rotate a secret without a coordinated cutover: regenerate in Yatra, paste the new secret into your receiver any time within 24 hours, no missed deliveries either way.

The grace window is configurable:

```php
add_filter('yatra_webhook_secret_rotation_grace_seconds', fn() => 7200);  // 2h
```

Set to `0` to disable dual-signing entirely — receivers must update the secret before the next delivery fires.

## Security model

| Defense | What it does |
| --- | --- |
| **Encrypted secrets at rest** | libsodium `crypto_secretbox` (XSalsa20-Poly1305) is the default; OpenSSL AES-256-GCM is the fallback for hosts without libsodium. Key derives from your WordPress `AUTH_KEY` + `SECURE_AUTH_KEY` salts via HKDF-SHA256 — copy the site DB to another server without the matching salts and the secrets won't decrypt. |
| **HMAC-SHA256 signed payloads** | Stripe-style `X-Yatra-Signature: t=<unix>,v1=<hex>`. The signature is computed over `<timestamp>.<raw_body>`, not just the body — defeats replay attacks if your receiver checks freshness. |
| **HTTPS-only** | Plain `http://` is rejected at save time unless WordPress is running with `WP_DEBUG` (local dev). |
| **SSRF guard** | URLs that resolve to loopback (127.0.0.1, ::1), RFC1918 private ranges (10.x.x.x, 192.168.x.x, 172.16-31.x.x), link-local, or known dangerous literals (`localhost`, `metadata.google.internal`) are blocked. DNS resolution is checked, not just the hostname literal. |
| **Dispatch-time URL re-check** | The host validation runs again at dispatch time, not only at save time. Defends against DNS rebinding: an attacker who configures an endpoint with a legitimate domain and later flips the domain's A record to `127.0.0.1` doesn't get Yatra to POST signed payloads at the loopback. If the host resolves to a private address at dispatch time, the delivery fails permanently and the operator has to fix the URL. |
| **Dual-signature rotation grace** | After regenerating a signing secret, payloads are signed with both the new and the old secret for 24 hours. See "Signing-secret rotation grace window" above. Lets you rotate without a coordinated cutover with the receiver. |
| **Payload size cap** | 1 MB default cap on outbound payloads. Oversized payloads land in the delivery log as `permanent_failure` with a clear reason. Operators can raise the cap via filter when needed. |
| **mTLS client certificate** | Optional per-endpoint client cert + key for receivers that require mutual TLS on top of the HMAC signature. See "Client certificate (mTLS)" above. |
| **Reserved header allowlist** | Operators can set custom headers, but `X-Yatra-*`, `Content-Length`, `Host`, `Cookie`, `Transfer-Encoding`, `Connection`, `Upgrade` are blocked — they'd interfere with the signed envelope or HTTP transport. |
| **Audit-action stream** | `yatra_webhook_endpoint_created`, `yatra_webhook_endpoint_updated`, `yatra_webhook_endpoint_deleted`, `yatra_webhook_secret_regenerated` fire on every mutation with the acting user id. Hook into them from a security-information-and-event-management (SIEM) plugin or write to your own audit log. |

## Reliability model

| Mechanism | What it does |
| --- | --- |
| **Async delivery via Action Scheduler** | The original WordPress request that triggered the event returns immediately. Webhook POSTs run on background workers, so a slow receiver can't slow your checkout. |
| **Atomic claim** | Concurrent worker processes can't both deliver the same row — the first one to flip the status to `delivering` wins; the other exits silently. |
| **Concurrent-delivery throttle** | Max 5 in-flight deliveries per endpoint. If a receiver is slow, additional events queue normally instead of starving the worker pool. Adjustable via the `yatra_webhook_max_concurrent_per_endpoint` filter. |
| **Retry with exponential backoff** | 5 attempts at 60s / 5min / 30min / 1h with ±10% jitter. Jitter prevents retry storms when many deliveries fail at the same moment (receiver downtime). |
| **Auto-disable after 10 permanent failures** | An endpoint that keeps failing gets disabled with `last_status: auto_disabled`. The admin is notified via the `yatra_webhook_endpoint_auto_disabled` action. |
| **Park on inactive endpoint** | If an endpoint is disabled while deliveries are queued, those deliveries don't get marked as failures — they're **parked**. When you re-enable the endpoint, parked deliveries auto-resume on the next dispatcher tick. |
| **Crashed-worker recovery** | If a worker dies mid-delivery (PHP fatal, process kill), the row stays in `delivering` forever otherwise. A daily cron sweeps any `delivering` row older than 5 minutes back to `queued` and re-enqueues. |
| **90-day delivery log retention** | Configurable via the `yatra_webhook_retention_days` filter (capped at 730 days). |

## Filters and actions

Power-users — hook these from a snippet or a sister plugin.

| Hook | When it fires | Use it for |
| --- | --- | --- |
| `yatra_webhook_events` (filter) | When the event catalog is built | Append your own custom events for receivers to subscribe to. |
| `yatra_webhook_payload_{event_key}` (filter) | After Yatra builds an event's envelope, before it queues | Enrich a specific event's `data` (e.g. add a CRM lookup result). |
| `yatra_webhook_payload` (filter) | Same, but for every event | Add a tenant id, environment marker, etc. globally. |
| `yatra_webhook_reject_url` (filter) | At endpoint save time | Return an error string to reject a URL (custom allowlist / corporate firewall). |
| `yatra_webhook_max_concurrent_per_endpoint` (filter) | Before claim | Override the default 5-in-flight cap. |
| `yatra_webhook_retention_days` (filter) | Daily retention cron | Override the 90-day default (max 730). |
| `yatra_webhook_max_payload_bytes` (filter) | Before queueing | Override the 1 MB payload size cap. Set to `0` to disable the cap (not recommended). |
| `yatra_webhook_payload_too_large` (action) | When a payload trips the cap | Hook for alerting on payload-cap failures. Fires with `(endpoint_id, event_key, actual_bytes, cap_bytes)`. |
| `yatra_webhook_secret_rotation_grace_seconds` (filter) | On secret regenerate | Override the 24-hour dual-signature grace window. Set to `0` to disable dual-signing. |
| `yatra_trusted_proxy_cidrs` (filter) | When resolving the request client IP | Tell Yatra which proxy IPs are trusted to forward `X-Forwarded-For`. Without this, XFF is ignored. |
| `yatra_webhook_delivered` (action) | After a successful delivery | Trigger your own follow-up (e.g. mark a CRM record as "synced"). |
| `yatra_webhook_permanent_failure` (action) | On final failure | Alert your ops channel. |
| `yatra_webhook_endpoint_created` / `_updated` / `_deleted` (actions) | On mutation | Audit log / change tracking. |
| `yatra_webhook_secret_regenerated` (action) | On secret rotation | Critical security event — alert separately. |
| `yatra_webhook_endpoint_auto_disabled` (action) | After 10 consecutive permanent failures | Email the admin, page on-call, etc. |
| `yatra_webhook_sample_captured` (action) | When the listen-mode flow records a sample | Hook into the capture for debugging / metrics. |

## FAQ

**Why one event per endpoint? Other systems let me subscribe to multiple.**

Field selection. The dot-path checklist depends on which event you picked — a `booking.created` payload has different fields than `payment.received`. If one endpoint subscribed to both, picking "send only `contact_email`" would be ambiguous. The 1:1 mapping mirrors Email Automation in Yatra and makes the operator's "what will my receiver get?" question unambiguous. Create two endpoints with the same URL if you want to react to two events — that's a clean configuration and the field selector still works per-event.

**My receiver returns 200 but it failed to process — will Yatra know?**

No. Yatra trusts the HTTP status — 200 means delivered. If your receiver wants to indicate a soft failure for retry, return 5xx. Use 4xx (except 429) to permanently reject (Yatra won't retry).

**What's the difference between Ping and a real event?**

Ping fires a synthetic `webhook.ping` event with a fixed payload (object: `webhook_pong`, a friendly message, your site URL). It's wired to the same delivery path as real events — same signing, same retry, same logging. Use it to verify your receiver wiring without having to create a real booking.

**Can I disable a single delivery without disabling the endpoint?**

No. Failed deliveries auto-stop retrying after 5 attempts. If a specific delivery is causing problems, you can let it exhaust retries — the others keep flowing.

**Does the listen-mode capture leak PII?**

The captured payload contains whatever the real event carried, which can include PII (customer name, email, phone). It's stored in a WordPress transient (24-hour TTL after capture) and only readable via the same `manage_options` capability the rest of the webhooks UI gates on. The same trust model as the delivery log. If your compliance posture requires no PII storage at all, set Log delivery payloads to off on the endpoint — the delivery row will still exist but the body is stripped post-delivery.

**Can multiple endpoints subscribe to the same event?**

Yes. Each endpoint is independent — its own signing secret, its own field selection, its own custom headers, its own delivery log. Subscribe one endpoint to `booking.created` for your CRM and another to `booking.created` for your accounting tool — both fire on every booking, each with its own filter.

**How do I migrate from another webhook provider (Zapier-managed, Make-managed)?**

Two ways. (a) Configure your existing Zapier / Make scenario to point at a new "Yatra → CRM" Zap, and configure your Yatra endpoint with the Zapier catch-hook URL. Easiest, you keep the Zap. (b) Build the receiver yourself (the verification snippets do the heavy lifting), point Yatra directly at it. Removes the Zapier intermediary — faster, cheaper at scale.

## Pricing

Webhooks ship in the **Scale** tier. Same price as Channel Manager and White Label — no per-event metering, no per-delivery surcharge, no rate limit beyond the soft concurrent-delivery throttle. Send a million events a month if your traffic warrants it.

See [pricing](https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) for tier breakdown.
