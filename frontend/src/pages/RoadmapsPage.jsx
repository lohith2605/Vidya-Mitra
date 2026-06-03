import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { roadmapsData } from "../data/roadmapsData";

const RoadmapsPage = () => {
  // Navigation & View States
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [educationFilter, setEducationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  
  // Progress State (per roadmap)
  const [progressData, setProgressData] = useState({});

  // AI Recommendation Wizard States
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [aiAnswers, setAiAnswers] = useState({
    interest: "",
    subject: "",
    strength: "",
    goal: ""
  });
  const [aiRecommendation, setAiRecommendation] = useState(null);

  // Dark/Light Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load Bookmarks and Progress from LocalStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("vidya_bookmarks");
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    const savedProgress = localStorage.getItem("vidya_progress");
    if (savedProgress) setProgressData(JSON.parse(savedProgress));

    const savedTheme = localStorage.getItem("vidya_theme_dark");
    if (savedTheme === "true") setIsDarkMode(true);

    // Pre-select roadmap if requested by the Career Guidance module
    const targetRoadmapId = localStorage.getItem("vidya_selected_roadmap_id");
    if (targetRoadmapId) {
      const match = roadmapsData.find(r => r.id === targetRoadmapId);
      if (match) {
        setSelectedRoadmap(match);
      }
      localStorage.removeItem("vidya_selected_roadmap_id");
    }
  }, []);

  // Save Bookmarks
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(b => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    localStorage.setItem("vidya_bookmarks", JSON.stringify(updated));
  };

  // Toggle Step Completion & Calculate Progress
  const toggleStep = (roadmapId, stepId) => {
    const key = `${roadmapId}_${stepId}`;
    const updated = { ...progressData, [key]: !progressData[key] };
    setProgressData(updated);
    localStorage.setItem("vidya_progress", JSON.stringify(updated));
  };

  const getProgressPercentage = (roadmapId, totalSteps) => {
    let completed = 0;
    for (let i = 1; i <= totalSteps; i++) {
      if (progressData[`${roadmapId}_${i}`]) completed++;
    }
    return Math.round((completed / totalSteps) * 100) || 0;
  };

  // Filter & Search Logic
  const filteredRoadmaps = roadmapsData.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEducation = educationFilter === "All" || roadmap.education === educationFilter;
    const matchesCategory = categoryFilter === "All" || roadmap.category === categoryFilter;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(roadmap.id);

    return matchesSearch && matchesEducation && matchesCategory && matchesBookmark;
  });

  // AI Career Recommendation Algorithm
  const handleAIQuizSubmit = (e) => {
    e.preventDefault();
    
    // Quick heuristic analysis to recommend matching paths
    let recommended = [];
    
    if (aiAnswers.interest === "Coding" || aiAnswers.strength === "Problem Solving") {
      recommended.push(roadmapsData.find(r => r.id === "fullstack"));
      recommended.push(roadmapsData.find(r => r.id === "ai-ml"));
      recommended.push(roadmapsData.find(r => r.id === "cybersecurity"));
    } else if (aiAnswers.interest === "Healthcare" || aiAnswers.subject === "Biology") {
      recommended.push(roadmapsData.find(r => r.id === "medicine"));
    } else if (aiAnswers.interest === "Creative Arts" || aiAnswers.strength === "Creativity") {
      recommended.push(roadmapsData.find(r => r.id === "uiux"));
      recommended.push(roadmapsData.find(r => r.id === "animation"));
      recommended.push(roadmapsData.find(r => r.id === "digital-marketing"));
    } else if (aiAnswers.interest === "Public Service" || aiAnswers.subject === "Civics") {
      recommended.push(roadmapsData.find(r => r.id === "govt-jobs"));
      recommended.push(roadmapsData.find(r => r.id === "defense"));
      recommended.push(roadmapsData.find(r => r.id === "law"));
    } else if (aiAnswers.interest === "Business" || aiAnswers.goal === "Start a business") {
      recommended.push(roadmapsData.find(r => r.id === "entrepreneurship"));
      recommended.push(roadmapsData.find(r => r.id === "ca-cs"));
    } else {
      // Fallback
      recommended.push(roadmapsData.find(r => r.id === "engineering"));
      recommended.push(roadmapsData.find(r => r.id === "diploma"));
    }

    setAiRecommendation(recommended.filter(Boolean));
  };

  // Mock Share
  const handleShare = (title) => {
    navigator.clipboard.writeText(window.location.href);
    alert(`🔗 Shareable URL copied to clipboard for: ${title}`);
  };

  // Mock PDF Print
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: isDarkMode ? "linear-gradient(135deg, #0f172a, #1e1b4b, #1e293b)" : "linear-gradient(135deg, #eef2ff, #f8fafc, #ede9fe)",
      color: isDarkMode ? "#f8fafc" : "#1f2937",
      fontFamily: "'Poppins', sans-serif",
      transition: "all 0.3s ease",
      paddingBottom: "4rem"
    }}>
      {/* HEADER NAVBAR */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: isDarkMode ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(99,102,241,0.12)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🎓</span>
            <span style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>VidyaMitra</span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button 
            onClick={() => {
              const newMode = !isDarkMode;
              setIsDarkMode(newMode);
              localStorage.setItem("vidya_theme_dark", newMode ? "true" : "false");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.3rem",
              padding: "0.5rem"
            }}
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          
          <button
            onClick={() => setShowAIWizard(true)}
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              border: "none",
              color: "white",
              padding: "0.6rem 1.2rem",
              borderRadius: "50px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(16,185,129,0.2)"
            }}
          >
            🤖 AI Career Help
          </button>

          <Link to="/" style={{
            textDecoration: "none",
            color: isDarkMode ? "#cbd5e1" : "#4b5563",
            fontWeight: 600
          }}>
            Back to Home
          </Link>
        </div>
      </header>

      {/* AI RECOMMENDATION MODAL/WIZARD */}
      {showAIWizard && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem"
        }}>
          <div style={{
            background: isDarkMode ? "#1e293b" : "white",
            padding: "2.5rem",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "600px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
            position: "relative",
            maxHeight: "85vh",
            overflowY: "auto"
          }}>
            <button 
              onClick={() => {
                setShowAIWizard(false);
                setAiRecommendation(null);
                setAiAnswers({ interest: "", subject: "", strength: "", goal: "" });
              }}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1.2rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: isDarkMode ? "#cbd5e1" : "#6b7280"
              }}
            >
              ×
            </button>

            {!aiRecommendation ? (
              <form onSubmit={handleAIQuizSubmit}>
                <h2 style={{ marginBottom: "0.5rem", fontWeight: 800 }}>🤖 AI Career Advisor Wizard</h2>
                <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                  Answer these quick questions and let our career intelligence engine map out the most suitable roadmaps for your future.
                </p>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>1. What are you most interested in?</label>
                  <select 
                    required
                    value={aiAnswers.interest}
                    onChange={(e) => setAiAnswers({...aiAnswers, interest: e.target.value})}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "10px", 
                      background: isDarkMode ? "#0f172a" : "#f3f4f6",
                      color: isDarkMode ? "white" : "black", border: "none"
                    }}
                  >
                    <option value="">Select Interest...</option>
                    <option value="Coding">Software, Games, Websites & Systems</option>
                    <option value="Healthcare">Treating Patients, Biology & Medicine</option>
                    <option value="Creative Arts">Graphic Design, Visual Art, VFX & Copywriting</option>
                    <option value="Business">Trading, Finance, Auditing & Management</option>
                    <option value="Public Service">Helping Citizens, Defense & Government Rules</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>2. What was your favorite high-school subject?</label>
                  <select 
                    required
                    value={aiAnswers.subject}
                    onChange={(e) => setAiAnswers({...aiAnswers, subject: e.target.value})}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "10px", 
                      background: isDarkMode ? "#0f172a" : "#f3f4f6",
                      color: isDarkMode ? "white" : "black", border: "none"
                    }}
                  >
                    <option value="">Select Subject...</option>
                    <option value="Mathematics">Mathematics & Algebra</option>
                    <option value="Biology">Biology & Human Anatomy</option>
                    <option value="Civics">History & Civics</option>
                    <option value="Business Studies">Accountancy & Business Studies</option>
                    <option value="Creative Art">Visual Arts & Drawing</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>3. What is your strongest skill?</label>
                  <select 
                    required
                    value={aiAnswers.strength}
                    onChange={(e) => setAiAnswers({...aiAnswers, strength: e.target.value})}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "10px", 
                      background: isDarkMode ? "#0f172a" : "#f3f4f6",
                      color: isDarkMode ? "white" : "black", border: "none"
                    }}
                  >
                    <option value="">Select Strength...</option>
                    <option value="Problem Solving">Analytical Thinking & Coding Logic</option>
                    <option value="Empathy">Empathy, Listening & Support</option>
                    <option value="Creativity">Visual Design, Painting & Creative Writing</option>
                    <option value="Leadership">Managing Teams & Setting Milestones</option>
                    <option value="Logical Deduction">Analyzing Laws & Structuring Contracts</option>
                  </select>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>4. What is your ultimate career goal?</label>
                  <select 
                    required
                    value={aiAnswers.goal}
                    onChange={(e) => setAiAnswers({...aiAnswers, goal: e.target.value})}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "10px", 
                      background: isDarkMode ? "#0f172a" : "#f3f4f6",
                      color: isDarkMode ? "white" : "black", border: "none"
                    }}
                  >
                    <option value="">Select Goal...</option>
                    <option value="High paying tech job">Gain high-paying global technology contracts</option>
                    <option value="Save lives">Provide human clinical support and save lives</option>
                    <option value="Secure govt career">Secure lifetime public service authority and job security</option>
                    <option value="Start a business">Launch my own startup and scale business platforms</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none",
                    color: "white",
                    padding: "0.85rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(99,102,241,0.3)"
                  }}
                >
                  Match My Career Path
                </button>
              </form>
            ) : (
              <div>
                <h2 style={{ marginBottom: "1rem", fontWeight: 800 }}>🎯 Your AI Match Results</h2>
                <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                  Based on your interest in **{aiAnswers.interest}** and preference for **{aiAnswers.subject}**, the AI recommend these career paths:
                </p>

                <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                  {aiRecommendation.map((rec) => (
                    <div 
                      key={rec.id}
                      onClick={() => {
                        setSelectedRoadmap(rec);
                        setShowAIWizard(false);
                        setAiRecommendation(null);
                        setAiAnswers({ interest: "", subject: "", strength: "", goal: "" });
                      }}
                      style={{
                        padding: "1.2rem",
                        borderRadius: "16px",
                        background: isDarkMode ? "#0f172a" : "#f3f4f6",
                        border: "1px solid rgba(99,102,241,0.2)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <span style={{ fontSize: "2rem" }}>{rec.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontWeight: 700, color: "#4f46e5" }}>{rec.title}</h4>
                        <p style={{ margin: 0, fontSize: "0.82rem", color: isDarkMode ? "#94a3b8" : "#4b5563" }}>
                          {rec.description}
                        </p>
                      </div>
                      <span style={{ fontSize: "1.2rem", color: "#6366f1" }}>➔</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setAiRecommendation(null);
                    setAiAnswers({ interest: "", subject: "", strength: "", goal: "" });
                  }}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "2px solid rgba(99,102,241,0.3)",
                    color: "#6366f1",
                    padding: "0.75rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Restart AI Matcher
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        
        {/* VIEW 1: ROADMAP LISTING & HERO */}
        {!selectedRoadmap ? (
          <div>
            {/* HERO SECTION */}
            <div style={{
              textAlign: "center",
              padding: "3rem 1rem",
              borderRadius: "30px",
              background: isDarkMode ? "rgba(30, 27, 75, 0.4)" : "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(15px)",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(99,102,241,0.1)",
              marginBottom: "3rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.03)"
            }}>
              <span className="premium-compass-badge">
                VidyaMitra Compass
              </span>
              
              <h1 className="premium-hero-heading">
                Choose Your Career Path
              </h1>
              
              <p style={{
                maxWidth: "720px",
                margin: "0 auto 2.5rem",
                color: isDarkMode ? "#cbd5e1" : "#4b5563",
                fontSize: "1.15rem",
                lineHeight: 1.8,
                letterSpacing: "0.1px",
                fontWeight: 400
              }}>
                Take control of your future with step-by-step interactive timelines, curated resources, entrance exam logs, and salary insights. Perfect for students after 10th and Intermediate classes.
              </p>

              {/* SEARCH & FILTERS CONTROLS */}
              <div style={{
                maxWidth: "800px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}>
                {/* Search Bar */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  background: isDarkMode ? "#0f172a" : "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "50px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(99,102,241,0.15)"
                }}>
                  <span style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search career fields (e.g. Full Stack, CA, Medicine, UI/UX...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "1rem",
                      color: isDarkMode ? "white" : "black"
                    }}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#6b7280" }}
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Filter Dropdowns Grid */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.75rem",
                  marginTop: "0.5rem"
                }}>
                  {/* Education level */}
                  <select
                    value={educationFilter}
                    onChange={(e) => setEducationFilter(e.target.value)}
                    style={{
                      padding: "0.6rem 1rem", borderRadius: "20px", border: "none",
                      background: isDarkMode ? "#1e293b" : "white",
                      color: isDarkMode ? "white" : "#4b5563",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.02)", fontWeight: 600, cursor: "pointer"
                    }}
                  >
                    <option value="All">🎓 All Education</option>
                    <option value="After 10th">After 10th</option>
                    <option value="After Intermediate">After Intermediate</option>
                  </select>

                  {/* Category */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      padding: "0.6rem 1rem", borderRadius: "20px", border: "none",
                      background: isDarkMode ? "#1e293b" : "white",
                      color: isDarkMode ? "white" : "#4b5563",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.02)", fontWeight: 600, cursor: "pointer"
                    }}
                  >
                    <option value="All">📁 All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Medical">Medical</option>
                    <option value="Government Jobs">Government Jobs</option>
                    <option value="Creative Fields">Creative Fields</option>
                    <option value="Defense">Defense</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                  </select>

                  {/* Bookmark Toggle */}
                  <button
                    onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                    style={{
                      padding: "0.6rem 1.2rem",
                      borderRadius: "20px",
                      border: "none",
                      background: showBookmarksOnly ? "#ec4899" : (isDarkMode ? "#1e293b" : "white"),
                      color: showBookmarksOnly ? "white" : (isDarkMode ? "white" : "#4b5563"),
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <span>{showBookmarksOnly ? "❤️ Bookmarked" : "🤍 Show Bookmarked Only"}</span>
                    {bookmarks.length > 0 && <span style={{
                      background: showBookmarksOnly ? "white" : "#ec4899",
                      color: showBookmarksOnly ? "#ec4899" : "white",
                      fontSize: "0.75rem",
                      padding: "0.1rem 0.4rem",
                      borderRadius: "10px"
                    }}>{bookmarks.length}</span>}
                  </button>
                </div>
              </div>
            </div>

            {/* ROADMAPS CATEGORY SECTION */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem"
            }}>
              {filteredRoadmaps.length > 0 ? (
                filteredRoadmaps.map((roadmap) => {
                  const percent = getProgressPercentage(roadmap.id, roadmap.steps.length);
                  const isBookmarked = bookmarks.includes(roadmap.id);

                  return (
                    <div
                      key={roadmap.id}
                      onClick={() => setSelectedRoadmap(roadmap)}
                      style={{
                        background: isDarkMode ? "rgba(30, 41, 59, 0.6)" : "white",
                        borderRadius: "24px",
                        border: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(99,102,241,0.1)",
                        padding: "1.75rem",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(99,102,241,0.15)";
                        e.currentTarget.style.borderColor = "#6366f1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03)";
                        e.currentTarget.style.borderColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.1)";
                      }}
                    >
                      {/* Top elements */}
                      <div>
                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => toggleBookmark(roadmap.id, e)}
                          style={{
                            position: "absolute",
                            top: "1.25rem",
                            right: "1.25rem",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.3rem",
                            padding: "0.25rem",
                            zIndex: 10
                          }}
                        >
                          {isBookmarked ? "❤️" : "🤍"}
                        </button>

                        {/* Icon & Education */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                          <span style={{
                            fontSize: "2.2rem",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(99,102,241,0.08)",
                            width: "55px",
                            height: "55px",
                            borderRadius: "16px"
                          }}>{roadmap.icon}</span>
                          <div>
                            <span style={{
                              fontSize: "0.72rem",
                              background: roadmap.education.includes("10th") ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
                              color: roadmap.education.includes("10th") ? "#d97706" : "#059669",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "10px",
                              fontWeight: 700,
                              textTransform: "uppercase"
                            }}>{roadmap.education}</span>
                          </div>
                        </div>

                        <h3 style={{ margin: "0 0 0.5rem 0", fontWeight: 800, fontSize: "1.25rem" }}>{roadmap.title}</h3>
                        <p style={{
                          margin: "0 0 1.25rem 0",
                          fontSize: "0.85rem",
                          color: isDarkMode ? "#94a3b8" : "#6b7280",
                          lineHeight: 1.6
                        }}>{roadmap.description}</p>
                      </div>

                      {/* Bottom elements */}
                      <div>
                        {/* Details Badges */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.5rem",
                          fontSize: "0.75rem",
                          marginBottom: "1rem"
                        }}>
                          <div>⏱️ {roadmap.duration}</div>
                          <div>💰 {roadmap.salary.split(" ")[0]}</div>
                          <div>📈 Demand: <span style={{ color: "#10b981", fontWeight: 700 }}>{roadmap.demand}</span></div>
                          <div>⚡ Diff: <span style={{ fontWeight: 700 }}>{roadmap.difficulty}</span></div>
                        </div>

                        {/* Progress Meter */}
                        {percent > 0 && (
                          <div style={{ marginBottom: "1rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                              <span>Progress</span>
                              <span>{percent}%</span>
                            </div>
                            <div style={{ height: "6px", background: isDarkMode ? "#1e293b" : "#e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                              <div style={{ width: `${percent}%`, height: "100%", background: "linear-gradient(135deg, #10b981, #059669)" }}></div>
                            </div>
                          </div>
                        )}

                        <button
                          style={{
                            width: "100%",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none",
                            color: "white",
                            padding: "0.6rem",
                            borderRadius: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          View Roadmap ➔
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem" }}>
                  <span style={{ fontSize: "3rem" }}>🔍</span>
                  <h3 style={{ marginTop: "1rem", fontWeight: 700 }}>No Roadmaps Found</h3>
                  <p style={{ color: "#6b7280" }}>Try checking your search filters or clear the query terms.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          
          /* VIEW 2: DETAILED ROADMAP VIEW */
          <div>
            {/* Top Navigation Control bar */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "rgba(255,255,255,0.6)",
              padding: "1rem 1.5rem",
              borderRadius: "20px",
              backdropFilter: "blur(10px)"
            }}>
              <button
                onClick={() => setSelectedRoadmap(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6366f1",
                  fontWeight: 700,
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                ◀ Back to Explore
              </button>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => toggleBookmark(selectedRoadmap.id)}
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "10px", 
                    background: isDarkMode ? "#1e293b" : "white",
                    color: bookmarks.includes(selectedRoadmap.id) ? "#ec4899" : (isDarkMode ? "#cbd5e1" : "#4b5563"),
                    border: "none", fontWeight: 600, cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                  }}
                >
                  {bookmarks.includes(selectedRoadmap.id) ? "❤️ Saved" : "🤍 Save to Bookmarks"}
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "10px", 
                    background: isDarkMode ? "#1e293b" : "white",
                    color: isDarkMode ? "#cbd5e1" : "#4b5563",
                    border: "none", fontWeight: 600, cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                  }}
                >
                  🖨️ Print PDF
                </button>

                <button
                  onClick={() => handleShare(selectedRoadmap.title)}
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "10px", 
                    background: isDarkMode ? "#1e293b" : "white",
                    color: isDarkMode ? "#cbd5e1" : "#4b5563",
                    border: "none", fontWeight: 600, cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                  }}
                >
                  🔗 Share
                </button>
              </div>
            </div>

            {/* HEADER METRICS */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "3rem",
              background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05))",
              padding: "2rem",
              borderRadius: "28px",
              borderLeft: "6px solid #6366f1"
            }}>
              <span style={{ fontSize: "3.5rem" }}>{selectedRoadmap.icon}</span>
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: "0.75rem",
                  background: "rgba(99,102,241,0.12)",
                  color: "#6366f1",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase"
                }}>{selectedRoadmap.education}</span>
                <h1 style={{ margin: "0.5rem 0", fontWeight: 900, fontSize: "2.2rem" }}>{selectedRoadmap.title} Roadmap</h1>
                <p style={{ margin: 0, color: isDarkMode ? "#cbd5e1" : "#4b5563", fontSize: "1.05rem" }}>
                  {selectedRoadmap.description}
                </p>
              </div>
              
              {/* Progress Panel */}
              <div style={{
                background: isDarkMode ? "rgba(15,23,42,0.4)" : "white",
                padding: "1.5rem",
                borderRadius: "20px",
                minWidth: "220px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: "0.5rem" }}>
                  <span>Completed Steps</span>
                  <span style={{ color: "#10b981" }}>{getProgressPercentage(selectedRoadmap.id, selectedRoadmap.steps.length)}%</span>
                </div>
                <div style={{ height: "10px", background: isDarkMode ? "#1e293b" : "#e2e8f0", borderRadius: "10px", overflow: "hidden", marginBottom: "0.5rem" }}>
                  <div style={{
                    width: `${getProgressPercentage(selectedRoadmap.id, selectedRoadmap.steps.length)}%`,
                    height: "100%",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    transition: "width 0.3s ease"
                  }}></div>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "center" }}>
                  Check steps off in the timeline to track.
                </div>
              </div>
            </div>

            {/* DETAILED CONTENT BLOCKS */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2.5rem", alignItems: "start" }}>
              
              {/* LEFT COLUMN: TIMELINE, SKILLS, EXAMS */}
              <div style={{ display: "grid", gap: "3rem" }}>
                
                {/* A. CAREER OVERVIEW */}
                <div style={{
                  background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "white",
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                }}>
                  <h3 style={{ fontWeight: 800, marginBottom: "1.25rem", color: "#6366f1" }}>🎯 Career Overview</h3>
                  <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>{selectedRoadmap.overview.field}</p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <div>
                      <h5 style={{ fontWeight: 700, margin: "0 0 0.5rem 0" }}>👤 Suitable For</h5>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: isDarkMode ? "#cbd5e1" : "#4b5563", lineHeight: 1.6 }}>
                        {selectedRoadmap.overview.suitable}
                      </p>
                    </div>
                    <div>
                      <h5 style={{ fontWeight: 700, margin: "0 0 0.5rem 0" }}>📈 Industry Growth & Scope</h5>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: isDarkMode ? "#cbd5e1" : "#4b5563", lineHeight: 1.6 }}>
                        {selectedRoadmap.overview.scope}
                      </p>
                    </div>
                  </div>
                </div>

                {/* B. STEP-BY-STEP TIMELINE */}
                <div>
                  <h3 style={{ fontWeight: 800, marginBottom: "1.5rem", color: "#6366f1" }}>🛣️ Step-by-Step Career Timeline</h3>
                  
                  <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
                    {/* Vertical Connector Line */}
                    <div style={{
                      position: "absolute",
                      left: "14px",
                      top: "20px",
                      bottom: "20px",
                      width: "4px",
                      background: "linear-gradient(180deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%)",
                      borderRadius: "10px"
                    }}></div>

                    {selectedRoadmap.steps.map((step, index) => {
                      const isCompleted = !!progressData[`${selectedRoadmap.id}_${step.id}`];

                      return (
                        <div key={step.id} style={{
                          position: "relative",
                          marginBottom: "2rem",
                          background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "white",
                          padding: "1.5rem",
                          borderRadius: "20px",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                          borderLeft: isCompleted ? "6px solid #10b981" : "6px solid transparent",
                          transition: "all 0.2s"
                        }}>
                          {/* Circle Dot Indicator */}
                          <div style={{
                            position: "absolute",
                            left: "-42px",
                            top: "20px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: isCompleted ? "#10b981" : (isDarkMode ? "#1e293b" : "white"),
                            border: isCompleted ? "none" : "3px solid #6366f1",
                            display: "grid",
                            placeItems: "center",
                            color: isCompleted ? "white" : "#6366f1",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                            cursor: "pointer"
                          }}
                          onClick={() => toggleStep(selectedRoadmap.id, step.id)}
                          >
                            {isCompleted ? "✓" : index + 1}
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "1rem" }}>
                            <div>
                              <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 700, fontSize: "1.1rem" }}>{step.title}</h4>
                              <p style={{ margin: 0, fontSize: "0.9rem", color: isDarkMode ? "#cbd5e1" : "#4b5563", lineHeight: 1.6 }}>{step.desc}</p>
                            </div>
                            
                            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                              <input 
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => toggleStep(selectedRoadmap.id, step.id)}
                                style={{ width: "18px", height: "18px", accentColor: "#10b981", cursor: "pointer" }}
                              />
                              Done
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* C. SKILLS REQUIRED SECTION */}
                <div style={{
                  background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "white",
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                }}>
                  <h3 style={{ fontWeight: 800, marginBottom: "1.5rem", color: "#6366f1" }}>⚡ Skills Required</h3>
                  
                  <div style={{ display: "grid", gap: "1.5rem" }}>
                    {selectedRoadmap.skills.map((skill) => (
                      <div key={skill.name}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>
                          <span>{skill.name} <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6b7280" }}>({skill.level})</span></span>
                          <span>{skill.pct}%</span>
                        </div>
                        <div style={{ height: "8px", background: isDarkMode ? "#1e293b" : "#e2e8f0", borderRadius: "10px", overflow: "hidden", marginBottom: "0.4rem" }}>
                          <div style={{ width: `${skill.pct}%`, height: "100%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}></div>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                          <strong>Related Tools:</strong> {skill.tools}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: SALARY, EXAMS, RESOURCES */}
              <div style={{ display: "grid", gap: "3rem" }}>
                
                {/* E. SALARY INSIGHTS */}
                <div style={{
                  background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "white",
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                }}>
                  <h3 style={{ fontWeight: 800, marginBottom: "1.25rem", color: "#6366f1" }}>💰 Salary Insights</h3>
                  
                  <div style={{ display: "grid", gap: "1.25rem", marginBottom: "1.5rem" }}>
                    {[
                      { label: "Fresher Level", amount: selectedRoadmap.salaryInsights.fresher, color: "#93c5fd" },
                      { label: "Mid-Career Level", amount: selectedRoadmap.salaryInsights.mid, color: "#6366f1" },
                      { label: "Senior/Expert", amount: selectedRoadmap.salaryInsights.senior, color: "#8b5cf6" }
                    ].map((insight) => (
                      <div key={insight.label} style={{
                        padding: "1rem",
                        borderRadius: "15px",
                        background: isDarkMode ? "#0f172a" : "#f8fafc",
                        borderLeft: `5px solid ${insight.color}`
                      }}>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 700 }}>{insight.label.toUpperCase()}</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: isDarkMode ? "white" : "#1f2937", marginTop: "0.2rem" }}>{insight.amount}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h5 style={{ fontWeight: 700, margin: "0 0 0.5rem 0" }}>✈️ Global Opportunities</h5>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: isDarkMode ? "#cbd5e1" : "#4b5563", lineHeight: 1.6 }}>
                      {selectedRoadmap.salaryInsights.abroad}
                    </p>
                  </div>
                </div>

                {/* D. ENTRANCE EXAMS */}
                <div style={{
                  background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "white",
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                }}>
                  <h3 style={{ fontWeight: 800, marginBottom: "1.25rem", color: "#6366f1" }}>📝 Entrance Exams</h3>
                  
                  {selectedRoadmap.exams && selectedRoadmap.exams.length > 0 ? (
                    selectedRoadmap.exams.map((exam) => (
                      <div key={exam.name} style={{
                        padding: "1.25rem",
                        borderRadius: "16px",
                        background: isDarkMode ? "#0f172a" : "#f8fafc",
                        marginBottom: "1rem"
                      }}>
                        <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 700, color: "#6366f1" }}>{exam.name}</h4>
                        <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", lineHeight: 1.5 }}>
                          <strong>Purpose:</strong> {exam.purpose}
                        </p>
                        <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", lineHeight: 1.5 }}>
                          <strong>Eligibility:</strong> {exam.eligibility}
                        </p>
                        <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5, color: "#10b981" }}>
                          <strong>Prep Tip:</strong> {exam.tips}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                      No specific national entrance exams required. Direct college merit admissions apply.
                    </div>
                  )}
                </div>

                {/* G. REAL STUDENT JOURNEY */}
                <div style={{
                  background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "white",
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                }}>
                  <h3 style={{ fontWeight: 800, marginBottom: "1.25rem", color: "#6366f1" }}>🏃 Real Student Journey</h3>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                    {selectedRoadmap.journey.map((step, idx) => (
                      <div key={step} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{
                          fontSize: "0.78rem",
                          background: idx === selectedRoadmap.journey.length - 1 ? "#10b981" : (isDarkMode ? "#0f172a" : "#f1f5f9"),
                          color: idx === selectedRoadmap.journey.length - 1 ? "white" : (isDarkMode ? "white" : "#4b5563"),
                          padding: "0.4rem 0.8rem",
                          borderRadius: "10px",
                          fontWeight: 700
                        }}>{step}</span>
                        {idx < selectedRoadmap.journey.length - 1 && <span style={{ color: "#6366f1" }}>➔</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* F. LEARNING RESOURCES */}
                <div style={{
                  background: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "white",
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                }}>
                  <h3 style={{ fontWeight: 800, marginBottom: "1.25rem", color: "#6366f1" }}>📚 Curated Resources</h3>
                  
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    {selectedRoadmap.resources.map((res) => (
                      <a
                        key={res.name}
                        href={res.link}
                        style={{
                          textDecoration: "none",
                          padding: "1rem",
                          borderRadius: "12px",
                          background: isDarkMode ? "#0f172a" : "#f8fafc",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid transparent",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#6366f1";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "transparent";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <div>
                          <span style={{
                            fontSize: "0.65rem",
                            background: "rgba(99,102,241,0.12)",
                            color: "#6366f1",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "5px",
                            fontWeight: 700,
                            marginRight: "0.5rem",
                            textTransform: "uppercase"
                          }}>{res.type}</span>
                          <strong style={{ color: isDarkMode ? "white" : "#1f2937", fontSize: "0.85rem" }}>{res.name}</strong>
                        </div>
                        <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>{res.cost} ➔</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* H. CAREER TIPS & GUIDANCE */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  border: "1px solid rgba(99,102,241,0.2)"
                }}>
                  <h3 style={{ fontWeight: 800, marginBottom: "1rem", color: "#6366f1" }}>💡 Mentor Career Tips</h3>
                  
                  <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                    {selectedRoadmap.tips.map((tip, idx) => (
                      <li key={idx} style={{ marginBottom: "0.75rem", fontSize: "0.88rem", lineHeight: 1.6 }}>{tip}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default RoadmapsPage;
