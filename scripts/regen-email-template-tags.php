<?php
/**
 * Regenerate the per-template merge-tag tables in docs/email-settings.md.
 *
 * Reads the central registry (Yatra\Services\EmailMergeTagRegistry) and
 * rewrites everything between the markers:
 *
 *   <!-- AUTO-GENERATED:per-template-tags:START -->
 *   ...
 *   <!-- AUTO-GENERATED:per-template-tags:END -->
 *
 * Run after adding/renaming/removing a merge tag in the registry:
 *
 *   php scripts/regen-email-template-tags.php
 *
 * The script intentionally has no Composer / WP autoloader dependency — it
 * stubs the handful of WP functions the registry touches so it can be run
 * outside of a WordPress request.
 */

declare(strict_types=1);

namespace {
    // Minimal WP-function stubs so the registry can load standalone.
    if (!function_exists('get_option')) {
        function get_option($k, $d = false) { return $d ?: 'Y-m-d'; }
    }
    if (!function_exists('get_bloginfo')) {
        function get_bloginfo($x) { return 'Demo Site'; }
    }
    if (!function_exists('home_url')) {
        function home_url($p = '/') { return 'https://example.test' . $p; }
    }
    if (!function_exists('admin_url')) {
        function admin_url($p) { return 'https://example.test/wp-admin/' . $p; }
    }
    if (!function_exists('date_i18n')) {
        function date_i18n($f, $t = null) { return date('Y-m-d', $t ?? time()); }
    }
    if (!function_exists('apply_filters')) {
        function apply_filters($h, $v) { return $v; }
    }
    if (!function_exists('yatra_get_email_verification_url')) {
        function yatra_get_email_verification_url($t) { return 'https://example.test/?yatra_verify=' . $t; }
    }
    if (!function_exists('yatra_format_price')) {
        function yatra_format_price($n) { return '$' . number_format($n, 2); }
    }

    // Resolve registry path relative to this script: yatra-docs/scripts -> plugin path.
    $registryPath = realpath(__DIR__ . '/../../wp-content/plugins/yatra/app/Services/EmailMergeTagRegistry.php');
    if ($registryPath === false || !is_file($registryPath)) {
        fwrite(STDERR, "FATAL: EmailMergeTagRegistry.php not found relative to " . __DIR__ . "\n");
        exit(1);
    }
    require $registryPath;
    use Yatra\Services\EmailMergeTagRegistry as R;

    // template_key → [display, event, audience, moduleGate]. Keep in sync with
    // EmailTemplateDefaults::proSystemTemplate() in the yatra plugin.
    $templates = [
        'booking_confirmation'              => ['Booking Confirmation',          'booking.created',              'Customer', '—'],
        'new_booking'                       => ['Legacy: New Booking',           'booking.created',              'Customer', '—'],
        'booking_confirmed'                 => ['Legacy: Booking Confirmed',     'booking.confirmed',            'Customer', '—'],
        'booking_cancelled'                 => ['Booking Cancelled',             'booking.cancelled',            'Customer', '—'],
        'booking_completed'                 => ['Booking Completed',             'booking.completed',            'Customer', '—'],
        'booking_expired_customer'          => ['Booking Expired',               'booking.expired',              'Customer', '—'],
        'booking_payment'                   => ['Legacy: Payment Received',      'payment.received',             'Customer', '—'],
        'admin_new_booking'                 => ['Admin: New Booking',            'booking.created',              'Admin',    '—'],
        'admin_payment_received'            => ['Admin: Payment Received',       'payment.received',             'Admin',    '—'],
        'admin_booking_cancelled'           => ['Admin: Booking Cancelled',      'booking.cancelled',            'Admin',    '—'],
        'admin_booking_expired'             => ['Admin: Booking Expired',        'booking.expired',              'Admin',    '—'],
        'payment_received'                  => ['Payment Received (customer)',   'payment.received',             'Customer', '—'],
        'payment_reminder'                  => ['Payment Reminder',              'payment.reminder',             'Customer', '—'],
        'scheduled_payment_reminder'        => ['Scheduled Payment Reminder',    'scheduled.payment.reminder',   'Customer', 'Scheduled Payments (Pro)'],
        'scheduled_payment_succeeded'       => ['Scheduled Payment Received',    'scheduled.payment.succeeded',  'Customer', 'Scheduled Payments (Pro)'],
        'scheduled_payment_failed'          => ['Scheduled Payment Failed',      'scheduled.payment.failed',     'Customer', 'Scheduled Payments (Pro)'],
        'admin_scheduled_payment_failed'    => ['Admin: Scheduled Payment Failed', 'scheduled.payment.failed',   'Admin',    'Scheduled Payments (Pro)'],
        'trip_reminder'                     => ['Trip Reminder',                 'reminder.trip',                'Customer', '—'],
        'review_request'                    => ['Review Request',                'marketing.review_request',     'Customer', '—'],
        'enquiry_received'                  => ['Enquiry Received',              'enquiry.created',              'Customer', '—'],
        'enquiry_admin'                     => ['Admin: New Enquiry',            'enquiry.created',              'Admin',    '—'],
        'enquiry_response'                  => ['Enquiry Response',              'enquiry.responded',            'Customer', '—'],
        'customer_email_verification'       => ['Email Verification',            'account.email_verification',   'Customer', '—'],
        'trip_consent_request'              => ['Trip Consent Request',          'consent.requested',            'Customer', 'Trip Consent (Pro)'],
        'abandoned_booking_recovery_first'  => ['Abandoned Recovery — 1h',      'booking.abandoned_recovery',   'Customer', 'Abandoned Booking Recovery (Pro)'],
        'abandoned_booking_recovery_second' => ['Abandoned Recovery — 1d',      'booking.abandoned_recovery',   'Customer', 'Abandoned Booking Recovery (Pro)'],
        'abandoned_booking_recovery_final'  => ['Abandoned Recovery — 3d',      'booking.abandoned_recovery',   'Customer', 'Abandoned Booking Recovery (Pro)'],
    ];

