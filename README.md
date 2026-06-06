# Matchmaker - AI-Powered Matrimonial Matching Platform

## Overview

Matchmaker is an intelligent matrimonial matching system that combines strict compatibility filters with AI-powered reviews to help find meaningful connections. The platform uses a sophisticated two-tier matching approach with intelligent fallback logic.

---

## Matching Algorithm

### 1. **Strict Filters (Primary Matching Layer)**

Our matching engine enforces strict compatibility rules to ensure profiles meet fundamental requirements before being presented.

#### For Male Customers:

- **Gender:** Candidate must be female
- **Age:** Candidate must be younger than the customer
- **Height:** Candidate must be shorter than the customer
- **Income:** Candidate must earn less than the customer
- **Religion:** Must match customer's religion (mandatory)
- **Children Preference:** Views on wanting kids must align
- **Location/Relocation:**
  - Same city = no relocation needed
  - Different city = at least one party must be willing to relocate
  - BOTH must have matching relocation preferences if in different locations

#### For Female Customers:

- **Gender:** Candidate must be male
- **Religion:** Must match customer's religion (mandatory)
- **Children Preference:** Views on wanting kids must align
- **Profession/Value Compatibility:** At least one match in:
  - Same company
  - Same designation
  - Same degree
  - Same college
- **Location/Relocation:** At least one party must be willing to relocate if in different cities

#### Universal Requirements:

- Profile must be verified
- Both must be compatible on core values

### 2. **Fallback Strategy (Safety Net)**

When strict filters yield fewer than 10 matches, the system activates **Fallback Filters** to ensure users always receive recommendations:

**Fallback Filters Apply:**

- Gender requirement still enforced (no same-gender suggestions)
- Religion match still required
- Children preference alignment required
- Relocation compatibility maintained
- Verified profile status required

**What Gets Relaxed:**

- Age, height, and income requirements for males
- Profession/value matching for females (compatibility prioritized by similarity score)

**Why This Approach:**
Perfect matches are rare. Fallback ensures users get the 10 best candidates based on overall compatibility (cosine similarity) while maintaining fundamental compatibility boundaries.

---

## Similarity Scoring

The system uses **Cosine Similarity** to rank candidates by overall compatibility:

### Vector Components:

- Age
- Height
- Normalized Income
- Country/City (hashed)
- College/Degree/Company/Designation (hashed)
- Marital Status
- Languages Known (count)
- Siblings
- Open to Relocate (Yes/No/Maybe)
- Open to Pets (Yes/No/Maybe)
- Verified Status
- Hobbies (hashed)

### Scoring Formula:

```
Similarity Score = (Dot Product / (Magnitude1 × Magnitude2)) × 100
```

Scores range from 0% (completely different) to 100% (identical profiles).

---

## AI Review System

### Purpose:

Generate meaningful, human-readable insights about each match beyond algorithmic scores.

### AI Generates:

1. **Pros** (max 3):
   - Highlighted compatibility strengths
   - Aligned values or interests
   - Practical advantages

2. **Cons** (max 3):
   - Potential challenges
   - Lifestyle differences
   - Practical concerns

3. **Summary** (max 2 sentences):
   - Overall compatibility assessment
   - Key takeaway for decision-making

4. **Match Introduction Email**:
   - Personalized introduction template
   - Can be edited before sending
   - Sent to both parties as a formal introduction

### AI Prioritization Order:

1. Notes-based insights (personal information provided)
2. Children preferences and timeline
3. Education compatibility
4. Career compatibility
5. Family values and structure
6. Language compatibility
7. Relocation flexibility
8. Lifestyle compatibility
9. Hobbies and interests
10. Pet preferences

### Why AI?

- **Personalization:** Generates custom introductions instead of generic templates
- **Meaningful Insights:** Provides context beyond numbers
- **Decision Support:** Helps users understand compatibility nuances
- **Efficiency:** Saves time on manual review
- **Transparency:** Shows reasoning behind recommendations

---

## Matching Flow

```
User Requests Matches
        ↓
Fetch All Profiles (Filter out current user)
        ↓
Calculate Similarity Scores for Each
        ↓
Apply Strict Filters
        ↓
Found ≥10 matches?
        ├─ YES → Return Top 10 Strict Matches
        └─ NO → Apply Fallback Filters
                ↓
                Return Top 10 Fallback Matches (marked as fallback)
        ↓
User Reviews Each Match
        ↓
Generate AI Review (Pros/Cons/Summary)
        ↓
Generate Match Introduction Email
        ↓
User Edits Email (Optional)
        ↓
Send Match to Both Parties
```

---

## Email Sending Process

1. **AI Generation:** System generates personalized introduction email based on compatibility factors
2. **User Review:** User sees the AI-generated email in a modal
3. **Optional Editing:** User can customize the message before sending
4. **Dual Delivery:** Email sent to both customer and matched candidate
5. **Confirmation:** Both parties notified of the match introduction
6. **Next Steps:** Both can accept, reject, or request more information

---

## Tech Stack

### Frontend:

- **React** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API communication

### Backend:

- **Node.js/Express** - Server framework
- **Langchain + Gemini** - AI integration
- **JSON DB** - Data storage (development)

### AI:

- **Google Gemini 2.5 Flash** - Large Language Model

---

## Local Setup

### Backend Environment

1. Open a terminal in `Backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `.env` in `Backend` with:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   or for production-style start:
   ```bash
   npm start
   ```

### Frontend Environment

1. Open a terminal in `Frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `.env` in `Frontend` with:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Running the Project

1. Make sure the backend is running first.
2. Launch the frontend.
3. Open the Vite development URL shown in the frontend terminal (usually `http://localhost:5173`).
4. Use the UI to view customers, generate matches, and request AI reviews.

> If the backend port changes, update `VITE_API_URL` in `Frontend/.env` to match the backend URL.

---

## Key Features

✅ **Two-Tier Matching:** Strict rules + AI-powered fallback
✅ **Intelligent Fallback:** Always finds best available matches
✅ **Personalized Introductions:** AI-generated, user-editable emails
✅ **Comprehensive Profiles:** Age, height, income, education, career, values
✅ **Gender-Aware Logic:** Different criteria for male/female customers
✅ **Relocation Flexibility:** Smart handling of location preferences
✅ **Verification System:** Only verified profiles in matches
✅ **AI Insights:** Pros, cons, compatibility summary
✅ **Mobile Responsive:** Works on all devices

---

## Future Enhancements

- Machine learning-based match success prediction
- User feedback loop for algorithm improvement
- Video introductions
- Match success rate tracking
- Advanced filtering options
- Chat integration for matched pairs
- Match decline reasons analytics

---

## Contact & Support

For questions about the matching algorithm or features, contact The Data Crew team.
