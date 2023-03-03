import React, { useContext, useState } from 'react';
import '../../../css/FormAddTask.css'; 
import loginContext from '../../../context/LoginContext';

export default function FormAddTask() {
  const [newTask, setNewTask] = useState('');
  const { addTask } = useContext(loginContext);

  const addNewTask = (e) => {
    e.preventDefault();
    const infoTask = {
      task: newTask,
      status: 'Pending',
    };

    addTask(infoTask);
    setNewTask('');
  };

  return (
    <form className="add-task-form">
      <input
        type="text"
        placeholder="add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit" onClick={(e) => addNewTask(e)}>+</button>
    </form>
  );
};