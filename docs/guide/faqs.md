---
title: FAQs
description: Frequently asked questions about Yatra WordPress travel booking plugin
prev: /guide/api-reference
next: /guide/troubleshooting
---

# Frequently Asked Questions

This section contains answers to the most common questions about Yatra WordPress travel booking plugin.

## General Questions

### What is Yatra?

Yatra is a comprehensive WordPress travel booking plugin that allows you to create and manage tours, hotels, and other travel-related bookings. It provides a complete booking system with payment integration, availability management, and customer management.

### Is Yatra free?

Yatra has a free version with core features and a premium version (Yatra Pro) with advanced features. The free version includes basic tour and hotel booking functionality, while the premium version adds advanced features like dynamic pricing, advanced reporting, and third-party integrations.

### What are the system requirements?

Yatra requires:
- WordPress 6.0 or higher
- PHP 7.4 or higher (recommend 8.0+)
- MySQL 5.6 or higher
- Memory limit: 128MB or higher
- SSL certificate (recommended for payments)

### Can I use Yatra with any WordPress theme?

Yes, Yatra is compatible with most WordPress themes. However, some themes may require additional CSS adjustments for optimal display. Yatra includes compatibility modules for popular themes like Elementor, Wanderland, and others.

## Installation and Setup

### How do I install Yatra?

1. **From WordPress Repository**:
   - Go to **Plugins → Add New**
   - Search for "Yatra"
   - Click **Install Now** and **Activate**

2. **Manual Installation**:
   - Download Yatra from WordPress.org
   - Upload to `/wp-content/plugins/yatra/`
   - Activate from Plugins page

### What happens after activation?

After activation, Yatra will:
- Create necessary database tables
- Set up default settings
- Create sample data (optional)
- Display setup wizard (optional)

### Do I need to configure anything after installation?

Yatra works out of the box with default settings, but you should configure:
- **Payment settings** to accept payments
- **Email settings** for notifications
- **Booking settings** for your business rules
- **Tax settings** if applicable

## Tours and Activities

### How do I create a tour?

1. **Navigate to** **Yatra → Tours**
2. **Click** **Add New Tour**
3. **Enter** tour information:
   - Title and description
   - Pricing and duration
   - Group size limits
   - Highlights and includes
4. **Set up** availability calendar
5. **Publish** the tour

### Can I create different tour types?

Yes, Yatra supports various tour types:
- **City Tours**: Urban exploration tours
- **Adventure Tours**: Outdoor and adventure activities
- **Cultural Tours**: Historical and cultural experiences
- **Food Tours**: Culinary experiences
- **Nature Tours**: Wildlife and natural attractions

### How do I set tour pricing?

Yatra offers flexible pricing options:
- **Per Person Pricing**: Price per individual traveler
- **Per Group Pricing**: Fixed price for entire group
- **Seasonal Pricing**: Different prices for different seasons
- **Dynamic Pricing**: Automatic price adjustments

### Can I offer tour packages?

Yes, you can create tour packages:
- **Multi-day packages**: Several days of activities
- **Combination packages**: Multiple tours bundled together
- **All-inclusive packages**: Tours with meals and accommodation
- **Custom packages**: Tailored to customer preferences

## Hotels and Accommodations

### How do I add hotels?

1. **Navigate to** **Yatra → Hotels**
2. **Click** **Add New Hotel**
3. **Enter** hotel information:
   - Name, description, and location
   - Contact information
   - Amenities and facilities
   - Star rating
4. **Add** room types and pricing
5. **Set up** availability calendar

### What room types can I create?

Yatra supports various room types:
- **Standard Rooms**: Basic accommodation
- **Deluxe Rooms**: Enhanced amenities
- **Suites**: Separate living areas
- **Family Rooms**: Accommodate families
- **Accessible Rooms**: Wheelchair accessible

### How do I manage room availability?

