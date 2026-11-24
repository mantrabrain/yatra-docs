---
title: Multi-Trip Cart
description: Yatra Pro Multi-Trip Cart (Growth and Scale) — customers add several trips and dates to a cart and book them all in one checkout. Each trip becomes its own booking, paid with one payment.
---

# Multi-Trip Cart <span class="pro-pill">PRO</span>

Let customers collect several trips and dates — a trek, then a city tour, then a safari — and book them all in **one checkout with one payment**. Each trip still becomes **its own Yatra booking**, with its own seats, travellers, confirmation, receipt and refunds, so nothing changes in how you run departures.

::: info Plan and versions
**Yatra Pro — Growth or Scale plan.** New in Yatra Pro 3.2.0 and needs the free **Yatra 3.2.0 or later**. On an older Yatra the module stays off.
:::

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Growth** or **Scale** | <span class="screen-path">Yatra → License</span> |
| Yatra (free) 3.2.0 or later | <span class="screen-path">Plugins</span> |
| Multi-Trip Cart module enabled | <span class="screen-path">Yatra → Modules → Multi-Trip Cart</span> |
| A payment method that can pay a cart | See [Which payment methods can pay a cart](#which-payment-methods-can-pay-a-cart) |

## Step 1 — Turn the module on

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Multi-Trip Cart** (category *Sales*) → toggle on.
3. Open any Yatra admin screen once. Yatra creates a published page called **Cart** (slug `trip-cart`) containing the `[yatra_cart]` shortcode.

That's it — there are no settings to fill in.

::: tip The Cart page is created once
The Cart page is created the first time an administrator opens the admin with the module on. If you later delete it, Yatra does **not** recreate it. To use your own page instead, add the `[yatra_cart]` shortcode to it. Note that the "View cart" links and the floating cart button point at the page Yatra created, so keep that page published.
:::

## What the customer sees

### On the trip page — "Add to cart"

Every departure card in the trip's availability list gets an **Add to cart** button next to **Book Now**. The customer picks the date, travellers and any extras exactly as for Book Now, then clicks **Add to cart**.

- Yatra checks the choice exactly as Book Now does (it uses the same booking-session check). If the date can't be booked, the card says why.
- On success the card shows **"Added to your cart."** with a **View cart** link.
- Adding the **same trip, date and start time again** replaces the earlier choice (for example with changed travellers) — the card says *"Your cart already had this departure, so it was updated."* It is never booked twice.
- **Waitlist** departures don't get an Add to cart button.

### The floating cart button

While the cart has trips in it, a small **Cart** button with the number of trips appears on the site's pages, linking to the Cart page. It is hidden on the Cart page itself and on checkout.

### The Cart page

The Cart page (`[yatra_cart]`) lists every trip with its image, date (and start time), number of travellers and price, plus the **Total**. Customers can **Remove** a trip, or click **Checkout**.

- A trip that can no longer be booked on its date is flagged *"No longer available on this date."*
- When the cart is empty it says so, with a **Browse trips** link to your trips archive.

### Checkout

**Checkout** re-checks every trip (prices and seats can change while a trip sits in the cart). If one can't be booked any more, the customer is told which one and asked to remove it.

Checkout then opens for the **first trip** in the cart. The other trips are listed in the order summary under **"Also in this order"**, with their prices and an **Edit cart** link. The customer fills in the booking form **once**:

- The contact details and payment method cover every trip.
- The travellers entered for the first trip are reused, in order, for the other trips. If another trip has more places than the first, the extra places are left blank — the customer can complete them later from **My Account** (traveller details).

After payment, the confirmation page shows a **"Bookings in this order"** list with each booking's trip, date, reference and total, and a **View** link to each one's own confirmation.

## How the bookings are created

| | What happens |
| --- | --- |
| **One booking per trip** | Each trip in the cart becomes its own booking, with its own reference, seats and travellers. |
| **First trip = lead booking** | The first trip is booked as usual; the others are booked straight after it, through Yatra's own checkout. |
| **All or nothing** | Every trip is checked before any is booked. If one fails, the ones already created in that attempt are removed and the customer sees which trip failed and why. |
| **Emails** | Each trip's booking email goes out just like a single booking's. |
| **History** | Each booking's **History & notes** gets a note naming the other bookings of the order, e.g. *"Booked in one multi-trip order with YT-…, YT-…. Paid with one payment, split between the bookings."* (or *"Each booking is paid on its own."* for offline methods). |

### How the one payment is split

- **Online methods** (card, PayPal and the other gateways listed below): the customer pays the whole order once. When the payment is recorded, each booking gets **its own payment row** for its own share, with the **same transaction id**. The first booking is credited first, then each other booking in order. Refund each booking's payment separately from its booking screen.
- **Offline methods** (Pay Later, Bank Transfer): each booking is simply left unpaid and is paid on its own, exactly like a single Pay Later or bank-transfer booking.

Trips leave the cart when an offline checkout is submitted, or when an online payment arrives. If a card is declined, the cart stays as it was so the customer can try again — and the unpaid extra bookings from the failed attempt are removed so they don't linger.

## Which payment methods can pay a cart

At checkout, a cart only offers the payment methods that can pay several bookings at once:

| Can pay a cart | Not offered for a cart |
| --- | --- |
| Pay Later, Bank Transfer, PayPal, Stripe, Razorpay, Mollie, Paystack, T-Bank | Square, Authorize.Net |

Square and Authorize.Net complete the payment in a way that only records one booking's payment, so a cart paid there would leave its other trips unpaid. They stay available for single-trip bookings. (Only gateways you have actually enabled under [Payments](/payment-settings) appear.)

Developers can change the list with the `yatra_multi_booking_gateways` filter.

## Deposits

With [Flexible Payments](/modules/flexible-payments) on, the customer can pay the cart **in full** or by **deposit / partial payment**, as for a single trip. Every trip in the cart is booked the same way, and the one payment covers **each trip's own deposit** (using each trip's own deposit settings). The balances are then due on each booking separately.

