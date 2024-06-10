import React, { useState } from 'react';

const DocumentUploadPage = ({ user }) => {
  const [optReceiptStatus, setOptReceiptStatus] = useState('pending'); // can be 'pending', 'approved', 'rejected'
  const [optEadStatus, setOptEadStatus] = useState(null); // can be 'pending', 'approved', 'rejected'
  const [i983Status, setI983Status] = useState(null); // can be 'pending', 'approved', 'rejected'
  const [i20Status, setI20Status] = useState(null); // can be 'pending', 'approved', 'rejected'
  const [hrFeedback, setHrFeedback] = useState('');

  const handleUpload = (documentType) => {
    // Implement the file upload logic here, 
    // update the state and handle the HR feedback logic as needed.
  };

  if (user.onboardingApplication !== 'OPT') {
    return <div>This page is not available for your visa type.</div>;
  }

  return (
    <div>
      <h2>Work Authorization Document Management</h2>

      <div>
        <h3>OPT Receipt</h3>
        {optReceiptStatus === 'pending' && <p>Waiting for HR to approve your OPT Receipt.</p>}
        {optReceiptStatus === 'approved' && <p>Please upload a copy of your OPT EAD.</p>}
        {optReceiptStatus === 'rejected' && <p>HR Feedback: {hrFeedback}</p>}
      </div>

      {optReceiptStatus === 'approved' && (
        <div>
          <h3>OPT EAD</h3>
          {optEadStatus === null && <button onClick={() => handleUpload('optEad')}>Upload OPT EAD</button>}
          {optEadStatus === 'pending' && <p>Waiting for HR to approve your OPT EAD.</p>}
          {optEadStatus === 'approved' && <p>Please download and fill out the I-983 form.</p>}
          {optEadStatus === 'rejected' && <p>HR Feedback: {hrFeedback}</p>}
        </div>
      )}

      {optEadStatus === 'approved' && (
        <div>
          <h3>I-983</h3>
          <a href="/path/to/empty-template.pdf" download>Empty Template</a>
          <a href="/path/to/sample-template.pdf" download>Sample Template</a>
          <button onClick={() => handleUpload('i983')}>Upload Filled Out I-983</button>
          {i983Status === 'pending' && <p>Waiting for HR to approve and sign your I-983.</p>}
          {i983Status === 'approved' && <p>Please send the I-983 along with all necessary documents to your school and upload the new I-20.</p>}
          {i983Status === 'rejected' && <p>HR Feedback: {hrFeedback}</p>}
        </div>
      )}

      {i983Status === 'approved' && (
        <div>
          <h3>I-20</h3>
          <button onClick={() => handleUpload('i20')}>Upload I-20</button>
          {i20Status === 'pending' && <p>Waiting for HR to approve your I-20.</p>}
          {i20Status === 'approved' && <p>All documents have been approved.</p>}
          {i20Status === 'rejected' && <p>HR Feedback: {hrFeedback}</p>}
        </div>
      )}
    </div>
  );
};

export default DocumentUploadPage;