---
title: Abandoned Booking Recovery
description: Step-by-step setup for the Yatra Pro Abandoned Booking Recovery module — three-step automated email sequence with personalised recovery links and recovered-revenue reporting.
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

![Abandoned Recovery settings — enable, send delays, discount codes](/screenshots/modules/abandoned-recovery-settings.webp)

| Setting                          | Default     | Notes                                                                                                                  |
| ---                              | ---         | ---                                                                                                                    |
| **Enable recovery emails**       | off         | Master toggle.                                                                                                         |
| **First email — send after**     | `1 hour`    | Delay after abandonment for the first reminder.                                                                        |
| **Second email — send after**    | `1 day`     | Delay after abandonment for the second reminder.                                                                       |
| **Final email — send after**     | `3 days`    | Delay after abandonment for the final reminder.                                                                        |
| **Discount code (optional)**     | (empty)     | A promo code to attach to one of the reminder emails for an extra incentive. Created on the [Discounts](/booking-settings#discounts-coupons) page.  |
| **Discount applies to**          | Final only  | Which of the three emails carries the discount.                                                                        |
| **Auto-expire after (days)**     | `7`         | Stop sending reminders after this many days; mark the abandoned record as *Expired*.                                  |
| **Track in reports**             | on          | Tag recovered bookings so they show in the Recovery Stats card.                                                       |

## Step 3 — Customise the three email templates

The module ships with three default templates — open <span class="screen-path">Yatra → Email → Templates</span> and look for:

- **Abandoned Recovery — 1h reminder** (`abandoned_booking_recovery_first`)
- **Abandoned Recovery — 1d reminder** (`abandoned_booking_recovery_second`)
- **Abandoned Recovery — 3d final** (`abandoned_booking_recovery_final`)

Each is editable like any other template — subject, body HTML, sender override. They support all the standard merge tags plus a special `{{recovery_link}}` tag that resolves to the customer's saved-checkout URL.

::: tip Recovery link details
The `{{recovery_link}}` URL contains a short-lived token that rehydrates the customer's prior cart state — selected trip, traveler counts, picked date, custom-field answers. They land back on the payment step, not the start.
:::

## Step 4 — Verify with a test abandonment

1. In a private browser window, start a booking on any trip.
2. Fill in customer details, reach the **Payment** step.
3. Close the browser tab **without paying**.
4. In the admin, open <span class="screen-path">Yatra → Abandoned Recovery</span>.
5. Your test session should appear with status **Abandoned**.
6. Wait for the first-email delay (or manually trigger via the *Send first email now* action on the row).
7. Email arrives → click the recovery link → land back in the payment step → complete payment.
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
| **Expired**  | Past the `auto_expire_after` window with no recovery.                    |

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
                          1 day later: Second email
                                       ↓
                          3 days later: Final email (with discount code)
                                       ↓
                       7 days later: Auto-expire if not recovered
```

If at any point the customer pays — via the recovery link OR directly — Yatra cancels the remaining emails and flips the row to **Recovered**.

## Troubleshooting

**No abandoned rows showing up** — confirm the module is enabled AND the recovery settings have **Enable recovery emails** turned on. Yatra only starts tracking sessions after the toggle is on.

**Emails not sending** — first test ordinary booking emails work. The recovery system uses the same SMTP path; if booking confirmations don't arrive, recovery emails won't either. See [Email & notifications](/email-settings).

**Recovery links land on the trip page, not the payment step** — the saved session expired. Sessions are valid for the `auto_expire_after` window. Increase it if your traffic profile needs longer.

**Discount code in the email shows the literal `{{discount_code}}`** — the `Discount code` field in Step 2 is empty. Add a code and pick which email carries it.

**Recovered count looks too high / low** — make sure *Track in reports* is on. Bookings completed without going through the recovery link aren't counted as recovered.

## Useful links

- [Email & notifications](/email-settings) — customise the three template bodies.
- [Discounts](/booking-settings#discounts-coupons) — create the discount code attached to the final email.
- [Hooks & filters](/hooks-filters) — `yatra_abandoned_booking_recovered`, `yatra_abandoned_email_sent`.

## Where to read more

- [All modules](/modules#abandoned-booking-recovery) — module catalog.
