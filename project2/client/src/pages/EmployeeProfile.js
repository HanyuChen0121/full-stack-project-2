import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    employee && (
      <div>
        <h1>{employee.firstName} {employee.lastName}</h1>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>SSN:</strong> {employee.ssn}</p>
        <p><strong>Work Authorization:</strong> {employee.workAuthorization}</p>
        <p><strong>Phone:</strong> {employee.cellPhone}</p>
        {/* Add more fields as needed */}
      </div>
    )
  );
};

export default EmployeeProfile;
