import { Link, useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    const isLoggedIn = localStorage.getItem("vidya_user_logged_in");
    if (isLoggedIn === "true") {
      navigate("/quiz");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="about-page container py-5">
      <section className="about-hero card-glow">
        
        <h1 className="premium-hero-heading">Discover the smarter path from Quiz to Campus</h1>
        <p className="hero-copy">
          VidyaMitra unifies quiz-driven self-awareness, roadmap clarity, and college fit into one polished experience.
          Start with a quick career quiz, explore guided roadmaps, and translate your goals into the right college choices. Start your journey with quiz.
        </p>
        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={handleStartQuiz}>
            Start the Quiz
          </button>
        </div>
      </section>
       <section className="about-details card-glow">
        <div>
          <h2>Why VidyaMitra?</h2>
          <p>
            VidyaMitra is built like a modern SaaS platform for student success. We combine smart
            assessment, guided planning, and college discovery under a single polished interface,
            so every learner feels supported from the first quiz through the final decision.
          </p>
        </div>
        <div className="detail-highlights">
          
          <article>
            <strong>Actionable outcomes</strong>
            <p>Each session is built to move students from uncertainty to a confident next step.</p>
          </article>
          <article>
            <strong>Student-first flow</strong>
            <p>Quiz, roadmap, colleges — all connected in a way that mirrors how learners actually decide.</p>
          </article>
        </div>
      </section>
      <section className="about-grid">
        <article className="about-card">
          <div className="card-icon">🧠</div>
          <h2>Quiz Session</h2>
          <p>
            Our quiz session is the first step in building your personalized educational journey.
            It captures your interests, strengths, and ambitions through focused questions,
            then generates instant insights that feel tailored and actionable.
          </p>
          <ul>
            <li>Skill-based profiling in minutes</li>
            <li>Instant career alignment recommendations</li>
            <li>Clarity for students who are still exploring</li>
          </ul>
        </article>

        <article className="about-card">
          <div className="card-icon">🛣️</div>
          <h2>Roadmap Session</h2>
          <p>
            Our roadmap page turns quiz outcomes into a clear progression plan.
            Each roadmap is designed to show the next milestones, the right subjects,
            and how to prepare for the most promising career options.
          </p>
          <ul>
            <li>Visual learning pathways with milestones</li>
            <li>Industry-informed subject and skill focus</li>
            <li>Confidence to choose the next academic step</li>
          </ul>
        </article>

        <article className="about-card">
          <div className="card-icon">🏛️</div>
          <h2>Colleges</h2>
          <p>
            We bridge your roadmap to the best college matches available.
            Explore relevant institutions, compare options, and make decisions backed by practical insights,
            not guesswork.
          </p>
          <ul>
            <li>College insights aligned with your goals</li>
            <li>Programs, strengths, and campus outcomes</li>
            <li>Actionable next steps for admission readiness</li>
          </ul>
        </article>
      </section>

      
    </main>
  );
}

export default About;
