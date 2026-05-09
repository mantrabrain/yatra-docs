---
title: Booking Settings
description: Configure booking settings and options
---

# Booking Settings

This guide covers all booking-related settings in Yatra, from basic configuration to advanced booking rules.

## Accessing Booking Settings

1. **Navigate to** **Yatra → Settings → Booking**
2. **Configure** each section as described below

## General Booking Settings

### Booking Mode

Configure how bookings work on your site:

- **Enable Booking**: Turn booking system on/off
- **Require Login**: Force users to register before booking
- **Guest Booking**: Allow bookings without account creation
- **Instant Confirmation**: Automatically confirm bookings
- **Manual Approval**: Require admin approval for bookings

### Booking Form Settings

Control the booking form behavior:

- **Multi-step Form**: Split booking into multiple steps
- **Show Progress Bar**: Display booking progress
- **Auto-save Form**: Save form data automatically
- **Form Validation**: Require all fields before submission

## Availability Settings

### Default Availability

Set up default availability rules:

```php
// Example availability configuration
Default Tour Duration: 1 day
Maximum Booking Window: 365 days
Minimum Booking Notice: 24 hours
Maximum Booking Notice: 30 days
```

### Calendar Settings

Configure how availability calendars work:

- **Calendar View**: Monthly, Weekly, or Daily view
- **First Day of Week**: Sunday or Monday
- **Show Unavailable Dates**: Display blocked dates
- **Highlight Available Dates**: Emphasize open dates

### Capacity Management

Control booking limits:

- **Default Maximum Travelers**: 20
- **Default Minimum Travelers**: 1
- **Enable Waitlist**: Allow booking when full
- **Overbooking Prevention**: Stop bookings at capacity

## Pricing Settings

### Currency Configuration

Set up currency and pricing:

- **Currency**: USD, EUR, GBP, etc.
- **Currency Position**: Before or after amount
- **Decimal Separator**: . or ,
- **Thousands Separator**: , or space
- **Number of Decimals**: 0, 2, or 3

### Pricing Display

Control how prices are shown:

- **Show Price Per Person**: Display individual pricing
- **Show Total Price**: Display group pricing
- **Show Sale Price**: Highlight discounts
- **Show Tax Information**: Include tax details
- **Price Format**: $1,234.56 or $1234.56

### Tax Settings

Configure tax calculation:

- **Enable Tax**: Turn tax calculation on/off
- **Tax Rate**: Percentage or fixed amount
- **Tax Inclusive**: Include tax in displayed prices
- **Tax Per Item**: Calculate tax per booking item

## Booking Rules

### Time Restrictions

Set booking time limits:

- **Cut-off Time**: Hours before booking closes
- **Advance Booking**: Days required before booking
- **Same Day Booking**: Allow bookings for today
- **Last Minute Booking**: Allow bookings within 24 hours

### Date Restrictions

Control booking dates:

- **Booking Start Date**: Earliest date for bookings
- **Booking End Date**: Latest date for bookings
- **Blackout Dates**: Block specific dates
- **Seasonal Pricing**: Different prices by season

### Group Restrictions

Set group booking rules:

- **Minimum Group Size**: Smallest allowed group
- **Maximum Group Size**: Largest allowed group
- **Group Discount**: Discount for larger groups
- **Private Tours**: Option for private bookings

## Payment Settings

### Payment Collection

Configure payment collection:

- **Require Payment**: Force payment at booking
- **Partial Payment**: Allow deposit payments
- **Deposit Amount**: Fixed or percentage
- **Payment Deadline**: Time to complete payment

### Payment Methods

Enable payment options:

- **Online Payments**: Credit card, PayPal, etc.
- **Offline Payments**: Bank transfer, cash
- **Payment on Arrival**: Pay when arriving
- **Multiple Payments**: Split payments

### Refund Policy

Set refund rules:

- **Enable Refunds**: Allow booking cancellations
- **Refund Period**: Days allowed for refund
- **Refund Amount**: Full or partial refund
- **Cancellation Fee**: Fee for cancellations

## Notification Settings

### Customer Notifications

Configure customer emails:

- **Booking Confirmation**: Send when booking confirmed
- **Payment Confirmation**: Send when payment received
- **Booking Reminder**: Send before tour date
- **Cancellation Notice**: Send when booking cancelled

### Admin Notifications

Set up admin alerts:

- **New Booking Alert**: Email for new bookings
- **Payment Alert**: Email for payment received
- **Cancellation Alert**: Email for cancellations
- **Daily Summary**: Daily booking report

### SMS Notifications

Enable text messages:

- **SMS Provider**: Twilio, etc.
- **SMS Templates**: Message templates
- **SMS Triggers**: When to send SMS
- **SMS Limits**: Daily/monthly limits

## Advanced Settings

### Booking Workflow

Configure booking process:

```php
// Booking workflow steps
1. Select Tour/Hotel
2. Choose Date & Time
3. Select Number of Travelers
4. Fill Booking Form
5. Review Booking
6. Make Payment
7. Receive Confirmation
```

### Custom Fields

Add custom booking fields:

- **Traveler Information**: Name, age, nationality
- **Special Requirements**: Dietary, accessibility
- **Emergency Contact**: Name, phone, relationship
- **Custom Questions**: Your specific questions

### Booking Modifications

Allow booking changes:

- **Date Changes**: Permit date modifications
- **Traveler Changes**: Allow traveler updates
- **Cancellation**: Enable booking cancellation
- **Modification Fees**: Charge for changes

## Integration Settings

### Calendar Integration

Sync with external calendars:

- **Google Calendar**: Sync availability
- **Outlook Calendar**: Import/export events
- **Apple Calendar**: iCal support
- **Calendar Sync Frequency**: How often to sync

### Third-party Integrations

Connect with other services:

- **CRM Integration**: Sync customer data
- **Email Marketing**: Add to mailing lists
- **Analytics**: Track booking conversions
- **Accounting**: Export financial data

## Troubleshooting

### Common Booking Issues

**Booking Not Working**: Check booking settings are enabled
**Dates Not Available**: Verify availability configuration
**Payment Failing**: Check payment gateway settings
**Emails Not Sending**: Verify email configuration

### Debug Mode

Enable debugging for troubleshooting:

1. **Navigate to** **Yatra → Settings → Advanced**
2. **Enable Debug Mode**: Yes
3. **Log Level**: Detailed
4. **Save Changes**

### Reset Settings

Reset booking settings to defaults:

1. **Navigate to** **Yatra → Tools**
2. **Reset Booking Settings**: Click to reset
3. **Confirm**: Reset all booking settings

## Best Practices

### Booking Configuration

- **Test booking flow** before going live
- **Set realistic capacity limits** for your tours
- **Configure proper time zones** for accurate scheduling
- **Enable notifications** for better customer service

### Customer Experience

- **Keep booking form simple** and user-friendly
- **Provide clear pricing information** upfront
- **Send timely confirmations** and reminders
- **Offer multiple payment options** for convenience

### Business Operations

- **Monitor booking capacity** regularly
- **Set up proper accounting** for financial tracking
- **Maintain accurate availability** calendars
- **Review booking analytics** for insights

## Next Steps

After configuring booking settings:

1. **[Payment Settings](payment-settings)** - Configure payment gateways
2. **[Email Settings](email-settings)** - Set up notifications
3. **[Tour Booking](tour-booking)** - Create your tours
4. **[Hotel Booking](hotel-booking)** - Set up hotel rooms

---

**Pro Tip**: Start with basic booking settings and gradually enable advanced features as you get comfortable with the system. Test the complete booking flow before making it live to customers.
