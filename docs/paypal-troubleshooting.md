---
title: 'PayPal: "things don''t appear to be working at the moment"'
description: Why PayPal returns "Things don't appear to be working at the moment. Please try again later." during a Yatra checkout, and how to fix it in three real-world causes.
---

# PayPal: "Things don't appear to be working at the moment"

If your customers see this message at the PayPal step, PayPal itself is rejecting the request — Yatra has handed off to PayPal cleanly. There are three common causes, walk through them in order.

> The full text of the error is usually:
> _"Things don't appear to be working at the moment. Please try again later."_

## 1. Wrong / unverified PayPal email

The PayPal email you put in <span class="screen-path">Yatra → Settings → Payment → PayPal Simple mode</span> must match a **verified** PayPal Business or Premier account.

<ol class="step-list">
  <li>Open <span class="screen-path">Yatra → Settings → Payment → PayPal Simple mode</span>.</li>
  <li>Confirm the <strong>PayPal email</strong> exactly matches the email on your PayPal account.</li>
  <li>In your PayPal account, confirm the email shows as <strong>Verified</strong> (not <em>Unverified</em>).</li>
  <li>Save and test a small live transaction.</li>
</ol>

> Typos, hidden whitespace, and old aliases that PayPal removed are the #1 cause we see.

## 2. Encrypted Website Payments is ON

PayPal has a setting called **Encrypted Website Payments** that requires an uploaded public certificate. Yatra's PayPal Simple-mode integration does not pre-encrypt the cart with a public certificate, so PayPal will refuse the request when this setting is on.

**Fix — turn it OFF in your PayPal account:**

<ol class="step-list">
  <li>Sign in at <a href="https://www.paypal.com" target="_blank" rel="noopener">paypal.com</a>.</li>
  <li>Hover the cog icon in the top-right and click <strong>Account Settings</strong>.</li>
  <li>From the left sidebar pick <strong>Website Payments</strong>.</li>
  <li>Find <strong>Website preferences</strong> on the right and click <strong>Update</strong>.</li>
  <li>Set <strong>Encrypted website payments</strong> to <strong>OFF</strong>.</li>
  <li>Click Save.</li>
</ol>

::: tip Is turning that off less secure?
No — Yatra performs full IPN / PDT verification with PayPal, so the cart total cannot be tampered with by the buyer. Encrypted Website Payments are an extra layer that some merchants prefer, but it requires a custom certificate flow not covered by the free PayPal Simple mode gateway.

If you absolutely must keep Encrypted Website Payments on, the alternative is to switch the **Mode** field on the PayPal panel from *Simple (email + IPN)* to **Advanced (REST)** — that mode uses a Client ID + Secret (not the email-on-form-post protocol) and is unaffected by Encrypted Website Payments. See [PayPal setup](/payment-settings#paypal-free).
:::

## 3. PayPal locked or not fully set up

Brand-new PayPal accounts and accounts flagged for review are sometimes restricted from accepting payments — PayPal returns the same generic error.

**What to do:**

- Sign in to PayPal and look for any **alert** or **resolution-center notice**.
- Confirm the account is in **good standing** and not under review.
- For new accounts, finish all KYC / verification steps (bank, business info).
- Open a ticket with PayPal asking specifically: _"Why is my account returning Things don't appear to be working when receiving Standard payments?"_

## Quick checklist

| Step | Where | What to verify |
| --- | --- | --- |
| 1 | <span class="screen-path">Yatra → Settings → Payment → PayPal</span> | **Mode** = *Simple (email + IPN)*, **PayPal email** correct |
| 2 | PayPal account → Account Settings → Website Payments | **Encrypted website payments: OFF** |
| 3 | PayPal account → Resolution Center | No open issues / restrictions |
| 4 | PayPal account → Email | The address you pasted shows as **Verified** |

## Still stuck?

If the three causes above all check out and PayPal still returns the error:

- Try a **second** PayPal sandbox transaction — same error in sandbox usually means a config problem; only-in-live errors usually mean account status.
- Switch the PayPal **Mode** field to **Advanced (REST)** under <span class="screen-path">Settings → Payment → PayPal</span> — this uses Client ID + Secret instead of the email-on-form-post protocol and is unaffected by Encrypted Website Payments. See [PayPal setup → Mode B](/payment-settings#paypal-free).
- Capture the request: WordPress → <span class="screen-path">Yatra → Tools → Logs</span> shows the full JSON Yatra sent to PayPal. Forward it to support so we can confirm it isn't malformed.
- Ask your hosting if any firewall rules block outbound calls to `*.paypal.com`.

## Related

- [Payments & gateways](/payment-settings) — how all gateways are configured.
- [Troubleshooting](/troubleshooting) — REST 404, permalinks, role / capability issues.
- [403 Forbidden error](/forbidden-error) — server-level blocking of API requests.
- [Support](/support) — get a priority answer with diagnostics attached.
