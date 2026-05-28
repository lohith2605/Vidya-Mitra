import { useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";

function PrivateHome() {

  const navigate = useNavigate();

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
      <PrivateNavbar />

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

          {/* TITLE */}
          <h1
            className="fw-bold"
            style={{
              fontSize: "4rem",
              lineHeight: "1.1",
              color: "#000",
            }}
          >
            Welcome to VidyaMitra 🎓
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

            {/* GET STARTED */}
            <button
              className="btn"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                color: "#fff",
                padding: "10px 12px",
                minWidth: "140px",
                fontSize: "19px",
                fontWeight: "600",
                borderRadius: "50px",
                boxShadow:
                  "0 4px 10px rgba(99,102,241,0.22)",
                transition: "0.3s ease",
                whiteSpace: "nowrap",
              }}
              onClick={() => navigate("/login")}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0px)";
              }}
            >
              Get Started
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
              onClick={() => navigate("/about")}
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
              title: "Career Guidance",
              desc: "Discover the best career options based on your interests and skills.",
              icon: "🎯",
            },
            {
              title: "Roadmaps",
              desc: "Follow structured paths to achieve your goals.",
              icon: "🛣️",
            },
            {
              title: "Colleges",
              desc: "Explore top colleges and universities.",
              icon: "🏫",
            },
            {
              title: "Quiz",
              desc: "Test your knowledge and discover your strengths.",
              icon: "🧠",
            },
            {
              title: "Recommendations",
              desc: "Get personalized suggestions for your career path.",
              icon: "✨",
            },
            {
              title: "AI Mentor",
              desc: "Receive AI-powered guidance and career support.",
              icon: "🤖",
            },
          ].map((item, i) => (

            <div
              key={i}
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