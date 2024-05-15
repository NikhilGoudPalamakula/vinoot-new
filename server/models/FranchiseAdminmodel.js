const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullname: String,
  userId: String,
  franchisename: String,
  franchiseID: String,
  designation: String,
  mobileNumber:Number,
  email: String,
  password: String,
  isActive: { type: Boolean, default: true },
  modifiedBy: { type: String },
  modifiedAt: { type: String, set: setDate, default: Date.now },
  createdAt: { type: String, set: setDate, default: Date.now },
  createdBy: { type:  String,}
});



function setDate(date) {
  return new Date(date).toLocaleString();
}

module.exports = mongoose.model('FranchiseAdmin', adminSchema);