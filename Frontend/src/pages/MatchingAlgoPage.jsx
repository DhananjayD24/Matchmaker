import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import {
  FaCheck,
  FaTimes,
  FaBrain,
  FaChartLine,
  FaShieldAlt,
  FaSync,
  FaPaperPlane,
} from "react-icons/fa";

export default function MatchingAlgoPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900"
            >
              ← Back to dashboard
            </button>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
              Matching Algorithm
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Learn how our intelligent two-tier matching system finds the best
              compatible profiles.
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-blue-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <FaChartLine className="h-8 w-8 text-sky-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                How It Works
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our matching system combines strict compatibility filters with
                AI-powered insights. We ensure every suggestion meets
                fundamental compatibility requirements while leveraging
                artificial intelligence to provide personalized introductions.
              </p>
            </div>
          </div>
        </div>

        {/* Two-Tier System */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Strict Filters Tier */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="h-6 w-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Tier 1: Strict Filters
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Primary matching layer ensuring fundamental compatibility.
            </p>

            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm text-slate-900 mb-2">
                  For Male Customers:
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Female candidate required
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Younger age
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Shorter height
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Lower income
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Same religion
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Aligned views on children
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Compatible relocation preferences
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm text-slate-900 mb-2">
                  For Female Customers:
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Male candidate required
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Same religion
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Aligned views on children
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Profession/value compatibility
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Compatible relocation preferences
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Universal:</span> Only
                  verified profiles shown in matches
                </p>
              </div>
            </div>
          </div>

          {/* Fallback System */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FaSync className="h-6 w-6 text-amber-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Tier 2: Fallback System
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Smart fallback when strict matches are limited (&lt; 10).
            </p>

            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm text-slate-900 mb-2">
                  What Stays Enforced:
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Gender requirement
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Religion match
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Children preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Verified status
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-emerald-600 flex-shrink-0" />
                    Relocation compatibility
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <h4 className="font-semibold text-sm text-amber-900 mb-1">
                  Relaxed Criteria:
                </h4>
                <ul className="space-y-1 text-xs text-amber-800">
                  <li className="flex items-center gap-2">
                    <FaTimes className="text-amber-600 flex-shrink-0" />
                    Age, height, income (males)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaTimes className="text-amber-600 flex-shrink-0" />
                    Profession matching (females)
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  <span className="font-semibold">Result:</span> Top 10
                  candidates by overall compatibility score
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similarity Scoring */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="h-6 w-6 text-sky-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Similarity Scoring (Cosine Similarity)
            </h3>
          </div>

          <p className="text-sm text-slate-600 mb-4">
            After filters apply, profiles are ranked using cosine similarity
            across these dimensions:
          </p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Age",
              "Height",
              "Income",
              "Country & City",
              "Education",
              "Career",
              "Marital Status",
              "Languages",
              "Siblings",
              "Relocation",
              "Pets",
              "Hobbies",
            ].map((factor) => (
              <div
                key={factor}
                className="rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 p-3 text-center"
              >
                <p className="text-xs font-semibold text-sky-900">{factor}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-700">
              <span className="font-semibold">Score Range:</span> 0% (completely
              different) to 100% (identical profiles). Higher scores indicate
              greater overall compatibility.
            </p>
          </div>
        </div>

        {/* AI Review System */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FaBrain className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">
              AI Review System
            </h3>
          </div>

          <p className="text-sm text-slate-600 mb-4">
            For each match, our AI generates personalized insights:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <h4 className="font-semibold text-sm text-purple-900 mb-2">
                ✓ Pros (Max 3)
              </h4>
              <p className="text-xs text-purple-800">
                Compatibility strengths, aligned interests, and practical
                advantages specific to this match.
              </p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <h4 className="font-semibold text-sm text-purple-900 mb-2">
                ✗ Cons (Max 3)
              </h4>
              <p className="text-xs text-purple-800">
                Potential challenges, lifestyle differences, and areas needing
                discussion.
              </p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <h4 className="font-semibold text-sm text-purple-900 mb-2">
                📝 Summary (2 sentences)
              </h4>
              <p className="text-xs text-purple-800">
                Overall compatibility assessment and key takeaway for
                decision-making.
              </p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <h4 className="font-semibold text-sm text-purple-900 mb-2">
                💌 Email Template
              </h4>
              <p className="text-xs text-purple-800">
                Personalized introduction email, editable before sending to both
                parties.
              </p>
            </div>
          </div>
        </div>

        {/* AI Prioritization */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            AI Analysis Priority Order
          </h3>

          <div className="space-y-2">
            {[
              "Notes-based insights (personal information)",
              "Children preferences and timeline",
              "Education compatibility",
              "Career compatibility",
              "Family values and structure",
              "Language compatibility",
              "Relocation flexibility",
              "Lifestyle compatibility",
              "Hobbies and interests",
              "Pet preferences",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email Flow */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FaPaperPlane className="h-6 w-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Match Introduction Email Flow
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                step: "AI Generation",
                desc: "Personalized introduction based on compatibility factors",
              },
              {
                step: "User Review",
                desc: "You see the AI-generated email in an editable modal",
              },
              {
                step: "Optional Editing",
                desc: "Customize or modify the message before sending",
              },
              {
                step: "Dual Delivery",
                desc: "Email sent to both you and the matched candidate",
              },
              {
                step: "Confirmation",
                desc: "Both parties receive match introduction notification",
              },
              {
                step: "Next Steps",
                desc: "Both can accept, discuss, or request more information",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {index + 1}
                  </div>
                  {index < 5 && (
                    <div className="mt-2 h-8 w-0.5 bg-emerald-200" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-sm text-slate-900">
                    {item.step}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why This Approach */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Why This Approach?
          </h3>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">
                  Perfect Matches Are Rare
                </p>
                <p className="text-xs text-slate-700 mt-1">
                  Two-tier approach ensures we never show no-match errors while
                  maintaining core compatibility boundaries.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">
                  Fundamental Compatibility Maintained
                </p>
                <p className="text-xs text-slate-700 mt-1">
                  Core requirements (gender, religion, children, relocation) are
                  never compromised in fallback mode.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">
                  AI for Decision Support
                </p>
                <p className="text-xs text-slate-700 mt-1">
                  Personalized insights help users make informed decisions
                  beyond algorithm scores.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                4
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">
                  Professional Introductions
                </p>
                <p className="text-xs text-slate-700 mt-1">
                  Editable emails ensure both parties receive thoughtful,
                  personalized introductions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
