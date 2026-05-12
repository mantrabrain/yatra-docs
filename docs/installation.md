---
title: Install Yatra
description: Install the free Yatra travel booking plugin (and Yatra Pro) on your WordPress site, then confirm everything is working with a quick health check.
---

# Install Yatra

You install Yatra the same way you install any WordPress plugin — there is **no SaaS to sign up for**. Yatra is a tour-operator booking office that runs entirely on your own site.

**First time in WordPress?** After you activate the plugin, open **Yatra** in the left sidebar and use [Your WordPress admin (Yatra)](/admin-dashboard) as a plain-English map of every menu item.

## Before you start

Make sure your site meets these:

| What            | Minimum  | Recommended |
| ---             | ---      | ---         |
| WordPress       | 6.0      | 6.4 or newer |
| PHP             | 7.4      | 8.1 or newer |
| MySQL / MariaDB | 5.7 / 10.3 | MySQL 8 / MariaDB 11 |
| Memory          | 128 MB   | 256 MB or more |
| HTTPS           | Required for live payments | Always recommended |

::: tip Not sure what your hosting has?
Open <span class="screen-path">Tools → Site Health → Info</span> in WordPress. The PHP and database versions are listed there.
:::

## Step 1 — Install the free plugin

The free **Yatra** plugin gives you the full booking office — trips, departures, customer accounts, native checkout (PayPal + Pay Later), enquiries, reviews, and the email pipeline.

You have three options:

<ol class="step-list">
  <li>The easy way — In WordPress, go to <span class="screen-path">Plugins → Add New</span>, search <strong>Yatra</strong>, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
  <li>If you have the ZIP file — Go to <span class="screen-path">Plugins → Add New → Upload Plugin</span>, choose <code>yatra.zip</code>, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
  <li>The technical way — drop the <code>yatra/</code> folder into <code>wp-content/plugins/</code> over SFTP, then activate from the Plugins screen.</li>
</ol>

When you activate, Yatra does a one-time setup behind the scenes:

- Creates the database tables for bookings, customers, payments, departures, and enquiries.
- Registers the trip-related custom post types and taxonomies (destinations, activities, trip categories, difficulty levels, attributes).
- Seeds the default email templates.
- Adds a new **Yatra** item to the WordPress admin sidebar.

## Step 2 — Install Yatra Pro

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Yatra Pro is the upgrade plugin</span>
  </div>
  <p class="pro-callout__desc">Yatra Pro is a separate plugin that unlocks licensed modules — Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, and Bank Transfer gateways; Dynamic Pricing; Flexible / Scheduled Payments; Email Automation sequences; Google Calendar sync; Additional Services upsells; Trip Consent waivers; Mailchimp / GA4 / Facebook Pixel; Abandoned Booking Recovery; Custom Landing Pages; Advanced Discount; Dynamic Form Field; and more. The free plugin must be installed and active first.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">View Yatra Pro plans →</a>
</div>

If you bought a Pro license:

<ol class="step-list">
  <li>Make sure the free <strong>Yatra</strong> plugin is installed and active first. Yatra Pro depends on it.</li>
  <li>Download <code>yatra-pro.zip</code> from your wpyatra.com account.</li>
  <li>Go to <span class="screen-path">Plugins → Add New → Upload Plugin</span>, choose the ZIP, <strong>Install</strong>, and <strong>Activate</strong>.</li>
  <li>Open <span class="screen-path">Yatra → License</span>. Paste your license key, then click <strong>Save &amp; activate</strong>.</li>
  <li>Open <span class="screen-path">Yatra → Modules</span> and turn on the modules your plan includes.</li>
</ol>

![License screen — paste key and click Save & activate](/screenshots/dashboard/license.webp)

<div class="ui-tip"><strong>Tip:</strong> Yatra Pro is delivered as a packaged plugin ZIP — no Composer install needed for the standard release flow. If you cloned source from Git, run <code>composer install --no-dev --optimize-autoloader</code> from the <code>yatra-pro</code> folder before activating.</div>

## Step 3 — Confirm Yatra is healthy

Run this quick checklist before adding real content.

| Check                                                                              | Where                                              |
| ---                                                                                | ---                                                |
| The **Yatra** item appears in the admin sidebar                                    | Admin sidebar                                      |
| Permalinks are not set to **Plain**                                                | <span class="screen-path">Settings → Permalinks</span> |
| Visiting `/wp-json/yatra/v1/` returns JSON (not a 404)                             | Browser address bar                                |
| Visiting `/book/` shows the booking landing page (even if empty)                   | Front of your site (the slug matches *Permalink → Booking Base*) |
| **License** says **Active** <span class="pro-pill">PRO</span>                      | <span class="screen-path">Yatra → License</span>   |

If any of these are red, head over to [Troubleshooting](/troubleshooting).

## Multisite

Yatra is **Network: true** — it can be activated across a WordPress multisite network.

<ol class="step-list">
  <li>Place the <code>yatra/</code> (and <code>yatra-pro/</code>) folder into <code>wp-content/plugins/</code>.</li>
  <li>Go to <span class="screen-path">Network Admin → Plugins</span> and choose <strong>Network Activate</strong>.</li>
  <li>Visit each subsite once to let Yatra create that subsite's tables.</li>
  <li>Activate the Pro license per subsite (one license slot each by default).</li>
</ol>

## What's next

- Run the [Quick start](/quick-start) — picks pages, currency, and gateways and gets you to your first published trip in under an hour.
- Or jump straight to [Trips & catalog](/tour-booking) to start building.
