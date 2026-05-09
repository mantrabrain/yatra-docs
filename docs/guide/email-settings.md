---
title: Email Settings
description: Configure email notifications and templates in Yatra
prev: /guide/payment-settings
next: /guide/tour-booking
---

# Email Settings

This guide covers email notification configuration and template customization in Yatra.

## Accessing Email Settings

1. **Navigate to** **Yatra → Settings → Email**
2. **Configure** each section as described below

## Email Configuration

### Email Delivery Method

Configure how emails are sent:

- **WordPress Default**: Use WordPress mail function
- **SMTP**: Use external SMTP server
- **SendGrid**: Use SendGrid API
- **Mailgun**: Use Mailgun API

### SMTP Configuration

Set up SMTP for reliable email delivery:

#### Basic SMTP Settings
- **SMTP Host**: smtp.gmail.com
- **SMTP Port**: 587 (TLS) or 465 (SSL)
- **SMTP Username**: your-email@gmail.com
- **SMTP Password**: Your app password
- **Encryption**: TLS or SSL

#### Gmail SMTP Setup
1. **Enable 2-factor authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate new app password
3. **Use App Password** in SMTP settings

### SendGrid Configuration

Configure SendGrid for bulk email:

1. **Get SendGrid API Key**:
   - Sign up at SendGrid.com
   - Generate API key
   - Set permissions to "Mail Send"

2. **Configure in Yatra**:
   - **API Key**: Your SendGrid API key
   - **From Email**: noreply@yoursite.com
   - **From Name**: Your Business Name

## Email Templates

### Booking Confirmation

Configure booking confirmation email:

#### Template Content
- **Subject**: "Booking Confirmation - {tour_name}"
- **Content**: 
  ```html
  Dear {customer_name},
  
  Thank you for booking {tour_name}!
  
  Booking Details:
  - Tour: {tour_name}
  - Date: {booking_date}
  - Travelers: {traveler_count}
  - Total: {total_price}
  
  We look forward to seeing you!
  
  Best regards,
  {site_name}
  ```

#### Available Variables
- `{customer_name}`: Customer's full name
- `{tour_name}`: Tour title
- `{booking_date}`: Booking date
- `{traveler_count}`: Number of travelers
- `{total_price}`: Total booking price
- `{site_name}`: Your website name

### Payment Confirmation

Configure payment confirmation email:

#### Template Content
- **Subject**: "Payment Received - {tour_name}"
- **Content**:
  ```html
  Dear {customer_name},
  
  We've received your payment for {tour_name}.
  
  Payment Details:
  - Amount: {payment_amount}
  - Method: {payment_method}
  - Date: {payment_date}
  - Transaction ID: {transaction_id}
  
  Your booking is now confirmed!
  
  Thank you for your business.
  ```

### Booking Reminder

Configure pre-tour reminder email:

#### Template Content
- **Subject**: "Upcoming Tour Reminder - {tour_name}"
- **Content**:
  ```html
  Dear {customer_name},
  
  This is a friendly reminder about your upcoming tour:
  
  {tour_name}
  Date: {booking_date}
  Time: {tour_time}
  Meeting Point: {meeting_point}
  
  What to bring:
  - Comfortable walking shoes
  - Weather-appropriate clothing
  - Camera
  - Water bottle
  
  We can't wait to see you!
  ```

### Cancellation Notice

Configure cancellation notification:

#### Template Content
- **Subject**: "Booking Cancellation - {tour_name}"
- **Content**:
  ```html
  Dear {customer_name},
  
  Your booking for {tour_name} has been cancelled.
  
  Cancellation Details:
  - Booking ID: {booking_id}
  - Tour: {tour_name}
  - Date: {booking_date}
  - Refund Amount: {refund_amount}
  
  Refund will be processed within 5-7 business days.
  
  We hope to see you on another tour soon!
  ```

## Email Triggers

### Automatic Email Events

Configure when emails are sent:

