---
title: Channel Manager
description: Connect Yatra to GetYourGuide through its Supplier API (GetYourGuide asks your site for availability and sends bookings in real time), with one shared inventory. Viator connector in development.
prev:
  text: WhatsApp Notifications
  link: /modules/whatsapp
next:
  text: Webhooks
  link: /modules/webhooks
---

# Channel Manager <span class="pro-pill">PRO</span>

![Channels tab — connected channels with health badges, mode and last-sync timestamps](/screenshots/modules/channel-manager-channels.webp)

<span class="pro-pill">PRO</span> **Scale** plan · Yatra Pro

**Online Travel Agencies** — usually called **OTAs** — are big booking marketplaces like **GetYourGuide** and **Viator** (owned by Tripadvisor). Managing them by hand means logging into a separate dashboard for each one, updating availability and prices in every place, and copy-pasting bookings back into your own system. It's slow, error-prone, and when two channels sell the last seat at the same moment you can end up overbooked.

The **Channel Manager** module connects your Yatra site to the OTA so both sell from **one inventory** — your Yatra departures. A booking made on the OTA lands in your Yatra bookings list and takes its places; a booking made on your own site (or a date you block) changes what the OTA can sell.

::: warning Connection status — read before you go live
- **GetYourGuide** (Yatra Pro 3.2+) is built on GetYourGuide's **Supplier API**: GetYourGuide calls your site for availability, reservations and bookings. It has **not yet been certified by GetYourGuide**. GetYourGuide has to approve the connection from **your** connectivity-partner account: run its self-tests in the GetYourGuide Integrator Portal and get GetYourGuide's go-ahead before you sell live. See [GetYourGuide (Supplier API)](#getyourguide-supplier-api).
- **Viator** is **in development**. The Viator connector in the code is an early version that has not been tested against a Viator account — don't rely on it for live sales yet.
- Trip content (titles, descriptions, photos) is never sent. You create the product on the OTA and link it to a Yatra trip by ID.
:::

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Scale** tier (Yearly or Lifetime) | <span class="screen-path">Yatra → License</span> |
| Channel Manager module enabled | <span class="screen-path">Yatra → Modules → Channel Manager</span> |
| Partner-program approval from each OTA | See *Supported channels* below |
| OTA credentials | GetYourGuide: the API username and password shown in GetYourGuide's Integrator Portal. Viator: API key + webhook signing secret. |
| Public, HTTPS-accessible WordPress site | The OTA has to reach your site from the public internet |

> **Bring-your-own credentials, no proxying.** All calls go directly between your WordPress and the OTA. Yatra adds no markup and doesn't route your customer data through its own servers.

## What it unlocks

| Surface | What it does |
| --- | --- |
| **Channels tab** | List, add, edit, delete one connection per OTA. Per-channel encrypted credentials + sandbox/live mode + commission %, inventory buffer, default price offset. Health badge per channel. |
| **Trip mappings tab** | Link each Yatra trip to its counterpart product on each OTA. Per-mapping price offset override + sync toggles + bulk operations. |
| **Bookings inbox** | Every booking received from a connected OTA arrives here, two-phase staged then promoted into the normal Yatra booking list. |
| **Sync activity log** | Every push, pull, and webhook from the last 90 days. Audit trail with HTTP status, duration, and full error context. |
| **GetYourGuide Supplier API** | Endpoints on your site that GetYourGuide calls for availability, reservations, bookings and cancellations. Protected by a username and password Yatra generates per channel. See [GetYourGuide (Supplier API)](#getyourguide-supplier-api). |
| **Webhook receiver** (Viator) | Public endpoint that accepts signed booking deliveries. Always-on regardless of module toggle state. |
| **Hourly safety-net cron** | If a webhook misses, the cron pulls bookings for the last 24h and reconciles. |
| **Reconciliation report** | A single read-only snapshot across every channel — stale mappings, pending booking promotions, sync success/fail counts, breaker states. Suitable for a dashboard refresh button and for external monitoring polling. Details below. |
| **Latency report** | Per-channel and per-provider average / p50 / p95 / p99 sync durations across 24h and 7d windows. Helps spot a slow OTA before customers do. |
| **Inbound webhook IP allowlist** | Optional. Restrict the inbound webhook receiver to specific CIDRs (the OTA's documented source ranges, or your corporate proxy) as a second layer on top of the signature secret. |

## How it works

::: tip GetYourGuide works differently
GetYourGuide doesn't use the push / pull / webhook loops below. It **asks your site** in real time, and Yatra only tells GetYourGuide when places change. See [GetYourGuide (Supplier API)](#getyourguide-supplier-api). The loops below describe the Viator connector.
:::

Three things happen in the background so your Yatra site and your OTAs stay in sync:

1. **Push (about 30 seconds after a change).** When a booking is created, cancelled or deleted, or an availability row or departure is saved, Yatra re-sends that trip's capacity and prices to every connected OTA about 30 seconds later. A price change made only on the trip itself goes out with the hourly job below. If you make a lot of changes at once, Yatra waits a moment and groups them into one push instead of hammering the OTA with one request per change.
2. **Pull (every hour).** A background job runs hourly to double-check: it pulls the last day's bookings from each OTA (in case a webhook notification was missed), re-sends inventory for every active mapping, and cleans up old activity logs (older than 90 days). This is your safety net.
3. **Webhooks (inbound).** Each OTA notifies your site the moment a booking is made. Yatra checks the notification is genuine (using the secret signing key the OTA gave you, plus a timestamp check so old replays can't be re-used), saves it as a *staged* booking, and confirms back to the OTA right away so it doesn't time out. A few seconds later Yatra promotes the staged booking into your normal booking list — the same one your direct-website bookings live in.

A few safety mechanisms sit behind those three loops:

- **Retries with growing wait times.** If a request to the OTA fails (network blip, server error), Yatra retries automatically, waiting a bit longer between each retry. If the OTA explicitly says "slow down" (a `429 Too Many Requests` response with a `Retry-After` header), Yatra waits exactly the amount it asked for.
- **Failing-OTA isolation ("circuit breaker").** If one OTA keeps erroring repeatedly, Yatra stops calling it for a few minutes, then tries again carefully. The other OTAs keep working. It's the same idea as a household electrical breaker — one bad appliance doesn't take down the whole house.
- **Last-seat lock.** While Yatra is moving a freshly-received OTA booking into your real bookings list, it briefly locks that trip's seat count so no other channel (or your own website) can sell the same seat at the same instant. This *significantly* reduces overbooking risk, but doesn't eliminate it 100% — see [overbooking realities](#overbooking-what-the-module-prevents-and-what-it-can-t) below.

## Supported channels

| Channel | How it connects | Status |
| --- | --- | --- |
| **GetYourGuide** | Supplier API: GetYourGuide calls your site for availability, reservations, bookings and cancellations; Yatra notifies GetYourGuide when places change. | Available in Yatra Pro 3.2. **Not yet certified by GetYourGuide** — certify from your partner account before going live. |
| **Viator** (Tripadvisor) | Push inventory + pricing · Pull bookings · Signed webhook | **In development** — not tested against a Viator account. |

Other OTAs (Klook, Tripadvisor Experiences and so on) are not supported. Developers can add a connector with the `yatra_channel_manager_channel_types` filter and a class implementing `ProviderInterface`. If you need another channel, [contact support](/support) with the OTA and the API it offers.

## Step 1 — Apply for OTA partner access

Each OTA has its own approval flow. Typical lead time: 1–2 weeks for response, 2–4 weeks for full activation. Start this before you start the technical setup.

- **GetYourGuide**: you need a GetYourGuide supplier account ([getyourguide.supply](https://getyourguide.supply/)) and to sign up as a connectivity partner in the [GetYourGuide Integrator Portal](https://integrator.getyourguide.com/documentation/overview). That's where you enter Yatra's connection details and run the self-tests.
- **Viator**: [supplier.viator.com/sign-up-info](https://supplier.viator.com/sign-up-info) — apply as a supplier; API access is requested from the Viator Management Center once approved. (The Viator connector is still in development.)

## Step 2 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Channel Manager** → toggle on. (Starter / Growth plans show an *Upgrade to Scale* prompt instead.)
3. A new menu entry **Channel Manager** appears in the sidebar.
4. Database tables are created automatically on toggle-on — no separate install step.

::: tip Connecting GetYourGuide?
Steps 3 and 7 apply to both channels. For GetYourGuide, skip Steps 4–6 and 8 and follow [GetYourGuide (Supplier API)](#getyourguide-supplier-api) instead.
:::

## Step 3 — Add your first channel

Open <span class="screen-path">Yatra → Channel Manager → Channels → + Add channel</span>.

![Channel edit form — Connection / Pricing & inventory rules / Channel state cards](/screenshots/modules/channel-manager-channel-form.webp)

### Connection card

| Field | Notes |
| --- | --- |
| **OTA channel** | Pick the OTA. Locked after creation — switching OTAs is a new channel. |
| **Display name** | Friendly name shown in the admin UI. Defaults to the OTA's name. |
| **Account label (internal)** | Distinguish multiple accounts on the same OTA (e.g. "US production", "EU staging"). |
| **Currency** | The three-letter currency code (e.g. `USD`, `EUR`, `GBP` — this is the international ISO 4217 standard). Must match the currency your products are priced in on the OTA — if Yatra is set to `USD` and the OTA expects `EUR`, every price push will fail. |

### Pricing & inventory rules card

| Field | Notes |
| --- | --- |
| **Default price offset (%)** | Adds (or subtracts) a percentage to your base trip price before pushing to this channel. Use a positive number to cover the OTA's commission so your net stays whole; negative to run a channel-only discount. |
| **Commission (%) — informational** | What the OTA deducts from each sale. **Not sent to the channel** — used only to estimate your net revenue in reports. |
| **Inventory buffer (seats)** | Seats held back from this channel so direct-bookers and other OTAs always have stock. Example: a 20-seat departure with a buffer of 2 will only ever show 18 seats here. |

### Channel state card

| Toggle | Notes |
| --- | --- |
| **Enabled** | When off, this channel won't push inventory or pricing, and incoming bookings won't be ingested. Logs still record any attempts so you can audit them. |
| **Sandbox / test mode** | Routes Yatra's calls to the OTA's sandbox environment. **Always start in sandbox until a test booking has flowed through end-to-end.** Switch off only after you've verified the connection in production. For GetYourGuide it only affects Yatra's own calls (availability updates); GetYourGuide's calls to your site are answered whenever the channel is **Enabled**. |

## Step 4 — Save credentials (Viator)

After creating the channel, the form gains a **Credentials** card.

![Credentials card — API Key + Webhook Signing Secret with eye toggle and masked hint](/screenshots/modules/channel-manager-credentials.webp)

| Credential | Notes |
| --- | --- |
| **API Key** | From the OTA's partner portal → Account → API Access. Required. Stored encrypted via libsodium AEAD (XChaCha20-Poly1305); the browser only ever sees a masked last-4 hint after save. |
| **Webhook Signing Secret** | Shared secret used to verify HMAC-SHA256 signatures on inbound booking webhooks. Without it, every inbound booking is rejected as unauthorized. |

After saving, click **Test connection** — the module hits the OTA's lightest auth probe endpoint and confirms the credential works.

## Step 5 — Register the webhook URL on the OTA (Viator)

The form gains an **Inbound webhook URL** card showing the public URL the OTA should POST to (e.g. `https://yoursite.com/wp-json/yatra/v1/channel-manager/webhook/1`).

1. Copy the URL with the copy button.
2. In the OTA's partner portal, paste it into the *Booking notifications* / *Webhook* setting.
3. Save.

Click **Test webhook** in Yatra to verify the round-trip. The button signs a synthetic booking with your saved secret, POSTs it to your own webhook URL, and runs it through the full verification pipeline. A green toast means: signature verified, replay check passed, booking staged. A red toast tells you exactly what failed.

::: warning Firewall / VPN reachability
The webhook URL must be reachable from the public internet. If your WordPress is behind a firewall, VPN, or staging-environment IP allowlist, the OTA's webhook deliveries time out and you'll only get bookings on the next hourly cron tick.
:::

## Step 6 — Flip the channel live (Viator)

Once Test connection + Test webhook both pass:

1. Open the channel.
2. Toggle **Sandbox / test mode** off.
3. Toggle **Enabled** on.
4. Save.

The channel is now live. The first push runs on the next hourly job (or use **Sync selected** on the Trip mappings tab to push now); after that, every availability, departure or booking change triggers an event-driven push about 30 seconds later.

## Step 7 — Map your trips

Open <span class="screen-path">Yatra → Channel Manager → Trip mappings → + Add mapping</span>.

![Mapping add form — channel, trip ID, channel product ID, public URL, per-mapping offset, sync toggles](/screenshots/modules/channel-manager-mapping-form.webp)

| Field | Notes |
| --- | --- |
| **Channel** | Which channel this mapping pushes to. |
| **Trip ID** | Numeric ID of the Yatra trip. Find it in the URL when editing the trip (`?id=42`). |
| **Channel product ID** | The product's ID on the channel side. For Viator this is a product code (e.g. `12345P1`). For GetYourGuide it's a product ID **you choose** (for example `trip-12`) and enter for the matching tour option in GetYourGuide — see [GetYourGuide (Supplier API)](#getyourguide-supplier-api). |
| **Public listing URL (optional)** | Link to the channel's public listing for this product. Shown as a quick-jump link in the mappings table. |
| **Per-mapping price offset (%)** | Overrides the channel's default offset for this trip only. 0 inherits the channel default. |
| **Sync inventory** | Push seat availability to this channel. |
| **Sync pricing** | Push prices to this channel. Turn off when the OTA manages pricing on its side. (Not used by GetYourGuide — use *Send prices with availability* on the mapping instead.) |

One Yatra trip can map to many channels (each with its own price offset); one channel holds one mapping per Yatra trip.

### Bulk operations

The mappings table supports **multi-select**. Tick mappings and the bulk action bar appears:

| Action | What it does |
| --- | --- |
| **Sync selected** | Pushes inventory + pricing for every selected mapping. |
| **Enable** | Resumes paused mappings. |
| **Pause** | Stops pushes without losing the configuration. |
| **Delete** | Removes the mappings. Existing bookings already received are unaffected. |

Capped at 200 mappings per bulk request server-side so a runaway client can't blow the PHP timeout.

## Step 8 — Watch the Bookings inbox (Viator)

Open <span class="screen-path">Yatra → Channel Manager → Bookings inbox</span>.

![Bookings inbox — status pills: received / promoted / failed](/screenshots/modules/channel-manager-bookings.webp)

When an OTA delivers a webhook:

1. Body is signed (`X-Viator-Signature`). Receiver verifies HMAC + checks the timestamp is within ±5 minutes (replay protection).
2. Booking is **staged** — single row INSERT into the staging table. Response is sent back to the OTA inside its timeout budget.
3. ~5 seconds later, a scheduled cron event **promotes** the staged row into a real Yatra booking. Uses a `SELECT ... FOR UPDATE` lock on the availability row to prevent two channels selling the last seat simultaneously.

The inbox shows three statuses:

| Status | Meaning |
| --- | --- |
| `received` | Staged but not yet a real Yatra booking. Usually flips to `promoted` within seconds. |
| `promoted` | Live in the standard booking list. Triggers email confirmations, payment receipts, and review-request automation just like a direct booking. The matching departure's `booked_count` is incremented (forced past Yatra's capacity guard, because the OTA already accepted the seat — we record what actually happened rather than refusing to acknowledge it). |
| `failed` | Promotion threw — check the error column. Common causes: unmapped product ID, deleted trip, validation error. |

### What promotion actually does

When a staged row is promoted to a Yatra booking (within ~5 seconds of the OTA webhook arriving), the following happens in order, inside a single database transaction so it's all-or-nothing:

1. **Customer find-or-create.** The OTA guest's email is matched against your existing customers. If they've booked direct before, the new booking attaches to their existing customer record (lifetime totals stay accurate). If not, a fresh customer is created.
2. **Booking row inserted** into the same `wp_yatra_bookings` table direct bookings use. Reference is `CH-{channel_id}-{external_booking_id}` so you can cross-reference back to the OTA's portal. Status is `confirmed`, payment status `paid` (OTAs collect the money on their side).
3. **Departure find-or-create + link.** The matching departure is located by `(trip_id, departure_date)`. If none exists yet, one is created so the booking has somewhere to live.
4. **Inventory decrement.** The departure's `booked_count` is incremented by the traveller count. This is **forced** past Yatra's normal capacity guard — if the OTA accepted a seat that Yatra thought was full, we record the booking anyway and let the operator see the oversell. Refusing to record would hide the problem.

After the transaction commits, two more things happen (outside the transaction so a slow SMTP server can't deadlock the booking row):

5. **Confirmation email** sent to the guest using your standard booking-confirmation template (honours your brand voice, White Label settings, and email-delivery configuration).
6. **`yatra_booking_created` action fires.** Every listener that runs for direct bookings runs here too — Email Automation sequences, WhatsApp templates, Webhook subscribers, analytics modules. The OTA booking is treated as a first-class citizen of the Yatra ecosystem.

If any of the side effects (5 or 6) fails, the booking itself still succeeds — the failure is logged to Sync Activity so you can investigate without losing the row.

### Booking lifecycle dispatch

Subsequent webhooks for the same external booking ID are handled by status:

| Inbound external status | Yatra action |
| --- | --- |
| `confirmed` / `pending` | Create-or-update the Yatra booking. |
| `cancelled` / `rejected` / `refunded` | Cancel the linked Yatra booking + fire `yatra_booking_cancelled` so your own refund automations (if any) and inventory restoration trigger as if an admin had cancelled it. |
| `amended` / `modified` / `updated` | Patch the Yatra booking — `travel_date`, `travelers_count`, `total_amount`, contact details — and fire `yatra_booking_modified`. |
| `no_show` | Mark the booking no-show (falls back to cancelled if your config doesn't include that status). |

## GetYourGuide (Supplier API) {#getyourguide-supplier-api}

<span class="pro-pill">PRO</span> **Scale** · Yatra Pro 3.2 or later · Channel Manager module on

GetYourGuide connects to booking systems the opposite way to most OTAs: **GetYourGuide calls your site**. When a customer looks at your product on GetYourGuide, GetYourGuide asks Yatra which dates and how many places are free. When they check out, GetYourGuide asks Yatra to hold the places, then to book them. Yatra only calls GetYourGuide to tell it when places change on your side.

::: warning Not yet certified by GetYourGuide
This connection follows GetYourGuide's Supplier API, but it has **not been certified by GetYourGuide**. GetYourGuide certifies each connection from the operator's own connectivity-partner account: run all of GetYourGuide's self-tests in the Integrator Portal (availability, reserve, book, cancel) and wait for GetYourGuide's approval before you sell live. Until then, use GetYourGuide's testing configuration.
:::

### What happens

| On GetYourGuide | In Yatra |
| --- | --- |
| A customer looks at dates | Yatra answers with the places left on that trip's departures — the same places your own website sells — minus the channel's **inventory buffer**. A date inside its booking cutoff isn't offered (24 hours when the date has no cutoff of its own). |
| The customer starts checkout (**reserve**) | Yatra holds the places for **60 minutes**. You see an **On hold** booking named *GetYourGuide &lt;GetYourGuide reference&gt;*. No email is sent. |
| The checkout is abandoned (**cancel reservation**) or the hold runs out | The hold is deleted and the places are free again. Holds nobody booked are cleaned up automatically (on GetYourGuide's next request, the hourly sync, or when you open the admin). |
| The customer pays (**book**) | The hold becomes a **confirmed, paid** Yatra booking with the lead traveller's name, email and phone, any comment and hotel, and the add-ons chosen. The lead traveller is added to the departure manifest. The booking's internal note records the GetYourGuide reference, what the customer paid on GetYourGuide and your **expected payout** after GetYourGuide's commission (from the channel's *Commission (%)*). |
| The customer cancels (**cancel booking**) | The Yatra booking is cancelled and its places are freed. |

GetYourGuide sends the customer its own confirmation, so Yatra doesn't send its customer confirmation email. Your **New booking** email to the team, Email Automation, webhooks and other new-booking actions run as for any booking. GetYourGuide collects the payment; Yatra doesn't charge anything.

**Cancellation rules.** Yatra refuses GetYourGuide's cancellation when the booking is already cancelled, when you have marked it **Completed** (the trip took place), or when the trip has already started. For products open all day (opening hours), the booking can be cancelled until the end of that day. Whether the customer gets a refund is decided on GetYourGuide under the cancellation policy you set there.

**Places changed in Yatra.** When places change on your side — a direct booking, a cancellation, a blocked date — Yatra tells GetYourGuide within about 30 seconds (and checks again every hour). Following GetYourGuide's rules, it only reports what GetYourGuide asks to hear about: a departure selling out (or being blocked), a departure coming back on sale, and changes to departures in the next 60 days that have fewer than 7 places left. Changes GetYourGuide caused itself aren't sent back.

**Also supported**

- **Group products** — a trip priced per group sells as GetYourGuide **GROUP** tickets (one price per group, within the group's minimum and maximum size).
- **Add-ons** — your [Additional Services](/modules/additional-services) for the trip are offered to GetYourGuide as add-ons; chosen ones are listed on the booking and added to its total.
- **Booking changes** — when GetYourGuide changes a booking on a departure that is full, the places the booking already holds are counted, so the change can go through.
- **Redemption** — when you set a GetYourGuide booking to **Completed**, Yatra tells GetYourGuide it was redeemed (switch on *Redemption* under Manage Features in the Integrator Portal to use this).
- **Product list** — GetYourGuide can read the list of products you have mapped (the product ID and trip title).

### To connect GetYourGuide

1. **Add the channel.** Open <span class="screen-path">Yatra → Channel Manager → Channels → Add channel</span>, pick **GetYourGuide**, set the **Currency** to the one your product uses on GetYourGuide, and fill in **Commission (%)** if you want the expected payout noted on each booking. Save.
2. **Copy Yatra's connection details.** The channel now shows a **Connect GetYourGuide to this site** card with the **API base URL** (`https://your-site.com/wp-json/yatra/v1/gyg`), a **Username** and a **Password**. Click **Show password** to see it. Yatra creates these for you; **Create new password** replaces the password (GetYourGuide can't reach your site until you enter the new one in the Integrator Portal).
3. **Enter them in GetYourGuide.** In the GetYourGuide Integrator Portal, enter the API base URL, username and password as your testing configuration (later as production).
4. **Paste GetYourGuide's credentials into Yatra.** On the same Integrator Portal page, GetYourGuide shows a username and password for **its** API. Paste them into the channel's **Credentials** card in Yatra (*GetYourGuide API username* and *GetYourGuide API password*) and click **Test connection**.
5. **Map each trip.** Under **Trip mappings → Add mapping**, pick the GetYourGuide channel and the trip, and enter a **Channel product ID** you choose (for example `trip-12`). Enter the same product ID for the matching tour option in GetYourGuide. Then click **Edit** on the mapping to set the GetYourGuide product settings (below).
6. **Switch the channel on.** Turn **Enabled** on. GetYourGuide's requests are only answered while the channel is enabled — keep **Sandbox / test mode** on while you test.
7. **Run GetYourGuide's self-tests** in the Integrator Portal (availability, reserve, book, cancel) and check **Sync activity** in Yatra for each request.
8. **Get certified, then go live.** Once GetYourGuide has approved the connection, enter the same details as your production configuration, and turn **Sandbox / test mode** off.

### GetYourGuide product settings (on each mapping)

Open the mapping with **Edit**. The **GetYourGuide product** card must match how the tour option is set up on GetYourGuide. Places always come from the trip's departures.

| Setting | What it does |
| --- | --- |
| **Product type** | *Time point (start times)* — fixed start times. *Time period (opening hours)* — open during opening hours, one entry per day. *Automatic* (default) — departures with a start time are time points, the rest whole days. |
| **Start time for departures without one** | For time-point products, the time GetYourGuide shows for departures that have no start time. |
| **Opening hours** | For time-period products, `HH:MM – HH:MM` (00:00 – 23:59 = all day). |
| **Ticket categories** | For trips with one price per person: which GetYourGuide categories (Adult, Child, Youth, Infant, Senior, Student, EU citizen, Military) are sold at that price. Trips priced per traveller category use their own categories. Default: Adult. |
| **Send prices with availability (Price over API)** | Off (default): GetYourGuide uses the prices set up there. On: GetYourGuide gets this trip's prices with each availability answer, after the channel's price offset — also switch on *Price over API* in GetYourGuide. |

The mapping's **Per-mapping price offset** and the channel's **Inventory buffer** apply as for other channels. **Sync pricing** isn't used for GetYourGuide.

### Where to see GetYourGuide activity

- **Bookings** — GetYourGuide holds and bookings are ordinary Yatra bookings (payment method *getyourguide*). They don't go through the Bookings inbox.
- **Sync activity** — every reservation, booking, cancellation, availability update, redemption and GetYourGuide notification is logged here.
- If GetYourGuide deactivates a product (for example after failed requests), its notification is logged in Sync activity with the reason.

## Inbound webhook IP allowlist (optional)

If you want a second gate on top of the signature secret, fill the **Inbound webhook IP allowlist** field on the channel edit form with the OTA's documented source CIDRs. Inbound requests from any source outside the list are dropped **before** signature verification, so a leaked secret alone can't be exploited from an arbitrary source.

How it works:

- Paste a comma- or newline-separated list of CIDRs (IPv4 or IPv6). Empty = no restriction (default).
- The check uses the request's `REMOTE_ADDR` by default. If your site sits behind a trusted proxy that forwards the real client IP via `X-Forwarded-For`, tell Yatra which proxies to trust with the `yatra_trusted_proxy_cidrs` filter — see the Webhooks doc for the snippet (same helper).
- Rejections return HTTP 200 (same pattern as the other reject paths — non-200 would cause the OTA to retry indefinitely) and write a "IP allowlist rejected source X" row to the sync log so you can see why a delivery was dropped.

Site-wide allowlist as well: if every channel should share the same allowlist (because all OTAs deliver through the same corporate proxy), set it once via filter:

```php
add_filter('yatra_channel_manager_webhook_ip_allowlist',
    fn($cidrs, $channelId) => ['203.0.113.0/24'],
    10, 2
);
```

Per-channel and site-wide allowlists are unioned — a request passes if either list allows it.

## Inbound webhook rate limit

The receiver has a built-in rate limit: **100 requests per minute per (channel, source IP)**. Real OTA traffic sends well under this; the cap protects against a misconfigured retry loop or an opportunistic flood. When the cap is exceeded the receiver returns HTTP 429 — legitimate OTAs back off on the `Retry-After` hint and try again.

Tune the cap via filter:

```php
add_filter('yatra_channel_manager_webhook_rate_limit',
    fn($limit, $channelId) => $channelId === 7 ? 500 : $limit,  // higher cap for one channel
    10, 2
);
```

## Reconciliation report

Open <span class="screen-path">Yatra → Channel Manager → Reconciliation</span>. The view aggregates "where do I have unfinished business?" across every channel into one read-only snapshot.

Eight KPI tiles at the top:

| Tile | What it shows |
| --- | --- |
| Channels enabled | Enabled / total. |
| Active mappings | Mappings currently set to sync. |
| Stale mappings | Active mappings whose last successful push is older than the staleness threshold (default 24h). |
| Open breakers | Channels where the circuit breaker is currently tripped. |
| Pending booking promotions | Inbound bookings staged but not yet promoted to real Yatra bookings. |
| Failed booking promotions (7d) | Promotions that threw an error in the last week. |
| Syncs OK (24h) / Syncs failed (24h) | Sync log success/fail counts for the last 24h. |

Below the tiles, a per-channel table flags every channel with a **Needs attention** badge if it has any stale mappings, pending/failed bookings, recent sync failures, or a tripped breaker. The last-failure column shows the operation, HTTP status, error message, and timestamp for the most recent failed sync — usually enough to diagnose without paging through the Sync activity log.

Customize the staleness window:

```php
add_filter('yatra_cm_inventory_stale_seconds', fn() => 12 * 3600);  // 12h
```

The report is computed on demand (it's a few SQL queries per channel). External monitoring can poll the REST endpoint `/yatra/v1/channel-manager/reconciliation` on its own cadence.

## Latency report

Open <span class="screen-path">Yatra → Channel Manager → Latency</span> for sync duration percentiles. Three tables: global, per provider (channel type), and per channel. Each row shows the sample count and the average / p50 / p95 / p99 of `duration_ms` across two windows (24h and 7d), plus the success / fail counts.

Useful for spotting an OTA that's degraded — e.g. p95 drifting from 800 ms to 4 seconds usually means the OTA's API is under load before customers start complaining.

Percentiles are nearest-rank — simplest cross-MySQL-version-portable definition; precise enough for monitoring (not for publishing SLO numbers).

Sample pool is capped at 5,000 most-recent rows per (channel, window) so the query is fast even on a busy installation. Operators with bigger fleets can lower the cap:

```php
add_filter('yatra_cm_latency_max_samples', fn() => 1000);
```

## Channel-credential capability

Channel credentials (API keys, webhook signing secrets) are gated by a separate, stricter capability: `yatra_manage_channel_credentials`. The day-to-day mapping + sync work is gated by the looser `yatra_manage_channel_manager`.

This means you can grant a "Channel Operator" role to a junior staff member who runs sync work, adds mappings, and investigates the sync log — without also handing them the keys to the OTA accounts. Only roles with the stricter `yatra_manage_channel_credentials` capability can create / edit / delete channels or set credentials.

By default the stricter capability is held only by the Owner and Manager roles. Custom roles can pick it up via the Team & Access role builder.

## Health monitoring

Each channel carries a **health badge** in the list:

| Badge | Meaning |
| --- | --- |
| 🟢 **Healthy** | Last 10 log rows all succeeded, circuit breaker closed. |
| 🟡 **Degraded** | Some recent failures but recovery is still happening. |
| 🔴 **Failing** | Circuit breaker open, OR all recent logs failed. The badge subtitle shows the breaker state (`circuit open` / `recovering`). |

Hover the badge for a tooltip with the raw counts ("Last 10: 8 OK, 2 failed.") and the breaker's last-failure reason.

## Reliability built in

The Channel Manager is designed for unattended operation — operators **never have to click sync manually**. Between the event-driven push and hourly cron, drift gets corrected within an hour even when something fails.

| Layer | What it does |
| --- | --- |
| **HTTP retries** | 3 attempts with exponential backoff + full jitter. 429 (with Retry-After honored) and 5xx are retried; 4xx other than 429 fails fast. |
| **Idempotency-Key header** | Forwarded on every write. Retries don't create duplicate resources upstream. |
| **Circuit breaker** | 3 consecutive failures opens the breaker for 10 minutes. While open, calls short-circuit in microseconds with a synthetic failure — no thundering herd against a dead endpoint. Half-open lets one probe through; success closes, failure re-opens. |
| **Webhook signature + timestamp** | HMAC-SHA256 verification with constant-time comparison + ±5 minute freshness window blocks replays of stolen payloads. |
| **Two-phase booking ingestion** | Stage in webhook request, promote async — webhook response is never blocked by slow Yatra-side booking creation. |
| **Pessimistic lock on promotion** | `SELECT ... FOR UPDATE` on the trip availability row prevents simultaneous overbooking across channels. |
| **Sync log retention** | 90 days of audit data, auto-purged. Survives module re-enables. |

## REST API

| Endpoint | Verb | Purpose |
| --- | --- | --- |
| `/yatra/v1/channel-manager/meta` | GET | Eligibility + supported channel types + webhook URL template. |
| `/yatra/v1/channel-manager/channels` | GET / POST | List / create channels. |
| `/yatra/v1/channel-manager/channels/{id}` | GET / PUT / DELETE | Read / update / delete one channel. |
| `/yatra/v1/channel-manager/channels/{id}/credential` | PUT | Set or clear one credential (api_key, webhook_secret). |
| `/yatra/v1/channel-manager/channels/{id}/test-connection` | POST | Probe the OTA's auth endpoint. |
| `/yatra/v1/channel-manager/channels/{id}/test-webhook` | POST | Send a signed synthetic webhook to your own receiver. |
| `/yatra/v1/channel-manager/channels/{id}/sync` | POST | Sync every active mapping for this channel now. |
| `/yatra/v1/channel-manager/channels/{id}/health` | GET | Health snapshot — status + breaker state + last-N log counts. |
| `/yatra/v1/channel-manager/mappings` | GET / POST | List / create mappings. |
| `/yatra/v1/channel-manager/mappings/{id}` | PUT / DELETE | Update / delete one mapping. |
| `/yatra/v1/channel-manager/mappings/{id}/sync` | POST | Push this single mapping now. |
| `/yatra/v1/channel-manager/mappings/bulk` | POST | Bulk `sync` / `enable` / `disable` / `delete` action. |
| `/yatra/v1/channel-manager/bookings` | GET | List staged inbound bookings. |
| `/yatra/v1/channel-manager/logs` | GET | Sync log with filters. |
| `/yatra/v1/channel-manager/reconciliation` | GET | Reconciliation snapshot across every channel. |
| `/yatra/v1/channel-manager/latency` | GET | Per-channel + per-provider + global latency percentiles. |
| `/yatra/v1/channel-manager/webhook/{channel_id}` | POST | Public webhook receiver (Viator) — **always available** even when the module is disabled, gated by signature + (optional) IP allowlist + rate limit. |
| `/yatra/v1/channel-manager/channels/{id}/gyg-credentials` | POST | Show (`reveal`) or replace (`rotate`) the username and password GetYourGuide uses to call your site. |
| `/yatra/v1/gyg/1/get-availabilities` | GET | GetYourGuide Supplier API: availability. |
| `/yatra/v1/gyg/1/reserve` · `/1/cancel-reservation` · `/1/book` · `/1/cancel-booking` | POST | GetYourGuide Supplier API: holds, bookings and cancellations. |
| `/yatra/v1/gyg/1/notify` | POST | GetYourGuide notifications (logged in Sync activity). |
| `/yatra/v1/gyg/1/suppliers/{supplierId}/products` · `/1/products/{productId}` · `/1/products/{productId}/pricing-categories` · `/1/products/{productId}/addons` | GET | GetYourGuide Supplier API: product list, details, pricing categories and add-ons. |

The `/yatra/v1/gyg/…` endpoints use HTTP Basic auth with the credentials Yatra generated for the channel (not a WordPress login), always answer HTTP 200 in GetYourGuide's format, and only answer while the Channel Manager module is on, the plan is Scale and the GetYourGuide channel is enabled.

The admin endpoints require `manage_options` + Scale-active license + module enabled. See [REST API reference](/api-reference#pro-modules-additional-routes) for the full schema.

## Hooks & filters

| Hook | Purpose |
| --- | --- |
| `yatra_channel_manager_channel_types` (filter) | Add or replace supported OTA adapters. Return an array of channel type definitions; each must reference a class implementing `ProviderInterface`. |
| `yatra_booking_cancelled` (action) | Fires when a channel webhook cancels a Yatra booking. Listen here for refund automation. |
| `yatra_booking_modified` (action) | Fires when a channel webhook modifies a Yatra booking. |
| `yatra_module_active` (action, slug=`channel_manager`) | Fires the moment the module is toggled on — installs the database schema. |
| `yatra_module_deactive` (action, slug=`channel_manager`) | Fires when toggled off — unschedules the sync cron. **Does not** drop data tables. |
| `yatra_channel_manager_webhook_rate_limit` (filter) | Override the 100-per-minute inbound webhook rate limit. Set to `0` to disable rate limiting (not recommended). |
| `yatra_channel_manager_webhook_ip_allowlist` (filter) | Site-wide IP allowlist for inbound webhooks. Unioned with per-channel allowlists. |
| `yatra_trusted_proxy_cidrs` (filter) | Tell the IP allowlist which proxies are trusted to forward `X-Forwarded-For`. |
| `yatra_cm_inventory_stale_seconds` (filter) | Override the 24-hour staleness threshold used in the Reconciliation report. |
| `yatra_cm_latency_max_samples` (filter) | Override the 5,000-sample cap for percentile calculation in the Latency report. |
| `yatra_gyg_notify_url` (filter) | Change the GetYourGuide `notify-availability-update` URL (for example a different sandbox path). Receives the URL and the channel. |
| `yatra_gyg_redeem_url` (filter) | Change the GetYourGuide `redeem-booking` URL. Receives the URL and the channel. |

## Privacy

- Customer data flows directly between your WordPress and the OTA. No proxying through Yatra-owned infrastructure.
- Credentials are encrypted at rest with libsodium AEAD; decrypted just-in-time per request.
- Webhook bodies are logged (capped at 16 KB) for forensic review when signature verification fails.
- Sync logs purge after 90 days automatically.

## Overbooking: what the module prevents, and what it can't {#overbooking-what-the-module-prevents-and-what-it-can-t}

This is the most-asked question by operators, so it deserves an honest answer. The Channel Manager *significantly* reduces overbooking risk — but it does not make it physically impossible.

**What the module prevents reliably:**

- Two channels (e.g. GetYourGuide and your direct site) trying to confirm the last seat at the *exact same instant* — Yatra's last-seat lock briefly locks the date while it records an OTA booking (or a GetYourGuide hold) so only one wins.
- Inventory drifting between channels because of manual updates — Yatra pushes the new seat count to every connected OTA within ~30 seconds of any booking, availability or departure change.
- A booking that arrived on an OTA being missed if a webhook is dropped — the hourly safety-net pull re-fetches the last 24 hours of bookings on every channel.

**What can still cause an overbooking, even with the module on:**

- An OTA approves a booking on its side and queues the notification, but doesn't deliver it for several minutes (some OTAs batch notifications). During that gap your direct site doesn't yet know seats are sold and could confirm another booking.
- A staff member edits a seat count manually in the OTA's own dashboard, bypassing Yatra. Yatra's next push will correct it, but anything booked in the meantime is on its own.
- A booking is taken over the phone and entered late.

**What we recommend:**

- Keep a 1–2 seat **inventory buffer** on every channel mapping (set in the Pricing & inventory rules card). This is your cushion against the gap window above.
- Watch the **Latency report** weekly — if an OTA's p95 sync time creeps above a minute, your real-world risk window widens. We've seen this be the early warning sign before an OTA partner outage.
- For your highest-margin trips, consider listing them with a slightly reduced max seat count on OTAs vs. your direct site so the last 1–2 seats are direct-site-only.

## Troubleshooting

**"Channel Manager" doesn't appear in the sidebar** — verify (1) your license is Scale on the License page, (2) the module is toggled on under Modules. Starter / Growth plans show the upgrade card under <span class="screen-path">Yatra → Channel Manager</span> but no sidebar menu.

**GetYourGuide self-tests fail with `AUTHORIZATION_FAILURE`** — the username or password in the Integrator Portal doesn't match the **Connect GetYourGuide to this site** card, or the channel isn't **Enabled**. Some hosts strip the `Authorization` header before it reaches WordPress; ask your host to pass it through.

**GetYourGuide sees no availability** — check that the trip is mapped, the mapping is active, the Channel product ID matches GetYourGuide exactly, the trip has departures with free places in the requested range, and the dates are outside their booking cutoff. The inventory buffer is subtracted from every departure.

**GetYourGuide Test connection fails** — paste the username and password GetYourGuide shows for **its** API (not the ones Yatra generated) into the Credentials card.

**"On hold" GetYourGuide bookings** — these are 60-minute holds while a customer checks out on GetYourGuide. They turn into confirmed bookings or are removed automatically; don't edit them.

**"Failed to create channel: Table doesn't exist"** — this was a bug fixed in module v1.0.1. The schema is now created synchronously on module toggle-on. If you're seeing it, refresh the admin page once — the safety-net hook will install the tables.

**Test connection: `401 Unauthorized`** — API key wrong or revoked. Re-paste from the partner portal. Check sandbox vs. production keys aren't mixed up.

**Test webhook: `signature_failed`** — Webhook Signing Secret on Yatra-side doesn't match what the OTA expects. Some OTAs let you regenerate; some pin it permanently.

**Test webhook: `stale_timestamp`** — your server clock is more than ±5 minutes off real time. Run `ntpdate` or check `date` against a public time source.

**Bookings stuck in `received` for hours** — promotion cron isn't running. Visit `/wp-cron.php?doing_wp_cron` once to manually flush the queue, then set up a real system cron (recommended for any production WordPress).

**Pushes silently skipped (`circuit_open` in logs)** — the OTA failed 3+ times consecutively. The breaker auto-recovers after 10 minutes; or click **Test connection** in the channel form which resets the breaker on a successful probe.

**Customer name imports as "First Lastname-Suffix"** — the OTA didn't send structured first/last fields and the fallback split used the full name string. Compound surnames ("van der Berg") are preserved — only edge cases where the OTA itself sends an unusual combined-name shape mis-parse. The customer record can be edited in <span class="screen-path">Yatra → Customers</span> after promotion.

**Overbooked across two channels** — should not happen with the pessimistic lock active; if it does, file a support ticket with the two booking IDs and the channel IDs so we can examine the race. As a remedy: refund one customer + reach out manually. The OTA already accepted the payment so the Yatra side is downstream of the conflict.

## Useful links

- [Settings → Advanced → Debug mode](/settings#_13-advanced) — captures provider request/response pairs for support tickets.
- [Hooks & filters](/hooks-filters#pro-channel-manager-getyourguide) — full filter signatures + invocation order.
- [REST API](/api-reference#pro-modules-additional-routes) — endpoint schemas.
- [GetYourGuide Integrator Portal documentation](https://integrator.getyourguide.com/documentation/overview)
- [Viator supplier API docs](https://docs.viator.com/supplier-api/technical/)

## Where to read more

- [All modules](/modules#channel-manager) — module catalog.
- [White Label](/modules/white-label) — Scale-only deeper rebrand.
- [AI Assistant](/modules/ai-assistant) — Growth/Scale content generation.
