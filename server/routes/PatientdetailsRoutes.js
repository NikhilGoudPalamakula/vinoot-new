const express = require('express');
const router = express.Router();
const patientController = require('../controllers/PatientdetailsController');

// Define routes here
router.post("/patient", patientController.createPatient);
router.get('/patients:frid', patientController.getAllPatients);
router.get('/allfranchisepatients', patientController.getpatinetsallfranchise);

module.exports = router;
