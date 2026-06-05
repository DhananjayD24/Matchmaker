export default function AIReviewModal({
  review,
  onClose,
}) {
  if (!review) return null;

  const badgeColor =
    review.overallCompatibility === "High"
      ? "bg-green-100 text-green-700"
      : review.overallCompatibility ===
        "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">
            AI Compatibility Review
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <span
          className={`px-3 py-1 rounded-full ${badgeColor}`}
        >
          {review.overallCompatibility}
        </span>

        <div className="mt-6">
          <h3 className="font-bold mb-3">
            Pros
          </h3>

          <ul className="space-y-2">
            {review.pros?.map(
              (pro, index) => (
                <li key={index}>
                  ✅ {pro}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-bold mb-3">
            Cons
          </h3>

          <ul className="space-y-2">
            {review.cons?.map(
              (con, index) => (
                <li key={index}>
                  ⚠️ {con}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-bold mb-2">
            Summary
          </h3>

          <p>{review.summary}</p>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">
            AI Introduction
          </h3>

          <p>
            {review.matchIntroduction}
          </p>
        </div>
      </div>
    </div>
  );
}