---
title: Blocks and Elementor widgets
description: The 16 Yatra blocks for the WordPress block editor, the 3 block patterns, and the 13 Yatra widgets for Elementor — what each shows and how to use them. Free plugin.
---

# Blocks and Elementor widgets

**Plan:** Free. The trip-section blocks, Trip Search, Trip Deals, Customer Login, My Account, the block patterns and the Elementor widgets are new in **Yatra 3.2**.

Yatra adds **16 blocks** to the WordPress block editor and, when Elementor is active, **13 widgets** to Elementor. You can build a full trip landing page, a search hero or a deals section without shortcodes.

## Blocks for the block editor

To add a Yatra block: in the editor, click the **+** button and search for **Yatra**, or open the **Yatra** category in the block inserter.

### Listing and site blocks

| Block | What it shows | Main settings |
| --- | --- | --- |
| **Trip** | A grid of trips, with filters and pagination. Same as `[yatra_trip]`. | Title, number of trips, columns, order, featured priority, destinations, activities, categories, difficulty levels, price and duration range, search, card layout, pagination |
| **Destination** | Destination cards. Same as `[yatra_destination]`. | Destinations, columns, number, featured only, hide empty, trip count, description, image, pagination |
| **Activity** | Activity cards. Same as `[yatra_activity]`. | Activities, columns, number, hide empty, trip count, description, image, pagination |
| **Trip categories** | Trip category cards. Same as `[yatra_trip_category]`. | Categories, columns, number, featured only, hide empty, trip count, description, image, pagination |
| **Trip Search** | The trip search bar. | Show or hide each field: keyword, destination, activities, duration, budget, date |
| **Trip Deals** | A grid of discounted trips and special offers. | Number of trips, columns, order, card layout |
| **Customer Login** | The customer login and registration form. | Title, subtitle, show register link, show forgot-password link, remember me, redirect URL |
| **My Account** | The customer dashboard: bookings, profile and wishlist. Guests see a login prompt. | — |

### Trip-section blocks

These show one part of a trip, so you can lay out a trip page your own way:

| Block | What it shows |
| --- | --- |
| **Trip Gallery** | The trip's photo gallery, with the full-screen viewer. |
| **Trip Facts** | Duration, difficulty, group size, rating and other key facts. Option: show trip attributes. |
| **Trip Booking Card** | Price, departure date, travellers and the **Check availability** button. |
| **Trip Itinerary** | The day-by-day itinerary. |
| **Trip Includes & Excludes** | What the price includes and excludes. |
| **Trip FAQ** | The trip's frequently asked questions. |
| **Trip Map** | The starting point and itinerary route on a map. |
| **Trip Reviews** | The rating summary, reviews and review form. |

**Which trip they show.** Each trip-section block has a **Trip** setting:

- **Pick a trip** to show that trip on any page — a landing page, a campaign page, the home page.
- **Leave it empty** to follow the trip page the block is on. On a page that isn't a trip page, editors see the note "Choose a trip in the block settings"; visitors see nothing.

If the chosen trip is unpublished or deleted, editors see a note and visitors see nothing.

### Block patterns

Three ready-made layouts are in the **Yatra** pattern category (in the inserter, open **Patterns → Yatra**):

| Pattern | What it contains |
| --- | --- |
| **Trip landing page** | Gallery, facts, itinerary, inclusions, map, FAQ, booking card and reviews for one trip. |
| **Destination hero + trip grid** | A full-width hero with the trip search bar, followed by a grid of trips. |
| **Deals section** | A heading and a grid of discounted trips. |

Insert a pattern, then pick the trip (or adjust the filters) in each block's settings.

### Block themes

Block themes also get a **Yatra Page Content** block that renders the current Yatra page (trip, listing, booking, account) inside a Site Editor template. See [Blocks & page builders](/elementor-integration).

## Elementor widgets

When **Elementor** is active, Yatra adds 13 widgets in a **Yatra** category of the Elementor panel. They print exactly the same markup as the matching blocks, so they look the same.

| Elementor widget | Same as block |
| --- | --- |
| **Trip Search** | Trip Search |
| **Trip Grid** | Trip |
| **Trip Deals** | Trip Deals |
| **Trip Gallery** | Trip Gallery |
| **Trip Facts** | Trip Facts |
| **Trip Booking Card** | Trip Booking Card |
| **Trip Itinerary** | Trip Itinerary |
| **Trip Includes & Excludes** | Trip Includes & Excludes |
| **Trip FAQ** | Trip FAQ |
| **Trip Map** | Trip Map |
| **Trip Reviews** | Trip Reviews |
| **Customer Login** | Customer Login |
| **My Account** | My Account |

There are no Elementor widgets for the Destination, Activity or Trip categories grids — use Elementor's **Shortcode** widget with `[yatra_destination]`, `[yatra_activity]` or `[yatra_trip_category]` (see [Shortcodes](/shortcodes)).

The widgets load only when Elementor is active. The trip-section widgets work like the blocks: pick a trip, or leave it empty to follow the trip page they're on.

## Styles and scripts

Yatra loads its CSS and JavaScript only on pages that show Yatra content. A page with a Yatra block or Elementor widget in its content is detected automatically. See [FAQs → Why don't Yatra's styles load on a page?](/faqs#why-don-t-yatra-s-styles-load-on-a-page) if a block in a widget area or a page-builder header looks unstyled.

## Related

- [Shortcodes](/shortcodes) — the shortcode version of each listing block.
- [Blocks & page builders](/elementor-integration) — Divi, Bricks, Oxygen, template overrides, caching.
