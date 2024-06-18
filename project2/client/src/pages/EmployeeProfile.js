import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const updateApplicationStatus = async (status) => {
    if (status === 'Rejected' && !showFeedbackSection) {
      setShowFeedbackSection(true);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/users/employees/updateStatus`, {
        id,
        status,
        feedback: status === 'Rejected' ? feedback : undefined,
      });
      
      setStatusMessage(response.data.message);
      // Refresh employee data to reflect status update
      const updatedResponse = await axios.get(`http://localhost:5000/api/users/employees/${id}`);
      setEmployee(updatedResponse.data);
      setShowFeedbackSection(false);
      setFeedback('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    employee && (
      <div className="employee-profile">
        <h1>{employee.firstName} {employee.lastName}</h1>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>SSN:</strong> {employee.ssn}</p>
        <p><strong>Work Authorization:</strong> {employee.workAuthorization}</p>
        <p><strong>Phone:</strong> {employee.cellPhone}</p>
        <div className="actions">
          <button className="btn-approve" onClick={() => updateApplicationStatus('Approved')}>Approve</button>
          <button className="btn-reject" onClick={() => updateApplicationStatus('Rejected')}>Reject</button>
        </div>
        {showFeedbackSection && (
          <div className="feedback-section">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback for rejection"
            />
            <button className="btn-submit-feedback" onClick={() => updateApplicationStatus('Rejected')}>Submit Feedback</button>
          </div>
        )}
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    )
  );
};

export default EmployeeProfile;
