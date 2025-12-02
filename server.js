import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './DB/db.js'
import cookieParser from "cookie-parser";
import leadRoutes from "./Routers/leadRoutes.js";
import eventRoutes from "./Routers/eventRoutes.js";
import packageRoutes from "./Routers/packageRoutes.js";

const app=express()
dotenv.config()
app.use(cookieParser());


app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())

const PORT=process.env.PORT || 5010

connectDB()

// Updated Health Route
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date(),
    });
});
app.use("/api/leads", leadRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events", packageRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})