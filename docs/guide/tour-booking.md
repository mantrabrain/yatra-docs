---
title: Tour Booking
description: Complete tour booking system with advanced features
---

# Tour Booking

This comprehensive guide covers everything you need to know about creating and managing tours in Yatra.

## Tour Overview

Yatra's tour booking system allows you to create detailed tour experiences with flexible pricing, availability management, and booking automation.

### Key Features

- **Unlimited Tours**: Create as many tours as you need
- **Flexible Pricing**: Per person, per group, or custom pricing
- **Advanced Availability**: Set dates, times, and capacity limits
- **Rich Content**: Add images, videos, itineraries, and highlights
- **Booking Management**: Complete booking workflow with notifications
- **Payment Integration**: Multiple payment gateway support

## Creating Your First Tour

### Navigate to Tour Management

1. **Log in** to your WordPress admin dashboard
2. **Navigate to** **Yatra → Tours**
3. **Click** **Add New Tour**

### Basic Tour Information

#### Tour Title and Description

1. **Tour Title**: Enter a descriptive, SEO-friendly title
   ```
   Good: "Tokyo City Highlights Tour - Full Day Experience"
   Bad: "Tour 1"
   ```

2. **Tour Description**: Add comprehensive details about your tour
   ```markdown
   Explore the vibrant city of Tokyo with our comprehensive full-day tour. 
   Visit iconic landmarks, experience local culture, and enjoy authentic Japanese cuisine.
   
   This tour includes:
   - Professional English-speaking guide
   - Transportation between attractions
   - Lunch at authentic Japanese restaurant
   - Entrance fees to all attractions
   - Hotel pickup and drop-off
   ```

#### Tour Duration and Schedule

1. **Duration Settings**:
   - **Duration**: 1 day
   - **Duration Type**: Days
   - **Start Time**: 9:00 AM
   - **End Time**: 6:00 PM
   - **Tour Type**: Day Tour

2. **Schedule Information**:
   - **Meeting Point**: Tokyo Station
   - **End Point**: Shibuya Station
   - **Language**: English
   - **Difficulty Level**: Easy

### Tour Pricing

#### Per Person Pricing

1. **Regular Price**: Set the standard price
   - **Amount**: $150.00
   - **Currency**: USD (or your local currency)

2. **Sale Price**: Optional discounted price
   - **Amount**: $129.00
   - **Sale Period**: Limited time offer

3. **Child Pricing**: Different prices for children
   - **Child Age Range**: 4-11 years
   - **Child Price**: $75.00
   - **Infant Policy**: Free under 4 years

#### Per Group Pricing

1. **Fixed Group Price**: Set price for entire group
   - **Amount**: $1,000.00
   - **Includes**: Up to 8 people
   - **Additional Person**: $100.00 each

2. **Group Size Limits**:
   - **Minimum Travelers**: 2
   - **Maximum Travelers**: 12
   - **Private Tour Option**: Yes (+$200)

### Tour Highlights and Features

#### Tour Highlights

Add key attractions and experiences (comma-separated):
```
Tokyo Tower, Senso-ji Temple, Shibuya Crossing, Tsukiji Fish Market, 
Imperial Palace, Meiji Shrine, Harajuku District, Akihabara
```

#### Tour Includes

List everything included in the tour:
```
Professional Guide, Transportation, Lunch, Entrance Fees, 
Hotel Pickup/Drop-off, Bottled Water, Travel Insurance
```

#### Tour Excludes

List what's not included:
```
Personal Expenses, Additional Meals, Travel Insurance, Tips, 
Souvenirs, Alcoholic Beverages
```

#### Tour Requirements

Set requirements for participants:
```
- Moderate fitness level required
- Comfortable walking shoes recommended
- Weather-appropriate clothing
- Valid ID required
```

### Tour Media

#### Featured Image

1. **Upload** a high-quality tour image
2. **Recommended specifications**:
   - **Size**: 1200x800 pixels
   - **Format**: JPG, PNG, or WebP
   - **File size**: Under 2MB
   - **Content**: Professional photo of tour experience

