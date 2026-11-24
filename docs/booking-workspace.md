---
title: Manage a booking — payments, refunds, payment links and exports
description: The Yatra 3.2 booking workspace — record a payment, adjust the price, refund (including through PayPal and Stripe), send a payment link, read the booking history, handle customer requests, and export bookings, customers and departure manifests to CSV.
---

# Manage a booking — payments, refunds, payment links and exports

**Plan:** Free (Yatra 3.2 or later). Stripe refunds through the provider need **Yatra Pro 3.2** with the Stripe gateway.

From Yatra 3.2 the booking screen is where you handle the money and the paperwork of a booking after it was made. Open <span class="screen-path">Yatra → Bookings</span> and click a booking. The buttons along the top of the booking are:

| Button | What it does |
| --- | --- |
| **Download invoice** | A PDF invoice for the whole booking. |
| **Record payment** | Add money you received outside online checkout. |
| **Payment link** | Ask the customer to pay part or all of the balance online. |
| **Adjust price** | Give a discount or add a surcharge after booking. |
| **Resend email** | Send one of the booking emails again. |

Each payment in the booking's payment list has a **Refund** link, and the side of the booking shows **History & notes** and, when a customer has asked for something, **Customer requests**.

::: info Who can use these buttons
Record payment, Payment link, Adjust price, internal notes and "Mark as resolved" need the `yatra_edit_bookings` capability. **Refund** needs `yatra_refund_bookings`. The bookings export and the departure manifest need `yatra_export_bookings`; the customers export needs `yatra_export_customers`. Administrators have all of them; with the [Team & Access](/modules/team-access) module <span class="pro-pill">PRO</span> you choose which staff roles do.
:::

---

## Invoices and PDFs

Yatra creates PDFs **when they are downloaded** — it doesn't attach PDFs to emails.

- **Download invoice** on the booking gives an invoice for the whole booking. While nothing has been paid (for example a Bank Transfer or Pay Later booking), it is a **pro-forma** invoice showing the amount due and the payment method's instructions, such as your bank details.
- Each **payment** has its own invoice, downloadable from the payment and, for customers, from My Account and the confirmation page.
- The business name, address, email and phone on PDFs come from <span class="screen-path">Yatra → Settings → General</span>.
- The free plugin prints **no logo**. The [White Label](/modules/white-label) <span class="pro-pill">PRO</span> module (Scale), or the `yatra_pdf_branding_logo_url` filter, adds one to invoices, vouchers and itinerary PDFs.

---

## Record a payment

Use this for money that reached you outside the online checkout: a bank transfer, cash at the office, a card terminal or a cheque.

To record a payment:

1. Open the booking and click **Record payment**.
2. Enter the **Amount**. The form shows the balance due under the field.
3. Choose **Paid by** — *Bank transfer*, *Cash*, *Card (terminal)*, *Cheque* or *Other*.
4. Optionally add a **Reference** (a bank reference or receipt number) and a **Note**.
5. Click **Record payment**.

What happens next:

