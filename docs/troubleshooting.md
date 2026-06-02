---
title: Troubleshooting
description: Diagnose and fix the most common Yatra issues — REST 404s, permalinks, gateway sandbox mode, email deliverability, role / capability oddities, cache plugins, and PHP fatals.
---

# Troubleshooting

This page lists the issues we see most often and the fastest way through them.

## "REST returns 404 / nothing loads in the admin"

**Symptom:** The admin React shell shows blank panels; the network tab shows `404` for `/wp-json/yatra/v1/...`.

**Cause:** Pretty permalinks are off, or a security plugin is blocking REST.

**Fix:**

<ol class="step-list">
  <li>Go to <span class="screen-path">Settings → Permalinks</span>. Pick <strong>Post name</strong> (or any non-Plain). Click <strong>Save Changes</strong>.</li>
  <li>Visit <code>/wp-json/yatra/v1/</code> in a browser. You should see JSON, not 404.</li>
  <li>If you have <strong>Wordfence</strong>, <strong>iThemes Security</strong>, etc., temporarily allow <code>wp-json</code> for your IP.</li>
</ol>

## "Permalinks 404 on the front of the site"

**Symptom:** `/trip/`, `/book/`, `/my-account/` all return 404.

**Fix:** Open <span class="screen-path">Settings → Permalinks</span> and click **Save Changes** (no need to change anything; saving flushes rewrite rules). Or run `wp rewrite flush` via WP-CLI.

## "Stripe is locked at checkout" <span class="pro-pill">PRO</span>

**Symptom:** PayPal works fine, but Stripe is greyed out / says "available with Pro".

**Cause:** Stripe is registered with Pro tier. It only activates at checkout when a Pro license is active.

**Fix:** Install Yatra Pro and activate your license under <span class="screen-path">Yatra → License</span>.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Unlock Stripe + 6 more gateways</span>
  </div>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Compare Pro plans →</a>
</div>

## "PayPal webhook shows but no booking is confirmed"

**Symptom:** PayPal logs show 200 from your site, but the booking stays **pending**.

**Cause:** Mode mismatch (sandbox vs live), wrong Client ID / Secret, or REST routes blocked by security.

**Fix:**

