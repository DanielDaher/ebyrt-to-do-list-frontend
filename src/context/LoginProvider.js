import { useState } from 'react';
import LoginContext from './LoginContext';
require('dotenv').config();

export default function LoginProvider(props) {
  const token = localStorage.getItem("toDoListToken") || null;
  const [editTask, setEditTask] = useState(false);
  const [alphabeticalTasks, setAlphabeticalTasks] = useState(false);
  const [tasksByDate, setTasksByDate] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    console.log('getAllTasks');   
    try {
      const url = `${process.env.REACT_APP_API_URL}/tasks`/*  || 'http://localhost:3000/tasks' */;
    
      const requisition = await fetch(url, {
        method: "GET",
        headers: new Headers({
          'Authorization': token,
          'Content-Type': 'application/json',
        }),
      });
      const APIresponse = await requisition.json();
      setTasks(APIresponse);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskById = async (status, { task, _id }) => {
    if (status === 'Change status') return null;
    try {
      const url = `${process.env.REACT_APP_API_URL}/tasks/${_id}`/*  || `http://localhost:3000/tasks/${_id}` */;
    
      await fetch(url, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          task,
          status,
        }),
      });
      await getAllTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async ({ task, status }, getTasks) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tasks`/*  || 'http://localhost:3000/tasks/' */;
    
      await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          task,
          status,
        }),
      });
      await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const removeTaskById = async ({ _id }) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tasks/${_id}`/*  || `http://localhost:3000/tasks/${_id}` */;
    
      await fetch(url, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });
      await getAllTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const renderButtonsOptions = (task) => {
    return (
      <div>
        <button
        type="button"
        className="edit-button"
        onClick={() => setEditTask(task._id)}
        >
          Edit
        </button>
        <button
        type="button"
        className="remove-button"
        onClick={() => removeTaskById(task)}
        >
          X
        </button>
      </div>
    );
  };

  const renderSelectAndOptions = (task) => {
    return (
      <select onChange={(e) => updateTaskById(e.target.value, task)}>
        <option>Change status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Concluded">Concluded</option>
      </select>
    );
  };

  const sortTasksByName = (tasks) => tasks.sort((a, b) => {
    if (a.task < b.task) {
      return -1
    }
    if (a.task > b.task) {
      return 1;
    }
    return 0;
  });

  const sortTasksByDate = (tasks) => tasks.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  });

  const { children } = props;
  const contextValue = {
    token,
    renderButtonsOptions,
    renderSelectAndOptions,
    editTask,
    setEditTask,
    updateTaskById,
    addTask,
    tasks,
    setTasks,
    getAllTasks,
    alphabeticalTasks,
    setAlphabeticalTasks,
    sortTasksByName,
    tasksByDate,
    setTasksByDate,
    sortTasksByDate,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};