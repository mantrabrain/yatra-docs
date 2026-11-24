---
title: Abandoned Booking Recovery
description: Step-by-step setup for the Yatra Pro Abandoned Booking Recovery module — three reminder emails (1 h / 24 h / 48 h by default) with recovery links that reopen the trip with the booking form pre-filled and recovered-revenue reporting.
prev:
  text: Scheduled Payments
  link: /modules/scheduled-payments
next:
  text: Custom Landing Pages
  link: /modules/custom-landing-pages
---

# Abandoned Booking Recovery <span class="pro-pill">PRO</span>

![Yatra → Abandoned Recovery admin — list of abandoned bookings, settings, stats](/screenshots/modules/abandoned-recovery-list.webp)

When a customer starts a booking but doesn't pay, Yatra tracks the session and (with this module on) emails them up to three personalised "complete your booking" reminders — each with a one-click link back to the saved checkout. Recovered bookings are tagged and reported separately so you can see real revenue impact.

## What you'll need

| Thing                                | Where to get it                                                                       |
| ---                                  | ---                                                                                   |
| Yatra Pro license                    | <span class="screen-path">Yatra → License</span>                                     |
| Abandoned Booking Recovery enabled   | <span class="screen-path">Yatra → Modules → Abandoned Booking Recovery</span>        |
| Working transactional email          | Your SMTP / ESP must be sending properly — test from <span class="screen-path">Yatra → Email</span> first |
| At least one published trip          | Recovery only triggers when the customer started a real booking flow                 |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Abandoned Booking Recovery** → toggle on.
3. A new menu item appears: <span class="screen-path">Yatra → Abandoned Recovery</span>.

## Step 2 — Configure recovery settings

Open <span class="screen-path">Yatra → Abandoned Recovery → Settings</span>.

![Abandoned Recovery settings — tracking and email delays](/screenshots/modules/abandoned-recovery-settings.webp)

| Setting                          | Default     | Notes                                                                                                                  |
| ---                              | ---         | ---                                                                                                                    |
| **Enable Tracking**              | on          | Track when customers abandon the booking process.                                                                      |
| **First Email Delay (hours)**    | `1`         | Hours after abandonment before the first reminder.                                                                     |
| **Second Email Delay (hours)**   | `24`        | Hours after abandonment before the second reminder.                                                                    |
| **Final Email Delay (hours)**    | `48`        | Hours after abandonment before the final reminder.                                                                     |

There are no discount fields — the reminders don't attach a coupon. If you want to offer one, write the code into the email template yourself (create it under [Discounts](/booking-settings#discounts-coupons)).

An abandoned record **expires after 30 days** if it isn't recovered (developers: `yatra_abandoned_booking_expiration_days` filter).

## Step 3 — Customise the three email templates

The module ships with three default templates — open <span class="screen-path">Yatra → Email → Templates</span> and look for:

- **Abandoned booking recovery (First)** (`abandoned_booking_recovery_first`, 1 h by default)
- **Abandoned booking recovery (Second)** (`abandoned_booking_recovery_second`, 24 h by default)
- **Abandoned booking recovery (Final)** (`abandoned_booking_recovery_final`, 48 h by default)

Each is editable like any other template — subject, body HTML, sender override. They support all the standard merge tags plus a special `{{recovery_link}}` tag that resolves to the customer's saved-checkout URL.

::: tip Recovery link details
The `{{recovery_link}}` URL opens the **trip page** with a token; the customer's booking form is then **pre-filled** with what they entered before (contact details and form answers), so they don't start again from an empty form.
:::

## Step 4 — Verify with a test abandonment

1. In a private browser window, start a booking on any trip.
2. Fill in customer details, reach the **Payment** step.
3. Close the browser tab **without paying**.
4. In the admin, open <span class="screen-path">Yatra → Abandoned Recovery</span>.
5. Your test session should appear with status **Abandoned**.
6. Wait for the first-email delay (or use **Send Recovery Email** on the row).
7. Email arrives → click the recovery link → the trip page opens and the booking form is pre-filled → complete the booking.
8. The row flips to **Recovered**. Reporting updates.

## The Abandoned Recovery admin

![Abandoned Recovery list — status filters, customer, trip, value, time elapsed](/screenshots/modules/abandoned-recovery-list.webp)

### Status filter pills

| Pill         | What's in it                                                              |
| ---          | ---                                                                       |
| **All**      | Everything across all states.                                             |
| **Abandoned** | Open carts that haven't received any recovery emails yet.                |
| **Contacted** | At least one recovery email has been sent.                              |
| **Recovered** | Customer came back and completed the booking.                           |
| **Expired**  | 30 days passed with no recovery.                                         |

### Default columns

- **Customer** (name + email captured before abandonment)
- **Trip** (with travel date if set)
- **Value** (estimated booking total)
- **Emails sent** (0–3, with timestamps on hover)
- **Status**
- **Time elapsed** (since abandonment)

### Per-row actions

- **Send recovery email now** (skips the delay)
- **View timeline** (every email send + open + click event)
- **Mark expired** (stops the sequence)
- **Delete**

### Recovery Stats card

Top of the page, four tiles:

- **Total abandoned** in the period
- **Total recovered**
- **Recovery rate** (% of contacted)
- **Recovered revenue** (sum of completed bookings tagged as recovered)

## How the recovery flow works

```
Customer adds trip + clicks Continue → Yatra creates abandoned_booking row
                                       ↓
                          1 hour later: First email
                                       ↓
                          24 hours later: Second email
                                       ↓
                          48 hours later: Final email
                                       ↓
                       30 days later: Expires if not recovered
```

If at any point the customer pays — via the recovery link OR directly — Yatra cancels the remaining emails and flips the row to **Recovered**.

## Troubleshooting

**No abandoned rows showing up** — confirm the module is enabled AND **Enable Tracking** is on. Yatra only starts tracking sessions after that.

**Emails not sending** — first test ordinary booking emails work. The recovery system uses the same SMTP path; if booking confirmations don't arrive, recovery emails won't either. See [Email & notifications](/email-settings).

**Recovery link opens an empty form** — the abandoned record has expired (after 30 days) or was already recovered.

**Recovered count looks too high / low** — bookings completed without going through the recovery link aren't counted as recovered.

## Useful links

- [Email & notifications](/email-settings) — customise the three template bodies.
- [Discounts](/booking-settings#discounts-coupons) — create a code if you want to mention one in a reminder.
- [Hooks & filters](/hooks-filters) — `yatra_abandoned_recovery_min_gap_hours`, `yatra_abandoned_booking_expiration_days`.

## Where to read more

- [All modules](/modules#abandoned-booking-recovery) — module catalog.
