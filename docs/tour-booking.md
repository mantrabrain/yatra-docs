---
title: Trips & catalog
description: A field-by-field walkthrough of the Yatra Trip Builder — every section, every option — so you can build catalog-ready trips on the first try.
---

# Trips & catalog

This page walks you through every screen and field for building a Yatra trip. If you just want to ship something fast, follow the [Quick start](/quick-start) first, then come back here when you need to fine-tune.

## The Trips list

![Yatra Trips list — status pills, search, sort, and bookings count column](/screenshots/trips/trips-list.webp)

Open <span class="screen-path">Yatra → Trips → All Trips</span>.

You'll see a table of every trip on your site with:

- A **Search** box.
- **Status pills** at the top: All, Published, Draft, Review, Approved, Archived, Trash (with row counts).
- **Sort** controls.
- A **+ Add New** button in the top right.

Each row shows: trip image + title, price, status, trip type, duration, countries, difficulty, availability, capacity, attributes, destinations, activities, categories, and (when Pro is active) a **Bookings** count column.

You can show / hide columns with the column visibility toggle. Click any row to open the **Trip Builder**.

### Bulk actions

Tick rows, then pick a bulk action:

- **Mark as Published** / **Mark as Draft** / **Archive** / **Move to Trash** / **Delete Permanently**.
- From the **Trash** tab the actions become **Restore to Draft** or **Delete Permanently**.

## The Trip Builder

Click **+ Add New** (the create modal asks for a title and slug, then redirects to the editor) or click any trip title.

The builder has a **vertical sidebar** with these sections (top to bottom):

1. **Trip Basics**
2. **Location & Route**
3. **Pricing**
4. **Availability & Booking**
5. **Trip Details** (sub-tabs: Itinerary | Included/Excluded)
6. **Media & Gallery**
7. **Downloads**
8. **Categories & Attributes**
9. **SEO & Marketing**
10. **Advanced Settings**

Top-right buttons stay sticky: **Save Draft** / **Update Draft**, **Publish Trip** / **Update & Publish**, plus an overflow menu with **Save for Review**.

## 1. Trip Basics

The headline information shown in the catalog and at the top of the trip page.

| Field                  | What it does                                                       |
| ---                    | ---                                                                |
| **Trip title**         | The headline. Auto-fills the slug.                                |
| **Slug** (permalink)   | Edit if you want a different URL.                                 |
| **Short description**  | One-line subtitle on cards and listing pages.                      |
| **Long description**   | The pitch, rendered with the WordPress editor.                     |
| **Highlights**         | Bullet list of "what's special about this trip".                  |
| **Featured image**     | The big image on the trip page and in catalog cards.              |
| **Trip type**          | Categorize as fixed-departure / open / private / etc.             |
| **Duration**           | Days and nights. Shows on the catalog card and trip header.       |
| **Pricing mode**       | Regular price or per–traveler-category pricing (set in Pricing).  |

## 2. Location & Route

- **Destinations** — assign one or more (multi-select). Manage destinations under <span class="screen-path">Trips → Destinations</span>.
- **Map / coordinates** — optional latitude / longitude.
- **Countries / regions** — appears as a row chip in catalogs.

## 3. Pricing

- **Regular price** — single price for everyone.
- **Per-traveler-category pricing** — separate prices for adult / child / infant / senior. Configure traveler categories under <span class="screen-path">Yatra → Traveler Categories</span>.
- **Currency** — site-wide setting; per-trip overrides require Pro.

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Dynamic pricing rules</span>
  </div>
  <p class="pro-callout__desc">Apply percentage / fixed-amount adjustments by trip, destination, season, or last-minute window. Group-size discounts, early-bird bumps, and per-traveler-category multipliers — all manageable from <span class="screen-path">Yatra → Dynamic Pricing</span>.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Unlock dynamic pricing →</a>
</div>

## 4. Availability & Booking

- **Availability window** — start / end dates the trip is bookable.
- **Min travelers per booking** — typical default is 1.
- **Max travelers per booking** — 0 means unlimited.
- **Capacity** — total spots available across all bookings (for fixed-capacity trips).
- **Booking lead time** — minimum days between booking and travel date.

For trips with **fixed departure dates** (Tuesdays only, every other Saturday), you'll create individual departures under <span class="screen-path">Yatra → Departures</span>. See [Departures & availability](/departures).

## 5. Trip Details

This section has two sub-tabs:

### Itinerary

Day-by-day plan. Click **+ Add Day** to insert a new entry. Each day has:

- **Day title** (e.g. "Day 1 — Arrival in Kathmandu").
- **Description** (rich text).
- Optional **distance / duration / altitude / accommodation** badges.

### Included / Excluded

Two side-by-side bullet lists for "What's included" (transport, meals, guides) and "What's not included" (international flights, insurance, tips). Each item is a single line of text.

