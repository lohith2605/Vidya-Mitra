const mongoose = require("mongoose");
const Question = require("../models/Question");

// Predefined static list of questions for offline mode & database seeding
const defaultQuestions = [
  // 10th Pass Questions
  {
    level: "10th Pass",
    questionText: "Which subjects do you enjoy the most?",
    questionType: "choice",
    options: ["Science & Mathematics", "Social Studies & History", "Languages & Literature", "Arts & Drawing", "Computers & Technology"],
    category: "academic"
  },
  {
    level: "10th Pass",
    questionText: "What type of activities excite you the most?",
    questionType: "choice",
    options: ["Solving puzzles and riddles", "Building or fixing things", "Helping people or teaching", "Writing or speaking", "Designing or creating art"],
    category: "interest"
  },
  {
    level: "10th Pass",
    questionText: "Which environment would you enjoy working in?",
    questionType: "choice",
    options: ["A modern corporate office", "A laboratory or research facility", "Outdoors or traveling", "A creative studio or workshop", "A school or community center"],
    category: "environment"
  },
  {
    level: "10th Pass",
    questionText: "What is your biggest goal?",
    questionType: "choice",
    options: ["Earn a high salary", "Invent or discover something new", "Express my creativity", "Help society and people", "Run my own business"],
    category: "motivation"
  },
  {
    level: "10th Pass",
    questionText: "How do you prefer learning?",
    questionType: "choice",
    options: ["By doing experiments/practical work", "By reading books and articles", "By listening to lectures and discussions", "By working in groups", "By watching videos and animations"],
    category: "learning-style"
  },
  {
    level: "10th Pass",
    questionText: "Which statement describes you best?",
    questionType: "choice",
    options: ["I am logical and analytical", "I am empathetic and a good listener", "I am creative and imaginative", "I am organized and detail-oriented", "I am adventurous and hands-on"],
    category: "personality"
  },
  {
    level: "10th Pass",
    questionText: "How comfortable are you with technology?",
    questionType: "choice",
    options: ["Extremely comfortable (coding, tech-savvy)", "Moderately comfortable (using apps, browsing)", "Basic comfort (emails, typing)", "Prefer offline/hands-on activities"],
    category: "skill"
  },
  {
    level: "10th Pass",
    questionText: "Which of these would you choose for a weekend activity?",
    questionType: "choice",
    options: ["Coding or building a small project", "Reading a book or writing", "Volunteering for a social cause", "Painting, sketching, or listening to music", "Playing sports or outdoor activities"],
    category: "interest"
  },
  {
    level: "10th Pass",
    questionText: "Rate your communication skills.",
    questionType: "choice",
    options: ["Excellent (I speak and present confidently)", "Good (I can express myself clearly)", "Average (I prefer writing over speaking)", "Developing (I get nervous in public)"],
    category: "skill"
  },
  {
    level: "10th Pass",
    questionText: "If money and marks were not a concern, what career would you choose?",
    questionType: "text",
    options: [],
    category: "aspiration"
  },

  // Inter MPC Questions
  {
    level: "Inter MPC",
    questionText: "Which subject do you enjoy the most?",
    questionType: "choice",
    options: ["Mathematics", "Physics", "Chemistry", "All of the above"],
    category: "academic"
  },
  {
    level: "Inter MPC",
    questionText: "What kind of work sounds interesting?",
    questionType: "choice",
    options: ["Developing software/apps", "Designing machines/structures", "Chemical research/labs", "Data analysis & statistics", "Financial modeling & banking"],
    category: "interest"
  },
  {
    level: "Inter MPC",
    questionText: "Have you tried coding before?",
    questionType: "choice",
    options: ["Yes, I code regularly", "Yes, basic HTML/CSS/Python", "No, but I want to learn", "No, and I am not interested"],
    category: "experience"
  },
  {
    level: "Inter MPC",
    questionText: "Which activity excites you the most?",
    questionType: "choice",
    options: ["Solving complex math/logic problems", "Building circuits or mechanical parts", "Conducting lab experiments", "Trading, finance or business plans", "Graphic designing or UI design"],
    category: "interest"
  },
  {
    level: "Inter MPC",
    questionText: "What is your primary goal?",
    questionType: "choice",
    options: ["Software Engineer / Tech Lead", "Core Engineer (Mechanical/Civil/EEE)", "Data Scientist / AI Analyst", "Investment Banker / FinTech", "Research Scientist"],
    category: "motivation"
  },
  {
    level: "Inter MPC",
    questionText: "Are you willing to relocate?",
    questionType: "choice",
    options: ["Yes, anywhere globally", "Yes, within the country", "No, prefer staying local"],
    category: "preference"
  },
  {
    level: "Inter MPC",
    questionText: "How much do you enjoy problem-solving?",
    questionType: "choice",
    options: ["Love it, challenges excite me", "Enjoy it if I know the concepts", "Okay with basic problem-solving", "Prefer straightforward/structured tasks"],
    category: "personality"
  },
  {
    level: "Inter MPC",
    questionText: "Which skill would you like to develop?",
    questionType: "choice",
    options: ["Advanced Programming/AI", "Hardware Design/Robotics", "Statistical Analysis/ML", "Business Strategy/Finance", "Creative UI/UX Design"],
    category: "skill"
  },
  {
    level: "Inter MPC",
    questionText: "Which industries interest you?",
    questionType: "choice",
    options: ["Information Technology & Software", "Automobile & Aerospace", "Energy, Oil & Gas", "Banking, Financial Services & Insurance (BFSI)", "EdTech & Education"],
    category: "interest"
  },
  {
    level: "Inter MPC",
    questionText: "Where do you see yourself in 10 years?",
    questionType: "text",
    options: [],
    category: "aspiration"
  },

  // Inter BiPC Questions
  {
    level: "Inter BiPC",
    questionText: "Which subject do you enjoy most?",
    questionType: "choice",
    options: ["Biology (Botany/Zoology)", "Chemistry", "Physics", "English/Other subjects"],
    category: "academic"
  },
  {
    level: "Inter BiPC",
    questionText: "Why are you interested in Biology?",
    questionType: "choice",
    options: ["Fascinated by human anatomy and health", "Love animals and wildlife (veterinary)", "Interested in plants and agriculture", "Intrigued by genetics and biotechnology"],
    category: "interest"
  },
  {
    level: "Inter BiPC",
    questionText: "Which profession interests you?",
    questionType: "choice",
    options: ["Doctor (MBBS/BDS)", "Biotech / Genetic Researcher", "Pharmacist / Pharma R&D", "Physiotherapist / Allied Health", "Agriculture / Veterinary Scientist"],
    category: "aspiration"
  },
  {
    level: "Inter BiPC",
    questionText: "Are you comfortable interacting with patients?",
    questionType: "choice",
    options: ["Highly comfortable (empathetic & social)", "Comfortable, but prefer research/lab work", "Prefer working behind the scenes"],
    category: "preference"
  },
  {
    level: "Inter BiPC",
    questionText: "How willing are you to study for many years?",
    questionType: "choice",
    options: ["Willing to study 5-10+ years (MBBS + Specialization)", "Prefer a 3-4 year degree (B.Sc, B.Pharm)", "Prefer short diploma/vocational courses"],
    category: "preference"
  },
  {
    level: "Inter BiPC",
    questionText: "What motivates you?",
    questionType: "choice",
    options: ["Saving lives and healing people", "Scientific discovery and breakthrough", "Healthcare administration & business", "Ecology and conservation"],
    category: "motivation"
  },
  {
    level: "Inter BiPC",
    questionText: "Which environment do you prefer?",
    questionType: "choice",
    options: ["Hospitals & Clinics", "Research Laboratories", "Pharmaceutical Companies", "Fields, forests, or outdoor research centers"],
    category: "environment"
  },
  {
    level: "Inter BiPC",
    questionText: "Do you enjoy scientific research?",
    questionType: "choice",
    options: ["Yes, I like reading research papers", "Yes, doing hands-on experiments", "No, prefer direct clinical practice", "No, prefer business side of health"],
    category: "interest"
  },
  {
    level: "Inter BiPC",
    questionText: "What is your biggest challenge?",
    questionType: "choice",
    options: ["High academic stress", "Long duration of studies", "Lack of clinical exposure", "Financial constraints"],
    category: "challenge"
  },
  {
    level: "Inter BiPC",
    questionText: "What healthcare or science-related career attracts you the most?",
    questionType: "text",
    options: [],
    category: "aspiration"
  },

  // Degree Student Questions
  {
    level: "Degree Student",
    questionText: "What is your current degree?",
    questionType: "choice",
    options: ["B.Tech / B.E.", "B.Sc (Science/Computers)", "B.Com / BBA (Commerce/Business)", "BA / BFA (Arts/Humanities)"],
    category: "academic"
  },
  {
    level: "Degree Student",
    questionText: "Which skills do you currently possess?",
    questionType: "choice",
    options: ["Technical/Coding skills", "Analytical/Finance skills", "Creative/Writing/Design skills", "Management/Leadership skills"],
    category: "skill"
  },
  {
    level: "Degree Student",
    questionText: "What career path are you considering?",
    questionType: "choice",
    options: ["Software/Corporate Job", "Higher Studies (M.Tech/MS/MBA)", "Government Jobs / Civil Services", "Entrepreneurship / Startup"],
    category: "aspiration"
  },
  {
    level: "Degree Student",
    questionText: "Which area interests you most?",
    questionType: "choice",
    options: ["Technology & Software Development", "Business Management & Operations", "Marketing & Creative Arts", "Research & Academia"],
    category: "interest"
  },
  {
    level: "Degree Student",
    questionText: "How confident are you in your skills?",
    questionType: "choice",
    options: ["Highly confident", "Moderately confident (need practice)", "Beginner (need training)"],
    category: "personality"
  },
  {
    level: "Degree Student",
    questionText: "Have you completed any projects/internships?",
    questionType: "choice",
    options: ["Yes, multiple internships/projects", "Yes, academic projects only", "No, but actively looking", "No"],
    category: "experience"
  },
  {
    level: "Degree Student",
    questionText: "What is your preferred work style?",
    questionType: "choice",
    options: ["Remote / Work From Home", "In-office (collaborative)", "Hybrid model", "Freelancing / Self-employed"],
    category: "preference"
  },
  {
    level: "Degree Student",
    questionText: "What is your salary expectation after graduation?",
    questionType: "choice",
    options: ["Under 3 LPA", "3 - 6 LPA", "6 - 10 LPA", "10+ LPA"],
    category: "motivation"
  },
  {
    level: "Degree Student",
    questionText: "Which skills do you want to improve?",
    questionType: "choice",
    options: ["Technical & Coding", "Communication & Soft Skills", "Aptitude & Problem Solving", "Project Management"],
    category: "skill"
  },
  {
    level: "Degree Student",
    questionText: "Describe your dream career.",
    questionType: "text",
    options: [],
    category: "aspiration"
  }
];

