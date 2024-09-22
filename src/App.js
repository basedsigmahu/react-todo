import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]); // Store all tasks
  const [editMode, setEditMode] = useState(false); // Track whether we are in edit mode
  const [editTaskIndex, setEditTaskIndex] = useState(null); // Track the index of the task being edited
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [filter, setFilter] = useState('all'); // Track which filter tab is active

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasksData', JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding or editing a task
  const handleAddOrEditTask = (newTask) => {
    if (editMode) {
      const updatedTasks = [...tasks];
      updatedTasks[editTaskIndex] = newTask;
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setEditMode(false);
    setEditTaskIndex(null);
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Filter tasks based on active filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'important') return task.isImportant;
    return true;
  });

  return (
    <div id="wrapper">
      <div className="container">
        <div className="txt">To-Do List</div>
        <hr />
        <button className="create-task" onClick={() => setShowModal(true)}>Create Task</button>
        <hr />

        {/* Tabs */}
        <div className="state-of-task">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'important' ? 'active' : ''} onClick={() => setFilter('important')}>Important</button>
          <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>

        {/* Task List */}
        <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} onEdit={(index) => {
          setEditMode(true);
          setEditTaskIndex(index);
          setShowModal(true);
        }} />

        {/* Modal Form */}
        {showModal && <TaskForm onSubmit={handleAddOrEditTask} closeModal={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default App;
