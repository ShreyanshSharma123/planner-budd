import { useState } from "react";

function AddTopicModal({ onAdd, onClose }) {
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
        <h3>Add Topic</h3>

        <input
          type="text"
          placeholder="Topic name"
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

export default AddTopicModal;
