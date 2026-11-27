---
title: Travel Agencies
description: Yatra Pro Travel Agencies (Growth and Scale) — take bookings from travel agencies for their clients, send tour emails to the guest and booking and payment emails to the agency, let agencies pay by invoice and settle a monthly statement with one payment.
---

# Travel Agencies <span class="pro-pill">PRO</span>

Travel agencies book your tours for their own clients. With this module the **booking keeps the guest's details** (name, email, phone of the person travelling), while the **agency's contact and billing details live on an agency record**. Each email goes to the right person, agencies can **pay by invoice**, and at the end of the month you send **one statement** and record **one payment** against all of that month's tours.

::: info Plan and versions
**Yatra Pro — Growth or Scale plan.** New in Yatra Pro 3.2.0 and needs the free **Yatra 3.2.0 or later**. On an older Yatra the module stays off.
:::

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Growth** or **Scale** | <span class="screen-path">Yatra → License</span> |
| Yatra (free) 3.2.0 or later | <span class="screen-path">Plugins</span> |
| Travel Agencies module enabled | <span class="screen-path">Yatra → Modules → Travel Agencies</span> |
| *(optional)* "Pay by invoice" switched on | <span class="screen-path">Yatra → Settings → Payments</span> |

## Step 1 — Turn the module on

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Travel Agencies** (category *Sales*) → toggle on.
3. A **Travel Agencies** item appears in the Yatra menu, below Customers.

## Step 2 — Add an agency

1. Open <span class="screen-path">Yatra → Travel Agencies</span> → **Add agency**.
2. Fill in:

| Field | What it's for |
| --- | --- |
| **Agency name** *(required)* | Shown at checkout, on the booking and on statements. |
| **Contact person** | Used to greet the agency in emails. |
| **Email** *(required)* | Receives the booking emails. |
| **Billing email** | Receives payment emails, statements and receipts. Leave empty to use the main email. |
| **Phone**, **Billing address**, **VAT / tax number** | Printed on the statement. |
| **Payment terms** | **Pay by invoice (monthly statement)** or **Pays at checkout**. Only agencies on invoice terms see the "Pay by invoice" method. |
| **WordPress users who book for this agency** | Usernames or emails, comma separated. When one of these users is logged in, checkout recognises the agency without a code. |
| **Internal notes** | For your team only. |

3. **Save.** Yatra shows the agency's **agency code** (for example `AG-7K2M-Q9XP`) **once**. Copy it and send it to the agency.

::: tip Lost code?
Codes are stored only in a scrambled (hashed) form, so Yatra can't show a code again. Use the **key** button on the agency's row to create a new one — the old code stops working straight away.

Changing your site's WordPress security keys (salts) also makes every agency code stop working. If you rotate them, issue new codes to your agencies.
:::

## How an agency books

On the checkout page there is a link **"Booking for a client? Travel agencies, enter your agency code"**.

1. The agency opens it, enters its code and clicks **Apply**. Codes are not case-sensitive and spaces are ignored.
2. The page reloads and says **"Booking as travel agency *Sunrise Travel*"**. The contact section is renamed **Guest details (lead traveller)**.
3. The agency enters **the guest's** name, email and phone — not its own.
4. Agencies on invoice terms see **Pay by invoice** among the payment methods. Other customers never see it.
5. The booking is linked to the agency, and its history notes *"Booked by travel agency …"*.

A logged-in user listed on the agency skips steps 1–2. **"Not an agency booking?"** removes the agency from the checkout.

Good to know:

- **Guest email verification** (if you require it) is skipped for an agency that entered a valid code — the email on the booking belongs to the guest, who isn't at the computer.
- After **10 wrong codes in an hour**, the visitor's address must wait before trying again.
- Several trips booked together with the [Multi-Trip Cart](/modules/multi-trip-cart) are all linked to the agency.

## Who gets which email

<span class="screen-path">Yatra → Travel Agencies → Emails</span>. For bookings an agency made, choose **Agency**, **Guest** or **Agency and guest** for each group:

| Group | Emails | Default |
| --- | --- | --- |
| **Booking emails** | Booking confirmation (with prices), cancellations, expiry | Agency |
| **Payment emails** | Payment receipts, balance reminders, scheduled payment notices, payment links | Agency (billing email) |
| **Tour emails** | Reminder before the tour (pickup), consent forms, booking completed, review request | Guest |

