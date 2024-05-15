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
  franchiseID: String,
  createdBy: String,
  modifiedBy: { type: String },
  modifiedAt:{ type: String, set: setDate, default: Date.now },
  createdAt: { type: String, set: setDate, default: Date.now },

});



function setDate(date) {
  return new Date(date).toLocaleString();
}

const Patient = mongoose.model("Patientdetails", patientSchema);

module.exports = Patient;
