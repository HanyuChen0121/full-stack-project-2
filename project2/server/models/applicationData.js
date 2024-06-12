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

const documentSchema = new mongoose.Schema({
  url: String, // URL or file path of the document
  status: { type: String, default: 'Pending' }, // Document status (e.g., Pending, Approved, Rejected)
  feedback: String, // Feedback from HR if rejected
  uploadedAt: { type: Date, default: Date.now }, // Timestamp of document upload
});

const applicationDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  firstName: String,
  lastName: String,
  middleName: String,
  preferredName: String,
  profilePicture: String, // URL or file path
  role: String,
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
  documents: [documentSchema], // Updated to use the new documentSchema
});

const ApplicationData = mongoose.model('ApplicationData', applicationDataSchema);

module.exports = ApplicationData;
