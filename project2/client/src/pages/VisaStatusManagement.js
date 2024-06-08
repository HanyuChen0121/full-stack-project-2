import React, { useState } from 'react';

function VisaStatusManagement() {
  const [documents, setDocuments] = useState({
    optReceipt: { status: 'pending', feedback: '' },
    optEad: { status: 'pending', feedback: '' },
    i983: { status: 'pending', feedback: '' },
    i20: { status: 'pending', feedback: '' },
  });

  const handleUpload = (type) => {
    // Logic to handle file upload
  };

  const renderDocumentStatus = (doc) => {
    if (doc.status === 'pending') return 'Waiting for HR to approve';
    if (doc.status === 'approved') return 'Approved';
    if (doc.status === 'rejected') return `Rejected: ${doc.feedback}`;
  };

  return (
    <div>
      <h2>Visa Status Management</h2>
      <div>
        <h3>OPT Receipt</h3>
        <p>{renderDocumentStatus(documents.optReceipt)}</p>
        {documents.optReceipt.status === 'approved' && (
          <button onClick={() => handleUpload('optEad')}>Upload OPT EAD</button>
        )}
      </div>
      <div>
        <h3>OPT EAD</h3>
        <p>{renderDocumentStatus(documents.optEad)}</p>
        {documents.optEad.status === 'approved' && (
          <>
            <button onClick={() => handleUpload('i983')}>Upload I-983</button>
            <a href="/templates/empty.pdf" download>Empty Template</a>
            <a href="/templates/sample.pdf" download>Sample Template</a>
          </>
        )}
      </div>
      <div>
        <h3>I-983</h3>
        <p>{renderDocumentStatus(documents.i983)}</p>
        {documents.i983.status === 'approved' && (
          <button onClick={() => handleUpload('i20')}>Upload I-20</button>
        )}
      </div>
      <div>
        <h3>I-20</h3>
        <p>{renderDocumentStatus(documents.i20)}</p>
      </div>
    </div>
  );
}

export default VisaStatusManagement;
