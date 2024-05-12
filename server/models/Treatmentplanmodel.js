const mongoose = require("mongoose");

const treatmentPlanSchema = new mongoose.Schema({
  category_name: String,
  plan_id: String,
  plan_name: String,
  GST: Number,
  days: Number,
  GSTamount: Number,
  TotalAmount: Number,
  price: Number,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  modifiedBy: { type: String, required: true },
  modifiedAt: { type: String, required: true },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
});

const TreatmentPlan = mongoose.model("TreatmentPlan", treatmentPlanSchema);

module.exports = TreatmentPlan;
