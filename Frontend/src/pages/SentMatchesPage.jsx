import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { getSentMatches } from "../api/matchesApi";
import { getCustomerById } from "../api/customerApi";

export default function SentMatchesPage() {
  const navigate = useNavigate();
  const [sentMatches, setSentMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    loadSentMatches();
  }, []);

  const loadSentMatches = async () => {
    try {
      setLoading(true);
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      if (!auth.customerId) {
        navigate("/");
        return;
      }

      const customerRes = await getCustomerById(auth.customerId);
      setCustomer(customerRes.data);

      const res = await getSentMatches(auth.customerId);
      setSentMatches(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">Loading sent matches...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900"
            >
              ← Back to dashboard
            </button>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
              Sent Matches
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review all matches you've sent to potential candidates.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {sentMatches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">
                No matches sent yet. Go to a customer profile and send some
                matches!
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Total Sent: {sentMatches.length}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:bg-white transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {match.firstName} {match.lastName}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {match.city} · {match.designation}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                        Sent
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>
                        <span className="font-semibold">Age:</span>{" "}
                        {match.dateOfBirth
                          ? Math.max(
                              0,
                              new Date().getFullYear() -
                                new Date(match.dateOfBirth).getFullYear(),
                            )
                          : "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Religion:</span>{" "}
                        {match.religion || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        {match.maritalStatus || "N/A"}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/customer/${match.id}`)}
                      className="mt-4 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
