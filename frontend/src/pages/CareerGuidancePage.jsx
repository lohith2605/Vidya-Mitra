import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import { careerGuidanceData } from "../data/careerGuidanceData";

function CareerGuidancePage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [assessment, setAssessment] = useState(null);
  const [activeRecIndex, setActiveRecIndex] = useState(0); // 0 = Top Match, 1 = 2nd Match, 2 = 3rd Match
  const [checkedSteps, setCheckedSteps] = useState({});

  // Authenticate user & Fetch assessment details
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("vidya_user_logged_in");
    const userToken = localStorage.getItem("vidya_user_token");
    const user = localStorage.getItem("vidya_username");

    if (isLoggedIn !== "true" || !userToken) {
      navigate("/login");
    } else {
      setToken(userToken);
      setUsername(user || "Student");
      fetchLatestAssessment(userToken);
    }
  }, [navigate]);

  const fetchLatestAssessment = async (authToken) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/assessment/history", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assessment results");
      }

      const history = await response.json();
      if (history && history.length > 0) {
        // Take the latest assessment
        setAssessment(history[0]);
      }
    } catch (err) {
      console.error("Error loading assessment:", err);
      setError("Failed to fetch assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStepToggle = (stepIndex) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepIndex]: !prev[stepIndex],
    }));
  };

  const handleExploreRoadmap = (careerId) => {
    // Save target roadmap ID in localStorage so RoadmapsPage can open it on mount
    localStorage.setItem("vidya_selected_roadmap_id", careerId);
    navigate("/roadmaps");
  };

  const handleRetakeQuiz = () => {
    navigate("/quiz");
  };

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <PrivateNavbar />
        <div style={styles.loaderContainer}>
          <div style={styles.spinner} />
          <h3 style={styles.loaderText}>Loading Your Recommendations...</h3>
        </div>
      </div>
    );
  }

  // Fallback if no assessment taken yet
  if (!assessment || !assessment.recommendations || assessment.recommendations.length === 0) {
    return (
      <div style={styles.pageContainer}>
        <PrivateNavbar />
        <main style={styles.mainContent}>
          <div style={{ ...styles.card, textAlign: "center", maxWidth: "600px" }}>
            <span style={{ fontSize: "3.5rem", marginBottom: "15px", display: "block" }}>🎯</span>
            <h2 style={styles.cardTitle}>No Assessment Found</h2>
            <p style={styles.cardDesc}>
              You have not completed the Career Assessment Quiz yet. Complete the 5-7 minute quiz 
              and get personalized recommendations instantly.
            </p>
            <button style={styles.primaryBtn} onClick={() => navigate("/quiz")}>
              Take Career Quiz Now
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Extract recommendations
  const recs = assessment.recommendations;
  const currentRec = recs[activeRecIndex] || recs[0];
  const careerDetails = careerGuidanceData[currentRec.careerId];

  return (
    <div style={styles.pageContainer}>
      <PrivateNavbar />

      <main style={styles.mainContent}>
        <div style={styles.layoutGrid}>
          
          {/* LEFT SIDEBAR: ALTERNATIVES LIST */}
          <div style={styles.sidebar}>
            <h4 style={styles.sidebarTitle}>Career Match Results 🎯</h4>
            <p style={styles.sidebarSubtitle}>Based on your answers, here are your best matches:</p>
            
            <div style={styles.sidebarList}>
              {recs.map((rec, idx) => {
                const isSelected = activeRecIndex === idx;
                const details = careerGuidanceData[rec.careerId];
                if (!details) return null;

                return (
                  <div
                    key={rec.careerId}
                    onClick={() => setActiveRecIndex(idx)}
                    style={{
                      ...styles.sidebarCard,
                      ...(isSelected ? styles.sidebarCardActive : {}),
                    }}
                  >
                    <div style={styles.sidebarCardHeader}>
                      <span style={styles.sidebarIcon}>{details.icon}</span>
                      <div style={styles.sidebarCardMeta}>
                        <div style={styles.sidebarCardTitle}>{details.title}</div>
                        <div style={{
                          ...styles.sidebarBadge,
                          ...(idx === 0 ? styles.badgePrimary : styles.badgeSecondary),
                        }}>
                          {idx === 0 ? "Top Recommendation" : `${idx + 1}nd Best Match`}
                        </div>
                      </div>
                    </div>
                    
                    <div style={styles.scoreRow}>
                      <div style={styles.scoreLabel}>Match Score:</div>
                      <div style={styles.scoreVal}>{rec.matchScore}%</div>
                    </div>
                    
                    <div style={styles.miniProgressBg}>
                      <div style={{
                        ...styles.miniProgressFill,
                        width: `${rec.matchScore}%`,
                        background: idx === 0
                          ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                          : "linear-gradient(90deg, #10b981, #059669)",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.sidebarAdvisory}>
              <div style={styles.advisoryTitle}>💡 Guidance Note</div>
              <div style={styles.advisoryText}>
                Take your time to read the details of each match. You can compare salaries, benefits, and next steps to make an informed choice.
              </div>
            </div>
          </div>

          {/* RIGHT PANELS: DETAILED CAREER VIEW */}
          <div style={styles.detailContainer}>
            
            {/* HERO MATCH SUMMARY */}
            <div style={styles.heroCard}>
              <div style={styles.heroHeader}>
                <div style={styles.heroTitleGroup}>
                  <span style={styles.heroIcon}>{careerDetails?.icon}</span>
                  <div>
                    <span style={styles.educationBadge}>{assessment.educationLevel}</span>
                    <h2 style={styles.heroTitle}>{careerDetails?.title}</h2>
                  </div>
                </div>
                <div style={styles.scoreBigContainer}>
                  <div style={styles.scoreBigVal}>{currentRec.matchScore}%</div>
                  <div style={styles.scoreBigLabel}>Match Score</div>
                </div>
              </div>

              {/* Match Score Progress Bar */}
              <div style={styles.bigProgressBg}>
                <div style={{ ...styles.bigProgressFill, width: `${currentRec.matchScore}%` }} />
              </div>

              {/* WHY THIS CAREER MATCHES YOU */}
              <div style={styles.whyMatchesContainer}>
                <h4 style={styles.sectionHeading}>Why This Career Matches You:</h4>
                <ul style={styles.reasonsList}>
                  {currentRec.reasons.map((reason, idx) => (
                    <li key={idx} style={styles.reasonItem}>
                      <span style={styles.checkBullet}>✓</span>
                      <span style={styles.reasonText}>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DETAILED CAREER INFO CARD */}
            {careerDetails ? (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Career Overview 📋</h3>
                <p style={styles.overviewText}>{careerDetails.overview}</p>

                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoItemLabel}>💼 Popular Job Roles</div>
                    <div style={styles.infoItemVal}>
                      {careerDetails.jobRoles.join(", ")}
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <div style={styles.infoItemLabel}>💰 Average Salary Range</div>
                    <div style={styles.infoItemVal}>{careerDetails.salaryRange}</div>
                  </div>

                  <div style={styles.infoItem}>
                    <div style={styles.infoItemLabel}>🎓 Education Pathway</div>
                    <div style={styles.infoItemVal}>{careerDetails.educationPath}</div>
                  </div>

                  <div style={styles.infoItem}>
                    <div style={styles.infoItemLabel}>📈 Future Scope</div>
                    <div style={styles.infoItemVal}>{careerDetails.futureScope}</div>
                  </div>
                </div>

                <div style={styles.verticalListContainer}>
                  <div style={styles.listBlock}>
                    <h4 style={{ ...styles.sectionHeading, color: "#4f46e5" }}>🛠️ Required Skills</h4>
                    <div style={styles.skillsTagList}>
                      {careerDetails.skills.map((skill, i) => (
                        <span key={i} style={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={styles.listBlock}>
                    <h4 style={{ ...styles.sectionHeading, color: "#7c3aed" }}>🚀 Career Growth Opportunities</h4>
                    <p style={styles.growthText}>{careerDetails.growthOpportunities}</p>
                  </div>
                </div>

                {/* ADVANTAGES & CHALLENGES */}
                <div style={styles.prosConsGrid}>
                  <div style={{ ...styles.prosConsBlock, background: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.15)" }}>
                    <h4 style={{ ...styles.sectionHeading, color: "#059669" }}>⭐ Key Advantages</h4>
                    <ul style={styles.bulletsList}>
                      {careerDetails.advantages.map((item, i) => (
                        <li key={i} style={styles.bulletItem}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ ...styles.prosConsBlock, background: "rgba(239, 68, 68, 0.05)", borderColor: "rgba(239, 68, 68, 0.15)" }}>
                    <h4 style={{ ...styles.sectionHeading, color: "#dc2626" }}>⚠️ Primary Challenges</h4>
                    <ul style={styles.bulletsList}>
                      {careerDetails.challenges.map((item, i) => (
                        <li key={i} style={styles.bulletItem}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: "25px" }}>
                  <h4 style={styles.sectionHeading}>👤 Who Should Choose This Career:</h4>
                  <p style={{ ...styles.overviewText, fontStyle: "italic" }}>"{careerDetails.whoShouldChoose}"</p>
                </div>
              </div>
            ) : (
              <div style={styles.card}>
                <p>Profile details not fully configured for: {currentRec.careerId}</p>
              </div>
            )}

            {/* NEXT STEP ACTION CHECKLIST */}
            {careerDetails?.nextSteps && (
              <div style={{ ...styles.card, borderTop: "4px solid #6366f1" }}>
                <h3 style={styles.cardTitle}>Next Step Guidance 🗺️</h3>
                <p style={styles.cardDesc}>
                  If you choose this career path, here are the actions you should begin working on immediately:
                </p>

                <div style={styles.checklist}>
                  {careerDetails.nextSteps.map((step, idx) => {
                    const isChecked = !!checkedSteps[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => handleStepToggle(idx)}
                        style={{
                          ...styles.checkItem,
                          ...(isChecked ? styles.checkItemActive : {}),
                        }}
                      >
                        <div style={{
                          ...styles.checkBox,
                          ...(isChecked ? styles.checkBoxActive : {}),
                        }}>
                          {isChecked && <span style={styles.checkMark}>✓</span>}
                        </div>
                        <span style={{
                          ...styles.checkText,
                          ...(isChecked ? styles.checkTextActive : {}),
                        }}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS GROUP */}
            <div style={styles.actionsRow}>
              <button
                style={{ ...styles.actionBtn, ...styles.btnPrimary }}
                onClick={() => handleExploreRoadmap(currentRec.careerId)}
              >
                Explore Detailed Roadmap ➔
              </button>
              
              <button
                style={{ ...styles.actionBtn, ...styles.btnSecondary }}
                onClick={() => {
                  // Toggles to next recommendation
                  setActiveRecIndex((prev) => (prev + 1) % recs.length);
                }}
              >
                View Other Career Matches
              </button>

              <button
                style={{ ...styles.actionBtn, ...styles.btnOutline }}
                onClick={handleRetakeQuiz}
              >
                Retake Assessment
              </button>

              <button
                style={{ ...styles.actionBtn, ...styles.btnText }}
                onClick={() => navigate("/privatehome")}
              >
                Dashboard
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* Styled inline keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff, #ede9fe)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Inter, sans-serif",
    overflowY: "auto",
    overflowX: "hidden",
  },
  loaderContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(99, 102, 241, 0.15)",
    borderTopColor: "#6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loaderText: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#6b7280",
  },
  mainContent: {
    flex: 1,
    padding: "2.5rem 2rem",
    maxWidth: "1250px",
    width: "100%",
    margin: "0 auto",
  },
  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "2.5rem",
    alignItems: "start",
  },
  // Sidebar styling
  sidebar: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.03)",
  },
  sidebarTitle: {
    fontSize: "1.25rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 8px",
  },
  sidebarSubtitle: {
    fontSize: "0.85rem",
    color: "#6b7280",
    lineHeight: "1.4",
    margin: "0 0 20px",
  },
  sidebarList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  sidebarCard: {
    background: "rgba(255, 255, 255, 0.8)",
    border: "1.5px solid transparent",
    borderRadius: "16px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  sidebarCardActive: {
    background: "#fff",
    borderColor: "#6366f1",
    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.08)",
    transform: "translateY(-2px)",
  },
  sidebarCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  sidebarIcon: {
    fontSize: "1.8rem",
  },
  sidebarCardMeta: {
    flex: 1,
  },
  sidebarCardTitle: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#1e293b",
    lineHeight: "1.3",
  },
  sidebarBadge: {
    fontSize: "0.68rem",
    fontWeight: "700",
    display: "inline-block",
    marginTop: "4px",
    padding: "2px 6px",
    borderRadius: "6px",
  },
  badgePrimary: {
    background: "rgba(99, 102, 241, 0.12)",
    color: "#6366f1",
  },
  badgeSecondary: {
    background: "rgba(16, 185, 129, 0.12)",
    color: "#059669",
  },
  scoreRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    marginBottom: "6px",
  },
  scoreLabel: {
    color: "#6b7280",
    fontWeight: "500",
  },
  scoreVal: {
    color: "#1f2937",
    fontWeight: "700",
  },
  miniProgressBg: {
    width: "100%",
    height: "5px",
    background: "#e2e8f0",
    borderRadius: "6px",
    overflow: "hidden",
  },
  miniProgressFill: {
    height: "100%",
    borderRadius: "6px",
    transition: "width 0.4s ease",
  },
  sidebarAdvisory: {
    marginTop: "25px",
    padding: "16px",
    background: "rgba(99, 102, 241, 0.05)",
    border: "1px solid rgba(99, 102, 241, 0.1)",
    borderRadius: "14px",
  },
  advisoryTitle: {
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#4f46e5",
    marginBottom: "6px",
  },
  advisoryText: {
    fontSize: "0.78rem",
    color: "#4b5563",
    lineHeight: "1.5",
  },
  
  // Right detail container
  detailContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  heroCard: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    borderRadius: "24px",
    padding: "35px",
    color: "#fff",
    boxShadow: "0 15px 35px rgba(99, 102, 241, 0.22)",
  },
  heroHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },
  heroTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  heroIcon: {
    fontSize: "3.2rem",
    background: "rgba(255, 255, 255, 0.15)",
    width: "75px",
    height: "75px",
    borderRadius: "20px",
    display: "grid",
    placeItems: "center",
  },
  educationBadge: {
    fontSize: "0.75rem",
    fontWeight: "700",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "50px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  heroTitle: {
    fontSize: "2.2rem",
    fontWeight: "900",
    margin: "6px 0 0",
    letterSpacing: "-0.02em",
  },
  scoreBigContainer: {
    textAlign: "right",
    background: "rgba(255, 255, 255, 0.12)",
    padding: "12px 20px",
    borderRadius: "18px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  scoreBigVal: {
    fontSize: "2rem",
    fontWeight: "800",
  },
  scoreBigLabel: {
    fontSize: "0.72rem",
    opacity: 0.85,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  bigProgressBg: {
    width: "100%",
    height: "8px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "30px",
  },
  bigProgressFill: {
    height: "100%",
    background: "#fff",
    borderRadius: "10px",
    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  whyMatchesContainer: {
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "18px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  reasonsList: {
    listStyle: "none",
    padding: 0,
    margin: "15px 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  reasonItem: {
    display: "flex",
    alignItems: "start",
    gap: "10px",
  },
  checkBullet: {
    color: "#34d399",
    fontWeight: "800",
    fontSize: "1.1rem",
    lineHeight: "1",
  },
  reasonText: {
    fontSize: "0.98rem",
    opacity: 0.95,
  },

  // Standard details card
  card: {
    background: "rgba(255, 255, 255, 0.65)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.45)",
    borderRadius: "24px",
    padding: "35px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.03)",
    animation: "fadeIn 0.5s ease",
  },
  cardTitle: {
    fontSize: "1.45rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 15px",
  },
  cardDesc: {
    fontSize: "0.98rem",
    color: "#6b7280",
    marginBottom: "20px",
  },
  overviewText: {
    fontSize: "1.05rem",
    color: "#334155",
    lineHeight: "1.7",
    margin: "0 0 25px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },
  infoItem: {
    background: "#fff",
    border: "1px solid rgba(148, 163, 184, 0.12)",
    borderRadius: "16px",
    padding: "16px 20px",
  },
  infoItemLabel: {
    fontSize: "0.8rem",
    color: "#6366f1",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "6px",
  },
  infoItemVal: {
    fontSize: "1.02rem",
    color: "#1e293b",
    fontWeight: "700",
    lineHeight: "1.4",
  },
  verticalListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    borderTop: "1px solid rgba(0,0,0,0.06)",
    paddingTop: "25px",
    marginBottom: "25px",
  },
  sectionHeading: {
    fontSize: "1.1rem",
    fontWeight: "800",
    margin: "0 0 12px",
  },
  skillsTagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  skillTag: {
    background: "rgba(99, 102, 241, 0.08)",
    color: "#4f46e5",
    fontSize: "0.88rem",
    fontWeight: "700",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(99, 102, 241, 0.1)",
  },
  growthText: {
    fontSize: "1rem",
    color: "#334155",
    lineHeight: "1.6",
    margin: 0,
    fontWeight: "500",
  },
  prosConsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "10px",
  },
  prosConsBlock: {
    borderRadius: "18px",
    padding: "20px",
    border: "1px solid",
  },
  bulletsList: {
    paddingLeft: "15px",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  bulletItem: {
    listStyleType: "none",
    fontSize: "0.95rem",
    color: "#334155",
    lineHeight: "1.5",
  },

  // Action checklist
  checklist: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "14px 20px",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.14)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  checkItemActive: {
    borderColor: "#6366f1",
    background: "#fff",
  },
  checkBox: {
    width: "20px",
    height: "20px",
    borderRadius: "6px",
    border: "2px solid #cbd5e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease",
    flexShrink: 0,
  },
  checkBoxActive: {
    background: "#6366f1",
    borderColor: "#6366f1",
  },
  checkMark: {
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  checkText: {
    fontSize: "0.98rem",
    color: "#334155",
    fontWeight: "500",
  },
  checkTextActive: {
    color: "#6366f1",
    fontWeight: "600",
  },

  // Action row
  actionsRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "15px",
    marginTop: "10px",
    marginBottom: "40px",
  },
  actionBtn: {
    border: "none",
    padding: "14px 24px",
    fontSize: "0.98rem",
    fontWeight: "700",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    boxShadow: "0 6px 15px rgba(99, 102, 241, 0.22)",
  },
  btnSecondary: {
    background: "#fff",
    color: "#4f46e5",
    border: "1px solid rgba(99, 102, 241, 0.25)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
  },
  btnOutline: {
    background: "none",
    color: "#6b7280",
    border: "1px solid #d1d5db",
  },
  btnText: {
    background: "none",
    color: "#6366f1",
  }
};

export default CareerGuidancePage;
