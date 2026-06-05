import { generateAIReview }
from "../services/aiReviewService.js";

import { readJSON }
from "../utils/jsonDB.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const notesPath = path.join(
  __dirname,
  "../data/notes.json"
);

export const getAIReview = async (
  req,
  res
) => {
  try {

    const {
      customer,
      matches
    } = req.body;

    const notes =
      await readJSON(notesPath);

    const customerNotes =
      notes.filter(
        note =>
          note.customerId === customer.id
      );

    const matchesWithNotes =
      matches.map(match => ({
        ...match,
        notes: notes.filter(
          note =>
            note.customerId === match.id
        )
      }));

    const review =
      await generateAIReview(
        customer,
        customerNotes,
        matchesWithNotes
      );

    res.json({
      success: true,
      data: review
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};