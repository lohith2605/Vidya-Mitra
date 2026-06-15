import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (role === "admin") {
        if (email === "admin@vidyamitra.com" && password === "admin123") {
          localStorage.setItem("user_role", "admin");
          navigate("/admin");
          return;
        }
        throw new Error("Invalid Admin Credentials");
      }

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log('[Login] Response object', response);
      const data = await response.json();
      console.log('[Login] Response body', data);

      if (!response.ok) {
        throw new Error(data && data.message ? data.message : 'Login failed');
      }

      // Store token and user info using keys other components expect
      console.log('[Login] Received token', data.token);
      localStorage.setItem('vidya_user_token', data.token);
      localStorage.setItem('vidya_username', data.user && data.user.username ? data.user.username : 'User');
      localStorage.setItem('vidya_user_logged_in', 'true');
      localStorage.setItem('user_role', 'user');

      console.log('[Login] Stored token and user info, navigating to /privatehome');
      navigate('/privatehome');

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
          <h1>{role === "admin" ? "Admin Portal" : "Welcome Back"}</h1>
          <p>{role === "admin" ? "Manage System" : "Login to continue"}</p>

          <Link to="/register">
            <button className="switch-btn">Register</button>
          </Link>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <form className="form" onSubmit={handleSubmit}>

            <div className="role-switch">
              <button type="button" className={`role-btn ${role === "user" ? "active" : ""}`} onClick={() => setRole("user")}>User</button>
              <button type="button" className={`role-btn ${role === "admin" ? "active" : ""}`} onClick={() => setRole("admin")}>Admin</button>
            </div>

            <h1>{role === "admin" ? "Admin Login" : "User Login"}</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="input-box">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <span>👤</span>
            </div>

            <div className="input-box">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span>🔒</span>
            </div>

            <button className="btn" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>

            <p>or continue with</p>

            <div className="social-icons">
              <a className="google"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" /></a>
              <a className="facebook"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" /></a>
              <a className="github"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" /></a>
              <a className="twitter"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" /></a>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;