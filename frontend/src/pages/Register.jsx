import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Registration Failed"
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
        username
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

        <div className="left-panel register-panel">
          <h1>
            Create Account
          </h1>

          <p>
            Join VidyaMitra
          </p>

          <Link to="/login">
            <button className="switch-btn">
              Login
            </button>
          </Link>
        </div>

        <div className="right-panel">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <h1>Register</h1>

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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />
              <span>📧</span>
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
                ? "Registering..."
                : "Register"}
            </button>

            <p>
              or continue with social
              platforms
            </p>

            <div className="social-icons">
              <a className="google">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt=""
                />
              </a>

              <a className="facebook">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                  alt=""
                />
              </a>

              <a className="github">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt=""
                />
              </a>

              <a className="twitter">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
                  alt=""
                />
              </a>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;