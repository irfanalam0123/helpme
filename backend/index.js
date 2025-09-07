import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRouter.js";
import profileRoutes from "./routes/profileRoutes.js"
import cors from "cors";
import path from "path"

dotenv.config();
connectDB();

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);


// app.use(express.static(path.join(__dirname,'/frontend/dist')))

// app.get("*",(req,res) =>{
//   res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
// })

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// 

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(5000, () => console.log("🚀 Server running on port 5000"))