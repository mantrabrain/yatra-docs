---
title: All modules
description: A flat, scannable catalog of every Yatra Pro module — premium gateways, Dynamic Pricing, abandoned recovery, calendar sync, marketing pixels, and more. One card per feature with a direct upgrade link.
---

# All modules

![Modules admin — every Pro module as a card with on/off toggle](/screenshots/dashboard/dashboard-modules.webp)

This is the **flat catalog** — every Yatra Pro module on a single page, plus the seven premium payment gateways unlocked by the same license. Use the [Pro modules overview](/third-party-integrations) for grouped, narrative explanations.

> **About the wording:** Yatra calls these **modules** in the admin (<span class="screen-path">Yatra → Modules</span>). The page is a card grid: each card shows the module name, a short description, the category badge, and an on/off toggle. Toggling is instant — no page reload required.

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Everything below requires Yatra Pro.</strong> Activate a license under <em>Yatra → License</em>, then toggle individual modules on under <em>Yatra → Modules</em>. Premium payment gateways are toggled separately under <em>Yatra → Settings → Payment</em>.</span>
  <a class="doc-pro-callout__cta" href="https://wpyatra.com/pricing/" target="_blank" rel="noopener">View pricing →</a>
</div>

## How the Modules screen is organized

Each card carries:

- **Name** + **category badge** (Marketing, Payments, Sales, Bookings, Operations, Integrations).
- **One-paragraph description** of what the module unlocks.
- **Tags** — a short list of keywords used by the search box at the top.
- **Enable toggle** — flips state immediately and writes to `wp_options.yatra_modules`.
- **"Settings"** link (when applicable) — jumps straight to the module's settings tab once enabled.

Disabling a module hides its UI but **keeps your data** so re-enabling later restores everything.

---

## Premium payment gateways

One Yatra Pro license unlocks **seven** premium gateways. These don't appear on the Modules screen — they're enabled under <span class="screen-path">Yatra → Settings → Payment</span> (one toggle per gateway, plus the credentials form).

<div class="doc-addon-grid">

  <a id="stripe"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Stripe <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Cards, Apple Pay, Google Pay, SCA / 3-D Secure 2, on-page Payment Element. Saves card on file so Scheduled Payments can auto-charge the balance.</p>
    <a class="doc-addon-card__cta" href="/payment-settings#stripe">Setup guide →</a>
  </div>

  <a id="razorpay"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Razorpay <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Cards, UPI, netbanking, wallets — primary choice for Indian rupee bookings.</p>
    <a class="doc-addon-card__cta" href="/payment-settings#razorpay">Setup guide →</a>
  </div>

  <a id="mollie"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Mollie <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">European-first gateway: iDEAL, Bancontact, SEPA Direct Debit, cards.</p>
    <a class="doc-addon-card__cta" href="/payment-settings#mollie">Setup guide →</a>
  </div>

  <a id="paystack"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Paystack <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Cards, bank transfer, USSD, mobile money — primary choice for Nigeria, Ghana, Kenya, South Africa.</p>
    <a class="doc-addon-card__cta" href="/payment-settings#paystack">Setup guide →</a>
  </div>

  <a id="square"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Square <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Cards via Square. Useful when you also take in-person payments using a Square POS terminal.</p>
    <a class="doc-addon-card__cta" href="/payment-settings#square">Setup guide →</a>
  </div>

  <a id="authorize-net"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Authorize.Net <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Long-running US gateway with merchant-account workflows, AVS / CVV, and recurring tokens.</p>
    <a class="doc-addon-card__cta" href="/payment-settings#authorize-net">Setup guide →</a>
  </div>

  <a id="bank-transfer"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Bank Transfer <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Manual / wire-transfer flow. Yatra creates a <em>Pending payment</em> booking and shows your bank details to the customer.</p>
    <a class="doc-addon-card__cta" href="/payment-settings#bank-transfer">Setup guide →</a>
  </div>

</div>

---

## Sales modules

<div class="doc-addon-grid">

  <a id="dynamic-pricing"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Dynamic Pricing <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Automatically adjust trip prices based on demand, seasonality, early-bird discounts, and last-minute deals. Stacking rules + audit log.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → Dynamic Pricing</span></p>
    <a class="doc-addon-card__cta" href="/modules/dynamic-pricing">Details →</a>
  </div>

  <a id="additional-services"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Additional Services <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Offer optional add-ons like airport transfers, travel insurance, and equipment rental — per trip or globally. Quantity controls + line items on bookings.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → Additional Services</span></p>
    <a class="doc-addon-card__cta" href="/modules/additional-services">Details →</a>
  </div>

</div>

---

## Payment modules

