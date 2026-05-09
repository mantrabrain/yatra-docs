---
title: Hotel Booking
description: Complete hotel booking system with room management
---

# Hotel Booking

This comprehensive guide covers hotel and accommodation booking functionality in Yatra.

## Hotel Booking Overview

Yatra's hotel booking system allows you to create and manage hotel rooms, set availability, and accept online reservations.

### Key Features

- **Unlimited Hotels**: Create as many hotels as needed
- **Room Management**: Multiple room types per hotel
- **Flexible Pricing**: Per night, per person, or seasonal pricing
- **Availability Calendar**: Real-time room availability
- **Booking Management**: Complete reservation workflow
- **Payment Integration**: Multiple payment gateway support

## Creating Your First Hotel

### Navigate to Hotel Management

1. **Log in** to your WordPress admin dashboard
2. **Navigate to** **Yatra → Hotels**
3. **Click** **Add New Hotel**

### Basic Hotel Information

#### Hotel Details

1. **Hotel Name**: Enter a descriptive name
   ```
   Good: "Tokyo Grand Hotel - Downtown Location"
   Bad: "Hotel 1"
   ```

2. **Hotel Description**: Add comprehensive details
   ```markdown
   Experience luxury and comfort at Tokyo Grand Hotel, located in the heart 
   of downtown Tokyo. Our hotel offers modern amenities, exceptional service, 
   and convenient access to major attractions.
   ```

#### Hotel Location

1. **Address**: Complete hotel address
2. **City**: Tokyo
3. **Country**: Japan
4. **Postal Code**: 100-0001
5. **GPS Coordinates**: 35.6762°N, 139.6503°E

### Hotel Facilities

#### Amenities

Add hotel amenities (comma-separated):
```
Free WiFi, Air Conditioning, 24-Hour Front Desk, Restaurant, 
Fitness Center, Swimming Pool, Business Center, Parking, 
Room Service, Laundry Service, Concierge
```

#### Services

List available services:
```
Airport Transfer, Tour Desk, Car Rental, Currency Exchange, 
Meeting Rooms, Wedding Services, Spa Services
```

## Room Management

### Creating Room Types

1. **Navigate to** **Yatra → Rooms**
2. **Click** **Add New Room**
3. **Configure** room details

#### Room Configuration

**Basic Information**
- **Room Name**: Deluxe King Room
- **Room Type**: Standard Room
- **Maximum Occupancy**: 2 adults
- **Bed Configuration**: 1 King Bed

**Room Features**
- **Room Size**: 35 sqm
- **View**: City View
- **Floor**: 10-15 floors
- **Smoking**: Non-Smoking

**Room Amenities**
```
Mini Bar, Safe, Coffee Maker, Iron, Hair Dryer, 
Bathrobe, Slippers, Work Desk, TV, Air Conditioning
```

### Room Categories

#### Standard Rooms
- **Standard Room**: Basic amenities
- **Standard Twin**: Two single beds
- **Standard Double**: One double bed

#### Premium Rooms
- **Deluxe Room**: Enhanced amenities
- **Executive Room**: Business amenities
- **Suite**: Separate living area

#### Specialty Rooms
- **Family Room**: Accommodates 4+ guests
- **Honeymoon Suite**: Romantic amenities
- **Accessible Room**: Wheelchair accessible

## Pricing Configuration

### Room Pricing

#### Per Night Pricing
- **Standard Room**: $150 per night
- **Deluxe Room**: $200 per night
- **Suite**: $350 per night

#### Per Person Pricing
- **Standard Room**: $75 per person per night
- **Deluxe Room**: $100 per person per night
- **Suite**: $175 per person per night

### Seasonal Pricing

#### High Season Rates
- **Period**: June-August, December-January
- **Premium**: +30% over standard rates
- **Minimum Stay**: 2 nights

#### Low Season Rates
- **Period**: February-March, November
- **Discount**: -20% from standard rates
- **Special Offers**: Free breakfast

### Dynamic Pricing

#### Length of Stay Discounts
- **3+ nights**: 10% discount
- **7+ nights**: 20% discount
- **14+ nights**: 30% discount

#### Early Bird Discounts
- **30+ days advance**: 15% discount
- **60+ days advance**: 25% discount

## Availability Management

### Setting Up Availability

#### Room Availability

1. **Navigate to** **Yatra → Availability**
2. **Select** Hotel and Room
3. **Set** available dates
4. **Configure** pricing per date

#### Calendar Configuration

**Date Range Settings**
- **Start Date**: 2024-06-01
- **End Date**: 2024-12-31
- **Available Rooms**: 10 rooms of each type
- **Minimum Stay**: 1 night
- **Maximum Stay**: 30 nights

### Rate Management

#### Rate Codes
- **RACK**: Standard published rate
- **CORP**: Corporate rate (-15%)
- **GOVT**: Government rate (-20%)
- **AAA**: AAA member rate (-10%)

#### Channel Management
- **Direct Booking**: Best rates
- **OTA Channels**: Standard rates
- **Travel Agents**: Commissionable rates

## Booking Process

### Hotel Booking Workflow

#### Search and Selection
1. **Search**: Customers search by location, dates, guests
2. **Results**: Available hotels and rooms displayed
3. **Filters**: Price, amenities, location, rating
4. **Selection**: Customer chooses room

#### Booking Form
1. **Guest Information**: Name, email, phone
2. **Stay Details**: Check-in/out dates, guests
3. **Room Selection**: Room type and quantity
4. **Special Requests**: Bed preference, accessibility

