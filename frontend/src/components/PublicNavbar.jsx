import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <span className="navbar-brand fw-bold text-primary">
        VidyaMitra
      </span>

      <div className="ms-auto">
        <Link to="/about" className="btn btn-link me-3">
          About
        </Link>

        <Link to="/login" className="btn btn-outline-primary me-2">
          Login
        </Link>

        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default PublicNavbar;