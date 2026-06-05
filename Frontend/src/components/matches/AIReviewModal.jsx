export default function AIReviewModal({
  review,
  onClose,
  onSendClick,
  match,
  sentMatches = [],
}) {
  if (!review) return null;

  // Minimal safe render to validate JSX syntax
  const isSent = Boolean(match && (sentMatches || []).includes(match.id));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">AI Compatibility Review</h2>
          <button onClick={onClose} className="text-sm">
            Close
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-2">Pros</h3>
            <ul className="list-disc list-inside text-sm text-slate-700">
              {(review.pros || []).map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cons</h3>
            <ul className="list-disc list-inside text-sm text-slate-700">
              {(review.cons || []).map((con, i) => (
                <li key={i}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-1">Summary</h3>
          <p className="text-sm text-slate-700">{review.summary}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Match Introduction Email</h3>
          <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
            {review.matchIntroduction || "No introduction available"}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 border border-slate-200 text-sm font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => onSendClick && onSendClick(match, review)}
            disabled={!match || isSent}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-60 disabled:pointer-events-none"
          >
            {isSent ? "Match Sent" : "Send Match"}
          </button>
        </div>
      </div>
    </div>
  );
}
