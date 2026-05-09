---
title: Payment Settings
description: Configure payment gateways, pricing, and payment processing in Yatra
prev: /guide/booking-settings
next: /guide/tour-booking
---

# Payment Settings

This guide covers all payment-related configurations in Yatra, from setting up payment gateways to managing pricing and refunds.

## Accessing Payment Settings

1. **Navigate to** **Yatra → Settings → Payment**
2. **Configure** each section as described below

## General Payment Configuration

### Payment Collection

Configure how payments are collected:

- **Enable Online Payments**: Turn on payment processing
- **Require Payment**: Force payment at booking time
- **Allow Partial Payments**: Enable deposit options
- **Payment Deadline**: Time limit for completing payment

### Currency Settings

Set up currency and pricing format:

- **Currency**: Select your currency (USD, EUR, GBP, etc.)
- **Currency Position**: Before or after amount
- **Decimal Separator**: . (dot) or , (comma)
- **Thousands Separator**: , (comma) or space
- **Number of Decimals**: 0, 2, or 3 decimal places

### Tax Configuration

Configure tax calculation:

- **Enable Tax**: Turn tax calculation on/off
- **Tax Rate**: Percentage or fixed amount
- **Tax Inclusive**: Include tax in displayed prices
- **Tax Per Item**: Calculate tax per booking item
- **Tax Display**: Show tax breakdown to customers

## Payment Gateways

### PayPal Standard

Set up PayPal for credit card and PayPal payments:

#### Basic Configuration
- **Enable PayPal**: Yes
- **PayPal Email**: your-business@paypal.com
- **PayPal Merchant ID**: Optional for advanced features
- **Sandbox Mode**: Yes (for testing)

#### Advanced Settings
- **Payment Action**: Sale or Authorization
- **Return URL**: Page after successful payment
- **Cancel URL**: Page after cancelled payment
- **IPN URL**: Instant payment notification URL

#### PayPal Setup Process

