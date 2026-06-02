---
title: Team & Access
description: Give your travel team exactly the right access — built-in roles, custom roles, magic-link invitations, time-limited access for contractors, per-trip scopes, and a complete audit trail. For agencies and tour operators running Yatra with multiple staff.
prev:
  text: White Label
  link: /modules/white-label
next:
  text: Webhooks
  link: /modules/webhooks
---

# Team & Access

## What is Team & Access?

If you run your travel business with more than one person, **Team & Access** lets you give each team member exactly the right level of access to your Yatra admin — not too much, not too little.

Out of the box, you get **8 ready-to-use roles** that cover the most common jobs (sales agents, accountants, guides, marketers, and so on). If those don't fit, you can build your own custom roles in a few clicks.

**You'll need**: the **Yatra Pro plugin** with the **Team & Access module enabled** (Scale tier).

## Who is this for?

Team & Access is built for:

- **Tour operators with 2+ staff** — split work between guides, front desk, and the owner.
- **Travel agencies** — give accountants access to financials without exposing trip editing; give marketers email tools without exposing bookings.
- **Anyone hiring contractors** — let a seasonal photographer or a freelance writer in for 3 months without remembering to remove them.
- **Anyone who needs an audit trail** — see every sensitive action (who changed which booking, who cancelled what, who logged in when).

If you're a solo operator, you don't need this. The module's still available, but the default WordPress administrator account handles everything you need.

## What you can do

- ✅ Pick from **8 built-in roles** (Owner, Manager, Sales Agent, Front Desk, Guide, Accountant, Marketing, Auditor)
- ✅ Build **custom roles** with exactly the capabilities you need
- ✅ Send **magic-link invitations** by email — the invitee clicks the link, sets a password, and they're in
- ✅ Add an **existing WordPress user** to your team in one click
- ✅ **Create a new user** directly from the Members panel
- ✅ Set **expiring access** for contractors — caps revoke automatically when the date passes
- ✅ Restrict members to **specific trips, destinations, activities, or categories** (scope filtering)
- ✅ Read the **complete audit log** of every sensitive action
- ✅ **Bulk operations** — change role, force logout, remove, or set expiry on many members at once
- ✅ Customize the **invitation email** from the Email → Templates page (matches your White Label branding)

## Getting started

### Step 1 — Enable the module

Go to **Yatra → Modules** and turn on **Team & Access**.

