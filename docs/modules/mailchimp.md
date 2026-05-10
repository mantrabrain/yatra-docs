---
title: Mailchimp
description: Auto-subscribe customers to a Mailchimp audience after booking.
prev:
  text: Advanced Discount
  link: /modules/advanced-discount
next:
  text: Facebook Pixel
  link: /modules/facebook-pixel
---

# Mailchimp <span class="pro-pill">PRO</span>

![Yatra Settings → Integration tab — Mailchimp configuration alongside Google Calendar](/screenshots/modules/integration-tab.webp)

Push every customer who completes a booking into a **Mailchimp audience** — automatically tagged with the trip name, destination, and booking date — so your marketing list stays in sync with your booking system.

## What problem it solves

Operators often run pre- and post-trip marketing on Mailchimp. Manually exporting customer lists every week is fragile. With this module, every confirmed booking subscribes the customer (with consent), tags them, and updates merge fields like `{{trip_count}}` and `{{lifetime_spend}}`.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Mailchimp</span>.
2. The configuration UI lives under <span class="screen-path">Yatra → Settings → Integration → Mailchimp</span>.

## Configure

1. Generate an **API key** in your Mailchimp account: Profile → Extras → API keys.
2. Paste it into the **API key** field. Save.
3. Pick the **Audience** (list) from the dropdown that loads after key validation.
4. Choose **Sync mode**:
   - **Subscribe on booking confirmed** (recommended).
   - **Subscribe on customer registration** (broader list, fewer signals).
5. Configure **tags** — Yatra auto-tags by trip name, destination, and booking year. Add your own static tags too.
6. Map Yatra fields → Mailchimp merge fields (FNAME, LNAME, COUNTRY, etc.).
7. **Save**.

## Consent (GDPR)

The booking form's existing privacy-consent checkbox controls whether the subscription happens — if the customer doesn't consent, the booking still completes but no Mailchimp call is made.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_mailchimp_subscribe_args`                  | filter  | Mutate the subscribe payload before the API call.        |
| `yatra_mailchimp_should_subscribe`                | filter  | Return `false` to skip a particular booking.             |
| `yatra_mailchimp_subscribed`                      | action  | Fires after a successful subscribe; receives `($email, $audience_id, $merge_fields)`. |
