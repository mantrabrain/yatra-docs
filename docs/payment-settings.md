---
title: Payments & gateways
description: Connect PayPal and Pay Later in the free Yatra plugin, plus the seven Pro premium gateways — Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, and Bank Transfer.
---

# Payments & gateways

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Stripe and 6 other gateways are Yatra Pro.</strong> The free plugin ships PayPal &amp; Pay Later. Activate a license under <em>Yatra → License</em> to unlock the rest.</span>
  <a class="doc-pro-callout__cta" href="https://wpyatra.com/pricing/" target="_blank" rel="noopener">View pricing →</a>
</div>

Yatra's free plugin includes **PayPal** and **Pay Later** as fully-working gateways. The other seven gateways — Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, Bank Transfer — are part of **Yatra Pro**.

## What's included

| Gateway              | Free    | Pro    | Notes                                          |
| ---                  | ---     | ---    | ---                                            |
| **PayPal**           | ✅      | ✅      | Simple (email + IPN) and REST modes.           |
| **Pay Later**        | ✅      | ✅      | Customer pays on a deposit + balance flow, manually managed. |
| **Stripe**           | — <span class="pro-pill">PRO</span>    | ✅ | One-time + scheduled balance payments.        |
| **Razorpay**         | — <span class="pro-pill">PRO</span>  | ✅      | India: cards, UPI, netbanking, wallets.        |
| **Mollie**           | — <span class="pro-pill">PRO</span>  | ✅      | Europe: iDEAL, Bancontact, SEPA, cards.        |
| **Paystack**         | — <span class="pro-pill">PRO</span>  | ✅      | Africa-first; cards, transfers, mobile money.  |
| **Square**           | — <span class="pro-pill">PRO</span>  | ✅      | North America / UK / AU / JP cards.            |
| **Authorize.Net**    | — <span class="pro-pill">PRO</span>  | ✅      | US-centric cards.                              |
| **Bank Transfer**    | — <span class="pro-pill">PRO</span>  | ✅      | Manual settlement, with bank details on the booking. |

## Where to configure

Open <span class="screen-path">Yatra → Settings → Payment</span>.

The screen has three sections:

1. **Currency & test mode** — currency, decimals, test mode master switch.
2. **Gateway list** — every gateway as a row you can toggle on / off and reorder by drag.
3. **Gateway details** — expand the row to see fields specific to that gateway.

Pro-gated gateways display a **PRO** badge until you have an active license.

## Currency

Set under <span class="screen-path">Settings → Currency</span>:

- **Currency** — code (USD, EUR, INR, NPR, AUD, …).
- **Currency position** — `$199`, `199$`, `$ 199`, or `199 $`.
- **Thousand separator** — `,` or `.` or space.
- **Decimal separator** — `.` or `,`.
- **Number of decimals** — usually 2 (or 0 for JPY).

## PayPal (free)

Two modes:

### Simple mode

Easy setup — just an email address.

<ol class="step-list">
  <li>Tick <strong>Enable PayPal</strong>.</li>
  <li>Set <strong>Mode</strong> to <strong>Simple (email + IPN)</strong>.</li>
  <li>Paste your <strong>PayPal email</strong>.</li>
  <li>Tick <strong>Test mode (sandbox)</strong> until you've tested.</li>
  <li>Save.</li>
</ol>

### Advanced (REST) mode

Full webhook support, scheduled payments. Requires PayPal developer credentials.

<ol class="step-list">
  <li>In your PayPal developer dashboard, create an app and copy <strong>Client ID</strong> and <strong>Secret</strong>.</li>
  <li>Set up a webhook on the PayPal app pointing to <code>https://yoursite.com/wp-json/yatra/v1/webhooks/paypal</code>.</li>
  <li>Copy the <strong>Webhook ID</strong>.</li>
  <li>In Yatra, set <strong>Mode</strong> to <strong>Advanced (REST)</strong>, paste the three values.</li>
  <li>Save.</li>
</ol>

## Pay Later (free)

For travel agents who confirm with a deposit + remainder workflow, or who collect cash / wire / cheque outside the site.

<ol class="step-list">
  <li>Tick <strong>Enable Pay Later</strong>.</li>
  <li>Type the <strong>Instructions</strong> customers see at checkout.</li>
  <li>Optionally tick <strong>Auto-confirm booking on Pay Later selection</strong>.</li>
</ol>

When customers pick **Pay Later** at checkout, Yatra creates a **Pending** booking. Once you've received the money, mark the payment **Completed** in <span class="screen-path">Yatra → Payments</span>.

## Stripe <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Stripe — cards, wallets, and scheduled balance payments</span>
  </div>
  <p class="pro-callout__desc">Yatra Pro includes Stripe with first-class checkout integration plus support for the <strong>Scheduled Payments</strong> module — auto-charge the balance on a future date.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock Stripe →</a>
</div>

Setup (after activating Pro):

<ol class="step-list">
  <li>Tick <strong>Enable Stripe</strong>.</li>
  <li>Paste <strong>Publishable key</strong> and <strong>Secret key</strong> from your Stripe dashboard.</li>
  <li>Create a webhook in Stripe pointing to <code>https://yoursite.com/wp-json/yatra/v1/webhooks/stripe</code>.</li>
  <li>Copy the webhook signing secret (<code>whsec_...</code>) into <strong>Webhook secret</strong>.</li>
  <li>Tick <strong>Test mode</strong>, save, run a test booking with card <code>4242 4242 4242 4242</code>.</li>
  <li>Switch to live keys and run one tiny live transaction, then refund it via the Stripe dashboard to verify the full loop.</li>
</ol>

## Razorpay <span class="pro-pill">PRO</span>

Popular in India.