#### Booking Events
- **Booking Created**: Send confirmation email
- **Payment Received**: Send payment confirmation
- **Booking Confirmed**: Send final confirmation
- **Booking Cancelled**: Send cancellation notice

#### Reminder Events
- **Pre-Tour Reminder**: Send 24 hours before tour
- **Post-Tour Follow-up**: Send 24 hours after tour
- **Review Request**: Send 3 days after tour

#### Admin Notifications
- **New Booking**: Notify admin of new booking
- **Payment Issues**: Notify of payment problems
- **Cancellation**: Notify of booking cancellation

## Advanced Email Settings

### Email Queue

Configure email processing:

- **Queue Processing**: Process emails in batches
- **Batch Size**: 50 emails per batch
- **Retry Failed Emails**: Retry failed emails 3 times
- **Email Logging**: Log all email attempts

### Email Testing

Test email configuration:

1. **Navigate to** **Yatra → Tools**
2. **Click** **Test Email**
3. **Enter** test email address
4. **Send** test email
5. **Check** inbox for delivery

### Email Analytics

Monitor email performance:

- **Delivery Rate**: Percentage of successful deliveries
- **Open Rate**: Percentage of opened emails
- **Click Rate**: Percentage of clicked links
- **Bounce Rate**: Percentage of bounced emails

## Troubleshooting

### Common Email Issues

#### Emails Not Sending

**Check SMTP Configuration**:
- Verify SMTP settings are correct
- Test SMTP connection
- Check firewall settings

**Check WordPress Mail**:
- Verify WordPress can send emails
- Test with WordPress email plugins
- Check server mail configuration

#### Emails Going to Spam

**Improve Deliverability**:
- Use authenticated SMTP
- Set up SPF/DKIM records
- Avoid spam trigger words
- Use proper email headers

#### Template Variables Not Working

**Check Variable Syntax**:
- Use correct variable format: `{variable_name}`
- Verify variables are available
- Test with sample data

### Debug Mode

Enable email debugging:

1. **Navigate to** **Yatra → Settings → Advanced**
2. **Enable Debug Mode**: Yes
3. **Log Level**: Detailed
4. **Email Logging**: Enable
5. **Save Changes**

## Best Practices

### Email Design

- **Mobile-friendly**: Responsive email design
- **Clear subject lines**: Descriptive and engaging
- **Personalization**: Use customer names
- **Call to action**: Clear next steps

### Content Guidelines

- **Keep it concise**: Short, focused content
- **Use formatting**: Headers, bullets, bold text
- **Include branding**: Logo and consistent styling
- **Add contact info**: How to reach you

### Deliverability

- **Use double opt-in**: Confirm email addresses
- **Maintain clean list**: Remove bounced emails
- **Monitor complaints**: Handle spam complaints
- **Follow regulations**: GDPR, CAN-SPAM compliance

## Integration

### Email Service Providers

#### Mailchimp Integration
1. **Install** Mailchimp for WordPress plugin
2. **Connect** Mailchimp account
3. **Create** email lists
4. **Sync** customer data

#### Constant Contact
1. **Install** Constant Contact plugin
2. **Authenticate** account
3. **Create** contact lists
4. **Import** customer data

### CRM Integration

#### HubSpot
1. **Install** HubSpot plugin
2. **Connect** HubSpot account
3. **Map** contact fields
4. **Sync** booking data

#### Salesforce
1. **Install** Salesforce plugin
2. **Configure** API connection
3. **Create** custom objects
4. **Map** booking fields

## Next Steps

After configuring email settings:

1. **[Tour Booking](/guide/tour-booking)** - Create your tours
2. **[Hotel Booking](/guide/hotel-booking)** - Set up hotel rooms
3. **[WooCommerce Integration](/guide/woocommerce-integration)** - Connect with e-commerce
4. **[FAQs](/guide/faqs)** - Find answers to common questions

---

**Pro Tip**: Test all email templates with real bookings to ensure they work correctly. Monitor email deliverability and adjust settings as needed.
