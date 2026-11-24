---
title: Import from WP Travel Engine
description: Move your WP Travel Engine trips into Yatra with Tools → WP Travel Engine — what is imported, what isn't (bookings are not), the dry-run scan, batches and resume, and re-running safely. Free plugin, Yatra 3.2+.
---

# Import from WP Travel Engine

**Plan:** Free (Yatra 3.2 or later).

If your trips are in **WP Travel Engine** on the same WordPress site, Yatra can copy them into Yatra for you. WP Travel Engine's own data is only read — it is never changed or deleted.

## Before you start

- WP Travel Engine's trips must be in **this site's database**. The WP Travel Engine plugin doesn't need to be active.
- Take a backup of your site.
- Set your currency in <span class="screen-path">Yatra → Settings → Currency</span> first. Prices are copied as numbers, **not converted**. If WP Travel Engine used a different currency, the scan warns you.

## What is imported

| From WP Travel Engine | Becomes in Yatra |
| --- | --- |
| Trips (title, descriptions, duration and the other trip facts that have a matching Yatra field) | Trips, through the same path as the trip editor |
| Itinerary days | The trip's itinerary |
| FAQs | The trip's FAQs |
| Prices, including per-traveller-category prices | The trip's price and traveller categories |
| Highlights | Highlights |
| Cost includes / excludes | Included and excluded items |
| Featured image and gallery images | Featured image and gallery |
| Destinations | Destinations |
| Activities | Activities |
| Trip types | Trip categories |
| Difficulty levels | Difficulty levels |

Existing destinations, activities, categories and difficulty levels with the same name or slug are reused, not duplicated.

Trip status carries over: published trips stay published and private trips stay private. Scheduled and draft trips are imported as **drafts**.

## What is not imported

- **Bookings, payments, customers and enquiries.** These stay in WP Travel Engine.
- **Fixed departure dates** and package departure dates — recreate them under <span class="screen-path">Yatra → Departures</span> or [Availability](/availability).
- **Group discounts** — recreate them under <span class="screen-path">Yatra → Discounts</span>.
- **Extra pricing packages.** If a trip has several packages, only one is imported; the scan names it.
- The **video gallery**, the **route map** (embed or image), **trip tags** and extra content tabs.

The scan lists these per trip, with the reason, so you know what to recreate.

::: warning Per-group prices
Yatra imports WP Travel Engine prices **per person**. If a trip had per-group prices, it is imported as a **draft** so you can check its traveller categories and prices before publishing.
:::

Nested destinations or activities are imported without their parent, because Yatra's destination and activity lists are flat.

## To import your trips

1. In the Yatra admin, click **Tools** at the top of the screen, then open the **WP Travel Engine** tab.
2. Yatra looks for WP Travel Engine data and shows what it found: trips, destinations, activities and trip types, trips already imported, and bookings (which won't be imported).
3. Click **Scan (dry run)**. Nothing is written. The **Scan results** list every trip and what will happen to it — *Create*, *Update* or *Skip* — with its days, FAQs, pricing and any notes.
4. Read the notes. They tell you what can't be imported for each trip.
5. Click **Import**. Yatra first imports destinations, activities and categories, then the trips in small batches, with a progress bar.
6. When it finishes you see how many trips were created, updated, skipped or failed, and an **Import log** with **Edit** and **View** links for each trip.
7. Open a few trips and check them before you take bookings. A trip with no price gets the note "set a price before taking bookings".

### If the import stops

Large sites import in batches. If the import stops (you close the tab, the connection drops), open the tab again and click **Resume from trip … of …** to carry on where it left off.

Only one import can run at a time. If another admin is importing, you'll be asked to wait a minute.

### Running it again

Running the import again **never duplicates trips**. Trips imported before are skipped. To refresh them from WP Travel Engine, tick **Update trips imported before** and import again — this overwrites those Yatra trips with WP Travel Engine's current content (each trip keeps its Yatra URL), so don't use it on trips you have since edited in Yatra.

## After the import

- Recreate departures, group discounts and any extra packages listed in the notes.
- Set up payments in [Payments & gateways](/payment-settings).
- Make a test booking — see [Quick start → Make a test booking](/quick-start#step-5-—-make-a-test-booking).
- When you're happy, deactivate WP Travel Engine. Its data stays in the database; Yatra doesn't delete it.
