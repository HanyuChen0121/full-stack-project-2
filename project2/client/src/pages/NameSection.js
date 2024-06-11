// src/components/NameSection.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, setEmployeeData } from '../reducers/employeeSlice.js';

function NameSection() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.employee);
  
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    if (window.confirm('Discard all changes?')) {
      dispatch(setEmployeeData(originalData));
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateName({ name, value }));
    console.log('Redux state:', formData);
  };

  return (
    <div>
      <h2>Name</h2>
      <div>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Middle Name:
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Preferred Name:
          <input type="text" name="preferredName" value={formData.preferredName} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Profile Picture:
          <input type="file" name="profilePicture" onChange={(e) => dispatch(updateName({ name: 'profilePicture', value: e.target.files[0] }))} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          SSN:
          <input type="text" name="ssn" value={formData.ssn} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Gender:
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} disabled={!isEditing} />
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

export default NameSection;