Yatra provides:
- **Calendar View**: Visual availability calendar
- **Date Range Selection**: Set available dates
- **Room Limits**: Maximum rooms per night
- **Real-time Updates**: Sync with booking system

## Bookings and Reservations

### How do customers book tours/hotels?

Customers can book through:
- **Tour/Hotel Pages**: Direct booking on product pages
- **Booking Forms**: Custom booking forms
- **Search Results**: Book from search listings
- **Shortcodes**: Embed booking forms anywhere

### Can I accept online payments?

Yes, Yatra supports multiple payment methods:
- **Stripe**: Credit card payments
- **PayPal**: PayPal and credit cards
- **Bank Transfer**: Manual bank transfers
- **Cash on Arrival**: Pay when arriving
- **WooCommerce**: Use WooCommerce payment gateways

### How do I handle booking confirmations?

Yatra automatically:
- **Sends confirmation emails** to customers
- **Notifies administrators** of new bookings
- **Updates availability** calendars
- **Generates booking numbers** for tracking

### Can I set booking rules?

Yes, you can configure:
- **Minimum advance booking**: How far in advance to book
- **Cancellation policies**: Refund rules and deadlines
- **Payment requirements**: Deposit or full payment
- **Group size limits**: Minimum and maximum group sizes

## Pricing and Payments

### How does pricing work?

Yatra supports various pricing models:
- **Fixed Pricing**: Set prices per person or per group
- **Dynamic Pricing**: Automatic price adjustments
- **Seasonal Pricing**: Different prices by season
- **Tiered Pricing**: Different prices for different tiers

### Can I offer discounts?

Yes, Yatra includes discount features:
- **Coupon Codes**: Create discount codes
- **Group Discounts**: Automatic discounts for groups
- **Early Bird Discounts**: Book in advance for less
- **Last Minute Discounts**: Fill remaining spots

### How do taxes work?

Yatra includes tax management:
- **Tax Rates**: Set tax percentages
- **Tax Inclusive/Exclusive**: Include or exclude tax in prices
- **Location-based Tax**: Different taxes by location
- **Tax Reporting**: Tax reporting and analytics

### Can I accept deposits?

Yes, Yatra supports deposit payments:
- **Fixed Deposits**: Set fixed deposit amounts
- **Percentage Deposits**: Percentage of total price
- **Payment Scheduling**: Multiple payment dates
- **Automatic Reminders**: Payment due notifications

## Integration and Compatibility

### Does Yatra work with WooCommerce?

Yes, Yatra integrates with WooCommerce:
- **Product Sync**: Tours as WooCommerce products
- **Payment Integration**: Use WooCommerce payment gateways
- **Order Management**: WooCommerce order system
- **Customer Accounts**: WooCommerce customer management

### Can I use Yatra with Elementor?

Yes, Yatra provides Elementor integration:
- **Custom Widgets**: Yatra-specific Elementor widgets
- **Template Library**: Pre-designed templates
- **Dynamic Content**: Dynamic tour and hotel data
- **Visual Builder**: Drag-and-drop interface

### Does Yatra work with page builders?

Yatra is compatible with popular page builders:
- **Elementor**: Full integration with custom widgets
- **Divi Builder**: Custom modules and templates
- **Beaver Builder**: Integration modules
- **Visual Composer**: Compatibility mode

### Can I use Yatra with membership plugins?

Yes, Yatra works with membership plugins:
- **MemberPress**: Restrict content by membership
- **Restrict Content Pro**: Content restriction
- **Paid Memberships Pro**: Membership levels
- **Ultimate Member**: User registration and profiles

## Customization and Development

### Can I customize the appearance?

Yes, Yatra offers customization options:
- **Theme Integration**: Works with most themes
- **CSS Customization**: Custom CSS support
- **Template Overrides**: Custom template files
- **Hook System**: WordPress hooks and filters

### Are there shortcodes available?

