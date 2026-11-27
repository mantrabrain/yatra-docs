---
title: Countdown & Social Proof
description: Yatra Pro Countdown & Social Proof — a countdown on the trip page, a "booked N times" badge and a recent-booking popup, all from real data.
---

# Countdown & Social Proof <span class="pro-pill">PRO</span>

Add a little urgency to your trip pages — from real data only:

- a **countdown** on the trip page's booking card, to a date you set (for example the end of an early-bird offer) or to the trip's **next departure**;
- a **"Booked 5 times in the last 30 days"** badge, counted from confirmed and completed bookings;
- a small **recent-booking popup** on trip pages: *"Someone from Germany booked Everest Base Camp Trek · 3 hours ago"*.

::: info Plan and versions
**Yatra Pro — any plan.** New in Yatra Pro 3.3.0; needs the free **Yatra 3.3.0 or later**.
:::

## Turn it on

<span class="screen-path">Yatra → Modules</span> → **Countdown & Social Proof** (category *Marketing*) → toggle on.

## Countdown (per trip)

<span class="screen-path">Yatra → Trips → edit a trip → Availability & Booking → Countdown</span>

| Count down to | What it shows |
| --- | --- |
| No countdown | Nothing (the default). |
| A date and time | *Offer ends in 2d 04:13:22* until that moment (your site's time zone), then disappears. |
| The next departure | *Next departure in …* to the next departure that isn't sold out. Only for trips with set departure dates. |

Change the text with **Text** (for example *Early-bird price ends in*).

::: warning The countdown doesn't change prices
It only shows the time left. End the offer yourself at the same time — for example with a Dynamic Pricing *time-based* rule — so the page never promises a price that has already gone.
:::

## Badge and popup

<span class="screen-path">Yatra → Settings → Booking → Countdown & Social Proof</span>

- **Recent-booking popup on trip pages** — shows up to 5 recent bookings per page view, one at a time, from bookings in the look-back window. It shows the trip, the traveller's **country** and how long ago. Tick **Show the traveller's first name** to add the first name — check your privacy policy allows it. A visitor can close it; it then stays closed for that browser session.
- **"Booked N times" badge** — shown once a trip has at least the number of bookings you set in **Show the badge from**.
- **Look back (days)** — the window for both (default 30).

Only confirmed and completed bookings of published trips count. No email address, surname, phone number or booking reference is ever sent to the page.

## For developers

- `GET /wp-json/yatra/v1/social-proof/recent` — the popup feed (public; empty while the popup is off). Cached for 10 minutes and refreshed when a booking is created or changes status.
- The booking card hook `yatra_trip_sidebar_after_price` (Yatra 3.3) — action, arg `$trip`.
