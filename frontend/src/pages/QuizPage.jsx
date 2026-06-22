import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";

function QuizPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  // Wizard state: 1: Welcome, 2: Education Level, 3: Questions, 4: Review, 5: Submitting/Success
  const [screen, setScreen] = useState(1);
  const [educationLevel, setEducationLevel] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores questionId -> answer text
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Authenticate user
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("vidya_user_logged_in");
    const userToken = localStorage.getItem("vidya_user_token");
    const user = localStorage.getItem("vidya_username");

    if (isLoggedIn !== "true" || !userToken) {
      navigate("/login");
    } else {
      setToken(userToken);
      setUsername(user || "Student");
      fetchHistory(userToken);
    }
  }, [navigate]);

  // Fetch assessment history
  const fetchHistory = async (authToken) => {
    try {
      const response = await fetch("http://localhost:5000/api/assessment/history", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  // Fetch questions for selected education level
  const fetchQuestions = async (level) => {
    setLoading(true);
    setError("");
    try {
      const encodedLevel = encodeURIComponent(level);
      const response = await fetch(`http://localhost:5000/api/questions/${encodedLevel}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assessment questions");
      }
      const data = await response.json();
      setQuestions(data);
      
      // Initialize answers from local storage if available, otherwise empty
      const savedAnswers = localStorage.getItem(`vidya_quiz_answers_${level}`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      } else {
        setAnswers({});
      }
      
      setScreen(3);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error("Error loading questions:", err);
      setError("Unable to load questions. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    setScreen(2);
  };

  const handleEducationSelect = (level) => {
    setEducationLevel(level);
  };

  const handleContinueToQuestions = () => {
    if (educationLevel) {
      fetchQuestions(educationLevel);
    }
  };

  const handleAnswerSelect = (optionText) => {
    const question = questions[currentQuestionIndex];
    const newAnswers = {
      ...answers,
      [question._id]: optionText,
    };
    setAnswers(newAnswers);
    // Auto-save answers in LocalStorage
    localStorage.setItem(`vidya_quiz_answers_${educationLevel}`, JSON.stringify(newAnswers));
  };

  const handleTextAnswerChange = (e) => {
    const question = questions[currentQuestionIndex];
    const newAnswers = {
      ...answers,
      [question._id]: e.target.value,
    };
    setAnswers(newAnswers);
    localStorage.setItem(`vidya_quiz_answers_${educationLevel}`, JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScreen(4); // Move to review screen
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setScreen(2); // Go back to level selection
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).filter((key) => answers[key]?.trim() !== "").length;
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    setLoadingMessage("Analyzing Your Responses...");
    setError("");

    // Professional artificial delay for premium experience
    await new Promise((resolve) => setTimeout(resolve, 2200));

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q._id,
        questionText: q.questionText,
        answerText: answers[q._id] || "No answer provided",
      }));

      const response = await fetch("http://localhost:5000/api/assessment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          educationLevel,
          answers: formattedAnswers,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit assessment");
      }

      // Clear cached answers
      localStorage.removeItem(`vidya_quiz_answers_${educationLevel}`);
      navigate("/career-guidance");
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message || "Something went wrong while submitting answers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render screens helper
  const renderContent = () => {
    switch (screen) {
      case 1:
        // Welcome Screen
        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Career Assessment 🧠</h2>
            <p style={styles.cardDesc}>
              Discover the career path that best matches your interests, skills, strengths, and goals. 
              
            </p>
            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <span style={styles.statIcon}>⏱️</span>
                <div>
                  <div style={styles.statLabel}>Estimated Duration</div>
                  <div style={styles.statVal}>5-7 Minutes</div>
                </div>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statIcon}>📋</span>
                <div>
                  <div style={styles.statLabel}>Number of Questions</div>
                  <div style={styles.statVal}>10 Questions</div>
                </div>
              </div>
            </div>

            <button style={styles.primaryBtn} onClick={handleStartQuiz}>
              Start Assessment
            </button>

            {history && history.length > 0 && (
              <div style={styles.historySection}>
                <h4 style={styles.historyTitle}>Your Assessment History 🕒</h4>
                <div style={styles.historyList}>
                  {history.map((item, idx) => (
                    <div key={item._id || idx} style={styles.historyCard}>
                      <div style={styles.historyHeader}>
                        <span style={styles.historyLevel}>{item.educationLevel}</span>
                        <span style={styles.historyDate}>
                          {new Date(item.completedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div style={styles.historyBody}>
                        Saved {item.answers?.length || 0} answers successfully in MERN stack database.
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        // Education Level Selection
        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Select Education Level 🎓</h2>
            <p style={styles.cardDesc}>
              We will load specialized assessment questions designed specifically for your academic stage.
            </p>

            <div style={styles.selectionGrid}>
              {[
                { id: "10th Pass", title: "10th Pass", icon: "🎒", desc: "For students completing school education." },
                { id: "Inter MPC", title: "Inter MPC", icon: "📐", desc: "For Mathematics, Physics & Chemistry students." },
                { id: "Inter BiPC", title: "Inter BiPC", icon: "🧬", desc: "For Biology, Physics & Chemistry students." },
                { id: "Degree Student", title: "Degree Student", icon: "🎓", desc: "For college/university undergraduates." }
              ].map((level) => {
                const isSelected = educationLevel === level.id;
                return (
                  <div
                    key={level.id}
                    onClick={() => handleEducationSelect(level.id)}
                    style={{
                      ...styles.selectionCard,
                      ...(isSelected ? styles.selectionCardActive : {}),
                    }}
                  >
                    <div style={styles.selectionIcon}>{level.icon}</div>
                    <h4 style={styles.selectionTitle}>{level.title}</h4>
                    <p style={styles.selectionDesc}>{level.desc}</p>
                  </div>
                );
              })}
            </div>

            {error && <div style={styles.errorText}>{error}</div>}

            <div style={styles.btnRow}>
              <button style={styles.secondaryBtn} onClick={() => setScreen(1)}>
                Back
              </button>
              <button
                style={{
                  ...styles.primaryBtn,
                  width: "auto",
                  opacity: educationLevel ? 1 : 0.6,
                  cursor: educationLevel ? "pointer" : "not-allowed",
                }}
                disabled={!educationLevel || loading}
                onClick={handleContinueToQuestions}
              >
                {loading ? "Loading Questions..." : "Continue"}
              </button>
            </div>
          </div>
        );

      case 3: {
        // Quiz Questions Screen
        if (questions.length === 0) return null;
        const currentQuestion = questions[currentQuestionIndex];
        const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
        const selectedAnswer = answers[currentQuestion._id] || "";

        return (
          <div style={styles.card}>
            {/* Header info */}
            <div style={styles.quizHeader}>
              <div style={styles.questionNum}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div style={styles.progressLabel}>
                Progress {progressPercent}%
              </div>
            </div>

            {/* Progress Bar */}
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
            </div>

            {/* Question Text */}
            <h3 style={styles.questionText}>
              {currentQuestion.questionText}
            </h3>

            {/* Answers */}
            <div style={styles.answerContainer}>
              {currentQuestion.questionType === "choice" ? (
                <div style={styles.optionsList}>
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleAnswerSelect(option)}
                        style={{
                          ...styles.optionItem,
                          ...(isSelected ? styles.optionItemActive : {}),
                        }}
                      >
                        <span style={{
                          ...styles.optionRadio,
                          ...(isSelected ? styles.optionRadioActive : {}),
                        }}>
                          {isSelected && <span style={styles.optionRadioDot} />}
                        </span>
                        <span style={styles.optionTextLabel}>{option}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={styles.textInputContainer}>
                  <textarea
                    rows={4}
                    placeholder="Type your response here..."
                    value={selectedAnswer}
                    onChange={handleTextAnswerChange}
                    style={styles.textarea}
                  />
                  <div style={styles.textareaTip}>
                    Feel free to write openly about your dreams, skills, and constraints.
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={styles.btnRow}>
              <button style={styles.secondaryBtn} onClick={handlePrevious}>
                Previous
              </button>
              <button
                style={{
                  ...styles.primaryBtn,
                  width: "auto",
                  background: currentQuestionIndex === questions.length - 1
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
                onClick={handleNext}
              >
                {currentQuestionIndex === questions.length - 1 ? "Review Answers" : "Next"}
              </button>
            </div>
          </div>
        );
      }
      case 4:{
        // Review Screen
        const totalQ = questions.length;
        const answeredQ = getAnsweredCount();
        const unansweredQ = totalQ - answeredQ;

        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Assessment Summary 📝</h2>
            <p style={styles.cardDesc}>
              Please review your details below before submitting your responses to the server.
            </p>

            <div style={styles.reviewSummary}>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Education Level</span>
                <span style={styles.reviewValue}>{educationLevel}</span>
              </div>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Total Questions</span>
                <span style={styles.reviewValue}>{totalQ}</span>
              </div>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Answered Questions</span>
                <span style={{ ...styles.reviewValue, color: "#10b981" }}>{answeredQ}</span>
              </div>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Unanswered Questions</span>
                <span style={{ ...styles.reviewValue, color: unansweredQ > 0 ? "#f59e0b" : "#6b7280" }}>
                  {unansweredQ}
                </span>
              </div>
            </div>

            {unansweredQ > 0 && (
              <div style={styles.warningBox}>
                ⚠️ You have left {unansweredQ} questions unanswered. You can click 'Edit Answers' to fill them in.
              </div>
            )}

            {error && <div style={styles.errorText}>{error}</div>}

            <div style={styles.btnRow}>
              <button
                style={styles.secondaryBtn}
                onClick={() => {
                  setScreen(3);
                  setCurrentQuestionIndex(0);
                }}
              >
                Edit Answers
              </button>
              <button
                style={{
                  ...styles.primaryBtn,
                  width: "auto",
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                }}
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
              >
                Submit Assessment
              </button>
            </div>
          </div>
        ); }

      case 5:
        // Success Screen
        return (
          <div style={{ ...styles.card, textAlign: "center" }}>
            <div style={styles.successIconContainer}>✔️</div>
            <h2 style={styles.cardTitle}>Assessment Submitted Successfully!</h2>
            <p style={styles.cardDesc}>
              Thank you, {username}! Your responses have been saved securely in the database.
            </p>
            
            <div style={styles.successDetails}>
              <p style={{ margin: 0, color: "#4b5563" }}>
                <strong>Academic Stage:</strong> {educationLevel}
              </p>
              <p style={{ margin: "10px 0 0", color: "#6b7280", fontSize: "0.9rem" }}>
                Our algorithms are ready to analyze your answers for roadmap recommendations.
              </p>
            </div>

            <button
              style={{ ...styles.primaryBtn, marginTop: "20px" }}
              onClick={() => navigate("/privatehome")}
            >
              Back to Home
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.pageContainer}>
      <PrivateNavbar />

      <main style={styles.mainContent}>
        {/* Loader Screen overlay */}
        {isSubmitting && (
          <div style={styles.loaderOverlay}>
            <div style={styles.spinner} />
            <h3 style={styles.loadingMessage}>{loadingMessage}</h3>
            <p style={styles.loadingSub}>Analyzing assessment responses & storing profile...</p>
          </div>
        )}

        <div style={styles.contentWrapper}>
          {renderContent()}
        </div>
      </main>

      {/* Embedded Dynamic Animations via styled CSS */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulseText {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.4; }
          }
        `}
      </style>
    </div>
  );
}

// Inline Styles matching VidyaMitra Design Language
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
  mainContent: {
    flex: 1,
    paddingTop: "3rem",
    paddingBottom: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "800px",
    padding: "0 20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.65)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.45)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 20px 45px rgba(0, 0, 0, 0.05)",
    animation: "float 6s ease-in-out infinite",
  },
  badge: {
    display: "inline-block",
    background: "rgba(99, 102, 241, 0.12)",
    color: "#6366f1",
    fontSize: "0.75rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    padding: "6px 14px",
    borderRadius: "50px",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "15px",
    letterSpacing: "-0.02em",
  },
  cardDesc: {
    fontSize: "1.05rem",
    color: "#4b5563",
    lineHeight: "1.75",
    marginBottom: "30px",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "35px",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "16px 20px",
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.12)",
  },
  statIcon: {
    fontSize: "2rem",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  statVal: {
    fontSize: "1.1rem",
    color: "#1e293b",
    fontWeight: "700",
  },
  primaryBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "999px",
    boxShadow: "0 6px 18px rgba(99, 102, 241, 0.25)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    background: "#fff",
    color: "#4b5563",
    border: "1px solid #d1d5db",
    padding: "14px 28px",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "999px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginTop: "35px",
  },
  selectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  selectionCard: {
    background: "rgba(255, 255, 255, 0.8)",
    border: "2px solid transparent",
    borderRadius: "20px",
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.02)",
  },
  selectionCardActive: {
    background: "#fff",
    borderColor: "#6366f1",
    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.15)",
    transform: "translateY(-4px)",
  },
  selectionIcon: {
    fontSize: "2.5rem",
    marginBottom: "12px",
  },
  selectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "8px",
  },
  selectionDesc: {
    fontSize: "0.9rem",
    color: "#6b7280",
    lineHeight: "1.5",
    margin: 0,
  },
  quizHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  questionNum: {
    fontSize: "0.9rem",
    color: "#4f46e5",
    fontWeight: "700",
    letterSpacing: "0.05em",
  },
  progressLabel: {
    fontSize: "0.9rem",
    color: "#6b7280",
    fontWeight: "600",
  },
  progressBarBg: {
    width: "100%",
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "35px",
  },
  progressBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  questionText: {
    fontSize: "1.45rem",
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: "1.5",
    marginBottom: "30px",
  },
  answerContainer: {
    minHeight: "220px",
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  optionItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "16px 20px",
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  optionItemActive: {
    background: "#fff",
    borderColor: "#6366f1",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.08)",
  },
  optionRadio: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #cbd5e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    flexShrink: 0,
  },
  optionRadioActive: {
    borderColor: "#6366f1",
  },
  optionRadioDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#6366f1",
  },
  optionTextLabel: {
    fontSize: "1.05rem",
    color: "#334155",
    fontWeight: "500",
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid #cbd5e1",
    background: "rgba(255, 255, 255, 0.8)",
    fontSize: "1.05rem",
    fontFamily: "inherit",
    outline: "none",
    resize: "vertical",
    transition: "all 0.2s ease",
  },
  textareaTip: {
    fontSize: "0.85rem",
    color: "#6b7280",
    fontStyle: "italic",
  },
  reviewSummary: {
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid rgba(148, 163, 184, 0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "25px",
  },
  reviewRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    paddingBottom: "12px",
  },
  reviewLabel: {
    fontSize: "1rem",
    color: "#4b5563",
    fontWeight: "500",
  },
  reviewValue: {
    fontSize: "1rem",
    color: "#0f172a",
    fontWeight: "700",
  },
  warningBox: {
    background: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    borderRadius: "14px",
    padding: "16px",
    color: "#b45309",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    marginBottom: "25px",
  },
  errorText: {
    color: "#dc2626",
    fontSize: "0.95rem",
    fontWeight: "600",
    marginTop: "15px",
    textAlign: "center",
  },
  successIconContainer: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "rgba(16, 185, 129, 0.12)",
    color: "#10b981",
    fontSize: "2.2rem",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 25px",
  },
  successDetails: {
    background: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid rgba(16, 185, 129, 0.15)",
    display: "inline-block",
    width: "100%",
    marginBottom: "25px",
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(248, 250, 252, 0.85)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "5px solid rgba(99, 102, 241, 0.15)",
    borderTopColor: "#6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "25px",
  },
  loadingMessage: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#4f46e5",
    margin: "0 0 10px",
    animation: "pulseText 1.5s ease-in-out infinite",
  },
  loadingSub: {
    fontSize: "0.95rem",
    color: "#6b7280",
    margin: 0,
  },
  historySection: {
    marginTop: "40px",
    borderTop: "1px solid rgba(0, 0, 0, 0.08)",
    paddingTop: "30px",
  },
  historyTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "20px",
  },
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxHeight: "300px",
    overflowY: "auto",
    paddingRight: "5px",
  },
  historyCard: {
    background: "rgba(255, 255, 255, 0.85)",
    border: "1px solid rgba(148, 163, 184, 0.12)",
    borderRadius: "16px",
    padding: "16px 20px",
  },
  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  historyLevel: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#4f46e5",
  },
  historyDate: {
    fontSize: "0.8rem",
    color: "#94a3b8",
  },
  historyBody: {
    fontSize: "0.9rem",
    color: "#4b5563",
    lineHeight: "1.4",
  }
};

export default QuizPage;
