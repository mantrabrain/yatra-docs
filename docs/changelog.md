---
title: Changelog
description: Recent free and Pro releases — what changed, what to test, and the safe upgrade path.
prev:
  text: Troubleshooting
  link: /troubleshooting
next:
  text: Support
  link: /support
---

# Changelog

This is the operator-facing release log for Yatra Free and Yatra Pro. The canonical changelogs ship inside each plugin's `readme.txt` (free: [WordPress.org](https://wordpress.org/plugins/yatra/#developers); Pro: bundled in the plugin ZIP). Use this page for context — what changed, why it matters, and what to test before deploying to production.

## How to read these notes

- **Safe to update from X** means the patch is non-breaking. You can update and keep working.
- **Major version** (3.x → 4.x) means breaking changes; back up first.
- **Pro depends on free** — always update the free plugin first, then Pro.

## Yatra Free

### 3.0.4

Security and correctness release. **Strongly recommended** if you accept payments. No UI changes — all fixes are server-side and backward compatible.

**Payment-flow security**

- **Server-authoritative amounts.** `POST /yatra/v1/payment/create-intent` now ignores the `amount` and `currency` in the request body when a `booking_id` is supplied — both values are recomputed from the stored booking row. A tampered front-end can no longer pay $1 for a $1000 trip. Mismatches fire a new `yatra_payment_amount_mismatch` action so you can wire fraud monitoring.
- **Booking ownership enforcement.** `POST /payment/confirm` and `GET /payment/status/{booking_id}` now verify the requester is the booking owner, an admin, or a guest with a matching short-lived `booking_token`. Anonymous reads of arbitrary booking IDs return `401`.
- **Idempotent payment recording.** `PaymentRepository::create()` and `handle_successful_payment()` now skip insertion if a payment with the same `transaction_id` already exists for the booking. Reloads, parallel return-to-site + webhook races, and double-clicked confirmations all collapse to a single payment row and a single confirmation email.
- **Cross-booking transaction reuse blocked.** Submitting a successful `transaction_id` against a different booking now returns `409 transaction_mismatch`.

**PDF generation hardening**

- dompdf is now `chroot`'d to `ABSPATH` so a crafted template can no longer read `/etc/passwd` via `file://`.
- Remote fetches restricted to `http://` / `https://` only, with a 5-second timeout, peer-verified TLS, and a `YatraPDF/<version>` user-agent so dompdf-originated traffic is greppable in upstream logs.
- New `yatra_pdf_remote_enabled` filter — return `false` to disable remote loading entirely if your PDFs never reference external images.
- `Content-Disposition` filename now CR/LF-stripped and emits an RFC 5987 `filename*=UTF-8''…` form alongside the ASCII fallback. Closes a header-injection / cache-poisoning vector for PDFs whose filename derives from booking metadata.
- Template renderer no longer uses `extract($data, EXTR_OVERWRITE)` — switched to identifier-validated keys with `EXTR_SKIP` so a malicious data array cannot inject arbitrary local variables into the template scope.

**Migration safety**

- `ItineraryMigration::parseItineraryData()` now passes `['allowed_classes' => false]` to `unserialize()`, blocking PHP object-injection / `__destruct` gadget chains via crafted legacy post meta. Stopped silently swallowing `json_decode` errors.

**Upgrade safety:** safe to update from 3.0.3.x. PHP 7.4+ continues to be supported.

### 3.0.3

The most recent free release. Significant content for both authors and operators.

**Trip catalog and listings**

- New `[yatra_trip_category]` shortcode and **Trip categories** block — list trip categories in the same card layout as destinations, with optional filters and pagination (`trip_category_page`).
- **Featured Priority** filter is now a first-class attribute on `[yatra_trip]` and the Trip block (`featured_priority="featured|new|limited"`). It mirrors the trip form's *Categorization → Featured Priority* value.
- **Difficulty / fitness-level** filter (`difficulty="3,5"`) now works on both shortcode and block.
- The legacy `featured="1"` shortcode attribute is preserved as a back-compat alias for `featured_priority="featured"`. If both are set, `featured_priority` wins.
- Filter rules are centralized in `TripListingFilterBuilder` so the same logic applies to shortcode and block inputs.

