import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'; 

import dbConnect from './config/dbConnect.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoutes.js';
import briefRoute from './routes/briefRoute.js';
import designRoute from './routes/designRoute.js';
import searchRoutes from './routes/searchRoute.js';
import { handleSocketConnection } from './controllers/chatController.js'; 

dotenv.config();
dbConnect();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, { 
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,DELETE,PUT',
  allowedHeaders: 'Content-Type, authorization',
  credentials: true, 
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Aa patiyo khmda..!");
});

app.use("/api/auth/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/brief", briefRoute);
app.use("/api/design", designRoute);
app.use('/api', searchRoutes);

// Socket.IO Setup with Controller
io.on('connection', (socket) => {
  handleSocketConnection(socket, io);
});

// Start the server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
