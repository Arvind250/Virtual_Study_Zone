import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Login successful!");

      // Extract data from the response
      const { role, _id, username } = res.data.data.user;
      const token = res.data.data.accessToken;

      // Save user details and token to localStorage
      localStorage.setItem("role", role);
      localStorage.setItem("userId", _id);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);

      // Navigate to the appropriate dashboard based on the role
      if (role === "teacher") {
        navigate("/dashboard/teacher");
      } else if (role === "student") {
        navigate("/dashboard/student");
      } else {
        navigate("/dashboard"); // fallback if role is not found
      }
    } catch (error) {
      console.error("Login error:", error?.response?.data);
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 border-2 border-indigo-400/30 rounded-lg transform rotate-45 animate-bounce opacity-30" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-32 right-48 w-12 h-12 border-2 border-teal-400/30 rounded-full animate-bounce opacity-20" style={{animationDelay: '2.5s', animationDuration: '7s'}}></div>
        <div className="absolute top-1/3 right-1/5 w-24 h-24 border-2 border-amber-400/30 rounded-md transform rotate-12 animate-bounce opacity-20" style={{animationDelay: '1.5s', animationDuration: '8s'}}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-slate-800/70 backdrop-blur-xl rounded-2xl overflow-hidden w-full max-w-md shadow-2xl border border-slate-700/50">
        {/* Card Header with Glowing Edge */}
        <div className="relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-2/3 h-10 bg-indigo-500/30 blur-2xl rounded-full"></div>
          <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 px-8 py-6 border-b border-slate-700/50">
            <div className="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-teal-200">Login</div>
            <p className="text-indigo-200">Welcome back to Virtual Classroom!</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-3 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-3 shadow-sm"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:-translate-y-1"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="pt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}