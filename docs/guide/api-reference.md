---
title: API Reference
description: Complete REST API documentation for Yatra
---

# API Reference

This comprehensive guide covers the Yatra REST API for developers to integrate with external applications.

## API Overview

Yatra provides a comprehensive REST API for managing tours, hotels, bookings, and other functionality.

### Base URL

```
https://yoursite.com/wp-json/yatra/v1
```

### Authentication

Most API endpoints require authentication. Yatra supports:

- **Basic Authentication**: Username and password
- **JWT Authentication**: JSON Web Tokens
- **OAuth 2.0**: Third-party authentication
- **API Keys**: Custom API key authentication

### Response Format

All API responses use JSON format:

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "code": 200
}
```

## Tour Endpoints

### Get Tours

Retrieve a list of tours.

#### Endpoint

```
GET /wp-json/yatra/v1/tours
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `category` | string | all | Tour category |
| `search` | string | none | Search term |
| `orderby` | string | date | Sort by date, title, price |
| `order` | string | DESC | Sort order ASC or DESC |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "title": "Tokyo City Tour",
      "description": "Explore Tokyo's best attractions",
      "price": 150.00,
      "duration": "1 day",
      "category": "city_tour",
      "image": "https://yoursite.com/wp-content/uploads/tour.jpg",
      "permalink": "https://yoursite.com/tour/tokyo-city-tour",
      "availability": true
    }
  ],
  "total": 25,
  "pages": 3
}
```

### Get Single Tour

Retrieve a specific tour.

#### Endpoint

```
GET /wp-json/yatra/v1/tours/{id}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Tour ID |

#### Response

```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "Tokyo City Tour",
    "description": "Explore Tokyo's best attractions",
    "content": "Full tour content...",
    "price": 150.00,
    "sale_price": 129.00,
    "duration": "1 day",
    "difficulty": "easy",
    "group_size": {
      "min": 2,
      "max": 12
    },
    "highlights": ["Tokyo Tower", "Senso-ji Temple"],
    "includes": ["Guide", "Transportation", "Lunch"],
    "excludes": ["Personal expenses"],
    "category": "city_tour",
    "tags": ["tokyo", "city", "culture"],
    "image": "https://yoursite.com/wp-content/uploads/tour.jpg",
    "gallery": [
      "https://yoursite.com/wp-content/uploads/tour-1.jpg",
      "https://yoursite.com/wp-content/uploads/tour-2.jpg"
    ],
    "permalink": "https://yoursite.com/tour/tokyo-city-tour",
    "availability": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T00:00:00Z"
  }
}
```

### Create Tour

Create a new tour.

#### Endpoint

```
POST /wp-json/yatra/v1/tours
```

#### Request Body

```json
{
  "title": "New Tour",
  "description": "Tour description",
  "content": "Full tour content",
  "price": 150.00,
  "sale_price": 129.00,
  "duration": "1 day",
  "difficulty": "easy",
  "group_size": {
    "min": 2,
    "max": 12
  },
  "highlights": ["Highlight 1", "Highlight 2"],
  "includes": ["Guide", "Transportation"],
  "excludes": ["Personal expenses"],
  "category": "city_tour",
  "tags": ["tokyo", "city"]
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 124,
    "title": "New Tour",
    "permalink": "https://yoursite.com/tour/new-tour"
  },
  "message": "Tour created successfully"
}
```

### Update Tour

Update an existing tour.

#### Endpoint

```
PUT /wp-json/yatra/v1/tours/{id}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Tour ID |

#### Request Body

Same as create tour endpoint.

#### Response

```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "Updated Tour"
  },
  "message": "Tour updated successfully"
}
```

### Delete Tour

Delete a tour.

#### Endpoint

```
DELETE /wp-json/yatra/v1/tours/{id}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Tour ID |

#### Response

```json
{
  "success": true,
  "message": "Tour deleted successfully"
}
```

## Hotel Endpoints

### Get Hotels

Retrieve a list of hotels.

#### Endpoint

```
GET /wp-json/yatra/v1/hotels
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `city` | string | all | City filter |
| `stars` | integer | all | Star rating filter |
| `search` | string | none | Search term |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 456,
      "title": "Tokyo Grand Hotel",
      "description": "Luxury hotel in downtown Tokyo",
      "rating": 5,
      "address": "123 Main St, Tokyo",
      "city": "Tokyo",
      "country": "Japan",
      "image": "https://yoursite.com/wp-content/uploads/hotel.jpg",
      "permalink": "https://yoursite.com/hotel/tokyo-grand-hotel",
      "rooms": [
        {
          "id": 789,
          "type": "Deluxe Room",
          "price": 200.00,
          "max_occupancy": 2,
          "amenities": ["WiFi", "Air Conditioning"]
        }
      ]
    }
  ]
}
```

