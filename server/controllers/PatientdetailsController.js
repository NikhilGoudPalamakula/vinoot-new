const Patient = require('../models/PatientdetailsModel');

exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).send("Error creating patient");
  }
};
