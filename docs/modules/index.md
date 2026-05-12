---
title: Pro modules — index
description: One page per Yatra Pro module — what it does, how to enable it, the admin UI walkthrough, and the hooks it exposes.
---

# Pro modules

This is the per-module reference for **Yatra Pro**. Each page below covers one module: what problem it solves, how to enable it, what its admin UI looks like, and the hooks / filters it exposes.

> Looking for a one-page catalog overview instead? See [All modules](/modules) for the flat marketing-style list.

## Activation requirements

Every module on this page requires:

1. The free **Yatra** plugin installed and active.
2. The **Yatra Pro** plugin installed and active.
3. An **active Pro license** under [Yatra → License](/installation#step-2-install-yatra-pro).
4. The module **toggled on** under [Yatra → Modules](/modules).

If a module page mentions a UI surface ("open <span class="screen-path">Yatra → Dynamic Pricing</span>"), that surface only appears once the module is on.

## All Pro modules

| Module                                                       | What it does                                                          |
| ---                                                          | ---                                                                   |
| [Google Calendar](/modules/google-calendar)                  | Two-way sync between Yatra departures and Google Calendar.            |
| [Additional Services](/modules/additional-services)          | Per-trip add-ons (transfers, gear hire, meal plans).                  |
| [Trip Consent](/modules/trip-consent)                        | Pre-trip waivers and consent forms with digital signature.            |
| [Email Automation](/modules/email-automation)                | Multi-step email sequences and full delivery logs.                    |
| [Dynamic Form Field](/modules/dynamic-form-field)            | Per-trip custom fields on the booking form.                           |
| [Advanced Discount](/modules/advanced-discount)              | Group / early-bird / last-minute / category-based discount rules.     |
| [Mailchimp](/modules/mailchimp)                              | Auto-subscribe customers to a Mailchimp audience after booking.       |
| [Facebook Pixel](/modules/facebook-pixel)                    | Drop the Facebook Pixel and fire the standard e-commerce events.      |
| [Google Analytics](/modules/google-analytics)                | GA4 measurement ID + GA4 e-commerce events for the booking flow.      |
| [Flexible Payments](/modules/flexible-payments)              | Deposits and partial payments at checkout.                            |
| [Scheduled Payments](/modules/scheduled-payments)            | Auto-charge the remaining balance on a future date.                   |
| [Dynamic Pricing](/modules/dynamic-pricing)                  | Demand-, season-, last-minute-based price adjustments.                |
| [Abandoned Booking Recovery](/modules/abandoned-booking-recovery) | Recover lost checkouts via a 3-step email sequence.               |
| [Custom Landing Pages](/modules/custom-landing-pages)        | Trip-specific landing pages for paid traffic.                         |

## Common patterns

- **Where settings live** — modules with their own admin page get an entry in the left sidebar (under <span class="screen-path">Yatra → ...</span>). Modules without a dedicated page surface as a section under [Settings → Integration](/settings#_10-integration) or as enhancements to existing screens (e.g. Dynamic Form Field adds a tab to the Trip Builder).
- **Hooks** — every module fires `yatra_pro_module_activated` on enable and `yatra_pro_module_settings_updated` after each save. Module-specific filters are listed on each page.
- **Toggling off** — disabling a module hides its UI but **does not delete its data**. Re-enabling restores everything in place.
