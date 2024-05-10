const BillingInstallment = require('../models/BillingInstallmentsmodel'); // Corrected the model name

exports.createInstallment = async (req, res) => {
  try {
    console.log('Received request to create installment:', req.body); // Log the received request body
    const installment = new BillingInstallment(req.body);
    console.log('Creating new installment:', installment); // Log the new installment object
    await installment.save();
    console.log('Installment saved successfully:', installment); // Log successful saving
    res.status(201).json(installment);
  } catch (error) {
    console.error('Error saving installment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllInstallments = async (req, res) => {
  try {
    const installments = await BillingInstallment.find();
    res.json(installments);
  } catch (error) {
    console.error('Error fetching installments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};