---
title: Support
description: Get help with Yatra — WordPress.org forum, GitHub bug reports, Pro priority support, and how to file a useful bug report.
---

# Support

Yatra is supported in three places, depending on what you need.

## Where to ask

| Channel                                                                       | Best for                                       | Response       |
| ---                                                                           | ---                                            | ---            |
| [WordPress.org plugin forum](https://wordpress.org/support/plugin/yatra/)     | Public Q&A on the free plugin                   | Best effort    |
| [GitHub issues](https://github.com/MantraBrain/yatra)                         | Bug reports, feature requests, code-level talk  | Best effort    |
| [wpyatra.com priority support](https://wpyatra.com/contact/)                  | Pro license holders, billing, urgent issues    | Per plan SLA   |

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Priority support is included with every Pro plan</span>
  </div>
  <p class="pro-callout__desc">Pro license holders get faster response times via the priority queue. Severity-1 ("site down") tickets are escalated.</p>
  <a class="pro-callout__cta" href="https://wpyatra.com/pricing/">Compare Pro plans →</a>
</div>

## Filing a useful bug report

A good bug report saves a round-trip and gets your issue fixed faster. Include:

### 1. Environment

- WordPress version (<span class="screen-path">Settings → General</span>).
- PHP version (<span class="screen-path">Tools → Site Health → Info</span>).
- Yatra version + Yatra Pro version.
- Active theme.
- Active plugins list.

### 2. Steps to reproduce

A numbered list a stranger could follow:

```
1. Go to /trips/.
2. Click "Everest Base Camp Trek".
3. Click "Book now".
4. Pick March 5 departure, 1 adult.
5. Pay with Stripe sandbox card 4242 4242 4242 4242.
6. Land back on /booking/?confirmed=1.
   Expected: booking shows "confirmed".
   Actual: booking shows "pending" and the customer is not auto-confirmed.
```

### 3. Expected vs actual

What you expected to happen, what actually happened, and any error messages from `WP_DEBUG`.

### 4. Logs

If applicable:

- Browser console errors.
- Network tab failed requests.
- `WP_DEBUG` log lines from `wp-content/debug.log`.
- Yatra logs (<span class="screen-path">Tools → Logs</span>).

Wrap in fenced code blocks. Redact license keys, gateway secrets, JWTs.

### 5. Screenshots / videos

A 5-second screen capture of the issue is gold. Loom, CleanShot X, ShareX, or QuickTime all work.

## What to expect

- **First response** — within a working day for free, or per plan SLA for Pro.
- **Triage** — your report is classified (bug / question / feature / can't reproduce).
- **Fix or workaround** — bugs are routed to engineering; ETA depends on severity.
- **Release** — fixes ship in the next release. Hotfix patches when urgent.

## Escalating a critical issue

If a fix is blocking production revenue:

<ol class="step-list">
  <li>Reply to the ticket with <strong>"BLOCKING REVENUE"</strong> in the subject + a quantitative impact (e.g. "$5k / day").</li>
  <li>Include a working contact (phone / WhatsApp).</li>
  <li>We attempt a workaround within hours and a release within days.</li>
</ol>

## Feature requests

Welcome on:

- [GitHub issues](https://github.com/MantraBrain/yatra) labeled **enhancement**.
- Direct conversation with your account manager (Pro plan customers).

We prioritize features that solve a problem affecting many sites, fit Yatra's "WordPress-native tour-operator" positioning, and are reasonable to maintain long-term.

## Security disclosures

**Do not** open a public GitHub issue or forum post for security vulnerabilities. Email the wpyatra.com security contact privately. We follow coordinated disclosure: confirm, fix, release, then publicly credit the reporter (if desired) after the patch is in users' hands.

## Useful links

- 📖 [Yatra documentation](https://docs.wpyatra.com/) — official docs hub.
- 🛒 [Buy Yatra Pro](https://wpyatra.com/pricing/) — license plans.
- 🐙 [GitHub](https://github.com/MantraBrain/yatra) — issues and source.
- 📨 [Contact wpyatra.com](https://wpyatra.com/contact/) — sales + support.

## What's next

- [Installation](/installation)
- [Troubleshooting](/troubleshooting)
- [FAQs](/faqs)
- [Changelog](/changelog)
