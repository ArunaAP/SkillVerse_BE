import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import dbConnect from "./config/dbConnect.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";
import briefRoute from "./routes/briefRoute.js";
import designRoute from "./routes/designRoute.js";
import searchRoutes from "./routes/searchRoute.js";
import chatRoute from "./routes/chatRoute.js";
import threadRoutes from "./routes/threadRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import { handleSocketConnection } from "./controllers/chatController.js";

dotenv.config();
dbConnect();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "https://my-frontend-app-e2jj.onrender.com",
  "http://localhost:5173",
];

const corsOptions = {
  origin: [
    "https://my-frontend-app-e2jj.onrender.com",
    "https://my-frontend-app-e2jj.onrender.com/",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS before routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: [
      "https://my-frontend-app-e2jj.onrender.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json()); // Middleware

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/auth/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/brief", briefRoute);
app.use("/api/design", designRoute);
app.use("/api", searchRoutes);
app.use("/api/chats", chatRoute);
app.use("/api/threads", threadRoutes);
app.use("/api/comments", commentRoutes);

// ✅ FIXED: Ensure Socket.IO properly handles connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id); // Debugging
  handleSocketConnection(socket, io);
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
