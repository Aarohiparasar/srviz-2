import express from "express";
import { createEvent, getEvents } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);  
router.get("/", getEvents);   

export default router;
