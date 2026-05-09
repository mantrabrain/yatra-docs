---
title: Departures & availability
description: Configure fixed departure dates, recurring availability rules, traveler categories, and capacity limits for Yatra trips.
---

# Departures & availability

A **departure** is a specific date a trip runs. A **availability rule** is a recurring pattern (e.g. "every Tuesday from March to October"). Together they control which dates a customer can pick at checkout.

## Quick mental model

| You sell                                        | Use this                              |
| ---                                             | ---                                   |
| Open-date trips ("any time you like")           | Just the trip's **availability window** in the Trip Builder. |
| Fixed dates ("Mar 5, Apr 10, May 8")            | **Departures** — one row per date.    |
| Recurring schedules ("every Tue + Thu")         | **Availability rules** — one rule produces many dates. |
| Capped seasonal trips ("only 60 spots in 2026") | **Departures** with capacity, plus the trip's overall capacity. |

## Departures list

Open <span class="screen-path">Yatra → Departures</span>.

Columns: trip, departure date, capacity, booked, available, status (active / archived / cancelled).

Filters: by trip, by date range, by status. Search by trip title.

Click a row to open the departure detail / edit form.

## Add a departure

Click **+ Add New** at the top of the Departures list, or **+ Add Departure** from a trip's Availability section.

Fields:

| Field             | What it does                                                   |
| ---               | ---                                                            |
| **Trip**          | The trip this departure belongs to.                            |
| **Start date**    | The departure date.                                            |
| **End date**      | Optional — for multi-day trips, the return.                    |
| **Capacity**      | Max travelers across all bookings for this departure.          |
| **Status**        | Active, Archived, Cancelled.                                   |
| **Notes**         | Internal notes (only admin sees).                              |

When a departure is full (booked equals capacity), the catalog hides it from the date picker automatically.

## Availability rules (recurring)

For trips that run on a schedule (every Tue + Thu, 1st of every month), use rules instead of creating each date by hand.

Open <span class="screen-path">Yatra → Trips → Availability</span>.

A rule has:

- **Trip** — the trip it applies to.
- **Start date** — when the rule kicks in.
- **End date** — when the rule stops.
- **Days of week** — Mon / Tue / Wed / Thu / Fri / Sat / Sun (multi-select).
- **Capacity** — per generated departure.
- **Skip dates** — exclude blackout dates (holidays, off-season).

When you save the rule, Yatra generates departures behind the scenes for each matching date in the window.

## Capacity rules

Three layers of capacity:

1. **Per-booking** — set as min / max travelers per booking on the trip's **Availability & Booking** section.
2. **Per-departure** — set on the individual departure row.
3. **Per-trip total** — optional cap across all bookings ever (for limited-edition expeditions).

When a customer picks a date, the booking flow checks all three. The first to be exhausted shows "Sold out" or "Date no longer available".

## Booking session

When a customer is in checkout, Yatra creates a temporary **booking session**. The session "holds" the seats for a few minutes (configurable in <span class="screen-path">Settings → Booking</span>) so two parallel bookings can't oversell the same seat.

If the customer abandons checkout, the seats release after the session expires.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Recover abandoned bookings</span>
  </div>
  <p class="pro-callout__desc">When the session expires (or the customer leaves before paying), Yatra Pro can email them a personalized recovery link. Three-step sequence (1 hour / 1 day / 3 days), per-trip exclusions, and reporting on recovered revenue.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock abandoned recovery →</a>
</div>

## Departure detail page

Click any row in the Departures list. The detail page shows:

- Capacity progress bar (booked / total).
- Booking list — every booking that picked this departure.
- Quick actions: **Edit**, **Archive**, **Cancel**, **Duplicate**.

## Cancel a departure

Sometimes you have to cancel a departure (weather, low signups, instructor unavailable):

<ol class="step-list">
  <li>Open the departure → click <strong>Cancel</strong>.</li>
  <li>The system marks it cancelled and prompts you to email affected customers.</li>
  <li>Refund related bookings via <span class="screen-path">Yatra → Bookings</span> → click each booking → <strong>Refund</strong>.</li>
</ol>

(Refunds go through the gateway dashboard first, then mark refunded in Yatra. See [Payments](/payment-settings#refunds) for the full refund workflow.)

## Traveler categories

Departures inherit traveler-category pricing from the trip. To configure adult / child / infant / senior labels and pricing, see <span class="screen-path">Yatra → Traveler Categories</span>.

## Travelers list

Open <span class="screen-path">Yatra → Travelers</span> for a roster-style view of every traveler across all bookings. Useful for departure manifests:

- Filter by trip and date.
- Export the manifest (CSV).
- Click a traveler row for their full booking + emergency contact info.

## Departure status flow

```
Active → Archived  (manually, after past)
Active → Cancelled (manually, with email + refund step)
Archived stays archived until you delete it
```

Cancelled departures stay in the database for reporting. Archived departures keep their bookings visible but hide from the date picker.

## Tips

- **Archive past departures monthly.** A long active list slows down the date picker.
- **Use availability rules for "almost every weekday"** with skip dates for holidays — much easier than 250 individual departures.
- **Cap each departure separately.** Even if your trip has unlimited overall capacity, set per-departure caps to avoid overbooking small groups.
- **Cancel-with-notice.** Always pair "cancel departure" with a clear customer email — Yatra prompts you, but the email content is yours to write.

## Where to go next

- [Bookings & customers](/booking-settings) — what happens after a customer picks a date.
- [Payments](/payment-settings) — money flow.
- [Pro modules](/third-party-integrations) — abandoned recovery, Google Calendar, dynamic pricing.
