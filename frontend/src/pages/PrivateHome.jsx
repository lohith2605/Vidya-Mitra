import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";

function PrivateHome() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [forceOpenProfile, setForceOpenProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("vidya_user_logged_in") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const checkProfile = async () => {
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
          setProfileData(data.user);
          const hasNotEdited = !data.user.age && !data.user.courseClass && !data.user.selfDetails && !data.user.fullName;
          if (hasNotEdited) {
            setShowProfilePrompt(true);
          }
        }
      }
    } catch (err) {
      console.error("Error checking profile:", err);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  useEffect(() => {
    const handleProfileUpdate = () => {
      checkProfile();
    };
    window.addEventListener("profileUpdate", handleProfileUpdate);
    return () => {
      window.removeEventListener("profileUpdate", handleProfileUpdate);
    };
  }, []);

  const displayName = profileData?.fullName || localStorage.getItem("vidya_username") || "User";

  return (

    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #f8fafc, #eef2ff, #ede9fe)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >

      {/* NAVBAR */}
      <PrivateNavbar forceOpenProfile={forceOpenProfile} setForceOpenProfile={setForceOpenProfile} />

      {/* MAIN CONTENT */}
      <div
        className="container"
        style={{
          flex: 1,
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >

        {/* HERO SECTION */}
        <div
          className="text-center"
          style={{
            animation: "fadeIn 1s ease",
          }}
        >

          {/* GREETING */}
          <div
            style={{
              fontSize: "2.2rem",
              fontWeight: "600",
              color: "#4f46e5",
              marginBottom: "0.5rem",
            }}
          >
            Hey {displayName} 👋
          </div>

          {/* TITLE */}
          <h1
            className="fw-bold"
            style={{
              fontSize: "4rem",
              lineHeight: "1.1",
              color: "#000",
            }}
          >
            Welcome to Vidya-Mitra 🎓
          </h1>

          {/* DESCRIPTION */}
          <p
            className="lead mt-3 mx-auto"
            style={{
              maxWidth: "700px",
              color: "#6b7280",
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            Your smart career guidance platform helping students
            choose the right path and build a successful future.
          </p>

          {/* BUTTONS */}
          <div
            className="mt-4 d-flex justify-content-center align-items-center gap-2 flex-nowrap"
          >

            {/* START QUIZ */}
            <button
              className="btn"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                color: "#fff",
                padding: "10px 20px",
                minWidth: "140px",
                fontSize: "19px",
                fontWeight: "600",
                borderRadius: "50px",
                boxShadow:
                  "0 4px 10px rgba(99,102,241,0.22)",
                transition: "0.3s ease",
                whiteSpace: "nowrap",
              }}
              onClick={() => navigate("/quiz")}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0px)";
              }}
            >
              Start Quiz
            </button>

            {/* LEARN MORE */}
            <button
              className="btn"
              style={{
                background: "#fff",
                color: "#6366f1",
                border: "1px solid #c7d2fe",
                padding: "10px 20px",
                minWidth: "140px",
                fontSize: "19px",
                fontWeight: "600",
                borderRadius: "50px",
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.05)",
                transition: "0.3s ease",
                whiteSpace: "nowrap",
              }}
              onClick={() => navigate("/about", { state: { from: "/privatehome" } })}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.background = "#eef2ff";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0px)";
                e.target.style.background = "#fff";
              }}
            >
              Learn More
            </button>

          </div>

        </div>

        {/* FEATURE CARDS */}
        <div
          className="mt-5 d-flex gap-4 pb-3"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            paddingBottom: "10px",
          }}
        >

          {[
            {
              title: "Quiz",
              desc: "Test your knowledge and discover your strengths.",
              icon: "🧠",
            },
           
            {
              title: "Roadmaps",
              desc: "Follow structured paths to achieve your goals.",
              icon: "🛣️",
            },
            {
              title: "Colleges",
              desc: "Explore top colleges and universities.",
              icon: "🏛️",
            },
           
             {
              title: "Career Guidance",
              desc: "Discover the best career options based on your interests and skills.",
              icon: "🎯",
            },
           
          ].map((item, i) => (

            <div
              key={i}
              onClick={() => {
                  if (item.title === "Roadmaps") {
                    navigate("/roadmaps");
                  } else if (item.title === "Quiz") {
                    navigate("/quiz");
                  } else if (item.title === "Colleges") {
                    navigate("/colleges");
                  } else if (item.title === "Career Guidance") {
                    setShowModal(true);
                  }
                }}
              style={{
                minWidth: "300px",
                maxWidth: "300px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
                padding: "30px",
                transition: "0.3s ease",
                cursor: "pointer",
                animation: "cardFade 1s ease",
                flexShrink: 0,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >

              {/* ICON */}
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "15px",
                }}
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h4
                className="fw-bold"
                style={{
                  color: "#000",
                  marginBottom: "15px",
                }}
              >
                {item.title}
              </h4>

              {/* DESCRIPTION */}
              <p
                style={{
                  color: "#6b7280",
                  lineHeight: "1.7",
                  marginBottom: 0,
                }}
              >
                {item.desc}
              </p>

            </div>

          ))}

        </div>

        {showModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
            style={{
              position: "fixed",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "rgba(0,0,0,0.36)",
              zIndex: 40,
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              style={{
                width: "min(540px,90%)",
                padding: "26px",
                borderRadius: "14px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(245,245,255,0.75))",
                boxShadow: "0 12px 40px rgba(2,6,23,0.28)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: "1.25rem" }}>Ready to begin?</h3>
                <button onClick={() => setShowModal(false)} style={{ border: "none", background: "transparent", fontSize: "1.1rem", cursor: "pointer" }}>✕</button>
              </div>

              <p style={{ color: "#374151", marginBottom: 20 }}>
                Start your journey with Quiz.
              </p>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  onClick={() => {
                    setShowModal(false);
                    navigate("/quiz");
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Quiz
                </button>
                <button onClick={() => setShowModal(false)} style={{ padding: "10px 16px", borderRadius: "999px", border: "1px solid rgba(0,0,0,0.06)", background: "#fff", cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </div>
        )}

        {showProfilePrompt && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "rgba(0,0,0,0.36)",
              zIndex: 35,
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              style={{
                width: "min(480px, 90%)",
                padding: "26px",
                borderRadius: "16px",
                background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,245,255,0.85))",
                boxShadow: "0 12px 40px rgba(2,6,23,0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(99,102,241,0.2)",
                fontFamily: "'Inter', sans-serif",
                color: "#1e293b",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.75rem" }}>👤</span>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0f172a" }}>Complete Your Profile</h3>
              </div>
              <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                Welcome to VidyaMitra! You haven't updated your profile details yet. Let us know your age, course, class, and self details so we can customize your guidance experience.
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  onClick={() => {
                    setShowProfilePrompt(false);
                    setForceOpenProfile(true);
                  }}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "99px",
                    border: "none",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
                    transition: "transform 0.2s",
                  }}
                >
                  Go to Profile
                </button>
                <button
                  onClick={() => setShowProfilePrompt(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "99px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#64748b",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ANIMATIONS */}
      <style>
        {`

        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateY(40px);
          }
          to{
            opacity:1;
            transform:translateY(0px);
          }
        }

        @keyframes cardFade{
          from{
            opacity:0;
            transform:translateY(20px);
          }
          to{
            opacity:1;
            transform:translateY(0px);
          }
        }

        /* SCROLLBAR */

        ::-webkit-scrollbar{
          height:6px;
          width:6px;
        }

        ::-webkit-scrollbar-thumb{
          background:#c7d2fe;
          border-radius:10px;
        }

        /* MOBILE */

        @media(max-width:768px){

          h1{
            font-size:2.5rem !important;
          }

          .lead{
            font-size:1rem !important;
          }

        }

        `}
      </style>

    </div>
  );
}

export default PrivateHome;