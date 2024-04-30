// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true },
//   dateOfBirth: { type: String, required: true },
//   password: { type: String, required: true },
//   confirmPassword: { type: String, required: true },
//   gender: { type: String, required: true },
//   userType: { type: String, required: true },
//   isActive: { type: Boolean, default: true },
//   modifiedBy: { type: String },
//   modifiedAt: { type: Date, default: Date.now },
//   createdAt: { type: Date, default: Date.now },
//   createdBy: { type: String },
// });

// const MasterAdminRegmodel = mongoose.model('MasterUser', userSchema);

// module.exports = MasterAdminRegmodel;



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  gender: { type: String, required: true },
  userType: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  activeChangedBy: { type: String },
  activeChangedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const MasterAdminRegmodel = mongoose.model('MasterUser', userSchema);

module.exports = MasterAdminRegmodel;