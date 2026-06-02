---
title: Advanced Discount
description: Step-by-step setup for the Yatra Pro Advanced Discount module — group-size discounts that auto-apply based on traveler count, combined with promo codes, with per-category tiered ranges.
prev:
  text: Dynamic Form Field
  link: /modules/dynamic-form-field
next:
  text: Google Calendar
  link: /modules/google-calendar
---

# Advanced Discount <span class="pro-pill">PRO</span>

![Yatra → Discounts admin — promo codes + group + promo+group modes](/screenshots/discounts/discounts-list.webp)

Yatra's free plugin supports **promo codes** out of the box — customers type a code at checkout. The Advanced Discount module unlocks two extra modes:

1. **Group Only** — auto-applies when the traveler count crosses a threshold (e.g. *"6+ travelers, 10% off"*) with **no code required**.
2. **Promo + Group** — a code that *also* layers group-size logic on top, so larger groups get bigger discounts.

You can also configure **category-based tiered ranges** so different traveler categories get different group rates within the same discount.

## What you'll need

| Thing                            | Where to get it                                                       |
| ---                              | ---                                                                   |
| Yatra Pro license                | <span class="screen-path">Yatra → License</span>                     |
| Advanced Discount module enabled | <span class="screen-path">Yatra → Modules → Advanced Discount</span> |
| At least one trip with pricing   | The discount needs a price to discount against.                       |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Advanced Discount** → toggle on.
3. The Discounts page (always at <span class="screen-path">Yatra → Discounts</span>) now shows the Group + Promo+Group modes when you click **+ Add Discount**.

## Step 2 — Create a discount

Open <span class="screen-path">Yatra → Discounts → + Add Discount</span>.

![Discount mode picker — Promo Code (free), Group Only (Pro), Promo + Group (Pro)](/screenshots/modules/advanced-discount-modes.webp)

### Pick a mode

| Mode              | Free / Pro                              | Auto-applies?           | Code required at checkout? |
| ---               | ---                                     | :-:                     | :-:                        |
| **Promo Code**    | ✅ Free                                 | No                      | ✅ Yes                     |
| **Group Only**    | <span class="pro-pill">PRO</span>       | ✅ Yes (when threshold met) | No                      |
| **Promo + Group** | <span class="pro-pill">PRO</span>       | After code applied      | ✅ Yes                     |

Pick *Group Only* or *Promo + Group* and continue.

### Common fields (every mode)

| Field                            | Required | Notes                                                              |
| ---                              | :-:      | ---                                                                |
| **Code**                         | If Promo or Promo+Group | Monospace, unique, auto-uppercased.                       |
| **Name**                         | ✅       | Internal label.                                                   |
| **Description**                  | —        | Subtitle on the discount list.                                    |
| **Type**                         | ✅       | Percentage or fixed amount.                                       |
| **Amount**                       | ✅       | The discount value (e.g. `15` for 15% off, `25.00` for $25 off). |
| **Max Discount Amount**          | —        | Caps a percentage discount at an absolute value.                  |
| **Valid From / Expiry Date**     | —        | Both optional.                                                    |
| **Usage Limit**                  | —        | Total uses across all customers. `0` = unlimited.                 |
| **Usage Limit Per Customer**     | —        | Caps per-customer redemptions.                                    |
| **Min Booking Total**            | —        | Discount only applies above this amount.                          |
| **Applicable To**                | ✅       | *All trips* or *Specific trips* → pick trip IDs.                  |
| **First Time Customer Only**     | —        | Restrict to customers with zero previous bookings.                |

### Group-mode-only fields

These appear when you picked *Group Only* or *Promo + Group*:

| Field                            | Notes                                                                                                        |
| ---                              | ---                                                                                                          |
| **Group Discount Min Size**      | Smallest traveler count that triggers the group discount. E.g. `6` means "6 or more travelers".            |
| **Group Discount Type**          | Percentage or fixed (per range).                                                                            |
| **Group Discount Amount**        | The value when the threshold is met.                                                                        |
| **Group Discount Mode**          | *Total* (one rate for the whole booking) or *Category-based* (different rates per traveler category).      |
| **Category Discounts** (range)   | When *Category-based* is on, define per-category tiers — see below.                                        |

### Category-based tiered example

```
Group Min Size: 6+

Adult category:
  6–10 travelers → 10% off
  11+ travelers  → 15% off

Child category:
  6–10 travelers → 5% off
  11+ travelers  → 8% off
```

Each tier is a row in the Category Discounts repeater with a *min travelers*, *max travelers*, and *amount*. Use this when you want bigger groups to compound their discount but want the discount to be smaller for child seats than for adult seats.

## Step 3 — Verify on a test booking

### Promo Code

