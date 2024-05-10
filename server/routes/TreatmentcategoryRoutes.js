const express = require("express");
const router = express.Router();
const treatmentCategoryController = require("../controllers/TreatmentcategoryController");

// Route to create a new treatment category
router.post(
  "/treatment-category",
  treatmentCategoryController.createTreatmentCategory
);

// Route to get all treatment categories
router.get(
  "/treatment-category",
  treatmentCategoryController.getAllTreatmentCategories
);

// Route to update the status of a category
router.put(
  "/treatment-category/:category_id",
  treatmentCategoryController.updateCategoryStatus
);

module.exports = router;
