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

| Module                                                       | Tier         | What it does                                                          |
| ---                                                          | ---          | ---                                                                   |
| [Google Calendar](/modules/google-calendar)                  | Personal +   | Two-way sync between Yatra departures and Google Calendar.            |
| [Additional Services](/modules/additional-services)          | Personal +   | Per-trip add-ons (transfers, gear hire, meal plans).                  |
| [Trip Consent](/modules/trip-consent)                        | Personal +   | Pre-trip waivers and consent forms with digital signature.            |
| [Email Automation](/modules/email-automation)                | Personal +   | Multi-step email sequences and full delivery logs.                    |
| [Dynamic Form Field](/modules/dynamic-form-field)            | Personal +   | Per-trip custom fields on the booking form.                           |
| [Advanced Discount](/modules/advanced-discount)              | Personal +   | Group / early-bird / last-minute / category-based discount rules.     |
| [Mailchimp](/modules/mailchimp)                              | Personal +   | Auto-subscribe customers to a Mailchimp audience after booking.       |
| [Facebook Pixel](/modules/facebook-pixel)                    | Personal +   | Drop the Facebook Pixel and fire the standard e-commerce events.      |
| [Google Analytics](/modules/google-analytics)                | Personal +   | GA4 measurement ID + GA4 e-commerce events for the booking flow.      |
| [Flexible Payments](/modules/flexible-payments)              | Personal +   | Deposits and partial payments at checkout.                            |
| [Scheduled Payments](/modules/scheduled-payments)            | Personal +   | Auto-charge the remaining balance on a future date.                   |
| [Dynamic Pricing](/modules/dynamic-pricing)                  | Personal +   | Demand-, season-, last-minute-based price adjustments.                |
| [Abandoned Booking Recovery](/modules/abandoned-booking-recovery) | Personal + | Recover lost checkouts via a 3-step email sequence.                |
| [Custom Landing Pages](/modules/custom-landing-pages)        | Personal +   | Trip-specific landing pages for paid traffic.                         |
| [AI Assistant](/modules/ai-assistant)                        | **Growth +** | Bring-your-own-key AI generation across trip editor, SEO, enquiries.  |
| [WhatsApp Notifications](/modules/whatsapp)                  | **Growth +** | Transactional WhatsApp Cloud API messages + inbound replies + widget. |
| [Channel Manager](/modules/channel-manager)                  | **Agency**   | Distribute trips to Viator, GetYourGuide & more OTAs. Real-time sync. |
| [Webhooks](/modules/webhooks)                                | **Agency**   | Signed outbound HTTPS webhooks to any CRM / Zapier / custom receiver. |
| [White Label](/modules/white-label)                          | **Agency**   | Full admin rebrand — logo, name, colors, menu, PDFs.                  |

## Common patterns

- **Where settings live** — modules with their own admin page get a dedicated entry in the left sidebar (e.g. <span class="screen-path">Yatra → Dynamic Pricing</span>). Modules that enhance existing screens slot in alongside them — Flexible Payments and Scheduled Payments live under <span class="screen-path">Yatra → Settings → Payment</span>; Dynamic Form Field adds a tab to the Trip Builder; Advanced Discount extends the existing Discounts page; Custom Landing Pages adds per-taxonomy fields under Settings. Each module page below tells you the exact path.
- **Toggling off** — disabling a module hides its UI but **does not delete its data**. Re-enabling restores everything in place.
