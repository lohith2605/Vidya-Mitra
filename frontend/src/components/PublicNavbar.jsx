import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav className="navbar navbar-expand-lg px-4 py-3 bg-white/70 backdrop-blur-lg shadow-sm">
      
      <span className="navbar-brand fw-bold text-xl">
        Vidya-Mitra 🎓
      </span>

      <div className="ms-auto d-flex align-items-center gap-3">

        
 

        {/* About */}
        <Link
          to="/about"
          className="px-4 py-2 rounded-pill text-white fw-medium"
          style={{
            color: "white",
            textDecoration: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 6px 15px rgba(99,102,241,0.3)",
            border: "none"
          }}
        >
          About
        </Link>

        {/* Login */}
        <Link
          to="/login"
          className="px-4 py-2 rounded-pill text-white fw-medium"
          style={{
            color: "white",
            textDecoration: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 6px 15px rgba(99,102,241,0.3)",
            border: "none"
          }}
        >
          Login
        </Link>

        {/* Register */}
        <Link
          to="/register"
          className="px-4 py-2 rounded-pill text-white fw-medium"
          style={{
            color: "white",
            textDecoration: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 6px 15px rgba(99,102,241,0.3)",
            border: "none"
          }}
        >
          Register
        </Link>

      </div>
    </nav>
  );
}

export default PublicNavbar;