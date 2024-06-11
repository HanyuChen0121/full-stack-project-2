const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  building: String,
  street: String,
  city: String,
  state: String,
  zip: String,
});

const referenceSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  relationship: String,
});

const emergencyContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  relationship: String,
});

const applicationDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  firstName: String,
  lastName: String,
  middleName: String,
  preferredName: String,
  profilePicture: String, // URL or file path
  currentAddress: addressSchema,
  cellPhone: String,
  workPhone: String,
  email: { type: String, required: true }, // Pre-filled and non-editable
  ssn: String,
  dob: Date,
  gender: String,
  resident: String,
  workAuthorization: String,
  optReceipt: String, // URL or file path
  visaTitle: String,
  visaStartDate: Date,
  visaEndDate: Date,
  isUSCitizen: String,
  reference: referenceSchema,
  emergencyContacts: [emergencyContactSchema],
  documents: [String], // URLs or file paths for uploaded documents
});

const ApplicationData = mongoose.model('ApplicationData', applicationDataSchema);

module.exports = ApplicationData;