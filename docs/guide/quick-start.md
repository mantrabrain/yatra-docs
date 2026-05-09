---
title: Quick Start
description: Get your travel booking site up and running in minutes with Yatra
prev: /guide/installation
next: /guide/booking-settings
---

# Quick Start Guide

This quick start guide will help you get your first tour or hotel up and running in just a few minutes.

## Before You Start

Make sure you have:
- ✅ Installed and activated Yatra
- ✅ Completed the initial setup wizard
- ✅ Configured basic settings

## Step 1: Create Your First Tour

### Navigate to Tours Section

1. **Log in** to your WordPress admin dashboard
2. **Navigate to** **Yatra → Tours**
3. **Click** **Add New Tour**

### Basic Tour Information

1. **Tour Title**: Enter a descriptive name
   - Example: "Tokyo City Tour - Full Day Experience"

2. **Tour Description**: Add detailed information
   ```markdown
   Explore the vibrant city of Tokyo with our comprehensive full-day tour. 
   Visit iconic landmarks, experience local culture, and enjoy authentic Japanese cuisine.
   ```

3. **Tour Duration**: Set the tour length
   - **Duration**: 1 day
   - **Duration Type**: Days

### Pricing Configuration

1. **Set Base Price**:
   - **Regular Price**: $150.00
   - **Sale Price**: $129.00 (optional)

2. **Pricing Type**:
   - **Per Person**: Each person pays the full price
   - **Per Group**: Fixed price for the entire group

3. **Group Size Limits**:
   - **Minimum Travelers**: 2
   - **Maximum Travelers**: 12

### Tour Highlights

Add key attractions and features:

1. **Tour Highlights** (comma-separated):
   ```
   Tokyo Tower, Senso-ji Temple, Shibuya Crossing, Tsukiji Fish Market, Imperial Palace
   ```

2. **Tour Includes**:
   ```
   Professional Guide, Transportation, Lunch, Entrance Fees, Hotel Pickup/Drop-off
   ```

2. **Tour Excludes**:
   ```
   Personal Expenses, Additional Meals, Travel Insurance, Tips
   ```

### Featured Image

1. **Upload** a high-quality tour image
2. **Recommended size**: 1200x800 pixels
3. **File size**: Under 2MB

### Save Tour

**Click** **Publish** to make your tour live.

## Step 2: Set Up Availability

### Add Available Dates

1. **Navigate to** **Yatra → Availability**
2. **Click** **Add New Availability**
3. **Configure Date Range**:
   - **Tour**: Select your newly created tour
   - **Start Date**: 2024-06-01
   - **End Date**: 2024-06-30
   - **Available Days**: Monday, Wednesday, Friday, Saturday

### Set Availability Rules

1. **Pricing**:
   - **Price**: $150.00 per person
   - **Pricing Type**: Per Person

2. **Capacity**:
   - **Maximum Travelers**: 12
   - **Minimum Travelers**: 2

3. **Booking Settings**:
   - **Enable Booking**: Yes
   - **Booking Cut-off**: 24 hours before
   - **Require Confirmation**: Yes

### Save Availability

**Click** **Publish** to activate availability.

## Step 3: Configure Payment Settings

### Enable Payments

1. **Navigate to** **Yatra → Settings → Payment**
2. **Enable Online Payments**: Yes
3. **Select Payment Gateway**:
   - **PayPal Standard**: For credit card and PayPal payments
   - **Bank Transfer**: For offline payments
   - **Cash on Arrival**: For on-site payments

### PayPal Setup

1. **Enable PayPal**: Yes
2. **PayPal Email**: your-business@paypal.com
3. **Sandbox Mode**: Yes (for testing)
4. **Currency**: USD (or your local currency)

### Save Payment Settings

**Click** **Save Changes**.

## Step 4: Configure Email Notifications

### Set Up Email Templates

1. **Navigate to** **Yatra → Settings → Email**
2. **Configure** each email template:

#### Booking Confirmation
- **Subject**: "Booking Confirmation - {tour_name}"
- **Content**: Use default template or customize

#### Payment Confirmation
- **Subject**: "Payment Received - {tour_name}"
- **Content**: Include payment details and booking information

#### Booking Reminder
- **Subject**: "Upcoming Tour Reminder - {tour_name}"
- **Content**: Send 24 hours before tour date

### Test Email Configuration

1. **Navigate to** **Yatra → Tools**
2. **Click** **Test Email**
3. **Enter** your email address
4. **Send** test email

## Step 5: Create Booking Pages

### Tour Listing Page

1. **Navigate to** **Pages → Add New**
2. **Title**: "Tours"
3. **Content**: `[yatra_tours]`
4. **Publish** the page

### Tour Details Page

Tour details are automatically created. The URL will be:
```
https://yoursite.com/tour/tokyo-city-tour/
```

### Booking Form Page

1. **Navigate to** **Pages → Add New**
2. **Title**: "Book Now"
3. **Content**: `[yatra_booking_form]`
4. **Publish** the page

## Step 6: Test Your Booking System

### Test the Complete Flow

1. **Visit** your tours page
2. **Click** on your tour
3. **Select** available date
4. **Choose** number of travelers
5. **Fill** booking form
6. **Complete** payment (use PayPal sandbox)
7. **Verify** booking confirmation email

### Check Booking Management

1. **Navigate to** **Yatra → Bookings**
2. **Verify** your test booking appears
3. **Check** booking status and details

## Step 7: Customize Appearance

### Tour Display Settings

1. **Navigate to** **Yatra → Settings → Display**
2. **Configure** tour listing options:
   - **Items per page**: 12
   - **Show prices**: Yes
   - **Show availability**: Yes
   - **Enable filtering**: Yes

### Color Customization

1. **Navigate to** **Yatra → Settings → Styling**
2. **Customize** colors to match your brand:
   - **Primary Color**: #0073aa
   - **Secondary Color**: #666666
   - **Success Color**: #46b450
   - **Error Color**: #dc3232

## Next Steps

Congratulations! You now have a fully functional travel booking site. Here's what to do next:

### Advanced Configuration

1. **[Tour Booking Guide](/guide/tour-booking)** - Learn advanced tour features
2. **[Payment Settings](/guide/payment-settings)** - Configure additional payment gateways
3. **[Email Settings](/guide/email-settings)** - Customize email templates

### Marketing & SEO

1. **Add SEO titles** and descriptions for tours
2. **Enable social sharing** on tour pages
3. **Set up Google Analytics** tracking
4. **Create promotional content** for your tours

### Customer Management

1. **Set up customer accounts** for repeat bookings
2. **Create customer communication** workflows
3. **Implement review and rating** system

## Troubleshooting

### Common Issues

**Tour Not Showing**: Check tour status is "Published"
**Dates Not Available**: Verify availability is set up correctly
**Payment Not Working**: Check payment gateway configuration
**Emails Not Sending**: Verify email settings and SMTP configuration

### Get Help

- **[Troubleshooting Guide](/guide/troubleshooting)** - Detailed solutions
- **[FAQs](/guide/faqs)** - Common questions and answers
- **[Support](/guide/support)** - Contact our support team

---

**Pro Tip**: Start with a few tours and gradually expand your offerings as you get comfortable with the system. Monitor your bookings and customer feedback to continuously improve your offerings.
