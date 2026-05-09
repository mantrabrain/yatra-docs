---
title: Hooks & Filters
description: Complete hooks and filters reference for Yatra
---

# Hooks & Filters

This comprehensive guide covers all Yatra hooks and filters for customizing and extending functionality.

## Hook System Overview

Yatra provides a comprehensive hook system based on WordPress hooks and filters, allowing developers to customize and extend functionality.

### Hook Types

- **Action Hooks**: Allow you to add custom functionality at specific points
- **Filter Hooks**: Allow you to modify data and behavior
- **Custom Hooks**: Yatra-specific hooks for tour and hotel functionality

## Tour Hooks

### Tour Creation Hooks

#### Action Hooks

```php
// Fired when a tour is created
do_action('yatra_tour_created', $tour_id, $tour_data);

// Fired when a tour is updated
do_action('yatra_tour_updated', $tour_id, $tour_data, $old_data);

// Fired when a tour is deleted
do_action('yatra_tour_deleted', $tour_id, $tour_data);
```

#### Filter Hooks

```php
// Filter tour data before saving
$tour_data = apply_filters('yatra_tour_save_data', $tour_data, $tour_id);

// Filter tour query arguments
$query_args = apply_filters('yatra_tour_query_args', $query_args);

// Filter tour display data
$display_data = apply_filters('yatra_tour_display_data', $tour_data);
```

### Tour Display Hooks

#### Action Hooks

```php
// Fired before tour display
do_action('yatra_before_tour_display', $tour_id);

// Fired after tour display
do_action('yatra_after_tour_display', $tour_id);

// Fired in tour content
do_action('yatra_tour_content', $tour_id);
```

#### Filter Hooks

```php
// Filter tour title
$title = apply_filters('yatra_tour_title', $tour->get_title(), $tour_id);

// Filter tour description
$description = apply_filters('yatra_tour_description', $tour->get_description(), $tour_id);

// Filter tour price
$price = apply_filters('yatra_tour_price', $tour->get_price(), $tour_id);

// Filter tour image
$image = apply_filters('yatra_tour_image', $tour->get_image(), $tour_id);
```

## Hotel Hooks

### Hotel Creation Hooks

#### Action Hooks

```php
// Fired when a hotel is created
do_action('yatra_hotel_created', $hotel_id, $hotel_data);

// Fired when a hotel is updated
do_action('yatra_hotel_updated', $hotel_id, $hotel_data, $old_data);

// Fired when a hotel is deleted
do_action('yatra_hotel_deleted', $hotel_id, $hotel_data);
```

#### Filter Hooks

```php
// Filter hotel data before saving
$hotel_data = apply_filters('yatra_hotel_save_data', $hotel_data, $hotel_id);

// Filter hotel query arguments
$query_args = apply_filters('yatra_hotel_query_args', $query_args);

// Filter hotel display data
$display_data = apply_filters('yatra_hotel_display_data', $hotel_data);
```

### Room Hooks

#### Action Hooks

```php
// Fired when a room is created
do_action('yatra_room_created', $room_id, $room_data);

// Fired when a room is updated
do_action('yatra_room_updated', $room_id, $room_data, $old_data);

// Fired when a room is deleted
do_action('yatra_room_deleted', $room_id, $room_data);
```

#### Filter Hooks

```php
// Filter room price
$price = apply_filters('yatra_room_price', $room->get_price(), $room_id);

// Filter room availability
$availability = apply_filters('yatra_room_availability', $room->get_availability(), $room_id);

// Filter room amenities
$amenities = apply_filters('yatra_room_amenities', $room->get_amenities(), $room_id);
```

## Booking Hooks

### Booking Creation Hooks

#### Action Hooks

```php
// Fired when booking is created
do_action('yatra_booking_created', $booking_id, $booking_data);

// Fired when booking is updated
do_action('yatra_booking_updated', $booking_id, $booking_data, $old_data);

// Fired when booking is confirmed
do_action('yatra_booking_confirmed', $booking_id, $booking_data);

// Fired when booking is cancelled
do_action('yatra_booking_cancelled', $booking_id, $booking_data);
```

#### Filter Hooks

```php
// Filter booking data before saving
$booking_data = apply_filters('yatra_booking_save_data', $booking_data, $booking_id);

// Filter booking status
$status = apply_filters('yatra_booking_status', $status, $booking_id);

// Filter booking price
$price = apply_filters('yatra_booking_price', $price, $booking_id);
```

