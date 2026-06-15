const mongoose = require("mongoose");
const Assessment = require("../models/Assessment");

// In-Memory store for offline bypass mode
const inMemoryAssessments = [];

// Heuristic analysis engine to match answers to career paths
const generateRecommendations = (educationLevel, answers) => {
  // Helper to find answer text for a keyword in the question
  const getAnswerForQuestionKeyword = (keyword) => {
    const pair = answers.find(a => a.questionText.toLowerCase().includes(keyword.toLowerCase()));
    return pair ? pair.answerText : "";
  };

  const recommendations = [];

  if (educationLevel === "10th Pass") {
    // 10th Pass Heuristics
    const enjoySubject = getAnswerForQuestionKeyword("subjects do you enjoy");
    const techComfort = getAnswerForQuestionKeyword("comfortable are you with technology");
    const weekendAct = getAnswerForQuestionKeyword("weekend activity");
    const goal = getAnswerForQuestionKeyword("biggest goal");

    if (enjoySubject.includes("Science") || techComfort.includes("Extremely") || weekendAct.includes("Coding")) {
      recommendations.push({
        careerId: "polytechnic",
        matchScore: 88,
        reasons: [
          "Strong affinity towards Science and Practical Experimentation",
          "High comfort level with technology and coding applications",
          "Prefers early hands-on technical skills and engineering foundations"
        ]
      });
      recommendations.push({
        careerId: "diploma",
        matchScore: 82,
        reasons: [
          "Good match for practical vocational training certificates",
          "Interest in technical commercial application fields"
        ]
      });
      recommendations.push({
        careerId: "govt-jobs",
        matchScore: 75,
        reasons: [
          "Stable early career opportunities in railways, defense or clerical setups",
          "Provides a highly structured public service roadmap"
        ]
      });
    } else if (enjoySubject.includes("Arts") || weekendAct.includes("Painting") || goal.includes("creativity")) {
      recommendations.push({
        careerId: "animation",
        matchScore: 89,
        reasons: [
          "Deep passion for creative expression, drawing, and storytelling",
          "Strong interest in digital design and visual weekend projects",
          "Goal of expressing creativity aligns with visual effects and animation studios"
        ]
      });
      recommendations.push({
        careerId: "diploma",
        matchScore: 81,
        reasons: [
          "Enjoys creative vocational fields like fashion, crafts or interior design",
          "Early access to professional commercial training"
        ]
      });
      recommendations.push({
        careerId: "uiux",
        matchScore: 76,
        reasons: [
          "Interest in digital arts can translate well to designing web/app layouts",
          "Aesthetic and logical combinations fit user interfaces"
        ]
      });
    } else {
      recommendations.push({
        careerId: "polytechnic",
        matchScore: 87,
        reasons: [
          "Strong foundation for entry into junior engineering levels",
          "Practical learning path fits hands-on curriculum requirements"
        ]
      });
      recommendations.push({
        careerId: "diploma",
        matchScore: 82,
        reasons: [
          "Provides direct industry placement and flexible career choices",
          "Structured commercial training prepares for quick entry into jobs"
        ]
      });
      recommendations.push({
        careerId: "govt-jobs",
        matchScore: 76,
        reasons: [
          "Goal of steady growth and job security aligns with administrative entries",
          "Good match for general competitive exam syllabi"
        ]
      });
    }
  } else if (educationLevel === "Inter MPC") {
    // Inter MPC Heuristics
    const enjoySubject = getAnswerForQuestionKeyword("subject do you enjoy");
    const triedCoding = getAnswerForQuestionKeyword("tried coding");
    const excitesActivity = getAnswerForQuestionKeyword("activity excites");
    const skillToDevelop = getAnswerForQuestionKeyword("skill would you like");
    const interestIndustry = getAnswerForQuestionKeyword("industries interest");

    if (triedCoding.includes("regularly") || triedCoding.includes("basic") || skillToDevelop.includes("Programming") || interestIndustry.includes("Information Technology")) {
      if (excitesActivity.includes("math/logic") || skillToDevelop.includes("Programming/AI")) {
        recommendations.push({
          careerId: "ai-ml",
          matchScore: 89,
          reasons: [
            "Loves solving complex math and statistical logic challenges",
            "Strong interest in advanced coding, neural models and AI technologies",
            "Aims for a cutting-edge technical career with high global impact"
          ]
        });
        recommendations.push({
          careerId: "fullstack",
          matchScore: 82,
          reasons: [
            "Good programming exposure and HTML/CSS web fundamentals",
            "Enjoys building visible software products and user services"
          ]
        });
        recommendations.push({
          careerId: "cybersecurity",
          matchScore: 75,
          reasons: [
            "Logical problem-solving and command line interest fit network safety role",
            "High industrial demand for protecting digital infrastructure"
          ]
        });
      } else {
        recommendations.push({
          careerId: "fullstack",
          matchScore: 88,
          reasons: [
            "Strong coding interest and active software development curiosity",
            "Prefers building end-to-end web applications and interfaces",
            "High global demand and remote work flexibility match goals"
          ]
        });
        recommendations.push({
          careerId: "cybersecurity",
          matchScore: 82,
          reasons: [
            "Enjoys operating systems, networking, and network safety concepts",
            "High affinity for security protocols and server configuration"
          ]
        });
        recommendations.push({
          careerId: "datascience",
          matchScore: 75,
          reasons: [
            "Enjoys writing SQL queries and parsing database models",
            "Good math logic fits data reporting and analytics roles"
          ]
        });
      }
    } else if (enjoySubject.includes("Physics") || excitesActivity.includes("circuits") || skillToDevelop.includes("Robotics")) {
      recommendations.push({
        careerId: "engineering",
        matchScore: 88,
        reasons: [
          "Enjoys core hardware systems, circuits, and physics mechanics",
          "Prefers physical design, modeling, or core manufacturing paths",
          "Strong analytical skills match technical engineering curricula"
        ]
      });
      recommendations.push({
        careerId: "ai-ml",
        matchScore: 82,
        reasons: [
          "Can apply core calculus/physics logic to modeling complex datasets",
          "Interest in smart automation and hardware robotics"
        ]
      });
      recommendations.push({
        careerId: "fullstack",
        matchScore: 75,
        reasons: [
          "Coding logic matches software implementation workflows",
          "Provides a fallback pathway to corporate consulting"
        ]
      });
    } else {
      recommendations.push({
        careerId: "engineering",
        matchScore: 88,
        reasons: [
          "Classic MPC career pathway with excellent higher study routes",
          "Provides structured academic training and campus placement opportunities"
        ]
      });
      recommendations.push({
        careerId: "fullstack",
        matchScore: 82,
        reasons: [
          "Excellent opportunities for computer science or coding transitions",
          "Good logical aptitude matches software engineering requirements"
        ]
      });
      recommendations.push({
        careerId: "cybersecurity",
        matchScore: 75,
        reasons: [
          "Solid match for network security, cloud storage, and server administration",
          "Vast job growth in corporate risk prevention sector"
        ]
      });
    }
  } else if (educationLevel === "Inter BiPC") {
    // Inter BiPC Heuristics
    const professionInterest = getAnswerForQuestionKeyword("profession interests you");
    const patientComfort = getAnswerForQuestionKeyword("interacting with patients");
    const environmentPrefer = getAnswerForQuestionKeyword("environment do you prefer");

    if (professionInterest.includes("Doctor") || patientComfort.includes("Highly") || environmentPrefer.includes("Hospitals")) {
      recommendations.push({
        careerId: "medicine",
        matchScore: 88,
        reasons: [
          "Deep passion for patient care, clinical medicine, and healing",
          "Comfortable with long shifts, social interactions, and clinical duties",
          "Willingness to invest multiple years in MBBS and PG specializations"
        ]
      });
      recommendations.push({
        careerId: "datascience",
        matchScore: 82,
        reasons: [
          "Can leverage medical interest for biotech research or healthcare informatics",
          "Strong science foundation fits analytical research projects"
        ]
      });
      recommendations.push({
        careerId: "govt-jobs",
        matchScore: 75,
        reasons: [
          "Option to enter medical services, public hospitals, or health departments",
          "Provides a stable career in medical governance"
        ]
      });
    } else {
      recommendations.push({
        careerId: "medicine",
        matchScore: 88,
        reasons: [
          "Solid foundation in biology, pharmacology, or research labs",
          "Willingness to support clinical trials or healthcare advisory"
        ]
      });
      recommendations.push({
        careerId: "datascience",
        matchScore: 82,
        reasons: [
          "Analytical data science fits research papers, genetics data, and analytics",
          "High demand for clinical analysts and pharma business planning"
        ]
      });
      recommendations.push({
        careerId: "govt-jobs",
        matchScore: 75,
        reasons: [
          "Strong match for state food inspector, public health, or botany/zoology roles",
          "Stable path with competitive benefits"
        ]
      });
    }
  } else {
    // Degree Student Heuristics
    const areaInterest = getAnswerForQuestionKeyword("area interests you");
    const possessedSkills = getAnswerForQuestionKeyword("skills do you currently");
    const careerPath = getAnswerForQuestionKeyword("career path are you considering");

    if (areaInterest.includes("Technology") || possessedSkills.includes("Technical") || careerPath.includes("Software")) {
      recommendations.push({
        careerId: "fullstack",
        matchScore: 88,
        reasons: [
          "Possesses existing technical and programming foundations",
          "Enjoys digital architectures, system design, and coding daily",
          "Prefers high-paying tech jobs or remote freelance flexibility"
        ]
      });
      recommendations.push({
        careerId: "ai-ml",
        matchScore: 82,
        reasons: [
          "Analytical logic matches advanced algorithm and statistics modeling",
          "High interest in model building, machine learning, and tech innovation"
        ]
      });
      recommendations.push({
        careerId: "cybersecurity",
        matchScore: 75,
        reasons: [
          "Strong match for cloud networking, threat scanning, and database defense",
          "Excellent salary growth in corporate network security roles"
        ]
      });
    } else if (careerPath.includes("Government")) {
      recommendations.push({
        careerId: "govt-jobs",
        matchScore: 88,
        reasons: [
          "Aims for public services, civil administrative posts, or banking sector",
          "Highly values lifetime security, social prestige, and public policy impact",
          "Disciplined preparation style fits competitive syllabus formats"
        ]
      });
      recommendations.push({
        careerId: "law",
        matchScore: 82,
        reasons: [
          "Logical deduction fits public sector legal entries or corporate advisory",
          "Strong communication and general studies skills align well"
        ]
      });
      recommendations.push({
        careerId: "ca-cs",
        matchScore: 75,
        reasons: [
          "Analytical audits match banking audits or state financial operations",
          "Details and law orientation fit audit services"
        ]
      });
    } else {
      recommendations.push({
        careerId: "digital-marketing",
        matchScore: 88,
        reasons: [
          "Enjoys user psychology, visual trends, and online social platforms",
          "Enjoys copywriting, branding campaigns, and SEO traffic tracking",
          "High flexibility matches remote work or agency models"
        ]
      });
      recommendations.push({
        careerId: "uiux",
        matchScore: 82,
        reasons: [
          "Great visual aesthetic combined with layout wireframing",
          "Interest in user research matches product design portfolios"
        ]
      });
      recommendations.push({
        careerId: "ca-cs",
        matchScore: 75,
        reasons: [
          "Good match for commerce, finance consulting, and corporate law compliance",
          "High growth potential in audit sectors"
        ]
      });
    }
  }

  return recommendations;
};

