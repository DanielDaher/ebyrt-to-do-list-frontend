import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import loginContext from '../../context/LoginContext';
require('dotenv').config();

export default function Register() {
  const { token } = useContext(loginContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showNewUser, setShowNewUser] = useState('');
  
  const createUser = async (event, { userName, password }) => {
    event.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/users` /* || 'http://localhost:3000/users/' */;
    
      const registerUser = await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      const registerInfo = await registerUser.json();
      setShowNewUser(registerInfo); 
    } catch (error) {
      console.error(error);
    }
  };

  const renderSubmitButton = () => (
    <button
    type="submit"
    className="register-button"
    onClick={(e) => createUser(e, { userName, password })}
    >
      Register
    </button>
  );

  const renderRegisterError = () => (
    <div>
      <p>{showNewUser}</p>
      <button type="reset" className="register-button" onClick={() => setShowNewUser('')} >OK</button>
    </div>
  );

  const showRegisterButtonOrError = () => (
    showNewUser === '' ? renderSubmitButton() : renderRegisterError()
  );

  return (
    <div>
      <form className="login-form">
        <Link to="/" className="register-return-button">
          <button className="form-button">Back</button>
          </Link>
        <label>
          Choose your username
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          Choose your password
          <input type="password" onChange={(e) => setPassword(e.target.value)}/>
        </label>
        {showRegisterButtonOrError()}
      </form>
    </div>
  );
};