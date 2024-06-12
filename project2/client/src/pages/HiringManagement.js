import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const HiringManagement = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Invalid email format. Email must be in the format xxxx@chuwa.com');
      return; // Prevent sending request if email is invalid
    }

    // Send email using emailjs
    emailjs
      .sendForm('service_bq2o2e6', 'template_4slsifk', form.current, {
        publicKey: 'nQPG1A_vi033X5N9g',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setMessage('Email sent successfully!');
          // Optionally, you can navigate to another page or show a success message
        },
        (error) => {
          console.log('FAILED...', error.text);
          setMessage('Failed to send email.');
        }
      );
  };

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
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HiringManagement;
