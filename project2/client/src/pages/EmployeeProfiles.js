import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';
const EmployeeProfiles = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/employees');
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName} ${employee.preferredName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Employee Profiles</h1>
      <Link to="/VisaStatusManagement">Go to Visa Management</Link> {/* Link to Visa Management page */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p>Total Employees: {employees.length}</p>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SSN</th>
            <th>Work Authorization Title</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <Link to={`/profile/${employee._id}`} target="_blank">
                    {employee.firstName} {employee.lastName}
                  </Link>
                </td>
                <td>{employee.ssn}</td>
                <td>{employee.workAuthorization}</td>
                <td>{employee.cellPhone}</td>
                <td>{employee.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeProfiles;
