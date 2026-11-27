---
title: SliceWP affiliates
description: Pay affiliates a commission on trip bookings with SliceWP — how to switch the Yatra integration on, when a commission is created, approved or rejected, and the developer hooks.
---

# SliceWP affiliates

Yatra 3.3+ works with [SliceWP](https://wordpress.org/plugins/slicewp/), a WordPress affiliate plugin. When a visitor an affiliate referred books a trip, the affiliate gets a commission on the booking. This is part of the **free** Yatra plugin.

::: info What you need
- Yatra **3.3.0 or later**.
- **SliceWP** installed and active. A SliceWP version too old to have the functions Yatra uses is ignored — nothing happens, and checkout is not affected.
:::

## Step 1 — Switch the integration on

1. Set up SliceWP as usual: your affiliates, the commission rate for **sales**, and the currency (<span class="screen-path">SliceWP → Settings</span>).
2. Open <span class="screen-path">SliceWP → Settings → Integrations</span>.
3. Switch on **Yatra** and save.

Yatra only supports SliceWP's **sale** commission type.

## Step 2 — Affiliates share their links

Affiliates send visitors to your site with their SliceWP referral link. SliceWP remembers the referring affiliate in the visitor's browser, as it does for any other integration.

## When a commission is created

When a referred visitor completes a booking through Yatra's **checkout**, Yatra adds one commission for that booking:

| | |
| --- | --- |
| **Status** | **Pending** |
| **Amount** | SliceWP's rate for sales, worked out on the **booking total before tax** |
| **Currency** | SliceWP's currency. If the booking is in another currency, SliceWP's own conversion is used. |
| **Reference** | The booking ID — in SliceWP's commissions list it links to the booking in Yatra |

A booking never gets more than one commission. No commission is made when:

- there's no valid referring affiliate;
- the affiliate is booking for themselves (logged in as the affiliate, or the booking email is the affiliate's) — unless SliceWP's setting to let affiliates earn commissions on their own purchases is on;
- the amount comes to zero — unless SliceWP is set to record zero-amount commissions.

Bookings you create yourself in the admin don't get a commission; only checkout bookings do. If anything goes wrong creating the commission, the customer's booking still goes through.

## When the commission changes

Yatra keeps the commission in step with the booking whenever its status changes or a payment is completed:

| Booking | Commission |
| --- | --- |
| Fully paid | **Pending → Unpaid** (approved, ready for you to pay out) |
| Cancelled, refunded, failed or deleted | **Rejected**, with the note *Rejected because booking #N was cancelled or refunded.* |
| Commission already **Paid** | Left alone — if you paid an affiliate for a booking that is later refunded, sort it out with them yourself. |

A deposit or partial payment doesn't approve the commission; it stays pending until the booking is fully paid.

## For developers

| Hook | Kind | What it does |
| --- | --- | --- |
| `yatra_slicewp_commission_amount` | filter (`$amount, $booking, $affiliateId`) | Change the commission amount before it is saved. `$booking` is the booking row. |
| `slicewp_referrer_affiliate_id_yatra` | filter (`$affiliateId, $bookingId`) | Change which affiliate gets the commission. |
| `slicewp_integration_supports_yatra` | filter (`$supports`) | What the integration tells SliceWP it supports (default `['commission_types' => ['sale']]`). |

See also [Hooks & filters](/hooks-filters).
