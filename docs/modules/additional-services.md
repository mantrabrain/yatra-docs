---
title: Additional Services
description: Step-by-step setup for the Yatra Pro Additional Services module — create global or per-trip upsells (airport transfer, insurance, gear rental) with quantity controls and per-person, per-booking, or per-day pricing.
prev:
  text: Google Calendar
  link: /modules/google-calendar
next:
  text: Trip Consent
  link: /modules/trip-consent
---

# Additional Services <span class="pro-pill">PRO</span>

![Yatra → Additional Services admin — list of upsell items, status, price](/screenshots/modules/additional-services-list.webp)

Sell **optional add-ons** alongside your trips — airport transfers, travel insurance, gear rental, photography packages, single-supplement upgrades. Each service appears as a tick-box on the booking flow with the customer's currency and total updating live. Services can be attached to specific trips or offered globally.

## What you'll need

| Thing                             | Where to get it                                                                |
| ---                               | ---                                                                            |
| Yatra Pro license                 | <span class="screen-path">Yatra → License</span>                              |
| Additional Services module enabled | <span class="screen-path">Yatra → Modules → Additional Services</span>        |
| At least one published trip       | Services attach to existing trips (or all of them).                            |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Additional Services** → toggle on.
3. A new menu item appears: <span class="screen-path">Yatra → Additional Services</span> (under the Trips group in the sidebar).

## Step 2 — Create a service

Open <span class="screen-path">Yatra → Additional Services → + Add Service</span>.

![Additional Services form — name, description, price type/per, image, attach-to-trips](/screenshots/modules/additional-service-form.webp)

### Basics

| Field           | Notes                                                                      |
| ---             | ---                                                                        |
| **Name**        | Customer-facing label (e.g. *"Airport Transfer"*, *"Travel Insurance"*).   |
| **Description** | Shown under the name in the booking flow. Plain text, ~1–2 sentences.      |
| **Image**       | Optional. WordPress media picker. Appears as a thumbnail next to the service. |
| **Sort order**  | Lower numbers appear first. Default `0`.                                   |
| **Status**      | `Published` / `Draft` / `Trash`.                                           |

### Pricing

Two enums combine to define how the service is charged:

**Price Type:**

| Value         | What it does                                                              |
| ---           | ---                                                                       |
| `fixed`       | Flat amount in your site currency. *"$30 for the transfer"*.             |
| `percentage`  | Percentage of the trip base price. *"+5% for insurance"*.                |

**Price Per:**

| Value      | What it does                                                                  |
| ---        | ---                                                                           |
| `person`   | Multiplied by the number of travelers. *"$15 per traveler for the lunch"*.   |
| `booking`  | Charged once per booking, regardless of group size. *"$50 booking fee"*.    |
| `day`      | Multiplied by the trip duration in days. *"$10 per day for the bike rental"*. |

Combine them: a `fixed` × `person` service multiplies the fixed amount by travelers; a `percentage` × `booking` charges the percentage once.

### Quantity controls

| Field                 | Notes                                                                  |
| ---                   | ---                                                                    |
| **Allow quantity**    | When on, the customer can pick a quantity (e.g. *2 airport transfers*). |
| **Min quantity**      | Default 1. Useful when the service has a minimum order.                 |
| **Max quantity**      | Per-booking cap.                                                       |

### Attach to trips

Two options:

1. **Specific trips** — searchable multi-select picker. The service only appears on these trips.
2. **All trips** — global toggle. Service appears on every trip's checkout.

## Step 3 — Verify the service appears at checkout

1. Open a trip you attached the service to in a private browser window.
2. Click **Book Now** → reach the *Add-ons* / *Extras* step.
3. The service appears as a tick-box (or stepper, when *Allow quantity* is on) with the calculated price.
4. Tick / pick a quantity → the price summary updates with the line item.
5. Complete checkout → the booking detail page (admin side) shows the service in the **Payment Summary** breakdown under *Additional Services*.

![Customer checkout — additional services with live total](/screenshots/modules/additional-services-checkout.webp)

## The admin list

Default columns:

- **Service** (image + name).
- **Price** (formatted with type/per indicator, e.g. *"$30 per booking"* or *"+5% per person"*).
- **Used by** — number of trips this service is attached to.
- **Status** badge.
- **Sort order**.

Status filter pills: All / Published / Draft / Trash.

Bulk actions: Mark as Published / Draft / Trash / Delete permanently.

## Worked examples

| You want…                                                       | Price type     | Price per     | Allow quantity |
| ---                                                             | ---            | ---           | :-:            |
| Flat $50 booking fee                                            | `fixed`        | `booking`     | off            |
| $30 airport transfer per person                                 | `fixed`        | `person`      | off            |
| Travel insurance @ 5% of trip price                             | `percentage`   | `booking`     | off            |
| $10/day camera rental, customer picks how many days             | `fixed`        | `day`         | on (max 14)    |
| Multiple airport transfers (one each way, customer picks 1 / 2) | `fixed`        | `booking`     | on (max 2)     |

## On the booking detail page

The booking's **Payment Summary** sidebar lists every added service as its own line:

```
Trip Base Price ............... $499.00
Airport Transfer × 2 .......... $60.00
Insurance (5%) ................ $24.95
Subtotal ...................... $583.95
```

Cancelling a booking restores the seats; refunding an additional service line happens via the gateway (Yatra doesn't selectively refund a single line item — it refunds the whole booking).

## Troubleshooting

**Service doesn't appear at checkout** — confirm the service status is *Published*, and that it's either attached to this specific trip OR set to *All trips*. *Draft* services are hidden from the public flow.

**Wrong line-item total** — re-check the *Price type* + *Price per* combo. A `percentage` × `person` service multiplies the percentage by traveler count, not by the trip price alone.

**Customer sees a quantity stepper they shouldn't** — toggle *Allow quantity* off and re-save.

**Service appears on wrong trips** — clear *Specific trips* and add only the trips you want, OR toggle *All trips* off.

## Useful links

- [Bookings → Payment Summary](/booking-settings#_1-booking-overview) — where service line items appear on the booking detail.
- [Hooks & filters](/hooks-filters) — `yatra_additional_services_calculate_price`, `yatra_additional_services_render_label`.

## Where to read more

- [All modules](/modules#additional-services) — module catalog.
