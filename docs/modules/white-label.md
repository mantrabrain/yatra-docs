---
title: White Label
description: Step-by-step setup for the Yatra Pro White Label module — rebrand the entire admin (logo, name, colors, menu, PDFs) as your own product. Agency-tier only. Remove every reference to Yatra and MantraBrain from what your clients see.
prev:
  text: Webhooks
  link: /modules/webhooks
next:
  text: Mailchimp
  link: /modules/mailchimp
---

# White Label <span class="pro-pill">PRO</span>

![Yatra → White Label — Branding, Sidebar, Theme, Chrome tabs](/screenshots/modules/white-label-branding.webp)

The **White Label** module rebrands the entire Yatra plugin as your own product. Your clients see your logo, your company name, your color scheme, your support links — and never see the words "Yatra" or "MantraBrain" anywhere in the admin, in customer-facing PDFs, or on the plugin list. Agencies use this to deliver Yatra as if it were custom software they built.

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Agency** tier (Yearly or Lifetime) | <span class="screen-path">Yatra → License</span> |
| White Label module enabled | <span class="screen-path">Yatra → Modules → White Label</span> |
| A logo (PNG / SVG / WebP, ~64×64 px) | Your design |
| A primary brand color (hex code) | Your style guide |

> **Agency tier only.** White Label is the only feature gated to Agency licenses specifically — Growth licenses see the upgrade card. Personal sees no module at all.

## What gets rebranded

| Surface | What changes |
| --- | --- |
| **Admin sidebar logo** | Your logo + brand name replace the Yatra logo + "Yatra" wordmark. |
| **Plugin list (Plugins screen)** | Plugin name, description, and "Author" line replaced. |
| **Admin emails** | "From" name + footer text use your brand. |
| **Customer-facing PDFs** | Booking confirmation, invoice, itinerary PDFs use your logo + brand. |
| **Frontend booking widget** | Powered-by hidden, button colors match your brand. |
| **Setup wizard** | Branded onboarding for sub-admins. |
| **Sidebar menu structure** | Rename, reorder, hide, re-icon, or promote any sidebar entry. |
| **Sidebar / top-bar colors** | Independent of WordPress' admin color scheme — your branding overrides. |
| **UI chrome** | Hide the version chip, "Back to WordPress" link, and "Join Community" link. |

## What does *not* get rebranded

- The **License** page itself still says "Yatra Pro" — operators need to know what product they're licensing. (This is the same pattern Adobe/Microsoft follow with their reseller programs.)
- The **wpyatra.com support links** are removed only when you've configured your own support URL. Otherwise customers see "Need help? Visit support.wpyatra.com" — better than no link at all.

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **White Label** → toggle on. The toggle is disabled on Personal / Growth tier — only Agency Yearly + Agency Lifetime price IDs qualify.
3. A new menu entry **White Label** appears in the sidebar (under the Crown icon).

## Step 2 — Brand identity (Branding tab)

Open <span class="screen-path">Yatra → White Label → Branding</span>.

![Branding tab — Plugin name, Company name, Logo, Primary color, Website + Support URLs](/screenshots/modules/white-label-branding-form.webp)

| Field | Notes |
| --- | --- |
| **Plugin name** | Display name everywhere "Yatra" used to appear. e.g. *Acme Trips* or *Adventure Booking Pro*. |
| **Company name** | Shown as the plugin author + in PDF footers. e.g. *Acme Travel Co.* |
| **Website URL** | Where the brand name in the sidebar links to. Defaults to your WordPress home URL. |
| **Support URL** | Where the in-admin help links go. e.g. `https://acme-trips.com/support`. Leave blank to fall through to wpyatra support. |
| **Logo URL** | Upload via the WP Media library or paste a URL. Recommended: SVG or PNG at 64×64 px, transparent background. The sidebar renders it at 32×32 inside a colored badge. |
| **Primary color** | Hex code (e.g. `#0066cc`). Drives accents in buttons, badges, focus rings, and chart colors. |

Save. Reload the admin — the sidebar logo + name update immediately.

## Step 3 — Sidebar menu customization (Sidebar tab)

This is where White Label gets genuinely powerful. Open <span class="screen-path">Yatra → White Label → Sidebar</span>.

![Sidebar tab — drag-and-drop menu editor with rename + icon picker + hide + parent move](/screenshots/modules/white-label-sidebar.webp)

The sidebar editor lets you fully restructure the Yatra admin menu. Every Yatra menu entry (top-level + submenu) shows up as a drag-and-drop card with these controls:

| Control | What it does |
| --- | --- |
| **Drag handle** | Reorder entries within their parent. Drop a top-level entry on another top-level entry to nest it as a child. |
| **Rename** | Override the label. Leave blank to keep the default. |
| **Icon** | Pick from: curated Lucide icons (matches the rest of the UI), the Yatra icon library (300+), FontAwesome Solid / Regular, or upload your own SVG / PNG. |
| **Hide** | Hide the entry from the sidebar. The route still works if the user knows the URL — it's a visibility-only override. |
| **Move to parent** | Promote a submenu item to top-level, or demote a top-level item to be a child of another. |

