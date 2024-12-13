import  express  from "express";
import dotenv from "dotenv";
import dbConnect from './config/dbConnect.js'
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoutes.js"

dbConnect();

dotenv.config();
const app = express();

//Midleware
app.use(express.json());

//Routes
app.get("/", (req, res) => {
    res.send("Aa patiyo khmda..!");
  });

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)

//Start the server
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


