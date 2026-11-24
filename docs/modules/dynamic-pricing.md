---
title: Dynamic Pricing
description: Step-by-step setup for the Yatra Pro Dynamic Pricing module — automatic price adjustments by season, time, demand, inventory, early bird, and last minute. Six rule types, percentage or fixed adjustments, all trips or specific trips, and one global setting for how matching rules combine.
prev:
  text: Scheduled Payments
  link: /modules/scheduled-payments
next:
  text: Abandoned Booking Recovery
  link: /modules/abandoned-booking-recovery
---

# Dynamic Pricing <span class="pro-pill">PRO</span>

![Yatra → Dynamic Pricing admin — list of rules with type, adjustment, status](/screenshots/modules/dynamic-pricing-list.webp)

Auto-adjust trip prices based on **season**, **time of day**, **demand**, **inventory**, **early bird**, or **last minute** windows. Rules apply to all trips or to specific trips; a global **Rule Priority Mode** decides how several matching rules combine; and each applied rule shows up as a line in the audit log so you can see why a booking ended up at $499 instead of the trip's listed $599.

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
| **Priority**         | Integer, default `0`. Only a **tie-breaker**: when two rules tie for the largest adjustment or the best price, the higher priority wins. How rules combine is set globally — see [How rules combine](#how-rules-combine). |
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

### Apply Pricing On: which trips does this apply to?

| Option             | Notes                                                                  |
| ---                | ---                                                                    |
| **All Trips**      | Rule applies to every trip.                                            |
| **Specific Trips** | Pick the trips. Rule only applies to those.                            |

There is no category or destination scope — to cover a group of trips, pick them under **Specific Trips**.

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
- **Applicable trips** (All trips / specific trips)
- **Priority**
- **Status** (Active / Inactive)

Filters: by rule type, by status. Bulk actions: Activate / Deactivate / Delete permanently.

### Statistics

The Dynamic Pricing dashboard shows:

- Total rules created.
- Rules by type (breakdown chart).
- Adjustments applied this month (count + total value).
- Top-performing rule (most-triggered).

## How rules combine

How several matching rules combine is one **global** setting, not a per-rule switch. Open <span class="screen-path">Yatra → Dynamic Pricing</span> → **Settings** tab:

| Setting | Options / default | What it does |
| --- | --- | --- |
| **Rule Priority Mode** | **Apply Largest Adjustment Only** (default) | Only the matching rule with the largest adjustment (up or down) applies. |
| | **Apply All Matching Rules (Cumulative / Stack)** | Every matching rule applies, one after the other, each on the already-adjusted price. |
| | **Apply Best Price for Customer (Lowest Final)** | Each matching rule is tried on its own; the one that gives the lowest final price applies. |
| **Maximum Price Increase (%)** | default `50` | Hard cap: after the rules, the price can't rise more than this above the base price. |
| **Maximum Price Decrease (%)** | default `30` | Hard cap: after the rules, the price can't drop more than this below the base price. |

The rule's **Priority** only breaks ties in the single-rule modes.

Example: a trip at $499 matches *Summer Early Bird* (−15%) and *Last Minute* (−5%).

| Rule Priority Mode | Result |
| --- | --- |
| Largest Adjustment Only | −15% → $424.15 |
| All Matching Rules | −15% then −5% → $402.94 |
| Best Price for Customer | −15% gives the lower price → $424.15 |

With the default **Maximum Price Decrease** of 30%, the price can never go below $349.30 however many rules apply.

::: tip Test combinations
Use the live preview card in the rule form to check a single rule, then make a test booking to check how several rules combine under your Rule Priority Mode.
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

**A rule doesn't trigger** — check (a) its status is *Active*, (b) the booking actually matches the conditions (date range, scope, etc.), and (c) under *Apply Largest Adjustment Only* or *Best Price for Customer*, another matching rule may have won, and (d) the Maximum Price Increase / Decrease caps may be limiting it.

**Customer is charged more than expected** — open the booking → Payment Summary → look at the Dynamic Pricing line(s). The breakdown shows which rule and which amount.

**Two rules both fire when you wanted only one** — your Rule Priority Mode is *Apply All Matching Rules*. Switch it to *Apply Largest Adjustment Only* (or *Best Price for Customer*) in the Dynamic Pricing **Settings** tab.

**Rule preview shows $0 adjustment** — your trip has no base price set, or the rule's adjustment value is 0. Set both.

## Useful links

- [Bookings → Payment Summary](/booking-settings#_1-booking-overview) — where Dynamic Pricing adjustments appear.
- [Hooks & filters](/hooks-filters) — `yatra_dynamic_pricing_enabled`, `yatra_calculate_demand_scores` (cron action).

## Where to read more

- [All modules](/modules#dynamic-pricing) — module catalog.
- [Trip Builder → Pricing](/trip-creation#_1-3-pricing-✱) — the base price Dynamic Pricing adjusts.
