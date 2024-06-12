import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
const VisaStatusManagement = () => {
  const [inProgressEmployees, setInProgressEmployees] = useState([]);
  const [allVisaEmployees, setAllVisaEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInProgressEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/employees/visa/in-progress');
        setInProgressEmployees(response.data);
      } catch (error) {
        console.error('Error fetching in-progress employees:', error);
      }
    };

    const fetchAllVisaEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/employees/visa/all');
        setAllVisaEmployees(response.data);
      } catch (error) {
        console.error('Error fetching all visa employees:', error);
      }
    };

    fetchInProgressEmployees();
    fetchAllVisaEmployees();
  }, []);

  const handleApproveDocument = async (employeeId, documentId) => {
    try {
      await axios.post('http://localhost:5000/api/users/employees/visa/approve', {
        employeeId,
        documentId,
        approve: true
      });
      // Refresh the list or show a success message
    } catch (error) {
      console.error('Error approving document:', error);
    }
  };

  const handleRejectDocument = async (employeeId, documentId, feedback) => {
    try {
      await axios.post('http://localhost:5000/api/users/employees/visa/approve', {
        employeeId,
        documentId,
        approve: false,
        feedback
      });
      // Refresh the list or show a success message
    } catch (error) {
      console.error('Error rejecting document:', error);
    }
  };

  const handleSendNotification = async (employeeId, message) => {
    try {
      await axios.post('http://localhost:5000/api/users/employees/visa/notify', {
        employeeId,
        message
      });
      // Optionally show a success message
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleDownloadDocument = async (url) => {
    // Implement file download logic here
  };

  const filteredEmployees = allVisaEmployees.filter(employee =>
    (employee.firstName && employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.lastName && employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.preferredName && employee.preferredName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="visa-status-container">
      <h1>Visa Status Management</h1>

      <h2>In Progress</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Work Authorization</th>
            <th>Number of Days Remaining</th>
            <th>Next Steps</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inProgressEmployees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>
                <div>{employee.visaTitle}</div>
                <div>{new Date(employee.visaStartDate).toLocaleDateString()} - {new Date(employee.visaEndDate).toLocaleDateString()}</div>
              </td>
              <td>{/* Calculate days remaining */}</td>
              <td>{/* Display next steps */}</td>
              <td>
                {employee.documents.map(doc => (
                  doc.status === 'Pending' && (
                    <div key={doc._id}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">View Document</a>
                      <button onClick={() => handleApproveDocument(employee._id, doc._id)}>Approve</button>
                      <button onClick={() => handleRejectDocument(employee._id, doc._id, 'Feedback')}>Reject</button>
                    </div>
                  )
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>All Employees</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Work Authorization</th>
            <th>Documents</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>
                <div>{employee.visaTitle}</div>
                <div>{new Date(employee.visaStartDate).toLocaleDateString()} - {new Date(employee.visaEndDate).toLocaleDateString()}</div>
              </td>
              <td>
                {employee.documents.length > 0 ? (
                  employee.documents.map(doc => (
                    <div key={doc._id}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">View Document</a>
                      <button onClick={() => handleDownloadDocument(doc.url)}>Download</button>
                    </div>
                  ))
                ) : (
                  <div>No documents uploaded</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisaStatusManagement;
