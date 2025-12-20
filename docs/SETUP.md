# Setup Guide

Complete setup instructions for RemoteAccess Educational Tool.

## Prerequisites

- **Node.js** 16 or higher
- **MongoDB** 4.4 or higher
- **Android Studio** (for Android app development)
- **JDK** 11 or higher
- **Git**

---

## Backend Setup

### 1. Clone Repository

```bash
git clone https://github.com/kishan7878/RemoteAccess-Educational.git
cd RemoteAccess-Educational
```

### 2. Install MongoDB

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)

### 3. Configure Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/remoteaccess
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 4. Start Backend Server

```bash
npm start
```

Server will run on `http://localhost:5000`

---

## Frontend Setup

### 1. Open Frontend

```bash
cd frontend
```

### 2. Update API URL

Edit `frontend/js/app.js`:
```javascript
const API_URL = 'http://YOUR_SERVER_IP:5000/api';
const SOCKET_URL = 'http://YOUR_SERVER_IP:5000';
```

### 3. Serve Frontend

**Option 1: Using Live Server (VS Code)**
- Install Live Server extension
- Right-click `index.html` → Open with Live Server

**Option 2: Using Python**
```bash
python3 -m http.server 3000
```

**Option 3: Using Node.js**
```bash
npx http-server -p 3000
```

Access at `http://localhost:3000`

---

## Android App Setup

### 1. Open in Android Studio

```bash
cd android
```

Open this folder in Android Studio.

### 2. Configure Server URL

Edit `PreferenceManager.java`:
```java
public String getServerUrl() {
    return preferences.getString(KEY_SERVER_URL, "http://YOUR_SERVER_IP:5000");
}
```

### 3. Update Package Name (Optional)

In `build.gradle`:
```gradle
defaultConfig {
    applicationId "com.yourcompany.yourapp"
    ...
}
```

### 4. Build APK

**Debug Build:**
```bash
./gradlew assembleDebug
```

**Release Build:**
```bash
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/`

---

## Testing

### 1. Start Backend
```bash
cd backend
npm start
```

### 2. Open Admin Panel
Navigate to `http://localhost:3000`

### 3. Register Account
- Create new account
- Login to dashboard

### 4. Install Android App
- Transfer APK to Android device
- Install and open app
- Grant consent
- Check admin panel for connected device

---

## Deployment

### Backend Deployment (Heroku)

```bash
cd backend
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)

```bash
cd frontend
# Deploy using Netlify CLI or Vercel CLI
```

---

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Restart MongoDB
sudo systemctl restart mongodb
```

### Socket.io Connection Failed
- Check firewall settings
- Ensure server URL is correct
- Verify CORS configuration

### Android App Not Connecting
- Check server URL in PreferenceManager
- Ensure device and server are on same network
- Check Android permissions

---

## Security Recommendations

1. **Change default credentials** in `.env`
2. **Use HTTPS** in production
3. **Enable MongoDB authentication**
4. **Implement rate limiting**
5. **Regular security audits**

---

## Next Steps

- Read [API Documentation](API.md)
- Review [Security Best Practices](SECURITY.md)
- Customize features as needed

---

## Support

For issues and questions:
- GitHub Issues: [Create Issue](https://github.com/kishan7878/RemoteAccess-Educational/issues)
- Email: decentkishan78@gmail.com
