const BillingInstallment = require("../models/BillingInstallmentsmodel"); // Corrected the model name

exports.createInstallment = async (req, res) => {
  try {
    // console.log("Received request to create installment:", req.body); // Log the received request body
    const installment = new BillingInstallment(req.body);
    // console.log("Creating new installment:", installment); // Log the new installment object
    await installment.save();
    // console.log("Installment saved successfully:", installment); // Log successful saving
    res.status(201).json(installment);
  } catch (error) {
    console.error("Error saving installment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllInstallments = async (req, res) => {
  try {
    const installments = await BillingInstallment.find();
    res.json(installments);
  } catch (error) {
    console.error("Error fetching installments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPatientInstallmentsById = async (req, res) => {
  try {
    const franchiseID = req.params.franchiseID;
    const patientId = req.params.patientId;
    const billNumber = req.params.billNumber;
    const installments = await BillingInstallment.find({
      patient_id: patientId,
      franchiseID: franchiseID,
      bill_number: billNumber,
    });
    if (!installments) {
      return res
        .status(404)
        .json({ error: "Installments not found for this patient" });
    }
    res.status(200).json(installments);
  } catch (error) {
    console.error("Error fetching installments by patient ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching installments" });
  }
};

exports.updateRemainingAmount = async (req, res) => {
  try {
    const { _id, remainingAmount } = req.body; // Assuming _id is the identifier of the installment
    const updatedInstallment = await BillingInstallment.findByIdAndUpdate(
      _id,
      { remainingAmount },
      { new: true }
    );
    res.status(200).json(updatedInstallment);
  } catch (error) {
    console.error("Error updating remaining amount:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