### Get Single Hotel

Retrieve a specific hotel.

#### Endpoint

```
GET /wp-json/yatra/v1/hotels/{id}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Hotel ID |

#### Response

```json
{
  "success": true,
  "data": {
    "id": 456,
    "title": "Tokyo Grand Hotel",
    "description": "Luxury hotel in downtown Tokyo",
    "rating": 5,
    "address": "123 Main St, Tokyo",
    "city": "Tokyo",
    "country": "Japan",
    "phone": "+81-3-1234-5678",
    "email": "info@tokyograndhotel.com",
    "website": "https://tokyograndhotel.com",
    "check_in_time": "15:00",
    "check_out_time": "11:00",
    "amenities": [
      "Free WiFi",
      "Swimming Pool",
      "Fitness Center",
      "Restaurant",
      "Business Center"
    ],
    "facilities": [
      "24-Hour Front Desk",
      "Concierge Service",
      "Room Service",
      "Laundry Service"
    ],
    "image": "https://yoursite.com/wp-content/uploads/hotel.jpg",
    "gallery": [
      "https://yoursite.com/wp-content/uploads/hotel-1.jpg",
      "https://yoursite.com/wp-content/uploads/hotel-2.jpg"
    ],
    "rooms": [
      {
        "id": 789,
        "type": "Deluxe Room",
        "description": "Spacious room with city view",
        "price": 200.00,
        "max_occupancy": 2,
        "bed_type": "King Bed",
        "room_size": "35 sqm",
        "amenities": ["WiFi", "Air Conditioning", "Mini Bar"],
        "images": [
          "https://yoursite.com/wp-content/uploads/room-1.jpg"
        ]
      }
    ],
    "permalink": "https://yoursite.com/hotel/tokyo-grand-hotel",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T00:00:00Z"
  }
}
```

## Booking Endpoints

### Get Bookings

Retrieve a list of bookings.

#### Endpoint

```
GET /wp-json/yatra/v1/bookings
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `status` | string | all | Booking status |
| `user_id` | integer | all | User ID filter |
| `tour_id` | integer | all | Tour ID filter |
| `hotel_id` | integer | all | Hotel ID filter |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 789,
      "user_id": 123,
      "tour_id": 123,
      "hotel_id": null,
      "room_id": null,
      "status": "confirmed",
      "total_price": 150.00,
      "currency": "USD",
      "booking_date": "2024-06-15",
      "number_of_travelers": 2,
      "special_requirements": "Vegetarian meals",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 15,
  "pages": 2
}
```

### Get Single Booking

Retrieve a specific booking.

#### Endpoint

```
GET /wp-json/yatra/v1/bookings/{id}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Booking ID |

#### Response

```json
{
  "success": true,
  "data": {
    "id": 789,
    "user_id": 123,
    "tour_id": 123,
    "hotel_id": null,
    "room_id": null,
    "status": "confirmed",
    "total_price": 150.00,
    "subtotal": 150.00,
    "tax_amount": 15.00,
    "tax_rate": 0.1,
    "currency": "USD",
    "booking_date": "2024-06-15",
    "number_of_travelers": 2,
    "special_requirements": "Vegetarian meals",
    "payment_status": "paid",
    "payment_method": "stripe",
    "transaction_id": "txn_123456789",
    "customer": {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-123-4567"
    },
    "tour": {
      "id": 123,
      "title": "Tokyo City Tour",
      "duration": "1 day"
    },
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Create Booking

Create a new booking.

#### Endpoint

```
POST /wp-json/yatra/v1/bookings
```

#### Request Body

```json
{
  "tour_id": 123,
  "hotel_id": null,
  "room_id": null,
  "booking_date": "2024-06-15",
  "number_of_travelers": 2,
  "special_requirements": "Vegetarian meals",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-123-4567"
  },
  "payment_method": "stripe"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 790,
    "status": "pending",
    "total_price": 150.00,
    "payment_url": "https://checkout.stripe.com/pay/..."
  },
  "message": "Booking created successfully"
}
```

### Update Booking

Update an existing booking.

#### Endpoint

```
PUT /wp-json/yatra/v1/bookings/{id}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Booking ID |

#### Request Body

```json
{
  "status": "confirmed",
  "special_requirements": "Updated requirements"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 789,
    "status": "confirmed"
  },
  "message": "Booking updated successfully"
}
```

### Cancel Booking

Cancel a booking.

#### Endpoint

