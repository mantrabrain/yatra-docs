---
title: Scheduled Payments
description: Auto-charge the remaining balance on a future date — gateway-side scheduled payments.
prev:
  text: Flexible Payments
  link: /modules/flexible-payments
next:
  text: Abandoned Booking Recovery
  link: /modules/abandoned-booking-recovery
---

# Scheduled Payments <span class="pro-pill">PRO</span>

After a deposit ([Flexible Payments](/modules/flexible-payments)), automatically **charge the remaining balance** on a configured date — using the customer's saved payment method on the gateway side, no manual collection needed.

## What problem it solves

Without scheduled payments, balance collection means emailing the customer 30 days before travel and hoping they come back and pay. ~15-25 % drop off; the rest of your team chases. Scheduled Payments uses the gateway's saved-card / token APIs to charge automatically — same as a subscription.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Scheduled Payments</span>.
2. Configure under <span class="screen-path">Yatra → Settings → Payment</span> — the **Scheduled balance payments** section becomes editable.

## Requirements

- **Flexible Payments** must be on (Scheduled is its sibling — schedules the balance Flexible left outstanding).
- The gateway must support **saved payment methods** for off-session charges. Currently supported: Stripe, Square, Authorize.Net, PayPal Vault.
- The customer must have **opted in** to saving their payment method during checkout.

## Configure

| Setting                         | What it does                                                          |
| ---                             | ---                                                                   |
| **Enable scheduled balance payments** | Master toggle.                                                  |
| **Charge balance N days before travel** | The site-wide default window (e.g. 30 days).                  |
| **Retry policy**                | How many times to retry on failure (default 3, with 24-hour gaps).    |
| **Notification emails**         | Send a heads-up 7 days before the auto-charge, plus a receipt after.  |
| **Failed-charge fallback**      | Email customer with a manual payment link if all retries fail.        |

## Per-trip overrides

In the [Trip Builder](/trip-creation) → **Pricing** section, override the auto-charge window per trip ("charge balance 60 days out for this expedition").

## How it appears in checkout

Customers see an explicit consent line on the deposit step:

> *"You'll be charged a $600 deposit today. The remaining $2,400 will be charged automatically on Apr 5, 2026 (30 days before travel) using the same payment method. We'll email you 7 days before."*

## Status surfacing

The Bookings list gains a **Scheduled** column showing the balance charge date and current status (Pending / Scheduled / Charged / Failed). Click into a booking for the full retry history.

## Hooks

| Hook                                                  | Type    | Purpose                                                  |
| ---                                                   | ---     | ---                                                      |
| `yatra_get_scheduled_payment_settings`                | filter  | Override site-wide settings programmatically.            |
| `yatra_pass_gateway_ids_for_scheduled_payments`       | filter  | Force-attach gateway customer / payment-method IDs even when `save_card` was off. |
| `yatra_scheduled_payment_charged`                     | action  | Fires after a successful auto-charge.                    |
| `yatra_scheduled_payment_failed`                      | action  | Fires after all retries are exhausted.                   |

## Pairs well with

- [Flexible Payments](/modules/flexible-payments) — required parent module.
- [Email Automation](/modules/email-automation) — lets you build the heads-up + receipt + failure sequence.
