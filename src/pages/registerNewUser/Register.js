import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerNewUser } from "../../helpers/api";

require('dotenv').config();

export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showNewUser, setShowNewUser] = useState('');
  const [loading, setLoading] = useState(false);
  
  const createUser = async (event, { userName, password }) => {
    event.preventDefault();
    setLoading(true);
    try {
      const registerInfo = await registerNewUser(userName, password);
      setShowNewUser(registerInfo); 
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
        {loading && <p>Loading...</p>}
        {showRegisterButtonOrError()}
      </form>
    </div>
  );
};