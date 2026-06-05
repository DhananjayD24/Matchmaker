import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

function getLLM() {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.3,
  });
}

export async function generateAIReview(customer, customerNotes, matches) {
  const payload = {
    customer,
    customerNotes,
    matches,
  };
  const llm = getLLM();
  const prompt = `
You are an expert matrimonial matchmaker.

Analyze the following data:

${JSON.stringify(payload, null, 2)}

Pay special attention to:
- notes
- hobbies
- relocation preferences(city, country)
- marital status
- children preferences
- lifestyle compatibility
- education compatibility
- career compatibility
- values compatibility
- family compatibility
- language compatibility
- open to pets
- verified profiles

For EACH profile provide:

[
  {
    "profileId": number,
    "pros": [],
    "cons": [],
    "overallCompatibility": "High|Medium|Low",
    "summary": "",
    "matchIntroduction": ""
  }
]

IMPORTANT:
- Analyze ONLY the profiles provided.
- Do NOT invent additional profiles.
- Do NOT create more profiles than provided.
- Return ONLY valid JSON.
- Do not use markdown.

Select ONLY the most important compatibility factors.

Do NOT mention religion or caste unless they create a concern.

Prioritize analysis in this order:

1. Notes-based insights
2. Children preferences and timeline
3. Education compatibility
4. Career compatibility
5. Family values and siblings/family structure
6. Language compatibility
7. Relocation compatibility
8. Lifestyle compatibility
9. Hobbies and interests
10. Pet preferences

For each profile:

- Show maximum 3 pros.
- Show maximum 3 cons.
- Focus on meaningful differences and similarities.
- Ignore obvious matches already enforced by the matching algorithm.
- Do not mention religion or caste unless relevant to a concern.
- Summary maximum 2 sentences.
- MatchIntroduction maximum 3 sentences.
`;

  console.log(
  JSON.stringify(payload, null, 2)
);
  const response = await llm.invoke(prompt);

  const cleaned = response.content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Invalid AI Response:");
    console.error(cleaned);

    throw new Error("AI did not return valid JSON");
  }
}
