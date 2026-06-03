export const roadmapsData = [
  {
    id: "engineering",
    title: "Engineering",
    category: "Technology",
    education: "After Intermediate",
    icon: "⚙️",
    difficulty: "Hard",
    duration: "4 Years (B.Tech)",
    salary: "₹4L - ₹25L+ LPA",
    demand: "Very High",
    description: "Explore the core engineering fields like CSE, ECE, Mechanical, Civil, and more to design and build future technologies.",
    overview: {
      field: "Engineering is the application of science and mathematics to solve real-world problems. It involves designing, building, and testing structures, machines, software, and systems.",
      suitable: "Students with strong analytical skills, mathematical aptitude, logical reasoning, and a passion for technology and innovation.",
      opportunities: "Software Engineer, Electronics Engineer, Mechanical Consultant, Structural Designer, Research Analyst, Tech Lead.",
      scope: "The demand for skilled engineering professionals is constantly expanding with the rise of smart infrastructure, automation, and technological advancements worldwide."
    },
    steps: [
      { id: 1, title: "Choose Stream", desc: "Select MPC (Maths, Physics, Chemistry) in Intermediate / 11th-12th." },
      { id: 2, title: "Entrance Preparation", desc: "Prepare for engineering entrance exams like JEE Main, JEE Advanced, or state exams (e.g., EAMCET)." },
      { id: 3, title: "Acquire Fundamentals", desc: "Focus on strong basic understanding of calculus, physics mechanics, and introductory programming." },
      { id: 4, title: "Earn Engineering Degree", desc: "Enroll in B.Tech / B.E in a preferred branch (CSE, ECE, ME, Civil) and maintain a good CGPA." },
      { id: 5, title: "Acquire Specializations", desc: "Choose a niche (Cloud Computing, Robotics, VLSI design) and build projects to stand out." },
      { id: 6, title: "Internship & Exposure", desc: "Complete at least one technical internship to understand standard industry workflows." },
      { id: 7, title: "Placement & Jobs", desc: "Prepare for campus placements by polishing coding skills, aptitude tests, and interview habits." }
    ],
    skills: [
      { name: "Mathematics & Analytical Logic", level: "Expert", pct: 90, tools: "Calculus, Linear Algebra, Statistics" },
      { name: "Programming Foundations", level: "Intermediate", pct: 75, tools: "Python, C++, Java" },
      { name: "System Design & Physics", level: "Expert", pct: 85, tools: "CAD, Simulations, Circuit Modeling" },
      { name: "Problem Solving", level: "Expert", pct: 95, tools: "Data Structures & Algorithms" }
    ],
    exams: [
      { name: "JEE Main & Advanced", purpose: "National level entry to premier institutes like IITs, NITs, and IIITs.", eligibility: "Intermediate (MPC) with 75% marks aggregate.", tips: "Consistent practice, solve previous year papers, master mock tests." },
      { name: "AP/TS EAMCET", purpose: "State-level entry into government and top private engineering colleges.", eligibility: "Intermediate with MPC stream.", tips: "Focus on textbook concepts, speed calculation, and basic formulas." }
    ],
    salaryInsights: { fresher: "₹3.6 - ₹6.5 LPA", mid: "₹8 - ₹15 LPA", senior: "₹18 - ₹40L+ LPA", abroad: "High demand in USA, Germany, UK ($80k - $140k+)" },
    resources: [
      { type: "YouTube", name: "Gate Smashers", link: "#", cost: "Free" },
      { type: "Course", name: "NPTEL Technical Lectures", link: "#", cost: "Free" },
      { type: "Practice", name: "GeeksforGeeks Coding", link: "#", cost: "Free" }
    ],
    journey: ["10th Grade", "MPC Stream (Inter)", "JEE/EAMCET Exam", "B.Tech Graduation", "Internship", "Design Engineer"],
    tips: [
      "Keep your fundamental mathematical logic sharp.",
      "Work on interactive, team-based practical projects starting from 2nd year.",
      "Avoid focusing only on theoretical exams; practical skills are what secure recruiters."
    ]
  },
  {
    id: "medicine",
    title: "Medicine (MBBS)",
    category: "Medical",
    education: "After Intermediate",
    icon: "🩺",
    difficulty: "Very Hard",
    duration: "5.5 Years",
    salary: "₹6L - ₹35L+ LPA",
    demand: "Exceptional",
    description: "Dedicate yourself to human healthcare. Qualify via NEET to become a certified doctor, physician, or specialist surgeon.",
    overview: {
      field: "Medicine is the science and practice of caring for patients, managing the diagnosis, prognosis, prevention, treatment, or palliation of their injury or disease.",
      suitable: "Highly dedicated students with high empathy, strong memory capabilities, emotional resilience, and deep interest in biology.",
      opportunities: "General Physician, Surgeon, Cardiologist, Pediatrician, Medical Consultant, Researcher.",
      scope: "With expanding global populations and healthcare awareness, medical expertise is always in extremely high demand, yielding great social value."
    },
    steps: [
      { id: 1, title: "Choose Stream", desc: "Select BiPC (Biology, Physics, Chemistry) in Intermediate / 11th-12th." },
      { id: 2, title: "NEET Preparation", desc: "Prepare heavily for the highly competitive National Eligibility cum Entrance Test (NEET-UG)." },
      { id: 3, title: "Secure MBBS Seat", desc: "Qualify in counseling to gain admission into an accredited Medical College." },
      { id: 4, title: "Pre-Clinical Studies", desc: "Master basic human sciences: Anatomy, Physiology, and Biochemistry." },
      { id: 5, title: "Clinical Rotations", desc: "Work in medical wards under professor guidelines, studying Pharmacology, Pathology, and Surgery." },
      { id: 6, title: "Compulsory Internship", desc: "Complete a 1-year mandatory rotatory internship in standard hospital settings." },
      { id: 7, title: "Post-Graduation (MD/MS)", desc: "Clear NEET-PG to specialize in fields like Pediatrics, Cardiology, or Orthopedics." }
    ],
    skills: [
      { name: "Human Anatomy & Biology", level: "Expert", pct: 95, tools: "Surgical Tools, Diagnostics, Anatomy Models" },
      { name: "Diagnostic Ability", level: "Expert", pct: 90, tools: "MRI, CT Scans, Lab Analysis" },
      { name: "Empathy & Communication", level: "Expert", pct: 95, tools: "Patient Counseling, Interpersonal Skills" },
      { name: "Resilience & Focus", level: "Expert", pct: 90, tools: "Long Shifts, Critical Decisions" }
    ],
    exams: [
      { name: "NEET UG", purpose: "Single national entrance exam for MBBS, BDS, and AYUSH seats across India.", eligibility: "Intermediate with BiPC, minimum 50% marks.", tips: "Thorough study of NCERT textbooks, extensive biology preparation, practice time management." }
    ],
    salaryInsights: { fresher: "₹6 - ₹9 LPA", mid: "₹12 - ₹20 LPA", senior: "₹24 - ₹50L+ LPA", abroad: "Very High demand. Requires passing local exams (USMLE for USA, PLAB for UK)." },
    resources: [
      { type: "YouTube", name: "Osmosis Medical Education", link: "#", cost: "Free" },
      { type: "Course", name: "Prepladder / Marrow PG Prep", link: "#", cost: "Paid" }
    ],
    journey: ["10th Grade", "BiPC Stream (Inter)", "NEET UG Exam", "MBBS College", "1-Year Rotatory Internship", "MD/MS Specialization"],
    tips: [
      "NCERT textbooks should be your absolute guide during NEET preparation.",
      "Develop healthy stress management routines early; medical studies demand emotional balance.",
      "Focus intensely on practical patient diagnostics during clinical rotations."
    ]
  },
  {
    id: "diploma",
    title: "Diploma (General)",
    category: "After 10th",
    education: "After 10th",
    icon: "📜",
    difficulty: "Medium",
    duration: "3 Years",
    salary: "₹2L - ₹6L LPA",
    demand: "High",
    description: "Get early professional technical training in non-engineering streams like design, commercial practice, or secretarial jobs.",
    overview: {
      field: "General diploma programs offer highly practical, skill-focused career courses immediately after secondary school, bypassing standard intermediate schooling.",
      suitable: "Students wishing to enter the workforce quickly or gain specialized professional certificates in practical and commercial domains.",
      opportunities: "Draftsman, Account Executive, Associate Designer, Assistant Manager, Support Technician.",
      scope: "Enables immediate employment opportunities in public and private commercial houses, with simple vertical pathways to higher degrees."
    },
    steps: [
      { id: 1, title: "Clear 10th Class", desc: "Pass SSC/10th class with decent grades, particularly in mathematics and English." },
      { id: 2, title: "Choose Niche", desc: "Select a specialized course such as Office Management, Commercial Practice, Fashion, or Interior Design." },
      { id: 3, title: "Enroll in Polytechnic", desc: "Apply via state admission boards or counseling portals into recognized institutes." },
      { id: 4, title: "Acquire Fundamentals", desc: "Focus heavily on real-world vocational skills and basic administration concepts." },
      { id: 5, title: "Practical Workshops", desc: "Participate in intensive labs, model building, and drafting practices." },
      { id: 6, title: "Industry Project", desc: "Complete a practical, hands-on graduation project in your final semester." },
      { id: 7, title: "Join Workforce", desc: "Enter companies as skilled junior associates or apply for graduation lateral entry." }
    ],
    skills: [
      { name: "Drafting & Planning", level: "Expert", pct: 85, tools: "AutoCAD, Sketchup" },
      { name: "Office Administration", level: "Intermediate", pct: 80, tools: "MS Office Suite, ERP Software" },
      { name: "Creative Aesthetics", level: "Intermediate", pct: 75, tools: "Aesthetics, Color Theory, Designing" }
    ],
    exams: [
      { name: "State Diploma Entrance", purpose: "State level counseling based on 10th board percentages or specific entrance rankings.", eligibility: "Completed 10th standard.", tips: "Strong hold on high-school basic mathematics and communication skill set." }
    ],
    salaryInsights: { fresher: "₹1.8 - ₹3 LPA", mid: "₹4 - ₹6 LPA", senior: "₹7 - ₹10 LPA", abroad: "Moderate opportunities in Gulf countries and industrial zones." },
    resources: [
      { type: "Course", name: "Swayam Vocational Courses", link: "#", cost: "Free" }
    ],
    journey: ["10th Grade", "Diploma Admission", "Niche Selection", "Practical Workshops", "Final Year Design Project", "Associate Job"],
    tips: [
      "Keep computer literacy skills and communication levels highly polished.",
      "Perform regular industrial site visits to observe actual professionals in action.",
      "Consider lateral engineering entry (B.Tech 2nd year) if you decide to pursue a degree later."
    ]
  },
  {
    id: "polytechnic",
    title: "Polytechnic",
    category: "After 10th",
    education: "After 10th",
    icon: "🔧",
    difficulty: "Medium",
    duration: "3 Years",
    salary: "₹2.2L - ₹7L LPA",
    demand: "High",
    description: "Enter technical and engineering domains right after 10th. Highly practical curriculum focused on junior engineer roles.",
    overview: {
      field: "Polytechnic diplomas offer technical training in core engineering streams. They produce highly skilled technicians and junior engineers with heavy lab exposure.",
      suitable: "Practical, hands-on thinkers who prefer mechanics, circuits, coding, or drawing over long theoretical studies.",
      opportunities: "Junior Engineer (JE), Lab Assistant, CAD Designer, Maintenance Engineer, Technical Contractor.",
      scope: "Massive public sector (Railways, BHEL, SSC JE) and private manufacturing opportunities with excellent lateral entry scopes."
    },
    steps: [
      { id: 1, title: "Pass 10th Grade", desc: "Complete secondary school with good marks in Mathematics, Science, and English." },
      { id: 2, title: "Clear POLYCET", desc: "Prepare for and qualify in the state-level Polytechnic Common Entrance Test." },
      { id: 3, title: "Branch Selection", desc: "Opt for Mechanical, Electrical, Civil, or Computer Science branch during counseling." },
      { id: 4, title: "Lab & Practical Study", desc: "Focus deeply on machinery labs, circuit configurations, and basic electronics." },
      { id: 5, title: "Industrial Training", desc: "Complete mandatory industrial training in your final semesters." },
      { id: 6, title: "Clear ECET (Optional)", desc: "If planning B.Tech, prepare for Engineering Common Entrance Test for direct 2nd-year entry." },
      { id: 7, title: "Join PSU / Corporates", desc: "Crack Junior Engineering recruitment exams or join private production industries." }
    ],
    skills: [
      { name: "Equipment & Lab Testing", level: "Expert", pct: 90, tools: "Multimeters, Lathe Machines, Testing Kits" },
      { name: "Technical Drawing", level: "Intermediate", pct: 80, tools: "CAD, Isometric Drawings" },
      { name: "Equipment Troubleshooting", level: "Expert", pct: 85, tools: "Machine Wiring, Circuit Diagnosis" }
    ],
    exams: [
      { name: "POLYCET", purpose: "Entrance into government-aided polytechnic colleges.", eligibility: "Passed 10th grade.", tips: "Solve high school physics, algebra, and chemistry problems." },
      { name: "ECET", purpose: "Lateral entry into B.Tech program (2nd year).", eligibility: "Passed Diploma with 45%+ marks.", tips: "Master the technical core subjects learned during your 3-year diploma." }
    ],
    salaryInsights: { fresher: "₹2.2 - ₹3.5 LPA", mid: "₹4.5 - ₹7 LPA", senior: "₹8 - ₹12 LPA", abroad: "High demand in Canada, Australia, and Middle East for skilled technicians." },
    resources: [
      { type: "YouTube", name: "Learn Engineering", link: "#", cost: "Free" }
    ],
    journey: ["10th Grade", "POLYCET Exam", "Diploma (Mechanical/EEE/ECE)", "Industrial Training", "ECET Lateral Entry", "Junior Engineer"],
    tips: [
      "Take your college laboratory assignments seriously; they form your real resume.",
      "PSU jobs require clearing written technical tests, so keep your core engineering notes secure.",
      "Lateral entry into B.Tech is an outstanding way to complete engineering with lesser expense."
    ]
  },
  {
    id: "govt-jobs",
    title: "Government Jobs",
    category: "Government Jobs",
    education: "After 10th / Intermediate",
    icon: "🏛️",
    difficulty: "Hard",
    duration: "1 - 3 Years Prep",
    salary: "₹3L - ₹15L LPA",
    demand: "Extremely High",
    description: "Secure a prestigious career in public administration, railways, SSC, banking, or state boards with security and authority.",
    overview: {
      field: "Government Jobs represent career pathways in civil services, railways, banking, state administration, and defense, offering high security and social prestige.",
      suitable: "Highly disciplined students with strong general knowledge, numerical aptitude, persistence, and service-oriented mindsets.",
      opportunities: "Administrative Officer, Railway Associate, Junior Clerk, Bank PO, Police Sub-Inspector.",
      scope: "Extremely stable careers. Selection is highly competitive, requiring excellent planning and solid test preparation."
    },
    steps: [
      { id: 1, title: "Analyze Eligibility", desc: "Identify government openings corresponding to 10th, Intermediate, or graduation qualifications." },
      { id: 2, title: "Understand Exam Patterns", desc: "Review syllabus for competitive exams (SSC, UPSC, RRB, IBPS)." },
      { id: 3, title: "Quantitative & Logic Prep", desc: "Master numerical ability, analytical reasoning, and basic english grammar." },
      { id: 4, title: "General Studies & GK", desc: "Develop daily newspaper habits, focusing on national news and historical milestones." },
      { id: 5, title: "Mock Exams Routine", desc: "Take daily practice tests to improve speed and overall accuracy levels." },
      { id: 6, title: "Clear Phase 1 & 2 Tests", desc: "Qualify in prelims, mains, and physical tests as mandated by the board." },
      { id: 7, title: "Interview & Onboarding", desc: "Clear interviews, verify original documents, and receive posting letters." }
    ],
    skills: [
      { name: "Quantitative Aptitude", level: "Expert", pct: 90, tools: "Arithmetic, Data Interpretation" },
      { name: "General Awareness", level: "Expert", pct: 85, tools: "Current Affairs, History, Civics" },
      { name: "Analytical Reasoning", level: "Expert", pct: 90, tools: "Logical Deduction, Puzzles" }
    ],
    exams: [
      { name: "SSC CHSL / MTS", purpose: "Recruitment to secondary and intermediate levels in union ministries.", eligibility: "10th / Intermediate.", tips: "Master basic arithmetic and practice high-speed online typing." },
      { name: "UPSC Civil Services", purpose: "Top administrative roles like IAS, IPS, IFS.", eligibility: "Any Graduation Degree.", tips: "Deep reading, write structured essays, follow political developments globally." }
    ],
    salaryInsights: { fresher: "₹3 - ₹5.5 LPA", mid: "₹7 - ₹12 LPA", senior: "₹14 - ₹25L+ LPA", abroad: "Very limited (restricted to foreign services or embassies)." },
    resources: [
      { type: "YouTube", name: "WiFi Study / Adda247", link: "#", cost: "Free" },
      { type: "App", name: "Testbook Exam Prep", link: "#", cost: "Free/Paid" }
    ],
    journey: ["10th / Inter", "Exam Target Selection", "Daily GK & Quant Prep", "SSC / Railway Exams", "Prelims & Mains", "Government Employee"],
    tips: [
      "Select exams based on your core strength (e.g., IBPS for math fans, SSC for GK fans).",
      "Do not isolate yourself; keep backup private-sector career options in mind.",
      "Speed and accuracy are the decider elements; give at least 50 mock papers before the real test."
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    category: "Technology",
    education: "After Intermediate",
    icon: "💻",
    difficulty: "Medium",
    duration: "6 - 12 Months Prep",
    salary: "₹5L - ₹30L+ LPA",
    demand: "Very High",
    description: "Master frontend and backend engineering. Build complete responsive web applications using JavaScript, Node.js, and databases.",
    overview: {
      field: "Full Stack Development involves designing and building the complete visual interface (frontend) and logic/database layers (backend) of web applications.",
      suitable: "Individuals who love programming, problem-solving, building visual products, and continuous technical learning.",
      opportunities: "Frontend Developer, Backend Engineer, Full Stack Web Developer, Solutions Architect.",
      scope: "Software-as-a-Service (SaaS) and digital applications are skyrocketing, creating massive global recruitment pipelines for web engineers."
    },
    steps: [
      { id: 1, title: "Frontend Basics", desc: "Learn HTML5, CSS3, and modern CSS frameworks like Tailwind CSS." },
      { id: 2, title: "JavaScript Mastery", desc: "Master ES6+ fundamentals: DOM manipulation, asynchronous programming, and APIs." },
      { id: 3, title: "Component Framework", desc: "Learn React.js, focusing on state management, hooks, and single-page routing." },
      { id: 4, title: "Backend Foundations", desc: "Learn Node.js and Express to build clean RESTful APIs and handle requests." },
      { id: 5, title: "Databases & Storage", desc: "Understand relational (PostgreSQL) and non-relational (MongoDB) database systems." },
      { id: 6, title: "DevOps & Deployment", desc: "Deploy your applications on platforms like Vercel, Netlify, and Render." },
      { id: 7, title: "Portfolio & Job Hunt", desc: "Publish complete projects on GitHub and prepare for coding interviews." }
    ],
    skills: [
      { name: "Frontend Development", level: "Expert", pct: 90, tools: "React, Tailwind, HTML/CSS" },
      { name: "Backend Logic", level: "Expert", pct: 85, tools: "Node.js, Express, REST APIs" },
      { name: "Databases", level: "Intermediate", pct: 80, tools: "MongoDB, PostgreSQL, Mongoose" },
      { name: "Git & Deployment", level: "Intermediate", pct: 85, tools: "GitHub, Vercel, Docker" }
    ],
    exams: [
      { name: "Industry Certifications", purpose: "Demonstrate practical competency to global recruiters.", eligibility: "Open to anyone.", tips: "Complete certified professional projects from AWS, Meta, or freeCodeCamp." }
    ],
    salaryInsights: { fresher: "₹4.5 - ₹7.5 LPA", mid: "₹9 - ₹18 LPA", senior: "₹20 - ₹45L+ LPA", abroad: "Very High. Remote freelance ($50 - $120/hr) or abroad roles ($90k - $160k)" },
    resources: [
      { type: "YouTube", name: "freeCodeCamp.org", link: "https://www.youtube.com/c/freecodecamp", cost: "Free" },
      { type: "Course", name: "Full Stack Open (University of Helsinki)", link: "#", cost: "Free" },
      { type: "Practice", name: "Frontend Mentor", link: "#", cost: "Free" }
    ],
    journey: ["10th / Inter", "Web Basics (HTML/CSS/JS)", "React Framework", "Node.js & Express APIs", "Full Stack Portfolio", "Software Engineer"],
    tips: [
      "Do not just watch tutorials; write code daily and host it live.",
      "Build a strong personal portfolio featuring at least 3 unique, functional web applications.",
      "Focus deeply on database indexing and secure user authentication setups."
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    category: "Technology",
    education: "After Intermediate",
    icon: "🤖",
    difficulty: "Hard",
    duration: "1 - 2 Years Prep",
    salary: "₹6L - ₹40L+ LPA",
    demand: "Exceptional",
    description: "Build the future of intelligence. Learn Python, statistics, neural networks, and deep learning algorithms to construct smart models.",
    overview: {
      field: "AI & Machine Learning focuses on creating smart algorithms and neural models that learn patterns from large datasets and automate decisions.",
      suitable: "Analytical thinkers with a strong passion for complex mathematical algorithms, data analysis, and programming.",
      opportunities: "Machine Learning Engineer, AI Scientist, NLP Engineer, computer vision specialist.",
      scope: "AI is reshaping industries globally, creating a massive wave of high-paying opportunities for specialized AI developers."
    },
    steps: [
      { id: 1, title: "Learn Python", desc: "Master Python programming along with fundamental libraries: NumPy, Pandas." },
      { id: 2, title: "Math & Statistics", desc: "Master linear algebra, multivariate calculus, probability distributions, and statistics." },
      { id: 3, title: "Data Visualization", desc: "Learn data cleaning, pre-processing, and visualization tools like Matplotlib." },
      { id: 4, title: "Core ML Algorithms", desc: "Master regression, decision trees, random forests, and vector machines using Scikit-Learn." },
      { id: 5, title: "Deep Learning Intro", desc: "Learn Artificial Neural Networks, CNNs, and recurrent networks." },
      { id: 6, title: "Framework Mastery", desc: "Build advanced computer vision or language models using PyTorch or TensorFlow." },
      { id: 7, title: "Model Deployment", desc: "Deploy models via Flask / FastAPIs, and configure them on AWS/GCP cloud platforms." }
    ],
    skills: [
      { name: "Python Coding", level: "Expert", pct: 95, tools: "NumPy, Pandas, Python" },
      { name: "Mathematics & Stats", level: "Expert", pct: 90, tools: "Linear Algebra, Probability" },
      { name: "Deep Learning Frameworks", level: "Expert", pct: 85, tools: "PyTorch, TensorFlow, Keras" },
      { name: "MLOps", level: "Intermediate", pct: 75, tools: "MLflow, AWS SageMaker" }
    ],
    exams: [
      { name: "TensorFlow certification", purpose: "Validate expert developer capabilities in deep learning models.", eligibility: "Open to anyone.", tips: "Complete advanced tensor math and build functional image classification sets." }
    ],
    salaryInsights: { fresher: "₹6 - ₹9 LPA", mid: "₹12 - ₹22 LPA", senior: "₹25 - ₹55L+ LPA", abroad: "Highest paying technology branch internationally ($110k - $200k+)" },
    resources: [
      { type: "YouTube", name: "Sentdex Python ML", link: "#", cost: "Free" },
      { type: "Course", name: "Machine Learning by Andrew Ng", link: "#", cost: "Free" }
    ],
    journey: ["MPC / inter", "Python & Pandas", "Statistics & Linear Algebra", "Supervised ML Models", "Deep Learning / PyTorch", "AI Specialist"],
    tips: [
      "Mathematical intuition is highly critical; do not skip linear algebra.",
      "Publish your research work or share interactive ML models on platforms like Kaggle and Hugging Face.",
      "Start by learning basic machine learning algorithms before diving into deep neural networks."
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    category: "Technology",
    education: "After Intermediate",
    icon: "🛡️",
    difficulty: "Hard",
    duration: "8 - 18 Months Prep",
    salary: "₹4.5L - ₹28L+ LPA",
    demand: "Very High",
    description: "Defend computer networks and systems. Master ethical hacking, cryptography, security protocols, and secure cloud networking.",
    overview: {
      field: "Cybersecurity involves shielding computing infrastructure, web services, and user credentials from malicious hacking networks and data breaches.",
      suitable: "Logical problem solvers with persistent attention to detail and a strong interest in understanding operating systems and network protocols.",
      opportunities: "Ethical Hacker, Security Analyst, Penetration Tester, Chief Information Security Officer (CISO).",
      scope: "As corporate networks expand digitally, securing sensitive data has become a board-level priority globally, creating immense demand."
    },
    steps: [
      { id: 1, title: "Networking Core", desc: "Understand OSI models, subnets, DNS, TCP/IP protocols, and modern network topologies." },
      { id: 2, title: "Operating Systems", desc: "Master Linux command line, system administration, and basic Windows scripting." },
      { id: 3, title: "Fundamentals of Security", desc: "Learn symmetric/asymmetric cryptography, firewalls, and network vulnerability tools." },
      { id: 4, title: "Vulnerability Scanning", desc: "Master security assessment tools like Wireshark, Nmap, Metasploit, and Nessus." },
      { id: 5, title: "Ethical Hacking Practice", desc: "Practice penetration testing challenges on mock target boxes (TryHackMe, HackTheBox)." },
      { id: 6, title: "Acquire Certifications", desc: "Earn globally recognized certifications like CompTIA Security+ or CEH." },
      { id: 7, title: "Incident Management", desc: "Learn security monitoring (SIEM tools) and secure infrastructure design strategies." }
    ],
    skills: [
      { name: "Computer Networking", level: "Expert", pct: 90, tools: "TCP/IP, Wireshark, Nmap" },
      { name: "Penetration Testing", level: "Expert", pct: 85, tools: "Metasploit, Burp Suite, Kali Linux" },
      { name: "Linux Administration", level: "Expert", pct: 85, tools: "Bash Scripting, SSH, Firewalls" }
    ],
    exams: [
      { name: "CompTIA Security+", purpose: "Entry-level benchmark certification for cybersecurity professionals.", eligibility: "Open to anyone.", tips: "Study network defense protocols and practice answering scenario-based questions." },
      { name: "CEH (Certified Ethical Hacker)", purpose: "Demonstrate professional knowledge of scanning and defense techniques.", eligibility: "Open to anyone.", tips: "Practice tools in local virtual labs; thoroughly study scanning theory." }
    ],
    salaryInsights: { fresher: "₹4 - ₹6.5 LPA", mid: "₹9 - ₹16 LPA", senior: "₹18 - ₹35L+ LPA", abroad: "High global demand, particularly in Europe, North America, and banking sectors." },
    resources: [
      { type: "YouTube", name: "NetworkChuck", link: "#", cost: "Free" },
      { type: "Practice", name: "PortSwigger Web Security Academy", link: "#", cost: "Free" }
    ],
    journey: ["10th / Inter", "Computer Networking", "Linux & Shell Operations", "Vulnerability Assessment", "TryHackMe / Security+", "Ethical Hacker"],
    tips: [
      "Start with computer networking basics; you cannot protect what you do not understand.",
      "Always practice ethical hacking only within authorized, sandboxed labs.",
      "Stay active in the local security community and contribute to open-source threat hunting."
    ]
  },
  {
    id: "datascience",
    title: "Data Science",
    category: "Technology",
    education: "After Intermediate",
    icon: "📊",
    difficulty: "Hard",
    duration: "1 - 1.5 Years Prep",
    salary: "₹5.5L - ₹35L+ LPA",
    demand: "Very High",
    description: "Extract insights from complex data. Learn Python, statistics, SQL, big data processing, and predictive analytics tools.",
    overview: {
      field: "Data Science blends statistics, programming, and domain knowledge to analyze complex datasets, build forecasting models, and drive business strategies.",
      suitable: "Logical thinkers who enjoy working with numbers, spotting hidden patterns, and telling compelling stories with data.",
      opportunities: "Data Scientist, Business Analyst, Data Engineer, Analytics Consultant.",
      scope: "Modern companies collect massive amounts of data daily, making data translation and predictive insights key to staying competitive."
    },
    steps: [
      { id: 1, title: "Programming Basics", desc: "Learn Python or R, focusing on data manipulation packages (Pandas, SQL queries)." },
      { id: 2, title: "Statistics Core", desc: "Master probability, hypothesis testing, regression analysis, and statistical distributions." },
      { id: 3, title: "Relational Queries", desc: "Master SQL databases to write complex, high-speed queries on large tables." },
      { id: 4, title: "Data Visualization", desc: "Learn how to build interactive dashboards using BI tools (PowerBI, Tableau) or libraries (Seaborn)." },
      { id: 5, title: "Machine Learning Basics", desc: "Master regression, classification, clustering, and evaluation metrics using Scikit-Learn." },
      { id: 6, title: "Big Data & Pipelines", desc: "Gain familiarity with big data systems (Spark, Hadoop) and cloud storage environments (AWS S3)." },
      { id: 7, title: "Portfolio Presentation", desc: "Build complete end-to-end data analytics projects and share your insights on GitHub or Medium." }
    ],
    skills: [
      { name: "SQL & Databases", level: "Expert", pct: 90, tools: "PostgreSQL, MySQL, BigQuery" },
      { name: "Data Manipulation", level: "Expert", pct: 90, tools: "Pandas, NumPy, Python" },
      { name: "Statistical Modeling", level: "Expert", pct: 85, tools: "SciPy, R, Statsmodels" },
      { name: "Data Visualization", level: "Expert", pct: 88, tools: "Tableau, PowerBI, Matplotlib" }
    ],
    exams: [
      { name: "IBM Data Science Certification", purpose: "Validate foundational industry competency in data science.", eligibility: "Open to anyone.", tips: "Complete the practical capstone project and master SQL query structures." }
    ],
    salaryInsights: { fresher: "₹5 - ₹8 LPA", mid: "₹10 - ₹18 LPA", senior: "₹20 - ₹45L+ LPA", abroad: "Very High. High demand across all major tech hubs globally ($95k - $160k)." },
    resources: [
      { type: "YouTube", name: "StatQuest with Josh Starmer", link: "#", cost: "Free" },
      { type: "Course", name: "Kaggle Micro-courses", link: "#", cost: "Free" }
    ],
    journey: ["10th / Inter", "Python & SQL Fundamentals", "Probability & Statistics", "Data Vis & Dashboards", "Predictive ML Modeling", "Data Scientist"],
    tips: [
      "Master SQL early; retrieving clean data is 70% of a data scientist's daily job.",
      "Focus heavily on business problem-solving, not just blindly running algorithms.",
      "Always communicate your data insights as simple, clear, and actionable business solutions."
    ]
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    category: "Creative Fields",
    education: "After Intermediate / Degree",
    icon: "🎨",
    difficulty: "Medium",
    duration: "6 - 9 Months Prep",
    salary: "₹4L - ₹20L LPA",
    demand: "High",
    description: "Design intuitive interfaces. Learn user research, interactive wireframing, high-fidelity UI design, and responsive prototyping.",
    overview: {
      field: "UI/UX Design involves designing the interface (UI) and studying the user behavior (UX) of digital products to ensure they are beautiful and intuitive to use.",
      suitable: "Creative problem solvers who love visual layouts, psychology, digital aesthetics, and mapping out user journeys.",
      opportunities: "UI Designer, UX Researcher, Product Designer, Interaction Architect.",
      scope: "Every digital product needs great design to succeed, keeping specialized designers in very high demand."
    },
    steps: [
      { id: 1, title: "Design Principles", desc: "Understand color theory, layout grids, visual hierarchy, typography, and contrast." },
      { id: 2, title: "Figma Mastery", desc: "Learn vector design, auto-layouts, component variants, and interactive prototyping in Figma." },
      { id: 3, title: "UX Research Basics", desc: "Conduct user interviews, create personas, map empathy paths, and analyze competitor layouts." },
      { id: 4, title: "Wireframes & Flows", desc: "Draw low-fidelity paper sketches and translate them into digital wireframes." },
      { id: 5, title: "Visual Design", desc: "Design high-fidelity interactive mockups for desktop and mobile screen sizes." },
      { id: 6, title: "Testing & Iteration", desc: "Conduct usability testing with real users and refine mockups based on feedback." },
      { id: 7, title: "UX Case Study", desc: "Write comprehensive UX case studies explaining your research, design, and choices." }
    ],
    skills: [
      { name: "Visual UI Design", level: "Expert", pct: 90, tools: "Figma, Adobe XD" },
      { name: "User Research & Flow", level: "Expert", pct: 85, tools: "User Surveys, Empathy Mapping" },
      { name: "Prototyping", level: "Expert", pct: 88, tools: "Figma Variables, Component States" }
    ],
    exams: [
      { name: "Google UX Professional Certificate", purpose: "Validate foundational UX design knowledge and build a design portfolio.", eligibility: "Open to anyone.", tips: "Complete all three unique portfolio projects diligently." }
    ],
    salaryInsights: { fresher: "₹3.5 - ₹6 LPA", mid: "₹7.5 - ₹13 LPA", senior: "₹15 - ₹28L+ LPA", abroad: "High demand. Remote freelance opportunities are highly lucrative ($40 - $90/hr)." },
    resources: [
      { type: "YouTube", name: "Figma Official Tutorials", link: "#", cost: "Free" },
      { type: "Course", name: "Interaction Design Foundation", link: "#", cost: "Paid" }
    ],
    journey: ["10th / Inter", "Design Core Concepts", "Figma Design Tool", "UX User Testing", "UX Case Studies Portfolio", "Product UI/UX Designer"],
    tips: [
      "Always design with the end-user's needs in mind, not just your personal preferences.",
      "Document your full design process in case studies; this is what gets you hired.",
      "Learn basic frontend coding (HTML/CSS) to collaborate better with developers."
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "Creative Fields",
    education: "After Intermediate / Degree",
    icon: "📈",
    difficulty: "Easy",
    duration: "4 - 8 Months Prep",
    salary: "₹3L - ₹15L LPA",
    demand: "High",
    description: "Grow businesses online. Master SEO, paid advertising campaigns, content marketing, analytics, and social media branding.",
    overview: {
      field: "Digital Marketing utilizes internet channels, social platforms, search engines, and email outreach to connect brands with active online audiences.",
      suitable: "Creative communicators with a strong interest in user psychology, content production, trends, and analytical tracking.",
      opportunities: "SEO Specialist, PPC Campaign Manager, Social Media Strategist, Digital Marketing Manager.",
      scope: "As offline marketing shifts entirely to digital channels, every brand relies on digital marketers to acquire new customers."
    },
    steps: [
      { id: 1, title: "Marketing Core", desc: "Understand customer profiles, marketing funnels (AIDA model), and basic branding rules." },
      { id: 2, title: "SEO (Search Engine Optimization)", desc: "Learn keyword research, on-page optimization, backlink strategies, and organic search ranking factors." },
      { id: 3, title: "Social Media Branding", desc: "Create content strategies, schedule posts, and drive user engagement on Instagram, LinkedIn, and YouTube." },
      { id: 4, title: "PPC & Advertising", desc: "Set up and run target ad campaigns using Google Ads and Meta Ads Manager." },
      { id: 5, title: "Analytics & Tracking", desc: "Configure tracking and read traffic data using Google Analytics 4 (GA4) and search consoles." },
      { id: 6, title: "Email Marketing", desc: "Write engaging email sequences and set up automations in tools like Mailchimp." },
      { id: 7, title: "Run Real Campaigns", desc: "Launch a personal project or manage marketing for a local business to gain real experience." }
    ],
    skills: [
      { name: "SEO Optimization", level: "Expert", pct: 88, tools: "Semrush, Ahrefs, Google Search Console" },
      { name: "Paid Ads Management", level: "Expert", pct: 85, tools: "Meta Ads, Google Ads Manager" },
      { name: "Copywriting & Content", level: "Expert", pct: 90, tools: "Canva, Copywriting, ChatGPT" },
      { name: "Analytics", level: "Intermediate", pct: 80, tools: "GA4, Excel, Looker Studio" }
    ],
    exams: [
      { name: "Google Analytics Certification", purpose: "Validate professional capability in web data tracking.", eligibility: "Open to anyone.", tips: "Complete Google's official analytics academy and practice dashboard building." }
    ],
    salaryInsights: { fresher: "₹2.5 - ₹4.5 LPA", mid: "₹6 - ₹10 LPA", senior: "₹12 - ₹22L+ LPA", abroad: "Very popular domain for digital nomad lifestyles and remote client contracts." },
    resources: [
      { type: "YouTube", name: "Neil Patel Marketing", link: "#", cost: "Free" },
      { type: "Course", name: "Google Digital Marketing E-learning", link: "#", cost: "Free" }
    ],
    journey: ["10th / Inter", "Marketing Funnels Core", "SEO & Blogging Concepts", "Run Mock Paid Campaigns", "Google Analytics Tracking", "Digital Marketer"],
    tips: [
      "Launch a personal blog or online shop to practice SEO and ads with a tiny budget.",
      "Marketing rules evolve rapidly; stay updated with the latest search engine algorithm changes.",
      "Base your campaigns on solid data rather than guesswork."
    ]
  },
  {
    id: "ca-cs",
    title: "Chartered Accountant (CA)",
    category: "Creative Fields",
    education: "After Intermediate",
    icon: "💼",
    difficulty: "Very Hard",
    duration: "4 - 5 Years",
    salary: "₹8L - ₹30L+ LPA",
    demand: "Very High",
    description: "Become a financial expert. Clear foundation, intermediate, and final exams while completing articleship in corporate finance.",
    overview: {
      field: "Chartered Accountancy represents the highest professional credential in auditing, financial auditing, commercial law, and corporate finance planning in India.",
      suitable: "Extremely detail-oriented, hard-working students with strong analytical skills and numerical accuracy.",
      opportunities: "Financial Auditor, Tax Consultant, Corporate Analyst, Chief Financial Officer (CFO).",
      scope: "With evolving corporate tax codes and expanding business markets, every enterprise requires CA expertise to maintain compliance."
    },
    steps: [
      { id: 1, title: "CA Foundation", desc: "Register with the ICAI and pass the Foundation exam covering accounting principles and mercantile law." },
      { id: 2, title: "CA Intermediate", desc: "Clear both groups of the intermediate syllabus: corporate taxes, cost management, and auditing." },
      { id: 3, title: "Articleship Registration", desc: "Complete mandatory 2-year practical training under a certified Chartered Accountant." },
      { id: 4, title: "Practical Exposure", desc: "Perform real-world corporate audits, file tax returns, and learn commercial compliance." },
      { id: 5, title: "CA Final Exams", desc: "Register for and pass the final exams, focusing on advanced auditing and corporate finance." },
      { id: 6, title: "ICAI Membership", desc: "Formally register as a member of the Institute of Chartered Accountants of India." },
      { id: 7, title: "Build Consultancy", desc: "Join top accounting firms, manage corporate finances, or launch your private practice." }
    ],
    skills: [
      { name: "Financial Accounting", level: "Expert", pct: 95, tools: "Tally Prime, Excel Sheets, Auditing Software" },
      { name: "Auditing & Control", level: "Expert", pct: 95, tools: "Statutory Audits, Risk Assessment" },
      { name: "Taxation & Legal Codes", level: "Expert", pct: 90, tools: "GST, Income Tax Filing, Companies Act" }
    ],
    exams: [
      { name: "ICAI CA Exams", purpose: "Professional qualification to audit accounts and certify finances in India.", eligibility: "Passed 12th standard (Commerce preferred).", tips: "Diligently complete the ICAI study material, practice writing answers, and master group scheduling." }
    ],
    salaryInsights: { fresher: "₹7.5 - ₹12 LPA", mid: "₹14 - ₹22 LPA", senior: "₹25 - ₹50L+ LPA", abroad: "Strong presence in Middle East, UK, and multinational firms." },
    resources: [
      { type: "Course", name: "ICAI Official E-study Materials", link: "#", cost: "Free" }
    ],
    journey: ["Inter (CEC/MEC)", "CA Foundation Exam", "CA Intermediate", "2-Year Practical Articleship", "CA Final Exams", "Chartered Accountant"],
    tips: [
      "Plan your daily study hours carefully; passing intermediate exams requires deep focus.",
      "Gain the maximum possible exposure to diverse business audits during your articleship.",
      "Stay updated on the latest financial rules and taxation amendments."
    ]
  },
  {
    id: "law",
    title: "Law (Integrated LLB)",
    category: "Creative Fields",
    education: "After Intermediate",
    icon: "⚖️",
    difficulty: "Hard",
    duration: "5 Years (BA/BBA LLB)",
    salary: "₹4L - ₹22L LPA",
    demand: "High",
    description: "Enter legal services. Qualify via CLAT to gain entry into national law schools. Choose corporate, civil, or criminal law.",
    overview: {
      field: "Law involves studying legal frameworks, drafting contracts, counseling clients, and litigating court disputes inside administrative structures.",
      suitable: "Critical thinkers with excellent reading habit, strong logical deduction, public speaking skills, and ethical passion.",
      opportunities: "Corporate Counsel, Litigation Lawyer, Legal Advisor, Judicial Officer, Mediator.",
      scope: "Diverse career options. Corporate law and legal consultancy are growing rapidly with expanding tech and business start-ups."
    },
    steps: [
      { id: 1, title: "Pass Intermediate", desc: "Complete 12th class in any stream with a focus on writing and logic skills." },
      { id: 2, title: "CLAT Preparation", desc: "Prepare heavily for CLAT, focusing on reading comprehension, logical puzzles, and legal reasoning." },
      { id: 3, title: "Integrated LLB Program", desc: "Enroll in a 5-year integrated course (e.g., BA LLB, BBA LLB) at a National Law University (NLU)." },
      { id: 4, title: "Moot Court Practice", desc: "Participate in college mock trials (moot courts) to hone drafting and litigation skills." },
      { id: 5, title: "Legal Internships", desc: "Intern with NGOs, corporate legal desks, and senior court advocates during vacations." },
      { id: 6, title: "Bar Council Registration", desc: "Pass the All India Bar Examination (AIBE) to receive a practicing license." },
      { id: 7, title: "Begin Practice", desc: "Join corporate law firms, start courtroom litigation, or prepare for judicial services exams." }
    ],
    skills: [
      { name: "Legal Drafting & Writing", level: "Expert", pct: 92, tools: "Legal Portals, Contract Databases" },
      { name: "Analytical Interpretation", level: "Expert", pct: 90, tools: "Case Law Research, Logic" },
      { name: "Public Communication", level: "Expert", pct: 88, tools: "Debating, Mooting, Mediation" }
    ],
    exams: [
      { name: "CLAT UG", purpose: "Entrance to prestigious National Law Universities (NLUs) in India.", eligibility: "Passed 12th grade with 45%+ marks.", tips: "Improve your reading speed and practice legal deduction challenges daily." }
    ],
    salaryInsights: { fresher: "₹3.5 - ₹7 LPA", mid: "₹8 - ₹15 LPA", senior: "₹18 - ₹35L+ LPA", abroad: "Requires clearing local bar exams (e.g., QLTS for UK, State Bar for USA)." },
    resources: [
      { type: "YouTube", name: "Legal Edge CLAT Prep", link: "#", cost: "Free" }
    ],
    journey: ["10th / Inter", "CLAT Exam Prep", "National Law School (NLU)", "Court & Firm Internships", "AIBE Exam License", "Practicing Advocate"],
    tips: [
      "Reading speed is highly critical; read newspapers and court summaries daily.",
      "Participate actively in moot courts to build courtroom confidence.",
      "Focus intensely on contract design and corporate law during your studies."
    ]
  },
  {
    id: "animation",
    title: "Animation & VFX",
    category: "Creative Fields",
    education: "After 10th / Intermediate",
    icon: "🎬",
    difficulty: "Medium",
    duration: "1 - 3 Years (Degree/Diploma)",
    salary: "₹2.5L - ₹12L LPA",
    demand: "High",
    description: "Design visual effects and animations. Master 3D modeling, lighting, character rigging, and high-fidelity video compositing.",
    overview: {
      field: "Animation & VFX involves creating moving visuals, 3D character assets, and special visual effects for movies, video games, and marketing campaigns.",
      suitable: "Highly creative visual artists who love digital art, photography, storytelling, and mastering advanced software suites.",
      opportunities: "3D Modeler, VFX Compositor, Character Rigger, Motion Graphics Designer, Lighting Artist.",
      scope: "The entertainment industry is growing rapidly, with massive expansion across OTT streaming, gaming, and commercial advertising."
    },
    steps: [
      { id: 1, title: "Visual Arts Core", desc: "Learn sketching, anatomy drawing, perspective, color palettes, and lighting basics." },
      { id: 2, title: "2D & Asset Design", desc: "Learn vector drawing, image manipulation, and asset editing in Photoshop and Illustrator." },
      { id: 3, title: "3D Modeling Basics", desc: "Learn to build objects and basic structural models in Blender or Maya." },
      { id: 4, title: "Character Rigging", desc: "Master skeletons and rigging configurations to enable smooth model movements." },
      { id: 5, title: "VFX Compositing", desc: "Learn greenscreen integration, keying, tracking, and compositing in After Effects or Nuke." },
      { id: 6, title: "Specialized Project", desc: "Choose a niche (e.g., lighting, character animation) and create a solid project." },
      { id: 7, title: "Professional Showreel", desc: "Compile a stunning, high-quality video showreel demonstrating your best work." }
    ],
    skills: [
      { name: "3D Asset Modeling", level: "Expert", pct: 90, tools: "Blender, Autodesk Maya" },
      { name: "VFX Compositing", level: "Expert", pct: 85, tools: "Foundry Nuke, After Effects" },
      { name: "Digital Painting", level: "Intermediate", pct: 80, tools: "Photoshop, Graphic Tablets" }
    ],
    exams: [
      { name: "Portfolio Evaluations", purpose: "Most design institutes and studios evaluate skills primarily via portfolio showreels.", eligibility: "Open to anyone.", tips: "Keep showreels short (under 2 minutes) and show only your absolute best, original works." }
    ],
    salaryInsights: { fresher: "₹2.4 - ₹4.2 LPA", mid: "₹5.5 - ₹9.5 LPA", senior: "₹12 - ₹20L+ LPA", abroad: "Very High in major VFX hubs like Canada, New Zealand, UK, and USA." },
    resources: [
      { type: "YouTube", name: "Blender Guru", link: "#", cost: "Free" }
    ],
    journey: ["10th / Inter", "Basic Sketching & Art", "Blender 3D Modeling", "Character Rigging & Motion", "VFX Compositing", "VFX / Lighting Artist"],
    tips: [
      "Your portfolio showreel is your real resume; ensure it showcases only your best work.",
      "Stay updated on the latest AI tools and real-time rendering systems like Unreal Engine.",
      "Master the foundations of lighting and camera movement to make your work look professional."
    ]
  },
  {
    id: "defense",
    title: "Defense Services (NDA)",
    category: "Defense",
    education: "After Intermediate",
    icon: "🎖️",
    difficulty: "Hard",
    duration: "4 Years (NDA Training)",
    salary: "₹7L - ₹24L LPA",
    demand: "High",
    description: "Serve the nation. Clear NDA entrance exams after intermediate MPC, qualify in SSB interview rounds, and join the Army, Navy, or Air Force.",
    overview: {
      field: "Defense Services represent officer commissions in the Indian Armed Forces (Army, Navy, Air Force) via NDA entry, offering a highly disciplined life of service.",
      suitable: "Patriotic, physically active students with strong leadership potential, emotional discipline, and high physical stamina.",
      opportunities: "Lieutenant, Flying Officer, Sub-Lieutenant, Squadron Leader, Captain.",
      scope: "Outstanding lifetime career with immense honor, job security, medical benefits, and leadership growth."
    },
    steps: [
      { id: 1, title: "Choose Stream", desc: "Opt for MPC (Maths, Physics, Chemistry) in Intermediate to keep Navy and Air Force eligibility open." },
      { id: 2, title: "NDA Written Prep", desc: "Master intermediate mathematics, high school general science, history, and English grammar." },
      { id: 3, title: "Pass NDA Exam", desc: "Clear the national written exam conducted by the UPSC." },
      { id: 4, title: "SSB Interview", desc: "Qualify in the challenging 5-day Service Selection Board (SSB) evaluation." },
      { id: 5, title: "Medical Fitness Test", desc: "Pass rigorous physical standards and medical checks defined by the military." },
      { id: 6, title: "NDA Cadet Training", desc: "Complete 3 years of rigorous military training at NDA Khadakwasla, Pune, alongside graduation." },
      { id: 7, title: "Commissioning", desc: "Complete 1-year training at IMA/AFA/INA to get formally commissioned as a Class-A Officer." }
    ],
    skills: [
      { name: "Physical Fitness & Stamina", level: "Expert", pct: 95, tools: "Daily Exercises, Obstacle Courses" },
      { name: "Leadership & Strategy", level: "Expert", pct: 92, tools: "Group Tasks, Public Speaking" },
      { name: "General Knowledge", level: "Expert", pct: 85, tools: "Current Affairs, Map Reading" }
    ],
    exams: [
      { name: "NDA Entrance Exam", purpose: "Officer level entry into Indian Armed Forces.", eligibility: "Passed 12th standard (MPC required for Navy/Air Force).", tips: "Solve intermediate math test sheets daily and maintain a healthy physical routine." }
    ],
    salaryInsights: { fresher: "₹7 - ₹10 LPA (Starting Basic Pay)", mid: "₹12 - ₹18 LPA", senior: "₹20 - ₹35L+ LPA", abroad: "Diplomatic posting opportunities in international military missions." },
    resources: [
      { type: "YouTube", name: "Major Kalshi Classes NDA Prep", link: "#", cost: "Free" }
    ],
    journey: ["10th Grade", "MPC Stream (Inter)", "UPSC NDA Written Exam", "5-Day SSB Interview", "Cadet Officer Training", "Armed Forces Lieutenant"],
    tips: [
      "Intermediate mathematics is crucial; solve calculus and algebra sheets daily.",
      "Work on your communication skills and confidence to clear the group activities in the SSB.",
      "Stay physically active and maintain good posture and fitness throughout your prep."
    ]
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    category: "Entrepreneurship",
    education: "Any Stream / Qualification",
    icon: "🚀",
    difficulty: "Very Hard",
    duration: "Ongoing",
    salary: "Unlimited Potential",
    demand: "Exceptional",
    description: "Launch your own venture. Learn product development, market validation, venture fundraising, scaling strategies, and business operations.",
    overview: {
      field: "Entrepreneurship involves identifying customer problems, designing unique solutions, launching ventures, raising capital, and scaling business models.",
      suitable: "Risk-tolerant, highly driven innovators with deep resilience, creative vision, and excellent leadership skills.",
      opportunities: "Founder, Chief Executive Officer (CEO), Startup Advisor, Angel Investor, Venture Capitalist.",
      scope: "High risk, high reward. Entrepreneurship drives global innovation, offering immense financial freedom and impact."
    },
    steps: [
      { id: 1, title: "Identify Problem", desc: "Observe real-world customer problems and conceptualize scalable solutions." },
      { id: 2, title: "Market Validation", desc: "Conduct surveys and build a Minimum Viable Product (MVP) to test customer interest." },
      { id: 3, title: "Business Strategy", desc: "Outline revenue streams, cost structures, and pricing models." },
      { id: 4, title: "Build Core Team", desc: "Partner with skilled co-founders who complement your skill set." },
      { id: 5, title: "Launch & Iterate", desc: "Introduce your MVP to target users and refine your product based on feedback." },
      { id: 6, title: "Fundraising & Scale", desc: "Pitch to angel investors or venture capital firms to secure scaling capital." },
      { id: 7, title: "System Operations", desc: "Build automated operations, establish corporate compliance, and scale marketing." }
    ],
    skills: [
      { name: "Business & Strategy", level: "Expert", pct: 90, tools: "Lean Canvas, Financial Models" },
      { name: "Product Design", level: "Intermediate", pct: 80, tools: "Wireframes, MVPs" },
      { name: "Pitching & Fundraising", level: "Expert", pct: 92, tools: "Investor Decks, Pitching" }
    ],
    exams: [
      { name: "Startup Incubators", purpose: "Secure mentorship and funding from premier startup programs.", eligibility: "Unique MVP with scalable business model.", tips: "Focus on presenting solid data, early user feedback, and market potential." }
    ],
    salaryInsights: { fresher: "Varies (Self-funded or tiny stipend)", mid: "₹10 - ₹20 LPA", senior: "₹30 - ₹100L+ LPA (Based on equity value)", abroad: "High global opportunities in tech hubs like Silicon Valley and Singapore." },
    resources: [
      { type: "YouTube", name: "Y Combinator Startup School", link: "https://www.youtube.com/@ycombinator", cost: "Free" }
    ],
    journey: ["10th / Inter", "Core Tech or Business Skill", "Problem Discovery", "MVP Development", "Team Building", "Scale Ventures"],
    tips: [
      "Start by solving a problem you have personally experienced.",
      "Build a simple product quickly to get real customer feedback.",
      "Prioritize profit margins and customer delight over excessive fundraising."
    ]
  }
];