<div class="doc-addon-grid">

  <a id="flexible-payments"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Flexible Payments <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Take a deposit or percentage at booking time and collect the balance later. Per-trip override on the Trip Builder's Advanced section.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Settings → Payment</span></p>
    <a class="doc-addon-card__cta" href="/modules/flexible-payments">Details →</a>
  </div>

  <a id="scheduled-payments"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Scheduled Payments <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Auto-charge the remaining balance on a future date using the saved payment method. Works with Stripe and other supported gateways.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Settings → Payment</span></p>
    <a class="doc-addon-card__cta" href="/modules/scheduled-payments">Details →</a>
  </div>

</div>

---

## Marketing modules

<div class="doc-addon-grid">

  <a id="email-automation"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Email Automation <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Adds the full automation template library, sequences, and send logs on the Email screen. (The four core customer templates — booking, payment, cancellation, reminder — are free without this module.)</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Email Automation</span></p>
    <a class="doc-addon-card__cta" href="/modules/email-automation">Details →</a>
  </div>

  <a id="abandoned-booking-recovery"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Abandoned Booking Recovery <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Track abandoned bookings and send a multi-step email sequence with personalized recovery links. Recovered-revenue reporting included.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Abandoned Recovery</span></p>
    <a class="doc-addon-card__cta" href="/modules/abandoned-booking-recovery">Details →</a>
  </div>

  <a id="advanced-discount"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Advanced Discount <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Group-size discounts that auto-apply based on traveler count, plus stacking rules and richer UI on top of the free Discounts feature.</p>
    <p class="doc-addon-card__meta">Settings: lives on the existing <span class="screen-path">Yatra → Discounts</span> screen</p>
    <a class="doc-addon-card__cta" href="/modules/advanced-discount">Details →</a>
  </div>

  <a id="mailchimp-integration"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Mailchimp Integration <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Sync customers to Mailchimp lists when they book. Tag based on trips booked. Build targeted campaigns and nurture leads.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Mailchimp</span></p>
    <a class="doc-addon-card__cta" href="/modules/mailchimp">Details →</a>
  </div>

  <a id="facebook-pixel"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Facebook Pixel <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Browser + server-side Conversions API tracking. Granular event toggles and a reports tab for pixel performance.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Facebook Pixel</span></p>
    <a class="doc-addon-card__cta" href="/modules/facebook-pixel">Details →</a>
  </div>

  <a id="google-analytics-4-enhanced"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Google Analytics 4 Enhanced <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">GA4 ecommerce events for view_item / begin_checkout / purchase / refund. Server-side tracking via Measurement Protocol.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Google Analytics</span></p>
    <a class="doc-addon-card__cta" href="/modules/google-analytics">Details →</a>
  </div>

  <a id="custom-landing-pages"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Custom Landing Pages <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Point destinations, activities, and trip categories at any WordPress page. Use your page builder + Yatra shortcodes; catalog links use the page URL when the module is on.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Settings</span> (per-taxonomy)</p>
    <a class="doc-addon-card__cta" href="/modules/custom-landing-pages">Details →</a>
  </div>

</div>

---

## Booking & operations modules

<div class="doc-addon-grid">

  <a id="dynamic-form-field"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Dynamic Form Field <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Drag-and-drop booking-form builder. Text / select / checkbox / file / date with conditional visibility per trip.</p>
    <p class="doc-addon-card__meta">Settings: <span class="screen-path">Yatra → Settings → Booking Form</span></p>
    <a class="doc-addon-card__cta" href="/modules/dynamic-form-field">Details →</a>
  </div>

  <a id="trip-consent"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Trip Consent <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Digital waivers, COVID forms, image-release consents — signed per traveler at checkout. Bookings show a <em>consent signed</em> status.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → Trip Consent</span></p>
    <a class="doc-addon-card__cta" href="/modules/trip-consent">Details →</a>
  </div>

  <a id="google-calendar-integration"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Google Calendar Integration <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Push every confirmed booking and departure to Google Calendar. Multi-calendar selection, per-trip color, automatic re-sync.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → Google Calendar</span></p>
    <a class="doc-addon-card__cta" href="/modules/google-calendar">Details →</a>
  </div>

</div>

---

## Growth + Agency modules

Modules unlocked by the **Growth** tier (and above). These are bring-your-own-credentials integrations — no per-call markup, no proxying.

