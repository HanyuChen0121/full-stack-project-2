import React, { useState } from 'react';
import NameSection from './NameSection';
import AddressSection from './AddressSection';
import ContactInfoSection from './ContactInfoSection';
import EmploymentSection from './EmploymentSection';
import EmergencyContactSection from './EmergencyContactSection';
import DocumentsSection from './DocumentsSection';
import VisaStatusManagement from './VisaStatusManagement';

function EmployeeManagement() {
  return (
    <div>
      <h1>Employee Management</h1>
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