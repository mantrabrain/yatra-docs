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

| URL                       | What it shows                              |
| ---                       | ---                                        |
| `/trip/`                  | Public trip catalog                        |
| `/trip/{trip-slug}/`      | Single trip page                           |
| `/destination/`           | Destinations archive                       |
| `/activity/`              | Activities archive                         |
| `/trip-category/`         | Trip categories archive                    |
| `/book/`                  | Booking flow / cart                        |
| `/book/{trip-slug}/`      | Booking flow for a specific trip           |
| `/my-account/`            | Customer account                           |

You can rename any slug under <span class="screen-path">Yatra → Settings → Permalink</span>.

## Compatibility

### Does Yatra work with any WordPress theme?

Yes — designed for broad theme compatibility. If layouts clash, briefly switch to a default theme (Twenty Twenty-Five) to isolate theme CSS. You can override Yatra's page templates and single-trip partials by copying them from `wp-content/plugins/yatra/templates/` to `wp-content/themes/{theme}/yatra/` (see [Blocks & page builders](/elementor-integration#templating-override-the-universal-escape-hatch) for the exceptions).

### Does Yatra work with the block editor?

Yes — Yatra ships 16 blocks: trip, destination, activity and category grids, Trip Search, Trip Deals, Customer Login, My Account, and eight blocks for parts of a trip (gallery, facts, booking card, itinerary, includes & excludes, FAQ, map, reviews), plus 3 block patterns. See [Blocks and Elementor widgets](/blocks).

### Does Yatra work with Elementor / Divi / Bricks / Oxygen?

