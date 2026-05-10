---
title: Advanced Discount
description: Group, early-bird, last-minute, and category-based discount rules beyond simple coupon codes.
prev:
  text: Dynamic Form Field
  link: /modules/dynamic-form-field
next:
  text: Mailchimp
  link: /modules/mailchimp
---

# Advanced Discount <span class="pro-pill">PRO</span>

Adds **rule-based discounts** that apply automatically — no coupon code required. Group discounts ("3+ travelers get 10 % off"), early-bird ("book 60 days ahead, save 15 %"), last-minute fillers, traveler-category discounts (kids 50 %), and discount stacking control.

## What problem it solves

The free [Discounts](/booking-settings#discounts-coupons) feature handles coupon codes well, but applying rules across the whole catalog without a code (group / early-bird / kids' pricing) doesn't fit a coupon model. Advanced Discount adds the rule engine.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Advanced Discount</span>.
2. The **Yatra → Discounts** screen gains a **Rules** tab alongside the existing **Coupons** tab.

## Create a rule

1. Open <span class="screen-path">Yatra → Discounts → Rules → + Add rule</span>.
2. Configure:
   - **Name** + internal description.
   - **Trigger** — group size threshold, booking-window window (early-bird / last-minute), traveler-category, or "all bookings".
   - **Adjustment** — `-12 %`, `-$50`, etc.
   - **Applicable trips** — all / specific / by destination / by category.
   - **Stack with other discounts** — Yes / No (when off, this rule wins or loses based on priority).
   - **Validity window** — start / end dates.
3. **Save & activate**.

## How it appears at checkout

The booking summary itemises each rule that fired ("Group discount −10 %", "Early-bird −$25") so customers see exactly why the price dropped. This drives conversion by making savings visible.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_advanced_discount_enabled`                 | filter  | Per-trip toggle.                                         |
| `yatra_calculate_group_discount`                  | filter  | Override the group-size discount math.                   |
| `yatra_calculate_coupon_discount`                 | filter  | Override coupon-discount math (when stacking with Advanced rules). |
