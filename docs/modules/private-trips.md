---
title: Private Trips
description: Yatra Pro Private Trips — let a group book a departure for themselves at checkout, for a fee you set per trip. Nobody else can then book that departure.
---

# Private Trips <span class="pro-pill">PRO</span>

Let a family, a group of friends or a company book a departure **just for themselves**. At checkout the customer ticks **Make this a private trip**: your private-trip fee is added to the price, and from then on nobody else can book that departure.

::: info Plan and versions
**Yatra Pro — any plan.** New in Yatra Pro 3.3.0 and needs the free **Yatra 3.3.0 or later**. On an older Yatra the module stays off.
:::

## Step 1 — Turn the module on

<span class="screen-path">Yatra → Modules</span> → **Private Trips** (category *Sales*) → toggle on.

## Step 2 — Allow private bookings on a trip

1. Open the trip in <span class="screen-path">Yatra → Trips</span> → **Availability & Booking** section → **Private Trips** card.
2. Tick **Allow private bookings**.
3. Set the **Private trip fee** — added to the trip price when the customer makes it private. Use 0 for no extra charge.
4. Choose **Charge the fee**: *Once per booking* (a flat surcharge) or *Per traveller*.
5. Save the trip.

## What the customer sees

On the checkout page, above the contact details:

- **Make this a private trip (+fee)** — when the departure has no bookings yet. Ticking it reloads the page with the fee in the price breakdown as a **Private trip** line.
- **Private trip: not available on this date** — when other travellers have already booked that departure.

The fee is part of the booking total, so coupons, taxes, deposits and the invoice treat it like the rest of the price. It is listed as **Private trip** on the confirmation page and in the admin booking screen.

## What "private" means for your inventory

- While a private booking holds seats (pending, confirmed, processing, completed or on hold), its departure shows as **Sold out** to everyone else — on the trip page, the calendar and at checkout — and can't be booked, including from the admin booking form.
- For a trip with time slots, the private booking takes its own time slot; the other slots that day stay open.
- If the private booking is cancelled, refunded or expires unpaid, the departure opens again.
- The customer's own checkout still works after a failed payment (a retry from the same browser session isn't blocked).
- A departure that already has a booking can't be made private. This is checked again when the customer clicks Pay, in case someone booked in the meantime.

::: warning Not covered
- A **Multi-Trip Cart** checkout can't make a trip private.
- Bookings arriving from an **OTA channel** (Channel Manager) are not stopped by a private booking. Close the date on the channel if you sell the trip there.
:::

## For developers

| Hook | What it is |
| --- | --- |
| `yatra_checkout_pre_create_error` (Yatra 3.3) | Filter. Return a `WP_Error` to refuse a checkout booking just before it is created; its message is shown to the customer. Args: `$error, $data, $session, $context` (`trip_id`, `travel_date`, `departure_time`, `travelers_count`, `is_waitlist`). |
| `requested_date` / `requested_time` on the availability object (Yatra 3.3) | Set on a trip-default (flexible-date) object resolved for one date, whose `departure_date` stays empty. |

A private booking stores `meta._private_trip` = `{fee, departure_time, token, at}` on the booking row.
