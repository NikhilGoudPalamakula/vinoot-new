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



exports.getAllPatients = async (req, res) => {
  try {
    const frid = req.params.frid;
    const patients = await Patient.find({ franchiseID: frid });
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};


exports.getAllPatients = async (req, res) => {
  try {
    const frid = req.params.frid;
    const patients = await Patient.find({ franchiseID: frid });
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};


exports.getpatinetsallfranchise = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};
