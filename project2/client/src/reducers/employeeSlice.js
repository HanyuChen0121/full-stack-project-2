import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  firstName: '',
  lastName: '',
  middleName: '',
  preferredName: '',
  profilePicture: '',
  currentAddress: {
    building: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  },
  cellPhone: '',
  workPhone: '',
  email: '',
  ssn: '',
  dob: '',
  gender: '',
  resident: '',
  workAuthorization: '',
  optReceipt: '',
  visaTitle: '',
  visaStartDate: '',
  visaEndDate: '',
  reference: {
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  },
  emergencyContacts: [
    {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: '',
    },
  ],
  documents: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeeData(state, action) {
      return { ...state, ...action.payload };
    },
    updateName(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    updateAddress(state, action) {
      const { name, value } = action.payload;
      state.currentAddress[name] = value;
    },
    updateContact(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    updateReference(state, action) {
      const { name, value } = action.payload;
      state.reference[name] = value;
    },
    updateEmergencyContact(state, action) {
      const { index, name, value } = action.payload;
      state.emergencyContacts[index][name] = value;
    },
    addEmergencyContact(state) {
      state.emergencyContacts.push({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        relationship: '',
      });
    },
    removeEmergencyContact(state, action) {
      state.emergencyContacts.splice(action.payload, 1);
    },
    addDocument(state, action) {
      state.documents.push(action.payload);
    },
    removeDocument(state, action) {
      state.documents.splice(action.payload, 1);
    },
    updateUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const {
  setEmployeeData,
  updateName,
  updateAddress,
  updateContact,
  updateReference,
  updateEmergencyContact,
  addEmergencyContact,
  removeEmergencyContact,
  addDocument,
  removeDocument,
  updateUserId, // Include the new action
} = employeeSlice.actions;

export default employeeSlice.reducer;
