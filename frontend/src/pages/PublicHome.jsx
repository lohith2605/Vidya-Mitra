import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function PublicHome() {
  const navigate = useNavigate();

  return (
    <>
      <PublicNavbar />

      <div className="container text-center py-5">
        
        {/* HERO */}
        <h1 className="display-4 fw-bold">
          Welcome to VidyaMitra 🎓
        </h1>

        <p className="lead text-muted mt-3">
          Your smart career guidance platform helping students
          choose the right path and build a successful future.
        </p>

        <div className="mt-4">
          <button
            className="btn btn-primary btn-lg me-3"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="btn btn-outline-secondary btn-lg"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>

        {/* CARDS */}
        <div className="row mt-5 g-4">

          {/* Career */}
          <div className="col-md-4">
            <div className="card p-4 h-100 shadow-sm">
              <h5 className="fw-bold text-primary">
                Career Guidance
              </h5>
              <p className="text-muted mt-2">
                Discover the best career options based on your
                interests and skills.
              </p>
            </div>
          </div>

          {/* Roadmaps */}
          <div className="col-md-4">
            <div className="card p-4 h-100 shadow-sm">
              <h5 className="fw-bold text-primary">
                Roadmaps
              </h5>
              <p className="text-muted mt-2">
                Follow structured paths to achieve your goals.
              </p>
            </div>
          </div>

          {/* Colleges */}
          <div className="col-md-4">
            <div className="card p-4 h-100 shadow-sm">
              <h5 className="fw-bold text-primary">
                Colleges
              </h5>
              <p className="text-muted mt-2">
                Explore top colleges and universities.
              </p>
            </div>
          </div>

          {/* Quiz */}
          <div className="col-md-4">
            <div className="card p-4 h-100 shadow-sm">
              <h5 className="fw-bold text-primary">
                Quiz
              </h5>
              <p className="text-muted mt-2">
                Test your knowledge and discover your strengths.
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="col-md-4">
            <div className="card p-4 h-100 shadow-sm">
              <h5 className="fw-bold text-primary">
                Recommendations
              </h5>
              <p className="text-muted mt-2">
                Get personalized suggestions for your career path.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default PublicHome;