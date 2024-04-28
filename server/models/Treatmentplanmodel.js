const mongoose = require("mongoose");

const treatmentPlanSchema = new mongoose.Schema({
  category_name: String,
  plan_id: String,
  plan_name: String,
  GST: Number,
  days: Number,
  price: Number,
  updatedAt: String,
});

const TreatmentPlan = mongoose.model("TreatmentPlan", treatmentPlanSchema);

module.exports = TreatmentPlan;