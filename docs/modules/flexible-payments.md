---
title: Flexible Payments
description: Take deposits and partial payments at checkout instead of the full trip price.
prev:
  text: Google Analytics
  link: /modules/google-analytics
next:
  text: Scheduled Payments
  link: /modules/scheduled-payments
---

# Flexible Payments <span class="pro-pill">PRO</span>

Lets customers pay a **deposit** or **partial percentage** of the trip price at checkout, with the balance due later (manually or via [Scheduled Payments](/modules/scheduled-payments)).

## What problem it solves

For a $3 000 trekking expedition, asking the customer to pay in full 6 months ahead is friction that loses bookings. A 20 % deposit removes the friction, locks in the customer, and lets you collect the rest closer to departure when commitment is higher.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Flexible Payments</span>.
2. Configure under <span class="screen-path">Yatra → Settings → Payment</span> — the **Partial / Deposit Payment** section becomes editable.

## Configure (site-wide defaults)

| Setting                      | What it does                                                                          |
| ---                          | ---                                                                                   |
| **Enable Partial Payment**   | Master toggle. Off = customers always pay in full.                                    |
| **Deposit type**             | Percentage (default) or fixed amount.                                                 |
| **Deposit value**            | `20 %` or `$200`. Whichever is greater is taken as the floor (configurable).          |
| **Default balance due**      | Days before travel that the balance is automatically due (e.g. 30 days).              |
| **Allow customer to pay full upfront** | Show a "Pay full now" toggle in checkout — useful for small trips where deposit math is silly. |

## Per-trip overrides

In the [Trip Builder](/trip-creation) → **Pricing** section there's a **Payment options** subsection that overrides the site-wide defaults:

- "This trip requires full payment upfront."
- "Custom deposit: 30 %."
- "Custom balance-due window: 60 days before travel."

## How it appears at checkout

When deposits are enabled, the booking summary shows three lines:

```
Trip total              $3,000
Pay now (deposit 20%)     $600
Balance due 30 days
before travel           $2,400
```

The booking is created with `payment_status = partial`, `amount_paid = $600`, `amount_due = $2,400`.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_flexible_payments_enabled`                 | filter  | Master toggle (per-trip or globally).                    |
| `yatra_flexible_payment_setting`                  | filter  | Read individual setting values.                          |
| `yatra_deposit_percentage`                        | filter  | Override deposit %.                                      |
| `yatra_partial_payment_percentage`                | filter  | Override partial %.                                      |
| `yatra_calculate_amount_due`                      | filter  | Final `amount_due` calculation hook.                     |

## Pairs well with

- [Scheduled Payments](/modules/scheduled-payments) — auto-charge the balance on the configured date instead of emailing the customer to come back and pay.
