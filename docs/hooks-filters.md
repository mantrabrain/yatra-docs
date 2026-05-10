---
title: Hooks & filters
description: Actions and filters Yatra exposes for custom integrations — bookings, trips, payments, emails, and Pro modules.
prev:
  text: Shortcodes
  link: /shortcodes
next:
  text: REST API
  link: /api-reference
---

# Hooks & filters

Yatra is built around a wide hook surface: every meaningful state change fires an action, and most rendered values pass through a filter so you can override them. This page lists the most useful actions and filters grouped by area, plus general guidance on using them.

> Yatra ships with hundreds of hooks. The list below covers the ~80 you'll reach for most often. To find a hook for a specific feature, search the plugin source for `do_action('yatra_*'` or `apply_filters('yatra_*'` — every hook follows the `yatra_` prefix.

## Conventions

- **Actions** are named `yatra_{noun}_{verb}` and fire after the underlying change (e.g. `yatra_booking_created` fires after the booking row is inserted).
- **Filters** are named `yatra_{noun}_{property}` and pass the value as the first argument.
- **Pro hooks** carry no special prefix — Pro just adds more `yatra_*` hooks. A few pro-specific hooks use `yatra_pro_*` (license, module activation).
- **Backwards compatibility:** Yatra retires hooks with notice, never silently. Deprecated hooks keep firing for at least one minor version.

## Trips

Fired around trip lifecycle and rendering.

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_trip_created`                       | action  | After a trip is inserted; receives `$trip_id`            |
| `yatra_trip_updated`                       | action  | After a trip is updated                                  |
| `yatra_trip_deleted`                       | action  | Before a trip is deleted (soft or hard)                  |
| `yatra_trip_loaded_with_relations`         | filter  | Mutate the joined trip object (with classifications, attributes, etc.) |
| `yatra_trip_created_with_relations`        | action  | After insert + relations save                            |
| `yatra_trip_updated_with_relations`        | action  | After update + relations save                            |
| `yatra_trip_display_price`                 | filter  | Last-mile override for the displayed price               |
| `yatra_dynamic_pricing_enabled`            | filter  | Toggle Pro Dynamic Pricing per-trip                      |
| `yatra_availability_price`                 | filter  | Override price on a specific departure                   |
| `yatra_get_dynamic_pricing_display_settings`| filter | Customize how dynamic-pricing surcharges/discounts render |
| `yatra_calculate_demand_scores`            | action  | Override demand-score calculation (Pro)                  |

## Bookings

Lifecycle and per-booking rendering.

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_booking_created`                    | action  | New booking submitted                                    |
| `yatra_booking_updated`                    | action  | Booking row updated                                      |
| `yatra_booking_status_changed`             | action  | Args: `($booking, $new_status, $old_status)`             |
| `yatra_booking_deleted`                    | action  | Before a booking is deleted                              |
| `yatra_booking_email_variables`            | filter  | Augment the merge-tag map for booking emails             |
| `yatra_booking_email_traveler_identity_field_keys` | filter | Customize identity-table fields                  |
| `yatra_payment_completed`                  | action  | Fired across multiple gateways after capture             |

### Booking pricing pipeline

The price you see on the booking summary is the result of a chain of filters. Hooking these lets you adjust the math without touching gateway code.

| Filter                                | Stage                                                |
| ---                                   | ---                                                  |
| `yatra_before_calculation_params`     | Normalize incoming traveler counts, picked date, etc.|
| `yatra_booking_trip_price`            | Per-trip base price                                  |
| `yatra_calculate_subtotal`            | After traveler categories, before extras             |
| `yatra_booking_additional_services`   | Pro Additional Services subtotal                     |
| `yatra_calculate_payment_amounts`     | Compute deposit / partial / total payable now        |
| `yatra_after_calculation_result`      | Final adjustments                                    |
| `yatra_booking_email_variables`       | Variables passed to email templates                  |

The implementation lives in `app/Services/CalculationService.php`. Each filter receives the partial result and the booking context.

