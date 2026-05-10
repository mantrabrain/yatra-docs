---
title: Create a trip
description: A section-by-section walkthrough of the Yatra Trip Builder — Essentials, Details, Optimization, and Advanced — every field, every choice, every screenshot.
prev:
  text: Trips & catalog
  link: /tour-booking
next:
  text: Departures & availability
  link: /departures
---

# Create a trip

This page is the **practical walkthrough** for building a trip from scratch using the Yatra Trip Builder. The builder organises 10 sections into 4 colour-coded phases — fill in **Phase 1 (Essentials)** to publish a draft, then come back later for the rest.

> Looking for the field-level reference instead? See [Trips & catalog](/tour-booking) for an exhaustive list of every option.

## Open the Trip Builder

Open <span class="screen-path">Yatra → Trips → All Trips → + Add New</span>, or jump directly to:

```
/wp-admin/admin.php?page=yatra&subpage=trips&action=create
```

You'll land on **Phase 1 → Trip Basics**. The left sidebar shows the full phase / section map, the right panel is the active section, and the top right has the **Save Draft** and **Publish Trip** buttons.

::: tip Take a Tour, Fill Dummy Data
The header has two helpers worth knowing about:
- **Take a Tour** walks you through the builder UI inline.
- **Fill Dummy Data (1/3)** populates the current section with realistic sample content so you can see how the public trip page will look without typing everything by hand.
:::

---

## Phase 1 — Essentials (must complete to publish)

You only need this phase to publish a working trip. Everything later is optional polish.

### 1.1 Trip Basics

![Trip Basics — title, slug, short and long description, with built-in WYSIWYG](/screenshots/trip-builder/basic.webp)

| Field                  | Required | Notes                                                                                              |
| ---                    | ---      | ---                                                                                                |
| **Trip Title**         | ✅ Yes   | Show in catalogues + as the `<h1>`. Include destination + duration ("Bali Beach Retreat — 7 Days"). Counter shows characters; aim for ≤ 60. |
| **Trip URL** (slug)    | ✅ Yes   | Auto-generated from the title; you can override. Becomes `/trip/<slug>/`.                          |
| **Short Description**  | Recommended | 2–3 sentences shown in trip listings and cards. ≤ 200 chars.                                  |
| **Long Description**   | Recommended | The main body shown on the trip's public page. WYSIWYG with bold / italic / lists / link / heading levels. |

**Save Draft** any time — the trip becomes browsable in the admin even with only the title + slug filled in.

### 1.2 Location & Route

![Location & Route — interactive map, country / region inputs, route plotting](/screenshots/trip-builder/location.webp)

For trips that ship anywhere physical:

- **Country** — primary country. Powers the country filter on the front-end and defaults the map.
- **Region / state**, **city** — drill down to the actual base.
- **Coordinates** — clickable map (OpenStreetMap via Nominatim) sets latitude / longitude automatically. You can also type lat / lng directly.
- **Route stops** — a multi-step trip can list each waypoint; the front-end renders these as a small itinerary preview.

::: tip Multiple destinations
The single-trip Location section is for the *primary* base. Use the **Categorization** section (Phase 3) to attach the trip to one or more **Destination** taxonomies — that's what powers the destination archive pages.
:::

### 1.3 Pricing

![Pricing — base price + per-traveler-category pricing matrix](/screenshots/trip-builder/pricing.webp)

Yatra supports two pricing modes:

