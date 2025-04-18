import { useState } from "react";
import "../assets/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role,setrole] = useState("")
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/register", {
        username: name,
        email,
        password,
        role
      });

      toast.success(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);

      if (error.response?.status === 409) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Sign Up</h2>
          <p>Get practice with virtaul classroom</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">User Name</label>
            <div className="input-container">
              <span className="icon">👤</span>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div className="form-group role-select-group">
  <label htmlFor="role">Role</label>
  <div className="input-container role-select-container">
    <span className="icon">👥</span>
    <select
      id="role"
      className="role-select"
      value={role}
      onChange={(e) => setrole(e.target.value)}
      required
    >
      <option value="">Select role</option>
      <option value="student">Student</option>
      <option value="teacher">Faculty</option>
    </select>
    <span className="role-select-arrow"></span>
  </div>
</div>

          <button
            type="submit"
            className={`auth-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner" /> : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
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
