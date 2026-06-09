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

Yatra ships eight core (free) shortcodes for placing trip catalogs, search, login and account UIs onto any page or post. The attribute lists below are taken directly from each shortcode class — defaults match what Yatra resolves to when you omit an attribute. Yatra Pro adds a few module-specific shortcodes too — see [Pro shortcodes](#pro-shortcodes) at the end.

::: warning Yatra 3.x does not ship cart/checkout shortcodes
Older 2.x docs sometimes mention `[yatra_cart]`, `[yatra_checkout]`, or `[yatra_mini_cart]`. **These do not exist in Yatra 3.x.** The booking flow uses Yatra's virtual `/{booking_base}/{trip-slug}/` route (default `/book/...`), not a shortcode-driven page. See [Bookings & customers → Booking session and checkout flow](/booking-settings#booking-flow-on-the-front-end).
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

| Attribute            | Default                      | Notes |
| ---                  | ---                          | --- |
| `order`              | `desc`                       | `asc` or `desc` |
| `per_page`           | `10`                         | Items per page; `-1` shows all |
| `columns`            | `3`                          | Grid columns (1–6) |
| `show_trip_count`    | `yes`                        | Render the "*N* trips" badge on each card |
| `show_description`   | `yes`                        | Render the destination description excerpt |
| `show_image`         | `yes`                        | Render the destination thumbnail |
| `show_pagination`    | `yes`                        | Show pager links when more pages exist |
| `destination`        | `""` (comma-separated **IDs**) | Limit to specific destinations |
| `hide_empty`         | `no`                         | **Opt-in**: when set to `yes`, destinations with zero published trips are skipped. See *Empty-term filtering* below. |
| `featured_only`      | `no`                         | Only show destinations marked as featured |
| `title`              | `Destination Showcase`       | Heading rendered above the grid |

### Examples

```html
[yatra_destination]
[yatra_destination featured_only="yes" per_page="6" columns="3"]
[yatra_destination destination="44,55,72" show_trip_count="no"]
[yatra_destination hide_empty="yes"]
```

::: tip Whole-card click target
Destination, Activity and Trip-category cards are fully clickable (not just the title). Implementation uses the WAI-ARIA "stretched link" pattern so screen readers and crawlers see one canonical link per card.
:::

---

## `[yatra_activity]` (Activity listing)

Class: `app/Shortcodes/ActivityShortcode.php`.

### Attributes

| Attribute            | Default              | Notes |
| ---                  | ---                  | --- |
| `order`              | `desc`               | `asc` or `desc` |
| `per_page`           | `10`                 | Items per page |
| `columns`            | `3`                  | Grid columns (1–6) |
| `show_trip_count`    | `yes`                | Render the "*N* trips" badge on each card |
| `show_description`   | `yes`                | Render the activity description excerpt |
| `show_image`         | `yes`                | Render the activity thumbnail |
| `show_pagination`    | `yes`                | Show pager links when more pages exist |
| `activity`           | `""` (CSV of **IDs**) | Limit to specific activities |
| `hide_empty`         | `no`                 | **Opt-in**: when set to `yes`, activities with zero published trips are skipped. See *Empty-term filtering* below. |
| `title`              | `Activity Listings`  | Heading rendered above the grid |

### Example

```html
[yatra_activity columns="4" per_page="8"]
[yatra_activity activity="12,18,21"]
[yatra_activity hide_empty="yes"]
```

---

## `[yatra_trip_category]` (Trip categories)

Class: `app/Shortcodes/TripCategoryShortcode.php`. Same card layout as destinations, links use your trip-category permalink base.

### Attributes

| Attribute            | Default                | Notes |
| ---                  | ---                    | --- |
| `order`              | `desc`                 | `asc` or `desc` |
| `per_page`           | `10`                   | Items per page |
| `columns`            | `3`                    | Grid columns (1–6) |
| `show_trip_count`    | `yes`                  | Render the "*N* trips" badge on each card |
| `show_description`   | `yes`                  | Render the category description excerpt |
| `show_image`         | `yes`                  | Render the category thumbnail |
| `show_pagination`    | `yes`                  | Show pager links when more pages exist |
| `category`           | `""` (CSV of **IDs**)  | Limit to specific categories |
| `hide_empty`         | `no`                   | **Opt-in**: when set to `yes`, categories with zero published trips are skipped. See *Empty-term filtering* below. |
| `featured_only`      | `no`                   | Only show categories marked as featured |
| `title`              | `Trip Categories`      | Heading rendered above the grid |

### Pagination

Append `?trip_category_page=2` (separate from `?trip_page` so multiple paginated lists can co-exist).

---

## Empty-term filtering (`hide_empty`)

All three taxonomy shortcodes — `[yatra_destination]`, `[yatra_activity]`, and `[yatra_trip_category]` — accept `hide_empty="yes"` to **hide terms that have no published trips assigned to them**.

**This is opt-in.** The default (`hide_empty="no"`) preserves the historical behavior: every term renders, including ones with zero trips, so existing sites aren't surprised by terms disappearing after an upgrade.

The check counts only trips with `status = publish` linked to the term via Yatra's classifications table. Drafts, trash, and scheduled posts don't count.

### When to turn it on

Set `hide_empty="yes"` if you want a tighter catalog where empty cards — which would land on empty archive pages when clicked — are simply skipped. Common when:

- The site is live and you don't want visitors clicking a category to land on "no trips found"
- You're running paid traffic into a destination/activity roundup and need every card to convert
- The taxonomy term list is large and most have content — the few empty ones become noise

### When to leave it off (the default)

Keep `hide_empty="no"` when:

- You want every term visible regardless of inventory — typical for navigation roundups or editorial preview pages
- The site is in onboarding and terms are pre-seeded before any trips exist
- Custom front-end uses the card list as a navigation hint, not a clickthrough target

### Same behavior on the Gutenberg blocks

The **Destination**, **Activity**, and **Trip Category** blocks accept the same `hide_empty` attribute. In the editor, find the toggle under **Block Settings → Display Options → "Hide empty"**. Off by default to match the shortcode default.

---

## `[yatra_search]` (Search form)

Class: `app/Shortcodes/SearchShortcode.php`.

### Attributes

Each attribute below maps to a checkbox in **Settings → Search & Listing → Search Bar Fields**. **Omit** an attribute and that field **inherits the global toggle**; pass `yes` / `no` to force it on or off for this one placement.

| Attribute       | Default             | Controls               |
| ---             | ---                 | ---                    |
| `keyword`       | *(inherits toggle)* | Keyword search field   |
| `destination`   | *(inherits toggle)* | Destination dropdown   |
| `activities`    | *(inherits toggle)* | Activities dropdown    |
| `duration`      | *(inherits toggle)* | Duration range slider  |
| `budget`        | *(inherits toggle)* | Budget dropdown        |

Accepted values: `yes` / `no` (also `true` / `false`, `on` / `off`, `1` / `0`). An unrecognised value falls back to the global toggle.

### Examples

```html
<!-- Inherit the Settings → Search & Listing toggles (default) -->
[yatra_search]

<!-- Hide the Budget filter in this placement only -->
[yatra_search budget="no"]

<!-- Compact bar: keyword + destination only, hide the rest here -->
[yatra_search activities="no" duration="no" budget="no"]
```

The built-in trip listing page builds these arguments **automatically** from your **Search & Listing** settings, so its search bar always matches your toggles. Reach for the attributes when you want a *different* set of fields in a specific manual placement. The form submits via Yatra's search endpoint and renders results on the listing page.

::: tip Deprecated attributes
Older builds listed `show_filters`, `show_destinations`, `show_price_range`, `show_difficulty`, etc. Those were never wired to the rendered form and are ignored — use the per-field attributes above (`keyword`, `destination`, `activities`, `duration`, `budget`).
:::

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

---

## Pro shortcodes

With **Yatra Pro** active, a few modules register their own shortcodes. Each only does something when the matching module is enabled (and a valid license is active); on a Free-only site they render nothing.

| Shortcode | Module | What it outputs |
| --- | --- | --- |
| `[yatra_consent_form]` | [Trip Consent](/modules/trip-consent) | Embeds a digital consent / waiver form so travellers can sign before departure. |
| `[yatra_whatsapp_button]` | [WhatsApp Notifications](/modules/whatsapp) | A "Chat on WhatsApp" button you can drop anywhere (page builders, widgets, templates). |
| `[yatra_pro_features]` | Yatra Pro | Renders the Pro feature/marketing grid (for landing / upsell pages). |
| `[yatra_pro_modules]` | Yatra Pro | Lists the available Pro modules and their on/off status. |
| `[yatra_pro_license]` | Yatra Pro | Shows license status and the activation UI. |

Each module's own page covers its shortcode attributes and setup in detail — see the linked module docs above.
