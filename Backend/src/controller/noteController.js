import path from "path";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "../utils/jsonDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesPath = path.join(
  __dirname,
  "../data/notes.json"
);

export const getNotesByCustomer = async (req, res) => {
  try {
    const customerId = Number(req.params.customerId);

    const notes = await readJSON(notesPath);

    const customerNotes = notes.filter(
      (note) => note.customerId === customerId
    );

    res.json({
      success: true,
      count: customerNotes.length,
      data: customerNotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addNote = async (req, res) => {
  try {
    const { customerId, note } = req.body;

    const notes = await readJSON(notesPath);

    const newNote = {
      id: Date.now(),
      customerId: Number(customerId),
      note,
      createdAt: new Date().toISOString()
    };

    notes.push(newNote);

    await writeJSON(notesPath, notes);

    res.status(201).json({
      success: true,
      data: newNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};