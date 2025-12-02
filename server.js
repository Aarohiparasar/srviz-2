import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './DB/db.js'
import cookieParser from "cookie-parser";


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


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})