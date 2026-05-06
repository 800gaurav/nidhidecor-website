import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { showErrorToast, showSuccessToast } from "../component/toaster";
import { defaultStylesSidebar } from "../constants/colors";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { fetchData } = useAxios();
  
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (userId || token) {
      setFormData({ userId, password: token });
      handleLoginByAdmin(userId, token);
    }
  }, []);

  const handleLoginByAdmin = async (userIdw, tokenw) => {
    try {
      const res = await fetchData({
        url: "/api/v1/user/auth/login",
        method: "POST",
        data: { userId: userIdw, usertoken: tokenw },
      });
      if (res.success) {
        login(res.data);
        navigate("/dashboard");
      } else toast.error(res.message || "Login failed");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.password) {
      toast.error("User ID and Password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchData({ 
        url: "/api/v1/user/auth/login", 
        method: "POST", 
        data: formData 
      });
      
      if (res.success) {
        login(res.data);
        navigate("/dashboard");
        showSuccessToast(res.message || "Login Successful!");
      } else {
        showErrorToast(res.message || "Login failed");
      }
    } catch (err) {
      showErrorToast(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 loginscreen">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-30 h-30 rounded-xl mx-auto flex items-center justify-center mb-4">
              <img
                src="/Images/logo.jpg"
                alt="Logo"
                className="w-32 h-32 object-contain"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* User ID Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  name="userId"
                  type="text"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="Enter your user ID"
                  className="w-full pl-10 pr-4 h-12 
                           bg-white text-gray-900 
                           placeholder-gray-400 
                           border border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           transition-all duration-200"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 h-12 
                           bg-white text-gray-900 
                           placeholder-gray-400 
                           border border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                           transition-all duration-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {/* <div className="text-right">
              <NavLink
                to="/auth/forgot-password"
                className="text-sm font-medium transition-colors duration-200 hover:underline"
                style={{ color: defaultStylesSidebar.cardbg, fontWeight: "600" }}
              >
                Forgot Password?
              </NavLink>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              style={{ 
                color: "white", 
                background: defaultStylesSidebar.cardbg,
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* Signup Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="font-medium transition-colors duration-200 hover:underline"
                  style={{ color: defaultStylesSidebar.cardbg, fontWeight: "600" }}
                >
                  Sign up now
                </NavLink>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
