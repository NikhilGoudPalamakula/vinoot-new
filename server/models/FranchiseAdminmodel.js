const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminName: String,
  Adminid: String,
  franchisename: String,
  FranchiseID: String,
  designation: String,
  email: String,
  password: String,
  createdby: String,
  createdat: Date,
  modifiedby: String,
  modifiedat: Date
});

module.exports = mongoose.model('FranchiseAdmin', adminSchema);