// POST /api/assessment/submit
exports.submitAssessment = async (req, res) => {
  try {
    console.log('Submit Assessment Request Body:', req.body);
    console.log('Submit Assessment Request User:', req.user);

    const userId = req.user?.id;
    const username = req.user?.username || req.user?.email || 'Unknown';
    const { educationLevel, answers } = req.body;

    if (!educationLevel || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Education level and answers are required" });
    }

    if (answers.length === 0) {
      return res.status(400).json({ message: "Answers array cannot be empty" });
    }

    const recommendations = generateRecommendations(educationLevel, answers);
    const isDbConnected = mongoose.connection.readyState === 1;

    const assessmentData = {
      userId,
      username,
      educationLevel,
      answers,
      recommendations,
      completedAt: new Date()
    };

    console.log('Calculated Scores: N/A - using heuristic rules');
    console.log('Career Matches:', recommendations);

    if (isDbConnected) {
      // Standard Database Mode
      const assessment = new Assessment(assessmentData);
      await assessment.save();
      console.log(`Saved assessment with analysis recommendations for ${username} to MongoDB.`);
    } else {
      // Temporary In-Memory Mode
      const assessmentWithMockId = {
        _id: `temp-a-${Date.now()}`,
        ...assessmentData
      };
      inMemoryAssessments.push(assessmentWithMockId);
      console.log(`[Bypass Mode] Temporarily saved assessment with analysis for user: ${username}`);
    }

    return res.status(201).json({
      message: "Assessment submitted successfully",
      completedAt: assessmentData.completedAt,
      recommendations
    });
  } catch (error) {
    console.error("Submit Assessment Error:", error);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/assessment/history
exports.getAssessmentHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Standard Database Mode
      const history = await Assessment.find({ userId }).sort({ completedAt: -1 });
      return res.status(200).json(history);
    } else {
      // Temporary In-Memory Mode
      console.log(`[Bypass Mode] Fetching history for user: ${userId}`);
      const userHistory = inMemoryAssessments
        .filter(a => a.userId === userId)
        .sort((a, b) => b.completedAt - a.completedAt);
      return res.status(200).json(userHistory);
    }
  } catch (error) {
    console.error("Get History Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