## Payments

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_register_payment_gateways`          | action  | Register a custom gateway class                          |
| `yatra_payment_gateway_config_saved`       | action  | After a gateway's settings save                          |
| `yatra_before_payment_processing`          | action  | Before a payment intent is created                       |
| `yatra_payment_completed`                  | action  | After successful capture                                 |
| `yatra_payment_failed`                     | action  | After failed capture                                     |
| `yatra_before_payment_refund`              | action  | Before refund                                            |
| `yatra_payment_refunded`                   | action  | After refund                                             |
| `yatra_after_payment_refund`               | action  | Final hook for refund post-processing                    |
| `yatra_paypal_payment_completed`           | action  | PayPal-specific success                                  |
| `yatra_paypal_payment_refunded`            | action  | PayPal-specific refund                                   |
| `yatra_paypal_payment_token_saved`         | action  | PayPal Advanced vault                                    |
| `yatra_payment_amount_mismatch`            | action  | (3.0.4+) Fires when a client-supplied amount in `POST /payment/create-intent` disagreed with the server's `booking.amount_due`. Args: `($booking_id, $client_amount, $server_amount)`. The transaction itself is forced to the server amount; this hook exists for fraud-monitoring integrations. |
| `yatra_pdf_remote_enabled`                 | filter  | (3.0.4+) Enable / disable dompdf remote image loading. Default `true` so PDFs can render the site logo and trip images. Return `false` to lock the PDF generator down to ABSPATH only (recommended if your invoices never contain external images). |
| `yatra_pro_writable_settings_schema`       | filter  | (3.0.4+) Pro-only. Receives `key => sanitizer-callable` map of settings keys the `POST /yatra/v1/settings` REST endpoint is allowed to write. Modules can register their own keys here; anything not in this map is silently rejected by the endpoint. |
| `yatra_pass_gateway_ids_for_scheduled_payments` | filter | Whether to forward the gateway's customer / payment-method IDs into the scheduled-payments pipeline even when `save_card` was off. Useful for gateways that auto-vault. |

### Stripe-specific actions (Pro)

Fired only when the verified Stripe webhook handler dispatches a known event. Verification is HMAC-SHA256 against the configured `webhook_secret` with a 5-minute replay window — handlers attached here only ever see real, signed Stripe events.

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_stripe_payment_succeeded`           | action  | (3.0.4+) `payment_intent.succeeded`. Receives the full PaymentIntent object as an array. |
| `yatra_stripe_payment_failed`              | action  | (3.0.4+) `payment_intent.payment_failed`. Args: PaymentIntent object as array. |
| `yatra_stripe_charge_refunded`             | action  | (3.0.4+) `charge.refunded`. Args: Charge object as array. |

### Adding a custom gateway

The minimal recipe:

```php
add_action( 'yatra_register_payment_gateways', function ( $registry ) {
    $registry->register( 'my_gw', \My\Gateway\MyGateway::class );
} );
```

Your `MyGateway` extends `\Yatra\PaymentGateways\AbstractPaymentGateway` and implements `id`, `name`, `description`, `getConfigFields`, `processPayment`, optionally `processRefund` and `handleWebhook`. See `app/PaymentGateways/Gateways/PayPal/PayPalGateway.php` for a complete reference.

## Email

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_send_transactional_email`           | filter  | Short-circuit before sending; return `false` to suppress |
| `yatra_pro_email_automation_owns_transactional_type` | filter | Let Pro Email Automation own a specific template type |
| `yatra_send_*_email` (e.g. `yatra_send_booking_received_email`) | action | Per-event audit hook |
| `yatra_email_template_replacements`        | filter  | Add or rewrite merge tags                                |

## Enquiries

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_enquiry_created`                    | action  | After enquiry insert (carries the joined trip object since 3.0.3) |
| `yatra_enquiry_updated`                    | action  | After enquiry edit (e.g. staff response)                 |
| `yatra_send_enquiry_admin_email`           | action  | Sending the admin notification                           |
| `yatra_send_enquiry_response_email`        | action  | Sending the customer response                            |

