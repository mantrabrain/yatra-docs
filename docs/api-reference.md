---
title: REST API
description: Yatra's REST API surface — namespaces, endpoints, authentication, and the database schema behind them.
prev:
  text: Hooks & filters
  link: /hooks-filters
next:
  text: FAQs
  link: /faqs
---

# REST API

Yatra exposes a comprehensive REST API under the `yatra/v1` namespace. Every screen in the React admin app talks to this API, and every front-end booking flow does too. You can use the same endpoints from external apps, headless front-ends, or scripts.

```text
Base URL:  https://your-site.com/wp-json/yatra/v1/
```

## Authentication

Yatra uses WordPress's standard REST authentication:

- **Cookie + nonce** — for logged-in WP users (the admin app uses this).
- **Application Passwords** — recommended for server-to-server scripts. Generate per-user under **Users → Profile → Application Passwords**.
- **Basic Auth over HTTPS** — supported by some plugins but not enabled by default in WordPress core.

Most write endpoints require `manage_options` (admin) or a Yatra-specific capability such as `yatra_edit_trips`, `yatra_manage_settings`, `manage_yatra`. Some read endpoints and the booking session endpoints are public — see the per-endpoint notes.

```bash
# List bookings as an admin (Application Password)
curl -u "umesh:xxxx xxxx xxxx xxxx xxxx xxxx" \
     https://example.com/wp-json/yatra/v1/bookings
```

## Permission patterns

| Pattern                            | Used by                                                 |
| ---                                | ---                                                     |
| `current_user_can( 'manage_options' )` | Most admin endpoints (settings, modules, license)   |
| `current_user_can( 'manage_yatra' )`   | Module-scoped admin endpoints (Email Automation, etc.) |
| `current_user_can( 'yatra_edit_trips' )` | Trip CRUD                                          |
| `__return_true` / public            | Booking session, public consent submission, abandoned-tracking, auth flow |

If your custom integration needs a narrower permission, you can register custom capabilities and filter `yatra_module_capabilities`.

### Public payment endpoints with inline authorization (3.0.4+)

A handful of payment routes use `__return_true` as their permission callback so guest checkout works, **but enforce authorization inline**. They are not freely accessible:

| Endpoint                          | Inline check                                                                                              |
| ---                               | ---                                                                                                       |
| `POST /payment/create-intent`     | If `booking_id` is supplied: must be the booking owner (or admin); guest bookings are accepted. Server recomputes amount from the booking row. |
| `POST /payment/confirm`           | Booking owner or admin. Rejects if `transaction_id` is already attached to a different booking. Idempotent on retry. |
| `GET /payment/status/{booking_id}` | Booking owner, admin, or guest with a matching `booking_token` transient. Anonymous → `401`. |
| `POST /payment/webhook/{gateway}` | Per-gateway signature verification (HMAC). Stripe enforces 5-min replay tolerance. Without a configured webhook secret, all events are rejected. |

When integrating from a custom front-end, send the WordPress nonce header (`X-WP-Nonce: <nonce>`) so the cookie auth path attaches a logged-in user identity to the request — that's how the "booking owner" check resolves.

## Response shape

Most endpoints return JSON in this canonical shape:

```json
{
  "success": true,
  "data":    { /* … */ },
  "meta":    { "page": 1, "per_page": 20, "total": 142 }
}
```

Errors are `WP_Error` payloads:

```json
{
  "code":    "yatra_validation_error",
  "message": "Trip ID is required.",
  "data":    { "status": 400, "field": "trip_id" }
}
```

## Endpoint surface

The list below groups the routes by area. Each row shows the path (relative to `/wp-json/yatra/v1`) and a one-line summary. For exact methods and parameters, see each controller class under `app/Controllers/` (free) or `app/Modules/{Module}/Controllers/` (Pro).

