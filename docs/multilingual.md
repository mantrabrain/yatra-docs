---
title: Multilingual sites (WPML and Polylang)
description: Run Yatra in several languages with WPML or Polylang — trip pages, listings, booking flow and My Account per language, translating trip texts on the string-translation screen, and booking emails in the customer's language. Free plugin, Yatra 3.2+.
---

# Multilingual sites (WPML and Polylang)

**Plan:** Free (Yatra 3.2 or later). Translating your own **Email Automation** templates needs Yatra Pro 3.2 <span class="pro-pill">PRO</span>.

From Yatra 3.2, Yatra works with **WPML** and **Polylang**. Without either plugin, nothing changes.

## What works in every language

With WPML or Polylang active:

- **Trip pages, trip listings and destination, activity and category pages** open under each language's address (for example `/de/…`).
- **The booking flow** — booking page, checkout and confirmation — and the **customer account** work in every language.
- **Links keep the visitor's language.** A German visitor who clicks a trip, books and opens My Account stays in German.

## How translation works for trips

Yatra keeps trips in its own tables, not as WordPress posts, so WPML and Polylang can't make "a German copy of a trip" the way they do for posts and pages. Instead, Yatra sends the texts customers see to the **string translation screen**, and shows the translation that matches the visitor's language.

These texts can be translated:

- Trip **title**, **descriptions**, **highlights**, **itinerary** (day titles, descriptions, entries, locations, notes), **FAQs** and **included / excluded** items
- **Destinations**, **activities** and **categories**
- The customer emails you customised under <span class="screen-path">Yatra → Email</span>
- **Payment method** titles, descriptions and instructions, and the tax label

Prices, dates, departures and capacity are shared by all languages.

### To translate with WPML

1. Install WPML with its **String Translation** add-on.
2. Publish your trips in your site's default language.
3. Go to <span class="screen-path">WPML → String Translation</span> and filter by the domain **Yatra**.
4. Translate each text and save.

### To translate with Polylang

1. Install Polylang and add your languages.
2. Publish your trips in your site's default language.
3. Go to <span class="screen-path">Languages → Translations</span> and filter by the group **Yatra**.
4. Translate each text and save.

::: tip When new texts appear on the screen
Texts are taken from **published** trips. With Polylang they are collected each time you open Languages → Translations. With WPML they are registered the first time and then refreshed when you save a trip. If you edit a trip, its changed texts appear as new strings to translate.
:::

## Emails in the customer's language

A booking **remembers the language it was made in**. Its customer emails go out in that language — including emails you resend from the admin and emails sent later, such as reminders.

**Emails to you** (the operator) stay in the site's default language.

With **Yatra Pro 3.2** and the [Email Automation](/modules/email-automation) module, your own active customer templates also appear on the string translation screen and are sent in the customer's language. Templates sent to you are not translated.

A booking made by an admin in the dashboard has no customer language, so its emails use the site language.

## Renaming texts without a translation plugin

To change a few of Yatra's own texts — "Book Now" → "Reserve", "Travelers" → "Guests" — you don't need WPML or Polylang. Use [Settings → Labels](/settings#labels). On a translated site, a label you set there wins over the translation.

## For developers

- Yatra ships a `wpml-config.xml` for its customer-facing settings.
- `yatra_translate_term_name()` translates a destination, activity or category name.
- Hooks: `yatra_taxonomy_page_term`, `yatra_prepared_trip` and `yatra_multilingual_register_strings`. See [Hooks & filters](/hooks-filters#multilingual).

## Related

- [Blocks & page builders → Translation plugins](/elementor-integration#translation-plugins)
- [Email & notifications](/email-settings)
