const mongoose = require('mongoose');

const franchiseAdminSchema = new mongoose.Schema({
    fullname:  { type: String, required: true},
    userId: { type: String, required: true, unique: true },
    franchisename:  { type: String},
    FranchiseID:  { type: String},
    designation:  { type: String, required: true},
    email:  { type: String,},
    password:  { type: String, required: true},
    isActive: { type: Boolean, default: true },
    modifiedBy: { type: String },
    modifiedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }, 
    createdBy: { type:  String }
});

const FranchiseAdmin = mongoose.model('FranchiseAdmin', franchiseAdminSchema);

module.exports = FranchiseAdmin;
