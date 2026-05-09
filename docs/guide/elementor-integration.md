---
title: Elementor Integration
description: Integrate Yatra with Elementor page builder
---

# Elementor Integration

This comprehensive guide covers integrating Yatra with Elementor page builder for custom layouts and designs.

## Integration Overview

Yatra's Elementor integration allows you to create custom booking pages, tour displays, and hotel layouts using Elementor's drag-and-drop interface.

### Benefits of Integration

- **Custom Layouts**: Design unique booking pages
- **Visual Builder**: Drag-and-drop interface
- **Responsive Design**: Mobile-friendly layouts
- **Custom Widgets**: Yatra-specific Elementor widgets
- **Template Library**: Pre-designed templates
- **Dynamic Content**: Dynamic tour and hotel data

## Prerequisites

### Requirements

Before integrating with Elementor, ensure you have:

- **WordPress 6.0+**: Latest WordPress version
- **Elementor Pro**: For advanced features
- **Yatra Plugin**: Installed and activated
- **PHP 7.4+**: Compatible PHP version
- **Adequate Memory**: 128MB+ recommended

### Installation

1. **Install Elementor**:
   - Navigate to **Plugins → Add New**
   - Search for "Elementor"
   - Click **Install Now** and **Activate**

2. **Install Elementor Pro** (optional but recommended):
   - Purchase Elementor Pro license
   - Install and activate Elementor Pro
   - Connect your license

## Integration Setup

### Enable Elementor Integration

1. **Navigate to** **Yatra → Settings → Integration**
2. **Enable Elementor Integration**: Yes
3. **Save Changes**

### Widget Registration

Yatra automatically registers the following Elementor widgets:

#### Tour Widgets
- **Tour List**: Display tour listings
- **Tour Card**: Individual tour display
- **Tour Details**: Full tour information
- **Tour Booking**: Booking form integration
- **Tour Search**: Tour search functionality

#### Hotel Widgets
- **Hotel List**: Display hotel listings
- **Hotel Card**: Individual hotel display
- **Hotel Details**: Full hotel information
- **Room Booking**: Room booking form
- **Hotel Search**: Hotel search functionality

#### Booking Widgets
- **Booking Form**: Custom booking form
- **Availability Calendar**: Availability display
- **Price Calculator**: Price calculation tool
- **Booking Summary**: Booking details display

## Custom Widgets

### Tour List Widget

Display multiple tours in a grid or list layout:

#### Widget Configuration

**Content Settings**
- **Tour Selection**: Select specific tours or show all
- **Layout**: Grid, List, or Masonry
- **Columns**: Number of columns (1-6)
- **Items per Page**: Number of tours to display
- **Show Pagination**: Enable/disable pagination

**Filter Options**
- **Enable Filters**: Yes/No
- **Filter Categories**: Tour categories
- **Filter Price**: Price range filter
- **Filter Duration**: Duration filter
- **Filter Location**: Location filter

**Display Options**
- **Show Image**: Yes/No
- **Show Price**: Yes/No
- **Show Description**: Yes/No
- **Show Rating**: Yes/No
- **Show Book Button**: Yes/No

#### Styling Options

**Layout Styling**
- **Column Gap**: Space between columns
- **Row Gap**: Space between rows
- **Border Radius**: Card corner radius
- **Box Shadow**: Card shadow effect

**Typography**
- **Title Font**: Title typography settings
- **Description Font**: Description typography
- **Price Font**: Price typography
- **Button Font**: Button typography

**Colors**
- **Title Color**: Title text color
- **Description Color**: Description text color
- **Price Color**: Price text color
- **Button Color**: Button colors

### Tour Card Widget

Display individual tour with booking integration:

#### Widget Configuration

**Content Settings**
- **Tour Selection**: Select specific tour
- **Image Size**: Image dimensions
- **Show Details**: Tour information display
- **Booking Integration**: Enable booking form

**Information Display**
- **Show Duration**: Yes/No
- **Show Difficulty**: Yes/No
- **Show Group Size**: Yes/No
- **Show Price**: Yes/No
- **Show Availability**: Yes/No

**Booking Options**
- **Enable Booking**: Yes/No
- **Booking Type**: Direct or modal
- **Button Text**: Custom button text
- **Button Style**: Button appearance

### Hotel List Widget

Display hotel listings with room options:

#### Widget Configuration

**Content Settings**
- **Hotel Selection**: Select specific hotels
- **Layout**: Grid or list layout
- **Columns**: Number of columns
- **Items per Page**: Hotels per page
- **Show Rooms**: Display room options

**Room Display**
- **Show Room Types**: Yes/No
- **Show Room Prices**: Yes/No
- **Show Availability**: Yes/No
- **Room Booking**: Enable room booking

**Filter Options**
- **Enable Filters**: Yes/No
- **Price Range**: Price filter
- **Star Rating**: Rating filter
- **Amenities**: Amenity filter

### Booking Form Widget

Custom booking form with integration:

#### Widget Configuration

**Form Settings**
- **Form Type**: Tour or hotel booking
- **Layout**: Vertical or horizontal
- **Steps**: Multi-step or single-page
- **Required Fields**: Mark required fields

**Field Configuration**
- **Date Selection**: Date picker
- **Guest Selection**: Guest number selector
- **Personal Information**: Name, email, phone
- **Special Requirements**: Additional requests

**Styling Options**
- **Form Layout**: Field arrangement
- **Button Style**: Submit button appearance
- **Validation**: Field validation styling
- **Error Messages**: Error display styling

## Template Library

### Pre-designed Templates

#### Tour Templates

**Tour Listing Page**
- Tour grid layout
- Filter sidebar
- Search functionality
- Pagination

