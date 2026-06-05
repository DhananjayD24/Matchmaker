import path from "path";
import { fileURLToPath } from "url";

import { readJSON, writeJSON } from "../utils/jsonDB.js";
import { getTopMatches } from "../services/matchService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customersPath = path.join(
  __dirname,
  "../data/customers.json"
);

const sentMatchesPath = path.join(
  __dirname,
  "../data/sentMatches.json"
);

export const getMatches = async (req, res) => {
  try {
    const customerId = Number(req.params.customerId);

    const profiles = await readJSON(customersPath);

    const customer = profiles.find(
      (p) => p.id === customerId
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const matches = getTopMatches(
      customer,
      profiles
    );

    res.json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMatch = async (
  req,
  res
) => {
  try {

    const {
      customerId,
      profileId,
      aiIntroduction
    } = req.body;

    const sentMatches =
      await readJSON(sentMatchesPath);

    const alreadySent =
      sentMatches.find(
        match =>
          match.customerId === customerId &&
          match.profileId === profileId
      );

    if (alreadySent) {
      return res.status(400).json({
        success: false,
        message:
          "Match already sent"
      });
    }

    const newMatch = {
      id: Date.now(),
      customerId,
      profileId,
      aiIntroduction,
      sentAt:
        new Date().toISOString()
    };

    sentMatches.push(newMatch);

    await writeJSON(
      sentMatchesPath,
      sentMatches
    );

    res.status(201).json({
      success: true,
      message:
        "Match sent successfully",
      data: newMatch
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getSentMatches =
async (req, res) => {

  try {

    const customerId =
      Number(req.params.customerId);

    const sentMatches =
      await readJSON(
        sentMatchesPath
      );

    const customerMatches =
      sentMatches.filter(
        match =>
          match.customerId === customerId
      );

    res.json({
      success: true,
      count:
        customerMatches.length,
      data:
        customerMatches
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};