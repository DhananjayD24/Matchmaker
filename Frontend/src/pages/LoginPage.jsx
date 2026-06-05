import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaLock,
  FaMagic,
  FaEnvelope,
  FaArrowLeft,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import heroImage from "../assets/matchmaker_hero.png";

// Custom Monument Cityscape SVG (solid blue, matches the travel monuments style)
const BottomCityscape = () => (
  <div className="absolute bottom-0 right-0 left-0 h-16 overflow-hidden pointer-events-none z-0 select-none">
    <svg
      className="w-full h-full text-[#00a2e8] fill-current"
      viewBox="0 0 600 80"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cityscape baseline */}
      <rect x="0" y="76" width="600" height="4" />

      {/* Taj Mahal (Left side) */}
      <g transform="translate(10, 5)">
        {/* Left Minar */}
        <rect x="20" y="25" width="3" height="48" />
        <path d="M19 25 L24 25 L21.5 21 Z" />
        {/* Main Base */}
        <rect x="30" y="38" width="50" height="35" rx="1" />
        {/* Main Dome */}
        <path d="M44 38 C44 24, 66 24, 66 38 Z" />
        <line
          x1="55"
          y1="24"
          x2="55"
          y2="18"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Left side dome */}
        <path d="M33 38 C33 30, 42 30, 42 38 Z" />
        {/* Right side dome */}
        <path d="M68 38 C68 30, 77 30, 77 38 Z" />
        {/* Right Minar */}
        <rect x="87" y="25" width="3" height="48" />
        <path d="M86 25 L91 25 L88.5 21 Z" />
        {/* Gate Arch (Cutout) */}
        <path d="M47 73 L47 50 C47 46, 63 46, 63 50 L63 73 Z" fill="#ffffff" />
      </g>

      {/* Leaning Tower of Pisa (Center-Right) */}
      <g transform="translate(480, 5) rotate(-6)">
        <rect x="0" y="10" width="22" height="63" rx="1" />
        {/* Balconies */}
        <line
          x1="-2"
          y1="20"
          x2="24"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="-2"
          y1="31"
          x2="24"
          y2="31"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="-2"
          y1="42"
          x2="24"
          y2="42"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="-2"
          y1="53"
          x2="24"
          y2="53"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="-2"
          y1="64"
          x2="24"
          y2="64"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Dome cap */}
        <path d="M3 10 C3 4, 19 4, 19 10 Z" />
      </g>

      {/* Notre Dame / Historical Church Structure (Right side) */}
      <g transform="translate(515, 12)">
        <rect x="0" y="25" width="60" height="38" />
        {/* Towers */}
        <rect x="4" y="2" width="16" height="25" />
        <rect x="40" y="2" width="16" height="25" />
        {/* Central Spire */}
        <path d="M28 25 L32 25 L30 8 Z" />
        {/* Gate Arches */}
        <path d="M8 63 L8 48 C8 44, 16 44, 16 48 L16 63 Z" fill="#ffffff" />
        <path d="M44 63 L44 48 C44 44, 52 44, 52 48 L52 63 Z" fill="#ffffff" />
      </g>

      {/* Decorative flying plane representing matching journeys */}
      <path
        d="M250,25 C290,15 330,12 360,22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3,3"
      />
      <g transform="translate(360, 22) rotate(15)">
        <polygon points="0,0 -8,-3 -6,0 -8,3" fill="currentColor" />
      </g>
    </svg>
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Custom Toast State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error", // "error" | "success" | "info"
  });

  // Auto-dismiss toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showNotification = (message, type = "error") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fillDemoCredentials = () => {
    setFormData({
      username: "matchmaker1",
      password: "123456",
    });
    showNotification("Demo credentials filled! Click Login.", "success");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    setLoading(true);

    try {
      // Map email inputs to usernames for API compatibility
      let processedUsername = formData.username.trim();
      if (processedUsername.includes("@")) {
        processedUsername = processedUsername.split("@")[0];
      }

      const response = await loginUser({
        username: processedUsername,
        password: formData.password,
      });

      if (response.success) {
        showNotification(
          "Welcome back! Redirecting to dashboard...",
          "success",
        );
        login(response.user);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        showNotification("Invalid email/username or password.", "error");
      }
    } catch (err) {
      console.error(err);
      showNotification(
        err?.response?.data?.message || "Unable to login. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#00a2e8] flex items-center justify-center p-4 sm:p-6 overflow-hidden font-sans">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/15 blur-sm select-none pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/15 blur-sm select-none pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-md select-none pointer-events-none"></div>

      {/* Modern Slide-In Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-slide-down">
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
              toast.type === "success"
                ? "bg-emerald-50/95 border-emerald-200 text-emerald-800"
                : toast.type === "info"
                  ? "bg-sky-50/95 border-sky-200 text-sky-800"
                  : "bg-rose-50/95 border-rose-200 text-rose-800"
            }`}
          >
            {toast.type === "success" ? (
              <FaCheckCircle className="text-xl text-emerald-500 shrink-0" />
            ) : toast.type === "info" ? (
              <FaMagic className="text-xl text-sky-500 shrink-0" />
            ) : (
              <FaExclamationCircle className="text-xl text-rose-500 shrink-0" />
            )}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative min-h-[550px] z-10 border border-white/20">
        {/* LEFT COLUMN: HERO IMAGE AND BRANDING */}
        <div className="w-full md:w-1/2 relative bg-slate-900 overflow-hidden flex flex-col justify-between p-8 sm:p-12 text-white">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Matchmaker Hero"
              className="w-full h-full object-cover opacity-75 scale-105 transition-transform duration-10000 ease-out hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-950/40"></div>
          </div>

          {/* Logo and App Title */}
          <div className="relative z-10 flex items-center gap-3">
            <FaHeart className="text-3xl text-[#00a2e8] animate-pulse" />
            <span className="font-cursive text-4xl tracking-wider text-white">
              Matchmaker
            </span>
          </div>

          {/* Tagline / Vibe statement */}
          <div className="relative z-10 mt-20 mb-8 max-w-sm">
            <p className="text-lg sm:text-xl font-light leading-relaxed text-slate-100 italic">
              "Connecting souls, creating everlasting stories. The premier
              matching dashboard for modern relationships."
            </p>
          </div>

          {/* Bottom credit info */}
          <div className="relative z-10 text-xs text-slate-400">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative bg-white">
          <div className="absolute left-6 top-6 z-20">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              <FaArrowLeft className="text-sm" /> Back
            </button>
          </div>

          {/* Main Form Content wrapper */}
          <div className="w-full max-w-sm mx-auto z-10 pb-10">
            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-4xl font-extrabold text-[#00a2e8] tracking-tight">
                Welcome
              </h2>
              <p className="text-slate-500 font-medium mt-1">
                Login with Email
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Input Field */}
              <div className="relative">
                <label
                  className={`absolute left-3 -top-2.5 px-1.5 bg-white text-xs font-semibold transition-all duration-200 ${
                    focusedField === "username" || formData.username
                      ? "text-[#00a2e8]"
                      : "text-slate-400"
                  }`}
                >
                  Email Id / Username
                </label>
                <div
                  className={`flex items-center border rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                    focusedField === "username"
                      ? "border-[#00a2e8] ring-4 ring-[#00a2e8]/10"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <FaEnvelope
                    className={`text-lg transition-colors duration-300 ${
                      focusedField === "username"
                        ? "text-[#00a2e8]"
                        : "text-slate-400"
                    }`}
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="thisuix@mail.com"
                    className="w-full ml-3 bg-transparent text-slate-800 placeholder-slate-300 font-medium focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="relative">
                <label
                  className={`absolute left-3 -top-2.5 px-1.5 bg-white text-xs font-semibold transition-all duration-200 ${
                    focusedField === "password" || formData.password
                      ? "text-[#00a2e8]"
                      : "text-slate-400"
                  }`}
                >
                  Password
                </label>
                <div
                  className={`flex items-center border rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                    focusedField === "password"
                      ? "border-[#00a2e8] ring-4 ring-[#00a2e8]/10"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <FaLock
                    className={`text-lg transition-colors duration-300 ${
                      focusedField === "password"
                        ? "text-[#00a2e8]"
                        : "text-slate-400"
                    }`}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••••••"
                    className="w-full ml-3 bg-transparent text-slate-800 placeholder-slate-300 font-medium focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification(
                      "Password reset email trigger is currently in sandbox mode.",
                      "info",
                    );
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full bg-[#00a2e8] hover:bg-[#008cc9] active:scale-[0.98] text-white py-3.5 px-4 rounded-2xl font-bold uppercase tracking-wider text-sm transition-all duration-200 shadow-lg shadow-sky-500/20 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Magic demo helper button */}
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="w-full border border-sky-500/20 hover:border-sky-500/40 bg-sky-50/50 hover:bg-sky-50 active:scale-[0.98] text-[#00a2e8] py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaMagic className="animate-bounce" />
                  Use Demo Account
                </button>
              </div>
            </form>

            {/* Separator OR line */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full border-t border-slate-100"></div>
              <span className="absolute px-3 bg-white text-xs font-semibold text-slate-400">
                OR
              </span>
            </div>

            {/* Register link */}
            <div className="mt-6 text-center">
              <p className="text-xs font-medium text-slate-400">
                Don't have account?{" "}
                <a
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification(
                      "Registration is disabled. Please contact the administrator for an account.",
                      "info",
                    );
                  }}
                  className="font-bold text-slate-700 hover:text-[#00a2e8] transition-colors"
                >
                  Register Now
                </a>
              </p>
            </div>
          </div>

          {/* Cityscape Skyline Graphic at bottom of right side card */}
          <BottomCityscape />
        </div>
      </div>
    </div>
  );
}