**Tour Detail Page**
- Hero section with tour image
- Tour information sections
- Booking form integration
- Related tours

**Tour Search Page**
- Search form
- Filter options
- Results display
- Map integration

#### Hotel Templates

**Hotel Listing Page**
- Hotel grid layout
- Filter options
- Search functionality
- Sorting options

**Hotel Detail Page**
- Hotel hero section
- Room type display
- Booking integration
- Hotel amenities

**Room Booking Page**
- Room selection
- Date picker
- Guest information
- Payment integration

### Template Usage

#### Import Templates

1. **Navigate to** **Templates → Saved Templates**
2. **Click** "Import Templates"
3. **Select** Yatra templates
4. **Import** desired templates

#### Customize Templates

1. **Edit** template in Elementor
2. **Modify** layout and styling
3. **Save** as custom template
4. **Apply** to pages

## Dynamic Content

### Dynamic Data Integration

#### Tour Data

- **Tour Title**: Dynamic tour name
- **Tour Description**: Dynamic tour description
- **Tour Price**: Dynamic pricing
- **Tour Images**: Dynamic tour images
- **Tour Availability**: Real-time availability

#### Hotel Data

- **Hotel Name**: Dynamic hotel name
- **Hotel Description**: Dynamic hotel description
- **Room Rates**: Dynamic room pricing
- **Hotel Images**: Dynamic hotel images
- **Room Availability**: Real-time availability

#### Booking Data

- **Booking Status**: Dynamic booking status
- **Customer Information**: Dynamic customer data
- **Payment Status**: Dynamic payment status
- **Booking Details**: Dynamic booking information

### Dynamic Tags

#### Tour Tags

- **[tour_title]**: Tour title
- **[tour_price]**: Tour price
- **[tour_duration]**: Tour duration
- **[tour_difficulty]**: Tour difficulty
- **[tour_location]**: Tour location

#### Hotel Tags

- **[hotel_name]**: Hotel name
- **[hotel_rating]**: Hotel rating
- **[room_price]**: Room price
- **[room_type]**: Room type
- **[hotel_location]**: Hotel location

## Advanced Features

### Conditional Logic

#### Display Conditions

- **User Role**: Show based on user role
- **Tour Availability**: Show if tour is available
- **Booking Status**: Show based on booking status
- **Date Range**: Show within date range

#### Dynamic Conditions

- **Price Range**: Show based on price
- **Location**: Show based on location
- **Category**: Show based on category
- **Custom Fields**: Show based on custom fields

### Form Integration

#### Contact Forms

- **Contact Form 7**: Integration with CF7
- **WPForms**: Integration with WPForms
- **Gravity Forms**: Integration with Gravity Forms
- **Custom Forms**: Custom form integration

#### Booking Forms

- **Multi-step Forms**: Step-by-step booking
- **Conditional Fields**: Show/hide fields
- **Validation**: Form validation
- **Submission Handling**: Form submission processing

## Performance Optimization

### Lazy Loading

#### Image Lazy Loading

- **Tour Images**: Lazy load tour images
- **Hotel Images**: Lazy load hotel images
- **Gallery Images**: Lazy load gallery images
- **Background Images**: Lazy load backgrounds

#### Content Lazy Loading

- **Tour Lists**: Lazy load tour lists
- **Hotel Lists**: Lazy load hotel lists
- **Search Results**: Lazy load results
- **Pagination**: Lazy load pages

### Caching

#### Page Caching

- **Static Caching**: Cache static pages
- **Dynamic Caching**: Cache dynamic content
- **Fragment Caching**: Cache page fragments
- **Browser Caching**: Enable browser caching

#### Database Caching

- **Tour Data**: Cache tour information
- **Hotel Data**: Cache hotel information
- **Availability Data**: Cache availability
- **Pricing Data**: Cache pricing data

## Troubleshooting

### Common Issues

#### Widget Issues

- **Widgets Not Loading**: Check Elementor version
- **Data Not Displaying**: Check integration settings
- **Styling Problems**: Check CSS conflicts
- **JavaScript Errors**: Check console errors

#### Integration Issues

- **Data Sync Problems**: Check API connection
- **Booking Issues**: Check booking integration
- **Payment Issues**: Check payment gateway
- **Performance Issues**: Check optimization settings

### Debug Mode

Enable Elementor debugging:

1. **Navigate to** **Elementor → Settings**
2. **Enable Debug Mode**: Yes
3. **Log Level**: Detailed
4. **Save Changes**

## Best Practices

### Design Best Practices

- **Use Consistent Styling**: Maintain design consistency
- **Optimize Images**: Use optimized images
- **Mobile-First Design**: Design for mobile first
- **Test Responsiveness**: Test on all devices

### Performance Best Practices

- **Minimize Widgets**: Use only necessary widgets
- **Optimize Images**: Compress and optimize images
- **Enable Caching**: Use caching plugins
- **Monitor Performance**: Regular performance checks

### SEO Best Practices

- **Use Semantic HTML**: Use proper HTML structure
- **Optimize Images**: Use alt tags and optimized images
- **Internal Linking**: Link between related content
- **Page Speed**: Ensure fast page loading

## Next Steps

After Elementor integration:

1. **[Third-party Integrations](third-party-integrations)** - Connect with other plugins
2. **[Shortcodes](shortcodes)** - Use Yatra shortcodes
3. **[FAQs](faqs)** - Find answers to common questions
4. **[Troubleshooting](troubleshooting)** - Resolve issues

---

**Pro Tip**: Start with pre-designed templates and customize them gradually. Test all functionality thoroughly before publishing to ensure everything works correctly.
