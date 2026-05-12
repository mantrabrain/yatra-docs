---
title: Settings overview
description: A guided tour of every tab on the Yatra → Settings page — what each control does, where the value is stored, and how to read it programmatically.
prev:
  text: Your WordPress admin
  link: /admin-dashboard
next:
  text: Trips & catalog
  link: /tour-booking
---

# Settings overview

![Yatra Settings landing page — left tab list and General section open](/screenshots/settings/general.webp)

The Settings screen at <span class="screen-path">Yatra → Settings</span> is one screen with **13 tabs** in a left-hand sidebar. This page tells you what each tab is for, lists every control inside it, and points at the deeper docs ([Bookings](/booking-settings), [Payments](/payment-settings), [Email](/email-settings)) when there's a dedicated guide.

::: tip Where Yatra stores settings
Each control writes to its own row in the WordPress `wp_options` table — for example, the **Default currency** dropdown writes to the `yatra_currency` option. Developers can read or override these programmatically — see the [Reading settings programmatically](#reading-settings-programmatically) section at the bottom of this page.
:::

## The 13 tabs

| # | Tab | What it controls | Pro-only fields? |
| --- | --- | --- | --- |
| 1 | [General](#_1-general) | Company identity, address, regional formatting | No |
| 2 | [Design](#_2-design) | Front-end brand colour and container width | No |
| 3 | [Booking](#_3-booking) | Checkout behaviour, expiry, cancellation, waitlist | No |
| 4 | [Booking Form](#_4-booking-form) | Drag-and-drop builder for the checkout form | No (Pro extends per-trip) |
| 5 | [Payment](#_5-payment) | Test mode, deposits, partial / scheduled payments | Some (deposit / scheduled = Pro) |
| 6 | [Customer](#_6-customer) | Account behaviour, registration, wishlist | Wishlist = Pro |
| 7 | [Review](#_7-review) | Review system toggles & moderation | No |
| 8 | [Tax](#_8-tax) | Tax rates, inclusive pricing, VAT number | No |
| 9 | [Currency](#_9-currency) | Currency code, position, separators, decimals | No |
| 10 | [Integration](#_10-integration) | Mailchimp, Facebook Pixel, GA4, Google Calendar, reCAPTCHA | All Pro-conditional |
| 11 | [Permalink](#_11-permalink) | URL slugs for trips, destinations, activities, categories | No |
| 12 | [SEO](#_12-seo) | Meta tags for the trip archive | No |
| 13 | [Advanced](#_13-advanced) | Logging, cache, legal pages, telemetry | No |

## How to use this page

- Looking for **what a control does** → find the tab heading and scan the table.
- Looking for **a setting key in code** → the *Setting key* column is the `wp_options` row name (always prefixed `yatra_<key>` in the database; the schema uses the unprefixed name).
- Looking for **deep guidance on a specific area** → the [Bookings](/booking-settings), [Payments](/payment-settings), and [Email](/email-settings) pages cover the matching admin modules in full.

## Permissions

Saving settings requires the WordPress `manage_options` capability. The REST endpoint behind the page (`POST /yatra/v1/settings`) checks this on every write. See [REST API → Settings](/api-reference#settings-modules-license) for the full surface.

---

## 1. General

![General settings tab — company information, regional formatting](/screenshots/settings/general.webp)

Company identity, full address, website, and regional formatting.

### Company Information

| Control            | Setting key       | Default | Notes                                                                            |
| ---                | ---               | ---     | ---                                                                              |
| Company Name       | `company_name`    | (empty) | Required-flagged in UI. Used in invoices, vouchers, and email "From" name.       |
| Company Email      | `company_email`   | (empty) | Required-flagged in UI. Falls back to the WordPress admin email when blank.     |
| Company Phone      | `company_phone`   | (empty) | Surfaced on PDFs.                                                                |
| Company Address    | `company_address` | (empty) | Street address line.                                                             |
| City               | `company_city`    | (empty) | Shown on invoices below the street.                                              |
| State / Province   | `company_state`   | (empty) | Shown on invoices.                                                               |
| Country            | `company_country` | (empty) | Free-text country name.                                                          |
| ZIP / Postal Code  | `company_zip`     | (empty) | Shown on invoices.                                                               |
| Website            | `company_website` | (empty) | URL. Linked from the company name on receipts.                                   |

### Regional Formatting

| Control      | Setting key   | Default | Notes                                                                  |
| ---          | ---           | ---     | ---                                                                    |
| Timezone     | `timezone`    | `UTC`   | Searchable dropdown of all WP-supported time zones. Affects how booking and travel dates are stored / displayed. |
| Date Format  | `date_format` | `Y-m-d` | Dropdown with many PHP date-format presets. Affects all admin and customer views. |
| Time Format  | `time_format` | `H:i`   | Two options: `H:i` (24-hour) or `h:i A` (12-hour).                    |

## 2. Design

![Design settings tab — primary brand color picker and container max width](/screenshots/settings/design.webp)

Front-end appearance — what your customers see on trip and booking pages.

| Control               | Setting key                    | Default     | Notes                                                       |
| ---                   | ---                            | ---         | ---                                                         |
| Primary brand color   | `frontend_primary_color`       | `#3b82f6`   | Hex value with a color-picker and a paired text input. **Reset to default** button restores `#3b82f6`. Drives buttons, links, and highlights via CSS variables. |
| Container max width   | `frontend_container_max_width` | (empty)     | Optional CSS length (`1200px`, `72rem`, `min(100%,80rem)`). Empty = inherit your block theme `theme.json` / theme content width. |

## 3. Booking

![Booking settings tab — checkout behaviour, expiry, cancellation, waitlist controls](/screenshots/settings/booking.webp)

Day-to-day checkout behaviour. **For the full operator guide, see [Bookings & customers](/booking-settings).**

| Control                       | Setting key                  | Default          | Notes                                                                            |
| ---                           | ---                          | ---              | ---                                                                              |
| Enable Booking Confirmation   | `booking_confirmation`       | `true`           | Whether to send the confirmation email after status change to *Confirmed*.       |
| Auto-Confirm Bookings         | `auto_confirm_bookings`      | `false`          | Skip the *Pending* state — useful for instant-confirmation activities.           |
| Require Login for Booking     | `require_login`              | `false`          | Forces login at the start of checkout.                                           |
| Allow Guest Checkout          | `allow_guest_checkout`       | `true`           | If off, customers must log in before they can complete checkout.                 |
| Allow Waitlist                | `allow_waitlist`             | `true`           | Show the *Join waitlist* CTA when a departure is sold out.                       |
| Waitlist Auto-Confirm         | `waitlist_auto_confirm`      | `false`          | Auto-promote waitlisted bookings when capacity opens up.                         |
| Cancellation Policy           | `cancellation_policy`        | `full_refund`    | One of `no_refund`, `partial_refund`, `full_refund`. Surfaces on confirmation.   |
| Cancellation Days Before Departure | `cancellation_days`     | `7`              | Days before travel after which a customer cannot self-cancel.                    |
| Refund Policy                 | `refund_policy`              | (empty)          | Free-text shown on the booking summary page.                                     |
| Booking Expiry (hours)        | `booking_expiry_hours`       | `24`             | A booking left in *Pending* longer than this is auto-cancelled by the cron.      |
| Booking Reminder (days)       | `booking_reminder_days`      | `3`              | How many days before travel to send the reminder email.                          |

::: tip Where's the booking page picker?
The booking flow lives at `/{booking_base}/{trip-slug}/` by default (configured on the [Permalink](#_11-permalink) tab). There's no "embed the booking app inside a WordPress page" toggle in this build — earlier versions of the doc mentioned `use_booking_page` and `booking_page_id`, but the source no longer exposes that setting.
:::

## 4. Booking Form

![Booking Form builder tab — drag-and-drop fields with type, width, and required toggles](/screenshots/settings/booking_form.webp)

This tab renders the **Booking Form Builder** component — a drag-and-drop builder for the three sections of the public checkout: **Lead Traveler / Contact Information**, **Emergency Contact**, and **Per-Traveler**.

- The entire configuration is stored as one JSON blob under the `booking_form_config` option.
- Defaults live in `SettingsService::getDefaultBookingFormConfig()` — the lead-traveler `first_name`, `last_name`, `email`, `phone`, and `country` fields are **locked**: you can hide them but cannot remove them.
- **Field types supported:** `text`, `email`, `tel`, `date`, `select` (with options), `country`, `textarea`, `number`, `checkbox`.
- **Per-field width:** `full`, `half`, `third` — controls how many fields sit on a row.
- Each field has a **Required** toggle, **Label** text, **Placeholder**, and (for `select`) an **Options** repeater.

::: tip Custom fields per trip
For per-trip overrides (e.g. a "Dietary requirements" question only on Food Tours), enable the Pro **Dynamic Form Field** module — it adds a **Custom fields** tab on each trip's edit screen. See [Modules](/modules#dynamic-form-field).
:::

## 5. Payment

![Payment settings tab — test mode, partial payments, deposits, scheduled balance, gateway list](/screenshots/settings/payment.webp)

Test-mode, payment-flow toggles, and deposit / scheduled-payment behaviour. **For per-gateway setup and the Payments admin page, see [Payments](/payment-settings).**

### Global

| Control              | Setting key            | Default | Notes                                                                  |
| ---                  | ---                    | ---     | ---                                                                    |
| Test Mode            | `payment_test_mode`    | `true`  | Master test-mode switch — applied to every gateway. Turn off when you go live. |
| Auto-Confirm Pay Later Bookings | `auto_confirm_pay_later` | `false` | Confirm "Pay Later" bookings immediately instead of leaving them in *Pending*. |

### Partial Payments <span class="pro-pill">PRO</span>

| Control                       | Setting key                    | Default | Notes                                                       |
| ---                           | ---                            | ---     | ---                                                         |
| Enable Partial Payment        | `partial_payment`              | `false` | Customer pays a percentage at booking; rest collected later. |
| Partial Payment Percentage    | `partial_payment_percentage`   | `50`    | Shown only when *Enable Partial Payment* is on.            |

### Deposit <span class="pro-pill">PRO</span>

| Control               | Setting key            | Default | Notes                                                       |
| ---                   | ---                    | ---     | ---                                                         |
| Require Deposit       | `deposit_required`     | `false` | Force a deposit at booking time.                            |
| Deposit Percentage    | `deposit_percentage`   | `25`    | Shown only when *Require Deposit* is on. Percentage of the trip price taken upfront. |

### Scheduled Payments <span class="pro-pill">PRO</span>

| Control                            | Setting key                          | Default       | Notes                                                       |
| ---                                | ---                                  | ---           | ---                                                         |
| Enable scheduled balance payments  | `enable_scheduled_payments`          | `false`       | Master toggle for auto-charging the remaining balance on a future date. |
| Schedule type                      | `scheduled_payment_type`             | `single`      | `single` (one balance charge) or `installments`.            |
| Days until first charge            | `scheduled_payment_days`             | `7`           | How many days after booking to attempt the first charge.   |
| Number of installments             | `scheduled_payment_installments`     | `3`           | Shown only when *type = installments*.                     |
| Days between installments          | `scheduled_payment_interval`         | `30`          | Shown only when *type = installments*.                     |
| Payment reminder (days before)     | `scheduled_payment_reminder_days`    | `3`           | Reminder email this many days before the charge attempt.    |

### Gateways

The list of available gateways (PayPal, Pay Later — free; Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, Bank Transfer — Pro) is rendered as a row of cards lower on the tab. Each card has an **Enable** toggle and a **Settings** button that expands the gateway's credentials form. Full per-gateway details: [Payments](/payment-settings).

::: warning Server-authoritative amounts (3.0.4+)
The `POST /payment/create-intent` endpoint **ignores** any client-supplied `amount` and recomputes from the booking row when a `booking_id` is provided. See [Payments → security model](/payment-settings#payment-flow-security-model-3-0-4).
:::

## 6. Customer

![Customer settings tab — registration, account page, wishlist, email verification](/screenshots/settings/customer.webp)

Account behaviour on the customer-facing site.

| Control                         | Setting key                  | Default | Notes                                                                  |
| ---                             | ---                          | ---     | ---                                                                    |
| Enable Customer Registration    | `customer_registration`      | `true`  | If off, only WP-admin-created accounts can log in.                     |
| Customer Account Page           | `customer_account_page`      | (empty) | URL path segment for the account area (e.g. `my-account`). A **View Page** button next to the field opens the page on the front-end. |
| Enable wishlist (saved trips)   | `enable_wishlist`            | `false` | **Pro-only field.** The control is **only rendered when Pro is active** (`window.yatraAdmin.isPro === true`). Without Pro, a "Saved Trips — Pro feature" call-out appears in its place. |
| Require Email Verification      | `require_email_verification` | `false` | Customers must click the verification link before account activation.  |

## 7. Review

![Review settings tab — enable reviews, require booking, moderation, minimum rating, reminder days](/screenshots/settings/review.webp)

Trip-review form behaviour.

| Control                       | Setting key               | Default | Notes                                                       |
| ---                           | ---                       | ---     | ---                                                         |
| Enable Reviews                | `enable_reviews`          | `true`  | Master toggle for the entire review system.                 |
| Require Booking to Review     | `require_booking`         | `false` | When on, only customers with a confirmed booking can leave a review. |
| Auto-Approve Reviews          | `auto_approve_reviews`    | `false` | Skip moderation queue.                                      |
| Enable Review Moderation      | `review_moderation`       | `true`  | Reviews go to a *Pending* queue (visible at <span class="screen-path">Yatra → Reviews</span>). |
| Minimum Rating                | `min_rating`              | `1`     | Lowest star value the form accepts (1–5).                   |
| Review Reminder Days          | `review_reminder_days`    | `7`     | Days after trip completion to email the *Leave a review* link. |

## 8. Tax

![Tax settings tab — multiple-taxes editor, inclusive pricing, VAT number](/screenshots/settings/tax.webp)

| Control                       | Setting key      | Default | Notes                                                                              |
| ---                           | ---              | ---     | ---                                                                                |
| Enable Tax                    | `enable_tax`     | `false` | Master toggle. The remaining controls only appear when this is on.                |
| Taxes                         | `multiple_taxes` | `[]`    | Custom repeater (the **Multiple Taxes Editor** component) of `{ name, rate }` rows — e.g. `{ name: "VAT", rate: 20 }`. Live total shown below the editor. |
| Tax Inclusive Pricing         | `tax_inclusive`  | `false` | When on, prices are displayed **with** tax already included.                        |
| VAT Number                    | `vat_number`     | (empty) | Your tax ID; appears on invoices.                                                  |

::: tip Per-country tax (advanced)
The schema supports per-country tax bands (`multiple_taxes_by_country`) for site owners that need it. There's no UI yet — set the value via the REST API or a custom plugin if you need it today.
:::

## 9. Currency

![Currency settings tab — default currency, position, separators, decimal places](/screenshots/settings/currency.webp)

Display formatting for monetary values across the site.

| Control               | Setting key            | Default | Notes                                                                |
| ---                   | ---                    | ---     | ---                                                                  |
| Default Currency      | `currency`             | `USD`   | Searchable dropdown of all ISO currency codes. Base for all transactions. |
| Currency Position     | `currency_position`    | `left`  | `left`, `right`, `left_space`, `right_space`. Each option shows a live preview in the dropdown. |
| Thousand Separator    | `thousand_separator`   | `,`     | Single character.                                                    |
| Decimal Separator     | `decimal_separator`    | `.`     | Single character.                                                    |
| Decimal Places        | `currency_decimals`    | `2`     | 0–4. Most fiat = 2; 0 for JPY / KRW.                                 |

::: tip Multi-currency switching
Per-trip currency overrides and a customer-facing currency switcher are provided by Pro modules. The free schema stores only a single base currency.
:::

## 10. Integration

![Integration settings tab — third-party module config populated by active Pro modules](/screenshots/settings/integration.webp)

Configuration for built-in third-party integrations. Most blocks **only appear when the matching Pro module is active** (see [Modules](/modules) for the toggles).

### Google Calendar <span class="pro-pill">PRO</span>

Renders conditionally when the Google Calendar module is enabled. Exposes OAuth credentials, target calendar ID, and sync direction. See [Modules → Google Calendar](/modules#google-calendar-integration).

### Mailchimp <span class="pro-pill">PRO</span>

| Control                  | Setting key                  | Notes                                                                  |
| ---                      | ---                          | ---                                                                    |
| Mailchimp API Key        | `mailchimp_api_key`          | Password-style input. Tested with a **Verify** button.                |
| Audience / List          | `mailchimp_list_id`          | Dropdown populated after a successful API-key verification.            |
| Sync customers on booking | `mailchimp_sync_on_booking` | Push booking customers as Mailchimp contacts.                          |
| Double opt-in            | `mailchimp_double_optin`     | Send a confirmation email before adding to the list.                  |
| Field mapping            | `mailchimp_field_mapping`    | Dynamic key/value mapping of Yatra fields → Mailchimp merge tags.     |
| Add tags                 | `mailchimp_add_tags`         | Tag synced contacts.                                                  |
| Default tags             | `mailchimp_default_tags`     | Comma-separated tag list applied to every synced contact.             |

### Facebook Pixel <span class="pro-pill">PRO</span>

| Control                       | Setting key                       | Notes                                                       |
| ---                           | ---                               | ---                                                         |
| Pixel ID                      | `facebook_pixel_id`               | Your Meta Pixel ID.                                         |
| Track ViewContent             | `fb_track_view_content`           | Per-event toggle.                                           |
| Track InitiateCheckout        | `fb_track_initiate_checkout`      | Per-event toggle.                                           |
| Track Purchase                | `fb_track_purchase`               | Per-event toggle.                                           |
| Use Conversions API           | `fb_use_conversions_api`          | Server-side event posting in addition to the browser pixel. |
| Conversions API access token  | `facebook_access_token`           | Password-style input. Shown only when *Use Conversions API* is on. |

### Google Analytics 4 Enhanced <span class="pro-pill">PRO</span>

| Control                       | Setting key                          | Notes                                                       |
| ---                           | ---                                  | ---                                                         |
| Measurement ID                | `ga4_measurement_id`                 | e.g. `G-XXXXXXXX`.                                          |
| Track view_item               | `ga4_track_view_item`                | Per-event toggle.                                           |
| Track add_to_cart             | `ga4_track_add_to_cart`              | Per-event toggle.                                           |
| Track begin_checkout          | `ga4_track_begin_checkout`           | Per-event toggle.                                           |
| Track purchase                | `ga4_track_purchase`                 | Per-event toggle.                                           |
| Use Measurement Protocol      | `ga4_use_measurement_protocol`       | Server-side event posting in addition to the browser tag.   |
| Debug mode                    | `ga4_debug_mode`                     | Enables GA4 DebugView.                                       |
| API secret                    | `ga4_api_secret`                     | Password-style input. Shown only when *Measurement Protocol* is on. |

### reCAPTCHA

| Control            | Setting key            | Notes                                                       |
| ---                | ---                    | ---                                                         |
| Enable reCAPTCHA   | `recaptcha_enabled`    | Adds Google reCAPTCHA v3 to the public checkout / enquiry forms. |
| Site Key           | `recaptcha_site_key`   | From Google reCAPTCHA admin.                                |
| Secret Key         | `recaptcha_secret_key` | Password-style input.                                       |

For a full list of integrations and their setup guides, see [Pro modules overview](/third-party-integrations).

## 11. Permalink

![Permalink settings tab — URL slugs for trips, destinations, activities, categories with live preview](/screenshots/settings/permalink.webp)

URL slugs for Yatra's content types. Changing any of these requires a **rewrite-rule flush** — Yatra triggers it automatically on save, but if you ever see 404s, visit <span class="screen-path">Settings → Permalinks</span> in WP-admin and click *Save* to force a flush.

| Control               | Setting key            | Default        | Resulting URL example                                |
| ---                   | ---                    | ---            | ---                                                  |
| Trip Base             | `trip_base`            | `trip`         | `/trip/everest-base-camp`                            |
| Booking Base          | `booking_base`         | `book`         | `/book/everest-base-camp`, `/book/confirmation/`     |
| Destination Base      | `destination_base`     | `destination`  | `/destination/nepal`                                 |
| Activity Base         | `activity_base`        | `activity`     | `/activity/trekking`                                 |
| Trip Category Base    | `trip_category_base`   | `trip-category`| `/trip-category/adventure`                           |

::: tip Live preview
Each input shows the resulting public URL beneath it, with a **View** link so you can verify the page renders before navigating away.
:::

The whole permalink set passes through the `yatra_permalink_bases` filter — useful if you're enforcing localised slugs from a custom plugin. See [Hooks & filters → Front-end routing](/hooks-filters#front-end-routing-templates).

::: warning Customer account URL lives elsewhere
The slug for the customer-account area is configured under [Customer → Customer Account Page](#_6-customer) as `customer_account_page` — **not** on this tab. Older revisions of this page listed an `account_base` here; the source doesn't expose that field.
:::

## 12. SEO

![SEO settings tab — meta title, description, keywords, and image picker for the trip archive](/screenshots/settings/seo.webp)

Meta tags for the trip archive page (`/{trip_base}/`).

| Control                      | Setting key                   | Notes                                                                  |
| ---                          | ---                           | ---                                                                    |
| Trip Archive Meta Title      | `seo_trip_meta_title`         | Appears in `<title>` and search-result links for the trip archive.    |
| Trip Archive Meta Description| `seo_trip_meta_description`   | 150–160 characters recommended.                                       |
| Trip Archive Meta Keywords   | `seo_trip_meta_keywords`      | Comma-separated. Most search engines ignore this; included for completeness. |
| Trip Archive SEO Image       | `seo_trip_meta_image`         | Stores the WP attachment ID. Recommended 1200×630 for OG / Twitter. Selector uses the WP media library. |

::: tip If you use Yoast / RankMath / SEOPress
Those plugins emit their own `<title>` and meta tags for the archive page and override Yatra's. Use Yatra's SEO tab only if no SEO plugin is active.
:::

## 13. Advanced

![Advanced settings tab — logging, debug mode, cache toggle, legal pages, telemetry opt-in](/screenshots/settings/advanced.webp)

Diagnostics, caching, legal-page wiring, and telemetry.

### Logging & debug

| Control                  | Setting key       | Default | Notes                                                                                            |
| ---                      | ---               | ---     | ---                                                                                              |
| Enable Logging           | `enable_logging`  | `false` | Writes Yatra-specific events to the system logs (visible in <span class="screen-path">Yatra → Tools → Logs</span>). |
| Debug Mode               | `debug_mode`      | `false` | Plugin-side diagnostics. **Bypasses the Yatra object cache** while on (same effect as `WP_DEBUG=true`). |
| Enable Cache             | `cache_enabled`   | `true`  | Yatra's internal cache layer. Auto-disabled while *Debug mode* or `WP_DEBUG` is on.              |

### Legal pages (Booking UI)

| Control                  | Setting key                | Notes                                                              |
| ---                      | ---                        | ---                                                                |
| Terms & Conditions page  | `terms_page_id`            | Dropdown of published WP pages. Linked from the *I agree to terms* checkbox in checkout. |
| Privacy Policy page      | `privacy_policy_page_id`   | Linked from the privacy-consent checkbox. Falls back to the WP **Settings → Privacy** page when blank. |

### Telemetry (opt-in)

The **Help us improve Yatra** section enables anonymous usage tracking via the `yatra_usage_tracking_enabled` option. What gets collected is documented at [wpyatra.com/what-we-collect/](https://wpyatra.com/what-we-collect/). It is **off by default** — switch it on to help the team prioritise features.

The endpoint behind it is `POST /yatra/v1/usage-tracking`.

---

## Reading settings programmatically

Every saved value is one WP option. You can read them anywhere with the `SettingsService` facade:

```php
use Yatra\Services\SettingsService;

// Generic getters (return the schema default if the option is unset)
$currency      = SettingsService::getCurrency();
$timezone      = SettingsService::getString( 'timezone', 'UTC' );
$expiryHours   = SettingsService::getInt( 'booking_expiry_hours', 24 );
$reviewsOn     = SettingsService::isEnabled( 'enable_reviews' );

// Or fetch everything (for export / debugging)
$all = SettingsService::all();

// Force-reload from the database after an update_option() call
SettingsService::reload();
```

Or via REST (admin auth required):

```bash
curl -u "user:application-password" \
     https://example.com/wp-json/yatra/v1/settings
```

```bash
curl -u "user:application-password" \
     -H "Content-Type: application/json" \
     -d '{"settings":{"booking_expiry_hours":48}}' \
     https://example.com/wp-json/yatra/v1/settings
```

The REST endpoint also exposes `POST /yatra/v1/settings/flush-rewrites` (re-flush WP rewrite rules without changing settings) and `GET /yatra/v1/settings/pages` (list candidate WP pages for the booking / account / TOS dropdowns). See [REST API → Settings](/api-reference#settings-modules-license).

## Pro settings (3.0.2+)

Yatra Pro adds its own REST endpoint at `POST /yatra/v1/settings` (overlaid on top of the free one) for Pro-specific keys. Since 3.0.2 the Pro endpoint **whitelists** which keys it will write — anything not in the schema is reported back in `rejected_keys` rather than silently overwriting `wp_options`.

If you write a custom Pro module that needs to expose a setting via this endpoint, register it via the filter:

```php
add_filter( 'yatra_pro_writable_settings_schema', function ( array $schema ): array {
    $schema['my_module_enabled'] = static function ( $value ): bool {
        return (bool) $value;
    };

    $schema['my_module_api_key'] = static function ( $value ): string {
        return sanitize_text_field( (string) $value );
    };

    return $schema;
} );
```

The map is `key => sanitiser-callable`; the sanitiser must return the value to persist. See [Hooks & filters → Payments](/hooks-filters#payments) for the full hook signature.

## Where to go next

- [Bookings & customers](/booking-settings) — the operator guide for the Bookings module.
- [Payments](/payment-settings) — gateway setup, deposits, refunds.
- [Email & notifications](/email-settings) — transactional email templates and Pro automation.
- [Modules](/modules) — the catalog of Pro modules that surface controls on the Integration tab.
- [REST API](/api-reference) — full settings endpoint surface.
- [Hooks & filters](/hooks-filters) — every hook the settings system fires.