```
POST /wp-json/yatra/v1/bookings/{id}/cancel
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Booking ID |

#### Request Body

```json
{
  "reason": "Customer requested cancellation",
  "refund_amount": 150.00
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 789,
    "status": "cancelled",
    "refund_amount": 150.00
  },
  "message": "Booking cancelled successfully"
}
```

## Availability Endpoints

### Get Availability

Get availability for tours or hotels.

#### Tour Availability

```
GET /wp-json/yatra/v1/tours/{id}/availability
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Tour ID |
| `start_date` | string | Start date (YYYY-MM-DD) |
| `end_date` | string | End date (YYYY-MM-DD) |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2024-06-15",
      "available": true,
      "max_travelers": 12,
      "current_bookings": 5,
      "price": 150.00,
      "status": "available"
    }
  ]
}
```

#### Hotel Availability

```
GET /wp-json/yatra/v1/hotels/{id}/availability
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Hotel ID |
| `room_id` | integer | Room ID (optional) |
| `start_date` | string | Start date (YYYY-MM-DD) |
| `end_date` | string | End date (YYYY-MM-DD) |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "room_id": 789,
      "room_type": "Deluxe Room",
      "date": "2024-06-15",
      "available": true,
      "max_rooms": 10,
      "current_bookings": 3,
      "price": 200.00,
      "status": "available"
    }
  ]
}
```

### Check Availability

Check if specific dates are available.

#### Endpoint

```
POST /wp-json/yatra/v1/availability/check
```

#### Request Body

```json
{
  "type": "tour",
  "id": 123,
  "start_date": "2024-06-15",
  "end_date": "2024-06-16",
  "number_of_travelers": 2
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "available": true,
    "price": 150.00,
    "total_price": 300.00,
    "message": "Dates are available"
  }
}
```

## User Endpoints

### Get Current User

Get information about the current authenticated user.

#### Endpoint

```
GET /wp-json/yatra/v1/users/me
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 123,
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "display_name": "John Doe",
    "role": "customer",
    "bookings": [
      {
        "id": 789,
        "status": "confirmed",
        "tour_title": "Tokyo City Tour",
        "booking_date": "2024-06-15"
      }
    ]
  }
}
```

### Update User Profile

Update the current user's profile.

#### Endpoint

```
PUT /wp-json/yatra/v1/users/me
```

#### Request Body

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1-555-123-4567",
  "bio": "Travel enthusiast"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1-555-123-4567",
    "bio": "Travel enthusiast"
  },
  "message": "Profile updated successfully"
}
```

## Search Endpoints

### Search Tours

Search for tours based on criteria.

#### Endpoint

```
GET /wp-json/yatra/v1/search/tours
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | none | Search query |
| `category` | string | all | Tour category |
| `destination` | string | all | Destination |
| `price_min` | float | none | Minimum price |
| `price_max` | float | none | Maximum price |
| `duration_min` | integer | none | Minimum duration |
| `duration_max` | integer | none | Maximum duration |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "title": "Tokyo City Tour",
      "description": "Explore Tokyo's best attractions",
      "price": 150.00,
      "duration": "1 day",
      "category": "city_tour",
      "destination": "Tokyo",
      "image": "https://yoursite.com/wp-content/uploads/tour.jpg",
      "permalink": "https://yoursite.com/tour/tokyo-city-tour"
    }
  ],
  "total": 5,
  "search_time": 0.05
}
```

### Search Hotels

Search for hotels based on criteria.

#### Endpoint

```
GET /wp-json/yatra/v1/search/hotels
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | none | Search query |
| `city` | string | all | City |
| `stars` | integer | all | Star rating |
| `price_min` | float | none | Minimum price |
| `price_max` | float | none | Maximum price |
| `amenities` | string | all | Required amenities |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 456,
      "title": "Tokyo Grand Hotel",
      "description": "Luxury hotel in downtown Tokyo",
      "rating": 5,
      "price": 200.00,
      "city": "Tokyo",
      "image": "https://yoursite.com/wp-content/uploads/hotel.jpg",
      "permalink": "https://yoursite.com/hotel/tokyo-grand-hotel"
    }
  ],
  "total": 3,
  "search_time": 0.03
}
```

## Payment Endpoints

### Process Payment

Process payment for a booking.

#### Endpoint

```
POST /wp-json/yatra/v1/payments/process
```

#### Request Body

```json
{
  "booking_id": 789,
  "payment_method": "stripe",
  "payment_token": "tok_123456789",
  "amount": 150.00,
  "currency": "USD"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "payment_id": "pay_123456789",
    "status": "completed",
    "transaction_id": "txn_123456789"
  },
  "message": "Payment processed successfully"
}
```

### Get Payment Status

Get payment status for a booking.

#### Endpoint

