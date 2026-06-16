import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ADMIN LOGIN
      if (role === "admin") {
        if (
          username === "admin" &&
          password === "admin123"
        ) {
          localStorage.setItem(
            "vidya_user_logged_in",
            "true"
          );

          localStorage.setItem(
            "user_role",
            "admin"
          );

          navigate("/admin");
          return;
        }

        throw new Error(
          "Invalid Admin Credentials"
        );
      }

      // USER LOGIN
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Login Failed"
        );
      }

      localStorage.setItem(
        "vidya_user_logged_in",
        "true"
      );

      localStorage.setItem(
        "vidya_user_token",
        data.token
      );

      localStorage.setItem(
        "vidya_username",
        data.user.username
      );

      localStorage.setItem(
        "user_role",
        "user"
      );

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

        <div className="left-panel">
          <h1>
            {role === "admin"
              ? "Admin Portal"
              : "Welcome Back"}
          </h1>

          <p>
            {role === "admin"
              ? "Manage Platform"
              : "Login To Continue"}
          </p>

          <Link to="/register">
            <button className="switch-btn">
              Register
            </button>
          </Link>
        </div>

        <div className="right-panel">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="role-switch">
              <button
                type="button"
                className={`role-btn ${
                  role === "user"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setRole("user")
                }
              >
                👨‍🎓 User
              </button>

              <button
                type="button"
                className={`role-btn ${
                  role === "admin"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setRole("admin")
                }
              >
                👨‍💼 Admin
              </button>
            </div>

            <h1>
              {role === "admin"
                ? "Admin Login"
                : "User Login"}
            </h1>

            {error && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                required
              />
              <span>👤</span>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
              <span>🔒</span>
            </div>

            <button
              className="btn"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : role === "admin"
                ? "Admin Login"
                : "Login"}
            </button>

            <p>
              or continue with social
              platforms
            </p>

            <div className="social-icons">
              <a className="google">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt="google"
                />
              </a>

              <a className="facebook">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                  alt="facebook"
                />
              </a>

              <a className="github">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="github"
                />
              </a>

              <a className="twitter">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
                  alt="twitter"
                />
              </a>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;