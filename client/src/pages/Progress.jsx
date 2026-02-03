import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Stat from "../components/Stat";

const API = "http://localhost:5000";

function Progress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/progress`)
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch progress:", err);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>

      {loading && <p>Loading progress...</p>}

      {!loading && progress && progress.total_tasks === 0 && (
        <p>No study activity yet. Plan topics to see progress.</p>
      )}

      {!loading && progress && progress.total_tasks > 0 && (
        <div className="progress-grid">
          <Stat title="Total Tasks" value={progress.total_tasks} />
          <Stat title="Completed Tasks" value={progress.completed_tasks} />
          <Stat title="Pending Tasks" value={progress.pending_tasks} />

          <Stat title="Total Hours" value={progress.total_hours} />
          <Stat title="Completed Hours" value={progress.completed_hours} />
          <Stat title="Pending Hours" value={progress.pending_hours} />

          <Stat title="Progress" value={`${progress.progress_percentage}%`} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Progress;
