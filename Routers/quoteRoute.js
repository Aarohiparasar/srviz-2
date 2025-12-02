import express from "express";
import { generateQuote } from "../Controllers/quotesController.js"

const router = express.Router();

router.post("/generate", generateQuote);

export default router;
