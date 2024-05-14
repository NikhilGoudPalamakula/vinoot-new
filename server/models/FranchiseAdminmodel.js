const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fullname: String,
  userId: String,
  franchisename: String,
  franchiseID: String,
  designation: String,
  mobileNumber: String,
  email: String,
  password: String,
  isActive: { type: Boolean, default: true },
  modifiedBy: { type: String },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String },
});

module.exports = mongoose.model("FranchiseAdmin", adminSchema);