## Account / customer

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_customer_created`                   | action  | New customer record                                      |
| `yatra_customer_updated`                   | action  | After customer edit                                      |
| `yatra_user_registered`                    | action  | When customer registers a WP account                     |
| `yatra_email_verified`                     | action  | Customer confirmed their email                           |
| `yatra_password_reset_requested`           | action  | Reset requested (filter the URL via `yatra_password_reset_url`) |

## Front-end routing & templates

Yatra registers its own pretty URLs for the booking flow, account, email verification and remaining-balance checkout.

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_pretty_route_match`                 | filter  | Modify how a route resolves (final say on tab/template)  |
| `yatra_plain_route_match`                  | filter  | Same but for `?yatra_*` query-string URLs                |
| `yatra_frontend_request_path`              | filter  | Normalize the request path before matching              |
| `yatra_register_rewrite_rules`             | action  | Add additional rewrite rules                             |
| `yatra_emit_canonical_meta`                | filter  | Disable Yatra's `<link rel=canonical>` if your SEO plugin owns it |

## Shortcodes and listings

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_trip_listing_filters`               | filter  | Modify the SQL filter array used by `[yatra_trip]` and the Trip block |
| `yatra_destination_listing_filters`        | filter  | Same for destination listings                            |
| `yatra_activity_listing_filters`           | filter  | Same for activity listings                               |
| `yatra_trip_category_listing_filters`      | filter  | Same for trip-category listings                          |
| `yatra_trip_listing_card_html`             | filter  | Replace card markup wholesale                            |
| `yatra_trip_listing_per_page_default`      | filter  | Default per-page count                                   |
| `yatra_search_form_html`                   | filter  | Replace search-form markup                               |
| `yatra_classification_listing_card_html`   | filter  | Card markup for destination/activity/category cards      |

## Admin / settings / modules

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_admin_localized_data`               | filter  | Inject extra props into `window.yatraAdmin`              |
| `yatra_module_activated` / `_deactivated`  | action  | When a module's enabled/disabled state changes           |
| `yatra_module_capabilities`                | filter  | Module-required capabilities                             |
| `yatra_module_settings`                    | filter  | Module settings schema                                   |
| `yatra_module_assets`                      | filter  | Assets enqueued for a module                             |
| `yatra_setup_wizard_steps`                 | filter  | Add or remove wizard steps                               |
| `yatra_setup_wizard_completed`             | action  | After the wizard is finalized                            |
| `yatra_clear_cache`                        | action  | Invalidate Yatra's internal cache                        |

## Pro license & updater

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_is_pro_active`                      | filter  | Toggle Pro behavior (Pro returns true; you can short-circuit for testing) |
| `yatra_pro_available_modules`              | filter  | Add or remove modules from the Modules screen            |
| `yatra_pro_license_store_url`              | filter  | Override the license store URL                           |
| `yatra_pro_license_item_id`                | filter  | Override the EDD product ID                              |
| `yatra_pro_license_data_updated`           | action  | After license data is saved                              |
| `yatra_pro_module_activated`               | action  | After a Pro module activates (creates tables, etc.)      |
| `yatra_pro_module_settings_updated`        | action  | After a Pro module's settings save                       |

## Pro: Dynamic Pricing

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_dynamic_pricing_enabled`            | filter  | Whether DP applies to a given trip                       |
| `yatra_get_dynamic_pricing_display_settings`| filter | Display settings for surcharge/discount badges           |
| `yatra_price_breakdown`                    | filter  | The breakdown shown on the booking summary               |
| `yatra_calculate_demand_scores`            | action  | Override / extend demand calculation                     |

