---
title: Mailchimp Integration
description: Step-by-step setup for the Yatra Pro Mailchimp module — get your API key, pick a list, configure tags and merge fields, and verify with a test booking.
prev:
  text: Advanced Discount
  link: /modules/advanced-discount
next:
  text: Facebook Pixel
  link: /modules/facebook-pixel
---

# Mailchimp Integration <span class="pro-pill">PRO</span>

![Yatra Settings → Integration → Mailchimp panel](/screenshots/modules/mailchimp-settings.webp)

Push every confirmed booking into a **Mailchimp audience** — automatically tagged with the trip name and updated with merge fields like first name, last name, booking total, and last-trip date. Lets you run pre- / post-trip campaigns without exporting CSVs by hand.

## What you'll need

| Thing                    | Where to get it                                                                                   |
| ---                      | ---                                                                                               |
| A Mailchimp account      | <https://mailchimp.com/signup/> — free tier is fine for up to 500 contacts.                       |
| An audience (list)       | Mailchimp dashboard → **Audience → Create Audience**. Most operators have just one.                |
| An admin API key         | Step 1 below.                                                                                     |
| Yatra Pro license + the Mailchimp module enabled | <span class="screen-path">Yatra → License</span> and <span class="screen-path">Yatra → Modules → Mailchimp</span>. |

::: tip About sandboxes
Mailchimp doesn't have a separate sandbox — you test against your real account. Use a test audience if you want to keep the live one clean while wiring everything up.
:::

## Step 1 — Get your Mailchimp API key

1. Sign in at <https://login.mailchimp.com/>.
2. Click your **profile icon** (top-right) → **Profile**.
3. From the top tabs pick **Extras → API keys** (direct link: <https://us1.admin.mailchimp.com/account/api/>; replace `us1` with your data centre — see the URL in your browser).
4. Scroll to **Your API keys** → click **Create A Key**.
5. Give it a label like `Yatra YOUR-SITE-NAME`. Mailchimp shows the key **once** — the format is 32 hex characters, a hyphen, and your data-centre prefix (for example `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usNN`, where `NN` is your data centre number).
6. Copy it now and store it in a password manager.

::: warning Mailchimp keys carry full account access
Anyone with the key can read your audience and send campaigns. Treat it like a password. If you suspect it's leaked, *Disable* it from the API keys page and create a new one.
:::

### Find your data centre prefix

The bit after the dash (`-us1`, `-us6`, `-eu1`, etc.) is your **data centre**. Yatra reads it from the key itself — you don't paste it separately.

## Step 2 — Note your audience ID

1. In Mailchimp pick **Audience → All contacts**.
2. Use the audience selector at the top to confirm you're on the right one.
3. Open **Settings → Audience name and defaults** for that audience.
4. The **Audience ID** is a short alphanumeric string like `1a2b3c4d5e`. Copy it.

(You can skip this step — once you save the API key in Yatra, the **Audience** dropdown auto-populates with every audience the key can see. The ID is here only if you want to double-check.)

## Step 3 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find the **Mailchimp Integration** card → flip the toggle on.
3. Reload the page if the Integration settings panel doesn't appear immediately.

## Step 4 — Configure in Yatra

Open <span class="screen-path">Yatra → Settings → Integration → Mailchimp</span> and fill in:

| Field                       | Setting ID                    | What to put                                                                                                |
| ---                         | ---                           | ---                                                                                                        |
| **Mailchimp API Key**       | `mailchimp_api_key`           | The key from Step 1 (`xxxxxxxx-usN`). Click **Verify** — Yatra hits Mailchimp's `/ping` endpoint and confirms it works. |
| **Audience / List**         | `mailchimp_list_id`           | Dropdown populated after the key verifies. Pick your operator audience.                                    |
| **Sync customers on booking** | `mailchimp_sync_on_booking` | Push every confirmed-booking customer into the audience.                                                   |
| **Double opt-in**           | `mailchimp_double_optin`      | Send a confirmation email before adding to the list. Required in EU under GDPR-strict interpretations.    |
| **Add tags**                | `mailchimp_add_tags`          | Tag the synced contact with the trip slug (and optional extras).                                          |
| **Default tags**            | `mailchimp_default_tags`     | Comma-separated tags applied to *every* synced contact (e.g. `yatra,booking,2026`).                       |
| **Field mapping**           | `mailchimp_field_mapping`     | Dynamic table of `Yatra field → Mailchimp merge tag`. Defaults map `customer_first_name → FNAME`, `customer_last_name → LNAME`, `phone → PHONE`. Add rows for `booking_total → TOTAL`, `last_trip_date → LASTTRIP`, etc. — but **create the matching merge fields in Mailchimp first** under Audience → Settings → Audience fields and *|MERGE|* tags. |

::: tip Match merge-field types
Use **text** for everything except dates (use **date** in Mailchimp) and numbers (use **number** for amounts). Yatra sends raw strings; Mailchimp parses them according to the merge-field type.
:::

## Step 5 — Test it

1. Set Yatra's global *Test mode* to off (Mailchimp sync runs in any mode but you want a real confirmed booking).
2. Book a trip yourself as a new test customer with an email you can check (`youraddress+yatratest@gmail.com` works on Gmail).
3. Wait for the booking to flip to **Confirmed**.
4. In Mailchimp → **Audience → All contacts** → search for that email. The contact should appear with the trip tag attached.
5. If you turned **Double opt-in** on, check the inbox — confirm the subscription before the contact shows as `Subscribed`.

## When sync happens

| Event                                | What Yatra does                                                                              |
| ---                                  | ---                                                                                          |
| Customer completes a booking → status `confirmed` | Adds / updates the contact in your audience, applies default + trip-slug tags.   |
| Booking moves to `cancelled`         | Adds a `cancelled` tag (configurable). Does not remove the contact.                          |
| Booking moves to `completed`         | Adds a `completed-2026-03-15`-style tag (the travel-date tag) so you can segment post-trip.  |

## Troubleshooting

**"API key is invalid" after clicking Verify** — make sure you copied the *full* key including the `-us1` suffix. Don't paste the *Disabled* one Mailchimp leaves behind after key rotation.

**"Audience dropdown is empty"** — the key works but your account has no audiences. Create one in Mailchimp first.

**Contacts aren't appearing** — check <span class="screen-path">Yatra → Email Logs</span> for `mailchimp.sync.failed` rows (only visible with the Email Automation Pro module). Otherwise, enable [Settings → Advanced → Debug mode](/settings#_13-advanced) — Yatra writes Mailchimp request/response pairs to `wp-content/uploads/yatra/email-debug.log`.

**Tags aren't applying** — verify the *Add tags* toggle is on AND your tags don't include spaces / special characters Mailchimp rejects.

**Merge fields aren't filling** — the merge fields (`FNAME`, `LNAME`, etc.) must exist in Mailchimp **before** Yatra tries to set them. Yatra silently ignores unknown merge tags. Add them under Audience → Settings → Audience fields and *|MERGE|* tags.

## Useful links

- Mailchimp dashboard: <https://login.mailchimp.com/>
- API keys page: <https://us1.admin.mailchimp.com/account/api/>
- Audience setup guide: <https://mailchimp.com/help/create-audience/>
- Merge tags reference: <https://mailchimp.com/help/all-the-merge-tags-cheat-sheet/>
- API status: <https://status.mailchimp.com/>

## Where to read more

- [All modules](/modules#mailchimp-integration) — module catalog.
- [Settings → Integration](/settings#_10-integration) — every field reference.
- [Email & notifications](/email-settings) — pair Mailchimp with Yatra's transactional emails for a complete lifecycle.
