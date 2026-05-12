---
title: Dynamic Form Field
description: Step-by-step setup for the Yatra Pro Dynamic Form Field module — per-trip custom fields on the booking form (dietary requirements, T-shirt size, medical info) with conditional visibility.
prev:
  text: Email Automation
  link: /modules/email-automation
next:
  text: Advanced Discount
  link: /modules/advanced-discount
---

# Dynamic Form Field <span class="pro-pill">PRO</span>

![Trip Builder → Custom Fields tab — drag-and-drop builder per trip](/screenshots/modules/dynamic-form-field-builder.webp)

The free [Booking Form Builder](/settings#_4-booking-form) shapes the *site-wide* checkout form — fields every trip needs (name, email, country). The Dynamic Form Field module adds **per-trip custom fields** on top — so a Food Tour can collect *Dietary requirements*, an Adventure trek can collect *Fitness level + emergency contact*, and a Yoga retreat can collect *T-shirt size*, all without polluting the global form.

## What you'll need

| Thing                                  | Where to get it                                                          |
| ---                                    | ---                                                                      |
| Yatra Pro license                      | <span class="screen-path">Yatra → License</span>                        |
| Dynamic Form Field module enabled      | <span class="screen-path">Yatra → Modules → Dynamic Form Field</span>   |
| A baseline Booking Form configured     | See [Settings → Booking Form](/settings#_4-booking-form) — this module *extends* the baseline. |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Dynamic Form Field** → toggle on.
3. A new **Custom Fields** sub-tab appears inside every trip's Trip Builder.

## Step 2 — Add fields to a specific trip

1. Open the trip in the Trip Builder.
2. Click the **Custom Fields** sub-tab (only visible with the module on).
3. Click **+ Add Field** to create a custom field.

![Custom Field editor — type, label, placeholder, required, conditional visibility, per-traveler toggle](/screenshots/modules/dynamic-form-field-editor.webp)

### Field configuration

| Field                  | Notes                                                                                                                                  |
| ---                    | ---                                                                                                                                    |
| **Label**              | What the customer sees.                                                                                                                |
| **Type**               | `text` / `email` / `tel` / `date` / `select` / `country` / `textarea` / `number` / `checkbox` / `file`.                                |
| **Placeholder**        | Hint text inside the input (most types).                                                                                               |
| **Help text**          | Subtle hint under the field.                                                                                                           |
| **Required**           | Block submission if empty.                                                                                                             |
| **Width**              | `full` / `half` / `third` — controls layout on the booking form.                                                                       |
| **Options** (select)   | Dropdown options as a repeater of `{ value, label }`.                                                                                  |
| **Conditional visibility** | Only show this field when *some other field equals X*. Useful for "if Dietary = vegetarian, show *Notes for chef*". (See below.)    |
| **Per-traveler**       | Toggle. When on, the field is asked once per traveler instead of once per booking. Useful for passport numbers, allergies, T-shirt size. |
| **Sort order**         | Position on the form.                                                                                                                  |

### Conditional visibility

Each custom field can have a rule like:

```
Show this field when [Field X] [equals / not equals / contains] [Value Y]
```

E.g. *Show **Vegetarian notes** when **Dietary requirements** equals **Vegetarian**.*

Multiple rules can chain with AND / OR logic.

## Step 3 — Verify on a test booking

1. Open the trip in a private browser window → **Book Now**.
2. The customer-side form now shows your custom fields between the standard contact info and the payment step.
3. Per-traveler fields show inside each traveler's accordion.
4. Conditional fields appear / disappear as the customer fills upstream answers.
5. Complete the booking → open the booking detail in admin → the custom field answers show in:
   - **Travelers Information** section (per-traveler fields)
   - **Special Requests / custom-fields block** (per-booking fields)

![Customer-side checkout — custom fields per traveler](/screenshots/modules/dynamic-form-field-public.webp)

## Where the data shows up

| Surface                                         | What you see                                                                                |
| ---                                             | ---                                                                                         |
| [Booking detail → Travelers Information](/booking-settings#_3-travelers-information)   | Per-traveler custom field values, labelled.                                                |
| [Booking detail → Customer Information / Special Requests](/booking-settings#_5-special-requests) | Per-booking custom field values.                                                            |
| [Travelers roster](/departures#the-travelers-roster) | Shows custom fields as extra columns. Useful for dietary / accessibility prep pre-departure. |
| Emails                                           | Use the merge tags `{{traveler_custom_fields_html}}` and `{{booking_custom_fields_html}}` in any template — they expand to a nicely formatted block. |
| REST API                                         | Per-traveler and per-booking custom fields are returned in the booking payload.            |

## Common patterns

| Trip type            | Useful per-booking fields              | Useful per-traveler fields                       |
| ---                  | ---                                    | ---                                              |
| Food tour            | Dietary requirements (select)          | —                                                |
| Adventure / trek     | Fitness level (select)                 | Boot size, allergies, medical conditions (text)  |
| Yoga retreat         | Roommate preference (select)           | T-shirt size, mat preference                     |
| Multi-day expedition | Travel insurance policy (file upload)  | Passport #, expiry date, nationality            |
| Wine tour            | Beverage preference (radio)            | —                                                |

## Troubleshooting

**Custom Fields sub-tab missing in the Trip Builder** — module isn't on. Toggle <span class="screen-path">Yatra → Modules → Dynamic Form Field</span>.

**Field appears at checkout but not on the booking detail** — the field was added *after* this booking was made. Existing bookings only carry fields that existed at booking time. New bookings will include the field.

**Conditional field never shows** — verify the upstream field's *value* matches exactly. Yatra does case-sensitive string comparison.

**Per-traveler field doesn't appear inside each traveler's section** — the *Per-traveler* toggle is off. Edit the field and turn it on.

**File-upload fields fail with 413 / size error** — your hosting limits `upload_max_filesize`. Raise the WordPress limit via your host's PHP settings (typically `php.ini`).

## Useful links

- [Settings → Booking Form](/settings#_4-booking-form) — the site-wide baseline this module extends.
- [Bookings → Travelers Information](/booking-settings#_3-travelers-information) — where per-traveler answers show up.
- [Email merge tags](/email-settings#available-merge-tags) — `{{traveler_custom_fields_html}}` + `{{booking_custom_fields_html}}`.
- [Hooks & filters](/hooks-filters) — `yatra_dynamic_field_value`, `yatra_dynamic_field_validate`.

## Where to read more

- [All modules](/modules#dynamic-form-field) — module catalog.