### Trips

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/trips`                                          | List / create trips                                  |
| `/trips/{id}`                                     | Read / update / delete a trip                        |
| `/trips/{id}/duplicate`                           | Duplicate a trip                                     |
| `/trips/{id}/permanent-delete`                    | Hard-delete a trashed trip                           |
| `/trips/{id}/revisions`                           | List trip revisions                                  |
| `/trips/{id}/attributes`                          | List / set per-trip attributes                       |
| `/trips/{id}/services`                            | (Pro) Additional services attached to a trip         |
| `/trips/{id}/availability`                        | List computed departures (fixed + recurring)         |
| `/trips/{id}/downloads`                           | List trip-attached downloads                         |
| `/trips/search`                                   | Search trips by title / slug                         |
| `/trips/public`                                   | Public listing endpoint used by `[yatra_trip]`       |
| `/trips/stats`                                    | Trip-level statistics                                |

### Classifications

Same shape for each classification type:

- `/destinations`, `/destinations/{id}`
- `/activities`, `/activities/{id}`
- `/trip-categories`, `/trip-categories/{id}`
- `/difficulty-levels`, `/difficulty-levels/{id}`
- `/traveler-categories`, `/traveler-categories/{id}`

The block-editor pickers also expose lightweight read endpoints under `/block-editor/{taxonomy}` (permission: `edit_posts`).

### Items, item types, itinerary

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/item-types`, `/item-types/{id}`                 | Itinerary item type CRUD                             |
| `/items`, `/items/{id}`                           | Itinerary items                                      |
| `/itineraries`, `/itineraries/{id}`               | Per-trip itinerary records                           |

### Availability

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/availability`, `/availability/{id}`             | Fixed departures CRUD                                |
| `/recurring-availability`, `/recurring-availability/{id}` | Recurring availability rules                |
| `/trips/{id}/availability`                        | Computed merged list                                 |

### Trip downloads

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/downloads/{id}`                                 | Get a download record                                |
| `/downloads/{id}/download-url`                    | Generate a presigned download URL                    |
| `/trips/{trip_id}/downloads`                      | All downloads attached to a trip                     |

### Attributes

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/attributes`, `/attributes/{id}`                 | Global attribute CRUD                                |
| `/trips/{id}/attributes`                          | Per-trip values                                      |

### Booking session and checkout

These power the React booking form. Public for guests, but some operations require a session ID.

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/booking/session`                                | Create / read / update / delete a booking session    |
| `/booking/trip/{id}`                              | Hydrate a booking page for the given trip            |
| `/booking/create`                                 | Materialize a booking from the session               |
| `/booking/summary`                                | Server-side compute of the price summary             |
| `/booking/coupons`                                | Apply / remove a coupon                              |
| `/payment/{gateway}/complete`                     | Per-gateway return URL handler                       |
| `/payment/webhook/{gateway}`                      | Per-gateway webhook receiver                         |

### Bookings (admin)

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/bookings`                                       | List + filter bookings                               |
| `/bookings/{id}`                                  | Read / update / delete a booking                     |
| `/bookings/{id}/travellers`                       | List per-traveler details                            |
| `/bookings/{id}/email`                            | Re-send an email against this booking                |
| `/bookings/{id}/voucher`                          | PDF voucher                                          |
| `/bookings/{id}/itinerary`                        | PDF itinerary                                        |
| `/bookings/{id}/invoice`                          | PDF invoice                                          |

### Payments

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/payments`, `/payments/{id}`                     | Payment-record CRUD                                  |
| `/payment/gateways`                               | List enabled gateways with their config              |
| `/payment/gateways/definitions`                   | Admin-only: full gateway field schema                |
| `/payment/gateways/{id}/config`                   | Admin-only: save a gateway's configuration           |
| `/payment/create-intent`                          | Create a payment intent (gateway-specific). The `amount` / `currency` in the request body are **ignored** when a `booking_id` is supplied — the server recomputes from the stored booking row to prevent amount tampering. |
| `/payment/confirm`                                | Confirm a payment intent. Requires booking ownership; idempotent on `(booking_id, transaction_id)`. |
| `/payment/webhook/{gateway}`                      | Per-gateway webhook receiver. Public route; signature verification happens inside the gateway handler. Stripe enforces `Stripe-Signature` HMAC + 5-min replay window. |
| `/payment/callback/{gateway}`                     | Per-gateway redirect-return handler                  |
| `/payment/status/{booking_id}`                    | Latest payment status for a booking. Requires booking owner, admin, or a guest `booking_token`. Returns `401` for anonymous callers. |
| `/payment/remaining`                              | Logged-in user only: create a payment intent for a booking's remaining balance. Ownership is enforced server-side. |
| `/payment/remaining/session`                      | Logged-in user only: bootstrap a session for the remaining-balance checkout |
| `/payment/{payment_id}/invoice`                   | PDF invoice. Auth: admin, booking owner, signed `invoice_token`, or guest with active `booking_token`. |
| `/payment/{payment_id}/voucher`                   | PDF voucher. Same auth model as invoice. |

