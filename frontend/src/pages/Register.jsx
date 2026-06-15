import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // FIXED (now used properly)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // FIXED
    try {
      console.log("[Register] Sending request to backend", {
        url: "http://localhost:5000/api/auth/register",
        body: { username, email, password },
      });

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("[Register] Response status", res.status);

      let dataText;
      try {
        dataText = await res.text();
        // Try parse as JSON for structured error messages
        try {
          console.log("[Register] Response body (json)", JSON.parse(dataText));
        } catch (e) {
          console.log("[Register] Response body (text)", dataText);
        }
      } catch (e) {
        console.log("[Register] Failed to read response body", e.message);
      }

      if (!res.ok) {
        // if response body contained JSON, prefer its message
        let parsed;
        try {
          parsed = JSON.parse(dataText);
        } catch (e) {}
        throw new Error((parsed && parsed.message) || "Registration failed");
      }

      navigate("/login");

    } catch (err) {
      console.error("[Register] Fetch error", err);
      setError(err.message);
    } finally {
      setLoading(false); // FIXED
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <h1>Create Account</h1>
          <p>Join VidyaMitra Platform</p>

          <Link to="/login">
            <button className="switch-btn">Login</button>
          </Link>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <form className="form" onSubmit={handleSubmit}>

            <h1>Register</h1>

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>
                {error}
              </p>
            )}

            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span>👤</span>
            </div>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span>📧</span>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>🔒</span>
            </div>

            <button className="btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p>or continue with social platforms</p>

            <div className="social-icons">
              <a className="google">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
              </a>
              <a className="facebook">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" />
              </a>
              <a className="github">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
              </a>
              <a className="twitter">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" />
              </a>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;