<div class="doc-addon-grid">

  <a id="ai-assistant"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">AI Assistant <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Bring-your-own OpenAI / Anthropic key. Inline sparkle affordances across the trip editor, SEO fields, taxonomy descriptions, and the enquiry inbox. Daily AI digest on the dashboard.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → AI Assistant</span></p>
    <a class="doc-addon-card__cta" href="/modules/ai-assistant">Details →</a>
  </div>

  <a id="whatsapp-notifications"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">WhatsApp Notifications <span class="doc-pro-pill">Pro</span></h3>
    <p class="doc-addon-card__copy">Transactional WhatsApp messages via Meta's Cloud API — booking confirmations, payment receipts, T-1 reminders, review requests. Inbound replies route into Enquiries. Public click-to-WhatsApp widget.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → WhatsApp</span></p>
    <a class="doc-addon-card__cta" href="/modules/whatsapp">Details →</a>
  </div>

</div>

---

## Agency-only modules

Modules gated to the **Agency** tier (Yearly or Lifetime). Built for resellers and high-volume operators.

<div class="doc-addon-grid">

  <a id="channel-manager"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">Channel Manager <span class="doc-pro-pill">Agency</span></h3>
    <p class="doc-addon-card__copy">Distribute trips to Viator, GetYourGuide & more OTAs from one dashboard. Real-time inventory + pricing sync. Signed webhook ingestion. Lifecycle dispatch (cancel/modify/no-show). Circuit breaker per channel. Anti-overbooking locks.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → Channel Manager</span></p>
    <a class="doc-addon-card__cta" href="/modules/channel-manager">Details →</a>
  </div>

  <a id="white-label"></a>
  <div class="doc-addon-card">
    <h3 class="doc-addon-card__title">White Label <span class="doc-pro-pill">Agency</span></h3>
    <p class="doc-addon-card__copy">Rebrand the entire admin — logo, name, primary color, sidebar menu (rename / reorder / hide / re-icon / promote), theme surfaces, PDFs. Remove every Yatra / MantraBrain reference your clients see.</p>
    <p class="doc-addon-card__meta">Adds menu: <span class="screen-path">Yatra → White Label</span></p>
    <a class="doc-addon-card__cta" href="/modules/white-label">Details →</a>
  </div>

</div>

---

## How a module turns on

<ol class="step-list">
  <li>Install <strong>Yatra Pro</strong> alongside the free Yatra plugin.</li>
  <li>Activate your license in <span class="screen-path">Yatra → License</span>.</li>
  <li>Open <span class="screen-path">Yatra → Modules</span>, find the module (use the search box at the top), click its toggle.</li>
  <li>The card flips state immediately. Any new admin menus / settings tabs the module needs appear on the next page load.</li>
  <li>For payment gateways, also toggle them on under <span class="screen-path">Yatra → Settings → Payment</span> and fill in the credentials.</li>
</ol>

> Source of truth: the module registry lives in `app/Core/Modules/ModuleManager.php`. State is persisted in the `yatra_modules` WordPress option.

## The full module list at a glance

| Module | Tier | Category | Settings page after enable |
| --- | --- | --- | --- |
| Google Calendar Integration | Personal + | Integrations | `yatra-google-calendar` |
| Additional Services | Personal + | Sales | `yatra-additional-services` |
| Trip Consent | Personal + | Operations | `yatra-trip-consent` |
| Email Automation | Personal + | Marketing | `email-automation` |
| Dynamic Form Field | Personal + | Bookings | `yatra-settings` |
| Advanced Discount | Personal + | Marketing | (extends existing Discounts) |
| Mailchimp Integration | Personal + | Marketing | `yatra-mailchimp` |
| Facebook Pixel | Personal + | Marketing | `yatra-facebook-pixel` |
| Google Analytics 4 Enhanced | Personal + | Marketing | `yatra-google-analytics` |
| Flexible Payments | Personal + | Payments | `yatra-settings` |
| Scheduled Payments | Personal + | Payments | `yatra-settings` |
| Dynamic Pricing | Personal + | Sales | `dynamic-pricing` |
| Custom Landing Pages | Personal + | Marketing | `yatra-settings` |
| Abandoned Booking Recovery | Personal + | Marketing | `abandoned-recovery` |
| **AI Assistant** | **Growth +** | AI / Content | `ai-assistant` |
| **WhatsApp Notifications** | **Growth +** | Messaging | `whatsapp` |
| **Channel Manager** | **Agency** | Distribution | `channel-manager` |
| **White Label** | **Agency** | Branding | `white-label` |

## Where to read more

- [Pro modules overview](/third-party-integrations) — grouped by what they do, with narrative setup steps.
- [Payments & gateways](/payment-settings) — gateway-by-gateway credentials and checkout behaviour.
- [Email & notifications](/email-settings) — Pro email automation details.
- [Pricing](https://wpyatra.com/pricing/) — pick the plan that includes the modules you need.
