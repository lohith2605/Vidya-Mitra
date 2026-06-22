import { Link, useLocation } from "react-router-dom";

function PublicNavbar() {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(243, 239, 252, 0.5)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        fontFamily: "'Outfit', 'Inter', sans-serif"
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* Brand/Logo */}
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none"
          style={{ cursor: "pointer" }}
        >
          <span style={{ fontSize: "1.6rem" }}>🎓</span>
          <span
            className="fw-bold"
            style={{
              fontSize: "1.45rem",
              color: "#1e1b4b",
              letterSpacing: "-0.5px"
            }}
          >
            VidyaMitra
          </span>
        </Link>

        {/* Central Nav Links */}
        <div className="d-none d-lg-flex align-items-center gap-4 mx-auto">
          {[
            { label: "Home", path: "/", active: location.pathname === "/" },

            { label: "About Us", path: "/about" },

            { label: "Contact", path: "#contact" }
          ].map((link) => (
            <Link
              key={link.label}
              to={link.path.startsWith("#") ? "/" : link.path}
              className="text-decoration-none px-2 py-1 fw-medium position-relative smooth-hover"
              style={{
                color: link.active ? "#6366f1" : "#4b5563",
                fontSize: "0.98rem",
                transition: "color 0.25s ease"
              }}
              onMouseEnter={(e) => {
                if (!link.active) e.target.style.color = "#6366f1";
              }}
              onMouseLeave={(e) => {
                if (!link.active) e.target.style.color = "#4b5563";
              }}
            >
              {link.label}
              {link.active && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "8px",
                    right: "8px",
                    height: "3px",
                    borderRadius: "2px",
                    backgroundColor: "#6366f1"
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right CTA Buttons */}
        <div className="d-flex align-items-center gap-3">
          {/* Login */}
          <Link
            to="/login"
            className="btn rounded-pill fw-medium smooth-hover d-flex align-items-center justify-content-center"
            style={{
              padding: "0.55rem 1.6rem",
              fontSize: "0.95rem",
              color: "#4f46e5",
              backgroundColor: "#ffffff",
              border: "1px solid rgba(79, 70, 229, 0.22)",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.04)",
              textDecoration: "none"
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(79, 70, 229, 0.5)";
              e.target.style.boxShadow = "0 6px 16px rgba(79, 70, 229, 0.08)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(79, 70, 229, 0.22)";
              e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.04)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="btn rounded-pill fw-medium text-white smooth-hover d-flex align-items-center justify-content-center"
            style={{
              padding: "0.55rem 1.6rem",
              fontSize: "0.95rem",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              boxShadow: "0 6px 18px rgba(79, 70, 229, 0.25)",
              border: "none",
              textDecoration: "none"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #4f46e5, #4338ca)";
              e.target.style.boxShadow = "0 8px 22px rgba(79, 70, 229, 0.35)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)";
              e.target.style.boxShadow = "0 6px 18px rgba(79, 70, 229, 0.25)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default PublicNavbar;