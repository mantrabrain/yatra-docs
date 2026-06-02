---
title: Departures
description: Manage scheduled departures from the Yatra Departures admin — the list page, the Add Departure form, status filters, the Travelers roster, and cancel / refund flow.
prev:
  text: Availability — three-layer system
  link: /availability
next:
  text: Bookings & customers
  link: /booking-settings
---

# Departures

A **departure** is one scheduled run of a trip — a date (and optionally a time) with its own capacity and an optional price override. The Departures admin is the operator's day-to-day view: who's booked on what date, which dates are filling up, what's coming up next week.

::: tip Departures vs Availability
Departures and the [Availability](/availability) system are connected but not the same thing:

- **Availability** is the *rule engine* (manual dates, recurring rules, trip default) that decides which dates appear on the customer's date picker.
- **Departures** is the *operator view* of every scheduled run — a flat list across all trips, filterable by status, with quick links to the bookings on each departure.

You don't have to manage both. If you're using Availability Dates / Rules per trip, the Departures page auto-shows them.
:::

---

## The Departures list

![Yatra Departures listing — status filter pills, columns, search](/screenshots/departures/departures-list.webp)

Open <span class="screen-path">Yatra → Departures</span>.

### Status filter pills

Five statuses + *All*, with live counts beside each label:

| Pill          | What's in it                                                                  |
| ---           | ---                                                                           |
| **All**       | Everything except trash.                                                      |
| **Upcoming**  | Departures whose date is today or later, with at least one seat available.    |
| **Full**      | Departures where booked count equals max capacity.                            |
| **Past**      | Departures whose date is in the past.                                         |
| **Cancelled** | Manually cancelled departures (kept for reporting + refund auditing).         |
| **Trash**     | Soft-deleted rows. Restore or permanently delete from here.                   |

::: warning The old "Active / Archived" wording
Earlier doc revisions described departure statuses as *Active / Archived / Cancelled*. The current admin uses *Upcoming / Full / Past / Cancelled / Trash* — they're auto-computed from the date and the booked-count, not a manual field.
:::

### Search

Search matches **trip title** and free-text in the **notes** field.

### Column visibility

Toggle which columns appear via the column picker; choices are saved per-browser to `localStorage` under `yatra_departures_visible_columns`. Available columns:

- **Trip** — title + small chips for destination / activity / categories.
- **Date** — formatted, with the day of week.
- **Time** — only shown for departures that have one set.
- **Max capacity** — total seats.
- **Booked** — confirmed bookings on this departure.
- **Available** — `capacity − booked` (or "—" for cancelled).
- **Price override** — shown when set; falls back to the trip's normal price otherwise.
- **Status** — coloured badge.
- **Created** — when the row was added.

### Bulk actions

Tick rows and pick:

| Status view | Available actions                                                                |
| ---         | ---                                                                              |
| Default     | Cancel, Move to Trash, Delete permanently                                       |
| Trash       | Restore, Delete permanently                                                      |

---

## Add a departure

Open the Departures list and click **+ Add Departure**, or jump to a specific trip → Availability tab → **+ Add Date**. Both lead to the same form, with the **Trip** field pre-filled when launched from a trip.

![Add Departure form — date, time, capacity, price override, notes](/screenshots/departures/departure-form.webp)

| Field                  | Required | Notes                                                                                                            |
| ---                    | :-:      | ---                                                                                                              |
| **Departure Date**     | ✅       | The day the trip actually runs. Date picker disallows past dates by default.                                     |
| **Departure Time**     | —        | Time picker. Only set this when the trip has multiple departure times on the same date (e.g. a day-tour with morning + afternoon slots). |
| **Max Capacity**       | ✅       | Total seats for this specific departure. Independent from the trip's overall *Max Travelers*.                    |
| **Price Override**     | —        | Currency amount. When set, overrides the trip's regular price for this date only. Useful for holiday surcharges or flash sales. |
| **Notes**              | —        | Internal-only — never shown to customers. Useful for "Lead guide: Sarah" or "Bus contracted from XYZ rentals".  |

