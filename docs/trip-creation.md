---
title: Create a trip — step by step
description: Walkthrough for creating a trip in Yatra, from the Trips listing page through the Create New Trip modal, all four phases of the Trip Builder, and publishing. Every section, every field, every button.
prev:
  text: Trips & catalog
  link: /tour-booking
next:
  text: Departures & availability
  link: /departures
---

# Create a trip — step by step

This is the practical walkthrough for building a trip from scratch. The Yatra Trip Builder is a four-phase wizard with ten sections in total. Only **Trip Basics** and **Pricing** are required to publish — everything else is optional polish you can come back to.

> Looking for the field-level reference instead? See [Trips & catalog](/tour-booking) for the exhaustive table of every option.

::: tip Running an older plugin version?
If a field or section name looks different in your wp-admin, update to the latest Yatra release — the screenshots and field names on this page reflect the current build.
:::

---

## Step 1 — Open the Trips listing

Open <span class="screen-path">Yatra → Trips</span> (the top-level "Trips" item in the Yatra menu).

![Yatra Trips listing — search, status filter pills, column visibility picker, and the + Add New Trip button at top right](/screenshots/trips/list-page.webp)

What you see:

- **Search box** — searches by title and slug.
- **Status filter** — All / Published / Draft / Review / Approved / Archived / Trash. Selecting a pill filters the list to that status.
- **Column visibility picker** — toggle which columns appear (Trip, Price, Status, Trip Type, Availability, Capacity, Countries, Difficulty, Attributes, Destinations, Activities, Categories, Bookings, Created, Modified). Your choice is saved per-browser to `localStorage`.
- **Bulk actions** — once you tick one or more rows, the action dropdown unlocks: Mark as Published / Draft / Review / Approved / Archived, plus Move to Trash. From the Trash status filter you also get Restore and Delete Permanently.
- **+ Add New Trip** (top right) — opens the Create New Trip modal.

::: tip Reset filters
The reset button (next to the filters) clears search + status + sort in one click.
:::

---

## Step 2 — Click "+ Add New Trip" → modal popup

Clicking **+ Add New Trip** opens a small modal — **not** a full-page form. The modal asks for the two fields needed to create a draft trip and redirect you into the builder.

![Create New Trip modal — Trip Title, Trip URL slug, and live URL preview](/screenshots/trips/add-new-modal.webp)

Fields:

| Field         | Type   | Required | Notes                                                                                                                            |
| ---           | ---    | ---      | ---                                                                                                                              |
| **Trip Title** | text   | ✅ Yes   | What appears on the public trip page and in the catalogue.                                                                       |
| **Trip URL**   | text   | ✅ Yes   | Auto-generated from the title (lowercase, hyphens). Click **Customize URL** to override. Validated: lowercase letters, digits, hyphens only. |

Below the fields you'll see a **live preview** of the full public URL (e.g. `https://yoursite.com/trip/bali-beach-retreat`).

Buttons:

- **Cancel** — closes the modal, nothing saved.
- **Create & Continue** — validates the slug, creates a draft trip, and redirects you to the Trip Builder at Phase 1 → Trip Basics. You'll see a brief loading spinner on the button.

::: warning Slug rules
Slugs may only contain lowercase letters, digits, and hyphens. The modal blocks creation otherwise.
:::

---

## Step 3 — Land on the Trip Builder

You arrive on the Trip Builder at:

```
/wp-admin/admin.php?page=yatra&subpage=trips&action=create   (new)
/wp-admin/admin.php?page=yatra&subpage=trips&action=edit&id=N (existing)
```

The Trip Builder has three parts:

- **Left sidebar** — the four phases, each containing one or more sections. Sections that are required show a badge. Sections you've visited are marked complete; sections with validation errors show a warning dot.
- **Center panel** — the currently active section's fields.
- **Top action bar** — Preview, Save Draft / Update Draft, and Publish Trip / Update Trip (the publish button has a dropdown for status variants).
- **Bottom nav bar** — Previous / Next, for stepping through sections in order.

The four phases are:

