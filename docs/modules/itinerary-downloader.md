---
title: Itinerary Downloader
description: Yatra Pro Itinerary Downloader — a "Download itinerary (PDF)" button on trip pages that emails the day-by-day itinerary to the visitor and saves them as a lead.
---

# Itinerary Downloader <span class="pro-pill">PRO</span>

Turn trip-page visitors into leads. A **Download itinerary (PDF)** button appears in the trip page's itinerary section. The visitor enters their name and email, and Yatra emails them the trip's day-by-day itinerary as a PDF. Each request is saved as an enquiry so you can follow up.

::: info Plan and versions
**Yatra Pro — any plan.** New in Yatra Pro 3.3.0 and needs the free **Yatra 3.3.0 or later**.
:::

## Turn it on

<span class="screen-path">Yatra → Modules</span> → **Itinerary Downloader** (category *Marketing*) → toggle on. There are no settings.

The button shows on every trip that has an itinerary (the itinerary section only appears when the trip has itinerary days).

## What the visitor gets

- A short form: **name**, **email**, and an optional tick box *Send me trip news and offers too*. A link to your privacy policy is shown when one is set in <span class="screen-path">Settings → Privacy</span>.
- An email from your site — subject *Your itinerary: {trip}* — with the PDF attached, a link back to the trip page to book, and your company email as the reply-to address.
- The PDF is the same itinerary document booked customers get, without booking details: no reference, status or prices. It says who it was prepared for.

## What you get

Every request is saved in <span class="screen-path">Yatra → Enquiries</span> with source **itinerary_download**, the trip, the visitor's name and email, and whether they ticked the marketing box (`marketing_consent` in the enquiry's metadata). Only add people to a newsletter who ticked it.

## Protection against abuse

- Each email address can ask 3 times an hour, and each IP address 10 times an hour.
- A hidden field catches form-filling bots (they are told it worked; nothing is sent).
- Requests from other websites are refused.
- Draft and unpublished trips can't be requested.

Your site must be able to send email (an SMTP plugin or Yatra's SMTP settings). If sending fails, the visitor is told and nothing is saved.

## For developers

```php
// A visitor asked for an itinerary PDF.
add_action('yatra_itinerary_download_lead', function (int $enquiryId, array $lead) {
    // $lead: trip_id, name, email, consent (bool)
}, 10, 2);
```

The button is printed on the Yatra 3.3 action `yatra_trip_itinerary_actions` (`$trip`), which you can also use for your own buttons beside **Expand All**.
