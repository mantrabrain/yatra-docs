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

![Yatra Google Calendar dashboard — connection status and sync settings](/screenshots/modules/google-calendar-settings.webp)

Sync your Yatra **bookings** to a Google Calendar of your choice: one event per booking, or — with **One event per departure** — one event per departure with each booking listed in its description. New and confirmed bookings appear automatically; a cancelled booking's event is removed.

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
5. **Authorized redirect URIs:** paste the **Redirect URI** shown in <span class="screen-path">Yatra → Settings → Integration → Google Calendar</span>. On most sites it is `https://yoursite.com/wp-json/yatra/v1/google-calendar/callback`.
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
3. The Google Calendar settings appear under <span class="screen-path">Yatra → Settings → Integration</span>.

## Step 6 — Connect

Open <span class="screen-path">Yatra → Settings → Integration → Google Calendar</span>.

| Field                | What to put                                                                                     |
| ---                  | ---                                                                                             |
| **Client ID**        | The `.apps.googleusercontent.com` value from Step 4.                                            |
| **Client Secret**    | The shorter random value from Step 4.                                                           |
| **Redirect URI**     | Read-only — copy it into your OAuth client (Step 4).                                            |

Save, then click **Connect to Google Calendar** and sign in with the Google account that owns the calendar. Yatra starts with your primary calendar. To use a dedicated calendar instead, pick it under *Connected Calendar* → **Choose a calendar** (it lists the calendars this account can add events to), or type its **Calendar ID** (Google Calendar → the calendar's *Settings and sharing* → *Integrate calendar*), then click **Save Calendar**. Reconnecting later keeps the calendar you chose.

::: tip Switching calendars
Events already synced stay on the old calendar until you run **Resync Everything** — it moves each one to the newly chosen calendar (same event, no duplicate) and then updates it. If the new calendar can't be reached (wrong ID, or the account can only view it), nothing is moved and the resync reports those bookings as failed.
:::

Then click **Open Google Calendar dashboard** to choose what gets synced.

## Step 7 — Choose what gets synced

The dashboard (<span class="screen-path">Yatra → Settings → Integration → Google Calendar → Open Google Calendar dashboard</span>) has these switches:

| Setting                       | What it does                                                                                     |
| ---                           | ---                                                                                              |
| **Auto Sync**                 | Syncs automatically when a booking is created or confirmed, and removes the event when a booking is cancelled. Off: nothing happens until you use the buttons below. |
| **Sync Bookings**             | Turns syncing on. Each booking gets its own event — or, with **One event per departure** on, each departure gets one shared event. **Required** for everything else on this page, including both buttons. |
| **Send Invitations**          | Lets Google email the guests on an event an invitation.                                          |
| **Add customers as guests**   | Adds the booking contact and travellers' email addresses to the event as guests. Off: no customer address is sent to Google at all. |
| **One event per departure**   | Puts every booking on the same departure (trip, date and time slot) into **one** event, titled with the number of bookings and travellers, with each booking's name, phone, travellers and booking-form answers listed in the description. Customers are never added as guests on a shared event, so they can't see each other's details. |
| **Calendar time zone**        | The time zone tour times are written in on events — pick a named zone such as `America/Los_Angeles` when your tours run somewhere other than your site. Daylight saving time is handled automatically. *Site time zone (default)* keeps the previous behaviour: Yatra's time zone (*Settings → General*) if set, otherwise WordPress's. Run **Resync Everything** after changing it. |
| **Event reminders**           | Google reminders on each event, in days before the start (up to 5). Remove them all and events carry no reminders of their own — only your Google calendar's default notifications apply (none, if the calendar has none). Until you change it, events get 7, 3 and 1 days. Changes apply to new events; run **Resync Everything** to update existing ones. |

::: tip One event per departure, not per booking
Turn on **Sync Bookings** *and* **One event per departure**. You get one calendar event per departure that has bookings, with every booking listed in the description — and no separate event for each booking.

A departure only gets an event once it has at least one booking: events are built from bookings, so an empty departure isn't on the calendar. Earlier versions showed a **Sync Departures** switch; it never created anything and has been removed.
:::

## Event text

Below the switches, **Event text** lets you write the event title and details yourself, with variables — like an email template. Leave a field empty to keep the standard text.

| Field                     | Used for                                                                                     |
| ---                       | ---                                                                                          |
| **Event title**           | The title of an event per booking.                                                           |
| **Departure event title** | The title of a shared event (*One event per departure*). Variables: `trip_name`, `travel_date`, `bookings_count`, `travellers_count`. |
| **Booking details**       | The description of an event per booking — and each booking's section in a shared departure event. |

Write variables in double curly braces. The title and details accept the same variables as the booking emails — `customer_name`, `customer_phone`, `booking_reference`, `trip_name`, `travel_date`, `travelers_count`, `travelers_list`, `special_requests`, your booking-form answers and so on — plus **`guest_phone_digits`**: the guest's number as digits with the country code (`491512345678`), ready for messaging links:

```text
WhatsApp: https://wa.me/{{guest_phone_digits}}
Signal:   https://signal.me/#p/+{{guest_phone_digits}}
Telegram: https://t.me/+{{guest_phone_digits}}
```

Google Calendar turns these into tappable links. `guest_phone_digits` stays empty when a number was saved without its country code (older bookings), so a link never points at the wrong person. Whether a guest can be reached through these apps also depends on their own settings. Changes apply to new events; run **Resync Everything** to update existing ones.

## Buttons

| Button                 | What it does                                                                                     |
| ---                    | ---                                                                                              |
| **Sync All Bookings**  | Creates events for confirmed and pending bookings that don't have one yet, 50 per click — click again if it reports more remaining. Doesn't touch existing events. |
| **Resync Everything**  | Walks every booking and repairs the calendar: creates missing events, updates existing ones in place, recreates events deleted in Google, and removes the events of cancelled bookings. Use it after editing bookings — dates, travellers, details — since those edits aren't pushed automatically. |

Both buttons need **Sync Bookings** on. With it off they reply *"Sync Bookings is switched off"*.

## What gets synced

| In Yatra                                   | In Google Calendar                                                          |
| ---                                        | ---                                                                         |
| Booking created (confirmed or pending)     | Event created about 10 seconds later (with **Auto Sync** on).               |
| Booking confirmed                          | Event created if it doesn't exist yet.                                      |
| Booking cancelled                          | Event removed. With **One event per departure**, the shared event is rebuilt without that booking, and removed once the last booking is cancelled. |
| Booking edited (date, travellers, details) | Not pushed automatically — run **Resync Everything**.                       |

Event times use the **Calendar time zone** if set, otherwise your site's time zone. A day-based trip runs 09:00 on the first day to 18:00 on the last; an hour-based tour starts at 09:00 and lasts its number of hours. The event location is the trip's starting location.

## Troubleshooting

**"Authorisation expired"** — re-connect from the module page; refresh tokens last ~6 weeks if unused. Yatra silently refreshes them on every sync if the user is still active.

**New bookings don't appear** — automatic sync runs through WP-Cron (`yatra_google_calendar_sync_booking`), which only fires when your site gets traffic. Check **Auto Sync** and **Sync Bookings** are on, or click **Sync All Bookings**.

**"Sync Bookings is switched off"** when clicking a sync button — both buttons sync bookings, so turn on **Sync Bookings**. For one event per departure, also turn on **One event per departure**.

**Events show wrong timezone** — your site time zone is wrong. Set it under [Settings → General → Timezone](/settings#_1-general). Google Calendar events use the site's time zone, not the customer's.

**`redirect_uri_mismatch` during OAuth** — the Authorized redirect URI in Google Cloud doesn't match what Yatra is sending. Copy the URI from <span class="screen-path">Yatra → Google Calendar</span> exactly and paste into the Cloud Console.

**`Google Calendar API has not been used in project ... before`** — you skipped Step 2. Open <https://console.cloud.google.com/apis/library> and enable the Calendar API.

**Guests aren't being added** — check **Add customers as guests** is on. Shared events (**One event per departure**) never carry guests. Google also requires *Make changes and manage sharing* permission on the calendar to add guests.

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
