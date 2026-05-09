---
title: WooCommerce Integration
description: Integrate Yatra with WooCommerce for enhanced e-commerce
---

# WooCommerce Integration

This comprehensive guide covers integrating Yatra with WooCommerce for enhanced e-commerce functionality.

## Integration Overview

Yatra's WooCommerce integration allows you to leverage WooCommerce's powerful e-commerce features for tour and hotel bookings.

### Benefits of Integration

- **Advanced Payment Options**: All WooCommerce payment gateways
- **Order Management**: WooCommerce order system
- **Customer Accounts**: WooCommerce customer management
- **Product Catalog**: WooCommerce product listings
- **Coupon System**: WooCommerce discount codes
- **Shipping Options**: Physical product shipping
- **Tax Management**: WooCommerce tax calculations

## Prerequisites

### Requirements

Before integrating with WooCommerce, ensure you have:

- **WordPress 6.0+**: Latest WordPress version
- **WooCommerce 8.0+**: Latest WooCommerce version
- **Yatra Plugin**: Installed and activated
- **PHP 7.4+**: Compatible PHP version
- **SSL Certificate**: For secure payments

### Installation

1. **Install WooCommerce**:
   - Navigate to **Plugins → Add New**
   - Search for "WooCommerce"
   - Click **Install Now** and **Activate**

2. **Complete WooCommerce Setup**:
   - Run the WooCommerce setup wizard
   - Configure store details
   - Set up payment methods
   - Configure shipping options

## Integration Setup

### Enable Integration

1. **Navigate to** **Yatra → Settings → Integration**
2. **Enable WooCommerce Integration**: Yes
3. **Save Changes**

### Product Mapping

Configure how Yatra items map to WooCommerce products:

#### Tour Products
- **Product Type**: Simple Product
- **Virtual Product**: Yes (no shipping)
- **Downloadable**: No
- **Price**: From Yatra pricing
- **Inventory**: Managed by Yatra

#### Hotel Products
- **Product Type**: Variable Product
- **Virtual Product**: Yes
- **Downloadable**: No
- **Price**: Room rates
- **Inventory**: Room availability

### Order Synchronization

Configure order data sync:

#### Order Creation
- **Create WooCommerce Order**: Yes
- **Sync Booking Data**: Yes
- **Customer Sync**: Yes
- **Payment Sync**: Yes

#### Order Status
- **Pending Payment**: Booking pending
- **Processing**: Booking confirmed
- **Completed**: Booking completed
- **Cancelled**: Booking cancelled
- **Refunded**: Booking refunded

## Product Configuration

### Tour Products

#### Automatic Product Creation

1. **Navigate to** **Yatra → Tours**
2. **Edit** an existing tour
3. **WooCommerce Tab**: Configure product settings
4. **Enable WooCommerce Product**: Yes

#### Manual Product Creation

1. **Navigate to** **WooCommerce → Products → Add New**
2. **Product Name**: Tour title
3. **Product Description**: Tour description
4. **Product Type**: Simple Product
5. **Virtual Product**: Yes
6. **Price**: Tour price
7. **Yatra Integration**: Link to Yatra tour

### Hotel Products

#### Room Type Products

1. **Navigate to** **WooCommerce → Products → Add New**
2. **Product Name**: Hotel Room Type
3. **Product Type**: Variable Product
4. **Virtual Product**: Yes
5. **Attributes**: Room type, occupancy
6. **Variations**: Different room configurations

#### Room Availability

Configure room availability:
- **Stock Management**: Enable
- **Stock Quantity**: Number of rooms
- **Allow Backorders**: No
- **Stock Status**: In stock/Out of stock

## Payment Integration

### Payment Gateway Configuration

#### Existing Payment Methods

All WooCommerce payment gateways work with Yatra:

- **Stripe**: Credit card payments
- **PayPal**: PayPal and credit cards
- **Square**: Square payments
- **Authorize.net**: Credit card processing
- **Bank Transfer**: Manual bank transfers

#### Payment Flow

1. **Customer Selection**: Customer chooses tour/hotel
2. **Add to Cart**: Item added to WooCommerce cart
3. **Checkout**: WooCommerce checkout process
4. **Payment**: WooCommerce payment processing
5. **Order Creation**: WooCommerce order created
6. **Booking Confirmation**: Yatra booking created

### Payment Processing

#### Order Status Flow

1. **Pending Payment**: Awaiting payment
2. **Processing**: Payment received
3. **Booking Confirmed**: Yatra booking created
4. **Completed**: Service delivered
5. **Cancelled**: Booking cancelled

#### Refund Processing

1. **Refund Request**: Customer requests refund
2. **Refund Action**: Process refund in WooCommerce
3. **Booking Cancellation**: Cancel Yatra booking
4. **Refund Confirmation**: Refund processed

## Customer Management

### Customer Accounts

#### Account Creation

- **Automatic Account**: Created during checkout
- **Guest Checkout**: Option for guest purchases
- **Account Sync**: Sync with Yatra customer data
- **Profile Management**: WooCommerce account pages

#### Customer Data

- **Personal Information**: Name, email, phone
- **Billing Address**: Billing information
- **Shipping Address**: Not used for virtual products
- **Order History**: All bookings and purchases
- **Wishlist**: Saved tours and hotels

### Customer Experience

#### My Account Dashboard

- **Bookings**: View current and past bookings
- **Orders**: View WooCommerce orders
- **Profile**: Update personal information
- **Addresses**: Manage billing addresses
- **Downloads**: Downloadable products (if any)

