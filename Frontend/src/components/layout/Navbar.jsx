import { useAuth } from "../../context/AuthContext";
import { FaBars, FaUser } from "react-icons/fa";

export default function Navbar({ onToggleSidebar }) {
  const { user } = useAuth();

  // Extract initials from user's name
  const getInitials = (name) => {
    if (!name) return "M";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-white border-b border-slate-100 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      
      {/* Left section: Hamburger button, empty on desktop if collapsed */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 cursor-pointer"
        >
          <FaBars className="text-xl" />
        </button>
        
        {/* Subtle greeting message on large screens */}
        <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 tracking-wider uppercase">
          Matchmaker Workspace
        </span>
      </div>

      {/* Right section: Profile dropdown or avatar */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-800 leading-tight">
            {user?.name || "Matchmaker"}
          </p>
          <p className="text-xs font-medium text-slate-400">
            Professional Agent
          </p>
        </div>

        {/* Beautiful Initials Avatar Badge */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00a2e8] to-sky-400 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#00a2e8]/20 border border-white/20 select-none cursor-default">
          {getInitials(user?.name)}
        </div>
      </div>

    </header>
  );
}