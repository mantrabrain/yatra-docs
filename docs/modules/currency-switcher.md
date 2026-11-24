---
title: Currency Switcher
description: Yatra Pro Currency Switcher (Growth and Scale) — visitors view trip prices in their own currency while browsing; bookings and payments stay in your store currency.
---

# Currency Switcher <span class="pro-pill">PRO</span>

Let visitors see your trip prices in **their own currency** while they browse — a small currency selector on trip and listing pages, using exchange rates you type in or rates updated daily.

The switcher only changes the prices **shown while browsing**. Every booking is still made, paid, emailed and invoiced in your **store currency**, and checkout tells the customer so.

::: info Plan and versions
**Yatra Pro — Growth or Scale plan.** New in Yatra Pro 3.2.0 and needs the free **Yatra 3.2.0 or later**.
:::

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Growth** or **Scale** | <span class="screen-path">Yatra → License</span> |
| Yatra (free) 3.2.0 or later | <span class="screen-path">Plugins</span> |
| Currency Switcher module enabled | <span class="screen-path">Yatra → Modules → Currency Switcher</span> |
| At least one extra currency with a rate | <span class="screen-path">Yatra → Settings → Currency</span> |

## Step 1 — Turn the module on

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Currency Switcher** (category *Sales*) → toggle on.

## Step 2 — Add currencies and rates

1. Open <span class="screen-path">Yatra → Settings → Currency</span>.
2. Below the store currency settings there is a **Currency switcher** card (it only appears while the module is on).
3. Click **Add currency**, type the three-letter code (for example `EUR`) and the rate.
   The rate is **how much of that currency one unit of your store currency is**. With a store currency of USD, `1 USD = 0.92` for EUR.
4. Repeat for each currency, then save.

Rules:

- Up to **20** currencies.
- Your store currency isn't added (it is always offered as the first choice).
- Rows with an invalid code, a duplicate code or a rate of zero are dropped when you save.

Until at least one currency is saved, the switcher does nothing and the shortcode isn't available.

### Optional — update the rates daily

Tick **Update rates daily (open.er-api.com — sends only the store currency code)** in the same card. Once a day, Yatra fetches the latest rates for your store currency from the free open.er-api.com service (no API key) and updates the rate of every currency in your list. Only your store currency code is sent.

- It runs on WP-Cron, so it needs normal site traffic or a real cron job.
- If the service can't be reached or returns no rate for a currency, the last rate is kept.
- Untick it to stop the daily update and keep your own rates.

## Step 3 — Show the switcher

### The floating switcher (automatic)

On **single trip pages** and **trip listing / destination / activity pages**, a small floating currency selector appears automatically. Nothing to set up.

Developers can turn the floating selector off and place the shortcode themselves:

```php
add_filter( 'yatra_currency_switcher_floating', '__return_false' );
```

### The shortcode

Place the selector anywhere — a header, sidebar or page:

```text
[yatra_currency_switcher]
```

It has no attributes. It lists your store currency first, then each currency you added, with its symbol.

### Links that set the currency

Add `?currency=EUR` to any page link to open it with that currency already chosen, for example `https://example.com/trips/everest-base-camp/?currency=EUR`. Handy for ads or newsletters aimed at one market. A code that isn't in your list is ignored.

## What the visitor sees

- They choose a currency in the selector; the page reloads with prices converted.
- Their choice is **remembered** (a cookie, kept for a year) as they browse other pages and on later visits.
- Converted: trip prices on trip pages and listings, the departure prices in the availability list (including the struck-through original price), and the totals the booking card recalculates as travellers are added.

## What always stays in your store currency

| Place | Currency |
| --- | --- |
| Checkout (booking page) | Store currency |
| The Cart page ([Multi-Trip Cart](/modules/multi-trip-cart)) | Store currency |
| Booking confirmation page | Store currency |
| My Account | Store currency (each booking's own currency) |
| Emails and invoices | Store currency |
| The WordPress admin | Store currency |
| The actual payment | Store currency |

When a visitor who browsed in another currency reaches checkout, the order summary says:

> You pay in USD. Prices shown in EUR while browsing were approximate.

(with your store currency and their chosen currency).

::: warning Converted prices are approximate
Customers always pay the store-currency amount. The converted price is your price × your rate, shown with that currency's symbol — it is not what their bank will charge.
:::

## Page caching

A page converted for one visitor must not be served to everyone else. When a visitor has chosen another currency, Yatra marks that page **not cacheable** (`DONOTCACHEPAGE`, no-cache headers and `Vary: Cookie`). Pages shown in your store currency stay cacheable as usual.

Changing the selector reloads the page with `?currency=` in the URL, so a page cache doesn't hand back the previous currency. If your CDN or cache ignores no-cache headers or caches by URL without query strings, exclude the `yatra_display_currency` cookie or the `currency` query parameter from caching.

## Troubleshooting

**No "Currency switcher" card in Settings → Currency** — the module isn't on, or your license isn't Growth or Scale.

**The selector doesn't appear** — add at least one currency with a rate and save. The floating selector only shows on trip and listing pages; use `[yatra_currency_switcher]` elsewhere.

**Rates never change** — "Update rates daily" is off, or WP-Cron isn't running on your site.

**A cached page shows the wrong currency** — see [Page caching](#page-caching).

## Developer reference

| Hook | Type | Purpose |
| --- | --- | --- |
| `yatra_currency_switcher_floating` | filter | Return `false` to hide the automatic floating selector. |
| `yatra_currency_switcher_cli` | filter | Return `true` to convert prices in WP-CLI requests (off by default). |
| `yatra_format_price_display` | filter (Yatra 3.2) | The free plugin's price-display hook the switcher uses. |

On trip pages the switcher also provides `window.yatraDisplayPrice(amount)`, which returns the converted, formatted price (or an empty string when no conversion applies). The daily update runs on the `yatra_currency_rates_update` cron event.

## Related

- [Payments](/payment-settings) — your store currency and payment methods.
- [Multi-Trip Cart](/modules/multi-trip-cart) — the other new Sales module in Yatra Pro 3.2.
- [Shortcodes](/shortcodes) — `[yatra_currency_switcher]`.