    $catCaption = [
        'general' => 'Universal',
        'customer' => 'Customer',
        'booking' => 'Booking',
        'payment' => 'Payment',
        'scheduled_payment' => 'Scheduled payment',
        'reminder' => 'Reminder & review',
        'enquiry' => 'Enquiry',
        'trip_consent' => 'Trip consent',
        'account' => 'Account / verification',
        'abandoned_recovery' => 'Abandoned recovery',
    ];

    // Per-event reference: what the event means, where it fires, the templates
    // that subscribe. The variable explanations come straight from the
    // registry's `description` field — single source of truth.
    $events = [
        'booking.created' => [
            'name'  => 'Booking Created',
            'fires' => 'A new booking is inserted into the database. Triggered by checkout (`POST /yatra/v1/bookings/place`) and by the admin "Create Booking" flow. The Email Automation hook fans the event out to every active template keyed to this event.',
            'source' => '`yatra_booking_created` action → `EmailAutomationHooks::onBookingCreatedEventTemplates` → `EmailAutomationService::mergeBookingVariablesForTemplates()`',
        ],
        'booking.confirmed' => [
            'name'  => 'Booking Confirmed',
            'fires' => 'Booking status flips to `confirmed` — typically after a deposit / full payment lands, or when an operator manually confirms a pending booking in admin.',
            'source' => '`BookingService::sendStatusEmail()` (status_confirmed branch) → free renderer → Pro override via `maybeSendTransactional`',
        ],
        'booking.cancelled' => [
            'name'  => 'Booking Cancelled',
            'fires' => 'Booking status flips to `cancelled`. Either the customer cancels through My Account or an operator cancels in admin; the cancellation reason is stored on the booking row and exposed to the template.',
            'source' => '`BookingService::sendStatusEmail()` (cancelled branch) → free renderer → Pro override',
        ],
        'booking.completed' => [
            'name'  => 'Trip Completed',
            'fires' => 'Booking is marked `completed` — usually by the `yatra_booking_completion_cron` after the travel date passes, or by an operator manually flipping the status.',
            'source' => '`BookingService::sendStatusEmail()` (completed branch) and `EmailAutomationHooks::maybeSendCompletedTemplate`',
        ],
        'booking.expired' => [
            'name'  => 'Booking Expired (Non-payment)',
            'fires' => 'The booking-expiry cron auto-cancels a pending booking that wasn\'t paid within the configured window. Sends both customer and admin variants.',
            'source' => '`BookingCronService::expireBookings()` → `TYPE_BOOKING_EXPIRED_CUSTOMER` / `TYPE_ADMIN_BOOKING_EXPIRED`',
        ],
        'payment.received' => [
            'name'  => 'Payment Received',
            'fires' => 'A payment (full, deposit, or partial) is captured. Fired from every gateway (Stripe, PayPal, Razorpay, Paystack, Mollie, COD) via `yatra_payment_completed`. Sends both customer receipt and admin notification.',
            'source' => '`NotificationService::sendPaymentReceived()` → `TYPE_PAYMENT_CONFIRMATION` / `TYPE_ADMIN_PAYMENT_RECEIVED`',
        ],
        'payment.reminder' => [
            'name'  => 'Payment Reminder',
            'fires' => 'A balance is outstanding past its due date. Currently no built-in cron dispatcher — operators trigger sends from the booking detail page, or wire one via the `yatra_send_transactional_email` filter. Tag list reflects what `variablesFromBooking()` + payment context provide when fired.',
            'source' => 'Operator-triggered or custom cron → `TYPE_PAYMENT_REMINDER`',
        ],
        'reminder.trip' => [
            'name'  => 'Trip Reminder',
            'fires' => 'The trip-reminder cron fires `reminder_days` before travel date (default 3 days, configurable in Settings → Bookings). Sends a "your trip is coming up" email with packing-list / weather extras.',
            'source' => '`BookingCronService::sendReminders()` → `TYPE_BOOKING_REMINDER`',
        ],
        'marketing.review_request' => [
            'name'  => 'Review Request',
            'fires' => 'After a booking is marked `completed`, the `ReviewReminderService` schedules an email some configurable number of days later inviting the customer to leave a review.',
            'source' => '`ReviewReminderService::sendReminder()` → `TYPE_REVIEW_REQUEST`',
        ],
        'enquiry.created' => [
            'name'  => 'Enquiry Received',
            'fires' => 'A visitor submits the enquiry form on a trip page (`POST /yatra/v1/enquiries`). Sends a confirmation to the visitor AND a notification to the configured admin address.',
            'source' => '`EnquiryService::createEnquiry()` → `TYPE_ENQUIRY_CUSTOMER_RECEIVED` + `TYPE_ENQUIRY_ADMIN`',
        ],
        'enquiry.responded' => [
            'name'  => 'Enquiry Response',
            'fires' => 'An operator types a reply in the admin enquiry detail panel and clicks Send. The response is recorded on the thread and emailed back to the customer.',
            'source' => '`EnquiryService::respondToEnquiry()` → `TYPE_ENQUIRY_CUSTOMER_RESPONSE`',
        ],
        'consent.requested' => [
            'name'  => 'Trip Consent Requested',
            'fires' => 'An operator (or auto-trigger) sends a consent form to a booking traveler. Each traveler receives a unique signing URL.',
            'source' => '`TripConsentService::sendConsentRequest()` → `TYPE_TRIP_CONSENT_REQUEST`',
        ],
        'account.email_verification' => [
            'name'  => 'Customer Email Verification',
            'fires' => 'A new customer registers OR requests a fresh verification link. The email contains a magic link that, when opened, flips the `yatra_email_verified` user meta to `1` and lets the customer complete checkout.',
            'source' => '`AuthController::sendVerificationEmail()` → `TYPE_CUSTOMER_EMAIL_VERIFICATION`',
        ],
        'scheduled.payment.reminder' => [
            'name'  => 'Scheduled Payment Reminder',
            'fires' => 'The Scheduled Payments cron runs before each installment is charged, sending a heads-up email with the upcoming amount and date.',
            'source' => '`ScheduledPaymentService::sendUpcomingReminder()` → `TYPE_SCHEDULED_PAYMENT_REMINDER`',
        ],
        'scheduled.payment.succeeded' => [
            'name'  => 'Scheduled Payment Succeeded',
            'fires' => 'A scheduled installment is successfully captured by the gateway. The email confirms the charge and shows the remaining balance.',
            'source' => '`ScheduledPaymentService::handleSuccess()` → `TYPE_SCHEDULED_PAYMENT_SUCCEEDED`',
        ],
        'scheduled.payment.failed' => [
            'name'  => 'Scheduled Payment Failed',
            'fires' => 'A scheduled installment fails — card declined, insufficient funds, etc. Sends both a customer notice (with a "fix payment method" CTA) and an admin alert.',
            'source' => '`ScheduledPaymentService::handleFailure()` → `TYPE_SCHEDULED_PAYMENT_FAILED` + `TYPE_ADMIN_SCHEDULED_PAYMENT_FAILED`',
        ],
        'booking.abandoned_recovery' => [
            'name'  => 'Abandoned Checkout Recovery',
            'fires' => 'A customer started checkout but didn\'t complete payment. The abandoned-recovery cron sends a sequence of reminders (1h, 1d, 3d by default) each containing a resume-checkout link.',
            'source' => '`AbandonedBookingService::sendRecoveryEmail()` → `TYPE_ABANDONED_BOOKING_RECOVERY_FIRST/SECOND/FINAL`',
        ],
    ];

