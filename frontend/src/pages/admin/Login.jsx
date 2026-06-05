import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Standard fallback mapping: if user inputs 'admin' we can treat it as 'admin@welcomeenterprises.com'
    const finalEmail = email.includes("@") ? email : "admin@welcomeenterprises.com";

    const res = await login(finalEmail, password);
    if (res.success) {
      navigate("/admin/dashboard");
    } else {
      setError(res.message || "Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 style={{ color: "var(--gold-400)" }}>Admin Panel</h1>
        <p className="subtitle">WELCOME ENTERPRISES – TAJ REAL ESTATE</p>
        
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username / Email</label>
            <input 
              id="username" 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              autoComplete="username" 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              autoComplete="current-password" 
            />
          </div>
          
          {error && (
            <p id="login-error" style={{ color: "#f87171", fontSize: "0.85rem", display: "block", marginBottom: "1rem" }}>
              {error}
            </p>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%", justifyContent: "center" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--gray-500)" }}>
          Demo: admin / welcome@2026<br />
          <Link to="/" style={{ color: "var(--gold-400)", display: "inline-block", marginTop: "0.5rem" }}>
            ← Back to Website
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
