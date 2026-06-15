import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error("All fields are required.");
      }

      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data && data.message ? data.message : "Login failed");
      }

      // Store admin session
      localStorage.setItem("vidya_admin_token", data.token);
      localStorage.setItem("vidya_admin_logged_in", "true");
      localStorage.setItem("user_role", "admin");

      console.log("[AdminLogin] Admin logged in successfully. Navigating to /admin");
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <h1>Admin Portal</h1>
          <p>Configure and manage college databases for students</p>
          <Link to="/login">
            <button className="switch-btn">User Login</button>
          </Link>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <form className="form" onSubmit={handleSubmit}>
            <div className="role-switch">
              <button type="button" className="role-btn" onClick={() => navigate("/login")}>User</button>
              <button type="button" className="role-btn active" onClick={() => navigate("/admin/login")}>Admin</button>
            </div>

            <h1 style={{ marginBottom: "30px", fontWeight: "700", color: "#334155" }}>
              Admin Login
            </h1>

            {error && (
              <p
                style={{
                  color: "#ef4444",
                  background: "#fef2f2",
                  border: "1px solid #fee2e2",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  marginBottom: "20px",
                }}
              >
                ⚠️ {error}
              </p>
            )}

            <div className="input-box">
              <input
                type="email"
                placeholder="Email Address (admin@vidyamitra.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>👤</span>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>🔒</span>
            </div>

            <button className="btn" disabled={loading} style={{ marginTop: "10px" }}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
