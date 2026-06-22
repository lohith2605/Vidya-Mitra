import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import heroImg from "../assets/hero.png";

function PublicHome() {
  const navigate = useNavigate();

  return (
    <div
      className="public-home-font"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "radial-gradient(circle at 80% 20%, #f4f0fd 0%, #ffffff 50%, #fbf9ff 100%)",
        color: "#1f2937",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      {/* Navigation */}
      <PublicNavbar />

      {/* Hero Section */}
      <main className="container-xl px-4 py-5" style={{ minHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

        <div className="row align-items-center g-5 py-3 py-lg-5">
          {/* Left Content Column */}
          <div className="col-lg-6 text-center text-lg-start">
            {/* Plan. Learn. Achieve Badge */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4 smooth-hover"
              style={{
                backgroundColor: "#f3e8ff",
                border: "1px solid rgba(124, 58, 237, 0.12)",
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.05)"
              }}
            >
              <span style={{ color: "#7c3aed", fontSize: "0.9rem" }}>★</span>
              <span
                style={{
                  color: "#6b21a8",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px"
                }}
              >
                Plan. Learn. Achieve.
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="fw-extrabold mb-4"
              style={{
                fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
                lineHeight: "1.12",
                letterSpacing: "-1.5px",
                color: "#1e1b4b"
              }}
            >
              Your Journey <br />
              to a Better Future <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Starts Here
              </span>
            </h1>

            {/* Description */}
            <p
              className="lead mb-4 mx-auto mx-lg-0"
              style={{
                maxWidth: "520px",
                color: "#4b5563",
                fontSize: "1.08rem",
                lineHeight: "1.75",
                fontWeight: 400
              }}
            >
              VidyaMitra is your career guidance and learning platform.
              Discover the right career path, explore colleges, and achieve your goals.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 mb-5">
              <button
                onClick={() => navigate("/register")}
                className="btn text-white rounded-pill fw-bold smooth-hover d-flex align-items-center justify-content-center gap-2"
                style={{
                  padding: "0.9rem 2.2rem",
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)",
                  border: "none",
                  fontSize: "1.05rem"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #4f46e5, #4338ca)";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 25px rgba(79, 70, 229, 0.25)";
                }}
              >
                Get Started
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button
                onClick={() => navigate("/login")}
                className="btn rounded-pill fw-bold smooth-hover d-flex align-items-center justify-content-center"
                style={{
                  padding: "0.9rem 2.2rem",
                  backgroundColor: "#ffffff",
                  color: "#4f46e5",
                  border: "1px solid rgba(79, 70, 229, 0.25)",
                  boxShadow: "0 8px 20px rgba(79, 70, 229, 0.05)",
                  fontSize: "1.05rem"
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(79, 70, 229, 0.5)";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 12px 24px rgba(79, 70, 229, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(79, 70, 229, 0.25)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.05)";
                }}
              >
                Explore Features
              </button>
            </div>

            {/* Quick tag list */}
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4">
              {[
                { icon: "🎓", text: "Career Guidance" },
                { icon: "📊", text: "Skill Learning" },
                { icon: "🎯", text: "Progress Tracking" }
              ].map((tag) => (
                <div key={tag.text} className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "1.2rem" }}>{tag.icon}</span>
                  <span style={{ color: "#475569", fontWeight: 600, fontSize: "0.92rem" }}>{tag.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Graphical Column */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            {/* Image Wrapper Container with relative position */}
            <div
              className="position-relative"
              style={{
                width: "100%",
                maxWidth: "480px",
                aspectRatio: "1/1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* Soft purple glow circles in background */}
              <div
                style={{
                  position: "absolute",
                  width: "110%",
                  height: "110%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, rgba(255, 255, 255, 0) 70%)",
                  zIndex: 0,
                  pointerEvents: "none"
                }}
              />

              {/* Main Illustration (hero.png) */}
              <img
                src={heroImg}
                alt="Student Illustration"
                className="img-fluid"
                style={{
                  width: "75%",
                  height: "75%",
                  objectFit: "contain",
                  zIndex: 2,
                  position: "relative",
                  borderRadius: "30px",
                  filter: "drop-shadow(0 20px 40px rgba(15, 23, 42, 0.08))"
                }}
              />

              {/* FLOATING CARD 1: Learn Skills (top-left) */}
              <div
                className="animate-float-1 d-none d-sm-flex align-items-center gap-3 p-3 bg-white shadow rounded-4 position-absolute"
                style={{
                  top: "2%",
                  left: "-5%",
                  zIndex: 10,
                  border: "1px solid rgba(243, 239, 252, 0.8)",
                  minWidth: "180px",
                  backdropFilter: "blur(4px)"
                }}
              >
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: "38px", height: "38px", backgroundColor: "#f3e8ff" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <div>
                  <h6 className="m-0 fw-bold" style={{ fontSize: "0.85rem", color: "#1e1b4b" }}>Quiz Session</h6>
                  <div className="d-flex gap-1 mt-1">
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e2e8f0" }}></span>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e2e8f0" }}></span>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e2e8f0" }}></span>
                  </div>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-sm text-white mt-2 py-1 px-2 fw-semibold rounded"
                    style={{ fontSize: "0.7rem", backgroundColor: "#7c3aed", border: "none" }}
                  >
                    Start with Quiz
                  </button>
                </div>
              </div>

              {/* FLOATING CARD 2: Career Paths (top-right) */}
              <div
                className="animate-float-2 d-none d-sm-flex align-items-center gap-3 p-3 bg-white shadow rounded-4 position-absolute"
                style={{
                  top: "-5%",
                  right: "-2%",
                  zIndex: 10,
                  border: "1px solid rgba(243, 239, 252, 0.8)",
                  minWidth: "170px"
                }}
              >
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: "38px", height: "38px", backgroundColor: "#dbeafe" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div>
                  <h6 className="m-0 fw-bold" style={{ fontSize: "0.85rem", color: "#1e1b4b" }}>Career Paths</h6>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-sm text-white mt-2 py-1 px-2 fw-semibold rounded"
                    style={{ fontSize: "0.7rem", backgroundColor: "#3b82f6", border: "none" }}
                  >
                    Explore
                  </button>
                </div>
              </div>

              {/* FLOATING CARD 3: Track Progress (left-middle) */}
              <div
                className="animate-float-3 d-none d-sm-flex flex-column gap-2 p-3 bg-white shadow rounded-4 position-absolute"
                style={{
                  bottom: "20%",
                  left: "-10%",
                  zIndex: 10,
                  border: "1px solid rgba(243, 239, 252, 0.8)",
                  width: "160px"
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-bold" style={{ fontSize: "0.78rem", color: "#64748b" }}>Improve Your Journey</span>
                  <span style={{ fontSize: "1rem" }}>📈</span>
                </div>
                {/* Visual Representation of Chart */}
                <div className="d-flex align-items-end gap-1 mt-1" style={{ height: "35px" }}>
                  <div style={{ width: "20%", height: "30%", backgroundColor: "#e2e8f0", borderRadius: "2px" }}></div>
                  <div style={{ width: "20%", height: "50%", backgroundColor: "#e2e8f0", borderRadius: "2px" }}></div>
                  <div style={{ width: "20%", height: "45%", backgroundColor: "#e2e8f0", borderRadius: "2px" }}></div>
                  <div style={{ width: "20%", height: "70%", backgroundColor: "#818cf8", borderRadius: "2px" }}></div>
                  <div style={{ width: "20%", height: "90%", backgroundColor: "#6366f1", borderRadius: "2px" }}></div>
                </div>
              </div>

              { }
              <div
                className="animate-float-1 d-none d-sm-flex align-items-center gap-2 p-2 bg-white shadow-sm rounded-pill position-absolute"
                style={{
                  bottom: "5%",
                  left: "12%",
                  zIndex: 10,
                  border: "1px solid rgba(243, 239, 252, 0.8)",
                  paddingLeft: "12px",
                  paddingRight: "15px"
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>🏛️</span>
                <span className="fw-bold" style={{ fontSize: "0.8rem", color: "#3730a3" }}>Find Colleges</span>
              </div>

              {/* FLOATING CARD 5: Top Skills (right-middle) */}
              <div
                className="animate-float-2 d-none d-sm-flex flex-column gap-2 p-3 bg-white shadow rounded-4 position-absolute"
                style={{
                  bottom: "22%",
                  right: "-12%",
                  zIndex: 10,
                  border: "1px solid rgba(243, 239, 252, 0.8)",
                  width: "180px"
                }}
              >
                <span className="fw-bold" style={{ fontSize: "0.8rem", color: "#1e1b4b" }}>Roadmaps</span>

                {/* Skill item 1 */}
                <div>
                  <div className="d-flex justify-content-between" style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600 }}>
                    <span>Engineering</span>
                  </div>
                  <div className="progress mt-1" style={{ height: "4px" }}>
                    <div className="progress-bar" role="progressbar" style={{ width: "80%", backgroundColor: "#6366f1" }}></div>
                  </div>
                </div>

                {/* Skill item 2 */}
                <div>
                  <div className="d-flex justify-content-between" style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600 }}>
                    <span>Medicine</span>
                  </div>
                  <div className="progress mt-1" style={{ height: "4px" }}>
                    <div className="progress-bar" role="progressbar" style={{ width: "65%", backgroundColor: "#8b5cf6" }}></div>
                  </div>
                </div>

                {/* Skill item 3 */}
                <div>
                  <div className="d-flex justify-content-between" style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600 }}>
                    <span>Government</span>
                  </div>
                  <div className="progress mt-1" style={{ height: "4px" }}>
                    <div className="progress-bar" role="progressbar" style={{ width: "75%", backgroundColor: "#ec4899" }}></div>
                  </div>
                </div>
              </div>

              {/* Additional Floating Deco Icons */}
              {/* Graduation Cap (top-right overlay) */}
              <div
                className="animate-float-3 d-none d-sm-flex align-items-center justify-content-center shadow-lg position-absolute"
                style={{
                  top: "15%",
                  right: "-12%",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  fontSize: "1.4rem",
                  border: "1px solid rgba(243, 239, 252, 0.8)",
                  zIndex: 9
                }}
              >
                🎓
              </div>

              {/* Target (bottom-right overlay) */}
              <div
                className="animate-float-1 d-none d-sm-flex align-items-center justify-content-center shadow-lg position-absolute"
                style={{
                  bottom: "5%",
                  right: "5%",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  fontSize: "1.3rem",
                  border: "1px solid rgba(243, 239, 252, 0.8)",
                  zIndex: 9
                }}
              >
                🎯
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Metrics/Stats Bar */}
        <div className="py-4 mt-4 mt-lg-5">
          <div
            className="p-4 rounded-4"
            style={{
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "0 15px 35px rgba(79, 70, 229, 0.06)"
            }}
          >
            <div className="row g-4 text-center">
              {[
                { number: "1000+", label: "Students Guided", icon: "🎓" },
                { number: "500+", label: "Career Resources", icon: "📊" },
                { number: "50+", label: "Learning Paths", icon: "🎯" },
                { number: "98%", label: "Satisfaction Rate", icon: "😊" }
              ].map((stat, index, arr) => (
                <div
                  key={stat.label}
                  className={`col-6 col-md-3 d-flex flex-column align-items-center justify-content-center position-relative ${index < arr.length - 1 ? "border-right-divider" : ""}`}
                >
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span style={{ fontSize: "1.25rem" }}>{stat.icon}</span>
                    <span
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 900,
                        color: "#4f46e5",
                        letterSpacing: "-0.5px"
                      }}
                    >
                      {stat.number}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default PublicHome;