---
title: Facebook Pixel
description: Drop the Facebook Pixel on every page and fire the standard e-commerce events.
prev:
  text: Mailchimp
  link: /modules/mailchimp
next:
  text: Google Analytics
  link: /modules/google-analytics
---

# Facebook Pixel <span class="pro-pill">PRO</span>

Drops the **Facebook Pixel** on every page of your site (both Yatra and non-Yatra pages) and fires the standard e-commerce events at the right booking-flow moments — so Meta Ads can build retargeting audiences and optimise for conversions.

## What problem it solves

Without a structured Pixel integration you'd either install a generic Pixel plugin (which doesn't know about Yatra's flow) or hand-write events across the React app. This module wires the Pixel into Yatra's existing booking-lifecycle hooks.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Facebook Pixel</span>.
2. Configure under <span class="screen-path">Yatra → Settings → Integration → Facebook Pixel</span>.

## Configure

1. **Pixel ID** — paste the 15-digit ID from your Meta Events Manager.
2. **Conversions API token** (optional, recommended) — paste the access token to enable server-side event sending. Closes the iOS 14.5 / browser-blocker gap.
3. **Events to send** — toggles for each standard event:
   - `ViewContent` (single trip page).
   - `Search` (trip listing with filters).
   - `AddToCart` (booking form opened).
   - `InitiateCheckout` (payment step entered).
   - `Purchase` (booking confirmed).

## Test mode

Toggle **Test events** on while validating in Meta's Test Events tool. Events fire with a `test_event_code` so you don't pollute production data.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_facebook_pixel_event_data`                 | filter  | Mutate the event payload before send.                    |
| `yatra_facebook_pixel_should_fire`                | filter  | Return `false` to skip a particular event.               |
