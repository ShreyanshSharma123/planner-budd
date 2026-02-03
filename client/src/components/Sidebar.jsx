import { Link } from 'react-router-dom';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Study Planner</h2>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/subjects">Subjects</Link>
        <Link to="/planner">Planner</Link>
        <Link to="/progress">Progress</Link>
      </div>
    </div>
  );
}