Yes, Yatra provides numerous shortcodes:
- **Tour Display**: `[yatra_tours]`, `[yatra_tour]`
- **Hotel Display**: `[yatra_hotels]`, `[yatra_hotel]`
- **Booking Forms**: `[yatra_booking_form]`
- **Search Forms**: `[yatra_tour_search]`
- **Calendars**: `[yatra_availability]`

### Can I extend functionality?

Yes, Yatra is developer-friendly:
- **API Access**: REST API for integration
- **Hooks and Filters**: Extensive hook system
- **Custom Fields**: Add custom fields
- **Third-party Integration**: Easy integration

### Is there documentation for developers?

Yes, comprehensive documentation:
- **API Reference**: Complete REST API documentation
- **Hook Reference**: All hooks and filters
- **Shortcode Guide**: Shortcode usage examples
- **Developer Guide**: Customization examples

## Support and Troubleshooting

### Where can I get help?

You can get help through:
- **Documentation**: Comprehensive online documentation
- **Support Forum**: Community support forum
- **Email Support**: Direct email support (premium)
- **Knowledge Base**: Articles and tutorials

### What if I encounter issues?

Common troubleshooting steps:
1. **Check Requirements**: Ensure system requirements are met
2. **Plugin Conflicts**: Test with other plugins disabled
3. **Theme Compatibility**: Test with default theme
4. **Clear Cache**: Clear WordPress and server cache
5. **Update Everything**: Update WordPress, plugins, and theme

### How do I report bugs?

Report bugs through:
- **GitHub Issues**: Report on GitHub repository
- **Support Forum**: Post in support forum
- **Email Support**: Contact support team
- **Bug Report Form**: Use online bug report form

### Is there video documentation?

Yes, video resources include:
- **Getting Started Videos**: Installation and setup
- **Feature Tutorials**: Feature-specific tutorials
- **Webinar Recordings**: Live webinar recordings
- **YouTube Channel**: Regular video updates

## Premium Features

### What's included in Yatra Pro?

Yatra Pro includes advanced features:
- **Dynamic Pricing**: Automatic price adjustments
- **Advanced Reporting**: Detailed analytics and reports
- **Third-party Integrations**: More integration options
- **Priority Support**: Faster support response
- **Advanced Shortcodes**: More shortcode options

### How do I upgrade to Yatra Pro?

1. **Purchase** Yatra Pro license
2. **Install** Yatra Pro plugin
3. **Activate** the plugin
4. **Enter** license key
5. **Enjoy** premium features

### Can I switch back to free version?

Yes, you can:
- **Deactivate** Yatra Pro
- **Continue** using free version
- **Keep** your data and settings
- **Reactivate** Pro anytime

## Migration and Data

### Can I import data from other plugins?

Yatra supports importing from:
- **CSV Files**: Import tours and hotels from CSV
- **WooCommerce**: Import WooCommerce products
- **Other Booking Plugins**: Limited import options
- **Custom Data**: Custom import scripts

### Can I export my data?

Yes, you can export:
- **Tours and Hotels**: Export to CSV
- **Bookings**: Export booking data
- **Customers**: Export customer information
- **Reports**: Export analytics data

### What happens if I deactivate Yatra?

Your data remains in the database:
- **Tours and Hotels**: Preserved
- **Bookings**: Preserved
- **Settings**: Preserved
- **Media**: Preserved

## Security and Privacy

### Is Yatra secure?

Yes, Yatra includes security features:
- **Input Validation**: All user input validated
- **SQL Injection Protection**: Prepared statements
- **XSS Protection**: Output escaping
- **CSRF Protection**: Token verification

### Does Yatra handle GDPR compliance?

Yatra supports GDPR compliance:
- **Data Portability**: Export user data
- **Right to Erasure**: Delete user data
- **Consent Management**: Manage consent
- **Data Processing**: Transparent data processing

### Are payments secure?