## Coupons

A promo code entered at checkout:

- applies to the **first trip** as usual (any coupon type);
- applies to the **other trips only if it is a percentage coupon**, valid for that trip and still within its **usage limit**. If it isn't valid for a trip, that trip is booked at its normal price;
- a **fixed-amount** coupon stays on the first trip only — otherwise it would be deducted once per trip.

The prices under "Also in this order" update when a coupon is applied. The Cart page itself shows prices before any coupon. See [Advanced Discount](/modules/advanced-discount) for coupon settings.

## Limits

| Limit | Value |
| --- | --- |
| Trips per cart | **10**. Adding an 11th says *"A cart holds up to 10 trips. Check out these first."* |
| How long a cart is kept | 7 days after the last change. |
| Currency | All trips in a cart must be priced in the same currency. |
| New guest carts | 30 per hour from one connection (IP address), to stop scripts filling your database. Change with the `yatra_multi_booking_guest_carts_per_hour` filter. |
| Guests with email verification | If **Require Guest Email Verification** is on under <span class="screen-path">Yatra → Settings → Booking</span>, guests must log in before they can check out a cart of several trips. |

Guests get a cart too (kept with a cookie). When a guest logs in, their cart is merged into their account's cart.

## Troubleshooting

**No "Add to cart" button on trip pages** — check that (1) your license is Growth or Scale, (2) the module is on under <span class="screen-path">Yatra → Modules</span>, (3) Yatra (free) is 3.2.0 or later, and (4) the departure isn't a waitlist departure.

**"This payment method can't pay for several trips at once"** — the customer chose a method that isn't in the list above. Enable one of the supported methods.

**The floating cart button or "View cart" link is missing** — the Cart page Yatra created was deleted or unpublished. Republish it, or create a page with `[yatra_cart]`.

## Developer reference

| Hook | Type | Purpose |
| --- | --- | --- |
| `yatra_multi_booking_gateways` | filter | Payment method ids that can pay a cart. Default: `pay_later`, `bank_transfer`, `paypal`, `stripe`, `razorpay`, `mollie`, `paystack`, `tbank`. |
| `yatra_multi_booking_guest_carts_per_hour` | filter | New guest carts one IP address may start per hour (default `30`; `0` = no limit). |
| `yatra_multi_booking_item_added` | action | A trip was added to a cart. Args: `$trip_id`, `$session`. |
| `yatra_multi_booking_created` | action | A multi-trip order was booked. Args: `$lead_booking_id`, `$other_booking_ids`, `$gateway`. |

The module is built on checkout hooks added in Yatra 3.2 (`yatra_checkout_linked_bookings`, `yatra_checkout_charge_amount`, `yatra_payment_allocation` and others) — see [Hooks & filters](/hooks-filters).

REST routes (public; changes need the cart nonce printed on the page): `GET /wp-json/yatra/v1/cart`, `POST /cart/items`, `DELETE /cart/items/{id}`, `POST /cart/checkout`.

## Related

- [Flexible Payments](/modules/flexible-payments) — deposits for a cart.
- [Advanced Discount](/modules/advanced-discount) — coupons.
- [Payments](/payment-settings) — enabling payment methods.
- [Shortcodes](/shortcodes) — `[yatra_cart]`.
