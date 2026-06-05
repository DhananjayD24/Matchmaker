import express from "express";

import {
  getMatches,
  sendMatch,
  getSentMatches
}
from "../controller/matchController.js";

const router = express.Router();

router.get("/:customerId", getMatches);

router.post("/send", sendMatch);

router.get(
  "/sent/:customerId",
  getSentMatches
);

export default router;