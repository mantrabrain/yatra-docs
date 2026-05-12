---
title: Google Calendar Integration
description: Step-by-step setup for the Yatra Pro Google Calendar module — create OAuth credentials, authorise Yatra, pick a target calendar, and verify that bookings sync to events.
prev:
  text: Pro modules — index
  link: /modules/
next:
  text: Additional Services
  link: /modules/additional-services
---

# Google Calendar Integration <span class="pro-pill">PRO</span>

![Yatra → Google Calendar admin — calendar selection, OAuth status, sync direction](/screenshots/modules/google-calendar-settings.webp)

Sync Yatra **departures** and **confirmed bookings** to a Google Calendar of your choice. Every new departure becomes an event; every confirmed booking adds an attendee with the customer's contact info; cancellations roll back automatically.

## What you'll need

| Thing                                                     | Where to get it                                                                                       |
| ---                                                       | ---                                                                                                   |
| A Google account that owns (or can manage) the target calendar | <https://accounts.google.com/>                                                                       |
| A **Google Cloud project** with OAuth credentials         | <https://console.cloud.google.com/apis/credentials> — free.                                          |
| Yatra Pro license + Google Calendar module enabled        | <span class="screen-path">Yatra → License</span> + <span class="screen-path">Yatra → Modules → Google Calendar Integration</span>. |

::: tip Personal vs shared calendars
Use a **dedicated calendar** (e.g. "Tour Departures") rather than your personal calendar — Yatra writes a lot of events. Create one at <https://calendar.google.com/> → ⚙ → *Add calendar → Create new calendar*.
:::

## Step 1 — Create a Google Cloud project

1. Sign in at <https://console.cloud.google.com/>.
2. Top bar → **Select a project** → **New Project**.
3. Name it `Yatra YOUR-SITE-NAME`. Click **Create**.

## Step 2 — Enable the Calendar API

