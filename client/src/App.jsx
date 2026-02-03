import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Planner from "./pages/Planner";
import Progress from "./pages/Progress";
import "./index.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
