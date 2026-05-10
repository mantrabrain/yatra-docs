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

The Settings screen at <span class="screen-path">Yatra → Settings</span> is one screen with 13 tabs. This page tells you **what each tab is for**, lists the controls inside it, and points you at the deeper docs (booking, payment, email) when there's a dedicated page.

::: tip Where Yatra stores settings
Each control writes to its own row in the WordPress `wp_options` table — for example, the **Default currency** dropdown writes to the `yatra_currency` option. You can read any value at runtime with `\Yatra\Services\SettingsService::get( 'currency' )` or `SettingsService::all()`. Defaults are defined in `app/Services/SettingsService.php` so you can grep the file to see every key the plugin knows about.
:::

## How to use this page

- Looking for **what a control does** → find the tab heading, then scan the table.
- Looking for **a setting key in code** → the *Setting key* column maps to the `wp_options` row name (always prefixed with the plugin internally, e.g. `yatra_<key>`).
- Looking for **deep guidance on a specific area** → the [Booking](/booking-settings), [Payment](/payment-settings), and [Email](/email-settings) tabs each have their own dedicated docs page; this page only summarises them.

## Permissions

Saving settings requires the WordPress `manage_options` capability. The REST endpoint behind the page (`POST /yatra/v1/settings`) checks this on every write. See [REST API → Settings](/api-reference#settings-modules-license) for the full surface.

---

## 1. General

![General settings tab — company information and regional formatting](/screenshots/settings/general.webp)

Company identity and site-wide formatting.

| Control                 | Setting key                  | Default     | Notes                                                              |
| ---                     | ---                          | ---         | ---                                                                |
| Company Name            | `company_name`               | (empty)     | Used in invoices, vouchers, and email "From" name when not overridden. |
| Company Email           | `company_email`              | (empty)     | Falls back to the WordPress admin email when blank.                |
| Company Phone           | `company_phone`              | (empty)     | Surfaced on PDF documents.                                         |
| Company Address         | `company_address`            | (empty)     | Multi-line; appears on invoices and vouchers.                      |
| Timezone                | `timezone`                   | `UTC`       | Affects how booking and travel dates are stored / displayed.       |
| Date Format             | `date_format`                | `Y-m-d`     | Standard PHP date tokens. Affects all admin and customer views.    |
| Time Format             | `time_format`                | `H:i`       | 12-hour (`h:i A`) or 24-hour (`H:i`).                              |

## 2. Design

![Design settings tab — primary brand color picker and container max width](/screenshots/settings/design.webp)

Front-end appearance — what your customers see on trip and booking pages.

| Control                  | Setting key                       | Default     | Notes                                                       |
| ---                      | ---                               | ---         | ---                                                         |
| Primary brand color      | `frontend_primary_color`          | `#3b82f6`   | Hex value. Drives buttons, links, and highlights via CSS variables. The colour picker and a **Reset to default** button are provided. |
| Container max width      | `frontend_container_max_width`    | (empty)     | Optional CSS length (`1200px`, `72rem`, `min(100%,80rem)`). Empty = inherit your block theme `theme.json` / theme content width. |

## 3. Booking

![Booking settings tab — checkout behaviour, expiry, cancellation, waitlist controls](/screenshots/settings/booking.webp)

Day-to-day checkout behaviour. **For the full operator guide, see [Bookings & customers](/booking-settings).**

| Control                          | Setting key                  | Default          | Notes                                                                            |
| ---                              | ---                          | ---              | ---                                                                              |
| Use a custom booking page        | `use_booking_page`           | `false`          | When on, the React booking app is embedded inside the WP page chosen below; otherwise it lives at `/{booking_base}/{trip-slug}/`. |
| Booking page                     | `booking_page_id`            | `0`              | The WP page where the booking flow is embedded.                                  |
| Allow guest booking              | `enable_guest_booking`       | `true`           | If off, customers must log in before they can checkout.                          |
| Allow guest checkout             | `allow_guest_checkout`       | `true`           | Separate from above — controls whether unauthenticated users can complete payment without creating an account. |
| Require login                    | `require_login`              | `false`          | Forces login at the start of checkout.                                           |
| Booking confirmation             | `booking_confirmation`       | `true`           | Whether to send the confirmation email after status change to *Confirmed*.       |
| Auto-confirm bookings            | `auto_confirm_bookings`      | `false`          | Skip the *Pending* state — useful for instant-confirmation activities.           |
| Booking expiry (hours)           | `booking_expiry_hours`       | `24`             | A booking left in *Pending* longer than this is auto-cancelled by the cron.      |
| Booking reminder (days)          | `booking_reminder_days`      | `3`              | How many days before travel to send the reminder email.                          |
| Cancellation policy              | `cancellation_policy`        | `full_refund`    | One of `no_refund`, `partial_refund`, `full_refund`. Surfaces on confirmation.   |
| Cancellation window (days)       | `cancellation_days`          | `7`              | Days before travel after which a customer cannot self-cancel.                    |
| Refund policy                    | `refund_policy`              | (empty)          | Free-text shown on the booking summary page.                                     |
| Allow waitlist                   | `allow_waitlist`             | `true`           | Show the *Join waitlist* CTA when a departure is sold out.                       |
| Waitlist auto-confirm            | `waitlist_auto_confirm`      | `false`          | Auto-promote waitlisted bookings when capacity opens up.                         |

## 4. Booking Form

![Booking Form builder tab — drag-and-drop fields with type, width, and required toggles](/screenshots/settings/booking_form.webp)

A drag-and-drop builder for the **Lead Traveler / Contact Information**, **Emergency Contact**, and **Per-Traveler** form sections of the checkout.

- The configuration is stored as one JSON blob in `booking_form_config`.
- Defaults live in `SettingsService::getDefaultBookingFormConfig()` — the lead-traveler `first_name` / `last_name` / `email` / `phone` / `country` are **locked**: you can hide them but cannot remove them.
- Field types supported: `text`, `email`, `tel`, `date`, `select` (with options), `country`, `textarea`, `number`, `checkbox`.
- Per-field width: `full`, `half`, `third`.

::: tip Custom fields per trip
For per-trip overrides (e.g. a "Dietary requirements" question only on Food Tours), enable the Pro **Dynamic Form Field** module — it adds a **Custom fields** tab on each trip's edit screen.
:::

## 5. Payment

![Payment settings tab — flexible payments, scheduled balance, gateway list with test mode](/screenshots/settings/payment.webp)

Currency basics, gateway selection, and deposit / partial-payment behaviour. **Full guide: [Payments](/payment-settings).**

A non-exhaustive snapshot of what lives here:

| Area                          | Setting keys                                                              |
| ---                           | ---                                                                       |
| Currency basics               | `currency`, `currency_position`, `thousand_separator`, `decimal_separator`, `decimal_places` |
| Test mode (all gateways)      | `payment_test_mode` (default `true` until you go live)                    |
| Enabled gateways              | `payment_gateways` (array of slugs); per-gateway config in `gateway_configs` |
| Gateway display order         | `gateway_order`                                                           |
| Save customer payment methods | `allow_save_payment_methods`                                              |
| Deposits (Pro)                | `enable_deposit`, `deposit_type` (`percentage` / `fixed`), `deposit_amount`, `deposit_required`, `deposit_percentage` |
| Partial payments (Pro)        | `partial_payment`, `partial_payment_percentage`                           |
| Pay Later auto-confirm        | `auto_confirm_pay_later`                                                  |

::: warning Server-authoritative amounts (3.0.4+)
The `POST /payment/create-intent` endpoint **ignores** any client-supplied `amount` and recomputes from the booking row when a `booking_id` is provided. See [Payments → security model](/payment-settings#payment-flow-security-model-3-0-4).
:::

## 6. Customer

![Customer settings tab — registration, account page, wishlist, email verification](/screenshots/settings/customer.webp)

Account behaviour on the customer-facing site.

| Control                         | Setting key                          | Default       | Notes                                                       |
| ---                             | ---                                  | ---           | ---                                                         |
| Enable Customer Registration    | `customer_registration`              | `true`        | If off, only WP-admin-created accounts can log in.          |
| Customer Account Page           | `customer_account_page`              | (empty)       | URL path segment for the account area (e.g. `my-account`). Visit on the front-end with the **View Page** button. |
| Enable wishlist (saved trips)   | `enable_wishlist`                    | `false`       | **Pro feature.** Adds the heart control on trip cards and a *Saved Trips* section in the customer account. |
| Require Email Verification      | `require_email_verification`         | `false`       | Customers must click the verification link before account activation. |

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

| Control                       | Setting key                        | Default | Notes                                                                              |
| ---                           | ---                                | ---     | ---                                                                                |
| Enable Tax                    | `enable_tax`                       | `false` | Master toggle. The remaining controls only appear when this is on.                |
| Taxes                         | `multiple_taxes`                   | `[]`    | Repeater of `{ name, rate }` (e.g. `{ name: "VAT", rate: 20 }`). Live total displayed below the editor. |
| Tax Inclusive Pricing         | `tax_inclusive`                    | `false` | When on, prices are displayed *with* tax already included.                         |
| VAT Number                    | `vat_number`                       | (empty) | Your tax-ID; appears on invoices.                                                  |

::: tip Per-country tax (advanced)
The schema supports per-country tax bands (`multiple_taxes_by_country`) for site owners that need it. There's no UI yet — set the value via the REST API or a custom plugin if you need it today.
:::

## 9. Currency

![Currency settings tab — default currency, position, separators, decimal places, enabled currencies](/screenshots/settings/currency.webp)

Display formatting for monetary values across the site.

| Control               | Setting key            | Default | Notes                                                                |
| ---                   | ---                    | ---     | ---                                                                  |
| Default Currency      | `currency`             | `USD`   | The base currency for all transactions. Searchable dropdown of all ISO codes. |
| Currency Position     | `currency_position`    | `left`  | `left`, `right`, `left_space`, `right_space`. Live preview in the dropdown. |
| Thousand Separator    | `thousand_separator`   | `,`     | Single character.                                                    |
| Decimal Separator     | `decimal_separator`    | `.`     | Single character.                                                    |
| Decimal Places        | `currency_decimals`    | `2`     | 0–4. Most fiat = 2; 0 for JPY / KRW.                                 |
| Enabled Currencies    | `enabled_currencies`   | `["USD"]` | Array of ISO codes. Used by the multi-currency switcher (Pro modules can extend). |

## 10. Integration

![Integration settings tab — third-party module toggles populated by active Pro modules](/screenshots/settings/integration.webp)

Toggles for built-in third-party integrations. The contents here change based on which Pro modules you have active. Common ones:

- **Google Calendar** — when the Pro Google Calendar module is on, this section exposes the OAuth credentials, calendar ID, and sync direction. See [Modules → Google Calendar](/modules#google-calendar).
- **Google Analytics** / **Facebook Pixel** / **Mailchimp** — likewise surface their config when the corresponding Pro module is active.

For a full list of integrations and their setup guides, see [Pro modules overview](/third-party-integrations).

## 11. Permalink

![Permalink settings tab — URL slugs for trips, destinations, activities, categories with live preview](/screenshots/settings/permalink.webp)

URL slugs for Yatra's content types. Changing any of these requires a **rewrite-rule flush** — Yatra triggers it automatically on save, but if you ever see 404s, visit <span class="screen-path">Settings → Permalinks</span> in WP-admin and click *Save* to force a flush.

| Control               | Setting key            | Default        | Resulting URL example                                |
| ---                   | ---                    | ---            | ---                                                  |
| Trip Base             | `trip_base`            | `trip`         | `/trip/everest-base-camp`                            |
| Booking Base          | `booking_base`         | `book`         | `/book/everest-base-camp`, `/book/confirmation/`     |
| Account Base          | `account_base`         | `my-account`   | `/my-account/dashboard`                              |
| Destination Base      | `destination_base`     | `destination`  | `/destination/nepal`                                 |
| Activity Base         | `activity_base`        | `activity`     | `/activity/trekking`                                 |
| Trip Category Base    | `trip_category_base`   | `trip-category`| `/trip-category/adventure`                           |

::: tip Live preview
Each input shows the resulting public URL beneath it, with a **View** link so you can verify the page renders before navigating away.
:::

The whole permalink set passes through the `yatra_permalink_bases` filter — useful if you're enforcing localised slugs from a custom plugin. See [Hooks & filters → Front-end routing](/hooks-filters#front-end-routing-templates).

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
| Debug mode               | `debug_mode`      | `false` | Plugin-side diagnostics. **Bypasses the Yatra object cache** while on (same as `WP_DEBUG=true`). |
| Enable Cache             | `cache_enabled`   | `true`  | Yatra's internal cache layer. Auto-disabled while *Debug mode* or `WP_DEBUG` is on.              |

### Legal pages (Booking UI)

| Control                  | Setting key                | Notes                                                              |
| ---                      | ---                        | ---                                                                |
| Terms & Conditions page  | `terms_page_id`            | WP page linked from the *I agree to terms* checkbox in checkout.   |
| Privacy Policy page      | `privacy_policy_page_id`   | Linked from the privacy-consent checkbox. Falls back to the WP **Settings → Privacy** page when blank. |

### Telemetry (opt-in)

The **Help us improve Yatra** section enables anonymous usage tracking. What gets collected is documented at [wpyatra.com/what-we-collect/](https://wpyatra.com/what-we-collect/). It is **off by default** — switch it on to help the team prioritise features.

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

- [Bookings & customers](/booking-settings) — the operator guide for the **Booking** tab.
- [Payments](/payment-settings) — gateway setup, deposits, refunds, the **Payment** tab in depth.
- [Email & notifications](/email-settings) — transactional email templates and the **Email** tab.
- [Pro modules overview](/third-party-integrations) — what populates the **Integration** tab.
- [REST API](/api-reference) — full settings endpoint surface.
- [Hooks & filters](/hooks-filters) — every hook the settings system fires.
