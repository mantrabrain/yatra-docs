---
title: AI Assistant
description: Step-by-step setup for the Yatra Pro AI Assistant module — bring your own OpenAI or Anthropic key and unlock inline AI generation across the trip editor, SEO fields, enquiry inbox, and dashboard digest.
prev:
  text: Custom Landing Pages
  link: /modules/custom-landing-pages
next:
  text: WhatsApp Notifications
  link: /modules/whatsapp
---

# AI Assistant <span class="pro-pill">PRO</span>

![Trip editor — AI sparkle affordance generates a description, SEO title, and meta description in one click](/screenshots/modules/ai-assistant-trip-form.webp)

The **AI Assistant** adds in-place AI writing help across Yatra's editors — trip descriptions, SEO copy, replies to customer enquiries, even a daily dashboard summary. You bring your own key from OpenAI or Anthropic (both are well-known AI providers — like an electricity meter, you pay them directly for what you use), and Yatra simply wires that key into the editors. There's no Yatra markup on top, and your content goes straight to the provider you chose without passing through any Yatra server in between.

::: tip Which AI provider should a beginner pick?
**Start with OpenAI and the `gpt-4o-mini` model.** It's cheap (around $0.15 per million input tokens at the time of writing — typical operators spend $1–3 per 100 trip generations), fast, and works well for travel copy. Anthropic's `claude-3-5-sonnet-latest` produces more polished prose but costs ~5× more — switch to it once you know you'll use the assistant heavily. You can save both keys and switch per-prompt later.
:::

## What you'll need

