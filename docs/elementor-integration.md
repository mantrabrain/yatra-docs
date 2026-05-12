---
title: Blocks & page builders
description: Use Yatra with the WordPress block editor (Gutenberg), Elementor, Divi, Bricks, and Oxygen — through Yatra's native blocks, shortcodes, and CPT-aware widgets.
---

# Blocks & page builders

Yatra cooperates with WordPress page builders rather than replacing them. Trip content lives as standard custom post types (`trip`, `destination`, `activity`, `trip-category`), and Yatra ships **native Gutenberg blocks** plus shortcodes for the most-used catalog components.

## Yatra blocks (Gutenberg)

Yatra registers native blocks under the **Yatra** block category. Each one mirrors the corresponding shortcode and supports inspector controls so you can tweak the look without typing attribute strings.

| Block                  | Shows                                                | Mirrors shortcode             |
| ---                    | ---                                                  | ---                           |
| **Yatra Trip**         | A trip grid / list with filters                      | `[yatra_trip]`                |
| **Yatra Destination**  | A destinations grid / list                           | `[yatra_destination]`         |
| **Yatra Activity**     | An activities grid / list                            | `[yatra_activity]`            |
| **Yatra Trip Category**| A trip-category grid / list                          | `[yatra_trip_category]`       |
| **Yatra Search**       | A trip-search form                                   | `[yatra_search]`              |
| **Yatra My Account**   | The customer-account page                            | `[yatra_my_account]`          |

To insert: in the editor, click the **+** add-block button → search for **Yatra**.

### Trip block — inspector controls

When you select the **Yatra Trip** block, the right sidebar shows:

- **View** — Grid or List.
- **Per page** — items per page.
- **Columns** — for the grid layout (1–4).
- **Order by** — Date, Title, Price, Featured Priority.
- **Order** — Ascending / Descending.
- **Featured Priority** — None / Featured / New / Limited. Filters or sorts by the trip's Featured Priority value.
- **Difficulty Level** — filter by chosen levels.
- **Destinations / Activities / Categories** — multi-select filters.
- **Pagination** — show / hide.

Most attributes mirror the shortcode 1:1 — see [Shortcodes](/shortcodes) for the full list.

<div class="ui-tip"><strong>About backward compatibility:</strong> the legacy <code>featured</code> attribute is now an alias for <code>featured_priority="featured"</code>. Existing blocks with <code>featured: true</code> auto-migrate to <code>featured_priority: "featured"</code> on first save.</div>

### Destination / Activity / Category blocks

Same pattern as the Trip block, but for the corresponding taxonomy. The card UI is the **whole card clickable** (CSS stretched-link) — clicking anywhere on the card opens the destination / activity / category archive.

## Elementor

Free Elementor + Yatra:

- **Shortcode widget** — drop in `[yatra_trip ...]` for a trip grid.
- **Posts widget** — set the **Source** to **Posts** and **Post Type** to **Trips** (`trip`). You then style cards with Elementor's controls.
- **Loop Grid** — works with `trip` as the source post type.

Elementor Pro users can build full **Single Trip** templates via the Theme Builder, using the Posts widget for title, content, image, and a Shortcode widget for the **Book now** CTA.

## Divi

- **Code Module** for shortcodes.
- **Theme Builder** — assign a Divi template to the **Trips** custom post type.
- **Blog module** — set **Post Type** to `trip` for a Divi-styled grid.

## Beaver Builder, Bricks, Oxygen

- Use a **Posts** module / element with the post type set to `trip`.
- Use a **Shortcode** module for the search / account forms.
- Use **Dynamic Data** to bind to trip meta (price, duration, difficulty, featured priority) for designer-controlled cards.

## Templating override (the universal escape hatch)

Every Yatra template can be overridden by your theme. Yatra looks in `wp-content/themes/{your-theme}/yatra/` first and falls back to the plugin defaults.

To customize a trip card:

```bash
mkdir -p wp-content/themes/your-theme/yatra/partials
cp wp-content/plugins/yatra/templates/partials/trip-card.php \
   wp-content/themes/your-theme/yatra/partials/trip-card.php
```

Then edit the copy in your theme. Plugin updates won't overwrite it.

### Frequently overridden templates

| Path (under `templates/`)                         | What it renders                              |
| ---                                               | ---                                          |
| `single-trip.php`                                 | Single trip page                             |
| `archive-trip.php`                                | Main `/trip/` archive                        |
| `partials/trip-card.php`                          | Trip card                                    |
| `partials/booking-content.php`                    | The booking / cart content shell             |
| `partials/single-trip/enquiry-modal.php`          | The "Make an Enquiry" modal                  |
| `partials/single-trip/itinerary.php`              | Itinerary tab                                |
| `my-account.php`, `booking.php`                   | Customer-facing virtual pages                |

## Caching, CDN, image plugins

- Exclude `/book/`, `/my-account/`, `/wp-json/yatra/v1/*` from full-page caching.
- Bypass cache for logged-in users on trip pages (so wishlist heart state, if enabled, is accurate).
- Lazy-loading images is fine — cards include explicit width/height for CLS.
- WebP via image plugins (ShortPixel, EWWW) works without changes.

## Translation plugins

Yatra's text domain is `yatra`.

- **Loco Translate** — in-WordPress translation editing.
- **WPML** — multilingual catalogs (trip content + UI strings).
- **Polylang** — register CPTs / taxonomies in Polylang settings.
- **TranslatePress / Weglot / GTranslate** — site-wide translation overlays.

## SEO plugins

Yoast SEO, Rank Math, and SEOPress all index Yatra trips correctly. Yatra's CPT and templates are SEO-friendly out of the box.

## Multisite

Yatra is `Network: true`. Each subsite gets its own data.

## What's next

- [Shortcodes](/shortcodes) — every shortcode and its attributes.
- [WooCommerce co-existence](/woocommerce-integration).
- [Pro modules](/third-party-integrations).
