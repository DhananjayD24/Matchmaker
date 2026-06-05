import express from "express";
import { getAIReview } from "../controller/aiController.js";

const router = express.Router();

router.post("/review", getAIReview);

export default router;