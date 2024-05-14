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
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Franchiseregmodel", franchiseSchema);