    // Reverse-index: event → list of templates that subscribe to it.
    $byEvent = [];
    foreach ($templates as $tplKey => [$display, $event, $audience, $gate]) {
        $byEvent[$event] = $byEvent[$event] ?? [];
        $byEvent[$event][] = "`$tplKey` — $display ($audience)";
    }

    // ---- Render per-EVENT payload ----
    ob_start();
    foreach ($events as $eventKey => $meta) {
        $grouped = R::groupedForEvent($eventKey);
        $tagCount = array_sum(array_map('count', $grouped));
        $subscribers = $byEvent[$eventKey] ?? [];

        echo "### `$eventKey` — {$meta['name']}\n\n";
        echo "**When it fires.** {$meta['fires']}\n\n";
        echo "**Dispatcher.** {$meta['source']}\n\n";

        if ($subscribers !== []) {
            echo "**Templates listening to this event:**\n\n";
            foreach ($subscribers as $line) {
                echo "- $line\n";
            }
            echo "\n";
        }

        echo "**Variables available** ($tagCount across " . count($grouped) . " groups):\n\n";
        foreach ($grouped as $cat => $rows) {
            $caption = $catCaption[$cat] ?? ucfirst($cat);
            echo "<details><summary><strong>$caption</strong> (" . count($rows) . ")</summary>\n\n";
            echo "<table><thead><tr><th>Tag</th><th>Explanation</th></tr></thead><tbody>\n";
            foreach ($rows as $row) {
                $desc = htmlspecialchars($row['description'] ?? '', ENT_QUOTES);
                echo "<tr><td><code>{{" . $row['key'] . "}}</code></td><td>$desc</td></tr>\n";
            }
            echo "</tbody></table>\n\n";
            echo "</details>\n\n";
        }
        echo "---\n\n";
    }
    $generatedEvents = ob_get_clean();

