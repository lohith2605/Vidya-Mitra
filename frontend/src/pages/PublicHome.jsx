import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function PublicHome() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #eef2ff, #f8fafc, #ede9fe)",
        fontFamily: "Inter, sans-serif",
        color: "#111827",
      }}
    >
      <PublicNavbar />

      <main
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "3rem 2rem 4rem",
        }}
      >
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                marginBottom: "1rem",
                color: "#4f46e5",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
             
            </p>
            <h1
              style={{
                fontSize: "clamp(2.75rem, 4vw, 4.5rem)",
                lineHeight: 1.05,
                marginBottom: "1.25rem",
                background: "linear-gradient(135deg,#4f46e5,#7c3aed,#3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your personalized learning command center.
            </h1>
            <p
              style={{
                maxWidth: "640px",
                color: "#4b5563",
                fontSize: "1.05rem",
                lineHeight: 1.9,
                marginBottom: "2rem",
              }}
            >
              Manage your career planning, explore college matches, launch quizzes,
              and monitor progress. All in one place.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {[
                { label: "Explore Colleges", variant: "primary", action: () => navigate("/colleges") },
                { label: "Start Quiz", variant: "secondary", action: () => navigate("/quiz") },
                { label: "View Roadmaps", variant: "ghost", action: () => navigate("/roadmaps") },
                
              ].map((button) => (
                <button
                  key={button.label}
                  onClick={button.action}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px) scale(1.02)";
                    e.target.style.boxShadow = button.variant === "ghost" 
                      ? "0 20px 40px rgba(99,102,241,0.15)" 
                      : "0 20px 50px rgba(99,102,241,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                    e.target.style.boxShadow = button.variant === "ghost"
                      ? "0 10px 28px rgba(99,102,241,0.06)"
                      : "0 10px 25px rgba(99,102,241,0.16)";
                  }}
                  style={{
                    minWidth: "170px",
                    padding: "0.95rem 1.2rem",
                    borderRadius: "999px",
                    border: button.variant === "ghost" ? "1px solid rgba(99,102,241,0.2)" : "none",
                    background:
                      button.variant === "secondary"
                        ? "linear-gradient(135deg, rgba(238,242,255,0.9), rgba(238,242,255,1))"
                        : button.variant === "ghost"
                        ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,1))"
                        : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: button.variant === "secondary" || button.variant === "ghost" ? "#3730a3" : "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow:
                      button.variant === "ghost"
                        ? "0 10px 28px rgba(99,102,241,0.06)"
                        : "0 10px 25px rgba(99,102,241,0.16)",
                    transition: "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                    fontSize: "1rem",
                    letterSpacing: "0.5px",
                    textTransform: "none",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.8)",
              borderRadius: "30px",
              padding: "2.25rem",
              boxShadow: "0 30px 80px rgba(15,23,42,0.08)",
              border: "1px solid rgba(148,163,184,0.18)",
              backdropFilter: "blur(18px)",
            }}
          >
            <p
              style={{
                marginBottom: "1rem",
                color: "#6b7280",
                fontWeight: 700,
              }}
            >
              Quick actions
            </p>
            <div style={{ display: "grid", gap: "1rem" }}>
              {[
                {
                  title: "College Match",
                  subtitle: "See top institutions tailored for your profile.",
                  accent: "#c7d2fe",
                },
                {
                  title: "Skill Assessment",
                  subtitle: "Complete a short quiz to find your strengths.",
                  accent: "#d8b4fe",
                },
                {
                  title: "Mentor Connect",
                  subtitle: "Chat with career advisors and AI mentors.",
                  accent: "#bfdbfe",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: "1.2rem",
                    borderRadius: "24px",
                    background: "rgba(255,255,255,0.92)",
                    border: `1px solid ${item.accent}`,
                  }}
                >
                  <p style={{ color: "#3730a3", fontWeight: 700, marginBottom: "0.5rem" }}>
                    {item.title}
                  </p>
                  <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.7 }}>
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: "3rem" }}>
          <div
            style={{
              display: "grid",
              gap: "1.25rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {[
              {
                title: "Personalized Roadmaps",
                desc: "Track your progress with tailored steps and milestones.",
                icon: "🛣️",
              },
              {
                title: "College Insights",
                desc: "Compare programs, fees, and placement data quickly.",
                icon: "🏫",
              },
              {
                title: "Mentor Sessions",
                desc: "Book guidance sessions with subject experts.",
                icon: "💬",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  padding: "2rem",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(148,163,184,0.16)",
                  boxShadow: "0 20px 45px rgba(15,23,42,0.08)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "16px",
                    background: "rgba(99,102,241,0.12)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {card.icon}
                </span>
                <h3 style={{ margin: 0, marginBottom: "0.75rem", color: "#1f2937" }}>{card.title}</h3>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.8 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PublicHome;