> If you don't see this module, you're not on the Scale tier. [See pricing](https://wpyatra.com/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) or [try Pro free](https://try.wpyatra.com/try-yatra-pro/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs).

### Step 2 — Open the Team & Access page

A new **Team & Access** menu item appears under Yatra. Open it.

### Step 3 — Add your first team member

You have three ways to bring someone in:

- **Add existing WP user** — for people who already have a WordPress account on your site.
- **Create new user** — for new staff who don't have an account yet (you pick the password or send them a reset link).
- **Send invitation** — email a magic-link to anyone, even people who've never been to your site. They click the link and set up their own account.

### Step 4 — Pick a role

You'll see a dropdown with the 8 built-in roles. Pick the one that fits the person's job. If none match, jump to the [Custom roles](#creating-a-custom-role) section.

### Step 5 — Save

That's it. The new member is in, they can see only what their role allows, and every important thing they do is recorded in the audit log.

## The 8 built-in roles

| Role | What they can see |
|------|-------------------|
| **Owner** | Everything. Same as a WordPress administrator. |
| **Manager** | Everything except team management, white labeling, and audit log export. |
| **Sales Agent** | Bookings, customers (read-only), trips (read-only), enquiries, departures. |
| **Front Desk** | Bookings (view + change status), enquiries, departures. Lower bar than Sales Agent. |
| **Guide (scoped)** | View bookings + manage departures for trips assigned to them. |
| **Accountant** | Financial reports, refunds, payment view, exports. No booking PII unless granted. |
| **Marketing** | Email automation, discounts, reviews, operational reports. No bookings access. |
| **Read-only Auditor** | Every view-only capability, including the full audit log. Can't change anything. |

You can [clone any built-in role](#creating-a-custom-role) if it's close but not exact.

## Creating a custom role

If the built-in roles don't fit, build your own:

1. Go to **Team & Access → Roles → Create custom role**.
2. Optionally pick a **starting template** (Customer Support, Reservations Agent, Tour Operator Lead, Finance Reviewer, Content Writer, Volunteer / Intern). These pre-fill common capability sets you can edit.
3. Give the role a name like "Senior Guide" or "Marketing Lead".
4. Tick the capabilities you want to grant. Capabilities are grouped by category — Bookings, Trips, Departures, Customers, Enquiries, Reports, and so on.
5. Save.

Your custom role now appears in the role dropdown next to the built-in roles. You can assign it to any team member.

> **Tip**: built-in roles can't be edited directly (so future Yatra updates don't surprise you). Click any built-in role and choose **Clone to custom role** to make an editable copy.

## Inviting someone by email

1. Go to **Team & Access → Invitations → Send invitation**.
2. Enter the person's email.
3. Pick the role they should have when they accept.
4. Optionally set scopes (specific trips / destinations they'll be limited to).
5. Click Send.

What happens next:

- They receive an email with a unique magic-link. The link works **once** and expires in 15 minutes (configurable).
- They click the link, set their own password, and they're logged in.
- The invitation acceptance is recorded in the audit log.

You can revoke a pending invitation any time from the Invitations tab — the link stops working immediately.

> **Want to customize the email?** Go to **Yatra → Email → Templates** and look for "Team invitation". You can edit the subject and HTML body with the same merge tags (`{{site_name}}`, `{{role_label}}`, `{{accept_url}}`) used everywhere else.

## Time-limited access (contractors)

Hired a seasonal photographer for 3 months? Set an expiry date:

1. Open the team member from **Members**.
2. Scroll to **Access expires on (optional)**.
3. Pick a date and time.

What happens at expiry:

- The moment the date passes, the member's Yatra capabilities are revoked (in-memory, immediately).
- Within an hour, a background job cleans up their role assignment fully.
- The expiry event is recorded in the audit log.

If you forget about them, you don't have to worry — they're auto-revoked.

> The picker shows your **current local time** + a relative offset like "Expires in 30 days" so there's no ambiguity.

## Restricting to specific trips or destinations (scopes)

By default, a team member with the **Sales Agent** role sees every booking on your site. Scopes let you narrow that down:

- Restrict a guide to a specific destination ("Switzerland trips only").
- Restrict a sales agent to a specific category ("Adventure trips only").
- Restrict a marketer to specific trips ("the 5 trips in our new campaign").

To set scopes:

1. Open the team member from **Members**.
2. Below the role section, you'll see scope fields for Destinations, Activities, Trips, and Categories.
3. Tick the ones they should be limited to. Leave blank for unrestricted access.

Scopes apply at the database level — your team member literally cannot see bookings, trips, or reports outside their scope.

## The audit log

Every sensitive action is recorded:

- Member added / removed / role changed
- Role created / edited / deleted
- Invitation sent / accepted / revoked
- Booking refunded / cancelled / deleted
- Settings changed
- Every denied attempt (someone tried to do something they couldn't)

The audit log shows: **when**, **who**, **what they did**, **where** (entity type + ID), and **whether it was allowed or denied**.

You can:

- **Filter** by actor, action, entity, result, or date range.
- **Select rows** and bulk-delete (with confirmation).
- **Clear the entire log** (writes a final entry recording who cleared it — you can't erase the erasure).

Default retention is **180 days**. You can change this with the `yatra_audit_retention_days` filter (capped at 730 days).

## Settings: "Keep team access running when this module is turned off"

This is the most important setting on the page. It controls what happens to your team's access **if you ever turn off the Team & Access module**.

### When the toggle is OFF (default)

This is the default. It's the security-conservative choice: if you ever turn off the module, **every Yatra role** on your site is deleted — the 8 built-in roles AND any custom roles you built. Your team members lose all their Yatra access immediately. The reasoning is that disabling the module should mean disabling the access it grants — leaving role-based access alive after the module is off would let stale grants linger silently.

You (the site owner / WordPress administrator) always keep full access either way — admins are exempt from this revocation by design.

Re-enabling the module brings back the **8 built-in roles only**. Your custom roles and your original member assignments are **gone forever** (the role records are deleted from the database). The audit log itself is preserved.

### When the toggle is ON

Flip the toggle to ON if you want the permissive behavior: turning off the module from **Yatra → Modules** preserves every team member's roles and current access. Advanced features (expiry, scopes, audit log) pause until you turn the module back on, but the role grants themselves stay live via WordPress' native role machinery. Re-enabling restores everything exactly as it was.

Pick ON only when you specifically need team access to survive a module-off period — typically a brief maintenance window where you'll re-enable within hours or days.

The Settings tab and a banner on every Team & Access tab make the current state very obvious, so it's hard to be surprised whichever way you've set it.

## Settings: Restrict staff logins by source IP

A second card on the Settings tab lets you restrict where your staff can sign in from — for example a corporate VPN range or a small list of office IPs.

How it works:

- Paste a comma- or newline-separated list of CIDRs into the textarea (e.g. `203.0.113.0/24, 198.51.100.5`). Both IPv4 and IPv6 are accepted.
- Empty list = no restriction. The feature is off by default; you opt in only if you want it.
- The check fires at the WordPress login step, **after** password verification — wrong passwords are still rejected normally; this only adds a second check on the source IP.

### Who is affected

Only users who hold a Yatra role (any `yatra_*` role). Pure WordPress users (subscribers, customers, contributors with no Yatra grant) sign in normally, untouched by the gate. **WordPress administrators are always exempt** — you (the site owner) can never lock yourself out by misconfiguring the allowlist.

### Per-user override

If a specific team member needs to bypass the allowlist (a remote contractor, a guide on the road), filter `yatra_team_login_ip_allowlist_for_user`:

```php
add_filter('yatra_team_login_ip_allowlist_for_user', function ($cidrs, $user) {
    if ($user->user_login === 'remote-ops') return [];   // unrestricted
    return $cidrs;
}, 10, 2);
```

Returning `[]` for a user disables the restriction for them only.

### Behind a load balancer or Cloudflare

By default Yatra reads the visitor's IP address from the direct connection (the standard `REMOTE_ADDR` value). That works for most setups. But if your site sits behind a service like Cloudflare or an AWS load balancer, the direct connection comes from the *proxy*, not the visitor — the visitor's real IP is forwarded in a separate header (`X-Forwarded-For`). Yatra ignores that header by default (because any random browser could fake it), so you need to explicitly tell Yatra which proxies you trust. The CIDR notation below (e.g. `10.0.0.0/8`) just means "this whole range of addresses" — Cloudflare publishes their ranges at [cloudflare.com/ips](https://www.cloudflare.com/ips/).

```php
add_filter('yatra_trusted_proxy_cidrs', fn() => ['10.0.0.0/8', '173.245.48.0/20']);
```

The right-most non-trusted hop in `X-Forwarded-For` is treated as the client. Without this filter, `X-Forwarded-For` is ignored entirely (never trusted blindly — any client can set the header on a direct request).

### Emergency disable

If a misconfigured allowlist locks everyone out, drop this line into `wp-config.php`:

```php
define('YATRA_DISABLE_LOGIN_IP_ALLOWLIST', true);
```

The gate stops firing immediately, no database access needed. Use it to recover, then remove the line and fix the allowlist properly.

### What gets recorded

Every blocked login is logged to the audit log under the action key `team.login_blocked_by_ip` with the source IP and the user account that was blocked. Useful for spotting credential-stuffing attempts against staff accounts, and for compliance review showing the gate is firing as intended.

## Troubleshooting / FAQ

### My team member can't see X — why?

Check three things, in order:

1. **Their role** — does the role grant the capability they need? (Open Roles → click the role → look at the capability matrix.)
2. **Their scope** — are they restricted to specific trips/destinations that exclude what they're trying to see?
3. **Their expiry** — has their access already expired? (Check the Members table.)

### I disabled the module and now no one can do anything

You probably had the "Keep team access running" setting turned off. Two options:

- **Quick fix**: re-enable the Team & Access module from Yatra → Modules. The 8 built-in roles come back. But: your custom roles and member assignments are gone — you'll need to re-add members and re-assign roles.
- **Avoid next time**: leave the "Keep team access running" setting ON (the default).

### I'm a WordPress administrator and the Team module isn't letting me edit my role

That's intentional. WordPress administrators always pass every Yatra capability check via the admin fallback. Assigning a Yatra role to a WP admin would be a misleading no-op — the assignment wouldn't actually do anything because the admin fallback overrides it.

If you want to scope your own access, first remove your administrator role from **Users → Edit User → Role** (set yourself to a non-admin WP role), then come back here and assign a Yatra role.

### Can I limit a user to one trip only?

Yes. Open the member, go to the Trips scope, tick only that one trip.

### What happens if I deactivate the entire Yatra Pro plugin?

Same as turning off the Team & Access module with the "Keep access" setting OFF: every non-admin team member loses Yatra access. The free plugin's safety filter handles this so deactivating Pro doesn't leave half-active role assignments.

### Are passwords ever shown to me?

Never. When you create a new user, you either:

- **Send a reset-password email** (recommended) — the user clicks the link and sets their own password. You never see it.
- **Set the password manually** (8+ characters) — you share it with them out-of-band (Slack, DM, in person). We don't store the plain-text password.

### Where does the invitation email come from?

The same SMTP / email service you've configured under **Yatra → Email → Delivery**. If your invitations aren't arriving, check that page first.

### Is the audit log tamper-proof?

It's append-only by design — there's no "edit" action on a row. You can delete rows (Clear all or Bulk-delete), but **deletion itself is logged**: a new audit entry recording who cleared what survives in the freshly-emptied log. You can't erase the evidence of the erasure.

### Does the Team & Access module work on the free Yatra plugin?

No — it's a Scale-tier Pro module. The free plugin gives the standard WordPress administrator full access to everything. Team & Access is for when you need granular roles for multiple staff.

[Try Yatra Pro for free](https://try.wpyatra.com/try-yatra-pro/?utm_source=docs&utm_medium=referral&utm_campaign=yatra-docs) (no credit card required) — spin up a sandbox site with the module pre-installed.

## Related

- [White Label](/modules/white-label) — rebrand the admin, emails, and PDFs for your agency.
- [Webhooks](/modules/webhooks) — push booking events to your other systems (Zapier, n8n, custom backends).
- [Audit log retention filter (developer reference)](/api-reference#audit-log) — change retention period via `yatra_audit_retention_days`.
