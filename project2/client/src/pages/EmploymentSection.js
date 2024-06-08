import React, { useState } from 'react';

function EmploymentSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    visaTitle: '',
    startDate: '',
    endDate: '',
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
