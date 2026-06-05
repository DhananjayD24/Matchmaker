import fs from "fs/promises";

export const readJSON = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

export const writeJSON = async (filePath, data) => {
  try {
    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing file:", error);
  }
};