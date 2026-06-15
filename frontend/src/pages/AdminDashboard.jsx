import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // Authentication Guard
  useEffect(() => {
    const isAdmin = localStorage.getItem("vidya_admin_logged_in") === "true";
    const token = localStorage.getItem("vidya_admin_token");
    if (!isAdmin || !token) {
      console.log("[AdminDashboard] Unauthorized admin access. Redirecting to login...");
      navigate("/admin/login");
    }
  }, [navigate]);

  // States
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'colleges' | 'add-college'

  // Search and Pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Add Form States
  const [addForm, setAddForm] = useState({
    collegeName: "",
    address: "",
    district: "",
    type: "",
    office: "",
    phoneNumber: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  // Edit Modal States
  const [editCollege, setEditCollege] = useState(null); // college object to edit
  const [editForm, setEditForm] = useState({
    collegeName: "",
    address: "",
    district: "",
    type: "",
    office: "",
    phoneNumber: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete Modal States
  const [deleteCollegeId, setDeleteCollegeId] = useState(null);
  const [deleteCollegeName, setDeleteCollegeName] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast notifications state
  const [toast, setToast] = useState(null); // { message: '', type: 'success'|'error' }

  // Auto-dismiss Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch all colleges
  const loadColleges = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("vidya_admin_token");
      const res = await fetch("http://localhost:5000/api/admin/colleges", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch colleges");
      }
      setColleges(data.colleges || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadColleges();
  }, []);

  // Filtered colleges list based on search
  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return true;
      return (
        c.collegeName?.toLowerCase().includes(term) ||
        c.district?.toLowerCase().includes(term) ||
        c.type?.toLowerCase().includes(term)
      );
    });
  }, [colleges, searchTerm]);

  // Handle Search Input Change (Reset to page 1)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination details
  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredColleges.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredColleges, currentPage]);

  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);

  // Statistics Calculation
  const stats = useMemo(() => {
    let total = colleges.length;
    let engineering = 0;
    let degree = 0;
    let bed = 0;

    colleges.forEach((c) => {
      const t = c.type?.toLowerCase() || "";
      if (t.includes("engineering")) {
        engineering++;
      }
      if (t.includes("degree")) {
        degree++;
      }
      if (t.includes("b.ed") || t.includes("education")) {
        bed++;
      }
    });

    return { total, engineering, degree, bed };
  }, [colleges]);

  // Add College Submit Handler
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);

    const { collegeName, address, district, type, office, phoneNumber } = addForm;

    if (!collegeName.trim() || !address.trim() || !district.trim() || !type.trim() || !office.trim() || !phoneNumber.trim()) {
      setAddError("All fields are required.");
      setAddLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("vidya_admin_token");
      const res = await fetch("http://localhost:5000/api/admin/colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addForm),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add college");
      }

      setToast({ message: "College added successfully!", type: "success" });
      setAddForm({
        collegeName: "",
        address: "",
        district: "",
        type: "",
        office: "",
        phoneNumber: "",
      });

      // Reload list and switch tab
      await loadColleges();
      setActiveTab("colleges");
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  // Edit Trigger
  const handleEditClick = (college) => {
    setEditCollege(college);
    setEditForm({
      collegeName: college.collegeName || "",
      address: college.address || "",
      district: college.district || "",
      type: college.type || "",
      office: college.office || "",
      phoneNumber: college.phoneNumber || "",
    });
    setEditError("");
  };

  // Edit College Submit Handler
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditLoading(true);

    const { collegeName, address, district, type, office, phoneNumber } = editForm;

    if (!collegeName.trim() || !address.trim() || !district.trim() || !type.trim() || !office.trim() || !phoneNumber.trim()) {
      setEditError("All fields are required.");
      setEditLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("vidya_admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/colleges/${editCollege._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update college");
      }

      setToast({ message: "College updated successfully!", type: "success" });
      setEditCollege(null);
      await loadColleges();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // Delete Trigger
  const handleDeleteClick = (college) => {
    setDeleteCollegeId(college._id);
    setDeleteCollegeName(college.collegeName);
  };

  // Delete Confirm Handler
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("vidya_admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/colleges/${deleteCollegeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete college");
      }

      setToast({ message: "College deleted successfully!", type: "success" });
      setDeleteCollegeId(null);
      setDeleteCollegeName("");

      // Adjust page if deletion empties current page
      if (filteredColleges.length - 1 <= (currentPage - 1) * itemsPerPage && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      await loadColleges();
    } catch (err) {
      setToast({ message: err.message || "Failed to delete college", type: "error" });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("vidya_admin_token");
    localStorage.removeItem("vidya_admin_logged_in");
    localStorage.removeItem("user_role");
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #eef2ff, #ede9fe)",
        fontFamily: "Inter, sans-serif",
        display: "flex",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "280px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(148, 163, 184, 0.16)",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        {/* LOGO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "3rem",
            paddingLeft: "0.5rem",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🎓</span>
          <div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e1b4b" }}>
              VidyaMitra
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#6366f1",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Admin Panel
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.95rem 1.2rem",
              borderRadius: "16px",
              border: "none",
              background: activeTab === "dashboard" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
              color: activeTab === "dashboard" ? "#ffffff" : "#475569",
              fontSize: "0.95rem",
              fontWeight: 600,
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>📊</span> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("colleges")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.95rem 1.2rem",
              borderRadius: "16px",
              border: "none",
              background: activeTab === "colleges" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
              color: activeTab === "colleges" ? "#ffffff" : "#475569",
              fontSize: "0.95rem",
              fontWeight: 600,
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🏛️</span> Colleges
          </button>

          <button
            onClick={() => setActiveTab("add-college")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.95rem 1.2rem",
              borderRadius: "16px",
              border: "none",
              background: activeTab === "add-college" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
              color: activeTab === "add-college" ? "#ffffff" : "#475569",
              fontSize: "0.95rem",
              fontWeight: 600,
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>➕</span> Add College
          </button>
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0.95rem 1.2rem",
            borderRadius: "16px",
            border: "none",
            background: "rgba(239, 68, 68, 0.08)",
            color: "#ef4444",
            fontSize: "0.95rem",
            fontWeight: 600,
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.25s ease",
            marginTop: "auto",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.16)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>🚪</span> Logout
        </button>
      </aside>

      {/* TOAST FLOATING NOTIFICATION */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 100,
            background: toast.type === "success" ? "#10b981" : "#ef4444",
            color: "#ffffff",
            padding: "1rem 2rem",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            fontWeight: 600,
            animation: "fadeIn 0.3s ease",
          }}
        >
          {toast.type === "success" ? "✅" : "⚠️"} {toast.message}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main style={{ marginLeft: "280px", flex: 1, padding: "2.5rem 3rem" }}>
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              {activeTab === "dashboard"
                ? "Dashboard Overview"
                : activeTab === "colleges"
                ? "Colleges Management"
                : "Add New College"}
            </h1>
            <p style={{ color: "#64748b", margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
              Welcome back, Administrator
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                background: "rgba(99, 102, 241, 0.1)",
                color: "#4f46e5",
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              🔒 Secure Session
            </span>
          </div>
        </header>

        {/* LOADING & ERROR STATES */}
        {loading && activeTab === "dashboard" && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            Fetching database statistics...
          </div>
        )}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fee2e2",
              color: "#ef4444",
              padding: "1rem 1.5rem",
              borderRadius: "16px",
              marginBottom: "2rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* TAB 1: DASHBOARD VIEW */}
        {activeTab === "dashboard" && (
          <section style={{ animation: "fadeIn 0.4s ease" }}>
            {/* STATS GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.5rem",
                marginBottom: "3rem",
              }}
            >
              {[
                { title: "Total Colleges", value: stats.total, color: "#6366f1", icon: "🏛️" },
                { title: "Engineering Colleges", value: stats.engineering, color: "#3b82f6", icon: "⚙️" },
                { title: "Degree Colleges", value: stats.degree, color: "#10b981", icon: "📜" },
                { title: "B.Ed Colleges", value: stats.bed, color: "#8b5cf6", icon: "🎓" },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    borderRadius: "24px",
                    padding: "1.75rem",
                    boxShadow: "0 10px 30px rgba(15,23,42,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600 }}>
                      {card.title}
                    </span>
                    <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", margin: "0.5rem 0 0 0" }}>
                      {card.value}
                    </h2>
                  </div>
                  <span
                    style={{
                      fontSize: "2.2rem",
                      background: `${card.color}15`,
                      color: card.color,
                      width: "60px",
                      height: "60px",
                      borderRadius: "18px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {card.icon}
                  </span>
                </div>
              ))}
            </div>

            {/* WELCOME BANNER CARD */}
            <div
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                borderRadius: "28px",
                padding: "3rem",
                color: "#ffffff",
                boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "800px",
              }}
            >
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>
                Manage college data with confidence.
              </h3>
              <p style={{ margin: 0, opacity: 0.9, lineHeight: "1.7", fontSize: "1.05rem" }}>
                Add new colleges, modify existing entries, or delete outdated institutional records. All modifications are instantly written directly to the JSON file database and synchronized immediately for students.
              </p>
              <button
                onClick={() => setActiveTab("colleges")}
                style={{
                  alignSelf: "start",
                  background: "#ffffff",
                  color: "#4f46e5",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "999px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Manage Colleges 🏛️
              </button>
            </div>
          </section>
        )}

        {/* TAB 2: COLLEGES MANAGEMENT TABLE */}
        {activeTab === "colleges" && (
          <section style={{ animation: "fadeIn 0.4s ease" }}>
            {/* ACTIONS BAR */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                marginBottom: "1.75rem",
              }}
            >
              {/* SEARCH BOX */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(148, 163, 184, 0.24)",
                  background: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  flex: 1,
                  maxWidth: "400px",
                }}
              >
                <span style={{ fontSize: "1rem" }}>🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name, district, or type..."
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "0.92rem",
                    width: "100%",
                    color: "#0f172a",
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#94a3b8",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* QUICK ADD BUTTON */}
              <button
                onClick={() => setActiveTab("add-college")}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  color: "#ffffff",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>➕</span> Add College
              </button>
            </div>

            {/* COLLEGES TABLE CONTAINER */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "24px",
                boxShadow: "0 20px 40px rgba(15,23,42,0.05)",
                overflow: "hidden",
                marginBottom: "2rem",
              }}
            >
              {loading ? (
                <div style={{ textAlign: "center", padding: "5rem", color: "#64748b" }}>
                  Loading college database...
                </div>
              ) : filteredColleges.length === 0 ? (
                <div style={{ textAlign: "center", padding: "5rem" }}>
                  <span style={{ fontSize: "3rem" }}>📭</span>
                  <h3 style={{ margin: "1rem 0 0.5rem 0", color: "#1e293b", fontWeight: 700 }}>
                    No Colleges Found
                  </h3>
                  <p style={{ color: "#64748b", margin: 0 }}>
                    {searchTerm
                      ? `No colleges match search: "${searchTerm}"`
                      : "The database file backend/data/colleges.json is empty."}
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "left",
                      fontSize: "0.92rem",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
                          background: "rgba(241, 245, 249, 0.5)",
                        }}
                      >
                        <th style={{ padding: "1.2rem 1.5rem", color: "#475569", fontWeight: 700 }}>
                          College Name
                        </th>
                        <th style={{ padding: "1.2rem 1.5rem", color: "#475569", fontWeight: 700 }}>
                          District
                        </th>
                        <th style={{ padding: "1.2rem 1.5rem", color: "#475569", fontWeight: 700 }}>
                          Type
                        </th>
                        <th style={{ padding: "1.2rem 1.5rem", color: "#475569", fontWeight: 700 }}>
                          Phone Number
                        </th>
                        <th style={{ padding: "1.2rem 1.5rem", color: "#475569", fontWeight: 700, width: "180px" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedColleges.map((college, i) => (
                        <tr
                          key={college._id || i}
                          style={{
                            borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
                            background: i % 2 === 0 ? "transparent" : "rgba(248, 250, 252, 0.3)",
                            transition: "background 0.2s ease",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(241, 245, 249, 0.4)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background =
                              i % 2 === 0 ? "transparent" : "rgba(248, 250, 252, 0.3)";
                          }}
                        >
                          <td style={{ padding: "1.2rem 1.5rem", fontWeight: 600, color: "#1e293b" }}>
                            {college.collegeName}
                          </td>
                          <td style={{ padding: "1.2rem 1.5rem", color: "#334155" }}>
                            {college.district}
                          </td>
                          <td style={{ padding: "1.2rem 1.5rem" }}>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "0.3rem 0.75rem",
                                borderRadius: "999px",
                                background: "rgba(99, 102, 241, 0.08)",
                                color: "#4f46e5",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                              }}
                            >
                              {college.type}
                            </span>
                          </td>
                          <td style={{ padding: "1.2rem 1.5rem", color: "#334155" }}>
                            {college.phoneNumber}
                          </td>
                          <td style={{ padding: "1.2rem 1.5rem", display: "flex", gap: "0.75rem" }}>
                            {/* EDIT BUTTON */}
                            <button
                              onClick={() => handleEditClick(college)}
                              style={{
                                background: "rgba(59, 130, 246, 0.08)",
                                color: "#3b82f6",
                                border: "none",
                                padding: "0.45rem 0.9rem",
                                borderRadius: "10px",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background = "rgba(59, 130, 246, 0.16)";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background = "rgba(59, 130, 246, 0.08)";
                              }}
                            >
                              Edit
                            </button>
                            {/* DELETE BUTTON */}
                            <button
                              onClick={() => handleDeleteClick(college)}
                              style={{
                                background: "rgba(239, 68, 68, 0.08)",
                                color: "#ef4444",
                                border: "none",
                                padding: "0.45rem 0.9rem",
                                borderRadius: "10px",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background = "rgba(239, 68, 68, 0.16)";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background = "rgba(239, 68, 68, 0.08)";
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* PAGINATION PANEL */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255, 255, 255, 0.6)",
                  padding: "1rem 1.5rem",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  Showing page {currentPage} of {totalPages} ({filteredColleges.length} colleges total)
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    style={{
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      background: "#ffffff",
                      color: currentPage === 1 ? "#cbd5e1" : "#475569",
                      padding: "0.5rem 1rem",
                      borderRadius: "10px",
                      cursor: currentPage === 1 ? "default" : "pointer",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    style={{
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      background: "#ffffff",
                      color: currentPage === totalPages ? "#cbd5e1" : "#475569",
                      padding: "0.5rem 1rem",
                      borderRadius: "10px",
                      cursor: currentPage === totalPages ? "default" : "pointer",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 3: ADD COLLEGE FORM */}
        {activeTab === "add-college" && (
          <section style={{ animation: "fadeIn 0.4s ease", maxWidth: "720px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "28px",
                padding: "2.5rem",
                boxShadow: "0 20px 40px rgba(15,23,42,0.06)",
              }}
            >
              <h3 style={{ margin: "0 0 1.5rem 0", color: "#0f172a", fontWeight: 700 }}>
                College Details Form
              </h3>

              {addError && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fee2e2",
                    color: "#ef4444",
                    padding: "1rem",
                    borderRadius: "12px",
                    marginBottom: "1.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  ⚠️ {addError}
                </div>
              )}

              <form onSubmit={handleAddSubmit} style={{ display: "grid", gap: "1.25rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                      color: "#334155",
                      fontSize: "0.9rem",
                    }}
                  >
                    College Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajendra Prasad B.Ed. College"
                    value={addForm.collegeName}
                    onChange={(e) => setAddForm({ ...addForm, collegeName: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      outline: "none",
                      fontSize: "0.92rem",
                      background: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                      color: "#334155",
                      fontSize: "0.9rem",
                    }}
                  >
                    Address
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Sai Baba Temple, Rajempet, Asifabad - 542293"
                    value={addForm.address}
                    onChange={(e) => setAddForm({ ...addForm, address: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      outline: "none",
                      fontSize: "0.92rem",
                      background: "#ffffff",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#334155",
                        fontSize: "0.9rem",
                      }}
                    >
                      District
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adilabad"
                      value={addForm.district}
                      onChange={(e) => setAddForm({ ...addForm, district: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(148, 163, 184, 0.25)",
                        outline: "none",
                        fontSize: "0.92rem",
                        background: "#ffffff",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#334155",
                        fontSize: "0.9rem",
                      }}
                    >
                      Type / Course
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engineering College, Degree College, etc."
                      value={addForm.type}
                      onChange={(e) => setAddForm({ ...addForm, type: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(148, 163, 184, 0.25)",
                        outline: "none",
                        fontSize: "0.92rem",
                        background: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#334155",
                        fontSize: "0.9rem",
                      }}
                    >
                      Office Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 08733-277123"
                      value={addForm.office}
                      onChange={(e) => setAddForm({ ...addForm, office: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(148, 163, 184, 0.25)",
                        outline: "none",
                        fontSize: "0.92rem",
                        background: "#ffffff",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#334155",
                        fontSize: "0.9rem",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9440063388"
                      value={addForm.phoneNumber}
                      onChange={(e) => setAddForm({ ...addForm, phoneNumber: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(148, 163, 184, 0.25)",
                        outline: "none",
                        fontSize: "0.92rem",
                        background: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={addLoading}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.9rem 2rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    marginTop: "1rem",
                    boxShadow: "0 4px 14px rgba(99,102,241,0.2)",
                  }}
                >
                  {addLoading ? "Saving entry..." : "Add College Database Entry"}
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* EDIT MODAL DIALOG */}
      {editCollege && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            zIndex: 100,
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "28px",
              padding: "2.5rem",
              width: "100%",
              maxWidth: "640px",
              boxShadow: "0 30px 60px rgba(15,23,42,0.2)",
              position: "relative",
            }}
          >
            <h3 style={{ margin: "0 0 1.5rem 0", color: "#0f172a", fontWeight: 700 }}>
              Edit College Entry
            </h3>

            {editError && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fee2e2",
                  color: "#ef4444",
                  padding: "0.8rem 1rem",
                  borderRadius: "12px",
                  marginBottom: "1.25rem",
                  fontSize: "0.88rem",
                }}
              >
                ⚠️ {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} style={{ display: "grid", gap: "1.1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: "#334155", fontSize: "0.85rem" }}>
                  College Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.collegeName}
                  onChange={(e) => setEditForm({ ...editForm, collegeName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.95rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    outline: "none",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: "#334155", fontSize: "0.85rem" }}>
                  Address
                </label>
                <textarea
                  required
                  rows={2}
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.95rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    outline: "none",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: "#334155", fontSize: "0.85rem" }}>
                    District
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.district}
                    onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.95rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      outline: "none",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: "#334155", fontSize: "0.85rem" }}>
                    Type
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.95rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      outline: "none",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: "#334155", fontSize: "0.85rem" }}>
                    Office Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.office}
                    onChange={(e) => setEditForm({ ...editForm, office: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.95rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      outline: "none",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: "#334155", fontSize: "0.85rem" }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.phoneNumber}
                    onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.95rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      outline: "none",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setEditCollege(null)}
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    padding: "0.7rem 1.4rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.7rem 1.4rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL DIALOG */}
      {deleteCollegeId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            zIndex: 100,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "28px",
              padding: "2.5rem",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 30px 60px rgba(15,23,42,0.2)",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🗑️</span>
            <h3 style={{ margin: "0 0 1rem 0", color: "#0f172a", fontWeight: 800 }}>
              Confirm Deletion
            </h3>
            <p style={{ color: "#64748b", margin: "0 0 2rem 0", lineHeight: "1.6" }}>
              Are you sure you want to permanently delete <strong>{deleteCollegeName}</strong>? This action will remove the record immediately from the database and the JSON file.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                type="button"
                onClick={() => {
                  setDeleteCollegeId(null);
                  setDeleteCollegeName("");
                }}
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                No, Keep it
              </button>
              <button
                type="button"
                disabled={deleteLoading}
                onClick={handleDeleteConfirm}
                style={{
                  background: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(239,68,68,0.2)",
                }}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLES FOR ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default AdminDashboard;