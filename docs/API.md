# API Documentation

Complete API reference for RemoteAccess Educational Tool.

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Auth Endpoints

### Register User

**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c72b8c8e4f1a",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Login

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c72b8c8e4f1a",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Get Current User

**GET** `/auth/me`

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "60d5ec49f1b2c72b8c8e4f1a",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

---

## Device Endpoints

### Get All Devices

**GET** `/devices`

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "devices": [
    {
      "deviceId": "abc123",
      "deviceName": "Samsung Galaxy S21",
      "model": "SM-G991B",
      "androidVersion": "12",
      "isOnline": true,
      "lastSeen": "2024-01-15T10:30:00Z",
      "consentGiven": true
    }
  ]
}
```

### Register Device

**POST** `/devices/register`

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "deviceId": "abc123",
  "deviceName": "Samsung Galaxy S21",
  "model": "SM-G991B",
  "manufacturer": "Samsung",
  "androidVersion": "12",
  "appVersion": "1.0",
  "consentGiven": true
}
```

**Response:**
```json
{
  "success": true,
  "device": {
    "deviceId": "abc123",
    "deviceName": "Samsung Galaxy S21",
    "isOnline": true,
    "registeredAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Device Details

**GET** `/devices/:deviceId`

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "device": {
    "deviceId": "abc123",
    "deviceName": "Samsung Galaxy S21",
    "model": "SM-G991B",
    "permissions": [
      { "name": "READ_SMS", "granted": true },
      { "name": "CAMERA", "granted": false }
    ],
    "isOnline": true,
    "lastSeen": "2024-01-15T10:30:00Z"
  }
}
```

### Update Device Permissions

**PUT** `/devices/:deviceId/permissions`

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "permissions": [
    { "name": "READ_SMS", "granted": true },
    { "name": "CAMERA", "granted": true }
  ]
}
```

### Delete Device

**DELETE** `/devices/:deviceId`

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "message": "Device removed successfully"
}
```

### Get Device Activity Logs

**GET** `/devices/:deviceId/logs`

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "logs": [
    {
      "action": "device_registered",
      "timestamp": "2024-01-15T10:30:00Z",
      "details": { "deviceName": "Samsung Galaxy S21" }
    }
  ]
}
```

---

## APK Builder Endpoints

### Build APK Configuration

**POST** `/apk/build`

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "appName": "My Remote App",
  "packageName": "com.example.myapp",
  "serverUrl": "https://your-server.com",
  "permissions": ["INTERNET", "READ_SMS", "CAMERA"],
  "iconUrl": "https://example.com/icon.png"
}
```

**Response:**
```json
{
  "success": true,
  "buildConfig": {
    "buildId": "uuid-here",
    "appName": "My Remote App",
    "packageName": "com.example.myapp",
    "status": "pending"
  },
  "instructions": {
    "nextSteps": [
      "1. Download Android Studio project template",
      "2. Update AndroidManifest.xml with selected permissions",
      "..."
    ]
  }
}
```

### Get Available Permissions

**GET** `/apk/permissions`

**Response:**
```json
{
  "success": true,
  "permissions": [
    {
      "name": "INTERNET",
      "description": "Network communication",
      "required": true
    },
    {
      "name": "READ_SMS",
      "description": "Read SMS messages",
      "required": false
    }
  ]
}
```

### Download APK Template

**GET** `/apk/template/download`

**Headers:** `Authorization: Bearer TOKEN`

**Response:** ZIP file download

---

## Socket.io Events

### Client → Server

**device:register**
```json
{
  "deviceId": "abc123",
  "deviceName": "Samsung Galaxy S21",
  "model": "SM-G991B",
  "androidVersion": "12"
}
```

**device:heartbeat**
```json
{
  "deviceId": "abc123"
}
```

**device:response**
```json
{
  "deviceId": "abc123",
  "command": "get_location",
  "result": { "lat": 40.7128, "lng": -74.0060 }
}
```

### Server → Client

**device:connected**
```json
{
  "deviceId": "abc123",
  "deviceName": "Samsung Galaxy S21",
  "connectedAt": "2024-01-15T10:30:00Z"
}
```

**device:disconnected**
```json
{
  "deviceId": "abc123"
}
```

**command:execute**
```json
{
  "command": "get_location",
  "params": {}
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per window
- **Headers:**
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Pagination

For endpoints returning lists:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```
