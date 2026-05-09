---
title: Troubleshooting
description: Common issues and solutions for Yatra WordPress travel booking plugin
prev: /guide/faqs
next: /guide/changelog
---

# Troubleshooting

This guide covers common issues and solutions for Yatra WordPress travel booking plugin.

## General Issues

### Plugin Not Working

#### Check Plugin Status

1. **Navigate to** **Plugins → Installed Plugins**
2. **Verify** Yatra is activated
3. **Check** for any error notifications

#### Common Solutions

```php
// Check if Yatra is properly loaded
if (class_exists('Yatra')) {
    echo 'Yatra is loaded';
} else {
    echo 'Yatra is not loaded';
}
```

#### Debug Mode

Enable WordPress debug mode in `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

### White Screen After Activation

#### Common Causes

- **Memory Limit**: Insufficient PHP memory
- **Plugin Conflict**: Conflicting plugin
- **Theme Conflict**: Theme compatibility issue
- **PHP Version**: Incompatible PHP version

#### Solutions

1. **Increase Memory Limit** in `wp-config.php`:
   ```php
   define('WP_MEMORY_LIMIT', '256M');
   ```

2. **Deactivate Conflicting Plugins**:
   - Deactivate all plugins
   - Activate Yatra first
   - Reactivate other plugins one by one

3. **Switch to Default Theme**:
   - Activate default WordPress theme
   - Test if Yatra works
   - Reactivate your theme

### Database Issues

#### Database Tables Not Created

**Check Tables**:
```sql
SHOW TABLES LIKE 'wp_yatra_%';
```

**Create Tables Manually**:
```php
// Run database setup
Yatra\Core\Database\Migration::run();
```

#### Database Connection Issues

**Check Database Credentials**:
- Verify database credentials in `wp-config.php`
- Check database server status
- Test database connection

## Tour Issues

### Tours Not Displaying

#### Check Tour Status

1. **Navigate to** **Yatra → Tours**
2. **Verify** tour status is "Published"
3. **Check** publication date is not in future

#### Check Permalinks

1. **Navigate to** **Settings → Permalinks**
2. **Save Changes** to flush rewrite rules
3. **Test** tour URLs

#### Check Template Files

Verify template files exist:
```php
// Check if template exists
if (file_exists(get_template_directory() . '/single-yatra_tour.php')) {
    echo 'Template exists';
}
```

### Tour Images Not Showing

#### Check Image Permissions

```bash
# Check file permissions
ls -la wp-content/uploads/yatra/
```

**Fix Permissions**:
```bash
chmod 755 wp-content/uploads/yatra/
chmod 644 wp-content/uploads/yatra/*.*
```

#### Check Image URLs

```php
// Get tour image URL
$image_url = get_the_post_thumbnail_url($tour_id);
echo $image_url;
```

### Tour Pricing Not Working

#### Check Price Settings

1. **Navigate to** **Yatra → Tours**
2. **Edit** the tour
3. **Verify** price is set correctly
4. **Check** currency settings

#### Debug Price Calculation

```php
// Debug price calculation
$price = yatra_get_tour_price($tour_id);
error_log("Tour Price: " . $price);
```

## Hotel Issues

### Hotels Not Displaying

#### Check Hotel Status

1. **Navigate to** **Yatra → Hotels**
2. **Verify** hotel status is "Published"
3. **Check** publication date

#### Check Room Settings

1. **Navigate to** **Yatra → Rooms**
2. **Verify** room is linked to hotel
3. **Check** room availability

### Room Availability Issues

#### Check Availability Calendar

1. **Navigate to** **Yatra → Availability**
2. **Verify** availability is set for dates
3. **Check** room capacity limits

#### Debug Availability

```php
// Check room availability
$available = yatra_check_room_availability($room_id, $date);
error_log("Room Available: " . ($available ? 'Yes' : 'No'));
```

## Booking Issues

### Bookings Not Working

#### Check Booking Settings

1. **Navigate to** **Yatra → Settings → Booking**
2. **Verify** booking is enabled
3. **Check** booking form settings

#### Check Payment Settings

1. **Navigate to** **Yatra → Settings → Payment**
2. **Verify** payment gateway is configured
3. **Test** payment gateway

#### Debug Booking Process

```php
// Debug booking creation
$booking_data = array(
    'tour_id' => 123,
    'customer_email' => 'test@example.com'
);

$result = yatra_create_booking($booking_data);
error_log("Booking Result: " . print_r($result, true));
```

### Booking Confirmation Emails Not Sending

#### Check Email Settings

1. **Navigate to** **Yatra → Settings → Email**
2. **Verify** email configuration
3. **Test** email sending

#### Test Email Function

```php
// Test email sending
$to = 'test@example.com';
$subject = 'Test Email';
$message = 'This is a test email';

$sent = wp_mail($to, $subject, $message);
error_log("Email Sent: " . ($sent ? 'Yes' : 'No'));
```

#### Check Email Logs

```php
// Check email logs
if (function_exists('wp_mail')) {
    error_log('wp_mail function exists');
} else {
    error_log('wp_mail function does not exist');
}
```

## Payment Issues

### Payment Gateway Not Working

#### Check Gateway Configuration

1. **Navigate to** **Yatra → Settings → Payment**
2. **Verify** gateway credentials
3. **Test** gateway connection

#### Debug Payment Process

```php
// Debug payment processing
$payment_data = array(
    'amount' => 100.00,
    'currency' => 'USD',
    'gateway' => 'stripe'
);

$result = yatra_process_payment($payment_data);
error_log("Payment Result: " . print_r($result, true));
```

### Stripe Issues

#### Check API Keys

1. **Navigate to** **Yatra → Settings → Payment**
2. **Verify** Stripe API keys
3. **Check** API mode (test/live)

#### Test Stripe Connection

```php
// Test Stripe connection
if (class_exists('\Stripe\Stripe')) {
    \Stripe\Stripe::setApiKey($stripe_secret_key);
    error_log('Stripe connection successful');
} else {
    error_log('Stripe not available');
}
```

### PayPal Issues

#### Check PayPal Configuration

1. **Navigate to** **Yatra → Settings → Payment**
2. **Verify** PayPal email
3. **Check** sandbox mode

#### Test PayPal Connection

```php
// Test PayPal connection
$paypal_email = get_option('yatra_paypal_email');
if (!empty($paypal_email)) {
    error_log('PayPal email configured: ' . $paypal_email);
} else {
    error_log('PayPal email not configured');
}
```

## Availability Issues

### Availability Calendar Not Working

#### Check Calendar Settings

1. **Navigate to** **Yatra → Availability**
2. **Verify** calendar configuration
3. **Check** date format

#### Debug Availability

```php
// Debug availability check
$availability = yatra_get_availability($tour_id, $date);
error_log("Availability: " . print_r($availability, true));
```

### Double Booking Issues

#### Check Booking Locks

```php
// Check booking locks
$lock_key = 'yatra_booking_' . $tour_id . '_' . $date;
$locked = get_transient($lock_key);
error_log("Booking Lock: " . ($locked ? 'Yes' : 'No'));
```

#### Implement Booking Locks

```php
// Implement booking lock
$lock_key = 'yatra_booking_' . $tour_id . '_' . $date;
$lock_timeout = 300; // 5 minutes

if (!get_transient($lock_key)) {
    set_transient($lock_key, true, $lock_timeout);
    // Process booking
} else {
    // Booking already in progress
}
```

## Integration Issues

### WooCommerce Integration

#### Check Integration Status

1. **Navigate to** **Yatra → Settings → Integration**
2. **Verify** WooCommerce is enabled
3. **Check** product sync

#### Debug WooCommerce Integration

```php
// Check WooCommerce integration
if (class_exists('WooCommerce')) {
    error_log('WooCommerce is active');
} else {
    error_log('WooCommerce is not active');
}
```

### Elementor Integration

#### Check Elementor Status

1. **Navigate to** **Yatra → Settings → Integration**
2. **Verify** Elementor is enabled
3. **Check** widget registration

#### Debug Elementor Integration

```php
// Check Elementor integration
if (class_exists('Elementor\Plugin')) {
    error_log('Elementor is active');
} else {
    error_log('Elementor is not active');
}
```

## Performance Issues

### Slow Page Loading

#### Check Database Queries

```php
// Enable query monitoring
define('SAVEQUERIES', true);
define('WP_DEBUG', true);
```

#### Optimize Database

```php
// Optimize database
global $wpdb;
$wpdb->query("OPTIMIZE TABLE {$wpdb->prefix}yatra_tours");
$wpdb->query("OPTIMIZE TABLE {$wpdb->prefix}yatra_bookings");
```

### Memory Issues

#### Check Memory Usage

```php
// Check memory usage
$memory_usage = memory_get_usage(true);
error_log("Memory Usage: " . $memory_usage);
```

#### Increase Memory Limit

```php
// Increase memory limit
ini_set('memory_limit', '256M');
```

## CSS and Styling Issues

### Styles Not Loading

#### Check CSS Files

```php
// Check if CSS files are loaded
wp_enqueue_style('yatra-frontend');
```

#### Clear CSS Cache

```php
// Clear CSS cache
wp_cache_flush();
```

### Responsive Issues

#### Check Mobile Styles

```php
// Add mobile styles
wp_add_inline_style('yatra-mobile', '@media (max-width: 768px) { .yatra-tour { width: 100%; } }');
```

## JavaScript Issues

### JavaScript Errors

#### Check Console Errors

1. **Open browser developer tools**
2. **Check Console tab** for errors
3. **Check Network tab** for failed requests

#### Debug JavaScript

```javascript
// Debug JavaScript
console.log('Yatra loaded');
if (typeof yatra !== 'undefined') {
    console.log('Yatra object available');
} else {
    console.log('Yatra object not available');
}
```

## Security Issues

### Authentication Issues

#### Check User Permissions

```php
// Check user capabilities
if (current_user_can('manage_options')) {
    error_log('User has admin capabilities');
} else {
    error_log('User lacks admin capabilities');
}
```

### CSRF Protection

#### Verify Nonces

```php
// Verify nonce
if (wp_verify_nonce($_POST['nonce'], 'yatra_action')) {
    error_log('Nonce verified');
} else {
    error_log('Nonce verification failed');
}
```

## API Issues

### REST API Not Working

#### Check API Status

```bash
# Test API endpoint
curl -X GET "https://yoursite.com/wp-json/yatra/v1/tours"
```

#### Debug API Responses

```php
// Debug API responses
$response = wp_remote_get('https://yoursite.com/wp-json/yatra/v1/tours');
if (is_wp_error($response)) {
    error_log('API Error: ' . $response->get_error_message());
} else {
    $body = wp_remote_retrieve_body($response);
    error_log('API Response: ' . $body);
}
```

## Migration Issues

### Data Migration Problems

#### Check Migration Status

```php
// Check migration status
$migration_version = get_option('yatra_migration_version');
error_log('Migration Version: ' . $migration_version);
```

#### Run Migration Manually

```php
// Run migration manually
Yatra\Core\Database\Migration::run();
update_option('yatra_migration_version', '1.0.0');
```

## Debug Tools

### Debug Mode

Enable comprehensive debugging:

```php
// Enable all debug options
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SAVEQUERIES', true);
define('SCRIPT_DEBUG', true);
```

### Logging

Add custom logging:

```php
// Custom logging function
function yatra_log($message) {
    if (WP_DEBUG) {
        error_log('[Yatra] ' . $message);
    }
}

// Usage
yatra_log('Tour created: ' . $tour_id);
```

### Query Monitor Plugin

Install Query Monitor plugin for:
- Database query analysis
- Hook and filter monitoring
- Condition debugging
- HTTP request monitoring

## Common Error Messages

### "Tour Not Found"

**Causes**:
- Tour ID doesn't exist
- Tour is not published
- Permalink structure issue

**Solutions**:
- Verify tour ID exists
- Check tour status
- Flush permalinks

### "Booking Failed"

**Causes**:
- Payment gateway error
- Availability issue
- Validation error

**Solutions**:
- Check payment gateway
- Verify availability
- Check validation rules

### "Email Not Sent"

**Causes**:
- SMTP configuration issue
- Email server problem
- Invalid email address

**Solutions**:
- Check SMTP settings
- Test email server
- Verify email address

## Support Resources

### Getting Help

1. **Documentation**: Complete online documentation
2. **Support Forum**: Community support forum
3. **GitHub Issues**: Report bugs on GitHub
4. **Email Support**: Contact support team

### What to Include in Support Request

When requesting support, include:
- **WordPress Version**: Current WordPress version
- **PHP Version**: Current PHP version
- **Plugin Version**: Yatra version
- **Theme**: Active theme
- **Error Message**: Exact error message
- **Steps to Reproduce**: Detailed reproduction steps
- **System Info**: System information report

### System Information Report

Generate system information:

```php
// Generate system info
function yatra_system_info() {
    global $wpdb;
    
    $info = array(
        'WordPress Version' => get_bloginfo('version'),
        'PHP Version' => PHP_VERSION,
        'MySQL Version' => $wpdb->db_version(),
        'Active Theme' => wp_get_theme()->get('Name'),
        'Active Plugins' => implode(', ', get_option('active_plugins')),
        'Server Software' => $_SERVER['SERVER_SOFTWARE'],
        'Memory Limit' => ini_get('memory_limit'),
        'Max Execution Time' => ini_get('max_execution_time'),
    );
    
    return $info;
}
```

## Prevention

### Regular Maintenance

Perform regular maintenance:

1. **Update Plugins**: Keep all plugins updated
2. **Backup Database**: Regular database backups
3. **Optimize Database**: Optimize database tables
4. **Monitor Logs**: Check error logs regularly
5. **Test Functionality**: Test all features regularly

### Monitoring

Set up monitoring:

1. **Error Logging**: Log all errors
2. **Performance Monitoring**: Monitor site performance
3. **Uptime Monitoring**: Monitor site uptime
4. **Security Monitoring**: Monitor security issues

### Testing

Regular testing includes:

1. **Booking Process**: Test complete booking flow
2. **Payment Processing**: Test payment gateways
3. **Email Sending**: Test email notifications
4. **API Endpoints**: Test API functionality

---

**Pro Tip**: Always backup your site before making changes. Test changes in a staging environment before applying them to production. Keep detailed logs of all changes and issues for future reference.
