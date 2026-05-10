---
title: Trip Consent
description: Pre-trip waivers and consent forms with digital signature, attached to bookings.
prev:
  text: Additional Services
  link: /modules/additional-services
next:
  text: Email Automation
  link: /modules/email-automation
---

# Trip Consent <span class="pro-pill">PRO</span>

![Trip Consent admin — waiver list with signed-vs-pending counters per booking](/screenshots/modules/trip-consent.webp)

Build **waivers** and **consent forms** that travellers must sign before a trip — assumption-of-risk forms, photo-release forms, medical disclosures. Signatures are captured digitally and attached to the booking record.

## What problem it solves

Adventure / activity operators need a paper trail. Sending PDF waivers by email and chasing replies is painful and easy to lose. Trip Consent puts the signing flow inside the booking confirmation page so by the time the customer is on-site, the file is already in your records.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Trip Consent</span>.
2. New menu item: <span class="screen-path">Yatra → Trips → Trip Consent</span>.

## Build a consent form

1. Open <span class="screen-path">Yatra → Trips → Trip Consent → + Add New</span>.
2. Fill in:
   - **Title** (e.g. "Adventure Activity Liability Waiver").
   - **Body** — rich text; supports merge tags (`{{traveler_name}}`, `{{trip_name}}`, `{{travel_date}}`).
   - **Required signatures** — one per booking, or one per traveler.
   - **Required age** — block under-18s from signing without guardian.
   - **Validity** — single-use or re-usable across multiple bookings.
3. **Attach to trips** — same model as [Additional Services](/modules/additional-services): all trips, specific trips, or by destination.
4. **Save**.

## Signing flow (customer)

After payment, the booking confirmation page shows a **Sign now** card for each pending consent. The customer:

1. Reads the body.
2. Types their full name and ticks the *I accept* box.
3. Optionally draws a signature on the canvas.
4. Hits **Sign**. A signed PDF is generated, emailed to the customer, and attached to the booking.

## Tracking signatures (operator)

Each booking detail page has a **Consents** widget showing pending vs signed waivers. Bulk re-send pending requests via the Bookings list bulk action.

## Hooks

| Hook                                  | Type    | Purpose                                              |
| ---                                   | ---     | ---                                                  |
| `yatra_trip_consent_pdf_args`         | filter  | Override PDF generation options (paper, font).       |
| `yatra_trip_consent_signed`           | action  | Fires after a successful signature; receives `($consent_id, $booking_id, $signature_data)`. |
| `yatra_trip_consent_pending_email_subject` | filter | Customise the reminder email subject.            |
