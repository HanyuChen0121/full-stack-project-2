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
    fileName: String, // Store the file name or path
    originalName: String, // Original file name
    status: { type: String, default: 'Pending' },
    feedback: String,
    uploadedAt: { type: Date, default: Date.now },
});

const applicationDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    firstName: String,
    lastName: String,
    middleName: String,
    preferredName: String,
    profilePicture: String, // URL or file path
    role: String,
    applicationStatus: String,
    applicationFeedback: String,
    optStatus: String,
    optEadStatus: String,
    i20Status: String,
    i983Status: String,
    documentFeedback: String,
    optFileName: String,
    optEadFileName: String,
    i983FileName: String,
    i20FileName: String,
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
