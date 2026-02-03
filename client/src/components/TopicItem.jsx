import { useState } from "react";

export default function TopicItem({ topic, onAddToPlanner, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(topic.name);

  return (
    <div className="topic-item">
      {/* NAME / INPUT */}
      {editing && (
        <input
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!name.trim()) return;
              onEdit(name.trim());
              setEditing(false);
            }

            if (e.key === "Escape") {
              setName(topic.name);
              setEditing(false);
            }
          }}
        />
      )}

      <div className="topic-left">
        <span className="topic-name">{topic.name}</span>
        <span
          className={`status-badge ${topic.done ? "completed" : "pending"}`}
        >
          {topic.done ? "Completed" : "Pending"}
        </span>
      </div>

      {/* STATUS (FROM BACKEND) */}
      <div className="topic-actions">
        <button title="Edit" onClick={() => setEditing(true)}>
          ✏️
        </button>
        <button title="Plan" onClick={onAddToPlanner}>
          ➕
        </button>
        <button title="Delete" onClick={onDelete}>
          ❌
        </button>
      </div>
    </div>
  );
}
