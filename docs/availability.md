---
title: Availability — three-layer system
description: Yatra's three layers of availability — Manual Availability Dates, Recurring Availability Rules, and the Trip Builder default — explained end-to-end. Setup, priority, and what the customer sees on the public booking page.
prev:
  text: Create a trip
  link: /trip-creation
next:
  text: Departures
  link: /departures
---

# Availability — three-layer system

Yatra has **three layers** that decide whether a trip is bookable on a given date and what the customer sees on the booking calendar:

| # | Layer                                  | Priority   | Where it's configured                                                                              |
| - | ---                                    | ---        | ---                                                                                                |
| 1 | **Manual Availability Dates**          | 🥇 Highest | <span class="screen-path">Yatra → Trips → [trip] → Availability</span> → *Add Date*                |
| 2 | **Recurring Availability Rules**       | 🥈 Middle  | <span class="screen-path">Yatra → Trips → [trip] → Availability</span> → *Rules* tab               |
| 3 | **Trip Builder default**               | 🥉 Lowest  | <span class="screen-path">Trip Builder → Availability & Booking</span> section                     |

::: tip How the priority is enforced
A specific manual date **always** wins over any recurring rule that covers the same day. A recurring rule **always** wins over the trip default. This is what makes "sold out" badges, seat counts, and one-off price overrides work the way you expect — admin actions trump anything that was generated automatically.
:::

---

## What each layer is for

### Layer 3 — Trip Builder default (the baseline)

**When you'd use it:** simple flexible-booking trips ("Bookable any day from 2026-03-01 to 2026-12-31, capped at 10 travelers per booking") where you don't need per-date control.

**What it sets:**

| Field                            | Where it lives                                                                                   |
| ---                              | ---                                                                                              |
| **Available From / To**          | Trip Builder → Availability & Booking → Availability Period                                      |
| **Booking Window (days)**        | Same section                                                                                     |
| **Minimum / Maximum Travelers**  | Trip Builder → Availability & Booking → Capacity & Travelers                                     |
| **Departure Time / Time Slots**  | Same section, varies by Single-day vs Multi-day trip type                                        |

The Trip Builder default is what fires when no Availability Date and no Recurring Rule cover the date the customer picks. It's the **"flexible booking"** mode — Yatra generates synthetic availability for every day in the trip's *Available From → Available To* window.

