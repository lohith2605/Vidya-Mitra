import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Registration successful, navigate to login page
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container register-container">

        {/* REGISTER FORM */}
        <div className="left-form">

          <form className="form" onSubmit={handleSubmit}>

            <h1>Registration</h1>

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

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p>or register with social platforms</p>

            <div className="social-icons">
              <a href="#">G</a>
              <a href="#">F</a>
              <a href="#">X</a>
              <a href="#">in</a>
            </div>

          </form>

        </div>

        {/* RIGHT PANEL */}
        <div className="right-side">

          <h1>Welcome Back!</h1>

          <p>Already have an account?</p>

          <Link to="/login">
            <button className="switch-btn">
              Login
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Register;