#### Tour Gallery

Add multiple images to showcase the tour:

1. **Click** **Add to Gallery**
2. **Upload** 5-10 high-quality images
3. **Add captions** for each image
4. **Set featured image** as the main tour photo

#### Video Content

Embed videos to enhance the tour presentation:

```html
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/your-video-id" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

### Tour Itinerary

#### Day-by-Day Itinerary

Create a detailed schedule:

**9:00 AM - Hotel Pickup**
- Pickup from major hotels
- Meet your guide
- Brief tour overview

**10:00 AM - Tokyo Tower**
- Visit iconic Tokyo Tower
- Panoramic city views
- Photo opportunities

**12:00 PM - Lunch**
- Authentic Japanese restaurant
- Multiple menu options
- Dietary restrictions accommodated

**2:00 PM - Senso-ji Temple**
- Historic temple visit
- Cultural experience
- Shopping opportunities

**4:00 PM - Shibuya Crossing**
- World's busiest intersection
- Shopping and exploration
- Modern Tokyo experience

**6:00 PM - Tour End**
- Drop-off at central location
- Farewell from guide

#### Multi-Day Tours

For tours spanning multiple days:

**Day 1: Arrival and City Tour**
- Airport pickup
- Hotel check-in
- City orientation tour

**Day 2: Cultural Experience**
- Traditional temple visits
- Cultural activities
- Local cuisine tasting

**Day 3: Nature and Scenery**
- Mount Fuji day trip
- Natural hot springs
- Scenic viewpoints

### Tour Categories and Tags

#### Tour Categories

Organize tours by type:

- **City Tours**: Urban exploration
- **Cultural Tours**: Historical and cultural experiences
- **Adventure Tours**: Active and outdoor experiences
- **Food Tours**: Culinary experiences
- **Nature Tours**: Wildlife and natural attractions
- **Photography Tours**: Focused on photo opportunities

#### Tour Tags

Add descriptive tags for search and filtering:

```
tokyo, city tour, cultural, temples, food, shopping, 
photography, family-friendly, walking tour, guide
```

### Tour Location

#### Physical Location

Set the tour's physical location:

1. **Tour Location**: Tokyo, Japan
2. **Meeting Point**: Tokyo Station, Marunouchi Exit
3. **GPS Coordinates**: 35.6812° N, 139.7671° E
4. **Map Display**: Show location on tour page

#### Virtual Tours

For online or remote experiences:

1. **Virtual Tour**: Yes
2. **Platform**: Zoom, Google Meet, etc.
3. **Time Zone**: JST (UTC+9)
4. **Recording**: Available for 7 days

## Managing Tour Availability

### Setting Up Availability

#### Date-Based Availability

1. **Navigate to** **Yatra → Availability**
2. **Click** **Add New Availability**
3. **Configure** date range:
   - **Tour**: Select your tour
   - **Start Date**: 2024-06-01
   - **End Date**: 2024-08-31
   - **Available Days**: Monday, Wednesday, Friday, Saturday

#### Time-Based Availability

Set specific time slots:

1. **Time Slots**: Multiple departure times
   - **Morning Tour**: 9:00 AM - 1:00 PM
   - **Afternoon Tour**: 2:00 PM - 6:00 PM
   - **Evening Tour**: 6:00 PM - 10:00 PM

2. **Capacity per Time Slot**:
   - **Morning**: 12 people
   - **Afternoon**: 15 people
   - **Evening**: 10 people

### Seasonal Availability

#### High Season Configuration

Set up different availability for peak seasons:

```php
// Summer Season (June-August)
Start Date: 2024-06-01
End Date: 2024-08-31
Available Days: Daily
Capacity: 20 people
Price: $180 (20% premium)

