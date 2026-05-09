---
title: Installation
description: Complete installation guide for Yatra WordPress plugin
prev: false
next: /guide/quick-start
---

# Installation

This guide will walk you through installing Yatra on your WordPress site and getting it ready for your travel booking business.

## Requirements

Before installing Yatra, make sure your system meets the following requirements:

### WordPress Requirements
- **WordPress Version**: 6.0 or higher
- **PHP Version**: 7.4 or higher (recommend 8.0+)
- **MySQL Version**: 5.6 or higher
- **Memory Limit**: 128MB or higher

### Server Requirements
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **SSL Certificate**: Recommended for secure payments
- **Mod Rewrite**: Required for pretty permalinks

## Installation Methods

### Method 1: Install from WordPress Repository (Recommended)

1. **Log in** to your WordPress admin dashboard
2. Navigate to **Plugins → Add New**
3. Search for "**Yatra**" in the search bar
4. Click **Install Now** on the Yatra plugin
5. Click **Activate** after installation completes

### Method 2: Manual Upload

1. **Download** the latest Yatra plugin from [WordPress.org](https://wordpress.org/plugins/yatra/)
2. **Extract** the ZIP file to get the `yatra` folder
3. **Upload** the `yatra` folder to your WordPress installation at:
   ```
   /wp-content/plugins/yatra/
   ```
4. **Log in** to your WordPress admin dashboard
5. Navigate to **Plugins → Installed Plugins**
6. Find **Yatra** and click **Activate**

## Initial Setup

After activation, Yatra will guide you through the initial setup:

### Step 1: Welcome Screen

When you first activate Yatra, you'll see a welcome screen with options to:

- **Run Setup Wizard**: Quick guided setup
- **Skip Setup**: Configure manually later
- **Import Sample Data**: Load demo tours and hotels

### Step 2: Setup Wizard (Optional)

The setup wizard helps you configure:

1. **Basic Settings**
   - Site currency
   - Date format
   - Time zone

2. **Payment Settings**
   - Enable/disable payments
   - Select payment gateways

3. **Email Settings**
   - Configure email notifications
   - Set up email templates

4. **Page Creation**
   - Automatically create booking pages
   - Set up booking forms

### Step 3: Manual Configuration

If you skipped the setup wizard, you can configure Yatra manually:

1. **Navigate to** **Yatra → Settings**
2. **Configure** each section:
   - **General**: Basic plugin settings
   - **Booking**: Booking configuration
   - **Payment**: Payment gateway setup
   - **Email**: Notification settings

## Page Setup

Yatra needs specific pages to function properly. You can create them automatically or manually:

### Automatic Page Creation

1. **Navigate to** **Yatra → Tools**
2. **Click** **Create Default Pages**
3. **Confirm** page creation

### Manual Page Creation

Create the following pages and assign the appropriate shortcodes:

#### Tour Listing Page
- **Title**: Tours
- **Content**: `[yatra_tours]`
- **Permalink**: `/tours`

#### Hotel Listing Page
- **Title**: Hotels
- **Content**: `[yatra_hotels]`
- **Permalink**: `/hotels`

#### Booking Page
- **Title**: Book Now
- **Content**: `[yatra_booking_form]`
- **Permalink**: `/book`

#### My Account Page
- **Title**: My Account
- **Content**: `[yatra_account]`
- **Permalink**: `/my-account`

## Permalink Configuration

For clean URLs, configure your permalinks:

1. **Navigate to** **Settings → Permalinks**
2. **Select** **Post name** structure
3. **Save Changes**

## Required WordPress Settings

### Media Settings
1. **Navigate to** **Settings → Media**
2. **Set** thumbnail sizes for tour images:
   - Thumbnail: 150x150
   - Medium: 300x300
   - Large: 1024x1024

### Discussion Settings
1. **Navigate to** **Settings → Discussion**
2. **Uncheck** "Allow people to post comments on new articles" (optional)

## Testing Your Installation

After installation, verify everything is working:

### 1. Check Plugin Status
- **Navigate to** **Plugins → Installed Plugins**
- **Confirm** Yatra is active
- **Check** for any error messages

### 2. Verify Pages
- **Visit** your tour listing page
- **Confirm** pages load without errors
- **Check** booking forms display correctly

### 3. Test Booking Flow
1. **Create** a test tour
2. **Visit** the tour page
3. **Try** to make a test booking
4. **Verify** all steps work correctly

## Common Installation Issues

### Memory Limit Error
If you encounter memory limit errors:

```php
// Add to wp-config.php
define('WP_MEMORY_LIMIT', '256M');
```

### Permission Issues
If you can't upload files:

```bash
# Set correct permissions
chmod 755 /wp-content/plugins/
chmod 755 /wp-content/themes/
chmod 755 /wp-content/uploads/
```

### White Screen After Activation
1. **Deactivate** all plugins
2. **Activate** Yatra first
3. **Reactivate** other plugins one by one

## Next Steps

After successful installation:

1. **[Quick Start Guide](quick-start)** - Create your first tour
2. **[Booking Settings](booking-settings)** - Configure booking options
3. **[Payment Settings](payment-settings)** - Set up payment gateways
4. **[Tour Booking](tour-booking)** - Learn about tour management

## Need Help?

If you encounter any issues during installation:

- **[Troubleshooting Guide](troubleshooting)** - Common solutions
- **[FAQs](faqs)** - Frequently asked questions
- **[Support](support)** - Contact our support team

---

**Pro Tip**: Always create a backup of your WordPress site before installing new plugins, especially on production sites.
