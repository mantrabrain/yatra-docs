---
title: Dynamic Pricing
description: Demand-, season-, and last-minute-based price adjustments without editing each trip by hand.
prev:
  text: Email Automation
  link: /modules/email-automation
next:
  text: Flexible Payments
  link: /modules/flexible-payments
---

# Dynamic Pricing <span class="pro-pill">PRO</span>

![Dynamic Pricing — pricing rules with adjustment, applicable trips, status](/screenshots/modules/dynamic-pricing.webp)

Apply percentage / fixed-amount price adjustments by **trip**, **season**, **booking window**, **group size**, or **traveler category** — all centrally managed without touching individual trips.

## What problem it solves

Hand-editing peak / off-peak prices on every trip is slow and error-prone. Dynamic Pricing applies rules at price-calculation time, so one rule (e.g. "+15 % during Christmas week") covers your whole catalog. Customers see the adjusted price in listings, on the trip page, and at checkout — fully transparent.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Dynamic Pricing</span>.
2. New menu item: <span class="screen-path">Yatra → Dynamic Pricing</span>.

## Create a rule

1. Open <span class="screen-path">Yatra → Dynamic Pricing → + Create Rule</span>.
2. Fill in:
   - **Name** (e.g. "Christmas surcharge").
   - **Adjustment** — `+12 %`, `-$50`, `+$25`. Positive = surcharge, negative = discount.
   - **Applicable to** — All trips / specific trips / by destination / by category.
   - **Triggers** (combine freely):
     - Date range (Christmas, peak season).
     - Day of week (weekends).
     - Booking window (Last-minute < 7 days; early-bird > 60 days).
     - Group size (≥ 6 travelers).
     - Traveler category (kids 50 % off).
   - **Priority** — when multiple rules match, lower priority numbers apply first.
   - **Status** — Active / Inactive.

## Analytics

The **Analytics** tab shows revenue impact per rule for the current and previous quarter — uplift from surcharges, discount cost from drops, net effect. Useful for justifying changes to stakeholders.

## How it appears to customers

Adjusted prices are shown in trip listings, on the trip page, and on the date picker. The booking summary itemises the base price + each applied adjustment so customers see the math.

## Hooks

| Hook                                                  | Type    | Purpose                                                  |
| ---                                                   | ---     | ---                                                      |
| `yatra_dynamic_pricing_enabled`                       | filter  | Per-trip toggle (return `false` to opt a trip out).      |
| `yatra_get_dynamic_pricing_display_settings`          | filter  | Customise how surcharges / discounts render.             |
| `yatra_calculate_demand_scores`                       | action  | Override the demand-score calculation that drives auto-pricing. |
| `yatra_price_breakdown`                               | filter  | Final breakdown shown on the booking summary.            |
