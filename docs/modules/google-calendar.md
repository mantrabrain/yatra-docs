---
title: Google Calendar
description: Two-way sync between Yatra departures and a Google Calendar — keep your team's calendar in lockstep with bookings.
prev:
  text: Pro modules — index
  link: /modules/
next:
  text: Additional Services
  link: /modules/additional-services
---

# Google Calendar <span class="pro-pill">PRO</span>

![Google Calendar admin — calendar selection, sync direction, OAuth status](/screenshots/modules/google-calendar.webp)

Two-way sync between Yatra **departures** (and optionally **bookings**) and a Google Calendar of your choice. Each departure becomes a calendar event; each new booking adds an attendee; cancelling a departure removes the event.

## What problem it solves

Operations teams already live in Google Calendar. Without sync, every confirmed booking has to be transcribed by hand — or your tour leaders find out about new travellers from email. Two-way sync removes the gap.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Google Calendar</span>.
2. A new menu item appears: <span class="screen-path">Yatra → Google Calendar</span>.

## Connect a calendar

1. Open <span class="screen-path">Yatra → Google Calendar</span> and click **Connect with Google**.
2. Sign in with the Google account that owns the calendar; grant the requested scopes (`calendar.events`).
3. Pick the destination calendar from the dropdown.
4. Choose **sync direction**: One-way (Yatra → Google), or two-way (events created in Google also create draft departures in Yatra).
5. Click **Save & sync now** to backfill existing departures.

::: tip Multiple calendars per business
Connect multiple calendars by giving each Yatra **trip** a different default calendar in its Trip Builder → Advanced section.
:::

## What gets synced

| Yatra event                        | Google Calendar action                                            |
| ---                                | ---                                                               |
| Departure created                  | Event created with title, date, capacity in description.          |
| Booking confirmed                  | Attendee added, event description updated with travelers count.   |
| Booking cancelled                  | Attendee removed, capacity counter updated.                       |
| Departure cancelled                | Event deleted (or marked cancelled, configurable).                |

## Hooks

| Hook                                  | Type    | Purpose                                                |
| ---                                   | ---     | ---                                                    |
| `yatra_google_calendar_event_args`    | filter  | Mutate the event payload before sending to Google.     |
| `yatra_google_calendar_synced`        | action  | Fires after a successful sync; receives `($departure_id, $event_id)`. |
| `yatra_google_calendar_sync_failed`   | action  | Fires on API failure; receives `($departure_id, WP_Error)`. |

## Troubleshooting

- **"Authorisation expired"** — re-connect from the module page; tokens last ~6 weeks if unused.
- **"Sync queued but not running"** — visit <span class="screen-path">Yatra → Tools → Cron</span> and run the `yatra_google_calendar_sync` cron manually.
- **Events show wrong timezone** — set the timezone correctly under [Settings → General](/settings#1-general). The Google Calendar event uses your site's timezone.
