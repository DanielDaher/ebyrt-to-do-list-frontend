import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from "../../../helpers/api";
import '../../../css/LoginForm.css';
require('dotenv').config();

export default function LoginForm(props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveTokenAndLocalStorage = (token) => {
    localStorage.setItem("toDoListToken", token);
  };

  const renderizeSubmitButton = () => {
    return (
      <button
        type="submit"
        className="form-button"
        onSubmit={(e) => makeLogin(e)} >
        Login
      </button>
    );
  };

  const showLoginError = () => {
    return (
      <div>
        <p className="login-error-message">{showError}</p>
        <button type="button"
        className="form-button"
        onClick={() => setShowError(false)}
        >
          OK
        </button>
      </div>
    );
  };

  const redirectToTasks = () => {
    setUser('');
    setPassword('');
    window.location.href = `${window.origin}/tasks`;
  };

  const makeLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const APIresponse = await login(user, password);
    setLoading(false);
    if (APIresponse.message) return setShowError(APIresponse.message);

    saveTokenAndLocalStorage(APIresponse.token);
    redirectToTasks();
  };

  return (
    <form className="login-form" onSubmit={(e) => makeLogin(e)}>
      <label>
        Username
        <input type="text" onChange={(e) => setUser(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      {loading && <p>Loading...</p>}
      {showError ? showLoginError() : renderizeSubmitButton()}
      <Link to="/register" className="login-form-redirect-link">
        <p>Not registered yet? Click here!</p>
      </Link>
    </form>
  );
};
