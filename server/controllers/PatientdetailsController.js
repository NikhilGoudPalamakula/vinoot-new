// const Patient = require('../models/PatientdetailsModel');

// exports.createPatient = async (req, res) => {
//   try {
//     const patient = new Patient(req.body);
//     await patient.save();
//     res.status(201).send(patient);
//   } catch (error) {
//     console.error("Error creating patient:", error);
//     res.status(500).send("Error creating patient");
//   }
// };



// exports.getAllPatients = async (req, res) => {
//   try {
//     const frid = req.params.frid;
//     const patients = await Patient.find({ franchiseID: frid });
//     res.json(patients);
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({ error: 'Failed to fetch patients' });
//   }
// };


// exports.getAllPatients = async (req, res) => {
//   try {
//     const frid = req.params.frid;
//     const patients = await Patient.find({ franchiseID: frid });
//     res.json(patients);
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({ error: 'Failed to fetch patients' });
//   }
// };


// exports.getpatinetsallfranchise = async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.json(patients);
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({ error: 'Failed to fetch patients' });
//   }
// };




const Patient = require("../models/PatientdetailsModel");

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
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// exports.getAllPatients = async (req, res) => {
//   try {
//     const patients = await Patient.find({});
//     res.json(patients);
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res.status(500).json({ error: "Failed to fetch patients" });
//   }
// };
//Controller function to get patient details by ID
exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findOne({ patient_id: patientId });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patient details" });
  }
};

exports.getpatinetsallfranchise = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};
