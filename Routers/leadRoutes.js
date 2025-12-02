import express from "express";
import { createLead } from "../Controllers/LeadController.js"

const router = express.Router();

router.post("/", createLead);

export default router;
