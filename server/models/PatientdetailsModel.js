const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient_id: String,
  franchise_name: String,
  franchise_id: String,
  patient_name: String,
  gender: String,
  dob: Date,
  email: String,
  mobile_number: String,
  state: String,
  city: String,
  area: String,
  address: String,
});

const Patient = mongoose.model("Patientdetails", patientSchema);

module.exports = Patient;
