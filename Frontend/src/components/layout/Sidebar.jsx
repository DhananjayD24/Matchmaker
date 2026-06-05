import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHeart,
  FaTachometerAlt,
  FaBrain,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt className="text-lg" />,
    },
    {
      name: "Matching Algorithm",
      path: "/matching-algorithm",
      icon: <FaBrain className="text-lg" />,
    },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-100 flex flex-col justify-between transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:z-10 ${
        isOpen
          ? "w-64 p-6 translate-x-0 shadow-2xl lg:shadow-none"
          : "w-64 p-6 -translate-x-full lg:translate-x-0 lg:w-0 lg:p-0 lg:border-r-0 overflow-hidden"
      }`}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col flex-1">
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
          <div className="flex items-center gap-2.5">
            <FaHeart className="text-2xl text-[#00a2e8]" />
            <span className="font-cursive text-3xl font-bold tracking-wide text-slate-800">
              Matchmaker
            </span>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 border-l-4 ${
                  isActive
                    ? "bg-[#00a2e8]/10 text-[#00a2e8] border-[#00a2e8] font-bold shadow-sm shadow-[#00a2e8]/5"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-transparent font-semibold"
                }`}
              >
                {item.icon}
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="pt-4 border-t border-slate-50">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
              handleLogout();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-bold transition-all duration-200 border-l-4 border-transparent cursor-pointer"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-sm tracking-wide">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
