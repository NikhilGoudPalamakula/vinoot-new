// models/Installment.js

const mongoose = require('mongoose');

const billinginstallmentSchema = new mongoose.Schema({
    
  patient_id: { type: String,required: true},
  remainingAmount: {type: Number,required: true },
  mobile_number: { type: Number, required: true},
  patient_name: { type: String, required: true },
  bill_number: {type: String,required: true },
  franchiseName: String,
  franchiseID: String,
  createdBy: String,
});

const Installment = mongoose.model('Billinginstallment', billinginstallmentSchema);

module.exports = Installment;
