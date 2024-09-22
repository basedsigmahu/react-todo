import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, closeModal, editTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [status, setStatus] = useState('pending');

  // Load the task for editing if in edit mode
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setIsImportant(editTask.isImportant);
      setStatus(editTask.status);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }
    const task = { title, description, isImportant, status };
    onSubmit(task);
  };

  return (
    <div className="modal-main">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>&times;</button>
        <form onSubmit={handleSubmit}>
          <div className="error"></div>
          <p className="txt">Create a Task</p>
          <p>Enter Task Title</p>
          <input
            type="text"
            className="title"
            placeholder="Enter Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p>Enter Task Description</p>
          <textarea
            className="description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="checkbox-container">
            <label htmlFor="importantCheckbox" className="isImp">Important:</label>
            <input
              type="checkbox"
              id="importantCheckbox"
              checked={isImportant}
              onChange={() => setIsImportant(!isImportant)}
            />
          </div>
          <div className="dropdown">
            <label htmlFor="task-status">Status:</label>
            <select
              name="task-status"
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <input type="submit" className="submit-btn" value="Save Task" />
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
