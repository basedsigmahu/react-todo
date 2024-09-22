import React from 'react';

function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className="allmain">
      <div className="all">
        {tasks.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-dsp">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{`Important: ${task.isImportant ? 'Yes' : 'No'}`}</p>
              <p>{`Status: ${task.status}`}</p>
              <button onClick={() => onEdit(index)} className="edit-btn">Edit</button>
              <button onClick={() => onDelete(index)} className="delete-btn">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
