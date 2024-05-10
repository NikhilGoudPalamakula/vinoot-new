const mongoose = require("mongoose");

const treatmentCategorySchema = new mongoose.Schema({
  category_id: {
    type: String,
    required: true,
    unique: true,
  },
  category_name: {
    type: String,
    required: true,
  },

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

const TreatmentCategory = mongoose.model(
  "treatment_category",
  treatmentCategorySchema
);

module.exports = TreatmentCategory;