When you save, the departure becomes part of [Availability Layer 1 (Manual Dates)](/availability#layer-1-manual-availability-dates-the-override) — it overrides any recurring rule that covers the same date.

::: tip Why no Trip dropdown?
The Add Departure form takes the trip from the URL (`?trip_id=…`). To create a departure across multiple trips, repeat the form for each one. Or set up a [Recurring Rule](/availability#layer-2-recurring-availability-rules) per trip if the schedule is regular.
:::

---

## The departure detail page

Click any row in the Departures list (or go to <span class="screen-path">action=view&id=…</span>).

### Top — quick stats

A three-tile summary card:

- **Booked** — number of confirmed bookings.
- **Available** — remaining seats.
- **Capacity** — the total.

When booked == capacity the **Full** badge is shown next to the date.

### Bookings on this departure

Inline table of every booking that picked this departure:

- Booking number (links to the [booking detail page](/booking-settings#booking-detail-page)).
- Customer name + email.
- Travelers count.
- Total amount.
- Status badge.

Use this view to see who's coming on a specific date, or to bulk-email customers from one departure.

### Notes & metadata

- The internal notes you typed on the form.
- Created / last-updated timestamps.

### Quick actions

Top-right:

- **Edit** — same form as Add Departure.
- **Duplicate** — copy date, capacity, price override into a new row (you pick a new date).
- **Cancel** — flips status to *Cancelled*, hides from the public date picker, and prompts you to refund the affected bookings.
- **Move to Trash** — soft delete. Restore from the Trash filter.

---

## Cancel a departure

When a departure has to be cancelled (weather, low signup, instructor unavailable):

<ol class="step-list">
  <li>Open the departure → click <strong>Cancel</strong>.</li>
  <li>Confirm the cancellation in the prompt.</li>
  <li>Yatra hides the departure from the public date picker immediately and flags every booking on it as <em>affected</em>.</li>
  <li>For each affected booking — open it, refund through the gateway dashboard, then mark <strong>Refunded</strong> in Yatra. See <a href="/payment-settings#refunds">Payments → Refunds</a>.</li>
  <li>Email the customers — Yatra doesn't auto-send a cancellation email; write yours manually (or set up the <strong>Booking Cancelled</strong> template under <a href="/email-settings#booking-lifecycle-customer">Email → Templates</a> to fire on the status change).</li>
</ol>

::: warning Cancellation doesn't auto-refund
Yatra never calls the gateway refund API on your behalf — refunds always start from the gateway dashboard so the operator stays in control of timing and fees. Mark refunded in Yatra only after the gateway confirms it.
:::

---

## The Travelers roster

![Travelers admin — every traveler across every booking, filterable](/screenshots/departures/travelers-list.webp)

Open <span class="screen-path">Yatra → Travelers</span>. This is the operations / manifest view — every individual traveler across every booking, on every departure.

Useful for:

- **Pre-trip manifests** — filter to next Saturday's departure, export the list.
- **Emergency contact lookups** — every traveler's emergency contact is visible inline.
- **Diet / accessibility prep** — custom traveler fields (from the [Booking Form Builder](/settings#_4-booking-form)) are shown as columns.

Filters: by trip, by departure date, by status. The export button writes a CSV with the visible columns.

---

## Capacity — how the three caps interact

When a customer submits a booking, Yatra checks **three** capacity caps in order. The first one to be exhausted blocks the booking with a "Sold out" message:

1. **Per-booking cap** — the trip's *Min / Max Travelers* fields (Trip Builder → Availability & Booking). Limits how many travelers one customer can put on one booking.
2. **Per-departure cap** — the *Max Capacity* on the individual departure (or rule-generated equivalent).
3. **Per-trip total cap** — optional cap across *all* bookings ever for the trip, for limited-edition expeditions. Set under Trip Builder → Availability & Booking.

If the customer keeps the booking page open and somebody else fills the departure first, the create-booking API revalidates at submit time and surfaces a friendly "this date just sold out — pick another" message.

### Booking session holds

While a customer is in checkout, Yatra holds their seats with a temporary **booking session** (configurable: <span class="screen-path">Settings → Booking → Booking Expiry (hours)</span>, default 24h). Holds release automatically if the customer abandons checkout.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Recover abandoned bookings</span>
  </div>
  <p class="pro-callout__desc">When the session expires (or the customer leaves before paying), Yatra Pro can email them a personalized recovery link. Three-step sequence (1 hour / 1 day / 3 days), per-trip exclusions, and reporting on recovered revenue.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock abandoned recovery →</a>
</div>

---

## Operating tips

- **Use rules, not hand-rolled departures, for regular schedules.** A "Saturdays + Sundays, May–Sep" trip with manually-created Departures becomes 40 rows to maintain. One [Recurring Rule](/availability#layer-2-recurring-availability-rules) does the same thing and is easier to edit.
- **Use individual Departures (or manual Availability Dates) for special cases.** A specific Saturday with a price surcharge, a custom guide, or a different start time — that's exactly what the per-departure form is for.
- **Cap each departure separately, even on flexible trips.** A trip-wide cap protects against runaway bookings; per-departure caps protect against overbooking a small group.
- **Move Past departures to Trash monthly.** A long Upcoming/Past list slows the date picker.
- **Cancel-with-notice.** Always pair "Cancel departure" with a clear customer email and a refund. Yatra prompts you but the email content is yours to write.

---

## Where to go next

- [Availability — three-layer system](/availability) — the priority order between manual dates, recurring rules, and the trip default.
- [Bookings & customers](/booking-settings) — what happens after a customer picks a departure.
- [Payments](/payment-settings) — gateways and the refund workflow when cancelling departures.
- [Modules → Abandoned Booking Recovery](/modules/abandoned-booking-recovery) — auto-email customers who left checkout without paying.
