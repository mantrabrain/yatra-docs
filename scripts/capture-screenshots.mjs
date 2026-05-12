#!/usr/bin/env node
/**
 * Headless screenshot capture for the Yatra docs.
 *
 * Logs into wp-admin via Playwright, drives the Trip Builder through each
 * phase / section, and writes WebP screenshots to docs/public/screenshots/.
 *
 * Prerequisites:
 *   npm install
 *   npx playwright install chromium
 *
 * Configuration (env vars — set in .env.screenshots or in the shell):
 *   YATRA_URL    = https://yatra.local             (your Local site URL)
 *   YATRA_USER   = admin                           (wp-admin username)
 *   YATRA_PASS   = ********                        (wp-admin password)
 *   YATRA_TRIP_ID= 123                             (optional — edit an existing trip
 *                                                   instead of creating a new one)
 *   HEADED       = 1                               (optional — run with a visible browser
 *                                                   for debugging)
 *
 * Run:
 *   npm run screenshots
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

loadDotenv({ path: path.join(ROOT, ".env.screenshots") });

const YATRA_URL = (process.env.YATRA_URL || "https://yatra.local").replace(
  /\/$/,
  "",
);
const YATRA_USER = process.env.YATRA_USER || "admin";
const YATRA_PASS = process.env.YATRA_PASS || "";
const YATRA_TRIP_ID = process.env.YATRA_TRIP_ID || "";
const HEADED = !!process.env.HEADED;

if (!YATRA_PASS) {
  console.error(
    "✖ YATRA_PASS not set. Create docs/.env.screenshots (gitignored) with:\n" +
      "    YATRA_URL=https://yatra.local\n" +
      "    YATRA_USER=admin\n" +
      "    YATRA_PASS=********\n",
  );
  process.exit(1);
}

const OUT = path.join(ROOT, "docs", "public", "screenshots");

const TRIPS_LIST_URL = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=trips`;

const SECTIONS = [
  { id: "basic", file: "trip-builder/phase-1-basic.webp" },
  { id: "location", file: "trip-builder/phase-1-location.webp" },
  { id: "pricing", file: "trip-builder/phase-1-pricing.webp" },
  { id: "duration", file: "trip-builder/phase-1-duration.webp" },
  { id: "itinerary", file: "trip-builder/phase-2-trip-details.webp" },
  { id: "media", file: "trip-builder/phase-3-media.webp" },
  { id: "downloads", file: "trip-builder/phase-3-downloads.webp" },
  { id: "categorization", file: "trip-builder/phase-3-categorization.webp" },
  { id: "seo", file: "trip-builder/phase-3-seo.webp" },
  { id: "advanced", file: "trip-builder/phase-4-advanced.webp" },
];

const SETTINGS_TABS = [
  { id: "general", file: "settings/general.webp" },
  { id: "design", file: "settings/design.webp" },
  { id: "booking", file: "settings/booking.webp" },
  { id: "booking_form", file: "settings/booking_form.webp" },
  { id: "payment", file: "settings/payment.webp" },
  { id: "customer", file: "settings/customer.webp" },
  { id: "review", file: "settings/review.webp" },
  { id: "tax", file: "settings/tax.webp" },
  { id: "currency", file: "settings/currency.webp" },
  { id: "integration", file: "settings/integration.webp" },
  { id: "permalink", file: "settings/permalink.webp" },
  { id: "seo", file: "settings/seo.webp" },
  { id: "advanced", file: "settings/advanced.webp" },
];

async function ensureDir(p) {
  await mkdir(path.dirname(p), { recursive: true });
}

async function shot(page, relFile) {
  const out = path.join(OUT, relFile);
  await ensureDir(out);
  await page.waitForTimeout(400); // give animations a beat
  await page.screenshot({ path: out, type: "webp", fullPage: false });
  console.log(`  ✓ ${relFile}`);
}

async function login(page) {
  console.log("→ Logging in…");
  await page.goto(`${YATRA_URL}/wp-login.php`);
  await page.fill("#user_login", YATRA_USER);
  await page.fill("#user_pass", YATRA_PASS);
  await Promise.all([
    page.waitForURL(/wp-admin\/?/, { timeout: 20_000 }),
    page.click("#wp-submit"),
  ]);
  console.log("  ✓ logged in");
}

async function captureTripsList(page) {
  console.log("→ Trips listing");
  await page.goto(TRIPS_LIST_URL, { waitUntil: "networkidle" });
  await page.waitForSelector("text=Add New Trip", { timeout: 20_000 });
  await shot(page, "trips/list-page.webp");

  // Open the "Add New Trip" modal
  await page.click('button:has-text("Add New Trip")');
  await page.waitForSelector('text="Create New Trip"', { timeout: 10_000 });
  await page.fill('input[placeholder*="Bali Beach Retreat"]', "Demo Trip");
  await page.waitForTimeout(500);
  await shot(page, "trips/add-new-modal.webp");

  if (YATRA_TRIP_ID) {
    // We already have a trip to edit — close the modal.
    await page.keyboard.press("Escape");
    return YATRA_TRIP_ID;
  }

  // Confirm — creates the trip and redirects to the Trip Builder.
  await Promise.all([
    page.waitForURL(/action=edit&id=\d+/, { timeout: 20_000 }),
    page.click('button:has-text("Create & Continue")'),
  ]);
  const match = page.url().match(/[?&]id=(\d+)/);
  const id = match ? match[1] : "";
  console.log(`  ✓ created trip id ${id}`);
  return id;
}

async function captureBuilderSections(page, tripId) {
  console.log(`→ Trip Builder for trip ${tripId || "(current)"}`);
  for (const { id, file } of SECTIONS) {
    const url = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=trips&action=${
      tripId ? "edit&id=" + tripId : "create"
    }&section=${id}`;
    await page.goto(url, { waitUntil: "networkidle" });
    // Optional: click "Fill Dummy Data" once on `basic` so the rest looks real.
    if (id === "basic") {
      const fillBtn = page.locator('button:has-text("Fill Dummy Data")');
      if (await fillBtn.count()) {
        await fillBtn.first().click();
        await page.waitForTimeout(800);
      }
    }
    await page.waitForTimeout(600);
    await shot(page, file);
  }

  // Publish dropdown — open it to capture the menu.
  const url = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=trips&action=${
    tripId ? "edit&id=" + tripId : "create"
  }&section=basic`;
  await page.goto(url, { waitUntil: "networkidle" });
  const chev = page.locator('button[aria-label*="status"], button:has-text("Publish Trip") + button, button:has(svg[class*="ChevronDown"])').first();
  if (await chev.count()) {
    await chev.click();
    await page.waitForTimeout(400);
  }
  await shot(page, "trip-builder/publish-dropdown.webp");
}

async function captureSettingsTabs(page) {
  console.log("→ Settings tabs");
  const settingsUrl = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=settings`;

  // The Settings component restores the active tab from localStorage, not
  // from the URL. Land on the page once, then click the sidebar entry for
  // each tab by its visible label.
  await page.goto(settingsUrl, { waitUntil: "networkidle" });
  await page.waitForSelector('text="General"', { timeout: 20_000 });

  const LABELS = {
    general: "General",
    design: "Design",
    booking: "Booking",
    booking_form: "Booking Form",
    payment: "Payment",
    customer: "Customer",
    review: "Review",
    tax: "Tax",
    currency: "Currency",
    integration: "Integration",
    permalink: "Permalink",
    seo: "SEO",
    advanced: "Advanced",
  };

  for (const { id, file } of SETTINGS_TABS) {
    const label = LABELS[id] || id;
    // Sidebar tab buttons — use role=button with the exact visible label
    const tab = page.locator(`button:has-text("${label}")`).first();
    if ((await tab.count()) === 0) {
      console.log(`  ! skip ${id} — tab not visible (Pro-only?)`);
      continue;
    }
    await tab.click();
    await page.waitForTimeout(500);
    await shot(page, file);
  }
}

async function capturePaymentsAdmin(page) {
  console.log("→ Payments admin");
  const base = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=payments`;
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "payments/payments-list.webp");

  // Open the create form so we can capture it
  await page.goto(`${base}&action=create`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "payments/payments-create.webp");
}

async function captureGatewayPanels(page) {
  console.log("→ Gateway settings panels");
  const url = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=settings`;
  await page.goto(url, { waitUntil: "networkidle" });
  // Make sure we're on the Payment tab
  const paymentTab = page.locator('button:has-text("Payment")').first();
  if (await paymentTab.count()) {
    await paymentTab.click();
    await page.waitForTimeout(500);
  }

  const GATEWAYS = [
    { match: "PayPal", file: "gateways/paypal-settings.webp" },
    { match: "Pay Later", file: "gateways/pay-later-settings.webp" },
    { match: "Stripe", file: "gateways/stripe-settings.webp" },
    { match: "Razorpay", file: "gateways/razorpay-settings.webp" },
    { match: "Mollie", file: "gateways/mollie-settings.webp" },
    { match: "Paystack", file: "gateways/paystack-settings.webp" },
    { match: "Square", file: "gateways/square-settings.webp" },
    { match: "Authorize", file: "gateways/authorize-net-settings.webp" },
    { match: "Bank Transfer", file: "gateways/bank-transfer-settings.webp" },
  ];

  // Also capture integration-module settings panels (Mailchimp / GA4 / Facebook Pixel)
  // on the Integration tab.
  await page.goto(url, { waitUntil: "networkidle" });
  const integrationTab = page.locator('button:has-text("Integration")').first();
  if (await integrationTab.count()) {
    await integrationTab.click();
    await page.waitForTimeout(500);
    const MODULES = [
      { match: "Mailchimp", file: "modules/mailchimp-settings.webp" },
      { match: "Facebook Pixel", file: "modules/facebook-pixel-settings.webp" },
      { match: "Google Analytics", file: "modules/google-analytics-settings.webp" },
    ];
    for (const { match, file } of MODULES) {
      const card = page.locator(`text=${match}`).first();
      if ((await card.count()) === 0) {
        console.log(`  ! skip ${match} — section not visible (module off?)`);
        continue;
      }
      try { await card.scrollIntoViewIfNeeded(); } catch {}
      await page.waitForTimeout(300);
      await shot(page, file);
    }
  }

  // Google Calendar has its own admin page (not the Integration tab).
  const gcalUrl = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=google-calendar`;
  await page.goto(gcalUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "modules/google-calendar-settings.webp");

  for (const { match, file } of GATEWAYS) {
    // Look for the gateway card by its visible name, then click its Settings disclosure
    const card = page.locator(`text=${match}`).first();
    if ((await card.count()) === 0) {
      console.log(`  ! skip ${match} — card not visible (Pro not active?)`);
      continue;
    }
    // Try to find the "Settings" / chevron button near the gateway name
    try {
      await card.scrollIntoViewIfNeeded();
      // Click the row to expand if it's collapsed
      const settingsBtn = page
        .locator(`*:has(> :text("${match}")) >> button:has-text("Settings")`)
        .first();
      if (await settingsBtn.count()) {
        await settingsBtn.click();
        await page.waitForTimeout(400);
      } else {
        // Fallback: click the gateway header itself
        await card.click();
        await page.waitForTimeout(400);
      }
    } catch {}
    await shot(page, file);
    // Re-collapse to keep layout predictable for the next gateway
    try {
      const closeBtn = page
        .locator(`*:has(> :text("${match}")) >> button:has-text("Settings")`)
        .first();
      if (await closeBtn.count()) {
        await closeBtn.click();
        await page.waitForTimeout(200);
      }
    } catch {}
  }
}

async function captureEmailHub(page) {
  console.log("→ Email hub");
  const base = `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=email-automation`;
  const tabs = [
    { tab: "delivery", file: "email/email.webp" },
    { tab: "templates", file: "email/email-templates.webp" },
    { tab: "sequences", file: "email/email-sequences.webp" },
    { tab: "logs", file: "email/email-logs.webp" },
  ];
  for (const { tab, file } of tabs) {
    await page.goto(`${base}&tab=${tab}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await shot(page, file);
  }
}

async function captureDashboardAndDepartures(page) {
  console.log("→ Dashboard + Departures admin pages");
  // Yatra Dashboard
  await page.goto(`${YATRA_URL}/wp-admin/admin.php?page=yatra`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await shot(page, "dashboard/dashboard.webp");

  // Departures list
  await page.goto(`${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=departures`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await shot(page, "departures/departures-list.webp");

  // Departure create form (uses first trip we can find via API state — falls back to no trip_id which still renders the empty form)
  await page.goto(
    `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=departures&action=create`,
    { waitUntil: "networkidle" },
  );
  await page.waitForTimeout(700);
  await shot(page, "departures/departure-form.webp");

  // Travelers roster
  await page.goto(`${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=travelers`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await shot(page, "departures/travelers-list.webp");
}

async function captureAvailabilityFlow(page) {
  console.log("→ Availability (manual dates + recurring rules + trip builder default)");
  // Find first published trip ID so we can land on its Availability tab
  await page.goto(`${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=trips`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const firstRow = page.locator("table tbody tr a[href*='action=edit']").first();
  if ((await firstRow.count()) === 0) {
    console.log("  ! skip — no trip rows on the Trips listing");
    return;
  }
  const href = await firstRow.getAttribute("href");
  const m = href && href.match(/[?&]id=(\d+)/);
  const tripId = m ? m[1] : null;
  if (!tripId) { console.log("  ! could not extract trip id"); return; }

  // 1. Trip Builder Availability & Booking section (Layer 3 baseline)
  await page.goto(
    `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=trips&action=edit&id=${tripId}&section=duration`,
    { waitUntil: "networkidle" },
  );
  await page.waitForTimeout(700);
  await shot(page, "availability/trip-builder-availability.webp");

  // 2. The trip's Availability tab — manual dates list
  await page.goto(
    `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=trips&tab=availability&trip_id=${tripId}`,
    { waitUntil: "networkidle" },
  );
  await page.waitForTimeout(700);
  await shot(page, "availability/customer-calendar.webp");

  // 3. Manual Date form (action=create)
  await page.goto(
    `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=availability&action=create&trip_id=${tripId}`,
    { waitUntil: "networkidle" },
  );
  await page.waitForTimeout(700);
  await shot(page, "availability/manual-date-form.webp");

  // 4. Recurring Rule form
  await page.goto(
    `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=recurring-rules&action=create&trip_id=${tripId}`,
    { waitUntil: "networkidle" },
  );
  await page.waitForTimeout(700);
  await shot(page, "availability/recurring-rule-form.webp");
}

async function captureBookingsModule(page) {
  console.log("→ Bookings module (list + sub-pages)");
  const shots = [
    { url: `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=bookings`, file: "bookings/bookings-list.webp" },
    { url: `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=customers`, file: "customers/customers-list.webp" },
    { url: `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=enquiries`, file: "enquiries/enquiries-list.webp" },
    { url: `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=reviews`, file: "reviews/reviews-list.webp" },
    { url: `${YATRA_URL}/wp-admin/admin.php?page=yatra&subpage=discounts`, file: "discounts/discounts-list.webp" },
  ];
  for (const { url, file } of shots) {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await shot(page, file);
  }
}

async function main() {
  console.log(`Yatra screenshot capture → ${YATRA_URL}`);
  console.log(`Output dir: ${OUT}`);

  const browser = await chromium.launch({ headless: !HEADED });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // crisper screenshots
    ignoreHTTPSErrors: true, // Local sites use self-signed certs
  });
  const page = await ctx.newPage();

  try {
    await login(page);
    const tripId = await captureTripsList(page);
    await captureBuilderSections(page, tripId);
    await captureSettingsTabs(page);
    await captureGatewayPanels(page);
    await capturePaymentsAdmin(page);
    await captureBookingsModule(page);
    await captureEmailHub(page);
    await captureAvailabilityFlow(page);
    await captureDashboardAndDepartures(page);
    console.log("✓ done.");
  } catch (err) {
    console.error("✖ capture failed:", err);
    if (HEADED) {
      console.error("(browser left open for inspection — Ctrl+C to close)");
      return;
    }
    process.exitCode = 1;
  } finally {
    if (!HEADED) {
      await browser.close();
    }
  }
}

main();
