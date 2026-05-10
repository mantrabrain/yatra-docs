---
title: Abandoned Booking Recovery
description: Email customers who started a booking but never paid — three-step recovery sequence with revenue tracking.
prev:
  text: Scheduled Payments
  link: /modules/scheduled-payments
next:
  text: Custom Landing Pages
  link: /modules/custom-landing-pages
---

# Abandoned Booking Recovery <span class="pro-pill">PRO</span>

![Abandoned Recovery — sessions table with status, last step, recovery revenue](/screenshots/modules/abandoned-recovery.webp)

When a customer starts checkout, enters their email, then leaves without paying, this module sends a **three-step recovery sequence** with a one-click resume link.

## What problem it solves

Travel checkout is high-friction (passport details, traveler counts, gateway redirects). Many bookings are abandoned mid-flow. Without recovery, those customers are gone. With it, ~10–25 % of abandons typically convert.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Abandoned Booking Recovery</span>.
2. New menu item: <span class="screen-path">Yatra → Abandoned Recovery</span>.

## How sessions are detected

Yatra creates a **booking session** the moment a customer reaches the checkout step that asks for their email. If 30 minutes pass without a successful payment, the session is marked **abandoned** and the recovery sequence kicks in.

## The default sequence

Three emails over three days, customisable:

| Step | Delay  | Default subject                                                    |
| ---  | ---    | ---                                                                |
| 1    | +1 hour  | "Did you mean to finish your booking for {{trip_name}}?"          |
| 2    | +1 day   | "Still thinking it over? Your spot for {{trip_name}} is held"     |
| 3    | +3 days  | "Last chance — {{trip_name}} on {{travel_date}} is filling up"   |

Each email contains a **resume link** that pre-fills the cart and skips re-entry.

## Per-trip exclusions

In the Trip Builder → Advanced section, tick **Exclude from recovery emails** to skip recovery for sensitive trips (private bookings, charity events).

## Reporting

The **Recovered revenue** widget on the Abandoned Recovery dashboard shows:

- Total abandons captured (= sessions emailed).
- Total recovered (= sessions that completed payment after a recovery click).
- Recovered revenue this month / quarter.
- Per-step click-through rate.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_abandoned_session_should_recover`          | filter  | Per-session gate; return `false` to skip a session.      |
| `yatra_abandoned_email_subject`                   | filter  | Per-step subject override.                               |
| `yatra_abandoned_session_recovered`               | action  | Fires when an abandoned session converts to a booking.   |
