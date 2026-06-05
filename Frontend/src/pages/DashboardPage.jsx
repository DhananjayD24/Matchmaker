import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getCustomers } from "../api/customerApi";
import CustomerTabs from "../components/customer/CustomerTabs";
import CustomerCard from "../components/customer/CustomerCard";

export default function DashboardPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [genderTab, setGenderTab] =
    useState("male");

  const [
    verificationTab,
    setVerificationTab,
  ] = useState("verified");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
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

  const filteredCustomers =
    customers.filter((customer) => {
      const genderMatch =
        customer.gender?.toLowerCase() ===
        genderTab;

      const verificationMatch =
        verificationTab === "verified"
          ? customer.verified === "Yes"
          : customer.verified !== "Yes";

      const searchMatch = `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        genderMatch &&
        verificationMatch &&
        searchMatch
      );
    });

  const maleCount = customers.filter(
    (c) =>
      c.gender?.toLowerCase() === "male"
  ).length;

  const femaleCount = customers.filter(
    (c) =>
      c.gender?.toLowerCase() === "female"
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and match customer
            profiles
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search customer by name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender Tabs */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() =>
              setGenderTab("male")
            }
            className={`px-5 py-2 rounded-lg font-medium ${
              genderTab === "male"
                ? "bg-blue-600 text-white"
                : "bg-white shadow"
            }`}
          >
            Men ({maleCount})
          </button>

          <button
            onClick={() =>
              setGenderTab("female")
            }
            className={`px-5 py-2 rounded-lg font-medium ${
              genderTab === "female"
                ? "bg-blue-600 text-white"
                : "bg-white shadow"
            }`}
          >
            Women ({femaleCount})
          </button>
        </div>

        {/* Verification Tabs */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() =>
              setVerificationTab(
                "verified"
              )
            }
            className={`px-5 py-2 rounded-lg font-medium ${
              verificationTab ===
              "verified"
                ? "bg-green-600 text-white"
                : "bg-white shadow"
            }`}
          >
            Verified
          </button>

          <button
            onClick={() =>
              setVerificationTab(
                "nonVerified"
              )
            }
            className={`px-5 py-2 rounded-lg font-medium ${
              verificationTab ===
              "nonVerified"
                ? "bg-red-600 text-white"
                : "bg-white shadow"
            }`}
          >
            Non Verified
          </button>
        </div>

        {/* Stats */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-700">
            Showing{" "}
            {filteredCustomers.length}{" "}
            customers
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10">
            Loading customers...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredCustomers.length >
            0 ? (
              filteredCustomers.map(
                (customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                  />
                )
              )
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No customers found
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}