### Common patterns

**Hide the things your clients don't need.** Modules, License, Tools — your clients shouldn't manage these. Hide them. As Agency admin you still see them when logged in with your own role.

**Rename to your domain language.** *Trips* → *Tours*. *Departures* → *Trips on calendar*. *Enquiries* → *Leads*. *Customers* → *Guests*. Pick the vocabulary your client uses.

**Reorder for the client's workflow.** Some clients live in the Departures screen all day; others spend most time in Reports. Put their most-used menu first.

**Promote a frequently-used submenu.** *Trips → Availability* used to be a tab; promote it to top-level for clients who edit availability daily.

Changes you make in the Sidebar tab take effect immediately — no page reload required.

::: tip Developer note
Sidebar overrides save to `wp_options.yatra_white_label_settings.menu_overrides` and `menu_order` and are read by the admin React shell on every render. Skip this note if you're not a developer.
:::

## Step 4 — Theme surfaces (Theme tab)

Open <span class="screen-path">Yatra → White Label → Theme</span>.

| Field | Notes |
| --- | --- |
| **Sidebar background** | Background color of the left sidebar. Pick something that contrasts with your logo. |
| **Sidebar text** | Color of menu labels in the sidebar. |
| **Top bar background** | Background of the admin header. Often the same as your primary color for branded effect. |
| **Top bar text** | Color of the page title + header buttons. |

All four are independent — clear one to fall back to the Yatra default. Together they let you reproduce a dark-themed admin, a high-contrast mode, or your brand's exact palette.

## Step 5 — UI chrome (Chrome tab)

Open <span class="screen-path">Yatra → White Label → Chrome</span>. Three toggles:

| Toggle | What it hides |
| --- | --- |
| **Hide version chip** | Removes the `v3.4.0 + Pro v1.5.2` chip under the brand name. Recommended on — your clients shouldn't see version numbers. |
| **Hide "Back to WordPress"** | Removes the back link in the sidebar + top bar. Use when you've fully replaced the WP admin UX with Yatra. |
| **Hide "Join Community"** | Removes the Facebook community link in the top bar. |

## Step 6 — Verify

After saving all tabs:

1. **Hard reload** (Cmd/Ctrl+Shift+R) the Yatra admin — branding loads as part of the initial HTML payload.
2. Open <span class="screen-path">Plugins</span> in WordPress admin and confirm the plugin row shows your renamed name + author.
3. Trigger a test booking email — check the From name + footer.
4. Generate a test booking confirmation PDF — check the logo + branding.
5. Open the live site — check the booking widget's button color matches.

## Multi-site agencies

If you manage many client sites with Agency licenses, you can ship a single small PHP file that pre-fills your default branding on every install — saving you from re-entering the same logo, colors, and naming on each new client setup. This file goes into a special WordPress directory called **`mu-plugins`** (short for "must-use plugins" — plugins that load automatically without needing to be activated). Put the file at `wp-content/mu-plugins/agency-defaults.php`:

```php
// wp-content/mu-plugins/agency-defaults.php
add_filter('yatra_white_label_default_settings', function ($defaults) {
    return array_merge($defaults, [
        'plugin_name' => 'Acme Trips',
        'company_name' => 'Acme Travel Co.',
        'website_url' => 'https://acme-trips.com',
        'support_url' => 'https://acme-trips.com/support',
        'logo_url' => 'https://cdn.acme-trips.com/yatra-logo.svg',
        'primary_color' => '#ed5a1f',
    ]);
});
```

Defaults apply until the client overrides them via the UI, so you can ship a branded install + let the client tweak from there.

## REST API

| Endpoint | Verb | Purpose |
| --- | --- | --- |
| `/yatra/v1/white-label/settings` | GET | Read settings + meta (license tier, agency info, upgrade URL). |
| `/yatra/v1/white-label/settings` | PUT | Save settings. Rejects non-Agency licenses with HTTP 403. |