## Pro: Flexible / Scheduled Payments

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_flexible_payments_enabled`          | filter  | Master toggle (per-trip or globally)                     |
| `yatra_flexible_payment_setting`           | filter  | Read individual setting values                           |
| `yatra_deposit_percentage`                 | filter  | Override deposit %                                       |
| `yatra_partial_payment_percentage`         | filter  | Override partial-payment %                               |
| `yatra_calculate_amount_due`               | filter  | Final say on the payable-now amount                      |
| `yatra_scheduled_payments_module_active`   | filter  | Whether scheduled payments processing should run         |
| `yatra_scheduled_payment_setting`          | filter  | Per-setting reads                                        |

## Pro: Email Automation

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_pro_email_automation_owns_transactional_type` | filter | When Pro should override a free transactional type |
| `yatra_email_automation_event_payload`     | filter  | Mutate the variables passed to a sequence step           |
| `yatra_email_automation_should_send`       | filter  | Suppress a step at runtime                               |

## Pro: Custom Landing Pages

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_destination_permalink`              | filter  | Override the destination URL                             |
| `yatra_activity_permalink`                 | filter  | Override the activity URL                                |
| `yatra_category_permalink`                 | filter  | Override the trip-category URL                           |

## Pro: Trip Consent

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_consent_signed`                     | action  | After a customer signs a consent form                    |
| `yatra_consent_form_email_subject`         | filter  | Override the consent email subject                       |

## Pro: Additional Services

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_booking_additional_services`        | filter  | Mutate selected services on a booking                    |
| `yatra_booking_save_services`              | action  | After services are persisted                             |
| `yatra_booking_get_services`               | filter  | Modify how services are fetched for display              |

## Practical recipes

### Send a Slack notification on every booking

```php
add_action( 'yatra_booking_created', function ( $booking_id ) {
    $booking = yatra_get_booking( $booking_id );
    if ( ! $booking ) return;

    wp_remote_post( SLACK_WEBHOOK_URL, [
        'body'    => wp_json_encode( [
            'text' => sprintf(
                'New booking %s for %s · %d travelers · %s',
                $booking->reference,
                $booking->trip_title,
                $booking->traveler_count,
                yatra_price_html( $booking->total )
            ),
        ] ),
        'headers' => [ 'Content-Type' => 'application/json' ],
    ] );
}, 10, 1 );
```

### Add 5% surcharge to all bookings on weekends

```php
add_filter( 'yatra_booking_trip_price', function ( $price, $context ) {
    $departure = $context['departure_date'] ?? null;
    if ( ! $departure ) return $price;

    $day = (int) date( 'N', strtotime( $departure ) );
    if ( $day >= 6 ) {                  // Sat / Sun
        $price *= 1.05;
    }
    return $price;
}, 10, 2 );
```

### Hide trips from a specific destination on a public listing

```php
add_filter( 'yatra_trip_listing_filters', function ( $filters ) {
    if ( is_admin() || ! empty( $filters['private_view'] ) ) return $filters;

    $filters['exclude_destination'] = [ 99 ];   // hide destination ID 99 from public listings
    return $filters;
} );
```

### Auto-tag Mailchimp subscribers based on the trip booked

```php
add_action( 'yatra_booking_created', function ( $booking_id ) {
    $booking = yatra_get_booking( $booking_id );
    if ( ! $booking ) return;

    $tag = sprintf( 'trip-%s', sanitize_title( $booking->trip_title ) );
    do_action( 'yatra_mailchimp_add_tag', $booking->customer_email, $tag );
} );
```

### Block weekend bookings of a specific trip

```php
add_filter( 'yatra_resolve_availability_object', function ( $availability, $trip_id, $date ) {
    if ( $trip_id !== 42 ) return $availability;
    $day = (int) date( 'N', strtotime( $date ) );
    if ( $day >= 6 ) {
        $availability['available'] = false;
        $availability['message']   = 'This trip runs Mon–Fri only.';
    }
    return $availability;
}, 10, 3 );
```

## Discovering more hooks

```bash
cd wp-content/plugins/yatra
# All actions:
grep -rn "do_action\(\s*'yatra_" app/ | sort -t: -k1
# All filters:
grep -rn "apply_filters\(\s*'yatra_" app/ | sort -t: -k1
```

Most hooks have a short docblock explaining the arguments and intent. The cleanest summary lives at the call site rather than in a separate hook reference, so reading the source is the canonical move when you're stuck.
