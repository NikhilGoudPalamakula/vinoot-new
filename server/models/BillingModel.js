const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  planName: { type: String, required: true },
  paymentType: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  status: { type: String, required: true },
  gst: { type: Number },
  price: { type: Number },
  remainingAmount: { type: Number },
  franchiseName: String,
  FranchiseID: String,
  createdBy: String,
  modifiedBy: { type: String },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Billing", billingSchema);
