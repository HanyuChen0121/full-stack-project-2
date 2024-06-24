import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setEmployeeData } from '../reducers/employeeSlice.js'; // Ensure the correct path to your slice

const VisaDocuments = () => {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employee);
    const [file, setFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (documentType) => {
        if (!file) {
            setStatusMessage('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('documentType', documentType);
        formData.append('employeeId', employeeData._id); // Adjust according to your employee data structure
        formData.append('file', file); // Append the file to formData

        try {
            const response = await axios.post('http://localhost:5000/api/users/employees/visa/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStatusMessage(`${documentType} uploaded successfully`);
            setFile(null); // Clear the file input after successful upload

            // Update Redux store or local state as needed
        } catch (err) {
            setStatusMessage(`Failed to upload ${documentType}`);
        }
    };

    const { optStatus, optEadStatus, i983Status, i20Status, documentFeedback } = employeeData;

    return (
        <div className="visa-documents">
            <h2>Visa Document Management</h2>
            {optStatus === '' && (
                <>
                    <button onClick={() => handleUpload('opt')}>Upload OPT Form</button>
                    <input type="file" onChange={handleFileChange} />
                </>
            )}

            {optStatus === 'Pending' && <p>Waiting for HR to approve your OPT Receipt</p>}
            {optStatus === 'Rejected' && <p>HR Feedback: {documentFeedback}</p>}
            {optStatus === 'Approved' && !optEadStatus && (
                <div>
                    <p>Please upload a copy of your OPT EAD</p>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={() => handleUpload('optEad')}>Upload OPT EAD</button>
                </div>
            )}

            {optEadStatus === 'Pending' && <p>Waiting for HR to approve your OPT EAD</p>}
            {optEadStatus === 'Rejected' && <p>HR Feedback: {documentFeedback}</p>}
            {optEadStatus === 'Approved' && !i983Status && (
                <div>
                    <p>Please download and fill out the I-983 form</p>
                    <a href="/path/to/empty-template.pdf" download>Download Empty Template</a>
                    <a href="/path/to/sample-template.pdf" download>Download Sample Template</a>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={() => handleUpload('i983')}>Upload Filled I-983 Form</button>
                </div>
            )}

            {i983Status === 'Pending' && <p>Waiting for HR to approve and sign your I-983</p>}
            {i983Status === 'Rejected' && <p>HR Feedback: {documentFeedback}</p>}
            {i983Status === 'Approved' && !i20Status && (
                <div>
                    <p>Please send the I-983 along with all necessary documents to your school and upload the new I-20</p>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={() => handleUpload('i20')}>Upload I-20</button>
                </div>
            )}

            {i20Status === 'Pending' && <p>Waiting for HR to approve your I-20</p>}
            {i20Status === 'Rejected' && <p>HR Feedback: {documentFeedback}</p>}
            {i20Status === 'Approved' && <p>All documents have been approved</p>}

            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default VisaDocuments;
