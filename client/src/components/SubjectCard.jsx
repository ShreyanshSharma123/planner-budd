import { useNavigate } from "react-router-dom";
import TopicItem from "./TopicItem";

const API = "http://localhost:5000";

export default function SubjectCard({
  subject,
  onAddTopic,
  onDeleteTopic,
  onEditTopic,
  deleteSubject,
}) {
  const navigate = useNavigate();
  // ➕ Add topic to planner (BACKEND)
  const addToPlanner = async (topic) => {
    await fetch(`${API}/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: topic.id,
        subjectId: subject.id,
        hours: 1,
      }),
    });
    navigate("/planner");
  };

  return (
    <div className="subject-card">
      <h3>{subject.name}</h3>

      <div className="topics-list">
        {subject.topics.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            onAddToPlanner={() => addToPlanner(topic)}
            onDelete={() => onDeleteTopic(subject.id, topic.id)}
            onEdit={(newName) => onEditTopic(subject.id, topic.id, newName)}
          />
        ))}
      </div>

      <div className="spacer">
        <button className="add-topic-btn" onClick={onAddTopic}>
          + Add Topic
        </button>

        <button
          className="delete-topic-btn"
          onClick={() => deleteSubject(subject.id)}
        >
          Remove Subject
        </button>
      </div>
    </div>
  );
}
