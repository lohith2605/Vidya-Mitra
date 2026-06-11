import { Routes, Route } from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import PrivateHome from "./pages/PrivateHome";
import RoadmapsPage from "./pages/RoadmapsPage";
import QuizPage from "./pages/QuizPage";
import CareerGuidancePage from "./pages/CareerGuidancePage";
import Colleges from "./pages/Colleges";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>

      {/* HOME PAGE */}
      <Route path="/" element={<PublicHome />} />

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* REGISTER PAGE */}
      <Route path="/register" element={<Register />} />

      {/* PRIVATE DASHBOARD */}
      <Route path="/privatehome" element={<PrivateHome />} />

      {/* ROADMAPS PAGE */}
      <Route path="/roadmaps" element={<RoadmapsPage />} />

      {/* QUIZ PAGE */}
      <Route path="/quiz" element={<QuizPage />} />

      {/* CAREER GUIDANCE PAGE */}
      <Route path="/career-guidance" element={<CareerGuidancePage />} />

      {/* COLLEGES PAGE */}
      <Route path="/colleges" element={<Colleges />} />

      {/* ABOUT PAGE */}
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<AdminDashboard />} />

    </Routes>
  );
}

export default App;
