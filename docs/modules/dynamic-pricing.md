---
title: Dynamic Pricing
description: Step-by-step setup for the Yatra Pro Dynamic Pricing module — automatic price adjustments by season, time, demand, inventory, early bird, and last minute. Six rule types, percentage or fixed adjustments, with priority and stacking.
prev:
  text: Scheduled Payments
  link: /modules/scheduled-payments
next:
  text: Abandoned Booking Recovery
  link: /modules/abandoned-booking-recovery
---

# Dynamic Pricing <span class="pro-pill">PRO</span>

![Yatra → Dynamic Pricing admin — list of rules with type, adjustment, status](/screenshots/modules/dynamic-pricing-list.webp)

Auto-adjust trip prices based on **season**, **time of day**, **demand**, **inventory**, **early bird**, or **last minute** windows. Rules can apply globally or per-trip, stack with each other, and each one shows up as a line in the audit log so you can see why a booking ended up at $499 instead of the trip's listed $599.

## What you'll need

| Thing                            | Where to get it                                                       |
| ---                              | ---                                                                   |
| Yatra Pro license                | <span class="screen-path">Yatra → License</span>                     |
| Dynamic Pricing module enabled   | <span class="screen-path">Yatra → Modules → Dynamic Pricing</span>   |
| At least one trip with a price set | Otherwise there's nothing to adjust against.                        |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Dynamic Pricing** → toggle on.
3. A new top-level menu item appears: <span class="screen-path">Yatra → Dynamic Pricing</span>.

## Step 2 — Pick a rule type

Click **+ Add Rule** from the Dynamic Pricing admin. Yatra opens a **rule-type picker** with six options:

| Rule type      | When to use                                                                                                                  |
| ---            | ---                                                                                                                          |
| **Early Bird** | Discount customers who book far in advance (*"book 60+ days out, save 15%"*).                                                |
| **Last Minute** | Discount or surcharge close to departure (*"7 days out, 10% off remaining seats"* — fills the bus).                          |
| **Demand**     | React to booking velocity (*"once 70% of seats sold, raise price 20%"*).                                                     |
| **Inventory**  | React to absolute seats remaining (*"when ≤ 3 seats left, +25%"*).                                                          |
| **Seasonal**   | Date-range adjustments (*"Dec 15 – Jan 5 is peak season: +30%"*).                                                            |
| **Time-based** | Day-of-week / time-of-day adjustments (*"Weekend departures cost 15% more"*, *"Morning slots are 10% cheaper than evenings"*). |

Pick one — the rest of the form changes shape to match the rule type.

## Step 3 — Configure the rule

![Dynamic Pricing rule form — name, adjustment type, value, conditions, scope](/screenshots/modules/dynamic-pricing-form.webp)

### Common fields (every rule type)

| Field                | Notes                                                                                                        |
| ---                  | ---                                                                                                          |
| **Name**             | Internal label (e.g. *"Summer Early Bird Discount"*). Surfaces in the audit log on bookings.                |
| **Adjustment type**  | `percentage` (e.g. `-15` = 15% off) or `fixed` (e.g. `-50` = $50 off; `+25` = $25 surcharge).               |
| **Adjustment value** | The number. Negative = discount, positive = surcharge.                                                       |
| **Priority**         | Integer. Higher priority rules run first. Default `0`.                                                       |
| **Stack with other rules** | Toggle. When off, this rule is the *final* one — others stop after it. When on, additional rules can stack on top. |
| **Status**           | Active / Inactive.                                                                                          |

### Rule-type-specific fields

**Early Bird:**

- **Days before departure** — minimum number of days the booking must precede the trip date.

**Last Minute:**

- **Days before departure** — maximum number of days. Bookings inside this window trigger the rule.

**Demand:**

- **Threshold percent** — e.g. `70` = trigger when 70% of capacity is sold.
- **Threshold absolute** — alternative: trigger when N bookings have happened on this departure.

**Inventory:**

- **Trigger when seats remaining are at or below** — e.g. `3` = trigger when only 3 seats remain.

**Seasonal:**

- **Start date** / **End date** — the date range the adjustment applies to.
- **Recurring yearly** — toggle. When on, the dates re-apply every year (e.g. "Christmas peak season, every year").

**Time-based:**

- **Days of week** — multi-select (Sun–Sat).
- **Start time / End time** — optional intra-day window.

### Scope: which trips does this apply to?

| Scope option     | Notes                                                                  |
| ---              | ---                                                                    |
| **All trips**    | Rule applies to every published trip.                                  |
| **Specific trips** | Searchable multi-select. Rule only applies to the picked trips.      |
| **By category**  | Pick trip categories — applies to every trip in those categories.     |
| **By destination** | Pick destinations — applies to every trip in those destinations.    |

Save.

## Step 4 — Preview the impact

Above the Save button, the rule form shows a **live preview** card:

- Original trip price: `$499.00`
- Rule applied: `Summer Early Bird (-15%)`
- New price: `$424.15`
- Saving: `$74.85`

Use this to sanity-check the math before publishing the rule.

## Step 5 — Verify on a real booking

