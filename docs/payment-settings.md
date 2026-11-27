---
title: Payments & gateways
description: Beginner-friendly setup guides for every Yatra payment gateway — PayPal, Pay Later, Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, Bank Transfer, Cheque, T-Bank, Himalayan Bank, PayU, PayFast, Midtrans, PayHere. Every field, where to get the key from the gateway dashboard, screenshots, and a test workflow.
---

# Payments & gateways

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Stripe and eleven other gateways are Yatra Pro.</strong> The free plugin ships with PayPal, Pay Later, Bank Transfer and (from Yatra 3.3) Cheque. Activate a license under <em>Yatra → License</em> to unlock the rest.</span>
  <a class="doc-pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs" target="_blank" rel="noopener">View pricing →</a>
</div>

Yatra's free plugin includes **PayPal**, **Pay Later**, (from Yatra 3.2) **Bank Transfer** and (from Yatra 3.3) **Cheque** as fully-working gateways. The others — Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, T-Bank and, from Yatra Pro 3.3, Himalayan Bank, PayU, PayFast, Midtrans and PayHere — are part of **Yatra Pro**. (Before Yatra 3.2, Bank Transfer was a Pro gateway.)

::: tip New to payment gateways?
Each gateway below has a **Before you start → Get your keys → Paste in Yatra → Test it** flow. Follow the steps in order, paste the values into the matching field in <span class="screen-path">Yatra → Settings → Payment</span>, and you'll have a working checkout in under 10 minutes per gateway.
:::

## What's included

| Gateway              | Free | Pro | Slug (in source) | Where it shines                                |
| ---                  | :-:  | :-: | ---              | ---                                            |
| **PayPal**           | ✅   | ✅  | `paypal`         | Globally trusted; Simple (email + IPN) and Advanced (REST) modes. |
| **Pay Later**        | ✅   | ✅  | `pay_later`      | Pay-on-arrival / wire transfer / cash workflow.   |
| **Stripe**           | —    | ✅  | `stripe`         | Cards + Apple Pay / Google Pay, scheduled balance payments. |
| **Razorpay**         | —    | ✅  | `razorpay`       | India: cards, UPI, netbanking, wallets.        |
| **Mollie**           | —    | ✅  | `mollie`         | Europe: iDEAL, Bancontact, SEPA, cards.        |
| **Paystack**         | —    | ✅  | `paystack`       | Africa-first; cards, transfers, mobile money.  |
| **Square**           | —    | ✅  | `square`         | NA / UK / AU / JP cards.                       |
| **Authorize.Net**    | —    | ✅  | `authorize_net`  | US-centric merchant accounts.                  |
| **Bank Transfer**    | ✅ (3.2+) | ✅  | `bank_transfer`  | Manual settlement; bank details on confirmation. Several accounts per currency from 3.3. |
| **Cheque**           | ✅ (3.3+) | ✅  | `cheque`         | Payment by post; bookings are not expired while you wait. |
| **T-Bank**           | —    | ✅  | `tbank`          | Russia: bank cards, SBP, T-Pay.                |
| **Himalayan Bank**   | —    | ✅ (3.3+) | `himalayan_bank` | Nepal: Visa / Mastercard / UnionPay cards, NPR or USD. |
| **PayU**             | —    | ✅ (3.3+) | `payu`     | India: UPI, cards, net banking, wallets (INR). |
| **PayFast**          | —    | ✅ (3.3+) | `payfast`  | South Africa: cards, Instant EFT, SnapScan (ZAR). |
| **Midtrans**         | —    | ✅ (3.3+) | `midtrans` | Indonesia: cards, VA bank transfer, GoPay, QRIS (IDR). |
| **PayHere**          | —    | ✅ (3.3+) | `payhere`  | Sri Lanka: cards, eZ Cash, mCash, Genie (LKR, USD, GBP, EUR, AUD). |

## Where to configure

Open <span class="screen-path">Yatra → Settings → Payment</span>.

![Payment settings overview — global test mode, deposits, scheduled balance, gateway list](/screenshots/settings/payment.webp)

The screen has these sections:

1. **Global** — master *Test mode* switch and *Auto-confirm Pay Later bookings*.
2. **Partial / Deposit / Scheduled payments** — Pro-only flows (see [Settings → Payment](/settings#_5-payment) for every field).
3. **Booking Fee** (3.3) — see [Booking fee](#booking-fee).
4. **Travel Insurance** (3.3) — see [Travel insurance](#travel-insurance).
5. **Gateways** — every gateway as a card with an **Enable** toggle and a **Settings** disclosure. Pro-only gateways display a **PRO** badge until you have an active license.

::: warning One Test Mode switch for all gateways
A single setting — `yatra_payment_test_mode` (default `true`) — drives test mode for **every** gateway. Each gateway stores both `live_*` and `test_*` key pairs and Yatra picks the active pair from this flag. There's no per-gateway test toggle in the current UI.
:::

## Booking fee

<span class="screen-path">Yatra → Settings → Payment → Booking Fee</span> (Yatra 3.3+). A fee added to **every new booking** as its own line — for example a *Service fee* or *Card handling fee*.

| Field | Setting ID | What to put |
| --- | --- | --- |
| **Booking fee** | `booking_fee_type` | *No booking fee* (default), *Fixed amount per booking*, or *Percentage of the trip price*. |
| **Fee amount** / **Fee (%)** | `booking_fee_amount` | The amount in your store currency, or the percentage (0–100). |
| **Label** | `booking_fee_label` | The name of the line the customer sees. Empty = *Booking fee*. |

What happens:

- The fee is shown as its own line (with your label) in the checkout summary, on the booking confirmation page and on the admin booking screen.
- A percentage fee is worked out on the **trip price before discounts**.
- The fee is part of the booking's subtotal, so **coupons, tax and deposits include it** — a 20% deposit is 20% of the price including the fee.
- A booking keeps the fee it was made with (stored on the booking). Changing or switching off the setting never changes existing bookings.

Developers can change the fee per booking with the `yatra_booking_fee` filter (`$fee, $baseAmount, $tripId`) — see [Hooks & filters](/hooks-filters).

## Travel insurance

<span class="screen-path">Yatra → Settings → Payment → Travel Insurance</span> (Yatra 3.3+). Offer an insurance add-on at checkout. Yatra doesn't sell or arrange the insurance itself — you set the name, price and description of the cover you offer (for example from your insurance partner).

1. Tick **Offer travel insurance at checkout**.
2. Fill in the fields:

| Field | Setting ID | What to put |
| --- | --- | --- |
| **Name** | `travel_insurance_title` | The heading at checkout. Empty = *Travel insurance*. |
| **Price** | `travel_insurance_price_type` | *Per traveller* (default), *Percentage of the trip price*, or *Per booking*. |
| **Amount** / **Percentage (%)** | `travel_insurance_amount` | The price, or the percentage (0–100) of the trip price before discounts. |
| **Description** | `travel_insurance_description` | One or two lines about the cover, shown under the heading. |
| **Link to the policy (optional)** | `travel_insurance_terms_url` | Shown as *What the insurance covers* (opens in a new tab). |
| **Customers must say yes or no** | `travel_insurance_require_choice` | Off: *No* is preselected. On: nothing is preselected and the customer can't book until they choose. |

3. Save.

**What the customer sees.** On the checkout page, above the contact details, a section with your name and description and two choices: **Yes, add it** (with the price, e.g. *+25.00 per person*) and **No, I have my own cover or will travel without it**. Choosing *Yes* adds the insurance as its own line in the summary; it is part of the subtotal, so coupons, tax and deposits include it.

**What you see.** The answer is saved on the booking either way — a *No* is recorded too, so you can see who declined. It shows in the booking screen's **Stay & insurance** card (*Added* or *Declined by the customer*), in the **Travel insurance** column of the departure manifest CSV, and in emails as `{{travel_insurance}}` (*Added* / *Declined*). A booking keeps the price it was made with.

**Turn it off for one trip.** In the trip editor → **Availability & Booking**, tick **Don't offer travel insurance on this trip**.

Not offered on a balance (remaining-payment) checkout. Developers can change the price with the `yatra_travel_insurance_amount` filter (`$amount, $tripId, $baseAmount, $travellers`).

## Currency

Configured under <span class="screen-path">Settings → Currency</span> — see [Settings → Currency](/settings#_10-currency). The currency code is global: every booking and payment is in this store currency, and multi-currency checkout is not available (Free or Pro). With Yatra Pro Growth or Scale, the [Currency Switcher](/modules/currency-switcher) <span class="pro-pill">PRO</span> shows visitors converted prices while browsing; checkout still charges in the store currency.

---

## PayPal (free)

PayPal is the most widely-recognised gateway and is the simplest to set up. Yatra offers two modes — start with **Simple** for testing, upgrade to **Advanced (REST)** when you go live.

![Yatra → Settings → Payment → PayPal panel](/screenshots/gateways/paypal-settings.webp)

### Before you start

- You'll need a **PayPal Business** account: <https://www.paypal.com/business>.
- For test mode, also sign up for the free **PayPal Developer Sandbox**: <https://developer.paypal.com/dashboard/accounts>.

### Mode A — Simple (email + IPN)

Easiest to set up. You only need your PayPal business email. Good for low-volume / trial use.

**Step 1: Note your PayPal email.** It's the email you used to sign up for your PayPal Business account.

**Step 2: Paste in Yatra.**

| Yatra field          | Where it goes                                                              |
| ---                  | ---                                                                        |
| **Mode**             | Select **Simple (email + IPN)**.                                            |
| **PayPal email**     | Your PayPal Business email.                                                |

**Step 3: Save**, then enable PayPal at the top of the panel and click **Save Settings**.

PayPal will POST IPN notifications to `https://yoursite.com/wp-json/yatra/v1/payment/webhook/paypal` after each transaction — no manual webhook setup needed in Simple mode.

### Mode B — Advanced (REST)

Full webhook support and the basis for scheduled / partial payments. Requires a REST app in your PayPal Developer dashboard.

**Step 1: Create a REST app.**

1. Sign in at <https://developer.paypal.com/dashboard/applications>.
2. Click **Apps & Credentials** → flip the **Sandbox / Live** toggle to **Live** when you're ready (start with Sandbox).
3. Click **Create App**, name it `Yatra YOUR-SITE`, pick your business account, save.

**Step 2: Copy the credentials.**

On the app page you'll see:

- **Client ID** — long alphanumeric string.
- **Secret** — click *Show* to reveal.

Keep the page open — you'll need both in a moment.

**Step 3: Add the webhook in PayPal.**

1. In Yatra, copy the read-only **Webhook URL** shown in the PayPal settings (Advanced mode). It is `https://your-site.com/wp-json/yatra/v1/payment/webhook/paypal`.
2. In your PayPal app, open **Webhooks → Add Webhook**, paste the URL and subscribe to **Payment capture completed**.
3. Save, then copy the webhook's **Webhook ID** (it starts with `WH-`).

The webhook is a backup that confirms bookings even if the customer closes the browser after paying.

**Step 4: Paste in Yatra.**

| Yatra field          | Where it goes                                                              |
| ---                  | ---                                                                        |
| **Mode**             | Select **Advanced (REST)**.                                                |
| **Client ID**        | The Client ID from the developer app page.                                 |
| **Client Secret**    | The Secret value (click *Show* in the PayPal dashboard to reveal).         |
| **Webhook URL**      | Read-only — the URL you added in PayPal in Step 3.                         |
| **Webhook ID**       | The `WH-…` ID of that webhook. Yatra uses it to verify each incoming PayPal webhook with PayPal's signature-verification API. |

**Step 5: Save**, then enable PayPal, click **Save Settings**.

::: warning Fill in the Webhook ID
Without a **Webhook ID**, Yatra can't verify incoming PayPal webhooks and ignores them. Payments still complete when the customer returns to your site, but the webhook backup doesn't work.
:::

### Test it

<ol class="step-list">
  <li>Confirm global <strong>Test mode</strong> is on under <em>Settings → Payment → Global</em>.</li>
  <li>If using Advanced REST, switch your PayPal app to <strong>Sandbox</strong> and use sandbox-account credentials.</li>
  <li>Book a trip on the front-end → choose PayPal at checkout.</li>
  <li>Pay with a <a href="https://developer.paypal.com/dashboard/accounts">sandbox personal account</a> (PayPal creates one automatically; password is in your dev dashboard).</li>
  <li>Return to your site — booking should flip to <strong>Confirmed</strong>, payment to <strong>Completed</strong>.</li>
</ol>

### Useful links

- PayPal Developer Dashboard: <https://developer.paypal.com/dashboard/applications>
- Sandbox test accounts: <https://developer.paypal.com/dashboard/accounts>
- PayPal pricing: <https://www.paypal.com/business/fees>

---

## Pay Later (free)

Not a real payment gateway — it lets customers reserve a booking now and pay later via cash, wire transfer, or cheque. Useful for travel agents with a deposit + balance workflow.

![Yatra → Settings → Payment → Pay Later panel](/screenshots/gateways/pay-later-settings.webp)

### How to configure

| Yatra field                            | Setting ID                | Default | What to put                                                                                                |
| ---                                    | ---                       | ---     | ---                                                                                                        |
| **Payment deadline (days)**            | `payment_deadline_days`   | `7`     | Days after booking by which the customer must pay. Shown on the confirmation page and reminder email.      |
| **Auto-cancel after (days)**           | `auto_cancel_days`        | `3`     | Shown in the settings, but **not used**: from Yatra 3.2, Pay Later bookings are never cancelled for being unpaid (neither by this field nor by *Booking Expiry*). |
| **Require deposit at booking**         | `require_deposit`         | `false` | When on, the customer must pay a deposit through a real gateway before the Pay Later flow activates.       |
| **Deposit amount**                     | `deposit_amount`          | `0`     | Currency amount required as deposit when *Require deposit* is on.                                          |
| **Payment reminder (days before)**     | `reminder_days`           | `3`     | How many days before the deadline to email the *Payment due* reminder.                                     |

::: tip Auto-confirm
The *Settings → Payment → Auto-confirm Pay Later bookings* checkbox (under the Global section, **on by default**) confirms Pay Later bookings at checkout instead of leaving them *Pending*. From Yatra 3.2 it is honoured with the default *Auto-confirm online payments only* mode too (it used to be ignored there).
:::

When customers pick **Pay Later** at checkout, Yatra creates the booking (confirmed or pending, per the setting above). Pay Later bookings are **never cancelled automatically for being unpaid**. When the money arrives, open the booking and click **Record payment** — see [Manage a booking → Record a payment](/booking-workspace#record-a-payment).

The customer's My Account doesn't offer **Pay Remaining Balance** when only offline methods (Pay Later, Bank Transfer) are on, because they can't take a balance payment online.

---

<a id="stripe"></a>

## Stripe <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Stripe — cards, wallets, scheduled balance payments</span>
  </div>
  <p class="pro-callout__desc">Yatra Pro includes Stripe with first-class checkout integration plus support for the <strong>Scheduled Payments</strong> module — auto-charge the balance on a future date.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Unlock Stripe →</a>
</div>

![Yatra → Settings → Payment → Stripe panel](/screenshots/gateways/stripe-settings.webp)

### Before you start

- Sign up at <https://stripe.com> — free, no credit card needed for test mode.
- To go live you'll need to verify your business (Stripe walks you through it after sign-up).

### Step 1 — Get your API keys

Stripe has separate **test** and **live** keys. Yatra stores **both pairs** and the global *Test mode* flag picks which is active. Generate both.

1. Open <https://dashboard.stripe.com/test/apikeys> (test mode).
2. You'll see:
   - **Publishable key** — starts with `pk_test_…`. Visible by default — copy it.
   - **Secret key** — starts with `sk_test_…`. Click **Reveal** → copy it.
3. Now flip to live mode at the top-right and open <https://dashboard.stripe.com/apikeys>.
4. Repeat: copy `pk_live_…` and `sk_live_…`.

::: tip Restricted keys
For tighter security in production you can use a **restricted key** (`rk_live_…`) instead of the secret key. It works as long as you grant it Read+Write on Payment Intents, Charges, Refunds, Webhook Endpoints, and Customers.
:::

### Step 2 — Create a webhook

1. In **Yatra → Settings → Payment → Stripe**, copy the **Webhook Endpoint URL** shown in that panel (use the **Copy** button). It is pre-filled for your site, e.g. `https://yoursite.com/wp-json/yatra/v1/payment/webhook/stripe`.
2. Click the **Open Stripe → add this endpoint** link next to it (it opens the Test or Live webhooks screen to match your current mode), or go to <https://dashboard.stripe.com/webhooks> (`/test/webhooks` for test).
3. Click **+ Add endpoint** and paste the URL as the **Endpoint URL**.
4. **Listen to events** — pick **Select events** and tick at minimum:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click **Add endpoint**.
6. On the endpoint detail page, find **Signing secret** → click **Reveal** → copy the `whsec_…` value.
7. Paste it into the **Webhook Secret** field in Yatra. **Create the endpoint in the same mode (Test/Live) as your API keys** — test and live have separate endpoints and separate `whsec_` secrets.

### Step 3 — Enable payment methods (optional)

By default Stripe only enables card payments. To add Apple Pay / Google Pay / Klarna / etc.:

1. Open <https://dashboard.stripe.com/settings/payment_methods>.
2. Toggle on the methods you want.
3. Most need domain verification (Stripe shows the steps inline).

### Step 4 — Paste in Yatra

| Yatra field                       | Setting ID          | Where it comes from                                                                 |
| ---                               | ---                 | ---                                                                                 |
| **Publishable Key**               | `api_key`           | `pk_live_…` (or `pk_test_…` in Test Mode) from step 1.                               |
| **Secret Key**                    | `api_secret`        | `sk_live_…` (or `sk_test_…` in Test Mode) from step 1.                               |
| **Webhook Endpoint URL**          | `webhook_url`       | Read-only, pre-filled for your site. Copy it into Stripe (step 2).                   |
| **Webhook Secret**                | `webhook_secret`    | `whsec_…` from step 2 — required since Yatra Pro 3.0.4.                              |
| **Enabled Payment Methods**       | `enabled_methods`   | Multi-select. Tick the methods you enabled in step 3 (default: Card).               |

::: danger Keys must match the mode — or the card is never charged
Stripe has **one** Publishable/Secret pair, and a **global Test Mode** toggle (Settings → Payment → **Test Mode**) decides test vs live. Enter the keys for the mode you're in:

- **Test Mode ON** → `pk_test_…` + `sk_test_…`
- **Test Mode OFF (live)** → `pk_live_…` + `sk_live_…`

If Test Mode is **off** but you paste a `pk_test_` / `sk_test_` key (a very common mistake), Stripe runs in test mode on your live site and **real cards are never charged** even though the booking completes. The publishable and secret keys must **both** be the same mode.
:::

### Step 5 — Test it

<ol class="step-list">
  <li>Confirm global <strong>Test mode</strong> is on.</li>
  <li>Book a trip → pick Stripe at checkout.</li>
  <li>Use Stripe's test card: <code>4242 4242 4242 4242</code> · any future expiry · any 3-digit CVC.</li>
  <li>Verify the booking shows <strong>Confirmed</strong>, payment <strong>Completed</strong>, and the receipt email arrives.</li>
  <li>Refund from the Stripe dashboard, then record the refund on the payment in Yatra. The <code>charge.refunded</code> webhook is received and fires <code>yatra_stripe_charge_refunded</code>, but it does not change the payment status on its own.</li>
</ol>

::: warning Webhook secret is required (3.0.4+)
The Stripe webhook handler **rejects** any event that lacks a valid `Stripe-Signature` header. Without the **Webhook signing secret**, webhook deliveries fail and the booking updates only via the synchronous return-to-site flow.

Signature verification is HMAC-SHA256 over `{timestamp}.{raw-body}` with a 5-minute replay window — the same scheme as Stripe's official PHP SDK.
:::

### Useful links

- Stripe Dashboard → API keys: <https://dashboard.stripe.com/apikeys>
- Stripe Dashboard → Webhooks: <https://dashboard.stripe.com/webhooks>
- Stripe test cards: <https://docs.stripe.com/testing#cards>
- Stripe pricing: <https://stripe.com/pricing>

---

<a id="razorpay"></a>

## Razorpay <span class="pro-pill">PRO</span>

Popular in India — supports cards, UPI, netbanking, and wallets in INR.

![Yatra → Settings → Payment → Razorpay panel](/screenshots/gateways/razorpay-settings.webp)

### Before you start

- Sign up at <https://razorpay.com/> — Indian business (Indian bank account + KYC required to receive INR payouts).
- Razorpay has a built-in test mode; no separate sandbox account needed.

### Step 1 — Get your API keys

1. Sign in at <https://dashboard.razorpay.com/>.
2. From the left sidebar pick **Account & Settings → API Keys** (or open <https://dashboard.razorpay.com/app/keys>).
3. Click the test/live toggle at the top right.
4. Click **Generate Test Key** (or **Generate Live Key**). A modal shows:
   - **Key ID** — starts with `rzp_test_…` or `rzp_live_…`. Visible.
   - **Key Secret** — shown **once**. Copy and save it now; Razorpay will never show it again.
5. Repeat for the other mode if you want both.

### Step 2 — Configure the webhook (optional but recommended)

Async webhook is helpful because the redirect-back can fail (browser closed, mobile network drop, etc.). Razorpay still confirms via webhook.

1. Open **Account & Settings → Webhooks** (<https://dashboard.razorpay.com/app/webhooks>).
2. Click **+ Add New Webhook**.
3. **Webhook URL:** `https://yoursite.com/wp-json/yatra/v1/payment/webhook/razorpay`
4. **Active Events:** tick at least `payment.captured`, `payment.failed`, `refund.processed`.
5. **Secret:** leave blank for now (Yatra verifies via Key Secret in this version).
6. Save.

### Step 3 — Paste in Yatra

| Yatra field        | Setting ID    | Notes                                                              |
| ---                | ---           | ---                                                                |
| **Key ID**         | `key_id`      | `rzp_test_…` or `rzp_live_…` from step 1.                          |
| **Key Secret**     | `key_secret`  | Paired secret from step 1.                                         |

### Test it

Razorpay's test mode accepts the test card `4111 1111 1111 1111`, any future expiry, any CVC.

### Useful links

- Razorpay Dashboard: <https://dashboard.razorpay.com/>
- API Keys page: <https://dashboard.razorpay.com/app/keys>
- Webhooks page: <https://dashboard.razorpay.com/app/webhooks>
- Test cards & UPI IDs: <https://razorpay.com/docs/payments/payments/test-card-upi-details/>

---

<a id="mollie"></a>

## Mollie <span class="pro-pill">PRO</span>

Strong in Europe (Netherlands, Belgium, Germany, France) — iDEAL, Bancontact, SEPA, cards.

![Yatra → Settings → Payment → Mollie panel](/screenshots/gateways/mollie-settings.webp)

### Before you start

- Sign up at <https://www.mollie.com/> — European business with a European bank account.
- Mollie's test mode is built into your live account (toggle in the dashboard header).

### Step 1 — Get your API key

1. Sign in at <https://my.mollie.com/dashboard/>.
2. In the dashboard header switch to **Test mode** (left) or **Live mode** (right) — Mollie shows separate keys for each.
3. From the left sidebar pick **Developers → API keys** (or open <https://my.mollie.com/dashboard/developers/api-keys>).
4. Copy the appropriate key:
   - **Test API key** — starts with `test_…`.
   - **Live API key** — starts with `live_…`. Required for production.

::: tip Mollie auto-detects the mode
Unlike Stripe, Mollie has **one key per mode**, and Mollie itself reads the `test_` / `live_` prefix to decide what mode to run in. You only paste ONE key into Yatra — and you swap it manually when you go live.
:::

### Step 2 — Activate payment methods

1. Open <https://my.mollie.com/dashboard/settings/profiles>.
2. For each profile, click **Payment methods** and tick the ones you want (iDEAL, Bancontact, SEPA, credit card, etc.).
3. Some methods need extra verification (e.g. Apple Pay needs domain verification).

### Step 3 — Paste in Yatra

| Yatra field           | Setting ID         | Notes                                                                                                |
| ---                   | ---                | ---                                                                                                  |
| **API key**           | `api_key`          | The `test_…` or `live_…` key from step 1. Mollie auto-detects the mode from the prefix.            |
| **Webhook URL**       | `webhook_url`      | Shown for reference: `https://yoursite.com/wp-json/yatra/v1/payment/webhook/mollie`. You don't paste it anywhere — Yatra sends it to Mollie with every payment. |
| **Payment methods**   | `payment_methods`  | Multi-select. Leave empty to offer everything you've enabled in step 2.                              |

::: warning Mollie needs a publicly-reachable URL
Mollie only delivers webhooks to internet-accessible URLs. On a local-dev site (`yatra.local`, `localhost`) the gateway skips sending the `webhookUrl` parameter; confirmation happens via the return-to-site flow only. Use an ngrok tunnel for full local testing.
:::

### Useful links

- Mollie Dashboard: <https://my.mollie.com/dashboard/>
- API keys page: <https://my.mollie.com/dashboard/developers/api-keys>
- Profiles & payment methods: <https://my.mollie.com/dashboard/settings/profiles>
- Test payment methods reference: <https://docs.mollie.com/overview/testing>

---

<a id="paystack"></a>

## Paystack <span class="pro-pill">PRO</span>

Africa-first — cards, bank transfer, USSD, mobile money. Primary in Nigeria, Ghana, Kenya, South Africa.

![Yatra → Settings → Payment → Paystack panel](/screenshots/gateways/paystack-settings.webp)

### Before you start

- Sign up at <https://paystack.com/signup>.
- Paystack has a built-in test mode toggle on the dashboard — no separate sandbox sign-up needed.

### Step 1 — Get your API keys

1. Sign in at <https://dashboard.paystack.com/>.
2. From the sidebar pick **Settings → API Keys & Webhooks** (or open <https://dashboard.paystack.com/#/settings/developer>).
3. You'll see two pairs:
   - **Test Public Key** (`pk_test_…`) and **Test Secret Key** (`sk_test_…`).
   - **Live Public Key** (`pk_live_…`) and **Live Secret Key** (`sk_live_…`) — visible only after Paystack approves your account.
4. Click **Show** beside each secret key, copy both pairs.

### Step 2 — Configure the webhook URL

Paystack lets you set one webhook URL per environment.

1. On the same **Settings → API Keys & Webhooks** page, scroll to **Webhook URL**.
2. Paste `https://yoursite.com/wp-json/yatra/v1/payment/webhook/paystack` for live (copy it from the Paystack panel in Yatra). Yatra Pro before 3.3 showed `…/payment/paystack/webhook` here, which doesn't exist — if you pasted that one, replace it.
3. Add the test webhook URL after toggling to test mode (or use the same — Paystack signs every event with the secret key).

### Step 3 — Paste in Yatra

| Yatra field            | Setting ID            | Notes                                                                                       |
| ---                    | ---                   | ---                                                                                         |
| **Public key**         | `public_key`          | `pk_live_…` or `pk_test_…`. Toggle the right pair based on the global *Test mode*.        |
| **Secret key**         | `secret_key`          | `sk_live_…` or `sk_test_…`. Used for HMAC signature verification on webhooks.              |
| **Webhook URL**        | `webhook_url`         | Auto-populated. Only change if proxied.                                                     |
| **Payment channels**   | `payment_channels`    | Multi-select (cards, bank transfer, USSD, mobile money, QR, EFT). Empty = all enabled on your Paystack account. |

### Useful links

- Paystack Dashboard: <https://dashboard.paystack.com/>
- API Keys & Webhooks: <https://dashboard.paystack.com/#/settings/developer>
- Test cards: <https://paystack.com/docs/payments/test-payments/>
- Paystack supported countries: <https://paystack.com/pricing>

---

<a id="square"></a>

## Square <span class="pro-pill">PRO</span>

US, UK, Canada, Australia, Japan. Useful when you also take in-person payments via Square's POS hardware.

![Yatra → Settings → Payment → Square panel](/screenshots/gateways/square-settings.webp)

### Before you start

- Sign up at <https://squareup.com/signup>.
- For development, sign in to the Square Developer Dashboard with the same Square account: <https://developer.squareup.com/apps>.

### Step 1 — Create a developer application

1. Open <https://developer.squareup.com/apps>.
2. Click **+ Create your first application** (or **+** at the top right). Name it `Yatra YOUR-SITE`.
3. On the application page you'll see two tabs: **Sandbox** and **Production**. Both have their own credentials.

### Step 2 — Copy credentials

On the **Production** tab (and again on **Sandbox** for testing), grab:

- **Application ID** — starts with `sq0idp-…` for production, `sandbox-sq0idb-…` for sandbox.
- **Access token** — under **Credentials**. Click **Reveal token** to see it. Starts with `EAAA…`.

You'll also need a **Location ID** — Square requires charges to be tied to a physical location.

### Step 3 — Find your Location ID

1. Open **Locations** in the developer dashboard sidebar, or in your Square dashboard go to **Account & Settings → Business → Locations**: <https://app.squareup.com/dashboard/locations>.
2. Each location has an ID like `LXXX1234567890`. Copy the one matching the country/region you want to charge in.

### Step 4 — Paste in Yatra

| Yatra field           | Setting ID           | Where it comes from                                                                         |
| ---                   | ---                  | ---                                                                                         |
| **Application ID**    | `application_id`     | The `sq0idp-…` / `sandbox-sq0idb-…` from the Developer app page.                            |
| **Access token**      | `access_token`       | The `EAAA…` token revealed on the Developer app page.                                       |
| **Location ID**       | `location_id`        | The `LXXX…` ID from the Locations screen.                                                   |

Sandbox uses its own credentials. The global *Test mode* flag picks which set Yatra uses.

### Useful links

- Square Developer Dashboard: <https://developer.squareup.com/apps>
- Locations: <https://app.squareup.com/dashboard/locations>
- Square pricing: <https://squareup.com/us/en/pricing>
- Sandbox test cards: <https://developer.squareup.com/docs/devtools/sandbox/payments>

---

<a id="authorize-net"></a>

## Authorize.Net <span class="pro-pill">PRO</span>

US-centric — popular with established merchants who already have an Authorize.Net merchant account through their acquirer.

![Yatra → Settings → Payment → Authorize.Net panel](/screenshots/gateways/authorize-net-settings.webp)

### Before you start

- You need an active Authorize.Net merchant account. Sign up at <https://www.authorize.net/sign-up/>.
- For development, register a free sandbox account at <https://developer.authorize.net/hello_world/sandbox/>.

### Step 1 — Get API Login ID and Transaction Key

1. Sign in to **Merchant Interface**: <https://account.authorize.net/> (live) or <https://sandbox.authorize.net/> (sandbox).
2. In the left menu pick **Account → Settings → Security Settings → General Security Settings → API Credentials & Keys**.
3. The **API Login ID** is shown plainly. Copy it.
4. To generate a new **Transaction Key**:
   - Select *New Transaction Key*.
   - Click **Submit** — Authorize.Net emails you a verification PIN.
   - Enter the PIN. The new key is shown **once**. Copy it immediately.

### Step 2 — Get the Public Client Key

Still on **API Credentials & Keys**:

1. Scroll to **Public Client Key**.
2. Click **Submit** to generate one if it's empty.
3. Copy the key. This is what Yatra uses for Accept.js to tokenize card data in the browser.

### Step 3 — Paste in Yatra

| Yatra field              | Setting ID            | Notes                                                              |
| ---                      | ---                   | ---                                                                |
| **API Login ID**         | `api_login_id`        | From step 1.                                                       |
| **Transaction Key**      | `transaction_key`     | From step 1.                                                       |
| **Public Client Key**    | `public_client_key`   | From step 2 — required for Accept.js card tokenisation.            |

Sandbox URL: `https://sandbox.authorize.net`. The global *Test mode* flag flips between live and sandbox endpoints.

### Useful links

- Live Merchant Interface: <https://account.authorize.net/>
- Sandbox Merchant Interface: <https://sandbox.authorize.net/>
- Sandbox sign-up: <https://developer.authorize.net/hello_world/sandbox/>
- Test credit cards: <https://developer.authorize.net/hello_world/testing_guide.html>

---

## Regional gateways <span class="pro-pill">PRO 3.3</span>

Yatra Pro 3.3 adds five gateways for markets where Stripe and PayPal are not an option. They all work the same way:

1. At checkout the customer picks the gateway and clicks **Pay Now**.
2. They are sent to the gateway's own secure payment page and pay there.
3. They come back to the booking confirmation page.
4. Yatra asks the gateway whether the payment went through — both when the customer comes back and when the gateway's notification arrives — and records it once, for the amount the gateway says was paid.

A payment is only recorded if the gateway confirms it, for that booking, in the booking's currency. Each gateway accepts only its own currencies; if the booking is in another currency the customer sees a clear message and can choose a different payment method. They need **Yatra 3.2 or later** (with an older Yatra they are not offered). The global **Test mode** switch decides whether Yatra talks to the gateway's sandbox or live system, so use sandbox credentials while it is on.

::: warning Local and staging sites
Gateways send their notifications from the internet. A site on `localhost` or behind a password can't receive them. Payments still confirm when the customer comes back to the site (PayU, Midtrans and Himalayan Bank always; PayHere when the App ID/Secret is set), but test on a public URL before going live.
:::

### Himalayan Bank (Nepal)

Card payments through Himalayan Bank's 2C2P "PACO" payment page. NPR or USD.

**What Himalayan Bank gives you** when your merchant account is approved: an **Office ID**, an **API key**, and two **PACO public keys** (one for signing, one for encryption).

**What you make yourself:** two RSA key pairs (4096-bit). Send Himalayan Bank the two *public* keys and keep the private ones. For example:

```bash
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out signing-private.pem
openssl pkey -in signing-private.pem -pubout -out signing-public.pem
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out encryption-private.pem
openssl pkey -in encryption-private.pem -pubout -out encryption-public.pem
```

| Yatra field | Setting ID | Notes |
| --- | --- | --- |
| **Office ID (Merchant ID)** | `office_id` | From Himalayan Bank. |
| **API Key** | `api_key` | From Himalayan Bank. |
| **Your signing private key** | `merchant_signing_private_key` | Contents of `signing-private.pem`. |
| **Your encryption private key** | `merchant_decryption_private_key` | Contents of `encryption-private.pem`. |
| **PACO signing public key** | `paco_signing_public_key` | From Himalayan Bank. |
| **PACO encryption public key** | `paco_encryption_public_key` | From Himalayan Bank. |
| **Encryption key ID** | `encryption_key_id` | Leave empty — Yatra uses 2C2P's published key ID for test or live. Fill it only if the bank gave you a different one. |
| **Ask for 3-D Secure** | `request_3ds` | Keep on. |
| **API version** | `api_version` | 1.0 unless the bank says otherwise. |
| **Backend notification URL** | — | Read-only. Give it to the bank if they ask for your *backend URL*. |

Paste each key with its `-----BEGIN …-----` and `-----END …-----` lines. Test mode uses the PACO UAT system (`core.demo-paco.2c2p.com`); live uses `core.paco.2c2p.com`. Production accounts may also need your server's IP address whitelisted by the bank.

### PayU (India)

UPI, cards, net banking and wallets through PayU Hosted Checkout. INR only.

1. In the PayU Dashboard switch to **Test Mode** and open **Developers → API Keys** to get a test **Merchant Key** and **Salt** (live keys are on the same page in live mode).
2. Paste them into **Merchant Key** (`merchant_key`) and **Merchant Salt** (`merchant_salt`). Use the 32-bit (v1) salt.
3. Optional: in **Developers → Webhooks**, add the **Webhook URL** shown in Yatra for *Payments* (Successful and Failed). Payments also confirm without it when the customer comes back.

PayU sends the customer back to a short address on your site (`/?ypayu=…`) because PayU allows only 50 characters for it; Yatra then forwards them to the booking confirmation page. Refunds can be sent back through PayU from the booking screen.

### PayFast (South Africa)

Cards, Instant EFT, SnapScan, Zapper and more. ZAR only.

1. For testing, create a free sandbox account at <https://sandbox.payfast.co.za>. For live, use your PayFast account.
2. In **Settings → Integration**, copy the **Merchant ID** and **Merchant Key** into Yatra.
3. If a **Salt passphrase** is set there, enter exactly the same one in Yatra (`passphrase`). If it doesn't match, PayFast shows "Generated signature does not match submitted signature".

There's nothing else to set up: Yatra tells PayFast where to send its payment notification (ITN) with every payment. Yatra accepts a notification only if its signature matches **and** PayFast confirms it is genuine.

### Midtrans (Indonesia)

Cards, virtual-account bank transfer, GoPay, ShopeePay, QRIS and more through Midtrans Snap. IDR only, whole rupiah.

1. In the Midtrans Dashboard open **Settings → Access Keys** and copy the **Server Key** (sandbox keys start with `SB-Mid-server-`).
2. Paste it into **Server Key** (`server_key`).
3. In **Settings → Configuration**, set **Payment Notification URL** to the URL shown in Yatra.

Refunds of card, GoPay, ShopeePay, DANA, OVO and QRIS payments can be sent back through Midtrans from the booking screen. Bank transfer (VA) and convenience-store payments must be refunded outside Midtrans.

### PayHere (Sri Lanka)

Cards, eZ Cash, mCash, Genie and bank apps. LKR, USD, GBP, EUR or AUD (as enabled on your PayHere account).

1. In PayHere go to **Settings → Domains & Credentials**, add your website's domain and wait for approval (up to a day). Copy the **Merchant ID** and the **Merchant Secret** for that domain. Each domain has its own secret — a staging site needs its own.
2. Paste them into **Merchant ID** (`merchant_id`) and **Merchant Secret** (`merchant_secret`).
3. Optional but recommended: in **Settings → API Keys**, create an API key (allowed domain: your site) and paste its **App ID** and **App Secret**. With these, Yatra can look a payment up itself when PayHere's notification doesn't reach your site.

Sandbox: sign up at <https://sandbox.payhere.lk>. Test cards: Visa `4916217501611292`, Mastercard `5307732125531191` (any name, CVV and future expiry).

---

<a id="bank-transfer"></a>

## Bank Transfer

**Free from Yatra 3.2.** Before 3.2 it was a Yatra Pro gateway. Sites that already used it with Yatra Pro keep their bank details — nothing to set up again. (With Yatra 3.2 or later, Yatra Pro no longer adds its own copy; with an older free plugin, Yatra Pro still provides it.)

No external account and no credentials. The customer picks **Bank Transfer** at checkout and sees your bank details, with the booking reference to use as the **Payment Reference**:

- on the booking confirmation page, with the payment deadline;
- on the invoice;
- in the booking email (new in 3.2 — the email used to say the details would be sent "separately").

![Yatra → Settings → Payment → Bank Transfer panel](/screenshots/gateways/bank-transfer-settings.webp)

To set it up, open <span class="screen-path">Yatra → Settings → Payment</span>, enable **Bank Transfer** and fill in its settings:

| Yatra field                 | Setting ID          | Notes                                                              |
| ---                         | ---                 | ---                                                                |
| **Bank Name**               | `bank_name`         | Shown to the customer.                                             |
| **Account Name**            | `account_name`      | The account holder.                                                |
| **Account Number**          | `account_number`    | Or IBAN.                                                           |
| **Routing/SWIFT Code**      | `routing_code`      | IBAN, SWIFT, ABA — whichever your bank requires. Free text.        |
| **Account currency (optional)** | `account_currency` | 3.3+. Show this account only for bookings in this currency, e.g. `EUR`. Leave empty for every booking. |
| **More bank accounts**      | `extra_accounts`    | 3.3+. Up to 10 more accounts — see below.                          |
| **Additional Instructions** | `instructions`      | Free text shown to the customer with the bank details.             |

### Several bank accounts, per currency (3.3+)

If you take payments into more than one account — for example a EUR account and a USD account, or one account per country — add them under **More bank accounts**:

1. Click **Add another bank account** (up to 10).
2. Fill in **Label (e.g. Euro account)**, **Currency (e.g. EUR)**, **Bank Name**, **Account Name**, **Account Number / IBAN** and **Routing/SWIFT Code**. An account needs at least a bank name or an account number to be shown.
3. Optionally set **Account currency** on the main account too.
4. Save.

Which accounts a customer sees depends on the **booking's currency**: every account whose currency matches, plus every account with no currency set. If no account matches, the main account is shown. When more than one account is shown, each gets a heading — its label (or *Account 1*, *Account 2* …) followed by the currency. The same list appears on the confirmation page, the invoice and the booking email. Sites with one account don't need to change anything.

Developers can change the list with the `yatra_bank_transfer_accounts` filter (`$accounts, $currency, $gateway`).

A Bank Transfer booking stays **Pending** until you confirm the money arrived. When it does, open the booking and click **Record payment** (choose *Bank transfer*) — see [Manage a booking → Record a payment](/booking-workspace#record-a-payment). The gateway's title, description and instructions can be translated with WPML or Polylang — see [Multilingual sites](/multilingual).

<a id="cheque"></a>

## Cheque

**Free from Yatra 3.3.** For customers who pay by posting a cheque. No external account and no credentials.

Open <span class="screen-path">Yatra → Settings → Payment</span>, enable **Cheque** and fill in its settings:

| Yatra field | Setting ID | Notes |
| --- | --- | --- |
| **Make cheques payable to** | `payee` | The name on your account, as it must appear on the cheque. **Required.** |
| **Send cheques to** | `address` | The postal address customers send the cheque to (several lines). **Required.** |
| **Additional Instructions** | `instructions` | Shown to the customer with the details. Empty = *Please write the payment reference on the back of the cheque.* |

The gateway is only offered at checkout once both **Make cheques payable to** and **Send cheques to** are filled in.

At checkout the customer sees **Cheque** — *Pay by cheque. Where to send it is shown after you book and sent by email.* After booking, a **Paying by cheque** box shows who to pay, where to send it, the booking reference to use as the **Payment Reference** and the amount — on the confirmation page and the invoice.

A cheque booking stays **Pending** until you record the payment: when the cheque clears, open the booking and click **Record payment** — see [Manage a booking → Record a payment](/booking-workspace#record-a-payment).

::: tip Cheque bookings don't expire
Cheques take days to arrive by post, so unpaid cheque bookings are **never cancelled by the unpaid-booking expiry** (*Settings → Booking → Booking Expiry*), just like Pay Later bookings. Developers can add other payment methods to this exemption with the `yatra_booking_expiry_exempt_gateways` filter (default `['cheque']`).
:::

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Twelve premium gateways — one license</span>
  </div>
  <p class="pro-callout__desc">Stripe, Razorpay, Mollie, Paystack, Square, Authorize.Net, T-Bank and (from Pro 3.3) Himalayan Bank, PayU, PayFast, Midtrans and PayHere all unlock with a single Yatra Pro license.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs">Compare Yatra Pro plans →</a>
</div>

---

## Deposits, partial & scheduled payments <span class="pro-pill">PRO</span>

These three flows live above the gateway list on **Settings → Payment** — they apply universally regardless of which gateway the customer picks. Full schema reference: [Settings → Payment](/settings#_5-payment).

| Flow                | Key fields                                                                                                  |
| ---                 | ---                                                                                                         |
| **Partial payment** | `partial_payment` (toggle), `partial_payment_percentage` — customer pays a percentage at booking, the rest later. |
| **Deposit**         | `deposit_required` (toggle), `deposit_percentage` — a percentage charged upfront before the booking is held. |
| **Scheduled balance** | `enable_scheduled_payments`, `scheduled_payment_type` (`single` / `installments`), `scheduled_payment_days`, `scheduled_payment_installments`, `scheduled_payment_interval`, `scheduled_payment_reminder_days`. |

Per-trip overrides live in the **Advanced** section of the Trip Builder (see [Create a trip → 4.1 Advanced Settings](/trip-creation#_4-1-advanced-settings)).

### The Scheduled Payments screen <span class="pro-pill">PRO</span>

Open <span class="screen-path">Yatra → Payments → Scheduled</span>. The entry appears under **Payments** only while the **Scheduled Payments** module is enabled. It lists every balance payment Yatra has scheduled:

| Column | Notes |
| ---    | ---   |
| **Booking** | Booking reference and customer. Flags a booking that no longer exists. |
| **Amount** | The balance to collect, in the booking's currency. |
| **Scheduled for** | When it will be collected. |
| **Collection** | **Auto-charge** (a saved card is charged off-session) or **Payment link** (the customer is emailed a secure link). |
| **Status** | Scheduled, Processing, Paid, Failed or Cancelled — with the last error and attempt count on a failure. |

Filter by status, or search by booking reference or customer. The row menu opens the booking, and can **Cancel scheduled payment** for anything that has not run yet (a paid row is payment history and cannot be cancelled). Cancelling stops the automatic collection only — the booking keeps its outstanding balance for you to collect manually.

### The Outstanding tab

The **Scheduled** tab only shows what Yatra collects on its own. Switch to **Outstanding** for the other half: every confirmed or pending booking that still owes money and has *nothing* scheduled to collect it — the deposits taken by bank transfer, Pay Later or recorded by hand.

| Column | Notes |
| ---    | ---   |
| **Booking** | Reference and customer. |
| **Outstanding** | Amount still due, with how much of the total is already paid. |
| **Tour date** | Departure date and how many days away it is. |
| **Not scheduled because** | *No payment received yet*, *Balance due is anchored to the booking date*, *Booking has no tour date*, *Reminder starts closer to the tour*, or *Reminder goes out on the next daily run*. |

The row menu can **Send balance payment link** — it emails the customer the same secure pay link the reminder cron uses, immediately, instead of waiting for the daily scan's window. Doing so records a schedule row, so the send is visible on the Scheduled tab and a second click cannot send a duplicate. A booking drops off this tab as soon as it is paid or has an active schedule.

### When is a balance payment actually scheduled?

A row exists only when Yatra has something to collect automatically. Nothing is scheduled — and the list stays empty — unless one of these applies:

- **Auto-charge** — the deposit was captured by a gateway that saved a reusable card (the module turns card-saving on for you). Deposits paid by bank transfer, Pay Later, or recorded manually by an admin save no card, so nothing can be auto-charged.
- **Payment link** — a daily scan creates a link-based reminder row, but **only when *Balance due* is anchored to the tour date** (`balance_anchor = tour`). With the default booking-date anchor this scan does nothing.

An outstanding balance itself is **not** a scheduled payment: it is stored on the booking (`total_amount`, `amount_paid`, `amount_due`) and shown on the booking and in [Payments](#the-payments-admin). A balance with no scheduled row is simply one you collect yourself.

### What happens when a booking is cancelled or deleted

- **Cancelled, refunded or trashed** — the booking's scheduled payments are set to **Cancelled** straight away. Rows that already ran (Paid / Failed) are left alone as history.
- **Deleted** — the scheduled payments are deleted with it.
- Nothing is ever charged against a booking that is cancelled or gone, independently of the above: the balance is re-checked immediately before every charge, and the charge is capped at the balance still due. Reminder emails apply the same rules, so a cancelled booking's customer is never chased for a balance.

---

## Payment links (free)

From Yatra 3.2 you can ask a customer to pay any part of a booking's balance with a **payment link** — open the booking and click **Payment link**. The link opens Yatra's balance checkout for exactly that amount, works once, expires after 14 days, can be cancelled, and can be emailed to the customer straight away. It needs at least one online payment method (PayPal, or a Pro card gateway); Pay Later and Bank Transfer can't pay a link.

This is separate from the Pro **Scheduled Payments** balance links above. Full steps: [Manage a booking → Send a payment link](/booking-workspace#send-a-payment-link).

---

## The Payments admin

![Payments admin — full payment ledger with status / method / sort](/screenshots/payments/payments-list.webp)

Open <span class="screen-path">Yatra → Payments</span>. You'll see every payment record across all bookings.

- **Search** by payment number, customer, or transaction ID.
- **Status filter** — All / Completed / Pending / Partial / Failed / Refunded / Cancelled.
- **Method filter** — filter by gateway.
- **Sort** — by Payment Date or Payment Number (asc / desc).
- **Default columns** — Payment, Customer, Booking, Amount, Method, Status, Date.

### Bulk actions

Tick rows and pick:

- Mark as Completed
- Mark as Failed
- Mark as Refunded
- Mark as Cancelled
- Delete permanently

### Add a payment manually

![+ Add New Payment — record an offline payment manually](/screenshots/payments/payments-create.webp)

Click **+ Add New Payment** to record an offline payment (cash, wire, cheque):

| Field             | Notes                                                                                                       |
| ---               | ---                                                                                                         |
| **Booking**       | Searchable dropdown (search by booking code, customer name, or email).                                      |
| **Amount**        | Number with the currency's decimal places.                                                                  |
| **Payment Method** | Select — Credit Card / Debit Card / PayPal / Bank Transfer / Cash / Check / Other.                          |
| **Payment Date**  | Date picker — cannot be in the future. Default = today.                                                     |
| **Transaction ID** | Optional reference (`TXN-12345`, internal ledger ID, etc.).                                                |
| **Notes**         | Internal-only text.                                                                                         |
| **Payment Status** | Sidebar select — Pending / Completed / Partial / Failed / Refunded / Cancelled. Default = `pending`.        |

Click **Save Payment**. The booking's **Due Now** updates instantly.

---

## Refunds

From Yatra 3.2, refund a payment from the **booking** screen: open the booking, find the payment, and click **Refund**. The refund is added to the booking's ledger next to the original payment.

| Payment made with | What **Refund** does |
| --- | --- |
| **PayPal** (Advanced / API mode) | Can send the money back through PayPal and record it in one step (tick *Send the money back through PayPal*), or just record a refund you made yourself. If PayPal refuses, its reason is shown and nothing is recorded. |
| **Stripe** <span class="pro-pill">PRO</span> | Same, through Stripe — with Yatra Pro 3.2 or later. Refunds in the payment's own currency. |
| **PayU**, **Midtrans** <span class="pro-pill">PRO 3.3</span> | Can send the money back through the gateway, as above. Midtrans can't refund bank-transfer (VA) or convenience-store payments; PayU refunds settle a day or two later. |
| **PayPal** (Simple mode), **Razorpay / Mollie / Paystack / Square / Authorize.Net / T-Bank / Himalayan Bank / PayFast / PayHere**, **Pay Later / Bank Transfer** | Records the refund only. Send the money from the provider's dashboard or your bank first. |

Full steps: [Manage a booking → Refund a payment](/booking-workspace#refund-a-payment).

You can still mark a payment as refunded in <span class="screen-path">Yatra → Payments</span> (row → Edit → **Status: Refunded**, or the bulk action **Mark as Refunded**). That changes the payment's status only; it doesn't add a refund line to the booking's ledger or send any money.

## Test mode workflow

A safe way to test any gateway:

<ol class="step-list">
  <li>Confirm the global <strong>Test mode</strong> is on under <em>Settings → Payment → Global</em>.</li>
  <li>Paste sandbox / test keys into the gateway's settings card.</li>
  <li>Set up the gateway webhook in <em>sandbox</em> mode pointing to your <strong>staging</strong> URL.</li>
  <li>Book a trip as a fresh test customer with the gateway's test card or sandbox account.</li>
  <li>Verify: booking shows <strong>Confirmed</strong>, payment shows <strong>Completed</strong>, and the receipt email arrives.</li>
  <li>Switch the global Test mode off, paste live keys, switch the webhook to live mode, and run one small live transaction with a real card. Refund it via the gateway dashboard.</li>
</ol>

## Payment-flow security model (3.0.4+)

Yatra's payment endpoints enforce three guarantees out of the box. You don't need to configure anything — these run on every checkout — but it's useful to know how they affect testing.

**1. Server-authoritative amounts.** When the React checkout calls `POST /yatra/v1/payment/create-intent` with a `booking_id`, Yatra ignores any `amount` / `currency` in the request body and recomputes them from the stored booking row (`amount_due`, `currency`). A tampered front-end cannot pay $1 for a $1000 trip. If the amounts disagree, Yatra forces the server value and fires the `yatra_payment_amount_mismatch` action so you can wire it to a fraud-monitoring tool.

**2. Booking ownership.** `POST /yatra/v1/payment/confirm` and `GET /yatra/v1/payment/status/{id}` require either:

  - the requester is the registered user who owns the booking, **or**
  - the requester is an administrator (`manage_options`), **or**
  - the booking is a guest booking AND the request includes a matching `booking_token` (the short-lived transient set during checkout).

Anonymous reads of arbitrary booking IDs return `401`.

**3. Idempotent payment recording.** Each `(booking_id, transaction_id)` pair can only ever produce one row in the booking-payments table. A duplicate Stripe webhook, a re-clicked confirm button, or a parallel return-to-site + webhook race all collapse to a single payment record and a single confirmation email. Partial / deposit payments correctly accumulate `amount_paid` instead of being force-marked fully paid.

If you write a custom gateway, follow the same pattern by either calling `\Yatra\Repositories\PaymentRepository::findByTransactionId()` before inserting, or by extending `AbstractPaymentGateway::completePayment()`-style helpers that already include the guard.

## Webhook URLs (cheat sheet)

Every gateway uses the same webhook route: `/payment/webhook/{gateway}` (the gateway slug comes **after** `webhook`). Every gateway's settings panel shows its exact URL, pre-filled for your site.

```
https://yoursite.com/wp-json/yatra/v1/payment/webhook/paypal
https://yoursite.com/wp-json/yatra/v1/payment/webhook/stripe
https://yoursite.com/wp-json/yatra/v1/payment/webhook/razorpay
https://yoursite.com/wp-json/yatra/v1/payment/webhook/mollie
https://yoursite.com/wp-json/yatra/v1/payment/webhook/paystack
https://yoursite.com/wp-json/yatra/v1/payment/webhook/square
https://yoursite.com/wp-json/yatra/v1/payment/webhook/authorize_net
https://yoursite.com/wp-json/yatra/v1/payment/webhook/himalayan_bank
https://yoursite.com/wp-json/yatra/v1/payment/webhook/payu
https://yoursite.com/wp-json/yatra/v1/payment/webhook/payfast
https://yoursite.com/wp-json/yatra/v1/payment/webhook/midtrans
https://yoursite.com/wp-json/yatra/v1/payment/webhook/payhere
```

T-Bank is the exception: it uses `admin-ajax.php?action=yatra_tbank_notification`, shown in its panel. On sites without pretty permalinks the REST form is `https://yoursite.com/?rest_route=/yatra/v1/payment/webhook/{gateway}`.

## What's next

- [Email & notifications](/email-settings) — what fires after confirmation.
- [Settings → Payment](/settings#_5-payment) — the deposit / partial / scheduled-payment field reference.
- [Pro modules](/third-party-integrations) — every Pro feature, including Dynamic Pricing and Flexible Payments.
- [Troubleshooting](/troubleshooting).
