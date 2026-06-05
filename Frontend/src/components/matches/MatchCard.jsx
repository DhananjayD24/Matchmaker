import { Link } from "react-router-dom";

export default function MatchCard({
  match,
  onReview,
  reviewLoading,
  sentMatches = [],
  reviewMatchId,
}) {
  const score = Math.round(match.similarityScore || 0);
  const isSent = sentMatches.includes(match.id);
  const isActiveReview = reviewMatchId === match.id;
  const statusLabel = isActiveReview
    ? isSent
      ? "Match Sent"
      : "AI Reviewed"
    : "Awaiting AI Review";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold text-lg">
          {match.firstName ? match.firstName.charAt(0) : "?"}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-lg text-slate-900">
            {match.firstName} {match.lastName}
          </h3>
          <p className="text-sm text-slate-500">
            {match.city} · {match.designation || match.degree}
          </p>
        </div>

        <div
          className={`text-xs font-semibold px-3 py-1 rounded-full ${isActiveReview ? "bg-emerald-100 text-emerald-800" : "bg-yellow-50 text-yellow-800"}`}
        >
          {statusLabel}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Compatibility</span>
          <span className="font-semibold text-slate-800">{score}%</span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-2 bg-sky-600" style={{ width: `${score}%` }} />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          to={`/customer/${match.id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          View Profile
        </Link>

        <button
          onClick={() => onReview(match)}
          disabled={reviewLoading && reviewMatchId !== match.id}
          className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60 disabled:pointer-events-none"
        >
          {reviewLoading && reviewMatchId === match.id
            ? "Reviewing..."
            : "AI Review"}
        </button>
      </div>
    </div>
  );
}
