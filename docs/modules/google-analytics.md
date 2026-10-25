---
title: Google Analytics 4 Enhanced
description: Step-by-step setup for the Yatra Pro GA4 module — find your Measurement ID, enable Measurement Protocol, verify view_item / begin_checkout / purchase events in DebugView.
prev:
  text: Facebook Pixel
  link: /modules/facebook-pixel
next:
  text: Flexible Payments
  link: /modules/flexible-payments
---

# Google Analytics 4 Enhanced <span class="pro-pill">PRO</span>

![Yatra Settings → Integration → Google Analytics panel](/screenshots/modules/google-analytics-settings.webp)

Track every interaction on your trip pages and checkout — `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `refund` — as **GA4 ecommerce events**. Send them browser-side via gtag.js and (optionally) server-side via the **Measurement Protocol** for accurate purchase tracking even when ad-blockers strip the browser tag.

## What you'll need

| Thing                                                | Where to get it                                                                                  |
| ---                                                  | ---                                                                                              |
| A Google account                                     | <https://accounts.google.com/>                                                                   |
| A **Google Analytics 4** property (NOT Universal Analytics) | <https://analytics.google.com/> — *Admin → Create → Property*. UA was sunset July 2023.    |
| A **Web data stream** inside the property            | Admin → Data Streams → Web                                                                      |
| Yatra Pro license + GA4 module enabled               | <span class="screen-path">Yatra → License</span> + <span class="screen-path">Yatra → Modules → Google Analytics 4 Enhanced</span>. |

::: tip Don't have GA4 yet?
Follow Google's getting-started guide: <https://support.google.com/analytics/answer/9744165>. The whole sign-up takes ~5 minutes.
:::

## Step 1 — Find your Measurement ID

1. Sign in at <https://analytics.google.com/>.
2. Click the gear icon (bottom-left) to open **Admin**.
3. In the **Data Collection and Modification** column → **Data streams**.
4. Click the row of the web stream that points at your Yatra site.
5. Copy the **Measurement ID** at the top right of the panel — it looks like `G-XXXXXXXXXX`.

For visual reference, see Google's own walkthrough: <https://support.google.com/analytics/answer/9539598>.

## Step 2 — (Optional) Create a Measurement Protocol API secret

This step is **only needed if you want server-side tracking** (recommended — bypasses ad blockers).

1. In the same Web stream details panel, scroll to **Events → Measurement Protocol API secrets**.
2. Click **Create**.
3. Nickname it `Yatra YOUR-SITE-NAME`. Click **Create**.
4. Copy the **Secret value** — looks like a 22-character string. Save it.

You'll paste this into Yatra alongside the Measurement ID.

## Step 3 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Google Analytics 4 Enhanced** → toggle on.
3. Reload to surface the settings panel.

## Step 4 — Configure in Yatra

Open <span class="screen-path">Yatra → Settings → Integration → Google Analytics 4</span> and fill in:

| Field                              | Setting ID                          | What to put                                                                       |
| ---                                | ---                                 | ---                                                                               |
| **Measurement ID**                 | `ga4_measurement_id`                | `G-XXXXXXXXXX` from Step 1.                                                       |
| **Track `view_item`**              | `ga4_track_view_item`               | Fires when a customer views a trip page.                                          |
| **Track `add_to_cart`**            | `ga4_track_add_to_cart`             | Fires when the customer hits **Book Now**.                                       |
| **Track `begin_checkout`**         | `ga4_track_begin_checkout`          | Fires when the customer reaches the payment step.                                |
| **Track `purchase`**               | `ga4_track_purchase`                | Fires on successful payment. **Critical** for revenue reports.                   |
| **Use Measurement Protocol**       | `ga4_use_measurement_protocol`      | Also sends `begin_checkout` and `purchase` from the server, so purchases are recorded even when an ad blocker stops the browser tag. Respects cookie consent — see [Cookie consent](#cookie-consent-server-side-events). |
| **Debug mode**                     | `ga4_debug_mode`                    | Sends `debug_mode=1` with every event so events show in GA4 **DebugView**.       |
| **API secret**                     | `ga4_api_secret`                    | The Measurement Protocol secret from Step 2. Shown only when *Use Measurement Protocol* is on. |

::: tip Currency and amounts
GA4 events include `currency` and `value` automatically — defaults to your site currency from [Settings → Currency](/settings#_9-currency). Yatra always uses the booking's actual currency, not the visitor's locale.
:::

## Step 5 — Verify in DebugView

DebugView is GA4's live event console.

1. In Yatra, turn on **Debug mode** (Step 4).
2. In a private browser window, install the free **GA Debugger** Chrome extension OR add `?debug_mode=1` to your URL.
3. Visit your site → trip page → click **Book Now** → start checkout (you can stop before paying).
4. In GA4, open **Admin → DebugView** (the URL pattern is `https://analytics.google.com/analytics/web/#/p<PROPERTY_ID>/admin/debug-view`).
5. You should see `view_item`, `add_to_cart`, and `begin_checkout` flowing in within ~30 seconds.
6. Complete a test booking (free / test gateway) — `purchase` should appear with the correct `value` and `currency`.

