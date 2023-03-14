import React, { useContext, useEffect, useState } from 'react';
import loginContext from '../../../context/LoginContext';

export default function RenderTask(props) {
  const { taskStatus } = props;
  const [newTask, setNewTask] = useState('');
  const { tasks, alphabeticalTasks, sortTasksByName, tasksByDate, sortTasksByDate, renderButtonsOptions, renderSelectAndOptions, editTask, setEditTask, updateTaskById } = useContext(loginContext);

  useEffect(() => {
    if (tasks === 'this user has no tasks yet!') return;

    const getCurrentTask = () => {
      return tasks.find((task) => task._id === editTask);
    }
    const currentTask = getCurrentTask();

    if (!currentTask) return;
    saveNewTaskOnState(currentTask.task);
  }, [tasks, editTask])

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
          value={newTask}
          onChange={(e) => saveNewTaskOnState(e.target.value)}
        />
        <button
          type="button"
          className='ok-button'
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