1. In the new project, open **APIs & Services → Library** (<https://console.cloud.google.com/apis/library>).
2. Search for *Google Calendar API* → click it → **Enable**.

## Step 3 — Configure the OAuth consent screen

1. **APIs & Services → OAuth consent screen** (<https://console.cloud.google.com/apis/credentials/consent>).
2. Pick **External** (unless your Google Workspace admin restricted to *Internal*). Click **Create**.
3. Fill in:
   - **App name:** `Yatra YOUR-SITE-NAME`
   - **User support email:** your email
   - **Authorized domains:** add the domain of your Yatra site (e.g. `yoursite.com`).
   - **Developer contact information:** your email.
4. Click **Save and continue** through Scopes (leave default) and Test users (add your own email for testing).
5. Click **Back to dashboard**. The consent screen is now in *Testing* mode — fine for production with up to 100 test users, or click **Publish app** when ready.

## Step 4 — Create OAuth client credentials

1. **APIs & Services → Credentials** (<https://console.cloud.google.com/apis/credentials>).
2. **+ Create Credentials → OAuth client ID**.
3. **Application type:** *Web application*.
4. **Name:** `Yatra Calendar Client`.
5. **Authorized redirect URIs:** add `https://yoursite.com/wp-admin/admin.php?page=yatra&subpage=google-calendar&action=oauth_callback` (replace `yoursite.com` with your actual domain).
6. Click **Create**. Google shows:
   - **Client ID** — long string ending `.apps.googleusercontent.com`.
   - **Client secret** — shorter random string.
7. Copy both.

::: warning Redirect URI must match exactly
If you typo the redirect URI, Google rejects the OAuth flow with `redirect_uri_mismatch`. Copy/paste from Yatra rather than typing.
:::

## Step 5 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Google Calendar Integration** → toggle on.
3. A new menu item appears: <span class="screen-path">Yatra → Google Calendar</span>.

## Step 6 — Connect and configure

Open <span class="screen-path">Yatra → Google Calendar</span>.

| Field                          | What to put                                                                                          |
| ---                            | ---                                                                                                  |
| **OAuth Client ID**            | The `.apps.googleusercontent.com` value from Step 4.                                                 |
| **OAuth Client Secret**        | The shorter random value from Step 4.                                                                |
| **Authorise**                  | Click **Connect with Google**. Sign in with the Google account that owns the calendar. Grant the `calendar.events` scope. You'll return to Yatra. |
| **Target calendar**            | Dropdown populated after OAuth completes. Pick the calendar where departures should appear.          |
| **Sync direction**             | *One-way* (Yatra → Google) — recommended. *Two-way* lets calendar events draft new departures in Yatra. |
| **Sync bookings as attendees** | When on, each confirmed booking adds an attendee with the customer's email.                          |
| **Event prefix**               | Optional. Prefixes every event title (e.g. `[YATRA] Bali Tour - Mar 12`).                            |

Click **Save & sync now** to backfill existing departures.

## Step 7 — Verify

1. Open Google Calendar (<https://calendar.google.com/>) → switch to the target calendar.
2. You should see one event per scheduled Yatra departure.
3. Open a Yatra trip → create a new test departure → save. Within ~10 seconds the event appears in Google Calendar.
4. Confirm a test booking on that departure → the customer email becomes an attendee on the calendar event.
5. Cancel the booking → attendee is removed.

## What gets synced

| Yatra event                        | Google Calendar action                                                  |
| ---                                | ---                                                                     |
| Departure created                  | Event created with title, date, capacity (and prefix if configured).    |
| Booking confirmed                  | Attendee added, event description updated with travelers count.         |
| Booking cancelled                  | Attendee removed, capacity counter updated.                             |
| Departure cancelled                | Event deleted (or marked *cancelled*, depending on your setting).       |

## Hooks for developers

| Hook                                  | Type    | Purpose                                                                  |
| ---                                   | ---     | ---                                                                      |
| `yatra_google_calendar_event_args`    | filter  | Mutate the event payload before sending to Google.                       |
| `yatra_google_calendar_synced`        | action  | Fires after a successful sync; receives `($departure_id, $event_id)`.    |
| `yatra_google_calendar_sync_failed`   | action  | Fires on API failure; receives `($departure_id, WP_Error)`.              |

## Troubleshooting

**"Authorisation expired"** — re-connect from the module page; refresh tokens last ~6 weeks if unused. Yatra silently refreshes them on every sync if the user is still active.

**"Sync queued but not running"** — visit <span class="screen-path">Yatra → Tools → Cron</span> and run the `yatra_google_calendar_sync` cron manually.

**Events show wrong timezone** — your site time zone is wrong. Set it under [Settings → General → Timezone](/settings#_1-general). Google Calendar events use the site's time zone, not the customer's.

**`redirect_uri_mismatch` during OAuth** — the Authorized redirect URI in Google Cloud doesn't match what Yatra is sending. Copy the URI from <span class="screen-path">Yatra → Google Calendar</span> exactly and paste into the Cloud Console.

**`Google Calendar API has not been used in project ... before`** — you skipped Step 2. Open <https://console.cloud.google.com/apis/library> and enable the Calendar API.

**Attendees aren't being added** — Google requires that the calendar owner has *Make changes and manage sharing* permission on the calendar to add attendees to events programmatically. Re-share the calendar to grant the owner full permission.

## Useful links

- Google Cloud Console: <https://console.cloud.google.com/>
- OAuth credentials: <https://console.cloud.google.com/apis/credentials>
- OAuth consent screen: <https://console.cloud.google.com/apis/credentials/consent>
- Calendar API quickstart: <https://developers.google.com/calendar/api/quickstart/php>
- Create a separate calendar: <https://support.google.com/calendar/answer/37095>

## Where to read more

- [All modules](/modules#google-calendar-integration) — module catalog.
- [Settings → General](/settings#_1-general) — set your site timezone so events render in the right zone.
- [Bookings & customers](/booking-settings) — the booking lifecycle that triggers calendar updates.