// Winter Season (December-February)
Start Date: 2024-12-01
End Date: 2025-02-28
Available Days: Weekends only
Capacity: 15 people
Price: $120 (20% discount)
```

#### Special Events

Add availability for holidays and special events:

1. **Cherry Blossom Season**: March-April
2. **Golden Week**: Late April-early May
3. **New Year**: December 31-January 3
4. **Festival Dates**: Local festival periods

### Capacity Management

#### Dynamic Capacity

Adjust capacity based on demand:

1. **Base Capacity**: 12 people
2. **High Demand**: Increase to 15 people
3. **Low Demand**: Decrease to 8 people
4. **Private Tours**: 1-6 people (premium pricing)

#### Waitlist Management

Handle overbooking scenarios:

1. **Enable Waitlist**: Yes
2. **Waitlist Size**: 5 people
3. **Notification**: Automatic email when spot opens
4. **Priority**: First-come, first-served

## Advanced Tour Features

### Custom Tour Options

#### Tour Variations

Create different versions of the same tour:

1. **Standard Tour**: Basic experience
2. **Premium Tour**: Added luxury features
3. **Budget Tour**: Essential experience only
4. **Private Tour**: Personalized experience

#### Add-on Services

Offer additional services:

1. **Photography Package**: +$50
2. **Transportation Upgrade**: +$30
3. **Meal Upgrade**: +$25
4. **Travel Insurance**: +$15
5. **Airport Transfer**: +$40

### Multi-Language Support

#### Tour Languages

Offer tours in multiple languages:

1. **English**: Daily, standard price
2. **Japanese**: Daily, 10% discount
3. **Chinese**: Weekends, +10% premium
4. **Korean**: Upon request, +15% premium

#### Language-Specific Guides

Configure guide assignments:

```php
// Language Guide Assignment
English Guide: Available daily
Japanese Guide: Available weekends
Chinese Guide: Available Saturdays
Korean Guide: Available upon request
```

### Tour Packages

#### All-Inclusive Packages

Create comprehensive packages:

1. **3-Day Tokyo Experience**
   - 3 different tours
   - Hotel accommodation
   - All meals included
   - Transportation
   - Price: $800 per person

2. **Weekend Getaway**
   - 2-day tour package
   - Boutique hotel
   - Breakfast included
   - Airport transfer
   - Price: $450 per person

#### Combination Tours

Bundle multiple tours:

1. **City + Nature Combo**
   - City tour + Mount Fuji day trip
   - 2-day experience
   - Discount: 15% off individual prices

2. **Food + Culture Combo**
   - Food tour + temple visits
   - Full day experience
   - Includes lunch and dinner

## Tour Marketing and SEO

### SEO Optimization

#### Tour Page SEO

Optimize tour pages for search engines:

1. **SEO Title**: "Tokyo City Tour - Full Day Experience | Yatra Tours"
2. **Meta Description**: "Explore Tokyo's best attractions on our full-day city tour. Professional guide, transportation, and lunch included. Book now!"
3. **Focus Keywords**: "Tokyo tour, city tour, Tokyo attractions, Japan travel"

#### Content Optimization

Create SEO-friendly content:

1. **Use Headings**: Proper H1, H2, H3 structure
2. **Internal Linking**: Link to related tours
3. **Image Alt Text**: Descriptive alt text for all images
4. **Schema Markup**: Tour and event schema

### Tour Marketing

#### Social Media Integration

Connect with social platforms:

1. **Instagram**: Share tour photos and stories
2. **Facebook**: Create events and groups
3. **YouTube**: Tour videos and testimonials
4. **Pinterest**: Tour infographics and guides

#### Customer Reviews

Encourage and display reviews:

1. **Review System**: Built-in review functionality
2. **Testimonials**: Customer quotes and stories
3. **Photo Gallery**: Customer-submitted photos
4. **Video Testimonials**: Customer video reviews

## Booking Management

### Booking Workflow

#### Booking Process

1. **Tour Selection**: Customer chooses tour
2. **Date Selection**: Available dates displayed
3. **Traveler Information**: Personal details
4. **Additional Services**: Optional add-ons
5. **Payment**: Secure payment processing
6. **Confirmation**: Instant booking confirmation

#### Booking Confirmation

Automated confirmation system:

1. **Email Confirmation**: Instant email to customer
2. **SMS Notification**: Text message confirmation
3. **Calendar Invite**: Add to customer calendar
4. **Traveler Updates**: Pre-tour information

### Booking Modifications

#### Date Changes

Allow customers to modify booking dates:

1. **Change Window**: Up to 7 days before tour
2. **Price Adjustment**: Price difference applies
3. **Availability Check**: Real-time availability
4. **Confirmation**: New confirmation email

#### Traveler Changes

Handle traveler information updates:

1. **Name Changes**: Up to 3 days before tour
2. **Group Size**: Increase/decrease group size
3. **Special Requirements**: Dietary, accessibility needs
4. **Contact Information**: Updated contact details

### Cancellation and Refunds

#### Cancellation Policy

Set clear cancellation rules:

1. **Full Refund**: 30+ days before tour
2. **Partial Refund**: 14-29 days before tour
3. **No Refund**: Less than 14 days before tour
4. **Exceptions**: Medical emergencies, etc.

#### Refund Processing

Handle refund requests:

1. **Automatic Refunds**: Process automatically
2. **Manual Review**: Review complex cases
3. **Processing Time**: 5-7 business days
4. **Communication**: Clear refund status updates

## Analytics and Reporting

### Tour Performance

#### Booking Analytics

Track tour performance metrics:

1. **Booking Volume**: Number of bookings per tour
2. **Revenue**: Total revenue per tour
3. **Occupancy Rate**: How full tours are
4. **Conversion Rate**: Booking conversion percentage

#### Customer Analytics

Understand customer behavior:

1. **Demographics**: Age, location, gender
2. **Booking Patterns**: Peak booking times
3. **Tour Preferences**: Most popular tour types
4. **Customer Feedback**: Satisfaction ratings

### Reporting Tools

#### Built-in Reports

Generate comprehensive reports:

1. **Monthly Summary**: Overall performance
2. **Tour Comparison**: Compare tour performance
3. **Revenue Reports**: Financial breakdown
4. **Customer Reports**: Customer insights

#### Custom Reports

Create custom reports:

1. **Date Range**: Specific time periods
2. **Tour Categories**: Filter by tour type
3. **Geographic**: Location-based reports
4. **Custom Metrics**: Your specific KPIs

## Troubleshooting

### Common Tour Issues

#### Booking Problems

**Tour Not Showing**: Check tour status and availability
**Dates Not Available**: Verify availability configuration
**Pricing Errors**: Check pricing settings and calculations
**Images Not Loading**: Verify image files and permissions

#### Availability Issues

**Overbooking**: Check capacity settings
**Date Conflicts**: Verify date ranges don't overlap
**Time Zone Issues**: Check time zone settings
**Calendar Sync**: Verify calendar integration

### Debug Mode

Enable tour debugging:

1. **Navigate to** **Yatra → Settings → Advanced**
2. **Enable Debug Mode**: Yes
3. **Log Level**: Detailed
4. **Tour Logs**: Enable tour-specific logging

## Best Practices

### Tour Creation

- **Use high-quality images** for better conversion
- **Write detailed descriptions** to set expectations
- **Set competitive pricing** based on market research
- **Create compelling itineraries** with clear value proposition

### Customer Experience

- **Provide clear meeting instructions** and maps
- **Send timely confirmations** and reminders
- **Handle special requests** professionally
- **Collect feedback** for continuous improvement

### Business Operations

- **Monitor tour performance** regularly
- **Adjust pricing** based on demand and competition
- **Maintain availability** accurately
- **Invest in marketing** to increase visibility

## Next Steps

After mastering tour booking:

1. **[Hotel Booking](/guide/hotel-booking)** - Add hotel accommodations
2. **[WooCommerce Integration](/guide/woocommerce-integration)** - Connect with e-commerce
3. **[Email Settings](/guide/email-settings)** - Configure notifications
4. **[Advanced Features](/guide/hooks-filters)** - Customize with hooks and filters

---

**Pro Tip**: Start with a few well-designed tours and gradually expand your offerings based on customer feedback and booking data. Focus on creating unique experiences that differentiate your tours from competitors.
