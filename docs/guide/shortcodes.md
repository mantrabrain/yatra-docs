---
title: Shortcodes
description: Complete guide to Yatra shortcodes for displaying tours, hotels, and booking forms
prev: /guide/third-party-integrations
next: /guide/hooks-filters
---

# Shortcodes

This comprehensive guide covers all Yatra shortcodes for displaying tours, hotels, and booking functionality on your WordPress site.

## Shortcode Overview

Yatra provides a comprehensive set of shortcodes to display tours, hotels, and booking forms anywhere on your WordPress site.

### Available Shortcodes

- **Tour Display**: `[yatra_tours]`, `[yatra_tour]`
- **Hotel Display**: `[yatra_hotels]`, `[yatra_hotel]`
- **Booking Forms**: `[yatra_booking_form]`, `[yatra_booking]`
- **Search Forms**: `[yatra_tour_search]`, `[yatra_hotel_search]`
- **Calendars**: `[yatra_availability]`, `[yatra_calendar]`
- **Account Pages**: `[yatra_account]`, `[yatra_dashboard]`

## Tour Shortcodes

### Tour Listing Shortcode

Display multiple tours in a grid or list layout:

#### Basic Usage

```html
[yatra_tours]
```

#### Advanced Usage

```html
[yatra_tours 
    category="adventure" 
    limit="6" 
    columns="3" 
    orderby="date" 
    order="DESC"
    show_price="true"
    show_image="true"
    show_description="true"
    pagination="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `category` | all | Tour category slug |
| `limit` | 10 | Number of tours to display |
| `columns` | 3 | Number of columns in grid |
| `orderby` | date | Sort by date, title, price, rating |
| `order` | DESC | Sort order ASC or DESC |
| `show_price` | true | Show/hide prices |
| `show_image` | true | Show/hide tour images |
| `show_description` | true | Show/hide descriptions |
| `pagination` | true | Enable/disable pagination |

### Single Tour Shortcode

Display a specific tour:

#### Basic Usage

```html
[yatra_tour id="123"]
```

#### Advanced Usage

```html
[yatra_tour 
    id="123"
    show_booking="true"
    show_gallery="true"
    show_itinerary="true"
    show_highlights="true"
    show_price="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `id` | required | Tour ID |
| `show_booking` | true | Show booking form |
| `show_gallery` | true | Show image gallery |
| `show_itinerary` | true | Show tour itinerary |
| `show_highlights` | true | Show tour highlights |
| `show_price` | true | Show pricing information |

### Tour Search Shortcode

Display tour search form:

#### Basic Usage

```html
[yatra_tour_search]
```

#### Advanced Usage

```html
[yatra_tour_search
    category="adventure"
    destination="tokyo"
    price_range="100-500"
    duration="1-7"
    difficulty="easy"
    show_filters="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `category` | all | Default category filter |
| `destination` | all | Default destination filter |
| `price_range` | all | Default price range filter |
| `duration` | all | Default duration filter |
| `difficulty` | all | Default difficulty filter |
| `show_filters` | true | Show/hide filter options |

## Hotel Shortcodes

### Hotel Listing Shortcode

Display multiple hotels:

#### Basic Usage

```html
[yatra_hotels]
```

#### Advanced Usage

```html
[yatra_hotels
    city="tokyo"
    stars="5"
    limit="8"
    columns="2"
    show_rooms="true"
    show_amenities="true"
    show_price="true"
    pagination="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `city` | all | City filter |
| `stars` | all | Star rating filter |
| `limit` | 10 | Number of hotels to display |
| `columns` | 2 | Number of columns |
| `show_rooms` | true | Show room options |
| `show_amenities` | true | Show hotel amenities |
| `show_price` | true | Show room prices |
| `pagination` | true | Enable pagination |

### Single Hotel Shortcode

Display a specific hotel:

#### Basic Usage

```html
[yatra_hotel id="456"]
```

#### Advanced Usage

```html
[yatra_hotel
    id="456"
    show_rooms="true"
    show_gallery="true"
    show_facilities="true"
    show_location="true"
    show_booking="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `id` | required | Hotel ID |
| `show_rooms` | true | Show room types |
| `show_gallery` | true | Show image gallery |
| `show_facilities` | true | Show hotel facilities |
| `show_location` | true | Show location map |
| `show_booking` | true | Show booking form |

### Hotel Search Shortcode

Display hotel search form:

#### Basic Usage

```html
[yatra_hotel_search]
```

#### Advanced Usage

```html
[yatra_hotel_search
    city="tokyo"
    checkin="today"
    checkout="tomorrow"
    guests="2"
    rooms="1"
    show_filters="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `city` | all | Default city |
| `checkin` | today | Default check-in date |
| `checkout` | tomorrow | Default check-out date |
| `guests` | 1 | Default number of guests |
| `rooms` | 1 | Default number of rooms |
| `show_filters` | true | Show filter options |

## Booking Shortcodes

### Booking Form Shortcode

Display booking form:

#### Basic Usage

```html
[yatra_booking_form]
```

#### Advanced Usage

```html
[yatra_booking_form
    tour_id="123"
    hotel_id="456"
    room_type="deluxe"
    checkin="2024-06-01"
    checkout="2024-06-03"
    guests="2"
    show_summary="true"
    show_payment="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tour_id` | none | Tour ID for tour booking |
| `hotel_id` | none | Hotel ID for hotel booking |
| `room_type` | all | Room type filter |
| `checkin` | today | Default check-in date |
| `checkout` | tomorrow | Default check-out date |
| `guests` | 1 | Default number of guests |
| `show_summary` | true | Show booking summary |
| `show_payment` | true | Show payment options |

### Booking Summary Shortcode

Display booking summary:

#### Basic Usage

```html
[yatra_booking_summary]
```

#### Advanced Usage

```html
[yatra_booking_summary
    booking_id="789"
    show_details="true"
    show_payment="true"
    show_status="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `booking_id` | current | Booking ID |
| `show_details` | true | Show booking details |
| `show_payment` | true | Show payment information |
| `show_status` | true | Show booking status |

## Calendar Shortcodes

### Availability Calendar Shortcode

Display availability calendar:

#### Basic Usage

```html
[yatra_availability tour_id="123"]
```

#### Advanced Usage

```html
[yatra_availability
    tour_id="123"
    month="2024-06"
    show_legend="true"
    show_prices="true"
    clickable="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tour_id` | required | Tour ID |
| `hotel_id` | none | Hotel ID |
| `room_type` | all | Room type |
| `month` | current | Month to display |
| `show_legend` | true | Show availability legend |
| `show_prices` | true | Show prices on calendar |
| `clickable` | true | Enable date selection |

### Booking Calendar Shortcode

Display booking calendar:

#### Basic Usage

```html
[yatra_calendar]
```

#### Advanced Usage

```html
[yatra_calendar
    type="tour"
    id="123"
    view="month"
    min_date="today"
    max_date="2024-12-31"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `type` | tour | Calendar type (tour/hotel) |
| `id` | none | Tour or Hotel ID |
| `view` | month | Calendar view (month/week/day) |
| `min_date` | today | Minimum selectable date |
| `max_date` | none | Maximum selectable date |

## Account Shortcodes

### Account Dashboard Shortcode

Display customer account dashboard:

#### Basic Usage

```html
[yatra_account]
```

#### Advanced Usage

```html
[yatra_account
    show_bookings="true"
    show_profile="true"
    show_payments="true"
    show_wishlist="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `show_bookings` | true | Show booking history |
| `show_profile` | true | Show profile information |
| `show_payments` | true | Show payment history |
| `show_wishlist` | true | Show wishlist items |

### Login/Register Shortcode

Display login and registration forms:

#### Basic Usage

```html
[yatra_login]
```

#### Advanced Usage

```html
[yatra_login
    show_register="true"
    redirect_url="/account"
    social_login="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `show_register` | true | Show registration form |
| `redirect_url` | none | Redirect URL after login |
| `social_login` | false | Enable social login |

## Search and Filter Shortcodes

### Advanced Search Shortcode

Display advanced search form:

#### Basic Usage

```html
[yatra_search]
```

#### Advanced Usage

```html
[yatra_search
    type="tour"
    show_filters="true"
    show_map="true"
    auto_search="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `type` | tour | Search type (tour/hotel) |
| `show_filters` | true | Show filter options |
| `show_map` | false | Show map integration |
| `auto_search` | false | Auto-search on type |

### Filter Shortcode

Display filter options:

#### Basic Usage

```html
[yatra_filters]
```

#### Advanced Usage

```html
[yatra_filters
    type="tour"
    category="true"
    price="true"
    duration="true"
    difficulty="true"]
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `type` | tour | Filter type (tour/hotel) |
| `category` | true | Show category filter |
| `price` | true | Show price filter |
| `duration` | true | Show duration filter |
| `difficulty` | true | Show difficulty filter |

## Customization

### Template Customization

#### Override Templates

Create custom templates in your theme:

```php
// Override tour listing template
your-theme/yatra/tours/tour-list.php

// Override booking form template
your-theme/yatra/booking/booking-form.php

// Override search template
your-theme/yatra/search/search-form.php
```

#### Template Hierarchy

Yatra uses this template hierarchy:

```
yatra/
├── tours/
│   ├── tour-list.php
│   ├── tour-single.php
│   └── tour-search.php
├── hotels/
│   ├── hotel-list.php
│   ├── hotel-single.php
│   └── hotel-search.php
├── booking/
│   ├── booking-form.php
│   ├── booking-summary.php
│   └── booking-success.php
└── account/
    ├── account-dashboard.php
    ├── login-form.php
    └── register-form.php
```

### CSS Customization

#### Custom CSS Classes

Add custom CSS to style shortcodes:

```css
/* Tour listing styles */
.yatra-tour-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.yatra-tour-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

/* Booking form styles */
.yatra-booking-form {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
}

.yatra-form-field {
    margin-bottom: 15px;
}
```

#### Responsive Design

```css
/* Mobile responsive */
@media (max-width: 768px) {
    .yatra-tour-list {
        grid-template-columns: repeat(1, 1fr);
    }
    
    .yatra-booking-form {
        padding: 15px;
    }
}
```

## Integration

### Page Builder Integration

#### Elementor Integration

Use shortcodes in Elementor:

1. **Add Shortcode Widget** to Elementor
2. **Enter shortcode** in widget settings
3. **Configure** shortcode parameters
4. **Style** the shortcode output

#### Gutenberg Integration

Use shortcodes in Gutenberg:

1. **Add Shortcode Block** to page
2. **Enter shortcode** in block settings
3. **Configure** parameters
4. **Preview** the output

### Theme Integration

#### Theme Templates

Add shortcodes to theme templates:

```php
// In theme template file
echo do_shortcode('[yatra_tours limit="6" columns="3"]');
```

#### Custom Page Templates

Create custom page templates:

```php
<?php
/*
Template Name: Tour Listing Page
*/

get_header();
?>

<div class="tour-listing">
    <?php echo do_shortcode('[yatra_tours limit="12" columns="4"]'); ?>
</div>

<?php get_footer(); ?>
```

## Performance Optimization

### Caching

#### Shortcode Caching

Enable shortcode caching:

```php
// Cache shortcode output
add_shortcode('yatra_tours_cached', function($atts) {
    $cache_key = md5(serialize($atts));
    $cached_output = get_transient($cache_key);
    
    if ($cached_output === false) {
        $cached_output = do_shortcode('[yatra_tours ' . http_build_query($atts) . ']');
        set_transient($cache_key, $cached_output, 3600); // 1 hour cache
    }
    
    return $cached_output;
});
```

#### Database Optimization

Optimize database queries:

```php
// Optimize tour queries
function optimize_yatra_tours_query($query) {
    if (is_shortcode('yatra_tours')) {
        $query->set('posts_per_page', -1);
        $query->set('no_found_rows', true);
    }
    return $query;
}
add_action('pre_get_posts', 'optimize_yatra_tours_query');
```

## Troubleshooting

### Common Issues

#### Shortcode Not Working

**Check shortcode syntax**:
- Verify correct shortcode name
- Check parameter syntax
- Ensure proper closing brackets

**Check plugin activation**:
- Verify Yatra is activated
- Check for plugin conflicts
- Test with default theme

#### Display Issues

**CSS conflicts**:
- Check theme CSS conflicts
- Test with default theme
- Add custom CSS

**JavaScript conflicts**:
- Check for JavaScript errors
- Test with plugins disabled
- Check jQuery conflicts

### Debug Mode

Enable shortcode debugging:

```php
// Enable shortcode debugging
define('YATRA_DEBUG_SHORTCODES', true);

// Log shortcode usage
function log_yatra_shortcodes($atts, $content, $tag) {
    error_log("Yatra Shortcode: $tag with attributes: " . print_r($atts, true));
    return '';
}
add_action('yatra_shortcode_debug', 'log_yatra_shortcodes');
```

## Best Practices

### Shortcode Usage

- **Use descriptive parameters**: Use clear parameter names
- **Provide defaults**: Set sensible default values
- **Validate input**: Validate and sanitize parameters
- **Cache output**: Cache expensive operations

### Performance

- **Limit database queries**: Optimize database queries
- **Use caching**: Cache shortcode output
- **Minimize HTTP requests**: Optimize assets
- **Lazy load**: Lazy load images and content

### Security

- **Sanitize input**: Sanitize all user input
- **Validate parameters**: Validate shortcode parameters
- **Escape output**: Escape all output
- **Use nonces**: Use nonces for forms

## Next Steps

After mastering shortcodes:

1. **[Hooks & Filters](/guide/hooks-filters)** - Customize with hooks
2. **[API Reference](/guide/api-reference)** - Developer documentation
3. **[FAQs](/guide/faqs)** - Find answers to common questions
4. **[Troubleshooting](/guide/troubleshooting)** - Resolve issues

---

**Pro Tip**: Test shortcodes in a development environment before using them on your live site. Use caching for frequently accessed shortcodes to improve performance.