- The booking's amount paid, balance and payment status update straight away.
- The customer gets the payment receipt email, if that email is switched on.
- If the payment pays a **pending** booking in full, the booking is confirmed — but only under the same **Auto-Confirm** setting that applies to online payments ([Settings → Booking](/settings#auto-confirm-modes)). With Auto-Confirm off, it stays pending until you confirm it.

**The overpayment guard.** You can't record more than the balance due. If you type more, the form says so and won't save ("More than the balance due … Use Adjust price first if the customer owes more"). If the customer really owes more — an extra night, a single-room supplement — add a surcharge with **Adjust price** first, then record the payment.

::: tip Bank Transfer and Pay Later bookings
This is the quickest way to mark a Bank Transfer or Pay Later booking as paid once the money arrives. You can still add payments under <span class="screen-path">Yatra → Payments</span> as before — see [Payments → Add a payment manually](/payment-settings#add-a-payment-manually).
:::

---

## Adjust the price

Give a discount or add a surcharge after the booking was made.

To adjust the price:

1. Open the booking and click **Adjust price**.
2. Choose **Discount** or **Surcharge**.
3. Enter the **Amount**. The form shows the new total next to the old one.
4. Enter a **Reason** — it is required, and it is kept in the booking history (for example *Repeat customer* or *Single room*).
5. Click **Apply**.

The total, the balance due and the payment status update. Rules:

- A discount can't be larger than the booking total.
- If the customer has already paid, a discount can only bring the total down to what they paid. To give money back, refund a payment instead.
- A cancelled booking can't be re-priced.

---

## Refund a payment

Each completed payment on the booking has a **Refund** link.

To refund:

1. Open the booking and find the payment in its payment list.
2. Click **Refund**.
3. Enter the **Amount** (up to the payment's amount) and a **Reason**.
4. If the payment can be refunded through its provider, a box **Send the money back through …** appears. See below.
5. Click **Record refund** (or **Refund now** when the box is ticked).

The original payment is kept, and the refund is added to the booking's ledger as its own line. The booking's payment summary then shows **Received** and **Refunded** lines, and a booking whose money has all been sent back gets the payment status **Refunded**.

### Refunds through PayPal and Stripe

For some payments Yatra can send the money back to the customer and record the refund in one step:

| Payment made with | Refund through the provider? |
| --- | --- |
| **PayPal** in *Advanced* (API) mode | Yes — free plugin, Yatra 3.2+ |
| **PayPal** in *Simple* (email) mode | No — record only |
| **Stripe** <span class="pro-pill">PRO</span> | Yes — with Yatra Pro 3.2+. Refunded in the payment's own currency, including zero-decimal currencies such as JPY. |
| Every other method (Pay Later, Bank Transfer, Razorpay, Mollie, Paystack, Square, Authorize.Net, T-Bank, payments recorded by hand) | No — record only |

When provider refunds are available, the **Send the money back through …** box is **unticked when the dialog opens**, so you never send the money a second time by accident. Tick it to send the refund through the provider. Leave it unticked if you already refunded the customer from the provider's dashboard and only want Yatra to record it.

If the provider refuses the refund, its reason is shown and **nothing is recorded** in Yatra.

For the payment methods that are record only, send the money yourself (from your bank or the provider's dashboard), then use **Refund** to record it.

---

## Send a payment link

A payment link asks the customer to pay an amount you choose — a second instalment, an extra, or the whole balance — without logging in.

**Before you start:** at least one **online** payment method must be on in <span class="screen-path">Yatra → Settings → Payment</span> — PayPal, or with Yatra Pro a card gateway such as Stripe. Pay Later and Bank Transfer can't pay a link. If no online method is on, the dialog says so and won't create a link.

To create a payment link:

1. Open the booking and click **Payment link**.
2. Enter the **Amount**. It can be any part of the balance, up to the balance due.
3. Optionally add a **Message to the customer** (for example *Second instalment*).
4. Tick **Email the link to the customer** to send it straight away, or leave it unticked and copy the link yourself.
5. Click **Create link**. The link appears with a **Copy** button.

How links work:

- **Works once.** After it is paid it can't be used again.
- **Expires after 14 days.**
- **Can be cancelled.** The dialog lists the booking's links with their status — *Waiting for payment*, *Paid*, *Cancelled* or *Expired* — and a **Cancel** button on open links. Cancelling is noted in the booking history.
- **Never more than is owed.** Open links together can't ask for more than the balance. If you already have open links, the dialog shows how much they ask for and how much more you can request.
- A cancelled booking can't get a payment link.

### What the customer sees

The email is titled **Payment request**, says "Please pay *amount* towards your booking *reference*", includes your message, and has a **Pay now** button. It also says the link works once and when it expires.

The link opens Yatra's balance checkout for exactly that amount — for a part payment it says, for example, "You are paying $500 of the $2,300 balance for Booking …". The customer pays with one of your online payment methods. No login is needed.

If the link was already used, was cancelled or has expired, the customer sees "This payment link has already been used, was cancelled or has expired. Please contact us for a new one."

---

## History & notes

The **History & notes** panel on the booking is the booking's timeline. It lists:

- when the booking was made;
- every payment and refund;
- status changes, including automatic cancellation;
- emails sent;
- price changes, with their reason;
- edits to the booking and to traveller details;
- customer requests and when they were resolved;
- internal notes from your team.

To add an internal note, type it in **Add an internal note — only your team sees it** and click **Add**. Customers never see these notes.

The newest entries are at the top. Long histories are shortened; click **Show all … entries** to see everything.

---

## Customer requests (change or cancel)

Customers can ask to change or cancel a booking from **My Account** (see [Bookings & customers → What customers can do in My Account](/booking-settings#what-customers-can-do-in-my-account)). When they do:

- You get an email with the request. Replying to it goes straight to the customer.
- The booking shows a **Customer requests** card with *Cancellation requested* or *Change requested* and the customer's message.
- The request is recorded in the booking history.

**Nothing is cancelled, refunded or changed automatically.** Apply your own policy: cancel, refund or edit the booking, reply to the customer, then click **Mark as resolved**.

To turn requests off, or stop them some days before travel, go to <span class="screen-path">Yatra → Settings → Booking → Changes & Cancellations</span>.

---

## Export to CSV

Three exports are available. Each downloads a `.csv` file you can open in Excel, Numbers or Google Sheets.

| Export | Where | What's in it |
| --- | --- | --- |
| **Bookings** | <span class="screen-path">Yatra → Bookings</span> → **Export CSV** | The bookings list **with its current filters** (status, payment status, search, dates). Columns: Reference, Booked on, Trip, Travel date, Travellers, Customer, Email, Phone, Country, Booking status, Payment status, Payment method, Total, Paid, Due, Currency, Coupon. |
| **Customers** | <span class="screen-path">Yatra → Customers</span> → **Export CSV** | First name, Last name, Email, Phone, Country, Bookings, Total spent, Customer since. "Total spent" adds up payments received. |
| **Departure manifest** | <span class="screen-path">Yatra → Departures</span> → open a departure → **Download manifest** | One row per traveller on that departure — see below. |

### The departure manifest

The manifest is the list you hand to your guide or driver. It has one row per traveller on the departure, from its confirmed, pending and completed bookings (cancelled bookings are left out).

Columns: Reference, Traveller, First name, Last name, Date of birth, Gender, Nationality, Lead contact, Email, Phone, Emergency contact, Emergency phone, Booking status, Payment status, Due, Special requests.

Choice fields print their label, as the checkout shows them ("Male", not the stored value). If a booking has no traveller details yet, the lead contact's name is used.

::: tip Spreadsheet safety
Any cell that a spreadsheet would run as a formula (it starts with `=`, `+`, `-` or `@`) is neutralised with a leading apostrophe. Plain negative numbers and international phone numbers (`+44 …`) are left as they are.
:::

---

## Where to go next

- [Bookings & customers](/booking-settings) — the bookings list, the rest of the booking screen, customers and discounts.
- [Payments & gateways](/payment-settings) — set up PayPal, Bank Transfer and the Pro gateways.
- [Departures](/departures) — the departure screen where the manifest lives.