| Thing | Where to get it |
| --- | --- |
| Yatra Pro license — **Growth** or **Agency** tier | <span class="screen-path">Yatra → License</span> |
| AI Assistant module enabled | <span class="screen-path">Yatra → Modules → AI Assistant</span> |
| OpenAI API key (or Anthropic — pick one) | [platform.openai.com → API keys](https://platform.openai.com/api-keys) · [console.anthropic.com → API keys](https://console.anthropic.com/) |
| ~$5–20 in provider credit | OpenAI / Anthropic dashboard — most operators spend $1–3 per 100 generations |

> **Per-token billing is between you and the provider.** Yatra never proxies AI traffic and adds zero markup. Your API key talks directly to OpenAI or Anthropic.

## What it unlocks

The module surfaces six AI affordances across the admin:

| Surface | What the AI does |
| --- | --- |
| **Trip editor** — title, short description, full description, itinerary, inclusions/exclusions | Drafts, rewrites, expands, or shortens any field. Honors your brand voice settings. |
| **Trip SEO** — meta title, meta description, focus keyword | Generates SEO-optimised copy in your brand voice from the trip's content. |
| **Categories / destinations / activities** — descriptions | One-shot drafts from the taxonomy name. |
| **Enquiry inbox** — *Draft reply* | Reads the enquiry thread + linked trip + customer history; drafts a courteous reply tailored to the lead's question. |
| **Dashboard digest** | A daily AI-written summary of bookings, revenue, top trips, and what to do next. |
| **Brand voice settings** | A single configuration block all surfaces share so generated copy stays consistent. |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **AI Assistant** → toggle on. (The toggle is disabled on Personal tier — you'll see an *Upgrade to Growth or Agency* CTA instead.)
3. A new menu entry **AI Assistant** appears in the sidebar.

## Step 2 — Connect your provider

Open <span class="screen-path">Yatra → AI Assistant → Providers</span>.

![Providers tab — paste an OpenAI or Anthropic key, click Test, see the masked last-4 hint](/screenshots/modules/ai-assistant-providers.webp)

| Field | Notes |
| --- | --- |
| **Provider** | *OpenAI* (default) or *Anthropic*. You can configure both and pick per-prompt. |
| **API key** | Paste your provider key. Yatra encrypts it with strong industry-standard cryptography (XChaCha20-Poly1305 via the libsodium library) before saving — once stored, the browser only ever shows you the last 4 characters as a reminder. The key is never written to logs, never sent back to the React UI, and never leaves your server except when calling the provider directly. |
| **Test** | Sends a tiny ping to the provider's `/models` endpoint to verify the key works. Returns a clear error if billing isn't enabled or the key has been revoked. |

::: tip Multi-provider failover
Save keys for both providers. Surfaces that fail with provider A (rate-limited, model deprecated, billing depleted) can fall back to provider B via the `yatra_ai_providers` filter. Recommended for Agency clients with high-volume editorial use.
:::

## Step 3 — Set your brand voice

Open <span class="screen-path">Yatra → AI Assistant → Brand Voice</span>.

| Field | What it shapes |
| --- | --- |
| **Default provider** | Which provider runs when a generation doesn't specify one. |
| **Default model** | Specific model id (e.g. `gpt-4o-mini`, `claude-3-5-sonnet-latest`). Leave blank to use the provider's default. |
| **Tone** | *Professional* / *Friendly* / *Adventurous* / *Luxury* / *Casual* / *Custom*. Injected into every prompt so generated copy sounds like your brand. |
| **Brand description** | One paragraph describing your company. Used as context in every generation. |
| **Things to avoid** | Bullet list of phrases / vocabulary to never use ("synergy", "world-class", competitor names, etc.). Drafts are post-filtered against this list. |
| **Preferred reading level** | *General* / *Grade 8* / *Grade 12* / *Native English speakers only*. Drives the AI's sentence length and vocabulary. |
| **Target audience** | Optional one-line audience description (e.g. "American honeymooners 35–55, family budget"). |

Save once — every AI surface picks these up automatically.

## Step 4 — Generate from the trip editor

In <span class="screen-path">Yatra → Trips → Edit a trip</span>, look for the small sparkle icon next to each long-text field.

![Sparkle popover — Generate / Improve / Shorten / Expand / Rewrite in another tone](/screenshots/modules/ai-assistant-sparkle-popover.webp)

Click the sparkle to open the popover:

| Action | What it does |
| --- | --- |
| **Generate** | Drafts new content from scratch using the trip's title + destination + duration as context. Useful for empty fields. |
| **Improve** | Rewrites the current text for clarity, grammar, and brand voice — preserves your intent. |
| **Shorten** | Cuts to ~60% of current length without losing key facts. |
| **Expand** | Grows the text with more sensory detail, itinerary hints, and travel-story rhythm. |
| **Rewrite in another tone** | Switches the tone for one generation without changing your brand voice default. |

Diff view lets you accept / reject / regenerate before the text overwrites your field.

## Step 5 — Draft enquiry replies

Open an enquiry under <span class="screen-path">Yatra → Enquiries → View an enquiry</span>. Click **Draft reply with AI**.

The assistant reads:

- The enquiry thread (every message back and forth)
- The trip the lead is asking about (title, price, duration, key facts)
- The customer's history if they've booked before
- Your saved brand voice + tone

…and writes a reply that answers the lead's specific question + offers a clear next step. You can edit before sending — drafts are never sent automatically.

## Step 6 — Dashboard daily digest

The Yatra dashboard's "Today" widget gets an AI-written paragraph each day summarising:

- New bookings + revenue (vs. last week / last year)
- Top-performing trips this week
- Departures starting today or tomorrow
- Pending tasks (unread enquiries, unpaid bookings, low-availability dates)

Generated once per day on first admin load — cached for 24h so you don't burn tokens on every page refresh.

## Usage + cost monitoring

Open <span class="screen-path">Yatra → AI Assistant → Usage</span>.

| Column | Notes |
| --- | --- |
| **Date** | Day bucket. |
| **Provider** | OpenAI / Anthropic. |
| **Generations** | Total successful generations. |
| **Tokens in / out** | Prompt + completion tokens consumed. |
| **Approx cost (USD)** | Computed from the model's published rate at the time of the call. Use it as a sanity check against your provider invoice. |

The usage tab is also where you'd notice a runaway cost (a broken integration looping generations) before your provider bill lands.

## REST API

For agencies embedding AI generation into custom workflows:

| Endpoint | Verb | Purpose |
| --- | --- | --- |
| `/yatra/v1/ai/meta` | GET | Module eligibility + provider list + brand voice snapshot. |
| `/yatra/v1/ai/generate` | POST | Generate text from a prompt + brand voice. |
| `/yatra/v1/ai/improve` | POST | Improve / shorten / expand existing text. |
| `/yatra/v1/ai/brand-voice` | GET / PUT | Read or update brand voice settings. |
| `/yatra/v1/ai/keys/{provider}` | POST / DELETE | Set or clear a provider API key. |
| `/yatra/v1/ai/keys/{provider}/test` | POST | Test connectivity to the provider. |
| `/yatra/v1/ai/usage` | GET | Last 30 days of usage rows. |
| `/yatra/v1/ai/enquiry/{id}/draft-reply` | POST | Draft an AI reply for an enquiry. |
| `/yatra/v1/ai/dashboard/digest` | GET | Today's AI digest (cached 24h). |

All write endpoints require `manage_options` capability + a Growth/Agency-active license. See [REST API reference](/api-reference#ai-assistant) for the full schema.

## Hooks & filters

| Hook | Purpose |
| --- | --- |
| `yatra_ai_providers` (filter) | Add or replace AI providers. Return a map of `{ id: ProviderInstance }`. |
| `yatra_ai_prompt` (filter) | Last-chance edit of the prompt before it's sent to the provider — useful for compliance-mandated additions. |
| `yatra_ai_result` (filter) | Post-process the generated text (e.g. profanity filter, regex cleanup). |
| `yatra_ai_brand_voice` (filter) | Override the brand voice payload per-request — e.g. switch tone for a "luxury collection" subset of trips. |
| `yatra_ai_should_log_usage` (filter) | Disable per-request usage logging if you have GDPR concerns about prompt content. Returns bool. |
| `yatra_ai_generation_completed` (action) | Fires after each successful generation with the result + usage data. |
| `yatra_ai_generation_failed` (action) | Fires when a generation throws — useful for alerting. |
| `yatra_ai_pii_mode` (filter) | `soft` / `strict` / `off` — see [PII masking](#pii-masking-for-context-fields). |
| `yatra_ai_data_residency_region` (filter) | `us` / `eu` / `global` / empty — stamped on every audit row. |
| `yatra_ai_region_endpoints` (filter) | Per-provider region → URL map. Used by the data-residency helper to pick the endpoint. |
| `yatra_ai_disclosure_mode` (filter) | `off` / `audit` / `prefix` / `suffix` — see [Transparency disclosure](#transparency-disclosure). |
| `yatra_ai_disclosure_mode_for_task` (filter) | Per-task override of the disclosure mode. |
| `yatra_ai_disclosure_text` (filter) | Override the default disclosure text. |
| `yatra_ai_allow_call_for_context` (filter) | Return `false` to block an AI call before it leaves your server. |
| `yatra_ai_retry_attempts` (filter) | Override the default 3 retry attempts per provider. |
| `yatra_ai_fallback_provider` (filter) | Override which provider is the fallback when the primary fails. |
| `yatra_ai_is_transient_error` (filter) | Widen / narrow the heuristic that decides which errors are retryable vs permanent. |

## Privacy

- Prompts are sent **directly** to your configured provider — they don't transit any Yatra-owned infrastructure.
- The Usage tab records *token counts*, not prompt content. Prompt + response content is never persisted server-side beyond the request lifecycle. The `yatra_ai_should_log_usage` filter lets you disable even the token counts.
- Your API key is encrypted at rest with libsodium AEAD and decrypted just-in-time per request.

## PII masking for context fields

Yatra builds context bundles for AI calls — for example, when you click "Draft reply" on an enquiry, it sends the customer name, email, phone, dietary requirements, medical conditions, and so on to the provider so the reply is informed. Operators with strict data-handling rules can change how those fields are sent.

Set the mode with the `yatra_ai_pii_mode` filter. Three modes:

| Mode | What it does |
| --- | --- |
| `soft` (default) | Partial mask preserving structure — `j***@example.com`, `+•••••1234`. Free-text fields (dietary, medical, notes) pass through unchanged. Good for prompts where the AI benefits from seeing the *shape* of contact info. |
| `strict` | Replace with a deterministic hash placeholder — `[email:a1b2c3]`, `[phone:d4e5f6]`. Free-text fields are replaced with `[REDACTED: <field>]` markers — the AI knows the field exists without seeing the content. For operators on strict data-residency or HIPAA-style obligations. |
| `off` | Pass through unmodified. For operators on a DPA with the provider that legally permits PII transmission. |

```php
add_filter('yatra_ai_pii_mode', fn() => 'strict');
```

The mode applies uniformly to every AI surface, so an operator sets it once and every loader respects it.

## Data residency

If your compliance posture requires AI traffic to stay in a specific region, set the residency once with the `yatra_ai_data_residency_region` filter:

```php
add_filter('yatra_ai_data_residency_region', fn() => 'eu');
```

Recognized values: `us`, `eu`, `global`, or empty (no pinning — provider defaults). The audit log stamps the configured region on every call (success, failure, or blocked), so a compliance review can prove which region every prompt was sent to.

Note that the public OpenAI and Anthropic APIs are currently single-endpoint globally — there isn't a separate `eu.api.openai.com` for the chat-completions API. Real EU residency for OpenAI today means an Azure OpenAI tenancy; for Anthropic it means AWS Bedrock or GCP Vertex with the right region. If you're on one of those, point Yatra at it with the per-provider endpoint filter:

```php
add_filter('yatra_ai_openai_endpoint', fn() => 'https://your-eu-tenant.openai.azure.com/...');
add_filter('yatra_ai_anthropic_endpoint', fn() => 'https://bedrock-runtime.eu-central-1.amazonaws.com/...');
```

The provider-specific endpoint filter wins over the region default — the region setting is what gets stamped in the audit log so the contract is auditable, the actual endpoint is whatever you configure.

## Transparency disclosure

Some jurisdictions require that AI-generated text shown to customers is marked as such. The disclosure helper supports four modes via the `yatra_ai_disclosure_mode` filter:

| Mode | What it does |
| --- | --- |
| `off` (default) | No change to the AI output. |
| `audit` | Stamps the audit log row with `disclosure_required=true` but doesn't alter the text. Use when the visible disclosure is rendered elsewhere (a UI badge, a wrapper component) and you just need proof that the policy was active on every call. |
| `prefix` | Prepends the configurable disclosure text. |
| `suffix` | Appends the configurable disclosure text. |

The disclosure text itself defaults to "— Generated with the help of AI" and can be overridden:

```php
add_filter('yatra_ai_disclosure_text', fn() => "\n\n(AI-generated. Edit before sending.)");
```

Per-task override via the `yatra_ai_disclosure_mode_for_task` filter — useful when you only want to disclose customer-facing outputs and leave internal admin summaries alone:

```php
add_filter('yatra_ai_disclosure_mode_for_task', function ($mode, $task) {
    if (in_array($task, ['enquiry-reply', 'chat-draft'], true)) return 'suffix';
    return $mode;  // off for everything else
}, 10, 2);
```

The helper is idempotent — it won't double-tag text that already contains the disclosure line (some prompts ask the model to include it directly).

## Per-call opt-out

If you need to block AI calls for specific contexts — a flagged medical-tour trip, a customer who asked not to have AI involved, an enquiry from an EU resident on a site without a DPA — use the `yatra_ai_allow_call_for_context` filter. Return `false` to block the call before it leaves your server:

```php
add_filter('yatra_ai_allow_call_for_context', function ($allowed, $task, $context, $provider) {
    if (($context['trip_id'] ?? 0) === 42) return false;  // flagged trip
    return $allowed;
}, 10, 4);
```

Blocked calls throw a `RuntimeException` ("This AI call was blocked by a site policy filter.") and write a `status=failure` row to the audit log so operators can verify the rule fired.

## Append-only audit log

Every AI call writes a row to `wp_yatra_ai_audit_log` covering: task, provider, model, prompt tokens, completion tokens, status (success / failure), prompt hash (SHA-256, not the raw prompt), context hash, error message, and a meta JSON column for region / disclosure mode / fallback markers.

There's no update or delete API on the audit log — it's append-only by contract. The retention cron deletes rows older than the configured cut-off (default not auto-pruned; set via the same `yatra_ai_audit_persist_prompt` and related filters described in the source).

Operators who need full-text prompt retention (legal hold, debugging) can extend the persistence:

```php
add_filter('yatra_ai_audit_persist_prompt', fn() => true);
```

The default stores only the SHA-256 hash so the log proves a specific prompt was sent without persisting the contents.

## Provider fallback + retry

Single-provider failures shouldn't break user-facing flows. The client wraps each call in two resilience layers:

1. **Retry the same provider** with exponential-backoff-plus-jitter on transient errors (HTTP 429, 5xx, timeout, "unavailable", "overloaded"). Default 3 attempts. Permanent errors (401 bad-key, 400 validation) bail immediately — retrying won't help.
2. **Fall back to the alternate provider** if all primary attempts fail AND the secondary provider has a configured key AND the failure looked transient. One attempt on the secondary using its default model.

Tune via filters:

```php
add_filter('yatra_ai_retry_attempts', fn() => 5);          // raise from 3
add_filter('yatra_ai_fallback_provider', fn($id) => 'anthropic');  // pin fallback
```

The audit log records which provider actually served the response and whether a fallback was used (`fallback_used: true` in the meta column).

## Streaming response support (experimental)

A new `runStreaming()` entry point on the AI client lets a frontend consumer subscribe to token-by-token output as the model produces it. The interface is opt-in:

- Providers that implement `StreamingProvider` stream tokens via a callback.
- Providers that don't (e.g. custom community providers added via `yatra_ai_providers`) gracefully degrade to a single "final" chunk after the regular `complete()` returns — consumer code stays identical either way.

No UI surface ships with the streaming hook yet — the chat-draft and itinerary-generation surfaces currently use the non-streaming `run()`. The hook is in place so a future iteration can land per-surface streaming without breaking the existing call path.

## Troubleshooting

**"AI Assistant" doesn't appear in the sidebar** — verify (1) your license is Growth or Agency on the <span class="screen-path">Yatra → License</span> page, (2) the module is toggled on under <span class="screen-path">Yatra → Modules</span>. Personal-tier licenses see the upgrade card under <span class="screen-path">Yatra → AI Assistant</span> but no sparkle affordances.

**"Test" button reports `401 Unauthorized`** — the key is wrong, revoked, or you copied a publishable key instead of a secret key. Regenerate in your provider dashboard.

**"Test" passes but generations fail with `insufficient_quota`** — your provider account needs billing enabled or a top-up. OpenAI and Anthropic both require pre-paid credit before any API calls succeed.

**Generations are off-brand or generic** — fill in the *Brand description*, *Things to avoid*, and *Target audience* fields under Brand Voice. The provider has no context about your business beyond what you tell it.

**Generations are slow** — `gpt-4o`, `gpt-4-turbo`, and `claude-3-opus` are the slowest models. Switch to `gpt-4o-mini` or `claude-3-5-haiku` for a 5–10× speed-up at ~80% of the quality.

**Token cost feels high** — switch the default model to a smaller / cheaper variant under Brand Voice. The cost difference between flagship and mini models is typically 10–20×.

## Useful links

- [Settings → Advanced → Debug mode](/settings#_13-advanced) — captures provider request/response pairs for support tickets when set to `Verbose`.
- [Hooks & filters](/hooks-filters#ai-assistant) — full filter signatures + invocation order.
- [REST API](/api-reference#ai-assistant) — endpoint schemas.

## Where to read more

- [All modules](/modules#ai-assistant) — module catalog.
- [WhatsApp Notifications](/modules/whatsapp) — the other Growth-tier module that ships with the same license.
- [White Label](/modules/white-label) — Agency-only deeper rebrand.
