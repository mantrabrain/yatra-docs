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

### 3.0.15 — 7 September 2026

Backward-compatible feature + fix release. Safe to update — **no existing site changes behaviour on upgrade.**

**Auto-Confirm Bookings is now a 3-way choice**

- The old on/off *Auto-Confirm Bookings* toggle becomes a three-way setting (`auto_confirm_mode`): **Don't auto-confirm** (`none`), **Auto-confirm online payments only** (`online`, the new default for fresh installs), and **Auto-confirm all** (`all`). See [Settings → Auto-Confirm modes](/settings#auto-confirm-modes).
- **What existing sites get.** A site that had the toggle **on** maps to `all` — identical behaviour. A site that had it **off** maps to `online` — identical for PayPal, the synchronous gateways and every *full* payment (3.0.14 already confirmed a payment that settled the balance in full). The **one** change is for sites with it off that take a **deposit / partial payment through Stripe, Razorpay or T-Bank**: those Pro gateways used to confirm the booking regardless of the setting, and a deposit now leaves it *Pending* until the balance is paid — which is the bug this release fixes. Choose **Auto-confirm all** to keep deposits confirming, or **Don't auto-confirm** to hold every booking for manual review (previously impossible, because *off* still confirmed full online payments).
- Because a deposit booking may now sit as *Pending* until the balance is paid, the **pre-trip reminder** now also goes to pending bookings that have paid a deposit (it already includes the outstanding-balance note); previously only confirmed bookings were reminded. Unpaid pending bookings are still not reminded. A pending deposit booking keeps its seat and is never expired by the unpaid-booking cleanup (that only touches bookings with no payment at all).
- Under `online`, only a payment that settles the balance **in full** confirms the booking; deposits / partial payments and offline methods (bank transfer, pay-later) stay *Pending*.
- Developers can override the decision per booking with the [`yatra_confirm_booking_on_payment`](/hooks-filters#payments) filter.

**Fix — payment gateways ignored the Auto-Confirm setting**

- Several gateways (Stripe, Razorpay, Mollie, Paystack, TBank in Pro; and the client-side *complete payment* endpoint used by Square) force-confirmed a booking on a successful payment **regardless** of the Auto-Confirm setting. They now honour the mode consistently, matching PayPal and the synchronous-gateway path.

**Fix — confirmation email missing when an online payment auto-confirms**

- When a booking was auto-confirmed by a gateway payment (Stripe, PayPal, …), the customer received no **"Booking confirmed"** email — that email was only sent when an admin confirmed the booking manually. Gateway auto-confirmations now send it (and fire the `yatra_booking_status_changed` action, so Pro Email Automation `booking.confirmed` sequences run too).
- **Existing sites, please read:** this is a *new* customer email for every auto-confirmed online booking, and any `booking.confirmed` automation sequence, webhook or WhatsApp template you already have will now run for those bookings as well. If you had worked around the missing email with a *Booking Created* email or sequence worded as a confirmation, customers may now receive both — review those templates before updating. On Pro sites the email is the **Booking Confirmed** template under Email → Templates and can be switched off on its own. On free-only sites it renders through the **Booking Confirmation** template, whose on/off setting is shared with the "booking received" email — turning that off silences both.

**Fix — "Resend confirmation email" used the wrong template**

- The admin **Resend → Booking confirmation** action always resent the initial "booking received" email. For an already-confirmed booking it now resends the **"Booking confirmed"** email (matching the automated one); pending bookings still resend the "received" email.

**Fix — pre-trip reminder emails were not being sent at all**

- Two separate faults stopped it. The booking query referenced a `currency` column on the trips table that does not exist, so the database rejected it and the cron found zero bookings to remind. Underneath that, **the reminder cron was never scheduled and had no handler at all** — the code that wires it up was never called — so even a working query would have sent nothing. Both are fixed: the query no longer references the phantom column, and the event is scheduled (daily) and handled. **Existing sites:** customers will start receiving the pre-trip reminder again — check the *Trip Reminder* template under Settings → Emails is worded the way you want before updating. Set **Booking Reminder (days)** to `0` to keep it off.

**Fix — cancelling a booking notified nothing**

- `yatra_booking_cancelled` is the action Google Calendar, the Pro `booking.cancelled` webhook and the WhatsApp cancellation template all listen to — but nothing in Yatra ever fired it. Only a cancellation arriving from an OTA (Channel Manager) did, so cancelling a booking in the admin removed no calendar event, sent no WhatsApp message and delivered no webhook. It now fires on every transition to *cancelled*, from the admin, the customer's own cancellation and the unpaid-booking sweep alike. The OTA path is untouched, so it cannot fire twice.
- A separate `yatra_booking_expired` action distinguishes "the customer never paid" from an ordinary cancellation.
- **Existing sites, please read:** cancellations will now reach these integrations for the first time. If you use Google Calendar sync, cancelled bookings start being removed from the calendar; if you have a WhatsApp cancellation template or a `booking.cancelled` webhook, they start firing. Review those templates before updating.

**Fix — "Booking Expiry (hours)" never expired anything**

- <span class="screen-path">Settings → Booking → Booking Expiry (hours)</span> (default 24) is documented to auto-cancel unpaid bookings, but the sweep was **never scheduled and had no handler** — the same missing wiring as the reminder above — so unpaid bookings sat in the list indefinitely and had to be cancelled by hand. The sweep now runs hourly and honours the setting (`0` disables it; developers can also disable it with the new `yatra_auto_expire_bookings` filter).
- **Existing sites are protected from a mass cancellation.** The first run only records an activation date; bookings created before that moment are never expired, however old they are. Only unpaid bookings taken from that point on are cancelled once they pass the expiry window. Deposit-paid, confirmed and unverified-guest bookings are never touched.
- Both sweeps now read the **site's own clock**. The expiry threshold and the reminder's target day were derived from PHP's clock (UTC in WordPress) while booking dates are stored in site-local time — so a site at UTC-5 expired unpaid bookings five hours early, and reminders could target the wrong day near midnight. Sites running on UTC are unaffected.
- The hourly sweep is **batched** (200 bookings a run, oldest first). It emails each customer, so an unbounded run could have tried to send hundreds of emails in a single cron request; a backlog now drains over successive runs instead.
- Deactivating the plugin clears its booking cron events instead of leaving them orphaned in WP-Cron; they are re-scheduled automatically when it is active again, and the expiry activation date survives.
- Expiring a booking now also **releases its departure seat**. The sweep wrote the cancellation directly instead of going through the normal cancel path, so the seat stayed reserved — a departure could slowly "sell out" to bookings nobody ever paid for. It now unlinks the departure and decrements the booked count exactly as an admin cancellation does.

**Fix — the Duration (Hours) field could not be saved**

- The trip form showed *Duration (Hours)* for single-day tours, but its save request never included the field, so whatever was typed was dropped on the client and the field reloaded empty — which meant the new "8 hours" display could not actually be used. The request now carries it. Switching a trip back to multi-day clears any stored hours (the form sends `0`, not nothing) so a week-long trip can never inherit an old hour value.

**Fix — Departures "Upcoming" filter hid full departures**

- The **Upcoming** filter on the Departures page only showed future departures that still had a seat free — a departure that had sold out silently dropped out of Upcoming (its stored status flips from `upcoming` to `full`). **Upcoming now lists every future departure** regardless of capacity: available, partially booked, or full.
- Capacity is now its own **Availability** filter — **Available**, **Partially Booked**, or **Full** — which combines with the status filter instead of replacing it. It is computed from the live booked count against capacity, so it stays correct even if the daily status cron has not run yet. See [Departures → Filters](/departures#status-filter-pills).
- API: `GET /departures` and `GET /trips/{id}/departures` accept a new optional `availability` query parameter (`available` \| `partial` \| `full`); `status=upcoming` now includes full departures, while `status=full` is unchanged for existing integrations.
- The Departures list is now genuinely paginated. `page` / `per_page` were previously ignored — every matching row came back on every "page" and `meta.total` was just the size of that response. They are now honoured server-side (only when `per_page` is sent, so integrations that never paginated still receive every row), and `meta` reports the true `total` plus `page`, `per_page` and `total_pages`. **Integration note:** a client that *sent* `per_page` but relied on getting every row back now receives exactly the page it asked for — drop the parameter or page through `total_pages`. Likewise `status=upcoming` now includes full departures, and a `search` term is now applied instead of ignored.
- The Departures **search box now works**. The term was sent to the server but never applied, so typing anything returned the unfiltered list. It now matches the departure date (start or end) or the notes, and combines with every other filter, the tab counts and pagination. Also available to integrations as the `search` query parameter on both departures endpoints.

**Fix — account email-change events missing from the email registry**

- The merge-tag registry now defines `account.email_change_request` (sent to the *new* address with the confirmation link) and `account.email_changed` (security notice to the *previous* address), alongside the existing `account.email_verification`. Both were already sent, but the registry didn't know them — which is why Yatra Pro's template editor rejected their templates with **"Invalid event key"** (see the Pro notes below).
- New `{{new_email}}` merge tag for those two events; `{{verification_link}}`, `{{intro_paragraph}}` and `{{footer_note}}` are now offered on the account events that actually supply them.

**Fix — "Payment not completed" notice could not be translated**

- The notice shown after a cancelled gateway payment (*"Payment not completed. Your payment was cancelled and no charge was made…"*) was written translatably but never made it into the plugin's translation catalog (`yatra.pot`), which had not been regenerated since before the notice was added — so Loco Translate, Poedit and translate.wordpress.org never offered it. The catalog is regenerated with this release and now includes it, along with every other string added since.

**Fix — admin screens can now be translated**

- The React admin (Bookings, Departures, Settings, …) already went through WordPress's `wp.i18n`, and its strings were already in the catalog, but the bundle was never registered with `wp_set_script_translations()` — so a translation you made in Loco Translate or received from translate.wordpress.org never reached the admin UI. It is registered now; WordPress loads `yatra-{locale}-{hash}.json` from the plugin's `i18n/languages/` or `wp-content/languages/plugins/` (Loco generates that file automatically when you save a translation).

**New — Configurable booking horizon**

- The storefront previously offered dates no more than **12 months ahead**, hard-coded — a trip with an *Available To* date further out was silently cut off in both the date picker and the month list. **Settings → Booking → Booking horizon (months)** now controls it (1–36; default **12**, so nothing changes until you raise it). A trip's own *Available To* still wins when it is earlier. Long horizons make flexible-booking trips (no dates or rules configured) generate more dates per page, so raise it only as far as you sell. REST clients that pass their own `to_date`, admin previews and the Pro OTA inventory sync are unaffected. Developers: `yatra_availability_horizon_months` filter.

**Fix — Day trips with an hour duration showed "1 Day"**

- A trip set up as a **single-day tour with a duration in hours** (e.g. 8 hours) already showed *8 hours* on the trip card, the quick facts and the checkout summary, but several places still printed **"1 Day"**: the single-trip hero badge, the availability date cards, the *Similar Adventures* cards, the booking-confirmation page, the confirmation email, the saved-trips list, and the travel voucher / itinerary PDF. All of them now show the hour duration instead. Trips without an hour duration — every existing trip — keep their exact day / night wording.
- Only a **positive** hours value changes anything: `duration_hours` is empty on every trip created before 3.0.14 and on every multi-day trip, so day-based trips are untouched. Sites whose upgrade has not yet added the `duration_hours` column keep working — the queries that read it check for the column first.
- Saving a trip also clears the hours value whenever the trip is multi-day. Previously that was enforced only when the request carried the trip type (as the trip form always does); a partial API update that changed just the duration could leave an hour value stranded on a multi-day trip, which would now read as *8 hours* on the storefront. A duration of more than one day clears it too.

**New — Listing Card Layout (compact trip cards)**

- A new **Settings → Design → Listing Card Layout** option renders trip cards in a compact, Booking.com-style layout so mobile listings show more trips per screen. Choose **Standard**, **Compact (mobile only)**, or **Compact (everywhere)** from an illustrated selector.
- Applies to archive / taxonomy pages, the `[yatra_trip]` / `[yatra_tour]` shortcode, and the **Trip** block, and respects the visitor's Grid / List toggle. Any single shortcode or block can override the site default with its own `card_layout` attribute / **Card layout** control. Opt-in and additive — existing sites keep the Standard card.

**New — Quick status changes for enquiries**

- The Enquiries list's ⋮ menu gains **Mark as Completed**, **Mark as Closed** and **Mark as Spam**, so an enquiry can be handled from the list instead of being opened in edit mode. Each is hidden when the enquiry already has that status, needs the same *respond to enquiries* capability as **Edit**, and changes only the status — message, notes and response history are untouched. Not offered in the Trash view. See [Enquiries → Row actions](/booking-settings#row-actions).
- **Mark as Closed** is also available as a bulk action, and `PUT /enquiries/bulk` accepts the matching `mark_closed` action. Existing bulk actions are unchanged.

**Fix — "Mark as Completed" bulk action did nothing**

- Choosing **Mark as Completed** in the Enquiries bulk dropdown and confirming it closed the dialog and cleared the selection without sending anything to the server — the confirm handler only submitted delete / spam / trash. It now applies whichever action was chosen and reports success or failure.
- The enquiry status tab counts also refresh after bulk actions, quick status changes, responding and deleting; they previously kept showing pre-action numbers until the page was reloaded.
- The bulk confirmation dialog now names the action in a translatable sentence ("Are you sure you want to apply *Mark as Completed*…") instead of an untranslatable string showing the raw `mark_completed` slug.

**Fix — every Enquiries status tab showed 0**

- The counts on the **All / New / Pending / Responded / Completed / Converted / Closed / Spam / Trash** tabs were always **0**, however many enquiries existed. The screen read the counts from the wrong level of the stats response, so each one resolved to nothing. The tabs now show the real totals (and update as you change statuses).
- Enquiries whose status is *Read* or *Archived* — reachable through the REST bulk endpoint — now show a translated badge instead of the raw status slug.

**Fix — an enquiry submission containing a "subject" field returned a server error**

- The enquiry writer mapped a `subject` field onto a column the enquiries table has never had, so the database rejected the whole insert. Any submission to the public `POST /enquiries` endpoint that included `subject` — a custom form, a third-party integration, a tweaked theme template — failed with a **500** that echoed the raw database error back to the visitor, and an admin update carrying the same field failed with "Failed to update enquiry." `subject` is now ignored (as it always was when reading), and a rejected insert returns the normal friendly error instead of a server error with database details. Yatra's own enquiry forms never sent the field and are unaffected.

### 3.0.5

Routing, FSE compatibility, and bug-fix release. **Strongly recommended** for any site running a block theme. Backward compatible with 3.0.4.

**Full Site Editing (FSE) compatibility**

- **No more 404 chrome on plugin pages.** Block themes were resolving Yatra URLs to `404.html` (with its 404 header template part) because `WP::handle_404()` saw no matching post. Yatra now hooks `pre_handle_404` to opt its routes out of WordPress's 404 logic, so the resolved template is `index.html` / the singular / archive variant — not 404. The visible symptom (404-flavoured header bar on trip / listing / booking / account pages) is gone.
- **Proper template-include flow.** Page handlers no longer `include + exit` inside `template_redirect`. They configure `$wp_query` (virtual `WP_Post`, correct conditional tags) and stash the chosen PHP template in a per-request `PageContext`; a `template_include` filter at priority 99 swaps it in. WordPress's full template-loader pipeline runs, so SEO plugins, caching layers, `wp_head` / `wp_footer` extensions, and theme overrides all work.
- **Site Editor visibility.** Yatra registers virtual block templates (*Yatra: Single Trip*, *Yatra: Trip Listing*, *Destination*, *Activity*, *Booking*, *Booking Confirmation*, *My Account*). Admins can find and edit them under <span class="screen-path">Appearance → Editor → Templates</span>. Saved customisations override the bundled PHP template. The embedded `yatra/page-content` server block renders Yatra's content inside whatever chrome the admin designs.
- **Theme overrides without the editor.** Drop a copy of any Yatra template at `wp-content/themes/{your-theme}/yatra/{template}.php` and `locate_template()` picks it up first — works for classic themes and block themes.

**Per-trip Deposit fields now actually save**

- `TripValidator::sanitize()` previously had an explicit allowlist that included `payment_terms` but **silently dropped** `deposit_amount` and `deposit_percentage`. The fields appeared to save (no error), the DB columns just never received the values. Validator now sanitises all three plus does range validation (amount ≥ 0, percentage 0–100).
- Empty values clear the column (NULL) rather than coercing to 0, so the Pro Flexible Payments filter can correctly distinguish *no per-trip override* from *intentional $0 deposit*.

**Deposit option now appears for per-trip values**

- `templates/partials/booking-form-fields.php` now passes `trip_id` to the `yatra_payment_method_options` filter context. Pro's Flexible Payments module can read it and show the *Pay X% Deposit* radio whenever a trip has per-trip deposit values, even when the site-wide deposit flag is off. Previously the radio only appeared if you globally enabled deposits.

**Filter signatures (additive, backward compatible)**

`$context` is now passed to:
- `yatra_deposit_percentage(int $default, array $context = [])`
- `yatra_partial_payment_percentage(int $default, array $context = [])`
- `yatra_calculate_amount_due(float $amount_due, float $total_amount, string $method, array $context = [])`
- `yatra_payment_method_options(array $options, array $booking_data)` — `$booking_data` gains `trip_id`.

Old callbacks that ignore the new arg continue to work; they just won't see per-trip overrides. See [Hooks & filters → Flexible / Scheduled Payments](/hooks-filters#pro-flexible-scheduled-payments).

**UI polish**

- Booking-page tax line item now uses a proper Feather *percent* icon (the previous SVG had two overlapping paths that rendered as a broken wallet shape).
- The **Deposit & Payment Terms** section on the Trip Edit form is now visible in the free plugin — fields are disabled with a **PRO** badge and an *Upgrade to Pro* / *Activate module* CTA. Operators on the free plugin can now discover the feature instead of finding nothing.

**Internal cleanup**

- Removed unused `app/Core/Template/TemplateRenderer.php` (zero external consumers in Free or Pro).
- Replaced two hardcoded table names in Pro (`{$wpdb->prefix}yatra_trips`, `{$wpdb->prefix}yatra_departures`) with `TripsTable::getTableName()` / `DeparturesTable::getTableName()` — the hardcoded names referenced tables that no longer exist after the `_new_` rename and would surface as *Table doesn't exist* warnings.

**Upgrade safety:** safe to update from 3.0.4.

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
- See [wpyatra.com/yatra-3-0/](https://wpyatra.com/yatra-3-0/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) for the release writeup.
- **Always back up** before upgrading from 2.x; follow migration guidance in [Installation](/installation).

### Earlier versions (2.x)

For 2.x changelog entries, see the plugin's [GitHub releases](https://github.com/MantraBrain/yatra/releases).

## Yatra Pro

### 3.0.12 — 7 September 2026

Pair with the matching Yatra Free release for the 3-way **Auto-Confirm mode**. Free and Pro update independently, so this Pro release is also safe on older Free versions: with Free 3.0.10–3.0.14 the gateways honour the old on/off toggle (confirm when it is on, or when the payment settles the balance in full); with Free older than 3.0.10 they keep confirming on every payment exactly as before — no fatal, no lost payment.

**Fix — webhooks delivered the wrong booking event**

- `booking.confirmed` and `booking.completed` both listen to Yatra's status-change action, which fires for *every* transition, and nothing checked which status was reached. An endpoint subscribed to **Booking Confirmed** therefore received a delivery when a booking was **cancelled** — and `booking.cancelled` / `booking.expired` never arrived at all. Each event is now delivered only for the transition it names.
- `booking.expired` moves to its own trigger (the free plugin's new `yatra_booking_expired`), so an automatic expiry can be told apart from a manual cancellation — previously impossible, since both land on the `cancelled` status.
- Requires the matching free release for `booking.cancelled` and `booking.expired` to fire; on an older free plugin they simply stay silent, exactly as before.

**New — Scheduled Payments are visible in the admin**

- A new <span class="screen-path">Yatra → Payments → Scheduled</span> screen lists every scheduled balance payment: booking, customer, amount, when it runs, whether it is an **auto-charge** or a **payment link**, and its status — with the last error and attempt count on failures. Filter by status, search by booking reference or customer, and cancel anything that has not run yet. The entry sits under **Payments** (as **Scheduled**) and appears only while the Scheduled Payments module is enabled. See [Payments → The Scheduled Payments screen](/payment-settings#the-scheduled-payments-screen-pro).
- An **Outstanding** tab on the same screen answers the question the schedule table cannot: every confirmed or pending booking that still owes money with *nothing* scheduled to collect it — with the amount due, the tour date, and why it isn't scheduled (no payment yet, balance anchored to the booking date, tour still far off, …). Its row menu can **Send balance payment link**, emailing the customer the same secure pay link the reminder cron uses without waiting for the daily window; the send is recorded as a schedule row, so it shows on the Scheduled tab and cannot be sent twice by accident.
- New endpoints for the same data: `GET /scheduled-payments`, `GET /scheduled-payments/stats`, `GET /scheduled-payments/outstanding`, `POST /scheduled-payments/{id}/cancel` and `POST /scheduled-payments/outstanding/{booking_id}/send-link` (reading requires *view bookings* or *view financial reports*; cancelling and sending require *edit bookings*). They exist only while the module is enabled.

**Fix — schedules outlived their booking**

- Cancelling, refunding or trashing a booking now cancels its scheduled balance payments immediately, and deleting a booking deletes them. Previously nothing cleaned them up: the rows sat at *Scheduled* forever, and a deleted booking left its schedules behind permanently.
- No money behaviour changes — a cancelled or deleted booking was never charged, because the balance is re-checked immediately before every charge and reminder emails already excluded cancelled bookings. What changes is that the new Scheduled Payments list reports the truth instead of showing pending rows that would never run. Rows that already ran (Paid / Failed) are kept as history.

**Gateway auto-confirm consistency**

- Stripe, Razorpay, Mollie, Paystack and TBank now honour the free **Auto-Confirm mode** on payment completion instead of always confirming the booking. Under `none` a paid booking stays *Pending*; under `online` it confirms only when the payment settles the balance in full; under `all` it confirms as before.
- **What existing sites get:** with auto-confirm **on** — identical. With it **off** — full payments still confirm; the one change is a **deposit / partial payment through Stripe, Razorpay or T-Bank**, which no longer confirms the booking until the balance is paid (those gateways used to confirm it regardless of the setting). Pick **Auto-confirm all** to keep the old behaviour for deposits.
- **Scheduled Payments:** a deposit booking paid off in installments now confirms automatically on the installment that clears the balance (under `online` / `all`), instead of remaining *Pending* forever.

**Email Automation — partial vs full payment events**

- A **deposit / partial payment** now fires the **Partial Payment Received** (`payment.partial_received`) automation event; only a payment that settles the balance **in full** fires **Payment Received** (`payment.received`). Previously every payment — including deposits — fired `payment.received`.
- **Upgrade note:** if you built a *Payment Received* automation **sequence** and want it to run for deposits too, add a matching **Partial Payment Received** sequence (the event is in the Trigger Event dropdown). This only affects custom automation sequences — the customer's transactional payment email is unchanged.
- To send a distinct deposit email to customers, enable **Settings → Emails → Partial Payment Received** (`email_template_partial_payment`); left off, deposits keep receiving the standard payment-received email.

**Confirmation email now sent when an online payment auto-confirms**

- When a booking is auto-confirmed by a gateway payment (Stripe, PayPal, Razorpay, …), the customer now receives the **"Booking confirmed"** email and Pro **Email Automation** `booking.confirmed` sequences now fire — previously these ran only for a manual (admin) confirmation, so gateway auto-confirmations sent no confirmation email.

**Fix — "Invalid event key" when editing the account email-change templates**

- Saving the **Account email change request** or **Account email changed** template failed with *Invalid event key*. Both templates are seeded and both emails were being sent, but their events (`account.email_change_request`, `account.email_changed`) were never registered in the event catalog, so the editor's validation rejected them. They now appear in the **Trigger Event** dropdown with their merge tags — including the new `{{new_email}}` — and the templates save normally. Requires the matching Yatra Free update (the events are defined in the free merge-tag registry); on an older free plugin they are simply not listed, as before.

**Stripe — payment-error fallbacks are now translatable**

- When Stripe reports an incomplete or failed payment without its own message, the fallback text shown to the customer (*"Payment not completed."*, *"Payment failed. Please try again with a different payment method."*, *"Additional action required to complete payment."*) was hard-coded in English. It now goes through the normal `yatra-pro` translation system like the other gateways.

**Fix — "Scheduled payment succeeded / failed" notifications never fired, or fired for the wrong booking**

- A successful scheduled (installment) charge fired no action at all, so the **Scheduled payment succeeded** event in Webhooks, WhatsApp and Email Automation could never trigger. A new `yatra_scheduled_payment_success` action now fires and all three consumers are bound to it.
- The existing `yatra_scheduled_payment_failed` action leads with the *scheduled-payment* id, and the Webhook / WhatsApp payload builders took that first integer as the *booking* id — resolving the wrong booking. The action now also carries a context array with the real `booking_id` (existing arguments unchanged), the builders prefer an explicit `booking_id` over a positional integer, and Email Automation now listens to it too.
- **Behaviour change:** endpoints, templates or sequences already configured for these events start firing. See [Hooks → Scheduled Payments](/hooks-filters#pro-flexible-scheduled-payments).
- Found while wiring this up: the **"Balance due now"** figure in the *Scheduled payment succeeded* customer email was understated by one installment (the balance was re-derived after the booking had already been updated, subtracting the charge twice). It now shows the correct remaining balance, and WhatsApp templates receive the same formatted amount / date / balance values as the email instead of blanks.

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
- [wpyatra.com/blog](https://wpyatra.com/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) — long-form release writeups for major versions.
