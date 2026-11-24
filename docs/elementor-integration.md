---
title: Blocks & page builders
description: Use Yatra with the WordPress block editor (Gutenberg), Elementor, Divi, Bricks, and Oxygen — through Yatra's 16 blocks, 13 Elementor widgets and shortcodes.
---

# Blocks & page builders

Yatra cooperates with WordPress page builders rather than replacing them. Trips, destinations, activities and trip categories live in Yatra's own database tables and are served by Yatra's own router — they are **not** WordPress posts or custom post types, so builder widgets that query posts (Posts, Loop Grid, Blog modules, Theme Builder post-type templates, Dynamic Data) can't list them. Yatra ships **16 blocks**, **13 Elementor widgets** and shortcodes for its catalog and trip components; use those inside any builder.

## Yatra blocks (Gutenberg)

Yatra registers **16 blocks** in the **Yatra** block category, plus 3 block patterns. The full list — with what each block shows and its settings — is on **[Blocks and Elementor widgets](/blocks)**.

| Group | Blocks |
| --- | --- |
| Listings | **Trip**, **Destination**, **Activity**, **Trip categories** (each mirrors its shortcode) |
| Site | **Trip Search**, **Trip Deals**, **Customer Login**, **My Account** (new in 3.2) |
| One part of a trip | **Trip Gallery**, **Trip Facts**, **Trip Booking Card**, **Trip Itinerary**, **Trip Includes & Excludes**, **Trip FAQ**, **Trip Map**, **Trip Reviews** (new in 3.2) |

Block themes also get a **Yatra Page Content** block (Theme category) that renders the current Yatra page inside a block template.

To insert: in the editor, click the **+** add-block button → search for **Yatra**.

### Trip block — inspector controls

When you select the **Trip** block, the right sidebar shows:

- **Title** — heading above the grid.
- **Number of Trips** — items per page.
- **Columns** — for the grid layout (1–6).
- **Order** — Ascending / Descending.
- **Featured Priority** — Any / Featured / New / Limited Time. Filters by the trip's Featured Priority value.
- **Difficulty levels** — filter by chosen levels.
- **Destinations / Activities / Trip categories** — multi-select filters.
- **Price min / max**, **Duration min / max (days)**, **Search** — further filters.
- **Card layout** — site default / Standard / Compact.
- **Show pagination** — show / hide.

Most attributes mirror the shortcode 1:1 — see [Shortcodes](/shortcodes) for the full list.

<div class="ui-tip"><strong>About backward compatibility:</strong> the legacy <code>featured</code> attribute is now an alias for <code>featured_priority="featured"</code>. Existing blocks with <code>featured: true</code> auto-migrate to <code>featured_priority: "featured"</code> on first save.</div>

### Destination / Activity / Category blocks

Same pattern as the Trip block, but for the corresponding taxonomy. The card UI is the **whole card clickable** (CSS stretched-link) — clicking anywhere on the card opens the destination / activity / category archive.

## Elementor

From Yatra 3.2, Yatra adds **13 widgets** in a **Yatra** category of the Elementor panel: Trip Search, Trip Grid, Trip Deals, Trip Gallery, Trip Facts, Trip Booking Card, Trip Itinerary, Trip Includes & Excludes, Trip FAQ, Trip Map, Trip Reviews, Customer Login and My Account. They load only when Elementor is active and print exactly the blocks' markup. See [Blocks and Elementor widgets](/blocks#elementor-widgets).

Also with Elementor:

- **Shortcode widget** — for the Destination, Activity and Trip categories grids (no Elementor widget) and the other [shortcodes](/shortcodes).
- **Theme Builder header / footer** — Yatra loads your Elementor kit styles and header/footer templates on its own pages (trip, listing, booking, destination, activity and category pages), so they match the rest of the site.

The Posts widget, Loop Grid and Single-post Theme Builder templates can't target trips, because trips aren't WordPress posts. To lay out a trip page in Elementor, use the trip-section widgets on a page and pick the trip in each widget.

## Divi

- **Code Module** for shortcodes.

## Beaver Builder, Bricks, Oxygen

- Use a **Shortcode** module / element for trip grids and the search / account forms.

## Templating override (the universal escape hatch)

Yatra's page templates and single-trip partials can be overridden by your theme. Yatra looks in `wp-content/themes/{your-theme}/yatra/` first and falls back to the plugin defaults.

To customize the trip hero:

```bash
mkdir -p wp-content/themes/your-theme/yatra/partials/single-trip
cp wp-content/plugins/yatra/templates/partials/single-trip/hero.php \
   wp-content/themes/your-theme/yatra/partials/single-trip/hero.php
```

Then edit the copy in your theme. Plugin updates won't overwrite it.

### Frequently overridden templates

| Path (under `templates/`)                         | What it renders                              |
| ---                                               | ---                                          |
| `single-trip.php`                                 | Single trip page                             |
| `listing-trip.php`                                | Main trip listing                            |
| `partials/single-trip/enquiry-modal.php`          | The "Make an Enquiry" modal                  |
| `partials/single-trip/content-itinerary.php`      | Itinerary tab                                |
| `account-page.php`, `booking.php`                 | Customer-facing virtual pages                |

The trip card (`trip-listing-card.php`) and the booking content shell (`partials/booking-content.php`) are included directly and can't be overridden from the theme; override the template that includes them instead.

## Caching, CDN, image plugins

- Yatra loads its CSS and JavaScript only on pages that show Yatra content (Yatra 3.2+). See [FAQs → Why don't Yatra's styles load on a page?](/faqs#why-don-t-yatra-s-styles-load-on-a-page).

- Exclude `/book/`, `/my-account/`, `/wp-json/yatra/v1/*` from full-page caching.
- Bypass cache for logged-in users on trip pages (so wishlist heart state, if enabled, is accurate).
- Lazy-loading images is fine — cards include explicit width/height for CLS.
- WebP via image plugins (ShortPixel, EWWW) works without changes.

## Translation plugins

Yatra's text domain is `yatra` (Yatra Pro: `yatra-pro`).

- **WPML / Polylang** — supported from Yatra 3.2. Trip pages, listings, the booking flow and My Account work in every language, and trip texts, destinations, activities, categories, customised customer emails and payment method names are translated on the plugin's string-translation screen. See [Multilingual sites](/multilingual). Trips aren't WordPress posts, so there are no per-language copies of a trip — its texts are translated as strings.
- **Loco Translate** — in-WordPress editing of Yatra's interface translations.
- **TranslatePress / Weglot / GTranslate** — site-wide translation overlays.
- To rename a few texts in your own language without a translation plugin, use [Settings → Labels](/settings#labels).

## SEO plugins

Yatra adds its trip, destination, activity and category URLs to the sitemaps of Yoast SEO, Rank Math and All in One SEO, and also serves its own sitemap.

## Multisite

Yatra stores its data in per-site tables, so each subsite gets its own data.

## What's next

- [Blocks and Elementor widgets](/blocks) — every block, pattern and widget.
- [Shortcodes](/shortcodes) — every shortcode and its attributes.
- [WooCommerce co-existence](/woocommerce-integration).
- [Pro modules](/third-party-integrations).
