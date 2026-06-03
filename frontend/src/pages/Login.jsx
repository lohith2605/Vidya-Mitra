import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save user details & token
      localStorage.setItem("vidya_user_token", data.token);
      localStorage.setItem("vidya_user_logged_in", "true");
      localStorage.setItem("vidya_username", data.user.username);

      // Redirect to dashboard
      navigate("/privatehome");
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
          <h1>Hello, Welcome!</h1>

          <p>Don't have an account?</p>

          <Link to="/register">
            <button className="switch-btn">
              Register
            </button>
          </Link>
        </div>

        {/* LOGIN FORM */}
        <div className="right-panel">
          <form className="form" onSubmit={handleSubmit}>

            <h1>Login</h1>

            {error && (
              <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>
                ⚠️ {error}
              </div>
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
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <span>🔒</span>
            </div>

            <a href="#" className="forgot">
              Forgot Password?
            </a>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p>or login with social platforms</p>

            <div className="social-icons">
              <a href="#">G</a>
              <a href="#">F</a>
              <a href="#">X</a>
              <a href="#">in</a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;