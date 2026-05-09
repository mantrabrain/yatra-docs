---
title: Bookings & customers
description: The Yatra booking lifecycle — admin workflow, traveler details, customer accounts, guest checkout, enquiries, and reviews moderation.
---

# Bookings & customers

This page is your operational guide — the day-to-day "where do I click to manage these bookings" reference.

## The Bookings list

Open <span class="screen-path">Yatra → Bookings</span>.

You'll see a table of every booking with:

- **Search** by booking number, customer, or trip.
- **Booking status filter** — Pending, Confirmed, Cancelled, Completed.
- **Payment status filter** — Pending, Partial, Paid, Refunded, Failed.
- **Sort** by Booking Date, Travel Date, Booking Number, Customer, Trip, Amount, Status.

Default columns (toggleable): booking number, customer, trip, travelers count, dates, amount, payment status, booking status.

### Bulk actions

Tick rows, then choose:

- **Mark as Confirmed** / **Mark as Pending** / **Mark as Cancelled** / **Mark as Completed** / **Delete permanently**.

(The bulk options shown depend on which status tab you're viewing.)

## Booking detail page

Click any booking row to open the detail page.

### Header

The header shows the booking number and a **+ Edit Booking** button (visible if you have the `yatra_edit_bookings` capability).

### Sections (top to bottom)

#### Booking Overview

- Booking number, trip title, travel dates.
- Traveler count badges (e.g. "2 Adults · 1 Child").

#### Payment Summary

A breakdown of the financials:

- Subtotal.
- Discounts applied (per-coupon line).
- Taxes (per-tax line).
- Itinerary costs / extras.
- Grand Total.
- **Due Now** — the unpaid balance (if any).

#### Customer Information

Name, email, phone — pulled from the customer record.

#### Travelers Information

For each traveler on the booking:

- Name and category badge (Adult / Child / Infant / Senior).
- Document number (if collected).
- "Lead Traveler" / "Primary Contact" badges.

#### Emergency Contact

Shown only if the customer filled it in at checkout.

#### Special Requests

Internal notes from the customer (dietary, accessibility, etc.).

#### Sidebar — Google Calendar Sync <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Google Calendar two-way sync</span>
  </div>
  <p class="pro-callout__desc">Push every booking to your operations Google Calendar. Per-trip calendar selection, color coding, and automatic date updates if the customer reschedules.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock calendar sync →</a>
</div>

When the **Google Calendar Integration** module is on and the booking has been synced, the sidebar shows the calendar status, link to the calendar event, and a **Re-sync** action.

#### Payment Information

- Status pill (Paid / Pending / Partial / Refunded / Failed).
- Method (PayPal / Stripe / etc.).
- Trip Price per Person.
- Total Amount.
- Tax Incl. badge if your settings say prices include tax.
- Discount card if a coupon or group discount was applied.

#### Consent Status <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Trip Consent &amp; digital waivers</span>
  </div>
  <p class="pro-callout__desc">Collect liability waivers, COVID forms, or release-of-image consents at checkout. Each traveler signs digitally; you see a "signed N of M travelers" status here, with a link to <strong>Manage Consents</strong>.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock trip consent →</a>
</div>

#### Timeline

Created at + Last updated at + a brief history of status changes.

## Booking statuses

| Status        | Meaning                                                          |
| ---           | ---                                                              |
| **Pending**   | Customer started but hasn't paid (or paid partial).             |
| **Confirmed** | Paid in full. Trip is locked in.                                 |
| **Cancelled** | Customer or admin cancelled. Refund handled separately.          |
| **Completed** | The trip has run. Useful for after-trip review requests.         |

Bookings auto-transition Pending → Confirmed when the gateway webhook lands (PayPal IPN, Stripe charge.succeeded, etc.).

You can manually transition with the bulk action menu or by editing the booking.

## Edit a booking

Click **+ Edit Booking** in the header to load the booking edit form. You can:

- Add or remove travelers.
- Change traveler categories.
- Change the trip / departure / dates (recalculates totals).
- Add internal notes.
- Override the price (for special quotes).

Click **Save** to persist. The customer doesn't get an automatic email — use the **Send email** action if you want them notified.

## Customers

Open <span class="screen-path">Yatra → Customers</span>.

This is the list of every customer who has ever booked or registered:

- Status filters: All / Active / Inactive / Blocked.
- Sort by Registration Date, Name, Email, Country, Bookings, Total Spent.

Click a customer row to see:

- Profile (name, email, phone, address).
- All bookings.
- All payments.
- All enquiries.
- Internal notes (admin-only).

### Bulk actions on customers

- Mark as **Active**, **Inactive**, or **Blocked**.
- Delete permanently (warns before deleting).

Blocking a customer prevents new bookings from their account but doesn't touch existing data.

## Guest checkout

If your <span class="screen-path">Settings → Customer</span> has **Allow guest checkout** on, customers don't need an account before booking. Yatra creates a customer record on first booking. They can later set a password and claim the account by visiting the password-reset link in their booking confirmation email.

If guest checkout is **off**, customers must register or log in before booking.

## Enquiries

Open <span class="screen-path">Yatra → Enquiries</span> for the enquiry pipeline.

Customers submit enquiries from the **Make an Enquiry** modal on the trip page. Each enquiry has:

- Customer name, email, phone.
- Trip (linked).
- Preferred travel date and traveler count.
- Message body.
- Status (New / In Progress / Quoted / Won / Lost).

Click an enquiry to view, reply, or convert it to a booking. Yatra fires the `yatra_enquiry_created` action so you can route to a CRM via Zapier or a custom integration.

## Reviews

Open <span class="screen-path">Yatra → Reviews</span>.

Reviews are moderated by default. The list has:

- Status filters: All / Pending / Approved / Rejected.
- Columns: rating, customer, trip, body excerpt, submitted at.

Click any review to read the full body, reply (admin reply), or moderate.

Per-trip review settings are in <span class="screen-path">Yatra → Settings → Review</span>: enable / disable, allow anonymous, auto-approve threshold, minimum rating to display.

## Discounts (coupons)

Open <span class="screen-path">Yatra → Discounts</span>.

Each coupon has:

- **Code**, **Description**, **Type** (percentage / fixed), **Amount**.
- **Maximum discount** (cap for percentage coupons).
- **Usage limit** (total) and **per customer** limits.
- **Valid from** and **expiry date** (DatePicker).
- **Status** — draft / publish / trash.
- **Applicable to** — all trips or specific trips.
- **Minimum booking amount**.
- **First-time customer only** flag.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Advanced &amp; group discounts</span>
  </div>
  <p class="pro-callout__desc">Auto-apply group-size discounts (e.g. 5% off for 4+ travelers, 10% off for 8+), stack with promo codes, and exclude specific trips. The Pro <strong>Advanced Discount</strong> module unlocks all of this.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock advanced discounts →</a>
</div>

## Booking flow on the front end

When a customer clicks **Book now** on a trip:

1. They pick a **date / departure** (date picker on the trip page).
2. Set **traveler counts** by category (Adult / Child / etc.).
3. Continue to checkout.
4. Fill in **contact** + **traveler details** (one form section per traveler).
5. Optional **emergency contact**.
6. Pick a **payment method**.
7. Pay.

After successful payment, they land on the **Booking confirmation** page (rendered from `templates/partials/booking-content.php`).

## What's next

- [Payments](/payment-settings) — gateway-by-gateway setup, refunds.
- [Email & notifications](/email-settings) — what fires on confirmation.
- [Pro modules](/third-party-integrations) — every Pro feature listed.
