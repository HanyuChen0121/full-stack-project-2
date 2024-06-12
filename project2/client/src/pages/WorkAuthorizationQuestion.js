import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkAuthorization, updateCitizenshipStatus } from '../reducers/employeeSlice.js'; // Adjust the path to your slice file

function WorkAuthorizationQuestion() {
  const dispatch = useDispatch();
  const isUSCitizen = useSelector(state => state.employee.isUSCitizen);
  const workAuthData = useSelector(state => ({
    workAuthorization: state.employee.workAuthorization,
    visaTitle: state.employee.visaTitle,
    startDate: state.employee.visaStartDate,
    endDate: state.employee.visaEndDate,
    optReceipt: state.employee.optReceipt
  }));

  const [workAuthorization, setWorkAuthorization] = useState('');
  const [visaTitle, setVisaTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [optReceipt, setOptReceipt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (workAuthorization !== workAuthData.workAuthorization) {
      setWorkAuthorization(workAuthData.workAuthorization);
    }
    if (visaTitle !== workAuthData.visaTitle) {
      setVisaTitle(workAuthData.visaTitle);
    }
    if (startDate !== formatDate(workAuthData.startDate)) {
      setStartDate(formatDate(workAuthData.startDate));
    }
    if (endDate !== formatDate(workAuthData.endDate)) {
      setEndDate(formatDate(workAuthData.endDate));
    }
    if (optReceipt !== workAuthData.optReceipt) {
      setOptReceipt(workAuthData.optReceipt);
    }
  }, [workAuthData]);

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
    dispatch(updateWorkAuthorization({ workAuthorization, visaTitle, startDate, endDate, optReceipt }));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <h3>Permanent resident or citizen of the U.S.?</h3>
      <button onClick={handleYesClick}>Yes</button>
      <button onClick={handleNoClick}>No</button>

      {isUSCitizen !== "true" && (
        <div>
          <h4>What is your work authorization?</h4>
          <select value={workAuthorization} onChange={handleWorkAuthorizationChange} disabled={!isEditing}>
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
              <input type="file" onChange={handleOptReceiptChange} disabled={!isEditing} />
            </div>
          )}

          {workAuthorization === 'Other' && (
            <div>
              <label>Visa Title:</label>
              <input type="text" value={visaTitle} onChange={handleVisaTitleChange} disabled={!isEditing} />
            </div>
          )}

          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={handleStartDateChange} disabled={!isEditing} />
          </div>

          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={handleEndDateChange} disabled={!isEditing} />
          </div>

          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkAuthorizationQuestion;
