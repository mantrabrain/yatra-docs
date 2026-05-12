---
title: Quick start (the setup wizard)
description: Use the Yatra setup wizard to pick pages and currency, connect a payment method, and publish your first sellable trip in under an hour.
---

# Quick start

**Tip:** When you open **Yatra** in WordPress, the left menu can look busy. Keep [Your WordPress admin (Yatra)](/admin-dashboard) open in another tab—that page matches menu names to docs.

This walkthrough takes you from a freshly activated Yatra plugin to a **published, sellable trip** in under an hour. We recommend doing it on a staging site, then re-doing it on production once you're happy.

## Overview

Here's what you'll do:

1. Run the **Setup wizard** (5 minutes).
2. Confirm WordPress permalinks are set up.
3. Connect a payment method (PayPal in free; Stripe + 6 more in Pro).
4. Build and publish your first trip.
5. Make a test booking.
6. Verify the customer experience.

## Step 1 — Run the setup wizard

After you activate Yatra for the first time, you'll see a notice prompting you to **Run the setup wizard**. The wizard walks you through:

<ol class="step-list">
  <li><strong>Welcome</strong> — overview of what's about to happen.</li>
  <li><strong>Pages</strong> — Yatra creates the pages it needs (Booking, My Account, Search). You can keep the defaults or pick existing pages.</li>
  <li><strong>Currency</strong> — pick your currency (USD, EUR, INR, NPR, etc.), symbol position, and decimal options.</li>
  <li><strong>Payment</strong> — toggle the gateways you have ready. PayPal and Pay Later in free, plus Pro gateways if your license is active.</li>
  <li><strong>Done</strong> — you'll see a quick recap and a link to <strong>Add your first trip</strong>.</li>
</ol>

<div class="ui-tip"><strong>Want to re-run the wizard later?</strong> Visit <code>/wp-admin/admin.php?page=yatra-setup</code>. It's non-destructive — already saved settings stay in place.</div>

## Step 2 — Confirm permalinks

Yatra needs WordPress to use pretty permalinks. Open <span class="screen-path">Settings → Permalinks</span> and make sure **Plain** is **not** selected. Pick **Post name** if you're not sure.

Click **Save Changes** even if you didn't change anything — saving flushes the rewrite rules so all of Yatra's URLs work.

After this, these URLs should resolve on the front of your site:

| URL                | What it shows                              |
| ---                | ---                                        |
| `/trip/`           | Public trip catalog (archive)              |
| `/destination/`    | Destinations archive                       |
| `/activity/`       | Activities archive                         |
| `/trip-category/`  | Trip categories archive                    |
| `/book/`           | Booking flow / cart                        |
| `/my-account/`     | Customer account                           |

You can rename any of these slugs later in <span class="screen-path">Yatra → Settings → Permalink</span>.

## Step 3 — Connect a payment method

If you only sell as enquiries, skip to Step 4. Otherwise:

