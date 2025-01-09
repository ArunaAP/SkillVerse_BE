import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/dbConnect.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoutes.js';
import briefRoute from './routes/briefRoute.js';
import designRoute from './routes/designRoute.js';

dotenv.config();
dbConnect();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5174', // Allow requests from your React app
  methods: 'GET,POST', // You can restrict methods as needed
  allowedHeaders: 'Content-Type, authorization', // Allow headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors({ origin: 'http://localhost:5173' }));

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

// Start the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
