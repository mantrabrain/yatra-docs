---
title: Trip Consent
description: Step-by-step setup for the Yatra Pro Trip Consent module — create liability waivers, health declarations, or image-release forms with digital signatures, attach them to trips, and track signed status on bookings.
prev:
  text: Additional Services
  link: /modules/additional-services
next:
  text: Email Automation
  link: /modules/email-automation
---

# Trip Consent <span class="pro-pill">PRO</span>

![Yatra → Trip Consent admin — list of forms, signed count, send-test action](/screenshots/modules/trip-consent-list.webp)

Collect **digital consent forms** from every traveler before their trip — liability waivers, health declarations, image-release consents, COVID screenings, anything you need a signature on. Each form is sent automatically after booking confirmation, signed in-browser, and the booking detail page tracks who has and hasn't signed yet.

## What you'll need

| Thing                            | Where to get it                                                                                             |
| ---                              | ---                                                                                                         |
| Yatra Pro license                | <span class="screen-path">Yatra → License</span>                                                            |
| Trip Consent module enabled      | <span class="screen-path">Yatra → Modules → Trip Consent</span>                                             |
| At least one published trip      | The form is sent on confirmed bookings of trips you attach it to.                                          |
| Your form copy ready             | E.g. waiver text from your insurer or legal advisor — typed into the form's content blocks.                 |

::: tip Templates you'll likely build
Operators usually need 1–3 forms: a **Standard waiver** (everyone signs), a **Health declaration** (for adventure trips), and an **Image release** (for trips where you take marketing photos). Build one of each, then attach selectively per-trip.
:::

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **Trip Consent** → toggle on.
3. A new menu item appears: <span class="screen-path">Yatra → Trip Consent</span>.

## Step 2 — Create a consent form

Open <span class="screen-path">Yatra → Trip Consent → + Add New Form</span>.

![Trip Consent form editor — content blocks, custom fields, signature, validity](/screenshots/modules/trip-consent-form.webp)

### Form basics

| Field           | Notes                                                              |
| ---             | ---                                                                |
| **Name**        | Internal label (e.g. *"Liability Waiver — 2026"*). Not shown to travelers. |
| **Status**      | `Published` (active) / `Draft` (hidden) / `Archived` / `Trash`.     |

### Content blocks

Click **+ Add Content Block** to add the visible body of the form. Each block has:

- **Title** — section heading shown to travelers.
- **Content** — rich-text body. Supports legal-style paragraphs, lists, etc.

Repeat blocks for multi-section forms ("Liability", "Risk Acknowledgement", "Medical").

### Custom fields (optional)

Beyond just signing, you can collect extra structured information:

- **Field label** — e.g. *"Emergency contact phone"*
- **Field type** — text / textarea / email / phone / date / select / checkbox
- **Placeholder text** — shown in the input
- **Required toggle** — block submission if empty
- **Select options** — for dropdown fields

Use these when you need to capture, say, emergency contact details or dietary restrictions on the same form.

### Signature settings

| Field                      | Notes                                                                 |
| ---                        | ---                                                                   |
| **Signature type**         | `full` (full-name signature box) / `half` (initials only — shorter form). |
| **Require signature**      | Toggle. When on, the traveler must draw their signature to submit.    |
| **Require initials**       | Optional separate initials box.                                       |

### Sending behaviour

| Field                | Notes                                                                                            |
| ---                  | ---                                                                                              |
| **Send to**          | Three options: *Lead traveler only*, *All travelers*, *Travelers + Emergency contact*.           |
| **Send before trip (days)** | When to email the signing link (e.g. `3,1` = 3 days before *and* 1 day before).         |
| **Expiry (days)**    | How long the signing link stays valid. Default *No expiry*.                                      |

### Attach to trips

Two options:

1. **Attach to specific trips** — pick from a multi-select of all your trips.
2. **Apply to all trips** — toggle to make this form mandatory for every confirmed booking.

Save the form.

## Step 3 — Verify on a test booking

1. Make a test booking on a trip that has the form attached.
2. Confirm the booking → the consent-request email goes out at the scheduled time.
3. Open the booking detail page in admin → the **Consent Status** sidebar (Pro-only) shows pending signatures.
4. Click the signing link from the email → fill in the custom fields, draw the signature, submit.
5. Refresh the booking detail page → status flips to **All Consents Signed**.

See [Bookings → Consent Status](/booking-settings#_9-consent-status-pro) for the booking-side view.

## The Trip Consent admin

The list page shows every form with these columns:

- **Name**
- **Status** (Published / Draft / Archived)
- **Attached to** (specific trips or *All trips*)
- **Sent** (total requests sent)
- **Signed** (with a percentage)
- **Actions** — Edit / Duplicate / Send Test Email / Trash

### Bulk actions

Mark as Published / Draft / Trash / Delete permanently — adapts to the current status filter.

### Sub-tabs

The module exposes two additional admin views:

1. **Consent Requests** — per-traveler view of every request sent, with status (sent / opened / signed / expired).
2. **Signed Consents** — the archive. Click any row to view the rendered, signed form + signature, with a *Download PDF* button.

## How it shows up to the traveler

![Traveler-side consent form — content, custom fields, signature pad](/screenshots/modules/trip-consent-public.webp)

1. After booking is confirmed → traveler gets an email with a unique signing link (uses the `trip_consent_request` template — see [Email & notifications](/email-settings)).
2. Link opens a clean signing page with your content blocks rendered as readable HTML.
3. Traveler fills custom fields (if any), draws signature in a touch-friendly canvas, submits.
4. They receive a confirmation email with a PDF copy of the signed form.

## Common patterns

| Goal                                                                       | Settings combo                                                            |
| ---                                                                        | ---                                                                       |
| Single waiver, every traveler signs                                        | Send to *All travelers*, attach to *All trips*.                          |
| Lead traveler signs on behalf of family                                    | Send to *Lead traveler only*. Add a custom field for traveler names.    |
| Adventure trips only                                                       | Attach to the specific trips that need it.                              |
| Multi-step reminder series                                                 | Send before trip = `7,3,1` (a week out, three days out, day before).    |
| Capture emergency contact alongside the waiver                             | Add custom fields *Emergency contact name* + *Emergency contact phone*. |

## Troubleshooting

**Consent email isn't sending** — check <span class="screen-path">Yatra → Email → Templates → Trip Consent Request</span> — make sure the template is *Active*. The module is gated; the row appears but the email won't fire until the module is on.

**Signing link expires** — increase the *Expiry (days)* field or set it to *No expiry*.

**Pages render with broken styling** — likely a theme CSS conflict. The signing page uses Yatra's clean styles in an iframe-friendly layout; you can override via the `yatra_consent_signing_page_css` filter.

**Custom fields not appearing on the PDF** — the PDF renderer reads from the saved consent request. If a field was added *after* the request was sent, regenerate the request (Resend) to include the new field.

## Useful links

- [Email → Trip Consent Request template](/email-settings#account-consent) — customise the email copy and merge tags.
- [Bookings → Consent Status](/booking-settings#_9-consent-status-pro) — see the signed/pending status per booking.
- [Hooks & filters](/hooks-filters) — `yatra_consent_form_saved`, `yatra_consent_signed`, etc.

## Where to read more

- [All modules](/modules#trip-consent) — module catalog.
- [Settings → Integration](/settings#_10-integration) — Pro module status.
