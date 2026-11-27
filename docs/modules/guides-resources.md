---
title: Guides & Resources
description: Yatra Pro Guides & Resources — guide profiles on trip pages and a schedule for guides, vehicles, rooms and equipment with double-booking checks.
---

# Guides & Resources <span class="pro-pill">PRO</span>

Keep your guides, vehicles, rooms and equipment in one place and plan who and what goes on each trip date:

- **Guide profiles** — photo, languages, years of experience and a short bio — shown on the trip pages you choose as **Meet your guides**.
- **Resources** — vehicles (with seats), rooms (with beds) and equipment, with how many of each you have.
- **Schedule** — assign guides and resources to trip dates. Yatra warns you before you double-book a guide or use more vans than you own, and flags a trip date with more travellers than the seats or beds you assigned.
- **`{{departure_guides}}`** in booking emails — the guides assigned to the booking's trip date.

::: info Plan and versions
**Yatra Pro — any plan.** New in Yatra Pro 3.3.0; needs the free **Yatra 3.3.0 or later** for the admin screen.
:::

## Turn it on

<span class="screen-path">Yatra → Modules</span> → **Guides & Resources** (category *Operations*) → toggle on. A **Guides & Resources** item appears in the Yatra menu.

## Add guides and resources

<span class="screen-path">Yatra → Guides & Resources → Add</span>

- **Guide**: name, photo, languages, years of experience, *About* (shown on trip pages), and **Show on trip pages**.
- **Vehicle / Room**: how many you have and seats (or beds) each.
- **Equipment / Other**: how many you have.
- Phone, email and internal notes are for your staff only and are never shown on the site.

Set a guide or resource to **Inactive** to hide it without deleting its history. Deleting one also removes its assignments.

## Show guides on a trip page

<span class="screen-path">Yatra → Trips → edit a trip → Availability & Booking → Guides on the trip page</span> — tick the guides. Active guides with **Show on trip pages** on appear in a **Meet your guide(s)** section below the trip's content.

## Plan the schedule

<span class="screen-path">Yatra → Guides & Resources → Schedule → Assign</span>

1. Choose the guide or resource, the trip and the **departure date**. **Until** defaults to the trip's length.
2. For a resource you have several of, choose **How many**.
3. **Assign**. If the guide (or all your vans) is already booked on overlapping dates, Yatra says so and offers **Assign anyway**.

The schedule lists assignments in the dates you pick, with the number of travellers booked on that trip date. Rows show **Double-booked** and **only N seats/beds** when something needs your attention.

## For developers

REST (staff with *view trips* / *edit trips*): `GET|POST /yatra/v1/resources`, `POST|DELETE /yatra/v1/resources/{id}`, `GET|POST /yatra/v1/resource-assignments` (POST answers **409** with the clashes; send `force: true` to assign anyway), `DELETE /yatra/v1/resource-assignments/{id}`.

Tables: `{prefix}yatra_resources`, `{prefix}yatra_resource_assignments` (created when the module first runs). Trip custom field `guide_ids`. Hook `yatra_single_trip_after_tabs` (Yatra 3.3).
