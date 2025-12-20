# Frequently Asked Questions (FAQ)

## General Questions

### What is RemoteAccess Educational?
RemoteAccess Educational is a consent-based device management platform designed for learning purposes. It demonstrates how remote access systems work while maintaining ethical and legal standards.

### Is this legal to use?
Yes, when used properly:
- ✅ On your own devices
- ✅ With explicit user consent
- ✅ For educational purposes
- ✅ In controlled environments

❌ Illegal uses include unauthorized access, privacy invasion, or malicious activities.

### What can I learn from this project?
- Network programming with Socket.io
- Client-server architecture
- Android app development
- RESTful API design
- Database management
- Real-time communication
- Security best practices

---

## Setup & Installation

### What are the system requirements?

**Backend:**
- Node.js 16+
- MongoDB 4.4+
- 512MB RAM minimum
- 1GB disk space

**Android:**
- Android 7.0 (API 24) or higher
- Internet connection
- 50MB storage space

### How do I install MongoDB?

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
```

**macOS:**
```bash
brew install mongodb-community
```

**Windows:**
Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)

### The server won't start. What should I do?

1. Check if MongoDB is running:
   ```bash
   sudo systemctl status mongodb
   ```

2. Verify `.env` configuration
3. Check if port 5000 is available
4. Review error logs
5. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

---

## Android App

### How do I build the APK?

```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/`

### The app won't connect to the server. Why?

Common issues:
1. **Wrong server URL** - Check `PreferenceManager.java`
2. **Firewall blocking** - Allow port 5000
3. **Different networks** - Ensure device and server are on same network
4. **Server not running** - Start backend server first

### How do I change the server URL?

Edit `PreferenceManager.java`:
```java
public String getServerUrl() {
    return preferences.getString(KEY_SERVER_URL, "http://YOUR_IP:5000");
}
```

### What permissions does the app need?

**Required:**
- INTERNET
- ACCESS_NETWORK_STATE
- FOREGROUND_SERVICE

**Optional (user selectable):**
- READ_SMS, SEND_SMS
- READ_CONTACTS
- READ_CALL_LOG
- CAMERA, RECORD_AUDIO
- ACCESS_FINE_LOCATION
- READ/WRITE_EXTERNAL_STORAGE

---

## Features & Functionality

### How does the consent mechanism work?

1. User opens app
2. Consent screen appears
3. User reads terms
4. User checks agreement box
5. User grants permissions
6. Service starts
7. Device connects to server

### Can I revoke consent?

Yes! Click "Revoke Access" in the main app screen. This will:
- Stop the background service
- Disconnect from server
- Clear consent status

### How do I customize the APK?

Use the APK Builder in admin panel:
1. Login to dashboard
2. Go to "APK Builder"
3. Enter app name, package name
4. Select permissions
5. Set server URL
6. Generate configuration
7. Follow build instructions

### What commands are supported?

Current version supports:
- `ping` - Test connection
- `get_device_info` - Get device details

Future versions will add:
- Location tracking
- SMS management
- File access
- Camera/microphone
- And more...

---

## Security & Privacy

### Is my data secure?

Security measures:
- JWT authentication
- Password hashing (bcrypt)
- HTTPS support (in production)
- Input validation
- Rate limiting
- Activity logging

### What data is collected?

**Device Information:**
- Device ID (Android ID)
- Device name
- Model and manufacturer
- Android version
- App version

**Activity Data:**
- Connection timestamps
- Commands executed
- User actions

**NOT collected:**
- Personal messages
- Passwords
- Financial data
- Unnecessary personal info

### How long is data stored?

- **Activity logs:** 90 days (configurable)
- **Device info:** Until device is removed
- **User accounts:** Until account deletion

### Can I delete my data?

Yes! You can:
1. Remove devices from dashboard
2. Delete your account
3. Request data deletion via email

---

## Troubleshooting

### Socket connection keeps disconnecting

Solutions:
1. Check internet stability
2. Increase ping timeout in server config
3. Verify firewall settings
4. Check server logs for errors

### MongoDB connection failed

```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/remoteaccess
```

### "Permission denied" errors

1. Check Android permissions in app settings
2. Grant required permissions manually
3. Reinstall app if needed
4. Check Android version compatibility

### APK won't install

1. Enable "Unknown sources" in Android settings
2. Check Android version (7.0+ required)
3. Ensure sufficient storage
4. Try debug build first

---

## Development

### How do I contribute?

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Can I use this in production?

This is an **educational tool**. For production:
1. Implement additional security
2. Add proper error handling
3. Set up monitoring
4. Use HTTPS
5. Conduct security audit
6. Ensure legal compliance

### How do I add new commands?

1. **Backend:** Add command handler in `SocketManager.js`
2. **Android:** Implement command in `SocketManager.java`
3. **Frontend:** Add UI controls in dashboard

Example:
```javascript
// Backend
socket.on('admin:command', (data) => {
  if (data.command === 'my_command') {
    // Handle command
  }
});

// Android
private void handleCommand(String command, JSONObject params) {
  switch (command) {
    case "my_command":
      // Execute command
      break;
  }
}
```

### How do I deploy to production?

See [SETUP.md](SETUP.md) deployment section.

Quick steps:
1. Set up HTTPS
2. Configure production database
3. Update environment variables
4. Deploy backend (Heroku/AWS/etc.)
5. Deploy frontend (Netlify/Vercel)
6. Build release APK

---

## Legal & Ethical

### Is this a hacking tool?

No. This is an **educational tool** for learning:
- Network programming
- Android development
- Client-server architecture
- Security concepts

It requires explicit user consent and is designed for legitimate use cases.

### What are legitimate use cases?

✅ **Allowed:**
- Personal device management
- Parental control (with consent)
- Educational demonstrations
- Security research (controlled)
- Learning programming concepts

❌ **Not Allowed:**
- Unauthorized access
- Spying or stalking
- Data theft
- Privacy invasion
- Any illegal activities

### What if someone misuses this?

Users are **solely responsible** for their use. The project:
- Includes clear disclaimers
- Requires consent mechanism
- Logs all activities
- Follows ethical guidelines

Report misuse to: decentkishan78@gmail.com

---

## Support

### Where can I get help?

1. **Documentation:** Read [SETUP.md](SETUP.md), [API.md](API.md), [SECURITY.md](SECURITY.md)
2. **GitHub Issues:** [Create an issue](https://github.com/kishan7878/RemoteAccess-Educational/issues)
3. **Email:** decentkishan78@gmail.com

### How do I report a bug?

1. Check if already reported
2. Create GitHub issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots if applicable

### How do I request a feature?

1. Check existing requests
2. Create GitHub issue with:
   - Use case description
   - Expected behavior
   - Why it's useful
   - Implementation ideas (optional)

---

## Updates & Maintenance

### How often is this updated?

- **Bug fixes:** As needed
- **Features:** Based on roadmap
- **Security:** Immediate for critical issues

### How do I stay updated?

1. **Watch** the GitHub repository
2. **Star** for notifications
3. Check [CHANGELOG.md](../CHANGELOG.md)
4. Follow commit history

### Is there a roadmap?

Yes! See [CHANGELOG.md](../CHANGELOG.md) for planned features.

---

## Still have questions?

- 📧 Email: decentkishan78@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/kishan7878/RemoteAccess-Educational/issues)
- 📖 Docs: [Documentation](.)

**Remember: Use responsibly and ethically!** 🎓
