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

Sell add-ons (airport transfer, travel insurance, gear rental, single-supplement upgrades) alongside trips. Fixed or percentage pricing, per person / per booking / per day, optionally required.

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

Up to three recovery emails (1 hour / 24 hours / 48 hours by default) for customers who started a booking but didn't finish. The link reopens the trip with the booking form pre-filled; recovered-revenue reporting included.

Best for: operators who see customers start a booking and not finish it.

### [Mailchimp Integration](/modules/mailchimp) <span class="pro-pill">PRO</span>

Sync customers to a Mailchimp audience when they book, with merge fields and the tags `Trip: {name}`, `Yatra Customer`, `Booked` plus your default tags. Lets you run pre- and post-trip marketing campaigns from Mailchimp without exporting CSVs.

Best for: operators already running newsletter / nurture sequences in Mailchimp.

### [Facebook Pixel](/modules/facebook-pixel) <span class="pro-pill">PRO</span>

Browser-side + server-side (Conversions API) tracking for `ViewContent`, `InitiateCheckout`, `Purchase` events with hashed customer data for matching.

Best for: paid ad campaigns, lookalike audience seeding.

### [Google Analytics 4 Enhanced](/modules/google-analytics) <span class="pro-pill">PRO</span>

GA4 ecommerce events (`view_item` / `add_to_cart` / `begin_checkout` / `purchase`) with the Measurement Protocol option for server-side tracking.

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

Push every confirmed booking to a Google Calendar of your choice (one-way) — one event per booking, or one per departure. Automatic re-sync.

Best for: operations / dispatch teams that live in Google Calendar.

### [Trip Consent](/modules/trip-consent) <span class="pro-pill">PRO</span>

Digital waivers and consent forms — liability, health, image release, COVID screening. Emailed once a booking is confirmed (with reminders), signed in-browser, tracked per booking; signed copies downloadable as PDF from the admin.

Best for: adventure operators with insurance / liability requirements.

---

## Sales, AI & messaging — Growth tier

These modules require a **Growth** (or Scale) Yatra Pro license. AI Assistant and WhatsApp are bring-your-own-credentials integrations — no per-call markup, no proxying through Yatra.

### [Multi-Trip Cart](/modules/multi-trip-cart) <span class="pro-pill">PRO</span>

New in Pro 3.2 (needs Yatra 3.2). Customers click **Add to cart** beside a departure's Book Now, collect several trips and dates, and book them all in one checkout with one payment. Each trip becomes its own booking — its own seats, travellers, confirmation, receipt and refunds.

Best for: operators who sell add-on day tours or multi-leg itineraries.

### [Currency Switcher](/modules/currency-switcher) <span class="pro-pill">PRO</span>

New in Pro 3.2 (needs Yatra 3.2). Visitors choose a currency and see trip prices converted while browsing, with your own rates or optional daily rates. Checkout, payments, emails, invoices, My Account and the admin stay in your store currency, and checkout tells the customer so.

Best for: operators with international visitors who want to show familiar prices.

### [AI Assistant](/modules/ai-assistant) <span class="pro-pill">PRO</span>

Bring-your-own OpenAI / Anthropic key. Inline sparkle affordances across the trip editor (title, description, itinerary), SEO fields, taxonomy descriptions, and the enquiry inbox ("Draft reply with AI"). Daily AI-written digest on the dashboard. Brand-voice configuration so generated copy stays consistent. Per-day usage + cost tab. From Pro 3.2, an **MCP server** lets Claude Code, Claude Desktop, Cursor and other AI assistants find bookings, read manifests, check availability, add notes, confirm or cancel bookings (flagged as needing your go-ahead) and draft trips — signed in with a WordPress Application Password.

Best for: tour operators publishing many trips or running a leads-heavy enquiry pipeline.

### [WhatsApp Notifications](/modules/whatsapp) <span class="pro-pill">PRO</span>

Transactional WhatsApp Cloud API messages — booking confirmations, payment receipts, T-1 departure reminders, T+1 review requests. Inbound replies are logged, with STOP-keyword opt-out. Public click-to-WhatsApp widget (floating button + single-trip CTA + shortcode). Customer opt-in flow. Per-message delivery log. Meta bills you directly at its published rates.

Best for: operators in markets where WhatsApp is the dominant channel (India, MENA, LATAM, SE Asia) — 90%+ open rate vs ~25% for email.

---

## Distribution & branding — Scale tier

These modules require a **Scale** Yatra Pro license (Yearly or Lifetime). Built for resellers and high-volume operators.

### [Channel Manager](/modules/channel-manager) <span class="pro-pill">PRO</span>

Sell your trips on **GetYourGuide** through GetYourGuide's Supplier API (rebuilt in Pro 3.2). GetYourGuide asks your site for availability and sends reservations and bookings in real time: places come from your Yatra departures, so direct bookings and GetYourGuide share one inventory; a reservation holds places for 60 minutes; a booking becomes a confirmed Yatra booking; cancellations free the places. GetYourGuide must certify the connection from your partner account (its self-tests in the Integrator Portal) before you sell live. **Viator** is in development.

Best for: operators who already sell, or plan to sell, on GetYourGuide.

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
- T-Bank — Russia: bank cards, SBP, T-Pay

**Bank Transfer** is free from Yatra 3.2 — see [Payments → Bank Transfer](/payment-settings#bank-transfer).

---

## What's next

- [All modules](/modules) — flat catalog with one card per module + premium gateway.
- [Per-module reference](/modules/) — every module's deep-dive setup page.
- [Settings → Integration](/settings#_11-integration) — every field for the integration modules in one place.
- [Pricing](https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) — pick the Yatra Pro plan that includes the modules you need.