| Phase                | Badge              | Sections                                                                                       |
| ---                  | ---                | ---                                                                                            |
| **1 — Essentials**   | Start Here / Required | Trip Basics ✱, Location & Route, Pricing ✱, Availability & Booking                            |
| **2 — Details**      | Recommended        | Trip Details (Itinerary + Included/Excluded sub-tabs)                                          |
| **3 — Optimization** | Recommended        | Media & Gallery, Downloads (free), Categories & Attributes, SEO & Marketing                    |
| **4 — Advanced**     | Power Users        | Advanced Settings                                                                              |

✱ = required to publish.

::: tip Take a Tour, Fill Dummy Data
The header includes two helpers:
- **Take a Tour** — inline onboarding tour of the builder UI.
- **Fill Dummy Data (1/3)** — populates the current section with realistic sample content. There are three dummy datasets you can cycle through to see how a fully-filled trip looks without typing it all by hand.
:::

---

## Phase 1 — Essentials

You only need this phase to publish a working trip. Everything later is optional polish.

### 1.1 Trip Basics ✱

![Trip Basics — title, slug with live preview, short description, long description (WYSIWYG), featured image, highlights repeater](/screenshots/trip-builder/phase-1-basic.webp)

| Field                | Type                  | Required     | Notes                                                                                              |
| ---                  | ---                   | ---          | ---                                                                                                |
| **Trip Title**       | text                  | ✅ Yes       | Char counter shows 0–60 recommended (max 100). Auto-feeds slug while not manually edited.          |
| **Trip URL**         | text (monospace)      | ✅ Yes       | Auto-generated. Click **Edit** to override. Includes a Copy button and live URL preview.           |
| **Short Description** | WYSIWYG               | Recommended  | 100–150-char range works best. Shown in catalogues and trip cards.                                |
| **Trip Description** | WYSIWYG (min 260 px)  | Recommended  | The main body shown on the public trip page. Supports bold / italic / lists / link / headings.    |
| **Featured Image**   | WordPress media picker | Recommended | 1200 × 800 px recommended. Preview + Remove button below the picker.                              |
| **Trip Highlights**  | repeater (text rows)  | Optional     | Add bullet-point highlights ("Sunrise over Mt. Batur", "Private boat to Nusa Lembongan", etc.).   |

**Save Draft** any time — the trip becomes browsable in the admin even with only the title + slug filled in.

### 1.2 Location & Route

![Location & Route — destinations multi-select, interactive starting point map, ending point map, seasonal notes](/screenshots/trip-builder/phase-1-location.webp)

| Field                       | Type                                | Required | Notes                                                                                                                                                  |
| ---                         | ---                                 | ---      | ---                                                                                                                                                    |
| **Destinations**            | multi-select                        | Optional | Attaches the trip to one or more Destination taxonomy terms (powers the destination archive pages). If empty, you'll see a link to create destinations first. |
| **Starting Point**          | location picker (search + map + lat/lng) | Optional | Name field auto-fills from map search; 300 px embedded OpenStreetMap; "Use Current Location" button (geolocation); manual lat / lng inputs underneath. |
| **Ending Point**            | location picker                     | Optional | Same structure as Starting Point. Use for routes that don't end where they began.                                                                       |
| **Seasonal Availability Notes** | text                            | Optional | Short freeform note ("Available year-round except monsoon season"). Shown on the public page.                                                          |

### 1.3 Pricing ✱

![Pricing — Regular vs Traveler-Based toggle, original/discounted price fields, per-category matrix](/screenshots/trip-builder/phase-1-pricing.webp)

The pricing section starts with a **Pricing Type** toggle — pick one of two modes:

