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
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const TreatmentCategory = mongoose.model(
  "treatment_category",
  treatmentCategorySchema
);

module.exports = TreatmentCategory;