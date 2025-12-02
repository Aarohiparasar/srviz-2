import express from "express";
import { createLead } from "../Controllers/leadController.js";
import { getLeads } from "../Controllers/leadController.js";
import { updateLeadStatus } from "../Controllers/leadController.js";
const router = express.Router();

router.post("/createLead", createLead);
router.get("/getLeads", getLeads);
router.patch("/:id/status", updateLeadStatus);


export default router;
