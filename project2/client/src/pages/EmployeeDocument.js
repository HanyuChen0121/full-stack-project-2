import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDocument = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [currentDocument, setCurrentDocument] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/employees/${id}`);
                setEmployee(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const updateDocumentStatus = async (documentType, approve) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/users/employees/updateStatus`, {
                id,
                feedback,
                documentType,
                status: approve ? 'Approved' : 'Rejected',
            });

            setStatusMessage(response.data.message);
            const updatedResponse = await axios.get(`http://localhost:5000/api/users/employees/${id}`);
            setEmployee(updatedResponse.data);
            setFeedback('');
            setCurrentDocument('');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const renderDocumentSection = (docType, docName, docStatus) => {
        return (
            <div key={docType}>
                <p><strong>{docName} Status:</strong> {docStatus}</p>
                {currentDocument === docType && (
                    <div>
                        {docStatus === 'Pending' && (
                            <div>
                                <label>Feedback:</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                            </div>
                        )}
                        <button onClick={() => { setCurrentDocument(docType); updateDocumentStatus(docType, true); }}>Approve</button>
                        <button onClick={() => { setCurrentDocument(docType); updateDocumentStatus(docType, false); }}>Reject</button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>Employee Documents</h1>
            {employee && (
                <div>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Application Status:</strong> {employee.applicationStatus}</p>
                    
                    {renderDocumentSection('opt', 'OPT', employee.optStatus)}
                    {renderDocumentSection('optEad', 'OPT EAD', employee.optEadStatus)}
                    {renderDocumentSection('i983', 'I-983', employee.i983Status)}
                    {renderDocumentSection('i20', 'I-20', employee.i20Status)}
                    
                    {statusMessage && <p>{statusMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default EmployeeDocument;