**Trip block**

- The legacy "Show only featured trips" toggle was retired. Its behavior is now expressed by setting **Featured Priority = Featured**.
- Existing block instances saved with `featured: true` are auto-migrated to `featured_priority: "featured"` when reopened in the editor.
- Inserter title and labels read **Trip** (registered block name `yatra/tour` is preserved for back-compat with saved posts).

**Card UX (Destination / Activity / Trip Category)**

- The whole card is now a click target instead of just the title text. Implemented via the WAI-ARIA "stretched link" pattern (CSS pseudo-element on the existing title `<a>`) so a single canonical link is exposed to screen readers and crawlers; keyboard focus shows a card-wide outline.

**Enquiry emails**

- <span v-pre><code>{{trip_name}}</code></span> (and other trip merge tags) now resolve correctly when an enquiry is submitted from a single-trip page. The modal posts `trip_id` / `trip_slug` reliably; backend normalizes `tripId` casing and derives `trip_id` from slug or `HTTP_REFERER` when missing.
- `EnquiryService` now eager-loads joined trip data before firing `yatra_enquiry_created` so admin templates and Pro automation receive a complete object.
- Merge-tag regex now tolerates surrounding whitespace (<span v-pre><code>{{ trip_name }}</code></span>).

**Payments admin**

- The *Add / Edit Payment* form's **Booking ID** text field is replaced with a searchable **booking picker** that queries `GET /yatra/v1/bookings?search=…` and matches against booking code (reference), customer name, and email — debounced server-side search with rich rows.
- The *Payment Date* field now uses the shared admin **DatePicker** for visual parity with every other date field in the admin and prevents future-dated payments by default.

**Single trip**

- Group discount discoverability in the sidebar.
- **Similar trips** links respect plain permalinks via `yatra_get_trip_permalink()`.
- Enquiry modal **Send Enquiry** uses `yatra-booking-button` so primary color matches **Check Availability** and global `--yatra-primary` tokens.

**Discounts**

- REST and repository hardening — writable column whitelist, safer updates.

**Upgrades**

- Version-gated free upgrade runner.
- Legacy payment tokens table dropped when applicable (see `Upgrade_3_0_3`).

**Admin / i18n**

- Trip Builder meal plan strings use shared labels.
- Attribute icon picker preserves Font Awesome `provider` after save.
- Front-end Important Info shows translated meal plan labels (`yatra_meal_plan_label()`).

**Upgrade safety:** safe to update from 3.0.2.x.

### 3.0.2.9

- **Mobile booking bar:** Improved sticky booking UI on small screens (date + travelers layout, full-width travelers dropdown opening upward, and reliable click targets).
- **Admin caching:** Fixed service cache invalidation so updates (including SEO fields) reflect immediately when cache is enabled.

Safe to update from 3.0.2.8.

### 3.0.2.8

- **Booking UI:** Added Advanced settings to select **Terms & Conditions** and **Privacy Policy** pages; booking form now links to these pages (Privacy falls back to WordPress Settings → Privacy when unset).
- **Fix (Usage Tracking):** Moved `StatsUsage` into `app/Services` and updated references to avoid case-sensitive autoload issues on Linux hosts.
- **Fix (Gallery Modal):** Hardened gallery modal image URL resolution against LiteSpeed Cache lazy-load placeholders.

Safe to update from 3.0.2.7.

### 3.0.2.7

- **Fix (Gallery Modal):** Improved compatibility with LiteSpeed Cache lazy-load placeholders (base64 `src`) so the modal always opens the real image URLs.
- **Compat (LiteSpeed Cache):** Excluded Yatra hero/gallery selectors from LiteSpeed lazy-load and excluded Yatra trip assets from optimisation where needed.

Safe to update from 3.0.2.6.

### 3.0.2.6

