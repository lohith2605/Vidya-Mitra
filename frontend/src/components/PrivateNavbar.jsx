import { useNavigate } from "react-router-dom";

function PrivateNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("vidya_user_logged_in");
    navigate("/");
  };

  return (
    <header
      style={{
        width: "100%",
        padding: "0.8rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "14px",
            background: "white",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        >
         🎓
        </div>
        <div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>VidyaMitra</div>
         
        </div>
      </div>

      <div
        style={{
          flex: 1,
          maxWidth: "520px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(99,102,241,0.18)",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 10px 30px rgba(99,102,241,0.08)",
          }}
        >
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(99,102,241,0.14)",
              color: "#6366f1",
              fontSize: "1rem",
            }}
          >
            🔍
          </span>
          <input
            type="search"
            placeholder="Search colleges, career paths..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "0.92rem",
              color: "#111827",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: "0.72rem 1rem",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.92rem",
          }}
        >
          Logout
        </button>
        <button
          type="button"
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "1px solid rgba(99,102,241,0.18)",
            background: "rgba(99,102,241,0.12)",
            color: "#3730a3",
            fontSize: "1rem",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          👤
        </button>
      </div>
    </header>
  );
}

export default PrivateNavbar;