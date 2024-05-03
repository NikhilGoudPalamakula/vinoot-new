const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient_id: String,
  patient_name: String,
  gender: String,
  dob: Date,
  email: String,
  mobile_number: String,
  state: String,
  city: String,
  area: String,
  address: String,
  franchiseName: String,
  FranchiseID: String,
  createdBy: String,
  modifiedBy: { type: String },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }, 

});

const Patient = mongoose.model("Patientdetails", patientSchema);

module.exports = Patient;
