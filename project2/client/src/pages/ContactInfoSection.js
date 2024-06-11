
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateContact } from '../reducers/employeeSlice.js'; // Adjust the path as necessary

function ContactInfoSection() {
  const dispatch = useDispatch();

  const cellPhone = useSelector((state) => state.employee.cellPhone);
  const workPhone = useSelector((state) => state.employee.workPhone);

  const [isEditing, setIsEditing] = useState(false);
  const [cellPhoneState, setCellPhoneState] = useState(cellPhone);
  const [workPhoneState, setWorkPhoneState] = useState(workPhone);

  useEffect(() => {
    setCellPhoneState(cellPhone);
    setWorkPhoneState(workPhone);
  }, [cellPhone, workPhone]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (cellPhone !== cellPhoneState) {
      dispatch(updateContact({ name: 'cellPhone', value: cellPhoneState }));
    }
    if (workPhone !== workPhoneState) {
      dispatch(updateContact({ name: 'workPhone', value: workPhoneState }));
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    if (window.confirm('Discard all changes?')) {
      setCellPhoneState(cellPhone);
      setWorkPhoneState(workPhone);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cellPhone') {
      setCellPhoneState(value);
    } else if (name === 'workPhone') {
      setWorkPhoneState(value);
    }
  };

  return (
    <div>
      <h2>Contact Info</h2>
      <div>
        <label>
          Cell Phone Number:
          <input type="text" name="cellPhone" value={cellPhoneState} onChange={handleChange} disabled={!isEditing} />
        </label>
      </div>
      <div>
        <label>
          Work Phone Number:
          <input type="text" name="workPhone" value={workPhoneState} onChange={handleChange} disabled={!isEditing} />
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
