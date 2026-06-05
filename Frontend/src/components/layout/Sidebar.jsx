import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-64 bg-white border-r min-h-screen p-5">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        Matchmaker CRM
      </h1>

      <div className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="p-3 rounded-lg hover:bg-blue-50"
        >
          Dashboard
        </Link>

        <Link
          to="/sent-matches"
          className="p-3 rounded-lg hover:bg-blue-50"
        >
          Sent Matches
        </Link>

        <button
          onClick={handleLogout}
          className="p-3 text-left rounded-lg hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}