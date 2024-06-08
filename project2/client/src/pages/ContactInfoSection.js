import React, { useState } from 'react';

function ContactInfoSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    cellPhone: '',
    workPhone: '',
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
      <h2>Contact Info</h2>
      <div>
        <label>
          Cell Phone Number:
          <input type="text" name="cellPhone" value={formData.cellPhone} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Work Phone Number:
          <input type="text" name="workPhone" value={formData.workPhone} onChange={handleChange} disabled={!isEditing} />
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

export default ContactInfoSection;
