const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const deviceRoutes = require('./routes/devices');
const apkRoutes = require('./routes/apk');
const { authenticateSocket } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/apk', apkRoutes);

// Serve static files (frontend)
app.use(express.static('../frontend'));

// Socket.io - Real-time Communication
const connectedDevices = new Map();

io.use(authenticateSocket);

io.on('connection', (socket) => {
  console.log('🔌 New connection:', socket.id);

  // Device Registration
  socket.on('device:register', (data) => {
    const deviceInfo = {
      socketId: socket.id,
      deviceId: data.deviceId,
      deviceName: data.deviceName,
      model: data.model,
      androidVersion: data.androidVersion,
      connectedAt: new Date(),
      lastSeen: new Date()
    };
    
    connectedDevices.set(data.deviceId, deviceInfo);
    
    // Notify admin panel
    io.emit('device:connected', deviceInfo);
    
    console.log('📱 Device registered:', data.deviceId);
  });

  // Device Heartbeat
  socket.on('device:heartbeat', (data) => {
    const device = connectedDevices.get(data.deviceId);
    if (device) {
      device.lastSeen = new Date();
      connectedDevices.set(data.deviceId, device);
    }
  });

  // Admin Commands
  socket.on('admin:command', (data) => {
    const device = connectedDevices.get(data.deviceId);
    if (device) {
      io.to(device.socketId).emit('command:execute', {
        command: data.command,
        params: data.params
      });
      console.log('📤 Command sent to device:', data.deviceId, data.command);
    }
  });

  // Device Response
  socket.on('device:response', (data) => {
    io.emit('device:data', data);
    console.log('📥 Device response:', data.deviceId);
  });

  // Disconnect
  socket.on('disconnect', () => {
    // Find and remove disconnected device
    for (let [deviceId, device] of connectedDevices.entries()) {
      if (device.socketId === socket.id) {
        connectedDevices.delete(deviceId);
        io.emit('device:disconnected', { deviceId });
        console.log('📴 Device disconnected:', deviceId);
        break;
      }
    }
  });
});

// API endpoint to get connected devices
app.get('/api/devices/connected', (req, res) => {
  const devices = Array.from(connectedDevices.values());
  res.json({ success: true, devices });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    connectedDevices: connectedDevices.size
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ 
    success: false, 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

module.exports = { app, io };
