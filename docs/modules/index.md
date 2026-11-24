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
3. An **active Pro license** under [Yatra → License](/installation#step-2-—-install-yatra-pro).
4. The module **toggled on** under [Yatra → Modules](/modules).

If a module page mentions a UI surface ("open <span class="screen-path">Yatra → Dynamic Pricing</span>"), that surface only appears once the module is on.

## All Pro modules

22 modules. **Starter +** = every Pro plan (Starter, Growth, Scale); **Growth +** = Growth and Scale; **Scale** = Scale only.

| Module                                                       | Plan         | What it does                                                          |
| ---                                                          | ---          | ---                                                                   |
| [Google Calendar](/modules/google-calendar)                  | Starter +   | One-way: pushes Yatra bookings to a Google Calendar.                  |
| [Additional Services](/modules/additional-services)          | Starter +   | Per-trip add-ons (transfers, gear hire, meal plans).                  |
| [Trip Consent](/modules/trip-consent)                        | Starter +   | Pre-trip waivers and consent forms with digital signature.            |
| [Email Automation](/modules/email-automation)                | Starter +   | Multi-step email sequences, your own booking and payment templates (per trip / payment method, in the customer's language), delivery logs. |
| [Dynamic Form Field](/modules/dynamic-form-field)            | Starter +   | Per-trip custom fields on the booking form.                           |
| [Advanced Discount](/modules/advanced-discount)              | Starter +   | Group / early-bird / last-minute / category-based discount rules.     |
| [Mailchimp](/modules/mailchimp)                              | Starter +   | Auto-subscribe customers to a Mailchimp audience after booking.       |
| [Facebook Pixel](/modules/facebook-pixel)                    | Starter +   | Meta Pixel + Conversions API: PageView, ViewContent, InitiateCheckout, Purchase. |
| [Google Analytics](/modules/google-analytics)                | Starter +   | GA4 measurement ID + GA4 e-commerce events for the booking flow.      |
| [Flexible Payments](/modules/flexible-payments)              | Starter +   | Deposits and partial payments at checkout.                            |
| [Scheduled Payments](/modules/scheduled-payments)            | Starter +   | Auto-charge the remaining balance on a future date.                   |
| [Dynamic Pricing](/modules/dynamic-pricing)                  | Starter +   | Demand-, season-, last-minute-based price adjustments.                |
| [Abandoned Booking Recovery](/modules/abandoned-booking-recovery) | Starter + | Recover lost checkouts with up to 3 reminder emails (1 h / 24 h / 48 h).                |
| [Custom Landing Pages](/modules/custom-landing-pages)        | Starter +   | Use any WordPress page as a destination / activity / category page.   |
| [AI Assistant](/modules/ai-assistant)                        | **Growth +** | Bring-your-own-key AI generation across trip editor, SEO, enquiries; MCP server for Claude, Cursor and other AI assistants (Pro 3.2). |
| [Currency Switcher](/modules/currency-switcher)              | **Growth +** | Visitors see trip prices in their chosen currency; checkout stays in your store currency (Pro 3.2, needs Yatra 3.2). |
| [Multi-Trip Cart](/modules/multi-trip-cart)                  | **Growth +** | Several trips and dates in one checkout and one payment; one booking per trip (Pro 3.2, needs Yatra 3.2). |
| [WhatsApp Notifications](/modules/whatsapp)                  | **Growth +** | Transactional WhatsApp Cloud API messages + inbound replies + widget. |
| [Channel Manager](/modules/channel-manager)                  | **Scale**   | Sell on GetYourGuide through its Supplier API, sharing one inventory with direct bookings (GetYourGuide must certify the connection). Viator in development. |
| [Webhooks](/modules/webhooks)                                | **Scale**   | Signed outbound HTTPS webhooks to any CRM / Zapier / custom receiver. |
| [White Label](/modules/white-label)                          | **Scale**   | Full admin rebrand — logo, name, colors, menu, PDFs.                  |
| [Team & Access](/modules/team-access)                        | **Scale**   | Roles & capabilities, audit log and staff invitations.                |

## Common patterns

- **Where settings live** — modules with their own admin page get a dedicated entry in the left sidebar (e.g. <span class="screen-path">Yatra → Dynamic Pricing</span>). Modules that enhance existing screens slot in alongside them — Flexible Payments and Scheduled Payments live under <span class="screen-path">Yatra → Settings → Payment</span>; Dynamic Form Field adds a tab to the Trip Builder; Advanced Discount extends the existing Discounts page; Custom Landing Pages adds a Landing page field to the Destination, Activity and Category forms. Each module page below tells you the exact path.
- **Toggling off** — disabling a module hides its UI but **does not delete its data**. Re-enabling restores everything in place.