### Customers, reviews, enquiries

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/customers`, `/customers/{id}`                   | Customer CRUD                                        |
| `/reviews`, `/reviews/{id}`                       | Review CRUD                                          |
| `/enquiries`, `/enquiries/{id}`                   | Enquiry CRUD (POST is public for the trip enquiry modal) |
| `/saved-trips`                                    | (Pro feature) Wishlist / saved trips                 |

### Auth (customer-facing)

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/auth/login`                                     | Customer login                                       |
| `/auth/register`                                  | Customer registration                                |
| `/auth/resend-verification`                       | Re-send the email-verification link                  |

### Settings, modules, license

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/settings`                                       | Read / write settings (free)                         |
| `/settings/flush-rewrites`                        | Flush WP rewrite rules                               |
| `/settings/pages`                                 | List candidate WP pages for booking / account / TOS  |
| `/email-template-preview`                         | Render an email template with sample data            |
| `/modules`                                        | List modules with state                              |
| `/modules/{slug}`                                 | Per-module read                                      |
| `/modules/{slug}/toggle`                          | Toggle on/off                                        |
| `/modules/{slug}/settings`                        | Read / write module settings                         |
| `/license`                                        | (Pro) Read / write license info                      |
| `/license/activate`, `/deactivate`, `/check`, `/save` | (Pro) License lifecycle                          |

### Reports, tools, sample data, cache, migration

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/reports`                                        | Reporting summary (filters via query)                |
| `/tools/export`, `/tools/import`                  | Export / import Yatra data                           |
| `/tools/logs`                                     | Read system logs                                     |
| `/tools/jobs`                                     | Manage background jobs                               |
| `/tools/cron-run`                                 | Trigger a cron pass manually                         |
| `/sample-data/import`, `/sample-data/status`, `/sample-data/cleanup` | Seed / clean demo data            |
| `/cache/stats`, `/cache/view`, `/cache/status`, `/cache/enable`, `/cache/disable`, `/cache/clear-*`, `/cache/toggle`, `/cache/warm` | Yatra's cache layer |
| `/migration/status`, `/migrate`, `/migrate-all`, `/progress`, `/cancel`, `/clear` | Legacy → 3.x migration runner |
| `/test`                                           | Health check (admin only)                            |
| `/usage-tracking`, `/notices`                     | Telemetry (opt-in) and dismissible admin notices     |

### Pro modules (additional routes)