Yes. **Elementor** gets 13 Yatra widgets from Yatra 3.2 (see [Blocks and Elementor widgets](/blocks#elementor-widgets)). In **Divi, Bricks and Oxygen**, use the builder's Shortcode module for trip grids, search and account forms. Trips aren't WordPress posts, so Posts / Loop Grid widgets can't list them.

### Can I use WooCommerce instead?

The free core emphasizes native trip checkout for speed and clarity. WooCommerce can run **alongside** Yatra — see [WooCommerce co-existence](/woocommerce-integration).

### Is Yatra multisite compatible?

Yes — Yatra stores its data in per-site tables, so each subsite has its own data.

## Selling trips

### How do I sell trips?

<ol class="step-list">
  <li>Create a trip, set a price.</li>
  <li>Connect <strong>PayPal</strong>, <strong>Pay Later</strong> or <strong>Bank Transfer</strong> (free), or <strong>Stripe / Razorpay / Mollie / Paystack / Square / Authorize.Net / T-Bank</strong> <span class="pro-pill">PRO</span> under <span class="screen-path">Yatra → Settings → Payment</span>.</li>
  <li>Run a test transaction with sandbox keys.</li>
  <li>Switch to live keys.</li>
</ol>

See [Payments](/payment-settings) for the full guide.

### What payment gateways does the free plugin support?

**PayPal** (Simple email-IPN or REST modes), **Pay Later** and — from Yatra 3.2 — **Bank Transfer** are fully working in the free core. Pro adds **Stripe**, **Razorpay**, **Mollie**, **Paystack**, **Square**, **Authorize.Net** and **T-Bank**.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Seven premium gateways — one license</span>
  </div>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Compare Yatra Pro plans →</a>
</div>

### Does Yatra support deposits or partial payments?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Deposits + Scheduled Payments</span>
  </div>
  <p class="pro-callout__desc">The <strong>Flexible Payments</strong> module lets you collect a deposit at booking time. Combine with <strong>Scheduled Payments</strong> to auto-charge the balance on a future date.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock deposits →</a>
</div>

### Can I issue refunds?

Yes. From Yatra 3.2, open the booking and click **Refund** on the payment. For **PayPal** (Advanced mode) and, with Yatra Pro 3.2, **Stripe**, Yatra can send the money back through the provider and record it in one step. For other methods, refund in the gateway dashboard or your bank, then record it with **Refund**. See [Manage a booking → Refund a payment](/booking-workspace#refund-a-payment).

### How do discounts / coupons work?

The free plugin supports percentage or fixed discounts, a usage limit, uses per customer, "first-time customers only" (all three enforced from Yatra 3.2), optional date windows and per-trip applicability — via codes the customer types at checkout. The Pro **Advanced Discount** module adds *Group Only* (auto-applies when traveler count crosses a threshold) and *Promo + Group* (a code that also stacks group-size logic on top). See [Discounts](/booking-settings#discounts-coupons) and [Advanced Discount module](/modules/advanced-discount).

### How do I handle different currencies for different markets?

Yatra takes every booking and payment in a single store currency, and WooCommerce currency switchers don't change Yatra prices. With Yatra Pro (Growth or Scale), the [Currency Switcher](/modules/currency-switcher) <span class="pro-pill">PRO</span> lets visitors **see** trip prices in other currencies while browsing — checkout, payments, emails and invoices stay in your store currency, and checkout tells the customer so. To actually charge in several currencies, use a per-market subdomain with separate Yatra installs.

## Customers & travelers

### How do customers book a trip?

- Click **Book now** on a trip page.
- Pick date / departure.
- Set traveler counts.
- Continue to checkout, fill in contact + traveler details.
- Pay.
- Receive confirmation email.

### Do customers need an account?

Configurable. With **Allow Guest Checkout** on (in <span class="screen-path">Settings → Booking</span>), customers can book without registering. Yatra creates a customer record on first booking.

### Can I collect emergency contact / passport details?

Yes — the booking form includes optional emergency contact fields, and you can add traveller fields (passport, nationality, date of birth…) in [Settings → Booking Form](/settings#_4-booking-form). From Yatra 3.2 customers can complete or correct these details from My Account after booking, until the travel date. For per-trip fields, use the Pro **Dynamic Form Field** module.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Dynamic Form Field</span>
  </div>
  <p class="pro-callout__desc">Drag-drop booking form builder. Add text / select / checkbox / file / date fields with conditional visibility.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock the form builder →</a>
</div>

### Can customers cancel or change a booking themselves?

Not directly. From Yatra 3.2 they can **ask** from My Account: you get an email, the request shows on the booking, and nothing is cancelled or refunded until you do it. Turn it off or set a cut-off under <span class="screen-path">Settings → Booking → Changes & Cancellations</span>. See [Bookings & customers → What customers can do in My Account](/booking-settings#what-customers-can-do-in-my-account).

### Can customers book several trips in one checkout?

With Yatra Pro (Growth or Scale), the [Multi-Trip Cart](/modules/multi-trip-cart) <span class="pro-pill">PRO</span> module adds **Add to cart**: several trips and dates, one checkout, one payment, one booking per trip.

### Can I collect waivers and consent forms?

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Trip Consent</span>
  </div>
  <p class="pro-callout__desc">Liability waivers and signature-required consent forms tied to trips. Emailed once the booking is confirmed, with reminders; each traveler signs online and bookings show "consent signed" status.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock trip consent →</a>
</div>

## Availability & departures

### What's the priority between manual dates, recurring rules, and the trip default?

Yatra uses a **three-layer system**, highest priority first:

1. **Manual Availability Dates** — specific rows (per-date capacity, sold-out flag, price override). These always win.
2. **Recurring Availability Rules** — pattern-based dates (every Tuesday, daily July–August, etc.).
3. **Trip Builder default** — the trip's *Availability & Booking* window, used as a fallback for any date neither of the above touches.

See [Availability — three-layer system](/availability) for the worked-example breakdown.

### Can I cap each departure separately?

Yes — set per-departure capacity on the individual departure (or per-rule capacity on a recurring rule). The trip's *Max Travelers* under Availability & Booking acts as the default and as an absolute cap.

### How do I cancel a departure with notice?

Open the departure → click **Cancel** → email affected customers → refund related bookings via the Bookings page. See [Departures](/departures#cancel-a-departure) for the full flow.

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
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock dynamic pricing →</a>
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

Yes — text domain is `yatra` (free) and `yatra-pro` (Pro). Loco Translate translates the interface; TranslatePress and Weglot translate the rendered pages. From Yatra 3.2, **WPML and Polylang** are supported: trip pages, the booking flow and My Account work in every language, trip texts are translated on their string-translation screen, and booking emails go out in the customer's language. See [Multilingual sites](/multilingual). To rename a few texts without a translation plugin, use [Settings → Labels](/settings#labels).

## Performance

### How many trips / bookings can Yatra handle?

There are no hardcoded limits. Performance is driven by your hosting (PHP-FPM workers, MySQL configuration, page cache).

### Why don't Yatra's styles load on a page?

From Yatra 3.2, Yatra's CSS and JavaScript (about 850 KB) load **only where they're needed**: on Yatra's own pages (trips, listings, destinations, booking, checkout, My Account) and on pages whose content has a Yatra shortcode, block or Elementor widget. Other pages of your site are lighter.

A shortcode or block placed where Yatra can't see it in advance — a widget area, a page-builder header or footer, a theme template — loads the files itself when it renders, so it still works.

If something still looks unstyled (for example, your theme relied on Yatra's files being on every page), restore the old behaviour by adding this to a small plugin or your child theme's `functions.php`:

```php
add_filter( 'yatra_load_frontend_assets', '__return_true' );
```

To load them on just one more page instead, return `true` for that page only:

```php
add_filter( 'yatra_load_frontend_assets', function ( $load ) {
    return $load || is_front_page();
} );
```

### Will Yatra hurt my SEO?

No. Yatra outputs normal WordPress pages and URLs, and from 3.2 trip pages tell search engines the trip's price (a Product with an Offer) and describe the trip itself (a TouristTrip with its duration and itinerary). Yatra publishes its own sitemap (`/yatra-sitemap.xml`) and adds its URLs to the WordPress core, Yoast, Rank Math and All in One SEO sitemaps.

## Developer

### Where's the REST API documentation?

[REST API](/api-reference). Routes live under `/wp-json/yatra/v1/`.

### Where are the hooks and filters?

[Hooks & filters](/hooks-filters). Free + Pro share the same `yatra_*` action / filter naming.

## Pricing & support

### Where can I get help?

- [WordPress.org support forum](https://wordpress.org/support/plugin/yatra/) — public threads.
- [GitHub](https://github.com/MantraBrain/yatra) — bug reports.
- [wpyatra.com priority support](https://wpyatra.com/contact/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) — Pro license holders.

See [Support](/support) for routing details.
