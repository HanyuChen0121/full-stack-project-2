// EmploymentSection.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployment } from '../reducers/employeeSlice.js'; // Adjust the path as necessary

function EmploymentSection() {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    visaTitle: '',
    startDate: '',
    endDate: '',
  });

  const employmentData = useSelector((state) => ({
    visaTitle: state.employee.visaTitle,
    startDate: state.employee.visaStartDate,
    endDate: state.employee.visaEndDate,
  }));

  const [originalData, setOriginalData] = useState(employmentData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateEmployment(formData));
    console.log(formData);
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    if (window.confirm('Discard all changes?')) {
      setFormData(originalData);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Employment</h2>
      <div>
        <label>
          Visa Title:
          <input type="text" name="visaTitle" value={formData.visaTitle} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Start Date:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
}

export default EmploymentSection;
