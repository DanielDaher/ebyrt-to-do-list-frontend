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
    if (!localStorage.getItem('toDoListToken')) return history.push('/')
    getTasksFromAPI();
  }, [history]);

  const deleteTokenFromLocalStorageAndRedirect = () => {
    // window.location.href = window.origin;
    history.push('/');
    localStorage.removeItem('toDoListToken');
  };

  const GetBoardsContent = () => {
    const boardTitles = ['Pending', 'In Progress', 'Concluded'];
    return (
      <div className="boards-content">
        {boardTitles.map((title, index) => (
          <div className='board' key={index}>
            <div className='title-box'>
              <h3>{title}</h3>
            </div>
            <div className='tasks-box'>
              <RenderTask taskStatus={title}/>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tasks-page-content">
      <button
        className="logout-button"
        onClick={() => deleteTokenFromLocalStorageAndRedirect()}
        >
          Logout
      </button>
      <FormAddTask />
      <Filters/>
      <GetBoardsContent />
    </div>
  );
};