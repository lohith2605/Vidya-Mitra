// App.jsx

import { Routes, Route } from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import PrivateHome from "./pages/PrivateHome";

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

      {/* ABOUT PAGE */}
      <Route path="/about" element={<About />} />

    </Routes>
  );
}

export default App;