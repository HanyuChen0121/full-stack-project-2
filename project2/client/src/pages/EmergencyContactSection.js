import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmergencyContact } from '../reducers/employeeSlice.js'; // Adjust the path as necessary

function EmergencyContactSection() {
  const dispatch = useDispatch();

  const emergencyContacts = useSelector((state) => state.employee.emergencyContacts);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  });

  const [originalData, setOriginalData] = useState(formData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateEmergencyContact(formData));
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
      <h2>Emergency Contact</h2>
      {emergencyContacts.map((contact, index) => (
        <div key={index}>
          <div>
            <label>
              First Name:
              <input type="text" name="firstName" value={contact.firstName} onChange={(e) => dispatch(updateEmergencyContact({ index, name: e.target.name, value: e.target.value }))} disabled={!isEditing} />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input type="text" name="lastName" value={contact.lastName} onChange={(e) => dispatch(updateEmergencyContact({ index, name: e.target.name, value: e.target.value }))} disabled={!isEditing} />
            </label>
          </div>
          <div>
            <label>
              Middle Name:
              <input type="text" name="middleName" value={contact.middleName} onChange={(e) => dispatch(updateEmergencyContact({ index, name: e.target.name, value: e.target.value }))} disabled={!isEditing} />
            </label>
          </div>
          <div>
            <label>
              Phone:
              <input type="text" name="phone" value={contact.phone} onChange={(e) => dispatch(updateEmergencyContact({ index, name: e.target.name, value: e.target.value }))} disabled={!isEditing} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" name="email" value={contact.email} onChange={(e) => dispatch(updateEmergencyContact({ index, name: e.target.name, value: e.target.value }))} disabled={!isEditing} />
            </label>
          </div>
          <div>
            <label>
              Relationship:
              <input type="text" name="relationship" value={contact.relationship} onChange={(e) => dispatch(updateEmergencyContact({ index, name: e.target.name, value: e.target.value }))} disabled={!isEditing} />
            </label>
          </div>
        </div>
      ))}
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

export default EmergencyContactSection;
