---
title: Google Analytics
description: GA4 measurement ID + GA4 e-commerce events for the booking flow.
prev:
  text: Facebook Pixel
  link: /modules/facebook-pixel
next:
  text: Flexible Payments
  link: /modules/flexible-payments
---

# Google Analytics <span class="pro-pill">PRO</span>

Installs the **GA4 measurement tag** and fires the standard GA4 e-commerce events (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`) at the matching points in the Yatra booking flow.

## What problem it solves

GA4's e-commerce reports — funnel, top-converting trips, cart abandonment — only work if the right events fire with the right `items` payload. Generic GA plugins drop the tag but don't know which Yatra event maps to which GA event. This module wires it correctly out of the box.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Google Analytics</span>.
2. Configure under <span class="screen-path">Yatra → Settings → Integration → Google Analytics</span>.

## Configure

1. **GA4 Measurement ID** — `G-XXXXXXXXXX` from your GA4 property's Data Streams page.
2. **Server-side events** (optional) — paste your **API secret** to also fire events via the GA4 Measurement Protocol. Useful when ad-blockers stop client-side gtag.
3. **Currency** — defaults to your site currency from [Settings → Currency](/settings#9-currency).
4. **Send events** — toggles for each standard e-commerce event.

## Event mapping

| GA4 event           | Yatra trigger                                                |
| ---                 | ---                                                          |
| `view_item`         | Single trip page render (front-end).                         |
| `select_item`       | Click on a trip card in a listing.                           |
| `add_to_cart`       | Booking form first step opened.                              |
| `begin_checkout`    | Payment step reached.                                        |
| `add_payment_info`  | Payment method selected.                                     |
| `purchase`          | Booking confirmed (after payment success).                   |
| `refund`            | Payment refunded via the [Payments admin](/payment-settings#refunds). |

Each event ships the `items` array with `item_id` (trip slug), `item_name`, `item_category` (destination), `price`, and `quantity` (traveler count).

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_google_analytics_event_params`             | filter  | Mutate event params before send.                         |
| `yatra_google_analytics_should_fire`              | filter  | Return `false` to skip an event.                         |
