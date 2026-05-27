// App.jsx

import { Routes, Route } from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

function App() {
  return (
    <Routes>

      {/* HOME PAGE */}
      <Route path="/" element={<PublicHome />} />

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* REGISTER PAGE */}
      <Route path="/register" element={<Register />} />

      {/* ABOUT PAGE */}
      <Route path="/about" element={<About />} />

    </Routes>
  );
}

export default App;