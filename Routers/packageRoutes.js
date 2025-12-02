import express from "express";
import { getPackagesByEvent } from "../Controllers/packageController.js";

const router = express.Router();

// GET /api/events/:id/packages
router.get("/:id/packages", getPackagesByEvent);

export default router;
