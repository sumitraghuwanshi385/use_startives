// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// 🔥 IMPORTANT CHANGE
dotenv.config({ path: __dirname + '/.env' });

// DB
const connectDB = require('./config/db');
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const startalkRoutes = require('./routes/startalkRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const chatRoutes = require('./routes/chatRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

/* ================= SOCKET SETUP ================= */

// Create HTTP server from express
const server = http.createServer(app);

// Attach socket.io to HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Codespaces testing ke liye open
    methods: ["GET", "POST"]
  }
});

// Socket connection handler
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // Join user room
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// Make io accessible in routes/controllers
app.set("io", io);

/* ================= MIDDLEWARES ================= */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options(/.*/, cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ================= ROUTES ================= */

app.get('/', (req, res) => {
  res.send('Startives API is running...');
});

app.get('/test123', (req,res)=>{
  res.send("TEST OK")
})

app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/startalks', startalkRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/applications', applicationRoutes);

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});