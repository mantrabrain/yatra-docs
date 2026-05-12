---
title: Facebook Pixel
description: Step-by-step setup for the Yatra Pro Facebook Pixel module — create a Meta Pixel, enable Conversions API for server-side tracking, generate an access token, and verify events in Meta Events Manager.
prev:
  text: Mailchimp
  link: /modules/mailchimp
next:
  text: Google Analytics
  link: /modules/google-analytics
---

# Facebook Pixel <span class="pro-pill">PRO</span>

![Yatra Settings → Integration → Facebook Pixel panel](/screenshots/modules/facebook-pixel-settings.webp)

Track booking funnel events in **Meta Events Manager** — `ViewContent`, `InitiateCheckout`, `Purchase` — both **browser-side** (via the standard pixel snippet) and **server-side** (via Meta's **Conversions API**, so events still register when an ad-blocker strips the browser tag).

## What you'll need

| Thing                          | Where to get it                                                                                  |
| ---                            | ---                                                                                              |
| A Meta Business account        | <https://business.facebook.com/> — free.                                                         |
| A **Pixel** in Meta Events Manager | Events Manager → Connect Data Sources → Web → Pixel. Walk-through below.                      |
| (Optional) **Conversions API access token** | Events Manager → your pixel → Settings → Conversions API → *Generate access token*.    |
| Yatra Pro license + Facebook Pixel module enabled | <span class="screen-path">Yatra → License</span> + <span class="screen-path">Yatra → Modules → Facebook Pixel</span>. |

::: tip Don't have a pixel yet?
Meta's setup wizard: <https://www.facebook.com/business/help/952192354843755>. Takes ~3 minutes — name the pixel after your site (e.g. `yourshop-pixel`).
:::

## Step 1 — Find your Pixel ID

1. Sign in at <https://business.facebook.com/events_manager>.
2. From the left rail pick **Data sources**.
3. Click your pixel row.
4. The **Pixel ID** is the 15-or-16-digit number under the pixel name at the top of the page. Copy it.

(If you have multiple pixels for the same site, pick the one **dedicated to bookings** — don't share it with a separate WooCommerce or campaign-landing-page pixel.)

## Step 2 — (Optional but recommended) Generate a Conversions API token

This step enables **server-side** tracking — events fire from your WordPress server, not the browser, so ad-blockers can't strip them.

1. Still in Events Manager, on your pixel's page, click the **Settings** tab.
2. Scroll to **Conversions API → Set up manually → Generate access token**.
3. Click **Generate access token**. Meta shows the token **once** — it's a very long base64-like string.
4. Copy it and save it somewhere safe.

::: warning Token rotation
The token never expires by default but you can rotate it any time from the same screen. Yatra reads it on every request, so updating the value here is enough — no plugin reload needed.
:::

## Step 3 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Facebook Pixel** → toggle on.
3. Reload — the Integration settings panel appears.

## Step 4 — Configure in Yatra

Open <span class="screen-path">Yatra → Settings → Integration → Facebook Pixel</span>.

| Field                            | Setting ID                       | What to put                                                                                          |
| ---                              | ---                              | ---                                                                                                  |
| **Pixel ID**                     | `facebook_pixel_id`              | The 15–16-digit number from Step 1.                                                                  |
| **Track `ViewContent`**          | `fb_track_view_content`          | Fires when a visitor lands on a trip page.                                                           |
| **Track `InitiateCheckout`**     | `fb_track_initiate_checkout`     | Fires when the customer clicks *Book Now* and lands on the checkout page.                            |
| **Track `Purchase`**             | `fb_track_purchase`              | Fires on successful payment. **Critical** for Ads ROAS reporting and lookalike-audience seeding.    |
| **Use Conversions API**          | `fb_use_conversions_api`         | Adds server-side event posting alongside the browser pixel. Recommended.                             |
| **Conversions API access token** | `facebook_access_token`          | The token from Step 2. Shown only when *Use Conversions API* is on. Treat as a password.            |

## Step 5 — Verify in Events Manager

Meta provides a **Test Events** tab where you can watch live events.

1. Open <https://business.facebook.com/events_manager> → your pixel → **Test Events** tab.
2. Copy the **Test Event Code** Meta shows at the top (looks like `TEST12345`).
3. In your private browser window, append `?fbtest=THE_CODE` to your site URL — Yatra reads it and tags every event with that code so it shows in the Test Events tab.
4. Visit a trip page → `ViewContent` should appear within ~5 seconds.
5. Click **Book Now** → `InitiateCheckout` appears.
6. Complete a test booking → `Purchase` appears with the booking total.
7. If you also enabled Conversions API: the event row shows **two** processing methods — *Browser* and *Server*. They should match.

::: tip Deduplication
When you send the same event from browser AND server, Meta deduplicates using `event_id`. Yatra emits a deterministic `event_id` per booking, so duplicate `Purchase` events from race conditions still count as one.
:::

## What each event carries

| Event              | Key parameters                                                                  |
| ---                | ---                                                                             |
| `ViewContent`      | `content_ids` (trip ID), `content_name` (trip title), `content_type=product`, `currency`, `value` |
| `InitiateCheckout` | Same as above + `num_items` (traveler count)                                    |
| `Purchase`         | Same + `event_id` (booking number), `value`, `currency`, `num_items`            |

For Conversions API events Yatra also sends hashed customer email + phone (SHA-256, in line with Meta's matching requirements) so Meta can attribute the conversion to a Facebook user.

## Troubleshooting

**Events show only as `Browser`, never `Server`** — your access token is missing or invalid. Generate a fresh one and paste it again.

**Pixel works in your private window but not in production** — an ad blocker is stripping the browser tag. Turn on **Use Conversions API** so the server fallback fires.

**`Purchase` events don't carry a `value`** — your trip has no price. Set one in the Trip Builder → Pricing section.

**Doubled events in Meta** — another plugin (PixelYourSite, Woo Pixel, etc.) is also emitting events. Disable one of them.

**iOS / Safari blocks** — Safari aggressively strips third-party cookies; the Conversions API server-side path bypasses this entirely. Make sure it's on.

**"Pixel could not be verified"** — happens when Meta's crawler can't reach a published page. Make sure at least one trip page is publicly accessible and the pixel snippet renders. Use the *Live* tab in Events Manager to watch the crawler hit your URL.

## Useful links

- Meta Events Manager: <https://business.facebook.com/events_manager>
- Set up a Meta Pixel (official): <https://www.facebook.com/business/help/952192354843755>
- Conversions API documentation: <https://developers.facebook.com/docs/marketing-api/conversions-api>
- Test Events feature: <https://www.facebook.com/business/help/441037125925189>
- Hashing customer data (CAPI requirement): <https://developers.facebook.com/docs/marketing-api/audiences/guides/custom-audiences-format>

## Where to read more

- [All modules](/modules#facebook-pixel) — module catalog.
- [Settings → Integration](/settings#_10-integration) — every field reference.
- [Google Analytics 4](/modules/google-analytics) — the GA4 equivalent for ecommerce tracking.
