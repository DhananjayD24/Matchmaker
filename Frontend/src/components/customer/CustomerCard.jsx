import { Link } from "react-router-dom";

export default function CustomerCard({
  customer,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border hover:shadow-lg transition">
      <h3 className="font-bold text-xl">
        {customer.firstName}{" "}
        {customer.lastName}
      </h3>

      <div className="mt-3 space-y-1 text-gray-600">
        <p>{customer.city}</p>

        <p>{customer.maritalStatus}</p>

        <p>{customer.designation}</p>
      </div>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
          customer.verified === "Yes"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {customer.verified === "Yes"
          ? "Verified"
          : "Non Verified"}
      </span>

      <Link
        to={`/customer/${customer.id}`}
        className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
      >
        View Matchmaking
      </Link>
    </div>
  );
}