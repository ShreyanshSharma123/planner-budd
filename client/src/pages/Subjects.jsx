import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SubjectCard from "../components/SubjectCard";
import AddSubjectModal from "../components/AddSubjectModal";
import AddTopicModal from "../components/AddTopicModal";

const API="http://localhost:5000";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  const fetchSubjects = async () => {
    const res = await fetch(`${API}/subjects`);
    const data = await res.json();
    console.log(data);
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // SUBJECT OPERATIONS

  // Add Subject
  const addSubject = async (name) => {
    await fetch(`${API}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    fetchSubjects();
  };

  // delete Subject

  const deleteSubject = async (subjectId) => {
    await fetch(`${API}/subjects/${subjectId}`, {
      method: "DELETE"
    });
    fetchSubjects();
  };

  // add Topic

  const addTopic = async (topicName) => {
    if (!activeSubjectId) return;

    await fetch(`${API}/topics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectId: activeSubjectId,
        name: topicName
      })
    });

    fetchSubjects();
  };

  // delete Topic

   const deleteTopic = async (subjectId, topicId) => {
    await fetch(`${API}/topics/${topicId}`, {
      method: "DELETE"
    });

    fetchSubjects();
  };

  // edit Topic 

   const editTopic = async (subjectId, topicId, newName) => {
    await fetch(`${API}/topics/${topicId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    });

    fetchSubjects();
  };
  return (
    <DashboardLayout>
      <div className="page-header">
        <button
          className="addButtonClass"
          onClick={() => setShowSubjectModal(true)}
        >
          + Add Subject
        </button>
      </div>

      <div className="subjects-grid">
        {subjects.map(sub => (
          <SubjectCard
            key={sub.id}
            subject={sub}
            onAddTopic={() => {
              setActiveSubjectId(sub.id);
              setShowTopicModal(true);
            }}
            onDeleteTopic={deleteTopic}
            onEditTopic={editTopic}
            deleteSubject={deleteSubject}
          />
        ))}
      </div>

      {showSubjectModal && (
        <AddSubjectModal
          onAdd={addSubject}
          onClose={() => setShowSubjectModal(false)}
        />
      )}

      {showTopicModal && (
        <AddTopicModal
          onAdd={addTopic}
          onClose={() => setShowTopicModal(false)}
        />
      )}
    </DashboardLayout>
  );
}

export default Subjects;