- **Fix:** Composer autoload path was declared as `includes/Admin/` (uppercase) but the directory on disk is `includes/admin/` (lowercase); caused fatal `include` warnings on Linux/cPanel servers (case-sensitive filesystems).
- **License:** Removed stub `LicenseController` from the free plugin — all `/yatra/v1/license/*` routes are now registered exclusively by Yatra Pro's own controller, eliminating any route conflicts.
- **Admin UI (Additional Services):** Added missing **Add New Service** button via the `PageHeader` component on the Additional Services screen.

Safe to update from 3.0.2.5.

### 3.0.2.5

- Admin: add Review + Upgrade notices (React UI + WordPress notices) with smart dismiss scheduling.
- Setup wizard: save step settings when navigating between steps.

### 3.0.2.4

- **REST:** implemented `TripService::permanentDelete()` so `DELETE /yatra/v1/trips/{id}/permanent-delete` no longer fatals (fixes permanent delete from trash and bulk actions).
- **Admin (React):** bulk trip actions rely on `BulkActionToolbar` confirmation only (removed duplicate `window.confirm`); improved bulk dialog copy for `mark_*` actions.

Safe to update from 3.0.2.3.

### 3.0.2.3

- **Admin (React):** moved fullscreen shell CSS into the document head to reduce wp-admin chrome flicker; added HTML/CSS boot splash and `modulepreload` for the admin bundle; primary sidebar navigation uses client-side URL updates so the PHP loading state does not repeat on every screen change.
- **REST:** registered License routes in the API registry so `GET /yatra/v1/license` works on the free plugin (License screen and scripts that probe it).
- **Admin UI:** hardened Departures and Availability trip dropdowns against TanStack Query cache shapes and `/trips` list payloads (fixes `map` / `find` errors when navigating without a full reload).

Safe to update from 3.0.2.2.

### 3.0.2.2

Maintenance / patch release. Safe to update from 3.0.2.1.

### 3.0.2.1

- **Readme:** linked Pro gateways, modules, traveler features, and related mentions to wpyatra.com/pricing throughout the long description, FAQ, and quick links.

Patch release; safe to update from 3.0.2.

### 3.0.2

- **Readme:** reorganized the long description — the **Yatra Pro** section now appears **before** **Blocks and shortcodes** for a clearer Free → Pro → integration flow.

Documentation-only release for the plugin directory listing; no code changes required for existing 3.0.x sites.

### 3.0.1

- Maintenance release: updated WordPress.org banner and directory assets (including screenshots) for the 3.x listing.
- Shortened the plugin short description to meet WordPress.org's 150-character limit so imports are no longer truncated.

### 3.0.0

