require('dotenv').config();
const API_BASE_URL = `${process.env.REACT_APP_API_URL}` /* || 'http://localhost:3001' */;
const token = localStorage.getItem("toDoListToken") || null;

export const login = async (user, password) => {
  const url = `${API_BASE_URL}/login`;
  
  const requisition = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      userName: user,
      password,
    }),
  });

  const APIresponse = await requisition.json();
  return APIresponse;
};

export const fetchAllTasks = async () => {
  try {
    const url = `${API_BASE_URL}/tasks`;
  
    const requisition = await fetch(url, {
      method: "GET",
      headers: new Headers({
        'Authorization': token,
        'Content-Type': 'application/json',
      }),
    });
    const APIresponse = await requisition.json();
    return APIresponse;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (status, task, _id) => {
  try {
    const url = `${API_BASE_URL}/tasks/${_id}`;
  
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
  } catch (error) {
    console.error(error);
  }
};

export const createNewTask = async (task, status) => {
  try {
    const url = `${API_BASE_URL}/tasks`;
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
  } catch (error) {
    console.error(error)
  }
};

export const removeTask = async (_id) => {
  try {
    const url = `${API_BASE_URL}/tasks/${_id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });
  } catch (error) {
    console.error(error)
  }
};