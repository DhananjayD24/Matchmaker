import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { getCustomers } from "../api/customerApi";
import CustomerCard from "../components/customer/CustomerCard";
import {
  FaSearch,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaMale,
  FaFemale,
  FaInbox,
  FaArrowLeft,
} from "react-icons/fa";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderTab, setGenderTab] = useState("male");
  const [verificationTab, setVerificationTab] = useState("verified");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers();
      if (res.success) {
        setCustomers(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter calculations
  const filteredCustomers = customers.filter((customer) => {
    const genderMatch = customer.gender?.toLowerCase() === genderTab;

    const verificationMatch =
      verificationTab === "verified"
        ? customer.verified === "Yes"
        : customer.verified !== "Yes";

    const searchMatch = `${customer.firstName} ${customer.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase());

    return genderMatch && verificationMatch && searchMatch;
  });

  // Metric counts
  const totalCount = customers.length;
  const maleCount = customers.filter(
    (c) => c.gender?.toLowerCase() === "male",
  ).length;
  const femaleCount = customers.filter(
    (c) => c.gender?.toLowerCase() === "female",
  ).length;
  const verifiedCount = customers.filter((c) => c.verified === "Yes").length;
  const pendingCount = totalCount - verifiedCount;

  return (
    <DashboardLayout>
      <div className="space-y-8 select-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              <FaArrowLeft className="text-sm" />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Customer Directory
              </h1>
              <p className="text-sm text-slate-500">
                Manage customer matchmaking pipelines, filter assignments, and
                coordinate relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Quick Summary Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Assigned */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Assignments
              </p>
              <h4 className="text-2xl font-black text-slate-800 mt-1">
                {totalCount}
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#00a2e8] flex items-center justify-center text-xl shrink-0">
              <FaUsers />
            </div>
          </div>

          {/* Card 2: Men Profiles */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Male Clients
              </p>
              <h4 className="text-2xl font-black text-slate-800 mt-1">
                {maleCount}
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl shrink-0">
              <FaMale />
            </div>
          </div>

          {/* Card 3: Women Profiles */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Female Clients
              </p>
              <h4 className="text-2xl font-black text-slate-800 mt-1">
                {femaleCount}
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shrink-0">
              <FaFemale />
            </div>
          </div>

          {/* Card 4: Verified */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Verified Profiles
              </p>
              <h4 className="text-2xl font-black text-emerald-600 mt-1">
                {verifiedCount}
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl shrink-0">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* Filter Controls Card Section */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-5">
          {/* Top Row: Search and Quick Segment Selectors */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-lg">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FaSearch className="text-sm" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates by name..."
                className="w-full bg-slate-50 border border-slate-100 focus:border-[#00a2e8] focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#00a2e8]/10 transition-all duration-300"
              />
            </div>

            {/* Quick Segment Filter Buttons Wrapper */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Gender Selector Segment */}
              <div className="bg-slate-55 border border-slate-100 p-1.5 rounded-2xl flex gap-1 items-center">
                <button
                  onClick={() => setGenderTab("male")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                    genderTab === "male"
                      ? "bg-[#00a2e8] text-white shadow-md shadow-[#00a2e8]/20"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <FaMale className="text-sm" />
                  <span>Men ({maleCount})</span>
                </button>

                <button
                  onClick={() => setGenderTab("female")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                    genderTab === "female"
                      ? "bg-[#00a2e8] text-white shadow-md shadow-[#00a2e8]/20"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <FaFemale className="text-sm" />
                  <span>Women ({femaleCount})</span>
                </button>
              </div>

              {/* Verification Selector Segment */}
              <div className="bg-slate-55 border border-slate-100 p-1.5 rounded-2xl flex gap-1 items-center">
                <button
                  onClick={() => setVerificationTab("verified")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                    verificationTab === "verified"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <FaCheckCircle className="text-xs" />
                  <span>Verified ({verifiedCount})</span>
                </button>

                <button
                  onClick={() => setVerificationTab("nonVerified")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                    verificationTab === "nonVerified"
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <FaClock className="text-xs" />
                  <span>Non Verified ({pendingCount})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Showing Results Count bar */}
          <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>
              FILTERS APPLIED: {genderTab.toUpperCase()} •{" "}
              {verificationTab.toUpperCase()}
            </span>
            <span>SHOWING {filteredCustomers.length} RESULTS</span>
          </div>
        </div>

        {/* Customer Directory Profiles Loading or Grid List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white border border-slate-100 rounded-[2rem] shadow-sm select-none">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-[#00a2e8] rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-400">
              Synchronizing profiles database...
            </p>
          </div>
        ) : (
          <div>
            {filteredCustomers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-[2rem] shadow-sm select-none">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 text-slate-300 flex items-center justify-center text-2xl mb-4">
                  <FaInbox />
                </div>
                <h4 className="text-lg font-bold text-slate-800">
                  No candidates match filters
                </h4>
                <p className="text-sm font-semibold text-slate-400 mt-1 max-w-xs text-center leading-relaxed">
                  Try typing a different name query or switching the
                  gender/verification filter selectors above.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
