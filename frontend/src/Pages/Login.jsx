import { useState } from "react";
import "../assets/Auth.css";
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
      const res = await axios.post("http://localhost:8000/api/v1/users/login",
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
      alert('Login Failed');
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Login</h2>
          <p>Welcome back!</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <span className="icon">✉️</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <span className="icon">🔒</span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`auth-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner" /> : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      <div className="auth-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
}
