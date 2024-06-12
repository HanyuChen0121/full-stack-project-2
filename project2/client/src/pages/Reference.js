import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReference } from '../reducers/employeeSlice.js'; // Adjust the path to your slice file

function ReferencePage() {
  const dispatch = useDispatch();
  const reference = useSelector(state => state.employee.reference);

  const [referenceData, setReferenceData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);

  // Populate the local state with Redux store data when the component mounts
  useEffect(() => {
    setReferenceData(reference);
  }, [reference]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferenceData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateReference(referenceData));
    setIsEditing(false); // Disable editing after saving
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing when the edit button is clicked
  };

  return (
    <div>
      <h2>Reference Information</h2>
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" value={referenceData.firstName} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={referenceData.lastName} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          Middle Name:
          <input type="text" name="middleName" value={referenceData.middleName} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={referenceData.phone} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={referenceData.email} onChange={handleChange} disabled={!isEditing} />
        </label>
        <label>
          Relationship:
          <input type="text" name="relationship" value={referenceData.relationship} onChange={handleChange} disabled={!isEditing} />
        </label>
        {isEditing ? (
          <button type="button" onClick={handleSubmit}>Save</button>
        ) : (
          <button type="button" onClick={handleEdit}>Edit</button>
        )}
      </form>
    </div>
  );
}

export default ReferencePage;
