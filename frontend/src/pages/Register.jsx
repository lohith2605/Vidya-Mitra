import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("vidya_user_logged_in", "true");
    navigate("/privatehome");
  };

  return (
    <div className="auth-page">
      <div className="auth-container register-container">

        {/* REGISTER FORM */}
        <div className="left-form">

          <form className="form" onSubmit={handleSubmit}>

            <h1>Registration</h1>

            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <span>👤</span>
            </div>

            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <span>📧</span>
            </div>

            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <span>🔒</span>
            </div>

            <button type="submit" className="btn">
              Register
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

          <Link to="/">
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