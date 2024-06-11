import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReference } from '../reducers/employeeSlice.js'; // Assuming the path to your slice file

function ReferencePage() {
  const [referenceData, setReferenceData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  });
  const dispatch = useDispatch();
  const reference = useSelector(state => state.employee.reference);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferenceData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateReference(referenceData));
  };

  return (
    <div>
      <h2>Reference Information</h2>
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" value={referenceData.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={referenceData.lastName} onChange={handleChange} />
        </label>
        <label>
          Middle Name:
          <input type="text" name="middleName" value={referenceData.middleName} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={referenceData.phone} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={referenceData.email} onChange={handleChange} />
        </label>
        <label>
          Relationship:
          <input type="text" name="relationship" value={referenceData.relationship} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

export default ReferencePage;
