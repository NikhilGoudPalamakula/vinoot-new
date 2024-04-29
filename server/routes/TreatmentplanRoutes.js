const express = require("express");
const router = express.Router();
const treatmentPlanController = require("../controllers/TreatmentplanController");

// Route to create a new treatment plan
router.post("/treatment-plan", treatmentPlanController.createTreatmentPlan);

// Route to get all treatment plans
router.get("/treatment-plan", treatmentPlanController.getAllTreatmentPlans);

// Route to update the status of a category
router.put("/treatment-plan/:plan_id", treatmentPlanController.updatePlanStatus);

module.exports = router;

module.exports = router;