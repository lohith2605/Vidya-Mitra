import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function PublicHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-[Inter] bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      
      <PublicNavbar />

      <div className="container text-center py-5">
        
        {/* HERO */}
        <h1 className="display-4 fw-bold text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 text-transparent bg-clip-text">
          Welcome to VidyaMitra 🎓
        </h1>

        <p className="lead mt-3 text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Your smart career guidance platform helping students
          choose the right path and build a successful future.
        </p>

        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <button
            className="btn btn-primary btn-lg px-4 py-2 rounded-pill shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              boxShadow: "0 8px 20px rgba(99,102,241,0.3)"
            }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="btn btn-outline-secondary btn-lg px-4 py-2 rounded-pill bg-white/70 backdrop-blur-md"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>

        {/* CARDS */}
        <div className="row mt-5 g-4">

          {[
            {
              title: "Career Guidance",
              desc: "Discover the best career options based on your interests and skills.",
            },
            {
              title: "Roadmaps",
              desc: "Follow structured paths to achieve your goals.",
            },
            {
              title: "Colleges",
              desc: "Explore top colleges and universities.",
            },
            {
              title: "Quiz",
              desc: "Test your knowledge and discover your strengths.",
            },
            {
              title: "Recommendations",
              desc: "Get personalized suggestions for your career path.",
            },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="card p-4 h-100"
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "0.3s"
                }}
              >
                <h5 className="fw-bold text-indigo-600">
                  {item.title}
                </h5>

                <p className="mt-2 text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default PublicHome;