#### Email Notifications

- **Order Confirmation**: WooCommerce order emails
- **Booking Confirmation**: Yatra booking emails
- **Payment Receipt**: Payment confirmation
- **Shipping Updates**: Not applicable for virtual products

## Catalog Management

### Product Listings

#### Tour Catalog

1. **Product Category**: Create "Tours" category
2. **Product Tags**: Tour types, destinations
3. **Product Images**: Tour photos
4. **Product Description**: Detailed tour information
5. **Product Attributes**: Duration, difficulty, group size

#### Hotel Catalog

1. **Product Category**: Create "Hotels" category
2. **Product Tags**: Hotel amenities, location
3. **Product Images**: Hotel and room photos
4. **Product Description**: Hotel information
5. **Product Attributes**: Star rating, facilities

### Search and Filtering

#### Product Search

- **Product Search**: WooCommerce product search
- **Category Filtering**: Filter by tour/hotel type
- **Attribute Filtering**: Filter by attributes
- **Price Filtering**: Filter by price range

#### Product Display

- **Shop Page**: Main product listing
- **Category Pages**: Category-specific listings
- **Product Pages**: Individual product details
- **Search Results**: Search result pages

## Pricing and Inventory

### Dynamic Pricing

#### Tour Pricing

- **Base Price**: Standard tour price
- **Variable Pricing**: Different prices for different dates
- **Group Pricing**: Discounts for larger groups
- **Seasonal Pricing**: Peak/off-peak pricing

#### Hotel Pricing

- **Room Rates**: Per night room pricing
- **Occupancy Pricing**: Per person pricing
- **Length of Stay**: Discounts for longer stays
- **Seasonal Rates**: Peak/off-peak rates

### Inventory Management

#### Tour Inventory

- **Available Spots**: Number of available spots
- **Waitlist**: Waitlist for full tours
- **Booking Limits**: Maximum bookings per tour
- **Real-time Sync**: Sync with Yatra availability

#### Hotel Inventory

- **Room Availability**: Number of available rooms
- **Room Types**: Different room configurations
- **Booking Limits**: Maximum rooms per booking
- **Real-time Sync**: Sync with Yatra availability

## Advanced Features

### Coupon System

#### Discount Codes

- **Percentage Discounts**: % off total
- **Fixed Amount**: $ off total
- **Free Shipping**: Not applicable
- **Product Specific**: Tour/hotel specific discounts

#### Coupon Configuration

1. **Navigate to** **WooCommerce → Marketing → Coupons**
2. **Add New Coupon**
3. **Configure** discount settings
4. **Set Usage Restrictions**: Products, categories, user roles

### Subscription Integration

#### Recurring Bookings

- **Subscription Products**: Create subscription products
- **Recurring Payments**: Automatic recurring payments
- **Subscription Management**: Manage subscriptions
- **Cancellation Handling**: Handle subscription cancellations

#### Membership Integration

- **Membership Products**: Create membership products
- **Member Discounts**: Exclusive member pricing
- **Access Control**: Restrict content to members
- **Tier Management**: Multiple membership tiers

## Reporting and Analytics

### Sales Reports

#### WooCommerce Reports

- **Sales Overview**: Total sales and revenue
- **Sales by Product**: Tour/hotel performance
- **Sales by Category**: Tour vs hotel sales
- **Customer Reports**: Customer purchasing behavior

#### Yatra Reports

- **Booking Reports**: Yatra booking analytics
- **Availability Reports**: Tour/hotel availability
- **Revenue Reports**: Yatra-specific revenue
- **Customer Reports**: Yatra customer analytics

### Custom Reports

#### Combined Analytics

- **Total Revenue**: Combined WooCommerce + Yatra
- **Conversion Rates**: Booking conversion analytics
- **Customer Lifetime Value**: Customer value over time
- **Channel Performance**: Sales by marketing channel

## Troubleshooting

### Common Issues

#### Integration Problems

- **Products Not Syncing**: Check integration settings
- **Orders Not Creating**: Verify order sync settings
- **Payment Issues**: Check payment gateway configuration
- **Inventory Not Updating**: Verify inventory sync

#### Configuration Issues

- **Product Mapping**: Verify product settings
- **Tax Configuration**: Check tax settings
- **Shipping Settings**: Verify virtual product settings
- **Customer Sync**: Check customer data sync

### Debug Mode

Enable integration debugging:

1. **Navigate to** **Yatra → Settings → Advanced**
2. **Enable Debug Mode**: Yes
3. **Log Level**: Detailed
4. **Integration Logs**: Enable integration logging

## Best Practices

### Integration Setup

- **Test thoroughly** before going live
- **Use staging environment** for testing
- **Backup data** before enabling integration
- **Monitor performance** after integration

### Product Management

- **Maintain consistent pricing** across platforms
- **Keep inventory accurate** and up-to-date
- **Use high-quality images** for products
- **Write detailed descriptions** for all products

### Customer Experience

- **Provide clear instructions** for booking process
- **Offer multiple payment options** for convenience
- **Send timely confirmations** and updates
- **Handle customer service** promptly

## Next Steps

After WooCommerce integration:

1. **[Elementor Integration](elementor-integration)** - Design custom layouts
2. **[Email Settings](email-settings)** - Configure notifications
3. **[FAQs](faqs)** - Find answers to common questions
4. **[Troubleshooting](troubleshooting)** - Resolve issues

---

**Pro Tip**: Start with a few products to test the integration before scaling up. Monitor performance and customer feedback to optimize the integration.