Your own **admin copies are never changed**. Bookings that weren't made by an agency are not affected at all.

## Pay by invoice

1. Open <span class="screen-path">Yatra → Settings → Payments</span> and switch on **Pay by invoice**. You can change the note the agency sees in its booking email.
2. Only agencies whose payment terms are **Pay by invoice** are offered it at checkout.
3. Nothing is charged at booking. The booking shows the full amount as due and **never expires for being unpaid** (like Pay Later) — even if you later switch the module off.

## Monthly statements

<span class="screen-path">Yatra → Travel Agencies → Statements</span>: pick the agency and the **month travelled**.

The statement lists every tour of that agency **travelling in that month** (cancelled, refunded and waitlist bookings are left out): date, booking reference, guest, tour, total, paid and due, with totals. Its number is `ST-{agency id}-{YYYYMM}`.

- **Download** — a PDF (or a printable page if no PDF engine is available), with your bank details from the Bank Transfer method and the statement number as the payment reference.
- **Email to agency** — sends it to the billing email, PDF attached.
- **Record payment** — see below.

### Recording one payment for the month

Click **Record payment**, enter the **amount received**, the date it arrived, the method and the bank reference.

- The money is applied to the statement's bookings **oldest tour first**, each up to its balance. A payment smaller than the total part-pays the last booking it reaches.
- Each booking gets **its own payment record** and a history note *"Paid … as part of agency statement ST-…"*, so booking balances and reports stay right.
- The agency receives **one receipt** listing every booking paid — not one email per booking.
- Yatra refuses an amount larger than what is due, and statements that mix currencies (record those on each booking instead).
- Yatra also refuses a reference that is already recorded on the statement, and a second recording for the same agency while one is still saving. A double click can't record the money twice.
- If a booking can't take its share (for example it was deleted in the meantime), Yatra records the rest and tells you how much was not applied. The receipt shows only the amount actually recorded.
- A booking that is now fully paid is confirmed according to your auto-confirm setting, exactly as for any manual payment.

## On the booking

- **Bookings list:** the Customer column shows the guest, with *"via Sunrise Travel"* underneath.
- **Booking view:** a **Travel Agency** panel shows the agency. Staff who can edit bookings can **link** a booking to an agency (for example one taken by phone) or **remove** the link.

## Archiving an agency

The **archive** button on an agency's row stops its code working and hides it from checkout. Its bookings stay linked and its statements stay available (tick **Show archived** to see it).

## Permissions

| Action | Capability |
| --- | --- |
| See agencies, statements, the booking panel | `yatra_view_bookings` |
| Add/edit/archive agencies, new codes, email statements, record payments, change email routing, link bookings | `yatra_edit_bookings` |

## For developers

| Hook | Use |
| --- | --- |
| `yatra_transactional_email_recipients` *(filter, free 3.2)* | `($to, $type, $variables)` — return a different address or an array of addresses for any transactional email. The module uses it for routing. |
| `yatra_checkout_booking_created` *(action, free 3.2)* | `($booking_id, $data, $session, $is_linked)` — after the public checkout creates a booking. |
| `yatra_checkout_before_contact_details` *(action, free 3.2)* | Output before the checkout contact section. |
| `yatra_checkout_requires_email_verification` *(filter, free 3.2)* | `($needed, $data)` — skip guest email verification. |
| `yatra_checkout_idempotency_parts` *(filter, free 3.2)* | `($parts, $data, $session)` — add what makes two checkout submissions different, so a resubmit with new state creates a new booking instead of resuming the earlier one. The module adds the agency. |
| `yatra_deferred_payment_gateway_ids` *(filter, free 3.2)* | Payment methods whose unpaid bookings never expire. |
| `yatra_admin_booking_list_item` *(filter, free 3.2)* | `($item, $booking)` — add fields to the admin bookings list. |
| `yatra_travel_agency_code_attempts_per_hour` *(filter)* | Wrong-code limit per address (default 10). |

REST routes (namespace `yatra/v1`): `travel-agencies`, `travel-agencies/{id}`, `travel-agencies/{id}/code`, `travel-agencies/{id}/statement` (`/pdf`, `/email`, `/payment`), `travel-agencies/settings`, `bookings/{id}/travel-agency`, and the public `travel-agency/session` (POST a code / DELETE).