#### Payment Processing
1. **Price Calculation**: Room rate + taxes + fees
2. **Payment Method**: Credit card, PayPal, bank transfer
3. **Security Deposit**: Refundable deposit
4. **Confirmation**: Instant booking confirmation

### Booking Confirmation

#### Automatic Confirmation
- **Email Confirmation**: Instant email to guest
- **SMS Notification**: Text message confirmation
- **Hotel Notification**: Alert to hotel staff
- **Calendar Update**: Block room dates

#### Booking Details
- **Confirmation Number**: Unique booking ID
- **Guest Details**: Personal information
- **Room Details**: Type, rate, amenities
- **Payment Details**: Amount, method, status

## Guest Management

### Guest Profiles

#### Guest Information
- **Personal Details**: Name, contact, preferences
- **Booking History**: Past and future bookings
- **Loyalty Status**: Membership tier and points
- **Special Requirements**: Accessibility, dietary needs

#### Guest Communication
- **Pre-Arrival Email**: 3 days before check-in
- **Check-in Instructions**: Self-check-in information
- **Welcome Email**: Upon arrival
- **Post-Stay Survey**: Feedback request

### Check-in/Check-out

#### Check-in Process
- **Time**: 3:00 PM standard check-in
- **Early Check-in**: Available upon request (+$30)
- **Identification**: Government ID required
- **Payment**: Credit card authorization

#### Check-out Process
- **Time**: 11:00 AM standard check-out
- **Late Check-out**: Available upon request (+$50)
- **Invoice**: Itemized bill provided
- **Payment**: Final payment processed

## Integration Features

### Channel Manager Integration

#### Connected Channels
- **Booking.com**: Automatic rate sync
- **Expedia**: Real-time availability
- **Airbnb**: Direct integration
- **Hotels.com**: Channel management

#### Benefits
- **Increased Visibility**: More booking channels
- **Rate Parity**: Consistent pricing
- **Inventory Management**: Real-time updates
- **Reduced Overbooking**: Synchronized availability

### Property Management System

#### PMS Integration
- **Guest Management**: Centralized guest data
- **Housekeeping**: Room status tracking
- **Maintenance**: Work order management
- **Reporting**: Analytics and insights

## Advanced Features

### Package Deals

#### Room + Tour Packages
- **City Explorer**: Room + city tour
- **Romantic Getaway**: Room + dinner
- **Family Fun**: Room + activity passes
- **Business Package**: Room + meeting room

#### All-Inclusive Options
- **Meal Plans**: Breakfast, half-board, full-board
- **Activity Packages**: Tours, spa credits
- **Transportation**: Airport transfers, car rental

### Loyalty Program

#### Membership Tiers
- **Silver**: 10% discount, late checkout
- **Gold**: 15% discount, room upgrade
- **Platinum**: 20% discount, free breakfast

#### Points System
- **Earn**: 1 point per $1 spent
- **Redeem**: Free nights, upgrades
- **Bonus**: Double points on stays

## Analytics and Reporting

### Hotel Performance

#### Occupancy Reports
- **Daily Occupancy**: Room utilization rate
- **Monthly Trends**: Occupancy patterns
- **Yearly Comparison**: Year-over-year growth
- **Forecasting**: Predictive analytics

#### Revenue Reports
- **Daily Revenue**: Total income per day
- **Revenue per Room**: RevPAR calculation
- **Average Daily Rate**: ADR metrics
- **Channel Performance**: Revenue by booking channel

### Guest Analytics

#### Guest Demographics
- **Geographic Origin**: Where guests come from
- **Stay Patterns**: Length of stay trends
- **Booking Lead Time**: Advance booking patterns
- **Seasonal Trends**: Peak and off-peak periods

## Troubleshooting

### Common Issues

#### Booking Problems
- **Overbooking**: Check availability synchronization
- **Payment Issues**: Verify payment gateway settings
- **Double Bookings**: Check calendar conflicts
- **Rate Errors**: Verify pricing configuration

#### Availability Issues
- **Calendar Not Updating**: Check channel manager sync
- **Room Status Errors**: Verify housekeeping integration
- **Rate Parity Issues**: Check channel pricing
- **Blocked Dates**: Verify blackout dates

### Debug Mode

Enable hotel booking debugging:

1. **Navigate to** **Yatra → Settings → Advanced**
2. **Enable Debug Mode**: Yes
3. **Log Level**: Detailed
4. **Hotel Logs**: Enable hotel-specific logging

## Best Practices

### Hotel Management

- **Maintain accurate availability** across all channels
- **Update room photos** regularly
- **Monitor guest reviews** and respond promptly
- **Optimize pricing** based on demand and competition

### Guest Experience

- **Provide clear check-in instructions**
- **Offer personalized services** based on guest preferences
- **Handle special requests** professionally
- **Collect feedback** for continuous improvement

### Revenue Management

- **Use dynamic pricing** to maximize revenue
- **Monitor competitor rates** regularly
- **Adjust inventory** based on demand
- **Promote direct bookings** for better margins

## Next Steps

After mastering hotel booking:

1. **[WooCommerce Integration](woocommerce-integration)** - Connect with e-commerce
2. **[Elementor Integration](elementor-integration)** - Design custom layouts
3. **[FAQs](faqs)** - Find answers to common questions
4. **[Troubleshooting](troubleshooting)** - Resolve issues

---

**Pro Tip**: Start with a few room types and gradually expand your offerings. Monitor booking patterns and adjust pricing and availability based on demand and guest feedback.
