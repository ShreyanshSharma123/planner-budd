import { useState } from "react";

function AddSubjectModal({ onAdd, onClose }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    onAdd(name);
    setName("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Subject</h3>

        <input
          type="text"
          placeholder="Subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddSubjectModal;
