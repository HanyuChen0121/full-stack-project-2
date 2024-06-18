import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserEmail, setEmployeeData, resetState } from '../reducers/employeeSlice.js';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();

    axios
    .post('http://localhost:5000/api/users/login', { email, password })
    .then((response) => {
      if (response.data) {
        dispatch(resetState());
        setMessage(response.data.message);
      }
      if (response.data) {
        dispatch(updateUserEmail(email));
        dispatch(setEmployeeData(response.data.applicationData));
        if (response.data.applicationData.role === 'HR') {
          navigate('/EmployeeProfiles');
        } else {
          navigate('/Onboarding');
        } // Redirect to the dashboard or another protected route
      }
    })
    .catch((error) => {
      setMessage(error.response.data.message);
    });
};

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
