const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  currentDate: { type: String },
  bill_number: { type: String },
  doctor: { type: String },
  therapist: { type: String },
  plan_name: { type: String, required: true },
  paymentType: { type: String },
  amountPaid: { type: Number, required: true },
  status: { type: String, required: true },
  GST: { type: Number, required: true },
  price: { type: Number, required: true },
  TotalAmount: { type: Number, required: true },
  GSTamount: { type: Number, required: true },
  days: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  franchiseName: String,
  franchiseID: String,
  createdBy: String,
  modifiedBy: { type: String },
  modifiedAt: { type: String, default: () => new Date().toLocaleString() }, // Keep type as String
  createdAt: { type: String, set: setDate, default: Date.now },
  mobile_number: { type: Number, required: true },
  patient_id: { type: String, required: true },
  patient_name: { type: String, required: true },
  address: { type: String, required: true },
});

function setDate(date) {
  return new Date(date).toLocaleString();
}

billingSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date().toLocaleString();
  }
  this.modifiedAt = new Date().toLocaleString(); // Set the modifiedAt field to the current date
  next();
});

module.exports = mongoose.model("Billing", billingSchema);