| Mode                     | When to use                                                                                          |
| ---                      | ---                                                                                                  |
| **Regular Pricing**      | One price; everyone pays the same. Best for short experiences with no age tiers.                     |
| **Traveler-Based Pricing** | Different price per traveler category (Adult / Child / Infant / Senior, configurable under [Yatra → Traveler Categories](/tour-booking#traveler-categories)). |

**Regular Pricing fields:**

| Field                | Type                   | Required | Notes                                                            |
| ---                  | ---                    | ---      | ---                                                              |
| **Original Price**   | currency (number, 0.01 step) | ✅ Yes | The undiscounted public price.                                  |
| **Discounted Price** | currency               | Optional | If set, the public price shows a strike-through over the original. |

**Traveler-Based Pricing fields:**

- A repeater of **active traveler categories**. Click **Add Pricing** → pick a category from the dropdown → fill in Original Price and Discounted Price (optional). Repeat for each category.
- If no categories exist yet, you'll see "No active traveler categories found" with a link to create them first.

::: warning Pricing is required to publish
At least one valid price (Regular Original, or at least one row in the Traveler-Based matrix) must be set before **Publish Trip** will succeed.
:::

### 1.4 Availability & Booking

![Availability & Booking — availability period dates, capacity, departure times, booking policies](/screenshots/trip-builder/phase-1-duration.webp)

This section merges what the source code calls `duration` and `booking`. Field groups:

**Availability Period**

| Field                            | Type   | Notes                                                                  |
| ---                              | ---    | ---                                                                    |
| **Available From** / **Available To** | date   | The window during which travelers can book this trip.                  |
| **Booking Window (days in advance)** | number | How far in advance bookings are accepted (e.g. 30 = up to 30 days out). |
| **Seasonal Availability Notes**  | text   | Short customer-facing note about seasonality.                          |

**Capacity & Travelers**

| Field                | Type   | Notes                                                       |
| ---                  | ---    | ---                                                         |
| **Minimum Travelers** | number | Smallest party size accepted.                              |
| **Maximum Travelers** | number | Hard cap. Used to compute remaining seats per departure.   |

**Departure Time (varies by trip type)**

- Day-tour trips: **Enable Multiple Time Slots** checkbox.
  - If on: a repeater of `{ time, label }` rows — e.g., `09:00 Morning Tour`, `14:00 Afternoon Tour`.
  - If off: a single **Default Departure Time**.
- Multi-day trips: a single **Default Departure Time**.

**Booking Policies**

| Field           | Type   | Notes                                                       |
| ---             | ---    | ---                                                         |
| **Minimum Age** | number | Hard floor for booking. 0 = no restriction.                |

**Accommodation**

A sub-block (Home icon) inside *Availability & Booking* — describes what travelers sleep in.

| Field                       | Type     | Notes                                                                                                                |
| ---                         | ---      | ---                                                                                                                  |
| **Accommodation Type**      | text     | Placeholder: *Hotel, Resort, Teahouse, Camping*. Free text — appears on the public trip page.                       |
| **Meal Plan**               | select   | One of: *Breakfast Only*, *Half Board (Breakfast + Dinner)*, *Full Board (All Meals)*, *All Inclusive*, *No Meals Included*. |
| **Accommodation Details**   | textarea | Free text — describe the lodging in more depth.                                                                     |

**Transportation**

A sub-block (Car icon) inside *Availability & Booking* — describes pickup/dropoff and what's included.

| Field                       | Type     | Notes                                                                                                                |
| ---                         | ---      | ---                                                                                                                  |
| **Transportation Included** | checkbox | Toggle. The three fields below are hidden until this is on.                                                          |
| **Pickup Location**         | text     | Conditional. Placeholder: *Airport, Hotel, City Center*.                                                             |
| **Dropoff Location**        | text     | Conditional.                                                                                                         |
| **Transportation Details**  | textarea | Conditional. Free text — describe vehicles, route, schedule.                                                         |

---

## Phase 2 — Details

### 2.1 Trip Details

![Trip Details — Itinerary and Included/Excluded sub-tabs](/screenshots/trip-builder/phase-2-trip-details.webp)

A merged section with two sub-tabs you switch between using a tab bar inside the section:

#### Sub-tab A: Itinerary

A day-by-day repeater. Each day has:

- **Day number** + **Day title** ("Day 1 — Arrival in Bali")
- **Entries** — items that happen on this day. Each entry can have a title, description, location, start / end time, duration, cost, notes, included / excluded items, and images. Items can also reference a global Itinerary Item by ID (managed under [Yatra → Items / Item Types](/tour-booking)).
- Add / remove days, reorder by entry.

::: tip
You can skip the itinerary and still publish — useful for short single-day experiences.
:::

#### Sub-tab B: Included / Excluded

Two simple repeaters side-by-side:

- **What's Included** — list of `{ title, description }` rows ("Airport transfers", "All meals", "English-speaking guide").
- **What's Excluded** — same structure ("Travel insurance", "Personal expenses", "Tips").

![Included / Excluded sub-tab — two repeaters listing what's covered and what isn't](/screenshots/trip-builder/phase-2-included.webp)

---

## Phase 3 — Optimization

### 3.1 Media & Gallery

![Media & Gallery — photo gallery grid with drag reorder, video URL, virtual tour URL, what makes special, trip story, testimonials](/screenshots/trip-builder/phase-3-media.webp)

| Field                        | Type                        | Notes                                                                                                      |
| ---                          | ---                         | ---                                                                                                        |
| **Photo Gallery**            | grid repeater (drag to reorder) | Multi-image picker via WordPress media library. Order badges, reorder buttons on hover, remove (X) per image. |
| **Video URL**                | text (URL)                  | YouTube or Vimeo link. Renders embedded on the public page.                                                |
| **360° Virtual Tour URL**    | text (URL)                  | Any embeddable virtual-tour URL (Matterport, kuula.co, etc.).                                              |
| **What Makes This Trip Special** | textarea                | Freeform paragraph highlighting unique selling points. Shown as its own block on the public page.          |
| **Trip Story / Narrative**   | textarea                    | Longer-form story / context.                                                                               |
| **Testimonials**             | selector                    | Pick from existing reviews tied to bookings. Renders a testimonial card row on the trip page.              |

### 3.2 Downloads

![Downloads — repeater of downloadable items with attachment, description, visibility](/screenshots/trip-builder/phase-3-downloads.webp)

::: tip Downloads is now free
This section was previously Pro-only. It's enabled for everyone now — the Trip Builder shows it unconditionally.
:::

A repeater of downloadable items. Each item has:

| Field            | Type                          | Notes                                                                              |
| ---              | ---                           | ---                                                                                |
| **Title**        | text                          | E.g. "Packing list", "Itinerary PDF", "Waiver form".                              |
| **Description**  | textarea                      | Short description shown to the customer.                                          |
| **Visibility**   | dropdown                      | `Public` (anyone can download) / `Logged in users only` / `Booked customers only`. |
| **File**         | WordPress media picker        | The actual file (PDF, doc, image, zip…) with thumbnail + Select File button.       |

Rows are reorderable via move-up / move-down buttons.

### 3.3 Categories & Attributes

![Categories & Attributes — trip categories, difficulty, activity types, featured priority, custom attributes](/screenshots/trip-builder/phase-3-categorization.webp)

**Categorization fields:**

| Field                | Type                                      | Notes                                                                                       |
| ---                  | ---                                       | ---                                                                                         |
| **Trip Categories**  | multi-select (hierarchical, `-- ` prefix) | Tags the trip with one or more Trip Category terms (powers category archive pages).         |
| **Difficulty Level** | dropdown                                  | One of the difficulty levels you've configured (e.g. Easy / Moderate / Hard / Expert).      |
| **Activity Types**   | multi-select                              | Hiking, Wildlife, Cultural, etc. — drives the activities archive.                          |
| **Featured Priority** | dropdown                                  | `None` (default) / `Featured` / `New` / `Limited` — shows a badge on the public trip card. |

**Custom Attributes** — a delegated component for the attributes you've defined under <span class="screen-path">Yatra → Attributes</span>. Each defined attribute shows as its own input below this section.

### 3.4 SEO & Marketing

![SEO & Marketing — meta title, description, keywords, Google preview card, FAQ repeater](/screenshots/trip-builder/phase-3-seo.webp)

**Search-engine optimization:**

| Field                 | Type    | Notes                                                                                     |
| ---                   | ---     | ---                                                                                       |
| **Meta Title**        | text    | Max 60 chars. Falls back to the trip title when empty.                                    |
| **Meta Description**  | textarea (max 160 chars) | Shown in search results below the title.                                  |
| **Meta Keywords**     | text    | Comma-separated. Mostly ignored by Google but other engines / plugins may use them.       |
| **Google Preview**    | read-only | Live preview card showing how the trip will appear in a Google search result.            |

**Frequently Asked Questions:** a repeater with `{ Question, Answer }` rows. Click **Add FAQ** to append; **Remove (×)** per row to delete. Renders as an accordion on the public trip page (and as `FAQPage` JSON-LD for SEO).

---

## Phase 4 — Advanced

### 4.1 Advanced Settings

![Advanced Settings — version, scheduled publish/unpublish, seasonal auto-enable, frontend tabs drag-reorder](/screenshots/trip-builder/phase-4-advanced.webp)

**Version control:**

- **Version** — readonly number that auto-increments on every save.

**Scheduled publishing:**

| Field                       | Type | Notes                                                                  |
| ---                         | ---  | ---                                                                    |
| **Schedule Publish Date**   | date | When set, the trip is auto-published on this date.                     |
| **Schedule Unpublish Date** | date | When set, the trip auto-moves to draft / archived on this date.        |

**Seasonal auto-management:**

- **Enable seasonal auto-management** checkbox. When on:
  - **Auto-Enable Date** — date the trip becomes bookable each year.
  - **Auto-Disable Date** — date it stops being bookable.

**Frontend Tabs Management** — drag-to-reorder repeater for the tabs shown on the public trip page (Overview, Itinerary, Included, Location, Important Info, Downloads, FAQ, Story, Special, Testimonials). Each row has:

| Control     | Notes                                                                                          |
| ---         | ---                                                                                            |
| Grip handle | Drag the row up or down to change tab order on the public page.                               |
| **Label**   | The visible tab title. Disabled until the tab is enabled.                                     |
| Content type | Read-only badge (`overview`, `itinerary`, `custom`, etc.).                                   |
| Enable toggle | Per-tab on/off — disabled tabs are hidden on the public trip page.                          |
| Icon picker | Pick a Lucide icon or upload an image for the tab.                                             |
| Custom content | textarea (only for `content_type=custom` tabs) — your own HTML/markdown block.             |
| Delete (×)  | Only available on custom tabs you've added.                                                   |

---

## Step 4 — Save Draft, Preview, or Publish

The top-right action bar gives you three controls:

![Top action bar with Preview, Save Draft, and Publish Trip dropdown](/screenshots/trip-builder/publish-dropdown.webp)

- **Preview** — opens the public trip page in a new tab with current unsaved state.
- **Save Draft** / **Update Draft** — saves without changing status. Always-on safety net.
- **Publish Trip** / **Update Trip** — the primary blue button with a chevron-down dropdown for status variants:

| Action            | Resulting status |
| ---               | ---              |
| Save as Draft     | `draft`          |
| Save for Review   | `review`         |
| Mark as Approved  | `approved`       |
| Publish           | `publish`        |
| Suspend           | `suspended`      |
| Archive           | `archived`       |

::: warning Phase 1 validation
Hitting **Publish** with missing required fields (Title, Slug, Pricing) shows inline errors and jumps the form to the first failing section. The save itself is blocked until the errors are fixed.
:::

At the bottom of the section, **Previous** and **Next** buttons let you step through sections without using the sidebar.

---

## What happens after publish

- The trip appears in <span class="screen-path">Yatra → Trips</span> with status **Published**.
- Its public URL (`/trip/<slug>/`) is live.
- The trip becomes selectable when creating **Departures**, **Bookings**, and **Discounts**.
- Reports start counting views, add-to-bookings and conversions for this trip.

Next up: configure **[Departures & availability](/departures)** to schedule actual dates travelers can book — or jump straight to **[Bookings](/booking-settings)** if you want to take a test reservation.
