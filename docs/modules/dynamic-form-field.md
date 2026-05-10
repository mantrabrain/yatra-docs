---
title: Dynamic Form Field
description: Add per-trip custom fields (dietary, medical, gear size) to the booking form.
prev:
  text: Email Automation
  link: /modules/email-automation
next:
  text: Advanced Discount
  link: /modules/advanced-discount
---

# Dynamic Form Field <span class="pro-pill">PRO</span>

Add **custom fields** to the booking form on a per-trip basis — dietary requirements for a food tour, medical disclosures for a high-altitude trek, gear size for a kayak rental.

## What problem it solves

The site-wide booking form ([Settings → Booking Form](/settings#4-booking-form)) is great for fields *every* trip needs. But a "T-shirt size" question on a meditation retreat is just clutter. Dynamic Form Field lets each trip carry its own extra fields without polluting the global form.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Dynamic Form Field</span>.
2. The Trip Builder gets a new **Custom Fields** tab inside the **Booking Requirements** section.

## Add fields to a trip

1. Open the trip in the [Trip Builder](/trip-creation).
2. Go to **Phase 1 → Availability & Booking → Custom Fields**.
3. Click **+ Add field**. Configure:
   - **Label** ("Dietary requirements").
   - **Type** — text, textarea, select, multi-select, checkbox, date, file upload.
   - **Required / optional**.
   - **Per-traveler** — repeats once per traveler instead of once per booking.
   - **Conditional logic** (optional) — show this field only if another field has a particular value.
4. **Save**.

The fields appear in checkout below the standard form, are validated server-side, and are stored on the booking + traveler records.

## Where the data ends up

- **Bookings list** — answer summary on each booking detail page.
- **Travelers list** — per-traveler answers.
- **Email templates** — accessible via merge tags <span v-pre><code>{{custom_&lt;field_id&gt;}}</code></span>.
- **CSV export** — included in <span class="screen-path">Yatra → Tools → Export → Bookings</span>.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_dynamic_form_field_enabled`                | filter  | Per-trip toggle.                                         |
| `yatra_dynamic_form_field_validate`               | filter  | Custom server-side validation; return `WP_Error` to reject. |
| `yatra_dynamic_form_field_saved`                  | action  | Fires after each answer is persisted.                    |
