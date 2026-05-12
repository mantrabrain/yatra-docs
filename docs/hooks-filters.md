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

> Yatra exposes hundreds of hooks. The list below covers the ~80 you'll reach for most often.

::: warning Verify hook names against your version
Hook names can be added, renamed, or retired between plugin versions. Before you build something that depends on a specific hook, **confirm it exists in your version** by searching the plugin source:
>
> ```bash
> grep -rh "do_action.*yatra_booking_created" wp-content/plugins/yatra wp-content/plugins/yatra-pro
> grep -rh "apply_filters.*yatra_trip_price" wp-content/plugins/yatra
> ```
>
> Every Yatra hook follows the `yatra_*` prefix.
:::

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
| `yatra_after_payment_processing`           | action  | Final hook after payment processing succeeds             |
| `yatra_paypal_payment_completed`           | action  | PayPal-specific success                                  |
| `yatra_paypal_payment_refunded`            | action  | PayPal-specific refund (use this instead of a generic `yatra_payment_refunded` — Yatra fires per-gateway refund actions) |
| `yatra_razorpay_refund_created`            | action  | Razorpay-specific refund                                 |
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
| `yatra_email_template_trip_variables`      | filter  | Add or rewrite the per-trip merge tags available to email templates |
| `yatra_email_template_preview_variables`   | filter  | Same, for the template preview pane                      |
| `yatra_send_booking_status_email_html`     | filter  | Rendered HTML for booking-status emails before send       |
| `yatra_email_template_enquiry_admin` / `_received` / `_response` | filter | Override the rendered HTML per enquiry email template |

## Enquiries

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_enquiry_created`                    | action  | After enquiry insert (carries the joined trip object since 3.0.3) |
| `yatra_enable_enquiry`                     | filter  | Master toggle for enquiry UI on the trip page             |
| `yatra_enquiry_button_text`                | filter  | Customise the "Make an Enquiry" CTA copy                  |
| `yatra_enquiry_form_show`                  | filter  | Show / hide the enquiry form per trip                     |
| `yatra_enquiry_form_title_text`            | filter  | Override the enquiry form title                           |
| `yatra_email_template_enquiry_admin`       | filter  | Rendered HTML for the admin enquiry notification          |
| `yatra_email_template_enquiry_response`    | filter  | Rendered HTML for the customer response email             |

## Account / customer

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_customer_created`                   | action  | New customer record                                      |
| `yatra_customer_updated`                   | action  | After customer edit                                      |
| `yatra_user_id`                            | filter  | Resolve the user ID for a customer / booking flow         |
| `yatra_user_allowed_to_login`              | filter  | Block / allow a specific user from the front-end login flow |
| `yatra_login_redirect_url`                 | filter  | Redirect destination after a successful login            |

## Front-end routing & templates

Yatra registers its own pretty URLs for the booking flow, account, email verification and remaining-balance checkout.

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_pretty_route_match`                 | filter  | Modify how a route resolves (final say on tab/template)  |
| `yatra_plain_route_match`                  | filter  | Same but for `?yatra_*` query-string URLs                |
| `yatra_frontend_request_path`              | filter  | Normalize the request path before matching              |
| `yatra_register_rewrite_rules`             | action  | Add additional rewrite rules                             |
| `yatra_build_archive_listing_url`          | filter  | Override how Yatra builds catalog listing URLs            |
| `yatra_get_trip_listing_url`               | filter  | Override the URL Yatra generates for the trip archive     |

## Shortcodes and listings

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_trip_listing`                       | filter  | The full listing object Yatra renders into the trip catalog  |
| `yatra_trip_listing_context`               | filter  | The context array passed to the trip card template       |
| `yatra_trip_listing_max_per_page`          | filter  | Cap on the `per_page` shortcode attribute                |
| `yatra_is_trip_listing`                    | filter  | Override Yatra's "are we on the trip-listing page" detection |
| `yatra_listing_nonce`                      | filter  | Customise the nonce field used inside listing-form posts |

::: tip Want to customise card markup?
Yatra doesn't currently expose a stable `*_card_html` filter for whole-card replacement. The supported customisation paths are: (1) override the card template in your child theme — copy `templates/partials/trip-card.php` into `wp-content/themes/{your-theme}/yatra/partials/trip-card.php`; or (2) hook into the listing-context filter above to mutate the variables the card template sees.
:::

## Frontend templating & block themes (FSE)

