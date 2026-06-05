export default function MatchCard({
  match,
  onReview,
  onSend,
  reviewLoading,
  sentMatches = [],
}) {
  const score = Math.round(match.similarityScore || 0);

  const isSent = sentMatches.includes(match.id);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-bold text-lg">
        {match.firstName} {match.lastName}
      </h3>

      <p>{match.city}</p>
      <p>{match.degree}</p>
      <p>{match.designation}</p>

      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span>Similarity Score</span>
          <span>{score}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-blue-600 rounded-full"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => onReview(match)}
        disabled={reviewLoading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {reviewLoading
          ? "Generating AI Review..."
          : "AI Review"}
      </button>

      <button
        onClick={() => onSend(match)}
        disabled={isSent}
        className={`mt-2 w-full py-2 rounded-lg text-white ${
          isSent
            ? "bg-green-600"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {isSent ? "✓ Match Sent" : "Send Match"}
      </button>
    </div>
  );
}