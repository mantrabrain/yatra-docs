---
title: Custom Landing Pages
description: Trip-specific landing pages with their own URL, hero, and CTA — for paid traffic and partner deals.
prev:
  text: Abandoned Booking Recovery
  link: /modules/abandoned-booking-recovery
next:
  text: Pro modules — index
  link: /modules/
---

# Custom Landing Pages <span class="pro-pill">PRO</span>

Build **trip-specific landing pages** with their own URL, hero, copy, social proof, and CTA — without touching the canonical trip page. Useful for paid traffic, partnership deals, or A/B-testing different angles for the same trip.

## What problem it solves

When you run a Google Ad for "Bali yoga retreat", landing on the catalog trip page (with related-trips sidebar, all the upsells, full menu) often hurts conversion. A focused landing page with the *one* offer, the *one* CTA, and the *one* trust block typically converts 2-3× better.

## Enable

1. Toggle on at <span class="screen-path">Yatra → Modules → Custom Landing Pages</span>.
2. Pages are managed at <span class="screen-path">Pages → Add New</span> in WordPress — pick the **Yatra Landing Page** template from the Page Attributes box.

## Build a landing page

1. Create a new WP **Page** as you normally would.
2. In **Page Attributes**, set **Template** to **Yatra Landing Page**.
3. In the new **Yatra Landing** meta box that appears, configure:
   - **Trip to feature** — picker; this trip's price / availability / images become the page's source of truth.
   - **Hero variant** — photo full-bleed, video, or split-with-form.
   - **Headline + subhead overrides** — bypass the trip's default copy.
   - **CTA** — "Book now" (jumps to inline form), "Enquire" (opens the enquiry modal), or custom URL.
   - **Social proof** — pick which reviews / testimonials to show.
   - **Form variant** — full booking form, just email-capture, or none.
4. **Publish** at the slug of your choice (`/bali-yoga-special/`).

## Tracking

The landing page automatically tags every booking it generates with the source page slug, so you can attribute revenue per landing page in <span class="screen-path">Yatra → Reports</span> with the **Source** filter.

## Hooks

| Hook                                              | Type    | Purpose                                                  |
| ---                                               | ---     | ---                                                      |
| `yatra_landing_page_template_path`                | filter  | Override the template file used by the page template.    |
| `yatra_landing_page_attribution_meta`             | filter  | Mutate the booking attribution payload.                  |
