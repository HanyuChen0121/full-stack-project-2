import React, { useState } from 'react';

function AddressSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    building: '',
    street: '',
    city: '',
    state: '',
    zip: '',
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
      <h2>Address</h2>
      <div>
        <label>
          Building/Apt #:
          <input type="text" name="building" value={formData.building} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Street Name:
          <input type="text" name="street" value={formData.street} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Zip Code:
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} disabled={!isEditing} />
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
