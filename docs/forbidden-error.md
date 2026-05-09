---
title: 403 Forbidden error
description: Why Yatra REST or admin requests sometimes return 403 Forbidden, the server / firewall reasons behind it, and a step-by-step checklist to get unblocked.
---

# 403 Forbidden error

A **403 (Forbidden)** error from Yatra's API request means **the server (or a layer in front of it)** rejected the request _before_ Yatra could respond. The Yatra plugin itself does not return 403 on normal calls — almost every case is host-side or security-plugin-side.

You'll usually see it as:

- _Forbidden_ in the browser when saving a setting or completing a booking.
- A 403 in the network tab for `/wp-json/yatra/v1/...`.
- _Error: 403_ in a popup with no further detail.

## What's actually happening

Common reasons:

1. A **server firewall (WAF)** like Cloudflare, Sucuri, or your host's built-in WAF has flagged the request body (often the JSON payload).
2. **ModSecurity** rules at the host level reject specific patterns (long JSON, special characters, `<script>` tags).
3. A **WordPress security plugin** is blocking REST API access for non-logged-in or non-admin users.
4. The host has restricted **REST API access** in general (rare but happens on highly locked-down shared hosting).
5. Required **HTTP headers** (`X-WP-Nonce`, `Authorization`) are being stripped by a reverse proxy.

## Step-by-step fix

### 1. Temporarily deactivate security plugins

WordPress security plugins are the most common cause.

<ol class="step-list">
  <li>Open <span class="screen-path">Plugins → Installed Plugins</span>.</li>
  <li>Deactivate one at a time: <strong>Wordfence</strong>, <strong>iThemes / Solid Security</strong>, <strong>All-In-One WP Security</strong>, <strong>Sucuri Security</strong>, <strong>WP Cerber</strong>, etc.</li>
  <li>After each one, retry the action that triggered the 403.</li>
  <li>Once you find the culprit, re-enable it and look for a <strong>"REST API access"</strong> or <strong>"firewall rules"</strong> setting and whitelist the path <code>/wp-json/yatra/</code>.</li>
</ol>

### 2. Check Cloudflare / external WAF

If you use Cloudflare or a CDN with a WAF in front of WordPress:

- In Cloudflare → **Security → WAF**, look at recent **blocked / challenged events**.
- If your domain shows hits on `/wp-json/yatra/...`, add a **WAF rule exception** (Allow + skip Managed Rules) for that path.
- Try toggling Cloudflare to **Development Mode** for 3 hours and retest.

### 3. Verify the WordPress REST API is reachable

Open in a browser:

```
https://YOUR-SITE.com/wp-json/
```

You should see a JSON response listing routes. If you see a 403 here, the REST API itself is being blocked — fix that first before debugging Yatra.

### 4. Reproduce the request manually

Use **Postman** or **cURL** with the same payload:

```bash
curl -i \
  -H "Content-Type: application/json" \
  -H "X-WP-Nonce: YOUR_NONCE" \
  -d '{"key":"value"}' \
  https://YOUR-SITE.com/wp-json/yatra/v1/bookings
```

If the manual request also returns 403, the issue is 100% server-side.

### 5. Disable ModSecurity (if available on your host)

cPanel-style hosts often expose ModSecurity:

- Log in to cPanel / Plesk / your host's control panel.
- Find **ModSecurity** (usually under Security).
- Toggle it **Off** for your domain.
- Retest. If 403 stops, contact your host to whitelist the offending rule rather than leaving ModSecurity off forever.

## Quick checklist

| Step | Try this | Look for |
| --- | --- | --- |
| 1 | Visit `/wp-json/` | JSON, not 403 |
| 2 | Disable security plugins one-by-one | 403 stops? |
| 3 | Cloudflare WAF logs | Blocked events on `/wp-json/yatra/` |
| 4 | Manual cURL / Postman call | Same 403 → host-side |
| 5 | Disable ModSecurity | 403 stops? Contact host to fix the rule |

## What to send to your host

If the issue is host-side, open a support ticket with this exact information:

- **The URL** (e.g. `https://your-site.com/wp-json/yatra/v1/bookings`).
- **The full request body** (JSON Yatra sent — copy from the browser network tab).
- **The exact response headers** (a 403 often includes a Mod_Security ID or rule reference).
- **The ask:** _"This is a legitimate REST API request from a WordPress plugin. Please review your firewall / ModSecurity rules and whitelist this request pattern."_

## Why it isn't a Yatra bug

- Yatra's PHP code has no 403 responses for normal user actions — it returns 401 for missing nonces or 4xx with detailed JSON for validation errors.
- A 403 with the **server's default error page** (or a CDN-style "Access denied" page) means the request never reached PHP at all.

## Related

- [Troubleshooting](/troubleshooting) — REST 404 on routes, permalinks, role issues.
- [PayPal: "things don't appear to be working at the moment"](/paypal-troubleshooting) — PayPal-specific gateway error.
- [Support](/support) — open a Pro priority ticket if you need help.
