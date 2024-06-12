import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument } from '../reducers/employeeSlice.js'; // Adjust the path as necessary

function DocumentUploadPage() {
  const dispatch = useDispatch();

  // Fetch necessary data from Redux store
  const {
    optReceiptStatus,
    optEADStatus,
    i983Status,
    i20Status,
    HRFeedback // Assuming you have HR feedback stored in the Redux store
  } = useSelector((state) => state.employee);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      // Perform upload logic here, e.g., using axios or another HTTP client
      // After successful upload, dispatch action to update Redux store
      dispatch(addDocument(file));

      // Optional: Clear the file input after upload
      setFile(null);
    }
  };

  return (
    <div>
      <h2>Document Management</h2>

      {/* OPT Receipt */}
      <div>
        <h3>OPT Receipt</h3>
        {optReceiptStatus === 'pending' && (
          <p>Waiting for HR to approve your OPT Receipt</p>
        )}
        {optReceiptStatus === 'approved' && (
          <p>Please upload a copy of your OPT EAD</p>
        )}
        {optReceiptStatus === 'rejected' && (
          <p>HR's feedback: {HRFeedback}</p>
        )}
      </div>

      {/* OPT EAD */}
      <div>
        <h3>OPT EAD</h3>
        {/* Similar logic for displaying status */}
      </div>

      {/* I-983 */}
      <div>
        <h3>I-983</h3>
        {/* Similar logic for displaying status */}
      </div>

      {/* I-20 */}
      <div>
        <h3>I-20</h3>
        {/* Similar logic for displaying status */}
      </div>

      {/* Upload form */}
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default DocumentUploadPage;
