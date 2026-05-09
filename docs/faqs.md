---
title: FAQs
description: Frequently asked questions about Yatra — Free vs Pro, payments, currencies, multilingual, GDPR, multisite, and the most-asked tour-operator questions.
---

# Frequently asked questions

## General

### What is Yatra?

A WordPress plugin built specifically for **tour operators**, **travel agents**, and **activity providers**. The free plugin ships a complete booking office — trips, departures, customer accounts, native checkout, enquiries, and the email pipeline. Yatra Pro adds licensed modules (gateways, dynamic pricing, deposits, automation, analytics).

### Is Yatra free?

Yes. The free plugin gives you everything you need to run a real tour-operator booking office.

**Yatra Pro** is a separate plugin that unlocks licensed modules. See [Pro modules](/third-party-integrations).

### Do I need coding skills?

No for day-to-day trip building. Developers can extend Yatra with [hooks and filters](/hooks-filters) and the [REST API](/api-reference).

### What's the difference between Yatra and Yatra Pro?

Yatra is the free plugin. Yatra Pro is a separate plugin that requires Yatra to be installed first. Pro unlocks licensed modules and premium gateways.

### What URLs does Yatra create?

| URL                | What it shows                              |
| ---                | ---                                        |
| `/trips/`          | Public trip catalog                        |
| `/{trip-slug}/`    | Single trip page                           |
| `/destination/`    | Destinations archive                       |
| `/activity/`       | Activities archive                         |
| `/trip-category/`  | Trip categories archive                    |
| `/booking/`        | Booking flow / cart                        |
| `/my-account/`     | Customer account                           |

You can rename any slug under <span class="screen-path">Yatra → Settings → Permalink</span>.

## Compatibility

### Does Yatra work with any WordPress theme?

Yes — designed for broad theme compatibility. If layouts clash, briefly switch to a default theme (Twenty Twenty-Five) to isolate theme CSS. You can override any Yatra template by copying it from `wp-content/plugins/yatra/templates/` to `wp-content/themes/{theme}/yatra/`.

### Does Yatra work with the block editor?

Yes — Yatra ships native Gutenberg blocks for trips, destinations, activities, trip categories, search, and account. See [Blocks & page builders](/elementor-integration).

### Does Yatra work with Elementor / Divi / Bricks / Oxygen?

Yes — all of them. Use a Posts widget targeting the `trip` post type, plus a Shortcode widget for catalog or search forms.

### Can I use WooCommerce instead?

The free core emphasizes native trip checkout for speed and clarity. WooCommerce can run **alongside** Yatra — see [WooCommerce co-existence](/woocommerce-integration).

### Is Yatra multisite compatible?

Yes — `Network: true`. Each subsite has its own data.

## Selling trips

### How do I sell trips?

<ol class="step-list">
  <li>Create a trip, set a price.</li>
  <li>Connect <strong>PayPal</strong> or <strong>Pay Later</strong> (free), or <strong>Stripe / Razorpay / Mollie / Paystack / Square / Authorize.Net / Bank Transfer</strong> <span class="pro-pill">PRO</span> under <span class="screen-path">Yatra → Settings → Payment</span>.</li>
  <li>Run a test transaction with sandbox keys.</li>
  <li>Switch to live keys.</li>
</ol>

See [Payments](/payment-settings) for the full guide.

### What payment gateways does the free plugin support?

**PayPal** (Simple email-IPN or REST modes) and **Pay Later** are fully working in the free core. Pro adds **Stripe**, **Razorpay**, **Mollie**, **Paystack**, **Square**, **Authorize.Net**, and **Bank Transfer**.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Seven premium gateways — one license</span>
  </div>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Compare Yatra Pro plans →</a>
</div>

### Does Yatra support deposits or partial payments?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Deposits + Scheduled Payments</span>
  </div>
  <p class="pro-callout__desc">The <strong>Flexible Payments</strong> module lets you collect a deposit at booking time. Combine with <strong>Scheduled Payments</strong> to auto-charge the balance on a future date.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock deposits →</a>
</div>

### Can I issue refunds?

Yes. The <span class="screen-path">Yatra → Payments</span> page lets you mark a payment as **Refunded**. The actual money movement happens in the gateway dashboard. Best practice: refund first in the gateway, then mark refunded in Yatra.

