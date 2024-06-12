import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const form = useRef();
  const emailRegex = /^[A-Z0-9._%+-]+@chuwa\.com$/i; // Corrected regex

  const sendEmail = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setMessage('Invalid email format. Email must be in the format xxxx@chuwa.com');
      return; // Prevent sending request if email is invalid
    }

    // Send email using emailjs
    /** 
    emailjs
      .sendForm('service_bq2o2e6', 'template_4slsifk', form.current, {
        publicKey: 'nQPG1A_vi033X5N9g',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
*/
    // Send user registration data to the backend
    
    
    axios
      .post('http://localhost:5000/api/users/register', { email, username, password })
      .then((response) => {
        setMessage(response.data.message);
        navigate('/'); // Redirect to login page on successful registration
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    if (!token) {
      setMessage('Invalid or missing token.');
    }
  }, [location]);

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {message && <p className="error-message">{message}</p>}
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