### Booking Validation Hooks

#### Filter Hooks

```php
// Filter booking validation rules
$validation_rules = apply_filters('yatra_booking_validation_rules', $rules);

// Filter booking validation errors
$errors = apply_filters('yatra_booking_validation_errors', $errors, $booking_data);

// Filter booking availability check
$available = apply_filters('yatra_booking_available', $available, $booking_data);
```

## Payment Hooks

### Payment Processing Hooks

#### Action Hooks

```php
// Fired when payment is initiated
do_action('yatra_payment_initiated', $booking_id, $payment_data);

// Fired when payment is completed
do_action('yatra_payment_completed', $booking_id, $payment_data);

// Fired when payment fails
do_action('yatra_payment_failed', $booking_id, $payment_data, $error);

// Fired when payment is refunded
do_action('yatra_payment_refunded', $booking_id, $refund_data);
```

#### Filter Hooks

```php
// Filter payment gateway options
$gateways = apply_filters('yatra_payment_gateways', $gateways);

// Filter payment amount
$amount = apply_filters('yatra_payment_amount', $amount, $booking_id);

// Filter payment data
$payment_data = apply_filters('yatra_payment_data', $payment_data, $booking_id);
```

## Email Hooks

### Email Sending Hooks

#### Action Hooks

```php
// Fired when email is sent
do_action('yatra_email_sent', $email_type, $recipient, $data);

// Fired before email sending
do_action('yatra_before_email_send', $email_type, $recipient, $data);

// Fired after email sending
do_action('yatra_after_email_send', $email_type, $recipient, $data, $result);
```

#### Filter Hooks

```php
// Filter email subject
$subject = apply_filters('yatra_email_subject', $subject, $email_type, $data);

// Filter email content
$content = apply_filters('yatra_email_content', $content, $email_type, $data);

// Filter email headers
$headers = apply_filters('yatra_email_headers', $headers, $email_type, $data);
```

## Availability Hooks

### Availability Management Hooks

#### Action Hooks

```php
// Fired when availability is updated
do_action('yatra_availability_updated', $item_id, $availability_data);

// Fired when availability is checked
do_action('yatra_availability_checked', $item_id, $date_range);

// Fired when availability is blocked
do_action('yatra_availability_blocked', $item_id, $date_range, $reason);
```

#### Filter Hooks

```php
// Filter availability data
$availability = apply_filters('yatra_availability_data', $availability, $item_id);

// Filter availability check result
$available = apply_filters('yatra_availability_check', $available, $item_id, $date_range);

// Filter availability calendar data
$calendar_data = apply_filters('yatra_availability_calendar', $calendar_data, $item_id);
```

## Pricing Hooks

### Price Calculation Hooks

#### Filter Hooks

```php
// Filter tour price
$price = apply_filters('yatra_tour_price', $price, $tour_id, $date_range);

// Filter hotel room price
$price = apply_filters('yatra_room_price', $price, $room_id, $date_range);

// Filter booking total price
$total = apply_filters('yatra_booking_total', $total, $booking_data);

// Filter price calculation
$price = apply_filters('yatra_calculate_price', $price, $item_data, $options);
```

### Discount Hooks

#### Filter Hooks

```php
// Filter discount amount
$discount = apply_filters('yatra_discount_amount', $discount, $booking_data);

// Filter discount applicability
$applicable = apply_filters('yatra_discount_applicable', $applicable, $discount_code, $booking_data);

// Filter final price after discount
$final_price = apply_filters('yatra_final_price', $final_price, $price, $discount);
```

## User/Account Hooks

### User Management Hooks

#### Action Hooks

```php
// Fired when user account is created
do_action('yatra_user_created', $user_id, $user_data);

// Fired when user logs in
do_action('yatra_user_login', $user_id);

// Fired when user logs out
do_action('yatra_user_logout', $user_id);

// Fired when user profile is updated
do_action('yatra_user_profile_updated', $user_id, $profile_data);
```

#### Filter Hooks

```php
// Filter user registration data
$user_data = apply_filters('yatra_user_registration_data', $user_data);

// Filter user permissions
$capabilities = apply_filters('yatra_user_capabilities', $capabilities, $user_id);

// Filter user dashboard data
$dashboard_data = apply_filters('yatra_user_dashboard_data', $dashboard_data, $user_id);
```

## Admin Hooks

### Admin Interface Hooks

