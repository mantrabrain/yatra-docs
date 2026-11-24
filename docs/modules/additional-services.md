---
title: Additional Services
description: Step-by-step setup for the Yatra Pro Additional Services module — create upsells for all trips or specific trips (airport transfer, insurance, gear rental) with fixed or percentage pricing, per person, per booking or per day, optionally required.
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
3. A new item appears: <span class="screen-path">Yatra → Trips → Additional Services</span>.

## Step 2 — Create a service

Open <span class="screen-path">Yatra → Trips → Additional Services</span> and add a service.

![Additional Services form — name, description, price type/per, image, attach-to-trips](/screenshots/modules/additional-service-form.webp)

### Basics

| Field           | Notes                                                                      |
| ---             | ---                                                                        |
| **Service Name** | Customer-facing label (e.g. *"Airport Transfer"*, *"Travel Insurance"*).   |
| **Description** | Shown under the name in the booking flow. Plain text, ~1–2 sentences.      |
| **Service Icon or Image** | Optional. Appears next to the service. |
| **Sort order**  | Lower numbers appear first. Default `0`.                                   |
| **Status**      | `Publish` / `Draft` / `Trash`. Only published services are offered.        |
| **Required Service** | If enabled, customers must select this service when booking — it is always added. |

### Pricing

Two enums combine to define how the service is charged:

**Price Type:**

| Value         | What it does                                                              |
| ---           | ---                                                                       |
| **Fixed Amount** (`fixed`) | Flat amount in your site currency. *"$30 for the transfer"*. Multiplied according to **Price Per**. |
| **Percentage of Trip Price** (`percentage`) | A percentage (up to 100%) of the trip price for the whole booking, charged **once**. *"5% for insurance"*. **Price Per** is not applied — the trip price already covers every traveller. |

**Price Per** (applies to Fixed Amount services):

| Value      | What it does                                                                  |
| ---        | ---                                                                           |
| **Per Person** (`person`)   | Multiplied by the number of travelers. *"$15 per traveler for the lunch"*.   |
| **Per Booking** (`booking`)  | Charged once per booking, regardless of group size. *"$50 booking fee"*.    |
| **Per Day** (`day`)      | Multiplied by the trip duration in days. *"$10 per day for the bike rental"*. |

The customer doesn't choose a quantity — it comes from the booking: the number of travelers (Per Person), the trip's days (Per Day) or 1 (Per Booking).

### Applicable To

- **All Trips** — the service is offered on every trip's checkout.
- **Specific Trips** — pick the trips; the service is only offered on those.

## Step 3 — Verify the service appears at checkout

1. Open a trip you attached the service to in a private browser window.
2. Click **Book Now** → reach the *Add-ons* / *Extras* step.
3. The service appears as a tick-box with its calculated price (a **Required Service** is always included).
4. Tick it → the price summary updates with the line item.
5. Complete checkout → the booking detail page (admin side) shows the service in the **Payment Summary** breakdown under *Additional Services*.

![Customer checkout — additional services with live total](/screenshots/modules/additional-services-checkout.webp)

## The admin list

Default columns:

- **Service** (image + name).
- **Price** (formatted with type/per indicator, e.g. *"$30 per booking"* or *"5%"*).
- **Status** badge.
- **Sort order**.

Status filter pills: All / Published / Draft / Trash.

Bulk actions: Mark as Published / Draft / Trash / Delete permanently.

## Worked examples

| You want…                                         | Price Type          | Price Per     | Charged for 3 travelers on a 5-day trip |
| ---                                               | ---                 | ---           | --- |
| Flat $50 booking fee                              | Fixed Amount        | Per Booking   | $50 |
| $30 airport transfer per person                   | Fixed Amount        | Per Person    | $90 |
| $10/day camera rental                             | Fixed Amount        | Per Day       | $50 |
| Travel insurance at 5% of the trip price          | Percentage of Trip Price | (not applied) | 5% of the trip price, once |
| Compulsory park fee of $20 per person             | Fixed Amount + **Required Service** | Per Person | $60, always added |

## On the booking detail page

The booking's **Payment Summary** sidebar lists every added service as its own line:

```
Trip Base Price ............... $499.00
Airport Transfer × 2 .......... $60.00   (Per Person, 2 travelers)
Insurance (5%) ................ $24.95
Subtotal ...................... $583.95
```

Cancelling a booking restores the seats. To refund part of a booking for a service, use **Refund** on the booking's payment — see [Manage a booking → Refund a payment](/booking-workspace#refund-a-payment).

## Troubleshooting

**Service doesn't appear at checkout** — confirm the service status is *Published*, and that it's either attached to this specific trip OR set to *All trips*. *Draft* services are hidden from the public flow.

**Wrong line-item total** — re-check *Price Type* and *Price Per*. A Fixed Amount service is multiplied by travelers (Per Person) or trip days (Per Day). A Percentage of Trip Price service is charged once on the trip price; Price Per doesn't change it.

**Customer can't untick a service** — it is a **Required Service**. Turn that off and save if it should be optional.

**Service appears on wrong trips** — set **Applicable To** to *Specific Trips* and pick only the trips you want.

## Useful links

- [Bookings → Payment Summary](/booking-settings#_1-booking-overview) — where service line items appear on the booking detail.
- [Hooks & filters](/hooks-filters) — `yatra_booking_additional_services`, `yatra_booking_services_total`.

## Where to read more

- [All modules](/modules#additional-services) — module catalog.
