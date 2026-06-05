import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";
import { getCustomerById } from "../api/customerApi";
import { getNotes, addNote } from "../api/notesApi";

import NotesList from "../components/notes/NotesList";
import AddNoteForm from "../components/notes/AddNoteForm";

import { getMatches } from "../api/matchesApi";
import MatchCard from "../components/matches/MatchCard";

import { reviewMatches } from "../api/aiApi";
import AIReviewModal from "../components/matches/AIReviewModal";
import EmailModal from "../components/matches/EmailModal";
import { sendMatch } from "../api/matchesApi";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  const [matchesLoading, setMatchesLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [reviewMatchId, setReviewMatchId] = useState(null);

  const [reviewLoading, setReviewLoading] = useState(false);
  const [sentMatches, setSentMatches] = useState([]);
  const [matchAttempted, setMatchAttempted] = useState(false);
  const [matchError, setMatchError] = useState("");
  const [emailMatch, setEmailMatch] = useState(null);
  const [emailSending, setEmailSending] = useState(false);

  useEffect(() => {
    loadCustomerData();
  }, [id]);

  const loadCustomerData = async () => {
    try {
      setLoading(true);

      const customerRes = await getCustomerById(id);
      setCustomer(customerRes.data);

      const notesRes = await getNotes(id);
      setNotes(notesRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (noteText) => {
    try {
      await addNote({
        customerId: Number(id),
        note: noteText,
      });

      const updatedNotes = await getNotes(id);
      setNotes(updatedNotes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">Loading customer...</div>
      </DashboardLayout>
    );
  }

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="text-center py-10 text-red-500">Customer not found</div>
      </DashboardLayout>
    );
  }

  const handleGenerateMatches = async () => {
    try {
      setMatchAttempted(true);
      setMatchError("");
      setMatchesLoading(true);
      const res = await getMatches(id);
      if (res.success) {
        setMatches(res.data || []);
      } else {
        setMatches([]);
        setMatchError(res.message || "Unable to generate matches.");
      }
      setReview(null);
      setReviewMatchId(null);
    } catch (err) {
      console.log(err);
      setMatches([]);
      setMatchError(
        err?.response?.data?.message || "Unable to generate matches.",
      );
    } finally {
      setMatchesLoading(false);
    }
  };

  const handleReview = async (selectedMatch) => {
    try {
      setReviewLoading(true);
      setReviewMatchId(selectedMatch.id);

      const res = await reviewMatches(customer, [selectedMatch]);

      if (res.success && res.data && res.data.length > 0) {
        setReview(res.data[0]);
      } else {
        alert("AI review returned no data");
        setReview(null);
      }
    } catch (err) {
      console.error(err);
      setReview(null);
      alert(err?.response?.data?.message || "Failed to generate AI review");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleSendMatchClick = (selectedMatch, reviewData) => {
    if (!reviewData || reviewMatchId !== selectedMatch.id) {
      alert(
        "Please generate an AI review for this candidate before sending the match.",
      );
      return;
    }
    setEmailMatch({ ...selectedMatch, reviewData });
  };

  const handleSendEmail = async (editedEmail) => {
    try {
      setEmailSending(true);
      await sendMatch({
        customerId: customer.id,
        profileId: emailMatch.id,
        aiIntroduction: editedEmail,
      });

      setSentMatches((prev) => [...prev, emailMatch.id]);
      setEmailMatch(null);
    } catch (err) {
      console.error(err);
      alert("Failed to send match");
      setEmailSending(false);
    }
  };

  const handleCloseEmailModal = () => {
    setEmailMatch(null);
    setEmailSending(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900"
            >
              ← Back to dashboard
            </button>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review the full profile, generate match recommendations, view
              candidate profiles, and keep the AI match flow professional.
            </p>
          </div>

          <div className="inline-flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
              {customer.gender}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${customer.verified === "Yes" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
            >
              {customer.verified === "Yes" ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Personal Information
                </h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">Age:</span>{" "}
                    {customer.dateOfBirth
                      ? Math.max(
                          0,
                          new Date().getFullYear() -
                            new Date(customer.dateOfBirth).getFullYear(),
                        )
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Date of Birth:
                    </span>{" "}
                    {customer.dateOfBirth || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Email:</span>{" "}
                    {customer.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Phone:</span>{" "}
                    {customer.phone || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Caste:</span>{" "}
                    {customer.caste || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Religion:
                    </span>{" "}
                    {customer.religion || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Siblings:
                    </span>{" "}
                    {customer.siblings ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Location & Preferences
                </h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">City:</span>{" "}
                    {customer.city || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Country:
                    </span>{" "}
                    {customer.country || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Height:
                    </span>{" "}
                    {customer.height ? `${customer.height} cm` : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Marital Status:
                    </span>{" "}
                    {customer.maritalStatus || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Want Kids:
                    </span>{" "}
                    {customer.wantKids || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Open to Relocate:
                    </span>{" "}
                    {customer.openToRelocate || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Open to Pets:
                    </span>{" "}
                    {customer.openToPets || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Education & Career
              </h2>
              <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-800">Degree</p>
                  <p>{customer.degree || "N/A"}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">College</p>
                  <p>{customer.college || "N/A"}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Company</p>
                  <p>{customer.currentCompany || "N/A"}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Designation</p>
                  <p>{customer.designation || "N/A"}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Income</p>
                  <p>
                    {customer.income
                      ? `₹${customer.income.toLocaleString()}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {customer.languagesKnown?.length ? (
                    customer.languagesKnown.map((language, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                      >
                        {language}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No languages listed.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Hobbies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {customer.hobbies?.length ? (
                    customer.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                      >
                        {hobby}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No hobbies listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Match Recommendations
              </h2>
              <p className="text-sm text-slate-500">
                Review recommended candidates, open profile details, and
                generate AI summaries before sending.
              </p>
            </div>
            <button
              onClick={handleGenerateMatches}
              disabled={matchesLoading}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 disabled:pointer-events-none"
            >
              {matchesLoading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                  Generating matches
                </>
              ) : (
                "Generate Matches"
              )}
            </button>
          </div>

          {reviewLoading && (
            <div className="mt-5 rounded-3xl bg-sky-50 p-4 text-sm text-slate-700 border border-sky-100">
              Processing the selected candidate and preparing pros, cons, and
              summary.
            </div>
          )}

          {matchError && (
            <div className="mt-5 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {matchError}
            </div>
          )}

          {matchAttempted &&
            !matchesLoading &&
            matches.length === 0 &&
            !matchError && (
              <div className="mt-5 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                No matches found.
              </div>
            )}

          {matches.some((match) => match.fallback) && (
            <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              Strict filters did not find exact matches. Showing the best
              available fallback candidates.
            </div>
          )}

          {matchesLoading ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {[1, 2, 3, 4].map((slot) => (
                <div
                  key={slot}
                  className="h-56 rounded-3xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onReview={handleReview}
                  reviewLoading={reviewLoading}
                  sentMatches={sentMatches}
                  reviewMatchId={reviewMatchId}
                />
              ))}
            </div>
          )}

          {!matchesLoading && matches.length === 0 && (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              No recommendations yet. Click Generate Matches to load compatible
              options and review candidate profiles.
            </div>
          )}
        </div>

        {review && (
          <AIReviewModal
            review={review}
            onClose={() => setReview(null)}
            onSendClick={handleSendMatchClick}
            match={matches.find((m) => m.id === reviewMatchId)}
            sentMatches={sentMatches}
          />
        )}

        {emailMatch && (
          <EmailModal
            match={emailMatch}
            customer={customer}
            emailContent={emailMatch.reviewData?.matchIntroduction}
            onClose={handleCloseEmailModal}
            onSend={handleSendEmail}
            isSending={emailSending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