Field reference: [Create a trip → 1.4 Availability & Booking](/trip-creation#_1-4-availability-booking).

---

### Layer 2 — Recurring Availability Rules

**When you'd use it:** trips that run on a regular pattern ("Every Saturday and Sunday from May to September", "Daily, July through August", "First Monday of every month"). Rules generate dates automatically — you set the pattern once and Yatra fills the calendar for the next year.

**Form fields** (from `DepartureRecurringRuleForm.tsx`):

| Field                | Type                                                    | Notes                                                                                                                                 |
| ---                  | ---                                                     | ---                                                                                                                                   |
| **Recurrence type**  | enum: `daily` / `weekly` / `monthly` / `custom_days`    | The cadence pattern.                                                                                                                  |
| **Weekdays**         | multi-select (Sun–Sat)                                  | Shown when *Recurrence type = weekly* or `custom_days`. 0 = Sunday … 6 = Saturday.                                                    |
| **Start date**       | date                                                    | First date the rule produces.                                                                                                         |
| **End date**         | date                                                    | Last date — leave blank for "indefinite".                                                                                             |
| **Max capacity**     | number                                                  | Seats available **per generated date**. Default: same as trip max travelers.                                                          |
| **Base price**       | number                                                  | Optional override per generated date. Falls back to the trip's pricing.                                                               |
| **Active**           | toggle                                                  | Off = the rule stops generating new dates (existing manually-overridden rows survive).                                                |

Behind the scenes, rules are stored in `wp_yatra_new_trip_availability_rules`. The resolver materialises them on-the-fly — there's no physical row in the *Availability Dates* table until somebody books or you click *Convert to manual date*.

---

### Layer 1 — Manual Availability Dates (the override)

**When you'd use it:** any time you need *per-date* control — block a specific Saturday for a private event, increase the seat count for a holiday surge, mark the trip *sold out* before all seats are booked, or apply a one-off price for a flash sale.

**Form fields** (from `AvailabilityForm.tsx`):

| Field                          | Type                | Notes                                                                                                              |
| ---                            | ---                 | ---                                                                                                                |
| **Departure Date**             | date                | Required. The actual day the trip runs.                                                                            |
| **Departure Time**             | time (optional)     | Required only for day-tour trips with multiple time slots (so you can override one slot but not the others).       |
| **Arrival Date / Arrival Time** | date + time         | Optional — used for multi-day trips when the end date isn't `start + duration`.                                    |
| **Status**                     | select              | `available` / `sold_out` / `blocked` (cancelled). *Sold out* hides the date from the customer's calendar.          |
| **Max capacity**               | number              | Seat count for this specific date. Defaults to the trip's max travelers.                                           |
| **Booked count**               | number (read-only)  | How many seats are already booked. Capacity − booked = seats remaining.                                            |
| **Price override**             | currency            | Optional — bypasses the trip's regular price for this date.                                                        |
| **Per-traveler-category prices** | repeater            | Optional — bypasses the trip's traveler-based pricing matrix for this date.                                        |
| **Starting / Ending location** | location pickers    | Optional — useful when a specific departure leaves from a different point.                                         |
| **Notes**                      | textarea            | Internal-only.                                                                                                     |

A Manual Availability Date wins over any rule that covers the same day. This is how you say "for *this* specific Saturday, the price is $799 instead of $499, capacity is 6 instead of 10, and there's only one departure at 9 AM."

---

## The priority order — worked example

Let's take a single trip (*Sunrise Hike*) configured like this:

- **Trip Builder default:** Available 2026-01-01 → 2026-12-31, max travelers 10, default time 06:00.
- **Recurring Rule R1:** Daily, 2026-04-01 → 2026-10-31, max capacity 8, base price $89.
- **Recurring Rule R2:** Weekly Saturdays only, 2026-04-01 → 2026-10-31, max capacity 12, base price $119 (the "premium weekend" rule).
- **Manual Availability Dates:**
  - 2026-06-21 (Sat) — status `sold_out`, capacity 12.
  - 2026-07-04 (Sat) — capacity 20, price $149 (4th of July flash).
  - 2026-12-25 (Fri) — status `blocked` (closed for Christmas).

What the customer sees when picking dates:

| Customer picks   | Layer that wins             | What the customer sees                                                                                      |
| ---              | ---                         | ---                                                                                                         |
| 2026-03-15 (Sun) | **Trip default**            | Bookable, $89 (trip price), 10 seats. Falls outside both recurring rules → uses the trip default.           |
| 2026-05-10 (Sun) | **Rule R1** (daily)         | Bookable, $89, 8 seats. R1 covers this day; R2 only covers Saturdays.                                       |
| 2026-05-09 (Sat) | **Rule R2** (Sat-only)      | Bookable, $119, 12 seats. R2 is more specific than R1, so it wins. *(Within rules, the more-specific pattern wins.)* |
| 2026-06-21 (Sat) | **Manual Date** (sold_out)  | Date is hidden / disabled on the calendar with a "Sold out" badge.                                          |
| 2026-07-04 (Sat) | **Manual Date** (override)  | Bookable, $149, 20 seats. Manual override beats R2 even though R2 has a Saturday rule for the same date.    |
| 2026-12-25 (Fri) | **Manual Date** (blocked)   | Hidden completely from the calendar (the date doesn't render at all).                                       |
| 2027-01-15       | *Nothing*                   | Not bookable — falls outside the trip's Available From → Available To window.                               |

::: warning "Rule beats rule" is rare
Within the recurring rules layer, the resolver picks the *first* matching rule. If two rules overlap on the same date with no specific time, behaviour is undefined — clean up overlapping rules. Use **time slots** if you need multiple departures on the same date.
:::

---

## Step-by-step: setting up each layer

### Step 1 — Set the Trip Builder default

This is the always-present fallback.

1. Open <span class="screen-path">Yatra → Trips</span> → click your trip → **Trip Builder**.
2. Click **Availability & Booking** in the sidebar.
3. Set **Available From** and **Available To** to your booking window (e.g. `2026-04-01` → `2026-10-31`).
4. Set **Minimum / Maximum Travelers**.
5. For single-day trips, pick a **Default Departure Time** OR enable **Multiple Time Slots** for a repeater of `{ time, label }` rows.
6. Save.

![Trip Builder → Availability & Booking — the default fallback layer](/screenshots/availability/trip-builder-availability.webp)

At this point the trip is bookable on **every day** in your range. Layers 2 and 3 below let you carve it up.

### Step 2 — (Optional) Add Recurring Rules

1. Open <span class="screen-path">Yatra → Trips → [your trip] → Availability</span> tab.
2. Click the **Rules** sub-tab.
3. Click **+ Add Rule**.
4. Fill in:
   - **Recurrence type** → start with *weekly* for "every Saturday and Sunday" trips.
   - **Weekdays** → pick the days that match.
   - **Start / End date** → bounding window. Leave End blank for "forever".
   - **Max capacity** → seats per generated date. Often differs from the trip's general cap.
   - **Base price** → optional per-rule override.
   - **Active** → leave on.
5. Save. A preview calendar on the right shows you the next 90 days the rule will produce.

![Recurring Rule form — recurrence type, weekdays, capacity, price](/screenshots/availability/recurring-rule-form.webp)

Repeat for multiple patterns ("daily May–Sep", "Saturdays only for premium weekends", etc.).

### Step 3 — (Optional) Add Manual Availability Dates

Use this for one-off overrides — block a date, change a single date's capacity / price, mark sold-out manually.

1. Same place: <span class="screen-path">Yatra → Trips → [trip] → Availability</span>, **Dates** sub-tab.
2. Click **+ Add Date**.
3. Fill in:
   - **Departure date** (and time, for day tours).
   - **Status** — `available`, `sold_out`, or `blocked`.
   - **Max capacity** — defaults to the trip max, override here.
   - **Price override** — optional.
   - **Per-traveler-category prices** — optional, only when the trip uses traveler-based pricing.
   - **Notes** — internal only.
4. Save.

![Manual Availability Date form — status, capacity, price override, locations](/screenshots/availability/manual-date-form.webp)

The new date immediately overrides any rule that covered it.

::: tip "Convert rule date to manual"
On the Availability calendar, each rule-generated date has a *Convert to manual* action — it materialises the date as a manual row so you can override capacity / price / status individually without disabling the rule.
:::

---

## How it shows up to the customer

![Public booking calendar — customer side](/screenshots/availability/customer-calendar.webp)

When a customer opens the trip page and clicks **Book Now**, Yatra calls `AvailabilityResolutionService::getAllAvailabilityDates()` for the next N months (configurable; default 12) and the result powers the date picker:

- **Available date** — clickable, shows "X seats left" subtitle, base price visible.
- **Sold-out date** — disabled with a "Sold out" badge.
- **Blocked date** — hidden completely (no chip rendered).
- **Date with a price override** — clickable, with the override price shown in place of the regular one.

After the customer picks a date, the **traveler-count step** uses *that date's* capacity number (manual override > rule capacity > trip max). And the **price summary** at the bottom uses *that date's* price (manual override > rule base price > trip price).

![Customer date picker → traveler step → price summary, all driven by the resolved availability](/screenshots/availability/customer-pricing-summary.webp)

If a customer keeps the booking page open and an admin marks the date sold out, the **booking-create** API revalidates capacity at submit time and will fail with `availability_sold_out` if seats have run out — the customer sees a friendly "Sorry — this date just sold out" message and is prompted to pick another date.

---

## When to use which layer — a cheat sheet

| You want to…                                                | Use this layer                       |
| ---                                                         | ---                                  |
| Make a brand-new trip bookable for the whole season         | Trip Builder default (Step 1)        |
| Run a trip every weekend in summer                          | Recurring Rule (Step 2)              |
| Run a trip every day in July + August                       | Recurring Rule (`daily` recurrence) |
| Sell out a specific Saturday manually before it fills       | Manual Date with `status=sold_out`   |
| Add 2 extra seats for a holiday surge                       | Manual Date with higher `max_capacity` |
| Run a flash sale on a single date                           | Manual Date with `price_override`    |
| Block a specific date because your guide is unavailable     | Manual Date with `status=blocked`    |
| Same trip, different time slots on the same day             | Time slots (Trip Builder default) + per-slot Manual Dates if you need per-time overrides |
| Different start location for one specific departure         | Manual Date with `starting_location` filled |

---

## Where this is wired in code

If you're extending Yatra programmatically:

| Symbol                                                                 | Purpose                                                                  |
| ---                                                                    | ---                                                                      |
| `Yatra\Services\AvailabilityResolutionService::resolveAvailabilityForDate($tripId, $date, $time)` | Returns the resolved availability object for a single date. The priority-1/2/3 logic is here. |
| `Yatra\Services\AvailabilityResolutionService::getAllAvailabilityDates($tripId, $from, $to)`     | Returns the merged calendar for a date range — what the customer's date picker calls. |
| `Yatra\Repositories\AvailabilityRepository`                                                       | Reads / writes the Manual Availability Dates table.                  |
| `Yatra\Services\RecurringAvailabilityService::generateDatesForTrip($tripId, $from, $to)`         | Materialises Recurring Rules on-the-fly.                                |
| Database table `wp_yatra_trip_availability_dates`                                                 | Stores Manual Availability Dates.                                       |
| Database table `wp_yatra_new_trip_availability_rules`                                             | Stores Recurring Rules.                                                 |

Hooks the resolution flow fires:

- `yatra_resolved_availability` (filter) — mutate the resolved object before it goes to the frontend.
- `yatra_availability_calendar_dates` (filter) — mutate the full calendar array.
- `yatra_availability_date_created` / `_updated` / `_deleted` (actions) — fire on manual-date CRUD.

---

## Troubleshooting

**A date I added manually doesn't show on the calendar** — check its **status**. `blocked` hides the date completely; `sold_out` shows it disabled. Also confirm the date is within the trip's *Available From → Available To* window.

**A recurring rule isn't producing dates** — make sure *Active* is on, *Start date* is in the past or near future, and your *Weekdays* picks at least one day for weekly recurrence. The rule's preview calendar (right column) should show upcoming dates.

**The customer sees a different price than what I set** — the resolver follows priority 1 → 2 → 3. Make sure no rule with a higher-priority base price covers the date. The detail page shows which source won (`availability_date` / `recurring_rule` / `trip_default`).

**Two rules with overlapping patterns conflict** — clean them up. The resolver picks the first match deterministically but the UI doesn't currently warn about overlaps. Use one rule per "shape" (one daily, one weekly with weekdays, etc.).

**Capacity doesn't decrement when I confirm a booking** — Yatra updates `booked_count` only when the booking transitions to `confirmed`. Pending bookings reserve a soft hold (configurable in [Settings → Booking](/settings#_3-booking) → *Booking Expiry Hours*).

---

## Where to read more

- [Create a trip → 1.4 Availability & Booking](/trip-creation#_1-4-availability-booking) — the Trip Builder default fields.
- [Departures](/departures) — Departures are date-time events you publish for the public-facing departure list. They're consumed by the same resolver but managed under their own admin page.
- [Bookings & customers](/booking-settings) — how booked dates decrement capacity and how cancellations restore it.
- [Hooks & filters → Availability](/hooks-filters) — every action / filter the availability pipeline fires.
