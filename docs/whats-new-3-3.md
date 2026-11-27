---
title: New in Yatra 3.3
description: Everything added in Yatra 3.3 for your trip pages, checkout, payments and integrations — where to find each feature and how it behaves.
---

# New in Yatra 3.3

New settings are **off until you set them up**. Three things change on their own: the checkout shows a [progress bar](#progress-bar), trip [age limits are checked](#age-limits-are-checked), and trips migrated from Yatra 2.x with an external booking URL send customers to it again. Pro features are marked <span class="pro-pill">PRO</span>. Each section links to the full guide; release notes are in the [Changelog](/changelog).

[[toc]]

## Trip pages

### Custom booking link
<span class="screen-path">Trip → Availability & Booking → Custom Booking Link</span>. Send customers to another site to book (a partner, a channel). The trip page's booking card and mobile bar become a button to that link (new tab by default, your own button text), and Yatra's own checkout is closed for the trip. Links must start with `http://` or `https://`. An **enquiry-only** trip stays enquiry-only. Trips imported from Yatra 2.x with an external booking URL now use it. → [Create a trip → Custom booking link](/trip-creation#custom-booking-link)

### Trip code
<span class="screen-path">Trip → Trip Basics → Trip code</span>. Your own reference (e.g. *ABC-12*), shown in the trip's quick facts and available in emails as `{{trip_code}}`. → [Trip code](/trip-creation#trip-code)

### Price by group size
<span class="screen-path">Trip → Pricing → Price by group size</span> (trips priced per person). For example: 1 person 1,500 · 2–3 people 1,300 · 4 or more 1,100. When the number of travellers matches a row, that row's price is the price per person — it replaces the trip price (and departure prices); dynamic pricing, discounts, coupons and tax still apply. Group sizes outside every row keep the normal price. The trip page lists the group prices under the price. → [Price by group size](/trip-creation#price-by-group-size)

### Highest altitude and altitude chart
<span class="screen-path">Itinerary → day → Highest altitude</span>. Shown on each day and, with two or more days, as an altitude chart above the itinerary (also in the itinerary PDF).

### Weather forecast
<span class="screen-path">Settings → General → Weather Forecast</span>. A 7-day forecast for the trip's **start location** (its map coordinates) in the booking sidebar, from [Open-Meteo](https://open-meteo.com/). Only the trip's coordinates are sent — nothing about your visitors — and each place is cached for 3 hours; the page never waits for the weather service. Open-Meteo's free service is for **non-commercial use**: a business website should get an Open-Meteo API key and enter it here. → [Settings → Weather Forecast](/settings#weather-forecast) · [Troubleshooting](/troubleshooting#the-weather-forecast-doesn-t-show-on-trip-pages) · [REST route](/api-reference#weather-forecast)

### Recently viewed trips
<span class="screen-path">Settings → General → Recently Viewed Trips</span>. Shows a visitor the trips they looked at before, under each trip page. The list lives in the visitor's own browser (local storage); nothing is stored on your server. Also anywhere with `[yatra_recently_viewed title="Recently viewed" limit="4"]`. Mention it in your cookie policy if your law requires it. → [Settings → Recently Viewed Trips](/settings#recently-viewed-trips) · [Shortcode](/shortcodes#yatra-recently-viewed-recently-viewed-trips)

### Countdown, "booked N times", recent-booking popup <span class="pro-pill">PRO</span>
See [Countdown & Social Proof](/modules/social-proof).

### Guide profiles <span class="pro-pill">PRO</span>
See [Guides & Resources](/modules/guides-resources).

## Checkout

### Progress bar
A four-step bar (*Trip & date → Your details → Payment → Confirmation*) above the checkout form. Hide it with `add_filter('yatra_checkout_show_progress', '__return_false');`. → [Bookings → Checkout progress bar](/booking-settings#checkout-progress-bar-3-3)

### Accommodation options
<span class="screen-path">Trip → Availability & Booking → Accommodation Options</span>. Hotel categories or room types the customer chooses from at checkout (for example *Standard lodge — included*, *Deluxe hotel +120 per person*, *Private villa +500 per booking*). The **first option is preselected** (and used for bookings made without a choice, such as a cart or the API), so list your standard option first. The price updates in the summary as the customer chooses; the choice appears on the booking, the confirmation page, My Account, the departure manifest and in emails as `{{accommodation}}`. → [Create a trip → Accommodation options](/trip-creation#accommodation-options) · [At checkout](/booking-settings#accommodation-and-travel-insurance-at-checkout)

### Travel insurance
<span class="screen-path">Settings → Payment → Travel Insurance</span>. Offer insurance at checkout: a price per traveller, a percentage of the trip price, or per booking; your own name, description and policy link. The customer answers **Yes / No** (tick **Customers must say yes or no** to make them choose). A "No" is recorded too, so you can see who declined. A trip can opt out under <span class="screen-path">Availability & Booking</span>. Email tag `{{travel_insurance}}` (*Added* / *Declined*). → [Payments → Travel insurance](/payment-settings#travel-insurance) · [Trip opt-out](/trip-creation#travel-insurance-opt-out)

### Age limits are checked
A trip's minimum and maximum age are now checked against each traveller's date of birth (age on the travel date). Turn the check off with `add_filter('yatra_enforce_trip_age_limits', '__return_false');`. → [Create a trip → Age limits](/trip-creation#age-limits)

### Pickup point choice
See [Create a trip → Pickup points](/trip-creation#pickup-points).

### Enquiry form questions
<span class="screen-path">Settings → Booking → Enquiry Form</span>. Add up to 10 of your own questions to the trip enquiry form — short answer, paragraph, dropdown or checkbox, optional or required. The answers are added to the enquiry message, so they appear on the Enquiries screen and in the enquiry email. → [Bookings → Enquiry questions](/booking-settings#add-your-own-questions-to-the-enquiry-form-3-3)

## Payments

### Booking fee
<span class="screen-path">Settings → Payment → Booking Fee</span>. A fixed amount or a percentage of the trip price added to every new booking as its own line (your label, e.g. *Service fee*). Coupons, tax and deposits include it. A booking keeps the fee it was made with. → [Payments → Booking fee](/payment-settings#booking-fee)

### Bank transfer: several accounts, per currency
<span class="screen-path">Settings → Payment → Bank Transfer</span>. Give the main account a currency and add up to 10 more accounts. A booking shows the accounts in its currency plus those with no currency set — on the confirmation page, the invoice and the booking email. → [Payments → Several bank accounts](/payment-settings#several-bank-accounts-per-currency-3-3)

### Cheque
<span class="screen-path">Settings → Payment → Cheque</span>. A checkout option with *Make cheques payable to*, *Send cheques to* (a multi-line postal address) and instructions. Cheque bookings stay pending until you record the payment, and they are **not** cancelled by the unpaid-booking expiry (cheques take days by post). → [Payments → Cheque](/payment-settings#cheque)

### Regional gateways <span class="pro-pill">PRO</span>
Himalayan Bank, PayU, PayFast, Midtrans and PayHere — see [Payments → Regional gateways](/payment-settings#regional-gateways-pro-3-3).

## Emails

### Your logo and brand colour
<span class="screen-path">Yatra → Email → Delivery</span>. Put your company logo at the top of Yatra's emails and use your brand colour for the header band and buttons (the text colour on it is chosen for contrast). → [Email → Email branding](/email-settings#email-branding-logo-and-brand-colour)

### New merge tags
`{{pickup_point}}`, `{{pickup_time}}`, `{{pickup_point_details}}`, `{{accommodation}}`, `{{travel_insurance}}`, `{{trip_code}}`, and `{{departure_guides}}` with Guides & Resources <span class="pro-pill">PRO</span>. → [Email → Booking tags](/email-settings)

## Integrations

### API keys
<span class="screen-path">Settings → API Access</span>. Create keys for apps that use Yatra's REST API. A key is a WordPress **application password** for the user you choose and can do what that user can — make keys for a dedicated user with a Yatra staff role, not for an administrator. The key is shown once; revoke it any time. Requests use HTTP Basic auth:

```bash
curl -u "USER:xxxx xxxx xxxx xxxx xxxx xxxx" https://example.com/wp-json/yatra/v1/bookings
```

Application passwords need HTTPS (WordPress turns them off on plain http sites). → [Settings → API Access](/settings#api-access) · [REST API → API keys](/api-reference#api-keys)

### Embed trips on other websites
<span class="screen-path">Settings → API Access → Embed trips on other websites</span>. Switch it on, choose trips (or show your newest), how many and how many columns, and paste the snippet into the other site. It shows trip cards (photo, name, days, price) that open the trip on your site in a new tab; the frame resizes itself. The embed page is `/?yatra_embed=trips` and shows only published trips. → [REST API → Embed trips](/api-reference#embed-trips-on-other-websites)

### SliceWP affiliates
With [SliceWP](https://wordpress.org/plugins/slicewp/) active, switch on **Yatra** in <span class="screen-path">SliceWP → Settings → Integrations</span>. A booking made through the checkout by a visitor an affiliate referred gets a **pending** commission at SliceWP's sale rate, on the booking total before tax, in SliceWP's currency. It becomes **unpaid** (approved) when the booking is fully paid and **rejected** if the booking is cancelled or refunded; a commission already paid out is left alone. Affiliates booking for themselves earn nothing unless SliceWP allows it. → [SliceWP affiliates](/slicewp)

## For developers

Full list with arguments, plus the new REST routes: [Hooks & filters → Yatra 3.3 additions](/hooks-filters#yatra-3-3-additions) · [REST API](/api-reference).

| Hook | Kind | Since |
| --- | --- | --- |
| `yatra_trip_sidebar_after_price` | action (`$trip`) — under the price on the trip page's booking card | 3.3 |
| `yatra_trip_sidebar_after_card` | action (`$trip`) — after the booking card | 3.3 |
| `yatra_single_trip_after_tabs` | action (`$trip`) — after the trip page's content sections | 3.3 |
| `yatra_enquiry_custom_fields` | filter (`$fields`) — the enquiry questions | 3.3 |
| `yatra_travel_insurance_amount` | filter (`$amount, $tripId, $baseAmount, $travellers`) | 3.3 |
| `yatra_group_tier_price` | filter (`$tierPrice, $price, $tripId, $travellers`) | 3.3 |
| `yatra_booking_fee` | filter (`$fee, $baseAmount, $tripId`) | 3.3 |
| `yatra_bank_transfer_accounts` | filter (`$accounts, $currency, $gateway`) | 3.3 |
| `yatra_booking_expiry_exempt_gateways` | filter — methods whose unpaid bookings never expire (default `cheque`) | 3.3 |
| `yatra_weather_api_url` | filter (`$url, $lat, $lng`) — another Open-Meteo-compatible host | 3.3 |
| `yatra_recently_viewed_remember` | filter (`$remember, $trip`) — remember this trip in the browser | 3.3 |
| `yatra_email_branded_html` | filter (`$html`) — email HTML after branding | 3.3 |
| `yatra_slicewp_commission_amount` | filter (`$amount, $booking, $affiliateId`) | 3.3 |

Booking meta keys (all start with `_`, so they never appear in `{{booking_custom_fields_html}}`): `_accommodation`, `_travel_insurance`, `_booking_fee`, `_pickup_point`, `_private_trip`.
