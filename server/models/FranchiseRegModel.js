const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema({
  franchisename: String,
  franchiseID: String,
  mobileNumber: String,
  state: String,
  city: String,
  area: String,
  address: String,
  pincode: String,
  modifiedBy: String,
  modifiedAt: { type: String, set: setDate, default: Date.now },
  createdAt: { type: String, set: setDate, default: Date.now },
  createdBy: { type: String },
  isActive: { type: Boolean, default: true },
});


function setDate(date) {
  return new Date(date).toLocaleString();
}

module.exports = mongoose.model("Franchiseregmodel", franchiseSchema);