::: warning Real-time vs DebugView
Don't confuse **Realtime** with **DebugView**. Realtime samples a subset of traffic and lags 30 seconds. DebugView shows *only* events tagged with `debug_mode=1` but in true real time.
:::

## Cookie consent (server-side events)

The browser tag is controlled by your consent banner, but server-side events go straight from your server to Google, so a banner or script blocker can't stop them. From the next release, Yatra Pro checks consent itself before sending any server-side event:

- **With [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) installed**, an event is sent only when the visitor has granted **statistics** consent. Consent tools that support it include WPConsent, Complianz and CookieYes.
- **Without WP Consent API**, server-side events are sent as before.
- **Purchases confirmed by the payment provider** follow the choice the visitor made **at checkout**. Yatra saves that choice, plus the visitor's Google Analytics IDs, when the booking is created. A payment confirmed later by a gateway callback, which carries no visitor cookies, therefore respects that choice and stays in the visitor's own session. A visitor who declined is never sent.
- Developers can allow or block any server-side event with the [`yatra_ga4_send_server_event`](/hooks-filters#pro-google-analytics-4) filter.

Google's Measurement Protocol can't carry an analytics-consent signal, so not sending the event is the only correct behaviour when consent is missing.

::: tip Using WPConsent?
Install the free **WP Consent API** plugin next to it. WPConsent shares the visitor's choice with other plugins only through WP Consent API, so without it Yatra Pro can't see that choice on the server. Also check that **Google Consent Mode** is on in WPConsent, with Google Analytics in its services list, or that Consent Mode is enabled in Site Kit. Otherwise no Consent Mode defaults are set for the Google tag.
:::

Yatra's Google tag loads at the normal `wp_head` priority, after consent plugins have set Google Consent Mode defaults (Google requires the defaults before the tag's `config` call).

## How duplicate events are avoided

With **Use Measurement Protocol** on, from the next release:

| Event             | Sent by                                                                         |
| ---               | ---                                                                             |
| Page views        | Browser tag only.                                                               |
| `view_item`       | Browser tag only.                                                               |
| `add_to_cart`     | Browser tag only.                                                               |
| `begin_checkout`  | Server only.                                                                    |
| `purchase`        | Both, as one sale. The two carry the same `transaction_id`, booking total and visitor ID, so GA4 merges them. The server one is sent once per booking: a deposit and its balance are one purchase, not two. |

Keep any other GA4 snippet off. If Site Kit's own GA4 snippet were also on, every page view would be counted twice.

## What each event carries

| Event             | Key parameters                                                                  |
| ---               | ---                                                                             |
| `view_item`       | `item_id` (trip ID), `item_name` (trip title), `item_category`, `price`, `currency` |
| `add_to_cart`     | Same as above + `quantity` (number of travelers)                                |
| `begin_checkout`  | Same + `value` (running total)                                                  |
| `purchase`        | Same + `transaction_id` (booking number), `tax`, `value`, full `items` array    |
| `refund`          | `transaction_id` of the refunded booking + amount                               |

## Troubleshooting

**No events in DebugView** — Debug mode in Yatra is off, OR the GA4 Chrome extension isn't installed in your test browser. Both produce the same symptom (events go to the *Realtime* report instead).

**`purchase` events but no `value`** — your trip has no price set, or the booking total is zero. GA4 needs `value` to compute revenue.

**Doubled events** — another GA4 tag is running alongside Yatra's: an old `gtag` snippet in your theme, or Site Kit's own GA4 snippet. Remove manual snippets and turn off Site Kit's snippet, and let Yatra emit the events. On releases before the consent and duplicate fixes, `view_item` and `add_to_cart` were also sent twice with **Use Measurement Protocol** on; update Yatra Pro.

**Server-side events not sent** — the visitor hasn't granted statistics consent (see [Cookie consent](#cookie-consent-server-side-events)). The event log shows *Not sent: no analytics consent*.

**Measurement Protocol returns 4xx** — usually a wrong API secret. Regenerate it and paste fresh. Check `wp-content/uploads/yatra/ga4-debug.log` (created when [Settings → Advanced → Debug mode](/settings#_13-advanced) is on).

**Conversions don't show in Google Ads** — `purchase` events become conversions only after you mark them as such in **Admin → Events → mark as Conversion**.

## Useful links

- GA4 dashboard: <https://analytics.google.com/>
- Set up GA4 for the first time: <https://support.google.com/analytics/answer/9744165>
- Measurement Protocol reference: <https://developers.google.com/analytics/devguides/collection/protocol/ga4>
- DebugView help: <https://support.google.com/analytics/answer/7201382>
- Mark events as conversions: <https://support.google.com/analytics/answer/12844695>

## Where to read more

- [All modules](/modules#google-analytics-4-enhanced) — module catalog.
- [Settings → Integration](/settings#_10-integration) — every field reference.
- [Facebook Pixel](/modules/facebook-pixel) — pair browser + server tracking with Meta as well.
