import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import { fetchCollegeFilters, fetchColleges } from "../services/collegeService";

function Colleges() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data = await fetchCollegeFilters();
        setDistrictOptions(data.districts);
        setTypeOptions(data.types);
      } catch (err) {
        console.error(err);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const loadColleges = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchColleges({
          search: queryParam,
          districts: selectedDistricts,
          types: selectedTypes,
        });
        setColleges(data);
      } catch (err) {
        setError(err.message || "Unable to load colleges.");
      } finally {
        setLoading(false);
      }
    };
    loadColleges();
  }, [queryParam, selectedDistricts, selectedTypes]);

  useEffect(() => {
    if (
      searchTerm.trim() === "" &&
      selectedDistricts.length === 0 &&
      selectedTypes.length === 0 &&
      queryParam !== ""
    ) {
      setSearchParams({});
    }
  }, [searchTerm, selectedDistricts, selectedTypes, queryParam, setSearchParams]);

  const handleCheckboxChange = (value, current, setter) => {
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const activeFilterCount = useMemo(
    () => selectedDistricts.length + selectedTypes.length + (queryParam ? 1 : 0),
    [selectedDistricts.length, selectedTypes.length, queryParam]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <PrivateNavbar initialSearch={queryParam} />

      <main className="container" style={{ padding: "3rem 0 4rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ maxWidth: "720px" }}>
            <p
              style={{
                marginBottom: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                borderRadius: "999px",
                background: "rgba(99,102,241,0.12)",
                color: "#4338ca",
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "0.04em",
              }}
            >
              College Finder
            </p>
            <h1
              style={{
                fontSize: "3.4rem",
                lineHeight: "1.05",
                color: "#0f172a",
                marginBottom: "1rem",
              }}
            >
              Discover the right college.
            </h1>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.8" }}>
              Search by college name, district, or Course to see the nearest matches instantly.
            </p>
          </div>


        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 320px) 1fr",
            gap: "2rem",
          }}
        >
          <aside
            style={{
              position: "sticky",
              top: "5.5rem",
              alignSelf: "start",
              padding: "1.75rem",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(148,163,184,0.14)",
              boxShadow: "0 20px 40px rgba(15,23,42,0.06)",
            }}
          >
            <section style={{ marginBottom: "1.75rem" }}>
              <h2 style={{ marginBottom: "0.75rem", fontSize: "1.05rem", color: "#111827" }}>
                Search a college
              </h2>
              <form onSubmit={handleSearchSubmit}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by college, type, district"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: "0.95rem 1rem",
                      borderRadius: "18px",
                      border: "1px solid rgba(148,163,184,0.2)",
                      outline: "none",
                      color: "#0f172a",
                      background: "rgba(247,250,252,0.9)",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      flexShrink: 0,
                      padding: "0.95rem 1.1rem",
                      borderRadius: "18px",
                      border: "none",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Go
                  </button>
                </div>
              </form>
              <p style={{ color: "#475569", fontSize: "0.95rem", margin: 0 }}>
                Press Enter or click Go to search.
              </p>
            </section>

            <div
              style={{
                maxHeight: "420px",
                overflowY: "auto",
                paddingRight: "0.35rem",
                display: "grid",
                gap: "1.5rem",
              }}
            >
              <section style={{ marginBottom: 0 }}>
                <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
                  Districts
                </h2>
                <div style={{ display: "grid", gap: "0.85rem" }}>
                  {districtOptions.length === 0 ? (
                    <p style={{ color: "#64748b" }}>Loading districts…</p>
                  ) : (
                    districtOptions
                      .filter((district) => district !== "Not Available")
                      .map((district) => (
                        <label
                          key={district}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            color: "#334155",
                            fontSize: "0.95rem",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedDistricts.includes(district)}
                            onChange={() => handleCheckboxChange(district, selectedDistricts, setSelectedDistricts)}
                            style={{ width: "16px", height: "16px" }}
                          />
                          {district}
                        </label>
                      ))
                  )}
                </div>
              </section>

              <section style={{ marginBottom: 0 }}>
                <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
                  Courses
                </h2>
                <div style={{ display: "grid", gap: "0.85rem" }}>
                  {typeOptions.length === 0 ? (
                    <p style={{ color: "#64748b" }}>Loading courses…</p>
                  ) : (
                    typeOptions.map((type) => (
                      <label
                        key={type}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          color: "#334155",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleCheckboxChange(type, selectedTypes, setSelectedTypes)}
                          style={{ width: "16px", height: "16px" }}
                        />
                        {type}
                      </label>
                    ))
                  )}
                </div>
              </section>
            </div>
          </aside>

          <section>
            <div
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}>
                  Browse top colleges
                </p>
                <h2 style={{ margin: "0.35rem 0 0", color: "#111827" }}>
                  Results {colleges.length > 0 ? `(${colleges.length})` : "(none yet)"}
                </h2>
              </div>


            </div>

            {loading ? (
              <div
                style={{
                  minHeight: "320px",
                  display: "grid",
                  placeItems: "center",
                  color: "#64748b",
                }}
              >
                Loading colleges...
              </div>
            ) : error ? (
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(248,113,113,0.2)",
                  color: "#b91c1c",
                }}
              >
                {error}
              </div>
            ) : colleges.length === 0 ? (
              <div
                style={{
                  minHeight: "320px",
                  display: "grid",
                  placeItems: "center",
                  color: "#475569",
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: "24px",
                  border: "1px solid rgba(148,163,184,0.18)",
                  padding: "2rem",
                }}
              >
                <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>
                  Not found
                </p>
                <p style={{ margin: 0, marginTop: "0.75rem", color: "#64748b" }}>
                  {queryParam
                    ? `No colleges matched "${queryParam}". Please try another search.`
                    : "No colleges match the current filters."}
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                  gap: "1.5rem",
                }}
              >
                {colleges.map((college) => (
                  <article
                    key={college._id}
                    style={{
                      borderRadius: "28px",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))",
                      border: "1px solid rgba(148,163,184,0.18)",
                      padding: "1.7rem",
                      boxShadow: "0 24px 60px rgba(15,23,42,0.08)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      cursor: "default",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 30px 70px rgba(15,23,42,0.12)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 24px 60px rgba(15,23,42,0.08)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.2rem",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "44px",
                          height: "44px",
                          borderRadius: "16px",
                          background: "rgba(99,102,241,0.12)",
                          color: "#4338ca",
                          fontSize: "1.1rem",
                        }}
                      >
                        🏛️
                      </span>
                      <span
                        style={{
                          padding: "0.55rem 0.9rem",
                          borderRadius: "999px",
                          background: "rgba(99,102,241,0.08)",
                          color: "#4338ca",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {college.type}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "1.2rem",
                        margin: 0,
                        color: "#0f172a",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {college.collegeName}
                    </h3>

                    <p style={{ margin: 0, color: "#475569", lineHeight: "1.75", marginBottom: "1rem" }}>
                      {college.address}
                    </p>

                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280" }}>
                        <span>District</span>
                        <span>{college.district || "Not Available"}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280" }}>
                        <span>Office</span>
                        <span>{college.office || "Not Available"}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280" }}>
                        <span>Phone</span>
                        <span>{college.phoneNumber || "Not Available"}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Colleges;
