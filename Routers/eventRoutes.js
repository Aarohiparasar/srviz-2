import express from "express";
import { createEvent, getEvents } from "../Controllers/eventController.js";

const router = express.Router();

router.post("/createEvent", createEvent);  
router.get("/getEvents", getEvents);   

export default router;