Both gated on `manage_options` + Agency-active license. The response shape is documented in [REST API reference](/api-reference#white-label).

## WP-CLI: `wp yatra white-label audit`

A read-only command that scans for places the original "Yatra" brand might still be visible to your end users after a rebrand. Three sections in the report:

1. **Brand resolution.** What each `yatra_brand_*` filter currently returns, plus whether the value matches the built-in default. Lets you verify the rebrand is actually wired up before hunting for bugs.
2. **Option leaks.** Scans `wp_options` for rows whose option name starts with `yatra_` AND whose value contains "Yatra" or "yatra" as a substring. These survive the brand filter because the filter only intercepts a fixed list of brand keys — anything stored verbatim (a welcome email body that mentions "Yatra", a stored snippet) bypasses it.
3. **Post-meta leaks.** Same idea for postmeta with `_yatra_*` meta keys — usually empty, worth surfacing.

Usage:

```bash
# Plain table output (default)
wp yatra white-label audit

# JSON for piping into another tool
wp yatra white-label audit --format=json

# CSV for spreadsheet review
wp yatra white-label audit --format=csv

# Cap the per-section row count (default 50, max 500)
wp yatra white-label audit --limit=200
```

The command is non-mutating — it only reads from `wp_options` and `postmeta`. Registered always-on (independent of the module toggle) so it works even when the module is currently off — useful during incident triage ("did we forget to re-enable white-label on this staging clone?").

Doesn't catch every possible leak (it can't scan PDFs already generated, third-party plugins' option blobs, custom code that hardcodes the word "Yatra"). It catches the common ones — the operator-edited options and stored metadata where leaked references typically hide.

## Hooks & filters

| Hook | Purpose |
| --- | --- |
| `yatra_get_brand_name` (filter) | Override the brand name everywhere — handy for sub-site instance variations. |
| `yatra_get_brand_icon_url` (filter) | Override the logo URL. |
| `yatra_white_label_default_settings` (filter) | Set agency-wide defaults — see *Multi-site agencies* above. |
| `yatra_is_agency_active` (filter) | Drives every Agency-gated feature. Returns `true` when the license is Agency Yearly or Agency Lifetime. Filter return value is cached per-request. |
| `yatra_is_ai_eligible` (filter) | Same shape, returns `true` for Growth + Agency. Drives the AI Assistant + WhatsApp gates. |
| `yatra_pro_agency_license_info` (filter) | Returns the agency license payload (expires, tier, customer info) for use in dashboards. |
| `yatra_white_label_active` (filter) | Returns `true` when the module toggle is on. Use to gate code that depends on rebranding being live. |

## What "Agency tier" means

EDD price IDs that qualify as Agency, in order of seniority:

| Price ID | Tier | Source |
| --- | --- | --- |
| 4 | **Agency Lifetime** | Default. |
| 3 | **Agency Yearly** | Default. |
| 2 | Growth Yearly | Unlocks AI + WhatsApp **not** White Label. |
| 1 | Personal Yearly | No premium modules. |

Override the defaults via the `YATRA_PRO_AGENCY_PRICE_IDS` constant or the `yatra_pro_agency_price_ids` filter — agencies running their own reseller stores can map custom EDD price IDs to Agency tier.

EDD's `expires === "lifetime"` sentinel is also honored, so lifetime variants surface correctly even when their price ID isn't on the explicit allowlist.

## Privacy

- Branding lives in `wp_options.yatra_white_label_settings`. Standard WordPress backup tooling captures it.
- Logo URLs can point at WordPress Media library attachments (preferred — survives migrations) or external CDNs.
- The Agency license check makes one HTTP call per day to `store.mantrabrain.com` to verify the license. No customer data is sent.

## Security note: brand text replacement uses DOM-safe substitution

The brand-name rewrite in the admin replaces text nodes only — it walks the DOM with `TreeWalker` and substitutes text contents directly, never assigning `innerHTML`. That means a custom brand name like `<script>alert(1)</script>` is rendered as literal text, not executed. The hardening is automatic; operators don't have to escape input.

## Troubleshooting

**"White Label" doesn't appear in the sidebar** — verify (1) your license is Agency Yearly or Agency Lifetime, **not** Growth, (2) the module is toggled on under Modules. The free-plugin React Layout reads `window.yatraAdmin.isAgency` + `window.yatraAdmin.whiteLabelEnabled` — both must be true.

**Save returns `403 Forbidden`** — license has expired or downgraded to Growth/Personal. The save endpoint re-validates Agency on every PUT to prevent stale UI state from succeeding.

**Logo doesn't show in the sidebar after save** — hard-reload the admin (Cmd/Ctrl+Shift+R). Yatra's React admin caches `window.yatraAdmin` at page load; a soft reload preserves the stale snapshot.

**Some menu entries don't appear in the Sidebar tab editor** — the editor only knows about entries registered before the white-label settings page renders. Pro modules that aren't enabled don't appear in their submenus. Enable the module → reload the White Label page → the entries show up.

**Renamed menu but URL still says "yatra"** — the WordPress admin page slug (`?page=yatra&subpage=trips`) is permanent. We rename what's *displayed*, not the URL. If you need fully-rebranded URLs, file a support ticket — it requires a separate router and breaks existing bookmarks.

**Client wants to see "Acme Trips" in browser tabs too** — set the *Plugin name* field. The HTML `<title>` for Yatra admin pages reads from `yatra_get_brand_name()`.

**Custom icons (uploaded SVG) don't render** — make sure the SVG is publicly accessible (200 OK at the URL). Browser console will show a 403/404 on the icon URL when uploads end up in a protected directory.

## Useful links

- [Settings → Advanced](/settings#_13-advanced) — Yatra-side advanced flags (debug mode, capability mapping).
- [Hooks & filters](/hooks-filters#white-label) — full filter signatures.
- [REST API](/api-reference#white-label) — endpoint schemas.

## Where to read more

- [All modules](/modules#white-label) — module catalog.
- [Channel Manager](/modules/channel-manager) — the other Agency-only module.
- [AI Assistant](/modules/ai-assistant) — Growth + Agency content help.
- [WhatsApp Notifications](/modules/whatsapp) — Growth + Agency messaging.