## 6. Media & Gallery

- **Gallery** — additional images shown on the trip page.
- **Video URL** — paste a YouTube or Vimeo link.
- **Virtual tour** — for immersive 360 / VR tour links.
- **Testimonials** — pick from existing reviews to highlight on this trip.

## 7. Downloads

A simple file repository per trip. Each card has:

- **Title** (e.g. "Trip brochure (PDF)").
- **Description**.
- **Attachment** — pick from the WordPress media library.
- **Visibility** — public, customer-only (after booking), or admin-only.

## 8. Categories & Attributes

This section ties trips to the catalog filters and search.

- **Trip Categories** — choose one or more. Manage under <span class="screen-path">Trips → Categories</span>.
- **Activities** — multi-select (Hiking, Sightseeing, Cultural, etc.). Manage under <span class="screen-path">Trips → Activities</span>.
- **Difficulty Level** — single choice (Easy / Moderate / Challenging / Strenuous).
- **Trip Tags** — free-form taxonomy.
- **Featured Priority** — `none` (default), `featured`, `sticky`, `high-priority`. Drives ordering in catalog grids and shortcodes.
- **Custom attributes** — define under <span class="screen-path">Trips → Attributes</span>; assign per trip here.

<div class="ui-tip"><strong>About the Featured Priority field:</strong> the legacy <code>featured</code> toggle has been merged into <code>featured_priority</code>. Setting <code>featured_priority="featured"</code> is equivalent to the old <code>featured="1"</code>. The shortcode and block both honor this attribute.</div>

## 9. SEO & Marketing

### Search Engine Optimization

- **Meta Title** — overrides the page title for search engines.
- **Meta Description** — the snippet under your link in search results.
- **Meta Keywords** — for tracking with Yoast / Rank Math / SEOPress.

A live SEO preview card shows what Google will likely render.

### Frequently Asked Questions

Question + Answer blocks specific to this trip. Click **+ Add FAQ** for more. These render on the public trip page in an expandable accordion.

## 10. Advanced Settings

### Lifecycle Management

- **Status** — draft / published / pending review / archived.
- **Scheduled Publishing** — pick a future date the trip auto-publishes.
- **Schedule Unpublish Date** — pick a date the trip auto-unpublishes (great for seasonal trips).

### Frontend Tabs Management

The single trip page has a tabbed lower section (Overview, Itinerary, Includes, Reviews, Map). Here you can:

- Toggle which tabs show.
- Reorder them.
- Override the labels.

## Saving and publishing

- **Save Draft** — keeps your changes private.
- **Save for Review** — submit to a higher-level admin to approve.
- **Publish Trip** — makes the trip live and bookable.

Saved trips honor the **status pills** in the Trips list (All, Published, Draft, Review, Approved, Archived, Trash).

## Destinations, Activities, Categories, Difficulty, Attributes

![Destinations admin — list with add/edit form pattern](/screenshots/trips/destinations.webp)

Each is a list-and-form pair under <span class="screen-path">Yatra → Trips → ...</span>:

- **Destinations** — places. Each has name, slug, image, description.
- **Activities** — what travelers do. Same fields.
- **Trip Categories** — top-level grouping (Adventure, Culture, Wildlife).
- **Difficulty Levels** — Easy / Moderate / Challenging / Strenuous.
- **Attributes** — custom taxonomies you define (Style: Lodge / Camping / Hotel; Group size: Solo / Small / Large).

These all appear as filters on the public catalog and can be reused across trips.

## Traveler Categories

![Traveler Categories admin — adult / child / infant / senior definitions](/screenshots/trips/traveler-categories.webp)

Open <span class="screen-path">Yatra → Traveler Categories</span> for adult / child / infant / senior definitions. Each has:

- **Name** (display label).
- **Min / Max age** (optional).
- **Default min / max per booking**.

If a trip uses **per-traveler-category pricing**, prices are set in the trip's **Pricing** section per category.

## Tips & best practices

- **Keep titles short** (under 60 characters). They show in catalog cards and search snippets.
- **Set Featured Priority strategically.** Limit `sticky` to your top 3 trips so the priority order means something.
- **Use Difficulty Level**, not Categories, for pacing. Categories should be marketing themes (Cultural, Adventure); difficulty is operational.
- **One image per gallery entry.** Don't duplicate the featured image in the gallery — it shows in both places automatically.
- **Use Meta Description.** Google often uses it directly in search results — it's worth one minute per trip.

## Where to go next

- [Departures & availability](/departures) — fixed departures, recurring availability rules.
- [Bookings & customers](/booking-settings) — the booking lifecycle.
- [Payments](/payment-settings) — gateways and refunds.
- [Pro modules](/third-party-integrations) — every Pro feature listed.
