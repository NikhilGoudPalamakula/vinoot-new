const Billing = require("../models/BillingModel");
const BillingInstallment = require("../models/BillingInstallmentsmodel");

exports.createBilling = async (req, res) => {
  try {
    const newBilling = new Billing(req.body);
    await newBilling.save();

    if (newBilling.status === "Unpaid") {
      // Create a new BillingInstallment document
      const newInstallment = new BillingInstallment({
        currentDate: newBilling.currentDate,
        patient_id: newBilling.patient_id,
        remainingAmount: newBilling.remainingAmount,
        mobile_number: newBilling.mobile_number,
        patient_name: newBilling.patient_name,
        bill_number: newBilling.bill_number,
        franchiseName: newBilling.franchiseName,
        franchiseID: newBilling.franchiseID,
        createdBy: newBilling.createdBy,
        paymentType: newBilling.paymentType,
        amountPaid: newBilling.amountPaid,
        status: newBilling.status,
        createdAt: newBilling.createdAt,
        // Add other relevant fields as needed
      });
      await newInstallment.save();
    }

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "An error occurred while saving data" });
  }
};

exports.fetchBillingData = async (req, res) => {
  try {
    const frid = req.params.frid;
    const billingData = await Billing.find({ franchiseID: frid });
    res.json(billingData);
  } catch (error) {
    console.error("Error fetching billing data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching billing data" });
  }
};

// exports.fetchAllBillingData = async (req, res) => {
//   try {
//     const allBillingData = await Billing.find();
//     res.json(allBillingData);
//   } catch (error) {
//     console.error('Error fetching billing data:', error);
//     res.status(500).json({ error: 'An error occurred while fetching billing data' });
//   }
// };

exports.getAllBillingData = async (req, res) => {
  try {
    const billingData = await Billing.find();
    res.json(billingData);
  } catch (error) {
    console.error("Error fetching billing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPatientbillingById = async (req, res) => {
  try {
    const franchiseID = req.params.franchiseID;
    const patientId = req.params.patientId;
    const billNumber = req.params.billNumber;
    const patient = await Billing.findOne({
      patient_id: patientId,
      franchiseID: franchiseID,
      bill_number: billNumber,
    });
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
exports.updatePatientbillingById = async (req, res) => {
  const { franchiseID, patientId, billNumber } = req.params;
  updatedPatientDetails = req.body;
  try {
    const patient = await Billing.findOneAndUpdate(
      { franchiseID, patient_id: patientId, bill_number: billNumber },
      updatedPatientDetails,
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.error("Error updating patient details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
