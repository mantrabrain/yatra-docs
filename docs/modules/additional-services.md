---
title: Additional Services
description: Sell per-trip add-ons (transfers, gear hire, meal plans, photo packages) at checkout.
prev:
  text: Google Calendar
  link: /modules/google-calendar
next:
  text: Trip Consent
  link: /modules/trip-consent
---

# Additional Services <span class="pro-pill">PRO</span>

![Additional Services admin — list of services with type, price, attached trips](/screenshots/modules/additional-services.webp)

Sell **add-ons** at the booking step — airport transfers, gear hire, meal plans, photo packages, day-of upgrades. Each service can be attached to specific trips, all trips, or only certain destinations.

## What problem it solves

Travel businesses make material margin on extras (a $25 transfer or $40 photo package on top of every booking). Without a structured add-on system you either bury them in the trip price (losing transparency) or sell them off-platform (losing the data).

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Additional Services</span>.
2. New menu item: <span class="screen-path">Yatra → Trips → Additional Services</span>.

## Create a service

1. Open <span class="screen-path">Yatra → Trips → Additional Services → + Add New</span>.
2. Fill in:
   - **Title** (e.g. "Airport pickup — DPS to Ubud").
   - **Description** — shown in the checkout add-on selector.
   - **Price**, **price type** (per booking / per traveler / per night).
   - **Image** (optional).
   - **Availability** — fixed dates, recurring, or "any time the trip is bookable".
3. **Attach to trips** — pick all trips, specific trips, or all trips in selected destinations.
4. **Save**.

## How it appears at checkout

Yatra inserts an **Add-ons** step in the booking flow whenever the chosen trip + date has eligible services. Customers tick the services they want; price updates live; the chosen services are stored with the booking and shown on the invoice / voucher.

## Reporting

Per-service revenue and uptake rate live under <span class="screen-path">Yatra → Reports → Additional Services</span>.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_booking_additional_services`               | filter  | Adjust the services subtotal.                            |
| `yatra_booking_get_services`                      | filter  | Override which services are eligible for a given trip / date. |
| `yatra_booking_services_total`                    | filter  | Final services-subtotal hook before inclusion in booking total. |
