const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  currentDate: {type:String},
  bill_number: { type: String},
  doctor: { type: String, required: true },
  plan_name: { type: String ,required: true},
  paymentType: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  status: { type: String, required: true },
  GST: { type: Number, required: true },
  price: { type: Number, required: true },
  days: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  franchiseName: String,
  FranchiseID: String,
  createdBy: String,
  modifiedBy: { type: String },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  mobile_number:{ type: Number, required: true },
  patient_id:{ type: String, required: true },
  patient_name:{ type: String, required: true },
  address:{ type: String, required: true },
});


billingSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.modifiedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

module.exports = mongoose.model("Billing", billingSchema);
