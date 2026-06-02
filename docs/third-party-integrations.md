---
title: Pro modules — overview
description: A grouped narrative of every Yatra Pro module — what it does, when to reach for it, and the deep-dive doc for the setup steps. Modules toggle on/off under Yatra → Modules; per-module docs live under /modules/.
---

# Pro modules — overview

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Every module on this page is Yatra Pro.</strong> Looking for the flat catalog with one card per module? See <a href="/modules">All modules</a>. Each per-module page is linked inline below.</span>
  <a class="doc-pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs" target="_blank" rel="noopener">View pricing →</a>
</div>

Yatra Pro is a separate plugin you install on top of the free Yatra plugin. After activating your license under <span class="screen-path">Yatra → License</span>, toggle individual modules under <span class="screen-path">Yatra → Modules</span>. This page groups them by *what business problem they solve* so you can pick the right one for the situation.

## The Modules hub

Open <span class="screen-path">Yatra → Modules</span>.

You'll see a card per Pro module. Each carries:

- **Name + category badge** (Marketing, Payments, Sales, Bookings, Operations, Integrations).
- **One-paragraph description** of what the module unlocks.
- **Tags** the search box at the top of the page uses.
- **Enable toggle** — flips state immediately and writes to `wp_options.yatra_modules`.
- **"Settings"** link that jumps to the module's config tab when applicable.

The toolbar has search, a category filter, sort (Name A–Z / Z–A / Enabled first / Disabled first), bulk enable/disable, and a *Refresh Modules* button for syncing after license changes.

> Disabling a module hides its UI but **keeps your data**. Re-enable later to bring it back.

For a one-page flat list of every module + the seven premium gateways, see [All modules](/modules).

---

## Pricing & sales

Move the price up when demand justifies it; move it down to fill remaining seats; sell add-ons to grow the average booking.

### [Dynamic Pricing](/modules/dynamic-pricing) <span class="pro-pill">PRO</span>

Six rule types — Early Bird / Last Minute / Demand / Inventory / Seasonal / Time-based — adjusting trip prices automatically with percentage or fixed amounts. Stack-aware with a priority system and per-booking audit log.

Best for: peak-season pricing, last-seat discounts, weekend surcharges, group-size discounts.

### [Additional Services](/modules/additional-services) <span class="pro-pill">PRO</span>

Sell add-ons (airport transfer, travel insurance, gear rental, single-supplement upgrades) alongside trips. Per-person / per-booking / per-day pricing with optional quantity controls.

Best for: upsell revenue, capturing genuine optional extras without polluting the trip price.

### [Advanced Discount](/modules/advanced-discount) <span class="pro-pill">PRO</span>

Beyond free promo codes — auto-applying group-size discounts ("6+ travelers, 10% off") and combined promo-code + group rules with category-based tiered ranges.

Best for: family-rate logic, agent-bulk discounts, larger group incentives.

---

## Payments

Take less than the full trip price upfront; auto-collect the balance later.

### [Flexible Payments](/modules/flexible-payments) <span class="pro-pill">PRO</span>

Take a **deposit** or **partial payment** at booking time. Site-wide defaults with per-trip overrides. Pairs with Scheduled Payments for the auto-charge path.

Best for: high-ticket trips, agent-driven sales workflows.

### [Scheduled Payments](/modules/scheduled-payments) <span class="pro-pill">PRO</span>

Auto-charge the remaining balance on a future date using the saved gateway card (works best with Stripe). Single charge or N installments.

Best for: combining with Flexible Payments to deliver "pay $99 now, $400 charged automatically 30 days before travel" flows.

---

## Marketing & communication

Reach customers before, during, and after their trip — through Yatra's native email pipeline or via the major ad-platform pixels.

### [Email Automation](/modules/email-automation) <span class="pro-pill">PRO</span>

Multi-step email sequences triggered by booking / payment / enquiry events, with per-step delays, audience filters, and a full delivery log.

Best for: pre-trip welcome series, post-trip nurture, payment reminder cadences.

### [Abandoned Booking Recovery](/modules/abandoned-booking-recovery) <span class="pro-pill">PRO</span>

Three-step recovery email sequence (1 hour / 1 day / 3 days) for customers who started a booking but didn't pay. Includes a personalised recovery link and recovered-revenue reporting.

Best for: capturing the 5–15% of bookings that abandon at the payment step.

### [Mailchimp Integration](/modules/mailchimp) <span class="pro-pill">PRO</span>

Auto-sync confirmed bookings to a Mailchimp audience with tags + merge fields. Lets you run pre- and post-trip marketing campaigns from Mailchimp without exporting CSVs.

Best for: operators already running newsletter / nurture sequences in Mailchimp.

### [Facebook Pixel](/modules/facebook-pixel) <span class="pro-pill">PRO</span>

Browser-side + server-side (Conversions API) tracking for `ViewContent`, `InitiateCheckout`, `Purchase` events with hashed customer data for matching.

Best for: paid ad campaigns, lookalike audience seeding.

### [Google Analytics 4 Enhanced](/modules/google-analytics) <span class="pro-pill">PRO</span>

GA4 ecommerce events (`view_item` / `add_to_cart` / `begin_checkout` / `purchase` / `refund`) with the Measurement Protocol option for server-side tracking.

Best for: rigorous funnel analysis and Google Ads conversion tracking.

