import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/Stat";

const API = "http://localhost:5000";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API}/dashboard`)
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="stats">
        <StatCard title="Total Subjects" value={stats.totalSubjects} />
        <StatCard title="Topics Completed" value={stats.completedTopics} />
        <StatCard title="Pending Topics" value={stats.pendingTopics} />
        <StatCard title="Study Hours" value={stats.studyHours} />
      </div>
    </DashboardLayout>
  );
}