### How do discounts / coupons work?

The free plugin supports percentage or fixed discounts, redemption limits, optional date windows, "first-time customer only" flags, and per-trip applicability. The Pro **Advanced Discount** module adds group-size auto-discounts and stacking rules. See [Bookings & customers](/booking-settings#discounts-coupons).

### How do I handle different currencies for different markets?

The free plugin uses a single site currency. For multi-currency (showing prices in EUR for European visitors and USD for US visitors), pair Yatra with a multi-currency plugin like **Currency Switcher for WooCommerce** or use a per-market subdomain with separate Yatra installs.

## Customers & travelers

### How do customers book a trip?

- Click **Book now** on a trip page.
- Pick date / departure.
- Set traveler counts.
- Continue to checkout, fill in contact + traveler details.
- Pay.
- Receive confirmation email.

### Do customers need an account?

Configurable. With **Allow guest checkout** on (in <span class="screen-path">Settings → Customer</span>), customers can book without registering. Yatra creates a customer record on first booking.

### Can I collect emergency contact / passport details?

Yes — the booking form includes optional emergency contact fields. For passport / visa / insurance numbers, use the Pro **Dynamic Form Field** module to add custom fields.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Dynamic Form Field</span>
  </div>
  <p class="pro-callout__desc">Drag-drop booking form builder. Add text / select / checkbox / file / date fields with conditional visibility.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock the form builder →</a>
</div>

### Can I collect waivers and consent forms?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Trip Consent</span>
  </div>
  <p class="pro-callout__desc">Liability waivers and signature-required consent forms tied to trips. Each traveler signs digitally; bookings show "consent signed" status.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock trip consent →</a>
</div>

## Departures & availability

### What's the difference between a departure and an availability rule?

A **departure** is a specific date (e.g. March 5). An **availability rule** is a recurring pattern (e.g. every Tuesday) that generates departures automatically. See [Departures & availability](/departures).

### Can I cap each departure separately?

Yes — set per-departure capacity in the Departure detail page. The trip's overall capacity caps total bookings across all departures.

### How do I cancel a departure with notice?

Open the departure → click **Cancel** → email affected customers → refund related bookings via the Bookings page.

## Pricing

### Can I set per-traveler-category pricing?

Yes (free) — set adult / child / infant / senior prices in the trip's Pricing section after creating Traveler Categories.

### Can I run seasonal or demand-based pricing?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Dynamic Pricing</span>
  </div>
  <p class="pro-callout__desc">Rules engine for seasonal / demand / group-size / per-day pricing. <span class="screen-path">Yatra → Dynamic Pricing</span> after enabling.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock dynamic pricing →</a>
</div>

## Privacy, GDPR, data ownership

### Is my data shared with wpyatra.com?

No. Yatra is self-hosted — every customer record, booking, payment, and traveler detail lives in your WordPress database.

### Is Yatra GDPR-compliant?

Yatra is built on WordPress and stores user data in your own site. WordPress's standard **Tools → Export Personal Data** and **Erase Personal Data** flows work for Yatra data.

### How do I report a security vulnerability?

Email the wpyatra.com security contact privately. Don't post exploit steps in public reviews.

## Translation

### Can I translate Yatra?

Yes — text domain is `yatra` (free) and `yatra-pro` (Pro). Loco Translate, WPML, TranslatePress, Polylang, and Weglot all work.

## Performance

### How many trips / bookings can Yatra handle?

There are no hardcoded limits. Performance is driven by your hosting (PHP-FPM workers, MySQL configuration, page cache).

### Will Yatra hurt my SEO?

No. Yatra outputs normal WordPress pages and URLs. Yoast / Rank Math / SEOPress all index Yatra correctly.

## Developer

### Where's the REST API documentation?

[REST API](/api-reference). Routes live under `/wp-json/yatra/v1/`.

### Where are the hooks and filters?

[Hooks & filters](/hooks-filters). Free + Pro share the same `yatra_*` action / filter naming.

## Pricing & support

### Where can I get help?

- [WordPress.org support forum](https://wordpress.org/support/plugin/yatra/) — public threads.
- [GitHub](https://github.com/MantraBrain/yatra) — bug reports.
- [wpyatra.com priority support](https://wpyatra.com/contact/) — Pro license holders.

See [Support](/support) for routing details.