1. Make a test booking that matches the rule's conditions (e.g. travel date 90+ days out for an Early Bird rule).
2. Yatra computes the adjusted price during the booking flow — the customer sees the discounted price.
3. Open the booking detail in admin → **Payment Summary** breakdown shows the line *"Dynamic Pricing: Summer Early Bird (-15%)"* with the adjustment amount.
4. The audit log keeps a permanent record per booking so you can audit pricing decisions later.

## The Dynamic Pricing admin

Default columns on the rule list:

- **Name**
- **Rule type** (badge)
- **Adjustment** (e.g. *"-15%"* or *"+$50 fixed"*)
- **Scope** (All trips / 3 trips / Adventure category)
- **Priority**
- **Stack** (yes/no)
- **Status** (Active / Inactive)

Filters: by rule type, by status. Bulk actions: Activate / Deactivate / Delete permanently.

### Statistics

The Dynamic Pricing dashboard shows:

- Total rules created.
- Rules by type (breakdown chart).
- Adjustments applied this month (count + total value).
- Top-performing rule (most-triggered).

## How rules combine

When multiple rules match a booking, they're applied **in priority order** (highest priority first). After each, if its *Stack with other rules* toggle is **off**, the chain stops. If **on**, the next rule applies to the *adjusted* price.

Example with two rules that both match:

| Rule                          | Priority | Stack | Adjustment |
| ---                           | :-:      | :-:   | ---        |
| Summer Early Bird (seasonal × early-bird) | 10  | on    | −15%      |
| Group of 8+ (custom)          | 5        | on    | −5%       |

A booking matching both starts at $499 → after Early Bird (priority 10): $424.15 → after Group (priority 5): $402.94.

::: tip Test combinations
Use the live preview card in the rule form to verify expected behaviour. If your stacking surprises you, set *Stack* to off on the higher-priority rule to force it as the final adjustment.
:::

## How Dynamic Pricing interacts with discounts

When a booking *also* qualifies for an [Advanced Discount](/modules/advanced-discount)
(promo code or group discount), by default Yatra applies **both
reductions against the trip's catalog (regular) price** and subtracts
both from what the customer pays:

- Dynamic Pricing changes the per-unit price the customer sees in the
  sidebar (e.g. catalog $149 → DP-adjusted $131.12).
- The discount percentage is then calculated against the **catalog**
  $149 base, not the DP-adjusted $131.12. So a 9% group discount on
  8 adults shows as **−$107.28** (9% × $149 × 8), not −$94.41 (9% ×
  $131.12 × 8). The customer ends up with the larger combined saving.

The customer sees the DP-adjusted price on each row but the discount
line item is calculated off the original catalog price — this is by
design and produces the customer-friendliest stacked total.

::: tip Want different stacking behaviour?
The [**Discount Stacking** setting](/settings#discount-stacking) (Settings →
Pricing, visible only when both Dynamic Pricing and Advanced Discount
modules are enabled) lets operators choose how the two combine:

- **Both apply** *(default — additive stacking off catalog)*
- **Best for the customer** — apply whichever gives the larger
  reduction; never combine
- **Discount only** — skip Dynamic Pricing when a discount is valid
- **Dynamic Pricing only** — skip the discount when DP fired

See [Advanced Discount → How Dynamic Pricing and discounts combine](/modules/advanced-discount#how-dynamic-pricing-and-discounts-combine)
for the full worked example.
:::

## Common patterns

| Goal                                                                  | Rule type    | Adjustment            |
| ---                                                                   | ---          | ---                   |
| Reward customers who book a season ahead                              | Early Bird   | percentage, `-15`     |
| Fill the last seats on a departure                                    | Inventory    | percentage, `-25`     |
| Charge a peak-season premium for Christmas / New Year                 | Seasonal     | percentage, `+30`     |
| Charge more for weekend departures                                    | Time-based   | percentage, `+15`     |
| Surge when 80% sold                                                   | Demand       | percentage, `+20`     |
| Flat $50 off for last-minute bookings under 7 days                    | Last Minute  | fixed, `-50`          |

## Troubleshooting

**A rule doesn't trigger** — check (a) its status is *Active*, (b) the booking actually matches the conditions (date range, scope, etc.), and (c) no higher-priority rule with *Stack = off* shortcircuits it.

**Customer is charged more than expected** — open the booking → Payment Summary → look at the Dynamic Pricing line(s). The breakdown shows which rule and which amount.

**Two rules both fire when you wanted only one** — set *Stack* to off on the rule that should be final. Or raise its priority so it runs first.

**Rule preview shows $0 adjustment** — your trip has no base price set, or the rule's adjustment value is 0. Set both.

## Useful links

- [Bookings → Payment Summary](/booking-settings#_1-booking-overview) — where Dynamic Pricing adjustments appear.
- [Hooks & filters](/hooks-filters) — `yatra_dynamic_pricing_rule_applied`, `yatra_dynamic_pricing_calculate`.

## Where to read more

- [All modules](/modules#dynamic-pricing) — module catalog.
- [Trip Builder → Pricing](/trip-creation#_1-3-pricing) — the base price Dynamic Pricing adjusts.