| Path                                              | Purpose                                              |
| ---                                               | ---                                                  |
| `/dynamic-pricing/rules`, `/{id}`                 | DP rules CRUD                                        |
| `/dynamic-pricing/preview`                        | Preview a rule against a trip / date                 |
| `/dynamic-pricing/statistics`                     | DP stats                                             |
| `/dynamic-pricing/bulk-status`                    | Bulk activate / trash / delete                       |
| `/dynamic-pricing/settings`                       | DP global settings                                   |
| `/email-templates`, `/email-templates/{id}`       | Per-template CRUD                                    |
| `/email-sequences`, `/email-sequences/{id}`       | Sequences with steps                                 |
| `/email-logs`                                     | Email send log                                       |
| `/consent/forms`, `/consent/forms/{id}`           | Consent-form CRUD                                    |
| `/consent/form/{token}`                           | Public — fetch a form to fill                        |
| `/consent/submit`                                 | Public — submit a signed consent                     |
| `/google-calendar/connect`                        | Begin OAuth                                          |
| `/google-calendar/callback`                       | OAuth callback                                       |
| `/google-calendar/disconnect`                     | Revoke connection                                    |
| `/google-calendar/settings`                       | Read / write GCal settings                           |
| `/google-calendar/sync-all`                       | Bulk sync existing bookings                          |
| `/mailchimp/...`                                  | Mailchimp settings + manual sync                     |
| `/facebook-pixel/...`                             | Pixel + CAPI configuration                           |
| `/google-analytics/...`                           | GA4 + Measurement Protocol configuration             |
| `/abandoned-bookings`, `/abandoned-bookings/{id}` | Admin browse + delete                                |
| `/abandoned-bookings/track`                       | Public tracking endpoint                             |
| `/abandoned-bookings/recover/{token}`             | Public recovery URL handler                          |
| `/additional-services`, `/additional-services/{id}` | Service CRUD                                       |

## Pagination, sorting, filtering

Most list endpoints accept the following query parameters:

| Param         | Default | Description                                        |
| ---           | ---     | ---                                                |
| `page`        | `1`     | Page number                                        |
| `per_page`    | `20`    | Page size (max 100)                                |
| `order`       | `desc`  | `asc` or `desc`                                    |
| `orderby`     | varies  | Endpoint-specific sort key                         |
| `search`      | —       | Free-text search                                   |
| `status`      | varies  | Filter by status                                   |
| `from`, `to`  | —       | Date range (ISO 8601)                              |

Total counts are returned in the `meta.total` body field and as the `X-WP-Total` / `X-WP-TotalPages` headers.

## Examples

### List recent confirmed bookings

```bash
curl -u 'admin:APP_PASSWORD' \
     'https://example.com/wp-json/yatra/v1/bookings?status=confirmed&per_page=10&orderby=created_at&order=desc'
```

### Create a trip

```bash
curl -X POST -u 'admin:APP_PASSWORD' \
     -H 'Content-Type: application/json' \
     -d '{
       "title": "Annapurna Base Camp Trek",
       "summary": "12-day teahouse trek through the Annapurna Sanctuary.",
       "regular_price": 1450,
       "duration": 12
     }' \
     https://example.com/wp-json/yatra/v1/trips
```

### Toggle the Dynamic Pricing module

```bash
curl -X POST -u 'admin:APP_PASSWORD' \
     -H 'Content-Type: application/json' \
     -d '{"enabled": true}' \
     https://example.com/wp-json/yatra/v1/modules/dynamic_pricing/toggle
```

### Submit an enquiry (public)

```bash
curl -X POST -H 'Content-Type: application/json' \
     -d '{
       "trip_id":      42,
       "customer_name":"Jane",
       "customer_email":"jane@example.com",
       "subject":      "Available in Sep?",
       "message":      "Hi, are there spots Sept 14–25?"
     }' \
     https://example.com/wp-json/yatra/v1/enquiries
```

### Activate a Pro license

```bash
curl -X POST -u 'admin:APP_PASSWORD' \
     -H 'Content-Type: application/json' \
     -d '{"license_key":"YOUR-LICENSE-KEY"}' \
     https://example.com/wp-json/yatra/v1/license/activate
```

## Database schema (summary)

Yatra stores data in custom tables (not WP posts/postmeta). The most-referenced ones:

| Table                                  | Plugin      | Description                                               |
| ---                                    | ---         | ---                                                       |
| `wp_yatra_trips`                       | Free        | Main trip records                                         |
| `wp_yatra_trip_meta`                   | Free        | Per-trip key/value meta                                   |
| `wp_yatra_trip_classifications`        | Free        | Destinations, activities, categories, difficulty rows     |
| `wp_yatra_trip_classification_pivot`   | Free        | Trip ↔ classification join                                |
| `wp_yatra_trip_attributes`             | Free        | Per-trip attribute values                                 |
| `wp_yatra_trip_itineraries`            | Free        | Itinerary items                                           |
| `wp_yatra_trip_faqs`                   | Free        | Per-trip FAQs                                             |
| `wp_yatra_trip_downloads`              | Free        | Per-trip files                                            |
| `wp_yatra_traveler_categories`         | Free        | Adult/child/etc. with price modifiers                     |
| `wp_yatra_availability`                | Free        | Fixed departures                                          |
| `wp_yatra_availability_recurring_rules`| Free        | Recurring availability rules                              |
| `wp_yatra_bookings`                    | Free        | Booking records                                           |
| `wp_yatra_booking_travellers`          | Free        | Per-booking traveler rows                                 |
| `wp_yatra_payments`                    | Free        | Payment records                                           |
| `wp_yatra_customers`                   | Free        | Customer records                                          |
| `wp_yatra_enquiries`                   | Free        | Trip enquiries                                            |
| `wp_yatra_reviews`                     | Free        | Trip reviews                                              |
| `wp_yatra_email_templates`             | Pro         | Editable email templates (Pro Email Automation)           |
| `wp_yatra_email_sequences`             | Pro         | Sequence definitions                                      |
| `wp_yatra_email_sequence_steps`        | Pro         | Steps within a sequence                                   |
| `wp_yatra_email_queue`                 | Pro         | Scheduled, pending sends                                  |
| `wp_yatra_email_logs`                  | Pro         | Send-attempt log                                          |
| `wp_yatra_dynamic_pricing_rules`       | Pro         | DP rules                                                  |
| `wp_yatra_trip_demand_scores`          | Pro         | Rolling demand scores per trip                            |
| `wp_yatra_pricing_history`             | Pro         | DP price-change history                                   |
| `wp_yatra_additional_services`         | Pro         | Service catalog                                           |
| `wp_yatra_trip_services`               | Pro         | Trip ↔ service join                                       |
| `wp_yatra_booking_services`            | Pro         | Per-booking selected services                             |
| `wp_yatra_consent_forms`               | Pro         | Consent form definitions                                  |
| `wp_yatra_consent_requests`            | Pro         | Pending requests                                          |
| `wp_yatra_signed_consents`             | Pro         | Signed records                                            |
| `wp_yatra_calendar_events`             | Pro         | Google Calendar event mapping                             |
| `wp_yatra_abandoned_bookings`          | Pro         | Abandoned-recovery records                                |
| `wp_yatra_recovery_email_logs`         | Pro         | Recovery-email send log                                   |
| `wp_yatra_recovery_statistics`         | Pro         | Recovery success metrics                                  |
| `wp_yatra_scheduled_payments`          | Pro         | Scheduled / installment payments                          |

## Versioning and stability

- The `yatra/v1` namespace is **stable**. Breaking changes will only land in a new namespace (`yatra/v2`).
- New endpoints can be added in any minor release.
- Response field additions are non-breaking; field renames or removals will be deprecated for at least one minor version with a notice in the response.

## Building a custom integration

Recommended starting points:

- **List trips for a headless front-end** — `GET /trips/public`.
- **Embed a booking widget elsewhere** — Yatra's booking React app expects to live on the same site. For cross-site bookings, expose your own thin layer that calls `POST /booking/session` and `POST /booking/create`.
- **Sync customers to your CRM** — listen on `yatra_booking_created` server-side, or poll `GET /customers?from=...&to=...`.
- **Build a daily PDF voucher batch** — read `GET /bookings?status=confirmed&from=tomorrow&to=tomorrow` and call `/bookings/{id}/voucher` for each.

For deeper questions about specific endpoints, the cleanest reference is the controller class — every route is registered with a `register_routes()` method that documents `methods`, `permission_callback`, and `args`.