| Mode                          | When to use                                                                  |
| ---                           | ---                                                                          |
| **Single price**              | One number; everyone pays the same. Best for short experiences with no age tiers. |
| **Per-traveler-category**     | Different prices for adult / child / infant / senior. Add categories under [Settings → Traveler Categories](/settings#traveler-categories). |

Other fields:

- **Sale price** — if set, the regular price is shown struck-through and the public page shows the discount.
- **Pricing notes** — free-text shown beneath the price (e.g. "Group discount available — see below").

::: tip Deposits, partial payments, dynamic pricing
The deposit / partial-payment toggle lives in [Settings → Payment](/payment-settings#deposits-flexible-payments) (it's site-wide, with a per-trip override on this section).

For percentage / fixed-amount adjustments by season, group size, or last-minute window, enable **Dynamic Pricing** under [Yatra → Modules](/modules#dynamic-pricing) — Pro.
:::

### 1.4 Availability & Booking

![Availability & Booking — capacity, schedule mode, min/max travelers, sold-out behaviour](/screenshots/trip-builder/duration.webp)

This section combines two related concepts:

**Schedule mode** — how the trip is sold:

- **Open-date** — customer picks any date inside an availability window. Best for activity providers (a 90-min walking tour every day).
- **Fixed departures** — only specific dates are bookable. Manage them under <span class="screen-path">Yatra → Departures</span>. See [Departures & availability](/departures).
- **Recurring rule** — generate departures from a weekly / monthly pattern.

**Booking constraints** — capacity and traveler limits:

| Field                          | What it does                                                          |
| ---                            | ---                                                                   |
| **Trip duration**              | Days / hours / nights. Powers the duration filter on listings.        |
| **Total capacity**             | Optional cap across all bookings ever (limited-edition expeditions).  |
| **Min travelers per booking**  | Reject bookings under this number.                                    |
| **Max travelers per booking**  | Reject bookings over this number.                                     |
| **Cut-off**                    | Stop new bookings X hours/days before departure.                      |
| **Sold-out behaviour**         | "Hide", "Show with badge", "Allow waitlist".                          |

![Booking requirements panel — cut-off, waitlist, group-booking limits](/screenshots/trip-builder/booking.webp)

::: tip Three layers of capacity
Yatra checks min / max **per booking**, capacity **per departure**, and capacity **per trip total** — first one to be exhausted wins. Read the full model in [Departures & availability → Capacity rules](/departures#capacity-rules).
:::

---

## Phase 2 — Details

This is your trip's *story*. The Trip Details section bundles itinerary, what's included / excluded, accommodation, transport, and FAQs into one place.

### 2.1 Itinerary

![Itinerary builder — day-by-day with included items, drag-to-reorder](/screenshots/trip-builder/itinerary.webp)

The itinerary is the day-by-day breakdown that shows on the public trip page.

- **Add Day** — append a new day; drag the handle to reorder.
- Each day has: **Day title**, **Description** (rich text), **Items** (multi-select from your **Itinerary → Items** library).
- **What's Included** and **What's Excluded** lists live here too — bullet-style, multi-language friendly.

::: tip Itinerary items library
Define reusable items (meals, transfers, gear) once under <span class="screen-path">Yatra → Itinerary → Items</span>, then attach them to as many trips as you like. Editing the item updates every trip that uses it.
:::

### 2.2 Trip Attributes

![Attributes — assign custom attributes (gear, fitness, style) to this trip](/screenshots/trip-builder/attributes.webp)

Attributes are custom taxonomies you defined under <span class="screen-path">Yatra → Trips → Attributes</span> (e.g. *Style: Lodge / Camping / Hotel*; *Group size: Solo / Small / Large*). Pick the values that apply to this trip.

Attributes appear as filters on the catalog and as pills on the public trip page.

---

## Phase 3 — Optimization

Optional, but worth doing before going live.

### 3.1 Media & Gallery

![Media — featured image, gallery, video URL, story / testimonials block](/screenshots/trip-builder/media.webp)

| Field                   | Notes                                                                          |
| ---                     | ---                                                                            |
| **Featured image**      | Main hero on the trip page and the card image on listings. Use a 16:9 photo, ideally ≥ 1600 px wide. |
| **Gallery**             | Multi-select from the WordPress media library. Shows as a grid below the hero. |
| **Trip video URL**      | YouTube / Vimeo URL. Embeds inside the trip page. Optional.                    |
| **Story**               | Long-form rich text — for "Why this trip" / about-the-experience sections.    |
| **Testimonials**        | Pull from your [Reviews](/booking-settings#reviews) collection or add free-form testimonials specific to this trip. |

### 3.2 Categorization

![Categorization — destinations, activities, categories, difficulty, tags](/screenshots/trip-builder/categorization.webp)

This is where you wire the trip into your catalog taxonomies:

- **Destinations** — multi-select. Powers the destination archive pages.
- **Activities** — multi-select (Hiking, Sightseeing, Cultural, etc.).
- **Trip Categories** — top-level grouping (Adventure, Culture, Wildlife).
- **Difficulty Level** — Easy / Moderate / Challenging / Strenuous.
- **Tags** — free-form keywords.
- **Featured Priority** — Featured / New / Limited (drives the *featured_priority* filter on `[yatra_trip]` and the Trip block).

### 3.3 FAQs

![FAQs — repeater of question / answer pairs shown on the trip page](/screenshots/trip-builder/faqs.webp)

A repeater of question / answer pairs. Renders as an accordion on the public trip page. Good FAQs reduce enquiry inbox load:

- "What's the cancellation policy?"
- "Do I need travel insurance?"
- "Is this suitable for kids?"

### 3.4 SEO & Marketing

![SEO & Marketing — meta title, description, social share image, schema fields](/screenshots/trip-builder/seo.webp)

| Field                       | Notes                                                                 |
| ---                         | ---                                                                   |
| **Meta title**              | Browser tab + search-result title. Defaults to the trip title.        |
| **Meta description**        | 150–160 characters; appears under the title in search results.        |
| **Social share image**      | Open Graph / Twitter card. 1200×630 recommended.                      |
| **Canonical URL**           | Override only if this trip is also published elsewhere.               |
| **Schema fields**           | Auto-populated from the trip data; you can override (currency, valid-from, valid-through). |

::: tip If you use Yoast / RankMath / SEOPress
Those plugins emit their own meta tags and override this section. Use Yatra's SEO fields only if no SEO plugin is active.
:::

---

## Phase 4 — Advanced

Power-user options. Skip on first creation; revisit when you have a pattern.

![Advanced — visibility, scheduling, frontend tab order, custom CSS / JS hooks](/screenshots/trip-builder/advanced.webp)

| Field                       | Notes                                                                 |
| ---                         | ---                                                                   |
| **Status**                  | Draft / Pending Review / Published / Approved / Archived.             |
| **Publish date**            | Schedule the trip to go live in the future.                           |
| **Frontend tabs order**     | Reorder the tabs on the public trip page (Overview, Itinerary, Reviews, FAQs, etc.). Hide a tab by removing it. |
| **Visibility**              | Public / private / password-protected (uses WP's standard visibility model). |
| **Custom CSS / JS hooks**   | Per-trip `<head>` injection — useful for affiliate pixels.            |

---

## Saving and publishing

The Trip Builder is **autosave-friendly**: every section change is saved to a draft on navigation. The header buttons:

| Button         | What it does                                                                          |
| ---            | ---                                                                                   |
| **Save Draft** | Saves the current state, stays on the same section.                                   |
| **Preview**    | Opens the trip page in a new tab using a draft-preview cookie (no public URL exposed). |
| **Publish Trip** | Validates Phase 1 fields are complete, sets status to *Published*, makes it bookable. |

If publish fails, the offending section gets a red dot in the sidebar and the validation message shows at the top of the form.

## What's next

- [Departures & availability](/departures) — once the trip is published, set its dates / capacities.
- [Settings → Booking](/settings#3-booking) — global booking-flow toggles (guest checkout, expiry, waitlist).
- [Pricing → Dynamic Pricing](/modules#dynamic-pricing) — Pro: per-season, per-group-size, last-minute pricing rules.
- [Bookings & customers](/booking-settings) — once orders start coming in.
