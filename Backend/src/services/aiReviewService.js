import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

function getLLM() {
  console.log(
    "Loaded Key:",
    process.env.GROQ_API_KEY
      ? "Groq"
      : process.env.GEMINI_API_KEY
        ? "Gemini"
        : "None",
  );
  // return new ChatGoogleGenerativeAI({
  //   model: "gemini-2.0-flash",
  //   apiKey: process.env.GEMINI_API_KEY,
  //   temperature: 0.3,
  // });
  return new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
  });
}

export async function generateAIReview(customer, customerNotes, matches) {
  function pickProfile(p) {
    if (!p) return null;
    const {
      id,
      firstName,
      lastName,
      name,
      age,
      gender,
      city,
      country,
      location,
      maritalStatus,
      children,
      childrenPreference,
      education,
      occupation,
      hobbies,
      relocationPreferences,
      languages,
      pets,
      verified,
    } = p;

    return {
      id,
      name:
        name || [firstName, lastName].filter(Boolean).join(" ") || undefined,
      age,
      location: location || (city || country ? { city, country } : undefined),
      maritalStatus,
      childrenPreference,
      education,
      occupation,
      hobbies,
      relocationPreferences,
      languages,
      pets,
    };
  }

  function minimalNotes(notes = []) {
    return notes
      .slice(0, 5)
      .map((n) => ({
        id: n.id,
        text: n.text || n.note || n.content || n.body,
        date: n.date || n.createdAt,
      }));
  }

  // Only send one match (the first) to reduce tokens
  const singleMatch =
    Array.isArray(matches) && matches.length ? matches[0] : matches;

  const payload = {
    customer: pickProfile(customer),
    customerNotes: minimalNotes(customerNotes),
    match: pickProfile(singleMatch),
    matchNotes: minimalNotes(singleMatch && singleMatch.notes),
  };
  const llm = getLLM();
  const prompt = `You are an expert matrimonial matchmaker.\n\nAnalyze the following minimal profile data (one match):\n\n${JSON.stringify(payload)}\n\nReturn a JSON array with one object for the match containing: {"profileId": number, "pros": [], "cons": [], "overallCompatibility": "High|Medium|Low", "summary": "", "matchIntroduction": ""}. \n\nRules: Return only valid JSON, no markdown, do not invent extra profiles, max 3 pros, max 3 cons, summary max 2 sentences, matchIntroduction max 3 sentences. Prioritize notes, children preferences, education, career, family values, language, relocation, lifestyle, hobbies, pets.`;

  console.log(JSON.stringify(payload));

  let responseContent = null;
  try {
    const response = await llm.invoke(prompt);
    responseContent =
      response && (response.content || response.text || response);
  } catch (err) {
    console.error("LLM invoke failed:", err?.message || err);
    return [
      {
        profileId: payload.match?.id || payload.customer?.id || null,
        pros: [],
        cons: [],
        overallCompatibility: "Unknown",
        summary: `LLM invoke failed: ${err?.message || "no message"}`,
        matchIntroduction: "",
      },
    ];
  }

  const cleaned = String(responseContent || "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Try to parse JSON robustly: full string, then extract array/object, then fallback
  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    console.warn(
      "Primary JSON parse failed, attempting to extract JSON substring...",
    );
    // Attempt to extract a JSON array
    try {
      const arrMatch = cleaned.match(/\[([\s\S]*)\]/);
      if (arrMatch) {
        const arrText = `[` + arrMatch[1] + `]`;
        const parsed = JSON.parse(arrText);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
    } catch (e) {
      // fall through
    }

    // Attempt to extract a JSON object and wrap in array
    try {
      const objMatch = cleaned.match(/\{([\s\S]*)\}/);
      if (objMatch) {
        const objText = `{` + objMatch[1] + `}`;
        const parsed = JSON.parse(objText);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
    } catch (e) {
      // fall through
    }

    // If all parsing fails, return a safe fallback so frontend still gets JSON
    console.error(
      "AI did not return valid JSON after extraction attempts. Returning fallback.",
    );
    console.error(cleaned);

    const fallback = [
      {
        profileId: payload.match?.id || payload.customer?.id || null,
        pros: [],
        cons: [],
        overallCompatibility: "Unknown",
        summary: "AI did not return valid JSON.",
        matchIntroduction: (cleaned || "").slice(0, 800),
      },
    ];

    return fallback;
  }
}
