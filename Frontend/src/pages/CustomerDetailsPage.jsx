import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";
import { getCustomerById } from "../api/customerApi";
import { getNotes, addNote } from "../api/notesApi";

import NotesList from "../components/notes/NotesList";
import AddNoteForm from "../components/notes/AddNoteForm";

import { getMatches } from "../api/matchesApi";
import MatchCard from "../components/matches/MatchCard";

import { reviewMatches } from "../api/aiApi";
import AIReviewModal from "../components/matches/AIReviewModal";
import { sendMatch } from "../api/matchesApi";

export default function CustomerDetailsPage() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  const [matchesLoading, setMatchesLoading] = useState(false);
  const [review, setReview] = useState(null);

  const [reviewLoading, setReviewLoading] = useState(false);
  const [sentMatches, setSentMatches] = useState([]);

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
      setMatchesLoading(true);

      const res = await getMatches(id);

      setMatches(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setMatchesLoading(false);
    }
  };

  const handleReview = async (selectedMatch) => {
    try {
      setReviewLoading(true);

      console.log("Customer:", customer);
      console.log("Selected Match:", selectedMatch);

      const res = await reviewMatches(customer, [selectedMatch]);

      console.log("AI Review Response:", res);

      if (res.success && res.data && res.data.length > 0) {
        setReview(res.data[0]);
      } else {
        alert("AI review returned no data");
      }
    } catch (err) {
      console.error(err);

      alert(err?.response?.data?.message || "Failed to generate AI review");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleSendMatch = async (selectedMatch) => {
    try {
      if (!review) {
        alert("Please generate AI Review first");
        return;
      }

      await sendMatch({
        customerId: customer.id,
        profileId: selectedMatch.id,
        aiIntroduction: review.matchIntroduction,
      });

      setSentMatches((prev) => [...prev, selectedMatch.id]);

      alert("Match Sent Successfully");
    } catch (err) {
      console.error(err);

      alert("Failed to send match");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold">
            {customer.firstName} {customer.lastName}
          </h1>

          <div className="flex gap-3 mt-3 flex-wrap">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {customer.gender}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                customer.verified === "Yes"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {customer.verified === "Yes" ? "Verified" : "Non Verified"}
            </span>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Basic Information</h2>

            <div className="space-y-2">
              <p>
                <strong>Gender:</strong> {customer.gender}
              </p>

              <p>
                <strong>City:</strong> {customer.city}
              </p>

              <p>
                <strong>Country:</strong> {customer.country}
              </p>

              <p>
                <strong>Height:</strong> {customer.height} cm
              </p>

              <p>
                <strong>Marital Status:</strong> {customer.maritalStatus}
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Education</h2>

            <div className="space-y-2">
              <p>
                <strong>Degree:</strong> {customer.degree}
              </p>

              <p>
                <strong>College:</strong> {customer.college}
              </p>
            </div>
          </div>

          {/* Career */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Career</h2>

            <div className="space-y-2">
              <p>
                <strong>Company:</strong> {customer.currentCompany}
              </p>

              <p>
                <strong>Designation:</strong> {customer.designation}
              </p>

              <p>
                <strong>Income:</strong> ₹{customer.income?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Preferences</h2>

            <div className="space-y-2">
              <p>
                <strong>Want Kids:</strong> {customer.wantKids}
              </p>

              <p>
                <strong>Relocate:</strong> {customer.openToRelocate}
              </p>

              <p>
                <strong>Pets:</strong> {customer.openToPets}
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Languages</h2>

            <div className="flex flex-wrap gap-2">
              {customer.languagesKnown?.map((language, index) => (
                <span
                  key={index}
                  className="bg-slate-100 px-3 py-1 rounded-full text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">Hobbies</h2>

            <div className="flex flex-wrap gap-2">
              {customer.hobbies?.map((hobby, index) => (
                <span
                  key={index}
                  className="bg-slate-100 px-3 py-1 rounded-full text-sm"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-5">Notes</h2>

          <NotesList notes={notes} />

          <div className="mt-6">
            <AddNoteForm onAdd={handleAddNote} />
          </div>
        </div>

        {/* Matches Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">Match Recommendations</h2>

            <button
              onClick={handleGenerateMatches}
              disabled={matchesLoading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              {matchesLoading ? "Generating..." : "Generate Matches"}
            </button>
          </div>

          {reviewLoading && (
            <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
              🤖 Gemini is analyzing compatibility...
            </div>
          )}

          {matchesLoading ? (
            <p>Generating matches...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onReview={handleReview}
                  onSend={handleSendMatch}
                  reviewLoading={reviewLoading}
                  sentMatches={sentMatches}
                />
              ))}
            </div>
          )}
        </div>
        {review && (
          <AIReviewModal review={review} onClose={() => setReview(null)} />
        )}
      </div>
    </DashboardLayout>
  );
}
