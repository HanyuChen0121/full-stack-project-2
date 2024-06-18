import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';

const EmployeeApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/employees'); // Adjust the endpoint as necessary
        setApplications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const renderApplicationsByStatus = (status) => {
    const filteredApplications = applications.filter(app => app.applicationStatus === status);

    return (
      <div>
        <h2>{status} Applications</h2>
        <table className="application-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Application Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app._id}>
                  <td>{app.email}</td>
                  <td>{app.firstName}</td>
                  <td>{app.applicationStatus}</td>
                  <td>
                    <Link to={`/profile/${app._id}`} target="_blank">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No {status.toLowerCase()} applications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="employee-applications">
      <h1>Employee Applications</h1>
      
      <div className="application-section">
        {renderApplicationsByStatus('Pending')}
        {renderApplicationsByStatus('Approved')}
        {renderApplicationsByStatus('Rejected')}
      </div>
    </div>
  );
};

export default EmployeeApplications;