    // ---- Render per-TEMPLATE payload ----
    ob_start();
    foreach ($templates as $tplKey => [$display, $event, $audience, $gate]) {
        $grouped = R::groupedForEvent($event);
        $tagCount = array_sum(array_map('count', $grouped));

        echo "### `$tplKey` — $display\n\n";
        echo "- **Trigger event** — `$event`\n";
        echo "- **Audience** — $audience\n";
        if ($gate !== '—') echo "- **Module gate** — $gate\n";
        echo "\n";
        echo "<details><summary><strong>Available merge tags</strong> ($tagCount tags across " . count($grouped) . " groups)</summary>\n\n";

        foreach ($grouped as $cat => $rows) {
            $caption = $catCaption[$cat] ?? ucfirst($cat);
            echo "**$caption**\n\n";
            echo "<table><thead><tr><th>Tag</th><th>Renders</th></tr></thead><tbody>\n";
            foreach ($rows as $row) {
                $desc = htmlspecialchars($row['description'] ?? '', ENT_QUOTES);
                echo "<tr><td><code>{{" . $row['key'] . "}}</code></td><td>$desc</td></tr>\n";
            }
            echo "</tbody></table>\n\n";
        }
        echo "</details>\n\n---\n\n";
    }
    $generatedTemplates = ob_get_clean();

    // Patch email-settings.md between the two pairs of markers.
    $docPath = realpath(__DIR__ . '/../docs/email-settings.md');
    if ($docPath === false || !is_file($docPath)) {
        fwrite(STDERR, "FATAL: docs/email-settings.md not found relative to " . __DIR__ . "\n");
        exit(1);
    }
    $contents = file_get_contents($docPath);
    $original = $contents;

    $blocks = [
        'per-event-reference' => $generatedEvents,
        'per-template-tags'   => $generatedTemplates,
    ];
    foreach ($blocks as $marker => $payload) {
        $start = "<!-- AUTO-GENERATED:$marker:START -->";
        $end = "<!-- AUTO-GENERATED:$marker:END -->";
        $pattern = '/(' . preg_quote($start, '/') . ')(.*?)(' . preg_quote($end, '/') . ')/s';
        if (!preg_match($pattern, $contents)) {
            fwrite(STDERR, "FATAL: marker pair '$marker' not found in $docPath\n");
            exit(2);
        }
        $contents = preg_replace($pattern, "$1\n\n" . rtrim($payload) . "\n\n$3", $contents);
    }

    if ($contents === $original) {
        fwrite(STDERR, "No changes (registry output already matches " . count($templates) . " templates / " . count($events) . " events).\n");
        exit(0);
    }

    file_put_contents($docPath, $contents);
    fwrite(STDERR, "Wrote " . count($events) . " event sections + " . count($templates) . " template sections to $docPath\n");
}
