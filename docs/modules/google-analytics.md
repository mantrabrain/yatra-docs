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
| **Use Measurement Protocol**       | `ga4_use_measurement_protocol`      | Adds a server-side post on every event in addition to the browser tag. Recommended. |
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

**Doubled events** — you've left an old `gtag` snippet in your theme. Remove any manual GA4 snippets and let Yatra emit them.

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
