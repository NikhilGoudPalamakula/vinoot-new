const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patient_id: String,
  patient_name: String,
  gender: String,
  dob: String,
  email: String,
  mobile_number: String,
  state: String,
  city: String,
  area: String,
  address: String,
  franchiseName: String,
  franchiseID: String,
  createdBy: String,
  modifiedBy: { type: String },
  modifiedAt: { type: String, required: true },
  createdAt: { type: String, required: true },
});

const Patient = mongoose.model("Patientdetails", patientSchema);

module.exports = Patient;
