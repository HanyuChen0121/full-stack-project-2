import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  role: '',
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
  isUSCitizen: '',
  ssn: '',
  dob: '',
  gender: '',
  resident: '',
  applicationStatus: '',
  applcationFeedback: '',
  workAuthorization: '',
  optReceipt: '',
  eadReceipt: '', 
  i983Receipt: '',
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
  emergencyContact: { // Only one emergency contact
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  },
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
    
    updateEmergencyContact(state, action) {
        state.emergencyContact = { ...state.emergencyContact, ...action.payload };
    },
    updateReference(state, action) {
        state.reference = { ...state.reference, ...action.payload };
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
    updateUserEmail(state, action) {
        state.email = action.payload;
    },
    updateEmployment(state, action) {
        const { visaTitle, startDate, endDate } = action.payload;
        state.visaTitle = visaTitle;
        state.visaStartDate = startDate;
        state.visaEndDate = endDate;
    },
    updateWorkAuthorization(state, action) {
        const { workAuthorization, visaTitle, optReceipt } = action.payload;
        state.workAuthorization = workAuthorization;
        state.visaTitle = visaTitle;
        state.optReceipt = optReceipt;
    },
    updateCitizenshipStatus(state, action) {
        const { isUSCitizen } = action.payload;
        state.isUSCitizen = isUSCitizen;
    },
    updateApplicationStatus(state, action) {
      const { applicationStatus } = action.payload;
      state.applicationStatus = applicationStatus;
  },
    resetState(state) {
      return initialState;
    }
  },
});

export const {
  setEmployeeData,
  updateName,
  updateAddress,
  updateContact,
  updateReference,
  updateEmergencyContact,
  removeEmergencyContact,
  addDocument,
  removeDocument,
  updateUserId, // Include the new action
  updateUserEmail,
  updateEmployment,
  updateWorkAuthorization, 
  updateCitizenshipStatus,
  updateApplicationStatus,
  resetState,
} = employeeSlice.actions;

export default employeeSlice.reducer;
