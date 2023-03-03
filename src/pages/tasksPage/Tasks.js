import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import loginContext from '../../context/LoginContext';
import '../../css/Tasks.css'; 
import Filters from './components/Filters';
import FormAddTask from './components/FormAddTask';
import RenderTask from './components/RenderTask';

export default function Tasks(props) {
  const { getAllTasks } = useContext(loginContext);
  const fetchTasks = useRef(getAllTasks);
  const history = useHistory();

  const getTasksFromAPI = async () => {
    await fetchTasks.current();
  };

  useEffect(() => {
    console.log('useEffect');
    getTasksFromAPI();
  }, []);

  const deleteTokenFromLocalStorageAndRedirect = () => {
    // window.location.href = window.origin;
    history.push('/');
    localStorage.removeItem('toDoListToken');
  };

  return (
    <div className="tasks-content">
      <button
        className="logout-button"
        onClick={() => deleteTokenFromLocalStorageAndRedirect()}
        >
          Logout
      </button>
      <FormAddTask />
      <Filters/>
      <div className="boards-content">
        <div className="first-board">
          <h3>Pending</h3>
          <RenderTask taskStatus='Pending'/>
        </div>
        <div className="second-board">
          <h3>In progress</h3>
          <RenderTask taskStatus='In Progress'/>
        </div>
        <div className="third-board">
          <h3>Concluded</h3>
          <RenderTask taskStatus='Concluded'/>
        </div>
      </div>
    </div>
  );
};