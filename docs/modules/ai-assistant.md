---
title: AI Assistant
description: Step-by-step setup for the Yatra Pro AI Assistant module — bring your own OpenAI or Anthropic key and unlock inline AI generation across the trip editor, SEO fields, enquiry inbox, and dashboard digest — plus an MCP server that lets Claude, Cursor and other AI assistants work with your trips and bookings.
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
| Yatra Pro license — **Growth** or **Scale** tier | <span class="screen-path">Yatra → License</span> |
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
| **MCP server** (Yatra Pro 3.2+) | Connect Claude Code, Claude Desktop, Cursor or another MCP client to your site and ask it about bookings, departures and sales. See [Connect AI assistants (MCP server)](#connect-ai-assistants-mcp-server). Doesn't need an OpenAI or Anthropic key. |

## Step 1 — Enable the module

1. Open <span class="screen-path">Yatra → Modules</span>.
2. Find **AI Assistant** → toggle on. (The toggle is disabled on Starter tier — you'll see an *Upgrade to Growth or Scale* CTA instead.)
3. A new menu entry **AI Assistant** appears in the sidebar.

## Step 2 — Connect your provider

Open <span class="screen-path">Yatra → AI Assistant → API Keys</span>.

![Providers tab — paste an OpenAI or Anthropic key, click Test, see the masked last-4 hint](/screenshots/modules/ai-assistant-providers.webp)

| Field | Notes |
| --- | --- |
| **Provider** | *OpenAI* (default) or *Anthropic*. You can configure both and pick per-prompt. |
| **API key** | Paste your provider key. Yatra encrypts it with strong industry-standard cryptography (XChaCha20-Poly1305 via the libsodium library) before saving — once stored, the browser only ever shows you the last 4 characters as a reminder. The key is never written to logs, never sent back to the React UI, and never leaves your server except when calling the provider directly. |
| **Test** | Sends a tiny ping to the provider's `/models` endpoint to verify the key works. Returns a clear error if billing isn't enabled or the key has been revoked. |

::: tip Multi-provider failover
Save keys for both providers. Surfaces that fail with provider A (rate-limited, model deprecated, billing depleted) can fall back to provider B via the `yatra_ai_providers` filter. Recommended for Scale-tier clients with high-volume editorial use.
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

## Connect AI assistants (MCP server) {#connect-ai-assistants-mcp-server}

<span class="pro-pill">PRO</span> **Growth** or **Scale** · needs **Yatra 3.2** and **Yatra Pro 3.2** or later · AI Assistant module on

Yatra Pro runs an **MCP server** on your site. MCP (Model Context Protocol) is the standard way AI assistants such as Claude and Cursor connect to other software. Once connected, you can ask your assistant things like *"who travels on the 12 March departure?"*, *"which bookings still owe money?"* or *"draft a 7-day Mustang trek"*, and it looks the answer up on your site.

The MCP server doesn't use your OpenAI or Anthropic key — the assistant you connect (and its own subscription) does the thinking. Yatra only answers its questions.

### What you need

| Thing | Notes |
| --- | --- |
| Yatra Pro **Growth** or **Scale**, AI Assistant module on | The server is only switched on while the module is enabled and the plan includes it. |
| Your site on **HTTPS** | WordPress only allows Application Passwords over HTTPS. |
| A WordPress **Application Password** | The assistant signs in with it. Create it on the profile of the WordPress user the assistant should act as. |
| An MCP client | Claude Code, Claude Desktop, Cursor, VS Code or another client that connects with a URL and a header. |

The server address is:

```
https://your-site.com/wp-json/yatra/v1/mcp
```

### To connect an assistant

1. Open <span class="screen-path">Yatra → AI Assistant → Connect AI assistants</span>. The page shows your **Server URL**.
2. Click **Open Application Passwords** and create an Application Password for the WordPress user the assistant should act as. A staff account with only the access it needs is the safest choice (see [Permissions](#mcp-permissions) below).
3. Back on **Connect AI assistants**, type that user's **username** and the new **password**. The page builds the `Authorization` header for you in your browser — it isn't saved or sent anywhere.
4. Copy the ready-made setup for your client and paste it in:

**Claude Code** — run in a terminal:

```bash
claude mcp add --transport http yatra https://your-site.com/wp-json/yatra/v1/mcp --header "Authorization: Basic <your-credentials>"
```

**Claude Desktop** — add to `claude_desktop_config.json` (needs Node.js, because it uses `mcp-remote`):

```json
{
  "mcpServers": {
    "yatra": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://your-site.com/wp-json/yatra/v1/mcp",
        "--header",
        "Authorization:Basic <your-credentials>"
      ]
    }
  }
}
```

**Cursor, VS Code and other clients** — add to `mcp.json`:

```json
{
  "mcpServers": {
    "yatra": {
      "url": "https://your-site.com/wp-json/yatra/v1/mcp",
      "headers": {
        "Authorization": "Basic <your-credentials>"
      }
    }
  }
}
```

`<your-credentials>` is the username and Application Password joined with a colon and Base64-encoded — the Connect AI assistants page fills it in for you.

To disconnect an assistant, revoke its Application Password on the WordPress user's profile.

::: warning Clients that only sign in with OAuth
Clients that can only connect with OAuth — for example claude.ai web custom connectors and ChatGPT connectors — aren't supported yet. Use a client that lets you send a header, as in the examples above.
:::

### What the assistant can do

The server offers 13 tools. Ten only read; three change something.

**Read-only**

| Tool | What it returns |
| --- | --- |
| `list_trips` | Trips matching a search (published, draft or any), with id, title, status, duration and price. |
| `get_trip` | One trip in full: descriptions, duration, group size, prices, locations, itinerary day titles, FAQs, included/excluded items. |
| `check_availability` | A trip's bookable dates between two dates, with seats left. |
| `list_departures` | Scheduled departures across all trips, with capacity, seats booked and status. |
| `get_departure_manifest` | Everyone travelling on a departure — one row per traveller, with the lead contact, emergency contact and payment state. |
| `find_bookings` | Bookings by reference, name or email, status, payment status, trip, travel dates or booking dates. |
| `get_booking` | One booking with travellers, payments (including refunds), amounts and customer requests. |
| `get_booking_history` | A booking's timeline: creation, payments, refunds, status changes, emails sent, price changes, edits and internal notes. |
| `list_customers` | Customers by name or email, with number of bookings and total spent. |
| `sales_summary` | Revenue, bookings, average booking value, status counts and top trips for bookings made between two dates. |

**Changes something**

| Tool | What it does |
| --- | --- |
| `add_booking_note` | Adds an internal note to a booking. Only your team sees it; nothing is sent to the customer. |
| `set_booking_status` | Sets a booking to *pending*, *confirmed*, *completed* or *cancelled*. The customer may get the matching email if you have it switched on. Cancelling **does not** refund money. This tool is flagged to the assistant as destructive, and the assistant is told to ask you before using it. |
| `create_trip_draft` | Creates a new trip (title, short and full description, duration, price, maximum travellers) as a **draft**. It is never published — you review and publish it in the admin. |

The assistant can't take payments, issue refunds, change prices or delete anything.

Text written by customers or travellers (for example enquiry messages or booking requests) is passed to the assistant marked as untrusted, with an instruction to treat it as data and never follow requests found in it.

### Permissions {#mcp-permissions}

- The assistant works **as the WordPress user whose Application Password it uses**. Every tool runs through the same Yatra REST endpoints as the admin screens, so it can see and do exactly what that user can in Yatra — no more.
- The user needs at least one Yatra staff capability (view trips, bookings, customers or departures); otherwise the server answers *"This user has no access to Yatra."*
- The departure manifest also needs the **export bookings** capability (`yatra_export_bookings`).
- Use the [Team & Access](/modules/team-access) module to give the assistant's user a narrow role — for example a read-only role that can view bookings but not change their status.
- Every tool call is written to the AI Assistant's append-only [audit log](#append-only-audit-log) (task `mcp:<tool name>`, success or failure, and the trip, booking or departure id).
- Requests sent from a web page on another domain are refused, so a website can't drive the server with a visitor's browser.

### Troubleshooting the connection

- **"Connect AI assistants" isn't in the AI Assistant menu** — it appears only with Yatra Pro 3.2 or later, on Growth or Scale, with the AI Assistant module on.
- **401 — "Sign in with a WordPress Application Password"** — the header is missing or wrong, or the password was revoked. Rebuild the header on the Connect AI assistants page. Some hosts strip the `Authorization` header; ask your host to pass it through to PHP.
- **403 — "This user has no access to Yatra"** — the WordPress user has no Yatra capabilities. Use a staff account.
- **No Application Passwords section on the profile** — the site isn't on HTTPS, or a security plugin has turned Application Passwords off.

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
| `/yatra/v1/mcp` | POST | MCP server (JSON-RPC 2.0, Streamable HTTP, JSON responses only). Signs in with an Application Password; see [Connect AI assistants](#connect-ai-assistants-mcp-server). |

All write endpoints require `manage_options` capability + a Growth/Scale-active license. See [REST API reference](/api-reference#pro-modules-additional-routes) for the full schema.

## Hooks & filters

| Hook | Purpose |
| --- | --- |
| `yatra_ai_providers` (filter) | Add or replace AI providers. Return a map of `{ id: ProviderInstance }`. |
| `yatra_ai_fallback_used` (action) | Fires when a call falls back to the secondary provider. |
| `yatra_ai_retry` (action) | Fires on each retry of a transient provider error. |
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
| `yatra_mcp_tools` (filter) | Add or remove MCP server tools. Each tool: `title`, `description`, `schema` (JSON Schema), `handler` (callable receiving the arguments), optional `read_only` / `destructive` flags. |
| `yatra_mcp_tool_result` (filter) | Change a tool's result before it is returned to the assistant. Receives the result, the tool name and the arguments. |

## Privacy

- Prompts are sent **directly** to your configured provider — they don't transit any Yatra-owned infrastructure.
- The Usage tab records *token counts*, not prompt content. Prompt + response content is not written to the usage or audit logs; some results are cached briefly in WordPress transients (the dashboard digest, enquiry-chat drafts for 24 hours, trip-wizard sessions for 2 hours).
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

There's no update or delete API on the audit log — it's append-only by contract. A daily retention cron deletes rows older than 180 days (change it with the `yatra_ai_audit_retention_days` filter).

The log stores only the SHA-256 hash so it proves a specific prompt was sent without persisting the contents. There is no option to store full prompt text.

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

**"AI Assistant" doesn't appear in the sidebar** — verify (1) your license is Growth or Scale on the <span class="screen-path">Yatra → License</span> page, (2) the module is toggled on under <span class="screen-path">Yatra → Modules</span>. Starter-tier licenses see the upgrade card under <span class="screen-path">Yatra → AI Assistant</span> but no sparkle affordances.

**"Test" button reports `401 Unauthorized`** — the key is wrong, revoked, or you copied a publishable key instead of a secret key. Regenerate in your provider dashboard.

**"Test" passes but generations fail with `insufficient_quota`** — your provider account needs billing enabled or a top-up. OpenAI and Anthropic both require pre-paid credit before any API calls succeed.

**Generations are off-brand or generic** — fill in the *Brand description*, *Things to avoid*, and *Target audience* fields under Brand Voice. The provider has no context about your business beyond what you tell it.

**Generations are slow** — `gpt-4o`, `gpt-4-turbo`, and `claude-3-opus` are the slowest models. Switch to `gpt-4o-mini` or `claude-3-5-haiku` for a 5–10× speed-up at ~80% of the quality.

**Token cost feels high** — switch the default model to a smaller / cheaper variant under Brand Voice. The cost difference between flagship and mini models is typically 10–20×.

## Useful links

- [Settings → Advanced → Debug mode](/settings#_13-advanced) — captures provider request/response pairs for support tickets when set to `Verbose`.
- [Hooks & filters](/hooks-filters#pro-ai-assistant-mcp-server) — full filter signatures + invocation order.
- [REST API](/api-reference#pro-modules-additional-routes) — endpoint schemas.

## Where to read more

- [All modules](/modules#ai-assistant) — module catalog.
- [WhatsApp Notifications](/modules/whatsapp) — the other Growth-tier module that ships with the same license.
- [White Label](/modules/white-label) — Scale-only deeper rebrand.
