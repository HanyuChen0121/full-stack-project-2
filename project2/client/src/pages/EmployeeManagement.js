import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NameSection from './NameSection.js';
import AddressSection from './AddressSection.js';
import ContactInfoSection from './ContactInfoSection.js';
import EmploymentSection from './EmploymentSection.js';
import EmergencyContactSection from './EmergencyContactSection.js';
import DocumentsSection from './DocumentsSection.js';
import VisaStatus from './VisaStatus.js';
import WorkAuthorizationQuestion from './WorkAuthorizationQuestion.js';
import Reference from './Reference.js';
import { updateUserId } from '../reducers/employeeSlice.js';
import DocumentUploadPage from './DocumentUploadPage.js';
import '../index.css'; // Import the CSS file

function EmployeeManagement() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.employee);

  const handleSubmit = async () => {
    try {
      // Send the userData to the backend route '/saveData'
      const response = await fetch('http://localhost:5000/api/users/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: userData.email, userData}), // Send the userData object as JSON
      });

      if (response.ok) {
        console.log('Data saved successfully!');
        // Optionally, you can dispatch an action to indicate that data is saved
      } else {
        console.error('Failed to save data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="employee-management-container">
      <h1 className="section-title">OnBoarding application</h1>
      <NameSection className="section" />
      <AddressSection className="section" />
      <ContactInfoSection className="section" />
      <EmploymentSection className="section" />
      <EmergencyContactSection className="section" />
      <WorkAuthorizationQuestion className="section" />
      <DocumentsSection className="section" />
      <DocumentUploadPage className="section" />
      <VisaStatus className="section" />
      <Reference className="section" />
      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EmployeeManagement;