<ol class="step-list">
  <li>Open <span class="screen-path">Yatra → Settings → Payment</span>.</li>
  <li>Tick <strong>PayPal</strong> (always free).</li>
  <li>Paste your PayPal email (Simple mode), or Client ID + Client Secret (REST mode — there's no separate "Webhook ID" field; PayPal verification uses the same credentials).</li>
  <li>Tick <strong>Test mode</strong> for now.</li>
  <li>Click <strong>Save</strong>.</li>
</ol>

You can also enable **Pay Later** (free) — useful for travel agents who confirm trips on a deposit + balance flow without an online card.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Need Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, or Bank Transfer?</span>
  </div>
  <p class="pro-callout__desc">These gateways are part of <strong>Yatra Pro</strong>. You'll see them listed in <span class="screen-path">Settings → Payment</span> with a <strong>PRO</strong> badge — enabling them requires an active Pro license.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Compare Yatra Pro plans →</a>
</div>

The full gateway-by-gateway guide lives on the [Payments](/payment-settings) page.

## Step 4 — Build your first trip

Now the fun part.

<ol class="step-list">
  <li>Click <span class="screen-path">Yatra → Trips → All Trips</span>, then click <strong>+ Add New</strong> in the top right.</li>
  <li>Type the trip title in the modal that appears (e.g. "Everest Base Camp Trek"), and click <strong>Create</strong>. The Trip Builder opens.</li>
  <li>The builder has a <strong>vertical sidebar of sections</strong>: Trip Basics, Location & Route, Pricing, Availability & Booking, Trip Details, Media & Gallery, Downloads, Categories & Attributes, SEO & Marketing, Advanced Settings.</li>
  <li>On <strong>Trip Basics</strong>, write a short overview, set the duration (number of days / nights), upload a featured image.</li>
  <li>On <strong>Pricing</strong>, set a regular price (or per–traveler-category pricing if you have adult / child / infant rates).</li>
  <li>On <strong>Availability & Booking</strong>, set min and max travelers per booking and the availability window.</li>
  <li>On <strong>Trip Details → Itinerary</strong>, add at least one day's worth of itinerary so the trip page has body content.</li>
  <li>Click <strong>Publish Trip</strong> in the top right.</li>
</ol>

Open the trip URL in a private browser window. You should see the public trip page with a **Book now** button.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Featured Priority &amp; sticky promotion</span>
  </div>
  <p class="pro-callout__desc">Use <strong>Featured Priority</strong> on each trip — set it to <em>Featured</em>, <em>New</em>, or <em>Limited</em> to control catalog ordering and add a corner badge to the trip card. Combined with <strong>Custom Landing Pages</strong>, you get full control over which trips lead.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock priority sorting →</a>
</div>

## Step 5 — Make a test booking

While in your private window:

<ol class="step-list">
  <li>Click <strong>Book now</strong>.</li>
  <li>Pick a date / departure (or "Any date" if you've left availability open).</li>
  <li>Set traveler counts (1 adult, 0 child, etc.).</li>
  <li>Continue to checkout. Fill in test contact details.</li>
  <li>Pay with the gateway sandbox account.</li>
  <li>You should land on the <strong>Booking confirmation</strong> page.</li>
</ol>

Back in the admin:

- <span class="screen-path">Yatra → Bookings</span> — the booking shows up with a status pill.
- <span class="screen-path">Yatra → Customers</span> — the test customer is created.
- <span class="screen-path">Yatra → Payments</span> — the payment is recorded.
- Email — the **Booking confirmation** + **Admin notice** templates should have arrived.

## Step 6 — Verify the customer experience

Still as the test customer:

<ol class="step-list">
  <li>Open <code>/my-account/</code> — the booking should be in <strong>My bookings</strong>.</li>
  <li>Click into the booking — you should see traveler details, payment status, and a download link for the receipt.</li>
  <li>Open the email — copy and links should match what you set in <span class="screen-path">Yatra → Email</span>.</li>
</ol>

That's a working booking office.

## Recommended next moves

- Add a **discount code** under <span class="screen-path">Yatra → Discounts</span> to test the discount flow.
- Connect a real **transactional email service** (SendGrid, Postmark, Mailgun) — `wp_mail()` alone is unreliable for production. See [Email & notifications](/email-settings).

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Dynamic pricing &amp; deposits</span>
  </div>
  <p class="pro-callout__desc">Sell by demand, season, group size, or last-minute. Take 30% deposits up front and auto-charge balances later. <strong>Dynamic Pricing</strong>, <strong>Flexible Payments</strong>, and <strong>Scheduled Payments</strong> are the three Pro modules that make this happen.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Upgrade to Yatra Pro →</a>
</div>

## What's next

- [Trips & catalog](/tour-booking) — full Trip Builder walkthrough.
- [Availability — three-layer system](/availability) — manual dates, recurring rules, and the trip default.
- [Departures](/departures) — the operator view of every scheduled run.
- [Bookings & customers](/booking-settings) — the booking lifecycle.
- [Payments](/payment-settings) — gateway-by-gateway setup.
