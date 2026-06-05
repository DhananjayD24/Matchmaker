import path from "path";
import { fileURLToPath } from "url";
import { readJSON } from "../utils/jsonDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const matchmakersPath = path.join(
  __dirname,
  "../data/matchmakers.json"
);

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const matchmakers = await readJSON(matchmakersPath);

    const user = matchmakers.find(
      (m) =>
        m.username === username &&
        m.password === password
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};