1. **Create PayPal Business Account**
   - Visit [PayPal.com](https://www.paypal.com)
   - Sign up for Business account
   - Complete verification process

2. **Get API Credentials**
   - Log in to PayPal Business account
   - Go to **Settings → API Access**
   - Create API signature or certificate
   - Note down API credentials

3. **Configure in Yatra**
   - Enter PayPal email address
   - Enable sandbox mode for testing
   - Test with PayPal sandbox account

### Stripe

Set up Stripe for modern payment processing:

#### Basic Configuration
- **Enable Stripe**: Yes
- **Publishable Key**: pk_live_xxx (or pk_test_xxx for sandbox)
- **Secret Key**: sk_live_xxx (or sk_test_xxx for sandbox)
- **Webhook Secret**: whsec_xxx (for webhooks)

#### Stripe Setup Process

1. **Create Stripe Account**
   - Visit [Stripe.com](https://stripe.com)
   - Sign up for account
   - Complete business verification

2. **Get API Keys**
   - Log in to Stripe Dashboard
   - Go to **Developers → API Keys**
   - Copy Publishable and Secret keys
   - Enable test mode for testing

3. **Configure Webhooks**
   - Go to **Developers → Webhooks**
   - Add endpoint: `https://yoursite.com/wp-json/yatra/v1/stripe/webhook`
   - Select events: payment_intent.succeeded, payment_intent.payment_failed

### WooCommerce Payments

Integrate with WooCommerce payment gateways:

#### Configuration
- **Enable WooCommerce Integration**: Yes
- **WooCommerce Product**: Map to WooCommerce product
- **Payment Methods**: Use WooCommerce payment methods
- **Order Management**: Sync with WooCommerce orders

#### Setup Process

1. **Install WooCommerce**
   - Install and activate WooCommerce plugin
   - Complete WooCommerce setup wizard

2. **Configure Payment Methods**
   - Set up payment gateways in WooCommerce
   - Configure shipping and tax settings

3. **Integrate with Yatra**
   - Enable WooCommerce integration in Yatra
   - Map Yatra bookings to WooCommerce products

### Bank Transfer

Set up offline bank transfer payments:

#### Configuration
- **Enable Bank Transfer**: Yes
- **Bank Details**: Account information
- **Instructions**: Payment instructions for customers
- **Auto-confirmation**: Automatically confirm after X days

#### Bank Details Template
```
Bank Name: Your Bank Name
Account Name: Your Business Name
Account Number: 123456789
Routing Number: 123456789
SWIFT/BIC: YOURBANKXXX
Branch: Your Branch Name
```

### Cash on Arrival

Accept payments when customers arrive:

#### Configuration
- **Enable Cash on Arrival**: Yes
- **Payment Instructions**: Where and when to pay
- **Security Deposit**: Require deposit amount
- **Auto-confirmation**: Confirm booking automatically

## Pricing Configuration

### Tour Pricing

Set up pricing for tours:

#### Per Person Pricing
- **Base Price**: $150 per person
- **Child Price**: $75 per child (under 12)
- **Group Discount**: 10% off for 5+ people
- **Seasonal Pricing**: Different prices by season

#### Per Group Pricing
- **Fixed Price**: $1,000 for entire group
- **Maximum Group Size**: 10 people
- **Minimum Group Size**: 2 people
- **Additional Person Fee**: $100 per extra person

### Hotel Pricing

Configure room pricing:

#### Room Types
- **Single Room**: $100 per night
- **Double Room**: $150 per night
- **Suite**: $250 per night
- **Family Room**: $200 per night

#### Pricing Rules
- **Weekend Rates**: +20% on weekends
- **Seasonal Rates**: Different prices by season
- **Length of Stay Discount**: 10% off for 7+ nights
- **Early Bird Discount**: 15% off for 30+ days advance

### Dynamic Pricing

Set up automatic pricing rules:

#### Demand-Based Pricing
- **High Season**: Increase prices by 25%
- **Low Season**: Decrease prices by 15%
- **Last Minute**: 10% discount for bookings within 48 hours
- **Peak Dates**: Higher prices for holidays

#### Availability-Based Pricing
- **Limited Availability**: Increase price when < 3 spots left
- **High Demand**: Increase price when booking rate is high
- **Low Occupancy**: Decrease price to fill remaining spots

## Deposit and Partial Payments

### Deposit Configuration

Set up deposit requirements:

#### Fixed Deposit
- **Deposit Amount**: $100 fixed deposit
- **Remaining Payment**: Due 7 days before tour
- **Auto-charge**: Automatically charge remaining amount

#### Percentage Deposit
- **Deposit Percentage**: 25% of total price
- **Minimum Deposit**: $50 minimum deposit
- **Maximum Deposit**: 50% maximum deposit

### Payment Scheduling

Configure payment timing:

#### Multiple Payments
- **Payment 1**: 25% at booking
- **Payment 2**: 25% 30 days before
- **Payment 3**: 50% 7 days before
- **Final Payment**: Due on arrival

#### Flexible Payments
- **Custom Schedule**: Create custom payment plans
- **Payment Reminders**: Automatic email reminders
- **Late Payment Fees**: Charge for late payments

## Refund Policy

### Refund Configuration

Set up refund rules:

#### Refund Periods
- **Full Refund**: 30+ days before tour
- **Partial Refund**: 14-29 days before tour
- **No Refund**: Less than 14 days before tour
- **Exception Policy**: Medical emergencies, etc.

#### Refund Amounts
- **Full Refund**: 100% refund
- **Partial Refund**: 50% refund
- **Credit**: Future tour credit
- **Processing Fee**: Deduct payment processing fees

### Cancellation Fees

Configure cancellation charges:

#### Fee Structure
- **Admin Fee**: $25 processing fee
- **Percentage Fee**: 10% of total price
- **Time-Based Fee**: Higher fees closer to date
- **No-Show Fee**: 100% charge for no-shows

## Security and Compliance

### PCI Compliance

Ensure payment security:

#### Security Measures
- **SSL Certificate**: Required for all payments
- **Data Encryption**: Encrypt sensitive data
- **Secure Storage**: Store payment data securely
- **Regular Audits**: Security compliance checks

#### Best Practices
- **Never store full credit card numbers**
- **Use tokenization when possible**
- **Keep software updated**
- **Monitor for suspicious activity

### GDPR Compliance

Handle customer data properly:

#### Data Protection
- **Data Minimization**: Collect only necessary data
- **Consent Management**: Get explicit consent
- **Data Retention**: Delete old data appropriately
- **User Rights**: Honor data requests

## Troubleshooting

### Common Payment Issues

#### PayPal Problems
- **IPN Not Working**: Check webhook URL
- **Sandbox Mode**: Ensure test mode enabled
- **Currency Mismatch**: Check currency settings
- **Account Issues**: Verify PayPal account status

#### Stripe Issues
- **Webhook Failures**: Check webhook endpoint
- **API Keys**: Verify keys are correct
- **3D Secure**: Ensure 3D Secure is configured
- **Declined Payments**: Check customer card details

#### General Issues
- **Payment Not Processing**: Check gateway configuration
- **Emails Not Sending**: Verify email settings
- **Booking Not Confirming**: Check auto-confirmation settings
- **Refund Issues**: Verify refund policy settings

### Debug Mode

Enable payment debugging:

1. **Navigate to** **Yatra → Settings → Advanced**
2. **Enable Debug Mode**: Yes
3. **Log Level**: Detailed
4. **Payment Logs**: Enable payment logging

## Best Practices

### Payment Configuration

- **Test thoroughly** before going live
- **Use sandbox mode** for initial testing
- **Set up proper notifications** for payment events
- **Monitor payment success rates**

### Customer Experience

- **Offer multiple payment options** for convenience
- **Provide clear pricing information** upfront
- **Send timely payment reminders** and confirmations
- **Handle payment failures gracefully**

### Business Operations

- **Reconcile payments daily** with bank statements
- **Monitor refund requests** and process promptly
- **Track payment analytics** for insights
- **Keep payment methods updated** and secure

## Next Steps

After configuring payment settings:

1. **[Tour Booking](/guide/tour-booking)** - Create and manage tours
2. **[Hotel Booking](/guide/hotel-booking)** - Set up hotel rooms
3. **[Email Settings](/guide/email-settings)** - Configure notifications
4. **[WooCommerce Integration](/guide/woocommerce-integration)** - Connect with WooCommerce

---

**Pro Tip**: Always test payment gateways in sandbox mode before going live. Monitor payment success rates and have backup payment methods available.
