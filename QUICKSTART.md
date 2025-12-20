# 🚀 Quick Start Guide

Get RemoteAccess Educational up and running in 10 minutes!

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js 16+ installed (`node --version`)
- [ ] MongoDB installed and running
- [ ] Git installed
- [ ] Android Studio (for Android app)
- [ ] Basic terminal/command line knowledge

---

## Step 1: Clone & Setup (2 minutes)

```bash
# Clone repository
git clone https://github.com/kishan7878/RemoteAccess-Educational.git
cd RemoteAccess-Educational

# Verify structure
ls -la
# You should see: backend/, frontend/, android/, docs/
```

---

## Step 2: Start MongoDB (1 minute)

```bash
# Ubuntu/Debian
sudo systemctl start mongodb
sudo systemctl status mongodb

# macOS
brew services start mongodb-community

# Windows
# Start MongoDB from Services or MongoDB Compass
```

---

## Step 3: Backend Setup (3 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env (use nano, vim, or any editor)
nano .env
```

**Minimal .env configuration:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/remoteaccess
JWT_SECRET=your_secret_key_change_this
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

```bash
# Start server
npm start

# You should see:
# ✅ MongoDB Connected
# 🚀 Server running on port 5000
```

**Keep this terminal open!**

---

## Step 4: Frontend Setup (1 minute)

Open **new terminal**:

```bash
cd RemoteAccess-Educational/frontend

# Option 1: Using Python
python3 -m http.server 3000

# Option 2: Using Node.js
npx http-server -p 3000

# Option 3: Using VS Code Live Server
# Right-click index.html → Open with Live Server
```

**Access:** http://localhost:3000

---

## Step 5: Test Web Dashboard (2 minutes)

1. **Open browser:** http://localhost:3000

2. **Register account:**
   - Name: Your Name
   - Email: test@example.com
   - Password: password123

3. **Login** with credentials

4. **You should see:**
   - Dashboard with navigation
   - "Devices" page (empty initially)
   - "APK Builder" option
   - "Activity Logs" option

✅ **Backend & Frontend working!**

---

## Step 6: Build Android App (Optional - 5 minutes)

If you want to test the Android app:

```bash
cd RemoteAccess-Educational/android

# Build debug APK
./gradlew assembleDebug

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

**Transfer APK to Android device:**
```bash
# Using ADB
adb install app/build/outputs/apk/debug/app-debug.apk

# Or manually:
# 1. Copy APK to device
# 2. Enable "Unknown sources"
# 3. Install APK
```

---

## Step 7: Test Complete Flow (3 minutes)

### On Android Device:

1. **Open app**
2. **Read consent terms**
3. **Check "I agree"**
4. **Click "Accept & Continue"**
5. **Grant permissions** (at least INTERNET)
6. **App shows:** "✓ Remote Access Active"

### On Web Dashboard:

1. **Refresh "Devices" page**
2. **You should see your device:**
   - Device name
   - Model
   - Android version
   - "Online" status (green)

✅ **Complete system working!**

---

## Troubleshooting

### Backend won't start

```bash
# Check MongoDB
sudo systemctl status mongodb

# Check port 5000
lsof -i :5000

# Check logs
npm start
```

### Frontend can't connect

1. Check backend is running
2. Verify URL in `frontend/js/app.js`:
   ```javascript
   const API_URL = 'http://localhost:5000/api';
   ```

### Android app won't connect

1. **Update server URL** in `PreferenceManager.java`:
   ```java
   return "http://YOUR_COMPUTER_IP:5000";
   ```

2. **Find your IP:**
   ```bash
   # Linux/Mac
   ifconfig | grep inet
   
   # Windows
   ipconfig
   ```

3. **Ensure same network** (device and computer)

4. **Check firewall** (allow port 5000)

---

## Next Steps

### Explore Features

1. **APK Builder:**
   - Go to "APK Builder" in dashboard
   - Enter app details
   - Select permissions
   - Generate configuration

2. **Device Management:**
   - View device details
   - Check activity logs
   - Remove devices

3. **Real-time Updates:**
   - Disconnect device (close app)
   - Watch status change to "Offline"
   - Reconnect and see "Online"

### Learn More

- **[Full Setup Guide](docs/SETUP.md)** - Detailed instructions
- **[API Documentation](docs/API.md)** - API reference
- **[Security Guide](docs/SECURITY.md)** - Best practices
- **[FAQ](docs/FAQ.md)** - Common questions

### Customize

1. **Change app name:**
   - Edit `android/app/src/main/res/values/strings.xml`

2. **Add features:**
   - Study `SocketManager.java` for commands
   - Add handlers in backend `server.js`

3. **Modify UI:**
   - Edit `frontend/index.html` and `css/style.css`

---

## Quick Commands Reference

```bash
# Start MongoDB
sudo systemctl start mongodb

# Start Backend
cd backend && npm start

# Start Frontend
cd frontend && python3 -m http.server 3000

# Build Android APK
cd android && ./gradlew assembleDebug

# Check logs
# Backend: Terminal output
# Android: adb logcat | grep RemoteAccess
```

---

## Development Workflow

```bash
# Terminal 1: MongoDB
sudo systemctl start mongodb

# Terminal 2: Backend
cd backend
npm run dev  # Auto-restart on changes

# Terminal 3: Frontend
cd frontend
# Use Live Server for auto-reload

# Terminal 4: Android
cd android
./gradlew installDebug  # Install on connected device
adb logcat | grep RemoteAccess  # View logs
```

---

## Production Deployment

For production use:

1. **Update .env:**
   ```env
   NODE_ENV=production
   JWT_SECRET=very_long_random_secret_key
   ```

2. **Enable HTTPS**
3. **Use production MongoDB**
4. **Build release APK:**
   ```bash
   ./gradlew assembleRelease
   ```

See [SETUP.md](docs/SETUP.md) for detailed deployment guide.

---

## Getting Help

- **Issues:** [GitHub Issues](https://github.com/kishan7878/RemoteAccess-Educational/issues)
- **Email:** decentkishan78@gmail.com
- **Docs:** [Documentation](docs/)

---

## Success Checklist

- [ ] MongoDB running
- [ ] Backend server started (port 5000)
- [ ] Frontend accessible (port 3000)
- [ ] Can register/login
- [ ] Dashboard loads
- [ ] Android APK built (optional)
- [ ] Device connects and shows online

**All checked? Congratulations! 🎉**

You're ready to explore and learn!

---

**Time to complete:** ~10-15 minutes  
**Difficulty:** Beginner-friendly  
**Support:** Available via GitHub Issues

Happy Learning! 🎓
