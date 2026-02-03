import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const API = "http://localhost:5000";

function Planner() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API}/planner`)
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const toggleTask = async (id) => {
    await fetch(`${API}/planner/${id}/toggle`, { method: "PATCH" });
    refresh();
  };

  const updateHours = async (id, hours) => {
    await fetch(`${API}/planner/${id}/hours`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hours })
    });
    refresh();
  };

  const refresh = () => {
    fetch(`${API}/planner`)
      .then(res => res.json())
      .then(setTasks);
  };

  return (
    <DashboardLayout>
      {tasks.length === 0 && <p>No planned tasks.</p>}

      {tasks.map(task => (
        <div key={task.id} className="planner-item">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
          />

          <span>
            {task.subject_name} — {task.topic_name}
          </span>

          <input
            type="number"
            min="0.5"
            step="0.5"
            value={task.hours}
            onChange={(e) =>
              updateHours(task.id, Number(e.target.value))
            }
          />

          <span>h</span>
        </div>
      ))}
    </DashboardLayout>
  );
}

export default Planner;