- **Major release:** redesigned admin experience, streamlined booking and traveler account flows, expanded gateway and module architecture for Pro, and ongoing hardening for production travel sites.
- See [wpyatra.com/yatra-3-0/](https://wpyatra.com/yatra-3-0/) for the release writeup.
- **Always back up** before upgrading from 2.x; follow migration guidance in [Installation](/installation).

### Earlier versions (2.x)

For 2.x changelog entries, see the plugin's [GitHub releases](https://github.com/MantraBrain/yatra/releases).

## Yatra Pro

### 3.0.1

The most recent Pro release. Pair with Yatra Free 3.0.3 (or current 3.0.x).

**Dynamic Pricing — admin actions**

- The **Move to Trash** and **Delete Permanently** confirmations on a single rule now actually run (previously stub callbacks did nothing).
- Bulk **Move to Trash** is fixed end-to-end (the rules controller now accepts `status: trash` in both `PUT /rules/{id}` and `POST /bulk-status`).
- Bulk **Delete Permanently** is reachable from the Trash filter.
- Repository statistics expose `trash_rules`; default *Total* count and the *All* tab now exclude trashed rules per WordPress convention.
- Bulk runner uses `Promise.allSettled` and reports partial-success state instead of failing the entire batch on a single bad row.

**Email Automation (enquiry)**

- Defensive fallback in `EmailAutomationService::buildEnquiryVariables()` resolves `trip_name` / `trip_url` directly from `TripRepository` when an enquiry payload arrives without joined trip data (paired with the free plugin's eager-loading fix in `EnquiryService`).
- Prevents <span v-pre><code>{{trip_name}}</code></span> from rendering as *General Enquiry* on enquiry-created emails.

**Version**

- Yatra Pro **3.0.1** (release packaging). Use with Yatra free **3.0.3** or current supported 3.0.x.
- Safe to update from Pro **3.0.0.1** or **3.0.3**.

### 3.0.2

Security and correctness release. Pairs with Yatra free **3.0.4**. **Strongly recommended** if you have any Pro gateway enabled.

**Stripe**

- New webhook handler with proper `Stripe-Signature` HMAC-SHA256 verification (5-minute replay tolerance, key-rotation aware via multiple `v1=` signatures). Subscribe to `payment_intent.succeeded`, `payment_intent.payment_failed`, and `charge.refunded` in your Stripe dashboard. **Webhooks without a configured secret are now rejected** — set the *Webhook secret* field if you rely on Stripe's retry-driven delivery.
- `completePayment()` is now idempotent: a webhook arriving after the user already returned to your site is a no-op. Same `(booking_id, transaction_id)` pair can only ever produce one payment row.
- New actions `yatra_stripe_payment_succeeded`, `yatra_stripe_payment_failed`, `yatra_stripe_charge_refunded` for downstream automations.

**Razorpay**

- `completePayment()` is now idempotent on `(booking_id, transaction_id)` — webhook + return-handler races collapse to a single payment row.

**Partial / deposit payment correctness**

- Stripe and Razorpay no longer force-mark a booking as fully paid when only a deposit was collected. `amount_paid` now accumulates correctly; `payment_status` resolves to `partial` / `paid` based on the remaining balance.

**License & settings hardening**

- `GET /yatra/v1/license` no longer returns the raw license key or the full EDD `server_response` blob. Returns a masked key (last 4 visible) plus a whitelisted subset of expiry / activation fields.
- `POST /yatra/v1/settings` now writes only schema-approved keys via the new `yatra_pro_writable_settings_schema` filter. Unknown keys are reported in the response's `rejected_keys` array instead of silently overwriting arbitrary `yatra_pro_*` options. If you have a custom Pro module that wrote settings via this endpoint, register your keys with the filter.

**Upgrade safety:** update Yatra free to **3.0.4** *first*, then Yatra Pro to 3.0.2. Both are safe from their respective previous patch versions.

### 3.0.3

- **Scheduled payments:** migrate off legacy payment tokens to `gateway_payment_method_id`; Pro upgrade runner and `Upgrade_3_0_0_1` (runs when crossing from below 3.0.0.1).
- **Version:** aligned with Yatra Free 3.0.3 for release packaging.

Safe to update from 3.0.0.1.

### 3.0.0.1

- **Fix:** avoid database errors on sites missing the `zip` column on the customers table (Mailchimp + Facebook Pixel integrations).

### 3.0.0

- Initial release of Yatra Pro
- Added Google Calendar Integration module
- Enterprise-grade architecture with clean code structure
- PSR-4 autoloading and PSR-12 coding standards

## Upgrade strategy

### Patch updates

`3.0.x → 3.0.y`. Safe to update on the live site during a quiet window. The pre-upgrade check is:

1. Take a database backup (most managed hosts auto-backup; verify yours did).
2. Update on a staging or backup site first if you have one.
3. Update on production.
4. Visit **Yatra → Tools → Migration** to confirm any database upgrades ran cleanly.

### Minor updates (planned)

`3.0.x → 3.y.0`. Same as patch but read the changelog for any settings that need adjusting (e.g. a new module that's enabled by default).

### Major updates

`3.x → 4.x`. **Don't** run on production first. Migration steps:

1. Stage on a clone of production.
2. Run the migration tool, validate trips/bookings/customers visually.
3. Test a real booking end-to-end with a sandbox gateway.
4. Once confirmed, schedule a brief maintenance window on production.
5. Backup → update → verify → flush rewrites → unfreeze.

## Where else to track changes

- [WordPress.org Yatra plugin page](https://wordpress.org/plugins/yatra/) — official release dates and download counts.
- [GitHub releases](https://github.com/MantraBrain/yatra/releases) — release notes and downloadable ZIPs.
- [wpyatra.com/blog](https://wpyatra.com/) — long-form release writeups for major versions.