// Helper to seed questions if MongoDB is online and empty
const seedQuestionsIfNeeded = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      const count = await Question.countDocuments();
      if (count === 0) {
        console.log("Question database empty. Seeding default questions...");
        await Question.insertMany(defaultQuestions);
        console.log("Successfully seeded 40 default questions!");
      }
    } catch (err) {
      console.error("Failed to seed questions:", err.message);
    }
  }
};

// Seed questions once on load if DB is ready
seedQuestionsIfNeeded();

// GET /api/questions/:level
exports.getQuestionsByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Normalize input level (handle spacing/casing issues)
    // Accept "10th Pass", "Inter MPC", "Inter BiPC", "Degree Student"
    let targetLevel = level;
    if (level.toLowerCase().includes("10")) targetLevel = "10th Pass";
    else if (level.toLowerCase().includes("mpc")) targetLevel = "Inter MPC";
    else if (level.toLowerCase().includes("bipc")) targetLevel = "Inter BiPC";
    else if (level.toLowerCase().includes("degree")) targetLevel = "Degree Student";

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Seed if empty before querying
      const count = await Question.countDocuments();
      if (count === 0) {
        await Question.insertMany(defaultQuestions);
      }
      
      const questions = await Question.find({ level: targetLevel });
      
      // If questions found, return them. Otherwise return static fallback for this level.
      if (questions && questions.length > 0) {
        return res.status(200).json(questions);
      }
    }

    // Offline / Fallback mode
    console.log(`[Bypass Mode] Serving questions for level: ${targetLevel}`);
    const filteredQuestions = defaultQuestions.filter(q => q.level === targetLevel);
    
    // Mimic database structure with temp IDs for frontend compatibility
    const responseData = filteredQuestions.map((q, idx) => ({
      _id: `temp-q-${targetLevel.replace(/\s+/g, "-")}-${idx}`,
      ...q
    }));

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Get Questions Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