### [Custom Landing Pages](/modules/custom-landing-pages) <span class="pro-pill">PRO</span>

Replace the default destination / activity / category archive pages with any WordPress page you've built — Gutenberg, Elementor, your favourite page builder.

Best for: SEO-optimised content pages, paid-traffic landing pages, partner co-brands.

---

## Booking experience

Customise the booking flow for the customer.

### [Dynamic Form Field](/modules/dynamic-form-field) <span class="pro-pill">PRO</span>

Per-trip custom fields on the booking form (dietary requirements, T-shirt size, medical info, passport details). Field types: text / email / tel / date / select / textarea / number / checkbox / file. Conditional visibility rules. Per-traveler vs per-booking toggle.

Best for: trips needing specific info per booking that the site-wide form shouldn't ask of everyone.

---

## Operations

Get bookings into your team's existing tools and capture the paperwork.

### [Google Calendar Integration](/modules/google-calendar) <span class="pro-pill">PRO</span>

Sync every confirmed departure and booking to a Google Calendar of your choice. Multi-calendar support, per-trip colour, automatic re-sync.

Best for: operations / dispatch teams that live in Google Calendar.

### [Trip Consent](/modules/trip-consent) <span class="pro-pill">PRO</span>

Digital waivers and consent forms — liability, health, image release, COVID screening. Sent automatically after booking, signed in-browser, tracked per booking with PDF archive.

Best for: adventure operators with insurance / liability requirements.

---

## AI & messaging — Growth tier

These modules require a **Growth** (or Scale) Yatra Pro license. Bring-your-own-credentials integrations — no per-call markup, no proxying through Yatra.

### [AI Assistant](/modules/ai-assistant) <span class="pro-pill">PRO</span>

Bring-your-own OpenAI / Anthropic key. Inline sparkle affordances across the trip editor (title, description, itinerary), SEO fields, taxonomy descriptions, and the enquiry inbox ("Draft reply with AI"). Daily AI-written digest on the dashboard. Brand-voice configuration so generated copy stays consistent. Per-day usage + cost tab.

Best for: tour operators publishing many trips or running a leads-heavy enquiry pipeline.

### [WhatsApp Notifications](/modules/whatsapp) <span class="pro-pill">PRO</span>

Transactional WhatsApp Cloud API messages — booking confirmations, payment receipts, T-1 departure reminders, T+1 review requests. Inbound replies route into the Enquiries inbox. Public click-to-WhatsApp widget (floating button + single-trip CTA + shortcode). Customer opt-in flow. Per-message delivery log with Meta's conversation cost.

Best for: operators in markets where WhatsApp is the dominant channel (India, MENA, LATAM, SE Asia) — 90%+ open rate vs ~25% for email.

---

## Distribution & branding — Scale tier

These modules require a **Scale** Yatra Pro license (Yearly or Lifetime). Built for resellers and high-volume operators.

### [Channel Manager](/modules/channel-manager) <span class="pro-pill">PRO</span>

Distribute trips to Viator, GetYourGuide & more OTAs from one dashboard. Real-time inventory + pricing sync. Signed webhook ingestion with replay protection. Lifecycle dispatch — cancel / modify / no-show flow back from the OTA into Yatra automatically. Per-channel circuit breaker so a failing OTA never drags down the rest. Anti-overbooking pessimistic locks so two channels can't sell the last seat simultaneously.

Best for: operators where OTAs drive ≥30% of bookings. Saves $99–299/month vs. standalone channel-manager SaaS.

### [White Label](/modules/white-label) <span class="pro-pill">PRO</span>

Rebrand the entire admin — logo, name, primary color, sidebar menu (rename / reorder / hide / re-icon / promote), theme surfaces, customer-facing PDFs. Remove every Yatra / MantraBrain reference your clients see. Multi-site defaults via filter for agencies managing many installs.

Best for: agencies delivering Yatra as if it were custom software they built.

---

## Premium payment gateways

A single Yatra Pro license also unlocks **seven** premium payment gateways. These aren't on the Modules screen — they're toggled under <span class="screen-path">Yatra → Settings → Payment</span> directly. The detailed step-by-step setup (with dashboard URLs, key locations, and verification flow) is on [Payments & gateways](/payment-settings).

- [Stripe](/payment-settings#stripe-pro) — cards, Apple Pay, Google Pay, scheduled balance payments
- [Razorpay](/payment-settings#razorpay-pro) — India: cards, UPI, netbanking, wallets
- [Mollie](/payment-settings#mollie-pro) — Europe: iDEAL, Bancontact, SEPA, cards
- [Paystack](/payment-settings#paystack-pro) — Africa: cards, bank transfer, USSD, mobile money
- [Square](/payment-settings#square-pro) — NA / UK / AU / JP cards
- [Authorize.Net](/payment-settings#authorize-net-pro) — US-centric merchant accounts
- [Bank Transfer](/payment-settings#bank-transfer-pro) — manual wire-transfer flow with bank details on confirmation

---

## What's next

- [All modules](/modules) — flat catalog with one card per module + premium gateway.
- [Per-module reference](/modules/) — every module's deep-dive setup page.
- [Settings → Integration](/settings#_10-integration) — every field for the integration modules in one place.
- [Pricing](https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) — pick the Yatra Pro plan that includes the modules you need.