```
GET /wp-json/yatra/v1/payments/{booking_id}/status
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `booking_id` | integer | Booking ID |

#### Response

```json
{
  "success": true,
  "data": {
    "booking_id": 789,
    "payment_status": "paid",
    "payment_method": "stripe",
    "amount": 150.00,
    "transaction_id": "txn_123456789",
    "paid_at": "2024-01-01T12:00:00Z"
  }
}
```

## Error Handling

### Error Response Format

All API errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid parameter provided",
    "data": {
      "field": "tour_id",
      "value": "invalid"
    }
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `INVALID_PARAMETER` | Invalid parameter provided |
| `NOT_FOUND` | Resource not found |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Access denied |
| `VALIDATION_ERROR` | Validation failed |
| `BOOKING_UNAVAILABLE` | Booking dates not available |
| `PAYMENT_FAILED` | Payment processing failed |
| `RATE_LIMIT_EXCEEDED` | Rate limit exceeded |

## Rate Limiting

### Rate Limits

API requests are rate limited to prevent abuse:

- **Unauthenticated requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour
- **Payment endpoints**: 10 requests per minute

### Rate Limit Headers

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Authentication

### Basic Authentication

Use HTTP Basic Authentication:

```bash
curl -u username:password \
  https://yoursite.com/wp-json/yatra/v1/tours
```

### JWT Authentication

Use JWT token in Authorization header:

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  https://yoursite.com/wp-json/yatra/v1/tours
```

### API Key Authentication

Use API key in header:

```bash
curl -H "X-API-Key: your-api-key" \
  https://yoursite.com/wp-json/yatra/v1/tours
```

## SDK Examples

### JavaScript/Node.js

```javascript
// Using fetch API
const response = await fetch('https://yoursite.com/wp-json/yatra/v1/tours', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

### PHP

```php
// Using WordPress HTTP API
$response = wp_remote_get('https://yoursite.com/wp-json/yatra/v1/tours', array(
  'headers' => array(
    'Authorization' => 'Bearer ' . $token,
    'Content-Type' => 'application/json'
  )
));

$body = wp_remote_retrieve_body($response);
$data = json_decode($body, true);
```

### Python

```python
import requests

headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
}

response = requests.get('https://yoursite.com/wp-json/yatra/v1/tours', headers=headers)
data = response.json()
print(data)
```

## Testing

### API Testing Tools

- **Postman**: Test API endpoints
- **Insomnia**: REST client for API testing
- **curl**: Command-line testing
- **HTTPie**: User-friendly curl alternative

### Test Examples

```bash
# Get tours
curl -X GET "https://yoursite.com/wp-json/yatra/v1/tours" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create booking
curl -X POST "https://yoursite.com/wp-json/yatra/v1/bookings" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tour_id": 123,
    "booking_date": "2024-06-15",
    "number_of_travelers": 2,
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }'
```

## Best Practices

### API Usage

- **Use appropriate HTTP methods**: GET for retrieval, POST for creation
- **Handle errors gracefully**: Check response status and error codes
- **Rate limiting**: Respect rate limits and implement backoff
- **Caching**: Cache responses when appropriate
- **Pagination**: Use pagination for large datasets

### Security

- **Use HTTPS**: Always use secure connections
- **Validate input**: Validate all input parameters
- **Sanitize output**: Sanitize all output data
- **Authentication**: Use strong authentication methods
- **API keys**: Keep API keys secure and rotate regularly

### Performance

- **Minimize requests**: Batch operations when possible
- **Use compression**: Enable gzip compression
- **Cache responses**: Cache frequently accessed data
- **Optimize queries**: Use efficient database queries

## Troubleshooting

### Common Issues

#### Authentication Errors

- **Check credentials**: Verify username/password or API key
- **Check token**: Ensure JWT token is valid and not expired
- **Check permissions**: Ensure user has required permissions

#### Validation Errors

- **Check parameters**: Verify all required parameters
- **Check data types**: Ensure correct data types
- **Check format**: Ensure correct data format

#### Rate Limit Errors

- **Check limits**: Monitor rate limit headers
- **Implement backoff**: Use exponential backoff
- **Cache responses**: Cache to reduce requests

### Debug Mode

Enable API debugging:

```php
// Enable API debugging
define('YATRA_API_DEBUG', true);

// Log API requests
function log_yatra_api_requests($request, $response) {
    error_log("Yatra API Request: " . print_r($request, true));
    error_log("Yatra API Response: " . print_r($response, true));
}
add_action('yatra_api_request', 'log_yatra_api_requests');
```

## Next Steps

After mastering the API:

1. **[FAQs](faqs)** - Find answers to common questions
2. **[Troubleshooting](troubleshooting)** - Resolve issues
3. **[Changelog](changelog)** - Version history and updates
4. **[Support](support)** - Get help from the team

---

**Pro Tip**: Always test API endpoints in a development environment before using them in production. Use appropriate error handling and implement retry logic for network requests.
