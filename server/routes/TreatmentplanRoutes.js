const express = require("express");
const router = express.Router();
const treatmentPlanController = require("../controllers/TreatmentplanController");

// Route to create a new treatment plan
router.post("/treatment-plan", treatmentPlanController.createTreatmentPlan);

// Route to get all treatment plans
router.get("/treatment-plan", treatmentPlanController.getAllTreatmentPlans);

module.exports = router;