Yatra renders its own URL paths (`/trips/`, `/trip/{slug}/`, `/book/`, `/my-account/`, etc.) with a custom router rather than via real WordPress post types. The following extension points exist so themes and other plugins can integrate cleanly — particularly with Full Site Editing block themes.

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `pre_handle_404` *(core hook, Yatra uses)* | filter  | Yatra short-circuits this for its own URLs so `WP::handle_404()` never sets `is_404 = true` for plugin pages. Return `true` from your own callback (priority < 10) to opt a custom URL in. |
| `body_class`                               | filter  | Yatra strips `error404` for its pages and adds `yatra-page` plus a `yatra-page-{type}` class (e.g. `yatra-page-trip`). |
| `template_include`                         | filter  | Yatra hooks at priority **99**. If a request matched a Yatra route, the chosen PHP template is returned here. Customise via `yatra_template_path` below or with a theme override at `your-theme/yatra/{template}.php`. |
| `yatra_template_path`                      | filter  | `($absolute_path, $template_name, $page_type)` — last chance to swap the PHP file before it's included. Useful for shipping a template variant from another plugin. |
| `yatra_register_rewrite_rules`             | action  | Fires after Yatra registers its rewrite tags and rules. Receives the resolved permalink bases. |

### FSE / Site Editor

Yatra registers virtual block templates (Single Trip, Trip Listing, Destination, Activity, Booking, Booking Confirmation, My Account) so admins can find and customise Yatra layouts under <span class="screen-path">Appearance → Editor → Templates</span>.

- The customisation is saved by core as a `wp_template` post. On the next request, Yatra detects it and renders that block template instead of the bundled PHP template.
- Block templates embed a server-side block called **Yatra Page Content** (`yatra/page-content`). At render time it includes the PHP template selected by Yatra's router, so customising the *chrome* (header / sidebar / footer placement) is fully editable while the *content* stays driven by Yatra.
- Inside that block, `yatra_get_header()` and `yatra_get_footer()` are no-ops — the canvas already emits the document and header/footer parts, so the PHP template only contributes its inner content.

::: tip Theme overrides without the editor
Drop a copy of any template at `wp-content/themes/{your-theme}/yatra/{name}.php` and `locate_template()` will pick it up first. No filter wiring needed. This works for classic and block themes alike.
:::

## Admin / settings / modules

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_admin_localized_data`               | filter  | Inject extra props into `window.yatraAdmin`. Pro modules use this to expose flags like `flexiblePaymentsEnabled` so the React admin can conditionally render Pro-gated UI. |
| `yatra_module_active`                      | action  | When a module is enabled                                 |
| `yatra_module_deactive`                    | action  | When a module is disabled                                |
| `yatra_module_enabled_status`              | filter  | Authoritative is-this-module-enabled check               |
| `yatra_module_capabilities`                | filter  | Module-required capabilities                             |
| `yatra_module_assets`                      | filter  | Assets enqueued for a module                             |
| `yatra_default_modules`                    | filter  | Add to / remove from the default module registry         |
| `yatra_enable_setup_wizard`                | filter  | Show / hide the setup wizard                             |
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
| `yatra_deposit_percentage`                 | filter  | `($default, $context = [])` — Override deposit %. `$context['trip_id']` lets the Pro module honour per-trip `trip.deposit_percentage` |
| `yatra_partial_payment_percentage`         | filter  | `($default, $context = [])` — Override partial-payment % (context unused today; passed for parity) |
| `yatra_calculate_amount_due`               | filter  | `($amount_due, $total_amount, $payment_method, $context = [])` — Final say on the payable-now amount. `$context['trip_id']` lets Pro apply per-trip `trip.deposit_amount` (absolute) or `trip.deposit_percentage` |
| `yatra_payment_method_options`             | filter  | `($options, $booking_data)` — Adds *Pay X% Deposit* / *Pay X% Now* radios to the booking form. `$booking_data['trip_id']` lets Pro show the deposit option whenever a trip has per-trip values, even with the global flag off |
| `yatra_scheduled_payments_module_active`   | filter  | Whether scheduled payments processing should run         |
| `yatra_scheduled_payment_setting`          | filter  | Per-setting reads                                        |

::: tip Per-trip overrides
The `$context` argument added to `yatra_deposit_percentage`, `yatra_calculate_amount_due`, and `yatra_payment_method_options` since Yatra Free 3.0.5 / Pro 3.0.3 is what lets the Flexible Payments module read `trip.deposit_amount` / `trip.deposit_percentage` for a specific booking. If you implement your own filter callback that ignores `$context`, you'll only get site-wide behaviour — which is fine, but match the new signature if you want trip-aware behaviour.
:::

## Pro: Email Automation

| Hook                                       | Type    | Purpose                                                  |
| ---                                        | ---     | ---                                                      |
| `yatra_pro_email_automation_owns_transactional_type` | filter | Let Pro Email Automation own a specific template type so Pro's send pipeline runs instead of the free one |

::: tip Looking for sequence-step or payload filters?
Yatra's source emits sequence events through the email-template filter chain (see the **Email** section above). If you need pre-send mutation, hook into `yatra_send_transactional_email` (returns `false` to suppress) or the per-template filters like `yatra_email_template_trip_variables`.
:::

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

::: tip Customise consent email copy
The consent-request email is a normal Yatra template (`trip_consent_request`). Override the body via [Settings → Email → Templates](/email-settings#account-consent), or hook into `yatra_email_template_trip_variables` to rewrite the merge-tag values it receives.
:::

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
