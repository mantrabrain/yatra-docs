---
title: Custom Landing Pages
description: Step-by-step setup for the Yatra Pro Custom Landing Pages module — replace the default destination / activity / category archives with any WordPress page you've built in Gutenberg, Elementor, or your favourite page builder.
prev:
  text: Abandoned Booking Recovery
  link: /modules/abandoned-booking-recovery
next:
  text: Mailchimp
  link: /modules/mailchimp
---

# Custom Landing Pages <span class="pro-pill">PRO</span>

![Destination / Activity / Category form — Landing Page picker added by this module](/screenshots/modules/custom-landing-page-picker.webp)

By default, the destination archive (`/destination/nepal/`) renders a basic catalog of every trip in that destination. With Custom Landing Pages enabled, you can point **any WordPress page** — built with your usual page builder — to act as the destination, activity, or category landing instead. Use it for SEO-optimised pages, paid-traffic landing pages, partner co-branded pages, or just to ditch the default template.

## What you'll need

| Thing                                | Where to get it                                                              |
| ---                                  | ---                                                                          |
| Yatra Pro license                    | <span class="screen-path">Yatra → License</span>                            |
| Custom Landing Pages module enabled  | <span class="screen-path">Yatra → Modules → Custom Landing Pages</span>     |
| A taxonomy term to customise         | A destination, activity, or trip category you've already created.            |
| A WordPress page built and published | Any page — Gutenberg, Elementor, Bricks, Divi, your favourite page builder. |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Custom Landing Pages** → toggle on.
3. A new **Landing page** picker appears on the edit form of every Destination, Activity, and Trip Category.

## Step 2 — Build the WordPress page

Build a normal WordPress page in your page builder of choice. Useful blocks / shortcodes to drop in:

- **`[yatra_trips destination="nepal" limit="9"]`** — render a filtered trip grid.
- **`[yatra_search]`** — drop the trip search box.
- **`[yatra_destination_card slug="nepal"]`** — render the destination's own card content.

See [Shortcodes](/shortcodes) for the full list.

Publish the page. Note its URL (e.g. `/discover-nepal/`).

## Step 3 — Link the page to the taxonomy term

1. Open <span class="screen-path">Yatra → Destinations</span> (or Activities / Categories).
2. Click the term you want to customise (e.g. *Nepal*).
3. Scroll to the **Landing page** field — searchable dropdown of every published WordPress page.
4. Pick your page → Save.

![Destination edit screen — Landing Page picker with the chosen page](/screenshots/modules/custom-landing-page-attach.webp)

## Step 4 — Verify

1. Open `/destination/nepal/` in a private browser window.
2. Yatra now 301-redirects (or renders, depending on settings) to your custom page at `/discover-nepal/`.
3. Catalog links elsewhere on the site (the trip list, the destination card on the trip page, etc.) also point at the new URL.

If you visit the original `/destination/nepal/` URL directly, the redirect is in place — you won't see the default archive any more for that destination.

## What changes when the module is on

| Surface                                              | Before module                  | After module + landing page assigned                |
| ---                                                  | ---                            | ---                                                 |
| Destination archive `/destination/nepal/`           | Default Yatra template         | Redirects to your custom WordPress page             |
| Destination card link on a trip's public page       | Default archive URL            | Custom page URL                                     |
| Activity archive `/activity/hiking/`                | Default Yatra template         | Redirects to your custom page (when assigned)       |
| Trip category archive `/trip-category/adventure/`   | Default Yatra template         | Redirects to your custom page (when assigned)       |
| Sitemap.xml                                          | Default archive URLs           | Custom page URLs                                    |
| Open Graph + Twitter Card meta for sharing          | Default archive meta           | Your custom-page meta (from your SEO plugin)        |

::: tip You can selectively customise
You don't have to override *every* destination / activity / category. Leave the Landing page field empty for terms where the default archive is fine.
:::

## Common patterns

| Use case                                                          | Setup                                                                                                                  |
| ---                                                               | ---                                                                                                                    |
| Marketing-driven destination landing                              | Page with hero, value props, testimonials, embedded `[yatra_trips destination="nepal"]` block.                         |
| Partner co-brand page (white-label deal)                          | Page with partner's logo + curated trip grid + custom CTA. Restrict via WP role-based plugin if you need access control. |
| Paid-traffic / Google Ads landing                                 | Single trip campaign page with `[yatra_trip_book id="123"]` directly above the fold.                                  |
| SEO-optimised "Best of Nepal" content piece                       | Long-form article + `[yatra_trips destination="nepal" featured="featured"]` further down the page.                    |

## Troubleshooting

**Visitors still see the default archive** — confirm the module is enabled AND the destination has a Landing page picked. Clear any caching plugin (the redirect uses WordPress 301s and gets cached aggressively).

**Redirect loops** — your custom page's slug overlaps with the default archive slug. Avoid naming your page `/destination/nepal/` or change the destination base under [Settings → Permalink](/settings#_11-permalink).

**Trip cards still link to `/destination/...`** — Yatra caches taxonomy link rendering for performance. Re-save the destination, OR run a permalink flush (`Settings → Permalinks → Save`).

**Page content is missing trip listings** — make sure the `[yatra_trips ...]` shortcode is rendered (not displayed as plain text). Some block themes break shortcode rendering inside Group blocks; use a Shortcode block directly.

## Useful links

- [Settings → Permalink](/settings#_11-permalink) — change the base slugs for destinations / activities / categories.
- [Shortcodes](/shortcodes) — the full list of `[yatra_*]` shortcodes you can drop into your custom page.
- [Hooks & filters](/hooks-filters) — `yatra_custom_landing_page_url`, `yatra_landing_page_redirect_args`.

## Where to read more

- [All modules](/modules#custom-landing-pages) — module catalog.
