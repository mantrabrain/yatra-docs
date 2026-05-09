---
title: Shortcodes
description: Every shortcode Yatra registers — exact attributes, defaults, and copy-paste examples.
prev:
  text: Pro modules
  link: /third-party-integrations
next:
  text: Blocks & page builders
  link: /elementor-integration
---

# Shortcodes

Yatra ships eight shortcodes for placing trip catalogs, search, login and account UIs onto any page or post. The attribute lists below are taken directly from each shortcode class — defaults match what Yatra resolves to when you omit an attribute.

::: warning Yatra 3.x does not ship cart/checkout shortcodes
Older 2.x docs sometimes mention `[yatra_cart]`, `[yatra_checkout]`, or `[yatra_mini_cart]`. **These do not exist in Yatra 3.x.** The booking flow uses Yatra's virtual `/{booking_base}/{trip-slug}/` route (default `/book/...`), not a shortcode-driven page. See [Bookings & customers → Booking session and checkout flow](/booking-settings#booking-session-and-checkout-flow).
:::

## Shortcode index

| Shortcode                       | Purpose                                                  |
| ---                             | ---                                                      |
| `[yatra_trip]` (alias `[yatra_tour]`) | Trip listing with filters and pagination          |
| `[yatra_destination]`           | Destination cards                                        |
| `[yatra_activity]`              | Activity cards                                           |
| `[yatra_trip_category]`         | Trip-category cards (same layout as destinations)        |
| `[yatra_search]`                | Faceted search form                                      |
| `[yatra_login]`                 | Customer login form                                      |
| `[yatra_my_account]`            | Account dashboard for logged-in customers                |
| `[yatra_discount_and_deals]`    | Trips with active discounts                              |

All numeric ID attributes (e.g. `destination="3,7"`) are validated as digits — non-numeric values cause the attribute to be ignored.

---

## `[yatra_trip]` (Trip listing)

Class: `app/Shortcodes/TripShortcode.php`. Registered as both `yatra_trip` and `yatra_tour` (same handler — pick whichever reads better).

### Attributes

