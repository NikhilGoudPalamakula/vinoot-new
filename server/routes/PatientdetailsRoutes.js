const express = require('express');
const router = express.Router();
const patientController = require('../controllers/PatientdetailsController');

// Define routes here
router.post("/patient", patientController.createPatient);

module.exports = router;
