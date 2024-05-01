const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  franchisename: { type: String, required: true, unique: true },
  FranchiseID: { type: String, required: true, unique: true },
  mobileNumber:  { type: String, required: true },
  country:  { type: String },
  state: String,
  city: String,
  area: String,
  address: String,
  pincode:  { type: String},
  modifiedBy: String,
  modifiedAt:  { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }, 
  createdBy: { type:  String,}
});

module.exports = mongoose.model('Franchiseregmodel', franchiseSchema);