1. Open a trip in a private browser window. Reach the **Payment** step.
2. Type the code → click **Apply**.
3. The summary updates with the discount line. Status: `applied`.
4. Complete checkout → booking detail shows the discount.

### Group Only

1. Open the trip. Reach the **Traveler counts** step.
2. Bump the traveler count above the group threshold.
3. The discount auto-applies — the Payment summary shows it as a line item with the *Group Discount* badge.
4. No code field is needed.

### Promo + Group

1. As Promo Code above — type the code.
2. AS Group Only — increase travelers above the threshold.
3. Both discounts stack into a combined Group Discount line item.

## How discounts stack with other features

| Feature in play                                            | Behaviour                                                                      |
| ---                                                        | ---                                                                            |
| Multiple promo codes                                       | Only one code can be active per booking. The latest applied wins.              |
| Promo + Group on a multi-category booking                  | Yatra applies the category-based rates internally and sums them into one line. |
| [Dynamic Pricing](/modules/dynamic-pricing) also matching  | Default: both discounts come off the trip's **catalog price** (additive — customer-friendliest). See "How Dynamic Pricing and discounts combine" below. |
| [Additional Services](/modules/additional-services) attached | Services are added *after* the trip-price discount — they're never discounted. |

## How Dynamic Pricing and discounts combine

When both [Dynamic Pricing](/modules/dynamic-pricing) and an Advanced
Discount apply to the same booking, by default Yatra calculates **both
reductions against the trip's catalog (regular) price**, then subtracts
both from what the customer pays. This is the customer-friendliest
behaviour and matches how most travel sites stack discounts.

**Worked example** — Trip catalog price $149/adult, Dynamic Pricing
saves $17.88/adult (early bird), Group Discount 9%, 8 adults booked:

| Line | Amount |
| --- | --- |
| Catalog price per adult                          | $149.00 |
| Dynamic Pricing saving                           | −$17.88 |
| Price per adult **shown in the booking sidebar** | $131.12 |
| × 8 adults                                       | $1,048.96 |
| + Additional services                            | $800.00 |
| **Trip Subtotal**                                | **$1,848.96** |
| Group Discount: 9% × catalog ($149 × 8 = $1,192) | −$107.28 |
| Subtotal (taxable)                               | $1,741.68 |

The Group Discount percentage is applied to **$1,192** (the catalog
base), not **$1,048.96** (the DP-adjusted base the customer sees on
screen) — that's why the displayed discount is larger than a naive
"9% of $1,048.96" mental check would suggest. The customer benefits
from both savings stacking off the original price.

::: tip Want different stacking behaviour?
The [**Discount Stacking** setting](/settings#discount-stacking) (Settings →
Pricing, visible only when both Advanced Discount and Dynamic Pricing
modules are enabled) lets operators switch between four modes:

- **Both apply** *(default — the additive stacking shown above)*
- **Best for the customer** — apply whichever single mechanism gives the
  larger reduction; never combine
- **Discount only** — when a coupon or group discount is valid, skip
  Dynamic Pricing for that booking
- **Dynamic Pricing only** — when a DP rule fires, ignore the discount

Pick the policy that matches how your business prefers to communicate
pricing.
:::

## On the booking detail page

The booking's [Payment Summary](/booking-settings#_1-booking-overview) shows the discount as a **negative line** under the trip base price:

```
Trip Base Price (10 × $99) ........ $990.00
Group Discount (10+ travelers) .... −$148.50  (15% off)
Subtotal .......................... $841.50
```

The [Discount Applied](/booking-settings#_8-discount-applied-conditional) sidebar also shows the type (Coupon vs Group), the code (if any), and the savings amount.

## Troubleshooting

**Group discount doesn't auto-apply** — make sure the discount status is *Publish*. Group discounts respect *Valid From / Expiry Date* like promo codes do. Also confirm the traveler count meets the *Group Discount Min Size*.

**Customer types a code but it doesn't apply** — check status (must be *Publish*, not *Draft*), expiry, usage limits, and *Applicable To* (the trip they're booking must be in the allowed list).

**Discount doubled** — only one *promo code* applies per booking. If you're seeing two, one is likely a Group Discount that's stacking — that's expected.

**Category-based tiers aren't kicking in** — verify each tier's *min travelers* / *max travelers* covers the actual traveler count. A booking with 8 travelers won't trigger a `6–7` tier; you need an `8–10` tier or wider range.

## Useful links

- [Bookings → Discounts](/booking-settings#discounts-coupons) — the discount admin reference.
- [Bookings → Discount Applied sidebar](/booking-settings#_8-discount-applied-conditional) — booking-side view of an applied discount.
- [Dynamic Pricing](/modules/dynamic-pricing) — for rule-based price adjustments (separate from discounts).

## Where to read more

- [All modules](/modules#advanced-discount) — module catalog.
