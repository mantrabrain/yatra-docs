---
title: WooCommerce & co-existence
description: How Yatra runs alongside WooCommerce on the same WordPress site, plus notes on caching, multilingual, multisite, and common conflicts.
---

# WooCommerce & co-existence

Yatra is intentionally **not** built on top of WooCommerce. The free plugin ships its own native cart, checkout, gateways, bookings, and discounts — so a single trip is one click from "publish" to "sell" without bolting on another commerce stack.

That said, plenty of sites already run WooCommerce for physical products, gift cards, or merch. Yatra **co-exists** with WooCommerce on the same site. This page is the practical guide to making them play nicely.

## Mental model

- **WooCommerce** sells products, carts, shipping, and taxes for shippable / digital goods.
- **Yatra** sells trips, bookings, traveler details, departures, and the operational tour-operator workflow.

You'll have two checkouts — one for Woo products, one for Yatra trips — each with its own customer / order tables, gateway configs, and email templates.

## Should I use Woo for trips too?

Short answer: **no, not unless you have a specific reason**.

| Situation                                                     | Recommendation                                       |
| ---                                                           | ---                                                  |
| Most of your revenue is trips                                 | Use **Yatra checkout** (built for trips, traveler details, departures). |
| You sell physical merch *and* trips                            | Either works; pick the cart with the most SKUs.      |
| You need **Yatra's traveler-category pricing**, deposits, or departures | **Yatra checkout** — Woo doesn't model these natively. |
| You need exotic shipping / tax / Woo extensions               | Use Woo for *those* SKUs; Yatra for trips.           |

## Two-checkout site

A typical co-existing site has:

- `/shop/` — Woo product catalog.
- `/cart/`, `/checkout/`, `/my-account/` — Woo virtual pages.
- `/trips/` — Yatra catalog.
- `/booking/`, `/my-account/` — Yatra virtual pages.

**Slug collision risk:** Woo also uses `/my-account/`. Two safe configurations:

1. **Yatra wins** — leave Yatra at `/my-account/`. Move Woo to `/shop-account/`.
2. **Woo wins** — rename Yatra's account page to `/my-bookings/`. Leave Woo at `/my-account/`.

Pick one strategy and stick to it. Don't try to share `/my-account/` between both — customer routing gets miserable.

## Account pages

Two account pages is normal:

- `/my-account/` — Woo (orders, addresses, downloads, subscriptions).
- `/my-bookings/` — Yatra (bookings, traveler details, payments, profile).

Add cross-links from each to the other so customers don't get lost.

## Single sign-on

Yatra uses standard WordPress users. A user buying via Woo *and* booking via Yatra is the same WP user — their orders and bookings are linked automatically.

## Cross-selling

If a Woo product becomes a trip-discount voucher, hook into Woo's payment-complete and apply a Yatra coupon programmatically:

```php
add_action('woocommerce_payment_complete', function ($order_id) {
    $order = wc_get_order($order_id);
    foreach ($order->get_items() as $item) {
        if ($item->get_product_id() === 1234) {
            // Issue or attach a Yatra coupon to the customer
            do_action('yatra_grant_coupon_to_customer', $order->get_user_id(), 'WELCOME10');
        }
    }
});
```

## Caching

Standard advice — exclude:

- `/booking/`, `/my-account/`, `/my-bookings/`
- `/wp-json/*` (especially `/yatra/v1/checkout/*` and `/yatra/v1/me/*` routes)
- Logged-in cookies on trip-detail pages (Wishlist state)

## Plugins that often conflict (and the fix)

| Plugin                                               | Symptom                                | Fix                                          |
| ---                                                  | ---                                    | ---                                          |
| Heavy CSS frameworks (Avada, Total)                  | Trip card layout shifts                | Override `partials/trip-card.php` in your child theme. |
| Aggressive minifiers (Autoptimize)                   | React admin shell breaks               | Exclude `/wp-admin/` from minification.       |
| Login redirect plugins                               | Yatra account access fails             | Whitelist `?yatra_action=`.                   |
| Membership plugins (MemberPress, Restrict Content Pro)| Lock Yatra's `/my-account/`           | Add Yatra pages to the plugin's exclusion list. |
| 2FA / SSO plugins                                    | Account creation at checkout fails     | Whitelist `yatra_*` actions.                  |

## Multisite

Yatra is `Network: true`. Each subsite gets its own data. License activation is per-subsite (one slot each by default).

## What's next

- [Payments](/payment-settings) — gateway setup.
- [Pro modules](/third-party-integrations).
- [Troubleshooting](/troubleshooting).
