import { Link } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaHeart, 
  FaArrowRight,
  FaGlobe
} from "react-icons/fa";

export default function CustomerCard({ customer }) {
  
  // Calculate age from date of birth
  const calculateAge = (dobString) => {
    if (!dobString) return "N/A";
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Determine verification status tag
  const getStatusTag = (c) => {
    if (c.verified === "Yes") {
      return {
        label: "Verified",
        style: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      };
    } else {
      return {
        label: "Non Verified",
        style: "bg-rose-50 text-rose-700 border-rose-200/60",
      };
    }
  };

  const age = calculateAge(customer.dateOfBirth);
  const status = getStatusTag(customer);
  const initials = `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase();

  // Pick unique gradient for card avatar based on ID
  const gradients = [
    "from-rose-400 to-orange-400",
    "from-sky-400 to-indigo-400",
    "from-emerald-400 to-teal-400",
    "from-violet-400 to-fuchsia-400"
  ];
  const avatarGradient = gradients[customer.id % gradients.length];

  return (
    <div className="group bg-white rounded-3xl p-5 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none">
      <div>
        
        {/* Top Header Section: Avatar & Name */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${avatarGradient} text-white flex items-center justify-center font-extrabold text-base shadow-sm shrink-0`}>
            {initials}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-800 tracking-tight truncate group-hover:text-[#00a2e8] transition-colors duration-200">
              {customer.firstName} {customer.lastName}
            </h3>
            
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              {age} Yrs • {customer.maritalStatus}
            </p>
          </div>
        </div>

        {/* Status Tag Pill Badge */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${status.style}`}>
            {status.label}
          </span>
        </div>

        {/* Quick Details List */}
        <div className="mt-4 space-y-2.5 border-t border-slate-50 pt-4 text-xs font-medium text-slate-500">
          
          {/* Location */}
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-slate-400 text-sm shrink-0" />
            <span className="truncate">{customer.city}, India</span>
          </div>

          {/* Religion & Caste */}
          <div className="flex items-center gap-2">
            <FaGlobe className="text-slate-400 text-sm shrink-0" />
            <span className="truncate">{customer.religion} • {customer.caste}</span>
          </div>

          {/* Profession */}
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-slate-400 text-sm shrink-0" />
            <span className="truncate">
              {customer.designation || "Not Specified"} at {customer.currentCompany || "N/A"}
            </span>
          </div>

        </div>

      </div>

      {/* Card Action Link */}
      <div className="mt-5 pt-3 border-t border-slate-50">
        <Link
          to={`/customer/${customer.id}`}
          className="w-full bg-slate-55 border border-slate-100 group-hover:border-[#00a2e8] group-hover:bg-[#00a2e8] text-slate-700 group-hover:text-white py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm shadow-slate-100 hover:shadow-md active:scale-98"
        >
          <FaHeart className="text-[10px] animate-pulse" />
          <span>View Matchmaking</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}