import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkAuthorization, updateCitizenshipStatus } from '../reducers/employeeSlice.js'; // Assuming the path to your slice file

function WorkAuthorizationQuestion() {
  const [workAuthorization, setWorkAuthorization] = useState('');
  const [visaTitle, setVisaTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [optReceipt, setOptReceipt] = useState('');
  const isUSCitizen = useSelector(state => state.employee.isUSCitizen);
  const dispatch = useDispatch();

  const handleYesClick = () => {
    dispatch(updateCitizenshipStatus({ isUSCitizen: "true" }));
  };

  const handleNoClick = () => {
    dispatch(updateCitizenshipStatus({ isUSCitizen: "false" }));

  };

  const handleWorkAuthorizationChange = (e) => {
    setWorkAuthorization(e.target.value);
  };

  const handleVisaTitleChange = (e) => {
    setVisaTitle(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleOptReceiptChange = (e) => {
    setOptReceipt(e.target.value);
  };

  const handleSave = () => {
    dispatch(updateWorkAuthorization({ workAuthorization, visaTitle, optReceipt }));
  };

  return (
    <div>
      <h3>Permanent resident or citizen of the U.S.?</h3>
      <button onClick={handleYesClick}>Yes</button>
      <button onClick={handleNoClick}>No</button>

      {isUSCitizen !== "true" && (
        <div>
          <h4>What is your work authorization?</h4>
          <select value={workAuthorization} onChange={handleWorkAuthorizationChange}>
            <option value="">Select</option>
            <option value="H1-B">H1-B</option>
            <option value="L2">L2</option>
            <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
            <option value="H4">H4</option>
            <option value="Other">Other</option>
          </select>

          {workAuthorization === 'F1(CPT/OPT)' && (
            <div>
              <label>Upload OPT Receipt:</label>
              <input type="file" onChange={handleOptReceiptChange} />
            </div>
          )}
            <input type="file" onChange={handleOptReceiptChange} />
          {workAuthorization === 'Other' && (
            <div>
              <label>Visa Title:</label>
              <input type="text" value={visaTitle} onChange={handleVisaTitleChange} />
            </div>
          )}

          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={handleStartDateChange} />
          </div>
          
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={handleEndDateChange} />
          </div>

          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default WorkAuthorizationQuestion;