<ol class="step-list">
  <li>Open <span class="screen-path">Yatra → Settings → Payment → PayPal</span>. Confirm <strong>Mode</strong> matches the credentials you pasted (Sandbox keys won't work in Live mode and vice versa).</li>
  <li>Confirm the global <em>Test Mode</em> switch (under Settings → Payment → Global) matches the credentials too.</li>
  <li>Confirm REST is reachable — visit <code>/wp-json/yatra/v1/payment/webhook/paypal</code> (you should get a 405 method-not-allowed for GET, not 403).</li>
  <li>Check <span class="screen-path">Yatra → Tools → Logs → Payment</span> for webhook errors.</li>
</ol>

## "Stripe webhook signature mismatch"

**Symptom:** Stripe says webhook delivery failed; Yatra logs say "invalid signature".

**Cause:** Webhook secret in Yatra doesn't match Stripe's webhook signing secret.

**Fix:**

<ol class="step-list">
  <li>In Stripe → <strong>Developers → Webhooks</strong> → click your endpoint → <strong>Reveal secret</strong> under <strong>Signing secret</strong> (<code>whsec_...</code>).</li>
  <li>Paste it into <span class="screen-path">Yatra → Settings → Payment → Stripe → Webhook secret</span>.</li>
  <li>Save. Re-send a test event in Stripe.</li>
</ol>

## "Emails aren't arriving"

**Symptom:** No booking confirmation / receipt / cancellation emails reach the customer.

**Fix:**

<ol class="step-list">
  <li>Install a transactional email plugin: <strong>WP Mail SMTP</strong>, <strong>FluentSMTP</strong>, or <strong>Post SMTP</strong>.</li>
  <li>Connect to a transactional ESP: SendGrid, Postmark, Amazon SES, Mailgun.</li>
  <li>Set <strong>From name</strong> and <strong>From email</strong> to a <code>noreply@</code> on your sending domain.</li>
  <li>Configure <strong>SPF</strong>, <strong>DKIM</strong>, and <strong>DMARC</strong> on the From domain.</li>
  <li>Test deliverability via <a href="https://www.mail-tester.com/">mail-tester.com</a>.</li>
</ol>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Email Automation logs</span>
  </div>
  <p class="pro-callout__desc">With <strong>Email Automation</strong> on, the <strong>Email logs</strong> tab shows every send, recipient, status, and ESP response code — invaluable for debugging delivery.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock email automation →</a>
</div>

## "Featured priority filter doesn't work in shortcode / block"

**Symptom:** `[yatra_trip featured_priority="featured"]` returns nothing.

**Cause:** Trips don't have Featured Priority set, or the value you're filtering on doesn't match the actual enum.

**Fix:**

<ol class="step-list">
  <li>Open the trip → <strong>Categories &amp; Attributes</strong> → set <strong>Featured Priority</strong> to one of the four valid values: <em>None</em>, <em>Featured</em>, <em>New</em>, or <em>Limited</em>.</li>
  <li>Save.</li>
  <li>Pass the lower-case value in the shortcode: <code>featured_priority="featured"</code>, <code>"new"</code>, or <code>"limited"</code>.</li>
</ol>

The legacy `featured="1"` attribute is also accepted as an alias for `featured_priority="featured"`.

## "Setup wizard never finishes"

**Symptom:** After activation, you can't get past the setup wizard.

**Fix:**

<ol class="step-list">
  <li>Make sure your account has <code>manage_options</code>.</li>
  <li>Disable WAF / Security plugins temporarily, run the wizard, re-enable.</li>
  <li>If still stuck: visit <code>/wp-admin/admin.php?page=yatra-setup</code> directly.</li>
</ol>

## "I deactivated Pro and lost some data"

**Symptom:** After turning off Yatra Pro, dynamic pricing / trip consent / additional services disappear.

**Cause:** Pro features render only when their module is on. **Stored data is preserved.**

**Fix:** Re-enable the module under <span class="screen-path">Yatra → Modules</span> to bring back the UI.

## "Cache plugin breaks checkout / login"

**Symptom:** Login form keeps showing logged-out state; booking flow looks blank.

**Cause:** Page cache is serving the logged-out version of a session-specific page.

**Fix:** Exclude these from your page cache:

- `/booking/`, `/my-account/`
- `/wp-json/yatra/v1/checkout/*`, `/wp-json/yatra/v1/me/*`

## "PHP fatal errors after enabling Pro"

**Symptom:** White screen of death right after activating Yatra Pro.

**Cause:** Mismatched plugin versions, or Pro was activated before Free.

**Fix:**

<ol class="step-list">
  <li>Add <code>define('WP_DEBUG', true); define('WP_DEBUG_LOG', true);</code> to <code>wp-config.php</code>.</li>
  <li>Re-read the error in <code>wp-content/debug.log</code>.</li>
  <li>Update both plugins to the latest versions.</li>
  <li>Activate Yatra <strong>first</strong>, then Yatra Pro.</li>
</ol>

## "I'm on a case-sensitive Linux host and templates don't load"

**Symptom:** A template override in your theme isn't picked up.

**Cause:** macOS dev is case-insensitive; production Linux is case-sensitive. A template with the wrong case in the path silently fails.

**Fix:** Match Yatra's exact casing — `templates/single-trip.php`, `templates/partials/trip-card.php`, etc.

## "REST returns 403 for an admin user"

**Symptom:** Admin REST routes return `rest_forbidden`.

**Cause:** Cookie session expired, missing `X-WP-Nonce`, or a role plugin removed a capability.

**Fix:**

<ol class="step-list">
  <li>Refresh the WordPress admin page (re-issues a fresh nonce).</li>
  <li>Confirm your user has <code>manage_options</code>.</li>
  <li>Check that a role plugin (Members, User Role Editor) didn't remove Yatra capabilities from administrator.</li>
</ol>

## "Pro license shows valid in wpyatra.com dashboard but Yatra says invalid"

**Symptom:** Account dashboard says **Active**; <span class="screen-path">Yatra → License</span> says invalid.

**Cause:** License key activated on too many sites, or the site URL differs (`www.` mismatch).

**Fix:**

<ol class="step-list">
  <li>Open the wpyatra.com account dashboard and confirm site limits.</li>
  <li>Deactivate old / dev URLs.</li>
  <li>Click <strong>Check status</strong> in <span class="screen-path">Yatra → License</span>.</li>
</ol>

## "Dynamic pricing rules don't apply to bookings" <span class="pro-pill">PRO</span>

**Symptom:** Rules look right in the admin, but customer prices don't change.

**Fix:**

<ol class="step-list">
  <li>Confirm the <strong>Dynamic Pricing</strong> module is enabled under <span class="screen-path">Yatra → Modules</span>.</li>
  <li>Open the rule. Confirm <strong>Status</strong> is <em>Active</em>.</li>
  <li>Confirm the rule's conditions match the trip / dates being booked. Check the <strong>Scope</strong> field: <em>All trips</em>, <em>Specific trips</em>, <em>By category</em>, or <em>By destination</em>. If you're scoped to specific trips, make sure the booking's trip is in the list.</li>
  <li>For Early Bird / Last Minute rules, double-check the <em>days before departure</em> number against your test booking's travel date.</li>
  <li>If two rules both match, check the <em>Priority</em> field and the <em>Stack with other rules</em> toggle — a higher-priority rule with Stack = off shortcircuits everything below it.</li>
  <li>Clear any object cache (Redis, Memcached) — pricing is cached briefly.</li>
</ol>

See [Dynamic Pricing](/modules/dynamic-pricing) for the full module reference.

## "Bulk delete dynamic pricing rules fails"

**Symptom:** Bulk action runs but rules stay.

**Fix:** This was fixed in a recent release — update Yatra Pro to the latest. The fix uses `Promise.allSettled` so any failed row doesn't block the rest.

## Diagnostics tools

- <span class="screen-path">Yatra → Tools → System Status</span> — PHP, WP, server, plugin versions.
- <span class="screen-path">Yatra → Tools → Jobs</span> — background export/import job progress.
- <span class="screen-path">Yatra → Tools → Logs</span> — Error / Payment / Booking / System tabs.
- <span class="screen-path">Yatra → Tools → Migration</span> — schema / data migration utilities.

## When to file a bug

Before filing, please:

<ol class="step-list">
  <li>Update both Yatra and Yatra Pro to the latest.</li>
  <li>Disable other plugins one by one to rule out conflicts.</li>
  <li>Switch to a default theme briefly to rule out theme conflicts.</li>
  <li>Capture the exact steps + a <code>WP_DEBUG</code> log of the error.</li>
</ol>

Then [file a bug on GitHub](https://github.com/MantraBrain/yatra) (free) or open a [priority support ticket](https://wpyatra.com/contact/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) (Pro).

## What's next

- [Installation](/installation)
- [Payments](/payment-settings)
- [Email & notifications](/email-settings)
- [Support](/support)
