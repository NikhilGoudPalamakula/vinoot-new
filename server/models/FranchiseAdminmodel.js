const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  Adminid: String,
  franchisename: String,
  FranchiseID: String,
  designation: String,
  email: String,
  password: String,
  isActive: { type: Boolean, default: true },
  modifiedBy: { type: String },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }, 
  createdBy: { type:  String,}
});

module.exports = mongoose.model('FranchiseAdmin', adminSchema);
