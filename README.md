# 🔐 RemoteAccess Educational Tool - Advanced Edition

**A consent-based, educational remote device management platform with 60+ advanced features**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Android](https://img.shields.io/badge/Android-7.0+-blue.svg)](https://www.android.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-brightgreen.svg)](https://www.mongodb.com/)
[![Features](https://img.shields.io/badge/Features-60+-red.svg)](FEATURES_COMPLETE.md)

---

## ⚠️ EDUCATIONAL PURPOSE ONLY

**This is an ADVANCED educational tool demonstrating remote access technologies with FULL USER CONSENT.**

### ✅ Legal & Ethical Use:
- ✅ Personal device management (your own devices)
- ✅ Parental control (with child's knowledge & consent)
- ✅ Educational learning and security research
- ✅ Authorized device monitoring

### ❌ Illegal & Prohibited:
- ❌ Unauthorized device access
- ❌ Privacy invasion or stalking
- ❌ Data theft or surveillance without consent
- ❌ Any malicious activities

**Users are solely responsible for legal compliance. All features require explicit user consent.**

---

## 🚀 Advanced Features (60+)

### **📱 Device Control & Monitoring**
- ✅ Real-time screen monitoring (MediaProjection API)
- ✅ Educational keylogger (Accessibility Service)
- ✅ Audio recording with microphone
- ✅ Device information & system stats
- ✅ Battery, network, storage monitoring
- ✅ GPS location tracking
- ✅ Clipboard access
- ✅ Vibration & sound control

### **💬 Communication Access**
- ✅ SMS read/send/delete
- ✅ Call logs with statistics
- ✅ Contact management
- ✅ Phone number filtering

### **📂 File System Operations**
- ✅ Browse directories
- ✅ Read/write files (text & binary)
- ✅ Copy/move/delete files
- ✅ Create directories
- ✅ File search
- ✅ Installed apps list

### **🎤 Media Capabilities**
- ✅ Audio recording & playback
- ✅ Camera access (front/back)
- ✅ Screenshot capture
- ✅ Screen recording

### **🔐 Security & Privacy**
- ✅ Consent-based activation
- ✅ Runtime permission requests
- ✅ Visible notifications
- ✅ Easy revocation
- ✅ Activity logging
- ✅ Transparent operation

**[View Complete Features List →](FEATURES_COMPLETE.md)**

---

## 🎯 What Makes This Advanced?

### **Real RAT Capabilities (Ethical Implementation):**

| Feature | Commercial RAT | This Project |
|---------|---------------|--------------|
| Screen Monitoring | ✅ | ✅ (with consent) |
| Keylogging | ✅ | ✅ (educational) |
| Audio Recording | ✅ | ✅ (with permission) |
| File Access | ✅ | ✅ (authorized) |
| SMS/Calls | ✅ | ✅ (user approved) |
| Location | ✅ | ✅ (GPS permission) |
| **User Consent** | ❌ | ✅ **REQUIRED** |
| **Visible** | ❌ | ✅ **ALWAYS** |
| **Legal** | ❌ | ✅ **COMPLIANT** |

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Web Admin     │◄───────►│   Node.js       │◄───────►│    MongoDB      │
│   Dashboard     │  HTTP   │   Backend       │  Data   │    Database     │
│  (Bootstrap)    │         │  (Express.js)   │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                     ▲
                                     │ Socket.io
                                     │ (WebSocket)
                                     ▼
                            ┌─────────────────┐
                            │   Android App   │
                            │  ────────────   │
                            │  • Keylogger    │
                            │  • Screen Mon.  │
                            │  • Audio Rec.   │
                            │  • File Access  │
                            │  • SMS/Calls    │
                            │  • Location     │
                            └─────────────────┘
```

---

## 📦 Complete Feature Set

### **1. Device Information (10 commands)**
```javascript
ping, get_device_info, get_battery_info, get_network_info, 
get_system_info, get_location, vibrate, play_sound, 
get_clipboard, set_clipboard
```

### **2. SMS Management (4 commands)**
```javascript
get_all_sms, get_sms_from_number, send_sms, delete_sms
```

### **3. Call Logs (4 commands)**
```javascript
get_all_call_logs, get_call_logs_by_type, 
get_call_logs_from_number, get_call_statistics
```

### **4. Contacts (2 commands)**
```javascript
get_all_contacts, search_contacts
```

### **5. File Operations (10 commands)**
```javascript
list_files, read_file, write_file, delete_file, copy_file, 
move_file, create_directory, get_file_info, search_files, 
get_installed_apps
```

### **6. Screen Monitoring (2 commands)**
```javascript
start_screen_monitoring, capture_screenshot
```

### **7. Audio Recording (5 commands)**
```javascript
start_recording, stop_recording, get_recording_status, 
list_recordings, delete_recording
```

### **8. Keylogger (3 commands)**
```javascript
enable_keylogger, get_keylogs, clear_logs
```

### **9. Camera (2 commands)**
```javascript
get_available_cameras, take_photo
```

**Total: 42+ Commands**

---

## 🚀 Quick Start

### **1. Clone Repository**
```bash
git clone https://github.com/kishan7878/RemoteAccess-Educational.git
cd RemoteAccess-Educational
```

### **2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### **3. Frontend Setup**
```bash
cd frontend
python3 -m http.server 3000
# Or use Live Server
```

### **4. Build Android APK**
```bash
cd android
./gradlew assembleDebug
```

**[Detailed Setup Guide →](docs/SETUP.md)**

---

## 📖 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - 10-minute setup
- **[Complete Features](FEATURES_COMPLETE.md)** - All 60+ features
- **[Advanced Features](docs/ADVANCED_FEATURES.md)** - Command reference
- **[Setup Guide](docs/SETUP.md)** - Installation instructions
- **[API Documentation](docs/API.md)** - API endpoints
- **[Security Guide](docs/SECURITY.md)** - Best practices
- **[FAQ](docs/FAQ.md)** - Common questions

---

## 🔐 Permission Requirements

### **Android Permissions:**
```xml
<!-- Required -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />

<!-- Advanced Features -->
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.SEND_SMS" />
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.READ_CALL_LOG" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### **Special Permissions:**
- **Accessibility Service** - For keylogger (user enables manually)
- **MediaProjection** - For screen monitoring (user approves dialog)

---

## 🎓 Educational Value

### **Learn:**
- ✅ Full-stack development (Node.js + Android)
- ✅ Real-time communication (Socket.io)
- ✅ Android advanced APIs (MediaProjection, Accessibility)
- ✅ Permission handling & security
- ✅ Database management (MongoDB)
- ✅ RESTful API design
- ✅ WebSocket implementation
- ✅ Ethical hacking concepts

### **Understand:**
- ✅ How RATs work (ethically)
- ✅ Android security model
- ✅ Permission systems
- ✅ Real-time monitoring
- ✅ Client-server architecture

---

## 🔧 Tech Stack

### **Backend:**
- Node.js + Express.js
- Socket.io (real-time)
- MongoDB + Mongoose
- JWT authentication
- bcrypt (password hashing)

### **Frontend:**
- HTML5/CSS3/JavaScript
- Bootstrap 5
- Socket.io Client

### **Android:**
- Java
- Socket.io Android
- MediaProjection API
- Accessibility Service
- Camera2 API
- MediaRecorder

---

## ⚠️ Important Disclaimers

### **User Consent Required:**
When installing, users see:
```
⚠️ EDUCATIONAL PURPOSE ONLY

This application includes advanced monitoring:
✓ Screen monitoring (requires permission)
✓ Audio recording (requires permission)  
✓ Keylogger (requires Accessibility Service)
✓ File access (requires permission)
✓ SMS/Call logs (requires permission)

All features require explicit consent.
You can revoke access anytime.
```

### **Visibility:**
- ✅ App icon always visible
- ✅ Foreground notification shown
- ✅ Accessibility service visible in Settings
- ✅ Screen recording notification
- ✅ All permissions requested explicitly

### **User Control:**
- ✅ One-tap revoke access
- ✅ Disable in Android Settings
- ✅ Uninstall anytime
- ✅ Clear all data

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📝 License

MIT License - See [LICENSE](LICENSE)

**Educational Use Disclaimer:** For educational purposes only. Users responsible for legal compliance.

---

## 👨‍💻 Author

**Shree Kishan Mishra**
- GitHub: [@kishan7878](https://github.com/kishan7878)
- Email: decentkishan78@gmail.com

---

## 🌟 Project Stats

- **Total Files:** 60+
- **Lines of Code:** 8000+
- **Features:** 60+
- **Commands:** 42+
- **Documentation Pages:** 10+
- **Languages:** JavaScript, Java, HTML, CSS

---

## 📊 Feature Comparison

### **Basic vs Advanced:**

| Feature Category | Basic | Advanced (This) |
|-----------------|-------|-----------------|
| Device Info | ✅ | ✅ |
| SMS/Calls | ❌ | ✅ |
| Contacts | ❌ | ✅ |
| File Access | ❌ | ✅ |
| Screen Monitor | ❌ | ✅ |
| Keylogger | ❌ | ✅ |
| Audio Record | ❌ | ✅ |
| Camera | ❌ | ✅ |

---

## 🎯 Use Cases

### **1. Personal Device Management**
Monitor your own devices, backup data, remote access

### **2. Parental Control**
Monitor child's device with their knowledge and consent

### **3. Security Research**
Learn Android security, understand monitoring techniques

### **4. Educational Demonstrations**
Teach cybersecurity, demonstrate RAT capabilities ethically

---

## 🚨 Legal Notice

**This tool demonstrates advanced remote access capabilities for EDUCATIONAL purposes.**

- ✅ Use on devices you own
- ✅ Use with explicit consent
- ✅ Use for learning
- ❌ Do NOT use for unauthorized access
- ❌ Do NOT use for privacy invasion
- ❌ Do NOT use for illegal activities

**Violation of these terms may result in criminal prosecution.**

---

## 📚 Additional Resources

- [Android Permissions Guide](https://developer.android.com/guide/topics/permissions/overview)
- [MediaProjection API](https://developer.android.com/reference/android/media/projection/MediaProjection)
- [Accessibility Service](https://developer.android.com/guide/topics/ui/accessibility/service)
- [Socket.io Documentation](https://socket.io/docs/)

---

## ⭐ Star This Project

If you find this educational tool helpful, please give it a star! ⭐

---

**Made with ❤️ for education and ethical learning**

**GitHub:** https://github.com/kishan7878/RemoteAccess-Educational

**Remember: Use responsibly, ethically, and legally!** 🎓
