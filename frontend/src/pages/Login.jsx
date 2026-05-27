import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("vidya_user_logged_in", "true");
    navigate("/privatehome");
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

            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <span>👤</span>
            </div>

            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <span>🔒</span>
            </div>

            <a href="#" className="forgot">
              Forgot Password?
            </a>

            <button type="submit" className="btn">
              Login
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