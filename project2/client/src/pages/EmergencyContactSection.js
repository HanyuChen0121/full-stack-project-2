import React, { useState } from 'react';

function EmergencyContactSection() {
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
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
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
          Relationship:
          <input type="text" name="relationship" value={formData.relationship} onChange={handleChange} disabled={!isEditing} />
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

export default EmergencyContactSection;