Yes, payment security includes:
- **PCI Compliance**: Secure payment processing
- **SSL Encryption**: Encrypted data transmission
- **Tokenization**: Secure payment tokens
- **Fraud Detection**: Basic fraud prevention

## Performance and Optimization

### How does Yatra perform?

Yatra is optimized for:
- **Speed**: Fast loading times
- **Database**: Efficient database queries
- **Caching**: Built-in caching system
- **Scalability**: Handles high traffic

### Can I optimize performance?

Yes, optimization options:
- **Caching**: Enable WordPress caching
- **CDN**: Use content delivery network
- **Image Optimization**: Optimize images
- **Database Optimization**: Regular database maintenance

### Does Yatra work on shared hosting?

Yes, Yatra works on shared hosting with:
- **Minimum Requirements**: Meets system requirements
- **Performance**: Acceptable performance
- **Scalability**: Handles moderate traffic
- **Support**: Compatible with most hosts

## Multilingual and International

### Does Yatra support multiple languages?

Yes, Yatra supports:
- **WPML**: Full WPML integration
- **Polylang**: Polylang integration
- **Multilingual Press**: Basic support
- **Custom Translations**: Manual translation

### Can I use different currencies?

Yes, currency support includes:
- **Multiple Currencies**: USD, EUR, GBP, etc.
- **Currency Switching**: User currency selection
- **Exchange Rates**: Manual rate updates
- **Currency Formatting**: Localized formatting

### Does Yatra work internationally?

Yes, international support:
- **Time Zones**: Multiple time zone support
- **Date Formats**: Localized date formats
- **Address Formats**: International address formats
- **Phone Formats**: International phone formats

## Mobile and Responsive

### Is Yatra mobile-friendly?

Yes, Yatra is fully responsive:
- **Mobile Design**: Mobile-first design
- **Touch Interface**: Touch-friendly interface
- **Responsive Forms**: Mobile-friendly forms
- **Performance**: Optimized for mobile

### Can customers book on mobile?

Yes, mobile booking includes:
- **Mobile Forms**: Responsive booking forms
- **Mobile Payments**: Mobile payment support
- **Mobile Navigation**: Mobile-friendly navigation
- **Mobile Notifications**: Mobile email notifications

## Updates and Maintenance

### How do I update Yatra?

Update process:
1. **Check** for updates in WordPress admin
2. **Backup** your site before updating
3. **Update** automatically or manually
4. **Test** functionality after update

### Are updates automatic?

Yes, automatic updates:
- **Minor Updates**: Automatic minor updates
- **Major Updates**: Manual major updates
- **Security Updates**: Automatic security patches
- **Feature Updates**: Manual feature updates

### What about backwards compatibility?

Yatra maintains:
- **Data Compatibility**: Data structure compatibility
- **API Compatibility**: API version compatibility
- **Shortcode Compatibility**: Shortcode compatibility
- **Theme Compatibility**: Theme compatibility

## Common Issues

### Tours not showing

**Solutions**:
- Check tour status is "Published"
- Verify availability is set up
- Check category and tag settings
- Clear WordPress cache

### Bookings not working

**Solutions**:
- Check payment gateway settings
- Verify booking form configuration
- Check email settings
- Test with different payment method

### Images not displaying

**Solutions**:
- Check image file permissions
- Verify image URLs
- Clear image cache
- Regenerate thumbnails

### Emails not sending

**Solutions**:
- Check email configuration
- Verify SMTP settings
- Check spam folder
- Test with different email provider

---

**Need More Help?**

If you don't find your answer here, check our:
- **[Troubleshooting Guide](/guide/troubleshooting)** - Common solutions
- **[Support](/guide/support)** - Contact our support team
- **[Documentation](/)** - Complete documentation
- **[Community Forum](https://wpyatra.com/community)** - Community support

**Pro Tip**: Always keep your plugins and WordPress updated to the latest versions for best performance and security.
