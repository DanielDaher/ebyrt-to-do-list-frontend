import React, { useContext, useState } from 'react';
import loginContext from '../../../context/LoginContext';

export default function RenderTask(props) {
  const { taskStatus } = props;
  const [newTask, setNewTask] = useState('');
  const { tasks, alphabeticalTasks, sortTasksByName, tasksByDate, sortTasksByDate, renderButtonsOptions, renderSelectAndOptions, editTask, setEditTask, updateTaskById } = useContext(loginContext);

  if (tasks === 'this user has no tasks yet!') return null;

  let filteredTasksByStatus = tasks.filter((task) => task.status === taskStatus);

  if (alphabeticalTasks) {
    filteredTasksByStatus = sortTasksByName(filteredTasksByStatus);
  };

  if (tasksByDate) {
    filteredTasksByStatus = sortTasksByDate(filteredTasksByStatus);
  }
  
  const saveNewTaskOnState = (value) => {
    setNewTask(value);
  };
  
  const sendNewTaskToUpdate = async (task) => {
    await updateTaskById(task.status, { ...task, task: newTask });
    setEditTask(false);
  };

  const renderInputEditTask = (task) => {
    return (
      <div key={task._id} className="each-task">
        <input
          type="text"
          placeholder={`${task.task}`}
          onChange={(e) => saveNewTaskOnState(e.target.value)}
        />
        <button
          type="button"
          onClick={() => sendNewTaskToUpdate(task)}
          >
            OK
        </button>
      </div>
    );
  };

  const renderTaskDiv = (task) => {
    return (
      <div key={task._id} className="each-task">
        {renderSelectAndOptions(task)}
        <p>
          {task.task}
        </p>
        {renderButtonsOptions(task)}
      </div>
    );
  };

  return (
    filteredTasksByStatus.map((task) => editTask === task._id ? renderInputEditTask(task) : renderTaskDiv(task))
  );
};