#### Action Hooks

```php
// Fired in admin menu
do_action('yatra_admin_menu');

// Fired in admin scripts
do_action('yatra_admin_scripts');

// Fired in admin styles
do_action('yatra_admin_styles');

// Fired in admin footer
do_action('yatra_admin_footer');
```

#### Filter Hooks

```php
// Filter admin menu items
$menu_items = apply_filters('yatra_admin_menu_items', $menu_items);

// Filter admin columns
$columns = apply_filters('yatra_admin_columns', $columns, $post_type);

// Filter admin capabilities
$capabilities = apply_filters('yatra_admin_capabilities', $capabilities);
```

## API Hooks

### REST API Hooks

#### Action Hooks

```php
// Fired before API response
do_action('yatra_api_before_response', $endpoint, $request);

// Fired after API response
do_action('yatra_api_after_response', $endpoint, $request, $response);

// Fired on API error
do_action('yatra_api_error', $endpoint, $request, $error);
```

#### Filter Hooks

```php
// Filter API response data
$response_data = apply_filters('yatra_api_response_data', $response_data, $endpoint);

// Filter API permissions
$permissions = apply_filters('yatra_api_permissions', $permissions, $endpoint, $request);

// Filter API validation rules
$validation_rules = apply_filters('yatra_api_validation_rules', $validation_rules, $endpoint);
```

## Custom Hook Examples

### Adding Custom Fields

```php
// Add custom fields to tour
function add_custom_tour_fields($fields, $tour_id) {
    $fields['custom_field'] = get_post_meta($tour_id, '_custom_field', true);
    return $fields;
}
add_filter('yatra_tour_display_data', 'add_custom_tour_fields', 10, 2);

// Save custom fields
function save_custom_tour_fields($tour_data, $tour_id) {
    if (isset($_POST['custom_field'])) {
        update_post_meta($tour_id, '_custom_field', sanitize_text_field($_POST['custom_field']));
    }
    return $tour_data;
}
add_filter('yatra_tour_save_data', 'save_custom_tour_fields', 10, 2);
```

### Custom Email Templates

```php
// Customize email subject
function custom_email_subject($subject, $email_type, $data) {
    if ($email_type === 'booking_confirmation') {
        $subject = 'Your booking is confirmed! - ' . get_bloginfo('name');
    }
    return $subject;
}
add_filter('yatra_email_subject', 'custom_email_subject', 10, 3);

// Customize email content
function custom_email_content($content, $email_type, $data) {
    if ($email_type === 'booking_confirmation') {
        $content = 'Thank you for your booking! Your booking ID is ' . $data['booking_id'];
    }
    return $content;
}
add_filter('yatra_email_content', 'custom_email_content', 10, 3);
```

### Custom Pricing Logic

```php
// Add custom pricing logic
function custom_pricing_logic($price, $tour_id, $date_range) {
    // Add weekend surcharge
    if (is_weekend($date_range['start_date'])) {
        $price = $price * 1.2; // 20% weekend surcharge
    }
    
    // Add group discount
    if (isset($date_range['guests']) && $date_range['guests'] >= 5) {
        $price = $price * 0.9; // 10% group discount
    }
    
    return $price;
}
add_filter('yatra_tour_price', 'custom_pricing_logic', 10, 3);
```

### Custom Validation

```php
// Add custom validation
function custom_booking_validation($errors, $booking_data) {
    // Validate minimum age
    if (isset($booking_data['age']) && $booking_data['age'] < 18) {
        $errors['age'] = 'You must be at least 18 years old to book';
    }
    
    // Validate special requirements
    if (isset($booking_data['special_requirements']) && strlen($booking_data['special_requirements']) > 500) {
        $errors['special_requirements'] = 'Special requirements must be less than 500 characters';
    }
    
    return $errors;
}
add_filter('yatra_booking_validation_errors', 'custom_booking_validation', 10, 2);
```

## Hook Reference

### Complete Hook List

#### Tour Hooks
- `yatra_tour_created`
- `yatra_tour_updated`
- `yatra_tour_deleted`
- `yatra_tour_save_data`
- `yatra_tour_query_args`
- `yatra_tour_display_data`
- `yatra_tour_title`
- `yatra_tour_description`
- `yatra_tour_price`
- `yatra_tour_image`
- `yatra_before_tour_display`
- `yatra_after_tour_display`
- `yatra_tour_content`

