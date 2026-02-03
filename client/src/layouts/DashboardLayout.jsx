import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
export default function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
