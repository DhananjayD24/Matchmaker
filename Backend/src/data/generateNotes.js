import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customersPath = path.join(
  __dirname,
  "customers.json"
);

const notesPath = path.join(
  __dirname,
  "notes.json"
);

const familyNotes = [
  "Strongly prefers a joint family setup.",
  "Comfortable with either joint or nuclear family.",
  "Family plays a major role in decision making.",
  "Close relationship with siblings.",
  "Looking for a family-oriented partner.",
  "Values family traditions and customs.",
  "Enjoys spending time with extended family.",
  "Would prefer someone who respects elders.",
  "Family is supportive of matchmaking process.",
  "Looking for a partner who values relationships."
];

const careerNotes = [
  "Career growth is currently a priority.",
  "Open to relocating for better opportunities.",
  "Looking for a partner with an ambitious mindset.",
  "Work-life balance is very important.",
  "Prefers a stable professional environment.",
  "Enjoys learning new technologies.",
  "Interested in leadership opportunities.",
  "Would like a supportive partner during career growth.",
  "Long-term financial planning is important.",
  "Enjoys challenging and innovative work."
];

const lifestyleNotes = [
  "Enjoys frequent travel.",
  "Fitness and healthy lifestyle are important.",
  "Prefers a calm and private social life.",
  "Very active in social gatherings.",
  "Enjoys outdoor adventures.",
  "Likes trying new cuisines.",
  "Enjoys weekend road trips.",
  "Values personal space and independence.",
  "Enjoys reading books regularly.",
  "Maintains an active social circle."
];

const marriageNotes = [
  "Looking to marry within the next year.",
  "Open to taking time before marriage.",
  "Interested in long-term compatibility.",
  "Values emotional maturity highly.",
  "Looking for a serious commitment.",
  "Believes communication is the key to a successful relationship.",
  "Would like to build a strong friendship before marriage.",
  "Prefers transparent conversations.",
  "Values trust and mutual respect.",
  "Looking for emotional compatibility."
];

const preferenceNotes = [
  "Prefers a partner from a similar educational background.",
  "Open to intercity marriage.",
  "Would prefer someone who enjoys pets.",
  "Would like a partner interested in travel.",
  "Values honesty and communication.",
  "Would appreciate a partner with similar hobbies.",
  "Open to different career backgrounds.",
  "Values personal growth and learning.",
  "Would like a partner who enjoys family gatherings.",
  "Prefers someone with a positive outlook on life."
];

const allNotes = [
  ...familyNotes,
  ...careerNotes,
  ...lifestyleNotes,
  ...marriageNotes,
  ...preferenceNotes
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const customers = JSON.parse(
  fs.readFileSync(customersPath, "utf8")
);

const notes = [];

let noteId = 1;

for (const profile of customers) {

  const profileNotes = new Set();

  // Profile-aware notes

  if (profile.wantKids === "Yes") {
    profileNotes.add(
      "Would like children in the future."
    );
  }

  if (profile.wantKids === "No") {
    profileNotes.add(
      "Does not plan to have children."
    );
  }

  if (profile.openToRelocate === "Yes") {
    profileNotes.add(
      "Open to relocating after marriage."
    );
  }

  if (profile.openToPets === "Yes") {
    profileNotes.add(
      "Comfortable having pets at home."
    );
  }

  if (profile.openToPets === "No") {
    profileNotes.add(
      "Prefers a pet-free household."
    );
  }

  if (profile.income > 2000000) {
    profileNotes.add(
      "Financially well-established and career focused."
    );
  }

  if (profile.siblings >= 3) {
    profileNotes.add(
      "Comes from a large family and values family connections."
    );
  }

  if (
    profile.hobbies.includes("Travel")
  ) {
    profileNotes.add(
      "Enjoys exploring new destinations."
    );
  }

  if (
    profile.hobbies.includes("Fitness")
  ) {
    profileNotes.add(
      "Maintains a disciplined fitness routine."
    );
  }

  if (
    profile.hobbies.includes("Reading")
  ) {
    profileNotes.add(
      "Enjoys reading and continuous learning."
    );
  }

  // Add random notes

  const notesCount =
    Math.floor(Math.random() * 8) + 8;

  while (
    profileNotes.size < notesCount
  ) {
    profileNotes.add(
      random(allNotes)
    );
  }

  for (const note of profileNotes) {

    notes.push({
      id: noteId++,
      customerId: profile.id,
      note,
      createdAt: new Date(
        Date.now() -
        Math.floor(
          Math.random() *
          365 *
          24 *
          60 *
          60 *
          1000
        )
      ).toISOString()
    });

  }
}

fs.writeFileSync(
  notesPath,
  JSON.stringify(notes, null, 2)
);

console.log(
  `${notes.length} notes generated successfully`
);