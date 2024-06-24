import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';

const EmployeeDocuments = () => {
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
      <h1>Employee Documents</h1>
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
            <th>OPT File</th>
            <th>OPT EAD File</th>
            <th>I-983 File</th>
            <th>I-20 File</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <Link to={`/document/${employee._id}`} target="_blank">
                    {employee.firstName} {employee.lastName}
                  </Link>
                </td>
                <td>{employee.ssn}</td>
                <td>{employee.workAuthorization}</td>
                <td>{employee.cellPhone}</td>
                <td>{employee.email}</td>
                <td>{employee.optFileName}</td>
                <td>{employee.optEadFileName}</td>
                <td>{employee.i983FileName}</td>
                <td>{employee.i20FileName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDocuments;
