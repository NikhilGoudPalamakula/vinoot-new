const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  franchisename: String,
  FranchiseID: String,
  mobileNumber: String,
  country: String,
  state: String,
  city: String,
  area: String,
  address: String,
  pincode: String,
  createdby: String,
  createdat: Date,
  modifiedby: String,
  modifiedat: Date
});

module.exports = mongoose.model('Franchiseregmodel', franchiseSchema);
