import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

// Secure storage for tokens (replace with your preferred solution)
const secureStorage = window.localStorage; // Example using localStorage

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Check for existing token on initial render or refresh
  useEffect(() => {
    const token = secureStorage.getItem('token');
    if (token) {
      // Redirect to protected content if token is valid
       // Replace with your protected route
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement secure authentication logic here (replace with your API call)
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setErrorMessage('Invalid username or password');
      return;
    }

    const data = await response.json();
    const token = data.token; // Assuming successful login returns a token

    // Store token securely (e.g., encrypted local storage)
    secureStorage.setItem('token', token);

    // Redirect to protected content
    // Replace with your protected route
  };

  return (
    <div className="login-page">
      <h2>Employee Management Project 3</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;