| Attribute            | Default      | Notes                                                                              |
| ---                  | ---          | ---                                                                                |
| `order`              | `asc`        | `asc` or `desc`                                                                    |
| `featured`           | `0`          | Back-compat alias — `featured="1"` maps to `featured_priority="featured"`          |
| `featured_priority`  | `""`         | One of `featured`, `new`, `limited` (mirrors the trip's *Categorization → Featured Priority*) |
| `per_page`           | `10`         | Trips per page                                                                     |
| `category`           | `""`         | Comma-separated trip-category **IDs** (digits only)                                |
| `destination`        | `""`         | Comma-separated destination **IDs**                                                |
| `activity`           | `""`         | Comma-separated activity **IDs**                                                   |
| `difficulty`         | `""`         | Comma-separated difficulty/fitness-level **IDs**                                   |
| `price_min`          | `""`         | Floor (in your currency)                                                           |
| `price_max`          | `""`         | Ceiling                                                                            |
| `duration_min`       | `""`         | Minimum duration in days                                                           |
| `duration_max`       | `""`         | Maximum duration in days                                                           |
| `search`             | `""`         | Search keyword                                                                     |
| `columns`            | `3`          | Grid columns (1–4 sensible)                                                        |
| `show_pagination`    | `yes`        | `yes` or `no`                                                                      |
| `title`              | `Our Trips`  | Heading rendered above the grid                                                    |

::: tip How attribute filtering works
- Omit an attribute or leave it blank to *not filter* on it (equivalent to "All published" in the block).
- Multiple attributes combine with **AND** (`destination="44" activity="12"` = trips matching both).
- Comma-separated values within one attribute combine with **OR** (`destination="44,55"` = either destination).
- If `featured` and `featured_priority` are both set, `featured_priority` wins.
:::

### Examples

```html
<!-- All trips, default order, 10 per page -->
[yatra_trip]

<!-- Featured trips only, 6 per page, 2-column grid -->
[yatra_trip featured_priority="featured" per_page="6" columns="2"]

<!-- Trips in two destinations, with a price ceiling -->
[yatra_trip destination="44,52" price_max="2500"]

<!-- Hard / extreme trips (difficulty IDs) -->
[yatra_trip difficulty="3,5" featured_priority="limited"]

<!-- New trips (matches "New" Featured Priority) -->
[yatra_trip featured_priority="new" per_page="9"]

<!-- Back-compat: equivalent to featured_priority="featured" -->
[yatra_trip featured="1"]
```

Pagination URL: append `?trip_page=2` (or use the rendered pagination links).

### Where to find the IDs

- **Destinations:** Yatra → Destinations (the ID is in the URL when you edit a destination).
- **Activities / Trip categories / Difficulty levels:** same pattern under their respective Yatra menus.

---

## `[yatra_destination]` (Destination showcase)

Class: `app/Shortcodes/DestinationShortcode.php`.

### Attributes

| Attribute            | Default                      |
| ---                  | ---                          |
| `order`              | `desc`                       |
| `per_page`           | `10`                         |
| `columns`            | `3`                          |
| `show_trip_count`    | `yes`                        |
| `show_description`   | `yes`                        |
| `show_image`         | `yes`                        |
| `show_pagination`    | `yes`                        |
| `destination`        | `""` (comma-separated **IDs**) |
| `hide_empty`         | `yes`                        |
| `featured_only`      | `no`                         |
| `title`              | `Destination Showcase`       |

### Examples

```html
[yatra_destination]
[yatra_destination featured_only="yes" per_page="6" columns="3"]
[yatra_destination destination="44,55,72" show_trip_count="no"]
```

::: tip Whole-card click target
Destination, Activity and Trip-category cards are now fully clickable (not just the title). Implementation uses the WAI-ARIA "stretched link" pattern so screen readers and crawlers see one canonical link per card.
:::

---

## `[yatra_activity]` (Activity listing)

Class: `app/Shortcodes/ActivityShortcode.php`.

### Attributes

| Attribute            | Default              |
| ---                  | ---                  |
| `order`              | `desc`               |
| `per_page`           | `10`                 |
| `columns`            | `3`                  |
| `show_trip_count`    | `yes`                |
| `show_description`   | `yes`                |
| `show_image`         | `yes`                |
| `show_pagination`    | `yes`                |
| `activity`           | `""` (CSV of **IDs**) |
| `hide_empty`         | `yes`                |
| `title`              | `Activity Listings`  |

### Example

```html
[yatra_activity columns="4" per_page="8"]
[yatra_activity activity="12,18,21"]
```

---

## `[yatra_trip_category]` (Trip categories)

Class: `app/Shortcodes/TripCategoryShortcode.php`. Same card layout as destinations, links use your trip-category permalink base.

### Attributes

| Attribute            | Default                |
| ---                  | ---                    |
| `order`              | `desc`                 |
| `per_page`           | `10`                   |
| `columns`            | `3`                    |
| `show_trip_count`    | `yes`                  |
| `show_description`   | `yes`                  |
| `show_image`         | `yes`                  |
| `show_pagination`    | `yes`                  |
| `category`           | `""` (CSV of **IDs**)  |
| `hide_empty`         | `yes`                  |
| `featured_only`      | `no`                   |
| `title`              | `Trip Categories`      |

### Pagination

Append `?trip_category_page=2` (separate from `?trip_page` so multiple paginated lists can co-exist).

---

## `[yatra_search]` (Search form)

Class: `app/Shortcodes/SearchShortcode.php`.

### Attributes

| Attribute              | Default          |
| ---                    | ---              |
| `show_filters`         | `yes`            |
| `show_categories`      | `yes`            |
| `show_destinations`    | `yes`            |
| `show_activities`      | `yes`            |
| `show_price_range`     | `yes`            |
| `show_duration`        | `yes`            |
| `show_difficulty`      | `yes`            |
| `placeholder`          | `Search trips…`  |
| `button_text`          | `Search`         |

### Examples

```html
<!-- Full search bar with all facets -->
[yatra_search]

<!-- Minimal search bar (keyword only) -->
[yatra_search show_filters="no" placeholder="Search our trips"]
```

The form submits via Yatra's search endpoint and renders results on the same page.

---

## `[yatra_login]` (Login form)

Class: `app/Shortcodes/LoginShortcode.php`. Customer-facing login (separate from `wp-login.php`).

### Attributes

| Attribute               | Default       |
| ---                     | ---           |
| `show_register`         | `yes`         |
| `show_forgot_password`  | `yes`         |
| `remember_me`           | `yes`         |
| `redirect_url`          | `""`          |
| `title`                 | `Sign in`     |
| `subtitle`              | `""`          |

```html
[yatra_login redirect_url="/my-account/" show_register="no"]
```

---

## `[yatra_my_account]` (Account dashboard)

Class: `app/Shortcodes/MyAccountShortcode.php`. The same React experience as the virtual `/my-account/` URL — bookings, profile, payments, documents, wishlist.

### Attributes (legacy — preserved for back-compat)

| Attribute         | Default | Effect on 3.x React UI |
| ---               | ---     | ---                    |
| `show_bookings`   | `yes`   | Cosmetic only          |
| `show_profile`    | `yes`   | Cosmetic only          |
| `show_wishlist`   | `yes`   | Cosmetic only          |
| `bookings_limit`  | `10`    | Ignored                |

The React UI loads its own configuration from the user's permissions and the active modules (e.g. saved trips appear when Pro is on and wishlist is enabled).

```html
[yatra_my_account]
```

---

## `[yatra_discount_and_deals]` (Discounted trips)

Class: `app/Shortcodes/DiscountAndDealsShortcode.php`.

### Attributes

| Attribute                | Default                          | Notes                                                       |
| ---                      | ---                              | ---                                                         |
| `order`                  | `asc`                            |                                                             |
| `per_page`               | `10`                             |                                                             |
| `columns`                | `3`                              |                                                             |
| `discount_type`          | `all`                            | `all`, `percentage`, `fixed`, or `group`                    |
| `min_discount`           | `""`                             |                                                             |
| `max_discount`           | `""`                             |                                                             |
| `category`               | `""`                             | **Term slugs** here (different from `[yatra_trip]` IDs)     |
| `destination`            | `""`                             | **Term slugs**                                              |
| `show_original_price`    | `yes`                            |                                                             |
| `show_percentage`        | `yes`                            |                                                             |
| `show_time_left`         | `yes`                            |                                                             |
| `show_pagination`        | `yes`                            |                                                             |
| `show_filters`           | `no`                             |                                                             |
| `title`                  | `Special Deals & Discounts`      |                                                             |

::: warning category and destination accept slugs here
Unlike `[yatra_trip]`, this shortcode's `category` and `destination` attributes match **term slugs**, not numeric IDs. This is intentional (it predates the unified ID-based filter) and kept for back-compat.
:::

```html
[yatra_discount_and_deals discount_type="percentage" min_discount="20"]
[yatra_discount_and_deals destination="nepal,patagonia" per_page="6"]
```

---

## Picking shortcodes vs blocks

| Need                                          | Best choice                  |
| ---                                           | ---                          |
| Editing in Gutenberg, want sidebar controls   | The matching block           |
| Editing in classic editor or page builders    | Shortcode                    |
| Inserting in a theme template / PHP           | `do_shortcode( '[yatra_trip ...]' )` or the block's render callback |
| Need to reuse the same widget config in many places | Shortcode (centralize via Reusable Block in Gutenberg if desired) |

For more on the block versions and using them in Elementor / other builders, see [Blocks & page builders](/elementor-integration).

---

## Filtering shortcode output

Each shortcode runs its query through the centralized `TripListingFilterBuilder` so the same filter logic applies whether you use the block or the shortcode. To customize:

- **Tweak query args:** filter `yatra_trip_listing_filters` (and the parallel `yatra_destination_listing_filters`, etc.).
- **Modify rendered HTML:** override the matching template in your child theme (e.g. `templates/shortcodes/yatra-trip.php`).
- **Replace card markup:** filter `yatra_trip_listing_card_html` to wrap, append, or replace the rendered card.

See [Hooks & filters](/hooks-filters#shortcodes-and-listings) for the full list.
