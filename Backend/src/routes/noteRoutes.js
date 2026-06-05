import express from "express";
import {
  getNotesByCustomer,
  addNote
} from "../controller/noteController.js";

const router = express.Router();

router.get("/:customerId", getNotesByCustomer);
router.post("/", addNote);

export default router;