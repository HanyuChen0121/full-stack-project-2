// EmployeeManagement.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import NameSection from './NameSection';
import AddressSection from './AddressSection';
import ContactInfoSection from './ContactInfoSection';
import EmploymentSection from './EmploymentSection';
import EmergencyContactSection from './EmergencyContactSection';
import DocumentsSection from './DocumentsSection';
import VisaStatusManagement from './VisaStatusManagement';
import { updateUserId } from '../reducers/employeeSlice'; // Adjust the path as per your project structure

function EmployeeManagement() {
  const dispatch = useDispatch();

  // Assume you have a function to handle sign-in and receive the user ID
  const handleSignIn = () => {
    // After sign-in, obtain the user ID from MongoDB
    const userIdFromMongoDB = '123'; // Replace with the actual user ID received from MongoDB

    // Dispatch the action to store the user ID in Redux
    dispatch(updateUserId(userIdFromMongoDB));
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <button onClick={handleSignIn}>Sign In</button>
      <NameSection />
      <AddressSection />
      <ContactInfoSection />
      <EmploymentSection />
      <EmergencyContactSection />
      <DocumentsSection />
      <VisaStatusManagement />
    </div>
  );
}

export default EmployeeManagement;