import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateAddress } from '../reducers/employeeSlice.js';
function AddressSection() {
  const dispatch = useDispatch();
  const currentAddress = useSelector((state) => state.employee.currentAddress);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentAddress);
  const employeeData = useSelector((state) => state.employee);
  useEffect(() => {
    setFormData(currentAddress);
  }, [currentAddress]);
  useEffect(() => {
    console.log('Current Redux State:', employeeData);
  }, [employeeData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    Object.keys(formData).forEach((key) => {
      dispatch(updateAddress({ name: key, value: formData[key] }));
    });
    console.log('Redux state:', formData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    if (window.confirm('Discard all changes?')) {
      setFormData(currentAddress);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Address</h2>
      <div>
        <label>
          Building/Apt #:
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
      </div>
      <div>
        <label>
          Street Name:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
      </div>
      <div>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
      </div>
      <div>
        <label>
          Zip Code:
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            disabled={!isEditing}
          />
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

export default AddressSection;
