// EmployeeManagement.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NameSection from './NameSection.js';
import AddressSection from './AddressSection.js';
import ContactInfoSection from './ContactInfoSection.js';
import EmploymentSection from './EmploymentSection.js';
import EmergencyContactSection from './EmergencyContactSection.js';
import DocumentsSection from './DocumentsSection.js';
import VisaStatusManagement from './VisaStatusManagement.js';
import WorkAuthorizationQuestion from './WorkAuthorizationQuestion.js';
import Reference from './Reference.js';
import { updateUserId } from '../reducers/employeeSlice.js'; // Adjust the path as per your project structure

function EmployeeManagement() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.employee);
  // Assume you have a function to handle sign-in and receive the user ID
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
    <div>
      <h1>Employee Management</h1>
      <NameSection />
      <AddressSection />
      <ContactInfoSection />
      <EmploymentSection />
      <EmergencyContactSection />
      <WorkAuthorizationQuestion/>
      <DocumentsSection />
      <VisaStatusManagement />
      <Reference />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EmployeeManagement;