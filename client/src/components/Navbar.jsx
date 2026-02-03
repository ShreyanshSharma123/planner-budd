import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("subjects")) return "Subjects";
    if (location.pathname.includes("planner")) return "Study Planner";
    if (location.pathname.includes("progress")) return "Progress";
  };

  return (
    <div className="navbar">
      <h3>{getTitle()}</h3>
      <div className="profile">👤</div>
    </div>
  );
}

export default Navbar;
