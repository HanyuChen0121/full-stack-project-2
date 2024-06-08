import React, { useState, useEffect } from 'react';
import '../index.css';

const OnBoarding = () => {
  const [status, setStatus] = useState('Never submitted'); // Change this for testing different statuses
  const [feedback, setFeedback] = useState('Your application was missing some documents.');
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    profilePicture: null,
    currentAddress: {
      building: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    cellPhone: '',
    workPhone: '',
    email: 'user@example.com', // Pre-filled and non-editable
    ssn: '',
    dob: '',
    gender: '',
    resident: '',
    workAuthorization: '',
    optReceipt: null,
    visaTitle: '',
    visaStartDate: '',
    visaEndDate: '',
    reference: {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: ''
    },
    emergencyContacts: [{
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: ''
    }],
    documents: [] // For uploaded documents
  });

  useEffect(() => {
    // Redirect if approved
    if (status === 'Approved') {
      window.location.href = '/home';
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: files[0]
    });
  };

  const handleSubmit = () => {
    // Submit application data
    console.log('Application submitted:', applicationData);
  };

  return (
    <div className="onboarding">
      <h1>Onboarding Application</h1>
      {status === 'Never submitted' && (
        <form>
          <div>
            <label>First Name (required)</label>
            <input name="firstName" value={applicationData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label>Last Name (required)</label>
            <input name="lastName" value={applicationData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <label>Middle Name</label>
            <input name="middleName" value={applicationData.middleName} onChange={handleChange} />
          </div>
          <div>
            <label>Preferred Name</label>
            <input name="preferredName" value={applicationData.preferredName} onChange={handleChange} />
          </div>
          <div>
            <label>Profile Picture</label>
            <input type="file" name="profilePicture" onChange={handleFileChange} />
          </div>
          <div>
            <label>Current Address</label>
            <input name="building" placeholder="Building/Apt #" value={applicationData.currentAddress.building} onChange={handleChange} />
            <input name="street" placeholder="Street" value={applicationData.currentAddress.street} onChange={handleChange} />
            <input name="city" placeholder="City" value={applicationData.currentAddress.city} onChange={handleChange} />
            <input name="state" placeholder="State" value={applicationData.currentAddress.state} onChange={handleChange} />
            <input name="zip" placeholder="ZIP" value={applicationData.currentAddress.zip} onChange={handleChange} />
          </div>
          <div>
            <label>Cell Phone</label>
            <input name="cellPhone" value={applicationData.cellPhone} onChange={handleChange} />
          </div>
          <div>
            <label>Work Phone</label>
            <input name="workPhone" value={applicationData.workPhone} onChange={handleChange} />
          </div>
          <div>
            <label>Email (pre-filled)</label>
            <input name="email" value={applicationData.email} disabled />
          </div>
          <div>
            <label>SSN</label>
            <input name="ssn" value={applicationData.ssn} onChange={handleChange} />
          </div>
          <div>
            <label>Date of Birth</label>
            <input name="dob" value={applicationData.dob} onChange={handleChange} />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" value={applicationData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="not_answer">I do not wish to answer</option>
            </select>
          </div>
          <div>
            <label>Permanent resident or citizen of the U.S.?</label>
            <select name="resident" value={applicationData.resident} onChange={handleChange}>
              <option value="">Select</option>
              <option value="citizen">Citizen</option>
              <option value="green_card">Green Card</option>
              <option value="no">No</option>
            </select>
          </div>
          {applicationData.resident === 'no' && (
            <div>
              <label>Work Authorization</label>
              <select name="workAuthorization" value={applicationData.workAuthorization} onChange={handleChange}>
                <option value="">Select</option>
                <option value="h1b">H1-B</option>
                <option value="l2">L2</option>
                <option value="f1">F1 (CPT/OPT)</option>
                <option value="h4">H4</option>
                <option value="other">Other</option>
              </select>
              {applicationData.workAuthorization === 'f1' && (
                <div>
                  <label>Upload OPT Receipt</label>
                  <input type="file" name="optReceipt" onChange={handleFileChange} />
                </div>
              )}
              {applicationData.workAuthorization === 'other' && (
                <div>
                  <label>Visa Title</label>
                  <input name="visaTitle" value={applicationData.visaTitle} onChange={handleChange} />
                  <label>Start Date</label>
                  <input name="visaStartDate" type="date" value={applicationData.visaStartDate} onChange={handleChange} />
                  <label>End Date</label>
                  <input name="visaEndDate" type="date" value={applicationData.visaEndDate} onChange={handleChange} />
                </div>
              )}
            </div>
          )}
          <div>
            <label>Reference</label>
            <input name="referenceFirstName" placeholder="First Name" value={applicationData.reference.firstName} onChange={handleChange} />
            <input name="referenceLastName" placeholder="Last Name" value={applicationData.reference.lastName} onChange={handleChange} />
            <input name="referenceMiddleName" placeholder="Middle Name" value={applicationData.reference.middleName} onChange={handleChange} />
            <input name="referencePhone" placeholder="Phone" value={applicationData.reference.phone} onChange={handleChange} />
            <input name="referenceEmail" placeholder="Email" value={applicationData.reference.email} onChange={handleChange} />
            <input name="referenceRelationship" placeholder="Relationship" value={applicationData.reference.relationship} onChange={handleChange} />
          </div>
          <div>
            <label>Emergency Contacts</label>
            {applicationData.emergencyContacts.map((contact, index) => (
              <div key={index}>
                <input name={`emergencyFirstName${index}`} placeholder="First Name" value={contact.firstName} onChange={handleChange} />
                <input name={`emergencyLastName${index}`} placeholder="Last Name" value={contact.lastName} onChange={handleChange} />
                <input name={`emergencyMiddleName${index}`} placeholder="Middle Name" value={contact.middleName} onChange={handleChange} />
                <input name={`emergencyPhone${index}`} placeholder="Phone" value={contact.phone} onChange={handleChange} />
                <input name={`emergencyEmail${index}`} placeholder="Email" value={contact.email} onChange={handleChange} />
                <input name={`emergencyRelationship${index}`} placeholder="Relationship" value={contact.relationship} onChange={handleChange} />
              </div>
            ))}
          </div>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      )}

      {status === 'Rejected' && (
        <div>
          <p>Your application was rejected. Feedback: {feedback}</p>
          <button onClick={() => setStatus('Never submitted')}>Edit and Resubmit</button>
        </div>
      )}

      {status === 'Pending' && (
        <div>
          <p>Please wait for HR to review your application.</p>
          <p>Here is your submitted application:</p>
          <div>
            <p>First Name: {applicationData.firstName}</p>
            <p>Last Name: {applicationData.lastName}</p>
            <p>Middle Name: {applicationData.middleName}</p>
            <p>Preferred Name: {applicationData.preferredName}</p>
            <p>Profile Picture: {applicationData.profilePicture ? applicationData.profilePicture.name : 'No file uploaded'}</p>
            <p>Address: {applicationData.currentAddress.building}, {applicationData.currentAddress.street}, {applicationData.currentAddress.city}, {applicationData.currentAddress.state}, {applicationData.currentAddress.zip}</p>
            <p>Cell Phone: {applicationData.cellPhone}</p>
            <p>Work Phone: {applicationData.workPhone}</p>
            <p>Email: {applicationData.email}</p>
            <p>SSN: {applicationData.ssn}</p>
            <p>Date of Birth: {applicationData.dob}</p>
            <p>Gender: {applicationData.gender}</p>
            <p>Resident Status: {applicationData.resident}</p>
            {applicationData.resident === 'no' && (
              <div>
                <p>Work Authorization: {applicationData.workAuthorization}</p>
                {applicationData.workAuthorization === 'f1' && <p>OPT Receipt: {applicationData.optReceipt ? applicationData.optReceipt.name : 'No file uploaded'}</p>}
                {applicationData.workAuthorization === 'other' && (
                  <div>
                    <p>Visa Title: {applicationData.visaTitle}</p>
                    <p>Start Date: {applicationData.visaStartDate}</p>
                    <p>End Date: {applicationData.visaEndDate}</p>
                  </div>
                )}
              </div>
            )}
            <p>Reference: {applicationData.reference.firstName} {applicationData.reference.lastName}, {applicationData.reference.middleName}, {applicationData.reference.phone}, {applicationData.reference.email}, {applicationData.reference.relationship}</p>
            <p>Emergency Contacts:</p>
            {applicationData.emergencyContacts.map((contact, index) => (
              <div key={index}>
                <p>{contact.firstName} {contact.lastName}, {contact.middleName}, {contact.phone}, {contact.email}, {contact.relationship}</p>
              </div>
            ))}
          </div>
          <div>
            <p>Documents:</p>
            {applicationData.documents.map((doc, index) => (
              <div key={index}>
                <a href={URL.createObjectURL(doc)} target="_blank" rel="noopener noreferrer">{doc.name}</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnBoarding;