#### Hotel Hooks
- `yatra_hotel_created`
- `yatra_hotel_updated`
- `yatra_hotel_deleted`
- `yatra_hotel_save_data`
- `yatra_hotel_query_args`
- `yatra_hotel_display_data`
- `yatra_room_created`
- `yatra_room_updated`
- `yatra_room_deleted`
- `yatra_room_price`
- `yatra_room_availability`
- `yatra_room_amenities`

#### Booking Hooks
- `yatra_booking_created`
- `yatra_booking_updated`
- `yatra_booking_confirmed`
- `yatra_booking_cancelled`
- `yatra_booking_save_data`
- `yatra_booking_status`
- `yatra_booking_price`
- `yatra_booking_validation_rules`
- `yatra_booking_validation_errors`
- `yatra_booking_available`

#### Payment Hooks
- `yatra_payment_initiated`
- `yatra_payment_completed`
- `yatra_payment_failed`
- `yatra_payment_refunded`
- `yatra_payment_gateways`
- `yatra_payment_amount`
- `yatra_payment_data`

#### Email Hooks
- `yatra_email_sent`
- `yatra_before_email_send`
- `yatra_after_email_send`
- `yatra_email_subject`
- `yatra_email_content`
- `yatra_email_headers`

#### Availability Hooks
- `yatra_availability_updated`
- `yatra_availability_checked`
- `yatra_availability_blocked`
- `yatra_availability_data`
- `yatra_availability_check`
- `yatra_availability_calendar`

#### Pricing Hooks
- `yatra_tour_price`
- `yatra_room_price`
- `yatra_booking_total`
- `yatra_calculate_price`
- `yatra_discount_amount`
- `yatra_discount_applicable`
- `yatra_final_price`

#### User Hooks
- `yatra_user_created`
- `yatra_user_login`
- `yatra_user_logout`
- `yatra_user_profile_updated`
- `yatra_user_registration_data`
- `yatra_user_capabilities`
- `yatra_user_dashboard_data`

#### Admin Hooks
- `yatra_admin_menu`
- `yatra_admin_scripts`
- `yatra_admin_styles`
- `yatra_admin_footer`
- `yatra_admin_menu_items`
- `yatra_admin_columns`
- `yatra_admin_capabilities`

#### API Hooks
- `yatra_api_before_response`
- `yatra_api_after_response`
- `yatra_api_error`
- `yatra_api_response_data`
- `yatra_api_permissions`
- `yatra_api_validation_rules`

## Best Practices

### Hook Usage

- **Use proper priority**: Set appropriate priority for hooks
- **Check parameters**: Validate parameters before using them
- **Return values**: Always return values for filter hooks
- **Error handling**: Handle errors gracefully in hook functions

### Performance

- **Avoid expensive operations**: Don't run heavy operations in frequently called hooks
- **Use caching**: Cache results when possible
- **Limit database queries**: Minimize database queries in hooks
- **Optimize loops**: Optimize loops in hook functions

### Security

- **Sanitize input**: Always sanitize input data
- **Validate data**: Validate data before processing
- **Escape output**: Escape output to prevent XSS
- **Check permissions**: Verify user permissions when needed

## Troubleshooting

### Common Issues

#### Hook Not Firing

- **Check hook name**: Verify correct hook name
- **Check timing**: Ensure hook is called at the right time
- **Check priority**: Adjust hook priority if needed
- **Check dependencies**: Ensure required dependencies are loaded

#### Filter Not Working

- **Return value**: Always return a value from filter functions
- **Check parameters**: Verify correct parameters
- **Check data type**: Ensure correct data type is returned
- **Check priority**: Adjust filter priority if needed

### Debug Mode

Enable hook debugging:

```php
// Enable hook debugging
define('YATRA_DEBUG_HOOKS', true);

// Log hook calls
function debug_yatra_hooks($hook_name) {
    error_log("Yatra Hook Called: $hook_name");
}
add_action('all', 'debug_yatra_hooks');
```

## Next Steps

After mastering hooks and filters:

1. **[API Reference](/guide/api-reference)** - Developer API documentation
2. **[FAQs](/guide/faqs)** - Find answers to common questions
3. **[Troubleshooting](/guide/troubleshooting)** - Resolve issues
4. **[Changelog](/guide/changelog)** - Version history and updates

---

**Pro Tip**: Use hook priorities carefully to ensure your custom code runs at the right time. Always test your custom hooks and filters thoroughly before deploying to production.
