import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PrivateNavbar({ initialSearch = "", forceOpenProfile, setForceOpenProfile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(initialSearch);

  const [showCard, setShowCard] = useState(false);
  const [profile, setProfile] = useState({
    username: localStorage.getItem("vidya_username") || "",
    email: "",
    age: "",
    courseClass: "",
    selfDetails: "",
    fullName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editAge, setEditAge] = useState("");
  const [editCourseClass, setEditCourseClass] = useState("");
  const [editSelfDetails, setEditSelfDetails] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const username = profile.username || localStorage.getItem("vidya_username") || "";
  const initialLetter = username ? username.charAt(0).toUpperCase() : "👤";

  const fetchProfile = async () => {
    const token = localStorage.getItem("vidya_user_token");
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setProfile({
            username: data.user.username,
            email: data.user.email,
            age: data.user.age || "",
            courseClass: data.user.courseClass || "",
            selfDetails: data.user.selfDetails || "",
            fullName: data.user.fullName || "",
          });
          setEditAge(data.user.age || "");
          setEditCourseClass(data.user.courseClass || "");
          setEditSelfDetails(data.user.selfDetails || "");
          setEditFullName(data.user.fullName || "");
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleToggleCard = () => {
    setShowCard((prev) => {
      const next = !prev;
      if (next) {
        fetchProfile();
        setIsEditing(false);
        setSuccess("");
        setError("");
      }
      return next;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const token = localStorage.getItem("vidya_user_token");
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: editAge,
          courseClass: editCourseClass,
          selfDetails: editSelfDetails,
          fullName: editFullName,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setProfile((prev) => ({
          ...prev,
          age: data.user.age,
          courseClass: data.user.courseClass,
          selfDetails: data.user.selfDetails,
          fullName: data.user.fullName,
        }));
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        window.dispatchEvent(new Event("profileUpdate"));
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Server error updating profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (forceOpenProfile) {
      setShowCard(true);
      fetchProfile();
      setIsEditing(true);
      if (setForceOpenProfile) {
        setForceOpenProfile(false);
      }
    }
  }, [forceOpenProfile, setForceOpenProfile]);

  const handleLogout = () => {
    localStorage.removeItem("vidya_user_logged_in");
    localStorage.removeItem("vidya_user_token");
    localStorage.removeItem("vidya_username");
    localStorage.removeItem("user_role");
    navigate("/");
  };

  const handleSearch = () => {
    const query = search.trim();
    if (query) {
      navigate(`/colleges?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/colleges");
    }
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
      <button
        type="button"
        onClick={() => navigate("/privatehome")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: 0,
        }}
      >
        
        <div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>🎓 VidyaMitra</div>
        </div>
      </button>

      {location.pathname !== "/colleges" && (
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
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
            <button
              type="button"
              onClick={handleSearch}
              style={{
                border: "none",
                background: "transparent",
                color: "#4f46e5",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.92rem",
                padding: "0 0.5rem",
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {location.pathname !== "/privatehome" && (
          <button
            type="button"
            onClick={() => navigate("/privatehome")}
            style={{
              padding: "0.72rem 1rem",
              borderRadius: "999px",
              border: "1px solid rgba(99,102,241,0.18)",
              background: "rgba(255,255,255,0.96)",
              color: "#3730a3",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "0.92rem",
            }}
          >
            Home
          </button>
        )}
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
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={handleToggleCard}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "1px solid rgba(99,102,241,0.18)",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#ffffff",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {initialLetter}
          </button>
          
          {showCard && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "0.8rem",
                width: "320px",
                background: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(15,23,42,0.15)",
                border: "1px solid rgba(99,102,241,0.15)",
                padding: "1.5rem",
                zIndex: 100,
                fontFamily: "'Inter', sans-serif",
                color: "#1e293b",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#ffffff",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {initialLetter}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>{username}</h4>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", wordBreak: "break-all" }}>{profile.email || "Loading..."}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCard(false)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#94a3b8",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>

              <hr style={{ border: 0, borderTop: "1px solid #f1f5f9", margin: "1rem 0" }} />

              {error && (
                <div style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.5rem", textAlign: "left" }}>{error}</div>
              )}
              {success && (
                <div style={{ color: "#10b981", fontSize: "0.8rem", marginBottom: "0.5rem", textAlign: "left" }}>{success}</div>
              )}

              {isEditing ? (
                <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", marginBottom: "0.25rem" }}>Full Name</label>
                    <input
                      type="text"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      placeholder="Enter full name"
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.88rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", marginBottom: "0.25rem" }}>Age</label>
                    <input
                      type="text"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      placeholder="Enter age"
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.88rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", marginBottom: "0.25rem" }}>Course & Class</label>
                    <input
                      type="text"
                      value={editCourseClass}
                      onChange={(e) => setEditCourseClass(e.target.value)}
                      placeholder="e.g. B.Tech CSE, Class 12"
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.88rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", marginBottom: "0.25rem" }}>Self Details</label>
                    <textarea
                      value={editSelfDetails}
                      onChange={(e) => setEditSelfDetails(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows="3"
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.88rem",
                        outline: "none",
                        resize: "none",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "8px",
                        border: "none",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditAge(profile.age);
                        setEditCourseClass(profile.courseClass);
                        setEditSelfDetails(profile.selfDetails);
                        setEditFullName(profile.fullName);
                        setError("");
                      }}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: "#ffffff",
                        color: "#64748b",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>Full Name</span>
                    <span style={{ fontSize: "0.9rem", color: "#334155" }}>{profile.fullName || <em style={{ color: "#94a3b8" }}>Not specified</em>}</span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>Age</span>
                    <span style={{ fontSize: "0.9rem", color: "#334155" }}>{profile.age || <em style={{ color: "#94a3b8" }}>Not specified</em>}</span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>Course & Class</span>
                    <span style={{ fontSize: "0.9rem", color: "#334155" }}>{profile.courseClass || <em style={{ color: "#94a3b8" }}>Not specified</em>}</span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>Self Details</span>
                    <span style={{ fontSize: "0.9rem", color: "#334155", whiteSpace: "pre-line" }}>{profile.selfDetails || <em style={{ color: "#94a3b8" }}>Not specified</em>}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    style={{
                      marginTop: "0.5rem",
                      width: "100%",
                      padding: "0.55rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(99,102,241,0.3)",
                      background: "rgba(99,102,241,0.06)",
                      color: "#4f46e5",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default PrivateNavbar;