- **Key ID** + **Key Secret** from the Razorpay dashboard.
- Webhook URL: `https://yoursite.com/wp-json/yatra/v1/webhooks/razorpay`.
- Optional **Webhook secret**.

## Mollie <span class="pro-pill">PRO</span>

Strong in Europe (Netherlands, Belgium, Germany, France).

- **API key** (one key for live or test, prefixed `live_` / `test_`).
- Optional list of **Payment methods** (iDEAL, Bancontact, etc.).
- Optional **Webhook secret**.

## Paystack <span class="pro-pill">PRO</span>

Africa-first.

- **Public key** + **Secret key**.
- Optional **Payment channels**.
- Optional **Webhook secret**.

## Square <span class="pro-pill">PRO</span>

US, UK, Canada, Australia, Japan.

- **Application ID**, **Access token**, **Location ID**, **Webhook signature key**.
- Sandbox has its own credentials.

## Authorize.Net <span class="pro-pill">PRO</span>

US-centric; popular with established merchants.

- **API Login ID**, **Public client key**, **Transaction key**, **Signature key**.
- Sandbox URL: `https://sandbox.authorize.net`.

## Bank Transfer <span class="pro-pill">PRO</span>

Fields:

- **Bank name**, **Account name**, **Account number**, **Routing / SWIFT**, **Instructions**.

These details show on the booking confirmation page. The booking is **Pending** until you mark it paid.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Seven premium gateways — one license</span>
  </div>
  <p class="pro-callout__desc">Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, and Bank Transfer all unlock with a single Yatra Pro license.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Compare Yatra Pro plans →</a>
</div>

## Deposits & flexible payments <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Take 30% deposits, charge balance later</span>
  </div>
  <p class="pro-callout__desc">The <strong>Flexible Payments</strong> module lets you collect a deposit at booking time. Combine with <strong>Scheduled Payments</strong> to auto-charge the balance on a future date (e.g. 30 days before travel).</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock deposits →</a>
</div>

To configure:

1. Open <span class="screen-path">Yatra → Settings → Payment</span>.
2. Find the **Partial / Deposit Payment** section.
3. Set the **Deposit type** (percentage or fixed) and the **Default balance due** (e.g. 30 days before travel).

Per-trip overrides are available in the trip's **Pricing** section.

## The Payments admin

Open <span class="screen-path">Yatra → Payments</span>.

You'll see every payment record across all bookings, with:

- **Search** by payment number, customer, or transaction ID.
- **Status filter** — Completed, Pending, Partial, Failed, Refunded, Cancelled.
- **Method filter** — by gateway.
- **Sort** — by Date, Number, Customer, Amount, Method, Status.

Default columns: Payment, Customer, Booking, Amount, Method, Status, Date.

### Add a payment manually

Click **+ Add New Payment** to record an offline payment (cash, wire, cheque):

- **Booking** — searchable dropdown (search by booking code, customer name, or email).
- **Payment Amount**.
- **Payment Method** — Credit Card, Debit Card, PayPal, Bank Transfer, Cash, Check, Other.
- **Payment Date** — picker (can't be future).
- **Transaction ID** (optional).
- **Notes** (internal).
- Sidebar: **Payment Status** — Pending, Completed, Partial, Failed, Refunded.

Click **Save Payment**. The booking's **Due Now** updates instantly.

## Refunds

Three patterns depending on the gateway:

| Gateway              | Recommended refund flow                                              |
| ---                  | ---                                                                  |
| **PayPal / Stripe**  | Refund in the gateway dashboard first, then mark refunded in Yatra. |
| **Razorpay / Mollie / Paystack / Square / Authorize.Net** | Same — gateway dashboard first, then mark refunded. |
| **Pay Later / Bank Transfer** | Refund manually via your bank, then mark refunded.            |

To mark refunded:

- **Single payment** — open <span class="screen-path">Payments</span>, click the row → Edit → set **Status** to **Refunded**.
- **Bulk** — tick rows in the Payments list → bulk action **Mark as Refunded**.

When you mark refunded:

- The payment status changes.
- The booking's payment status updates accordingly.
- An invoice download is still available (now marked refunded).
- The `yatra_payment_refunded` action fires for downstream automations.

## Test mode workflow

A safe way to test any gateway:

<ol class="step-list">
  <li>Toggle <strong>Test mode</strong> on.</li>
  <li>Paste sandbox / test keys.</li>
  <li>Set up the gateway webhook in <em>sandbox</em> mode pointing to your <strong>staging</strong> URL.</li>
  <li>Book a trip as a fresh test customer with the gateway's test card or sandbox account.</li>
  <li>Verify: booking shows <strong>Confirmed</strong>, payment shows <strong>Completed</strong>, and the receipt email arrives.</li>
  <li>Switch to <strong>Live</strong> mode, paste live keys, change the webhook to live mode, and run one small live transaction with a real card. Refund it via the gateway dashboard.</li>
</ol>

## Webhook URLs (cheat sheet)

```
https://yoursite.com/wp-json/yatra/v1/webhooks/paypal
https://yoursite.com/wp-json/yatra/v1/webhooks/paypal-ipn
https://yoursite.com/wp-json/yatra/v1/webhooks/stripe
https://yoursite.com/wp-json/yatra/v1/webhooks/razorpay
https://yoursite.com/wp-json/yatra/v1/webhooks/mollie
https://yoursite.com/wp-json/yatra/v1/webhooks/paystack
https://yoursite.com/wp-json/yatra/v1/webhooks/square
https://yoursite.com/wp-json/yatra/v1/webhooks/authorize-net
```

## What's next

- [Email & notifications](/email-settings) — what fires after confirmation.
- [Pro modules](/third-party-integrations) — every Pro feature, including Dynamic Pricing and Flexible Payments.
- [Troubleshooting](/troubleshooting).
