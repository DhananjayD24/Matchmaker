import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaUser, FaLock, FaMagic } from "react-icons/fa";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);

      if (response.success) {
        login(response.user);
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <FaHeart className="text-4xl" />
            <h1 className="text-4xl font-bold">
              Matchmaker CRM
            </h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            AI-Powered
            <br />
            Matchmaking
          </h2>

          <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
            Manage customer profiles, generate
            intelligent matches, review AI
            compatibility insights, and track
            matchmaking activities from one
            professional dashboard.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-2">
              Smart Matching
            </h3>

            <p className="text-blue-100">
              AI-powered recommendations using
              profile compatibility and notes.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-2">
              CRM Dashboard
            </h3>

            <p className="text-blue-100">
              Organize customers, notes, matches,
              and follow-ups efficiently.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-2">
              Gemini AI Reviews
            </h3>

            <p className="text-blue-100">
              Generate compatibility insights and
              personalized introductions instantly.
            </p>
          </div>
        </div>

        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10"></div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-3">
              <FaHeart className="text-blue-600 text-4xl" />
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Matchmaker CRM
            </h1>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">
              Welcome Back
            </h2>

            <p className="text-slate-500 mb-8">
              Sign in to continue
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-5">
                {error}
              </div>
            )}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-slate-400" />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-4 text-slate-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {loading
                  ? "Signing In..."
                  : "Login"}
              </button>

              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <FaMagic />
                Use Demo Account
              </button>
            </form>

            <div className="mt-8 p-4 bg-slate-50 rounded-xl border">
              <h3 className="font-semibold text-slate-700 mb-2">
                Demo Credentials
              </h3>

              <p className="text-sm text-slate-600">
                Username:
                <span className="font-semibold ml-2">
                  matchmaker1
                </span>
              </p>

              <p className="text-sm text-slate-600">
                Password:
                <span className="font-semibold ml-2">
                  123456
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}